import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useAppState } from "../state/AppState";
import { colors } from "../theme/colors";

export const NotificationsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { notifications } = useAppState();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Deposit status, price alerts, critical events.</Text>

      <Card>
        {notifications.length === 0 ? (
          <Text style={styles.empty}>No notifications yet.</Text>
        ) : (
          notifications.map((note) => (
            <View key={note.id} style={styles.row}>
              <View>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteBody}>{note.body}</Text>
              </View>
              <Text style={styles.noteTime}>{note.time}</Text>
            </View>
          ))
        )}
      </Card>

      <Button label="Back" variant="ghost" onPress={onBack} />
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
  noteTime: {
    fontSize: 11,
    color: colors.textMuted
  }
});
