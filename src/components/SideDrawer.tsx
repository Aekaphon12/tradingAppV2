import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export const SideDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  onNavigate: (screen: import("../state/Navigation").ScreenKey) => void;
  onLogout: () => void;
}> = ({ open, onClose, onNavigate, onLogout }) => {
  const translateX = useRef(new Animated.Value(220)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: open ? 0 : 220,
        duration: 240,
        useNativeDriver: true
      }),
      Animated.timing(overlayOpacity, {
        toValue: open ? 1 : 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  }, [open, overlayOpacity, translateX]);

  return (
    <Animated.View pointerEvents={open ? "auto" : "none"} style={[styles.overlay, { opacity: overlayOpacity }]}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Center</Text>
          <View style={styles.profileCard}>
            <View style={styles.profileTop}>
              <View style={styles.profileLeft}>
                <Text style={styles.fisgId}>FISG ID</Text>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.meta}>Premium Tier · KYC verified</Text>
              </View>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
            </View>
            <View style={styles.notifyPill}>
              <Text style={styles.notifyText}>🔔 3 notifications</Text>
            </View>
            <View style={styles.infoList}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Balance</Text>
                <Text style={styles.infoValue}>$1,000.00</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Equity</Text>
                <Text style={styles.infoValue}>$1,000.00</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Points</Text>
                <Text style={styles.infoValue}>1,250</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tier</Text>
                <Text style={styles.infoValueAccent}>Silver</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Streak</Text>
                <Text style={styles.infoValue}>4 🔥</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuSection}>
            <Pressable
              style={styles.item}
              onPress={() => {
                onNavigate("accountCenter");
                onClose();
              }}
            >
              <Text style={styles.itemText}>Account</Text>
            </Pressable>
            <Pressable
              style={styles.item}
              onPress={() => {
                onNavigate("verificationCenter");
                onClose();
              }}
            >
              <Text style={styles.itemText}>Verification</Text>
            </Pressable>
            <Pressable
              style={styles.item}
              onPress={() => {
                onNavigate("securityCenter");
                onClose();
              }}
            >
              <Text style={styles.itemText}>Security</Text>
            </Pressable>
            <Pressable
              style={styles.item}
              onPress={() => {
                onNavigate("billingMethods");
                onClose();
              }}
            >
              <Text style={styles.itemText}>Billing Methods</Text>
            </Pressable>
            <Pressable
              style={styles.item}
              onPress={() => {
                onNavigate("preferences");
                onClose();
              }}
            >
              <Text style={styles.itemText}>Preferences</Text>
            </Pressable>
            <Pressable
              style={styles.item}
              onPress={() => {
                onNavigate("supportCenter");
                onClose();
              }}
            >
              <Text style={styles.itemText}>Support</Text>
            </Pressable>
            <Pressable
              style={styles.item}
              onPress={() => {
                onLogout();
                onClose();
              }}
            >
              <Text style={[styles.itemText, styles.logout]}>Logout</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    zIndex: 40
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 10, 7, 0.65)"
  },
  drawer: {
    width: 220,
    height: "100%",
    backgroundColor: colors.surface,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    paddingTop: 56,
    paddingHorizontal: 18
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16
  },
  profileCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.background,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 }
  },
  profileTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  profileLeft: {
    flex: 1,
    paddingRight: 8
  },
  fisgId: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700"
  },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700"
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.surfaceAlt
  },
  avatarText: {
    color: colors.background,
    fontWeight: "700"
  },
  notifyPill: {
    alignSelf: "flex-start",
    marginTop: 10,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.border
  },
  notifyText: {
    color: colors.textSecondary,
    fontSize: 12
  },
  infoList: {
    marginTop: 14,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 11
  },
  infoValue: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 12
  },
  infoValueAccent: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: 12
  },
  menuSection: {
    marginTop: 16
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  itemText: {
    color: colors.textSecondary,
    fontSize: 14
  },
  logout: {
    color: colors.danger,
    fontWeight: "700"
  }
});
