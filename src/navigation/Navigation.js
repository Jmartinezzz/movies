import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'

import StackNavigation from './StackNavigation'
import DrawerContent from './DrawerContent'

const Drawer = createDrawerNavigator()

export default function Navigation() {
    return (
      <Drawer.Navigator initialRouterName="app" drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="app" component={StackNavigation} />
      </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})
