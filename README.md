# Touch OSC Telnet Bridge

## Supported TouchOSC Input Types

### Toggle Button
Name format:
```
toggle/command name
```
 
### Fader V/H, Rotary V/H
Name format:
```
number/command name
```

### Multi-Push
Name format:
```
custom/command name
```
Edit `custom-values.js` to match the rows and columns of the multi-push
```
module.exports = {
  'monitor out': [
    ['program', 'internal matte'],
    ['fg', 'fill'],
    ['bg', 'layer in'],
    ['combined matte', 'background matte in'],
  ],
}
```

