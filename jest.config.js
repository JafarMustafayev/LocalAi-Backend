module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/tests/**/*.ts', // tests/ qovluğundakı bütün .ts faylları
    '**/?(*.)+(spec|test).ts', // *.test.ts və ya *.spec.ts faylları
  ],
  collectCoverageFrom: [
    'src/**/*.ts', // src-dəki bütün .ts faylları
    '!src/**/*.d.ts', // TypeScript declaration fayllarını xaric et
    '!src/server.ts', // Entry point (main) faylı xaric et
    '!src/**/*.interface.ts', // Interface faylları xaric et (əgər varsa)
    '!src/**/*.type.ts', // Type faylları xaric et (əgər varsa)
  ],
  coverageThreshold: {
    global: {
      branches: 70, // if/else, switch dallanmalarının 70%-i
      functions: 70, // Funksiyaların 70%-i
      lines: 70, // Kod sətirlərinin 70%-i
      statements: 70, // Statement-lərin 70%-i
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: '<rootDir>/coverage',
  testTimeout: 10000,
  verbose: true,
};
