import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export type MainNavigatorForBottomTabsList ={
    Home:undefined;
    Search: undefined;
    AddPost: undefined;
    Profile: undefined;
}

export type MainNavigatorForLoginList ={
    Login : undefined;
    Signup: undefined;
}

export type MainNavigatorStackList={
    SearchScreen:undefined;
    ProfileInfo: { username: string };
}

export type MainNavigatorForDrawerList ={
    AppDrawer:undefined;
    Aboutus: undefined;
    Terms: undefined;
    Likes:undefined;
}
export type MainNavigatorNavigationProp = BottomTabNavigationProp<MainNavigatorForBottomTabsList>;
export type MainStackNavigatorNavigationProp = NativeStackNavigationProp<MainNavigatorForLoginList>;
export type MainDrawerNavigatorNavigationProp = DrawerNavigationProp<MainNavigatorForDrawerList>;
export type MainNavigatorStackProp = NativeStackNavigationProp<MainNavigatorStackList>;
export type MainNavigatorRouteProp= RouteProp<MainNavigatorForBottomTabsList>;


