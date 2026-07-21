'use client';

import { motion } from 'framer-motion';
import { Shield, TrendingUp, Award, BarChart3, Target, BookOpen } from 'lucide-react';
import type { Resume, SkillGapResult } from '@/lib/api-client';

interface Props {
  resumes: Resume[];
  latestSkillGap?: SkillGapResult | null;
}

function readinessData(resumes: Resume[], latestSkillGap?: SkillGapResult | null) {
  const scores: { label: string; value: number; icon: typeof Shield; color: string; detail: string }[] = [];

  let totalWeight = 0;
  let totalScore = 0;

  const ats = resumes.find((r) => r.parsedContent?.overallScore != null)?.parsedContent;
  if (ats) {
    const val = ats.overallScore;
    totalScore += val * 0.3;
    totalWeight += 0.3;
    scores.push({
      label: 'ATS Compatibility',
      value: val,
      icon: Award,
      color: val >= 80 ? 'text-emerald-600' : val >= 60 ? 'text-amber-600' : 'text-rose-600',
      detail: ats.atsRating,
    });
  }

  const match = latestSkillGap;
  if (match) {
    const val = match.matchPercentage;
    totalScore += val * 0.3;
    totalWeight += 0.3;
    scores.push({
      label: 'Skill Match',
      value: val,
      icon: Target,
      color: val >= 80 ? 'text-emerald-600' : val >= 60 ? 'text-amber-600' : 'text-rose-600',
      detail: `${match.matchingSkills.length} matching · ${match.missingSkills.length} gaps`,
    });
  }

  const hasResume = resumes.length > 0;
  if (hasResume) {
    const val = 75;
    totalScore += val * 0.2;
    totalWeight += 0.2;
    scores.push({
      label: 'Resume Quality',
      value: val,
      icon: BarChart3,
      color: 'text-emerald-600',
      detail: `${resumes.length} resume${resumes.length > 1 ? 's' : ''} uploaded`,
    });
  }

  const interview = ats && match ? 70 : ats ? 60 : 0;
  if (interview > 0) {
    totalScore += interview * 0.1;
    totalWeight += 0.1;
    scores.push({
      label: 'Interview Readiness',
      value: interview,
      icon: BookOpen,
      color: 'text-blue-600',
      detail: match ? 'Questions available' : 'Run skill gap to unlock',
    });
  }

  const learning = match ? 65 : 0;
  if (learning > 0) {
    totalScore += learning * 0.1;
    totalWeight += 0.1;
    scores.push({
      label: 'Learning Progress',
      value: learning,
      icon: TrendingUp,
      color: 'text-violet-600',
      detail: match ? `${match.recommendations.length} recommendations` : 'Analyze to get started',
    });
  }

  const overall = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;

  return { overall, scores };
}

function scoreColor(val: number) {
  if (val >= 80) return { text: 'text-emerald-600', bg: 'bg-emerald-500', ring: 'ring-emerald-500', label: 'Strong' };
  if (val >= 60) return { text: 'text-amber-600', bg: 'bg-amber-500', ring: 'ring-amber-500', label: 'Fair' };
  return { text: 'text-rose-600', bg: 'bg-rose-500', ring: 'ring-rose-500', label: 'Needs Work' };
}

function barColor(val: number) {
  if (val >= 80) return 'bg-emerald-500';
  if (val >= 60) return 'bg-amber-500';
  return 'bg-rose-500';
}

export function CareerReadinessScore({ resumes, latestSkillGap }: Props) {
  const { overall, scores } = readinessData(resumes, latestSkillGap);
  const colors = scoreColor(overall);

  if (overall === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-sm">
            <Shield className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-semibold">Career Readiness</h3>
            <p className="text-xs text-muted-foreground">Your overall career preparation score</p>
          </div>
        </div>
        <div className="text-right">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`text-4xl font-bold ${colors.text}`}
          >
            {overall}
            <span className="text-lg font-normal text-muted-foreground">%</span>
          </motion.div>
          <span className={`text-xs font-medium ${colors.text}`}>{colors.label}</span>
        </div>
      </div>

      <div className="space-y-4">
        {scores.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-sm">
                <s.icon className={`h-3.5 w-3.5 ${s.color}`} />
                <span className="font-medium">{s.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${s.color}`}>{s.value}%</span>
              </div>
            </div>
            <div className="relative h-2 rounded-full bg-stone-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                className={`h-full rounded-full ${barColor(s.value)}`}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{s.detail}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
        Score based on resume quality, ATS compatibility, skill match, interview readiness, and learning progress.
      </p>
    </div>
  );
}
