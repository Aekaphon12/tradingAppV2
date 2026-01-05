import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const KycScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { kycStatus, kycRejectReason, setKycStatus, setMissionsProgress } = useAppState();
  const { t } = useI18n();

  const handleSubmit = () => {
    // analytics: track("kyc_submit")
    setKycStatus("pending");
    setMissionsProgress((prev) => ({ ...prev, m1: 50 }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("kyc")}</Text>
      <Text style={styles.subtitle}>{t("kycSubtitle")}</Text>
      <Card>
        <Text style={styles.statusLabel}>
          {t("statusLabel")}: {t(kycStatus).toUpperCase()}
        </Text>
        {kycStatus === "rejected" ? <Text style={styles.reason}>{t("reason")}: {kycRejectReason}</Text> : null}
      </Card>

      <Section title={t("uploadDocuments")}>
        <Card>
          <View style={styles.uploadRow}>
            <Text style={styles.uploadLabel}>{t("idDocument")}</Text>
            <Button label={t("upload")} variant="ghost" />
          </View>
          <View style={styles.uploadRow}>
            <Text style={styles.uploadLabel}>{t("proofOfAddress")}</Text>
            <Button label={t("upload")} variant="ghost" />
          </View>
          <Button label={t("submitForReview")} onPress={handleSubmit} />
        </Card>
      </Section>

      <Section title={t("reviewTracking")}>
        <Card>
          <Text style={styles.info}>{t("reviewTrackingInfo")}</Text>
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
  statusLabel: {
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 6
  },
  reason: {
    color: colors.danger,
    fontSize: 12
  },
  uploadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  uploadLabel: {
    color: colors.textPrimary
  },
  info: {
    fontSize: 12,
    color: colors.textSecondary
  }
});
