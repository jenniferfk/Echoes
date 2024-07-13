import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const TrendingNowView = () => {
  const trendingTopics = [
    { topic: '#COVID19Updates', posts: 54321 },
    { topic: '#Cryptocurrency', posts: 43210 },
    { topic: '#CelebrityGossip', posts: 32109 },
    { topic: '#MovieAndTVShows', posts: 21098 },
    { topic: '#SportsEvents', posts: 10987 },
    { topic: '#FashionTrends', posts: 9876 },
    { topic: '#HealthyLiving', posts: 8765 },
    { topic: '#TechNews', posts: 7654 },
    { topic: '#TravelAdventures', posts: 6543 },
    { topic: '#FoodieFinds', posts: 5432 },
    { topic: '#DIYProjects', posts: 4321 },
    { topic: '#PhotographyTips', posts: 3210 },
    { topic: '#FitnessMotivation', posts: 2109 },
    { topic: '#BookRecommendations', posts: 1098 },
    { topic: '#GamingCommunity', posts: 987 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending Now</Text>
      {trendingTopics.map((item, index) => (
        <View key={index} style={styles.trendingItem}>
          <Text style={styles.topic}>{item.topic}</Text>
          <Text style={styles.postCount}>{item.posts} Posts</Text>
        </View>
      ))}
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight*0.028,
  },
  rank: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c472f7',
  },
  topic: {
    flex: 1,
    fontSize: windowWidth*0.03,
    color: '#333',
  },
  postCount: {
    fontSize: windowWidth*0.025,
    color: '#666',
  },
});

export default TrendingNowView;
