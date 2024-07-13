import {  FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { renderPostItem } from './renderPostItem';
import { useFocusEffect } from '@react-navigation/native';
import TrashIcon from '../assets/svgIcons/TrashIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface TextItem {
     id:number
    Text: string;
    Date: string;
  }
  
const UserPostsList = () => {
  const [userData, setUserData] = useState<{
    firstName: string | null;
    username: string | null;
    image: string | null;
  }>({
    firstName: null,
    username: null,
    image: null,
  });

  const [userTexts, setUserTexts] = useState<TextItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);
          console.log('userData from AsyncStorage:', parsedData);
          setUserData({
            firstName: parsedData.firstName,
            username: parsedData.username,
            image: parsedData.image,
          });
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);


  const fetchProfilePostsData = async (username: string) => {
    try {
      const response = await fetch(`https://660fb86b356b87a55c52315f.mockapi.io/Posts?Username=${username}`);

      if (response.ok) {
        const data: TextItem[] = await response.json();
        if (data.length > 0) {
          const sortedData = data.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
          setUserTexts(sortedData.reverse());
        } else {
          console.error('No profile data found');
        }
      } else {
        console.error('Failed to fetch profile data posts');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
        if (userData.username) {
            fetchProfilePostsData(userData.username);
        }
    }, [userData.username])
);
  const deletePost = async (postId: number) => {
    try {
      const response = await fetch(`https://660fb86b356b87a55c52315f.mockapi.io/Posts/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUserTexts((prevUserTexts) => prevUserTexts.filter((item) => item.id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

      const renderItem = ({ item }: { item: TextItem }) => {
        if (!userData.username || !userData.firstName ) { 
          return null;
        }
        const { username, firstName, image } = userData;
          return (
            <View style={styles.itemContainer}>
              {renderPostItem({  username, Name: firstName, profilePicture: image })}
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{item.Text}</Text>
            </View>
            <View style={styles.dateContainer}>
            <Pressable onPress={() => deletePost(item.id)}>
              <TrashIcon />
            </Pressable>
                <Text style={styles.dateText}>{item.Date}</Text>
            </View>
            </View>
           
          );
        };
        if (userTexts.length === 0) {
          return (
              <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateText}>No Posts Yet</Text>
              </View>
          );
      }

    return (
        <FlatList
        initialNumToRender={5}
        data={userTexts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        scrollEnabled={false} 
        />
    );
};

export default UserPostsList

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    width: '93%',
    marginBottom:20,
    shadowColor: '#c472f7', 
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
emptyStateText: {
    fontSize: 18,
    color: 'black',
},
contentContainer: {
  flex: 4,

},
contentText: {
  fontSize: 16,
  color:'black',
  margin:10,
},
dateContainer: {
  flex: 1,
  alignItems: 'flex-end',
  flexDirection:'row',
  justifyContent:'space-between'
},
dateText: {
  fontSize: 12,
  color: 'lightgray',
},

})

