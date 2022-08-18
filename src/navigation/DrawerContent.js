import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {DrawerContentScrollView} from '@react-navigation/drawer'
import { Drawer, Switch, TouchableRipple, Text, Title} from 'react-native-paper'
import userPreference from '../hooks/userPreference'

export default function DrawerContent(props) {

    const {navigation} = props
    const [active, setActive] = useState('home')
    const {theme, toggleTheme} = userPreference()

    const onChangeScreen= screen => {
      setActive(screen)
      navigation.navigate(screen)
    }

    return (
      <DrawerContentScrollView>
        <Drawer.Section>
            <Drawer.Item active={active === 'home'} label="Inicio" onPress={() => onChangeScreen('home')}/>
            <Drawer.Item active={active === 'popular'} label="Peliculas populares" onPress={() => onChangeScreen('popular')}/>
            <Drawer.Item active={active === 'news'} label="Peliculas nuevas" onPress={() => onChangeScreen('news')}/>
        </Drawer.Section>
        <Drawer.Section title="Opciones">
          <TouchableRipple>
            <View style={styles.preferences}>
              <Text style={{color: 'gray'}}>Tema oscuro</Text>
              <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24
  }
})
