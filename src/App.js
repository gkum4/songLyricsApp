import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height'
import api from './services/api';

import backgroundImage from './assets/backgroundImage.png';

const App = () => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGoButton(artistName, songName) {
    setLoading(true);
    artistName = artistName.toLowerCase();
    songName = songName.toLowerCase();
    try {
      const response = await api.get(`/${artistName}/${songName}`, { headers: { 'Content-Type': 'application/json' }});
      setLyrics(response.data.lyrics);
    } catch (err) {
      setLyrics('Ocorreu algum problema 😢. Cheque se o nome do artista e o nome da música estão corretos.');
    }
    setLoading(false);
  }

  function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  function Content() {
    if (lyrics !== '') {
      return (
        <>
          <Text style={styles.lyricsTitleText}>{lyrics !== '' && `${capitalizeWords(artist)} - ${capitalizeWords(song)}`}</Text>
          <Text style={styles.lyricsText}>{lyrics}</Text>
          <View style={{height: 70}}/>
          {lyrics !== 'Ocorreu algum problema 😢. Cheque se o nome do artista e o nome da música estão corretos.' && (
            <>
              <Text style={styles.lyricsText}>END</Text>
              <View style={{height: 70}}/>
            </>
          )}
        </>
      );
    } else {
      return (
        <Text style={styles.lyricsText}>Escolha um artista e uma música</Text>
      );
    }
  }

  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <View style={styles.background}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topContainer}>
              <Text style={styles.titleText}>Song Lyrics App</Text>
            </View>
            <View style={styles.lyricsContainer}>
              {loading ? (
                <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <ActivityIndicator size="large" color="#999" />
                </View>
              ) : <Content />}
              
            </View>
            
          </ScrollView>
          
        </View>
        <View style={styles.searchContainer}>
            <TextInput 
              placeholder="Artista"
              placeholderTextColor="#c1c1c1"
              value={artist}
              autoCorrect={false}
              onChangeText={(text) => setArtist(text)}
              style={styles.textInput}
            />
            <TextInput 
              placeholder="Música"
              placeholderTextColor="#c1c1c1"
              value={song}
              autoCorrect={false}
              onChangeText={(text) => setSong(text)}
              style={styles.textInput}
            />
            <TouchableOpacity style={styles.goButton} onPress={() => handleGoButton(artist, song)}>
              <Text style={styles.goButtonText}>GO</Text>
            </TouchableOpacity>
          </View>
      </View>
    </>
  )
}

export default App;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: '#000'
  },
  container: {
    flex: 1,
    paddingTop: 40 + getStatusBarHeight(true),
    minHeight: '100%',
    paddingHorizontal: 15,
  },
  topContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  titleText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  searchContainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#252525',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  textInput: {
    height: 40,
    width: '40%',
    fontSize: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.166)',
    textAlign: 'center',
    marginRight: 10,
    color: '#fff',
  },
  goButton: {
    backgroundColor: '#03A9F4',
    height: 45,
    width: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  lyricsContainer: {
    borderRadius: 8,
    backgroundColor: '#444444',
    padding: 15,
  },
  lyricsText: {
    fontSize: 14,
    color: '#fff',
  },
  lyricsTitleText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  }
});