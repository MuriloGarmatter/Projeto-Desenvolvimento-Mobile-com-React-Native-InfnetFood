import React, { useState, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import { ThemeProvider, ThemeContext } from './context/ThemeContext';

// Telas do app
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import MapScreen from './screens/MapScreen';
import RestaurantDetailsScreen from './screens/RestaurantDetailsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

// Configuração do comportamento das notificações quando o app está aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function AppNavigatorContent() {
  const { navigationTheme, colors } = useContext(ThemeContext);

  // Pedir permissão pro usuário receber notificações
  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Ative as notificações para acompanhar os updates do seu pedido 😉');
      }
    }
    requestPermissions();
  }, []);

  const [userToken, setUserToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  
  // Função simples para adicionar produtos ao carrinho
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Contexto de autenticação (bem básico só pra simular login/logout)
  const authContext = {
    signIn: () => setUserToken('some-auth-token'),
    signOut: () => setUserToken(null),
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
        }}
      >
        {userToken == null ? (
          // Se não está logado, mostra a tela de Login
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} signIn={authContext.signIn} />}
          </Stack.Screen>
        ) : (
          // Se está logado, mostra as telas principais
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'IntraFood' }} />
            <Stack.Screen name="Profile" options={{ title: 'Meu Perfil' }}>
              {(props) => <ProfileScreen {...props} signOut={authContext.signOut} />}
            </Stack.Screen>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
            <Stack.Screen name="Products" options={({ route }) => ({ title: route.params.categoryName })}>
              {(props) => <ProductsScreen {...props} addToCart={addToCart} />}
            </Stack.Screen>
            <Stack.Screen name="Cart" options={{ title: 'Meu Carrinho' }}>
              {(props) => <CartScreen {...props} cartItems={cartItems} />}
            </Stack.Screen>
            <Stack.Screen name="Checkout" options={{ title: 'Finalizar Pedido' }}>
              {(props) => <CheckoutScreen {...props} cartItems={cartItems} />}
            </Stack.Screen>
            <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Meus Pedidos' }} />
            <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Mapa de Restaurantes' }} />
            <Stack.Screen 
              name="RestaurantDetails" 
              component={RestaurantDetailsScreen} 
              options={({ route }) => ({ title: route.params.restaurantData.nome })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigatorContent />
    </ThemeProvider>
  );
}
