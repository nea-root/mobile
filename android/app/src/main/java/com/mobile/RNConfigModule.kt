// at android/app/src/main/java/com/myapp/RNConfigModule.java
package com.mobile

import android.content.Context
import android.content.SharedPreferences
import com.mobile.NativeRNConfigSpec
import com.facebook.react.bridge.ReactApplicationContext

class RNConfigModule(reactContext: ReactApplicationContext) : NativeRNConfigSpec(reactContext) {
    override fun getName() = NAME

    override fun getEnv(): String? {
        return BuildConfig.FLAVOR
    }
    companion object {
        const val NAME = "NativeRNConfig"
    }
}