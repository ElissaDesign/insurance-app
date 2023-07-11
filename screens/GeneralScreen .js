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

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const updateRequest = async (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, updating: true } : request
      )
    );

    setIsUpdateLoading(true);
    const requestDoc = doc(db, "requests", id);
    const newFields = { solved: true };
    await updateDoc(requestDoc, newFields);
    alert("done");

    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, updating: false } : request
      )
    );
    setIsUpdateLoading(false);
  };

  useEffect(() => {
    const getRequests = async () => {
      const data = await getDocs(requestsCollectionRef);
      const requestsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRequests(requestsData);
    };

    getRequests();

    const interval = setInterval(getRequests, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <KeyboardAvoidingView>
      <ScrollView className="bg-white h-[100%]">
        <SafeAreaView className="bg-white max-h-full">
          <View className="p-4 ">
            <Text className=" text-center text-md text-lg font-semibold">
              List of the Requests !
            </Text>

            {/* {requests && requests.length == 0 ? (
              <Text className="mt-8">Loading...</Text>
            ) : (
              <View className="mt-8">
                {requests.map((request) => {
                  return (
                    <View
                      key={request.id}
                      className="mt-4 bg-blue-100 w-full p-4 rounded shadow-md"
                    >
                      <View className="flex flex-row items-center justify-start">
                        <Text className="text-lg font-semibold text-blue-800">
                          {request.name}
                        </Text>
                        <Text className="bg-blue-800 text-white px-2 rounded ml-4">
                          {request.regN}
                        </Text>
                      </View>
                      <Text className="text-lg font-semibold">
                        {request.title}
                      </Text>
                      <Text className="text-base">{request.desc}</Text>
                      <View className="flex flex-row items-center">
                        <Text className="font-bold text-blue-800">
                          Status:{" "}
                          {request.solved === false ? "Pending" : "Solved"}
                        </Text>
                        {!request.solved === false ? (
                          ""
                        ) : (
                          <TouchableOpacity
                            className="ml-4"
                            onPress={() => {
                              updateRequest(request.id);
                            }}
                          >
                            <Text>
                              {request.updating ? "Updating" : "Approve"}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            )} */}


          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
