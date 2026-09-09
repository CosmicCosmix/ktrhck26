export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Medical' | 'Research' | 'Facility';
  modelNumber: string;
  status: 'Active' | 'Rented' | 'Maintenance';
  ratePerHour: number;
  totalEarningsAlgo: number;
  utilizationRate: number; // percentage
  location: string;
}

export const PROVIDER_STATS = {
  totalRevenueAlgo: 1420.5,
  activeRentals: 4,
  totalEquipment: 8,
  overallUtilization: 78.4,
  monthlyEarnings: [
    { month: 'Jan', earnings: 180 },
    { month: 'Feb', earnings: 240 },
    { month: 'Mar', earnings: 310 },
    { month: 'Apr', earnings: 290 },
    { month: 'May', earnings: 420 },
    { month: 'Jun', earnings: 510 },
  ],
  utilizationTrend: [
    { day: 'Mon', usage: 65 },
    { day: 'Tue', usage: 82 },
    { day: 'Wed', usage: 78 },
    { day: 'Thu', usage: 90 },
    { day: 'Fri', usage: 85 },
    { day: 'Sat', usage: 45 },
    { day: 'Sun', usage: 30 },
  ],
};

export const MOCK_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'EQ-101',
    name: '3T Clinical MRI Scanner',
    category: 'Medical',
    modelNumber: 'Siemens Magnetom Vida',
    status: 'Rented',
    ratePerHour: 12.5,
    totalEarningsAlgo: 450.0,
    utilizationRate: 88,
    location: 'Imaging Wing - Room 2B',
  },
  {
    id: 'EQ-102',
    name: 'High-Throughput Cryo-EM',
    category: 'Research',
    modelNumber: 'Thermo Scientific Krios G4',
    status: 'Active',
    ratePerHour: 25.0,
    totalEarningsAlgo: 620.0,
    utilizationRate: 92,
    location: 'Bio-Research Annex 4',
  },
  {
    id: 'EQ-103',
    name: 'Confocal Laser Microscope',
    category: 'Research',
    modelNumber: 'Leica TCS SP8',
    status: 'Active',
    ratePerHour: 8.0,
    totalEarningsAlgo: 180.5,
    utilizationRate: 64,
    location: 'Central Microscopy Lab',
  },
  {
    id: 'EQ-104',
    name: 'Ultra Centrifuge System',
    category: 'Facility',
    modelNumber: 'Beckman Coulter Optima',
    status: 'Maintenance',
    ratePerHour: 5.5,
    totalEarningsAlgo: 170.0,
    utilizationRate: 45,
    location: 'Basement Storage Bay 1',
  },
];