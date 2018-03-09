import { NativeModules } from 'react-native'
const { RNReactNativeSharedGroupPreferences } = NativeModules

export default class SharedGroupPreferences {

  static async getItem(key, appGroup) {
    return new Promise((resolve, reject)=>{
      RNReactNativeSharedGroupPreferences.getItem(key, appGroup, response=>{
        if (response[0]) {
          reject(response[0])
        } else {
          resolve(response[1])
        }
      })
    })
  }

  static async setItem(key, value, appGroup) {
    return new Promise((resolve, reject)=>{
      RNReactNativeSharedGroupPreferences.setItem(key, value, appGroup, response=>{
        if (response[0]) {
          reject(response[0])
        } else {
          resolve()
        }
      })
    })
  }
}
