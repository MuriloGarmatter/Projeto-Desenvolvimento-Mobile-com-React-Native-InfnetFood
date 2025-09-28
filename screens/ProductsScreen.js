import React, { useLayoutEffect, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const PRODUTOS_POR_CATEGORIA = {
  'Lanches': [
    { id: '1', nome: 'Hambúrguer Clássico' },
    { id: '2', nome: 'X-Bacon' },
    { id: '3', nome: 'Pizza de Calabresa' },
  ],
  'Bebidas': [
    { id: '4', nome: 'Refrigerante Lata' },
    { id: '5', nome: 'Suco Natural de Laranja' },
    { id: '6', nome: 'Água Mineral' },
  ],
  'Sobremesas': [
    { id: '7', nome: 'Sorvete de Chocolate' },
    { id: '8', nome: 'Bolo de Cenoura' },
    { id: '9', nome: 'Mousse de Maracujá' },
  ],
};

export default function ProductsScreen({ route, addToCart }) {
  const { categoryName } = route.params;
  const products = PRODUTOS_POR_CATEGORIA[categoryName] || [];
  const navigation = useNavigation();

  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  // Animação simples no ícone do carrinho
  const scaleValue = useRef(new Animated.Value(1)).current;

  const triggerCartAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    triggerCartAnimation();
  };

  // Customiza o header para mostrar o ícone do carrinho
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 15 }}>
            <Ionicons name="cart" size={28} color={colors.text} />
          </TouchableOpacity>
        </Animated.View>
      ),
    });
  }, [navigation, scaleValue, colors]);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productText}>{item.nome}</Text>
      <Button
        title="Adicionar"
        onPress={() => handleAddToCart(item)}
        color={colors.primary}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
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
  productItem: {
    backgroundColor: colors.card,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productText: { 
    fontSize: 16,
    color: colors.text,
  },
});
