import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'

import StackNavigation from './StackNavigation'
import DrawerContent from './DrawerContent'
import Home from '../screens/Home';

const Drawer = createDrawerNavigator()

export default function Navigation() {
    return (
      <Drawer.Navigator initialRouterName="app" drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="app mo" component={StackNavigation} />
        {/* <Drawer.Screen name="jome" component={Home} /> */}
      </Drawer.Navigator>
    )
}

