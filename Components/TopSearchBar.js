import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopTab from './TopTab';
import SearchBar from './SearchBar';

export default function TopSearchBar() {
    return (
        <TopTab>
            <SearchBar />
        </TopTab>
    );
}

const styles = StyleSheet.create({
    container: {
    }
})