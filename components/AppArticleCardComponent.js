import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

const ArticleCard = ({ data }) => {
  // tream article for card function
  const trimhandler = (data) => {
    return `${data?.substring(0, 100)}... ${'Continue Reading'}`;
  };

  return (
    <Card containerStyle={styles.container} borderWidth={0}>
      <View style={styles.cardBody}>
        <Text style={styles.title}>{data?.item?.title}</Text>
        <Text style={styles.author}>{data?.item?.author}</Text>
        <Text>{trimhandler(data?.item?.body)}</Text>
      </View>
    </Card>
  );
};
// styles
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
  cardBody: {
    borderWidth: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    borderWidth: 0,
    marginBottom: 5,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 10,
    opacity: 0.5,
  },
});
export default ArticleCard;
