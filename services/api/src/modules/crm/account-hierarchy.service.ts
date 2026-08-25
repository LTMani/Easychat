import { Injectable, Logger } from '@nestjs/common';

export interface AccountNode {
  id: string;
  name: string;
  parentId?: string;
  country: string;
  annualRevenue: number;
  openDealsValue: number;
  contactsCount: number;
  children?: AccountNode[];
}

export interface HierarchyRollup {
  rootAccountId: string;
  totalSubsidiaries: number;
  consolidatedRevenue: number;
  consolidatedPipeline: number;
  totalContacts: number;
}

@Injectable()
export class AccountHierarchyService {
  private readonly logger = new Logger(AccountHierarchyService.name);

  buildHierarchyTree(flatAccounts: Array<Omit<AccountNode, 'children'>>): AccountNode[] {
    this.logger.debug(`Constructing corporate hierarchy tree for ${flatAccounts.length} accounts`);

    const accountMap = new Map<string, AccountNode>();
    const roots: AccountNode[] = [];

    for (const acc of flatAccounts) {
      accountMap.set(acc.id, { ...acc, children: [] });
    }

    for (const acc of flatAccounts) {
      const node = accountMap.get(acc.id)!;
      if (acc.parentId && accountMap.has(acc.parentId)) {
        const parent = accountMap.get(acc.parentId)!;
        parent.children = parent.children || [];
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  computeRollup(root: AccountNode): HierarchyRollup {
    let totalSubsidiaries = 0;
    let consolidatedRevenue = root.annualRevenue;
    let consolidatedPipeline = root.openDealsValue;
    let totalContacts = root.contactsCount;

    const traverse = (node: AccountNode) => {
      if (node.children) {
        for (const child of node.children) {
          totalSubsidiaries++;
          consolidatedRevenue += child.annualRevenue;
          consolidatedPipeline += child.openDealsValue;
          totalContacts += child.contactsCount;
          traverse(child);
        }
      }
    };

    traverse(root);

    return {
      rootAccountId: root.id,
      totalSubsidiaries,
      consolidatedRevenue,
      consolidatedPipeline,
      totalContacts,
    };
  }
}
