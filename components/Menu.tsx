import { FC } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native'

// แบบเก่า
/*
interface Props {
    navigation: NavigationProp<any, any>
}
export const Menu: FC = () => {

    const whenMenuPress = (screenName: string) => {
        props.navigation.navigate(screenName);
    }
*/

export const Menu: FC = () => {

    const navigation = useNavigation<NavigationProp<any, any>>();

    const whenMenuPress = (screenName: string) => {
        navigation.navigate(screenName);
    }

    return <>
        <View className='w-full h-full py-16 px-8 space-y-4 bg-orange-100'> 

        <View>
            <Text className='text-3xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>Menu Page</Text>
        </View>

        <View className='flex flex-row flex-wrap px-2 py-5 gap-y-4'>
            <Pressable className='w-1/3 flex flex-col items-center' onPress = {() => whenMenuPress("User")}>
                <MaterialIcons name="supervised-user-circle" size={72} color="#007F73" />
                <Text className='font-semibold'>User</Text>
            </Pressable>

            <Pressable className='w-1/3 flex flex-col items-center' onPress = {() => whenMenuPress("Todo")}>
                <MaterialIcons name="today" size={72} color="#2C4E80" />
                <Text className='font-semibold'>Todo</Text>
            </Pressable>

            <Pressable className='w-1/3 flex flex-col items-center' onPress = {() => whenMenuPress("Photo")}>
                <MaterialIcons name="camera" size={72} color="#FC4100" />
                <Text className='font-semibold'>Photo</Text>
            </Pressable>

            <Pressable className='w-1/3 flex flex-col items-center' onPress = {() => whenMenuPress("Album")}>
                <MaterialIcons name="photo" size={72} color="#6420AA" />
                <Text className='font-semibold'>Album</Text>
            </Pressable>

            <Pressable className='w-1/3 flex flex-col items-center'>
                <MaterialIcons name="comment" size={72} color="#D04848" onPress = {() => whenMenuPress("Comment")}/>
                <Text className='font-semibold'>Comment</Text>
            </Pressable>

            <Pressable className='w-1/3 flex flex-col items-center' onPress = {() => whenMenuPress("Post")}>
                <MaterialIcons name="podcasts" size={72} color="#211C6A" />
                <Text className='font-semibold'>Post</Text>
            </Pressable>
        </View>

        </View>
    </>
}