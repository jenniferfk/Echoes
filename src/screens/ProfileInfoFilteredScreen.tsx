import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainNavigatorStackList } from '../navigation/MainNavigator.type';
import { useNavigation } from '@react-navigation/native';
import ProfileInfo from '../organisms/ProfileInfo';
import { renderPostItem } from '../organisms/renderPostItem';

interface ProfileInfoFilteredScreenProps extends NativeStackScreenProps<MainNavigatorStackList, 'ProfileInfo'> {}

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
  Bio:string;
}

const ProfileInfoFilteredScreen: React.FC<ProfileInfoFilteredScreenProps> = ({ route }) => {
  const { username } = route.params;
  const [userPosts, setUserPosts] = useState<TextItem[] | null>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserData>({ Username: '', Name: '', ImagePath: '', Bio:'' });
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const userDetailsResponse = await fetch(`https://660fb86b356b87a55c52315f.mockapi.io/Logs?Username=${username}`);
      if (userDetailsResponse.ok) {
        const userDetailsData = await userDetailsResponse.json();
        const userData = userDetailsData.find((user: UserData) => user.Username === username);
        if (userData) {
          console.log('User Data:', userData);
          setProfileData(userData);
        }
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  const fetchUserPosts = async () => {
    try {
      const postsResponse = await fetch(`https://660fb86b356b87a55c52315f.mockapi.io/Posts?Username=${username}`);
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        const mergedPosts = postsData.map((post: TextItem) => {
          return {
            ...post,
            userDetails: profileData || {}
          };
        });
        setUserPosts(mergedPosts.reverse());
      } else {
        setUserPosts(null);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, []);

  const renderItem = ({ item }: { item: TextItem }) => {
    return (
      <View style={styles.itemContainer}>
        {renderPostItem({ username: item.Username, Name:  profileData.Name , profilePicture:  profileData.ImagePath })}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.Text}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.Date}</Text>
        </View>
      </View>
    );
  };
  
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
        <View style={styles.designcontainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backarrow}>←</Text>
        </Pressable>
        </View>
        <ProfileInfo
          name={profileData.Name} 
          bio={profileData.Bio} 
          profilePicture={profileData.ImagePath}
          username={profileData.Username}
          numberOfPosts={userPosts ? userPosts.length : 0}
          numberOfFollowers={userPosts ? userPosts.length*30 : 300}
          numberofFollowings={userPosts ? userPosts.length*12 : 100}
        />
        
         {userPosts === null ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No Posts Yet</Text>
        </View>
      ) : (
        userPosts.length > 0 && (
          <View style={styles.Listcontainer}>
            <FlatList
              initialNumToRender={5}
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              scrollEnabled={false} 
            />
          </View>))}
      </View>
    </ScrollView>
  );
};

export default ProfileInfoFilteredScreen;

const styles = StyleSheet.create({
  backarrow:{
    fontSize:30,
    fontWeight:'bold',
    position:'absolute',
    zIndex: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  Listcontainer: {
    marginLeft: 30
  },
  designcontainer: {
    height: 80,
    backgroundColor: '#D3D4EB',
    
  },
  username: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    margin: 10
  },

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
});