import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { useAppState } from "../state/AppState";

export const ChecklistItem: React.FC<{
  title: string;
  subtitle: string;
  completed?: boolean;
  onPress?: () => void;
}> = ({ title, subtitle, completed, onPress }) => {
  const { fontScale } = useAppState();
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={[styles.dot, completed && styles.dotComplete]} />
      <View style={styles.textWrap}>
        <Text style={[styles.title, { fontSize: 14 * fontScale }]}>{title}</Text>
        <Text style={[styles.subtitle, { fontSize: 12 * fontScale }]}>{subtitle}</Text>
      </View>
      <Text style={[styles.badge, completed ? styles.badgeComplete : styles.badgeTodo]}>
        {completed ? "Done" : "Next"}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    marginRight: 10
  },
  dotComplete: {
    backgroundColor: colors.accent
  },
  textWrap: {
    flex: 1
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary
  },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: "hidden"
  },
  badgeComplete: {
    backgroundColor: colors.surfaceAlt,
    color: colors.accent
  },
  badgeTodo: {
    backgroundColor: colors.surface,
    color: colors.textSecondary
  }
});
