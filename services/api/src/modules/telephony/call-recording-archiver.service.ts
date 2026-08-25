import { Injectable, Logger } from '@nestjs/common';

export interface CallRecordingMeta {
  callSid: string;
  durationSeconds: number;
  audioUrl: string;
  transcriptionText?: string;
  sentiment?: string;
  s3ArchiveKey: string;
}

@Injectable()
export class CallRecordingArchiverService {
  private readonly logger = new Logger(CallRecordingArchiverService.name);

  buildArchivalMetadata(callSid: string, durationSeconds: number, customerPhone: string): CallRecordingMeta {
    this.logger.debug(`Building cold-storage S3 archive metadata for call ${callSid}`);

    const dateFolder = new Date().toISOString().slice(0, 10);
    const sanitizedPhone = customerPhone.replace(/[^\d+]/g, '');
    const s3ArchiveKey = `recordings/${dateFolder}/${sanitizedPhone}_${callSid}.mp3`;

    return {
      callSid,
      durationSeconds,
      audioUrl: `https://storage.easychat.io/${s3ArchiveKey}`,
      s3ArchiveKey,
    };
  }

  isRecordingEligibleForAiTranscription(durationSeconds: number): boolean {
    // Only transcribe calls between 5 seconds and 45 minutes
    return durationSeconds >= 5 && durationSeconds <= 2700;
  }
}
