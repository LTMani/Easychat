import { Controller, Post, Body, Res } from '@nestjs/common';
import { IvrFlowBuilderService, IvrFlow } from '../telephony/ivr-flow-builder.service';
import { CallRecordingArchiverService } from '../telephony/call-recording-archiver.service';
import type { Response } from 'express';

@Controller('v1/telephony')
export class TelephonyIvrController {
  constructor(
    private readonly ivrService: IvrFlowBuilderService,
    private readonly recordingService: CallRecordingArchiverService,
  ) {}

  @Post('ivr/voice-inbound')
  async handleVoiceInbound(@Body() body: { CallSid: string; Digits?: string; From: string }, @Res() res: Response) {
    // Return TwiML XML Response for Twilio Voice
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="1" timeout="10" action="/v1/telephony/ivr/voice-inbound">
    <Say voice="Polly.Joanna">Thank you for calling EasyChat Global. Press 1 for Sales, Press 2 for Technical Support.</Say>
  </Gather>
  <Say voice="Polly.Joanna">We did not receive your selection. Goodbye.</Say>
  <Hangup/>
</Response>`;

    res.setHeader('Content-Type', 'text/xml');
    return res.send(twiml);
  }

  @Post('recordings/webhook')
  async handleRecordingComplete(@Body() body: { CallSid: string; RecordingDuration: number; From: string }) {
    const meta = this.recordingService.buildArchivalMetadata(
      body.CallSid,
      Number(body.RecordingDuration || 0),
      body.From || 'unknown',
    );

    return {
      status: 'success',
      data: meta,
    };
  }
}
