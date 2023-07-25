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
  const navigation = useNavigation();

  const usersCollectionRef = collection(db, "users");

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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

  const deleteDocsByQuery = async (code) => {
    console.log("Code: ", code);
    const queryRef = query(collection(db, "users"), where("code", "==", code));

    try {
      const querySnapshot = await getDocs(queryRef);

      if (querySnapshot.empty) {
        console.log("No matching documents found.");
        return;
      }

      querySnapshot.forEach(async (doc) => {
        try {
          await deleteDoc(doc.ref);
          console.log("Document deleted:", doc.id);
        } catch (error) {
          console.error("Error deleting document:", doc.id, error);
        }
      });
    } catch (error) {
      console.error("Error retrieving documents:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const queryRef = query(usersCollectionRef, where("role", "!=", null));

      try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(queryRef);

        if (querySnapshot.empty) {
          console.log("No matching documents.");
          setIsLoading(false);
          return;
        }

        const dataArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          dataArray.push({ ...data });
        });
        console.log(dataArray);
        setRequests(dataArray);
        setIsLoading(false);
      } catch (error) {
        alert(error);
        setIsLoading(false);
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
        <SafeAreaView className="bg-white max-h-full">
          <View className="p-4 ">
            <View className="flex items-center justify-center ">
              <TouchableOpacity
                onPress={() => navigation.navigate("Invite Manager")}
                className="mt-6 bg-[#932326] px-4 py-2 rounded-xl flex items-center justify-center "
              >
                <Text className="text-center text-white text-xl">
                  Click to Invite managers
                </Text>
              </TouchableOpacity>
            </View>
            <Text className=" text-center text-md text-lg font-semibold mt-4">
              List of the Requests !
            </Text>

            {requests && requests.length == 0 ? (
              <Text className="mt-8">Loading...</Text>
            ) : (
              <View className="mt-8">
                {requests.map((request) => {
                  return (
                    <View
                      key={request?.code}
                      className="mt-4 border border-[#932326]  w-full p-4 rounded shadow-md"
                    >
                      <View className="flex flex-row items-center justify-start">
                        <Text className="text-lg font-semibold text-gray-800">
                          {request.name}
                        </Text>
                        <Text className="text-black px-2 rounded ml-4">
                          {request.role} Manager
                        </Text>
                      </View>
                      <Text className="text-lg font-semibold">
                        Company: {request.companyName}
                      </Text>
                      <Text className="text-base font-semibold">
                        NID: {request.Nid}
                      </Text>
                      <Text className="text-base">Email: {request.email}</Text>
                      <Text className="text-base">Code: {request.code}</Text>
                      <TouchableOpacity
                        className="bg-[#932326] w-16 p-[4px] rounded mt-2"
                        onPress={() => {
                          deleteDocsByQuery(request?.code);
                        }}
                      >
                        <Text className="text-white">Delete</Text>
                      </TouchableOpacity>
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
