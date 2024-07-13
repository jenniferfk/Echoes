import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Dimensions, Pressable } from 'react-native';
import PublishButton from '../atoms/PublishButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderPostItem } from './renderPostItem';
import notifee from '@notifee/react-native';
import formatCurrentDateTime from '../atoms/DateTimeFunction';

interface AddPostInput {
    placeholdertext: string;
}

const AddPostInput = ({ placeholdertext }: AddPostInput) => {
    const inputRef = useRef<TextInput>(null);
    const [characterCount, setCharacterCount] = useState(0);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);


    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState("");
    const [profileData, setProfileData] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('userData');
                if (jsonValue !== null) {
                    const parsedData = JSON.parse(jsonValue);
                    setProfileData(parsedData);
                }
            } catch (error) {
                console.error('Error fetching user data from AsyncStorage:', error);
            }
        };

        fetchUserData();
    }, []);
    const memoizedUserData = useMemo(() => profileData, [profileData]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handlePress = () => {
        if (isFocused) {
            Keyboard.dismiss();
            setIsFocused(false);
        }
    };
    useEffect(() => {
        setIsFormValid(characterCount !== 0);
    }, [characterCount]);

    const handleTextChange = (text: string) => {
        setCharacterCount(text.length);
        setText(text);
    };

    const createNotificationChannel = async () => {
        try {
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });
        } catch (error) {
            console.error('Error creating notification channel:', error);
        }
    };

    createNotificationChannel();

    const handlePublish = async () => {
        try {
          const formattedDateTime = formatCurrentDateTime(); 
            const response = await fetch('https://660fb86b356b87a55c52315f.mockapi.io/Posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Text: text,
                    Date: formattedDateTime,
                    Username: memoizedUserData?.username,
                }),
            });

            if (response.ok) {
                console.log('Post successfully published');
                if (inputRef.current) {
                    inputRef.current.clear();
                }
                setCharacterCount(0);
                setText('');

                notifee.displayNotification({
                    title: 'Post Published!',
                    body: 'Your post has been successfully published.',
                    android: {
                        channelId: 'default',
                    },
                    ios: {
                        sound: 'default',
                    },
                });
            } else {
                console.error('Failed to publish post');
            }
        } catch (error) {
            console.error('Error publishing post:', error);
        }
    };

    const renderItem = () => {
        if (!memoizedUserData?.username || !memoizedUserData?.firstName || !memoizedUserData?.image) {
            return null;
        }
        const { username, firstName, image } = memoizedUserData;
        return (
            <View>
                {renderPostItem({ username, Name: firstName, profilePicture: image })}
            </View>
        );
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={handlePress}>
                <View>
                    <View style={styles.container}>
                        {renderItem()}
                        {!isFocused && !text ? (
                            <Text style={styles.placeholder}>{placeholdertext}</Text>
                        ) : null}
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            maxLength={150}
                            multiline
                            onChangeText={handleTextChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <Text style={styles.counter}>{characterCount}/150</Text>
                    <PublishButton buttontext="Publish Post" onPress={handlePublish} disabled={!isFormValid} />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        borderRadius: windowHeight * 0.008,
        paddingHorizontal: windowHeight * 0.01,
        paddingVertical: 5,
        height: windowHeight * 0.35,
        margin: 10,
    },
    input: {
        fontSize: 16,
        margin: 10,
        color: 'black'
    },
    counter: {
        alignSelf: 'flex-end',
        fontSize: 15,
        color: '#888',
        marginRight: 16
    },
    placeholder: {
        position: "absolute",
        top: 70,
        left: windowHeight * 0.028,
        color: "gray",
        fontWeight: "bold",
        fontSize: windowHeight * 0.025,

    }
});

export default AddPostInput;
