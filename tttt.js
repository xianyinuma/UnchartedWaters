/*
 RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/requirejs/domReady for details
 */
'use strict';
(function () {
    function $(g) {
        var d = document.getElementById("loader"), b = document.getElementById("fader");
        d.style.display = "none";
        b.style.display = "inline";
        Q(b.style, "opacity", 1, 0, 1E3, function (a) {
            b.style.display = "none";
            g && g(a)
        })
    }

    function Q(g, d, b, a, f, e) {
        var c, b = g[d] = b, g = W.bind(null, g, d, (a - b) * 15 / (f || 1E3), a, function (a) {
            clearInterval(c);
            e && e(a)
        });
        c = setInterval(g, 15)
    }

    function W(g, d, b, a, f) {
        var e = +g[d] + b;
        if (b < 0 && e <= a || b > 0 && e >= a)e = a, f && f(g);
        g[d] = e
    }

    var R, o;
    (function (g) {
        function d(a, c) {
            var f, e, b, i, d,
                j, h, g, k, l = c && c.split("/"), m = r.map, n = m && m["*"] || {};
            if (a && a.charAt(0) === ".")if (c) {
                l = l.slice(0, l.length - 1);
                a = l.concat(a.split("/"));
                for (g = 0; g < a.length; g += 1)if (f = a[g], f === ".")a.splice(g, 1), g -= 1; else if (f === "..")if (g === 1 && (a[2] === ".." || a[0] === ".."))break; else g > 0 && (a.splice(g - 1, 2), g -= 2);
                a = a.join("/")
            } else a.indexOf("./") === 0 && (a = a.substring(2));
            if ((l || n) && m) {
                f = a.split("/");
                for (g = f.length; g > 0; g -= 1) {
                    e = f.slice(0, g).join("/");
                    if (l)for (k = l.length; k > 0; k -= 1)if (b = m[l.slice(0, k).join("/")])if (b = b[e]) {
                        i = b;
                        d = g;
                        break
                    }
                    if (i)break;
                    !j && n && n[e] && (j = n[e], h = g)
                }
                !i && j && (i = j, d = h);
                i && (f.splice(0, d, i), a = f.join("/"))
            }
            return a
        }

        function b(a, c) {
            return function () {
                return k.apply(g, x.call(arguments, 0).concat([a, c]))
            }
        }

        function a(a) {
            return function (c) {
                return d(c, a)
            }
        }

        function f(a) {
            return function (c) {
                n[a] = c
            }
        }

        function e(a) {
            if (s.call(q, a)) {
                var c = q[a];
                delete q[a];
                m[a] = !0;
                j.apply(g, c)
            }
            if (!s.call(n, a) && !s.call(m, a))throw Error("No " + a);
            return n[a]
        }

        function c(a) {
            var c, f = a ? a.indexOf("!") : -1;
            f > -1 && (c = a.substring(0, f), a = a.substring(f + 1, a.length));
            return [c,
                a]
        }

        function i(a) {
            return function () {
                return r && r.config && r.config[a] || {}
            }
        }

        var j, k, h, l, n = {}, q = {}, r = {}, m = {}, s = Object.prototype.hasOwnProperty, x = [].slice;
        h = function (f, b) {
            var i, j = c(f), h = j[0], f = j[1];
            h && (h = d(h, b), i = e(h));
            h ? f = i && i.normalize ? i.normalize(f, a(b)) : d(f, b) : (f = d(f, b), j = c(f), h = j[0], f = j[1], h && (i = e(h)));
            return {f: h ? h + "!" + f : f, n: f, pr: h, p: i}
        };
        l = {
            require: function (a) {
                return b(a)
            }, exports: function (a) {
                var c = n[a];
                return typeof c !== "undefined" ? c : n[a] = {}
            }, module: function (a) {
                return {id: a, uri: "", exports: n[a], config: i(a)}
            }
        };
        j = function (a, c, i, d) {
            var j, k, r, x, o = [], F, d = d || a;
            if (typeof i === "function") {
                c = !c.length && i.length ? ["require", "exports", "module"] : c;
                for (x = 0; x < c.length; x += 1)if (r = h(c[x], d), k = r.f, k === "require")o[x] = l.require(a); else if (k === "exports")o[x] = l.exports(a), F = !0; else if (k === "module")j = o[x] = l.module(a); else if (s.call(n, k) || s.call(q, k) || s.call(m, k))o[x] = e(k); else if (r.p)r.p.load(r.n, b(d, !0), f(k), {}), o[x] = n[k]; else throw Error(a + " missing " + k);
                c = i.apply(n[a], o);
                if (a)if (j && j.exports !== g && j.exports !== n[a])n[a] = j.exports;
                else if (c !== g || !F)n[a] = c
            } else a && (n[a] = i)
        };
        R = k = function (a, c, f, b, i) {
            if (typeof a === "string")return l[a] ? l[a](c) : e(h(a, c).f); else a.splice || (r = a, c.splice ? (a = c, c = f, f = null) : a = g);
            c = c || function () {
                };
            typeof f === "function" && (f = b, b = i);
            b ? j(g, a, c, f) : setTimeout(function () {
                j(g, a, c, f)
            }, 15);
            return k
        };
        k.config = function (a) {
            r = a;
            return k
        };
        o = function (a, c, f) {
            c.splice || (f = c, c = []);
            !s.call(n, a) && !s.call(q, a) && (q[a] = [a, c, f])
        };
        o.amd = {jQuery: !0}
    })();
    o("almond", function () {
    });
    o("js/lib/domReady", [], function () {
        function g() {
            if (!c) {
                c = !0;
                f && clearInterval(f);
                var a = j;
                if (c && a.length) {
                    j = [];
                    var e;
                    for (e = 0; e < a.length; e += 1)a[e](i)
                }
            }
        }

        function d(a) {
            c ? a(i) : j.push(a);
            return d
        }

        var b, a, f, e = typeof window !== "undefined" && window.document, c = !e, i = e ? document : null, j = [];
        if (e) {
            if (document.addEventListener)document.addEventListener("DOMContentLoaded", g, !1), window.addEventListener("load", g, !1); else if (window.attachEvent) {
                window.attachEvent("onload", g);
                a = document.createElement("div");
                try {
                    b = window.frameElement === null
                } catch (k) {
                }
                a.doScroll && b && window.external &&
                (f = setInterval(function () {
                    try {
                        a.doScroll(), g()
                    } catch (c) {
                    }
                }, 30))
            }
            document.readyState === "complete" && g()
        }
        d.version = "2.0.1";
        d.load = function (a, c, f, e) {
            e.isBuild ? f(null) : d(f)
        };
        return d
    });
    o("goo/entities/Entity", [], function () {
        function g(b, a) {
            this._world = b;
            this._components = [];
            Object.defineProperty(this, "id", {value: g.entityCount++, writable: !1});
            this.name = a !== void 0 ? a : "Entity_" + this.id;
            this.skip = !1
        }

        function d(b) {
            return b.charAt(0).toLowerCase() + b.substr(1)
        }

        g.prototype.addToWorld = function () {
            this._world.addEntity(this)
        };
        g.prototype.removeFromWorld = function () {
            this._world.removeEntity(this)
        };
        g.prototype.setComponent = function (b) {
            if (this.hasComponent(b.type))for (var a = 0; a < this._components.length; a++) {
                if (this._components[a].type === b.type) {
                    this._components[a] = b;
                    break
                }
            } else this._components.push(b);
            this[d(b.type)] = b;
            if (b.type === "TransformComponent")b.entity = this;
            this._world.entityManager.containsEntity(this) && this._world.changedEntity(this, b, "addedComponent")
        };
        g.prototype.hasComponent = function (b) {
            return this[d(b)] !== void 0
        };
        g.prototype.getComponent = function (b) {
            return this[d(b)]
        };
        g.prototype.clearComponent = function (b) {
            var a = this[d(b)], f = this._components.indexOf(a);
            if (f !== -1) {
                a = this._components[f];
                if (a.type === "TransformComponent")a.entity = void 0;
                this._components.splice(f, 1)
            }
            delete this[d(b)];
            this._world.entityManager.containsEntity(this) && this._world.changedEntity(this, a, "removedComponent")
        };
        g.prototype.toString = function () {
            return this.name
        };
        g.entityCount = 0;
        return g
    });
    o("goo/entities/managers/EntityManager", [], function () {
        function g() {
            this.type =
                "EntityManager";
            this._entitiesById = [];
            this._entityCount = 0
        }

        g.prototype.added = function (d) {
            this.containsEntity(d) || (this._entitiesById[d.id] = d, this._entityCount++)
        };
        g.prototype.removed = function (d) {
            this.containsEntity(d) && (delete this._entitiesById[d.id], this._entityCount--)
        };
        g.prototype.containsEntity = function (d) {
            return this._entitiesById[d.id] !== void 0
        };
        g.prototype.getEntityById = function (d) {
            return this._entitiesById[d]
        };
        g.prototype.getEntityByName = function (d) {
            for (var b in this._entitiesById) {
                var a =
                    this._entitiesById[b];
                if (a.name === d)return a
            }
        };
        g.prototype.size = function () {
            return this._entityCount
        };
        g.prototype.getEntities = function () {
            var d = [], b;
            for (b in this._entitiesById)d.push(this._entitiesById[b]);
            return d
        };
        g.prototype.getTopEntities = function () {
            var d = [], b;
            for (b in this._entitiesById) {
                var a = this._entitiesById[b];
                a.transformComponent ? a.transformComponent.parent || d.push(a) : d.push(a)
            }
            return d
        };
        return g
    });
    o("goo/math/MathUtils", [], function () {
        function g() {
        }

        g.DEG_TO_RAD = Math.PI / 180;
        g.RAD_TO_DEG =
            180 / Math.PI;
        g.HALF_PI = 0.5 * Math.PI;
        g.TWO_PI = 2 * Math.PI;
        g.EPSILON = 1.0E-7;
        g.radFromDeg = function (d) {
            return d * g.DEG_TO_RAD
        };
        g.degFromRad = function (d) {
            return d * g.RAD_TO_DEG
        };
        g.lerp = function (d, b, a) {
            return b === a ? b : b + (a - b) * d
        };
        g.clamp = function (d, b, a) {
            return b < a ? d < b ? b : d > a ? a : d : d < a ? a : d > b ? b : d
        };
        g.moduloPositive = function (d, b) {
            var a = d % b;
            a += a < 0 ? b : 0;
            return a
        };
        g.scurve3 = function (d) {
            return (-2 * d + 3) * d * d
        };
        g.scurve5 = function (d) {
            return ((6 * d - 15) * d + 10) * d * d * d
        };
        g.sphericalToCartesian = function (d, b, a, f) {
            var e = d * Math.cos(a);
            f.x = e *
                Math.cos(b);
            f.y = d * Math.sin(a);
            f.z = e * Math.sin(b)
        };
        g.cartesianToSpherical = function (d, b, a, f) {
            var e = Math.sqrt(d * d + a * a);
            f.x = Math.sqrt(d * d + b * b + a * a);
            f.y = Math.atan2(a, d);
            f.z = Math.atan2(b, e)
        };
        g.getTriangleNormal = function (d, b, a, f, e, c, i, j, g) {
            f -= d;
            e -= b;
            c -= a;
            d = i - d;
            b = j - b;
            a = g - a;
            return [e * a - c * b, c * d - f * a, f * b - e * d]
        };
        return g
    });
    o("goo/math/Vector", ["goo/math/MathUtils"], function (g) {
        function d(b) {
            this.data = new Float32Array(b || 0)
        }

        d.prototype.setupAliases = function (b) {
            for (var a = this, f = 0; f < b.length; f++)(function (e) {
                for (var c =
                    0; c < b[e].length; c++)Object.defineProperty(a, b[e][c], {
                    get: function () {
                        return this.data[e]
                    }, set: function (a) {
                        this.data[e] = a
                    }
                });
                Object.defineProperty(a, f, {
                    get: function () {
                        return this.data[e]
                    }, set: function (a) {
                        this.data[e] = a
                    }
                })
            })(f)
        };
        d.add = function (b, a, f) {
            var b = b.data || b, a = a.data || a, e = b.length;
            f || (f = new d(e));
            if (a.length !== e || f.data.length !== e)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            for (var c = 0; c < e; c++)f.data[c] = b[c] + a[c];
            return f
        };
        d.prototype.add = function (b) {
            return d.add(this,
                b, this)
        };
        d.sub = function (b, a, f) {
            var b = b.data || b, a = a.data || a, e = b.length;
            f || (f = new d(e));
            if (a.length !== e || f.data.length !== e)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            for (var c = 0; c < e; c++)f.data[c] = b[c] - a[c];
            return f
        };
        d.prototype.sub = function (b) {
            return d.sub(this, b, this)
        };
        d.mul = function (b, a, f) {
            var b = b.data || b, a = a.data || a, e = b.length;
            f || (f = new d(e));
            if (a.length !== e || f.data.length !== e)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            for (var c = 0; c < e; c++)f.data[c] = b[c] * a[c];
            return f
        };
        d.prototype.mul = function (b) {
            return d.mul(this, b, this)
        };
        d.div = function (b, a, f) {
            var b = b.data || b, a = a.data || a, e = b.length;
            f || (f = new d(e));
            if (a.length !== e || f.data.length !== e)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            for (var c = 0; c < e; c++)f.data[c] = b[c] / a[c];
            return f
        };
        d.prototype.div = function (b) {
            return d.div(this, b, this)
        };
        d.copy = function (b, a) {
            var f = b.data.length;
            a || (a = new d(f));
            if (a.data.length !== f)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            a.data.set(b.data);
            return a
        };
        d.prototype.copy = function (b) {
            return d.copy(b, this)
        };
        d.dot = function (b, a) {
            var f = b.data || b, e = a.data || a, c = f.length;
            if (e.length !== c)throw{name: "Illegal Arguments", message: "The arguments are of incompatible sizes."};
            for (var i = 0, d = 0; d < c; d++)i += f[d] * e[d];
            return i
        };
        d.prototype.dot = function (b) {
            return d.dot(this, b)
        };
        d.apply = function (b, a, f) {
            var e = b.rows, c = b.cols, i = a.data.length;
            f || (f = new d(e));
            if (f.data.length !== e || c !== i)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            if (f === a)return d.copy(d.apply(b, a), f);
            for (var j = 0; j < c; j++)for (var g = j * e, h = 0; h < e; h++) {
                for (var l = 0, n = 0; n < i; n++)l += b.data[n * b.rows + h] * a.data[n];
                f.data[g + h] = l
            }
            return f
        };
        d.prototype.apply = function (b) {
            return d.apply(b, this, this)
        };
        d.equals = function (b, a) {
            var f = b.data.length;
            if (f !== a.data.length)return !1;
            for (var e = 0; e < f; e++)if (Math.abs(b.data[e] - a.data[e]) > g.EPSILON)return !1;
            return !0
        };
        d.prototype.equals = function (b) {
            return d.equals(this, b)
        };
        d.distanceSquared =
            function (b, a) {
                return d.sub(b, a).lengthSquared()
            };
        d.prototype.distanceSquared = function (b) {
            return d.sub(this, b).lengthSquared()
        };
        d.distance = function (b, a) {
            return d.sub(b, a).length()
        };
        d.prototype.distance = function (b) {
            return d.sub(this, b).length()
        };
        d.prototype.lengthSquared = function () {
            return d.dot(this, this)
        };
        d.prototype.length = function () {
            return Math.sqrt(d.dot(this, this))
        };
        d.prototype.scale = function (b) {
            for (var a = this.data.length - 1; a >= 0; a--)this.data[a] *= b;
            return this
        };
        d.prototype.invert = function () {
            for (var b =
                0; b < this.data.length; b++)this.data[b] = 0 - this.data[b];
            return this
        };
        d.prototype.normalize = function () {
            var b = this.length(), a = this.data.length;
            if (b < g.EPSILON)for (var f = 0; f < a; f++)this.data[f] = 0; else {
                b = 1 / b;
                for (f = 0; f < a; f++)this.data[f] *= b
            }
            return this
        };
        d.prototype.clone = function () {
            return d.copy(this)
        };
        d.prototype.set = function () {
            if (arguments.length === 1 && typeof arguments[0] === "object")if (arguments[0] instanceof d)this.copy(arguments[0]); else if (arguments[0].length > 1)for (var b = 0; b < arguments[0].length; b++)this.data[b] =
                arguments[0][b]; else this.set(arguments[0][0]); else for (b = 0; b < arguments.length; b++)this.data[b] = arguments[b];
            return this
        };
        d.prototype.toString = function () {
            var b = "";
            b += "[";
            for (var a = 0; a < this.data.length; a++)b += this.data[a], b += a !== this.data.length - 1 ? ", " : "";
            b += "]";
            return b
        };
        return d
    });
    o("goo/math/Vector3", ["goo/math/Vector"], function (g) {
        function d() {
            g.call(this, 3);
            arguments.length !== 0 ? this.set(arguments) : this.setd(0, 0, 0)
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.setupAliases([["x", "u", "r"],
            ["y", "v", "g"], ["z", "w", "b"]]);
        d.ZERO = new d(0, 0, 0);
        d.ONE = new d(1, 1, 1);
        d.UNIT_X = new d(1, 0, 0);
        d.UNIT_Y = new d(0, 1, 0);
        d.UNIT_Z = new d(0, 0, 1);
        d.add = function (b, a, f) {
            typeof b === "number" && (b = [b, b, b]);
            typeof a === "number" && (a = [a, a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 3 || a.length !== 3)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] + a[0];
            f.data[1] = b[1] + a[1];
            f.data[2] = b[2] + a[2];
            return f
        };
        d.addv = function (b, a, f) {
            f || (f = new d);
            f.data[0] = b.data[0] + a.data[0];
            f.data[1] = b.data[1] + a.data[1];
            f.data[2] = b.data[2] + a.data[2];
            return f
        };
        d.prototype.add = function (b) {
            return d.add(this, b, this)
        };
        d.sub = function (b, a, f) {
            typeof b === "number" && (b = [b, b, b]);
            typeof a === "number" && (a = [a, a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 3 || a.length !== 3)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] - a[0];
            f.data[1] = b[1] - a[1];
            f.data[2] = b[2] - a[2];
            return f
        };
        d.subv = function (b, a, f) {
            f || (f = new d);
            f.data[0] = b.data[0] - a.data[0];
            f.data[1] =
                b.data[1] - a.data[1];
            f.data[2] = b.data[2] - a.data[2];
            return f
        };
        d.prototype.sub = function (b) {
            return d.sub(this, b, this)
        };
        d.mul = function (b, a, f) {
            typeof b === "number" && (b = [b, b, b]);
            typeof a === "number" && (a = [a, a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 3 || a.length !== 3)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] * a[0];
            f.data[1] = b[1] * a[1];
            f.data[2] = b[2] * a[2];
            return f
        };
        d.prototype.mul = function (b) {
            return d.mul(this, b, this)
        };
        d.div = function (b, a, f) {
            typeof b ===
            "number" && (b = [b, b, b]);
            typeof a === "number" && (a = [a, a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 3 || a.length !== 3)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] / a[0];
            f.data[1] = b[1] / a[1];
            f.data[2] = b[2] / a[2];
            return f
        };
        d.prototype.div = function (b) {
            return d.div(this, b, this)
        };
        d.dot = function (b, a) {
            typeof b === "number" && (b = [b, b, b]);
            typeof a === "number" && (a = [a, a, a]);
            var f = b.data || b, e = a.data || a;
            if (f.length !== 3 || e.length !== 3)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            var c = 0;
            c += f[0] * e[0];
            c += f[1] * e[1];
            c += f[2] * e[2];
            return c
        };
        d.prototype.dot = function (b) {
            return d.dot(this, b)
        };
        d.cross = function (b, a, f) {
            f || (f = new d);
            var e = a.data || a;
            if ((b.data || b).length !== 3 || e.length !== 3)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            var e = a.data[0] * b.data[2] - a.data[2] * b.data[0], c = a.data[1] * b.data[0] - a.data[0] * b.data[1];
            f.data[0] = a.data[2] * b.data[1] - a.data[1] * b.data[2];
            f.data[1] = e;
            f.data[2] = c;
            return f
        };
        d.prototype.cross = function (b) {
            return d.cross(this, b, this)
        };
        d.prototype.lerp = function (b, a) {
            this.data[0] = (1 - a) * this.data[0] + a * b.data[0];
            this.data[1] = (1 - a) * this.data[1] + a * b.data[1];
            this.data[2] = (1 - a) * this.data[2] + a * b.data[2];
            return this
        };
        d.prototype.setd = function (b, a, f) {
            this.data[0] = b;
            this.data[1] = a;
            this.data[2] = f;
            return this
        };
        d.prototype.seta = function (b) {
            this.data[0] = b[0];
            this.data[1] = b[1];
            this.data[2] = b[2];
            return this
        };
        d.prototype.setv = function (b) {
            this.data[0] = b.data[0];
            this.data[1] = b.data[1];
            this.data[2] =
                b.data[2];
            return this
        };
        d.prototype.add_d = function (b, a, f) {
            this.data[0] += b;
            this.data[1] += a;
            this.data[2] += f;
            return this
        };
        d.prototype.addv = function (b) {
            this.data[0] += b.data[0];
            this.data[1] += b.data[1];
            this.data[2] += b.data[2];
            return this
        };
        d.prototype.mulv = function (b) {
            this.data[0] *= b.data[0];
            this.data[1] *= b.data[1];
            this.data[2] *= b.data[2];
            return this
        };
        d.prototype.muld = function (b, a, f) {
            this.data[0] *= b;
            this.data[1] *= a;
            this.data[2] *= f;
            return this
        };
        d.prototype.subv = function (b) {
            this.data[0] -= b.data[0];
            this.data[1] -=
                b.data[1];
            this.data[2] -= b.data[2];
            return this
        };
        d.prototype.sub_d = function (b, a, f) {
            this.data[0] -= b;
            this.data[1] -= a;
            this.data[2] -= f;
            return this
        };
        d.prototype.lengthSquared = function () {
            return this.data[0] * this.data[0] + this.data[1] * this.data[1] + this.data[2] * this.data[2]
        };
        return d
    });
    o("goo/math/Matrix", ["goo/math/MathUtils"], function (g) {
        function d(b, a) {
            this.rows = b || 0;
            this.cols = a || 0;
            this.data = new Float32Array(this.rows * this.cols)
        }

        d.prototype.setupAliases = function (b) {
            for (var a = this, f = 0; f < b.length; f++)(function (e) {
                for (var c =
                    0; c < b[e].length; c++)Object.defineProperty(a, b[e][c], {
                    get: function () {
                        return this.data[e]
                    }, set: function (a) {
                        this.data[e] = a
                    }
                });
                Object.defineProperty(a, f, {
                    get: function () {
                        return this.data[e]
                    }, set: function (a) {
                        this.data[e] = a
                    }
                })
            })(f)
        };
        d.add = function (b, a, f) {
            var e = b.rows, c = b.cols;
            f || (f = new d(e, c));
            if (a instanceof d) {
                if (a.rows !== e || a.cols !== c || f.rows !== e || f.cols !== c)throw{
                    name: "Illegal Arguments",
                    message: "The arguments are of incompatible sizes."
                };
                for (e = 0; e < b.data.length; e++)f.data[e] = b.data[e] + a.data[e]
            } else {
                if (f.rows !==
                    e || f.cols !== c)throw{
                    name: "Illegal Arguments",
                    message: "The arguments are of incompatible sizes."
                };
                for (e = 0; e < b.data.length; e++)f.data[e] = b.data[e] + a
            }
            return f
        };
        d.prototype.add = function (b) {
            return d.add(this, b, this)
        };
        d.sub = function (b, a, f) {
            var e = b.rows, c = b.cols;
            f || (f = new d(e, c));
            if (a instanceof d) {
                if (a.rows !== e || a.cols !== c || f.rows !== e || f.cols !== c)throw{
                    name: "Illegal Arguments",
                    message: "The arguments are of incompatible sizes."
                };
                for (e = 0; e < b.data.length; e++)f.data[e] = b.data[e] - a.data[e]
            } else {
                if (f.rows !==
                    e || f.cols !== c)throw{
                    name: "Illegal Arguments",
                    message: "The arguments are of incompatible sizes."
                };
                for (e = 0; e < b.data.length; e++)f.data[e] = b.data[e] - a
            }
            return f
        };
        d.prototype.sub = function (b) {
            return d.sub(this, b, this)
        };
        d.mul = function (b, a, f) {
            var e = b.rows, c = b.cols;
            f || (f = new d(e, c));
            if (a instanceof d) {
                if (a.rows !== e || a.cols !== c || f.rows !== e || f.cols !== c)throw{
                    name: "Illegal Arguments",
                    message: "The arguments are of incompatible sizes."
                };
                for (e = 0; e < b.data.length; e++)f.data[e] = b.data[e] * a.data[e]
            } else {
                if (f.rows !==
                    e || f.cols !== c)throw{
                    name: "Illegal Arguments",
                    message: "The arguments are of incompatible sizes."
                };
                for (e = 0; e < b.data.length; e++)f.data[e] = b.data[e] * a
            }
            return f
        };
        d.prototype.mul = function (b) {
            return d.mul(this, b, this)
        };
        d.div = function (b, a, f) {
            var e = b.rows, c = b.cols;
            f || (f = new d(e, c));
            if (a instanceof d) {
                if (a.rows !== e || a.cols !== c || f.rows !== e || f.cols !== c)throw{
                    name: "Illegal Arguments",
                    message: "The arguments are of incompatible sizes."
                };
                for (e = 0; e < b.data.length; e++)f.data[e] = b.data[e] / a.data[e]
            } else {
                if (f.rows !==
                    e || f.cols !== c)throw{
                    name: "Illegal Arguments",
                    message: "The arguments are of incompatible sizes."
                };
                a = 1 / a;
                for (e = 0; e < b.data.length; e++)f.data[e] = b.data[e] * a
            }
            return f
        };
        d.prototype.div = function (b) {
            return d.div(this, b, this)
        };
        d.combine = function (b, a, f) {
            var e = b.rows, c = a.cols, i = b.cols = a.rows;
            f || (f = new d(e, c));
            if (b.cols !== i || a.rows !== i || f.rows !== e || f.cols !== c)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            if (f === b || f === a)return d.copy(d.combine(b, a), f);
            for (var j = 0; j < c; j++)for (var g =
                j * e, h = 0; h < e; h++) {
                for (var l = 0, n = 0; n < i; n++)l += b.data[n * b.rows + h] * a.data[j * a.rows + n];
                f.data[g + h] = l
            }
            return f
        };
        d.prototype.combine = function (b) {
            return d.combine(this, b, this)
        };
        d.transpose = function (b, a) {
            var f = b.cols, e = b.rows;
            a || (a = new d(f, e));
            if (a.rows !== f || a.cols !== e)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            if (a === b)return d.copy(d.transpose(b), a);
            for (var c = 0; c < e; c++)for (var i = c * f, j = 0; j < f; j++)a.data[i + j] = b.data[j * e + c];
            return a
        };
        d.prototype.transpose = function () {
            return d.transpose(this,
                this)
        };
        d.copy = function (b, a) {
            var f = b.rows, e = b.cols;
            a || (a = new d(f, e));
            if (a.rows !== f || a.cols !== e)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            a.data.set(b.data);
            return a
        };
        d.prototype.copy = function (b) {
            return d.copy(b, this)
        };
        d.equals = function (b, a) {
            if (b.rows !== a.rows || b.cols !== a.cols)return !1;
            for (var f = 0; f < b.data.length; f++)if (Math.abs(b.data[f] - a.data[f]) > g.EPSILON)return !1;
            return !0
        };
        d.prototype.equals = function (b) {
            return d.equals(this, b)
        };
        d.prototype.isOrthogonal =
            function () {
                for (var b = 0; b < this.cols; b++)for (var a = b + 1; a < this.cols; a++) {
                    for (var f = b * this.rows, e = a * this.rows, c = 0, i = 0; i < this.rows; i++)c += this.data[f + i] * this.data[e + i];
                    if (Math.abs(c) > g.EPSILON)return !1
                }
                return !0
            };
        d.prototype.isNormal = function () {
            for (var b = 0; b < this.cols; b++) {
                for (var a = b * this.rows, f = 0, e = 0; e < this.rows; e++)f += this.data[a + e] * this.data[a + e];
                if (Math.abs(f - 1) > g.EPSILON)return !1
            }
            return !0
        };
        d.prototype.isOrthonormal = function () {
            return this.isOrthogonal() && this.isNormal()
        };
        d.prototype.clone = function () {
            return d.copy(this)
        };
        d.prototype.set = function () {
            if (arguments.length === 1 && typeof arguments[0] === "object")if (arguments[0] instanceof d)this.copy(arguments[0]); else for (var b = 0; b < arguments[0].length; b++)this.data[b] = arguments[0][b]; else for (b = 0; b < arguments.length; b++)this.data[b] = arguments[b];
            return this
        };
        d.prototype.toString = function () {
            for (var b = "", a = 0; a < this.cols; a++) {
                var f = a * this.rows;
                b += "[";
                for (var e = 0; e < this.rows; e++)b += this.data[f + e], b += e !== this.rows - 1 ? ", " : "";
                b += a !== this.cols - 1 ? "], " : "]"
            }
            return b
        };
        return d
    });
    o("goo/math/Matrix3x3",
        ["goo/math/MathUtils", "goo/math/Matrix", "goo/math/Vector3"], function (g, d, b) {
            function a() {
                d.call(this, 3, 3);
                arguments.length === 0 ? this.setIdentity() : this.set(arguments);
                this._tempX = new b;
                this._tempY = new b;
                this._tempZ = new b
            }

            a.prototype = Object.create(d.prototype);
            a.prototype.setupAliases([["e00"], ["e10"], ["e20"], ["e01"], ["e11"], ["e21"], ["e02"], ["e12"], ["e22"]]);
            a.IDENTITY = new a(1, 0, 0, 0, 1, 0, 0, 0, 1);
            a.add = function (f, e, c) {
                c || (c = new a);
                var b = c.data, f = f.data;
                e instanceof a ? (e = e.data, b[0] = f[0] + e[0], b[1] = f[1] +
                    e[1], b[2] = f[2] + e[2], b[3] = f[3] + e[3], b[4] = f[4] + e[4], b[5] = f[5] + e[5], b[6] = f[6] + e[6], b[7] = f[7] + e[7], b[8] = f[8] + e[8]) : (b[0] = f[0] + e, b[1] = f[1] + e, b[2] = f[2] + e, b[3] = f[3] + e, b[4] = f[4] + e, b[5] = f[5] + e, b[6] = f[6] + e, b[7] = f[7] + e, b[8] = f[8] + e);
                return c
            };
            a.prototype.add = function (f) {
                return a.add(this, f, this)
            };
            a.sub = function (f, e, c) {
                c || (c = new a);
                var b = c.data, f = f.data;
                e instanceof a ? (e = e.data, b[0] = f[0] - e[0], b[1] = f[1] - e[1], b[2] = f[2] - e[2], b[3] = f[3] - e[3], b[4] = f[4] - e[4], b[5] = f[5] - e[5], b[6] = f[6] - e[6], b[7] = f[7] - e[7], b[8] = f[8] - e[8]) :
                    (b[0] = f[0] - e, b[1] = f[1] - e, b[2] = f[2] - e, b[3] = f[3] - e, b[4] = f[4] - e, b[5] = f[5] - e, b[6] = f[6] - e, b[7] = f[7] - e, b[8] = f[8] - e);
                return c
            };
            a.prototype.sub = function (f) {
                return a.sub(this, f, this)
            };
            a.mul = function (f, e, c) {
                c || (c = new a);
                var b = c.data, f = f.data;
                e instanceof a ? (e = e.data, b[0] = f[0] * e[0], b[1] = f[1] * e[1], b[2] = f[2] * e[2], b[3] = f[3] * e[3], b[4] = f[4] * e[4], b[5] = f[5] * e[5], b[6] = f[6] * e[6], b[7] = f[7] * e[7], b[8] = f[8] * e[8]) : (b[0] = f[0] * e, b[1] = f[1] * e, b[2] = f[2] * e, b[3] = f[3] * e, b[4] = f[4] * e, b[5] = f[5] * e, b[6] = f[6] * e, b[7] = f[7] * e, b[8] = f[8] * e);
                return c
            };
            a.prototype.mul = function (f) {
                return a.mul(this, f, this)
            };
            a.div = function (f, e, c) {
                c || (c = new a);
                var b = c.data, f = f.data;
                e instanceof a ? (e = e.data, b[0] = f[0] / e[0], b[1] = f[1] / e[1], b[2] = f[2] / e[2], b[3] = f[3] / e[3], b[4] = f[4] / e[4], b[5] = f[5] / e[5], b[6] = f[6] / e[6], b[7] = f[7] / e[7], b[8] = f[8] / e[8]) : (b[0] = f[0] / e, b[1] = f[1] / e, b[2] = f[2] / e, b[3] = f[3] / e, b[4] = f[4] / e, b[5] = f[5] / e, b[6] = f[6] / e, b[7] = f[7] / e, b[8] = f[8] / e);
                return c
            };
            a.prototype.div = function (f) {
                return a.div(this, f, this)
            };
            a.combine = function (f, e, c) {
                c || (c = new a);
                var b =
                    f.data, f = b[0], d = b[3], g = b[6], h = b[1], l = b[4], n = b[7], q = b[2], r = b[5], b = b[8], m = e.data, e = m[0], s = m[3], x = m[6], p = m[1], w = m[4], y = m[7], t = m[2], u = m[5], m = m[8], A = c.data;
                A[0] = f * e + d * p + g * t;
                A[3] = f * s + d * w + g * u;
                A[6] = f * x + d * y + g * m;
                A[1] = h * e + l * p + n * t;
                A[4] = h * s + l * w + n * u;
                A[7] = h * x + l * y + n * m;
                A[2] = q * e + r * p + b * t;
                A[5] = q * s + r * w + b * u;
                A[8] = q * x + r * y + b * m;
                return c
            };
            a.prototype.combine = function (f) {
                return a.combine(this, f, this)
            };
            a.transpose = function (f, e) {
                e || (e = new a);
                var c = f.data, b = e.data;
                if (e === f) {
                    var d = c[3], g = c[6], h = c[7];
                    b[3] = c[1];
                    b[6] = c[2];
                    b[7] = c[5];
                    b[1] = d;
                    b[2] = g;
                    b[5] = h;
                    return e
                }
                b[0] = c[0];
                b[1] = c[3];
                b[2] = c[6];
                b[3] = c[1];
                b[4] = c[4];
                b[5] = c[7];
                b[6] = c[2];
                b[7] = c[5];
                b[8] = c[8];
                return e
            };
            a.prototype.transpose = function () {
                return a.transpose(this, this)
            };
            a.invert = function (f, e) {
                e || (e = new a);
                if (e === f)return d.copy(a.invert(f), e);
                var c = f.determinant();
                if (Math.abs(c) < g.EPSILON)throw{
                    name: "Singular Matrix",
                    message: "The matrix is singular and cannot be inverted."
                };
                var c = 1 / c, b = e.data, j = f.data;
                b[0] = (j[4] * j[8] - j[7] * j[5]) * c;
                b[1] = (j[7] * j[2] - j[1] * j[8]) * c;
                b[2] = (j[1] * j[5] -
                    j[4] * j[2]) * c;
                b[3] = (j[6] * j[5] - j[3] * j[8]) * c;
                b[4] = (j[0] * j[8] - j[6] * j[2]) * c;
                b[5] = (j[3] * j[2] - j[0] * j[5]) * c;
                b[6] = (j[3] * j[7] - j[6] * j[4]) * c;
                b[7] = (j[6] * j[1] - j[0] * j[7]) * c;
                b[8] = (j[0] * j[4] - j[3] * j[1]) * c;
                return e
            };
            a.prototype.invert = function () {
                return a.invert(this, this)
            };
            a.prototype.isOrthogonal = function () {
                var a = this.data, e = a[0] * a[3] + a[1] * a[4] + a[2] * a[5];
                if (Math.abs(e) > g.EPSILON)return !1;
                e = a[0] * a[6] + a[1] * a[7] + a[2] * a[8];
                if (Math.abs(e) > g.EPSILON)return !1;
                e = a[3] * a[6] + a[4] * a[7] + a[5] * a[8];
                return Math.abs(e) > g.EPSILON ? !1 :
                    !0
            };
            a.prototype.isNormal = function () {
                var a = this.data, e = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
                if (Math.abs(e - 1) > g.EPSILON)return !1;
                e = a[3] * a[3] + a[4] * a[4] + a[5] * a[5];
                if (Math.abs(e - 1) > g.EPSILON)return !1;
                e = a[6] * a[6] + a[7] * a[7] + a[8] * a[8];
                return Math.abs(e - 1) > g.EPSILON ? !1 : !0
            };
            a.prototype.isOrthonormal = function () {
                return this.isOrthogonal() && this.isNormal()
            };
            a.prototype.determinant = function () {
                var a = this.data;
                return a[0] * (a[4] * a[8] - a[7] * a[5]) - a[3] * (a[1] * a[8] - a[7] * a[2]) + a[6] * (a[1] * a[5] - a[4] * a[2])
            };
            a.prototype.setIdentity =
                function () {
                    var a = this.data;
                    a[0] = 1;
                    a[1] = 0;
                    a[2] = 0;
                    a[3] = 0;
                    a[4] = 1;
                    a[5] = 0;
                    a[6] = 0;
                    a[7] = 0;
                    a[8] = 1;
                    return this
                };
            a.prototype.applyPost = function (a) {
                var e = a.data, c = this.data, b = e[0], d = e[1], g = e[2];
                e[0] = c[0] * b + c[3] * d + c[6] * g;
                e[1] = c[1] * b + c[4] * d + c[7] * g;
                e[2] = c[2] * b + c[5] * d + c[8] * g;
                return a
            };
            a.prototype.applyPre = function (a) {
                var e = a.data, c = this.data, b = e[0], d = e[1], g = e[2];
                e[0] = c[0] * b + c[1] * d + c[2] * g;
                e[1] = c[3] * b + c[4] * d + c[5] * g;
                e[2] = c[6] * b + c[7] * d + c[8] * g;
                return a
            };
            a.prototype.multiplyDiagonalPost = function (a, e) {
                var c = a.data[0],
                    b = a.data[1], d = a.data[2], g = this.data, h = e.data;
                h[0] = c * g[0];
                h[1] = c * g[1];
                h[2] = c * g[2];
                h[3] = b * g[3];
                h[4] = b * g[4];
                h[5] = b * g[5];
                h[6] = d * g[6];
                h[7] = d * g[7];
                h[8] = d * g[8];
                return e
            };
            a.prototype.fromAngles = function (a, e, c) {
                var b = Math.cos(a), a = Math.sin(a), d = Math.cos(e), e = Math.sin(e), g = Math.cos(c), c = Math.sin(c), h = this.data;
                h[0] = d * g;
                h[3] = e * a - d * c * b;
                h[6] = d * c * a + e * b;
                h[1] = c;
                h[4] = g * b;
                h[7] = -g * a;
                h[2] = -e * g;
                h[5] = e * c * b + d * a;
                h[8] = -e * c * a + d * b;
                return this
            };
            a.prototype.rotateX = function (a, e) {
                var c = this.data, b = (e || this).data, d = Math.sin(a),
                    g = Math.cos(a), h = c[3], l = c[4], n = c[5], q = c[6], r = c[7], m = c[8];
                c !== b && (b[0] = c[0], b[1] = c[1], b[2] = c[2]);
                b[3] = h * g + q * d;
                b[4] = l * g + r * d;
                b[5] = n * g + m * d;
                b[6] = q * g - h * d;
                b[7] = r * g - l * d;
                b[8] = m * g - n * d;
                return b
            };
            a.prototype.rotateY = function (a, e) {
                var c = this.data, b = (e || this).data, d = Math.sin(a), g = Math.cos(a), h = c[0], l = c[1], n = c[2], q = c[6], r = c[7], m = c[8];
                c !== b && (b[3] = c[3], b[4] = c[4], b[5] = c[5]);
                b[0] = h * g - q * d;
                b[1] = l * g - r * d;
                b[2] = n * g - m * d;
                b[6] = h * d + q * g;
                b[7] = l * d + r * g;
                b[8] = n * d + m * g;
                return b
            };
            a.prototype.rotateZ = function (a, e) {
                var c = this.data, b = (e ||
                this).data, d = Math.sin(a), g = Math.cos(a), h = c[0], l = c[1], n = c[2], q = c[3], r = c[4], m = c[5];
                c !== b && (b[6] = c[6], b[7] = c[7], b[8] = c[8]);
                b[0] = h * g + q * d;
                b[1] = l * g + r * d;
                b[2] = n * g + m * d;
                b[3] = q * g - h * d;
                b[4] = r * g - l * d;
                b[5] = m * g - n * d;
                return b
            };
            a.prototype.toAngles = function (a) {
                a || (a = new b);
                var e = this.data, c = a.data;
                e[3] > 1 - g.EPSILON ? (c[1] = Math.atan2(e[2], e[8]), c[2] = Math.PI / 2, c[0] = 0) : e[3] < -1 + g.EPSILON ? (c[1] = Math.atan2(e[2], e[8]), c[2] = -Math.PI / 2, c[0] = 0) : (c[1] = Math.atan2(-e[2], e[0]), c[0] = Math.atan2(-e[7], e[4]), c[2] = Math.asin(e[1]));
                return a
            };
            a.prototype.fromAngleNormalAxis = function (a, e, c, b) {
                var d = Math.cos(a), g = Math.sin(a), a = 1 - d, h = e * c * a, l = e * b * a, n = c * b * a, q = e * g, r = c * g;
                g *= b;
                var m = this.data;
                m[0] = e * e * a + d;
                m[3] = h - g;
                m[6] = l + r;
                m[1] = h + g;
                m[4] = c * c * a + d;
                m[7] = n - q;
                m[2] = l - r;
                m[5] = n + q;
                m[8] = b * b * a + d;
                return this
            };
            a.prototype.lookAt = function (a, e) {
                var c = this._tempX, d = this._tempY, j = this._tempZ;
                j.setv(a).normalize();
                c.setv(e).cross(j).normalize();
                c.equals(b.ZERO) && (j.data[0] !== 0 ? c.setd(j.data[1], -j.data[0], 0) : c.setd(0, j.data[2], -j.data[1]));
                d.setv(j).cross(c);
                var g =
                    this.data;
                g[0] = c.data[0];
                g[1] = c.data[1];
                g[2] = c.data[2];
                g[3] = d.data[0];
                g[4] = d.data[1];
                g[5] = d.data[2];
                g[6] = j.data[0];
                g[7] = j.data[1];
                g[8] = j.data[2];
                return this
            };
            a.prototype.copyQuaternion = function (a) {
                return a.toRotationMatrix(this)
            };
            a.prototype.copy = function (a) {
                var e = this.data, a = a.data;
                e[0] = a[0];
                e[1] = a[1];
                e[2] = a[2];
                e[3] = a[3];
                e[4] = a[4];
                e[5] = a[5];
                e[6] = a[6];
                e[7] = a[7];
                e[8] = a[8];
                return this
            };
            a.prototype.clone = function () {
                var f = this.data;
                return new a(f[0], f[1], f[2], f[3], f[4], f[5], f[4], f[5], f[6])
            };
            return a
        });
    o("goo/math/Matrix4x4", ["goo/math/MathUtils", "goo/math/Matrix"], function (g, d) {
        function b() {
            d.call(this, 4, 4);
            arguments.length === 0 ? this.setIdentity() : this.set(arguments)
        }

        b.prototype = Object.create(d.prototype);
        b.prototype.setupAliases([["e00"], ["e10"], ["e20"], ["e30"], ["e01"], ["e11"], ["e21"], ["e31"], ["e02"], ["e12"], ["e22"], ["e32"], ["e03"], ["e13"], ["e23"], ["e33"]]);
        b.IDENTITY = new b(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        b.add = function (a, f, e) {
            e || (e = new b);
            f instanceof b ? (e.e00 = a.e00 + f.e00, e.e10 = a.e10 + f.e10, e.e20 =
                a.e20 + f.e20, e.e30 = a.e30 + f.e30, e.e01 = a.e01 + f.e01, e.e11 = a.e11 + f.e11, e.e21 = a.e21 + f.e21, e.e31 = a.e31 + f.e31, e.e02 = a.e02 + f.e02, e.e12 = a.e12 + f.e12, e.e22 = a.e22 + f.e22, e.e32 = a.e32 + f.e32, e.e03 = a.e03 + f.e03, e.e13 = a.e13 + f.e13, e.e23 = a.e23 + f.e23, e.e33 = a.e33 + f.e33) : (e.e00 = a.e00 + f, e.e10 = a.e10 + f, e.e20 = a.e20 + f, e.e30 = a.e30 + f, e.e01 = a.e01 + f, e.e11 = a.e11 + f, e.e21 = a.e21 + f, e.e31 = a.e31 + f, e.e02 = a.e02 + f, e.e12 = a.e12 + f, e.e22 = a.e22 + f, e.e32 = a.e32 + f, e.e03 = a.e03 + f, e.e13 = a.e13 + f, e.e23 = a.e23 + f, e.e33 = a.e33 + f);
            return e
        };
        b.prototype.add = function (a) {
            return b.add(this,
                a, this)
        };
        b.sub = function (a, f, e) {
            e || (e = new b);
            f instanceof b ? (e.e00 = a.e00 - f.e00, e.e10 = a.e10 - f.e10, e.e20 = a.e20 - f.e20, e.e30 = a.e30 - f.e30, e.e01 = a.e01 - f.e01, e.e11 = a.e11 - f.e11, e.e21 = a.e21 - f.e21, e.e31 = a.e31 - f.e31, e.e02 = a.e02 - f.e02, e.e12 = a.e12 - f.e12, e.e22 = a.e22 - f.e22, e.e32 = a.e32 - f.e32, e.e03 = a.e03 - f.e03, e.e13 = a.e13 - f.e13, e.e23 = a.e23 - f.e23, e.e33 = a.e33 - f.e33) : (e.e00 = a.e00 - f, e.e10 = a.e10 - f, e.e20 = a.e20 - f, e.e30 = a.e30 - f, e.e01 = a.e01 - f, e.e11 = a.e11 - f, e.e21 = a.e21 - f, e.e31 = a.e31 - f, e.e02 = a.e02 - f, e.e12 = a.e12 - f, e.e22 = a.e22 -
                f, e.e32 = a.e32 - f, e.e03 = a.e03 - f, e.e13 = a.e13 - f, e.e23 = a.e23 - f, e.e33 = a.e33 - f);
            return e
        };
        b.prototype.sub = function (a) {
            return b.sub(this, a, this)
        };
        b.mul = function (a, f, e) {
            e || (e = new b);
            f instanceof b ? (e.e00 = a.e00 * f.e00, e.e10 = a.e10 * f.e10, e.e20 = a.e20 * f.e20, e.e30 = a.e30 * f.e30, e.e01 = a.e01 * f.e01, e.e11 = a.e11 * f.e11, e.e21 = a.e21 * f.e21, e.e31 = a.e31 * f.e31, e.e02 = a.e02 * f.e02, e.e12 = a.e12 * f.e12, e.e22 = a.e22 * f.e22, e.e32 = a.e32 * f.e32, e.e03 = a.e03 * f.e03, e.e13 = a.e13 * f.e13, e.e23 = a.e23 * f.e23, e.e33 = a.e33 * f.e33) : (e.e00 = a.e00 * f, e.e10 = a.e10 *
                f, e.e20 = a.e20 * f, e.e30 = a.e30 * f, e.e01 = a.e01 * f, e.e11 = a.e11 * f, e.e21 = a.e21 * f, e.e31 = a.e31 * f, e.e02 = a.e02 * f, e.e12 = a.e12 * f, e.e22 = a.e22 * f, e.e32 = a.e32 * f, e.e03 = a.e03 * f, e.e13 = a.e13 * f, e.e23 = a.e23 * f, e.e33 = a.e33 * f);
            return e
        };
        b.prototype.mul = function (a) {
            return b.mul(this, a, this)
        };
        b.div = function (a, f, e) {
            e || (e = new b);
            f instanceof b ? (e.e00 = a.e00 / f.e00, e.e10 = a.e10 / f.e10, e.e20 = a.e20 / f.e20, e.e30 = a.e30 / f.e30, e.e01 = a.e01 / f.e01, e.e11 = a.e11 / f.e11, e.e21 = a.e21 / f.e21, e.e31 = a.e31 / f.e31, e.e02 = a.e02 / f.e02, e.e12 = a.e12 / f.e12, e.e22 =
                a.e22 / f.e22, e.e32 = a.e32 / f.e32, e.e03 = a.e03 / f.e03, e.e13 = a.e13 / f.e13, e.e23 = a.e23 / f.e23, e.e33 = a.e33 / f.e33) : (f = 1 / f, e.e00 = a.e00 * f, e.e10 = a.e10 * f, e.e20 = a.e20 * f, e.e30 = a.e30 * f, e.e01 = a.e01 * f, e.e11 = a.e11 * f, e.e21 = a.e21 * f, e.e31 = a.e31 * f, e.e02 = a.e02 * f, e.e12 = a.e12 * f, e.e22 = a.e22 * f, e.e32 = a.e32 * f, e.e03 = a.e03 * f, e.e13 = a.e13 * f, e.e23 = a.e23 * f, e.e33 = a.e33 * f);
            return e
        };
        b.prototype.div = function (a) {
            return b.div(this, a, this)
        };
        b.combine = function (a, f, e) {
            e || (e = new b);
            var c = a.data, a = c[0], d = c[4], j = c[8], g = c[12], h = c[1], l = c[5], n = c[9],
                q = c[13], r = c[2], m = c[6], s = c[10], x = c[14], p = c[3], w = c[7], y = c[11], c = c[15], t = f.data, f = t[0], u = t[4], A = t[8], v = t[12], o = t[1], z = t[5], F = t[9], E = t[13], D = t[2], K = t[6], L = t[10], I = t[14], M = t[3], N = t[7], S = t[11], t = t[15], G = e.data;
            G[0] = a * f + d * o + j * D + g * M;
            G[4] = a * u + d * z + j * K + g * N;
            G[8] = a * A + d * F + j * L + g * S;
            G[12] = a * v + d * E + j * I + g * t;
            G[1] = h * f + l * o + n * D + q * M;
            G[5] = h * u + l * z + n * K + q * N;
            G[9] = h * A + l * F + n * L + q * S;
            G[13] = h * v + l * E + n * I + q * t;
            G[2] = r * f + m * o + s * D + x * M;
            G[6] = r * u + m * z + s * K + x * N;
            G[10] = r * A + m * F + s * L + x * S;
            G[14] = r * v + m * E + s * I + x * t;
            G[3] = p * f + w * o + y * D + c * M;
            G[7] = p * u + w * z + y * K + c * N;
            G[11] = p * A + w * F + y * L + c * S;
            G[15] = p * v + w * E + y * I + c * t;
            return e
        };
        b.prototype.combine = function (a) {
            return b.combine(this, a, this)
        };
        b.transpose = function (a, f) {
            f || (f = new b);
            var e = a.data, c = f.data;
            if (f === a) {
                var d = e[4], j = e[8], g = e[12], h = e[9], l = e[13], n = e[14];
                c[4] = e[1];
                c[8] = e[2];
                c[12] = e[3];
                c[9] = e[6];
                c[13] = e[7];
                c[14] = e[11];
                c[1] = d;
                c[2] = j;
                c[3] = g;
                c[6] = h;
                c[7] = l;
                c[11] = n;
                return f
            }
            c[0] = e[0];
            c[1] = e[4];
            c[2] = e[8];
            c[3] = e[12];
            c[4] = e[1];
            c[5] = e[5];
            c[6] = e[9];
            c[7] = e[13];
            c[8] = e[2];
            c[9] = e[6];
            c[10] = e[10];
            c[11] = e[14];
            c[12] = e[3];
            c[13] = e[7];
            c[14] = e[11];
            c[15] = e[15];
            return f
        };
        b.prototype.transpose = function () {
            return b.transpose(this, this)
        };
        b.invert = function (a, f) {
            f || (f = new b);
            if (f === a)return d.copy(b.invert(a), f);
            var e = a.determinant();
            if (Math.abs(e) < g.EPSILON)throw{
                name: "Singular Matrix",
                message: "The matrix is singular and cannot be inverted."
            };
            var c = a.data, i = f.data, e = 1 / e;
            i[0] = (c[5] * (c[10] * c[15] - c[14] * c[11]) - c[9] * (c[6] * c[15] - c[14] * c[7]) + c[13] * (c[6] * c[11] - c[10] * c[7])) * e;
            i[1] = (c[1] * (c[14] * c[11] - c[10] * c[15]) - c[9] * (c[14] * c[3] - c[2] * c[15]) + c[13] *
                (c[10] * c[3] - c[2] * c[11])) * e;
            i[2] = (c[1] * (c[6] * c[15] - c[14] * c[7]) - c[5] * (c[2] * c[15] - c[14] * c[3]) + c[13] * (c[2] * c[7] - c[6] * c[3])) * e;
            i[3] = (c[1] * (c[10] * c[7] - c[6] * c[11]) - c[5] * (c[10] * c[3] - c[2] * c[11]) + c[9] * (c[6] * c[3] - c[2] * c[7])) * e;
            i[4] = (c[4] * (c[14] * c[11] - c[10] * c[15]) - c[8] * (c[14] * c[7] - c[6] * c[15]) + c[12] * (c[10] * c[7] - c[6] * c[11])) * e;
            i[5] = (c[0] * (c[10] * c[15] - c[14] * c[11]) - c[8] * (c[2] * c[15] - c[14] * c[3]) + c[12] * (c[2] * c[11] - c[10] * c[3])) * e;
            i[6] = (c[0] * (c[14] * c[7] - c[6] * c[15]) - c[4] * (c[14] * c[3] - c[2] * c[15]) + c[12] * (c[6] * c[3] - c[2] * c[7])) *
                e;
            i[7] = (c[0] * (c[6] * c[11] - c[10] * c[7]) - c[4] * (c[2] * c[11] - c[10] * c[3]) + c[8] * (c[2] * c[7] - c[6] * c[3])) * e;
            i[8] = (c[4] * (c[9] * c[15] - c[13] * c[11]) - c[8] * (c[5] * c[15] - c[13] * c[7]) + c[12] * (c[5] * c[11] - c[9] * c[7])) * e;
            i[9] = (c[0] * (c[13] * c[11] - c[9] * c[15]) - c[8] * (c[13] * c[3] - c[1] * c[15]) + c[12] * (c[9] * c[3] - c[1] * c[11])) * e;
            i[10] = (c[0] * (c[5] * c[15] - c[13] * c[7]) - c[4] * (c[1] * c[15] - c[13] * c[3]) + c[12] * (c[1] * c[7] - c[5] * c[3])) * e;
            i[11] = (c[0] * (c[9] * c[7] - c[5] * c[11]) - c[4] * (c[9] * c[3] - c[1] * c[11]) + c[8] * (c[5] * c[3] - c[1] * c[7])) * e;
            i[12] = (c[4] * (c[13] * c[10] -
                c[9] * c[14]) - c[8] * (c[13] * c[6] - c[5] * c[14]) + c[12] * (c[9] * c[6] - c[5] * c[10])) * e;
            i[13] = (c[0] * (c[9] * c[14] - c[13] * c[10]) - c[8] * (c[1] * c[14] - c[13] * c[2]) + c[12] * (c[1] * c[10] - c[9] * c[2])) * e;
            i[14] = (c[0] * (c[13] * c[6] - c[5] * c[14]) - c[4] * (c[13] * c[2] - c[1] * c[14]) + c[12] * (c[5] * c[2] - c[1] * c[6])) * e;
            i[15] = (c[0] * (c[5] * c[10] - c[9] * c[6]) - c[4] * (c[1] * c[10] - c[9] * c[2]) + c[8] * (c[1] * c[6] - c[5] * c[2])) * e;
            return f
        };
        b.prototype.invert = function () {
            return b.invert(this, this)
        };
        b.prototype.isOrthogonal = function () {
            var a;
            a = this.e00 * this.e01 + this.e10 * this.e11 +
                this.e20 * this.e21 + this.e30 * this.e31;
            if (Math.abs(a) > g.EPSILON)return !1;
            a = this.e00 * this.e02 + this.e10 * this.e12 + this.e20 * this.e22 + this.e30 * this.e32;
            if (Math.abs(a) > g.EPSILON)return !1;
            a = this.e00 * this.e03 + this.e10 * this.e13 + this.e20 * this.e23 + this.e30 * this.e33;
            if (Math.abs(a) > g.EPSILON)return !1;
            a = this.e01 * this.e02 + this.e11 * this.e12 + this.e21 * this.e22 + this.e31 * this.e32;
            if (Math.abs(a) > g.EPSILON)return !1;
            a = this.e01 * this.e03 + this.e11 * this.e13 + this.e21 * this.e23 + this.e31 * this.e33;
            if (Math.abs(a) > g.EPSILON)return !1;
            a = this.e02 * this.e03 + this.e12 * this.e13 + this.e22 * this.e23 + this.e32 * this.e33;
            return Math.abs(a) > g.EPSILON ? !1 : !0
        };
        b.prototype.isNormal = function () {
            var a;
            a = this.e00 * this.e00 + this.e10 * this.e10 + this.e20 * this.e20 + this.e30 * this.e30;
            if (Math.abs(a - 1) > g.EPSILON)return !1;
            a = this.e01 * this.e01 + this.e11 * this.e11 + this.e21 * this.e21 + this.e31 * this.e31;
            if (Math.abs(a - 1) > g.EPSILON)return !1;
            a = this.e02 * this.e02 + this.e12 * this.e12 + this.e22 * this.e22 + this.e32 * this.e32;
            if (Math.abs(a - 1) > g.EPSILON)return !1;
            a = this.e03 * this.e03 + this.e13 *
                this.e13 + this.e23 * this.e23 + this.e33 * this.e33;
            return Math.abs(a - 1) > g.EPSILON ? !1 : !0
        };
        b.prototype.isOrthonormal = function () {
            return this.isOrthogonal() && this.isNormal()
        };
        b.prototype.determinant = function () {
            var a = this.data;
            return a[0] * (a[5] * a[10] * a[15] + a[9] * a[14] * a[7] + a[13] * a[6] * a[11] - a[13] * a[10] * a[7] - a[9] * a[6] * a[15] - a[5] * a[14] * a[11]) - a[4] * (a[1] * a[10] * a[15] + a[9] * a[14] * a[3] + a[13] * a[2] * a[11] - a[13] * a[10] * a[3] - a[9] * a[2] * a[15] - a[1] * a[14] * a[11]) + a[8] * (a[1] * a[6] * a[15] + a[5] * a[14] * a[3] + a[13] * a[2] * a[7] - a[13] * a[6] *
                a[3] - a[5] * a[2] * a[15] - a[1] * a[14] * a[7]) - a[12] * (a[1] * a[6] * a[11] + a[5] * a[10] * a[3] + a[9] * a[2] * a[7] - a[9] * a[6] * a[3] - a[5] * a[2] * a[11] - a[1] * a[10] * a[7])
        };
        b.prototype.setIdentity = function () {
            var a = this.data;
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = 1;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = 1;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return this
        };
        b.prototype.setRotationFromVector = function (a) {
            var f = Math.sin(a.x), e = Math.cos(a.x), c = Math.sin(a.y), b = Math.cos(a.y), d = Math.sin(a.z), a = Math.cos(a.z);
            this.e00 = a * b;
            this.e10 = d * b;
            this.e20 =
                0 - c;
            this.e01 = a * c * f - d * e;
            this.e11 = d * c * f + a * e;
            this.e21 = b * f;
            this.e02 = a * c * e + d * f;
            this.e12 = d * c * e - a * f;
            this.e22 = b * e;
            return this
        };
        b.prototype.setRotationFromQuaternion = function (a) {
            var f = a.lengthSquared(), f = f > 0 ? 2 / f : 0, e = a.x * f, c = a.y * f, b = a.z * f, f = a.w * e, d = a.w * c, g = a.w * b;
            e *= a.x;
            var h = a.x * c, l = a.x * b;
            c *= a.y;
            var n = a.y * b, a = a.z * b;
            this.e00 = 1 - c - a;
            this.e10 = h + g;
            this.e20 = l - d;
            this.e01 = h - g;
            this.e11 = 1 - e - a;
            this.e21 = n + f;
            this.e02 = l + d;
            this.e12 = n - f;
            this.e22 = 1 - e - c;
            return this
        };
        b.prototype.setTranslation = function (a) {
            this.e03 = a.x;
            this.e13 =
                a.y;
            this.e23 = a.z;
            return this
        };
        b.prototype.getTranslation = function (a) {
            a.x = this.data[12];
            a.y = this.data[13];
            a.z = this.data[14];
            return this
        };
        b.prototype.getScale = function (a) {
            var f = Math.sqrt(a.setd(this.data[0], this.data[4], this.data[8]).lengthSquared()), e = Math.sqrt(a.setd(this.data[1], this.data[5], this.data[9]).lengthSquared()), c = Math.sqrt(a.setd(this.data[2], this.data[6], this.data[10]).lengthSquared());
            a.x = f;
            a.y = e;
            a.z = c;
            return this
        };
        b.prototype.setScale = function (a) {
            this.e00 *= a.x;
            this.e10 *= a.y;
            this.e20 *=
                a.z;
            this.e01 *= a.x;
            this.e11 *= a.y;
            this.e21 *= a.z;
            this.e02 *= a.x;
            this.e12 *= a.y;
            this.e22 *= a.z;
            return this
        };
        b.prototype.applyPre = function (a) {
            var f = a.data[0], e = a.data[1], c = a.data[2], b = a.data[3], d = this.data;
            a.data[0] = d[0] * f + d[1] * e + d[2] * c + d[3] * b;
            a.data[1] = d[4] * f + d[5] * e + d[6] * c + d[7] * b;
            a.data[2] = d[8] * f + d[9] * e + d[10] * c + d[11] * b;
            a.data[3] = d[12] * f + d[13] * e + d[14] * c + d[15] * b;
            return a
        };
        b.prototype.applyPost = function (a) {
            var f = a.data[0], e = a.data[1], c = a.data[2], b = a.data[3], d = this.data;
            a.data[0] = d[0] * f + d[4] * e + d[8] * c + d[12] *
                b;
            a.data[1] = d[1] * f + d[5] * e + d[9] * c + d[13] * b;
            a.data[2] = d[2] * f + d[6] * e + d[10] * c + d[14] * b;
            a.data[3] = d[3] * f + d[7] * e + d[11] * c + d[15] * b;
            return a
        };
        b.prototype.applyPostPoint = function (a) {
            var f = a.data[0], e = a.data[1], c = a.data[2], b = this.data;
            a.data[0] = b[0] * f + b[4] * e + b[8] * c + b[12];
            a.data[1] = b[1] * f + b[5] * e + b[9] * c + b[13];
            a.data[2] = b[2] * f + b[6] * e + b[10] * c + b[14];
            return a
        };
        b.prototype.applyPostVector = function (a) {
            var f = a.x, e = a.y, c = a.z, b = this.data;
            a.x = b[0] * f + b[4] * e + b[8] * c;
            a.y = b[1] * f + b[5] * e + b[9] * c;
            a.z = b[2] * f + b[6] * e + b[10] * c;
            return a
        };
        b.prototype.copy = function (a) {
            var f = this.data, a = a.data;
            f[0] = a[0];
            f[1] = a[1];
            f[2] = a[2];
            f[3] = a[3];
            f[4] = a[4];
            f[5] = a[5];
            f[6] = a[6];
            f[7] = a[7];
            f[8] = a[8];
            f[9] = a[9];
            f[10] = a[10];
            f[11] = a[11];
            f[12] = a[12];
            f[13] = a[13];
            f[14] = a[14];
            f[15] = a[15];
            return this
        };
        b.prototype.clone = function () {
            var a = this.data;
            return new b(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15])
        };
        return b
    });
    o("goo/math/Transform", ["goo/math/Vector3", "goo/math/Matrix3x3", "goo/math/Matrix4x4"], function (g, d, b) {
        function a() {
            this.matrix =
                new b;
            this.translation = new g;
            this.rotation = new d;
            this.scale = new g(1, 1, 1);
            this.tmpVec = new g;
            this.tmpVec2 = new g;
            this.tmpMat1 = new d
        }

        a.combine = function (f, e, c) {
            if (f.scale.data[0] !== f.scale.data[1] || f.scale.data[0] !== f.scale.data[2])throw{
                name: "NonUniformScaleException",
                message: "Non-uniform scaling in left hand transform, cannot resolve combined transform"
            };
            var c = c || new a, b = c.tmpVec;
            b.setv(e.translation);
            f.rotation.applyPost(b);
            b.mulv(f.scale);
            b.addv(f.translation);
            var j = c.tmpVec2;
            j.setv(e.scale);
            j.mulv(f.scale);
            var g = c.tmpMat1;
            d.combine(f.rotation, e.rotation, g);
            c.rotation.copy(g);
            c.scale.setv(j);
            c.translation.setv(b);
            return c
        };
        a.prototype.combine = function (f) {
            return a.combine(this, f, this)
        };
        a.prototype.multiply = function (a, e) {
            b.combine(a.matrix, e.matrix, this.matrix);
            this.tmpMat1.data.set(a.rotation.data);
            this.tmpMat1.multiplyDiagonalPost(a.scale, this.tmpMat1);
            this.rotation.data.set(e.rotation.data);
            this.rotation.multiplyDiagonalPost(e.scale, this.rotation);
            d.combine(this.tmpMat1, this.rotation, this.rotation);
            this.translation.setv(e.translation);
            this.tmpMat1.applyPost(this.translation).addv(a.translation);
            this.scale.setv(a.scale).mulv(e.scale)
        };
        a.prototype.setIdentity = function () {
            this.matrix.setIdentity();
            this.translation.setv(g.ZERO);
            this.rotation.setIdentity();
            this.scale.setv(g.ONE)
        };
        a.prototype.applyForward = function (a, e) {
            e.setv(a);
            this.matrix.applyPostPoint(e);
            return e
        };
        a.prototype.applyForwardVector = function (a, e) {
            e.copy(a);
            e.set(e.x * this.scale.x, e.y * this.scale.y, e.z * this.scale.z);
            this.rotation.applyPost(e);
            return e
        };
        a.prototype.update = function () {
            var a = this.matrix.data, e = this.rotation.data, c = this.scale.data, b = this.translation.data;
            a[0] = c[0] * e[0];
            a[1] = c[0] * e[1];
            a[2] = c[0] * e[2];
            a[3] = 0;
            a[4] = c[1] * e[3];
            a[5] = c[1] * e[4];
            a[6] = c[1] * e[5];
            a[7] = 0;
            a[8] = c[2] * e[6];
            a[9] = c[2] * e[7];
            a[10] = c[2] * e[8];
            a[11] = 0;
            a[12] = b[0];
            a[13] = b[1];
            a[14] = b[2];
            a[15] = 1
        };
        a.prototype.copy = function (a) {
            this.matrix.copy(a.matrix);
            this.translation.setv(a.translation);
            this.rotation.copy(a.rotation);
            this.scale.setv(a.scale)
        };
        a.prototype.setRotationXYZ =
            function (a, e, c) {
                this.rotation.fromAngles(a, e, c)
            };
        a.prototype.lookAt = function (a, e) {
            this.tmpVec.setv(this.translation).subv(a).normalize();
            this.rotation.lookAt(this.tmpVec, e)
        };
        a.prototype.invert = function (f) {
            f || (f = new a);
            f.matrix.copy(this.matrix);
            f.matrix.invert();
            var e = f.rotation.copy(this.rotation);
            e.multiplyDiagonalPost(this.scale, e).invert();
            f.translation.copy(this.translation);
            f.rotation.applyPost(f.translation).invert();
            return f
        };
        a.prototype.toString = function () {
            return "" + this.matrix
        };
        return a
    });
    o("goo/entities/components/Component", [], function () {
        return function () {
            this.enabled = !0
        }
    });
    o("goo/entities/components/TransformComponent", ["goo/math/Transform", "goo/entities/components/Component"], function (g, d) {
        function b() {
            this.type = "TransformComponent";
            this.parent = null;
            this.children = [];
            this.transform = new g;
            this.worldTransform = new g;
            this._dirty = !0;
            this._updated = !1
        }

        b.prototype = Object.create(d.prototype);
        b.prototype.setUpdated = function () {
            this._dirty = !0
        };
        b.prototype.attachChild = function (a) {
            for (var f =
                this; f;) {
                if (f === a) {
                    console.warn("attachChild: An object can't be added as a descendant of itself.");
                    return
                }
                f = f.parent
            }
            a.parent && a.parent.detachChild(a);
            a.parent = this;
            this.children.push(a)
        };
        b.prototype.detachChild = function (a) {
            if (a === this)console.warn("attachChild: An object can't be removed from itself."); else {
                var f = this.children.indexOf(a);
                if (f !== -1)a.parent = null, this.children.splice(f, 1)
            }
        };
        b.prototype.updateTransform = function () {
            this.transform.update()
        };
        b.prototype.updateWorldTransform = function () {
            this.parent ?
                this.worldTransform.multiply(this.parent.worldTransform, this.transform) : this.worldTransform.copy(this.transform);
            this._dirty = !1;
            this._updated = !0
        };
        return b
    });
    o("goo/entities/World", ["goo/entities/Entity", "goo/entities/managers/EntityManager", "goo/entities/components/TransformComponent"], function (g, d, b) {
        function a() {
            this._managers = [];
            this._systems = [];
            this._addedEntities = [];
            this._changedEntities = [];
            this._removedEntities = [];
            this.entityManager = new d;
            this.setManager(this.entityManager);
            this.time = 0;
            this.tpf =
                1
        }

        a.time = 0;
        a.prototype.setManager = function (a) {
            this._managers.push(a)
        };
        a.prototype.getManager = function (a) {
            for (var e = 0; e < this._managers.length; e++) {
                var c = this._managers[e];
                if (c.type === a)return c
            }
        };
        a.prototype.setSystem = function (a) {
            this._systems.push(a)
        };
        a.prototype.getSystem = function (a) {
            for (var e = 0; e < this._systems.length; e++) {
                var c = this._systems[e];
                if (c.type === a)return c
            }
        };
        a.prototype.createEntity = function (a) {
            a = new g(this, a);
            a.setComponent(new b);
            return a
        };
        a.prototype.getEntities = function () {
            return this.entityManager.getEntities()
        };
        a.prototype.addEntity = function (a) {
            this._addedEntities.push(a)
        };
        a.prototype.removeEntity = function (a) {
            this._removedEntities.push(a)
        };
        a.prototype.changedEntity = function (a, e, c) {
            a = {entity: a};
            if (e !== void 0)a.component = e;
            if (c !== void 0)a.eventType = c;
            this._changedEntities.push(a)
        };
        a.prototype.process = function () {
            this._check(this._addedEntities, function (a, e) {
                a.added && a.added(e);
                if (a.addedComponent)for (var b = 0; b < e._components.length; b++)a.addedComponent(e, e._components[b])
            });
            this._check(this._changedEntities,
                function (a, e) {
                    a.changed && a.changed(e.entity);
                    if (e.eventType !== void 0 && a[e.eventType])a[e.eventType](e.entity, e.component)
                });
            this._check(this._removedEntities, function (a, e) {
                a.removed && a.removed(e);
                if (a.removedComponent)for (var b = 0; b < e._components.length; b++)a.removedComponent(e, e._components[b])
            });
            for (var a = 0; a < this._systems.length; a++) {
                var e = this._systems[a];
                e.passive || e._process(this.tpf)
            }
        };
        a.prototype._check = function (a, e) {
            for (var c = 0; c < a.length; c++) {
                for (var b = a[c], d = 0; d < this._managers.length; d++)e(this._managers[d],
                    b);
                for (d = 0; d < this._systems.length; d++)e(this._systems[d], b)
            }
            a.length = 0
        };
        return a
    });
    o("goo/renderer/ShaderCall", [], function () {
        function g(a, b, e) {
            this.context = a;
            this.location = b;
            this.location.value = void 0;
            if (e)switch (e) {
                case "float":
                    this.call = this.uniform1f;
                    break;
                case "bool":
                case "int":
                case "integer":
                case "sampler2D":
                case "sampler3D":
                case "samplerCube":
                    this.call = this.uniform1i;
                    break;
                case "floatarray":
                    this.call = this.uniform1fv;
                    break;
                case "intarray":
                    this.call = this.uniform1iv;
                    break;
                case "vec2":
                    this.call =
                        this.uniform2fv;
                    break;
                case "vec3":
                    this.call = this.uniform3fv;
                    break;
                case "vec4":
                    this.call = this.uniform4fv;
                    break;
                case "mat2":
                    this.call = this.uniformMatrix2fv;
                    break;
                case "mat3":
                    this.call = this.uniformMatrix3fv;
                    break;
                case "mat4":
                    this.call = this.uniformMatrix4fv;
                    break;
                default:
                    throw"Uniform type not handled: " + e;
            }
        }

        function d(a, b, e) {
            if (e < 0)return !1;
            for (; e--;)if (a[e] !== b[e])return !1;
            return !0
        }

        function b(a, b) {
            for (var e = a.length; e--;)if (a[e] !== b[e])return !1;
            return !0
        }

        g.prototype.uniform1f = function (a) {
            if (this.location.value !==
                a)this.context.uniform1f(this.location, a), this.location.value = a
        };
        g.prototype.uniform1fv = function (a) {
            var f = this.location.value;
            if (!(f !== void 0 && b(a, f)))this.context.uniform1fv(this.location, a), this.location.value = a.slice()
        };
        g.prototype.uniform1i = function (a) {
            if (this.location.value !== a)this.context.uniform1i(this.location, a), this.location.value = a
        };
        g.prototype.uniform1iv = function (a) {
            var f = this.location.value;
            if (!(f !== void 0 && b(a, f)))this.context.uniform1iv(this.location, a), this.location.value = a.slice()
        };
        g.prototype.uniform2f = function (a, b) {
            var e = this.location.value;
            if (!(e !== void 0 && e.length === 2 && e[0] === a && e[1] === b))this.context.uniform2f(this.location, a, b), this.location.value = [a, b]
        };
        g.prototype.uniform2fv = function (a) {
            var f = this.location.value;
            if (!(f !== void 0 && b(a, f)))this.context.uniform2fv(this.location, a), this.location.value = a.slice()
        };
        g.prototype.uniform2i = function (a, b) {
            var e = this.location.value;
            if (!(e !== void 0 && e.length === 2 && e[0] === a && e[1] === b))this.context.uniform2i(this.location, a, b), this.location.value =
                [a, b]
        };
        g.prototype.uniform2iv = function (a) {
            var f = this.location.value;
            if (!(f !== void 0 && b(a, f)))this.context.uniform2iv(this.location, a), this.location.value = a.slice()
        };
        g.prototype.uniform3f = function (a, b, e) {
            var c = this.location.value;
            if (!(c !== void 0 && c.length === 3 && c[0] === a && c[1] === b && c[2] === e))this.context.uniform3f(this.location, a, b, e), this.location.value = [a, b, e]
        };
        g.prototype.uniform3fv = function (a) {
            var f = this.location.value;
            if (!(f !== void 0 && b(a, f)))this.context.uniform3fv(this.location, a), this.location.value =
                a.slice()
        };
        g.prototype.uniform3i = function (a, b, e) {
            var c = this.location.value;
            if (!(c !== void 0 && c.length === 3 && c[0] === a && c[1] === b && c[2] === e))this.context.uniform3i(this.location, a, b, e), this.location.value = [a, b, e]
        };
        g.prototype.uniform3iv = function (a) {
            var f = this.location.value;
            if (!(f !== void 0 && b(a, f)))this.context.uniform3iv(this.location, a), this.location.value = a.slice()
        };
        g.prototype.uniform4f = function (a, b, e, c) {
            var d = this.location.value;
            if (!(d !== void 0 && d.length === 4 && d[0] === a && d[1] === b && d[2] === e && d[3] ===
                c))this.context.uniform4f(this.location, a, b, e, c), this.location.value = [a, b, e, c]
        };
        g.prototype.uniform4fv = function (a) {
            var f = this.location.value;
            if (!(f !== void 0 && b(a, f))) {
                this.context.uniform4fv(this.location, a);
                if (this.location.value === void 0)this.location.value = new Float32Array(a.length);
                for (var f = this.location.value, e = a.length; e--;)f[e] = a[e]
            }
        };
        g.prototype.uniform4i = function (a, b, e, c) {
            var d = this.location.value;
            if (!(d !== void 0 && d.length === 4 && d[0] === a && d[1] === b && d[2] === e && d[3] === c))this.context.uniform4i(this.location,
                a, b, e, c), this.location.value = [a, b, e, c]
        };
        g.prototype.uniform4iv = function (a) {
            var f = this.location.value;
            if (!(f !== void 0 && b(a, f)))this.context.uniform4iv(this.location, a), this.location.value = a.slice()
        };
        g.prototype.uniformMatrix2fv = function (a, b) {
            b = b === !0;
            if (a.data) {
                var e = this.location.value;
                if (e !== void 0)if (d(e.data, a.data, 4))return; else e.copy(a); else this.location.value = a.clone();
                this.context.uniformMatrix2fv(this.location, b, a.data)
            } else this.context.uniformMatrix2fv(this.location, b, a)
        };
        g.prototype.uniformMatrix3fv =
            function (a, b) {
                b = b === !0;
                if (a.data) {
                    var e = this.location.value;
                    if (e !== void 0)if (d(e.data, a.data, 9))return; else e.copy(a); else this.location.value = a.clone();
                    this.context.uniformMatrix3fv(this.location, b, a.data)
                } else this.context.uniformMatrix3fv(this.location, b, a)
            };
        g.prototype.uniformMatrix4fv = function (a, b) {
            b = b === !0;
            if (a.data) {
                var e = this.location.value;
                if (e !== void 0)if (d(e.data, a.data, 16))return; else e.copy(a); else this.location.value = a.clone();
                this.context.uniformMatrix4fv(this.location, b, a.data)
            } else this.context.uniformMatrix4fv(this.location,
                b, a)
        };
        return g
    });
    o("goo/renderer/RenderQueue", ["goo/math/Vector3"], function (g) {
        function d() {
            var b = this, a = new g;
            this.opaqueSorter = function (f, e) {
                var c = f.meshRendererComponent.materials[0], d = e.meshRendererComponent.materials[0];
                if (c === null || d === null)return 0;
                var j = f.meshRendererComponent.materials[0].shader, g = e.meshRendererComponent.materials[0].shader;
                return j === null || g === null ? 0 : c !== d ? j._id === g._id ? (d = f.meshRendererComponent.worldBound, c = e.meshRendererComponent.worldBound, d = a.setv(b.camera.translation).subv(d.center).lengthSquared(),
                    c = a.setv(b.camera.translation).subv(c.center).lengthSquared(), d - c) : j._id - g._id : 0
            };
            this.transparentSorter = function (f, e) {
                var c = f.meshRendererComponent.worldBound, d = e.meshRendererComponent.worldBound, c = a.setv(b.camera.translation).subv(c.center).lengthSquared();
                return a.setv(b.camera.translation).subv(d.center).lengthSquared() - c
            };
            this.bucketSorter = function (a, e) {
                return a - e
            }
        }

        d.prototype.sort = function (b, a) {
            var f = 0;
            this.camera = a;
            for (var e = {}, c = [], i = 0; i < b.length; i++) {
                var j = b[i], g = j.meshRendererComponent;
                if (!g || g.materials.length === 0)b[f] = j, f++; else {
                    var h = g.materials[0].getRenderQueue(), g = e[h];
                    g || (g = [], e[h] = g, c.push(h));
                    g.push(j)
                }
            }
            c.length > 1 && c.sort(this.bucketSorter);
            for (j = 0; j < c.length; j++) {
                i = c[j];
                g = e[i];
                i <= d.TRANSPARENT ? g.sort(this.opaqueSorter) : g.sort(this.transparentSorter);
                for (i = 0; i < g.length; i++)b[f] = g[i], f++
            }
        };
        d.BACKGROUND = 0;
        d.OPAQUE = 1E3;
        d.TRANSPARENT = 2E3;
        d.OVERLAY = 3E3;
        return d
    });
    o("goo/renderer/Util", [], function () {
        function g() {
        }

        g.getByteSize = function (d) {
            switch (d) {
                case "Byte":
                    return 1;
                case "UnsignedByte":
                    return 1;
                case "Short":
                    return 2;
                case "UnsignedShort":
                    return 2;
                case "Int":
                    return 4;
                case "HalfFloat":
                    return 2;
                case "Float":
                    return 4;
                case "Double":
                    return 8;
                default:
                    throw"Unknown type: " + d;
            }
        };
        g.checkGLError = function (d) {
            for (var b = d.getError(), a = !1; b !== d.NO_ERROR;) {
                a = !0;
                if (b === d.INVALID_ENUM)console.error("An unacceptable value is specified for an enumerated argument. The offending command is ignored and has no other side effect than to set the error flag."); else if (b === d.INVALID_VALUE)console.error("A numeric argument is out of range. The offending command is ignored and has no other side effect than to set the error flag.");
                else if (b === d.INVALID_OPERATION)console.error("The specified operation is not allowed in the current state. The offending command is ignored and has no other side effect than to set the error flag."); else if (b === d.FRAMEBUFFER_COMPLETE)console.error("The command is trying to render to or read from the framebuffer while the currently bound framebuffer is not framebuffer complete (i.e. the return value from glCheckFramebufferStatus is not GL_FRAMEBUFFER_COMPLETE). The offending command is ignored and has no other side effect than to set the error flag.");
                else if (b === d.OUT_OF_MEMORY)throw"There is not enough memory left to execute the command. The state of the GL is undefined, except for the state of the error flags, after this error is recorded.";
                b = d.getError()
            }
            if (a)throw"Stopping due to error";
        };
        g.isPowerOfTwo = function (d) {
            return (d & d - 1) === 0
        };
        g.nearestPowerOfTwo = function (d) {
            return Math.pow(2, Math.ceil(Math.log(d) / Math.log(2)))
        };
        g.clone = function (d) {
            if (d === null || typeof d !== "object")return d;
            if (d instanceof Uint8Array)return d;
            if (d instanceof Date) {
                var b =
                    new Date;
                b.setTime(d.getTime());
                return b
            }
            if (d instanceof Array) {
                for (var b = [], a = 0, f = d.length; a < f; ++a)b[a] = g.clone(d[a]);
                return b
            }
            if (d instanceof Object) {
                b = {};
                for (a in d)d.hasOwnProperty(a) && (b[a] = g.clone(d[a]));
                return b
            }
            throw Error("Unable to copy obj! Its type isn't supported.");
        };
        return g
    });
    o("goo/renderer/Shader", "goo/renderer/ShaderCall,goo/math/Matrix4x4,goo/math/Vector3,goo/entities/World,goo/renderer/RenderQueue,goo/renderer/Util".split(","), function (g, d, b, a, f, e) {
        function c(a, e) {
            if (!e.vshader || !e.fshader)throw Error("Missing shader sources for shader: " + a);
            i = window.WebGLRenderingContext;
            this.shaderDefinition = this.originalShaderDefinition = e;
            this.name = a;
            this.origVertexSource = this.vertexSource = e.vshader;
            this.origFragmentSource = this.fragmentSource = e.fshader;
            this.shaderProgram = null;
            this.attributeMapping = {};
            this.attributeIndexMapping = {};
            this.uniformMapping = {};
            this.uniformCallMapping = {};
            this.textureSlots = [];
            this.textureSlotsNaming = {};
            this.currentCallbacks = {};
            this.overridePrecision = e.precision || null;
            this.processors = e.processors ||
                [];
            this.defines = e.defines || {};
            this.attributes = e.attributes || {};
            this.uniforms = e.uniforms || {};
            this.renderQueue = f.OPAQUE;
            this._id = c.id++;
            this.errorOnce = !1
        }

        var i = window.WebGLRenderingContext;
        c.id = 0;
        c.prototype.clone = function () {
            return new c(this.name, e.clone({
                precision: this.precision,
                processors: this.processors,
                defines: this.defines,
                attributes: this.attributes,
                uniforms: this.uniforms,
                vshader: this.origVertexSource,
                fshader: this.origFragmentSource
            }))
        };
        c.prototype.cloneOriginal = function () {
            return new c(this.name,
                this.originalShaderDefinition)
        };
        var j = /\b(attribute|uniform)\s+(float|int|bool|vec2|vec3|vec4|mat3|mat4|sampler2D|sampler3D|samplerCube)\s+(\w+)(\s*\[\s*\w+\s*\])*;/g;
        c.prototype.apply = function (a, c) {
            var e = c.context, b = c.rendererRecord;
            this.shaderProgram === null && (this._investigateShaders(), this.addDefines(this.defines), this.addPrecision(this.overridePrecision || c.shaderPrecision), this.compile(c));
            var f = !1;
            if (b.usedProgram !== this.shaderProgram)e.useProgram(this.shaderProgram), b.usedProgram = this.shaderProgram,
                f = !0;
            if (this.attributes) {
                var e = a.meshData.attributeMap, d;
                for (d in this.attributes)if (b = e[this.attributes[d]]) {
                    var i = this.attributeIndexMapping[d];
                    i !== void 0 && (f && c.context.enableVertexAttribArray(i), c.bindVertexAttribute(i, b))
                }
            }
            if (this.uniforms)try {
                for (var j in this.uniforms)this._bindUniform(j, a);
                this.errorOnce = !1
            } catch (g) {
                if (this.errorOnce === !1)console.error(g.stack), this.errorOnce = !0
            }
        };
        c.prototype._bindUniform = function (a, c) {
            var e = this.uniformCallMapping[a];
            if (e !== void 0) {
                var b = c.material.uniforms[a] ||
                    this.uniforms[a];
                typeof b === "string" ? (b = this.currentCallbacks[a]) ? b(e, c) : (b = this.textureSlotsNaming[a], b !== void 0 && e.call(b.index)) : (b = typeof b === "function" ? b(c) : b, e.call(b))
            }
        };
        c.prototype.rebuild = function () {
            this.shaderProgram = null;
            this.attributeMapping = {};
            this.attributeIndexMapping = {};
            this.uniformMapping = {};
            this.uniformCallMapping = {};
            this.currentCallbacks = {};
            this.vertexSource = this.origVertexSource;
            this.fragmentSource = this.origFragmentSource
        };
        c.prototype._investigateShaders = function () {
            this.textureSlots =
                [];
            this.textureSlotsNaming = {};
            c.investigateShader(this.vertexSource, this);
            c.investigateShader(this.fragmentSource, this)
        };
        c.investigateShader = function (a, c) {
            j.lastIndex = 0;
            for (var e = j.exec(a); e !== null;) {
                var b = {format: e[2]}, f = e[1], d = e[3];
                if (e[4])if (b.format === "float")b.format = "floatarray"; else if (b.format === "int")b.format = "intarray";
                "attribute" === f ? c.attributeMapping[d] = b : (b.format.indexOf("sampler") === 0 && (e = {
                    format: b.format,
                    name: d,
                    mapping: c.uniforms[d],
                    index: c.textureSlots.length
                }, c.textureSlots.push(e),
                    c.textureSlotsNaming[e.name] = e), c.uniformMapping[d] = b);
                e = j.exec(a)
            }
        };
        c.prototype.compile = function (a) {
            var a = a.context, c = this._getShader(a, i.VERTEX_SHADER, this.vertexSource), e = this._getShader(a, i.FRAGMENT_SHADER, this.fragmentSource);
            (c === null || e === null) && console.error("Shader error - no shaders");
            this.shaderProgram = a.createProgram();
            var b = a.getError();
            (this.shaderProgram === null || b !== i.NO_ERROR) && console.error("Shader error: " + b + " [shader: " + this.name + "]");
            a.attachShader(this.shaderProgram, c);
            a.attachShader(this.shaderProgram,
                e);
            a.linkProgram(this.shaderProgram);
            a.getProgramParameter(this.shaderProgram, i.LINK_STATUS) || console.error("Could not initialise shaders: " + a.getProgramInfoLog(this.shaderProgram));
            for (var f in this.attributeMapping)c = a.getAttribLocation(this.shaderProgram, f), c !== -1 && (this.attributeIndexMapping[f] = c);
            for (f in this.uniformMapping)if (c = a.getUniformLocation(this.shaderProgram, f), c === null) {
                e = this.textureSlots.length;
                for (c = 0; c < e; c++)if (b = this.textureSlots[c], b.name === f) {
                    this.textureSlots.splice(c, 1);
                    for (delete this.textureSlotsNaming[b.name]; c < e - 1; c++)this.textureSlots[c].index--;
                    break
                }
            } else this.uniformCallMapping[f] = new g(a, c, this.uniformMapping[f].format);
            if (this.uniforms) {
                if (this.uniforms.$link) {
                    a = this.uniforms.$link instanceof Array ? this.uniforms.$link : [this.uniforms.$link];
                    for (c = 0; c < a.length; c++)for (f in e = a[c], e)this.uniforms[f] = e[f];
                    delete this.uniforms.$link
                }
                for (var d in this.uniforms)f = this.uniforms[d], this.defaultCallbacks[f] && (this.currentCallbacks[d] = this.defaultCallbacks[f])
            }
            console.log("Shader [" +
                this.name + "][" + this._id + "] compiled")
        };
        var k = /\bERROR: \d+:(\d+):\s(.+)\b/g;
        c.prototype._getShader = function (a, c, e) {
            var b = a.createShader(c);
            a.shaderSource(b, e);
            a.compileShader(b);
            if (!a.getShaderParameter(b, i.COMPILE_STATUS)) {
                a = a.getShaderInfoLog(b);
                c = c === i.VERTEX_SHADER ? "VertexShader" : "FragmentShader";
                k.lastIndex = 0;
                var f = k.exec(a);
                if (f !== null)for (; f !== null;) {
                    var b = e.split("\n"), d = f[1], f = f[2];
                    console.error("Error in " + c + " - [" + this.name + "][" + this._id + "] at line " + d + ":");
                    console.error("\tError: " + f);
                    console.error("\tSource: " + b[d - 1]);
                    f = k.exec(a)
                } else console.error("Error in " + c + " - [" + this.name + "][" + this._id + "] " + a);
                return null
            }
            return b
        };
        var h = /\bprecision\s+(lowp|mediump|highp)\s+(float|int);/g;
        c.prototype.addPrecision = function (a) {
            h.lastIndex = 0;
            if (h.exec(this.vertexSource) === null)this.vertexSource = "precision " + a + " float;\n" + this.vertexSource;
            h.lastIndex = 0;
            if (h.exec(this.fragmentSource) === null)this.fragmentSource = "precision " + a + " float;\n" + this.fragmentSource
        };
        c.prototype.addDefines = function (a) {
            if (a)a =
                this.generateDefines(a), this.vertexSource = a + "\n" + this.vertexSource, this.fragmentSource = a + "\n" + this.fragmentSource
        };
        c.prototype.generateDefines = function (a) {
            var c = [], e;
            for (e in a) {
                var b = a[e];
                b !== !1 && c.push("#define " + e + " " + b)
            }
            return c.join("\n")
        };
        c.prototype.getShaderDefinition = function () {
            return {
                vshader: this.vertexSource,
                fshader: this.fragmentSource,
                defines: this.defines,
                attributes: this.attributes,
                uniforms: this.uniforms
            }
        };
        c.prototype.toString = function () {
            return this.name
        };
        c.PROJECTION_MATRIX = "PROJECTION_MATRIX";
        c.VIEW_MATRIX = "VIEW_MATRIX";
        c.VIEW_INVERSE_MATRIX = "VIEW_INVERSE_MATRIX";
        c.VIEW_PROJECTION_MATRIX = "VIEW_PROJECTION_MATRIX";
        c.VIEW_PROJECTION_INVERSE_MATRIX = "VIEW_PROJECTION_INVERSE_MATRIX";
        c.WORLD_MATRIX = "WORLD_MATRIX";
        for (b = 0; b < 8; b++)c["LIGHT" + b] = "LIGHT" + b;
        c.CAMERA = "CAMERA";
        c.AMBIENT = "AMBIENT";
        c.EMISSIVE = "EMISSIVE";
        c.DIFFUSE = "DIFFUSE";
        c.SPECULAR = "SPECULAR";
        c.SPECULAR_POWER = "SPECULAR_POWER";
        c.NEAR_PLANE = "NEAR_PLANE";
        c.FAR_PLANE = "FAR_PLANE";
        c.MAIN_NEAR_PLANE = "NEAR_PLANE";
        c.MAIN_FAR_PLANE = "FAR_PLANE";
        c.TIME = "TIME";
        c.RESOLUTION = "RESOLUTION";
        c.LIGHT_PROJECTION_MATRIX = "LIGHT_PROJECTION_MATRIX";
        c.LIGHT_VIEW_MATRIX = "LIGHT_VIEW_MATRIX";
        c.LIGHT_VIEW_PROJECTION_MATRIX = "LIGHT_VIEW_PROJECTION_MATRIX";
        c.LIGHT_NEAR_PLANE = "LIGHT_NEAR_PLANE";
        c.LIGHT_FAR_PLANE = "LIGHT_FAR_PLANE";
        c.LIGHT_DEPTH_SCALE = "LIGHT_DEPTH_SCALE";
        c.DIFFUSE_MAP = "DIFFUSE_MAP";
        c.NORMAL_MAP = "NORMAL_MAP";
        c.SPECULAR_MAP = "SPECULAR_MAP";
        c.LIGHT_MAP = "LIGHT_MAP";
        c.SHADOW_MAP = "SHADOW_MAP";
        c.AO_MAP = "AO_MAP";
        c.EMISSIVE_MAP = "EMISSIVE_MAP";
        c.DEPTH_MAP =
            "DEPTH_MAP";
        c.prototype.defaultCallbacks = {};
        (function (e) {
            var b = new d;
            e[c.PROJECTION_MATRIX] = function (a, c) {
                var e = c.camera.getProjectionMatrix();
                a.uniformMatrix4fv(e)
            };
            e[c.VIEW_MATRIX] = function (a, c) {
                var e = c.camera.getViewMatrix();
                a.uniformMatrix4fv(e)
            };
            e[c.WORLD_MATRIX] = function (a, c) {
                a.uniformMatrix4fv(c.transform !== void 0 ? c.transform.matrix : b)
            };
            e[c.VIEW_INVERSE_MATRIX] = function (a, c) {
                var e = c.camera.getViewInverseMatrix();
                a.uniformMatrix4fv(e)
            };
            e[c.VIEW_PROJECTION_MATRIX] = function (a, c) {
                var e = c.camera.getViewProjectionMatrix();
                a.uniformMatrix4fv(e)
            };
            e[c.VIEW_PROJECTION_INVERSE_MATRIX] = function (a, c) {
                var e = c.camera.getViewProjectionInverseMatrix();
                a.uniformMatrix4fv(e)
            };
            for (var f = 0; f < 16; f++)e[c["TEXTURE" + f]] = function (a) {
                return function (c) {
                    c.uniform1i(a)
                }
            }(f);
            for (f = 0; f < 8; f++)e[c["LIGHT" + f]] = function (a) {
                return function (c, e) {
                    var b = e.lights[a];
                    b !== void 0 ? c.uniform3f(b.translation.data[0], b.translation.data[1], b.translation.data[2]) : c.uniform3f(-20, 20, 20)
                }
            }(f);
            e[c.LIGHTCOUNT] = function (a, c) {
                a.uniform1i(c.lights.length)
            };
            e[c.CAMERA] =
                function (a, c) {
                    var e = c.camera.translation;
                    a.uniform3f(e.data[0], e.data[1], e.data[2])
                };
            e[c.NEAR_PLANE] = function (a, c) {
                a.uniform1f(c.camera.near)
            };
            e[c.FAR_PLANE] = function (a, c) {
                a.uniform1f(c.camera.far)
            };
            e[c.MAIN_NEAR_PLANE] = function (a, c) {
                a.uniform1f(c.mainCamera.near)
            };
            e[c.MAIN_FAR_PLANE] = function (a, c) {
                a.uniform1f(c.mainCamera.far)
            };
            var i = [0, 0, 0, 1], j = [0, 0, 0, 0], g = [1, 1, 1, 1], h = [0.8, 0.8, 0.8, 1];
            e[c.AMBIENT] = function (a, c) {
                a.uniform4fv(c.material.materialState !== void 0 ? c.material.materialState.ambient : i)
            };
            e[c.EMISSIVE] =
                function (a, c) {
                    a.uniform4fv(c.material.materialState !== void 0 ? c.material.materialState.emissive : j)
                };
            e[c.DIFFUSE] = function (a, c) {
                a.uniform4fv(c.material.materialState !== void 0 ? c.material.materialState.diffuse : g)
            };
            e[c.SPECULAR] = function (a, c) {
                a.uniform4fv(c.material.materialState !== void 0 ? c.material.materialState.specular : h)
            };
            e[c.SPECULAR_POWER] = function (a, c) {
                var e = c.material.materialState !== void 0 ? c.material.materialState.shininess : 16, e = Math.max(e, 1);
                a.uniform1f(e)
            };
            e[c.TIME] = function (c) {
                c.uniform1f(a.time)
            };
            e[c.LIGHT_PROJECTION_MATRIX] = function (a, c) {
                var e = c.lightCamera.getProjectionMatrix();
                a.uniformMatrix4fv(e)
            };
            e[c.LIGHT_VIEW_MATRIX] = function (a, c) {
                var e = c.lightCamera.getViewMatrix();
                a.uniformMatrix4fv(e)
            };
            e[c.LIGHT_VIEW_PROJECTION_MATRIX] = function (a, c) {
                var e = c.lightCamera.getViewProjectionMatrix();
                a.uniformMatrix4fv(e)
            };
            e[c.LIGHT_NEAR_PLANE] = function (a, c) {
                a.uniform1f(c.lightCamera.near)
            };
            e[c.LIGHT_FAR_PLANE] = function (a, c) {
                a.uniform1f(c.lightCamera.far)
            };
            e[c.LIGHT_DEPTH_SCALE] = function (a, c) {
                a.uniform1f(1 /
                    (c.lightCamera.far - c.lightCamera.near))
            };
            e[c.RESOLUTION] = function (a, c) {
                a.uniform2f(c.renderer.viewportWidth, c.renderer.viewportHeight)
            }
        })(c.prototype.defaultCallbacks);
        return c
    });
    o("goo/renderer/Material", ["goo/renderer/Shader"], function (g) {
        function d(b) {
            this.name = b;
            this.shader = null;
            this.uniforms = {};
            this._textureMaps = {};
            this.materialState = void 0;
            this.cullState = {enabled: !0, cullFace: "Back", frontFace: "CCW"};
            this.blendState = {
                blending: "NoBlending", blendEquation: "AddEquation", blendSrc: "SrcAlphaFactor",
                blendDst: "OneMinusSrcAlphaFactor"
            };
            this.depthState = {enabled: !0, write: !0};
            this.offsetState = {enabled: !1, factor: 1, units: 1};
            this.wireframe = !1;
            this.renderQueue = null
        }

        d.prototype.setTexture = function (b, a) {
            this._textureMaps[b] = a
        };
        d.prototype.getTexture = function (b) {
            return this._textureMaps[b]
        };
        d.prototype.removeTexture = function (b) {
            delete this._textureMaps[b]
        };
        d.prototype.getTextures = function () {
            var b = [], a;
            for (a in this._textureMaps)b.push(this._textureMaps[a]);
            return b
        };
        d.prototype.getTextureEntries = function () {
            return this._textureMaps
        };
        d.prototype.getRenderQueue = function () {
            if (this.renderQueue !== null)return this.renderQueue; else if (this.shader !== null)return this.shader.renderQueue;
            return 1E3
        };
        d.prototype.setRenderQueue = function (b) {
            this.renderQueue = b
        };
        d.store = [];
        d.hash = [];
        d.createShader = function (b, a) {
            var f = d.store.indexOf(b);
            if (f !== -1)return d.hash[f];
            f = new g(a || null, b);
            if (f.name === null)f.name = "DefaultShader" + f._id;
            d.store.push(b);
            d.hash.push(f);
            return f
        };
        d.clearShaderCache = function () {
            d.store.length = 0;
            d.hash.length = 0
        };
        d.createMaterial =
            function (b, a) {
                var f = new d(a || "DefaultMaterial");
                f.shader = d.createShader(b);
                return f
            };
        d.createEmptyMaterial = function (b, a) {
            var f = new d(a || "Empty Material");
            if (b)f.shader = d.createShader(b);
            f.cullState = {};
            f.blendState = {};
            f.depthState = {};
            f.offsetState = {};
            return f
        };
        return d
    });
    o("goo/entities/systems/System", [], function () {
        function g(d, b) {
            this.type = d;
            this.interests = b;
            this._activeEntities = [];
            this.passive = !1
        }

        g.prototype.added = function (d) {
            this._check(d)
        };
        g.prototype.changed = function (d) {
            this._check(d)
        };
        g.prototype.removed =
            function (d) {
                var b = this._activeEntities.indexOf(d);
                b !== -1 && (this._activeEntities.splice(b, 1), this.deleted && this.deleted(d))
            };
        g.prototype._check = function (d) {
            var b = this.interests === null;
            if (!b && this.interests.length <= d._components.length)for (var b = !0, a = 0; a < this.interests.length; a++) {
                var f = this.interests[a].charAt(0).toLowerCase() + this.interests[a].substr(1);
                if (!d[f]) {
                    b = !1;
                    break
                }
            }
            a = this._activeEntities.indexOf(d);
            b && a === -1 ? (this._activeEntities.push(d), this.inserted && this.inserted(d)) : !b && a !== -1 && (this._activeEntities.splice(a,
                1), this.deleted && this.deleted(d))
        };
        g.prototype._process = function (d) {
            this.process && this.process(this._activeEntities, d)
        };
        return g
    });
    o("goo/entities/systems/TransformSystem", ["goo/entities/systems/System"], function (g) {
        function d() {
            g.call(this, "TransformSystem", ["TransformComponent"])
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.removed = function (b) {
            b = b.transformComponent;
            b.parent && b.parent.detachChild(b);
            for (var a = b.children, f = 0; f < a.length; f++)a[f].parent = null;
            b.parent = null;
            b.children = []
        };
        d.prototype.process =
            function (b) {
                var a, f;
                for (a = 0; a < b.length; a++)f = b[a].transformComponent, f._updated = !1, f._dirty && f.updateTransform();
                for (a = 0; a < b.length; a++)f = b[a].transformComponent, f._dirty && this.updateWorldTransform(f)
            };
        d.prototype.updateWorldTransform = function (b) {
            b.updateWorldTransform();
            for (var a = 0; a < b.children.length; a++)this.updateWorldTransform(b.children[a])
        };
        return d
    });
    o("goo/entities/EventHandler", [], function () {
        function g() {
        }

        g.listeners = [];
        g.dispatch = function () {
            if (arguments.length === 0)throw Error("Event needs to specify a callback as first argument");
            for (var d = arguments[0], b = Array.prototype.slice.call(arguments, 1), a = 0; a < g.listeners.length; a++) {
                var f = g.listeners[a];
                f[d] && f[d].apply(null, b)
            }
        };
        g.addListener = function (d) {
            g.listeners.indexOf(d) === -1 && g.listeners.push(d)
        };
        g.removeListener = function (d) {
            d = g.listeners.indexOf(d);
            d !== -1 && g.listeners.splice(d, 1)
        };
        return g
    });
    o("goo/util/Handy", [], function () {
        function g() {
        }

        g.deepFreeze = function (d) {
            var b, a;
            Object.freeze(d);
            for (a in d)b = d[a], d.hasOwnProperty(a) && !(typeof b !== "object" || Object.isFrozen(b)) && g.deepFreeze(b)
        };
        g.defineProperty = function (d, b, a, f) {
            var e = a;
            Object.defineProperty(d, b, {
                get: function () {
                    return e
                }, set: function (a) {
                    e = a;
                    f(e)
                }, configurable: !0, enumerable: !0
            })
        };
        g.addListener = function (d, b, a, f) {
            var e = d[b];
            Object.defineProperty(d, b, {
                get: function () {
                    a && a();
                    return e
                }, set: function (a) {
                    e = a;
                    f && f(e)
                }, configurable: !0, enumerable: !0
            })
        };
        return g
    });
    o("goo/math/Vector4", ["goo/math/Vector"], function (g) {
        function d() {
            g.call(this, 4);
            arguments.length !== 0 ? this.set(arguments) : this.setd(0, 0, 0, 0)
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.setupAliases([["x", "r"], ["y", "g"], ["z", "b"], ["w", "a"]]);
        d.ZERO = new d(0, 0, 0, 0);
        d.ONE = new d(1, 1, 1, 1);
        d.UNIT_X = new d(1, 0, 0, 0);
        d.UNIT_Y = new d(0, 1, 0, 0);
        d.UNIT_Z = new d(0, 0, 1, 0);
        d.UNIT_W = new d(0, 0, 0, 1);
        d.add = function (b, a, f) {
            typeof b === "number" && (b = [b, b, b, b]);
            typeof a === "number" && (a = [a, a, a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 4 || a.length !== 4)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] + a[0];
            f.data[1] = b[1] + a[1];
            f.data[2] = b[2] +
                a[2];
            f.data[3] = b[3] + a[3];
            return f
        };
        d.prototype.add = function (b) {
            return d.add(this, b, this)
        };
        d.sub = function (b, a, f) {
            typeof b === "number" && (b = [b, b, b, b]);
            typeof a === "number" && (a = [a, a, a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 4 || a.length !== 4)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] - a[0];
            f.data[1] = b[1] - a[1];
            f.data[2] = b[2] - a[2];
            f.data[3] = b[3] - a[3];
            return f
        };
        d.prototype.sub = function (b) {
            return d.sub(this, b, this)
        };
        d.mul = function (b, a, f) {
            typeof b ===
            "number" && (b = [b, b, b, b]);
            typeof a === "number" && (a = [a, a, a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 4 || a.length !== 4)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] * a[0];
            f.data[1] = b[1] * a[1];
            f.data[2] = b[2] * a[2];
            f.data[3] = b[3] * a[3];
            return f
        };
        d.prototype.mul = function (b) {
            return d.mul(this, b, this)
        };
        d.div = function (b, a, f) {
            typeof b === "number" && (b = [b, b, b, b]);
            typeof a === "number" && (a = [a, a, a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 4 || a.length !==
                4)throw{name: "Illegal Arguments", message: "The arguments are of incompatible sizes."};
            f.data[0] = b[0] / a[0];
            f.data[1] = b[1] / a[1];
            f.data[2] = b[2] / a[2];
            f.data[3] = b[3] / a[3];
            return f
        };
        d.prototype.div = function (b) {
            return d.div(this, b, this)
        };
        d.dot = function (b, a) {
            typeof b === "number" && (b = [b, b, b, b]);
            typeof a === "number" && (a = [a, a, a, a]);
            var f = b.data || b, e = a.data || a;
            if (f.length !== 4 || e.length !== 4)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            var c = 0;
            c += f[0] * e[0];
            c += f[1] * e[1];
            c += f[2] *
                e[2];
            c += f[3] * e[3];
            return c
        };
        d.prototype.dot = function (b) {
            return d.dot(this, b)
        };
        d.prototype.lerp = function (b, a) {
            this.x = (1 - a) * this.x + a * b.x;
            this.y = (1 - a) * this.y + a * b.y;
            this.z = (1 - a) * this.z + a * b.z;
            this.w = (1 - a) * this.w + a * b.w;
            return this
        };
        d.prototype.setd = function (b, a, f, e) {
            this.data[0] = b;
            this.data[1] = a;
            this.data[2] = f;
            this.data[3] = e;
            return this
        };
        d.prototype.seta = function (b) {
            this.data[0] = b[0];
            this.data[1] = b[1];
            this.data[2] = b[2];
            this.data[3] = b[3];
            return this
        };
        d.prototype.setv = function (b) {
            this.data[0] = b.data[0];
            this.data[1] =
                b.data[1];
            this.data[2] = b.data[2];
            this.data[3] = b.data[3];
            return this
        };
        return d
    });
    o("goo/math/Plane", ["goo/math/Vector3"], function (g) {
        function d(b, a) {
            this.normal = b !== void 0 ? new g(b) : new g(g.UNIT_Y);
            this.constant = isNaN(a) ? 0 : a
        }

        d.XZ = new d(g.UNIT_Y, 0);
        d.XY = new d(g.UNIT_Z, 0);
        d.YZ = new d(g.UNIT_X, 0);
        d.prototype.pseudoDistance = function (b) {
            return this.normal.dot(b) - this.constant
        };
        d.prototype.setPlanePoints = function (b, a, f) {
            this.normal.set(a).subtractLocal(b);
            this.normal.crossLocal(f.x - b.x, f.y - b.y, f.z - b.z).normalizeLocal();
            this.constant = this.normal.dot(b);
            return this
        };
        d.prototype.reflectVector = function (b, a) {
            var f = a;
            f === null && (f = new g);
            var e = this.normal.dot(b) * 2;
            f.set(b).subtractLocal(this.normal.x * e, this.normal.y * e, this.normal.z * e);
            return f
        };
        return d
    });
    o("goo/math/Ray", ["goo/math/Vector3", "goo/math/MathUtils"], function (g, d) {
        function b(a, b) {
            this.origin = a || new g;
            this.direction = b || (new g).copy(g.UNIT_Z);
            this.calcVec1 = new g;
            this.calcVec2 = new g;
            this.calcVec3 = new g;
            this.calcVec4 = new g
        }

        b.prototype.intersects = function (a, b,
                                           e) {
            if (a.length === 3)return this.intersectsTriangle(a[0], a[1], a[2], b, e); else if (a.length === 4)return this.intersectsTriangle(a[0], a[1], a[2], b, e) || this.intersectsTriangle(a[0], a[2], a[3], b, e);
            return !1
        };
        b.prototype.intersectsTriangle = function (a, b, e, c, i) {
            var j = this.calcVec1.set(this.origin).sub(a), b = this.calcVec2.set(b).sub(a), a = this.calcVec3.set(e).sub(a), k = this.calcVec4.set(b).cross(a), e = this.direction.dot(k), h;
            if (e > d.EPSILON)h = 1; else if (e < -d.EPSILON)h = -1, e = -e; else return !1;
            var a = h * this.direction.dot(g.cross(j,
                    a, a)), l = !1;
            if (a >= 0 && (b = h * this.direction.dot(b.cross(j)), b >= 0 && a + b <= e && (j = -h * j.dot(k), j >= 0))) {
                if (!i)return !0;
                e = 1 / e;
                j *= e;
                c ? i.setd(j, a * e, b * e) : i.setv(this.origin).add_d(this.direction.x * j, this.direction.y * j, this.direction.z * j);
                l = !0
            }
            return l
        };
        b.prototype.getDistanceToPrimitive = function (a) {
            var b = this.calcVec1;
            return this.intersects(a, !1, b) ? this.origin.distance(b.x, b.y, b.z) : Infinity
        };
        b.prototype.intersectsPlane = function (a, b) {
            var e = a.normal, c = e.dot(this.direction);
            if (Math.abs(c) < 1.0E-5)return !1;
            e = (-e.dot(this.origin) +
                a.constant) / c;
            if (e < 1.0E-5)return !1;
            b !== null && b.set(this.direction).multiplyLocal(e).addLocal(this.origin);
            return !0
        };
        b.prototype.distanceSquared = function (a, b) {
            var e = this.calcVec1;
            e.set(a).subtractLocal(this.origin);
            var c = this.direction.dot(e);
            c > 0 ? (e.set(this.direction).multiplyLocal(c), e.addLocal(this.origin)) : e.set(this.origin);
            b !== null && b.set(e);
            a.subtract(e, e);
            return e.lengthSquared()
        };
        return b
    });
    o("goo/renderer/bounds/BoundingVolume", ["goo/math/Vector3"], function (g) {
        function d(b) {
            this.center = new g;
            b !== void 0 && this.center.setv(b);
            this.min = new g(Infinity, Infinity, Infinity);
            this.max = new g(-Infinity, -Infinity, -Infinity)
        }

        d.Outside = 0;
        d.Inside = 1;
        d.Intersects = 2;
        return d
    });
    o("goo/renderer/bounds/BoundingBox", ["goo/math/Vector3", "goo/renderer/bounds/BoundingVolume", "goo/math/MathUtils"], function (g, d, b) {
        function a(a, e, c, b) {
            d.call(this, a);
            this.xExtent = e !== void 0 ? e : 1;
            this.yExtent = c !== void 0 ? c : 1;
            this.zExtent = b !== void 0 ? b : 1;
            this._compVect1 = new g;
            this._compVect2 = new g;
            this.vec = new g;
            this.corners = [];
            for (a =
                     0; a < 8; a++)this.corners.push(new g)
        }

        a.prototype = Object.create(d.prototype);
        a.prototype.computeFromPoints = function (a) {
            var e = this.min, c = this.max, b = this.vec;
            e.setd(Infinity, Infinity, Infinity);
            c.setd(-Infinity, -Infinity, -Infinity);
            for (var d, g, h, l = 0; l < a.length; l += 3)d = a[l + 0], g = a[l + 1], h = a[l + 2], e.x = d < e.x ? d : e.x, e.y = g < e.y ? g : e.y, e.z = h < e.z ? h : e.z, c.x = d > c.x ? d : c.x, c.y = g > c.y ? g : c.y, c.z = h > c.z ? h : c.z;
            b.setv(c).subv(e).div(2);
            this.xExtent = b.x;
            this.yExtent = b.y;
            this.zExtent = b.z;
            this.center.setv(c).addv(e).div(2)
        };
        a.prototype.computeFromPrimitives =
            function (b, e, c, d, j) {
                if (!(j - d <= 0)) {
                    for (var g = this._compVect1.set(Infinity, Infinity, Infinity), h = this._compVect2.set(-Infinity, -Infinity, -Infinity), l = []; d < j; d++)for (var l = b.getPrimitiveVertices(c[d], e, l), n = 0; n < l.length; n++)a.checkMinMax(g, h, l[n]);
                    this.center.copy(g.add(h));
                    this.center.mul(0.5);
                    this.xExtent = h.x - this.center.x;
                    this.yExtent = h.y - this.center.y;
                    this.zExtent = h.z - this.center.z
                }
            };
        a.checkMinMax = function (a, e, c) {
            if (c.x < a.x)a.x = c.x;
            if (c.x > e.x)e.x = c.x;
            if (c.y < a.y)a.y = c.y;
            if (c.y > e.y)e.y = c.y;
            if (c.z < a.z)a.z =
                c.z;
            if (c.z > e.z)e.z = c.z
        };
        a.prototype.transform = function (b, e) {
            e === null && (e = new a);
            var c = this.corners;
            this.getCorners(c);
            for (var d = 0; d < c.length; d++)b.matrix.applyPostPoint(c[d]);
            for (var j = c[0].data[0], g = c[0].data[1], h = c[0].data[2], l = j, n = g, q = h, d = 1; d < c.length; d++)var r = c[d].data[0], m = c[d].data[1], s = c[d].data[2], j = Math.min(j, r), g = Math.min(g, m), h = Math.min(h, s), l = Math.max(l, r), n = Math.max(n, m), q = Math.max(q, s);
            c = (l + j) * 0.5;
            g = (n + g) * 0.5;
            h = (q + h) * 0.5;
            e.center.setd(c, g, h);
            e.xExtent = l - c;
            e.yExtent = n - g;
            e.zExtent = q -
                h;
            return e
        };
        a.prototype.getCorners = function (a) {
            if (!a || a.length !== 8)for (var a = [], e = 0; e < a.length; e++)a.push(new g);
            a[0].setd(this.center.data[0] + this.xExtent, this.center.data[1] + this.yExtent, this.center.data[2] + this.zExtent);
            a[1].setd(this.center.data[0] + this.xExtent, this.center.data[1] + this.yExtent, this.center.data[2] - this.zExtent);
            a[2].setd(this.center.data[0] + this.xExtent, this.center.data[1] - this.yExtent, this.center.data[2] + this.zExtent);
            a[3].setd(this.center.data[0] + this.xExtent, this.center.data[1] -
                this.yExtent, this.center.data[2] - this.zExtent);
            a[4].setd(this.center.data[0] - this.xExtent, this.center.data[1] + this.yExtent, this.center.data[2] + this.zExtent);
            a[5].setd(this.center.data[0] - this.xExtent, this.center.data[1] + this.yExtent, this.center.data[2] - this.zExtent);
            a[6].setd(this.center.data[0] - this.xExtent, this.center.data[1] - this.yExtent, this.center.data[2] + this.zExtent);
            a[7].setd(this.center.data[0] - this.xExtent, this.center.data[1] - this.yExtent, this.center.data[2] - this.zExtent);
            return a
        };
        a.prototype.whichSide =
            function (a) {
                var e = a.normal.data, c = this.center.data, b = Math.abs(this.xExtent * e[0]) + Math.abs(this.yExtent * e[1]) + Math.abs(this.zExtent * e[2]), a = e[0] * c[0] + e[1] * c[1] + e[2] * c[2] - a.constant;
                return a < -b ? d.Inside : a > b ? d.Outside : d.Intersects
            };
        a.prototype._pseudoDistance = function (a, e) {
            var c = a.normal.data, b = e.data;
            return c[0] * b[0] + c[1] * b[1] + c[2] * b[2] - a.constant
        };
        a.prototype._maxAxis = function (a) {
            return Math.max(Math.abs(a.x), Math.max(Math.abs(a.y), Math.abs(a.z)))
        };
        a.prototype.toString = function () {
            var a = Math.round(this.center.x *
                    10) / 10, e = Math.round(this.center.y * 10) / 10, c = Math.round(this.center.z * 10) / 10;
            return "[" + a + "," + e + "," + c + "] - [" + this.xExtent + "," + this.yExtent + "," + this.zExtent + "]"
        };
        a.prototype.intersects = function (a) {
            return a.intersectsBoundingBox(this)
        };
        a.prototype.intersectsBoundingBox = function (a) {
            return this.center.x + this.xExtent < a.center.x - a.xExtent || this.center.x - this.xExtent > a.center.x + a.xExtent ? !1 : this.center.y + this.yExtent < a.center.y - a.yExtent || this.center.y - this.yExtent > a.center.y + a.yExtent ? !1 : this.center.z + this.zExtent <
            a.center.z - a.zExtent || this.center.z - this.zExtent > a.center.z + a.zExtent ? !1 : !0
        };
        a.prototype.intersectsSphere = function (a) {
            return Math.abs(this.center.x - a.center.x) < a.radius + this.xExtent && Math.abs(this.center.y - a.center.y) < a.radius + this.yExtent && Math.abs(this.center.z - a.center.z) < a.radius + this.zExtent ? !0 : !1
        };
        a.prototype.testStaticAABBAABB = function (a, e) {
            var c = {mtvDistance: 1E10, mtvAxis: new g};
            if (!this.testAxisStatic(g.UNIT_X, this.center.x - this.xExtent, this.center.x + this.xExtent, a.center.x - a.xExtent, a.center.x +
                    a.xExtent, c))return !1;
            if (!this.testAxisStatic(g.UNIT_Y, this.center.y - this.yExtent, this.center.y + this.yExtent, a.center.y - a.yExtent, a.center.y + a.yExtent, c))return !1;
            if (!this.testAxisStatic(g.UNIT_Z, this.center.z - this.zExtent, this.center.z + this.zExtent, a.center.z - a.zExtent, a.center.z + a.zExtent, c))return !1;
            if (e)e.isIntersecting = !0, e.normal = c.mtvAxis, e.penetration = Math.sqrt(c.mtvDistance) * 1.001;
            return !0
        };
        a.prototype.testAxisStatic = function (a, e, c, b, d, k) {
            var h = g.dot(a, a);
            if (h < 1.0E-6)return !0;
            e = d - e;
            c -= b;
            if (e <= 0 || c <= 0)return !1;
            c = e < c ? e : -c;
            h = (new g).copy(a).mul(c / h);
            h = g.dot(h, h);
            if (h < k.mtvDistance)k.mtvDistance = h, k.mtvAxis = a;
            return !0
        };
        a.prototype.intersectsRay = function (f) {
            if (isNaN(this.center.x) || isNaN(this.center.y) || isNaN(this.center.z))return !1;
            var e = this._compVect1.setv(f.origin).subv(this.center), f = f.direction, c = [0, Infinity], d = this.xExtent;
            if (d < b.ZERO_TOLERANCE && d >= 0)d = b.ZERO_TOLERANCE;
            var g = this.yExtent;
            if (g < b.ZERO_TOLERANCE && g >= 0)g = b.ZERO_TOLERANCE;
            var k = this.zExtent;
            if (k < b.ZERO_TOLERANCE && k >=
                0)k = b.ZERO_TOLERANCE;
            return a.clip(f.data[0], -e.data[0] - d, c) && a.clip(-f.data[0], e.data[0] - d, c) && a.clip(f.data[1], -e.data[1] - g, c) && a.clip(-f.data[1], e.data[1] - g, c) && a.clip(f.data[2], -e.data[2] - k, c) && a.clip(-f.data[2], e.data[2] - k, c) && (c[0] !== 0 || c[1] !== Infinity) ? !0 : !1
        };
        a.prototype.intersectsRayWhere = function (f) {
            if (isNaN(this.center.x) || isNaN(this.center.y) || isNaN(this.center.z))return null;
            var e = g.sub(f.origin, this.center, this._compVect1), c = f.direction, d = [0, Infinity], j = this.xExtent;
            if (j < b.ZERO_TOLERANCE &&
                j >= 0)j = b.ZERO_TOLERANCE;
            var k = this.yExtent;
            if (k < b.ZERO_TOLERANCE && k >= 0)k = b.ZERO_TOLERANCE;
            var h = this.zExtent;
            if (h < b.ZERO_TOLERANCE && h >= 0)h = b.ZERO_TOLERANCE;
            if (a.clip(c.x, -e.x - j, d) && a.clip(-c.x, e.x - j, d) && a.clip(c.y, -e.y - k, d) && a.clip(-c.y, e.y - k, d) && a.clip(c.z, -e.z - h, d) && a.clip(-c.z, e.z - h, d) && (d[0] !== 0 || d[1] !== Infinity)) {
                if (d[1] > d[0])return e = d, f = [(new g(f.direction)).mul(e[0]).add(f.origin), (new g(f.direction)).mul(e[1]).add(f.origin)], {
                    distances: e,
                    points: f
                };
                e = [d[0]];
                f = [(new g(f.direction)).mul(e[0]).add(f.origin)];
                return {distances: e, points: f}
            }
            return null
        };
        a.clip = function (a, e, c) {
            if (a > 0) {
                if (e > a * c[1])return !1;
                e > a * c[0] && (c[0] = e / a);
                return !0
            } else if (a < 0) {
                if (e > a * c[0])return !1;
                e > a * c[1] && (c[1] = e / a);
                return !0
            } else return e <= 0
        };
        a.prototype.merge = function (b) {
            return b instanceof a ? this.mergeBox(b.center, b.xExtent, b.yExtent, b.zExtent, this) : this.mergeBox(b.center, b.radius, b.radius, b.radius, this)
        };
        a.prototype.mergeBox = function (b, e, c, d, g) {
            g || (g = new a);
            var k = this._compVect1, h = this._compVect2;
            k.x = this.center.x - this.xExtent;
            if (k.x >
                b.x - e)k.x = b.x - e;
            k.y = this.center.y - this.yExtent;
            if (k.y > b.y - c)k.y = b.y - c;
            k.z = this.center.z - this.zExtent;
            if (k.z > b.z - d)k.z = b.z - d;
            h.x = this.center.x + this.xExtent;
            if (h.x < b.x + e)h.x = b.x + e;
            h.y = this.center.y + this.yExtent;
            if (h.y < b.y + c)h.y = b.y + c;
            h.z = this.center.z + this.zExtent;
            if (h.z < b.z + d)h.z = b.z + d;
            g.center.set(h).addv(k).muld(0.5, 0.5, 0.5);
            g.xExtent = h.x - g.center.x;
            g.yExtent = h.y - g.center.y;
            g.zExtent = h.z - g.center.z;
            return g
        };
        a.prototype.clone = function (b) {
            return b && b instanceof a ? (b.center.setv(this.center), b.xExtent =
                this.xExtent, b.yExtent = this.yExtent, b.zExtent = this.zExtent, b) : new a(this.center, this.xExtent, this.yExtent, this.zExtent)
        };
        return a
    });
    o("goo/renderer/BufferData", [], function () {
        function g(d, b) {
            this.data = d;
            this.target = b;
            this.glBuffer = null;
            this._dataUsage = "StaticDraw";
            this._dataNeedsRefresh = !1
        }

        g.prototype.setDataUsage = function (d) {
            this._dataUsage = d
        };
        g.prototype.setDataNeedsRefresh = function () {
            this._dataNeedsRefresh = !0
        };
        return g
    });
    o("goo/renderer/BufferUtils", [], function () {
        function g() {
        }

        g.createIndexBuffer =
            function (d, b) {
                var a;
                if (b < 256)a = new Uint8Array(d); else if (b < 65536)a = new Uint16Array(d); else throw Error("Maximum number of vertices is 65535. Got: " + b);
                return a
            };
        return g
    });
    o("goo/math/Vector2", ["goo/math/Vector"], function (g) {
        function d() {
            g.call(this, 2);
            arguments.length !== 0 ? this.set(arguments) : this.setd(0, 0)
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.setupAliases([["x", "u", "s"], ["y", "v", "t"]]);
        d.ZERO = new d(0, 0);
        d.ONE = new d(1, 1);
        d.UNIT_X = new d(1, 0);
        d.UNIT_Y = new d(0, 1);
        d.add = function (b, a, f) {
            typeof b ===
            "number" && (b = [b, b]);
            typeof a === "number" && (a = [a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 2 || a.length !== 2)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] + a[0];
            f.data[1] = b[1] + a[1];
            return f
        };
        d.prototype.add = function (b) {
            return d.add(this, b, this)
        };
        d.sub = function (b, a, f) {
            typeof b === "number" && (b = [b, b]);
            typeof a === "number" && (a = [a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 2 || a.length !== 2)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] - a[0];
            f.data[1] = b[1] - a[1];
            return f
        };
        d.prototype.sub = function (b) {
            return d.sub(this, b, this)
        };
        d.mul = function (b, a, f) {
            typeof b === "number" && (b = [b, b]);
            typeof a === "number" && (a = [a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 2 || a.length !== 2)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] * a[0];
            f.data[1] = b[1] * a[1];
            return f
        };
        d.prototype.mul = function (b) {
            return d.mul(this, b, this)
        };
        d.div = function (b, a, f) {
            typeof b === "number" && (b = [b, b]);
            typeof a ===
            "number" && (a = [a, a]);
            f || (f = new d);
            b = b.data || b;
            a = a.data || a;
            if (b.length !== 2 || a.length !== 2)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            f.data[0] = b[0] / a[0];
            f.data[1] = b[1] / a[1];
            return f
        };
        d.prototype.div = function (b) {
            return d.div(this, b, this)
        };
        d.dot = function (b, a) {
            typeof b === "number" && (b = [b, b]);
            typeof a === "number" && (a = [a, a]);
            var f = b.data || b, e = a.data || a;
            if (f.length !== 2 || e.length !== 2)throw{
                name: "Illegal Arguments",
                message: "The arguments are of incompatible sizes."
            };
            var c =
                0;
            c += f[0] * e[0];
            c += f[1] * e[1];
            return c
        };
        d.prototype.dot = function (b) {
            return d.dot(this, b)
        };
        d.prototype.setd = function (b, a) {
            this.data[0] = b;
            this.data[1] = a;
            return this
        };
        d.prototype.seta = function (b) {
            this.data[0] = b[0];
            this.data[1] = b[1];
            return this
        };
        d.prototype.setv = function (b) {
            this.data[0] = b.data[0];
            this.data[1] = b.data[1];
            return this
        };
        return d
    });
    o("goo/renderer/MeshData", "goo/renderer/BufferData,goo/renderer/Util,goo/renderer/BufferUtils,goo/math/Vector2,goo/math/Vector3,goo/math/Vector4".split(","), function (g,
                                                                                                                                                                             d, b, a, f, e) {
        function c(a, e, b) {
            this.attributeMap = a;
            this.vertexCount = e !== void 0 ? e : 0;
            this.indexCount = b !== void 0 ? b : 0;
            this.primitiveCounts = [0];
            this.indexData = this.vertexData = null;
            this.dataViews = {};
            this.indexLengths = null;
            this.indexModes = ["Triangles"];
            this.type = c.MESH;
            this.rebuildData(this.vertexCount, this.indexCount)
        }

        function i(a) {
            for (var c = {}, e = 0; e < a.length; e++) {
                var b = a[e];
                if (q[b] !== void 0)c[b] = d.clone(q[b]); else throw"No default attribute named: " + b;
            }
            return c
        }

        var j = window.Uint8ClampedArray;
        c.MESH = 0;
        c.SKINMESH =
            1;
        c.prototype.rebuildData = function (a, c, e) {
            var b = {}, f = null;
            if (e) {
                for (var d in this.attributeMap) {
                    var i = this.dataViews[d];
                    i && (b[d] = i)
                }
                if (this.indexData)f = this.indexData.data
            }
            this.rebuildVertexData(a);
            this.rebuildIndexData(c);
            if (e) {
                for (d in this.attributeMap)if (a = b[d])i = this.dataViews[d], i.set(a);
                f && this.indexData.data.set(f)
            }
        };
        c.prototype.rebuildVertexData = function (a) {
            if (!isNaN(a))this._vertexCountStore = this.vertexCount = a;
            if (this.vertexCount > 0) {
                var a = 0, c;
                for (c in this.attributeMap) {
                    var e = this.attributeMap[c];
                    a += d.getByteSize(e.type) * e.count
                }
                this.vertexData = new g(new ArrayBuffer(a * this.vertexCount), "ArrayBuffer");
                this.generateAttributeData()
            }
        };
        c.prototype.rebuildIndexData = function (a) {
            if (a !== void 0)this.indexCount = a;
            if (this.indexCount > 0)a = b.createIndexBuffer(this.indexCount, this.vertexCount), this.indexData = new g(a, "ElementArrayBuffer")
        };
        c.prototype.setVertexDataUpdated = function () {
            this.vertexData._dataNeedsRefresh = !0
        };
        c.prototype.getSectionCount = function () {
            return this.indexLengths ? this.indexLengths.length :
                1
        };
        c.prototype.getPrimitiveCount = function (a) {
            return a >= 0 && a < this.primitiveCounts.length ? this.primitiveCounts[a] : 0
        };
        c.prototype.getPrimitiveVertices = function (a, e, b) {
            var d = this.getPrimitiveCount(e);
            if (a >= d || a < 0)throw Error("Invalid primitiveIndex '" + a + "'.  Count is " + d);
            d = c.getVertexCount(this.indexModes[e]);
            if (!b || b.length < d)b = [];
            for (var i = this.getAttributeBuffer(c.POSITION), g = 0; g < d; g++) {
                b[g] || (b[g] = new f);
                var j = this.getIndexBuffer() ? this.getIndexBuffer()[this.getVertexIndex(a, g, e)] : this.getVertexIndex(a,
                    g, e);
                b[g].x = i[j * 3 + 0];
                b[g].y = i[j * 3 + 1];
                b[g].z = i[j * 3 + 2]
            }
            return b
        };
        c.prototype.getVertexIndex = function (a, e, b) {
            for (var f = 0, d = 0; d < b; d++)f += this.indexLengths[d];
            switch (this.indexModes[b]) {
                case "Triangles":
                    f += a * 3 + e;
                    break;
                case "TriangleStrip":
                    f += a + e;
                    break;
                case "TriangleFan":
                    f += e === 0 ? 0 : a + e;
                    break;
                case "Points":
                    f += a;
                    break;
                case "Lines":
                    f += a * 2 + e;
                    break;
                case "LineStrip":
                case "LineLoop":
                    f += a + e;
                    break;
                default:
                    return c.logger.warning("unimplemented index mode: " + this.indexModes[b]), -1
            }
            return f
        };
        c.prototype.getTotalPrimitiveCount =
            function () {
                for (var a = 0, c = 0, e = this.primitiveCounts.length; c < e; c++)a += this.primitiveCounts[c];
                return a
            };
        c.prototype.updatePrimitiveCounts = function () {
            var a = this.indexData ? this.indexData.data.length : this.vertexCount, e = this.getSectionCount();
            if (this.primitiveCounts.length !== e)this.primitiveCounts = [];
            for (var b = 0; b < e; b++) {
                var f = c.getPrimitiveCount(this.indexModes[b], this.indexLengths ? this.indexLengths[b] : a);
                this.primitiveCounts[b] = f
            }
        };
        c.getPrimitiveCount = function (a, c) {
            switch (a) {
                case "Triangles":
                    return c /
                        3;
                case "TriangleFan":
                case "TriangleStrip":
                    return c - 2;
                case "Lines":
                    return c / 2;
                case "LineStrip":
                    return c - 1;
                case "LineLoop":
                    return c;
                case "Points":
                    return c
            }
            throw Error("unimplemented index mode: " + a);
        };
        c.getVertexCount = function (a) {
            switch (a) {
                case "Triangles":
                case "TriangleFan":
                case "TriangleStrip":
                    return 3;
                case "Lines":
                case "LineStrip":
                case "LineLoop":
                    return 2;
                case "Points":
                    return 1
            }
            throw Error("unimplemented index mode: " + a);
        };
        var k = {
            Byte: Int8Array,
            UnsignedByte: Uint8Array,
            UnsignedByteClamped: j,
            Short: Int16Array,
            UnsignedShort: Uint16Array,
            Int: Int32Array,
            UnsignedInt: Uint32Array,
            Float: Float32Array,
            Double: Float64Array
        };
        c.prototype.generateAttributeData = function () {
            var a = this.vertexData.data, c, e = 0, b;
            for (b in this.attributeMap) {
                c = this.attributeMap[b];
                c.offset = e;
                var f = this.vertexCount * c.count;
                e += f * d.getByteSize(c.type);
                var i = k[c.type];
                if (i)c = new i(a, c.offset, f); else throw"Unsupported DataType: " + c.type;
                this.dataViews[b] = c
            }
        };
        c.prototype.makeInterleavedData = function () {
            var a = 0, c = 0, e;
            for (e in this.attributeMap) {
                var b =
                    this.attributeMap[e];
                b.offset = a;
                a += b.count * d.getByteSize(b.type)
            }
            var f = new g(new ArrayBuffer(a * this.vertexCount), this.vertexData.target);
            f._dataUsage = this.vertexData._dataUsage;
            f._dataNeedsRefresh = !0;
            var i = new DataView(f.data);
            for (e in this.attributeMap) {
                var j = this.dataViews[e], b = this.attributeMap[e];
                b.stride = a;
                for (var c = b.offset, h = b.count, k = d.getByteSize(b.type), b = this.getDataMethod(b.type), b = i[b], l = 0; l < this.vertexCount; l++)for (var n = 0; n < h; n++)b.apply(i, [c + a * l + n * k, j[l * h + n], !0])
            }
            this.vertexData = f
        };
        c.prototype.getDataMethod = function (a) {
            switch (a) {
                case "Byte":
                    return "setInt8";
                case "UnsignedByte":
                    return "setUInt8";
                case "Short":
                    return "setInt16";
                case "UnsignedShort":
                    return "setUInt16";
                case "Int":
                    return "setInt32";
                case "HalfFloat":
                    return "setInt16";
                case "Float":
                    return "setFloat32";
                case "Double":
                    return "setFloat64"
            }
        };
        c.prototype.getAttributeBuffer = function (a) {
            return this.dataViews[a]
        };
        c.prototype.getIndexData = function () {
            return this.indexData
        };
        c.prototype.getIndexBuffer = function () {
            return this.indexData !==
            null ? this.indexData.data : null
        };
        c.prototype.getIndexLengths = function () {
            return this.indexLengths
        };
        c.prototype.getIndexModes = function () {
            return this.indexModes
        };
        c.prototype.resetVertexCount = function () {
            this.vertexCount = this.vertexCountStore
        };
        c.prototype.applyTransform = function (a, e) {
            var b = new f, d = this.getAttributeBuffer(a), i = d.length;
            if (a === c.POSITION)for (var g = 0; g < i; g += 3)b.setd(d[g + 0], d[g + 1], d[g + 2]), e.matrix.applyPostPoint(b), d[g + 0] = b[0], d[g + 1] = b[1], d[g + 2] = b[2]; else if (a === c.NORMAL)for (g = 0; g < i; g += 3)b.setd(d[g +
            0], d[g + 1], d[g + 2]), e.rotation.applyPost(b), d[g + 0] = b[0], d[g + 1] = b[1], d[g + 2] = b[2]; else if (a === c.TANGENT)for (g = 0; g < i; g += 3)b.setd(d[g + 0], d[g + 1], d[g + 2]), e.rotation.applyPost(b), d[g + 0] = b[0], d[g + 1] = b[1], d[g + 2] = b[2];
            return this
        };
        c.prototype.applyFunction = function (c, b) {
            var d, i, g = this.getAttributeBuffer(c), j = g.length;
            switch (this.attributeMap[c].count) {
                case 1:
                    for (var h = 0; h < j; h++)g[h] = b(g[h]);
                    break;
                case 2:
                    d = new a;
                    for (h = 0; h < j; h += 2)d.setd(g[h + 0], g[h + 1]), i = b(d), g[h + 0] = i[0], g[h + 1] = i[1];
                    break;
                case 3:
                    d = new f;
                    for (h = 0; h <
                    j; h += 3)d.setd(g[h + 0], g[h + 1], g[h + 2]), i = b(d), g[h + 0] = i[0], g[h + 1] = i[1], g[h + 2] = i[2];
                    break;
                case 4:
                    d = new e;
                    for (h = 0; h < j; h += 4)d.setd(g[h + 0], g[h + 1], g[h + 2], g[h + 3]), i = b(d), g[h + 0] = i[0], g[h + 1] = i[1], g[h + 2] = i[2], g[h + 3] = i[3]
            }
            return this
        };
        c.prototype.getNormalsMeshData = function (a) {
            if (this.getAttributeBuffer("POSITION") !== void 0 && this.getAttributeBuffer("NORMAL") !== void 0) {
                for (var a = a !== void 0 ? a : 1, e = [], b = [], d = this.dataViews.POSITION.length / 3, f = 0; f < d; f++)e.push(this.dataViews.POSITION[f * 3 + 0], this.dataViews.POSITION[f *
                3 + 1], this.dataViews.POSITION[f * 3 + 2], this.dataViews.POSITION[f * 3 + 0] + this.dataViews.NORMAL[f * 3 + 0] * a, this.dataViews.POSITION[f * 3 + 1] + this.dataViews.NORMAL[f * 3 + 1] * a, this.dataViews.POSITION[f * 3 + 2] + this.dataViews.NORMAL[f * 3 + 2] * a);
                for (f = 0; f < d * 2; f += 2)b.push(f, f + 1);
                a = new c(c.defaultMap([c.POSITION]), e.length, b.length);
                a.getAttributeBuffer(c.POSITION).set(e);
                a.getIndexBuffer().set(b);
                a.indexModes[0] = "Lines";
                return a
            }
        };
        c.prototype.buildWireframeData = function () {
            var a = d.clone(this.attributeMap), e = new c(a, this.vertexCount,
                0);
            e.indexModes[0] = "Lines";
            var b = this.getIndexBuffer(), f = [], i = 0;
            this.updatePrimitiveCounts();
            for (var g = 0; g < this.getSectionCount(); g++)for (var j = this.indexModes[g], h = this.getPrimitiveCount(g), k = 0; k < h; k++)switch (j) {
                case "Triangles":
                case "TriangleFan":
                case "TriangleStrip":
                    var l = b[this.getVertexIndex(k, 0, g)], n = b[this.getVertexIndex(k, 1, g)], q = b[this.getVertexIndex(k, 2, g)];
                    f[i + 0] = l;
                    f[i + 1] = n;
                    f[i + 2] = n;
                    f[i + 3] = q;
                    f[i + 4] = q;
                    f[i + 5] = l;
                    i += 6;
                    break;
                case "Lines":
                case "LineStrip":
                    l = b[this.getVertexIndex(k, 0, g)];
                    n = b[this.getVertexIndex(k,
                        1, g)];
                    f[i + 0] = l;
                    f[i + 1] = n;
                    i += 2;
                    break;
                case "LineLoop":
                    l = b[this.getVertexIndex(k, 0, g)], n = b[this.getVertexIndex(k, 1, g)], k === h - 1 && (n = b[this.getVertexIndex(0, 0, g)]), f[i + 0] = l, f[i + 1] = n, i += 2
            }
            if (i > 0) {
                e.rebuildIndexData(i);
                for (var o in a)e.getAttributeBuffer(o).set(this.getAttributeBuffer(o));
                e.getIndexBuffer().set(f)
            }
            e.paletteMap = this.paletteMap;
            e.weightsPerVertex = this.weightsPerVertex;
            return e
        };
        var h = new f, l = new f, n = new f;
        c.prototype.buildFlatMeshData = function () {
            var a = [], e = this.getIndexBuffer();
            if (e === null)return console.debug("No indices, probably a point mesh"),
                this;
            if (e.length > 65535)return console.warn("Mesh too big, cannot build flat mesh data"), this;
            var b = d.clone(this.attributeMap), f = {}, i;
            for (i in b)f[i] = {oldBuffer: this.getAttributeBuffer(i), values: []};
            var g = 0;
            this.updatePrimitiveCounts();
            for (var j = 0; j < this.getSectionCount(); j++)for (var k = this.indexModes[j], q = this.getPrimitiveCount(j), A = !1, v = 0; v < q; v++)switch (k) {
                case "TriangleStrip":
                    A = v % 2 === 1 ? !0 : !1;
                case "Triangles":
                case "TriangleFan":
                    var o = e[this.getVertexIndex(v, 0, j)], z = e[this.getVertexIndex(v, 1, j)],
                        F = e[this.getVertexIndex(v, 2, j)];
                    if (A)var E = F, F = z, z = E;
                    for (i in f)if (i !== c.NORMAL) {
                        for (var E = b[i].count, D = 0; D < E; D++)f[i].values[g * E + D] = f[i].oldBuffer[o * E + D], f[i].values[(g + 1) * E + D] = f[i].oldBuffer[z * E + D], f[i].values[(g + 2) * E + D] = f[i].oldBuffer[F * E + D];
                        i === c.POSITION && (h.setd(f[i].values[g * 3], f[i].values[g * 3 + 1], f[i].values[g * 3 + 2]), l.setd(f[i].values[(g + 1) * 3], f[i].values[(g + 1) * 3 + 1], f[i].values[(g + 1) * 3 + 2]), n.setd(f[i].values[(g + 2) * 3], f[i].values[(g + 2) * 3 + 1], f[i].values[(g + 2) * 3 + 2]), l.subv(h), n.subv(h), l.cross(n).normalize(),
                        f[c.NORMAL] && (f[c.NORMAL].values[g * 3] = l.data[0], f[c.NORMAL].values[g * 3 + 1] = l.data[1], f[c.NORMAL].values[g * 3 + 2] = l.data[2], f[c.NORMAL].values[(g + 1) * 3] = l.data[0], f[c.NORMAL].values[(g + 1) * 3 + 1] = l.data[1], f[c.NORMAL].values[(g + 1) * 3 + 2] = l.data[2], f[c.NORMAL].values[(g + 2) * 3] = l.data[0], f[c.NORMAL].values[(g + 2) * 3 + 1] = l.data[1], f[c.NORMAL].values[(g + 2) * 3 + 2] = l.data[2]))
                    }
                    a.push(a.length);
                    a.push(a.length);
                    a.push(a.length);
                    g += 3
            }
            if (a.length === 0)return console.warn("Could not build flat data"), this;
            e = new c(b, a.length,
                a.length);
            for (i in f)e.getAttributeBuffer(i).set(f[i].values);
            e.getIndexBuffer().set(a);
            e.paletteMap = this.paletteMap;
            e.weightPerVertex = this.weightsPerVertex;
            return e
        };
        c.POSITION = "POSITION";
        c.NORMAL = "NORMAL";
        c.COLOR = "COLOR";
        c.TANGENT = "TANGENT";
        c.TEXCOORD0 = "TEXCOORD0";
        c.TEXCOORD1 = "TEXCOORD1";
        c.TEXCOORD2 = "TEXCOORD2";
        c.TEXCOORD3 = "TEXCOORD3";
        c.WEIGHTS = "WEIGHTS";
        c.JOINTIDS = "JOINTIDS";
        c.createAttribute = function (a, c, e) {
            return {count: a, type: c, stride: 0, offset: 0, normalized: e !== void 0 ? e : !1}
        };
        var q = {
            POSITION: c.createAttribute(3,
                "Float"),
            NORMAL: c.createAttribute(3, "Float"),
            COLOR: c.createAttribute(4, "Float"),
            TANGENT: c.createAttribute(4, "Float"),
            TEXCOORD0: c.createAttribute(2, "Float"),
            TEXCOORD1: c.createAttribute(2, "Float"),
            TEXCOORD2: c.createAttribute(2, "Float"),
            TEXCOORD3: c.createAttribute(2, "Float"),
            WEIGHTS: c.createAttribute(4, "Float"),
            JOINTIDS: c.createAttribute(4, "Short")
        };
        c.defaultMap = function (a) {
            return a === void 0 ? i(Object.keys(q)) : i(a)
        };
        return c
    });
    o("goo/renderer/bounds/BoundingSphere", ["goo/math/Vector3", "goo/math/MathUtils",
        "goo/renderer/bounds/BoundingVolume", "goo/renderer/MeshData"], function (g, d, b, a) {
        function f(a, c) {
            b.call(this, a);
            this.radius = c !== void 0 ? c : 1;
            this.vec = new g
        }

        f.prototype = Object.create(b.prototype);
        f.prototype.constructor = f;
        f.prototype.computeFromPoints = function (a) {
            var c = this.min, b = this.max, f = this.vec;
            c.setd(Infinity, Infinity, Infinity);
            b.setd(-Infinity, -Infinity, -Infinity);
            for (var d, g, l, n = 0; n < a.length; n += 3)d = a[n + 0], g = a[n + 1], l = a[n + 2], c.x = d < c.x ? d : c.x, c.y = g < c.y ? g : c.y, c.z = l < c.z ? l : c.z, b.x = d > b.x ? d : b.x, b.y = g >
            b.y ? g : b.y, b.z = l > b.z ? l : b.z;
            c = b.addv(c).div(2);
            for (n = b = 0; n < a.length; n += 3)f.setd(a[n], a[n + 1], a[n + 2]), d = f.subv(c).lengthSquared(), d > b && (b = d);
            this.radius = Math.sqrt(b);
            this.center.setv(c)
        };
        f.prototype.computeFromPrimitives = function (e, c, b, f, d) {
            if (!(d - f <= 0)) {
                for (var h = [], l = [], n = a.getVertexCount(e.indexModes[c]), q = 0; f < d; f++)for (var l = e.getPrimitiveVertices(b[f], c, l), r = 0; r < n; r++)h[q++] = (new g).set(l[r]);
                this.averagePoints(h)
            }
        };
        f.prototype.averagePoints = function (a) {
            this.center.set(a[0]);
            for (var c = 1; c < a.length; c++)this.center.add(a[c]);
            this.center.mul(1 / a.length);
            for (var b = 0, c = 0; c < a.length; c++) {
                var f = g.sub(a[c], this.center, this.vec).lengthSquared();
                f > b && (b = f)
            }
            this.radius = Math.sqrt(b) + 1.0E-5
        };
        f.prototype.transform = function (a, c) {
            c === null && (c = new f);
            a.applyForward(this.center, c.center);
            c.radius = Math.abs(this._maxAxis(a.scale) * this.radius);
            return c
        };
        f.prototype.whichSide = function (a) {
            var c = a.normal.data, f = this.center.data, a = c[0] * f[0] + c[1] * f[1] + c[2] * f[2] - a.constant;
            return a < -this.radius ? b.Inside : a > this.radius ? b.Outside : b.Intersects
        };
        f.prototype._pseudoDistance = function (a, c) {
            return a.normal.x * c.x + a.normal.y * c.y + a.normal.z * c.z - a.constant
        };
        f.prototype._maxAxis = function (a) {
            return Math.max(Math.abs(a.x), Math.max(Math.abs(a.y), Math.abs(a.z)))
        };
        f.prototype.toString = function () {
            var a = Math.round(this.center.x * 10) / 10, c = Math.round(this.center.y * 10) / 10, b = Math.round(this.center.z * 10) / 10, f = Math.round(this.radius * 10) / 10;
            return "[" + a + "," + c + "," + b + "] - " + f
        };
        f.prototype.intersects = function (a) {
            return a.intersectsSphere(this)
        };
        f.prototype.intersectsBoundingBox =
            function (a) {
                return Math.abs(a.center.x - this.center.x) < this.radius + a.xExtent && Math.abs(a.center.y - this.center.y) < this.radius + a.yExtent && Math.abs(a.center.z - this.center.z) < this.radius + a.zExtent ? !0 : !1
            };
        f.prototype.intersectsSphere = function (a) {
            var c = this.vec.setv(this.center).subv(a.center), a = this.radius + a.radius;
            return c.dot(c) <= a * a
        };
        f.prototype.intersectsRay = function (a) {
            if (!this.center)return !1;
            var c = (new g).copy(a.origin).sub(this.center), b = c.dot(c) - this.radius * this.radius;
            if (b <= 0)return !0;
            a = a.direction.dot(c);
            return a >= 0 ? !1 : a * a >= b
        };
        f.prototype.intersectsRayWhere = function (a) {
            var c = (new g).copy(a.origin).sub(this.center), b = c.dot(c) - this.radius * this.radius;
            if (b <= 0)return c = a.direction.dot(c), b = Math.sqrt(c * c - b), c = [b - c], a = [(new g).copy(a.direction).mul(c[0]).add(a.origin)], {
                distances: c,
                points: a
            };
            c = a.direction.dot(c);
            if (c >= 0)return null;
            b = c * c - b;
            if (b < 0)return null; else if (b >= 1.0E-5)return b = Math.sqrt(b), c = [-c - b, -c + b], a = [(new g).copy(a.direction).mul(c[0]).add(a.origin), (new g).copy(a.direction).mul(c[1]).add(a.origin)],
            {distances: c, points: a};
            c = [-c];
            a = [(new g).copy(a.direction).mul(c[0]).add(a.origin)];
            return {distances: c, points: a}
        };
        f.prototype.merge = function (a) {
            if (a instanceof f)return this.mergeSphere(a.center, a.radius, this); else {
                var c = this.vec.setd(a.xExtent, a.yExtent, a.zExtent).length();
                return this.mergeSphere(a.center, c, this)
            }
        };
        f.prototype.mergeSphere = function (a, c, b) {
            b || (b = new f);
            var g = this.vec.setv(a).subv(this.center), k = g.lengthSquared(), h = c - this.radius;
            if (h * h >= k)return h <= 0 ? (b.center.setv(this.center), b.radius =
                this.radius) : (b.center.setv(a), b.radius = c), b;
            a = Math.sqrt(k);
            k = b.center;
            a > d.EPSILON && k.addv(g.mul((a + h) / (2 * a)));
            b.radius = 0.5 * (a + this.radius + c);
            return b
        };
        f.prototype.clone = function (a) {
            return a && a instanceof f ? (a.center.setv(this.center), a.radius = this.radius, a) : new f(this.center, this.radius)
        };
        return f
    });
    o("goo/renderer/Camera", "goo/util/Handy,goo/math/Vector3,goo/math/Vector4,goo/math/Matrix4x4,goo/math/Plane,goo/math/MathUtils,goo/math/Ray,goo/renderer/bounds/BoundingBox,goo/renderer/bounds/BoundingSphere,goo/renderer/bounds/BoundingVolume".split(","),
        function (g, d, b, a, f, e, c, i, j, k) {
            function h(c, e, i, j) {
                this.translation = new d(0, 0, 0);
                this._left = new d(-1, 0, 0);
                this._up = new d(0, 1, 0);
                this._direction = new d(0, 0, -1);
                g.defineProperty(this, "this._depthRangeNear", 0, function () {
                    this._depthRangeDirty = !0
                });
                g.defineProperty(this, "this._depthRangeFar", 1, function () {
                    this._depthRangeDirty = !0
                });
                this._depthRangeDirty = !0;
                this._frustumNear = 1;
                this._frustumFar = 2;
                this._frustumLeft = -0.5;
                this._frustumTop = this._frustumRight = 0.5;
                this._frustumBottom = -0.5;
                this._coeffLeft = [];
                this._coeffRight =
                    [];
                this._coeffBottom = [];
                this._coeffTop = [];
                this._viewPortLeft = 0;
                this._viewPortTop = this._viewPortRight = 1;
                this._viewPortBottom = 0;
                this._planeQuantity = 6;
                this._worldPlane = [];
                for (var k = 0; k < h.FRUSTUM_PLANES; k++)this._worldPlane[k] = new f;
                this._newDirection = new d;
                this.projectionMode = h.Perspective;
                this._updateInverseMVPMatrix = this._updateMVPMatrix = this._updatePMatrix = this._updateInverseMVMatrix = this._updateMVMatrix = !0;
                this.modelView = new a;
                this.modelViewInverse = new a;
                this.projection = new a;
                this.modelViewProjection =
                    new a;
                this.modelViewProjectionInverse = new a;
                this._viewPortDirty = this._depthRangeDirty = !0;
                this._planeState = 0;
                this._clipPlane = new b;
                this._qCalc = new b;
                this._corners = [];
                for (k = 0; k < 8; k++)this._corners.push(new d);
                this._extents = new d;
                this.vNearPlaneCenter = new d;
                this.vFarPlaneCenter = new d;
                this.direction = new d;
                this.left = new d;
                this.up = new d;
                this.planeNormal = new d;
                this.changedProperties = !0;
                this.setFrustumPerspective(c, e, i, j);
                this.onFrameChange()
            }

            h.LEFT_PLANE = 0;
            h.RIGHT_PLANE = 1;
            h.BOTTOM_PLANE = 2;
            h.TOP_PLANE = 3;
            h.FAR_PLANE = 4;
            h.NEAR_PLANE = 5;
            h.FRUSTUM_PLANES = 6;
            h.Perspective = 0;
            h.Parallel = 1;
            h.Custom = 2;
            h.Outside = 0;
            h.Inside = 1;
            h.Intersects = 2;
            h.prototype.normalize = function () {
                this._left.normalize();
                this._up.normalize();
                this._direction.normalize();
                this.onFrameChange()
            };
            h.prototype.setFrustumPerspective = function (a, c, b, f) {
                if (a !== void 0 && a !== null)this.fov = a;
                if (c !== void 0 && c !== null)this.aspect = c;
                if (b !== void 0 && b !== null)this.near = b;
                if (f !== void 0 && f !== null)this.far = f;
                if (this.fov !== void 0)a = Math.tan(this.fov * e.DEG_TO_RAD *
                        0.5) * this.near, c = a * this.aspect, this._frustumLeft = -c, this._frustumRight = c, this._frustumBottom = -a, this._frustumTop = a, this._frustumNear = this.near, this._frustumFar = this.far, this.onFrustumChange()
            };
            h.prototype.setFrustum = function (a, c, b, e, f, d) {
                this.near = this._frustumNear = a;
                this.far = this._frustumFar = c;
                this._frustumLeft = b;
                this._frustumRight = e;
                this._frustumTop = f;
                this._frustumBottom = d;
                this.onFrustumChange()
            };
            h.prototype.copy = function (a) {
                this.translation.setv(a.translation);
                this._left.setv(a._left);
                this._up.setv(a._up);
                this._direction.setv(a._direction);
                this.fov = a.fov;
                this.aspect = a.aspect;
                this.near = a.near;
                this.far = a.far;
                this._frustumLeft = a._frustumLeft;
                this._frustumRight = a._frustumRight;
                this._frustumBottom = a._frustumBottom;
                this._frustumTop = a._frustumTop;
                this._frustumNear = a._frustumNear;
                this._frustumFar = a._frustumFar;
                this.projectionMode = a.projectionMode;
                this._depthRangeDirty = !0;
                this.onFrustumChange();
                this.onFrameChange()
            };
            h.prototype.setFrame = function (a, c, b, e) {
                this._left.copy(c);
                this._up.copy(b);
                this._direction.copy(e);
                this.translation.copy(a);
                this.onFrameChange()
            };
            h.prototype.lookAt = function (a, c) {
                this._newDirection.copy(a).sub(this.translation).normalize();
                this._newDirection.equals(this._direction) || (this._direction.copy(this._newDirection), this._up.copy(c).normalize(), this._up.equals(d.ZERO) && this._up.copy(d.UNIT_Y), this._left.copy(this._up).cross(this._direction).normalize(), this._left.equals(d.ZERO) && (this._direction.x !== 0 ? this._left.set(this._direction.y, -this._direction.x, 0) : this._left.set(0, this._direction.z,
                    -this._direction.y)), this._up.copy(this._direction).cross(this._left).normalize(), this.onFrameChange())
            };
            h.prototype.makeDirty = function () {
                this._viewPortDirty = this._depthRangeDirty = !0
            };
            h.prototype.update = function () {
                this._depthRangeDirty = !0;
                this.onFrustumChange();
                this.onFrameChange()
            };
            h.prototype.setViewPort = function () {
                console.warn("Camera.setViewPort() not implemented.")
            };
            h.prototype.contains = function (a) {
                if (!a)return h.Inside;
                for (var c = h.Inside, b = h.FRUSTUM_PLANES - 1; b >= 0; b--)switch (a.whichSide(this._worldPlane[b])) {
                    case k.Inside:
                        return h.Outside;
                    case k.Intersects:
                        c = h.Intersects
                }
                return c
            };
            h.prototype.onFrustumChange = function () {
                if (this.projectionMode === h.Perspective) {
                    var a = this._frustumNear * this._frustumNear, c = this._frustumRight * this._frustumRight, b = this._frustumBottom * this._frustumBottom, e = this._frustumTop * this._frustumTop, f = 1 / Math.sqrt(a + this._frustumLeft * this._frustumLeft);
                    this._coeffLeft[0] = this._frustumNear * f;
                    this._coeffLeft[1] = -this._frustumLeft * f;
                    f = 1 / Math.sqrt(a + c);
                    this._coeffRight[0] = -this._frustumNear * f;
                    this._coeffRight[1] = this._frustumRight *
                        f;
                    f = 1 / Math.sqrt(a + b);
                    this._coeffBottom[0] = this._frustumNear * f;
                    this._coeffBottom[1] = -this._frustumBottom * f;
                    f = 1 / Math.sqrt(a + e);
                    this._coeffTop[0] = -this._frustumNear * f;
                    this._coeffTop[1] = this._frustumTop * f
                } else this.projectionMode === h.Parallel && (this._frustumRight > this._frustumLeft ? (this._coeffLeft[0] = -1, this._coeffLeft[1] = 0, this._coeffRight[0] = 1) : (this._coeffLeft[0] = 1, this._coeffLeft[1] = 0, this._coeffRight[0] = -1), this._coeffRight[1] = 0, this._frustumTop > this._frustumBottom ? (this._coeffBottom[0] = -1, this._coeffBottom[1] =
                    0, this._coeffTop[0] = 1) : (this._coeffBottom[0] = 1, this._coeffBottom[1] = 0, this._coeffTop[0] = -1), this._coeffTop[1] = 0);
                this.changedProperties = this._updateInverseMVPMatrix = this._updateInverseMVMatrix = this._updateMVPMatrix = this._updatePMatrix = !0
            };
            h.prototype.onFrameChange = function () {
                var a = this._direction.dot(this.translation), c = this.planeNormal;
                c.x = this._left.x * this._coeffLeft[0];
                c.y = this._left.y * this._coeffLeft[0];
                c.z = this._left.z * this._coeffLeft[0];
                c.add([this._direction.x * this._coeffLeft[1], this._direction.y *
                this._coeffLeft[1], this._direction.z * this._coeffLeft[1]]);
                this._worldPlane[h.LEFT_PLANE].normal.copy(c);
                this._worldPlane[h.LEFT_PLANE].constant = this.translation.dot(c);
                c.x = this._left.x * this._coeffRight[0];
                c.y = this._left.y * this._coeffRight[0];
                c.z = this._left.z * this._coeffRight[0];
                c.add([this._direction.x * this._coeffRight[1], this._direction.y * this._coeffRight[1], this._direction.z * this._coeffRight[1]]);
                this._worldPlane[h.RIGHT_PLANE].normal.copy(c);
                this._worldPlane[h.RIGHT_PLANE].constant = this.translation.dot(c);
                c.x = this._up.x * this._coeffBottom[0];
                c.y = this._up.y * this._coeffBottom[0];
                c.z = this._up.z * this._coeffBottom[0];
                c.add([this._direction.x * this._coeffBottom[1], this._direction.y * this._coeffBottom[1], this._direction.z * this._coeffBottom[1]]);
                this._worldPlane[h.BOTTOM_PLANE].normal.copy(c);
                this._worldPlane[h.BOTTOM_PLANE].constant = this.translation.dot(c);
                c.x = this._up.x * this._coeffTop[0];
                c.y = this._up.y * this._coeffTop[0];
                c.z = this._up.z * this._coeffTop[0];
                c.add([this._direction.x * this._coeffTop[1], this._direction.y *
                this._coeffTop[1], this._direction.z * this._coeffTop[1]]);
                this._worldPlane[h.TOP_PLANE].normal.copy(c);
                this._worldPlane[h.TOP_PLANE].constant = this.translation.dot(c);
                if (this.projectionMode === h.Parallel)this._frustumRight > this._frustumLeft ? (this._worldPlane[h.LEFT_PLANE].constant = this._worldPlane[h.LEFT_PLANE].contant + this._frustumLeft, this._worldPlane[h.RIGHT_PLANE].constant = this._worldPlane[h.RIGHT_PLANE].contant - this._frustumRight) : (this._worldPlane[h.LEFT_PLANE].constant = this._worldPlane[h.LEFT_PLANE].contant -
                    this._frustumLeft, this._worldPlane[h.RIGHT_PLANE].constant = this._worldPlane[h.RIGHT_PLANE].contant + this._frustumRight), this._frustumBottom > this._frustumTop ? (this._worldPlane[h.TOP_PLANE].constant = this._worldPlane[h.TOP_PLANE].contant + this._frustumTop, this._worldPlane[h.BOTTOM_PLANE].constant = this._worldPlane[h.BOTTOM_PLANE].contant - this._frustumBottom) : (this._worldPlane[h.TOP_PLANE].constant = this._worldPlane[h.TOP_PLANE].contant - this._frustumTop, this._worldPlane[h.BOTTOM_PLANE].constant = this._worldPlane[h.BOTTOM_PLANE].contant +
                    this._frustumBottom);
                c.copy(this._direction).invert();
                this._worldPlane[h.FAR_PLANE].normal.copy(c);
                this._worldPlane[h.FAR_PLANE].constant = -(a + this._frustumFar);
                this._worldPlane[h.NEAR_PLANE].normal.copy(this._direction);
                this._worldPlane[h.NEAR_PLANE].constant = a + this._frustumNear;
                this._updateInverseMVPMatrix = this._updateInverseMVMatrix = this._updateMVPMatrix = this._updateMVMatrix = !0
            };
            h.prototype.updateProjectionMatrix = function () {
                if (this.projectionMode === h.Parallel) {
                    this.projection.setIdentity();
                    var a =
                        this.projection.data;
                    a[0] = 2 / (this._frustumRight - this._frustumLeft);
                    a[5] = 2 / (this._frustumTop - this._frustumBottom);
                    a[10] = -2 / (this._frustumFar - this._frustumNear);
                    a[12] = -(this._frustumRight + this._frustumLeft) / (this._frustumRight - this._frustumLeft);
                    a[13] = -(this._frustumTop + this._frustumBottom) / (this._frustumTop - this._frustumBottom);
                    a[14] = -(this._frustumFar + this._frustumNear) / (this._frustumFar - this._frustumNear)
                } else if (this.projectionMode === h.Perspective)this.projection.setIdentity(), a = this.projection.data,
                    a[0] = 2 * this._frustumNear / (this._frustumRight - this._frustumLeft), a[5] = 2 * this._frustumNear / (this._frustumTop - this._frustumBottom), a[8] = (this._frustumRight + this._frustumLeft) / (this._frustumRight - this._frustumLeft), a[9] = (this._frustumTop + this._frustumBottom) / (this._frustumTop - this._frustumBottom), a[10] = -(this._frustumFar + this._frustumNear) / (this._frustumFar - this._frustumNear), a[11] = -1, a[14] = -(2 * this._frustumFar * this._frustumNear) / (this._frustumFar - this._frustumNear), a[15] = 0
            };
            h.prototype.updateModelViewMatrix =
                function () {
                    this.modelView.setIdentity();
                    var a = this.modelView.data;
                    a[0] = -this._left.x;
                    a[4] = -this._left.y;
                    a[8] = -this._left.z;
                    a[1] = this._up.x;
                    a[5] = this._up.y;
                    a[9] = this._up.z;
                    a[2] = -this._direction.x;
                    a[6] = -this._direction.y;
                    a[10] = -this._direction.z;
                    a[12] = this._left.dot(this.translation);
                    a[13] = -this._up.dot(this.translation);
                    a[14] = this._direction.dot(this.translation)
                };
            h.prototype.getPickRay = function (a, b, e, f, g) {
                g || (g = new c);
                var i = new d, j = new d;
                this.getWorldCoordinates(a, f - b, e, f, 0, i);
                this.getWorldCoordinates(a,
                    f - b, e, f, 0.3, j).sub(i).normalize();
                g.origin.copy(i);
                g.direction.copy(j);
                return g
            };
            h.prototype.getWorldCoordinates = function (a, c, e, f, g, i) {
                i || (i = new d);
                this.checkInverseModelViewProjection();
                var j = new b;
                j.set((a / e - this._viewPortLeft) / (this._viewPortRight - this._viewPortLeft) * 2 - 1, (c / f - this._viewPortBottom) / (this._viewPortTop - this._viewPortBottom) * 2 - 1, g * 2 - 1, 1);
                this.modelViewProjectionInverse.applyPost(j);
                j.mul(1 / j.w);
                i.x = j.x;
                i.y = j.y;
                i.z = j.z;
                return i
            };
            h.prototype.getScreenCoordinates = function (a, c, b, e) {
                e =
                    this.getNormalizedDeviceCoordinates(a, e);
                e.x = (e.x + 1) * (this._viewPortRight - this._viewPortLeft) / 2 * c;
                e.y = (e.y + 1) * (this._viewPortTop - this._viewPortBottom) / 2 * b;
                e.z = (e.z + 1) / 2;
                return e
            };
            h.prototype.getFrustumCoordinates = function (a, c) {
                c = this.getNormalizedDeviceCoordinates(a, c);
                c.x = (c.x + 1) * (this._frustumRight - this._frustumLeft) / 2 + this._frustumLeft;
                c.y = (c.y + 1) * (this._frustumTop - this._frustumBottom) / 2 + this._frustumBottom;
                c.z = (c.z + 1) * (this._frustumFar - this._frustumNear) / 2 + this._frustumNear;
                return c
            };
            h.prototype.getNormalizedDeviceCoordinates =
                function (a, c) {
                    c || (c = new d);
                    this.checkModelViewProjection();
                    var e = new b;
                    e.set(a.x, a.y, a.z, 1);
                    this.modelViewProjection.applyPost(e);
                    e.mul(1 / e.w);
                    c.x = e.x;
                    c.y = e.y;
                    c.z = e.z;
                    return c
                };
            h.prototype.checkModelView = function () {
                if (this._updateMVMatrix)this.updateModelViewMatrix(), this._updateMVMatrix = !1
            };
            h.prototype.checkProjection = function () {
                if (this._updatePMatrix)this.updateProjectionMatrix(), this._updatePMatrix = !1
            };
            h.prototype.checkModelViewProjection = function () {
                if (this._updateMVPMatrix)this.checkModelView(),
                    this.checkProjection(), this.modelViewProjection.copy(this.getProjectionMatrix()).combine(this.getViewMatrix()), this._updateMVPMatrix = !1
            };
            h.prototype.checkInverseModelView = function () {
                if (this._updateInverseMVMatrix)this.checkModelView(), a.invert(this.modelView, this.modelViewInverse), this._updateInverseMVMatrix = !1
            };
            h.prototype.checkInverseModelViewProjection = function () {
                if (this._updateInverseMVPMatrix)this.checkModelViewProjection(), a.invert(this.modelViewProjection, this.modelViewProjectionInverse), this._updateInverseMVPMatrix = !1
            };
            h.prototype.getViewMatrix = function () {
                this.checkModelView();
                return this.modelView
            };
            h.prototype.getProjectionMatrix = function () {
                this.checkProjection();
                return this.projection
            };
            h.prototype.getViewProjectionMatrix = function () {
                this.checkModelViewProjection();
                return this.modelViewProjection
            };
            h.prototype.getViewInverseMatrix = function () {
                this.checkInverseModelView();
                return this.modelViewInverse
            };
            h.prototype.getViewProjectionInverseMatrix = function () {
                this.checkInverseModelViewProjection();
                return this.modelViewProjectionInverse
            };
            h.prototype.pack = function (a) {
                for (var c = a.center, e = this._corners, f = this._extents, d = 0; d < e.length; d++)e[d].set(c);
                a instanceof i ? f.setd(a.xExtent, a.yExtent, a.zExtent) : a instanceof j && f.setd(a.radius, a.radius, a.radius);
                e[0].add_d(f.x, f.y, f.z);
                e[1].add_d(f.x, -f.y, f.z);
                e[2].add_d(f.x, f.y, -f.z);
                e[3].add_d(f.x, -f.y, -f.z);
                e[4].add_d(-f.x, f.y, f.z);
                e[5].add_d(-f.x, -f.y, f.z);
                e[6].add_d(-f.x, f.y, -f.z);
                e[7].add_d(-f.x, -f.y, -f.z);
                for (var f = this.getViewMatrix(), a = Number.MAX_VALUE, c = -Number.MAX_VALUE, g = new b, d = 0; d <
                e.length; d++)g.setd(e[d].x, e[d].y, e[d].z, 1), f.applyPre(g), a = Math.min(-g.z, a), c = Math.max(-g.z, c);
                a = Math.min(Math.max(this._frustumNear, a), this._frustumFar);
                c = Math.max(a, Math.min(this._frustumFar, c));
                e = a / this._frustumNear;
                this._frustumLeft *= e;
                this._frustumRight *= e;
                this._frustumTop *= e;
                this._frustumBottom *= e;
                this._frustumNear = a;
                this._frustumFar = c
            };
            h.prototype.calculateFrustumCorners = function (a, c) {
                var a = a !== void 0 ? a : this._frustumNear, c = c !== void 0 ? c : this._frustumFar, b = (this._frustumTop - this._frustumBottom) *
                    a * 0.5 / this._frustumNear, e = (this._frustumRight - this._frustumLeft) * a * 0.5 / this._frustumNear, f = (this._frustumTop - this._frustumBottom) * c * 0.5 / this._frustumNear, d = (this._frustumRight - this._frustumLeft) * c * 0.5 / this._frustumNear;
                this.projectionMode === h.Parallel && (b = (this._frustumTop - this._frustumBottom) * 0.5, e = (this._frustumRight - this._frustumLeft) * 0.5, f = (this._frustumTop - this._frustumBottom) * 0.5, d = (this._frustumRight - this._frustumLeft) * 0.5);
                var g = this.vNearPlaneCenter, i = this.vFarPlaneCenter, j = this.direction,
                    k = this.left, l = this.up;
                j.setv(this._direction).mul(a);
                g.setv(this.translation).addv(j);
                j.setv(this._direction).mul(c);
                i.setv(this.translation).addv(j);
                k.setv(this._left).mul(e);
                l.setv(this._up).mul(b);
                this._corners[0].setv(g).subv(k).subv(l);
                this._corners[1].setv(g).addv(k).subv(l);
                this._corners[2].setv(g).addv(k).addv(l);
                this._corners[3].setv(g).subv(k).addv(l);
                k.setv(this._left).mul(d);
                l.setv(this._up).mul(f);
                this._corners[4].setv(i).subv(k).subv(l);
                this._corners[5].setv(i).addv(k).subv(l);
                this._corners[6].setv(i).addv(k).addv(l);
                this._corners[7].setv(i).subv(k).addv(l);
                return this._corners
            };
            var l = function (a) {
                if (a > 0)return 1; else if (a < 0)return -1;
                return 0
            };
            h.prototype.setToObliqueMatrix = function (a, c) {
                var c = c || 0, e = this._clipPlane.setv(a);
                this.getViewMatrix().applyPost(e);
                e.w = this.translation.y * a.y + c;
                this._updatePMatrix = !0;
                var f = this.getProjectionMatrix();
                this._qCalc.setd((l(e.x) + f[8]) / f[0], (l(e.y) + f[9]) / f[5], -1, (1 + f[10]) / f[14]);
                e.mul(2 / b.dot(e, this._qCalc));
                f[2] = e.x;
                f[6] = e.y;
                f[10] = e.z + 1;
                f[14] = e.w;
                this._updateInverseMVPMatrix =
                    this._updateMVPMatrix = !0
            };
            return h
        });
    o("goo/renderer/SimplePartitioner", ["goo/renderer/Camera"], function (g) {
        function d() {
        }

        d.prototype.added = function () {
        };
        d.prototype.removed = function () {
        };
        d.prototype.process = function (b, a, f) {
            for (var e = 0, c = 0; c < a.length; c++) {
                var d = a[c];
                if (!d.skip)d.meshRendererComponent.cullMode === "Never" ? (f[e++] = d, d.isVisible = !0) : b.contains(d.meshRendererComponent.worldBound) !== g.Outside ? (f[e++] = d, d.isVisible = !0) : d.isVisible = !1
            }
            f.length = e
        };
        return d
    });
    o("goo/renderer/shaders/ShaderFragment",
        [], function () {
            function g() {
            }

            g.noisecommon = "vec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\nvec4 permute(vec4 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}";
            g.noise2d = [g.noisecommon, "float snoise(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n\t\t+ i.x + vec3(0.0, i1.x, 1.0 ));\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}"].join("\n");
            g.noise3d = [g.noisecommon, "vec4 taylorInvSqrt(vec4 r) {\n\treturn 1.79284291400159 - 0.85373472095314 * r;\n}\nfloat snoise(vec3 v) {\n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\tvec3 i  = floor(v + dot(v, C.yyy) );\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\n\tvec3 g = step(x0.yzx, x0.xyz);\n\tvec3 l = 1.0 - g;\n\tvec3 i1 = min( g.xyz, l.zxy );\n\tvec3 i2 = max( g.xyz, l.zxy );\n\tvec3 x1 = x0 - i1 + C.xxx;\n\tvec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n\tvec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\ti = mod289(i); \n\tvec4 p = permute( permute( permute( \n         i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n       + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n       + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\tfloat n_ = 0.142857142857; // 1.0/7.0\n\tvec3  ns = n_ * D.wyz - D.xzx;\n\tvec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\tvec4 x_ = floor(j * ns.z);\n\tvec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\tvec4 x = x_ *ns.x + ns.yyyy;\n\tvec4 y = y_ *ns.x + ns.yyyy;\n\tvec4 h = 1.0 - abs(x) - abs(y);\n\tvec4 b0 = vec4( x.xy, y.xy );\n\tvec4 b1 = vec4( x.zw, y.zw );\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\n\tvec4 sh = -step(h, vec4(0.0));\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\tvec3 p0 = vec3(a0.xy,h.x);\n\tvec3 p1 = vec3(a0.zw,h.y);\n\tvec3 p2 = vec3(a1.xy,h.z);\n\tvec3 p3 = vec3(a1.zw,h.w);\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n\tp0 *= norm.x;\n\tp1 *= norm.y;\n\tp2 *= norm.z;\n\tp3 *= norm.w;\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n\tm = m * m;\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\n}"].join("\n");
            g.methods = {
                packDepth: "vec4 packDepth( const in float depth ) {\n\tconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n\tconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n\tvec4 res = fract( depth * bit_shift );\n\tres -= res.xxyz * bit_mask;\n\treturn res;\n}",
                unpackDepth: "float unpackDepth( const in vec4 rgba_depth ) {\n\tconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n\tfloat depth = dot( rgba_depth, bit_shift );\n\treturn depth;\n}",
                packDepth16: "vec2 packDepth16( const in float depth ) {\n\tconst vec2 bias = vec2(1.0 / 255.0, 0.0);\n\tvec2 res = vec2(depth, fract(depth * 255.0));\n\treturn res - (res.yy * bias);\n}",
                unpackDepth16: "float unpackDepth16( const in vec2 rg_depth ) {\n\treturn rg_depth.x + (rg_depth.y / 255.0);\n}"
            };
            return g
        });
    o("goo/renderer/light/Light", ["goo/math/Vector3"], function (g) {
        return function () {
            this.translation = new g;
            this.color = new g(1, 1, 1);
            this.specularIntensity = this.intensity = 1;
            this.shadowCaster = !1;
            this.shadowSettings =
            {type: "Blur", projection: "Perspective", fov: 55, size: 100, near: 1, far: 1E3};
            this.changedColor = this.changedProperties = !1
        }
    });
    o("goo/renderer/light/PointLight", ["goo/math/Vector3", "goo/renderer/light/Light"], function (g, d) {
        function b() {
            d.call(this);
            this.range = 1E3
        }

        b.prototype = Object.create(d.prototype);
        b.prototype.update = function (a) {
            a.matrix.getTranslation(this.translation)
        };
        return b
    });
    o("goo/renderer/light/DirectionalLight", ["goo/math/Vector3", "goo/renderer/light/Light"], function (g, d) {
        function b() {
            d.call(this);
            this.direction = new g
        }

        b.prototype = Object.create(d.prototype);
        b.prototype.update = function (a) {
            a.matrix.getTranslation(this.translation);
            this.direction.setd(0, 0, -1);
            a.matrix.applyPostVector(this.direction)
        };
        return b
    });
    o("goo/renderer/light/SpotLight", ["goo/math/Vector3", "goo/renderer/light/Light"], function (g, d) {
        function b() {
            d.call(this);
            this.direction = new g;
            this.range = 1E3;
            this.angle = 45;
            this.exponent = 16
        }

        b.prototype = Object.create(d.prototype);
        b.prototype.update = function (a) {
            a.matrix.getTranslation(this.translation);
            this.direction.setd(0, 0, -1);
            a.matrix.applyPostVector(this.direction)
        };
        return b
    });
    o("goo/util/TangentGenerator", ["goo/math/Vector2", "goo/math/Vector3", "goo/renderer/MeshData"], function (g, d, b) {
        function a() {
        }

        a.addTangentBuffer = function (a, e) {
            function c(a) {
                for (var c = [], b = 0; b < a.length; b += 3)c.push(new d(a[b + 0], a[b + 1], a[b + 2]));
                return c
            }

            var e = e || 0, i = a.getAttributeBuffer(b.POSITION);
            if (!i)throw Error("Vertex buffer is null!");
            var j = a.getAttributeBuffer(b.NORMAL);
            if (!j)throw Error("Normal buffer is null!");
            var k = a.getAttributeBuffer("TEXCOORD" + e);
            !k && e !== 0 && (k = a.getAttributeBuffer(b.TEXCOORD0));
            if (!k)throw Error("Texture buffer is null!");
            var h = a.getIndexBuffer();
            if (!h)throw Error("Index buffer is null!");
            for (var l = a.vertexCount, n = a.indexCount / 3, q = [], r = [], m = 0; m < l; m++)q[m] = new d, r[m] = new d;
            i = c(i);
            j = c(j);
            m = function (a) {
                for (var c = [], b = 0; b < a.length; b += 2)c.push(new g(a[b + 0], a[b + 1]));
                return c
            }(k);
            for (k = 0; k < n; k++) {
                var s = h[k * 3], x = h[k * 3 + 1], p = h[k * 3 + 2], w = i[s], y = i[x], t = i[p], u = m[s], A = m[x], v = m[p], o = y.x - w.x, z = t.x -
                    w.x, F = y.y - w.y, E = t.y - w.y, y = y.z - w.z, w = t.z - w.z, t = A.x - u.x, D = v.x - u.x, A = A.y - u.y, v = v.y - u.y, u = 1 / (t * v - D * A);
                isFinite(u) !== !1 && (v = new d((v * o - A * z) * u, (v * F - A * E) * u, (v * y - A * w) * u), o = new d((t * z - D * o) * u, (t * E - D * F) * u, (t * w - D * y) * u), q[s].add(v), q[x].add(v), q[p].add(v), r[s].add(o), r[x].add(o), r[p].add(o))
            }
            a.attributeMap[b.TANGENT] = b.createAttribute(4, "Float");
            a.rebuildData(a.vertexCount, a.indexCount, !0);
            h = a.getAttributeBuffer(b.TANGENT);
            n = new d;
            i = new d;
            for (k = 0; k < l; k++)m = j[k], s = q[k], x = m.dot(s), n.copy(s).sub(i.copy(m).mul(x)).normalize(),
                h[k * 4 + 0] = n.x, h[k * 4 + 1] = n.y, h[k * 4 + 2] = n.z, x = n.copy(m).cross(s).dot(r[k]), h[k * 4 + 3] = x < 0 ? -1 : 1;
            return h
        };
        return a
    });
    o("goo/renderer/shaders/ShaderBuilder", "goo/renderer/shaders/ShaderFragment,goo/renderer/MeshData,goo/renderer/light/PointLight,goo/renderer/light/DirectionalLight,goo/renderer/light/SpotLight,goo/math/MathUtils,goo/util/TangentGenerator".split(","), function (g, d, b, a, f, e, c) {
        function i() {
        }

        g = new a;
        g.translation.setd(10, 10, 10);
        g.direction.setd(1, 1, 1).normalize();
        i.defaultLight = g;
        i.uber = {
            processor: function (a,
                                 b) {
                var e = b.meshData.attributeMap, f = b.material._textureMaps;
                a.defines = a.defines || {};
                for (var g in e)a.defines[g] || (a.defines[g] = !0);
                for (var i in f)if (f[i] !== void 0 && i !== "SHADOW_MAP" && (a.defines[i] || (a.defines[i] = !0), i === "DIFFUSE_MAP")) {
                    var r = f[i].repeat;
                    a.uniforms.diffuseRepeat = a.uniforms.diffuseRepeat || [1, 1];
                    a.uniforms.diffuseRepeat[0] = r.x;
                    a.uniforms.diffuseRepeat[1] = r.y
                }
                for (g in a.defines)g === "MAX_POINT_LIGHTS" || g === "MAX_DIRECTIONAL_LIGHTS" || g === "MAX_SPOT_LIGHTS" || g === "SHADOW_TYPE" || g === "JOINT_COUNT" ||
                g === "WEIGHTS" || g === "PHYSICALLY_BASED_SHADING" || !e[g] && !f[g] && delete a.defines[g];
                a.defines.NORMAL && a.defines.NORMAL_MAP && !b.meshData.getAttributeBuffer(d.TANGENT) && c.addTangentBuffer(b.meshData)
            }
        };
        i.light = {
            processor: function (c, d) {
                c.uniforms.materialAmbient = c.uniforms.materialAmbient || "AMBIENT";
                c.uniforms.materialEmissive = c.uniforms.materialEmissive || "EMISSIVE";
                c.uniforms.materialDiffuse = c.uniforms.materialDiffuse || "DIFFUSE";
                c.uniforms.materialSpecular = c.uniforms.materialSpecular || "SPECULAR";
                c.uniforms.materialSpecularPower =
                    c.uniforms.materialSpecularPower || "SPECULAR_POWER";
                var g = 0;
                c.uniforms.pointLightColor = c.uniforms.pointLightColor || [];
                c.uniforms.pointLight = c.uniforms.pointLight || [];
                var i = 0;
                c.uniforms.directionalLightColor = c.uniforms.directionalLightColor || [];
                c.uniforms.directionalLightDirection = c.uniforms.directionalLightDirection || [];
                var n = 0;
                c.uniforms.spotLightColor = c.uniforms.spotLightColor || [];
                c.uniforms.spotLight = c.uniforms.spotLight || [];
                c.uniforms.spotLightDirection = c.uniforms.spotLightDirection || [];
                c.uniforms.spotLightAngle =
                    c.uniforms.spotLightAngle || [];
                c.uniforms.spotLightExponent = c.uniforms.spotLightExponent || [];
                for (var q = d.lights, r = 0; r < q.length; r++) {
                    var m = q[r];
                    if (m instanceof b)c.uniforms.pointLight[g * 4 + 0] = m.translation.data[0], c.uniforms.pointLight[g * 4 + 1] = m.translation.data[1], c.uniforms.pointLight[g * 4 + 2] = m.translation.data[2], c.uniforms.pointLight[g * 4 + 3] = m.range, c.uniforms.pointLightColor[g * 4 + 0] = m.color.data[0] * m.intensity, c.uniforms.pointLightColor[g * 4 + 1] = m.color.data[1] * m.intensity, c.uniforms.pointLightColor[g *
                    4 + 2] = m.color.data[2] * m.intensity, c.uniforms.pointLightColor[g * 4 + 3] = m.specularIntensity, g++; else if (m instanceof a)c.uniforms.directionalLightDirection[i * 3 + 0] = m.direction.data[0], c.uniforms.directionalLightDirection[i * 3 + 1] = m.direction.data[1], c.uniforms.directionalLightDirection[i * 3 + 2] = m.direction.data[2], c.uniforms.directionalLightColor[i * 4 + 0] = m.color.data[0] * m.intensity, c.uniforms.directionalLightColor[i * 4 + 1] = m.color.data[1] * m.intensity, c.uniforms.directionalLightColor[i * 4 + 2] = m.color.data[2] * m.intensity,
                        c.uniforms.directionalLightColor[i * 4 + 3] = m.specularIntensity, i++; else if (m instanceof f)c.uniforms.spotLight[n * 4 + 0] = m.translation.data[0], c.uniforms.spotLight[n * 4 + 1] = m.translation.data[1], c.uniforms.spotLight[n * 4 + 2] = m.translation.data[2], c.uniforms.spotLight[n * 4 + 3] = m.range, c.uniforms.spotLightColor[n * 4 + 0] = m.color.data[0] * m.intensity, c.uniforms.spotLightColor[n * 4 + 1] = m.color.data[1] * m.intensity, c.uniforms.spotLightColor[n * 4 + 2] = m.color.data[2] * m.intensity, c.uniforms.spotLightColor[n * 4 + 3] = m.specularIntensity,
                        c.uniforms.spotLightDirection[n * 3 + 0] = m.direction.data[0], c.uniforms.spotLightDirection[n * 3 + 1] = m.direction.data[1], c.uniforms.spotLightDirection[n * 3 + 2] = m.direction.data[2], c.uniforms.spotLightAngle[n] = Math.cos(m.angle * e.DEG_TO_RAD), c.uniforms.spotLightExponent[n] = m.exponent, n++
                }
                if (c.pointCount !== g)c.defines = c.defines || {}, c.defines.MAX_POINT_LIGHTS = g, c.uniforms.pointLight.length = g * 4, c.uniforms.pointLightColor.length = g * 4, c.pointCount = g;
                if (c.directionalCount !== i)c.defines = c.defines || {}, c.defines.MAX_DIRECTIONAL_LIGHTS =
                    i, c.uniforms.directionalLightDirection.length = i * 3, c.uniforms.directionalLightColor.length = i * 4, c.directionalCount = i;
                if (c.spotCount !== n)c.defines = c.defines || {}, c.defines.MAX_SPOT_LIGHTS = n, c.uniforms.spotLight.length = n * 4, c.uniforms.spotLightColor.length = n * 4, c.uniforms.spotLightDirection.length = n * 3, c.uniforms.spotLightAngle.length = n * 1, c.uniforms.spotLightExponent.length = n * 1, c.spotCount = n;
                g = d.material._textureMaps;
                c.defines = c.defines || {};
                if (g.SHADOW_MAP && d.lights.length > 0)c.defines.SHADOW_TYPE = d.lights[0].shadowSettings.type ===
                "Blur" ? 1 : 0;
                g.SHADOW_MAP !== void 0 && !c.defines.SHADOW_MAP ? (c.defines.SHADOW_MAP = !0, c.uniforms.lightViewProjectionMatrix = "LIGHT_VIEW_PROJECTION_MATRIX", c.uniforms.lightPos = "LIGHT0", c.uniforms.cameraScale = "LIGHT_DEPTH_SCALE", c.uniforms.shadowMap = "SHADOW_MAP") : g.SHADOW_MAP === void 0 && c.defines.SHADOW_MAP && delete c.defines.SHADOW_MAP
            },
            prevertex: "#ifdef SHADOW_MAP\nuniform mat4 lightViewProjectionMatrix;\nvarying vec4 lPosition;\nconst mat4 ScaleMatrix = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);\n#endif",
            vertex: "#ifdef SHADOW_MAP\nlPosition = ScaleMatrix * lightViewProjectionMatrix * worldPos;\n#endif",
            prefragment: "uniform vec4 materialAmbient;\nuniform vec4 materialEmissive;\nuniform vec4 materialDiffuse;\nuniform vec4 materialSpecular;\nuniform float materialSpecularPower;\n#ifndef MAX_DIRECTIONAL_LIGHTS\n#define MAX_DIRECTIONAL_LIGHTS 0\n#endif\n#ifndef MAX_POINT_LIGHTS\n#define MAX_POINT_LIGHTS 0\n#endif\n#ifndef MAX_SPOT_LIGHTS\n#define MAX_SPOT_LIGHTS 0\n#endif\n#if MAX_DIRECTIONAL_LIGHTS > 0\nuniform vec4 directionalLightColor[MAX_DIRECTIONAL_LIGHTS];\nuniform vec3 directionalLightDirection[MAX_DIRECTIONAL_LIGHTS];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec4 pointLight[MAX_POINT_LIGHTS];\nuniform vec4 pointLightColor[MAX_POINT_LIGHTS];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec4 spotLightColor[MAX_SPOT_LIGHTS];\nuniform vec4 spotLight[MAX_SPOT_LIGHTS];\nuniform vec3 spotLightDirection[MAX_SPOT_LIGHTS];\nuniform float spotLightAngle[MAX_SPOT_LIGHTS];\nuniform float spotLightExponent[MAX_SPOT_LIGHTS];\n#endif\n#ifdef SHADOW_MAP\n#ifndef SHADOW_TYPE\n#define SHADOW_TYPE 0\n#endif\nuniform vec3 lightPos;\nuniform float cameraScale;\nvarying vec4 lPosition;\nuniform sampler2D shadowMap;\nfloat ChebychevInequality(in vec2 moments, in float t) {\nif ( t <= moments.x ) return 1.0;\nfloat variance = moments.y - (moments.x * moments.x);\nvariance = max(variance, 0.02);\nfloat d = t - moments.x;\nreturn variance / (variance + d * d);\n}\nfloat VsmFixLightBleed(in float pMax, in float amount) {\nreturn clamp((pMax - amount) / (1.0 - amount), 0.0, 1.0);\n}\n#endif",
            fragment: "#ifdef SPECULAR_MAP\nfloat specularStrength = texture2D(specularMap, texCoord0).x;\n#else\nfloat specularStrength = 1.0;\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3(0.0);\nvec3 pointSpecular = vec3(0.0);\nfor (int i = 0; i < MAX_POINT_LIGHTS; i++) {\nvec3 lVector = normalize(pointLight[i].xyz - vWorldPos.xyz);\nfloat lDistance = 1.0 - min((length(pointLight[i].xyz - vWorldPos.xyz) / pointLight[i].w), 1.0);\nfloat dotProduct = dot(N, lVector);\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max(dotProduct, 0.0);\nfloat pointDiffuseWeightHalf = max(0.5 * dotProduct + 0.5, 0.0);\nvec3 pointDiffuseWeight = mix(vec3(pointDiffuseWeightFull), vec3(pointDiffuseWeightHalf), wrapRGB);\n#else\nfloat pointDiffuseWeight = max(dotProduct, 0.0);\n#endif\npointDiffuse += materialDiffuse.rgb * pointLightColor[i].rgb * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize(lVector + normalize(viewPosition));\nfloat pointDotNormalHalf = max(dot(N, pointHalfVector), 0.0);\nfloat pointSpecularWeight = pointLightColor[i].a * specularStrength * max(pow(pointDotNormalHalf, materialSpecularPower), 0.0);\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = (materialSpecularPower + 2.0001 ) / 8.0;\nvec3 schlick = materialSpecular.rgb + vec3(1.0 - materialSpecular.rgb) * pow(1.0 - dot(lVector, pointHalfVector), 5.0);\npointSpecular += schlick * pointLightColor[i].rgb * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += materialSpecular.rgb * pointLightColor[i].rgb * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3(0.0);\nvec3 spotSpecular = vec3(0.0);\nfor (int i = 0; i < MAX_SPOT_LIGHTS; i++) {\nvec3 lVector = normalize(spotLight[i].xyz - vWorldPos.xyz);\nfloat lDistance = 1.0 - min((length(spotLight[i].xyz - vWorldPos.xyz) / spotLight[i].w), 1.0);\nfloat spotEffect = dot(normalize(-spotLightDirection[i]), lVector);\nif (spotEffect > spotLightAngle[i]) {\nspotEffect = max(pow(spotEffect, spotLightExponent[i]), 0.0);\nfloat dotProduct = dot(N, lVector);\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max(dotProduct, 0.0);\nfloat spotDiffuseWeightHalf = max(0.5 * dotProduct + 0.5, 0.0);\nvec3 spotDiffuseWeight = mix(vec3(spotDiffuseWeightFull), vec3(spotDiffuseWeightHalf), wrapRGB);\n#else\nfloat spotDiffuseWeight = max(dotProduct, 0.0);\n#endif\nspotDiffuse += materialDiffuse.rgb * spotLightColor[i].rgb * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize(lVector + normalize(viewPosition));\nfloat spotDotNormalHalf = max(dot(N, spotHalfVector), 0.0);\nfloat spotSpecularWeight = spotLightColor[i].a * specularStrength * max(pow(spotDotNormalHalf, materialSpecularPower), 0.0);\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = (materialSpecularPower + 2.0001) / 8.0;\nvec3 schlick = materialSpecular.rgb + vec3(1.0 - materialSpecular.rgb) * pow(1.0 - dot(lVector, spotHalfVector), 5.0);\nspotSpecular += schlick * spotLightColor[i].rgb * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += materialSpecular.rgb * spotLightColor[i].rgb * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIRECTIONAL_LIGHTS > 0\nvec3 dirDiffuse  = vec3(0.0);\nvec3 dirSpecular = vec3(0.0);\nfor(int i = 0; i < MAX_DIRECTIONAL_LIGHTS; i++) {\nvec4 lDirection = vec4(-directionalLightDirection[i], 0.0);\nvec3 dirVector = normalize(lDirection.xyz);\nfloat dotProduct = dot(N, dirVector);\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max(dotProduct, 0.0);\nfloat dirDiffuseWeightHalf = max(0.5 * dotProduct + 0.5, 0.0);\nvec3 dirDiffuseWeight = mix(vec3(dirDiffuseWeightFull), vec3(dirDiffuseWeightHalf), wrapRGB);\n#else\nfloat dirDiffuseWeight = max(dotProduct, 0.0);\n#endif\ndirDiffuse += materialDiffuse.rgb * directionalLightColor[i].rgb * dirDiffuseWeight;\nvec3 dirHalfVector = normalize(dirVector + normalize(viewPosition));\nfloat dirDotNormalHalf = max(dot(N, dirHalfVector), 0.0);\nfloat dirSpecularWeight = directionalLightColor[i].a * specularStrength * max(pow(dirDotNormalHalf, materialSpecularPower), 0.0);\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = (materialSpecularPower + 2.0001) / 8.0;\nvec3 schlick = materialSpecular.rgb + vec3(1.0 - materialSpecular.rgb) * pow(1.0 - dot(dirVector, dirHalfVector), 5.0);\ndirSpecular += schlick * directionalLightColor[i].rgb * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += materialSpecular.rgb * directionalLightColor[i].rgb * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3(0.0);\nvec3 totalSpecular = vec3(0.0);\n#if MAX_DIRECTIONAL_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\nfloat shadow = 1.0;\n#ifdef SHADOW_MAP\nvec3 depth = lPosition.xyz / lPosition.w;\ndepth.z = length(vWorldPos.xyz - lightPos) * cameraScale;\nif (depth.x >= 0.0 && depth.x <= 1.0 && depth.y >= 0.0 && depth.y <= 1.0 && depth.z >= 0.0 && depth.z <= 1.0) {\n#if SHADOW_TYPE == 0\ndepth.z *= 0.96;\nfloat shadowDepth = texture2D(shadowMap, depth.xy).x;\nif ( depth.z > shadowDepth ) shadow = 0.5;\n#elif SHADOW_TYPE == 1\nvec4 texel = texture2D(shadowMap, depth.xy);\nvec2 moments = vec2(texel.x, texel.y);\nshadow = ChebychevInequality(moments, depth.z);\n#endif\nshadow = clamp(shadow, 0.0, 1.0);\n}\n#endif\nvec3 ambientLightColor = vec3(1.0, 1.0, 1.0);\n#ifdef METAL\nfinal_color.xyz = final_color.xyz * (materialEmissive.rgb + totalDiffuse * shadow + ambientLightColor * materialAmbient.rgb + totalSpecular * shadow);\n#else\nfinal_color.xyz = final_color.xyz * (materialEmissive.rgb + totalDiffuse * shadow + ambientLightColor * materialAmbient.rgb) + totalSpecular * shadow;\n#endif"
        };
        i.animation = {
            processor: function (a, c) {
                var b = c.currentPose;
                a.defines = a.defines || {};
                if (b) {
                    if (!a.uniforms.jointPalette)a.uniforms.jointPalette = i.animation.jointPalette;
                    a.defines.JOINT_COUNT = Math.max(c.meshData.paletteMap.length * 3, 80)
                } else delete a.defines.JOINT_COUNT
            },
            jointPalette: function (a) {
                var c = a.meshData;
                if (a = a.currentPose) {
                    var a = a._matrixPalette, b = c.store;
                    if (!b)b = new Float32Array(c.paletteMap.length * 12), c.store = b;
                    for (var e, f = 0; f < c.paletteMap.length; f++) {
                        e = a[c.paletteMap[f]];
                        for (var d = 0; d < 12; d++)b[f *
                        12 + d] = e.data[i.animation.order[d]]
                    }
                    return b
                }
            },
            order: [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14],
            prevertex: "#ifdef JOINTIDS\nattribute vec4 vertexJointIDs;\n#endif\n#ifdef WEIGHTS\nattribute vec4 vertexWeights;\n#endif\n#ifdef JOINT_COUNT\nuniform vec4 jointPalette[JOINT_COUNT];\n#endif",
            vertex: "#ifdef defined(JOINT_COUNT) && defined(WEIGHTS) && defined(JOINTIDS)\nint x = 3*int(vertexJointIDs.x);\nint y = 3*int(vertexJointIDs.y);\nint z = 3*int(vertexJointIDs.z);\nint w = 3*int(vertexJointIDs.w);\nmat4 mat = mat4(0.0);\nmat += mat4(\n\tjointPalette[x+0].x, jointPalette[x+1].x, jointPalette[x+2].x, 0,\n\tjointPalette[x+0].y, jointPalette[x+1].y, jointPalette[x+2].y, 0,\n\tjointPalette[x+0].z, jointPalette[x+1].z, jointPalette[x+2].z, 0,\n\tjointPalette[x+0].w, jointPalette[x+1].w, jointPalette[x+2].w, 1\n) * vertexWeights.x;\nmat += mat4(\n\tjointPalette[y+0].x, jointPalette[y+1].x, jointPalette[y+2].x, 0,\n\tjointPalette[y+0].y, jointPalette[y+1].y, jointPalette[y+2].y, 0,\n\tjointPalette[y+0].z, jointPalette[y+1].z, jointPalette[y+2].z, 0,\n\tjointPalette[y+0].w, jointPalette[y+1].w, jointPalette[y+2].w, 1\n) * vertexWeights.y;\nmat += mat4(\n\tjointPalette[z+0].x, jointPalette[z+1].x, jointPalette[z+2].x, 0,\n\tjointPalette[z+0].y, jointPalette[z+1].y, jointPalette[z+2].y, 0,\n\tjointPalette[z+0].z, jointPalette[z+1].z, jointPalette[z+2].z, 0,\n\tjointPalette[z+0].w, jointPalette[z+1].w, jointPalette[z+2].w, 1\n) * vertexWeights.z;\nmat += mat4(\n\tjointPalette[w+0].x, jointPalette[w+1].x, jointPalette[w+2].x, 0,\n\tjointPalette[w+0].y, jointPalette[w+1].y, jointPalette[w+2].y, 0,\n\tjointPalette[w+0].z, jointPalette[w+1].z, jointPalette[w+2].z, 0,\n\tjointPalette[w+0].w, jointPalette[w+1].w, jointPalette[w+2].w, 1\n) * vertexWeights.w;\nwMatrix = wMatrix * mat / mat[3][3];\n#endif"
        };
        return i
    });
    o("goo/renderer/shaders/ShaderLib", ["goo/renderer/MeshData", "goo/renderer/Shader", "goo/renderer/shaders/ShaderFragment", "goo/renderer/shaders/ShaderBuilder", "goo/entities/World"], function (g, d, b, a, f) {
        function e() {
        }

        e.uber = {
            processors: [a.uber.processor, a.light.processor, a.animation.processor],
            attributes: {
                vertexPosition: g.POSITION,
                vertexNormal: g.NORMAL,
                vertexTangent: g.TANGENT,
                vertexColor: g.COLOR,
                vertexUV0: g.TEXCOORD0,
                vertexUV1: g.TEXCOORD1,
                vertexJointIDs: g.JOINTIDS,
                vertexWeights: g.WEIGHTS
            },
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                cameraPosition: d.CAMERA,
                diffuseMap: d.DIFFUSE_MAP,
                diffuseRepeat: [1, 1],
                normalMap: d.NORMAL_MAP,
                specularMap: d.SPECULAR_MAP,
                emissiveMap: d.EMISSIVE_MAP,
                aoMap: d.AO_MAP,
                lightMap: d.LIGHT_MAP,
                color: [1, 1, 1]
            },
            vshader: ["attribute vec3 vertexPosition;\n#ifdef NORMAL\nattribute vec3 vertexNormal;\n#endif\n#ifdef TANGENT\nattribute vec4 vertexTangent;\n#endif\n#ifdef COLOR\nattribute vec4 vertexColor;\n#endif\n#ifdef TEXCOORD0\nattribute vec2 vertexUV0;\nvarying vec2 texCoord0;\n#endif\n#ifdef TEXCOORD1\nattribute vec2 vertexUV1;\nvarying vec2 texCoord1;\n#endif\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nuniform vec3 cameraPosition;\nvarying vec3 vWorldPos;\nvarying vec3 viewPosition;\n#ifdef NORMAL\nvarying vec3 normal;\n#endif\n#ifdef TANGENT\nvarying vec3 binormal;\nvarying vec3 tangent;\n#endif\n#ifdef COLOR\nvarying vec4 color;\n#endif",
                a.light.prevertex, a.animation.prevertex, "void main(void) {\nmat4 wMatrix = worldMatrix;", a.animation.vertex, "vec4 worldPos = wMatrix * vec4(vertexPosition, 1.0);\nvWorldPos = worldPos.xyz;\ngl_Position = viewProjectionMatrix * worldPos;\nviewPosition = cameraPosition - worldPos.xyz;\n#ifdef NORMAL\n\tnormal = normalize((wMatrix * vec4(vertexNormal, 0.0)).xyz);\n#endif\n#ifdef TANGENT\n\ttangent = normalize((wMatrix * vec4(vertexTangent.xyz, 0.0)).xyz);\n\tbinormal = cross(normal, tangent) * vec3(vertexTangent.w);\n#endif\n#ifdef COLOR\n\tcolor = vertexColor;\n#endif\n#ifdef TEXCOORD0\n\ttexCoord0 = vertexUV0;\n#endif\n#ifdef TEXCOORD1\n\ttexCoord1 = vertexUV1;\n#endif",
                a.light.vertex, "}"].join("\n"),
            fshader: ["#ifdef DIFFUSE_MAP\nuniform sampler2D diffuseMap;\n#endif\n#ifdef NORMAL_MAP\nuniform sampler2D normalMap;\n#endif\n#ifdef SPECULAR_MAP\nuniform sampler2D specularMap;\n#endif\n#ifdef EMISSIVE_MAP\nuniform sampler2D emissiveMap;\n#endif\n#ifdef AO_MAP\nuniform sampler2D aoMap;\n#endif\n#ifdef LIGHT_MAP\nuniform sampler2D lightMap;\n#endif\nvarying vec3 vWorldPos;\nvarying vec3 viewPosition;\n#ifdef NORMAL\nvarying vec3 normal;\n#endif\n#ifdef TANGENT\nvarying vec3 binormal;\nvarying vec3 tangent;\n#endif\n#ifdef COLOR\nvarying vec4 color;\n#endif\n#ifdef TEXCOORD0\nvarying vec2 texCoord0;\n#endif\n#ifdef TEXCOORD1\nvarying vec2 texCoord1; //Use for lightmap\n#endif",
                a.light.prefragment, "void main(void)\n{\nvec4 final_color = vec4(1.0);\n#ifdef DIFFUSE_MAP\nfinal_color *= texture2D(diffuseMap, texCoord0);\n#endif\n#ifdef COLOR\nfinal_color *= color;\n#endif\n#ifdef AO_MAP\n#ifdef TEXCOORD1\nfinal_color *= texture2D(aoMap, texCoord1);\n#else\nfinal_color *= texture2D(aoMap, texCoord0);\n#endif\n#endif\n#ifdef LIGHT_MAP\n#ifdef TEXCOORD1\nfinal_color *= texture2D(lightMap, texCoord1) * 2.0 - 0.5;\n#else\nfinal_color *= texture2D(lightMap, texCoord0) * 2.0 - 0.5;\n#endif\n#else\n#if defined(TANGENT) && defined(NORMAL_MAP)\nmat3 tangentToWorld = mat3(tangent, binormal, normal);\nvec3 tangentNormal = texture2D(normalMap, texCoord0).xyz * vec3(2.0) - vec3(1.0);\nvec3 worldNormal = (tangentToWorld * tangentNormal);\nvec3 N = normalize(worldNormal);\n#elif defined(NORMAL)\nvec3 N = normalize(normal);\n#else\nvec3 N = vec3(0.0, 1.0, 0.0);\n#endif",
                a.light.fragment, "#endif\n#ifdef EMISSIVE_MAP\nvec3 emissive = texture2D(emissiveMap, texCoord0).rgb;\nfinal_color.xyz += final_color.xyz * emissive;\n#endif\ngl_FragColor = final_color;\n}"].join("\n")
        };
        e.screenCopy = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {diffuseMap: d.DIFFUSE_MAP},
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nvarying vec2 texCoord0;\nvoid main(void) {\n\ttexCoord0 = vertexUV0;\n\tgl_Position = vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nuniform sampler2D diffuseMap;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tgl_FragColor = texture2D(diffuseMap, texCoord0);\n}"
        };
        e.copy = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                opacity: 1,
                diffuseMap: d.DIFFUSE_MAP
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 texCoord0;\nvoid main(void) {\n\ttexCoord0 = vertexUV0;\n\tgl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nuniform sampler2D diffuseMap;\nuniform float opacity;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tgl_FragColor = vec4(texture2D(diffuseMap, texCoord0).rgb, opacity);\n}"
        };
        e.copyPure = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                opacity: 1,
                diffuseMap: d.DIFFUSE_MAP
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 texCoord0;\nvoid main(void) {\n\ttexCoord0 = vertexUV0;\n\tgl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nuniform sampler2D diffuseMap;\nuniform float opacity;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tvec4 col = texture2D(diffuseMap, texCoord0);\n\tgl_FragColor = vec4(col.rgb, col.a * opacity);\n}"
        };
        e.simple = {
            attributes: {vertexPosition: g.POSITION},
            uniforms: {viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX, worldMatrix: d.WORLD_MATRIX},
            vshader: "attribute vec3 vertexPosition;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nvoid main(void) {\n\tgl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nvoid main(void)\n{\n\tgl_FragColor = vec4(1.0);\n}"
        };
        e.simpleColored = {
            attributes: {vertexPosition: g.POSITION},
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX, color: [1, 1, 1]
            },
            vshader: "attribute vec3 vertexPosition;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nvoid main(void) {\n\tgl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nuniform vec3 color;\nvoid main(void)\n{\n\tgl_FragColor = vec4(color, 1.0);\n}"
        };
        e.simpleLit = {
            processors: [a.light.processor],
            defines: {NORMAL: !0},
            attributes: {vertexPosition: g.POSITION, vertexNormal: g.NORMAL},
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX, cameraPosition: d.CAMERA
            },
            vshader: ["attribute vec3 vertexPosition;\nattribute vec3 vertexNormal;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nuniform vec3 cameraPosition;", a.light.prevertex, "varying vec3 normal;\nvarying vec3 vWorldPos;\nvarying vec3 viewPosition;\nvoid main(void) {\n\tvec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);\n vWorldPos = worldPos.xyz;\n\tgl_Position = viewProjectionMatrix * worldPos;", a.light.vertex, "\tnormal = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;\n\tviewPosition = cameraPosition - worldPos.xyz;\n}"].join("\n"),
            fshader: ["#ifdef SPECULAR_MAP\nuniform sampler2D specularMap;\n#ifdef TEXCOORD0\nvarying vec2 texCoord0;\n#endif\n#endif", a.light.prefragment, "#ifdef NORMAL\nvarying vec3 normal;\n#endif\nvarying vec3 vWorldPos;\nvarying vec3 viewPosition;\nvoid main(void)\n{\n #ifdef NORMAL\n\tvec3 N = normalize(normal);\n #else\n vec3 N = vec3(0,0,1);\n #endif\n\tvec4 final_color = vec4(1.0);", a.light.fragment, "\tgl_FragColor = final_color;\n}"].join("\n")
        };
        e.billboard = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                viewMatrix: d.VIEW_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                diffuseMap: d.DIFFUSE_MAP
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nvarying vec2 texCoord0;\nvoid main(void) {\n\ttexCoord0 = vertexUV0;\n\tgl_Position = viewProjectionMatrix * worldMatrix * vec4(0.0, 0.0, 0.0, 1.0) + projectionMatrix * vec4(vertexPosition.x, vertexPosition.y, 0.0, 0.0);\n}",
            fshader: "precision mediump float;\nuniform sampler2D diffuseMap;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tgl_FragColor = texture2D(diffuseMap, texCoord0);\n}"
        };
        e.textured = {
            defines: {TEXCOORD0: !0, DIFFUSE_MAP: !0},
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                diffuseMap: d.DIFFUSE_MAP
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 texCoord0;\nvoid main(void) {\n\ttexCoord0 = vertexUV0;\n\tgl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\n#if defined(TEXCOORD0) && defined(DIFFUSE_MAP)\nuniform sampler2D diffuseMap;\nvarying vec2 texCoord0;\n#endif\nvoid main(void)\n{\n #if defined(TEXCOORD0) && defined(DIFFUSE_MAP)\n\tgl_FragColor = texture2D(diffuseMap, texCoord0);\n #else\n gl_FragColor = vec4(1.0);\n #endif\n}"
        };
        e.texturedLit = {
            processors: [a.light.processor],
            attributes: {vertexPosition: g.POSITION, vertexNormal: g.NORMAL, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX, cameraPosition: d.CAMERA, diffuseMap: d.DIFFUSE_MAP
            },
            vshader: ["attribute vec3 vertexPosition;\nattribute vec3 vertexNormal;\nattribute vec2 vertexUV0;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nuniform vec3 cameraPosition;", a.light.prevertex, "varying vec3 normal;\nvarying vec3 vWorldPos;\nvarying vec3 viewPosition;\nvarying vec2 texCoord0;\nvoid main(void) {\n\tvec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);\n vWorldPos = worldPos.xyz;\n\tgl_Position = viewProjectionMatrix * worldPos;",
                a.light.vertex, "\tnormal = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;\n\ttexCoord0 = vertexUV0;\n\tviewPosition = cameraPosition - worldPos.xyz;\n}"].join("\n"),
            fshader: ["uniform sampler2D diffuseMap;", a.light.prefragment, "varying vec3 normal;\nvarying vec3 vWorldPos;\nvarying vec3 viewPosition;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tvec3 N = normalize(normal);\n\tvec4 final_color = texture2D(diffuseMap, texCoord0);", a.light.fragment, "\tgl_FragColor = final_color;\n}"].join("\n")
        };
        e.convolution =
        {
            defines: {KERNEL_SIZE_FLOAT: "25.0", KERNEL_SIZE_INT: "25"},
            attributes: {position: g.POSITION, uv: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                uImageIncrement: [0.001953125, 0],
                cKernel: []
            },
            vshader: "attribute vec3 position;\nattribute vec2 uv;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nuniform vec2 uImageIncrement;\nvarying vec2 vUv;\nvoid main() {\n\tvUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;\n\tgl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( position, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform float cKernel[ KERNEL_SIZE_INT ];\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nvarying vec2 vUv;\nvoid main() {\n\tvec2 imageCoord = vUv;\n\tvec4 sum = vec4( 0.0 );\n\tfor( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {\n\t\tsum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];\n\t\timageCoord += uImageIncrement;\n\t}\n\tgl_FragColor = sum;\n}",
            buildKernel: function (a) {
                var b, e, f, d, g = 2 * Math.ceil(a * 3) + 1;
                g > 25 && (g = 25);
                d = (g - 1) * 0.5;
                e = Array(g);
                for (b =
                         f = 0; b < g; ++b)e[b] = Math.exp(-((b - d) * (b - d)) / (2 * a * a)), f += e[b];
                for (b = 0; b < g; ++b)e[b] /= f;
                return e
            }
        };
        e.showDepth = {
            attributes: {vertexPosition: g.POSITION},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                near: d.NEAR_PLANE,
                far: d.FAR_PLANE
            },
            vshader: "attribute vec3 vertexPosition;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvoid main(void) {\n\tgl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nuniform float near;\nuniform float far;\nvoid main(void)\n{\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat d = 1.0 - smoothstep( near, far, depth );\n\tgl_FragColor = vec4(d);\n}"
        };
        e.showNormals = {
            defines: {NORMAL: !0},
            attributes: {vertexPosition: g.POSITION, vertexNormal: g.NORMAL},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                opacity: 1
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec3 vertexNormal;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec3 normal;\nvoid main() {\nnormal = vec3(worldMatrix * vec4(vertexNormal, 0.0));\ngl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nuniform float opacity;\n#ifdef NORMAL\nvarying vec3 normal;\n#else\nvec3 normal = vec3(0,0,1);\n#endif\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( normal ) + 0.5, opacity );\n}"
        };
        e.bokehShader = {
            attributes: {position: g.POSITION, uv: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tColor: d.DIFFUSE_MAP,
                tDepth: d.DEPTH_MAP,
                focus: 1,
                aspect: 1,
                aperture: 0.025,
                maxblur: 1
            },
            vshader: "attribute vec3 position;\nattribute vec2 uv;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\n\tvUv = uv;\n\tgl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( position, 1.0 );\n}",
            fshader: "precision mediump float;\nvarying vec2 vUv;\nuniform sampler2D tColor;\nuniform sampler2D tDepth;\nuniform float maxblur;\nuniform float aperture;\nuniform float focus;\nuniform float aspect;\nvoid main() {\nvec2 aspectcorrect = vec2( 1.0, aspect );\nvec4 depth1 = texture2D( tDepth, vUv );\nfloat factor = depth1.x - focus;\nvec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );\nvec2 dofblur9 = dofblur * 0.9;\nvec2 dofblur7 = dofblur * 0.7;\nvec2 dofblur4 = dofblur * 0.4;\nvec4 col = vec4( 0.0 );\ncol += texture2D( tColor, vUv.xy );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );\ncol += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );\ncol += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );\ngl_FragColor = col / 41.0;\ngl_FragColor.a = 1.0;\n}"
        };
        e.particles = {
            attributes: {vertexPosition: g.POSITION, vertexColor: g.COLOR, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                diffuseMap: d.DIFFUSE_MAP
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec4 vertexColor;\nattribute vec2 vertexUV0;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 texCoord0;\nvarying vec4 color;\nvoid main(void) {\n    texCoord0 = vertexUV0;\n    color = vertexColor;\n\t gl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nuniform sampler2D diffuseMap;\nvarying vec2 texCoord0;\nvarying vec4 color;\nvoid main(void)\n{\n\tvec4 texCol = texture2D(diffuseMap, texCoord0);\n   if (color.a == 0.0 || texCol.a == 0.0) discard;\n\telse gl_FragColor = texCol * color;\n}"
        };
        e.sepia = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                amount: 1
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform float amount;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\nvec4 color = texture2D( tDiffuse, vUv );\nvec3 c = color.rgb;\ncolor.r = dot( c, vec3( 1.0 - 0.607 * amount, 0.769 * amount, 0.189 * amount ) );\ncolor.g = dot( c, vec3( 0.349 * amount, 1.0 - 0.314 * amount, 0.168 * amount ) );\ncolor.b = dot( c, vec3( 0.272 * amount, 0.534 * amount, 1.0 - 0.869 * amount ) );\ngl_FragColor = vec4( min( vec3( 1.0 ), color.rgb ), color.a );\n}"
        };
        e.dotscreen = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                tSize: [256, 256],
                center: [0.5, 0.5],
                angle: 1.57,
                scale: 1
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform vec2 center;\nuniform float angle;\nuniform float scale;\nuniform vec2 tSize;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nfloat pattern() {\nfloat s = sin( angle ), c = cos( angle );\nvec2 tex = vUv * tSize - center;\nvec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;\nreturn ( sin( point.x ) * sin( point.y ) ) * 4.0;\n}\nvoid main() {\nvec4 color = texture2D( tDiffuse, vUv );\nfloat average = ( color.r + color.g + color.b ) / 3.0;\ngl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );\n}"
        };
        e.vignette = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                offset: 1,
                darkness: 1.5
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform float offset;\nuniform float darkness;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\nvec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );\ngl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );\n}"
        };
        e.film = {
            attributes: e.copy.attributes,
            uniforms: {
                tDiffuse: d.DIFFUSE_MAP, time: function () {
                    return f.time
                }, nIntensity: 0.5, sIntensity: 0.5, sCount: 1024, grayscale: 0, $link: e.copy.uniforms
            },
            vshader: e.copy.vshader,
            fshader: "precision mediump float;\nuniform float time;\nuniform bool grayscale;\nuniform float nIntensity;\nuniform float sIntensity;\nuniform float sCount;\nuniform sampler2D tDiffuse;\nvarying vec2 texCoord0;\nvoid main() {\n\tvec4 cTextureScreen = texture2D( tDiffuse, texCoord0 );\n\tfloat x = texCoord0.x * texCoord0.y * time * 1000.0;\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.01 );\n\tvec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\n\tvec2 sc = vec2( sin( texCoord0.y * sCount ), cos( texCoord0.y * sCount ) );\n\tcResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\n\tcResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );\n\tif( grayscale ) {\n\t\tcResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n\t}\n\tgl_FragColor = vec4( cResult, cTextureScreen.a );\n}"
        };
        e.bleachbypass = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                opacity: 1
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform float opacity;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\nvec4 base = texture2D( tDiffuse, vUv );\nvec3 lumCoeff = vec3( 0.25, 0.65, 0.1 );\nfloat lum = dot( lumCoeff, base.rgb );\nvec3 blend = vec3( lum );\nfloat L = min( 1.0, max( 0.0, 10.0 * ( lum - 0.45 ) ) );\nvec3 result1 = 2.0 * base.rgb * blend;\nvec3 result2 = 1.0 - 2.0 * ( 1.0 - blend ) * ( 1.0 - base.rgb );\nvec3 newColor = mix( result1, result2, L );\nfloat A2 = opacity * base.a;\nvec3 mixRGB = A2 * newColor.rgb;\nmixRGB += ( ( 1.0 - A2 ) * base.rgb );\ngl_FragColor = vec4( mixRGB, base.a );\n}"
        };
        e.horizontalTiltShift = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                h: 0.0078125,
                r: 0.5
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform sampler2D tDiffuse;\nuniform float h;\nuniform float r;\nvarying vec2 vUv;\nvoid main() {\nvec4 sum = vec4( 0.0 );\nfloat hh = h * abs( r - vUv.y );\nsum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * hh, vUv.y ) ) * 0.051;\nsum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * hh, vUv.y ) ) * 0.0918;\nsum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * hh, vUv.y ) ) * 0.12245;\nsum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;\nsum += texture2D( tDiffuse, vec2( vUv.x,            vUv.y ) ) * 0.1633;\nsum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;\nsum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * hh, vUv.y ) ) * 0.12245;\nsum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * hh, vUv.y ) ) * 0.0918;\nsum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * hh, vUv.y ) ) * 0.051;\ngl_FragColor = sum;\n}"
        };
        e.colorify = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                color: [1, 1, 1]
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform vec3 color;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\nvec3 luma = vec3( 0.299, 0.587, 0.114 );\nfloat v = dot( texel.xyz, luma );\ngl_FragColor = vec4( v * color, texel.w );\n}"
        };
        e.normalmap = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                heightMap: d.DIFFUSE_MAP,
                resolution: [512, 512],
                height: 0.05
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform float height;\nuniform vec2 resolution;\nuniform sampler2D heightMap;\nvarying vec2 vUv;\nvoid main() {\nfloat val = texture2D( heightMap, vUv ).x;\nfloat valU = texture2D( heightMap, vUv + vec2( 1.0 / resolution.x, 0.0 ) ).x;\nfloat valV = texture2D( heightMap, vUv + vec2( 0.0, 1.0 / resolution.y ) ).x;\ngl_FragColor = vec4( ( 0.5 * normalize( vec3( val - valU, val - valV, height  ) ) + 0.5 ), 1.0 );\n}"
        };
        e.ssao = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                tDepth: d.DEPTH_MAP,
                size: [512, 512],
                cameraNear: d.MAIN_NEAR_PLANE,
                cameraFar: d.MAIN_FAR_PLANE,
                fogNear: d.MAIN_NEAR_PLANE,
                fogFar: d.MAIN_FAR_PLANE,
                fogEnabled: 0,
                onlyAO: 0,
                aoClamp: 0.3,
                lumInfluence: 0
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform float cameraNear;\nuniform float cameraFar;\nuniform float fogNear;\nuniform float fogFar;\nuniform bool fogEnabled;\nuniform bool onlyAO;\nuniform vec2 size;\nuniform float aoClamp;\nuniform float lumInfluence;\nuniform sampler2D tDiffuse;\nuniform sampler2D tDepth;\nvarying vec2 vUv;\n#define DL 2.399963229728653\n#define EULER 2.718281828459045\nfloat width = size.x;\nfloat height = size.y;\nfloat cameraFarPlusNear = cameraFar + cameraNear;\nfloat cameraFarMinusNear = cameraFar - cameraNear;\nfloat cameraCoef = 2.0 * cameraNear;\nconst int samples = 16;\nconst float radius = 2.0;\nconst bool useNoise = false;\nconst float noiseAmount = 0.0003;\nconst float diffArea = 0.4;\nconst float gDisplace = 0.4;\nconst vec3 onlyAOColor = vec3( 1.0, 1.0, 1.0 );\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\nvec2 rand( const vec2 coord ) {\nvec2 noise;\nif ( useNoise ) {\nfloat nx = dot ( coord, vec2( 12.9898, 78.233 ) );\nfloat ny = dot ( coord, vec2( 12.9898, 78.233 ) * 2.0 );\nnoise = clamp( fract ( 43758.5453 * sin( vec2( nx, ny ) ) ), 0.0, 1.0 );\n} else {\nfloat ff = fract( 1.0 - coord.s * ( width / 2.0 ) );\nfloat gg = fract( coord.t * ( height / 2.0 ) );\nnoise = vec2( 0.25, 0.75 ) * vec2( ff ) + vec2( 0.75, 0.25 ) * gg;\n}\nreturn ( noise * 2.0  - 1.0 ) * noiseAmount;\n}\nfloat doFog() {\nfloat zdepth = unpackDepth( texture2D( tDepth, vUv ) );\nfloat depth = -cameraFar * cameraNear / ( zdepth * cameraFarMinusNear - cameraFar );\nreturn smoothstep( fogNear, fogFar, depth );\n}\nfloat readDepth( const in vec2 coord ) {\nreturn cameraCoef / ( cameraFarPlusNear - unpackDepth( texture2D( tDepth, coord ) ) * cameraFarMinusNear );\n}\nfloat compareDepths( const in float depth1, const in float depth2, inout int far ) {\nfloat garea = 2.0;\nfloat diff = ( depth1 - depth2 ) * 100.0;\nif ( diff < gDisplace ) {\ngarea = diffArea;\n} else {\nfar = 1;\n}\nfloat dd = diff - gDisplace;\nfloat gauss = pow( EULER, -2.0 * dd * dd / ( garea * garea ) );\nreturn gauss;\n}\nfloat calcAO( float depth, float dw, float dh ) {\nfloat dd = radius - depth * radius;\nvec2 vv = vec2( dw, dh );\nvec2 coord1 = vUv + dd * vv;\nvec2 coord2 = vUv - dd * vv;\nfloat temp1 = 0.0;\nfloat temp2 = 0.0;\nint far = 0;\ntemp1 = compareDepths( depth, readDepth( coord1 ), far );\nif ( far > 0 ) {\ntemp2 = compareDepths( readDepth( coord2 ), depth, far );\ntemp1 += ( 1.0 - temp1 ) * temp2;\n}\nreturn temp1;\n}\nvoid main() {\nvec2 noise = rand( vUv );\nfloat depth = readDepth( vUv );\nfloat tt = clamp( depth, aoClamp, 1.0 );\nfloat w = ( 1.0 / width )  / tt + ( noise.x * ( 1.0 - noise.x ) );\nfloat h = ( 1.0 / height ) / tt + ( noise.y * ( 1.0 - noise.y ) );\nfloat pw;\nfloat ph;\nfloat ao;\nfloat dz = 1.0 / float( samples );\nfloat z = 1.0 - dz / 2.0;\nfloat l = 0.0;\nfor ( int i = 0; i <= samples; i ++ ) {\nfloat r = sqrt( 1.0 - z );\npw = cos( l ) * r;\nph = sin( l ) * r;\nao += calcAO( depth, pw * w, ph * h );\nz = z - dz;\nl = l + DL;\n}\nao /= float( samples );\nao = 1.0 - ao;\nif ( fogEnabled ) {\nao = mix( ao, 1.0, doFog() );\n}\nvec3 color = texture2D( tDiffuse, vUv ).rgb;\nvec3 lumcoeff = vec3( 0.299, 0.587, 0.114 );\nfloat lum = dot( color.rgb, lumcoeff );\nvec3 luminance = vec3( lum );\nvec3 final = vec3( color * mix( vec3( ao ), vec3( 1.0 ), luminance * lumInfluence ) );\nif ( onlyAO ) {\nfinal = onlyAOColor * vec3( mix( vec3( ao ), vec3( 1.0 ), luminance * lumInfluence ) );\n}\ngl_FragColor = vec4( final, 1.0 );\n}"
        };
        e.skinning = {
            defines: {JOINT_COUNT: 56, WEIGHTS: 4},
            attributes: {
                vertexPosition: g.POSITION,
                vertexUV0: g.TEXCOORD0,
                vertexWeights: g.WEIGHTS,
                vertexJointIDs: g.JOINTIDS
            },
            uniforms: {
                viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                diffuseMap: d.DIFFUSE_MAP,
                jointPalette: function (a) {
                    var a = a.meshData, b = a.currentPose;
                    if (b) {
                        var b = b._matrixPalette, e = a.paletteMap.length * 16, f = a.store;
                        if (!f)f = new Float32Array(e), a.store = f;
                        for (var d = 0; d < a.paletteMap.length; d++)for (var e = b[a.paletteMap[d]], g = 0; g < 4; g++)for (var n =
                            0; n < 4; n++)f[d * 16 + g * 4 + n] = e.data[n * 4 + g];
                        return f
                    }
                }
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nattribute vec4 vertexWeights;\nattribute vec4 vertexJointIDs;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nuniform mat4 jointPalette[JOINT_COUNT];\nvarying vec2 texCoord0;\nvoid main(void) {\n\tmat4 mat = mat4(0.0);\n\tmat += jointPalette[int(vertexJointIDs.x)] * vertexWeights.x;\n\tmat += jointPalette[int(vertexJointIDs.y)] * vertexWeights.y;\n\tmat += jointPalette[int(vertexJointIDs.z)] * vertexWeights.z;\n\tmat += jointPalette[int(vertexJointIDs.w)] * vertexWeights.w;\n\ttexCoord0 = vertexUV0;\n\tgl_Position = viewProjectionMatrix * worldMatrix * mat * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nuniform sampler2D diffuseMap;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tgl_FragColor = texture2D(diffuseMap, texCoord0);\n}"
        };
        e.rgbshift = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                amount: 0.0050,
                angle: 0
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform sampler2D tDiffuse;\nuniform float amount;\nuniform float angle;\nvarying vec2 vUv;\nvoid main() {\nvec2 offset = amount * vec2( cos(angle), sin(angle));\nvec4 cr = texture2D(tDiffuse, vUv + offset);\nvec4 cga = texture2D(tDiffuse, vUv);\nvec4 cb = texture2D(tDiffuse, vUv - offset);\ngl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);\n}"
        };
        e.brightnesscontrast = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX, projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX, tDiffuse: d.DIFFUSE_MAP, brightness: 0, contrast: 0
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform sampler2D tDiffuse;\nuniform float brightness;\nuniform float contrast;\nvarying vec2 vUv;\nvoid main() {\ngl_FragColor = texture2D( tDiffuse, vUv );\ngl_FragColor.rgb += brightness;\nif (contrast > 0.0) {\ngl_FragColor.rgb = (gl_FragColor.rgb - 0.5) / (1.0 - contrast) + 0.5;\n} else {\ngl_FragColor.rgb = (gl_FragColor.rgb - 0.5) * (1.0 + contrast) + 0.5;\n}\n}"
        };
        e.luminosity = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\nvec3 luma = vec3( 0.299, 0.587, 0.114 );\nfloat v = dot( texel.xyz, luma );\ngl_FragColor = vec4( v, v, v, texel.w );\n}"
        };
        e.point = {
            attributes: {vertexPosition: g.POSITION, vertexColor: g.COLOR},
            uniforms: {viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX, worldMatrix: d.WORLD_MATRIX, pointSize: 2},
            vshader: "attribute vec3 vertexPosition;\nattribute vec4 vertexColor;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nuniform float pointSize;\nvarying vec4 color;\nvoid main(void) {\n\tcolor = vertexColor;\n\tgl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n\tgl_PointSize = pointSize;\n}",
            fshader: "precision mediump float;\nvarying vec4 color;\nvoid main(void)\n{\n\tgl_FragColor = color;\n}"
        };
        e.toon = {
            attributes: {vertexPosition: g.POSITION, vertexNormal: g.NORMAL},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                cameraPosition: d.CAMERA,
                lightPosition: d.LIGHT0,
                HighlightColour: [0.9, 0.8, 0.7, 1],
                MidColour: [0.65, 0.55, 0.45, 1],
                ShadowColour: [0.4, 0.3, 0.2, 1],
                HighlightSize: 0.2,
                ShadowSize: 0.01,
                OutlineWidth: 0.15
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec3 vertexNormal;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 lightPosition;\nvarying vec3 N;\nvarying vec3 V;\nvarying vec3 L;\nvoid main()\n{\n\tvec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);\n\tN = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;\n\tL = lightPosition - worldPos.xyz;\n\tV = cameraPosition - worldPos.xyz;\n\tgl_Position = projectionMatrix * viewMatrix * worldPos;\n}",
            fshader: "precision mediump float;\nuniform vec4 HighlightColour;\nuniform vec4 MidColour;\nuniform vec4 ShadowColour;\nuniform float HighlightSize;\nuniform float ShadowSize;\nuniform float OutlineWidth;\nvarying vec3 N;\nvarying vec3 L;\nvarying vec3 V;\nvoid main()\n{\n\tvec3 n = normalize(N);\n\tvec3 l = normalize(L);\n\tvec3 v = normalize(V);\n    float lambert = dot(l,n);\n    vec4 colour = MidColour;\n    if (lambert > 1.0 - HighlightSize) colour = HighlightColour;\n    if (lambert < ShadowSize) colour = ShadowColour;\n    if (dot(n,v) < OutlineWidth) colour = vec4(0.0,0.0,0.0,1.0);\n    gl_FragColor = colour;\n}"
        };
        e.differenceOfGaussians = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                gaussBlurredImage1: "BLUR1",
                gaussBlurredImage2: "BLUR2",
                originalImage: "ORIGINAL",
                threshold: 0.01
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 texCoord0;\nvoid main(void) {\n\ttexCoord0 = vertexUV0;\n\tgl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n}",
            fshader: "precision mediump float;\nuniform sampler2D gaussBlurredImage1;\nuniform sampler2D gaussBlurredImage2;\nuniform sampler2D originalImage;\nuniform float threshold;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tvec4 blur1 = texture2D(gaussBlurredImage1, texCoord0);\n\tvec4 blur2 = texture2D(gaussBlurredImage2, texCoord0);\n\tvec4 originalColor = texture2D(originalImage, texCoord0);\n\tvec3 col = clamp(blur1.rgb - blur2.rgb, 0.0, 1.0);\n\tfloat value = (col.r + col.g + col.b) / 3.0;\n\tvalue = step(threshold, value);\n\tvec3 outputColor = mix(originalColor.rgb, vec3(value), value);\n\tgl_FragColor = vec4(outputColor, 1.0);\n}"
        };
        e.downsample = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\ngl_FragColor = texture2D( tDiffuse, vUv );\n}"
        };
        e.boxfilter = {
            attributes: {vertexPosition: g.POSITION, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                tDiffuse: d.DIFFUSE_MAP,
                viewport: [128, 128]
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec2 vUv;\nvoid main() {\nvUv = vertexUV0;\ngl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n}",
            fshader: "precision mediump float;\nuniform sampler2D tDiffuse;\nuniform vec2 viewport;\nvarying vec2 vUv;\nvoid main() {\nvec3 result = vec3(0.0);\nfor(int x=-1; x<=1; x++) {\n\tfor(int y=-1; y<=1; y++) {\n\t\tresult += texture2D(tDiffuse, vUv + vec2(x, y) / viewport).rgb;\n\t}\n}\ngl_FragColor = vec4(result / vec3(9.0), 1.0);\n}"
        };
        e.lightDepth = {
            defines: {SHADOW_TYPE: 0},
            attributes: {vertexPosition: g.POSITION},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX, projectionMatrix: d.PROJECTION_MATRIX, worldMatrix: d.WORLD_MATRIX,
                cameraScale: d.LIGHT_DEPTH_SCALE
            },
            vshader: "attribute vec3 vertexPosition;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec4 worldPosition;\nvoid main(void) {\nworldPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\ngl_Position = projectionMatrix * worldPosition;\n}",
            fshader: "#ifndef SHADOW_TYPE\n#define SHADOW_TYPE 0\n#endif\nuniform float cameraScale;\nvarying vec4 worldPosition;\nvoid main(void)\n{\nfloat linearDepth = length(worldPosition) * cameraScale;\n#if SHADOW_TYPE == 0\ngl_FragColor = vec4(linearDepth);\n#elif SHADOW_TYPE == 1\ngl_FragColor = vec4(linearDepth, linearDepth * linearDepth, 0.0, 0.0);\n#endif\n}"
        };
        e.packDepth = {
            attributes: {vertexPosition: g.POSITION},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                farPlane: d.FAR_PLANE
            },
            vshader: "attribute vec3 vertexPosition;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec4 vPosition;\nvoid main(void) {\n\tvPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n\tgl_Position = projectionMatrix * vPosition;\n}",
            fshader: ["precision mediump float;\nuniform float farPlane;",
                b.methods.packDepth, "varying vec4 vPosition;\nvoid main(void)\n{\n\tfloat linearDepth = min(length(vPosition), farPlane) / farPlane;\n\tgl_FragColor = packDepth(linearDepth);\n}"].join("\n")
        };
        e.pickingShader = {
            attributes: {vertexPosition: g.POSITION, vertexJointIDs: g.JOINTIDS, vertexWeights: g.WEIGHTS},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                cameraFar: d.FAR_PLANE,
                id: function (a) {
                    return a.renderable.id
                }
            },
            processors: [a.uber.processor, a.animation.processor],
            vshader: ["attribute vec3 vertexPosition;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nuniform float cameraFar;", a.animation.prevertex, "varying float depth;\nvoid main() {\nmat4 wMatrix = worldMatrix;", a.animation.vertex, "vec4 mvPosition = viewMatrix * wMatrix * vec4( vertexPosition, 1.0 );\ndepth = length(mvPosition.xyz) / cameraFar;\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n"),
            fshader: ["uniform float id;\nvarying float depth;", b.methods.packDepth16,
                "void main() {\nvec2 packedId = vec2(floor(id/255.0), mod(id, 255.0)) * vec2(1.0/255.0);\nvec2 packedDepth = packDepth16(depth);\ngl_FragColor = vec4(packedId, packedDepth);\n}"].join("\n")
        };
        return e
    });
    o("goo/entities/systems/RenderSystem", "goo/entities/systems/System,goo/entities/EventHandler,goo/renderer/SimplePartitioner,goo/renderer/Material,goo/renderer/shaders/ShaderLib,goo/renderer/Util".split(","), function (g, d, b, a, f, e) {
        function c() {
            g.call(this, "RenderSystem", ["MeshRendererComponent", "MeshDataComponent"]);
            this.entities = [];
            this.renderList = [];
            this.partitioner = new b;
            this.preRenderers = [];
            this.composers = [];
            this.doRender = !0;
            this._debugMaterials = {};
            this.overrideMaterials = [];
            this.camera = null;
            this.lights = [];
            this.currentTpf = 0;
            var a = this;
            d.addListener({
                setCurrentCamera: function (c) {
                    a.camera = c
                }, setLights: function (c) {
                    a.lights = c
                }
            });
            this.picking = {
                doPick: !1, x: 0, y: 0, pickingStore: {}, pickingCallback: function (a, c) {
                    console.log(a, c)
                }, skipUpdateBuffer: !1
            }
        }

        c.prototype = Object.create(g.prototype);
        c.prototype.pick = function (a,
                                     c, b, e) {
            this.picking.x = a;
            this.picking.y = c;
            this.picking.skipUpdateBuffer = e === void 0 ? !1 : e;
            if (b)this.picking.pickingCallback = b;
            this.picking.doPick = !0
        };
        c.prototype.inserted = function (a) {
            this.partitioner && this.partitioner.added(a)
        };
        c.prototype.deleted = function (a) {
            this.partitioner && this.partitioner.removed(a)
        };
        c.prototype.process = function (a, c) {
            this.entities = a;
            this.currentTpf = c
        };
        c.prototype.render = function (a) {
            a.checkResize(this.camera);
            if (this.doRender && this.camera) {
                a.updateShadows(this.partitioner, this.entities,
                    this.lights);
                for (var c = 0; c < this.preRenderers.length; c++)this.preRenderers[c].process(a, this.entities, this.partitioner, this.camera, this.lights);
                this.partitioner.process(this.camera, this.entities, this.renderList);
                if (this.picking.doPick)a.pick(this.renderList, this.camera, this.picking.x, this.picking.y, this.picking.pickingStore, this.picking.skipUpdateBuffer), this.picking.pickingCallback(this.picking.pickingStore.id, this.picking.pickingStore.depth), this.picking.doPick = !1;
                if (this.composers.length > 0)for (c =
                                                       0; c < this.composers.length; c++)this.composers[c].render(a, this.currentTpf, this.camera, this.lights, null, !0, this.overrideMaterials); else a.render(this.renderList, this.camera, this.lights, null, !0, this.overrideMaterials)
            }
        };
        c.prototype._createDebugMaterial = function (c) {
            if (c !== "") {
                var b;
                switch (c) {
                    case "wireframe":
                    case "color":
                        b = e.clone(f.simpleColored.fshader);
                        break;
                    case "lit":
                        b = e.clone(f.simpleLit.fshader);
                        break;
                    case "texture":
                        b = e.clone(f.textured.fshader);
                        break;
                    case "normals":
                        b = e.clone(f.showNormals.fshader);
                        break;
                    case "simple":
                        b = e.clone(f.simple.fshader)
                }
                var d = e.clone(f.uber);
                d.fshader = b;
                if (c !== "flat") {
                    if (this._debugMaterials[c] = a.createMaterial(d, c), c === "wireframe")this._debugMaterials[c].wireframe = !0
                } else this._debugMaterials[c] = a.createEmptyMaterial(null, c), this._debugMaterials[c].flat = !0
            }
        };
        c.prototype.setDebugMaterial = function (a) {
            if (!a || a === "")this.overrideMaterials = []; else {
                var c = a.split("+");
                this.overrideMaterials = [];
                for (var b = 0; b < c.length; b++)a = c[b], this._debugMaterials[a] || this._createDebugMaterial(a),
                    a === "" ? this.overrideMaterials.push(null) : this.overrideMaterials.push(this._debugMaterials[a])
            }
        };
        return c
    });
    o("goo/renderer/RendererRecord", [], function () {
        function g() {
            this.currentBuffer = {
                ArrayBuffer: {buffer: null, valid: !1},
                ElementArrayBuffer: {buffer: null, valid: !1}
            };
            this.currentFrameBuffer = null;
            this.clippingTestEnabled = this.clippingTestValid = !1;
            this.clips = [];
            this.enabledTextures = 0;
            this.texturesValid = !1;
            this.currentTextureArraysUnit = 0;
            this.textureRecord = [];
            this.usedProgram = null;
            this.boundAttributes = [];
            this.depthRecord = {};
            this.cullRecord = {};
            this.blendRecord = {};
            this.offsetRecord = {};
            this.lineRecord = {};
            this.pointRecord = {}
        }

        g.prototype.invalidateBuffer = function (d) {
            this.currentBuffer[d].buffer = null;
            this.currentBuffer[d].valid = !1
        };
        return g
    });
    o("goo/util/rsvp", ["exports"], function (g) {
        function d(c, b) {
            a.async(function () {
                c.trigger("promise:resolved", {detail: b});
                c.isResolved = !0;
                c.resolvedValue = b
            })
        }

        function b(c, b) {
            a.async(function () {
                c.trigger("promise:failed", {detail: b});
                c.isRejected = !0;
                c.rejectedValue = b
            })
        }

        var a = {}, f = typeof window !== "undefined" ? window : {}, f = f.MutationObserver || f.WebKitMutationObserver, e = window.process;
        if (typeof e !== "undefined" && {}.toString.call(e) === "[object process]")a.async = function (a, c) {
            e.nextTick(function () {
                a.call(c)
            })
        }; else if (f) {
            var c = [], i = new f(function () {
                var a = c.slice();
                c = [];
                a.forEach(function (a) {
                    a[0].call(a[1])
                })
            }), j = document.createElement("div");
            i.observe(j, {attributes: !0});
            window.addEventListener("unload", function () {
                i.disconnect();
                i = null
            });
            a.async = function (a, b) {
                c.push([a,
                    b]);
                j.setAttribute("drainQueue", "drainQueue")
            }
        } else a.async = function (a, c) {
            setTimeout(function () {
                a.call(c)
            }, 1)
        };
        var k = function (a, c) {
            this.type = a;
            for (var b in c)c.hasOwnProperty(b) && (this[b] = c[b])
        }, h = function (a, c) {
            for (var b = 0, e = a.length; b < e; b++)if (a[b][0] === c)return b;
            return -1
        }, l = function (a) {
            var c = a._promiseCallbacks;
            if (!c)c = a._promiseCallbacks = {};
            return c
        }, f = {
            mixin: function (a) {
                a.on = this.on;
                a.off = this.off;
                a.trigger = this.trigger;
                return a
            }, on: function (a, c, b) {
                for (var e = l(this), f, d, a = a.split(/\s+/), b = b ||
                    this; d = a.shift();)(f = e[d]) || (f = e[d] = []), h(f, c) === -1 && f.push([c, b])
            }, off: function (a, c) {
                for (var b = l(this), e, f, a = a.split(/\s+/); e = a.shift();)c ? (e = b[e], f = h(e, c), f !== -1 && e.splice(f, 1)) : b[e] = []
            }, trigger: function (a, c) {
                var b, e, f, d;
                if (b = l(this)[a])for (var g = 0, i = b.length; g < i; g++)e = b[g], f = e[0], e = e[1], typeof c !== "object" && (c = {detail: c}), d = new k(a, c), f.call(e, d)
            }
        }, n = function () {
            this.on("promise:resolved", function (a) {
                this.trigger("success", {detail: a.detail})
            }, this);
            this.on("promise:failed", function (a) {
                this.trigger("error",
                    {detail: a.detail})
            }, this)
        }, q = function () {
        }, r = function (a, c, b, e) {
            var f = typeof b === "function", d, g, i, h;
            if (f)try {
                d = b(e.detail), i = !0
            } catch (j) {
                h = !0, g = j
            } else d = e.detail, i = !0;
            if (d && typeof d.then === "function")d.then(function (a) {
                c.resolve(a)
            }, function (a) {
                c.reject(a)
            }); else if (f && i)c.resolve(d); else if (h)c.reject(g); else c[a](d)
        };
        n.prototype = {
            then: function (c, b) {
                var e = new n;
                this.isResolved && a.async(function () {
                    r("resolve", e, c, {detail: this.resolvedValue})
                }, this);
                this.isRejected && a.async(function () {
                    r("reject", e, b,
                        {detail: this.rejectedValue})
                }, this);
                this.on("promise:resolved", function (a) {
                    r("resolve", e, c, a)
                });
                this.on("promise:failed", function (a) {
                    r("reject", e, b, a)
                });
                return e
            }, resolve: function (a) {
                d(this, a);
                this.reject = this.resolve = q
            }, reject: function (a) {
                b(this, a);
                this.reject = this.resolve = q
            }
        };
        f.mixin(n.prototype);
        g.Promise = n;
        g.Event = k;
        g.EventTarget = f;
        g.all = function (a) {
            var c, b = [], e = new n, f = a.length;
            f === 0 && e.resolve([]);
            var d = function (a) {
                return function (c) {
                    b[a] = c;
                    --f === 0 && e.resolve(b)
                }
            }, g = function (a) {
                e.reject(a)
            };
            for (c = 0; c < f; c++)a[c].then(d(c), g);
            return e
        };
        g.configure = function (c, b) {
            a[c] = b
        }
    });
    o("goo/util/Ajax", ["goo/util/rsvp"], function (g) {
        function d(b) {
            this._loadStack = [];
            this._callback = b
        }

        d.prototype.get = function (b) {
            var a = new g.Promise, f = this._progress.bind(this), e = {loaded: 0, total: 0, lengthComputable: !1};
            this._loadStack.push(e);
            var b = b || {}, c = new XMLHttpRequest;
            c.open("GET", b.url || "", !0);
            if (b.responseType)c.responseType = b.responseType;
            c.onreadystatechange = function () {
                if (c.readyState === 4)c.status >= 200 && c.status <=
                299 ? (e.loaded = e.total, f(), a.resolve(c)) : a.reject(c.statusText)
            };
            c.addEventListener("progress", function (a) {
                e.loaded = a.loaded || a.position;
                e.total = a.total || a.totalSize;
                e.lengthComputable = a.lengthComputable;
                f()
            }, !1);
            c.send();
            return a
        };
        d.prototype._progress = function () {
            if (this._callback) {
                for (var b = {
                    total: 0,
                    loaded: 0,
                    count: this._loadStack.length
                }, a = 0; a < this._loadStack.length; a++)b.total += this._loadStack[a].total, b.loaded += this._loadStack[a].loaded;
                this._callback(b)
            }
        };
        d.ARRAY_BUFFER = "arraybuffer";
        d.prototype.load =
            function (b, a) {
                if (typeof b === "undefined" || b === null)throw Error("Ajax(): `path` was undefined/null");
                var f = {url: b};
                if (a === d.ARRAY_BUFFER)f.responseType = d.ARRAY_BUFFER;
                var e = this.get(f).then(function (a) {
                    return a.response
                });
                e.then(null, function (a) {
                    console.error("Ajax.load(): Could not retrieve data from `" + f.url + "`.\n Reason: " + a);
                    throw Error("Ajax.load(): Could not retrieve data from `" + f.url + "`.\n Reason: " + a);
                });
                return e
            };
        d.prototype.loadImage = function (b, a) {
            window.URL = window.URL || window.webkitURL;
            var f = new g.Promise, e = new Image;
            e.addEventListener("load", function () {
                e.dataReady = !0;
                window.URL.revokeObjectURL(e.src);
                f.resolve(e)
            }, !1);
            e.addEventListener("error", function (a) {
                console.log(a);
                f.reject("Ajax.loadImage(): Couldn't load from [" + b + "]")
            }, !1);
            a ? this.load(b, function (a) {
                var a = new Uint8Array(a, 0, a.byteLength), f = "image/jpeg";
                /\.png$/.test(b) && (f = "image/png");
                a = new Blob([a], {type: f});
                e.src = window.URL.createObjectURL(a);
                return e
            }, d.ARRAY_BUFFER) : e.src = b;
            return f
        };
        return d
    });
    o("goo/loaders/Loader",
        ["goo/util/rsvp", "goo/util/Ajax"], function (g, d) {
            function b(a) {
                if (typeof a !== "undefined" && a !== null && typeof a !== "object")throw Error("Loader(): Argument `parameters` must be of type `object`"); else if (typeof a === "undefined" || a === null)a = {};
                this.rootPath = a.rootPath || "";
                this.xhr = a.xhr || new d(this._progressCallback.bind(this));
                this._progressCallbacks = [];
                this.total = 0
            }

            b.prototype.load = function (a, f, e) {
                if (typeof a === "undefined" || a === null)throw Error("Loader(): `path` was undefined/null");
                var c = {url: this._buildURL(a)};
                if (e === b.ARRAY_BUFFER)c.responseType = b.ARRAY_BUFFER;
                a = this.xhr.get(c).then(function (a) {
                    return a.response
                });
                f && (a = a.then(function (a) {
                    return typeof f === "function" ? f(a) : a
                }));
                a.then(function () {
                    console.log("Loaded: " + c.url)
                });
                a.then(null, function (a) {
                    console.error("Loader.load(): Could not retrieve data from `" + c.url + "`.\n Reason: " + a);
                    throw Error("Loader.load(): Could not retrieve data from `" + c.url + "`.\n Reason: " + a);
                });
                return a
            };
            b.prototype.addProgressCallback = function (a) {
                this._progressCallbacks.push(a)
            };
            b.prototype.removeProgressCallback = function (a) {
                for (var b = 0; b < this._progressCallbacks.length; b++)if (this._progressCallbacks[b] === a) {
                    this._progressCallbacks.splice(b, 1);
                    break
                }
            };
            b.prototype._progressCallback = function (a) {
                if (this.total)a.total = this.total;
                for (var b = 0; b < this._progressCallbacks.length; b++)this._progressCallbacks[b](a)
            };
            b.prototype.loadImage = function (a, f) {
                window.URL = window.URL || window.webkitURL;
                var e = new g.Promise, c = new Image;
                c.addEventListener("load", function () {
                    c.dataReady = !0;
                    window.URL.revokeObjectURL(c.src);
                    e.resolve(c)
                }, !1);
                c.addEventListener("error", function () {
                    e.reject("Loader.loadImage(): Couldn't load from [" + a + "]")
                }, !1);
                f ? this.load(a, function (b) {
                    var b = new Uint8Array(b, 0, b.byteLength), e = "image/jpeg";
                    /\.png$/.test(a) && (e = "image/png");
                    b = new Blob([b], {type: e});
                    c.src = window.URL.createObjectURL(b)
                }, b.ARRAY_BUFFER) : c.src = this._buildURL(a);
                return e
            };
            b.prototype._buildURL = function (a) {
                return this.rootPath + window.escape(a)
            };
            b.ARRAY_BUFFER = "arraybuffer";
            return b
        });
    o("goo/renderer/Texture", ["goo/math/Vector2"],
        function (g) {
            function d(b, a, f, e) {
                this.glTexture = null;
                a = a || {};
                this.wrapS = a.wrapS || "Repeat";
                this.wrapT = a.wrapT || "Repeat";
                this.magFilter = a.magFilter || "Bilinear";
                this.minFilter = a.minFilter || "Trilinear";
                this.anisotropy = a.anisotropy !== void 0 ? a.anisotropy : 1;
                this.format = a.format || "RGBA";
                this.type = a.type || "UnsignedByte";
                this.variant = "2D";
                this.offset = new g(a.offset || [0, 0]);
                this.repeat = new g(a.repeat || [1, 1]);
                this.generateMipmaps = a.generateMipmaps !== void 0 ? a.generateMipmaps : !0;
                this.premultiplyAlpha = a.premultiplyAlpha !== void 0 ? a.premultiplyAlpha : !1;
                this.flipY = a.flipY !== void 0 ? a.flipY : !0;
                this.needsUpdate = this.hasBorder = !1;
                this.readyCallback = this.updateCallback = null;
                b && this.setImage(b, a, f, e)
            }

            d.prototype.checkDataReady = function () {
                return this.image && (this.image.dataReady || this.image instanceof HTMLImageElement) || this.readyCallback !== null && this.readyCallback()
            };
            d.prototype.checkNeedsUpdate = function () {
                return this.needsUpdate || this.updateCallback !== null && this.updateCallback()
            };
            d.prototype.setNeedsUpdate = function () {
                this.needsUpdate = !0
            };
            d.prototype.setImage = function (b, a, f, e) {
                this.image = b;
                var c = b instanceof Array ? b[0] : b;
                if (c instanceof Uint8Array || c instanceof Uint8ClampedArray || c instanceof Uint16Array)if (f = f || b.width, e = e || b.height, f !== void 0 && e !== void 0)if (this.image = {data: b}, this.image.width = f, this.image.height = e, this.image.isData = !0, this.image.dataReady = !0, c instanceof Uint8Array || c instanceof Uint8ClampedArray)a.type = "UnsignedByte"; else {
                    if (c instanceof Uint16Array)a.type = "UnsignedShort4444"
                } else throw"Data textures need width and height";
                else if (b instanceof Array)this.image = {data: b}
            };
            d.CUBE_FACES = "PositiveX,NegativeX,PositiveY,NegativeY,PositiveZ,NegativeZ".split(",");
            return d
        });
    o("goo/loaders/dds/DdsUtils", [], function () {
        function g() {
        }

        g.getDdsExtension = function (d) {
            for (var b = ["", "WEBKIT_", "MOZ_"], a = 0; a < b.length; a++) {
                var f = d.getExtension(b[a] + "WEBGL_compressed_texture_s3tc");
                if (typeof f !== "undefined" && f !== null)return f
            }
            return null
        };
        g.isSupported = function (d) {
            return g.getDdsExtension(d) !== null
        };
        g.shiftCount = function (d) {
            if (d === 0)return 0;
            for (var b = 0; (d & 1) === 0;)if (d >>= 1, b++, b > 32)throw"invalid mask!";
            return b
        };
        g.isSet = function (d, b) {
            return (d & b) === b
        };
        g.getIntFromString = function (d) {
            for (var b = [], a = 0; a < d.length; a++)b[a] = d.charCodeAt(a);
            return g.getIntFromBytes(b)
        };
        g.getIntFromBytes = function (d) {
            var b = 0;
            b |= (d[0] & 255) << 0;
            d.length > 1 && (b |= (d[1] & 255) << 8);
            d.length > 2 && (b |= (d[2] & 255) << 16);
            d.length > 3 && (b |= (d[3] & 255) << 24);
            return b
        };
        g.getComponents = function (d) {
            switch (d) {
                case "Alpha":
                    return 1;
                case "RGB":
                    return 3;
                case "RGBA":
                    return 4;
                case "Luminance":
                    return 1;
                case "LuminanceAlpha":
                    return 2;
                case "PrecompressedDXT1":
                    return 1;
                case "PrecompressedDXT1A":
                    return 1;
                case "PrecompressedDXT3":
                    return 2;
                case "PrecompressedDXT5":
                    return 2
            }
            return 0
        };
        g.flipDXT = function (d, b, a, f) {
            for (var e = new Uint8Array(d.length), b = b + 3 >> 2, a = a + 3 >> 2, c = g.getComponents(f) * 8, i = 0; i < a; i++)for (var j = a - i - 1, k = 0; k < b; k++) {
                var h = (j * b + k) * c, l = (i * b + k) * c;
                switch (f) {
                    case "PrecompressedDXT1":
                    case "PrecompressedDXT1A":
                        e[h + 0] = d[l + 0];
                        e[h + 1] = d[l + 1];
                        e[h + 2] = d[l + 2];
                        e[h + 3] = d[l + 3];
                        e[h + 4] = d[l + 7];
                        e[h + 5] = d[l + 6];
                        e[h + 6] =
                            d[l + 5];
                        e[h + 7] = d[l + 4];
                        break;
                    case "PrecompressedDXT3":
                        e[h + 0] = d[l + 6];
                        e[h + 1] = d[l + 7];
                        e[h + 2] = d[l + 4];
                        e[h + 3] = d[l + 5];
                        e[h + 4] = d[l + 2];
                        e[h + 5] = d[l + 3];
                        e[h + 6] = d[l + 0];
                        e[h + 7] = d[l + 1];
                        e[h + 8] = d[l + 8];
                        e[h + 9] = d[l + 9];
                        e[h + 10] = d[l + 10];
                        e[h + 11] = d[l + 11];
                        e[h + 12] = d[l + 15];
                        e[h + 13] = d[l + 14];
                        e[h + 14] = d[l + 13];
                        e[h + 15] = d[l + 12];
                        break;
                    case "PrecompressedDXT5":
                        e[h + 0] = d[l + 0], e[h + 1] = d[l + 1], g.getBytesFromUInt24(e, h + 5, g.flipUInt24(g.getUInt24(d, l + 2))), g.getBytesFromUInt24(e, h + 2, g.flipUInt24(g.getUInt24(d, l + 5))), e[h + 8] = d[l + 8], e[h + 9] = d[l + 9], e[h +
                        10] = d[l + 10], e[h + 11] = d[l + 11], e[h + 12] = d[l + 15], e[h + 13] = d[l + 14], e[h + 14] = d[l + 13], e[h + 15] = d[l + 12]
                }
            }
            return e
        };
        g.getUInt24 = function (d, b) {
            var a = 0;
            a |= (d[b + 0] & 255) << 0;
            a |= (d[b + 1] & 255) << 8;
            a |= (d[b + 2] & 255) << 16;
            return a
        };
        g.getBytesFromUInt24 = function (d, b, a) {
            d[b + 0] = a & 255;
            d[b + 1] = (a & 65280) >> 8;
            d[b + 2] = (a & 16711680) >> 16
        };
        g.ThreeBitMask = 7;
        g.flipUInt24 = function (d) {
            for (var b = [], a = 0; a < 2; a++)b.push([0, 0, 0, 0]);
            b[0][0] = d & g.ThreeBitMask;
            d >>= 3;
            b[0][1] = d & g.ThreeBitMask;
            d >>= 3;
            b[0][2] = d & g.ThreeBitMask;
            d >>= 3;
            b[0][3] = d & g.ThreeBitMask;
            d >>= 3;
            b[1][0] = d & g.ThreeBitMask;
            d >>= 3;
            b[1][1] = d & g.ThreeBitMask;
            d >>= 3;
            b[1][2] = d & g.ThreeBitMask;
            d >>= 3;
            b[1][3] = d & g.ThreeBitMask;
            d = 0;
            d |= b[1][0] << 0;
            d |= b[1][1] << 3;
            d |= b[1][2] << 6;
            d |= b[1][3] << 9;
            d |= b[0][0] << 12;
            d |= b[0][1] << 15;
            d |= b[0][2] << 18;
            d |= b[0][3] << 21;
            return d
        };
        return g
    });
    o("goo/loaders/dds/DdsLoader", ["goo/loaders/dds/DdsUtils"], function (g) {
        function d() {
            this.dwABitMask = this.dwBBitMask = this.dwGBitMask = this.dwRBitMask = this.dwRGBBitCount = this.dwFourCC = this.dwFlags = this.dwSize = 0
        }

        function b() {
            this.dwAlphaBitDepth =
                this.dwMipMapCount = this.dwDepth = this.dwLinearSize = this.dwWidth = this.dwHeight = this.dwFlags = this.dwSize = 0;
            this.dwReserved1 = [];
            this.ddpf = null;
            this.dwTextureStage = this.dwCaps4 = this.dwCaps3 = this.dwCaps2 = this.dwCaps = 0
        }

        function a() {
            this.flipVertically = !1;
            this.bpp = 0;
            this.headerDX10 = this.header = null;
            this.mipmapByteSizes = []
        }

        function f() {
        }

        d.HEADER_OFFSET = 19;
        d.DDPF_ALPHAPIXELS = 1;
        d.DDPF_ALPHA = 2;
        d.DDPF_FOURCC = 4;
        d.DDPF_RGB = 64;
        d.DDPF_YUV = 512;
        d.DDPF_LUMINANCE = 131072;
        d.read = function (a) {
            var c = new d;
            c.dwSize = a[d.HEADER_OFFSET +
            0];
            if (c.dwSize !== 32)throw"invalid pixel format size: " + c.dwSize;
            c.dwFlags = a[d.HEADER_OFFSET + 1];
            c.dwFourCC = a[d.HEADER_OFFSET + 2];
            c.dwRGBBitCount = a[d.HEADER_OFFSET + 3];
            c.dwRBitMask = a[d.HEADER_OFFSET + 4];
            c.dwGBitMask = a[d.HEADER_OFFSET + 5];
            c.dwBBitMask = a[d.HEADER_OFFSET + 6];
            c.dwABitMask = a[d.HEADER_OFFSET + 7];
            return c
        };
        b.DDSD_CAPS = 1;
        b.DDSD_HEIGHT = 2;
        b.DDSD_WIDTH = 4;
        b.DDSD_PITCH = 8;
        b.DDSD_PIXELFORMAT = 4096;
        b.DDSD_MIPMAPCOUNT = 131072;
        b.DDSD_LINEARSIZE = 524288;
        b.DDSD_DEPTH = 8388608;
        b.DDSCAPS_COMPLEX = 8;
        b.DDSCAPS_MIPMAP =
            4194304;
        b.DDSCAPS_TEXTURE = 4096;
        b.DDSCAPS2_CUBEMAP = 512;
        b.DDSCAPS2_CUBEMAP_POSITIVEX = 1024;
        b.DDSCAPS2_CUBEMAP_NEGATIVEX = 2048;
        b.DDSCAPS2_CUBEMAP_POSITIVEY = 4096;
        b.DDSCAPS2_CUBEMAP_NEGATIVEY = 8192;
        b.DDSCAPS2_CUBEMAP_POSITIVEZ = 16384;
        b.DDSCAPS2_CUBEMAP_NEGATIVEZ = 32768;
        b.DDSCAPS2_VOLUME = 2097152;
        b.read = function (a) {
            var c = new b;
            c.dwSize = a[1];
            if (c.dwSize !== 124)throw"invalid dds header size: " + c.dwSize;
            c.dwFlags = a[2];
            c.dwHeight = a[3];
            c.dwWidth = a[4];
            c.dwLinearSize = a[5];
            c.dwDepth = a[6];
            c.dwMipMapCount = a[7];
            c.dwAlphaBitDepth =
                a[8];
            for (var f = 0; f < c.dwReserved1.length; f++)c.dwReserved1[f] = a[9 + f];
            c.ddpf = d.read(a);
            c.dwCaps = a[27];
            c.dwCaps2 = a[28];
            c.dwCaps3 = a[29];
            c.dwCaps4 = a[30];
            c.dwTextureStage = a[31];
            a = 1 + Math.ceil(Math.log(Math.max(c.dwHeight, c.dwWidth)) / Math.log(2));
            g.isSet(c.dwCaps, b.DDSCAPS_MIPMAP) ? g.isSet(c.dwFlags, b.DDSD_MIPMAPCOUNT) ? c.dwMipMapCount !== a && console.warn("Got " + c.dwMipMapCount + " mipmaps, expected " + a) : c.dwMipMapCount = a : c.dwMipMapCount = 1;
            return c
        };
        a.prototype.calcMipmapSizes = function (a) {
            for (var c = this.header.dwWidth,
                     b = this.header.dwHeight, f = 0, d = 0; d < this.header.dwMipMapCount; d++)f = a ? ~~((c + 3) / 4) * ~~((b + 3) / 4) * this.bpp * 2 : ~~(c * b * this.bpp / 8), this.mipmapByteSizes.push(~~((f + 3) / 4) * 4), c = ~~(c / 2) > 1 ? ~~(c / 2) : 1, b = ~~(b / 2) > 1 ? ~~(b / 2) : 1
        };
        f.updateDepth = function (a, c) {
            if (g.isSet(c.header.dwCaps2, b.DDSCAPS2_CUBEMAP)) {
                var f = 0;
                g.isSet(c.header.dwCaps2, b.DDSCAPS2_CUBEMAP_POSITIVEX) && f++;
                g.isSet(c.header.dwCaps2, b.DDSCAPS2_CUBEMAP_NEGATIVEX) && f++;
                g.isSet(c.header.dwCaps2, b.DDSCAPS2_CUBEMAP_POSITIVEY) && f++;
                g.isSet(c.header.dwCaps2, b.DDSCAPS2_CUBEMAP_NEGATIVEY) &&
                f++;
                g.isSet(c.header.dwCaps2, b.DDSCAPS2_CUBEMAP_POSITIVEZ) && f++;
                g.isSet(c.header.dwCaps2, b.DDSCAPS2_CUBEMAP_NEGATIVEZ) && f++;
                if (f !== 6)throw Error("Cubemaps without all faces defined are not currently supported.");
                a.depth = f
            } else a.depth = c.header.dwDepth > 0 ? c.header.dwDepth : 1
        };
        f.readDXT = function (a, c, b, f) {
            f.image.isCompressed = !0;
            if (!b.flipVertically)return new Uint8Array(a.buffer, a.byteOffset + 0, c);
            for (var d = b.header.dwWidth, h = b.header.dwHeight, c = new Uint8Array(c), l = 0, n = 0; n < b.header.dwMipMapCount; n++) {
                var q =
                    a.subarray(l, l + b.mipmapByteSizes[n]), q = g.flipDXT(q, d, h, f.format);
                c.set(q, l);
                l += q.length;
                d = ~~(d / 2) > 1 ? ~~(d / 2) : 1;
                h = ~~(h / 2) > 1 ? ~~(h / 2) : 1
            }
            return c
        };
        f.readUncompressed = function (a, c, b, f, d, h, l, n) {
            for (var q = g.shiftCount(l.header.ddpf.dwRBitMask), r = g.shiftCount(l.header.ddpf.dwGBitMask), m = g.shiftCount(l.header.ddpf.dwBBitMask), s = g.shiftCount(l.header.ddpf.dwABitMask), o = ~~(l.header.ddpf.dwRGBBitCount / 8), n = g.getComponents(n.format) * 1, c = new Uint8Array(c), p = l.header.dwWidth, w = l.header.dwHeight, y = 0, t = 0, u = 0, A = [],
                     u = 0; u < o; u++)A.push(0);
            for (var v = 0; v < l.header.dwMipMapCount; v++) {
                for (var C = 0; C < w; C++)for (var z = 0; z < p; z++) {
                    for (u = 0; u < o; u++)A[u] = a[t++];
                    var u = g.getIntFromBytes(A), F = (u & l.header.ddpf.dwRBitMask) >> q, E = (u & l.header.ddpf.dwGBitMask) >> r, D = (u & l.header.ddpf.dwBBitMask) >> m, u = (u & l.header.ddpf.dwABitMask) >> s;
                    d ? c[y++] = u : f ? (c[y++] = F, h && (c[y++] = u)) : b && (c[y++] = F, c[y++] = E, c[y++] = D, h && (c[y++] = u))
                }
                y += p * w * n;
                p = ~~(p / 2) > 1 ? ~~(p / 2) : 1;
                w = ~~(w / 2) > 1 ? ~~(w / 2) : 1
            }
            return c
        };
        f.populate = function (a, c, b) {
            var j = c.header.ddpf.dwFlags, k = g.isSet(j,
                d.DDPF_FOURCC), h = g.isSet(j, d.DDPF_RGB), l = g.isSet(j, d.DDPF_ALPHAPIXELS), n = g.isSet(j, d.DDPF_LUMINANCE), j = g.isSet(j, d.DDPF_ALPHA);
            a.type = "UnsignedByte";
            if (k) {
                var q = c.header.ddpf.dwFourCC;
                if (q === g.getIntFromString("DXT1"))c.bpp = 4, a.format = "PrecompressedDXT1A"; else if (q === g.getIntFromString("DXT3"))c.bpp = 8, a.format = "PrecompressedDXT3"; else if (q === g.getIntFromString("DXT5"))c.bpp = 8, a.format = "PrecompressedDXT5"; else if (q === g.getIntFromString("DX10"))throw Error("dxt10 LATC formats not supported currently: " +
                    c.headerDX10.dxgiFormat); else if (q === g.getIntFromString("DXT2"))throw"DXT2 is not supported."; else if (q === g.getIntFromString("DXT4"))throw"DXT4 is not supported."; else throw"unsupported compressed dds format found (" + q + ")";
            } else if (c.bpp = c.header.ddpf.dwRGBBitCount, h)a.format = l ? "RGBA" : "RGB"; else if (n || l)if (n && l)a.format = "LuminanceAlpha"; else if (n)a.format = "Luminance"; else {
                if (j)a.format = "Alpha"
            } else throw Error("unsupported uncompressed dds format found.");
            c.calcMipmapSizes(k);
            a.image.mipmapSizes =
                c.mipmapByteSizes;
            for (var r = q = 0; r < c.mipmapByteSizes.length; r++)q += c.mipmapByteSizes[r];
            for (var m = [], r = 0; r < a.image.depth; r++)k ? m.push(f.readDXT(b, q, c, a)) : (h || n || j) && m.push(f.readUncompressed(b, q, h, n, j, l, c, a));
            a.image.data = a.image.depth === 1 ? m[0] : m;
            a.image.useArrays = !0
        };
        f.prototype.load = function (e, c, d, j, k) {
            var h = new Int32Array(e, j + 0, 32);
            if (h[0] !== g.getIntFromString("DDS "))throw"Not a dds file.";
            var l = new a;
            l.flipVertically = d;
            l.header = b.read(h);
            l.headerDX10 = l.header.ddpf.dwFourCC === g.getIntFromString("DX10") ?
                b.read(Int32Array.create(e, j + 128, 5)) : null;
            d = c.image;
            if (typeof d === "undefined" || d === null)d = {}, c.image = d;
            d.width = l.header.dwWidth;
            d.height = l.header.dwHeight;
            f.updateDepth(d, l);
            h = 128 + (l.headerDX10 ? 20 : 0);
            f.populate(c, l, new Uint8Array(e, j + h, k - h));
            if (!l.mipmapByteSizes || l.mipmapByteSizes.length < 2)c.minFilter = "BilinearNoMipMaps";
            d.bpp = l.bpp;
            d.dataReady = !0;
            c.needsUpdate = !0
        };
        f.SUPPORTS_DDS = !1;
        f.prototype.isSupported = function () {
            return f.SUPPORTS_DDS
        };
        f.prototype.toString = function () {
            return "DdsLoader"
        };
        return f
    });
    o("goo/loaders/tga/TgaLoader", [], function () {
        function g() {
            this.header = null;
            this.offset = 0;
            this.use_grey = this.use_rgb = this.use_pal = this.use_rle = !1
        }

        g.TYPE_NO_DATA = 0;
        g.TYPE_INDEXED = 1;
        g.TYPE_RGB = 2;
        g.TYPE_GREY = 3;
        g.TYPE_RLE_INDEXED = 9;
        g.TYPE_RLE_RGB = 10;
        g.TYPE_RLE_GREY = 11;
        g.ORIGIN_MASK = 48;
        g.ORIGIN_SHIFT = 4;
        g.ORIGIN_BL = 0;
        g.ORIGIN_BR = 1;
        g.ORIGIN_UL = 2;
        g.ORIGIN_UR = 3;
        g.prototype.load = function (d, b) {
            this.loadData(new Uint8Array(d));
            var a = this.getImageData();
            b.setImage(a, null, a.width, a.height);
            a.dataReady = !0;
            b.needsUpdate = !0
        };
        g.prototype.loadData = function (d) {
            if (d.length < 19)throw Error("Targa::load() - Not enough data to contain header.");
            this.offset = 0;
            this.header = {
                id_length: d[this.offset++],
                colormap_type: d[this.offset++],
                image_type: d[this.offset++],
                colormap_index: d[this.offset++] | d[this.offset++] << 8,
                colormap_length: d[this.offset++] | d[this.offset++] << 8,
                colormap_size: d[this.offset++],
                origin: [d[this.offset++] | d[this.offset++] << 8, d[this.offset++] | d[this.offset++] << 8],
                width: d[this.offset++] | d[this.offset++] << 8,
                height: d[this.offset++] |
                d[this.offset++] << 8,
                pixel_size: d[this.offset++],
                flags: d[this.offset++]
            };
            this.checkHeader();
            if (this.header.id_length + this.offset > d.length)throw Error("Targa::load() - No data ?");
            this.offset += this.header.id_length;
            switch (this.header.image_type) {
                case g.TYPE_RLE_INDEXED:
                    this.use_rle = !0;
                    break;
                case g.TYPE_INDEXED:
                    this.use_pal = !0;
                    break;
                case g.TYPE_RLE_RGB:
                    this.use_rle = !0;
                    break;
                case g.TYPE_RGB:
                    this.use_rgb = !0;
                    break;
                case g.TYPE_RLE_GREY:
                    this.use_rle = !0;
                    break;
                case g.TYPE_GREY:
                    this.use_grey = !0
            }
            this.parse(d)
        };
        g.prototype.checkHeader = function () {
            switch (this.header.image_type) {
                case g.TYPE_INDEXED:
                case g.TYPE_RLE_INDEXED:
                    if (this.header.colormap_length > 256 || this.header.colormap_size !== 24 || this.header.colormap_type !== 1)throw Error("Targa::checkHeader() - Invalid type colormap data for indexed type");
                    break;
                case g.TYPE_RGB:
                case g.TYPE_GREY:
                case g.TYPE_RLE_RGB:
                case g.TYPE_RLE_GREY:
                    if (this.header.colormap_type)throw Error("Targa::checkHeader() - Invalid type colormap data for colormap type");
                    break;
                case g.TYPE_NO_DATA:
                    throw Error("Targa::checkHeader() - No data on this TGA file");
                default:
                    throw Error("Targa::checkHeader() - Invalid type '" + this.header.image_type + "'");
            }
            if (this.header.width <= 0 || this.header.height <= 0)throw Error("Targa::checkHeader() - Invalid image size");
            if (this.header.pixel_size !== 8 && this.header.pixel_size !== 16 && this.header.pixel_size !== 24 && this.header.pixel_size !== 32)throw Error("Targa::checkHeader() - Invalid pixel size '" + this.header.pixel_size + "'");
        };
        g.prototype.parse = function (d) {
            var h;
            var b, a, f;
            b = this.header;
            a = b.pixel_size >> 3;
            f = b.width * b.height * a;
            if (this.use_pal)this.palettes =
                d.subarray(this.offset, this.offset += b.colormap_length * a);
            if (this.use_rle) {
                b = new Uint8Array(f);
                for (var e, c, g = 0, j = new Uint8Array(a); g < f;)if (e = d[this.offset++], c = (e & 127) + 1, e & 128) {
                    for (e = 0; e < a; ++e)j[e] = d[this.offset++];
                    for (e = 0; e < c; ++e)b.set(j, g + e * a);
                    g += a * c
                } else {
                    c *= a;
                    for (e = 0; e < c; ++e)b[g + e] = d[this.offset++];
                    g += c
                }
            } else h = d.subarray(this.offset, this.offset += this.use_pal ? b.width * b.height : f), b = h;
            this.image = b
        };
        g.prototype.getImageData = function (d) {
            var b = this.header.width, a = this.header.height, f, e, c, i;
            i = d || document &&
                document.createElement("canvas").getContext("2d").createImageData(b, a) || {
                    width: b,
                    height: a,
                    data: new Uint8Array(b * a * 4)
                };
            switch ((this.header.flags & g.ORIGIN_MASK) >> g.ORIGIN_SHIFT) {
                default:
                case g.ORIGIN_UL:
                    d = 0;
                    f = 1;
                    c = b;
                    b = 0;
                    e = 1;
                    break;
                case g.ORIGIN_BL:
                    d = 0;
                    f = 1;
                    c = b;
                    b = a - 1;
                    a = e = -1;
                    break;
                case g.ORIGIN_UR:
                    d = b - 1;
                    c = f = -1;
                    b = 0;
                    e = 1;
                    break;
                case g.ORIGIN_BR:
                    d = b - 1, c = f = -1, b = a - 1, a = e = -1
            }
            this["getImageData" + (this.use_grey ? "Grey" : "") + this.header.pixel_size + "bits"](i.data, b, e, a, d, f, c);
            return i
        };
        g.prototype.getCanvas = function () {
            var d =
                document.createElement("canvas"), b = d.getContext("2d"), a = b.createImageData(this.header.width, this.header.height);
            d.width = this.header.width;
            d.height = this.header.height;
            b.putImageData(this.getImageData(a), 0, 0);
            return d
        };
        g.prototype.getDataURL = function (d) {
            return this.getCanvas().toDataURL(d || "image/png")
        };
        g.prototype.getImageData8bits = function (d, b, a, f, e, c, g) {
            var j = this.image, k = this.palettes, h = this.header.width, l = 0, n, q;
            for (q = b; q !== f; q += a)for (n = e; n !== g; n += c, l++)b = j[l], d[(n + h * q) * 4 + 3] = 255, d[(n + h * q) * 4 + 2] =
                k[b * 3 + 0], d[(n + h * q) * 4 + 1] = k[b * 3 + 1], d[(n + h * q) * 4 + 0] = k[b * 3 + 2];
            return d
        };
        g.prototype.getImageData16bits = function (d, b, a, f, e, c, g) {
            var j = this.image, k = this.header.width, h = 0, l, n;
            for (n = b; n !== f; n += a)for (l = e; l !== g; l += c, h += 2)b = j[h + 0] + (j[h + 1] << 8), d[(l + k * n) * 4 + 0] = (b & 31744) >> 7, d[(l + k * n) * 4 + 1] = (b & 992) >> 2, d[(l + k * n) * 4 + 2] = (b & 31) >> 3, d[(l + k * n) * 4 + 3] = b & 32768 ? 0 : 255;
            return d
        };
        g.prototype.getImageData24bits = function (d, b, a, f, e, c, g) {
            var j = this.image, k = this.header.width, h = 0, l;
            for (l = b; l !== f; l += a)for (b = e; b !== g; b += c, h += 3)d[(b + k * l) * 4 +
            3] = 255, d[(b + k * l) * 4 + 2] = j[h + 0], d[(b + k * l) * 4 + 1] = j[h + 1], d[(b + k * l) * 4 + 0] = j[h + 2];
            return d
        };
        g.prototype.getImageData32bits = function (d, b, a, f, e, c, g) {
            var j = this.image, k = this.header.width, h = 0, l;
            for (l = b; l !== f; l += a)for (b = e; b !== g; b += c, h += 4)d[(b + k * l) * 4 + 2] = j[h + 0], d[(b + k * l) * 4 + 1] = j[h + 1], d[(b + k * l) * 4 + 0] = j[h + 2], d[(b + k * l) * 4 + 3] = j[h + 3];
            return d
        };
        g.prototype.getImageDataGrey8bits = function (d, b, a, f, e, c, g) {
            var j = this.image, k = this.header.width, h = 0, l, n;
            for (n = b; n !== f; n += a)for (l = e; l !== g; l += c, h++)b = j[h], d[(l + k * n) * 4 + 0] = b, d[(l + k * n) *
            4 + 1] = b, d[(l + k * n) * 4 + 2] = b, d[(l + k * n) * 4 + 3] = 255;
            return d
        };
        g.prototype.getImageDataGrey16bits = function (d, b, a, f, e, c, g) {
            var j = this.image, k = this.header.width, h = 0, l;
            for (l = b; l !== f; l += a)for (b = e; b !== g; b += c, h += 2)d[(b + k * l) * 4 + 0] = j[h + 0], d[(b + k * l) * 4 + 1] = j[h + 0], d[(b + k * l) * 4 + 2] = j[h + 0], d[(b + k * l) * 4 + 3] = j[h + 1];
            return d
        };
        g.prototype.isSupported = function () {
            return !0
        };
        g.prototype.toString = function () {
            return "TgaLoader"
        };
        return g
    });
    o("goo/util/SimpleResourceUtil", [], function () {
        function g() {
        }

        g.countdown = function (d, b, a) {
            d[0]--;
            if (d[0] ===
                0)b.onSuccess(a)
        };
        g.loadTextAsset = function (d, b, a, f, e, c) {
            var i = new XMLHttpRequest;
            i.open("GET", a[b], !0);
            i.onreadystatechange = function () {
                if (i.readyState === 4)if (i.status >= 200 && i.status <= 299)e[f[b]] = i.responseText, g.countdown(d, c, e); else c.onError(i.statusText)
            };
            i.send()
        };
        g.loadTextAssets = function (d, b, a) {
            for (var f = [d.length], e = {}, c = 0, i = d.length; c < i; c++)g.loadTextAsset(f, c, d, b, e, a)
        };
        g.loadBinaryAsArrayBuffer = function (d, b) {
            var a = new XMLHttpRequest;
            a.open("GET", d);
            a.responseType = "arraybuffer";
            a.onload = function () {
                if (a.status !==
                    404)b.onSuccess(a.response); else a.onerror(null)
            };
            a.onerror = function () {
                b.onError(null)
            };
            a.send()
        };
        return g
    });
    o("goo/util/Latch", [], function () {
        function g(d, b) {
            this.count = d;
            this.callback = b
        }

        g.prototype.countDown = function () {
            this.count--;
            this.isDone() && this.callback && this.callback.done ? this.callback.done() : this.callback && this.callback.progress && this.callback.progress(this.count)
        };
        g.prototype.isDone = function () {
            return this.count === 0
        };
        return g
    });
    o("goo/renderer/TextureCreator", "goo/loaders/Loader,goo/renderer/Texture,goo/loaders/dds/DdsLoader,goo/loaders/tga/TgaLoader,goo/util/SimpleResourceUtil,goo/renderer/Util,goo/util/Latch".split(","),
        function (g, d, b, a, f, e, c) {
            function i(c) {
                c = c || {};
                this.verticalFlip = c.verticalFlip !== void 0 ? c.verticalFlip : !0;
                this._loader = c.loader !== void 0 ? c.loader : new g;
                this.textureLoaders = {".dds": new b, ".tga": new a}
            }

            function j(a, c) {
                return a.indexOf(c, a.length - c.length) !== -1
            }

            i.cache = {};
            i.UNSUPPORTED_FALLBACK = ".png";
            i.clearCache = function () {
                i.cache = {}
            };
            i.prototype.loadTexture2D = function (a, c, b) {
                if (i.cache[a] !== void 0)return b && b(), i.cache[a];
                var f = function (a) {
                    s.load(a, o, r.verticalFlip, 0, a.byteLength);
                    i._finishedLoading();
                    b && b()
                }.bind(this), q = function (c) {
                    console.warn("Error loading texture: " + a + " | " + c)
                }.bind(this), r = this, m;
                for (m in this.textureLoaders)if (j(a.toLowerCase(), m)) {
                    var s = this.textureLoaders[m];
                    if (!s || !s.isSupported()) {
                        a = a.substring(0, a.length - m.length);
                        a += i.UNSUPPORTED_FALLBACK;
                        c = c || {};
                        c.flipY = !1;
                        break
                    }
                    var o = new d(e.clone(i.DEFAULT_TEXTURE_2D.image), c);
                    o.image.dataReady = !1;
                    o.a = a;
                    i.cache[a] = o;
                    this._loader.load(a, null, g.ARRAY_BUFFER).then(f, q);
                    return o
                }
                if (i.cache[a] !== void 0)return b && b(), i.cache[a];
                var p =
                    new d(null, c);
                i.cache[a] = p;
                this._loader.loadImage(a).then(function (a) {
                    p.setImage(a);
                    i._finishedLoading(a);
                    b && b()
                }).then(null, function (a) {
                    console.error(a)
                });
                return p
            };
            i.prototype.loadTextureVideo = function (a, c) {
                if (i.cache[a] !== void 0)return i.cache[a];
                var b = document.createElement("video");
                b.loop = typeof c === "boolean" ? c : !0;
                b.addEventListener("error", function () {
                    console.warn("Couldn't load video URL [" + a + "]")
                }, !1);
                var f = new d(b, {wrapS: "EdgeClamp", wrapT: "EdgeClamp"});
                f.readyCallback = function () {
                    if (b.readyState >=
                        3) {
                        console.log("Video ready: " + b.videoWidth + ", " + b.videoHeight);
                        b.width = b.videoWidth;
                        b.height = b.videoHeight;
                        if (e.isPowerOfTwo(b.width) === !1 || e.isPowerOfTwo(b.height) === !1)f.generateMipmaps = !1, f.minFilter = "BilinearNoMipMaps";
                        b.play();
                        return b.dataReady = !0
                    }
                    return !1
                };
                f.updateCallback = function () {
                    return !b.paused
                };
                b.crossOrigin = "anonymous";
                b.src = a;
                return i.cache[a] = f
            };
            i.prototype.loadTextureWebCam = function () {
                var a = document.createElement("video");
                a.autoplay = !0;
                a.loop = !0;
                var c = new d(a, {
                    wrapS: "EdgeClamp",
                    wrapT: "EdgeClamp"
                });
                c.readyCallback = function () {
                    if (a.readyState >= 3) {
                        console.log("WebCam video ready: " + a.videoWidth + ", " + a.videoHeight);
                        a.width = a.videoWidth;
                        a.height = a.videoHeight;
                        if (e.isPowerOfTwo(a.width) === !1 || e.isPowerOfTwo(a.height) === !1)c.generateMipmaps = !1, c.minFilter = "BilinearNoMipMaps";
                        return a.dataReady = !0
                    }
                    return !1
                };
                c.updateCallback = function () {
                    return !a.paused
                };
                window.URL = window.URL || window.webkitURL;
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia;
                navigator.getUserMedia ? navigator.getUserMedia({video: !0}, function (c) {
                    a.src = window.URL.createObjectURL(c)
                }, function (a) {
                    console.warn("Unable to capture WebCam. Please reload the page.", a)
                }) : console.warn("No support for WebCam getUserMedia found!");
                return c
            };
            i.prototype.loadTextureCube = function (a, b) {
                var e = new d(null, b);
                e.variant = "CUBE";
                for (var f = [], g = new c(6, {
                    done: function () {
                        for (var a = f[0].width, c = f[0].height, b = 0; b < 6; b++) {
                            var d = f[b];
                            if (a !== d.width || c !== d.height)e.generateMipmaps = !1, e.minFilter = "BilinearNoMipMaps", console.error("Images not all the same size!")
                        }
                        e.setImage(f);
                        e.image.dataReady = !0;
                        e.image.width = a;
                        e.image.height = c
                    }
                }), i = this, j = 0; j < a.length; j++)(function (c) {
                    var b = a[c];
                    typeof b === "string" ? i._loader.loadImage(b).then(function (a) {
                        f[c] = a;
                        g.countDown()
                    }) : (f[c] = b, g.countDown())
                })(j);
                return e
            };
            i._globalCallback = null;
            i._finishedLoading = function (a) {
                if (i._globalCallback)try {
                    i._globalCallback(a)
                } catch (c) {
                    console.error("Error in texture callback:", c)
                }
            };
            f = new Uint8Array([255,
                255, 255, 255]);
            i.DEFAULT_TEXTURE_2D = new d(f, null, 1, 1);
            i.DEFAULT_TEXTURE_CUBE = new d([f, f, f, f, f, f], null, 1, 1);
            i.DEFAULT_TEXTURE_CUBE.variant = "CUBE";
            return i
        });
    o("goo/renderer/pass/RenderTarget", ["goo/math/Vector2"], function (g) {
        function d(b, a, f) {
            this._glFrameBuffer = this._glRenderBuffer = this.glTexture = null;
            this.width = Math.floor(b);
            this.height = Math.floor(a);
            f = f || {};
            this.wrapS = f.wrapS !== void 0 ? f.wrapS : "EdgeClamp";
            this.wrapT = f.wrapT !== void 0 ? f.wrapT : "EdgeClamp";
            this.magFilter = f.magFilter !== void 0 ? f.magFilter :
                "Bilinear";
            this.minFilter = f.minFilter !== void 0 ? f.minFilter : "BilinearNoMipMaps";
            this.anisotropy = f.anisotropy !== void 0 ? f.anisotropy : 1;
            this.offset = new g(0, 0);
            this.repeat = new g(1, 1);
            this.format = f.format !== void 0 ? f.format : "RGBA";
            this.type = f.type !== void 0 ? f.type : "UnsignedByte";
            this.variant = "2D";
            this.depthBuffer = f.depthBuffer !== void 0 ? f.depthBuffer : !0;
            this.stencilBuffer = f.stencilBuffer !== void 0 ? f.stencilBuffer : !0;
            this.generateMipmaps = !1
        }

        d.prototype.clone = function () {
            var b = new d(this.width, this.height);
            b.wrapS =
                this.wrapS;
            b.wrapT = this.wrapT;
            b.magFilter = this.magFilter;
            b.anisotropy = this.anisotropy;
            b.minFilter = this.minFilter;
            b.offset.copy(this.offset);
            b.repeat.copy(this.repeat);
            b.format = this.format;
            b.type = this.type;
            b.variant = this.variant;
            b.depthBuffer = this.depthBuffer;
            b.stencilBuffer = this.stencilBuffer;
            b.generateMipmaps = this.generateMipmaps;
            return b
        };
        return d
    });
    o("goo/shapes/Box", ["goo/renderer/MeshData"], function (g) {
        function d(b, a, f, e, c) {
            this.xExtent = b !== void 0 ? b * 0.5 : 0.5;
            this.yExtent = a !== void 0 ? a * 0.5 : 0.5;
            this.zExtent = f !== void 0 ? f * 0.5 : 0.5;
            this.tileX = e || 1;
            this.tileY = c || 1;
            b = g.defaultMap([g.POSITION, g.NORMAL, g.TEXCOORD0]);
            g.call(this, b, 24, 36);
            this.rebuild()
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.rebuild = function () {
            var b = this.xExtent, a = this.yExtent, f = this.zExtent, e = this.tileX, c = this.tileY, d = [-b, -a, -f, b, -a, -f, b, a, -f, -b, a, -f, b, -a, f, -b, -a, f, b, a, f, -b, a, f], j = [];
            (function (a) {
                for (var c = 0; c < a.length; c++) {
                    var b = a[c] * 3;
                    j.push(d[b]);
                    j.push(d[b + 1]);
                    j.push(d[b + 2])
                }
            })([0, 1, 2, 3, 1, 4, 6, 2, 4, 5, 7, 6, 5, 0, 3, 7, 2,
                6, 7, 3, 0, 5, 4, 1]);
            this.getAttributeBuffer(g.POSITION).set(j);
            var k = [0, 0, -1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 1, 0, 0, -1, 0], h = [];
            (function () {
                for (var a = 0; a < k.length / 3; a++)for (var c = 0; c < 4; c++) {
                    var b = a * 3;
                    h.push(k[b]);
                    h.push(k[b + 1]);
                    h.push(k[b + 2])
                }
            })();
            this.getAttributeBuffer(g.NORMAL).set(h);
            b = [];
            for (a = 0; a < 6; a++)b.push(e), b.push(0), b.push(0), b.push(0), b.push(0), b.push(c), b.push(e), b.push(c);
            this.getAttributeBuffer(g.TEXCOORD0).set(b);
            this.getIndexBuffer().set([2, 1, 0, 3, 2, 0, 6, 5, 4, 7, 6, 4, 10, 9, 8, 11, 10, 8, 14, 13, 12, 15, 14, 12,
                18, 17, 16, 19, 18, 16, 22, 21, 20, 23, 22, 20]);
            return this
        };
        return d
    });
    o("goo/shapes/Quad", ["goo/renderer/MeshData"], function (g) {
        function d(b, a, f, e) {
            this.xExtent = b !== void 0 ? b * 0.5 : 0.5;
            this.yExtent = a !== void 0 ? a * 0.5 : 0.5;
            this.tileX = f || 1;
            this.tileY = e || 1;
            b = g.defaultMap([g.POSITION, g.NORMAL, g.TEXCOORD0]);
            g.call(this, b, 4, 6);
            this.rebuild()
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.rebuild = function () {
            var b = this.xExtent, a = this.yExtent, f = this.tileX, e = this.tileY;
            this.getAttributeBuffer(g.POSITION).set([-b, -a,
                0, -b, a, 0, b, a, 0, b, -a, 0]);
            this.getAttributeBuffer(g.NORMAL).set([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
            this.getAttributeBuffer(g.TEXCOORD0).set([0, 0, 0, e, f, e, f, 0]);
            this.getIndexBuffer().set([0, 3, 1, 1, 3, 2]);
            return this
        };
        return d
    });
    o("goo/util/Enum", [], function () {
        function g(a, b) {
            Object.getOwnPropertyNames(b).forEach(function (e) {
                Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(b, e))
            });
            return a
        }

        function d(a, b) {
            this.name = a;
            b && g(this, b);
            Object.freeze(this)
        }

        function b(a) {
            arguments.length === 1 && a !== null && typeof a ===
            "object" ? Object.keys(a).forEach(function (b) {
                this[b] = new d(b, a[b])
            }, this) : Array.prototype.forEach.call(arguments, function (a) {
                this[a] = new d(a)
            }, this);
            Object.freeze(this)
        }

        d.prototype = Object.create(null);
        d.prototype.constructor = d;
        d.prototype.toString = function () {
            return "|" + this.name + "|"
        };
        Object.freeze(d.prototype);
        b.prototype.symbols = function () {
            return Object.keys(this).map(function (a) {
                return this[a]
            }, this)
        };
        b.prototype.contains = function (a) {
            return !a instanceof d ? !1 : this[a.name] === a
        };
        return b
    });
    o("goo/shapes/Sphere",
        ["goo/renderer/MeshData", "goo/util/Enum", "goo/math/Vector3", "goo/math/MathUtils"], function (g, d, b, a) {
            function f(a, b, e, d) {
                this.zSamples = (a !== void 0 ? a : 8) + 1;
                this.radialSamples = b !== void 0 ? b : 8;
                this.radius = e !== void 0 ? e : 0.5;
                this.textureMode = d !== void 0 ? d : f.TextureModes.Polar;
                this.viewInside = !1;
                a = g.defaultMap([g.POSITION, g.NORMAL, g.TEXCOORD0]);
                b = this.textureMode === f.TextureModes.Chromeball ? this.zSamples + 1 : this.zSamples;
                g.call(this, a, (b - 2) * (this.radialSamples + 1) + 2, 6 * (b - 2) * this.radialSamples);
                this.rebuild()
            }

            function e(a, b, e) {
                a[e * 3 + 0] = a[b * 3 + 0];
                a[e * 3 + 1] = a[b * 3 + 1];
                a[e * 3 + 2] = a[b * 3 + 2]
            }

            f.prototype = Object.create(g.prototype);
            f.prototype.rebuild = function () {
                for (var c = this.getAttributeBuffer(g.POSITION), d = this.getAttributeBuffer(g.NORMAL), j = this.getAttributeBuffer(g.TEXCOORD0), k = this.getIndexBuffer(), h = 1 / this.radialSamples, l = 2 / (this.zSamples - 1), n = [], q = [], r = 0; r < this.radialSamples; r++) {
                    var m = a.TWO_PI * h * r;
                    q[r] = Math.cos(m);
                    n[r] = Math.sin(m)
                }
                n[this.radialSamples] = n[0];
                q[this.radialSamples] = q[0];
                for (var m = 0, s = new b, o =
                    new b, p = new b, w = 1; w < this.zSamples - 1; w++) {
                    var y = a.HALF_PI * (-1 + l * w), t = Math.sin(y), r = this.radius * t, u = o.set(0, 0, 0);
                    u.z += r;
                    for (var A = Math.sqrt(Math.abs(this.radius * this.radius - r * r)), v, C = m, r = 0; r < this.radialSamples; r++) {
                        var z = r * h;
                        v = p.set(q[r], n[r], 0);
                        b.mul(v, A, s);
                        c[m * 3 + 0] = u.x + s.x;
                        c[m * 3 + 1] = u.y + s.y;
                        c[m * 3 + 2] = u.z + s.z;
                        v = s.set(c[m * 3 + 0], c[m * 3 + 1], c[m * 3 + 2]);
                        v.normalize();
                        this.viewInside ? (d[m * 3 + 0] = -v.x, d[m * 3 + 1] = -v.y, d[m * 3 + 2] = -v.z) : (d[m * 3 + 0] = v.x, d[m * 3 + 1] = v.y, d[m * 3 + 2] = v.z);
                        this.textureMode === f.TextureModes.Linear ? (j[m *
                        2 + 0] = z, j[m * 2 + 1] = 0.5 * (t + 1)) : this.textureMode === f.TextureModes.Projected ? (j[m * 2 + 0] = z, j[m * 2 + 1] = (a.HALF_PI + Math.asin(t)) / Math.PI) : this.textureMode === f.TextureModes.Polar ? (z = (a.HALF_PI - Math.abs(y)) / Math.PI, v = z * q[r] + 0.5, z = z * n[r] + 0.5, j[m * 2 + 0] = v, j[m * 2 + 1] = z) : this.textureMode === f.TextureModes.Chromeball && (z = Math.sin((a.HALF_PI + y) / 2), z /= 2, v = z * q[r] + 0.5, z = z * n[r] + 0.5, j[m * 2 + 0] = v, j[m * 2 + 1] = z);
                        m++
                    }
                    e(c, C, m);
                    e(d, C, m);
                    this.textureMode === f.TextureModes.Linear ? (j[m * 2 + 0] = 1, j[m * 2 + 1] = 0.5 * (t + 1)) : this.textureMode === f.TextureModes.Projected ?
                        (j[m * 2 + 0] = 1, j[m * 2 + 1] = (a.HALF_PI + Math.asin(t)) / Math.PI) : this.textureMode === f.TextureModes.Polar ? (z = (a.HALF_PI - Math.abs(y)) / Math.PI, j[m * 2 + 0] = z + 0.5, j[m * 2 + 1] = 0.5) : this.textureMode === f.TextureModes.Chromeball && (z = Math.sin((a.HALF_PI + y) / 2), z /= 2, j[m * 2 + 0] = z + 0.5, j[m * 2 + 1] = 0.5);
                    m++
                }
                if (this.textureMode === f.TextureModes.Chromeball) {
                    w = a.HALF_PI - 0.0010;
                    h = this.radius * Math.sin(w);
                    l = Math.sqrt(Math.abs(this.radius * this.radius - h * h));
                    C = m;
                    for (r = 0; r < this.radialSamples; r++)c[m * 3 + 0] = l * q[r], c[m * 3 + 1] = l * n[r], c[m * 3 + 2] = h, v = s.set(c[m *
                    3 + 0], c[m * 3 + 1], c[m * 3 + 2]), v.normalize(), this.viewInside ? (d[m * 3 + 0] = -v.x, d[m * 3 + 1] = -v.y, d[m * 3 + 2] = -v.z) : (d[m * 3 + 0] = v.x, d[m * 3 + 1] = v.y, d[m * 3 + 2] = v.z), z = Math.sin((a.HALF_PI + w) / 2), z /= 2, v = z * q[r] + 0.5, z = z * n[r] + 0.5, j[m * 2 + 0] = v, j[m * 2 + 1] = z, m++;
                    e(c, C, m);
                    e(d, C, m);
                    z = Math.sin((a.HALF_PI + w) / 2);
                    z /= 2;
                    j[m * 2 + 0] = z + 0.5;
                    j[m * 2 + 1] = 0.5;
                    m++
                }
                c[m * 3 + 0] = 0;
                c[m * 3 + 1] = 0;
                c[m * 3 + 2] = -this.radius;
                this.viewInside ? (d[m * 3 + 0] = 0, d[m * 3 + 1] = 0, d[m * 3 + 2] = 1) : (d[m * 3 + 0] = 0, d[m * 3 + 1] = 0, d[m * 3 + 2] = -1);
                this.textureMode === f.TextureModes.Polar || this.textureMode === f.TextureModes.Chromeball ?
                    (j[m * 2 + 0] = 0.5, j[m * 2 + 1] = 0.5) : (j[m * 2 + 0] = 0.5, j[m * 2 + 1] = 0);
                m++;
                c[m * 3 + 0] = 0;
                c[m * 3 + 1] = 0;
                c[m * 3 + 2] = this.radius;
                this.viewInside ? (d[m * 3 + 0] = 0, d[m * 3 + 1] = 0, d[m * 3 + 2] = -1) : (d[m * 3 + 0] = 0, d[m * 3 + 1] = 0, d[m * 3 + 2] = 1);
                this.textureMode === f.TextureModes.Polar ? (j[m * 2 + 0] = 0.5, j[m * 2 + 1] = 0.5) : this.textureMode === f.TextureModes.Chromeball ? (j[m * 2 + 0] = 1, j[m * 2 + 1] = -0.5) : (j[m * 2 + 0] = 0.5, j[m * 2 + 1] = 1);
                c = 0;
                d = this.textureMode === f.TextureModes.Chromeball ? this.zSamples + 1 : this.zSamples;
                for (j = w = 0; w < d - 3; w++) {
                    n = j;
                    q = n + 1;
                    j += this.radialSamples + 1;
                    r = j;
                    s = r + 1;
                    for (m =
                             0; m < this.radialSamples; m++)this.viewInside ? (k[c++] = n++, k[c++] = r, k[c++] = q, k[c++] = q++, k[c++] = r++, k[c++] = s++) : (k[c++] = n++, k[c++] = q, k[c++] = r, k[c++] = q++, k[c++] = s++, k[c++] = r++)
                }
                for (m = 0; m < this.radialSamples; m++)this.viewInside ? (k[c++] = m, k[c++] = m + 1, k[c++] = this.vertexCount - 2) : (k[c++] = m, k[c++] = this.vertexCount - 2, k[c++] = m + 1);
                w = (d - 3) * (this.radialSamples + 1);
                for (m = 0; m < this.radialSamples; m++)this.viewInside ? (k[c++] = m + w, k[c++] = this.vertexCount - 1, k[c++] = m + 1 + w) : (k[c++] = m + w, k[c++] = m + 1 + w, k[c++] = this.vertexCount - 1);
                return this
            };
            f.TextureModes = new d("Linear", "Projected", "Polar", "Chromeball");
            return f
        });
    o("goo/shapes/Cylinder", ["goo/renderer/MeshData", "goo/util/Enum", "goo/math/Vector3", "goo/math/MathUtils"], function (g, d, b, a) {
        function f(a, b, e) {
            this.radialSamples = a !== void 0 ? a : 8;
            this.radius = b !== void 0 ? b : 0.5;
            this.textureMode = e !== void 0 ? e : f.TextureModes.Polar;
            this.viewInside = !1;
            a = g.defaultMap([g.POSITION, g.NORMAL, g.TEXCOORD0]);
            g.call(this, a, 2 * (this.radialSamples + 1) + 2, 12 * this.radialSamples);
            this.rebuild()
        }

        function e(a, b, e) {
            a[e *
            3 + 0] = a[b * 3 + 0];
            a[e * 3 + 1] = a[b * 3 + 1];
            a[e * 3 + 2] = a[b * 3 + 2]
        }

        f.prototype = Object.create(g.prototype);
        f.prototype.rebuild = function () {
            for (var c = this.getAttributeBuffer(g.POSITION), d = this.getAttributeBuffer(g.NORMAL), j = this.getAttributeBuffer(g.TEXCOORD0), k = this.getIndexBuffer(), h = 1 / this.radialSamples, l = 2 / 3, n = [], q = [], r = 0; r < this.radialSamples; r++) {
                var m = a.TWO_PI * h * r;
                q[r] = Math.cos(m);
                n[r] = Math.sin(m)
            }
            n[this.radialSamples] = n[0];
            q[this.radialSamples] = q[0];
            for (var m = 0, s = new b, o = new b, p = new b, w = 1; w < 3; w++) {
                var y = a.HALF_PI *
                    (-1 + l * w), t = Math.sin(y), r = this.radius * t, u = o.set(0, 0, 0);
                u.z = w - 1.5;
                for (var A = Math.sqrt(Math.abs(this.radius * this.radius - r * r)), v, C = m, r = 0; r < this.radialSamples; r++) {
                    var z = r * h;
                    v = p.set(q[r], n[r], 0);
                    b.mul(v, A, s);
                    c[m * 3 + 0] = u.x + s.x;
                    c[m * 3 + 1] = u.y + s.y;
                    c[m * 3 + 2] = u.z + s.z;
                    v = s.set(c[m * 3 + 0], c[m * 3 + 1], c[m * 3 + 2]);
                    v.normalize();
                    this.viewInside ? (d[m * 3 + 0] = -v.x, d[m * 3 + 1] = -v.y, d[m * 3 + 2] = -v.z) : (d[m * 3 + 0] = v.x, d[m * 3 + 1] = v.y, d[m * 3 + 2] = v.z);
                    this.textureMode === f.TextureModes.Linear ? (j[m * 2 + 0] = z, j[m * 2 + 1] = 0.5 * (t + 1)) : this.textureMode === f.TextureModes.Projected ?
                        (j[m * 2 + 0] = z, j[m * 2 + 1] = a.HALF_PI + Math.asin(t) / Math.PI) : this.textureMode === f.TextureModes.Polar && (z = (a.HALF_PI - Math.abs(y)) / Math.PI, v = z * n[r] + 0.5, j[m * 2 + 0] = z * q[r] + 0.5, j[m * 2 + 1] = v);
                    m++
                }
                e(c, C, m);
                e(d, C, m);
                this.textureMode === f.TextureModes.Linear ? (j[m * 2 + 0] = 1, j[m * 2 + 1] = 0.5 * (t + 1)) : this.textureMode === f.TextureModes.Projected ? (j[m * 2 + 0] = 1, j[m * 2 + 1] = a.INV_PI * (a.HALF_PI + Math.asin(t))) : this.textureMode === f.TextureModes.Polar && (z = (a.HALF_PI - Math.abs(y)) / Math.PI, j[m * 2 + 0] = z + 0.5, j[m * 2 + 1] = 0.5);
                m++
            }
            c[m * 3 + 0] = 0;
            c[m * 3 + 1] = 0;
            c[m *
            3 + 2] = -0.5;
            this.viewInside ? (d[m * 3 + 0] = 0, d[m * 3 + 1] = 0, d[m * 3 + 2] = 1) : (d[m * 3 + 0] = 0, d[m * 3 + 1] = 0, d[m * 3 + 2] = -1);
            this.textureMode === f.TextureModes.Polar ? (j[m * 2 + 0] = 0.5, j[m * 2 + 1] = 0.5) : (j[m * 2 + 0] = 0.5, j[m * 2 + 1] = 0);
            m++;
            c[m * 3 + 0] = 0;
            c[m * 3 + 1] = 0;
            c[m * 3 + 2] = 0.5;
            this.viewInside ? (d[m * 3 + 0] = 0, d[m * 3 + 1] = 0, d[m * 3 + 2] = -1) : (d[m * 3 + 0] = 0, d[m * 3 + 1] = 0, d[m * 3 + 2] = 1);
            this.textureMode === f.TextureModes.Polar ? (j[m * 2 + 0] = 0.5, j[m * 2 + 1] = 0.5) : (j[m * 2 + 0] = 0.5, j[m * 2 + 1] = 1);
            d = m = c = 0;
            j = d + 1;
            m += this.radialSamples + 1;
            h = m;
            l = h + 1;
            for (m = 0; m < this.radialSamples; m++)this.viewInside ?
                (k[c++] = d++, k[c++] = h, k[c++] = j, k[c++] = j++, k[c++] = h++, k[c++] = l++) : (k[c++] = d++, k[c++] = j, k[c++] = h, k[c++] = j++, k[c++] = l++, k[c++] = h++);
            for (m = 0; m < this.radialSamples; m++)this.viewInside ? (k[c++] = m, k[c++] = m + 1, k[c++] = this.vertexCount - 2) : (k[c++] = m, k[c++] = this.vertexCount - 2, k[c++] = m + 1);
            d = this.radialSamples + 1;
            for (m = 0; m < this.radialSamples; m++)this.viewInside ? (k[c++] = m + d, k[c++] = this.vertexCount - 1, k[c++] = m + 1 + d) : (k[c++] = m + d, k[c++] = m + 1 + d, k[c++] = this.vertexCount - 1);
            return this
        };
        f.TextureModes = new d("Linear", "Projected",
            "Polar");
        return f
    });
    o("goo/shapes/Torus", ["goo/renderer/MeshData", "goo/math/Vector3", "goo/math/MathUtils"], function (g, d, b) {
        function a(a, c, b, f) {
            this._circleSamples = a !== void 0 ? a : 8;
            this._radialSamples = c !== void 0 ? c : 8;
            this._tubeRadius = b !== void 0 ? b : 1;
            this._centerRadius = f !== void 0 ? f : 2;
            this.viewInside = !1;
            a = g.defaultMap([g.POSITION, g.NORMAL, g.TEXCOORD0]);
            g.call(this, a, (this._circleSamples + 1) * (this._radialSamples + 1), 6 * this._circleSamples * this._radialSamples);
            this.rebuild()
        }

        function f(a, c, b) {
            a[b * 3 + 0] = a[c * 3 +
            0];
            a[b * 3 + 1] = a[c * 3 + 1];
            a[b * 3 + 2] = a[c * 3 + 2]
        }

        a.prototype = Object.create(g.prototype);
        a.prototype.rebuild = function () {
            for (var a = this.getAttributeBuffer(g.POSITION), c = this.getAttributeBuffer(g.NORMAL), i = this.getAttributeBuffer(g.TEXCOORD0), j = this.getIndexBuffer(), k = 1 / this._circleSamples, h = 1 / this._radialSamples, l = 0, n = new d, q = new d, r = new d, m = 0; m < this._circleSamples; m++) {
                var s = m * k, o = b.TWO_PI * s, p = Math.cos(o), o = Math.sin(o);
                n.set(p, o, 0);
                d.mul(n, this._centerRadius, q);
                p = l;
                for (o = 0; o < this._radialSamples; o++) {
                    var w = o *
                        h, y = b.TWO_PI * w, t = Math.cos(y), y = Math.sin(y);
                    r.copy(n).mul(t);
                    r.z += y;
                    r.normalize();
                    this.viewInside ? (c[l * 3 + 0] = -r.x, c[l * 3 + 1] = -r.y, c[l * 3 + 2] = -r.z) : (c[l * 3 + 0] = r.x, c[l * 3 + 1] = r.y, c[l * 3 + 2] = r.z);
                    r.mul(this._tubeRadius).add(q);
                    a[l * 3 + 0] = r.x;
                    a[l * 3 + 1] = r.y;
                    a[l * 3 + 2] = r.z;
                    i[l * 2 + 0] = w;
                    i[l * 2 + 1] = s;
                    l++
                }
                f(a, p, l);
                f(c, p, l);
                i[l * 2 + 0] = 1;
                i[l * 2 + 1] = s;
                l++
            }
            for (m = 0; m <= this._radialSamples; m++, l++)f(a, m, l), f(c, m, l), k = i, h = m, n = l, k[n * 2 + 0] = k[h * 2 + 0], k[n * 2 + 1] = k[h * 2 + 1], i[l * 2 + 1] = 1;
            for (m = c = a = 0; m < this._circleSamples; m++) {
                i = c;
                k = i + 1;
                c += this._radialSamples +
                    1;
                h = c;
                n = h + 1;
                for (l = 0; l < this._radialSamples; l++)this.viewInside ? (j[a++] = i++, j[a++] = k, j[a++] = h, j[a++] = k++, j[a++] = n++, j[a++] = h++) : (j[a++] = i++, j[a++] = h, j[a++] = k, j[a++] = k++, j[a++] = h++, j[a++] = n++)
            }
            return this
        };
        return a
    });
    o("goo/shapes/ShapeCreator", ["goo/shapes/Box", "goo/shapes/Quad", "goo/shapes/Sphere", "goo/shapes/Cylinder", "goo/shapes/Torus"], function (g, d, b, a, f) {
        function e() {
        }

        e.createQuad = function (a, b, e, f) {
            return new d(a, b, e, f)
        };
        e.createBox = function (a, b, e, f, d) {
            return new g(a, b, e, f, d)
        };
        e.createSphere = function (a,
                                   e, f, d) {
            return new b(a, e, f, d)
        };
        e.createCylinder = function (c, b, e) {
            return new a(c, b, e)
        };
        e.createTorus = function (a, b, e, d) {
            return new f(a, b, e, d)
        };
        return e
    });
    o("goo/renderer/pass/FullscreenUtil", ["goo/shapes/ShapeCreator", "goo/renderer/Camera", "goo/math/Vector3"], function (g, d, b) {
        function a() {
        }

        var f = new d;
        f.projectionMode = d.Parallel;
        f.setFrustum(-1, 1, -1, 1, 1, -1);
        f._left.copy(b.UNIT_X).invert();
        f._up.copy(b.UNIT_Y);
        f._direction.copy(b.UNIT_Z);
        f.onFrameChange();
        a.camera = f;
        a.quad = g.createQuad(2, 2);
        return a
    });
    o("goo/renderer/pass/FullscreenPass", ["goo/renderer/Material", "goo/renderer/pass/FullscreenUtil", "goo/renderer/shaders/ShaderLib"], function (g, d, b) {
        function a(a) {
            this.material = g.createMaterial(a || b.simple);
            this.useReadBuffer = !0;
            this.renderToScreen = !1;
            this.renderable = {meshData: d.quad, materials: [this.material]};
            this.enabled = !0;
            this.clear = !1;
            this.needsSwap = !0
        }

        a.prototype.render = function (a, b, c) {
            this.useReadBuffer && this.material.setTexture("DIFFUSE_MAP", c);
            this.renderToScreen ? a.render(this.renderable, d.camera,
                [], null, this.clear) : a.render(this.renderable, d.camera, [], b, this.clear)
        };
        return a
    });
    o("goo/renderer/shadow/ShadowHandler", "goo/math/Vector3,goo/renderer/pass/FullscreenPass,goo/renderer/Camera,goo/renderer/Material,goo/renderer/shaders/ShaderLib,goo/renderer/pass/RenderTarget,goo/math/Vector4".split(","), function (g, d, b, a, f, e, c) {
        function i() {
            this.shadowY = this.shadowX = 512;
            this.shadowSettings = {type: "Blur", projection: "Perspective", fov: 55, size: 100, near: 1, far: 1E3};
            this.lightCam = new b(this.shadowSettings.fov,
                1, this.shadowSettings.near, this.shadowSettings.far);
            this.currentSettings = this.shadowSettings;
            this.depthMaterial = a.createMaterial(f.lightDepth, "depthMaterial");
            this.shadowTarget = new e(this.shadowX, this.shadowY, {type: "Float"});
            this.shadowTargetDown = new e(this.shadowX / 2, this.shadowY / 2, {type: "Float"});
            this.shadowResult = this.shadowBlurred = new e(this.shadowX / 2, this.shadowY / 2, {type: "Float"});
            this.fullscreenPass = new d;
            this.downsample = a.createShader(f.downsample, "downsample");
            this.boxfilter = a.createShader(f.boxfilter,
                "boxfilter");
            this.boxfilter.uniforms.viewport = [this.shadowX / 2, this.shadowY / 2];
            this.oldClearColor = new c(0, 0, 0, 0);
            this.shadowClearColor = new c(1, 1, 1, 1);
            this.renderList = [];
            this.shadowList = [];
            this.upVector = g.UNIT_Z;
            this.tmpVec = new g
        }

        i.prototype._testStatesEqual = function (a, c) {
            for (var b in a)if (a[b] !== c[b])return !1;
            return !0
        };
        i.prototype.checkShadowRendering = function (a, c, e, f) {
            for (var d = a.shadowCount = 0; d < f.length; d++) {
                var i = f[d];
                if (i.shadowCaster) {
                    var r = this.lightCam;
                    r.translation.copy(i.translation);
                    i.direction ?
                        (this.tmpVec.setv(i.translation).addv(i.direction), r.lookAt(this.tmpVec, this.upVector)) : r.lookAt(g.ZERO, g.UNIT_Y);
                    if (!this._testStatesEqual(this.currentSettings, i.shadowSettings)) {
                        if (i.shadowSettings.projection === "Perspective")r.setFrustumPerspective(i.shadowSettings.fov, 1, i.shadowSettings.near, i.shadowSettings.far); else if (i.shadowSettings.projection === "Parallel") {
                            var m = i.shadowSettings.size;
                            r.setFrustum(i.shadowSettings.near, i.shadowSettings.far, -m, m, m, -m);
                            r.projectionMode = b.Parallel
                        }
                        r.update();
                        i.shadowSettings.type === "Blur" ? (this.depthMaterial.cullState.cullFace = "Back", this.depthMaterial.shader.defines.SHADOW_TYPE = 1) : this.depthMaterial.shader.defines.SHADOW_TYPE = 0;
                        for (var s in i.shadowSettings)this.currentSettings[s] = i.shadowSettings[s];
                        console.log("updated light")
                    }
                    r.onFrameChange();
                    this.oldClearColor.copy(a.clearColor);
                    a.setClearColor(this.shadowClearColor.r, this.shadowClearColor.g, this.shadowClearColor.b, this.shadowClearColor.a);
                    for (m = this.shadowList.length = 0; m < e.length; m++) {
                        var o = e[m];
                        o.meshRendererComponent && o.meshRendererComponent.castShadows && this.shadowList.push(o)
                    }
                    c.process(r, this.shadowList, this.renderList);
                    a.render(this.renderList, r, [], this.shadowTarget, !0, this.depthMaterial);
                    switch (i.shadowSettings.type) {
                        case "Blur":
                            this.fullscreenPass.material.shader = this.downsample;
                            this.fullscreenPass.render(a, this.shadowTargetDown, this.shadowTarget, 0);
                            this.fullscreenPass.material.shader = this.boxfilter;
                            this.fullscreenPass.render(a, this.shadowBlurred, this.shadowTargetDown, 0);
                            this.shadowResult =
                                this.shadowBlurred;
                            break;
                        case "None":
                            this.shadowResult = this.shadowTarget;
                            break;
                        default:
                            this.shadowResult = this.shadowTarget
                    }
                    a.setClearColor(this.oldClearColor.r, this.oldClearColor.g, this.oldClearColor.b, this.oldClearColor.a);
                    a.shadowCount++
                }
            }
        };
        return i
    });
    o("goo/renderer/Renderer", "goo/renderer/RendererRecord,goo/renderer/Util,goo/renderer/TextureCreator,goo/renderer/pass/RenderTarget,goo/math/Vector4,goo/entities/Entity,goo/renderer/Texture,goo/loaders/dds/DdsLoader,goo/loaders/dds/DdsUtils,goo/renderer/MeshData,goo/renderer/Material,goo/renderer/Shader,goo/math/Transform,goo/renderer/RenderQueue,goo/renderer/shaders/ShaderLib,goo/renderer/shadow/ShadowHandler".split(","),
        function (g, d, b, a, f, e, c, i, j, k, h, l, n, q, r, m) {
            function s(a) {
                var a = a || {}, c = a.canvas;
                if (c === void 0)c = document.createElement("canvas"), c.width = 500, c.height = 500;
                this.domElement = c;
                this._alpha = a.alpha !== void 0 ? a.alpha : !1;
                this._premultipliedAlpha = a.premultipliedAlpha !== void 0 ? a.premultipliedAlpha : !0;
                this._antialias = a.antialias !== void 0 ? a.antialias : !1;
                this._stencil = a.stencil !== void 0 ? a.stencil : !1;
                this._preserveDrawingBuffer = a.preserveDrawingBuffer !== void 0 ? a.preserveDrawingBuffer : !1;
                this._onError = a.onError;
                var b =
                {
                    alpha: this._alpha,
                    premultipliedAlpha: this._premultipliedAlpha,
                    antialias: this._antialias,
                    stencil: this._stencil,
                    preserveDrawingBuffer: this._preserveDrawingBuffer
                };
                this.context = null;
                if (window.WebGLRenderingContext) {
                    for (var e = ["experimental-webgl", "webgl", "moz-webgl", "webkit-3d"], d = 0; d < e.length; d++)try {
                        if ((this.context = c.getContext(e[d], b)) && typeof this.context.getParameter === "function")break
                    } catch (l) {
                    }
                    if (!this.context)throw{
                        name: "GooWebGLError", message: "WebGL is supported but disabled", supported: !0,
                        enabled: !1
                    };
                } else throw{name: "GooWebGLError", message: "WebGL is not supported", supported: !1, enabled: !1};
                if (a.debug) {
                    var k = new XMLHttpRequest;
                    k.open("GET", "/js/goo/lib/webgl-debug.js", !1);
                    k.onreadystatechange = function () {
                        k.readyState === 4 && k.status >= 200 && k.status <= 299 && window.eval.call(window, k.responseText)
                    };
                    k.send(null);
                    typeof window.WebGLDebugUtils === "undefined" ? console.warn("You need to include webgl-debug.js in your script definition to run in debug mode.") : (console.log("Running in webgl debug mode."),
                        a.validate ? (console.log('Running with "undefined arguments" validation.'), this.context = window.WebGLDebugUtils.makeDebugContext(this.context, this.onDebugError.bind(this), o)) : this.context = window.WebGLDebugUtils.makeDebugContext(this.context, this.onDebugError.bind(this)))
                }
                window.WebGLRenderingContext = p = this.context.__proto__;
                this.rendererRecord = new g;
                this.glExtensionCompressedTextureS3TC = i.SUPPORTS_DDS = j.isSupported(this.context);
                this.glExtensionTextureFloat = this.context.getExtension("OES_texture_float");
                this.glExtensionTextureFloatLinear = this.context.getExtension("OES_texture_float_linear");
                this.glExtensionTextureHalfFloat = this.context.getExtension("OES_texture_half_float");
                this.glExtensionStandardDerivatives = this.context.getExtension("OES_standard_derivatives");
                this.glExtensionTextureFilterAnisotropic = this.context.getExtension("EXT_texture_filter_anisotropic") || this.context.getExtension("MOZ_EXT_texture_filter_anisotropic") || this.context.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                this.glExtensionDepthTexture = this.context.getExtension("WEBGL_depth_texture") || this.context.getExtension("WEBKIT_WEBGL_depth_texture") ||
                    this.context.getExtension("MOZ_WEBGL_depth_texture");
                this.glExtensionElementIndexUInt = this.context.getExtension("OES_element_index_uint");
                this.glExtensionTextureFloat || console.log("Float textures not supported.");
                this.glExtensionTextureFloatLinear || console.log("Float textures with linear filtering not supported.");
                this.glExtensionStandardDerivatives || console.log("Standard derivatives not supported.");
                this.glExtensionTextureFilterAnisotropic || console.log("Anisotropic texture filtering not supported.");
                this.glExtensionCompressedTextureS3TC || console.log("S3TC compressed textures not supported.");
                this.glExtensionDepthTexture || console.log("Depth textures not supported.");
                this.glExtensionElementIndexUInt || console.log("32 bit indices not supported.");
                if (this.context.getShaderPrecisionFormat === void 0)this.context.getShaderPrecisionFormat = function () {
                    return {rangeMin: 1, rangeMax: 1, precision: 1}
                };
                this.capabilities = {
                    maxTexureSize: this.context.getParameter(p.MAX_TEXTURE_SIZE),
                    maxCubemapSize: this.context.getParameter(p.MAX_CUBE_MAP_TEXTURE_SIZE),
                    maxRenderbufferSize: this.context.getParameter(p.MAX_RENDERBUFFER_SIZE),
                    maxViewPortDims: this.context.getParameter(p.MAX_VIEWPORT_DIMS),
                    maxVertexTextureUnits: this.context.getParameter(p.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
                    maxFragmentTextureUnits: this.context.getParameter(p.MAX_TEXTURE_IMAGE_UNITS),
                    maxCombinedTextureUnits: this.context.getParameter(p.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
                    maxVertexAttributes: this.context.getParameter(p.MAX_VERTEX_ATTRIBS),
                    maxVertexUniformVectors: this.context.getParameter(p.MAX_VERTEX_UNIFORM_VECTORS),
                    maxFragmentUniformVectors: this.context.getParameter(p.MAX_FRAGMENT_UNIFORM_VECTORS),
                    maxVaryingVectors: this.context.getParameter(p.MAX_VARYING_VECTORS),
                    aliasedPointSizeRange: this.context.getParameter(p.ALIASED_POINT_SIZE_RANGE),
                    aliasedLineWidthRange: this.context.getParameter(p.ALIASED_LINE_WIDTH_RANGE),
                    samples: this.context.getParameter(p.SAMPLES),
                    sampleBuffers: this.context.getParameter(p.SAMPLE_BUFFERS),
                    depthBits: this.context.getParameter(p.DEPTH_BITS),
                    stencilBits: this.context.getParameter(p.STENCIL_BITS),
                    subpixelBits: this.context.getParameter(p.SUBPIXEL_BITS),
                    supportedExtensionsList: this.context.getSupportedExtensions(),
                    renderer: this.context.getParameter(p.RENDERER),
                    vendor: this.context.getParameter(p.VENDOR),
                    version: this.context.getParameter(p.VERSION),
                    shadingLanguageVersion: this.context.getParameter(p.SHADING_LANGUAGE_VERSION),
                    vertexShaderHighpFloat: this.context.getShaderPrecisionFormat(this.context.VERTEX_SHADER, this.context.HIGH_FLOAT),
                    vertexShaderMediumpFloat: this.context.getShaderPrecisionFormat(this.context.VERTEX_SHADER,
                        this.context.MEDIUM_FLOAT),
                    vertexShaderLowpFloat: this.context.getShaderPrecisionFormat(this.context.VERTEX_SHADER, this.context.LOW_FLOAT),
                    fragmentShaderHighpFloat: this.context.getShaderPrecisionFormat(this.context.FRAGMENT_SHADER, this.context.HIGH_FLOAT),
                    fragmentShaderMediumpFloat: this.context.getShaderPrecisionFormat(this.context.FRAGMENT_SHADER, this.context.MEDIUM_FLOAT),
                    fragmentShaderLowpFloat: this.context.getShaderPrecisionFormat(this.context.FRAGMENT_SHADER, this.context.LOW_FLOAT),
                    vertexShaderHighpInt: this.context.getShaderPrecisionFormat(this.context.VERTEX_SHADER,
                        this.context.HIGH_INT),
                    vertexShaderMediumpInt: this.context.getShaderPrecisionFormat(this.context.VERTEX_SHADER, this.context.MEDIUM_INT),
                    vertexShaderLowpInt: this.context.getShaderPrecisionFormat(this.context.VERTEX_SHADER, this.context.LOW_INT),
                    fragmentShaderHighpInt: this.context.getShaderPrecisionFormat(this.context.FRAGMENT_SHADER, this.context.HIGH_INT),
                    fragmentShaderMediumpInt: this.context.getShaderPrecisionFormat(this.context.FRAGMENT_SHADER, this.context.MEDIUM_INT),
                    fragmentShaderLowpInt: this.context.getShaderPrecisionFormat(this.context.FRAGMENT_SHADER,
                        this.context.LOW_INT)
                };
                this.shaderPrecision = a.shaderPrecision || "highp";
                this.shaderPrecision = this.shaderPrecision === "highp" && this.capabilities.vertexShaderHighpFloat.precision > 0 && this.capabilities.fragmentShaderHighpFloat.precision > 0 ? "highp" : this.shaderPrecision !== "lowp" && this.capabilities.vertexShaderMediumpFloat.precision > 0 && this.capabilities.fragmentShaderMediumpFloat.precision > 0 ? "mediump" : "lowp";
                console.log("Shader precision: " + this.shaderPrecision);
                this.downScale = a.downScale || 1;
                this.clearColor =
                    new f;
                this.setClearColor(0.3, 0.3, 0.3, 1);
                this.context.clearDepth(1);
                this.context.clearStencil(0);
                this.context.stencilMask(0);
                this.context.enable(p.DEPTH_TEST);
                this.context.depthFunc(p.LEQUAL);
                this.currentHeight = this.currentWidth = this.viewportHeight = this.viewportWidth = this.viewportY = this.viewportX = 0;
                this._overrideMaterials = [];
                this._mergedMaterial = new h("Merged Material");
                this.renderQueue = new q;
                this.info = {
                    calls: 0, vertices: 0, indices: 0, reset: function () {
                        this.indices = this.vertices = this.calls = 0
                    }, toString: function () {
                        return "Calls: " +
                            this.calls + " Vertices: " + this.vertices + " Indices: " + this.indices
                    }
                };
                this.shadowCount = 0;
                this.shadowHandler = new m;
                this.hardwarePicking = null
            }

            function o(a, c) {
                for (var b = 0; b < c.length; ++b)c[b] === void 0 && console.error("undefined passed to gl." + a + "(" + window.WebGLDebugUtils.glFunctionArgsToString(a, c) + ")")
            }

            var p = window.WebGLRenderingContext;
            s.prototype.onDebugError = function (a, c, b) {
                for (var a = "WebGL error " + window.WebGLDebugUtils.glEnumToString(a) + " in " + c + "(", e = 0; e < b.length; ++e)a += (e === 0 ? "" : ", ") + window.WebGLDebugUtils.glFunctionArgToString(c,
                        e, b[e]);
                a += ")";
                console.error(a);
                this._onError && this._onError(a)
            };
            s.mainCamera = null;
            s.prototype.checkResize = function (a) {
                var c = this.domElement.offsetWidth / this.downScale, b = this.domElement.offsetHeight / this.downScale;
                (c !== this.domElement.width || b !== this.domElement.height) && this.setSize(c, b);
                c = this.domElement.width / this.domElement.height;
                if (a && a.aspect !== c)a.aspect = c, a.setFrustumPerspective(), a.onFrameChange()
            };
            s.prototype.setSize = function (a, c) {
                this.domElement.width = a;
                this.domElement.height = c;
                this.setViewport(0,
                    0, a, c);
                if (this.hardwarePicking !== null)this.hardwarePicking.pickingTarget = null
            };
            s.prototype.setViewport = function (a, c, b, e) {
                this.viewportX = a !== void 0 ? a : 0;
                this.viewportY = c !== void 0 ? c : 0;
                this.viewportWidth = b !== void 0 ? b : this.domElement.width;
                this.viewportHeight = e !== void 0 ? e : this.domElement.height;
                this.context.viewport(this.viewportX, this.viewportY, this.viewportWidth, this.viewportHeight)
            };
            s.prototype.setClearColor = function (a, c, b, e) {
                this.clearColor.set(a, c, b, e);
                this.context.clearColor(a, c, b, e)
            };
            s.prototype.bindData =
                function (a) {
                    var c = a.glBuffer;
                    if (c !== null) {
                        if (this.setBoundBuffer(c, a.target), a._dataNeedsRefresh)this.context.bufferSubData(this.getGLBufferTarget(a.target), 0, a.data), a._dataNeedsRefresh = !1
                    } else c = this.context.createBuffer(), a.glBuffer = c, this.rendererRecord.invalidateBuffer(a.target), this.setBoundBuffer(c, a.target), this.context.bufferData(this.getGLBufferTarget(a.target), a.data, this.getGLBufferUsage(a._dataUsage))
                };
            s.prototype.updateShadows = function (a, c, b) {
                this.shadowHandler.checkShadowRendering(this,
                    a, c, b)
            };
            s.prototype.render = function (a, c, b, e, f, g) {
                this._overrideMaterials = g ? g instanceof Array ? g : [g] : [];
                if (c) {
                    if (s.mainCamera === null)s.mainCamera = c;
                    this.setRenderTarget(e);
                    f === void 0 || f === null || f === !0 ? this.clear() : typeof f === "object" && this.clear(f.color, f.depth, f.stencil);
                    b = {
                        camera: c,
                        mainCamera: s.mainCamera,
                        lights: b,
                        lightCamera: this.shadowHandler ? this.shadowHandler.lightCam : null,
                        renderer: this
                    };
                    if (Array.isArray(a)) {
                        this.renderQueue.sort(a, c);
                        for (c = 0; c < a.length; c++)this.fillRenderInfo(a[c], b), this.renderMesh(b)
                    } else this.fillRenderInfo(a,
                        b), this.renderMesh(b);
                    e && d.isPowerOfTwo(e.width) && d.isPowerOfTwo(e.height) && this.updateRenderTargetMipmap(e)
                }
            };
            s.prototype.fillRenderInfo = function (a, c) {
                a instanceof e ? (c.meshData = a.meshDataComponent.meshData, c.materials = a.meshRendererComponent.materials, c.transform = a.particleComponent ? n.IDENTITY : a.transformComponent.worldTransform, a.meshDataComponent.currentPose ? c.currentPose = a.meshDataComponent.currentPose : delete c.currentPose) : (c.meshData = a.meshData, c.materials = a.materials, c.transform = a.transform);
                c.renderable = a
            };
            s.prototype.override = function (b, e, f) {
                var d = {}, g;
                for (g in b)d[g] = !0;
                for (g in e)d[g] = !0;
                for (g in f)d[g] = !0;
                for (var d = Object.keys(d), i = 0; i < d.length; i++)if (g = d[i], b[g] instanceof l || b[g] instanceof c || b[g] instanceof a)f[g] = b[g]; else if (e[g] instanceof l || e[g] instanceof c || e[g] instanceof a)f[g] = e[g]; else if (b[g] instanceof Array || e[g] instanceof Array)if (f[g] = [], b[g] && typeof b[g][0] === "number")for (var h = b[g].length - 1; h >= 0; h--)f[g][h] = b[g][h]; else if (e[g] && typeof e[g][0] === "number")for (h = e[g].length -
                    1; h >= 0; h--)f[g][h] = e[g][h]; else {
                    if (b[g])for (h = 0; h < b[g].length; h++)f[g].push(b[g][h]);
                    if (e[g])for (h = 0; h < e[g].length; h++)f[g].indexOf(e[g][h]) === -1 && f[g].push(e[g][h])
                } else b[g] instanceof Object || e[g] instanceof Object ? (f[g] = f[g] || {}, this.override(b[g] || {}, e[g] || {}, f[g])) : b[g] !== void 0 && b[g] !== null ? f[g] = b[g] : e[g] !== void 0 && e[g] !== null ? f[g] = e[g] : delete f[g]
            };
            s.prototype.renderMesh = function (a) {
                var t;
                var c = a.meshData;
                if (!(c.vertexData === null || c.vertexData !== null && c.vertexData.data.byteLength === 0 || c.indexData !==
                    null && c.indexData.data.byteLength === 0)) {
                    this.bindData(c.vertexData);
                    for (var b = a.materials, e = null, f = c, d = 0, d = this._overrideMaterials.length === 0 ? b.length : Math.max(this._overrideMaterials.length, b.length), g = 0; g < d; g++) {
                        var i, h;
                        g < b.length && (i = b[g]);
                        g < this._overrideMaterials.length ? h = this._overrideMaterials[g] : this._overrideMaterials.length > 0 && (h = this._overrideMaterials[0]);
                        i && h ? (this.override(h, i, this._mergedMaterial), i = this._mergedMaterial) : h && (i = h);
                        if (i.shader) {
                            i.errorOnce = !1;
                            this.shadowCount > 0 ? i.setTexture("SHADOW_MAP",
                                this.shadowHandler.shadowResult) : i.getTexture("SHADOW_MAP") && i.removeTexture("SHADOW_MAP");
                            if (i.wireframe && e !== "wire") {
                                if (!c.wireframeData)c.wireframeData = c.buildWireframeData();
                                c = c.wireframeData;
                                this.bindData(c.vertexData);
                                e = "wire"
                            } else if (i.flat && e !== "flat") {
                                if (!c.flatMeshData)c.flatMeshData = c.buildFlatMeshData();
                                c = c.flatMeshData;
                                this.bindData(c.vertexData);
                                e = "flat"
                            } else!i.wireframe && !i.flat && e !== null && (c = f, this.bindData(c.vertexData), e = null);
                            a.material = i;
                            a.meshData = c;
                            var j = i.shader;
                            if (j.processors ||
                                j.defines) {
                                if (j.processors)for (var l = 0; l < j.processors.length; l++)j.processors[l](j, a);
                                for (var k = Object.keys(j.defines), m = k.length, n = [], l = 0; l < m; l++) {
                                    var q = k[l];
                                    n.push(q + "_" + j.defines[q])
                                }
                                n.sort();
                                l = n.join("_") + "_" + j.name;
                                k = this.rendererRecord.shaderCache = this.rendererRecord.shaderCache || {};
                                if (k[l]) {
                                    if (j = k[l], j !== i.shader) {
                                        for (q in i.shader.uniforms)j.uniforms[q] = i.shader.uniforms[q];
                                        i.shader = j
                                    }
                                } else t = i.shader = j.clone(), j = t, k[l] = j, console.log("Shader not in cache, adding:", l, j.name)
                            }
                            j.apply(a, this);
                            this.updateDepthTest(i);
                            this.updateCulling(i);
                            this.updateBlending(i);
                            this.updateOffset(i);
                            this.updateTextures(i);
                            this.updateLineAndPointSettings(i);
                            c.getIndexBuffer() !== null ? (this.bindData(c.getIndexData()), c.getIndexLengths() !== null ? this.drawElementsVBO(c.getIndexBuffer(), c.getIndexModes(), c.getIndexLengths()) : this.drawElementsVBO(c.getIndexBuffer(), c.getIndexModes(), [c.getIndexBuffer().length])) : c.getIndexLengths() !== null ? this.drawArraysVBO(c.getIndexModes(), c.getIndexLengths()) : this.drawArraysVBO(c.getIndexModes(),
                                [c.vertexCount]);
                            this.info.calls++;
                            this.info.vertices += c.vertexCount;
                            this.info.indices += c.indexCount
                        } else if (!i.errorOnce)console.warn("No shader set on material: " + i.name), i.errorOnce = !0
                    }
                }
            };
            s.prototype.readPixels = function (a, c, b, e, f) {
                this.context.readPixels(a, c, b, e, p.RGBA, p.UNSIGNED_BYTE, f)
            };
            s.prototype.drawElementsVBO = function (a, c, b) {
                for (var e = 0, f = 0, d = a.type = a.type || this.getGLArrayType(a), a = this.getGLByteSize(a), g = 0; g < b.length; g++) {
                    var i = b[g];
                    this.context.drawElements(this.getGLIndexMode(c[f]), i,
                        d, e * a);
                    e += i;
                    f < c.length - 1 && f++
                }
            };
            s.prototype.drawArraysVBO = function (a, c) {
                for (var b = 0, e = 0, f = 0; f < c.length; f++) {
                    var d = c[f];
                    this.context.drawArrays(this.getGLIndexMode(a[e]), b, d);
                    b += d;
                    e < a.length - 1 && e++
                }
            };
            s.prototype.pick = function (c, b, e, f, d, g, i) {
                if (this.viewportWidth * this.viewportHeight === 0)d.id = -1, d.depth = 0; else {
                    if (this.hardwarePicking === null)g = h.createEmptyMaterial(r.pickingShader, "pickingMaterial"), g.blendState = {
                        blending: "NoBlending",
                        blendEquation: "AddEquation",
                        blendSrc: "SrcAlphaFactor",
                        blendDst: "OneMinusSrcAlphaFactor"
                    },
                        this.hardwarePicking = {
                            pickingTarget: new a(this.viewportWidth / 4, this.viewportHeight / 4, {
                                minFilter: "NearestNeighborNoMipMaps",
                                magFilter: "NearestNeighbor"
                            }), pickingMaterial: g, pickingBuffer: new Uint8Array(4)
                        }, g = !1; else if (this.hardwarePicking.pickingTarget === null)this.hardwarePicking.pickingTarget = new a(this.viewportWidth / 4, this.viewportHeight / 4, {
                        minFilter: "NearestNeighborNoMipMaps",
                        magFilter: "NearestNeighbor"
                    }), g = !1;
                    e = Math.floor(e / 4);
                    f = Math.floor((this.viewportHeight - f) / 4);
                    g ? this.setRenderTarget(this.hardwarePicking.pickingTarget) :
                        (i && (this.context.enable(p.SCISSOR_TEST), this.context.scissor(e, f, 1, 1)), this.render(c, b, [], this.hardwarePicking.pickingTarget, !0, this.hardwarePicking.pickingMaterial), i && this.context.disable(p.SCISSOR_TEST));
                    this.readPixels(e, f, 1, 1, this.hardwarePicking.pickingBuffer);
                    c = (this.hardwarePicking.pickingBuffer[2] / 255 + this.hardwarePicking.pickingBuffer[3] / 65025) * b.far;
                    d.id = this.hardwarePicking.pickingBuffer[0] * 255 + this.hardwarePicking.pickingBuffer[1];
                    d.depth = c
                }
            };
            s.prototype.updateLineAndPointSettings = function (a) {
                var c =
                    this.rendererRecord.lineRecord, a = a.lineWidth || 1;
                if (c.lineWidth !== a)this.context.lineWidth(a), c.lineWidth = a
            };
            s.prototype.updateDepthTest = function (a) {
                var c = this.rendererRecord.depthRecord, a = a.depthState;
                if (c.enabled !== a.enabled)a.enabled ? this.context.enable(p.DEPTH_TEST) : this.context.disable(p.DEPTH_TEST), c.enabled = a.enabled;
                if (c.write !== a.write)a.write ? this.context.depthMask(!0) : this.context.depthMask(!1), c.write = a.write
            };
            s.prototype.updateCulling = function (a) {
                var c = this.rendererRecord.cullRecord, b =
                    a.cullState.cullFace, e = a.cullState.frontFace, a = a.cullState.enabled;
                if (c.enabled !== a)a ? this.context.enable(p.CULL_FACE) : this.context.disable(p.CULL_FACE), c.enabled = a;
                if (c.cullFace !== b)this.context.cullFace(b === "Front" ? p.FRONT : b === "Back" ? p.BACK : p.FRONT_AND_BACK), c.cullFace = b;
                if (c.frontFace !== e) {
                    switch (e) {
                        case "CCW":
                            this.context.frontFace(p.CCW);
                            break;
                        case "CW":
                            this.context.frontFace(p.CW)
                    }
                    c.frontFace = e
                }
            };
            s.prototype.updateTextures = function (c) {
                for (var e = this.context, f = c.shader.textureSlots, g = 0; g < f.length; g++) {
                    var i =
                        f[g], h = c.getTexture(i.mapping);
                    if (h !== void 0) {
                        if (h === null || h instanceof a === !1 && (h.image === void 0 || h.checkDataReady() === !1))if (i.format === "sampler2D")h = b.DEFAULT_TEXTURE_2D; else if (i.format === "samplerCube")h = b.DEFAULT_TEXTURE_CUBE;
                        i = this.rendererRecord.textureRecord[g];
                        i === void 0 && (i = this.rendererRecord.textureRecord[g] = {});
                        h.glTexture === null ? (h.glTexture = e.createTexture(), this.updateTexture(e, h, g, i)) : h instanceof a === !1 && h.checkNeedsUpdate() ? (this.updateTexture(e, h, g, i), h.needsUpdate = !1) : this.bindTexture(e,
                            h, g, i);
                        i = h.image !== void 0 ? h.image : h;
                        i = d.isPowerOfTwo(i.width) && d.isPowerOfTwo(i.height);
                        this.updateTextureParameters(h, i)
                    }
                }
            };
            s.prototype.updateTextureParameters = function (a, c) {
                var b = this.context, e = a.textureRecord;
                if (e === void 0)e = {}, a.textureRecord = e;
                if (e.magFilter !== a.magFilter) {
                    var f = this.getGLType(a.variant);
                    b.texParameteri(f, p.TEXTURE_MAG_FILTER, this.getGLMagFilter(a.magFilter));
                    e.magFilter = a.magFilter
                }
                var d = c ? a.minFilter : this.getFilterFallback(a.minFilter);
                if (e.minFilter !== d)f = this.getGLType(a.variant),
                    b.texParameteri(f, p.TEXTURE_MIN_FILTER, this.getGLMinFilter(d)), e.minFilter = d;
                d = c ? a.wrapS : "EdgeClamp";
                if (e.wrapS !== d) {
                    var f = this.getGLType(a.variant), g = this.getGLWrap(d, b);
                    b.texParameteri(f, p.TEXTURE_WRAP_S, g);
                    e.wrapS = d
                }
                d = c ? a.wrapT : "EdgeClamp";
                if (e.wrapT !== d)f = this.getGLType(a.variant), g = this.getGLWrap(d, b), b.texParameteri(f, p.TEXTURE_WRAP_T, g), e.wrapT = d
            };
            s.prototype.bindTexture = function (a, c, b, e) {
                if (e.boundTexture === void 0 || c.glTexture !== void 0 && e.boundTexture !== c.glTexture)a.activeTexture(p.TEXTURE0 +
                    b), a.bindTexture(this.getGLType(c.variant), c.glTexture), e.boundTexture = c.glTexture
            };
            s.prototype.getGLType = function (a) {
                switch (a) {
                    case "2D":
                        return p.TEXTURE_2D;
                    case "CUBE":
                        return p.TEXTURE_CUBE_MAP
                }
                throw"invalid texture type: " + a;
            };
            s.prototype.loadCompressedTexture = function (a, c, b, e) {
                var f = b.image.mipmapSizes, d = 0, g = 0, i = b.image.width, h = b.image.height, l = j.getDdsExtension(a), k = l.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                if (b.format === "PrecompressedDXT1")k = l.COMPRESSED_RGB_S3TC_DXT1_EXT; else if (b.format === "PrecompressedDXT1A")k =
                    l.COMPRESSED_RGBA_S3TC_DXT1_EXT; else if (b.format === "PrecompressedDXT3")k = l.COMPRESSED_RGBA_S3TC_DXT3_EXT; else if (b.format === "PrecompressedDXT5")k = l.COMPRESSED_RGBA_S3TC_DXT5_EXT; else throw Error("Unhandled compression format: " + e.getDataFormat().name());
                if (typeof f === "undefined" || f === null)e instanceof Uint8Array ? a.compressedTexImage2D(c, 0, k, i, h, 0, e) : a.compressedTexImage2D(c, 0, k, i, h, 0, new Uint8Array(e.buffer, e.byteOffset, e.byteLength)); else {
                    b.generateMipmaps = !1;
                    for (l = 0; l < f.length; l++)g = f[l], a.compressedTexImage2D(c,
                        l, k, i, h, 0, new Uint8Array(e.buffer, e.byteOffset + d, g)), i = ~~(i / 2) > 1 ? ~~(i / 2) : 1, h = ~~(h / 2) > 1 ? ~~(h / 2) : 1, d += g;
                    e = 1 + Math.ceil(Math.log(Math.max(b.image.height, b.image.width)) / Math.log(2));
                    d = f[f.length - 1];
                    if (f.length < e)for (l = f.length; l < e; l++)d = ~~((i + 3) / 4) * ~~((h + 3) / 4) * b.image.bpp * 2, a.compressedTexImage2D(c, l, k, i, h, 0, new Uint8Array(d)), i = ~~(i / 2) > 1 ? ~~(i / 2) : 1, h = ~~(h / 2) > 1 ? ~~(h / 2) : 1
                }
            };
            s.prototype.updateTexture = function (a, b, e, f) {
                a.activeTexture(p.TEXTURE0 + e);
                a.bindTexture(this.getGLType(b.variant), b.glTexture);
                f.boundTexture =
                    b.glTexture;
                a.pixelStorei(p.UNPACK_ALIGNMENT, 1);
                a.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, b.flipY);
                e = b.image;
                if (b.variant === "2D")if (e) {
                    if (!e.isCompressed && (b.generateMipmaps || e.width > this.capabilities.maxTexureSize || e.height > this.capabilities.maxTexureSize))this.checkRescale(b, e, e.width, e.height, this.capabilities.maxTexureSize), e = b.image;
                    e.isData === !0 ? e.isCompressed ? this.loadCompressedTexture(a, p.TEXTURE_2D, b, e.data) : a.texImage2D(p.TEXTURE_2D, 0, this.getGLInternalFormat(b.format), e.width, e.height, b.hasBorder ?
                        1 : 0, this.getGLInternalFormat(b.format), this.getGLPixelDataType(b.type), e.data) : a.texImage2D(p.TEXTURE_2D, 0, this.getGLInternalFormat(b.format), this.getGLInternalFormat(b.format), this.getGLPixelDataType(b.type), e);
                    b.generateMipmaps && !e.isCompressed && a.generateMipmap(p.TEXTURE_2D)
                } else a.texImage2D(p.TEXTURE_2D, 0, this.getGLInternalFormat(b.format), b.width, b.height, 0, this.getGLInternalFormat(b.format), this.getGLPixelDataType(b.type), null); else if (b.variant === "CUBE") {
                    if (e && (b.generateMipmaps || e.width >
                        this.capabilities.maxCubemapSize || e.height > this.capabilities.maxCubemapSize)) {
                        for (f = 0; f < c.CUBE_FACES.length; f++)this.checkRescale(b, e.data[f], e.width, e.height, this.capabilities.maxCubemapSize);
                        e = b.image
                    }
                    for (f = 0; f < c.CUBE_FACES.length; f++) {
                        var d = c.CUBE_FACES[f];
                        e ? e.isData === !0 ? e.isCompressed ? this.loadCompressedTexture(a, this.getGLCubeMapFace(d), b, e.data[f]) : a.texImage2D(this.getGLCubeMapFace(d), 0, this.getGLInternalFormat(b.format), e.width, e.height, b.hasBorder ? 1 : 0, this.getGLInternalFormat(b.format),
                            this.getGLPixelDataType(b.type), e.data[f]) : a.texImage2D(this.getGLCubeMapFace(d), 0, this.getGLInternalFormat(b.format), this.getGLInternalFormat(b.format), this.getGLPixelDataType(b.type), e.data[f]) : a.texImage2D(this.getGLCubeMapFace(d), 0, this.getGLInternalFormat(b.format), b.width, b.height, 0, this.getGLInternalFormat(b.format), this.getGLPixelDataType(b.type), null)
                    }
                    e && b.generateMipmaps && !e.isCompressed && a.generateMipmap(p.TEXTURE_CUBE_MAP)
                }
            };
            s.prototype.checkRescale = function (a, c, b, e, f) {
                var g = d.nearestPowerOfTwo(b),
                    i = d.nearestPowerOfTwo(e), g = Math.min(g, f), i = Math.min(i, f);
                if (b !== g || e !== i)f = document.createElement("canvas"), f.width = g, f.height = i, f.getContext("2d").drawImage(c, 0, 0, b, e, 0, 0, g, i), document.body.appendChild(f), f.dataReady = !0, a.image = f, f.parentNode.removeChild(f)
            };
            s.prototype.getGLWrap = function (a) {
                switch (a) {
                    case "Repeat":
                        return p.REPEAT;
                    case "MirroredRepeat":
                        return p.MIRRORED_REPEAT;
                    case "EdgeClamp":
                        return p.CLAMP_TO_EDGE
                }
                throw"invalid WrapMode type: " + a;
            };
            s.prototype.getGLInternalFormat = function (a) {
                switch (a) {
                    case "RGBA":
                        return p.RGBA;
                    case "RGB":
                        return p.RGB;
                    case "Alpha":
                        return p.ALPHA;
                    case "Luminance":
                        return p.LUMINANCE;
                    case "LuminanceAlpha":
                        return p.LUMINANCE_ALPHA;
                    default:
                        throw"Unsupported format: " + a;
                }
            };
            s.prototype.getGLPixelDataType = function (a) {
                switch (a) {
                    case "UnsignedByte":
                        return p.UNSIGNED_BYTE;
                    case "UnsignedShort565":
                        return p.UNSIGNED_SHORT_5_6_5;
                    case "UnsignedShort4444":
                        return p.UNSIGNED_SHORT_4_4_4_4;
                    case "UnsignedShort5551":
                        return p.UNSIGNED_SHORT_5_5_5_1;
                    case "Float":
                        return p.FLOAT;
                    default:
                        throw"Unsupported type: " +
                        a;
                }
            };
            s.prototype.getFilterFallback = function (a) {
                switch (a) {
                    case "NearestNeighborNoMipMaps":
                    case "NearestNeighborNearestMipMap":
                    case "NearestNeighborLinearMipMap":
                        return "NearestNeighborNoMipMaps";
                    case "BilinearNoMipMaps":
                    case "Trilinear":
                    case "BilinearNearestMipMap":
                        return "BilinearNoMipMaps";
                    default:
                        return "NearestNeighborNoMipMaps"
                }
            };
            s.prototype.getGLMagFilter = function (a) {
                switch (a) {
                    case "Bilinear":
                        return p.LINEAR;
                    case "NearestNeighbor":
                        return p.NEAREST
                }
                throw"invalid MagnificationFilter type: " + a;
            };
            s.prototype.getGLMinFilter =
                function (a) {
                    switch (a) {
                        case "BilinearNoMipMaps":
                            return p.LINEAR;
                        case "Trilinear":
                            return p.LINEAR_MIPMAP_LINEAR;
                        case "BilinearNearestMipMap":
                            return p.LINEAR_MIPMAP_NEAREST;
                        case "NearestNeighborNoMipMaps":
                            return p.NEAREST;
                        case "NearestNeighborNearestMipMap":
                            return p.NEAREST_MIPMAP_NEAREST;
                        case "NearestNeighborLinearMipMap":
                            return p.NEAREST_MIPMAP_LINEAR
                    }
                    throw"invalid MinificationFilter type: " + a;
                };
            s.prototype.getGLBufferTarget = function (a) {
                return a === "ElementArrayBuffer" ? p.ELEMENT_ARRAY_BUFFER : p.ARRAY_BUFFER
            };
            s.prototype.getGLArrayType = function (a) {
                if (a instanceof Uint8Array)return p.UNSIGNED_BYTE; else if (a instanceof Uint16Array)return p.UNSIGNED_SHORT; else if (a instanceof Uint32Array)return p.UNSIGNED_INT; else if (a instanceof Int8Array)return p.UNSIGNED_BYTE; else if (a instanceof Int16Array)return p.UNSIGNED_SHORT; else if (a instanceof Int32Array)return p.UNSIGNED_INT;
                return null
            };
            s.prototype.getGLByteSize = function (a) {
                if (!(a instanceof Uint8Array))if (a instanceof Uint16Array)return 2; else if (a instanceof Uint32Array)return 4; else if (!(a instanceof Int8Array))if (a instanceof Int16Array)return 2; else if (a instanceof Int32Array)return 4;
                return 1
            };
            s.prototype.getGLCubeMapFace = function (a) {
                switch (a) {
                    case "PositiveX":
                        return p.TEXTURE_CUBE_MAP_POSITIVE_X;
                    case "NegativeX":
                        return p.TEXTURE_CUBE_MAP_NEGATIVE_X;
                    case "PositiveY":
                        return p.TEXTURE_CUBE_MAP_POSITIVE_Y;
                    case "NegativeY":
                        return p.TEXTURE_CUBE_MAP_NEGATIVE_Y;
                    case "PositiveZ":
                        return p.TEXTURE_CUBE_MAP_POSITIVE_Z;
                    case "NegativeZ":
                        return p.TEXTURE_CUBE_MAP_NEGATIVE_Z
                }
                throw"Invalid cubemap face: " +
                a;
            };
            s.prototype.getGLBufferUsage = function (a) {
                var c = p.STATIC_DRAW;
                switch (a) {
                    case "StaticDraw":
                        c = p.STATIC_DRAW;
                        break;
                    case "DynamicDraw":
                        c = p.DYNAMIC_DRAW;
                        break;
                    case "StreamDraw":
                        c = p.STREAM_DRAW
                }
                return c
            };
            s.prototype.getGLIndexMode = function (a) {
                var c = p.TRIANGLES;
                switch (a) {
                    case "Triangles":
                        c = p.TRIANGLES;
                        break;
                    case "TriangleStrip":
                        c = p.TRIANGLE_STRIP;
                        break;
                    case "TriangleFan":
                        c = p.TRIANGLE_FAN;
                        break;
                    case "Lines":
                        c = p.LINES;
                        break;
                    case "LineStrip":
                        c = p.LINE_STRIP;
                        break;
                    case "LineLoop":
                        c = p.LINE_LOOP;
                        break;
                    case "Points":
                        c =
                            p.POINTS
                }
                return c
            };
            s.prototype.updateBlending = function (a) {
                var c = this.rendererRecord.blendRecord, b = this.context, e = a.blendState.blending;
                if (e !== c.blending)e === "NoBlending" ? b.disable(p.BLEND) : e === "AdditiveBlending" ? (b.enable(p.BLEND), b.blendEquation(p.FUNC_ADD), b.blendFunc(p.SRC_ALPHA, p.ONE)) : e === "SubtractiveBlending" ? (b.enable(p.BLEND), b.blendEquation(p.FUNC_ADD), b.blendFunc(p.ZERO, p.ONE_MINUS_SRC_COLOR)) : e === "MultiplyBlending" ? (b.enable(p.BLEND), b.blendEquation(p.FUNC_ADD), b.blendFunc(p.DST_COLOR,
                    p.ONE_MINUS_SRC_ALPHA)) : e === "AlphaBlending" ? (b.enable(p.BLEND), b.blendEquation(p.FUNC_ADD), b.blendFunc(p.SRC_ALPHA, p.ONE_MINUS_SRC_ALPHA)) : e === "CustomBlending" ? b.enable(p.BLEND) : (b.enable(p.BLEND), b.blendEquationSeparate(p.FUNC_ADD, p.FUNC_ADD), b.blendFuncSeparate(p.SRC_ALPHA, p.ONE_MINUS_SRC_ALPHA, p.ONE, p.ONE_MINUS_SRC_ALPHA)), c.blending = e;
                if (e === "CustomBlending") {
                    var e = a.blendState.blendEquation, f = a.blendState.blendSrc, a = a.blendState.blendDst;
                    if (e !== c.blendEquation)b.blendEquation(this.getGLBlendParam(e)),
                        c.blendEquation = e;
                    if (f !== c.blendSrc || a !== c.blendDst)b.blendFunc(this.getGLBlendParam(f), this.getGLBlendParam(a)), c.blendSrc = f, c.blendDst = a
                } else c.blendEquation = null, c.blendSrc = null, c.blendDst = null
            };
            s.prototype.updateOffset = function (a) {
                var c = this.rendererRecord.offsetRecord, b = this.context, e = a.offsetState.enabled, f = a.offsetState.factor, a = a.offsetState.units;
                if (c.enabled !== e)e ? b.enable(p.POLYGON_OFFSET_FILL) : b.disable(p.POLYGON_OFFSET_FILL), c.enabled = e;
                if (e && (c.factor !== f || c.units !== a))b.polygonOffset(f,
                    a), c.factor = f, c.units = a
            };
            s.prototype.setBoundBuffer = function (a, c) {
                var b = this.rendererRecord.currentBuffer[c];
                if (!b.valid || b.buffer !== a)this.context.bindBuffer(this.getGLBufferTarget(c), a), b.buffer = a, b.valid = !0
            };
            s.prototype.bindVertexAttribute = function (a, c) {
                this.context.vertexAttribPointer(a, c.count, this.getGLDataType(c.type), c.normalized, c.stride, c.offset)
            };
            s.prototype.getGLDataType = function (a) {
                switch (a) {
                    case "Float":
                    case "HalfFloat":
                    case "Double":
                        return p.FLOAT;
                    case "Byte":
                        return p.BYTE;
                    case "UnsignedByte":
                        return p.UNSIGNED_BYTE;
                    case "Short":
                        return p.SHORT;
                    case "UnsignedShort":
                        return p.UNSIGNED_SHORT;
                    case "Int":
                        return p.INT;
                    case "UnsignedInt":
                        return p.UNSIGNED_INT;
                    default:
                        throw"Unknown datatype: " + a;
                }
            };
            s.prototype.getGLBlendParam = function (a) {
                switch (a) {
                    case "AddEquation":
                        return p.FUNC_ADD;
                    case "SubtractEquation":
                        return p.FUNC_SUBTRACT;
                    case "ReverseSubtractEquation":
                        return p.FUNC_REVERSE_SUBTRACT;
                    case "ZeroFactor":
                        return p.ZERO;
                    case "OneFactor":
                        return p.ONE;
                    case "SrcColorFactor":
                        return p.SRC_COLOR;
                    case "OneMinusSrcColorFactor":
                        return p.ONE_MINUS_SRC_COLOR;
                    case "SrcAlphaFactor":
                        return p.SRC_ALPHA;
                    case "OneMinusSrcAlphaFactor":
                        return p.ONE_MINUS_SRC_ALPHA;
                    case "DstAlphaFactor":
                        return p.DST_ALPHA;
                    case "OneMinusDstAlphaFactor":
                        return p.ONE_MINUS_DST_ALPHA;
                    case "DstColorFactor":
                        return p.DST_COLOR;
                    case "OneMinusDstColorFactor":
                        return p.ONE_MINUS_DST_COLOR;
                    case "SrcAlphaSaturateFactor":
                        return p.SRC_ALPHA_SATURATE;
                    default:
                        throw"Unknown blend param: " + a;
                }
            };
            s.prototype.clear = function (a, c, b) {
                var e = 0;
                if (a === void 0 || a)e |= p.COLOR_BUFFER_BIT;
                if (c === void 0 || c)e |=
                    p.DEPTH_BUFFER_BIT;
                if (b === void 0 || b)e |= p.STENCIL_BUFFER_BIT;
                a = this.rendererRecord.depthRecord;
                if (a.write !== !0)this.context.depthMask(!0), a.write = !0;
                this.context.clear(e)
            };
            s.prototype.flush = function () {
                this.context.flush()
            };
            s.prototype.finish = function () {
                this.context.finish()
            };
            s.prototype.setupFrameBuffer = function (a, c, b) {
                this.context.bindFramebuffer(p.FRAMEBUFFER, a);
                this.context.framebufferTexture2D(p.FRAMEBUFFER, p.COLOR_ATTACHMENT0, b, c.glTexture, 0)
            };
            s.prototype.setupRenderBuffer = function (a, c) {
                this.context.bindRenderbuffer(p.RENDERBUFFER,
                    a);
                c.depthBuffer && !c.stencilBuffer ? (this.context.renderbufferStorage(p.RENDERBUFFER, p.DEPTH_COMPONENT16, c.width, c.height), this.context.framebufferRenderbuffer(p.FRAMEBUFFER, p.DEPTH_ATTACHMENT, p.RENDERBUFFER, a)) : c.depthBuffer && c.stencilBuffer ? (this.context.renderbufferStorage(p.RENDERBUFFER, p.DEPTH_STENCIL, c.width, c.height), this.context.framebufferRenderbuffer(p.FRAMEBUFFER, p.DEPTH_STENCIL_ATTACHMENT, p.RENDERBUFFER, a)) : this.context.renderbufferStorage(p.RENDERBUFFER, p.RGBA4, c.width, c.height)
            };
            s.prototype.setRenderTarget =
                function (a) {
                    if (a && !a._glFrameBuffer) {
                        if (a.depthBuffer === void 0)a.depthBuffer = !0;
                        if (a.stencilBuffer === void 0)a.stencilBuffer = !0;
                        a.glTexture = this.context.createTexture();
                        var c = d.isPowerOfTwo(a.width) && d.isPowerOfTwo(a.height), b = this.getGLInternalFormat(a.format), e = this.getGLDataType(a.type);
                        a._glFrameBuffer = this.context.createFramebuffer();
                        a._glRenderBuffer = this.context.createRenderbuffer();
                        this.context.bindTexture(p.TEXTURE_2D, a.glTexture);
                        this.updateTextureParameters(a, c);
                        this.context.texImage2D(p.TEXTURE_2D,
                            0, b, a.width, a.height, 0, b, e, null);
                        this.setupFrameBuffer(a._glFrameBuffer, a, p.TEXTURE_2D);
                        this.setupRenderBuffer(a._glRenderBuffer, a);
                        a.generateMipmaps && c && this.context.generateMipmap(p.TEXTURE_2D);
                        this.context.bindTexture(p.TEXTURE_2D, null);
                        this.context.bindRenderbuffer(p.RENDERBUFFER, null);
                        this.context.bindFramebuffer(p.FRAMEBUFFER, null)
                    }
                    var f;
                    a ? (c = a._glFrameBuffer, f = e = 0, b = a.width, a = a.height) : (c = null, e = this.viewportX, f = this.viewportY, b = this.viewportWidth, a = this.viewportHeight);
                    if (c !== this.rendererRecord.currentFrameBuffer)this.context.bindFramebuffer(p.FRAMEBUFFER,
                        c), this.context.viewport(e, f, b, a), this.rendererRecord.currentFrameBuffer = c, this.rendererRecord.textureRecord = [];
                    this.currentWidth = b;
                    this.currentHeight = a
                };
            s.prototype.updateRenderTargetMipmap = function (a) {
                this.context.bindTexture(p.TEXTURE_2D, a.glTexture);
                this.context.generateMipmap(p.TEXTURE_2D);
                this.context.bindTexture(p.TEXTURE_2D, null)
            };
            s.prototype.getCapabilitiesString = function () {
                var a = [], c;
                for (c in this.capabilities) {
                    var b = this.capabilities[c], e = "";
                    if (b instanceof ArrayBufferView) {
                        e += "[";
                        for (var f =
                            0; f < b.length; f++)e += b[f], f < b.length - 1 && (e += ",");
                        e += "]"
                    } else e = b;
                    a.push(c + ": " + e)
                }
                return a.join("\n")
            };
            s.prototype._deallocateMeshData = function () {
            };
            s.prototype._deallocateTexture = function () {
            };
            s.prototype._deallocateRenderTarget = function () {
            };
            s.prototype._deallocateShader = function () {
            };
            return s
        });
    o("goo/entities/systems/BoundingUpdateSystem", ["goo/entities/systems/System"], function (g) {
        function d() {
            g.call(this, "BoundingUpdateSystem", ["TransformComponent", "MeshRendererComponent", "MeshDataComponent"])
        }

        d.prototype =
            Object.create(g.prototype);
        d.prototype.process = function (b) {
            for (var a = 0; a < b.length; a++) {
                var f = b[a], e = f.meshDataComponent, c = f.transformComponent, f = f.meshRendererComponent;
                e.autoCompute ? (e.computeBoundFromPoints(), f.updateBounds(e.modelBound, c.worldTransform)) : c._updated && f.updateBounds(e.modelBound, c.worldTransform)
            }
        };
        return d
    });
    o("goo/entities/systems/ScriptSystem", ["goo/entities/systems/System"], function (g) {
        function d() {
            g.call(this, "ScriptSystem", ["ScriptComponent"])
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.process = function (b, a) {
            for (var f = 0; f < b.length; f++)b[f].scriptComponent.run(b[f], a)
        };
        return d
    });
    o("goo/entities/systems/LightingSystem", ["goo/entities/systems/System", "goo/entities/EventHandler"], function (g, d) {
        function b() {
            g.call(this, "LightingSystem", ["LightComponent", "TransformComponent"]);
            this.lights = []
        }

        b.prototype = Object.create(g.prototype);
        b.prototype.addedComponent = function (a, b) {
            b.type === "LightComponent" && this.lights.indexOf(b.light) === -1 && (this.lights.push(b.light), d.dispatch("setLights",
                this.lights))
        };
        b.prototype.removedComponent = function (a, b) {
            if (b.type === "LightComponent") {
                var e = this.lights.indexOf(b.light);
                e !== -1 && (this.lights.splice(e, 1), d.dispatch("setLights", this.lights))
            }
        };
        b.prototype.process = function (a) {
            for (var b = 0; b < a.length; b++) {
                var e = a[b], c = e.transformComponent, e = e.lightComponent;
                c._updated && e.updateLight(c.worldTransform)
            }
        };
        return b
    });
    o("goo/entities/managers/LightManager", ["goo/entities/EventHandler"], function (g) {
        function d() {
            this.type = "LightManager";
            this.lights = []
        }

        d.prototype.addedComponent =
            function (b, a) {
                a.type === "LightComponent" && this.lights.indexOf(a.light) === -1 && (this.lights.push(a.light), g.dispatch("setLights", this.lights))
            };
        d.prototype.removedComponent = function (b, a) {
            if (a.type === "LightComponent") {
                var f = this.lights.indexOf(a.light);
                f !== -1 && (this.lights.splice(f, 1), g.dispatch("setLights", this.lights))
            }
        };
        return d
    });
    o("goo/entities/systems/CameraSystem", ["goo/entities/systems/System", "goo/entities/EventHandler", "goo/renderer/Renderer"], function (g, d, b) {
        function a() {
            g.call(this, "CameraSystem",
                ["TransformComponent", "CameraComponent"]);
            this.mainCamera = null
        }

        a.prototype = Object.create(g.prototype);
        a.prototype.findMainCamera = function () {
            for (var a = null, e = 0; e < this._activeEntities.length; e++) {
                var c = this._activeEntities[e].cameraComponent;
                if (!a || c.isMain)a = c.camera
            }
            d.dispatch("setCurrentCamera", a);
            b.mainCamera = a
        };
        a.prototype.inserted = function () {
            this.findMainCamera()
        };
        a.prototype.deleted = function () {
            this.findMainCamera()
        };
        a.prototype.process = function (a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b], d = c.transformComponent,
                    c = c.cameraComponent;
                d._updated && c.updateCamera(d.worldTransform)
            }
        };
        return a
    });
    o("goo/entities/systems/ParticlesSystem", ["goo/entities/systems/System"], function (g) {
        function d() {
            g.call(this, "ParticlesSystem", ["TransformComponent", "MeshRendererComponent", "MeshDataComponent", "ParticleComponent"]);
            this.passive = !1
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.process = function (b, a) {
            if (!(a > 1))for (var f = 0, e = b.length; f < e; f++) {
                var c = b[f], d = c.particleComponent;
                if (d.enabled)try {
                    this.updateParticles(c, d, a)
                } catch (g) {
                    console.log(g.stack)
                }
            }
        };
        d.prototype.updateParticles = function (b, a, f) {
            for (var e = 0, c = -1, d, g = !1, k = !1; e < a.particleCount;) {
                for (; d === void 0;)if (c++, a.emitters.length > c) {
                    d = a.emitters[c];
                    if (d.influences.length)for (var h = 0, l = d.influences.length; h < l; h++)d.influences[h].prepare(b, d);
                    if (d.enabled) {
                        if (d.totalParticlesToSpawn !== 0)d.particlesWaitingToRelease += d.releaseRatePerSecond * f, d.particlesWaitingToRelease = Math.max(d.particlesWaitingToRelease, 0), k = !0;
                        d.particlesWaitingToRelease < 1 && (d = void 0)
                    } else d = void 0
                } else d = null;
                var n = a.particles[e];
                if (n.alive && n.emitter && n.emitter.influences.length) {
                    h = 0;
                    for (l = n.emitter.influences.length; h < l; h++)n.emitter.influences[h].enabled && n.emitter.influences[h].apply(f, n, e)
                }
                n.alive && (n.update(f, b), k = g = !0);
                if (!n.alive && d && (d.particlesWaitingToRelease--, d.totalParticlesToSpawn >= 1 && d.totalParticlesToSpawn--, n.respawnParticle(d), d.getEmissionPoint(n, b), d.getEmissionVelocity(n, b), d.particlesWaitingToRelease < 1 || d.totalParticlesToSpawn === 0))d = void 0;
                e++
            }
            if (g)a.meshData.vertexData._dataNeedsRefresh = !0, b.meshDataComponent.autoCompute = !0;
            if (!k)a.enabled = !1
        };
        return d
    });
    o("goo/util/Stats", [], function () {
        return function () {
            var g = Date.now(), d = g, b = g, a = 0, f = Infinity, e = 0, c = 0, i = Infinity, j = 0, k = 0, h = 0, l = document.createElement("div");
            l.id = "stats";
            l.addEventListener("mousedown", function (a) {
                a.preventDefault();
                y(++h % 2)
            }, !1);
            l.style.cssText = "width:80px;cursor:pointer;z-index:1000;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;";
            var n = document.createElement("div");
            n.id = "fps";
            n.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002";
            l.appendChild(n);
            var q = document.createElement("div");
            q.id = "fpsText";
            q.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:8px;font-weight:bold;line-height:13px";
            q.innerHTML = "FPS";
            n.appendChild(q);
            var r = document.createElement("div");
            r.id = "fpsGraph";
            r.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff";
            for (n.appendChild(r); r.children.length < 74;) {
                var m = document.createElement("span");
                m.style.cssText = "width:1px;height:30px;float:left;background-color:#113";
                r.appendChild(m)
            }
            var s = document.createElement("div");
            s.id = "ms";
            s.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";
            l.appendChild(s);
            var o = document.createElement("div");
            o.id = "msText";
            o.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:8px;font-weight:bold;line-height:13px";
            o.innerHTML = "MS";
            s.appendChild(o);
            var p = document.createElement("div");
            p.id = "msGraph";
            p.style.cssText =
                "position:relative;width:74px;height:30px;background-color:#0f0";
            for (s.appendChild(p); p.children.length < 74;)m = document.createElement("span"), m.style.cssText = "width:1px;height:30px;float:left;background-color:#131", p.appendChild(m);
            m = document.createElement("div");
            m.id = "info";
            m.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#200";
            l.appendChild(m);
            var w = document.createElement("div");
            w.id = "infoText";
            w.style.cssText = "color:#f66;font-family:Helvetica,Arial,sans-serif;font-size:8px;font-weight:bold;line-height:13px";
            w.innerHTML = "INFO";
            m.appendChild(w);
            var y = function (a) {
                h = a;
                switch (h) {
                    case 0:
                        n.style.display = "block";
                        s.style.display = "none";
                        break;
                    case 1:
                        n.style.display = "none", s.style.display = "block"
                }
            };
            this.domElement = l;
            this.setMode = y;
            this.begin = function () {
                g = Date.now()
            };
            this.end = function (h) {
                var l = Date.now();
                if (l > b + 100) {
                    a = l - g;
                    f = Math.min(f, a);
                    e = Math.max(e, a);
                    o.textContent = a + " MS (" + f + "-" + e + ")";
                    var m = Math.min(30, 30 - a / 200 * 30);
                    p.appendChild(p.firstChild).style.height = m + "px";
                    b = l;
                    if (h)w.innerHTML = "Calls: " + h.calls + "<br>Vertices: " +
                        h.vertices + "<br>Indices: " + h.indices
                }
                k++;
                if (l > d + 1E3)c = Math.round(k * 1E3 / (l - d)), i = Math.min(i, c), j = Math.max(j, c), q.textContent = c + " FPS (" + i + "-" + j + ")", h = Math.min(30, 30 - c / (Math.min(500, j) + 10) * 30), r.appendChild(r.firstChild).style.height = h + "px", d = l, k = 0;
                return l
            };
            this.update = function (a) {
                g = this.end(a)
            }
        }
    });
    o("goo/entities/systems/CSSTransformSystem", ["goo/entities/systems/System", "goo/renderer/Renderer", "goo/math/Matrix4x4", "goo/math/MathUtils", "goo/math/Vector3"], function (g, d, b, a, f) {
        function e(a) {
            g.call(this,
                "CSSTransformSystem", ["TransformComponent", "CSSTransformComponent"]);
            this.renderer = a;
            this.viewDom = document.querySelector("#view");
            this.containerDom = document.querySelector("#cam1");
            this.containerDom2 = document.querySelector("#cam2");
            this.tmpMatrix = new b;
            this.tmpMatrix2 = new b;
            this.tmpVector = new f
        }

        e.prototype = Object.create(g.prototype);
        var c = function (a) {
            return Math.abs(a) < 1.0E-6 ? 0 : a
        }, i = ["", "-webkit-", "-moz-", "-ms-", "-o-"], j = function (a, c, b) {
            for (var e = 0; e < i.length; e++)a.style[i[e] + c] = b
        }, k = function (a) {
            a =
                a.data;
            return "matrix3d(" + c(a[0]) + "," + c(-a[1]) + "," + c(a[2]) + "," + c(a[3]) + "," + c(a[4]) + "," + c(-a[5]) + "," + c(a[6]) + "," + c(a[7]) + "," + c(a[8]) + "," + c(-a[9]) + "," + c(a[10]) + "," + c(a[11]) + "," + c(a[12]) + "," + c(-a[13]) + "," + c(a[14]) + "," + c(a[15]) + ")"
        };
        e.prototype.process = function (c) {
            if (c.length !== 0) {
                var b = d.mainCamera, e = 0.5 / Math.tan(a.DEG_TO_RAD * b.fov * 0.5) * this.renderer.domElement.offsetHeight;
                j(this.viewDom, "perspective", e + "px");
                this.tmpMatrix.copy(b.getViewInverseMatrix());
                this.tmpMatrix2.copy(this.tmpMatrix);
                this.tmpMatrix.invert();
                this.tmpMatrix.setTranslation(new f(0, 0, e));
                var g = k(this.tmpMatrix);
                j(this.containerDom, "transform", g);
                this.tmpMatrix2.e03 = -this.tmpMatrix2.e03;
                this.tmpMatrix2.e23 = -this.tmpMatrix2.e23;
                this.tmpMatrix2.setRotationFromVector(new f(0, 0, 0));
                g = k(this.tmpMatrix2);
                j(this.containerDom2, "transform", g);
                for (e = 0; e < c.length; e++) {
                    var g = c[e], i = g.getComponent("CSSTransformComponent"), m = i.domElement, s = i.scale, s = [s, -s, s].join(",");
                    i.faceCamera ? (g.transformComponent.worldTransform.matrix.getTranslation(this.tmpVector),
                        this.tmpMatrix.copy(b.getViewInverseMatrix()), this.tmpMatrix.setTranslation(this.tmpVector)) : this.tmpMatrix.copy(g.transformComponent.worldTransform.matrix);
                    g = "translate3d(-50%,-50%,0) " + k(this.tmpMatrix) + "scale3d(" + s + ")";
                    j(m, "transform", g);
                    m.parentNode !== this.containerDom2 && this.containerDom2.appendChild(m)
                }
            }
        };
        return e
    });
    o("goo/entities/systems/AnimationSystem", ["goo/entities/systems/System", "goo/entities/World"], function (g, d) {
        function b() {
            g.call(this, "AnimationSystem", ["AnimationComponent"])
        }

        b.prototype =
            Object.create(g.prototype);
        b.prototype.process = function (a) {
            for (var b = 0; b < a.length; b++) {
                var e = a[b], c = e.animationComponent;
                c.update(d.time);
                c.apply(e.transformComponent);
                c.postUpdate()
            }
        };
        return b
    });
    o("goo/entities/systems/TextSystem", ["goo/entities/systems/System"], function (g) {
        function d() {
            g.call(this, "TextSystem", ["TextComponent"])
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.process = function (b, a) {
            for (var f = 0; f < b.length; f++)b[f].textComponent.checkUpdate(b[f], a)
        };
        return d
    });
    o("goo/entities/components/MeshDataComponent",
        ["goo/renderer/bounds/BoundingSphere", "goo/entities/components/Component"], function (g, d) {
            function b(a) {
                this.type = "MeshDataComponent";
                this.meshData = a;
                this.modelBound = new g;
                this.autoCompute = !0;
                this.currentPose = null
            }

            b.prototype = Object.create(d.prototype);
            b.prototype.setModelBound = function (a, b) {
                this.modelBound = a;
                this.autoCompute = b
            };
            b.prototype.computeBoundFromPoints = function () {
                if (this.autoCompute && this.modelBound !== null) {
                    var a = this.meshData.getAttributeBuffer("POSITION");
                    if (a !== void 0)this.modelBound.computeFromPoints(a),
                        this.autoCompute = !1
                }
            };
            return b
        });
    o("goo/entities/components/MeshRendererComponent", ["goo/entities/components/Component"], function (g) {
        function d() {
            this.type = "MeshRendererComponent";
            this.materials = [];
            this.worldBound = null;
            this.cullMode = "Dynamic";
            this.isPickable = this.receiveShadows = this.castShadows = !1;
            this.isReflectable = !0
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.updateBounds = function (b, a) {
            this.worldBound = b.transform(a, this.worldBound)
        };
        return d
    });
    o("goo/entities/components/CSSTransformComponent",
        ["goo/entities/components/Component"], function (g) {
            function d(b, a) {
                g.call(this);
                this.type = "CSSTransformComponent";
                this.domElement = b;
                this.scale = 1;
                this.faceCamera = typeof a === "undefined" ? !1 : a
            }

            d.prototype = Object.create(g.prototype);
            return d
        });
    o("goo/entities/EntityUtils", ["goo/entities/components/TransformComponent", "goo/entities/components/MeshDataComponent", "goo/entities/components/MeshRendererComponent", "goo/entities/components/CSSTransformComponent"], function (g, d, b, a) {
        function f() {
        }

        function e(a, f,
                   j) {
            for (var k = a.createEntity(f.name), h = 0; h < f._components.length; h++) {
                var l = f._components[h];
                if (l instanceof g)k.transformComponent.transform.copy(l.transform); else if (l instanceof d) {
                    var n = new d(l.meshData);
                    n.modelBound = new l.modelBound.constructor;
                    if (l.currentPose)n.currentPose = l.currentPose;
                    k.setComponent(n)
                } else if (l instanceof b) {
                    for (var q = new b, n = 0; n < l.materials.length; n++)q.materials.push(l.materials[n]);
                    k.setComponent(q)
                } else k.setComponent(l)
            }
            for (n = 0; n < f.transformComponent.children.length; n++)h =
                e(a, f.transformComponent.children[n].entity, j), k.transformComponent.attachChild(h.transformComponent);
            j.callback && j.callback(k);
            return k
        }

        f.clone = function (a, b, f) {
            f = f || {};
            f.shareData = f.shareData || !0;
            f.shareMaterial = f.shareMaterial || !0;
            f.cloneHierarchy = f.cloneHierarchy || !0;
            return e(a, b, f)
        };
        f.traverse = function (a, b, e) {
            e = e !== void 0 ? e : 0;
            b(a, e);
            for (var d = 0; d < a.transformComponent.children.length; d++)f.traverse(a.transformComponent.children[d].entity, b, e + 1)
        };
        f.updateWorldTransform = function (a) {
            a.updateWorldTransform();
            for (var b = 0; b < a.children.length; b++)f.updateWorldTransform(a.children[b])
        };
        f.createTypicalEntity = function (a, e, f, g) {
            a = a.createEntity(g);
            e = new d(e);
            a.setComponent(e);
            e = new b;
            a.setComponent(e);
            f && e.materials.push(f);
            return a
        };
        f.createDOMEntity = function (c, b) {
            var e = c.createEntity();
            e.setComponent(new a(b));
            return e
        };
        return f
    });
    o("goo/util/MeshBuilder", ["goo/renderer/MeshData", "goo/math/Vector3", "goo/entities/EntityUtils"], function (g, d, b) {
        function a() {
            this.meshDatas = [];
            this.vertexData = {};
            this.indexData =
                [];
            this.indexCounter = this.vertexCounter = 0;
            this.indexLengths = [];
            this.indexModes = []
        }

        a.prototype.addEntity = function (a) {
            b.traverse(a, function () {
                a.transformComponent._dirty && a.transformComponent.updateTransform()
            });
            b.traverse(a, function () {
                a.transformComponent._dirty && b.updateWorldTransform(a.transformComponent)
            });
            b.traverse(a, function () {
                a.meshDataComponent && this.addMeshData(a.meshDataComponent.meshData, a.transformComponent.worldTransform)
            })
        };
        var f = new d;
        a.prototype.addMeshData = function (a, c) {
            if (a.vertexCount >=
                65536)throw Error("Maximum number of vertices for a mesh to add is 65535. Got: " + a.vertexCount); else this.vertexCounter + a.vertexCount >= 65536 && (console.log("Mesh size limit reached, creating new mesh"), this._generateMesh());
            var b = a.attributeMap, d;
            for (d in b) {
                var k = b[d], h = this.vertexData[d];
                if (!h)this.vertexData[d] = {}, h = this.vertexData[d], h.array = [], h.map = {
                    count: k.count,
                    type: k.type,
                    stride: k.stride,
                    offset: k.offset,
                    normalized: k.normalized
                };
                var l = a.getAttributeBuffer(d), n = l.length, q = h.array;
                if (d === g.POSITION)for (h =
                                              0; h < n; h += 3)f.setd(l[h + 0], l[h + 1], l[h + 2]), c.matrix.applyPostPoint(f), q[this.vertexCounter * k.count + h + 0] = f[0], q[this.vertexCounter * k.count + h + 1] = f[1], q[this.vertexCounter * k.count + h + 2] = f[2]; else if (d === g.NORMAL)for (h = 0; h < n; h += 3)f.setd(l[h + 0], l[h + 1], l[h + 2]), c.rotation.applyPost(f), q[this.vertexCounter * k.count + h + 0] = f[0], q[this.vertexCounter * k.count + h + 1] = f[1], q[this.vertexCounter * k.count + h + 2] = f[2]; else if (d === g.TANGENT)for (h = 0; h < n; h += 3)f.setd(l[h + 0], l[h + 1], l[h + 2]), c.rotation.applyPost(f), q[this.vertexCounter *
                k.count + h + 0] = f[0], q[this.vertexCounter * k.count + h + 1] = f[1], q[this.vertexCounter * k.count + h + 2] = f[2]; else for (h = 0; h < n; h++)q[this.vertexCounter * k.count + h] = l[h]
            }
            b = a.getIndexBuffer();
            h = 0;
            for (d = a.indexCount; h < d; h++)this.indexData[this.indexCounter + h] = b[h] + this.vertexCounter;
            this.vertexCounter += a.vertexCount;
            this.indexCounter += a.indexCount;
            this.indexLengths = a.indexLengths ? this.indexLengths.concat(a.indexLengths) : this.indexLengths.concat(a.getIndexBuffer().length);
            this.indexModes = this.indexModes.concat(a.indexModes)
        };
        a.prototype._generateMesh = function () {
            var a = {}, c;
            for (c in this.vertexData) {
                var b = this.vertexData[c];
                a[c] = b.map
            }
            a = new g(a, this.vertexCounter, this.indexCounter);
            for (c in this.vertexData)b = this.vertexData[c].array, a.getAttributeBuffer(c).set(b);
            a.getIndexBuffer().set(this.indexData);
            a.indexLengths = this.indexLengths;
            a.indexModes = this.indexModes;
            this.meshDatas.push(a);
            this.vertexData = {};
            this.indexData = [];
            this.indexCounter = this.vertexCounter = 0;
            this.indexLengths = [];
            this.indexModes = []
        };
        a.prototype.build = function () {
            this.vertexCounter >
            0 && this._generateMesh();
            return this.meshDatas
        };
        return a
    });
    o("goo/util/LightPointer", "goo/renderer/MeshData,goo/util/MeshBuilder,goo/math/Transform,goo/shapes/ShapeCreator,goo/entities/components/MeshDataComponent,goo/entities/components/MeshRendererComponent,goo/renderer/Material,goo/renderer/shaders/ShaderLib,goo/math/MathUtils,goo/renderer/light/PointLight,goo/renderer/light/DirectionalLight,goo/renderer/light/SpotLight".split(","), function (g, d, b, a, f, e, c, i, j, k, h, l) {
        function n() {
        }

        function q(a, c) {
            for (var a =
                a || 1, c = c || 8, b = [], e = [], f = Math.PI * 2 / c, d = 0, i = 0; d < c; d++, i += f)b.push(Math.cos(i) * a, Math.sin(i) * a, 0), e.push(d, d + 1);
            e[e.length - 1] = 0;
            f = new g(g.defaultMap([g.POSITION]), c, e.length);
            f.getAttributeBuffer(g.POSITION).set(b);
            f.getIndexBuffer().set(e);
            f.indexLengths = null;
            f.indexModes = ["Lines"];
            return f
        }

        function r(c) {
            if (c instanceof k) {
                var e = new d, f = new b, i = c.range, i = i || 1, c = new d, i = q(i, 128), n;
                n = new b;
                c.addMeshData(i, n);
                n = new b;
                n.rotation.fromAngles(0, Math.PI / 2, 0);
                n.update();
                c.addMeshData(i, n);
                n = new b;
                n.rotation.fromAngles(Math.PI /
                    2, Math.PI / 2, 0);
                n.update();
                c.addMeshData(i, n);
                c = c.build()[0];
                i = a.createSphere(8, 8, 0.1);
                e.addMeshData(c, f);
                e.addMeshData(i, f);
                return e.build()[0]
            }
            if (c instanceof h) {
                e = new d;
                f = new b;
                f.scale.setd(1, 1, -1);
                f.update();
                c = new d;
                for (n = 0; n < 2; n++) {
                    var r = q(2, 64), i = new b;
                    i.translation.set(0, 0, 10 * n);
                    i.update();
                    c.addMeshData(r, i)
                }
                r = 4;
                i = [];
                n = [];
                for (var o = Math.PI * 2 / r, u = 0, A = 0; u < r; u++, A += o)i.push(Math.cos(A), Math.sin(A), 0), i.push(Math.cos(A), Math.sin(A), 1), n.push(u * 2, u * 2 + 1);
                r = new g(g.defaultMap([g.POSITION]), r * 2, n.length);
                r.getAttributeBuffer(g.POSITION).set(i);
                r.getIndexBuffer().set(n);
                r.indexLengths = null;
                r.indexModes = ["Lines"];
                i = new b;
                i.scale.set(2, 2, 20);
                i.update();
                c.addMeshData(r, i);
                c = c.build()[0];
                i = a.createSphere(8, 8, 0.1);
                e.addMeshData(c, f);
                e.addMeshData(i, f);
                return e.build()[0]
            }
            if (c instanceof l) {
                e = new d;
                f = new b;
                n = c.angle;
                i = c.range;
                n = n || 45;
                i = i || 1;
                c = new d;
                i /= 2;
                n = Math.sin(n * j.DEG_TO_RAD) * i;
                for (o = 1; o <= 2; o++)u = q(n * o, 64), r = new b, r.translation.set(0, 0, i * o), r.update(), c.addMeshData(u, r);
                for (var u = 4, r = [0, 0, 0], o = [], A =
                    Math.PI * 2 / u, v = 0, C = 0; v < u; v++, C += A)r.push(Math.cos(C), Math.sin(C), 1), o.push(0, v + 1);
                u = new g(g.defaultMap([g.POSITION]), u + 1, o.length);
                u.getAttributeBuffer(g.POSITION).set(r);
                u.getIndexBuffer().set(o);
                u.indexLengths = null;
                u.indexModes = ["Lines"];
                r = new b;
                r.scale.set(n * 2, n * 2, i * 2);
                r.update();
                c.addMeshData(u, r);
                c = c.build()[0];
                i = a.createSphere(8, 8, 0.1);
                e.addMeshData(i, f);
                f.scale.setd(1, 1, -1);
                f.update();
                e.addMeshData(c, f);
                return e.build()[0]
            }
        }

        n.getMeshData = function (a) {
            return r(a)
        };
        n.attachPointer = function (a) {
            var b =
                a.getComponent("lightComponent").light, d = r(b), d = new f(d);
            a.setComponent(d);
            d = new e;
            a.setComponent(d);
            d = c.createMaterial(i.simpleColored, "");
            d.uniforms.color = [b.color.data[0], b.color.data[1], b.color.data[2]];
            a.meshRendererComponent.materials.push(d);
            return a
        };
        n.removeMesh = function (a) {
            a.clearComponent("meshDataComponent");
            a.clearComponent("meshRendererComponent");
            return a
        };
        return n
    });
    o("goo/entities/systems/LightDebugSystem", "goo/entities/systems/System,goo/entities/components/MeshDataComponent,goo/entities/components/MeshRendererComponent,goo/renderer/Material,goo/renderer/shaders/ShaderLib,goo/util/LightPointer".split(","),
        function (g, d, b, a, f, e) {
            function c() {
                g.call(this, "LightDebugSystem", ["LightDebugComponent"])
            }

            c.prototype = Object.create(g.prototype);
            c.prototype.inserted = function (c) {
                var g = c.lightComponent.light, k = e.getMeshData(g);
                c.setComponent(new d(k));
                k = a.createMaterial(f.simpleColored, "");
                k.uniforms.color = [g.color.data[0], g.color.data[1], g.color.data[2]];
                g = new b;
                g.materials.push(k);
                c.setComponent(g);
                g.updateBounds(c.meshDataComponent.modelBound, c.transformComponent.worldTransform)
            };
            c.prototype.process = function (a) {
                for (var c =
                    0; c < a.length; c++) {
                    var b = a[c], f = b.lightComponent.light;
                    if (f.changedProperties)b.meshDataComponent.meshData = e.getMeshData(f), b.meshRendererComponent.updateBounds(b.meshDataComponent.modelBound, b.transformComponent.worldTransform);
                    if (f.changedColor)b.meshRendererComponent.materials[0].uniforms.color = [f.color.data[0], f.color.data[1], f.color.data[2]]
                }
            };
            c.prototype.deleted = function (a) {
                a.clearComponent("MeshDataComponent");
                a.clearComponent("MeshRendererComponent")
            };
            return c
        });
    o("goo/util/FrustumViewer",
        "goo/renderer/MeshData,goo/util/MeshBuilder,goo/math/Transform,goo/shapes/ShapeCreator,goo/entities/components/MeshDataComponent,goo/entities/components/MeshRendererComponent,goo/renderer/Material,goo/renderer/shaders/ShaderLib".split(","), function (g, d, b, a, f, e, c, i) {
            function j() {
            }

            function k(a, c, b, e) {
                var f, d, i, j, k, o, y, t, u, A, v, C, z, F, E, D, K, L, I, M, N;
                f = Math.sin(a * Math.PI / 180 / 2);
                I = -f * e * c;
                M = f * e;
                N = -e;
                D = -f * e * c;
                K = -f * e;
                L = -e;
                z = f * e * c;
                F = -f * e;
                E = -e;
                a = f * e * c;
                v = f * e;
                C = -e;
                t = -f * b * c;
                u = f * b;
                A = -b;
                k = -f * b * c;
                o = -f * b;
                y = -b;
                e = f * b *
                    c;
                i = -f * b;
                j = -b;
                c *= f * b;
                f *= b;
                d = -b;
                b = [];
                b.push(I, M, N);
                b.push(D, K, L);
                b.push(z, F, E);
                b.push(a, v, C);
                b.push(t, u, A);
                b.push(k, o, y);
                b.push(e, i, j);
                b.push(c, f, d);
                a = [];
                a.push(0, 1);
                a.push(1, 2);
                a.push(2, 3);
                a.push(3, 0);
                a.push(4, 5);
                a.push(5, 6);
                a.push(6, 7);
                a.push(7, 4);
                a.push(0, 4);
                a.push(1, 5);
                a.push(2, 6);
                a.push(3, 7);
                v = new g(g.defaultMap([g.POSITION]), 8, 24);
                v.getAttributeBuffer(g.POSITION).set(b);
                v.getIndexBuffer().set(a);
                v.indexLengths = null;
                v.indexModes = ["Lines"];
                return v
            }

            j.getMeshData = function (a) {
                return k(a.fov, a.aspect,
                    a.near, a.far)
            };
            j.attachGuide = function (a) {
                var b = a.getComponent("CameraComponent").camera, b = k(b.fov, b.aspect, b.near, b.far - b.far / 1E3), b = new f(b);
                a.setComponent(b);
                var b = new e, d = c.createMaterial(i.simpleColored, "");
                d.uniforms.color = [0.5, 0.7, 1];
                b.materials.push(d);
                a.setComponent(b);
                return a
            };
            j.removeMesh = function (a) {
                a.hasComponent("cameraComponent") && (a.clearComponent("meshDataComponent"), a.clearComponent("meshRendererComponent"));
                return a
            };
            return j
        });
    o("goo/entities/systems/CameraDebugSystem", "goo/entities/systems/System,goo/entities/components/MeshDataComponent,goo/entities/components/MeshRendererComponent,goo/renderer/Material,goo/renderer/shaders/ShaderLib,goo/util/FrustumViewer".split(","),
        function (g, d, b, a, f, e) {
            function c() {
                g.call(this, "CameraDebugSystem", ["CameraDebugComponent"])
            }

            c.prototype = Object.create(g.prototype);
            c.prototype.inserted = function (c) {
                var g = e.getMeshData(c.cameraComponent.camera);
                c.setComponent(new d(g));
                g = a.createMaterial(f.simpleColored, "");
                g.uniforms.color = [0.4, 0.7, 1];
                var k = new b;
                k.materials.push(g);
                c.setComponent(k);
                k.updateBounds(c.meshDataComponent.modelBound, c.transformComponent.worldTransform)
            };
            c.prototype.process = function (a) {
                for (var c = 0; c < a.length; c++) {
                    var b =
                        a[c], f = b.cameraComponent.camera;
                    if (f.changedProperties)b.meshDataComponent.meshData = e.getMeshData(f), b.meshRendererComponent.updateBounds(b.meshDataComponent.modelBound, b.transformComponent.worldTransform)
                }
            };
            c.prototype.deleted = function (a) {
                a.clearComponent("MeshDataComponent");
                a.clearComponent("MeshRendererComponent")
            };
            return c
        });
    o("goo/util/GameUtils", [], function () {
        function g() {
        }

        g.supported = {fullscreen: !0, pointerLock: !0};
        g.toggleFullScreen = function () {
            document.fullscreenElement ? document.cancelFullScreen &&
            document.cancelFullScreen() : document.documentElement.requestFullScreen && document.documentElement.requestFullScreen()
        };
        g.requestPointerLock = function () {
            document.documentElement.requestPointerLock && document.documentElement.requestPointerLock()
        };
        g.exitPointerLock = function () {
            document.exitPointerLock && document.exitPointerLock()
        };
        g.togglePointerLock = function () {
            document.pointerLockElement ? document.exitPointerLock && document.exitPointerLock() : document.documentElement.requestPointerLock && document.documentElement.requestPointerLock()
        };
        g.addVisibilityChangeListener = function (d) {
            if (typeof d === "function") {
                for (var b = ["", "ms", "moz", "webkit"], a, f, e = 0; e < b.length; ++e) {
                    var c = b[e] + (b[e].length === 0 ? "hidden" : "Hidden"), g = b[e] + "visibilitychange";
                    if (typeof document[c] !== "undefined") {
                        a = c;
                        f = g;
                        break
                    }
                }
                typeof document.addEventListener !== "undefined" && typeof a !== "undefined" && document.addEventListener(f, function () {
                    document[a] ? d(!0) : d(!1)
                })
            }
        };
        g.initAllShims = function (d) {
            this.initAnimationShims();
            this.initFullscreenShims(d);
            this.initPointerLockShims(d)
        };
        g.initAnimationShims = function () {
            for (var d = 0, b = ["ms", "moz", "webkit", "o"], a = 0; a < b.length && !window.requestAnimationFrame; ++a)window.requestAnimationFrame = window[b[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[a] + "CancelAnimationFrame"] || window[b[a] + "CancelRequestAnimationFrame"];
            if (window.requestAnimationFrame === void 0)window.requestAnimationFrame = function (a) {
                var b = Date.now(), c = Math.max(0, 16 - (b - d)), g = window.setTimeout(function () {
                    a(b + c)
                }, c);
                d = b + c;
                return g
            };
            if (window.cancelAnimationFrame === void 0)window.cancelAnimationFrame = function (a) {
                clearTimeout(a)
            }
        };
        g.initFullscreenShims = function (d) {
            function b() {
                var a = document.createEvent("CustomEvent");
                a.initCustomEvent("fullscreenchange", !0, !1, null);
                document.dispatchEvent(a)
            }

            function a() {
                var a = document.createEvent("CustomEvent");
                a.initCustomEvent("fullscreenerror", !0, !1, null);
                document.dispatchEvent(a)
            }

            var d = d || window, f = (d.HTMLElement || d.Element).prototype;
            if (!document.hasOwnProperty("fullscreenEnabled")) {
                var e = function () {
                    if ("webkitIsFullScreen" in
                        document)return function () {
                        return document.webkitFullscreenEnabled
                    };
                    if ("mozFullScreenEnabled" in document)return function () {
                        return document.mozFullScreenEnabled
                    };
                    g.supported.fullscreen = !1;
                    return function () {
                        return !1
                    }
                }();
                Object.defineProperty(document, "fullscreenEnabled", {
                    enumerable: !0,
                    configurable: !1,
                    writeable: !1,
                    get: e
                })
            }
            document.hasOwnProperty("fullscreenElement") || (e = function () {
                for (var a = ["webkitCurrentFullScreenElement", "webkitFullscreenElement", "mozFullScreenElement"], b = function (b) {
                        return function () {
                            return document[a[b]]
                        }
                    },
                         e = 0; e < a.length; e++)if (a[e] in document)return b(e);
                return function () {
                    return null
                }
            }(), Object.defineProperty(document, "fullscreenElement", {
                enumerable: !0,
                configurable: !1,
                writeable: !1,
                get: e
            }));
            document.addEventListener("webkitfullscreenchange", b, !1);
            document.addEventListener("mozfullscreenchange", b, !1);
            document.addEventListener("webkitfullscreenerror", a, !1);
            document.addEventListener("mozfullscreenerror", a, !1);
            if (!f.requestFullScreen)f.requestFullScreen = function () {
                return f.webkitRequestFullScreen ? function () {
                    this.webkitRequestFullScreen(d.Element.ALLOW_KEYBOARD_INPUT)
                } :
                    f.mozRequestFullScreen ? function () {
                        this.mozRequestFullScreen()
                    } : function () {
                    }
            }();
            if (!document.cancelFullScreen)document.cancelFullScreen = function () {
                return document.webkitCancelFullScreen || document.mozCancelFullScreen || function () {
                    }
            }()
        };
        g.initPointerLockShims = function (d) {
            function b() {
                var a = document.createEvent("CustomEvent");
                a.initCustomEvent("pointerlockchange", !0, !1, null);
                document.dispatchEvent(a)
            }

            function a() {
                var a = document.createEvent("CustomEvent");
                a.initCustomEvent("pointerlockerror", !0, !1, null);
                document.dispatchEvent(a)
            }

            var d = d || window, f = (d.HTMLElement || d.Element).prototype, d = d.MouseEvent.prototype;
            "movementX" in d || Object.defineProperty(d, "movementX", {
                enumerable: !0,
                configurable: !1,
                writeable: !1,
                get: function () {
                    return this.webkitMovementX || this.mozMovementX || 0
                }
            });
            "movementY" in d || Object.defineProperty(d, "movementY", {
                enumerable: !0,
                configurable: !1,
                writeable: !1,
                get: function () {
                    return this.webkitMovementY || this.mozMovementY || 0
                }
            });
            if (!navigator.pointer)navigator.pointer = navigator.webkitPointer ||
                navigator.mozPointer;
            document.addEventListener("webkitpointerlockchange", b, !1);
            document.addEventListener("webkitpointerlocklost", b, !1);
            document.addEventListener("mozpointerlockchange", b, !1);
            document.addEventListener("mozpointerlocklost", b, !1);
            document.addEventListener("webkitpointerlockerror", a, !1);
            document.addEventListener("mozpointerlockerror", a, !1);
            document.hasOwnProperty("pointerLockElement") || (d = function () {
                return "webkitPointerLockElement" in document ? function () {
                    return document.webkitPointerLockElement
                } :
                    "mozPointerLockElement" in document ? function () {
                        return document.mozPointerLockElement
                    } : function () {
                        return null
                    }
            }(), Object.defineProperty(document, "pointerLockElement", {
                enumerable: !0,
                configurable: !1,
                writeable: !1,
                get: d
            }));
            if (!f.requestPointerLock)f.requestPointerLock = function () {
                if (f.webkitRequestPointerLock)return function () {
                    this.webkitRequestPointerLock()
                };
                if (f.mozRequestPointerLock)return function () {
                    this.mozRequestPointerLock()
                };
                if (navigator.pointer)return function () {
                    navigator.pointer.lock(this, b, a)
                };
                g.supported.pointerLock = !1;
                return function () {
                }
            }();
            if (!document.exitPointerLock)document.exitPointerLock = function () {
                return document.webkitExitPointerLock || document.mozExitPointerLock || function () {
                        navigator.pointer && navigator.pointer.unlock()
                    }
            }()
        };
        return g
    });
    o("goo/util/Logo", [], function () {
        function g() {
        }

        g.blue = "#2A3276";
        g.white = "#FFFFFF";
        var d = {color: g.blue, shadow: !1};
        g.getLogo = function (b) {
            var b = b || {}, a;
            for (a in d)b[a] === void 0 && (b[a] = d[a]);
            a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            a.setAttribute("version", "1.1");
            a.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            a.setAttribute("x", "0px");
            a.setAttribute("y", "0px");
            a.setAttribute("viewBox", "0 0 396.603 277.343");
            a.setAttribute("enable-background", "new 0 0 396.603 277.343");
            a.setAttribute("xml:space", "preserve");
            b.width && a.setAttribute("width", b.width);
            b.height && a.setAttribute("height", b.height);
            var f = document.createElementNS("http://www.w3.org/2000/svg", "g");
            a.appendChild(f);
            var e = document.createElementNS("http://www.w3.org/2000/svg",
                "filter");
            e.setAttribute("id", "insetShadow");
            var c = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
            c.setAttribute("in", "SourceAlpha");
            c.setAttribute("stdDeviation", "0");
            var g = document.createElementNS("http://www.w3.org/2000/svg", "feOffset");
            g.setAttribute("dx", "0");
            g.setAttribute("dy", "-5");
            g.setAttribute("result", "offsetblur");
            var j = document.createElementNS("http://www.w3.org/2000/svg", "feComponentTransfer"), k = document.createElementNS("http://www.w3.org/2000/svg", "feFuncA");
            k.setAttribute("type", "linear");
            k.setAttribute("slope", "0.5");
            j.appendChild(k);
            var k = document.createElementNS("http://www.w3.org/2000/svg", "feMerge"), h = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode"), l = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
            l.setAttribute("in", "SourceGraphic");
            k.appendChild(h);
            k.appendChild(l);
            e.appendChild(c);
            e.appendChild(g);
            e.appendChild(j);
            e.appendChild(k);
            f.appendChild(e);
            c = document.createElementNS("http://www.w3.org/2000/svg",
                "path");
            c.setAttribute("d", "M303.337,46.286c-13.578,0-25.784,5.744-34.396,14.998c-9.86,10.59-26.319,10.59-36.172,0c-8.605-9.254-20.818-14.998-34.402-14.998c-25.936,0-46.971,21.034-46.971,46.978c0,25.936,21.035,46.972,46.971,46.972c13.584,0,25.797-5.744,34.402-14.998c9.853-10.598,26.325-10.598,36.172,0c8.612,9.254,20.818,14.998,34.396,14.998c25.941,0,46.977-21.036,46.977-46.972C350.313,67.32,329.278,46.286,303.337,46.286z M198.296,116.39c-12.785,0-23.146-10.359-23.146-23.144s10.361-23.151,23.146-23.151c12.795,0,23.156,10.367,23.156,23.151S211.091,116.39,198.296,116.39z M303.337,116.407c-12.785,0-23.146-10.36-23.146-23.144c0-12.784,10.36-23.151,23.146-23.151c12.795,0,23.156,10.367,23.156,23.151C326.493,106.047,316.132,116.407,303.337,116.407z M156.18,138.347c-14.087-3.23-22.316-17.482-18.068-31.305c3.704-12.072,2.568-25.511-4.22-37.256C120.927,47.323,92.22,39.63,69.766,52.587C47.317,65.552,39.624,94.26,52.581,116.713c6.795,11.761,17.853,19.462,30.17,22.282c14.084,3.235,22.314,17.497,18.074,31.317c-3.711,12.08-2.582,25.504,4.213,37.264c12.965,22.455,41.666,30.148,64.127,17.178c22.447-12.945,30.148-41.658,17.185-64.111C179.554,148.881,168.497,141.181,156.18,138.347z M104.802,113.287c-11.064,6.387-25.219,2.599-31.604-8.474c-6.397-11.07-2.604-25.225,8.474-31.609c11.057-6.398,25.22-2.598,31.611,8.46C119.673,92.741,115.872,106.897,104.802,113.287z M145.687,207.256c-12.785,0-23.145-10.361-23.145-23.145s10.359-23.15,23.145-23.15c12.797,0,23.156,10.367,23.156,23.15S158.483,207.256,145.687,207.256z");
            c.setAttribute("fill", b.color);
            b.shadow && (f.appendChild(e), c.setAttribute("style", "filter:url(#insetShadow)"));
            f.appendChild(c);
            return (new XMLSerializer).serializeToString(a)
        };
        return g
    });
    o("goo/entities/GooRunner", "goo/entities/World,goo/entities/systems/TransformSystem,goo/entities/systems/RenderSystem,goo/renderer/Renderer,goo/renderer/Material,goo/renderer/Util,goo/renderer/shaders/ShaderLib,goo/entities/systems/BoundingUpdateSystem,goo/entities/systems/ScriptSystem,goo/entities/systems/LightingSystem,goo/entities/managers/LightManager,goo/entities/systems/CameraSystem,goo/entities/systems/ParticlesSystem,goo/util/Stats,goo/entities/systems/CSSTransformSystem,goo/entities/systems/AnimationSystem,goo/entities/systems/TextSystem,goo/entities/systems/LightDebugSystem,goo/entities/systems/CameraDebugSystem,goo/util/GameUtils,goo/util/Logo".split(","),
        function (g, d, b, a, f, e, c, i, j, k, h, l, n, q, r, m, s, o, p, w, y) {
            function t(c) {
                c = c || {};
                this.world = new g;
                this.renderer = new a(c);
                this.world.setSystem(new j);
                this.world.setSystem(new d);
                this.world.setSystem(new l);
                this.world.setSystem(new r(this.renderer));
                this.world.setSystem(new n);
                this.world.setSystem(new i);
                this.world.setSystem(new k);
                this.world.setSystem(new m);
                this.world.setSystem(new s);
                this.world.setSystem(new o);
                this.world.setSystem(new p);
                this.renderSystem = new b;
                this.world.setSystem(this.renderSystem);
                this.doRender = this.doProcess = !0;
                w.initAllShims();
                this.tpfSmoothingCount = c.tpfSmoothingCount !== void 0 ? c.tpfSmoothingCount : 10;
                if (c.showStats)this.stats = new q, this.stats.domElement.style.position = "absolute", this.stats.domElement.style.left = "10px", this.stats.domElement.style.top = "10px", document.body.appendChild(this.stats.domElement);
                if (c.logo === void 0 || c.logo) {
                    var e = this._buildLogo(c.logo);
                    document.body.appendChild(e)
                }
                this.callbacks = [];
                this.callbacksPreProcess = [];
                this.callbacksPreRender = [];
                this._takeSnapshots =
                    [];
                var f = this;
                this.start = -1;
                this.run = function (a) {
                    try {
                        f._updateFrame(a)
                    } catch (c) {
                        c instanceof Error ? console.error(c.stack) : console.error(c)
                    }
                };
                this.animationId = 0;
                c.manuallyStartGameLoop || this.startGameLoop(this.run);
                c.debugKeys && this._addDebugKeys();
                w.addVisibilityChangeListener(function (a) {
                    a ? this.stopGameLoop() : this.startGameLoop()
                }.bind(this))
            }

            var u = [], A = 0;
            t.prototype._updateFrame = function (a) {
                if (this.start < 0)this.start = a;
                var c = (a - this.start) / 1E3;
                if (c < 0)this.world.time = 0, this.world.tpf = 0, g.time = 0;
                else if (c > 0.5)this.start = a; else {
                    c = Math.max(Math.min(c, 0.5), 1.0E-4);
                    u[A] = c;
                    A = (A + 1) % this.tpfSmoothingCount;
                    for (var b = c = 0; b < u.length; b++)c += u[b];
                    c /= u.length;
                    this.world.tpf = c;
                    this.world.time += this.world.tpf;
                    g.time = this.world.time;
                    this.start = a;
                    for (b = 0; b < this.callbacksPreProcess.length; b++)this.callbacksPreProcess[b](this.world.tpf);
                    this.doProcess && this.world.process();
                    for (b = 0; b < this.callbacksPreRender.length; b++)this.callbacksPreRender[b](this.world.tpf);
                    this.renderer.info.reset();
                    this.doRender && this.renderSystem.render(this.renderer);
                    for (b = 0; b < this.callbacks.length; b++)this.callbacks[b](this.world.tpf);
                    this.stats && this.stats.update(this.renderer.info);
                    if (this._takeSnapshots.length) {
                        try {
                            for (var e = this.renderer.domElement.toDataURL(), b = this._takeSnapshots.length - 1; b >= 0; b--)this._takeSnapshots[b](e)
                        } catch (f) {
                            console.error("Failed to take snapshot", f.message)
                        }
                        this._takeSnapshots = []
                    }
                }
                this.animationId = window.requestAnimationFrame(this.run)
            };
            t.prototype._buildLogo = function (a) {
                var c = document.createElement("div"), b = y.getLogo({
                    width: "70px",
                    height: "50px", color: y.blue
                });
                c.innerHTML = '<a style="text-decoration: none;" href="http://www.goocreate.com" target="_blank"><span style="color: #EEE; font-family: Helvetica, sans-serif; font-size: 11px; display: inline-block; margin-top: 14px; margin-right: -3px; vertical-align: top;">Powered by</span>' + b + "</a>";
                c.style.position = "absolute";
                c.style.zIndex = "2000";
                a === "topright" ? (c.style.top = "10px", c.style.right = "10px") : a === "topleft" ? (c.style.top = "10px", c.style.left = "10px") : a === "bottomright" ? (c.style.bottom =
                    "10px", c.style.right = "10px") : a === "bottomleft" ? (c.style.bottom = "10px", c.style.left = "10px") : (c.style.top = "10px", c.style.right = "10px");
                c.id = "goologo";
                c.style.webkitTouchCallout = "none";
                c.style.webkitUserSelect = "none";
                c.style.khtmlUserSelect = "none";
                c.style.mozUserSelect = "none";
                c.style.msUserSelect = "none";
                c.style.userSelect = "none";
                c.ondragstart = function () {
                    return !1
                };
                return c
            };
            t.prototype._addDebugKeys = function () {
                document.addEventListener("keydown", function (a) {
                    a.which === 32 && a.shiftKey ? w.toggleFullScreen() :
                        a.which === 13 && a.shiftKey ? w.togglePointerLock() : a.which === 49 && a.shiftKey ? this.renderSystem.setDebugMaterial() : (a.which === 50 || a.which === 222) && a.shiftKey ? this.renderSystem.setDebugMaterial("normals") : a.which === 51 && a.shiftKey ? this.renderSystem.setDebugMaterial("lit") : a.which === 52 && a.shiftKey ? this.renderSystem.setDebugMaterial("color") : a.which === 53 && a.shiftKey ? this.renderSystem.setDebugMaterial("wireframe") : a.which === 54 && a.shiftKey ? this.renderSystem.setDebugMaterial("flat") : (a.which === 55 || a.which === 191) &&
                        a.shiftKey ? this.renderSystem.setDebugMaterial("texture") : a.which === 56 && a.shiftKey && this.renderSystem.setDebugMaterial("+wireframe")
                }.bind(this), !1);
                document.addEventListener("mousedown", function (a) {
                    a.shiftKey && this.renderSystem.pick(a.clientX, a.clientY, function (a, c) {
                        var b = this.world.entityManager.getEntityById(a);
                        console.log("Picked entity:", b, "At depth:", c)
                    }.bind(this))
                }.bind(this), !1)
            };
            t.prototype.startGameLoop = function () {
                if (!this.animationId)this.start = -1, this.animationId = window.requestAnimationFrame(this.run)
            };
            t.prototype.stopGameLoop = function () {
                window.cancelAnimationFrame(this.animationId);
                this.animationId = 0
            };
            t.prototype.takeSnapshot = function (a) {
                this._takeSnapshots.push(a)
            };
            return t
        });
    o("goo/entities/components/ScriptComponent", ["goo/entities/components/Component"], function (g) {
        function d(b) {
            this.type = "ScriptComponent";
            this.scripts = b instanceof Array ? b : b ? [b] : []
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.run = function (b, a) {
            for (var f, e = 0, c = this.scripts.length; e < c; e++)(f = this.scripts[e]) && f.run && (f.enabled === void 0 || f.enabled) && f.run(b, a)
        };
        return d
    });
    o("goo/entities/components/LightComponent", ["goo/entities/components/Component"], function (g) {
        function d(b) {
            this.type = "LightComponent";
            this.light = b
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.updateLight = function (b) {
            this.light.update(b)
        };
        return d
    });
    o("goo/entities/components/CameraComponent", ["goo/entities/components/Component", "goo/math/Vector3"], function (g, d) {
        function b(a) {
            this.type = "CameraComponent";
            this.camera = a;
            this.leftVec = new d(-1, 0, 0);
            this.upVec =
                new d(0, 1, 0);
            this.dirVec = new d(0, 0, -1)
        }

        b.prototype = Object.create(g.prototype);
        b.prototype.setUpVector = function (a) {
            a === 0 ? (this.leftVec.setd(0, -1, 0), this.upVec.setd(1, 0, 0), this.dirVec.setd(0, 0, -1)) : a === 2 ? (this.leftVec.setd(-1, 0, 0), this.upVec.setd(0, 0, 1), this.dirVec.setd(0, -1, 0)) : (this.leftVec.setd(-1, 0, 0), this.upVec.setd(0, 1, 0), this.dirVec.setd(0, 0, -1))
        };
        b.prototype.updateCamera = function (a) {
            this.camera._left.setv(this.leftVec);
            a.matrix.applyPostVector(this.camera._left);
            this.camera._up.setv(this.upVec);
            a.matrix.applyPostVector(this.camera._up);
            this.camera._direction.setv(this.dirVec);
            a.matrix.applyPostVector(this.camera._direction);
            a.matrix.getTranslation(this.camera.translation);
            this.camera.update()
        };
        return b
    });
    o("goo/scripts/OrbitCamControlScript", ["goo/math/Vector2", "goo/math/Vector3", "goo/math/MathUtils"], function (g, d, b) {
        function a(a) {
            var a = a || {}, c;
            for (c in f)this[c] = typeof f[c] === "boolean" ? a[c] !== void 0 ? a[c] === !0 : f[c] : isNaN(f[c]) ? f[c] instanceof d ? a[c] || (new d).copy(f[c]) : a[c] || f[c] : !isNaN(a[c]) ?
                a[c] : f[c];
            this.name = "OrbitCamControlScript";
            this.timeSamples = [0, 0, 0, 0, 0];
            this.xSamples = [0, 0, 0, 0, 0];
            this.ySamples = [0, 0, 0, 0, 0];
            this.sample = 0;
            this.velocity = new g;
            this.targetSpherical = new d(this.spherical);
            this.cartesian = new d;
            this.dirty = !0;
            this.mouseState = {buttonDown: !1, lastX: NaN, lastY: NaN};
            this.setupMouseControls();
            this.domElement.oncontextmenu = function () {
                return !1
            }
        }

        var f = {
            domElement: document,
            turnSpeedHorizontal: 0.0050,
            turnSpeedVertical: 0.0050,
            zoomSpeed: 0.2,
            dragOnly: !0,
            dragButton: -1,
            worldUpVector: new d(0,
                1, 0),
            baseDistance: 15,
            minZoomDistance: 1,
            maxZoomDistance: 1E3,
            minAscent: -89.95 * b.DEG_TO_RAD,
            maxAscent: 89.95 * b.DEG_TO_RAD,
            clampAzimuth: !1,
            minAzimuth: 90 * b.DEG_TO_RAD,
            maxAzimuth: 270 * b.DEG_TO_RAD,
            releaseVelocity: !0,
            invertedX: !1,
            invertedY: !1,
            invertedWheel: !0,
            drag: 5,
            maxSampleTimeMS: 200,
            lookAtPoint: new d(0, 0, 0),
            spherical: new d(15, 0, 0),
            interpolationSpeed: 7,
            onRun: null
        };
        a.prototype.updateButtonState = function (a, c) {
            this.domElement !== document && this.domElement.focus();
            if (this.dragOnly && (this.dragButton === -1 || this.dragButton ===
                a))(this.mouseState.buttonDown = c) ? (this.mouseState.lastX = NaN, this.mouseState.lastY = NaN, this.velocity.set(0, 0), this.spherical.y = b.moduloPositive(this.spherical.y, b.TWO_PI), this.targetSpherical.copy(this.spherical)) : this.applyReleaseDrift()
        };
        a.prototype.updateDeltas = function (a, c) {
            var b = 0, f = 0;
            !isNaN(this.mouseState.lastX) && !isNaN(this.mouseState.lastY) && (b = -(a - this.mouseState.lastX), f = c - this.mouseState.lastY);
            this.mouseState.lastX = a;
            this.mouseState.lastY = c;
            if (!(this.dragOnly && !this.mouseState.buttonDown ||
                b === 0 && f === 0)) {
                this.timeSamples[this.sample] = Date.now();
                this.xSamples[this.sample] = b;
                this.ySamples[this.sample] = f;
                this.sample++;
                if (this.sample > this.timeSamples.length - 1)this.sample = 0;
                this.velocity.set(0, 0);
                this.move(this.turnSpeedHorizontal * b, this.turnSpeedVertical * f)
            }
        };
        a.prototype.move = function (a, c) {
            var f = this.invertedX ? -a : a, d = this.invertedY ? -c : c;
            if (this.clampAzimuth) {
                var g = this.targetSpherical, f = this.targetSpherical.y - f, h = this.minAzimuth, l = this.maxAzimuth, n = (h + l) / 2 + (l > h ? Math.PI : 0), q = b.moduloPositive(f -
                    n, b.TWO_PI), r = b.moduloPositive(h - n, b.TWO_PI), n = b.moduloPositive(l - n, b.TWO_PI);
                f < 0 && h > 0 ? h -= b.TWO_PI : f > 0 && h < 0 && (h += b.TWO_PI);
                f > b.TWO_PI && l < b.TWO_PI && (l += b.TWO_PI);
                g.y = q < r ? h : q > n ? l : f
            } else this.targetSpherical.y -= f;
            this.targetSpherical.z = b.clamp(this.targetSpherical.z + d, this.minAscent, this.maxAscent);
            this.dirty = !0
        };
        a.prototype.applyWheel = function (a) {
            this.zoom(this.zoomSpeed * (this.invertedWheel ? -1 : 1) * Math.max(-1, Math.min(1, a.wheelDelta || -a.detail)))
        };
        a.prototype.zoom = function (a) {
            this.targetSpherical.x =
                b.clamp(this.targetSpherical.x + a * this.baseDistance, this.minZoomDistance, this.maxZoomDistance);
            this.dirty = !0
        };
        a.prototype.applyReleaseDrift = function () {
            for (var a = Date.now(), c = 0, b = 0, f = !1, d = 0, g = this.timeSamples.length; d < g; d++)a - this.timeSamples[d] < this.maxSampleTimeMS && (c += this.xSamples[d], b += this.ySamples[d], f = !0);
            f ? this.velocity.set(c * this.turnSpeedHorizontal / this.timeSamples.length, b * this.turnSpeedVertical / this.timeSamples.length) : this.velocity.set(0, 0)
        };
        a.prototype.setupMouseControls = function () {
            var a =
                this;
            this.domElement.addEventListener("mousedown", function (c) {
                a.updateButtonState(c.button, !0)
            }, !1);
            document.addEventListener("mouseup", function (c) {
                a.updateButtonState(c.button, !1)
            }, !1);
            document.addEventListener("mousemove", function (c) {
                a.updateDeltas(c.clientX, c.clientY)
            }, !1);
            this.domElement.addEventListener("mousewheel", function (c) {
                a.applyWheel(c)
            }, !1);
            this.domElement.addEventListener("DOMMouseScroll", function (c) {
                a.applyWheel(c)
            }, !1);
            this.domElement.addEventListener("dragstart", function (a) {
                    a.preventDefault()
                },
                !1);
            if (typeof window.Hammer !== "undefined")window.Hammer(this.domElement, {
                transform_always_block: !0,
                transform_min_scale: 1
            }).on("touch drag transform release", function (c) {
                switch (c.type) {
                    case "transform":
                        c = c.gesture.scale;
                        c < 1 ? a.zoom(a.zoomSpeed * 1) : c > 1 && a.zoom(a.zoomSpeed * -1);
                        break;
                    case "touch":
                        a.updateButtonState(0, !0);
                        break;
                    case "release":
                        a.updateButtonState(0, !1);
                        break;
                    case "drag":
                        a.updateDeltas(c.gesture.center.pageX, c.gesture.center.pageY)
                }
            })
        };
        a.prototype.updateVelocity = function (a) {
            this.velocity.lengthSquared() >
            1.0E-6 ? (this.move(this.velocity.x, this.velocity.y), this.velocity.mul(b.clamp(b.lerp(a, 1, 1 - this.drag), 0, 1)), this.dirty = !0) : this.velocity.set(0, 0, 0)
        };
        a.prototype.run = function (a) {
            var c = a.transformComponent;
            if (c) {
                var f = c.transform;
                this.releaseVelocity && this.updateVelocity(a._world.tpf);
                if (this.dirty) {
                    a = this.interpolationSpeed * a._world.tpf;
                    this.spherical.y = b.lerp(a, this.spherical.y, this.targetSpherical.y);
                    this.spherical.x = b.lerp(a, this.spherical.x, this.targetSpherical.x);
                    this.spherical.z = b.lerp(a, this.spherical.z,
                        this.targetSpherical.z);
                    b.sphericalToCartesian(this.spherical.x, this.spherical.y, this.spherical.z, this.cartesian);
                    f.translation.set(this.cartesian.add(this.lookAtPoint));
                    f.translation.equals(this.lookAtPoint) || f.lookAt(this.lookAtPoint, this.worldUpVector);
                    if (this.spherical.distanceSquared(this.targetSpherical) < 1.0E-6)this.dirty = !1, this.spherical.y = b.moduloPositive(this.spherical.y, b.TWO_PI), this.targetSpherical.copy(this.spherical);
                    c.setUpdated()
                }
            }
        };
        return a
    });
    o("goo/scripts/WASDControlScript", ["goo/math/Vector",
        "goo/math/Vector3"], function (g, d) {
        function b(a) {
            a = a || {};
            this.name = "WASDControlScript";
            this.domElement = a.domElement || document;
            a.domElement && this.domElement.setAttribute("tabindex", -1);
            this.walkSpeed = !isNaN(a.walkSpeed) ? a.walkSpeed : 100;
            this.crawlSpeed = !isNaN(a.crawlSpeed) ? a.crawlSpeed : 10;
            this.fwdVector = a.fwdVector || new d(0, 0, -1);
            this.leftVector = a.leftVector || new d(-1, 0, 0);
            this.crawlKey = !isNaN(a.crawlKey) ? a.crawlKey : 16;
            this.forwardKey = !isNaN(a.forwardKey) ? a.forwardKey : 87;
            this.backKey = !isNaN(a.backKey) ?
                a.backKey : 83;
            this.strafeLeftKey = !isNaN(a.strafeLeftKey) ? a.strafeLeftKey : 65;
            this.strafeRightKey = !isNaN(a.strafeRightKey) ? a.strafeRightKey : 68;
            this.XZ = a.XZ || !1;
            this.onRun = a.onRun;
            this.moveState = {strafeLeft: 0, strafeRight: 0, forward: 0, back: 0, crawling: !1};
            this.moveVector = new d(0, 0, 0);
            this.calcVector = new d;
            this.setupKeyControls()
        }

        b.prototype.updateMovementVector = function () {
            this.moveVector.x = this.moveState.strafeLeft - this.moveState.strafeRight;
            this.moveVector.z = this.moveState.forward - this.moveState.back
        };
        b.prototype.updateKeys = function (a, b) {
            if (!a.altKey) {
                var e = !1;
                switch (a.keyCode) {
                    case this.crawlKey:
                        this.moveState.crawling = b;
                        break;
                    case this.forwardKey:
                        this.moveState.forward = b ? 1 : 0;
                        e = !0;
                        break;
                    case this.backKey:
                        this.moveState.back = b ? 1 : 0;
                        e = !0;
                        break;
                    case this.strafeLeftKey:
                        this.moveState.strafeLeft = b ? 1 : 0;
                        e = !0;
                        break;
                    case this.strafeRightKey:
                        this.moveState.strafeRight = b ? 1 : 0, e = !0
                }
                e && this.updateMovementVector()
            }
        };
        b.prototype.setupKeyControls = function () {
            var a = this;
            this.domElement.addEventListener("keydown",
                function (b) {
                    a.updateKeys(b, !0)
                }, !1);
            this.domElement.addEventListener("keyup", function (b) {
                a.updateKeys(b, !1)
            }, !1)
        };
        b.prototype.run = function (a) {
            var b = a.transformComponent;
            if (b) {
                var e = b.transform;
                g.equals(this.moveVector, d.ZERO) || (this.calcVector.set(this.fwdVector.x * this.moveVector.z + this.leftVector.x * this.moveVector.x, this.fwdVector.y * this.moveVector.z + this.leftVector.y * this.moveVector.x, this.fwdVector.z * this.moveVector.z + this.leftVector.z * this.moveVector.x), this.calcVector.normalize(), this.calcVector.mul(a._world.tpf *
                    (this.moveState.crawling ? this.crawlSpeed : this.walkSpeed)), e.rotation.applyPost(this.calcVector), this.XZ && (this.calcVector.data[1] = 0), e.translation.add(this.calcVector), b.setUpdated())
            }
        };
        return b
    });
    o("goo/scripts/MouseLookControlScript", ["goo/math/Vector3", "goo/math/Matrix3x3", "goo/math/MathUtils"], function (g, d, b) {
        function a(a) {
            a = a || {};
            this.name = "MouseLookControlScript";
            this.domElement = a.domElement || document;
            this.turnSpeedHorizontal = !isNaN(a.turnSpeedHorizontal) ? a.turnSpeed : 0.01;
            this.turnSpeedVertical =
                !isNaN(a.turnSpeedVertical) ? a.turnSpeed : 0.01;
            this.dragOnly = a.dragOnly !== void 0 ? a.dragOnly === !0 : !0;
            this.dragButton = !isNaN(a.dragButton) ? a.dragButton : -1;
            this.worldUpVector = a.worldUpVector || new g(0, 1, 0);
            this.localLeftVector = a.localLeftVector || new g(-1, 0, 0);
            this.onRun = a.onRun;
            this.maxAscent = a.maxAscent !== void 0 ? a.maxAscent : 89.95 * b.DEG_TO_RAD;
            this.minAscent = a.minAscent !== void 0 ? a.minAscent : -89.95 * b.DEG_TO_RAD;
            this.calcVector = new g;
            this.calcMat1 = new d;
            this.calcMat2 = new d;
            this.rotY = this.rotX = 0;
            this.resetMouseState();
            this.setupMouseControls()
        }

        a.prototype.resetMouseState = function () {
            this.mouseState = {buttonDown: !1, lastX: NaN, lastY: NaN, dX: 0, dY: 0}
        };
        a.prototype.updateButtonState = function (a, c) {
            this.domElement !== document && this.domElement.focus();
            if (this.dragOnly && (this.dragButton === -1 || this.dragButton === a.button))this.mouseState.buttonDown = c, a.preventDefault()
        };
        a.prototype.updateDeltas = function (a) {
            isNaN(this.mouseState.lastX) || isNaN(this.mouseState.lastY) ? (this.mouseState.dX = 0, this.mouseState.dY = 0) : (this.mouseState.dX =
                a.clientX - this.mouseState.lastX, this.mouseState.dY = a.clientY - this.mouseState.lastY);
            this.mouseState.lastX = a.clientX;
            this.mouseState.lastY = a.clientY
        };
        var f, e, c, i = function (a) {
            this.resetMouseState();
            this.updateButtonState(a, !0);
            e = j.bind(this);
            c = k.bind(this);
            document.addEventListener("mousemove", e, !1);
            document.addEventListener("mouseup", c, !1);
            document.addEventListener("mouseout", c, !1)
        }, j = function (a) {
            this.updateDeltas(a)
        }, k = function (a) {
            this.updateButtonState(a, !1);
            document.removeEventListener("mousemove",
                e);
            document.removeEventListener("mouseup", c);
            document.removeEventListener("mouseout", c)
        };
        a.prototype.setupMouseControls = function () {
            f = i.bind(this);
            this.domElement.addEventListener("mousedown", f, !1)
        };
        a.prototype.run = function (a) {
            if (a = a.transformComponent) {
                var c = a.transform;
                c.rotation.toAngles(this.calcVector);
                this.rotY = this.calcVector.x;
                this.rotX = this.calcVector.y;
                if (!(this.dragOnly && !this.mouseState.buttonDown || this.mouseState.dX === 0 && this.mouseState.dY === 0)) {
                    var b = this.turnSpeedHorizontal, e = this.turnSpeedVertical;
                    this.mouseState.dX !== 0 && (this.rotX -= b * this.mouseState.dX);
                    if (this.mouseState.dY !== 0)if (this.rotY -= e * this.mouseState.dY, this.rotY > this.maxAscent)this.rotY = this.maxAscent; else if (this.rotY < this.minAscent)this.rotY = this.minAscent;
                    c.rotation.fromAngles(this.rotY, this.rotX, 0);
                    a.setUpdated()
                }
                this.mouseState.dX = 0;
                this.mouseState.dY = 0
            }
        };
        return a
    });
    o("goo/addons/water/FlatWaterRenderer", "goo/renderer/MeshData,goo/renderer/Shader,goo/renderer/Camera,goo/math/Plane,goo/renderer/pass/RenderTarget,goo/math/Vector3,goo/math/Vector4,goo/renderer/Material,goo/renderer/TextureCreator,goo/renderer/shaders/ShaderLib,goo/entities/EventHandler,goo/renderer/shaders/ShaderFragment".split(","),
        function (g, d, b, a, f, e, c, i, j, k, h, l) {
            function n(d) {
                d = d || {};
                this.useRefraction = d.useRefraction !== void 0 ? d.useRefraction : !0;
                this.waterCamera = new b(45, 1, 0.1, 2E3);
                this.renderList = [];
                this.waterPlane = new a;
                var g = Math.floor(window.innerWidth / (d.divider || 2)), h = Math.floor(window.innerHeight / (d.divider || 2));
                this.reflectionTarget = new f(g, h);
                if (this.useRefraction)this.refractionTarget = new f(g, h), this.depthTarget = new f(g, h);
                g = i.createMaterial(q, "WaterMaterial");
                g.shader.defines.REFRACTION = this.useRefraction;
                g.cullState.enabled = !1;
                d = d.normalsUrl || "../resources/water/waternormals3.png";
                g.setTexture("NORMAL_MAP", (new j).loadTexture2D(d));
                g.setTexture("REFLECTION_MAP", this.reflectionTarget);
                this.useRefraction && (g.setTexture("REFRACTION_MAP", this.refractionTarget), g.setTexture("DEPTH_MAP", this.depthTarget));
                this.waterMaterial = g;
                this.followCam = !0;
                this.calcVect = new e;
                this.camReflectDir = new e;
                this.camReflectUp = new e;
                this.camReflectLeft = new e;
                this.camLocation = new e;
                this.camReflectPos = new e;
                this.offset = new e;
                this.clipPlane = new c;
                this.waterEntity = null;
                this.depthMaterial = i.createMaterial(r, "depth")
            }

            n.prototype.process = function (a, c, b, e, f) {
                var c = c.filter(function (a) {
                    return a.meshRendererComponent.isReflectable
                }), d = this.waterPlane;
                this.waterCamera.copy(e);
                d.constant = this.waterEntity.transformComponent.transform.translation.y;
                var g = e.translation.y > d.constant;
                this.waterEntity.skip = !0;
                if (g) {
                    this.useRefraction && (b.process(this.waterCamera, c, this.renderList), this.clipPlane.setd(d.normal.x, -d.normal.y, d.normal.z, d.constant), this.waterCamera.setToObliqueMatrix(this.clipPlane),
                        a.render(this.renderList, this.waterCamera, f, this.depthTarget, !0, this.depthMaterial), a.render(this.renderList, this.waterCamera, f, this.refractionTarget, !0));
                    var i = this.calcVect, h = this.camReflectDir, j = this.camReflectUp, l = this.camReflectLeft, k = this.camLocation, n = this.camReflectPos;
                    k.set(e.translation);
                    var q = d.pseudoDistance(k);
                    i.set(d.normal).mul(q * 2);
                    n.set(k.sub(i));
                    k.set(e.translation).add(e._direction);
                    q = d.pseudoDistance(k);
                    i.set(d.normal).mul(q * 2);
                    h.set(k.sub(i)).sub(n).normalize();
                    k.set(e.translation).add(e._up);
                    q = d.pseudoDistance(k);
                    i.set(d.normal).mul(q * 2);
                    j.set(k.sub(i)).sub(n).normalize();
                    l.set(j).cross(h).normalize();
                    this.waterCamera.translation.set(n);
                    this.waterCamera._direction.set(h);
                    this.waterCamera._up.set(j);
                    this.waterCamera._left.set(l);
                    this.waterCamera.normalize();
                    this.waterCamera.update();
                    if (this.skybox && this.followCam)i = this.skybox.transformComponent.worldTransform, i.translation.setv(n), i.update()
                }
                this.waterMaterial.shader.uniforms.abovewater = g;
                b.process(this.waterCamera, c, this.renderList);
                a.setRenderTarget(this.reflectionTarget);
                a.clear();
                if (this.skybox)if (this.skybox instanceof Array) {
                    this.clipPlane.setd(d.normal.x, d.normal.y, d.normal.z, d.constant);
                    this.waterCamera.setToObliqueMatrix(this.clipPlane, 10);
                    for (c = 0; c < this.skybox.length; c++)a.render(this.skybox[c], this.waterCamera, f, this.reflectionTarget, !1), this.skybox[c].skip = !0
                } else a.render(this.skybox, this.waterCamera, f, this.reflectionTarget, !1), this.skybox.skip = !0;
                this.clipPlane.setd(d.normal.x, d.normal.y, d.normal.z, d.constant);
                this.waterCamera.setToObliqueMatrix(this.clipPlane);
                a.render(this.renderList, this.waterCamera, f, this.reflectionTarget, !1);
                this.waterEntity.skip = !1;
                if (this.skybox)if (this.skybox instanceof Array)for (c = 0; c < this.skybox.length; c++)this.skybox[c].skip = !1; else this.skybox.skip = !1;
                if (g && this.skybox && this.followCam)a = e.translation, i = this.skybox.transformComponent.worldTransform, i.translation.setv(a).addv(this.offset), i.update(), this.waterCamera._updatePMatrix = !0
            };
            n.prototype.setSkyBox = function (a) {
                this.skybox = a;
                if (a.meshRendererComponent)this.skybox.meshRendererComponent.materials[0].depthState.enabled = !1, this.skybox.meshRendererComponent.materials[0].renderQueue = 0, this.skybox.meshRendererComponent.cullMode = "Never"
            };
            n.prototype.setWaterEntity = function (a) {
                this.waterEntity = a;
                this.waterEntity.meshRendererComponent.materials[0] = this.waterMaterial
            };
            var q = {
                    defines: {REFRACTION: !1},
                    attributes: {vertexPosition: g.POSITION, vertexNormal: g.NORMAL},
                    uniforms: {
                        viewMatrix: d.VIEW_MATRIX,
                        projectionMatrix: d.PROJECTION_MATRIX,
                        worldMatrix: d.WORLD_MATRIX,
                        cameraPosition: d.CAMERA,
                        normalMap: "NORMAL_MAP",
                        reflection: "REFLECTION_MAP",
                        refraction: "REFRACTION_MAP",
                        depthmap: "DEPTH_MAP",
                        vertexTangent: [1, 0, 0, 1],
                        waterColor: [0.0625, 0.0625, 0.0625],
                        abovewater: !0,
                        fogColor: [1, 1, 1],
                        sunDirection: [0.66, 0.66, 0.33],
                        sunColor: [1, 1, 0.5],
                        sunShininess: 100,
                        sunSpecPower: 4,
                        fogStart: 0,
                        fogScale: 2E3,
                        timeMultiplier: 1,
                        time: d.TIME,
                        distortionMultiplier: 0.025,
                        fresnelPow: 2,
                        normalMultiplier: 3,
                        fresnelMultiplier: 1,
                        waterScale: 5,
                        doFog: !0,
                        resolution: d.RESOLUTION
                    },
                    vshader: "attribute vec3 vertexPosition;\nattribute vec3 vertexNormal;\nuniform vec4 vertexTangent;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nuniform vec3 cameraPosition;\nuniform float waterScale;\nvarying vec2 texCoord0;\nvarying vec3 eyeVec;\nvarying vec4 viewCoords;\nvarying vec3 worldPos;\nvoid main(void) {\n\tworldPos = (worldMatrix * vec4(vertexPosition, 1.0)).xyz;\n\ttexCoord0 = worldPos.xz * waterScale;\n\tmat3 normalMatrix = mat3(worldMatrix);\n\tvec3 n = normalize(normalMatrix * vec3(vertexNormal.x, vertexNormal.y, -vertexNormal.z));\n\tvec3 t = normalize(normalMatrix * vertexTangent.xyz);\n\tvec3 b = cross(n, t) * vertexTangent.w;\n\tmat3 rotMat = mat3(t, b, n);\n\tvec3 eyeDir = worldPos - cameraPosition;\n\teyeVec = eyeDir * rotMat;\n\tviewCoords = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n\tgl_Position = viewCoords;\n}",
                    fshader: ["uniform sampler2D normalMap;\nuniform sampler2D reflection;\n#ifdef REFRACTION\nuniform sampler2D refraction;\nuniform sampler2D depthmap;\n#endif\nuniform vec3 waterColor;\nuniform bool abovewater;\nuniform vec3 fogColor;\nuniform float fogStart;\nuniform float fogScale;\nuniform float time;\nuniform float timeMultiplier;\nuniform float distortionMultiplier;\nuniform float fresnelPow;\nuniform vec3 sunDirection;\nuniform vec3 sunColor;\nuniform float sunShininess;\nuniform float sunSpecPower;\nuniform float normalMultiplier;\nuniform float fresnelMultiplier;\nuniform bool doFog;\nuniform vec2 resolution;\nvarying vec2 texCoord0;\nvarying vec3 eyeVec;\nvarying vec4 viewCoords;\nvarying vec3 worldPos;\nvec4 combineTurbulence(in vec2 coords) {\n\tfloat t = time * timeMultiplier;\n\tvec4 coarse1 = texture2D(normalMap, coords * vec2(0.0012, 0.001) + vec2(0.019 * t, 0.021 * t));\n\tvec4 coarse2 = texture2D(normalMap, coords * vec2(0.001, 0.0011) + vec2(-0.017 * t, 0.016 * t));\n\tvec4 detail1 = texture2D(normalMap, coords * vec2(0.008) + vec2(0.06 * t, 0.03 * t));\n\tvec4 detail2 = texture2D(normalMap, coords * vec2(0.006) + vec2(0.05 * t, -0.04 * t));\n\treturn (detail1 * 0.25 + detail2 * 0.25 + coarse1 * 0.75 + coarse2 * 1.0) / 2.25 - 0.48;\n}\n#ifdef REFRACTION",
                        l.methods.unpackDepth, "#endif\nvoid main(void)\n{\n\tfloat fogDist = clamp((viewCoords.z-fogStart)/fogScale,0.0,1.0);\n\tvec2 normCoords = texCoord0;\n\tvec4 noise = combineTurbulence(normCoords);\n\tvec3 normalVector = normalize(noise.xyz * vec3(normalMultiplier, normalMultiplier, 1.0));\n\tvec3 localView = normalize(eyeVec);\n\tfloat fresnel = dot(normalize(normalVector * vec3(fresnelMultiplier, fresnelMultiplier, 1.0)), localView);\n\tif ( abovewater == false ) {\n\t\tfresnel = -fresnel;\n\t}\n\tfresnel *= 1.0 - fogDist;\n\tfloat fresnelTerm = 1.0 - fresnel;\n\tfresnelTerm = pow(fresnelTerm, fresnelPow);\n\tfresnelTerm = clamp(fresnelTerm, 0.0, 1.0);\n\tfresnelTerm = fresnelTerm * 0.95 + 0.05;\n\tvec2 projCoord = viewCoords.xy / viewCoords.q;\n\tprojCoord = (projCoord + 1.0) * 0.5;\n\tprojCoord.y -= 1.0 / resolution.y;\n#ifdef REFRACTION\n\tfloat depthUnpack = unpackDepth(texture2D(depthmap, projCoord));\n\tif (depthUnpack > 0.5) {depthUnpack = 0.0;}\n\tfloat depth2 = clamp(depthUnpack * 400.0, 0.0, 1.0);\n\tvec2 projCoordRefr = vec2(projCoord);\n\tprojCoordRefr += (normalVector.xy * distortionMultiplier) * (depth2);\n\tprojCoordRefr = clamp(projCoordRefr, 0.001, 0.999);\n\tdepthUnpack = unpackDepth(texture2D(depthmap, projCoordRefr));\n\tfloat depth = clamp(depthUnpack * 40.0, 0.8, 1.0);\n#endif\n\tprojCoord += (normalVector.xy * distortionMultiplier);\n\tprojCoord = clamp(projCoord, 0.001, 0.999);\n\tif ( abovewater == true ) {\n\t\tprojCoord.x = 1.0 - projCoord.x;\n\t}\n\tvec4 waterColorX = vec4(waterColor, 1.0);\n\tvec4 reflectionColor = texture2D(reflection, projCoord);\n\tif ( abovewater == false ) {\n\t\treflectionColor *= vec4(0.8,0.9,1.0,1.0);\n\t\tvec4 endColor = mix(reflectionColor,waterColorX,fresnelTerm);\n\t\tgl_FragColor = mix(endColor,waterColorX,fogDist);\n\t}\n\telse {\n\t\tvec3 sunSpecReflection = normalize(reflect(-sunDirection, normalVector));\n\t\tfloat sunSpecDirection = max(0.0, dot(localView, sunSpecReflection));\n\t\tvec3 specular = pow(sunSpecDirection, sunShininess) * sunSpecPower * sunColor;\n\t\tvec4 endColor = waterColorX;\n#ifdef REFRACTION\n\t\tvec4 refractionColor = texture2D(refraction, projCoordRefr) * vec4(0.6);\n\t\tendColor = mix(refractionColor, waterColorX, depth);\n#endif\n\t\tendColor = mix(endColor, reflectionColor, fresnelTerm);\n\t\tif (doFog) {\n\t\t\tgl_FragColor = (vec4(specular, 1.0) + mix(endColor,reflectionColor,fogDist)) * (1.0-fogDist) + vec4(fogColor, 1.0) * fogDist;\n\t\t} else {\n\t\t\tgl_FragColor = vec4(specular, 1.0) + mix(endColor,reflectionColor,fogDist);\n\t\t}\n\t}\n}"].join("\n")
                },
                r = {
                    attributes: {vertexPosition: g.POSITION},
                    uniforms: {
                        viewProjectionMatrix: d.VIEW_PROJECTION_MATRIX,
                        worldMatrix: d.WORLD_MATRIX,
                        farPlane: d.FAR_PLANE
                    },
                    vshader: "attribute vec3 vertexPosition;\nuniform mat4 viewProjectionMatrix;\nuniform mat4 worldMatrix;\nvarying vec4 vPosition;\nvoid main(void) {\n\tvPosition = worldMatrix * vec4(vertexPosition, 1.0);\n\tgl_Position = viewProjectionMatrix * vPosition;\n}",
                    fshader: ["uniform float farPlane;", l.methods.packDepth, "varying vec4 vPosition;\nvoid main(void)\n{\n\tfloat linearDepth = abs(vPosition.y) / farPlane;\n\tgl_FragColor = packDepth(linearDepth);\n}"].join("\n")
                };
            return n
        });
    o("goo/loaders/handlers/ConfigHandler", [], function () {
        function g(d, b, a, f) {
            this.world = d;
            this.getConfig = b;
            this.updateObject = a;
            this.options = f
        }

        g.prototype.update = function () {
        };
        g.handlerClasses = {};
        g.getHandler = function (d) {
            return this.handlerClasses[d]
        };
        g._register = function (d) {
            this._type = d;
            return g.handlerClasses[d] = this
        };
        g._registerClass = function (d, b) {
            b._type = d;
            return g.handlerClasses[d] = b
        };
        return g
    });
    o("goo/util/PromiseUtil", ["goo/util/rsvp"], function (g) {
        return {
            createDummyPromise: function (d,
                                          b) {
                var a;
                a = new g.Promise;
                b != null ? a.reject(b) : a.resolve(d);
                return a
            }, defer: function (d, b) {
                var a, f, e;
                e = new g.Promise;
                if (b.apply)return a = new g.Promise, f = a.then(function () {
                    return b()
                }), setTimeout(function () {
                    return a.resolve()
                }, d), f; else setTimeout(function () {
                    return e.resolve(b)
                }, d);
                return e
            }
        }
    });
    o("goo/loaders/handlers/ComponentHandler", ["goo/util/rsvp", "goo/util/PromiseUtil"], function () {
        function g(d, b, a, f) {
            this.world = d;
            this.getConfig = b;
            this.updateObject = a;
            this.options = f
        }

        g.prototype._prepare = function () {
        };
        g.prototype._create = function () {
            throw Error("ComponentHandler._create is abstract, use ComponentHandler.getHandler(type)");
        };
        g.prototype.update = function (d, b) {
            this._prepare(b);
            return d == null || d[this.constructor._type + "Component"] == null ? this._create(d, b) : d[this.constructor._type + "Component"]
        };
        g.prototype.remove = function (d) {
            d != null && d.clearComponent(this.constructor._type + "Component");
            return d
        };
        g.handlerClasses = {};
        g.getHandler = function (d) {
            return this.handlerClasses[d]
        };
        g._register = function (d) {
            this._type =
                d;
            g.handlerClasses[d] = this
        };
        g._registerClass = function (d, b) {
            b._type = d;
            g.handlerClasses[d] = b
        };
        return g
    });
    o("goo/util/StringUtil", [], function () {
        return {
            endsWith: function (g, d) {
                return g.indexOf(d, g.length - d.length) !== -1
            }, startsWith: function (g, d) {
                return g.indexOf(d) === 0
            }
        }
    });
    o("goo/util/ObjectUtil", [], function () {
        var g = {}, d = Array.prototype, b = Object.prototype, a = {}, f = d.slice, e = b.toString, c = b.hasOwnProperty, b = Array.isArray, i = Object.keys, j = d.forEach;
        g.has = function (a, b) {
            return c.call(a, b)
        };
        g.defaults = function (a) {
            k(f.call(arguments,
                1), function (c) {
                if (c)for (var b in c)if (typeof a[b] === "undefined" || a[b] === null)a[b] = c[b]
            });
            return a
        };
        g.extend = function (a) {
            k(f.call(arguments, 1), function (c) {
                if (c)for (var b in c)a[b] = c[b]
            });
            return a
        };
        g.isObject = function (a) {
            return a === Object(a)
        };
        g.clone = function (a) {
            return !g.isObject(a) ? a : g.isArray(a) ? a.slice() : g.extend({}, a)
        };
        g.keys = i || function (a) {
                if (a !== Object(a))throw new TypeError("Invalid object");
                var c = [], b;
                for (b in a)g.has(a, b) && (c[c.length] = b);
                return c
            };
        g.isArray = b || function (a) {
                return e.call(a) ===
                    "[object Array]"
            };
        var k = g.each = g.forEach = function (c, b, e) {
            if (!(typeof c === "undefined" || c === null))if (j && c.forEach === j)c.forEach(b, e); else if (c.length === +c.length)for (var f = 0, d = c.length; f < d; f++) {
                if (b.call(e, c[f], f, c) === a)break
            } else for (f in c)if (g.has(c, f) && b.call(e, c[f], f, c) === a)break
        };
        g.deepClone = function (a) {
            if (!a)return a;
            var c;
            [Number, String, Boolean].forEach(function (b) {
                a instanceof b && (c = b(a))
            });
            if (typeof c == "undefined")if (Object.prototype.toString.call(a) === "[object Array]")c = [], a.forEach(function (a,
                                                                                                                               b) {
                c[b] = g.deepClone(a)
            }); else if (typeof a == "object")if (a.nodeType && typeof a.cloneNode == "function")c = a.cloneNode(!0); else if (a.prototype)c = a; else if (a instanceof Date)c = new Date(a); else {
                c = {};
                for (var b in a)c[b] = g.deepClone(a[b])
            } else c = a;
            return c
        };
        g.indexOf = function (a, c) {
            for (var b = 0; b < a.length; b++)if (b in a && a[b] === c)return b;
            return -1
        };
        return g
    });
    o("goo/loaders/handlers/CameraComponentHandler", "goo/loaders/handlers/ComponentHandler,goo/entities/components/CameraComponent,goo/renderer/Camera,goo/util/rsvp,goo/util/PromiseUtil,goo/util/ObjectUtil".split(","),
        function (g, d, b, a, f, e) {
            function c() {
                g.apply(this, arguments)
            }

            c.prototype = Object.create(g.prototype);
            g._registerClass("camera", c);
            c.prototype._prepare = function (a) {
                return e.defaults(a, {fov: 45, near: 1, far: 1E4})
            };
            c.prototype._create = function (a) {
                var c = new b(45, 1, 1, 1E3), c = new d(c);
                a.setComponent(c);
                return c
            };
            c.prototype.update = function (a, c) {
                var b = g.prototype.update.call(this, a, c);
                b.camera.setFrustumPerspective(c.fov, void 0, c.near, c.far);
                return f.createDummyPromise(b)
            };
            c.prototype.remove = function (a) {
                a != null &&
                a.cameraComponent != null && a.cameraComponent.camera != null && this.world.removeEntity(a.cameraComponent.camera);
                return g.prototype.remove.call(this, a)
            };
            return c
        });
    o("goo/loaders/handlers/EntityHandler", "goo/loaders/handlers/ConfigHandler,goo/loaders/handlers/ComponentHandler,goo/entities/Entity,goo/util/rsvp,goo/util/PromiseUtil,goo/util/ObjectUtil".split(","), function (g, d, b, a, f, e) {
        function c() {
            g.apply(this, arguments)
        }

        c.prototype = Object.create(g.prototype);
        g._registerClass("entity", c);
        c.prototype._prepare =
            function () {
            };
        c.prototype._create = function (a) {
            var c = this.world.createEntity(a);
            c.ref = a;
            return c
        };
        c.prototype.update = function (c, b) {
            function g(a) {
                return a.ref === c
            }

            var h = this.world.entityManager.getEntityByName(c);
            if (h == null) {
                var l = this.world._addedEntities.filter(g);
                l != null && (h = l[0])
            }
            h == null && (h = this._create(c));
            var l = [], n;
            for (n in b.components) {
                var q = b.components[n], r = d.getHandler(n);
                if (r) {
                    if (this._componentHandlers == null)this._componentHandlers = {};
                    var m = this._componentHandlers[n];
                    m ? e.extend(m, {
                        world: this._world,
                        getConfig: this.getConfig, updateObject: this.updateObject, options: e.clone(this.options)
                    }) : m = this._componentHandlers[n] = new r(this.world, this.getConfig, this.updateObject, this.options);
                    q = m.update(h, q);
                    q == null || q.then == null ? console.error("Handler for " + n + " did not return promise") : l.push(q)
                } else console.warn("No componentHandler for " + n)
            }
            return l.length ? a.all(l).then(function () {
                return h
            }) : (console.error("No promises in " + c + " ", b), f.createDummyPromise(h))
        };
        c.prototype.remove = function (a) {
            this.world.removeEntity(this.world.entityManager.getEntityByName(a))
        };
        return c
    });
    o("goo/loaders/handlers/LightComponentHandler", "goo/loaders/handlers/ComponentHandler,goo/entities/components/LightComponent,goo/renderer/light/PointLight,goo/math/Vector,goo/util/rsvp,goo/util/PromiseUtil,goo/util/ObjectUtil".split(","), function (g, d, b, a, f, e, c) {
        function i() {
            g.apply(this, arguments)
        }

        i.prototype = Object.create(g.prototype);
        g._registerClass("light", i);
        i.prototype._prepare = function (a) {
            c.defaults(a, {direction: [0, 0, 0], color: [1, 1, 1, 1], attenuate: !0, shadowCaster: !1});
            a.shadowCaster &&
            c.defaults(a.shadowSettings, {type: "Blur"})
        };
        i.prototype._create = function (a) {
            var c = new d(new b);
            a.setComponent(c);
            return c
        };
        i.prototype.update = function (b, f) {
            var d = g.prototype.update.call(this, b, f), i = d.light, n;
            for (n in f) {
                var q = f[n];
                i.hasOwnProperty(n) && (i[n] instanceof a ? i[n].set(q) : i[n] = c.clone(q))
            }
            return e.createDummyPromise(d)
        };
        return i
    });
    o("goo/loaders/handlers/MaterialHandler", "goo/loaders/handlers/ConfigHandler,goo/renderer/Material,goo/renderer/Util,goo/renderer/shaders/ShaderLib,goo/util/rsvp,goo/util/PromiseUtil,goo/util/ObjectUtil".split(","),
        function (g, d, b, a, f, e, c) {
            function i() {
                g.apply(this, arguments);
                this._objects = {}
            }

            i.prototype = Object.create(g.prototype);
            g._registerClass("material", i);
            i.prototype._prepare = function (a) {
                if (a.blendState == null)a.blendState = {};
                c.defaults(a.blendState, {
                    blending: "NoBlending",
                    blendEquation: "AddEquation",
                    blendSrc: "SrcAlphaFactor",
                    blendDst: "OneMinusSrcAlphaFactor"
                });
                if (a.cullState == null)a.cullState = {};
                c.defaults(a.cullState, {enabled: !0, cullFace: "Back", frontFace: "CCW"});
                if (a.depthState == null)a.depthState = {};
                c.defaults(a.depthState,
                    {enabled: !0, write: !0});
                if (a.renderQueue == null)a.renderQueue = -1
            };
            i.prototype._create = function (a) {
                if (this._objects == null)this._objects = {};
                return this._objects[a] = new d(a)
            };
            i.prototype.update = function (a, d) {
                var g = this;
                this._prepare(d);
                if (this._objects[a] == null) {
                    this._create(a);
                    var i = this._objects[a];
                    return this._getShaderObject(d.shaderRef, d.wireframe).then(function (e) {
                        if (e) {
                            if (d.wireframe)i.wireframe = d.wireframe;
                            if (d.wireframeColor)i.wireframeColor = b.clone(d.wireframeColor);
                            i.blendState = b.clone(d.blendState);
                            i.cullState = b.clone(d.cullState);
                            i.depthState = b.clone(d.depthState);
                            i.renderQueue = d.renderQueue === -1 ? null : d.renderQueue;
                            i.shader = e;
                            i.uniforms = {};
                            for (var q in d.uniforms)i.uniforms[q] = c.clone(d.uniforms[q]);
                            var r = [], e = function (a, c) {
                                return r.push(g.getConfig(c).then(function (b) {
                                    return g.updateObject(c, b, g.options).then(function (b) {
                                        return {type: a, ref: c, texture: b}
                                    })
                                }))
                            }, m;
                            for (m in d.texturesMapping)e(m, d.texturesMapping[m]);
                            return r.length ? f.all(r).then(function (a) {
                                for (var c = 0; c < a.length; c++) {
                                    var b = a[c];
                                    b.texture != null && i.setTexture(b.type, b.texture)
                                }
                                return i
                            }).then(null, function (a) {
                                return console.error("Error loading textures: " + a)
                            }) : i
                        } else console.warn("Unknown shader", d.shaderRef, "- not updating material", a)
                    })
                } else return e.createDummyPromise(this._objects[a])
            };
            i.prototype.remove = function (a) {
                return delete this._objects[a]
            };
            i.prototype._getShaderObject = function (c, b) {
                var g = this;
                if (b) {
                    var i = new f.Promise, n = d.createShader(a.simple);
                    i.resolve(n);
                    return i
                } else return c != null ? this.getConfig(c).then(function (a) {
                    return g.updateObject(c,
                        a, g.options)
                }) : (i = d.createShader(a.texturedLit, "DefaultShader"), e.createDummyPromise(i))
            };
            return i
        });
    o("goo/loaders/handlers/MeshDataComponentHandler", "goo/loaders/handlers/ComponentHandler,goo/entities/components/MeshDataComponent,goo/renderer/bounds/BoundingBox,goo/util/rsvp,goo/util/PromiseUtil,goo/util/ObjectUtil".split(","), function (g, d, b, a, f, e) {
        function c() {
            g.apply(this, arguments)
        }

        c.prototype = Object.create(g.prototype);
        g._registerClass("meshData", c);
        c.prototype._prepare = function (a) {
            return e.defaults(a,
                {meshRef: null})
        };
        c.prototype._create = function () {
        };
        c.prototype.update = function (c, e) {
            var k = this, h, l;
            g.prototype.update.call(this, c, e);
            var n = e.meshRef;
            n || console.error("No meshRef in meshDataComponent for " + c.ref);
            var q = e.poseRef || e.pose;
            h = q ? this.getConfig(q).then(function (a) {
                return k.updateObject(q, a)
            }) : f.createDummyPromise();
            l = this.getConfig(n).then(function (a) {
                return k.updateObject(n, a)
            });
            return a.all([h, l]).then(function (a) {
                var e = a[0], f = a[1], a = new d(f);
                if (f.boundingBox) {
                    var g = f.boundingBox.min, h =
                        f.boundingBox.max, f = [h[0] - g[0], h[1] - g[1], h[2] - g[2]], g = [(h[0] + g[0]) * 0.5, (h[1] + g[1]) * 0.5, (h[2] + g[2]) * 0.5], h = new b;
                    h.xExtent = f[0];
                    h.yExtent = f[1];
                    h.zExtent = f[2];
                    h.center.seta(g);
                    a.modelBound = h;
                    a.autoCompute = !1
                }
                if (e)a.currentPose = e;
                c.setComponent(a);
                return a
            })
        };
        return c
    });
    o("goo/animation/Joint", ["goo/math/Transform"], function (g) {
        function d(b) {
            this._name = b;
            this._parentIndex = this._index = 0;
            this._inverseBindPose = new g
        }

        d.NO_PARENT = -32768;
        return d
    });
    o("goo/animation/SkeletonPose", ["goo/math/Transform", "goo/animation/Joint",
        "goo/math/Matrix4x4"], function (g, d, b) {
        function a(a) {
            this._skeleton = a;
            this._localTransforms = [];
            this._globalTransforms = [];
            this._matrixPalette = [];
            this._poseListeners = [];
            for (var a = this._skeleton._joints.length, e = 0; e < a; e++)this._localTransforms[e] = new g;
            for (e = 0; e < a; e++)this._globalTransforms[e] = new g;
            for (e = 0; e < a; e++)this._matrixPalette[e] = new b;
            this.setToBindPose()
        }

        a.prototype.setToBindPose = function () {
            for (var a = 0; a < this._localTransforms.length; a++) {
                this._localTransforms[a].matrix.copy(this._skeleton._joints[a]._inverseBindPose.matrix).invert();
                var e = this._skeleton._joints[a]._parentIndex;
                e !== d.NO_PARENT && b.combine(this._skeleton._joints[e]._inverseBindPose.matrix, this._localTransforms[a].matrix, this._localTransforms[a].matrix)
            }
            this.updateTransforms()
        };
        a.prototype.updateTransforms = function () {
            for (var a = 0; a < this._skeleton._joints.length; a++) {
                var e = this._skeleton._joints[a]._parentIndex;
                e !== d.NO_PARENT ? b.combine(this._globalTransforms[e].matrix, this._localTransforms[a].matrix, this._globalTransforms[a].matrix) : this._globalTransforms[a].matrix.copy(this._localTransforms[a].matrix);
                b.combine(this._globalTransforms[a].matrix, this._skeleton._joints[a]._inverseBindPose.matrix, this._matrixPalette[a])
            }
            this.firePoseUpdated()
        };
        a.prototype.firePoseUpdated = function () {
            for (var a = this._poseListeners.length; --a >= 0;)this._poseListeners[a].poseUpdated(this)
        };
        return a
    });
    o("goo/math/Quaternion", ["goo/math/Vector", "goo/math/Vector3", "goo/math/Matrix3x3", "goo/math/MathUtils"], function (g, d, b, a) {
        function f() {
            g.call(this, 4);
            arguments.length !== 0 ? this.set(arguments) : this.setd(0, 0, 0, 1)
        }

        f.prototype =
            Object.create(g.prototype);
        f.prototype.setupAliases([["x"], ["y"], ["z"], ["w"]]);
        f.IDENTITY = new f(0, 0, 0, 1);
        f.ALLOWED_DEVIANCE = 1.0E-8;
        f.add = function (a, c, b) {
            b || (b = new f);
            b.data[0] = a.data[0] + c.data[0];
            b.data[1] = a.data[1] + c.data[1];
            b.data[2] = a.data[2] + c.data[2];
            b.data[3] = a.data[3] + c.data[3];
            return b
        };
        f.sub = function (a, c, b) {
            b || (b = new f);
            b.data[0] = a.data[0] - c.data[0];
            b.data[1] = a.data[1] - c.data[1];
            b.data[2] = a.data[2] - c.data[2];
            b.data[3] = a.data[3] - c.data[3];
            return b
        };
        f.mul = function (a, c, b) {
            b || (b = new f);
            b.data[0] =
                a.data[0] * c.data[0];
            b.data[1] = a.data[1] * c.data[1];
            b.data[2] = a.data[2] * c.data[2];
            b.data[3] = a.data[3] * c.data[3];
            return b
        };
        f.div = function (a, c, b) {
            b || (b = new f);
            var d = !0;
            b.data[0] = (d &= c.data[0] < 0 || c.data[0] > 0) ? a.data[0] / c.data[0] : 0;
            b.data[1] = (d &= c.data[1] < 0 || c.data[1] > 0) ? a.data[1] / c.data[1] : 0;
            b.data[2] = (d &= c.data[2] < 0 || c.data[2] > 0) ? a.data[2] / c.data[2] : 0;
            b.data[3] = (d &= c.data[3] < 0 || c.data[3] > 0) ? a.data[3] / c.data[3] : 0;
            d === !1 && console.warn("[Quaternion.div] Attempted to divide by zero!");
            return b
        };
        f.scalarAdd =
            function (a, c, b) {
                b || (b = new f);
                b.data[0] = a.data[0] + c;
                b.data[1] = a.data[1] + c;
                b.data[2] = a.data[2] + c;
                b.data[3] = a.data[3] + c;
                return b
            };
        f.scalarSub = function (a, c, b) {
            b || (b = new f);
            b.data[0] = a.data[0] - c;
            b.data[1] = a.data[1] - c;
            b.data[2] = a.data[2] - c;
            b.data[3] = a.data[3] - c;
            return b
        };
        f.scalarMul = function (a, c, b) {
            b || (b = new f);
            b.data[0] = a.data[0] * c;
            b.data[1] = a.data[1] * c;
            b.data[2] = a.data[2] * c;
            b.data[3] = a.data[3] * c;
            return b
        };
        f.scalarDiv = function (a, b, d) {
            d || (d = new f);
            var g = !0, b = (g &= b < 0 || b > 0) ? 1 / b : 0;
            d.data[0] = a.data[0] * b;
            d.data[1] =
                a.data[1] * b;
            d.data[2] = a.data[2] * b;
            d.data[3] = a.data[3] * b;
            g === !1 && console.warn("[Quaternion.scalarDiv] Attempted to divide by zero!");
            return d
        };
        f.slerp = function (a, b, d, f) {
            if (d === 0)return f.setv(a); else if (d === 1)return f.setv(b);
            if (a.equals(b))return f.setv(a);
            var g = a.dot(b);
            f.setv(b);
            g < 0 && (f.negate(), g = -g);
            var b = 1 - d, h = d;
            1 - g > 0.1 && (g = Math.acos(g), h = 1 / Math.sin(g), b = Math.sin((1 - d) * g) * h, h *= Math.sin(d * g));
            f.setd(b * a.data[0] + h * f.data[0], b * a.data[1] + h * f.data[1], b * a.data[2] + h * f.data[2], b * a.data[3] + h * f.data[3]);
            return f
        };
        f.prototype.negate = function () {
            this.data[0] *= -1;
            this.data[1] *= -1;
            this.data[2] *= -1;
            this.data[3] *= -1;
            return this
        };
        f.prototype.dot = function (a) {
            var b = this.data, a = a.data || a, d = 0;
            d += b[0] * a[0];
            d += b[1] * a[1];
            d += b[2] * a[2];
            d += b[3] * a[3];
            return d
        };
        f.prototype.add = function (a) {
            return f.add(this, a, this)
        };
        f.prototype.sub = function (a) {
            return f.sub(this, a, this)
        };
        f.prototype.mul = function (a) {
            return f.mul(this, a, this)
        };
        f.prototype.div = function (a) {
            return f.div(this, a, this)
        };
        f.prototype.scalarAdd = function (a) {
            return f.scalarAdd(this,
                a, this)
        };
        f.prototype.scalarSub = function (a) {
            return f.scalarSub(this, a, this)
        };
        f.prototype.scalarMul = function (a) {
            return f.scalarMul(this, a, this)
        };
        f.prototype.scalarDiv = function (a) {
            return f.scalarDiv(this, a, this)
        };
        f.prototype.slerp = function (a, b) {
            var d = (new f).copy(a);
            f.slerp(this, a, b, d);
            this.copy(d);
            return this
        };
        f.prototype.fromRotationMatrix = function (a) {
            var b = a.e00 + a.e11 + a.e22, d, f, g;
            if (b >= 0) {
                var h = Math.sqrt(b + 1);
                g = 0.5 * h;
                h = 0.5 / h;
                b = (a.e21 - a.e12) * h;
                d = (a.e02 - a.e20) * h;
                f = (a.e10 - a.e01) * h
            } else a.e00 > a.e11 &&
            a.e00 > a.e22 ? (h = Math.sqrt(1 + a.e00 - a.e11 - a.e22), b = h * 0.5, h = 0.5 / h, d = (a.e10 + a.e01) * h, f = (a.e02 + a.e20) * h, g = (a.e21 - a.e12) * h) : a.e11 > a.e22 ? (h = Math.sqrt(1 + a.e11 - a.e00 - a.e22), d = h * 0.5, h = 0.5 / h, b = (a.e10 + a.e01) * h, f = (a.e21 + a.e12) * h, g = (a.e02 - a.e20) * h) : (h = Math.sqrt(1 + a.e22 - a.e00 - a.e11), f = h * 0.5, h = 0.5 / h, b = (a.e02 + a.e20) * h, d = (a.e21 + a.e12) * h, g = (a.e10 - a.e01) * h);
            return this.set(b, d, f, g)
        };
        f.prototype.toRotationMatrix = function (a) {
            a || (a = new b);
            var c = this.magnitudeSquared(), c = c > 0 ? 2 / c : 0, d = this.data, f = d[0] * c, g = d[1] * c, h = d[2] * c, c =
                d[0] * f, l = d[0] * g, n = d[0] * h;
            f *= d[3];
            var q = d[1] * g, r = d[1] * h;
            g *= d[3];
            var m = d[2] * h, d = d[3] * h, h = a.data;
            h[0] = 1 - (q + m);
            h[1] = l + d;
            h[2] = n - g;
            h[3] = l - d;
            h[4] = 1 - (c + m);
            h[5] = r + f;
            h[6] = n + g;
            h[7] = r - f;
            h[8] = 1 - (c + q);
            return a
        };
        f.prototype.fromVectorToVector = function (b, c) {
            var g = b.length() * c.length();
            if (Math.abs(g) > a.EPSILON) {
                var j = new d, k = b.dot(c) / g, g = Math.acos(Math.max(-1, Math.min(k, 1)));
                b.cross(c, j);
                k < 0 && j.length() < a.EPSILON && (k = Math.abs(b.x) > Math.abs(b.y) ? Math.abs(b.x) > Math.abs(b.z) ? 0 : 2 : Math.abs(b.y) > Math.abs(b.z) ? 1 : 2, j.setValue(k,
                    -b[(k + 1) % 3]), j.setValue((k + 1) % 3, b[k]), j.setValue((k + 2) % 3, 0));
                return this.fromAngleAxis(g, j)
            } else return this.set(f.IDENTITY)
        };
        f.prototype.normalize = function () {
            var a = 1 / this.magnitude();
            return this.set(this.x * a, this.y * a, this.z * a, this.w * a)
        };
        f.prototype.magnitude = function () {
            var a = this.data[0] * this.data[0] + this.data[1] * this.data[1] + this.data[2] * this.data[2] + this.data[3] * this.data[3];
            return a === 1 ? 1 : Math.sqrt(a)
        };
        f.prototype.magnitudeSquared = function () {
            return this.data[0] * this.data[0] + this.data[1] * this.data[1] +
                this.data[2] * this.data[2] + this.data[3] * this.data[3]
        };
        f.prototype.fromAngleAxis = function (a, b) {
            var f = (new d(b)).normalize();
            return this.fromAngleNormalAxis(a, f)
        };
        f.prototype.fromAngleNormalAxis = function (b, c) {
            if (c.equals(d.ZERO))return this.set(f.IDENTITY);
            var g = 0.5 * b, j = a.sin(g), g = a.cos(g), k = j * c.getX(), h = j * c.getY();
            j *= c.getZ();
            return this.set(k, h, j, g)
        };
        f.prototype.toAngleAxis = function (a) {
            var b = this.x * this.x + this.y * this.y + this.z * this.z, d;
            if (Math.abs(b) <= f.ALLOWED_DEVIANCE) {
                if (d = 0, a !== null)a.x = 1, a.y = 0,
                    a.z = 0
            } else if (d = 2 * Math.acos(this.w), a !== null)b = 1 / Math.sqrt(b), a.x = this.x * b, a.y = this.y * b, a.z = this.z * b;
            return d
        };
        f.prototype.equals = function (a) {
            return this === a ? !0 : !a instanceof f ? !1 : Math.abs(this.data[0] - a.data[0]) < f.ALLOWED_DEVIANCE && Math.abs(this.data[1] - a.data[1]) < f.ALLOWED_DEVIANCE && Math.abs(this.data[2] - a.data[2]) < f.ALLOWED_DEVIANCE && Math.abs(this.data[3] - a.data[3]) < f.ALLOWED_DEVIANCE
        };
        f.prototype.setd = function (a, b, d, f) {
            this.data[0] = a;
            this.data[1] = b;
            this.data[2] = d;
            this.data[3] = f;
            return this
        };
        f.prototype.seta =
            function (a) {
                this.data[0] = a[0];
                this.data[1] = a[1];
                this.data[2] = a[2];
                this.data[3] = a[3];
                return this
            };
        f.prototype.setv = function (a) {
            this.data[0] = a.data[0];
            this.data[1] = a.data[1];
            this.data[2] = a.data[2];
            this.data[3] = a.data[3];
            return this
        };
        return f
    });
    o("goo/loaders/JsonUtils", "goo/renderer/BufferUtils,goo/math/Transform,goo/math/Matrix3x3,goo/math/Matrix4x4,goo/math/Vector3,goo/math/Quaternion".split(","), function (g, d, b, a, f, e) {
        function c() {
        }

        c.fillAttributeBufferFromCompressedString = function (a, b, e, d, f) {
            var b =
                b.getAttributeBuffer(e), e = d.length, g = a.length / d.length, q, r, m, o, x;
            for (x = 0; x < e; x++)if (d[x] === 0)return;
            for (x = 0; x < e; x++)for (o = q = 0; o < g; o++)r = a.charCodeAt(o + x * g), m = o * e + x, q += c.unzip(r), b[m] = (q + f[x]) * d[x]
        };
        c.fillAttributeBuffer = function (a, b, c) {
            b = b.getAttributeBuffer(c);
            for (c = 0; c < a.length; c++)b[c] = a[c]
        };
        c.getIntBuffer = function (a, b) {
            var c = g.createIndexBuffer(a.length, b);
            c.set(a);
            return c
        };
        c.rewrap = function (a) {
            a %= 61404;
            a < 0 && (a += 61404);
            return a
        };
        c.getIntBufferFromCompressedString = function (a, b) {
            for (var e = 0, d =
                g.createIndexBuffer(a.length, b), f = 0; f < a.length; ++f) {
                var n = a.charCodeAt(f), e = n = e + c.unzip(n);
                d[f] = this.rewrap(n)
            }
            return d
        };
        c.unzip = function (a) {
            a >= 57344 && (a -= 2048);
            a -= 35;
            return a >> 1 ^ -(a & 1)
        };
        c.parseTransform = function (a) {
            var b = new d;
            b.translation = c.parseVector3(a.translation);
            b.scale = c.parseVector3(a.scale);
            b.rotation = c.parseMatrix3(a.rotation);
            return b
        };
        c.parseTransformQuat = function (a) {
            var b = new d;
            b.translation = c.parseVector3(a.translation);
            b.scale = c.parseVector3(a.scale);
            b.rotation = c.parseQuaternion(a.rotation).toRotationMatrix();
            return b
        };
        c.parseTransformEuler = function (a) {
            var b = new d;
            b.translation = c.parseVector3(a.translation);
            b.scale = c.parseVector3(a.scale);
            a = c.parseVector3(a.rotation);
            b.setRotationXYZ(a.x, a.y, a.z);
            return b
        };
        c.parseTransformMatrix = function (a) {
            var b = new d;
            b.matrix = c.parseMatrix4(a.matrix);
            return b
        };
        c.parseMatrix3 = function (a) {
            var c = new b;
            c.e00 = a[0];
            c.e01 = a[1];
            c.e02 = a[2];
            c.e10 = a[3];
            c.e11 = a[4];
            c.e12 = a[5];
            c.e20 = a[6];
            c.e21 = a[7];
            c.e22 = a[8];
            return c
        };
        c.parseMatrix4 = function (b) {
            var c = new a;
            c.e00 = b[0];
            c.e01 = b[1];
            c.e02 = b[2];
            c.e03 = b[3];
            c.e10 = b[4];
            c.e11 = b[5];
            c.e12 = b[6];
            c.e13 = b[7];
            c.e20 = b[8];
            c.e21 = b[9];
            c.e22 = b[10];
            c.e23 = b[11];
            c.e30 = b[12];
            c.e31 = b[13];
            c.e32 = b[14];
            c.e33 = b[15];
            return c
        };
        c.parseQuaternion = function (a) {
            var b = new e;
            b.x = a[0];
            b.y = a[1];
            b.z = a[2];
            b.w = a[3];
            return b
        };
        c.parseVector3 = function (a) {
            return new f(a[0], a[1], a[2])
        };
        c.parseChannelTimes = function (a, b) {
            var e = a.times;
            if (e)if (b) {
                var d = a.timeOffsetScale;
                return c.parseFloatArrayFromCompressedString(e, [d[1]], [d[0]])
            } else return e;
            return null
        };
        c.parseFloatLERPValues =
            function (a, b) {
                var e = a.values;
                if (e)if (b) {
                    var d = a.offsetScale;
                    return c.parseFloatArrayFromCompressedString(e, [d[1]], [d[0]])
                } else return e;
                return null
            };
        c.parseRotationSamples = function (a, b, e) {
            return (a = a.rotationSamples) ? e ? (b = 1 - (b + 1 >> 1), e = 1 / -b, c.parseFloatArrayFromCompressedString(a, [e, e, e, e], [b, b, b, b])) : c.parseQuaternionSamples(a) : null
        };
        c.parseTranslationSamples = function (a, b, e) {
            var d = a.uniformTranslation;
            if (d) {
                for (var a = d[0], e = d[1], d = d[2], f = [], g = 0; g < b; g++)f[g * 3 + 0] = a, f[g * 3 + 1] = e, f[g * 3 + 2] = d;
                return f
            }
            return (b =
                a.translationSamples) ? e ? (a = a.translationOffsetScale, e = a[3], c.parseFloatArrayFromCompressedString(b, [e, e, e], [a[0], a[1], a[2]])) : c.parseVector3Samples(b) : null
        };
        c.parseScaleSamples = function (a, b, e) {
            var d = a.uniformScale;
            if (d) {
                for (var a = d, e = a[0], d = a[1], a = a[2], f = [], g = 0; g < b; g++)f[g * 3 + 0] = e, f[g * 3 + 1] = d, f[g * 3 + 2] = a;
                return f
            }
            return (b = a.scaleSamples) ? e ? (a = a.scaleOffsetScale, e = a[0], d = a[1], f = a[2], a = a[3], c.parseFloatArrayFromCompressedString(b, [a, a, a], [e, d, f])) : c.parseVector3Samples(b) : null
        };
        c.parseQuaternionSamples =
            function (a) {
                if (!a)return null;
                for (var b = [], c = new e, d = 0, f = a.length; d < f; d++) {
                    var g = a[d];
                    if (g === "*")b[d * 4 + 0] = c.x, b[d * 4 + 1] = c.y, b[d * 4 + 2] = c.z, b[d * 4 + 3] = c.w; else if (g instanceof Array && g.length === 4)c.set(g[0], g[1], g[2], g[3]), b[d * 4 + 0] = c.x, b[d * 4 + 1] = c.y, b[d * 4 + 2] = c.z, b[d * 4 + 3] = c.w
                }
                return b
            };
        c.parseVector3Samples = function (a) {
            if (!a)return null;
            for (var b = [], c = new f, e = 0, d = a.length; e < d; e++) {
                var g = a[e];
                if (g === "*")b[e * 3 + 0] = c.x, b[e * 3 + 1] = c.y, b[e * 3 + 2] = c.z; else if (g instanceof Array && g.length === 3)c.set(g[0], g[1], g[2]), b[e *
                3 + 0] = c.x, b[e * 3 + 1] = c.y, b[e * 3 + 2] = c.z
            }
            return b
        };
        c.parseFloatArrayFromCompressedString = function (a, b, e) {
            var d = [], f = b.length, g = a.length / b.length, q, r, m, o, x;
            for (x = 0; x < f; x++)for (o = q = 0; o < g; o++)r = a.charCodeAt(o + x * g), m = o * f + x, q += c.unzip(r), d[m] = (q + e[x]) * b[x];
            return d
        };
        return c
    });
    o("goo/util/ArrayUtil", [], function () {
        return {
            getTypedArray: function (g, d) {
                var b = d[0], a = d[1], f = d[2];
                if (f === "float32")return new Float32Array(g, b, a); else if (f === "uint8")return new Uint8Array(g, b, a); else if (f === "uint16")return new Uint16Array(g,
                    b, a); else if (f === "uint32")return new Uint32Array(g, b, a); else throw Error("Binary format #{format} is not supported");
            }, remove: function (g, d) {
                var b = g.indexOf(d);
                b > -1 && g.splice(b, 1)
            }
        }
    });
    o("goo/loaders/handlers/MeshDataHandler", "goo/loaders/handlers/ConfigHandler,goo/renderer/MeshData,goo/animation/SkeletonPose,goo/loaders/JsonUtils,goo/util/PromiseUtil,goo/util/ObjectUtil,goo/util/ArrayUtil".split(","), function (g, d, b, a, f, e, c) {
        function i() {
            g.apply(this, arguments);
            this._objects = {}
        }

        i.prototype = Object.create(g.prototype);
        g._registerClass("mesh", i);
        i.prototype.update = function (a, b) {
            var c = this;
            return this._objects[a] ? f.createDummyPromise(this._objects[a]) : b.binaryData ? this.getConfig(b.binaryData).then(function (e) {
                if (!e)throw Error("Binary mesh data was empty");
                return c._createMeshData(b, e).then(function (b) {
                    return c._objects[a] = b
                })
            }) : this._createMeshData(b, null).then(function (b) {
                return c._objects[a] = b
            })
        };
        i.prototype.remove = function () {
        };
        i.prototype._createMeshData = function (a, b) {
            var c;
            a.compression && a.compression.compressed &&
            (c = {
                compressedVertsRange: a.compression.compressedVertsRange || 16383,
                compressedColorsRange: a.compression.compressedColorsRange || 255,
                compressedUnitVectorRange: a.compression.compressedUnitVectorRange || 1023
            });
            var e = this._createMeshDataObject(a);
            this._fillMeshData(e, a, b, c);
            if (a.pose)a.poseRef = a.pose;
            return f.createDummyPromise(e)
        };
        i.prototype._createMeshDataObject = function (a) {
            var b, c, e, f, g;
            e = a.data || a;
            a.type === "SkinnedMesh" ? (g = 4, a = d.SKINMESH) : (g = 0, a = d.MESH);
            f = e.vertexCount;
            if (f === 0)return null;
            c = e.indexLengths !=
            null ? e.indexLengths[0] : e.indices != null ? e.indices.length : 0;
            b = {};
            if (e.vertices && e.vertices.length > 0)b.POSITION = d.createAttribute(3, "Float");
            if (e.normals && e.normals.length > 0)b.NORMAL = d.createAttribute(3, "Float");
            if (e.tangents && e.tangents.length > 0)b.TANGENT = d.createAttribute(4, "Float");
            if (e.colors && e.colors.length > 0)b.COLOR = d.createAttribute(4, "Float");
            if (g > 0 && e.weights)b.WEIGHTS = d.createAttribute(4, "Float");
            if (g > 0 && e.joints)b.JOINTIDS = d.createAttribute(4, "Short");
            if (e.textureCoords && e.textureCoords.length >
                0)for (g = 0; g < e.textureCoords.length; g++)b["TEXCOORD" + g] = d.createAttribute(2, "Float");
            e = new d(b, f, c);
            e.type = a;
            return e
        };
        i.prototype._fillMeshData = function (b, e, f, g) {
            var i = this, q = e.data || e, r;
            r = b.type === d.SKINMESH ? 4 : 0;
            var m = function (d, m) {
                var q;
                m != null && m.length && (g ? (q = i._getCompressionOptions(d, e, g), a.fillAttributeBufferFromCompressedString(m, b, d, q.scale, q.offset)) : f ? b.getAttributeBuffer(d).set(c.getTypedArray(f, m)) : a.fillAttributeBuffer(m, b, d))
            };
            m(d.POSITION, q.vertices);
            m(d.NORMAL, q.normals);
            m(d.TANGENT,
                q.tangents);
            m(d.COLOR, q.colors);
            b.type === d.SKINMESH && m(d.WEIGHTS, q.weights);
            if (q.textureCoords != null && q.textureCoords.length > 0)for (var o = q.textureCoords, x = 0; x < o.length; x++) {
                var p = o[x];
                m("TEXCOORD" + x, p.UVs || p)
            }
            if (r > 0 && q.joints != null && q.joints.length > 0)if (m = b.getAttributeBuffer(d.JOINTIDS), o = this._getIntBuffer(q.joints, 32767, f, g), b.type === d.SKINMESH) {
                for (var x = [], w = p = 0; w < o.length; w++) {
                    var y = o[w];
                    x[y] === void 0 && (x[y] = p++);
                    m.set([x[y]], w)
                }
                m = [];
                for (y = 0; y < x.length; y++)p = x[y], p !== null && (m[p] = y);
                b.paletteMap =
                    m;
                b.weightsPerVertex = r
            } else for (r = 0; 0 < o.capacity(); r++)m.putCast(r, o.get(r));
            q.indices && b.getIndexBuffer().set(this._getIntBuffer(q.indices, q.vertexCount, f, g));
            if (q.indexModes)b.indexModes = q.indexModes.slice(0);
            if (q.indexLengths)b.indexLengths = q.indexLengths.slice(0);
            if (q.boundingBox)b.boundingBox = q.boundingBox;
            return b
        };
        i.prototype._getIntBuffer = function (b, e, d, f) {
            return b ? f ? a.getIntBufferFromCompressedString(b, e) : d ? c.getTypedArray(d, b) : a.getIntBuffer(b, e) : null
        };
        i.prototype._getCompressionOptions =
            function (a, b, c) {
                var e, b = b.data || b;
                a === d.POSITION ? (c = b.vertexOffsets, e = {
                    offset: [c.xOffset, c.yOffset, c.zOffset],
                    scale: [b.vertexScale, b.vertexScale, b.vertexScale]
                }) : a === d.WEIGHTS ? (c = 1 / c.compressedVertsRange, e = {
                    offset: [0],
                    scale: [c]
                }) : a === d.NORMAL ? (b = 1 - (c.compressedUnitVectorRange + 1 >> 1), c = 1 / -b, e = {
                    offset: [b, b, b],
                    scale: [c, c, c]
                }) : a === d.TANGENT ? (b = 1 - (c.compressedUnitVectorRange + 1 >> 1), c = 1 / -b, e = {
                    offset: [b, b, b, b],
                    scale: [c, c, c, c]
                }) : a === d.COLOR ? (b = 0, c = 1 / (c.compressedColorsRange + 1), e = {
                    offset: [b, b, b, b], scale: [c,
                        c, c, c]
                }) : a.substr(0, 8) === "TEXCOORD" && (c = parseInt(a.substr(8)), c = b.textureCoords[c], e = {
                    offset: c.UVOffsets,
                    scale: c.UVScales
                });
                return e
            };
        return i
    });
    o("goo/loaders/handlers/MeshRendererComponentHandler", ["goo/loaders/handlers/ComponentHandler", "goo/entities/components/MeshRendererComponent", "goo/util/rsvp", "goo/util/PromiseUtil", "goo/util/ObjectUtil"], function (g, d, b, a, f) {
        function e() {
            g.apply(this, arguments)
        }

        e.prototype = Object.create(g.prototype);
        g._registerClass("meshRenderer", e);
        e.prototype._prepare =
            function (a) {
                return f.defaults(a, {materialRefs: [], cullMode: "Dynamic", castShadows: !1, receiveShadows: !1})
            };
        e.prototype._create = function (a) {
            var b = new d;
            a.setComponent(b);
            return b
        };
        e.prototype.update = function (c, e) {
            var d, k = g.prototype.update.call(this, c, e);
            d = e.materialRefs;
            if (!d || d.length === 0)console.log("No material refs"), d = a.createDummyPromise([]); else {
                for (var h = [], l = 0; l < d.length; l++)h.push(this._getMaterial(d[l]));
                d = b.all(h)
            }
            return d.then(function (a) {
                var b;
                k.materials = a;
                for (b in e)a = e[b], b !== "materials" &&
                k.hasOwnProperty(b) && (k[b] = f.clone(a));
                return k
            }).then(null, function (a) {
                return console.error("Error handling materials " + a)
            })
        };
        e.prototype._getMaterial = function (a) {
            var b = this;
            return this.getConfig(a).then(function (e) {
                return b.updateObject(a, e, b.options)
            })
        };
        return e
    });
    o("goo/loaders/handlers/SceneHandler", ["goo/loaders/handlers/ConfigHandler", "goo/util/rsvp"], function (g, d) {
        function b() {
            g.apply(this, arguments)
        }

        b.prototype = Object.create(g.prototype);
        g._registerClass("scene", b);
        b.prototype._prepare = function () {
        };
        b.prototype._create = function () {
        };
        b.prototype.update = function (a, b) {
            var e = this, c = [];
            if (b.entityRefs != null && b.entityRefs.length) {
                for (var g = function (a) {
                    return c.push(e.getConfig(a).then(function (b) {
                        return e.updateObject(a, b, e.options)
                    }))
                }, j = 0; j < b.entityRefs.length; j++)g(b.entityRefs[j]);
                return d.all(c).then(function (a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b];
                        (e.options.beforeAdd == null || e.options.beforeAdd.apply == null || e.options.beforeAdd(c)) && c.addToWorld()
                    }
                }).then(null, function (a) {
                    return console.error("Error updating entities: " +
                        a)
                })
            } else return console.warn("No entity refs in scene " + a), b
        };
        b.prototype.remove = function () {
        };
        return b
    });
    o("goo/loaders/handlers/ShaderHandler", "goo/loaders/handlers/ConfigHandler,goo/renderer/Material,goo/renderer/MeshData,goo/renderer/Shader,goo/renderer/shaders/ShaderLib,goo/renderer/shaders/ShaderBuilder,goo/util/rsvp,goo/util/ObjectUtil".split(","), function (g, d, b, a, f, e, c, i) {
        function j() {
            g.apply(this, arguments)
        }

        j.prototype = Object.create(g.prototype);
        g._registerClass("shader", j);
        j.prototype._create =
            function () {
            };
        j.prototype.update = function (a, b) {
            var f;
            console.log("Updating shader " + a);
            if (b != null && b.attributes != null && b.uniforms != null) {
                f = {attributes: b.attributes, uniforms: b.uniforms};
                for (var g in f.uniforms) {
                    var j = f.uniforms[g];
                    if (typeof j === "string" && (j = j.match(/^function\s?\(([^\)]*)\)\s*\{(.*)\}$/), (j != null ? j.length : void 0) === 3)) {
                        var r = j[1].replace(" ", "").split(",");
                        f.uniforms[g] = new Function(r, j[2])
                    }
                }
                if (b.processors) {
                    f.processors = [];
                    for (g = 0; g < b.processors.length; g++)if (j = b.processors[g], e[j])f.processors.push(e[j].processor);
                    else throw Error("Unknown processor: " + j);
                }
                if (b.defines)f.defines = b.defines
            } else f = this._getDefaultShaderDefinition();
            g = [this.getConfig(b.vshaderRef), this.getConfig(b.fshaderRef)];
            return c.all(g).then(function (c) {
                var e;
                e = c[0];
                c = c[1];
                if (e)if (c)return i.extend(f, {
                    attributes: b.attributes || {},
                    uniforms: b.uniforms || {},
                    vshader: e,
                    fshader: c
                }), d.createShader(f, a); else console.warn("Fragment shader", b.fshaderRef, "in shader", a, "not found"); else console.warn("Vertex shader", b.vshaderRef, "in shader", a, "not found")
            })
        };
        j.prototype.remove = function () {
        };
        j.prototype._getDefaultShaderDefinition = function () {
            return {
                attributes: {vertexPosition: b.POSITION, vertexNormal: b.NORMAL, vertexUV0: b.TEXCOORD0},
                uniforms: {
                    viewMatrix: a.VIEW_MATRIX,
                    projectionMatrix: a.PROJECTION_MATRIX,
                    worldMatrix: a.WORLD_MATRIX,
                    cameraPosition: a.CAMERA,
                    lightPosition: a.LIGHT0,
                    diffuseMap: a.DIFFUSE_MAP,
                    materialAmbient: a.AMBIENT,
                    materialDiffuse: a.DIFFUSE,
                    materialSpecular: a.SPECULAR,
                    materialSpecularPower: a.SPECULAR_POWER
                }
            }
        };
        return j
    });
    o("goo/animation/Skeleton",
        ["goo/animation/Joint"], function (g) {
            function d(b, a) {
                this._name = b;
                this._joints = a
            }

            d.prototype.copy = function () {
                for (var b = this._name, a = this._joints, f = [], e = 0, c = a.length; e < c; e++) {
                    var i = a[e], j = new g(i._name);
                    j._index = i._index;
                    j._parentIndex = i._parentIndex;
                    j._inverseBindPose.copy(i._inverseBindPose);
                    j._inverseBindPose.update();
                    f[e] = j
                }
                return new d(b, f)
            };
            return d
        });
    o("goo/loaders/handlers/SkeletonHandler", "goo/loaders/handlers/ConfigHandler,goo/animation/Joint,goo/animation/Skeleton,goo/animation/SkeletonPose,goo/loaders/JsonUtils,goo/util/PromiseUtil".split(","),
        function (g, d, b, a, f, e) {
            function c() {
                g.apply(this, arguments)
            }

            c.prototype = Object.create(g.prototype);
            g._registerClass("skeleton", c);
            c.prototype._create = function (c) {
                console.debug("Creating skeleton");
                for (var e = [], g = 0; g < c.joints.length; g++) {
                    var h = c.joints[g], l = new d(h.name);
                    l._index = Math.round(h.index);
                    l._parentIndex = Math.round(h.parentIndex);
                    l._inverseBindPose.copy((h.inverseBindPose.matrix ? f.parseTransformMatrix : h.inverseBindPose.rotation.length === 4 ? f.parseTransformQuat : h.inverseBindPose.rotation.length ===
                    3 ? f.parseTransformEuler : f.parseTransform)(h.inverseBindPose));
                    h.inverseBindPose.matrix || l._inverseBindPose.update();
                    e.push(l)
                }
                c = new b(c.name, e);
                c = new a(c);
                c.setToBindPose();
                return c
            };
            c.prototype.update = function (a, b) {
                var c = this._create(b);
                return e.createDummyPromise(c)
            };
            c.prototype.remove = function () {
            };
            return c
        });
    o("goo/loaders/handlers/TextureHandler", "goo/loaders/handlers/ConfigHandler,goo/renderer/TextureCreator,goo/renderer/Texture,goo/loaders/dds/DdsLoader,goo/loaders/tga/TgaLoader,goo/util/rsvp,goo/util/PromiseUtil,goo/renderer/Util,goo/util/ObjectUtil".split(","),
        function (g, d, b, a, f, e, c, i, j) {
            function k() {
                g.apply(this, arguments);
                this._objects = {}
            }

            k.prototype = Object.create(g.prototype);
            g._registerClass("texture", k);
            k.loaders = {dds: a, tga: f};
            k.prototype._create = function (a, c) {
                j.defaults(c, {verticalFlip: !0});
                var e = {
                    wrapS: c.wrapU,
                    wrapT: c.wrapV,
                    magFilter: c.magFilter,
                    minFilter: c.minFilter,
                    repeat: c.repeat,
                    offset: c.offset
                }, e = this._objects[a] = new b(i.clone(d.DEFAULT_TEXTURE_2D.image), e);
                e.image.dataReady = !1;
                return e
            };
            k.prototype.update = function (a, b) {
                var f = b.url, g = f != null ?
                    f.split(".").pop().toLowerCase() : void 0, i;
                if (g === "mp4")return f = new e.Promise, i = (new d).loadTextureVideo(b.url, !0), c.createDummyPromise(i); else {
                    (i = this._objects[a]) || (i = this._create(a, b));
                    if (!b.url)return console.log("Texture " + a + " has no url"), c.createDummyPromise(i);
                    if (g in k.loaders) {
                        var j = new k.loaders[g];
                        i.a = f;
                        f = this.getConfig(f).then(function (a) {
                            j.load(a, i, b.verticalFlip, 0, a.byteLength);
                            return i
                        }).then(null, function (a) {
                            return console.error("Error loading texture: ", a)
                        })
                    } else if (g === "jpg" || g ===
                        "jpeg" || g === "png" || g === "gif")f = this.getConfig(f).then(function (a) {
                        i.setImage(a);
                        return i
                    }).then(null, function (a) {
                        return console.error("Error loading texture: ", a)
                    }); else throw Error("Unknown texture type " + g);
                }
                return this.options != null && this.options.dontWaitForTextures ? c.createDummyPromise(i) : f
            };
            k.prototype.remove = function (a) {
                console.log("Deleting texture " + a);
                return delete this._objects[a]
            };
            return k
        });
    o("goo/loaders/handlers/TransformComponentHandler", "goo/loaders/handlers/ComponentHandler,goo/entities/components/TransformComponent,goo/math/MathUtils,goo/util/rsvp,goo/util/PromiseUtil,goo/util/ObjectUtil".split(","),
        function (g, d, b, a, f, e) {
            function c() {
                g.apply(this, arguments)
            }

            c.prototype = Object.create(g.prototype);
            g._registerClass("transform", c);
            c.prototype._prepare = function (a) {
                return e.defaults(a, {translation: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1]})
            };
            c.prototype._create = function (a) {
                var b = new d;
                a.setComponent(b);
                return b
            };
            c.prototype.update = function (a, c) {
                var e = this, d = g.prototype.update.call(this, a, c);
                d.transform.translation.set(c.translation);
                c.rotation.length === 3 ? d.transform.setRotationXYZ(b.radFromDeg(c.rotation[0]),
                    b.radFromDeg(c.rotation[1]), b.radFromDeg(c.rotation[2])) : d.transform.rotation.set(c.rotation);
                d.transform.scale.set(c.scale);
                c.parentRef != null && this.getConfig(c.parentRef).then(function (a) {
                    return e.updateObject(c.parentRef, a, e.options).then(function (a) {
                        if (a != null) {
                            var b = d.parent;
                            if (b == null || b.entity !== a)return a.transformComponent.attachChild(d)
                        } else return console.warn("Could not find parent with ref " + c.parentRef)
                    })
                });
                d.setUpdated();
                return f.createDummyPromise(d)
            };
            c.prototype.remove = function (a) {
                a =
                    a.transformComponent;
                a.transform.translation.set(0, 0, 0);
                a.transform.setRotationXYZ(0, 0, 0);
                a.transform.scale.set(1, 1, 1);
                a.setUpdated()
            };
            return c
        });
    o("goo/animation/state/AbstractState", [], function () {
        function g() {
            this._globalStartTime = 0
        }

        g.prototype.update = function () {
        };
        g.prototype.postUpdate = function () {
        };
        g.prototype.getCurrentSourceData = function () {
        };
        g.prototype.resetClips = function (d) {
            this._globalStartTime = d
        };
        return g
    });
    o("goo/animation/state/SteadyState", ["goo/animation/state/AbstractState"], function (g) {
        function d(b) {
            g.call(this);
            this._name = b;
            this._transitions = {};
            this._sourceTree = null
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.update = function (b) {
            if (!this._sourceTree.setTime(b) && this.onFinished)this.onFinished()
        };
        d.prototype.getCurrentSourceData = function () {
            return this._sourceTree.getSourceData()
        };
        d.prototype.resetClips = function (b) {
            g.prototype.resetClips.call(this, b);
            this._sourceTree.resetClips(b)
        };
        d.prototype.setTimeScale = function (b) {
            this._sourceTree.setTimeScale(b)
        };
        return d
    });
    o("goo/animation/layer/AnimationLayer",
        ["goo/animation/state/SteadyState", "goo/entities/World"], function (g, d) {
            function b(a) {
                this._name = a;
                this._steadyStates = {};
                this._layerBlender = this._currentState = null;
                this._transitions = {};
                this._transitionStates = {}
            }

            b.BASE_LAYER_NAME = "-BASE_LAYER-";
            b.prototype.getStates = function () {
                return Object.keys(this._steadyStates)
            };
            b.prototype.getTransitions = function () {
                var a;
                a = this._currentState ? Object.keys(this._currentState._transitions) : [];
                if (this._transitions)for (var b in this._transitions)a.indexOf(b) === -1 && a.push(b);
                a.sort();
                return a
            };
            b.prototype.update = function (a) {
                this._currentState && this._currentState.update(a || d.time)
            };
            b.prototype.postUpdate = function () {
                this._currentState && this._currentState.postUpdate()
            };
            b.prototype.transitionTo = function (a, b) {
                var b = b || d.time, e = this._currentState, c;
                e && e._transitions && (c = e._transitions[a] || e._transitions["*"]);
                !c && this._transitions && (c = this._transitions[a] || this._transitions["*"]);
                if (e instanceof g && c) {
                    var i = this._transitionStates[c.type];
                    this._doTransition(i, e, this._steadyStates[a],
                        c, b);
                    return !0
                } else if (!e && (c = this._transitions[a]))if (i = this._transitionStates[c.type])return this._doTransition(i, null, this._steadyStates[a], c, b), !0;
                return !1
            };
            b.prototype._doTransition = function (a, b, e, c, d) {
                if (b) {
                    a._sourceState = b;
                    if (!a.isValid(c.timeWindow || [-1, -1], d)) {
                        console.warn("State not in allowed time window");
                        return
                    }
                    b.onFinished = null
                }
                a._targetState = e;
                a.readFromConfig(c);
                a.resetClips(d);
                this.setCurrentState(a)
            };
            b.prototype.setCurrentState = function (a, b, e) {
                e = e || d.time;
                if (this._currentState = a)b &&
                a.resetClips(e), a.onFinished = function () {
                    this.setCurrentState(a._targetState || null);
                    this.update()
                }.bind(this)
            };
            b.prototype.getCurrentState = function () {
                return this._currentState
            };
            b.prototype.setCurrentStateByName = function (a, b, e) {
                if (a) {
                    var c = this._steadyStates[a];
                    if (c)return this.setCurrentState(c, b, e), !0; else console.warn("unable to find SteadyState named: " + a)
                }
                return !1
            };
            b.prototype.getCurrentSourceData = function () {
                return this._layerBlender !== null ? this._layerBlender.getBlendedSourceData() : this._currentState !==
                null ? this._currentState.getCurrentSourceData() : null
            };
            b.prototype.updateLayerBlending = function (a) {
                if (this._layerBlender)this._layerBlender._layerA = a, this._layerBlender._layerB = this
            };
            b.prototype.clearCurrentState = function () {
                this.setCurrentState(null)
            };
            b.prototype.resetClips = function (a) {
                this._currentState && this._currentState.resetClips(a || d.time)
            };
            b.prototype.setTimeScale = function (a) {
                this._currentState && this._currentState.setTimeScale(a)
            };
            return b
        });
    o("goo/animation/clip/TransformData", ["goo/math/Quaternion",
        "goo/math/Vector3"], function (g, d) {
        function b(a) {
            this._rotation = (new g).copy(a ? a._rotation : g.IDENTITY);
            this._scale = (new d).copy(a ? a._scale : d.ONE);
            this._translation = (new d).copy(a ? a._translation : d.ZERO)
        }

        b.prototype.applyTo = function (a) {
            a.setIdentity();
            a.rotation.copyQuaternion(this._rotation);
            a.scale.setv(this._scale);
            a.translation.setv(this._translation);
            a.update()
        };
        b.prototype.set = function (a) {
            this._rotation.copy(a._rotation);
            this._scale.copy(a._scale);
            this._translation.copy(a._translation)
        };
        b.prototype.blend =
            function (a, d, e) {
                var e = e ? e : new b, c = 0, i = 0, j = 0, k = 0, h = 0, l = 0, n, q;
                q = 1 - d;
                n = this._translation;
                k += n.x * q;
                h += n.y * q;
                l += n.z * q;
                n = this._scale;
                c += n.x * q;
                i += n.y * q;
                j += n.z * q;
                q = d;
                n = a._translation;
                k += n.x * q;
                h += n.y * q;
                l += n.z * q;
                n = a._scale;
                c += n.x * q;
                i += n.y * q;
                j += n.z * q;
                e._scale.set(c, i, j);
                e._translation.set(k, h, l);
                g.slerp(this._rotation, a._rotation, q, e._rotation);
                return e
            };
        return b
    });
    o("goo/animation/clip/JointData", ["goo/animation/clip/TransformData"], function (g) {
        function d(b) {
            g.call(this, b);
            this._jointIndex = b ? b._jointIndex :
                0
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.constructor = d;
        d.prototype.set = function (b) {
            g.prototype.set.call(this, b);
            this._jointIndex = b._jointIndex
        };
        d.prototype.blend = function (b, a, f) {
            if (f) {
                if (f instanceof d)f._jointIndex = this._jointIndex
            } else f = new d, f._jointIndex = this._jointIndex;
            return g.prototype.blend.call(this, b, a, f)
        };
        return d
    });
    o("goo/animation/clip/TriggerData", [], function () {
        function g() {
            this._currentTriggers = [];
            this._currentIndex = -1;
            this.armed = !1
        }

        g.prototype.arm = function (d, b) {
            if (b ===
                null || b.length === 0)this._currentTriggers.length = 0, this.armed = !1; else if (d !== this._currentIndex) {
                for (var a = this._currentTriggers.length = 0, f = b.length; a < f; a++)b[a] && b[a] !== "" && this._currentTriggers.push(b[a]);
                this.armed = !0
            }
            this._currentIndex = d
        };
        return g
    });
    o("goo/entities/components/AnimationComponent", "goo/entities/components/Component,goo/entities/World,goo/animation/layer/AnimationLayer,goo/animation/clip/JointData,goo/animation/clip/TransformData,goo/animation/clip/TriggerData".split(","), function (g,
                                                                                                                                                                                                                                                                 d, b, a, f, e) {
        function c(a) {
            this.type = "AnimationComponent";
            this.layers = [];
            this.floats = {};
            this._updateRate = 1 / 60;
            this._lastUpdate = 0;
            this._triggerCallbacks = {};
            this.layers.push(new b(b.BASE_LAYER_NAME));
            this._skeletonPose = a
        }

        c.prototype = Object.create(g.prototype);
        c.prototype.transitionTo = function (a) {
            return this.layers[0].transitionTo(a)
        };
        c.prototype.getStates = function () {
            return this.layers[0].getStates()
        };
        c.prototype.getCurrentState = function () {
            return this.layers[0].getCurrentState()
        };
        c.prototype.getTransitions =
            function () {
                return this.layers[0].getTransitions()
            };
        c.prototype.update = function (a) {
            a = a || d.time;
            if (this._updateRate !== 0) {
                if (a > this._lastUpdate && a - this._lastUpdate < this._updateRate)return;
                this._lastUpdate = a - (a - this._lastUpdate) % this._updateRate
            }
            for (var b = 0, c = this.layers.length; b < c; b++)this.layers[b].update(a)
        };
        c.prototype.apply = function (b) {
            var c = this.getCurrentSourceData(), d = this._skeletonPose;
            if (c) {
                for (var g in c) {
                    var l = c[g];
                    if (l instanceof a)d && l._jointIndex >= 0 && l.applyTo(d._localTransforms[l._jointIndex]);
                    else if (l instanceof f)b && (l.applyTo(b.transform), b.updateTransform(), this._updateWorldTransform(b)); else if (l instanceof e) {
                        if (l.armed) {
                            for (var n = 0, q = l._currentTriggers.length; n < q; n++) {
                                var r = this._triggerCallbacks[l._currentTriggers[n]];
                                if (r && r.length)for (var m = 0, o = r.length; m < o; m++)r[m]()
                            }
                            l.armed = !1
                        }
                    } else l instanceof Array && (this.floats[g] = l[0])
                }
                d && d.updateTransforms()
            }
        };
        c.prototype._updateWorldTransform = function (a) {
            a.updateWorldTransform();
            for (var b = 0; b < a.children.length; b++)this._updateWorldTransform(a.children[b])
        };
        c.prototype.postUpdate = function () {
            for (var a = 0, b = this.layers.length; a < b; a++)this.layers[a].postUpdate()
        };
        c.prototype.getCurrentSourceData = function () {
            for (var a = this.layers.length - 1, b = 0; b < a; b++)this.layers[b + 1].updateLayerBlending(this.layers[b]);
            return this.layers[a].getCurrentSourceData()
        };
        c.prototype.addLayer = function (a, b) {
            isNaN(b) ? this.layers.push(a) : this.layers.splice(b, 0, a)
        };
        c.prototype.resetClips = function (a) {
            for (var b = 0; b < this.layers.length; b++)this.layers[b].resetClips(a)
        };
        c.prototype.setTimeScale =
            function (a) {
                for (var b = 0; b < this.layers.length; b++)this.layers[b].setTimeScale(a)
            };
        return c
    });
    o("goo/loaders/handlers/AnimationComponentHandler", "goo/loaders/handlers/ComponentHandler,goo/entities/components/AnimationComponent,goo/math/MathUtils,goo/util/rsvp,goo/util/PromiseUtil,goo/util/ObjectUtil".split(","), function (g, d, b, a, f) {
        function e() {
            g.apply(this, arguments)
        }

        e.prototype = Object.create(g.prototype);
        g._registerClass("animation", e);
        e.prototype._prepare = function () {
        };
        e.prototype._create = function (a) {
            var b =
                new d;
            a.setComponent(b);
            return b
        };
        e.prototype.update = function (b, e) {
            var d = this, k, h = g.prototype.update.call(this, b, e), l = e.layersRef, n = e.poseRef, q = [];
            n ? k = this.getConfig(n).then(function (a) {
                d.updateObject(n, a, d.options).then(function (a) {
                    return h._skeletonPose = a
                })
            }) : (console.log("No skeleton pose ref"), k = f.createDummyPromise());
            q.push(k);
            l ? k = this._getAnimationLayers(l).then(function (a) {
                return h.layers = a
            }) : (console.log("No animation tree ref"), k = f.createDummyPromise([]));
            q.push(k);
            return a.all(q).then(function () {
                return h
            })
        };
        e.prototype._getAnimationLayers = function (a) {
            var b = this;
            console.log("GetAnimationLayers " + a);
            return this.getConfig(a).then(function (e) {
                return b.updateObject(a, e, b.options)
            })
        };
        return e
    });
    o("goo/animation/blendtree/BinaryLERPSource", ["goo/math/MathUtils", "goo/animation/clip/TransformData"], function (g, d) {
        function b(a, b, e) {
            this._sourceA = a ? a : null;
            this._sourceB = b ? b : null;
            this.blendWeight = e ? e : null
        }

        b.prototype.getSourceData = function () {
            var a = this._sourceA ? this._sourceA.getSourceData() : null, d = this._sourceB ? this._sourceB.getSourceData() :
                null;
            return b.combineSourceData(a, d, this.blendWeight)
        };
        b.prototype.setTime = function (a) {
            var b = !1, e = !1;
            this._sourceA && (b = this._sourceA.setTime(a));
            this._sourceB && (e = this._sourceB.setTime(a));
            return b || e
        };
        b.prototype.resetClips = function (a) {
            this._sourceA && this._sourceA.resetClips(a);
            this._sourceB && this._sourceB.resetClips(a)
        };
        b.prototype.setTimeScale = function (a) {
            this._sourceA.setTimeScale(a);
            this._sourceB.setTimeScale(a)
        };
        b.prototype.isActive = function () {
            var a = !1;
            this._sourceA && (a = a || this._sourceA.isActive());
            this._sourceB && (a = a || this._sourceB.isActive());
            return a
        };
        b.combineSourceData = function (a, f, e, c) {
            if (f) {
                if (!a)return f
            } else return a;
            var c = c ? c : {}, g;
            for (g in a) {
                var j = a[g], k = f[g];
                isNaN(j) ? c[g] = j instanceof d ? k ? j.blend(k, e, c[g]) : j : j : b.blendFloatValues(c, g, e, j, k)
            }
            for (g in f)c[g] || (c[g] = f[g]);
            return c
        };
        b.blendFloatValues = function (a, b, e, c, d) {
            a[b] = isNaN(d) ? c : g.lerp(e, c[0], d[0])
        };
        return b
    });
    o("goo/animation/layer/LayerLERPBlender", ["goo/animation/blendtree/BinaryLERPSource"], function (g) {
        function d() {
            this._layerB =
                this._layerA = this._blendWeight = null
        }

        d.prototype.getBlendedSourceData = function () {
            var b = this._layerA.getCurrentSourceData(), a = this._layerB._currentState ? this._layerB._currentState.getCurrentSourceData() : null;
            return g.combineSourceData(b, a, this._blendWeight)
        };
        return d
    });
    o("goo/animation/clip/AnimationClipInstance", ["goo/entities/World"], function (g) {
        function d() {
            this._active = !0;
            this._loopCount = 0;
            this._timeScale = 1;
            this._prevUnscaledClockTime = this._prevClockTime = this._startTime = 0;
            this._clipStateObjects =
            {};
            this._animationListeners = []
        }

        d.prototype.setTimeScale = function (b, a) {
            a = a || g.time;
            if (this._active && this._timeScale !== b)if (this._timeScale !== 0 && b !== 0) {
                var d = a, e = d - this._startTime;
                e *= this._timeScale;
                e /= b;
                this._startTime = d - e
            } else if (this._timeScale === 0)this._startTime = a - this._prevUnscaledClockTime;
            this._timeScale = b
        };
        d.prototype.getApplyTo = function (b) {
            var a = b._channelName, d = this._clipStateObjects[a];
            d || (d = b.createStateDataObject(), this._clipStateObjects[a] = d);
            return d
        };
        return d
    });
    o("goo/animation/blendtree/ClipSource",
        ["goo/math/MathUtils", "goo/animation/clip/AnimationClipInstance"], function (g, d) {
            function b(a, b, e) {
                this._clip = a;
                this._clipInstance = new d;
                this._filterChannels = {};
                if (b && e) {
                    this._filter = ["Exclude", "Include"].indexOf(b) > -1 ? b : null;
                    for (a = 0; a < e.length; a++)this._filterChannels[e[a]] = !0
                }
            }

            b.prototype.setTime = function (a) {
                var b = this._clipInstance;
                if (!b._startTime)b._startTime = a;
                if (b._active) {
                    b._timeScale !== 0 ? (b._prevUnscaledClockTime = a - b._startTime, a = b._timeScale * b._prevUnscaledClockTime, b._prevClockTime = a) : a =
                        b._prevClockTime;
                    var e = this._clip._maxTime;
                    if (e === -1)return !1;
                    if (e !== 0 && (b._loopCount === -1 || b._loopCount > 1 && e * b._loopCount >= Math.abs(a) ? a < 0 ? a = e + a % e : a %= e : a < 0 && (a = e + a), a > e || a < 0))a = g.clamp(a, 0, e), b._active = !1;
                    this._clip.update(a, b)
                }
                return b._active
            };
            b.prototype.resetClips = function (a) {
                this._clipInstance._startTime = a;
                this._clipInstance._active = !0
            };
            b.prototype.setTimeScale = function (a) {
                this._clipInstance.setTimeScale(a)
            };
            b.prototype.isActive = function () {
                return this._clipInstance._active && this._clip._maxTime !== -1
            };
            b.prototype.getSourceData = function () {
                if (!this._filter || !this._filterChannels)return this._clipInstance._clipStateObjects;
                var a = this._clipInstance._clipStateObjects, b = {}, e = this._filter === "Include", c;
                for (c in a)this._filterChannels[c] !== void 0 === e && (b[c] = a[c]);
                return b
            };
            return b
        });
    o("goo/animation/clip/AbstractAnimationChannel", [], function () {
        function g(d, b, a) {
            this._blendType = a || "Linear";
            this._channelName = d;
            this._times = (b instanceof Array || b instanceof Float32Array) && b.length ? new Float32Array(b) :
                [];
            this._lastStartFrame = 0
        }

        g.prototype.getSampleCount = function () {
            return this._times.length
        };
        g.prototype.getMaxTime = function () {
            return this._times.length ? this._times[this._times.length - 1] : 0
        };
        g.prototype.updateSample = function (d, b) {
            var a = this._times.length;
            if (a) {
                var f = a - 1;
                if (d < 0 || a === 1)this.setCurrentSample(0, 0, b); else if (d >= this._times[f])this.setCurrentSample(f, 0, b); else {
                    f = 0;
                    if (d >= this._times[this._lastStartFrame])for (var e = this._lastStartFrame; e < a - 1; e++) {
                        if (this._times[e] >= d)break;
                        f = e
                    } else for (e = 0; e <
                    this._lastStartFrame; e++) {
                        if (this._times[e] >= d)break;
                        f = e
                    }
                    this.setCurrentSample(f, (d - this._times[f]) / (this._times[f + 1] - this._times[f]), b);
                    this._lastFrame = f
                }
            }
        };
        return g
    });
    o("goo/animation/clip/TransformChannel", ["goo/animation/clip/AbstractAnimationChannel", "goo/animation/clip/TransformData", "goo/math/Quaternion", "goo/math/Vector3"], function (g, d, b, a) {
        function f(e, c, d, f, k, h) {
            g.call(this, e, c, h);
            if (d.length / 4 !== c.length || f.length / 3 !== c.length || k.length / 3 !== c.length)throw Error("All provided arrays must be the same length (accounting for type)! Channel: " +
                e);
            this._rotations = new Float32Array(d);
            this._translations = new Float32Array(f);
            this._scales = new Float32Array(k);
            this.tmpVec = new a;
            this.tmpQuat = new b;
            this.tmpQuat2 = new b
        }

        f.prototype = Object.create(g.prototype);
        f.prototype.createStateDataObject = function () {
            return new d
        };
        f.prototype.setCurrentSample = function (a, c, d) {
            var f = a * 4, g = a * 3, h = (a + 1) * 4, a = (a + 1) * 3;
            c === 0 ? (d._rotation.data[0] = this._rotations[f + 0], d._rotation.data[1] = this._rotations[f + 1], d._rotation.data[2] = this._rotations[f + 2], d._rotation.data[3] = this._rotations[f +
            3], d._translation.data[0] = this._translations[g + 0], d._translation.data[1] = this._translations[g + 1], d._translation.data[2] = this._translations[g + 2], d._scale.data[0] = this._scales[g + 0], d._scale.data[1] = this._scales[g + 1], d._scale.data[2] = this._scales[g + 2]) : c === 1 ? (d._rotation.data[0] = this._rotations[h + 0], d._rotation.data[1] = this._rotations[h + 1], d._rotation.data[2] = this._rotations[h + 2], d._rotation.data[3] = this._rotations[h + 3], d._translation.data[0] = this._translations[a + 0], d._translation.data[1] = this._translations[a +
            1], d._translation.data[2] = this._translations[a + 2], d._scale.data[0] = this._scales[a + 0], d._scale.data[1] = this._scales[a + 1], d._scale.data[2] = this._scales[a + 2]) : (d._rotation.data[0] = this._rotations[f + 0], d._rotation.data[1] = this._rotations[f + 1], d._rotation.data[2] = this._rotations[f + 2], d._rotation.data[3] = this._rotations[f + 3], this.tmpQuat.data[0] = this._rotations[h + 0], this.tmpQuat.data[1] = this._rotations[h + 1], this.tmpQuat.data[2] = this._rotations[h + 2], this.tmpQuat.data[3] = this._rotations[h + 3], d._rotation.equals(this.tmpQuat) ||
            (b.slerp(d._rotation, this.tmpQuat, c, this.tmpQuat2), d._rotation.setv(this.tmpQuat2)), d._translation.data[0] = (1 - c) * this._translations[g + 0] + c * this._translations[a + 0], d._translation.data[1] = (1 - c) * this._translations[g + 1] + c * this._translations[a + 1], d._translation.data[2] = (1 - c) * this._translations[g + 2] + c * this._translations[a + 2], d._scale.data[0] = (1 - c) * this._scales[g + 0] + c * this._scales[a + 0], d._scale.data[1] = (1 - c) * this._scales[g + 1] + c * this._scales[a + 1], d._scale.data[2] = (1 - c) * this._scales[g + 2] + c * this._scales[a +
                2])
        };
        f.prototype.getData = function (a, b) {
            var f = b ? b : new d;
            f.setRotation(this._rotations[a]);
            f.setScale(this._scales[a]);
            f.setTranslation(this._translations[a]);
            return f
        };
        return f
    });
    o("goo/animation/clip/JointChannel", ["goo/animation/clip/TransformChannel", "goo/animation/clip/JointData"], function (g, d) {
        function b(a, d, e, c, i, j, k) {
            g.call(this, b.JOINT_CHANNEL_NAME + d, e, c, i, j, k);
            this._jointName = a;
            this._jointIndex = d
        }

        b.prototype = Object.create(g.prototype);
        b.JOINT_CHANNEL_NAME = "_jnt";
        b.prototype.createStateDataObject =
            function () {
                return new d
            };
        b.prototype.setCurrentSample = function (a, b, d) {
            g.prototype.setCurrentSample.call(this, a, b, d);
            d._jointIndex = this._jointIndex
        };
        b.prototype.getData = function (a, b) {
            var e = b ? b : new d;
            g.prototype.getData.call(this, a, e);
            e._jointIndex = this._jointIndex;
            return e
        };
        return b
    });
    o("goo/animation/blendtree/ManagedTransformSource", ["goo/animation/clip/JointChannel", "goo/animation/clip/JointData", "goo/animation/clip/JointChannel", "goo/animation/clip/JointData"], function (g, d, b, a) {
        function f(a) {
            this._sourceName =
                a ? a : null;
            this._data = {}
        }

        f.prototype.setTranslation = function (b, c) {
            var d = this._data[b];
            d instanceof a && d._translation.setv(c)
        };
        f.prototype.setScale = function (b, c) {
            var d = this._data[b];
            d instanceof a && d._scale.setv(c)
        };
        f.prototype.setRotation = function (b, c) {
            var d = this._data[b];
            d instanceof a && d._rotation.set(c)
        };
        f.prototype.initFromClip = function (a, b) {
            if (b)for (var d = 0, f = b.length; d < f; d++) {
                var g = b[d], h = a.findChannelByName(g), h = h.getData(0);
                this._data[g] = h
            } else {
                d = 0;
                for (f = a._channels.length; d < f; d++)h = a._channels[d],
                    g = h._channelName, h = h.getData(0), this._data[g] = h
            }
        };
        f.prototype.resetClips = function () {
        };
        f.prototype.setTimeScale = function () {
        };
        f.prototype.setTime = function () {
            return !0
        };
        f.prototype.isActive = function () {
            return !0
        };
        f.prototype.getChannelData = function (a) {
            return this._data[a]
        };
        f.prototype.getSourceData = function () {
            return this._data
        };
        return f
    });
    o("goo/animation/blendtree/FrozenClipSource", [], function () {
        function g(d, b) {
            this._source = d;
            this._time = b
        }

        g.prototype.getSourceData = function () {
            return this._source.getSourceData()
        };
        g.prototype.resetClips = function () {
            this._source.resetClips(0)
        };
        g.prototype.setTime = function () {
            this._source.setTime(this._time);
            return !0
        };
        g.prototype.isActive = function () {
            return !0
        };
        g.prototype.setTimeScale = function () {
        };
        return g
    });
    o("goo/animation/state/AbstractTransitionState", ["goo/animation/state/AbstractState", "goo/animation/blendtree/BinaryLERPSource", "goo/math/MathUtils"], function (g, d, b) {
        function a() {
            g.call(this);
            this._targetState = this._sourceState = null;
            this._percent = 0;
            this._onFinished = this._sourceData =
                null;
            this._fadeTime = 0;
            this._blendType = "Linear"
        }

        a.prototype = Object.create(g.prototype);
        a.prototype.update = function (a) {
            a -= this._globalStartTime;
            if (a > this._fadeTime && this.onFinished)this.onFinished(); else switch (a /= this._fadeTime, this._blendType) {
                case "SCurve3":
                    this._percent = b.scurve3(a);
                    break;
                case "SCurve5":
                    this._percent = b.scurve5(a);
                    break;
                default:
                    this._percent = a
            }
        };
        a.prototype.readFromConfig = function (a) {
            if (a) {
                if (a.fadeTime !== void 0)this._fadeTime = a.fadeTime;
                if (a.blendType !== void 0)this._blendType = a.blendType
            }
        };
        a.prototype.getCurrentSourceData = function () {
            var a = this._sourceState ? this._sourceState.getCurrentSourceData() : null, b = this._targetState ? this._targetState.getCurrentSourceData() : null;
            if (!this._sourceData)this._sourceData = {};
            return d.combineSourceData(a, b, this._percent, this._sourceData)
        };
        a.prototype.isValid = function (a, b) {
            var c = b - this._sourceState._globalStartTime, d = a[0], g = a[1];
            return d <= 0 ? g <= 0 ? !0 : c <= g : g <= 0 ? c >= d : d <= g ? d <= c && c <= g : c >= d || c <= g
        };
        a.prototype.resetClips = function (a) {
            g.prototype.resetClips.call(this,
                a);
            this._sourceData = {};
            this._percent = 0
        };
        a.prototype.setTimeScale = function (a) {
            this._sourceState && this._sourceState.setTimeScale(a);
            this._targetState && this._targetState.setTimeScale(a)
        };
        return a
    });
    o("goo/animation/state/FadeTransitionState", ["goo/animation/state/AbstractTransitionState"], function (g) {
        function d() {
            g.call(this)
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.update = function (b) {
            g.prototype.update.call(this, b);
            this._sourceState !== null && this._sourceState.update(b);
            this._targetState !==
            null && this._targetState.update(b)
        };
        d.prototype.postUpdate = function () {
            this._sourceState !== null && this._sourceState.postUpdate();
            this._targetState !== null && this._targetState.postUpdate()
        };
        d.prototype.resetClips = function (b) {
            g.prototype.resetClips.call(this, b);
            this._targetState !== null && this._targetState.resetClips(b)
        };
        return d
    });
    o("goo/animation/state/SyncFadeTransitionState", ["goo/animation/state/FadeTransitionState"], function (g) {
        function d() {
            g.call(this)
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.resetClips =
            function (b) {
                g.prototype.resetClips.call(this, b);
                this._targetState.resetClips(this._sourceState._globalStartTime)
            };
        return d
    });
    o("goo/animation/state/FrozenTransitionState", ["goo/animation/state/AbstractTransitionState"], function (g) {
        function d() {
            g.call(this)
        }

        d.prototype = Object.create(g.prototype);
        d.prototype.update = function (b) {
            g.prototype.update.call(this, b);
            this._targetState !== null && this._targetState.update(b)
        };
        d.prototype.postUpdate = function () {
            this._targetState !== null && this._targetState.postUpdate()
        };
        d.prototype.resetClips = function (b) {
            g.prototype.resetClips.call(this, b);
            this._targetState.resetClips(b)
        };
        return d
    });
    o("goo/loaders/handlers/AnimationLayersHandler", "goo/loaders/handlers/ConfigHandler,goo/animation/layer/AnimationLayer,goo/animation/layer/LayerLERPBlender,goo/animation/state/SteadyState,goo/animation/blendtree/ClipSource,goo/animation/blendtree/ManagedTransformSource,goo/animation/blendtree/BinaryLERPSource,goo/animation/blendtree/FrozenClipSource,goo/animation/state/FadeTransitionState,goo/animation/state/SyncFadeTransitionState,goo/animation/state/FrozenTransitionState,goo/util/rsvp,goo/util/PromiseUtil,goo/util/ObjectUtil".split(","),
        function (g, d, b, a, f, e, c, i, j, k, h, l, n, q) {
            function r() {
                g.apply(this, arguments)
            }

            r.prototype = Object.create(g);
            g._registerClass("animation", r);
            r.prototype._create = function (a) {
                console.debug("Creating animation layers");
                var b = [];
                b.push(this._parseLayer(a.DEFAULT));
                for (var c in a) {
                    var d = a[c];
                    c !== "DEFAULT" && b.push(this._parseLayer(d))
                }
                return l.all(b).then(function (a) {
                    return a
                })
            };
            r.prototype._parseLayer = function (c) {
                var e = this, f = [], g = new d(c.name);
                if (c.blendWeight != null)g._layerBlender = new b, g._layerBlender._blendWeight =
                    c.blendWeight;
                var h = function (a) {
                    return f.push(e._parseClipSource(j.clipSource).then(function (b) {
                        return a._sourceTree = b
                    }))
                }, i;
                for (i in c.states) {
                    var j = c.states[i], k = new a(j.name);
                    g._steadyStates[i] = k;
                    h(k);
                    if (j.transitions != null)for (var n in j.transitions)if (k = j.transitions[n], g._steadyStates[n] != null || n === "*")k = q.clone(k), g._steadyStates[i]._transitions[n] = k, g._transitionStates[k.type] == null && (g._transitionStates[k.type] = this._getTransitionByType(k.type))
                }
                if (c.transitions != null)for (n in c.transitions)if (k =
                        c.transitions[n], g._steadyStates[n] != null || n === "*")k = q.clone(k), g._transitions[n] = k, g._transitionStates[k.type] == null && (g._transitionStates[k.type] = this._getTransitionByType(k.type));
                c.defaultState != null && g.setCurrentStateByName(c.defaultState);
                return l.all(f).then(function () {
                    return g
                })
            };
            r.prototype._parseClipSource = function (a) {
                var b = this;
                switch (a.type) {
                    case "Clip":
                        return this.getConfig(a.clipRef).then(function (c) {
                            return b.updateObject(a.clipRef, c, b.options).then(function (b) {
                                for (var b = new f(b, a.filter,
                                    a.channels), c = ["loopCount", "timeScale", "active"], d = 0; d < c.length; d++) {
                                    var e = c[d];
                                    a[e] && !isNaN(a[e]) && (b._clipInstance["_" + e] = a[e])
                                }
                                return b
                            })
                        });
                    case "Managed":
                        var d = new e;
                        return a.clipRef != null ? this.getConfig(a.clipRef).then(function (c) {
                            return b.updateObject(a.clipRef, c, b.options)
                        }).then(function (b) {
                            return d.initJointsById(b, a.joints)
                        }) : n.createDummyPromise(d);
                    case "Lerp":
                        var g = [this._parseClipSource(a.clipSourceA), this._parseClipSource(a.clipSourceB)];
                        return l.all(g).then(function (b) {
                            b = new c(b[0],
                                b[1]);
                            if (a.blendWeight)b.blendWeight = a.blendWeight;
                            return b
                        });
                    case "Frozen":
                        return this._parseClipSource(a.clipSource).then(function (b) {
                            return new i(b, a.frozenTime || 0)
                        });
                    default:
                        return console.error("Unable to parse clip source"), n.createDummyPromise()
                }
            };
            r.prototype._getTransitionByType = function (a) {
                switch (a) {
                    case "Fade":
                        return new j;
                    case "SyncFade":
                        return new k;
                    case "Frozen":
                        return new h;
                    default:
                        return console.log("Defaulting to frozen transition type"), new h
                }
            };
            r.prototype.update = function (a, b) {
                var c =
                    this._create(b);
                return n.createDummyPromise(c)
            };
            return r
        });
    o("goo/animation/clip/AnimationClip", [], function () {
        function g(d, b) {
            this._name = d;
            this._channels = b || [];
            this._maxTime = -1;
            this.updateMaxTimeIndex()
        }

        g.prototype.update = function (d, b) {
            for (var a = 0, f = this._channels.length; a < f; ++a) {
                var e = this._channels[a], c = b.getApplyTo(e);
                e.updateSample(d, c)
            }
        };
        g.prototype.addChannel = function (d) {
            this._channels.push(d);
            this.updateMaxTimeIndex()
        };
        g.prototype.removeChannel = function (d) {
            d = this._channels.indexOf(d);
            return d >=
            0 ? (this._channels.splice(d, 1), this.updateMaxTimeIndex(), !0) : !1
        };
        g.prototype.findChannelByName = function (d) {
            for (var b = 0, a = this._channels.length; b < a; ++b) {
                var f = this._channels[b];
                if (d === f._channelName)return f
            }
            return null
        };
        g.prototype.updateMaxTimeIndex = function () {
            this._maxTime = -1;
            for (var d, b = 0; b < this._channels.length; b++)if (d = this._channels[b].getMaxTime(), d > this._maxTime)this._maxTime = d
        };
        g.prototype.toString = function () {
            return this._name + this._channels.length
        };
        return g
    });
    o("goo/animation/clip/InterpolatedFloatChannel",
        ["goo/animation/clip/AbstractAnimationChannel", "goo/math/MathUtils"], function (g, d) {
            function b(a, b, d, c) {
                g.call(this, a, b, c);
                this._values = d ? d.slice(0) : null
            }

            b.prototype = Object.create(g.prototype);
            b.prototype.createStateDataObject = function () {
                return [0]
            };
            b.prototype.setCurrentSample = function (a, b, e) {
                e[0] = d.lerp(b, this._values[a], this._values[a + 1])
            };
            b.prototype.getData = function (a, b) {
                var d = b || [];
                d[0] = this._values[a];
                return d
            };
            return b
        });
    o("goo/animation/clip/TriggerChannel", ["goo/animation/clip/AbstractAnimationChannel",
        "goo/animation/clip/TriggerData"], function (g, d) {
        function b(a, b, d, c) {
            g.call(this, a, b, c);
            this._keys = d ? d.slice(0) : null;
            this.guarantee = !1
        }

        b.prototype = Object.create(g.prototype);
        b.prototype.createStateDataObject = function () {
            return new d
        };
        b.prototype.setCurrentSample = function (a, b, d) {
            var c = d._currentIndex, a = b !== 1 ? a : a + 1;
            if (c === a || !this.guarantee)d.arm(a, [this._keys[a]]); else {
                b = [];
                if (c > a) {
                    for (c += 1; c < this._keys.length; c++)b.push(this._keys[c]);
                    c = -1
                }
                for (c += 1; c <= a; c++)b.push(this._keys[c]);
                d.arm(a, b)
            }
        };
        return b
    });
    o("goo/loaders/handlers/AnimationClipHandler", "goo/loaders/handlers/ConfigHandler,goo/animation/clip/AnimationClip,goo/loaders/JsonUtils,goo/animation/clip/JointChannel,goo/animation/clip/TransformChannel,goo/animation/clip/InterpolatedFloatChannel,goo/animation/clip/TriggerChannel,goo/util/PromiseUtil,goo/util/ArrayUtil".split(","), function (g, d, b, a, f, e, c, i, j) {
        function k() {
            g.apply(this, arguments)
        }

        k.prototype = Object.create(g.prototype);
        g._registerClass("clip", k);
        k.prototype.update = function (a, b) {
            var c,
                d = this;
            return b.binaryData ? this.getConfig(b.binaryData).then(function (a) {
                if (!a)throw Error("Binary clip data was empty");
                return d._createAnimationClip(b, a)
            }) : (c = this._createAnimationClip(b), i.createDummyPromise(c))
        };
        k.prototype._createAnimationClip = function (g, i) {
            console.debug("Creating animation clip");
            var k = new d(g.name), q = g.useCompression || !1, o = null;
            q && (o = g.compressedRange || 32767);
            if (g.channels && g.channels.length)for (var m = 0; m < g.channels.length; m++) {
                var s, x, p, w, y, t = g.channels[m];
                s = i ? j.getTypedArray(i,
                    t.times) : new Float32Array(b.parseChannelTimes(t, q));
                y = t.blendType;
                var u = t.type;
                if (u === "Joint" || u === "Transform")i ? (x = j.getTypedArray(i, t.rotationSamples), p = j.getTypedArray(i, t.translationSamples), w = j.getTypedArray(i, t.scaleSamples)) : (x = b.parseRotationSamples(t, o, q), p = b.parseTranslationSamples(t, s.length, q), w = b.parseScaleSamples(t, s.length, q));
                if (u === "Joint")s = new a(t.jointName, t.jointIndex, s, x, p, w, y); else if (t.type === "Transform")s = new f(t.name, s, x, p, w, y); else if (t.type === "FloatLERP")s = new e(t.name,
                    s, b.parseFloatLERPValues(t, q), y); else if (t.type === "Trigger") {
                    if (s = new c(t.name, s, t.keys), t.guarantee)s.guarantee = !0
                } else {
                    console.warn("Unhandled channel type: " + t.type);
                    continue
                }
                k.addChannel(s)
            }
            return k
        };
        return k
    });
    o("goo/loaders/DynamicLoader", "goo/loaders/handlers/ConfigHandler,goo/loaders/handlers/ComponentHandler,goo/util/Ajax,goo/renderer/TextureCreator,goo/util/rsvp,goo/util/StringUtil,goo/util/PromiseUtil,goo/util/ObjectUtil,goo/loaders/handlers/CameraComponentHandler,goo/loaders/handlers/EntityHandler,goo/loaders/handlers/LightComponentHandler,goo/loaders/handlers/MaterialHandler,goo/loaders/handlers/MeshDataComponentHandler,goo/loaders/handlers/MeshDataHandler,goo/loaders/handlers/MeshRendererComponentHandler,goo/loaders/handlers/SceneHandler,goo/loaders/handlers/ShaderHandler,goo/loaders/handlers/SkeletonHandler,goo/loaders/handlers/TextureHandler,goo/loaders/handlers/TransformComponentHandler,goo/loaders/handlers/AnimationComponentHandler,goo/loaders/handlers/AnimationLayersHandler,goo/loaders/handlers/AnimationClipHandler".split(","),
        function (g, d, b, a, f, e, c, i) {
            function j(a) {
                this.options = a;
                i.defaults(this.options, {ajax: !0});
                if (this.options.world)this._world = this.options.world; else throw Error("World argument cannot be null");
                if (this.options.rootPath)this.setRootPath(this.options.rootPath); else throw Error("parameters.rootPath must be defined");
                this._configs = {};
                if (this.options.ajax)this._ajax = new b
            }

            var k, h;
            k = /\.(shader|script|entity|material|scene|mesh|texture|skeleton|animation|clip|bundle)$/;
            h = i.keys(g.getHandler("texture").loaders);
            j.prototype.preloadCache = function (a, b) {
                b == null && (b = !1);
                return b ? this._configs = a : i.extend(this._configs, a)
            };
            j.prototype.loadFromConfig = function (a, b, c) {
                c == null && (c = {});
                i.defaults(c, this.options);
                if (b != null)c.noCache ? this._configs = b : i.extend(this._configs, b);
                if (this._configs[a])throw Error("" + a + " not found in the supplied configs Available keys: \n" + i.keys(this._configs).join("\n"));
                return this.load(a, c)
            };
            j.prototype.loadFromBundle = function (a, b, c) {
                var d = this;
                c == null && (c = {});
                i.defaults(c, this.options);
                return this._loadRef(b).then(function (e) {
                    c.noCache ? d._configs = e : i.extend(d._configs, e);
                    if (d._configs[a] == null)throw Error("" + a + " not found in bundle " + b + ". Available keys: \n" + i.keys(d._configs).join("\n"));
                    return d.load(a, c)
                })
            };
            j.prototype.load = function (a, b) {
                b == null && (b = {});
                return this.update(a, null, b)
            };
            j.prototype.update = function (a, b, c) {
                var d = this;
                c == null && (c = {});
                i.defaults(c, this.options, {recursive: !0});
                b && (this._configs[a] = b);
                this._objects = {};
                g.getHandler(d._getTypeForRef(a));
                return this._loadRef(a).then(function (b) {
                    var e =
                        [];
                    if (c.recursive && g.getHandler(d._getTypeForRef(a)))for (var h = d._getRefsFromConfig(b), i = function (a) {
                        return e.push(d._loadRef(a).then(function (b) {
                            return d._handle(a, b, c)
                        }))
                    }, j = 0; j < h.length; j++)i(h[j]);
                    e.push(d._handle(a, b, c));
                    return f.all(e)
                }).then(function () {
                    return d._configs
                }).then(null, function (b) {
                    return console.error("Error updating " + a + " " + b)
                })
            };
            j.prototype.remove = function (a) {
                delete this._objects[a];
                delete this._configs[a];
                return this._handle(a, null)
            };
            j.prototype._handle = function (a, b, d) {
                var e =
                    this, f, h, j;
                d == null && (d = {});
                if (this._objects[a])if (this._objects[a].then)return this._objects[a]; else {
                    if (!d.noCache)return c.createDummyPromise(this._objects[a])
                } else if (j = this._getTypeForRef(a), h = g.getHandler(j)) {
                    if (this._handlers == null)this._handlers = {};
                    (f = this._handlers[j]) ? i.extend(f, {
                        world: this._world,
                        getConfig: this._loadRef.bind(this),
                        updateObject: this._handle.bind(this),
                        options: i.clone(d)
                    }) : f = this._handlers[j] = new h(this._world, this._loadRef.bind(this), this._handle.bind(this), d);
                    return b != null ?
                        this._objects[a] = f.update(a, b).then(function (b) {
                            return e._objects[a] = b
                        }) : (f.remove(a), c.createDummyPromise(null))
                } else return console.warn("No handler for type " + j), c.createDummyPromise(null)
            };
            j.prototype._loadRef = function (a, d) {
                var e, f = this;
                d == null && (d = !1);
                if (this._configs[a]) {
                    if (this._configs[a].then)return this._configs[a];
                    if (!d)return c.createDummyPromise(this._configs[a])
                }
                if (!this._ajax)return c.createDummyPromise(null);
                e = this._rootPath + window.escape(a);
                e = this._isImageRef(a) ? this._ajax.loadImage(e) :
                    this._isBinaryRef(a) ? this._ajax.load(e, b.ARRAY_BUFFER) : this._ajax.load(e);
                e = e.then(function (b) {
                    return k.test(a) ? f._configs[a] = JSON.parse(b) : f._configs[a] = b
                }).then(null, function (b) {
                    delete f._configs[a];
                    return b
                });
                return this._configs[a] = e
            };
            j.prototype._getRefsFromConfig = function (a) {
                var b = [], c = function (a, d) {
                    var f;
                    if (e.endsWith(a, "Refs"))b = b.concat(d); else if (e.endsWith(a, "Ref"))b.push(d); else if (d instanceof Object)for (f in d)d.hasOwnProperty(f) && c(f, d[f])
                };
                c("", a);
                return b
            };
            j.prototype._getTypeForRef =
                function (a) {
                    return a.split(".").pop().toLowerCase()
                };
            j.prototype._isImageRef = function (a) {
                a = this._getTypeForRef(a);
                return a === "png" || a === "jpg" || a === "jpeg"
            };
            j.prototype._isBinaryRef = function (a) {
                a = this._getTypeForRef(a);
                return i.indexOf(h, a) >= 0 || a === "dat"
            };
            j.prototype.getCachedObjectForRef = function (a) {
                return this._objects[a]
            };
            j.prototype.setRootPath = function (a) {
                this._rootPath = a;
                a.length > 1 && a.charAt(a.length - 1) !== "/" && (this._rootPath += "/")
            };
            return j
        });
    o("js/scripts/RowingControllerScript", ["goo/math/Vector",
        "goo/math/Vector3", "goo/math/Matrix3x3", "goo/math/MathUtils"], function (g, d, b, a) {
        function f(a) {
            this.velocity = 0;
            this.orient = Math.PI;
            this.orientMatrix = new b;
            this.orientMatrix.rotateY(this.orient);
            a = a || {};
            this.name = "RowingControllerScript";
            this.domElement = a.domElement || document;
            a.domElement && this.domElement.setAttribute("tabindex", -1);
            this.rowAcceleration = !isNaN(a.rowAcceleration) ? a.rowAcceleration : 5;
            this.dragDecceleration = !isNaN(a.dragDecceleration) ? a.dragDecceleration : 1;
            this.maxVelocity = !isNaN(a.maxVelocity) &&
            a.maxVelocity > 0 ? a.maxVelocity : 40;
            this.minRowSpeed = !isNaN(a.minRowSpeed) && a.minRowSpeed > 0 ? a.minRowSpeed : 0;
            this.maxRowSpeed = !isNaN(a.maxRowSpeed) && a.maxRowSpeed > 0 ? a.maxRowSpeed : 2;
            this.turnSpeed = !isNaN(a.turnSpeed) && a.turnSpeed > 0 ? a.turnSpeed : Math.PI / 4;
            this.fwdVector = a.fwdVector || new d(0, 1, 0);
            this.leftVector = a.leftVector || new d(-1, 0, 0);
            this.forwardKey = !isNaN(a.forwardKey) ? a.forwardKey : 87;
            this.backwardKey = !isNaN(a.backwardKey) ? a.backwardKey : 83;
            this.turnLeftKey = !isNaN(a.turnLeftKey) ? a.turnLeftKey : 65;
            this.turnRightKey =
                !isNaN(a.turnRightKey) ? a.turnRightKey : 68;
            this.animationComponents = a.animationComponents;
            this.moveState = {turnLeft: 0, turnRight: 0, forward: 0, backward: 0};
            this.moveVector = new d(0, 0, 0);
            this.calcVector = new d;
            this.velocityVec = new d;
            this.orientVelocity = 0;
            this.setupKeyControls();
            this.currentScale = 0
        }

        f.prototype.updateMovementVector = function () {
            this.moveVector.z = this.moveState.forward - this.moveState.backward;
            this.moveVector.x = this.moveState.turnLeft - this.moveState.turnRight
        };
        f.prototype.updateKeys = function (a, b) {
            if (!a.altKey) {
                var d =
                    !1;
                switch (a.keyCode) {
                    case this.forwardKey:
                        this.moveState.forward = b ? 1 : 0;
                        d = !0;
                        break;
                    case this.backwardKey:
                        this.moveState.backward = b ? 1 : 0;
                        d = !0;
                        break;
                    case this.turnLeftKey:
                        this.moveState.turnLeft = b ? 1 : 0;
                        d = !0;
                        break;
                    case this.turnRightKey:
                        this.moveState.turnRight = b ? 1 : 0, d = !0
                }
                d && this.updateMovementVector()
            }
        };
        f.prototype.setupKeyControls = function () {
            var a = this;
            this.domElement.addEventListener("keydown", function (b) {
                a.updateKeys(b, !0)
            }, !1);
            this.domElement.addEventListener("keyup", function (b) {
                    a.updateKeys(b, !1)
                },
                !1)
        };
        f.prototype.applyJoystick = function (a, b) {
            this.moveVector.z = b;
            this.moveVector.x = a;
            this.moveVector.normalize()
        };
        f.prototype.releaseJoystick = function () {
            this.moveVector.z = 0;
            this.moveVector.x = 0
        };
        f.prototype.run = function (b) {
            var c = b.transformComponent;
            if (c) {
                if (g.equals(this.moveVector, d.ZERO))this.orientVelocity *= 1 - b._world.tpf, this.orient += this.orientVelocity * b._world.tpf * 50, this.orient %= Math.PI * 2, this.orientMatrix.setIdentity(), this.orientMatrix.rotateY(this.orient), this.calcVector.copy(this.velocityVec).mul(-1).normalize().mul(this.dragDecceleration *
                    b._world.tpf), this.velocityVec.add(this.calcVector), this.velocity = Math.sqrt(this.velocityVec.lengthSquared()); else {
                    this.calcVector.set(this.fwdVector.x * this.moveVector.z, this.fwdVector.y * this.moveVector.z, this.fwdVector.z * this.moveVector.z);
                    if (this.moveVector.x !== 0)this.orientVelocity += this.moveVector.x * this.turnSpeed * b._world.tpf * this.velocity * 0.0010, this.orientVelocity = a.clamp(this.orientVelocity, -0.01, 0.01);
                    this.orientVelocity *= 1 - b._world.tpf;
                    this.orient += this.orientVelocity * b._world.tpf * 50;
                    this.orient %=
                        Math.PI * 2;
                    this.orientMatrix.setIdentity();
                    this.orientMatrix.rotateY(this.orient);
                    var f = c.transform.rotation;
                    f.applyPost(this.calcVector);
                    this.velocityVec.add(this.calcVector.mul(b._world.tpf * this.rowAcceleration));
                    this.calcVector.copy(this.velocityVec).mul(-1).normalize().mul(this.dragDecceleration * b._world.tpf);
                    this.velocityVec.add(this.calcVector);
                    this.velocity = Math.sqrt(this.velocityVec.lengthSquared());
                    if (this.velocity > this.maxVelocity)this.velocity = this.maxVelocity, this.velocityVec.normalize().mul(this.maxVelocity)
                }
                f =
                    c.transform.rotation;
                this.calcVector.setd(0, 1, 0);
                f.applyPost(this.calcVector);
                this.calcVector.mul(this.calcVector.dot(this.velocityVec) > 0 ? 1 : -1);
                this.velocityVec.lerp(this.calcVector, 0.5).normalize().mul(this.velocity);
                this.currentScale = this.velocity < 0.0010 || this.moveVector.z === 0 ? a.lerp(0.04, this.currentScale, 0) : a.lerp(0.02, this.currentScale, this.maxRowSpeed * this.moveVector.z > 0 ? 1 : -1);
                if (this.currentScale > 0 && this.currentScale < 1.0E-4)this.currentScale = 1.0E-4; else if (this.currentScale < 0 && this.currentScale > -1.0E-4)this.currentScale = -1.0E-4;
                for (b = 0; b < this.animationComponents.length; b++)this.animationComponents[b].setTimeScale(this.currentScale)
            }
        };
        return f
    });
    o("goo/renderer/pass/Composer", ["goo/renderer/pass/RenderTarget", "goo/renderer/pass/FullscreenPass", "goo/renderer/shaders/ShaderLib"], function (g, d, b) {
        function a(a) {
            this.renderTarget1 = a;
            if (this.renderTarget1 === void 0)this.renderTarget1 = new g(window.innerWidth || 1, window.innerHeight || 1);
            this.renderTarget2 = this.renderTarget1.clone();
            this.writeBuffer =
                this.renderTarget1;
            this.readBuffer = this.renderTarget2;
            this.passes = [];
            this.copyPass = new d(b.copy)
        }

        a.prototype.swapBuffers = function () {
            var a = this.readBuffer;
            this.readBuffer = this.writeBuffer;
            this.writeBuffer = a
        };
        a.prototype.addPass = function (a) {
            this.passes.push(a)
        };
        a.prototype.render = function (a, b, c, d) {
            this.writeBuffer = this.renderTarget1;
            this.readBuffer = this.renderTarget2;
            var g, k, h = this.passes.length;
            for (k = 0; k < h; k++)g = this.passes[k], g.enabled && (g.render(a, this.writeBuffer, this.readBuffer, b, !1, c, d), g.needsSwap &&
            this.swapBuffers())
        };
        return a
    });
    o("goo/renderer/pass/RenderPass", ["goo/renderer/Renderer", "goo/math/Vector4"], function (g, d) {
        function b(a, b) {
            this.renderList = a;
            this.filter = b;
            this.clearColor = new d(0, 0, 0, 0);
            this.oldClearColor = new d;
            this.renderToScreen = !1;
            this.overrideMaterial = null;
            this.clear = this.enabled = !0;
            this.needsSwap = !1
        }

        b.prototype.render = function (a, b, d, c, i, j, k) {
            j = j || g.mainCamera;
            k = k || [];
            this.clearColor && (this.oldClearColor.setv(a.clearColor), a.setClearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b,
                this.clearColor.a));
            b = this.filter ? this.renderList.filter(this.filter) : this.renderList;
            a.overrideMaterial = this.overrideMaterial;
            this.renderToScreen ? a.render(b, j, k) : a.render(b, j, k, d, this.clear);
            a.overrideMaterial = null;
            this.clearColor && a.setClearColor(this.oldClearColor.r, this.oldClearColor.g, this.oldClearColor.b, this.oldClearColor.a)
        };
        return b
    });
    o("goo/renderer/pass/BlurPass", ["goo/renderer/Material", "goo/renderer/pass/FullscreenUtil", "goo/renderer/pass/RenderTarget", "goo/renderer/Util", "goo/renderer/shaders/ShaderLib"],
        function (g, d, b, a, f) {
            function e(c) {
                c = c || {};
                this.target = c.target !== void 0 ? c.target : null;
                var i = c.strength !== void 0 ? c.strength : 1, j = c.kernelSize !== void 0 ? c.kernelSize : 25, k = c.sigma !== void 0 ? c.sigma : 4, h = c.sizeX !== void 0 ? c.sizeX : 256, c = c.sizeY !== void 0 ? c.sizeY : 256;
                this.renderTargetX = new b(h, c);
                this.renderTargetY = new b(h, c);
                this.renderable = {meshData: d.quad, materials: []};
                this.copyShader = a.clone(f.copyPure);
                this.copyShader.uniforms.opacity = i;
                this.copyMaterial = g.createMaterial(this.copyShader);
                this.convolutionShader =
                    a.clone(f.convolution);
                this.convolutionShader.defines = {KERNEL_SIZE_FLOAT: j.toFixed(1), KERNEL_SIZE_INT: j.toFixed(0)};
                this.convolutionShader.uniforms.uImageIncrement = e.blurX;
                this.convolutionShader.uniforms.cKernel = this.convolutionShader.buildKernel(k);
                this.convolutionMaterial = g.createMaterial(this.convolutionShader);
                this.enabled = !0;
                this.needsSwap = this.clear = !1
            }

            e.prototype.render = function (a, b, f) {
                this.renderable.materials[0] = this.convolutionMaterial;
                this.convolutionMaterial.setTexture("DIFFUSE_MAP", f);
                this.convolutionShader.uniforms.uImageIncrement = e.blurX;
                a.render(this.renderable, d.camera, [], this.renderTargetX, !0);
                this.convolutionMaterial.setTexture("DIFFUSE_MAP", this.renderTargetX);
                this.convolutionShader.uniforms.uImageIncrement = e.blurY;
                a.render(this.renderable, d.camera, [], this.renderTargetY, !0);
                this.renderable.materials[0] = this.copyMaterial;
                this.copyMaterial.setTexture("DIFFUSE_MAP", this.renderTargetY);
                this.target !== null ? a.render(this.renderable, d.camera, [], this.target, this.clear) : a.render(this.renderable,
                    d.camera, [], f, this.clear)
            };
            e.blurX = [0.001953125, 0];
            e.blurY = [0, 0.001953125];
            return e
        });
    o("goo/renderer/pass/BloomPass", ["goo/renderer/pass/BlurPass"], function (g) {
        function d(b) {
            g.call(this, b);
            this.copyMaterial.blendState.blending = "AdditiveBlending"
        }

        d.prototype = Object.create(g.prototype);
        return d
    });
    o("js/shaders/PBShaderDefs", ["goo/renderer/MeshData", "goo/renderer/Shader"], function (g, d) {
        var b = {};
        b.skinShaderDef = {
            defines: {JOINT_COUNT: 56, WEIGHTS: 4},
            attributes: {
                vertexPosition: g.POSITION, vertexNormal: g.NORMAL,
                vertexUV0: g.TEXCOORD0, vertexWeights: g.WEIGHTS, vertexJointIDs: g.JOINTIDS
            },
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                diffuseMap: d.DIFFUSE_MAP,
                cameraPosition: d.CAMERA,
                lightPosition: d.LIGHT0,
                materialAmbient: d.AMBIENT,
                materialDiffuse: d.DIFFUSE,
                materialSpecular: d.SPECULAR,
                materialSpecularPower: d.SPECULAR_POWER,
                jointPalette: function (a) {
                    var a = a.meshData, b = a.currentPose;
                    if (b !== null) {
                        var b = b._matrixPalette, d = a.paletteMap.length * 16, c = a.store;
                        if (!c)c = new Float32Array(d),
                            a.store = c;
                        for (var g = 0; g < a.paletteMap.length; g++)for (var d = b[a.paletteMap[g]], j = 0; j < 4; j++)for (var k = 0; k < 4; k++)c[g * 16 + j * 4 + k] = d.data[k * 4 + j];
                        return c
                    }
                }
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec3 vertexNormal;\nattribute vec2 vertexUV0;\nattribute vec4 vertexWeights;\nattribute vec4 vertexJointIDs;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nuniform mat4 jointPalette[JOINT_COUNT];\nuniform vec3 lightPosition;\nvarying vec3 normal;\nvarying vec3 lightDir;\nvarying vec2 texCoord0;\nvoid main(void) {\n\tmat4 mat = mat4(0.0);\n\tmat += jointPalette[int(vertexJointIDs.x)] * vertexWeights.x;\n\tmat += jointPalette[int(vertexJointIDs.y)] * vertexWeights.y;\n\tmat += jointPalette[int(vertexJointIDs.z)] * vertexWeights.z;\n\tmat += jointPalette[int(vertexJointIDs.w)] * vertexWeights.w;\n\tvec4 worldPos = worldMatrix * mat * vec4(vertexPosition, 1.0);\n\tgl_Position = projectionMatrix * viewMatrix * worldPos;\n\ttexCoord0 = vertexUV0;\n\tnormal = (worldMatrix * mat * vec4(vertexNormal, 0.0)).xyz;\n\ttexCoord0 = vertexUV0;\n\tlightDir = lightPosition;\n}",
            fshader: "uniform sampler2D diffuseMap;\nuniform vec4 materialAmbient;\nuniform vec4 materialDiffuse;\nvarying vec3 normal;\nvarying vec3 lightDir;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tvec4 texCol = texture2D(diffuseMap, texCoord0);\n\tvec4 final_color = materialAmbient;\n\tvec3 N = normalize(normal);\n\tvec3 L = normalize(lightDir);\n\tfloat lambertTerm = dot(N,L)*0.75+0.25;\n\tif(lambertTerm > 0.0)\n\t{\n\t\tfinal_color += materialDiffuse * lambertTerm * 2.0;\n\t}\n\tgl_FragColor = vec4(texCol.rgb * final_color.rgb, texCol.a);\n}"
        };
        b.texturedLitDef = {
            attributes: {vertexPosition: g.POSITION, vertexNormal: g.NORMAL, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                cameraPosition: d.CAMERA,
                lightPosition: d.LIGHT0,
                diffuseMap: d.DIFFUSE_MAP,
                materialAmbient: d.AMBIENT,
                materialDiffuse: d.DIFFUSE,
                materialSpecular: d.SPECULAR,
                materialSpecularPower: d.SPECULAR_POWER
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec3 vertexNormal;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 lightPosition;\nvarying vec3 normal;\nvarying vec3 lightDir;\nvarying vec3 eyeVec;\nvarying vec2 texCoord0;\nvoid main(void) {\n\tvec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);\n\tgl_Position = projectionMatrix * viewMatrix * worldPos;\n\tnormal = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;\n\ttexCoord0 = vertexUV0;\n\tlightDir = lightPosition;\n\teyeVec = cameraPosition - worldPos.xyz;\n}",
            fshader: "uniform sampler2D diffuseMap;\nuniform vec4 materialAmbient;\nuniform vec4 materialDiffuse;\nuniform vec4 materialSpecular;\nuniform float materialSpecularPower;\nvarying vec3 normal;\nvarying vec3 lightDir;\nvarying vec3 eyeVec;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tvec4 texCol = texture2D(diffuseMap, texCoord0);\n\tvec4 final_color = materialAmbient;\n\tvec3 N = normalize(normal);\n\tvec3 L = normalize(lightDir);\n\tfloat lambertTerm = dot(N,L)*0.75+0.25;\n\tif(lambertTerm > 0.0)\n\t{\n\t\tfinal_color += materialDiffuse * // gl_LightSource[0].diffuse * \n\t\t\tlambertTerm * 2.0;\n\t\tvec3 E = normalize(eyeVec);\n\t\tvec3 R = reflect(-L, N);\n\t\tfloat specular = pow( clamp(dot(R, E), 0.0, 1.0), materialSpecularPower);\n\t\tfinal_color += materialSpecular * // gl_LightSource[0].specular * \n\t\t\tspecular;\n\t}\n\tgl_FragColor = vec4(texCol.rgb * final_color.rgb, texCol.a);\n}"
        };
        b.skinShaderDef2 = {
            defines: {JOINT_COUNT: 56, WEIGHTS: 4},
            attributes: {
                vertexPosition: g.POSITION,
                vertexNormal: g.NORMAL,
                vertexUV0: g.TEXCOORD0,
                vertexWeights: g.WEIGHTS,
                vertexJointIDs: g.JOINTIDS
            },
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                diffuseMap: d.DIFFUSE_MAP,
                cameraPosition: d.CAMERA,
                lightPosition: d.LIGHT0,
                materialAmbient: d.AMBIENT,
                materialDiffuse: d.DIFFUSE,
                materialSpecular: d.SPECULAR,
                materialSpecularPower: d.SPECULAR_POWER,
                jointPalette: function (a) {
                    var a =
                        a.meshData, b = a.currentPose;
                    if (b !== null) {
                        var b = b._matrixPalette, d = a.paletteMap.length * 16, c = a.store;
                        if (!c)c = new Float32Array(d), a.store = c;
                        for (var g = 0; g < a.paletteMap.length; g++)for (var d = b[a.paletteMap[g]], j = 0; j < 4; j++)for (var k = 0; k < 4; k++)c[g * 16 + j * 4 + k] = d.data[k * 4 + j];
                        return c
                    }
                }
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec3 vertexNormal;\nattribute vec2 vertexUV0;\nattribute vec4 vertexWeights;\nattribute vec4 vertexJointIDs;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nuniform mat4 jointPalette[JOINT_COUNT];\nuniform vec3 lightPosition;\nvarying vec3 normal;\nvarying vec3 lightDir;\nvarying vec2 texCoord0;\nvoid main(void) {\n\tmat4 mat = mat4(0.0);\n\tmat += jointPalette[int(vertexJointIDs.x)] * vertexWeights.x;\n\tmat += jointPalette[int(vertexJointIDs.y)] * vertexWeights.y;\n\tmat += jointPalette[int(vertexJointIDs.z)] * vertexWeights.z;\n\tmat += jointPalette[int(vertexJointIDs.w)] * vertexWeights.w;\n\tvec4 worldPos = worldMatrix * mat * vec4(vertexPosition, 1.0);\n\tgl_Position = projectionMatrix * viewMatrix * worldPos;\n\ttexCoord0 = vertexUV0;\n\tnormal = (worldMatrix * mat * vec4(vertexNormal, 0.0)).xyz;\n\ttexCoord0 = vertexUV0;\n\tlightDir = lightPosition - worldPos.xyz;\n}",
            fshader: "uniform sampler2D diffuseMap;\nuniform vec4 materialAmbient;\nuniform vec4 materialDiffuse;\nvarying vec3 normal;\nvarying vec3 lightDir;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tvec4 texCol = texture2D(diffuseMap, texCoord0);\n\tvec4 final_color = materialAmbient + vec4(0.1,0.15,0.12,1.0);\n\tvec3 N = normalize(normal);\n\tvec3 L = normalize(lightDir);\n\tfloat lambertTerm = dot(N,L)*0.75+0.25;\n\tif(lambertTerm > 0.0)\n\t{\n\t\tfinal_color += materialDiffuse * lambertTerm * 2.0;\n\t}\n\tfloat dist = length(lightDir);\n\tdist *= dist;\n\tfinal_color *= 1.0 - min(dist/7000.0, 1.0);\n\tgl_FragColor = vec4(texCol.rgb * final_color.rgb, texCol.a);\n}"
        };
        b.texturedLitDef2 = {
            attributes: {vertexPosition: g.POSITION, vertexNormal: g.NORMAL, vertexUV0: g.TEXCOORD0},
            uniforms: {
                viewMatrix: d.VIEW_MATRIX,
                projectionMatrix: d.PROJECTION_MATRIX,
                worldMatrix: d.WORLD_MATRIX,
                cameraPosition: d.CAMERA,
                lightPosition: d.LIGHT0,
                diffuseMap: d.DIFFUSE_MAP,
                materialAmbient: d.AMBIENT,
                materialDiffuse: d.DIFFUSE,
                materialSpecular: d.SPECULAR,
                materialSpecularPower: d.SPECULAR_POWER,
                cameraNear: d.NEAR_PLANE,
                cameraFar: d.FAR_PLANE,
                fogMultiplier: 0.25,
                attenuation: 5E3
            },
            vshader: "attribute vec3 vertexPosition;\nattribute vec3 vertexNormal;\nattribute vec2 vertexUV0;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 worldMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 lightPosition;\nvarying vec3 normal;\nvarying vec3 lightDir;\nvarying vec3 eyeVec;\nvarying vec2 texCoord0;\nvoid main(void) {\n\tvec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);\n\tgl_Position = projectionMatrix * viewMatrix * worldPos;\n\tnormal = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;\n\ttexCoord0 = vertexUV0;\n\tlightDir = lightPosition - worldPos.xyz;\n\teyeVec = cameraPosition - worldPos.xyz;\n}",
            fshader: "uniform sampler2D diffuseMap;\nuniform vec4 materialAmbient;\nuniform vec4 materialDiffuse;\nuniform vec4 materialSpecular;\nuniform float materialSpecularPower;\nuniform float cameraNear;\nuniform float cameraFar;\nuniform float fogMultiplier;\nuniform float attenuation;\nvarying vec3 normal;\nvarying vec3 lightDir;\nvarying vec3 eyeVec;\nvarying vec2 texCoord0;\nvoid main(void)\n{\n\tvec4 texCol = texture2D(diffuseMap, texCoord0);\n\tvec4 final_color = materialAmbient;\n\tvec3 N = normalize(normal);\n\tvec3 L = normalize(lightDir);\n\tfloat lambertTerm = dot(N,L)*0.75+0.25;\n\tif(lambertTerm > 0.0)\n\t{\n\t\tfinal_color += materialDiffuse * // gl_LightSource[0].diffuse * \n\t\t\tlambertTerm * 2.0;\n\t\tvec3 E = normalize(eyeVec);\n\t\tvec3 R = reflect(-L, N);\n\t\tfloat specular = pow( clamp(dot(R, E), 0.0, 1.0), materialSpecularPower);\n\t\tfinal_color += materialSpecular * // gl_LightSource[0].specular * \n\t\t\tspecular;\n\t}\n\tfloat dist = length(lightDir);\n\tdist *= dist;\n\tfinal_color *= 1.0 - min(dist/attenuation, 1.0);\n\tfinal_color = vec4(texCol.rgb * final_color.rgb, texCol.a);\n\tfloat depth = length(eyeVec);\n\tfloat fog = smoothstep(cameraNear, cameraNear + (cameraFar-cameraNear) * fogMultiplier, depth);\n\tfinal_color.rgb = mix(final_color.rgb, vec3(0.04,0.17,0.11), fog);\n\tgl_FragColor = final_color;\n}"
        };
        return b
    });
    o("js/InstructionsOverlay", [], function () {
        function g(a) {
            var b = 0;
            if (a == "splashBox") {
                var c = document.getElementById(a);
                c && Q(c.style, "opacity", 1, 0, d, function () {
                    c && c.parentNode && c.parentNode.removeChild(c)
                })
            } else {
                if (document.getElementById("splashBox"))return !1;
                for (var g = document.body.querySelectorAll("#" + a + " > *"), b = g.length, j = function () {
                    if (--b == 0) {
                        var c = document.getElementById(a);
                        c && c.parentNode && c.parentNode.removeChild(c)
                    }
                }, k = 0; k < g.length; k++)Q(g[k].style, "opacity", 1, 0, d, j)
            }
            return !0
        }

        var d =
            500;
        if (!Modernizr || !Modernizr.touch) {
            var b = document.getElementById("joystickbackground");
            if (b)b.style.display = "none"
        }
        var a = function (a, b) {
            function c() {
                g(a) && (clearTimeout(d), document.removeEventListener("click", c))
            }

            b == null && (b = 5E3);
            var d = setTimeout(c, b);
            document.addEventListener("click", c)
        };
        return {
            addSplash: function () {
                a("splashBox")
            }, fadeSplash: function () {
                a("splashBox", 1E3)
            }, addInstructions: function (b) {
                var d = document.createElement("div");
                d.id = "instructionsBox";
                var c = '<div class="instructions bottom right nonselect">' +
                    (b == "above" ? "Dive" : "Resurface") + '</div><img src="resources/images/red_arrow_right.png" class="arrow bottom right nonselect" />';
                if (b == "above") {
                    if (c += '<div class="instructions bottom left nonselect">Row</div>', c += '<img src="resources/images/red_arrow_left.png" class="arrow bottom left nonselect" />', !Modernizr || !Modernizr.touch)c += '<img src="resources/images/wasd.png" id="keyboard" class="instructions keyboard nonselect" />'
                } else b = Modernizr && Modernizr.touch ? "Tap to swim" : "Click to swim", c += '<div class="instructions top left nonselect">' +
                    b + "</div>";
                d.innerHTML = c;
                document.body.appendChild(d);
                a("instructionsBox")
            }
        }
    });
    o("goo/util/NoWebGL", ["goo/util/Logo"], function (g) {
        function d(b) {
            this.template = d.templates[b] ? d.templates[b] : d.templates.standard
        }

        d.prototype.upgradeLocation = "http://goodemos.com/recommended.html";
        d.prototype.gooLocation = "http://gooengine.com";
        d.templates = {};
        d.templates.standard = {};
        d.templates.standard.css = "#unsupportedBrowser {z-index: 10000;position: absolute;top: 0;left: 0;width: 100%;background: #1c1c1c;border-top: 1px solid #2a3276;font-family: Helvetica Neue, Helvetica, sans-serif;font-size: 90%;line-height: 145%;}#unsupportedBrowser a.button {-webkit-border-radius: 18px;-moz-border-radius: 18px;-o-border-radius: 18px;border-radius: 18px;margin: 5px 20px 0 0;text-align: left;padding: 10px 25px;color: #1d1d1d;font-weight: 600;font-style: italic;display: inline-block;text-shadow: 0px 1px 1px #8372da;filter: dropshadow(color=#02c2df, offx=0, offy=1);-moz-box-shadow: inset 1px 1px 2px 0 #a9b1fd;-o-box-shadow: inset 1px 1px 2px 0 #a9b1fd;-webkit-box-shadow: inset 1px 1px 2px 0 #a9b1fd;box-shadow: inset 1px 1px 2px 0 #a9b1fd;background: #2a3276;background-image: -ms-linear-gradient(top, #2a3276 0%, #6b7aff 100%);background-image: -moz-linear-gradient(top, #2a3276 0%, #6b7aff 100%);background-image: -o-linear-gradient(top, #2a3276 0%, #6b7aff 100%);background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #2a3276), color-stop(1, #6b7aff));background-image: -webkit-linear-gradient(top, #2a3276 0%, #6b7aff 100%);background-image: linear-gradient(top, #2a3276 0%, #6b7aff 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#2a3276\", endColorstr=\"#6b7aff\");}#unsupportedBrowser a.button:hover {-moz-box-shadow: inset 3px 3px 5px 0 #a9b1fd;-o-box-shadow: inset 3px 3px 5px 0 #a9b1fd;-webkit-box-shadow: inset 3px 3px 5px 0 #a9b1fd;box-shadow: inset 3px 3px 5px 0 #a9b1fd;background: #6b7aff;background-image: -ms-linear-gradient(top, #6b7aff 0%, #2a3276 100%);background-image: -moz-linear-gradient(top, #6b7aff 0%, #2a3276 100%);background-image: -o-linear-gradient(top, #6b7aff 0%, #2a3276 100%);background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #6b7aff), color-stop(1, #2a3276));background-image: -webkit-linear-gradient(top, #6b7aff 0%, #2a3276 100%);background-image: linear-gradient(top, #6b7aff 0%, #2a3276 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#6b7aff', endColorstr='#2a3276'); }#unsupportedBrowser > svg {margin-top: 5px;}#unsupportedBrowser > .logo {background-image: -moz-radial-gradient(50% 250px, circle farthest-corner, #6b7aff, #2a3276 100%);background-image: -webkit-radial-gradient(50% 250px, circle farthest-corner, #6b7aff, #2a3276 100%);background-image: -o-radial-gradient(50% 250px, circle farthest-corner, #6b7aff, #2a3276 100%);background-image: -ms-radial-gradient(50% 250px, circle farthest-corner, #6b7aff, #2a3276 100%);background-image: radial-gradient(50% 250px, circle farthest-corner, #6b7aff, #2a3276 100%);}#unsupportedBrowser > .content {color: #9f9f9f;max-width: 700px;margin-left: 120px;margin-right: 20px;padding-top: 1em;}#unsupportedBrowser p {margin: 0 0 25px 0;}#unsupportedBrowser h1 {display: inline-block;max-width: 600px;margin: 13px 0 25px 20px;color: #f1eee5;vertical-align: top;font-weight: normal}";
        d.templates.standard.html = '<div class="logo"><a href="http://gooengine.com">' + g.getLogo({
                color: g.white,
                shadow: !0,
                width: "100px",
                height: "70px"
            }) + '</a><h1>Whoopsie daisy!</h1></div><div class="content"><p>Your browser doesn\'t seem to support HTML5 and WebGL. The best thing to do is upgrade to a modern browser that supports all the awesome things the web has to offer.</p><p><a data-upgrade class="button" href="">Upgrade my browser!</a><a data-close class="button" href="">Not now</a></p></div>';
        d.prototype.show =
            function () {
                var b = document.createElement("div");
                b.innerHTML = this.template.html;
                b.setAttribute("id", "unsupportedBrowser");
                var a = document.createElement("style");
                a.type = "text/css";
                a.setAttribute("id", "unsupportedBrowserStyles");
                a.stylesheet ? a.stylesheet.cssText = this.template.css : a.appendChild(document.createTextNode(this.template.css));
                document.head.appendChild(a);
                document.body.appendChild(b);
                var a = b.querySelector("[data-close]"), d = function (a) {
                    a.preventDefault();
                    a.stopPropagation();
                    document.location.href =
                        this.gooLocation;
                    document.body.removeChild(document.querySelector("div#unsupportedBrowser"));
                    document.head.removeChild(document.querySelector("#unsupportedBrowserStyles"))
                }.bind(this);
                a.addEventListener("click", d);
                b = b.querySelector("[data-upgrade]");
                a = function (a) {
                    a.preventDefault();
                    a.stopPropagation();
                    document.location.href = this.upgradeLocation
                }.bind(this);
                b.addEventListener("click", a)
            };
        d.prototype.addTemplate = function (b, a) {
            d.templates[b] ? console.error("Template " + b + " already exists") : d.templates[b] =
                a
        };
        return d
    });
    o("js/kaazing/Receiver", [], function () {
        function g(b, a) {
            this._controlScript = b;
            a = a || {};
            this._url = "ws://" + (a.url || window.location.hostname) + ":" + (a.port || window.location.port) + (a.path !== void 0 && a.path !== null ? a.path : "/jms");
            var d = window.location.href.match(/[?&]id=([^&]+)/), e = "";
            d && d.length && (e = d[1]);
            this._topic = (a.topic || "/topic/pearlboy") + e;
            this._mapping = a.mapping;
            return e
        }

        g.prototype.connect = function () {
            var b = (new StompConnectionFactory(this._url)).createConnection(function () {
                if (b.exception)console.error(b.exception);
                else {
                    var a = b.getValue();
                    console.log("Connected to " + this._url);
                    var d = a.createSession(!1, Session.AUTO_ACKNOWLEDGE), e = d.createTopic(this._topic);
                    console.log("Topic created...");
                    d = d.createConsumer(e);
                    console.log("Topic consumer created...");
                    d.setMessageListener(this.handleMessage.bind(this));
                    a.start(function () {
                        console.log("Connection Started!!")
                    })
                }
            }.bind(this))
        };
        var d = !0;
        g.prototype.handleMessage = function (b) {
            var a = b.getText().match(/^(.*)(start|end)$/);
            if (a) {
                var f = document.getElementById("kaazingInfo");
                d && (d = !1, Q(f.style, "opacity", 1, 0, 1E3, function () {
                    f.parentNode.removeChild(f)
                }));
                b = this._mapping ? this._mapping[a[1]] : a[1];
                a = a[2] === "start" ? 1 : 0;
                console.log("Setting " + b + " to " + a);
                if (this._controlScript.moveState[b] = a)switch (b) {
                    case "up":
                        this._controlScript.moveState.down = 0;
                        break;
                    case "down":
                        this._controlScript.moveState.up = 0;
                        break;
                    case "left":
                        this._controlScript.moveState.right = 0;
                        break;
                    case "right":
                        this._controlScript.moveState.left = 0
                }
            }
            this._controlScript.updateMovementVector && this._controlScript.updateMovementVector()
        };
        return g
    });
    o("js/fadeinout", function () {
    });
    R.config({baseUrl: "./", paths: {goo: "/js/goo", "goo/lib": "/js/goo/lib"}});
    R("js/lib/domReady,goo/entities/World,goo/renderer/Material,goo/entities/GooRunner,goo/entities/components/ScriptComponent,goo/shapes/ShapeCreator,goo/entities/EntityUtils,goo/entities/components/LightComponent,goo/renderer/light/DirectionalLight,goo/renderer/Camera,goo/entities/components/CameraComponent,goo/scripts/OrbitCamControlScript,goo/math/Vector3,goo/renderer/shaders/ShaderLib,goo/scripts/WASDControlScript,goo/scripts/MouseLookControlScript,goo/renderer/MeshData,goo/renderer/Shader,goo/renderer/Util,goo/renderer/TextureCreator,goo/renderer/pass/RenderTarget,goo/math/Plane,goo/addons/water/FlatWaterRenderer,goo/loaders/DynamicLoader,goo/util/Latch,js/scripts/RowingControllerScript,goo/renderer/pass/Composer,goo/renderer/pass/RenderPass,goo/renderer/pass/BloomPass,goo/renderer/pass/FullscreenPass,goo/math/Vector4,js/shaders/PBShaderDefs,js/InstructionsOverlay,goo/util/NoWebGL,js/kaazing/Receiver,js/fadeinout".split(","),
        function (g, d, b, a, f, e, c, i, j, k, h, l, n, o, r, m, s, x, p, w, y, t, u, A, v, C, z, F, E, D, K, L, I, M, N) {
            function S(a) {
                var b = new A({world: a.world, rootPath: P});
                b.loadFromBundle("test.scene", "skybox2.bundle").then(function (c) {
                    var d = [], e;
                    for (e in c)if (/\.entity$/.test(e)) {
                        var f = b.getCachedObjectForRef(e);
                        f.meshRendererComponent && (function (b) {
                            a.callbacksPreRender.push(function () {
                                var a = b.transformComponent.transform.translation.data, c = O.transformComponent.transform.translation.data;
                                a[0] = c[0];
                                a[1] = -c[2];
                                b.transformComponent.setUpdated()
                            })
                        }(f),
                            d.push(f))
                    }
                    B.setSkyBox(d);
                    T.countDown()
                }).then(null, function (a) {
                    console.error("Something went wrong", a)
                })
            }

            function G(a) {
                var b = new A({world: a.world, rootPath: P});
                b.loadFromBundle("test.scene", "pb.bundle").then(function (a) {
                    var c = [], d;
                    for (d in a)/entity$/.test(d) && a[d].components.animation && c.push(b.getCachedObjectForRef(d).animationComponent);
                    H = new C({
                        animationComponents: c,
                        minRowSpeed: 0,
                        maxRowSpeed: 1,
                        maxVelocity: 70,
                        rowAcceleration: 25,
                        turnSpeed: Math.PI / 8,
                        dragDecceleration: 5
                    });
                    if (J("remote") == "true")J("id") ==
                    null && (window.location.href += "&id=" + Math.floor(Math.random() * 1E4)), document.getElementById("kaazingInfo").style.display = "block", document.getElementById("kaazingID").innerHTML = J("id"), (new N(H, {
                        path: null,
                        port: 8078,
                        url: "labs.gooengine.com",
                        mapping: {up: "forward", down: "backward", left: "turnLeft", right: "turnRight"}
                    })).connect();
                    var e = new n;
                    b.getCachedObjectForRef("entities/Collada_Root_0.entity").setComponent(new f([H, {
                        run: function (a) {
                            var b = a.transformComponent, c = a._world.time * 0.8, d = Math.sin(c * 2) * Math.sin(1 +
                                    c * 3) * 0.01 * (H.velocity * 0.05 + 1) + H.velocity * 3.0E-4, c = Math.sin(c * 1) * Math.sin(2 + c * 2) * 0.016 * (H.velocity * 0.05 + 1);
                            b.transform.setRotationXYZ(-Math.PI / 2 + d, H.orient, 0 + c);
                            b.transform.translation.add([a._world.tpf * H.velocityVec.x, 0, a._world.tpf * H.velocityVec.z]);
                            b.setUpdated()
                        }
                    }, {
                        run: function (a, b) {
                            e.setv(a.transformComponent.transform.translation);
                            e.y += 30;
                            V.lookAtPoint.lerp(e, b);
                            V.dirty = !0
                        }
                    }]));
                    T.countDown()
                }).then(null, function (a) {
                    console.error("Something went wrong: ", a)
                })
            }

            function Q(a, d, f, g, h) {
                f = e.createBox(f,
                    g, h);
                a = c.createTypicalEntity(a.world, f);
                d = b.createMaterial(d, "mat");
                a.meshRendererComponent.materials.push(d);
                return a
            }

            function R() {
                function a(b) {
                    b.play({
                        onfinish: function () {
                            a(b)
                        }
                    })
                }

                var b = window.soundManager.createSound({id: "music", url: P + "sound/Test.mp3", volume: 100});
                a(b)
            }

            function J(a) {
                a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                a = RegExp("[\\?&]" + a + "=([^&#]*)").exec(window.location.href);
                return a === null ? null : a[1]
            }

            var O = null, U = null, B = null, P = "resources/", V = null, T = null, H = null, W = L.texturedLitDef,
                Y = !1, X = !1, Z = !0;
            g(function () {
                J("fast") === "true" && (Z = !1);
                J("gui") === "true" && (Y = !0);
                J("bloom") === "true" && (X = !0);
                var d = !0;
                J("noantialias") === "true" && (d = !1);
                var g = !1;
                J("stats") === "true" && (g = !0);
                var m = 2;
                J("divider") !== null && (m = parseInt(J("divider"), 10), m = Math.max(m, 1));
                try {
                    var p = new a({showStats: g, antialias: d, manuallyStartGameLoop: !0})
                } catch (r) {
                    if (r.name === "GooWebGLError")return (new M).show(), !1
                }
                p.doRender = !1;
                p.renderer.setClearColor(0.4, 0.45, 0.35, 1);
                p.renderer.domElement.id = "goo";
                document.body.appendChild(p.renderer.domElement);
                d = new SQUARIFIC.framework.TouchControl(document.getElementById("joystick"), {
                    pretendArrowKeys: !1,
                    mindistance: 12,
                    maxdistance: 28,
                    middleLeft: 12,
                    middleTop: 12
                });
                d.on("joystickMove", function (a) {
                    H && H.applyJoystick(-a.deltaX, -a.deltaY)
                });
                d.on("joystickReleased", function () {
                    H && H.releaseJoystick()
                });
                T = new v(5, {
                    done: function () {
                        p.doRender = !0;
                        p.startGameLoop();
                        var a = I.addInstructions.bind(null, "above");
                        I.fadeSplash();
                        $(a)
                    }, progress: function (a) {
                        console.log("Latch count:", 5 - a)
                    }
                });
                w._globalCallback = function () {
                    T.countDown()
                };
                var s = !0;
                window.soundManager.setup({
                    url: "js/lib/swf", onready: function () {
                        R();
                        s && (T.countDown(), s = !1)
                    }, ontimeout: function () {
                        console.warn("Failed to load soundmanager");
                        s && (T.countDown(), s = !1)
                    }
                });
                d = new k(45, 1, 1, 5E3);
                O = p.world.createEntity("CameraEntity");
                O.transformComponent.transform.translation.setd(0, 20, -150);
                O.transformComponent.transform.lookAt(new n(0, 20, 1), n.UNIT_Y);
                O.setComponent(new h(d));
                O.addToWorld();
                d = new f;
                V = new l({
                    domElement: p.renderer.domElement,
                    spherical: new n(200, -Math.PI * 1.3 / 2, -0.02),
                    minAscent: -0.04,
                    maxAscent: 0.5,
                    lookAtPoint: new n(0, 30, 0),
                    minZoomDistance: 150,
                    maxZoomDistance: 500
                });
                d.scripts.push(V);
                O.setComponent(d);
                var d = new j, t = p.world.createEntity();
                t.transformComponent.transform.translation.x = 1E3;
                t.transformComponent.transform.translation.y = 100;
                t.transformComponent.transform.translation.z = 1E3;
                t.transformComponent.transform.lookAt(n.ZERO, n.UNIT_Y);
                t.setComponent(new i(d));
                t.addToWorld();
                if (X) {
                    d = new z;
                    g = new F(p.world.getSystem("RenderSystem").renderList);
                    g.clearColor = new K(0.5,
                        0.55, 0.45, 1);
                    var y = new E({strength: 0.5}), A = new D(o.copy);
                    d.addPass(g);
                    d.addPass(y);
                    d.addPass(A);
                    p.renderSystem.composers.push(d);
                    A.renderToScreen = !0
                }
                S(p);
                G(p);
                for (d = 0; d < 5; d++)t = Q(p, W, 20, 20, 20), t.meshRendererComponent.materials[0].setTexture(x.DIFFUSE_MAP, (new w).loadTexture2D(P + "textures/box.png")), t.meshRendererComponent.materials[0].materialState = {
                    ambient: [0.3, 0.35, 0.3, 1],
                    diffuse: [0.5, 0.5, 0.5, 1],
                    emissive: [0, 0, 0, 1],
                    specular: [0.5, 0.5, 0.5, 1],
                    shininess: 16
                }, t.transformComponent.transform.translation.x =
                    Math.random() * 1E3 - 500, t.transformComponent.transform.translation.z = Math.random() * 1E3 - 500, t.addToWorld(), function (a) {
                    t.setComponent(new f({
                        run: function (b) {
                            var c = b._world.time, b = b.transformComponent;
                            b.transform.translation.y = Math.sin(a + 1 + c * 0.7) * Math.sin(a + 2 + c * 1.2) * 3;
                            var d = Math.sin(a + 1 + c * 1) * Math.sin(a + 2 + c * 1.4) * 0.1, c = Math.sin(a + 1 + c * 0.8) * Math.sin(a + 3 + c * 1.2) * 0.1;
                            b.transform.setRotationXYZ(d, d, c);
                            b.setUpdated()
                        }
                    }))
                }(Math.random() * 100);
                var d = e.createQuad(5E3, 5E3, 10, 10), C = c.createTypicalEntity(p.world, d),
                    d = b.createMaterial(o.simple, "mat");
                C.meshRendererComponent.materials.push(d);
                C.transformComponent.transform.setRotationXYZ(-Math.PI / 2, 0, 0);
                C.transformComponent.transform.translation.y = 0;
                C.addToWorld();
                p.callbacksPreRender.push(function () {
                    C.transformComponent.transform.translation.x = O.transformComponent.transform.translation.x;
                    C.transformComponent.transform.translation.z = O.transformComponent.transform.translation.z;
                    C.transformComponent.setUpdated()
                });
                B = new u({
                    normalsUrl: P + "water/waternormals3b.png",
                    useRefraction: Z, divider: m
                });
                p.renderSystem.preRenderers.push(B);
                B.followCam = !1;
                B.setWaterEntity(C);
                B.waterMaterial.shader.uniforms.timeMultiplier = 1;
                B.waterMaterial.shader.uniforms.doFog = !1;
                B.waterMaterial.shader.uniforms.sunDirection = [-0.55, -0.5, 0.2];
                B.waterMaterial.shader.uniforms.waterColor = [22 / 255, 38 / 255, 0];
                B.waterMaterial.shader.uniforms.sunColor = [0.95, 1, 0.6];
                B.waterMaterial.shader.uniforms.distortionMultiplier = 0.04;
                B.waterMaterial.shader.uniforms.fresnelPow = 5;
                B.waterMaterial.shader.uniforms.normalMultiplier =
                    0.9;
                B.waterMaterial.shader.uniforms.fresnelMultiplier = 0.5;
                B.waterMaterial.shader.uniforms.sunShininess = 230;
                B.waterMaterial.shader.uniforms.waterScale = 2;
                Y && (U = new window.dat.GUI, m = U.addFolder("Sun"), m.addColor(B.waterMaterial.shader.uniforms, "sunColor"), m.add(B.waterMaterial.shader.uniforms, "sunShininess", 0, 300), m.add(B.waterMaterial.shader.uniforms, "sunSpecPower", 0, 4), m = m.addFolder("Direction"), m.add(B.waterMaterial.shader.uniforms.sunDirection, "0", -1, 1), m.add(B.waterMaterial.shader.uniforms.sunDirection,
                    "1", -1, 1), m.add(B.waterMaterial.shader.uniforms.sunDirection, "2", -1, 1), m = U.addFolder("Water"), m.add(B.waterMaterial.shader.uniforms, "timeMultiplier", 0.1, 5), m.add(B.waterMaterial.shader.uniforms, "distortionMultiplier", 0, 0.5), m.add(B.waterMaterial.shader.uniforms, "fresnelPow", 1, 8), m.add(B.waterMaterial.shader.uniforms, "normalMultiplier", 0, 3), m.add(B.waterMaterial.shader.uniforms, "fresnelMultiplier", 0, 3), m.addColor(B.waterMaterial.shader.uniforms, "waterColor"), m.add({message: ""}, "message", ["1", "2", "3"]).onFinishChange(function (a) {
                    a ===
                    "1" ? B.waterMaterial.setTexture("NORMAL_MAP", (new w).loadTexture2D(P + "water/waternormals3b.png")) : a === "2" ? B.waterMaterial.setTexture("NORMAL_MAP", (new w).loadTexture2D(P + "water/waternormals3.png")) : a === "3" && B.waterMaterial.setTexture("NORMAL_MAP", (new w).loadTexture2D(P + "water/normalmap3.dds"));
                    console.log(a)
                }), m.add(B.waterMaterial.shader.uniforms, "waterScale", 1.0E-4, 5), m = U.addFolder("Fog"), m.add(B.waterMaterial.shader.uniforms, "doFog"), m.addColor(B.waterMaterial.shader.uniforms, "fogColor"), m.add(B.waterMaterial.shader.uniforms,
                    "fogStart", 0, 2E3), m.add(B.waterMaterial.shader.uniforms, "fogScale", 1, 2E3), X && U.add(y.copyShader.uniforms, "opacity", 0, 1))
            })
        });
    o("js/above/abovesurface.js", function () {
    });
    R(["js/above/abovesurface.js"])
})();
