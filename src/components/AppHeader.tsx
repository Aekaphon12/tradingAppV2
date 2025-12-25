import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import logo from "../assets/logo.png";

export const HEADER_HEIGHT = 72;

export const AppHeader: React.FC<{ onMenu: () => void }> = ({ onMenu }) => {
  return (
    <View style={styles.wrap}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Pressable onPress={onMenu} style={styles.menuButton}>
        <Text style={styles.menuIcon}>≡</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: HEADER_HEIGHT,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  logo: {
    width: 160,
    height: 42
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border
  },
  menuIcon: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2
  }
});
