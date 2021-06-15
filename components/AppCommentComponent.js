import React, { useState, useEffect } from 'react';
import { Card, ListItem, Button, Icon, Input } from 'react-native-elements';
import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AppSwipeComponent from '../components/AppSwipeComponent';

const CommentComponent = ({ newsId }) => {
  const Comments = ({ data }) => (
    <Card style={styles.commentContainer}>
      <View>
        <Text style={styles.body}>{data?.item.name}</Text>
        <Text style={styles.body}>{data?.item.comment}</Text>
      </View>
    </Card>
  );
  // swippable component wrapper
  const AppSwipeComponentWrapper = (item, index) => {
    return (
      <AppSwipeComponent onClick={swipeActionsHandler.bind(this, item)}>
        <TouchableOpacity key={index}>
          <Comments data={item} />
        </TouchableOpacity>
      </AppSwipeComponent>
    );
  };
  // payload State
  const [payload, setPayload] = React.useState({});
  // comments State
  const [commentList, setCommentsList] = React.useState([]);
  // issubmitting State
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // payload State
  const [mode, setMode] = React.useState('create');
  // handle form handleFormOnChange two way binding
  const handleFormOnChange = (value) => {
    const mutatedPayload = { ...payload, [value.key]: value.value };
    setPayload({ ...mutatedPayload });
  };
  //swipe actions article
  const swipeActionsHandler = (item, action) => {
    setPayload(item.item);
    if (action === 'Delete') deleteCommentHandler(newsId);
    else setMode('edit');
  };
  // add comment
  const commentHandler = async (id) => {
    setIsSubmitting(true);
    const url =
      mode === 'create'
        ? `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments`
        : `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments/${payload.id}`;
    const axiosMode = mode === 'create' ? axios.post : axios.put;
    try {
      const res = await axiosMode(url, {
        ...payload,
        avatar: 'http://lorempixel.com/640/480/fashion',
      });
      setIsSubmitting(false);
      setMode('create');
      setPayload({});
      getCommentHandler(newsId);
      Alert.alert('Success!', 'your comment has been posted successfully', [
        {
          text: 'UnderStood',
        },
      ]);
    } catch (e) {
      setIsSubmitting(false);
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  // get all comments
  const getCommentHandler = async (id) => {
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments`,
        payload
      );
      setCommentsList(res.data);
    } catch (e) {
      Alert.alert('Oops!', e.message, [
        {
          text: 'UnderStood',
        },
      ]);
    }
  };
  // delete comments
  const deleteCommentHandler = async (id) => {
    try {
      await axios.delete(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments/${payload.id}`,
        payload
      );
      Alert.alert('Success!', 'your comment has been Deleted successfully', [
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
  React.useState(() => {
    getCommentHandler(newsId);
  }, []);
  return (
    // comment form
    <Card>
      <Input
        label="Name"
        placeholder="Your Name?"
        required
        value={payload.name}
        onChangeText={(value) => {
          handleFormOnChange({ value, key: 'name' });
        }}
      />
      <Input
        placeholder="type here"
        label="Body"
        required
        value={payload.comment}
        // errorMessage={errors.comment && "Enter Comment"}
        // leftIcon={{ type: 'font-awesome', name: 'comment' }}
        // style={styles}
        onChangeText={(value) => {
          handleFormOnChange({ value, key: 'comment' });
        }}
      />
      <Button
        title="submit"
        loading={isSubmitting}
        icon={{ name: 'add', color: 'white' }}
        buttonStyle={{ height: 50 }}
        onPress={() => commentHandler(newsId)}
      />
      {/* <FlatList
        data={commentList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <AppSwipeComponentWrapper item={item} index={index} key={index} />
        )}
        keyExtractor={(item, index) => `message ${index}`}
      /> */}
      {commentList.length > 0 &&
        commentList.map((item, index) => (
          <AppSwipeComponentWrapper item={item} index={index} key={index} />
        ))}
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 0,
    margin: 0,
  },
  name: {
    // fontWeight: 'bold',
    // fontSize: 15,
    color: '#0000',
    // textAlign: 'center',
  },
  body: {
    color: '#000',
  },
  commentContainer: {
    margin: 0,
    justifyContent: 'center',
    height: 'auto',
    padding: 10,
  },
});
export default CommentComponent;
