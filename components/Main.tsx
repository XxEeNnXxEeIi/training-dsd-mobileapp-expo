import { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from './Home'
import { Menu } from './Menu'
import { Message } from './Message'
import { Setting } from './Setting'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

export const Main: FC = () => {
    return <>
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home}
        options={{ tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name='home' color='black' size={32} />)}}/>

    <Tab.Screen name='Menu' component={Menu}
        options={{ tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name='menu' color='black' size={32} />)}}/>

    <Tab.Screen name='Message' component={Message}
        options={{ tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name='message' color='black' size={32} />)}}/>

    <Tab.Screen name='Setting' component={Setting}
        options={{ tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name='settings' color='black' size={32} />)}}/>
    </Tab.Navigator>
    </>
}

// ไม่ควรเขียนโค้ดไว้บน Desktop และ OneDrive
// อย่าเพิ่มอะไรในนี้ ไม่งั้น Bottom nav หายนะจ้ะ