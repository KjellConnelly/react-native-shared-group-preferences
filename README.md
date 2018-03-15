
# react-native-shared-group-preferences

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


#### TODO:
1) ~~Write iOS Version~~ DONE
2) ~~Write Android Version~~ DONE
3) Double check this works in the app I'm working on.
4) Celebrate

## Getting started

##### Install Latest Github Version
`$ npm install --save git+https://git@github.com/kjellconnelly/react-native-shared-group-preferences.git`

##### Install Latest Stable NPM Version
`$ npm install react-native-shared-group-preferences --save`

### Mostly automatic installation
`$ react-native link react-native-shared-group-preferences`

## API
- SharedGroupPreferences.setItem(string: key, any: value, string: appGroupIdentifier)
- SharedGroupPreferences.getItem(string: key, string: appGroupIdentifier)

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
      // errorCode 0 = there is no value for that key
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
- You need Android Permissions for READ & WRITE External Storage. You can get permission using React Native's ```PermissionsAndroid``` module. How you ask for Permissions is up to you, but can be accomplished like in the example above. Android API 23+ needs you to ask for permissions within the app itself. Below 23 and you can just add these permissions your ```AndroidManifest.xml``` file. For all versions, you will still need to add these to your manifest. Just you will also need to ask for it in 23+.
```
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```
