import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import {BASE_PATH_IMG} from '../utils/constants';
import {getNewsMoviesApi} from '../api/movie';
import {map} from 'lodash';
import usePreference from '../hooks/userPreference';

const {width} = Dimensions.get('window');

export default function News({navigation}) {
  const [movies, setMovies] = useState([]);
  const [btnMore, setBtnMore] = useState(true);
  const {theme} = usePreference();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getNewsMoviesApi(page).then(res => {
      const totalPages = res.total_pages;
      // setMovies(res.results);
      if (page < totalPages) {
        if (!movies) {
          setMovies(res.results);
        } else {
          setMovies([...movies, ...res.results]);
        }
      } else {
        setBtnMore(false);
      }
    });
  }, [page]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {map(movies, (movie, index) => (
          <Movie key={index} movie={movie} navigation={navigation} />
        ))}
      </View>
      {btnMore && (
        <Button
          mode="container"
          contentStyle={styles.loadMoreContainer}
          style={styles.loadMore} 
          labelStyle={{ color: theme === 'dark' ? '#FFF' : '#000' }}
          onPress={() => setPage(page + 1)}
          >
          Cargar mas
        </Button>
      )}
    </ScrollView>
  );
}

function Movie({movie, navigation}) {
  const {title, id, poster_path} = movie;
  const goMovie = () =>{
    navigation.navigate('movie', {id})
  }
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
      {poster_path ? (
        <Image
          style={styles.image}
          source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
        />
      ) : (
        <Text>{title}</Text>
      )}
    </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  }
});
