import React from 'react';
import { Info, Check, BadgeCheck } from 'lucide-react';

export const TechSpecs: React.FC = () => {
  return (
    <div id="recomendacoes" className="px-3 mt-6 pb-6">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-5 h-5 text-rose-500" />
        <h2 className="text-base font-bold text-neutral-900">Sobre o produto</h2>
      </div>

      <div className="rounded-xl border border-neutral-200 overflow-hidden bg-white shadow-2xs">
        {/* OMO PRO section */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
              OMO PRO
            </span>
            <span className="text-xs text-neutral-600 font-medium">
              Lava Roupas Líquido Profissional 7L
            </span>
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Fórmula com <strong>tecnologia nano-enzimática</strong> da Unilever Professional, líder
            mundial em sabão. Remove manchas difíceis já na <strong>primeira lavagem</strong>, preserva
            cores e fibras e tem pH neutro (7.0 – 8.0) seguro para roupas delicadas e pesadas.
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-neutral-700">
            <li className="flex gap-2">
              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Rende até <strong>100 lavagens</strong> ou <strong>500 kg de roupa</strong>
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>Dosagem: 6 mL por kg de roupa seca</span>
            </li>
            <li className="flex gap-2">
              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>Funciona em água fria (até 90°C)</span>
            </li>
            <li className="flex gap-2">
              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>Roupas brancas e coloridas, pré-lavagem e lavagem</span>
            </li>
          </ul>
        </div>

        <div className="h-px bg-neutral-200" />

        {/* COMFORT PRO section */}
        <div className="p-4 bg-gradient-to-br from-rose-50 to-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
              COMFORT PRO
            </span>
            <span className="text-xs text-neutral-600 font-medium">
              Amaciante Concentrado Profissional 7L
            </span>
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Amaciante <strong>super concentrado</strong> da Unilever Professional, com ingredientes
            biodegradáveis que penetram profundamente nas fibras. Entrega <strong>maciez intensa</strong> e{' '}
            <strong>perfume duradouro</strong> nas roupas, indicado também para sistemas Wet Cleaning.
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-neutral-700">
            <li className="flex gap-2">
              <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <span>
                Rende até <strong>98 lavagens</strong> por galão
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <span>Perfume que dura dias após a lavagem</span>
            </li>
            <li className="flex gap-2">
              <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <span>Fórmula biodegradável e segura</span>
            </li>
            <li className="flex gap-2">
              <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <span>Uso doméstico e profissional</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Ficha técnica Table */}
      <div className="mt-4 rounded-xl border border-neutral-200 overflow-hidden bg-white shadow-2xs">
        <div className="px-4 py-2.5 bg-neutral-50 text-xs font-bold text-neutral-700 border-b border-neutral-100">
          Ficha técnica
        </div>
        <dl className="divide-y divide-neutral-100 text-xs">
          <div className="flex px-4 py-2.5">
            <dt className="w-2/5 text-neutral-500">Marca</dt>
            <dd className="flex-1 text-neutral-800 font-medium">Unilever Professional</dd>
          </div>
          <div className="flex px-4 py-2.5">
            <dt className="w-2/5 text-neutral-500">Linha</dt>
            <dd className="flex-1 text-neutral-800 font-medium">OMO Pro + Comfort Pro</dd>
          </div>
          <div className="flex px-4 py-2.5">
            <dt className="w-2/5 text-neutral-500">Conteúdo</dt>
            <dd className="flex-1 text-neutral-800 font-medium">2 galões de 7 L (14 L no total)</dd>
          </div>
          <div className="flex px-4 py-2.5">
            <dt className="w-2/5 text-neutral-500">Tipo</dt>
            <dd className="flex-1 text-neutral-800 font-medium">
              Sabão líquido + Amaciante concentrado
            </dd>
          </div>
          <div className="flex px-4 py-2.5">
            <dt className="w-2/5 text-neutral-500">Rendimento</dt>
            <dd className="flex-1 text-neutral-800 font-medium">Até 100 lavagens cada</dd>
          </div>
          <div className="flex px-4 py-2.5">
            <dt className="w-2/5 text-neutral-500">Indicação</dt>
            <dd className="flex-1 text-neutral-800 font-medium">
              Máquinas domésticas e profissionais
            </dd>
          </div>
          <div className="flex px-4 py-2.5">
            <dt className="w-2/5 text-neutral-500">Origem</dt>
            <dd className="flex-1 text-neutral-800 font-medium">Produto original Unilever</dd>
          </div>
          <div className="flex px-4 py-2.5">
            <dt className="w-2/5 text-neutral-500">Validade</dt>
            <dd className="flex-1 text-neutral-800 font-medium">
              24 meses a partir da fabricação
            </dd>
          </div>
        </dl>
      </div>

      {/* Authenticity Guarantee */}
      <div className="mt-3 flex items-center gap-2 text-[11px] text-neutral-500">
        <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Produto 100% original, comercializado por revendedor autorizado Unilever.</span>
      </div>
    </div>
  );
};
