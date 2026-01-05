import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { LabelValue } from "../components/LabelValue";
import { Button } from "../components/Button";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const AccountCenterScreen: React.FC = () => {
  const { t } = useI18n();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("account")}</Text>
      <Text style={styles.subtitle}>{t("accountCenterSubtitle")}</Text>

      <Section title={t("profile")}>
        <Card>
          <LabelValue label={t("nameLabel")} value="John Doe" />
          <LabelValue label={t("fisgId")} value="FISG-20831" />
          <LabelValue label={t("tierLabel")} value="Silver" tone="positive" />
          <Button label={t("editProfile")} variant="ghost" />
        </Card>
      </Section>

      <Section title={t("accountSummary")}>
        <Card>
          <LabelValue label={t("balance")} value="$1,000.00" />
          <LabelValue label={t("equity")} value="$1,000.00" />
          <LabelValue label={t("margin")} value="$120.00" />
          <LabelValue label={t("freeMargin")} value="$880.00" />
        </Card>
      </Section>
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
  }
});
