
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useFavorites } from '../context/FavoritesContext';

const Icon = ({
  name,
  size,
  color,
}: {
  name: 'heart' | 'heart-outline';
  size: number;
  color: string;
}) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>
    {name === 'heart' ? '♥' : '♡'}
  </Text>
);

export default function FavoritesScreen() {
  // Shared FavoritesContext se data receive hoga
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Favorites</Text>
          <Text style={styles.subtitle}>
            Your favorite stickers in one place
          </Text>
        </View>

        <View style={styles.countBox}>
          <Icon name="heart" size={18} color="#FF4D67" />
          <Text style={styles.count}>{favorites.length}</Text>
        </View>
      </View>

      {/* Favorites List */}
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Icon
              name="heart-outline"
              size={55}
              color="#FF6B81"
            />
          </View>

          <Text style={styles.emptyTitle}>
            No Favorites Yet
          </Text>

          <Text style={styles.emptyText}>
            You haven't added any stickers to your favorites.
            Explore stickers and tap the heart icon to save them here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.stickerCard}>
              <View
                style={[
                  styles.stickerImage,
                  { backgroundColor: item.color },
                ]}
              >
                <Text style={styles.emoji}>
                  {item.emoji}
                </Text>

                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={() => toggleFavorite(item)}
                >
                  <Icon
                    name="heart"
                    size={21}
                    color="#FF4D67"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardInfo}>
                <Text
                  style={styles.stickerName}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                <Text style={styles.category}>
                  {item.category}
                </Text>

                <Text style={styles.creator}>
                  By {item.creator}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FC',
    paddingHorizontal: 18,
    paddingTop: 25,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#202033',
  },

  subtitle: {
    fontSize: 13,
    color: '#888899',
    marginTop: 5,
  },

  countBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE9ED',
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    gap: 6,
  },

  count: {
    color: '#FF4D67',
    fontSize: 15,
    fontWeight: '700',
  },

  list: {
    paddingBottom: 25,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  stickerCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    overflow: 'hidden',
    elevation: 2,
  },

  stickerImage: {
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  emoji: {
    fontSize: 65,
  },

  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardInfo: {
    padding: 12,
  },

  stickerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#202033',
  },

  category: {
    fontSize: 12,
    color: '#FF6B81',
    marginTop: 4,
  },

  creator: {
    fontSize: 11,
    color: '#9999A8',
    marginTop: 5,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 60,
  },

  emptyIcon: {
    width: 115,
    height: 115,
    borderRadius: 60,
    backgroundColor: '#FFE9ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#202033',
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 14,
    color: '#888899',
    textAlign: 'center',
    lineHeight: 22,
  },
});
