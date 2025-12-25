import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { Input } from "../components/Input";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";
import logo from "../assets/logo.png";

export const AuthScreen: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
  const { t } = useI18n();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.centerWrap}>
        <Image source={logo} style={styles.logoTop} resizeMode="contain" />
        <View style={styles.tabs}>
          <Text onPress={() => setMode("login")} style={[styles.tab, mode === "login" && styles.tabActive]}>
            {t("login")}
          </Text>
          <Text onPress={() => setMode("register")} style={[styles.tab, mode === "register" && styles.tabActive]}>
            {t("register")}
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>{mode === "login" ? t("login") : mode === "register" ? t("register") : t("forgotPassword")}</Text>
          <View style={styles.field}>
            <Text style={styles.label}>{t("email")}</Text>
            <Input value={email} onChangeText={setEmail} placeholder="you@email.com" keyboardType="email-address" />
          </View>
          {mode !== "forgot" ? (
            <View style={styles.field}>
              <Text style={styles.label}>{t("password")}</Text>
              <Input value={password} onChangeText={setPassword} placeholder="••••••" />
            </View>
          ) : null}
          <Button
            label={mode === "login" ? t("login") : mode === "register" ? t("register") : t("submit")}
            onPress={onAuth}
          />
          {mode !== "forgot" ? (
            <Button label={t("forgotPassword")} variant="ghost" onPress={() => setMode("forgot")} />
          ) : (
            <Button label="Back to login" variant="ghost" onPress={() => setMode("login")} />
          )}
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Onboarding Checklist</Text>
          <Text style={styles.infoBody}>Register → KYC → Open Account → Deposit → Trade</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 24,
    flexGrow: 1,
    justifyContent: "center"
  },
  centerWrap: {
    width: "100%",
    alignItems: "center"
  },
  logoTop: {
    width: 160,
    height: 44,
    marginBottom: 18
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    marginBottom: 18
  },
  tab: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "700",
    color: colors.textMuted
  },
  tabActive: {
    backgroundColor: colors.accent,
    color: colors.background
  },
  card: {
    width: "100%"
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 12,
    color: colors.textPrimary
  },
  field: {
    marginBottom: 12
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6
  },
  infoCard: {
    marginTop: 16
  },
  infoTitle: {
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4
  },
  infoBody: {
    color: colors.textSecondary,
    fontSize: 12
  }
});
