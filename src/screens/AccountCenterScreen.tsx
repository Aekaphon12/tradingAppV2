import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { LabelValue } from "../components/LabelValue";
import { Button } from "../components/Button";
import { colors } from "../theme/colors";

export const AccountCenterScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Account</Text>
      <Text style={styles.subtitle}>Profile, tier, and account overview.</Text>

      <Section title="Profile">
        <Card>
          <LabelValue label="Name" value="John Doe" />
          <LabelValue label="FISG ID" value="FISG-20831" />
          <LabelValue label="Tier" value="Silver" tone="positive" />
          <Button label="Edit Profile" variant="ghost" />
        </Card>
      </Section>

      <Section title="Account Summary">
        <Card>
          <LabelValue label="Balance" value="$1,000.00" />
          <LabelValue label="Equity" value="$1,000.00" />
          <LabelValue label="Margin" value="$120.00" />
          <LabelValue label="Free Margin" value="$880.00" />
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
  }
});
