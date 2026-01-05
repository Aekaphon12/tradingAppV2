import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";
import logo from "../assets/logo.png";

export const HEADER_HEIGHT = 72;

export const AppHeader: React.FC<{
  onMenu: () => void;
  onNotifications: () => void;
  onSearch: () => void;
}> = ({ onMenu, onNotifications, onSearch }) => {
  const { notifications } = useAppState();
  const { t } = useI18n();
  const badgeCount = notifications.length;

  return (
    <View style={styles.wrap}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Pressable style={styles.searchWrap} onPress={onSearch}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder={t("searchPlaceholder")}
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
          onFocus={onSearch}
        />
      </Pressable>
      <View style={styles.actions}>
        <Pressable onPress={onNotifications} style={styles.iconButton}>
          <Text style={styles.iconText}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        </Pressable>
        <Pressable onPress={onMenu} style={styles.menuButton}>
          <Text style={styles.menuIcon}>≡</Text>
        </Pressable>
      </View>
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
    width: 132,
    height: 36
  },
  searchWrap: {
    flex: 1,
    marginHorizontal: 10,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10
  },
  searchIcon: {
    marginRight: 6,
    color: colors.textMuted
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 12
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border
  },
  iconText: {
    color: colors.textPrimary,
    fontSize: 16
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: 9,
    fontWeight: "700"
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
