!function t(e, i, s) {
    function n(a, o) {
        if (!i[a]) {
            if (!e[a]) {
                var h = "function" == typeof require && require;
                if (!o && h)
                    return h(a, !0);
                if (r)
                    return r(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND",
                l
            }
            var c = i[a] = {
                exports: {}
            };
            e[a][0].call(c.exports, (function(t) {
                return n(e[a][1][t] || t)
            }
            ), c, c.exports, t, e, i, s)
        }
        return i[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < s.length; a++)
        n(s[a]);
    return n
}({
    1: [function(t, e, i) {
        "use strict";
        var s = t(5)
          , n = t(6)
          , r = t(8)
          , a = t(21).EventEmitterMicro
          , o = a.prototype
          , h = t(11)
          , l = t(13)
          , c = [h.BUSY, h.CHECKED, h.DISABLED, h.EXPANDED, h.HIDDEN, h.INVALID, h.PRESSED, h.SELECTED]
          , u = function(t, e) {
            a.call(this),
            this._options = e || {},
            this._selector = e.selector || ".navitem",
            this._allowMultiSelection = e.multiSelection || !1;
            var i = c.indexOf(e.state) > -1 ? e.state : h.SELECTED;
            this.el = t,
            this._navItems = t.querySelectorAll(this._selector),
            this._navItems = Array.prototype.slice.call(this._navItems),
            this._state = i,
            this._navKeys = {},
            this.selectOption = this.selectOption.bind(this),
            this._handleKeyDown = this._handleKeyDown.bind(this),
            this._setup()
        };
        u.ONSELECT = "onSelect",
        u.ONFOCUS = "onFocus";
        var d = u.prototype = Object.create(o);
        d._setup = function() {
            for (var t = [l.ARROW_DOWN, l.ARROW_RIGHT], e = [l.ARROW_UP, l.ARROW_LEFT], i = [l.ENTER, l.SPACEBAR], s = 0; s < t.length; s++)
                this.addNavkey(t[s], this._arrowDown.bind(this, !0)),
                this.addNavkey(e[s], this._arrowDown.bind(this, null)),
                this.addNavkey(i[s], this.selectOption);
            this._setupNavItems()
        }
        ,
        d._setupNavItems = function() {
            if (this._navItems.length) {
                for (var t = 0; t < this._navItems.length; t++)
                    this._setTabbingByIndex(t);
                void 0 !== this.focusedNavItemIndex && void 0 !== this.selectedNavitemIndex || this.setSelectedItemByIndex(0, !0)
            }
        }
        ,
        d._setTabbingByIndex = function(t) {
            var e = this._navItems[t];
            r(e.getAttribute(this._state)) && (this.focusedNavItemIndex = t,
            this.selectedNavitemIndex = t),
            r(e.getAttribute(h.DISABLED)) ? s(e) : n(e)
        }
        ,
        d.start = function() {
            this._navItems.length < 1 || (this.el.addEventListener("keydown", this._handleKeyDown),
            this.el.addEventListener("click", this.selectOption))
        }
        ,
        d.stop = function() {
            this.el.removeEventListener("keydown", this._handleKeyDown),
            this.el.removeEventListener("click", this.selectOption)
        }
        ,
        d._handleKeyDown = function(t) {
            if (t.ctrlKey || t.altKey || t.metaKey)
                return !0;
            this._navKeys[t.keyCode] && this._navKeys[t.keyCode](t)
        }
        ,
        d._arrowDown = function(t, e, i) {
            e.preventDefault(),
            this.previousNavItemIndex = this.focusedNavItemIndex,
            this.focusedNavItemIndex = this._calculateIndex(t, this.focusedNavItemIndex),
            this._navItems[this.focusedNavItemIndex].focus(),
            i || this.trigger(u.ONFOCUS, {
                event: e,
                index: this.focusedNavItemIndex,
                el: this._navItems[this.focusedNavItemIndex]
            })
        }
        ,
        d.selectOption = function(t, e) {
            t.preventDefault();
            var i = this._navItems.indexOf(document.activeElement);
            i > -1 && document.activeElement !== this._navItems[this.focusedNavItemIndex] && (this.focusedNavItemIndex = i),
            this._allowMultiSelection ? this._toggleState() : (this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "false"),
            this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "true")),
            this.selectedNavitemIndex = this.focusedNavItemIndex,
            e || this.trigger(u.ONSELECT, {
                event: t,
                index: this.selectedNavitemIndex,
                el: this._navItems[this.selectedNavitemIndex]
            })
        }
        ,
        d._toggleState = function() {
            var t = this._navItems[this.focusedNavItemIndex].getAttribute(this._state);
            r(t) ? this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "false") : this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "true")
        }
        ,
        d._calculateIndex = function(t, e) {
            var i = e;
            if (!0 === t) {
                if (i = ++i >= this._navItems.length ? 0 : i,
                !r(this._navItems[i].getAttribute(h.DISABLED)) || this._navItems[i].hasAttribute("disabled"))
                    return i
            } else if (i = --i < 0 ? this._navItems.length - 1 : i,
            !r(this._navItems[i].getAttribute(h.DISABLED)) || this._navItems[i].hasAttribute("disabled"))
                return i;
            return this._calculateIndex(t, i)
        }
        ,
        d.updateNavItems = function() {
            var t = this.el.querySelectorAll(this._selector);
            this._navItems = Array.prototype.slice.call(t)
        }
        ,
        d.addNavItem = function(t) {
            t && t.nodeType && this._navItems.indexOf(t) < 0 && (r(t.getAttribute(h.DISABLED)) || n(t),
            this._navItems.push(t))
        }
        ,
        d.setSelectedItemByIndex = function(t, e) {
            this._allowMultiSelection || isNaN(this.selectedNavitemIndex) || this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "false"),
            this.focusedNavItemIndex = t,
            this.selectedNavitemIndex = t,
            this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "true"),
            e || this.trigger(u.ONSELECT, {
                event: null,
                index: this.focusedNavItemIndex,
                el: this._navItems[this.focusedNavItemIndex]
            })
        }
        ,
        d.getSelectedItem = function() {
            return this._navItems[this.selectedNavitemIndex]
        }
        ,
        d.getFocusedItem = function(t) {
            return this._navItems[this.focusedNavItemIndex]
        }
        ,
        d.addNavkey = function(t, e) {
            "function" == typeof e && "number" == typeof t ? this._navKeys[t] = e : console.warn("incorrect types arguments were passed")
        }
        ,
        d.removeNavkey = function(t) {
            delete this._navKeys[t]
        }
        ,
        d.destroy = function() {
            for (var t in o.destroy.call(this),
            this.stop(),
            this.el = null,
            this._options = null,
            this._selector = null,
            this.focusedNavItemIndex = null,
            this.selectedNavitemIndex = null,
            this._navItems = null,
            this._state = null,
            this.selectOption = null,
            this._handleKeyDown = null,
            this._navKeys)
                this._navKeys.hasOwnProperty(t) && this.removeNavkey(t);
            this._navKeys = null
        }
        ,
        e.exports = u
    }
    , {
        11: 11,
        13: 13,
        21: 21,
        5: 5,
        6: 6,
        8: 8
    }],
    2: [function(t, e, i) {
        "use strict";
        var s = t(11)
          , n = t(14)
          , r = t(6)
          , a = t(5)
          , o = t(8)
          , h = t(1)
          , l = h.prototype
          , c = function(t, e) {
            e = e || {},
            h.call(this, t, {
                selector: e.selector || "*[role=" + n.OPTION + "]",
                state: e.state || s.SELECTED
            })
        }
          , u = c.prototype = Object.create(l);
        u._setTabbingByIndex = function(t) {
            var e = this._navItems[t];
            o(e.getAttribute(this._state)) ? (this.focusedNavItemIndex = t,
            this.selectedNavitemIndex = t,
            this._enableElement(e)) : this._disableElement(e)
        }
        ,
        u.setSelectedItemByIndex = function(t, e) {
            isNaN(this.selectedNavitemIndex) || this._disableElement(this._navItems[this.selectedNavitemIndex]),
            l.setSelectedItemByIndex.call(this, t, e),
            this._enableElement(this._navItems[this.selectedNavitemIndex])
        }
        ,
        u.addNavItem = function(t) {
            t && t.nodeType && this._navItems.indexOf(t) < 0 && (o(t.getAttribute(s.DISABLED)) || this._disableElement(t),
            this._navItems.push(t))
        }
        ,
        u._arrowDown = function(t, e) {
            l._arrowDown.call(this, t, e, !0),
            this.selectOption(e)
        }
        ,
        u._enableElement = function(t) {
            r(t),
            t.setAttribute(this._state, "true")
        }
        ,
        u._disableElement = function(t) {
            a(t),
            t.setAttribute(this._state, "false")
        }
        ,
        u.selectOption = function(t) {
            a(this._navItems[this.selectedNavitemIndex]),
            l.selectOption.call(this, t),
            r(this._navItems[this.focusedNavItemIndex])
        }
        ,
        e.exports = c
    }
    , {
        1: 1,
        11: 11,
        14: 14,
        5: 5,
        6: 6,
        8: 8
    }],
    3: [function(t, e, i) {
        "use strict";
        function s() {
            this._createElemnts(),
            this._bindEvents()
        }
        var n = s.prototype;
        n._bindEvents = function() {
            this._onResize = this._resize.bind(this)
        }
        ,
        n._createElemnts = function() {
            this.span = document.createElement("span");
            var t = this.span.style;
            t.visibility = "hidden",
            t.position = "absolute",
            t.top = "0",
            t.bottom = "0",
            t.zIndex = "-1",
            this.span.innerHTML = "&nbsp;",
            this.iframe = document.createElement("iframe");
            var e = this.iframe.style;
            e.position = "absolute",
            e.top = "0",
            e.left = "0",
            e.width = "100%",
            e.height = "100%",
            this.span.appendChild(this.iframe),
            document.body.appendChild(this.span)
        }
        ,
        n.detect = function(t) {
            this.originalSize = t || 17,
            this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]),
            this.currentSize > this.originalSize && this._onResize(),
            this.isDetecting || (this.iframe.contentWindow.addEventListener("resize", this._onResize),
            this.isDetecting = !0)
        }
        ,
        n._resize = function(t) {
            this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]),
            this.originalSize < this.currentSize ? document.documentElement.classList.add("text-zoom") : document.documentElement.classList.remove("text-zoom"),
            window.dispatchEvent(new Event("resize")),
            window.dispatchEvent(new CustomEvent("resize:text-zoom",{
                detail: this
            }))
        }
        ,
        n.getScale = function() {
            return this.currentSize / this.originalSize
        }
        ,
        n.remove = function() {
            this.isDetecting && (this.iframe.contentWindow.removeEventListener("resize", this._onResize),
            this.isDetecting = !1)
        }
        ,
        n.destroy = function() {
            this.remove(),
            this.span && this.span.parentElement && this.span.parentElement.removeChild(this.span),
            this.span = null,
            this.iframe = null
        }
        ,
        e.exports = new s
    }
    , {}],
    4: [function(t, e, i) {
        "use strict";
        var s = t(12)
          , n = function() {
            this.focusableSelectors = s.selectors
        }
          , r = n.prototype;
        r.isFocusableElement = function(t, e, i) {
            return !(e && !this._isDisplayed(t)) && (s.nodeName[t.nodeName] ? !t.disabled : !t.contentEditable || (i = i || parseFloat(t.getAttribute("tabindex")),
            !isNaN(i)))
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
            for (var i = t.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++)
                this.isTabbableElement(i[r], e) && n.push(i[r]);
            return n
        }
        ,
        r.getFocusableElements = function(t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++)
                this.isFocusableElement(i[r], e) && n.push(i[r]);
            return n
        }
        ,
        e.exports = new n
    }
    , {
        12: 12
    }],
    5: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            t.setAttribute("tabindex", "-1")
        }
    }
    , {}],
    6: [function(t, e, i) {
        "use strict";
        var s = t(4);
        let n = t=>{
            s.isTabbableElement(t) || t.setAttribute("tabindex", "0")
        }
        ;
        e.exports = function(t) {
            t instanceof Node ? n(t) : t.forEach(t=>{
                n(t)
            }
            )
        }
    }
    , {
        4: 4
    }],
    7: [function(t, e, i) {
        "use strict";
        var s = t(11)
          , n = t(4)
          , r = function(t, e) {
            var i = t.getAttribute("data-original-" + e);
            i || (i = t.getAttribute(e) || "",
            t.setAttribute("data-original-" + e, i))
        };
        e.exports = function(t, e) {
            if (n.isFocusableElement(t, e))
                r(t, "tabindex"),
                t.setAttribute("tabindex", "-1");
            else
                for (var i = n.getTabbableElements(t, e), a = i.length; a--; )
                    r(i[a], "tabindex"),
                    i[a].setAttribute("tabindex", "-1");
            r(t, s.HIDDEN),
            t.setAttribute(s.HIDDEN, "true")
        }
    }
    , {
        11: 11,
        4: 4
    }],
    8: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "string" == typeof t ? "true" === (t = t.toLowerCase()) : t
        }
    }
    , {}],
    9: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            let i;
            i = t instanceof NodeList ? t : [].concat(t),
            e = Array.isArray(e) ? e : [].concat(e),
            i.forEach(t=>{
                e.forEach(e=>{
                    t.removeAttribute(e)
                }
                )
            }
            )
        }
    }
    , {}],
    10: [function(t, e, i) {
        "use strict";
        var s = t(9)
          , n = t(11)
          , r = "data-original-"
          , a = function(t, e) {
            var i = t.getAttribute(r + e);
            null !== i && ("" === i ? s(t, e) : t.setAttribute(e, i),
            s(t, r + e))
        };
        e.exports = function(t) {
            a(t, "tabindex"),
            a(t, n.HIDDEN);
            for (var e = t.querySelectorAll("[".concat(r + "tabindex", "]")), i = e.length; i--; )
                a(e[i], "tabindex")
        }
    }
    , {
        11: 11,
        9: 9
    }],
    11: [function(t, e, i) {
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
    12: [function(t, e, i) {
        "use strict";
        e.exports = {
            selectors: ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "[tabindex]", "[contenteditable]"].join(","),
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
    13: [function(t, e, i) {
        "use strict";
        e.exports = t(30)
    }
    , {
        30: 30
    }],
    14: [function(t, e, i) {
        "use strict";
        e.exports = {
            ALERT: "alert",
            ALERTDIALOG: "alertdialog",
            BUTTON: "button",
            CHECKBOX: "checkbox",
            DIALOG: "dialog",
            GRIDCELL: "gridcell",
            LINK: "link",
            LOG: "log",
            MARQUEE: "marquee",
            MENUITEM: "menuitem",
            MENUITEMCHECKBOX: "menuitemcheckbox",
            MENUITEMRADIO: "menuitemradio",
            OPTION: "option",
            PROGRESSBAR: "progressbar",
            RADIO: "radio",
            SCROLLBAR: "scrollbar",
            SLIDER: "slider",
            SPINBUTTON: "spinbutton",
            STATUS: "status",
            SWITCH: "switch",
            TAB: "tab",
            TABPANEL: "tabpanel",
            TEXTBOX: "textbox",
            TIMER: "timer",
            TOOLTIP: "tooltip",
            TREEITEM: "treeitem",
            COMBOBOX: "combobox",
            GRID: "grid",
            LISTBOX: "listbox",
            MENU: "menu",
            MENUBAR: "menubar",
            RADIOGROUP: "radiogroup",
            TABLIST: "tablist",
            TREE: "tree",
            TREEGRID: "treegrid",
            ARTICLE: "article",
            COLUMNHEADER: "columnheader",
            DEFINITION: "definition",
            DIRECTORY: "directory",
            DOCUMENT: "document",
            GROUP: "group",
            HEADING: "heading",
            IMG: "img",
            LIST: "list",
            LISTITEM: "listitem",
            MATH: "math",
            NOTE: "note",
            PRESENTATION: "presentation",
            REGION: "region",
            ROW: "row",
            ROWGROUP: "rowgroup",
            ROWHEADER: "rowheader",
            SEPARATOR: "separator",
            TOOLBAR: "toolbar",
            APPLICATION: "application",
            BANNER: "banner",
            COMPLEMENTARY: "complementary",
            CONTENTINFO: "contentinfo",
            FORM: "form",
            MAIN: "main",
            NAVIGATION: "navigation",
            SEARCH: "search"
        }
    }
    , {}],
    15: [function(t, e, i) {
        "use strict";
        var s = function() {
            var t = ["", "-webkit-", "-moz-", "-o-", "-ms-"]
              , e = document.createElement("_")
              , i = ["", "-webkit-", "-moz-", "-o-", "-ms-"];
            function s(s) {
                for (var n = 0; n < i.length; n++) {
                    var r = t[n] + s;
                    if (void 0 !== e.style[r])
                        return r
                }
            }
            var n = ["-webkit-", "", "-moz-", "-o-", "-ms-"];
            return {
                filter: function(t) {
                    for (var i = 0; i < n.length; i++) {
                        var s = n[i] + t;
                        if (void 0 !== e.style[s])
                            return s
                    }
                }("filter"),
                transform: s("transform"),
                transformOrigin: s("transform-origin"),
                transition: s("transition"),
                transitionDelay: s("transition-delay"),
                transitionDuration: s("transition-duration"),
                transitionProperty: s("transition-property"),
                transitionTimingFunction: s("transition-timing-function"),
                transitionEnd: {
                    "animation-delay": "transitionend",
                    "-o-animation-delay": "oTransitionEnd",
                    "-moz-animation-delay": "transitionend",
                    "-webkit-animation-delay": "webkitTransitionEnd",
                    "-ms-animation-delay": "transitionend"
                }[s("animation-delay")],
                animation: s("animation"),
                animationDelay: s("animation-delay"),
                animationDirection: s("animation-direction"),
                animationDuration: s("animation-duration"),
                animationFillMode: s("animation-fill-mode"),
                animationIterationCount: s("animation-iteration-count"),
                animationName: s("animation-name"),
                animationTimingFunction: s("animation-timing-function"),
                animationPlayState: s("animation-play-state"),
                animationStart: {
                    "animation-delay": "animationstart",
                    "-o-animation-delay": "oanimationstart",
                    "-moz-animation-delay": "animationstart",
                    "-webkit-animation-delay": "webkitAnimationStart",
                    "-ms-animation-delay": "MSAnimationStart"
                }[s("animation-delay")],
                animationIteration: {
                    "animation-delay": "animationiteration",
                    "-o-animation-delay": "oanimationiteration",
                    "-moz-animation-delay": "animationiteration",
                    "-webkit-animation-delay": "webkitAnimationIteration",
                    "-ms-animation-delay": "MSAnimationIteration"
                }[s("animation-delay")],
                animationEnd: {
                    "animation-delay": "animationend",
                    "-o-animation-delay": "oanimationend",
                    "-moz-animation-delay": "animationend",
                    "-webkit-animation-delay": "webkitAnimationEnd",
                    "-ms-animation-delay": "MSAnimationEnd"
                }[s("animation-delay")]
            }
        }();
        e.exports = s
    }
    , {}],
    16: [function(t, e, i) {
        "use strict";
        var s = !1
          , n = window || self;
        try {
            s = !!n.localStorage.getItem("f7c9180f-5c45-47b4-8de4-428015f096c0")
        } catch (t) {}
        e.exports = s
    }
    , {}],
    17: [function(t, e, i) {
        "use strict";
        var s = t(16);
        e.exports = function(t) {
            return function() {
                if (s && "object" == typeof window.console && "function" == typeof console[t])
                    return console[t].apply(console, Array.prototype.slice.call(arguments, 0))
            }
        }
    }
    , {
        16: 16
    }],
    18: [function(t, e, i) {
        "use strict";
        e.exports = t(17)("log")
    }
    , {
        17: 17
    }],
    19: [function(t, e, i) {
        "use strict";
        e.exports = t(17)("warn")
    }
    , {
        17: 17
    }],
    20: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i, s) {
            return t.addEventListener ? t.addEventListener(e, i, !!s) : t.attachEvent("on" + e, i),
            t
        }
    }
    , {}],
    21: [function(t, e, i) {
        "use strict";
        e.exports = {
            EventEmitterMicro: t(22)
        }
    }
    , {
        22: 22
    }],
    22: [function(t, e, i) {
        "use strict";
        function s() {
            this._events = {}
        }
        var n = s.prototype;
        n.on = function(t, e) {
            this._events[t] = this._events[t] || [],
            this._events[t].unshift(e)
        }
        ,
        n.once = function(t, e) {
            var i = this;
            this.on(t, (function s(n) {
                i.off(t, s),
                void 0 !== n ? e(n) : e()
            }
            ))
        }
        ,
        n.off = function(t, e) {
            if (this.has(t)) {
                if (1 === arguments.length)
                    return this._events[t] = null,
                    void delete this._events[t];
                var i = this._events[t].indexOf(e);
                -1 !== i && this._events[t].splice(i, 1)
            }
        }
        ,
        n.trigger = function(t, e) {
            if (this.has(t))
                for (var i = this._events[t].length - 1; i >= 0; i--)
                    void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
        }
        ,
        n.has = function(t) {
            return t in this._events != !1 && 0 !== this._events[t].length
        }
        ,
        n.destroy = function() {
            for (var t in this._events)
                this._events[t] = null;
            this._events = null
        }
        ,
        e.exports = s
    }
    , {}],
    23: [function(t, e, i) {
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
    24: [function(t, e, i) {
        "use strict";
        t(29);
        var s = t(23)
          , n = t(25);
        function r() {
            var t = s.getWindow().matchMedia("only all");
            return !(!t || !t.matches)
        }
        e.exports = n(r),
        e.exports.original = r
    }
    , {
        23: 23,
        25: 25,
        29: 29
    }],
    25: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e;
            return function() {
                return void 0 === e && (e = t.apply(this, arguments)),
                e
            }
        }
    }
    , {}],
    26: [function(t, e, i) {
        e.exports = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
    }
    , {}],
    27: [function(t, e, i) {
        var s = t(28);
        function n() {
            if ("function" != typeof WeakMap)
                return null;
            var t = new WeakMap;
            return n = function() {
                return t
            }
            ,
            t
        }
        e.exports = function(t) {
            if (t && t.__esModule)
                return t;
            if (null === t || "object" !== s(t) && "function" != typeof t)
                return {
                    default: t
                };
            var e = n();
            if (e && e.has(t))
                return e.get(t);
            var i = {}
              , r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in t)
                if (Object.prototype.hasOwnProperty.call(t, a)) {
                    var o = r ? Object.getOwnPropertyDescriptor(t, a) : null;
                    o && (o.get || o.set) ? Object.defineProperty(i, a, o) : i[a] = t[a]
                }
            return i.default = t,
            e && e.set(t, i),
            i
        }
    }
    , {
        28: 28
    }],
    28: [function(t, e, i) {
        function s(t) {
            return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e.exports = s = function(t) {
                return typeof t
            }
            : e.exports = s = function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ,
            s(t)
        }
        e.exports = s
    }
    , {}],
    29: [function(t, e, i) {}
    , {}],
    30: [function(t, e, i) {
        "use strict";
        e.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTRAPHE: 222,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191
        }
    }
    , {}],
    31: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            return t + (e - t) * i
        }
    }
    , {}],
    32: [function(t, e, i) {
        "use strict";
        var s = t(48).SharedInstance
          , n = function() {
            this._currentID = 0
        };
        n.prototype.getNewID = function() {
            return this._currentID++,
            "raf:" + this._currentID
        }
        ,
        e.exports = s.share("ac-raf-emitter-id-generator:sharedRAFEmitterIDGeneratorInstance", "1.0.3", n)
    }
    , {
        48: 48
    }],
    33: [function(t, e, i) {
        "use strict";
        e.exports = {
            majorVersionNumber: "3.x"
        }
    }
    , {}],
    34: [function(t, e, i) {
        "use strict";
        var s, n = t(21).EventEmitterMicro, r = t(44), a = t(43);
        function o(t) {
            t = t || {},
            n.call(this),
            this.id = a.getNewID(),
            this.executor = t.executor || r,
            this._reset(),
            this._willRun = !1,
            this._didDestroy = !1
        }
        (s = o.prototype = Object.create(n.prototype)).run = function() {
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
            n.prototype.destroy.call(this),
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
        e.exports = o
    }
    , {
        21: 21,
        43: 43,
        44: 44
    }],
    35: [function(t, e, i) {
        "use strict";
        var s, n = t(22);
        function r(t) {
            t = t || {},
            this._reset(),
            this.updatePhases(),
            this.eventEmitter = new n,
            this._willRun = !1,
            this._totalSubscribeCount = -1,
            this._requestAnimationFrame = window.requestAnimationFrame,
            this._cancelAnimationFrame = window.cancelAnimationFrame,
            this._boundOnAnimationFrame = this._onAnimationFrame.bind(this),
            this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }
        (s = r.prototype).frameRequestedPhase = "requested",
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
                null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
            for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
            this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
                for (this.phaseIndex++,
                this.phase = this.phases[this.phaseIndex],
                this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                    null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
                this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
            }
            for (this.phaseIndex++,
            this.phase = this.phases[this.phaseIndex],
            this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
            this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
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
        e.exports = r
    }
    , {
        22: 22
    }],
    36: [function(t, e, i) {
        "use strict";
        var s = t(38)
          , n = function(t) {
            this.phase = t,
            this.rafEmitter = new s,
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
          , r = n.prototype;
        r.requestAnimationFrame = function(t, e) {
            return !0 === e && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0),
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
        e.exports = n
    }
    , {
        38: 38
    }],
    37: [function(t, e, i) {
        "use strict";
        var s = t(36)
          , n = function() {
            this.events = {}
        }
          , r = n.prototype;
        r.requestAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)),
            this.events[t].requestAnimationFrame
        }
        ,
        r.cancelAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)),
            this.events[t].cancelAnimationFrame
        }
        ,
        e.exports = new n
    }
    , {
        36: 36
    }],
    38: [function(t, e, i) {
        "use strict";
        var s = t(34)
          , n = function(t) {
            s.call(this, t)
        };
        (n.prototype = Object.create(s.prototype))._subscribe = function() {
            return this.executor.subscribe(this, !0)
        }
        ,
        e.exports = n
    }
    , {
        34: 34
    }],
    39: [function(t, e, i) {
        "use strict";
        var s = t(37);
        e.exports = s.cancelAnimationFrame("draw")
    }
    , {
        37: 37
    }],
    40: [function(t, e, i) {
        "use strict";
        var s = t(37);
        e.exports = s.cancelAnimationFrame("update")
    }
    , {
        37: 37
    }],
    41: [function(t, e, i) {
        "use strict";
        var s = t(37);
        e.exports = s.requestAnimationFrame("draw")
    }
    , {
        37: 37
    }],
    42: [function(t, e, i) {
        "use strict";
        var s = t(37);
        e.exports = s.requestAnimationFrame("external")
    }
    , {
        37: 37
    }],
    43: [function(t, e, i) {
        "use strict";
        var s = t(48).SharedInstance
          , n = t(33).majorVersionNumber
          , r = function() {
            this._currentID = 0
        };
        r.prototype.getNewID = function() {
            return this._currentID++,
            "raf:" + this._currentID
        }
        ,
        e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", n, r)
    }
    , {
        33: 33,
        48: 48
    }],
    44: [function(t, e, i) {
        "use strict";
        var s = t(48).SharedInstance
          , n = t(33).majorVersionNumber
          , r = t(35);
        e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", n, r)
    }
    , {
        33: 33,
        35: 35,
        48: 48
    }],
    45: [function(t, e, i) {
        "use strict";
        var s = t(37);
        e.exports = s.requestAnimationFrame("update")
    }
    , {
        37: 37
    }],
    46: [function(t, e, i) {
        "use strict";
        var s;
        function n(t) {
            t = t || {},
            this._reset(),
            this._willRun = !1,
            this._totalSubscribeCount = -1,
            this._requestAnimationFrame = window.requestAnimationFrame,
            this._cancelAnimationFrame = window.cancelAnimationFrame,
            this._boundOnAnimationFrame = this._onAnimationFrame.bind(this),
            this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }
        t(29),
        (s = n.prototype).subscribe = function(t, e) {
            return this._totalSubscribeCount++,
            this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id),
            this._nextFrameSubscribers[t.id] = t,
            this._nextFrameSubscriberArrayLength++,
            this._nextFrameSubscriberCount++,
            this._run()),
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
        s.trigger = function(t, e) {
            var i;
            for (i = 0; i < this._subscriberArrayLength; i++)
                null !== this._subscribers[this._subscribersOrder[i]] && !1 === this._subscribers[this._subscribersOrder[i]]._didDestroy && this._subscribers[this._subscribersOrder[i]].trigger(t, e)
        }
        ,
        s.destroy = function() {
            var t = this._cancel();
            return this._subscribers = null,
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
        s._run = function() {
            if (!this._willRun)
                return this._willRun = !0,
                0 === this.lastFrameTime && (this.lastFrameTime = performance.now()),
                this._animationFrameActive = !0,
                this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
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
        s._onSubscribersAnimationFrameStart = function(t) {
            var e;
            for (e = 0; e < this._subscriberArrayLength; e++)
                null !== this._subscribers[this._subscribersOrder[e]] && !1 === this._subscribers[this._subscribersOrder[e]]._didDestroy && this._subscribers[this._subscribersOrder[e]]._onAnimationFrameStart(t)
        }
        ,
        s._onSubscribersAnimationFrameEnd = function(t) {
            var e;
            for (e = 0; e < this._subscriberArrayLength; e++)
                null !== this._subscribers[this._subscribersOrder[e]] && !1 === this._subscribers[this._subscribersOrder[e]]._didDestroy && this._subscribers[this._subscribersOrder[e]]._onAnimationFrameEnd(t)
        }
        ,
        s._onAnimationFrame = function(t) {
            this._subscribers = this._nextFrameSubscribers,
            this._subscribersOrder = this._nextFrameSubscribersOrder,
            this._subscriberArrayLength = this._nextFrameSubscriberArrayLength,
            this._subscriberCount = this._nextFrameSubscriberCount,
            this._nextFrameSubscribers = {},
            this._nextFrameSubscribersOrder = [],
            this._nextFrameSubscriberArrayLength = 0,
            this._nextFrameSubscriberCount = 0,
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
            this._onSubscribersAnimationFrameStart(this._rafData),
            this.trigger("update", this._rafData),
            this.trigger("external", this._rafData),
            this.trigger("draw", this._rafData),
            this._onSubscribersAnimationFrameEnd(this._rafData),
            this._willRun || this._reset()
        }
        ,
        s._onExternalAnimationFrame = function(t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
        }
        ,
        s._reset = function() {
            this._rafData = {
                time: 0,
                delta: 0,
                fps: 0,
                naturalFps: 0,
                timeNow: 0
            },
            this._subscribers = {},
            this._subscribersOrder = [],
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
            this.lastFrameTime = 0
        }
        ,
        e.exports = n
    }
    , {
        29: 29
    }],
    47: [function(t, e, i) {
        "use strict";
        var s = t(48).SharedInstance
          , n = t(46);
        e.exports = s.share("ac-raf-executor:sharedRAFExecutorInstance", "2.0.1", n)
    }
    , {
        46: 46,
        48: 48
    }],
    48: [function(t, e, i) {
        "use strict";
        e.exports = {
            SharedInstance: t(49)
        }
    }
    , {
        49: 49
    }],
    49: [function(t, e, i) {
        "use strict";
        var s, n = window, r = n.AC, a = (s = {},
        {
            get: function(t, e) {
                var i = null;
                return s[t] && s[t][e] && (i = s[t][e]),
                i
            },
            set: function(t, e, i) {
                return s[t] || (s[t] = {}),
                s[t][e] = "function" == typeof i ? new i : i,
                s[t][e]
            },
            share: function(t, e, i) {
                var s = this.get(t, e);
                return s || (s = this.set(t, e, i)),
                s
            },
            remove: function(t, e) {
                var i = typeof e;
                if ("string" !== i && "number" !== i)
                    s[t] && (s[t] = null);
                else {
                    if (!s[t] || !s[t][e])
                        return;
                    s[t][e] = null
                }
            }
        });
        r || (r = n.AC = {}),
        r.SharedInstance || (r.SharedInstance = a),
        e.exports = r.SharedInstance
    }
    , {}],
    50: [function(t, e, i) {
        "use strict";
        t(29),
        t(29),
        t(29);
        var s = t(21).EventEmitterMicro
          , n = t(20)
          , r = t(24);
        function a(t) {
            s.call(this),
            this._initializeElement(t),
            r() && (this._updateViewport = this._updateViewport.bind(this),
            n(window, "resize", this._updateViewport),
            n(window, "orientationchange", this._updateViewport),
            this._retinaQuery = window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)"),
            this._updateRetina(),
            this._retinaQuery.addListener && (this._updateRetina = this._updateRetina.bind(this),
            this._retinaQuery.addListener(this._updateRetina))),
            this._updateViewport()
        }
        var o = a.prototype = Object.create(s.prototype);
        o.viewport = !1,
        o.retina = !1,
        o._initializeElement = function(t) {
            var e;
            t = t || "viewport-emitter",
            (e = document.getElementById(t)) || ((e = document.createElement("div")).id = t,
            e = document.body.appendChild(e)),
            this._el = e
        }
        ,
        o._getElementContent = function() {
            var t;
            return "currentStyle"in this._el ? t = this._el.currentStyle["x-content"] : (this._invalidateStyles(),
            t = window.getComputedStyle(this._el, "::before").content),
            t && (t = t.replace(/["']/g, "")),
            t || !1
        }
        ,
        o._updateViewport = function() {
            var t, e = this.viewport;
            this.viewport = this._getElementContent(),
            this.viewport && (this.viewport = this.viewport.split(":").pop()),
            e && this.viewport !== e && (t = {
                from: e,
                to: this.viewport
            },
            this.trigger("change", t),
            this.trigger("from:" + e, t),
            this.trigger("to:" + this.viewport, t))
        }
        ,
        o._updateRetina = function(t) {
            var e = this.retina;
            this.retina = this._retinaQuery.matches,
            e !== this.retina && this.trigger("retinachange", {
                from: e,
                to: this.retina
            })
        }
        ,
        o._invalidateStyles = function() {
            document.documentElement.clientWidth,
            this._el.innerHTML = " " === this._el.innerHTML ? " " : " ",
            document.documentElement.clientWidth
        }
        ,
        e.exports = a
    }
    , {
        20: 20,
        21: 21,
        24: 24,
        29: 29
    }],
    51: [function(t, e, i) {
        "use strict";
        var s = t(50);
        e.exports = new s
    }
    , {
        50: 50
    }],
    52: [function(t, e, i) {
        "use strict";
        e.exports = {
            version: "3.3.5",
            major: "3.x",
            majorMinor: "3.3"
        }
    }
    , {}],
    53: [function(t, e, i) {
        "use strict";
        const s = t(21).EventEmitterMicro
          , n = t(60)
          , r = t(55)
          , a = t(56)
          , o = t(58)
          , h = t(75)
          , l = t(76)
          , c = t(77)
          , u = t(52)
          , d = {};
        "undefined" != typeof window && (d.update = t(45),
        d.cancelUpdate = t(40),
        d.external = t(42),
        d.draw = t(41));
        let m = null;
        class p extends s {
            constructor() {
                if (super(),
                m)
                    throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
                m = this,
                this.groups = [],
                this.scrollSystems = [],
                this.timeSystems = [],
                this.tweenGroup = null,
                this._forceUpdateRAFId = -1,
                this.initialized = !1,
                this.model = n,
                this.version = u.version,
                this._resolveReady = ()=>{}
                ,
                this.ready = new Promise(t=>this._resolveReady = t),
                this.onScroll = this.onScroll.bind(this),
                this.onResizedDebounced = this.onResizedDebounced.bind(this),
                this.onResizeImmediate = this.onResizeImmediate.bind(this)
            }
            initialize() {
                return this.initialized || "undefined" == typeof window || (this.initialized = !0,
                this.timeSystems = [],
                this.scrollSystems = [],
                this.groups = [],
                this.setupEvents(),
                this.initializeResizeFilter(),
                this.initializeModel(),
                this.createDOMGroups(),
                this.createDOMKeyframes(),
                this.tweenGroup = new c(null,this),
                this.groups.push(this.tweenGroup),
                this._resolveReady()),
                this.ready
            }
            remove() {
                return this.initialized ? Promise.all(this.groups.map(t=>t.remove())).then(()=>{
                    this.groups = null,
                    this.scrollSystems = null,
                    this.timeSystems = null,
                    window.clearTimeout(n.RESIZE_TIMEOUT),
                    window.removeEventListener("scroll", this.onScroll),
                    window.removeEventListener("resize", this.onResizeImmediate),
                    this._events = {},
                    this.initialized = !1,
                    this.ready = new Promise(t=>this._resolveReady = t)
                }
                ) : (this.ready = new Promise(t=>this._resolveReady = t),
                Promise.resolve())
            }
            destroy() {
                return this.remove()
            }
            createTimeGroup(t) {
                let e = new l(t,this);
                return this.groups.push(e),
                this.timeSystems.push(e),
                this.trigger(n.EVENTS.ON_GROUP_CREATED, e),
                e
            }
            createScrollGroup(t) {
                if (!t)
                    throw "AnimSystem scroll based groups must supply an HTMLElement";
                let e = new h(t,this);
                return this.groups.push(e),
                this.scrollSystems.push(e),
                this.trigger(n.EVENTS.ON_GROUP_CREATED, e),
                e
            }
            removeGroup(t) {
                return Promise.all(t.keyframeControllers.map(e=>t.removeKeyframeController(e))).then(()=>{
                    let e = this.groups.indexOf(t);
                    -1 !== e && this.groups.splice(e, 1),
                    e = this.scrollSystems.indexOf(t),
                    -1 !== e && this.scrollSystems.splice(e, 1),
                    e = this.timeSystems.indexOf(t),
                    -1 !== e && this.timeSystems.splice(e, 1),
                    t.destroy()
                }
                )
            }
            createDOMGroups() {
                document.body.setAttribute("data-anim-scroll-group", "body"),
                document.querySelectorAll("[data-anim-scroll-group]").forEach(t=>this.createScrollGroup(t)),
                document.querySelectorAll("[data-anim-time-group]").forEach(t=>this.createTimeGroup(t)),
                this.trigger(n.EVENTS.ON_DOM_GROUPS_CREATED, this.groups)
            }
            createDOMKeyframes() {
                let t = [];
                ["data-anim-keyframe", r.DATA_ATTRIBUTE, a.DATA_ATTRIBUTE, o.DATA_ATTRIBUTE].forEach((function(e) {
                    for (let i = 0; i < 12; i++)
                        t.push(e + (0 === i ? "" : "-" + (i - 1)))
                }
                ));
                for (let e = 0; e < t.length; e++) {
                    let i = t[e]
                      , s = document.querySelectorAll("[" + i + "]");
                    for (let t = 0; t < s.length; t++) {
                        const e = s[t]
                          , n = JSON.parse(e.getAttribute(i));
                        this.addKeyframe(e, n)
                    }
                }
                d.update(()=>{
                    null !== this.groups && (this.groups.forEach(t=>t.onKeyframesDirty({
                        silent: !0
                    })),
                    this.groups.forEach(t=>t.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, t)),
                    this.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, this),
                    this.groups.forEach(t=>{
                        t.forceUpdate({
                            waitForNextUpdate: !1,
                            silent: !0
                        }),
                        t.reconcile()
                    }
                    ),
                    this.onScroll())
                }
                , !0)
            }
            initializeResizeFilter() {
                if (n.cssDimensionsTracker)
                    return;
                const t = document.querySelector(".cssDimensionsTracker") || document.createElement("div");
                t.setAttribute("cssDimensionsTracker", "true"),
                t.style.position = "fixed",
                t.style.top = "0",
                t.style.width = "100%",
                t.style.height = "100vh",
                t.style.pointerEvents = "none",
                t.style.visibility = "hidden",
                t.style.zIndex = "-1",
                document.documentElement.appendChild(t),
                n.cssDimensionsTracker = t
            }
            initializeModel() {
                n.pageMetrics.windowHeight = n.cssDimensionsTracker.clientHeight,
                n.pageMetrics.windowWidth = n.cssDimensionsTracker.clientWidth,
                n.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
                n.pageMetrics.scrollX = window.scrollX || window.pageXOffset,
                n.pageMetrics.breakpoint = n.getBreakpoint();
                let t = document.documentElement.getBoundingClientRect();
                n.pageMetrics.documentOffsetX = t.left + n.pageMetrics.scrollX,
                n.pageMetrics.documentOffsetY = t.top + n.pageMetrics.scrollY
            }
            setupEvents() {
                window.removeEventListener("scroll", this.onScroll),
                window.addEventListener("scroll", this.onScroll),
                window.removeEventListener("resize", this.onResizeImmediate),
                window.addEventListener("resize", this.onResizeImmediate)
            }
            onScroll() {
                n.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
                n.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                for (let t = 0, e = this.scrollSystems.length; t < e; t++)
                    this.scrollSystems[t].updateTimeline();
                this.trigger(n.PageEvents.ON_SCROLL, n.pageMetrics)
            }
            onResizeImmediate() {
                let t = n.cssDimensionsTracker.clientWidth
                  , e = n.cssDimensionsTracker.clientHeight;
                if (t === n.pageMetrics.windowWidth && e === n.pageMetrics.windowHeight)
                    return;
                n.pageMetrics.windowWidth = t,
                n.pageMetrics.windowHeight = e,
                n.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
                n.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                let i = document.documentElement.getBoundingClientRect();
                n.pageMetrics.documentOffsetX = i.left + n.pageMetrics.scrollX,
                n.pageMetrics.documentOffsetY = i.top + n.pageMetrics.scrollY,
                window.clearTimeout(n.RESIZE_TIMEOUT),
                n.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250),
                this.trigger(n.PageEvents.ON_RESIZE_IMMEDIATE, n.pageMetrics)
            }
            onResizedDebounced() {
                d.update(()=>{
                    let t = n.pageMetrics.breakpoint
                      , e = n.getBreakpoint();
                    if (e !== t) {
                        n.pageMetrics.previousBreakpoint = t,
                        n.pageMetrics.breakpoint = e;
                        for (let t = 0, e = this.groups.length; t < e; t++)
                            this.groups[t]._onBreakpointChange();
                        this.trigger(n.PageEvents.ON_BREAKPOINT_CHANGE, n.pageMetrics)
                    }
                    for (let t = 0, e = this.groups.length; t < e; t++)
                        this.groups[t].forceUpdate({
                            waitForNextUpdate: !1
                        });
                    this.trigger(n.PageEvents.ON_RESIZE_DEBOUNCED, n.pageMetrics)
                }
                , !0)
            }
            forceUpdate({waitForNextUpdate: t=!0, silent: e=!1}={}) {
                -1 !== this._forceUpdateRAFId && d.cancelUpdate(this._forceUpdateRAFId);
                let i = ()=>{
                    for (let t = 0, i = this.groups.length; t < i; t++) {
                        this.groups[t].forceUpdate({
                            waitForNextUpdate: !1,
                            silent: e
                        })
                    }
                    return -1
                }
                ;
                this._forceUpdateRAFId = t ? d.update(i, !0) : i()
            }
            addKeyframe(t, e) {
                let i = this.getGroupForTarget(t);
                return i = i || this.getGroupForTarget(document.body),
                i.addKeyframe(t, e)
            }
            addEvent(t, e) {
                let i = this.getGroupForTarget(t);
                return i = i || this.getGroupForTarget(document.body),
                i.addEvent(t, e)
            }
            getTimeGroupForTarget(t) {
                return this._getGroupForTarget(t, t=>t instanceof l)
            }
            getScrollGroupForTarget(t) {
                return this._getGroupForTarget(t, t=>!(t instanceof l))
            }
            getGroupForTarget(t) {
                return this._getGroupForTarget(t, ()=>!0)
            }
            _getGroupForTarget(t, e) {
                if (t._animInfo && t._animInfo.group && e(t._animInfo.group))
                    return t._animInfo.group;
                let i = t;
                for (; i; ) {
                    if (i._animInfo && i._animInfo.isGroup && e(i._animInfo.group))
                        return i._animInfo.group;
                    i = i.parentElement
                }
            }
            getControllerForTarget(t) {
                return t._animInfo && t._animInfo.controller ? t._animInfo.controller : null
            }
            addTween(t, e) {
                return this.tweenGroup.addKeyframe(t, e)
            }
        }
        e.exports = "undefined" == typeof window ? new p : window.AC.SharedInstance.share("AnimSystem", u.major, p),
        e.exports.default = e.exports
    }
    , {
        21: 21,
        40: 40,
        41: 41,
        42: 42,
        45: 45,
        52: 52,
        55: 55,
        56: 56,
        58: 58,
        60: 60,
        75: 75,
        76: 76,
        77: 77
    }],
    54: [function(t, e, i) {
        "use strict";
        const s = t(60);
        class n {
            constructor(t, e) {
                this._index = 0,
                this.keyframe = t,
                e && (this.name = e)
            }
            get start() {
                return this.keyframe.jsonProps.start
            }
            set index(t) {
                this._index = t
            }
            get index() {
                return this._index
            }
        }
        e.exports = class {
            constructor(t) {
                this.timeGroup = t,
                this.chapters = [],
                this.chapterNames = {},
                this.currentChapter = null,
                this.clip = null
            }
            addChapter(t) {
                const {position: e, name: i} = t;
                if (void 0 === e)
                    throw ReferenceError("Cannot add chapter without target position.");
                t._impIsFirst || 0 !== this.chapters.length || this.addChapter({
                    position: 0,
                    _impIsFirst: !0
                });
                let s = this.timeGroup.addKeyframe(this, {
                    start: e,
                    end: e,
                    event: "Chapter"
                });
                this.timeGroup.forceUpdate({
                    waitForNextFrame: !1,
                    silent: !0
                });
                const r = new n(s,i);
                if (this.chapters.push(r),
                i) {
                    if (this.chapterNames.hasOwnProperty(i))
                        throw ReferenceError('Duplicate chapter name assigned - "'.concat(i, '" is already in use'));
                    this.chapterNames[i] = r
                }
                return this.chapters.sort((t,e)=>t.start - e.start).forEach((t,e)=>t.index = e),
                this.currentChapter = this.currentChapter || this.chapters[0],
                r
            }
            playToChapter(t) {
                let e;
                if (t.hasOwnProperty("index"))
                    e = this.chapters[t.index];
                else {
                    if (!t.hasOwnProperty("name"))
                        throw ReferenceError("Cannot play to chapter without target index or name");
                    e = this.chapterNames[t.name]
                }
                if (!e || this.currentChapter === e && !0 !== t.force)
                    return;
                let i = t.ease || "easeInOutCubic";
                this.clip && (this.clip.destroy(),
                i = "easeOutQuint"),
                this.timeGroup.timeScale(t.timeScale || 1);
                const n = void 0 !== t.duration ? t.duration : this.getDurationToChapter(e)
                  , r = this.timeGroup.time()
                  , a = e.start;
                let o = !1;
                this.tween = this.timeGroup.anim.addTween({
                    time: r
                }, {
                    easeFunction: i,
                    duration: n,
                    time: [r, a],
                    onStart: ()=>this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_INITIATED, {
                        player: this,
                        next: e
                    }),
                    onDraw: t=>{
                        let i = t.tweenProps.time.current;
                        this.timeGroup.time(i),
                        t.keyframe.curvedT > .5 && !o && (o = !0,
                        this.currentIndex = e.index,
                        this.currentChapter = e,
                        this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_OCCURRED, {
                            player: this,
                            current: e
                        }))
                    }
                    ,
                    onComplete: ()=>{
                        this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_COMPLETED, {
                            player: this,
                            current: e
                        }),
                        this.timeGroup.paused(!0),
                        this.clip = null
                    }
                })
            }
            getDurationToChapter(t) {
                const e = this.chapters[t.index - 1] || this.chapters[t.index + 1];
                return Math.abs(e.start - t.start)
            }
        }
    }
    , {
        60: 60
    }],
    55: [function(t, e, i) {
        "use strict";
        const s = t(60)
          , n = t(68)
          , r = t(153)
          , a = t(62)
          , o = t(71)
          , h = t(67)
          , l = t(78)
          , c = t(79)
          , u = t(70);
        class d {
            constructor(t, e) {
                this.controller = t,
                this.anchors = [],
                this.jsonProps = e,
                this.ease = t.group.defaultEase,
                this.easeFunction = a.linear,
                this.start = 0,
                this.end = 0,
                this.localT = 0,
                this.curvedT = 0,
                this.id = 0,
                this.event = "",
                this.needsEventDispatch = !1,
                this.snapAtCreation = !1,
                this.isEnabled = !1,
                this.animValues = {},
                this.breakpointMask = "SMLX",
                this.disabledWhen = [],
                this.keyframeType = s.KeyframeTypes.Interpolation,
                this.hold = !1,
                this.preserveState = !1,
                this.markedForRemoval = !1;
                let i = !1;
                Object.defineProperty(this, "hidden", {
                    get: ()=>i,
                    set(e) {
                        i = e,
                        t.group.keyframesDirty = !0
                    }
                }),
                this.uuid = u(),
                this.destroyed = !1
            }
            destroy() {
                this.destroyed = !0,
                this.controller = null,
                this.disabledWhen = null,
                this.anchors = null,
                this.jsonProps = null,
                this.easeFunction = null,
                this.animValues = null
            }
            remove() {
                return this.controller.removeKeyframe(this)
            }
            parseOptions(t) {
                this.jsonProps = t,
                t.relativeTo && console.error("KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':\"".concat(t.relativeTo, '"')),
                void 0 === t.end && void 0 === t.duration && (t.end = t.start),
                "" !== t.anchors && t.anchors ? (this.anchors = [],
                t.anchors = Array.isArray(t.anchors) ? t.anchors : [t.anchors],
                t.anchors.forEach((e,i)=>{
                    let s = c(e, this.controller.group.element);
                    if (!s) {
                        let s = "";
                        return "string" == typeof e && (s = " Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document."),
                        void console.warn("Keyframe on", this.controller.element, " failed to find anchor at index ".concat(i, " in array"), t.anchors, ". Anchors must be JS Object references, Elements references, or valid query selector strings. ".concat(s))
                    }
                    this.anchors.push(s),
                    this.controller.group.metrics.add(s)
                }
                )) : (this.anchors = [],
                t.anchors = []),
                t.ease ? this.ease = parseFloat(t.ease) : t.ease = this.ease,
                t.hasOwnProperty("snapAtCreation") ? this.snapAtCreation = t.snapAtCreation : t.snapAtCreation = this.snapAtCreation,
                t.easeFunction || (t.easeFunction = s.KeyframeDefaults.easeFunctionString),
                t.breakpointMask ? this.breakpointMask = t.breakpointMask : t.breakpointMask = this.breakpointMask,
                t.disabledWhen ? this.disabledWhen = Array.isArray(t.disabledWhen) ? t.disabledWhen : [t.disabledWhen] : t.disabledWhen = this.disabledWhen,
                t.hasOwnProperty("hold") ? this.hold = t.hold : t.hold = this.hold,
                t.hasOwnProperty("preserveState") ? this.preserveState = t.preserveState : t.preserveState = s.KeyframeDefaults.preserveState,
                this.easeFunction = a[t.easeFunction],
                a.hasOwnProperty(t.easeFunction) || (t.easeFunction.includes("bezier") ? this.easeFunction = o.fromCSSString(t.easeFunction) : t.easeFunction.includes("spring") ? this.easeFunction = h.fromCSSString(t.easeFunction) : console.error("Keyframe parseOptions cannot find 'easeFunction' named '" + t.easeFunction + "'"));
                for (let e in t) {
                    if (-1 !== s.KeyframeJSONReservedWords.indexOf(e))
                        continue;
                    let i = t[e];
                    if (!Array.isArray(i))
                        continue;
                    if (1 === i.length && (i[0] = null,
                    i[1] = i[0]),
                    this.animValues[e] = this.controller.group.expressionParser.parseArray(this, i),
                    void 0 === this.controller.tweenProps[e] || !this.controller._ownerIsElement) {
                        let t = 0;
                        this.controller._ownerIsElement || (t = this.controller.element[e] || 0);
                        let i = new n(t,s.KeyframeDefaults.epsilon,this.snapAtCreation);
                        this.controller.tweenProps[e] = i
                    }
                    let r = this.controller.tweenProps[e];
                    if (t.epsilon)
                        r.epsilon = t.epsilon;
                    else {
                        let t = Math.abs(this.animValues[e][0] - this.animValues[e][1])
                          , i = Math.min(.001 * t, r.epsilon, s.KeyframeDefaults.epsilon);
                        r.epsilon = Math.max(i, 1e-4)
                    }
                }
                this.keyframeType = this.hold ? s.KeyframeTypes.InterpolationForward : s.KeyframeTypes.Interpolation,
                t.event && (this.event = t.event)
            }
            overwriteProps(t) {
                this.animValues = {};
                let e = Object.assign({}, this.jsonProps, t);
                this.controller.updateKeyframe(this, e)
            }
            updateLocalProgress(t) {
                if (this.start === this.end || t < this.start || t > this.end)
                    return this.localT = t < this.start ? this.hold ? this.localT : 0 : t > this.end ? 1 : 0,
                    void (this.curvedT = this.easeFunction(this.localT));
                const e = (t - this.start) / (this.end - this.start)
                  , i = this.hold ? this.localT : 0;
                this.localT = r.clamp(e, i, 1),
                this.curvedT = this.easeFunction(this.localT)
            }
            reconcile(t) {
                let e = this.animValues[t]
                  , i = this.controller.tweenProps[t];
                i.initialValue = e[0],
                i.target = e[0] + this.curvedT * (e[1] - e[0]),
                i.current !== i.target && (i.current = i.target,
                this.needsEventDispatch || (this.needsEventDispatch = !0,
                this.controller.keyframesRequiringDispatch.push(this)))
            }
            reset(t) {
                this.localT = t || 0;
                var e = this.ease;
                this.ease = 1;
                for (let t in this.animValues)
                    this.reconcile(t);
                this.ease = e
            }
            onDOMRead(t) {
                let e = this.animValues[t]
                  , i = this.controller.tweenProps[t];
                i.target = e[0] + this.curvedT * (e[1] - e[0]);
                let s = i.current;
                i.current += (i.target - i.current) * this.ease;
                let n = i.current - i.target;
                n < i.epsilon && n > -i.epsilon && (i.current = i.target,
                n = 0),
                "" === this.event || this.needsEventDispatch || (n > i.epsilon || n < -i.epsilon || 0 === n && s !== i.current) && (this.needsEventDispatch = !0,
                this.controller.keyframesRequiringDispatch.push(this))
            }
            isInRange(t) {
                return t >= this.start && t <= this.end
            }
            setEnabled(t) {
                t = t || l(Array.from(document.documentElement.classList));
                let e = -1 !== this.breakpointMask.indexOf(s.pageMetrics.breakpoint)
                  , i = !1;
                return this.disabledWhen.length > 0 && (i = this.disabledWhen.some(e=>void 0 !== t[e])),
                this.isEnabled = e && !i,
                this.isEnabled
            }
            evaluateConstraints() {
                this.start = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.start),
                this.end = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.end),
                this.evaluateInterpolationConstraints()
            }
            evaluateInterpolationConstraints() {
                for (let t in this.animValues) {
                    let e = this.jsonProps[t];
                    this.animValues[t] = this.controller.group.expressionParser.parseArray(this, e)
                }
            }
        }
        d.DATA_ATTRIBUTE = "data-anim-tween",
        e.exports = d
    }
    , {
        153: 153,
        60: 60,
        62: 62,
        67: 67,
        68: 68,
        70: 70,
        71: 71,
        78: 78,
        79: 79
    }],
    56: [function(t, e, i) {
        "use strict";
        const s = t(55)
          , n = t(60)
          , r = t(68);
        class a extends s {
            constructor(t, e) {
                super(t, e),
                this.keyframeType = n.KeyframeTypes.CSSClass,
                this._triggerType = a.TRIGGER_TYPE_CSS_CLASS,
                this.cssClass = "",
                this.friendlyName = "",
                this.style = {
                    on: null,
                    off: null
                },
                this.toggle = !1,
                this.isApplied = !1
            }
            parseOptions(t) {
                if (!this.controller._ownerIsElement)
                    throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
                if (t.x = void 0,
                t.y = void 0,
                t.z = void 0,
                t.scale = void 0,
                t.scaleX = void 0,
                t.scaleY = void 0,
                t.rotationX = void 0,
                t.rotationY = void 0,
                t.rotationZ = void 0,
                t.rotation = void 0,
                t.opacity = void 0,
                t.hold = void 0,
                void 0 !== t.toggle && (this.toggle = t.toggle),
                void 0 !== t.cssClass)
                    this._triggerType = a.TRIGGER_TYPE_CSS_CLASS,
                    this.cssClass = t.cssClass,
                    this.friendlyName = "." + this.cssClass,
                    void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = {
                        add: [],
                        remove: []
                    });
                else {
                    if (void 0 === t.style || !this.isValidStyleProperty(t.style))
                        throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
                    if (this._triggerType = a.TRIGGER_TYPE_STYLE_PROPERTY,
                    this.style = t.style,
                    this.friendlyName = "style",
                    this.toggle = void 0 !== this.style.off || this.toggle,
                    this.toggle && void 0 === this.style.off) {
                        this.style.off = {};
                        for (let t in this.style.on)
                            this.style.off[t] = ""
                    }
                    void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {})
                }
                if (void 0 === t.end && (t.end = t.start),
                t.toggle = this.toggle,
                this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
                    this.isApplied = this.controller.element.classList.contains(this.cssClass);
                else {
                    let t = getComputedStyle(this.controller.element);
                    this.isApplied = !0;
                    for (let e in this.style.on)
                        if (t[e] !== this.style.on[e]) {
                            this.isApplied = !1;
                            break
                        }
                }
                s.prototype.parseOptions.call(this, t),
                this.animValues[this.friendlyName] = [0, 0],
                void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new r(0,1,!1)),
                this.keyframeType = n.KeyframeTypes.CSSClass
            }
            updateLocalProgress(t) {
                this.isApplied && !this.toggle || (this.start !== this.end ? !this.isApplied && t >= this.start && t <= this.end ? this._apply() : this.isApplied && this.toggle && (t < this.start || t > this.end) && this._unapply() : !this.isApplied && t >= this.start ? this._apply() : this.isApplied && this.toggle && t < this.start && this._unapply())
            }
            _apply() {
                if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
                    this.controller.tweenProps.targetClasses.add.push(this.cssClass),
                    this.controller.needsClassUpdate = !0;
                else {
                    for (let t in this.style.on)
                        this.controller.tweenProps.targetStyles[t] = this.style.on[t];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !0
            }
            _unapply() {
                if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
                    this.controller.tweenProps.targetClasses.remove.push(this.cssClass),
                    this.controller.needsClassUpdate = !0;
                else {
                    for (let t in this.style.off)
                        this.controller.tweenProps.targetStyles[t] = this.style.off[t];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !1
            }
            isValidStyleProperty(t) {
                if (!t.hasOwnProperty("on"))
                    return !1;
                if ("object" != typeof t.on)
                    throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                if (this.toggle && t.hasOwnProperty("off") && "object" != typeof t.off)
                    throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                return !0
            }
            reconcile(t) {}
            onDOMRead(t) {}
            evaluateInterpolationConstraints() {}
        }
        a.TRIGGER_TYPE_CSS_CLASS = 0,
        a.TRIGGER_TYPE_STYLE_PROPERTY = 1,
        a.DATA_ATTRIBUTE = "data-anim-classname",
        e.exports = a
    }
    , {
        55: 55,
        60: 60,
        68: 68
    }],
    57: [function(t, e, i) {
        "use strict";
        const s = t(60)
          , n = t(68)
          , r = t(61)
          , a = t(64)
          , o = t(59)
          , h = (t(55),
        t(56))
          , l = t(65)
          , c = t(78)
          , u = t(70)
          , d = t(21).EventEmitterMicro
          , m = t(94)
          , p = {};
        "undefined" != typeof window && (p.update = t(45),
        p.external = t(42),
        p.draw = t(41));
        const f = Math.PI / 180
          , _ = ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"]
          , y = ["borderRadius", "bottom", "fontSize", "fontWeight", "height", "left", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "maxHeight", "maxWidth", "opacity", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "right", "top", "width", "zIndex", "strokeDashoffset"]
          , g = ["currentTime", "scrollLeft", "scrollTop"]
          , v = {
            create: t(160),
            rotateX: t(161),
            rotateY: t(162),
            rotateZ: t(163),
            scale: t(164)
        };
        e.exports = class extends d {
            constructor(t, e) {
                super(),
                this._events.draw = [],
                this.uuid = u(),
                this.group = t,
                this.element = e,
                this._ownerIsElement = this.element instanceof Element,
                this._ownerIsElement ? this.friendlyName = this.element.tagName + "." + Array.from(this.element.classList).join(".") : this.friendlyName = this.element.friendlyName || this.uuid,
                this.element._animInfo = this.element._animInfo || new o(t,this),
                this.element._animInfo.controller = this,
                this.element._animInfo.group = this.group,
                this.element._animInfo.controllers.push(this),
                this.tweenProps = this.element._animInfo.tweenProps,
                this.eventObject = new a(this),
                this.needsStyleUpdate = !1,
                this.needsClassUpdate = !1,
                this.elementMetrics = this.group.metrics.add(this.element),
                this.attributes = [],
                this.cssAttributes = [],
                this.domAttributes = [],
                this.keyframes = {},
                this._allKeyframes = [],
                this._activeKeyframes = [],
                this.keyframesRequiringDispatch = [],
                this.updateCachedValuesFromElement(),
                this.boundsMin = 0,
                this.boundsMax = 0,
                this.mat2d = new Float32Array(6),
                this.mat4 = v.create(),
                this.needsWrite = !0,
                this.onDOMWriteImp = this._ownerIsElement ? this.onDOMWriteForElement : this.onDOMWriteForObject
            }
            destroy() {
                if (this.element._animInfo) {
                    this.element._animInfo.controller === this && (this.element._animInfo.controller = null);
                    let t = this.element._animInfo.controllers.indexOf(this);
                    if (-1 !== t && this.element._animInfo.controllers.splice(t, 1),
                    0 === this.element._animInfo.controllers.length)
                        this.element._animInfo = null;
                    else {
                        let t = this.element._animInfo.controllers.find(t=>t.group !== t.group.anim.tweenGroup);
                        t && (this.element._animInfo.controller = t,
                        this.element._animInfo.group = t.group)
                    }
                }
                this.eventObject.controller = null,
                this.eventObject.element = null,
                this.eventObject.keyframe = null,
                this.eventObject.tweenProps = null,
                this.eventObject = null,
                this.elementMetrics = null,
                this.group = null,
                this.keyframesRequiringDispatch = null;
                for (let t = 0; t < this._allKeyframes.length; t++)
                    this._allKeyframes[t].destroy();
                this._allKeyframes = null,
                this._activeKeyframes = null,
                this.attributes = null,
                this.keyframes = null,
                this.element = null,
                this.tweenProps = null,
                this.destroyed = !0,
                super.destroy()
            }
            remove() {
                return this.group.removeKeyframeController(this)
            }
            updateCachedValuesFromElement() {
                if (!this._ownerIsElement)
                    return;
                const t = getComputedStyle(this.element);
                let e = new DOMMatrix(t.getPropertyValue("transform"))
                  , i = m(e)
                  , a = s.KeyframeDefaults.epsilon;
                ["x", "y", "z"].forEach((t,e)=>{
                    this.tweenProps[t] = new n(i.translation[e],a,!1)
                }
                ),
                this.tweenProps.rotation = new n(i.rotation[2],a,!1),
                ["rotationX", "rotationY", "rotationZ"].forEach((t,e)=>{
                    this.tweenProps[t] = new n(i.rotation[e],a,!1)
                }
                ),
                this.tweenProps.scale = new n(i.scale[0],a,!1),
                ["scaleX", "scaleY", "scaleZ"].forEach((t,e)=>{
                    this.tweenProps[t] = new n(i.scale[e],a,!1)
                }
                ),
                y.forEach(e=>{
                    let i = ["zIndex"].includes(e)
                      , s = ["opacity", "zIndex", "fontWeight"].includes(e) ? void 0 : "px"
                      , n = parseFloat(t[e]);
                    isNaN(n) && (n = 0),
                    this.tweenProps[e] = new r(n,a,!1,e,i,s)
                }
                ),
                g.forEach(t=>{
                    let e = isNaN(this.element[t]) ? 0 : this.element[t];
                    this.tweenProps[t] = new r(e,a,!1,t,!1)
                }
                )
            }
            addKeyframe(t) {
                let e = l(t);
                if (!e)
                    throw new Error("AnimSystem Cannot create keyframe for from options `" + t + "`");
                let i = new e(this,t);
                return i.parseOptions(t),
                i.id = this._allKeyframes.length,
                this._allKeyframes.push(i),
                i
            }
            needsUpdate() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t]
                      , i = this.tweenProps[e];
                    if (Math.abs(i.current - i.target) > i.epsilon)
                        return !0
                }
                return !1
            }
            updateLocalProgress(t) {
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.attributes[e]
                      , s = this.keyframes[this.attributes[e]];
                    if (1 === s.length) {
                        s[0].updateLocalProgress(t);
                        continue
                    }
                    let n = this.getNearestKeyframeForAttribute(i, t);
                    n && n.updateLocalProgress(t)
                }
            }
            reconcile() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t]
                      , i = this.getNearestKeyframeForAttribute(e, this.group.position.local);
                    i.updateLocalProgress(this.group.position.local),
                    i.snapAtCreation && i.reconcile(e)
                }
            }
            determineActiveKeyframes(t) {
                t = t || c(Array.from(document.documentElement.classList));
                let e = this._activeKeyframes
                  , i = this.attributes
                  , s = {};
                this._activeKeyframes = [],
                this.attributes = [],
                this.keyframes = {};
                for (let e = 0; e < this._allKeyframes.length; e++) {
                    let i = this._allKeyframes[e];
                    if (i.markedForRemoval || i.hidden || !i.setEnabled(t))
                        for (let t in i.animValues)
                            this.tweenProps[t].isActive = i.preserveState,
                            i.preserveState && (s[t] = !0);
                    else {
                        this._activeKeyframes.push(i);
                        for (let t in i.animValues)
                            this.keyframes[t] = this.keyframes[t] || [],
                            this.keyframes[t].push(i),
                            -1 === this.attributes.indexOf(t) && (s[t] = !0,
                            this.attributes.push(t),
                            this.tweenProps[t].isActive = !0)
                    }
                }
                this.attributes.forEach(t=>this.tweenProps[t].isActive = !0),
                this.cssAttributes = y.filter(t=>this.attributes.includes(t)).map(t=>this.tweenProps[t]),
                this.domAttributes = g.filter(t=>this.attributes.includes(t)).map(t=>this.tweenProps[t]);
                let n = e.filter(t=>-1 === this._activeKeyframes.indexOf(t));
                if (0 === n.length)
                    return;
                let r = i.filter(t=>-1 === this.attributes.indexOf(t) && !s.hasOwnProperty(t));
                if (0 !== r.length)
                    if (this.needsWrite = !0,
                    this._ownerIsElement)
                        p.external(()=>{
                            let t = r.some(t=>_.includes(t))
                              , e = t && Object.keys(s).some(t=>_.includes(t));
                            t && !e && this.element.style.removeProperty("transform");
                            for (let t = 0, e = r.length; t < e; ++t) {
                                let e = r[t]
                                  , i = this.tweenProps[e]
                                  , s = i.isActive ? i.target : i.initialValue;
                                i.current = i.target = s,
                                !i.isActive && y.includes(e) && (this.element.style[e] = null)
                            }
                            for (let t = 0, e = n.length; t < e; ++t) {
                                let e = n[t];
                                e instanceof h && !e.preserveState && e._unapply()
                            }
                        }
                        , !0);
                    else
                        for (let t = 0, e = r.length; t < e; ++t) {
                            let e = this.tweenProps[r[t]];
                            e.current = e.target,
                            e.isActive = !1
                        }
            }
            onDOMRead(t) {
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.attributes[e];
                    this.tweenProps[i].previousValue = this.tweenProps[i].current;
                    let s = this.getNearestKeyframeForAttribute(i, t);
                    s && s.onDOMRead(i),
                    this.tweenProps[i].previousValue !== this.tweenProps[i].current && (this.needsWrite = !0)
                }
            }
            onDOMWrite() {
                (this.needsWrite || this.needsClassUpdate || this.needsStyleUpdate) && (this.needsWrite = !1,
                this.onDOMWriteImp(),
                this.handleEventDispatch())
            }
            onDOMWriteForObject() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t];
                    this.element[e] = this.tweenProps[e].current
                }
            }
            onDOMWriteForElement() {
                let t = this.element.style;
                this.handleStyleTransform();
                for (let e = 0, i = this.cssAttributes.length; e < i; e++)
                    this.cssAttributes[e].set(t);
                for (let t = 0, e = this.domAttributes.length; t < e; t++)
                    this.domAttributes[t].set(this.element);
                if (this.needsStyleUpdate) {
                    for (let t in this.tweenProps.targetStyles)
                        null !== this.tweenProps.targetStyles[t] && (this.element.style[t] = this.tweenProps.targetStyles[t]),
                        this.tweenProps.targetStyles[t] = null;
                    this.needsStyleUpdate = !1
                }
                this.needsClassUpdate && (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add),
                this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove),
                this.tweenProps.targetClasses.add.length = 0,
                this.tweenProps.targetClasses.remove.length = 0,
                this.needsClassUpdate = !1)
            }
            handleStyleTransform() {
                let t = this.tweenProps
                  , e = this.element.style;
                if (t.z.isActive || t.rotationX.isActive || t.rotationY.isActive) {
                    const i = this.mat4;
                    i[0] = 1,
                    i[1] = 0,
                    i[2] = 0,
                    i[3] = 0,
                    i[4] = 0,
                    i[5] = 1,
                    i[6] = 0,
                    i[7] = 0,
                    i[8] = 0,
                    i[9] = 0,
                    i[10] = 1,
                    i[11] = 0,
                    i[12] = 0,
                    i[13] = 0,
                    i[14] = 0,
                    i[15] = 1;
                    const s = t.x.current
                      , n = t.y.current
                      , r = t.z.current;
                    if (i[12] = i[0] * s + i[4] * n + i[8] * r + i[12],
                    i[13] = i[1] * s + i[5] * n + i[9] * r + i[13],
                    i[14] = i[2] * s + i[6] * n + i[10] * r + i[14],
                    i[15] = i[3] * s + i[7] * n + i[11] * r + i[15],
                    0 !== t.rotation.current || 0 !== t.rotationZ.current) {
                        const e = (t.rotation.current || t.rotationZ.current) * f;
                        v.rotateZ(i, i, e)
                    }
                    if (0 !== t.rotationX.current) {
                        const e = t.rotationX.current * f;
                        v.rotateX(i, i, e)
                    }
                    if (0 !== t.rotationY.current) {
                        const e = t.rotationY.current * f;
                        v.rotateY(i, i, e)
                    }
                    1 === t.scale.current && 1 === t.scaleX.current && 1 === t.scaleY.current || v.scale(i, i, [t.scale.current, t.scale.current, 1]),
                    e.transform = "matrix3d(" + i[0] + "," + i[1] + "," + i[2] + "," + i[3] + "," + i[4] + "," + i[5] + "," + i[6] + "," + i[7] + "," + i[8] + "," + i[9] + "," + i[10] + "," + i[11] + "," + i[12] + "," + i[13] + "," + i[14] + "," + i[15] + ")"
                } else if (t.x.isActive || t.y.isActive || t.rotation.isActive || t.rotationZ.isActive || t.scale.isActive || t.scaleX.isActive || t.scaleY.isActive) {
                    const i = this.mat2d;
                    i[0] = 1,
                    i[1] = 0,
                    i[2] = 0,
                    i[3] = 1,
                    i[4] = 0,
                    i[5] = 0;
                    const s = t.x.current
                      , n = t.y.current
                      , r = i[0]
                      , a = i[1]
                      , o = i[2]
                      , h = i[3]
                      , l = i[4]
                      , c = i[5];
                    if (i[0] = r,
                    i[1] = a,
                    i[2] = o,
                    i[3] = h,
                    i[4] = r * s + o * n + l,
                    i[5] = a * s + h * n + c,
                    0 !== t.rotation.current || 0 !== t.rotationZ.current) {
                        const e = (t.rotation.current || t.rotationZ.current) * f
                          , s = i[0]
                          , n = i[1]
                          , r = i[2]
                          , a = i[3]
                          , o = i[4]
                          , h = i[5]
                          , l = Math.sin(e)
                          , c = Math.cos(e);
                        i[0] = s * c + r * l,
                        i[1] = n * c + a * l,
                        i[2] = s * -l + r * c,
                        i[3] = n * -l + a * c,
                        i[4] = o,
                        i[5] = h
                    }
                    t.scaleX.isActive || t.scaleY.isActive ? (i[0] = i[0] * t.scaleX.current,
                    i[1] = i[1] * t.scaleX.current,
                    i[2] = i[2] * t.scaleY.current,
                    i[3] = i[3] * t.scaleY.current) : (i[0] = i[0] * t.scale.current,
                    i[1] = i[1] * t.scale.current,
                    i[2] = i[2] * t.scale.current,
                    i[3] = i[3] * t.scale.current),
                    e.transform = "matrix(" + i[0] + ", " + i[1] + ", " + i[2] + ", " + i[3] + ", " + i[4] + ", " + i[5] + ")"
                }
            }
            handleEventDispatch() {
                if (0 !== this.keyframesRequiringDispatch.length) {
                    for (let t = 0, e = this.keyframesRequiringDispatch.length; t < e; t++) {
                        let e = this.keyframesRequiringDispatch[t];
                        e.needsEventDispatch = !1,
                        this.eventObject.keyframe = e,
                        this.eventObject.pageMetrics = s.pageMetrics,
                        this.eventObject.event = e.event,
                        this.trigger(e.event, this.eventObject)
                    }
                    this.keyframesRequiringDispatch.length = 0
                }
                if (0 !== this._events.draw.length) {
                    this.eventObject.keyframe = null,
                    this.eventObject.event = "draw";
                    for (var t = this._events.draw.length - 1; t >= 0; t--)
                        this._events.draw[t](this.eventObject)
                }
            }
            updateAnimationConstraints() {
                for (let t = 0, e = this._activeKeyframes.length; t < e; t++)
                    this._activeKeyframes[t].evaluateConstraints();
                this.attributes.forEach(t=>{
                    1 !== this.keyframes[t].length && this.keyframes[t].sort(s.KeyframeComparison)
                }
                ),
                this.updateDeferredPropertyValues()
            }
            refreshMetrics() {
                let t = new Set([this.element]);
                this._allKeyframes.forEach(e=>e.anchors.forEach(e=>t.add(e))),
                this.group.metrics.refreshCollection(t),
                this.group.keyframesDirty = !0
            }
            updateDeferredPropertyValues() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t]
                      , i = this.keyframes[e];
                    if (!(i[0].keyframeType > s.KeyframeTypes.InterpolationForward))
                        for (let t = 0, s = i.length; t < s; t++) {
                            let n = i[t];
                            null === n.jsonProps[e][0] && (0 === t ? n.jsonProps[e][0] = n.animValues[e][0] = this.tweenProps[e].current : n.animValues[e][0] = i[t - 1].animValues[e][1]),
                            null === n.jsonProps[e][1] && (n.animValues[e][1] = t === s - 1 ? this.tweenProps[e].current : i[t + 1].animValues[e][0]),
                            n.snapAtCreation && (n.jsonProps[e][0] = n.animValues[e][0],
                            n.jsonProps[e][1] = n.animValues[e][1])
                        }
                }
            }
            getBounds(t) {
                this.boundsMin = Number.MAX_VALUE,
                this.boundsMax = -Number.MAX_VALUE;
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.keyframes[this.attributes[e]];
                    for (let e = 0; e < i.length; e++) {
                        let s = i[e];
                        this.boundsMin = Math.min(s.start, this.boundsMin),
                        this.boundsMax = Math.max(s.end, this.boundsMax),
                        t.min = Math.min(s.start, t.min),
                        t.max = Math.max(s.end, t.max)
                    }
                }
            }
            getNearestKeyframeForAttribute(t, e) {
                e = void 0 !== e ? e : this.group.position.local;
                let i = null
                  , s = Number.POSITIVE_INFINITY
                  , n = this.keyframes[t];
                if (void 0 === n)
                    return null;
                let r = n.length;
                if (0 === r)
                    return null;
                if (1 === r)
                    return n[0];
                for (let t = 0; t < r; t++) {
                    let r = n[t];
                    if (r.isInRange(e)) {
                        i = r;
                        break
                    }
                    let a = Math.min(Math.abs(e - r.start), Math.abs(e - r.end));
                    a < s && (s = a,
                    i = r)
                }
                return i
            }
            getAllKeyframesForAttribute(t) {
                return this.keyframes[t]
            }
            updateKeyframe(t, e) {
                t.parseOptions(e),
                t.evaluateConstraints(),
                this.group.keyframesDirty = !0,
                p.update(()=>{
                    this.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t),
                    this.group.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t)
                }
                , !0)
            }
            removeKeyframe(t) {
                return t.controller !== this ? Promise.resolve(null) : (t.markedForRemoval = !0,
                this.group.keyframesDirty = !0,
                new Promise(e=>{
                    this.group.rafEmitter.executor.eventEmitter.once("before:draw", ()=>{
                        e(t),
                        t.destroy();
                        let i = this._allKeyframes.indexOf(t);
                        -1 !== i && this._allKeyframes.splice(i, 1)
                    }
                    )
                }
                ))
            }
            updateAnimation(t, e) {
                return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"),
                this.updateKeyframe(t, e)
            }
        }
    }
    , {
        160: 160,
        161: 161,
        162: 162,
        163: 163,
        164: 164,
        21: 21,
        41: 41,
        42: 42,
        45: 45,
        55: 55,
        56: 56,
        59: 59,
        60: 60,
        61: 61,
        64: 64,
        65: 65,
        68: 68,
        70: 70,
        78: 78,
        94: 94
    }],
    58: [function(t, e, i) {
        "use strict";
        const s = t(55)
          , n = t(60)
          , r = t(68);
        class a extends s {
            constructor(t, e) {
                super(t, e),
                this.keyframeType = n.KeyframeTypes.Event,
                this.isApplied = !1,
                this.hasDuration = !1,
                this.isCurrentlyInRange = !1
            }
            parseOptions(t) {
                t.x = void 0,
                t.y = void 0,
                t.scale = void 0,
                t.scaleX = void 0,
                t.scaleY = void 0,
                t.rotation = void 0,
                t.style = void 0,
                t.cssClass = void 0,
                t.rotation = void 0,
                t.opacity = void 0,
                t.hold = void 0,
                this.event = t.event,
                this.animValues[this.event] = [0, 0],
                void 0 === this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new r(0,1,!1)),
                super.parseOptions(t),
                this.keyframeType = n.KeyframeTypes.Event
            }
            updateLocalProgress(t) {
                if (this.hasDuration) {
                    let e = this.isCurrentlyInRange
                      , i = t >= this.start && t <= this.end;
                    if (e === i)
                        return;
                    return this.isCurrentlyInRange = i,
                    void (i && !e ? this._trigger(this.event + ":enter") : e && !i && this._trigger(this.event + ":exit"))
                }
                !this.isApplied && t >= this.start ? (this.isApplied = !0,
                this._trigger(this.event)) : this.isApplied && t < this.start && (this.isApplied = !1,
                this._trigger(this.event + ":reverse"))
            }
            _trigger(t) {
                this.controller.eventObject.event = t,
                this.controller.eventObject.keyframe = this,
                this.controller.trigger(t, this.controller.eventObject)
            }
            evaluateConstraints() {
                super.evaluateConstraints(),
                this.hasDuration = this.start !== this.end
            }
            reset(t) {
                this.isApplied = !1,
                this.isCurrentlyInRange = !1,
                super.reset(t)
            }
            onDOMRead(t) {}
            reconcile(t) {}
            evaluateInterpolationConstraints() {}
        }
        a.DATA_ATTRIBUTE = "data-anim-event",
        e.exports = a
    }
    , {
        55: 55,
        60: 60,
        68: 68
    }],
    59: [function(t, e, i) {
        "use strict";
        const s = t(69);
        e.exports = class {
            constructor(t, e, i=!1) {
                this.isGroup = i,
                this.group = t,
                this.controller = e,
                this.controllers = [],
                this.tweenProps = new s
            }
        }
    }
    , {
        69: 69
    }],
    60: [function(t, e, i) {
        "use strict";
        const s = {
            GUI_INSTANCE: null,
            ANIM_INSTANCE: null,
            VIEWPORT_EMITTER_ELEMENT: void 0,
            LOCAL_STORAGE_KEYS: {
                GuiPosition: "anim-ui.position",
                GroupCollapsedStates: "anim-ui.group-collapsed-states",
                scrollY: "anim-ui.scrollY-position",
                path: "anim-ui.path"
            },
            RESIZE_TIMEOUT: -1,
            BREAKPOINTS: [{
                name: "S",
                mediaQuery: "only screen and (max-width: 734px)"
            }, {
                name: "M",
                mediaQuery: "only screen and (max-width: 1068px)"
            }, {
                name: "L",
                mediaQuery: "only screen and (min-width: 1069px)"
            }],
            getBreakpoint: function() {
                for (let t = 0; t < s.BREAKPOINTS.length; t++) {
                    let e = s.BREAKPOINTS[t];
                    if (window.matchMedia(e.mediaQuery).matches)
                        return e.name
                }
            },
            KeyframeDefaults: {
                ease: 1,
                epsilon: .05,
                preserveState: !1,
                easeFunctionString: "linear",
                easeFunction: "linear",
                hold: !1,
                snapAtCreation: !1,
                toggle: !1,
                breakpointMask: "SMLX",
                event: "",
                disabledWhen: [],
                cssClass: ""
            },
            KeyframeTypes: {
                Interpolation: 0,
                InterpolationForward: 1,
                CSSClass: 2,
                Event: 3
            },
            EVENTS: {
                ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
                ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
                ON_GROUP_CREATED: "ON_GROUP_CREATED",
                ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
                ON_TIMELINE_START: "ON_TIMELINE_START",
                ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
                ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE",
                ON_CHAPTER_INITIATED: "ON_CHAPTER_INITIATED",
                ON_CHAPTER_OCCURRED: "ON_CHAPTER_OCCURRED",
                ON_CHAPTER_COMPLETED: "ON_CHAPTER_COMPLETED"
            },
            PageEvents: {
                ON_SCROLL: "ON_SCROLL",
                ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
                ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
                ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE"
            },
            KeyframeJSONReservedWords: ["event", "cssClass", "style", "anchors", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
            TweenProps: t(69),
            TargetValue: t(68),
            CSSTargetValue: t(61),
            pageMetrics: new function() {
                this.scrollX = 0,
                this.scrollY = 0,
                this.windowWidth = 0,
                this.windowHeight = 0,
                this.documentOffsetX = 0,
                this.documentOffsetY = 0,
                this.previousBreakpoint = "",
                this.breakpoint = ""
            }
            ,
            KeyframeComparison: function(t, e) {
                return t.start < e.start ? -1 : t.start > e.start ? 1 : 0
            }
        };
        e.exports = s
    }
    , {
        61: 61,
        68: 68,
        69: 69
    }],
    61: [function(t, e, i) {
        "use strict";
        const s = t(68);
        e.exports = class extends s {
            constructor(t, e, i, s, n=!1, r) {
                super(t, e, i),
                this.key = s,
                this.round = n,
                this.suffix = r
            }
            set(t) {
                let e = this.current;
                this.round && (e = Math.round(e)),
                this.suffix && (e += this.suffix),
                t[this.key] = e
            }
        }
    }
    , {
        68: 68
    }],
    62: [function(t, e, i) {
        "use strict";
        e.exports = new class {
            constructor() {
                this.linear = function(t) {
                    return t
                }
                ,
                this.easeInQuad = function(t) {
                    return t * t
                }
                ,
                this.easeOutQuad = function(t) {
                    return t * (2 - t)
                }
                ,
                this.easeInOutQuad = function(t) {
                    return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
                }
                ,
                this.easeInSin = function(t) {
                    return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2)
                }
                ,
                this.easeOutSin = function(t) {
                    return Math.sin(Math.PI / 2 * t)
                }
                ,
                this.easeInOutSin = function(t) {
                    return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
                }
                ,
                this.easeInElastic = function(t) {
                    return 0 === t ? t : (.04 - .04 / t) * Math.sin(25 * t) + 1
                }
                ,
                this.easeOutElastic = function(t) {
                    return .04 * t / --t * Math.sin(25 * t)
                }
                ,
                this.easeInOutElastic = function(t) {
                    return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1
                }
                ,
                this.easeOutBack = function(t) {
                    return (t -= 1) * t * (2.70158 * t + 1.70158) + 1
                }
                ,
                this.easeInCubic = function(t) {
                    return t * t * t
                }
                ,
                this.easeOutCubic = function(t) {
                    return --t * t * t + 1
                }
                ,
                this.easeInOutCubic = function(t) {
                    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                }
                ,
                this.easeInQuart = function(t) {
                    return t * t * t * t
                }
                ,
                this.easeOutQuart = function(t) {
                    return 1 - --t * t * t * t
                }
                ,
                this.easeInOutQuart = function(t) {
                    return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
                }
                ,
                this.easeInQuint = function(t) {
                    return t * t * t * t * t
                }
                ,
                this.easeOutQuint = function(t) {
                    return 1 + --t * t * t * t * t
                }
                ,
                this.easeInOutQuint = function(t) {
                    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
                }
            }
        }
    }
    , {}],
    63: [function(t, e, i) {
        "use strict";
        const s = t(60)
          , n = (t,e)=>null == t ? e : t;
        class r {
            constructor(t) {
                this.top = 0,
                this.bottom = 0,
                this.left = 0,
                this.right = 0,
                this.height = 0,
                this.width = 0
            }
            toString() {
                return "top:".concat(this.top, ", bottom:").concat(this.bottom, ", left:").concat(this.left, ", right:").concat(this.right, ", height:").concat(this.height, ", width:").concat(this.width)
            }
            toObject() {
                return {
                    top: this.top,
                    bottom: this.bottom,
                    left: this.left,
                    right: this.right,
                    height: this.height,
                    width: this.width
                }
            }
        }
        e.exports = class {
            constructor() {
                this.clear()
            }
            clear() {
                this._metrics = new WeakMap
            }
            destroy() {
                this._metrics = null
            }
            add(t) {
                let e = this._metrics.get(t);
                if (e)
                    return e;
                let i = new r(t);
                return this._metrics.set(t, i),
                this._refreshMetrics(t, i)
            }
            get(t) {
                return this._metrics.get(t)
            }
            refreshCollection(t) {
                t.forEach(t=>this._refreshMetrics(t, null))
            }
            refreshMetrics(t) {
                return this._refreshMetrics(t)
            }
            _refreshMetrics(t, e) {
                if (e = e || this._metrics.get(t),
                !(t instanceof Element))
                    return e.width = n(t.width, 0),
                    e.height = n(t.height, 0),
                    e.top = n(t.top, n(t.y, 0)),
                    e.left = n(t.left, n(t.x, 0)),
                    e.right = e.left + e.width,
                    e.bottom = e.top + e.height,
                    e;
                if (void 0 === t.offsetWidth) {
                    let i = t.getBoundingClientRect();
                    return e.width = i.width,
                    e.height = i.height,
                    e.top = s.pageMetrics.scrollY + i.top,
                    e.left = s.pageMetrics.scrollX + i.left,
                    e.right = e.left + e.width,
                    e.bottom = e.top + e.height,
                    e
                }
                e.width = t.offsetWidth,
                e.height = t.offsetHeight,
                e.top = s.pageMetrics.documentOffsetY,
                e.left = s.pageMetrics.documentOffsetX;
                let i = t;
                for (; i; )
                    e.top += i.offsetTop,
                    e.left += i.offsetLeft,
                    i = i.offsetParent;
                return e.right = e.left + e.width,
                e.bottom = e.top + e.height,
                e
            }
        }
    }
    , {
        60: 60
    }],
    64: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t) {
                this.controller = t,
                this.element = this.controller.element,
                this.keyframe = null,
                this.event = "",
                this.tweenProps = this.controller.tweenProps
            }
        }
    }
    , {}],
    65: [function(t, e, i) {
        "use strict";
        const s = t(60)
          , n = t(55)
          , r = t(58)
          , a = t(56)
          , o = function(t) {
            for (let e in t) {
                let i = t[e];
                if (-1 === s.KeyframeJSONReservedWords.indexOf(e) && Array.isArray(i))
                    return !0
            }
            return !1
        };
        e.exports = function(t) {
            if (void 0 !== t.cssClass || void 0 !== t.style) {
                if (o(t))
                    throw "CSS Keyframes cannot tween values, please use multiple keyframes instead";
                return a
            }
            if (o(t))
                return n;
            if (t.event)
                return r;
            throw delete t.anchors,
            "Could not determine tween type based on ".concat(JSON.stringify(t))
        }
    }
    , {
        55: 55,
        56: 56,
        58: 58,
        60: 60
    }],
    66: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor() {
                this.local = 0,
                this.localUnclamped = 0,
                this.lastPosition = 0
            }
        }
    }
    , {}],
    67: [function(t, e, i) {
        "use strict";
        const {map: s} = t(153)
          , n = {};
        class r {
            constructor(t, e, i, s) {
                this.mass = t,
                this.stiffness = e,
                this.damping = i,
                this.initialVelocity = s,
                this.m_w0 = Math.sqrt(this.stiffness / this.mass),
                this.m_zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass)),
                this.m_zeta < 1 ? (this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta),
                this.m_A = 1,
                this.m_B = (this.m_zeta * this.m_w0 - this.initialVelocity) / this.m_wd) : (this.m_wd = 0,
                this.m_A = 1,
                this.m_B = -this.initialVelocity + this.m_w0)
            }
            solve(t) {
                return 1 - (t = this.m_zeta < 1 ? Math.exp(-t * this.m_zeta * this.m_w0) * (this.m_A * Math.cos(this.m_wd * t) + this.m_B * Math.sin(this.m_wd * t)) : (this.m_A + this.m_B * t) * Math.exp(-t * this.m_w0))
            }
        }
        const a = /\d*\.?\d+/g;
        r.fromCSSString = function(t) {
            let e = t.match(a);
            if (4 !== e.length)
                throw "SpringEasing could not convert ".concat(cssString, " to spring params");
            let i = e.map(Number)
              , o = new r(...i);
            const h = o.solve.bind(o);
            let l = 0;
            let c = function() {
                if (n[t])
                    return n[t];
                let e, i = 0;
                for (; ; ) {
                    l += 1 / 6;
                    if (1 === h(l)) {
                        if (i++,
                        i >= 16) {
                            e = l * (1 / 6);
                            break
                        }
                    } else
                        i = 0
                }
                return n[t] = e,
                n[t]
            }();
            return function(t) {
                return 0 === t || 1 === t ? t : h(s(t, 0, 1, 0, c))
            }
        }
        ,
        e.exports = r
    }
    , {
        153: 153
    }],
    68: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t, e, i) {
                this.epsilon = parseFloat(e),
                this.snapAtCreation = i,
                this.initialValue = t,
                this.target = t,
                this.current = t,
                this.previousValue = t,
                this.isActive = !1
            }
        }
    }
    , {}],
    69: [function(t, e, i) {
        "use strict";
        e.exports = class {
        }
    }
    , {}],
    70: [function(t, e, i) {
        "use strict";
        e.exports = ()=>Math.random().toString(16).slice(-4)
    }
    , {}],
    71: [function(t, e, i) {
        "use strict";
        const s = Math.abs;
        class n {
            constructor(t, e, i, s) {
                this.cp = new Float32Array(6),
                this.cp[0] = 3 * t,
                this.cp[1] = 3 * (i - t) - this.cp[0],
                this.cp[2] = 1 - this.cp[0] - this.cp[1],
                this.cp[3] = 3 * e,
                this.cp[4] = 3 * (s - e) - this.cp[3],
                this.cp[5] = 1 - this.cp[3] - this.cp[4]
            }
            sampleCurveX(t) {
                return ((this.cp[2] * t + this.cp[1]) * t + this.cp[0]) * t
            }
            sampleCurveY(t) {
                return ((this.cp[5] * t + this.cp[4]) * t + this.cp[3]) * t
            }
            sampleCurveDerivativeX(t) {
                return (3 * this.cp[2] * t + 2 * this.cp[1]) * t + this.cp[0]
            }
            solveCurveX(t) {
                var e, i, n, r, a, o;
                for (n = t,
                o = 0; o < 5; o++) {
                    if (r = this.sampleCurveX(n) - t,
                    s(r) < 1e-5)
                        return n;
                    if (a = this.sampleCurveDerivativeX(n),
                    s(a) < 1e-5)
                        break;
                    n -= r / a
                }
                if ((n = t) < (e = 0))
                    return e;
                if (n > (i = 1))
                    return i;
                for (; e < i; ) {
                    if (r = this.sampleCurveX(n),
                    s(r - t) < 1e-5)
                        return n;
                    t > r ? e = n : i = n,
                    n = .5 * (i - e) + e
                }
                return n
            }
            solve(t) {
                return this.sampleCurveY(this.solveCurveX(t))
            }
        }
        const r = /\d*\.?\d+/g;
        n.fromCSSString = function(t) {
            let e = t.match(r);
            if (4 !== e.length)
                throw "UnitBezier could not convert ".concat(t, " to cubic-bezier");
            let i = e.map(Number)
              , s = new n(i[0],i[1],i[2],i[3]);
            return s.solve.bind(s)
        }
        ,
        e.exports = n
    }
    , {}],
    72: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t, e) {
                this.a = t.top - e,
                this.a < 0 && (this.a = t.top),
                this.b = t.top,
                this.d = t.bottom,
                this.c = Math.max(this.d - e, this.b)
            }
        }
    }
    , {}],
    73: [function(t, e, i) {
        "use strict";
        const s = t(74)
          , n = new (t(63));
        class r {
            constructor(t) {
                this.group = t,
                this.data = {
                    target: null,
                    anchors: null,
                    metrics: this.group.metrics
                }
            }
            parseArray(t, e) {
                return [this.parseExpression(t, e[0]), this.parseExpression(t, e[1])]
            }
            parseExpression(t, e) {
                if (!e)
                    return null;
                if ("number" == typeof e)
                    return e;
                if ("string" != typeof e)
                    throw "Expression must be a string, received ".concat(typeof e, ": ").concat(e);
                return this.data.target = t.controller.element,
                this.data.anchors = t.anchors,
                this.data.keyframe = t.keyframe,
                r._parse(e, this.data)
            }
            parseTimeValue(t, e) {
                if ("number" == typeof e)
                    return e;
                let i = this.group.expressionParser.parseExpression(t, e);
                return this.group.convertScrollPositionToTValue(i)
            }
            destroy() {
                this.group = null
            }
            static parse(t, e) {
                return (e = e || {}) && (n.clear(),
                e.target && n.add(e.target),
                e.anchors && e.anchors.forEach(t=>n.add(t))),
                e.metrics = n,
                r._parse(t, e)
            }
            static _parse(t, e) {
                return s.Parse(t).execute(e)
            }
        }
        r.programs = s.programs,
        "undefined" != typeof window && (window.ExpressionParser = r),
        e.exports = r
    }
    , {
        63: 63,
        74: 74
    }],
    74: [function(t, e, i) {
        "use strict";
        const s = t(60)
          , n = t(153)
          , r = {}
          , a = {
            smoothstep: (t,e,i)=>(i = a.clamp((i - t) / (e - t), 0, 1)) * i * (3 - 2 * i),
            deg: t=>180 * t / Math.PI,
            rad: t=>t * Math.PI / 180,
            random: (t,e)=>Math.random() * (e - t) + t,
            atan: Math.atan2
        };
        Object.getOwnPropertyNames(Math).forEach(t=>a[t] ? null : a[t.toLowerCase()] = Math[t]),
        Object.getOwnPropertyNames(n).forEach(t=>a[t] ? null : a[t.toLowerCase()] = n[t]);
        let o = null;
        const h = "a"
          , l = "ALPHA"
          , c = "("
          , u = ")"
          , d = "PLUS"
          , m = "MINUS"
          , p = "MUL"
          , f = "DIV"
          , _ = "INTEGER_CONST"
          , y = "FLOAT_CONST"
          , g = ","
          , v = "EOF"
          , E = {
            NUMBERS: /\d|\d\.\d/,
            DIGIT: /\d/,
            OPERATOR: /[-+*/]/,
            PAREN: /[()]/,
            WHITE_SPACE: /\s/,
            ALPHA: /[a-zA-Z]|%/,
            ALPHANUMERIC: /[a-zA-Z0-9]/,
            OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
            GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
            ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw)$/,
            MATH_FUNCTION: new RegExp("\\b(".concat(Object.keys(a).join("|"), ")\\b"),"i")
        }
          , b = function(t, e, i, s="") {
            let n = e.slice(Math.max(i, 0), Math.min(e.length, i + 3))
              , r = new Error("Expression Error. ".concat(t, ' in expression "').concat(e, '", near "').concat(n, '"'));
            throw console.error(r.message, o ? o.keyframe || o.target : ""),
            r
        }
          , w = {
            round: 1,
            clamp: 3,
            lerp: 3,
            random: 2,
            atan: 2,
            floor: 1,
            ceil: 1,
            abs: 1,
            cos: 1,
            sin: 1,
            smoothstep: 3,
            rad: 1,
            deg: 1,
            pow: 2,
            calc: 1
        };
        class x {
            constructor(t, e) {
                this.type = t,
                this.value = e
            }
        }
        x.ONE = new x("100",100),
        x.EOF = new x(v,null);
        class I {
            constructor(t) {
                this.type = t
            }
        }
        class A extends I {
            constructor(t, e) {
                super("UnaryOp"),
                this.token = this.op = t,
                this.expr = e
            }
        }
        class T extends I {
            constructor(t, e, i) {
                super("BinOp"),
                this.left = t,
                this.op = e,
                this.right = i
            }
        }
        class C extends I {
            constructor(t, e) {
                if (super("MathOp"),
                this.op = t,
                this.list = e,
                w[t.value] && e.length !== w[t.value])
                    throw new Error("Incorrect number of arguments for '".concat(t.value, "'. Received ").concat(e.length, ", expected ").concat(w[t.value]))
            }
        }
        class S extends I {
            constructor(t) {
                super("Num"),
                this.token = t,
                this.value = t.value
            }
        }
        class O extends I {
            constructor(t, e, i) {
                super("RefValue"),
                this.num = t,
                this.ref = e,
                this.unit = i
            }
        }
        class P extends I {
            constructor(t, e) {
                super("CSSValue"),
                this.ref = t,
                this.propertyName = e
            }
        }
        class D extends I {
            constructor(t, e) {
                super("PropValue"),
                this.ref = t,
                this.propertyName = e
            }
        }
        class M {
            constructor(t) {
                let e;
                for (this.text = t,
                this.pos = 0,
                this.char = this.text[this.pos],
                this.tokens = []; (e = this.getNextToken()) && e !== x.EOF; )
                    this.tokens.push(e);
                this.tokens.push(e)
            }
            advance() {
                this.char = this.text[++this.pos]
            }
            skipWhiteSpace() {
                for (; null != this.char && E.WHITE_SPACE.test(this.char); )
                    this.advance()
            }
            name() {
                let t = "";
                for (; null != this.char && E.ALPHA.test(this.char); )
                    t += this.char,
                    this.advance();
                return new x(l,t)
            }
            number() {
                let t = "";
                for ("." === this.char && (t += this.char,
                this.advance()); null != this.char && E.DIGIT.test(this.char); )
                    t += this.char,
                    this.advance();
                if (null != this.char && "." === this.char)
                    for (t.includes(".") && b("Number appears to contain 2 decimal points", this.text, this.pos),
                    t += this.char,
                    this.advance(); null != this.char && E.DIGIT.test(this.char); )
                        t += this.char,
                        this.advance();
                return "." === t && b("Attempted to parse a number, but found only a decimal point", this.text, this.pos),
                t.includes(".") ? new x(y,parseFloat(t)) : new x(_,parseInt(t))
            }
            getNextToken() {
                for (; null != this.char; )
                    if (E.WHITE_SPACE.test(this.char))
                        this.skipWhiteSpace();
                    else {
                        if ("." === this.char || E.DIGIT.test(this.char))
                            return this.number();
                        if ("," === this.char)
                            return this.advance(),
                            new x(g,",");
                        if (E.OPERATOR.test(this.char)) {
                            let t = ""
                              , e = this.char;
                            switch (e) {
                            case "+":
                                t = d;
                                break;
                            case "-":
                                t = m;
                                break;
                            case "*":
                                t = p;
                                break;
                            case "/":
                                t = f
                            }
                            return this.advance(),
                            new x(t,e)
                        }
                        if (E.PAREN.test(this.char)) {
                            let t = ""
                              , e = this.char;
                            switch (e) {
                            case "(":
                                t = c;
                                break;
                            case ")":
                                t = u
                            }
                            return this.advance(),
                            new x(t,e)
                        }
                        if (E.ALPHA.test(this.char))
                            return this.name();
                        b('Unexpected character "'.concat(this.char, '"'), this.text, this.pos)
                    }
                return x.EOF
            }
        }
        class R {
            constructor(t) {
                this.lexer = t,
                this.pos = 0
            }
            get currentToken() {
                return this.lexer.tokens[this.pos]
            }
            error(t, e="") {
                b(t, e, this.lexer.text, this.pos)
            }
            consume(t) {
                let e = this.currentToken;
                return e.type === t ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(t)),
                e
            }
            consumeList(t) {
                t.includes(this.currentToken) ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(tokenType))
            }
            expr() {
                let t = this.term();
                for (; this.currentToken.type === d || this.currentToken.type === m; ) {
                    const e = this.currentToken;
                    switch (e.value) {
                    case "+":
                        this.consume(d);
                        break;
                    case "-":
                        this.consume(m)
                    }
                    t = new T(t,e,this.term())
                }
                return t
            }
            term() {
                let t = this.factor();
                for (; this.currentToken.type === p || this.currentToken.type === f; ) {
                    const e = this.currentToken;
                    switch (e.value) {
                    case "*":
                        this.consume(p);
                        break;
                    case "/":
                        this.consume(f)
                    }
                    t = new T(t,e,this.factor())
                }
                return t
            }
            factor() {
                if (this.currentToken.type === d)
                    return new A(this.consume(d),this.factor());
                if (this.currentToken.type === m)
                    return new A(this.consume(m),this.factor());
                if (this.currentToken.type === _ || this.currentToken.type === y) {
                    let t = new S(this.currentToken);
                    if (this.pos += 1,
                    E.OPERATOR.test(this.currentToken.value) || this.currentToken.type === u || this.currentToken.type === g || this.currentToken.type === v)
                        return t;
                    if (this.currentToken.type === l && this.currentToken.value === h)
                        return this.consume(l),
                        new O(t,this.anchorIndex(),this.unit(E.ANY_UNIT));
                    if (this.currentToken.type === l)
                        return "%a" === this.currentToken.value && this.error("%a is invalid, try removing the %"),
                        new O(t,null,this.unit());
                    this.error("Expected a scaling unit type", "Such as 'h' / 'w'")
                } else {
                    if (E.OBJECT_UNIT.test(this.currentToken.value))
                        return new O(new S(x.ONE),null,this.unit());
                    if (this.currentToken.value === h) {
                        this.consume(l);
                        const t = this.anchorIndex();
                        if (E.OBJECT_UNIT.test(this.currentToken.value))
                            return new O(new S(x.ONE),t,this.unit())
                    } else if (this.currentToken.type === l) {
                        if ("calc" === this.currentToken.value)
                            return this.consume(l),
                            this.expr();
                        if ("css" === this.currentToken.value || "var" === this.currentToken.value || "prop" === this.currentToken.value) {
                            const t = "prop" !== this.currentToken.value ? P : D;
                            this.consume(l),
                            this.consume(c);
                            const e = this.propertyName();
                            let i = null;
                            return this.currentToken.type === g && (this.consume(g),
                            this.consume(l),
                            i = this.anchorIndex()),
                            this.consume(u),
                            new t(i,e)
                        }
                        if (E.MATH_FUNCTION.test(this.currentToken.value)) {
                            const t = this.currentToken.value.toLowerCase();
                            if ("number" == typeof a[t])
                                return this.consume(l),
                                new S(new x(l,a[t]));
                            const e = x[t] || new x(t,t)
                              , i = [];
                            this.consume(l),
                            this.consume(c);
                            let s = null;
                            do {
                                this.currentToken.value === g && this.consume(g),
                                s = this.expr(),
                                i.push(s)
                            } while (this.currentToken.value === g);return this.consume(u),
                            new C(e,i)
                        }
                    } else if (this.currentToken.type === c) {
                        this.consume(c);
                        let t = this.expr();
                        return this.consume(u),
                        t
                    }
                }
                this.error("Unexpected token ".concat(this.currentToken.value))
            }
            propertyName() {
                let t = "";
                for (; this.currentToken.type === l || this.currentToken.type === m; )
                    t += this.currentToken.value,
                    this.pos += 1;
                return t
            }
            unit(t=E.ANY_UNIT) {
                const e = this.currentToken;
                if (e.type === l && t.test(e.value))
                    return this.consume(l),
                    new x(l,e.value = e.value.replace(/%(h|w)/, "$1").replace("%", "h"));
                this.error("Expected unit type")
            }
            anchorIndex() {
                const t = this.currentToken;
                if (t.type === _)
                    return this.consume(_),
                    new S(t);
                this.error("Invalid anchor reference", ". Should be something like a0, a1, a2")
            }
            parse() {
                const t = this.expr();
                return this.currentToken !== x.EOF && this.error("Unexpected token ".concat(this.currentToken.value)),
                t
            }
        }
        class k {
            constructor(t) {
                this.parser = t,
                this.root = t.parse()
            }
            visit(t) {
                let e = this[t.type];
                if (!e)
                    throw new Error("No visit method named, ".concat(e));
                return e.call(this, t)
            }
            BinOp(t) {
                switch (t.op.type) {
                case d:
                    return this.visit(t.left) + this.visit(t.right);
                case m:
                    return this.visit(t.left) - this.visit(t.right);
                case p:
                    return this.visit(t.left) * this.visit(t.right);
                case f:
                    return this.visit(t.left) / this.visit(t.right)
                }
            }
            RefValue(t) {
                let e = this.unwrapReference(t)
                  , i = t.unit.value
                  , n = t.num.value;
                const r = o.metrics.get(e);
                switch (i) {
                case "h":
                    return .01 * n * r.height;
                case "t":
                    return .01 * n * r.top;
                case "vh":
                    return .01 * n * s.pageMetrics.windowHeight;
                case "vw":
                    return .01 * n * s.pageMetrics.windowWidth;
                case "px":
                    return n;
                case "w":
                    return .01 * n * r.width;
                case "b":
                    return .01 * n * r.bottom;
                case "l":
                    return .01 * n * r.left;
                case "r":
                    return .01 * n * r.right
                }
            }
            PropValue(t) {
                return (null === t.ref ? o.target : o.anchors[t.ref.value])[t.propertyName]
            }
            CSSValue(t) {
                let e = this.unwrapReference(t);
                const i = getComputedStyle(e).getPropertyValue(t.propertyName);
                return "" === i ? 0 : k.Parse(i).execute(o)
            }
            Num(t) {
                return t.value
            }
            UnaryOp(t) {
                return t.op.type === d ? +this.visit(t.expr) : t.op.type === m ? -this.visit(t.expr) : void 0
            }
            MathOp(t) {
                let e = t.list.map(t=>this.visit(t));
                return a[t.op.value].apply(null, e)
            }
            unwrapReference(t) {
                return null === t.ref ? o.target : (t.ref.value >= o.anchors.length && console.error("Not enough anchors supplied for expression ".concat(this.parser.lexer.text), o.target),
                o.anchors[t.ref.value])
            }
            execute(t) {
                return o = t,
                this.visit(this.root)
            }
            static Parse(t) {
                return r[t] || (r[t] = new k(new R(new M(t))))
            }
        }
        k.programs = r,
        e.exports = k
    }
    , {
        153: 153,
        60: 60
    }],
    75: [function(t, e, i) {
        "use strict";
        const s = t(21).EventEmitterMicro
          , n = t(153)
          , r = t(78)
          , a = t(60)
          , o = t(59)
          , h = t(66)
          , l = t(72)
          , c = t(63)
          , u = t(73)
          , d = t(57)
          , m = {};
        "undefined" != typeof window && (m.create = t(34),
        m.update = t(45),
        m.draw = t(41));
        let p = 0;
        e.exports = class extends s {
            constructor(t, e) {
                super(),
                this.anim = e,
                this.element = t,
                this.name = this.name || t.getAttribute("data-anim-scroll-group"),
                this.isEnabled = !0,
                this.position = new h,
                this.metrics = new c,
                this.metrics.add(this.element),
                this.expressionParser = new u(this),
                this.boundsMin = 0,
                this.boundsMax = 0,
                this.timelineUpdateRequired = !1,
                this._keyframesDirty = !1,
                this.viewableRange = this.createViewableRange(),
                this.defaultEase = a.KeyframeDefaults.ease,
                this.keyframeControllers = [],
                this.updateProgress(this.getPosition()),
                this.onDOMRead = this.onDOMRead.bind(this),
                this.onDOMWrite = this.onDOMWrite.bind(this),
                this.gui = null,
                this.finalizeInit()
            }
            finalizeInit() {
                this.element._animInfo = new o(this,null,!0),
                this.setupRAFEmitter()
            }
            destroy() {
                this.destroyed = !0,
                this.expressionParser.destroy(),
                this.expressionParser = null;
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].destroy();
                this.keyframeControllers = null,
                this.position = null,
                this.viewableRange = null,
                this.gui && (this.gui.destroy(),
                this.gui = null),
                this.metrics.destroy(),
                this.metrics = null,
                this.rafEmitter.destroy(),
                this.rafEmitter = null,
                this.anim = null,
                this.element._animInfo && this.element._animInfo.group === this && (this.element._animInfo.group = null,
                this.element._animInfo = null),
                this.element = null,
                this.isEnabled = !1,
                super.destroy()
            }
            removeKeyframeController(t) {
                return this.keyframeControllers.includes(t) ? (t._allKeyframes.forEach(t=>t.markedForRemoval = !0),
                this.keyframesDirty = !0,
                new Promise(e=>{
                    m.draw(()=>{
                        const i = this.keyframeControllers.indexOf(t);
                        -1 !== i ? (this.keyframeControllers.splice(i, 1),
                        t.onDOMWrite(),
                        t.destroy(),
                        this.gui && this.gui.create(),
                        e()) : e()
                    }
                    )
                }
                )) : Promise.resolve()
            }
            remove() {
                return this.anim.removeGroup(this)
            }
            clear() {
                return Promise.all(this.keyframeControllers.map(t=>this.removeKeyframeController(t)))
            }
            setupRAFEmitter(t) {
                this.rafEmitter && this.rafEmitter.destroy(),
                this.rafEmitter = t || new m.create,
                this.rafEmitter.on("update", this.onDOMRead),
                this.rafEmitter.on("draw", this.onDOMWrite),
                this.rafEmitter.once("external", ()=>this.reconcile())
            }
            requestDOMChange() {
                return !!this.isEnabled && this.rafEmitter.run()
            }
            onDOMRead() {
                this.keyframesDirty && this.onKeyframesDirty();
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].onDOMRead(this.position.local)
            }
            onDOMWrite() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].onDOMWrite();
                this.needsUpdate() && this.requestDOMChange()
            }
            needsUpdate() {
                if (this._keyframesDirty)
                    return !0;
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    if (this.keyframeControllers[t].needsUpdate())
                        return !0;
                return !1
            }
            addKeyframe(t, e) {
                let i = this.getControllerForTarget(t);
                return null === i && (i = new d(this,t),
                this.keyframeControllers.push(i)),
                this.keyframesDirty = !0,
                i.addKeyframe(e)
            }
            addEvent(t, e) {
                e.event = e.event || "Generic-Event-Name-" + p++;
                let i = void 0 !== e.end && e.end !== e.start;
                const s = this.addKeyframe(t, e);
                return i ? (e.onEnterOnce && s.controller.once(e.event + ":enter", e.onEnterOnce),
                e.onExitOnce && s.controller.once(e.event + ":exit", e.onExitOnce),
                e.onEnter && s.controller.on(e.event + ":enter", e.onEnter),
                e.onExit && s.controller.on(e.event + ":exit", e.onExit)) : (e.onEventOnce && s.controller.once(e.event, e.onEventOnce),
                e.onEventReverseOnce && s.controller.once(e.event + ":reverse", e.onEventReverseOnce),
                e.onEvent && s.controller.on(e.event, e.onEvent),
                e.onEventReverse && s.controller.on(e.event + ":reverse", e.onEventReverse)),
                s
            }
            forceUpdate({waitForNextUpdate: t=!0, silent: e=!1}={}) {
                this.isEnabled && (this.refreshMetrics(),
                this.timelineUpdateRequired = !0,
                t ? this.keyframesDirty = !0 : this.onKeyframesDirty({
                    silent: e
                }))
            }
            onKeyframesDirty({silent: t=!1}={}) {
                this.determineActiveKeyframes(),
                this.keyframesDirty = !1,
                this.metrics.refreshMetrics(this.element),
                this.viewableRange = this.createViewableRange();
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].updateAnimationConstraints();
                this.updateBounds(),
                this.updateProgress(this.getPosition()),
                t || this.updateTimeline(),
                this.gui && this.gui.create()
            }
            refreshMetrics() {
                let t = new Set([this.element]);
                this.keyframeControllers.forEach(e=>{
                    t.add(e.element),
                    e._allKeyframes.forEach(e=>e.anchors.forEach(e=>t.add(e)))
                }
                ),
                this.metrics.refreshCollection(t),
                this.viewableRange = this.createViewableRange()
            }
            reconcile() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].reconcile()
            }
            determineActiveKeyframes(t) {
                t = t || r(Array.from(document.documentElement.classList));
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
                    this.keyframeControllers[e].determineActiveKeyframes(t)
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length)
                    return this.boundsMin = 0,
                    void (this.boundsMax = 0);
                let t = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
                    this.keyframeControllers[e].getBounds(t);
                let e = this.convertTValueToScrollPosition(t.min)
                  , i = this.convertTValueToScrollPosition(t.max);
                i - e < a.pageMetrics.windowHeight ? (t.min = this.convertScrollPositionToTValue(e - .5 * a.pageMetrics.windowHeight),
                t.max = this.convertScrollPositionToTValue(i + .5 * a.pageMetrics.windowHeight)) : (t.min -= .001,
                t.max += .001),
                this.boundsMin = t.min,
                this.boundsMax = t.max,
                this.timelineUpdateRequired = !0
            }
            createViewableRange() {
                return new l(this.metrics.get(this.element),a.pageMetrics.windowHeight)
            }
            _onBreakpointChange(t, e) {
                this.keyframesDirty = !0,
                this.determineActiveKeyframes()
            }
            updateProgress(t) {
                this.hasDuration() ? (this.position.localUnclamped = (t - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a),
                this.position.local = n.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }
            performTimelineDispatch() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].updateLocalProgress(this.position.local);
                this.trigger(a.EVENTS.ON_TIMELINE_UPDATE, this.position.local),
                this.trigger("update", this.position.local),
                this.timelineUpdateRequired = !1,
                this.position.lastPosition !== this.position.local && (this.position.lastPosition <= this.boundsMin && this.position.localUnclamped > this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START, this),
                this.trigger("start", this)) : this.position.lastPosition >= this.boundsMin && this.position.localUnclamped < this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START + ":reverse", this),
                this.trigger("start:reverse", this)) : this.position.lastPosition <= this.boundsMax && this.position.localUnclamped >= this.boundsMax ? (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE, this),
                this.trigger("complete", this)) : this.position.lastPosition >= this.boundsMax && this.position.localUnclamped < this.boundsMax && (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this),
                this.trigger("complete:reverse", this))),
                null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            updateTimeline(t) {
                if (!this.isEnabled)
                    return !1;
                void 0 === t && (t = this.getPosition()),
                this.updateProgress(t);
                let e = this.position.lastPosition === this.boundsMin || this.position.lastPosition === this.boundsMax
                  , i = this.position.localUnclamped === this.boundsMin || this.position.localUnclamped === this.boundsMax;
                if (!this.timelineUpdateRequired && e && i && this.position.lastPosition === t)
                    return void (this.position.local = this.position.localUnclamped);
                if (this.timelineUpdateRequired || this.position.localUnclamped > this.boundsMin && this.position.localUnclamped < this.boundsMax)
                    return this.performTimelineDispatch(),
                    this.requestDOMChange(),
                    void (this.position.lastPosition = this.position.localUnclamped);
                let s = this.position.lastPosition > this.boundsMin && this.position.lastPosition < this.boundsMax
                  , n = this.position.localUnclamped <= this.boundsMin || this.position.localUnclamped >= this.boundsMax;
                if (s && n)
                    return this.performTimelineDispatch(),
                    this.requestDOMChange(),
                    void (this.position.lastPosition = this.position.localUnclamped);
                const r = this.position.lastPosition < this.boundsMin && this.position.localUnclamped > this.boundsMax
                  , a = this.position.lastPosition > this.boundsMax && this.position.localUnclamped < this.boundsMax;
                (r || a) && (this.performTimelineDispatch(),
                this.requestDOMChange(),
                this.position.lastPosition = this.position.localUnclamped),
                null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            _onScroll(t) {
                this.updateTimeline(t)
            }
            convertScrollPositionToTValue(t) {
                return this.hasDuration() ? n.map(t, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0
            }
            convertTValueToScrollPosition(t) {
                return this.hasDuration() ? n.map(t, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0
            }
            hasDuration() {
                return this.viewableRange.a !== this.viewableRange.d
            }
            getPosition() {
                return a.pageMetrics.scrollY
            }
            getControllerForTarget(t) {
                if (!t._animInfo || !t._animInfo.controllers)
                    return null;
                if (t._animInfo.controller && t._animInfo.controller.group === this)
                    return t._animInfo.controller;
                const e = t._animInfo.controllers;
                for (let t = 0, i = e.length; t < i; t++)
                    if (e[t].group === this)
                        return e[t];
                return null
            }
            trigger(t, e) {
                if (void 0 !== this._events[t])
                    for (let i = this._events[t].length - 1; i >= 0; i--)
                        void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
            }
            set keyframesDirty(t) {
                this._keyframesDirty = t,
                this._keyframesDirty && this.requestDOMChange()
            }
            get keyframesDirty() {
                return this._keyframesDirty
            }
        }
    }
    , {
        153: 153,
        21: 21,
        34: 34,
        41: 41,
        45: 45,
        57: 57,
        59: 59,
        60: 60,
        63: 63,
        66: 66,
        72: 72,
        73: 73,
        78: 78
    }],
    76: [function(t, e, i) {
        "use strict";
        const s = t(75)
          , n = t(54)
          , r = t(153);
        let a = 0;
        const o = {};
        "undefined" != typeof window && (o.create = t(34));
        class h extends s {
            constructor(t, e) {
                t || ((t = document.createElement("div")).className = "TimeGroup-" + a++),
                super(t, e),
                this.name = this.name || t.getAttribute("data-anim-time-group"),
                this._isPaused = !0,
                this._repeats = 0,
                this._isReversed = !1,
                this._timeScale = 1,
                this._chapterPlayer = new n(this),
                this.now = performance.now()
            }
            finalizeInit() {
                if (!this.anim)
                    throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
                this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this),
                super.finalizeInit()
            }
            progress(t) {
                if (void 0 === t)
                    return 0 === this.boundsMax ? 0 : this.position.local / this.boundsMax;
                let e = t * this.boundsMax;
                this.timelineUpdateRequired = !0,
                this.updateTimeline(e)
            }
            time(t) {
                if (void 0 === t)
                    return this.position.local;
                t = r.clamp(t, this.boundsMin, this.duration),
                this.timelineUpdateRequired = !0,
                this.updateTimeline(t)
            }
            play(t) {
                this.reversed(!1),
                this.isEnabled = !0,
                this._isPaused = !1,
                this.time(t),
                this.now = performance.now(),
                this._playheadEmitter.run()
            }
            reverse(t) {
                this.reversed(!0),
                this.isEnabled = !0,
                this._isPaused = !1,
                this.time(t),
                this.now = performance.now(),
                this._playheadEmitter.run()
            }
            reversed(t) {
                if (void 0 === t)
                    return this._isReversed;
                this._isReversed = t
            }
            restart() {
                this._isReversed ? (this.progress(1),
                this.reverse(this.time())) : (this.progress(0),
                this.play(this.time()))
            }
            pause(t) {
                this.time(t),
                this._isPaused = !0
            }
            paused(t) {
                return void 0 === t ? this._isPaused : (this._isPaused = t,
                this._isPaused || this.play(),
                this)
            }
            onPlayTimeUpdate() {
                if (this._isPaused)
                    return;
                let t = performance.now()
                  , e = (t - this.now) / 1e3;
                this.now = t,
                this._isReversed && (e = -e);
                let i = this.time() + e * this._timeScale;
                if (this._repeats === h.REPEAT_FOREVER || this._repeats > 0) {
                    let t = !1;
                    !this._isReversed && i > this.boundsMax ? (i -= this.boundsMax,
                    t = !0) : this._isReversed && i < 0 && (i = this.boundsMax + i,
                    t = !0),
                    t && (this._repeats = this._repeats === h.REPEAT_FOREVER ? h.REPEAT_FOREVER : this._repeats - 1)
                }
                this.time(i);
                let s = !this._isReversed && this.position.local !== this.duration
                  , n = this._isReversed && 0 !== this.position.local;
                s || n ? this._playheadEmitter.run() : this.paused(!0)
            }
            updateProgress(t) {
                this.hasDuration() ? (this.position.localUnclamped = t,
                this.position.local = r.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length)
                    return this.boundsMin = 0,
                    void (this.boundsMax = 0);
                let t = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
                    this.keyframeControllers[e].getBounds(t);
                this.boundsMin = 0,
                this.boundsMax = t.max,
                this.viewableRange.a = this.viewableRange.b = 0,
                this.viewableRange.c = this.viewableRange.d = this.boundsMax,
                this.timelineUpdateRequired = !0
            }
            setupRAFEmitter(t) {
                this._playheadEmitter = new o.create,
                this._playheadEmitter.on("update", this.onPlayTimeUpdate),
                super.setupRAFEmitter(t)
            }
            get duration() {
                return this.keyframesDirty && this.onKeyframesDirty({
                    silent: !0
                }),
                this.boundsMax
            }
            timeScale(t) {
                return void 0 === t ? this._timeScale : (this._timeScale = t,
                this)
            }
            repeats(t) {
                if (void 0 === t)
                    return this._repeats;
                this._repeats = t
            }
            getPosition() {
                return this.position.local
            }
            addChapter(t) {
                return this._chapterPlayer.addChapter(t)
            }
            playToChapter(t) {
                this._chapterPlayer.playToChapter(t)
            }
            convertScrollPositionToTValue(t) {
                return t
            }
            convertTValueToScrollPosition(t) {
                return t
            }
            hasDuration() {
                return this.duration > 0
            }
            destroy() {
                this._playheadEmitter.destroy(),
                this._playheadEmitter = null,
                super.destroy()
            }
            set timelineProgress(t) {
                this.progress(t)
            }
            get timelineProgress() {
                return this.progress()
            }
        }
        h.REPEAT_FOREVER = -1,
        e.exports = h
    }
    , {
        153: 153,
        34: 34,
        54: 54,
        75: 75
    }],
    77: [function(t, e, i) {
        "use strict";
        const s = t(75)
          , n = (t(54),
        t(153));
        let r = 0;
        const a = {};
        "undefined" != typeof window && (a.create = t(34));
        e.exports = class extends s {
            constructor(t, e) {
                t || ((t = document.createElement("div")).className = "TweenGroup-" + r++),
                super(t, e),
                this.name = "Tweens",
                this.keyframes = [],
                this._isPaused = !1,
                this.now = performance.now()
            }
            finalizeInit() {
                this.onTimeEmitterUpdate = this.onTimeEmitterUpdate.bind(this),
                this.removeExpiredKeyframeControllers = this.removeExpiredKeyframeControllers.bind(this),
                super.finalizeInit()
            }
            destroy() {
                this._timeEmitter.destroy(),
                this._timeEmitter = null,
                this._keyframes = [],
                super.destroy()
            }
            setupRAFEmitter(t) {
                this.now = performance.now(),
                this._timeEmitter = new a.create,
                this._timeEmitter.on("update", this.onTimeEmitterUpdate),
                this._timeEmitter.run(),
                super.setupRAFEmitter(t)
            }
            addKeyframe(t, e) {
                if (void 0 !== e.start || void 0 !== e.end)
                    throw Error("Tweens do not have a start or end, they can only have a duration. Consider using a TimeGroup instead");
                if ("number" != typeof e.duration)
                    throw Error("Tween options.duration is undefined, or is not a number");
                let i, s;
                e.start = (e.delay || 0) + this.position.localUnclamped,
                e.end = e.start + e.duration,
                e.preserveState = !0,
                e.snapAtCreation = !0,
                t._animInfo && (i = t._animInfo.group,
                s = t._animInfo.controller);
                let n = super.addKeyframe(t, e);
                return t._animInfo.group = i,
                t._animInfo.controller = s,
                e.onStart && n.controller.once("draw", t=>{
                    t.keyframe = n,
                    e.onStart(t),
                    t.keyframe = null
                }
                ),
                e.onDraw && n.controller.on("draw", t=>{
                    t.keyframe = n,
                    e.onDraw(t),
                    t.keyframe = null
                }
                ),
                this.removeOverlappingProps(n),
                this.keyframes.push(n),
                this._timeEmitter.willRun() || (this.now = performance.now(),
                this._timeEmitter.run()),
                n
            }
            removeOverlappingProps(t) {
                if (t.controller._allKeyframes.length <= 1)
                    return;
                let e = Object.keys(t.animValues)
                  , i = t.controller;
                for (let s = 0, n = i._allKeyframes.length; s < n; s++) {
                    const n = i._allKeyframes[s];
                    if (n === t)
                        continue;
                    if (n.markedForRemoval)
                        continue;
                    let r = Object.keys(n.animValues)
                      , a = r.filter(t=>e.includes(t));
                    a.length !== r.length ? a.forEach(t=>delete n.animValues[t]) : n.markedForRemoval = !0
                }
            }
            onTimeEmitterUpdate(t) {
                if (this._isPaused || 0 === this.keyframeControllers.length)
                    return;
                let e = performance.now()
                  , i = (e - this.now) / 1e3;
                this.now = e;
                let s = this.position.local + i;
                this.position.local = this.position.localUnclamped = s,
                this.onTimeUpdate()
            }
            onTimeUpdate() {
                for (let t = 0, e = this.keyframes.length; t < e; t++)
                    this.keyframes[t].updateLocalProgress(this.position.localUnclamped);
                this.requestDOMChange(),
                this._timeEmitter.run(),
                null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            onDOMRead() {
                if (this.keyframesDirty && this.onKeyframesDirty(),
                0 !== this.keyframes.length)
                    for (let t = 0, e = this.keyframes.length; t < e; t++) {
                        this.keyframes[t].controller.needsWrite = !0;
                        for (let e in this.keyframes[t].animValues)
                            this.keyframes[t].onDOMRead(e)
                    }
            }
            onDOMWrite() {
                super.onDOMWrite(),
                this.removeExpiredKeyframes()
            }
            removeExpiredKeyframes() {
                let t = this.keyframes.length
                  , e = t;
                for (; t--; ) {
                    let e = this.keyframes[t];
                    e.destroyed ? this.keyframes.splice(t, 1) : (e.markedForRemoval && (e.jsonProps.onComplete && 1 === e.localT && (e.controller.eventObject.keyframe = e,
                    e.jsonProps.onComplete(e.controller.eventObject),
                    e.jsonProps.onComplete = null),
                    null !== this.gui && this.gui.isDraggingPlayhead || (e.remove(),
                    this.keyframes.splice(t, 1))),
                    1 === e.localT && (e.markedForRemoval = !0))
                }
                this.keyframes.length === e && 0 !== this.keyframes.length || this._timeEmitter.executor.eventEmitter.once("after:draw", this.removeExpiredKeyframeControllers)
            }
            removeExpiredKeyframeControllers() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) {
                    let e = !0
                      , i = this.keyframeControllers[t];
                    for (let t = 0, s = i._allKeyframes.length; t < s; t++)
                        if (!i._allKeyframes[t].destroyed) {
                            e = !1;
                            break
                        }
                    e && i.remove()
                }
            }
            updateBounds() {
                this.boundsMin = Math.min(...this.keyframes.map(t=>t.start)),
                this.boundsMax = Math.max(...this.keyframes.map(t=>t.end))
            }
            play() {
                this.isEnabled = !0,
                this._isPaused = !1,
                this.now = performance.now(),
                this._timeEmitter.run()
            }
            pause() {
                this._isPaused = !0
            }
            paused() {
                return this._isPaused
            }
            time(t) {
                if (void 0 === t)
                    return this.position.local;
                this.position.local = this.position.localUnclamped = n.clamp(t, this.boundsMin, this.boundsMax),
                this.onTimeUpdate()
            }
            performTimelineDispatch() {}
            hasDuration() {
                return !0
            }
            getPosition() {
                return this.position.local
            }
            updateProgress(t) {}
            get duration() {
                return this.boundsMax
            }
        }
    }
    , {
        153: 153,
        34: 34,
        54: 54,
        75: 75
    }],
    78: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return t.reduce((t,e)=>(t[e] = e,
            t), {})
        }
    }
    , {}],
    79: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            if ("string" != typeof t)
                return t;
            try {
                return (e || document).querySelector(t) || document.querySelector(t)
            } catch (t) {
                return !1
            }
        }
    }
    , {}],
    80: [function(t, e, i) {
        "use strict";
        const s = t(21).EventEmitterMicro
          , n = t(60)
          , r = {
            create: t(34),
            update: t(45),
            draw: t(41)
        }
          , a = ()=>{}
        ;
        let o = 0;
        e.exports = class extends s {
            constructor(t) {
                super(),
                this.el = t.el,
                this.gum = t.gum,
                this.componentName = t.componentName,
                this._keyframeController = null
            }
            destroy() {
                this.el = null,
                this.gum = null,
                this._keyframeController = null,
                super.destroy()
            }
            addKeyframe(t) {
                const e = t.el || this.el;
                return (t.group || this.anim).addKeyframe(e, t)
            }
            addDiscreteEvent(t) {
                t.event = t.event || "Generic-Event-Name-" + o++;
                let e = void 0 !== t.end && t.end !== t.start;
                const i = this.addKeyframe(t);
                return e ? (t.onEnterOnce && i.controller.once(t.event + ":enter", t.onEnterOnce),
                t.onExitOnce && i.controller.once(t.event + ":exit", t.onExitOnce),
                t.onEnter && i.controller.on(t.event + ":enter", t.onEnter),
                t.onExit && i.controller.on(t.event + ":exit", t.onExit)) : (t.onEventOnce && i.controller.once(t.event, t.onEventOnce),
                t.onEventReverseOnce && i.controller.once(t.event + ":reverse", t.onEventReverseOnce),
                t.onEvent && i.controller.on(t.event, t.onEvent),
                t.onEventReverse && i.controller.on(t.event + ":reverse", t.onEventReverse)),
                i
            }
            addRAFLoop(t) {
                let e = ["start", "end"];
                if (!e.every(e=>t.hasOwnProperty(e)))
                    return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + e.join(" "));
                const i = new r.create;
                i.on("update", t.onUpdate || a),
                i.on("draw", t.onDraw || a),
                i.on("draw", ()=>i.run());
                const {onEnter: s, onExit: n} = t;
                return t.onEnter = ()=>{
                    i.run(),
                    s && s()
                }
                ,
                t.onExit = ()=>{
                    i.cancel(),
                    n && n()
                }
                ,
                this.addDiscreteEvent(t)
            }
            addContinuousEvent(t) {
                t.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"),
                t.event = t.event || "Generic-Event-Name-" + o++;
                let e = this.addKeyframe(t);
                return e.controller.on(t.event, t.onDraw),
                e
            }
            mounted() {}
            onResizeImmediate(t) {}
            onResizeDebounced(t) {}
            onBreakpointChange(t) {}
            get anim() {
                return this.gum.anim
            }
            get keyframeController() {
                return this._keyframeController || (this._keyframeController = this.anim.getControllerForTarget(this.el))
            }
            get pageMetrics() {
                return n.pageMetrics
            }
        }
    }
    , {
        21: 21,
        34: 34,
        41: 41,
        45: 45,
        60: 60
    }],
    81: [function(t, e, i) {
        "use strict";
        const s = t(21).EventEmitterMicro
          , n = t(95)
          , r = t(53)
          , a = t(60)
          , o = t(82)
          , h = {};
        class l extends s {
            constructor(t, e={}) {
                super(),
                this.el = t,
                this.anim = r,
                this.componentAttribute = e.attribute || "data-component-list",
                this.components = [],
                this.componentsInitialized = !1,
                this.el.getAttribute("data-anim-scroll-group") || this.el.setAttribute("data-anim-scroll-group", "bubble-gum-group"),
                n.add(()=>{
                    r.initialize().then(()=>{
                        this.initComponents(),
                        this.setupEvents(),
                        this.components.forEach(t=>t.mounted()),
                        this.trigger(l.EVENTS.DOM_COMPONENTS_MOUNTED)
                    }
                    )
                }
                )
            }
            initComponents() {
                const t = Array.prototype.slice.call(this.el.querySelectorAll("[".concat(this.componentAttribute, "]")));
                this.el.hasAttribute(this.componentAttribute) && t.push(this.el);
                for (let e = 0; e < t.length; e++) {
                    let i = t[e]
                      , s = i.getAttribute(this.componentAttribute).split(" ");
                    for (let t = 0, e = s.length; t < e; t++) {
                        let e = s[t];
                        "" !== e && " " !== e && this.addComponent({
                            el: i,
                            componentName: e
                        })
                    }
                }
                this.componentsInitialized = !0
            }
            setupEvents() {
                this.onResizeDebounced = this.onResizeDebounced.bind(this),
                this.onResizeImmediate = this.onResizeImmediate.bind(this),
                this.onBreakpointChange = this.onBreakpointChange.bind(this),
                r.on(a.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate),
                r.on(a.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced),
                r.on(a.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange)
            }
            addComponent(t) {
                const {el: e, componentName: i, data: s} = t;
                if (!o.hasOwnProperty(i))
                    throw "BubbleGum::addComponent could not add component to '" + e.className + "'. No component type '" + i + "' found!";
                const n = o[i];
                if (!l.componentIsSupported(n, i))
                    return void 0 === h[i] && (console.log("BubbleGum::addComponent unsupported component '" + i + "'. Reason: '" + i + ".IS_SUPPORTED' returned false"),
                    h[i] = !0),
                    null;
                let r = e.dataset.componentList || "";
                r.includes(i) || (e.dataset.componentList = r.split(" ").concat(i).join(" "));
                let c = new n({
                    el: e,
                    data: s,
                    componentName: t.componentName,
                    gum: this,
                    pageMetrics: a.pageMetrics
                });
                return this.components.push(c),
                this.componentsInitialized && c.mounted(),
                c
            }
            removeComponent(t) {
                const e = this.components.indexOf(t);
                -1 !== e && (this.components.splice(e, 1),
                t.el.dataset.componentList = t.el.dataset.componentList.split(" ").filter(e=>e !== t.componentName).join(" "),
                t.destroy())
            }
            getComponentOfType(t, e=document.documentElement) {
                const i = "[".concat(this.componentAttribute, "*=").concat(t, "]")
                  , s = e.matches(i) ? e : e.querySelector(i);
                return s ? this.components.find(e=>e instanceof o[t] && e.el === s) : null
            }
            getComponentsOfType(t, e=document.documentElement) {
                const i = "[".concat(this.componentAttribute, "*=").concat(t, "]")
                  , s = e.matches(i) ? [e] : Array.from(e.querySelectorAll(i));
                return this.components.filter(e=>e instanceof o[t] && s.includes(e.el))
            }
            getComponentsForElement(t) {
                return this.components.filter(e=>e.el === t)
            }
            onResizeImmediate() {
                this.components.forEach(t=>t.onResizeImmediate(a.pageMetrics))
            }
            onResizeDebounced() {
                this.components.forEach(t=>t.onResizeDebounced(a.pageMetrics))
            }
            onBreakpointChange() {
                this.components.forEach(t=>t.onBreakpointChange(a.pageMetrics))
            }
            static componentIsSupported(t, e) {
                const i = t.IS_SUPPORTED;
                if (void 0 === i)
                    return !0;
                if ("function" != typeof i)
                    return console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'),
                    !0;
                const s = t.IS_SUPPORTED();
                return void 0 === s ? (console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'),
                !0) : s
            }
        }
        l.EVENTS = {
            DOM_COMPONENTS_MOUNTED: "DOM_COMPONENTS_MOUNTED"
        },
        e.exports = l
    }
    , {
        21: 21,
        53: 53,
        60: 60,
        82: 82,
        95: 95
    }],
    82: [function(t, e, i) {
        "use strict";
        e.exports = {
            BaseComponent: t(80)
        }
    }
    , {
        80: 80
    }],
    83: [function(t, e, i) {
        "use strict";
        var s, n = t(21).EventEmitterMicro, r = t(47), a = t(32);
        function o(t) {
            t = t || {},
            n.call(this),
            this.id = a.getNewID(),
            this.executor = t.executor || r,
            this._reset(),
            this._willRun = !1,
            this._didDestroy = !1
        }
        (s = o.prototype = Object.create(n.prototype)).run = function() {
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
            n.prototype.destroy.call(this),
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
        e.exports = o
    }
    , {
        21: 21,
        32: 32,
        47: 47
    }],
    84: [function(t, e, i) {
        "use strict";
        var s = t(86)
          , n = function(t) {
            this.rafEmitter = new s,
            this.rafEmitter.on(t, this._onRAFExecuted.bind(this)),
            this.requestAnimationFrame = this.requestAnimationFrame.bind(this),
            this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this),
            this._frameCallbacks = [],
            this._nextFrameCallbacks = [],
            this._currentFrameID = -1,
            this._cancelFrameIdx = -1,
            this._frameCallbackLength = 0,
            this._nextFrameCallbacksLength = 0,
            this._frameCallbackIteration = 0
        }
          , r = n.prototype;
        r.requestAnimationFrame = function(t) {
            return this._currentFrameID = this.rafEmitter.run(),
            this._nextFrameCallbacks.push(this._currentFrameID, t),
            this._nextFrameCallbacksLength += 2,
            this._currentFrameID
        }
        ,
        r.cancelAnimationFrame = function(t) {
            this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t),
            -1 !== this._cancelFrameIdx && (this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2),
            this._nextFrameCallbacksLength -= 2,
            0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel())
        }
        ,
        r._onRAFExecuted = function(t) {
            for (this._frameCallbacks = this._nextFrameCallbacks,
            this._frameCallbackLength = this._nextFrameCallbacksLength,
            this._nextFrameCallbacks = [],
            this._nextFrameCallbacksLength = 0,
            this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2)
                this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t)
        }
        ,
        e.exports = n
    }
    , {
        86: 86
    }],
    85: [function(t, e, i) {
        "use strict";
        var s = t(84)
          , n = function() {
            this.events = {}
        }
          , r = n.prototype;
        r.requestAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)),
            this.events[t].requestAnimationFrame
        }
        ,
        r.cancelAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)),
            this.events[t].cancelAnimationFrame
        }
        ,
        e.exports = new n
    }
    , {
        84: 84
    }],
    86: [function(t, e, i) {
        "use strict";
        var s = t(83)
          , n = function(t) {
            s.call(this, t)
        };
        (n.prototype = Object.create(s.prototype))._subscribe = function() {
            return this.executor.subscribe(this, !0)
        }
        ,
        e.exports = n
    }
    , {
        83: 83
    }],
    87: [function(t, e, i) {
        "use strict";
        var s = t(85);
        e.exports = s.requestAnimationFrame("draw")
    }
    , {
        85: 85
    }],
    88: [function(t, e, i) {
        "use strict";
        var s = t(85);
        e.exports = s.requestAnimationFrame("update")
    }
    , {
        85: 85
    }],
    89: [function(t, e, i) {
        "use strict";
        const s = t(88)
          , n = t(87)
          , r = t(90)
          , a = t(92)
          , o = t(93)
          , h = t(91);
        e.exports = class {
            constructor(t, e={}) {
                if ("number" != typeof t || !isFinite(t))
                    throw new TypeError('Clip duration must be a finite number; got "'.concat(t, '"'));
                "function" == typeof e && (e = {
                    draw: e
                }),
                this.ease = a(e.ease),
                this.update = a(e.update),
                this.draw = e.draw,
                this.prepare = a(e.prepare),
                this.finish = a(e.finish),
                this._duration = 1e3 * t,
                this._startTime = null,
                this._isPrepared = !1,
                this._promise = null,
                this._isPlaying = !1
            }
            get isReversed() {
                return this._duration < 0
            }
            get isComplete() {
                const t = this.progress;
                return !this.isReversed && t >= 1 || this.isReversed && t <= 0
            }
            get progress() {
                if (0 === this._duration)
                    return 1;
                let t = (this.lastFrameTime - this._startTime) / this._duration;
                return this.isReversed && (t = 1 + t),
                h(t, 0, 1)
            }
            get easedProgress() {
                return this.ease ? this.ease(this.progress) : this.progress
            }
            _run(t, e) {
                this.lastFrameTime = Date.now(),
                null === this._startTime && (this._startTime = this.lastFrameTime);
                const i = this.easedProgress;
                this.update && s(()=>this._isPlaying && this.update(i)),
                n(()=>{
                    this._isPlaying && (this.draw(i),
                    this.isComplete ? o(n, [this.finish, e]) : this._run(this, e))
                }
                )
            }
            play() {
                if ("function" != typeof this.draw)
                    throw new Error('Clip must be given a "draw" function as an option or have its "draw" method overriden.');
                return this._isPlaying = !0,
                this._promise || (this._promise = new Promise((t,e)=>{
                    !this._isPrepared && this.prepare ? (this._isPrepared = !0,
                    n(()=>r(this.prepare(), ()=>{
                        this._run(this, t)
                    }
                    ))) : this._run(this, t)
                }
                )),
                this._promise
            }
            destroy() {
                this._isPlaying = !1,
                this.draw = this.finish = this.update = null
            }
            static play() {
                return new this(...arguments).play()
            }
        }
    }
    , {
        87: 87,
        88: 88,
        90: 90,
        91: 91,
        92: 92,
        93: 93
    }],
    90: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            t instanceof Promise ? t.then(e) : e()
        }
    }
    , {}],
    91: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            return Math.min(Math.max(t, e), i)
        }
    }
    , {}],
    92: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "function" == typeof t ? t : null
        }
    }
    , {}],
    93: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            const i = e.length;
            let s = 0;
            !function n() {
                "function" == typeof e[s] && t(e[s]),
                s++,
                s < i && n()
            }()
        }
    }
    , {}],
    94: [function(t, e, i) {
        "use strict";
        "undefined" != typeof window && (window.DOMMatrix = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix);
        const s = 180 / Math.PI
          , n = t=>Math.round(1e6 * t) / 1e6;
        function r(t) {
            return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2])
        }
        function a(t, e) {
            return 0 === e ? Array.from(t) : [t[0] / e, t[1] / e, t[2] / e]
        }
        function o(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        }
        function h(t, e, i, s) {
            return [t[0] * i + e[0] * s, t[1] * i + e[1] * s, t[2] * i + e[2] * s]
        }
        function l(t) {
            const e = new Float32Array(4)
              , i = new Float32Array(3)
              , l = new Float32Array(3)
              , c = new Float32Array(3);
            c[0] = t[3][0],
            c[1] = t[3][1],
            c[2] = t[3][2];
            const u = new Array(3);
            for (let e = 0; e < 3; e++)
                u[e] = t[e].slice(0, 3);
            i[0] = r(u[0]),
            u[0] = a(u[0], i[0]),
            l[0] = o(u[0], u[1]),
            u[1] = h(u[1], u[0], 1, -l[0]),
            i[1] = r(u[1]),
            u[1] = a(u[1], i[1]),
            l[0] /= i[1],
            l[1] = o(u[0], u[2]),
            u[2] = h(u[2], u[0], 1, -l[1]),
            l[2] = o(u[1], u[2]),
            u[2] = h(u[2], u[1], 1, -l[2]),
            i[2] = r(u[2]),
            u[2] = a(u[2], i[2]),
            l[1] /= i[2],
            l[2] /= i[2];
            const d = (m = u[1],
            p = u[2],
            [m[1] * p[2] - m[2] * p[1], m[2] * p[0] - m[0] * p[2], m[0] * p[1] - m[1] * p[0]]);
            var m, p;
            if (o(u[0], d) < 0)
                for (let t = 0; t < 3; t++)
                    i[t] *= -1,
                    u[t][0] *= -1,
                    u[t][1] *= -1,
                    u[t][2] *= -1;
            let f;
            return e[0] = .5 * Math.sqrt(Math.max(1 + u[0][0] - u[1][1] - u[2][2], 0)),
            e[1] = .5 * Math.sqrt(Math.max(1 - u[0][0] + u[1][1] - u[2][2], 0)),
            e[2] = .5 * Math.sqrt(Math.max(1 - u[0][0] - u[1][1] + u[2][2], 0)),
            e[3] = .5 * Math.sqrt(Math.max(1 + u[0][0] + u[1][1] + u[2][2], 0)),
            u[2][1] > u[1][2] && (e[0] = -e[0]),
            u[0][2] > u[2][0] && (e[1] = -e[1]),
            u[1][0] > u[0][1] && (e[2] = -e[2]),
            f = e[0] < .001 && e[0] >= 0 && e[1] < .001 && e[1] >= 0 ? [0, 0, n(180 * Math.atan2(u[0][1], u[0][0]) / Math.PI)] : function(t) {
                const [e,i,r,a] = t
                  , o = e * e
                  , h = i * i
                  , l = r * r
                  , c = e * i + r * a
                  , u = a * a + o + h + l;
                return c > .49999 * u ? [0, 2 * Math.atan2(e, a) * s, 90] : c < -.49999 * u ? [0, -2 * Math.atan2(e, a) * s, -90] : [n(Math.atan2(2 * e * a - 2 * i * r, 1 - 2 * o - 2 * l) * s), n(Math.atan2(2 * i * a - 2 * e * r, 1 - 2 * h - 2 * l) * s), n(Math.asin(2 * e * i + 2 * r * a) * s)]
            }(e),
            {
                translation: c,
                rotation: f,
                eulerRotation: f,
                scale: [n(i[0]), n(i[1]), n(i[2])]
            }
        }
        e.exports = function(t) {
            t instanceof Element && (t = String(getComputedStyle(t).transform).trim());
            let e = new DOMMatrix(t);
            const i = new Array(4);
            for (let t = 1; t < 5; t++) {
                const s = i[t - 1] = new Float32Array(4);
                for (let i = 1; i < 5; i++)
                    s[i - 1] = e["m".concat(t).concat(i)]
            }
            return l(i)
        }
    }
    , {}],
    95: [function(t, e, i) {
        "use strict";
        let s = !1
          , n = !1
          , r = []
          , a = -1;
        e.exports = {
            NUMBER_OF_FRAMES_TO_WAIT: 30,
            add: function(t) {
                if (n && t(),
                r.push(t),
                s)
                    return;
                s = !0;
                let e = document.documentElement.scrollHeight
                  , i = 0;
                const o = ()=>{
                    let t = document.documentElement.scrollHeight;
                    if (e !== t)
                        i = 0;
                    else if (i++,
                    i >= this.NUMBER_OF_FRAMES_TO_WAIT)
                        return void r.forEach(t=>t());
                    e = t,
                    a = requestAnimationFrame(o)
                }
                ;
                a = requestAnimationFrame(o)
            },
            reset() {
                cancelAnimationFrame(a),
                s = !1,
                n = !1,
                r = []
            }
        }
    }
    , {}],
    96: [function(t, e, i) {
        "use strict";
        e.exports = {
            getContentDimensions: t(97),
            getDimensions: t(98),
            getMaxScrollPosition: t(99),
            getPagePosition: t(100),
            getPercentInViewport: t(101),
            getPixelsInViewport: t(102),
            getPosition: t(103),
            getScrollPosition: t(104),
            getViewportPosition: t(105),
            isInViewport: t(106)
        }
    }
    , {
        100: 100,
        101: 101,
        102: 102,
        103: 103,
        104: 104,
        105: 105,
        106: 106,
        97: 97,
        98: 98,
        99: 99
    }],
    97: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            var i = 1;
            return e && (i = t.getBoundingClientRect().width / t.offsetWidth),
            {
                width: t.scrollWidth * i,
                height: t.scrollHeight * i
            }
        }
    }
    , {}],
    98: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            var i;
            return e ? {
                width: (i = t.getBoundingClientRect()).width,
                height: i.height
            } : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }
        }
    }
    , {}],
    99: [function(t, e, i) {
        "use strict";
        function s(t, e) {
            return "x" === e ? t.scrollWidth - t.clientWidth : t.scrollHeight - t.clientHeight
        }
        e.exports = function(t, e) {
            var i = typeof t;
            return e = "string" === i ? t : e,
            t = t && "string" !== i && t !== window ? t : document.documentElement,
            e && /^[xy]$/i.test(e) ? s(t, e) : {
                x: s(t, "x"),
                y: s(t, "y")
            }
        }
    }
    , {}],
    100: [function(t, e, i) {
        "use strict";
        var s = t(98)
          , n = t(104);
        e.exports = function(t, e) {
            var i;
            if (e) {
                var r = n()
                  , a = t.getBoundingClientRect();
                i = {
                    top: a.top + r.y,
                    right: a.right + r.x,
                    bottom: a.bottom + r.y,
                    left: a.left + r.x
                }
            } else {
                var o = s(t);
                for (i = {
                    top: t.offsetTop,
                    right: o.width,
                    bottom: o.height,
                    left: t.offsetLeft
                }; t = t.offsetParent; )
                    i.top += t.offsetTop,
                    i.left += t.offsetLeft;
                i.right += i.left,
                i.bottom += i.top
            }
            var h = document.documentElement.offsetTop
              , l = document.documentElement.offsetLeft;
            return {
                top: i.top + h,
                right: i.right + l,
                bottom: i.bottom + h,
                left: i.left + l
            }
        }
    }
    , {
        104: 104,
        98: 98
    }],
    101: [function(t, e, i) {
        "use strict";
        var s = t(98)
          , n = t(102);
        e.exports = function(t, e) {
            var i = n(t, e)
              , r = s(t, e);
            return {
                x: i.x / r.width,
                y: i.y / r.height
            }
        }
    }
    , {
        102: 102,
        98: 98
    }],
    102: [function(t, e, i) {
        "use strict";
        var s = t(105);
        e.exports = function(t, e) {
            var i = window.innerWidth
              , n = window.innerHeight
              , r = s(t, e)
              , a = {
                x: r.right - r.left,
                y: r.bottom - r.top
            };
            return r.top < 0 && (a.y += r.top),
            r.bottom > n && (a.y -= r.bottom - n),
            r.left < 0 && (a.x += r.left),
            r.right > i && (a.x -= r.right - i),
            a.x = a.x < 0 ? 0 : a.x,
            a.y = a.y < 0 ? 0 : a.y,
            a
        }
    }
    , {
        105: 105
    }],
    103: [function(t, e, i) {
        "use strict";
        var s = t(98);
        e.exports = function(t, e) {
            var i, n, r, a, o, h, l;
            return e ? (n = (i = t.getBoundingClientRect()).top,
            r = i.left,
            a = i.width,
            o = i.height,
            t.offsetParent && (n -= (h = t.offsetParent.getBoundingClientRect()).top,
            r -= h.left)) : (l = s(t, e),
            n = t.offsetTop,
            r = t.offsetLeft,
            a = l.width,
            o = l.height),
            {
                top: n,
                right: r + a,
                bottom: n + o,
                left: r
            }
        }
    }
    , {
        98: 98
    }],
    104: [function(t, e, i) {
        "use strict";
        function s(t) {
            return "x" === t ? window.scrollX || window.pageXOffset : window.scrollY || window.pageYOffset
        }
        function n(t, e, i) {
            return "x" === e ? i ? s("x") : t.scrollLeft : i ? s("y") : t.scrollTop
        }
        e.exports = function(t, e) {
            var i = typeof t;
            e = "string" === i ? t : e;
            var s = (t = t && "string" !== i ? t : window) === window;
            return e && /^[xy]$/i.test(e) ? n(t, e, s) : {
                x: n(t, "x", s),
                y: n(t, "y", s)
            }
        }
    }
    , {}],
    105: [function(t, e, i) {
        "use strict";
        var s = t(100)
          , n = t(104);
        e.exports = function(t, e) {
            var i;
            if (e)
                return {
                    top: (i = t.getBoundingClientRect()).top,
                    right: i.right,
                    bottom: i.bottom,
                    left: i.left
                };
            i = s(t);
            var r = n();
            return {
                top: i.top - r.y,
                right: i.right - r.x,
                bottom: i.bottom - r.y,
                left: i.left - r.x
            }
        }
    }
    , {
        100: 100,
        104: 104
    }],
    106: [function(t, e, i) {
        "use strict";
        var s = t(101)
          , n = t(98);
        e.exports = function(t, e, i) {
            var r = s(t, e);
            return i = function(t, e, i) {
                var s = {
                    x: 0,
                    y: 0
                };
                if (!e)
                    return s;
                var r, a = typeof e;
                return e = "number" === a || "string" === a ? {
                    x: e,
                    y: e
                } : Object.assign(s, e),
                Object.keys(s).forEach((function(s) {
                    var a = e[s];
                    ("string" == typeof a || a > 1) && (r = r || n(t, i),
                    a = (parseInt(a, 10) || 0) / ("x" === s ? r.width : r.height));
                    e[s] = a
                }
                )),
                e
            }(t, i, e),
            r.y > 0 && r.y >= i.y && r.x > 0 && r.x >= i.x
        }
    }
    , {
        101: 101,
        98: 98
    }],
    107: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = i.pluginCache = void 0;
        var n = s(t(22))
          , r = s(t(118))
          , a = s(t(108))
          , o = s(t(110));
        const h = {};
        i.pluginCache = h;
        const l = [];
        let c = 1;
        class u extends n.default {
            constructor(t={}) {
                super(),
                this.el = t.el || document.createElement("video"),
                this.id = t.id || this.el.id || this.el.dataset.inlineMediaId || "inlineMedia-".concat(c++);
                const e = (t.plugins || []).concat(r.default);
                this._initPlugins(e, t),
                l.push(this)
            }
            async load(t) {
                for (const e of this.plugins)
                    if ("function" == typeof e.load)
                        return e.load(t)
            }
            abortLoad() {
                for (const t of this.plugins)
                    if ("function" == typeof t.abortLoad) {
                        t.abortLoad();
                        break
                    }
            }
            async play() {
                for (const t of this.plugins)
                    if ("function" == typeof t.play)
                        return t.play()
            }
            get src() {
                for (const t of this.plugins)
                    if (t.src)
                        return t.src;
                return ""
            }
            get playbackState() {
                for (const t of this.plugins) {
                    const e = t.playbackState;
                    if (void 0 !== e)
                        return e
                }
            }
            get loadingState() {
                for (const t of this.plugins) {
                    const e = t.loadingState;
                    if (void 0 !== e)
                        return e
                }
            }
            _initPlugins(t, e) {
                this.plugins = [],
                this.pluginMap = new Map;
                for (let i of t) {
                    if ("string" == typeof i) {
                        if (!h[i])
                            throw new Error("Trying to use undefined Plugin named: ".concat(i, " . Ensure you call Media.addPlugin() first!"));
                        i = h[i]
                    }
                    if (!1 !== i.isSupported) {
                        const t = new i(Object.assign({
                            media: this
                        }, e));
                        this.plugins.push(t),
                        this.pluginMap.set(i, t)
                    }
                }
                this.trigger(o.default.MOUNTED)
            }
            destroy() {
                if (!this._destroyed) {
                    for (const t of this.plugins)
                        "function" == typeof t.destroy && t.destroy();
                    super.destroy(),
                    l.splice(l.indexOf(this), 1),
                    this._destroyed = !0
                }
            }
            static get medias() {
                return l
            }
            static addPlugin(t, e) {
                h[t] = e
            }
            static async autoInitialize(t=document, e={}) {
                return (0,
                a.default)(t, e)
            }
        }
        var d = u;
        i.default = d
    }
    , {
        108: 108,
        110: 110,
        118: 118,
        22: 22,
        26: 26
    }],
    108: [function(t, e, i) {
        "use strict";
        var s = t(26)
          , n = t(27);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = async function(t=document, e={}) {
            t || (t = document);
            const i = t.querySelectorAll("[".concat("data-inline-media", "]"))
              , s = [];
            for (let t of i) {
                const i = t.dataset
                  , n = i.inlineMediaPlugins ? i.inlineMediaPlugins.split(",").map(t=>t.trim()) : []
                  , o = [];
                for (const t of n)
                    if (!r.pluginCache[t]) {
                        if (!a.default[t])
                            throw new Error("Error Trying to use undefined Plugin named: ".concat(t, " . Ensure you call Media.addPlugin() first to register this custom plugin!"));
                        o.push(async()=>{
                            const e = (await a.default[t]()).default;
                            r.default.addPlugin(t, e)
                        }
                        )
                    }
                await Promise.all(o.map(async t=>t())),
                s.push(new r.default(Object.assign({
                    el: t,
                    plugins: n.map(t=>r.pluginCache[t])
                }, e)))
            }
            return s
        }
        ;
        var r = n(t(107))
          , a = s(t(114))
    }
    , {
        107: 107,
        114: 114,
        26: 26,
        27: 27
    }],
    109: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            EMPTY: "loading-empty",
            LOADING: "loading",
            LOADED: "loaded",
            ERROR: "loading-error",
            DISABLED: "loading-disabled"
        }
    }
    , {}],
    110: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            MOUNTED: "MOUNTED",
            MEDIA_LOAD_START: "MEDIA_LOAD_START",
            MEDIA_LOAD_COMPLETE: "MEDIA_LOAD_COMPLETE",
            MEDIA_LOAD_ERROR: "MEDIA_LOAD_ERROR",
            PLAYBACK_STATE_CHANGE: "PLAYBACK_STATE_CHANGE",
            LOADING_STATE_CHANGE: "LOADING_STATE_CHANGE"
        }
    }
    , {}],
    111: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            LOAD_START: "loadstart",
            LOADED_DATA: "loadeddata",
            LOADED_METADATA: "loadedmetadata",
            CAN_PLAY: "canplay",
            CAN_PLAY_THROUGH: "canplaythrough",
            PLAY: "play",
            PLAYING: "playing",
            PAUSE: "pause",
            WAITING: "waiting",
            SEEKING: "seeking",
            SEEKED: "seeked",
            ERROR: "error",
            ENDED: "ended",
            ABORT: "abort"
        }
    }
    , {}],
    112: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            IDLE: "idle",
            PLAYING: "playing",
            PAUSED: "paused",
            ENDED: "ended"
        }
    }
    , {}],
    113: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        Object.defineProperty(i, "Media", {
            enumerable: !0,
            get: function() {
                return n.default
            }
        }),
        Object.defineProperty(i, "default", {
            enumerable: !0,
            get: function() {
                return n.default
            }
        }),
        Object.defineProperty(i, "Plugin", {
            enumerable: !0,
            get: function() {
                return r.default
            }
        }),
        i.autoInit = void 0;
        var n = s(t(107))
          , r = s(t(120));
        const a = n.default.autoInitialize;
        i.autoInit = a
    }
    , {
        107: 107,
        120: 120,
        26: 26
    }],
    114: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(27));
        var r = {
            AnimLoad: async()=>Promise.resolve().then(()=>(0,
            n.default)(t(121))),
            AnimPlay: async()=>Promise.resolve().then(()=>(0,
            n.default)(t(122))),
            FeatureObserver: async()=>Promise.resolve().then(()=>(0,
            n.default)(t(124))),
            LoadTimeout: async()=>Promise.resolve().then(()=>(0,
            n.default)(t(126))),
            PlayPauseButton: async()=>Promise.resolve().then(()=>(0,
            n.default)(t(127))),
            ViewportSource: async()=>Promise.resolve().then(()=>(0,
            n.default)(t(130)))
        };
        i.default = r
    }
    , {
        121: 121,
        122: 122,
        124: 124,
        126: 126,
        127: 127,
        130: 130,
        26: 26,
        27: 27
    }],
    115: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(120))
          , r = s(t(112))
          , a = s(t(109))
          , o = s(t(111))
          , h = s(t(110));
        const l = [o.default.LOADED_DATA, o.default.LOAD_START, o.default.CAN_PLAY, o.default.CAN_PLAY_THROUGH, o.default.PLAY, o.default.PLAYING, o.default.PAUSE, o.default.WAITING, o.default.SEEKING, o.default.SEEKED, o.default.ERROR, o.default.ENDED];
        class c extends n.default {
            constructor(t) {
                super(t),
                this._container = t.container || this.media.el.parentElement,
                this._playbackState = r.default.IDLE,
                this._loadingState = a.default.EMPTY,
                this._elementsToDecorate = [],
                this._container && this._elementsToDecorate.push(this._container),
                this.media.id && this._elementsToDecorate.push(...Array.from(document.querySelectorAll("[data-inline-media-controller={id}]".replace("{id}", this.media.id))));
                for (const t of this._elementsToDecorate)
                    t.classList.add(this._playbackState),
                    t.classList.add(this._loadingState);
                this.updateState = this.updateState.bind(this),
                this._addEventListeners()
            }
            _addEventListeners() {
                for (let t of l)
                    this.media.el.addEventListener(t, this.updateState);
                this.media.on(h.default.LOADING_STATE_CHANGE, this.updateState),
                this.media.on(h.default.PLAYBACK_STATE_CHANGE, this.updateState)
            }
            _removeEventListeners() {
                for (let t of l)
                    this.media.el.removeEventListener(t, this.updateState);
                this.media.off(h.default.LOADING_STATE_CHANGE, this.updateState),
                this.media.off(h.default.PLAYBACK_STATE_CHANGE, this.updateState)
            }
            updateState(t) {
                const e = this.media.playbackState
                  , i = this._playbackState
                  , s = this.media.loadingState
                  , n = this._loadingState;
                if (this._playbackState = e,
                this._loadingState = s,
                e !== i) {
                    for (const t of this._elementsToDecorate)
                        t.classList.add(e),
                        t.classList.remove(i);
                    this.media.trigger(h.default.PLAYBACK_STATE_CHANGE)
                }
                if (s !== n) {
                    for (const t of this._elementsToDecorate)
                        t.classList.add(s),
                        t.classList.remove(n);
                    this.media.trigger(h.default.LOADING_STATE_CHANGE)
                }
            }
            destroy() {
                for (const t of this._elementsToDecorate)
                    t.classList.remove(this._playbackState),
                    t.classList.remove(this._loadingState);
                this._removeEventListeners(),
                super.destroy()
            }
        }
        var u = c;
        i.default = u
    }
    , {
        109: 109,
        110: 110,
        111: 111,
        112: 112,
        120: 120,
        26: 26
    }],
    116: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(120))
          , r = s(t(111))
          , a = s(t(110))
          , o = s(t(109))
          , h = s(t(19))
          , l = s(t(157));
        const c = r.default.CAN_PLAY_THROUGH
          , {HAVE_NOTHING: u, HAVE_CURRENT_DATA: d, NETWORK_EMPTY: m} = HTMLMediaElement;
        class p extends n.default {
            constructor(t) {
                super(t),
                this._loadCompleteEvent = t.loadCompleteEvent || c,
                this._onLoaded = this._onLoaded.bind(this),
                this._onError = this._onError.bind(this)
            }
            mounted() {
                "none" !== this.media.el.preload && this.media.src && (async()=>{
                    try {
                        await this.media.load(this.media.src)
                    } catch (t) {
                        (0,
                        h.default)("auto load of ".concat(this.media.src, " failed or was aborted with err:").concat(t))
                    }
                }
                )()
            }
            async load(t) {
                if (void 0 === t && this.media.src && (t = this.media.src),
                !t)
                    throw new Error("No Media src was specified, can not fullfill load() request");
                return t !== this._currentLoadUrl && (this.media.trigger(a.default.MEDIA_LOAD_START),
                this._currentLoadUrl = t,
                this._pendingPromise = new Promise((e,i)=>{
                    this._resolvePendingPromise = ()=>{
                        this._resolvePendingPromise = null,
                        this._rejectPendingPromise = null,
                        e()
                    }
                    ,
                    this._rejectPendingPromise = ()=>{
                        this._resolvePendingPromise = null,
                        this._rejectPendingPromise = null,
                        i()
                    }
                    ,
                    this.media.el.addEventListener(this._loadCompleteEvent, this._onLoaded),
                    l.default.browser.firefox && "canplaythrough" === this._loadCompleteEvent && this.media.el.addEventListener("canplay", this._onLoaded),
                    this.media.el.addEventListener(r.default.ERROR, this._onError),
                    this.media.el.addEventListener(r.default.ABORT, this._onError),
                    this.media.el.src = t,
                    this.media.el.load()
                }
                )),
                this._pendingPromise
            }
            _clearLoadListeners() {
                this.media.el.removeEventListener(this._loadCompleteEvent, this._onLoaded),
                this.media.el.removeEventListener("canplay", this._onLoaded),
                this.media.el.removeEventListener(r.default.ERROR, this._onError),
                this.media.el.removeEventListener(r.default.ABORT, this._onError)
            }
            _onLoaded() {
                this._clearLoadListeners(),
                this.media.trigger(a.default.LOADING_STATE_CHANGE),
                this.media.trigger(a.default.MEDIA_LOAD_COMPLETE),
                this._resolvePendingPromise()
            }
            _onError() {
                this._clearLoadListeners(),
                this.media.trigger(a.default.MEDIA_LOAD_ERROR),
                this.media.trigger(a.default.LOADING_STATE_CHANGE),
                this._rejectPendingPromise()
            }
            abortLoad() {
                this._rejectPendingPromise && this._rejectPendingPromise()
            }
            get loadingState() {
                return this.media.el.error ? o.default.ERROR : this.media.el.networkState === m && this.media.el.readyState === u ? o.default.EMPTY : this.media.el.readyState < d ? o.default.LOADING : o.default.LOADED
            }
            destroy() {
                this._clearLoadListeners(),
                super.destroy()
            }
        }
        var f = p;
        i.default = f
    }
    , {
        109: 109,
        110: 110,
        111: 111,
        120: 120,
        157: 157,
        19: 19,
        26: 26
    }],
    117: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(120))
          , r = s(t(112));
        const {HAVE_METADATA: a, HAVE_CURRENT_DATA: o} = HTMLVideoElement;
        class h extends n.default {
            constructor(t) {
                super(t),
                this._initialize()
            }
            _initialize() {
                this.media.el.playsInline = !0,
                this.media.el.autoplay && (this._autoPlayTimer = setTimeout(()=>this.media.play()))
            }
            async play() {
                this.media.el.readyState < a && await this.media.load(),
                await this.media.el.play()
            }
            get playbackState() {
                return this.media.el.ended ? r.default.ENDED : this.media.el.paused && !this.media.el.ended ? r.default.PAUSED : r.default.PLAYING
            }
            destroy() {
                clearTimeout(this._autoPlayTimer),
                super.destroy()
            }
        }
        var l = h;
        i.default = l
    }
    , {
        112: 112,
        120: 120,
        26: 26
    }],
    118: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(119))
          , r = s(t(116))
          , a = s(t(117))
          , o = s(t(115))
          , h = [n.default, r.default, a.default, o.default];
        i.default = h
    }
    , {
        115: 115,
        116: 116,
        117: 117,
        119: 119,
        26: 26
    }],
    119: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(120));
        class r extends n.default {
            get src() {
                return this.media.el.currentSrc
            }
        }
        var a = r;
        i.default = a
    }
    , {
        120: 120,
        26: 26
    }],
    120: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(110));
        var r = class {
            constructor(t) {
                this.options = t,
                this.media = t.media,
                this.mounted = this.mounted.bind(this),
                this.media.on(n.default.MOUNTED, this.mounted)
            }
            mounted() {}
            static get isSupported() {
                return !0
            }
            destroy() {}
        }
        ;
        i.default = r
    }
    , {
        110: 110,
        26: 26
    }],
    121: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(133))
          , r = s(t(120))
          , a = s(t(19));
        const o = {
            start: "t - 200vh",
            end: "b + 100vh"
        };
        class h extends r.default {
            constructor(t) {
                super(t),
                this._anim = t.anim,
                this._container = t.container || this.media.el.parentElement,
                this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el),
                this._initialize()
            }
            _initialize() {
                this._onLoadKeyframeEnter = this._onLoadKeyframeEnter.bind(this),
                this._onLoadKeyframeExit = this._onLoadKeyframeExit.bind(this);
                const t = (0,
                n.default)(this.media.el.dataset, this.options, "loadKeyframe", o);
                t.event || (t.event = "inline-media-load-kf"),
                this._loadKeyframe = this._scrollGroup.addKeyframe(this.media.el, t),
                this._loadKeyframe.controller.on("".concat(this._loadKeyframe.event, ":enter"), this._onLoadKeyframeEnter),
                this._loadKeyframe.controller.on("".concat(this._loadKeyframe.event, ":exit"), this._onLoadKeyframeExit)
            }
            get loadKeyframe() {
                return this._loadKeyframe
            }
            async _onLoadKeyframeEnter(t) {
                try {
                    await this.media.load(),
                    this._loaded = !0
                } catch (t) {
                    (0,
                    a.default)("AnimLoad: Load error occured")
                }
            }
            _onLoadKeyframeExit(t) {}
            destroy() {
                this._loadKeyframe.controller.off("".concat(this._loadKeyframe.event, ":enter"), this._onLoadKeyframeEnter),
                this._loadKeyframe.controller.off("".concat(this._loadKeyframe.event, ":exit"), this._onLoadKeyframeExit),
                super.destroy()
            }
        }
        i.default = h
    }
    , {
        120: 120,
        133: 133,
        19: 19,
        26: 26
    }],
    122: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(110))
          , r = s(t(133))
          , a = s(t(120));
        const o = {
            start: "t - 100vh",
            end: "b"
        };
        class h extends a.default {
            constructor(t) {
                super(t),
                this._anim = t.anim,
                this._container = t.container || this.media.el.parentElement,
                this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el),
                this._initialize()
            }
            _initialize() {
                this._onPlayKeyframeEnter = this._onPlayKeyframeEnter.bind(this),
                this._onPlayKeyframeExit = this._onPlayKeyframeExit.bind(this);
                const t = this.media.el.dataset;
                if (this._autoPlayWithReducedMotion = (0,
                r.default)(t, this.options, "autoPlayWithReducedMotion", !1),
                !this._autoPlayWithReducedMotion && h.prefersReducedMotion)
                    return;
                this._pauseOnExit = (0,
                r.default)(t, this.options, "pauseOnExit", !1),
                this._resetOnExit = (0,
                r.default)(t, this.options, "resetOnExit", !1);
                const e = (0,
                r.default)(t, this.options, "playKeyframe", o);
                e.event || (e.event = "inline-media-play-kf"),
                this._playKeyframe = this._scrollGroup.addKeyframe(this.media.el, e),
                this._playKeyframe.controller.on("".concat(this._playKeyframe.event, ":enter"), this._onPlayKeyframeEnter),
                this._playKeyframe.controller.on("".concat(this._playKeyframe.event, ":exit"), this._onPlayKeyframeExit),
                this._onLoadStart = this._onLoadStart.bind(this),
                this.media.on(n.default.MEDIA_LOAD_START, this._onLoadStart)
            }
            _onLoadStart() {
                this._loaded = !1
            }
            async _onPlayKeyframeEnter(t) {
                if (this._inFrame = !0,
                !this._paused && (this._loaded || (await this.media.load(),
                this._loaded = !0),
                this._inFrame))
                    try {
                        await this.media.play()
                    } catch (t) {}
            }
            _onPlayKeyframeExit(t) {
                this._inFrame = !1,
                this._loaded && this.media.el.paused && !this.media.el.ended ? this._paused = !0 : this._pauseOnExit && (this._paused = !1,
                this.media.el.pause()),
                this._loaded && this._resetOnExit && (this.media.el.currentTime = 0)
            }
            get playKeyframe() {
                return this._playKeyframe
            }
            destroy() {
                this._playKeyframe.controller.off("".concat(this._playKeyframe.event, ":enter"), this._onPlayKeyframeEnter),
                this._playKeyframe.controller.off("".concat(this._playKeyframe.event, ":exit"), this._onPlayKeyframeExit),
                this.media.off(n.default.MEDIA_LOAD_START, this._onLoadStart),
                super.destroy()
            }
            static get prefersReducedMotion() {
                return window.matchMedia("(prefers-reduced-motion: reduce)").matches
            }
        }
        i.default = h
    }
    , {
        110: 110,
        120: 120,
        133: 133,
        26: 26
    }],
    123: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var s = class {
            constructor(t) {
                this.featureClass = t.featureClass,
                this._callback = t.callback,
                this._isPresent = !1,
                this._wasPresent = !1
            }
            get presenceChanged() {
                return this._isPresent !== this._wasPresent
            }
            get isPresent() {
                return this._isPresent
            }
            updatePresence(t) {
                this._wasPresent = this._isPresent,
                this._isPresent = t.contains(this.featureClass)
            }
            triggerCallback(t) {
                return this._callback(t)
            }
        }
        ;
        i.default = s
    }
    , {}],
    124: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(120))
          , r = s(t(112))
          , a = s(t(109))
          , o = s(t(110))
          , h = s(t(125))
          , l = s(t(123));
        const c = t=>t
          , u = t=>t ? t.split(",").map(t=>t.trim()) : null;
        class d extends n.default {
            constructor(t) {
                super(t);
                const e = (e,i,s)=>{
                    let n = "inlineMedia" + e[0].toUpperCase() + e.slice(1);
                    return i(this.media.el.dataset[n]) || t[e] || s
                }
                ;
                this._disabledStates = new h.default({
                    features: e("disabledWhen", u, []),
                    onActivate: this.disable.bind(this),
                    onDeactivate: this.enable.bind(this)
                }),
                this._destroyStates = new h.default({
                    features: e("destroyWhen", u, []),
                    onActivate: this.destroyMedia.bind(this)
                }),
                this._pausedStates = new h.default({
                    features: e("pausedWhen", u, []),
                    onActivate: this.pauseMedia.bind(this)
                }),
                this._autoplayStates = new h.default({
                    features: e("autoplayWhen", u, []),
                    onActivate: this.autoplayMedia.bind(this),
                    onDeactivate: this.disableAutoplay.bind(this)
                });
                const i = t.featureDetect || {};
                var s;
                this.featureCallbacks = Object.entries(i).map(([t,e])=>new l.default({
                    featureClass: t,
                    callback: e
                })),
                this._featureElement = (s = e("featureElement", c, document.documentElement))instanceof HTMLElement ? s : document.querySelector(s),
                this.featureSets = [this._autoplayStates, this._pausedStates, this._disabledStates, this._destroyStates],
                this._featuresUpdated = this._featuresUpdated.bind(this),
                this.play = !1,
                this._observer = new MutationObserver(this._featuresUpdated),
                this._observer.observe(this._featureElement, {
                    attributes: !0,
                    attributeFilter: ["class"]
                }),
                this._featuresUpdated()
            }
            get loadingState() {
                return this._disabledStates.isDetected ? a.default.DISABLED : void 0
            }
            get playbackState() {
                return this._disabledStates.isDetected ? r.default.PAUSED : void 0
            }
            _featuresUpdated() {
                let t = this._featureElement.classList;
                this.featureSets.filter(e=>(e.updateFeatureState(t),
                e.detectionChanged)).forEach(t=>t.applyEffect()),
                this.featureCallbacks.forEach(e=>{
                    e.updatePresence(t),
                    e.isPresent && e.presenceChanged && e.triggerCallback(this.media)
                }
                )
            }
            autoplayMedia() {
                this.media.el.setAttribute("autoplay", !0),
                this.media.play()
            }
            disableAutoplay() {
                this.media.el.setAttribute("autoplay", !1)
            }
            pauseMedia() {
                this.media.el.pause()
            }
            destroyMedia() {
                this.media.destroy()
            }
            destroy() {
                this._observer.disconnect()
            }
            disable() {
                this.media.abortLoad(),
                this.media.el.pause(),
                this.play = c,
                this.media.trigger(o.default.LOADING_STATE_CHANGE),
                this.media.trigger(o.default.PLAYBACK_STATE_CHANGE)
            }
            enable() {
                this.play = !1,
                this.media.trigger(o.default.LOADING_STATE_CHANGE),
                this.media.trigger(o.default.PLAYBACK_STATE_CHANGE)
            }
        }
        var m = d;
        i.default = m
    }
    , {
        109: 109,
        110: 110,
        112: 112,
        120: 120,
        123: 123,
        125: 125,
        26: 26
    }],
    125: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        const s = ()=>{}
        ;
        var n = class {
            constructor(t) {
                var e;
                this._features = new Set((e = t.features,
                Array.isArray(e) ? e : e ? [e] : [])),
                this._isDetected = !1,
                this._wasDetected = !1,
                this._onActivate = t.onActivate || s,
                this._onDeactivate = t.onDeactivate || s
            }
            get detectionChanged() {
                return this._isDetected !== this._wasDetected
            }
            get isDetected() {
                return this._isDetected
            }
            updateFeatureState(t) {
                this._wasDetected = this._isDetected;
                for (let e of t)
                    if (this._features.has(e))
                        return void (this._isDetected = !0);
                this._isDetected = !1
            }
            applyEffect() {
                this._isDetected ? this._onActivate() : this._onDeactivate()
            }
        }
        ;
        i.default = n
    }
    , {}],
    126: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(120))
          , r = s(t(110));
        class a extends n.default {
            static get LOAD_TIMEOUT_EVENT() {
                return "inline-media-timeout"
            }
            constructor(t) {
                super(t);
                const e = this.media.el.dataset;
                this._timeoutDelay = e.loadTimeout || t.loadTimeout || 3e4,
                this._onLoadStart = this._onLoadStart.bind(this),
                this._onLoadComplete = this._onLoadComplete.bind(this),
                this._onTimerComplete = this._onTimerComplete.bind(this),
                this.media.on(r.default.MEDIA_LOAD_START, this._onLoadStart),
                this.media.on(r.default.MEDIA_LOAD_COMPLETE, this._onLoadComplete)
            }
            _onLoadStart() {
                clearTimeout(this._timer),
                this._timer = setTimeout(this._onTimerComplete, this._timeoutDelay)
            }
            _onLoadComplete() {
                clearTimeout(this._timer)
            }
            _onTimerComplete() {
                this.media.trigger("inline-media-timeout"),
                this.media.destroy(),
                this.media.el.parentElement && this.media.el.parentElement.removeChild(this.media.el)
            }
            destroy() {
                clearTimeout(this._timer),
                this.media.off(r.default.MEDIA_LOAD_START, this._onLoadStart)
            }
        }
        i.default = a
    }
    , {
        110: 110,
        120: 120,
        26: 26
    }],
    127: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(120))
          , r = s(t(110))
          , a = s(t(112));
        const o = "Pause"
          , h = "Play"
          , l = {
            CLICK: "data-analytics-click",
            TITLE: "data-analytics-title"
        };
        class c extends n.default {
            constructor(t) {
                super(t),
                this._container = t.container || this.media.el.parentElement,
                this._button = this._findButton(),
                this._onClick = this._onClick.bind(this),
                this._onPlaybackStateChange = this._onPlaybackStateChange.bind(this);
                const e = this._button.dataset;
                this._ariaLabels = {
                    playing: e.ariaPlaying || t.ariaPlaying || o,
                    paused: e.ariaPaused || t.ariaPaused || h
                },
                this._button.addEventListener("click", this._onClick),
                this.media.on(r.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange),
                this._activeAnalytics = Object.values(l).filter(t=>this._button.hasAttribute(t + "-play") && this._button.hasAttribute(t + "-pause"))
            }
            _findButton() {
                if (this.options.playPauseButton)
                    return this.options.playPauseButton;
                let t = this._container.querySelector("".concat('[data-inline-media-control="PlayPause"]'));
                if (!t) {
                    const e = document.querySelectorAll("[data-inline-media-controller='{id}']".replace("{id}", this.media.id));
                    for (const i of e)
                        t = "PlayPause" === i.getAttribute("data-inline-media-control") ? i : i.querySelector("".concat('[data-inline-media-control="PlayPause"]'))
                }
                return t
            }
            _onPlaybackStateChange() {
                const t = this.media.playbackState === a.default.PLAYING;
                t ? this._button.setAttribute("aria-label", this._ariaLabels.playing) : this._button.setAttribute("aria-label", this._ariaLabels.paused),
                this._setAnalyticsState(t)
            }
            _setAnalyticsState(t) {
                const e = t ? "pause" : "play";
                this._activeAnalytics.forEach(t=>this._button.setAttribute(t, this._button.getAttribute(t + "-".concat(e))))
            }
            _onClick(t) {
                this.media.el.paused ? this.media.play() : this.media.el.pause()
            }
            destroy() {
                this._button.removeEventListener("click", this._onClick),
                this.media.off(r.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange)
            }
        }
        i.default = c
    }
    , {
        110: 110,
        112: 112,
        120: 120,
        26: 26
    }],
    128: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(132));
        i.default = class {
            constructor(t) {
                this._breakpoints = t.breakpoints || n.default,
                this.options = t,
                this._initialize()
            }
            _initialize() {
                this._updateBreakpoint = this._updateBreakpoint.bind(this),
                this._callback = this.options.callback,
                this._mediaQueries = Object.keys(this._breakpoints).map(t=>window.matchMedia("(min-width: ".concat(this._breakpoints[t], "px)"))),
                this._addEventListeners(),
                this._updateBreakpoint()
            }
            _addEventListeners() {
                for (const t of this._mediaQueries)
                    t.addListener(this._updateBreakpoint)
            }
            _removeEventListeners() {
                for (const t of this._mediaQueries)
                    t.removeListener(this._updateBreakpoint)
            }
            _updateBreakpoint() {
                const t = Object.keys(this._breakpoints);
                let e = t[0];
                for (let i = 1; i < t.length - 1; i++) {
                    if (!this._mediaQueries[i].matches)
                        break;
                    e = t[i]
                }
                let i = !1;
                this._currentBreakpoint && this._currentBreakpoint !== e && (i = !0),
                this._currentBreakpoint = e,
                i && this._callback()
            }
            get breakpoint() {
                return this._currentBreakpoint
            }
            destroy() {
                this._removeEventListeners()
            }
        }
    }
    , {
        132: 132,
        26: 26
    }],
    129: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(128))
          , r = s(t(131));
        class a extends n.default {
            constructor(t) {
                super(t)
            }
            _initialize() {
                this._anim = this.options.anim,
                this._bpMap = this.options.animBreakpointMap || r.default,
                this._updateBreakpoint = this._updateBreakpoint.bind(this),
                this._callback = this.options.callback,
                this._addEventListeners(),
                this._updateBreakpoint()
            }
            _addEventListeners() {
                this._anim.on("ON_BREAKPOINT_CHANGE", this._updateBreakpoint)
            }
            _removeEventListeners() {
                this._anim.off("ON_BREAKPOINT_CHANGE", this._updateBreakpoint)
            }
            _updateBreakpoint() {
                const t = this._bpMap[this._anim.model.pageMetrics.breakpoint];
                let e = !1;
                this._currentBreakpoint && this._currentBreakpoint !== t && (e = !0),
                this._currentBreakpoint = t,
                e && this._callback()
            }
            destroy() {
                super.destroy()
            }
        }
        i.default = a
    }
    , {
        128: 128,
        131: 131,
        26: 26
    }],
    130: [function(t, e, i) {
        "use strict";
        var s = t(26);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var n = s(t(120))
          , r = s(t(128))
          , a = s(t(129))
          , o = (s(t(19)),
        s(t(18)),
        s(t(109)));
        class h extends n.default {
            constructor(t) {
                super(t),
                this._cachedPlaying = null,
                this._initialize()
            }
            _initialize() {
                this._onBreakpointChange = this._onBreakpointChange.bind(this);
                const t = Object.assign({
                    callback: this._onBreakpointChange
                }, this.options);
                this._breakpointDetect = t.anim ? new a.default(t) : new r.default(t),
                this._currentTime = 0;
                const e = this.media.el.dataset;
                this._basePath = this.options.basePath || e.inlineMediaBasepath || "./",
                this._onBreakpointChange()
            }
            _onBreakpointChange() {
                this._currentBreakpoint = this._breakpointDetect.breakpoint;
                const t = window.devicePixelRatio > 1 ? "".concat(this._currentBreakpoint, "_2x") : this._currentBreakpoint
                  , e = "".concat(this._basePath).concat(t, ".").concat("mp4");
                this._swapSrc(e)
            }
            get src() {
                return this._src
            }
            async _swapSrc(t) {
                if (this._src = t,
                this.media.loadingState === o.default.EMPTY)
                    return;
                const e = null !== this._cachedPlaying ? this._cachedPlaying : !this.media.el.paused;
                return this.media.loadingState === o.default.LOADED && (this._currentTime = this.media.el.currentTime),
                this._cachedPlaying = e,
                await this.media.load("".concat(t, "#t=").concat(this._currentTime)),
                this._cachedPlaying = null,
                e ? this.media.play() : Promise.resolve()
            }
            destroy() {
                this._breakpointDetect.destroy(),
                super.destroy()
            }
        }
        i.default = h
    }
    , {
        109: 109,
        120: 120,
        128: 128,
        129: 129,
        18: 18,
        19: 19,
        26: 26
    }],
    131: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            S: "small",
            M: "medium",
            L: "large",
            X: "xlarge"
        }
    }
    , {}],
    132: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            small: 0,
            medium: 570,
            large: 780,
            xlarge: 1280
        }
    }
    , {}],
    133: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = function(t, e, i, s) {
            const n = i[0].toUpperCase() + i.slice(1)
              , r = t["inlineMedia" + n];
            if (void 0 !== r)
                switch (typeof s) {
                case "boolean":
                    return "false" !== r;
                case "object":
                    return JSON.parse(r);
                case "number":
                    return Number(r);
                default:
                    return r
                }
            else if (void 0 !== e[i])
                return e[i];
            return s
        }
    }
    , {}],
    134: [function(t, e, i) {
        "use strict";
        const s = t(22)
          , n = t(137)
          , r = t(142)
          , a = t(140)
          , o = t(145)
          , h = t(150)
          , l = t(139)
          , c = t(143)
          , u = t(147)
          , d = ["beforeCreate", "created", "beforeMount", "createItems", "itemsCreated", "mounted", "animateToItem", "onItemChangeInitiated", "onItemChangeOccurred", "onItemChangeCompleted", "onResizeImmediate", "onBreakpointChange", "onResizeDebounced", "destroy"];
        class m extends s {
            constructor(t) {
                super(t),
                this.el = t.el,
                this.model = Object.assign({
                    options: t
                }, JSON.parse(JSON.stringify(n))),
                this.model.Item.ConstructorFunction = n.Item.ConstructorFunction,
                this._items = [],
                this.currentIndex = 0,
                d.forEach(t=>{
                    this[t] = (...e)=>{
                        this["__".concat(t)] && this["__".concat(t)].forEach(t=>t.apply(this, e))
                    }
                }
                ),
                this.on(n.Events.ITEM_CHANGE_INITIATED, this.onItemChangeInitiated),
                this.on(n.Events.ITEM_CHANGE_OCCURRED, this.onItemChangeOccurred),
                this.on(n.Events.ITEM_CHANGE_COMPLETED, this.onItemChangeCompleted),
                ["beforeCreate", "created", "beforeMount", "createItems"].forEach(e=>this[e](t))
            }
        }
        m.withMixins = (...t)=>{
            const e = class extends m {
            }
              , i = e.prototype;
            return t.unshift(r, h, o),
            t.push(l, u, a, c),
            t.forEach(t=>{
                for (const e in t)
                    d.includes(e) ? (i["__".concat(e)] = i["__".concat(e)] || [],
                    i["__".concat(e)].push(t[e])) : i[e] = t[e]
            }
            ),
            e
        }
        ,
        e.exports = m
    }
    , {
        137: 137,
        139: 139,
        140: 140,
        142: 142,
        143: 143,
        145: 145,
        147: 147,
        150: 150,
        22: 22
    }],
    135: [function(t, e, i) {
        "use strict";
        const s = t(21).EventEmitterMicro
          , n = {};
        "undefined" != typeof window && (n.draw = t(41),
        n.cancelDraw = t(39));
        e.exports = class extends s {
            constructor(t) {
                super(),
                this._x = 0,
                this._y = 0,
                this._opacity = 0,
                this._width = 0,
                this._height = 0,
                this._zIndex = 0,
                this.index = t.index,
                this.el = t.el,
                this.applyDraw = this.applyDraw.bind(this),
                this.measure()
            }
            measure() {
                const t = getComputedStyle(this.el);
                this._width = this.el.clientWidth,
                this._height = this.el.clientHeight,
                this._zIndex = parseInt(t.getPropertyValue("z-index")),
                this._opacity = parseFloat(t.getPropertyValue("opacity"))
            }
            select() {
                this.el.classList.add("current"),
                this.trigger("select", this)
            }
            deselect() {
                this.el.classList.remove("current"),
                this.trigger("deselect", this)
            }
            progress(t) {}
            needsRedraw() {
                n.cancelDraw(this._rafID),
                this._rafID = n.draw(this.applyDraw, !0)
            }
            applyDraw() {
                this.el.style.zIndex = this._zIndex,
                this.el.style.opacity = this._opacity,
                this.el.style.transform = "translate(".concat(this._x, "px, ").concat(this._y, "px)")
            }
            get id() {
                return this.el.id
            }
            get height() {
                return this._height
            }
            set height(t) {
                this._height = t,
                this.needsRedraw()
            }
            get width() {
                return this._width
            }
            set width(t) {
                this._width = t,
                this.needsRedraw()
            }
            get x() {
                return this._x
            }
            set x(t) {
                this._x = t,
                this.needsRedraw()
            }
            get y() {
                return this._y
            }
            set y(t) {
                this._y = t,
                this.needsRedraw()
            }
            get opacity() {
                return this._opacity
            }
            set opacity(t) {
                this._opacity = t,
                this.needsRedraw()
            }
            get zIndex() {
                return this._zIndex
            }
            set zIndex(t) {
                this._zIndex = t,
                this.needsRedraw()
            }
        }
    }
    , {
        21: 21,
        39: 39,
        41: 41
    }],
    136: [function(t, e, i) {
        "use strict";
        const s = t(41);
        e.exports = {
            combine: function(t) {
                let e = "mixin_mask_" + Math.random().toString(16).slice(2);
                const i = {
                    beforeCreate() {
                        this[e] = n(this.model.pageMetrics.breakpoint),
                        r(this, "beforeCreate")
                    },
                    onBreakpointChange(t) {
                        const i = n(t.breakpoint);
                        i !== this[e] && (r(this, "destroy"),
                        this[e] = i,
                        s(()=>{
                            r(this, "beforeCreate", this.model.options),
                            r(this, "created", this.model.options),
                            r(this, "beforeMount", this.model.options),
                            r(this, "itemsCreated"),
                            r(this, "mounted")
                        }
                        , !0))
                    },
                    destroy() {
                        r(this, "destroy"),
                        this[e] = null
                    }
                }
                  , n = function(e) {
                    let i = t.find(t=>t.breakpointMask.includes(e));
                    if (!i)
                        throw "Cannot find mode for current breakpoint ".concat(e, ". Current Settings ").concat(t);
                    return i.mixin
                };
                let r = function(t, i, ...s) {
                    if (t[e][i])
                        return t[e][i].apply(t, s)
                };
                return t.forEach((function(t) {
                    t.mixin || (t.mixin = {}),
                    Object.keys(t.mixin).forEach(t=>i[t] = i[t] || function(...e) {
                        return r(this, t, ...e)
                    }
                    )
                }
                )),
                i
            }
        }
    }
    , {
        41: 41
    }],
    137: [function(t, e, i) {
        "use strict";
        e.exports = {
            PrefersReducedMotion: !1,
            IsRTL: !1,
            IsTouch: !1,
            Slide: {
                Selector: ".item-container",
                duration: 1
            },
            Fade: {
                duration: .5
            },
            Item: {
                Selector: ".item-container .gallery-item",
                ConstructorFunction: t(135)
            },
            DotNav: {
                Selector: ".dotnav"
            },
            PaddleNav: {
                Selector: ".paddlenav"
            },
            ChapterPlayer: {
                defaultEase: t=>t
            },
            FadeCaptionOnChange: {
                ItemSelector: ".captions-gallery [data-captions-gallery-item]"
            },
            TabNav: {
                ItemSelector: ".tablist-wrapper li",
                RoamingTabIndexSelector: "a"
            },
            SwipeDrag: {
                DesktopSwipe: !1,
                movementRateMultiplier: 1.5,
                velocityMultiplier: 8
            },
            Events: {
                ITEM_CHANGE_INITIATED: "ITEM_CHANGE_INITIATED",
                ITEM_CHANGE_OCCURRED: "ITEM_CHANGE_OCCURRED",
                ITEM_CHANGE_COMPLETED: "ITEM_CHANGE_COMPLETED"
            }
        }
    }
    , {
        135: 135
    }],
    138: [function(t, e, i) {
        "use strict";
        let s;
        try {
            s = t("@marcom/ac-analytics").observer.Gallery
        } catch (t) {}
        e.exports = {
            created(t) {
                this.analytics = {
                    lastTrackedItem: null,
                    observer: null,
                    events: {
                        UPDATE: "update",
                        UPDATE_COMPLETE: "update:complete"
                    }
                }
            },
            mounted() {
                if (s) {
                    let t = this.el.getAttribute("id");
                    t || (console.warn("No ID attribute found on the Mixin Gallery element - please add an ID", this),
                    t = "null"),
                    this.analytics.observer = new s(this,{
                        galleryName: t,
                        beforeUpdateEvent: this.analytics.events.UPDATE,
                        afterUpdateEvent: this.analytics.events.UPDATE_COMPLETE,
                        trackAutoRotate: !0
                    })
                }
            },
            onItemChangeCompleted(t) {
                if (!t.previous || t.current === this.analytics.lastTrackedItem || t.current === t.previous && !this.analytics.lastTrackedItem)
                    return;
                this.analytics.lastTrackedItem = t.current;
                let e = {
                    incoming: {
                        id: t.current.id
                    },
                    outgoing: {
                        id: t.previous.id
                    },
                    interactionEvent: this.lastInteractionEvent
                };
                this.trigger(this.analytics.events.UPDATE_COMPLETE, e)
            }
        }
    }
    , {
        undefined: void 0
    }],
    139: [function(t, e, i) {
        "use strict";
        e.exports = {
            createItems(t) {
                if (this._items.length)
                    this.itemsCreated();
                else {
                    if (!this.model.Item.ConstructorFunction)
                        throw new ReferenceError("MixinGallery::AutoCreateItems - this.model.Item.ConstructorFunction is null");
                    if (0 === this._items.length) {
                        this._items = [],
                        Array.from(this.el.querySelectorAll(this.model.Item.Selector)).forEach((t,e)=>{
                            const i = new this.model.Item.ConstructorFunction({
                                el: t,
                                index: e
                            });
                            this._items.push(i)
                        }
                        );
                        let t = this._items[this._items.length - 1];
                        for (let e = 0; e < this._items.length; e++) {
                            const i = this._items[e];
                            i.prev = t,
                            i.next = this._items[e + 1],
                            t = i
                        }
                        t.next = this._items[0]
                    }
                    this.itemsCreated()
                }
            }
        }
    }
    , {}],
    140: [function(t, e, i) {
        "use strict";
        e.exports = {
            itemsCreated(t) {
                this.model.options.gum || this._isVue || (this.anim.on("ON_RESIZE_IMMEDIATE", t=>this.onResizeImmediate(t)),
                this.anim.on("ON_RESIZE_DEBOUNCED", t=>this.onResizeDebounced(t)),
                this.anim.on("ON_BREAKPOINT_CHANGE", t=>this.onBreakpointChange(t)),
                requestAnimationFrame(this.mounted))
            }
        }
    }
    , {}],
    141: [function(t, e, i) {
        "use strict";
        const s = t(89)
          , n = t(62);
        e.exports = {
            mounted() {
                this.el.classList.remove("peeking"),
                this._items.forEach(t=>{
                    t.measure(),
                    t.x = 0,
                    t.zIndex = t === this.currentItem ? 2 : 0
                }
                ),
                this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                    gallery: this,
                    previous: null,
                    current: this.currentItem
                })
            },
            animateToItem(t) {
                if (this.currentIndex === t || this.currentIndex === this.wrappedIndex(t))
                    return;
                this.el.parentElement.scrollLeft = 0;
                let e = this.model.IsTouch ? "easeOutCubic" : "easeInOutCubic";
                this.clip && this.clip._isPlaying && (e = "easeOutQuint",
                this.clip.destroy());
                const i = this.selections.occurred.previous
                  , r = this.selections.occurred.current
                  , a = this._items[this.wrappedIndex(t)];
                a.opacity = 0,
                i && (i.zIndex = 0),
                r && (r.zIndex = 1),
                a.zIndex = 2;
                let o = !1;
                this.clip = new s(this.model.Fade.duration,{
                    ease: n[e],
                    prepare: ()=>this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                        gallery: this,
                        next: a
                    }),
                    update: t=>{
                        t > .5 && !o && (o = !0,
                        this.currentIndex = a.index,
                        this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                            gallery: this,
                            current: a
                        })),
                        a.opacity = t
                    }
                    ,
                    draw: ()=>{}
                    ,
                    finish: ()=>{
                        this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                            gallery: this,
                            current: a
                        })
                    }
                }),
                this.clip.play().then(()=>{
                    this.clip.destroy(),
                    this.clip = null
                }
                )
            },
            onResizeImmediate() {
                this.clip && (this.clip.destroy(),
                this.clip = null)
            },
            destroy() {
                this.clip && this.clip.destroy(),
                this._items.forEach(t=>{
                    t.zIndex = 0
                }
                )
            }
        }
    }
    , {
        62: 62,
        89: 89
    }],
    142: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                Object.defineProperties(this, {
                    currentItem: {
                        configurable: !0,
                        get: ()=>this._items[this.wrappedIndex(this.currentIndex)]
                    }
                })
            },
            wrappedIndex(t) {
                return (t %= this._items.length) < 0 ? this._items.length + t : t
            },
            getItemForTrigger(t) {
                return this._items.find(e=>e.id === t)
            }
        }
    }
    , {}],
    143: [function(t, e, i) {
        "use strict";
        e.exports = {
            mounted() {
                const t = this._items[this.wrappedIndex(this.currentIndex)];
                this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                    gallery: this,
                    next: t
                }),
                this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                    gallery: this,
                    current: t
                }),
                this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                    gallery: this,
                    current: t
                })
            }
        }
    }
    , {}],
    144: [function(t, e, i) {
        "use strict";
        const s = ["INPUT", "SELECT", "TEXTAREA"];
        e.exports = {
            created(t) {
                this.onKeyDown = this.onKeyDown.bind(this),
                this.inViewKeyframe = this.addDiscreteEvent({
                    event: "Gallery: In View",
                    start: "t - 100vh",
                    end: "b + 100%",
                    onEnter: ()=>window.addEventListener("keydown", this.onKeyDown),
                    onExit: ()=>window.removeEventListener("keydown", this.onKeyDown)
                }),
                Object.defineProperty(this, "isInView", {
                    configurable: !0,
                    get: ()=>null != this.inViewKeyframe && this.inViewKeyframe.isCurrentlyInRange
                })
            },
            destroy() {
                this.inViewKeyframe.remove(),
                this.inViewKeyframe = null,
                window.removeEventListener("keydown", this.onKeyDown)
            },
            onKeyDown(t) {
                if (this.isInView && !this.inputHasFocus() && (37 === t.keyCode || 39 === t.keyCode)) {
                    let e = this.model.IsRTL ? -1 : 1
                      , i = 37 === t.keyCode ? -1 : 1;
                    this.lastInteractionEvent = t;
                    const s = this.currentIndex + i * e;
                    this.animateToItem(s)
                }
            },
            inputHasFocus: function() {
                return -1 !== s.indexOf(document.activeElement.nodeName)
            }
        }
    }
    , {}],
    145: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                document.body._animInfo && (this.anim = document.body._animInfo.group.anim,
                this.model.pageMetrics = this.anim.model.pageMetrics)
            },
            addKeyframe(t) {
                const e = t.el || this.el;
                return (t.group || this.anim).addKeyframe(e, t)
            },
            addDiscreteEvent(t) {
                t.event = t.event || "Generic-Event-Name-" + tmpUUID++;
                let e = void 0 !== t.end && t.end !== t.start;
                const i = this.addKeyframe(t);
                return e ? (t.onEnterOnce && i.controller.once(t.event + ":enter", t.onEnterOnce),
                t.onExitOnce && i.controller.once(t.event + ":exit", t.onExitOnce),
                t.onEnter && i.controller.on(t.event + ":enter", t.onEnter),
                t.onExit && i.controller.on(t.event + ":exit", t.onExit)) : (t.onEventOnce && i.controller.once(t.event, t.onEventOnce),
                t.onEventReverseOnce && i.controller.once(t.event + ":reverse", t.onEventReverseOnce),
                t.onEvent && i.controller.on(t.event, t.onEvent),
                t.onEventReverse && i.controller.on(t.event + ":reverse", t.onEventReverse)),
                i
            },
            addRAFLoop(t) {
                let e = ["start", "end"];
                if (!e.every(e=>t.hasOwnProperty(e)))
                    return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + e.join(" "));
                const i = new RAFEmitter.create;
                i.on("update", t.onUpdate || noop),
                i.on("draw", t.onDraw || noop),
                i.on("draw", ()=>i.run());
                const {onEnter: s, onExit: n} = t;
                return t.onEnter = ()=>{
                    i.run(),
                    s && s()
                }
                ,
                t.onExit = ()=>{
                    i.cancel(),
                    n && n()
                }
                ,
                this.addDiscreteEvent(t)
            },
            addContinuousEvent(t) {
                t.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"),
                t.event = t.event || "Generic-Event-Name-" + tmpUUID++;
                let e = this.addKeyframe(t);
                return e.controller.on(t.event, t.onDraw),
                e
            }
        }
    }
    , {}],
    146: [function(t, e, i) {
        "use strict";
        e.exports = {
            onItemChangeOccurred(t) {
                const {previous: e, current: i} = this.selections.occurred;
                e && e !== i && e.deselect(),
                i.select()
            }
        }
    }
    , {}],
    147: [function(t, e, i) {
        "use strict";
        const s = t(7)
          , n = t(10);
        e.exports = {
            itemsCreated(t) {
                this._items.forEach((t,e)=>{
                    e === this.wrappedIndex(this.currentIndex) ? n(t.el) : s(t.el)
                }
                )
            },
            onItemChangeCompleted(t) {
                const {previous: e, current: i} = this.selections.completed;
                e && e !== i && s(e.el),
                n(i.el)
            }
        }
    }
    , {
        10: 10,
        7: 7
    }],
    148: [function(t, e, i) {
        "use strict";
        const s = t(89)
          , n = t(71)
          , r = t(45)
          , a = t(41)
          , o = t(39);
        e.exports = {
            beforeCreate() {
                Object.defineProperties(this, {
                    widthOfItem: {
                        configurable: !0,
                        get: ()=>this._items[0].width
                    }
                })
            },
            created(t) {
                this.position = 0,
                this.target = 0,
                this.slideContainer = this.el.querySelector(this.model.Slide.Selector),
                this.sign = this.model.IsRTL ? -1 : 1
            },
            mounted() {
                r(()=>{
                    this._items.forEach(t=>{
                        t.measure(),
                        t.x = t.width * t.index * this.sign
                    }
                    ),
                    a(()=>{
                        this.position = this.target = this.convertSlideIndexToHorizontalPosition(this.wrappedIndex(this.currentIndex)),
                        this.slideContainer.style.transform = "translate3d(".concat(-this.position, "px, 0,0)"),
                        this.checkForSlideUpdate(!0)
                    }
                    )
                }
                )
            },
            animateToItem(t) {
                const e = this.wrappedIndex(t);
                if (this.currentIndex === e)
                    return;
                this.el.parentElement.scrollLeft = 0;
                let i = "cubic-bezier(0.645, 0.045, 0.355, 1)";
                this.clip && this.clip._isPlaying && (this.clip.destroy(),
                i = "cubic-bezier(0.23, 1, 0.32, 1)");
                const r = this.target
                  , a = this.convertSlideIndexToHorizontalPosition(t)
                  , o = this.model.PrefersReducedMotion ? .001 : this.model.Slide.duration
                  , h = this._items[this.wrappedIndex(t)];
                this.clip = new s(o,{
                    ease: n.fromCSSString(i),
                    prepare: ()=>this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                        gallery: this,
                        next: h
                    }),
                    update: t=>{
                        t = Math.min(1, Math.max(t, 0)),
                        this.target = r + (a - r) * t
                    }
                    ,
                    draw: ()=>this.draw(1),
                    finish: ()=>this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                        gallery: this,
                        current: h
                    })
                }),
                this.slideContainer.style.transition = "transform ".concat(o, "s ").concat(i),
                this.slideContainer.style.transform = "translate3d(".concat(-a, "px, 0,0)"),
                this.clip.play().then(()=>{
                    this.clip.destroy(),
                    this.clip = null
                }
                )
            },
            draw(t=1) {
                let e = this.target - this.position;
                this.position += e * t;
                const i = Math.abs(this.position - this.target);
                i < .1 && (this.position = this.target),
                this.checkForSlideUpdate(),
                1 !== t && (this.slideContainer.style.transition = "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
                this.slideContainer.style.transform = "translate(".concat(-this.position, "px, 0)"),
                Math.abs(i) > 0 && (o(this.dragDrawId),
                a(()=>this.draw(t)))),
                this._items.forEach(t=>{
                    let e = (this.position - t.x) / this.widthOfItem;
                    t._progress = e,
                    t.progress(e)
                }
                )
            },
            checkForSlideUpdate(t) {
                let e = Math.floor((this.position * this.sign + .5 * this.widthOfItem) / this.widthOfItem);
                (e !== this.currentIndex || t) && (this.currentIndex = e,
                this.wrapSlideItems(),
                this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                    gallery: this,
                    current: this.currentItem
                }))
            },
            wrapSlideItems() {
                this.clampedIndex || (this.currentItem.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex),
                this.currentItem.prev.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex - 1),
                this.currentItem.next.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex + 1))
            },
            onResizeImmediate() {
                this.clip && (this.clip.destroy(),
                this.clip = null),
                this._items.forEach(t=>{
                    t.measure(),
                    t.x = t.width * t.index * this.sign
                }
                ),
                this.currentIndex = this.wrappedIndex(this.currentItem.index),
                this.wrapSlideItems(),
                this.position = this.target = this.convertSlideIndexToHorizontalPosition(this.currentIndex),
                this.slideContainer.style.transition = "none",
                a(()=>{
                    this.slideContainer.style.transform = "translate3d(".concat(-this.position, "px, 0,0)")
                }
                )
            },
            convertSlideIndexToHorizontalPosition(t) {
                return t * this.widthOfItem * this.sign
            },
            destroy() {
                this._items.forEach(t=>{
                    t.measure(),
                    t.x = 0,
                    t.zIndex = t === this.currentItem ? 2 : 0
                }
                ),
                this.slideContainer.removeAttribute("style")
            }
        }
    }
    , {
        39: 39,
        41: 41,
        45: 45,
        71: 71,
        89: 89
    }],
    149: [function(t, e, i) {
        "use strict";
        const s = t(2)
          , n = t(11)
          , r = t(14);
        e.exports = {
            created() {
                this.tabNav = {
                    items: [],
                    current: null
                }
            },
            itemsCreated() {
                Array.from(this.el.querySelectorAll(this.model.TabNav.ItemSelector)).forEach((t,e)=>{
                    const i = new a(t,e)
                      , s = this.getItemForTrigger(i.trigger);
                    i.onSelected = t=>{
                        this.lastInteractionEvent = t,
                        t.preventDefault();
                        let i = e - this.wrappedIndex(this.currentIndex)
                          , s = this.currentIndex + i;
                        this.animateToItem(s)
                    }
                    ,
                    s.on("select", ()=>{
                        t.classList.add("current"),
                        i.anchorEl.classList.add("current")
                    }
                    ),
                    s.on("deselect", ()=>{
                        t.classList.remove("current"),
                        i.anchorEl.classList.remove("current")
                    }
                    ),
                    i.anchorEl.addEventListener("click", i.onSelected),
                    this.tabNav.items.push(i)
                }
                ),
                this._items.forEach((t,e)=>{
                    t.el.setAttribute("role", r.TABPANEL),
                    t.el.setAttribute(n.LABELLEDBY, this.tabNav.items[e].anchorEl.id),
                    this.tabNav.items[e].anchorEl.setAttribute(n.CONTROLS, t.el.id)
                }
                )
            },
            mounted() {
                const t = this.tabNav.items[0].el.parentElement;
                this.roamingTabIndex = new s(t,{
                    selector: this.model.TabNav.RoamingTabIndexSelector
                })
            },
            onItemChangeCompleted(t) {
                let e = this.tabNav.items.filter(e=>e.trigger === t.current.id)[0];
                this.setCurrentItem(e),
                this.roamingTabIndex.setSelectedItemByIndex(e.index, !0),
                document.activeElement.parentElement.parentElement === e.el.parentElement && e.anchorEl.focus()
            },
            setCurrentItem(t) {
                t !== this.tabNav.current && (this.tabNav.current = t)
            }
        };
        class a {
            constructor(t, e) {
                this.el = t,
                this.index = e,
                this.anchorEl = t.querySelector("a"),
                this.trigger = this.anchorEl.getAttribute("data-ac-gallery-trigger"),
                this.anchorEl.setAttribute("role", r.TAB)
            }
        }
    }
    , {
        11: 11,
        14: 14,
        2: 2
    }],
    150: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                this.selections = {
                    initiated: {
                        current: null,
                        previous: null
                    },
                    occurred: {
                        current: null,
                        previous: null
                    },
                    completed: {
                        current: null,
                        previous: null
                    }
                }
            },
            onItemChangeInitiated(t) {
                this.selections.initiated.previous = this.selections.initiated.current,
                this.selections.initiated.current = this.selections.initiated.next,
                this.selections.initiated.next = t.next
            },
            onItemChangeOccurred(t) {
                this.selections.occurred.previous = t.previous = this.selections.occurred.current,
                this.selections.occurred.current = t.current
            },
            onItemChangeCompleted(t) {
                this.selections.completed.previous = t.previous = this.selections.completed.current,
                this.selections.completed.current = t.current
            }
        }
    }
    , {}],
    151: [function(t, e, i) {
        "use strict";
        class s {
            constructor(t={}) {
                this.options = t,
                "loading" === document.readyState ? document.addEventListener("readystatechange", t=>{
                    "interactive" === document.readyState && this._init()
                }
                ) : this._init()
            }
            _init() {
                if (this._pictures = Array.from(document.querySelectorAll("*[".concat(s.DATA_ATTRIBUTE, "]"))),
                this.AnimSystem = this._findAnim(),
                null === this.AnimSystem)
                    return null;
                this._addKeyframesToImages(),
                this._addEventsToImages()
            }
            _defineKeyframeOptions(t=null) {
                const e = t.getAttribute(s.DATA_DOWNLOAD_AREA_KEYFRAME) || "{}";
                return Object.assign({}, {
                    start: "t - 200vh",
                    end: "b + 100vh",
                    event: "PictureLazyLoading"
                }, JSON.parse(e))
            }
            _imageLoadedEvent(t) {
                t.target.parentElement.setAttribute(s.PICTURE_LOADED, "")
            }
            _addEventsToImages() {
                this._pictures.forEach(t=>{
                    t.querySelector("img").addEventListener("load", this._imageLoadedEvent)
                }
                )
            }
            _addKeyframesToImages() {
                this._pictures.forEach(t=>{
                    t.__scrollGroup = this.AnimSystem.getGroupForTarget(document.body),
                    this.AnimSystem.getGroupForTarget(t) && (t.__scrollGroup = this.AnimSystem.getGroupForTarget(t));
                    let e = this._defineKeyframeOptions(t);
                    t.__scrollGroup.addKeyframe(t, e).controller.once("PictureLazyLoading:enter", ()=>{
                        this._imageIsInLoadRange(t)
                    }
                    )
                }
                )
            }
            _imageIsInLoadRange(t) {
                this._downloadImage(t)
            }
            _downloadImage(t) {
                let e = t.querySelector("[data-empty]");
                e && t.removeChild(e)
            }
            _findAnim() {
                var t = Array.from(document.querySelectorAll("[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"));
                return t.map(t=>t._animInfo ? t._animInfo.group : null).filter(t=>null !== t),
                t[0] && t[0]._animInfo ? t[0]._animInfo.group.anim : (console.error("PictureLazyLoading: AnimSystem not found, please initialize anim before instantiating"),
                null)
            }
        }
        s.DATA_DOWNLOAD_AREA_KEYFRAME = "data-download-area-keyframe",
        s.DATA_ATTRIBUTE = "data-picture-lazy-load",
        s.PICTURE_LOADED = "data-picture-loaded",
        e.exports = s
    }
    , {}],
    152: [function(t, e, i) {
        "use strict";
        const s = t(151);
        e.exports = s
    }
    , {
        151: 151
    }],
    153: [function(t, e, i) {
        "use strict";
        e.exports = {
            lerp: function(t, e, i) {
                return e + (i - e) * t
            },
            map: function(t, e, i, s, n) {
                return s + (n - s) * (t - e) / (i - e)
            },
            mapClamp: function(t, e, i, s, n) {
                var r = s + (n - s) * (t - e) / (i - e);
                return Math.max(s, Math.min(n, r))
            },
            norm: function(t, e, i) {
                return (t - e) / (i - e)
            },
            clamp: function(t, e, i) {
                return Math.max(e, Math.min(i, t))
            },
            randFloat: function(t, e) {
                return Math.random() * (e - t) + t
            },
            randInt: function(t, e) {
                return Math.floor(Math.random() * (e - t) + t)
            }
        }
    }
    , {}],
    154: [function(t, e, i) {
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
    155: [function(t, e, i) {
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
                    return t.ua.indexOf("Firefox") > -1 && -1 === t.ua.indexOf("Opera")
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
                    return (t.ua.indexOf("Linux") > -1 || t.platform.indexOf("Linux") > -1) && -1 === t.ua.indexOf("Android")
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
    156: [function(t, e, i) {
        "use strict";
        var s = t(154)
          , n = t(155);
        function r(t, e) {
            if ("function" == typeof t.parseVersion)
                return t.parseVersion(e);
            var i, s = t.version || t.userAgent;
            "string" == typeof s && (s = [s]);
            for (var n, r = s.length, a = 0; a < r; a++)
                if ((n = e.match((i = s[a],
                new RegExp(i + "[a-zA-Z\\s/:]+([0-9_.]+)","i")))) && n.length > 1)
                    return n[1].replace(/_/g, ".");
            return !1
        }
        function a(t, e, i) {
            for (var s, n, a = t.length, o = 0; o < a; o++)
                if ("function" == typeof t[o].test ? !0 === t[o].test(i) && (s = t[o].name) : i.ua.indexOf(t[o].userAgent) > -1 && (s = t[o].name),
                s) {
                    if (e[s] = !0,
                    "string" == typeof (n = r(t[o], i.ua))) {
                        var h = n.split(".");
                        e.version.string = n,
                        h && h.length > 0 && (e.version.major = parseInt(h[0] || 0),
                        e.version.minor = parseInt(h[1] || 0),
                        e.version.patch = parseInt(h[2] || 0))
                    } else
                        "edge" === s && (e.version.string = "12.0.0",
                        e.version.major = "12",
                        e.version.minor = "0",
                        e.version.patch = "0");
                    return "function" == typeof t[o].parseDocumentMode && (e.version.documentMode = t[o].parseDocumentMode()),
                    e
                }
            return e
        }
        e.exports = function(t) {
            var e = {};
            return e.browser = a(n.browser, s.browser, t),
            e.os = a(n.os, s.os, t),
            e
        }
    }
    , {
        154: 154,
        155: 155
    }],
    157: [function(t, e, i) {
        "use strict";
        var s = {
            ua: window.navigator.userAgent,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor
        };
        e.exports = t(156)(s)
    }
    , {
        156: 156
    }],
    158: [function(t, e, i) {
        "use strict";
        var s = t(21).EventEmitterMicro
          , n = t(45)
          , r = "viewport-emitter"
          , a = {
            removeNamespace: !0
        }
          , o = "data-viewport-emitter-dispatch"
          , h = "data-viewport-emitter-state"
          , l = "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)"
          , c = "only screen and (orientation: portrait)"
          , u = "only screen and (orientation: landscape)"
          , d = "change:any"
          , m = "change:orientation"
          , p = "change:retina"
          , f = "change:viewport";
        function _(t, e) {
            s.call(this),
            this._id = t || r,
            this._options = Object.assign({}, a, e),
            this._allowDOMEventDispatch = !1,
            this._allowElementStateData = !1,
            this._options.removeNamespace = "boolean" != typeof this._options.removeNamespace || this._options.removeNamespace,
            this._el = this._initViewportEl(this._id),
            this._resizing = !1,
            this._mediaQueryLists = {
                resolution: {
                    retina: window.matchMedia(l)
                },
                orientation: {
                    portrait: window.matchMedia(c),
                    landscape: window.matchMedia(u)
                }
            },
            this._viewport = this._getViewport(this._options.removeNamespace),
            this._retina = this._getRetina(this._mediaQueryLists.resolution.retina),
            this._orientation = this._initOrientation(),
            this._addListeners(),
            this._updateElementStateData()
        }
        Object.defineProperty(_, "DOM_DISPATCH_ATTRIBUTE", {
            get: function() {
                return o
            }
        }),
        Object.defineProperty(_, "DOM_STATE_ATTRIBUTE", {
            get: function() {
                return h
            }
        });
        var y = _.prototype = Object.create(s.prototype);
        Object.defineProperty(y, "id", {
            get: function() {
                return this._id
            }
        }),
        Object.defineProperty(y, "element", {
            get: function() {
                return this._el
            }
        }),
        Object.defineProperty(y, "mediaQueryLists", {
            get: function() {
                return this._mediaQueryLists
            }
        }),
        Object.defineProperty(y, "viewport", {
            get: function() {
                return this._viewport
            }
        }),
        Object.defineProperty(y, "retina", {
            get: function() {
                return this._retina
            }
        }),
        Object.defineProperty(y, "orientation", {
            get: function() {
                return this._orientation
            }
        }),
        Object.defineProperty(y, "hasDomDispatch", {
            get: function() {
                return this._allowDOMEventDispatch
            }
        }),
        y.destroy = function() {
            for (var t in this._removeListeners(),
            this._options)
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
        y._initViewportEl = function(t) {
            var e = document.getElementById(t);
            return e || ((e = document.createElement("div")).id = t,
            e = document.body.appendChild(e)),
            e.hasAttribute(o) || (e.setAttribute(o, ""),
            this._allowDOMEventDispatch = !0),
            e.hasAttribute(h) || (this._allowElementStateData = !0),
            e
        }
        ,
        y._dispatch = function(t, e) {
            var i = {
                viewport: this._viewport,
                orientation: this._orientation,
                retina: this._retina
            };
            if (this._allowDOMEventDispatch) {
                var s = new CustomEvent(t,{
                    detail: e
                })
                  , n = new CustomEvent(d,{
                    detail: i
                });
                this._el.dispatchEvent(s),
                this._el.dispatchEvent(n)
            }
            this.trigger(t, e),
            this.trigger(d, i)
        }
        ,
        y._addListeners = function() {
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
        y._removeListeners = function() {
            this._mediaQueryLists.orientation.portrait.removeListener(this._onOrientationChange),
            this._mediaQueryLists.orientation.landscape.removeListener(this._onOrientationChange),
            this._mediaQueryLists.resolution.retina.removeListener(this._onRetinaChange),
            window.removeEventListener("resize", this._onViewportChange)
        }
        ,
        y._updateElementStateData = function() {
            if (this._allowElementStateData) {
                var t = JSON.stringify({
                    viewport: this._viewport,
                    orientation: this._orientation,
                    retina: this._retina
                });
                this._el.setAttribute(h, t)
            }
        }
        ,
        y._getViewport = function(t) {
            var e = window.getComputedStyle(this._el, "::before").content;
            return e ? (e = e.replace(/["']/g, ""),
            t ? e.split(":").pop() : e) : null
        }
        ,
        y._getRetina = function(t) {
            return t.matches
        }
        ,
        y._getOrientation = function(t) {
            var e = this._orientation;
            if (t.matches) {
                return t.media.match(/portrait|landscape/)[0]
            }
            return e
        }
        ,
        y._initOrientation = function() {
            var t = this._getOrientation(this._mediaQueryLists.orientation.portrait);
            return t || this._getOrientation(this._mediaQueryLists.orientation.landscape)
        }
        ,
        y._onViewportChange = function() {
            this._resizing || (this._resizing = !0,
            n(this._onViewportChangeUpdate))
        }
        ,
        y._onViewportChangeUpdate = function() {
            var t = this._viewport;
            if (this._viewport = this._getViewport(this._options.removeNamespace),
            t !== this._viewport) {
                var e = {
                    from: t,
                    to: this._viewport
                };
                this._updateElementStateData(),
                this._dispatch(f, e)
            }
            this._resizing = !1
        }
        ,
        y._onRetinaChange = function(t) {
            var e = this._retina;
            if (this._retina = this._getRetina(t),
            e !== this._retina) {
                var i = {
                    from: e,
                    to: this._retina
                };
                this._updateElementStateData(),
                this._dispatch(p, i)
            }
        }
        ,
        y._onOrientationChange = function(t) {
            var e = this._orientation;
            if (this._orientation = this._getOrientation(t),
            e !== this._orientation) {
                var i = {
                    from: e,
                    to: this._orientation
                };
                this._updateElementStateData(),
                this._dispatch(m, i)
            }
        }
        ,
        e.exports = _
    }
    , {
        21: 21,
        45: 45
    }],
    159: [function(t, e, i) {
        "use strict";
        var s = t(158);
        e.exports = new s
    }
    , {
        158: 158
    }],
    160: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t = new Float32Array(16);
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
    }
    , {}],
    161: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = Math.sin(i)
              , n = Math.cos(i)
              , r = e[4]
              , a = e[5]
              , o = e[6]
              , h = e[7]
              , l = e[8]
              , c = e[9]
              , u = e[10]
              , d = e[11];
            e !== t && (t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
            return t[4] = r * n + l * s,
            t[5] = a * n + c * s,
            t[6] = o * n + u * s,
            t[7] = h * n + d * s,
            t[8] = l * n - r * s,
            t[9] = c * n - a * s,
            t[10] = u * n - o * s,
            t[11] = d * n - h * s,
            t
        }
    }
    , {}],
    162: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = Math.sin(i)
              , n = Math.cos(i)
              , r = e[0]
              , a = e[1]
              , o = e[2]
              , h = e[3]
              , l = e[8]
              , c = e[9]
              , u = e[10]
              , d = e[11];
            e !== t && (t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
            return t[0] = r * n - l * s,
            t[1] = a * n - c * s,
            t[2] = o * n - u * s,
            t[3] = h * n - d * s,
            t[8] = r * s + l * n,
            t[9] = a * s + c * n,
            t[10] = o * s + u * n,
            t[11] = h * s + d * n,
            t
        }
    }
    , {}],
    163: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = Math.sin(i)
              , n = Math.cos(i)
              , r = e[0]
              , a = e[1]
              , o = e[2]
              , h = e[3]
              , l = e[4]
              , c = e[5]
              , u = e[6]
              , d = e[7];
            e !== t && (t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
            return t[0] = r * n + l * s,
            t[1] = a * n + c * s,
            t[2] = o * n + u * s,
            t[3] = h * n + d * s,
            t[4] = l * n - r * s,
            t[5] = c * n - a * s,
            t[6] = u * n - o * s,
            t[7] = d * n - h * s,
            t
        }
    }
    , {}],
    164: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = i[0]
              , n = i[1]
              , r = i[2];
            return t[0] = e[0] * s,
            t[1] = e[1] * s,
            t[2] = e[2] * s,
            t[3] = e[3] * s,
            t[4] = e[4] * n,
            t[5] = e[5] * n,
            t[6] = e[6] * n,
            t[7] = e[7] * n,
            t[8] = e[8] * r,
            t[9] = e[9] * r,
            t[10] = e[10] * r,
            t[11] = e[11] * r,
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15],
            t
        }
    }
    , {}],
    165: [function(t, e, i) {
        "use strict";
        const s = t(181)
          , n = t(134)
          , r = t(141)
          , a = t(149)
          , o = t(144)
          , h = t(146)
          , l = t(138)
          , c = {
            beforeCreate() {
                this.model.PrefersReducedMotion = s.REDUCED_MOTION
            }
        }
          , u = {
            itemsCreated() {
                this.classicLink = this.el.querySelector(".ar-link-classic"),
                this.modernLink = this.el.querySelector(".ar-link-modern"),
                this._items.forEach(t=>{
                    t.classicURL = t.el.getAttribute("data-quicklook-classic-url"),
                    t.modernURL = t.el.getAttribute("data-quicklook-modern-url"),
                    t.accessibilityLabel = t.el.getAttribute("data-quicklook-accessibility-label")
                }
                )
            },
            onItemChangeOccurred() {
                const t = this.selections.occurred.current;
                this.classicLink.href = t.classicURL,
                this.modernLink.href = t.modernURL,
                this.classicLink.ariaLabel = t.accessibilityLabel,
                this.modernLink.ariaLabel = t.accessibilityLabel
            }
        }
          , d = n.withMixins(c, u, r, a, o, h, l);
        d.IS_SUPPORTED = function() {
            return !0
        }
        ,
        e.exports = d
    }
    , {
        134: 134,
        138: 138,
        141: 141,
        144: 144,
        146: 146,
        149: 149,
        181: 181
    }],
    166: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(181)
          , r = t(41);
        e.exports = class extends s {
            constructor(e) {
                super(e);
                const i = t(134)
                  , s = t(136)
                  , a = t(148)
                  , o = t(141)
                  , h = t(149)
                  , l = t(146)
                  , c = s.combine([{
                    mixin: a,
                    breakpointMask: "XLM"
                }, {
                    mixin: o,
                    breakpointMask: "S"
                }])
                  , u = {
                    beforeCreate() {
                        this.model.PrefersReducedMotion = n.REDUCED_MOTION,
                        this.setDurationAndEase()
                    },
                    setDurationAndEase() {
                        const t = this.model.pageMetrics.breakpoint
                          , e = "S" === t ? this.model.Fade.duration : this.model.Slide.duration;
                        this.model.duration = this.model.PrefersReducedMotion ? .001 : e;
                        const i = this.model.IsTouch ? "cubic-bezier(0.215, 0.61, 0.355, 1)" : "cubic-bezier(0.645, 0.045, 0.355, 1)";
                        this.model.ease = "S" === t ? "cubic-bezier(0.645, 0.045, 0.355, 1)" : i
                    },
                    onBreakpointChange() {
                        this.setDurationAndEase()
                    }
                }
                  , d = {
                    beforeCreate() {
                        this.sideEls = this.el.querySelectorAll(".side-container-item"),
                        this.sideZIndex = 1,
                        this.sideZindexTimer = null
                    },
                    updateSideGallery(t) {
                        clearTimeout(this.sideZindexTimer);
                        const e = this.sideEls[t];
                        e.style.transition = "none",
                        e.style.opacity = 0,
                        e.style.zIndex = this.sideZIndex++,
                        r(()=>{
                            this.sideEls.forEach(t=>t.setAttribute("aria-hidden", "true")),
                            e.style.transition = "opacity ".concat(this.model.duration, "s ").concat(this.model.ease),
                            e.style.opacity = 1,
                            e.removeAttribute("aria-hidden")
                        }
                        ),
                        this.sideZindexTimer = setTimeout(()=>{
                            this.sideZIndex = 1,
                            this.sideEls.forEach(t=>t.style.zIndex = null),
                            e.style.zIndex = this.sideZIndex++
                        }
                        , 1e3 * this.model.duration + 200)
                    },
                    onItemChangeInitiated() {
                        this.updateSideGallery(this.selections.initiated.next.index)
                    }
                }
                  , m = {
                    mounted() {
                        let t;
                        this.timerInterval = null,
                        this.controls = {
                            play: this.el.querySelector(".play-icon"),
                            pause: this.el.querySelector(".pause-icon")
                        };
                        const e = ()=>{
                            this.animateToItem(this.currentIndex + 1)
                        }
                          , i = e=>{
                            const i = this.controls[e]
                              , s = "play" === e ? this.controls.pause : this.controls.play
                              , n = document.activeElement === s;
                            i.disabled = !1,
                            i.removeAttribute("aria-hidden"),
                            s.disabled = !0,
                            s.setAttribute("aria-hidden", "true"),
                            n && t.isCurrentlyInRange && i.focus()
                        }
                          , s = ()=>{
                            clearInterval(this.timerInterval),
                            i("play")
                        }
                        ;
                        this.pauseGalleryByUser = ()=>{
                            this.pausedByUser = !0,
                            s()
                        }
                        ;
                        const n = ()=>{
                            this.selections.completed.current && e(),
                            clearInterval(this.timerInterval),
                            this.timerInterval = setInterval(()=>{
                                this.lastInteractionEvent = null,
                                e()
                            }
                            , 3e3),
                            i("pause")
                        }
                        ;
                        this.controls.play.addEventListener("click", t=>{
                            this.lastInteractionEvent = t,
                            this.pausedByUser = !1,
                            n()
                        }
                        ),
                        this.controls.pause.addEventListener("click", this.pauseGalleryByUser),
                        this.tabNav.items.forEach(t=>{
                            t.el.addEventListener("click", this.pauseGalleryByUser),
                            t.anchorEl.addEventListener("focus", this.pauseGalleryByUser)
                        }
                        ),
                        this._items.forEach(t=>{
                            t.el.addEventListener("focus", this.pauseGalleryByUser)
                        }
                        ),
                        this.anim.addEvent(this.el, {
                            start: "t - 20vh",
                            end: "t + 20vh",
                            event: "start-color-gallery-timer",
                            onEnterOnce: ()=>{
                                this.el.classList.add("started-timer"),
                                this.model.PrefersReducedMotion && s()
                            }
                        }),
                        t = this.anim.addEvent(this.el, {
                            start: "t - 100vh",
                            end: "b",
                            event: "playGallery",
                            onEnter: ()=>{
                                this.pausedByUser || this.model.PrefersReducedMotion || (this.lastInteractionEvent = null,
                                n())
                            }
                            ,
                            onExit: ()=>s()
                        })
                    }
                }
                  , p = ["INPUT", "SELECT", "TEXTAREA"]
                  , f = {
                    created() {
                        this.onKeyDown = this.onKeyDown.bind(this),
                        this.inViewKeyframe = this.addDiscreteEvent({
                            event: "Gallery: In View",
                            start: "t - 100vh",
                            end: "b + 100%",
                            onEnter: ()=>window.addEventListener("keydown", this.onKeyDown),
                            onExit: ()=>window.removeEventListener("keydown", this.onKeyDown)
                        }),
                        Object.defineProperty(this, "isInView", {
                            configurable: !0,
                            get: ()=>null != this.inViewKeyframe && this.inViewKeyframe.isCurrentlyInRange
                        })
                    },
                    destroy() {
                        this.inViewKeyframe.remove(),
                        this.inViewKeyframe = null,
                        window.removeEventListener("keydown", this.onKeyDown)
                    },
                    onKeyDown(t) {
                        if (this.isInView && !this.inputHasFocus() && (37 === t.keyCode || 39 === t.keyCode)) {
                            this.pauseGalleryByUser();
                            let e = this.model.IsRTL ? -1 : 1
                              , i = 37 === t.keyCode ? -1 : 1;
                            this.lastInteractionEvent = t;
                            const s = this.currentIndex + i * e;
                            this.animateToItem(s)
                        }
                    },
                    inputHasFocus: function() {
                        return -1 !== p.indexOf(document.activeElement.nodeName)
                    }
                };
                let _;
                try {
                    _ = t("@marcom/ac-analytics").observer.Gallery
                } catch (t) {}
                const y = {
                    created() {
                        this.analytics = {
                            lastTrackedItem: null,
                            observer: null,
                            events: {
                                UPDATE: "update",
                                UPDATE_COMPLETE: "update:complete"
                            }
                        }
                    },
                    mounted() {
                        if (_) {
                            let t = this.el.getAttribute("id");
                            t || (console.warn("No ID attribute found on the Mixin Gallery element - please add an ID", this),
                            t = "null"),
                            this.analytics.observer = new _(this,{
                                galleryName: t,
                                beforeUpdateEvent: this.analytics.events.UPDATE,
                                afterUpdateEvent: this.analytics.events.UPDATE_COMPLETE,
                                trackAutoRotate: !1
                            })
                        }
                    },
                    onItemChangeCompleted(t) {
                        if (!t.previous || t.current === this.analytics.lastTrackedItem || t.current === t.previous && !this.analytics.lastTrackedItem || !this.lastInteractionEvent)
                            return;
                        this.analytics.lastTrackedItem = t.current;
                        let e = {
                            incoming: {
                                id: t.current.id
                            },
                            outgoing: {
                                id: t.previous.id
                            },
                            interactionEvent: this.lastInteractionEvent
                        };
                        this.trigger(this.analytics.events.UPDATE_COMPLETE, e)
                    }
                };
                this.anim.addKeyframe(this.el, {
                    start: "t - 130vh",
                    end: "b + 30vh",
                    cssClass: ["near-section"],
                    toggle: !0
                });
                new (i.withMixins(u, c, d, m, h, f, l, y))({
                    el: this.el
                })
            }
        }
    }
    , {
        134: 134,
        136: 136,
        141: 141,
        146: 146,
        148: 148,
        149: 149,
        181: 181,
        41: 41,
        80: 80,
        undefined: void 0
    }],
    167: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(159)
          , r = t(181);
        e.exports = class extends s {
            constructor(t) {
                super(t),
                this.videoWrapperEl = this.el.querySelector(".video-wrapper"),
                this.videoEl = this.videoWrapperEl.querySelector("video"),
                this.basePath = this.el.getAttribute("data-video-base-path"),
                this.controlsEl = this.el.querySelector(".controls"),
                this.onCanPlayThrough = this.onCanPlayThrough.bind(this),
                this.tryToPlay = this.tryToPlay.bind(this),
                this.createKeyframe(),
                this.initVideo(),
                this.initVideoControls()
            }
            initVideo() {
                this.src = this.basePath + "/" + n.viewport.replace("xs", "s").replace("-wide", "") + (n.retina ? "_2x" : "") + ".mp4",
                this.videoEl.addEventListener("canplaythrough", this.onCanPlayThrough),
                this.videoEl.src = this.src,
                this.videoEl.load()
            }
            initVideoControls() {
                this.controlsEl && (this.onPauseIconClick = this.onPauseIconClick.bind(this),
                this.onPlayIconClick = this.onPlayIconClick.bind(this),
                this.controlsEl.style.display = "block",
                this.pauseEl = this.controlsEl.querySelector(".pause-icon"),
                this.playEl = this.controlsEl.querySelector(".play-icon"),
                this.pauseEl.addEventListener("click", this.onPauseIconClick),
                this.playEl.addEventListener("click", this.onPlayIconClick))
            }
            createKeyframe() {
                this.keyframe = this.anim.addEvent(this.el, {
                    start: "t - 100vh",
                    end: "b + 100vh",
                    event: "play-pause",
                    onEnter: ()=>{
                        this.tryToPlay()
                    }
                })
            }
            onCanPlayThrough() {
                this.videoWrapperEl.classList.add("enhanced"),
                this.canPlay = !0,
                this.controlsEl && this.controlsEl.classList.add("enhanced")
            }
            onPlayIconClick() {
                this.videoEl && (this.paused = !1,
                this.tryToPlay(),
                this.pauseEl.focus(),
                this.pauseEl.setAttribute("aria-hidden", !1),
                this.playEl.setAttribute("aria-hidden", !0))
            }
            tryToPlay() {
                this.canPlay ? this.paused || (this.videoEl.play(),
                this.controlsEl.classList.remove("paused")) : window.setTimeout(this.tryToPlay, 500)
            }
            onPauseIconClick() {
                this.videoEl && (this.paused = !0,
                this.videoEl.pause(),
                this.controlsEl.classList.add("paused"),
                this.playEl.focus(),
                this.playEl.setAttribute("aria-hidden", !1),
                this.pauseEl.setAttribute("aria-hidden", !0))
            }
            onBreakpointChange(t) {
                this.destroy(),
                this.controlsEl.style.display = "none"
            }
            destroy() {
                this.destroyed || (this.destroyed = !0,
                this.videoWrapperEl.classList.remove("enhance"),
                this.el.classList.add("fallback"),
                this.videoWrapperEl.removeChild(this.videoEl))
            }
            static IS_SUPPORTED() {
                return !r.REDUCED_MOTION && !r.AOW && !r.FIREFOX
            }
        }
    }
    , {
        159: 159,
        181: 181,
        80: 80
    }],
    168: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(181);
        e.exports = class extends s {
            constructor(e) {
                super(e);
                const i = t(134)
                  , s = t(141)
                  , r = t(149)
                  , a = t(144)
                  , o = t(146)
                  , h = t(138)
                  , l = {
                    beforeCreate() {
                        this.model.PrefersReducedMotion = n.REDUCED_MOTION
                    }
                };
                this.anim.addKeyframe(this.el, {
                    start: "t - 130vh",
                    end: "b + 30vh",
                    cssClass: ["near-section"],
                    toggle: !0
                });
                new (i.withMixins(l, s, r, a, o, h))({
                    el: this.el
                })
            }
        }
    }
    , {
        134: 134,
        138: 138,
        141: 141,
        144: 144,
        146: 146,
        149: 149,
        181: 181,
        80: 80
    }],
    169: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = (t(53),
        t(31))
          , r = t(15)
          , a = t(51)
          , o = t(182)
          , h = t(181)
          , l = {
            large: {
                width: 1004,
                height: 1214
            },
            medium: {
                width: 674,
                height: 818
            },
            small: {
                width: 960,
                height: 1156
            }
        }
          , c = {
            large: 570,
            medium: 470,
            small: 415
        };
        e.exports = class extends s {
            constructor(t) {
                super(t),
                this.canvasWrapperEl = this.el.querySelector(".canvas-wrapper"),
                this.canvasEl = this.canvasWrapperEl.querySelector("canvas"),
                this.stickyWrapperEl = this.el.querySelector(".sticky-wrapper"),
                this.stickyInnerEl = this.el.querySelector(".sticky-inner"),
                this.frameImgEl = this.canvasWrapperEl.querySelector(".overview-design-hero-frame"),
                this.cupImgEl = this.canvasWrapperEl.querySelector(".overview-design-hero-cups"),
                this.followingEl = this.el.nextElementSibling,
                this.canopyCaptionEl = this.el.querySelector(".canopy-caption"),
                this.frameCaptionEl = this.el.querySelector(".frame-caption"),
                this.teleCaptionEl = this.el.querySelector(".tele-caption"),
                this.cupsCaptionEl = this.el.querySelector(".cups-caption"),
                this.captionWrapperEl = this.el.querySelector(".captions"),
                this.captionsUnderEl = this.el.querySelector(".captions-under"),
                this.static = h.REDUCED_MOTION || h.AOW,
                this.group = this.anim.getGroupForTarget(this.el),
                this.cupImgLoaded = !1,
                this.rotateLoaded = !1,
                this.onTurnDraw = this.onTurnDraw.bind(this),
                this.updateHwKeyframes = this.updateHwKeyframes.bind(this),
                this.updateCaptionKeyframes = this.updateCaptionKeyframes.bind(this)
            }
            mounted() {
                this.measure(),
                this.style(),
                this.rotateSequence = new o({
                    el: this.canvasWrapperEl,
                    canvasEl: this.canvasEl,
                    basePath: "/105/media/us/airpods-max/2020/996b980b-3131-44f1-af6c-fe72f9b3bfb5/anim/turn",
                    startFrame: 0,
                    endFrame: 45,
                    extension: "jpg"
                }),
                this.style(),
                this.createHwKeyframes(),
                this.createCaptionKeyframes(),
                this.loadImages()
            }
            loadImages() {
                this.static || (this.rotateSequence.on("loaded", ()=>{
                    this.rotateLoaded = !0,
                    this.checkLoaded()
                }
                ),
                this.rotateSequence.load())
            }
            checkLoaded() {
                this.rotateLoaded && !this.enhanced && (this.enhanced = !0,
                this.enhance())
            }
            measure() {
                this.rotateDistance = 700,
                this.teleDistance = 300,
                this.teleAmount = 100,
                this.rotateProgressRatio = this.rotateDistance / (this.rotateDistance + this.teleDistance),
                this.smallTeleDistance = 300,
                this.smallScaleTarget = .875 * this.pageMetrics.windowWidth / 960,
                this.smallTranslateDistance = Math.max(910 - .5 * this.pageMetrics.windowHeight, 0),
                this.viewport = a.viewport.replace("x", "").replace("-wide", ""),
                this.captionsUnderTranslate = parseInt(getComputedStyle(this.stickyWrapperEl).marginBottom, 10) + ("small" == this.viewport ? .1 * this.pageMetrics.windowHeight : 0);
                const t = this.canvasWrapperEl.offsetWidth / this.canvasWrapperEl.offsetHeight
                  , e = l[this.viewport].width / l[this.viewport].height;
                this.startScale = 1 / 1.5,
                this.cupsCaptionStart = "small" == this.viewport ? 0 : this.captionsUnderTranslate / 2 - 2 * this.cupsCaptionEl.offsetHeight / 3,
                this.stickyInnerHeight = t > e ? 1.5 * this.pageMetrics.windowHeight : this.pageMetrics.windowWidth * e * 1.5
            }
            style() {
                if (this.pageMetrics.windowHeight < c[this.viewport] || this.static ? this.el.classList.add("static") : this.el.classList.remove("static"),
                "small" !== this.viewport)
                    this.stickyInnerEl.style.height = this.stickyInnerHeight + "px",
                    this.stickyWrapperEl.style.height = this.stickyInnerHeight + this.teleDistance + this.rotateDistance + "px",
                    this.followingEl.style.marginTop = "0",
                    this.captionsUnderEl.style.bottom = "0";
                else {
                    const t = this.rotateDistance + this.smallTranslateDistance + this.smallTeleDistance;
                    this.stickyInnerEl.style.height = l[this.viewport].height + "px",
                    this.stickyWrapperEl.style.height = l[this.viewport].height + t + "px",
                    this.followingEl.style.marginTop = "calc(10vh - " + this.smallTranslateDistance + "px)",
                    this.captionsUnderEl.style.bottom = this.smallTranslateDistance + "px"
                }
                this.captionsUnderEl.style[r.transform] = "translate(-50%," + this.captionsUnderTranslate + "px)",
                this.anim.forceUpdate()
            }
            enhance() {
                let t = !1;
                const e = this.addDiscreteEvent({
                    el: this.stickyWrapperEl,
                    start: "t - 100vh",
                    end: "b + 100vh",
                    event: "out-of-view",
                    onExitOnce: ()=>{
                        t || (t = !0,
                        this.el.classList.add("enhanced"))
                    }
                })
                  , i = ()=>{
                    if (e.isEnabled) {
                        if (!e.isCurrentlyInRange && !t) {
                            t = !0;
                            const e = this.rotateKeyframe.localT;
                            this.onTurnDraw({
                                tweenProps: {
                                    progress: {
                                        current: e
                                    }
                                }
                            }),
                            this.el.classList.add("enhanced")
                        }
                    } else
                        setTimeout(i, 300)
                }
                ;
                i();
                this.anim.getControllerForTarget(this.canvasWrapperEl).on("draw", this.onTurnDraw)
            }
            createCaptionKeyframes() {
                const t = "small" == this.viewport ? "a0t - 45vh + " + .6 * this.rotateDistance + "px" : "a0t + " + .6 * this.rotateDistance + "px"
                  , e = "small" == this.viewport ? "a0t - 50vh + " + this.rotateDistance + "px" : "a0t + " + .6 * this.rotateDistance + "px";
                this.canopyCaptionKeyframe = this.addKeyframe({
                    el: this.canopyCaptionEl,
                    start: t,
                    end: e,
                    cssClass: "show",
                    toggle: "true",
                    anchors: [".section-design .sticky-wrapper"]
                });
                const i = "small" == this.viewport ? "a0t - 40vh + " + this.rotateDistance + "px" : "a0t + " + .9 * this.rotateDistance + "px";
                this.frameCaptionKeyframe = this.addKeyframe({
                    el: this.frameCaptionEl,
                    start: i,
                    cssClass: "show",
                    toggle: "true",
                    anchors: [".section-design .sticky-wrapper"]
                }),
                this.cupsCaptionKeyframe = this.addKeyframe({
                    el: this.cupsCaptionEl,
                    start: "a0t - 100vh - " + this.cupsCaptionStart + "px",
                    cssClass: "show",
                    toggle: "true",
                    anchors: [".section-design .triptych"]
                });
                const s = "small" == this.viewport ? "a0t - 40vh + " + (this.rotateDistance + this.smallTranslateDistance) + "px" : "a0t + " + (this.rotateDistance + 100) + "px";
                this.teleCaptionKeyframe = this.addKeyframe({
                    el: this.teleCaptionEl,
                    start: s,
                    cssClass: "show",
                    toggle: "true",
                    anchors: [".section-design .sticky-wrapper"]
                })
            }
            updateCaptionKeyframes() {
                const t = "small" == this.viewport ? "a0t - 45vh + " + .4 * this.rotateDistance + "px" : "a0t + " + .6 * this.rotateDistance + "px"
                  , e = "small" == this.viewport ? "a0t - 45vh + " + .9 * this.rotateDistance + "px" : "a0t + " + .6 * this.rotateDistance + "px";
                this.canopyCaptionKeyframe.overwriteProps({
                    start: t,
                    end: e
                });
                const i = "small" == this.viewport ? "a0t - 45vh + " + this.rotateDistance + "px" : "a0t + " + .9 * this.rotateDistance + "px";
                this.frameCaptionKeyframe.overwriteProps({
                    start: i,
                    end: i
                });
                const s = "small" == this.viewport ? "a0t - 40vh + " + (this.rotateDistance + this.smallTranslateDistance) + "px" : "a0t + " + (this.rotateDistance + 100) + "px";
                this.teleCaptionKeyframe.overwriteProps({
                    start: s,
                    end: s
                })
            }
            createHwKeyframes() {
                this.rotateKeyframe = this.addKeyframe({
                    el: this.canvasWrapperEl,
                    start: "a0t",
                    end: "a0t + " + (this.rotateDistance + this.teleDistance) + "px",
                    ease: .4,
                    progress: [0, 1],
                    scale: [this.startScale, 1],
                    anchors: [".section-design .sticky-wrapper"],
                    breakpointMask: "XLM"
                }),
                this.rotateKeyframeSmall = this.addKeyframe({
                    el: this.canvasWrapperEl,
                    start: "a0t - 40vh",
                    end: "a0t - 40vh + " + (this.rotateDistance + this.teleDistance) + "px",
                    ease: .4,
                    progress: [0, 1],
                    anchors: [".section-design .sticky-wrapper"],
                    breakpointMask: "S"
                }),
                this.scaleKeyframeSmall = this.addKeyframe({
                    el: this.canvasWrapperEl,
                    start: "a0t - 40vh",
                    end: "a0t - 40vh + " + this.rotateDistance + "px",
                    ease: .4,
                    progress: [0, 1],
                    scale: [this.smallScaleTarget, 1],
                    y: [0, "10vh"],
                    anchors: [".section-design .sticky-wrapper"],
                    breakpointMask: "S"
                }),
                this.stainlessTranslateKeyframe = this.addKeyframe({
                    el: this.stickyInnerEl,
                    start: "a0t - 40vh + " + this.rotateDistance + "px",
                    end: "a0t - 40vh + " + (this.rotateDistance + this.smallTranslateDistance) + "px",
                    y: [0, -1 * this.smallTranslateDistance],
                    breakpointMask: "S",
                    anchors: [".section-design .sticky-wrapper"]
                }),
                this.teleKeyframeSmall = this.addKeyframe({
                    el: this.frameImgEl,
                    start: "a0t - 40vh + " + (this.rotateDistance + this.smallTranslateDistance) + "px",
                    end: "a0t - 40vh + " + (this.rotateDistance + this.smallTranslateDistance + this.smallTeleDistance) + "px",
                    y: [0, -this.teleAmount],
                    anchors: [".section-design .sticky-wrapper"],
                    breakpointMask: "S"
                })
            }
            updateHwKeyframes() {
                this.rotateKeyframe.overwriteProps({
                    end: "a0t + " + (this.rotateDistance + this.teleDistance) + "px"
                }),
                this.rotateKeyframeSmall.overwriteProps({
                    end: "a0t - 40vh + " + (this.rotateDistance + this.teleDistance) + "px"
                }),
                this.scaleKeyframeSmall.overwriteProps({
                    end: "a0t - 40vh + " + this.rotateDistance + "px",
                    scale: [this.smallScaleTarget, 1]
                }),
                this.stainlessTranslateKeyframe.overwriteProps({
                    start: "a0t - 40vh + " + this.rotateDistance + "px",
                    end: "a0t - 40vh + " + (this.rotateDistance + this.smallTranslateDistance) + "px",
                    y: [0, -1 * this.smallTranslateDistance]
                }),
                this.teleKeyframeSmall.overwriteProps({
                    start: "a0t - 40vh + " + (this.rotateDistance + this.smallTranslateDistance) + "px",
                    end: "a0t - 40vh + " + (this.rotateDistance + this.smallTranslateDistance + this.smallTeleDistance) + "px",
                    y: [0, -this.teleAmount]
                })
            }
            onTurnDraw(t) {
                if (this.destroyed)
                    return;
                if (t.tweenProps.progress.current > this.rotateProgressRatio ? (this.frameImgEl.classList.add("show"),
                this.cupImgEl.classList.add("show")) : (this.frameImgEl.classList.remove("show"),
                this.cupImgEl.classList.add("show")),
                t.tweenProps.progress.current <= this.rotateProgressRatio) {
                    const e = n(0, 1, t.tweenProps.progress.current / this.rotateProgressRatio);
                    return void this.rotateSequence.draw(e)
                }
                const e = n(0, 1, (t.tweenProps.progress.current - this.rotateProgressRatio) / (1 - this.rotateProgressRatio)) * -this.teleAmount;
                "small" !== this.viewport && (this.frameImgEl.style[r.transform] = "translateY(" + e + "px)"),
                this.rotateSequence.context.clearRect(0, 0, this.rotateSequence.width, this.rotateSequence.height)
            }
            onResizeDebounced(t) {
                this.measure(),
                this.style(),
                this.updateHwKeyframes(),
                this.updateCaptionKeyframes(),
                this.anim.forceUpdate()
            }
            onBreakpointChange() {
                this.destroy()
            }
            destroy() {
                this.destroyed = !0,
                this.rotateSequence.destroy(),
                this.el.classList.remove("enhanced")
            }
        }
    }
    , {
        15: 15,
        181: 181,
        182: 182,
        31: 31,
        51: 51,
        53: 53,
        80: 80
    }],
    170: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(51)
          , r = t(96).getPosition
          , a = t(96).getDimensions
          , o = t(181)
          , h = {
            "xlarge-wide": 200,
            xlarge: 200,
            large: 150,
            medium: 100,
            small: 24
        };
        e.exports = class extends s {
            constructor(t) {
                super(t),
                this.heroLockupEl = document.querySelector(".hero-lockup"),
                this.lockUpInnerEl = this.el.querySelector(".lockup-inner"),
                this.introEl = document.querySelector(".intro")
            }
            mounted() {
                const t = Array.from(this.el.querySelectorAll("img"));
                Promise.all(t.map(t=>new Promise(e=>{
                    if (t.complete)
                        e();
                    else {
                        const i = ()=>(t.removeEventListener("load", i),
                        e());
                        t.addEventListener("load", i)
                    }
                }
                ))).then(()=>{
                    this.measure(),
                    this.style(),
                    this.el.classList.add("show")
                }
                )
            }
            onResizeDebounced() {
                this.measure(),
                this.style()
            }
            measure() {
                this.lockupHeight = this.lockUpInnerEl.offsetHeight,
                this.heroHeight = this.heroLockupEl.offsetHeight,
                this.spaceBelow = this.heroHeight - (r(this.lockUpInnerEl, !0).top + a(this.lockUpInnerEl).height)
            }
            style() {
                let t = h[n.viewport] - this.spaceBelow;
                n.viewport.includes("large") && (t = Math.max(h[n.viewport] - this.spaceBelow, 0)),
                this.introEl.style.marginTop = t + "px",
                setTimeout(()=>{
                    this.anim.forceUpdate()
                }
                , 0)
            }
            static IS_SUPPORTED() {
                return !o.REDUCED_MOTION && !o.AOW
            }
        }
    }
    , {
        181: 181,
        51: 51,
        80: 80,
        96: 96
    }],
    171: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(51)
          , r = t(181);
        e.exports = class extends s {
            constructor(t) {
                super(t),
                this.videoEl = this.el.querySelector("video"),
                this.controlsEl = document.querySelector(".section-value-props .controls"),
                this.basePath = this.el.getAttribute("data-video-base-path"),
                this.anchor = this.el.getAttribute("data-anchor"),
                this.onCanPlayThrough = this.onCanPlayThrough.bind(this),
                this.tryToPlay = this.tryToPlay.bind(this),
                this.pause = this.pause.bind(this),
                this.createKeyframe(),
                this.initVideo(),
                this.initVideoControls()
            }
            initVideo(t) {
                this.paused = !1,
                this.canPlay = !1,
                this.src = this.basePath + "/" + n.viewport.replace("x", "").replace("-wide", "") + (n.retina ? "_2x" : "") + ".mp4",
                this.videoEl.ariaHidden = !0,
                this.videoEl.addEventListener("canplaythrough", this.onCanPlayThrough),
                this.videoEl.src = this.src,
                this.videoEl.load()
            }
            initVideoControls() {
                this.controlsEl && (this.onPauseIconClick = this.onPauseIconClick.bind(this),
                this.onPlayIconClick = this.onPlayIconClick.bind(this),
                this.controlsEl.style.display = "block",
                this.pauseEl = this.controlsEl.querySelector(".pause-icon"),
                this.playEl = this.controlsEl.querySelector(".play-icon"),
                this.pauseEl.addEventListener("click", this.onPauseIconClick),
                this.playEl.addEventListener("click", this.onPlayIconClick))
            }
            createKeyframe() {
                this.keyframe = this.anim.addEvent(this.el, {
                    start: "a0t - 100vh",
                    end: "a0b + 100vh",
                    event: "play-pause",
                    anchors: [this.anchor],
                    onEnter: ()=>{
                        this.tryToPlay()
                    }
                    ,
                    onExit: ()=>{
                        this.pause()
                    }
                })
            }
            onCanPlayThrough() {
                this.canPlay = !0,
                this.el.classList.add("enhanced"),
                this.controlsEl && this.controlsEl.classList.add("enhanced")
            }
            onPlayIconClick(t) {
                t.preventDefault(),
                this.videoEl && (this.paused = !1,
                this.tryToPlay(),
                this.pauseEl.focus(),
                this.pauseEl.setAttribute("aria-hidden", !1),
                this.playEl.setAttribute("aria-hidden", !0))
            }
            onPauseIconClick(t) {
                t.preventDefault(),
                this.videoEl && (this.paused = !0,
                this.pause(),
                this.controlsEl.classList.add("paused"),
                this.playEl.focus(),
                this.playEl.setAttribute("aria-hidden", !1),
                this.pauseEl.setAttribute("aria-hidden", !0))
            }
            pause() {
                this.videoEl.pause()
            }
            tryToPlay() {
                this.canPlay ? this.paused || (this.videoEl.play(),
                this.controlsEl.classList.remove("paused")) : window.setTimeout(this.tryToPlay, 500)
            }
            static IS_SUPPORTED() {
                return !r.REDUCED_MOTION && !r.AOW && !r.FIREFOX
            }
        }
    }
    , {
        181: 181,
        51: 51,
        80: 80
    }],
    172: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = [{
            name: "small-shorter",
            mq: "only screen and (max-width: 734px)  and (max-height: 552px)"
        }, {
            name: "medium-short",
            mq: "only screen and (min-width: 735px)  and (max-width: 1068px) and (max-height: 750px)"
        }, {
            name: "medium-shorter",
            mq: "only screen and (min-width: 735px)  and (max-width: 1068px) and (max-height: 475px)"
        }, {
            name: "large-up-short",
            mq: "only screen and (min-width: 1069px) and (max-height: 725px)"
        }, {
            name: "large-up-shorter",
            mq: "only screen and (min-width: 1069px) and (max-height: 500px)"
        }];
        e.exports = class extends s {
            constructor(t) {
                super(t),
                this.mediaQueries = n.map(t=>{
                    const e = window.matchMedia(t.mq);
                    return e.matches && this.addMQClass(t),
                    e.addListener(e=>{
                        e.matches ? this.addMQClass(t) : this.removeMQClass(t)
                    }
                    ),
                    e
                }
                )
            }
            addMQClass(t) {
                document.documentElement.classList.add("mq-".concat(t.name)),
                this.anim.forceUpdate({
                    silent: !1,
                    waitForNextUpdate: !0
                })
            }
            removeMQClass(t) {
                document.documentElement.classList.remove("mq-".concat(t.name)),
                this.anim.forceUpdate({
                    silent: !1,
                    waitForNextUpdate: !0
                })
            }
            destroy(t) {}
        }
    }
    , {
        80: 80
    }],
    173: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(181);
        e.exports = class extends s {
            constructor(t) {
                super(t);
                const e = this.el.querySelector(".more-magic")
                  , i = e.querySelectorAll(".more-magic-copy-block");
                this.anim.addKeyframe(e, {
                    start: "t - 50vh",
                    end: "b + 50vh",
                    cssClass: ["near-section"],
                    toggle: !0
                });
                let s = "t - 90vh";
                i.forEach(t=>{
                    const e = "".concat(s, " + 15vh");
                    this.anim.addKeyframe(t, {
                        start: s,
                        end: e,
                        y: [30, 0],
                        opacity: [0, 1]
                    }),
                    s = e
                }
                );
                const n = this.el.querySelector(".case")
                  , r = n.querySelector(".case-copy");
                this.anim.addKeyframe(n, {
                    start: "t - 130vh",
                    end: "b + 30vh",
                    cssClass: ["near-section"],
                    toggle: !0
                }),
                this.anim.addKeyframe(r, {
                    start: "t - 90vh",
                    end: "t - 75vh",
                    y: [30, 0],
                    opacity: [0, 1]
                });
                const a = n.querySelector(".case-image");
                this.anim.addKeyframe(a, {
                    start: "t - 90vh",
                    end: "t - 10vh",
                    scale: [1.15, 1]
                })
            }
            static IS_SUPPORTED() {
                return !n.REDUCED_MOTION
            }
        }
    }
    , {
        181: 181,
        80: 80
    }],
    174: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(181);
        e.exports = class extends s {
            constructor(t) {
                super(t);
                const e = this.el.querySelector(".parallax-img")
                  , i = e.querySelector("img");
                this.anim.addKeyframe(i, {
                    start: "a0t - 100vh",
                    end: "a0b - 10a0h - 48px",
                    ease: .15,
                    anchors: [e],
                    y: ["-10a0h", 0]
                }),
                this.anim.addKeyframe(this.el, {
                    start: "t - 140vh",
                    end: "b + 40vh",
                    cssClass: ["near-section"],
                    toggle: !0
                })
            }
            static IS_SUPPORTED() {
                return !n.REDUCED_MOTION
            }
        }
    }
    , {
        181: 181,
        80: 80
    }],
    175: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(181);
        e.exports = class extends s {
            constructor(t) {
                super(t)
            }
            mounted() {
                this.images = this.el.querySelectorAll(".screen"),
                this.copyBlocks = this.el.querySelectorAll(".screen-sequence-copy"),
                this.stickyEl = this.el.querySelector(".sticky-el"),
                this.enterScreen = new Event("enter-screen"),
                this.exitScreen = new Event("exit-screen"),
                this.anim.addKeyframe(this.el, {
                    start: "t - 130vh",
                    end: "b + 30vh",
                    cssClass: ["near-section"],
                    toggle: !0
                }),
                this.animateCopyAndImages("a0t + 100a1h + css(bottom, a1) - 100vh", 70, "XLM"),
                this.animateCopyAndImages("a0t + 100a1h + css(bottom, a1) - 100vh", 25, "S")
            }
            animateCopyAndImages(t, e, i) {
                const s = n.REDUCED_MOTION;
                let r = t;
                const a = [this.el, this.stickyEl]
                  , o = "mq-small-shorter";
                this.copyBlocks.forEach((t,n)=>{
                    this.anim.addKeyframe(t, {
                        start: r,
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o,
                        cssClass: ["past-start"],
                        toggle: !0
                    });
                    const h = "".concat(r, " + ").concat("css(--fade-distance, a0)");
                    0 !== n && this.anim.addKeyframe(t, {
                        start: r,
                        end: s ? r : h,
                        opacity: [0, 1],
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o
                    }),
                    0 !== n && this.anim.addEvent(this.images[n], {
                        start: r,
                        event: "screen-image-".concat(n, "-").concat(i),
                        onEvent: ()=>this.images[n].classList.add("show"),
                        onEventReverse: ()=>this.images[n].classList.remove("show"),
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o
                    });
                    const l = "".concat(h, " + ").concat("css(--is-visible-distance, a0)")
                      , c = "".concat(l, " + ").concat("css(--fade-distance, a0)");
                    n !== this.copyBlocks.length - 1 && this.anim.addKeyframe(t, {
                        start: s ? c : l,
                        end: c,
                        opacity: [1, 0],
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o
                    }),
                    s || this.anim.addKeyframe(t, {
                        start: r,
                        end: c,
                        y: [e, -1 * e],
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o
                    }),
                    this.anim.addEvent(t, {
                        start: r,
                        end: c,
                        event: "screen-image-".concat(n, "-synthetic-event-").concat(i),
                        onEnter: ()=>this.images[n].dispatchEvent(this.enterScreen),
                        onExit: ()=>this.images[n].dispatchEvent(this.exitScreen),
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o
                    }),
                    r = c
                }
                )
            }
            static IS_SUPPORTED() {
                return !0
            }
        }
    }
    , {
        181: 181,
        80: 80
    }],
    176: [function(t, e, i) {
        "use strict";
        var s = t(26)
          , n = s(t(113))
          , r = s(t(121))
          , a = s(t(126))
          , o = s(t(130));
        const h = t(80)
          , l = t(181);
        e.exports = class extends h {
            constructor(t) {
                super(t),
                this.setUpScreen = document.getElementById("set-up-screen"),
                this.init()
            }
            init() {
                this.inlineVideo = new n.default({
                    el: this.el,
                    plugins: [r.default, a.default, o.default],
                    basePath: this.el.dataset.videoBasePath,
                    anim: this.anim
                }),
                this.inlineVideo.load(),
                this.setUpScreen.addEventListener("enter-screen", ()=>{
                    this.inlineVideo.play()
                }
                ),
                this.setUpScreen.addEventListener("exit-screen", ()=>{
                    this.inlineVideo.el.pause(),
                    setTimeout(()=>{
                        this.inlineVideo.el.currentTime = 0
                    }
                    , 350)
                }
                )
            }
            onBreakpointChange(t) {}
            static IS_SUPPORTED() {
                return !l.REDUCED_MOTION && !l.AOW
            }
        }
    }
    , {
        113: 113,
        121: 121,
        126: 126,
        130: 130,
        181: 181,
        26: 26,
        80: 80
    }],
    177: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(181);
        e.exports = class extends s {
            constructor(t) {
                super(t);
                const e = this.el.querySelector(".spatial-audio-person");
                this.anim.addKeyframe(this.el, {
                    start: "a0b - 48a0h - 100vh",
                    cssClass: ["trigger-animation"],
                    anchors: [e],
                    toggle: !0,
                    breakpointMask: "XLM"
                }),
                this.anim.addKeyframe(this.el, {
                    start: "a0b - 42a0h - 100vh",
                    cssClass: ["trigger-animation"],
                    anchors: [e],
                    toggle: !0,
                    breakpointMask: "S"
                });
                const i = this.el.querySelector(".spatial-audio-copy");
                this.anim.addKeyframe(this.el, {
                    start: "a0b - 100vh",
                    cssClass: ["dim-rings"],
                    anchors: [i],
                    toggle: !0,
                    breakpointMask: "XLM"
                }),
                this.anim.addKeyframe(i, {
                    start: "t - 100vh",
                    end: "b",
                    ease: .2,
                    y: [-25, 25],
                    breakpointMask: "XLM"
                });
                this.el.querySelectorAll(".spatial-ring").forEach(t=>{
                    this.anim.addKeyframe(t, {
                        start: "t - 100vh",
                        end: "b",
                        ease: .2,
                        y: [-35, 35],
                        breakpointMask: "XLM"
                    }),
                    this.anim.addKeyframe(t, {
                        start: "t - 100vh",
                        end: "b",
                        ease: .2,
                        y: [-15, 15],
                        breakpointMask: "S"
                    })
                }
                ),
                this.anim.addKeyframe(this.el, {
                    start: "t - 130vh",
                    end: "b + 30vh",
                    cssClass: ["near-section"],
                    toggle: !0
                })
            }
            static IS_SUPPORTED() {
                return !n.REDUCED_MOTION
            }
        }
    }
    , {
        181: 181,
        80: 80
    }],
    178: [function(t, e, i) {
        "use strict";
        const s = t(80);
        e.exports = class extends s {
            constructor(t) {
                super(t),
                this.listEl = this.el.querySelector(".value-prop-list"),
                this.valuePropEls = Array.from(this.el.querySelectorAll(".value-prop")),
                this.videoWrapperEl = this.el.querySelector(".video-wrapper"),
                this.propsLength = this.valuePropEls.length,
                this.setActiveValueProp = this.setActiveValueProp.bind(this),
                this.createKeyframes()
            }
            createKeyframes() {
                this.keyframes = this.valuePropEls.map((t,e)=>this.anim.addEvent(t, {
                    start: 0 == e ? 0 : "t - 50vh - 40px",
                    end: e == this.propsLength - 1 ? "b" : "b - 50vh - 40px",
                    event: "setActive",
                    onEnter: ()=>{
                        this.setActiveValueProp(e)
                    }
                }))
            }
            setActiveValueProp(t) {
                t != this.activeValueProp && (this.listEl.classList.remove("show-" + this.activeValueProp),
                this.activeValueProp = t,
                this.listEl.classList.add("show-" + this.activeValueProp))
            }
        }
    }
    , {
        80: 80
    }],
    179: [function(t, e, i) {
        "use strict";
        const s = t(80)
          , n = t(181);
        e.exports = class extends s {
            constructor(t) {
                super(t)
            }
            mounted() {
                const t = this.el.querySelector(".imgs-container");
                this.images = this.el.querySelectorAll(".xray-img"),
                this.stickyEl = this.el.querySelector(".sticky-el"),
                this.copyBlocks = this.el.querySelectorAll(".xray-copy"),
                this.anim.addKeyframe(this.el, {
                    start: "t - 140vh",
                    end: "b + 40vh",
                    cssClass: ["near-section"],
                    toggle: !0
                }),
                n.REDUCED_MOTION || this.anim.addKeyframe(t, {
                    start: "a0b - 100vh - (100a0h - 100h)",
                    end: "a0b - 100vh",
                    anchors: [this.el],
                    y: [0, -100],
                    breakpointMask: "XLM",
                    disabledWhen: ["mq-medium-short", "mq-large-up-short"]
                }),
                this.animateCopyAndImages("a0t + 100a1h + css(bottom, a1) - 100vh", 70, "XLM"),
                this.animateCopyAndImages("a0t + 100a1h + css(bottom, a1) - 100vh", 25, "S")
            }
            animateCopyAndImages(t, e, i) {
                const s = n.REDUCED_MOTION;
                let r = t;
                const a = [this.el, this.stickyEl]
                  , o = ["mq-large-up-shorter", "mq-medium-shorter", "mq-small-shorter"];
                this.copyBlocks.forEach((t,n)=>{
                    this.anim.addKeyframe(t, {
                        start: r,
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o,
                        cssClass: ["past-start"],
                        toggle: !0
                    });
                    const h = "".concat(r, " + ").concat("css(--fade-distance, a0)")
                      , l = {
                        start: r,
                        end: s ? r : h,
                        opacity: [0, 1],
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o
                    };
                    this.anim.addKeyframe(t, l),
                    0 !== n && this.anim.addKeyframe(this.images[n], l);
                    const c = "".concat(h, " + ").concat("css(--is-visible-distance, a0)")
                      , u = "".concat(c, " + ").concat("css(--fade-distance, a0)");
                    n !== this.copyBlocks.length - 1 && this.anim.addKeyframe(t, {
                        start: s ? u : c,
                        end: u,
                        opacity: [1, 0],
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o
                    }),
                    s || this.anim.addKeyframe(t, {
                        start: r,
                        end: u,
                        y: [e, -1 * e],
                        anchors: a,
                        breakpointMask: i,
                        disabledWhen: o
                    }),
                    r = u
                }
                )
            }
            static IS_SUPPORTED() {
                return !0
            }
        }
    }
    , {
        181: 181,
        80: 80
    }],
    180: [function(t, e, i) {
        "use strict";
        const s = t(53)
          , n = t(60)
          , r = t(81)
          , a = t(82)
          , o = t(3)
          , h = t(152)
          , l = t(181);
        ({
            initialize: function() {
                o.detect(),
                s.model.BREAKPOINTS = [{
                    name: "S",
                    mediaQuery: "only screen and (max-width: 735px)"
                }, {
                    name: "M",
                    mediaQuery: "only screen and (max-width: 1068px)"
                }, {
                    name: "L",
                    mediaQuery: "only screen and (max-width: 1441px)"
                }, {
                    name: "X",
                    mediaQuery: "only screen and (min-width: 1442px)"
                }],
                s.initialize(),
                this.initBubbleGum(),
                l.init()
            },
            initBubbleGum: function() {
                const e = document.querySelector(".main");
                Object.assign(a, {
                    Hero: t(170),
                    ValueProps: t(178),
                    InlineVideo: t(171),
                    Ntych: t(174),
                    HardwareTurn: t(169),
                    ScreenSequence: t(175),
                    MagicalExperience: t(173),
                    DigitalCrown: t(167),
                    Xray: t(179),
                    ColorGallerySide: t(166),
                    ScreenSequenceVideo: t(176),
                    SpatialAudio: t(177),
                    MQDetector: t(172),
                    FadeGallery: t(168),
                    ARGallery: t(165)
                });
                new r(e).anim.on(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, ()=>{
                    new h
                }
                )
            }
        }).initialize()
    }
    , {
        152: 152,
        165: 165,
        166: 166,
        167: 167,
        168: 168,
        169: 169,
        170: 170,
        171: 171,
        172: 172,
        173: 173,
        174: 174,
        175: 175,
        176: 176,
        177: 177,
        178: 178,
        179: 179,
        181: 181,
        3: 3,
        53: 53,
        60: 60,
        81: 81,
        82: 82
    }],
    181: [function(t, e, i) {
        "use strict";
        e.exports = {
            init: function() {
                const t = document.getElementsByTagName("html")[0];
                this.AOW = t.classList.contains("aow"),
                this.IOS = t.classList.contains("ios"),
                this.IE = t.classList.contains("ie"),
                this.EDGE = t.classList.contains("edge"),
                this.FIREFOX = t.classList.contains("firefox"),
                this.ANDROID = t.classList.contains("android"),
                this.REDUCED_MOTION = t.classList.contains("reduced-motion"),
                this.INLINE_VIDEO = t.classList.contains("inline-video"),
                this.CSS_MASK = t.classList.contains("css-mask"),
                this.QUICK_LOOK = t.classList.contains("quicklook"),
                this.QUICK_LOOK_MODERN = t.classList.contains("quicklook-modern"),
                this.QUICK_LOOK_CLASSIC = t.classList.contains("quicklook-classic")
            }
        }
    }
    , {}],
    182: [function(t, e, i) {
        "use strict";
        const s = t(31)
          , n = t(159)
          , r = t(22)
          , a = {
            large: {
                width: 1004,
                height: 1214
            },
            medium: {
                width: 674,
                height: 818
            },
            small: {
                width: 960,
                height: 1156
            }
        };
        e.exports = class extends r {
            constructor(t) {
                super(),
                this.el = t.el,
                this.startFrame = t.startFrame || 0,
                this.extension = t.extension || "jpg",
                this.basePath = t.basePath,
                this.endFrame = t.endFrame,
                this.frameCount = this.endFrame - this.startFrame + 1,
                this.canvasEl = t.canvasEl,
                this.loadFrame = this.loadFrame.bind(this),
                this.onLoad = this.onLoad.bind(this),
                this.destroyed = !1,
                this.measure(),
                this.createCanvas(),
                this.loaded = !1,
                this.frames = [],
                this.framesLoaded = 0
            }
            load() {
                for (var t = 0; t < this.frameCount; t++) {
                    let e = "0000" + t;
                    e = this.viewport + "_" + e.substring(e.length - 4),
                    this.loadFrame(e)
                }
            }
            loadFrame(t) {
                const e = this.basePath + "/" + this.viewport + "/" + t + "." + this.extension
                  , i = new Image;
                i.onload = this.onLoad,
                this.frames.push(i),
                i.src = e
            }
            onLoad() {
                this.framesLoaded++,
                this.framesLoaded === this.frameCount && (this.loaded = !0,
                this.trigger("loaded"))
            }
            measure() {
                this.viewport = n.viewport.replace("x", "").replace("-wide", ""),
                this.width = a[this.viewport].width,
                this.height = a[this.viewport].height,
                n.retina && (this.viewport += "_2x")
            }
            createCanvas() {
                this.canvasEl || (this.canvasEl = document.createElement("canvas"),
                this.el.appendChild(this.canvasEl)),
                this.canvasEl.setAttribute("width", this.width),
                this.canvasEl.setAttribute("height", this.height),
                this.context = this.canvasEl.getContext("2d")
            }
            destroy() {
                this.destroyed = !0
            }
            draw(t) {
                if (!this.loaded || this.destroyed)
                    return;
                this.context.clearRect(0, 0, this.width, this.height);
                const e = Math.round(s(0, this.frameCount - 1, t));
                this.context.drawImage(this.frames[e], 0, 0, this.width, this.height)
            }
        }
    }
    , {
        159: 159,
        22: 22,
        31: 31
    }]
}, {}, [180]);
