import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type {
  User,
  BuyerJob,
  Negotiation,
  NegotiationOffer,
  Wallet,
  Transaction,
  Notification,
  InventoryItem,
  PricingRule,
} from './types';
import {
  DEMO_USERS,
  BUYER_PROFILES,
  SELLER_PROFILES,
  BUYER_JOBS,
  NEGOTIATIONS,
  WALLETS,
  TRANSACTIONS,
  NOTIFICATIONS,
  INVENTORY_ITEMS,
  PRICING_RULES,
} from './dummy-data';
import { authClient } from './auth-client';

interface DashboardContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  jobs: BuyerJob[];
  negotiations: Negotiation[];
  wallets: Wallet[];
  transactions: Transaction[];
  notifications: Notification[];
  inventoryItems: InventoryItem[];
  pricingRules: PricingRule[];
  unreadNotifications: Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  updateNegotiation: (negotiation: Negotiation) => void;
  submitCounterOffer: (
    negotiationId: string,
    offer: NegotiationOffer
  ) => void;
  acceptOffer: (negotiationId: string) => void;
  rejectOffer: (negotiationId: string) => void;
  createJob: (job: BuyerJob) => void;
  updateWallet: (wallet: Wallet) => void;
  createInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (item: InventoryItem) => void;
  deleteInventoryItem: (itemId: string) => void;
  createPricingRule: (rule: PricingRule) => void;
  updatePricingRule: (rule: PricingRule) => void;
  deletePricingRule: (ruleId: string) => void;
  getBuyerProfile: (userId: string) => typeof BUYER_PROFILES[keyof typeof BUYER_PROFILES] | undefined;
  getSellerProfile: (userId: string) => typeof SELLER_PROFILES[keyof typeof SELLER_PROFILES] | undefined;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<BuyerJob[]>(BUYER_JOBS);
  const [negotiations, setNegotiations] = useState<Negotiation[]>(NEGOTIATIONS);
  const [wallets, setWallets] = useState<Wallet[]>(WALLETS);
  const [transactions] = useState<Transaction[]>(TRANSACTIONS);
  const [notifications, setNotifications] =
    useState<Notification[]>(NOTIFICATIONS);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(INVENTORY_ITEMS);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>(PRICING_RULES);

  // Get session from better-auth and set demo user based on role
  const { data: session } = authClient.useSession();
  
  useEffect(() => {
    if (session?.user) {
      // Use the role from the session to determine which demo user to use
      const role = (session.user as { role?: string }).role;
      const demoUser = role === 'seller' ? DEMO_USERS.seller : DEMO_USERS.buyer;
      
      // Create a user object that combines session info with demo data
      setCurrentUser({
        ...demoUser,
        email: session.user.email || demoUser.email,
        role: (role as 'buyer' | 'seller') || 'buyer',
      });
    } else {
      setCurrentUser(null);
    }
  }, [session]);

  const unreadNotifications = notifications.filter((n) => !n.read);

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  }, []);

  const updateNegotiation = useCallback((negotiation: Negotiation) => {
    setNegotiations((prev) =>
      prev.map((n) => (n.id === negotiation.id ? negotiation : n))
    );
  }, []);

  const submitCounterOffer = useCallback(
    (negotiationId: string, offer: NegotiationOffer) => {
      setNegotiations((prev) =>
        prev.map((n) => {
          if (n.id === negotiationId) {
            return {
              ...n,
              offers: [...n.offers, offer],
              currentOffer: offer,
              round: n.round + 1,
            };
          }
          return n;
        })
      );
      // Add notification for counter offer
      setNotifications((prev) => [
        ...prev,
        {
          id: `notif-${Date.now()}`,
          userId: currentUser?.id || 'buyer-1',
          type: 'negotiation',
          title: 'New Counter Offer',
          message: `New counter offer of $${offer.price} received`,
          read: false,
          createdAt: new Date(),
        },
      ]);
    },
    [currentUser?.id]
  );

  const acceptOffer = useCallback((negotiationId: string) => {
    setNegotiations((prev) =>
      prev.map((n) =>
        n.id === negotiationId ? { ...n, status: 'accepted' } : n
      )
    );
    setNotifications((prev) => [
      ...prev,
      {
        id: `notif-${Date.now()}`,
        userId: currentUser?.id || 'buyer-1',
        type: 'deal',
        title: 'Deal Accepted',
        message: 'Your offer has been accepted',
        read: false,
        createdAt: new Date(),
      },
    ]);
  }, [currentUser?.id]);

  const rejectOffer = useCallback((negotiationId: string) => {
    setNegotiations((prev) =>
      prev.map((n) =>
        n.id === negotiationId ? { ...n, status: 'rejected' } : n
      )
    );
  }, []);

  const createJob = useCallback((job: BuyerJob) => {
    setJobs((prev) => [...prev, job]);
    setNotifications((prev) => [
      ...prev,
      {
        id: `notif-${Date.now()}`,
        userId: currentUser?.id || 'buyer-1',
        type: 'deal',
        title: 'Job Created',
        message: `Your job "${job.title}" has been created and published`,
        read: false,
        createdAt: new Date(),
      },
    ]);
  }, [currentUser?.id]);

  const updateWallet = useCallback((wallet: Wallet) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === wallet.id ? wallet : w))
    );
  }, []);

  const createInventoryItem = useCallback((item: InventoryItem) => {
    setInventoryItems((prev) => [...prev, item]);
    setNotifications((prev) => [
      ...prev,
      {
        id: `notif-${Date.now()}`,
        userId: currentUser?.id || 'seller-1',
        type: 'deal',
        title: 'Item Added',
        message: `Your service "${item.name}" has been added to inventory`,
        read: false,
        createdAt: new Date(),
      },
    ]);
  }, [currentUser?.id]);

  const updateInventoryItem = useCallback((item: InventoryItem) => {
    setInventoryItems((prev) =>
      prev.map((i) => (i.id === item.id ? item : i))
    );
  }, []);

  const deleteInventoryItem = useCallback((itemId: string) => {
    setInventoryItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const createPricingRule = useCallback((rule: PricingRule) => {
    setPricingRules((prev) => [...prev, rule]);
  }, []);

  const updatePricingRule = useCallback((rule: PricingRule) => {
    setPricingRules((prev) =>
      prev.map((r) => (r.id === rule.id ? rule : r))
    );
  }, []);

  const deletePricingRule = useCallback((ruleId: string) => {
    setPricingRules((prev) => prev.filter((r) => r.id !== ruleId));
  }, []);

  const getBuyerProfile = (userId: string) => {
    return BUYER_PROFILES[userId];
  };

  const getSellerProfile = (userId: string) => {
    return SELLER_PROFILES[userId];
  };

  return (
    <DashboardContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        jobs,
        negotiations,
        wallets,
        transactions,
        notifications,
        inventoryItems,
        pricingRules,
        unreadNotifications,
        markNotificationAsRead,
        updateNegotiation,
        submitCounterOffer,
        acceptOffer,
        rejectOffer,
        createJob,
        updateWallet,
        createInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        createPricingRule,
        updatePricingRule,
        deletePricingRule,
        getBuyerProfile,
        getSellerProfile,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}
