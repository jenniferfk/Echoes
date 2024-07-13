import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, Pressable, ScrollView, RefreshControl } from 'react-native';
import { MainNavigatorStackProp } from '../navigation/MainNavigator.type';
import { useNavigation } from '@react-navigation/native';
import TrendingNowView from '../atoms/TrendingNowView';


interface User {
  id: string;
  Username: string;
  ImagePath: string;
}

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const navigation=useNavigation<MainNavigatorStackProp>();
  const [refreshing, setRefreshing] = useState(false);

  const navigatetoprofileinfo = (username: string) => {
    navigation.navigate('ProfileInfo', { username });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const filtered = users.filter(user =>
      user.Username.toLowerCase().includes(searchQuery.toLowerCase()) && user.Username.toLowerCase() !== 'kminchelle' // since there is no other user that can login due to the api i did this, but otherwise i would fetch the name from the async storage like i did in the profileScreen
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('https://660fb86b356b87a55c52315f.mockapi.io/Logs');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }: { item: User }) => {
    return (
      <Pressable onPress={() => navigatetoprofileinfo(item.Username)}>
      <View style={styles.userContainer}>
        <View style={styles.profilePictureContainer}>
          {item.ImagePath ? (
            <Image source={{ uri: item.ImagePath }} style={styles.profilePicture} />
          ) : (
            <View style={styles.blueCircle} />
          )}
        </View>
        <View >
          <Text style={styles.username}>@{item.Username}</Text>
        </View>
      </View>
      </Pressable>
    );
  };
  


  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search users..."
      value={searchQuery}
      onChangeText={setSearchQuery}
      placeholderTextColor={'black'}
    />
    {searchQuery.length > 0 && (
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchUsers} />}
        contentContainerStyle={styles.flatListContainer}
      />
    )}
    <ScrollView>
    <TrendingNowView/>
    </ScrollView>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D3D4EB',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius:10,
    
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    color:'black'
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
  flatListContainer: {
    marginBottom:100 
  },
});

export default SearchScreen;
