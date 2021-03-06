! function(e) {
    function r(t) {
        if (n[t]) return n[t].exports;
        var o = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    var n = {};
    r.m = e, r.c = n, r.d = function(e, n, t) {
        r.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: t
        })
    }, r.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(n, "a", n), n
    }, r.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }, r.p = "", r(r.s = 0)
}([function(e, r, n) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var t = n(1);
    r.default = angular.module("angularjsdb", []).service("angularjsdb", ["$q", t.a])
}, function(e, r, n) {
    "use strict";

    function t(e) {
        return function(r) {
            return o || (o = new u.a(e, r)), o
        }
    }
    var o, u = n(2);
    r.a = t
}, function(e, r, n) {
    "use strict";

    function t(e, r) {
        function n(n, t) {
            return o(e, r).then(function(r) {
                var o = e.defer();
                return i(r, n).add(t).onsuccess = function(e) {
                    o.resolve(e.target.result)
                }, o.promise
            })
        }

        function t(n) {
            return o(e, r).then(function(r) {
                var t = e.defer(),
                    o = [];
                return i(r, n).openCursor().onsuccess = function(e) {
                    var r = e.target.result;
                    r ? (o.push(r.value), r.continue()) : t.resolve(o)
                }, t.promise
            })
        }

        function u(n, t) {
            return o(e, r).then(function(r) {
                var o = e.defer();
                return i(r, n).get(t).onsuccess = function(e) {
                    o.resolve(e.target.result)
                }, o.promise
            })
        }

        function c(n, t) {
            return o(e, r).then(function(r) {
                var o = e.defer();
                return i(r, n).delete(t).onsuccess = function() {
                    o.resolve()
                }, o.promise
            })
        }

        function s(n, t, c) {
            return e.all([o(e, r), u(n, c)]).then(function(r) {
                var o = e.defer(),
                    u = r[0],
                    c = r[1];
                for (var s in t) c[s] = t[s];
                return i(u, n).put(c).onsuccess = function(e) {
                    o.resolve()
                }, o.promise
            })
        }

        function i(e, r) {
            return e.transaction([r], "readwrite").objectStore(r)
        }
        var a = this;
        a.add = n, a.list = t, a.delete = c, a.get = u, a.put = s, a.openStore = i
    }

    function o(e, r) {
        var n = e.defer();
        if (u) return n.resolve(u), n.promise;
        var t = window.indexedDB.open(r.name, r.version);
        return t.onupgradeneeded = function(e) {
            var n = e.target.result;
            r.stores.forEach(function(e) {
                n.objectStoreNames.contains(e) && n.deleteObjectStore(e), n.createObjectStore(e, {
                    keyPath: "id",
                    autoIncrement: !0
                })
            })
        }, t.onsuccess = function(e) {
            u = e.target.result, n.resolve(u)
        }, n.promise
    }
    var u;
    r.a = t
}]);