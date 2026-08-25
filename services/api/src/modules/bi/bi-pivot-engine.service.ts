import { Injectable, Logger } from '@nestjs/common';

export interface PivotAggregationRequest {
  rows: Array<Record<string, any>>;
  rowDimensions: string[]; // e.g. ['country', 'source']
  columnDimension?: string; // e.g. 'status'
  metricField: string; // e.g. 'value' or 'id'
  aggregationType: 'SUM' | 'COUNT' | 'AVG' | 'MIN' | 'MAX';
}

export interface PivotTableNode {
  key: string;
  dimension: string;
  value: number;
  count: number;
  children?: Record<string, PivotTableNode>;
  columnValues?: Record<string, number>;
}

@Injectable()
export class BiPivotEngineService {
  private readonly logger = new Logger(BiPivotEngineService.name);

  buildPivotTable(req: PivotAggregationRequest): PivotTableNode {
    this.logger.debug(`Building pivot table for ${req.rows.length} rows with dimensions: ${req.rowDimensions.join(' -> ')}`);

    const root: PivotTableNode = {
      key: 'TOTAL',
      dimension: 'root',
      value: 0,
      count: 0,
      children: {},
      columnValues: {},
    };

    for (const item of req.rows) {
      this.aggregateNode(root, item, req.metricField, req.aggregationType, req.columnDimension);

      let currentNode = root;
      for (const dim of req.rowDimensions) {
        const dimValue = String(item[dim] ?? 'Unknown');
        if (!currentNode.children) currentNode.children = {};
        if (!currentNode.children[dimValue]) {
          currentNode.children[dimValue] = {
            key: dimValue,
            dimension: dim,
            value: 0,
            count: 0,
            children: {},
            columnValues: {},
          };
        }

        const child = currentNode.children[dimValue];
        this.aggregateNode(child, item, req.metricField, req.aggregationType, req.columnDimension);
        currentNode = child;
      }
    }

    this.finalizeAverages(root, req.aggregationType);
    return root;
  }

  private aggregateNode(
    node: PivotTableNode,
    item: Record<string, any>,
    metricField: string,
    agg: PivotAggregationRequest['aggregationType'],
    colDimension?: string,
  ) {
    const rawVal = item[metricField];
    const num = typeof rawVal === 'number' ? rawVal : 1;

    node.count += 1;

    switch (agg) {
      case 'COUNT':
        node.value = node.count;
        break;
      case 'SUM':
      case 'AVG':
        node.value += num;
        break;
      case 'MIN':
        node.value = node.count === 1 ? num : Math.min(node.value, num);
        break;
      case 'MAX':
        node.value = node.count === 1 ? num : Math.max(node.value, num);
        break;
    }

    if (colDimension && item[colDimension]) {
      const colKey = String(item[colDimension]);
      if (!node.columnValues) node.columnValues = {};
      node.columnValues[colKey] = (node.columnValues[colKey] || 0) + (agg === 'COUNT' ? 1 : num);
    }
  }

  private finalizeAverages(node: PivotTableNode, agg: PivotAggregationRequest['aggregationType']) {
    if (agg === 'AVG' && node.count > 0) {
      node.value = parseFloat((node.value / node.count).toFixed(2));
    }
    if (node.children) {
      for (const child of Object.values(node.children)) {
        this.finalizeAverages(child, agg);
      }
    }
  }
}
