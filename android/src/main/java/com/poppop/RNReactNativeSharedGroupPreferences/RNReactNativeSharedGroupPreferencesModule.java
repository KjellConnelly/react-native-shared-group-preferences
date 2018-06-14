
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
  public void setItem(String key, String value, String appGroup, final Callback callback, ReadableMap options) {
    boolean useAndroidSharedPreferences = options.getBoolean("useAndroidSharedPreferences") || false;

    if (useAndroidSharedPreferences) {
      SharedPreferences preferences = getSharedPreferences(appGroup);
      SharedPreferences.Editor editor = preferences.edit();
      editor.putString(key, value);
      editor.apply();
    } else {
      File extStore = Environment.getExternalStorageDirectory();
      String fileName = "data.json";

      try {
        File dir = new File(extStore.getAbsolutePath() + "/" + appGroup + "/");
        dir.mkdir();
        File myFile = new File(dir, fileName);
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
  }

  @ReactMethod
  public void getItem(String key, String appGroup, final Callback callback, ReadableMap options) {
    boolean useAndroidSharedPreferences = options.getBoolean("useAndroidSharedPreferences") || false;

    if (useAndroidSharedPreferences) {
      SharedPreferences preferences = getSharedPreferences(appGroup);
      String value = preferences.getString(key, null);
      callback.invoke(null, value);
    } else {
      File extStore = Environment.getExternalStorageDirectory();
      String fileName = "data.json";
      String path = extStore.getAbsolutePath() + "/" + appGroup + "/" + fileName;

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
}
