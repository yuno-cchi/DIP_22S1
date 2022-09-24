
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const SideMenu = (props) => {
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Payment Methods"
          onPress={() => { console.log('user pressed') }}
        />
        <DrawerItem
          label="Insurance"
          onPress={() => { console.log('user pressed') }}
        />
        <DrawerItem
          label="Promotion"
          onPress={() => { console.log('user pressed') }}
        />
        <DrawerItem
          label="Calendar"
          onPress={() => { console.log('user pressed') }}
        />
        <DrawerItem
          label="Trips"
          onPress={() => { console.log('user pressed') }}
        />
        <DrawerItem
          label="Saved Addresses"
          onPress={() => { console.log('user pressed') }}
        />
        <DrawerItem
          label="Settings"
          onPress={() => { console.log('user pressed') }}
        />
        <DrawerItem
          label="Invite friends"
          onPress={() => { console.log('user pressed') }}
        />
        <DrawerItem
          label="Help"
          onPress={() => { console.log('user pressed') }}
        />
        

      </DrawerContentScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SideMenu;
