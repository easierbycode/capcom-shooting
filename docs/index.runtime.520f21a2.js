
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire0d0c"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire0d0c"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("fPVVQ", function(module, exports) {

$parcel$export(module.exports, "register", () => $b8788e7f54e300b6$export$6503ec6e8aabbaf, (v) => $b8788e7f54e300b6$export$6503ec6e8aabbaf = v);
var $b8788e7f54e300b6$export$6503ec6e8aabbaf;
var $b8788e7f54e300b6$export$f7ad0328861e2f03;
"use strict";
var $b8788e7f54e300b6$var$mapping = new Map();
function $b8788e7f54e300b6$var$register(baseUrl, manifest) {
    for(var i = 0; i < manifest.length - 1; i += 2)$b8788e7f54e300b6$var$mapping.set(manifest[i], {
        baseUrl: baseUrl,
        path: manifest[i + 1]
    });
}
function $b8788e7f54e300b6$var$resolve(id) {
    var resolved = $b8788e7f54e300b6$var$mapping.get(id);
    if (resolved == null) throw new Error("Could not resolve bundle with id " + id);
    return new URL(resolved.path, resolved.baseUrl).toString();
}
$b8788e7f54e300b6$export$6503ec6e8aabbaf = $b8788e7f54e300b6$var$register;
$b8788e7f54e300b6$export$f7ad0328861e2f03 = $b8788e7f54e300b6$var$resolve;

});

var $f73f7b3171b2517e$exports = {};

(parcelRequire("fPVVQ")).register(new URL("", import.meta.url).toString(), JSON.parse('["1UA56","index.8c2f9ebf.js","23guN","game_asset.da0a3259.png","g9ttp","game_ui.9eac6f91.png"]'));


//# sourceMappingURL=index.runtime.520f21a2.js.map
