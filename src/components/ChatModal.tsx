import React, { useState } from 'react';
import { X, Send, Bot, User, CheckCircle2 } from 'lucide-react';
import { STORE_DATA } from '../data/mockData';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Olá! Sou o atendente virtual da Unilever Professional na TikTok Shop. Como posso ajudar você hoje?',
      time: 'Agora',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const quickQuestions = [
    'O produto é 100% original?',
    'Qual o prazo de entrega?',
    'Tem frete grátis?',
    'Como pagar com PIX?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: 'Agora',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Automated response
    setTimeout(() => {
      let reply = 'Estamos à disposição! Todos os nossos kits contam com garantia oficial e nota fiscal.';
      const lower = text.toLowerCase();
      if (lower.includes('original')) {
        reply = 'Sim! Somos revendedores autorizados da Unilever Professional. Os galões de OMO Pro 7L e Comfort Pro 7L são 100% originais, lacrados e com código de lote e garantia.';
      } else if (lower.includes('prazo') || lower.includes('entrega')) {
        reply = 'O envio é imediato via transportadora expressa ou Correios (SEDEX/PAC). A previsão média de entrega varia de 1 a 5 dias úteis dependendo da sua região!';
      } else if (lower.includes('frete')) {
        reply = 'Sim! O frete é 100% GRÁTIS para qualquer cidade do Brasil na compra da nossa Oferta Relâmpago!';
      } else if (lower.includes('pix')) {
        reply = 'O pagamento via PIX é instantâneo e totalmente seguro. Você recebe o QR Code e o código Copia e Cola na finalização do pedido para aprovação imediata!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: 'Agora',
        },
      ]);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center backdrop-blur-2xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[480px] h-[85vh] sm:h-[600px] rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="bg-neutral-900 text-white px-4 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={STORE_DATA.avatar}
                alt="Unilever"
                className="w-9 h-9 rounded-full object-cover border border-white/20"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-neutral-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm">Suporte Unilever</h3>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 text-neutral-900" />
              </div>
              <p className="text-[11px] text-neutral-300">Tempo de resposta: instantâneo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-neutral-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-tr-none'
                    : 'bg-white text-neutral-800 border border-neutral-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Suggestions */}
        <div className="p-2 border-t border-neutral-100 bg-white flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-full whitespace-nowrap active:scale-95 transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Digite sua dúvida..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-neutral-100 rounded-full px-4 py-2 text-xs text-neutral-900 outline-none focus:ring-1 focus:ring-neutral-400"
          />
          <button
            onClick={() => handleSend()}
            className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
