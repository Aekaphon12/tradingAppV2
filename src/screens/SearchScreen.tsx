import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";
import type { ScreenKey } from "../state/Navigation";

type SearchItem = {
  id: string;
  type: "market" | "news" | "education";
  title: string;
  subtitle: string;
};

const mockResults: SearchItem[] = [
  { id: "s1", type: "market", title: "EURUSD", subtitle: "Forex · Price board" },
  { id: "s2", type: "market", title: "XAUUSD", subtitle: "Metals · Price board" },
  { id: "s3", type: "news", title: "Fed minutes released", subtitle: "Market News" },
  { id: "s4", type: "education", title: "Risk management basics", subtitle: "Education" }
];

export const SearchScreen: React.FC<{ onBack: () => void; onNavigate: (screen: ScreenKey) => void }> = ({
  onBack,
  onNavigate
}) => {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return mockResults;
    const q = query.toLowerCase();
    return mockResults.filter((item) => item.title.toLowerCase().includes(q));
  }, [query]);

  const goTo = (item: SearchItem) => {
    if (item.type === "market") onNavigate("market");
    if (item.type === "news") onNavigate("news");
    if (item.type === "education") onNavigate("rewards");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("searchTitle")}</Text>
      <Text style={styles.subtitle}>{t("searchSubtitle")}</Text>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder={t("searchPlaceholder")}
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <SectionCard title={t("searchResults")}>
        {results.length === 0 ? (
          <Text style={styles.empty}>{t("noResults")}</Text>
        ) : (
          results.map((item) => (
            <Pressable key={item.id} style={styles.resultRow} onPress={() => goTo(item)}>
              <View>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
              </View>
              <Button label={t("open")} variant="ghost" />
            </Pressable>
          ))
        )}
      </SectionCard>

      <Button label={t("back")} variant="ghost" onPress={onBack} />
    </ScrollView>
  );
};

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Card>{children}</Card>
  </View>
);

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
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13
  },
  section: {
    marginBottom: 16
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontWeight: "700",
    marginBottom: 8
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  resultTitle: {
    fontWeight: "700",
    color: colors.textPrimary
  },
  resultSubtitle: {
    fontSize: 12,
    color: colors.textSecondary
  },
  empty: {
    fontSize: 12,
    color: colors.textMuted
  }
});
