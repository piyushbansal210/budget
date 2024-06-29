/* eslint-disable no-dupe-keys */
/* eslint-disable space-infix-ops */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */

import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, LogBox, StatusBar, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import OnboardingItem from '../../components/OnboardingItem';
import Screen from '../../components/Screen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


LogBox.ignoreAllLogs();


const Onboarding = (props) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const data = [
    {
      id: 1,
      imageUrl: require("../../assets/images/onboard1.png"),
      description: "Track income and expenses effortlessly. Gain insights into your spending habits. Make informed financial decisions to reach your goals.",
      imageName: "board_check",
      buttonText: "Next",
      showBackButton: false,
    },
    {
      id: 2,
      imageUrl: require("../../assets/images/onboard2.png"),
      description: "Keep your hands free because our app automatically retrieves your transactions, saving you time and effort.",
      imageName: "pig_bank",
      buttonText: "Next",
    },
    {
      id: 3,
      imageUrl: require("../../assets/images/onboard3.png"),
      description: "Create personalized budgets and track your progress in real-time. Gain insights and receive alerts to stay on track. Achieve your financial goals with confidence.",
      imageName: "container_coin",
      buttonText: "Get Started",
    },
  ];

  const handleScrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ index });
    setCurrentIndex(index);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      handleScrollToIndex(currentIndex - 1);
    }
  };

  const renderDot = () => {
    const dots = Array(data.length).fill(0); // Create array with length matching data
    return (
      <View style={[styles.dotsContainer]}>
        {dots.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: currentIndex === index ? '#526FFC' : '#D9D9D9',
              margin: 5,
            }}
          />
        ))}
      </View>
    );
  };


  const renderItem = ({ item, index }) => {
    console.log(item.id);

    function navigateScreens() {
      if (item.buttonText === "Get Started") {
        props.navigation.navigate("UserDetails");
      }
      else {
        handleScrollToIndex(index + 1);
      }
    }
    return (
      <View style={styles.slide} key={item.imageName}>
        <View style={styles.upperItems}>
          {
            item.id !== 1 && (
              <TouchableOpacity style={styles.backButtonStyle} onPress={handleBack} disabled={index === 0}>
                <Image style={styles.backButtonImageStyle} source={require("../../assets/images/whitearrow.png")} />
              </TouchableOpacity>
            )
          }
        </View>

        <View style={styles.middleItems}>
          <Image source={item.imageUrl} style={styles.onboardImageStyle} />
          <Text style={styles.description}>{item.description}</Text>
        </View>


        <View style={styles.bottomItems}>
          <View style={[styles.dotsContainer]}>
            {renderDot()}
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigateScreens()}>
            <Text style={styles.buttonText}>{item.buttonText}  →</Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal // This enables horizontal scrolling
          pagingEnabled // This snaps the scrolling to the center of each item
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.imageName}
          renderItem={renderItem}
          onScroll={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / DEVICE_WIDTH);
            if (currentIndex !== index) {
              setCurrentIndex(index);
            }
          }}
        />

      </View>
    </Screen>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    // fontSize:12,
    fontFamily: 'Century Gothic',
    textAlign: "center",


  },
  backButtonStyle: {
    backgroundColor: "rgba(48, 82, 248, 0.25)",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  backButtonImageStyle: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  onboardImageStyle: {
    height: DEVICE_HEIGHT / 2.7,
    aspectRatio: 1,
    alignSelf: "center",

  },
  middleItems: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
  },
  upperItems: {
  },
  bottomItems: {
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
  slide: {
    width: DEVICE_WIDTH,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#526FFC',
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Century Gothic',
    textAlign: "center"
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
});

export default Onboarding;
