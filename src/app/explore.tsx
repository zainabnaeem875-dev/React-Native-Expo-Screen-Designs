
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
import { useFavorites, type Sticker } from '../context/FavoritesContext';

const categories = ['All', 'Cute', 'Animals', 'Love', 'Funny', 'Food'];

const stickers: Sticker[] = [
  { id: '1', name: 'Cute Teddy', category: 'Cute', creator: 'Sticker World', emoji: '🐻', color: '#FFE8D8' },
  { id: '2', name: 'Lovely Cat', category: 'Animals', creator: 'Cute Studio', emoji: '🐱', color: '#E9E2FF' },
  { id: '3', name: 'Pink Love', category: 'Love', creator: 'Love Art', emoji: '💗', color: '#FFE1EC' },
  { id: '4', name: 'Funny Face', category: 'Funny', creator: 'Fun Stickers', emoji: '😂', color: '#FFF0C9' },
  { id: '5', name: 'Little Bunny', category: 'Animals', creator: 'Cute Studio', emoji: '🐰', color: '#E5F2FF' },
  { id: '6', name: 'Sweet Strawberry', category: 'Food', creator: 'Food Art', emoji: '🍓', color: '#FFE3E0' },
  { id: '7', name: 'Happy Bear', category: 'Cute', creator: 'Sticker World', emoji: '🧸', color: '#FCE8D5' },
  { id: '8', name: 'Love Letter', category: 'Love', creator: 'Love Art', emoji: '💌', color: '#FFE6F1' },
  { id: '9', name: 'Cool Monkey', category: 'Animals', creator: 'Animal Art', emoji: '🐵', color: '#E9E5FF' },
  { id: '10', name: 'Yummy Pizza', category: 'Food', creator: 'Food Art', emoji: '🍕', color: '#FFF0D5' },
  { id: '11', name: 'Silly Duck', category: 'Funny', creator: 'Fun Stickers', emoji: '🦆', color: '#FFF5C9' },
  { id: '12', name: 'Cute Panda', category: 'Animals', creator: 'Cute Studio', emoji: '🐼', color: '#E5F2FF' },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Shared Favorites Context
  const { favorites, toggleFavorite } = useFavorites();

  const filteredStickers = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return stickers.filter((sticker) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        sticker.category === selectedCategory;

      const matchesSearch =
        sticker.name.toLowerCase().includes(searchText) ||
        sticker.category.toLowerCase().includes(searchText) ||
        sticker.creator.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallHeading}>DISCOVER SOMETHING NEW</Text>
            <Text style={styles.heading}>Explore Stickers</Text>
            <Text style={styles.subHeading}>
              Find the perfect sticker for every mood.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Text style={styles.headerEmoji}>✨</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIconBox}>
            <Text style={styles.searchIcon}>⌕</Text>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search stickers, categories..."
            placeholderTextColor="#A29DB2"
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />

          {search.length > 0 && (
            <Pressable
              style={styles.clearButton}
              onPress={() => setSearch('')}
            >
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <View style={styles.categoryHeading}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.categoryCount}>
            {categories.length} categories
          </Text>
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
                  active && styles.activeCategory,
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

        {/* Results */}
        <View style={styles.resultHeader}>
          <View>
            <Text style={styles.sectionTitle}>All Stickers</Text>
            <Text style={styles.resultSubtitle}>
              Explore our creative collection
            </Text>
          </View>

          <View style={styles.resultBadge}>
            <Text style={styles.resultBadgeText}>
              {filteredStickers.length} Results
            </Text>
          </View>
        </View>

        {/* Sticker Grid */}
        <View style={styles.stickerGrid}>
          {filteredStickers.map((sticker) => {
            const isFavorite = favorites.some(
              (item) => item.id === sticker.id
            );

            return (
              <View key={sticker.id} style={styles.stickerCard}>
                <View
                  style={[
                    styles.stickerImage,
                    { backgroundColor: sticker.color },
                  ]}
                >
                  <Text style={styles.stickerEmoji}>
                    {sticker.emoji}
                  </Text>

                  <Pressable
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(sticker)}
                  >
                    <Text style={styles.favoriteIcon}>
                      {isFavorite ? '❤️' : '🤍'}
                    </Text>
                  </Pressable>

                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>
                      {sticker.category}
                    </Text>
                  </View>
                </View>

                <View style={styles.stickerInfo}>
                  <Text style={styles.stickerName}>
                    {sticker.name}
                  </Text>

                  <Text style={styles.creatorName}>
                    By {sticker.creator}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Empty State */}
        {filteredStickers.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No stickers found</Text>
            <Text style={styles.emptyDescription}>
              Try searching with another name or category.
            </Text>

            <Pressable
              style={styles.resetButton}
              onPress={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
            >
              <Text style={styles.resetButtonText}>Clear Filters</Text>
            </Pressable>
          </View>
        )}

        {/* Bottom Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🎨</Text>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>
              Create your own stickers!
            </Text>
            <Text style={styles.bannerDescription}>
              Bring your creative ideas to life.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Discover. Create. Express. 💜
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
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 22,
  },
  smallHeading: {
    color: '#8065E8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  heading: {
    fontSize: 25,
    color: '#29243E',
    fontWeight: '900',
    marginTop: 7,
  },
  subHeading: {
    color: '#9993A8',
    fontSize: 11,
    marginTop: 6,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#EEE8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 25,
  },
  searchContainer: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 11,
    borderWidth: 1,
    borderColor: '#EAE4FA',
    shadowColor: '#8065E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#8065E8',
    fontSize: 27,
    lineHeight: 32,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 12,
    color: '#29243E',
  },
  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: '#F5F1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    color: '#8065E8',
    fontSize: 16,
    fontWeight: '700',
  },
  categoryHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#29243E',
  },
  categoryCount: {
    color: '#9993A8',
    fontSize: 10,
  },
  categoryList: {
    gap: 9,
    paddingBottom: 5,
  },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEAF7',
  },
  activeCategory: {
    backgroundColor: '#8065E8',
    borderColor: '#8065E8',
  },
  categoryText: {
    color: '#777187',
    fontSize: 11,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 16,
  },
  resultSubtitle: {
    color: '#9993A8',
    fontSize: 10,
    marginTop: 5,
  },
  resultBadge: {
    backgroundColor: '#EEE8FF',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 11,
  },
  resultBadgeText: {
    color: '#8065E8',
    fontSize: 10,
    fontWeight: '700',
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
    borderRadius: 18,
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
    fontSize: 64,
  },
  favoriteButton: {
    position: 'absolute',
    top: 9,
    right: 9,
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
  categoryTag: {
    position: 'absolute',
    bottom: 9,
    left: 9,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryTagText: {
    color: '#8065E8',
    fontSize: 9,
    fontWeight: '700',
  },
  stickerInfo: {
    padding: 11,
  },
  stickerName: {
    color: '#29243E',
    fontSize: 12,
    fontWeight: '800',
  },
  creatorName: {
    color: '#9993A8',
    fontSize: 9,
    marginTop: 5,
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
    fontSize: 10,
    marginTop: 6,
  },
  resetButton: {
    backgroundColor: '#8065E8',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 15,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  banner: {
    backgroundColor: '#29243E',
    borderRadius: 19,
    padding: 18,
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  bannerEmoji: {
    fontSize: 40,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  bannerDescription: {
    color: '#C4BDD9',
    fontSize: 10,
    marginTop: 5,
  },
  footer: {
    textAlign: 'center',
    color: '#A29DB2',
    fontSize: 10,
    marginTop: 25,
  },
});
