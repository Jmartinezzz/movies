import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import {BASE_PATH_IMG} from '../utils/constants';
import {searchMovieApi} from '../api/movie';
import {Searchbar} from 'react-native-paper';
import {size, map} from 'lodash';

const {width} = Dimensions.get('window');

export default function Search({navigation}) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('poke');

  useEffect(() => {
    if (size(search) > 2) {
      searchMovieApi(search).then(res => {
        setMovies(res.results);
      });
    }
  }, [search]);

  
  return (
    <SafeAreaView>
      <Searchbar
        style={styles.input}
        placeholder="Busca tu pelicula"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        icon='arrow-left'
        value={search}
        onChange={(e) => setSearch(e)}
      />
      <ScrollView>
        <View style={styles.container}>
          { map(movies, (movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie({movie, navigation}) {
  const { poster_path, title, id } = movie
  const goMovie = () => {
    navigation.navigate('movie', {id})
  }
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image style={styles.image} source={{ uri: `${BASE_PATH_IMG}/w500${poster_path}`}} />
        ) : (<Text>{title}</Text>)}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212B',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width /2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
