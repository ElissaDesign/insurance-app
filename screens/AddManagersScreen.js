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
import { SelectList } from "react-native-dropdown-select-list";

export default function () {
  const usersCollectionRef = collection(db, "users");

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [Nid, setNid] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const company = [
    { key: "1", value: "Select Company", disabled: true },
    { key: "2", value: "Prime Insurance" },
    { key: "3", value: "Sonarwa Insurance" },
  ];
  const roles = [
    { key: "1", value: "Select role", disabled: true },
    { key: "2", value: "general" },
    { key: "3", value: "sales" },
    { key: "4", value: "claim" },
  ];

  const handleSubmit = async () => {
    function generateRandomNumbers() {
      var numbers = "";
      for (var i = 0; i < 3; i++) {
        var randomNumber = Math.floor(Math.random() * 100) + 1;
        numbers += randomNumber;
      }
      return numbers;
    }

    var code = generateRandomNumbers();
    console.log("----code: ", code);

    // Create a query to retrieve the document
    const queryRef = query(
      usersCollectionRef,
      where("email", "==", email),
      where("Nid", "==", Nid)
    );

    if (name && name.length > 0) {
      setIsLoading(true);

      const data = { companyName, name, Nid, email, code, role, password };
      try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(queryRef);

        if (querySnapshot.empty) {
          console.log("No matching documents.");
          const docRef = await addDoc(usersCollectionRef, data);
          console.log("Submitted:", docRef.id);
          setIsLoading(false);
          navigation.navigate("Admin");
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
              Welcome to insurance app!
            </Text>
            <Text className="text-md text-center text-base text-gray-700 mt-4">
              Until recently, the prevailing view assumed lorem ipsum was born
              as a nonsense text.
            </Text>

            <View className="mt-10">
              <Text className="text-gray-700 text-base mb-2">Company:</Text>

              <SelectList
                setSelected={(val) => setCompanyName(val)}
                data={company}
                save="value"
                className="border border-[#932326] rounded-md p-2"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Full Name:</Text>
              <TextInput
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder="Enter name..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Nid:</Text>
              <TextInput
                onChangeText={(text) => setNid(text)}
                value={Nid}
                placeholder="Enter national id..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Email:</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Enter email..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">
                Role:eg.general,sales,claim:
              </Text>
              <SelectList
                setSelected={(val) => setRole(val)}
                data={roles}
                save="value"
                className="border border-[#932326] rounded-md p-2"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-700 text-base mb-2">Password:</Text>
              <TextInput
                onChangeText={(text) => setPass(text)}
                value={password}
                placeholder="Enter pass..."
                className="border border-[#932326] rounded-md p-2"
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="mt-6 bg-[#932326] px-4 py-2 rounded "
            >
              <Text className="text-lg font-semibold text-white text-center">
                {isLoading ? "Loading..." : "Invite"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
