'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-orange-500/10 via-transparent to-transparent rounded-full pointer-events-none" />
          <div className="relative z-10 px-8 py-20 sm:px-16 sm:py-28 text-center">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-white mb-4">
              Ready to Prepare Smarter?
            </h2>
            <p className="text-stone-400 max-w-lg mx-auto mb-8">
              Join thousands of job seekers using AI to land their dream roles.
            </p>
            <Link
              href="/resume"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all"
            >
              Analyze My Resume
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
