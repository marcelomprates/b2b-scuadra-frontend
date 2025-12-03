import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar senha
    const VALID_PASSWORD = 'Scuadr@$x1';
    
    if (password !== VALID_PASSWORD) {
      alert('Senha incorreta. Tente novamente.');
      return;
    }
    
    setLoading(true);
    // Simulate API call to auth-service
    setTimeout(() => {
      onLogin({
        id: '1',
        name: 'Admin Scuadra',
        email: email,
        role: UserRole.ADMIN,
        company: 'Scuadra Tech'
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-slate-50 p-8 text-center border-b border-slate-100">
          <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">B2B Scuadra</h2>
          <p className="text-slate-500 mt-2">Acesse o portal corporativo</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail Corporativo</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {loading ? 'Autenticando...' : (
              <>
                Entrar no Sistema
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </form>
        
        <div className="px-8 pb-8 text-center">
          <p className="text-xs text-slate-400">
            Acesso restrito. Monitorado por Scuadra Security.
            <br />
            <span className="font-mono text-slate-500 mt-1 inline-block bg-slate-100 px-2 py-1 rounded">
              https://homolog-b2b.scuadra.com.br
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;