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
import Icon from "react-native-vector-icons/Ionicons";


export default function () {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white h-screen">
      <View className="flex items-center justify-center px-4 ">
        <Image
          source={require("../assets/R.png")}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
        <Text className="text-md text-lg font-semibold">Welcome to insurance app!</Text>

        <Text className="text-md text-center text-base mt-4 text-gray-600">
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Text>


        <Text className="text-md text-center text-lg font-semibold mt-4 text-gray-800">
          Get Started with
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="mt-6 bg-[#932326] px-4 py-2 rounded w-full flex items-center justify-center "
        >
          <Text className="text-center text-lg font-semibold text-white">Login</Text>

        </TouchableOpacity>

        


      </View>

      <Text className="text-center text-sm mt-32">&copy; 2023,Insurance app!
      </Text>

    </SafeAreaView>
  );
}
