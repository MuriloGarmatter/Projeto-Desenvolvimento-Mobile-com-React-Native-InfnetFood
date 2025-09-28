import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

export default function CartScreen({ cartItems }) {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  // Calcula o total do carrinho (fiz R$10 por item só pra simplificar)
  const getCartTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.quantity * 10), 0)
      .toFixed(2);
  };

  // Como cada item do carrinho vai ser mostrado na tela
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.nome}</Text>
      <Text style={styles.itemQuantity}>Qtd: {item.quantity}</Text>
      <Text style={styles.itemPrice}>R$ {(item.quantity * 10).toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        // Caso o carrinho esteja vazio, mostra uma mensagem
        ListEmptyComponent={<Text style={styles.emptyText}>Seu carrinho está vazio.</Text>}
        // Se tiver itens, aparece o total e o botão de checkout
        ListFooterComponent={
          cartItems.length > 0 ? (
            <View style={styles.footerContainer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalPrice}>R$ {getCartTotal()}</Text>
              </View>
              <Button
                title="Ir para o Checkout"
                onPress={() => navigation.navigate('Checkout')}
                color={colors.primary}
              />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  cartItem: {
    backgroundColor: colors.card,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemName: { fontSize: 16, flex: 1, color: colors.text },
  itemQuantity: { fontSize: 16, marginHorizontal: 10, color: colors.text },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  footerContainer: {
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalText: {
    fontSize: 18,
    color: colors.subtleText,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: colors.subtleText,
  },
});
