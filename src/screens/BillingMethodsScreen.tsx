import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { LabelValue } from "../components/LabelValue";
import { colors } from "../theme/colors";

export const BillingMethodsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Billing Methods</Text>
      <Text style={styles.subtitle}>Manage deposit and withdrawal methods.</Text>

      <Section title="Saved Methods">
        <Card>
          <LabelValue label="Bank Transfer" value="Active" />
          <LabelValue label="Credit Card" value="Not linked" />
          <Button label="Add Method" />
        </Card>
      </Section>

      <Section title="Withdrawal Destinations">
        <Card>
          <LabelValue label="Primary Account" value="USD - 4821" />
          <Button label="Add Destination" variant="ghost" />
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
