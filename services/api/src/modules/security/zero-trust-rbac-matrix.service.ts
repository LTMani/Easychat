import { Injectable, Logger } from '@nestjs/common';

export type EnterpriseRole =
  | 'SUPER_ADMIN'
  | 'SECURITY_COMPLIANCE_OFFICER'
  | 'SALES_DIRECTOR'
  | 'SALES_REPRESENTATIVE'
  | 'SUPPORT_TIER_3_LEAD'
  | 'SUPPORT_AGENT'
  | 'BILLING_CONTROLLER'
  | 'READ_ONLY_AUDITOR';

export interface PermissionDefinition {
  code: string;
  category: 'CRM_CONTACTS' | 'SALES_DEALS' | 'TELEPHONY_VOIP' | 'COMPLIANCE_AUDIT' | 'BILLING_INVOICES' | 'AI_COPILOT';
  description: string;
  allowedRoles: EnterpriseRole[];
}

@Injectable()
export class ZeroTrustRbacMatrixService {
  private readonly logger = new Logger(ZeroTrustRbacMatrixService.name);

  private readonly permissionMatrix: PermissionDefinition[] = [
    { code: 'contacts.read', category: 'CRM_CONTACTS', description: 'View customer contact 360 profiles and activity timeline', allowedRoles: ['SUPER_ADMIN', 'SALES_DIRECTOR', 'SALES_REPRESENTATIVE', 'SUPPORT_TIER_3_LEAD', 'SUPPORT_AGENT', 'READ_ONLY_AUDITOR'] },
    { code: 'contacts.write', category: 'CRM_CONTACTS', description: 'Create and update customer details and custom metadata', allowedRoles: ['SUPER_ADMIN', 'SALES_DIRECTOR', 'SALES_REPRESENTATIVE', 'SUPPORT_TIER_3_LEAD', 'SUPPORT_AGENT'] },
    { code: 'contacts.delete_gdpr', category: 'CRM_CONTACTS', description: 'Execute GDPR Article 17 hard erasure on contact records', allowedRoles: ['SUPER_ADMIN', 'SECURITY_COMPLIANCE_OFFICER'] },
    { code: 'deals.manage_cpq', category: 'SALES_DEALS', description: 'Configure custom discount curves and issue formal quotes', allowedRoles: ['SUPER_ADMIN', 'SALES_DIRECTOR', 'SALES_REPRESENTATIVE'] },
    { code: 'deals.approve_over_discount', category: 'SALES_DEALS', description: 'Approve discounts exceeding 20% threshold on enterprise deals', allowedRoles: ['SUPER_ADMIN', 'SALES_DIRECTOR'] },
    { code: 'telephony.listen_live', category: 'TELEPHONY_VOIP', description: 'Live whisper and barge into active WebRTC PSTN calls', allowedRoles: ['SUPER_ADMIN', 'SUPPORT_TIER_3_LEAD', 'SALES_DIRECTOR'] },
    { code: 'compliance.export_audit_logs', category: 'COMPLIANCE_AUDIT', description: 'Generate cryptographically signed SOC 2 and HIPAA evidence packages', allowedRoles: ['SUPER_ADMIN', 'SECURITY_COMPLIANCE_OFFICER', 'READ_ONLY_AUDITOR'] },
    { code: 'billing.issue_refund', category: 'BILLING_INVOICES', description: 'Issue Stripe charge refunds and credit notes', allowedRoles: ['SUPER_ADMIN', 'BILLING_CONTROLLER'] },
    { code: 'ai.prompt_tuning', category: 'AI_COPILOT', description: 'Modify RAG system prompts and knowledge base vector weights', allowedRoles: ['SUPER_ADMIN', 'SECURITY_COMPLIANCE_OFFICER'] },
  ];

  hasPermission(userRole: EnterpriseRole, permissionCode: string): boolean {
    const perm = this.permissionMatrix.find((p) => p.code === permissionCode);
    if (!perm) return false;
    const allowed = perm.allowedRoles.includes(userRole);
    this.logger.debug(`RBAC Evaluation: Role '${userRole}' for '${permissionCode}' -> ${allowed ? 'ALLOW' : 'DENY'}`);
    return allowed;
  }

  listPermissionsForRole(userRole: EnterpriseRole): PermissionDefinition[] {
    return this.permissionMatrix.filter((p) => p.allowedRoles.includes(userRole));
  }

  getFullMatrix(): PermissionDefinition[] {
    return [...this.permissionMatrix];
  }
}
