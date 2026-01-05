import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { Button } from "../components/Button";
import { Section } from "../components/Section";
import { marketSymbols } from "../data/mock";
import { useAppState } from "../state/AppState";
import { useI18n } from "../state/I18n";
import { ChartMock } from "../components/ChartMock";
import { colors } from "../theme/colors";

const categories = ["All", "Forex", "Metals", "Indices", "CFDs"] as const;

export const MarketScreen: React.FC = () => {
  const { alerts, setAlerts, addNotification, setMissionsProgress } = useAppState();
  const { t } = useI18n();
  const [selected, setSelected] = useState<(typeof categories)[number]>("All");
  const [prices, setPrices] = useState(marketSymbols);
  const [timeframe, setTimeframe] = useState("H1");
  const [chartSymbol, setChartSymbol] = useState("XAUUSD");

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((item) => ({
          ...item,
          price: Number((item.price + (Math.random() - 0.5) * 0.05).toFixed(4)),
          change: Number(((Math.random() - 0.5) * 0.8).toFixed(2))
        }))
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    if (selected === "All") return prices;
    return prices.filter((item) => item.category === selected);
  }, [prices, selected]);

  const toggleFavorite = (symbol: string) => {
    setAlerts((prev) => {
      const exists = prev.find((a) => a.symbol === symbol);
      if (exists) {
        return prev.filter((a) => a.symbol !== symbol);
      }
      setMissionsProgress((progress) => ({ ...progress, m5: 100 }));
      return [...prev, { id: `a-${symbol}`, symbol, target: Number((prices[0]?.price || 1).toFixed(4)), enabled: true }];
    });
  };

  const triggerAlert = (symbol: string) => {
    addNotification({
      id: `alert-${Date.now()}`,
      title: t("priceAlertTitle"),
      body: t("priceAlertBody").replace("{symbol}", symbol),
      time: ""
    });
  };

  const categoryLabel = (cat: (typeof categories)[number]) => {
    switch (cat) {
      case "All":
        return t("categoryAll");
      case "Forex":
        return t("categoryForex");
      case "Metals":
        return t("categoryMetals");
      case "Indices":
        return t("categoryIndices");
      case "CFDs":
        return t("categoryCfds");
      default:
        return cat;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t("market")}</Text>
      <Text style={styles.subtitle}>{t("marketSubtitle")}</Text>

      <View style={styles.chips}>
        {categories.map((cat) => (
          <Chip key={cat} label={categoryLabel(cat)} selected={selected === cat} onPress={() => setSelected(cat)} />
        ))}
      </View>

      <Section title={t("symbolChart")}>
        <ChartMock symbol={chartSymbol} timeframe={timeframe} onTimeframeChange={setTimeframe} />
      </Section>

      <Section title={t("priceBoard")}>
        <Card>
          {filtered.map((item) => (
            <View key={item.symbol} style={styles.row}>
              <Pressable style={styles.symbolBlock} onPress={() => setChartSymbol(item.symbol)}>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.category}>{item.category}</Text>
                {chartSymbol === item.symbol ? <Text style={styles.activeTag}>{t("chart")}</Text> : null}
              </Pressable>
              <View>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={[styles.change, item.change >= 0 ? styles.positive : styles.negative]}>
                  {item.change >= 0 ? "+" : ""}
                  {item.change}%
                </Text>
              </View>
              <View style={styles.actions}>
                <Button
                  label={alerts.find((a) => a.symbol === item.symbol) ? "★" : "☆"}
                  variant="ghost"
                  onPress={() => toggleFavorite(item.symbol)}
                />
                <Button label={t("alert")} variant="ghost" onPress={() => triggerAlert(item.symbol)} />
              </View>
            </View>
          ))}
          <Text style={styles.note}>{t("miniChartPlaceholder")}</Text>
        </Card>
      </Section>

      <Section title={t("favorites")}>
        <Card>
          {alerts.length === 0 ? (
            <Text style={styles.empty}>{t("favoritesEmpty")}</Text>
          ) : (
            alerts.map((alert) => (
              <View key={alert.id} style={styles.alertRow}>
                <Text style={styles.symbol}>{alert.symbol}</Text>
                <Text style={styles.category}>
                  {t("target")} {alert.target}
                </Text>
                <Button label={alert.enabled ? t("enabled") : t("disabled")} variant="ghost" />
              </View>
            ))
          )}
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
  chips: {
    flexDirection: "row",
    marginBottom: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8
  },
  symbol: {
    fontWeight: "700",
    color: colors.textPrimary
  },
  category: {
    fontSize: 11,
    color: colors.textSecondary
  },
  price: {
    fontWeight: "700",
    textAlign: "right",
    color: colors.textPrimary
  },
  change: {
    fontSize: 11,
    textAlign: "right"
  },
  positive: {
    color: colors.positive
  },
  negative: {
    color: colors.danger
  },
  actions: {
    flexDirection: "row",
    gap: 6
  },
  symbolBlock: {
    gap: 2
  },
  activeTag: {
    fontSize: 10,
    color: colors.accent
  },
  note: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 8
  },
  empty: {
    fontSize: 12,
    color: colors.textMuted
  },
  alertRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  }
});
