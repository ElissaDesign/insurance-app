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

        <Text className="text-md text-center text-lg font-semibold mt-4 text-gray-800">
          Get Started with
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Motal Insurance")}
          className="mt-6 bg-[#932326] px-4 py-2 rounded-full w-20 h-20 flex items-center justify-center "
        >
          <Icon name="car-outline" size={40} color="#FFF" />

        </TouchableOpacity>

        <View>
          <Text className="text-center text-lg font-semibold text-black">Motal insurance</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="mt-6 bg-[#932326] px-4 py-2 rounded-full w-20 h-20 flex items-center justify-center "
        >
          <Icon name="person-outline" size={40} color="#FFF" />

        </TouchableOpacity>

        <Text className=" text-center text-lg font-semibold text-black">Life insurance</Text>

      </View>

      <Text className="text-center text-sm mt-8">&copy; 2023,Insurance| for admins || 
        <Text onPress={() => navigation.navigate("Login")}
          className="text-black text-center ml-4"> Login</Text>

      </Text>

    </SafeAreaView>
  );
}
