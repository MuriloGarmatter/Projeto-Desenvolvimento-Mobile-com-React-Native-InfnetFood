import React, { useState, useRef, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import * as Notifications from 'expo-notifications';

// Função que agenda uma notificação quando o pedido é confirmado
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Pedido Confirmado! 🎉",
      body: 'Seu pedido está sendo preparado e logo sairá para entrega.',
      data: { orderId: '123-xyz' },
    },
    trigger: { seconds: 1 }, // dispara 1s depois de ser chamado
  });
}

export default function CheckoutScreen({ cartItems }) {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);
  
  // Estados básicos para o formulário
  const [address, setAddress] = useState('Rua da Assembléia, 10 - Centro, Rio de Janeiro');
  const [paymentMethod, setPaymentMethod] = useState('Cartão de Crédito');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Animações de sucesso (círculo verde + ícone)
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  // Soma itens do carrinho
  const getCartTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.quantity * 10), 0)
      .toFixed(2);
  };

  // Executa a animação de "check" quando o pedido finaliza
  const triggerSuccessAnimation = () => {
    Animated.parallel([
      Animated.spring(scaleValue, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.timing(opacityValue, { toValue: 1, duration: 300, delay: 200, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(onAnimationFinish, 1000);
    });
  };

  // Finalização do pedido
  const handleCheckout = async () => {
    if (!address.trim() || !paymentMethod.trim()) {
      Alert.alert('Erro de Validação', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Agenda a notificação
    await schedulePushNotification();

    // Mostra a animação de sucesso
    setShowSuccessAnimation(true);
    triggerSuccessAnimation();
  };
  
  const onAnimationFinish = () => {
    Alert.alert(
      'Pedido Confirmado!',
      'Seu pedido foi realizado com sucesso e em breve chegará em seu endereço.',
      [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
    );
  };

  // Se estiver mostrando a animação de sucesso, troca a tela inteira
  if (showSuccessAnimation) {
    return (
      <View style={styles.animationContainer}>
        <Animated.View style={[styles.successCircle, { transform: [{ scale: scaleValue }] }]}>
          <Animated.View style={{ opacity: opacityValue }}>
            <Ionicons name="checkmark" size={80} color="white" />
          </Animated.View>
        </Animated.View>
        <Text style={styles.animationText}>Pedido Realizado!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Resumo do pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Total a Pagar:</Text>
            <Text style={styles.totalPrice}>R$ {getCartTotal()}</Text>
          </View>
        </View>

        {/* Campo de endereço */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Digite seu endereço completo"
            placeholderTextColor={colors.subtleText}
          />
        </View>

        {/* Campo de pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Pagamento</Text>
          <TextInput
            style={styles.input}
            value={paymentMethod}
            onChangeText={setPaymentMethod}
            placeholder="Ex: Cartão de Crédito, Pix"
            placeholderTextColor={colors.subtleText}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button title="Finalizar Pedido" onPress={handleCheckout} color="#28a745" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  section: {
    backgroundColor: colors.card,
    margin: 15,
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: colors.text },
  summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryText: { fontSize: 16, color: colors.subtleText },
  totalPrice: { fontSize: 22, fontWeight: 'bold', color: colors.text },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: colors.text,
  },
  buttonContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  successCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.text,
  },
});
