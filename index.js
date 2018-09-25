import { NativeModules, Platform } from 'react-native'
const { RNReactNativeSharedGroupPreferences } = NativeModules

export default class SharedGroupPreferences {

  static async isAppInstalledAndroid(packageName) {
    return new Promise((resolve, reject)=>{
      RNReactNativeSharedGroupPreferences.isAppInstalledAndroid(packageName, installed=>{
        if (installed) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  static async getItem(key, appGroup, options) {
    return new Promise((resolve, reject)=>{
      if ((Platform.OS != 'ios') && (Platform.OS != 'android')) {
        reject(Platform.OS)
      }

      RNReactNativeSharedGroupPreferences.getItem(key, appGroup, (errorCode, item)=>{
        if (errorCode != null) {
          reject(errorCode)
        } else {
          resolve(JSON.parse(item))
        }
      }, options || {})
    })
  }

  static async setItem(key, value, appGroup, options) {
    return new Promise((resolve, reject)=>{
      if ((Platform.OS != 'ios') && (Platform.OS != 'android')) {
        reject(Platform.OS)
      }

      RNReactNativeSharedGroupPreferences.setItem(key, JSON.stringify(value), appGroup, errorCode=>{
        if (errorCode != null) {
          reject(errorCode)
        } else {
          resolve()
        }
      }, options || {})
    })
  }
}
