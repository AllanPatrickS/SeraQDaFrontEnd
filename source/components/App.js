import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import FourthScreen from './FourthScreen';
import FifthScreen from './FifthScreen';
import SixthScreen from './SixthScreen';
import SeventhScreen from './SeventhScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
        <Stack.Screen name="FourthScreen" component={FourthScreen} />
        <Stack.Screen name="FifthScreen" component={FifthScreen} />
        <Stack.Screen name="SixthScreen" component={SixthScreen} />
        <Stack.Screen name="SeventhScreen" component={SeventhScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
