import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DefaultHeader = ({ image, title, description }) => {
  return (
    <View style={styles.container}>
      {image && <Image source={image} style={styles.image} />}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});

export default DefaultHeader;
