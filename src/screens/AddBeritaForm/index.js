import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Image
} from "react-native";
import { ArrowLeft, Add, AddSquare } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { fontType, colors } from "../../theme";
import DropDownPicker from "react-native-dropdown-picker";
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AddBlogForm = () => {
    const handleImagePick = async () => {
        ImagePicker.openPicker({
            width: 1920,
            height: 1080,
            cropping: true,
        })
            .then(image => {
                console.log(image);
                setImage(image.path);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const handleUpload = async () => {
        let filename = image.substring(image.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        const reference = storage().ref(`beritaimages/${filename}`);

        setLoading(true);
        try {
            await reference.putFile(image);
            const url = await reference.getDownloadURL();
            await firestore().collection('berita').add({
                image: url,
                title: blogData.title,
                category: blogData.category,
                createdAt: new Date(),
                content: blogData.content,
            });
            setLoading(false);
            console.log('Blog added!');
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    };
    const [loading, setLoading] = useState(false);
    // const handleUpload = async () => {
    //     setLoading(true);
    //     try {
    //         await axios.post('https://656c51fce1e03bfd572e30d7.mockapi.io/skal/Berita', {
    //             image,
    //             title: blogData.title,
    //             category: blogData.category,
    //             createdAt: new Date(),
    //             content: blogData.content,
    //         })
    //             .then(function (response) {
    //                 console.log(response);
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //         setLoading(false);
    //         navigation.navigate('Home');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [itemCategory, setItems] = useState([
        { id: 1, title: "Hewan", value: "Hewan" },
        { id: 2, title: "Seni Rupa", value: "Seni Rupa" },
        { id: 3, title: "Alat Musik", value: "Alat Musik" },
    ]);
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        category: {},
        totalLikes: 0,
        totalComments: 0,
    });
    const handleChange = (key, value) => {
        setBlogData({
            ...blogData,
            [key]: value,
        });
    };
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft color={colors.black()} variant="Linear" size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.title}>Create Post</Text>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 10,
                    gap: 10,
                }}
            >
                <View style={textInput.borderDashed}>
                    <TextInput
                        placeholder="Title"
                        value={blogData.title}
                        onChangeText={(text) => handleChange("title", text)}
                        placeholderTextColor={colors.grey(0.6)}
                        multiline
                        style={textInput.title}
                    />
                </View>
                <View style={[textInput.borderDashed, { minHeight: 250 }]}>
                    <TextInput
                        placeholder="Content"
                        value={blogData.content}
                        onChangeText={(text) => handleChange("content", text)}
                        placeholderTextColor={colors.grey(0.6)}
                        multiline
                        style={textInput.content}
                    />
                </View>
                {/* <View style={[textInput.borderDashed]}>
                    <TextInput
                        placeholder="Image"
                        value={image}
                        onChangeText={(text) => setImage(text)}
                        placeholderTextColor={colors.grey(0.6)}
                        style={textInput.content}
                    />
                </View> */}
                {image ? (
                    <View style={{ position: 'relative' }}>
                        <Image
                            style={{ width: '100%', height: 127, borderRadius: 5 }}
                            source={{
                                uri: image,
                            }}
                            resizeMode={'cover'}
                        />
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                backgroundColor: colors.blue(),
                                borderRadius: 25,
                            }}
                            onPress={() => setImage(null)}>
                            <Add
                                size={20}
                                variant="Linear"
                                color={colors.white()}
                                style={{ transform: [{ rotate: '45deg' }] }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleImagePick}>
                        <View
                            style={[
                                textInput.borderDashed,
                                {
                                    gap: 10,
                                    paddingVertical: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                            ]}>
                            <AddSquare color={colors.grey(0.6)} variant="Linear" size={42} />
                            <Text
                                style={{
                                    fontFamily: fontType['Pjs-Regular'],
                                    fontSize: 12,
                                    color: colors.grey(0.6),
                                }}>
                                Upload Foto
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                <View style={{ ...textInput.borderDashed, marginBottom: 100 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: fontType["Pjs-Regular"],
                            color: colors.grey(0.6),
                            paddingBottom: 5,
                        }}
                    >
                        Category
                    </Text>
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        open={open}
                        value={value}
                        items={itemCategory}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        schema={{
                            testID: 'id',
                            label: 'title',
                            value: 'value'
                        }}
                        onChangeValue={(value) => {
                            const selectedItem = itemCategory.find(item => item.value === value);
                            if (selectedItem) {
                                const selectedId = selectedItem.id;
                                handleChange("category", { id: selectedId, name: value });
                            }
                        }}
                    />
                </View>

            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.button} onPress={handleUpload}>
                    <Text style={styles.buttonLabel}>Upload</Text>
                </TouchableOpacity>
            </View>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={colors.blue()} />
                </View>
            )}
        </View>
    );
};

export default AddBlogForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.black(0.4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        height: 52,
        elevation: 8,
        paddingTop: 8,
        paddingBottom: 4,
        backgroundColor: 'rgb(132, 209, 92)',
    },
    title: {
        fontFamily: fontType["Pjs-Bold"],
        fontSize: 16,
        color: colors.black(),
    },
    bottomBar: {
        backgroundColor: 'white',
        alignItems: "flex-end",
        paddingHorizontal: 24,
        paddingVertical: 10,
        shadowColor: colors.black(),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgb(132, 209, 92)',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonLabel: {
        fontSize: 14,
        fontFamily: fontType["Pjs-SemiBold"],
        color: colors.white(),
    },
});
const textInput = StyleSheet.create({
    borderDashed: {
        borderStyle: "dashed",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.grey(0.4),
    },
    title: {
        fontSize: 14,
        fontFamily: fontType["Pjs-SemiBold"],
        color: colors.black(),
        padding: 0,
    },
    content: {
        fontSize: 14,
        fontFamily: fontType["Pjs-Regular"],
        color: colors.black(),
        padding: 0,
    },
});
const category = StyleSheet.create({
    title: {
        fontSize: 12,
        fontFamily: fontType["Pjs-Regular"],
        color: colors.grey(0.6),
    },
    container: {
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    item: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 25,
    },
    name: {
        fontSize: 10,
        fontFamily: fontType["Pjs-Medium"],
    },
});