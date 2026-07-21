'use client';

import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, BarChart3 } from 'lucide-react';

const sampleQuestions = [
  {
    category: 'Technical',
    question: 'Describe your experience with React and how you handle state management in large applications.',
    difficulty: 'Medium',
    keyPoints: ['Context API vs Redux tradeoffs', 'Performance considerations', 'Real project examples'],
  },
  {
    category: 'Behavioral',
    question: 'Tell me about a time you had to resolve a conflict within your engineering team.',
    difficulty: 'Easy',
    keyPoints: ['STAR method structure', 'Communication skills', 'Outcome-focused resolution'],
  },
  {
    category: 'System Design',
    question: 'How would you design a real-time collaborative document editing service?',
    difficulty: 'Hard',
    keyPoints: ['WebSocket architecture', 'Operational transforms / CRDT', 'Scaling considerations'],
  },
];

export function QuestionsPreview() {
  return (
    <section className="py-32 bg-white/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Smart Questions
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-4">
            Practice with tailored questions
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every question is generated based on your resume and the target role, with difficulty levels and expected answers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sampleQuestions.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl bg-white border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    item.difficulty === 'Easy'
                      ? 'bg-emerald-50 text-emerald-700'
                      : item.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {item.difficulty}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4">{item.question}</p>
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                  <Lightbulb className="h-3 w-3" />
                  Key talking points
                </div>
                {item.keyPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex h-1 w-1 rounded-full bg-primary shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mt-10 text-sm text-muted-foreground"
        >
          <BarChart3 className="h-4 w-4" />
          Questions adapt to your experience level and target role
        </motion.div>
      </div>
    </section>
  );
}
