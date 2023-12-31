import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, FlatList, TouchableOpacity, Animated, ActivityIndicator, RefreshControl } from 'react-native';
import { Notification, Receipt21, Clock, Message, Home2, Setting2, SearchNormal, Edit } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderImages, flatlist } from '../../../data';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';
import firestore from '@react-native-firebase/firestore';


const scrollY = useRef(new Animated.Value(0)).current;
const diffClampY = Animated.diffClamp(scrollY, 0, 60);
const recentY = diffClampY.interpolate({
  inputRange: [0, 60],
  outputRange: [0, -60],
});
const navigation = useNavigation();
const truncateTextByWords = (text, maxWords) => {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + ' ...';
  }
  return text;
}


export default function HomeScreen() {

  const { width: screenWidth } = Dimensions.get('window');
  const isCarousel = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 8;

  const renderItem = ({ item }) => {
    return (
      <View style={{ ...itemCarousel.cardItem, }}>
        <ImageBackground
          style={{
            width: screenWidth,
            height: 200,
          }}
          resizeMode="cover"
          source={{ uri: item.image }}
        >
          <View style={itemCarousel.darkOverlay}></View>
          <View style={itemCarousel.cardContent}>
            <View style={itemCarousel.textContainer}>
              <Text style={itemCarousel.cardTitle}>{item.title}</Text>
              <Text style={itemCarousel.cardDesc}>{item.description}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };


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
          <TouchableOpacity onPress={() => navigation.navigate("SearchPage")}>
            <SearchNormal color={colors.black()} variant="Linear" size={24} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        contentContainerStyle={{ paddingTop: 60 }}>
        <View >
          <Carousel
            ref={isCarousel}
            data={sliderImages}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            layout={'default'}
            autoplay
            loop
            onSnapToItem={index => setActiveSlide(index)}
            animatedDuration={20000}
          />
          <Pagination
            dotsLength={sliderImages.length}
            activeDotIndex={activeSlide}
            dotStyle={{
              width: 20,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgb(0, 0, 0)'
            }}
            inactiveDotStyle={{
              width: 20,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(52, 54, 51, 1)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            animatedDuration={20000}
          />
        </View>
        <BeritaList />

      </Animated.ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddBerita")}
      >
        <Edit color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const BeritaList = () => {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('berita')
      .onSnapshot(querySnapshot => {
        const blogs = [];
        querySnapshot.forEach(documentSnapshot => {
          blogs.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setBlogData(blogs);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('berita')
        .onSnapshot(querySnapshot => {
          const blogs = [];
          querySnapshot.forEach(documentSnapshot => {
            blogs.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setBlogData(blogs);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  // const getDataBlog = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://656c51fce1e03bfd572e30d7.mockapi.io/skal/Berita',
  //     );
  //     setBlogData(response.data);
  //     setLoading(false)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     getDataBlog()
  //     setRefreshing(false);
  //   }, 1500);
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     getDataBlog();
  //   }, [])
  // );
  return (
    <ScrollView contentContainerStyle={beritaStyle.container} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      {blogData.map((newsItem) => (
        <TouchableOpacity style={beritaStyle.newsItem} key={newsItem.id} onPress={() => navigation.navigate('DetailNews', { blogId: newsItem.id })}>
          <ImageBackground source={{ uri: newsItem.image }} style={beritaStyle.image}>
            <View style={beritaStyle.overlay} />
            <View style={itemHorizontal.cardContent}>
              <View style={itemHorizontal.cardIcon}>
                <TouchableOpacity >
                  <Receipt21 color={colors.white()} variant='Linear' size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={{}}>
            <Text style={beritaStyle.title}>{truncateTextByWords(newsItem.title, 5)}</Text>
            <Text style={beritaStyle.description}>{formatDate(newsItem.createdAt)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const beritaStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 100,
  },
  newsItem: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 5,
    color: 'black',
  },
  description: {
    color: 'black',
    fontSize: 14,
    paddingTop: 10,
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
  floatingButton: {
    backgroundColor: 'rgb(132, 209, 92)',
    padding: 15,
    position: 'absolute',
    bottom: 100,
    right: 24,
    borderRadius: 10,
    shadowColor: 'rgb(132, 209, 92)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
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
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    right: 0,
    left: 0,
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

