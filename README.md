taimerJS
========

Pure timer JavaScript plugin

### Usage

Include in HTML file and run
```javascript
var t0 = new Taimer(15, '', '', null, false);
```
or 
```javascript
var t1 = new Taimer(15, 'Timer: ', ' seconds', 't1', true);
```
###### Format
```javascript
Taimer(timeLength, prefix, suffix, elementId, reversed)
```
- timeLength (integer): time timer shouls run (in seconds)
- prefix (string): text to output before the timer value
- suffix (string): text to output after the timer value
- elementId (string): null or HTML of html tag to put timer value in (current refresh rate is 1 second)
- reversed (boolean): false to start from zero, true to countdown to zero

### Usage
##### 2013-Mar-06
- Singleton model with simple display

### Todo
- Remove singleton dependancy
- Pass parameters as object
- Display as timer
- Pause functionality