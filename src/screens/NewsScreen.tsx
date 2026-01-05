import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { economicCalendar, newsFeed } from "../data/mock";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const NewsScreen: React.FC = () => {
  const { t } = useI18n();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("newsCalendarTitle")}</Text>
      <Text style={styles.subtitle}>{t("newsCalendarSubtitle")}</Text>

      <Section title={t("marketNews")}>
        <Card>
          {newsFeed.map((item) => (
            <View key={item.id} style={styles.row}>
              <View>
                <Text style={styles.titleRow}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Button label={t("read")} variant="ghost" />
            </View>
          ))}
        </Card>
      </Section>

      <Section title={t("economicCalendar")}>
        <Card>
          {economicCalendar.map((event) => (
            <View key={event.id} style={styles.row}>
              <View>
                <Text style={styles.titleRow}>{event.event}</Text>
                <Text style={styles.time}>{event.time}</Text>
              </View>
              <Text style={[styles.impact, event.impact === "High" && styles.impactHigh]}>
                {event.impact === "High" ? t("highImpact") : event.impact}
              </Text>
            </View>
          ))}
          <Text style={styles.note}>{t("highImpactNote")}</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8
  },
  titleRow: {
    fontWeight: "600",
    color: colors.textPrimary
  },
  time: {
    fontSize: 11,
    color: colors.textSecondary
  },
  impact: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted
  },
  impactHigh: {
    color: colors.danger
  },
  note: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 8
  }
});
