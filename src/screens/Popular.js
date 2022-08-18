import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {getPopularMoviesApi} from '../api/movie';
import {Text, Title, Button} from 'react-native-paper';
import {map} from 'lodash';
import {Rating} from 'react-native-ratings';
import {BASE_PATH_IMG} from '../utils/constants';
import defaultImg from '../assets/png/default.png';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';
import usePreference from '../hooks/userPreference';

export default function Popular(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState([]);
  const [btnMore, setBtnMore] = useState(true);
  const [page, setPage] = useState(1);
  const {theme} = usePreference();

  useEffect(() => {
    getPopularMoviesApi(page).then(res => {
      const totalPages = res.total_pages;
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
      {map(movies, (movie, index) => (
        <Movie key={index} movie={movie} theme={theme} navigation={navigation} />
      ))}
      {btnMore && (
        <Button
          mode="contained"
          contentStyle={styles.btnMore}
          style={styles.loadMore}
          labelStyle={{color: theme === 'dark' ? '#FFF' : '#000'}}
          onPress={() => setPage(page + 1)}>
          {movies ? 'Cargar mas ...' : 'Cargando...'}
        </Button>
      )}
    </ScrollView>
  );
}

function Movie({movie, theme, navigation}) {
  const { id, poster_path, title, release_date, vote_count, vote_average} = movie;
  const goMovie = () => {
    navigation.navigate('movie', {id})
  }
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        <View style={styles.left}>
          <Text>
            <Image
              style={styles.image}
              source={
                poster_path
                  ? {uri: `${BASE_PATH_IMG}/w500${poster_path}`}
                  : defaultImg
              }
            />
          </Text>
        </View>
        <View>
          <Title style={{fontSize: 17}}> {title} </Title>
          <Text> {release_date} </Text>
          <MovieRating
            theme={theme}
            voteCount={vote_count}
            voteAverage={vote_average}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function MovieRating({theme, voteCount, voteAverage}) {
  const media = (voteAverage / 2).toFixed(2);
  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starDark : starLight}
        ratingColor="#FFC205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#F0F0F0'}
        startingValue={media}
        imageSize={24}
        style={{marginRight: 15}}
      />
      <Text style={{fontSize: 12, color: '#8697A5'}}>{voteCount} votos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  movie: {
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginTop: -150,
    marginRight: 20,
  },
  right: {
    marginTop: -50,
  },
  image: {
    width: 120,
    height: 350,
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  btnMore: {
    padding: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});
