import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-blue-100 rounded-lg bg-white shadow-sm">
          <button
            className="w-full flex justify-between items-center px-4 py-3 text-left text-blue-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span>{item.question}</span>
            <span className="ml-2 text-xl">{openIndex === idx ? '−' : '+'}</span>
          </button>
          {openIndex === idx && (
            <div className="px-4 pb-4 text-gray-700 text-sm animate-fade-in">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}