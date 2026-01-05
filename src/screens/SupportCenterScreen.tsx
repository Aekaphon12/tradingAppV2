import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const SupportCenterScreen: React.FC = () => {
  const [ticketCreated, setTicketCreated] = useState(false);
  const { t } = useI18n();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("supportCenterTitle")}</Text>
      <Text style={styles.subtitle}>{t("supportCenterSubtitle")}</Text>

      <Section title={t("contact")}>
        <Card>
          <Text style={styles.text}>{t("supportCenterSubtitle")}</Text>
          <Button label={t("createTicket")} onPress={() => setTicketCreated(true)} />
          {ticketCreated ? <Text style={styles.success}>{t("ticketCreated")}</Text> : null}
          <Button label={t("openChat")} variant="ghost" />
        </Card>
      </Section>

      <Section title={t("helpCenter")}>
        <Card>
          <Text style={styles.text}>{t("helpCenterMessage")}</Text>
          <Button label={t("openHelpCenter")} variant="ghost" />
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
  },
  text: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10
  },
  success: {
    fontSize: 12,
    color: colors.positive,
    marginTop: 8
  }
});
