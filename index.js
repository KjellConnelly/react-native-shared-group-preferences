import { NativeModules } from 'react-native'
const { RNReactNativeSharedGroupPreferences } = NativeModules

export default class SharedGroupPreferences {

  static async getItem(key, appGroup) {
    let response = RNReactNativeSharedGroupPreferences.getItem(key, appGroup)
    return new Promise((resolve, reject)=>{
      alert(response)
      resolve("getItem")
    })
  }

  static async setItem(key, value, appGroup) {
    let response = RNReactNativeSharedGroupPreferences.setItem(key, value, appGroup)
    return new Promise((resolve, reject)=>{
      alert(response)
      resolve("setItem")
    })
  }
}
