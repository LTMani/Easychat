'use client';

import React, { useState } from 'react';
import { Award, CheckCircle2, Star, User, ShieldCheck, AlertCircle, Save, Check } from 'lucide-react';

export default function QaCoachingScorecardsPage() {
  const [greetingScore, setGreetingScore] = useState(20);
  const [empathyScore, setEmpathyScore] = useState(20);
  const [technicalScore, setTechnicalScore] = useState(30);
  const [fcrScore, setFcrScore] = useState(30);
  const [notes, setNotes] = useState('Agent maintained exceptional composure and verified customer identity before resolving MFA reset.');
  const [saved, setSaved] = useState(false);

  const totalScore = greetingScore + empathyScore + technicalScore + fcrScore;
  const isPassed = totalScore >= 80;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Support QA & Coaching Scorecard</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-criteria agent evaluation rubric, compliance audit, and coaching feedback.</p>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-xl text-xs font-black font-mono border flex items-center gap-1.5 shadow-xs ${
          isPassed ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {isPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          Score: {totalScore} / 100 ({isPassed ? 'PASSED' : 'NEEDS IMPROVEMENT'})
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Rubric Evaluation Form */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm">Evaluation Criteria (Ticket #TKT-2026-1001)</h3>

          <div className="space-y-5 text-xs">
            {/* Criteria 1 */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>1. Professional Greeting & Identity Verification</span>
                <span className="font-mono text-purple-600">{greetingScore} / 20 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={greetingScore}
                onChange={(e) => setGreetingScore(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            {/* Criteria 2 */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>2. Empathy, Active Listening & Tone</span>
                <span className="font-mono text-purple-600">{empathyScore} / 20 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={empathyScore}
                onChange={(e) => setEmpathyScore(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            {/* Criteria 3 */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>3. Technical Accuracy & Solution Precision</span>
                <span className="font-mono text-purple-600">{technicalScore} / 30 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={technicalScore}
                onChange={(e) => setTechnicalScore(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            {/* Criteria 4 */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>4. First Contact Resolution (FCR)</span>
                <span className="font-mono text-purple-600">{fcrScore} / 30 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={fcrScore}
                onChange={(e) => setFcrScore(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            <div className="pt-2 space-y-1.5">
              <label className="font-bold text-slate-700">Supervisor Coaching Notes & Action Items</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full font-sans bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500 text-xs"
              />
            </div>

            <button
              onClick={() => setSaved(true)}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors"
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Scorecard Saved to Agent File' : 'Save QA Scorecard'}
            </button>
          </div>
        </div>

        {/* Agent Metadata Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Agent Evaluation File</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                SJ
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Sarah Jenkins</h4>
                <p className="text-slate-500 text-[11px]">Senior Technical Lead</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Historical Avg QA:</span>
                <span className="font-mono font-bold text-slate-900">94.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Evaluations Conducted:</span>
                <span className="font-mono font-bold text-slate-900">48</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Band:</span>
                <span className="font-bold text-emerald-600">Top Performer (Tier 1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
