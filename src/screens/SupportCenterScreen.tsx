import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { colors } from "../theme/colors";

export const SupportCenterScreen: React.FC = () => {
  const [ticketCreated, setTicketCreated] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Support</Text>
      <Text style={styles.subtitle}>Get help or contact the team.</Text>

      <Section title="Contact">
        <Card>
          <Text style={styles.text}>Create a support ticket or open chat.</Text>
          <Button label="Create Ticket" onPress={() => setTicketCreated(true)} />
          {ticketCreated ? <Text style={styles.success}>Ticket created. We will reach out soon.</Text> : null}
          <Button label="Open Chat" variant="ghost" />
        </Card>
      </Section>

      <Section title="Help Center">
        <Card>
          <Text style={styles.text}>Find answers to common issues and workflows.</Text>
          <Button label="Open Help Center" variant="ghost" />
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
  },
  text: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10
  },
  success: {
    fontSize: 12,
    color: colors.positive,
    marginTop: 8
  }
});
