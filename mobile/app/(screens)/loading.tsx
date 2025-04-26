import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  interpolate,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type LoadingIcon = "food-steak" | "chef-outline" | "silverware-fork-knife";

const loadingIcons = Object.freeze([
  "food-steak", 
  "chef-hat",  
  "silverware-fork-knife", 
]);

const LoadingScreen = () => {
  const stage = useSharedValue(0);
  const prog = useSharedValue(0);
  const [currentIcon, setCurrentIcon] = useState<LoadingIcon>("food-steak");

  useEffect(() => {
    const cycle = () => {
      prog.value = 0;
      prog.value = withSequence(
        withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),  // move right ➔ center
        withTiming(1.05, { duration: 100 }),                                 // quick pause
        withTiming(1.2, { duration: 200, easing: Easing.out(Easing.exp) }),  // bounce UP (slower + floaty)
        withTiming(1.3, { duration: 180, easing: Easing.in(Easing.exp) }),   // bounce DOWN (slightly faster)
        withTiming(1.4, { duration: 150 }),                                 // settle pause
        withTiming(2, { duration: 800, easing: Easing.in(Easing.ease) })    // move center ➔ left
      );

      setTimeout(() => {
        runOnJS(setCurrentIcon)(loadingIcons[(stage.value + 1) % loadingIcons.length] as LoadingIcon);
        stage.value = (stage.value + 1) % loadingIcons.length;
        cycle();
      }, 2100); // Adjust total time if needed
    };

    cycle();
  }, []);

  const animStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      prog.value,
      [0, 1, 1.4, 2],
      [150, 0, 0, -150]
    );
  
    const translateY = interpolate(
      prog.value,
      [0, 1, 1.1, 1.2, 1.3, 1.4, 2],
      [0, 0, 0, -50, 0, 0, 0]
    );
  
    // ✨ Squash and Stretch Magic ✨
    const scaleX = interpolate(
      prog.value,
      [0, 1, 1.1, 1.2, 1.3, 1.4, 2],
      [0.7, 1, 1, 0.8, 1.2, 1, 0.7] 
      // Normal ➔ Stretch (up) ➔ Squash (down) ➔ Settle
    );
  
    const scaleY = interpolate(
      prog.value,
      [0, 1, 1.1, 1.2, 1.3, 1.4, 2],
      [0.7, 1, 1, 1.2, 0.8, 1, 0.7]
      // Normal ➔ Stretch (up) ➔ Squash (down) ➔ Settle
    );
  
    const opacity = interpolate(
      prog.value,
      [0, 0.05, 1.95, 2],
      [0, 1, 1, 0]
    );
  
    return {
      transform: [
        { translateX },
        { translateY },
        { scaleX },
        { scaleY },
      ],
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconWrapper, animStyle]}>
        <MaterialCommunityIcons name={currentIcon} size={64} color="white" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
