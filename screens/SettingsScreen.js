import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { theme, colors, toggleTheme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark'; 
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingRow}>
        <Text style={styles.text}>Modo Escuro</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }} 
          thumbColor={isDarkMode ? '#007bff' : '#f4f3f4'}   
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkMode}          
        />
      </View>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  text: {
    fontSize: 18,
    color: colors.text,
  },
});
