import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "./Chip";
import { colors } from "../theme/colors";

type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
};

const timeframes = ["M1", "M5", "M15", "H1", "H4", "D1"] as const;

const symbolMeta: Record<string, string> = {
  XAUUSD: "Spot Gold",
  EURUSD: "Euro vs US Dollar",
  USDJPY: "US Dollar vs Yen",
  GBPUSD: "Pound vs US Dollar"
};

const timeframeStep: Record<string, number> = {
  M1: 0.4,
  M5: 0.7,
  M15: 1.0,
  H1: 1.4,
  H4: 2.2,
  D1: 3.2
};

const seedFrom = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const buildCandles = (symbol: string, tf: string): Candle[] => {
  const seed = seedFrom(`${symbol}-${tf}`);
  let last = 2320 + (seed % 120);
  const step = timeframeStep[tf] ?? 1.2;
  return Array.from({ length: 18 }, (_, idx) => {
    const drift = Math.sin((seed + idx) / 4) * step;
    const open = last;
    const close = open + drift + (idx % 2 === 0 ? step * 0.6 : -step * 0.4);
    const high = Math.max(open, close) + step * 0.8;
    const low = Math.min(open, close) - step * 0.8;
    last = close;
    return {
      open: Number(open.toFixed(2)),
      close: Number(close.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2))
    };
  });
};

export const ChartMock: React.FC<{
  symbol: string;
  timeframe: string;
  onTimeframeChange?: (tf: string) => void;
}> = ({ symbol, timeframe, onTimeframeChange }) => {
  const [candles, setCandles] = useState<Candle[]>(() => buildCandles(symbol, timeframe));

  useEffect(() => {
    setCandles(buildCandles(symbol, timeframe));
  }, [symbol, timeframe]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandles((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        const step = timeframeStep[timeframe] ?? 1.2;
        const drift = (Math.random() - 0.5) * step * 1.4;
        const open = last.close;
        const close = Number((open + drift).toFixed(2));
        const high = Number((Math.max(open, close) + step * 0.8).toFixed(2));
        const low = Number((Math.min(open, close) - step * 0.8).toFixed(2));
        const next = { open, close, high, low };
        const updated = [...prev.slice(1), next];
        return updated;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [timeframe]);

  const { min, max } = useMemo(() => {
    const lows = candles.map((c) => c.low);
    const highs = candles.map((c) => c.high);
    return { min: Math.min(...lows), max: Math.max(...highs) };
  }, [candles]);

  const lastCandle = candles[candles.length - 1];
  const change = lastCandle ? ((lastCandle.close - lastCandle.open) / lastCandle.open) * 100 : 0;
  const chartHeight = 140;

  const scale = (value: number) => {
    if (max === min) return 0;
    return (value - min) / (max - min);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={styles.meta}>
            {symbol} · {symbolMeta[symbol] ?? "Spot"}
          </Text>
          {lastCandle ? (
            <Text style={styles.ohlc}>
              O {lastCandle.open.toFixed(2)}  H {lastCandle.high.toFixed(2)}  L {lastCandle.low.toFixed(2)}  C{" "}
              {lastCandle.close.toFixed(2)}
            </Text>
          ) : null}
        </View>
        <View style={styles.pricePill}>
          <Text style={styles.priceText}>{lastCandle ? lastCandle.close.toFixed(2) : "--"}</Text>
          <Text style={[styles.priceSub, change >= 0 ? styles.positive : styles.negative]}>
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={styles.tfRow}>
        {timeframes.map((tf) => (
          <Chip
            key={tf}
            label={tf}
            selected={timeframe === tf}
            onPress={() => onTimeframeChange?.(tf)}
          />
        ))}
      </View>

      <View style={styles.chartArea}>
        <View style={styles.grid} />
        <View style={styles.candleRow}>
          {candles.map((candle, index) => {
            const isUp = candle.close >= candle.open;
            const high = scale(candle.high);
            const low = scale(candle.low);
            const open = scale(candle.open);
            const close = scale(candle.close);
            const wickTop = (1 - high) * chartHeight;
            const wickBottom = (1 - low) * chartHeight;
            const bodyTop = (1 - Math.max(open, close)) * chartHeight;
            const bodyHeight = Math.max(6, Math.abs(open - close) * chartHeight);
            return (
              <View key={`${symbol}-${index}`} style={styles.candleWrap}>
                <View
                  style={[
                    styles.wick,
                    {
                      top: wickTop,
                      height: wickBottom - wickTop,
                      backgroundColor: isUp ? colors.accent : colors.danger
                    }
                  ]}
                />
                <View
                  style={[
                    styles.body,
                    {
                      top: bodyTop,
                      height: bodyHeight,
                      backgroundColor: isUp ? colors.accent : colors.danger
                    }
                  ]}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 12
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  symbol: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700"
  },
  meta: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2
  },
  ohlc: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 6
  },
  pricePill: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.border
  },
  priceText: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 12
  },
  priceSub: {
    fontSize: 10,
    marginTop: 2
  },
  positive: {
    color: colors.positive
  },
  negative: {
    color: colors.danger
  },
  tfRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10
  },
  chartArea: {
    marginTop: 12,
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    position: "relative",
    backgroundColor: colors.surfaceAlt
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    borderColor: "#17394A",
    borderWidth: 1,
    opacity: 0.4
  },
  candleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: "100%",
    paddingHorizontal: 8,
    gap: 6
  },
  candleWrap: {
    flex: 1,
    height: "100%",
    position: "relative"
  },
  wick: {
    position: "absolute",
    left: "50%",
    width: 2,
    marginLeft: -1,
    borderRadius: 2
  },
  body: {
    position: "absolute",
    left: "20%",
    width: "60%",
    borderRadius: 4
  }
});
