import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, PanResponder, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainDrawerNavigatorNavigationProp } from '../navigation/MainNavigator.type';
import Spiral from '../assets/svgIcons/Spiral';
const AboutUs = () => {
  const navigation = useNavigation<MainDrawerNavigatorNavigationProp>();

  return (
    <View style={styles.container}>
    <ScrollView>
      <Text style={styles.aboutustitle}>About us</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </Pressable>
      <View style={styles.spiralContainer}>
        <Spiral />
        <Spiral />
        <Spiral />
        <Spiral />
        <Spiral />
        <Spiral />
        <Spiral />
      </View>
      <View style={styles.mainview}>
      <View style={[styles.topcontentContainer, styles.glowingBorder]}>
        <Text style={[styles.title, styles.text]}>About Echoes</Text>
        <Text style={[styles.description, styles.text]}>
          Welcome to Echoes, the platform where your thoughts resonate! Echoes
          is more than just a social media app; it's a space where users can
          freely express themselves through words and share their innermost
          thoughts with the world.
        </Text>
      </View>
      
      <View style={[styles.contentContainer, styles.glowingBorder]}>
      <Text style={[styles.subtitle, styles.text]}>Our Mission</Text>
        <Text style={[styles.description, styles.text]}>
          At Echoes, our mission is to provide a safe and inclusive environment
          where individuals from all walks of life can connect, engage, and
          express themselves without fear of judgment. We believe in the power
          of words to inspire, educate, and empower, and we strive to foster
          meaningful connections through the stories, ideas, and experiences
          shared on our platform.
        </Text>
      </View>
      <View style={[styles.contentContainer, styles.glowingBorder]}>
      <Text style={[styles.subtitle, styles.text]}>Features</Text>
        <Text style={[styles.feature, styles.text]}>
          - Thought Sharing: Echoes allows users to post their thoughts, ideas,
          and reflections in the form of text posts.
        </Text>
        <Text style={[styles.feature, styles.text]}>
          - Community Interaction: Engage with other users by liking,
          commenting, and sharing their posts.
        </Text>
        <Text style={[styles.feature, styles.text]}>
          - Anonymity: Echoes offers the option for users to post anonymously,
          allowing individuals to express themselves freely.
        </Text>
        <Text style={[styles.feature, styles.text]}>
          - Customization: Personalize your Echoes experience with customizable
          profiles and preferences.
        </Text>
        <Text style={[styles.feature, styles.text]}>
          - Safety and Moderation: Echoes is committed to maintaining a
          positive and respectful environment for all users.
        </Text>
      </View>
      </View>
      <View style={styles.spiralContainer}>
        <Spiral />
        <Spiral />
        <Spiral />
        <Spiral />
        <Spiral />
        <Spiral />
        <Spiral />
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D4EB', 
  },
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
  topcontentContainer:{
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    top:20,
    marginBottom:100
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom:100
  },
  mainview:{
  justifyContent:'center',
  alignItems:'center'
  },
  text: {
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  feature: {
    fontSize: 16,
    marginBottom: 5,
  },
  glowingBorder: {
    shadowColor: '#c472f7', 
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10, 
  },
  spiralContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default AboutUs