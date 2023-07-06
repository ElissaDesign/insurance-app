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
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
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
  //   const todoRef = firebase.firestore().collection("users");
  const usersCollectionRef = collection(db, "users");

  const [name, setName] = useState("");
  const [regN, setRegN] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    // Create a query to retrieve the document
    const queryRef = await query(
      usersCollectionRef,
      where("email", "==", email),
      where("regN", "==", regN)
    );

    if (name && name.length > 0) {
      setIsLoading(true);
      const data = { name, regN, email, password };
      try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(queryRef);

        if (querySnapshot.empty) {
          console.log("No matching documents.");
          const docRef = await addDoc(usersCollectionRef, data);
          console.log("Submitted:", docRef.id);
          setIsLoading(false);
          navigation.navigate("Login");
        }
        setIsLoading(false);
        return;
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <SafeAreaView className="bg-white h-screen  pt-4">
          <View className="p-4 ">
            <Text className="text-md text-center text-lg font-medium">
              Welcome to our system!
            </Text>
            <Text className="text-md text-center text-base text-gray-700 mt-4">
              Until recently, the prevailing view assumed lorem ipsum was born
              as a nonsense text.
            </Text>

            <View className="mt-10">
              <Text className="text-gray-700 text-base mb-2">Full Name:</Text>
              <TextInput
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder="Enter name..."
                className="border border-blue-500 rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Reg No:</Text>
              <TextInput
                onChangeText={(text) => setRegN(text)}
                value={regN}
                placeholder="Enter name..."
                className="border border-blue-500 rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Email:</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Enter text..."
                className="border border-blue-500 rounded-md p-2"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Password:</Text>
              <TextInput
                onChangeText={(text) => setPass(text)}
                value={password}
                placeholder="Enter text..."
                className="border border-blue-500 rounded-md p-2"
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="mt-6 bg-blue-800 px-4 py-2 rounded "
            >
              <Text className="text-lg font-semibold text-white text-center">
                {isLoading ? "Loading..." : "Sign up"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
