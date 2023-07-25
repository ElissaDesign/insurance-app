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

  const motalInsuranceCollectionRef = collection(db, "motalInsurance");

  const [motalInsurance, setMotalInsurance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue) {
        const userData = JSON.parse(jsonValue);
        if (userData.role !== "general") {
          try {
            const queryRef = query(
              motalInsuranceCollectionRef,
              where("companyName", "==", userData.companyName)
            );

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

            setMotalInsurance(dataArray);
            setIsLoading(false);
          } catch (error) {
            alert(error);
            setIsLoading(false);
          }
        } else {
          const data = await getDocs(motalInsuranceCollectionRef);
          const MotalInsuranceData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMotalInsurance(MotalInsuranceData);
        }
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
            <Text className=" text-center text-md text-lg font-semibold mt-4">
              List of payed Motal insurances
            </Text>

            {motalInsurance && motalInsurance.length == 0 ? (
              <Text className="mt-8">Loading.../No data</Text>
            ) : (
              <View className="mt-8">
                {motalInsurance.map((insurance, index) => {
                  return (
                    <View
                      key={index}
                      className="mt-4 border border-[#932326]  w-full p-4 rounded shadow-md"
                    >
                      <View className="flex flex-row items-center justify-start">
                        <Text className="text-lg font-semibold text-gray-800">
                          {insurance.companyName}
                        </Text>
                        <Text className="text-black px-2 rounded ml-4">
                          PaymentID: {insurance.paymentID}
                        </Text>
                      </View>
                      <Text className="text-lg font-semibold">
                        NID: {insurance.Nid}
                      </Text>
                      <Text className="text-base">Name: {insurance.name}</Text>
                      <Text className="text-base">
                        Email: {insurance.email}
                      </Text>
                      <Text className="text-base">
                        Address: {insurance.address}
                      </Text>
                      <Text className="text-base">
                        Phone: {insurance.phone}
                      </Text>

                      <Text className="text-base">
                        Vehicle Type: {insurance.vehicleType}
                      </Text>
                      <Text className="text-base">
                        Plate Number: {insurance.plateNumber}
                      </Text>
                      <Text className="text-base">
                        Age Of Manufacture: {insurance.ageOfManufacture}
                      </Text>
                      <Text className="text-base">
                        Insurance Period: {insurance.insurancePeriod}
                      </Text>
                      <Text className="text-base">
                        Amount Payed: {insurance.amount}
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
