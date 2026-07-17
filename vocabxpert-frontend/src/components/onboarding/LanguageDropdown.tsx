// src/components/onboarding/LanguageDropdown.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import CheckmarkIcon from '../icons/CheckmarkIcon';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radio } from '../../theme/radio';
import { getShadow } from '../../theme/shadows';
import { languages } from '../../data/onboardingData'; // Mock data

interface LanguageDropdownProps {
  selectedLanguageId: string | null;
  onSelectLanguage: (id: string) => void;
  label: string;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ selectedLanguageId, onSelectLanguage, label }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedLanguage = languages.find(lang => lang.id === selectedLanguageId);

  const handleSelect = (id: string) => {
    onSelectLanguage(id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdownButton, getShadow('sh1')]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.selectedContent}>
          {selectedLanguage ? (
            <>
              <Text style={styles.flag}>{selectedLanguage.flag}</Text>
              <Text style={styles.selectedText}>{selectedLanguage.name}</Text>
            </>
          ) : (
            <Text style={styles.placeholderText}>Selecione um idioma</Text>
          )}
        </View>
        <ChevronDownIcon size={20} color={colors.muted} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContent, getShadow('sh2')]}>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item.id)}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={styles.optionText}>{item.name}</Text>
                  {selectedLanguageId === item.id && (
                    <CheckmarkIcon size={18} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.s4,
  },
  label: {
    fontSize: 13,
    fontFamily: 'DM Sans SemiBold',
    color: colors.muted,
    marginBottom: spacing.s2,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radio.md,
    paddingVertical: spacing.s4,
    paddingHorizontal: spacing.s5,
    borderWidth: 1.5,
    borderColor: colors.border,
    height: 52, // ✅ Altura fixa para consistência
  },
  selectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // ✅ Garante que o conteúdo ocupe o espaço disponível
  },
  flag: {
    fontSize: 20,
    marginRight: spacing.s2,
  },
  selectedText: {
    fontSize: 15,
    fontFamily: 'DM Sans Medium',
    color: colors.text,
    flexShrink: 1, // ✅ Permite que o texto encolha se for muito longo
  },
  placeholderText: {
    fontSize: 15,
    fontFamily: 'DM Sans',
    color: colors.light,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: radio.md,
    width: '80%',
    maxHeight: '60%',
    paddingVertical: spacing.s3,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s5,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'DM Sans',
    color: colors.text,
    marginLeft: spacing.s2, // ✅ Adiciona margem para a bandeira
  },
});

export default LanguageDropdown;