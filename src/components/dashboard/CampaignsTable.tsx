
import React from 'react';

interface Campaign {
  id: number;
  name: string;
  reach: number;
  impressions: number;
  clicks: number;
  messages: number;
}

interface CampaignsTableProps {
  campaigns: Campaign[];
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({ campaigns }) => {
  return (
    <div className="w-full bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
      <div className="bg-[#060606] p-3 border-b border-gray-800">
        <h2 className="text-white text-lg font-medium">Campanhas Publicadas</h2>
      </div>
      
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111]">
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-800">#</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-800">Campanha</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-cyan-400 uppercase tracking-wider border-b border-gray-800">Alcance</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-blue-400 uppercase tracking-wider border-b border-gray-800">Impressões</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-green-400 uppercase tracking-wider border-b border-gray-800">Cliques</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-purple-400 uppercase tracking-wider border-b border-gray-800">Mensagens</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-800 hover:bg-[#0a0a0a]">
                  <td className="py-3 px-3 text-gray-300 text-left">{campaign.id}</td>
                  <td className="py-3 px-3 text-gray-300 text-left">{campaign.name}</td>
                  <td className="py-3 px-3 text-cyan-400 text-right">{campaign.reach}</td>
                  <td className="py-3 px-3 text-blue-400 text-right">{campaign.impressions}</td>
                  <td className="py-3 px-3 text-green-400 text-right">{campaign.clicks}</td>
                  <td className="py-3 px-3 text-purple-400 text-right">{campaign.messages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignsTable;
