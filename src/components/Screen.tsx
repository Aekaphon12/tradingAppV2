import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export const Screen: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children
}) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 120
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4
  },
  content: {
    marginTop: 16
  }
});
