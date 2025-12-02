import React, { useEffect, useState } from 'react';
import { Server, Database, Shield, Globe, Cpu, Activity, AlertCircle, CheckCircle2, Terminal, Copy, LayoutTemplate, ExternalLink, GitBranch, Rocket, FileCode } from 'lucide-react';
import { ServiceStatus } from '../types';
import { analyzeSystemLogs } from '../services/geminiService';

const Infrastructure: React.FC = () => {
  const [analysis, setAnalysis] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'diagram' | 'deploy'>('deploy'); 
  
  // Mock representation of the services managed by Coolify
  const services: ServiceStatus[] = [
    { name: 'Coolify Control Plane', status: 'operational', uptime: '100%', port: 443, description: 'coolify.scuadra.com.br' },
    { name: 'Frontend App', status: 'operational', uptime: 'Pending', port: 3000, description: 'homolog-b2b.scuadra.com.br' },
    { name: 'Auth Service', status: 'down', uptime: 'Pending', port: 4000, description: 'Aguardando Deploy' },
    { name: 'Catalog Service', status: 'down', uptime: 'Pending', port: 4001, description: 'Aguardando Deploy' },
    { name: 'PostgreSQL', status: 'operational', uptime: '100%', port: 5432, description: 'Database Gerenciado' },
  ];

  useEffect(() => {
    const checkHealth = async () => {
      const logs = services.map(s => `${s.name}: ${s.status}`).join(', ');
      const result = await analyzeSystemLogs(logs);
      setAnalysis(result);
    };
    checkHealth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SetupStep: React.FC<{ title: string; command?: string; description: string; link?: string; icon?: React.ElementType; tip?: string }> = ({ title, command, description, link, icon: Icon = Terminal, tip }) => (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-white font-medium flex items-center">
          <Icon className="w-4 h-4 mr-2 text-accent" />
          {title}
        </h4>
        {command && (
          <button 
            onClick={() => navigator.clipboard.writeText(command)}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs uppercase font-bold tracking-wider"
            title="Copiar Comando"
          >
            <Copy className="w-4 h-4" /> Copiar
          </button>
        )}
      </div>
      <p className="text-slate-400 text-sm mb-3 leading-relaxed">
        {description}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white hover:underline ml-2 inline-flex items-center">
            Acessar <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        )}
      </p>
      {command && (
        <div className="bg-black/50 rounded p-3 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap border-l-4 border-green-600">
          {command}
        </div>
      )}
      {tip && (
        <div className="mt-2 text-xs text-orange-400 flex items-center bg-orange-900/20 p-2 rounded border border-orange-900/50">
          <AlertCircle className="w-3 h-3 mr-2 flex-shrink-0" />
          {tip}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Infraestrutura (Coolify + VPS)</h1>
          <p className="text-slate-500">Gestão via Painel Coolify: <a href="https://coolify.scuadra.com.br/" target="_blank" className="text-accent hover:underline">https://coolify.scuadra.com.br/</a></p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('deploy')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'deploy' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            <Rocket className="w-4 h-4 inline-block mr-2" />
            Guia de Deploy (Fase 2)
          </button>
          <button 
            onClick={() => setActiveTab('diagram')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'diagram' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            Diagrama Visual
          </button>
        </div>
      </div>

      {/* AI Ops Insight */}
      {analysis && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
          <Cpu className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 text-sm">Análise de Ops (Gemini)</h4>
            <p className="text-blue-800 text-sm mt-1">{analysis}</p>
          </div>
        </div>
      )}

      {activeTab === 'diagram' ? (
        <>
          {/* Visual Diagram of the Plan */}
          <div className="relative bg-slate-900 rounded-xl p-8 overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              
              {/* Layer 1: Ingress */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">Entrada</div>
                
                <div className="group flex flex-col items-center cursor-pointer">
                  <div className="relative">
                    <Globe className="w-12 h-12 text-violet-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="block text-xs text-slate-500 mb-1">homolog-b2b.scuadra.com.br</span>
                  </div>
                </div>

                <div className="h-8 w-0.5 border-l-2 border-dashed border-slate-700"></div>
                
                <div className="w-full bg-slate-800 border-2 border-violet-500/50 p-4 rounded-lg relative group transition-all hover:border-violet-400">
                  <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-violet-400 text-xs font-bold">COOLIFY TRAEFIK</div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-sm font-mono">Proxy Reverso</span>
                    <Shield className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Gerencia SSL & Rotas</div>
                </div>
              </div>

              {/* Layer 2: App Services */}
              <div className="flex flex-col space-y-4">
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2 text-center">Containers</div>
                
                <div className="grid grid-cols-1 gap-3">
                   {services.slice(1, 4).map(service => (
                     <div key={service.name} className={`
                        bg-slate-800 p-3 rounded-lg border-l-4 transition-all hover:translate-x-1
                        ${service.status === 'operational' ? 'border-green-500' : 'border-slate-600'}
                     `}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-200 text-sm">{service.name}</span>
                          {service.status === 'operational' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-slate-600 border-t-slate-400 rounded-full animate-spin" />
                          )}
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-slate-500 font-mono">
                          <span>:{service.port}</span>
                          <span>{service.status}</span>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              {/* Layer 3: Persistence */}
              <div className="flex flex-col items-center justify-center space-y-4">
                 <div className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">Dados</div>
                 
                 <div className="w-full bg-slate-800 border-2 border-orange-500/50 p-6 rounded-lg relative flex flex-col items-center justify-center h-40">
                    <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-orange-400 text-xs font-bold">POSTGRESQL</div>
                    <Database className="w-12 h-12 text-orange-400 mb-2" />
                    <span className="text-slate-300 font-mono text-sm">Managed by Coolify</span>
                 </div>
              </div>
            </div>

            {/* Connectivity Lines (Visual decoration) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -z-0"></div>
          </div>
        </>
      ) : (
        <div className="bg-slate-900 rounded-xl p-6 md:p-8 text-white max-w-4xl mx-auto shadow-2xl">
          <div className="mb-8 border-b border-slate-700 pb-6">
            <h2 className="text-xl font-bold mb-2 flex items-center text-violet-400">
              <Rocket className="w-6 h-6 mr-3" />
              Guia de Deploy (Fase 2)
            </h2>
            <p className="text-slate-400">Publique este app usando o Coolify e GitHub.</p>
          </div>

          <div className="space-y-6">
             <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg text-sm text-orange-200 mb-6 flex items-start gap-3">
                <FileCode className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                   <strong>Arquivos de Configuração Adicionados</strong>
                   <p className="mt-1 opacity-80">
                     Acabei de criar o <code>package.json</code>, <code>Dockerfile</code> e outros arquivos essenciais. 
                     <strong>Você precisa fazer o push novamente</strong> para que eles subam para o GitHub.
                   </p>
                </div>
             </div>

             <SetupStep 
               title="Passo 1: Atualizar Repositório (Essencial)" 
               icon={GitBranch}
               description="Rode estes comandos para incluir os arquivos de configuração que acabei de gerar:"
               command="git add . && git commit -m 'Add deploy configs' && git push"
             />

             <SetupStep 
               title="Passo 2: Criar Projeto no Coolify" 
               icon={LayoutTemplate}
               description="No painel do Coolify: 1. Clique em 'Projects' -> '+ Add'. 2. Nomeie como 'B2B Scuadra'. 3. Escolha 'Production'."
             />

             <SetupStep 
               title="Passo 3: Conectar Repositório" 
               icon={Globe}
               description="1. Clique em '+ New Resource' -> 'Public Repository'. 2. Cole a URL do seu GitHub (ex: https://github.com/usuario/repo). 3. O Coolify detectará automaticamente o 'Dockerfile'. Use a configuração padrão."
             />

             <SetupStep 
               title="Passo 4: Definir Domínio" 
               icon={Shield}
               description="Nas configurações do recurso no Coolify, procure 'Domains' e insira:"
               command="https://homolog-b2b.scuadra.com.br"
             />
             
             <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-slate-400 text-sm">
                  Após clicar em "Deploy", o Coolify baixará seu código atualizado e subirá o site.
                </span>
                <a 
                  href="https://coolify.scuadra.com.br/" 
                  target="_blank"
                  rel="noreferrer"
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full md:w-auto shadow-lg shadow-violet-900/20 text-center"
                >
                  Abrir Coolify 🚀
                </a>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Infrastructure;