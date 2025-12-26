import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { useAppState } from "../state/AppState";

export const LabelValue: React.FC<{ label: string; value: string; tone?: "default" | "positive" | "negative" }> = ({
  label,
  value,
  tone = "default"
}) => {
  const { fontScale } = useAppState();
  const toneStyle = toneStyles[tone];
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { fontSize: 12 * fontScale }]}>{label}</Text>
      <Text style={[styles.value, toneStyle, { fontSize: 13 * fontScale }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12
  },
  value: {
    color: colors.textPrimary,
    fontWeight: "600"
  },
  default: {
    color: colors.textPrimary
  },
  positive: {
    color: colors.positive
  },
  negative: {
    color: colors.danger
  }
});

const toneStyles = {
  default: styles.default,
  positive: styles.positive,
  negative: styles.negative
};
