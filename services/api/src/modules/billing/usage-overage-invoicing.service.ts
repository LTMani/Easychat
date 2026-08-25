import { Injectable, Logger } from '@nestjs/common';

export interface UsageOverageInvoice {
  billingPeriod: string;
  mauContactsOverageFee: number;
  whatsappConversationsOverageFee: number;
  telephonyMinutesOverageFee: number;
  totalOverageFee: number;
}

@Injectable()
export class UsageOverageInvoicingService {
  private readonly logger = new Logger(UsageOverageInvoicingService.name);

  calculateOverages(
    actualMau: number,
    includedMau: number,
    actualWhatsapp: number,
    includedWhatsapp: number,
    actualMinutes: number,
    includedMinutes: number,
  ): UsageOverageInvoice {
    const extraMau = Math.max(0, actualMau - includedMau);
    const extraWhatsapp = Math.max(0, actualWhatsapp - includedWhatsapp);
    const extraMinutes = Math.max(0, actualMinutes - includedMinutes);

    const mauFee = extraMau * 0.05; // $0.05 per extra contact
    const whatsappFee = extraWhatsapp * 0.015; // $0.015 per extra conversation
    const minutesFee = extraMinutes * 0.02; // $0.02 per extra telephony minute

    const total = mauFee + whatsappFee + minutesFee;

    return {
      billingPeriod: 'Current Month',
      mauContactsOverageFee: parseFloat(mauFee.toFixed(2)),
      whatsappConversationsOverageFee: parseFloat(whatsappFee.toFixed(2)),
      telephonyMinutesOverageFee: parseFloat(minutesFee.toFixed(2)),
      totalOverageFee: parseFloat(total.toFixed(2)),
    };
  }
}
