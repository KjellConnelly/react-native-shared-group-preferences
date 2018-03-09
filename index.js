import { NativeModules, Platform } from 'react-native'
const { RNReactNativeSharedGroupPreferences } = NativeModules

export default class SharedGroupPreferences {

  static async getItem(key, appGroup) {
    return new Promise((resolve, reject)=>{
      if ((Platform.OS != 'ios') && (Platform.OS != 'android')) {
        reject(Platform.OS)
      }

      RNReactNativeSharedGroupPreferences.getItem(key, appGroup, (error, item)=>{
        if (error != null) {
          reject(error)
        } else {
          resolve(JSON.parse(item))
        }
      })
    })
  }

  static async setItem(key, value, appGroup) {
    return new Promise((resolve, reject)=>{
      if ((Platform.OS != 'ios') && (Platform.OS != 'android')) {
        reject(Platform.OS)
      }

      RNReactNativeSharedGroupPreferences.setItem(key, JSON.stringify(value), appGroup, error=>{
        if (error != null) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }
}
