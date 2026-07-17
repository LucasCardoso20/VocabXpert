import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import apiClient from '../../../src/api/client';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { radio } from '../../src/theme/radio';

import {
  createList,
  fetchUserLists,
  previewVocab,
  type ListItem,
} from '../../src/screens/vocab/services/createVocabService';

type CreateVocabPayload = {
  listId: string;
  word: string;
  translation?: string;
  examples?: string[];
};

async function createVocab(payload: CreateVocabPayload) {
  const userId = await SecureStore.getItemAsync('x-user-id');
  if (!userId) throw new Error('USER_ID_NOT_FOUND');

  const { data } = await apiClient.post(
    '/vocabs',
    {
      listId: payload.listId,
      word: payload.word.trim(),
      translation: payload.translation?.trim() || undefined,
      examples: (payload.examples ?? []).map((t) => t.trim()).filter(Boolean).slice(0, 5),
    },
    {
      headers: { 'x-user-id': userId },
      timeout: 25000,
    }
  );

  return data;
}

export default function CreateVocabScreen() {
  const router = useRouter();

  const [lists, setLists] = useState<ListItem[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);

  const [selectedListId, setSelectedListId] = useState('');
  const [listPickerOpen, setListPickerOpen] = useState(false);

  const [createListOpen, setCreateListOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [creatingList, setCreatingList] = useState(false);

  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [examples, setExamples] = useState<string[]>(['', '', '']);

  const [previewLoading, setPreviewLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedListName = useMemo(() => {
    return lists.find((l) => l.id === selectedListId)?.name ?? 'Selecione a lista';
  }, [lists, selectedListId]);

  const loadLists = useCallback(async () => {
    setLoadingLists(true);
    try {
      const data = await fetchUserLists();
      setLists(data);

      const defaultListId = await SecureStore.getItemAsync('default-list-id');
      const defaultList =
        (defaultListId && data.find((l) => l.id === defaultListId)) ||
        data.find((l) => l.isDefault) ||
        data[0];

      setSelectedListId(defaultList?.id ?? '');
    } catch (e) {
      console.error('Erro ao carregar listas:', e);
      Alert.alert('Erro', 'Não foi possível carregar suas listas.');
    } finally {
      setLoadingLists(false);
    }
  }, []);

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  const setExampleAt = useCallback((index: number, value: string) => {
    setExamples((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const handleGeneratePreview = useCallback(
    async (term: string) => {
      const w = term.trim();
      if (w.length < 2) return;

      try {
        setPreviewLoading(true);
        const data = await previewVocab(w);

        // Não sobrescreve se o usuário já digitou algo
        if (!translation.trim() && data.translation) {
          setTranslation(String(data.translation));
        }

        const hasManualExamples = examples.some((e) => e.trim().length > 0);
        if (!hasManualExamples && Array.isArray(data.examples) && data.examples.length) {
          const next = data.examples
            .slice(0, 3)
            .map((t: any) => String(t ?? '').trim());

          while (next.length < 3) next.push('');
          setExamples(next);
        }
      } catch (e) {
        // preview não deve quebrar a tela
        console.warn('Preview falhou:', e);
      } finally {
        setPreviewLoading(false);
      }
    },
    [examples, translation]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const term = word.trim();
    if (term.length < 2) return;

    debounceRef.current = setTimeout(() => {
      handleGeneratePreview(term);
    }, 650);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [word, handleGeneratePreview]);

  const canSubmit = useMemo(() => {
    return !!selectedListId && word.trim().length > 0 && !saving;
  }, [selectedListId, word, saving]);

  const handleCreateNewList = useCallback(async () => {
    const name = newListName.trim();
    if (!name) {
      Alert.alert('Atenção', 'Digite um nome para a lista.');
      return;
    }

    try {
      setCreatingList(true);
      const created = await createList(name);
      setLists((prev) => [created, ...prev]);
      setSelectedListId(created.id);
      setNewListName('');
      setCreateListOpen(false);
    } catch (e) {
      console.error('Erro ao criar lista:', e);
      Alert.alert('Erro', 'Não foi possível criar a lista.');
    } finally {
      setCreatingList(false);
    }
  }, [newListName]);

  const handleSave = useCallback(async () => {
    if (!canSubmit) return;

    try {
      setSaving(true);

      await createVocab({
        listId: selectedListId,
        word,
        translation: translation.trim() || undefined,
        examples: examples.map((t) => t.trim()).filter(Boolean),
      });

      Alert.alert('Sucesso', 'Vocabulário criado com sucesso!');
      router.back();
    } catch (err: any) {
      const status = err?.response?.status;
      const apiError = err?.response?.data?.error;

      if (status === 409 || apiError === 'VOCAB_ALREADY_EXISTS') {
        Alert.alert('Duplicado', 'Essa palavra já existe nessa lista.');
        return;
      }

      if (status === 404 && apiError === 'LIST_NOT_FOUND') {
        Alert.alert('Erro', 'Lista não encontrada. Atualize suas listas e tente novamente.');
        return;
      }

      console.error('Erro ao salvar vocab:', err?.response?.data || err?.message || err);
      Alert.alert('Erro', 'Não foi possível criar o vocabulário.');
    } finally {
      setSaving(false);
    }
  }, [canSubmit, selectedListId, word, translation, examples, router]);

  if (loadingLists) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Adicionar Vocab</Text>

      <Text style={styles.label}>Palavra (EN)</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Appreciate"
        placeholderTextColor={colors.light}
        value={word}
        onChangeText={setWord}
        autoCapitalize="none"
        autoCorrect={false}
        onBlur={() => {
          const t = word.trim();
          if (t.length >= 2 && !previewLoading) handleGeneratePreview(t);
        }}
      />

      <View style={styles.rowBetween}>
        <Text style={styles.label}>Tradução (PT)</Text>
        {previewLoading ? <ActivityIndicator size="small" color={colors.primary} /> : null}
      </View>
      <TextInput
        style={styles.input}
        placeholder="ex: Apreciar"
        placeholderTextColor={colors.light}
        value={translation}
        onChangeText={setTranslation}
      />

      <View style={styles.rowBetween}>
        <Text style={styles.label}>Lista</Text>
        <Pressable onPress={() => setCreateListOpen(true)} hitSlop={10}>
          <Text style={styles.linkText}>+ Nova lista</Text>
        </Pressable>
      </View>

      <Pressable style={styles.selectBtn} onPress={() => setListPickerOpen(true)}>
        <Text style={styles.selectText} numberOfLines={1}>
          {selectedListName}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.muted} />
      </Pressable>

      <Text style={[styles.label, { marginTop: spacing.s2 }]}>Exemplos (opcional)</Text>
      {examples.map((ex, idx) => (
        <TextInput
          key={`ex-${idx}`}
          style={[styles.input, styles.exampleInput]}
          placeholder={`Exemplo ${idx + 1}`}
          placeholderTextColor={colors.light}
          value={ex}
          onChangeText={(v) => setExampleAt(idx, v)}
          multiline
        />
      ))}

      <Pressable
        style={[styles.saveBtn, !canSubmit && styles.saveBtnDisabled]}
        onPress={handleSave}
        disabled={!canSubmit}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveBtnText}>Salvar Vocab</Text>
        )}
      </Pressable>

      <Pressable style={styles.cancelBtnInline} onPress={() => router.back()}>
        <Text style={styles.cancelBtnInlineText}>Cancelar</Text>
      </Pressable>

      {/* Modal: selecionar lista */}
      <Modal
        visible={listPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setListPickerOpen(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Selecione a lista</Text>

            <ScrollView style={{ maxHeight: 360 }} contentContainerStyle={{ paddingVertical: 6 }}>
              {lists.map((list) => {
                const active = list.id === selectedListId;
                return (
                  <Pressable
                    key={list.id}
                    style={[styles.listItem, active && styles.listItemActive]}
                    onPress={() => {
                      setSelectedListId(list.id);
                      setListPickerOpen(false);
                    }}
                  >
                    <Text style={[styles.listItemText, active && styles.listItemTextActive]}>
                      {list.name}
                      {list.isDefault ? ' • padrão' : ''}
                    </Text>
                    {active ? <Ionicons name="checkmark" size={16} color={colors.primary} /> : null}
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable style={styles.modalCloseBtn} onPress={() => setListPickerOpen(false)}>
              <Text style={styles.modalCloseBtnText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal: criar lista */}
      <Modal
        visible={createListOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setCreateListOpen(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Criar nova lista</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da lista"
              placeholderTextColor={colors.light}
              value={newListName}
              onChangeText={setNewListName}
              autoCapitalize="sentences"
            />

            <View style={styles.modalActionsRow}>
              <Pressable
                style={[styles.modalSecondaryBtn, { flex: 1 }]}
                onPress={() => setCreateListOpen(false)}
                disabled={creatingList}
              >
                <Text style={styles.modalSecondaryBtnText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.modalPrimaryBtn, { flex: 1 }]}
                onPress={handleCreateNewList}
                disabled={creatingList}
              >
                {creatingList ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.modalPrimaryBtnText}>Criar</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.s5, gap: spacing.s3 },

  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    marginBottom: spacing.s2,
  },

  label: { fontSize: 13, color: colors.muted, fontFamily: 'DM Sans Medium' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  linkText: { color: colors.primary, fontFamily: 'DM Sans SemiBold', fontSize: 13 },

  input: {
    minHeight: 50,
    borderRadius: radio.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.s4,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
    fontFamily: 'DM Sans',
  },
  exampleInput: { minHeight: 56 },

  selectBtn: {
    height: 50,
    borderRadius: radio.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.s4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: { flex: 1, marginRight: spacing.s2, color: colors.text, fontSize: 14, fontFamily: 'DM Sans' },

  saveBtn: {
    marginTop: spacing.s2,
    height: 52,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
    elevation: 3,
  },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnText: { color: '#fff', fontSize: 15, fontFamily: 'DM Sans SemiBold' },

  cancelBtnInline: {
    height: 44,
    borderRadius: radio.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnInlineText: {
    color: colors.primary,
    fontSize: 15,
    fontFamily: 'DM Sans SemiBold',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(13,27,42,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.s5,
  },
  modal: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: { fontSize: 16, color: colors.text, fontFamily: 'DM Sans Bold', marginBottom: spacing.s3 },

  listItem: {
    minHeight: 44,
    borderRadius: 12,
    paddingHorizontal: spacing.s3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemActive: { backgroundColor: 'rgba(79,70,229,0.10)' },
  listItemText: { color: colors.text, fontFamily: 'DM Sans', fontSize: 14 },
  listItemTextActive: { fontFamily: 'DM Sans SemiBold' },

  modalCloseBtn: {
    marginTop: spacing.s3,
    height: 44,
    borderRadius: radio.full,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseBtnText: { color: colors.text, fontFamily: 'DM Sans SemiBold', fontSize: 14 },

  modalActionsRow: { flexDirection: 'row', gap: spacing.s2, marginTop: spacing.s3 },
  modalSecondaryBtn: {
    height: 44,
    borderRadius: radio.full,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSecondaryBtnText: { color: colors.text, fontFamily: 'DM Sans SemiBold', fontSize: 14 },

  modalPrimaryBtn: {
    height: 44,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPrimaryBtnText: { color: '#fff', fontFamily: 'DM Sans SemiBold', fontSize: 14 },
});