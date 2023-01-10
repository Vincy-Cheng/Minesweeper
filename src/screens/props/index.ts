import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: any;
  Game: any;
  Record: any;
};

export type NavigationScreenProp = StackNavigationProp<RootStackParamList>;
