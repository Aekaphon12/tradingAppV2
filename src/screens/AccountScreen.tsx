import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Section } from "../components/Section";
import { Toggle } from "../components/Toggle";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const AccountScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useI18n();
  const {
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
    setMissionsProgress
  } = useAppState();

  const handleOpen = () => {
    // analytics: track("open_account")
    setAccountStatus("pending");
    setTimeout(() => setAccountStatus("active"), 500);
    setMissionsProgress((prev) => ({ ...prev, m2: 100 }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("openTradingAccount")}</Text>
      <Text style={styles.subtitle}>{t("openAccountSubtitle")}</Text>

      <Card>
        <Text style={styles.status}>
          {t("statusLabel")}: {t(accountStatus).toUpperCase()}
        </Text>
        <Toggle left={t("real")} right={t("demo")} value={isDemo} onChange={setIsDemo} />
      </Card>

      <Section title={t("accountDetails")}>
        <Card>
          <View style={styles.field}>
            <Text style={styles.label}>{t("accountTypeLabel")}</Text>
            <Input value={accountType} onChangeText={setAccountType} placeholder="Standard" />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t("leverage")}</Text>
            <Input value={leverage} onChangeText={setLeverage} placeholder="1:200" />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t("baseCurrencyLabel")}</Text>
            <Input value={baseCurrency} onChangeText={setBaseCurrency} placeholder="USD" />
          </View>
          <Button label={t("openAccountButton")} onPress={handleOpen} />
        </Card>
      </Section>

      <Section title={t("accountNotes")}>
        <Card>
          <Text style={styles.note}>{t("accountNotesMessage")}</Text>
        </Card>
      </Section>

      <Button label={t("back")} variant="ghost" onPress={onBack} />
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
  status: {
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10
  },
  field: {
    marginBottom: 12
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6
  },
  note: {
    fontSize: 12,
    color: colors.textSecondary
  }
});
