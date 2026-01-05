import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { Section } from "../components/Section";
import { faqItems } from "../data/mock";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";
import type { ScreenKey } from "../state/Navigation";

export const ProfileScreen: React.FC<{
  onLogout: () => void;
  onNavigate: (screen: ScreenKey) => void;
}> = ({ onLogout, onNavigate }) => {
  const { t } = useI18n();
  const { lang, setLang, balance, equity, kycStatus, accountType, leverage, notifications, fontScale, setFontScale } =
    useAppState();
  const [ticketCreated, setTicketCreated] = useState(false);

  const kycLabel = kycStatus.toUpperCase();
  const kycTone =
    kycStatus === "approved" ? colors.positive : kycStatus === "rejected" ? colors.danger : colors.warning;

  const stats = useMemo(
    () => [
      { label: t("balance"), value: `$${balance.toFixed(2)}` },
      { label: t("equity"), value: `$${equity.toFixed(2)}` },
      { label: t("points"), value: "1,250" },
      { label: t("tierLabel"), value: "Silver" },
      { label: t("streak"), value: "4 🔥" },
      { label: t("accountTypeLabel"), value: accountType },
      { label: t("leverage"), value: leverage }
    ],
    [accountType, balance, equity, leverage, t]
  );

  const fontPresets = [
    { label: "A-", value: 0.9 },
    { label: "A", value: 1 },
    { label: "A+", value: 1.1 }
  ];

  const languageOptions = [
    { code: "en", label: "🇬🇧 English" },
    { code: "id", label: "🇮🇩 Indonesia" },
    { code: "ja", label: "🇯🇵 日本語" },
    { code: "ko", label: "🇰🇷 한국어" },
    { code: "ms", label: "🇲🇾 Melayu" },
    { code: "th", label: "🇹🇭 ไทย" },
    { code: "ru", label: "🇷🇺 Русский" },
    { code: "vi", label: "🇻🇳 Tiếng Việt" },
    { code: "zh", label: "🇨🇳 简体中文" },
    { code: "zhHant", label: "🇹🇼 繁體中文" }
  ] as const;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("profileTitle")}</Text>
      <Text style={styles.subtitle}>{t("profileSubtitle")}</Text>

      <Section title={t("centerTitle")}>
        <Card>
          <View style={styles.profileTop}>
            <View style={styles.profileLeft}>
              <Text style={styles.fisgId}>{t("fisgId")}</Text>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.meta}>{t("premiumTierKyc")}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
          </View>

          <View style={styles.notifyPill}>
            <Text style={styles.notifyText}>
              🔔 {t("notificationsCount").replace("{count}", String(notifications.length || 3))}
            </Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>{t("kycStatusLabel")}</Text>
            <Text style={[styles.statusValue, { color: kycTone }]}>{kycLabel}</Text>
          </View>

          <View style={styles.statsList}>
            {stats.map((item) => (
              <View key={item.label} style={styles.statsRow}>
                <Text style={styles.statsLabel}>{item.label}</Text>
                <Text style={styles.statsValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </Card>
      </Section>

      <Section title={t("accountServices")}>
        <Card>
          <View style={styles.menuCard}>
            {[
              { label: t("account"), screen: "accountCenter" },
              { label: t("verificationTitle"), screen: "verificationCenter" },
              { label: t("securityTitle"), screen: "securityCenter" },
              { label: t("billingTitle"), screen: "billingMethods" },
              { label: t("preferencesTitle"), screen: "preferences" },
              { label: t("support"), screen: "supportCenter" }
            ].map((item) => (
              <Pressable key={item.label} style={styles.menuItem} onPress={() => onNavigate(item.screen as ScreenKey)}>
                <Text style={styles.menuText}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </Card>
      </Section>

      <Section title={t("settingsTitle")}>
        <Card>
          <Text style={styles.label}>{t("language")}</Text>
          <View style={styles.row}>
            {languageOptions.map((option) => (
              <Chip
                key={option.code}
                label={option.label}
                selected={lang === option.code}
                onPress={() => setLang(option.code)}
              />
            ))}
          </View>

          <Text style={styles.label}>{t("fontSize")}</Text>
          <View style={styles.row}>
            {fontPresets.map((preset) => (
              <Chip
                key={preset.label}
                label={preset.label}
                selected={fontScale === preset.value}
                onPress={() => setFontScale(preset.value)}
              />
            ))}
          </View>

          <Text style={styles.label}>{t("currency")}</Text>
          <Text style={styles.value}>USD (mock)</Text>
          <Text style={styles.label}>{t("timezone")}</Text>
          <Text style={styles.value}>Asia/Bangkok (mock)</Text>
        </Card>
      </Section>

      <Section title={t("supportTitle")}>
        <Card>
          <Text style={styles.value}>{t("supportCenterSubtitle")}</Text>
          <Button label={t("createTicket")} onPress={() => setTicketCreated(true)} />
          {ticketCreated ? <Text style={styles.success}>{t("ticketCreated")}</Text> : null}
          <Button label={t("openChat")} variant="ghost" />
        </Card>
      </Section>

      <Section title={t("faqTitle")}>
        <Card>
          {faqItems.map((item) => (
            <View key={item.id} style={styles.faqRow}>
              <Text style={styles.faqQ}>{item.q}</Text>
              <Text style={styles.faqA}>{item.a}</Text>
            </View>
          ))}
        </Card>
      </Section>

      <Section title={t("termsTitle")}>
        <Card>
          <Text style={styles.value}>{t("termsMessage")}</Text>
          <Button label={t("viewTerms")} variant="ghost" />
        </Card>
      </Section>

      <Section title={t("legacyTitle")}>
        <Card>
          <Text style={styles.value}>{t("legacyNote1")}</Text>
          <Text style={styles.value}>{t("legacyNote2")}</Text>
        </Card>
      </Section>

      <Button label={t("logout")} variant="danger" onPress={onLogout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 90
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: 12
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
    width: 48,
    height: 48,
    borderRadius: 24,
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
    marginTop: 12,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  notifyText: {
    color: colors.textSecondary,
    fontSize: 12
  },
  statusRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  statusLabel: {
    color: colors.textMuted,
    fontSize: 11
  },
  statusValue: {
    fontSize: 11,
    fontWeight: "700"
  },
  statsList: {
    marginTop: 12,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6
  },
  statsLabel: {
    color: colors.textMuted,
    fontSize: 11
  },
  statsValue: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 12
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6
  },
  value: {
    fontSize: 12,
    color: colors.textPrimary,
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
    flexWrap: "wrap",
    gap: 8
  },
  menuCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: "hidden"
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  menuText: {
    color: colors.textSecondary,
    fontSize: 13
  },
  success: {
    fontSize: 12,
    color: colors.positive,
    marginTop: 8
  },
  faqRow: {
    marginBottom: 12
  },
  faqQ: {
    fontWeight: "600",
    color: colors.textPrimary
  },
  faqA: {
    fontSize: 12,
    color: colors.textSecondary
  }
});
