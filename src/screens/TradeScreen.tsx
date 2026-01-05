import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Input } from "../components/Input";
import { ChartMock } from "../components/ChartMock";
import { Section } from "../components/Section";
import { LabelValue } from "../components/LabelValue";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";
import { colors } from "../theme/colors";

export const TradeScreen: React.FC = () => {
  const { positions, setPositions, balance, setBalance, equity, setEquity, addNotification, setMissionsProgress } =
    useAppState();
  const { t } = useI18n();
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [symbol, setSymbol] = useState("EURUSD");
  const [volume, setVolume] = useState("0.1");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");
  const [closeTarget, setCloseTarget] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState("H1");

  const placeOrder = () => {
    // analytics: track("trade_place_order")
    const vol = Number(volume) || 0;
    const openPrice = 1.085;
    setPositions((prev) => [
      {
        id: `pos-${Date.now()}`,
        symbol,
        side,
        volume: vol,
        openPrice,
        pl: 0
      },
      ...prev
    ]);
    setBalance((prev) => prev - vol * 10);
    setEquity((prev) => prev - vol * 5);
    addNotification({
      id: `trade-${Date.now()}`,
      title: t("tradeOpenedTitle"),
      body: t("tradeOpenedBody")
        .replace("{symbol}", symbol)
        .replace("{side}", side.toUpperCase())
        .replace("{lots}", String(vol)),
      time: ""
    });
    setMissionsProgress((prev) => ({ ...prev, m4: 100 }));
  };

  const closePosition = (id: string) => {
    // analytics: track("trade_close_order")
    const position = positions.find((p) => p.id === id);
    if (!position) return;
    setPositions((prev) => prev.filter((p) => p.id !== id));
    setBalance((prev) => prev + position.volume * 12);
    setEquity((prev) => prev + position.volume * 8);
    addNotification({
      id: `close-${Date.now()}`,
      title: t("tradeClosedTitle"),
      body: t("tradeClosedBody").replace("{symbol}", position.symbol),
      time: ""
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("lightTrading")}</Text>
      <Text style={styles.subtitle}>{t("lightTradingSubtitle")}</Text>

      <Section title={t("chart")}>
        <ChartMock symbol={symbol} timeframe={timeframe} onTimeframeChange={setTimeframe} />
      </Section>

      <Section title={t("orderTicket")}>
        <Card>
          <View style={styles.row}>
            <Chip label={t("buy")} selected={side === "buy"} onPress={() => setSide("buy")} />
            <Chip label={t("sell")} selected={side === "sell"} onPress={() => setSide("sell")} />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t("symbol")}</Text>
            <Input value={symbol} onChangeText={setSymbol} />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t("volume")}</Text>
            <Input value={volume} onChangeText={setVolume} keyboardType="numeric" />
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>{t("sl")}</Text>
              <Input value={sl} onChangeText={setSl} keyboardType="numeric" />
            </View>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>{t("tp")}</Text>
              <Input value={tp} onChangeText={setTp} keyboardType="numeric" />
            </View>
          </View>
          <Button label={t("placeMarketOrder")} onPress={placeOrder} />
          <Button label={t("openInMt")} variant="ghost" />
        </Card>
      </Section>

      <Section title={t("accountSummary")}>
        <Card>
          <LabelValue label={t("balance")} value={`$${balance.toFixed(2)}`} />
          <LabelValue label={t("equity")} value={`$${equity.toFixed(2)}`} />
        </Card>
      </Section>

      <Section title={t("openPositions")}>
        <Card>
          {positions.length === 0 ? (
            <Text style={styles.empty}>{t("noOpenPositions")}</Text>
          ) : (
            positions.map((pos) => (
              <View key={pos.id} style={styles.position}>
                <View>
                  <Text style={styles.symbol}>{pos.symbol}</Text>
                  <Text style={styles.meta}>
                    {pos.side.toUpperCase()} · {pos.volume} lots
                  </Text>
                </View>
                <View>
                <Text style={styles.meta}>
                  {t("pl")} {pos.pl}
                </Text>
                <Button label={t("close")} variant="ghost" onPress={() => setCloseTarget(pos.id)} />
                </View>
              </View>
            ))
          )}
        </Card>
      </Section>
      </ScrollView>
      <ConfirmDialog
        visible={closeTarget !== null}
        title={t("confirmCloseTitle")}
        message={t("confirmCloseMessage")}
        confirmLabel={t("confirm")}
        cancelLabel={t("cancel")}
        onConfirm={() => {
          if (closeTarget) {
            closePosition(closeTarget);
          }
          setCloseTarget(null);
        }}
        onCancel={() => setCloseTarget(null)}
      />
    </View>
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
  row: {
    flexDirection: "row",
    marginBottom: 10
  },
  field: {
    marginBottom: 10
  },
  fieldRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10
  },
  fieldHalf: {
    flex: 1
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6
  },
  empty: {
    color: colors.textMuted,
    fontSize: 12
  },
  position: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  symbol: {
    fontWeight: "700",
    color: colors.textPrimary
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary
  }
});
