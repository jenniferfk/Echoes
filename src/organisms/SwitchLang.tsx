import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'

const SwitchLang = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>('English (US)');

  const languages = [
    { id: 1, name: 'English (US)' },
    { id: 2, name: 'French' },
  ];
  const handleLanguageSelect = (language: string | null) => {
    setSelectedLanguage(language);
    setModalVisible(false); 
  };
  return (
    <>
    <View style={styles.languageContainer}>
    <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.languageText}>{selectedLanguage || 'Select Language'}</Text>
    </Pressable>
    </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select your language</Text>
            <FlatList
                data={languages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.languageItem}>
                    <Text style={styles.languageName}>{item.name}</Text>
                    <Pressable
                      style={[styles.tickButton, selectedLanguage === item.name && styles.selectedTickButton]}
                      onPress={() => handleLanguageSelect(item.name)}
                    >
                      {selectedLanguage === item.name && <Text style={styles.tick}>✓</Text>}
                    </Pressable>
                  </View>
                )}
              />
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default SwitchLang

const styles = StyleSheet.create({
    languageContainer: {
      top: 10,
      alignSelf: 'center',
      zIndex: 999,
    },
    languageText: {
      fontSize: 19,
      color: 'gray',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      backgroundColor:'#f7ebf1',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      top: 10,
    },
    languageItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor:'white',
      borderRadius:10
    },
    languageName: {
      fontSize: 16,
      color: 'black',
    },
    tickButton: {
      backgroundColor: '#ccc',
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedTickButton: {
      backgroundColor: 'blue',
    },
    tick: {
      color: 'white',
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      left: 8,
    },
    closeButtonText: {
      fontSize: 20,
      color: 'gray',
    },
  });