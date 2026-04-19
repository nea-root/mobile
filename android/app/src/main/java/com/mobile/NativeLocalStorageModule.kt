package com.mobile

import android.content.Context
import android.util.Log
import android.content.SharedPreferences
import com.mobile.NativeLocalStorageSpec
import com.facebook.react.bridge.ReactApplicationContext
import java.lang.Exception

class NativeLocalStorageModule(reactContext: ReactApplicationContext) : NativeLocalStorageSpec(reactContext) {

    override fun getName() = NAME

    override fun setItem(value: String, key: String) {
        val context = getReactApplicationContext()
        if (context == null) {
            Log.d("getItem Error", "ReactApplicationContext is null.")
        }
        try {
            val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
            val editor = sharedPref.edit()
            editor.putString(key, value)
            editor.apply()
            Log.d("setItem --- log", "$key addey for value - $value")
        }
        catch (e:Exception){
            Log.d("setItem Error --- log", "$key addey for value - $value - ${e.toString()}")
        }

    }

    override fun getItem(key: String): String? {
        val context = getReactApplicationContext()
        if (context == null) {
            Log.d("getItem Error", "ReactApplicationContext is null.")
            return null
        }
        try{
            val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs",Context.MODE_PRIVATE)
            val username = sharedPref.getString(key, null)
            Log.d("getItem --- log", "${username.toString()} retrieved from $key")
            return "hello"
        }
        catch (e:Exception){
            Log.d("getItem Error --- log", " ${e.toString()}")
            return null
        }

    }

    override fun removeItem(key: String) {
        val context = getReactApplicationContext()
        if (context == null) {
            Log.d("getItem Error", "ReactApplicationContext is null.")
        }
        val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
        val editor = sharedPref.edit()
        editor.remove(key)
        editor.apply()
    }

    override fun clear() {
        val context = getReactApplicationContext()
        if (context == null) {
            Log.d("getItem Error", "ReactApplicationContext is null.")
        }
        val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
        val editor = sharedPref.edit()
        editor.clear()
        editor.apply()
    }

    companion object {
        const val NAME = "NativeLocalStorage"
    }
}