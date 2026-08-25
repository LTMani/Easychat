# EasyChat Automation Engine - AST & Flowchart Execution Specification

The EasyChat Automation Engine provides visual drag-and-drop flowchart workflow automation with event-driven triggers, conditional AST node evaluation, and action execution.

## Flowchart Node Model Hierarchy

```
[ Trigger Node ]  -->  [ Condition Node ]  -->  [ Action Node ]
 (e.g. Ticket Created)    (Lead Score >= 80)     (Assign to Sales)
```

### 1. Trigger Nodes (`TRIGGER`)
Triggers listen to EventEmitter bus events or background BullMQ queues:
- `LEAD_CREATED`: Triggers when a new lead is ingested via Webhook or Form.
- `DEAL_STAGE_CHANGED`: Triggers when a deal moves across Kanban pipeline stages.
- `TICKET_CREATED`: Triggers when a support ticket is created.
- `MESSAGE_RECEIVED`: Triggers on incoming omnichannel chat messages.
- `SLA_BREACHED`: Triggers when a ticket breaches first-response or resolution SLA.

### 2. Condition Nodes (`CONDITION`)
Condition nodes parse Abstract Syntax Tree (AST) expressions:
- Operators: `EQUALS`, `NOT_EQUALS`, `GREATER_THAN`, `GREATER_EQUAL`, `CONTAINS`, `MATCHES_REGEX`.
- Evaluates against contact properties, deal values, lead scores, or custom fields.

### 3. Action Nodes (`ACTION`)
- `SEND_NOTIFICATION`: Emits web socket notification and email.
- `ASSIGN_USER`: Re-assigns ticket or lead based on round-robin queue.
- `TRIGGER_WEBHOOK`: Dispatches signed HTTP POST payload to external URL.
- `SEND_EMAIL_TEMPLATE`: Renders Mustache HTML email template with entity variables.
