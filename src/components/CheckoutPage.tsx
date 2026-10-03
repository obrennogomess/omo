import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Check,
  Truck,
  Clock,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  QrCode,
  Lock,
  Copy,
} from 'lucide-react';
import { OFFERS, SHIPPING_OPTIONS, UPSELL_ITEM } from '../data/mockData';
import { OfferItem, ShippingOption } from '../types';
import { generateAcquirerPixPayload } from '../utils/acquirerPix';

interface CheckoutPageProps {
  initialOfferId?: string;
  onBackToStore: () => void;
  onNavigateToTracking: (trackingCode: string, orderData: any) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  initialOfferId = 'kit-1',
  onBackToStore,
  onNavigateToTracking,
}) => {
  const [selectedOfferId, setSelectedOfferId] = useState<string>(initialOfferId);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  // Form State - Step 1: Identification
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');

  // Form State - Step 2: Shipping / Delivery
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedShipping, setSelectedShipping] = useState<string>('pac');
  const [addUpsell, setAddUpsell] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Form State - Step 3: Payment
  const [pixCopied, setPixCopied] = useState(false);
  const [pixTimeLeft, setPixTimeLeft] = useState(900); // 15:00 minutes
  const [sigiloPayUrl, setSigiloPayUrl] = useState<string>('');
  const [isConnectingSigiloPay, setIsConnectingSigiloPay] = useState(false);
  const [sigiloPayError, setSigiloPayError] = useState<string | null>(null);

  // Current offer
  const currentOffer: OfferItem =
    OFFERS.find((o) => o.id === selectedOfferId) || OFFERS[0];
  const shipping: ShippingOption = SHIPPING_OPTIONS[selectedShipping] || SHIPPING_OPTIONS.pac;

  const upsellPrice = addUpsell ? UPSELL_ITEM.price : 0;
  const totalPrice = currentOffer.price + shipping.price + upsellPrice;

  // Function to create checkout on SigiloPay
  const createSigiloPayCheckout = async () => {
    setIsConnectingSigiloPay(true);
    setSigiloPayError(null);
    try {
      const response = await fetch('/api/sigilopay/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId: selectedOfferId,
          customer: {
            name: fullName,
            email: email,
            phone: phone,
            document: cpf,
          },
          address: {
            cep: cep,
            street: street,
            number: number,
            complement: complement,
            neighborhood: neighborhood,
            city: city,
            state: state,
          },
          shipping: shipping,
          upsell: addUpsell,
        }),
      });

      const data = await response.json();
      if (response.ok && data.checkoutUrl) {
        setSigiloPayUrl(data.checkoutUrl);
      }
    } catch (err: any) {
      console.warn('SigiloPay checkout session notice:', err);
    } finally {
      setIsConnectingSigiloPay(false);
      setStep(3);
    }
  };

  // Mask helpers
  const formatPhone = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    if (raw.length <= 2) return raw;
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
  };

  const formatCpf = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    if (raw.length <= 3) return raw;
    if (raw.length <= 6) return `${raw.slice(0, 3)}.${raw.slice(3)}`;
    if (raw.length <= 9) return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
  };

  const formatCep = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 8);
    if (raw.length <= 5) return raw;
    return `${raw.slice(0, 5)}-${raw.slice(5)}`;
  };

  // ViaCEP Auto Lookup
  const handleCepChange = async (val: string) => {
    const formatted = formatCep(val);
    setCep(formatted);
    const clean = val.replace(/\D/g, '');
    if (clean.length === 8) {
      setIsLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setStreet(data.logradouro || '');
          setNeighborhood(data.bairro || '');
          setCity(data.localidade || '');
          setState(data.uf || '');
        }
      } catch (err) {
        console.error('ViaCEP error:', err);
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  // Timer for PIX
  useEffect(() => {
    if (step !== 3) return;
    const timer = setInterval(() => {
      setPixTimeLeft((prev) => (prev > 1 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  const pixMinutes = Math.floor(pixTimeLeft / 60)
    .toString()
    .padStart(2, '0');
  const pixSeconds = (pixTimeLeft % 60).toString().padStart(2, '0');

  // Official PIX payload directly for the acquirer: PAY CONDUCTOR (SigiloPay)
  const acquirerPixCode = useMemo(() => {
    return generateAcquirerPixPayload({
      amount: totalPrice,
      txid: selectedOfferId === 'kit-2' ? 'PAYKIT2' : 'PAYKIT1',
    });
  }, [totalPrice, selectedOfferId]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(acquirerPixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const handleFinishPayment = () => {
    const trackingCode = `BR${Math.floor(100000000 + Math.random() * 900000000)}TS`;
    onNavigateToTracking(trackingCode, {
      product: currentOffer.title,
      total: totalPrice,
      name: fullName || 'Cliente',
      address: `${street}, ${number} - ${neighborhood}, ${city}/${state}`,
      shippingMethod: shipping.label,
    });
  };

  const isStep1Valid =
    email.includes('@') &&
    phone.replace(/\D/g, '').length >= 10 &&
    fullName.trim().length >= 3 &&
    cpf.replace(/\D/g, '').length >= 11;

  const isStep2Valid =
    cep.replace(/\D/g, '').length === 8 &&
    street.trim().length >= 3 &&
    number.trim().length >= 1 &&
    city.trim().length >= 2;

  const formatBrl = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 pb-12 font-sans">
      <div className="mx-auto max-w-[480px] bg-zinc-100 min-h-screen">
        {/* Top bar with back to store */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 bg-white border-b border-zinc-200">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar à loja
          </button>
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-sm tracking-tight text-neutral-900">
              TikTok Shop
            </span>
          </div>
        </div>

        {/* Order Summary Dropdown */}
        <div className="mx-4 mt-3 bg-white rounded-2xl shadow-xs border border-zinc-200/80 overflow-hidden">
          <button
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-zinc-900">Resumo do pedido</span>
              <span className="text-xs text-zinc-500 font-normal">
                ({currentOffer.qty}x {currentOffer.title})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-zinc-900">{formatBrl(totalPrice)}</span>
              {isSummaryOpen ? (
                <ChevronUp className="w-4 h-4 text-zinc-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              )}
            </div>
          </button>

          {isSummaryOpen && (
            <div className="px-5 pb-4 pt-1 border-t border-zinc-100 text-xs text-zinc-700 space-y-2">
              <div className="flex items-center gap-3 py-2">
                <img
                  src={currentOffer.image}
                  alt={currentOffer.title}
                  className="w-12 h-12 object-contain bg-zinc-50 rounded-lg p-0.5 border border-zinc-200"
                />
                <div className="flex-1">
                  <p className="font-semibold text-zinc-900">{currentOffer.title}</p>
                  <p className="text-[11px] text-zinc-500">Quantidade: {currentOffer.qty}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold">{formatBrl(currentOffer.price)}</span>
                </div>
              </div>

              {addUpsell && (
                <div className="flex items-center justify-between py-1 text-emerald-700">
                  <span>+ {UPSELL_ITEM.title}</span>
                  <span className="font-bold">{formatBrl(UPSELL_ITEM.price)}</span>
                </div>
              )}

              <div className="flex justify-between pt-1">
                <span className="text-zinc-500">Frete ({shipping.label})</span>
                <span className="font-semibold text-emerald-600">
                  {shipping.price === 0 ? 'Grátis' : formatBrl(shipping.price)}
                </span>
              </div>

              <div className="border-t border-zinc-100 pt-2 flex justify-between text-sm">
                <span className="font-bold text-zinc-900">Total a pagar</span>
                <span className="font-extrabold text-rose-600 text-base">
                  {formatBrl(totalPrice)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 3 Steps Indicator */}
        <div className="mx-4 mt-3 bg-white rounded-2xl shadow-xs border border-zinc-200/80 px-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step === 1
                    ? 'bg-zinc-900 text-white'
                    : step > 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-100 text-zinc-400'
                }`}
              >
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <p
                className={`text-[12px] ${
                  step >= 1 ? 'font-bold text-zinc-900' : 'text-zinc-400'
                }`}
              >
                Identificação
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step === 2
                    ? 'bg-zinc-900 text-white'
                    : step > 2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-100 text-zinc-400'
                }`}
              >
                {step > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <p
                className={`text-[12px] ${
                  step >= 2 ? 'font-bold text-zinc-900' : 'text-zinc-400'
                }`}
              >
                Entrega
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step === 3 ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'
                }`}
              >
                3
              </div>
              <p
                className={`text-[12px] ${
                  step === 3 ? 'font-bold text-zinc-900' : 'text-zinc-400'
                }`}
              >
                Pagamento
              </p>
            </div>
          </div>
        </div>

        {/* STEP 1: IDENTIFICAÇÃO */}
        {step === 1 && (
          <div className="mx-4 mt-3 bg-white rounded-2xl shadow-xs border border-zinc-200/80 p-5 space-y-4">
            <div>
              <label className="block font-bold text-zinc-900 text-xs mb-1.5">
                E-mail para confirmação
              </label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-900 text-xs mb-1.5">
                Telefone celular / WhatsApp
              </label>
              <input
                type="text"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className="w-full border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-900 text-xs mb-1.5">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Nome e Sobrenome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-900 text-xs mb-1.5">
                CPF ou CNPJ
              </label>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCpf(e.target.value))}
                className="w-full border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
              />
            </div>

            {/* Security Guarantee Box */}
            <div className="mt-4 border border-dashed border-zinc-300 rounded-lg p-3.5 bg-zinc-50/50">
              <p className="font-bold text-zinc-900 text-xs">
                Usamos seus dados de forma 100% segura para garantir a sua satisfação:
              </p>
              <ul className="mt-2 space-y-1.5 text-zinc-600 text-[11px]">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" />
                  <span>Enviar o seu comprovante de compra e pagamento;</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" />
                  <span>Ativar a sua garantia de devolução caso não fique satisfeito;</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" />
                  <span>Acompanhar o andamento do seu pedido com código de rastreio.</span>
                </li>
              </ul>
            </div>

            <button
              disabled={!isStep1Valid}
              onClick={() => setStep(2)}
              className="w-full bg-zinc-900 hover:bg-black text-white font-extrabold py-3.5 rounded-xl tracking-wide text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all active:scale-98"
            >
              IR PARA A ENTREGA
            </button>
          </div>
        )}

        {/* STEP 2: ENTREGA */}
        {step === 2 && (
          <div className="mx-4 mt-3 bg-white rounded-2xl shadow-xs border border-zinc-200/80 p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-zinc-900 text-xs">CEP</label>
                {isLoadingCep && (
                  <span className="text-[10px] text-zinc-500 animate-pulse">Buscando endereço...</span>
                )}
              </div>
              <input
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => handleCepChange(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block font-bold text-zinc-900 text-xs mb-1.5">Endereço (Rua)</label>
                <input
                  type="text"
                  placeholder="Nome da rua ou avenida"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-900 text-xs mb-1.5">Número</label>
                <input
                  type="text"
                  placeholder="123"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-zinc-900 text-xs mb-1.5">Complemento</label>
                <input
                  type="text"
                  placeholder="Apto, Bloco (opcional)"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-900 text-xs mb-1.5">Bairro</label>
                <input
                  type="text"
                  placeholder="Bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block font-bold text-zinc-900 text-xs mb-1.5">Cidade</label>
                <input
                  type="text"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-900 text-xs mb-1.5">UF</label>
                <input
                  type="text"
                  placeholder="SP"
                  maxLength={2}
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 uppercase"
                />
              </div>
            </div>

            {/* Shipping Options */}
            <div className="pt-2">
              <label className="block font-bold text-zinc-900 text-xs mb-2">
                Forma de Envio
              </label>
              <div className="space-y-2">
                {Object.values(SHIPPING_OPTIONS).map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => setSelectedShipping(opt.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedShipping === opt.id
                        ? 'border-zinc-900 bg-zinc-50/80 shadow-xs'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        checked={selectedShipping === opt.id}
                        onChange={() => setSelectedShipping(opt.id)}
                        className="text-zinc-900 focus:ring-zinc-900"
                      />
                      <div>
                        <p className="text-xs font-bold text-zinc-900">{opt.label}</p>
                        <p className="text-[11px] text-zinc-500">{opt.eta}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-zinc-900">
                      {opt.price === 0 ? (
                        <span className="text-emerald-600">Grátis</span>
                      ) : (
                        formatBrl(opt.price)
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Bump Upsell */}
            <div
              onClick={() => setAddUpsell(!addUpsell)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                addUpsell
                  ? 'border-amber-500 bg-amber-50/50'
                  : 'border-zinc-200 bg-zinc-50/40 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={addUpsell}
                  onChange={(e) => setAddUpsell(e.target.checked)}
                  className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900">{UPSELL_ITEM.title}</span>
                    <span className="font-extrabold text-amber-700">
                      +{formatBrl(UPSELL_ITEM.price)}
                    </span>
                  </div>
                  <p className="text-zinc-600 mt-0.5 text-[11px]">{UPSELL_ITEM.desc}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 border border-zinc-300 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50"
              >
                Voltar
              </button>
              <button
                disabled={!isStep2Valid || isConnectingSigiloPay}
                onClick={createSigiloPayCheckout}
                className="flex-1 bg-zinc-900 hover:bg-black text-white font-extrabold py-3.5 rounded-xl tracking-wide text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                {isConnectingSigiloPay ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Conectando à SigiloPay...</span>
                  </>
                ) : (
                  <span>IR PARA O PAGAMENTO</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAGAMENTO (OFICIAL GATEWAY SIGILOPAY) */}
        {step === 3 && (
          <div className="mx-4 mt-3 bg-white rounded-2xl shadow-xs border border-zinc-200/80 p-5 space-y-5 animate-in fade-in duration-300">
            {/* Gateway status badge */}
            <div className="flex items-center justify-center gap-2 py-1.5 px-3 bg-purple-50 border border-purple-200 rounded-full text-xs font-bold text-purple-800">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
              <span>Gateway SigiloPay Vinculado e Ativo</span>
            </div>

            {/* Payment header */}
            <div className="text-center pb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" /> Pagamento Processado via SigiloPay
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-900 mt-2">
                {formatBrl(totalPrice)}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                {currentOffer.title} • {shipping.label}
              </p>
            </div>

            {/* Direct Screen QR Code for the Acquirer (Pay Conductor / SigiloPay) */}
            <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-b from-emerald-50/50 via-white to-zinc-50 border-2 border-emerald-200 rounded-2xl shadow-xs space-y-3">
              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-emerald-200">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
                    acquirerPixCode
                  )}`}
                  alt="QR Code PIX Adquirente Pay Conductor"
                  width={220}
                  height={220}
                  className="rounded-lg mx-auto"
                />
              </div>
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-950 font-bold">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Escaneie com o app do seu banco para pagar direto</span>
                </div>
                <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                  Nubank, Itaú, Bradesco, Inter, Caixa, Santander, Mercado Pago, etc.
                </p>
              </div>
            </div>

            {/* Pix Copia e Cola da Adquirente */}
            <div className="space-y-1.5">
              <label className="block font-bold text-zinc-900 text-xs">
                Código Pix Copia e Cola da Adquirente (Pay Conductor)
              </label>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={acquirerPixCode}
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-xs text-zinc-800 outline-none truncate font-mono select-all"
                />
                <button
                  onClick={handleCopyPix}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    pixCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                  }`}
                >
                  {pixCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copiar Pix
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Acquirer & Gateway Information Details */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-xs text-zinc-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Adquirente Responsável:</span>
                <span className="font-bold text-emerald-900">PAY CONDUCTOR INTERMEDIAÇÕES</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">CNPJ da Adquirente:</span>
                <span className="font-mono text-zinc-800 font-semibold">62.797.552/0001-20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Gateway Integrado:</span>
                <span className="font-bold text-purple-900">SigiloPay</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Forma de Pagamento:</span>
                <span className="font-bold text-emerald-700">PIX Direto no Site</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-zinc-200">
                <span className="text-zinc-500">Valor Total do Pedido:</span>
                <span className="font-extrabold text-sm text-zinc-900">{formatBrl(totalPrice)}</span>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center justify-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg py-2 px-3 text-xs text-amber-800 font-medium">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Sua reserva expira em:{' '}
                <strong className="font-bold">
                  {pixMinutes}:{pixSeconds}
                </strong>
              </span>
            </div>

            {/* Step instructions */}
            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200 text-xs text-zinc-700 space-y-2">
              <p className="font-bold text-zinc-900">Como pagar via PIX:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-zinc-600 leading-relaxed">
                <li>Abra o aplicativo do seu banco (Nubank, Itaú, Bradesco, Inter, Mercado Pago, etc.).</li>
                <li>Selecione <strong>Pix</strong> e aponte a câmera para o <strong>QR Code</strong> acima ou use o <strong>Pix Copia e Cola</strong>.</li>
                <li>Confira os dados da adquirente <strong>PAY CONDUCTOR</strong> e confirme o pagamento.</li>
                <li>Após a confirmação, clique no botão verde abaixo para acompanhar o código de rastreamento do envio!</li>
              </ol>
            </div>

            {/* Confirm Payment button */}
            <button
              onClick={handleFinishPayment}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md transition-all active:scale-98"
            >
              Já realizei o pagamento! Acompanhar Envio
            </button>

            {/* Optional gateway link in new tab */}
            {sigiloPayUrl && (
              <div className="text-center pt-1">
                <a
                  href={sigiloPayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-zinc-500 hover:text-purple-700 underline inline-flex items-center gap-1 transition-colors"
                >
                  <span>Ver comprovante oficial no gateway SigiloPay</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Security badge and TikTok Shop Brasil footer */}
        <div className="mt-8 pb-4 text-center px-5">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-xs border border-zinc-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-zinc-800 font-semibold text-xs">Ambiente 100% Seguro</span>
          </div>

          <div className="mt-5 text-[11px] text-zinc-500 leading-relaxed max-w-[380px] mx-auto space-y-0.5">
            <p className="font-bold text-zinc-700">TIKTOK SHOP BRASIL SERVIÇOS DE INTERNET LTDA</p>
            <p>CNPJ: 43.913.895/0001-27</p>
            <p>Av. das Nações Unidas, 14.171 — Vila Gertrudes, São Paulo/SP</p>
            <p className="pt-2 text-zinc-400">© 2026 TikTok Shop. Todos os direitos reservados.</p>
          </div>

          <div className="mt-4">
            <button
              onClick={onBackToStore}
              className="text-zinc-500 hover:text-zinc-800 text-xs py-2 inline-block font-medium"
            >
              ← Voltar para a loja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
