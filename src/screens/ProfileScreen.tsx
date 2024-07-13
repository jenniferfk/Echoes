import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileInfo from '../organisms/ProfileInfo';
import UserPostsList from '../organisms/UserPostsList';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>({
    Name: null,
    ImagePath: null,
    Username: null,
    Bio: 'Sharing My thoughts Through Echoes'
  });

  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);
          setProfileData({
            Name: parsedData.firstName,
            ImagePath: parsedData.image,
            Username: parsedData.username,
            Bio: 'Sharing My thoughts Through Echoes'
          });
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!profileData.Username) {
          return;
        }
  
        const response = await fetch(`https://660fb86b356b87a55c52315f.mockapi.io/Posts?Username=${profileData.Username}`);
        if (response.ok) {
          const data = await response.json();
          setUserPosts(data);
        } else {
          console.error('Failed to fetch user posts');
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserPosts();
  }, [profileData.Username]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <View style={styles.designcontainer}></View>
        <ProfileInfo
          name={profileData.Name}
          bio={profileData.Bio}
          profilePicture={profileData.ImagePath}
          username={profileData.Username}
          numberOfPosts={userPosts ? userPosts.length : 0}
          numberOfFollowers={userPosts ? userPosts.length*54: 100}
          numberofFollowings={userPosts ? userPosts.length*20 : 60}
        />
        <View style={styles.Listcontainer}>
          <UserPostsList />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Listcontainer: {
    marginLeft: 30
  },
  designcontainer: {
    height: 80,
    backgroundColor: '#D3D4EB'
  },
  username: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    margin: 10
  }
});
