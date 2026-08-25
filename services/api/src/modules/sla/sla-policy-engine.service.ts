import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface BusinessHourSchedule {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday ... 6 = Saturday
  startHour: number; // e.g. 9
  startMinute: number; // e.g. 0
  endHour: number; // e.g. 17
  endMinute: number; // e.g. 0
  isOpen: boolean;
}

export interface SlaTargetCalculation {
  firstResponseDeadline: Date;
  resolutionDeadline: Date;
  businessHoursOnly: boolean;
  totalWorkingMinutes: number;
}

export interface SlaEvaluationStatus {
  ticketId: string;
  isFirstResponseBreached: boolean;
  isResolutionBreached: boolean;
  firstResponseTimeRemainingMinutes: number;
  resolutionTimeRemainingMinutes: number;
}

@Injectable()
export class SlaPolicyEngineService {
  private readonly logger = new Logger(SlaPolicyEngineService.name);

  readonly DEFAULT_BUSINESS_HOURS: BusinessHourSchedule[] = [
    { dayOfWeek: 0, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, isOpen: false }, // Sunday
    { dayOfWeek: 1, startHour: 9, startMinute: 0, endHour: 17, endMinute: 0, isOpen: true },
    { dayOfWeek: 2, startHour: 9, startMinute: 0, endHour: 17, endMinute: 0, isOpen: true },
    { dayOfWeek: 3, startHour: 9, startMinute: 0, endHour: 17, endMinute: 0, isOpen: true },
    { dayOfWeek: 4, startHour: 9, startMinute: 0, endHour: 17, endMinute: 0, isOpen: true },
    { dayOfWeek: 5, startHour: 9, startMinute: 0, endHour: 17, endMinute: 0, isOpen: true },
    { dayOfWeek: 6, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, isOpen: false }, // Saturday
  ];

  isWithinBusinessHours(date: Date, schedule: BusinessHourSchedule[] = this.DEFAULT_BUSINESS_HOURS): boolean {
    const day = date.getDay();
    const dayConfig = schedule.find((s) => s.dayOfWeek === day);
    if (!dayConfig || !dayConfig.isOpen) return false;

    const currentMinutes = date.getHours() * 60 + date.getMinutes();
    const startMinutes = dayConfig.startHour * 60 + dayConfig.startMinute;
    const endMinutes = dayConfig.endHour * 60 + dayConfig.endMinute;

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }

  calculateDeadlines(
    createdAt: Date,
    firstResponseTargetMinutes: number,
    resolutionTargetMinutes: number,
    businessHoursOnly: boolean = false,
    schedule: BusinessHourSchedule[] = this.DEFAULT_BUSINESS_HOURS,
  ): SlaTargetCalculation {
    if (!businessHoursOnly) {
      return {
        firstResponseDeadline: new Date(createdAt.getTime() + firstResponseTargetMinutes * 60 * 1000),
        resolutionDeadline: new Date(createdAt.getTime() + resolutionTargetMinutes * 60 * 1000),
        businessHoursOnly: false,
        totalWorkingMinutes: resolutionTargetMinutes,
      };
    }

    const firstResponseDeadline = this.addBusinessMinutes(createdAt, firstResponseTargetMinutes, schedule);
    const resolutionDeadline = this.addBusinessMinutes(createdAt, resolutionTargetMinutes, schedule);

    return {
      firstResponseDeadline,
      resolutionDeadline,
      businessHoursOnly: true,
      totalWorkingMinutes: resolutionTargetMinutes,
    };
  }

  addBusinessMinutes(startDate: Date, minutesToAdd: number, schedule: BusinessHourSchedule[]): Date {
    let current = new Date(startDate.getTime());
    let remainingMinutes = minutesToAdd;

    while (remainingMinutes > 0) {
      const day = current.getDay();
      const dayConfig = schedule.find((s) => s.dayOfWeek === day);

      if (!dayConfig || !dayConfig.isOpen) {
        // Jump to next day 00:00
        current.setDate(current.getDate() + 1);
        current.setHours(0, 0, 0, 0);
        continue;
      }

      const dayStart = new Date(current);
      dayStart.setHours(dayConfig.startHour, dayConfig.startMinute, 0, 0);

      const dayEnd = new Date(current);
      dayEnd.setHours(dayConfig.endHour, dayConfig.endMinute, 0, 0);

      if (current < dayStart) {
        current = new Date(dayStart);
      }

      if (current >= dayEnd) {
        current.setDate(current.getDate() + 1);
        current.setHours(0, 0, 0, 0);
        continue;
      }

      const availableMinutesToday = Math.floor((dayEnd.getTime() - current.getTime()) / (60 * 1000));

      if (remainingMinutes <= availableMinutesToday) {
        current = new Date(current.getTime() + remainingMinutes * 60 * 1000);
        remainingMinutes = 0;
      } else {
        remainingMinutes -= availableMinutesToday;
        current.setDate(current.getDate() + 1);
        current.setHours(0, 0, 0, 0);
      }
    }

    return current;
  }

  evaluateTicketSla(
    createdAt: Date,
    firstResponseAt: Date | null,
    resolvedAt: Date | null,
    firstResponseTargetMinutes: number,
    resolutionTargetMinutes: number,
    now: Date = new Date(),
  ): SlaEvaluationStatus {
    const firstDeadline = new Date(createdAt.getTime() + firstResponseTargetMinutes * 60 * 1000);
    const resDeadline = new Date(createdAt.getTime() + resolutionTargetMinutes * 60 * 1000);

    const isFirstResponseBreached = firstResponseAt
      ? firstResponseAt.getTime() > firstDeadline.getTime()
      : now.getTime() > firstDeadline.getTime();

    const isResolutionBreached = resolvedAt
      ? resolvedAt.getTime() > resDeadline.getTime()
      : now.getTime() > resDeadline.getTime();

    const firstResponseTimeRemainingMinutes = Math.floor((firstDeadline.getTime() - now.getTime()) / (60 * 1000));
    const resolutionTimeRemainingMinutes = Math.floor((resDeadline.getTime() - now.getTime()) / (60 * 1000));

    return {
      ticketId: '',
      isFirstResponseBreached,
      isResolutionBreached,
      firstResponseTimeRemainingMinutes,
      resolutionTimeRemainingMinutes,
    };
  }
}
