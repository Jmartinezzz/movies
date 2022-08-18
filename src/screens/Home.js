import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';
import {
  getNewsMoviesApi,
  getAllGenresApi,
  getGenreMoviesApi,
} from '../api/movie';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';
import {map} from 'lodash';
import usePreference from '../hooks/userPreference';

export default function Home(props) {
  const [newMovies, setNewMovies] = useState(null);
  const {navigation} = props;
  const [genreList, setGenreList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [genreMovies, setGenreMovies] = useState();
  const {theme} = usePreference();

  useEffect(() => {
    (async () => {
      const awesome_value = await getNewsMoviesApi();
      setNewMovies(awesome_value.results);
    })();
  }, []);

  useEffect(() => {
    getAllGenresApi().then(res => {
      setGenreList(res.genres);
    });
  }, []);

  useEffect(() => {
    getGenreMoviesApi(genreSelected).then(res => {
      setGenreMovies(res.results);
    });
  }, [genreSelected]);

  const onChangeGenre = newGenreId => {
    setGenreSelected(newGenreId);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title
            style={[
              styles.newsTitle,
              {color: theme == 'dark' ? '#FFF' : '#000'},
            ]}>
            {' '}
            nuevas peliculas
          </Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}
      <View style={styles.genres}>
        <Title
          style={[
            styles.genresTitle,
            {color: theme == 'dark' ? '#FFF' : '#000'},
          ]}>
          Peliculas por genero
        </Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}>
          {map(genreList, genre => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                {color: genre.id !== genreSelected ? '#8697A5' : theme == 'dark' ? '#FFF' : '#000'},
              ]}
              onPress={() => onChangeGenre(genre.id)}>
              {genre.name}
            </Text>
          ))}
        </ScrollView>
        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
