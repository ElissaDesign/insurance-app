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
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function () {
  const lifeInsuranceCollectionRef = collection(db, "lifeInsurance");

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [nID, setNID] = useState("");
  const [lifeInsurance, setLifeInsurance] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue) {
        const userData = JSON.parse(jsonValue);
        setEmail(userData.email);
        setNID(userData.Nid);

        try {
          const queryRef = query(
            lifeInsuranceCollectionRef,
            where("Nid", "==", userData.Nid)
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

          setLifeInsurance(dataArray);
          setIsLoading(false);
        } catch (error) {
          alert(error);
          setIsLoading(false);
        }
      }
    };

    getData();

    const interval = setInterval(getData, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  const handleDownload = (downloadURL) => {
    Linking.openURL(downloadURL);
  };

  //   console.log("----<>========", lifeInsurance)
  return (
    <KeyboardAvoidingView>
      <ScrollView className="bg-white h-[100%]">
        <SafeAreaView className="bg-white max-h-full">
          <View className="p-4 flex flex-col items-center justify-center ">
            <View>
              <Text className="my-4 text-center font-semibold text-base ">
                All Payments!
              </Text>

              <Text className="text-md text-center text-base text-gray-700 mt-4">
                Until recently, the prevailing view assumed lorem ipsum was born
                as a nonsense text.
              </Text>

              <View className="flex items-center justify-center ">
                <TouchableOpacity
                  onPress={() => navigation.navigate("Pay Life Insurance")}
                  className="mt-6 bg-[#932326] px-4 py-2 rounded-full w-24 h-24 flex items-center justify-center "
                >
                  <Text className="text-center text-white text-xl">
                    Click & Pay
                  </Text>
                </TouchableOpacity>
              </View>

              {lifeInsurance && lifeInsurance.length == 0 ? (
                <Text className="mt-8"> No payments available!</Text>
              ) : (
                <View className="mt-8">
                  {lifeInsurance?.map((insurance) => {
                    return (
                      <View
                        key={insurance.paymentID}
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
                          Type of Insurance: {insurance.insuranceType}
                        </Text>
                        <Text className="text-base">
                          Amount: {insurance.amount}
                        </Text>
                        <TouchableOpacity className="bg-[#932326] w-20 mt-2 flex flex-row items-center rounded justify-between px-2 "  onPress={() => {
                          handleDownload(insurance.fileUrl);
                        }}>
                        <Text className='text-base font-medium text-white'>File</Text>
                        <Icon name="cloud-download-outline" size={20} color="#FFF" />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
