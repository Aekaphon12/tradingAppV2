import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { ChecklistItem } from "../components/ChecklistItem";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { LabelValue } from "../components/LabelValue";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";
import type { ScreenKey } from "../state/Navigation";
import { colors } from "../theme/colors";

export const HomeScreen: React.FC<{ onNavigate: (screen: ScreenKey) => void }> = ({ onNavigate }) => {
  const { t } = useI18n();
  const { kycStatus, accountStatus, balance, equity, notifications } = useAppState();

  const isKycDone = kycStatus === "approved";
  const isAccountOpen = accountStatus === "active";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title={t("nextSteps")}>
        <Card>
          <ChecklistItem
            title={t("kyc")}
            subtitle={`${t("statusLabel")}: ${t(kycStatus)}`}
            completed={isKycDone}
            onPress={() => onNavigate("kyc")}
          />
          <ChecklistItem
            title={t("openAccount")}
            subtitle={`${t("accountLabel")}: ${t(accountStatus)}`}
            completed={isAccountOpen}
            onPress={() => onNavigate("account")}
          />
          <ChecklistItem title={t("deposit")} subtitle={t("fundWallet")} onPress={() => onNavigate("wallet")} />
          <ChecklistItem title={t("tradeNow")} subtitle={t("startMarketOrder")} onPress={() => onNavigate("trade")} />
        </Card>
      </Section>

      <Section title={t("accountSnapshot")}>
        <Card>
          <LabelValue label={t("balance")} value={`$${balance.toFixed(2)}`} />
          <LabelValue label={t("equity")} value={`$${equity.toFixed(2)}`} />
          <LabelValue label={t("kyc")} value={t(kycStatus).toUpperCase()} tone={isKycDone ? "positive" : "negative"} />
          <Button label={t("openTradingAccount")} onPress={() => onNavigate("account")} />
        </Card>
      </Section>

      <Section title={t("quickActions")}>
        <Card>
          <Button label={t("setPriceAlert")} onPress={() => onNavigate("market")} />
          <View style={styles.spacer} />
          <Button label={t("readMarketNews")} variant="ghost" onPress={() => onNavigate("news")} />
          <View style={styles.spacer} />
          <Button label={t("viewMissions")} variant="ghost" onPress={() => onNavigate("rewards")} />
        </Card>
      </Section>

      <Section title={t("guidedTourLater")}>
        <Card>
          <Text style={styles.empty}>{t("guidedTourPlaceholder")}</Text>
        </Card>
      </Section>

      <Section title={t("notifications")}>
        <Card>
          {notifications.length === 0 ? (
            <Text style={styles.empty}>{t("noAlertsYet")}</Text>
          ) : (
            notifications.slice(0, 3).map((note) => (
              <View key={note.id} style={styles.noteRow}>
                <View>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text style={styles.noteBody}>{note.body}</Text>
                </View>
                <Text style={styles.noteTime}>{note.time}</Text>
              </View>
            ))
          )}
          <Button label={t("viewAll")} variant="ghost" onPress={() => onNavigate("notifications")} />
        </Card>
      </Section>
    </ScrollView>
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
    paddingBottom: 80
  },
  empty: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 10
  },
  spacer: {
    height: 8
  },
  noteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  noteTitle: {
    fontWeight: "700",
    color: colors.textPrimary
  },
  noteBody: {
    fontSize: 12,
    color: colors.textSecondary
  },
  noteTime: {
    fontSize: 11,
    color: colors.textMuted
  }
});
