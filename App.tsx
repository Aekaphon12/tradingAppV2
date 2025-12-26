import React, { useEffect, useMemo, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, View, Pressable } from "react-native";
import { AppStateProvider, useAppState } from "./src/state/AppState";
import { I18nProvider } from "./src/state/I18n";
import { AuthScreen } from "./src/screens/AuthScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MarketScreen } from "./src/screens/MarketScreen";
import { TradeScreen } from "./src/screens/TradeScreen";
import { WalletScreen } from "./src/screens/WalletScreen";
import { RewardsScreen } from "./src/screens/RewardsScreen";
import { NewsScreen } from "./src/screens/NewsScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { KycScreen } from "./src/screens/KycScreen";
import { AccountScreen } from "./src/screens/AccountScreen";
import { NotificationsScreen } from "./src/screens/NotificationsScreen";
import { AccountCenterScreen } from "./src/screens/AccountCenterScreen";
import { VerificationCenterScreen } from "./src/screens/VerificationCenterScreen";
import { SecurityCenterScreen } from "./src/screens/SecurityCenterScreen";
import { BillingMethodsScreen } from "./src/screens/BillingMethodsScreen";
import { PreferencesScreen } from "./src/screens/PreferencesScreen";
import { SupportCenterScreen } from "./src/screens/SupportCenterScreen";
import { BottomTabs, TabKey } from "./src/components/BottomTabs";
import { DevPanel } from "./src/components/DevPanel";
import { Toast } from "./src/components/Toast";
import type { ScreenKey } from "./src/state/Navigation";
import { colors } from "./src/theme/colors";
import { SplashScreen } from "./src/components/SplashScreen";
import { AppHeader } from "./src/components/AppHeader";
import { SideDrawer } from "./src/components/SideDrawer";

const AppShell: React.FC = () => {
  const { isAuthed, setIsAuthed, notifications } = useAppState();
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [showDev, setShowDev] = useState(false);
  const [toast, setToast] = useState<{ title: string; body: string } | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tabForScreen = useMemo<Record<ScreenKey, TabKey>>(
    () => ({
      home: "home",
      market: "market",
      trade: "trade",
      wallet: "wallet",
      rewards: "rewards",
      news: "news",
      profile: "profile",
      more: "profile",
      settings: "profile",
      kyc: "home",
      account: "home",
      notifications: "home",
      accountCenter: "more",
      verificationCenter: "more",
      securityCenter: "more",
      billingMethods: "more",
      preferences: "more",
      supportCenter: "more"
    }),
    []
  );

  useEffect(() => {
    if (!notifications.length) return;
    const latest = notifications[0];
    setToast({ title: latest.title, body: latest.body });
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [notifications]);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setScreen(tab);
  };

  const handleNavigate = (next: ScreenKey) => {
    setScreen(next);
    setActiveTab(tabForScreen[next]);
  };

  if (!isAuthed) {
    return (
      <View style={styles.webOuter}>
        <SafeAreaView style={styles.shell}>
          <View style={styles.content}>
            <AuthScreen onAuth={() => setIsAuthed(true)} />
          </View>
          {showSplash ? <SplashScreen onDone={() => setShowSplash(false)} /> : null}
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.webOuter}>
      <SafeAreaView style={styles.shell}>
        <AppHeader onMenu={() => setDrawerOpen(true)} />
        <View style={styles.content}>
          {screen === "home" ? <HomeScreen onNavigate={handleNavigate} /> : null}
          {screen === "market" ? <MarketScreen /> : null}
          {screen === "trade" ? <TradeScreen /> : null}
          {screen === "wallet" ? <WalletScreen /> : null}
          {screen === "rewards" ? <RewardsScreen /> : null}
          {screen === "news" ? <NewsScreen /> : null}
          {screen === "settings" ? (
            <ProfileScreen onLogout={() => setIsAuthed(false)} onNavigate={handleNavigate} />
          ) : null}
          {screen === "profile" ? (
            <ProfileScreen onLogout={() => setIsAuthed(false)} onNavigate={handleNavigate} />
          ) : null}
          {screen === "kyc" ? <KycScreen onBack={() => handleNavigate("home")} /> : null}
          {screen === "account" ? <AccountScreen onBack={() => handleNavigate("home")} /> : null}
          {screen === "notifications" ? <NotificationsScreen onBack={() => handleNavigate("home")} /> : null}
          {screen === "accountCenter" ? <AccountCenterScreen /> : null}
          {screen === "verificationCenter" ? <VerificationCenterScreen /> : null}
          {screen === "securityCenter" ? <SecurityCenterScreen /> : null}
          {screen === "billingMethods" ? <BillingMethodsScreen /> : null}
          {screen === "preferences" ? <PreferencesScreen /> : null}
          {screen === "supportCenter" ? <SupportCenterScreen /> : null}
        </View>

        <BottomTabs active={activeTab} onChange={handleTabChange} />

        <Pressable style={styles.devTrigger} onPress={() => setShowDev(true)} />
        {showDev ? <DevPanel onClose={() => setShowDev(false)} /> : null}
        {toast ? <Toast title={toast.title} body={toast.body} /> : null}
        {showSplash ? <SplashScreen onDone={() => setShowSplash(false)} /> : null}
        <SideDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onNavigate={handleNavigate}
          onLogout={() => setIsAuthed(false)}
        />
      </SafeAreaView>
    </View>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <I18nProvider>
        <AppShell />
      </I18nProvider>
    </AppStateProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === "web"
      ? {
          width: 430,
          height: 932,
          borderRadius: 0,
          overflow: "hidden"
        }
      : null)
  },
  content: {
    flex: 1
  },
  webOuter: {
    flex: 1,
    ...(Platform.OS === "web"
      ? {
          backgroundColor: "#050C0A",
          alignItems: "center",
          justifyContent: "center"
        }
      : null)
  },
  devTrigger: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(25, 229, 140, 0.25)"
  }
});
