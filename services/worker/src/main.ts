import { EmailQueueProcessor } from './processors/email-queue.processor';
import { WebhookQueueProcessor } from './processors/webhook-queue.processor';
import { SlaTimerProcessor } from './processors/sla-timer.processor';
import { EtlImportProcessor } from './processors/etl-import.processor';
import { CampaignBroadcastProcessor } from './processors/campaign-broadcast.processor';
import { VectorEmbeddingProcessor } from './processors/vector-embedding.processor';
import { ReportExporterProcessor } from './processors/report-exporter.processor';
import { SalesforceSyncProcessor } from './processors/salesforce-sync.processor';
import { HubSpotSyncProcessor } from './processors/hubspot-sync.processor';
import { GdprQueueProcessor } from './processors/gdpr-queue.processor';
import { NotificationQueueProcessor } from './processors/notification-queue.processor';
import { AiSentimentProcessor } from './processors/ai-sentiment.processor';

export interface WorkerProcessorsRegistry {
  email: EmailQueueProcessor;
  webhook: WebhookQueueProcessor;
  sla: SlaTimerProcessor;
  etl: EtlImportProcessor;
  campaign: CampaignBroadcastProcessor;
  vector: VectorEmbeddingProcessor;
  report: ReportExporterProcessor;
  salesforce: SalesforceSyncProcessor;
  hubspot: HubSpotSyncProcessor;
  gdpr: GdprQueueProcessor;
  notification: NotificationQueueProcessor;
  aiSentiment: AiSentimentProcessor;
}

export function initializeWorkerProcessors(): WorkerProcessorsRegistry {
  return {
    email: new EmailQueueProcessor(),
    webhook: new WebhookQueueProcessor(),
    sla: new SlaTimerProcessor(),
    etl: new EtlImportProcessor(),
    campaign: new CampaignBroadcastProcessor(),
    vector: new VectorEmbeddingProcessor(),
    report: new ReportExporterProcessor(),
    salesforce: new SalesforceSyncProcessor(),
    hubspot: new HubSpotSyncProcessor(),
    gdpr: new GdprQueueProcessor(),
    notification: new NotificationQueueProcessor(),
    aiSentiment: new AiSentimentProcessor(),
  };
}

async function startWorker() {
  console.log('===================================================');
  console.log('  EasyChat CRM Background Worker Daemon Initialized ');
  console.log('  Active Processors: 12 Queues Registered           ');
  console.log('===================================================');

  const processors = initializeWorkerProcessors();

  // Run periodic SLA check every 60 seconds
  setInterval(async () => {
    try {
      const breaches = await processors.sla.processSlaChecks();
      if (breaches > 0) {
        console.log(`[Worker] Polled and logged ${breaches} SLA breaches.`);
      }
    } catch (err: any) {
      console.error('[Worker] SLA timer polling error:', err.message);
    }
  }, 60000);

  console.log('[Worker] Waiting for BullMQ jobs: Email, Webhook, SLA, ETL, Campaigns, Vector, Reports, Salesforce, HubSpot, GDPR, Notification, AI Sentiment...');
}

if (require.main === module) {
  startWorker();
}
