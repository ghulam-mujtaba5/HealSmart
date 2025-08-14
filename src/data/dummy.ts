export const recentSearches = [
  'Paracetamol 500mg',
  'Amoxicillin 250mg',
  'Ibuprofen 200mg',
  'Cetirizine 10mg',
];

export const detectedSample = {
  name: 'Paracetamol 500mg',
  confidence: 92,
};

export const medicineDetails = {
  name: 'Paracetamol 500mg',
  manufacturer: 'HealCo Labs',
  activeIngredients: ['Paracetamol (Acetaminophen)'],
  priceRange: '$2 - $6',
};

export type PriceEntry = {
  id: string;
  name: string;
  logo: string;
  price: string;
  inStock: boolean;
  type: 'local' | 'online';
};

export const pharmacies: PriceEntry[] = [
  { id: '1', name: 'CityMed Pharmacy', logo: 'pharmacy', price: '$3.50', inStock: true, type: 'local' },
  { id: '2', name: 'HealthPlus', logo: 'pharmacy', price: '$3.20', inStock: false, type: 'local' },
  { id: '3', name: 'MediCart', logo: 'pharmacy', price: '$3.10', inStock: true, type: 'online' },
  { id: '4', name: 'PharmaNow', logo: 'pharmacy', price: '$3.00', inStock: true, type: 'online' },
];

export type AltEntry = {
  id: string;
  name: string;
  manufacturer: string;
  price: string;
  type: 'generic' | 'brand' | 'premium';
};

export const alternatives: AltEntry[] = [
  { id: 'g1', name: 'Aceta 500', manufacturer: 'GoodMeds', price: '$2.20', type: 'generic' },
  { id: 'g2', name: 'ParaHeal 500', manufacturer: 'MediCare', price: '$2.40', type: 'generic' },
  { id: 'b1', name: 'Tylenex 500', manufacturer: 'TyloCorp', price: '$4.50', type: 'brand' },
  { id: 'b2', name: 'Panadol 500', manufacturer: 'GSK', price: '$4.80', type: 'brand' },
  { id: 'p1', name: 'Paraclean 500 XR', manufacturer: 'PrimePharma', price: '$7.90', type: 'premium' },
];
