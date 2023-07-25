import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Button,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { db } from "../Firebase";
import { storage } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import * as DocumentPicker from "expo-document-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function () {
  const lifeInsuranceCollectionRef = collection(db, "lifeInsurance");

  const insurance_Type = [
    { key: "1", value: "Insurance Type", disabled: true },
    { key: "2", value: "Pansion" },
    { key: "3", value: "Savings" },
  ];

  const [name, setName] = useState("");
  const [Nid, setNid] = useState("");
  const [email, setEmail] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.type === "success") {
        const response = await fetch(result.uri);

        const blob = await response.blob();

        const storageRef = ref(storage, result.name);

        uploadBytes(storageRef, blob)
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          })
          .then((downloadURL) => {
            console.log("File uploaded successfully!");
            console.log("Download URL:", downloadURL);
            setFileUrl(downloadURL);
          })
          .catch((error) => {
            console.log("Error uploading file:", error);
          });

        setFileName(result.name);
      }
    } catch (error) {
      console.log("Error picking file:", error);
    }
  };

  const handleSubmit = async () => {
    function makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    }
    const paymentID = makeid(6);

    const jsonValue = await AsyncStorage.getItem("user");
    if (jsonValue) {
      const userData = JSON.parse(jsonValue);
      setName(userData.name);
      setEmail(userData.email);
      setNid(userData.Nid);
    }

    if (
      name &&
      name.length > 0 &&
      fileUrl &&
      fileUrl.length > 0 &&
      amount &&
      amount.length > 0
    ) {
      setIsLoading(true);

      const data = {
        paymentID,
        companyName,
        name,
        Nid,
        email,
        address,
        phone,
        insuranceType,
        amount,
        fileUrl,
      };

      try {
        const docRef = await addDoc(lifeInsuranceCollectionRef, data);
        console.log("Submitted:", docRef.id);
        setIsLoading(false);
        navigation.navigate("Life Insurance");
        return;
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue) {
        const userData = JSON.parse(jsonValue);
        setCompanyName(userData.companyName);
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
            <Text className="text-md text-center text-lg font-medium">
              Welcome to insurance app!
            </Text>
            <Text className="text-md text-center text-base text-gray-700 mt-4">
              Until recently, the prevailing view assumed lorem ipsum was born
              as a nonsense text.
            </Text>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Address:</Text>
              <TextInput
                onChangeText={(text) => setAddress(text)}
                value={address}
                placeholder="Enter address..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Phone:</Text>
              <TextInput
                onChangeText={(text) => setPhone(text)}
                value={phone}
                placeholder="Enter phone..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">
                Insurance Type:
              </Text>

              <SelectList
                setSelected={(val) => setInsuranceType(val)}
                data={insurance_Type}
                save="value"
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Description:</Text>
              <TextInput
                onChangeText={(text) => setDescription(text)}
                multiline={true}
                numberOfLines={4}
                value={description}
                placeholder="Enter more details..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Amount:</Text>
              <TextInput
                onChangeText={(text) => setAmount(text)}
                value={amount}
                placeholder="Enter amount..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">
                Upload file: {!fileName ? "No file" : fileName}
              </Text>

              <Button title="Select File" onPress={handleFilePicker} />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              className="mt-6 bg-[#932326] px-4 py-2 rounded "
            >
              <Text className="text-lg font-semibold text-white text-center">
                {isLoading ? "Loading..." : "Pay"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
