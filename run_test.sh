#!/bin/bash

# rm -rf node_modules/.cache/babel-loader/*
# npm run "android:clean"
# REACT_APP_IS_DETOX_TEST_2=true npm run "e2e:build-android-debug"
npx react-native start  --reset-cache
# npm run "e2e:test-android-debug"