/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
import React, { useEffect, useReducer, useRef } from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  Image,
} from 'react-native';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// svg
import Svg, { Path } from 'react-native-svg';
// reanimated
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
// import Lottie from 'lottie-react-native'

import Home from '../screens/Home/Home';
import DashBoard from '../screens/dashboard/DashBoard';
import Settings from '../screens/settings/Settings';

// ------------------------------------------------------------------

const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// ------------------------------------------------------------------

const BottomTab = (prop) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <NavigationContainer> */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            margin: 30,
          },
          headerShown: false,
          tabBarActiveTintColor: 'white', // Set the active tint color here
          tabBarInactiveTintColor: 'red', // Set the inactive tint color here (optional)
        }}
        tabBar={(props) => <AnimatedTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          options={{
            // @ts-ignore
            tabBarIcon: ({ ref, color }) => (
              <Image
                source={require('../assets/images/home.png')}
                style={{ width: 30, height: 30, tintColor: color }}
              />
            ),
          }}
          component={Home}
          initialParams={prop.route.params}
        />
        <Tab.Screen
          name="DashBoard"
          options={{
            // @ts-ignore
            tabBarIcon: ({ ref, color }) => (
              <Image
                source={require('../assets/images/dash.png')}
                style={{ width: 30, height: 30, tintColor: color }}
              />
            ),
          }}
          component={DashBoard}
        />
        <Tab.Screen
          name="Settings"
          options={{
            // @ts-ignore
            tabBarIcon: ({ ref, color }) => (
              <Image
                source={require('../assets/images/settings.png')}
                style={{ width: 30, height: 30, tintColor: color }}
              />
            ),
          }}
          component={Settings}
        />
      </Tab.Navigator>
      {/* </NavigationContainer> */}
    </>
  );
};

// ------------------------------------------------------------------

// ------------------------------------------------------------------

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  // get information about the components position on the screen -----

  const reducer = (state, action) => {
    // Add the new value to the state
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);
  console.log(layout);

  const handleLayout = (event, index) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    // Our code hasn't finished rendering yet, so we can't use the layout values
    if (layout.length !== routes.length) return 0;
    // We can use the layout values
    // Copy layout to avoid errors between different threads
    // We subtract 25 so the active background is centered behind our TabBar Components
    // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
    // 5 pixels come from the little gap between the active background and the circle of the TabBar Components
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25;
    // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
    // or the layout changes (e.g. when the components haven't finished rendering yet)
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={[styles.tabBar, { paddingBottom: bottom }]}>
        <AnimatedSvg
          width={110}
          height={60}
          viewBox="0 0 110 60"
          style={[styles.activeBackground, animatedStyles]}>
          <Path
            fill="#ffffff"
            d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
          />
        </AnimatedSvg>

        <View style={styles.tabBarContainer}>
          {routes.map((route, index) => {
            const active = index === activeIndex;
            const { options } = descriptors[route.key];

            return (
              <TabBarComponent
                key={route.key}
                active={active}
                options={options}
                onLayout={(e) => handleLayout(e, index)}
                onPress={() => navigation.navigate(route.name)}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

const TabBarComponent = ({
  active,
  options,
  onLayout,
  onPress,
}: TabBarComponentProps) => {
  // handle lottie animation -----------------------------------------
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
    }
  }, [active]);

  // animations ------------------------------------------------------

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      // opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={[styles.component]}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  );
};

// ------------------------------------------------------------------

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#3052F8',
    // backgroundColor: 'white',
    marginHorizontal: 30,
    height: 70,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 10,
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor:"red"
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#3052F8',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 36,
    width: 36,
  },
});

export default BottomTab;
