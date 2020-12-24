!function() {
    function t(e, i, n) {
        function s(a, o) {
            if (!i[a]) {
                if (!e[a]) {
                    var c = "function" == typeof require && require;
                    if (!o && c)
                        return c(a, !0);
                    if (r)
                        return r(a, !0);
                    var h = new Error("Cannot find module '" + a + "'");
                    throw h.code = "MODULE_NOT_FOUND",
                    h
                }
                var u = i[a] = {
                    exports: {}
                };
                e[a][0].call(u.exports, function(t) {
                    var i = e[a][1][t];
                    return s(i ? i : t)
                }, u, u.exports, t, e, i, n)
            }
            return i[a].exports
        }
        for (var r = "function" == typeof require && require, a = 0; a < n.length; a++)
            s(n[a]);
        return s
    }
    return t
}()({
    1: [function(t, e, i) {
        "use strict";
        var n = t("./helpers/TabManager")
          , s = t("./helpers/hideSiblingElements")
          , r = t("./helpers/showSiblingElements")
          , a = function(t, e) {
            e = e || {},
            this._tabbables = null,
            this._excludeHidden = e.excludeHidden,
            this._firstTabbableElement = e.firstFocusElement,
            this._lastTabbableElement = null,
            this._relatedTarget = null,
            this.el = t,
            this._handleOnFocus = this._handleOnFocus.bind(this)
        }
          , o = a.prototype;
        o.start = function() {
            this.updateTabbables(),
            s(this.el, null, this._excludeHidden),
            this._firstTabbableElement ? this.el.contains(document.activeElement) || this._firstTabbableElement.focus() : console.warn("this._firstTabbableElement is null, CircularTab needs at least one tabbable element."),
            this._relatedTarget = document.activeElement,
            document.addEventListener("focus", this._handleOnFocus, !0)
        }
        ,
        o.stop = function() {
            r(this.el),
            document.removeEventListener("focus", this._handleOnFocus, !0)
        }
        ,
        o.updateTabbables = function() {
            this._tabbables = n.getTabbableElements(this.el, this._excludeHidden),
            this._firstTabbableElement = this._firstTabbableElement || this._tabbables[0],
            this._lastTabbableElement = this._tabbables[this._tabbables.length - 1]
        }
        ,
        o._handleOnFocus = function(t) {
            if (this.el.contains(t.target))
                this._relatedTarget = t.target;
            else {
                if (t.preventDefault(),
                this.updateTabbables(),
                this._relatedTarget === this._lastTabbableElement || null === this._relatedTarget)
                    return this._firstTabbableElement.focus(),
                    void (this._relatedTarget = this._firstTabbableElement);
                if (this._relatedTarget === this._firstTabbableElement && this._lastTabbableElement)
                    return this._lastTabbableElement.focus(),
                    void (this._relatedTarget = this._lastTabbableElement)
            }
        }
        ,
        o.destroy = function() {
            this.stop(),
            this.el = null,
            this._tabbables = null,
            this._firstTabbableElement = null,
            this._lastTabbableElement = null,
            this._relatedTarget = null,
            this._handleOnFocus = null
        }
        ,
        e.exports = a
    }
    , {
        "./helpers/TabManager": 2,
        "./helpers/hideSiblingElements": 4,
        "./helpers/showSiblingElements": 7
    }],
    2: [function(t, e, i) {
        "use strict";
        var n = t("./../maps/focusableElement")
          , s = function() {
            this.focusableSelectors = n.selectors
        }
          , r = s.prototype;
        r.isFocusableElement = function(t, e, i) {
            if (e && !this._isDisplayed(t))
                return !1;
            var s = n.nodeName[t.nodeName];
            return s ? !t.disabled : !t.contentEditable || (i = i || parseFloat(t.getAttribute("tabindex")),
            !isNaN(i))
        }
        ,
        r.isTabbableElement = function(t, e) {
            if (e && !this._isDisplayed(t))
                return !1;
            var i = t.getAttribute("tabindex");
            return i = parseFloat(i),
            isNaN(i) ? this.isFocusableElement(t, e, i) : i >= 0
        }
        ,
        r._isDisplayed = function(t) {
            var e = t.getBoundingClientRect();
            return (0 !== e.top || 0 !== e.left || 0 !== e.width || 0 !== e.height) && "hidden" !== window.getComputedStyle(t).visibility
        }
        ,
        r.getTabbableElements = function(t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), n = i.length, s = [], r = 0; r < n; r++)
                this.isTabbableElement(i[r], e) && s.push(i[r]);
            return s
        }
        ,
        r.getFocusableElements = function(t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), n = i.length, s = [], r = 0; r < n; r++)
                this.isFocusableElement(i[r], e) && s.push(i[r]);
            return s
        }
        ,
        e.exports = new s
    }
    , {
        "./../maps/focusableElement": 9
    }],
    3: [function(t, e, i) {
        "use strict";
        var n = t("./../maps/ariaMap")
          , s = t("./TabManager")
          , r = "data-original-"
          , a = "tabindex"
          , o = function(t, e) {
            var i = t.getAttribute(r + e);
            i || (i = t.getAttribute(e) || "",
            t.setAttribute(r + e, i))
        };
        e.exports = function(t, e) {
            if (s.isFocusableElement(t, e))
                o(t, a),
                t.setAttribute(a, "-1");
            else
                for (var i = s.getTabbableElements(t, e), r = i.length; r--; )
                    o(i[r], a),
                    i[r].setAttribute(a, "-1");
            o(t, n.HIDDEN),
            t.setAttribute(n.HIDDEN, "true")
        }
    }
    , {
        "./../maps/ariaMap": 8,
        "./TabManager": 2
    }],
    4: [function(t, e, i) {
        "use strict";
        var n = t("./hide");
        e.exports = function s(t, e, i) {
            e = e || document.body;
            for (var r = t, a = t; r = r.previousElementSibling; )
                n(r, i);
            for (; a = a.nextElementSibling; )
                n(a, i);
            t.parentElement && t.parentElement !== e && s(t.parentElement, e, i)
        }
    }
    , {
        "./hide": 3
    }],
    5: [function(t, e, i) {
        "use strict";
        var n = function(t, e) {
            var i = void 0;
            i = t instanceof NodeList ? t : [].concat(t),
            e = Array.isArray(e) ? e : [].concat(e),
            i.forEach(function(t) {
                e.forEach(function(e) {
                    t.removeAttribute(e)
                })
            })
        };
        e.exports = n
    }
    , {}],
    6: [function(t, e, i) {
        "use strict";
        var n = t("./removeAttributes")
          , s = t("./../maps/ariaMap")
          , r = "data-original-"
          , a = "tabindex"
          , o = function(t, e) {
            var i = t.getAttribute(r + e);
            null !== i && ("" === i ? n(t, e) : t.setAttribute(e, i),
            n(t, r + e))
        };
        e.exports = function(t) {
            o(t, a),
            o(t, s.HIDDEN);
            for (var e = t.querySelectorAll("[" + (r + a) + "]"), i = e.length; i--; )
                o(e[i], a)
        }
    }
    , {
        "./../maps/ariaMap": 8,
        "./removeAttributes": 5
    }],
    7: [function(t, e, i) {
        "use strict";
        var n = t("./show");
        e.exports = function s(t, e) {
            e = e || document.body;
            for (var i = t, r = t; i = i.previousElementSibling; )
                n(i);
            for (; r = r.nextElementSibling; )
                n(r);
            t.parentElement && t.parentElement !== e && s(t.parentElement, e)
        }
    }
    , {
        "./show": 6
    }],
    8: [function(t, e, i) {
        "use strict";
        e.exports = {
            AUTOCOMPLETE: "aria-autocomplete",
            CHECKED: "aria-checked",
            DISABLED: "aria-disabled",
            EXPANDED: "aria-expanded",
            HASPOPUP: "aria-haspopup",
            HIDDEN: "aria-hidden",
            INVALID: "aria-invalid",
            LABEL: "aria-label",
            LEVEL: "aria-level",
            MULTILINE: "aria-multiline",
            MULTISELECTABLE: "aria-multiselectable",
            ORIENTATION: "aria-orientation",
            PRESSED: "aria-pressed",
            READONLY: "aria-readonly",
            REQUIRED: "aria-required",
            SELECTED: "aria-selected",
            SORT: "aria-sort",
            VALUEMAX: "aria-valuemax",
            VALUEMIN: "aria-valuemin",
            VALUENOW: "aria-valuenow",
            VALUETEXT: "aria-valuetext",
            ATOMIC: "aria-atomic",
            BUSY: "aria-busy",
            LIVE: "aria-live",
            RELEVANT: "aria-relevant",
            DROPEFFECT: "aria-dropeffect",
            GRABBED: "aria-grabbed",
            ACTIVEDESCENDANT: "aria-activedescendant",
            CONTROLS: "aria-controls",
            DESCRIBEDBY: "aria-describedby",
            FLOWTO: "aria-flowto",
            LABELLEDBY: "aria-labelledby",
            OWNS: "aria-owns",
            POSINSET: "aria-posinset",
            SETSIZE: "aria-setsize"
        }
    }
    , {}],
    9: [function(t, e, i) {
        "use strict";
        var n = ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "[tabindex]", "[contenteditable]"];
        e.exports = {
            selectors: n.join(","),
            nodeName: {
                INPUT: "input",
                SELECT: "select",
                TEXTAREA: "textarea",
                BUTTON: "button",
                OPTGROUP: "optgroup",
                OPTION: "option",
                MENUITEM: "menuitem",
                FIELDSET: "fieldset",
                OBJECT: "object",
                A: "a"
            }
        }
    }
    , {}],
    10: [function(t, e, i) {
        "use strict";
        e.exports = Object.freeze({
            ELEMENT: 1,
            TEXT: 3,
            COMMENT: 8,
            DOCUMENT: 9,
            DOCUMENT_TYPE: 10,
            DOCUMENT_FRAGMENT: 11
        })
    }
    , {}],
    11: [function(t, e, i) {
        "use strict";
        var n = t("./internal/validate");
        e.exports = function(t, e) {
            return n.insertNode(t, "insertBefore"),
            n.childNode(e, "insertBefore"),
            n.hasParentNode(e, "insertBefore"),
            e.parentNode.insertBefore(t, e)
        }
    }
    , {
        "./internal/validate": 12
    }],
    12: [function(t, e, i) {
        "use strict";
        var n = t("../isNodeType")
          , s = t("../NODE_TYPES")
          , r = s.COMMENT
          , a = s.DOCUMENT_FRAGMENT
          , o = s.ELEMENT
          , c = s.TEXT
          , h = [o, c, r, a]
          , u = " must be an Element, TextNode, Comment, or Document Fragment"
          , l = [o, c, r]
          , m = " must be an Element, TextNode, or Comment"
          , d = [o, a]
          , f = " must be an Element, or Document Fragment"
          , _ = " must have a parentNode";
        e.exports = {
            parentNode: function(t, e, i) {
                if (i = i || "target",
                t && !n(t, d))
                    throw new TypeError(e + ": " + i + f)
            },
            childNode: function(t, e, i) {
                if (i = i || "target",
                t && !n(t, l))
                    throw new TypeError(e + ": " + i + m)
            },
            insertNode: function(t, e, i) {
                if (i = i || "node",
                t && !n(t, h))
                    throw new TypeError(e + ": " + i + u)
            },
            hasParentNode: function(t, e, i) {
                if (i = i || "target",
                !t.parentNode)
                    throw new TypeError(e + ": " + i + _)
            }
        }
    }
    , {
        "../NODE_TYPES": 10,
        "../isNodeType": 14
    }],
    13: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return !(!t || !t.nodeType)
        }
    }
    , {}],
    14: [function(t, e, i) {
        "use strict";
        var n = t("./isNode");
        e.exports = function(t, e) {
            return !!n(t) && ("number" == typeof e ? t.nodeType === e : !!Array.isArray(e) && e.indexOf(t.nodeType) !== -1)
        }
    }
    , {
        "./isNode": 13
    }],
    15: [function(t, e, i) {
        "use strict";
        e.exports = {
            EventEmitterMicro: t("./ac-event-emitter-micro/EventEmitterMicro")
        }
    }
    , {
        "./ac-event-emitter-micro/EventEmitterMicro": 16
    }],
    16: [function(t, e, i) {
        "use strict";
        function n() {
            this._events = {}
        }
        var s = n.prototype;
        s.on = function(t, e) {
            this._events[t] = this._events[t] || [],
            this._events[t].unshift(e)
        }
        ,
        s.once = function(t, e) {
            function i(s) {
                n.off(t, i),
                void 0 !== s ? e(s) : e()
            }
            var n = this;
            this.on(t, i)
        }
        ,
        s.off = function(t, e) {
            if (this.has(t)) {
                if (1 === arguments.length)
                    return this._events[t] = null,
                    void delete this._events[t];
                var i = this._events[t].indexOf(e);
                i !== -1 && this._events[t].splice(i, 1)
            }
        }
        ,
        s.trigger = function(t, e) {
            if (this.has(t))
                for (var i = this._events[t].length - 1; i >= 0; i--)
                    void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
        }
        ,
        s.has = function(t) {
            return t in this._events != !1 && 0 !== this._events[t].length
        }
        ,
        s.destroy = function() {
            for (var t in this._events)
                this._events[t] = null;
            this._events = null
        }
        ,
        e.exports = n
    }
    , {}],
    17: [function(t, e, i) {
        "use strict";
        e.exports = {
            getWindow: function() {
                return window
            },
            getDocument: function() {
                return document
            },
            getNavigator: function() {
                return navigator
            }
        }
    }
    , {}],
    18: [function(t, e, i) {
        "use strict";
        function n() {
            var t = s.getWindow()
              , e = s.getDocument()
              , i = s.getNavigator();
            return !!("ontouchstart"in t || t.DocumentTouch && e instanceof t.DocumentTouch || i.maxTouchPoints > 0 || i.msMaxTouchPoints > 0)
        }
        var s = t("./helpers/globals")
          , r = t("@marcom/ac-function/once");
        e.exports = r(n),
        e.exports.original = n
    }
    , {
        "./helpers/globals": 17,
        "@marcom/ac-function/once": 19
    }],
    19: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e;
            return function() {
                return "undefined" == typeof e && (e = t.apply(this, arguments)),
                e
            }
        }
    }
    , {}],
    20: [function(t, e, i) {
        "use strict";
        var n = function(t, e) {
            this._target = t,
            this._tests = {},
            this.addTests(e)
        }
          , s = n.prototype;
        s.addTests = function(t) {
            this._tests = Object.assign(this._tests, t)
        }
        ,
        s._supports = function(t) {
            return "undefined" != typeof this._tests[t] && ("function" == typeof this._tests[t] && (this._tests[t] = this._tests[t]()),
            this._tests[t])
        }
        ,
        s._addClass = function(t, e) {
            e = e || "no-",
            this._supports(t) ? this._target.classList.add(t) : this._target.classList.add(e + t)
        }
        ,
        s.htmlClass = function() {
            var t;
            this._target.classList.remove("no-js"),
            this._target.classList.add("js");
            for (t in this._tests)
                this._tests.hasOwnProperty(t) && this._addClass(t)
        }
        ,
        e.exports = n
    }
    , {}],
    21: [function(t, e, i) {
        "use strict";
        var n = t("@marcom/ac-dom-nodes/isNodeType")
          , s = t("@marcom/dom-traversal/ancestor")
          , r = t("@marcom/feature-detect/cssPropertyAvailable")
          , a = t("@marcom/viewport-emitter/ViewportEmitter")
          , o = t("@marcom/ac-accessibility/CircularTab")
          , c = t("./internal/CheckboxMenu")
          , h = t("./internal/SimpleSticky")
          , u = t("./internal/ClickAway")
          , l = t("@marcom/ac-dom-nodes/NODE_TYPES")
          , m = l.ELEMENT
          , d = {
            className: "localnav"
        }
          , f = function(t, e) {
            var i;
            e = Object.assign({}, d, e),
            this.el = t,
            i = e.selector || "." + e.className,
            this._selectors = {
                traySelector: e.traySelector || "." + e.className + "-menu-tray",
                viewportEmitterID: e.viewportEmitterID || e.className + "-viewport-emitter",
                curtainID: e.curtainID || e.className + "-curtain",
                menuStateID: e.menuStateID || e.className + "-menustate",
                menuOpeningClassName: e.menuOpeningClassName || e.className + "-opening"
            },
            this._selectors.clickAwaySelector = i + ", #" + this._selectors.curtainID + ", #" + this._selectors.menuStateID,
            this.tray = this.el.querySelector(this._selectors.traySelector),
            this.stickyEnabled = this._getStickyEnabled(),
            this._transitionsAvailable = r("transition"),
            this._viewports = new a(this._selectors.viewportEmitterID),
            this.stickyEnabled && (this._sticky = new h(this.el,e)),
            this.circTab = new o(this.el),
            this._initializeMenu()
        };
        f.create = function(t, e) {
            return new f(t,e)
        }
        ;
        var _ = f.prototype;
        _._getStickyEnabled = function() {
            return this.el.hasAttribute("data-sticky")
        }
        ,
        _._initializeMenu = function() {
            var t, e = document.getElementById(this._selectors.menuStateID), i = document.getElementById(this._selectors.menuStateID + "-open"), n = document.getElementById(this._selectors.menuStateID + "-close"), s = "onpopstate"in window ? "popstate" : "beforeunload";
            e && i && n && (this.menu = new c(e,i,n),
            this.menu.on("open", this._onMenuOpen.bind(this)),
            this.menu.on("close", this._onMenuClose.bind(this)),
            this._viewports.on("change:viewport", this._onViewportChange.bind(this)),
            window.addEventListener("scroll", this._onScroll.bind(this)),
            window.addEventListener("touchmove", this._onScroll.bind(this)),
            window.addEventListener("keydown", this._onKeyDown.bind(this)),
            this.tray.addEventListener("click", this._onTrayClick.bind(this)),
            this._closeMenu = this._closeMenu.bind(this),
            window.addEventListener(s, this._closeMenu),
            window.addEventListener("orientationchange", this._closeMenu),
            t = new u(this._selectors.clickAwaySelector),
            t.on("click", this._closeMenu),
            this._transitionsAvailable && this.tray.addEventListener("transitionend", this._enableMenuScroll.bind(this)))
        }
        ,
        _._onMenuOpen = function() {
            this._menuCollapseOnScroll = null,
            this.circTab.start(),
            this.tray.removeAttribute("aria-hidden", "false"),
            this._transitionsAvailable && this._disableMenuScrollbar()
        }
        ,
        _._onMenuClose = function() {
            this.tray.setAttribute("aria-hidden", "true"),
            this.circTab.stop()
        }
        ,
        _._onScroll = function(t) {
            var e;
            this.menu.isOpen() && (null === this._menuCollapseOnScroll && (this._menuCollapseOnScroll = this.tray.offsetHeight >= this.tray.scrollHeight),
            this._menuCollapseOnScroll ? (this._closeMenu(),
            this.menu.anchorOpen.focus()) : (e = t.target,
            n(e, m) && s(e, this._selectors.traySelector, !0) || (t.preventDefault(),
            this._menuCollapseOnScroll = !0)))
        }
        ,
        _._onTrayClick = function(t) {
            var e = t.target;
            "href"in e && this._closeMenu()
        }
        ,
        _._onKeyDown = function(t) {
            !this.menu.isOpen() || "Escape" !== t.code && 27 !== t.keyCode || (this._closeMenu(),
            this.menu.anchorOpen.focus())
        }
        ,
        _._onViewportChange = function(t) {
            "medium" !== t.to && "large" !== t.to || this._closeMenu()
        }
        ,
        _._disableMenuScrollbar = function() {
            this.el.classList.add(this._selectors.menuOpeningClassName)
        }
        ,
        _._enableMenuScroll = function() {
            this.el.classList.remove(this._selectors.menuOpeningClassName)
        }
        ,
        _._closeMenu = function() {
            this.menu.close()
        }
        ,
        _.destroy = function() {}
        ,
        e.exports = f
    }
    , {
        "./internal/CheckboxMenu": 22,
        "./internal/ClickAway": 23,
        "./internal/SimpleSticky": 24,
        "@marcom/ac-accessibility/CircularTab": 1,
        "@marcom/ac-dom-nodes/NODE_TYPES": 10,
        "@marcom/ac-dom-nodes/isNodeType": 14,
        "@marcom/dom-traversal/ancestor": 45,
        "@marcom/feature-detect/cssPropertyAvailable": 48,
        "@marcom/viewport-emitter/ViewportEmitter": 54
    }],
    22: [function(t, e, i) {
        "use strict";
        function n(t, e, i) {
            s.call(this),
            this.el = t,
            this.anchorOpen = e,
            this.anchorClose = i,
            this._lastOpen = this.el.checked,
            this.el.addEventListener("change", this.update.bind(this)),
            this.anchorOpen.addEventListener("click", this._anchorOpenClick.bind(this)),
            this.anchorClose.addEventListener("click", this._anchorCloseClick.bind(this)),
            this.anchorOpen.addEventListener("keydown", this._anchorOpenKeyDown.bind(this)),
            this.anchorClose.addEventListener("keydown", this._anchorCloseKeyDown.bind(this)),
            window.location.hash === "#" + t.id && (window.location.hash = "")
        }
        var s = t("@marcom/ac-event-emitter-micro/EventEmitterMicro");
        n.create = function(t, e, i) {
            return new n(t,e,i)
        }
        ;
        var r = s.prototype
          , a = n.prototype = Object.create(r);
        n.prototype.constructor = n,
        a.update = function() {
            var t = this.isOpen();
            t !== this._lastOpen && (this.trigger(t ? "open" : "close"),
            this._lastOpen = t)
        }
        ,
        a.isOpen = function() {
            return this.el.checked
        }
        ,
        a.toggle = function() {
            this.isOpen() ? this.close() : this.open()
        }
        ,
        a.open = function() {
            this.el.checked || (this.el.checked = !0,
            this.update())
        }
        ,
        a.close = function() {
            this.el.checked && (this.el.checked = !1,
            this.update())
        }
        ,
        a._anchorOpenClick = function(t) {
            t.preventDefault(),
            this.open(),
            this.anchorClose.focus()
        }
        ,
        a._anchorCloseClick = function(t) {
            t.preventDefault(),
            this.close(),
            this.anchorOpen.focus()
        }
        ,
        a._anchorOpenKeyDown = function(t) {
            "Space" !== t.code && 32 !== t.keyCode || this._anchorOpenClick(t)
        }
        ,
        a._anchorCloseKeyDown = function(t) {
            "Space" !== t.code && 32 !== t.keyCode || this._anchorCloseClick(t)
        }
        ,
        e.exports = n
    }
    , {
        "@marcom/ac-event-emitter-micro/EventEmitterMicro": 16
    }],
    23: [function(t, e, i) {
        "use strict";
        function n(t) {
            s.call(this),
            this._selector = t,
            this._touching = !1,
            document.addEventListener("click", this._onClick.bind(this)),
            document.addEventListener("touchstart", this._onTouchStart.bind(this)),
            document.addEventListener("touchend", this._onTouchEnd.bind(this))
        }
        var s = t("@marcom/ac-event-emitter-micro/EventEmitterMicro")
          , r = t("@marcom/dom-traversal/ancestors")
          , a = s.prototype
          , o = n.prototype = Object.create(a);
        n.prototype.constructor = n,
        o._checkTarget = function(t) {
            var e = t.target;
            r(e, this._selector, !0).length || this.trigger("click", t)
        }
        ,
        o._onClick = function(t) {
            this._touching || this._checkTarget(t)
        }
        ,
        o._onTouchStart = function(t) {
            this._touching = !0,
            this._checkTarget(t)
        }
        ,
        o._onTouchEnd = function() {
            this._touching = !1
        }
        ,
        e.exports = n
    }
    , {
        "@marcom/ac-event-emitter-micro/EventEmitterMicro": 16,
        "@marcom/dom-traversal/ancestors": 46
    }],
    24: [function(t, e, i) {
        "use strict";
        var n = t("@marcom/ac-event-emitter-micro").EventEmitterMicro
          , s = t("@marcom/feature-detect/cssPropertyAvailable")
          , r = t("@marcom/ac-dom-nodes/insertBefore")
          , a = t("@marcom/dom-metrics/getScrollPosition")
          , o = t("@marcom/useragent-detect")
          , c = "css-sticky"
          , h = o.browser.edge
          , u = function(t, e) {
            n.call(this),
            this.el = t,
            this.stuck = !1,
            this._selectors = {
                placeholderID: e.placeholderID || e.className + "-sticky-placeholder",
                stuckClassName: e.stuckClassName || e.className + "-sticking"
            },
            this._createPlaceholder(),
            this._featureDetection(),
            this._updatePosition = this._updatePosition.bind(this),
            this._updatePlaceholderOffset = this._updatePlaceholderOffset.bind(this),
            window.addEventListener("scroll", this._updatePosition),
            document.addEventListener("touchmove", this._updatePosition),
            window.addEventListener("resize", this._updatePlaceholderOffset),
            window.addEventListener("orientationchange", this._updatePlaceholderOffset),
            "acStore"in window && (window.acStore.getStorefront().then(this._updatePlaceholderOffset),
            window.acStore.on("storefrontChange", this._updatePlaceholderOffset))
        };
        u.create = function(t, e) {
            return new u(t,e)
        }
        ;
        var l = n.prototype
          , m = u.prototype = Object.create(l);
        u.prototype.constructor = u,
        m._featureDetection = function() {
            var t = s("position", "sticky") && !h
              , e = c;
            t || (e = "no-" + e),
            this.el.classList.add(e),
            this.placeholder.classList.add(e)
        }
        ,
        m._createPlaceholder = function() {
            this.placeholder = document.createElement("div"),
            this.placeholder.id = this._selectors.placeholderID,
            r(this.placeholder, this.el),
            this._updatePlaceholderOffset()
        }
        ,
        m._updatePlaceholderOffset = function() {
            var t = this.placeholder.offsetTop;
            t += document.documentElement.offsetTop + document.body.offsetTop,
            t !== this._placeholderOffset && (this._placeholderOffset = t,
            this._updatePosition())
        }
        ,
        m._updatePosition = function() {
            var t = a("y");
            t > this._placeholderOffset ? this.stuck || (this.el.classList.add(this._selectors.stuckClassName),
            this.placeholder.classList.add(this._selectors.stuckClassName),
            this.stuck = !0,
            this.trigger("stuck")) : this.stuck && (this.el.classList.remove(this._selectors.stuckClassName),
            this.placeholder.classList.remove(this._selectors.stuckClassName),
            this.stuck = !1,
            this.trigger("unstuck"))
        }
        ,
        e.exports = u
    }
    , {
        "@marcom/ac-dom-nodes/insertBefore": 11,
        "@marcom/ac-event-emitter-micro": 15,
        "@marcom/dom-metrics/getScrollPosition": 44,
        "@marcom/feature-detect/cssPropertyAvailable": 48,
        "@marcom/useragent-detect": 53
    }],
    25: [function(t, e, i) {
        "use strict";
        var n = t("./shared/stylePropertyCache")
          , s = t("./shared/getStyleTestElement")
          , r = t("./utils/toCSS")
          , a = t("./utils/toDOM")
          , o = t("./shared/prefixHelper")
          , c = function(t, e) {
            var i = r(t)
              , s = e !== !1 && r(e);
            return n[t] = n[e] = n[i] = n[s] = {
                dom: e,
                css: s
            },
            e
        };
        e.exports = function(t) {
            var e, i, r, h;
            if (t += "",
            t in n)
                return n[t].dom;
            for (r = s(),
            t = a(t),
            i = t.charAt(0).toUpperCase() + t.substring(1),
            e = "filter" === t ? ["WebkitFilter", "filter"] : (t + " " + o.dom.join(i + " ") + i).split(" "),
            h = 0; h < e.length; h++)
                if ("undefined" != typeof r.style[e[h]])
                    return 0 !== h && o.reduce(h - 1),
                    c(t, e[h]);
            return c(t, !1)
        }
    }
    , {
        "./shared/getStyleTestElement": 27,
        "./shared/prefixHelper": 28,
        "./shared/stylePropertyCache": 29,
        "./utils/toCSS": 31,
        "./utils/toDOM": 32
    }],
    26: [function(t, e, i) {
        "use strict";
        var n = t("./getStyleProperty")
          , s = t("./shared/styleValueAvailable")
          , r = t("./shared/prefixHelper")
          , a = t("./shared/stylePropertyCache")
          , o = {}
          , c = /(\([^\)]+\))/gi
          , h = /([^ ,;\(]+(\([^\)]+\))?)/gi;
        e.exports = function(t, e) {
            var i;
            return e += "",
            !!(t = n(t)) && (s(t, e) ? e : (i = a[t].css,
            e = e.replace(h, function(e) {
                var n, a, h, u;
                if ("#" === e[0] || !isNaN(e[0]))
                    return e;
                if (a = e.replace(c, ""),
                h = i + ":" + a,
                h in o)
                    return o[h] === !1 ? "" : e.replace(a, o[h]);
                for (n = r.css.map(function(t) {
                    return t + e
                }),
                n = [e].concat(n),
                u = 0; u < n.length; u++)
                    if (s(t, n[u]))
                        return 0 !== u && r.reduce(u - 1),
                        o[h] = n[u].replace(c, ""),
                        n[u];
                return o[h] = !1,
                ""
            }),
            e = e.trim(),
            "" !== e && e))
        }
    }
    , {
        "./getStyleProperty": 25,
        "./shared/prefixHelper": 28,
        "./shared/stylePropertyCache": 29,
        "./shared/styleValueAvailable": 30
    }],
    27: [function(t, e, i) {
        "use strict";
        var n;
        e.exports = function() {
            return n ? (n.style.cssText = "",
            n.removeAttribute("style")) : n = document.createElement("_"),
            n
        }
        ,
        e.exports.resetElement = function() {
            n = null
        }
    }
    , {}],
    28: [function(t, e, i) {
        "use strict";
        var n = ["-webkit-", "-moz-", "-ms-"]
          , s = ["Webkit", "Moz", "ms"]
          , r = ["webkit", "moz", "ms"]
          , a = function() {
            this.initialize()
        }
          , o = a.prototype;
        o.initialize = function() {
            this.reduced = !1,
            this.css = n,
            this.dom = s,
            this.evt = r
        }
        ,
        o.reduce = function(t) {
            this.reduced || (this.reduced = !0,
            this.css = [this.css[t]],
            this.dom = [this.dom[t]],
            this.evt = [this.evt[t]])
        }
        ,
        e.exports = new a
    }
    , {}],
    29: [function(t, e, i) {
        "use strict";
        e.exports = {}
    }
    , {}],
    30: [function(t, e, i) {
        "use strict";
        var n, s, r = t("./stylePropertyCache"), a = t("./getStyleTestElement"), o = !1, c = function() {
            var t;
            if (!o) {
                o = !0,
                n = "CSS"in window && "supports"in window.CSS,
                s = !1,
                t = a();
                try {
                    t.style.width = "invalid"
                } catch (e) {
                    s = !0
                }
            }
        };
        e.exports = function(t, e) {
            var i, o;
            if (c(),
            n)
                return t = r[t].css,
                CSS.supports(t, e);
            if (o = a(),
            i = o.style[t],
            s)
                try {
                    o.style[t] = e
                } catch (h) {
                    return !1
                }
            else
                o.style[t] = e;
            return o.style[t] && o.style[t] !== i
        }
        ,
        e.exports.resetFlags = function() {
            o = !1
        }
    }
    , {
        "./getStyleTestElement": 27,
        "./stylePropertyCache": 29
    }],
    31: [function(t, e, i) {
        "use strict";
        var n = /^(webkit|moz|ms)/gi;
        e.exports = function(t) {
            return "cssfloat" === t.toLowerCase() ? "float" : (n.test(t) && (t = "-" + t),
            t.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase())
        }
    }
    , {}],
    32: [function(t, e, i) {
        "use strict";
        var n = /-([a-z])/g;
        e.exports = function(t) {
            return "float" === t.toLowerCase() ? "cssFloat" : (t = t.replace(n, function(t, e) {
                return e.toUpperCase()
            }),
            "Ms" === t.substr(0, 2) && (t = "ms" + t.substring(2)),
            t)
        }
    }
    , {}],
    33: [function(t, e, i) {
        "use strict";
        e.exports = {
            majorVersionNumber: "3.x"
        }
    }
    , {}],
    34: [function(t, e, i) {
        "use strict";
        function n(t) {
            t = t || {},
            r.call(this),
            this.id = o.getNewID(),
            this.executor = t.executor || a,
            this._reset(),
            this._willRun = !1,
            this._didDestroy = !1
        }
        var s, r = t("@marcom/ac-event-emitter-micro").EventEmitterMicro, a = t("./sharedRAFExecutorInstance"), o = t("./sharedRAFEmitterIDGeneratorInstance");
        s = n.prototype = Object.create(r.prototype),
        s.run = function() {
            return this._willRun || (this._willRun = !0),
            this._subscribe()
        }
        ,
        s.cancel = function() {
            this._unsubscribe(),
            this._willRun && (this._willRun = !1),
            this._reset()
        }
        ,
        s.destroy = function() {
            var t = this.willRun();
            return this.cancel(),
            this.executor = null,
            r.prototype.destroy.call(this),
            this._didDestroy = !0,
            t
        }
        ,
        s.willRun = function() {
            return this._willRun
        }
        ,
        s.isRunning = function() {
            return this._isRunning
        }
        ,
        s._subscribe = function() {
            return this.executor.subscribe(this)
        }
        ,
        s._unsubscribe = function() {
            return this.executor.unsubscribe(this)
        }
        ,
        s._onAnimationFrameStart = function(t) {
            this._isRunning = !0,
            this._willRun = !1,
            this._didEmitFrameData || (this._didEmitFrameData = !0,
            this.trigger("start", t))
        }
        ,
        s._onAnimationFrameEnd = function(t) {
            this._willRun || (this.trigger("stop", t),
            this._reset())
        }
        ,
        s._reset = function() {
            this._didEmitFrameData = !1,
            this._isRunning = !1
        }
        ,
        e.exports = n
    }
    , {
        "./sharedRAFEmitterIDGeneratorInstance": 39,
        "./sharedRAFExecutorInstance": 40,
        "@marcom/ac-event-emitter-micro": 15
    }],
    35: [function(t, e, i) {
        "use strict";
        function n(t) {
            t = t || {},
            this._reset(),
            this.updatePhases(),
            this.eventEmitter = new r,
            this._willRun = !1,
            this._totalSubscribeCount = -1,
            this._requestAnimationFrame = window.requestAnimationFrame,
            this._cancelAnimationFrame = window.cancelAnimationFrame,
            this._boundOnAnimationFrame = this._onAnimationFrame.bind(this),
            this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }
        var s, r = t("@marcom/ac-event-emitter-micro/EventEmitterMicro");
        s = n.prototype,
        s.frameRequestedPhase = "requested",
        s.startPhase = "start",
        s.runPhases = ["update", "external", "draw"],
        s.endPhase = "end",
        s.disabledPhase = "disabled",
        s.beforePhaseEventPrefix = "before:",
        s.afterPhaseEventPrefix = "after:",
        s.subscribe = function(t, e) {
            return this._totalSubscribeCount++,
            this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id),
            this._nextFrameSubscribers[t.id] = t,
            this._nextFrameSubscriberArrayLength++,
            this._nextFrameSubscriberCount++,
            this._run()),
            this._totalSubscribeCount
        }
        ,
        s.subscribeImmediate = function(t, e) {
            return this._totalSubscribeCount++,
            this._subscribers[t.id] || (e ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, t.id) : this._subscribersOrder.unshift(t.id),
            this._subscribers[t.id] = t,
            this._subscriberArrayLength++,
            this._subscriberCount++),
            this._totalSubscribeCount
        }
        ,
        s.unsubscribe = function(t) {
            return !!this._nextFrameSubscribers[t.id] && (this._nextFrameSubscribers[t.id] = null,
            this._nextFrameSubscriberCount--,
            0 === this._nextFrameSubscriberCount && this._cancel(),
            !0)
        }
        ,
        s.getSubscribeID = function() {
            return this._totalSubscribeCount += 1
        }
        ,
        s.destroy = function() {
            var t = this._cancel();
            return this.eventEmitter.destroy(),
            this.eventEmitter = null,
            this.phases = null,
            this._subscribers = null,
            this._subscribersOrder = null,
            this._nextFrameSubscribers = null,
            this._nextFrameSubscribersOrder = null,
            this._rafData = null,
            this._boundOnAnimationFrame = null,
            this._onExternalAnimationFrame = null,
            t
        }
        ,
        s.useExternalAnimationFrame = function(t) {
            if ("boolean" == typeof t) {
                var e = this._isUsingExternalAnimationFrame;
                return t && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame),
                this._animationFrame = null),
                !this._willRun || t || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                this._isUsingExternalAnimationFrame = t,
                t ? this._boundOnExternalAnimationFrame : e || !1
            }
        }
        ,
        s.updatePhases = function() {
            this.phases || (this.phases = []),
            this.phases.length = 0,
            this.phases.push(this.frameRequestedPhase),
            this.phases.push(this.startPhase),
            Array.prototype.push.apply(this.phases, this.runPhases),
            this.phases.push(this.endPhase),
            this._runPhasesLength = this.runPhases.length,
            this._phasesLength = this.phases.length
        }
        ,
        s._run = function() {
            if (!this._willRun)
                return this._willRun = !0,
                0 === this.lastFrameTime && (this.lastFrameTime = performance.now()),
                this._animationFrameActive = !0,
                this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                this.phase === this.disabledPhase && (this.phaseIndex = 0,
                this.phase = this.phases[this.phaseIndex]),
                !0
        }
        ,
        s._cancel = function() {
            var t = !1;
            return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame),
            this._animationFrame = null),
            this._animationFrameActive = !1,
            this._willRun = !1,
            t = !0),
            this._isRunning || this._reset(),
            t
        }
        ,
        s._onAnimationFrame = function(t) {
            for (this._subscribers = this._nextFrameSubscribers,
            this._subscribersOrder = this._nextFrameSubscribersOrder,
            this._subscriberArrayLength = this._nextFrameSubscriberArrayLength,
            this._subscriberCount = this._nextFrameSubscriberCount,
            this._nextFrameSubscribers = {},
            this._nextFrameSubscribersOrder = [],
            this._nextFrameSubscriberArrayLength = 0,
            this._nextFrameSubscriberCount = 0,
            this.phaseIndex = 0,
            this.phase = this.phases[this.phaseIndex],
            this._isRunning = !0,
            this._willRun = !1,
            this._didRequestNextRAF = !1,
            this._rafData.delta = t - this.lastFrameTime,
            this.lastFrameTime = t,
            this._rafData.fps = 0,
            this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
            0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta),
            this._rafData.time = t,
            this._rafData.naturalFps = this._rafData.fps,
            this._rafData.timeNow = Date.now(),
            this.phaseIndex++,
            this.phase = this.phases[this.phaseIndex],
            this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
            this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
            for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
            this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
                for (this.phaseIndex++,
                this.phase = this.phases[this.phaseIndex],
                this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                    null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
                this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
            }
            for (this.phaseIndex++,
            this.phase = this.phases[this.phaseIndex],
            this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
            this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
            this._willRun ? (this.phaseIndex = 0,
            this.phaseIndex = this.phases[this.phaseIndex]) : this._reset()
        }
        ,
        s._onExternalAnimationFrame = function(t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
        }
        ,
        s._reset = function() {
            this._rafData || (this._rafData = {}),
            this._rafData.time = 0,
            this._rafData.delta = 0,
            this._rafData.fps = 0,
            this._rafData.naturalFps = 0,
            this._rafData.timeNow = 0,
            this._subscribers = {},
            this._subscribersOrder = [],
            this._currentSubscriberIndex = -1,
            this._subscriberArrayLength = 0,
            this._subscriberCount = 0,
            this._nextFrameSubscribers = {},
            this._nextFrameSubscribersOrder = [],
            this._nextFrameSubscriberArrayLength = 0,
            this._nextFrameSubscriberCount = 0,
            this._didEmitFrameData = !1,
            this._animationFrame = null,
            this._animationFrameActive = !1,
            this._isRunning = !1,
            this._shouldReset = !1,
            this.lastFrameTime = 0,
            this._runPhaseIndex = -1,
            this.phaseIndex = -1,
            this.phase = this.disabledPhase
        }
        ,
        e.exports = n
    }
    , {
        "@marcom/ac-event-emitter-micro/EventEmitterMicro": 16
    }],
    36: [function(t, e, i) {
        "use strict";
        var n = t("./SingleCallRAFEmitter")
          , s = function(t) {
            this.phase = t,
            this.rafEmitter = new n,
            this._cachePhaseIndex(),
            this.requestAnimationFrame = this.requestAnimationFrame.bind(this),
            this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this),
            this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this),
            this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this),
            this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this),
            this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)),
            this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart),
            this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase),
            this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase),
            this._frameCallbacks = [],
            this._currentFrameCallbacks = [],
            this._nextFrameCallbacks = [],
            this._phaseActive = !1,
            this._currentFrameID = -1,
            this._cancelFrameIdx = -1,
            this._frameCallbackLength = 0,
            this._currentFrameCallbacksLength = 0,
            this._nextFrameCallbacksLength = 0,
            this._frameCallbackIteration = 0
        }
          , r = s.prototype;
        r.requestAnimationFrame = function(t, e) {
            return e === !0 && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0),
            this._frameCallbacks.push(this._currentFrameID, t),
            this._frameCallbackLength += 2) : (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1),
            this._currentFrameCallbacks.push(this._currentFrameID, t),
            this._currentFrameCallbacksLength += 2) : (this._currentFrameID = this.rafEmitter.run(),
            this._nextFrameCallbacks.push(this._currentFrameID, t),
            this._nextFrameCallbacksLength += 2),
            this._currentFrameID
        }
        ,
        r.cancelAnimationFrame = function(t) {
            this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t),
            this._cancelFrameIdx > -1 ? this._cancelNextAnimationFrame() : (this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(t),
            this._cancelFrameIdx > -1 ? this._cancelCurrentAnimationFrame() : (this._cancelFrameIdx = this._frameCallbacks.indexOf(t),
            this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()))
        }
        ,
        r._onRAFExecuted = function(t) {
            for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2)
                this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t);
            this._frameCallbacks.length = 0,
            this._frameCallbackLength = 0
        }
        ,
        r._onBeforeRAFExecutorStart = function() {
            Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)),
            this._currentFrameCallbacksLength = this._nextFrameCallbacksLength,
            this._nextFrameCallbacks.length = 0,
            this._nextFrameCallbacksLength = 0
        }
        ,
        r._onBeforeRAFExecutorPhase = function() {
            this._phaseActive = !0,
            Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)),
            this._frameCallbackLength = this._currentFrameCallbacksLength,
            this._currentFrameCallbacks.length = 0,
            this._currentFrameCallbacksLength = 0
        }
        ,
        r._onAfterRAFExecutorPhase = function() {
            this._phaseActive = !1
        }
        ,
        r._cachePhaseIndex = function() {
            this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase)
        }
        ,
        r._cancelRunningAnimationFrame = function() {
            this._frameCallbacks.splice(this._cancelFrameIdx, 2),
            this._frameCallbackLength -= 2
        }
        ,
        r._cancelCurrentAnimationFrame = function() {
            this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2),
            this._currentFrameCallbacksLength -= 2
        }
        ,
        r._cancelNextAnimationFrame = function() {
            this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2),
            this._nextFrameCallbacksLength -= 2,
            0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel()
        }
        ,
        e.exports = s
    }
    , {
        "./SingleCallRAFEmitter": 38
    }],
    37: [function(t, e, i) {
        "use strict";
        var n = t("./RAFInterface")
          , s = function() {
            this.events = {}
        }
          , r = s.prototype;
        r.requestAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new n(t)),
            this.events[t].requestAnimationFrame
        }
        ,
        r.cancelAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new n(t)),
            this.events[t].cancelAnimationFrame
        }
        ,
        e.exports = new s
    }
    , {
        "./RAFInterface": 36
    }],
    38: [function(t, e, i) {
        "use strict";
        var n = t("./RAFEmitter")
          , s = function(t) {
            n.call(this, t)
        }
          , r = s.prototype = Object.create(n.prototype);
        r._subscribe = function() {
            return this.executor.subscribe(this, !0)
        }
        ,
        e.exports = s
    }
    , {
        "./RAFEmitter": 34
    }],
    39: [function(t, e, i) {
        "use strict";
        var n = t("@marcom/ac-shared-instance").SharedInstance
          , s = t("../.release-info.js").majorVersionNumber
          , r = function() {
            this._currentID = 0
        };
        r.prototype.getNewID = function() {
            return this._currentID++,
            "raf:" + this._currentID
        }
        ,
        e.exports = n.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", s, r)
    }
    , {
        "../.release-info.js": 33,
        "@marcom/ac-shared-instance": 42
    }],
    40: [function(t, e, i) {
        "use strict";
        var n = t("@marcom/ac-shared-instance").SharedInstance
          , s = t("../.release-info.js").majorVersionNumber
          , r = t("./RAFExecutor");
        e.exports = n.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", s, r)
    }
    , {
        "../.release-info.js": 33,
        "./RAFExecutor": 35,
        "@marcom/ac-shared-instance": 42
    }],
    41: [function(t, e, i) {
        "use strict";
        var n = t("./RAFInterfaceController");
        e.exports = n.requestAnimationFrame("update")
    }
    , {
        "./RAFInterfaceController": 37
    }],
    42: [function(t, e, i) {
        "use strict";
        e.exports = {
            SharedInstance: t("./ac-shared-instance/SharedInstance")
        }
    }
    , {
        "./ac-shared-instance/SharedInstance": 43
    }],
    43: [function(t, e, i) {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
          , s = window
          , r = "AC"
          , a = "SharedInstance"
          , o = s[r]
          , c = function() {
            var t = {};
            return {
                get: function(e, i) {
                    var n = null;
                    return t[e] && t[e][i] && (n = t[e][i]),
                    n
                },
                set: function(e, i, n) {
                    return t[e] || (t[e] = {}),
                    "function" == typeof n ? t[e][i] = new n : t[e][i] = n,
                    t[e][i]
                },
                share: function(t, e, i) {
                    var n = this.get(t, e);
                    return n || (n = this.set(t, e, i)),
                    n
                },
                remove: function(e, i) {
                    var s = "undefined" == typeof i ? "undefined" : n(i);
                    if ("string" === s || "number" === s) {
                        if (!t[e] || !t[e][i])
                            return;
                        return void (t[e][i] = null)
                    }
                    t[e] && (t[e] = null)
                }
            }
        }();
        o || (o = s[r] = {}),
        o[a] || (o[a] = c),
        e.exports = o[a]
    }
    , {}],
    44: [function(t, e, i) {
        "use strict";
        function n(t) {
            return "x" === t ? window.scrollX || window.pageXOffset : window.scrollY || window.pageYOffset
        }
        function s(t, e, i) {
            return "x" === e ? i ? n("x") : t.scrollLeft : i ? n("y") : t.scrollTop
        }
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        e.exports = function(t, e) {
            var i = "undefined" == typeof t ? "undefined" : r(t);
            e = "string" === i ? t : e,
            t = t && "string" !== i ? t : window;
            var n = t === window;
            return e && /^[xy]$/i.test(e) ? s(t, e, n) : {
                x: s(t, "x", n),
                y: s(t, "y", n)
            }
        }
    }
    , {}],
    45: [function(t, e, i) {
        "use strict";
        var n = t("@marcom/ac-dom-nodes/isNodeType")
          , s = t("./internal/validate")
          , r = t("@marcom/ac-dom-nodes/NODE_TYPES").ELEMENT;
        e.exports = function(t, e, i, a) {
            if (s.childNode(t, "ancestors"),
            s.selector(e, "ancestors"),
            i && n(t, r) && (!e || t.matches(e)))
                return t;
            if (a = a || document.body,
            t !== a)
                for (; (t = t.parentNode) && n(t, r); ) {
                    if (!e || t.matches(e))
                        return t;
                    if (t === a)
                        break
                }
            return null
        }
    }
    , {
        "./internal/validate": 47,
        "@marcom/ac-dom-nodes/NODE_TYPES": 10,
        "@marcom/ac-dom-nodes/isNodeType": 14
    }],
    46: [function(t, e, i) {
        "use strict";
        var n = t("@marcom/ac-dom-nodes/isNodeType")
          , s = t("./internal/validate")
          , r = t("@marcom/ac-dom-nodes/NODE_TYPES").ELEMENT;
        e.exports = function(t, e, i, a) {
            var o = [];
            if (s.childNode(t, "ancestors"),
            s.selector(e, "ancestors"),
            i && n(t, r) && (!e || t.matches(e)) && o.push(t),
            a = a || document.body,
            t !== a)
                for (; (t = t.parentNode) && n(t, r) && (e && !t.matches(e) || o.push(t),
                t !== a); )
                    ;
            return o
        }
    }
    , {
        "./internal/validate": 47,
        "@marcom/ac-dom-nodes/NODE_TYPES": 10,
        "@marcom/ac-dom-nodes/isNodeType": 14
    }],
    47: [function(t, e, i) {
        "use strict";
        var n = t("@marcom/ac-dom-nodes/isNodeType")
          , s = t("@marcom/ac-dom-nodes/NODE_TYPES")
          , r = s.COMMENT
          , a = s.DOCUMENT_FRAGMENT
          , o = s.DOCUMENT
          , c = s.ELEMENT
          , h = s.TEXT
          , u = [c, o, a]
          , l = " must be an Element, Document, or Document Fragment"
          , m = [c, h, r]
          , d = " must be an Element, TextNode, or Comment"
          , f = " must be a string";
        e.exports = {
            parentNode: function(t, e) {
                if (!t || !n(t, u))
                    throw new TypeError(e + ": node" + l)
            },
            childNode: function(t, e) {
                if (!t || !n(t, m))
                    throw new TypeError(e + ": node" + d)
            },
            selector: function(t, e, i) {
                if (i = "boolean" == typeof i && i,
                (t || i) && "string" != typeof t)
                    throw new TypeError(e + ": selector" + f)
            }
        }
    }
    , {
        "@marcom/ac-dom-nodes/NODE_TYPES": 10,
        "@marcom/ac-dom-nodes/isNodeType": 14
    }],
    48: [function(t, e, i) {
        "use strict";
        function n(t, e) {
            return "undefined" != typeof e ? !!s(t, e) : !!r(t)
        }
        var s = t("@marcom/ac-prefixer/getStyleValue")
          , r = t("@marcom/ac-prefixer/getStyleProperty")
          , a = t("@marcom/function-utils/memoize");
        e.exports = a(n),
        e.exports.original = n
    }
    , {
        "@marcom/ac-prefixer/getStyleProperty": 25,
        "@marcom/ac-prefixer/getStyleValue": 26,
        "@marcom/function-utils/memoize": 49
    }],
    49: [function(t, e, i) {
        "use strict";
        var n = function() {
            var t, e = "";
            for (t = 0; t < arguments.length; t++)
                t > 0 && (e += ","),
                e += arguments[t];
            return e
        };
        e.exports = function(t, e) {
            e = e || n;
            var i = function s() {
                var i = arguments
                  , n = e.apply(this, i);
                return n in s.cache || (s.cache[n] = t.apply(this, i)),
                s.cache[n]
            };
            return i.cache = {},
            i
        }
    }
    , {}],
    50: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: {
                safari: !1,
                chrome: !1,
                firefox: !1,
                ie: !1,
                opera: !1,
                android: !1,
                edge: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0,
                    documentMode: !1
                }
            },
            os: {
                osx: !1,
                ios: !1,
                android: !1,
                windows: !1,
                linux: !1,
                fireos: !1,
                chromeos: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0
                }
            }
        }
    }
    , {}],
    51: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: [{
                name: "edge",
                userAgent: "Edge",
                version: ["rv", "Edge"],
                test: function(t) {
                    return t.ua.indexOf("Edge") > -1 || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === t.ua
                }
            }, {
                name: "chrome",
                userAgent: "Chrome"
            }, {
                name: "firefox",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Opera") === -1
                },
                version: "Firefox"
            }, {
                name: "android",
                userAgent: "Android"
            }, {
                name: "safari",
                test: function(t) {
                    return t.ua.indexOf("Safari") > -1 && t.vendor.indexOf("Apple") > -1
                },
                version: "Version"
            }, {
                name: "ie",
                test: function(t) {
                    return t.ua.indexOf("IE") > -1 || t.ua.indexOf("Trident") > -1
                },
                version: ["MSIE", "rv"],
                parseDocumentMode: function() {
                    var t = !1;
                    return document.documentMode && (t = parseInt(document.documentMode, 10)),
                    t
                }
            }, {
                name: "opera",
                userAgent: "Opera",
                version: ["Version", "Opera"]
            }],
            os: [{
                name: "windows",
                test: function(t) {
                    return t.ua.indexOf("Windows") > -1
                },
                version: "Windows NT"
            }, {
                name: "osx",
                userAgent: "Mac",
                test: function(t) {
                    return t.ua.indexOf("Macintosh") > -1
                }
            }, {
                name: "ios",
                test: function(t) {
                    return t.ua.indexOf("iPhone") > -1 || t.ua.indexOf("iPad") > -1
                },
                version: ["iPhone OS", "CPU OS"]
            }, {
                name: "linux",
                userAgent: "Linux",
                test: function(t) {
                    return (t.ua.indexOf("Linux") > -1 || t.platform.indexOf("Linux") > -1) && t.ua.indexOf("Android") === -1
                }
            }, {
                name: "fireos",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Mobile") > -1
                },
                version: "rv"
            }, {
                name: "android",
                userAgent: "Android",
                test: function(t) {
                    return t.ua.indexOf("Android") > -1
                }
            }, {
                name: "chromeos",
                userAgent: "CrOS"
            }]
        }
    }
    , {}],
    52: [function(t, e, i) {
        "use strict";
        function n(t) {
            return new RegExp(t + "[a-zA-Z\\s/:]+([0-9_.]+)","i")
        }
        function s(t, e) {
            if ("function" == typeof t.parseVersion)
                return t.parseVersion(e);
            var i = t.version || t.userAgent;
            "string" == typeof i && (i = [i]);
            for (var s, r = i.length, a = 0; a < r; a++)
                if (s = e.match(n(i[a])),
                s && s.length > 1)
                    return s[1].replace(/_/g, ".");
            return !1
        }
        function r(t, e, i) {
            for (var n, r, a = t.length, o = 0; o < a; o++)
                if ("function" == typeof t[o].test ? t[o].test(i) === !0 && (n = t[o].name) : i.ua.indexOf(t[o].userAgent) > -1 && (n = t[o].name),
                n) {
                    if (e[n] = !0,
                    r = s(t[o], i.ua),
                    "string" == typeof r) {
                        var c = r.split(".");
                        e.version.string = r,
                        c && c.length > 0 && (e.version.major = parseInt(c[0] || 0),
                        e.version.minor = parseInt(c[1] || 0),
                        e.version.patch = parseInt(c[2] || 0))
                    } else
                        "edge" === n && (e.version.string = "12.0.0",
                        e.version.major = "12",
                        e.version.minor = "0",
                        e.version.patch = "0");
                    return "function" == typeof t[o].parseDocumentMode && (e.version.documentMode = t[o].parseDocumentMode()),
                    e
                }
            return e
        }
        function a(t) {
            var e = {};
            return e.browser = r(c.browser, o.browser, t),
            e.os = r(c.os, o.os, t),
            e
        }
        var o = t("./defaults")
          , c = t("./dictionary");
        e.exports = a
    }
    , {
        "./defaults": 50,
        "./dictionary": 51
    }],
    53: [function(t, e, i) {
        "use strict";
        var n = {
            ua: window.navigator.userAgent,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor
        };
        e.exports = t("./parseUserAgent")(n)
    }
    , {
        "./parseUserAgent": 52
    }],
    54: [function(t, e, i) {
        "use strict";
        function n(t, e) {
            s.call(this),
            this._id = t || a.ID,
            this._options = Object.assign({}, a.OPTIONS, e),
            this._allowDOMEventDispatch = !1,
            this._allowElementStateData = !1,
            this._options.removeNamespace = "boolean" != typeof this._options.removeNamespace || this._options.removeNamespace,
            this._el = this._initViewportEl(this._id),
            this._resizing = !1,
            this._mediaQueryLists = {
                resolution: {
                    retina: window.matchMedia(h.RETINA)
                },
                orientation: {
                    portrait: window.matchMedia(h.PORTRAIT),
                    landscape: window.matchMedia(h.LANDSCAPE)
                }
            },
            this._viewport = this._getViewport(this._options.removeNamespace),
            this._retina = this._getRetina(this._mediaQueryLists.resolution.retina),
            this._orientation = this._initOrientation(),
            this._addListeners(),
            this._updateElementStateData()
        }
        var s = t("@marcom/ac-event-emitter-micro").EventEmitterMicro
          , r = t("@marcom/ac-raf-emitter/update")
          , a = {
            ID: "viewport-emitter",
            OPTIONS: {
                removeNamespace: !0
            }
        }
          , o = {
            DOM_DISPATCH: "data-viewport-emitter-dispatch",
            STATE: "data-viewport-emitter-state"
        }
          , c = "::before"
          , h = {
            RETINA: "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)",
            PORTRAIT: "only screen and (orientation: portrait)",
            LANDSCAPE: "only screen and (orientation: landscape)"
        }
          , u = {
            any: "change:any",
            orientation: "change:orientation",
            retina: "change:retina",
            viewport: "change:viewport"
        };
        Object.defineProperty(n, "DOM_DISPATCH_ATTRIBUTE", {
            get: function() {
                return o.DOM_DISPATCH
            }
        }),
        Object.defineProperty(n, "DOM_STATE_ATTRIBUTE", {
            get: function() {
                return o.STATE
            }
        });
        var l = n.prototype = Object.create(s.prototype);
        Object.defineProperty(l, "id", {
            get: function() {
                return this._id
            }
        }),
        Object.defineProperty(l, "element", {
            get: function() {
                return this._el
            }
        }),
        Object.defineProperty(l, "mediaQueryLists", {
            get: function() {
                return this._mediaQueryLists
            }
        }),
        Object.defineProperty(l, "viewport", {
            get: function() {
                return this._viewport
            }
        }),
        Object.defineProperty(l, "retina", {
            get: function() {
                return this._retina
            }
        }),
        Object.defineProperty(l, "orientation", {
            get: function() {
                return this._orientation
            }
        }),
        Object.defineProperty(l, "hasDomDispatch", {
            get: function() {
                return this._allowDOMEventDispatch
            }
        }),
        l.destroy = function() {
            this._removeListeners();
            for (var t in this._options)
                this._options[t] = null;
            for (var e in this._mediaQueryLists) {
                var i = this._mediaQueryLists[e];
                for (var n in i)
                    i[n] = null
            }
            this._id = null,
            this._el = null,
            this._viewport = null,
            this._retina = null,
            this._orientation = null,
            s.prototype.destroy.call(this)
        }
        ,
        l._initViewportEl = function(t) {
            var e = document.getElementById(t);
            return e || (e = document.createElement("div"),
            e.id = t,
            e = document.body.appendChild(e)),
            e.hasAttribute(o.DOM_DISPATCH) || (e.setAttribute(o.DOM_DISPATCH, ""),
            this._allowDOMEventDispatch = !0),
            e.hasAttribute(o.STATE) || (this._allowElementStateData = !0),
            e
        }
        ,
        l._dispatch = function(t, e) {
            var i = {
                viewport: this._viewport,
                orientation: this._orientation,
                retina: this._retina
            };
            if (this._allowDOMEventDispatch) {
                var n = new CustomEvent(t,{
                    detail: e
                })
                  , s = new CustomEvent(u.any,{
                    detail: i
                });
                this._el.dispatchEvent(n),
                this._el.dispatchEvent(s)
            }
            this.trigger(t, e),
            this.trigger(u.any, i)
        }
        ,
        l._addListeners = function() {
            this._onOrientationChange = this._onOrientationChange.bind(this),
            this._onRetinaChange = this._onRetinaChange.bind(this),
            this._onViewportChange = this._onViewportChange.bind(this),
            this._onViewportChangeUpdate = this._onViewportChangeUpdate.bind(this),
            this._mediaQueryLists.orientation.portrait.addListener(this._onOrientationChange),
            this._mediaQueryLists.orientation.landscape.addListener(this._onOrientationChange),
            this._mediaQueryLists.resolution.retina.addListener(this._onRetinaChange),
            window.addEventListener("resize", this._onViewportChange)
        }
        ,
        l._removeListeners = function() {
            this._mediaQueryLists.orientation.portrait.removeListener(this._onOrientationChange),
            this._mediaQueryLists.orientation.landscape.removeListener(this._onOrientationChange),
            this._mediaQueryLists.resolution.retina.removeListener(this._onRetinaChange),
            window.removeEventListener("resize", this._onViewportChange)
        }
        ,
        l._updateElementStateData = function() {
            if (this._allowElementStateData) {
                var t = JSON.stringify({
                    viewport: this._viewport,
                    orientation: this._orientation,
                    retina: this._retina
                });
                this._el.setAttribute(o.STATE, t)
            }
        }
        ,
        l._getViewport = function(t) {
            var e = window.getComputedStyle(this._el, c).content;
            return e ? (e = e.replace(/["']/g, ""),
            t ? e.split(":").pop() : e) : null
        }
        ,
        l._getRetina = function(t) {
            return t.matches
        }
        ,
        l._getOrientation = function(t) {
            var e = this._orientation;
            if (t.matches) {
                var i = /portrait|landscape/;
                return t.media.match(i)[0]
            }
            return e
        }
        ,
        l._initOrientation = function() {
            var t = this._getOrientation(this._mediaQueryLists.orientation.portrait);
            return t ? t : this._getOrientation(this._mediaQueryLists.orientation.landscape)
        }
        ,
        l._onViewportChange = function() {
            this._resizing || (this._resizing = !0,
            r(this._onViewportChangeUpdate))
        }
        ,
        l._onViewportChangeUpdate = function() {
            var t = this._viewport;
            if (this._viewport = this._getViewport(this._options.removeNamespace),
            t !== this._viewport) {
                var e = {
                    from: t,
                    to: this._viewport
                };
                this._updateElementStateData(),
                this._dispatch(u.viewport, e)
            }
            this._resizing = !1
        }
        ,
        l._onRetinaChange = function(t) {
            var e = this._retina;
            if (this._retina = this._getRetina(t),
            e !== this._retina) {
                var i = {
                    from: e,
                    to: this._retina
                };
                this._updateElementStateData(),
                this._dispatch(u.retina, i)
            }
        }
        ,
        l._onOrientationChange = function(t) {
            var e = this._orientation;
            if (this._orientation = this._getOrientation(t),
            e !== this._orientation) {
                var i = {
                    from: e,
                    to: this._orientation
                };
                this._updateElementStateData(),
                this._dispatch(u.orientation, i)
            }
        }
        ,
        e.exports = n
    }
    , {
        "@marcom/ac-event-emitter-micro": 15,
        "@marcom/ac-raf-emitter/update": 41
    }],
    55: [function(t, e, i) {
        "use strict";
        var n = t("@marcom/ac-localnav/Localnav")
          , s = t("@marcom/ac-headjs/FeatureDetect")
          , r = t("./featureDetectTests")
          , a = "locked"
          , o = function(t) {
            var e = new s(t,r);
            e.htmlClass(),
            n.call(this, t, {
                className: "ac-ln",
                selector: "#ac-localnav"
            });
            var i = this.el.querySelectorAll("a.ac-ln-menucta-anchor");
            this._updateComingSoonSubheadClasses(),
            this._sticky && (this._analyticsRegion = this.el.getAttribute("data-analytics-region"),
            this._updateAnalyticsRegion = this._updateAnalyticsRegion.bind(this),
            this._sticky.on("stuck", this._updateAnalyticsRegion),
            this._sticky.on("unstuck", this._updateAnalyticsRegion)),
            i.forEach(function(t) {
                "button" !== t.getAttribute("role") && t.setAttribute("role", "button")
            }),
            this._viewports.on("change:viewport", this._onViewportChange.bind(this))
        }
          , c = n.prototype
          , h = o.prototype = Object.create(c);
        o.prototype.constructor = o,
        h._getStickyEnabled = function() {
            return !document.body.classList.contains("ac-platter-content") && (!document.body.classList.contains("ac-platter-page") && c._getStickyEnabled.call(this))
        }
        ,
        h._updateAnalyticsRegion = function() {
            var t = this._analyticsRegion;
            this._sticky.stuck && (t += " " + a),
            this.el.setAttribute("data-analytics-region", t)
        }
        ,
        h._updateComingSoonSubheadClasses = function() {
            var t = this.el.querySelector(".ac-ln-title-comingsoon, .ac-ln-title-subhead");
            if (t) {
                this.el.classList.contains("ac-localnav-stacked") || this.el.classList.add("ac-localnav-stacked");
                var e = getComputedStyle(document.documentElement).getPropertyValue("--r-localnav-stacked-height");
                document.documentElement.style.setProperty("--r-localnav-height", e)
            }
        }
        ,
        h._onViewportChange = function() {
            this._updateComingSoonSubheadClasses()
        }
        ,
        e.exports = o
    }
    , {
        "./featureDetectTests": 56,
        "@marcom/ac-headjs/FeatureDetect": 20,
        "@marcom/ac-localnav/Localnav": 21
    }],
    56: [function(t, e, i) {
        "use strict";
        var n = t("@marcom/ac-feature/touchAvailable");
        e.exports = {
            touch: n
        }
    }
    , {
        "@marcom/ac-feature/touchAvailable": 18
    }],
    57: [function(t, e, i) {
        "use strict";
        var n = t("./ac-localnav-global/LocalnavGlobal")
          , s = document.getElementById("ac-localnav");
        s && (e.exports = new n(s))
    }
    , {
        "./ac-localnav-global/LocalnavGlobal": 55
    }]
}, {}, [57]);
s