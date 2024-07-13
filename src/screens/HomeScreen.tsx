import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, RefreshControl, StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { renderPostItem } from '../organisms/renderPostItem';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Reducers/rootreducer';
import LikesIcon from '../assets/svgIcons/LikesIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TextItem {
  id: number;
  Text: string;
  Date: string;
  Username: string;
  userDetails: UserData;
}

interface UserData {
  Username: string;
  Name: string;
  ImagePath: string;
}

const HomeScreen = () => {
  const [userPosts, setUserPosts] = useState<TextItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const username = useSelector((state: RootState) => state.user.username);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [lastPress, setLastPress] = useState(0);
  
  useEffect(() => {
    loadLikedPosts();
  }, []);

  const fetchUserPostsData = async () => {   
    try {
      setRefreshing(true);
      const [postsResponse, userDetailsResponse] = await Promise.all([
        fetch(`https://660fb86b356b87a55c52315f.mockapi.io/Posts`),
        fetch(`https://660fb86b356b87a55c52315f.mockapi.io/Logs`)
      ]);
  
      if (postsResponse.ok && userDetailsResponse.ok) {
        const [postsData, userDetailsData] = await Promise.all([
          postsResponse.json(),
          userDetailsResponse.json()
        ]);
        const mergedPosts = postsData.map((post: TextItem) => {
          const lowercaseUsername = post.Username.toLowerCase();
          const userDetails = userDetailsData.find((user: UserData) => {
            const lowercaseUser = user.Username.toLowerCase();
            return lowercaseUser === lowercaseUsername;
          });
          return {
            ...post,
            userDetails: userDetails || {}
          };
        });
        setUserPosts(mergedPosts.reverse());
      } else {
        console.error('Failed to fetch user posts or user details');
      }
    } catch (error) {
      console.error('Error fetching user posts or user details:', error);
    }finally {
      setRefreshing(false);
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchUserPostsData();
    }, [])
  );

  const handleLikePress = async (postId: number) => {
    let updatedLikedPosts = [...likedPosts];
    if (likedPosts.includes(postId)) {
      updatedLikedPosts = likedPosts.filter(id => id !== postId);
    } else {
      updatedLikedPosts.push(postId);
    }
    setLikedPosts(updatedLikedPosts);
    saveLikedPosts(updatedLikedPosts);
  };

  const isPostLiked = (postId: number) => {
    return likedPosts.includes(postId);
  };

  const onDoubleTap = (item: TextItem) => {
    const time = new Date().getTime();
    const delta = time - lastPress;
    const DOUBLE_PRESS_DELAY = 300;
  
    if (delta < DOUBLE_PRESS_DELAY) {
      handleLikePress(item.id);
    }
    setLastPress(time);
  };
  const saveLikedPosts = async (likedPosts: number[]) => {
    try {
      await AsyncStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    } catch (error) {
      console.error('Error saving liked posts:', error);
    }
  };

  const loadLikedPosts = async () => {
    try {
      const likedPostsString = await AsyncStorage.getItem('likedPosts');
      if (likedPostsString !== null) {
        const likedPostsArray = JSON.parse(likedPostsString);
        setLikedPosts(likedPostsArray);
      }
    } catch (error) {
      console.error('Error loading liked posts:', error);
    }
  };
    
  const renderItem = ({ item }: { item: TextItem & { userDetails: UserData } }) => {
    const { userDetails } = item;
    if (!userDetails) return null;
    return (
      <Pressable onPress={() => onDoubleTap(item)}>
      <View style={styles.itemContainer}>
        {renderPostItem({ username: item.Username, Name: userDetails.Name, profilePicture: userDetails.ImagePath })}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.Text}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.Date}</Text>
          <Pressable onPress={() => handleLikePress(item.id)}>
            <LikesIcon color={isPostLiked(item.id) ? 'red' : '#000000'} />
          </Pressable>
        </View>
      </View>
      </Pressable>
    );
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (userPosts.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>No Posts Yet</Text>
      </View>
    );
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchUserPostsData} />}>
    <FlatList
      initialNumToRender={5}
      data={userPosts}
      keyExtractor={(item: TextItem, index: number) => index.toString()}
      renderItem={renderItem}
      scrollEnabled={false}
    />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
