import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

interface ProfileInfosProps {
  profilePicture?: string; 
  name: string;
  bio?: string;
  username: string;
  numberOfPosts: number; 
  numberOfFollowers: number;
  numberofFollowings:number
}

const ProfileInfo = ({ profilePicture, name, bio,username,numberOfPosts,numberOfFollowers,numberofFollowings  }: ProfileInfosProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
          <View style={styles.blueCircle} />
        )}
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>
        <View style={styles.numberOfPostsContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.numberOfPosts}>{numberOfPosts}</Text>
            <Text style={styles.postsLabel}>Posts</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.numberOfPosts}>{numberOfFollowers}</Text>
            <Text style={styles.postsLabel}>Followers</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.numberOfPosts}>{numberofFollowings}</Text>
            <Text style={styles.postsLabel}>Following</Text>
          </View>
        </View>
      </View>
      {bio && <Text style={styles.bio}>{bio}</Text>}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: -50,
    marginBottom: -30,
    borderBottomColor:'lightgray',
    borderBottomWidth: 0.3,
    zIndex: 1, 
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  blueCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#86d6f2',
  },
  userInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  username: {
    fontSize: 12,
    color: 'gray',
  },
  bio: {
    marginTop: 15,
    fontSize: 13,
    alignSelf: 'center',
    color: 'black',
    marginBottom: 20,
    fontStyle:'italic'
  },
  numberOfPostsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  numberOfPosts: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D3D4EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  postsLabel: {
    fontSize: windowWidth*0.02,
    marginLeft: 6,
    color: 'gray',
  },
  infoItem: {
    alignItems: 'center',
    marginRight: 20,
    marginLeft:20,
  },
});
export default ProfileInfo;
