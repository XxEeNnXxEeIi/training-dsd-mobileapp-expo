import { FC, useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, ActivityIndicator } from 'react-native';

export const Photo: FC = () => {
    // State variables
    const [photo, setPhoto] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadphoto = async () => {
        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/photos');
            if (resp.ok) {
                const jsonResp = await resp.json();
                setPhoto(jsonResp);
            } else {
                Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง');
            }
        } catch (e) {
            Alert.alert("ระบบมีปัญหา", 'กรุณาลองอีกครั้ง');
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        loadphoto();
    }, []);

    if (loading) {
        return (
            <View className='w-full h-full bg-orange-100 flex justify-center items-center'>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text className='text-xl text-center text-gray-900'>Loading...</Text>
            </View>
        );
    }

    return (
        <View className='w-full h-full bg-orange-100 space-y-2 p-2 flex flex-col'>
            <View>
                <Text className='text-3xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>Photo Page</Text>
            </View>
            <ScrollView>
                {photo.map((photo, index) => (
                    <View key={index} className='flex flex-col bg-orange-400 rounded-lg p-2 mb-3'>
                        <Text>Album Id: {photo['albumId']}, Id: {photo['id']}</Text>
                        <Text>Title: {photo['title']}</Text>
                        <Text>Url: {photo['url']}</Text>
                        <Text>Thumbnail Url: {photo['thumbnailUrl']}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
