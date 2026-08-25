import { Injectable, Logger } from '@nestjs/common';
import { PivotDataPoint } from './report-builder.service';

@Injectable()
export class ReportExporterService {
  private readonly logger = new Logger(ReportExporterService.name);

  exportToCsv(reportTitle: string, dataPoints: PivotDataPoint[]): string {
    this.logger.log(`Exporting CSV report for '${reportTitle}' (${dataPoints.length} rows)`);

    const headers = ['Dimension Label', 'Metric Value', 'Count'];
    const rows = dataPoints.map((dp) => `"${dp.label}",${dp.value},${dp.count}`);

    return [headers.join(','), ...rows].join('\n');
  }

  exportToPdfHtml(reportTitle: string, dataPoints: PivotDataPoint[], summary: any): string {
    this.logger.log(`Generating PDF HTML template for '${reportTitle}'`);

    const rowsHtml = dataPoints
      .map(
        (dp) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${dp.label}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">$${dp.value.toLocaleString()}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${dp.count}</td>
      </tr>`
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: sans-serif; color: #1e293b; padding: 24px; }
            h1 { color: #0284c7; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th { background: #f8fafc; text-align: left; padding: 8px; border-bottom: 2px solid #cbd5e1; }
          </style>
        </head>
        <body>
          <h1>${reportTitle}</h1>
          <p>Generated at: ${new Date().toISOString()}</p>
          <table>
            <thead>
              <tr><th>Dimension</th><th>Value</th><th>Count</th></tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </body>
      </html>
    `;
  }
}
