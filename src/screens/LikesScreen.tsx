import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderPostItem } from '../organisms/renderPostItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MainDrawerNavigatorNavigationProp } from '../navigation/MainNavigator.type';
import LikesIcon from '../assets/svgIcons/LikesIcon';

interface TextItem {
  id: number;
  Text: string;
  Date: string;
  Username: string;
  Name: string; 
  ImagePath: string; 
}

interface UserDetails {
  Name: string;
  ImagePath: string;
}
const LikesScreen = () => {
    const navigation = useNavigation<MainDrawerNavigatorNavigationProp>();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedPostsData, setLikedPostsData] = useState<TextItem[]>([]);
  const [postsData, setPostsData] = useState<TextItem[]>([]);


    const fetchLikedPostsFromStorage = async () => {
      try {
        const storedLikedPosts = await AsyncStorage.getItem('likedPosts');
        if (storedLikedPosts) {
          setLikedPosts(JSON.parse(storedLikedPosts));
        }
      } catch (error) {
        console.error('Error fetching liked posts from storage:', error);
      } finally {
        setLoading(false);
      }
    };
    useFocusEffect(
        useCallback(() => {
            fetchLikedPostsFromStorage();
        }, [])
      );



  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await fetch('https://660fb86b356b87a55c52315f.mockapi.io/Posts');
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts');
        }
        const postsData = await postsResponse.json();
        setPostsData(postsData);

        const likedPostsData = postsData.filter((post: TextItem) => likedPosts.includes(post.id));
        setLikedPostsData(likedPostsData);

        const promises = likedPostsData.map(async (post: TextItem) => {
          try {
            const userDetailsResponse = await fetch(`https://660fb86b356b87a55c52315f.mockapi.io/Logs?Username=${post.Username}`);
            if (!userDetailsResponse.ok) {
              throw new Error(`Failed to fetch user details for ${post.Username}`);
            }
            const userDetails: UserDetails[] = await userDetailsResponse.json();
            const { Name, ImagePath } = userDetails[0];
            return { ...post, Name, ImagePath };
          } catch (error) {
            console.error(`Error fetching user details for ${post.Username}:`, error);
            return { ...post, Name: '', ImagePath: '' };
          }
        });

        const updatedLikedPostsData = await Promise.all(promises);
        setLikedPostsData(updatedLikedPostsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (likedPosts.length > 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [likedPosts]);
  
  const handleUNLikePress = async (postId: number) => {
    const updatedLikedPosts = likedPosts.filter(id => id !== postId);
    setLikedPosts(updatedLikedPosts);
    saveLikedPosts(updatedLikedPosts);
  };

  const saveLikedPosts = async (likedPosts: number[]) => {
    try {
      await AsyncStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    } catch (error) {
      console.error('Error saving liked posts:', error);
    }
  };
  const renderItem = ({ item }: { item: TextItem }) => {
    const post = postsData.find((post: TextItem) => post.id === item.id);
    return (
      <View style={styles.itemContainer}>
        {renderPostItem({ username: item.Username, Name: item.Name, profilePicture: item.ImagePath })}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.Text}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.Date}</Text>
          <Pressable onPress={() => handleUNLikePress(item.id)}>
            <LikesIcon color={'red'} />
          </Pressable>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (likedPostsData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No liked posts found</Text>
      </View>
    );
  }

  return (
    <ScrollView>
        <Text style={styles.aboutustitle}>Liked Posts</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </Pressable>
    
    <FlatList
      data={likedPostsData}
      keyExtractor={(item: TextItem) => item.id.toString()}
    renderItem={renderItem}
    scrollEnabled={false}
    />
    </ScrollView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({

    aboutustitle:{
        color:'black',
        alignSelf:'center',
        fontSize:25,
        marginTop:20,
        fontWeight:'bold'
      },
      backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 999, 
      },
      backButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
      },
    echoestext:{
      color:'#c472f7',
      fontSize:7
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 15,
      borderRadius: 10,
      width: '93%',
      marginBottom: 20,
      shadowColor: '#c472f7',
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 10,
      alignSelf:'center'
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
      color: 'black',
      margin: 10,
    },
    dateContainer: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateText: {
      fontSize: 12,
      color: 'lightgray',
    },
  });