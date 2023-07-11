import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import UserScreen from "./screens/UserScreen";
import AdminScreen from "./screens/AdminScreen";
import RequestScreen from "./screens/RequestScreen";
// ---------------
import UserMotal from "./screens/UserMotalInsuranceScreen"
import AddMotalInsuranceScreen from "./screens/AddMotalInsuranceScreen";

import GeneralScreen from "./screens/GeneralScreen ";
import SalesScreen from "./screens/SalesScreen";
import ClaimScreen from "./screens/ClaimScreen";


export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="User" component={UserScreen} />

      <Stack.Screen name="Request" component={RequestScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />

      {/* All about motal insurance */}
      <Stack.Screen name="Motal Insurance" component={UserMotal} />
      <Stack.Screen name="Pay Motal Insurance" component={AddMotalInsuranceScreen} />

      <Stack.Screen name="General Manager" component={GeneralScreen} />
      <Stack.Screen name="Sales Manager" component={SalesScreen} />
      <Stack.Screen name="Claim Manager" component={ClaimScreen} />


    </Stack.Navigator>
  );
}
