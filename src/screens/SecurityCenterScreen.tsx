import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { LabelValue } from "../components/LabelValue";
import { colors } from "../theme/colors";

export const SecurityCenterScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Security</Text>
      <Text style={styles.subtitle}>Protect your account access.</Text>

      <Section title="Access">
        <Card>
          <LabelValue label="Password" value="••••••" />
          <LabelValue label="2FA" value="Disabled" tone="negative" />
          <Button label="Enable 2FA" />
          <Button label="Change Password" variant="ghost" />
        </Card>
      </Section>

      <Section title="Device Sessions">
        <Card>
          <LabelValue label="Current Device" value="iPhone 16 Pro Max" />
          <LabelValue label="Last Login" value="5 mins ago" />
          <Button label="Sign out other devices" variant="ghost" />
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
