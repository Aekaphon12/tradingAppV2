import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "../theme/colors";

export const Chip: React.FC<{
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}> = ({ label, selected, onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : styles.unselected,
        pressed ? styles.pressed : null,
        style
      ]}
    >
      <Text style={[styles.text, selected ? styles.textSelected : styles.textUnselected]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8
  },
  selected: {
    backgroundColor: colors.accentDark
  },
  unselected: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border
  },
  text: {
    fontSize: 12,
    fontWeight: "600"
  },
  textSelected: {
    color: colors.textPrimary
  },
  textUnselected: {
    color: colors.textSecondary
  },
  pressed: {
    opacity: 0.8
  }
});
