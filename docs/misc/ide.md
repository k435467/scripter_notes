---
sidebar_position: 2
---

# IDE

## JetBrains

1. Custom Settings
    1. maximum heap size → 1280 to 2048
    2. Plugins
        1. Grazie Lite
        2. Material Theme UI
            1. Enable Contract
        3. Tabnine
        4. Key Promoter X
    3. Font Size 24. Line Height 1.3
    4. Tooltip Delay 300ms
    5. Console Font Size 20
    6. Enable CamelHumps → Editor | General | Typing Assistance
    7. Key Map
        1. Open terminal → Control Esc
        2. Navigate To → Commnad N
        3. Generate → Command Enter
        4. Refactor → Command Shift R
        5. Type-Matching Completion → Option Shift Esc
        6. Context Action → Option Enter
        7. Surround With → Command Shift S
2. **Code cleanup**
3. **Change signature refactoring** → reorder params it will show a grey border → command.
4. command K + command I ⇒ show quick document
5. command shift F7 (F7 have changed to F12) ⇒ find usage in the current file. When the caret is on the using keyword, it would show all usage of the namespace in the file.
6. Ctrl+Alt+Shift+8 to enable analysis in large file
7. Command shift space - show a valid list of parameters
8. F3 FindNext, Shift F3 FindPrevious

### Start Error

Got an error when starting up that was caused by a third-party plugin. Try to disable the plugin.

```bash
open -a /Applications/WebStorm.app --args disableNonBundledPlugins
```

## VS Code

1. **Open multiple files from Quick Open** → command P → Right Arrow Key
2. Navigate between **recently opened folders** and workspaces → control R
3. **Errors** and warnings
    1. command shift M → open error panel
    2. F8 → next error
    3. shift F8 → prev error
4. Toggle **Sidebar** → command B
5. Toggle **Panel** → command J
6. **Side-by-side** editing → command \
7. Navigate **Back** → control -
8. Navigate **Forward** → shift control -
9. Set **Cursor Above** → option command Up Arrow Key
10. **Column** **Selection** → shift option cursor select
11. Fast **scrolling** → option scroll
12. **Shrink / Expand Selection** → command shift control Left Arrow Key / Right Arrow Key
13. Go to **Symbol** in File → shift command O
    1. add a colon (:) to group symbols
14. Go to Symbol in Workspace → command T
15. **Undo cursor** position → command U
16. Code **folding** → command option [  ]
    1. command: fold all or unfold all
17. Open **references view** → option shift F12
18. **Refactoring** → control shift R
