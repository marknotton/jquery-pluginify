# jQuery Pluginify

Convert plugin class into a jQuery plugin

### Installation

```
npm i jquery-pluginify --save
```

### Requires
ES6 Support


### Options
| Name      | Type   | Description |
|-----------|--------|-------------|
| name      | string | Plugin name reference
| classname | object | Class reference
| iterate   | bool   | Defaults to true.
|           | | **True** - Defines a class for every instance of the elements found.
|           | | **False** - Defines the class just once, and passes all element instances through to the class.
| shorthand | bool   | Defaults to false. Generate a shorthand as $.name
| ignoreWarning | bool | Defaults to false. Set to `true` if you want to ignore the fact the jQuery isn't found at the time of calling this function.

### Example

```js
class myClass {
  constructor(elements, ...settings) {
    // console.log(elements, settings);
  }
}
```
Define default settings to apply to all instances of the class
```js
myClass.settings = {};
```

Define settings like this:
```js
pluginify('myPlugin', myClass, false, true);
```
Or like this (in any order):
```js
pluginify({
  name      : 'myPlugin',
  classname : myClass,
  shorthand : false,
  iterate   : true,
});
```

How it might be used
```js
$('nav ul li').myPlugin({...})
```



### Credit
[monkeymonk](https://gist.github.com/monkeymonk/c08cb040431f89f99928132ca221d647)
[benjasHu](https://gist.github.com/benjasHu/9224d60fe0da10e697a1)
