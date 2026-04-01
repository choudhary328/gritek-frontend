import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const faqs = [
  {
    question: 'What is the typical lifecycle of a digital project with Gritek?',
    answer: 'While timelines vary by scope, a standard web project typically transitions from discovery to launch within 10–21 business days. Complex enterprise solutions or custom-engineered platforms usually follow a 4–8 week development roadmap. We provide a definitive milestone schedule during our initial strategic consultation.',
  },
  {
    question: 'Who retains the intellectual property and source code?',
    answer: 'You retain 100% ownership of the digital assets we build. Upon the successful finalization of the project, we provide a comprehensive handover of all source code, design assets, technical documentation, and infrastructure credentials. No hidden dependencies—the product is entirely yours.',
  },
  {
    question: 'How do you differentiate between template-based and bespoke development?',
    answer: 'Our template-led deployments offer a rapid, cost-effective entry for businesses with standard requirements. Conversely, our bespoke (custom) development services are architected from the ground up to solve unique business challenges, offering unlimited scalability, specialized functionality, and a proprietary competitive edge.',
  },
  {
    question: 'Do you offer post-deployment strategic support?',
    answer: 'Absolutely. We provide Tiered Support & Maintenance agreements that encompass security hardening, performance optimization, proactive updates, and continuous technical evolution. Our goal is to ensure your digital ecosystem remains resilient and ahead of the curve long after the initial launch.',
  },
  {
    question: 'What is your preferred technical stack for high-performance applications?',
    answer: 'We leverage a modern, battle-tested stack including React, Next.js, Node.js, and Flutter for fluid user experiences, complemented by robust backend frameworks like Laravel or Python for complex logic. Each stack is surgically selected to align with your project’s specific performance and scalability requirements.',
  },
];

export function FAQ() {
  return (
    <section className="py-12 bg-gradient-to-br from-[#ffffff] to-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#21362e] leading-tight sticky top-24">
              Frequently Asked Questions
            </h2>
          </motion.div>

          {/* Right Side - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-[#ffffff] rounded-xl border-l-4 border-transparent hover:border-[#21362e] transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
                  >
                    <AccordionTrigger className="text-left font-semibold text-[#21362e] hover:no-underline px-5 py-4 text-base hover:text-[#21362e] transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#21362e]/70 leading-relaxed px-5 pb-4 text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}