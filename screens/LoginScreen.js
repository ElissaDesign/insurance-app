import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export default function () {
  const usersCollectionRef = collection(db, "users");

  const [regN, setRegN] = useState("");
  const [password, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const queryRef = query(
      usersCollectionRef,
      where("password", "==", password),
      where("regN", "==", regN)
    );
    if (regN && regN.length > 0 && password && password.length > 0) {
      setIsLoading(true);
      try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(queryRef);

        if (querySnapshot.empty) {
          console.log("invalid credentials");
          alert("invalid credentials");
          setIsLoading(false);
        }
        setIsLoading(false);
        querySnapshot.forEach(async (doc) => {
          console.log("Document data:", doc.data());
          const user = doc.data();
          const jsonValue = JSON.stringify(user);
          await AsyncStorage.setItem("user", jsonValue);

          if (user.role == "admin") {
            return navigation.navigate("Admin");
          }
          return navigation.navigate("User");
        });
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-screen  pt-8">
      <View className="p-4 ">
        <Text className="text-md text-center text-lg font-medium">
          Welcome back!
        </Text>
        <Text className="text-md text-center text-base text-gray-700 mt-4">
          Until recently, the prevailing view assumed lorem ipsum was born as a
          nonsense text.
        </Text>

        <View className="mt-10">
          <Text className="text-gray-700 text-base mb-2">RegN:</Text>
          <TextInput
            onChangeText={(text) => setRegN(text)}
            value={regN}
            placeholder="Enter regNo..."
            className="border border-blue-500 rounded-md p-2"
          />
        </View>

        <View className="mt-4">
          <Text className="text-gray-700 text-base mb-2">Password:</Text>
          <TextInput
            onChangeText={(text) => setPass(text)}
            value={password}
            placeholder="Enter password..."
            className="border border-blue-500 rounded-md p-2"
          />
        </View>
        <View className="mt-4">
          <Text className="text-gray-700 text-base mb-2">
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              className="text-blue-500 font-medium"
            >
              Please Sign up
            </Text>{" "}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="mt-6 bg-blue-800 px-4 py-2 rounded "
        >
          <Text className="text-lg font-semibold text-white text-center">
            {isLoading ? "Loading.." : " Sign in"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
