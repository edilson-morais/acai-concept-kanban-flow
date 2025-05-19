
import React from 'react';

interface Creative {
  id: number;
  name: string;
  reach: number;
  clicks: number;
  messages: number;
}

interface ValidatedCreativesProps {
  creatives: Creative[];
}

const ValidatedCreatives: React.FC<ValidatedCreativesProps> = ({ creatives }) => {
  return (
    <div className="w-full bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
      <div className="bg-[#060606] p-3 border-b border-gray-800">
        <h2 className="text-white text-lg font-medium">Criativos Validados</h2>
      </div>
      
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111]">
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-800">#</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-800">Ad Name</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-cyan-400 uppercase tracking-wider border-b border-gray-800">Alcance</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-green-400 uppercase tracking-wider border-b border-gray-800">Cliques</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-purple-400 uppercase tracking-wider border-b border-gray-800">Mensagens</th>
              </tr>
            </thead>
            <tbody>
              {creatives.map((creative) => (
                <tr key={creative.id} className="border-b border-gray-800 hover:bg-[#0a0a0a]">
                  <td className="py-3 px-3 text-gray-300 text-left">{creative.id}</td>
                  <td className="py-3 px-3 text-gray-300 text-left">{creative.name}</td>
                  <td className="py-3 px-3 text-cyan-400 text-right">{creative.reach}</td>
                  <td className="py-3 px-3 text-green-400 text-right">{creative.clicks}</td>
                  <td className="py-3 px-3 text-purple-400 text-right">{creative.messages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ValidatedCreatives;
