import { FC, useState, useEffect } from 'react'
import { View, Text, Alert, ScrollView, ActivityIndicator } from 'react-native';

//เข้ามาถึงแล้วสั่งเลย คือ userEffect

export const Comment: FC = () => {

    // hook ประกาศตัวแปร Array
    const [comment, setComment] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadComment = async () => {
        try {
            // Defaut กาารดึงข้อมูลเป็น GET เสมอไม่ต้องใส่
            const resp = await fetch('https://jsonplaceholder.typicode.com/comments');
            //console.log(resp);
            if (resp.ok) {
                const jsonResp = await resp.json();
                //console.log(jsonResp);
                setComment(jsonResp);
            } else {
                Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง')
            }
        } catch (e) {
            Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง')
        }
    }

    useEffect(() => {
        //console.log("Load comment ...!!!!")
        loadComment();
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
                <Text className='text-3xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>Comment Page</Text>
            </View>

            <ScrollView>
                {
                    comment.map((comment, index) => (
                        <View key ={index} className = 'flex flex-col bg-orange-400 rounded-lg p-2 mb-3'>
                            <Text>PostId: {comment['postId']}, Id: {comment['id']}</Text>
                            <Text>Name: {comment['name']}</Text>
                            <Text>Body: {comment['body']}</Text>
                        </View>
                    ))
                }
            </ScrollView>
         </View> 
    </>
} 