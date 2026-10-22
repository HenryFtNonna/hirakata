import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hirakata.app',
  appName: 'HenHan Go',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: 'none',
    },
  },
};

export default config;
