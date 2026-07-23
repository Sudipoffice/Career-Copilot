// Stats section commented out — fake data not needed
// 'use client';
//
// import { motion } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';
//
// const stats = [
//   { label: 'Resumes Analyzed', value: 12400, suffix: '+' },
//   { label: 'Questions Generated', value: 85600, suffix: '+' },
//   { label: 'Avg. ATS Improvement', value: 18, suffix: '%' },
//   { label: 'Skills Identified', value: 34200, suffix: '+' },
// ];
//
// function AnimatedCounter({ to, suffix }: { to: number; suffix: string }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef<HTMLDivElement>(null);
//   const hasAnimated = useRef(false);
//
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry?.isIntersecting && !hasAnimated.current) {
//           hasAnimated.current = true;
//           const duration = 2000;
//           const start = performance.now();
//           const animate = (now: number) => {
//             const elapsed = now - start;
//             const progress = Math.min(elapsed / duration, 1);
//             const eased = 1 - Math.pow(1 - progress, 3);
//             setCount(Math.floor(eased * to));
//             if (progress < 1) requestAnimationFrame(animate);
//           };
//           requestAnimationFrame(animate);
//         }
//       },
//       { threshold: 0.3 },
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [to]);
//
//   return (
//     <div ref={ref}>
//       {count.toLocaleString()}{suffix}
//     </div>
//   );
// }
//
// export function Stats() {
//   return (
//     <section className="py-32">
//       <div className="container">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, i) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="text-center rounded-2xl bg-white border border-border p-8 shadow-sm"
//             >
//               <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2 tabular-nums">
//                 <AnimatedCounter to={stat.value} suffix={stat.suffix} />
//               </div>
//               <div className="text-sm text-muted-foreground">{stat.label}</div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
