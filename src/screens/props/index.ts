import { StackNavigationProp } from '@react-navigation/stack';
import { HomeProps } from '../HomeScreen';

export type RootStackParamList = {
  Home: HomeProps;
  Game: any;
  Record: any;
};

export type NavigationScreenProp = StackNavigationProp<RootStackParamList>;
