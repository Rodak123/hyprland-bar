# Hyprland Bar

An Electron + React hyprland topbar.

## Contents

- [Hyprland Bar](#hyprland-bar)
  - [Contents](#contents)
  - [ToDo](#todo)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Modules](#modules)

## ToDo

- [ ] Use Docker
- [ ] Create multiple topbar components
- [ ] Make it configurable 

## Prerequisites

Node ^24

## Setup

```bash
npm install
```

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
    no_focus = false,
    no_blur = true,
    no_follow_mouse = true,
    border_size = 0
})

hl.window_rule({
    match = { title = "Topbar Popup" },
    pin = true,
    move = { "cursor_x", 40 },
})
```

```lua
-- Monitor reserved area
hl.monitor({ 
    reserved_area = { top = 40, bottom = 0, left = 0, right = 0 }
})
```

To run the dev environment:
```bash
npm run start
``` 

## Modules

Each module is a react component.

- [ ] Time - shows current time
- [ ] Storage - shows available/used storage
- [ ] Workspace - shows current workspace + apps that run in it
- [ ] Battery - shows battery status and if it is charging
- [ ] Audio
- [ ] System
- [ ] Num Pad/Caps Lock
- [ ] Keyboard
- [ ] Wifi
- [ ] Bluetooth