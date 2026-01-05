import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { missions, rewardsCatalog } from "../data/mock";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const RewardsScreen: React.FC = () => {
  const { missionsProgress } = useAppState();
  const { t } = useI18n();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("rewards")}</Text>
      <Text style={styles.subtitle}>{t("rewardsSubtitle")}</Text>

      <Section title={t("pointsWallet")}>
        <Card>
          <Text style={styles.points}>1,240 {t("points")}</Text>
          <Text style={styles.note}>{t("pointsEarnNote")}</Text>
        </Card>
      </Section>

      <Section title={t("missions")}>
        <Card>
          {missions.map((mission) => (
            <View key={mission.id} style={styles.row}>
              <View>
                <Text style={styles.mission}>{mission.title}</Text>
                <Text style={styles.progress}>
                  {t("missionProgress").replace("{progress}", String(missionsProgress[mission.id] || 0))}
                </Text>
              </View>
              <Button label={t("view")} variant="ghost" />
            </View>
          ))}
        </Card>
      </Section>

      <Section title={t("redeemCatalog")}>
        <Card>
          {rewardsCatalog.map((reward) => (
            <View key={reward.id} style={styles.row}>
              <View>
                <Text style={styles.mission}>{reward.title}</Text>
                <Text style={styles.progress}>
                  {reward.cost} {t("points")}
                </Text>
              </View>
              <Button label={t("redeem")} />
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
