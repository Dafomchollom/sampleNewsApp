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
import AppPaginationComponent from '../components/AppPaginationComponent';
export default function Home({ navigation }) {
  // const articles state
  const [articles, setArticles] = useState([]);
  // const articles pagination state
  const [currentPage, setCurrentPage] = useState(1);
  // payload State
  const [payload, setPayload] = React.useState({});
  // fetch articles function
  const fetchArticles = async (page) => {
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news?page=${page}&limit=10`
      );
      setArticles(res.data);
    } catch (e) {
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
    } catch (e) {
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  // delete comments
  const deleteNewsHandler = async (id) => {
    try {
      await axios.delete(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments/${payload.id}`,
        payload
      );
      Alert.alert('Success!', 'your News has been Deleted successfully', [
        {
          text: 'UnderStood',
        },
      ]);
      setMode('create');
      setPayload({});
      getCommentHandler(newsId);
    } catch (e) {
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  //swipe actions article
  const swipeActionsHandler = (item, action) => {
    setPayload(item);
    if (action === 'Edit') {
      navigation.navigate('Create', {
        mode: 'Edit',
        obj: item.item,
      });
    } else {
      deleteNewsHandler(item.item.id);
    }
  };
  // pagination handler
  const paginationHandler = (currPage) => {
    if (parseInt(currPage) === 0) {
      setCurrentPage((page) => (page <= 1 ? 1 : page - 1));
    }

    if (parseInt(currPage) === 2) {
      setCurrentPage((page) => page + 1);
    }
  };
  // fetch articles on mounted
  useEffect(() => {
    fetchArticles(currentPage);
  }, []);

  //   fetch article on page change
  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);
  // swippable component wrapper
  const AppSwipeComponentWrapper = (item, index) => {
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
      <Button
        title="Create News"
        onPress={() =>
          navigation.navigate('Create', {
            mode: 'create',
            obj: {},
          })
        }
      />
      <Text style={styles.title}>Latest News</Text>

      <AppPaginationComponent
        onClick={paginationHandler}
        currentPage={currentPage}
      />
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
    marginVertical: 10,
  },
  content: {},
  listContainer: {
    paddingBottom: 100,
    marginTop: 0,
  },
});
