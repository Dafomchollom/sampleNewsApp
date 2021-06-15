import React, { useState, useEffect } from "react";
import { Card, ListItem, Button, Icon, Input } from "react-native-elements";
import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AppSwipeComponent from "../components/AppSwipeComponent";

const CommentComponent = ({ newsId }) => {
  const Comments = ({ data }) => (
    <Card style={styles.commentContainer}>
      <View>
        <Text style={styles.name}>{data?.item.name}</Text>
        <Text style={styles.body}>{data?.item.comment}</Text>
      </View>
    </Card>
  );
  // swippable component wrapper
  const AppSwipeComponentWrapper = (item, index) => {
    console.log(item, ":::::: item item :::::::");
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
  // payload State
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // handle form handleFormOnChange two way binding
  const handleFormOnChange = (value) => {
    const mutatedPayload = { ...payload, [value.key]: value.value };
    console.log(mutatedPayload, "value");
    setPayload({ ...mutatedPayload });
  };
  //swipe actions article
  const swipeActionsHandler = (action, item) => {
    console.log(action, "i have been clicked", item);
  };
  // add comment
  const addCommentHandler = async (id) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments`,
        payload
      );
      setIsSubmitting(false);
      Alert.alert("Success!", "your comment has been posted successfully", [
        {
          text: "UnderStood",
        },
      ]);
    } catch (e) {
      setIsSubmitting(false);
      Alert.alert("Oops!", e.message, [
        {
          text: "UnderStood",
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
      console.log(res.data, "::: get comments res ::::");
      setCommentsList(res.data);
    } catch (e) {
      Alert.alert("Oops!", e.message, [
        {
          text: "UnderStood",
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
        onChangeText={(value) => {
          handleFormOnChange({ value, key: "name" });
        }}
      />
      <Input
        placeholder="type here"
        label="Body"
        required
        // value={comment}
        // errorMessage={errors.comment && "Enter Comment"}
        // leftIcon={{ type: 'font-awesome', name: 'comment' }}
        // style={styles}
        onChangeText={(value) => {
          handleFormOnChange({ value, key: "body" });
        }}
      />
      <Button
        title="submit"
        loading={isSubmitting}
        icon={{ name: "add", color: "white" }}
        buttonStyle={{ height: 50 }}
        onPress={() => addCommentHandler(newsId)}
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
    flex: 1,
    // backgroundColor: "#fff",
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#0000",
    // textAlign: 'center',
  },
  body: {
    color: "#000",
  },
  commentContainer: {
    margin: 0,
    justifyContent: "center",
    height: "auto",
    padding: 10,
  },
});
export default CommentComponent;
