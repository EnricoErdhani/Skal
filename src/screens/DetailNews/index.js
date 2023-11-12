import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { ArrowLeft, Like1, Receipt21, Message, Share, More, Heart } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { flatlist } from '../../../data';
const DetailNews = ({ route }) => {
  const { blogId } = route.params;
  const [iconStates, setIconStates] = useState({
    liked: { variant: 'Linear', color: 'black' },
    bookmarked: { variant: 'Linear', color: 'black' },
  });
  const selectedBlog = flatlist.find(blog => blog.id === blogId);
  const navigation = useNavigation();
  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? 'rgb(132, 209, 92)'
            : 'black',
      },
    }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft
            color={'black'}
            variant="Linear"
            size={24}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
          <More
            color={'black'}
            variant="Linear"
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // paddingHorizontal: 10,
          paddingTop: 50,
          paddingBottom: 54,
        }}>
        <View style={{ backgroundColor: 'rgb(132, 209, 92)', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Image
            style={{ ...styles.image, }}
            source={{
              uri: selectedBlog.image,
            }}
            resizeMode={'cover'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ backgroundColor: 'rgb(132, 209, 92)', borderBottomLeftRadius: 0, borderBottomRightRadius: 10, padding: 10, paddingLeft: 20, paddingRight: 20 }}>
            <Text style={styles.category}>{selectedBlog.category}</Text>
          </View>
          <View style={{ paddingRight: 10, paddingTop: 10 }}>
            <Text style={styles.date}>{selectedBlog.description}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.title}>{selectedBlog.title}</Text>
          <Text style={styles.content}>{selectedBlog.content}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => toggleIcon('liked')}>
            <Heart
              color={iconStates.liked.color}
              variant={iconStates.liked.variant}
              size={24}
            />
          </TouchableOpacity>
          <Text style={styles.info}>
            69
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
          <Receipt21
            color={iconStates.bookmarked.color}
            variant={iconStates.bookmarked.variant}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DetailNews;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgb(132, 209, 92)',
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 60,
    bottom: 0,
    left: 230,
    right: -20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    width: 'auto',
    borderRadius: 10,
  },
  info: {
    color: 'black',
    fontSize: 12,
  },
  category: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  date: {
    color: 'black',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  content: {
    color: 'black',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10,
  },
});