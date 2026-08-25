import { Injectable, Logger } from '@nestjs/common';

export interface BusinessCalendarConfig {
  timezone: string;
  startHourUtc: number; // e.g. 8 (08:00 UTC)
  endHourUtc: number;   // e.g. 18 (18:00 UTC)
  workDays: number[];   // 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri
  holidays: string[];   // 'YYYY-MM-DD'
}

@Injectable()
export class SlaCalendarBusinessHoursService {
  private readonly logger = new Logger(SlaCalendarBusinessHoursService.name);

  isBusinessHour(date: Date, calendar: BusinessCalendarConfig): boolean {
    const day = date.getUTCDay();
    if (!calendar.workDays.includes(day)) return false;

    const dateStr = date.toISOString().slice(0, 10);
    if (calendar.holidays.includes(dateStr)) return false;

    const hour = date.getUTCHours();
    return hour >= calendar.startHourUtc && hour < calendar.endHourUtc;
  }

  addBusinessMinutes(startDate: Date, minutesToAdd: number, calendar: BusinessCalendarConfig): Date {
    const current = new Date(startDate.getTime());
    let remainingMinutes = minutesToAdd;

    while (remainingMinutes > 0) {
      current.setUTCMinutes(current.getUTCMinutes() + 1);
      if (this.isBusinessHour(current, calendar)) {
        remainingMinutes--;
      }
    }

    return current;
  }
}
