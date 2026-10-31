
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import {
  useFavorites,
  type Sticker,
} from '../context/FavoritesContext';

const categories = ['All', 'Cute', 'Animals', 'Love', 'Funny', 'Food'];

const stickers: Sticker[] = [
  {
    id: '1',
    name: 'Cute Teddy',
    category: 'Cute',
    creator: 'Sticker World',
    emoji: '🐻',
    color: '#FFE8D8',
  },
  {
    id: '2',
    name: 'Lovely Cat',
    category: 'Animals',
    creator: 'Cute Studio',
    emoji: '🐱',
    color: '#E9E2FF',
  },
  {
    id: '3',
    name: 'Pink Love',
    category: 'Love',
    creator: 'Love Art',
    emoji: '💗',
    color: '#FFE1EC',
  },
  {
    id: '4',
    name: 'Funny Face',
    category: 'Funny',
    creator: 'Fun Stickers',
    emoji: '😂',
    color: '#FFF0C9',
  },
  {
    id: '5',
    name: 'Little Bunny',
    category: 'Animals',
    creator: 'Cute Studio',
    emoji: '🐰',
    color: '#E5F2FF',
  },
  {
    id: '6',
    name: 'Sweet Strawberry',
    category: 'Food',
    creator: 'Food Art',
    emoji: '🍓',
    color: '#FFE3E0',
  },
];

const collections = [
  {
    id: '1',
    title: 'Cute Animals',
    subtitle: 'Adorable animal stickers',
    emoji: '🐻',
    color: '#EAE2FF',
  },
  {
    id: '2',
    title: 'Love & Hearts',
    subtitle: 'Spread a little love',
    emoji: '💝',
    color: '#FFE5ED',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Shared Favorites Context
  const { favorites, toggleFavorite } = useFavorites();

  // Search and category filtering
  const filteredStickers = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return stickers.filter((sticker) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        sticker.category.toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesSearch =
        sticker.name.toLowerCase().includes(searchText) ||
        sticker.category.toLowerCase().includes(searchText) ||
        sticker.creator.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const openExplore = () => {
    router.push('/explore');
  };

  // Check whether a sticker is already favorite
  const isStickerFavorite = (stickerId: string) => {
    return favorites.some((item) => item.id === stickerId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoEmoji}>✨</Text>
            </View>

            <Text style={styles.logoText}>StickerLab</Text>
          </View>

          <Pressable
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.profileEmoji}>👤</Text>
          </Pressable>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroSmallText}>
              YOUR CREATIVE SPACE
            </Text>

            <Text style={styles.heroTitle}>
              Make your chats{'\n'}
              <Text style={styles.purpleText}>more fun!</Text>
            </Text>

            <Text style={styles.heroDescription}>
              Discover amazing stickers and express yourself.
            </Text>

            <Pressable
              style={styles.heroButton}
              onPress={() => router.push('/create')}
            >
              <Text style={styles.heroButtonText}>
                Create Sticker
              </Text>
              <Text style={styles.heroButtonArrow}> →</Text>
            </Pressable>
          </View>

          <View style={styles.heroIllustration}>
            <Text style={styles.heroMainEmoji}>🎨</Text>
            <Text style={styles.heroFloatingEmoji}>⭐</Text>
            <Text style={styles.heroFloatingEmojiTwo}>💜</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIconBox}>
            <Text style={styles.searchIcon}>⌕</Text>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Find your favorite stickers..."
            placeholderTextColor="#A29DB2"
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />

          {search.length > 0 ? (
            <Pressable
              onPress={() => setSearch('')}
              style={styles.searchAction}
            >
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          ) : (
            <View style={styles.searchAction}>
              <Text style={styles.filterIcon}>⌘</Text>
            </View>
          )}
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>

          <Pressable onPress={openExplore}>
            <Text style={styles.sectionLink}>Explore All →</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  active && styles.activeCategoryButton,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Featured Collections */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Featured Collections
          </Text>

          <Pressable onPress={openExplore}>
            <Text style={styles.sectionLink}>See All →</Text>
          </Pressable>
        </View>

        <View style={styles.collectionList}>
          {collections.map((collection) => (
            <Pressable
              key={collection.id}
              style={[
                styles.collectionCard,
                { backgroundColor: collection.color },
              ]}
              onPress={openExplore}
            >
              <View style={styles.collectionText}>
                <Text style={styles.collectionTitle}>
                  {collection.title}
                </Text>

                <Text style={styles.collectionSubtitle}>
                  {collection.subtitle}
                </Text>

                <Text style={styles.collectionExplore}>
                  Explore collection →
                </Text>
              </View>

              <Text style={styles.collectionEmoji}>
                {collection.emoji}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Trending Stickers */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Trending Stickers
            </Text>

            <Text style={styles.sectionSubtitle}>
              Find something you love
            </Text>
          </View>

          <Pressable onPress={openExplore}>
            <Text style={styles.sectionLink}>View All →</Text>
          </Pressable>
        </View>

        <Text style={styles.resultText}>
          {filteredStickers.length} stickers found
        </Text>

        {/* Sticker Grid */}
        <View style={styles.stickerGrid}>
          {filteredStickers.map((sticker) => {
            const isFavorite = isStickerFavorite(sticker.id);

            return (
              <View
                key={sticker.id}
                style={styles.stickerCard}
              >
                <View
                  style={[
                    styles.stickerImage,
                    { backgroundColor: sticker.color },
                  ]}
                >
                  <Text style={styles.stickerEmoji}>
                    {sticker.emoji}
                  </Text>

                  {/* Favorite Button */}
                  <Pressable
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(sticker)}
                  >
                    <Text style={styles.favoriteIcon}>
                      {isFavorite ? '❤️' : '🤍'}
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.stickerInfo}>
                  <Text style={styles.stickerName}>
                    {sticker.name}
                  </Text>

                  <Text style={styles.stickerCreator}>
                    {sticker.creator}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* No Results */}
        {filteredStickers.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔍</Text>

            <Text style={styles.emptyTitle}>
              No stickers found
            </Text>

            <Text style={styles.emptyDescription}>
              Try another keyword or category.
            </Text>

            <Pressable
              style={styles.resetButton}
              onPress={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
            >
              <Text style={styles.resetButtonText}>
                Clear Filters
              </Text>
            </Pressable>
          </View>
        )}

        {/* Create Banner */}
        <View style={styles.createBanner}>
          <View style={styles.createBannerText}>
            <Text style={styles.createBannerTitle}>
              Have a creative idea?
            </Text>

            <Text style={styles.createBannerDescription}>
              Turn your photos into amazing stickers.
            </Text>

            <Pressable
              style={styles.createBannerButton}
              onPress={() => router.push('/create')}
            >
              <Text style={styles.createBannerButtonText}>
                Start Creating →
              </Text>
            </Pressable>
          </View>

          <Text style={styles.createBannerEmoji}>🪄</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          Made with 💜 by StickerLab
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8FF',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#8065E8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoEmoji: {
    fontSize: 22,
  },

  logoText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#29243E',
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: '#EEE9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileEmoji: {
    fontSize: 21,
  },

  hero: {
    backgroundColor: '#EDE6FF',
    borderRadius: 25,
    padding: 20,
    minHeight: 205,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 8,
  },

  heroTextContainer: {
    flex: 1.5,
  },

  heroSmallText: {
    color: '#8065E8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  heroTitle: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '900',
    color: '#29243E',
  },

  purpleText: {
    color: '#8065E8',
  },

  heroDescription: {
    color: '#777187',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 8,
    maxWidth: 190,
  },

  heroButton: {
    backgroundColor: '#8065E8',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 15,
    flexDirection: 'row',
  },

  heroButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },

  heroButtonArrow: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },

  heroIllustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  heroMainEmoji: {
    fontSize: 75,
  },

  heroFloatingEmoji: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 25,
  },

  heroFloatingEmojiTwo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    fontSize: 25,
  },

  searchContainer: {
    height: 62,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EAE4FA',
    shadowColor: '#8065E8',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },

  searchIconBox: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchIcon: {
    fontSize: 27,
    color: '#8065E8',
    lineHeight: 32,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#29243E',
    height: '100%',
  },

  searchAction: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#F7F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearText: {
    color: '#8065E8',
    fontSize: 17,
    fontWeight: '700',
  },

  filterIcon: {
    color: '#8065E8',
    fontSize: 20,
    fontWeight: '700',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#29243E',
  },

  sectionLink: {
    color: '#8065E8',
    fontSize: 11,
    fontWeight: '700',
  },

  categoryList: {
    gap: 9,
    paddingBottom: 5,
  },

  categoryButton: {
    paddingHorizontal: 19,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEAF7',
  },

  activeCategoryButton: {
    backgroundColor: '#8065E8',
    borderColor: '#8065E8',
  },

  categoryText: {
    color: '#777187',
    fontSize: 12,
    fontWeight: '600',
  },

  activeCategoryText: {
    color: '#FFFFFF',
  },

  collectionList: {
    gap: 12,
  },

  collectionCard: {
    minHeight: 115,
    borderRadius: 20,
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  collectionText: {
    flex: 1,
  },

  collectionTitle: {
    color: '#29243E',
    fontSize: 16,
    fontWeight: '800',
  },

  collectionSubtitle: {
    color: '#777187',
    fontSize: 11,
    marginTop: 5,
  },

  collectionExplore: {
    color: '#8065E8',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 10,
  },

  collectionEmoji: {
    fontSize: 54,
    marginHorizontal: 10,
  },

  sectionSubtitle: {
    fontSize: 11,
    color: '#9993A8',
    marginTop: 4,
  },

  resultText: {
    color: '#9993A8',
    fontSize: 11,
    marginBottom: 12,
  },

  stickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 15,
  },

  stickerCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0ECF7',
  },

  stickerImage: {
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  stickerEmoji: {
    fontSize: 65,
  },

  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 31,
    height: 31,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteIcon: {
    fontSize: 15,
  },

  stickerInfo: {
    padding: 12,
  },

  stickerName: {
    color: '#29243E',
    fontSize: 12,
    fontWeight: '800',
  },

  stickerCreator: {
    color: '#9993A8',
    fontSize: 10,
    marginTop: 4,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },

  emptyEmoji: {
    fontSize: 40,
  },

  emptyTitle: {
    color: '#29243E',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
  },

  emptyDescription: {
    color: '#9993A8',
    fontSize: 11,
    marginTop: 5,
  },

  resetButton: {
    backgroundColor: '#8065E8',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 12,
    marginTop: 15,
  },

  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  createBanner: {
    backgroundColor: '#29243E',
    borderRadius: 22,
    padding: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  createBannerText: {
    flex: 1,
  },

  createBannerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  createBannerDescription: {
    color: '#C4BDD9',
    fontSize: 10,
    marginTop: 7,
    lineHeight: 16,
  },

  createBannerButton: {
    backgroundColor: '#8065E8',
    alignSelf: 'flex-start',
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 13,
  },

  createBannerButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  createBannerEmoji: {
    fontSize: 55,
    marginLeft: 10,
  },

  footerText: {
    textAlign: 'center',
    color: '#A29DB2',
    fontSize: 10,
    marginTop: 25,
  },
});
