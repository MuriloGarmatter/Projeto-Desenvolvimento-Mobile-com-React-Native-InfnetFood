import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function RestaurantDetailsScreen({ route }) {
  // Os dados do restaurante chegam via navegação
  const { restaurantData } = route.params;

  // Tema aplicado para manter a consistência visual
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.infoWrapper}>
            <Text style={styles.name}>{restaurantData.nome}</Text>
            <Text style={styles.type}>
              {restaurantData.tipo} | Avaliação: {restaurantData.rating}/5
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.label}>Endereço:</Text>
              <Text style={styles.info}>{restaurantData.endereco}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>Sugestão do Cardápio:</Text>
              <Text style={styles.info}>{restaurantData.exemploCardapio}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    margin: 15,
    backgroundColor: colors.card,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoWrapper: {
    padding: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.text,
  },
  type: {
    fontSize: 16,
    color: colors.subtleText,
    marginBottom: 20,
  },
  infoBox: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: colors.subtleText,
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    color: colors.text,
  },
});
