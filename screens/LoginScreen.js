import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  Image,
  View,
  Button,
  KeyboardAvoidingView,
  ScrollView,
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

  const [code, setCode] = useState("");
  const [password, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const queryRef = query(
      usersCollectionRef,
      where("password", "==", password),
      where("code", "==", code)
    );
    if (code && code.length > 0 && password && password.length > 0) {
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
          } else if (user.role == "gmanager") {
            return navigation.navigate("General Manager")
          } else if (user.role == "smanager") {
            return navigation.navigate("Sales Manager")
          } else if (user.role == "cmanager") {
            return navigation.navigate("Claim Manager")
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
    <KeyboardAvoidingView>
      <ScrollView className="bg-white h-[100%]">
        <SafeAreaView className="bg-white h-screen  pt-2">
          <View className="px-4 ">
            <View className="flex items-center justify-center">
              <Image
                source={require("../assets/W.png")}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
              />
            </View>
            <Text className="text-md text-center text-lg font-medium">
              Please sign in!
            </Text>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Code:</Text>
              <TextInput
                onChangeText={(text) => setCode(text)}
                value={code}
                placeholder="Enter code..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Password:</Text>
              <TextInput
                onChangeText={(text) => setPass(text)}
                value={password}
                placeholder="Enter password..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">
                Don't have an account?{" "}
                <Text
                  onPress={() => navigation.navigate("Register")}
                  className="text-[#932326] font-medium"
                >
                  Please Sign up
                </Text>{" "}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="mt-6 bg-[#932326] px-4 py-2 rounded "
            >
              <Text className="text-lg font-semibold text-white text-center">
                {isLoading ? "Loading.." : " Sign in"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
