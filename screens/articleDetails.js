import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AppHeader from '../components/AppHeaderComponent';
import axios from 'axios';
import AppArticleCardComponent from '../components/AppArticleCardComponent';
import Carousel from '../components/AppCarouselComponent';
import { Card } from 'react-native-elements';

export default function Home({ route }) {
  // get newsId param
  const { newsId } = route.params;
  // const news state
  const [news, setNews] = useState({});
  // const news state
  const [newsImage, setNewsImage] = useState([]);
  // fetch news function
  const fetchArticles = async (id) => {
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}`
      );
      console.log(res.data, '::::: news :::::::');
      // set news state with response
      setNews(res.data);
    } catch (e) {
      console.log(e.message, 'error message');
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  // fetch news image function
  const fetchArticlesImages = async (id) => {
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/images`
      );
      //   console.log(res.data, '::::: news images :::::::');
      // set news image state with response
      setNewsImage(res.data);
    } catch (e) {
      console.log(e.message, 'error message');
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  // fetch articles on mounted
  useEffect(() => {
    fetchArticles(newsId);
    fetchArticlesImages(newsId);
  }, [newsId]);
  return (
    <View style={styles.container}>
      <Carousel images={newsImage} />
      <View style={styles.body}>
        <Text>{news.body} hi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    elevation: 0,
    borderWidth: 0,
  },
  body: {
    color: '#000',
    marginVertical: 20,
  },
});
