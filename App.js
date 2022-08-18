import React, {useMemo, useState} from 'react';
import {StatusBar} from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  MD3LightTheme as DefaultThemePaper,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as DarkThemeNav,
  DefaultTheme as DefaultThemeNav,
} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';

export default function App() {
  
  const [theme, setTheme] = useState('dark')

  DefaultThemePaper.colors.primary = '#1AE1F2';
  // DarkThemePaper.colors.primary = '#1AE1F2';
  // DarkThemePaper.colors.accent = "#1AE1F2"

  DarkThemeNav.colors.background = '#1b2a38';
  DarkThemeNav.colors.card = '#15212B';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme
    }),
    [theme]
  )

  return (
    <PreferencesContext.Provider value={preference}>
      <PaperProvider theme={theme === 'dark' ? DefaultThemePaper : DefaultThemePaper}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={theme === 'dark' ? DarkThemeNav : DefaultThemeNav}>          
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
