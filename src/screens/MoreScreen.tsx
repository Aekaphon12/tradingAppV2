import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { colors } from "../theme/colors";

export const MoreScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Legacy / More</Text>
      <Text style={styles.subtitle}>Placeholder for existing features not yet mapped.</Text>
      <Card>
        <Text style={styles.text}>Legacy modules remain accessible in production builds.</Text>
        <Text style={styles.text}>Add links to legacy features here when clarified.</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 18,
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
  text: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6
  }
});
