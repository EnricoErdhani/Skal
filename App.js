import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Notification, Receipt21, Clock, Message, Home2, Setting2 } from 'iconsax-react-native';
import { fontType, colors } from './src/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { sliderImages, flatlist } from './data';

function HomeScreen() {
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
      <ScrollView>

        <View style={styles.header}>
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
        </View>
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

      </ScrollView>
    </View>
  );
}
function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'bisque' }}>
      <Text>Search</Text>
    </View>
  );
}

function FavoriteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'bisque' }}>
      <Text>Favorite!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'bisque' }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 70,
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (rn === 'Favorite') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (rn === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgb(84, 194, 37)',
          tabBarInactiveTintColor: 'black',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarShowLabel: false }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarShowLabel: false }} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} options={{ tabBarShowLabel: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarShowLabel: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const BeritaList = () => {
  return (
    <ScrollView contentContainerStyle={beritaStyle.container}>
      {flatlist.map((newsItem) => (
        <View style={beritaStyle.newsItem} key={newsItem.id}>
          <ImageBackground source={{ uri: newsItem.image }} style={beritaStyle.image}>
            <View style={beritaStyle.overlay} />
            <View style={itemHorizontal.cardContent}>
              <View>
                <View style={itemHorizontal.cardIcon}>
                  <TouchableOpacity >
                    <Receipt21 color={colors.white()} variant='Linear' size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
          <Text style={beritaStyle.title}>{newsItem.title}</Text>
          <Text style={beritaStyle.description}>{newsItem.description}</Text>
        </View>
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
    textAlign: 'justify'
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

