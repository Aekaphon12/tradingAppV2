import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { useAppState } from "../state/AppState";
import { colors } from "../theme/colors";

export const KycScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { kycStatus, kycRejectReason, setKycStatus, setMissionsProgress } = useAppState();

  const handleSubmit = () => {
    // analytics: track("kyc_submit")
    setKycStatus("pending");
    setMissionsProgress((prev) => ({ ...prev, m1: 50 }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>KYC Verification</Text>
      <Text style={styles.subtitle}>Upload ID and proof of address.</Text>
      <Card>
        <Text style={styles.statusLabel}>Status: {kycStatus.toUpperCase()}</Text>
        {kycStatus === "rejected" ? <Text style={styles.reason}>Reason: {kycRejectReason}</Text> : null}
      </Card>

      <Section title="Upload Documents">
        <Card>
          <View style={styles.uploadRow}>
            <Text style={styles.uploadLabel}>ID Document</Text>
            <Button label="Upload" variant="ghost" />
          </View>
          <View style={styles.uploadRow}>
            <Text style={styles.uploadLabel}>Proof of Address</Text>
            <Button label="Upload" variant="ghost" />
          </View>
          <Button label="Submit for Review" onPress={handleSubmit} />
        </Card>
      </Section>

      <Section title="Review Tracking">
        <Card>
          <Text style={styles.info}>We will notify you when your verification is reviewed.</Text>
        </Card>
      </Section>

      <Button label="Back" variant="ghost" onPress={onBack} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 18,
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
