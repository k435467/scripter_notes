---
slug: port-or-address-in-use
title: Port or Address in Use
authors: ethan
tags: [port, address, in use]
---

```shell
sudo lsof -i :8081    # list of, -i for internet

kill -9 32731    # kill the process, 9 for the non-ignorable kill instead of hang, abort, or whatever else.
```