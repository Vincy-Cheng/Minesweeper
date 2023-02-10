import { View, Text, Modal, Animated, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import CustomText from './CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontStyle } from '../enum';

type BottomSheetProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BottomSheet = ({ setOpen }: BottomSheetProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <SafeAreaView className="bg-black/40 flex-1 items-center justify-end w-full ">
        <Animated.View className={' bg-zinc-400 w-full border border-zinc-400'}>
          <View className="h-[40px] bg-zinc-300 justify-center items-end px-3">
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
              }}
            >
              <CustomText
                content={'Done'}
                styleClass="text-lg text-blue-600"
                fontStyle={FontStyle.IBM_Plex_Mono_Bold}
              />
            </TouchableOpacity>
          </View>
          {/* <View className="flex flex-row items-center">
            <View className=" flex-1 ">
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java2" value="java2" />
                <Picker.Item label="JavaScript2" value="js2" />
              </Picker>
            </View>
            <View className=" flex-1">
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java2" value="java2" />
                <Picker.Item label="JavaScript2" value="js2" />
              </Picker>
            </View>
          </View> */}
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

export default BottomSheet;
