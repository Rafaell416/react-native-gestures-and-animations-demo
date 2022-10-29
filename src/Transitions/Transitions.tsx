import React, { useState } from "react";
import { StyleSheet, View, Switch, Text } from "react-native";
import { useSpring, useTiming } from "react-native-redash";

import { Button, StyleGuide, cards } from "../components";

import { AnimatedCard } from "./AnimatedCard";

export const Transitions = () => {
  const [switched, setSwitch] = useState(false);
  const [toggled, setToggle] = useState(false);
  const transition = useSpring(toggled);

  const toggleSwitch = () => {
    setSwitch(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <View style={styles.switchContainer}>
        <Text style={styles.text}>useSpring</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={switched}
        />
        <Text style={styles.text}>useTiming</Text>
      </View>
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
  switchContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: StyleGuide.spacing * 4,
    flexDirection: "row",
  },
  text: {
    ...StyleGuide.typography.callout,
    marginHorizontal: StyleGuide.spacing
  }
});
