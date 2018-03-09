
# react-native-react-native-shared-group-preferences

## NOT FINISHED
This module isn't finished yet, and the setup was written by a script. Disregard for now as nothing works yet. Do not use.

#### TODO:
1) Write iOS Version
2) Write Android Version
3) Celebrate

## Getting started

##### Install Latest Github Version
`$ npm install --save git+https://git@github.com/kjellconnelly/react-native-shared-group-preferences.git`

##### Install Latest NPM Version
`$ npm install react-native-react-native-shared-group-preferences --save`

### Mostly automatic installation

`$ react-native link react-native-react-native-shared-group-preferences`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-react-native-shared-group-preferences` and add `RNReactNativeSharedGroupPreferences.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeSharedGroupPreferences.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNReactNativeSharedGroupPreferencesPackage;` to the imports at the top of the file
  - Add `new RNReactNativeSharedGroupPreferencesPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-react-native-shared-group-preferences'
  	project(':react-native-react-native-shared-group-preferences').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-react-native-shared-group-preferences/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-react-native-shared-group-preferences')
  	```


## Usage
```javascript
import RNReactNativeSharedGroupPreferences from 'react-native-react-native-shared-group-preferences'

// TODO: What to do with the module?
RNReactNativeSharedGroupPreferences;
```
  
