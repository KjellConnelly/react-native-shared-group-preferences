
# react-native-shared-group-preferences

#### To Know
- Doesn't work for Expo since this uses native code.
- iOS & Android ONLY
- Uses Xcode's Shared Preferences App Groups (iOS) and Public External Storage for Android.
- Once you install via npm, you will need to do some configuration in Xcode for your javascript to access a shared group container.
- I tried to model this after React Native's AsyncStorage. Main thing is that you no longer need to do JSON.stringify and JSON.parse when you set/get. Not sure why they make you do that to begin with... but you can set/get an JSONable item using this module.
- All methods return a promise. So make sure to make your functions async.
- iOS's data is securely sandboxed within your app group. I couldn't find something as easy to access, or that wouldn't be deleted if you delete an app, so the Android version saves a json file to the android device's external storage. This is good because if the app is deleted, another app can still access the data. But this is bad because any other app can delete/edit/access this file. For this reason, at least for Android, do not store data in it that is sensitive. If you're saving user preferences, fine. But do not save something like credit card numbers or anything like that in here. That would be irresponsible. The file is saved to the user's storage in the following format: ```$storage/$appGroupIdentifier/data.json```. So make sure your appGroupIdentifier is a valid folder name. Reverse dns works fine.


#### TODO:
1) ~~Write iOS Version~~ DONE
2) Write Android Version
3) Celebrate

## Getting started

##### Install Latest Github Version
`$ npm install --save git+https://git@github.com/kjellconnelly/react-native-shared-group-preferences.git`

##### Install Latest NPM Version (Not uploaded to NPM yet)
`$ npm install react-native-react-native-shared-group-preferences --save`

### Mostly automatic installation
`$ react-native link react-native-react-native-shared-group-preferences`

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
    // check for permissions on android
    if (Platform.OS == 'android') {
      this.dealWithPermissions()
    } else {
      this.saveUserDataToSharedStorage(userData)
    }
  }

  async dealWithPermissions() {
    
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
- You need Android Permissions for READ & WRITE External Storage. You can get permission using React Native's ```PermissionsAndroid``` module. How you ask for Permissions is up to you, but can be accomplished like in the example above.
