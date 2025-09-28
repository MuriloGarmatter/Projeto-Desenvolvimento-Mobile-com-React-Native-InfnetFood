import React, { useLayoutEffect, useContext } from 'react';
import { Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

// Lista simples de categorias fixas
const CATEGORIAS = [
  { id: '1', nome: 'Lanches' },
  { id: '2', nome: 'Bebidas' },
  { id: '3', nome: 'Sobremesas' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginLeft: 15 }}>
          <Ionicons name="person-circle-outline" size={32} color={colors.text} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Map')} style={{ marginRight: 15 }}>
          <Ionicons name="map-outline" size={28} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  // Quando clico em uma categoria, mando o nome dela para a tela de produtos
  const handleCategoryPress = (category) => {
    navigation.navigate('Products', { categoryName: category.nome });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item)}>
      <Text style={styles.categoryText}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <FlatList 
        data={CATEGORIAS} 
        renderItem={renderCategoryItem} 
        keyExtractor={(item) => item.id} 
      />
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: colors.text,
  },
  categoryItem: {
    backgroundColor: colors.card,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
  },
});
