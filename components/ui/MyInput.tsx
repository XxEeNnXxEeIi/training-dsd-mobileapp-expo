import { FC } from 'react'
import {TextInput, Text} from 'react-native'
import { Control, Controller } from 'react-hook-form';

// กำหนด Schema สำหรับการรับค่า
interface Props {
    name: string; // string คือ Primative, String คือ Class
    control: Control<any>;
    isSecure?: boolean;
    label?: string;
}



export const MyInput: FC<Props> = (props) => {
    return <>
    
    <Controller control={props.control} name={props.name} render={({ field, fieldState }) => 
        (
            <>
            <Text className = {`${fieldState.invalid ? 'text-red-500' : '' }`}>{props.label}</Text>
            <TextInput secureTextEntry = {props.isSecure} onChangeText = {field.onChange} value = {field.value}
            className={`my-2 shadow-xl border rounded-lg ${!fieldState ? 'border-black bg-white' : fieldState.invalid ? 'border-red-500 bg-red-200' : 'border-black bg-green-200'}`}/>
            {
                fieldState.invalid && <Text className='text-red-600'>{fieldState.error?.message}</Text> // ถ้าอันนี้เป็นจริง 
            }
            </>
        )}/>
    </>
}

// วิธีใช้ <MyInput name = 'userName' control = {control} label='ผู้ใช้งาน'/>

//className={`my-2 shadow-xl border rounded-lg ${!fieldState ? 'border-white bg-white' : fieldState.invalid ? 'border-red-500 bg-red-200' : 'border-green-500 bg-green-200'}`}

//className={`my-2 shadow-xl border rounded-lg ${fieldState.invalid ? 'border-red-500 bg-red-200' : 'border-solid bg-slate-300'}`}

/*if(fieldState.invalid == true && fieldState.error == true) 
                {
                    println(message)
                }*/

// 1 คอมโปเน้น รีเทรินได้แค่อันเดียว

//className = {'my-2 shadow-xl border rounded-lg' + fieldState.invalid? 'border-red-500 bg-red-200' : 'border-green-500 bg-green-200'} 