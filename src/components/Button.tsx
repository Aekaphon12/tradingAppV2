import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "../theme/colors";
import { useAppState } from "../state/AppState";

export const Button: React.FC<{
  label: string;
  onPress?: () => void;
  variant?: "primary" | "ghost" | "danger";
  disabled?: boolean;
  style?: ViewStyle;
}> = ({ label, onPress, variant = "primary", disabled, style }) => {
  const { fontScale } = useAppState();
  const variantStyle = variantStyles[variant];
  const textStyle = textStyles[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style
      ]}
    >
      <Text style={[styles.text, textStyle, { fontSize: 14 * fontScale }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  primary: {
    backgroundColor: colors.accent
  },
  ghost: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border
  },
  danger: {
    backgroundColor: colors.danger
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary
  },
  text_primary: {
    color: colors.background
  },
  text_ghost: {
    color: colors.textPrimary
  },
  text_danger: {
    color: colors.textPrimary
  },
  pressed: {
    opacity: 0.85
  },
  disabled: {
    opacity: 0.5
  }
});

const variantStyles = {
  primary: styles.primary,
  ghost: styles.ghost,
  danger: styles.danger
};

const textStyles = {
  primary: styles.text_primary,
  ghost: styles.text_ghost,
  danger: styles.text_danger
};
