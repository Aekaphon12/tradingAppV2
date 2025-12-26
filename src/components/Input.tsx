import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../theme/colors";
import { useAppState } from "../state/AppState";

export const Input: React.FC<{
  value: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
}> = ({ value, onChangeText, placeholder, keyboardType = "default" }) => {
  const { fontScale } = useAppState();
  return (
    <View style={styles.wrap}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        style={[styles.input, { fontSize: 14 * fontScale }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  input: {
    height: 36,
    color: colors.textPrimary,
    fontSize: 14
  }
});
