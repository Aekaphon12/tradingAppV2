import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { economicCalendar, newsFeed } from "../data/mock";
import { colors } from "../theme/colors";

export const NewsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>News & Calendar</Text>
      <Text style={styles.subtitle}>Market updates and economic events.</Text>

      <Section title="Market News">
        <Card>
          {newsFeed.map((item) => (
            <View key={item.id} style={styles.row}>
              <View>
                <Text style={styles.titleRow}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Button label="Read" variant="ghost" />
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Economic Calendar">
        <Card>
          {economicCalendar.map((event) => (
            <View key={event.id} style={styles.row}>
              <View>
                <Text style={styles.titleRow}>{event.event}</Text>
                <Text style={styles.time}>{event.time}</Text>
              </View>
              <Text style={[styles.impact, event.impact === "High" && styles.impactHigh]}>
                {event.impact}
              </Text>
            </View>
          ))}
          <Text style={styles.note}>High-impact alerts placeholder (Phase 1+).</Text>
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
