import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AdminScreen from "./AdminScreen";
import MotalInsuranceScreen from "./MotalInsuranceScreen";
import LifeInsuranceScreen from "./LifeInsuranceScreen";
import ClaimInsuranceScreen from "./ClaimInsuranceScreen";

const Tab = createBottomTabNavigator();

export default function () {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: "absolute",
            bottom: 20,
            right: 20,
            left: 20,
            elevation: 0,
            backgroundColor: "#932326",
            borderRadius: 15,
            height: 70,
            ...styles.shadow,
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Managers"
        component={AdminScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center top-[6px] bottom-[6px]">
              <Icon
                name="people-outline"
                size={30}
                color={focused ? "#FFF" : "#FFF"}
              />
              <Text className={`${focused ? "text-[#FFF]" : "text-[#FFF]"} `}>
                Managers
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Motal Insurance"
        component={MotalInsuranceScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center top-[6px] bottom-[6px]">
              <Icon
                name="car-outline"
                size={30}
                color={focused ? "#FFF" : "#FFF"}
                className={`container w-[25px] h-25px ${
                  focused ? "text-[#3287C2]" : ""
                }`}
              />
              <Text className={`${focused ? "text-[#FFF]" : "text-[#FFF]"} `}>
                Motal
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Life Insurance"
        component={LifeInsuranceScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center top-[6px] bottom-[6px]">
              <Icon
                name="person-outline"
                size={30}
                color={focused ? "#FFF" : "#FFF"}
              />
              <Text className={`${focused ? "text-[#FFF]" : "text-[#FFF]"} `}>
                Life
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Claims Insurance"
        component={ClaimInsuranceScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center top-[6px] bottom-[6px]">
              <Icon
                name="alert-circle-outline"
                size={30}
                color={focused ? "#FFF" : "#FFF"}
              />
              <Text className={`${focused ? "text-[#FFF]" : "text-[#FFF]"} `}>
                Claims
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
