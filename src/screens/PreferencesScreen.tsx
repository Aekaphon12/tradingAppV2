import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Chip } from "../components/Chip";
import { colors } from "../theme/colors";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";

export const PreferencesScreen: React.FC = () => {
  const { lang, setLang, fontScale, setFontScale } = useAppState();
  const { t } = useI18n();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("preferencesTitle")}</Text>
      <Text style={styles.subtitle}>{t("preferencesSubtitle")}</Text>

      <Section title={t("language")}>
        <Card>
          <View style={styles.row}>
            <Chip label="EN" selected={lang === "en"} onPress={() => setLang("en")} />
            <Chip label="TH" selected={lang === "th"} onPress={() => setLang("th")} />
            <Chip label="CN" selected={lang === "zh"} onPress={() => setLang("zh")} />
          </View>
        </Card>
      </Section>

      <Section title={t("fontSize")}>
        <Card>
          <View style={styles.row}>
            <Chip
              label="A-"
              selected={false}
              onPress={() => setFontScale((prev) => Math.max(0.9, Number((prev - 0.1).toFixed(1))))}
            />
            <Chip
              label="A+"
              selected={false}
              onPress={() => setFontScale((prev) => Math.min(1.3, Number((prev + 0.1).toFixed(1))))}
            />
            <Text style={styles.value}>{t("scaleLabel").replace("{scale}", fontScale.toFixed(1))}</Text>
          </View>
        </Card>
      </Section>

      <Section title={t("localization")}>
        <Card>
          <Text style={styles.label}>{t("currency")}</Text>
          <Text style={styles.value}>USD (mock)</Text>
          <Text style={styles.label}>{t("timezone")}</Text>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
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
