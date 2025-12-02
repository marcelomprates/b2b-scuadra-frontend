import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { TrendingUp, Users, DollarSign, Package, Sparkles } from 'lucide-react';
import { getSalesInsights } from '../services/geminiService';

const data = [
  { name: 'Jan', sales: 4000, orders: 24 },
  { name: 'Fev', sales: 3000, orders: 13 },
  { name: 'Mar', sales: 2000, orders: 98 },
  { name: 'Abr', sales: 2780, orders: 39 },
  { name: 'Mai', sales: 1890, orders: 48 },
  { name: 'Jun', sales: 2390, orders: 38 },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; trend?: string }> = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-slate-50 rounded-lg">
        <Icon className="w-6 h-6 text-slate-700" />
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  const generateInsight = async () => {
    setLoadingInsight(true);
    const result = await getSalesInsights(data);
    setInsight(result);
    setLoadingInsight(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Receita Total" value="R$ 128.450" icon={DollarSign} trend="+12.5%" />
        <StatCard title="Pedidos Ativos" value="142" icon={Package} trend="+5.2%" />
        <StatCard title="Novos Clientes" value="24" icon={Users} trend="+18.2%" />
        <StatCard title="Ticket Médio" value="R$ 904" icon={TrendingUp} trend="-2.1%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Desempenho de Vendas</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="sales" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              IA Scuadra Insights
            </h2>
            <button 
              onClick={generateInsight}
              disabled={loadingInsight}
              className="px-3 py-1 text-sm bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors disabled:opacity-50"
            >
              {loadingInsight ? 'Analisando...' : 'Gerar Análise'}
            </button>
          </div>
          
          <div className="flex-1 bg-gradient-to-br from-slate-50 to-purple-50/30 rounded-lg p-6 border border-slate-100">
            {insight ? (
              <div className="prose prose-sm prose-slate">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">{insight}</p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Sparkles className="w-12 h-12 mb-3 opacity-20" />
                <p>Clique em "Gerar Análise" para processar os dados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;