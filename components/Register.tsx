import {FC, useState} from 'react'
import {Text, TextInput, View, Button, Pressable, Alert, ScrollView} from 'react-native'
import {z} from 'zod' 
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { NavigationProp } from '@react-navigation/native'
import { zodResolver } from '@hookform/resolvers/zod'
import { MyInput } from './ui/MyInput';
import { MyButton } from './ui/MyButton'
import { useNavigation } from '@react-navigation/native'; // อย่าใช้ของ expo มันหาหน้าไม่เจอ

interface Props {
    navigation: NavigationProp<any, any>
}

// data class
const RegisterSchema = z.object({
    userName: z.string().min(5).max(15),
    firstName: z.string().min(1).max(30),
    lastName: z.string().min(1).max(30),
    password: z.string().min(8).max(16),
});

type RegisterModel = z.infer<typeof RegisterSchema>

export const Register: FC<Props> = (props) => {

    // { Return ต่างๆ เช่น control}
    // 
    //<โครงสร้างข้อมูล>
    const { control, handleSubmit, reset } = useForm<RegisterModel>({
        defaultValues: {
            userName: 'xxxxx',
            firstName: 'Tanachod',
            lastName: 'Panjapornroongrod',
            password: '12345678',
        },
        resolver: zodResolver(RegisterSchema)
    })

    // (ชื่อตัวแปร) เช่น user คล้ายๆในการกำหนด catch  
    // ในวงเล็บ คือ ตัวแปรที่ส่งมาจาก input เช่น reg.firstName;
    // Ip เก่า คือ http://52.221.215.212/register
    // แบบ Local http://localhost:3000/register
    // แบบ Azue https://1xwck89j-3000.asse.devtunnels.ms/register
    const whenValidatePass: SubmitHandler<RegisterModel> = async (reg) => {
       
        console.log(reg); 
        try {
            const resp = await fetch("https://1xwck89j-3000.asse.devtunnels.ms/register", 
            {
                method: 'POST', // GET, POST, DELETE, PUT
                headers: {'Content-Type': 'application/json'}, // ถ้าไม่ระบุมันจะไม่ส่งเป็น JSON
                body: JSON.stringify({
                    userName: reg.userName,
                    firstName: reg.firstName,
                    lastName: reg.lastName,
                    password: reg.password,
                })
            });
    
            const jsonResp = await resp.json();
    
            if (jsonResp.success) {
                // ถ้าทำถูกต้อง
                //props.navigation.navigate("Main");
                Alert.alert(
                    'ทำรายการสำเร็จ!', 
                    "การลงทะเบียนได้รับการบันทึกแล้ว!",
                [{
                    text: "รับทราบ", 
                    onPress: () => {
                    reset();
                    navigation.goBack();
                }}]
            );
            } else {
                // รหัสไม่ถูกจะ warning
                console.log('error');
                Alert.alert('แจ้งเตือน', 'ชื่อ หรือ รหัสผ่านไม่ถูกต้อง');
            }
        } catch (e) {
            Alert.alert('ระบบขัดข้อง', "กรุณาลองอีกครั้ง หรือ แจ้งทีม Support");
        }
    }
    
    const whenValidateFail: SubmitErrorHandler<RegisterModel> = (error) => {
        console.log(error)
    }

    const whenResetPress = () => {
        reset(); // อยู่ใน const ตรง default
    }

    const navigation = useNavigation<NavigationProp<any, any>>();

    return <>
    <ScrollView className='bg-orange-100'>
        <View className= 'w-full h-full p-8'>
        <Text className= 'text-2xl text-center border-blackborder-2border-dashed'>Welcome to XXX</Text>
        <Text className= 'text-2xl text-center text-gray-900 underline italic font-semibold tracking-widest leading-10 uppercase'>Register Page</Text>
        
        <View>
            <MyInput name = 'userName' control = {control} label='บัญชีผู้ใช้งาน'/>
        </View>
        <View>
            <MyInput name = 'firstName' control = {control} isSecure = {false} label='ชื่อ'/>
        </View>
        <View>
            <MyInput name = 'lastName' control = {control} isSecure = {false} label='นามสกุล'/>
        </View>
        <View>
            <MyInput name = 'password' control = {control} isSecure = {true} label='รหัสผ่าน'/>
        </View>
        <View className = 'my-8 flex-row'>
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
        </View>
    </ScrollView>
    </>
}

/*
    const [countNumber, setCounntNumber] = useState(0)
    const whenAddPress = () => { setCounntNumber(countNumber+1); }
    <Button title='Add' onPress={whenAddPress}></Button>

    <Pressable className='flex-[2] mr-2' onPress={handleSubmit(whenValidatePass, whenValidateFail)} >
    <Text className='text-2xl text-center text-white bg-lime-800 border rounded-lg'>Submit</Text>
    </Pressable>

    <Pressable className='flex-1 ml-1' onPress={whenResetPress}>  
    <Text className='text-2xl text-center text-white bg-red-800 border rounded-lg'>Clear</Text>
    </Pressable>

    <MyButton name='Submit' control={control} classNameForPressable='flex-[2]' classNameForText='text-2xl text-center text-white bg-lime-800 border rounded-lg'/>
    <MyButton name='Clear' control={control} classNameForPressable='flex-1' classNameForText='text-2xl text-center text-white bg-red-800 border rounded-lg'/>

    <MyButton onPress={handleSubmit(whenValidatePass, whenValidateFail)} name='Submit' control={control} classNameForPressable='flex-[2] mr-2' classNameForText='text-2xl text-center text-white bg-lime-800 border rounded-lg'/>
    <MyButton onPress={whenResetPress} name='Clear' control={control} classNameForPressable='flex-1 ml-1' classNameForText='text-2xl text-center text-white bg-red-800 border rounded-lg'/>
    

    // *** การใช้ useState
    // const [ตัวแปร, กำหนดค่าตัวแปร] = กำหนดค่าเริ่มต้น จบในบรรทัดเดียว โครตหลอน
    // เวลาเอาตัวใช้ใน <> คือ {ตัวแปร}
    const [countNumber, setCounntNumber] = useState(0) // 0 คือค่า default นั้นเอง

    // สร้าง Arrow function (ฟังก์ชันนิรนาม) คือใช้ func กับ ตัวแปรที่เราสร้างไว้
    const whenAddPress = () => { setCounntNumber(countNumber+1); }

    // การใช้ useState มีหลายแบบ
    const [product, setProduct] = useState({ id: 1, name: 'Laptop', price: 1000 }); 


    // *** การใช้ useForm (เก็บข้อมูลจาก Input มาใส่ในตัวแปร และ Validate ให้ด้วยนะ!)

    1. สร้าง validation ก่อน
    
    import {z} from 'zod'; // ตรวจสอบความถูกต้อง validation

    const LoginSchema = z.object({
    userName: z.string().min(10),
    password: z.string().min(5)
    });

    type LoginModel = z.infer<typeof LoginSchema>; // สร้าง class โดยใช้ syntax คือ type 

    2. สร้างตัวเชื่อมโยง 

    import { zodResolver} from '@hookform/resolvers/zod'; // เป็นตัวกลางระหว่างทั้ง 2 
    import { useFrom } from 'react-hook-form'; // เก็บข้อมูลจาก Input เข้า Form

    const { control, handleSubmit, reset } = useForm<LoginModel>
    (
        {
            defaultValues: 
            {
                userName: '6396008895', // ตั้ง default ในช่อง TextInput ให้เลย
                password: '12345'
            },
            
            resolver: zodResolver(LoginSchema) // การ Integrade ร่วมกัน
        }
    );

    3. นำไปใช้งาน

    <Controller control={control} name="userName" render={({ field }) =>
    (
        <TextInput 
        onChangeText = {field.onChange}
        value = {field.value}
        className='bg-white border rounded-lg border-blue-800 focus:border-blue-400 p-2 my-2' />
    )
    }

    4. ทำแบบ ui components ไปเลย
    
    

    










*/