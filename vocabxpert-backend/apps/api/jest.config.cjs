/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  // --- CONFIGURAÇÕES PARA ESM (ATUALIZADAS) ---
  extensionsToTreatAsEsm: ['.ts'],

  // A configuração do ts-jest agora vai diretamente para o transform
  // A seção 'globals' para ts-jest está obsoleta e foi removida/movida
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
      useESM: true, // Garante que ts-jest emita ESM
    }],
  },

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};