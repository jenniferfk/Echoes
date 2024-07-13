import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, SectionList, Animated } from 'react-native';
import UseOfAppView from '../atoms/UseOfAppView';
import Privacy from '../atoms/Privacy';
import IntellectualPropertyView from '../atoms/IntellectualPropertyView';
import TerminationView from '../atoms/TerminationView';
import ChangesToTermsView from '../atoms/ChangesView';
import { useNavigation } from '@react-navigation/native';
import { MainDrawerNavigatorNavigationProp } from '../navigation/MainNavigator.type';

interface Section {
  title: string;
  data: string[];
}

const TermsOfService = () => {
  const [sections, setSections] = useState<Section[]>([
    { title: 'Use of the App', data: ['eligibility'] },
    { title: 'Privacy', data: ['privacy'] },
    { title: 'Intellectual Property', data: ['intellectualProperty'] },
    { title: 'Termination', data: ['termination'] },
    { title: 'Changes To Terms', data: ['changesToTerms'] },
  ]);

  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    eligibility: false,
    privacy: false,
    intellectualProperty: false,
    termination: false,
    changesToTerms: false,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections({
      ...expandedSections,
      [sectionKey]: !expandedSections[sectionKey],
    });
  };

  const renderSectionContent = (sectionKey: string) => {
    const opacity = expandedSections[sectionKey] ? new Animated.Value(0) : new Animated.Value(1);
    Animated.timing(opacity, {
      toValue: expandedSections[sectionKey] ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View style={{ opacity }}>
        {expandedSections[sectionKey] && getContentComponent(sectionKey)}
      </Animated.View>
    );
  };

  const getContentComponent = (sectionKey: string) => {
    switch (sectionKey) {
      case 'eligibility':
        return <UseOfAppView />;
      case 'privacy':
        return <Privacy />;
      case 'intellectualProperty':
        return <IntellectualPropertyView />;
      case 'termination':
        return <TerminationView />;
      case 'changesToTerms':
        return <ChangesToTermsView />;
      default:
        return null;
    }
  };

  const navigation = useNavigation<MainDrawerNavigatorNavigationProp>();

  return (
    <View style={styles.container}>
      <View >
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </Pressable>
        <Text style={styles.TermsTitle}>Terms Of Service</Text>
      </View>
      
      <Text style={styles.phrase}>
        We're committed to transparency and fairness in our Terms of Service.
      </Text>
  
      <View style={styles.scrollview}>
        <SectionList
          sections={sections}
          renderItem={({ item }) => renderSectionContent(item)}
          renderSectionHeader={({ section }) => (
            <Pressable onPress={() => toggleSection(section.data[0])}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.expandButton}>
                  {expandedSections[section.data[0]] ? '-' : '+'}
                </Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item, index) => item + index}
          stickySectionHeadersEnabled={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D4EB',
    padding: 20,
  },
  scrollview: {
    justifyContent: 'center',
    top: 20,
    flex:1
  },
  TermsTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf:'center'
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  expandButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c472f7',
  },
  phrase: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333', 
    marginTop: 10, 
    textAlign:'justify',
    top:15,
    bottom:15,
  },
});

export default TermsOfService;
