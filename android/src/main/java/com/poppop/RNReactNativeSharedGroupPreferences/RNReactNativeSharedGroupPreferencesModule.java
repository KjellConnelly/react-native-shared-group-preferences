
package com.poppop.RNReactNativeSharedGroupPreferences;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import java.io.*;
import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;

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
/*
    SharedPreferences pref = getSharedPreferences(appGroup);
    SharedPreferences.Editor editor = pref.edit();
    editor.putString(key, value);
    editor.commit();
    callback.invoke(null, "");
    */

    File extStore = Environment.getExternalStorageDirectory();
    String fileName = "data.json";
    String path = extStore.getAbsolutePath() + "/" + fileName;

    try {
       File myFile = new File(path);
       myFile.createNewFile();
       FileOutputStream fOut = new FileOutputStream(myFile);
       OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
       myOutWriter.append(value);
       myOutWriter.close();
       fOut.close();
       callback.invoke(null, "");
    } catch (Exception e) {
       e.printStackTrace();
       callback.invoke(0, null);
    }
  }

  @ReactMethod
  public void getItem(String key, String appGroup, final Callback callback) {
    /*
    SharedPreferences pref = getSharedPreferences(appGroup);
    Object value = pref.getAll().get(key);
    if (value != null) {
      callback.invoke(null, value.toString());
    } else {
      callback.invoke(0, null);
    }
    */

    File extStore = Environment.getExternalStorageDirectory();
    String fileName = "data.json";
    String path = extStore.getAbsolutePath() + "/" + fileName;

    String s = "";
    String fileContent = "";
    try {
       File myFile = new File(path);
       FileInputStream fIn = new FileInputStream(myFile);
       BufferedReader myReader = new BufferedReader(
               new InputStreamReader(fIn));

       while ((s = myReader.readLine()) != null) {
           fileContent += s + "";
       }
       myReader.close();
       callback.invoke(null, fileContent);
    } catch (IOException e) {
       callback.invoke(0, null);
    }
  }
}
