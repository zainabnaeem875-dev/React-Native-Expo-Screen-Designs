
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function PreviewScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    image?: string;
    text?: string;
    textColor?: string;
    background?: string;
  }>();

  const image = params.image;
  const stickerText = params.text || '';
  const textColor = params.textColor || '#FFFFFF';
  const background = params.background || '#EEE8FF';

  const handleSave = () => {
    Alert.alert(
      'Preview Ready',
      'Your sticker design is ready. Actual PNG saving will be implemented in the next step.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.heading}>Sticker Preview</Text>

        <View style={{ width: 42 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Your creative design is ready!
        </Text>

        <View style={[styles.preview, { backgroundColor: background }]}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : null}

          {stickerText.length > 0 && (
            <View style={styles.textContainer}>
              <Text style={[styles.stickerText, { color: textColor }]}>
                {stickerText}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.readyText}>✨ Your sticker design</Text>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>✓ Confirm Design</Text>
        </Pressable>

        <Pressable
          style={styles.editButton}
          onPress={() => router.back()}
        >
          <Text style={styles.editButtonText}>← Edit Sticker</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8FF',
  },
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 42,
    height: 42,
    backgroundColor: '#EEE8FF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#8065E8',
    fontSize: 32,
    lineHeight: 36,
  },
  heading: {
    color: '#29243E',
    fontSize: 17,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  subtitle: {
    color: '#9993A8',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    bottom: 25,
    left: 15,
    right: 15,
    alignItems: 'center',
  },
  stickerText: {
    fontSize: 29,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  readyText: {
    color: '#29243E',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 20,
  },
  saveButton: {
    height: 54,
    backgroundColor: '#8065E8',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  editButton: {
    height: 50,
    backgroundColor: '#EEE8FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  editButtonText: {
    color: '#8065E8',
    fontSize: 12,
    fontWeight: '800',
  },
});
