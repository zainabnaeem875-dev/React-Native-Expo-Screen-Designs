
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { FavoritesProvider } from '../context/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#8065E8',
          tabBarInactiveTintColor: '#9995A8',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            height: 75,
            paddingTop: 8,
            paddingBottom: 10,
            borderTopColor: '#EEEAF7',
            elevation: 10,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 21, opacity: focused ? 1 : 0.6 }}>
                🏠
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 21, opacity: focused ? 1 : 0.6 }}>
                🔍
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 21, opacity: focused ? 1 : 0.6 }}>
                ✨
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 21, opacity: focused ? 1 : 0.6 }}>
                ❤️
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 21, opacity: focused ? 1 : 0.6 }}>
                👤
              </Text>
            ),
          }}
        />
      </Tabs>
    </FavoritesProvider>
  );
}
