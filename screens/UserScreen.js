import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
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
  const navigation = useNavigation();
  const requestsCollectionRef = collection(db, "requests");
  const [requests, setRequests] = useState([]);
  const [name, setName] = useState("");
  const [regN, setRegN] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (jsonValue) {
          const userData = JSON.parse(jsonValue);
          setName(userData.name);
          setRegN(userData.regN);

          const queryRef = await query(
            requestsCollectionRef,
            where("name", "==", userData.name),
            where("regN", "==", userData.regN)
          );

          try {
            // Get the documents that match the query
            const querySnapshot = await getDocs(queryRef);

            if (querySnapshot.empty) {
              console.log("No matching documents.");
              setIsLoading(false);
            }
            const dataArray = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              dataArray.push({ ...data });
            });
            setRequests(dataArray);
            setIsLoading(false);
          } catch (error) {
            alert(error);
            setIsLoading(false);
          }
        }
        // return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };

    getData();

    const interval = setInterval(getData, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <KeyboardAvoidingView>
      <ScrollView className="bg-white h-[100%]">
        <SafeAreaView className="bg-white max-h-full pt-4">
          <View className="flex items-center justify-center px-4 ">
            <Image
              source={require("../assets/R.png")}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
            {/* <Text className="text-md text-lg font-semibold">Welcome to insurance app!</Text> */}

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
              onPress={() => navigation.navigate("Life Insurance")}
              className="mt-6 bg-[#932326] px-4 py-2 rounded-full w-20 h-20 flex items-center justify-center "
            >
              <Icon name="person-outline" size={40} color="#FFF" />

            </TouchableOpacity>

            <Text className=" text-center text-lg font-semibold text-black">Life insurance</Text>


            <TouchableOpacity
              onPress={() => navigation.navigate("Claim")}
              className="mt-6 bg-[#932326] px-4 py-2 rounded-full w-20 h-20 flex items-center justify-center "
            >
              <Icon name="alert-circle-outline" size={40} color="#FFF" />

            </TouchableOpacity>

            <Text className=" text-center text-lg font-semibold text-black">Claim</Text>

          </View>

          <Text className="text-center text-sm mt-8">&copy; 2023,Insurance| for admins ||
            <Text onPress={() => navigation.navigate("Login")}
              className="text-black text-center ml-4"> Login</Text>

          </Text>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
