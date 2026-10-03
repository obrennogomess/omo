import React, { useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggle = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div id="duvida" className="px-3 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-5 h-5 text-rose-500" />
        <h2 className="text-base font-bold text-neutral-900">Perguntas Frequentes</h2>
      </div>

      <div className="space-y-2">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-2xs transition-colors"
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left transition-colors hover:bg-neutral-50"
              >
                <span className="text-sm font-semibold text-neutral-900">{item.question}</span>
                {isOpen ? (
                  <Minus className="w-4 h-4 text-neutral-500 shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-neutral-500 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-3.5 pt-0 text-xs text-neutral-700 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
