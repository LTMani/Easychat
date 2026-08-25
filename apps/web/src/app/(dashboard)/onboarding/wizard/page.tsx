'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Building, Mail, Users, Shield, Zap } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Organization Profile', desc: 'Set company name, timezone, default currency, and support email.', icon: Building },
  { id: 2, title: 'Connect Inbound Channels', desc: 'Configure SMTP/IMAP email address, WhatsApp Cloud API, or live chat widget.', icon: Mail },
  { id: 3, title: 'Invite Team Members', desc: 'Add colleagues with Admin, Agent, or Viewer roles.', icon: Users },
  { id: 4, title: 'Define SLA & Pipelines', desc: 'Set response time targets and create custom deal stages.', icon: Shield },
  { id: 5, title: 'Enable Automations', desc: 'Turn on lead routing, auto-assignment, and deal celebrations.', icon: Zap },
];

export default function OnboardingWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const handleCompleteStep = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (stepId < STEPS.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const progress = Math.round((completedSteps.length / STEPS.length) * 100);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-2">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome to EasyChat CRM Setup</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Complete the guided setup checklist to optimize your team's omnichannel communication workspace.
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto pt-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
            <span>Setup Progress</span>
            <span className="text-blue-600">{progress}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Step Cards List */}
      <div className="space-y-4">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isDone = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`bg-white rounded-2xl border transition-all p-6 ${
                isCurrent
                  ? 'border-blue-500 shadow-md ring-1 ring-blue-500'
                  : isDone
                  ? 'border-slate-200 opacity-90'
                  : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${isDone ? 'bg-emerald-50 text-emerald-600' : isCurrent ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      Step {step.id}: {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                  </div>
                </div>

                <div>
                  {isCurrent && (
                    <button
                      onClick={() => handleCompleteStep(step.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      Complete Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {isDone && !isCurrent && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Finished
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
