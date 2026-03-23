(self.webpackChunk = self.webpackChunk || []).push([
  [301],
  {
    10470: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return c;
        },
      });
      var o = n(24967),
        r = n(75271),
        i = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z',
                },
              },
            ],
          },
          name: 'check-circle',
          theme: 'filled',
        },
        a = n(63812),
        l = function (e, t) {
          return r.createElement(a.Z, (0, o.Z)({}, e, { ref: t, icon: i }));
        };
      var c = r.forwardRef(l);
    },
    19466: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return c;
        },
      });
      var o = n(24967),
        r = n(75271),
        i = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z',
                },
              },
            ],
          },
          name: 'exclamation-circle',
          theme: 'filled',
        },
        a = n(63812),
        l = function (e, t) {
          return r.createElement(a.Z, (0, o.Z)({}, e, { ref: t, icon: i }));
        };
      var c = r.forwardRef(l);
    },
    59836: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return Oo;
          },
        });
      var o = n(48305),
        r = n.n(o),
        i = n(15558),
        a = n.n(i),
        l = n(26068),
        c = n.n(l),
        s = n(335),
        d = n.n(s),
        u = n(72072),
        p = n(75271),
        m = n(26047),
        h = n(12825),
        f = n(70786),
        v = n(96171),
        g = n(7034),
        y = n(18178),
        x = n(26268),
        C = n(90523);
      function b(e) {
        var t = 'undefined' == typeof window,
          n = (0, p.useState)(function () {
            return !t && window.matchMedia(e).matches;
          }),
          o = (0, g.Z)(n, 2),
          r = o[0],
          i = o[1];
        return (
          (0, p.useLayoutEffect)(
            function () {
              if (!t) {
                var n = window.matchMedia(e),
                  o = function (e) {
                    return i(e.matches);
                  };
                return (
                  n.addListener(o),
                  function () {
                    return n.removeListener(o);
                  }
                );
              }
            },
            [e],
          ),
          r
        );
      }
      var k = {
          xs: { maxWidth: 575, matchMedia: '(max-width: 575px)' },
          sm: {
            minWidth: 576,
            maxWidth: 767,
            matchMedia: '(min-width: 576px) and (max-width: 767px)',
          },
          md: {
            minWidth: 768,
            maxWidth: 991,
            matchMedia: '(min-width: 768px) and (max-width: 991px)',
          },
          lg: {
            minWidth: 992,
            maxWidth: 1199,
            matchMedia: '(min-width: 992px) and (max-width: 1199px)',
          },
          xl: {
            minWidth: 1200,
            maxWidth: 1599,
            matchMedia: '(min-width: 1200px) and (max-width: 1599px)',
          },
          xxl: { minWidth: 1600, matchMedia: '(min-width: 1600px)' },
        },
        E = function () {
          var e,
            t = b(k.md.matchMedia),
            n = b(k.lg.matchMedia),
            o = b(k.xxl.matchMedia),
            r = b(k.xl.matchMedia),
            i = b(k.sm.matchMedia),
            a = b(k.xs.matchMedia),
            l = (0, p.useState)(
              ((e = void 0),
              'undefined' == typeof window
                ? e
                : (e = Object.keys(k).find(function (e) {
                    var t = k[e].matchMedia;
                    return !!window.matchMedia(t).matches;
                  }))),
            ),
            c = (0, g.Z)(l, 2),
            s = c[0],
            d = c[1];
          return (
            (0, p.useEffect)(
              function () {
                d(
                  o
                    ? 'xxl'
                    : r
                    ? 'xl'
                    : n
                    ? 'lg'
                    : t
                    ? 'md'
                    : i
                    ? 'sm'
                    : a
                    ? 'xs'
                    : 'md',
                );
              },
              [t, n, o, r, i, a],
            ),
            s
          );
        },
        Z = n(42698);
      var M = n(75889),
        j = n(71407),
        S = function (e) {
          var t = {};
          if (
            (Object.keys(e || {}).forEach(function (n) {
              void 0 !== e[n] && (t[n] = e[n]);
            }),
            !(Object.keys(t).length < 1))
          )
            return t;
        },
        w = n(14224),
        B = function () {
          return void 0 === w
            ? j.Z
            : (null === w ||
              void 0 === w ||
              null === (w = { NODE_ENV: 'production', PUBLIC_PATH: './' }) ||
              void 0 === w
                ? void 0
                : w.ANTD_VERSION) || j.Z;
        },
        I = function (e, t) {
          var n =
            (0, M.n)(B(), '4.23.0') > -1
              ? { open: e, onOpenChange: t }
              : { visible: e, onVisibleChange: t };
          return S(n);
        };
      function F(e) {
        if ((0, M.n)(B(), '5.6.0') < 0) return e;
        var t = {
            colorGroupTitle: 'groupTitleColor',
            radiusItem: 'itemBorderRadius',
            radiusSubMenuItem: 'subMenuItemBorderRadius',
            colorItemText: 'itemColor',
            colorItemTextHover: 'itemHoverColor',
            colorItemTextHoverHorizontal: 'horizontalItemHoverColor',
            colorItemTextSelected: 'itemSelectedColor',
            colorItemTextSelectedHorizontal: 'horizontalItemSelectedColor',
            colorItemTextDisabled: 'itemDisabledColor',
            colorDangerItemText: 'dangerItemColor',
            colorDangerItemTextHover: 'dangerItemHoverColor',
            colorDangerItemTextSelected: 'dangerItemSelectedColor',
            colorDangerItemBgActive: 'dangerItemActiveBg',
            colorDangerItemBgSelected: 'dangerItemSelectedBg',
            colorItemBg: 'itemBg',
            colorItemBgHover: 'itemHoverBg',
            colorSubItemBg: 'subMenuItemBg',
            colorItemBgActive: 'itemActiveBg',
            colorItemBgSelected: 'itemSelectedBg',
            colorItemBgSelectedHorizontal: 'horizontalItemSelectedBg',
            colorActiveBarWidth: 'activeBarWidth',
            colorActiveBarHeight: 'activeBarHeight',
            colorActiveBarBorderSize: 'activeBarBorderWidth',
          },
          n = (0, y.Z)({}, e);
        return (
          Object.keys(t).forEach(function (e) {
            void 0 !== n[e] && ((n[t[e]] = n[e]), delete n[e]);
          }),
          n
        );
      }
      var L = n(18105);
      function A(e, t) {
        return (t >>> e) | (t << (32 - e));
      }
      function R(e, t, n) {
        return (e & t) ^ (~e & n);
      }
      function N(e, t, n) {
        return (e & t) ^ (e & n) ^ (t & n);
      }
      function T(e) {
        return A(2, e) ^ A(13, e) ^ A(22, e);
      }
      function H(e, t) {
        return (e[15 & t] +=
          (A(17, (n = e[(t + 14) & 15])) ^ A(19, n) ^ (n >>> 10)) +
          e[(t + 9) & 15] +
          (function (e) {
            return A(7, e) ^ A(18, e) ^ (e >>> 3);
          })(e[(t + 1) & 15]));
        var n;
      }
      var z,
        D,
        P,
        O = [
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
          2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
          1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
          4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692,
          1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
          1294757372, 1396182291, 1695183700, 1986661051, 2177026350,
          2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
          3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
          659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
          2756734187, 3204031479, 3329325298,
        ];
      function W(e, t) {
        var n = (65535 & e) + (65535 & t);
        return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
      }
      function $() {
        var e,
          t,
          n,
          o,
          r,
          i,
          a,
          l,
          c,
          s,
          d,
          u = new Array(16);
        (e = z[0]),
          (t = z[1]),
          (n = z[2]),
          (o = z[3]),
          (r = z[4]),
          (i = z[5]),
          (a = z[6]),
          (l = z[7]);
        for (var p = 0; p < 16; p++)
          u[p] =
            P[3 + (p << 2)] |
            (P[2 + (p << 2)] << 8) |
            (P[1 + (p << 2)] << 16) |
            (P[p << 2] << 24);
        for (var m = 0; m < 64; m++)
          (c = l + (A(6, (d = r)) ^ A(11, d) ^ A(25, d)) + R(r, i, a) + O[m]),
            (c += m < 16 ? u[m] : H(u, m)),
            (s = T(e) + N(e, t, n)),
            (l = a),
            (a = i),
            (i = r),
            (r = W(o, c)),
            (o = n),
            (n = t),
            (t = e),
            (e = W(c, s));
        (z[0] += e),
          (z[1] += t),
          (z[2] += n),
          (z[3] += o),
          (z[4] += r),
          (z[5] += i),
          (z[6] += a),
          (z[7] += l);
      }
      var _ = function (e) {
          return (
            (z = new Array(8)),
            (D = new Array(2)),
            (P = new Array(64)),
            (D[0] = D[1] = 0),
            (z[0] = 1779033703),
            (z[1] = 3144134277),
            (z[2] = 1013904242),
            (z[3] = 2773480762),
            (z[4] = 1359893119),
            (z[5] = 2600822924),
            (z[6] = 528734635),
            (z[7] = 1541459225),
            (function (e, t) {
              var n,
                o,
                r = 0;
              o = (D[0] >> 3) & 63;
              var i = 63 & t;
              for (
                (D[0] += t << 3) < t << 3 && D[1]++, D[1] += t >> 29, n = 0;
                n + 63 < t;
                n += 64
              ) {
                for (var a = o; a < 64; a++) P[a] = e.charCodeAt(r++);
                $(), (o = 0);
              }
              for (var l = 0; l < i; l++) P[l] = e.charCodeAt(r++);
            })(e, e.length),
            (function () {
              var e = (D[0] >> 3) & 63;
              if (((P[e++] = 128), e <= 56))
                for (var t = e; t < 56; t++) P[t] = 0;
              else {
                for (var n = e; n < 64; n++) P[n] = 0;
                $();
                for (var o = 0; o < 56; o++) P[o] = 0;
              }
              (P[56] = (D[1] >>> 24) & 255),
                (P[57] = (D[1] >>> 16) & 255),
                (P[58] = (D[1] >>> 8) & 255),
                (P[59] = 255 & D[1]),
                (P[60] = (D[0] >>> 24) & 255),
                (P[61] = (D[0] >>> 16) & 255),
                (P[62] = (D[0] >>> 8) & 255),
                (P[63] = 255 & D[0]),
                $();
            })(),
            (function () {
              for (var e = new String(), t = 0; t < 8; t++)
                for (var n = 28; n >= 0; n -= 4)
                  e += '0123456789abcdef'.charAt((z[t] >>> n) & 15);
              return e;
            })()
          );
        },
        G = [
          'pro_layout_parentKeys',
          'children',
          'icon',
          'flatMenu',
          'indexRoute',
          'routes',
        ];
      function V(e) {
        return (
          (V =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          V(e)
        );
      }
      function K(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n =
              null == e
                ? null
                : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                  e['@@iterator'];
            if (null != n) {
              var o,
                r,
                i,
                a,
                l = [],
                c = !0,
                s = !1;
              try {
                if (((i = (n = n.call(e)).next), 0 === t)) {
                  if (Object(n) !== n) return;
                  c = !1;
                } else
                  for (
                    ;
                    !(c = (o = i.call(n)).done) &&
                    (l.push(o.value), l.length !== t);
                    c = !0
                  );
              } catch (e) {
                (s = !0), (r = e);
              } finally {
                try {
                  if (
                    !c &&
                    null != n.return &&
                    ((a = n.return()), Object(a) !== a)
                  )
                    return;
                } finally {
                  if (s) throw r;
                }
              }
              return l;
            }
          })(e, t) ||
          oe(e, t) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function U(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      function X(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            'value' in o && (o.writable = !0),
            Object.defineProperty(e, se(o.key), o);
        }
      }
      function q(e, t, n) {
        return (
          (t = te(t)),
          (function (e, t) {
            if (t && ('object' == V(t) || 'function' == typeof t)) return t;
            if (void 0 !== t)
              throw new TypeError(
                'Derived constructors may only return object or undefined',
              );
            return (function (e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called",
                );
              return e;
            })(e);
          })(
            e,
            J()
              ? Reflect.construct(t, n || [], te(e).constructor)
              : t.apply(e, n),
          )
        );
      }
      function Q(e) {
        var t = 'function' == typeof Map ? new Map() : void 0;
        return (
          (Q = function (e) {
            if (
              null === e ||
              !(function (e) {
                try {
                  return (
                    -1 !== Function.toString.call(e).indexOf('[native code]')
                  );
                } catch (t) {
                  return 'function' == typeof e;
                }
              })(e)
            )
              return e;
            if ('function' != typeof e)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            if (void 0 !== t) {
              if (t.has(e)) return t.get(e);
              t.set(e, n);
            }
            function n() {
              return Y(e, arguments, te(this).constructor);
            }
            return (
              (n.prototype = Object.create(e.prototype, {
                constructor: {
                  value: n,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
              ee(n, e)
            );
          }),
          Q(e)
        );
      }
      function Y(e, t, n) {
        if (J()) return Reflect.construct.apply(null, arguments);
        var o = [null];
        o.push.apply(o, t);
        var r = new (e.bind.apply(e, o))();
        return n && ee(r, n.prototype), r;
      }
      function J() {
        try {
          var e = !Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {}),
          );
        } catch (e) {}
        return (J = function () {
          return !!e;
        })();
      }
      function ee(e, t) {
        return (
          (ee = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (e, t) {
                return (e.__proto__ = t), e;
              }),
          ee(e, t)
        );
      }
      function te(e) {
        return (
          (te = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          te(e)
        );
      }
      function ne(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return re(e);
          })(e) ||
          (function (e) {
            if (
              ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
              null != e['@@iterator']
            )
              return Array.from(e);
          })(e) ||
          oe(e) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function oe(e, t) {
        if (e) {
          if ('string' == typeof e) return re(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return (
            'Object' === n && e.constructor && (n = e.constructor.name),
            'Map' === n || 'Set' === n
              ? Array.from(e)
              : 'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? re(e, t)
              : void 0
          );
        }
      }
      function re(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = Array(t); n < t; n++) o[n] = e[n];
        return o;
      }
      function ie(e, t) {
        if (null == e) return {};
        var n,
          o,
          r = (function (e, t) {
            if (null == e) return {};
            var n = {};
            for (var o in e)
              if ({}.hasOwnProperty.call(e, o)) {
                if (-1 !== t.indexOf(o)) continue;
                n[o] = e[o];
              }
            return n;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          for (o = 0; o < i.length; o++)
            (n = i[o]),
              -1 === t.indexOf(n) &&
                {}.propertyIsEnumerable.call(e, n) &&
                (r[n] = e[n]);
        }
        return r;
      }
      function ae(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          t &&
            (o = o.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, o);
        }
        return n;
      }
      function le(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ae(Object(n), !0).forEach(function (t) {
                ce(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : ae(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
        }
        return e;
      }
      function ce(e, t, n) {
        return (
          (t = se(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function se(e) {
        var t = (function (e, t) {
          if ('object' != V(e) || !e) return e;
          var n = e[Symbol.toPrimitive];
          if (void 0 !== n) {
            var o = n.call(e, t || 'default');
            if ('object' != V(o)) return o;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return ('string' === t ? String : Number)(e);
        })(e, 'string');
        return 'symbol' == V(t) ? t : t + '';
      }
      var de = 'routes';
      function ue(e) {
        return e.split('?')[0].split('#')[0];
      }
      var pe = function (e) {
          if (!e.startsWith('http')) return !1;
          try {
            return !!new URL(e);
          } catch (e) {
            return !1;
          }
        },
        me = function (e) {
          var t = e.path;
          if (!t || '/' === t)
            try {
              return '/'.concat(_(JSON.stringify(e)));
            } catch (e) {}
          return t ? ue(t) : t;
        },
        he = function (e, t) {
          var n = e.name,
            o = e.locale;
          return (
            !(('locale' in e && !1 === o) || !n) &&
            (e.locale || ''.concat(t, '.').concat(n))
          );
        },
        fe = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : '',
            t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : '/';
          return e.endsWith('/*')
            ? e.replace('/*', '/')
            : (e || t).startsWith('/') || pe(e)
            ? e
            : '/'
                .concat(t, '/')
                .concat(e)
                .replace(/\/\//g, '/')
                .replace(/\/\//g, '/');
        },
        ve = function (e, t) {
          var n = e.menu,
            o = void 0 === n ? {} : n,
            r = e.indexRoute,
            i = e.path,
            a = void 0 === i ? '' : i,
            l = e.children || [],
            c = o.name,
            s = void 0 === c ? e.name : c,
            d = o.icon,
            u = void 0 === d ? e.icon : d,
            p = o.hideChildren,
            m = void 0 === p ? e.hideChildren : p,
            h = o.flatMenu,
            f = void 0 === h ? e.flatMenu : h,
            v =
              r && 'redirect' !== Object.keys(r).join(',')
                ? [le({ path: a, menu: o }, r)].concat(l || [])
                : l,
            g = le({}, e);
          if ((s && (g.name = s), u && (g.icon = u), v && v.length)) {
            if (m) return delete g.children, g;
            var y = ye(le(le({}, t), {}, { data: v }), e);
            if (f) return y;
            delete g[de];
          }
          return g;
        },
        ge = function (e) {
          return Array.isArray(e) && e.length > 0;
        };
      function ye(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : { path: '/' },
          n = e.data,
          o = e.formatMessage,
          r = e.parentName,
          i = e.locale;
        return n && Array.isArray(n)
          ? n
              .filter(function (e) {
                return (
                  !!e &&
                  (!!ge(e.children) ||
                    !!e.path ||
                    !!e.originPath ||
                    !!e.layout ||
                    (e.redirect || e.unaccessible, !1))
                );
              })
              .filter(function (e) {
                var t, n;
                return (
                  !!(
                    (null == e || null === (t = e.menu) || void 0 === t
                      ? void 0
                      : t.name) ||
                    (null == e ? void 0 : e.flatMenu) ||
                    (null == e || null === (n = e.menu) || void 0 === n
                      ? void 0
                      : n.flatMenu)
                  ) || !1 !== e.menu
                );
              })
              .map(function (e) {
                var t = le(le({}, e), {}, { path: e.path || e.originPath });
                return (
                  !t.children && t[de] && ((t.children = t[de]), delete t[de]),
                  t.unaccessible && delete t.name,
                  '*' === t.path && (t.path = '.'),
                  '/*' === t.path && (t.path = '.'),
                  !t.path && t.originPath && (t.path = t.originPath),
                  t
                );
              })
              .map(function () {
                var n =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : { path: '/' },
                  a = n.children || n[de] || [],
                  l = fe(n.path, t ? t.path : '/'),
                  c = n.name,
                  s = he(n, r || 'menu'),
                  d =
                    !1 !== s && !1 !== i && o && s
                      ? o({ id: s, defaultMessage: c })
                      : c,
                  u = t.pro_layout_parentKeys,
                  p = void 0 === u ? [] : u,
                  m =
                    (t.children,
                    t.icon,
                    t.flatMenu,
                    t.indexRoute,
                    t.routes,
                    ie(t, G)),
                  h = new Set([].concat(ne(p), ne(n.parentKeys || [])));
                t.key && h.add(t.key);
                var f = le(
                  le(le({}, m), {}, { menu: void 0 }, n),
                  {},
                  {
                    path: l,
                    locale: s,
                    key: n.key || me(le(le({}, n), {}, { path: l })),
                    pro_layout_parentKeys: Array.from(h).filter(function (e) {
                      return e && '/' !== e;
                    }),
                  },
                );
                if (
                  (d ? (f.name = d) : delete f.name,
                  void 0 === f.menu && delete f.menu,
                  ge(a))
                ) {
                  var v = ye(
                    le(le({}, e), {}, { data: a, parentName: s || '' }),
                    f,
                  );
                  ge(v) && (f.children = v);
                }
                return ve(f, e);
              })
              .flat(1)
          : [];
      }
      var xe = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return e
            .filter(function (e) {
              return (
                e && (e.name || ge(e.children)) && !e.hideInMenu && !e.redirect
              );
            })
            .map(function (e) {
              var t = le({}, e),
                n = t.children || e[de] || [];
              if (
                (delete t[de],
                ge(n) &&
                  !t.hideChildrenInMenu &&
                  n.some(function (e) {
                    return e && !!e.name;
                  }))
              ) {
                var o = xe(n);
                if (o.length) return le(le({}, t), {}, { children: o });
              }
              return le({}, e);
            })
            .filter(function (e) {
              return e;
            });
        },
        Ce = (function (e) {
          function t() {
            return U(this, t), q(this, t, arguments);
          }
          return (
            (function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function',
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(e, 'prototype', { writable: !1 }),
                t && ee(e, t);
            })(t, e),
            (n = t),
            (o = [
              {
                key: 'get',
                value: function (e) {
                  var t;
                  try {
                    var n,
                      o = (function (e, t) {
                        var n =
                          ('undefined' != typeof Symbol &&
                            e[Symbol.iterator]) ||
                          e['@@iterator'];
                        if (!n) {
                          if (
                            Array.isArray(e) ||
                            (n = oe(e)) ||
                            (t && e && 'number' == typeof e.length)
                          ) {
                            n && (e = n);
                            var o = 0,
                              r = function () {};
                            return {
                              s: r,
                              n: function () {
                                return o >= e.length
                                  ? { done: !0 }
                                  : { done: !1, value: e[o++] };
                              },
                              e: function (e) {
                                throw e;
                              },
                              f: r,
                            };
                          }
                          throw new TypeError(
                            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                          );
                        }
                        var i,
                          a = !0,
                          l = !1;
                        return {
                          s: function () {
                            n = n.call(e);
                          },
                          n: function () {
                            var e = n.next();
                            return (a = e.done), e;
                          },
                          e: function (e) {
                            (l = !0), (i = e);
                          },
                          f: function () {
                            try {
                              a || null == n.return || n.return();
                            } finally {
                              if (l) throw i;
                            }
                          },
                        };
                      })(this.entries());
                    try {
                      for (o.s(); !(n = o.n()).done; ) {
                        var r = K(n.value, 2),
                          i = r[0],
                          a = r[1],
                          l = ue(i);
                        if (!pe(i) && (0, L.Bo)(l, []).test(e)) {
                          t = a;
                          break;
                        }
                      }
                    } catch (e) {
                      o.e(e);
                    } finally {
                      o.f();
                    }
                  } catch (e) {
                    t = void 0;
                  }
                  return t;
                },
              },
            ]),
            o && X(n.prototype, o),
            r && X(n, r),
            Object.defineProperty(n, 'prototype', { writable: !1 }),
            n
          );
          var n, o, r;
        })(Q(Map)),
        be = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return e
            .map(function (e) {
              var t = e.children || e[de];
              if (ge(t) && be(t).length) return le({}, e);
              var n = le({}, e);
              return delete n[de], delete n.children, n;
            })
            .filter(function (e) {
              return e;
            });
        },
        ke = function (e, t, n, o) {
          var r = ye({
              data: ne(e).map(function (e) {
                return le({}, e);
              }),
              formatMessage: n,
              locale: t,
            }),
            i = o ? be(r) : xe(r),
            a = (function (e) {
              var t = new Ce(),
                n = function (e, o) {
                  e.forEach(function (e) {
                    var r = e.children || e[de] || [];
                    ge(r) && n(r, e);
                    var i = fe(e.path, o ? o.path : '/');
                    t.set(ue(i), e);
                  });
                };
              return n(e), t;
            })(r);
          return { breadcrumb: a, menuData: i };
        };
      function Ee(e) {
        return (
          (Ee =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          Ee(e)
        );
      }
      function Ze(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          t &&
            (o = o.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, o);
        }
        return n;
      }
      function Me(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ze(Object(n), !0).forEach(function (t) {
                je(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Ze(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
        }
        return e;
      }
      function je(e, t, n) {
        return (
          (t = (function (e) {
            var t = (function (e, t) {
              if ('object' != Ee(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var o = n.call(e, t || 'default');
                if ('object' != Ee(o)) return o;
                throw new TypeError(
                  '@@toPrimitive must return a primitive value.',
                );
              }
              return ('string' === t ? String : Number)(e);
            })(e, 'string');
            return 'symbol' == Ee(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var Se = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            t = {};
          return (
            e.forEach(function (e) {
              var n = Me({}, e);
              if (n && n.key) {
                !n.children && n[de] && ((n.children = n[de]), delete n[de]);
                var o = n.children || [];
                (t[ue(n.path || n.key || '/')] = Me({}, n)),
                  (t[n.key || n.path || '/'] = Me({}, n)),
                  o && (t = Me(Me({}, t), Se(o)));
              }
            }),
            t
          );
        },
        we = Se,
        Be = function (e, t, n, o) {
          var r = we(t),
            i = (function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : [],
                t = arguments.length > 1 ? arguments[1] : void 0,
                n = arguments.length > 2 ? arguments[2] : void 0;
              return e
                .filter(function (e) {
                  if ('/' === e && '/' === t) return !0;
                  if ('/' !== e && '/*' !== e && e && !pe(e)) {
                    var o = ue(e);
                    try {
                      if (n && (0, L.Bo)(''.concat(o)).test(t)) return !0;
                      if ((0, L.Bo)(''.concat(o), []).test(t)) return !0;
                      if ((0, L.Bo)(''.concat(o, '/(.*)')).test(t)) return !0;
                    } catch (e) {}
                  }
                  return !1;
                })
                .sort(function (e, n) {
                  return e === t
                    ? 10
                    : n === t
                    ? -10
                    : e.substr(1).split('/').length -
                      n.substr(1).split('/').length;
                });
            })(Object.keys(r), e || '/', o);
          return !i || i.length < 1
            ? []
            : (n || (i = [i[i.length - 1]]),
              i
                .map(function (e) {
                  var t = r[e] || { pro_layout_parentKeys: '', key: '' },
                    n = new Map(),
                    o = (t.pro_layout_parentKeys || [])
                      .map(function (e) {
                        return n.has(e) ? null : (n.set(e, !0), r[e]);
                      })
                      .filter(function (e) {
                        return e;
                      });
                  return t.key && o.push(t), o;
                })
                .flat(1));
        },
        Ie = n(12718),
        Fe = n(45253),
        Le = n(82187),
        Ae = n.n(Le),
        Re = n(91081),
        Ne = n(32378),
        Te = n(64911),
        He = n(27727),
        ze = n(49752);
      var De = n(44661),
        Pe = function (e, t) {
          var n = {};
          for (var o in e)
            Object.prototype.hasOwnProperty.call(e, o) &&
              t.indexOf(o) < 0 &&
              (n[o] = e[o]);
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (o = Object.getOwnPropertySymbols(e); r < o.length; r++)
              t.indexOf(o[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, o[r]) &&
                (n[o[r]] = e[o[r]]);
          }
          return n;
        };
      function Oe({ suffixCls: e, tagName: t, displayName: n }) {
        return (n) =>
          p.forwardRef((o, r) =>
            p.createElement(
              n,
              Object.assign({ ref: r, suffixCls: e, tagName: t }, o),
            ),
          );
      }
      const We = p.forwardRef((e, t) => {
          const { prefixCls: n, suffixCls: o, className: r, tagName: i } = e,
            a = Pe(e, ['prefixCls', 'suffixCls', 'className', 'tagName']),
            { getPrefixCls: l } = p.useContext(Ne.E_),
            c = l('layout', n),
            [s, d, u] = (0, De.ZP)(c),
            m = o ? `${c}-${o}` : c;
          return s(
            p.createElement(
              i,
              Object.assign({ className: Ae()(n || m, r, d, u), ref: t }, a),
            ),
          );
        }),
        $e = p.forwardRef((e, t) => {
          const { direction: n } = p.useContext(Ne.E_),
            [o, r] = p.useState([]),
            {
              prefixCls: i,
              className: a,
              rootClassName: l,
              children: c,
              hasSider: s,
              tagName: d,
              style: u,
            } = e,
            m = Pe(e, [
              'prefixCls',
              'className',
              'rootClassName',
              'children',
              'hasSider',
              'tagName',
              'style',
            ]),
            h = (0, Re.Z)(m, ['suffixCls']),
            { getPrefixCls: f, className: v, style: g } = (0, Ne.dj)('layout'),
            y = f('layout', i),
            x = (function (e, t, n) {
              return 'boolean' == typeof n
                ? n
                : !!e.length || (0, He.Z)(t).some((e) => e.type === ze.Z);
            })(o, c, s),
            [C, b, k] = (0, De.ZP)(y),
            E = Ae()(
              y,
              { [`${y}-has-sider`]: x, [`${y}-rtl`]: 'rtl' === n },
              v,
              a,
              l,
              b,
              k,
            ),
            Z = p.useMemo(
              () => ({
                siderHook: {
                  addSider: (e) => {
                    r((t) => [].concat((0, Fe.Z)(t), [e]));
                  },
                  removeSider: (e) => {
                    r((t) => t.filter((t) => t !== e));
                  },
                },
              }),
              [],
            );
          return C(
            p.createElement(
              Te.V.Provider,
              { value: Z },
              p.createElement(
                d,
                Object.assign(
                  {
                    ref: t,
                    className: E,
                    style: Object.assign(Object.assign({}, g), u),
                  },
                  h,
                ),
                c,
              ),
            ),
          );
        }),
        _e = Oe({ tagName: 'div', displayName: 'Layout' })($e),
        Ge = Oe({
          suffixCls: 'header',
          tagName: 'header',
          displayName: 'Header',
        })(We),
        Ve = Oe({
          suffixCls: 'footer',
          tagName: 'footer',
          displayName: 'Footer',
        })(We),
        Ke = Oe({
          suffixCls: 'content',
          tagName: 'main',
          displayName: 'Content',
        })(We);
      const Ue = _e;
      (Ue.Header = Ge),
        (Ue.Footer = Ve),
        (Ue.Content = Ke),
        (Ue.Sider = ze.Z),
        (Ue._InternalSiderContext = ze.D);
      var Xe = Ue,
        qe = n(69287),
        Qe = n(94685),
        Ye = n(63232),
        Je = n(72608),
        et = n(88429),
        tt = n(2003),
        nt = n(76995),
        ot = n(99563),
        rt = n(10470),
        it = n(33487),
        at = n(19466),
        lt = n(24967),
        ct = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z',
                },
              },
            ],
          },
          name: 'warning',
          theme: 'filled',
        },
        st = n(63812),
        dt = function (e, t) {
          return p.createElement(st.Z, (0, lt.Z)({}, e, { ref: t, icon: ct }));
        };
      var ut = p.forwardRef(dt);
      var pt = () =>
        p.createElement(
          'svg',
          { width: '252', height: '294' },
          p.createElement('title', null, 'No Found'),
          p.createElement(
            'g',
            { fill: 'none', fillRule: 'evenodd' },
            p.createElement('circle', {
              cx: '126.75',
              cy: '128.1',
              r: '126',
              fill: '#E4EBF7',
            }),
            p.createElement('circle', {
              cx: '31.55',
              cy: '130.8',
              r: '8.3',
              fill: '#FFF',
            }),
            p.createElement('path', {
              stroke: '#FFF',
              d: 'm37 134.3 10.5 6m.9 6.2-12.7 10.8',
              strokeWidth: '2',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M39.9 159.4a5.7 5.7 0 1 1-11.3-1.2 5.7 5.7 0 0 1 11.3 1.2m17.7-16.2a5.7 5.7 0 1 1-11.4-1.1 5.7 5.7 0 0 1 11.4 1.1M99 27h29.8a4.6 4.6 0 1 0 0-9.2H99a4.6 4.6 0 1 0 0 9.2m11.4 18.3h29.8a4.6 4.6 0 0 0 0-9.2h-29.8a4.6 4.6 0 1 0 0 9.2',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M112.8 26.9h15.8a4.6 4.6 0 1 0 0 9.1h-15.8a4.6 4.6 0 0 0 0-9.1m71.7 108.8a10 10 0 1 1-19.8-2 10 10 0 0 1 19.8 2',
            }),
            p.createElement('path', {
              stroke: '#FFF',
              d: 'm179.3 141.8 12.6 7.1m1.1 7.6-15.2 13',
              strokeWidth: '2',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M184.7 170a6.8 6.8 0 1 1-13.6-1.3 6.8 6.8 0 0 1 13.6 1.4m18.6-16.8a6.9 6.9 0 1 1-13.7-1.4 6.9 6.9 0 0 1 13.7 1.4',
            }),
            p.createElement('path', {
              stroke: '#FFF',
              d: 'M152 192.3a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.4 0zm73.3-76.2a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.5 0zm-9 35a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.5 0zM177 107.6a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm18.4-15.4a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.5 0zm6.8 88.5a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.5 0z',
              strokeWidth: '2',
            }),
            p.createElement('path', {
              stroke: '#FFF',
              d: 'm214.4 153.3-2 20.2-10.8 6m-28-4.7-6.3 9.8H156l-4.5 6.5m23.5-66v-15.7m46 7.8-13 8-15.2-8V94.4',
              strokeWidth: '2',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M166.6 66h-4a4.8 4.8 0 0 1-4.7-4.8 4.8 4.8 0 0 1 4.7-4.7h4a4.8 4.8 0 0 1 4.7 4.7 4.8 4.8 0 0 1-4.7 4.7',
            }),
            p.createElement('circle', {
              cx: '204.3',
              cy: '30',
              r: '29.5',
              fill: '#1677ff',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M206 38.4c.5.5.7 1.1.7 2s-.2 1.4-.7 1.9a3 3 0 0 1-2 .7c-.8 0-1.5-.3-2-.8s-.8-1.1-.8-1.9.3-1.4.8-2c.5-.4 1.2-.7 2-.7.7 0 1.4.3 2 .8m4.2-19.5c1.5 1.3 2.2 3 2.2 5.2a7.2 7.2 0 0 1-1.5 4.5l-3 2.7a5 5 0 0 0-1.3 1.7 5.2 5.2 0 0 0-.6 2.4v.5h-4v-.5c0-1.4.1-2.5.6-3.5s1.9-2.5 4.2-4.5l.4-.5a4 4 0 0 0 1-2.6c0-1.2-.4-2-1-2.8-.7-.6-1.6-1-2.9-1-1.5 0-2.6.5-3.3 1.5-.4.5-.6 1-.8 1.9a2 2 0 0 1-2 1.6 2 2 0 0 1-2-2.4c.4-1.6 1-2.8 2.1-3.8a8.5 8.5 0 0 1 6.3-2.3c2.3 0 4.2.6 5.6 2',
            }),
            p.createElement('path', {
              fill: '#FFB594',
              d: 'M52 76.1s21.8 5.4 27.3 16c5.6 10.7-6.3 9.2-15.7 5C52.8 92 39 85 52 76',
            }),
            p.createElement('path', {
              fill: '#FFC6A0',
              d: 'm90.5 67.5-.5 2.9c-.7.5-4.7-2.7-4.7-2.7l-1.7.8-1.3-5.7s6.8-4.6 9-5c2.4-.5 9.8 1 10.6 2.3 0 0 1.3.4-2.2.6-3.6.3-5 .5-6.8 3.2l-2.4 3.6',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M128 111.4a36.7 36.7 0 0 0-8.9-15.5c-3.5-3-9.3-2.2-11.3-4.2-1.3-1.2-3.2-1.2-3.2-1.2L87.7 87c-2.3-.4-2.1-.7-6-1.4-1.6-1.9-3-1.1-3-1.1l-7-1.4c-1-1.5-2.5-1-2.5-1l-2.4-.9C65 91.2 59 95 59 95c1.8 1.1 15.7 8.3 15.7 8.3l5.1 37.1s-3.3 5.7 1.4 9.1c0 0 19.9-3.7 34.9-.3 0 0 3-2.6 1-8.8.5-3 1.4-8.3 1.7-11.6.4.7 2 1.9 3.1 3.4 0 0 9.4-7.3 11-14a17 17 0 0 1-2.2-2.4c-.5-.8-.3-2-.7-2.8-.7-1-1.8-1.3-2-1.6',
            }),
            p.createElement('path', {
              fill: '#CBD1D1',
              d: 'M101 290s4.4 2 7.4 1c2.9-1 4.6.7 7.1 1.2 2.6.5 6.9 1.1 11.7-1.3 0-5.5-6.9-4-12-6.7-2.5-1.4-3.7-4.7-3.5-8.8h-9.5s-1.2 10.6-1 14.6',
            }),
            p.createElement('path', {
              fill: '#2B0849',
              d: 'M101 289.8s2.5 1.3 6.8.7c3-.5 3.7.5 7.4 1 3.8.6 10.8 0 11.9-.9.4 1.1-.4 2-.4 2s-1.5.7-4.8.9c-2 .1-5.8.3-7.6-.5-1.8-1.4-5.2-1.9-5.7-.2-4 1-7.4-.3-7.4-.3l-.1-2.7z',
            }),
            p.createElement('path', {
              fill: '#A4AABA',
              d: 'M108.3 276h3.1s0 6.7 4.6 8.6c-4.7.6-8.6-2.3-7.7-8.6',
            }),
            p.createElement('path', {
              fill: '#CBD1D1',
              d: 'M57.5 272.4s-2 7.4-4.4 12.3c-1.8 3.7-4.3 7.5 5.4 7.5 6.7 0 9-.5 7.4-6.6-1.5-6.1.3-13.2.3-13.2h-8.7z',
            }),
            p.createElement('path', {
              fill: '#2B0849',
              d: 'M51.5 289.8s2 1.2 6.6 1.2c6 0 8.3-1.7 8.3-1.7s.6 1.1-.7 2.2c-1 .8-3.6 1.6-7.4 1.5-4.1 0-5.8-.5-6.7-1.1-.8-.6-.7-1.6-.1-2.1',
            }),
            p.createElement('path', {
              fill: '#A4AABA',
              d: 'M58.4 274.3s0 1.5-.3 3c-.3 1.4-1 3-1.1 4 0 1.2 4.5 1.7 5.1.1.6-1.5 1.3-6.4 2-7.2.6-.9-5-2.2-5.7.1',
            }),
            p.createElement('path', {
              fill: '#7BB2F9',
              d: 'm99.7 278.5 13.3.1s1.3-54.5 1.9-64.4c.5-9.9 3.8-43.4 1-63.1l-12.6-.7-22.8.8-1.2 10c0 .5-.7.8-.7 1.4-.1.5.4 1.3.3 2-2.4 14-6.4 33-8.8 46.6 0 .7-1.2 1-1.4 2.7 0 .3.2 1.5 0 1.8-6.8 18.7-10.9 47.8-14.2 61.9h14.6s2.2-8.6 4-17c2.9-12.9 23.2-85 23.2-85l3-.5 1 46.3s-.2 1.2.4 2c.5.8-.6 1.1-.4 2.3l.4 1.8-1 11.8c-.4 4.8 0 39.2 0 39.2',
            }),
            p.createElement('path', {
              stroke: '#648BD8',
              d: 'M76 221.6c1.2.1 4.1-2 7-5m23.4 8.5s2.7-1 6-3.8',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#648BD8',
              d: 'M107.3 222.1s2.7-1.1 6-3.9',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }),
            p.createElement('path', {
              stroke: '#648BD8',
              d: 'M74.7 224.8s2.7-.6 6.5-3.4m4.8-69.8c-.2 3.1.3 8.6-4.3 9.2m22-11s0 14-1.4 15.1a15 15 0 0 1-3 2m.5-16.5s0 13-1.2 24.4m-5 1.1s7.3-1.7 9.5-1.7M74.3 206a212 212 0 0 1-1 4.5s-1.4 1.9-1 3.8c.5 2-1 2-5 15.4A353 353 0 0 0 61 257l-.2 1.2m14.9-60.5a321 321 0 0 1-.9 4.8m7.8-50.4-1.2 10.5s-1.1.1-.5 2.2c.1 1.4-2.7 15.8-5.2 30.5m-19.6 79h13.3',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              fill: '#192064',
              d: 'M116.2 148.2s-17-3-35.9.2c.2 2.5 0 4.2 0 4.2s14.7-2.8 35.7-.3c.3-2.4.2-4 .2-4',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M106.3 151.2v-5a.8.8 0 0 0-.8-.8h-7.8a.8.8 0 0 0-.8.8v5a.8.8 0 0 0 .8.8h7.8a.8.8 0 0 0 .8-.8',
            }),
            p.createElement('path', {
              fill: '#192064',
              d: 'M105.2 150.2v-3a.6.6 0 0 0-.6-.7 94.3 94.3 0 0 0-5.9 0 .7.7 0 0 0-.6.6v3.1a.6.6 0 0 0 .6.7 121.1 121.1 0 0 1 5.8 0c.4 0 .7-.3.7-.7',
            }),
            p.createElement('path', {
              stroke: '#648BD8',
              d: 'M100.3 275.4h12.3m-11.2-4.9.1 6.5m0-12.5a915.8 915.8 0 0 0 0 4.4m-.5-94 .9 44.7s.7 1.6-.2 2.7c-1 1.1 2.4.7.9 2.2-1.6 1.6.9 1.2 0 3.4-.6 1.5-1 21.1-1.1 35.2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              fill: '#FFC6A0',
              d: 'M46.9 83.4s-.5 6 7.2 5.6c11.2-.7 9.2-9.4 31.5-21.7-.7-2.7-2.4-4.7-2.4-4.7s-11 3-22.6 8c-6.8 3-13.4 6.4-13.7 12.8m57.6 7.7.9-5.4-8.9-11.4-5 5.3-1.8 7.9a.3.3 0 0 0 .1.3c1 .8 6.5 5 14.4 3.5a.3.3 0 0 0 .3-.2',
            }),
            p.createElement('path', {
              fill: '#FFC6A0',
              d: 'M94 79.4s-4.6-2.9-2.5-6.9c1.6-3 4.5 1.2 4.5 1.2s.5-3.7 3.1-3.7c.6-1 1.6-4.1 1.6-4.1l13.5 3c0 5.3-2.3 19.5-7.8 20-8.9.6-12.5-9.5-12.5-9.5',
            }),
            p.createElement('path', {
              fill: '#520038',
              d: 'M113.9 73.4c2.6-2 3.4-9.7 3.4-9.7s-2.4-.5-6.6-2c-4.7-2.1-12.8-4.8-17.5 1-9.6 3.2-2 19.8-2 19.8l2.7-3s-4-3.3-2-6.3c2-3.5 3.8 1 3.8 1s.7-2.3 3.6-3.3c.4-.7 1-2.6 1.4-3.8a1 1 0 0 1 1.3-.7l11.4 2.6c.5.2.8.7.8 1.2l-.3 3.2z',
            }),
            p.createElement('path', {
              fill: '#552950',
              d: 'M105 76c-.1.7-.6 1.1-1 1-.6 0-.9-.6-.8-1.2.1-.6.6-1 1-1 .6 0 .9.7.8 1.3m7.1 1.6c0 .6-.5 1-1 1-.5-.1-.8-.7-.7-1.3 0-.6.5-1 1-1 .5.1.8.7.7 1.3',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'm110.1 74.8-.9 1.7-.3 4.3h-2.2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#5C2552',
              d: 'M110.8 74.5s1.8-.7 2.6.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'M92.4 74.3s.5-1.1 1.1-.7c.6.4 1.3 1.4.6 2-.8.5.1 1.6.1 1.6',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#5C2552',
              d: 'M103.3 73s1.8 1 4.1.9',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'M103.7 81.8s2.2 1.2 4.4 1.2m-3.5 1.3s1 .4 1.6.3m-11.5-3.4s2.3 7.4 10.4 7.6',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#E4EBF7',
              d: 'M81.5 89.4s.4 5.6-5 12.8M69 82.7s-.7 9.2-8.2 14.2m68.6 26s-5.3 7.4-9.4 10.7m-.7-26.3s.5 4.4-2.1 32',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              fill: '#F2D7AD',
              d: 'M150 151.2h-49.8a1 1 0 0 1-1-1v-31.7c0-.5.4-1 1-1H150c.6 0 1 .5 1 1v31.7a1 1 0 0 1-1 1',
            }),
            p.createElement('path', {
              fill: '#F4D19D',
              d: 'M150.3 151.2h-19.9v-33.7h20.8v32.8a1 1 0 0 1-1 1',
            }),
            p.createElement('path', {
              fill: '#F2D7AD',
              d: 'M123.6 127.9H92.9a.5.5 0 0 1-.4-.8l6.4-9.1c.2-.3.5-.5.8-.5h31.1l-7.2 10.4z',
            }),
            p.createElement('path', {
              fill: '#CC9B6E',
              d: 'M123.7 128.4H99.2v-.5h24.2l7.2-10.2.4.3z',
            }),
            p.createElement('path', {
              fill: '#F4D19D',
              d: 'M158.3 127.9h-18.7a2 2 0 0 1-1.6-.8l-7.2-9.6h20c.5 0 1 .3 1.2.6l6.7 9a.5.5 0 0 1-.4.8',
            }),
            p.createElement('path', {
              fill: '#CC9B6E',
              d: 'M157.8 128.5h-19.3l-7.9-10.5.4-.3 7.7 10.3h19.1zm-27.2 22.2v-8.2h.4v8.2zm-.1-10.9v-21.4h.4l.1 21.4zm-18.6 1.1-.5-.1 1.5-5.2.5.2zm-3.5.2-2.6-3 2.6-3.4.4.3-2.4 3.1 2.4 2.6zm8.2 0-.4-.4 2.4-2.6-2.4-3 .4-.4 2.7 3.4z',
            }),
            p.createElement('path', {
              fill: '#FFC6A0',
              d: 'm154.3 131.9-3.1-2v3.5l-1 .1a85 85 0 0 1-4.8.3c-1.9 0-2.7 2.2 2.2 2.6l-2.6-.6s-2.2 1.3.5 2.3c0 0-1.6 1.2.6 2.6-.6 3.5 5.2 4 7 3.6a6.1 6.1 0 0 0 4.6-5.2 8 8 0 0 0-3.4-7.2',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'M153.7 133.6s-6.5.4-8.4.3c-1.8 0-1.9 2.2 2.4 2.3 3.7.2 5.4 0 5.4 0',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'M145.2 135.9c-1.9 1.3.5 2.3.5 2.3s3.5 1 6.8.6m-.6 2.9s-6.3.1-6.7-2.1c-.3-1.4.4-1.4.4-1.4m.5 2.7s-1 3.1 5.5 3.5m-.4-14.5v3.5M52.8 89.3a18 18 0 0 0 13.6-7.8',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              fill: '#5BA02E',
              d: 'M168.6 248.3a6.6 6.6 0 0 1-6.7-6.6v-66.5a6.6 6.6 0 1 1 13.3 0v66.5a6.6 6.6 0 0 1-6.6 6.6',
            }),
            p.createElement('path', {
              fill: '#92C110',
              d: 'M176.5 247.7a6.6 6.6 0 0 1-6.6-6.7v-33.2a6.6 6.6 0 1 1 13.3 0V241a6.6 6.6 0 0 1-6.7 6.7',
            }),
            p.createElement('path', {
              fill: '#F2D7AD',
              d: 'M186.4 293.6H159a3.2 3.2 0 0 1-3.2-3.2v-46.1a3.2 3.2 0 0 1 3.2-3.2h27.5a3.2 3.2 0 0 1 3.2 3.2v46.1a3.2 3.2 0 0 1-3.2 3.2',
            }),
            p.createElement('path', {
              stroke: '#E4EBF7',
              d: 'M89 89.5s7.8 5.4 16.6 2.8',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
          ),
        );
      var mt = () =>
          p.createElement(
            'svg',
            { width: '254', height: '294' },
            p.createElement('title', null, 'Server Error'),
            p.createElement(
              'g',
              { fill: 'none', fillRule: 'evenodd' },
              p.createElement('path', {
                fill: '#E4EBF7',
                d: 'M0 128.1v-2C0 56.5 56.3.2 125.7.2h2.1C197.2.3 253.5 56.6 253.5 126v2.1c0 69.5-56.3 125.7-125.7 125.7h-2.1A125.7 125.7 0 0 1 0 128.1',
              }),
              p.createElement('path', {
                fill: '#FFF',
                d: 'M40 132.1a8.3 8.3 0 1 1-16.6-1.7 8.3 8.3 0 0 1 16.6 1.7',
              }),
              p.createElement('path', {
                stroke: '#FFF',
                d: 'm37.2 135.6 10.5 6m1 6.3-12.8 10.8',
                strokeWidth: '2',
              }),
              p.createElement('path', {
                fill: '#FFF',
                d: 'M40.1 160.8a5.7 5.7 0 1 1-11.3-1.1 5.7 5.7 0 0 1 11.3 1.1M58 144.6a5.7 5.7 0 1 1-11.4-1.2 5.7 5.7 0 0 1 11.4 1.2M99.7 27.4h30a4.6 4.6 0 1 0 0-9.2h-30a4.6 4.6 0 0 0 0 9.2M111 46h30a4.6 4.6 0 1 0 0-9.3h-30a4.6 4.6 0 1 0 0 9.3m2.5-18.6h16a4.6 4.6 0 1 0 0 9.3h-16a4.6 4.6 0 0 0 0-9.3m36.7 42.7h-4a4.8 4.8 0 0 1-4.8-4.8 4.8 4.8 0 0 1 4.8-4.8h4a4.8 4.8 0 0 1 4.7 4.8 4.8 4.8 0 0 1-4.7 4.8',
              }),
              p.createElement('circle', {
                cx: '201.35',
                cy: '30.2',
                r: '29.7',
                fill: '#FF603B',
              }),
              p.createElement('path', {
                fill: '#FFF',
                d: 'm203.6 19.4-.7 15a1.5 1.5 0 0 1-3 0l-.7-15a2.2 2.2 0 1 1 4.4 0m-.3 19.4c.5.5.8 1.1.8 1.9s-.3 1.4-.8 1.9a3 3 0 0 1-2 .7 2.5 2.5 0 0 1-1.8-.7c-.6-.6-.8-1.2-.8-2 0-.7.2-1.3.8-1.8.5-.5 1.1-.7 1.8-.7.8 0 1.5.2 2 .7',
              }),
              p.createElement('path', {
                fill: '#FFB594',
                d: 'M119.3 133.3c4.4-.6 3.6-1.2 4-4.8.8-5.2-3-17-8.2-25.1-1-10.7-12.6-11.3-12.6-11.3s4.3 5 4.2 16.2c1.4 5.3.8 14.5.8 14.5s5.3 11.4 11.8 10.5',
              }),
              p.createElement('path', {
                fill: '#FFF',
                d: 'M101 91.6s1.4-.6 3.2.6c8 1.4 10.3 6.7 11.3 11.4 1.8 1.2 1.8 2.3 1.8 3.5l1.5 3s-7.2 1.7-11 6.7c-1.3-6.4-6.9-25.2-6.9-25.2',
              }),
              p.createElement('path', {
                fill: '#FFB594',
                d: 'm94 90.5 1-5.8-9.2-11.9-5.2 5.6-2.6 9.9s8.4 5 16 2.2',
              }),
              p.createElement('path', {
                fill: '#FFC6A0',
                d: 'M83 78.2s-4.6-2.9-2.5-6.9c1.6-3 4.5 1.2 4.5 1.2s.5-3.7 3.2-3.7c.5-1 1.5-4.2 1.5-4.2l13.6 3.2c0 5.2-2.3 19.5-7.9 20-8.9.6-12.5-9.6-12.5-9.6',
              }),
              p.createElement('path', {
                fill: '#520038',
                d: 'M103 72.2c2.6-2 3.5-9.7 3.5-9.7s-2.5-.5-6.7-2c-4.7-2.2-12.9-4.9-17.6.9-9.5 4.4-2 20-2 20l2.7-3.1s-4-3.3-2.1-6.3c2.2-3.5 4 1 4 1s.6-2.3 3.5-3.3c.4-.7 1-2.7 1.5-3.8A1 1 0 0 1 91 65l11.5 2.7c.5.1.8.6.8 1.2l-.3 3.2z',
              }),
              p.createElement('path', {
                fill: '#552950',
                d: 'M101.2 76.5c0 .6-.6 1-1 1-.5-.1-.9-.7-.8-1.3.1-.6.6-1 1.1-1 .5.1.8.7.7 1.3m-7-1.4c0 .6-.5 1-1 1-.5-.1-.8-.7-.7-1.3 0-.6.6-1 1-1 .5.1.9.7.8 1.3',
              }),
              p.createElement('path', {
                stroke: '#DB836E',
                d: 'm99.2 73.6-.9 1.7-.3 4.3h-2.2',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                stroke: '#5C2552',
                d: 'M100 73.3s1.7-.7 2.4.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                stroke: '#DB836E',
                d: 'M81.4 73s.4-1 1-.6c.7.4 1.4 1.4.6 2s.2 1.6.2 1.6',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                stroke: '#5C2552',
                d: 'M92.3 71.7s1.9 1.1 4.2 1',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                stroke: '#DB836E',
                d: 'M92.7 80.6s2.3 1.2 4.4 1.2m-3.4 1.4s1 .4 1.5.3M83.7 80s1.8 6.6 9.2 8',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                stroke: '#E4EBF7',
                d: 'M95.5 91.7s-1 2.8-8.2 2c-7.3-.6-10.3-5-10.3-5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                fill: '#FFF',
                d: 'M78.1 87.5s6.6 5 16.5 2.5c0 0 9.6 1 11.5 5.3 5.4 11.8.6 36.8 0 40 3.5 4-.4 8.4-.4 8.4-15.7-3.5-35.8-.6-35.8-.6-4.9-3.5-1.3-9-1.3-9l-6.2-23.8c-2.5-15.2.8-19.8 3.5-20.7 3-1 8-1.3 8-1.3.6 0 1.1 0 1.4-.2 2.4-1.3 2.8-.6 2.8-.6',
              }),
              p.createElement('path', {
                fill: '#FFC6A0',
                d: 'M65.8 89.8s-6.8.5-7.6 8.2c-.4 8.8 3 11 3 11s6.1 22 16.9 22.9c8.4-2.2 4.7-6.7 4.6-11.4-.2-11.3-7-17-7-17s-4.3-13.7-9.9-13.7',
              }),
              p.createElement('path', {
                fill: '#FFC6A0',
                d: 'M71.7 124.2s.9 11.3 9.8 6.5c4.8-2.5 7.6-13.8 9.8-22.6A201 201 0 0 0 94 96l-5-1.7s-2.4 5.6-7.7 12.3c-4.4 5.5-9.2 11.1-9.5 17.7',
              }),
              p.createElement('path', {
                stroke: '#E4EBF7',
                d: 'M108.5 105.2s1.7 2.7-2.4 30.5c2.4 2.2 1 6-.2 7.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                fill: '#FFC6A0',
                d: 'M123.3 131.5s-.5 2.8-11.8 2c-15.2-1-25.3-3.2-25.3-3.2l.9-5.8s.7.2 9.7-.1c11.9-.4 18.7-6 25-1 4 3.2 1.5 8.1 1.5 8.1',
              }),
              p.createElement('path', {
                fill: '#FFF',
                d: 'M70.2 91s-5.6-4.8-11 2.7c-3.3 7.2.5 15.2 2.6 19.5-.3 3.8 2.4 4.3 2.4 4.3s0 1 1.5 2.7c4-7 6.7-9.1 13.7-12.5-.3-.7-1.9-3.3-1.8-3.8.2-1.7-1.3-2.6-1.3-2.6s-.3-.2-1.2-2.8c-.8-2.3-2-5.1-4.9-7.5',
              }),
              p.createElement('path', {
                fill: '#CBD1D1',
                d: 'M90.2 288s4.9 2.3 8.3 1.2c3.2-1 5.2.7 8 1.3a20 20 0 0 0 13.3-1.4c-.2-6.2-7.8-4.5-13.6-7.6-2.9-1.6-4.2-5.3-4-10H91.5s-1.5 12-1.3 16.5',
              }),
              p.createElement('path', {
                fill: '#2B0849',
                d: 'M90.2 287.8s2.8 1.5 7.6.8c3.5-.5 3.3.6 7.5 1.3 4.2.6 13-.2 14.3-1.2.5 1.3-.4 2.4-.4 2.4s-1.7.6-5.4.9c-2.3.1-8.1.3-10.2-.6-2-1.6-4.9-1.5-6-.3-4.5 1.1-7.2-.3-7.2-.3l-.2-3z',
              }),
              p.createElement('path', {
                fill: '#A4AABA',
                d: 'M98.4 272.3h3.5s0 7.5 5.2 9.6c-5.3.7-9.7-2.6-8.7-9.6',
              }),
              p.createElement('path', {
                fill: '#CBD1D1',
                d: 'M44.4 272s-2.2 7.8-4.7 13c-1.9 3.8-4.4 7.8 5.8 7.8 7 0 9.3-.5 7.7-7-1.6-6.3.3-13.8.3-13.8h-9z',
              }),
              p.createElement('path', {
                fill: '#2B0849',
                d: 'M38 290.3s2.3 1.2 7 1.2c6.4 0 8.7-1.7 8.7-1.7s.6 1.1-.7 2.2c-1 1-3.8 1.7-7.7 1.7-4.4 0-6.1-.6-7-1.3-1-.5-.8-1.6-.2-2.1',
              }),
              p.createElement('path', {
                fill: '#A4AABA',
                d: 'M45.3 274s0 1.6-.3 3.1-1.1 3.3-1.2 4.4c0 1.2 4.8 1.6 5.4 0 .7-1.6 1.4-6.8 2-7.6.7-.9-5.1-2.2-5.9.1',
              }),
              p.createElement('path', {
                fill: '#7BB2F9',
                d: 'M89.5 277.6h13.9s1.3-56.6 1.9-66.8c.6-10.3 4-45.1 1-65.6l-13-.7-23.7.8-1.3 10.4c0 .5-.7.9-.8 1.4 0 .6.5 1.4.4 2L59.6 206c-.1.7-1.3 1-1.5 2.8 0 .3.2 1.6.1 1.8-7.1 19.5-12.2 52.6-15.6 67.2h15.1L62 259c3-13.3 24-88.3 24-88.3l3.2-1-.2 48.6s-.2 1.3.4 2.1c.5.8-.6 1.2-.4 2.4l.4 1.8-1 12.4c-.4 4.9 1.2 40.7 1.2 40.7',
              }),
              p.createElement('path', {
                stroke: '#648BD8',
                d: 'M64.6 218.9c1.2 0 4.2-2.1 7.2-5.1m24.2 8.7s3-1.1 6.4-4',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                stroke: '#648BD8',
                d: 'M97 219.4s2.9-1.2 6.3-4',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1',
              }),
              p.createElement('path', {
                stroke: '#648BD8',
                d: 'M63.2 222.1s2.7-.6 6.7-3.5m5-72.4c-.3 3.2.3 8.8-4.5 9.4m22.8-11.3s.1 14.6-1.4 15.7c-2.3 1.7-3 2-3 2m.4-17s.3 13-1 25m-4.7.7s6.8-1 9.1-1M46 270l-.9 4.6m1.8-11.3-.8 4.1m16.6-64.9c-.3 1.6 0 2-.4 3.4 0 0-2.8 2-2.3 4s-.3 3.4-4.5 17.2c-1.8 5.8-4.3 19-6.2 28.3l-1.1 5.8m16-67-1 4.9m8.1-52.3-1.2 10.9s-1.2.1-.5 2.3c0 1.4-2.8 16.4-5.4 31.6m-20 82.1h13.9',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                fill: '#192064',
                d: 'M106.2 142.1c-3-.5-18.8-2.7-36.2.2a.6.6 0 0 0-.6.7v3a.6.6 0 0 0 .8.6c3.3-.5 17-2.4 35.6-.3.4 0 .7-.2.7-.5.2-1.4.2-2.5.2-3a.6.6 0 0 0-.5-.7',
              }),
              p.createElement('path', {
                fill: '#FFF',
                d: 'M96.4 145.3v-5.1a.8.8 0 0 0-.8-.9 114.1 114.1 0 0 0-8.1 0 .8.8 0 0 0-.9.8v5.1c0 .5.4.9.9.9h8a.8.8 0 0 0 .9-.8',
              }),
              p.createElement('path', {
                fill: '#192064',
                d: 'M95.2 144.3v-3.2a.7.7 0 0 0-.6-.7h-6.1a.7.7 0 0 0-.6.7v3.2c0 .4.3.7.6.7h6c.4 0 .7-.3.7-.7',
              }),
              p.createElement('path', {
                stroke: '#648BD8',
                d: 'M90.1 273.5h12.8m-11.7-3.7v6.3m-.3-12.6v4.5m-.5-97.6 1 46.4s.7 1.6-.3 2.8c-.9 1.1 2.6.7 1 2.3-1.7 1.6.9 1.2 0 3.5-.6 1.6-1 22-1.2 36.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                stroke: '#E4EBF7',
                d: 'M73.7 98.7 76 103s2 .8 1.8 2.7l.8 2.2m-14.3 8.7c.2-1 2.2-7.1 12.6-10.5m.7-16s7.7 6 16.5 2.7',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                fill: '#FFC6A0',
                d: 'M92 87s5.5-.9 7.5-4.6c1.3-.3.8 2.2-.3 3.7l-1 1.5s.2.3.2.9c0 .6-.2.6-.3 1v1l-.4 1c-.1.2 0 .6-.2.9-.2.4-1.6 1.8-2.6 2.8-3.8 3.6-5 1.7-6-.4-1-1.8-.7-5.1-.9-6.9-.3-2.9-2.6-3-2-4.4.4-.7 3 .7 3.4 1.8.7 2 2.9 1.8 2.6 1.7',
              }),
              p.createElement('path', {
                stroke: '#DB836E',
                d: 'M99.8 82.4c-.5.1-.3.3-1 1.3-.6 1-4.8 2.9-6.4 3.2-2.5.5-2.2-1.6-4.2-2.9-1.7-1-3.6-.6-1.4 1.4 1 1 1 1.1 1.4 3.2.3 1.5-.7 3.7.7 5.6',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '.8',
              }),
              p.createElement('path', {
                stroke: '#E59788',
                d: 'M79.5 108.7c-2 2.9-4.2 6.1-5.5 8.7',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '.8',
              }),
              p.createElement('path', {
                fill: '#FFC6A0',
                d: 'M87.7 124.8s-2-2-5.1-2.8c-3-.7-3.6-.1-5.5.1-2 .3-4-.9-3.7.7.3 1.7 5 1 5.2 2.1.2 1.1-6.3 2.8-8.3 2.2-.8.8.5 1.9 2 2.2.3 1.5 2.3 1.5 2.3 1.5s.7 1 2.6 1.1c2.5 1.3 9-.7 11-1.5 2-.9-.5-5.6-.5-5.6',
              }),
              p.createElement('path', {
                stroke: '#E59788',
                d: 'M73.4 122.8s.7 1.2 3.2 1.4c2.3.3 2.6.6 2.6.6s-2.6 3-9.1 2.3m2.3 2.2s3.8 0 5-.7m-2.4 2.2s2 0 3.3-.6m-1 1.7s1.7 0 2.8-.5m-6.8-9s-.6-1.1 1.3-.5c1.7.5 2.8 0 5.1.1 1.4.1 3-.2 4 .2 1.6.8 3.6 2.2 3.6 2.2s10.6 1.2 19-1.1M79 108s-8.4 2.8-13.2 12.1',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '.8',
              }),
              p.createElement('path', {
                stroke: '#E4EBF7',
                d: 'M109.3 112.5s3.4-3.6 7.6-4.6',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                stroke: '#E59788',
                d: 'M107.4 123s9.7-2.7 11.4-.9',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '.8',
              }),
              p.createElement('path', {
                stroke: '#BFCDDD',
                d: 'm194.6 83.7 4-4M187.2 91l3.7-3.6m.9-3-4.5-4.7m11.2 11.5-4.2-4.3m-65 76.3 3.7-3.7M122.3 170l3.5-3.5m.8-2.9-4.3-4.2M133 170l-4-4',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '2',
              }),
              p.createElement('path', {
                fill: '#A3B4C6',
                d: 'M190.2 211.8h-1.6a4 4 0 0 1-4-4v-32.1a4 4 0 0 1 4-4h1.6a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4',
              }),
              p.createElement('path', {
                fill: '#A3B4C6',
                d: 'M237.8 213a4.8 4.8 0 0 1-4.8 4.8h-86.6a4.8 4.8 0 0 1 0-9.6H233a4.8 4.8 0 0 1 4.8 4.8',
              }),
              p.createElement('path', {
                fill: '#A3B4C6',
                d: 'M154.1 190.1h70.5v-84.6h-70.5z',
              }),
              p.createElement('path', {
                fill: '#BFCDDD',
                d: 'M225 190.1h-71.2a3.2 3.2 0 0 1-3.2-3.2v-19a3.2 3.2 0 0 1 3.2-3.2h71.1a3.2 3.2 0 0 1 3.2 3.2v19a3.2 3.2 0 0 1-3.2 3.2m0-59.3h-71.1a3.2 3.2 0 0 1-3.2-3.2v-19a3.2 3.2 0 0 1 3.2-3.2h71.1a3.2 3.2 0 0 1 3.2 3.3v19a3.2 3.2 0 0 1-3.2 3.1',
              }),
              p.createElement('path', {
                fill: '#FFF',
                d: 'M159.6 120.5a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m48.1 0h-22.4a.8.8 0 0 1-.8-.8v-3.2c0-.4.3-.8.8-.8h22.4c.5 0 .8.4.8.8v3.2c0 .5-.3.8-.8.8',
              }),
              p.createElement('path', {
                fill: '#BFCDDD',
                d: 'M225 160.5h-71.2a3.2 3.2 0 0 1-3.2-3.2v-19a3.2 3.2 0 0 1 3.2-3.2h71.1a3.2 3.2 0 0 1 3.2 3.2v19a3.2 3.2 0 0 1-3.2 3.2',
              }),
              p.createElement('path', {
                stroke: '#7C90A5',
                d: 'M173.5 130.8h49.3m-57.8 0h6m-15 0h6.7m11.1 29.8h49.3m-57.7 0h6m-15.8 0h6.7',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                fill: '#FFF',
                d: 'M159.6 151a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m48.1 0h-22.4a.8.8 0 0 1-.8-.8V147c0-.4.3-.8.8-.8h22.4c.5 0 .8.4.8.8v3.2c0 .5-.3.8-.8.8m-63 29a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.5 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m48.1 0h-22.4a.8.8 0 0 1-.8-.8V176c0-.5.3-.8.8-.8h22.4c.5 0 .8.3.8.8v3.2c0 .4-.3.8-.8.8',
              }),
              p.createElement('path', {
                fill: '#BFCDDD',
                d: 'M203 221.1h-27.3a2.4 2.4 0 0 1-2.4-2.4v-11.4a2.4 2.4 0 0 1 2.4-2.5H203a2.4 2.4 0 0 1 2.4 2.5v11.4a2.4 2.4 0 0 1-2.4 2.4',
              }),
              p.createElement('path', {
                stroke: '#A3B4C6',
                d: 'M177.3 207.2v11.5m23.8-11.5v11.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '1.1',
              }),
              p.createElement('path', {
                fill: '#5BA02E',
                d: 'M162.9 267.9a9.4 9.4 0 0 1-9.4-9.4v-14.8a9.4 9.4 0 0 1 18.8 0v14.8a9.4 9.4 0 0 1-9.4 9.4',
              }),
              p.createElement('path', {
                fill: '#92C110',
                d: 'M171.2 267.8a9.4 9.4 0 0 1-9.4-9.4V255a9.4 9.4 0 0 1 18.8 0v3.4a9.4 9.4 0 0 1-9.4 9.4',
              }),
              p.createElement('path', {
                fill: '#F2D7AD',
                d: 'M181.3 293.7h-27.7a3.2 3.2 0 0 1-3.2-3.2v-20.7a3.2 3.2 0 0 1 3.2-3.2h27.7a3.2 3.2 0 0 1 3.2 3.2v20.7a3.2 3.2 0 0 1-3.2 3.2',
              }),
            ),
          ),
        ht = n(54359),
        ft = n(79673),
        vt = n(84458);
      const gt = (e) => {
          const {
            componentCls: t,
            lineHeightHeading3: n,
            iconCls: o,
            padding: r,
            paddingXL: i,
            paddingXS: a,
            paddingLG: l,
            marginXS: c,
            lineHeight: s,
          } = e;
          return {
            [t]: {
              padding: `${(0, ht.bf)(e.calc(l).mul(2).equal())} ${(0, ht.bf)(
                i,
              )}`,
              '&-rtl': { direction: 'rtl' },
            },
            [`${t} ${t}-image`]: {
              width: e.imageWidth,
              height: e.imageHeight,
              margin: 'auto',
            },
            [`${t} ${t}-icon`]: {
              marginBottom: l,
              textAlign: 'center',
              [`& > ${o}`]: { fontSize: e.iconFontSize },
            },
            [`${t} ${t}-title`]: {
              color: e.colorTextHeading,
              fontSize: e.titleFontSize,
              lineHeight: n,
              marginBlock: c,
              textAlign: 'center',
            },
            [`${t} ${t}-subtitle`]: {
              color: e.colorTextDescription,
              fontSize: e.subtitleFontSize,
              lineHeight: s,
              textAlign: 'center',
            },
            [`${t} ${t}-content`]: {
              marginTop: l,
              padding: `${(0, ht.bf)(l)} ${(0, ht.bf)(
                e.calc(r).mul(2.5).equal(),
              )}`,
              backgroundColor: e.colorFillAlter,
            },
            [`${t} ${t}-extra`]: {
              margin: e.extraMargin,
              textAlign: 'center',
              '& > *': {
                marginInlineEnd: a,
                '&:last-child': { marginInlineEnd: 0 },
              },
            },
          };
        },
        yt = (e) => {
          const { componentCls: t, iconCls: n } = e;
          return {
            [`${t}-success ${t}-icon > ${n}`]: {
              color: e.resultSuccessIconColor,
            },
            [`${t}-error ${t}-icon > ${n}`]: { color: e.resultErrorIconColor },
            [`${t}-info ${t}-icon > ${n}`]: { color: e.resultInfoIconColor },
            [`${t}-warning ${t}-icon > ${n}`]: {
              color: e.resultWarningIconColor,
            },
          };
        },
        xt = (e) => ((e) => [gt(e), yt(e)])(e);
      var Ct = (0, ft.I$)(
        'Result',
        (e) => {
          const t = e.colorInfo,
            n = e.colorError,
            o = e.colorSuccess,
            r = e.colorWarning,
            i = (0, vt.IX)(e, {
              resultInfoIconColor: t,
              resultErrorIconColor: n,
              resultSuccessIconColor: o,
              resultWarningIconColor: r,
              imageWidth: 250,
              imageHeight: 295,
            });
          return [xt(i)];
        },
        (e) => ({
          titleFontSize: e.fontSizeHeading3,
          subtitleFontSize: e.fontSize,
          iconFontSize: 3 * e.fontSizeHeading3,
          extraMargin: `${e.paddingLG}px 0 0 0`,
        }),
      );
      var bt = () =>
        p.createElement(
          'svg',
          { width: '251', height: '294' },
          p.createElement('title', null, 'Unauthorized'),
          p.createElement(
            'g',
            { fill: 'none', fillRule: 'evenodd' },
            p.createElement('path', {
              fill: '#E4EBF7',
              d: 'M0 129v-2C0 58.3 55.6 2.7 124.2 2.7h2c68.6 0 124.2 55.6 124.2 124.1v2.1c0 68.6-55.6 124.2-124.1 124.2h-2.1A124.2 124.2 0 0 1 0 129',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M41.4 133a8.2 8.2 0 1 1-16.4-1.7 8.2 8.2 0 0 1 16.4 1.6',
            }),
            p.createElement('path', {
              stroke: '#FFF',
              d: 'm38.7 136.4 10.4 5.9m.9 6.2-12.6 10.7',
              strokeWidth: '2',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M41.5 161.3a5.6 5.6 0 1 1-11.2-1.2 5.6 5.6 0 0 1 11.2 1.2m17.7-16a5.7 5.7 0 1 1-11.3-1.2 5.7 5.7 0 0 1 11.3 1.2m41.2-115.8H130a4.6 4.6 0 1 0 0-9.1h-29.6a4.6 4.6 0 0 0 0 9.1m11.3 18.3h29.7a4.6 4.6 0 1 0 0-9.2h-29.7a4.6 4.6 0 1 0 0 9.2',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M114 29.5h15.8a4.6 4.6 0 1 0 0 9.1H114a4.6 4.6 0 0 0 0-9.1m71.3 108.2a10 10 0 1 1-19.8-2 10 10 0 0 1 19.8 2',
            }),
            p.createElement('path', {
              stroke: '#FFF',
              d: 'm180.2 143.8 12.5 7.1m1.1 7.5-15.1 13',
              strokeWidth: '2',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M185.6 172a6.8 6.8 0 1 1-13.6-1.4 6.8 6.8 0 0 1 13.5 1.3m18.6-16.6a6.8 6.8 0 1 1-13.6-1.4 6.8 6.8 0 0 1 13.6 1.4',
            }),
            p.createElement('path', {
              stroke: '#FFF',
              d: 'M153 194a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm73-75.8a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.4 0zm-9 34.9a2.2 2.2 0 1 1-4.3 0 2.2 2.2 0 0 1 4.4 0zm-39.2-43.3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm18.3-15.3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm6.7 88a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0z',
              strokeWidth: '2',
            }),
            p.createElement('path', {
              stroke: '#FFF',
              d: 'm215.1 155.3-1.9 20-10.8 6m-27.8-4.7-6.3 9.8H157l-4.5 6.4m23.4-65.5v-15.7m45.6 7.8-12.8 7.9-15.2-7.9V96.7',
              strokeWidth: '2',
            }),
            p.createElement('path', {
              fill: '#A26EF4',
              d: 'M180.7 29.3a29.3 29.3 0 1 1 58.6 0 29.3 29.3 0 0 1-58.6 0',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'm221.4 41.7-21.5-.1a1.7 1.7 0 0 1-1.7-1.8V27.6a1.7 1.7 0 0 1 1.8-1.7h21.5c1 0 1.8.9 1.8 1.8l-.1 12.3a1.7 1.7 0 0 1-1.7 1.7',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M215.1 29.2c0 2.6-2 4.6-4.5 4.6a4.6 4.6 0 0 1-4.5-4.7v-6.9c0-2.6 2-4.6 4.6-4.6 2.5 0 4.5 2 4.4 4.7v6.9zm-4.5-14a6.9 6.9 0 0 0-7 6.8v7.3a6.9 6.9 0 0 0 13.8.1V22a6.9 6.9 0 0 0-6.8-6.9zm-43 53.2h-4a4.7 4.7 0 0 1-4.7-4.8 4.7 4.7 0 0 1 4.7-4.7h4a4.7 4.7 0 0 1 4.7 4.8 4.7 4.7 0 0 1-4.7 4.7',
            }),
            p.createElement('path', {
              fill: '#5BA02E',
              d: 'M168.2 248.8a6.6 6.6 0 0 1-6.6-6.6v-66a6.6 6.6 0 0 1 13.2 0v66a6.6 6.6 0 0 1-6.6 6.6',
            }),
            p.createElement('path', {
              fill: '#92C110',
              d: 'M176.1 248.2a6.6 6.6 0 0 1-6.6-6.6v-33a6.6 6.6 0 1 1 13.3 0v33a6.6 6.6 0 0 1-6.7 6.6',
            }),
            p.createElement('path', {
              fill: '#F2D7AD',
              d: 'M186 293.9h-27.4a3.2 3.2 0 0 1-3.2-3.2v-45.9a3.2 3.2 0 0 1 3.2-3.1H186a3.2 3.2 0 0 1 3.2 3.1v46a3.2 3.2 0 0 1-3.2 3',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M82 147.7s6.3-1 17.5-1.3c11.8-.4 17.6 1 17.6 1s3.7-3.8 1-8.3c1.3-12.1 6-32.9.3-48.3-1.1-1.4-3.7-1.5-7.5-.6-1.4.3-7.2-.2-8-.1l-15.3-.4-8-.5c-1.6-.1-4.3-1.7-5.5-.3-.4.4-2.4 5.6-2 16l8.7 35.7s-3.2 3.6 1.2 7',
            }),
            p.createElement('path', {
              fill: '#FFC6A0',
              d: 'm75.8 73.3-1-6.4 12-6.5s7.4-.1 8 1.2c.8 1.3-5.5 1-5.5 1s-1.9 1.4-2.6 2.5c-1.7 2.4-1 6.5-8.4 6-1.7.3-2.5 2.2-2.5 2.2',
            }),
            p.createElement('path', {
              fill: '#FFB594',
              d: 'M52.4 77.7S66.7 87 77.4 92c1 .5-2 16.2-11.9 11.8-7.4-3.3-20.1-8.4-21.5-14.5-.7-3.2 2.6-7.6 8.4-11.7M142 80s-6.7 3-13.9 6.9c-3.9 2.1-10.1 4.7-12.3 8-6.2 9.3 3.5 11.2 13 7.5 6.6-2.7 29-12.1 13.2-22.4',
            }),
            p.createElement('path', {
              fill: '#FFC6A0',
              d: 'm76.2 66.4 3 3.8S76.4 73 73 76c-7 6.2-12.8 14.3-16 16.4-4 2.7-9.7 3.3-12.2 0-3.5-5.1.5-14.7 31.5-26',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M64.7 85.1s-2.4 8.4-9 14.5c.7.5 18.6 10.5 22.2 10 5.2-.6 6.4-19 1.2-20.5-.8-.2-6-1.3-8.9-2.2-.9-.2-1.6-1.7-3.5-1l-2-.8zm63.7.7s5.3 2 7.3 13.8c-.6.2-17.6 12.3-21.8 7.8-6.6-7-.8-17.4 4.2-18.6 4.7-1.2 5-1.4 10.3-3',
            }),
            p.createElement('path', {
              stroke: '#E4EBF7',
              d: 'M78.2 94.7s.9 7.4-5 13',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#E4EBF7',
              d: 'M87.4 94.7s3.1 2.6 10.3 2.6c7.1 0 9-3.5 9-3.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '.9',
            }),
            p.createElement('path', {
              fill: '#FFC6A0',
              d: 'm117.2 68.6-6.8-6.1s-5.4-4.4-9.2-1c-3.9 3.5 4.4 2.2 5.6 4.2 1.2 2.1.9 1.2-2 .5-5.7-1.4-2.1.9 3 5.3 2 1.9 7 1 7 1l2.4-3.9z',
            }),
            p.createElement('path', {
              fill: '#FFB594',
              d: 'm105.3 91.3-.3-11H89l-.5 10.5c0 .4.2.8.6 1 2 1.3 9.3 5 15.8.4.2-.2.4-.5.4-.9',
            }),
            p.createElement('path', {
              fill: '#5C2552',
              d: 'M107.6 74.2c.8-1.1 1-9 1-11.9a1 1 0 0 0-1-1l-4.6-.4c-7.7-1-17 .6-18.3 6.3-5.4 5.9-.4 13.3-.4 13.3s2 3.5 4.3 6.8c.8 1 .4-3.8 3-6a47.9 47.9 0 0 1 16-7',
            }),
            p.createElement('path', {
              fill: '#FFC6A0',
              d: 'M88.4 83.2s2.7 6.2 11.6 6.5c7.8.3 9-7 7.5-17.5l-1-5.5c-6-2.9-15.4.6-15.4.6s-.6 2-.2 5.5c-2.3 2-1.8 5.6-1.8 5.6s-1-2-2-2.3c-.9-.3-2 0-2.3 2-1 4.6 3.6 5.1 3.6 5.1',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'm100.8 77.1 1.7-1-1-4.3.7-1.4',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              fill: '#552950',
              d: 'M105.5 74c0 .8-.4 1.4-1 1.4-.4 0-.8-.7-.8-1.4s.5-1.2 1-1.2.9.6.8 1.3m-8 .2c0 .8-.4 1.3-.9 1.3s-.9-.6-.9-1.3c0-.7.5-1.3 1-1.3s1 .6.9 1.3',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'M91.1 86.8s5.3 5 12.7 2.3',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              fill: '#DB836E',
              d: 'M99.8 81.9s-3.6.2-1.5-2.8c1.6-1.5 5-.4 5-.4s1 3.9-3.5 3.2',
            }),
            p.createElement('path', {
              stroke: '#5C2552',
              d: 'M102.9 70.6s2.5.8 3.4.7m-12.4.7s2.5-1.2 4.8-1.1',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.5',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'M86.3 77.4s1 .9 1.5 2c-.4.6-1 1.2-.3 1.9m11.8 2.4s2 .2 2.5-.2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#E4EBF7',
              d: 'm87.8 115.8 15.7-3m-3.3 3 10-2m-43.7-27s-1.6 8.8-6.7 14M128.3 88s3 4 4 11.7',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'M64 84.8s-6 10-13.5 10',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '.8',
            }),
            p.createElement('path', {
              fill: '#FFC6A0',
              d: 'm112.4 66-.2 5.2 12 9.2c4.5 3.6 8.9 7.5 11 8.7 4.8 2.8 8.9 3.3 11 1.8 4.1-2.9 4.4-9.9-8.1-15.3-4.3-1.8-16.1-6.3-25.7-9.7',
            }),
            p.createElement('path', {
              stroke: '#DB836E',
              d: 'M130.5 85.5s4.6 5.7 11.7 6.2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '.8',
            }),
            p.createElement('path', {
              stroke: '#E4EBF7',
              d: 'M121.7 105.7s-.4 8.6-1.3 13.6',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#648BD8',
              d: 'M115.8 161.5s-3.6-1.5-2.7-7.1',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              fill: '#CBD1D1',
              d: 'M101.5 290.2s4.3 2.1 7.4 1c2.9-.9 4.6.7 7.2 1.3 2.5.5 6.9 1 11.7-1.3 0-5.6-7-4-12-6.8-2.6-1.4-3.8-4.7-3.6-8.8h-9.5s-1.4 10.6-1.2 14.6',
            }),
            p.createElement('path', {
              fill: '#2B0849',
              d: 'M101.5 290s2.4 1.4 6.8.7c3-.4 3.7.5 7.5 1 3.7.6 10.8 0 11.9-.8.4 1-.4 2-.4 2s-1.5.7-4.8.9c-2 .1-5.8.3-7.7-.5-1.8-1.4-5.2-2-5.7-.3-4 1-7.4-.3-7.4-.3l-.2-2.6z',
            }),
            p.createElement('path', {
              fill: '#A4AABA',
              d: 'M108.8 276.2h3.1s0 6.7 4.6 8.6c-4.7.6-8.6-2.3-7.7-8.6',
            }),
            p.createElement('path', {
              fill: '#CBD1D1',
              d: 'M57.6 272.5s-2 7.5-4.5 12.4c-1.8 3.7-4.2 7.6 5.5 7.6 6.7 0 9-.5 7.5-6.7-1.5-6.1.3-13.3.3-13.3h-8.8z',
            }),
            p.createElement('path', {
              fill: '#2B0849',
              d: 'M51.5 290s2.2 1.2 6.7 1.2c6.1 0 8.3-1.6 8.3-1.6s.6 1-.6 2.1c-1 .9-3.6 1.6-7.4 1.6-4.2 0-6-.6-6.8-1.2-.9-.5-.7-1.6-.2-2',
            }),
            p.createElement('path', {
              fill: '#A4AABA',
              d: 'M58.5 274.4s0 1.6-.3 3-1 3.1-1.1 4.2c0 1.1 4.5 1.5 5.2 0 .6-1.6 1.3-6.5 1.9-7.3.6-.8-5-2.1-5.7.1',
            }),
            p.createElement('path', {
              fill: '#7BB2F9',
              d: 'm100.9 277 13.3.1s1.3-54.2 1.8-64c.6-9.9 3.8-43.2 1-62.8l-12.4-.7-22.8.8-1.2 10c0 .4-.6.8-.7 1.3 0 .6.4 1.3.3 2-2.3 14-6.3 32.9-8.7 46.4-.1.6-1.2 1-1.4 2.6 0 .3.2 1.6 0 1.8-6.8 18.7-10.8 47.6-14.1 61.6h14.5s2.2-8.6 4-17a3984 3984 0 0 1 23-84.5l3-.5 1 46.1s-.2 1.2.4 2c.5.8-.6 1.1-.4 2.3l.4 1.7-1 11.9c-.4 4.6 0 39 0 39',
            }),
            p.createElement('path', {
              stroke: '#648BD8',
              d: 'M77.4 220.4c1.2.1 4-2 7-4.9m23.1 8.4s2.8-1 6.1-3.8',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              stroke: '#648BD8',
              d: 'M108.5 221s2.7-1.2 6-4',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }),
            p.createElement('path', {
              stroke: '#648BD8',
              d: 'M76.1 223.6s2.6-.6 6.5-3.4m4.7-69.4c-.2 3.1.3 8.5-4.3 9m21.8-10.7s.1 14-1.3 15c-2.2 1.6-3 1.9-3 1.9m.5-16.4s0 12.8-1.2 24.3m-4.9 1s7.2-1.6 9.4-1.6m-28.6 31.5-1 4.5s-1.5 1.8-1 3.7c.4 2-1 2-5 15.3-1.7 5.6-4.4 18.5-6.3 27.5l-4 18.4M77 196.7a313.3 313.3 0 0 1-.8 4.8m7.7-50-1.2 10.3s-1 .2-.5 2.3c.1 1.3-2.6 15.6-5.1 30.2M57.6 273h13.2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
            p.createElement('path', {
              fill: '#192064',
              d: 'M117.4 147.4s-17-3-35.7.2v4.2s14.6-2.9 35.5-.4l.2-4',
            }),
            p.createElement('path', {
              fill: '#FFF',
              d: 'M107.5 150.4v-5a.8.8 0 0 0-.8-.7H99a.8.8 0 0 0-.7.8v4.8c0 .5.3.9.8.8a140.8 140.8 0 0 1 7.7 0 .8.8 0 0 0 .8-.7',
            }),
            p.createElement('path', {
              fill: '#192064',
              d: 'M106.4 149.4v-3a.6.6 0 0 0-.6-.7 94.1 94.1 0 0 0-5.8 0 .6.6 0 0 0-.7.7v3c0 .4.3.7.7.7h5.7c.4 0 .7-.3.7-.7',
            }),
            p.createElement('path', {
              stroke: '#648BD8',
              d: 'M101.5 274h12.3m-11.1-5v6.5m0-12.4v4.3m-.5-93.4.9 44.4s.7 1.6-.2 2.7c-1 1.1 2.4.7.9 2.2-1.6 1.6.9 1.1 0 3.4-.6 1.5-1 21-1.1 35',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.1',
            }),
          ),
        );
      const kt = { success: rt.Z, error: it.Z, info: at.Z, warning: ut },
        Et = { 404: pt, 500: mt, 403: bt },
        Zt = Object.keys(Et),
        Mt = ({ prefixCls: e, icon: t, status: n }) => {
          const o = Ae()(`${e}-icon`);
          if (Zt.includes(`${n}`)) {
            const t = Et[n];
            return p.createElement(
              'div',
              { className: `${o} ${e}-image` },
              p.createElement(t, null),
            );
          }
          const r = p.createElement(kt[n]);
          return null === t || !1 === t
            ? null
            : p.createElement('div', { className: o }, t || r);
        },
        jt = ({ prefixCls: e, extra: t }) =>
          t ? p.createElement('div', { className: `${e}-extra` }, t) : null,
        St = ({
          prefixCls: e,
          className: t,
          rootClassName: n,
          subTitle: o,
          title: r,
          style: i,
          children: a,
          status: l = 'info',
          icon: c,
          extra: s,
        }) => {
          const {
              getPrefixCls: d,
              direction: u,
              result: m,
            } = p.useContext(Ne.E_),
            h = d('result', e),
            [f, v, g] = Ct(h),
            y = Ae()(
              h,
              `${h}-${l}`,
              t,
              null == m ? void 0 : m.className,
              n,
              { [`${h}-rtl`]: 'rtl' === u },
              v,
              g,
            ),
            x = Object.assign(
              Object.assign({}, null == m ? void 0 : m.style),
              i,
            );
          return f(
            p.createElement(
              'div',
              { className: y, style: x },
              p.createElement(Mt, { prefixCls: h, status: l, icon: c }),
              p.createElement('div', { className: `${h}-title` }, r),
              o && p.createElement('div', { className: `${h}-subtitle` }, o),
              p.createElement(jt, { prefixCls: h, extra: s }),
              a && p.createElement('div', { className: `${h}-content` }, a),
            ),
          );
        };
      (St.PRESENTED_IMAGE_403 = Et[403]),
        (St.PRESENTED_IMAGE_404 = Et[404]),
        (St.PRESENTED_IMAGE_500 = Et[500]);
      var wt = St,
        Bt = n(52676),
        It = (function (e) {
          (0, nt.Z)(n, e);
          var t = (0, ot.Z)(n);
          function n() {
            var e;
            (0, Je.Z)(this, n);
            for (var o = arguments.length, r = new Array(o), i = 0; i < o; i++)
              r[i] = arguments[i];
            return (
              (e = t.call.apply(t, [this].concat(r))),
              (0, m.Z)((0, tt.Z)(e), 'state', { hasError: !1, errorInfo: '' }),
              e
            );
          }
          return (
            (0, et.Z)(
              n,
              [
                {
                  key: 'componentDidCatch',
                  value: function (e, t) {
                    console.log(e, t);
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    return this.state.hasError
                      ? (0, Bt.jsx)(wt, {
                          status: 'error',
                          title: 'Something went wrong.',
                          extra: this.state.errorInfo,
                        })
                      : this.props.children;
                  },
                },
              ],
              [
                {
                  key: 'getDerivedStateFromError',
                  value: function (e) {
                    return { hasError: !0, errorInfo: e.message };
                  },
                },
              ],
            ),
            n
          );
        })(p.Component),
        Ft = function (e) {
          var t = (0, p.useContext)(x.L_).hashId,
            n = e.style,
            o = e.prefixCls,
            r = e.children,
            i = e.hasPageContainer,
            a = void 0 === i ? 0 : i,
            l = Ae()(
              ''.concat(o, '-content'),
              t,
              (0, m.Z)(
                (0, m.Z)({}, ''.concat(o, '-has-header'), e.hasHeader),
                ''.concat(o, '-content-has-page-container'),
                a > 0,
              ),
            ),
            c = e.ErrorBoundary || It;
          return !1 === e.ErrorBoundary
            ? (0, Bt.jsx)(Xe.Content, { className: l, style: n, children: r })
            : (0, Bt.jsx)(c, {
                children: (0, Bt.jsx)(Xe.Content, {
                  className: l,
                  style: n,
                  children: r,
                }),
              });
        },
        Lt = function () {
          return (0, Bt.jsxs)('svg', {
            width: '1em',
            height: '1em',
            viewBox: '0 0 200 200',
            children: [
              (0, Bt.jsxs)('defs', {
                children: [
                  (0, Bt.jsxs)('linearGradient', {
                    x1: '62.1023273%',
                    y1: '0%',
                    x2: '108.19718%',
                    y2: '37.8635764%',
                    id: 'linearGradient-1',
                    children: [
                      (0, Bt.jsx)('stop', {
                        stopColor: '#4285EB',
                        offset: '0%',
                      }),
                      (0, Bt.jsx)('stop', {
                        stopColor: '#2EC7FF',
                        offset: '100%',
                      }),
                    ],
                  }),
                  (0, Bt.jsxs)('linearGradient', {
                    x1: '69.644116%',
                    y1: '0%',
                    x2: '54.0428975%',
                    y2: '108.456714%',
                    id: 'linearGradient-2',
                    children: [
                      (0, Bt.jsx)('stop', {
                        stopColor: '#29CDFF',
                        offset: '0%',
                      }),
                      (0, Bt.jsx)('stop', {
                        stopColor: '#148EFF',
                        offset: '37.8600687%',
                      }),
                      (0, Bt.jsx)('stop', {
                        stopColor: '#0A60FF',
                        offset: '100%',
                      }),
                    ],
                  }),
                  (0, Bt.jsxs)('linearGradient', {
                    x1: '69.6908165%',
                    y1: '-12.9743587%',
                    x2: '16.7228981%',
                    y2: '117.391248%',
                    id: 'linearGradient-3',
                    children: [
                      (0, Bt.jsx)('stop', {
                        stopColor: '#FA816E',
                        offset: '0%',
                      }),
                      (0, Bt.jsx)('stop', {
                        stopColor: '#F74A5C',
                        offset: '41.472606%',
                      }),
                      (0, Bt.jsx)('stop', {
                        stopColor: '#F51D2C',
                        offset: '100%',
                      }),
                    ],
                  }),
                  (0, Bt.jsxs)('linearGradient', {
                    x1: '68.1279872%',
                    y1: '-35.6905737%',
                    x2: '30.4400914%',
                    y2: '114.942679%',
                    id: 'linearGradient-4',
                    children: [
                      (0, Bt.jsx)('stop', {
                        stopColor: '#FA8E7D',
                        offset: '0%',
                      }),
                      (0, Bt.jsx)('stop', {
                        stopColor: '#F74A5C',
                        offset: '51.2635191%',
                      }),
                      (0, Bt.jsx)('stop', {
                        stopColor: '#F51D2C',
                        offset: '100%',
                      }),
                    ],
                  }),
                ],
              }),
              (0, Bt.jsx)('g', {
                stroke: 'none',
                strokeWidth: 1,
                fill: 'none',
                fillRule: 'evenodd',
                children: (0, Bt.jsx)('g', {
                  transform: 'translate(-20.000000, -20.000000)',
                  children: (0, Bt.jsx)('g', {
                    transform: 'translate(20.000000, 20.000000)',
                    children: (0, Bt.jsxs)('g', {
                      children: [
                        (0, Bt.jsxs)('g', {
                          fillRule: 'nonzero',
                          children: [
                            (0, Bt.jsxs)('g', {
                              children: [
                                (0, Bt.jsx)('path', {
                                  d: 'M91.5880863,4.17652823 L4.17996544,91.5127728 C-0.519240605,96.2081146 -0.519240605,103.791885 4.17996544,108.487227 L91.5880863,195.823472 C96.2872923,200.518814 103.877304,200.518814 108.57651,195.823472 L145.225487,159.204632 C149.433969,154.999611 149.433969,148.181924 145.225487,143.976903 C141.017005,139.771881 134.193707,139.771881 129.985225,143.976903 L102.20193,171.737352 C101.032305,172.906015 99.2571609,172.906015 98.0875359,171.737352 L28.285908,101.993122 C27.1162831,100.824459 27.1162831,99.050775 28.285908,97.8821118 L98.0875359,28.1378823 C99.2571609,26.9692191 101.032305,26.9692191 102.20193,28.1378823 L129.985225,55.8983314 C134.193707,60.1033528 141.017005,60.1033528 145.225487,55.8983314 C149.433969,51.69331 149.433969,44.8756232 145.225487,40.6706018 L108.58055,4.05574592 C103.862049,-0.537986846 96.2692618,-0.500797906 91.5880863,4.17652823 Z',
                                  fill: 'url(#linearGradient-1)',
                                }),
                                (0, Bt.jsx)('path', {
                                  d: 'M91.5880863,4.17652823 L4.17996544,91.5127728 C-0.519240605,96.2081146 -0.519240605,103.791885 4.17996544,108.487227 L91.5880863,195.823472 C96.2872923,200.518814 103.877304,200.518814 108.57651,195.823472 L145.225487,159.204632 C149.433969,154.999611 149.433969,148.181924 145.225487,143.976903 C141.017005,139.771881 134.193707,139.771881 129.985225,143.976903 L102.20193,171.737352 C101.032305,172.906015 99.2571609,172.906015 98.0875359,171.737352 L28.285908,101.993122 C27.1162831,100.824459 27.1162831,99.050775 28.285908,97.8821118 L98.0875359,28.1378823 C100.999864,25.6271836 105.751642,20.541824 112.729652,19.3524487 C117.915585,18.4685261 123.585219,20.4140239 129.738554,25.1889424 C125.624663,21.0784292 118.571995,14.0340304 108.58055,4.05574592 C103.862049,-0.537986846 96.2692618,-0.500797906 91.5880863,4.17652823 Z',
                                  fill: 'url(#linearGradient-2)',
                                }),
                              ],
                            }),
                            (0, Bt.jsx)('path', {
                              d: 'M153.685633,135.854579 C157.894115,140.0596 164.717412,140.0596 168.925894,135.854579 L195.959977,108.842726 C200.659183,104.147384 200.659183,96.5636133 195.960527,91.8688194 L168.690777,64.7181159 C164.472332,60.5180858 157.646868,60.5241425 153.435895,64.7316526 C149.227413,68.936674 149.227413,75.7543607 153.435895,79.9593821 L171.854035,98.3623765 C173.02366,99.5310396 173.02366,101.304724 171.854035,102.473387 L153.685633,120.626849 C149.47715,124.83187 149.47715,131.649557 153.685633,135.854579 Z',
                              fill: 'url(#linearGradient-3)',
                            }),
                          ],
                        }),
                        (0, Bt.jsx)('ellipse', {
                          fill: 'url(#linearGradient-4)',
                          cx: '100.519339',
                          cy: '100.436681',
                          rx: '23.6001926',
                          ry: '23.580786',
                        }),
                      ],
                    }),
                  }),
                }),
              }),
            ],
          });
        },
        At = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z',
                },
              },
            ],
          },
          name: 'copyright',
          theme: 'outlined',
        },
        Rt = function (e, t) {
          return p.createElement(st.Z, (0, lt.Z)({}, e, { ref: t, icon: At }));
        };
      var Nt = p.forwardRef(Rt),
        Tt = n(11439),
        Ht = function (e) {
          return (0, m.Z)({}, e.componentCls, {
            marginBlock: 0,
            marginBlockStart: 48,
            marginBlockEnd: 24,
            marginInline: 0,
            paddingBlock: 0,
            paddingInline: 16,
            textAlign: 'center',
            '&-list': {
              marginBlockEnd: 8,
              color: e.colorTextSecondary,
              '&-link': {
                color: e.colorTextSecondary,
                textDecoration: e.linkDecoration,
              },
              '*:not(:last-child)': { marginInlineEnd: 8 },
              '&:hover': { color: e.colorPrimary },
            },
            '&-copyright': { fontSize: '14px', color: e.colorText },
          });
        };
      var zt = function (e) {
          var t = e.className,
            n = e.prefixCls,
            o = e.links,
            r = e.copyright,
            i = e.style,
            a = (0, p.useContext)(Ie.ZP.ConfigContext).getPrefixCls(
              n || 'pro-global-footer',
            ),
            l = (function (e) {
              return (0, Tt.Xj)('ProLayoutFooter', function (t) {
                var n = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e) },
                );
                return [Ht(n)];
              });
            })(a),
            c = l.wrapSSR,
            s = l.hashId;
          return !(
            null == o ||
            !1 === o ||
            (Array.isArray(o) && 0 === o.length)
          ) ||
            (null != r && !1 !== r)
            ? c(
                (0, Bt.jsxs)('div', {
                  className: Ae()(a, s, t),
                  style: i,
                  children: [
                    o &&
                      (0, Bt.jsx)('div', {
                        className: ''.concat(a, '-list ').concat(s).trim(),
                        children: o.map(function (e) {
                          return (0,
                          Bt.jsx)('a', { className: ''.concat(a, '-list-link ').concat(s).trim(), title: e.key, target: e.blankTarget ? '_blank' : '_self', href: e.href, rel: 'noreferrer', children: e.title }, e.key);
                        }),
                      }),
                    r &&
                      (0, Bt.jsx)('div', {
                        className: ''.concat(a, '-copyright ').concat(s).trim(),
                        children: r,
                      }),
                  ],
                }),
              )
            : null;
        },
        Dt = Xe.Footer,
        Pt = function (e) {
          var t = e.links,
            n = e.copyright,
            o = e.style,
            r = e.className,
            i = e.prefixCls;
          return (0, Bt.jsx)(Dt, {
            className: r,
            style: (0, y.Z)({ padding: 0 }, o),
            children: (0, Bt.jsx)(zt, {
              links: t,
              prefixCls: i,
              copyright:
                !1 === n
                  ? null
                  : (0, Bt.jsxs)(p.Fragment, {
                      children: [(0, Bt.jsx)(Nt, {}), ' ', n],
                    }),
            }),
          });
        },
        Ot = function e(t) {
          return (t || []).reduce(function (t, n) {
            return (
              n.key && t.push(n.key),
              n.children || n.routes
                ? t.concat(e(n.children || n.routes) || [])
                : t
            );
          }, []);
        };
      function Wt(e) {
        return e
          .map(function (e) {
            var t = e.children || [],
              n = (0, y.Z)({}, e);
            if (
              (!n.children && n.routes && (n.children = n.routes),
              !n.name || n.hideInMenu)
            )
              return null;
            if (n && null != n && n.children) {
              if (
                !n.hideChildrenInMenu &&
                t.some(function (e) {
                  return e && e.name && !e.hideInMenu;
                })
              )
                return (0, y.Z)((0, y.Z)({}, e), {}, { children: Wt(t) });
              delete n.children;
            }
            return delete n.routes, n;
          })
          .filter(function (e) {
            return e;
          });
      }
      var $t = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z',
                },
              },
            ],
          },
          name: 'menu',
          theme: 'outlined',
        },
        _t = function (e, t) {
          return p.createElement(st.Z, (0, lt.Z)({}, e, { ref: t, icon: $t }));
        };
      var Gt = p.forwardRef(_t),
        Vt = n(34550),
        Kt = function () {
          return (0, Bt.jsx)('svg', {
            width: '1em',
            height: '1em',
            viewBox: '0 0 12 12',
            fill: 'currentColor',
            'aria-hidden': 'true',
            children: (0, Bt.jsx)('path', {
              d: 'M0 0h3v3H0V0zm4.5 0h3v3h-3V0zM9 0h3v3H9V0zM0 4.5h3v3H0v-3zm4.503 0h3v3h-3v-3zM9 4.5h3v3H9v-3zM0 9h3v3H0V9zm4.503 0h3v3h-3V9zM9 9h3v3H9V9z',
            }),
          });
        },
        Ut = function e(t) {
          var n = t.appList,
            o = t.baseClassName,
            r = t.hashId,
            i = t.itemClick;
          return (0, Bt.jsx)('div', {
            className: ''.concat(o, '-content ').concat(r).trim(),
            children: (0, Bt.jsx)('ul', {
              className: ''.concat(o, '-content-list ').concat(r).trim(),
              children:
                null == n
                  ? void 0
                  : n.map(function (t, n) {
                      var a;
                      return null != t &&
                        null !== (a = t.children) &&
                        void 0 !== a &&
                        a.length
                        ? (0, Bt.jsxs)(
                            'div',
                            {
                              className: ''
                                .concat(o, '-content-list-item-group ')
                                .concat(r)
                                .trim(),
                              children: [
                                (0, Bt.jsx)('div', {
                                  className: ''
                                    .concat(
                                      o,
                                      '-content-list-item-group-title ',
                                    )
                                    .concat(r)
                                    .trim(),
                                  children: t.title,
                                }),
                                (0, Bt.jsx)(e, {
                                  hashId: r,
                                  itemClick: i,
                                  appList: null == t ? void 0 : t.children,
                                  baseClassName: o,
                                }),
                              ],
                            },
                            n,
                          )
                        : (0, Bt.jsx)(
                            'li',
                            {
                              className: ''
                                .concat(o, '-content-list-item ')
                                .concat(r)
                                .trim(),
                              onClick: function (e) {
                                e.stopPropagation(), null == i || i(t);
                              },
                              children: (0, Bt.jsxs)('a', {
                                href: i ? void 0 : t.url,
                                target: t.target,
                                rel: 'noreferrer',
                                children: [
                                  tn(t.icon),
                                  (0, Bt.jsxs)('div', {
                                    children: [
                                      (0, Bt.jsx)('div', { children: t.title }),
                                      t.desc
                                        ? (0, Bt.jsx)('span', {
                                            children: t.desc,
                                          })
                                        : null,
                                    ],
                                  }),
                                ],
                              }),
                            },
                            n,
                          );
                    }),
            }),
          });
        },
        Xt = function (e) {
          if (!e) return !1;
          if (!e.startsWith('http')) return !1;
          try {
            return !!new URL(e);
          } catch (e) {
            return !1;
          }
        },
        qt = function (e, t) {
          if (e && 'string' == typeof e && Xt(e))
            return (0, Bt.jsx)('img', { src: e, alt: 'logo' });
          if ('function' == typeof e) return e();
          if (e && 'string' == typeof e)
            return (0, Bt.jsx)('div', { id: 'avatarLogo', children: e });
          if (!e && t && 'string' == typeof t) {
            var n = t.substring(0, 1);
            return (0, Bt.jsx)('div', { id: 'avatarLogo', children: n });
          }
          return e;
        },
        Qt = function e(t) {
          var n = t.appList,
            o = t.baseClassName,
            r = t.hashId,
            i = t.itemClick;
          return (0, Bt.jsx)('div', {
            className: ''.concat(o, '-content ').concat(r).trim(),
            children: (0, Bt.jsx)('ul', {
              className: ''.concat(o, '-content-list ').concat(r).trim(),
              children:
                null == n
                  ? void 0
                  : n.map(function (t, n) {
                      var a;
                      return null != t &&
                        null !== (a = t.children) &&
                        void 0 !== a &&
                        a.length
                        ? (0, Bt.jsxs)(
                            'div',
                            {
                              className: ''
                                .concat(o, '-content-list-item-group ')
                                .concat(r)
                                .trim(),
                              children: [
                                (0, Bt.jsx)('div', {
                                  className: ''
                                    .concat(
                                      o,
                                      '-content-list-item-group-title ',
                                    )
                                    .concat(r)
                                    .trim(),
                                  children: t.title,
                                }),
                                (0, Bt.jsx)(e, {
                                  hashId: r,
                                  itemClick: i,
                                  appList: null == t ? void 0 : t.children,
                                  baseClassName: o,
                                }),
                              ],
                            },
                            n,
                          )
                        : (0, Bt.jsx)(
                            'li',
                            {
                              className: ''
                                .concat(o, '-content-list-item ')
                                .concat(r)
                                .trim(),
                              onClick: function (e) {
                                e.stopPropagation(), null == i || i(t);
                              },
                              children: (0, Bt.jsxs)('a', {
                                href: i ? 'javascript:;' : t.url,
                                target: t.target,
                                rel: 'noreferrer',
                                children: [
                                  qt(t.icon, t.title),
                                  (0, Bt.jsx)('div', {
                                    children: (0, Bt.jsx)('div', {
                                      children: t.title,
                                    }),
                                  }),
                                ],
                              }),
                            },
                            n,
                          );
                    }),
            }),
          });
        },
        Yt = function (e) {
          return {
            '&-content': {
              maxHeight: 'calc(100vh - 48px)',
              overflow: 'auto',
              '&-list': {
                boxSizing: 'content-box',
                maxWidth: 656,
                marginBlock: 0,
                marginInline: 0,
                paddingBlock: 0,
                paddingInline: 0,
                listStyle: 'none',
                '&-item': {
                  position: 'relative',
                  display: 'inline-block',
                  width: 328,
                  height: 72,
                  paddingInline: 16,
                  paddingBlock: 16,
                  verticalAlign: 'top',
                  listStyleType: 'none',
                  transition: 'transform 0.2s cubic-bezier(0.333, 0, 0, 1)',
                  borderRadius: e.borderRadius,
                  '&-group': {
                    marginBottom: 16,
                    '&-title': {
                      margin: '16px 0 8px 12px',
                      fontWeight: 600,
                      color: 'rgba(0, 0, 0, 0.88)',
                      fontSize: 16,
                      opacity: 0.85,
                      lineHeight: 1.5,
                      '&:first-child': { marginTop: 12 },
                    },
                  },
                  '&:hover': { backgroundColor: e.colorBgTextHover },
                  '* div':
                    null === Tt.Wf || void 0 === Tt.Wf ? void 0 : (0, Tt.Wf)(e),
                  a: {
                    display: 'flex',
                    height: '100%',
                    fontSize: 12,
                    textDecoration: 'none',
                    '& > img': { width: 40, height: 40 },
                    '& > div': {
                      marginInlineStart: 14,
                      color: e.colorTextHeading,
                      fontSize: 14,
                      lineHeight: '22px',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    },
                    '& > div > span': {
                      color: e.colorTextSecondary,
                      fontSize: 12,
                      lineHeight: '20px',
                    },
                  },
                },
              },
            },
          };
        },
        Jt = function (e) {
          return {
            '&-content': {
              maxHeight: 'calc(100vh - 48px)',
              overflow: 'auto',
              '&-list': {
                boxSizing: 'border-box',
                maxWidth: 376,
                marginBlock: 0,
                marginInline: 0,
                paddingBlock: 0,
                paddingInline: 0,
                listStyle: 'none',
                '&-item': {
                  position: 'relative',
                  display: 'inline-block',
                  width: 104,
                  height: 104,
                  marginBlock: 8,
                  marginInline: 8,
                  paddingInline: 24,
                  paddingBlock: 24,
                  verticalAlign: 'top',
                  listStyleType: 'none',
                  transition: 'transform 0.2s cubic-bezier(0.333, 0, 0, 1)',
                  borderRadius: e.borderRadius,
                  '&-group': {
                    marginBottom: 16,
                    '&-title': {
                      margin: '16px 0 8px 12px',
                      fontWeight: 600,
                      color: 'rgba(0, 0, 0, 0.88)',
                      fontSize: 16,
                      opacity: 0.85,
                      lineHeight: 1.5,
                      '&:first-child': { marginTop: 12 },
                    },
                  },
                  '&:hover': { backgroundColor: e.colorBgTextHover },
                  a: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: 12,
                    textDecoration: 'none',
                    '& > #avatarLogo': {
                      width: 40,
                      height: 40,
                      margin: '0 auto',
                      color: e.colorPrimary,
                      fontSize: 22,
                      lineHeight: '40px',
                      textAlign: 'center',
                      backgroundImage:
                        'linear-gradient(180deg, #E8F0FB 0%, #F6F8FC 100%)',
                      borderRadius: e.borderRadius,
                    },
                    '& > img': { width: 40, height: 40 },
                    '& > div': {
                      marginBlockStart: 5,
                      marginInlineStart: 0,
                      color: e.colorTextHeading,
                      fontSize: 14,
                      lineHeight: '22px',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    },
                    '& > div > span': {
                      color: e.colorTextSecondary,
                      fontSize: 12,
                      lineHeight: '20px',
                    },
                  },
                },
              },
            },
          };
        },
        en = function (e) {
          var t, n, o, r, i;
          return (0, m.Z)({}, e.componentCls, {
            '&-icon': {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingInline: 4,
              paddingBlock: 0,
              fontSize: 14,
              lineHeight: '14px',
              height: 28,
              width: 28,
              cursor: 'pointer',
              color:
                null === (t = e.layout) || void 0 === t
                  ? void 0
                  : t.colorTextAppListIcon,
              borderRadius: e.borderRadius,
              '&:hover': {
                color:
                  null === (n = e.layout) || void 0 === n
                    ? void 0
                    : n.colorTextAppListIconHover,
                backgroundColor:
                  null === (o = e.layout) || void 0 === o
                    ? void 0
                    : o.colorBgAppListIconHover,
              },
              '&-active': {
                color:
                  null === (r = e.layout) || void 0 === r
                    ? void 0
                    : r.colorTextAppListIconHover,
                backgroundColor:
                  null === (i = e.layout) || void 0 === i
                    ? void 0
                    : i.colorBgAppListIconHover,
              },
            },
            '&-item-title': {
              marginInlineStart: '16px',
              marginInlineEnd: '8px',
              marginBlockStart: 0,
              marginBlockEnd: '12px',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.88)',
              fontSize: 16,
              opacity: 0.85,
              lineHeight: 1.5,
              '&:first-child': { marginBlockStart: 12 },
            },
            '&-popover': (0, m.Z)({}, ''.concat(e.antCls, '-popover-arrow'), {
              display: 'none',
            }),
            '&-simple': Jt(e),
            '&-default': Yt(e),
          });
        };
      var tn = function (e) {
          return 'string' == typeof e
            ? (0, Bt.jsx)('img', {
                width: 'auto',
                height: 22,
                src: e,
                alt: 'logo',
              })
            : 'function' == typeof e
            ? e()
            : e;
        },
        nn = function (e) {
          var t,
            n = e.appList,
            o = e.appListRender,
            r = e.prefixCls,
            i = void 0 === r ? 'ant-pro' : r,
            a = e.onItemClick,
            l = p.useRef(null),
            c = p.useRef(null),
            s = ''.concat(i, '-layout-apps'),
            d = (function (e) {
              return (0, Tt.Xj)('AppsLogoComponents', function (t) {
                var n = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e) },
                );
                return [en(n)];
              });
            })(s),
            u = d.wrapSSR,
            h = d.hashId,
            f = (0, p.useState)(!1),
            v = (0, g.Z)(f, 2),
            x = v[0],
            C = v[1],
            b = function (e) {
              null == a || a(e, c);
            },
            k = (0, p.useMemo)(
              function () {
                return (
                  null == n
                    ? void 0
                    : n.some(function (e) {
                        return !(null != e && e.desc);
                      })
                )
                  ? (0, Bt.jsx)(Qt, {
                      hashId: h,
                      appList: n,
                      itemClick: a ? b : void 0,
                      baseClassName: ''.concat(s, '-simple'),
                    })
                  : (0, Bt.jsx)(Ut, {
                      hashId: h,
                      appList: n,
                      itemClick: a ? b : void 0,
                      baseClassName: ''.concat(s, '-default'),
                    });
              },
              [n, s, h],
            );
          if (
            null == e ||
            null === (t = e.appList) ||
            void 0 === t ||
            !t.length
          )
            return null;
          var E = o ? o(null == e ? void 0 : e.appList, k) : k,
            Z = I(void 0, function (e) {
              return C(e);
            });
          return u(
            (0, Bt.jsxs)(Bt.Fragment, {
              children: [
                (0, Bt.jsx)('div', {
                  ref: l,
                  onClick: function (e) {
                    e.stopPropagation(), e.preventDefault();
                  },
                }),
                (0, Bt.jsx)(
                  Vt.Z,
                  (0, y.Z)(
                    (0, y.Z)(
                      {
                        placement: 'bottomRight',
                        trigger: ['click'],
                        zIndex: 9999,
                        arrow: !1,
                      },
                      Z,
                    ),
                    {},
                    {
                      overlayClassName: ''
                        .concat(s, '-popover ')
                        .concat(h)
                        .trim(),
                      content: E,
                      getPopupContainer: function () {
                        return l.current || document.body;
                      },
                      children: (0, Bt.jsx)('span', {
                        ref: c,
                        onClick: function (e) {
                          e.stopPropagation();
                        },
                        className: Ae()(
                          ''.concat(s, '-icon'),
                          h,
                          (0, m.Z)({}, ''.concat(s, '-icon-active'), x),
                        ),
                        children: (0, Bt.jsx)(Kt, {}),
                      }),
                    },
                  ),
                ),
              ],
            }),
          );
        },
        on = n(37286),
        rn = n(58092),
        an = n(89677);
      function ln() {
        return (0, Bt.jsx)('svg', {
          width: '1em',
          height: '1em',
          viewBox: '0 0 12 12',
          fill: 'currentColor',
          'aria-hidden': 'true',
          children: (0, Bt.jsx)('path', {
            d: 'M6.432 7.967a.448.448 0 01-.318.133h-.228a.46.46 0 01-.318-.133L2.488 4.85a.305.305 0 010-.43l.427-.43a.293.293 0 01.42 0L6 6.687l2.665-2.699a.299.299 0 01.426 0l.42.431a.305.305 0 010 .43L6.432 7.967z',
          }),
        });
      }
      var cn = function (e) {
        var t, n, o;
        return (0, m.Z)({}, e.componentCls, {
          position: 'absolute',
          insetBlockStart: '18px',
          zIndex: '101',
          width: '24px',
          height: '24px',
          fontSize: ['14px', '16px'],
          textAlign: 'center',
          borderRadius: '40px',
          insetInlineEnd: '-13px',
          transition: 'transform 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color:
            null === (t = e.layout) ||
            void 0 === t ||
            null === (t = t.sider) ||
            void 0 === t
              ? void 0
              : t.colorTextCollapsedButton,
          backgroundColor:
            null === (n = e.layout) ||
            void 0 === n ||
            null === (n = n.sider) ||
            void 0 === n
              ? void 0
              : n.colorBgCollapsedButton,
          boxShadow:
            '0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
          '&:hover': {
            color:
              null === (o = e.layout) ||
              void 0 === o ||
              null === (o = o.sider) ||
              void 0 === o
                ? void 0
                : o.colorTextCollapsedButtonHover,
            boxShadow:
              '0 4px 16px -4px rgba(0,0,0,0.05), 0 2px 8px -2px rgba(25,15,15,0.07), 0 1px 2px 0 rgba(0,0,0,0.08)',
          },
          '.anticon': { fontSize: '14px' },
          '& > svg': {
            transition: 'transform  0.3s',
            transform: 'rotate(90deg)',
          },
          '&-collapsed': { '& > svg': { transform: 'rotate(-90deg)' } },
        });
      };
      var sn = ['isMobile', 'collapsed'],
        dn = function (e) {
          var t,
            n = e.isMobile,
            o = e.collapsed,
            r = (0, v.Z)(e, sn),
            i =
              ((t = e.className),
              (0, Tt.Xj)('SiderMenuCollapsedIcon', function (e) {
                var n = (0, y.Z)(
                  (0, y.Z)({}, e),
                  {},
                  { componentCls: '.'.concat(t) },
                );
                return [cn(n)];
              })),
            a = i.wrapSSR,
            l = i.hashId;
          return n && o
            ? null
            : a(
                (0, Bt.jsx)(
                  'div',
                  (0, y.Z)(
                    (0, y.Z)({}, r),
                    {},
                    {
                      className: Ae()(
                        e.className,
                        l,
                        (0, m.Z)(
                          (0, m.Z)({}, ''.concat(e.className, '-collapsed'), o),
                          ''.concat(e.className, '-is-mobile'),
                          n,
                        ),
                      ),
                      children: (0, Bt.jsx)(ln, {}),
                    },
                  ),
                ),
              );
        },
        un = n(94996),
        pn = n(23379),
        mn = n(88939),
        hn = [
          'className',
          'component',
          'viewBox',
          'spin',
          'rotate',
          'tabIndex',
          'onClick',
          'children',
        ],
        fn = p.forwardRef(function (e, t) {
          var n = e.className,
            o = e.component,
            r = e.viewBox,
            i = e.spin,
            a = e.rotate,
            l = e.tabIndex,
            c = e.onClick,
            s = e.children,
            d = (0, v.Z)(e, hn),
            u = p.useRef(),
            h = (0, un.x1)(u, t);
          (0, mn.Kp)(
            Boolean(o || s),
            'Should have `component` prop or `children`.',
          ),
            (0, mn.C3)(u);
          var f = p.useContext(pn.Z),
            g = f.prefixCls,
            x = void 0 === g ? 'anticon' : g,
            C = f.rootClassName,
            b = Ae()(C, x, (0, m.Z)({}, ''.concat(x, '-spin'), !!i && !!o), n),
            k = Ae()((0, m.Z)({}, ''.concat(x, '-spin'), !!i)),
            E = a
              ? {
                  msTransform: 'rotate('.concat(a, 'deg)'),
                  transform: 'rotate('.concat(a, 'deg)'),
                }
              : void 0,
            Z = (0, y.Z)(
              (0, y.Z)({}, mn.vD),
              {},
              { className: k, style: E, viewBox: r },
            );
          r || delete Z.viewBox;
          var M = l;
          return (
            void 0 === M && c && (M = -1),
            p.createElement(
              'span',
              (0, lt.Z)({ role: 'img' }, d, {
                ref: h,
                tabIndex: M,
                onClick: c,
                className: b,
              }),
              o
                ? p.createElement(o, Z, s)
                : s
                ? ((0, mn.Kp)(
                    Boolean(r) ||
                      (1 === p.Children.count(s) &&
                        p.isValidElement(s) &&
                        'use' === p.Children.only(s).type),
                    'Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon.',
                  ),
                  p.createElement('svg', (0, lt.Z)({}, Z, { viewBox: r }), s))
                : null,
            )
          );
        });
      fn.displayName = 'AntdIcon';
      var vn = fn,
        gn = ['type', 'children'],
        yn = new Set();
      function xn(e) {
        return Boolean('string' == typeof e && e.length && !yn.has(e));
      }
      function Cn(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = e[t];
        if (xn(n)) {
          var o = document.createElement('script');
          o.setAttribute('src', n),
            o.setAttribute('data-namespace', n),
            e.length > t + 1 &&
              ((o.onload = function () {
                Cn(e, t + 1);
              }),
              (o.onerror = function () {
                Cn(e, t + 1);
              })),
            yn.add(n),
            document.body.appendChild(o);
        }
      }
      function bn() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.scriptUrl,
          n = e.extraCommonProps,
          o = void 0 === n ? {} : n;
        t &&
          'undefined' != typeof document &&
          'undefined' != typeof window &&
          'function' == typeof document.createElement &&
          (Array.isArray(t) ? Cn(t.reverse()) : Cn([t]));
        var r = p.forwardRef(function (e, t) {
          var n = e.type,
            r = e.children,
            i = (0, v.Z)(e, gn),
            a = null;
          return (
            e.type &&
              (a = p.createElement('use', { xlinkHref: '#'.concat(n) })),
            r && (a = r),
            p.createElement(vn, (0, lt.Z)({}, o, i, { ref: t }), a)
          );
        });
        return (r.displayName = 'Iconfont'), r;
      }
      function kn(e) {
        return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(e);
      }
      var En = n(64029),
        Zn = n(85779),
        Mn = {
          navTheme: 'light',
          layout: 'side',
          contentWidth: 'Fluid',
          fixedHeader: !1,
          fixSiderbar: !0,
          iconfontUrl: '',
          colorPrimary: '#1677FF',
          splitMenus: !1,
        },
        jn = function (e, t) {
          var n,
            o,
            r = t.includes('horizontal')
              ? null === (n = e.layout) || void 0 === n
                ? void 0
                : n.header
              : null === (o = e.layout) || void 0 === o
              ? void 0
              : o.sider;
          return (0, y.Z)(
            (0, y.Z)(
              (0, m.Z)(
                {},
                ''.concat(e.componentCls),
                (0, m.Z)(
                  (0, m.Z)(
                    (0, m.Z)(
                      (0, m.Z)(
                        (0, m.Z)(
                          (0, m.Z)(
                            (0, m.Z)(
                              (0, m.Z)(
                                (0, m.Z)(
                                  {
                                    background: 'transparent',
                                    color: null == r ? void 0 : r.colorTextMenu,
                                    border: 'none',
                                  },
                                  ''.concat(e.componentCls, '-menu-item'),
                                  { transition: 'none !important' },
                                ),
                                ''.concat(e.componentCls, '-submenu-has-icon'),
                                (0, m.Z)(
                                  {},
                                  '> '.concat(e.antCls, '-menu-sub'),
                                  { paddingInlineStart: 10 },
                                ),
                              ),
                              ''.concat(e.antCls, '-menu-title-content'),
                              {
                                width: '100%',
                                height: '100%',
                                display: 'inline-flex',
                              },
                            ),
                            ''.concat(e.antCls, '-menu-title-content'),
                            { '&:first-child': { width: '100%' } },
                          ),
                          ''.concat(e.componentCls, '-item-icon'),
                          { display: 'flex', alignItems: 'center' },
                        ),
                        '&&-collapsed',
                        (0, m.Z)(
                          (0, m.Z)(
                            (0, m.Z)(
                              {},
                              ''
                                .concat(e.antCls, '-menu-item, \n        ')
                                .concat(e.antCls, '-menu-item-group > ')
                                .concat(e.antCls, '-menu-item-group-list > ')
                                .concat(e.antCls, '-menu-item, \n        ')
                                .concat(e.antCls, '-menu-item-group > ')
                                .concat(e.antCls, '-menu-item-group-list > ')
                                .concat(e.antCls, '-menu-submenu > ')
                                .concat(
                                  e.antCls,
                                  '-menu-submenu-title, \n        ',
                                )
                                .concat(e.antCls, '-menu-submenu > ')
                                .concat(e.antCls, '-menu-submenu-title'),
                              {
                                paddingInline: '0 !important',
                                marginBlock: '4px !important',
                              },
                            ),
                            ''
                              .concat(e.antCls, '-menu-item-group > ')
                              .concat(e.antCls, '-menu-item-group-list > ')
                              .concat(e.antCls, '-menu-submenu-selected > ')
                              .concat(
                                e.antCls,
                                '-menu-submenu-title, \n        ',
                              )
                              .concat(e.antCls, '-menu-submenu-selected > ')
                              .concat(e.antCls, '-menu-submenu-title'),
                            {
                              backgroundColor:
                                null == r ? void 0 : r.colorBgMenuItemSelected,
                              borderRadius: e.borderRadiusLG,
                            },
                          ),
                          ''.concat(e.componentCls, '-group'),
                          (0, m.Z)(
                            {},
                            ''.concat(e.antCls, '-menu-item-group-title'),
                            { paddingInline: 0 },
                          ),
                        ),
                      ),
                      '&-item-title',
                      (0, m.Z)(
                        (0, m.Z)(
                          (0, m.Z)(
                            (0, m.Z)(
                              (0, m.Z)(
                                {
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: e.marginXS,
                                },
                                ''.concat(e.componentCls, '-item-text'),
                                {
                                  maxWidth: '100%',
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  wordBreak: 'break-all',
                                  whiteSpace: 'nowrap',
                                },
                              ),
                              '&-collapsed',
                              (0, m.Z)(
                                (0, m.Z)(
                                  { minWidth: 40, height: 40 },
                                  ''.concat(e.componentCls, '-item-icon'),
                                  {
                                    height: '16px',
                                    width: '16px',
                                    lineHeight: '16px !important',
                                    '.anticon': {
                                      lineHeight: '16px !important',
                                      height: '16px',
                                    },
                                  },
                                ),
                                ''.concat(
                                  e.componentCls,
                                  '-item-text-has-icon',
                                ),
                                { display: 'none !important' },
                              ),
                            ),
                            '&-collapsed-level-0',
                            {
                              flexDirection: 'column',
                              justifyContent: 'center',
                            },
                          ),
                          '&'.concat(e.componentCls, '-group-item-title'),
                          { gap: e.marginXS, height: 18, overflow: 'hidden' },
                        ),
                        '&'.concat(
                          e.componentCls,
                          '-item-collapsed-show-title',
                        ),
                        (0, m.Z)(
                          { lineHeight: '16px', gap: 0 },
                          '&'.concat(e.componentCls, '-item-title-collapsed'),
                          (0, m.Z)(
                            (0, m.Z)(
                              { display: 'flex' },
                              ''.concat(e.componentCls, '-item-icon'),
                              {
                                height: '16px',
                                width: '16px',
                                lineHeight: '16px !important',
                                '.anticon': {
                                  lineHeight: '16px!important',
                                  height: '16px',
                                },
                              },
                            ),
                            ''.concat(e.componentCls, '-item-text'),
                            {
                              opacity: '1 !important',
                              display: 'inline !important',
                              textAlign: 'center',
                              fontSize: 12,
                              height: 12,
                              lineHeight: '12px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              width: '100%',
                              margin: 0,
                              padding: 0,
                              marginBlockStart: 4,
                            },
                          ),
                        ),
                      ),
                    ),
                    '&-group',
                    (0, m.Z)(
                      {},
                      ''.concat(e.antCls, '-menu-item-group-title'),
                      {
                        fontSize: 12,
                        color: e.colorTextLabel,
                        '.anticon': { marginInlineEnd: 8 },
                      },
                    ),
                  ),
                  '&-group-divider',
                  { color: e.colorTextSecondary, fontSize: 12, lineHeight: 20 },
                ),
              ),
              t.includes('horizontal')
                ? {}
                : (0, m.Z)(
                    {},
                    ''
                      .concat(e.antCls, '-menu-submenu')
                      .concat(e.antCls, '-menu-submenu-popup'),
                    (0, m.Z)({}, ''.concat(e.componentCls, '-item-title'), {
                      alignItems: 'flex-start',
                    }),
                  ),
            ),
            {},
            (0, m.Z)({}, ''.concat(e.antCls, '-menu-submenu-popup'), {
              backgroundColor: 'rgba(255, 255, 255, 0.42)',
              '-webkit-backdrop-filter': 'blur(8px)',
              backdropFilter: 'blur(8px)',
            }),
          );
        };
      var Sn = function (e) {
          var t = (0, p.useState)(e.collapsed),
            n = (0, g.Z)(t, 2),
            o = n[0],
            r = n[1],
            i = (0, p.useState)(!1),
            a = (0, g.Z)(i, 2),
            l = a[0],
            c = a[1];
          return (
            (0, p.useEffect)(
              function () {
                c(!1),
                  setTimeout(function () {
                    r(e.collapsed);
                  }, 400);
              },
              [e.collapsed],
            ),
            e.disable
              ? e.children
              : (0, Bt.jsx)(En.Z, {
                  title: e.title,
                  open: !(!o || !e.collapsed) && l,
                  placement: 'right',
                  onOpenChange: c,
                  children: e.children,
                })
          );
        },
        wn = bn({ scriptUrl: Mn.iconfontUrl }),
        Bn = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 'icon-',
            n = arguments.length > 2 ? arguments[2] : void 0;
          if ('string' == typeof e && '' !== e) {
            if (Xt(e) || kn(e))
              return (0, Bt.jsx)(
                'img',
                { width: 16, src: e, alt: 'icon', className: n },
                e,
              );
            if (e.startsWith(t)) return (0, Bt.jsx)(wn, { type: e });
          }
          return e;
        },
        In = function (e) {
          return e && 'string' == typeof e
            ? e.substring(0, 1).toUpperCase()
            : null;
        },
        Fn = (0, et.Z)(function e(t) {
          var n = this;
          (0, Je.Z)(this, e),
            (0, m.Z)(this, 'props', void 0),
            (0, m.Z)(this, 'getNavMenuItems', function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : [],
                t = arguments.length > 1 ? arguments[1] : void 0,
                o = arguments.length > 2 ? arguments[2] : void 0;
              return e
                .map(function (e) {
                  return n.getSubMenuOrItem(e, t, o);
                })
                .filter(function (e) {
                  return e;
                })
                .flat(1);
            }),
            (0, m.Z)(this, 'getSubMenuOrItem', function (e, t, o) {
              var r = n.props,
                i = r.subMenuItemRender,
                a = r.baseClassName,
                l = r.prefixCls,
                c = r.collapsed,
                s = r.menu,
                d = r.iconPrefixes,
                u = r.layout,
                p = 'group' === (null == s ? void 0 : s.type) && 'top' !== u,
                h = n.props.token,
                f = n.getIntlName(e),
                v =
                  (null == e ? void 0 : e.children) ||
                  (null == e ? void 0 : e.routes),
                g = p && 0 === t ? 'group' : void 0;
              if (Array.isArray(v) && v.length > 0) {
                var x,
                  C,
                  b,
                  k,
                  E,
                  Z = 0 === t || (p && 1 === t),
                  M = Bn(
                    e.icon,
                    d,
                    ''
                      .concat(a, '-icon ')
                      .concat(
                        null === (x = n.props) || void 0 === x
                          ? void 0
                          : x.hashId,
                      ),
                  ),
                  j = c && Z ? In(f) : null,
                  S = (0, Bt.jsxs)('div', {
                    className: Ae()(
                      ''.concat(a, '-item-title'),
                      null === (C = n.props) || void 0 === C
                        ? void 0
                        : C.hashId,
                      (0, m.Z)(
                        (0, m.Z)(
                          (0, m.Z)(
                            (0, m.Z)(
                              {},
                              ''.concat(a, '-item-title-collapsed'),
                              c,
                            ),
                            ''
                              .concat(a, '-item-title-collapsed-level-')
                              .concat(o),
                            c,
                          ),
                          ''.concat(a, '-group-item-title'),
                          'group' === g,
                        ),
                        ''.concat(a, '-item-collapsed-show-title'),
                        (null == s ? void 0 : s.collapsedShowTitle) && c,
                      ),
                    ),
                    children: [
                      'group' === g && c
                        ? null
                        : Z && M
                        ? (0, Bt.jsx)('span', {
                            className: ''
                              .concat(a, '-item-icon ')
                              .concat(
                                null === (b = n.props) || void 0 === b
                                  ? void 0
                                  : b.hashId,
                              )
                              .trim(),
                            children: M,
                          })
                        : j,
                      (0, Bt.jsx)('span', {
                        className: Ae()(
                          ''.concat(a, '-item-text'),
                          null === (k = n.props) || void 0 === k
                            ? void 0
                            : k.hashId,
                          (0, m.Z)(
                            {},
                            ''.concat(a, '-item-text-has-icon'),
                            'group' !== g && Z && (M || j),
                          ),
                        ),
                        children: f,
                      }),
                    ],
                  }),
                  w = i
                    ? i(
                        (0, y.Z)((0, y.Z)({}, e), {}, { isUrl: !1 }),
                        S,
                        n.props,
                      )
                    : S;
                if (
                  p &&
                  0 === t &&
                  n.props.collapsed &&
                  !s.collapsedShowGroupTitle
                )
                  return n.getNavMenuItems(v, t + 1, t);
                var B = n.getNavMenuItems(
                  v,
                  t + 1,
                  p && 0 === t && n.props.collapsed ? t : t + 1,
                );
                return [
                  {
                    type: g,
                    key: e.key || e.path,
                    label: w,
                    onClick: p ? void 0 : e.onTitleClick,
                    children: B,
                    className: Ae()(
                      (0, m.Z)(
                        (0, m.Z)(
                          (0, m.Z)({}, ''.concat(a, '-group'), 'group' === g),
                          ''.concat(a, '-submenu'),
                          'group' !== g,
                        ),
                        ''.concat(a, '-submenu-has-icon'),
                        'group' !== g && Z && M,
                      ),
                    ),
                  },
                  p && 0 === t
                    ? {
                        type: 'divider',
                        prefixCls: l,
                        className: ''.concat(a, '-divider'),
                        key: (e.key || e.path) + '-group-divider',
                        style: {
                          padding: 0,
                          borderBlockEnd: 0,
                          margin: n.props.collapsed ? '4px' : '6px 16px',
                          marginBlockStart: n.props.collapsed ? 4 : 8,
                          borderColor:
                            null == h ||
                            null === (E = h.layout) ||
                            void 0 === E ||
                            null === (E = E.sider) ||
                            void 0 === E
                              ? void 0
                              : E.colorMenuItemDivider,
                        },
                      }
                    : void 0,
                ].filter(Boolean);
              }
              return {
                className: ''.concat(a, '-menu-item'),
                disabled: e.disabled,
                key: e.key || e.path,
                onClick: e.onTitleClick,
                label: n.getMenuItemPath(e, t, o),
              };
            }),
            (0, m.Z)(this, 'getIntlName', function (e) {
              var t = e.name,
                o = e.locale,
                r = n.props,
                i = r.menu,
                a = r.formatMessage,
                l = t;
              return (
                o &&
                  !1 !== (null == i ? void 0 : i.locale) &&
                  (l = null == a ? void 0 : a({ id: o, defaultMessage: t })),
                n.props.menuTextRender
                  ? n.props.menuTextRender(e, l, n.props)
                  : l
              );
            }),
            (0, m.Z)(this, 'getMenuItemPath', function (e, t, o) {
              var r,
                i,
                a,
                l,
                c,
                s,
                d,
                u = n.conversionPath(e.path || '/'),
                p = n.props,
                h = p.location,
                f = void 0 === h ? { pathname: '/' } : h,
                v = p.isMobile,
                g = p.onCollapse,
                x = p.menuItemRender,
                C = p.iconPrefixes,
                b = n.getIntlName(e),
                k = n.props,
                E = k.baseClassName,
                Z = k.menu,
                M = k.collapsed,
                j = 'group' === (null == Z ? void 0 : Z.type),
                S = 0 === t || (j && 1 === t),
                w = S
                  ? Bn(
                      e.icon,
                      C,
                      ''
                        .concat(E, '-icon ')
                        .concat(
                          null === (r = n.props) || void 0 === r
                            ? void 0
                            : r.hashId,
                        ),
                    )
                  : null,
                B = M && S ? In(b) : null,
                I = (0, Bt.jsxs)(
                  'div',
                  {
                    className: Ae()(
                      ''.concat(E, '-item-title'),
                      null === (i = n.props) || void 0 === i
                        ? void 0
                        : i.hashId,
                      (0, m.Z)(
                        (0, m.Z)(
                          (0, m.Z)(
                            {},
                            ''.concat(E, '-item-title-collapsed'),
                            M,
                          ),
                          ''
                            .concat(E, '-item-title-collapsed-level-')
                            .concat(o),
                          M,
                        ),
                        ''.concat(E, '-item-collapsed-show-title'),
                        (null == Z ? void 0 : Z.collapsedShowTitle) && M,
                      ),
                    ),
                    children: [
                      (0, Bt.jsx)('span', {
                        className: ''
                          .concat(E, '-item-icon ')
                          .concat(
                            null === (a = n.props) || void 0 === a
                              ? void 0
                              : a.hashId,
                          )
                          .trim(),
                        style: { display: null !== B || w ? '' : 'none' },
                        children:
                          w ||
                          (0, Bt.jsx)('span', {
                            className: 'anticon',
                            children: B,
                          }),
                      }),
                      (0, Bt.jsx)('span', {
                        className: Ae()(
                          ''.concat(E, '-item-text'),
                          null === (l = n.props) || void 0 === l
                            ? void 0
                            : l.hashId,
                          (0, m.Z)(
                            {},
                            ''.concat(E, '-item-text-has-icon'),
                            S && (w || B),
                          ),
                        ),
                        children: b,
                      }),
                    ],
                  },
                  u,
                ),
                F = Xt(u);
              F &&
                (I = (0, Bt.jsxs)(
                  'span',
                  {
                    onClick: function () {
                      var e, t;
                      null === (e = window) ||
                        void 0 === e ||
                        null === (t = e.open) ||
                        void 0 === t ||
                        t.call(e, u, '_blank');
                    },
                    className: Ae()(
                      ''.concat(E, '-item-title'),
                      null === (c = n.props) || void 0 === c
                        ? void 0
                        : c.hashId,
                      (0, m.Z)(
                        (0, m.Z)(
                          (0, m.Z)(
                            (0, m.Z)(
                              {},
                              ''.concat(E, '-item-title-collapsed'),
                              M,
                            ),
                            ''
                              .concat(E, '-item-title-collapsed-level-')
                              .concat(o),
                            M,
                          ),
                          ''.concat(E, '-item-link'),
                          !0,
                        ),
                        ''.concat(E, '-item-collapsed-show-title'),
                        (null == Z ? void 0 : Z.collapsedShowTitle) && M,
                      ),
                    ),
                    children: [
                      (0, Bt.jsx)('span', {
                        className: ''
                          .concat(E, '-item-icon ')
                          .concat(
                            null === (s = n.props) || void 0 === s
                              ? void 0
                              : s.hashId,
                          )
                          .trim(),
                        style: { display: null !== B || w ? '' : 'none' },
                        children:
                          w ||
                          (0, Bt.jsx)('span', {
                            className: 'anticon',
                            children: B,
                          }),
                      }),
                      (0, Bt.jsx)('span', {
                        className: Ae()(
                          ''.concat(E, '-item-text'),
                          null === (d = n.props) || void 0 === d
                            ? void 0
                            : d.hashId,
                          (0, m.Z)(
                            {},
                            ''.concat(E, '-item-text-has-icon'),
                            S && (w || B),
                          ),
                        ),
                        children: b,
                      }),
                    ],
                  },
                  u,
                ));
              if (x) {
                var L = (0, y.Z)(
                  (0, y.Z)({}, e),
                  {},
                  {
                    isUrl: F,
                    itemPath: u,
                    isMobile: v,
                    replace: u === f.pathname,
                    onClick: function () {
                      return g && g(!0);
                    },
                    children: void 0,
                  },
                );
                return 0 === t
                  ? (0, Bt.jsx)(Sn, {
                      collapsed: M,
                      title: b,
                      disable: e.disabledTooltip,
                      children: x(L, I, n.props),
                    })
                  : x(L, I, n.props);
              }
              return 0 === t
                ? (0, Bt.jsx)(Sn, {
                    collapsed: M,
                    title: b,
                    disable: e.disabledTooltip,
                    children: I,
                  })
                : I;
            }),
            (0, m.Z)(this, 'conversionPath', function (e) {
              return e && 0 === e.indexOf('http')
                ? e
                : '/'.concat(e || '').replace(/\/+/g, '/');
            }),
            (this.props = t);
        }),
        Ln = function (e) {
          var t = e.mode,
            n = e.className,
            o = e.handleOpenChange,
            r = e.style,
            i = e.menuData,
            a = e.prefixCls,
            l = e.menu,
            c = e.matchMenuKeys,
            s = e.iconfontUrl,
            d = e.selectedKeys,
            u = e.onSelect,
            h = e.menuRenderType,
            f = e.openKeys,
            v = (0, p.useContext)(x.L_),
            b = v.dark,
            k = v.token,
            E = ''.concat(a, '-base-menu-').concat(t),
            Z = (0, p.useRef)([]),
            M = (0, C.Z)(null == l ? void 0 : l.defaultOpenAll),
            j = (0, g.Z)(M, 2),
            S = j[0],
            w = j[1],
            B = (0, C.Z)(
              function () {
                return null != l && l.defaultOpenAll
                  ? Ot(i) || []
                  : !1 !== f && [];
              },
              { value: !1 === f ? void 0 : f, onChange: o },
            ),
            I = (0, g.Z)(B, 2),
            F = I[0],
            L = I[1],
            A = (0, C.Z)([], {
              value: d,
              onChange: u
                ? function (e) {
                    u && e && u(e);
                  }
                : void 0,
            }),
            R = (0, g.Z)(A, 2),
            N = R[0],
            T = R[1];
          (0, p.useEffect)(
            function () {
              (null != l && l.defaultOpenAll) ||
                !1 === f ||
                (c && (L(c), T(c)));
            },
            [c.join('-')],
          ),
            (0, p.useEffect)(
              function () {
                s && (wn = bn({ scriptUrl: s }));
              },
              [s],
            ),
            (0, p.useEffect)(
              function () {
                if (
                  (c.join('-') !== (N || []).join('-') && T(c),
                  S || !1 === f || c.join('-') === (F || []).join('-'))
                )
                  null != l && l.ignoreFlatMenu && S ? L(Ot(i)) : w(!1);
                else {
                  var e = c;
                  !1 === (null == l ? void 0 : l.autoClose) &&
                    (e = Array.from(
                      new Set([].concat((0, Fe.Z)(c), (0, Fe.Z)(F || []))),
                    )),
                    L(e);
                }
              },
              [c.join('-')],
            );
          var H = (0, p.useMemo)(
              function () {
                return (function (e, t) {
                  var n = t.layout,
                    o = t.collapsed,
                    r = {};
                  return (
                    e &&
                      !o &&
                      ['side', 'mix'].includes(n || 'mix') &&
                      (r = { openKeys: e }),
                    r
                  );
                })(F, e);
              },
              [F && F.join(','), e.layout, e.collapsed],
            ),
            z = (function (e, t) {
              return (0, Tt.Xj)('ProLayoutBaseMenu' + t, function (n) {
                var o = (0, y.Z)(
                  (0, y.Z)({}, n),
                  {},
                  { componentCls: '.'.concat(e) },
                );
                return [jn(o, t || 'inline')];
              });
            })(E, t),
            D = z.wrapSSR,
            P = z.hashId,
            O = (0, p.useMemo)(
              function () {
                return new Fn(
                  (0, y.Z)(
                    (0, y.Z)({}, e),
                    {},
                    {
                      token: k,
                      menuRenderType: h,
                      baseClassName: E,
                      hashId: P,
                    },
                  ),
                );
              },
              [e, k, h, E, P],
            );
          if (null != l && l.loading)
            return (0, Bt.jsx)('div', {
              style:
                null != t && t.includes('inline')
                  ? { padding: 24 }
                  : { marginBlockStart: 16 },
              children: (0, Bt.jsx)(Zn.Z, {
                active: !0,
                title: !1,
                paragraph: { rows: null != t && t.includes('inline') ? 6 : 1 },
              }),
            });
          !1 !== e.openKeys || e.handleOpenChange || (Z.current = c);
          var W = e.postMenuData ? e.postMenuData(i) : i;
          return W && (null == W ? void 0 : W.length) < 1
            ? null
            : D(
                (0, p.createElement)(
                  an.Z,
                  (0, y.Z)(
                    (0, y.Z)({}, H),
                    {},
                    {
                      _internalDisableMenuItemTitleTooltip: !0,
                      key: 'Menu',
                      mode: t,
                      inlineIndent: 16,
                      defaultOpenKeys: Z.current,
                      theme: b ? 'dark' : 'light',
                      selectedKeys: N,
                      style: (0, y.Z)(
                        { backgroundColor: 'transparent', border: 'none' },
                        r,
                      ),
                      className: Ae()(
                        n,
                        P,
                        E,
                        (0, m.Z)(
                          (0, m.Z)(
                            {},
                            ''.concat(E, '-horizontal'),
                            'horizontal' === t,
                          ),
                          ''.concat(E, '-collapsed'),
                          e.collapsed,
                        ),
                      ),
                      items: O.getNavMenuItems(W, 0, 0),
                      onOpenChange: function (t) {
                        e.collapsed || L(t);
                      },
                    },
                    e.menuProps,
                  ),
                ),
              );
        };
      var An = ['title', 'render'],
        Rn = p.memo(function (e) {
          return (0, Bt.jsx)(Bt.Fragment, { children: e.children });
        }),
        Nn = Xe.Sider,
        Tn = Xe._InternalSiderContext,
        Hn = void 0 === Tn ? { Provider: Rn } : Tn,
        zn = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 'menuHeaderRender',
            n = e.logo,
            o = e.title,
            r = e.layout,
            i = e[t];
          if (!1 === i) return null;
          var a = tn(n),
            l = (0, Bt.jsx)('h1', {
              children: null != o ? o : 'Ant Design Pro',
            });
          return i
            ? i(a, e.collapsed ? null : l, e)
            : e.isMobile
            ? null
            : ('mix' !== r || 'menuHeaderRender' !== t) &&
              (e.collapsed
                ? (0, Bt.jsx)('a', { children: a }, 'title')
                : (0, Bt.jsxs)('a', { children: [a, l] }, 'title'));
        },
        Dn = function (e) {
          var t,
            n = e.collapsed,
            o = e.originCollapsed,
            r = e.fixSiderbar,
            i = e.menuFooterRender,
            a = e.onCollapse,
            l = e.theme,
            c = e.siderWidth,
            s = e.isMobile,
            d = e.onMenuHeaderClick,
            u = e.breakpoint,
            h = void 0 === u ? 'lg' : u,
            f = e.style,
            g = e.layout,
            C = e.menuExtraRender,
            b = void 0 !== C && C,
            k = e.links,
            E = e.menuContentRender,
            Z = e.collapsedButtonRender,
            M = e.prefixCls,
            j = e.avatarProps,
            S = e.rightContentRender,
            w = e.actionsRender,
            B = e.onOpenChange,
            I = e.stylish,
            F = e.logoStyle,
            L = (0, p.useContext)(x.L_).hashId,
            A = (0, p.useMemo)(
              function () {
                return !s && 'mix' !== g;
              },
              [s, g],
            ),
            R = ''.concat(M, '-sider'),
            N = 64,
            T = (function (e, t) {
              var n = t.stylish,
                o = t.proLayoutCollapsedWidth;
              return (0, Tt.Xj)('ProLayoutSiderMenuStylish', function (t) {
                var r = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e), proLayoutCollapsedWidth: o },
                );
                return n
                  ? [
                      (0, m.Z)(
                        {},
                        'div'.concat(t.proComponentsCls, '-layout'),
                        (0, m.Z)(
                          {},
                          ''.concat(r.componentCls),
                          null == n ? void 0 : n(r),
                        ),
                      ),
                    ]
                  : [];
              });
            })(''.concat(R, '.').concat(R, '-stylish'), {
              stylish: I,
              proLayoutCollapsedWidth: N,
            }),
            H = Ae()(
              ''.concat(R),
              L,
              (0, m.Z)(
                (0, m.Z)(
                  (0, m.Z)(
                    (0, m.Z)(
                      (0, m.Z)(
                        (0, m.Z)(
                          (0, m.Z)({}, ''.concat(R, '-fixed'), r),
                          ''.concat(R, '-fixed-mix'),
                          'mix' === g && !s && r,
                        ),
                        ''.concat(R, '-collapsed'),
                        e.collapsed,
                      ),
                      ''.concat(R, '-layout-').concat(g),
                      g && !s,
                    ),
                    ''.concat(R, '-light'),
                    'dark' !== l,
                  ),
                  ''.concat(R, '-mix'),
                  'mix' === g && !s,
                ),
                ''.concat(R, '-stylish'),
                !!I,
              ),
            ),
            z = zn(e),
            D = b && b(e),
            P = (0, p.useMemo)(
              function () {
                return (
                  !1 !== E &&
                  (0, p.createElement)(
                    Ln,
                    (0, y.Z)(
                      (0, y.Z)({}, e),
                      {},
                      {
                        key: 'base-menu',
                        mode: n && !s ? 'vertical' : 'inline',
                        handleOpenChange: B,
                        style: { width: '100%' },
                        className: ''.concat(R, '-menu ').concat(L).trim(),
                      },
                    ),
                  )
                );
              },
              [R, L, E, B, e],
            ),
            O = (k || []).map(function (e, t) {
              return { className: ''.concat(R, '-link'), label: e, key: t };
            }),
            W = (0, p.useMemo)(
              function () {
                return E ? E(e, P) : P;
              },
              [E, P, e],
            ),
            $ = (0, p.useMemo)(
              function () {
                if (!j) return null;
                var t = j.title,
                  o = j.render,
                  r = (0, v.Z)(j, An),
                  i = (0, Bt.jsxs)('div', {
                    className: ''.concat(R, '-actions-avatar'),
                    children: [
                      (null != r && r.src) ||
                      (null != r && r.srcSet) ||
                      r.icon ||
                      r.children
                        ? (0, Bt.jsx)(on.Z, (0, y.Z)({ size: 28 }, r))
                        : null,
                      j.title && !n && (0, Bt.jsx)('span', { children: t }),
                    ],
                  });
                return o ? o(j, i, e) : i;
              },
              [j, R, n],
            ),
            _ = (0, p.useMemo)(
              function () {
                return w
                  ? (0, Bt.jsx)(rn.Z, {
                      align: 'center',
                      size: 4,
                      direction: n ? 'vertical' : 'horizontal',
                      className: Ae()([
                        ''.concat(R, '-actions-list'),
                        n && ''.concat(R, '-actions-list-collapsed'),
                        L,
                      ]),
                      children: [null == w ? void 0 : w(e)]
                        .flat(1)
                        .map(function (e, t) {
                          return (0,
                          Bt.jsx)('div', { className: ''.concat(R, '-actions-list-item ').concat(L).trim(), children: e }, t);
                        }),
                    })
                  : null;
              },
              [w, R, n],
            ),
            G = (0, p.useMemo)(
              function () {
                return (0, Bt.jsx)(nn, {
                  onItemClick: e.itemClick,
                  appListRender: e.appListRender,
                  appList: e.appList,
                  prefixCls: e.prefixCls,
                });
              },
              [e.appList, e.appListRender, e.prefixCls],
            ),
            V = (0, p.useMemo)(
              function () {
                if (!1 === Z) return null;
                var e = (0, Bt.jsx)(dn, {
                  isMobile: s,
                  collapsed: o,
                  className: ''.concat(R, '-collapsed-button'),
                  onClick: function () {
                    null == a || a(!o);
                  },
                });
                return Z ? Z(n, e) : e;
              },
              [Z, s, o, R, n, a],
            ),
            K = (0, p.useMemo)(
              function () {
                return $ || _
                  ? (0, Bt.jsxs)('div', {
                      className: Ae()(
                        ''.concat(R, '-actions'),
                        L,
                        n && ''.concat(R, '-actions-collapsed'),
                      ),
                      children: [$, _],
                    })
                  : null;
              },
              [_, $, R, n, L],
            ),
            U = (0, p.useMemo)(
              function () {
                var t;
                return null != e &&
                  null !== (t = e.menu) &&
                  void 0 !== t &&
                  t.hideMenuWhenCollapsed &&
                  n
                  ? ''.concat(R, '-hide-menu-collapsed')
                  : null;
              },
              [
                R,
                n,
                null == e || null === (t = e.menu) || void 0 === t
                  ? void 0
                  : t.hideMenuWhenCollapsed,
              ],
            ),
            X = i && (null == i ? void 0 : i(e)),
            q = (0, Bt.jsxs)(Bt.Fragment, {
              children: [
                z &&
                  (0, Bt.jsxs)('div', {
                    className: Ae()([
                      Ae()(
                        ''.concat(R, '-logo'),
                        L,
                        (0, m.Z)({}, ''.concat(R, '-logo-collapsed'), n),
                      ),
                    ]),
                    onClick: A ? d : void 0,
                    id: 'logo',
                    style: F,
                    children: [z, G],
                  }),
                D &&
                  (0, Bt.jsx)('div', {
                    className: Ae()([
                      ''.concat(R, '-extra'),
                      !z && ''.concat(R, '-extra-no-logo'),
                      L,
                    ]),
                    children: D,
                  }),
                (0, Bt.jsx)('div', {
                  style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' },
                  children: W,
                }),
                (0, Bt.jsxs)(Hn.Provider, {
                  value: {},
                  children: [
                    k
                      ? (0, Bt.jsx)('div', {
                          className: ''.concat(R, '-links ').concat(L).trim(),
                          children: (0, Bt.jsx)(an.Z, {
                            inlineIndent: 16,
                            className: ''
                              .concat(R, '-link-menu ')
                              .concat(L)
                              .trim(),
                            selectedKeys: [],
                            openKeys: [],
                            theme: l,
                            mode: 'inline',
                            items: O,
                          }),
                        })
                      : null,
                    A &&
                      (0, Bt.jsxs)(Bt.Fragment, {
                        children: [
                          K,
                          !_ && S
                            ? (0, Bt.jsx)('div', {
                                className: Ae()(
                                  ''.concat(R, '-actions'),
                                  L,
                                  (0, m.Z)(
                                    {},
                                    ''.concat(R, '-actions-collapsed'),
                                    n,
                                  ),
                                ),
                                children: null == S ? void 0 : S(e),
                              })
                            : null,
                        ],
                      }),
                    X &&
                      (0, Bt.jsx)('div', {
                        className: Ae()([
                          ''.concat(R, '-footer'),
                          L,
                          (0, m.Z)({}, ''.concat(R, '-footer-collapsed'), n),
                        ]),
                        children: X,
                      }),
                  ],
                }),
              ],
            });
          return T.wrapSSR(
            (0, Bt.jsxs)(Bt.Fragment, {
              children: [
                r &&
                  !s &&
                  !U &&
                  (0, Bt.jsx)('div', {
                    style: (0, y.Z)(
                      {
                        width: n ? N : c,
                        overflow: 'hidden',
                        flex: '0 0 '.concat(n ? N : c, 'px'),
                        maxWidth: n ? N : c,
                        minWidth: n ? N : c,
                        transition: 'all 0.2s ease 0s',
                      },
                      f,
                    ),
                  }),
                (0, Bt.jsxs)(Nn, {
                  collapsible: !0,
                  trigger: null,
                  collapsed: n,
                  breakpoint: !1 === h ? void 0 : h,
                  onCollapse: function (e) {
                    s || null == a || a(e);
                  },
                  collapsedWidth: N,
                  style: f,
                  theme: l,
                  width: c,
                  className: Ae()(H, L, U),
                  children: [
                    U
                      ? (0, Bt.jsx)('div', {
                          className: ''
                            .concat(R, '-hide-when-collapsed ')
                            .concat(L)
                            .trim(),
                          style: {
                            height: '100%',
                            width: '100%',
                            opacity: U ? 0 : 1,
                          },
                          children: q,
                        })
                      : q,
                    V,
                  ],
                }),
              ],
            }),
          );
        };
      function Pn(e, t) {
        var n,
          o,
          r =
            ((n = e),
            ((o = (0, p.useRef)(null)).current = n),
            (0, p.useCallback)(function () {
              for (
                var e, t = arguments.length, n = new Array(t), r = 0;
                r < t;
                r++
              )
                n[r] = arguments[r];
              return null === (e = o.current) || void 0 === e
                ? void 0
                : e.call.apply(e, [o].concat((0, Fe.Z)(n)));
            }, [])),
          i = (0, p.useRef)(),
          a = (0, p.useCallback)(function () {
            i.current && (clearTimeout(i.current), (i.current = null));
          }, []),
          l = (0, p.useCallback)(
            (0, f.Z)(
              (0, h.Z)().mark(function e() {
                var n,
                  o,
                  l,
                  c = arguments;
                return (0, h.Z)().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        for (n = c.length, o = new Array(n), l = 0; l < n; l++)
                          o[l] = c[l];
                        if (0 !== t && void 0 !== t) {
                          e.next = 3;
                          break;
                        }
                        return e.abrupt('return', r.apply(void 0, o));
                      case 3:
                        return (
                          a(),
                          e.abrupt(
                            'return',
                            new Promise(function (e) {
                              i.current = setTimeout(
                                (0, f.Z)(
                                  (0, h.Z)().mark(function t() {
                                    return (0, h.Z)().wrap(function (t) {
                                      for (;;)
                                        switch ((t.prev = t.next)) {
                                          case 0:
                                            return (
                                              (t.t0 = e),
                                              (t.next = 3),
                                              r.apply(void 0, o)
                                            );
                                          case 3:
                                            return (
                                              (t.t1 = t.sent),
                                              (0, t.t0)(t.t1),
                                              t.abrupt('return')
                                            );
                                          case 6:
                                          case 'end':
                                            return t.stop();
                                        }
                                    }, t);
                                  }),
                                ),
                                t,
                              );
                            }),
                          )
                        );
                      case 5:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              }),
            ),
            [r, a, t],
          );
        return (
          (0, p.useEffect)(
            function () {
              return a;
            },
            [a],
          ),
          { run: l, cancel: a }
        );
      }
      var On = n(5930),
        Wn = function (e) {
          var t, n, o, r, i;
          return (0, m.Z)({}, e.componentCls, {
            '&-header-actions': {
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              '&-item': {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBlock: 0,
                paddingInline: 2,
                color:
                  null === (t = e.layout) ||
                  void 0 === t ||
                  null === (t = t.header) ||
                  void 0 === t
                    ? void 0
                    : t.colorTextRightActionsItem,
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: e.borderRadius,
                '> *': {
                  paddingInline: 6,
                  paddingBlock: 6,
                  borderRadius: e.borderRadius,
                  '&:hover': {
                    backgroundColor:
                      null === (n = e.layout) ||
                      void 0 === n ||
                      null === (n = n.header) ||
                      void 0 === n
                        ? void 0
                        : n.colorBgRightActionsItemHover,
                  },
                },
              },
              '&-avatar': {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingInlineStart: e.padding,
                paddingInlineEnd: e.padding,
                cursor: 'pointer',
                color:
                  null === (o = e.layout) ||
                  void 0 === o ||
                  null === (o = o.header) ||
                  void 0 === o
                    ? void 0
                    : o.colorTextRightActionsItem,
                '> div': {
                  height: '44px',
                  color:
                    null === (r = e.layout) ||
                    void 0 === r ||
                    null === (r = r.header) ||
                    void 0 === r
                      ? void 0
                      : r.colorTextRightActionsItem,
                  paddingInline: 8,
                  paddingBlock: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  lineHeight: '44px',
                  borderRadius: e.borderRadius,
                  '&:hover': {
                    backgroundColor:
                      null === (i = e.layout) ||
                      void 0 === i ||
                      null === (i = i.header) ||
                      void 0 === i
                        ? void 0
                        : i.colorBgRightActionsItemHover,
                  },
                },
              },
            },
          });
        };
      var $n = [
          'rightContentRender',
          'avatarProps',
          'actionsRender',
          'headerContentRender',
        ],
        _n = ['title', 'render'],
        Gn = function (e) {
          var t = e.rightContentRender,
            n = e.avatarProps,
            o = e.actionsRender,
            r = (e.headerContentRender, (0, v.Z)(e, $n)),
            i = (0, p.useContext)(Ie.ZP.ConfigContext).getPrefixCls,
            a = ''.concat(i(), '-pro-global-header'),
            l = (function (e) {
              return (0, Tt.Xj)('ProLayoutRightContent', function (t) {
                var n = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e) },
                );
                return [Wn(n)];
              });
            })(a),
            c = l.wrapSSR,
            s = l.hashId,
            d = (0, p.useState)('auto'),
            u = (0, g.Z)(d, 2),
            x = u[0],
            C = u[1],
            b = (0, p.useMemo)(
              function () {
                if (!n) return null;
                var e = n.title,
                  t = n.render,
                  o = (0, v.Z)(n, _n),
                  i = [
                    (null != o && o.src) ||
                    (null != o && o.srcSet) ||
                    o.icon ||
                    o.children
                      ? (0, p.createElement)(
                          on.Z,
                          (0, y.Z)(
                            (0, y.Z)({}, o),
                            {},
                            { size: 28, key: 'avatar' },
                          ),
                        )
                      : null,
                    e
                      ? (0, Bt.jsx)(
                          'span',
                          { style: { marginInlineStart: 8 }, children: e },
                          'name',
                        )
                      : void 0,
                  ];
                return t
                  ? t(n, (0, Bt.jsx)('div', { children: i }), r)
                  : (0, Bt.jsx)('div', { children: i });
              },
              [n],
            ),
            k =
              o || b
                ? function (e) {
                    var t = o && (null == o ? void 0 : o(e));
                    return t || b
                      ? Array.isArray(t)
                        ? c(
                            (0, Bt.jsxs)('div', {
                              className: ''
                                .concat(a, '-header-actions ')
                                .concat(s)
                                .trim(),
                              children: [
                                t.filter(Boolean).map(function (e, t) {
                                  var n,
                                    o = !1;
                                  p.isValidElement(e) &&
                                    (o = !(
                                      null == e ||
                                      null === (n = e.props) ||
                                      void 0 === n ||
                                      !n['aria-hidden']
                                    ));
                                  return (0,
                                  Bt.jsx)('div', { className: Ae()(''.concat(a, '-header-actions-item ').concat(s), (0, m.Z)({}, ''.concat(a, '-header-actions-hover'), !o)), children: e }, t);
                                }),
                                b &&
                                  (0, Bt.jsx)('span', {
                                    className: ''
                                      .concat(a, '-header-actions-avatar ')
                                      .concat(s)
                                      .trim(),
                                    children: b,
                                  }),
                              ],
                            }),
                          )
                        : c(
                            (0, Bt.jsxs)('div', {
                              className: ''
                                .concat(a, '-header-actions ')
                                .concat(s)
                                .trim(),
                              children: [
                                t,
                                b &&
                                  (0, Bt.jsx)('span', {
                                    className: ''
                                      .concat(a, '-header-actions-avatar ')
                                      .concat(s)
                                      .trim(),
                                    children: b,
                                  }),
                              ],
                            }),
                          )
                      : null;
                  }
                : void 0,
            E = Pn(
              (function () {
                var e = (0, f.Z)(
                  (0, h.Z)().mark(function e(t) {
                    return (0, h.Z)().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            C(t);
                          case 1:
                          case 'end':
                            return e.stop();
                        }
                    }, e);
                  }),
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
              160,
            ),
            Z = k || t;
          return (0, Bt.jsx)('div', {
            className: ''.concat(a, '-right-content ').concat(s).trim(),
            style: { minWidth: x, height: '100%' },
            children: (0, Bt.jsx)('div', {
              style: { height: '100%' },
              children: (0, Bt.jsx)(On.Z, {
                onResize: function (e) {
                  var t = e.width;
                  E.run(t);
                },
                children: Z
                  ? (0, Bt.jsx)('div', {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        justifyContent: 'flex-end',
                      },
                      children: Z(
                        (0, y.Z)((0, y.Z)({}, r), {}, { rightContentSize: x }),
                      ),
                    })
                  : null,
              }),
            }),
          });
        },
        Vn = function (e) {
          var t, n;
          return (0, m.Z)({}, e.componentCls, {
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            '.anticon': { color: 'inherit' },
            '&-main': {
              display: 'flex',
              height: '100%',
              paddingInlineStart: '16px',
              '&-left': (0, m.Z)(
                { display: 'flex', alignItems: 'center' },
                ''.concat(e.proComponentsCls, '-layout-apps-icon'),
                { marginInlineEnd: 16, marginInlineStart: -8 },
              ),
            },
            '&-wide': { maxWidth: 1152, margin: '0 auto' },
            '&-logo': {
              position: 'relative',
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              overflow: 'hidden',
              '> *:first-child': {
                display: 'flex',
                alignItems: 'center',
                minHeight: '22px',
                fontSize: '22px',
              },
              '> *:first-child > img': {
                display: 'inline-block',
                height: '32px',
                verticalAlign: 'middle',
              },
              '> *:first-child > h1': {
                display: 'inline-block',
                marginBlock: 0,
                marginInline: 0,
                lineHeight: '24px',
                marginInlineStart: 6,
                fontWeight: '600',
                fontSize: '16px',
                color:
                  null === (t = e.layout) ||
                  void 0 === t ||
                  null === (t = t.header) ||
                  void 0 === t
                    ? void 0
                    : t.colorHeaderTitle,
                verticalAlign: 'top',
              },
            },
            '&-menu': {
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              paddingInline: 6,
              paddingBlock: 6,
              lineHeight: ''.concat(
                Math.max(
                  ((null === (n = e.layout) ||
                  void 0 === n ||
                  null === (n = n.header) ||
                  void 0 === n
                    ? void 0
                    : n.heightLayoutHeader) || 56) - 12,
                  40,
                ),
                'px',
              ),
            },
          });
        };
      var Kn = function (e) {
          var t,
            n,
            o,
            r,
            i,
            a,
            l,
            c = (0, p.useRef)(null),
            s = e.onMenuHeaderClick,
            d = e.contentWidth,
            u = e.rightContentRender,
            h = e.className,
            f = e.style,
            v = e.headerContentRender,
            g = e.layout,
            C = e.actionsRender,
            b = (0, p.useContext)(Ie.ZP.ConfigContext).getPrefixCls,
            k = (0, p.useContext)(x.L_).dark,
            E = ''.concat(e.prefixCls || b('pro'), '-top-nav-header'),
            Z = (function (e) {
              return (0, Tt.Xj)('ProLayoutTopNavHeader', function (t) {
                var n = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e) },
                );
                return [Vn(n)];
              });
            })(E),
            M = Z.wrapSSR,
            j = Z.hashId,
            S = void 0;
          void 0 !== e.menuHeaderRender
            ? (S = 'menuHeaderRender')
            : ('mix' !== g && 'top' !== g) || (S = 'headerTitleRender');
          var w = zn((0, y.Z)((0, y.Z)({}, e), {}, { collapsed: !1 }), S),
            B = (0, p.useContext)(x.L_).token,
            I = (0, p.useMemo)(
              function () {
                var t,
                  n,
                  o,
                  r,
                  i,
                  a,
                  l,
                  c,
                  s,
                  d,
                  u,
                  p,
                  m,
                  h = (0, Bt.jsx)(Ie.ZP, {
                    theme: {
                      hashed: (0, x.nu)(),
                      components: {
                        Layout: {
                          headerBg: 'transparent',
                          bodyBg: 'transparent',
                        },
                        Menu: (0, y.Z)(
                          {},
                          F({
                            colorItemBg:
                              (null === (t = B.layout) ||
                              void 0 === t ||
                              null === (t = t.header) ||
                              void 0 === t
                                ? void 0
                                : t.colorBgHeader) || 'transparent',
                            colorSubItemBg:
                              (null === (n = B.layout) ||
                              void 0 === n ||
                              null === (n = n.header) ||
                              void 0 === n
                                ? void 0
                                : n.colorBgHeader) || 'transparent',
                            radiusItem: B.borderRadius,
                            colorItemBgSelected:
                              (null === (o = B.layout) ||
                              void 0 === o ||
                              null === (o = o.header) ||
                              void 0 === o
                                ? void 0
                                : o.colorBgMenuItemSelected) ||
                              (null == B ? void 0 : B.colorBgTextHover),
                            itemHoverBg:
                              (null === (r = B.layout) ||
                              void 0 === r ||
                              null === (r = r.header) ||
                              void 0 === r
                                ? void 0
                                : r.colorBgMenuItemHover) ||
                              (null == B ? void 0 : B.colorBgTextHover),
                            colorItemBgSelectedHorizontal:
                              (null === (i = B.layout) ||
                              void 0 === i ||
                              null === (i = i.header) ||
                              void 0 === i
                                ? void 0
                                : i.colorBgMenuItemSelected) ||
                              (null == B ? void 0 : B.colorBgTextHover),
                            colorActiveBarWidth: 0,
                            colorActiveBarHeight: 0,
                            colorActiveBarBorderSize: 0,
                            colorItemText:
                              (null === (a = B.layout) ||
                              void 0 === a ||
                              null === (a = a.header) ||
                              void 0 === a
                                ? void 0
                                : a.colorTextMenu) ||
                              (null == B ? void 0 : B.colorTextSecondary),
                            colorItemTextHoverHorizontal:
                              (null === (l = B.layout) ||
                              void 0 === l ||
                              null === (l = l.header) ||
                              void 0 === l
                                ? void 0
                                : l.colorTextMenuActive) ||
                              (null == B ? void 0 : B.colorText),
                            colorItemTextSelectedHorizontal:
                              (null === (c = B.layout) ||
                              void 0 === c ||
                              null === (c = c.header) ||
                              void 0 === c
                                ? void 0
                                : c.colorTextMenuSelected) ||
                              (null == B ? void 0 : B.colorTextBase),
                            horizontalItemBorderRadius: 4,
                            colorItemTextHover:
                              (null === (s = B.layout) ||
                              void 0 === s ||
                              null === (s = s.header) ||
                              void 0 === s
                                ? void 0
                                : s.colorTextMenuActive) ||
                              'rgba(0, 0, 0, 0.85)',
                            horizontalItemHoverBg:
                              (null === (d = B.layout) ||
                              void 0 === d ||
                              null === (d = d.header) ||
                              void 0 === d
                                ? void 0
                                : d.colorBgMenuItemHover) ||
                              'rgba(0, 0, 0, 0.04)',
                            colorItemTextSelected:
                              (null === (u = B.layout) ||
                              void 0 === u ||
                              null === (u = u.header) ||
                              void 0 === u
                                ? void 0
                                : u.colorTextMenuSelected) ||
                              'rgba(0, 0, 0, 1)',
                            popupBg: null == B ? void 0 : B.colorBgElevated,
                            subMenuItemBg:
                              null == B ? void 0 : B.colorBgElevated,
                            darkSubMenuItemBg: 'transparent',
                            darkPopupBg: null == B ? void 0 : B.colorBgElevated,
                          }),
                        ),
                      },
                      token: {
                        colorBgElevated:
                          (null === (p = B.layout) ||
                          void 0 === p ||
                          null === (p = p.header) ||
                          void 0 === p
                            ? void 0
                            : p.colorBgHeader) || 'transparent',
                      },
                    },
                    children: (0, Bt.jsx)(
                      Ln,
                      (0, y.Z)(
                        (0, y.Z)(
                          (0, y.Z)({ theme: k ? 'dark' : 'light' }, e),
                          {},
                          {
                            className: ''
                              .concat(E, '-base-menu ')
                              .concat(j)
                              .trim(),
                          },
                          e.menuProps,
                        ),
                        {},
                        {
                          style: (0, y.Z)(
                            { width: '100%' },
                            null === (m = e.menuProps) || void 0 === m
                              ? void 0
                              : m.style,
                          ),
                          collapsed: !1,
                          menuRenderType: 'header',
                          mode: 'horizontal',
                        },
                      ),
                    ),
                  });
                return v ? v(e, h) : h;
              },
              [
                null === (t = B.layout) ||
                void 0 === t ||
                null === (t = t.header) ||
                void 0 === t
                  ? void 0
                  : t.colorBgHeader,
                null === (n = B.layout) ||
                void 0 === n ||
                null === (n = n.header) ||
                void 0 === n
                  ? void 0
                  : n.colorBgMenuItemSelected,
                null === (o = B.layout) ||
                void 0 === o ||
                null === (o = o.header) ||
                void 0 === o
                  ? void 0
                  : o.colorBgMenuItemHover,
                null === (r = B.layout) ||
                void 0 === r ||
                null === (r = r.header) ||
                void 0 === r
                  ? void 0
                  : r.colorTextMenu,
                null === (i = B.layout) ||
                void 0 === i ||
                null === (i = i.header) ||
                void 0 === i
                  ? void 0
                  : i.colorTextMenuActive,
                null === (a = B.layout) ||
                void 0 === a ||
                null === (a = a.header) ||
                void 0 === a
                  ? void 0
                  : a.colorTextMenuSelected,
                null === (l = B.layout) ||
                void 0 === l ||
                null === (l = l.header) ||
                void 0 === l
                  ? void 0
                  : l.colorBgMenuElevated,
                B.borderRadius,
                null == B ? void 0 : B.colorBgTextHover,
                null == B ? void 0 : B.colorTextSecondary,
                null == B ? void 0 : B.colorText,
                null == B ? void 0 : B.colorTextBase,
                B.colorBgElevated,
                k,
                e,
                E,
                j,
                v,
              ],
            );
          return M(
            (0, Bt.jsx)('div', {
              className: Ae()(
                E,
                j,
                h,
                (0, m.Z)({}, ''.concat(E, '-light'), !0),
              ),
              style: f,
              children: (0, Bt.jsxs)('div', {
                ref: c,
                className: Ae()(
                  ''.concat(E, '-main'),
                  j,
                  (0, m.Z)(
                    {},
                    ''.concat(E, '-wide'),
                    'Fixed' === d && 'top' === g,
                  ),
                ),
                children: [
                  w &&
                    (0, Bt.jsxs)('div', {
                      className: Ae()(''.concat(E, '-main-left ').concat(j)),
                      onClick: s,
                      children: [
                        (0, Bt.jsx)(nn, (0, y.Z)({}, e)),
                        (0, Bt.jsx)(
                          'div',
                          {
                            className: ''.concat(E, '-logo ').concat(j).trim(),
                            id: 'logo',
                            children: w,
                          },
                          'logo',
                        ),
                      ],
                    }),
                  (0, Bt.jsx)('div', {
                    style: { flex: 1 },
                    className: ''.concat(E, '-menu ').concat(j).trim(),
                    children: I,
                  }),
                  (u || C || e.avatarProps) &&
                    (0, Bt.jsx)(
                      Gn,
                      (0, y.Z)(
                        (0, y.Z)({ rightContentRender: u }, e),
                        {},
                        { prefixCls: E },
                      ),
                    ),
                ],
              }),
            }),
          );
        },
        Un = function (e) {
          var t, n, o;
          return (0, m.Z)(
            {},
            e.componentCls,
            (0, m.Z)(
              (0, m.Z)(
                (0, m.Z)(
                  (0, m.Z)(
                    {
                      position: 'relative',
                      background: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      marginBlock: 0,
                      marginInline: 16,
                      height:
                        (null === (t = e.layout) ||
                        void 0 === t ||
                        null === (t = t.header) ||
                        void 0 === t
                          ? void 0
                          : t.heightLayoutHeader) || 56,
                      boxSizing: 'border-box',
                      '> a': { height: '100%' },
                    },
                    ''.concat(e.proComponentsCls, '-layout-apps-icon'),
                    { marginInlineEnd: 16 },
                  ),
                  '&-collapsed-button',
                  {
                    minHeight: '22px',
                    color:
                      null === (n = e.layout) ||
                      void 0 === n ||
                      null === (n = n.header) ||
                      void 0 === n
                        ? void 0
                        : n.colorHeaderTitle,
                    fontSize: '18px',
                    marginInlineEnd: '16px',
                  },
                ),
                '&-logo',
                {
                  position: 'relative',
                  marginInlineEnd: '16px',
                  a: {
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    minHeight: '22px',
                    fontSize: '20px',
                  },
                  img: { height: '28px' },
                  h1: {
                    height: '32px',
                    marginBlock: 0,
                    marginInline: 0,
                    marginInlineStart: 8,
                    fontWeight: '600',
                    color:
                      (null === (o = e.layout) ||
                      void 0 === o ||
                      null === (o = o.header) ||
                      void 0 === o
                        ? void 0
                        : o.colorHeaderTitle) || e.colorTextHeading,
                    fontSize: '18px',
                    lineHeight: '32px',
                  },
                  '&-mix': { display: 'flex', alignItems: 'center' },
                },
              ),
              '&-logo-mobile',
              { minWidth: '24px', marginInlineEnd: 0 },
            ),
          );
        };
      var Xn = function (e, t) {
          return !1 === e ? null : e ? e(t, null) : t;
        },
        qn = function (e) {
          var t = e.isMobile,
            n = e.logo,
            o = e.collapsed,
            r = e.onCollapse,
            i = e.rightContentRender,
            a = e.menuHeaderRender,
            l = e.onMenuHeaderClick,
            c = e.className,
            s = e.style,
            d = e.layout,
            u = e.children,
            h = e.splitMenus,
            f = e.menuData,
            v = e.prefixCls,
            g = (0, p.useContext)(Ie.ZP.ConfigContext),
            x = g.getPrefixCls,
            C = g.direction,
            b = ''.concat(v || x('pro'), '-global-header'),
            k = (function (e) {
              return (0, Tt.Xj)('ProLayoutGlobalHeader', function (t) {
                var n = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e) },
                );
                return [Un(n)];
              });
            })(b),
            E = k.wrapSSR,
            Z = k.hashId,
            M = Ae()(c, b, Z);
          if ('mix' === d && !t && h) {
            var j = Wt(
              (f || []).map(function (e) {
                return (0,
                y.Z)((0, y.Z)({}, e), {}, { children: void 0, routes: void 0 });
              }),
            );
            return (0, Bt.jsx)(
              Kn,
              (0, y.Z)(
                (0, y.Z)({ mode: 'horizontal' }, e),
                {},
                { splitMenus: !1, menuData: j },
              ),
            );
          }
          var S = Ae()(
              ''.concat(b, '-logo'),
              Z,
              (0, m.Z)(
                (0, m.Z)(
                  (0, m.Z)({}, ''.concat(b, '-logo-rtl'), 'rtl' === C),
                  ''.concat(b, '-logo-mix'),
                  'mix' === d,
                ),
                ''.concat(b, '-logo-mobile'),
                t,
              ),
            ),
            w = (0, Bt.jsx)(
              'span',
              { className: S, children: (0, Bt.jsx)('a', { children: tn(n) }) },
              'logo',
            );
          return E(
            (0, Bt.jsxs)('div', {
              className: M,
              style: (0, y.Z)({}, s),
              children: [
                t &&
                  (0, Bt.jsx)('span', {
                    className: ''
                      .concat(b, '-collapsed-button ')
                      .concat(Z)
                      .trim(),
                    onClick: function () {
                      null == r || r(!o);
                    },
                    children: (0, Bt.jsx)(Gt, {}),
                  }),
                t && Xn(a, w),
                'mix' === d &&
                  !t &&
                  (0, Bt.jsxs)(Bt.Fragment, {
                    children: [
                      (0, Bt.jsx)(nn, (0, y.Z)({}, e)),
                      (0, Bt.jsx)('div', {
                        className: S,
                        onClick: l,
                        children: zn(
                          (0, y.Z)((0, y.Z)({}, e), {}, { collapsed: !1 }),
                          'headerTitleRender',
                        ),
                      }),
                    ],
                  }),
                (0, Bt.jsx)('div', { style: { flex: 1 }, children: u }),
                (i || e.actionsRender || e.avatarProps) &&
                  (0, Bt.jsx)(Gn, (0, y.Z)({ rightContentRender: i }, e)),
              ],
            }),
          );
        },
        Qn = function (e) {
          var t, n, o, r;
          return (0, m.Z)(
            {},
            ''.concat(e.proComponentsCls, '-layout'),
            (0, m.Z)(
              {},
              ''.concat(e.antCls, '-layout-header').concat(e.componentCls),
              {
                height:
                  (null === (t = e.layout) ||
                  void 0 === t ||
                  null === (t = t.header) ||
                  void 0 === t
                    ? void 0
                    : t.heightLayoutHeader) || 56,
                lineHeight: ''.concat(
                  (null === (n = e.layout) ||
                  void 0 === n ||
                  null === (n = n.header) ||
                  void 0 === n
                    ? void 0
                    : n.heightLayoutHeader) || 56,
                  'px',
                ),
                zIndex: 19,
                width: '100%',
                paddingBlock: 0,
                paddingInline: 0,
                borderBlockEnd: '1px solid '.concat(e.colorSplit),
                backgroundColor:
                  (null === (o = e.layout) ||
                  void 0 === o ||
                  null === (o = o.header) ||
                  void 0 === o
                    ? void 0
                    : o.colorBgHeader) || 'rgba(255, 255, 255, 0.4)',
                WebkitBackdropFilter: 'blur(8px)',
                backdropFilter: 'blur(8px)',
                transition:
                  'background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
                '&-fixed-header': {
                  position: 'fixed',
                  insetBlockStart: 0,
                  width: '100%',
                  zIndex: 100,
                  insetInlineEnd: 0,
                },
                '&-fixed-header-scroll': {
                  backgroundColor:
                    (null === (r = e.layout) ||
                    void 0 === r ||
                    null === (r = r.header) ||
                    void 0 === r
                      ? void 0
                      : r.colorBgScrollHeader) || 'rgba(255, 255, 255, 0.8)',
                },
                '&-header-actions': {
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16',
                  cursor: 'pointer',
                  '& &-item': {
                    paddingBlock: 0,
                    paddingInline: 8,
                    '&:hover': { color: e.colorText },
                  },
                },
                '&-header-realDark': {
                  boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 65%)',
                },
                '&-header-actions-header-action': {
                  transition: 'width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
                },
              },
            ),
          );
        };
      var Yn = Xe.Header,
        Jn = function (e) {
          var t,
            n,
            o,
            r = e.isMobile,
            i = e.fixedHeader,
            a = e.className,
            l = e.style,
            c = e.collapsed,
            s = e.prefixCls,
            d = e.onCollapse,
            u = e.layout,
            h = e.headerRender,
            f = e.headerContentRender,
            v = (0, p.useContext)(x.L_).token,
            C = (0, p.useContext)(Ie.ZP.ConfigContext),
            b = (0, p.useState)(!1),
            k = (0, g.Z)(b, 2),
            E = k[0],
            Z = k[1],
            M = i || 'mix' === u,
            j = (0, p.useCallback)(
              function () {
                var t = 'top' === u,
                  n = Wt(e.menuData || []),
                  o = (0, Bt.jsx)(
                    qn,
                    (0, y.Z)(
                      (0, y.Z)({ onCollapse: d }, e),
                      {},
                      { menuData: n, children: f && f(e, null) },
                    ),
                  );
                return (
                  t &&
                    !r &&
                    (o = (0, Bt.jsx)(
                      Kn,
                      (0, y.Z)(
                        (0, y.Z)({ mode: 'horizontal', onCollapse: d }, e),
                        {},
                        { menuData: n },
                      ),
                    )),
                  h && 'function' == typeof h ? h(e, o) : o
                );
              },
              [f, h, r, u, d, e],
            );
          (0, p.useEffect)(
            function () {
              var e,
                t =
                  (null == C ||
                  null === (e = C.getTargetContainer) ||
                  void 0 === e
                    ? void 0
                    : e.call(C)) || document.body,
                n = function () {
                  var e;
                  return t.scrollTop >
                    ((null === (e = v.layout) ||
                    void 0 === e ||
                    null === (e = e.header) ||
                    void 0 === e
                      ? void 0
                      : e.heightLayoutHeader) || 56) && !E
                    ? (Z(!0), !0)
                    : (E && Z(!1), !1);
                };
              if (M && 'undefined' != typeof window)
                return (
                  t.addEventListener('scroll', n, { passive: !0 }),
                  function () {
                    t.removeEventListener('scroll', n);
                  }
                );
            },
            [
              null === (t = v.layout) ||
              void 0 === t ||
              null === (t = t.header) ||
              void 0 === t
                ? void 0
                : t.heightLayoutHeader,
              M,
              E,
            ],
          );
          var S = 'top' === u,
            w = ''.concat(s, '-layout-header'),
            B = (function (e) {
              return (0, Tt.Xj)('ProLayoutHeader', function (t) {
                var n = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e) },
                );
                return [Qn(n)];
              });
            })(w),
            I = B.wrapSSR,
            F = B.hashId,
            L = (function (e, t) {
              var n = t.stylish,
                o = t.proLayoutCollapsedWidth;
              return (0, Tt.Xj)('ProLayoutHeaderStylish', function (t) {
                var r = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e), proLayoutCollapsedWidth: o },
                );
                return n
                  ? [
                      (0, m.Z)(
                        {},
                        'div'.concat(t.proComponentsCls, '-layout'),
                        (0, m.Z)(
                          {},
                          ''.concat(r.componentCls),
                          null == n ? void 0 : n(r),
                        ),
                      ),
                    ]
                  : [];
              });
            })(''.concat(w, '.').concat(w, '-stylish'), {
              proLayoutCollapsedWidth: 64,
              stylish: e.stylish,
            }),
            A = Ae()(
              a,
              F,
              w,
              (0, m.Z)(
                (0, m.Z)(
                  (0, m.Z)(
                    (0, m.Z)(
                      (0, m.Z)(
                        (0, m.Z)(
                          (0, m.Z)({}, ''.concat(w, '-fixed-header'), M),
                          ''.concat(w, '-fixed-header-scroll'),
                          E,
                        ),
                        ''.concat(w, '-mix'),
                        'mix' === u,
                      ),
                      ''.concat(w, '-fixed-header-action'),
                      !c,
                    ),
                    ''.concat(w, '-top-menu'),
                    S,
                  ),
                  ''.concat(w, '-header'),
                  !0,
                ),
                ''.concat(w, '-stylish'),
                !!e.stylish,
              ),
            );
          return 'side' !== u || r
            ? L.wrapSSR(
                I(
                  (0, Bt.jsx)(Bt.Fragment, {
                    children: (0, Bt.jsxs)(Ie.ZP, {
                      theme: {
                        hashed: (0, x.nu)(),
                        components: {
                          Layout: {
                            headerBg: 'transparent',
                            bodyBg: 'transparent',
                          },
                        },
                      },
                      children: [
                        M &&
                          (0, Bt.jsx)(Yn, {
                            style: (0, y.Z)(
                              {
                                height:
                                  (null === (n = v.layout) ||
                                  void 0 === n ||
                                  null === (n = n.header) ||
                                  void 0 === n
                                    ? void 0
                                    : n.heightLayoutHeader) || 56,
                                lineHeight: ''.concat(
                                  (null === (o = v.layout) ||
                                  void 0 === o ||
                                  null === (o = o.header) ||
                                  void 0 === o
                                    ? void 0
                                    : o.heightLayoutHeader) || 56,
                                  'px',
                                ),
                                backgroundColor: 'transparent',
                                zIndex: 19,
                              },
                              l,
                            ),
                          }),
                        (0, Bt.jsx)(Yn, {
                          className: A,
                          style: l,
                          children: j(),
                        }),
                      ],
                    }),
                  }),
                ),
              )
            : null;
        },
        eo = n(75249),
        to = n(27844),
        no = new ht.E4('antBadgeLoadingCircle', {
          '0%': { display: 'none', opacity: 0, overflow: 'hidden' },
          '80%': { overflow: 'hidden' },
          '100%': { display: 'unset', opacity: 1 },
        }),
        oo = function (e) {
          var t, n, o, r, i, a, l, c, s, d, u, p;
          return (0, m.Z)(
            {},
            ''.concat(e.proComponentsCls, '-layout'),
            (0, m.Z)(
              (0, m.Z)(
                (0, m.Z)(
                  {},
                  ''.concat(e.antCls, '-layout-sider').concat(e.componentCls),
                  {
                    background:
                      (null === (t = e.layout) ||
                      void 0 === t ||
                      null === (t = t.sider) ||
                      void 0 === t
                        ? void 0
                        : t.colorMenuBackground) || 'transparent',
                  },
                ),
                e.componentCls,
                (0, m.Z)(
                  (0, m.Z)(
                    (0, m.Z)(
                      (0, m.Z)(
                        (0, m.Z)(
                          (0, m.Z)(
                            (0, m.Z)(
                              (0, m.Z)(
                                (0, m.Z)(
                                  {
                                    position: 'relative',
                                    boxSizing: 'border-box',
                                    '&-menu': {
                                      position: 'relative',
                                      zIndex: 10,
                                      minHeight: '100%',
                                    },
                                  },
                                  '& '.concat(
                                    e.antCls,
                                    '-layout-sider-children',
                                  ),
                                  {
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    paddingInline:
                                      null === (n = e.layout) ||
                                      void 0 === n ||
                                      null === (n = n.sider) ||
                                      void 0 === n
                                        ? void 0
                                        : n.paddingInlineLayoutMenu,
                                    paddingBlock:
                                      null === (o = e.layout) ||
                                      void 0 === o ||
                                      null === (o = o.sider) ||
                                      void 0 === o
                                        ? void 0
                                        : o.paddingBlockLayoutMenu,
                                    borderInlineEnd: '1px solid '.concat(
                                      e.colorSplit,
                                    ),
                                    marginInlineEnd: -1,
                                  },
                                ),
                                ''.concat(e.antCls, '-menu'),
                                (0, m.Z)(
                                  (0, m.Z)(
                                    {},
                                    ''.concat(
                                      e.antCls,
                                      '-menu-item-group-title',
                                    ),
                                    {
                                      fontSize: e.fontSizeSM,
                                      paddingBottom: 4,
                                    },
                                  ),
                                  ''
                                    .concat(e.antCls, '-menu-item:not(')
                                    .concat(
                                      e.antCls,
                                      '-menu-item-selected):hover',
                                    ),
                                  {
                                    color:
                                      null === (r = e.layout) ||
                                      void 0 === r ||
                                      null === (r = r.sider) ||
                                      void 0 === r
                                        ? void 0
                                        : r.colorTextMenuItemHover,
                                  },
                                ),
                              ),
                              '&-logo',
                              {
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingInline: 12,
                                paddingBlock: 16,
                                color:
                                  null === (i = e.layout) ||
                                  void 0 === i ||
                                  null === (i = i.sider) ||
                                  void 0 === i
                                    ? void 0
                                    : i.colorTextMenu,
                                cursor: 'pointer',
                                borderBlockEnd: '1px solid '.concat(
                                  null === (a = e.layout) ||
                                    void 0 === a ||
                                    null === (a = a.sider) ||
                                    void 0 === a
                                    ? void 0
                                    : a.colorMenuItemDivider,
                                ),
                                '> a': {
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  minHeight: 22,
                                  fontSize: 22,
                                  '> img': {
                                    display: 'inline-block',
                                    height: 22,
                                    verticalAlign: 'middle',
                                  },
                                  '> h1': {
                                    display: 'inline-block',
                                    height: 22,
                                    marginBlock: 0,
                                    marginInlineEnd: 0,
                                    marginInlineStart: 6,
                                    color:
                                      null === (l = e.layout) ||
                                      void 0 === l ||
                                      null === (l = l.sider) ||
                                      void 0 === l
                                        ? void 0
                                        : l.colorTextMenuTitle,
                                    animationName: no,
                                    animationDuration: '.4s',
                                    animationTimingFunction: 'ease',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    lineHeight: '22px',
                                    verticalAlign: 'middle',
                                  },
                                },
                                '&-collapsed': (0, m.Z)(
                                  {
                                    flexDirection: 'column-reverse',
                                    margin: 0,
                                    padding: 12,
                                  },
                                  ''.concat(
                                    e.proComponentsCls,
                                    '-layout-apps-icon',
                                  ),
                                  {
                                    marginBlockEnd: 8,
                                    fontSize: 16,
                                    transition:
                                      'font-size 0.2s ease-in-out,color 0.2s ease-in-out',
                                  },
                                ),
                              },
                            ),
                            '&-actions',
                            {
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBlock: 4,
                              marginInline: 0,
                              color:
                                null === (c = e.layout) ||
                                void 0 === c ||
                                null === (c = c.sider) ||
                                void 0 === c
                                  ? void 0
                                  : c.colorTextMenu,
                              '&-collapsed': {
                                flexDirection: 'column-reverse',
                                paddingBlock: 0,
                                paddingInline: 8,
                                fontSize: 16,
                                transition: 'font-size 0.3s ease-in-out',
                              },
                              '&-list': {
                                color:
                                  null === (s = e.layout) ||
                                  void 0 === s ||
                                  null === (s = s.sider) ||
                                  void 0 === s
                                    ? void 0
                                    : s.colorTextMenuSecondary,
                                '&-collapsed': {
                                  marginBlockEnd: 8,
                                  animationName: 'none',
                                },
                                '&-item': {
                                  paddingInline: 6,
                                  paddingBlock: 6,
                                  lineHeight: '16px',
                                  fontSize: 16,
                                  cursor: 'pointer',
                                  borderRadius: e.borderRadius,
                                  '&:hover': { background: e.colorBgTextHover },
                                },
                              },
                              '&-avatar': {
                                fontSize: 14,
                                paddingInline: 8,
                                paddingBlock: 8,
                                display: 'flex',
                                alignItems: 'center',
                                gap: e.marginXS,
                                borderRadius: e.borderRadius,
                                '& *': { cursor: 'pointer' },
                                '&:hover': { background: e.colorBgTextHover },
                              },
                            },
                          ),
                          '&-hide-menu-collapsed',
                          {
                            insetInlineStart: '-'.concat(
                              e.proLayoutCollapsedWidth - 12,
                              'px',
                            ),
                            position: 'absolute',
                          },
                        ),
                        '&-extra',
                        {
                          marginBlockEnd: 16,
                          marginBlock: 0,
                          marginInline: 16,
                          '&-no-logo': { marginBlockStart: 16 },
                        },
                      ),
                      '&-links',
                      { width: '100%', ul: { height: 'auto' } },
                    ),
                    '&-link-menu',
                    {
                      border: 'none',
                      boxShadow: 'none',
                      background: 'transparent',
                    },
                  ),
                  '&-footer',
                  {
                    color:
                      null === (d = e.layout) ||
                      void 0 === d ||
                      null === (d = d.sider) ||
                      void 0 === d
                        ? void 0
                        : d.colorTextMenuSecondary,
                    paddingBlockEnd: 16,
                    fontSize: e.fontSize,
                    animationName: no,
                    animationDuration: '.4s',
                    animationTimingFunction: 'ease',
                  },
                ),
              ),
              ''.concat(e.componentCls).concat(e.componentCls, '-fixed'),
              {
                position: 'fixed',
                insetBlockStart: 0,
                insetInlineStart: 0,
                zIndex: '100',
                height: '100%',
                '&-mix': {
                  height: 'calc(100% - '.concat(
                    (null === (u = e.layout) ||
                    void 0 === u ||
                    null === (u = u.header) ||
                    void 0 === u
                      ? void 0
                      : u.heightLayoutHeader) || 56,
                    'px)',
                  ),
                  insetBlockStart: ''.concat(
                    (null === (p = e.layout) ||
                    void 0 === p ||
                    null === (p = p.header) ||
                    void 0 === p
                      ? void 0
                      : p.heightLayoutHeader) || 56,
                    'px',
                  ),
                },
              },
            ),
          );
        };
      var ro = function (e) {
          var t,
            n = e.isMobile,
            o = e.siderWidth,
            r = e.collapsed,
            i = e.onCollapse,
            a = e.style,
            l = e.className,
            c = e.hide,
            s = e.prefixCls,
            d = e.getContainer,
            u = (0, p.useContext)(x.L_).token;
          (0, p.useEffect)(
            function () {
              !0 === n && (null == i || i(!0));
            },
            [n],
          );
          var m = (0, Re.Z)(e, ['className', 'style']),
            h = p.useContext(Ie.ZP.ConfigContext).direction,
            f = (function (e, t) {
              var n = t.proLayoutCollapsedWidth;
              return (0, Tt.Xj)('ProLayoutSiderMenu', function (t) {
                var o = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e), proLayoutCollapsedWidth: n },
                );
                return [oo(o)];
              });
            })(''.concat(s, '-sider'), { proLayoutCollapsedWidth: 64 }),
            v = f.wrapSSR,
            g = f.hashId,
            C = Ae()(''.concat(s, '-sider'), l, g);
          if (c) return null;
          var b = I(!r, function () {
            return null == i ? void 0 : i(!0);
          });
          return v(
            n
              ? (0, Bt.jsx)(
                  to.Z,
                  (0, y.Z)(
                    (0, y.Z)(
                      {
                        placement: 'rtl' === h ? 'right' : 'left',
                        className: Ae()(''.concat(s, '-drawer-sider'), l),
                      },
                      b,
                    ),
                    {},
                    {
                      style: (0, y.Z)({ padding: 0, height: '100vh' }, a),
                      onClose: function () {
                        null == i || i(!0);
                      },
                      maskClosable: !0,
                      closable: !1,
                      getContainer: d || !1,
                      width: o,
                      styles: {
                        body: {
                          height: '100vh',
                          padding: 0,
                          display: 'flex',
                          flexDirection: 'row',
                          backgroundColor:
                            null === (t = u.layout) ||
                            void 0 === t ||
                            null === (t = t.sider) ||
                            void 0 === t
                              ? void 0
                              : t.colorMenuBackground,
                        },
                      },
                      children: (0, Bt.jsx)(
                        Dn,
                        (0, y.Z)(
                          (0, y.Z)({}, m),
                          {},
                          {
                            isMobile: !0,
                            className: C,
                            collapsed: !n && r,
                            splitMenus: !1,
                            originCollapsed: r,
                          },
                        ),
                      ),
                    },
                  ),
                )
              : (0, Bt.jsx)(
                  Dn,
                  (0, y.Z)(
                    (0, y.Z)({ className: C, originCollapsed: r }, m),
                    {},
                    { style: a },
                  ),
                ),
          );
        },
        io = n(92177),
        ao = n(97406),
        lo = function (e, t) {
          var n = e.pathname,
            o = void 0 === n ? '/' : n,
            r = e.breadcrumb,
            i = e.breadcrumbMap,
            a = e.formatMessage,
            l = e.title,
            c = e.menu,
            s = void 0 === c ? { locale: !1 } : c,
            d = t ? '' : l || '',
            u = (function (e, t, n) {
              if (n) {
                var o = (0, Fe.Z)(n.keys()).find(function (t) {
                  try {
                    return !t.startsWith('http') && (0, ao.EQ)(t)(e);
                  } catch (e) {
                    return console.log('key', t, e), !1;
                  }
                });
                if (o) return n.get(o);
              }
              if (t) {
                var r = Object.keys(t).find(function (t) {
                  try {
                    return (
                      (null == t || !t.startsWith('http')) && (0, ao.EQ)(t)(e)
                    );
                  } catch (e) {
                    return console.log('key', t, e), !1;
                  }
                });
                if (r) return t[r];
              }
              return { path: '' };
            })(o, r, i);
          if (!u) return { title: d, id: '', pageName: d };
          var p = u.name;
          return (
            !1 !== s.locale &&
              u.locale &&
              a &&
              (p = a({ id: u.locale || '', defaultMessage: u.name })),
            p
              ? t || !l
                ? { title: p, id: u.locale || '', pageName: p }
                : {
                    title: ''.concat(p, ' - ').concat(l),
                    id: u.locale || '',
                    pageName: p,
                  }
              : { title: d, id: u.locale || '', pageName: d }
          );
        },
        co = (0, y.Z)(
          {},
          {
            'app.setting.pagestyle': 'Page style setting',
            'app.setting.pagestyle.dark': 'Dark Menu style',
            'app.setting.pagestyle.light': 'Light Menu style',
            'app.setting.pagestyle.realdark': 'Dark style (Beta)',
            'app.setting.content-width': 'Content Width',
            'app.setting.content-width.fixed': 'Fixed',
            'app.setting.content-width.fluid': 'Fluid',
            'app.setting.themecolor': 'Theme Color',
            'app.setting.themecolor.dust': 'Dust Red',
            'app.setting.themecolor.volcano': 'Volcano',
            'app.setting.themecolor.sunset': 'Sunset Orange',
            'app.setting.themecolor.cyan': 'Cyan',
            'app.setting.themecolor.green': 'Polar Green',
            'app.setting.themecolor.techBlue': 'Tech Blue (default)',
            'app.setting.themecolor.daybreak': 'Daybreak Blue',
            'app.setting.themecolor.geekblue': 'Geek Blue',
            'app.setting.themecolor.purple': 'Golden Purple',
            'app.setting.sidermenutype': 'SideMenu Type',
            'app.setting.sidermenutype-sub': 'Classic',
            'app.setting.sidermenutype-group': 'Grouping',
            'app.setting.navigationmode': 'Navigation Mode',
            'app.setting.regionalsettings': 'Regional Settings',
            'app.setting.regionalsettings.header': 'Header',
            'app.setting.regionalsettings.menu': 'Menu',
            'app.setting.regionalsettings.footer': 'Footer',
            'app.setting.regionalsettings.menuHeader': 'Menu Header',
            'app.setting.sidemenu': 'Side Menu Layout',
            'app.setting.topmenu': 'Top Menu Layout',
            'app.setting.mixmenu': 'Mix Menu Layout',
            'app.setting.splitMenus': 'Split Menus',
            'app.setting.fixedheader': 'Fixed Header',
            'app.setting.fixedsidebar': 'Fixed Sidebar',
            'app.setting.fixedsidebar.hint': 'Works on Side Menu Layout',
            'app.setting.hideheader': 'Hidden Header when scrolling',
            'app.setting.hideheader.hint':
              'Works when Hidden Header is enabled',
            'app.setting.othersettings': 'Other Settings',
            'app.setting.weakmode': 'Weak Mode',
            'app.setting.copy': 'Copy Setting',
            'app.setting.loading': 'Loading theme',
            'app.setting.copyinfo':
              'copy success，please replace defaultSettings in src/models/setting.js',
            'app.setting.production.hint':
              'Setting panel shows in development environment only, please manually modify',
          },
        ),
        so = (0, y.Z)(
          {},
          {
            'app.setting.pagestyle': 'Impostazioni di stile',
            'app.setting.pagestyle.dark': 'Tema scuro',
            'app.setting.pagestyle.light': 'Tema chiaro',
            'app.setting.content-width': 'Largezza contenuto',
            'app.setting.content-width.fixed': 'Fissa',
            'app.setting.content-width.fluid': 'Fluida',
            'app.setting.themecolor': 'Colore del tema',
            'app.setting.themecolor.dust': 'Rosso polvere',
            'app.setting.themecolor.volcano': 'Vulcano',
            'app.setting.themecolor.sunset': 'Arancione tramonto',
            'app.setting.themecolor.cyan': 'Ciano',
            'app.setting.themecolor.green': 'Verde polare',
            'app.setting.themecolor.techBlue': 'Tech Blu (default)',
            'app.setting.themecolor.daybreak': 'Blu cielo mattutino',
            'app.setting.themecolor.geekblue': 'Blu geek',
            'app.setting.themecolor.purple': 'Viola dorato',
            'app.setting.navigationmode': 'Modalità di navigazione',
            'app.setting.sidemenu': 'Menu laterale',
            'app.setting.topmenu': 'Menu in testata',
            'app.setting.mixmenu': 'Menu misto',
            'app.setting.splitMenus': 'Menu divisi',
            'app.setting.fixedheader': 'Testata fissa',
            'app.setting.fixedsidebar': 'Menu laterale fisso',
            'app.setting.fixedsidebar.hint':
              'Solo se selezionato Menu laterale',
            'app.setting.hideheader': 'Nascondi testata durante lo scorrimento',
            'app.setting.hideheader.hint':
              'Solo se abilitato Nascondi testata durante lo scorrimento',
            'app.setting.othersettings': 'Altre impostazioni',
            'app.setting.weakmode': 'Inverti colori',
            'app.setting.copy': 'Copia impostazioni',
            'app.setting.loading': 'Carico tema...',
            'app.setting.copyinfo':
              'Impostazioni copiate con successo! Incolla il contenuto in config/defaultSettings.js',
            'app.setting.production.hint':
              'Questo pannello è visibile solo durante lo sviluppo. Le impostazioni devono poi essere modificate manulamente',
          },
        ),
        uo = (0, y.Z)(
          {},
          {
            'app.setting.pagestyle': '스타일 설정',
            'app.setting.pagestyle.dark': '다크 모드',
            'app.setting.pagestyle.light': '라이트 모드',
            'app.setting.content-width': '컨텐츠 너비',
            'app.setting.content-width.fixed': '고정',
            'app.setting.content-width.fluid': '흐름',
            'app.setting.themecolor': '테마 색상',
            'app.setting.themecolor.dust': 'Dust Red',
            'app.setting.themecolor.volcano': 'Volcano',
            'app.setting.themecolor.sunset': 'Sunset Orange',
            'app.setting.themecolor.cyan': 'Cyan',
            'app.setting.themecolor.green': 'Polar Green',
            'app.setting.themecolor.techBlue': 'Tech Blu (default)',
            'app.setting.themecolor.daybreak': 'Daybreak Blue',
            'app.setting.themecolor.geekblue': 'Geek Blue',
            'app.setting.themecolor.purple': 'Golden Purple',
            'app.setting.navigationmode': '네비게이션 모드',
            'app.setting.regionalsettings': '영역별 설정',
            'app.setting.regionalsettings.header': '헤더',
            'app.setting.regionalsettings.menu': '메뉴',
            'app.setting.regionalsettings.footer': '바닥글',
            'app.setting.regionalsettings.menuHeader': '메뉴 헤더',
            'app.setting.sidemenu': '메뉴 사이드 배치',
            'app.setting.topmenu': '메뉴 상단 배치',
            'app.setting.mixmenu': '혼합형 배치',
            'app.setting.splitMenus': '메뉴 분리',
            'app.setting.fixedheader': '헤더 고정',
            'app.setting.fixedsidebar': '사이드바 고정',
            'app.setting.fixedsidebar.hint':
              "'메뉴 사이드 배치'를 선택했을 때 동작함",
            'app.setting.hideheader': '스크롤 중 헤더 감추기',
            'app.setting.hideheader.hint':
              "'헤더 감추기 옵션'을 선택했을 때 동작함",
            'app.setting.othersettings': '다른 설정',
            'app.setting.weakmode': '고대비 모드',
            'app.setting.copy': '설정값 복사',
            'app.setting.loading': '테마 로딩 중',
            'app.setting.copyinfo':
              '복사 성공. src/models/settings.js에 있는 defaultSettings를 교체해 주세요.',
            'app.setting.production.hint':
              '설정 판넬은 개발 환경에서만 보여집니다. 직접 수동으로 변경바랍니다.',
          },
        ),
        po = {
          'zh-CN': (0, y.Z)(
            {},
            {
              'app.setting.pagestyle': '整体风格设置',
              'app.setting.pagestyle.dark': '暗色菜单风格',
              'app.setting.pagestyle.light': '亮色菜单风格',
              'app.setting.pagestyle.realdark': '暗色风格(实验功能)',
              'app.setting.content-width': '内容区域宽度',
              'app.setting.content-width.fixed': '定宽',
              'app.setting.content-width.fluid': '流式',
              'app.setting.themecolor': '主题色',
              'app.setting.themecolor.dust': '薄暮',
              'app.setting.themecolor.volcano': '火山',
              'app.setting.themecolor.sunset': '日暮',
              'app.setting.themecolor.cyan': '明青',
              'app.setting.themecolor.green': '极光绿',
              'app.setting.themecolor.techBlue': '科技蓝（默认）',
              'app.setting.themecolor.daybreak': '拂晓',
              'app.setting.themecolor.geekblue': '极客蓝',
              'app.setting.themecolor.purple': '酱紫',
              'app.setting.navigationmode': '导航模式',
              'app.setting.sidermenutype': '侧边菜单类型',
              'app.setting.sidermenutype-sub': '经典模式',
              'app.setting.sidermenutype-group': '分组模式',
              'app.setting.regionalsettings': '内容区域',
              'app.setting.regionalsettings.header': '顶栏',
              'app.setting.regionalsettings.menu': '菜单',
              'app.setting.regionalsettings.footer': '页脚',
              'app.setting.regionalsettings.menuHeader': '菜单头',
              'app.setting.sidemenu': '侧边菜单布局',
              'app.setting.topmenu': '顶部菜单布局',
              'app.setting.mixmenu': '混合菜单布局',
              'app.setting.splitMenus': '自动分割菜单',
              'app.setting.fixedheader': '固定 Header',
              'app.setting.fixedsidebar': '固定侧边菜单',
              'app.setting.fixedsidebar.hint': '侧边菜单布局时可配置',
              'app.setting.hideheader': '下滑时隐藏 Header',
              'app.setting.hideheader.hint': '固定 Header 时可配置',
              'app.setting.othersettings': '其他设置',
              'app.setting.weakmode': '色弱模式',
              'app.setting.copy': '拷贝设置',
              'app.setting.loading': '正在加载主题',
              'app.setting.copyinfo':
                '拷贝成功，请到 src/defaultSettings.js 中替换默认配置',
              'app.setting.production.hint':
                '配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件',
            },
          ),
          'zh-TW': (0, y.Z)(
            {},
            {
              'app.setting.pagestyle': '整體風格設置',
              'app.setting.pagestyle.dark': '暗色菜單風格',
              'app.setting.pagestyle.realdark': '暗色風格(实验功能)',
              'app.setting.pagestyle.light': '亮色菜單風格',
              'app.setting.content-width': '內容區域寬度',
              'app.setting.content-width.fixed': '定寬',
              'app.setting.content-width.fluid': '流式',
              'app.setting.themecolor': '主題色',
              'app.setting.themecolor.dust': '薄暮',
              'app.setting.themecolor.volcano': '火山',
              'app.setting.themecolor.sunset': '日暮',
              'app.setting.themecolor.cyan': '明青',
              'app.setting.themecolor.green': '極光綠',
              'app.setting.themecolor.techBlue': '科技蓝（默認）',
              'app.setting.themecolor.daybreak': '拂曉藍',
              'app.setting.themecolor.geekblue': '極客藍',
              'app.setting.themecolor.purple': '醬紫',
              'app.setting.navigationmode': '導航模式',
              'app.setting.sidemenu': '側邊菜單布局',
              'app.setting.topmenu': '頂部菜單布局',
              'app.setting.mixmenu': '混合菜單布局',
              'app.setting.splitMenus': '自动分割菜单',
              'app.setting.fixedheader': '固定 Header',
              'app.setting.fixedsidebar': '固定側邊菜單',
              'app.setting.fixedsidebar.hint': '側邊菜單布局時可配置',
              'app.setting.hideheader': '下滑時隱藏 Header',
              'app.setting.hideheader.hint': '固定 Header 時可配置',
              'app.setting.othersettings': '其他設置',
              'app.setting.weakmode': '色弱模式',
              'app.setting.copy': '拷貝設置',
              'app.setting.loading': '正在加載主題',
              'app.setting.copyinfo':
                '拷貝成功，請到 src/defaultSettings.js 中替換默認配置',
              'app.setting.production.hint':
                '配置欄只在開發環境用於預覽，生產環境不會展現，請拷貝後手動修改配置文件',
            },
          ),
          'en-US': co,
          'it-IT': so,
          'ko-KR': uo,
        },
        mo = function () {
          var e = (0, Z.j)()
            ? window.localStorage.getItem('umi_locale') ||
              window.g_locale ||
              navigator.language
            : 'zh-CN';
          return po[e] || po['zh-CN'];
        },
        ho = n(14224),
        fo = function (e) {
          var t,
            n,
            o,
            r,
            i,
            a,
            l,
            c,
            s,
            d,
            u,
            p,
            h,
            f,
            v,
            g,
            y,
            x,
            C,
            b,
            k,
            E,
            Z,
            M,
            S,
            w,
            B,
            I,
            F,
            L,
            A,
            R;
          return null !==
            (t =
              void 0 === ho
                ? j.Z
                : (null == ho ||
                  null ===
                    (ho = { NODE_ENV: 'production', PUBLIC_PATH: './' }) ||
                  void 0 === ho
                    ? void 0
                    : ho.ANTD_VERSION) || j.Z) &&
            void 0 !== t &&
            t.startsWith('5')
            ? {}
            : (0, m.Z)(
                (0, m.Z)(
                  (0, m.Z)(
                    {},
                    e.componentCls,
                    (0, m.Z)(
                      (0, m.Z)(
                        { width: '100%', height: '100%' },
                        ''.concat(e.proComponentsCls, '-base-menu'),
                        ((k = {
                          color:
                            null === (n = e.layout) ||
                            void 0 === n ||
                            null === (n = n.sider) ||
                            void 0 === n
                              ? void 0
                              : n.colorTextMenu,
                        }),
                        (0, m.Z)(
                          (0, m.Z)(
                            (0, m.Z)(
                              (0, m.Z)(
                                (0, m.Z)(
                                  (0, m.Z)(
                                    (0, m.Z)(
                                      (0, m.Z)(
                                        (0, m.Z)(
                                          (0, m.Z)(
                                            k,
                                            ''.concat(e.antCls, '-menu-sub'),
                                            {
                                              backgroundColor:
                                                'transparent!important',
                                              color:
                                                null === (o = e.layout) ||
                                                void 0 === o ||
                                                null === (o = o.sider) ||
                                                void 0 === o
                                                  ? void 0
                                                  : o.colorTextMenu,
                                            },
                                          ),
                                          '& '.concat(e.antCls, '-layout'),
                                          {
                                            backgroundColor: 'transparent',
                                            width: '100%',
                                          },
                                        ),
                                        ''
                                          .concat(
                                            e.antCls,
                                            '-menu-submenu-expand-icon, ',
                                          )
                                          .concat(
                                            e.antCls,
                                            '-menu-submenu-arrow',
                                          ),
                                        { color: 'inherit' },
                                      ),
                                      '&'.concat(e.antCls, '-menu'),
                                      (0, m.Z)(
                                        (0, m.Z)(
                                          {
                                            color:
                                              null === (r = e.layout) ||
                                              void 0 === r ||
                                              null === (r = r.sider) ||
                                              void 0 === r
                                                ? void 0
                                                : r.colorTextMenu,
                                          },
                                          ''.concat(e.antCls, '-menu-item'),
                                          {
                                            '*': {
                                              transition: 'none !important',
                                            },
                                          },
                                        ),
                                        ''.concat(e.antCls, '-menu-item a'),
                                        { color: 'inherit' },
                                      ),
                                    ),
                                    '&'.concat(e.antCls, '-menu-inline'),
                                    (0, m.Z)(
                                      {},
                                      ''
                                        .concat(
                                          e.antCls,
                                          '-menu-selected::after,',
                                        )
                                        .concat(
                                          e.antCls,
                                          '-menu-item-selected::after',
                                        ),
                                      { display: 'none' },
                                    ),
                                  ),
                                  ''
                                    .concat(e.antCls, '-menu-sub ')
                                    .concat(e.antCls, '-menu-inline'),
                                  { backgroundColor: 'transparent!important' },
                                ),
                                ''
                                  .concat(
                                    e.antCls,
                                    '-menu-item:active, \n        ',
                                  )
                                  .concat(
                                    e.antCls,
                                    '-menu-submenu-title:active',
                                  ),
                                { backgroundColor: 'transparent!important' },
                              ),
                              '&'.concat(e.antCls, '-menu-light'),
                              (0, m.Z)(
                                {},
                                ''
                                  .concat(
                                    e.antCls,
                                    '-menu-item:hover, \n            ',
                                  )
                                  .concat(
                                    e.antCls,
                                    '-menu-item-active,\n            ',
                                  )
                                  .concat(
                                    e.antCls,
                                    '-menu-submenu-active, \n            ',
                                  )
                                  .concat(
                                    e.antCls,
                                    '-menu-submenu-title:hover',
                                  ),
                                (0, m.Z)(
                                  {
                                    color:
                                      null === (i = e.layout) ||
                                      void 0 === i ||
                                      null === (i = i.sider) ||
                                      void 0 === i
                                        ? void 0
                                        : i.colorTextMenuActive,
                                    borderRadius: e.borderRadius,
                                  },
                                  ''.concat(e.antCls, '-menu-submenu-arrow'),
                                  {
                                    color:
                                      null === (a = e.layout) ||
                                      void 0 === a ||
                                      null === (a = a.sider) ||
                                      void 0 === a
                                        ? void 0
                                        : a.colorTextMenuActive,
                                  },
                                ),
                              ),
                            ),
                            '&'
                              .concat(e.antCls, '-menu:not(')
                              .concat(e.antCls, '-menu-horizontal)'),
                            (0, m.Z)(
                              (0, m.Z)(
                                {},
                                ''.concat(e.antCls, '-menu-item-selected'),
                                {
                                  backgroundColor:
                                    null === (l = e.layout) ||
                                    void 0 === l ||
                                    null === (l = l.sider) ||
                                    void 0 === l
                                      ? void 0
                                      : l.colorBgMenuItemSelected,
                                  borderRadius: e.borderRadius,
                                },
                              ),
                              ''
                                .concat(
                                  e.antCls,
                                  '-menu-item:hover, \n            ',
                                )
                                .concat(
                                  e.antCls,
                                  '-menu-item-active,\n            ',
                                )
                                .concat(e.antCls, '-menu-submenu-title:hover'),
                              (0, m.Z)(
                                {
                                  color:
                                    null === (c = e.layout) ||
                                    void 0 === c ||
                                    null === (c = c.sider) ||
                                    void 0 === c
                                      ? void 0
                                      : c.colorTextMenuActive,
                                  borderRadius: e.borderRadius,
                                  backgroundColor: ''.concat(
                                    null === (s = e.layout) ||
                                      void 0 === s ||
                                      null === (s = s.header) ||
                                      void 0 === s
                                      ? void 0
                                      : s.colorBgMenuItemHover,
                                    ' !important',
                                  ),
                                },
                                ''.concat(e.antCls, '-menu-submenu-arrow'),
                                {
                                  color:
                                    null === (d = e.layout) ||
                                    void 0 === d ||
                                    null === (d = d.sider) ||
                                    void 0 === d
                                      ? void 0
                                      : d.colorTextMenuActive,
                                },
                              ),
                            ),
                          ),
                          ''.concat(e.antCls, '-menu-item-selected'),
                          {
                            color:
                              null === (u = e.layout) ||
                              void 0 === u ||
                              null === (u = u.sider) ||
                              void 0 === u
                                ? void 0
                                : u.colorTextMenuSelected,
                          },
                        ),
                        (0, m.Z)(
                          (0, m.Z)(
                            (0, m.Z)(
                              (0, m.Z)(
                                (0, m.Z)(
                                  k,
                                  ''.concat(e.antCls, '-menu-submenu-selected'),
                                  {
                                    color:
                                      null === (p = e.layout) ||
                                      void 0 === p ||
                                      null === (p = p.sider) ||
                                      void 0 === p
                                        ? void 0
                                        : p.colorTextMenuSelected,
                                  },
                                ),
                                '&'
                                  .concat(e.antCls, '-menu:not(')
                                  .concat(e.antCls, '-menu-inline) ')
                                  .concat(e.antCls, '-menu-submenu-open'),
                                {
                                  color:
                                    null === (h = e.layout) ||
                                    void 0 === h ||
                                    null === (h = h.sider) ||
                                    void 0 === h
                                      ? void 0
                                      : h.colorTextMenuSelected,
                                },
                              ),
                              '&'.concat(e.antCls, '-menu-vertical'),
                              (0, m.Z)(
                                {},
                                ''.concat(e.antCls, '-menu-submenu-selected'),
                                {
                                  borderRadius: e.borderRadius,
                                  color:
                                    null === (f = e.layout) ||
                                    void 0 === f ||
                                    null === (f = f.sider) ||
                                    void 0 === f
                                      ? void 0
                                      : f.colorTextMenuSelected,
                                },
                              ),
                            ),
                            ''
                              .concat(e.antCls, '-menu-submenu:hover > ')
                              .concat(e.antCls, '-menu-submenu-title > ')
                              .concat(e.antCls, '-menu-submenu-arrow'),
                            {
                              color:
                                null === (v = e.layout) ||
                                void 0 === v ||
                                null === (v = v.sider) ||
                                void 0 === v
                                  ? void 0
                                  : v.colorTextMenuActive,
                            },
                          ),
                          '&'.concat(e.antCls, '-menu-horizontal'),
                          (0, m.Z)(
                            (0, m.Z)(
                              (0, m.Z)(
                                (0, m.Z)(
                                  {},
                                  ''
                                    .concat(
                                      e.antCls,
                                      '-menu-item:hover,\n          ',
                                    )
                                    .concat(
                                      e.antCls,
                                      '-menu-submenu:hover,\n          ',
                                    )
                                    .concat(
                                      e.antCls,
                                      '-menu-item-active,\n          ',
                                    )
                                    .concat(e.antCls, '-menu-submenu-active'),
                                  {
                                    borderRadius: 4,
                                    transition: 'none',
                                    color:
                                      null === (g = e.layout) ||
                                      void 0 === g ||
                                      null === (g = g.header) ||
                                      void 0 === g
                                        ? void 0
                                        : g.colorTextMenuActive,
                                    backgroundColor: ''.concat(
                                      null === (y = e.layout) ||
                                        void 0 === y ||
                                        null === (y = y.header) ||
                                        void 0 === y
                                        ? void 0
                                        : y.colorBgMenuItemHover,
                                      ' !important',
                                    ),
                                  },
                                ),
                                ''
                                  .concat(
                                    e.antCls,
                                    '-menu-item-open,\n          ',
                                  )
                                  .concat(
                                    e.antCls,
                                    '-menu-submenu-open,\n          ',
                                  )
                                  .concat(
                                    e.antCls,
                                    '-menu-item-selected,\n          ',
                                  )
                                  .concat(e.antCls, '-menu-submenu-selected'),
                                (0, m.Z)(
                                  {
                                    backgroundColor:
                                      null === (x = e.layout) ||
                                      void 0 === x ||
                                      null === (x = x.header) ||
                                      void 0 === x
                                        ? void 0
                                        : x.colorBgMenuItemSelected,
                                    borderRadius: e.borderRadius,
                                    transition: 'none',
                                    color: ''.concat(
                                      null === (C = e.layout) ||
                                        void 0 === C ||
                                        null === (C = C.header) ||
                                        void 0 === C
                                        ? void 0
                                        : C.colorTextMenuSelected,
                                      ' !important',
                                    ),
                                  },
                                  ''.concat(e.antCls, '-menu-submenu-arrow'),
                                  {
                                    color: ''.concat(
                                      null === (b = e.layout) ||
                                        void 0 === b ||
                                        null === (b = b.header) ||
                                        void 0 === b
                                        ? void 0
                                        : b.colorTextMenuSelected,
                                      ' !important',
                                    ),
                                  },
                                ),
                              ),
                              '> '
                                .concat(e.antCls, '-menu-item, > ')
                                .concat(e.antCls, '-menu-submenu'),
                              { paddingInline: 16, marginInline: 4 },
                            ),
                            '> '
                              .concat(e.antCls, '-menu-item::after, > ')
                              .concat(e.antCls, '-menu-submenu::after'),
                            { display: 'none' },
                          ),
                        )),
                      ),
                      ''.concat(
                        e.proComponentsCls,
                        '-top-nav-header-base-menu',
                      ),
                      (0, m.Z)(
                        (0, m.Z)(
                          {},
                          '&'.concat(e.antCls, '-menu'),
                          (0, m.Z)(
                            {
                              color:
                                null === (E = e.layout) ||
                                void 0 === E ||
                                null === (E = E.header) ||
                                void 0 === E
                                  ? void 0
                                  : E.colorTextMenu,
                            },
                            ''.concat(e.antCls, '-menu-item a'),
                            { color: 'inherit' },
                          ),
                        ),
                        '&'.concat(e.antCls, '-menu-light'),
                        (0, m.Z)(
                          (0, m.Z)(
                            {},
                            ''
                              .concat(
                                e.antCls,
                                '-menu-item:hover, \n            ',
                              )
                              .concat(
                                e.antCls,
                                '-menu-item-active,\n            ',
                              )
                              .concat(
                                e.antCls,
                                '-menu-submenu-active, \n            ',
                              )
                              .concat(e.antCls, '-menu-submenu-title:hover'),
                            (0, m.Z)(
                              {
                                color:
                                  null === (Z = e.layout) ||
                                  void 0 === Z ||
                                  null === (Z = Z.header) ||
                                  void 0 === Z
                                    ? void 0
                                    : Z.colorTextMenuActive,
                                borderRadius: e.borderRadius,
                                transition: 'none',
                                backgroundColor:
                                  null === (M = e.layout) ||
                                  void 0 === M ||
                                  null === (M = M.header) ||
                                  void 0 === M
                                    ? void 0
                                    : M.colorBgMenuItemSelected,
                              },
                              ''.concat(e.antCls, '-menu-submenu-arrow'),
                              {
                                color:
                                  null === (S = e.layout) ||
                                  void 0 === S ||
                                  null === (S = S.header) ||
                                  void 0 === S
                                    ? void 0
                                    : S.colorTextMenuActive,
                              },
                            ),
                          ),
                          ''.concat(e.antCls, '-menu-item-selected'),
                          {
                            color:
                              null === (w = e.layout) ||
                              void 0 === w ||
                              null === (w = w.header) ||
                              void 0 === w
                                ? void 0
                                : w.colorTextMenuSelected,
                            borderRadius: e.borderRadius,
                            backgroundColor:
                              null === (B = e.layout) ||
                              void 0 === B ||
                              null === (B = B.header) ||
                              void 0 === B
                                ? void 0
                                : B.colorBgMenuItemSelected,
                          },
                        ),
                      ),
                    ),
                  ),
                  ''
                    .concat(e.antCls, '-menu-sub')
                    .concat(e.antCls, '-menu-inline'),
                  { backgroundColor: 'transparent!important' },
                ),
                ''.concat(e.antCls, '-menu-submenu-popup'),
                (0, m.Z)(
                  (0, m.Z)(
                    (0, m.Z)(
                      (0, m.Z)(
                        {
                          backgroundColor: 'rgba(255, 255, 255, 0.42)',
                          '-webkit-backdrop-filter': 'blur(8px)',
                          backdropFilter: 'blur(8px)',
                        },
                        ''.concat(e.antCls, '-menu'),
                        (0, m.Z)(
                          {
                            background: 'transparent !important',
                            backgroundColor: 'transparent !important',
                          },
                          ''
                            .concat(e.antCls, '-menu-item:active, \n        ')
                            .concat(e.antCls, '-menu-submenu-title:active'),
                          { backgroundColor: 'transparent!important' },
                        ),
                      ),
                      ''.concat(e.antCls, '-menu-item-selected'),
                      {
                        color:
                          null === (I = e.layout) ||
                          void 0 === I ||
                          null === (I = I.sider) ||
                          void 0 === I
                            ? void 0
                            : I.colorTextMenuSelected,
                      },
                    ),
                    ''.concat(e.antCls, '-menu-submenu-selected'),
                    {
                      color:
                        null === (F = e.layout) ||
                        void 0 === F ||
                        null === (F = F.sider) ||
                        void 0 === F
                          ? void 0
                          : F.colorTextMenuSelected,
                    },
                  ),
                  ''
                    .concat(e.antCls, '-menu:not(')
                    .concat(e.antCls, '-menu-horizontal)'),
                  (0, m.Z)(
                    (0, m.Z)({}, ''.concat(e.antCls, '-menu-item-selected'), {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: e.borderRadius,
                      color:
                        null === (L = e.layout) ||
                        void 0 === L ||
                        null === (L = L.sider) ||
                        void 0 === L
                          ? void 0
                          : L.colorTextMenuSelected,
                    }),
                    ''
                      .concat(e.antCls, '-menu-item:hover, \n          ')
                      .concat(e.antCls, '-menu-item-active,\n          ')
                      .concat(e.antCls, '-menu-submenu-title:hover'),
                    (0, m.Z)(
                      {
                        color:
                          null === (A = e.layout) ||
                          void 0 === A ||
                          null === (A = A.sider) ||
                          void 0 === A
                            ? void 0
                            : A.colorTextMenuActive,
                        borderRadius: e.borderRadius,
                      },
                      ''.concat(e.antCls, '-menu-submenu-arrow'),
                      {
                        color:
                          null === (R = e.layout) ||
                          void 0 === R ||
                          null === (R = R.sider) ||
                          void 0 === R
                            ? void 0
                            : R.colorTextMenuActive,
                      },
                    ),
                  ),
                ),
              );
        },
        vo = function (e) {
          var t, n, o, r;
          return (0, m.Z)(
            (0, m.Z)({}, ''.concat(e.antCls, '-layout'), {
              backgroundColor: 'transparent !important',
            }),
            e.componentCls,
            (0, m.Z)(
              (0, m.Z)(
                (0, m.Z)(
                  (0, m.Z)({}, '& '.concat(e.antCls, '-layout'), {
                    display: 'flex',
                    backgroundColor: 'transparent',
                    width: '100%',
                  }),
                  ''.concat(e.componentCls, '-content'),
                  {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    backgroundColor:
                      (null === (t = e.layout) ||
                      void 0 === t ||
                      null === (t = t.pageContainer) ||
                      void 0 === t
                        ? void 0
                        : t.colorBgPageContainer) || 'transparent',
                    position: 'relative',
                    paddingBlock:
                      null === (n = e.layout) ||
                      void 0 === n ||
                      null === (n = n.pageContainer) ||
                      void 0 === n
                        ? void 0
                        : n.paddingBlockPageContainerContent,
                    paddingInline:
                      null === (o = e.layout) ||
                      void 0 === o ||
                      null === (o = o.pageContainer) ||
                      void 0 === o
                        ? void 0
                        : o.paddingInlinePageContainerContent,
                    '&-has-page-container': { padding: 0 },
                  },
                ),
                ''.concat(e.componentCls, '-container'),
                {
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: 0,
                  minHeight: 0,
                  backgroundColor: 'transparent',
                },
              ),
              ''.concat(e.componentCls, '-bg-list'),
              {
                pointerEvents: 'none',
                position: 'fixed',
                overflow: 'hidden',
                insetBlockStart: 0,
                insetInlineStart: 0,
                zIndex: 0,
                height: '100%',
                width: '100%',
                background:
                  null === (r = e.layout) || void 0 === r ? void 0 : r.bgLayout,
              },
            ),
          );
        };
      var go = n(14224),
        yo = function (e, t, n) {
          var o = e,
            r = o.breadcrumbName,
            i = o.title,
            a = o.path;
          return n.findIndex(function (t) {
            return t.linkPath === e.path;
          }) ===
            n.length - 1
            ? (0, Bt.jsx)('span', { children: i || r })
            : (0, Bt.jsx)('span', {
                onClick: a
                  ? function () {
                      return (location.href = a);
                    }
                  : void 0,
                children: i || r,
              });
        },
        xo = function (e, t, n) {
          var o = (function (e) {
              if (!e || '/' === e) return ['/'];
              var t = e.split('/').filter(function (e) {
                return e;
              });
              return t.map(function (e, n) {
                return '/'.concat(t.slice(0, n + 1).join('/'));
              });
            })(null == e ? void 0 : e.pathname),
            r = o
              .map(function (e) {
                var o = (function (e, t) {
                    var n = e.get(t);
                    if (!n) {
                      var o = (Array.from(e.keys()) || []).find(function (e) {
                        try {
                          return (
                            (null == e || !e.startsWith('http')) &&
                            (0, ao.EQ)(e.replace('?', ''))(t)
                          );
                        } catch (t) {
                          return console.log('path', e, t), !1;
                        }
                      });
                      o && (n = e.get(o));
                    }
                    return n || { path: '' };
                  })(t, e),
                  r = (function (e, t) {
                    var n = t.formatMessage,
                      o = t.menu;
                    return e.locale &&
                      n &&
                      !1 !== (null == o ? void 0 : o.locale)
                      ? n({ id: e.locale, defaultMessage: e.name })
                      : e.name;
                  })(o, n),
                  i = o.hideInBreadcrumb;
                return r && !i
                  ? {
                      linkPath: e,
                      breadcrumbName: r,
                      title: r,
                      component: o.component,
                    }
                  : { linkPath: '', breadcrumbName: '', title: '' };
              })
              .filter(function (e) {
                return e && e.linkPath;
              });
          return r;
        },
        Co = function (e, t) {
          var n = e.breadcrumbRender,
            o = e.itemRender,
            r = (t.breadcrumbProps || {}).minLength,
            i = void 0 === r ? 2 : r,
            a = (function (e) {
              var t = (function (e) {
                  return {
                    location: e.location,
                    breadcrumbMap: e.breadcrumbMap,
                  };
                })(e),
                n = t.location,
                o = t.breadcrumbMap;
              return n && n.pathname && o ? xo(n, o, e) : [];
            })(e),
            l = function (e) {
              for (
                var t = o || yo,
                  n = arguments.length,
                  r = new Array(n > 1 ? n - 1 : 0),
                  i = 1;
                i < n;
                i++
              )
                r[i - 1] = arguments[i];
              return null == t
                ? void 0
                : t.apply(
                    void 0,
                    [
                      (0, y.Z)(
                        (0, y.Z)({}, e),
                        {},
                        { path: e.linkPath || e.path },
                      ),
                    ].concat(r),
                  );
            },
            c = a;
          return (
            n && (c = n(c || []) || void 0),
            ((c && c.length < i) || !1 === n) && (c = void 0),
            (0, M.n)(
              void 0 === go
                ? j.Z
                : (null == go ||
                  null ===
                    (go = { NODE_ENV: 'production', PUBLIC_PATH: './' }) ||
                  void 0 === go
                    ? void 0
                    : go.ANTD_VERSION) || j.Z,
              '5.3.0',
            ) > -1
              ? { items: c, itemRender: l }
              : { routes: c, itemRender: l }
          );
        };
      var bo = function e(t, n, o, r) {
          var i,
            a = ke(t, (null == n ? void 0 : n.locale) || !1, o, !0),
            l = a.menuData,
            c = a.breadcrumb;
          return r
            ? e(r(l), n, o, void 0)
            : {
                breadcrumb:
                  ((i = c),
                  (0, Fe.Z)(i).reduce(function (e, t) {
                    var n = (0, g.Z)(t, 2),
                      o = n[0],
                      r = n[1];
                    return (e[o] = r), e;
                  }, {})),
                breadcrumbMap: c,
                menuData: l,
              };
        },
        ko = n(83147),
        Eo = ['id', 'defaultMessage'],
        Zo = ['fixSiderbar', 'navTheme', 'layout'],
        Mo = 0,
        jo = function (e) {
          var t,
            n,
            o,
            r,
            i,
            a,
            l,
            c,
            s,
            d,
            u,
            b,
            k,
            M,
            j = e || {},
            w = j.children,
            B = j.onCollapse,
            I = j.location,
            L = void 0 === I ? { pathname: '/' } : I,
            A = j.contentStyle,
            R = j.route,
            N = j.defaultCollapsed,
            T = j.style,
            H = j.siderWidth,
            z = j.menu,
            D = j.siderMenuType,
            P = j.isChildrenLayout,
            O = j.menuDataRender,
            W = j.actionRef,
            $ = j.bgLayoutImgList,
            _ = j.formatMessage,
            G = j.loading,
            V = (0, p.useMemo)(
              function () {
                return H || ('mix' === e.layout ? 215 : 256);
              },
              [e.layout, H],
            ),
            K = (0, p.useContext)(Ie.ZP.ConfigContext),
            U =
              null !== (t = e.prefixCls) && void 0 !== t
                ? t
                : K.getPrefixCls('pro'),
            X = (0, C.Z)(!1, {
              value: null == z ? void 0 : z.loading,
              onChange: null == z ? void 0 : z.onLoadingChange,
            }),
            q = (0, g.Z)(X, 2),
            Q = q[0],
            Y = q[1],
            J = (0, p.useState)(function () {
              return 'pro-layout-'.concat((Mo += 1));
            }),
            ee = (0, g.Z)(J, 1)[0],
            te = (0, p.useCallback)(
              function (e) {
                var t = e.id,
                  n = e.defaultMessage,
                  o = (0, v.Z)(e, Eo);
                if (_) return _((0, y.Z)({ id: t, defaultMessage: n }, o));
                var r = mo();
                return r[t] ? r[t] : n;
              },
              [_],
            ),
            ne = (0, Qe.ZP)(
              [ee, null == z ? void 0 : z.params],
              (function () {
                var e = (0, f.Z)(
                  (0, h.Z)().mark(function e(t) {
                    var n, o, r, i;
                    return (0, h.Z)().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (o = (0, g.Z)(t, 2)),
                              (r = o[1]),
                              Y(!0),
                              (e.next = 4),
                              null == z ||
                              null === (n = z.request) ||
                              void 0 === n
                                ? void 0
                                : n.call(
                                    z,
                                    r || {},
                                    (null == R ? void 0 : R.children) ||
                                      (null == R ? void 0 : R.routes) ||
                                      [],
                                  )
                            );
                          case 4:
                            return (i = e.sent), Y(!1), e.abrupt('return', i);
                          case 7:
                          case 'end':
                            return e.stop();
                        }
                    }, e);
                  }),
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
              {
                revalidateOnFocus: !1,
                shouldRetryOnError: !1,
                revalidateOnReconnect: !1,
              },
            ),
            oe = ne.data,
            re = ne.mutate,
            ie = ne.isLoading;
          (0, p.useEffect)(
            function () {
              Y(ie);
            },
            [ie],
          );
          var ae = (0, Ye.kY)().cache;
          (0, p.useEffect)(function () {
            return function () {
              ae instanceof Map && ae.delete(ee);
            };
          }, []);
          var le =
              (0, p.useMemo)(
                function () {
                  return bo(
                    oe ||
                      (null == R ? void 0 : R.children) ||
                      (null == R ? void 0 : R.routes) ||
                      [],
                    z,
                    te,
                    O,
                  );
                },
                [
                  te,
                  z,
                  O,
                  oe,
                  null == R ? void 0 : R.children,
                  null == R ? void 0 : R.routes,
                ],
              ) || {},
            ce = le.breadcrumb,
            se = le.breadcrumbMap,
            de = le.menuData,
            ue = void 0 === de ? [] : de;
          W &&
            null != z &&
            z.request &&
            (W.current = {
              reload: function () {
                re();
              },
            });
          var pe = (0, p.useMemo)(
              function () {
                return Be(L.pathname || '/', ue || [], !0);
              },
              [L.pathname, ue],
            ),
            me = (0, p.useMemo)(
              function () {
                return Array.from(
                  new Set(
                    pe.map(function (e) {
                      return e.key || e.path || '';
                    }),
                  ),
                );
              },
              [pe],
            ),
            he = pe[pe.length - 1] || {},
            fe = (function (e) {
              var t = (0, p.useState)({}),
                n = (0, g.Z)(t, 2),
                o = n[0],
                r = n[1];
              return (
                (0, p.useEffect)(
                  function () {
                    r(
                      S({
                        layout:
                          'object' !== (0, ko.Z)(e.layout) ? e.layout : void 0,
                        navTheme: e.navTheme,
                        menuRender: e.menuRender,
                        footerRender: e.footerRender,
                        menuHeaderRender: e.menuHeaderRender,
                        headerRender: e.headerRender,
                        fixSiderbar: e.fixSiderbar,
                      }),
                    );
                  },
                  [
                    e.layout,
                    e.navTheme,
                    e.menuRender,
                    e.footerRender,
                    e.menuHeaderRender,
                    e.headerRender,
                    e.fixSiderbar,
                  ],
                ),
                o
              );
            })(he),
            ve = (0, y.Z)((0, y.Z)({}, e), fe),
            ge = ve.fixSiderbar,
            ye = (ve.navTheme, ve.layout),
            xe = (0, v.Z)(ve, Zo),
            Ce = E(),
            be = (0, p.useMemo)(
              function () {
                return ('sm' === Ce || 'xs' === Ce) && !e.disableMobile;
              },
              [Ce, e.disableMobile],
            ),
            ke = 'top' !== ye && !be,
            Ee = (0, C.Z)(
              function () {
                return void 0 !== N ? N : !!be || 'md' === Ce;
              },
              { value: e.collapsed, onChange: B },
            ),
            Ze = (0, g.Z)(Ee, 2),
            Me = Ze[0],
            je = Ze[1],
            Se = (0, Re.Z)(
              (0, y.Z)(
                (0, y.Z)(
                  (0, y.Z)({ prefixCls: U }, e),
                  {},
                  { siderWidth: V },
                  fe,
                ),
                {},
                {
                  formatMessage: te,
                  breadcrumb: ce,
                  menu: (0, y.Z)(
                    (0, y.Z)({}, z),
                    {},
                    { type: D || (null == z ? void 0 : z.type), loading: Q },
                  ),
                  layout: ye,
                },
              ),
              ['className', 'style', 'breadcrumbRender'],
            ),
            we = (function (e, t) {
              var n = t.pageTitleRender,
                o = lo(e);
              if (!1 === n)
                return { title: t.title || '', id: '', pageName: '' };
              if (n) {
                var r = n(e, o.title, o);
                if ('string' == typeof r)
                  return lo((0, y.Z)((0, y.Z)({}, o), {}, { title: r }));
                (0, qe.ZP)(
                  'string' == typeof r,
                  'pro-layout: renderPageTitle return value should be a string',
                );
              }
              return o;
            })(
              (0, y.Z)(
                (0, y.Z)({ pathname: L.pathname }, Se),
                {},
                { breadcrumbMap: se },
              ),
              e,
            ),
            Fe = Co(
              (0, y.Z)(
                (0, y.Z)({}, Se),
                {},
                { breadcrumbRender: e.breadcrumbRender, breadcrumbMap: se },
              ),
              e,
            ),
            Le = (function (e, t) {
              var n,
                o = e.layout,
                r = e.isMobile,
                i = e.selectedKeys,
                a = e.openKeys,
                l = e.splitMenus,
                c = e.suppressSiderWhenMenuEmpty,
                s = e.menuRender;
              if (!1 === e.menuRender || e.pure) return null;
              var d = e.menuData;
              if (l && (!1 !== a || 'mix' === o) && !r) {
                var u,
                  p = i || t,
                  m = (0, g.Z)(p, 1)[0];
                d =
                  (m &&
                    (null === (u = e.menuData) ||
                    void 0 === u ||
                    null ===
                      (u = u.find(function (e) {
                        return e.key === m;
                      })) ||
                    void 0 === u
                      ? void 0
                      : u.children)) ||
                  [];
              }
              var h,
                f = Wt(d || []);
              if (f && (null == f ? void 0 : f.length) < 1 && (l || c))
                return null;
              if ('top' === o && !r)
                return (0, Bt.jsx)(
                  ro,
                  (0, y.Z)(
                    (0, y.Z)({ matchMenuKeys: t }, e),
                    {},
                    {
                      hide: !0,
                      stylish:
                        null === (h = e.stylish) || void 0 === h
                          ? void 0
                          : h.sider,
                    },
                  ),
                );
              var v = (0, Bt.jsx)(
                ro,
                (0, y.Z)(
                  (0, y.Z)({ matchMenuKeys: t }, e),
                  {},
                  {
                    menuData: f,
                    stylish:
                      null === (n = e.stylish) || void 0 === n
                        ? void 0
                        : n.sider,
                  },
                ),
              );
              return s ? s(e, v) : v;
            })(
              (0, y.Z)(
                (0, y.Z)({}, Se),
                {},
                { menuData: ue, onCollapse: je, isMobile: be, collapsed: Me },
              ),
              me,
            ),
            Ne = (function (e, t) {
              var n;
              return !1 === e.headerRender || e.pure
                ? null
                : (0, Bt.jsx)(
                    Jn,
                    (0, y.Z)(
                      (0, y.Z)({ matchMenuKeys: t }, e),
                      {},
                      {
                        stylish:
                          null === (n = e.stylish) || void 0 === n
                            ? void 0
                            : n.header,
                      },
                    ),
                  );
            })(
              (0, y.Z)(
                (0, y.Z)({}, Se),
                {},
                {
                  children: null,
                  hasSiderMenu: !!Le,
                  menuData: ue,
                  isMobile: be,
                  collapsed: Me,
                  onCollapse: je,
                },
              ),
              me,
            ),
            Te = (function (e) {
              return !1 === e.footerRender || e.pure
                ? null
                : e.footerRender
                ? e.footerRender((0, y.Z)({}, e), (0, Bt.jsx)(Pt, {}))
                : null;
            })((0, y.Z)({ isMobile: be, collapsed: Me }, Se)),
            He = (0, p.useContext)(io.X).isChildrenLayout,
            ze = void 0 !== P ? P : He,
            De = ''.concat(U, '-layout'),
            Pe = (function (e) {
              return (0, Tt.Xj)('ProLayout', function (t) {
                var n = (0, y.Z)(
                  (0, y.Z)({}, t),
                  {},
                  { componentCls: '.'.concat(e) },
                );
                return [vo(n), fo(n)];
              });
            })(De),
            Oe = Pe.wrapSSR,
            We = Pe.hashId,
            $e = Ae()(
              e.className,
              We,
              'ant-design-pro',
              De,
              (0, m.Z)(
                (0, m.Z)(
                  (0, m.Z)(
                    (0, m.Z)(
                      (0, m.Z)({}, 'screen-'.concat(Ce), Ce),
                      ''.concat(De, '-top-menu'),
                      'top' === ye,
                    ),
                    ''.concat(De, '-is-children'),
                    ze,
                  ),
                  ''.concat(De, '-fix-siderbar'),
                  ge,
                ),
                ''.concat(De, '-').concat(ye),
                ye,
              ),
            ),
            _e = (function (e, t, n) {
              return e ? (t ? 64 : n) : 0;
            })(!!ke, Me, V),
            Ge = { position: 'relative' };
          (ze || (A && A.minHeight)) && (Ge.minHeight = 0),
            (0, p.useEffect)(
              function () {
                var t;
                null === (t = e.onPageChange) ||
                  void 0 === t ||
                  t.call(e, e.location);
              },
              [
                L.pathname,
                null === (n = L.pathname) || void 0 === n ? void 0 : n.search,
              ],
            );
          var Ve,
            Ke,
            Ue,
            Je = (0, p.useState)(!1),
            et = (0, g.Z)(Je, 2),
            tt = et[0],
            nt = et[1],
            ot = (0, p.useState)(0),
            rt = (0, g.Z)(ot, 2),
            it = rt[0],
            at = rt[1];
          (Ve = we),
            (Ke = e.title || !1),
            (Ue = 'string' == typeof Ve.pageName ? Ve.title : Ke),
            (0, p.useEffect)(
              function () {
                (0, Z.j)() && Ue && (document.title = Ue);
              },
              [Ve.title, Ue],
            );
          var lt = (0, p.useContext)(x.L_).token,
            ct = (0, p.useMemo)(
              function () {
                return $ && $.length > 0
                  ? null == $
                    ? void 0
                    : $.map(function (e, t) {
                        return (0,
                        Bt.jsx)('img', { src: e.src, style: (0, y.Z)({ position: 'absolute' }, e) }, t);
                      })
                  : null;
              },
              [$],
            );
          return Oe(
            (0, Bt.jsx)(io.X.Provider, {
              value: (0, y.Z)(
                (0, y.Z)({}, Se),
                {},
                {
                  breadcrumb: Fe,
                  menuData: ue,
                  isMobile: be,
                  collapsed: Me,
                  hasPageContainer: it,
                  setHasPageContainer: at,
                  isChildrenLayout: !0,
                  title: we.pageName,
                  hasSiderMenu: !!Le,
                  hasHeader: !!Ne,
                  siderWidth: _e,
                  hasFooter: !!Te,
                  hasFooterToolbar: tt,
                  setHasFooterToolbar: nt,
                  pageTitleInfo: we,
                  matchMenus: pe,
                  matchMenuKeys: me,
                  currentMenu: he,
                },
              ),
              children: e.pure
                ? (0, Bt.jsx)(Bt.Fragment, { children: w })
                : (0, Bt.jsxs)('div', {
                    className: $e,
                    children: [
                      ct ||
                      (null !== (o = lt.layout) && void 0 !== o && o.bgLayout)
                        ? (0, Bt.jsx)('div', {
                            className: Ae()(''.concat(De, '-bg-list'), We),
                            children: ct,
                          })
                        : null,
                      (0, Bt.jsxs)(Xe, {
                        style: (0, y.Z)(
                          {
                            minHeight: '100%',
                            flexDirection: Le ? 'row' : void 0,
                          },
                          T,
                        ),
                        children: [
                          (0, Bt.jsx)(Ie.ZP, {
                            theme: {
                              hashed: (0, x.nu)(),
                              token: {
                                controlHeightLG:
                                  (null === (r = lt.layout) ||
                                  void 0 === r ||
                                  null === (r = r.sider) ||
                                  void 0 === r
                                    ? void 0
                                    : r.menuHeight) ||
                                  (null == lt ? void 0 : lt.controlHeightLG),
                              },
                              components: {
                                Menu: F({
                                  colorItemBg:
                                    (null === (i = lt.layout) ||
                                    void 0 === i ||
                                    null === (i = i.sider) ||
                                    void 0 === i
                                      ? void 0
                                      : i.colorMenuBackground) || 'transparent',
                                  colorSubItemBg:
                                    (null === (a = lt.layout) ||
                                    void 0 === a ||
                                    null === (a = a.sider) ||
                                    void 0 === a
                                      ? void 0
                                      : a.colorMenuBackground) || 'transparent',
                                  radiusItem: lt.borderRadius,
                                  colorItemBgSelected:
                                    (null === (l = lt.layout) ||
                                    void 0 === l ||
                                    null === (l = l.sider) ||
                                    void 0 === l
                                      ? void 0
                                      : l.colorBgMenuItemSelected) ||
                                    (null == lt ? void 0 : lt.colorBgTextHover),
                                  colorItemBgHover:
                                    (null === (c = lt.layout) ||
                                    void 0 === c ||
                                    null === (c = c.sider) ||
                                    void 0 === c
                                      ? void 0
                                      : c.colorBgMenuItemHover) ||
                                    (null == lt ? void 0 : lt.colorBgTextHover),
                                  colorItemBgActive:
                                    (null === (s = lt.layout) ||
                                    void 0 === s ||
                                    null === (s = s.sider) ||
                                    void 0 === s
                                      ? void 0
                                      : s.colorBgMenuItemActive) ||
                                    (null == lt
                                      ? void 0
                                      : lt.colorBgTextActive),
                                  colorItemBgSelectedHorizontal:
                                    (null === (d = lt.layout) ||
                                    void 0 === d ||
                                    null === (d = d.sider) ||
                                    void 0 === d
                                      ? void 0
                                      : d.colorBgMenuItemSelected) ||
                                    (null == lt ? void 0 : lt.colorBgTextHover),
                                  colorActiveBarWidth: 0,
                                  colorActiveBarHeight: 0,
                                  colorActiveBarBorderSize: 0,
                                  colorItemText:
                                    (null === (u = lt.layout) ||
                                    void 0 === u ||
                                    null === (u = u.sider) ||
                                    void 0 === u
                                      ? void 0
                                      : u.colorTextMenu) ||
                                    (null == lt
                                      ? void 0
                                      : lt.colorTextSecondary),
                                  colorItemTextHover:
                                    (null === (b = lt.layout) ||
                                    void 0 === b ||
                                    null === (b = b.sider) ||
                                    void 0 === b
                                      ? void 0
                                      : b.colorTextMenuItemHover) ||
                                    'rgba(0, 0, 0, 0.85)',
                                  colorItemTextSelected:
                                    (null === (k = lt.layout) ||
                                    void 0 === k ||
                                    null === (k = k.sider) ||
                                    void 0 === k
                                      ? void 0
                                      : k.colorTextMenuSelected) ||
                                    'rgba(0, 0, 0, 1)',
                                  popupBg:
                                    null == lt ? void 0 : lt.colorBgElevated,
                                  subMenuItemBg:
                                    null == lt ? void 0 : lt.colorBgElevated,
                                  darkSubMenuItemBg: 'transparent',
                                  darkPopupBg:
                                    null == lt ? void 0 : lt.colorBgElevated,
                                }),
                              },
                            },
                            children: Le,
                          }),
                          (0, Bt.jsxs)('div', {
                            style: Ge,
                            className: ''
                              .concat(De, '-container ')
                              .concat(We)
                              .trim(),
                            children: [
                              Ne,
                              (0, Bt.jsx)(
                                Ft,
                                (0, y.Z)(
                                  (0, y.Z)(
                                    {
                                      hasPageContainer: it,
                                      isChildrenLayout: ze,
                                    },
                                    xe,
                                  ),
                                  {},
                                  {
                                    hasHeader: !!Ne,
                                    prefixCls: De,
                                    style: A,
                                    children: G ? (0, Bt.jsx)(eo.S, {}) : w,
                                  },
                                ),
                              ),
                              Te,
                              tt &&
                                (0, Bt.jsx)('div', {
                                  className: ''.concat(De, '-has-footer'),
                                  style: {
                                    height: 64,
                                    marginBlockStart:
                                      null === (M = lt.layout) ||
                                      void 0 === M ||
                                      null === (M = M.pageContainer) ||
                                      void 0 === M
                                        ? void 0
                                        : M.paddingBlockPageContainerContent,
                                  },
                                }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
            }),
          );
        },
        So = function (e) {
          var t = e.colorPrimary,
            n =
              void 0 !== e.navTheme ? { dark: 'realDark' === e.navTheme } : {};
          return (0, Bt.jsx)(Ie.ZP, {
            theme: t ? { token: { colorPrimary: t } } : void 0,
            children: (0, Bt.jsx)(
              x._Y,
              (0, y.Z)(
                (0, y.Z)({}, n),
                {},
                {
                  token: e.token,
                  prefixCls: e.prefixCls,
                  children: (0, Bt.jsx)(
                    jo,
                    (0, y.Z)(
                      (0, y.Z)({ logo: (0, Bt.jsx)(Lt, {}) }, Mn),
                      {},
                      { location: (0, Z.j)() ? window.location : void 0 },
                      e,
                    ),
                  ),
                },
              ),
            ),
          });
        },
        wo = function () {
          return (0, Bt.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '32',
            height: '32',
            viewBox: '0 0 200 200',
            children: [
              (0, Bt.jsxs)('defs', {
                children: [
                  (0, Bt.jsxs)('linearGradient', {
                    id: 'linearGradient-1',
                    x1: '62.102%',
                    x2: '108.197%',
                    y1: '0%',
                    y2: '37.864%',
                    children: [
                      (0, Bt.jsx)('stop', {
                        offset: '0%',
                        stopColor: '#4285EB',
                      }),
                      (0, Bt.jsx)('stop', {
                        offset: '100%',
                        stopColor: '#2EC7FF',
                      }),
                    ],
                  }),
                  (0, Bt.jsxs)('linearGradient', {
                    id: 'linearGradient-2',
                    x1: '69.644%',
                    x2: '54.043%',
                    y1: '0%',
                    y2: '108.457%',
                    children: [
                      (0, Bt.jsx)('stop', {
                        offset: '0%',
                        stopColor: '#29CDFF',
                      }),
                      (0, Bt.jsx)('stop', {
                        offset: '37.86%',
                        stopColor: '#148EFF',
                      }),
                      (0, Bt.jsx)('stop', {
                        offset: '100%',
                        stopColor: '#0A60FF',
                      }),
                    ],
                  }),
                  (0, Bt.jsxs)('linearGradient', {
                    id: 'linearGradient-3',
                    x1: '69.691%',
                    x2: '16.723%',
                    y1: '-12.974%',
                    y2: '117.391%',
                    children: [
                      (0, Bt.jsx)('stop', {
                        offset: '0%',
                        stopColor: '#FA816E',
                      }),
                      (0, Bt.jsx)('stop', {
                        offset: '41.473%',
                        stopColor: '#F74A5C',
                      }),
                      (0, Bt.jsx)('stop', {
                        offset: '100%',
                        stopColor: '#F51D2C',
                      }),
                    ],
                  }),
                  (0, Bt.jsxs)('linearGradient', {
                    id: 'linearGradient-4',
                    x1: '68.128%',
                    x2: '30.44%',
                    y1: '-35.691%',
                    y2: '114.943%',
                    children: [
                      (0, Bt.jsx)('stop', {
                        offset: '0%',
                        stopColor: '#FA8E7D',
                      }),
                      (0, Bt.jsx)('stop', {
                        offset: '51.264%',
                        stopColor: '#F74A5C',
                      }),
                      (0, Bt.jsx)('stop', {
                        offset: '100%',
                        stopColor: '#F51D2C',
                      }),
                    ],
                  }),
                ],
              }),
              (0, Bt.jsx)('g', {
                fill: 'none',
                fillRule: 'evenodd',
                stroke: 'none',
                strokeWidth: '1',
                children: (0, Bt.jsx)('g', {
                  transform: 'translate(-20 -20)',
                  children: (0, Bt.jsx)('g', {
                    transform: 'translate(20 20)',
                    children: (0, Bt.jsxs)('g', {
                      children: [
                        (0, Bt.jsxs)('g', {
                          fillRule: 'nonzero',
                          children: [
                            (0, Bt.jsxs)('g', {
                              children: [
                                (0, Bt.jsx)('path', {
                                  fill: 'url(#linearGradient-1)',
                                  d: 'M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c1.17-1.169 2.944-1.169 4.114 0l27.783 27.76c4.209 4.205 11.032 4.205 15.24 0 4.209-4.205 4.209-11.022 0-15.227L108.581 4.056c-4.719-4.594-12.312-4.557-16.993.12z',
                                }),
                                (0, Bt.jsx)('path', {
                                  fill: 'url(#linearGradient-2)',
                                  d: 'M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c2.912-2.51 7.664-7.596 14.642-8.786 5.186-.883 10.855 1.062 17.009 5.837L108.58 4.056c-4.719-4.594-12.312-4.557-16.993.12z',
                                }),
                              ],
                            }),
                            (0, Bt.jsx)('path', {
                              fill: 'url(#linearGradient-3)',
                              d: 'M153.686 135.855c4.208 4.205 11.031 4.205 15.24 0l27.034-27.012c4.7-4.696 4.7-12.28 0-16.974l-27.27-27.15c-4.218-4.2-11.043-4.195-15.254.013-4.209 4.205-4.209 11.022 0 15.227l18.418 18.403c1.17 1.169 1.17 2.943 0 4.111l-18.168 18.154c-4.209 4.205-4.209 11.023 0 15.228z',
                            }),
                          ],
                        }),
                        (0, Bt.jsx)('ellipse', {
                          cx: '100.519',
                          cy: '100.437',
                          fill: 'url(#linearGradient-4)',
                          rx: '23.6',
                          ry: '23.581',
                        }),
                      ],
                    }),
                  }),
                }),
              }),
            ],
          });
        },
        Bo = n(72937),
        Io = function (e) {
          var t, n;
          return (
            (!e.route && (e.noFound || e.notFound)) ||
            ((null === (t = e.route) || void 0 === t
              ? void 0
              : t.unaccessible) &&
              (e.unAccessible || e.noAccessible)) ||
            ((!e.route ||
              (null === (n = e.route) || void 0 === n
                ? void 0
                : n.unaccessible)) &&
              (0, Bt.jsx)(wt, {
                status: e.route ? '403' : '404',
                title: e.route ? '403' : '404',
                subTitle: e.route
                  ? '抱歉，你无权访问该页面'
                  : '抱歉，你访问的页面不存在',
                extra: (0, Bt.jsx)(Bo.ZP, {
                  type: 'primary',
                  onClick: function () {
                    return u.history.push('/');
                  },
                  children: '返回首页',
                }),
              })) ||
            e.children
          );
        },
        Fo = n(33035),
        Lo = n(58407),
        Ao = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z',
                },
              },
            ],
          },
          name: 'logout',
          theme: 'outlined',
        },
        Ro = n(45791),
        No = function (e, t) {
          return p.createElement(
            Ro.Z,
            (0, y.Z)((0, y.Z)({}, e), {}, { ref: t, icon: Ao }),
          );
        };
      var To = p.forwardRef(No);
      var Ho = n(88710),
        zo = n(82081),
        Do = function e(t, n) {
          if (0 === t.length) return [];
          var o,
            r = [],
            i = d()(t);
          try {
            for (i.s(); !(o = i.n()).done; ) {
              var l = o.value,
                s = c()({}, l);
              n(l)
                ? Array.isArray(s.routes) &&
                  r.push.apply(r, a()(e(s.routes, n)))
                : (Array.isArray(s.children) &&
                    ((s.children = e(s.children, n)), (s.routes = s.children)),
                  r.push(s));
            }
          } catch (e) {
            i.e(e);
          } finally {
            i.f();
          }
          return r;
        },
        Po = function e(t) {
          return 0 === t.length
            ? []
            : t.map(function (t) {
                var n = c()({}, t);
                return (
                  t.originPath && (n.path = t.originPath),
                  Array.isArray(t.routes) && (n.routes = e(t.routes)),
                  Array.isArray(t.children) && (n.children = e(t.children)),
                  n
                );
              });
        },
        Oo = function (e) {
          var t = (0, u.useLocation)(),
            n = (0, u.useNavigate)(),
            o = (0, u.useAppData)(),
            i = o.clientRoutes,
            a = o.pluginManager,
            l = (Ho.t && (0, Ho.t)('@@initialState')) || {
              initialState: void 0,
              loading: !1,
              setInitialState: null,
            },
            s = l.initialState,
            d = l.loading,
            m = l.setInitialState,
            h = { title: 'isles' },
            f = a.applyPlugins({
              key: 'layout',
              type: 'modify',
              initialValue: c()({}, l),
            }),
            v = Do(
              i.filter(function (e) {
                return 'ant-design-pro-layout' === e.id;
              }),
              function (e) {
                return (
                  (!!e.isLayout && 'ant-design-pro-layout' !== e.id) ||
                  !!e.isWrapper
                );
              },
            ),
            g = (0, zo.Mf)(Po(v)),
            y = r()(g, 1)[0],
            x = (0, p.useMemo)(
              function () {
                var e, n;
                return null ===
                  (e = (0, u.matchRoutes)(y.children, t.pathname)) ||
                  void 0 === e ||
                  null === (n = e.pop) ||
                  void 0 === n ||
                  null === (n = n.call(e)) ||
                  void 0 === n
                  ? void 0
                  : n.route;
              },
              [t.pathname],
            );
          return (0, Bt.jsx)(
            So,
            c()(
              c()(
                {
                  route: y,
                  location: t,
                  title: h.title || 'plugin-layout',
                  navTheme: 'dark',
                  siderWidth: 256,
                  onMenuHeaderClick: function (e) {
                    e.stopPropagation(), e.preventDefault(), n('/');
                  },
                  formatMessage: h.formatMessage || undefined,
                  menu: { locale: h.locale },
                  logo: wo,
                  menuItemRender: function (e, n) {
                    return e.isUrl || e.children
                      ? n
                      : e.path && t.pathname !== e.path
                      ? (0, Bt.jsx)(u.Link, {
                          to: e.path.replace('/*', ''),
                          target: e.target,
                          children: n,
                        })
                      : n;
                  },
                  itemRender: function (e, t, n) {
                    var o = e.breadcrumbName,
                      r = e.title,
                      i = e.path,
                      a = r || o,
                      l = n[n.length - 1];
                    return !l || (l.path !== i && l.linkPath !== i)
                      ? (0, Bt.jsx)(u.Link, { to: i, children: a })
                      : (0, Bt.jsx)('span', { children: a });
                  },
                  disableContentMargin: !0,
                  fixSiderbar: !0,
                  fixedHeader: !0,
                },
                f,
              ),
              {},
              {
                rightContentRender:
                  !1 !== f.rightContentRender &&
                  function (e) {
                    var t = (function (e) {
                      var t, n, o, r, i;
                      if (e.runtimeConfig.rightRender)
                        return e.runtimeConfig.rightRender(
                          e.initialState,
                          e.setInitialState,
                          e.runtimeConfig,
                        );
                      var a =
                          (null === (t = e.initialState) || void 0 === t
                            ? void 0
                            : t.avatar) ||
                          (null === (n = e.initialState) || void 0 === n
                            ? void 0
                            : n.name) ||
                          e.runtimeConfig.logout,
                        l =
                          !1 ===
                          (null === (o = e.initialState) || void 0 === o
                            ? void 0
                            : o.avatar),
                        s = l
                          ? 'umi-plugin-layout-name umi-plugin-layout-hide-avatar-img'
                          : 'umi-plugin-layout-name',
                        d = a
                          ? (0, Bt.jsxs)('span', {
                              className: 'umi-plugin-layout-action',
                              children: [
                                l
                                  ? null
                                  : (0, Bt.jsx)(on.Z, {
                                      size: 'small',
                                      className: 'umi-plugin-layout-avatar',
                                      src:
                                        (null === (r = e.initialState) ||
                                        void 0 === r
                                          ? void 0
                                          : r.avatar) ||
                                        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                                      alt: 'avatar',
                                    }),
                                (0, Bt.jsx)('span', {
                                  className: s,
                                  children:
                                    null === (i = e.initialState) ||
                                    void 0 === i
                                      ? void 0
                                      : i.name,
                                }),
                              ],
                            })
                          : null;
                      if (e.loading)
                        return (0, Bt.jsx)('div', {
                          className: 'umi-plugin-layout-right',
                          children: (0, Bt.jsx)(Fo.Z, {
                            size: 'small',
                            style: { marginLeft: 8, marginRight: 8 },
                          }),
                        });
                      if (!d) return null;
                      var u,
                        p = {
                          className: 'umi-plugin-layout-menu',
                          selectedKeys: [],
                          items: [
                            {
                              key: 'logout',
                              label: (0, Bt.jsxs)(Bt.Fragment, {
                                children: [(0, Bt.jsx)(To, {}), '退出登录'],
                              }),
                              onClick: function () {
                                var t, n;
                                null == e ||
                                  null === (t = e.runtimeConfig) ||
                                  void 0 === t ||
                                  null === (n = t.logout) ||
                                  void 0 === n ||
                                  n.call(t, e.initialState);
                              },
                            },
                          ],
                        };
                      return (
                        (u =
                          j.Z.startsWith('6.') ||
                          j.Z.startsWith('5.') ||
                          j.Z.startsWith('4.24.')
                            ? { menu: p }
                            : j.Z.startsWith('3.')
                            ? {
                                overlay: (0, Bt.jsx)(an.Z, {
                                  children: p.items.map(function (e) {
                                    return (0,
                                    Bt.jsx)(an.Z.Item, { onClick: e.onClick, children: e.label }, e.key);
                                  }),
                                }),
                              }
                            : { overlay: (0, Bt.jsx)(an.Z, c()({}, p)) }),
                        (0, Bt.jsx)('div', {
                          className: 'umi-plugin-layout-right anticon',
                          children: e.runtimeConfig.logout
                            ? (0, Bt.jsx)(
                                Lo.Z,
                                c()(
                                  c()({}, u),
                                  {},
                                  {
                                    overlayClassName:
                                      'umi-plugin-layout-container',
                                    children: d,
                                  },
                                ),
                              )
                            : d,
                        })
                      );
                    })({
                      runtimeConfig: f,
                      loading: d,
                      initialState: s,
                      setInitialState: m,
                    });
                    return f.rightContentRender
                      ? f.rightContentRender(e, t, {
                          userConfig: h,
                          runtimeConfig: f,
                          loading: d,
                          initialState: s,
                          setInitialState: m,
                        })
                      : t;
                  },
                children: (0, Bt.jsx)(Io, {
                  route: x,
                  noFound: null == f ? void 0 : f.noFound,
                  notFound: null == f ? void 0 : f.notFound,
                  unAccessible: null == f ? void 0 : f.unAccessible,
                  noAccessible: null == f ? void 0 : f.noAccessible,
                  children: f.childrenRender
                    ? f.childrenRender((0, Bt.jsx)(u.Outlet, {}), e)
                    : (0, Bt.jsx)(u.Outlet, {}),
                }),
              },
            ),
          );
        };
    },
    18105: function (e, t) {
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      function o(e, t) {
        void 0 === t && (t = {});
        for (
          var n = (function (e) {
              for (var t = [], n = 0; n < e.length; ) {
                var o = e[n];
                if ('*' !== o && '+' !== o && '?' !== o)
                  if ('\\' !== o)
                    if ('{' !== o)
                      if ('}' !== o)
                        if (':' !== o)
                          if ('(' !== o)
                            t.push({ type: 'CHAR', index: n, value: e[n++] });
                          else {
                            var r = 1,
                              i = '';
                            if ('?' === e[(l = n + 1)])
                              throw new TypeError(
                                'Pattern cannot start with "?" at ' + l,
                              );
                            for (; l < e.length; )
                              if ('\\' !== e[l]) {
                                if (')' === e[l]) {
                                  if (0 == --r) {
                                    l++;
                                    break;
                                  }
                                } else if (
                                  '(' === e[l] &&
                                  (r++, '?' !== e[l + 1])
                                )
                                  throw new TypeError(
                                    'Capturing groups are not allowed at ' + l,
                                  );
                                i += e[l++];
                              } else i += e[l++] + e[l++];
                            if (r)
                              throw new TypeError('Unbalanced pattern at ' + n);
                            if (!i)
                              throw new TypeError('Missing pattern at ' + n);
                            t.push({ type: 'PATTERN', index: n, value: i }),
                              (n = l);
                          }
                        else {
                          for (var a = '', l = n + 1; l < e.length; ) {
                            var c = e.charCodeAt(l);
                            if (
                              !(
                                (c >= 48 && c <= 57) ||
                                (c >= 65 && c <= 90) ||
                                (c >= 97 && c <= 122) ||
                                95 === c
                              )
                            )
                              break;
                            a += e[l++];
                          }
                          if (!a)
                            throw new TypeError(
                              'Missing parameter name at ' + n,
                            );
                          t.push({ type: 'NAME', index: n, value: a }), (n = l);
                        }
                      else t.push({ type: 'CLOSE', index: n, value: e[n++] });
                    else t.push({ type: 'OPEN', index: n, value: e[n++] });
                  else
                    t.push({ type: 'ESCAPED_CHAR', index: n++, value: e[n++] });
                else t.push({ type: 'MODIFIER', index: n, value: e[n++] });
              }
              return t.push({ type: 'END', index: n, value: '' }), t;
            })(e),
            o = t.prefixes,
            r = void 0 === o ? './' : o,
            i = '[^' + a(t.delimiter || '/#?') + ']+?',
            l = [],
            c = 0,
            s = 0,
            d = '',
            u = function (e) {
              if (s < n.length && n[s].type === e) return n[s++].value;
            },
            p = function (e) {
              var t = u(e);
              if (void 0 !== t) return t;
              var o = n[s],
                r = o.type,
                i = o.index;
              throw new TypeError(
                'Unexpected ' + r + ' at ' + i + ', expected ' + e,
              );
            },
            m = function () {
              for (var e, t = ''; (e = u('CHAR') || u('ESCAPED_CHAR')); )
                t += e;
              return t;
            };
          s < n.length;

        ) {
          var h = u('CHAR'),
            f = u('NAME'),
            v = u('PATTERN');
          if (f || v) {
            var g = h || '';
            -1 === r.indexOf(g) && ((d += g), (g = '')),
              d && (l.push(d), (d = '')),
              l.push({
                name: f || c++,
                prefix: g,
                suffix: '',
                pattern: v || i,
                modifier: u('MODIFIER') || '',
              });
          } else {
            var y = h || u('ESCAPED_CHAR');
            if (y) d += y;
            else if ((d && (l.push(d), (d = '')), u('OPEN'))) {
              g = m();
              var x = u('NAME') || '',
                C = u('PATTERN') || '',
                b = m();
              p('CLOSE'),
                l.push({
                  name: x || (C ? c++ : ''),
                  pattern: x && !C ? i : C,
                  prefix: g,
                  suffix: b,
                  modifier: u('MODIFIER') || '',
                });
            } else p('END');
          }
        }
        return l;
      }
      function r(e, t) {
        void 0 === t && (t = {});
        var o = l(t),
          r = t.encode,
          i =
            void 0 === r
              ? function (e) {
                  return e;
                }
              : r,
          a = t.validate,
          c = void 0 === a || a,
          s = e.map(function (e) {
            if ('object' === n(e))
              return new RegExp('^(?:' + e.pattern + ')$', o);
          });
        return function (t) {
          for (var n = '', o = 0; o < e.length; o++) {
            var r = e[o];
            if ('string' != typeof r) {
              var a = t ? t[r.name] : void 0,
                l = '?' === r.modifier || '*' === r.modifier,
                d = '*' === r.modifier || '+' === r.modifier;
              if (Array.isArray(a)) {
                if (!d)
                  throw new TypeError(
                    'Expected "' + r.name + '" to not repeat, but got an array',
                  );
                if (0 === a.length) {
                  if (l) continue;
                  throw new TypeError(
                    'Expected "' + r.name + '" to not be empty',
                  );
                }
                for (var u = 0; u < a.length; u++) {
                  var p = i(a[u], r);
                  if (c && !s[o].test(p))
                    throw new TypeError(
                      'Expected all "' +
                        r.name +
                        '" to match "' +
                        r.pattern +
                        '", but got "' +
                        p +
                        '"',
                    );
                  n += r.prefix + p + r.suffix;
                }
              } else if ('string' != typeof a && 'number' != typeof a) {
                if (!l) {
                  var m = d ? 'an array' : 'a string';
                  throw new TypeError('Expected "' + r.name + '" to be ' + m);
                }
              } else {
                p = i(String(a), r);
                if (c && !s[o].test(p))
                  throw new TypeError(
                    'Expected "' +
                      r.name +
                      '" to match "' +
                      r.pattern +
                      '", but got "' +
                      p +
                      '"',
                  );
                n += r.prefix + p + r.suffix;
              }
            } else n += r;
          }
          return n;
        };
      }
      function i(e, t, n) {
        void 0 === n && (n = {});
        var o = n.decode,
          r =
            void 0 === o
              ? function (e) {
                  return e;
                }
              : o;
        return function (n) {
          var o = e.exec(n);
          if (!o) return !1;
          for (
            var i = o[0],
              a = o.index,
              l = Object.create(null),
              c = function (e) {
                if (void 0 === o[e]) return 'continue';
                var n = t[e - 1];
                '*' === n.modifier || '+' === n.modifier
                  ? (l[n.name] = o[e]
                      .split(n.prefix + n.suffix)
                      .map(function (e) {
                        return r(e, n);
                      }))
                  : (l[n.name] = r(o[e], n));
              },
              s = 1;
            s < o.length;
            s++
          )
            c(s);
          return { path: i, index: a, params: l };
        };
      }
      function a(e) {
        return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
      }
      function l(e) {
        return e && e.sensitive ? '' : 'i';
      }
      function c(e, t, n) {
        void 0 === n && (n = {});
        for (
          var o = n.strict,
            r = void 0 !== o && o,
            i = n.start,
            c = void 0 === i || i,
            s = n.end,
            d = void 0 === s || s,
            u = n.encode,
            p =
              void 0 === u
                ? function (e) {
                    return e;
                  }
                : u,
            m = '[' + a(n.endsWith || '') + ']|$',
            h = '[' + a(n.delimiter || '/#?') + ']',
            f = c ? '^' : '',
            v = 0,
            g = e;
          v < g.length;
          v++
        ) {
          var y = g[v];
          if ('string' == typeof y) f += a(p(y));
          else {
            var x = a(p(y.prefix)),
              C = a(p(y.suffix));
            if (y.pattern)
              if ((t && t.push(y), x || C))
                if ('+' === y.modifier || '*' === y.modifier) {
                  var b = '*' === y.modifier ? '?' : '';
                  f +=
                    '(?:' +
                    x +
                    '((?:' +
                    y.pattern +
                    ')(?:' +
                    C +
                    x +
                    '(?:' +
                    y.pattern +
                    '))*)' +
                    C +
                    ')' +
                    b;
                } else
                  f += '(?:' + x + '(' + y.pattern + ')' + C + ')' + y.modifier;
              else f += '(' + y.pattern + ')' + y.modifier;
            else f += '(?:' + x + C + ')' + y.modifier;
          }
        }
        if (d) r || (f += h + '?'), (f += n.endsWith ? '(?=' + m + ')' : '$');
        else {
          var k = e[e.length - 1],
            E =
              'string' == typeof k
                ? h.indexOf(k[k.length - 1]) > -1
                : void 0 === k;
          r || (f += '(?:' + h + '(?=' + m + '))?'),
            E || (f += '(?=' + h + '|' + m + ')');
        }
        return new RegExp(f, l(n));
      }
      function s(e, t, n) {
        return e instanceof RegExp
          ? (function (e, t) {
              if (!t) return e;
              var n = e.source.match(/\((?!\?)/g);
              if (n)
                for (var o = 0; o < n.length; o++)
                  t.push({
                    name: o,
                    prefix: '',
                    suffix: '',
                    modifier: '',
                    pattern: '',
                  });
              return e;
            })(e, t)
          : Array.isArray(e)
          ? (function (e, t, n) {
              var o = e.map(function (e) {
                return s(e, t, n).source;
              });
              return new RegExp('(?:' + o.join('|') + ')', l(n));
            })(e, t, n)
          : (function (e, t, n) {
              return c(o(e, n), t, n);
            })(e, t, n);
      }
      (t.Bo = void 0), (t.Bo = s);
    },
    7894: function (e, t, n) {
      'use strict';
      n.d(t, {
        b: function () {
          return p;
        },
        w: function () {
          return s;
        },
      });
      var o = n(75271),
        r = n(15409),
        i = n(22898),
        a = n(26131),
        l = n(86262),
        c = n(38349);
      function s(e) {
        if (!e) return;
        const { closable: t, closeIcon: n } = e;
        return { closable: t, closeIcon: n };
      }
      function d(e) {
        const { closable: t, closeIcon: n } = e || {};
        return o.useMemo(() => {
          if (!t && (!1 === t || !1 === n || null === n)) return !1;
          if (void 0 === t && void 0 === n) return null;
          let e = {
            closeIcon: 'boolean' != typeof n && null !== n ? n : void 0,
          };
          return (
            t &&
              'object' == typeof t &&
              (e = Object.assign(Object.assign({}, e), t)),
            e
          );
        }, [t, n]);
      }
      const u = {},
        p = (e, t, n = u) => {
          const s = d(e),
            p = d(t),
            [m] = (0, a.Z)('global', l.Z.global),
            h = 'boolean' != typeof s && !!(null == s ? void 0 : s.disabled),
            f = o.useMemo(
              () => Object.assign({ closeIcon: o.createElement(r.Z, null) }, n),
              [n],
            ),
            v = o.useMemo(
              () =>
                !1 !== s &&
                (s
                  ? (0, c.Z)(f, p, s)
                  : !1 !== p && (p ? (0, c.Z)(f, p) : !!f.closable && f)),
              [s, p, f],
            );
          return o.useMemo(() => {
            var e, t;
            if (!1 === v) return [!1, null, h, {}];
            const { closeIconRender: n } = f,
              { closeIcon: r } = v;
            let a = r;
            const l = (0, i.Z)(v, !0);
            return (
              null != a &&
                (n && (a = n(r)),
                (a = o.isValidElement(a)
                  ? o.cloneElement(
                      a,
                      Object.assign(
                        Object.assign(Object.assign({}, a.props), {
                          'aria-label':
                            null !==
                              (t =
                                null === (e = a.props) || void 0 === e
                                  ? void 0
                                  : e['aria-label']) && void 0 !== t
                              ? t
                              : m.close,
                        }),
                        l,
                      ),
                    )
                  : o.createElement(
                      'span',
                      Object.assign({ 'aria-label': m.close }, l),
                      a,
                    ))),
              [!0, a, h, l]
            );
          }, [h, m.close, v, f]);
        };
    },
    58407: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return v;
        },
      });
      var o = n(58295),
        r = n(75271),
        i = n(887),
        a = n(82187),
        l = n.n(a),
        c = n(72937),
        s = n(32378),
        d = n(58092),
        u = n(8559),
        p = function (e, t) {
          var n = {};
          for (var o in e)
            Object.prototype.hasOwnProperty.call(e, o) &&
              t.indexOf(o) < 0 &&
              (n[o] = e[o]);
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (o = Object.getOwnPropertySymbols(e); r < o.length; r++)
              t.indexOf(o[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, o[r]) &&
                (n[o[r]] = e[o[r]]);
          }
          return n;
        };
      const m = (e) => {
        const {
            getPopupContainer: t,
            getPrefixCls: n,
            direction: a,
          } = r.useContext(s.E_),
          {
            prefixCls: m,
            type: h = 'default',
            danger: f,
            disabled: v,
            loading: g,
            onClick: y,
            htmlType: x,
            children: C,
            className: b,
            menu: k,
            arrow: E,
            autoFocus: Z,
            overlay: M,
            trigger: j,
            align: S,
            open: w,
            onOpenChange: B,
            placement: I,
            getPopupContainer: F,
            href: L,
            icon: A = r.createElement(i.Z, null),
            title: R,
            buttonsRender: N = (e) => e,
            mouseEnterDelay: T,
            mouseLeaveDelay: H,
            overlayClassName: z,
            overlayStyle: D,
            destroyOnHidden: P,
            destroyPopupOnHide: O,
            dropdownRender: W,
            popupRender: $,
          } = e,
          _ = p(e, [
            'prefixCls',
            'type',
            'danger',
            'disabled',
            'loading',
            'onClick',
            'htmlType',
            'children',
            'className',
            'menu',
            'arrow',
            'autoFocus',
            'overlay',
            'trigger',
            'align',
            'open',
            'onOpenChange',
            'placement',
            'getPopupContainer',
            'href',
            'icon',
            'title',
            'buttonsRender',
            'mouseEnterDelay',
            'mouseLeaveDelay',
            'overlayClassName',
            'overlayStyle',
            'destroyOnHidden',
            'destroyPopupOnHide',
            'dropdownRender',
            'popupRender',
          ]),
          G = n('dropdown', m),
          V = `${G}-button`,
          K = {
            menu: k,
            arrow: E,
            autoFocus: Z,
            align: S,
            disabled: v,
            trigger: v ? [] : j,
            onOpenChange: B,
            getPopupContainer: F || t,
            mouseEnterDelay: T,
            mouseLeaveDelay: H,
            overlayClassName: z,
            overlayStyle: D,
            destroyOnHidden: P,
            popupRender: $ || W,
          },
          { compactSize: U, compactItemClassnames: X } = (0, u.ri)(G, a),
          q = l()(V, X, b);
        'destroyPopupOnHide' in e && (K.destroyPopupOnHide = O),
          'overlay' in e && (K.overlay = M),
          'open' in e && (K.open = w),
          (K.placement =
            'placement' in e ? I : 'rtl' === a ? 'bottomLeft' : 'bottomRight');
        const Q = r.createElement(
            c.ZP,
            {
              type: h,
              danger: f,
              disabled: v,
              loading: g,
              onClick: y,
              htmlType: x,
              href: L,
              title: R,
            },
            C,
          ),
          Y = r.createElement(c.ZP, { type: h, danger: f, icon: A }),
          [J, ee] = N([Q, Y]);
        return r.createElement(
          d.Z.Compact,
          Object.assign({ className: q, size: U, block: !0 }, _),
          J,
          r.createElement(o.Z, Object.assign({}, K), ee),
        );
      };
      m.__ANT_BUTTON = !0;
      var h = m;
      const f = o.Z;
      f.Button = h;
      var v = f;
    },
    57980: function (e, t, n) {
      'use strict';
      n.d(t, {
        H: function () {
          return l;
        },
      });
      var o = n(75271),
        r = n(57902);
      function i() {}
      const a = o.createContext({ add: i, remove: i });
      function l(e) {
        const t = o.useContext(a),
          n = o.useRef(null);
        return (0, r.Z)((o) => {
          if (o) {
            const r = e ? o.querySelector(e) : o;
            r && (t.add(r), (n.current = r));
          } else t.remove(n.current);
        });
      }
    },
    97406: function (e, t) {
      'use strict';
      t.EQ = function (e, t = {}) {
        const { decode: r = decodeURIComponent, delimiter: i = n } = t,
          { regexp: a, keys: l } = m(e, t),
          c = l.map((e) =>
            !1 === r ? o : 'param' === e.type ? r : (e) => e.split(i).map(r),
          );
        return function (e) {
          const t = a.exec(e);
          if (!t) return !1;
          const n = t[0],
            o = Object.create(null);
          for (let e = 1; e < t.length; e++) {
            if (void 0 === t[e]) continue;
            const n = l[e - 1],
              r = c[e - 1];
            o[n.name] = r(t[e]);
          }
          return { path: n, params: o };
        };
      };
      const n = '/',
        o = (e) => e,
        r = /^[$_\p{ID_Start}]$/u,
        i = /^[$\u200c\u200d\p{ID_Continue}]$/u,
        a = 'https://git.new/pathToRegexpError',
        l = {
          '{': '{',
          '}': '}',
          '(': '(',
          ')': ')',
          '[': '[',
          ']': ']',
          '+': '+',
          '?': '?',
          '!': '!',
        };
      function c(e) {
        return e.replace(/[.+*?^${}()[\]|/\\]/g, '\\$&');
      }
      class s {
        constructor(e) {
          this.tokens = e;
        }
        peek() {
          if (!this._peek) {
            const e = this.tokens.next();
            this._peek = e.value;
          }
          return this._peek;
        }
        tryConsume(e) {
          const t = this.peek();
          if (t.type === e) return (this._peek = void 0), t.value;
        }
        consume(e) {
          const t = this.tryConsume(e);
          if (void 0 !== t) return t;
          const { type: n, index: o } = this.peek();
          throw new TypeError(`Unexpected ${n} at ${o}, expected ${e}: ${a}`);
        }
        text() {
          let e,
            t = '';
          for (; (e = this.tryConsume('CHAR') || this.tryConsume('ESCAPED')); )
            t += e;
          return t;
        }
      }
      class d {
        constructor(e) {
          this.tokens = e;
        }
      }
      function u(e, t = {}) {
        const { encodePath: n = o } = t,
          c = new s(
            (function* (e) {
              const t = [...e];
              let n = 0;
              function o() {
                let e = '';
                if (r.test(t[++n])) for (e += t[n]; i.test(t[++n]); ) e += t[n];
                else if ('"' === t[n]) {
                  let o = n;
                  for (; n < t.length; ) {
                    if ('"' === t[++n]) {
                      n++, (o = 0);
                      break;
                    }
                    e += '\\' === t[n] ? t[++n] : t[n];
                  }
                  if (o)
                    throw new TypeError(`Unterminated quote at ${o}: ${a}`);
                }
                if (!e)
                  throw new TypeError(`Missing parameter name at ${n}: ${a}`);
                return e;
              }
              for (; n < t.length; ) {
                const e = t[n],
                  r = l[e];
                if (r) yield { type: r, index: n++, value: e };
                else if ('\\' === e)
                  yield { type: 'ESCAPED', index: n++, value: t[n++] };
                else if (':' === e) {
                  const e = o();
                  yield { type: 'PARAM', index: n, value: e };
                } else if ('*' === e) {
                  const e = o();
                  yield { type: 'WILDCARD', index: n, value: e };
                } else yield { type: 'CHAR', index: n, value: t[n++] };
              }
              return { type: 'END', index: n, value: '' };
            })(e),
          );
        const u = (function e(t) {
          const o = [];
          for (;;) {
            const r = c.text();
            r && o.push({ type: 'text', value: n(r) });
            const i = c.tryConsume('PARAM');
            if (i) {
              o.push({ type: 'param', name: i });
              continue;
            }
            const a = c.tryConsume('WILDCARD');
            if (a) {
              o.push({ type: 'wildcard', name: a });
              continue;
            }
            if (!c.tryConsume('{')) return c.consume(t), o;
            o.push({ type: 'group', tokens: e('}') });
          }
        })('END');
        return new d(u);
      }
      function p(e, t, n) {
        const r = e.map((e) =>
          (function (e, t, n) {
            if ('text' === e.type) return () => [e.value];
            if ('group' === e.type) {
              const o = p(e.tokens, t, n);
              return (e) => {
                const [t, ...n] = o(e);
                return n.length ? [''] : [t];
              };
            }
            const r = n || o;
            if ('wildcard' === e.type && !1 !== n)
              return (n) => {
                const o = n[e.name];
                if (null == o) return ['', e.name];
                if (!Array.isArray(o) || 0 === o.length)
                  throw new TypeError(
                    `Expected "${e.name}" to be a non-empty array`,
                  );
                return [
                  o
                    .map((t, n) => {
                      if ('string' != typeof t)
                        throw new TypeError(
                          `Expected "${e.name}/${n}" to be a string`,
                        );
                      return r(t);
                    })
                    .join(t),
                ];
              };
            return (t) => {
              const n = t[e.name];
              if (null == n) return ['', e.name];
              if ('string' != typeof n)
                throw new TypeError(`Expected "${e.name}" to be a string`);
              return [r(n)];
            };
          })(e, t, n),
        );
        return (e) => {
          const t = [''];
          for (const n of r) {
            const [o, ...r] = n(e);
            (t[0] += o), t.push(...r);
          }
          return t;
        };
      }
      function m(e, t = {}) {
        const {
            delimiter: o = n,
            end: r = !0,
            sensitive: i = !1,
            trailing: a = !0,
          } = t,
          l = [],
          s = [],
          p = i ? '' : 'i',
          m = (Array.isArray(e) ? e : [e]).map((e) =>
            e instanceof d ? e : u(e, t),
          );
        for (const { tokens: e } of m)
          for (const t of h(e, 0, [])) {
            const e = f(t, o, l);
            s.push(e);
          }
        let v = `^(?:${s.join('|')})`;
        a && (v += `(?:${c(o)}$)?`), (v += r ? '$' : `(?=${c(o)}|$)`);
        return { regexp: new RegExp(v, p), keys: l };
      }
      function* h(e, t, n) {
        if (t === e.length) return yield n;
        const o = e[t];
        if ('group' === o.type) {
          const r = n.slice();
          for (const n of h(o.tokens, 0, r)) yield* h(e, t + 1, n);
        } else n.push(o);
        yield* h(e, t + 1, n);
      }
      function f(e, t, n) {
        let o = '',
          r = '',
          i = !0;
        for (let l = 0; l < e.length; l++) {
          const s = e[l];
          if ('text' !== s.type)
            if ('param' !== s.type && 'wildcard' !== s.type);
            else {
              if (!i && !r)
                throw new TypeError(`Missing text after "${s.name}": ${a}`);
              'param' === s.type
                ? (o += `(${v(t, i ? '' : r)}+)`)
                : (o += '([\\s\\S]+)'),
                n.push(s),
                (r = ''),
                (i = !1);
            }
          else
            (o += c(s.value)), (r += s.value), i || (i = s.value.includes(t));
        }
        return o;
      }
      function v(e, t) {
        return t.length < 2
          ? e.length < 2
            ? `[^${c(e + t)}]`
            : `(?:(?!${c(e)})[^${c(t)}])`
          : e.length < 2
          ? `(?:(?!${c(t)})[^${c(e)}])`
          : `(?:(?!${c(t)}|${c(e)})[\\s\\S])`;
      }
    },
    38498: function (e, t, n) {
      var o = n(78770);
      (e.exports = function (e) {
        if (Array.isArray(e)) return o(e);
      }),
        (e.exports.__esModule = !0),
        (e.exports.default = e.exports);
    },
    335: function (e, t, n) {
      var o = n(31479);
      (e.exports = function (e, t) {
        var n =
          ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
          e['@@iterator'];
        if (!n) {
          if (
            Array.isArray(e) ||
            (n = o(e)) ||
            (t && e && 'number' == typeof e.length)
          ) {
            n && (e = n);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= e.length
                  ? { done: !0 }
                  : { done: !1, value: e[r++] };
              },
              e: function (e) {
                throw e;
              },
              f: i,
            };
          }
          throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        var a,
          l = !0,
          c = !1;
        return {
          s: function () {
            n = n.call(e);
          },
          n: function () {
            var e = n.next();
            return (l = e.done), e;
          },
          e: function (e) {
            (c = !0), (a = e);
          },
          f: function () {
            try {
              l || null == n.return || n.return();
            } finally {
              if (c) throw a;
            }
          },
        };
      }),
        (e.exports.__esModule = !0),
        (e.exports.default = e.exports);
    },
    20698: function (e) {
      (e.exports = function (e) {
        if (
          ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e['@@iterator']
        )
          return Array.from(e);
      }),
        (e.exports.__esModule = !0),
        (e.exports.default = e.exports);
    },
    91162: function (e) {
      (e.exports = function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      }),
        (e.exports.__esModule = !0),
        (e.exports.default = e.exports);
    },
    15558: function (e, t, n) {
      var o = n(38498),
        r = n(20698),
        i = n(31479),
        a = n(91162);
      (e.exports = function (e) {
        return o(e) || r(e) || i(e) || a();
      }),
        (e.exports.__esModule = !0),
        (e.exports.default = e.exports);
    },
  },
]);
