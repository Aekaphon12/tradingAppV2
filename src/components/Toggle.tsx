import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export const Toggle: React.FC<{ left: string; right: string; value: boolean; onChange: (value: boolean) => void }> = ({
  left,
  right,
  value,
  onChange
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onChange(false)} style={[styles.option, !value && styles.active]}>
        <Text style={[styles.text, !value && styles.textActive]}>{left}</Text>
      </Pressable>
      <Pressable onPress={() => onChange(true)} style={[styles.option, value && styles.active]}>
        <Text style={[styles.text, value && styles.textActive]}>{right}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    padding: 4
  },
  option: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center"
  },
  active: {
    backgroundColor: colors.accent
  },
  text: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600"
  },
  textActive: {
    color: colors.background
  }
});
