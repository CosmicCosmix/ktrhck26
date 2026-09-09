export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Medical Imaging' | 'Biotechnology' | 'Microscopy' | 'Laboratory Systems';
  modelNumber: string;
  status: 'Active' | 'Rented' | 'Maintenance';
  ratePerHour: number;
  totalEarningsAlgo: number;
  utilizationRate: number;
  location: string;
  imageUrl: string;
}

export const PROVIDER_STATS = {
  institutionName: 'SRM Medical & Research Institute',
  nodeId: 'SRM-CHE-092',
  totalRevenueAlgo: 14250,
  growthPercentage: 8.4,
  totalLeasedHours: 1340,
  activeLeases: 4,
  totalEquipment: 8,
  overallUtilization: 82.5,
  ratings: {
    maintenance: 94,
    uptime: 98,
    operatorSupport: 89,
  },
  timeDistribution: [
    { name: 'Morning (08:00 - 13:00)', value: 42, color: '#5a6acf', hours: '562 hrs' },
    { name: 'Afternoon (13:00 - 18:00)', value: 38, color: '#8593ed', hours: '509 hrs' },
    { name: 'Night (18:00 - 00:00)', value: 20, color: '#dee1f4', hours: '269 hrs' },
  ],
  dailyCapacityTrend: [
    { day: '01', current: 68, previous: 45 },
    { day: '02', current: 74, previous: 50 },
    { day: '03', current: 82, previous: 62 },
    { day: '04', current: 90, previous: 70 },
    { day: '05', current: 85, previous: 65 },
    { day: '06', current: 60, previous: 40 },
    { day: '07', current: 78, previous: 55 },
    { day: '08', current: 92, previous: 68 },
    { day: '09', current: 88, previous: 60 },
    { day: '10', current: 96, previous: 75 },
    { day: '11', current: 80, previous: 58 },
    { day: '12', current: 89, previous: 64 },
  ],
  hourlyLeaseVolume: [
    { time: '08:00', current: 20, previous: 15 },
    { time: '10:00', current: 48, previous: 30 },
    { time: '12:00', current: 65, previous: 45 },
    { time: '14:00', current: 85, previous: 55 },
    { time: '16:00', current: 70, previous: 60 },
    { time: '18:00', current: 95, previous: 72 },
    { time: '20:00', current: 50, previous: 40 },
  ],
};

export const MOCK_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'EQ-101',
    name: '3T Clinical MRI Scanner',
    category: 'Medical Imaging',
    modelNumber: 'Siemens Magnetom Vida',
    status: 'Rented',
    ratePerHour: 125,
    totalEarningsAlgo: 5200,
    utilizationRate: 91,
    location: 'Diagnostic Wing - Bay 2',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'EQ-102',
    name: 'High-Throughput Cryo-EM Lab',
    category: 'Microscopy',
    modelNumber: 'Thermo Scientific Krios G4',
    status: 'Active',
    ratePerHour: 240,
    totalEarningsAlgo: 7680,
    utilizationRate: 94,
    location: 'Nanotechnology Complex 4',
    imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'EQ-103',
    name: 'Confocal Spectral Microscope',
    category: 'Microscopy',
    modelNumber: 'Leica TCS SP8 X',
    status: 'Active',
    ratePerHour: 85,
    totalEarningsAlgo: 2150,
    utilizationRate: 72,
    location: 'Advanced Imaging Block B',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'EQ-104',
    name: 'Floor Preparative Ultracentrifuge',
    category: 'Laboratory Systems',
    modelNumber: 'Beckman Coulter Optima XPN',
    status: 'Maintenance',
    ratePerHour: 45,
    totalEarningsAlgo: 1420,
    utilizationRate: 48,
    location: 'Biochem Central Lab 1',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80',
  },
];