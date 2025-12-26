import React, { createContext, useContext, useMemo, useState } from "react";
import type { Lang } from "../data/i18n";
import { missions as baseMissions } from "../data/mock";

export type KycStatus = "unverified" | "pending" | "approved" | "rejected";
export type TxStatus = "pending" | "approved" | "rejected";
export type AccountStatus = "active" | "disabled" | "pending";

export type Transaction = {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  method: string;
  status: TxStatus;
  reason?: string;
  time: string;
};

export type Position = {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  volume: number;
  openPrice: number;
  pl: number;
};

export type Alert = {
  id: string;
  symbol: string;
  target: number;
  enabled: boolean;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
};

type AppState = {
  isAuthed: boolean;
  setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>;
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
  kycStatus: KycStatus;
  setKycStatus: React.Dispatch<React.SetStateAction<KycStatus>>;
  kycRejectReason: string;
  setKycRejectReason: React.Dispatch<React.SetStateAction<string>>;
  accountStatus: AccountStatus;
  setAccountStatus: React.Dispatch<React.SetStateAction<AccountStatus>>;
  accountType: string;
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
  leverage: string;
  setLeverage: React.Dispatch<React.SetStateAction<string>>;
  baseCurrency: string;
  setBaseCurrency: React.Dispatch<React.SetStateAction<string>>;
  isDemo: boolean;
  setIsDemo: React.Dispatch<React.SetStateAction<boolean>>;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  equity: number;
  setEquity: React.Dispatch<React.SetStateAction<number>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  depositStatus: TxStatus;
  setDepositStatus: React.Dispatch<React.SetStateAction<TxStatus>>;
  depositReason: string;
  setDepositReason: React.Dispatch<React.SetStateAction<string>>;
  withdrawalStatus: TxStatus;
  setWithdrawalStatus: React.Dispatch<React.SetStateAction<TxStatus>>;
  withdrawalReason: string;
  setWithdrawalReason: React.Dispatch<React.SetStateAction<string>>;
  positions: Position[];
  setPositions: React.Dispatch<React.SetStateAction<Position[]>>;
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  missionsProgress: Record<string, number>;
  setMissionsProgress: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  fontScale: number;
  setFontScale: React.Dispatch<React.SetStateAction<number>>;
};

const AppStateContext = createContext<AppState | undefined>(undefined);

const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [kycStatus, setKycStatus] = useState<KycStatus>("unverified");
  const [kycRejectReason, setKycRejectReason] = useState("Document unclear");
  const [accountStatus, setAccountStatus] = useState<AccountStatus>("pending");
  const [accountType, setAccountType] = useState("Standard");
  const [leverage, setLeverage] = useState("1:200");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [isDemo, setIsDemo] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [equity, setEquity] = useState(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [depositStatus, setDepositStatus] = useState<TxStatus>("pending");
  const [depositReason, setDepositReason] = useState("Bank verification pending");
  const [withdrawalStatus, setWithdrawalStatus] = useState<TxStatus>("pending");
  const [withdrawalReason, setWithdrawalReason] = useState("KYC required");
  const [positions, setPositions] = useState<Position[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [missionsProgress, setMissionsProgress] = useState<Record<string, number>>(
    baseMissions.reduce((acc, m) => ({ ...acc, [m.id]: m.progress }), {})
  );
  const [fontScale, setFontScale] = useState(1);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [{ ...notification, time: nowTime() }, ...prev]);
  };

  const value = useMemo(
    () => ({
      isAuthed,
      setIsAuthed,
      lang,
      setLang,
      kycStatus,
      setKycStatus,
      kycRejectReason,
      setKycRejectReason,
      accountStatus,
      setAccountStatus,
      accountType,
      setAccountType,
      leverage,
      setLeverage,
      baseCurrency,
      setBaseCurrency,
      isDemo,
      setIsDemo,
      balance,
      setBalance,
      equity,
      setEquity,
      transactions,
      setTransactions,
      depositStatus,
      setDepositStatus,
      depositReason,
      setDepositReason,
      withdrawalStatus,
      setWithdrawalStatus,
      withdrawalReason,
      setWithdrawalReason,
      positions,
      setPositions,
      alerts,
      setAlerts,
      notifications,
      addNotification,
      missionsProgress,
      setMissionsProgress,
      fontScale,
      setFontScale
    }),
    [
      isAuthed,
      lang,
      kycStatus,
      kycRejectReason,
      accountStatus,
      accountType,
      leverage,
      baseCurrency,
      isDemo,
      balance,
      equity,
      transactions,
      depositStatus,
      depositReason,
      withdrawalStatus,
      withdrawalReason,
      positions,
      alerts,
      notifications,
      missionsProgress,
      fontScale
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
};
