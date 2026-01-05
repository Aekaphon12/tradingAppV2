import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { LabelValue } from "../components/LabelValue";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const BillingMethodsScreen: React.FC = () => {
  const { t } = useI18n();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("billingTitle")}</Text>
      <Text style={styles.subtitle}>{t("billingSubtitle")}</Text>

      <Section title={t("savedMethods")}>
        <Card>
          <LabelValue label={t("bankTransfer")} value={t("active")} />
          <LabelValue label={t("creditCard")} value={t("notLinked")} />
          <Button label={t("addMethod")} />
        </Card>
      </Section>

      <Section title={t("withdrawalDestinations")}>
        <Card>
          <LabelValue label={t("primaryAccount")} value="USD - 4821" />
          <Button label={t("addDestination")} variant="ghost" />
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
