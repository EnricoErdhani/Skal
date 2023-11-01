import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LogoutCurve, Notification, Setting2 } from 'iconsax-react-native';
import React from 'react';
import { ProfileData } from '../../../data';
import { fontType, colors } from '../../theme';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
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
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
        }}>
        <View style={{ backgroundColor: 'grey', height: 150, borderBottomColor: 'lightgreen', borderBottomWidth: 3, }}></View>
        <View style={{ paddingHorizontal: 24, paddingVertical: 20 }}>
          <View style={{ gap: 15, }}>
            <View style={{ marginTop: -100 }}>
              <Image
                style={profile.pic}
                source={{
                  uri: ProfileData.profilePict,
                }}
                resizeMode={'cover'}
              />
            </View>
          </View>
          <View style={{ gap: 5, backgroundColor: 'lightgrey', marginTop: 5, borderRadius: 25, padding: 10 }}>
            <Text style={profile.name}>{ProfileData.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity style={profile.buttonEdit}>
                <Text style={profile.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={profile.buttonEdit}>
                <Text style={profile.buttonText}>Share Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ backgroundColor: 'lightgrey', marginTop: 20, padding: 10, borderRadius: 25 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, }}>
              <Setting2 variant='Linear' color='black' size={24} />
              <Text style={{ color: 'black', marginLeft: 10, fontSize: 16 }}>Pengaturan</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <LogoutCurve variant='Linear' color='black' size={24} />
              <Text style={{ color: 'black', marginLeft: 10, fontSize: 16 }}>Logout</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
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
const profile = StyleSheet.create({
  pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'lightgreen',
    zIndex: 2,
  },
  name: {
    color: colors.black(),
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  info: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
  },
  sum: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
  tag: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.5),
  },
  buttonEdit: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
    textAlign: 'center',
  },
});