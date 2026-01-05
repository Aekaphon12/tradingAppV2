import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { LabelValue } from "../components/LabelValue";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const VerificationCenterScreen: React.FC = () => {
  const { t } = useI18n();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("verificationTitle")}</Text>
      <Text style={styles.subtitle}>{t("verificationSubtitle")}</Text>

      <Section title={t("kycStatusTitle")}>
        <Card>
          <LabelValue label={t("statusLabel")} value={t("unverified")} tone="negative" />
          <LabelValue label={t("lastUpdate")} value={t("today")} />
          <Button label={t("startVerification")} />
        </Card>
      </Section>

      <Section title={t("documents")}>
        <Card>
          <LabelValue label={t("idDocument")} value={t("notSubmitted")} />
          <LabelValue label={t("proofOfAddress")} value={t("notSubmitted")} />
          <Button label={t("uploadDocumentsLabel")} variant="ghost" />
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
