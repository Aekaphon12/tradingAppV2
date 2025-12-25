import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export const Toast: React.FC<{ title: string; body: string }> = ({ title, body }) => {
  return (
    <View style={styles.toast}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: colors.surfaceAlt,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 20
  },
  title: {
    color: colors.accent,
    fontWeight: "700",
    marginBottom: 4
  },
  body: {
    color: colors.textSecondary,
    fontSize: 12
  }
});
