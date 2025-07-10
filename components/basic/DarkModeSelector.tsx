import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DarkModeSelector = (props: any) => {
    const iconName = props.isChecked ? "white-balance-sunny" : "moon-waning-crescent";

    return (
        <View style={styles.container}>
            <Pressable onPress={props.onPress} style={{alignSelf: 'center'}}> {/* TODO: ALIGNMENT CENTER NOT WORKING */}
                <MaterialCommunityIcons name={iconName} size={24} color="#FFFFFF" /> {/* TODO: NIGHTMODE */}
            </Pressable>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};

export default DarkModeSelector;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: 150,
        marginTop: 5,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 16,
        color: "#FFFFFF", //TODO: NIGHTMODE
        marginLeft: 5,
        fontWeight: "600",
    },
});