export const appStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof window === 'undefined') {
        return null;
      }

      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.setItem(key, value);
    } catch {
      // Não quebra a UI caso o browser bloqueie o storage.
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.removeItem(key);
    } catch {
      // Não há ação necessária.
    }
  },
};