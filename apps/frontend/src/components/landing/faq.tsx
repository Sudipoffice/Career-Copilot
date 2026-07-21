'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does the resume analysis work?',
    a: 'Upload your resume (PDF or DOCX). Our AI extracts and structures your experience, skills, education, and projects. It then compares this against the job description to generate a detailed match analysis.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. Your resume and job description data are stored securely and used only for analysis. We do not share your data with third parties. You can delete your data at any time.',
  },
  {
    q: 'Do I need an account to use the platform?',
    a: 'No. The MVP is completely guest-first. You can upload resumes, paste job descriptions, and get full analysis without creating an account.',
  },
  {
    q: 'What file formats are supported for resumes?',
    a: 'We support PDF and DOCX formats. The maximum file size is 10MB. Our AI extracts text from both formats with high accuracy.',
  },
  {
    q: 'How accurate is the ATS score?',
    a: 'The ATS score is based on keyword matching, section structure, formatting quality, and content relevance. It provides a strong indicator of how well your resume will perform with applicant tracking systems.',
  },
  {
    q: 'Can I use this for any job role?',
    a: 'Yes. The AI is role-agnostic and works for any industry or position — from software engineering to marketing, finance, healthcare, and more.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-4">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left font-medium transition-colors hover:bg-stone-50"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
