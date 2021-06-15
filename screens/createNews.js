import React from 'react';
import { Card, Input, Button } from 'react-native-elements';
import { StyleSheet, Text, View, Alert } from 'react-native';
import axios from 'axios';

const CreateNews = ({ route, navigation }) => {
  // get obj param
  const { obj, mode } = route.params;
  // payload State
  const [payload, setPayload] = React.useState({});
  // issubmitting State
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // handle form handleFormOnChange two way binding
  const handleFormOnChange = (value) => {
    const mutatedPayload = { ...payload, [value.key]: value.value };
    setPayload({ ...mutatedPayload });
  };
  // news handler
  const newsHandler = async () => {
    setIsSubmitting(true);
    const url =
      mode === 'create'
        ? `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news`
        : `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${payload.id}`;
    const axiosMode = mode === 'create' ? axios.post : axios.put;
    try {
      await axiosMode(url, {
        ...payload,
      });
      setIsSubmitting(false);
      setPayload({});
      navigation.navigate('Create');
      Alert.alert('Success!', 'your news has been posted successfully', [
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
  React.useEffect(() => {
    setPayload(obj);
  }, [obj]);
  return (
    <View>
      <Input
        placeholder="Enter your Name"
        label="Author"
        required
        value={payload.author}
        onChangeText={(value) => {
          handleFormOnChange({ value, key: 'author' });
        }}
      />
      <Input
        placeholder="title"
        label="Title"
        required
        value={payload.title}
        onChangeText={(value) => {
          handleFormOnChange({ value, key: 'title' });
        }}
      />
      <Input
        placeholder="News Body"
        label="Body"
        required
        multiline
        value={payload.body}
        numberOfLines={5}
        onChangeText={(value) => {
          handleFormOnChange({ value, key: 'body' });
        }}
      />
      <Button
        title="submit"
        loading={isSubmitting}
        icon={{ name: 'add', color: 'white' }}
        buttonStyle={{ height: 50 }}
        onPress={() => newsHandler()}
      />
    </View>
  );
};

export default CreateNews;
