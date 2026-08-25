import { EmailQueueProcessor } from './processors/email-queue.processor';
import { WebhookQueueProcessor } from './processors/webhook-queue.processor';
import { SlaTimerProcessor } from './processors/sla-timer.processor';
import { EtlImportProcessor } from './processors/etl-import.processor';
import { CampaignBroadcastProcessor } from './processors/campaign-broadcast.processor';
import { VectorEmbeddingProcessor } from './processors/vector-embedding.processor';
import { ReportExporterProcessor } from './processors/report-exporter.processor';

async function startWorker() {
  console.log('===================================================');
  console.log('  EasyChat CRM Background Worker Daemon Initialized ');
  console.log('===================================================');

  const emailProcessor = new EmailQueueProcessor();
  const webhookProcessor = new WebhookQueueProcessor();
  const slaProcessor = new SlaTimerProcessor();
  const etlProcessor = new EtlImportProcessor();
  const campaignProcessor = new CampaignBroadcastProcessor();
  const vectorProcessor = new VectorEmbeddingProcessor();
  const reportExporter = new ReportExporterProcessor();

  // Run periodic SLA check every 60 seconds
  setInterval(async () => {
    try {
      const breaches = await slaProcessor.processSlaChecks();
      if (breaches > 0) {
        console.log(`[Worker] Polled and logged ${breaches} SLA breaches.`);
      }
    } catch (err: any) {
      console.error('[Worker] SLA timer error:', err.message);
    }
  }, 60000);

  console.log('[Worker] Waiting for queue jobs (Email, Webhook, SLA Timers, ETL, Campaigns, Vector, Reports)...');
}

startWorker();
