
import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import CampaignsTable from './dashboard/CampaignsTable';
import MetricsOverview from './dashboard/MetricsOverview';
import MessagingRatesChart from './dashboard/MessagingRatesChart';
import CPLTable from './dashboard/CPLTable';
import TrafficFunnel from './dashboard/TrafficFunnel';
import InvestmentChart from './dashboard/InvestmentChart';
import ValidatedCreatives from './dashboard/ValidatedCreatives';
import { 
  generateCampaigns, 
  generateCPLData, 
  generateCreatives,
  mockMetricsData,
  mockFunnelData,
  mockHourlyData,
  mockTopSellingItems
} from '../utils/mockData';

const DashboardContent = () => {
  const isMobile = useIsMobile();
  
  // Generate mock data
  const campaigns = generateCampaigns(5);
  const cplData = generateCPLData(6);
  const creatives = generateCreatives(6);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {/* Seção de Campanhas Publicadas */}
        <CampaignsTable campaigns={campaigns} />
        
        {/* Seção de Visão Geral */}
        <div className="w-full">
          <MetricsOverview metrics={mockMetricsData} />
          
          {/* Gráficos e Kanban */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <MessagingRatesChart 
              hourlyData={mockHourlyData} 
              topSellingItems={mockTopSellingItems} 
            />
            
            <CPLTable campaigns={cplData} />
          </div>
          
          {/* Terceira linha de gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TrafficFunnel data={mockFunnelData} />
            
            <InvestmentChart 
              hourlyData={mockHourlyData} 
              topSellingItems={mockTopSellingItems} 
            />
          </div>
          
          {/* Última seção */}
          <ValidatedCreatives creatives={creatives} />
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
