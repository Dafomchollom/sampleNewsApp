import React from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
// import { Constants } from 'expo';

const { width } = Dimensions.get('window');
const height = width * 0.8;

const Carousel = ({ images }) => {
  const windowWidth = useWindowDimensions().width - 50;
  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item?.image }}
      key={item.id}
      style={{
        width: 260,
        height: 300,
        borderWidth: 1,
        borderColor: '#888',
        margin: 4,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={{ height: 350 }}>
          <FlatList
            data={images}
            horizontal
            style={{ width: windowWidth }}
            renderItem={renderImage}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
  },
  scrollContainer: {
    height: height,
    width: width,
  },
  image: {
    width: 200,
    height: 200,
  },
});
export default Carousel;
