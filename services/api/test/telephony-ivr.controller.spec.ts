import { Test, TestingModule } from '@nestjs/testing';
import { TelephonyIvrController } from '../src/modules/controllers/telephony-ivr.controller';
import { IvrFlowBuilderService } from '../src/modules/telephony/ivr-flow-builder.service';
import { CallRecordingArchiverService } from '../src/modules/telephony/call-recording-archiver.service';

describe('TelephonyIvrController', () => {
  let controller: TelephonyIvrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelephonyIvrController],
      providers: [IvrFlowBuilderService, CallRecordingArchiverService],
    }).compile();
    controller = module.get<TelephonyIvrController>(TelephonyIvrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process call recording webhook and build S3 archival key', async () => {
    const res = await controller.handleRecordingComplete({
      CallSid: 'CA9948',
      RecordingDuration: 140,
      From: '+14155550192',
    });

    expect(res.status).toBe('success');
    expect(res.data.s3ArchiveKey).toContain('CA9948');
  });
});
