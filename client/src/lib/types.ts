// User Types
export type UserRole = 'buyer' | 'seller' | 'both';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  country: string;
  currency: string;
  language: string;
  createdAt: Date;
  agentId: string;
  walletId: string;
}

// Buyer Types
export interface BuyerProfile {
  userId: string;
  companyName: string;
  rating: number;
  completedJobs: number;
  totalSpent: number;
}

export interface BuyerPreference {
  userId: string;
  category: string;
  maxBudget: number;
  preferredPaymentSchedule: string;
}

export interface BuyerJob {
  id: string;
  buyerId: string;
  title: string;
  description: string;
  budget: number;
  currency: string;
  startDate: Date;
  endDate: Date;
  deadline: Date;
  minRating: number;
  minCompletedJobs: number;
  licenseRequired: boolean;
  referencesRequired: boolean;
  paymentSchedule: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  topSellers: SolverMatch[];
  createdAt: Date;
}

export interface SolverMatch {
  sellerId: string;
  sellerName: string;
  price: number;
  rating: number;
  completedJobs: number;
  matchScore: number;
  negotiationStatus: 'pending' | 'accepted' | 'rejected' | 'negotiating';
}

// Seller Types
export interface SellerProfile {
  userId: string;
  companyName: string;
  rating: number;
  completedJobs: number;
  totalEarned: number;
  description: string;
}

export interface InventoryItem {
  id: string;
  sellerId: string;
  name: string;
  category: string;
  basePrice: number;
  quantity: number;
  description: string;
  status: 'available' | 'limited' | 'sold_out';
}

export interface PricingRule {
  id: string;
  sellerId: string;
  category: string;
  basePrice: number;
  minimumMargin: number;
  discountThreshold: number;
  volumeDiscount: number;
}

export interface Availability {
  id: string;
  sellerId: string;
  date: Date;
  isAvailable: boolean;
  capacity: number;
  booked: number;
}

// Agent Types
export interface Agent {
  id: string;
  userId: string;
  role: 'buyer' | 'seller';
  permissions: string[];
  status: 'active' | 'inactive';
  createdAt: Date;
}

// Negotiation Types
export interface Negotiation {
  id: string;
  jobId: string;
  buyerId: string;
  sellerId: string;
  currentOffer: NegotiationOffer;
  offers: NegotiationOffer[];
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  round: number;
  maxRounds: number;
  createdAt: Date;
}

export interface NegotiationOffer {
  id: string;
  price: number;
  startDate: Date;
  endDate: Date;
  paymentSchedule: string;
  terms: string;
  timestamp: Date;
  from: 'buyer' | 'seller';
}

// Wallet & Payment Types
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  dailyLimit: number;
  dailySpent: number;
  perJobLimit: number;
  escrowBalance: number;
}

export interface Escrow {
  id: string;
  jobId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: 'held' | 'released' | 'refunded';
  createdAt: Date;
  releasedAt?: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'deposit' | 'withdrawal' | 'escrow_hold' | 'escrow_release';
  amount: number;
  balance: number;
  description: string;
  timestamp: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'deal' | 'negotiation' | 'deadline' | 'approval' | 'message';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Global State
export interface AppState {
  currentUser: User | null;
  buyers: BuyerProfile[];
  sellers: SellerProfile[];
  jobs: BuyerJob[];
  negotiations: Negotiation[];
  wallets: Wallet[];
  transactions: Transaction[];
  notifications: Notification[];
  agents: Agent[];
}
