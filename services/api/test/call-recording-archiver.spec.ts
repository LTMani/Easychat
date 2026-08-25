import { Test, TestingModule } from '@nestjs/testing';
import { CallRecordingArchiverService } from '../src/modules/telephony/call-recording-archiver.service';

describe('CallRecordingArchiverService', () => {
  let service: CallRecordingArchiverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallRecordingArchiverService],
    }).compile();
    service = module.get<CallRecordingArchiverService>(CallRecordingArchiverService);
  });

  it('should build deterministic S3 archive key with sanitized phone number', () => {
    const meta = service.buildArchivalMetadata('CA12345', 180, '+1 (415) 555-0192');
    expect(meta.callSid).toBe('CA12345');
    expect(meta.durationSeconds).toBe(180);
    expect(meta.s3ArchiveKey).toContain('14155550192_CA12345.mp3');
  });

  it('should filter audio duration for AI transcription eligibility', () => {
    expect(service.isRecordingEligibleForAiTranscription(120)).toBe(true);
    expect(service.isRecordingEligibleForAiTranscription(2)).toBe(false); // Too short
    expect(service.isRecordingEligibleForAiTranscription(5000)).toBe(false); // Too long (>45m)
  });
});
