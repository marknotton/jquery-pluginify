/**
* Convert plugin class into a jQuery plugin
*
* @see https://gist.github.com/monkeymonk/c08cb040431f89f99928132ca221d647
* @see https://gist.github.com/benjasHu/9224d60fe0da10e697a1
*
* @param pluginName [string] Plugin name
* @param className [object] Class of the plugin
* @param shortHand [bool] Generate a shorthand as $.pluginName
*
* @example
*
* class MyPlugin {
*   constructor(element, options) {
*     // ...
*   }
* }
*
* MyPlugin.defaults = {};
*
* pluginify('myPlugin', MyPlugin);
*/

function pluginify(pluginName, className, shortHand = false) {
  let dataName = `__${pluginName}`;
  let old = $.fn[pluginName];

  $.fn[pluginName] = function (option) {
    return this.each(function () {
      let $this = $(this);
      let data = $this.data(dataName);
      let options = $.extend({}, className.defaults, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data(dataName, (data = new className(this, options)));
      }

      if (typeof option === 'string') {
        data[option]();
      }
    });
  };

  // - Short hand
  if (shortHand) {
    $[pluginName] = (options) => $({})[pluginName](options);
  }

  // - No conflict
  $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;
}
