'use client';

import Link from 'next/link';
import { ArrowRight, Play, Sparkles, Briefcase, MapPin } from 'lucide-react';

function MetaLogoBadge() {
  return (
    <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center h-11 w-11 rounded-xl bg-white shadow-lg border border-slate-100">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#0668E1]">
        <path d="M16.741 4.544c-1.488 0-2.856.84-4.041 2.222-1.185-1.382-2.553-2.222-4.041-2.222C4.042 4.544 2 7.822 2 12.002c0 4.18 2.042 7.458 6.659 7.458 1.488 0 2.856-.84 4.041-2.222 1.185 1.382 2.553 2.222 4.041 2.222 4.617 0 6.659-3.278 6.659-7.458 0-4.18-2.042-7.458-6.659-7.458zm-8.082 12.58c-3.141 0-4.321-2.316-4.321-5.122 0-2.806 1.18-5.122 4.321-5.122 1.258 0 2.457.859 3.421 2.378-1.745 2.518-2.85 5.518-3.421 7.866zm8.082 0c-.571-2.348-1.676-5.348-3.421-7.866.964-1.519 2.163-2.378 3.421-2.378 3.141 0 4.321 2.316 4.321 5.122 0 2.806-1.18 5.122-4.321 5.122z" />
      </svg>
    </div>
  );
}

function GoogleLogoBadge() {
  return (
    <div className="absolute top-12 -right-4 z-20 hidden sm:flex items-center justify-center h-11 w-11 rounded-xl bg-white shadow-lg border border-slate-100">
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
    </div>
  );
}

function AmazonLogoBadge() {
  return (
    <div className="absolute bottom-16 -right-6 z-20 hidden sm:flex items-center justify-center h-11 w-11 rounded-xl bg-white shadow-lg border border-slate-100">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#FF9900]">
        <path d="M13.418 11.238c-.378-.456-.913-.679-1.605-.679-.838 0-1.487.322-1.948.966-.46.645-.691 1.542-.691 2.693 0 1.171.226 2.072.678 2.705.452.632 1.096.948 1.932.948.721 0 1.282-.236 1.684-.709.403-.473.604-1.127.604-1.962v-.714c0-.987-.218-1.74-.654-2.248zm.431-2.923v1.175c-.562-.487-1.29-.73-2.184-.73-1.42 0-2.545.485-3.376 1.455-.83 1.002-1.246 2.378-1.246 4.128 0 1.738.423 3.104 1.269 4.099.845.995 1.986 1.493 3.421 1.493.916 0 1.637-.25 2.163-.751v.618c0 .872-.211 1.516-.633 1.932-.422.417-1.077.625-1.966.625-.851 0-1.604-.199-2.261-.598l-.51 1.342c.868.498 1.879.747 3.033.747 1.368 0 2.416-.367 3.143-1.101.727-.734 1.091-1.848 1.091-3.342v-8.792h-1.944z" />
      </svg>
    </div>
  );
}

function ScoreWidget() {
  return (
    <div className="absolute top-[38%] -right-10 z-30 w-[240px] rounded-2xl bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-slate-100 select-none">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">Resume Score</span>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-orange-600">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          AI Score Ready
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-2 w-24 rounded-full bg-slate-100" />
          <div className="h-2 w-16 rounded-full bg-slate-100" />
          <button className="mt-1 flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-sm hover:bg-orange-600 transition-colors">
            <Sparkles className="h-3 w-3 text-white" />
            Improve Match
          </button>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center h-16 w-16">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="3.5"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3.5"
              strokeDasharray="96, 100"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-sm font-bold text-slate-900">96%</span>
        </div>
      </div>
    </div>
  );
}

function AIChatWidget() {
  return (
    <div className="absolute -bottom-8 -left-10 z-30 w-[300px] sm:w-[330px] rounded-2xl bg-white p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col gap-2.5">
      {/* User message */}
      <div className="flex items-center gap-2 self-end">
        <div className="rounded-2xl rounded-tr-none bg-orange-50 px-3.5 py-2 text-xs font-medium text-primary border border-orange-100">
          Why is my resume weak?
        </div>
        <div className="h-7 w-7 rounded-full bg-amber-100 p-0.5 shrink-0 overflow-hidden border border-amber-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://raw.githubusercontent.com/Sudipoffice/portfolioImages/main/images/sudip.webp"
            alt="User Avatar"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* AI Message */}
      <div className="rounded-xl bg-slate-100/90 p-3 text-xs font-medium text-slate-800 leading-snug">
        Your experience was strong. The wording wasn&apos;t. Fixed it.
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 border border-slate-200/70 text-xs text-slate-400 font-medium">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span>Ask Career Copilot AI</span>
      </div>
    </div>
  );
}

function TopProfileAvatar() {
  return (
    <div className="absolute -top-10 right-16 z-20 h-24 w-24 rounded-full bg-white p-1 shadow-lg shadow-black/10 border-2 border-primary overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://raw.githubusercontent.com/Sudipoffice/portfolioImages/main/images/sudip.webp"
        alt="Sudip Mandal Profile"
        className="h-full w-full rounded-full object-cover "
      />
    </div>
  );
}

function ResumeStack() {
  return (
    <div className="relative w-full max-w-[500px] mx-auto py-6 select-none">
      {/* Brand Badges */}
      <MetaLogoBadge />
      <GoogleLogoBadge />
      <AmazonLogoBadge />

      {/* Top Profile Avatar */}
      <TopProfileAvatar />

      {/* Score Widget */}
      <ScoreWidget />

      {/* AI Chat Widget */}
      <AIChatWidget />

      {/* Main Resume Canvas */}
      <div className="relative w-full rounded-2xl bg-white p-7 sm:p-8 shadow-[0_25px_65px_-15px_rgba(0,0,0,0.1)] border border-slate-200/80 z-10 font-sans">
        {/* Header Row with Selected Box */}
        <div className="relative inline-block border-2 border-primary p-2 pr-6 rounded-md bg-orange-50/20">
          <div className="flex items-baseline gap-2">
            <h1 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">Sudip Mandal</h1>
            <span className="text-sm font-semibold text-slate-700">Full Stack Developer</span>
          </div>

          {/* Selection handles */}
          <div className="absolute -top-1 -left-1 h-2 w-2 bg-primary border border-white" />
          <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary border border-white" />
          <div className="absolute -bottom-1 -left-1 h-2 w-2 bg-primary border border-white" />
          <div className="absolute -bottom-1 -right-1 h-2 w-2 bg-primary border border-white" />

          {/* Floating formatting toolbar */}
          <div className="absolute -bottom-6 -left-4 flex items-center gap-3.5 rounded-lg bg-white px-3.5 py-1.5 shadow-md border border-slate-200 text-xs font-serif font-bold text-slate-700 z-30">
            <span>B</span>
            <span className="italic">I</span>
            <span className="underline">U</span>
          </div>
        </div>

        {/* Contact info bar */}
        <div className="mt-8 flex items-center gap-3 text-[11px] text-slate-600 font-medium flex-wrap">
          <span>mandalsudipoffice@gmail.com</span>
          <span>📞 +91 7003071143</span>
          <span>🌐 sudipmandal.netlify.app</span>
          <span>GitHub /sudipmandal</span>
          <span>in sudip-mandal</span>
        </div>

        {/* Summary statement */}
        <p className="mt-6 text-xs text-slate-600 leading-relaxed font-serif italic text-center px-2">
          Full Stack Developer specializing in AI-integrated product features, REST APIs, and automated testing, with proven ownership of features end-to-end from design through deployment.
        </p>

        {/* Work Experience Section */}
        <div className="mt-6">
          <h3 className="font-serif text-xs font-bold text-slate-900 border-b border-slate-100 pb-1 mb-3">
            Work Experience
          </h3>

          {/* Job 1 */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-slate-900">Full Stack Intern</h4>
              <span className="flex items-center gap-1 text-[10.5px] font-semibold text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Banao Technologies
              </span>
              <span className="flex items-center gap-1 text-[10.5px] text-slate-500">
                <Briefcase className="h-3 w-3" /> Internship
              </span>
              <span className="flex items-center gap-1 text-[10.5px] text-slate-500">
                <MapPin className="h-3 w-3" /> Kolkata
              </span>
            </div>

            <ul className="mt-2.5 space-y-1 text-[11px] text-slate-600 leading-normal">
              <li className="flex items-start gap-1.5">• Engineered end-to-end full-stack features for an AI-driven recruitment platform using React.js, Next.js, Node.js, and Express.js.</li>
              <li className="flex items-start gap-1.5">• Architected RESTful APIs, MongoDB data models, and JWT-based authentication with RBAC across 3 environments.</li>
              <li className="flex items-start gap-1.5">• Integrated LLM (Gemini API) workflows for auto-generated documentation and candidate reports.</li>
              <li className="flex items-start gap-1.5">• Designed a Playwright automation framework with daily test execution and failure analysis reporting.</li>
            </ul>
          </div>

          {/* Job 2 Preview */}
          <div className="mt-4 opacity-40">
            <div className="flex items-center gap-2 flex-wrap text-[10.5px] text-slate-500">
              <span>QA Tracker</span>
              <span>
                <Briefcase className="h-3 w-3 inline mr-1" />
                Project
              </span>
              <span>
                <MapPin className="h-3 w-3 inline mr-1" />
                Remote
              </span>
              <span>Full Stack</span>
            </div>
            <p className="mt-1 text-[10.5px] text-slate-500 leading-tight">
              Full-stack QA task management platform with JWT auth...<br />
              Analytics dashboard with MongoDB aggregation-driven stats...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/40 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-100/30 via-transparent to-transparent rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              AI-Powered Career Preparation
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight text-foreground">
              Land Your Dream Job with{' '}
              <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                AI-Powered
              </span>{' '}
              Preparation
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Upload your resume, paste a job description, and let AI analyze the match, identify
              skill gaps, improve your ATS score, and generate personalized interview questions.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/resume"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all"
              >
                Analyze My Resume
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-white/60 px-8 text-sm font-medium text-foreground hover:bg-white hover:shadow-sm active:scale-[0.98] transition-all"
              >
                <Play className="h-4 w-4" />
                See How It Works
              </a>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              {/* <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-stone-200 to-stone-300"
                  />
                ))}
              </div> */}
              {/* <div>
                <span className="font-semibold text-foreground">2,400+</span> job seekers this month
              </div> */}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <ResumeStack />
          </div>
        </div>
      </div>
    </section>
  );
}
