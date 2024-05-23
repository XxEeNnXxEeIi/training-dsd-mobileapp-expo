import {FC} from 'react'
import {Pressable, Text, View} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { NavigationProp} from '@react-navigation/native'

interface Props {
    navigation: NavigationProp<any, any>
}

export const Setting: FC<Props> = (props) => {

    const whenLogout = () => {
        props.navigation.navigate("Home")
    }

    const whenChangePassword = () => {
        props.navigation.navigate("ChangePassword")
    }

    return <>
    <View className='w-full h-full py-16 px-8 space-y-4 bg-orange-100'>         
        <View>
            <Text className='text-3xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>Setting Page</Text>
        </View>

        <View className =''>
            <Pressable className=' bg-slate-700 py-2 rounded-md flex flex-row justify-center items-center'
            onPress={whenChangePassword}>
                <Text className='text-2xl text-center text-white'>เปลี่ยนรหัสผ่าน</Text>
                <MaterialIcons name ='admin-panel-settings' color='white' size={37}></MaterialIcons>
            </Pressable>
        </View>

        <View className ='border rounded-lg border-red-600 p-2'>
            <Pressable className=' bg-red-600 py-2 rounded-md flex flex-row justify-center items-center'
            onPress={whenLogout}>
                <Text className='text-2xl text-center text-white'>Log-Out</Text>
            </Pressable>
        </View>
    </View>
    </>
} 