import React, { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";
import logo from "../assets/logo.png";

export const SplashScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const fisgLetters = useMemo(() => "FISG".split(""), []);
  const groupLetters = useMemo(() => "First Interstellar Group".split(""), []);
  const fisgAnims = useRef(fisgLetters.map(() => new Animated.Value(0))).current;
  const groupAnims = useRef(groupLetters.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const letterAnims = [...fisgAnims, ...groupAnims].map((anim) =>
      Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: true })
    );
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 600, useNativeDriver: true })
      ]),
      Animated.stagger(80, letterAnims),
      Animated.delay(500),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 350, useNativeDriver: true })
    ]).start(onDone);
  }, [fisgAnims, groupAnims, logoOpacity, overlayOpacity, scale, onDone]);

  return (
    <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
      <Animated.Image source={logo} style={[styles.logo, { opacity: logoOpacity, transform: [{ scale }] }]} resizeMode="contain" />
      <View style={styles.wordLine}>
        {fisgLetters.map((char, index) => (
          <Animated.Text key={`f-${index}`} style={[styles.title, { opacity: fisgAnims[index] }]}>
            {char}
          </Animated.Text>
        ))}
      </View>
      <View style={styles.wordLine}>
        {groupLetters.map((char, index) => (
          <Animated.Text key={`g-${index}`} style={[styles.subtitle, { opacity: groupAnims[index] }]}>
            {char}
          </Animated.Text>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 200,
    height: 60
  },
  wordLine: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8
  },
  title: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 6
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2
  }
});
