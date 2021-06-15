import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import AppArticleCardComponent from '../components/AppArticleCardComponent';
import AppSwipeComponent from '../components/AppSwipeComponent';

export default function Home({ navigation }) {
  // const articles state
  const [articles, setArticles] = useState([]);
  // fetch articles function
  const fetchArticles = async () => {
    try {
      const res = await axios.get(
        'https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news?page=1&limit=10'
      );
      setArticles(res.data);
      console.log('res.data:::', res.data);
    } catch (e) {
      console.log(e.message, 'error message');
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  //delete function
  const deleteArticle = async () => {
    try {
      const res = await axios.delete(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/`
      );
      setArticles(res.data);
      console.log('res.data:::', res.data);
    } catch (e) {
      console.log(e.message, 'error message');
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  //swipe actions article
  const swipeActionsHandler = (action, item) => {
    console.log(action, 'i have been clicked', item);
  };
  // fetch articles on mounted
  useEffect(() => {
    fetchArticles();
  }, []);
  // swippable component wrapper
  const AppSwipeComponentWrapper = (item, index) => {
    console.log(item, ':::::: item item :::::::');
    return (
      <AppSwipeComponent onClick={swipeActionsHandler.bind(this, item)}>
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate('Details', {
              newsId: item?.item?.id,
            })
          }
        >
          <AppArticleCardComponent data={item} />
        </TouchableOpacity>
      </AppSwipeComponent>
    );
  };
  return (
    <View style={styles.container}>
      {/* <AppHeader /> */}
      <Text style={styles.title}>Latest News</Text>

      {/* <ScrollView style={styles.listContainer}>
        <View style={styles.content}>
          <View style={styles.list}>
            {articles.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('Details', {
                    newsId: item.id,
                  })
                }
              >
                <AppArticleCardComponent data={item} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.Button}>
          <Button title="update name" />
        </View>
      </ScrollView> */}
      <FlatList
        data={articles}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <AppSwipeComponentWrapper item={item} index={index} />
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    // textAlign: 'center',
    marginVertical: 10,
  },
  content: {
    // backgroundColor: "red",
  },
  listContainer: {
    paddingBottom: 100,
    marginTop: 0,
  },
});
