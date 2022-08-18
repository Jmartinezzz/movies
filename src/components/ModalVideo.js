import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Platform} from 'react-native';
import {Modal, IconButton, Title} from 'react-native-paper';
import YouTube from 'react-native-youtube';
import {getVideoMovieApi} from '../api/movie';
import {WebView} from 'react-native-webview';

export default function ModalVideo(props) {
  const [video, setVideo] = useState(null);
  const {show, setShow, idMovie} = props;

  useEffect(() => {
    getVideoMovieApi(idMovie).then(response => {
      let idvideo = null;
      response.results.forEach(video => {
        if (video.site === 'YouTube' && !idvideo) {
          idvideo = video.key;
        }
      });
      setVideo(idvideo);
    });
  });

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {Platform.OS == 'ios' ? (
        <YouTube
          videoId={video}
          style={styles.video}
          apiKey="AIzaSyAIGlJiM4e8zrQyeyl6jEw5C34EKQPMKR4"
        />
      ) : (
        <WebView
          style={{width: 500}}
          source={{uri: `https://www.youtube.com/embed/${video}?controls=0&showInfo=0` }}
        />
      )}      
      <IconButton
        Icon="close"
        onPress={() => setShow(false)}
        style={styles.close}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '120%',
    alignItems: 'center',
  },
  close: {
    backgroundColor: '#1EA1F2',
    color: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 100,
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});
