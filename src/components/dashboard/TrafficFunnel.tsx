
import React from 'react';

interface TrafficFunnelProps {
  data: {
    impressions: string;
    reach: string;
    clicks: string;
    messages: string;
  };
}

const TrafficFunnel: React.FC<TrafficFunnelProps> = ({ data }) => {
  return (
    <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
      <div className="bg-[#060606] p-3 border-b border-gray-800">
        <h2 className="text-white text-lg font-medium">Funil de Tráfego</h2>
      </div>
      <div className="p-4 h-64 flex items-center justify-center">
        <div className="w-full max-w-xs mx-auto">
          <div className="bg-blue-600 text-white p-2 text-center mb-1 rounded-t-lg">Impressões: {data.impressions}</div>
          <div className="bg-blue-500 text-white p-2 text-center mb-1" style={{width: '90%', marginLeft: '5%'}}>Alcance: {data.reach}</div>
          <div className="bg-blue-400 text-white p-2 text-center mb-1" style={{width: '80%', marginLeft: '10%'}}>Cliques: {data.clicks}</div>
          <div className="bg-blue-300 text-white p-2 text-center rounded-b-lg" style={{width: '70%', marginLeft: '15%'}}>Mensagens: {data.messages}</div>
        </div>
      </div>
    </div>
  );
};

export default TrafficFunnel;
