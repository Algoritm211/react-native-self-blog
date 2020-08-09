import React from 'react';
import {createAppContainer} from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { Ionicons } from '@expo/vector-icons'

import {THEME} from '../theme'
import { Platform } from 'react-native'


const navigatorOptions = {
  headerStyle:{
  backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
}

const PostStack = createStackNavigator()


const PostStackScreen = () => {
  return (
      <PostStack.Navigator
        screenOptions={navigatorOptions}
        >
        <PostStack.Screen
          // initialRouteName='Main'
          name='Main'
          component={MainScreen}
          />
        <PostStack.Screen
          name='Post'
          component={PostScreen}
          />
      </PostStack.Navigator>
      )
}

const BookedStack = createStackNavigator()

const BookStackScreen = () => {
  return (
    <BookedStack.Navigator
      screenOptions={navigatorOptions}
      >
        <BookedStack.Screen
          name='Booked'
          component={BookedScreen}
          />
        <BookedStack.Screen
          name='Post'
          component={PostScreen}
        />
    </BookedStack.Navigator>
  )
}

const configStyleForPlatform = Platform.OS === 'android'
  ? {
    activeTintColor: THEME.MAIN_COLOR,
    inactiveTintColor: 'gray',
  }
  : {
    activeTintColor: '#fff',
  }

const barStyleconfig = Platform.OS === 'android'
 ? {
   backgroundColor: THEME.MAIN_COLOR,

 }
 : {}




const BottomNavigator = Platform.OS === 'android'
? createMaterialBottomTabNavigator()
: createBottomTabNavigator()



const bottomTabsConfig = (
      <BottomNavigator.Navigator
        tabBarOptions={configStyleForPlatform}
        barStyle = {barStyleconfig}
        shifting={true}
        >
        <BottomNavigator.Screen
          name='Все' component={PostStackScreen}
          options={{
            tabBarIcon: (info) => (
              <Ionicons name='ios-albums' size={25} color={info.color}/>
            ),
          }}
          />
        <BottomNavigator.Screen
          name='Избранное'
          component={BookStackScreen}
          options={{
            tabBarIcon: (info) => (
              <Ionicons name='ios-star' size={25} color={info.color}/>
            ),
          }}
          />
      </BottomNavigator.Navigator>
)


const BottomNavigatorStackScreen = () => {
  return (
    bottomTabsConfig
  )
}

const AboutStack = createStackNavigator()

const AboutStackScreen = () => {
  return (
    <AboutStack.Navigator
      screenOptions={navigatorOptions}

      >
      <AboutStack.Screen name='About' component={AboutScreen}/>

    </AboutStack.Navigator>
  )
}

const CreateStack = createStackNavigator()

const CreateStackScreen = () => {
  return(
    <CreateStack.Navigator
      screenOptions={navigatorOptions}
      >
      <CreateStack.Screen
        name='Create'
        component={CreateScreen}/>

    </CreateStack.Navigator>
  )
}

const MainNavigator = createDrawerNavigator()

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator
        drawerContentOptions={{
          activeTintColor: THEME.MAIN_COLOR,
          labelStyle: {
            fontFamily: 'open-bold'
          }
        }}
      >
      <MainNavigator.Screen
        initialRouteName='PostScreenNav'
        name='PostScreenNav'
        component={BottomNavigatorStackScreen}
        options={{
            title: 'Главная страница'
        }}
      />
      <MainNavigator.Screen
        name='AboutScreen'
        component={AboutStackScreen}
        options={{
          title: 'О приложении',
        }}
        />
      <MainNavigator.Screen
        initialRouteName='Create'
        name='CreateScreen'
        options={{
          title: 'Создать'
        }}
        component={CreateStackScreen}/>



      </MainNavigator.Navigator>
    </NavigationContainer>
  )
}






// const BookedNavigation = () => {
//   return (
//     <BottomNavigator.Navigator
    // tabBarOptions={{
    //   activeTintColor: THEME.MAIN_COLOR,
    //   inactiveTintColor: 'gray',
    // }}
//     >
//     <BottomNavigator.Screen
//     name="Home"
//     component={AppNavigation}
    // options={{
    //   tabBarIcon: (info) => (
    //     <Ionicons name='ios-albums' size={25} color={info.color}/>
    //   ),
    // }}
//     />
//     <BottomNavigator.Screen
//     name="Booked"
//     component={BookedScreen}
//     options={{
//       tabBarIcon: (info) => (
//         <Ionicons name='ios-star' size={25} color={info.color}/>
//       )
//     }}
//     />
//     </BottomNavigator.Navigator>
//   )
// }
