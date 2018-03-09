
package com.poppop.RNReactNativeSharedGroupPreferences;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNReactNativeSharedGroupPreferencesModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNReactNativeSharedGroupPreferencesModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  private SharedPreferences getSharedPreferences(String appGroup) {
    return reactContext.getApplicationContext().getSharedPreferences(appGroup, Context.MODE_PRIVATE);
  }

  @Override
  public String getName() {
    return "RNReactNativeSharedGroupPreferences";
  }

  @ReactMethod
  public void setItem(String key, String value, String appGroup, final Callback callback) {
    SharedPreferences pref = getSharedPreferences(appGroup);
    SharedPreferences.Editor editor = pref.edit();
    editor.putString(key, value);
    editor.commit();
    callback.invoke(null);
  }

  @ReactMethod
  public void getItem(String key, String appGroup, final Callback callback) {
    SharedPreferences pref = getSharedPreferences(appGroup);
    Object value = pref.getAll().get(key);
    if (value != null) {
      callback.invoke(null, value.toString());
    } else {
      callback.invoke(0);
    }
  }
}
