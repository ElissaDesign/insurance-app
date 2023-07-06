import { useNavigation } from "@react-navigation/native";
import {
  StatusBar,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";

export default function () {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white h-screen  pt-20">
      <View className="flex items-center justify-center p-4 ">
        <Text className="text-md">Hello Elissa on your app!</Text>
        <Image
          source={require("../assets/undraw_join.png")}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />

        <Text className="text-md text-center text-base mt-4 text-gray-600">
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="mt-20 bg-blue-800 px-4 py-2 rounded "
        >
          <Text className="text-lg font-semibold text-white">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
