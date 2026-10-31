
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  TextInput,
  Alert,
  Switch,
  Modal,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

import { useFavorites } from '../context/FavoritesContext';

const PROFILE_KEY = 'stickerlab_profile_v1';
const NOTIFICATION_KEY = 'stickerlab_notifications_v1';

type ProfileData = {
  name: string;
  username: string;
  bio: string;
};

const defaultProfile: ProfileData = {
  name: 'Creative Designer',
  username: 'sticker_creator',
  bio: 'Creating cute stickers and spreading happiness! 🎨💜',
};

export default function ProfileScreen() {
  const router = useRouter();

  const { favorites } = useFavorites();

  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  const [name, setName] = useState(defaultProfile.name);
  const [username, setUsername] = useState(defaultProfile.username);
  const [bio, setBio] = useState(defaultProfile.bio);

  const [editing, setEditing] = useState(false);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [privacyVisible, setPrivacyVisible] = useState(false);

  const [loading, setLoading] = useState(true);

  // Load saved profile and notification settings
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);

        const savedNotifications = await AsyncStorage.getItem(
          NOTIFICATION_KEY
        );

        if (savedProfile) {
          const parsedProfile: ProfileData = JSON.parse(savedProfile);

          setProfile(parsedProfile);
          setName(parsedProfile.name);
          setUsername(parsedProfile.username);
          setBio(parsedProfile.bio);
        }

        if (savedNotifications !== null) {
          setNotificationsEnabled(savedNotifications === 'true');
        }
      } catch (error) {
        console.error('Profile loading error:', error);

        Alert.alert(
          'Error',
          'Could not load your saved profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Save profile
  const handleSaveProfile = async () => {
    const updatedProfile: ProfileData = {
      name: name.trim(),
      username: username.trim().replace(/^@+/, ''),
      bio: bio.trim(),
    };

    if (!updatedProfile.name || !updatedProfile.username) {
      Alert.alert(
        'Required Fields',
        'Name and username cannot be empty.'
      );
      return;
    }

    try {
      await AsyncStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);

      setName(updatedProfile.name);
      setUsername(updatedProfile.username);
      setBio(updatedProfile.bio);

      setEditing(false);

      Alert.alert(
        'Success',
        'Your profile has been updated successfully!'
      );
    } catch (error) {
      console.error('Profile saving error:', error);

      Alert.alert(
        'Error',
        'Unable to save your profile. Please try again.'
      );
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setName(profile.name);
    setUsername(profile.username);
    setBio(profile.bio);

    setEditing(false);
  };

  // Notification setting
  const handleNotificationToggle = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(
        NOTIFICATION_KEY,
        String(value)
      );

      setNotificationsEnabled(value);

      Alert.alert(
        'Notifications',
        value
          ? 'Notifications preference enabled.'
          : 'Notifications preference disabled.'
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Could not update notification settings.'
      );
    }
  };

  // Open Favorites screen
  const openFavorites = () => {
    router.push('/favorites');
  };

  // Open Create screen
  const openCreateScreen = () => {
    router.push('/create');
  };

  // Help and Support
  const openSupport = () => {
    Alert.alert(
      'Help & Support',
      'Welcome to StickerLab Support! 💜\n\n' +
        'For assistance with your profile, stickers, favorites, or app settings, ' +
        'please contact your app administrator.\n\n' +
        'More support options can be added when the backend is connected.',
      [{ text: 'OK' }]
    );
  };

  // Logout
  const handleLogout = () => {
    Alert.alert(
      'Authentication Required',
      'Logout will become available after connecting the login and authentication system.',
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8065E8" />
        <Text style={styles.loadingText}>
          Loading your profile...
        </Text>
      </SafeAreaView>
    );
  }

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
            <Text style={styles.smallHeading}>
              YOUR CREATIVE SPACE
            </Text>

            <Text style={styles.heading}>
              My Profile
            </Text>
          </View>

          <View style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>🎨</Text>
            </View>

            <View style={styles.onlineDot} />
          </View>

          {editing ? (
            <View style={styles.editFields}>
              <TextInput
                style={styles.editInput}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#9993A8"
              />

              <TextInput
                style={styles.editInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#9993A8"
                autoCapitalize="none"
              />

              <TextInput
                style={[styles.editInput, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Your bio"
                placeholderTextColor="#9993A8"
                multiline
                maxLength={150}
              />

              <Text style={styles.characterCount}>
                {bio.length}/150
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.userName}>
                {profile.name}
              </Text>

              <Text style={styles.userHandle}>
                @{profile.username}
              </Text>

              <Text style={styles.bio}>
                {profile.bio}
              </Text>
            </>
          )}

          {editing ? (
            <View style={styles.editActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={handleCancelEdit}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={styles.editButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.editButtonText}>
                  ✓ Save Profile
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={styles.editButton}
              onPress={() => setEditing(true)}
            >
              <Text style={styles.editButtonText}>
                ✏️ Edit Profile
              </Text>
            </Pressable>
          )}
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Created</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {favorites.length}
            </Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Downloads</Text>
          </View>
        </View>

        {/* My Creations */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              My Creations
            </Text>

            <Text style={styles.sectionSubtitle}>
              Your personal sticker collection
            </Text>
          </View>

          <Pressable onPress={openCreateScreen}>
            <Text style={styles.viewAll}>
              Create New →
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.emptyCard}
          onPress={openCreateScreen}
        >
          <Text style={styles.emptyEmoji}>🎨</Text>

          <Text style={styles.emptyTitle}>
            No creations yet
          </Text>

          <Text style={styles.emptyDescription}>
            Start creating your own unique stickers!
          </Text>

          <View style={styles.createButton}>
            <Text style={styles.createButtonText}>
              + Create Sticker
            </Text>
          </View>
        </Pressable>

        {/* Account Settings */}
        <Text style={styles.menuHeading}>
          ACCOUNT & SETTINGS
        </Text>

        <View style={styles.menuCard}>
          {/* Favorites */}
          <Pressable
            style={styles.menuItem}
            onPress={openFavorites}
          >
            <View style={styles.menuIconBox}>
              <Text style={styles.menuEmoji}>❤️</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>
                My Favorites
              </Text>

              <Text style={styles.menuSubtitle}>
                {favorites.length} saved stickers
              </Text>
            </View>

            <Text style={styles.menuArrow}>›</Text>
          </Pressable>

          <View style={styles.menuDivider} />

          {/* Notifications */}
          <View style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Text style={styles.menuEmoji}>🔔</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>
                Notifications
              </Text>

              <Text style={styles.menuSubtitle}>
                {notificationsEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </View>

            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{
                false: '#D8D3E3',
                true: '#BBA9FF',
              }}
              thumbColor={
                notificationsEnabled ? '#8065E8' : '#FFFFFF'
              }
            />
          </View>

          <View style={styles.menuDivider} />

          {/* Privacy Policy */}
          <Pressable
            style={styles.menuItem}
            onPress={() => setPrivacyVisible(true)}
          >
            <View style={styles.menuIconBox}>
              <Text style={styles.menuEmoji}>🔒</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>
                Privacy Policy
              </Text>

              <Text style={styles.menuSubtitle}>
                Learn how your data is handled
              </Text>
            </View>

            <Text style={styles.menuArrow}>›</Text>
          </Pressable>

          <View style={styles.menuDivider} />

          {/* Help */}
          <Pressable
            style={styles.menuItem}
            onPress={openSupport}
          >
            <View style={styles.menuIconBox}>
              <Text style={styles.menuEmoji}>💬</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>
                Help & Support
              </Text>

              <Text style={styles.menuSubtitle}>
                Get help with StickerLab
              </Text>
            </View>

            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
        </View>

        {/* Logout */}
        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutIcon}>↪</Text>

          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </Pressable>

        <Text style={styles.version}>
          StickerLab Version 1.0.0
        </Text>

        <Text style={styles.footer}>
          Made with 💜 for creative minds
        </Text>
      </ScrollView>

      {/* Privacy Policy Modal */}
      <Modal
        visible={privacyVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPrivacyVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Privacy Policy
              </Text>

              <Pressable
                onPress={() => setPrivacyVisible(false)}
                style={styles.modalClose}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.policyHeading}>
                1. Personal Information
              </Text>

              <Text style={styles.policyText}>
                Your profile name, username and bio are stored locally
                on your device using AsyncStorage.
              </Text>

              <Text style={styles.policyHeading}>
                2. Favorites
              </Text>

              <Text style={styles.policyText}>
                Your favorite stickers are currently managed in app
                memory. They may reset when the app restarts.
              </Text>

              <Text style={styles.policyHeading}>
                3. Notifications
              </Text>

              <Text style={styles.policyText}>
                Your notification preference is saved locally.
                This setting does not currently connect to a
                push notification service.
              </Text>

              <Text style={styles.policyHeading}>
                4. Data Security
              </Text>

              <Text style={styles.policyText}>
                This version of StickerLab does not have a connected
                backend account system. Your profile information
                remains in local app storage.
              </Text>

              <Text style={styles.policyHeading}>
                5. Contact
              </Text>

              <Text style={styles.policyText}>
                Contact your application administrator for questions
                about privacy or data management.
              </Text>
            </ScrollView>

            <Pressable
              style={styles.policyDoneButton}
              onPress={() => setPrivacyVisible(false)}
            >
              <Text style={styles.policyDoneText}>
                I Understand
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8FF',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#FAF8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#8065E8',
    marginTop: 12,
    fontSize: 12,
  },

  container: {
    paddingHorizontal: 20,
    paddingBottom: 35,
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

  settingsButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#EEE8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingsIcon: {
    fontSize: 21,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0ECF7',
  },

  avatarContainer: {
    position: 'relative',
    marginBottom: 13,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 35,
    backgroundColor: '#EEE8FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#F7F3FF',
  },

  avatarEmoji: {
    fontSize: 48,
  },

  onlineDot: {
    position: 'absolute',
    bottom: 5,
    right: 3,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#45C98B',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#29243E',
  },

  userHandle: {
    color: '#8065E8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },

  bio: {
    color: '#9993A8',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 12,
    marginHorizontal: 10,
  },

  editFields: {
    width: '100%',
    gap: 10,
  },

  editInput: {
    backgroundColor: '#FAF8FF',
    borderWidth: 1,
    borderColor: '#EAE4FA',
    borderRadius: 12,
    padding: 12,
    color: '#29243E',
    fontSize: 12,
    textAlign: 'center',
  },

  bioInput: {
    minHeight: 65,
    textAlignVertical: 'top',
  },

  characterCount: {
    textAlign: 'right',
    color: '#9993A8',
    fontSize: 9,
  },

  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
  },

  cancelButton: {
    backgroundColor: '#F1EDF8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 13,
  },

  cancelButtonText: {
    color: '#777187',
    fontSize: 11,
    fontWeight: '700',
  },

  editButton: {
    backgroundColor: '#8065E8',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 13,
    marginTop: 18,
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginTop: 17,
    paddingVertical: 19,
    borderWidth: 1,
    borderColor: '#F0ECF7',
    alignItems: 'center',
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
  },

  statNumber: {
    color: '#8065E8',
    fontSize: 21,
    fontWeight: '900',
  },

  statLabel: {
    color: '#9993A8',
    fontSize: 10,
    marginTop: 5,
  },

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#EEEAF7',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 29,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#29243E',
  },

  sectionSubtitle: {
    color: '#9993A8',
    fontSize: 10,
    marginTop: 5,
  },

  viewAll: {
    color: '#8065E8',
    fontSize: 11,
    fontWeight: '700',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    paddingVertical: 27,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0ECF7',
  },

  emptyEmoji: {
    fontSize: 38,
  },

  emptyTitle: {
    color: '#29243E',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 10,
  },

  emptyDescription: {
    color: '#9993A8',
    fontSize: 10,
    marginTop: 6,
  },

  createButton: {
    backgroundColor: '#EEE8FF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 15,
  },

  createButtonText: {
    color: '#8065E8',
    fontSize: 11,
    fontWeight: '800',
  },

  menuHeading: {
    color: '#9993A8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 28,
    marginBottom: 12,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#F0ECF7',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },

  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#F2EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuEmoji: {
    fontSize: 18,
  },

  menuTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  menuTitle: {
    color: '#29243E',
    fontSize: 12,
    fontWeight: '800',
  },

  menuSubtitle: {
    color: '#9993A8',
    fontSize: 9,
    marginTop: 4,
  },

  menuArrow: {
    color: '#AAA3BC',
    fontSize: 25,
  },

  menuDivider: {
    height: 1,
    backgroundColor: '#F1EDF7',
    marginLeft: 52,
  },

  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 22,
    gap: 9,
  },

  logoutIcon: {
    color: '#E45D68',
    fontSize: 20,
  },

  logoutText: {
    color: '#E45D68',
    fontSize: 12,
    fontWeight: '800',
  },

  version: {
    color: '#AAA3BC',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 22,
  },

  footer: {
    color: '#AAA3BC',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 7,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 25, 50, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxHeight: '80%',
    borderRadius: 22,
    padding: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    color: '#29243E',
    fontSize: 20,
    fontWeight: '900',
  },

  modalClose: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#F2EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCloseText: {
    color: '#8065E8',
    fontSize: 16,
    fontWeight: '800',
  },

  policyHeading: {
    color: '#29243E',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 14,
  },

  policyText: {
    color: '#777187',
    fontSize: 11,
    lineHeight: 19,
    marginTop: 6,
  },

  policyDoneButton: {
    backgroundColor: '#8065E8',
    padding: 14,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 18,
  },

  policyDoneText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
