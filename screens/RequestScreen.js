import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
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
  const requestsCollectionRef = collection(db, "requests");

  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [regN, setRegN] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        console.log("Stored data", jsonValue);
        if (jsonValue) {
          const userData = JSON.parse(jsonValue);
          setName(userData.name);
          setRegN(userData.regN);
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  const handleSubmit = async () => {
    if (
      name &&
      name.length > 0 &&
      regN &&
      regN.length > 0 &&
      desc &&
      desc.length > 0
    ) {
      setIsLoading(true);
      const data = { name, regN, title, desc, solved };
      console.log(data);
      try {
        const docRef = await addDoc(requestsCollectionRef, data);
        console.log("Submitted:", docRef.id);
        // keyword.dismiss();
        alert("sent");
        setIsLoading(false);
        navigation.navigate("User");
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
        <SafeAreaView className="bg-white h-screen ">
          <View className="p-4 flex flex-col items-center justify-center ">
            <View>
              <Text className="my-4 text-center font-semibold text-base ">
                Request!
              </Text>

              <Text className="text-md text-center text-base text-gray-700 mt-4">
                Until recently, the prevailing view assumed lorem ipsum was born
                as a nonsense text.
              </Text>

              <View className="mt-10">
                <Text className="text-gray-700 text-base mb-2">Title:</Text>
                <TextInput
                  onChangeText={(text) => setTitle(text)}
                  value={title}
                  placeholder="Enter title..."
                  className="border border-blue-500 rounded-md p-2"
                />
              </View>
              <View className="mt-10">
                <Text className="text-gray-700 text-base mb-2">
                  Describe your question:
                </Text>
                <TextInput
                  multiline
                  numberOfLines={5}
                  onChangeText={(text) => setDesc(text)}
                  value={desc}
                  placeholder="Enter title..."
                  className="border border-blue-500 rounded-md p-4"
                />
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                className="flex flex-row items-center justify-center bg-blue-800 rounded mt-6 p-2"
              >
                {isLoading ? (
                  <Text className="text-base text-white">Loading..</Text>
                ) : (
                  <>
                    <Text className="text-base text-white mr-2">Send</Text>
                    <Icon name="send-outline" size={20} color="#FFF" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
