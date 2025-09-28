import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

// Usuário simulado para exibição
const userMockado = {
  nome: 'Murilo',
  email: 'aluno@infnet.com',
};

export default function ProfileScreen({ signOut }) {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);

  // Configura o botão de acesso rápido para Configurações
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.text}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Informações do Usuário</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.info}>{userMockado.nome}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.info}>{userMockado.email}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Meus Pedidos"
            onPress={() => navigation.navigate('Orders')}
            color={colors.primary}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Sair (Logout)"
            onPress={signOut}
            color="#dc3545"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 25,
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.text,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: colors.subtleText,
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 5,
    color: colors.text,
  },
  buttonContainer: {
    marginTop: 15,
  },
});
