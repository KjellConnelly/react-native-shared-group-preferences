
# react-native-shared-group-preferences

#### To Know
- Doesn't work for Expo since this uses native code.
- iOS & Android ONLY
- Uses Xcode's Shared Preferences App Groups (iOS) and ??? for Android
- Once you install via npm, you will need to do some configuration in Xcode for your javascript to access a shared group container.
- I tried to model this after React Native's AsyncStorage. Main thing is that you no longer need to do JSON.stringify and JSON.parse when you set/get. Not sure why they make you do that to begin with... but you can set/get an JSONable item using this module.

## NOT FINISHED
This module works for iOS only right now.

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
    this.saveUserDataToSharedStorage(userData)
  }

  async saveUserDataToSharedStorage(data) {
    try {
      await SharedGroupPreferences.setItem("savedData", data, appGroupIdentifier)
      this.loadUsernameFromSharedStorage()
    } catch(error) {
      console.log(error)
    }
  }

  async loadUsernameFromSharedStorage() {
    try {
      const loadedData = await SharedGroupPreferences.getItem("savedData", appGroupIdentifier)
      this.setState({username:loadedData.name})
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    <View>
      <Text>
        {this.state.username ? "Loading..." : "Welcome back " + this.state.username}
      </Text>
    </View>
  }
}

```
