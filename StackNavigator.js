import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import UserScreen from "./screens/UserScreen";

// --------------Admin screens
import AddManagersScreen from "./screens/AddManagersScreen";

// --------------Motal
import UserMotal from "./screens/UserMotalInsuranceScreen"
import AddMotalInsuranceScreen from "./screens/AddMotalInsuranceScreen";

// --------------Life
import UserLifeInsuranceScreen from "./screens/UserLifeInsuranceScreen";
import AddLifeInsuranceScreen from "./screens/AddLifeInsuranceScreen";

// --------------Claim
import UserClaimInsuranceScreen from "./screens/UserClaimInsuranceScreen";
import AddClaimInsuranceScreen from "./screens/AddClaimInsuranceScreen";


import ClaimInsuranceScreen from "./screens/ClaimInsuranceScreen";

import adminTabs from "./screens/adminTabs";
import managerTabs from "./screens/managerTabs";
import SalesTabs from "./screens/SalesTabs";

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitleAlign: "center" }}/>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="User" component={UserScreen} />


      {/* All about Admin */}
      <Stack.Screen name="Admin" component={adminTabs} />
      <Stack.Screen name="Invite Manager" component={AddManagersScreen} />

      {/* All about motal insurance */}
      <Stack.Screen name="Motal Insurance" component={UserMotal} />
      <Stack.Screen name="Pay Motal Insurance" component={AddMotalInsuranceScreen} />

      {/* All about life insurance */}
      <Stack.Screen name="Life Insurance" component={UserLifeInsuranceScreen} />
      <Stack.Screen name="Pay Life Insurance" component={AddLifeInsuranceScreen} />

      {/* All about Claim insurance */}
      <Stack.Screen name="Claim Insurance" component={UserClaimInsuranceScreen} />
      <Stack.Screen name="Claim Your Insurance" component={AddClaimInsuranceScreen} />

      <Stack.Screen name="General Manager" component={managerTabs} />
      <Stack.Screen name="Sales Manager" component={SalesTabs} />
      <Stack.Screen name="Claim Manager" component={ClaimInsuranceScreen} />


    </Stack.Navigator>
  );
}
