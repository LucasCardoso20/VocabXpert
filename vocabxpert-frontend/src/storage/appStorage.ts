export type AppStorage = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

/**
 * Fallback para plataformas não previstas.
 *
 * No runtime, Expo/Metro prioriza:
 * - appStorage.web.ts no navegador
 * - appStorage.native.ts no Android/iOS
 */
export const appStorage: AppStorage = {
  async getItem(): Promise<string | null> {
    return null;
  },

  async setItem(): Promise<void> {
    // fallback intencionalmente vazio
  },

  async removeItem(): Promise<void> {
    // fallback intencionalmente vazio
  },
};