import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { LabelValue } from "../components/LabelValue";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const SecurityCenterScreen: React.FC = () => {
  const { t } = useI18n();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("securityTitle")}</Text>
      <Text style={styles.subtitle}>{t("securitySubtitle")}</Text>

      <Section title={t("access")}>
        <Card>
          <LabelValue label={t("password")} value="••••••" />
          <LabelValue label={t("twoFactor")} value={t("disabled")} tone="negative" />
          <Button label={t("enable2fa")} />
          <Button label={t("changePassword")} variant="ghost" />
        </Card>
      </Section>

      <Section title={t("deviceSessions")}>
        <Card>
          <LabelValue label={t("currentDevice")} value="iPhone 16 Pro Max" />
          <LabelValue label={t("lastLogin")} value={t("minutesAgo").replace("{count}", "5")} />
          <Button label={t("signOutOthers")} variant="ghost" />
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
  }
});
