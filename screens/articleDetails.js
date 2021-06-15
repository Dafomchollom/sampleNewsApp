import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import AppHeader from '../components/AppHeaderComponent';
import axios from 'axios';
import AppArticleCardComponent from '../components/AppArticleCardComponent';
import Carousel from '../components/AppCarouselComponent';
import { Card } from 'react-native-elements';
import AppCommentComponent from '../components/AppCommentComponent';
export default function Home({ route }) {
  // get newsId param
  const { newsId } = route.params;
  // const news state
  const [news, setNews] = useState({});
  // const news state
  const [comments, setComments] = useState([]);
  // const news state
  const [newsImage, setNewsImage] = useState([]);
  // fetch news function
  const fetchArticles = async (id) => {
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}`
      );
      (res.data, '::::: news :::::::');
      // set news state with response
      setNews(res.data);
    } catch (e) {
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  // fetch comments function
  const fetchComments = async (id) => {
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments`
      );
      // set news state with response
      setComments(res.data);
    } catch (e) {
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
      // set news image state with response
      setNewsImage(res.data);
    } catch (e) {
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  // fetch articles on mounted
  useEffect(() => {
    // fetch articles
    fetchArticles(newsId);
    // fetch article images
    fetchArticlesImages(newsId);
    //fetch comments
    fetchComments(newsId);
  }, [newsId]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView>
          <View style={styles.body}>
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.author}>{news.author}</Text>
            <Carousel images={newsImage} />
            <Text>{news.body}</Text>
            <Card.Divider />
            <View>
              <Text>Date: {news.createdAt}</Text>
            </View>
          </View>
          <View>
            <AppCommentComponent newsId={newsId} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    elevation: 0,
    borderWidth: 0,
  },
  body: {
    color: '#000',
    backgroundColor: '#fff',
    marginVertical: 20,
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    borderWidth: 0,
    marginBottom: 5,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    opacity: 0.5,
  },
});
