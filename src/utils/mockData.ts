
// Generate random campaign data
export const generateCampaigns = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Campanha ${i + 1} - Açaí Premium`,
    reach: Math.floor(Math.random() * 50000) + 10000,
    impressions: Math.floor(Math.random() * 30000) + 20000,
    clicks: Math.floor(Math.random() * 500) + 50,
    messages: Math.floor(Math.random() * 100) + 10
  }));
};

// Generate random CPL data
export const generateCPLData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Campanha ${i + 1} - Açaí Premium`,
    cpl: Math.random() * 5 + 1
  }));
};

// Generate random creatives data
export const generateCreatives = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Ad ${i + 1} - Açaí Premium`,
    reach: Math.floor(Math.random() * 30000) + 5000,
    clicks: Math.floor(Math.random() * 500) + 100,
    messages: Math.floor(Math.random() * 100) + 10
  }));
};

// Mock metrics data
export const mockMetricsData = {
  investido: "R$ 3.290,46",
  alcance: "417.373",
  impressoes: "475.408",
  cpm: "8,06",
  cliques: "4.093",
  mensagens: "1.184",
  custoMensagem: "R$ 3,56",
  cpc: "R$ 1,80",
  ctr: "0,97%",
  taxaMensagens: "77,79%"
};

// Mock funnel data
export const mockFunnelData = {
  impressions: "475.408",
  reach: "417.373",
  clicks: "4.093",
  messages: "1.184"
};

// Mock chart data
export const mockHourlyData = [
  { time: '10-12h', orders: 10 },
  { time: '12-15h', orders: 15 },
  { time: '15-18h', orders: 8 },
  { time: '18-21h', orders: 18 },
];

export const mockTopSellingItems = [
  { name: 'Açaí 500ml', count: 45 },
  { name: 'Açaí 300ml', count: 35 },
  { name: 'Açaí 700ml', count: 30 },
  { name: 'Mix Berry', count: 20 },
];
