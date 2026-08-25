import { Module } from '@nestjs/common';
import { ContactsCrmController } from './contacts-crm.controller';
import { DealsCrmController } from './deals-crm.controller';
import { TicketsSupportController } from './tickets-support.controller';
import { ConversationsOmniController } from './conversations-omni.controller';
import { MarketingCampaignsController } from './marketing-campaigns.controller';
import { ReportsAnalyticsController } from './reports-analytics.controller';
import { DeveloperApiKeysController } from './developer-api-keys.controller';
import { AutomationWorkflowsController } from './automation-workflows.controller';
import { CustomFieldsController } from './custom-fields.controller';
import { AuditComplianceController } from './audit-compliance.controller';
import { ContractsController } from './contracts.controller';
import { BiPivotController } from './bi-pivot.controller';
import { ChatRoutingController } from './chat-routing.controller';
import { IntegrationsController } from './integrations.controller';
import { SlaEngineController } from './sla-engine.controller';
import { SearchRagController } from './search-rag.controller';
import { TelephonyIvrController } from './telephony-ivr.controller';
import { JiraLinearController } from './jira-linear.controller';
import { MfaAuthController } from './mfa-auth.controller';
import { BillingStripeController } from './billing-stripe.controller';
import { CustomReportsController } from './custom-reports.controller';
import { KnowledgeBaseController } from './knowledge-base.controller';
import { ProductsCatalogController } from './products-catalog.controller';
import { QuotesLineItemsController } from './quotes-line-items.controller';
import { AuditMerkleController } from './audit-merkle.controller';

import { ContactDeduplicationService } from '../crm/contact-deduplication.service';
import { ContactGeoEnrichmentService } from '../crm/contact-geo-enrichment.service';
import { LeadEnrichmentPipelineService } from '../crm/lead-enrichment-pipeline.service';
import { DealRotationService } from '../crm/deal-rotation.service';
import { PipelineAnalyticsService } from '../crm/pipeline-analytics.service';
import { TicketEscalationService } from '../tickets/ticket-escalation.service';
import { SlaPolicyEngineService } from '../sla/sla-policy-engine.service';
import { OmnichannelChannelManagerService } from '../omnichannel/omnichannel-channel-manager.service';
import { NlpExtractionService } from '../ai/nlp-extraction.service';
import { AbTestingService } from '../marketing/ab-testing.service';
import { SmsCampaignSchedulerService } from '../marketing/sms-campaign-scheduler.service';
import { ConversationReportService } from '../reports/conversation-report.service';
import { CustomerRetentionService } from '../crm/customer-retention.service';
import { WorkflowEngineService } from '../automation/workflow-engine.service';
import { CustomFieldDefinitionService } from '../custom-fields/custom-field-definition.service';
import { AuditComplianceService } from '../audit/audit-compliance.service';
import { ESignatureWorkflowService } from '../contracts/e-signature-workflow.service';
import { BiPivotEngineService } from '../bi/bi-pivot-engine.service';
import { ChatRoutingEngineService } from '../omnichannel/chat-routing-engine.service';
import { SlackNotificationService } from '../integrations/slack-notification.service';
import { ZapierWebhookService } from '../integrations/zapier-webhook.service';
import { VectorSimilarityService } from '../search/vector-similarity.service';
import { HybridSearchFusionService } from '../search/hybrid-search-fusion.service';
import { IvrFlowBuilderService } from '../telephony/ivr-flow-builder.service';
import { CallRecordingArchiverService } from '../telephony/call-recording-archiver.service';
import { JiraConnectorService } from '../integrations/jira-connector.service';
import { LinearConnectorService } from '../integrations/linear-connector.service';
import { MfaTotpAuthenticatorService } from '../security/mfa-totp-authenticator.service';
import { TaxCalculationEngineService } from '../billing/tax-calculation-engine.service';
import { StripeWebhookHandlerService } from '../billing/stripe-webhook-handler.service';
import { SemanticArticleIndexerService } from '../knowledge/semantic-article-indexer.service';
import { AuditMerkleTreeService } from '../audit/audit-merkle-tree.service';
import { UsageAlertsService } from '../billing/usage-alerts.service';
import { OpportunitySplitService } from '../crm/opportunity-split.service';
import { CallTranscriptionSentimentService } from '../telephony/call-transcription-sentiment.service';
import { EmailDeliverabilityHealthService } from '../marketing/email-deliverability-health.service';
import { AgentCoachingScorecardService } from '../support/agent-coaching-scorecard.service';

@Module({
  controllers: [
    ContactsCrmController,
    DealsCrmController,
    TicketsSupportController,
    ConversationsOmniController,
    MarketingCampaignsController,
    ReportsAnalyticsController,
    DeveloperApiKeysController,
    AutomationWorkflowsController,
    CustomFieldsController,
    AuditComplianceController,
    ContractsController,
    BiPivotController,
    ChatRoutingController,
    IntegrationsController,
    SlaEngineController,
    SearchRagController,
    TelephonyIvrController,
    JiraLinearController,
    MfaAuthController,
    BillingStripeController,
    CustomReportsController,
    KnowledgeBaseController,
    ProductsCatalogController,
    QuotesLineItemsController,
    AuditMerkleController,
  ],
  providers: [
    ContactDeduplicationService,
    ContactGeoEnrichmentService,
    LeadEnrichmentPipelineService,
    DealRotationService,
    PipelineAnalyticsService,
    TicketEscalationService,
    SlaPolicyEngineService,
    OmnichannelChannelManagerService,
    NlpExtractionService,
    AbTestingService,
    SmsCampaignSchedulerService,
    ConversationReportService,
    CustomerRetentionService,
    WorkflowEngineService,
    CustomFieldDefinitionService,
    AuditComplianceService,
    ESignatureWorkflowService,
    BiPivotEngineService,
    ChatRoutingEngineService,
    SlackNotificationService,
    ZapierWebhookService,
    VectorSimilarityService,
    HybridSearchFusionService,
    IvrFlowBuilderService,
    CallRecordingArchiverService,
    JiraConnectorService,
    LinearConnectorService,
    MfaTotpAuthenticatorService,
    TaxCalculationEngineService,
    StripeWebhookHandlerService,
    SemanticArticleIndexerService,
    AuditMerkleTreeService,
    UsageAlertsService,
    OpportunitySplitService,
    CallTranscriptionSentimentService,
    EmailDeliverabilityHealthService,
    AgentCoachingScorecardService,
  ],
  exports: [
    ContactDeduplicationService,
    LeadEnrichmentPipelineService,
    SlaPolicyEngineService,
    BiPivotEngineService,
    VectorSimilarityService,
    AuditMerkleTreeService,
  ],
})
export class AppControllersModule {}
