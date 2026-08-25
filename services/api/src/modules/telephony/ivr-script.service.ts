import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface IvrNode {
  id: string;
  type: 'GREETING' | 'MENU' | 'TRANSFER' | 'VOICEMAIL' | 'HANGUP';
  prompt: string;
  options?: Array<{ key: string; label: string; nextNodeId: string }>;
  transferTo?: string;
}

export interface IvrScript {
  id: string;
  name: string;
  language: 'en' | 'es' | 'fr';
  entryNodeId: string;
  nodes: IvrNode[];
}

@Injectable()
export class IvrScriptService {
  private readonly logger = new Logger(IvrScriptService.name);

  buildIvrTwiML(script: IvrScript, currentNodeId: string): string {
    const node = script.nodes.find((n) => n.id === currentNodeId);
    if (!node) return '<Response><Hangup/></Response>';

    const lines: string[] = ['<?xml version="1.0" encoding="UTF-8"?>', '<Response>'];

    if (node.type === 'GREETING') {
      lines.push(`  <Say voice="alice" language="${script.language}">${node.prompt}</Say>`);
      if (node.options && node.options.length > 0) {
        lines.push(`  <Gather numDigits="1" action="/ivr/handle-input?nodeId=${node.id}&amp;scriptId=${script.id}" method="POST">`);
        node.options.forEach((opt) => lines.push(`    <Say voice="alice">Press ${opt.key} for ${opt.label}</Say>`));
        lines.push(`  </Gather>`);
      }
    }

    if (node.type === 'MENU') {
      lines.push(`  <Say voice="alice" language="${script.language}">${node.prompt}</Say>`);
      lines.push(`  <Gather numDigits="1" action="/ivr/handle-input?nodeId=${node.id}&amp;scriptId=${script.id}" method="POST">`);
      node.options?.forEach((opt) => lines.push(`    <Say>Press ${opt.key} for ${opt.label}.</Say>`));
      lines.push(`  </Gather>`);
      lines.push(`  <Say>We did not receive your input. Goodbye.</Say>`);
    }

    if (node.type === 'TRANSFER' && node.transferTo) {
      lines.push(`  <Say voice="alice">Please hold while we connect you.</Say>`);
      lines.push(`  <Dial>${node.transferTo}</Dial>`);
    }

    if (node.type === 'VOICEMAIL') {
      lines.push(`  <Say voice="alice">${node.prompt}</Say>`);
      lines.push(`  <Record maxLength="120" action="/ivr/voicemail-saved" transcribe="true" transcribeCallback="/ivr/transcription" />`);
    }

    if (node.type === 'HANGUP') {
      lines.push(`  <Say voice="alice">${node.prompt}</Say>`);
      lines.push('  <Hangup/>');
    }

    lines.push('</Response>');
    return lines.join('\n');
  }

  async getScript(scriptId: string): Promise<IvrScript | null> {
    const record = await prisma.ivrScript.findUnique({ where: { id: scriptId } });
    if (!record) return null;
    return JSON.parse(record.scriptJson) as IvrScript;
  }

  async saveScript(organizationId: string, script: IvrScript): Promise<{ id: string }> {
    this.logger.log(`Saving IVR script '${script.name}' for org ${organizationId}`);
    const record = await prisma.ivrScript.upsert({
      where: { id: script.id },
      create: { id: script.id, organizationId, name: script.name, scriptJson: JSON.stringify(script) },
      update: { name: script.name, scriptJson: JSON.stringify(script) },
    });
    return { id: record.id };
  }

  async listScripts(organizationId: string): Promise<Array<{ id: string; name: string; updatedAt: Date }>> {
    const records = await prisma.ivrScript.findMany({ where: { organizationId }, orderBy: { updatedAt: 'desc' } });
    return records.map((r) => ({ id: r.id, name: r.name, updatedAt: r.updatedAt }));
  }

  routeInput(script: IvrScript, currentNodeId: string, digit: string): string | null {
    const node = script.nodes.find((n) => n.id === currentNodeId);
    if (!node?.options) return null;
    const match = node.options.find((opt) => opt.key === digit);
    return match?.nextNodeId ?? null;
  }
}
