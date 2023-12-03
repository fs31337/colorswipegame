import React, {useState, useRef} from 'react';
import {View, StyleSheet, PanResponder, Dimensions, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const colorSets = [
  ['#FF0000', '#00FF00', '#0000FF'],
  ['#FFFF00', '#FF00FF', '#00FFFF'],
  ['#FFA500', '#A52A2A', '#008000'],
];

const numRows = 3;
const numCols = 3;

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Screen" component={Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Screen: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(4);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const {dx, dy} = gestureState;
        return Math.abs(dx) > 5 || Math.abs(dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => handleMove(gestureState),
    }),
  ).current;

  const handleMove = (gestureState: any) => {
    const {dx, dy} = gestureState;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const newScreen = calculateNewScreen(dx, dy, screenWidth, screenHeight);

    if (newScreen !== null) {
      setCurrentScreen(newScreen);
    }
  };

  const calculateNewScreen = (
    dx: number,
    dy: number,
    screenWidth: number,
    screenHeight: number,
  ): number | null => {
    const threshold = 50;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > threshold && currentScreen % numCols !== 0) {
        return currentScreen - 1;
      } else if (dx < -threshold && currentScreen % numCols !== numCols - 1) {
        return currentScreen + 1;
      }
    } else {
      if (dy > threshold && currentScreen >= numCols) {
        return currentScreen - numCols;
      } else if (
        dy < -threshold &&
        currentScreen < colorSets.length - numCols
      ) {
        return currentScreen + numCols;
      }
    }

    return null;
  };

  const navigateToScreen = (newScreen: number) => {
    // You can implement your navigation logic here
    console.log(`Navigating to screen ${newScreen}`);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colorSets.flat()[currentScreen]},
      ]}
      {...panResponder.panHandlers}>
      <Text style={styles.text}>{`Position: ${currentScreen}`}</Text>
      {/* Cubo en el centro */}
      <View style={styles.cube} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cube: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'purple',
    position: 'absolute',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    marginBottom: 20,
  },
});

export default App;
