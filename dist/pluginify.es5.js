"use strict";

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

/** Convert plugin class into a jQuery plugin
// @see https://github.com/marknotton/jquery-pluginify
**/

function pluginify(name, classname) {
  var iterate =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var shorthand =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var ignoreWarning =
    arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (typeof name == "undefined" || typeof classname == "undefined") {
    console.warn("Pluginify requires a name and class reference");
    return false;
  }

  if (!window.jQuery && !ignoreWarning) {
    console.error(
      'Pluginify tried to turn "' +
        name +
        '" into a jQuery plugin, but jQuery was not found.'
    );
  } else {
    var dataName = "__" + name;
    var old = $.fn[name];
    var warned = false;

    $.fn[name] = function() {
      var _this = this;

      for (
        var _len = arguments.length, option = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        option[_key] = arguments[_key];
      }

      if (iterate) {
        return this.each(function(index, element) {
          var $this = $(element);
          var data = $this.data(dataName);
          var options = $.extend(
            {},
            classname.defaults,
            $this.data(),
            (typeof option === "undefined" ? "undefined" : _typeof(option)) ===
              "object" && option
          );

          if (!data) {
            $this.data(dataName, (data = new classname(_this, options)));
          } else {
            if (!warned) {
              console.warn(
                $this[0],
                " These items have already been set to iterate already"
              );
            }
            warned = true;
          }

          if (typeof option === "string") {
            data[option]();
          }
        });
      } else {
        var $this = $(this);
        var data = $this.data(dataName);
        var options = $.extend(
          {},
          classname.defaults,
          $this.data(),
          (typeof option === "undefined" ? "undefined" : _typeof(option)) ===
            "object" && option
        );

        if (!data) {
          $this.data(dataName, (data = new classname(this, options)));
        } else {
          if (!warned) {
            console.warn(
              $this[0],
              " These items have already been set to iterate already"
            );
          }
          warned = true;
        }

        if (typeof option === "string") {
          data[option]();
        }

        return data;
      }
    };

    // Generate a shorthand as $.pluginName
    if (shorthand) {
      $[name] = function(options) {
        return $({})[name](options);
      };
    }

    // - No conflict
    $.fn[name].noConflict = function() {
      return ($.fn[name] = old);
    };
  }
}
