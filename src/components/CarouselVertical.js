import React, {useState, useEffect} from 'react';
import {  
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, Title } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel-v4';
import { BASE_PATH_IMG } from '../utils/constants';
import {getGenreMovieApi} from '../api/movie'
import {map, size} from 'lodash'
import userPreference from '../hooks/userPreference';

const { width } = Dimensions.get('window')
const ITEM_WIDTH = Math.round(width * 0.7)

export default function CarouselVertical(props) {
  const {data, navigation} = props;
  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={item => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  )
}

function RenderItem(props) {
  const { data, navigation } = props;
  const { title, poster_path, genre_ids, id } = data.item
  const [genres, setGenres] = useState(null)
  const imgUrl = `${BASE_PATH_IMG}/w500${poster_path}`

  const {theme} = userPreference()

  useEffect(() => {
    getGenreMovieApi(genre_ids).then(res => {
      setGenres(res)
    })
  }), []

  const onNavigation = () => {
    navigation.navigate('movie', {id})
  }

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}> 
        <Image style={styles.image} source={{uri: imgUrl}}></Image>
        <Title style={[styles.title, {color: theme === 'dark' ? '#FFF' : '#000'}]}>{title}</Title>
        <View style={styles.genres}>
          {genres && (
              map(genres, (genre, index)=>(
                <Text key={index} style={styles.genre}>
                  {genre}
                  {index !== size(genres) -1 && ', '}
                </Text>
              ))
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width:0,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 10
  },
  image: {
    width: '100%',
    height: 450,
    borderRadius: 20
  },
  title: {
    marginHorizontal: 10,
    marginTop:10
  },
  genres: {
    flexDirection: 'row',
    marginHorizontal: 10
  },
  genre: {
    fontsize: 10,
    color: '#8967A5'
  }
});
