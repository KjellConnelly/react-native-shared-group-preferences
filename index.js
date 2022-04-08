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

  static async getItem(key, appGroup, inputOptions) {
    return new Promise((resolve, reject)=>{
      if ((Platform.OS != 'ios') && (Platform.OS != 'android')) {
        reject(Platform.OS)
      }

      const options = inputOptions || {}
      RNReactNativeSharedGroupPreferences.getItem(key, appGroup, options, (errorCode, item)=>{
        if (errorCode != null) {
          reject(errorCode)
        } else {
          var isJson = false;
          try {
            var json = JSON.parse(str);
            isJson = typeof json === 'object';
          } catch (e) {
            isJson = false;
          }

          if (isJson) {
            resolve(JSON.parse(item))
          } else {
            resolve(item)
          }
        }
      })
    })
  }

  static async setItem(key, value, appGroup, inputOptions) {
    return new Promise((resolve, reject)=>{
      if ((Platform.OS != 'ios') && (Platform.OS != 'android')) {
        reject(Platform.OS)
      }

      const options = inputOptions || {}

      var _value = String(value)
      if (typeof value == 'object'){
        _value = JSON.stringify(value)
      }
      
      RNReactNativeSharedGroupPreferences.setItem(key, _value, appGroup, options, errorCode=>{
        if (errorCode != null) {
          reject(errorCode)
        } else {
          resolve()
        }
      })
    })
  }
/*
  static async saveFile(filenameAndKey, urlToFile, appGroup, inputOptions) {
    return new Promise((resolve, reject)=>{
      if ((Platform.OS != 'ios') && (Platform.OS != 'android')) {
        reject(Platform.OS)
      }

      const options = inputOptions || {}
      RNReactNativeSharedGroupPreferences.saveFile(filenameAndKey, urlToFile, appGroup, options, errorCode=>{
        if (errorCode != null) {
          reject(errorCode)
        } else {
          resolve()
        }
      })
    })
  }

  static async getUrlToFile(filenameAndKey, appGroup, inputOptions) {
    return new Promise((resolve, reject)=>{
      if ((Platform.OS != 'ios') && (Platform.OS != 'android')) {
        reject(Platform.OS)
      }

      const options = inputOptions || {}
      RNReactNativeSharedGroupPreferences.getUrlToFile(filenameAndKey, appGroup, options, (errorCode, item)=>{
        if (errorCode != null) {
          reject(errorCode)
        } else {
          resolve(JSON.parse(item))
        }
      })
    })
  }
  */
}
