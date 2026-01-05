import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";
import type { NotificationItem } from "./NotificationsScreen";

export const NotificationDetailScreen: React.FC<{
  onBack: () => void;
  item?: NotificationItem | null;
}> = ({ onBack, item }) => {
  const { t } = useI18n();
  const detail = item ?? {
    id: "fallback",
    category: "system" as const,
    title: t("notifications"),
    body: t("noNotificationsYet"),
    time: ""
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("notificationDetailTitle")}</Text>
      <Text style={styles.subtitle}>{t("notificationDetailSubtitle")}</Text>

      <Card>
        <View style={styles.row}>
          <Text style={styles.label}>{t("type")}</Text>
          <Text style={styles.value}>{t(detail.category)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t("title")}</Text>
          <Text style={styles.value}>{detail.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t("message")}</Text>
          <Text style={styles.value}>{detail.body}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t("time")}</Text>
          <Text style={styles.value}>{detail.time}</Text>
        </View>
      </Card>

      <Button label={t("back")} variant="ghost" onPress={onBack} />
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
    marginBottom: 10
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary
  },
  value: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
    marginLeft: 12
  }
});
