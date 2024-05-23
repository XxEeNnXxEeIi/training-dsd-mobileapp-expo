import {FC} from 'react'
import {View, Text, Pressable} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { useSelector } from 'react-redux' // ตัวรับ

interface Props {
    navigation: NavigationProp<any, any>
}

export const Home: FC<Props> = (props) => {

    const auth = useSelector((state: any) => state.auth);
    
    const WhenNavigateToRegister = () => {
        props.navigation.navigate("Register");
    }

    const WhenNavigateToLogin = () => {
        props.navigation.navigate("Login");
    }

    return <>
    <View className='w-full h-full py-16 px-8 space-y-4 bg-orange-100'> 

        <View>
            <Text className='text-3xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>Home Page</Text>
        </View>
        
        <View>
            <Text className='text-4xl text-center border-blackborder-2border-dashed'>Welcome</Text>
        </View>

        <View>
            <Text className='text-2xl text-center border-blackborder-2border-dashed'>{auth.firstName} {auth.lastName}</Text>
        </View>

        <Pressable 
        className ='bg-blue-800 py-2 rounded-md' 
        onPress={WhenNavigateToRegister}>
            <Text className ='text-3xl text-center text-white' >สมัครสมาชิก</Text>
        </Pressable>

        <Pressable 
        className ='bg-lime-800 py-2 rounded-md' 
        onPress={WhenNavigateToLogin}>
            <Text className ='text-3xl text-center text-white'>เข้าสู่ระบบ</Text>
        </Pressable>
    </View>
    </>
} 