import { NativeModules } from 'react-native'
const { RNReactNativeSharedGroupPreferences } = NativeModules

export default class SharedGroupPreferences {

  static async getItem(key, appGroup) {
    return new Promise((resolve, reject)=>{
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
