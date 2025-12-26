import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Input } from "../components/Input";
import { Section } from "../components/Section";
import { Timeline } from "../components/Timeline";
import { useAppState } from "../state/AppState";
import { colors } from "../theme/colors";

export const WalletScreen: React.FC = () => {
  const {
    kycStatus,
    depositStatus,
    depositReason,
    withdrawalStatus,
    withdrawalReason,
    transactions,
    setTransactions,
    addNotification,
    setMissionsProgress
  } = useAppState();
  const [tab, setTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("100");
  const [method, setMethod] = useState("Bank Transfer");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeposit = () => {
    // analytics: track("deposit_create")
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        type: "deposit",
        amount: Number(amount),
        method,
        status: depositStatus,
        reason: depositStatus === "rejected" ? depositReason : undefined,
        time: new Date().toLocaleString()
      },
      ...prev
    ]);
    addNotification({
      id: `dep-${Date.now()}`,
      title: "Deposit Status",
      body: `Deposit ${depositStatus.toUpperCase()}`,
      time: ""
    });
    setMissionsProgress((prev) => ({ ...prev, m3: 100 }));
  };

  const handleWithdraw = () => {
    // analytics: track("withdrawal_create")
    if (kycStatus !== "approved") {
      return;
    }
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        type: "withdrawal",
        amount: Number(amount),
        method,
        status: withdrawalStatus,
        reason: withdrawalStatus === "rejected" ? withdrawalReason : undefined,
        time: new Date().toLocaleString()
      },
      ...prev
    ]);
    addNotification({
      id: `wd-${Date.now()}`,
      title: "Withdrawal Status",
      body: `Withdrawal ${withdrawalStatus.toUpperCase()}`,
      time: ""
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Wallet</Text>
      <Text style={styles.subtitle}>Deposit, withdraw, and track status.</Text>

      <View style={styles.tabRow}>
        <Chip label="Deposit" selected={tab === "deposit"} onPress={() => setTab("deposit")} />
        <Chip label="Withdraw" selected={tab === "withdraw"} onPress={() => setTab("withdraw")} />
      </View>

      {tab === "deposit" ? (
        <Section title="Deposit Flow">
          <Card>
            <View style={styles.field}>
              <Text style={styles.label}>Amount</Text>
              <Input value={amount} onChangeText={setAmount} keyboardType="numeric" />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Method</Text>
              <Input value={method} onChangeText={setMethod} />
            </View>
            <Text style={styles.status}>Status: {depositStatus.toUpperCase()}</Text>
            {depositStatus === "rejected" ? <Text style={styles.reason}>{depositReason}</Text> : null}
            <Button label="Confirm Deposit" onPress={() => setShowConfirm(true)} />
          </Card>
        </Section>
      ) : (
        <Section title="Withdrawal Flow">
          <Card>
            <View style={styles.field}>
              <Text style={styles.label}>Amount</Text>
              <Input value={amount} onChangeText={setAmount} keyboardType="numeric" />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Destination Method</Text>
              <Input value={method} onChangeText={setMethod} />
            </View>
            <Text style={styles.status}>Status: {withdrawalStatus.toUpperCase()}</Text>
            {withdrawalStatus === "rejected" ? <Text style={styles.reason}>{withdrawalReason}</Text> : null}
            {kycStatus !== "approved" ? (
              <Text style={styles.blocked}>Withdrawal blocked. KYC must be Approved.</Text>
            ) : null}
            <Button label="Confirm Withdraw" onPress={handleWithdraw} disabled={kycStatus !== "approved"} />
          </Card>
        </Section>
      )}

      <Section title="Transaction History">
        <Card>
          <Timeline items={transactions} />
        </Card>
      </Section>

      <Section title="Retry Pattern">
        <Card>
          <Text style={styles.info}>If a status update fails, show retry here.</Text>
          <Button label="Retry" variant="ghost" />
        </Card>
      </Section>
      <ConfirmDialog
        visible={showConfirm}
        title="Confirm Deposit"
        message={`Deposit ${amount} via ${method}?`}
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={() => {
          setShowConfirm(false);
          handleDeposit();
        }}
        onCancel={() => setShowConfirm(false)}
      />
      </ScrollView>
      <ConfirmDialog
        visible={showConfirm}
        title="Confirm Deposit"
        message={`Deposit ${amount} via ${method}?`}
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={() => {
          setShowConfirm(false);
          handleDeposit();
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
        paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 90
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: 12
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 12
  },
  field: {
    marginBottom: 12
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6
  },
  status: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
    color: colors.textPrimary
  },
  reason: {
    fontSize: 12,
    color: colors.danger,
    marginBottom: 6
  },
  blocked: {
    fontSize: 12,
    color: colors.warning,
    marginBottom: 6
  },
  info: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10
  }
});
