 import React from "react";
 import { View,Text,StyleSheet, Image } from "react-native";
 

  export const renderPostItem = ({  username, Name, profilePicture }: {  username: string, Name:string, profilePicture: string | null }) => {
    return (
        <View style={styles.postContainer}>
            <View style={styles.row}>
            <View style={[styles.profilePictureContainer, profilePicture ? null : styles.blueBackground]}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          ) : (
            <View style={styles.blueCircle} />
          )}
        </View>
            <View style={styles.profileContainer}>
                <Text style={styles.name}>{Name}  
                <Text style={styles.username}>   @{username}</Text>
                </Text>
            </View>
            </View>
        </View>
    );
};

 const styles = StyleSheet.create({
    profilePictureContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
      },
      profilePicture: {
        width: '100%',
        height: '100%',
      },
      blueBackground: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      },
      blueCircle: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: '#86d6f2',
      },
      row:{
        flexDirection: 'row',
      },
    postContainer: {
        padding: 10,
    },
    profileContainer: {
    },
    name: {
        margin:10,
        fontWeight: 'bold',
        marginBottom: 5,
        color:'black'
    },
    username: {
        fontSize: 12,
        color: 'gray',
    },
});
