
# react-native-shared-group-preferences

## Too Lazy to Test Locally. Make sure to install from NPM as the github version is currently under testing.

## What is this Module for?
You have multiple React-Native apps for iOS or Android and want them to be able to share data in a centralized location on the user's device. For example, you have a series of RPG games where all of your apps share the same gold currency. So if in app #1, the user beats the game, they will have a ton of gold. So when the user downloads the next game, they will be able to still use this gold. Cool huh?

#### To Know
- Doesn't work for Expo since this uses native code.
- iOS & Android ONLY
- Uses Xcode's Shared Preferences App Groups (iOS) and Public External Storage for Android.
- Once you install via npm, you will need to do some configuration in Xcode for your javascript to access a shared group container. Android will need Permissions.
- I tried to model this after React Native's AsyncStorage. Main thing is that you no longer need to do JSON.stringify and JSON.parse when you set/get. Not sure why they make you do that to begin with... but you can set/get an JSONable item using this module.
- All methods return a promise. So make sure to make your functions async.
- iOS's data is securely sandboxed within your app group. I couldn't find something as easy to access, or that wouldn't be deleted if you delete an app, so the Android version saves a json file to the android device's external storage. This is good because if the app is deleted, another app can still access the data. But this is bad because any other app can delete/edit/access this file. For this reason, at least for Android, do not store data in it that is sensitive. If you're saving user preferences, fine. But do not save something like credit card numbers or anything like that in here. That would be irresponsible. The file is saved to the user's storage in the following format: ```$storage/$appGroupIdentifier/data.json```. So make sure your appGroupIdentifier is a valid folder name. Reverse dns works fine.
- Also note that if you are using Public Storage (which is done by default) for Android, you must set all data with each save as the key is irrelevant currently. Think of it as having one key/value pair, and that is it. To have multiple key/values, you must set the value as a new javascript object: ```{}```. Then when you ```setItem()```, you must set everything you want to save as ```getItem()``` will only retrieve the one object that can be saved. This is because all data is saved as a single JSON file for Android.


#### TODO:
1) ~~Write iOS Version~~ DONE
2) ~~Write Android Version~~ DONE
3) Double check this works in the app I'm working on.
4) Celebrate

## Getting started

##### Install Latest Github Version
`$ npm i git+https://git@github.com/kjellconnelly/react-native-shared-group-preferences.git`

##### Install Latest Stable NPM Version
`$ npm i react-native-shared-group-preferences`

### Mostly automatic installation

##### New Way (with pod for iOS)
`$ cd ios && pod install && cd ../`

##### Old Way (for ios and android)
`$ react-native link react-native-shared-group-preferences`

## API
 *set/get basic key/value pairs*
- SharedGroupPreferences.setItem(string:key, any:value, string:appGroupIdentifier, (optional)object:options)
- SharedGroupPreferences.getItem(string:key, string:appGroupIdentifier, (optional)object:options)

## Usage
```javascript
import SharedGroupPreferences from 'react-native-shared-group-preferences'

const appGroupIdentifier = "group.com.mytest"
const userData = {
  name: "Vin Diesel",
  age: 34,
  friends: [
    "Lara Croft",
    "Mike Meyers"
  ]
}

export default class app extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: undefined
    }

    // Not the most professional way to ask for permissions: Just ask when the app loads.
    // But for brevity, we do this here.
    if (Platform.OS == 'android') {
      this.dealWithPermissions()
    } else {
      this.saveUserDataToSharedStorage(userData)
    }
  }

  async dealWithPermissions() {
    try {
      const grantedStatus = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ])
      const writeGranted = grantedStatus["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED
      const readGranted = grantedStatus["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED
      if (writeGranted && readGranted) {
        this.saveUserDataToSharedStorage(userData)
      } else {
        // You can either limit the user in access to the app's content,
        // or do a workaround where the user's data is saved using only
        // within the user's local app storage using something like AsyncStorage
        // instead. This is only an android issue since it uses read/write external storage.
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async saveUserDataToSharedStorage(data) {
    try {
      await SharedGroupPreferences.setItem("savedData", data, appGroupIdentifier)
      this.loadUsernameFromSharedStorage()
    } catch(errorCode) {
      // errorCode 0 = There is no suite with that name
      console.log(errorCode)
    }
  }

  async loadUsernameFromSharedStorage() {
    try {
      const loadedData = await SharedGroupPreferences.getItem("savedData", appGroupIdentifier)
      this.setState({username:loadedData.name})
    } catch(errorCode) {
      // errorCode 0 = no group name exists. You probably need to setup your Xcode Project properly.
      // errorCode 1 = there is no value for that key
      console.log(errorCode)
    }
  }

  render() {
    return (
      <View>
        <Text>
          {this.state.username ? "Loading..." : "Welcome back " + this.state.username}
        </Text>
      </View>
    )
  }
}

```

## iOS Xcode Prep Work
In Xcode, open your Target and click the ```Capabilities``` tab. Go down to ```App Groups```. Add a preexisting identifier or create a new one. Do the same for all the apps that you plan to have a shared container for. Use this identifier for ```appGroupIdentifier``` when you call the javascript functions.

## Android Prep Work (incomplete)

#### External Storage (public storage, any app can access/modify)
You need Android Permissions for READ & WRITE External Storage. You can get permission using React Native's ```PermissionsAndroid``` module. How you ask for Permissions is up to you, but can be accomplished like in the example above. Android API 23+ needs you to ask for permissions within the app itself. Below 23 and you can just add these permissions your ```AndroidManifest.xml``` file. For all versions, you will still need to add these to your manifest. Just you will also need to ask for it in 23+.
```
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

#### External Storage *GOTCHA*

Since writing this module in maybe 2018, and only testing it with SDK Version 28 and below, it has come to my attention that `Public External Storage` is deprecated in version 29. Nevertheless, if your device targets 29, you can still use external storage my modifying your `AndroidManifest.xml` file. This is a temporary work around so that all users (even those with 30+) can use this library's ability to access/write public external storage. However, I believe in August of 2021, all new apps submitted to Google Play must target SDK 30 or above to upload new builds. So for now, I am giving this temporary work around until I find a solution for SDK30+.

1. Open `../android/app/src/main/AndroidManifest.xml` and add `android:requestLegacyExternalStorage="true"`
``` xml
<!-- example -->
<manifest ...>
  <application
    ...
    android:requestLegacyExternalStorage="true">
```
2. Open `../android/build.gradle` and make sure targetSdkVersion is 29 or below. If you target 30+, the added `android:requestLegacyExternalStorage="true"` will be ignored. So public external storage will only work for 28 and below. But if you target 29, public external storage will work for all devices.
``` gradle
buildscript {
    ext {
        ...
        targetSdkVersion = 29
    }
```

*Note* Since public external storage is being deprecated, if you use this library, you may have to find a work around to transitioning the public storage file(s) you create using this library somewhere else. I am currently working on (as of Feb 2021) on using `Content Providers`. I am not sure if this solution will work, but I figure I can support my buggy apps for the next few months by requesting legacy external storage for now. If this solution works, I hope to create a solution where data instantly will be copied from public external storage if there is no data in the content provider, and then use content provider exclusively after that.

#### Shared Preferences (internal app storage)

Some users may want to use Android `SharedPreferences` instead of Public External Storage. This has the benefit of not having to add the above Permissions prep work. For instance, if you use an extension, you may prefer this. Or maybe you add some settings that I don't know about where SharedPreferences will work for you. If this is the case, just add an optional Options object to the end of your calls like this:
```javascript
try {
  const loadedData = await SharedGroupPreferences.getItem("savedData", appGroupIdentifier, {useAndroidSharedPreferences:true})
  this.setState({username:loadedData.name})
} catch(errorCode) {
  console.log(errorCode)
}
```
or
```javascript
  try {
    await SharedGroupPreferences.setItem("savedData", data, appGroupIdentifier, {useAndroidSharedPreferences:true})
    this.loadUsernameFromSharedStorage()
  } catch(errorCode) {
    // errorCode 0 = There is no suite with that name
    console.log(errorCode)
  }
```
Options are optional and currently only affect Android. No changes are needed to your code if you want your code to keep working as it did before updating to the current version.


## Extras because I'm Lazy
I've added extra functionality to this module that isn't related because it's it's a pain creating a new npm module and setting everything up.

```javascript
  // This Android only script lets you check if another app is installed based on package name. The example below is for Facebook.
  const facebookPackageName = "com.facebook.android"
  try {
    const installed = await SharedGroupPreferences.isAppInstalledAndroid(facebookPackageName)
    console.log("Facebook is installed on this device")
  } catch (err) {
    console.log("Facebook is not installed")
  }
```
