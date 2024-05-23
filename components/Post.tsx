import { FC, useState, useEffect } from 'react'
import { View, Text, Alert, ScrollView, ActivityIndicator } from 'react-native';

//เข้ามาถึงแล้วสั่งเลย คือ userEffect

export const Post: FC = () => {

    // hook ประกาศตัวแปร Array
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadpost = async () => {
        try {
            // Defaut กาารดึงข้อมูลเป็น GET เสมอไม่ต้องใส่
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
            //console.log(resp);
            if (resp.ok) {
                const jsonResp = await resp.json();
                //console.log(jsonResp);
                setPost(jsonResp);
            } else {
                Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง')
            }
        } catch (e) {
            Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง')
        }
    }

    useEffect(() => {
        //console.log("Load post ...!!!!")
        loadpost();
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
                <Text className='text-3xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>Post Page</Text>
            </View>

            <ScrollView>
                {
                    post.map((post, index) => (
                        <View key ={index} className = 'flex flex-col bg-orange-400 rounded-lg p-2 mb-3'>
                            <Text>UserId: {post['userid']}, Id: {post['id']}</Text>
                            <Text>Body: {post['body']}</Text>
                            <Text>Title: {post['title']}</Text>
                        </View>
                    ))
                }
            </ScrollView>
         </View> 
    </>
} 