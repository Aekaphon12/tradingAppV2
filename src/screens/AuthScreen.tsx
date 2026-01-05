import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
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
          <Pressable
            onPress={() => setMode("login")}
            style={[styles.tabButton, mode === "login" && styles.tabActive]}
          >
            <Text style={[styles.tabText, mode === "login" && styles.tabTextActive]}>{t("login")}</Text>
          </Pressable>
          <Pressable
            onPress={() => setMode("register")}
            style={[styles.tabButton, mode === "register" && styles.tabActive]}
          >
            <Text style={[styles.tabText, mode === "register" && styles.tabTextActive]}>{t("register")}</Text>
          </Pressable>
        </View>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>{mode === "login" ? t("login") : mode === "register" ? t("register") : t("forgotPassword")}</Text>
          <View style={styles.field}>
            <Text style={styles.label}>{t("email")}</Text>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder={t("emailPlaceholder")}
              keyboardType="email-address"
            />
          </View>
          {mode !== "forgot" ? (
            <View style={styles.field}>
              <Text style={styles.label}>{t("password")}</Text>
              <Input value={password} onChangeText={setPassword} placeholder={t("passwordPlaceholder")} />
            </View>
          ) : null}
          <Button
            label={mode === "login" ? t("login") : mode === "register" ? t("register") : t("submit")}
            onPress={onAuth}
          />
          {mode !== "forgot" ? (
            <Button label={t("forgotPassword")} variant="ghost" onPress={() => setMode("forgot")} />
          ) : (
            <Button label={t("backToLogin")} variant="ghost" onPress={() => setMode("login")} />
          )}
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>{t("onboardingChecklistTitle")}</Text>
          <Text style={styles.infoBody}>{t("onboardingChecklistFlow")}</Text>
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
    marginBottom: 18,
    width: "100%",
    maxWidth: 320
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
    textAlign: "center",
    width: "100%",
    lineHeight: 16
  },
  tabActive: {
    backgroundColor: colors.accent,
    color: colors.background
  },
  tabTextActive: {
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
