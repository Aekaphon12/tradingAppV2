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
import { useI18n } from "../state/I18n";
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
  const { t } = useI18n();
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
      title: t("deposit"),
      body: `${t("deposit")} ${t(depositStatus).toUpperCase()}`,
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
      title: t("withdraw"),
      body: `${t("withdraw")} ${t(withdrawalStatus).toUpperCase()}`,
      time: ""
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("wallet")}</Text>
      <Text style={styles.subtitle}>{t("walletSubtitle")}</Text>

      <View style={styles.tabRow}>
        <Chip label={t("depositTab")} selected={tab === "deposit"} onPress={() => setTab("deposit")} />
        <Chip label={t("withdrawTab")} selected={tab === "withdraw"} onPress={() => setTab("withdraw")} />
      </View>

      {tab === "deposit" ? (
        <Section title={t("depositFlow")}>
          <Card>
            <View style={styles.field}>
              <Text style={styles.label}>{t("amount")}</Text>
              <Input value={amount} onChangeText={setAmount} keyboardType="numeric" />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>{t("method")}</Text>
              <Input value={method} onChangeText={setMethod} />
            </View>
            <Text style={styles.status}>
              {t("statusLabel")}: {t(depositStatus).toUpperCase()}
            </Text>
            {depositStatus === "rejected" ? <Text style={styles.reason}>{depositReason}</Text> : null}
            <Button label={t("confirmDeposit")} onPress={() => setShowConfirm(true)} />
          </Card>
        </Section>
      ) : (
        <Section title={t("withdrawalFlow")}>
          <Card>
            <View style={styles.field}>
              <Text style={styles.label}>{t("amount")}</Text>
              <Input value={amount} onChangeText={setAmount} keyboardType="numeric" />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>{t("destinationMethod")}</Text>
              <Input value={method} onChangeText={setMethod} />
            </View>
            <Text style={styles.status}>
              {t("statusLabel")}: {t(withdrawalStatus).toUpperCase()}
            </Text>
            {withdrawalStatus === "rejected" ? <Text style={styles.reason}>{withdrawalReason}</Text> : null}
            {kycStatus !== "approved" ? (
              <Text style={styles.blocked}>{t("withdrawalBlocked")}</Text>
            ) : null}
            <Button label={t("confirmWithdraw")} onPress={handleWithdraw} disabled={kycStatus !== "approved"} />
          </Card>
        </Section>
      )}

      <Section title={t("transactionHistory")}>
        <Card>
          <Timeline items={transactions} />
        </Card>
      </Section>

      <Section title={t("retryPattern")}>
        <Card>
          <Text style={styles.info}>{t("retryMessage")}</Text>
          <Button label={t("retry")} variant="ghost" />
        </Card>
      </Section>
      <ConfirmDialog
        visible={showConfirm}
        title={t("confirmDepositTitle")}
        message={t("confirmDepositMessage").replace("{amount}", amount).replace("{method}", method)}
        confirmLabel={t("confirm")}
        cancelLabel={t("cancel")}
        onConfirm={() => {
          setShowConfirm(false);
          handleDeposit();
        }}
        onCancel={() => setShowConfirm(false)}
      />
      </ScrollView>
      <ConfirmDialog
        visible={showConfirm}
        title={t("confirmDepositTitle")}
        message={t("confirmDepositMessage").replace("{amount}", amount).replace("{method}", method)}
        confirmLabel={t("confirm")}
        cancelLabel={t("cancel")}
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
