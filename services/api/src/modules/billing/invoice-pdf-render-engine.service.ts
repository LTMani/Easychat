import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface InvoiceRenderModel {
  invoiceNumber: string;
  issueDateIso: string;
  dueDateIso: string;
  currencyCode: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'SGD';
  organization: {
    name: string;
    taxRegistrationNumber: string;
    addressLines: string[];
    supportEmail: string;
  };
  customer: {
    accountId: string;
    companyName: string;
    billingContactName: string;
    billingEmail: string;
    vatTaxId?: string;
    billingAddress: string[];
  };
  lineItems: Array<{ sku: string; description: string; quantity: number; unitPrice: number; totalAmount: number; isTaxable: boolean }>;
  subtotalAmount: number;
  taxJurisdictionCode: string;
  taxRatePercent: number;
  taxAmount: number;
  totalAmountDue: number;
  paymentTerms: string;
  bankWireInstructions: {
    bankName: string;
    swiftBic: string;
    ibanOrAccountNumber: string;
    routingNumber: string;
  };
}

export interface RenderedInvoicePdfArtifact {
  invoiceNumber: string;
  renderedHtmlTemplate: string;
  sha256IntegrityHash: string;
  generatedAtIso: string;
  pageCount: number;
}

@Injectable()
export class InvoicePdfRenderEngineService {
  private readonly logger = new Logger(InvoicePdfRenderEngineService.name);

  generateInvoiceHtmlAndPdf(model: InvoiceRenderModel): RenderedInvoicePdfArtifact {
    this.logger.log(`Rendering enterprise invoice PDF template for ${model.invoiceNumber} (${model.currencyCode} ${model.totalAmountDue})`);

    const formatCur = (num: number) => {
      const symbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', CAD: 'CA$', AUD: 'A$', SGD: 'S$' };
      const sym = symbols[model.currencyCode] || '$';
      return `${sym}${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const rowsHtml = model.lineItems
      .map(
        (li, idx) => `
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 12px;">
          <td style="padding: 12px; font-family: monospace; color: #4f46e5; font-weight: bold;">${idx + 1}. ${li.sku}</td>
          <td style="padding: 12px; color: #1e293b; font-weight: 500;">${li.description}</td>
          <td style="padding: 12px; text-align: center; color: #64748b;">${li.quantity}</td>
          <td style="padding: 12px; text-align: right; font-family: monospace;">${formatCur(li.unitPrice)}</td>
          <td style="padding: 12px; text-align: right; font-family: monospace; font-weight: bold; color: #0f172a;">${formatCur(li.totalAmount)}</td>
        </tr>`,
      )
      .join('');

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice ${model.invoiceNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 40px; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #4f46e5; padding-bottom: 24px; }
    .org-title { font-size: 24px; font-weight: 900; color: #4f46e5; }
    .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 24px 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; }
    .totals-area { margin-top: 24px; display: flex; justify-content: flex-end; }
    .totals-table { width: 320px; }
    .total-due { font-size: 18px; font-weight: 900; color: #4f46e5; border-top: 2px solid #e2e8f0; padding-top: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="org-title">EasyChat CRM</div>
      <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Enterprise Customer Communication Platform</div>
      <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Tax ID: ${model.organization.taxRegistrationNumber}</div>
    </div>
    <div style="text-align: right;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px;">INVOICE</h1>
      <div style="font-family: monospace; font-size: 14px; font-weight: bold; color: #4f46e5; margin-top: 4px;">${model.invoiceNumber}</div>
      <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Issue Date: ${model.issueDateIso.split('T')[0]}</div>
      <div style="font-size: 11px; color: #ef4444; font-weight: bold;">Due Date: ${model.dueDateIso.split('T')[0]}</div>
    </div>
  </div>

  <div class="meta-box" style="display: flex; justify-content: space-between;">
    <div>
      <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #94a3b8;">Billed To</div>
      <div style="font-size: 14px; font-weight: bold; color: #0f172a; margin-top: 4px;">${model.customer.companyName}</div>
      <div style="font-size: 12px; color: #475569;">Attn: ${model.customer.billingContactName} (${model.customer.billingEmail})</div>
      <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${model.customer.billingAddress.join(', ')}</div>
      ${model.customer.vatTaxId ? `<div style="font-size: 11px; color: #059669; font-weight: bold; margin-top: 2px;">VAT/Tax ID: ${model.customer.vatTaxId}</div>` : ''}
    </div>
    <div style="text-align: right;">
      <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #94a3b8;">Payment Terms</div>
      <div style="font-size: 12px; font-weight: bold; color: #0f172a; margin-top: 4px;">${model.paymentTerms}</div>
      <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Bank: ${model.bankWireInstructions.bankName}</div>
      <div style="font-size: 11px; font-family: monospace; color: #475569;">IBAN: ${model.bankWireInstructions.ibanOrAccountNumber}</div>
      <div style="font-size: 11px; font-family: monospace; color: #475569;">SWIFT: ${model.bankWireInstructions.swiftBic}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 15%;">SKU</th>
        <th style="width: 45%;">Description</th>
        <th style="width: 10%; text-align: center;">Qty</th>
        <th style="width: 15%; text-align: right;">Unit Price</th>
        <th style="width: 15%; text-align: right;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <div class="totals-area">
    <table class="totals-table">
      <tr>
        <td style="padding: 6px 0; font-size: 12px; color: #64748b;">Subtotal:</td>
        <td style="padding: 6px 0; font-size: 12px; text-align: right; font-family: monospace; font-weight: bold;">${formatCur(model.subtotalAmount)}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 12px; color: #64748b;">Sales Tax / VAT (${model.taxRatePercent}%):</td>
        <td style="padding: 6px 0; font-size: 12px; text-align: right; font-family: monospace; color: #059669;">${formatCur(model.taxAmount)}</td>
      </tr>
      <tr class="total-due">
        <td style="padding: 12px 0; font-size: 14px; font-weight: 900;">Total Amount Due:</td>
        <td style="padding: 12px 0; font-size: 18px; text-align: right; font-family: monospace; font-weight: 900; color: #4f46e5;">${formatCur(model.totalAmountDue)}</td>
      </tr>
    </table>
  </div>
</body>
</html>`;

    const hash = crypto.createHash('sha256').update(html).digest('hex');

    return {
      invoiceNumber: model.invoiceNumber,
      renderedHtmlTemplate: html,
      sha256IntegrityHash: hash,
      generatedAtIso: new Date().toISOString(),
      pageCount: 1,
    };
  }
}
