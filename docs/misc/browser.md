---
sidebar_position: 1
---

# Browser

## Chrome disables two finger back and forward navigation

[StackOverflow: How do I disable chrome tow finger back forward navigation](https://apple.stackexchange.com/questions/21236/how-do-i-disable-chromes-two-finger-back-forward-navigation)

> The AppleEnableSwipeNavigateWithScrolls is the global setting, that can be overwritten for any specified app

```bash
defaults write com.google.Chrome AppleEnableSwipeNavigateWithScrolls -bool FALSE
```

## Chrome disables CORS

[StackOverflow: How to disable CORS in chrome mac](https://stackoverflow.com/questions/57552185/how-to-disable-cors-in-chrome-mac)

```bash
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```