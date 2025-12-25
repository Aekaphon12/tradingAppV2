import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { Section } from "../components/Section";
import { faqItems } from "../data/mock";
import { useAppState } from "../state/AppState";
import { colors } from "../theme/colors";

export const SettingsScreen: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { lang, setLang } = useAppState();
  const [ticketCreated, setTicketCreated] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings & Support</Text>
      <Text style={styles.subtitle}>Language, preferences, and help.</Text>

      <Section title="Preferences">
        <Card>
          <Text style={styles.label}>Language</Text>
          <View style={styles.row}>
            <Chip label="EN" selected={lang === "en"} onPress={() => setLang("en")} />
            <Chip label="TH" selected={lang === "th"} onPress={() => setLang("th")} />
            <Chip label="CN" selected={lang === "zh"} onPress={() => setLang("zh")} />
          </View>
          <Text style={styles.label}>Currency</Text>
          <Text style={styles.value}>USD (mock)</Text>
          <Text style={styles.label}>Timezone</Text>
          <Text style={styles.value}>Asia/Bangkok (mock)</Text>
        </Card>
      </Section>

      <Section title="Support">
        <Card>
          <Text style={styles.value}>Create a support ticket or open chat.</Text>
          <Button label="Create Ticket" onPress={() => setTicketCreated(true)} />
          {ticketCreated ? <Text style={styles.success}>Ticket created. We will reach out soon.</Text> : null}
          <Button label="Open Chat" variant="ghost" />
        </Card>
      </Section>

      <Section title="FAQ / Help Center">
        <Card>
          {faqItems.map((item) => (
            <View key={item.id} style={styles.faqRow}>
              <Text style={styles.faqQ}>{item.q}</Text>
              <Text style={styles.faqA}>{item.a}</Text>
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Terms & Privacy">
        <Card>
          <Text style={styles.value}>Review terms, privacy, and risk disclosures.</Text>
          <Button label="View Terms" variant="ghost" />
        </Card>
      </Section>

      <Button label="Logout" variant="danger" onPress={onLogout} />
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
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6
  },
  value: {
    fontSize: 12,
    color: colors.textPrimary,
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    marginBottom: 12
  },
  success: {
    fontSize: 12,
    color: colors.positive,
    marginTop: 8
  },
  faqRow: {
    marginBottom: 12
  },
  faqQ: {
    fontWeight: "600",
    color: colors.textPrimary
  },
  faqA: {
    fontSize: 12,
    color: colors.textSecondary
  }
});
