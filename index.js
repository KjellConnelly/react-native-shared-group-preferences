import { NativeModules } from 'react-native'
const { RNReactNativeSharedGroupPreferences } = NativeModules

export default class SharedGroupPreferences {
  static async getItem(key, appGroup) {
    // RNReactNativeSharedGroupPreferences
    let item = 'You got an item'
    return new Promise(resolve=>{
      resolve(item)
    })
  }

  static async setItem(key, value, appGroup) {
    let error = null

    return new Promise(resolve=>{
      resolve(error)
    })
  }
}
