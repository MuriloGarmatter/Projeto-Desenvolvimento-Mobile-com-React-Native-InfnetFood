import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

import mapaRioCentro from '../assets/centro-mapa.jpg';

// Lista fixa pra simular os restaurantes no mapa
const RESTAURANTES_MOCADOS = [
  { id: '1', nome: 'Restaurante', tipo: 'Brasileira', rating: 4.5, left: '20%', top: '10%', endereco: 'Rua do Passeio, 38 - Centro', exemploCardapio: 'Feijoada Completa' },
  { id: '2', nome: 'Pizzaria', tipo: 'Italiana', rating: 4.0, left: '50%', top: '25%', endereco: 'Av. Rio Branco, 156 - Centro', exemploCardapio: 'Pizza Calabresa' },
  { id: '3', nome: 'Cafeteria', tipo: 'Café', rating: 4.8, left: '70%', top: '15%', endereco: 'Rua Sete de Setembro, 55 - Centro', exemploCardapio: 'Café com Bolo de Fubá' },
  { id: '4', nome: 'Sushi', tipo: 'Japonesa', rating: 4.7, left: '30%', top: '40%', endereco: 'Rua da Quitanda, 86 - Centro', exemploCardapio: 'Combinado 20 peças' },
  { id: '5', nome: 'Bar', tipo: 'Pub', rating: 4.2, left: '10%', top: '55%', endereco: 'Largo da Carioca, 5 - Centro', exemploCardapio: 'Porção de Batata Frita' },
  { id: '6', nome: 'Bistrô', tipo: 'Francesa', rating: 4.6, left: '65%', top: '60%', endereco: 'Travessa do Comércio, 11 - Centro', exemploCardapio: 'Steak au Poivre' },
  { id: '7', nome: 'Padaria', tipo: 'Padaria', rating: 4.1, left: '45%', top: '75%', endereco: 'Rua do Rosário, 34 - Centro', exemploCardapio: 'Pão na Chapa com Manteiga' },
  { id: '8', nome: 'Hamburgueria', tipo: 'Americana', rating: 4.4, left: '80%', top: '50%', endereco: 'Rua Gonçalves Dias, 17 - Centro', exemploCardapio: 'Cheeseburger Duplo' },
  { id: '9', nome: 'Comida Mineira', tipo: 'Regional', rating: 4.3, left: '25%', top: '85%', endereco: 'Rua do Ouvidor, 10 - Centro', exemploCardapio: 'Tutu à Mineira' },
  { id: '10', nome: 'Vegano', tipo: 'Vegana', rating: 4.9, left: '55%', top: '90%', endereco: 'Av. Passos, 22 - Centro', exemploCardapio: 'Moqueca de Palmito' },
];

export default function MapScreen() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  const handleRestaurantPress = (restaurante) => {
    navigation.navigate('RestaurantDetails', { restaurantData: restaurante });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} maximumZoomScale={3} minimumZoomScale={1}>
        <Text style={styles.title}>Restaurantes no Centro</Text>
        <View style={styles.mapContainer}>
          <Image source={mapaRioCentro} style={styles.mapImage} resizeMode="cover" />
          {/* Cada restaurante da lista vira um marcador vermelho no mapa */}
          {RESTAURANTES_MOCADOS.map((restaurante) => (
            <TouchableOpacity
              key={restaurante.id}
              style={[styles.marker, { left: restaurante.left, top: restaurante.top }]}
              onPress={() => handleRestaurantPress(restaurante)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos gerados a partir do tema
const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: colors.text,
  },
  mapContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.6,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  marker: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
    transform: [{ translateX: -9 }, { translateY: -9 }],
  },
});
