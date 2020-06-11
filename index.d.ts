declare module 'react-native-shared-group-preferences' {
  export interface SharedGroupPreferencesStatic {
    isAppInstalledAndroid: (packageName: string) => Promise<void>;
    getItem: <T = any>(key: string, appGroup: string, options: SharedGroupPreferenceOptions | undefined) => Promise<T>;
    setItem: <T = any>(key: string, value: T, appGroup: string, options: SharedGroupPreferenceOptions | undefined) => Promise<void>;
  }

  interface SharedGroupPreferenceOptions {
    useAndroidSharedPreferences?: boolean
  }

  const SharedGroupPreferences: SharedGroupPreferencesStatic;

  export default SharedGroupPreferences;
}