---
sidebar_position: 1
---

# Web.config

[Article](https://blog.miniasp.com/post/2015/11/23/How-Class-library-read-config-from-webconfig-or-appconfig-file).

Replace the matched setting in `Web.Template.config` to produce `Web.config`.

```xml title="Web.Debug.config"
<appSettings>
  <add key="HashKey" value="abcdefg" xdt:Transform="Repleace" xdt:Locator="Match(key)" />
</appSettings>
```

```xml title="Web.Template.config"
<appSettings>
  <add key="HashKey" value="" />
</appSettings>
```
