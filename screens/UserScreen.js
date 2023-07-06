import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
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
          <View className="p-4 flex flex-col items-center justify-center ">
            <View>
              <Text className="my-4">Request!!</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Request")}
                className="bg-blue-800 w-14 h-14 rounded-full flex items-center justify-center"
              >
                <Icon name="add-outline" size={30} color="#FFF" />
              </TouchableOpacity>
            </View>

            {requests && requests.length == 0 ? (
              <Text className="mt-12">No requests...</Text>
            ) : (
              <View className="mt-12">
                {requests.map((request) => {
                  return (
                    <View
                      key={request.desc}
                      className="mt-4 bg-blue-100 w-full p-4 rounded"
                    >
                      <Text className="text-lg font-semibold">
                        {request.title}
                      </Text>
                      <Text className="text-base">{request.desc}</Text>
                      <Text className="font-bold text-blue-800">
                        Status:{" "}
                        {request.solved === false ? "Pending" : "Solved"}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
