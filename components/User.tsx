import { FC, useState, useEffect } from 'react'
import { View, Text, Alert, ScrollView, ActivityIndicator } from 'react-native';

//เข้ามาถึงแล้วสั่งเลย คือ userEffect

export const User: FC = () => {

    // hook ประกาศตัวแปร Array
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            // Defaut กาารดึงข้อมูลเป็น GET เสมอไม่ต้องใส่
            const resp = await fetch('https://jsonplaceholder.typicode.com/users');
            //console.log(resp);
            if (resp.ok) {
                const jsonResp = await resp.json();
                //console.log(jsonResp);
                setUser(jsonResp);
            } else {
                Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง')
            }
        } catch (e) {
            Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง')
        }
    }

    useEffect(() => {
        //console.log("Load user ...!!!!")
        loadUser();
    }, []);

    if (loading) {
        return (
            <View className='w-full h-full bg-orange-100 flex justify-center items-center'>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text className='text-xl text-center text-gray-900'>Loading...</Text>
            </View>
        );
    }

    return <>
        <View className='w-full h-full bg-orange-100 space-y-2 p-2 flex flex-col'>
            <View>
                <Text className='text-3xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>User Page</Text>
            </View>

            <ScrollView>
                {
                    user.map((user, index) => (
                        <View key ={index} className = 'flex flex-col bg-orange-400 rounded-lg p-2 mb-3'>
                            <Text>ID: {user['id']}, UserName: {user['username']}</Text>
                            <Text>Name: {user['name']}</Text>
                            <Text>Email: {user['email']}</Text>
                            <Text>Address: {user['address']['street']}</Text>
                            <Text>Phone: {user['phone']}</Text>
                        </View>
                    ))
                }
            </ScrollView>
         </View> 
    </>
} 