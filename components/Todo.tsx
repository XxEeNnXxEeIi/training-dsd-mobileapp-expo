import { FC, useState, useEffect } from 'react'
import { View, Text, Alert, ScrollView, ActivityIndicator } from 'react-native';

export const Todo: FC = () => {

    // hook ประกาศตัวแปร Array
    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            // Defaut กาารดึงข้อมูลเป็น GET เสมอไม่ต้องใส่
            const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
            //console.log(resp);
            if (resp.ok) {
                const jsonResp = await resp.json();
                //console.log(jsonResp);
                setTodo(jsonResp);
            } else {
                Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง')
            }
        } catch (e) {
            Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง')
        }
    }

    useEffect(() => {
        //console.log("Load todo ...!!!!")
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
                <Text className='text-3xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>Todo Page</Text>
            </View>

            <ScrollView>
                {
                    todo.map((todo, index) => (
                        <View key ={index} className = 'flex flex-col bg-green-700 rounded-lg p-2 mb-3'>
                            <Text>userId: {todo['userId']}</Text>
                            <Text>Id: {todo['id']}</Text>
                            <Text>Title: {todo['title']}</Text>
                            <Text>Completed: {todo['completed']}</Text>
                        </View>
                    ))
                }
            </ScrollView>
         </View> 
    </>
} 