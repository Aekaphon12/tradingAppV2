import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { Transaction } from "../state/AppState";

export const Timeline: React.FC<{ items: Transaction[] }> = ({ items }) => {
  if (items.length === 0) {
    return <Text style={styles.empty}>No transactions yet.</Text>;
  }

  return (
    <View>
      {items.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.dot} />
          <View style={styles.content}>
            <Text style={styles.title}>
              {item.type === "deposit" ? "Deposit" : "Withdrawal"} · {item.method}
            </Text>
            <Text style={styles.subtitle}>
              {item.time} · {item.status.toUpperCase()}
            </Text>
            {item.reason ? <Text style={styles.reason}>Reason: {item.reason}</Text> : null}
          </View>
          <Text style={styles.amount}>{item.amount.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    color: colors.textMuted,
    fontSize: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginTop: 6,
    marginRight: 10
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary
  },
  reason: {
    fontSize: 12,
    color: colors.danger
  },
  amount: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary
  }
});
