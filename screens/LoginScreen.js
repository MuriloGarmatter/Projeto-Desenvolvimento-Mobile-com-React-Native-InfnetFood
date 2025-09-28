import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function LoginScreen({ signIn }) {
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  // Estados básicos para o login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Simulação de login para testar fluxo
  const handleLogin = () => {
    const userMockado = { email: 'aluno@infnet.com', senha: '123' };

    if (email === userMockado.email && password === userMockado.senha) {
      setErrorMessage('');
      signIn(); // chama a função de login que veio via prop
    } else {
      setErrorMessage('E-mail ou senha inválidos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IntraFood Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="aluno@infnet.com"
        placeholderTextColor={colors.subtleText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="123"
        placeholderTextColor={colors.subtleText}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Button title="Entrar" onPress={handleLogin} color={colors.primary} />
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.text,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: colors.card,
    color: colors.text,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});
