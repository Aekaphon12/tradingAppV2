import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { missions, rewardsCatalog } from "../data/mock";
import { useAppState } from "../state/AppState";
import { colors } from "../theme/colors";

export const RewardsScreen: React.FC = () => {
  const { missionsProgress } = useAppState();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Rewards</Text>
      <Text style={styles.subtitle}>Missions, points, and redemption.</Text>

      <Section title="Points Wallet">
        <Card>
          <Text style={styles.points}>1,240 pts</Text>
          <Text style={styles.note}>Earn points by completing missions.</Text>
        </Card>
      </Section>

      <Section title="Missions">
        <Card>
          {missions.map((mission) => (
            <View key={mission.id} style={styles.row}>
              <View>
                <Text style={styles.mission}>{mission.title}</Text>
                <Text style={styles.progress}>{missionsProgress[mission.id] || 0}% complete</Text>
              </View>
              <Button label="View" variant="ghost" />
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Redeem Catalog">
        <Card>
          {rewardsCatalog.map((reward) => (
            <View key={reward.id} style={styles.row}>
              <View>
                <Text style={styles.mission}>{reward.title}</Text>
                <Text style={styles.progress}>{reward.cost} pts</Text>
              </View>
              <Button label="Redeem" />
            </View>
          ))}
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
  points: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.accent
  },
  note: {
    fontSize: 12,
    color: colors.textSecondary
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  mission: {
    fontWeight: "600",
    color: colors.textPrimary
  },
  progress: {
    fontSize: 12,
    color: colors.textSecondary
  }
});
