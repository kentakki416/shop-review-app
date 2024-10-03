import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
/* screens */
import HomeStackNavigator from "./HomeStackNavigator";
// import SearchScreen from "../screens/SearchScreen";
import UserScreen from "../screens/UserScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#900",
        tabBarInactiveTintColor: "#999",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Feather.glyphMap;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "User") {
            iconName = "user";
          } else {
            iconName = "circle"; // デフォルトのアイコンを設定
          }
          return <Feather name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="User"
        component={UserScreen as React.ComponentType}
        options={{
          tabBarLabel: "User",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
