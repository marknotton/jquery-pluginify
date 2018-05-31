/** Convert plugin class into a jQuery plugin
// @see https://github.com/marknotton/jquery-pluginify
**/

function pluginify(...settings) {

  if (settings.length == 1 && typeof settings == 'object') {
    var {name, classname, iterate = true, shorthand = false} = settings[0];
  } else {
    var [name, classname, iterate = true, shorthand = false] = [settings][0];
  }

  if ( typeof name == 'undefined' || typeof classname == 'undefined' ) {
    console.warn('Pluginify requires a name and class reference');
    return false;
  }

  let dataName = `__${name}`;
  let old = $.fn[name];

  $.fn[name] = function (...option) {

    if (option.length == 1 && typeof option == 'object') {
      option = option[0];
    }

    if (iterate) {

      this.each((index, element) => {

        let $this = $(element);
        let data = $this.data(dataName);
        let options = $.extend({}, classname.settings, classname.defaults, $this.data(), typeof option === 'object' && option);

        if (!data) {
          $this.data(dataName, (data = new classname(this, options)));
        }

        if (typeof option === 'string') {
          data[option]();
        }

      });

    } else {

      let $this = $(this);
      let data = $this.data(dataName);
      let options = $.extend({}, classname.settings, classname.defaults, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data(dataName, (data = new classname(this, options)));
      }

      if (typeof option === 'string') {
        data[option]();
      }

    }

  };

  // Generate a shorthand as $.pluginName
  if (shorthand) {
    $[name] = (options) => $({})[name](options);
  }

  // - No conflict
  $.fn[name].noConflict = () => $.fn[name] = old;
}
