import React, { useState } from "react";

import { FlatList, StyleSheet, Platform, StatusBar, View } from "react-native";
import ListItem from "../Components/ListItem";
import ListItemDeleteAction from "../Components/ListItemDeleteAction";
import ListItemSeperator from "../Components/ListItemSeperator";
import Screen from "../Components/Screen";

const initialMessage = [
    {
        id: 1,
        title: 'T1',
        description: 'D1',
        image: require('../assets/mosh.jpg')
    },
    {
        id: 2,
        title: 'T2',
        description: 'D2',
        image: require('../assets/mosh.jpg')
    },

]


export default function MessageScreen() {

    const [message, setMessage] = useState(initialMessage);
    const [refreshing, setRefreshing] = useState(false);

    const deleteHandler = (removeMessage) => {
        const newMessage = message.filter(m => m.id !== removeMessage.id);
        setMessage(newMessage);
    }

    return (
        <Screen>
            <FlatList
                data={message}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <ListItem
                        title={item.title}
                        subtitle={item.description}
                        image={item.image}
                        onPress={() => console.log('Message selected', item)}
                        renderRightActions={() => <ListItemDeleteAction onPress={() => deleteHandler(item)} />}
                    />}
                ItemSeparatorComponent={ListItemSeperator}
                refreshing={refreshing}
                onRefresh={() => setMessage([
                    {
                        id: 2,
                        title: 'T2',
                        description: 'D2',
                        image: require('../assets/mosh.jpg')
                    },])}
            />
        </Screen>

    );
}

const styles = StyleSheet.create({

    seprator: {
        width: '100%',
        height: 10,
        backgroundColor: 'red',
    }
})