import React, { useState } from 'react';
import { Wallet, CheckCircle, Gift, Crown, Coffee, Percent } from 'lucide-react';
import { Header } from '../components/Header';

interface MemberTopUpProps {
  onBack: () => void;
}

const TOPUP_OPTIONS = [
  { amount: 100, bonus: 0, tag: '' },
  { amount: 200, bonus: 10, tag: '热销' },
  { amount: 500, bonus: 40, tag: '推荐' },
  { amount: 1000, bonus: 100, tag: '' },
  { amount: 2000, bonus: 250, tag: '' },
  { amount: 5000, bonus: 800, tag: '超值' },
];

const VIP_BENEFITS = [
    { icon: Crown, title: '身份标识', desc: '尊贵VIP图标' },
    { icon: Percent, title: '会员折扣', desc: '全场8.8折' },
    { icon: Gift, title: '生日好礼', desc: '专属生日蛋糕' },
    { icon: Coffee, title: '免费升杯', desc: '每月4张升杯券' },
];

export const MemberTopUpView: React.FC<MemberTopUpProps> = ({ onBack }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(200);
  const [customAmount, setCustomAmount] = useState('');
  const [agreed, setAgreed] = useState(true);

  const handlePresetSelect = (amount: number) => {
      setSelectedAmount(amount);
      setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (/^\d*$/.test(val)) {
          setCustomAmount(val);
          setSelectedAmount(null);
      }
  };

  const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      <Header title="会员储值" onBack={onBack} theme="dark" />

      <div className="flex-1 overflow-y-auto pb-safe">
          {/* Balance Card */}
          <div className="bg-[#1F2937] px-6 pb-16 pt-6 relative mb-12 rounded-b-[2rem] shadow-xl">
             <div className="flex justify-between items-start">
                 <div>
                    <div className="text-gray-400 text-xs mb-2 flex items-center gap-1"><Wallet size={12}/> 当前余额 (元)</div>
                    <div className="text-5xl font-bold text-[#FDE047] font-mono tracking-tight">0.00</div>
                 </div>
                 <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-gray-300 border border-white/10">
                     资金安全保障中
                 </div>
             </div>
          </div>

          {/* VIP Rights */}
          <div className="mx-4 -mt-12 relative z-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-[#FDE047] shadow-lg mb-6">
             <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                 <h3 className="font-bold text-lg flex items-center gap-2"><Crown size={20} fill="currentColor" /> VIP会员权益</h3>
                 <span className="text-xs bg-[#FDE047] text-gray-900 px-2 py-0.5 rounded font-bold">已解锁 0 项</span>
             </div>
             <div className="grid grid-cols-4 gap-2">
                 {VIP_BENEFITS.map((b, i) => (
                     <div key={i} className="flex flex-col items-center text-center gap-2">
                         <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
                             <b.icon size={18} />
                         </div>
                         <div className="text-xs font-bold">{b.title}</div>
                         <div className="text-[9px] opacity-60 scale-90">{b.desc}</div>
                     </div>
                 ))}
             </div>
          </div>

          {/* Options Grid */}
          <div className="px-4">
             <h3 className="font-bold text-gray-900 mb-4 text-lg">充值金额</h3>
             <div className="grid grid-cols-2 gap-4 mb-4">
                 {TOPUP_OPTIONS.map((opt) => (
                     <div 
                        key={opt.amount}
                        onClick={() => handlePresetSelect(opt.amount)}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center h-24 ${selectedAmount === opt.amount ? 'border-[#FDE047] bg-[#FEFCE8] shadow-sm' : 'border-transparent bg-white shadow-sm'}`}
                     >
                         {opt.tag && (
                             <div className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm z-10">
                                 {opt.tag}
                             </div>
                         )}
                         <div className="flex items-baseline gap-0.5">
                             <span className="text-sm font-medium">¥</span>
                             <span className="text-2xl font-bold text-gray-900">{opt.amount}</span>
                         </div>
                         {opt.bonus > 0 ? (
                            <div className="text-xs text-[#CA8A04] mt-1 font-medium bg-[#FDE047]/20 px-2 py-0.5 rounded-full">送 {opt.bonus} 元</div>
                         ) : (
                            <div className="text-xs text-gray-300 mt-1">无赠送</div>
                         )}
                     </div>
                 ))}
             </div>
             
             {/* Custom Input */}
             <div className={`bg-white rounded-xl p-4 flex items-center justify-between border-2 transition-colors mb-6 ${customAmount ? 'border-[#FDE047]' : 'border-transparent'}`}>
                 <span className="font-bold text-gray-900">其他金额</span>
                 <div className="flex items-center gap-2">
                     <span className="text-gray-900 font-bold">¥</span>
                     <input 
                        type="text" 
                        value={customAmount}
                        onChange={handleCustomChange}
                        placeholder="请输入金额"
                        className="text-right w-32 outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                     />
                 </div>
             </div>

             {/* Agreement */}
             <div className="flex items-center gap-2 mb-8 px-2" onClick={() => setAgreed(!agreed)}>
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${agreed ? 'bg-[#FDE047] border-[#FDE047]' : 'border-gray-300 bg-white'}`}>
                     {agreed && <CheckCircle size={12} className="text-gray-900" />}
                 </div>
                 <span className="text-xs text-gray-500 leading-tight">
                     我已阅读并同意 <span className="text-blue-600 font-medium">《会员储值协议》</span> 及 <span className="text-blue-600 font-medium">《隐私政策》</span>
                 </span>
             </div>
          </div>
      </div>

      {/* Bottom Action */}
      <div className="bg-white p-4 border-t border-gray-100 pb-safe">
          <button 
            disabled={!finalAmount || !agreed}
            className="w-full bg-[#FDE047] text-gray-900 font-bold py-3.5 rounded-full shadow-lg shadow-yellow-100 hover:bg-yellow-400 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
              <span>立即充值</span>
              {finalAmount > 0 && <span>¥{finalAmount}</span>}
          </button>
      </div>
    </div>
  );
};
