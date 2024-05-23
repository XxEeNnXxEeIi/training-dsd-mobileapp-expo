import { FC } from 'react';
import { Pressable, Text } from 'react-native';

interface Props {
    label: string;
    whenPress: () => void;
}

export const MyButton: FC<Props> = (props) => {
    // render
    return <>
        <Pressable
            onPress={props.whenPress}
            className='bg-blue-800 py-2 rounded-md'>
            <Text className='text-white text-center font-semibold'>{props.label}</Text>
        </Pressable>
    </>
}