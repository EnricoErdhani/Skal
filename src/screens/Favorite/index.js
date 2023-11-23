import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Notification, Receipt21, Clock, Message, Home2, Setting2, Heart, HeartSlash } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderImages, flatlist, ListFavorite } from '../../../data';

const scrollY = useRef(new Animated.Value(0)).current;
const diffClampY = Animated.diffClamp(scrollY, 0, 60);
const recentY = diffClampY.interpolate({
  inputRange: [0, 60],
  outputRange: [0, -60],
});

export default function FavoriteScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'White', }}>
      <Animated.View style={[styles.header, { transform: [{ translateY: recentY }] }]}>
        <View style={styles.leftContainer}>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2022/05/19/14/38/s-7207516_1280.png',
            }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.Logo}>Skal</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Notification color={colors.black()} variant="Linear" size={24} />
          <Setting2 color={colors.black()} variant="Linear" size={24} />
        </View>
        </Animated.View>
        <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        contentContainerStyle={{ paddingTop: 5 }}>
        <Text style={{ color: 'black', fontSize: 24, paddingHorizontal: 24, paddingVertical: 15, fontWeight: 'bold' }} >Favorite</Text>
        <FavoriteList />
        </Animated.ScrollView>
    </View>
  );
}

const FavoriteList = () => {
  const [favorite, setFavorite] = useState([]);
  const toggleFavorite = itemId => {
    if (favorite.includes(itemId)) {
      setFavorite(favorite.filter(id => id !== itemId));
    } else {
      setFavorite([...favorite, itemId]);
    }
  };
  return (
    <ScrollView contentContainerStyle={beritaStyle.container}>
      {ListFavorite.map((newsItem) => (
        <View style={{ ...beritaStyle.newsItem, }} key={newsItem.id}>
          <View style={{}}>
            <ImageBackground resizeMode='cover' imageStyle={{ borderTopLeftRadius: 25, borderBottomLeftRadius: 25, }} source={{ uri: newsItem.image }} style={beritaStyle.image}>
              <View style={beritaStyle.overlay} />
              <View style={itemHorizontal.cardContent}>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flexDirection: 'row', elevation: 2, borderTopRightRadius: 25, flex: 1, borderBottomRightRadius: 25 }}>
            <View style={{ width: '60%' }}>
              <Text style={beritaStyle.title}>{newsItem.title}</Text>
              <Text style={beritaStyle.subtitle}>{newsItem.description}</Text>
            </View>
            <View style={{ width: '40%', justifyContent: 'center' }}>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => toggleFavorite(newsItem.id)}>
                {favorite.includes(newsItem.id) ?
                  <HeartSlash color={'red'} variant='Linear' size={20} /> : <Heart color={'red'} variant='Linear' size={20} />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const beritaStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 24,
    marginBottom: 100,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    marginTop: 5,
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'black',
    marginTop: 5,
    paddingLeft: 10,
  },
  description: {
    color: 'blue',
    marginRight: 50
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  cardIcon: {
    backgroundColor: colors.white(0.33),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
  },
})

const itemCarousel = StyleSheet.create({
  cardItem: {
    width: 'auto',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '100%',
  },
  cardTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontFamily: fontType['Poppins-ExtraBold'],
    fontSize: 30,
    color: colors.white(),
    textShadowColor: 'black'
  },
  cardDesc: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 10,
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.black(0.5),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
    width: 30,
    height: 30,
  },
})


const styles = StyleSheet.create({
  paginationText: {
    fontSize: 24,
    margin: 5,
    color: 'gray',
  },
  activePaginationText: {
    color: 'black',
  },

  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 10,
    height: 60,
    backgroundColor: 'rgb(132, 209, 92)',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 5,

  },
  userInfo: {
    flexDirection: 'column',
  },
  Logo: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: fontType['Poppins-ExtraBold']
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    marginHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    gap: 10,
  },
});

const itemVertical = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  cardItem: {
    backgroundColor: 'rgba(148, 214, 114,0.1)',
    flexDirection: 'row',
    borderRadius: 20,
    shadowOpacity: 1,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 3
  },
  cardCategory: {
    color: colors.blue(),
    fontSize: 10,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.blue(0.6),
  },
  cardImage: {
    width: 94,
    height: 94,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});
const itemHorizontal = StyleSheet.create({
  cardItem: {
    width: 280,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginTop: 20,
    borderRadius: 20,
  },
  cardContent: {
    position: 'absolute',
    right: 0,
    padding: 15,
  },
  cardIcon: {
    backgroundColor: colors.white(0.33),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
  },
});

