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
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

export default function () {
  const motalInsuranceCollectionRef = collection(db, "motalInsurance");

  const typeofvehicl = [
    { key: "1", value: "Vechicle Type", disabled: true },
    { key: "2", value: "Carina" },
    { key: "3", value: "Bajaj" },
    { key: "4", value: "Audi" },
  ];
  const periodInsurance = [
    { key: "1", value: "Insuramce", disabled: true },
    { key: "2", value: "6 months" },
    { key: "3", value: "1 year" },
  ];

  const [name, setName] = useState("");
  const [Nid, setNid] = useState("");
  const [email, setEmail] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [ageOfManufacture, setageOfManufacture] = useState("");
  const [insurancePeriod, setInsurancePeriod] = useState("");
  const [amount, setAmount] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

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
    const paymentID = makeid(5);

    const jsonValue = await AsyncStorage.getItem("user");
    if (jsonValue) {
      const userData = JSON.parse(jsonValue);
      setName(userData.name);
      setEmail(userData.email);
      setNid(userData.Nid);
      setCompanyName(userData.companyName);
    }

    if (
      name &&
      name.length > 0 &&
      plateNumber &&
      plateNumber.length > 0 &&
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
        plateNumber,
        vehicleType,
        ageOfManufacture,
        insurancePeriod,
        amount,
      };

      try {
        const docRef = await addDoc(motalInsuranceCollectionRef, data);
        console.log("Submitted:", docRef.id);
        setIsLoading(false);
        navigation.navigate("Motal Insurance");
        return;
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (vehicleType === "Bajaj" && insurancePeriod === "6 months") {
      setAmount("38,200");
    } else if (vehicleType === "Bajaj" && insurancePeriod === "1 year") {
      setAmount("61,228");
    } else if (
      (vehicleType === "Carina" || vehicleType === "Audi") &&
      insurancePeriod === "6 months"
    ) {
      setAmount("84,228");
    } else if (
      (vehicleType === "Carina" || vehicleType === "Audi") &&
      insurancePeriod === "1 year"
    ) {
      setAmount("161,228");
    }
  }, [vehicleType, insurancePeriod]);

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

            <View className="mt-10">
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
                Plate Number:
              </Text>
              <TextInput
                onChangeText={(text) => setPlateNumber(text)}
                value={plateNumber}
                placeholder="Enter plate number..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">
                Vehicle Type:
              </Text>
              <SelectList
                setSelected={(val) => setVehicleType(val)}
                data={typeofvehicl}
                save="value"
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">
                Age of Manufacture:
              </Text>
              <TextInput
                onChangeText={(text) => setageOfManufacture(text)}
                value={ageOfManufacture}
                placeholder="Enter age of manuf..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">
                Insurance Period:
              </Text>

              <SelectList
                setSelected={(val) => setInsurancePeriod(val)}
                data={periodInsurance}
                save="value"
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Amount:</Text>
              <TextInput
                onChangeText={(text) => setAmount(text)}
                value={amount}
                editable={false}
                placeholder="Enter amount..."
                className="border border-[#932326] rounded-md p-2"
              />
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
