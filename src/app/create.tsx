import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const textColors = [
  '#FFFFFF',
  '#29243E',
  '#FF4F81',
  '#8065E8',
  '#FF9F43',
  '#20A67A',
];

const backgroundColors = [
  '#EEE8FF',
  '#FFE5ED',
  '#FFF0D5',
  '#E5F2FF',
  '#E3F7EA',
  '#FFFFFF',
];

export default function CreateScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [stickerText, setStickerText] = useState('Your Sticker');
  const [selectedTextColor, setSelectedTextColor] = useState('#FFFFFF');
  const [selectedBackground, setSelectedBackground] = useState('#EEE8FF');
  const [showPreview, setShowPreview] = useState(false);

  // Open gallery
  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow gallery access to select a photo.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open gallery.');
    }
  };

  // Validate and open preview
  const openPreview = () => {
    if (!image) {
      Alert.alert(
        'Image Required',
        'Please select an image from your gallery first.'
      );
      return;
    }

    if (!stickerText.trim()) {
      Alert.alert(
        'Text Required',
        'Please enter some text for your sticker.'
      );
      return;
    }

    setShowPreview(true);
  };

  // Reset design
  const resetSticker = () => {
    setImage(null);
    setStickerText('Your Sticker');
    setSelectedTextColor('#FFFFFF');
    setSelectedBackground('#EEE8FF');
    setShowPreview(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Sticker</Text>
        <Text style={styles.subtitle}>Design your own custom sticker</Text>

        <Pressable style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <Text style={styles.placeholderIcon}>＋</Text>
              <Text style={styles.placeholderText}>Choose an image</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.label}>Sticker text</Text>
        <TextInput
          value={stickerText}
          onChangeText={setStickerText}
          placeholder="Enter sticker text"
          style={styles.input}
          maxLength={40}
        />

        <Text style={styles.label}>Text color</Text>
        <View style={styles.colorRow}>
          {textColors.map((color) => (
            <Pressable
              key={color}
              onPress={() => setSelectedTextColor(color)}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                selectedTextColor === color && styles.selectedColor,
              ]}
            />
          ))}
        </View>

        <Text style={styles.label}>Background</Text>
        <View style={styles.colorRow}>
          {backgroundColors.map((color) => (
            <Pressable
              key={color}
              onPress={() => setSelectedBackground(color)}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                selectedBackground === color && styles.selectedColor,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.secondaryButton} onPress={resetSticker}>
            <Text style={styles.secondaryButtonText}>Reset</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={openPreview}>
            <Text style={styles.primaryButtonText}>Preview</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal visible={showPreview} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Preview</Text>
            <View style={[styles.preview, { backgroundColor: selectedBackground }]}>
              {image && <Image source={{ uri: image }} style={styles.previewImage} />}
              <Text style={[styles.previewText, { color: selectedTextColor }]}>
                {stickerText}
              </Text>
            </View>
            <Pressable style={styles.primaryButton} onPress={() => setShowPreview(false)}>
              <Text style={styles.primaryButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF9FF' },
  container: { padding: 24, paddingBottom: 40 },
  title: { color: '#29243E', fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#77738B', marginTop: 6, marginBottom: 24 },
  imagePicker: {
    height: 240,
    borderRadius: 20,
    backgroundColor: '#EEE8FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  placeholderIcon: { color: '#8065E8', fontSize: 42 },
  placeholderText: { color: '#8065E8', fontSize: 16, fontWeight: '600' },
  label: { color: '#29243E', fontSize: 16, fontWeight: '600', marginTop: 22, marginBottom: 10 },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E0EF',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#29243E',
  },
  colorRow: { flexDirection: 'row', gap: 12 },
  colorOption: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, borderColor: '#D8D3E5' },
  selectedColor: { borderWidth: 3, borderColor: '#29243E' },
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 30 },
  primaryButton: { flex: 1, backgroundColor: '#8065E8', borderRadius: 12, padding: 14, alignItems: 'center' },
  secondaryButton: { flex: 1, backgroundColor: '#E8E4F4', borderRadius: 12, padding: 14, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  secondaryButtonText: { color: '#29243E', fontWeight: '700' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 24 },
  previewCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20 },
  previewTitle: { color: '#29243E', fontSize: 20, fontWeight: '700', marginBottom: 16 },
  preview: { height: 260, borderRadius: 16, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 18 },
  previewImage: { ...StyleSheet.absoluteFill, opacity: 0.8 },
  previewText: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
});