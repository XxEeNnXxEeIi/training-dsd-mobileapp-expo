//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View, Button } from 'react-native'; // View, Text, Button import มาจากอันนี้ เพิ่มได้
//import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from './components/Main';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ChangePassword } from './components/ChangePassword';

import { User } from './components/User';
import { Todo } from './components/Todo';
import { Photo } from './components/Photo';
import { Album } from './components/Album';
import { Comment } from './components/Comment';
import { Post } from './components/Post';
import { Provider } from 'react-redux'
import { store } from './app/store';

export default function App() {
  const Stack = createNativeStackNavigator();
  return <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options = {{headerShown: false}} />
        <Stack.Screen name="Login" component={Login}
        options={{title: 'เข้าสู่ระบบ', headerStyle: { backgroundColor: '#7FFFD4'}, headerTitleStyle: {color: 'black'}}}/>
    
        <Stack.Screen name="Register" component={Register}
        options={{title: 'ลงทะเบียน', headerStyle: { backgroundColor: '#7FFFD4'}, headerTitleStyle: {color: 'black'}}} />
        <Stack.Screen name ="ChangePassword" component={ChangePassword}></Stack.Screen>
        <Stack.Screen name ="User" component={User}></Stack.Screen>
        <Stack.Screen name ="Todo" component={Todo}></Stack.Screen>
        <Stack.Screen name ="Photo" component={Photo}></Stack.Screen>
        <Stack.Screen name ="Album" component={Album}></Stack.Screen>
        <Stack.Screen name ="Comment" component={Comment}></Stack.Screen>
        <Stack.Screen name ="Post" component={Post}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
}

// option เปลี่ยนชื่อ title ได้ {ด้านในเป็น JSON
// เวลาซ้อนหน้า option ในแต่ละหน้า options = {{headerShown: false}}

/*
export default function App() {
  
  const [cnt, setCnt] = useState(1) // cnt ตัวแปร, setcnt ตั้งค่าตัวแรก
  // ในรูป java int cst = 1;
  // cst ตัวแปร, setcnt ตัวตั้งค่า 
  // void setCnt(Int cnt)
  //{
    //this.cnt = cnt++
  //}

  // commend เขียนแบบนี้
  // ฟังก์ชันเมื่อกดปุ่ม
  // เพิ่มตัวเลขให้คำที่แสดง
  const whenAddPress = () => {
    // ใส่ logic ในนี้
    setCnt(cnt+1);
  }
  
  return (

    <View style={styles.container}>
      <Text>Hello สวัสดีจ้า {cnt}</Text>
      <Button title='Add' onPress={whenAddPress}></Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/