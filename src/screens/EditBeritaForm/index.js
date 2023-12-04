import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { ArrowLeft } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { fontType, colors } from "../../theme";
import DropDownPicker from "react-native-dropdown-picker";
import axios from 'axios';

const EditBlogForm = ({ route }) => {
    const { blogId } = route.params;
    const [loading, setLoading] = useState(false);

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
    useEffect(() => {
        getBlogById();
    }, [blogId]);

    const getBlogById = async () => {
        try {
            const response = await axios.get(
                `https://656c51fce1e03bfd572e30d7.mockapi.io/skal/Berita/${blogId}`,
            );
            if (response.data.category && response.data.category.id) {
                const selectedItem = itemCategory.find(item => item.id === response.data.category.id);
                if (selectedItem) {
                    setValue(selectedItem.value);
                }
            }
            setBlogData({
                title: response.data.title,
                content: response.data.content,
                category: {
                    id: response.data.category.id,
                    name: response.data.category.name
                }
            })
            setImage(response.data.image)
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleUpdate = async () => {
        setLoading(true);
        try {
            await axios
                .put(`https://656c51fce1e03bfd572e30d7.mockapi.io/skal/Berita/${blogId}`, {
                    image,
                    title: blogData.title,
                    category: blogData.category,
                    content: blogData.content,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            setLoading(false);
            navigation.navigate('Home');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft color={colors.black()} variant="Linear" size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.title}>Edit Post</Text>
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
                <View style={[textInput.borderDashed]}>
                    <TextInput
                        placeholder="Image"
                        value={image}
                        onChangeText={(text) => setImage(text)}
                        placeholderTextColor={colors.grey(0.6)}
                        style={textInput.content}
                    />
                </View>
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
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
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

export default EditBlogForm;

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