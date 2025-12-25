import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export const Section: React.FC<{ title: string; children: React.ReactNode; right?: React.ReactNode }> = ({
  title,
  children,
  right
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {right}
      </View>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 18
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary
  }
});
