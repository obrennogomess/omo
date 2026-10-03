import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, ArrowLeft, ShieldCheck } from 'lucide-react';

interface TrackingPageProps {
  initialCode?: string;
  orderData?: any;
  onBackToStore: () => void;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({
  initialCode = '',
  orderData,
  onBackToStore,
}) => {
  const [trackingCode, setTrackingCode] = useState(initialCode || 'BR492019482TS');
  const [searched, setSearched] = useState(Boolean(initialCode));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-neutral-800 font-sans pb-16">
      {/* Top Header */}
      <header className="bg-[#00416b] text-white py-3.5 px-4 shadow-sm">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-wide">Central de Rastreio</span>
          </div>
          <button
            onClick={onBackToStore}
            className="text-xs text-white/80 hover:text-white flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Loja
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-5">
        {/* Breadcrumb */}
        <button
          onClick={onBackToStore}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#00416b] mb-4 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para a loja
        </button>

        <h1 className="text-xl font-extrabold text-[#00416b] mb-4">
          Acompanhe seu Pedido
        </h1>

        {/* Search Card */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs text-center flex flex-col items-center mb-5"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#00416b] flex items-center justify-center mb-3">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-base text-[#00416b]">Consultar rastreio</h2>
          <p className="text-xs text-neutral-500 mt-1 mb-4">
            Digite o código de rastreio do seu pedido para acompanhar.
          </p>

          <div className="w-full max-w-sm flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Ex.: AA123456789BR"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              required
              className="flex-1 border border-neutral-300 rounded-lg px-3.5 py-2.5 text-center font-bold tracking-widest text-sm uppercase text-neutral-800 focus:outline-none focus:border-[#00416b]"
            />
            <button
              type="submit"
              className="bg-[#00416b] hover:bg-[#003152] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors active:scale-98"
            >
              Rastrear
            </button>
          </div>
        </form>

        {/* Tracking Details Results */}
        {searched && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Summary card */}
            <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                    Pedido Postado com Sucesso
                  </div>
                  <div className="text-sm font-bold text-neutral-900">
                    Código: <span className="font-mono text-[#00416b]">{trackingCode}</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-neutral-100 text-xs mt-2">
                <div className="flex justify-between py-2">
                  <span className="text-neutral-500">Destinatário:</span>
                  <span className="font-medium text-neutral-900">
                    {orderData?.name || 'Cliente Verificado'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-neutral-500">Modalidade:</span>
                  <span className="font-medium text-neutral-900">
                    {orderData?.shippingMethod || 'SEDEX Express / PAC'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-neutral-500">Origem:</span>
                  <span className="font-medium text-neutral-900">CD Unilever - São Paulo / SP</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-neutral-500">Previsão de Entrega:</span>
                  <span className="font-bold text-emerald-700">1 a 4 dias úteis</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">
                Histórico do Objeto
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
                {/* Event 1 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-xs" />
                  <div>
                    <span className="text-xs font-bold text-emerald-700">
                      Objeto em transferência
                    </span>
                    <p className="text-[11px] text-neutral-600 mt-0.5">
                      De: Centro de Distribuição Unilever (São Paulo/SP)
                    </p>
                    <p className="text-[11px] text-neutral-600">
                      Para: Unidade de Tratamento Regional do seu estado
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1 block">
                      Hoje às 09:42 • Em trânsito
                    </span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-xs" />
                  <div>
                    <span className="text-xs font-bold text-neutral-900">
                      Objeto postado e etiquetado
                    </span>
                    <p className="text-[11px] text-neutral-600 mt-0.5">
                      Origem: Centro Logístico Unilever Professional
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1 block">
                      Hoje às 08:15
                    </span>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-neutral-300 border-2 border-white shadow-xs" />
                  <div>
                    <span className="text-xs font-bold text-neutral-700">
                      Pagamento aprovado e pedido faturado
                    </span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Nota fiscal eletrônica emitida
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1 block">
                      Hoje às 07:30
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-6">
          <button
            onClick={onBackToStore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-[#00416b] text-[#00416b] hover:bg-blue-50 font-bold text-xs py-3 px-8 rounded-lg shadow-xs transition-colors"
          >
            Voltar para a loja
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-neutral-500 border-t border-neutral-200 pt-6">
        <p>© 2026 Central de Rastreio • Acompanhamento oficial de pedidos</p>
      </footer>
    </div>
  );
};
