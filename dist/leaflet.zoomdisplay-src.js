(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.LControlZoomDisplay = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  /*
   * L.Control.ZoomDisplay shows the current map zoom level
   */
  function _default(L, options = {}) {
    var _options$position, _options$position2;

    options = Object.assign({
      position: (_options$position = options.position) !== null && _options$position !== void 0 ? _options$position : 'topleft',
      prefix: 'Zoom : '
    }, options);
    L.Control.ZoomDisplay = L.Control.extend({
      options: {
        position: (_options$position2 = options.position) !== null && _options$position2 !== void 0 ? _options$position2 : 'topleft'
      },
      onAdd: function (map) {
        this._map = map;
        this._container = L.DomUtil.create('div', 'leaflet-control-zoom-display leaflet-bar-part leaflet-bar');
        this.updateMapZoom(map.getZoom());
        map.on('zoomend', this.onMapZoomEnd, this);
        return this._container;
      },
      onRemove: function (map) {
        map.off('zoomend', this.onMapZoomEnd, this);
      },
      onMapZoomEnd: function (e) {
        this.updateMapZoom(this._map.getZoom());
      },
      updateMapZoom: function (zoom) {
        if (zoom === undefined) {
          zoom = '';
        }

        this._container.innerHTML = String(options.prefix) + zoom;
      }
    });
    L.Map.mergeOptions({
      zoomDisplayControl: true
    });
    L.Map.addInitHook(function () {
      if (this.options.zoomDisplayControl) {
        this.zoomDisplayControl = new L.Control.ZoomDisplay();
        this.addControl(this.zoomDisplayControl);
      }
    }); // Factory

    L.control.zoomDisplay = function (options) {
      return new L.Control.ZoomDisplay(options);
    };

    return L.Control.ZoomDisplay;
  }
});
