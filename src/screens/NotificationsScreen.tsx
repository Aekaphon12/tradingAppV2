import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export type NotificationItem = {
  id: string;
  category: "system" | "wallet" | "trading" | "education";
  title: string;
  body: string;
  time: string;
};

const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    category: "system",
    title: "Welcome to FISG Trading Hub",
    body: "Your guided checklist is ready.",
    time: "2h ago"
  },
  {
    id: "n2",
    category: "education",
    title: "New education content",
    body: "Risk management series is live (demo).",
    time: "5h ago"
  },
  {
    id: "n3",
    category: "wallet",
    title: "Deposit status",
    body: "Track approvals and reasons in Wallet.",
    time: "1d ago"
  }
];

export const NotificationsScreen: React.FC<{
  onBack: () => void;
  onOpenDetail: (item: NotificationItem) => void;
}> = ({ onBack, onOpenDetail }) => {
  const { notifications } = useAppState();
  const { t } = useI18n();
  const [filter, setFilter] = useState<"all" | NotificationItem["category"]>("all");

  const combined = useMemo(() => {
    const live = notifications.map((item) => ({
      id: item.id,
      category: "system" as const,
      title: item.title,
      body: item.body,
      time: item.time
    }));
    return [...live, ...mockNotifications];
  }, [notifications]);

  const filtered = filter === "all" ? combined : combined.filter((item) => item.category === filter);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topContent}>
        <Text style={styles.title}>{t("notifications")}</Text>
        <Text style={styles.subtitle}>{t("notificationsSubtitle")}</Text>

        <View style={styles.filterRow}>
          {[
            { key: "all", label: t("all") },
            { key: "system", label: t("system") },
            { key: "wallet", label: t("wallet") },
            { key: "trading", label: t("trading") },
            { key: "education", label: t("education") }
          ].map((item) => (
            <Pressable
              key={item.key}
              onPress={() => setFilter(item.key as typeof filter)}
              style={[styles.filterChip, filter === item.key && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, filter === item.key && styles.filterTextActive]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <Card>
          {filtered.length === 0 ? (
            <Text style={styles.empty}>{t("noNotificationsYet")}</Text>
          ) : (
            filtered.map((note) => (
              <Pressable key={note.id} style={styles.row} onPress={() => onOpenDetail(note)}>
                <View>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text style={styles.noteBody}>{note.body}</Text>
                  <Text style={styles.noteTag}>{t(note.category)}</Text>
                </View>
                <Text style={styles.noteTime}>{note.time}</Text>
              </Pressable>
            ))
          )}
        </Card>
      </View>

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
    paddingBottom: 10,
    flexGrow: 1
  },
  topContent: {
    flex: 1
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
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  filterChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent
  },
  filterText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600"
  },
  filterTextActive: {
    color: colors.background
  },
  empty: {
    color: colors.textMuted,
    fontSize: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  noteTitle: {
    fontWeight: "700",
    color: colors.textPrimary
  },
  noteBody: {
    fontSize: 12,
    color: colors.textSecondary
  },
  noteTag: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4
  },
  noteTime: {
    fontSize: 11,
    color: colors.textMuted
  }
});
