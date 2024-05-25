import { FC } from 'react'; // FC คือ Function Components มี Class ด้วยนะ
import {View, Text, Image, TextInput, Pressable, Alert, ScrollView} from 'react-native'; // เพิ่มประเภท Widget ในนี้
import {z} from 'zod'; 
import { zodResolver} from '@hookform/resolvers/zod';
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { NavigationProp } from '@react-navigation/native'
import { MyInput } from './ui/MyInput';
import { MyButton } from './ui/MyButton';

// สำหรับ Redux
import { useDispatch } from 'react-redux' // เป็น hook ไว้ส่งฟังก์ชันไว้ Store ได้ คล้าย Fetch ส่งไปให้ Redux แทน
import { setName } from '../app/auth-slice';

interface Props {
    navigation: NavigationProp<any, any>
}

const LoginSchema = z.object({
    userName: z.string().min(5),
    password: z.string().min(8)
});

type LoginModel = z.infer<typeof LoginSchema>;

export const Login: FC<Props> = (props) => { 

    const dispatch = useDispatch();

    // call hook
    const WhenNavigate = () => {
        props.navigation.navigate("Register");
    }
    
    const { control, handleSubmit, reset } = useForm<LoginModel>({
        defaultValues: {
            userName: 'xxxxx', // ตั้ง default ในช่อง TextInput ให้เลย
            password: '12345678'
        },
        resolver: zodResolver(LoginSchema)
    });

    // Ip เก่า คือ http://52.221.215.212/login
    const whenValidatePass: SubmitHandler<LoginModel> = async (user) => {
        console.log(user);
        // Login ใช้ Post
        try {
            const resp = await fetch("https://1xwck89j-3000.asse.devtunnels.ms/login", 
            {
                method: 'POST', // GET, POST, DELETE, PUT
                headers: {'Content-Type': 'application/json'}, // ถ้าไม่ระบุมันจะไม่ส่งเป็น JSON
                body: JSON.stringify({
                    userName: user.userName,
                    password: user.password // w พิมพ์เล็ก
                })
            });
    
            const jsonResp = await resp.json();
    
            if (jsonResp.success) {
                // ถ้า Login ถูก
                //props.navigation.navigate("Main");

                dispatch(setName({
                    firstName: jsonResp.firstName,
                    lastName: jsonResp.lastName
                }));
                props.navigation.navigate("Main");
            } else {
                // รหัสไม่ถูกจะ warning
                console.log('error');
                Alert.alert('แจ้งเตือน', 'ชื่อ หรือ รหัสผ่านไม่ถูกต้อง');
            }
        } catch (e) {
            Alert.alert('ระบบขัดข้อง', "กรุณาลองอีกครั้ง หรือ แจ้งทีม Support");
        }
    };    

    // วิธี Callback Async Await
    
        // แบบเก่า
        /*
        .then((resp) => { //response
            // success ทำตามสัญญา
        }).catch((reason) => {
            //error
        })
        */

    const whenValidateFail: SubmitErrorHandler<LoginModel> = (error) => {
        console.log(error)
    }

    const whenResetPress = () => {
        reset();
    }

    return <>
    <ScrollView className='bg-orange-100'>
        <View className='w-full h-full py-16 px-8 space-y-4 '>
        
            <View className='items-center'>
                <Image source={require('./../assets/ill.png')}></Image>
            </View>
            <View>
                <Text className='text-4xl text-center border-blackborder-2border-dashed'>Illuminados</Text>
            </View>
        
            <View>
                <Text className='text-3xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>Login Form</Text>
            </View>
            <View>
                <MyInput name = 'userName' control = {control} label='ผู้ใช้งาน'/>
            </View>
            <View>
                <MyInput name = 'password' control = {control} isSecure = {true} label='รหัสผ่าน'/>
            </View>
            <View className = 'flex-row'>
            <View className = 'flex-[2] mr-4'>
            <MyButton label = 'Submit'
            whenPress={handleSubmit(whenValidatePass, whenValidateFail)}>
            </MyButton>
            </View>
            <View className = 'flex-1'>
            <MyButton label = 'Clear'
            whenPress={whenResetPress}>
            </MyButton>
            </View>
            </View>
            <Pressable
            onPress={WhenNavigate}>
                <Text className ='underline'>Don't have account? Register here!</Text>
            </Pressable>
        </View>
    </ScrollView>
    </>
}

// drawyer nav ไม่ค่อยฮิต ใช้ bottom tap เอา
// flex-row คือ แบบแนวนอน
// flex-colum คือ แบบแนวตั้ง
// ใส่ View ครอบแต่ละ Widget เพื่อให้ใช้ space บนสุดแบ่งได้

// constant คือ ค่าที่เปลี่ยนแปลงไม่ได้ คือ final หรือ val
// ส่งออก ตัวแปรแบบ const ชื่อ Login ที่ คืนค่าเป็น FC แบบ Arrow Function
// () คือ แบบฟังก์ชัน
// คืนค่าเป็น <> 

// margin คือ ขยับตัวเอง padding แบบ x,y คือ ขยับแม่
// Tranfrom upper, lower
// capitalize แยกพิมพ์ใหญ่เป็นคำๆ
// border กับ rounded ใช้ในหมวดเดียวกัน ถ้าเส้นประ ก็เส้นประ ถ้าเส้นโค้งก็โค้ง
// flex ใช้จัดแบบหน้าจอ เหมาะกับโทรสัพ
// table เหมาะกับ Tablet