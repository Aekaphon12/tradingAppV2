import React, { useEffect, useMemo, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";
import { useAppState } from "../state/AppState";

export type TabKey =
  | "home"
  | "market"
  | "trade"
  | "wallet"
  | "rewards"
  | "news"
  | "profile";

export const BottomTabs: React.FC<{
  active: TabKey;
  onChange: (tab: TabKey) => void;
}> = ({ active, onChange }) => {
  const { t } = useI18n();
  const { fontScale } = useAppState();
  const labels: Record<TabKey, string> = {
    home: t("home"),
    market: t("market"),
    trade: t("trade"),
    wallet: t("wallet"),
    rewards: t("rewards"),
    news: t("news"),
    profile: t("profile")
  };

  const groups = useMemo(
    () => [
      { key: "home", label: labels.home, options: [] as TabKey[] },
      { key: "trade", label: labels.trade, options: ["market", "trade"] as TabKey[] },
      { key: "wallet", label: labels.wallet, options: ["wallet", "rewards"] as TabKey[] },
      { key: "news", label: labels.news, options: ["news"] as TabKey[] },
      { key: "profile", label: labels.profile, options: [] as TabKey[] }
    ],
    [labels]
  );

  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const dropdownOpacity = useState(new Animated.Value(0))[0];
  const dropdownTranslate = useState(new Animated.Value(8))[0];
  const [tabsWidth, setTabsWidth] = useState(0);
  const [tabLayouts, setTabLayouts] = useState<Record<string, { x: number; width: number }>>({});

  useEffect(() => {
    const isOpen = openGroup !== null;
    Animated.parallel([
      Animated.timing(dropdownOpacity, { toValue: isOpen ? 1 : 0, duration: 180, useNativeDriver: true }),
      Animated.timing(dropdownTranslate, { toValue: isOpen ? 0 : 8, duration: 180, useNativeDriver: true })
    ]).start();
  }, [openGroup, dropdownOpacity, dropdownTranslate]);

  const activeGroup = groups.find((group) => group.options.includes(active))?.key ?? active;
  const currentGroup = groups.find((group) => group.key === openGroup);
  const dropdownWidth = 150;
  const dropdownLeft = currentGroup && tabLayouts[currentGroup.key] && tabsWidth
    ? Math.min(
        Math.max(tabLayouts[currentGroup.key].x + tabLayouts[currentGroup.key].width / 2 - dropdownWidth / 2, 8),
        tabsWidth - dropdownWidth - 8
      )
    : undefined;

  const handleGroupPress = (key: string) => {
    const group = groups.find((item) => item.key === key);
    if (!group) return;
    if (group.options.length === 0) {
      onChange(key as TabKey);
      setOpenGroup(null);
      return;
    }
    setOpenGroup((prev) => (prev === key ? null : key));
  };

  const handleOptionPress = (option: TabKey) => {
    onChange(option);
    setOpenGroup(null);
  };

  return (
    <View style={styles.wrapper}>
      {openGroup ? (
        <Pressable style={styles.dropdownBackdrop} onPress={() => setOpenGroup(null)} />
      ) : null}
      {currentGroup && currentGroup.options.length > 0 ? (
        <Animated.View
          style={[
            styles.dropdown,
            { opacity: dropdownOpacity, transform: [{ translateY: dropdownTranslate }], width: dropdownWidth },
            dropdownLeft !== undefined ? { left: dropdownLeft } : { right: 10 }
          ]}
        >
          {currentGroup.options.map((option) => (
            <Pressable key={option} style={styles.dropdownItem} onPress={() => handleOptionPress(option)}>
              <View style={styles.dropdownRow}>
                <Text style={[styles.dropdownIcon, active === option && styles.dropdownIconActive, { fontSize: 13 * fontScale }]}>
                  {iconMap[option]}
                </Text>
                <Text style={[styles.dropdownText, active === option && styles.dropdownTextActive, { fontSize: 12 * fontScale }]}>
                  {labels[option]}
                </Text>
              </View>
            </Pressable>
          ))}
        </Animated.View>
      ) : null}
      <View
        style={styles.tabs}
        onLayout={(event) => {
          setTabsWidth(event.nativeEvent.layout.width);
        }}
      >
        {groups.map((group) => {
          const isActive = activeGroup === group.key;
          const icon = iconMap[group.key as TabKey];
          return (
            <Pressable
              key={group.key}
              onPress={() => handleGroupPress(group.key)}
              style={styles.tab}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                setTabLayouts((prev) => ({ ...prev, [group.key]: { x, width } }));
              }}
            >
              <View style={[styles.tabPill, isActive && styles.tabPillActive]}>
                <Text style={[styles.icon, isActive && styles.iconActive, { fontSize: 14 * fontScale }]}>{icon}</Text>
                <Text style={[styles.label, isActive && styles.labelActive, { fontSize: 10 * fontScale }]}>{group.label}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative"
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "transparent"
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4
  },
  tabPill: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B1E18",
    shadowColor: "#020807",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 }
  },
  tabPillActive: {
    backgroundColor: "#0E2C22",
    borderColor: colors.accent
  },
  icon: {
    fontSize: 14,
    marginBottom: 2,
    color: "#76F5C7"
  },
  iconActive: {
    color: "#4BFFC2"
  },
  label: {
    fontSize: 10,
    color: colors.textMuted
  },
  labelActive: {
    color: colors.accent,
    fontWeight: "700"
  },
  dropdownBackdrop: {
    ...StyleSheet.absoluteFillObject,
    bottom: 52,
    zIndex: 10
  },
  dropdown: {
    position: "absolute",
    bottom: 62,
    backgroundColor: "#0E2C22",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    zIndex: 11,
    minWidth: 140,
    shadowColor: "#020807",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 }
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center"
  },
  dropdownRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  dropdownIcon: {
    fontSize: 13,
    color: "#76F5C7"
  },
  dropdownIconActive: {
    color: "#4BFFC2"
  },
  dropdownText: {
    color: colors.textSecondary,
    fontSize: 12
  },
  dropdownTextActive: {
    color: colors.accent,
    fontWeight: "700"
  }
});

const iconMap: Record<TabKey, string> = {
  home: "🏠",
  market: "📊",
  trade: "📈",
  wallet: "💳",
  rewards: "🎁",
  news: "📰",
  profile: "👤"
};
