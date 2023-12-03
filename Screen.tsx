// Screen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ScreenProps {
  color: string;
  position: number;
}

const Screen: React.FC<ScreenProps> = ({color, position}) => {
  return (
    <View style={[styles.screen, {backgroundColor: color}]}>
      <Text>{`Position: ${position}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen;
