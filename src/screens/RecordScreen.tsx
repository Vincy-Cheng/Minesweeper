import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { FontStyle } from '../enum';
import { useAppSelector } from '../hooks';

type Props = {};

const RecordScreen = (props: Props) => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  const { records } = useAppSelector((state) => state.record);

  return (
    <SafeAreaView className="bg-white dark:bg-zinc-800 h-full px-2">
      <View className="absolute -left-10 -bottom-2">
        <FontAwesome5 name="bomb" size={300} color={'#a1a1aa80'} />
      </View>
      <View className="flex flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather
            name="menu"
            size={30}
            color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>
        <View className="flex-1 pr-[30px]">
          <CustomText
            content={`Records ${records.length}`}
            styleClass={'text-center text-xl dark:text-white'}
            fontStyle={FontStyle.IBM_Plex_Mono}
          />
        </View>
      </View>
      <View className="pt-4 px-10">
        {records
          .slice(-5)
          .reverse()
          .map((record, index) => (
            <View
              key={record.endDate}
              className="space-y-2 py-2 border-b border-b-zinc-400"
            >
              <View className="flex flex-row justify-between">
                <View>
                  <CustomText
                    content={'Size: '}
                    fontStyle={FontStyle.IBM_Plex_Mono}
                    styleClass="dark:text-white"
                  />
                </View>
                <View>
                  <CustomText
                    content={record.size.width + ' x ' + record.size.height}
                    fontStyle={FontStyle.IBM_Plex_Mono}
                    styleClass="dark:text-white"
                  />
                </View>
              </View>
              <View className="flex flex-row justify-between">
                <View>
                  <CustomText
                    content={'Bombs number: '}
                    fontStyle={FontStyle.IBM_Plex_Mono}
                    styleClass="dark:text-white"
                  />
                </View>
                <View>
                  <CustomText
                    content={record.bombs}
                    fontStyle={FontStyle.IBM_Plex_Mono}
                    styleClass="dark:text-white"
                  />
                </View>
              </View>
              <View className="flex flex-row justify-between">
                <View>
                  <CustomText
                    content={'Games take: '}
                    fontStyle={FontStyle.IBM_Plex_Mono}
                    styleClass="dark:text-white"
                  />
                </View>
                <View>
                  <CustomText
                    content={new Date(record.time * 1000)
                      .toISOString()
                      .slice(11, 19)}
                    fontStyle={FontStyle.IBM_Plex_Mono}
                    styleClass="dark:text-white"
                  />
                </View>
              </View>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default RecordScreen;
