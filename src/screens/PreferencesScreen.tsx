import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Chip } from "../components/Chip";
import { colors } from "../theme/colors";
import { useAppState } from "../state/AppState";

export const PreferencesScreen: React.FC = () => {
  const { lang, setLang } = useAppState();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Preferences</Text>
      <Text style={styles.subtitle}>Language, currency, and time zone.</Text>

      <Section title="Language">
        <Card>
          <View style={styles.row}>
            <Chip label="EN" selected={lang === "en"} onPress={() => setLang("en")} />
            <Chip label="TH" selected={lang === "th"} onPress={() => setLang("th")} />
            <Chip label="CN" selected={lang === "zh"} onPress={() => setLang("zh")} />
          </View>
        </Card>
      </Section>

      <Section title="Localization">
        <Card>
          <Text style={styles.label}>Currency</Text>
          <Text style={styles.value}>USD (mock)</Text>
          <Text style={styles.label}>Timezone</Text>
          <Text style={styles.value}>Asia/Bangkok (mock)</Text>
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
  row: {
    flexDirection: "row"
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
  }
});
