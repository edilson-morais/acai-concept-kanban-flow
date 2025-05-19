
import React from 'react';

interface CPLTableProps {
  campaigns: Array<{
    id: number;
    name: string;
    cpl: number;
  }>;
}

const CPLTable: React.FC<CPLTableProps> = ({ campaigns }) => {
  return (
    <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
      <div className="bg-[#060606] p-3 border-b border-gray-800">
        <h2 className="text-white text-lg font-medium">Melhores CPL's</h2>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#111]">
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Campanha</th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Custo por Lead</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b border-gray-800 hover:bg-[#0a0a0a]">
                <td className="py-2 px-3 text-gray-300 text-left">{campaign.name}</td>
                <td className="py-2 px-3 text-gray-300 text-right">R$ {campaign.cpl.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CPLTable;
