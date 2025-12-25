import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { LabelValue } from "../components/LabelValue";
import { colors } from "../theme/colors";

export const VerificationCenterScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>KYC status and document tracking.</Text>

      <Section title="KYC Status">
        <Card>
          <LabelValue label="Status" value="Unverified" tone="negative" />
          <LabelValue label="Last Update" value="Today" />
          <Button label="Start Verification" />
        </Card>
      </Section>

      <Section title="Documents">
        <Card>
          <LabelValue label="ID Document" value="Not submitted" />
          <LabelValue label="Proof of Address" value="Not submitted" />
          <Button label="Upload Documents" variant="ghost" />
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
