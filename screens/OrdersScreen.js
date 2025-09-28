import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

// Lista mockada pra simular alguns pedidos anteriores
const PEDIDOS_MOCADOS = [
  { id: '1', restaurante: 'Pizzaria do Bairro', data: '25/09/2025', total: 'R$ 58,50', status: 'Entregue' },
  { id: '2', restaurante: 'Hamburgueria Top', data: '27/09/2025', total: 'R$ 35,00', status: 'Entregue' },
  { id: '3', restaurante: 'Japonês & Cia', data: '28/09/2025', total: 'R$ 95,20', status: 'A caminho' },
];

export default function OrdersScreen() {
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  // Como cada pedido vai ser exibido
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.restaurantName}>{item.restaurante}</Text>
        <Text style={styles.orderDate}>{item.data}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.orderTotal}>Total: {item.total}</Text>
        <Text
          style={[
            styles.orderStatus,
            { color: item.status === 'Entregue' ? 'green' : '#ff8c00' }
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PEDIDOS_MOCADOS}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        // Se não tiver pedidos, mostra esse texto
        ListEmptyComponent={
          <Text style={styles.emptyText}>Você ainda não fez nenhum pedido.</Text>
        }
        // Um título em cima da lista
        ListHeaderComponent={<Text style={styles.title}>Meus Pedidos</Text>}
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
  emptyText: {
    color: colors.subtleText,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  orderDate: {
    fontSize: 14,
    color: colors.subtleText,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: 16,
    color: colors.text,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
