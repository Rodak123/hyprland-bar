# Hyprland Bar [WIP]

An Electron + React hyprland topbar.

## Setup

Since electron is just an desktop app, you'll need to manually configure hyprland
to treat it like a topbar and also to reserve space on the top.

```lua
-- Custom Topbar rules
hl.window_rule({
    match = { title = "Topbar" },
    float = true,
    move = "0 0",
    pin = true,
    rounding=0,
    no_shadow = true,
    no_focus = true,
    no_blur=true,
    no_follow_mouse=true,
    border_size=0
})
```

```lua
-- Monitor reserved area
hl.monitor({ 
    reserved_area = { top = 40, bottom = 0, left = 0, right = 0 }
})
```