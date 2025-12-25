import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
import { Chip } from "./Chip";
import { useAppState } from "../state/AppState";
import { colors } from "../theme/colors";

export const DevPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    kycStatus,
    setKycStatus,
    kycRejectReason,
    setKycRejectReason,
    depositStatus,
    setDepositStatus,
    depositReason,
    setDepositReason,
    withdrawalStatus,
    setWithdrawalStatus,
    withdrawalReason,
    setWithdrawalReason,
    positions,
    setPositions,
    alerts,
    setAlerts,
    addNotification
  } = useAppState();

  const togglePositions = () => {
    if (positions.length > 0) {
      setPositions([]);
      return;
    }
    setPositions([
      { id: "p1", symbol: "EURUSD", side: "buy", volume: 0.2, openPrice: 1.085, pl: 14.2 },
      { id: "p2", symbol: "XAUUSD", side: "sell", volume: 0.1, openPrice: 2035, pl: -5.4 }
    ]);
  };

  const toggleAlert = () => {
    if (alerts.length > 0) {
      setAlerts([]);
      return;
    }
    setAlerts([{ id: "a1", symbol: "EURUSD", target: 1.09, enabled: true }]);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.panel}>
        <View style={styles.header}>
          <Text style={styles.title}>Dev Panel</Text>
          <Button label="Close" variant="ghost" onPress={onClose} />
        </View>
        <ScrollView>
          <Text style={styles.sectionTitle}>KYC Status</Text>
          <View style={styles.row}>
            {(["unverified", "pending", "approved", "rejected"] as const).map((status) => (
              <Chip key={status} label={status} selected={kycStatus === status} onPress={() => setKycStatus(status)} />
            ))}
          </View>
          <Text style={styles.label}>Rejection Reason</Text>
          <View style={styles.row}>
            {["Document unclear", "Expired ID", "Mismatch"].map((reason) => (
              <Chip key={reason} label={reason} selected={kycRejectReason === reason} onPress={() => setKycRejectReason(reason)} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Deposit Status</Text>
          <View style={styles.row}>
            {(["pending", "approved", "rejected"] as const).map((status) => (
              <Chip key={status} label={status} selected={depositStatus === status} onPress={() => setDepositStatus(status)} />
            ))}
          </View>
          <Text style={styles.label}>Failure Reason</Text>
          <View style={styles.row}>
            {["Bank verification pending", "Insufficient funds", "Method blocked"].map((reason) => (
              <Chip key={reason} label={reason} selected={depositReason === reason} onPress={() => setDepositReason(reason)} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Withdrawal Status</Text>
          <View style={styles.row}>
            {(["pending", "approved", "rejected"] as const).map((status) => (
              <Chip key={status} label={status} selected={withdrawalStatus === status} onPress={() => setWithdrawalStatus(status)} />
            ))}
          </View>
          <Text style={styles.label}>Failure Reason</Text>
          <View style={styles.row}>
            {["KYC required", "Compliance check", "Limit exceeded"].map((reason) => (
              <Chip key={reason} label={reason} selected={withdrawalReason === reason} onPress={() => setWithdrawalReason(reason)} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Trading & Alerts</Text>
          <Button label={positions.length > 0 ? "Clear Positions" : "Add Positions"} onPress={togglePositions} />
          <View style={{ height: 8 }} />
          <Button label={alerts.length > 0 ? "Disable Alert" : "Enable Alert"} onPress={toggleAlert} />
          <View style={{ height: 8 }} />
          <Button
            label="Trigger Notification"
            variant="ghost"
            onPress={() =>
              addNotification({
                id: `n-${Date.now()}`,
                title: "Alert Triggered",
                body: "EURUSD reached 1.09",
                time: ""
              })
            }
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(2, 10, 7, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30
  },
  panel: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "700",
    color: colors.textPrimary
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6
  }
});
