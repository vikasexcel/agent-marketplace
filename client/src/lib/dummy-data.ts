import type {
  BuyerProfile,
  SellerProfile,
  BuyerJob,
  Negotiation,
  Wallet,
  Transaction,
  Notification,
  Agent,
  InventoryItem,
  PricingRule,
} from './types';

// Demo Users
export const DEMO_USERS = {
  buyer: {
    id: 'buyer-1',
    email: 'john@acmecorp.com',
    role: 'buyer' as const,
    country: 'US',
    currency: 'USD',
    language: 'en',
    createdAt: new Date('2025-01-01'),
    agentId: 'agent-buyer-1',
    walletId: 'wallet-buyer-1',
  },
  seller: {
    id: 'seller-1',
    email: 'alice@techsolutions.com',
    role: 'seller' as const,
    country: 'US',
    currency: 'USD',
    language: 'en',
    createdAt: new Date('2025-01-05'),
    agentId: 'agent-seller-1',
    walletId: 'wallet-seller-1',
  },
};

// Buyer Profiles
export const BUYER_PROFILES: Record<string, BuyerProfile> = {
  'buyer-1': {
    userId: 'buyer-1',
    companyName: 'Acme Corporation',
    rating: 4.8,
    completedJobs: 24,
    totalSpent: 125000,
  },
};

// Seller Profiles
export const SELLER_PROFILES: Record<string, SellerProfile> = {
  'seller-1': {
    userId: 'seller-1',
    companyName: 'Tech Solutions Inc',
    rating: 4.9,
    completedJobs: 58,
    totalEarned: 245000,
    description:
      'Premium software development and consulting services for enterprise clients',
  },
  'seller-2': {
    userId: 'seller-2',
    companyName: 'Digital Innovations',
    rating: 4.6,
    completedJobs: 42,
    totalEarned: 180000,
    description: 'Full-stack development and cloud infrastructure',
  },
  'seller-3': {
    userId: 'seller-3',
    companyName: 'CloudOps Experts',
    rating: 4.7,
    completedJobs: 35,
    totalEarned: 165000,
    description: 'Cloud infrastructure and DevOps services',
  },
  'seller-4': {
    userId: 'seller-4',
    companyName: 'Data Analytics Pro',
    rating: 4.5,
    completedJobs: 28,
    totalEarned: 142000,
    description: 'Business intelligence and data analytics solutions',
  },
  'seller-5': {
    userId: 'seller-5',
    companyName: 'Security First',
    rating: 4.8,
    completedJobs: 31,
    totalEarned: 156000,
    description: 'Cybersecurity and compliance expertise',
  },
};

// Buyer Jobs
export const BUYER_JOBS: BuyerJob[] = [
  {
    id: 'job-1',
    buyerId: 'buyer-1',
    title: 'Enterprise CRM System Development',
    description:
      'Build a custom CRM system with AI-powered insights and real-time analytics dashboard',
    budget: 50000,
    currency: 'USD',
    startDate: new Date('2026-02-15'),
    endDate: new Date('2026-05-15'),
    deadline: new Date('2026-02-10'),
    minRating: 4.5,
    minCompletedJobs: 20,
    licenseRequired: false,
    referencesRequired: true,
    paymentSchedule: '30/40/30',
    status: 'open',
    topSellers: [
      {
        sellerId: 'seller-1',
        sellerName: 'Tech Solutions Inc',
        price: 48000,
        rating: 4.9,
        completedJobs: 58,
        matchScore: 0.95,
        negotiationStatus: 'negotiating',
      },
      {
        sellerId: 'seller-2',
        sellerName: 'Digital Innovations',
        price: 52000,
        rating: 4.6,
        completedJobs: 42,
        matchScore: 0.87,
        negotiationStatus: 'pending',
      },
      {
        sellerId: 'seller-3',
        sellerName: 'CloudOps Experts',
        price: 45000,
        rating: 4.7,
        completedJobs: 35,
        matchScore: 0.82,
        negotiationStatus: 'pending',
      },
    ],
    createdAt: new Date('2026-01-28'),
  },
  {
    id: 'job-2',
    buyerId: 'buyer-1',
    title: 'Mobile App Development - iOS & Android',
    description:
      'Develop cross-platform mobile app with offline sync and real-time notifications',
    budget: 35000,
    currency: 'USD',
    startDate: new Date('2026-02-20'),
    endDate: new Date('2026-04-20'),
    deadline: new Date('2026-02-12'),
    minRating: 4.5,
    minCompletedJobs: 15,
    licenseRequired: false,
    referencesRequired: true,
    paymentSchedule: '25/50/25',
    status: 'open',
    topSellers: [
      {
        sellerId: 'seller-2',
        sellerName: 'Digital Innovations',
        price: 36000,
        rating: 4.6,
        completedJobs: 42,
        matchScore: 0.91,
        negotiationStatus: 'pending',
      },
    ],
    createdAt: new Date('2026-01-25'),
  },
  {
    id: 'job-3',
    buyerId: 'buyer-1',
    title: 'Cloud Infrastructure Migration',
    description: 'Migrate legacy systems to AWS with zero downtime',
    budget: 75000,
    currency: 'USD',
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-04-01'),
    deadline: new Date('2026-02-15'),
    minRating: 4.6,
    minCompletedJobs: 25,
    licenseRequired: false,
    referencesRequired: true,
    paymentSchedule: '20/60/20',
    status: 'in_progress',
    topSellers: [
      {
        sellerId: 'seller-3',
        sellerName: 'CloudOps Experts',
        price: 72000,
        rating: 4.7,
        completedJobs: 35,
        matchScore: 0.98,
        negotiationStatus: 'accepted',
      },
    ],
    createdAt: new Date('2026-01-20'),
  },
];

// Negotiations
export const NEGOTIATIONS: Negotiation[] = [
  {
    id: 'neg-1',
    jobId: 'job-1',
    buyerId: 'buyer-1',
    sellerId: 'seller-1',
    currentOffer: {
      id: 'offer-3',
      price: 47500,
      startDate: new Date('2026-02-15'),
      endDate: new Date('2026-05-15'),
      paymentSchedule: '30/40/30',
      terms: 'Agreed on deliverables with 2-week sprint cycles',
      timestamp: new Date('2026-01-30T10:30:00'),
      from: 'seller',
    },
    offers: [
      {
        id: 'offer-1',
        price: 50000,
        startDate: new Date('2026-02-15'),
        endDate: new Date('2026-05-15'),
        paymentSchedule: '30/40/30',
        terms: 'Standard terms',
        timestamp: new Date('2026-01-29T09:00:00'),
        from: 'buyer',
      },
      {
        id: 'offer-2',
        price: 48500,
        startDate: new Date('2026-02-15'),
        endDate: new Date('2026-05-15'),
        paymentSchedule: '30/40/30',
        terms: 'Includes 3 rounds of revisions',
        timestamp: new Date('2026-01-30T08:00:00'),
        from: 'seller',
      },
      {
        id: 'offer-3',
        price: 47500,
        startDate: new Date('2026-02-15'),
        endDate: new Date('2026-05-15'),
        paymentSchedule: '30/40/30',
        terms: 'Agreed on deliverables with 2-week sprint cycles',
        timestamp: new Date('2026-01-30T10:30:00'),
        from: 'seller',
      },
    ],
    status: 'pending',
    round: 3,
    maxRounds: 5,
    createdAt: new Date('2026-01-29'),
  },
];

// Wallets
export const WALLETS: Wallet[] = [
  {
    id: 'wallet-buyer-1',
    userId: 'buyer-1',
    balance: 250000,
    currency: 'USD',
    dailyLimit: 100000,
    dailySpent: 25000,
    perJobLimit: 80000,
    escrowBalance: 50000,
  },
  {
    id: 'wallet-seller-1',
    userId: 'seller-1',
    balance: 125000,
    currency: 'USD',
    dailyLimit: 200000,
    dailySpent: 0,
    perJobLimit: 200000,
    escrowBalance: 48000,
  },
];

// Transactions
export const TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    walletId: 'wallet-buyer-1',
    type: 'deposit',
    amount: 50000,
    balance: 250000,
    description: 'Bank deposit to wallet',
    timestamp: new Date('2026-01-28T10:00:00'),
  },
  {
    id: 'tx-2',
    walletId: 'wallet-buyer-1',
    type: 'escrow_hold',
    amount: 15000,
    balance: 235000,
    description: 'Escrow hold for Job #3 - Cloud Migration',
    timestamp: new Date('2026-01-27T14:30:00'),
  },
  {
    id: 'tx-3',
    walletId: 'wallet-buyer-1',
    type: 'escrow_release',
    amount: 10000,
    balance: 245000,
    description: 'Escrow release from completed Job #1',
    timestamp: new Date('2026-01-26T11:15:00'),
  },
  {
    id: 'tx-4',
    walletId: 'wallet-seller-1',
    type: 'escrow_release',
    amount: 48000,
    balance: 125000,
    description: 'Payment received from Job #3 - First milestone',
    timestamp: new Date('2026-01-25T09:45:00'),
  },
];

// Notifications
export const NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'buyer-1',
    type: 'deal',
    title: 'Top 5 Sellers Ready',
    message: 'Your agent found 5 excellent matches for your CRM project',
    read: false,
    actionUrl: '/dashboard/jobs/job-1',
    createdAt: new Date('2026-01-30T14:00:00'),
  },
  {
    id: 'notif-2',
    userId: 'buyer-1',
    type: 'negotiation',
    title: 'New Counter Offer',
    message: 'Tech Solutions Inc reduced their price to $47,500',
    read: false,
    actionUrl: '/dashboard/negotiations/neg-1',
    createdAt: new Date('2026-01-30T10:30:00'),
  },
  {
    id: 'notif-3',
    userId: 'buyer-1',
    type: 'deadline',
    title: 'Job Deadline Approaching',
    message: 'Job deadline for Enterprise CRM is in 7 days',
    read: true,
    actionUrl: '/dashboard/jobs/job-1',
    createdAt: new Date('2026-01-29T09:00:00'),
  },
  {
    id: 'notif-4',
    userId: 'seller-1',
    type: 'deal',
    title: 'New Job Opportunity',
    message: 'You match the criteria for 3 new jobs in your specialty',
    read: true,
    actionUrl: '/dashboard/opportunities',
    createdAt: new Date('2026-01-30T12:00:00'),
  },
  {
    id: 'notif-5',
    userId: 'seller-1',
    type: 'approval',
    title: 'Action Required',
    message: 'Please approve the contract for the Cloud Migration project',
    read: false,
    actionUrl: '/dashboard/contracts',
    createdAt: new Date('2026-01-30T15:45:00'),
  },
];

// Inventory
export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'inv-1',
    sellerId: 'seller-1',
    name: 'Custom CRM Development',
    category: 'Software Development',
    basePrice: 45000,
    quantity: 100,
    description: 'Professional CRM system development with customization',
    status: 'available',
  },
  {
    id: 'inv-2',
    sellerId: 'seller-1',
    name: 'Infrastructure Consulting',
    category: 'Consulting',
    basePrice: 500,
    quantity: 1000,
    description: 'Per-hour infrastructure consulting services',
    status: 'available',
  },
  {
    id: 'inv-3',
    sellerId: 'seller-2',
    name: 'Mobile App Development',
    category: 'Mobile',
    basePrice: 30000,
    quantity: 50,
    description: 'Cross-platform mobile application development',
    status: 'available',
  },
  {
    id: 'inv-4',
    sellerId: 'seller-3',
    name: 'Cloud Migration Service',
    category: 'Cloud',
    basePrice: 60000,
    quantity: 25,
    description: 'Complete cloud infrastructure migration service',
    status: 'limited',
  },
];

// Pricing Rules
export const PRICING_RULES: PricingRule[] = [
  {
    id: 'rule-1',
    sellerId: 'seller-1',
    category: 'Software Development',
    basePrice: 45000,
    minimumMargin: 0.3,
    discountThreshold: 50000,
    volumeDiscount: 0.1,
  },
  {
    id: 'rule-2',
    sellerId: 'seller-2',
    category: 'Mobile',
    basePrice: 30000,
    minimumMargin: 0.35,
    discountThreshold: 40000,
    volumeDiscount: 0.12,
  },
];

// Agents
export const AGENTS: Agent[] = [
  {
    id: 'agent-buyer-1',
    userId: 'buyer-1',
    role: 'buyer',
    permissions: ['search', 'rank', 'negotiate', 'recommend'],
    status: 'active',
    createdAt: new Date('2025-01-01'),
  },
  {
    id: 'agent-seller-1',
    userId: 'seller-1',
    role: 'seller',
    permissions: ['price', 'counter_offer', 'apply_rules'],
    status: 'active',
    createdAt: new Date('2025-01-05'),
  },
];
