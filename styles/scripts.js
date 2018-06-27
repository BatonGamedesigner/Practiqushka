function showThumb(e) {
    if (e[0]) {
        var t = ".vimeo-" + e[0].id;
        $(t).each(function () {
            $(this).attr("src", e[0].thumbnail_medium)
        })
    }
}

function vimeoLoadingThumb(e) {
    var t = document.location.protocol + "//vimeo.com/api/v2/video/" + e + ".json?callback=showThumb",
        n = ".vimeo-" + e;
    $(n).each(function () {
        $(this).before('<script type="text/javascript" src="' + t + '"><\/script>')
    })
}

!function (e) {
    function t(e) {
        var t = parseInt(e.val());
        return isNaN(t) ? 0 : t
    }

    e.fn.incrementalInput = function (n) {
        var i = {
            inputClass: ".js-incremental-input",
            plusClass: ".js-incremental-plus",
            minusClass: ".js-incremental-minus",
            step: 1,
            max: !1,
            min: !1,
            canChange: function () {
                return !0
            },
            onIncrease: function () {
            },
            onDecrease: function () {
            },
            onChange: function () {
            }
        }, o = e.extend(!0, {}, i, n);
        return this.each(function () {
            var n = e(this), i = n.find(o.inputClass);
            n.find(o.plusClass).on("click", function (e) {
                if (!o.canChange(i)) return !1;
                var n = t(i);
                return i.prevValue = n, n += o.step, !1 !== o.max && n > o.max && (n = o.max), i.val(n), o.onIncrease(i, n, i.prevValue), o.onChange(i, n, i.prevValue), !1
            }), n.find(o.minusClass).on("click", function () {
                if (!o.canChange(i)) return !1;
                var e = t(i);
                return i.prevValue = e, e -= o.step, !1 !== o.min && e < o.min && (e = o.min), i.val(e), o.onDecrease(i, e, i.prevValue), o.onChange(i, e, i.prevValue), !1
            })
        })
    }
}(window.jQuery), function () {
    function addEvent(e, t, n) {
        if (e.addEventListener) e.addEventListener(t, n, !1); else {
            if (!e.attachEvent) throw new Error("not supported or DOM not loaded");
            e.attachEvent("on" + t, function () {
                n.call(e)
            })
        }
    }

    function addResizeEvent(e) {
        var t;
        addEvent(window, "resize", function () {
            t && clearTimeout(t), t = setTimeout(e, 100)
        })
    }

    function getBox(e) {
        var t, n, i, o, a = getOffset(e);
        return t = a.left, i = a.top, n = t + e.offsetWidth, o = i + e.offsetHeight, {
            left: t,
            right: n,
            top: i,
            bottom: o
        }
    }

    function addStyles(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e.style[n] = t[n])
    }

    function copyLayout(e, t) {
        var n = getBox(e);
        addStyles(t, {
            position: "absolute",
            left: n.left + "px",
            top: n.top + "px",
            width: e.offsetWidth + "px",
            height: e.offsetHeight + "px"
        })
    }

    function fileFromPath(e) {
        return e.replace(/.*(\/|\\)/, "")
    }

    function getExt(e) {
        return -1 !== e.indexOf(".") ? e.replace(/.*[.]/, "") : ""
    }

    function hasClass(e, t) {
        return new RegExp("\\b" + t + "\\b").test(e.className)
    }

    function addClass(e, t) {
        hasClass(e, t) || (e.className += " " + t)
    }

    function removeClass(e, t) {
        var n = new RegExp("\\b" + t + "\\b");
        e.className = e.className.replace(n, "")
    }

    function removeNode(e) {
        e.parentNode.removeChild(e)
    }

    if (document.documentElement.getBoundingClientRect) var getOffset = function (e) {
        var t = e.getBoundingClientRect(), n = e.ownerDocument, i = n.body, o = n.documentElement,
            a = o.clientTop || i.clientTop || 0, r = o.clientLeft || i.clientLeft || 0, s = 1;
        if (i.getBoundingClientRect) {
            var c = i.getBoundingClientRect();
            s = (c.right - c.left) / i.clientWidth
        }
        return s > 1 && (a = 0, r = 0), {
            top: t.top / s + (window.pageYOffset || o && o.scrollTop / s || i.scrollTop / s) - a,
            left: t.left / s + (window.pageXOffset || o && o.scrollLeft / s || i.scrollLeft / s) - r
        }
    }; else var getOffset = function (e) {
        var t = 0, n = 0;
        do {
            t += e.offsetTop || 0, n += e.offsetLeft || 0, e = e.offsetParent
        } while (e);
        return {left: n, top: t}
    };
    var toElement = function () {
        var e = document.createElement("div");
        return function (t) {
            e.innerHTML = t;
            var n = e.firstChild;
            return e.removeChild(n)
        }
    }(), getUID = function () {
        var e = 0;
        return function () {
            return "ValumsAjaxUpload" + e++
        }
    }();
    window.AjaxUpload = function (e, t) {
        this._settings = {
            action: "upload.php",
            name: "userfile",
            multiple: !1,
            data: {},
            autoSubmit: !0,
            responseType: !1,
            hoverClass: "hover",
            focusClass: "focus",
            disabledClass: "disabled",
            onChange: function (e, t) {
            },
            onSubmit: function (e, t) {
            },
            onComplete: function (e, t) {
            }
        };
        for (var n in t) t.hasOwnProperty(n) && (this._settings[n] = t[n]);
        if (e.jquery ? e = e[0] : "string" == typeof e && (/^#.*/.test(e) && (e = e.slice(1)), e = document.getElementById(e)), !e || 1 !== e.nodeType) throw new Error("Please make sure that you're passing a valid element");
        "A" == e.nodeName.toUpperCase() && addEvent(e, "click", function (e) {
            e && e.preventDefault ? e.preventDefault() : window.event && (window.event.returnValue = !1)
        }), this._button = e, this._input = null, this._disabled = !1, this.enable(), this._rerouteClicks()
    }, AjaxUpload.prototype = {
        setData: function (e) {
            this._settings.data = e
        }, disable: function () {
            addClass(this._button, this._settings.disabledClass), this._disabled = !0;
            var e = this._button.nodeName.toUpperCase();
            "INPUT" != e && "BUTTON" != e || this._button.setAttribute("disabled", "disabled"), this._input && this._input.parentNode && (this._input.parentNode.style.visibility = "hidden")
        }, enable: function () {
            removeClass(this._button, this._settings.disabledClass), this._button.removeAttribute("disabled"), this._disabled = !1
        }, _createInput: function () {
            var e = this, t = document.createElement("input");
            t.setAttribute("type", "file"), t.setAttribute("name", this._settings.name), this._settings.multiple && t.setAttribute("multiple", "multiple"), addStyles(t, {
                position: "absolute",
                right: 0,
                margin: 0,
                padding: 0,
                fontSize: "480px",
                fontFamily: "sans-serif",
                cursor: "pointer"
            });
            var n = document.createElement("div");
            if (addStyles(n, {
                display: "block",
                position: "absolute",
                overflow: "hidden",
                margin: 0,
                padding: 0,
                opacity: 0,
                direction: "ltr",
                zIndex: 2147483583
            }), "0" !== n.style.opacity) {
                if (void 0 === n.filters) throw new Error("Opacity not supported by the browser");
                n.style.filter = "alpha(opacity=0)"
            }
            addEvent(t, "change", function () {
                if (t && "" !== t.value) {
                    var n = fileFromPath(t.value);
                    if (!1 === e._settings.onChange.call(e, n, getExt(n))) return void e._clearInput();
                    e._settings.autoSubmit && e.submit()
                }
            }), addEvent(t, "mouseover", function () {
                addClass(e._button, e._settings.hoverClass)
            }), addEvent(t, "mouseout", function () {
                removeClass(e._button, e._settings.hoverClass), removeClass(e._button, e._settings.focusClass), t.parentNode && (t.parentNode.style.visibility = "hidden")
            }), addEvent(t, "focus", function () {
                addClass(e._button, e._settings.focusClass)
            }), addEvent(t, "blur", function () {
                removeClass(e._button, e._settings.focusClass)
            }), n.appendChild(t), document.body.appendChild(n), this._input = t
        }, _clearInput: function () {
            this._input && (removeNode(this._input.parentNode), this._input = null, this._createInput(), removeClass(this._button, this._settings.hoverClass), removeClass(this._button, this._settings.focusClass))
        }, _rerouteClicks: function () {
            var e = this;
            addEvent(e._button, "mouseover", function () {
                if (!e._disabled) {
                    e._input || e._createInput();
                    var t = e._input.parentNode;
                    copyLayout(e._button, t), t.style.visibility = "visible"
                }
            })
        }, _createIframe: function () {
            var e = getUID(), t = toElement('<iframe src="javascript:false;" name="' + e + '" />');
            return t.setAttribute("id", e), t.style.display = "none", document.body.appendChild(t), t
        }, _createForm: function (e) {
            var t = this._settings, n = toElement('<form method="post" enctype="multipart/form-data"></form>');
            n.setAttribute("action", t.action), n.setAttribute("target", e.name), n.style.display = "none", document.body.appendChild(n);
            for (var i in t.data) if (t.data.hasOwnProperty(i)) {
                var o = document.createElement("input");
                o.setAttribute("type", "hidden"), o.setAttribute("name", i), o.setAttribute("value", t.data[i]), n.appendChild(o)
            }
            return n
        }, _getResponse: function (iframe, file) {
            var toDeleteFlag = !1, self = this, settings = this._settings;
            addEvent(iframe, "load", function () {
                if ("javascript:'%3Chtml%3E%3C/html%3E';" == iframe.src || "javascript:'<html></html>';" == iframe.src) return void(toDeleteFlag && setTimeout(function () {
                    removeNode(iframe)
                }, 0));
                var doc = iframe.contentDocument ? iframe.contentDocument : window.frames[iframe.id].document;
                if (!(doc.readyState && "complete" != doc.readyState || doc.body && "false" == doc.body.innerHTML)) {
                    var response;
                    doc.XMLDocument ? response = doc.XMLDocument : doc.body ? (response = doc.body.innerHTML, settings.responseType && "json" == settings.responseType.toLowerCase() && (doc.body.firstChild && "PRE" == doc.body.firstChild.nodeName.toUpperCase() && (doc.normalize(), response = doc.body.firstChild.firstChild.nodeValue), response = response ? eval("(" + response + ")") : {})) : response = doc, settings.onComplete.call(self, file, response), toDeleteFlag = !0, iframe.src = "javascript:'<html></html>';"
                }
            })
        }, submit: function () {
            var e = this, t = this._settings;
            if (this._input && "" !== this._input.value) {
                var n = fileFromPath(this._input.value);
                if (!1 === t.onSubmit.call(this, n, getExt(n))) return void this._clearInput();
                var i = this._createIframe(), o = this._createForm(i);
                removeNode(this._input.parentNode), removeClass(e._button, e._settings.hoverClass), removeClass(e._button, e._settings.focusClass), o.appendChild(this._input), o.submit(), removeNode(o), o = null, removeNode(this._input), this._input = null, this._getResponse(i, n), this._createInput()
            }
        }
    }
}(), function (e) {
    e.fn.endlessScroll = function (t) {
        var n = {
            bottomPixels: 50,
            fireOnce: !0,
            fireDelay: 150,
            loader: "<br />Loading...<br />",
            data: !1,
            url: !1,
            params: {},
            toElement: !1,
            success: function () {
            },
            error: function () {
            },
            insertAfter: "div:last",
            resetCounter: function () {
                return !1
            },
            callback: function () {
                return !0
            },
            ceaseFire: function () {
                return !1
            },
            disable: !1
        }, t = e.extend({}, n, t), i = !1, o = !0, a = !1, r = 0;
        !0 === t.ceaseFire.apply(this) && (o = !1);
        var s = this;
        if (!0 === o) {
            if (!1 === t.toElement) var c = s; else var c = window;
            e(c).scroll(function () {
                if (!i) {
                    if (!0 === t.ceaseFire.apply(this) || t.disable) return void s.unbind("scroll");
                    if (s == document || s == window) var n = e(document).height() - e(window).height() <= e(window).scrollTop() + t.bottomPixels; else if (!1 === t.toElement) {
                        var o = e(".endless_scroll_inner_wrap", this);
                        0 == o.length && (o = e(this).wrapInner('<div class="endless_scroll_inner_wrap" />').find(".endless_scroll_inner_wrap"));
                        var n = o.length > 0 && o.height() - e(this).height() <= e(this).scrollTop() + t.bottomPixels
                    } else var c = e(s).offset(), d = c.top,
                        n = d <= e(window).height() + e(window).scrollTop() + t.bottomPixels;
                    n && (0 == t.fireOnce || 1 == t.fireOnce && 1 != a) && (!0 === t.resetCounter.apply(this) && (r = 0), a = !0, r++, e(t.insertAfter).after('<div id="endless_scroll_loader">' + t.loader + "</div>"), !1 === t.url && !1 === t.data || (!1 !== t.url ? (i = !0, e.ajax({
                        url: t.url,
                        type: "POST",
                        data: t.params,
                        success: function (n) {
                            i = !1, e("div#endless_scroll_loader").remove();
                            var o = "function" == typeof t.success && t.success.apply(this, [n, t, r]);
                            !1 !== o ? e(t.insertAfter).after(o) : s.unbind("scroll"), t.disable && s.unbind("scroll"), t.callback.apply(this, [r])
                        },
                        error: function () {
                            e("div#endless_scroll_loader").remove(), "function" == typeof t.error && t.error.apply(this, [r]), s.unbind("scroll"), t.callback.apply(this, [r])
                        },
                        dataType: "json"
                    })) : (data = "function" == typeof t.data ? t.data.apply(this, [t, r]) : t.data, e(t.insertAfter).after('<div id="endless_scroll_data">' + data + "</div>"), e("div#endless_scroll_data").hide().fadeIn(), e("div#endless_scroll_data").removeAttr("id"), e("div#endless_scroll_loader").remove(), t.callback.apply(this, [r])), !1 !== t.fireDelay || 0 !== t.fireDelay ? (e("body").after('<div id="endless_scroll_marker"></div>'), e("div#endless_scroll_marker").fadeTo(t.fireDelay, 1, function () {
                        e(this).remove(), a = !1
                    })) : a = !1), t.disable && s.unbind("scroll"))
                }
            })
        }
    }
}(jQuery), view = {
    _lang: void 0, getLang: function () {
        return void 0 === this._lang && $(function () {
            this._lang = $("#top-body").data("lang") ? $("#top-body").data("lang") : "ru"
        }), this._lang
    }, translate: function (e) {
        return "ru" != this.getLang() && void 0 != e && "" != e && void 0 != window.Translate ? Translate[e] || e : e
    }, query: function (e, t, n, i, o, a, r) {
        var s = o || "json", c = i || {}, d = r || {};
        $.ajax({
            url: e, type: "POST", dataType: s, data: c, timeout: 3e4, success: function (e, i) {
                try {
                    if (e && 1 == e.success) t(e, i); else if (void 0 != a && a(e, i), void 0 == a || void 0 != d.showError && 1 == d.showError) {
                        var o;
                        if (o = d.msg ? d.msg : "json" == s ? void 0 != e.msg ? e.msg : "" : $(e).closest(".block-error").length > 0 ? $(e).html() : "", !e.type || "warning" != e.type) throw new Error(o);
                        ntNotification.showWarning(e.message), Popup.progressBar("hide")
                    }
                } catch (e) {
                    Notifier.showError(e.message, n)
                }
            }, error: function (e, t) {
                var i = Notifier.getErrorTpl(t);
                Notifier.showError(i, n), Popup.progressBar("hide")
            }
        })
    }, scrollTo: function (e, t) {
        if (0 == $("#" + e).length) return !1;
        t |= 500;
        var n = $("#" + e).offset();
        return $("body, html").animate({scrollTop: n.top}, t), !0
    }, toogleBlockByClick: function (e, t) {
        var n = $(e);
        $(document).on("click", n.selector, function () {
            return $(t).toggle(), !1
        })
    }, array_unique: function (e) {
        for (var t = [], n = e.length, i = 0; i < n; i++) {
            for (var o = i + 1; o < n; o++) e[i] === e[o] && (o = ++i);
            t.push(e[i])
        }
        return t
    }, isInt: function (e) {
        return !isNaN(e) && parseInt(e) == e && !/^0[x|X]\.*/i.test(e) && e >= 0
    }, getTld: function () {
        return $("body").data("tld")
    }, setPhoneValidator: function () {
        var e = view.getTld(), t = /^$/i;
        switch (e) {
            case"ru":
                t = /^\+7\(\d{3}\)\d{7}$/i;
                break;
            case"ua":
                t = /^\+380\(\d{3}\)\d{7}$/i
        }
        return jQuery.validator.addMethod("phoneNumber", function (e, n) {
            return this.optional(n) || t.test(e)
        }, this.translate("Введите корректный телефон")), !0
    }
};
var Notifier = {
    ask: function (e) {
        return confirm(e)
    }, addPreloader: function (e) {
        0 == $(e).find(".preloader").length && (e.append('<div class="bg">'), e.append('<div class="preloader">'))
    }, removePreloader: function (e) {
        0 != $(e).find(".preloader").length && (e.find(".bg").remove(), e.find(".preloader").remove())
    }, hasPreloader: function (e) {
        return 0 != $(e).find(".preloader").length
    }, getErrorTpl: function (e) {
        return view.translate("Ошибка") + ": " + e + "." + view.translate("Попробуйте запрос позже") + "."
    }, _showPopup: function (e) {
        var t = this;
        t.popupTemlate ? t._initPopup(e) : $.get("/html/ru_RU/utils/notifyer.html", function (n) {
            t.popupTemlate = n, $(document).on("click", ".window.notifyer .-btn", function () {
                Popup.closeDialog()
            }), $(document).on("click", ".window.notifyer a", function () {
                return Popup.closeDialog(), t.to_href = $(this).attr("href"), !1
            }), t._initPopup(e)
        })
    }, _initPopup: function (e) {
        var t = this, n = $(this.popupTemlate);
        n.find(".header").html(e.head), n.find(".message").html(e.msg), n.addClass(e.type), n.find(".-btn").addClass("-btn-" + e.type);
        var i = Popup.getParams();
        i.padding = 0, i.afterClose = function () {
            t.to_href && (window.location.href = "http://" + window.location.host + t.to_href, $(document).trigger("hashchange")), t.to_href = !1
        }, Popup.showDialog(n, i)
    }, showError: function (e, t, n, i) {
        var o = this;
        n = void 0 == n || n, e = e || "Произошла ошибка. Попробуйте еще.", e = view.translate(e), i = i || "Произошла ошибка", i = view.translate(i), void 0 != t && $(t).length > 0 ? o.notify({
            type: "error",
            msg: e,
            el: t,
            hide: n
        }) : o._showPopup({head: i, msg: e, type: "error"})
    }, showSuccess: function (e, t, n, i) {
        var o = this;
        n = void 0 == n || n, e = e || view.translate("Операция выполнена успешно"), e = view.translate(e), i = i || "Операция выполнена успешно", i = view.translate(i), void 0 != t && $(t).length > 0 ? this.notify({
            type: "success",
            msg: e,
            el: t,
            hide: n
        }) : o._showPopup({head: i, msg: e, type: "success"})
    }, showWarning: function (e, t, n, i) {
        var o = this;
        e = e || view.translate("Предупреждение"), e = view.translate(e), i = i || "Уведомление", i = view.translate(i), o._showPopup({
            head: i,
            msg: e,
            type: "warning"
        })
    }, showMessage: function (e, t, n, i) {
        var o = void 0 == n || n;
        void 0 != t && $(t).length > 0 ? (i = i || void 0, this.notify({
            type: "ok",
            msg: e,
            el: t,
            hide: o,
            speedOut: i
        })) : void 0 != e && alert(e)
    }, notify: function (e) {
        var t = this.getTemplate();
        1 == e.hide && $("." + $(t).attr("class")).fadeOut(), $(t).addClass(e.type).html('<table><td><div id="' + e.type + '-icon"></div></td><td>' + e.msg + "</td></table>"), $(e.el).prepend($(t)), $(t).fadeIn();
        var n = $(e.el).position().top;
        if ($(e.el).scrollTop() > 0 && $("body,html").animate({scrollTop: n}, 200), 1 == e.hide) {
            var i = e.speedOut || 5e3;
            setTimeout(function () {
                $(t).fadeOut(), $(t).remove()
            }, i)
        }
    }, getTemplate: function () {
        return $('<div class="notifier"/>')
    }, showIndicator: function (e, t) {
        var n = this.getIndicatorBtn(e, t);
        this.showIndicatorBtn(n)
    }, hideIndicator: function (e, t) {
        var n = this.getIndicatorBtn(e, t);
        this.hideIndicatorBtn(n)
    }, lockBtn: function (e) {
        e.hasClass("disable") || e.addClass("disable")
    }, unlockBtn: function (e) {
        e.removeClass("disable")
    }, showIndicatorBtn: function (e) {
        e.attr("style", "width:" + e.innerWidth() + "px"), e.addClass("locked"), e.prepend('<div class="-loader"></div>'), e.on("click.off", function () {
            return !1
        })
    }, hideIndicatorBtn: function (e) {
        e.removeClass("locked"), e.children(".-loader").remove(), e.attr("style", ""), e.off("click.off")
    }, getIndicatorBtn: function (e, t) {
        return 0 == (t || !1) ? 0 == $("#" + e + " button.blue, #" + e + " .-btn-complete").length ? $("#" + e + " .buttons.green-btn") : $("#" + e + " button.blue,#" + e + " .-btn-complete") : $("#" + e + " footer button.blue, #" + e + " footer .-btn-complete")
    }, getLoader: function () {
        return '<div id="ajax-loader"></div>'
    }, showNotice: function (e, t, n) {
        var i = $(e);
        if (i.length > 0) {
            var o = $('<div id="user-notice" style="display:none;">' + t + "</div>"), a = i.find("#user-notice");
            n && a.length ? a.eq(0).replaceWith(o) : i.append(o), o.fadeIn(200), setTimeout(function () {
                o.fadeOut(200, function () {
                    o.remove()
                })
            }, 2500)
        }
    }, getSmallLoader: function () {
        return "<img id='lazy-loader' src='//s.siteapi.org/frontend/static/grid_6/img/lazyload-da16aabf34.gif'>"
    }, removeSmallLoader: function () {
        $("#lazy-loader").remove()
    }
}, Notifier = {
    ask: function (e) {
        return confirm(e)
    }, addPreloader: function (e) {
        0 == $(e).find(".preloader").length && (e.append('<div class="bg">'), e.append('<div class="preloader">'))
    }, removePreloader: function (e) {
        0 != $(e).find(".preloader").length && (e.find(".bg").remove(), e.find(".preloader").remove())
    }, hasPreloader: function (e) {
        return 0 != $(e).find(".preloader").length
    }, getErrorTpl: function (e) {
        return view.translate("Ошибка") + ": " + e + "." + view.translate("Попробуйте запрос позже") + "."
    }, _showPopup: function (e) {
        var t = this;
        t.popupTemlate ? t._initPopup(e) : $.get("/html/ru_RU/utils/notifyer.html", function (n) {
            t.popupTemlate = n, $(document).on("click", ".window.notifyer .-btn", function () {
                Popup.closeDialog()
            }), $(document).on("click", ".window.notifyer a", function () {
                return Popup.closeDialog(), t.to_href = $(this).attr("href"), !1
            }), t._initPopup(e)
        })
    }, _initPopup: function (e) {
        var t = this, n = $(this.popupTemlate);
        n.find(".header").html(e.head), n.find(".message").html(e.msg), n.addClass(e.type), n.find(".-btn").addClass("-btn-" + e.type);
        var i = Popup.getParams();
        i.padding = 0, i.afterClose = function () {
            t.to_href && (window.location.href = document.location.protocol + "://" + window.location.host + t.to_href, $(document).trigger("hashchange")), t.to_href = !1
        }, Popup.showDialog(n, i)
    }, showError: function (e, t, n, i) {
        var o = this;
        n = void 0 == n || n, e = e || "Произошла ошибка. Попробуйте еще.", e = view.translate(e), i = i || "Произошла ошибка", i = view.translate(i), void 0 != t && $(t).length > 0 ? o.notify({
            type: "error",
            msg: e,
            el: t,
            hide: n
        }) : ntNotification.showError('<div class="-f-bold"><b>' + i + "</b></div><div>" + e + "</div>")
    }, showSuccess: function (e, t, n, i) {
        n = void 0 == n || n, e = e || view.translate("Операция выполнена успешно"), e = view.translate(e), i = i || "Операция выполнена успешно", i = view.translate(i), void 0 != t && $(t).length > 0 ? this.notify({
            type: "success",
            msg: e,
            el: t,
            hide: n
        }) : ntNotification.showSuccess('<div class="-f-bold"><b>' + i + "</b></div><div>" + e + "</div>")
    }, showWarning: function (e, t, n, i) {
        e = e || view.translate("Предупреждение"), e = view.translate(e), i = i || "Уведомление", i = view.translate(i), ntNotification.showWarning('<div class="-f-bold"><b>' + i + "</b></div><div>" + e + "</div>")
    }, showMessage: function (e, t, n, i) {
        var o = void 0 == n || n;
        void 0 != t && $(t).length > 0 ? (i = i || void 0, this.notify({
            type: "ok",
            msg: e,
            el: t,
            hide: o,
            speedOut: i
        })) : void 0 != e && alert(e)
    }, notify: function (e) {
        var t = this.getTemplate();
        1 == e.hide && $("." + $(t).attr("class")).fadeOut(), $(t).addClass(e.type).html('<table><td><div id="' + e.type + '-icon"></div></td><td>' + e.msg + "</td></table>"), $(e.el).prepend($(t)), $(t).fadeIn();
        var n = $(e.el).position().top;
        if ($(e.el).scrollTop() > 0 && $("body,html").animate({scrollTop: n}, 200), 1 == e.hide) {
            var i = e.speedOut || 5e3;
            setTimeout(function () {
                $(t).fadeOut(), $(t).remove()
            }, i)
        }
    }, getTemplate: function () {
        return $('<div class="notifier"/>')
    }, showIndicator: function (e, t) {
        var n = this.getIndicatorBtn(e, t);
        this.showIndicatorBtn(n)
    }, hideIndicator: function (e, t) {
        var n = this.getIndicatorBtn(e, t);
        this.hideIndicatorBtn(n)
    }, lockBtn: function (e) {
        e.hasClass("disable") || e.addClass("disable")
    }, unlockBtn: function (e) {
        e.removeClass("disable")
    }, showIndicatorBtn: function (e) {
        e.attr("style", "width:" + e.innerWidth() + "px"), e.addClass("locked"), e.prepend('<div class="-loader"></div>'), e.on("click.off", function () {
            return !1
        })
    }, hideIndicatorBtn: function (e) {
        e.removeClass("locked"), e.children(".-loader").remove(), e.attr("style", ""), e.off("click.off")
    }, getIndicatorBtn: function (e, t) {
        return 0 == (t || !1) ? 0 == $("#" + e + " button.blue, #" + e + " .-btn-complete").length ? $("#" + e + " .buttons.green-btn") : $("#" + e + " button.blue,#" + e + " .-btn-complete") : $("#" + e + " footer button.blue, #" + e + " footer .-btn-complete")
    }, getLoader: function () {
        return '<div id="ajax-loader"></div>'
    }, showNotice: function (e, t, n) {
        var i = $(e);
        if (i.length > 0) {
            var o = $('<div id="user-notice" style="display:none;">' + t + "</div>"), a = i.find("#user-notice");
            n && a.length ? a.eq(0).replaceWith(o) : i.append(o), o.fadeIn(200), setTimeout(function () {
                o.fadeOut(200, function () {
                    o.remove()
                })
            }, 2500)
        }
    }, getSmallLoader: function () {
        return "<img id='lazy-loader' src='//s.siteapi.org/frontend/static/grid_6/img/lazyload-da16aabf34.gif'>"
    }, removeSmallLoader: function () {
        $("#lazy-loader").remove()
    }
}, Popup = {
    loadEvents: function () {
        var e = this;
        $(document).on("click", ".window .close, .window .close-link a, .window .cancel,.window .-btn-cancel", function () {
            return 0 == $(this).parents("#comment_form").length && (e.closeDialog(), $.jPicker && $.jPicker.List.forEach(function (e) {
                e.hide()
            })), !1
        })
    }, getParams: function () {
        return {closeBtn: !1, enableEscapeButton: !0, margin: 0, padding: 2, scrolling: !1, minHeight: 1, minWidth: 1}
    }, showDialog: function (e, t) {
        var n = this, i = t || n.getParams();
        i = $.extend({}, i, {content: e}), Visitor.bindImageViewer($, i)
    }, showWindow: function (e, t, n, i) {
        var o = '<section class="window ' + n + '" id="' + n + '-edit-window" style="width:' + i + 'px"><header><div class="edit-block"><ul><li><span class="close"></span></li></ul></div><h1>' + view.translate(t) + '</h1></header><div id="windowContent">' + e + "</div></section>";
        this.showDialog(o)
    }, closeDialog: function () {
        $.fancybox.close()
    }, progressBar: function (e) {
        "show" == e ? $.fancybox.showLoading() : $.fancybox.hideLoading()
    }, center: function () {
    }
};
Visitor = {
    init: function () {
        this.setTooltip(), $("#footer").append($('<div id="temp-block"/>')), this.loadEvents(), this._initValidate(), this.decorateContent(), Popup.loadEvents();
        var e = $("#top-body").data("lang");
        this.lang = void 0 == e ? "ru" : e, this.scrollWindow = 0, this.isFancyLoad = !1, this.setSrcToFrameMap(), setTimeout(function () {
            Visitor.checkViewer()
        }, 1e3), this.addValidateMethods(), this.subscriberAddFormValidate(), this.initCatalogPriceFilter(), OneClickBuy.init(), this.formsHashHandler(), $(window).on("hashchange", $.proxy(function () {
            this.formsHashHandler()
        }, this)), this.initDropDown(), $(document).on("widget_set_content", function (e, t) {
            11 == t && (this.initDropDown(), Visitor.initCatalogPriceFilter())
        }.bind(this)), this.initTab()
    }, initCatalogPriceFilter: function () {
        var e = $("#catalog_price_filter");
        if (0 != e.length) {
            var t, n, i = $("#catalog_price_filter_min_cost"), o = $("#catalog_price_filter_max_cost");
            n = i.data("min-cost") ? parseInt(i.data("min-cost")) : 0, t = o.data("max-cost") ? parseInt(o.data("max-cost")) : 1e4, e.html(""), i.val() || i.val(n), o.val() || o.val(t);
            try {
                noUiSlider.create(e[0], {
                    start: [parseInt(i.val()), parseInt(o.val())],
                    range: {min: n, max: t},
                    format: {
                        to: function (e) {
                            return parseInt(e)
                        }, from: function (e) {
                            return e
                        }
                    },
                    connect: !0
                }), e[0].noUiSlider.on("update", function (e, t) {
                    1 == t ? o.val(e[t]) : i.val(e[t])
                }), i.on("change", function () {
                    e[0].noUiSlider.set([i.val(), o.val()])
                }), o.on("change", function () {
                    e[0].noUiSlider.set([i.val(), o.val()])
                })
            } catch (e) {
            }
        }
    }, setTooltip: function () {
        $(document).on("mouseover", ".tooltip:not(.tooltipstered)", function () {
            var e = $(this);
            e.tooltipster({touchDevices: !1}), e.tooltipster("show")
        })
    }, addValidateMethods: function () {
        $.validator.setDefaults({
            onclick: function (e, t) {
                $(e).valid() && $(e).removeClass("error")
            }, onkeyup: function (e, t) {
                9 === t.which && "" === this.elementValue(e) || $(e).valid() && $(e).removeClass("error")
            }
        }), $.validator.addMethod("identity", function (e, t) {
            var n = e.trim();
            return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(n)
        }, view.translate("Введите корректный email")), $.validator.addMethod("phone", function (e, t) {
            var n = e.trim();
            return this.optional(t) || /^[+]?(\d)+$/i.test(n)
        })
    }, loadEvents: function () {
        var e = this;
        $(document).on("click", ".ddelivery-map", function () {
            var e = $(this).data("city-type");
            Popup.showDialog('<iframe src="http://service.ddelivery.ru/demodev/ddelivery/ajax.php?iframe=1&amp;config_type=3&amp;width=900&amp;height=580&config_city=' + e + '" height="600" width="920"></iframe>', {
                closeBtn: !1,
                enableEscapeButton: !0,
                margin: 0,
                padding: [20, 0, 0, 20],
                scrolling: !1,
                minHeight: 1,
                minWidth: 1
            })
        }), e.scrllWidth = e.scrollbarWidth(), $(document).on("click", ".mailerForm .send", function () {
            $(".mailerForm form").submit()
        }), $(document).on("click", "#topcontacts .feedback-btn", function (e) {
            Feedback.init($(this).data("type"))
        }), $(document).on("click", "#up-link", function (t) {
            return e.scrollTop(t)
        }), $(document).on("mouseover", "#up-link", function () {
            $(this).stop(!0, !0).animate({opacity: 1}, 200)
        }), $(document).on("mouseout", "#up-link", function () {
            $(this).stop(!0, !0).animate({opacity: .4}, 200)
        }), $(window).scroll(function () {
            e.showUpLink(this)
        }), $(document).on("click", ".buttons.order", function () {
            e.makeOrder(this)
        }), document.onkeydown = function (t) {
            e.keyEvents(t)
        }, $(document).on("mouseover.fancy", ".fancy-img", function () {
            var e = $(".fancy-img");
            return Nethouse.Modal.imageGallery(e.filter(function () {
                return $(this).find("img").is(":visible")
            })), $(document).off("mouseover.fancy", ".fancy-img"), !1
        }), $(document).on("click", ".fancy-img-post", function () {
            var e = $(this);
            e.parent().is("a") || 0 != e.parents(".mrb-grid").length || Nethouse.Modal.item(e.attr("data-eval"), {type: "image"})
        }), $(document).on("click", ".video-intext", function () {
            e.getVideo(this)
        }), $(document).on("click", ".buttons.disable", function () {
            return !1
        }), $(document).on("click", ".video-item a, .video-link", function () {
            e.showVideo($(this))
        }), $(document).on("click", ".fancybox-wrap.can-close", function (e) {
            e.target == this && $.fancybox.close()
        }), $(document).on("click", "#contactsmain-left .ymap, #contactsmain .ymap, #contactsmain-left .gmap, #contactsmain .gmap, #contactsmain-left .2gismap, #contactsmain .2gismap", function () {
            return e.findAddress(this), !1
        }), $(document).on("click", "#sharebyemail-edit-window footer .save", function () {
            $("form#sharebyemail").submit()
        }), $(document).on("click", ".error-window .ok,.success-window .ok", function () {
            Popup.closeDialog()
        }), $(document).on("click", ".top-news .popup", function () {
            return e.getUrgentMessage()
        }), $(document).on("click", "#blog-posts-lnk", function () {
            return e.setPostCounterNull()
        }), $(document).on("change", "select#translate", function () {
            return e.toggleLanguage(this)
        }), $(document).on("click", ".window .show-form a", function () {
            return $(this).parent().parent().find("form").slideToggle(), !1
        }), $(document).on("click", ".window #comment_wrap .show-all", function () {
            $(this).remove(), $(".window .comment_wrap").show()
        }), $(document).on("click", "#fancybox-right.photos", function () {
            $(".album-items-wrap li.curr-" + $(this).data("next")).trigger("click")
        }), $(document).on("click", "#fancybox-left.photos", function () {
            $(".album-items-wrap li.curr-" + $(this).data("prev")).trigger("click")
        }), this.viewPhoto(), this.viewCommentImageAttachment(), $(document).on("click", ".share-links a:not(.mail-average-icon)", function () {
            e.ShareLinks(this)
        }), $(document).on("click", ".share-links a.mail-average-icon", function () {
            e.getShareByMailForm($(this))
        });
        var t = $("#catalogsortable select[name=sort], #catalogsortable select[name=categoryId]").each(function () {
            var e = $(this);
            e.attr("data-current-val", e.val())
        });
        $(document).on("widget_set_content", function (e, t) {
            t == Nethouse.WIDGETS.TYPE_PRODUCTS && $("#catalogsortable select[name=sort], #catalogsortable select[name=categoryId]").each(function () {
                var e = $(this);
                e.attr("data-current-val", e.val())
            })
        });
        var n = $(".catalog-filter-group select#productGroupSelector, .selectorGroup select#productGroupSelector");
        $(document).on("change", n.selector, function (e) {
            var t = $(e.target), n = t.parents("form"), i = n.find("input[name=productGroup]"),
                o = n.find("input[name=productCustomGroup]"), a = t.find("option:selected"),
                r = a.attr("data-group-id"), s = a.attr("data-group-entity-id");
            r == i.val() && s == o.val() || (i.val(r), o.val(s), n.submit())
        }), $(document).on("change", t.selector, function (e) {
            var t = $(e.target);
            t.data("current-val") != t.val() && t.parents("form").submit()
        }), $(document).on("change", "#catalogsortable input[type=checkbox]", function (e) {
            $(this).parents("form").submit()
        }), view.setPhoneValidator()
    }, showVideo: function (e) {
        var t = this;
        $.post(e.attr("data-video-href"), function (n) {
            if (!n.success) return void ntNotification.showError("Произошла ошибка. Видео не найдено.");
            t.changeLocationHash(e.attr("href")), Nethouse.Modal.openHtml(n.block, {
                open: function () {
                    var e = $(".js-video-window"), i = e.find(".item-content").attr("id").replace("item", "");
                    n.nocomment || $.post("/get/commentswindow", {object: i, type: Comments.types.video}, function (n) {
                        if (n.success) {
                            var i, o = $(n.block), a = e.find(".item-info");
                            o.hide(), a.append(o), a.find(".comments-block").slideDown(), t.bindInputCharCounter(), i = e.find("#comment_form"), Comments.initFormImages(i), Comments.initImageUpload(i), Comments.validateWindowForm(i), "undefined" != typeof CommentsUser && CommentsUser.reloadEvents()
                        } else ntNotification.showError("Произошла ошибка. Видео не найдено.")
                    }, "json")
                }
            })
        }, "json")
    }, getShareByMailForm: function (e) {
        var t = this, n = {id: e.attr("data-id"), type: e.attr("data-type"), token: e.attr("data-token")};
        $.post("/getmailform", n, function (e) {
            e.success && Nethouse.Modal.openHtml(e.form, {
                open: function () {
                    t.shareByMailFormValidate()
                }
            }, !1)
        })
    }, shareByMailFormValidate: function () {
        $("form#sharebyemail").validate({
            submitHandler: function (e) {
                return Notifier.showIndicator("sharebyemail"), $(e).ajaxSubmit({
                    success: function (t) {
                        if (Notifier.hideIndicator("sharebyemail"), t.success) return void Nethouse.Modal.openHtml(t.success_window, null, !1);
                        void 0 != t.error ? Nethouse.Modal.openHtml(t.error, null, !1) : t.error != e && Nethouse.Modal.openHtml(t.form, null, !1)
                    }
                }), !1
            },
            focusInvalid: !1,
            focusCleanup: !0,
            rules: {email: {required: !0, email: !0}},
            messages: {
                email: {
                    required: view.translate("Пожалуйста, укажите email адрес"),
                    email: view.translate("Введите корректный email")
                }
            },
            errorPlacement: function (e, t) {
                var n = t.parent().parent().find(".state_field");
                e.appendTo(n)
            },
            highlight: function (e) {
                $(e).attr("id");
                $(e).parent().parent().find(".state_field").addClass("red"), $(e).addClass("error")
            },
            unhighlight: function (e) {
                $(e).parent().parent().find(".state_field").removeClass("red"), $(e).removeClass("error")
            }
        })
    }, ShareLinks: function (e) {
        var t = $(e).attr("href"), n = [560, 472], i = screen.width ? (screen.width - n[0]) / 2 : 0,
            o = screen.height ? (screen.height - n[1]) / 2 : 0,
            a = "height=" + n[1] + ",width=" + n[0] + ",top=" + o + ",left=" + i + ",scrollbars=yes,resizable";
        return window.open(t, "SocialNet", a), !1
    }, getVideo: function (e) {
        var t = this, n = $(e).prop("class").replace("video-intext ", ""),
            i = $(e).prop("alt").replace(/<(\/)?(\s)*script(\s)*>/, ""),
            o = $(e).prop("id").replace(/<(\/)?(\s)*script(\s)*>/, ""),
            a = $(e).prop("title").replace(/<(\/)?(\s)*script(\s)*>/, ""),
            r = t.VideoConfig[n].content.replace(/\#/g, o);
        r = '<div id="video-content" class="video" style="width: 740px;" data-code="' + o + '"><div class="item-content"><header><h1 class="video__header">' + a + '</h1></header><div class="video__content">' + r + '<div class="video__stub"><div class="video-desc video__desc">' + i + "</div></div></div></div></div>", Nethouse.Modal.openHtml(r, {
            beforeOpen: function () {
                $(".fancybox-skin").addClass("imageGallery")
            }, open: function () {
                t.changeLocationHash("#video-c_" + o)
            }
        })
    }, VideoConfig: {
        youtube: {
            image: "//img.youtube.com/vi/?/default.jpg",
            regexp: /(?:(?:youtube\.com\/watch\?(?:[\w\d]+\=[\w\d]+\&)*v\=)|(?:youtu\.be\/)|(?:youtube\.com\/user\/[\w\d]+(?:\?(?:[\w\d]+\=[\w\d]+[\&]?)+)?#p\/(?:[\w]\/){0,4}[\d]+\/))([_a-zA-Z0-9-]+)/i,
            content: '<iframe width="700" height="390" src="//www.youtube.com/embed/#?rel=0" frameborder="0" allowfullscreen></iframe>'
        },
        youtu: {
            image: "//img.youtube.com/vi/?/default.jpg",
            regexp: /(?:(?:youtube\.com\/watch\?(?:[\w\d]+\=[\w\d]+\&)*v\=)|(?:youtu\.be\/)|(?:youtube\.com\/user\/[\w\d]+(?:\?(?:[\w\d]+\=[\w\d]+[\&]?)+)?#p\/(?:[\w]\/){0,4}[\d]+\/))([_a-zA-Z0-9-]+)/i,
            content: '<iframe width="700" height="390" src="//www.youtube.com/embed/#?rel=0" frameborder="0" allowfullscreen></iframe>'
        },
        rutube: {
            image: "//tub.rutube.ru/thumbs-wide/?-2.jpg",
            regexp: /(?:(?:rutube\.ru\/tracks\/[0-9]+\.html\?v\=)|(?:video\.rutube\.ru\/))([_a-zA-Z0-9]+)/i,
            content: '<iframe width="700" height="390" src="//rutube.ru/video/embed/#" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>'
        },
        vimeo: {
            image: "",
            regexp: /vimeo\.com\/([0-9]+)/i,
            content: '<iframe src="//player.vimeo.com/video/#?title=0&amp;byline=0&amp;portrait=0" width="700" height="390" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
        }
    }, showUpLink: function (e) {
        var t = document.body.clientWidth, n = $("#up-link");
        t > 1100 && $(e).scrollTop() > 400 ? n.fadeIn() : n.fadeOut(200)
    }, scrollTop: function (e) {
        return $("body,html").animate({scrollTop: 0}, 200), e.preventDefault(), !1
    }, keyEvents: function (e) {
        if (e = e || window.event, 27 == e.keyCode) {
            $(".on-edit:not(.static)").not("#comment-edit").length > 0 && Site.toggleBlock(), $.jPicker && $.jPicker.List.forEach(function (e) {
                e.hide()
            })
        }
    }, decorateContent: function () {
        $(document).on("widget_init", function () {
            $("#content").find(".user-inner li:not(:has(i.circles))").prepend('<i class="circles"></i>')
        }), $("#content").find(".user-inner li:not(:has(i.circles))").prepend('<i class="circles"></i>')
    }, makeOrder: function (e) {
        $forOrder = $(e).parents(".content-block").attr("id").replace("-show", "");
        var t = $(e).parents(".item-content"), n = "";
        return t.length > 0 && (n = $(t).attr("id").replace("item", "") || ""), Feedback.init($forOrder, {
            sid: n,
            order: !0
        })
    }, _initValidate: function () {
        $.validator.setDefaults({
            showErrors: function (e, t) {
                if (t.length < 1) return void $("ul.errors").remove();
                $.each(t, function (e, t) {
                    var n = $(t.element);
                    n.removeClass("valid").addClass("error"), n.is('input[type="checkbox"]') || (n.removeClass("valid").addClass("error"), n.next("ul.errors").remove(), n.after($("<ul/>").addClass("errors").append($("<li/>").text(t.message))))
                })
            }
        })
    }, preloadBannerImages: function (e) {
        if (void 0 !== document.body) try {
            $("#banner-carousel").html(Notifier.getLoader());
            var t = document.createElement("div"), n = t.style;
            n.position = "absolute", n.top = n.left = 0, n.display = "none", document.body.appendChild(t);
            for (var i in e) {
                var o = document.createElement("img");
                o.src = e[i], t.appendChild(o)
            }
            BannerShow()
        } catch (e) {
        }
    }, ymaploaded: function (e) {
        var t = $(e).attr("src");
        void 0 != t && "about:blank" != t && $("#ymap-container #ajax-loader").remove()
    }, findAddress: function (e) {
        var t = $(e), n = t.prevAll(".address-value"),
            i = (n.html(), n.data("geolat"), n.data("geolng"), n.data("geozoom"));
        i = i || 0;
        t.hasClass("gmap") || t.hasClass("2gismap");
        var o = (t.data("host"), t.data("lang"), t.attr("href"));
        Popup.showDialog('<div id="map-container"><div id="ajax-loader"></div><iframe id="map-frame" width="600" height="450" marginheight="0" marginwidth="0" frameborder="0" src=""></iframe></div>', {
            closeBtn: !0,
            padding: 10
        });
        var a = $("#map-frame");
        a.attr("src", o), a.load(function () {
            var e = $(this).attr("src");
            void 0 != e && "about:blank" != e && $("#map-container #ajax-loader").remove()
        })
    }, setSrcToFrameMap: function () {
        var e = $("#main-contacts .address ul iframe[id^=ymap-], #main-contacts .address ul iframe[id^=gmap-], #main-contacts .address ul iframe[id^='2gismap-']");
        return e.length && e.each(function () {
            var e = $(this);
            if (void 0 != e.attr("src")) return !0;
            var t = e.attr("id"), n = t.replace(/-\d+/, "");
            "ymap" != n && "gmap" != n && "2gismap" != n && (n = "ymap");
            var i = $(this).data("host"), o = $(this).data("lang"),
                a = $(this).prevAll("span.address-value").data("geolat"),
                r = $(this).prevAll("span.address-value").data("geolng"),
                s = $(this).prevAll("span.address-value").data("geozoom");
            s = s || 0;
            var c = $(this).prevAll("span.address-value").html(),
                d = document.location.protocol + "//" + i + "/" + n + "/addr/" + c + "/" + s + "/w/550/h/300/embedded/" + o;
            void 0 != a && void 0 != r && (d = document.location.protocol + "//" + i + "/" + n + "/coords/" + a + ";" + r + "/" + s + "/w/550/h/300/embedded/" + o), $(this).attr("src", d)
        }), !1
    }, getUrgentMessage: function () {
        var e = {pid: $(".top-news").data("mid")}, t = function (e) {
            Popup.showDialog(e.content)
        };
        return view.query("/geturgentcontent", t, null, e), !1
    }, setPostCounterNull: function () {
        var e = $("#blog-counter");
        if (e.length > 0) {
            var t = {type: "all"}, n = function () {
                e.hide()
            };
            view.query("/markpostread", n, null, t)
        }
    }, toggleLanguage: function (e) {
        var t = $(e).val() || "ru";
        return view.query("/togglelang", function (e) {
            void 0 != e.success && 1 == e.success && window.location.reload()
        }, "", {lang: t}), !1
    }, bindImageViewer: function (e, t) {
        var n = this;
        if (e && e.length) {
            var i = function () {
            };
            t = t || {}, t.fitToView = !1, t.fixed = !1, t.scrolling = t.scrolling || "no", t.nextEffect = "none", t.prevEffect = "none", t.openEffect = "fade", t.openSpeed = "slow", t.iframe = {preload: !1}, t.minHeight = 1, t.live = !0, t.minWidth = 1, t.beforeShow && (i = t.beforeShow);
            t.afterLoad && t.afterLoad;
            var o = function () {
            };
            t.beforeLoad && (o = t.beforeLoad);
            var a = function () {
            };
            t.afterClose && (a = t.afterClose), t.beforeLoad = function () {
                return n.fancy = this, $.fancybox.showLoading(), o()
            }, t.beforeShow = function () {
                "html" == n.fancy.type && void 0 == n.fancy.isGallery && (n.fancy.height = $(".fancybox-inner").innerHeight()), $("html").addClass("modal-open"), $.fancybox.hideLoading();
                var e = $(".fancybox-wrap");
                e.addClass(t.className), e.addClass("imageviwer"), t.clickBlocked || e.addClass("can-close");
                var o = t.href || n.fancy.href;
                if (o) {
                    var a;
                    if (/\/img\//.test(o)) {
                        var r = n.fancy.element.context.id.split("-");
                        r[1] && n.changeLocationHash("#img-" + r[1])
                    } else /http[s]?:\/\/.*\/video/.test(o) && (a = o.replace(/http[s]?:\/\/.*\/video\//, "")) && n.changeLocationHash("#video-" + a)
                } else {
                    var s = this.content, c = $(s).closest("#video-content").data("code");
                    c && n.changeLocationHash("#video-c_" + c)
                }
                i(), n.isFancyLoad = !0
            }, t.afterClose = function (e) {
                if ($("html").removeClass("modal-open"), window.location.hash.length > 1) if (window.history && window.history.replaceState) {
                    var t = window.location.pathname + window.location.search;
                    window.history.replaceState({}, "", t)
                } else window.location.hash = " ";
                a(e), n.isFancyLoad = !1
            }, e.fancybox(t)
        }
    }, scrollbarWidth: function () {
        var e, t = $("body"),
            n = $('<div style="position: absolute; left: -100000px; height: 100px; width: 100px;"></div>');
        return t.append(n), e = n.width(), n.css("overflow", "scroll"), e -= n.width(), e || (e = n.width() - n[0].clientWidth), n.remove(), $("head").append('<style type="text/css">.modal-open { padding-right: ' + e + "px } .scroll-width { padding-right:" + e + "px }</style>"), e
    }, checkViewer: function () {
        var e = window.location.hash;
        if (/^#img-.*$/.test(e)) {
            var t = e.split("-");
            if (null === t) return;
            t = t[1], $("#view-" + t).trigger("click");
            var n = new RegExp("^.*" + t + ".*$");
            $("a.fancy-img, img.fancy-img-post, li.view-photo a").each(function () {
                $this = $(this);
                var e = "";
                if ($this.is("a") ? e = $this.attr("href") : $this.is("img") && (e = $(this).data("eval")), n.test(e)) return $this.trigger("click"), !1
            })
        } else if (/^#video-\d*$/.test(e)) {
            var i = e.match(/^#video-(\d+)$/);
            if (null === i) return;
            i = i[1];
            var n = new RegExp("^.*#video-" + i + ".*$");
            $("a.video-link,.video-item a:not(.video-link)").each(function () {
                var e = $(this).attr("href");
                if (n.test(e)) return $(this).trigger("click"), !1
            })
        } else if (/^#video-c_\w+$/.test(e)) {
            var o = e.match(/^#video-c_(\w+)$/);
            if (null === o) return;
            o = o[1], $("#" + o).trigger("click")
        }
    }, changeLocationHash: function (e) {
        window.history && window.history.replaceState ? window.history.replaceState({}, "", e) : window.location.hash = e
    }, getPhotos: function (e, t) {
        return $.ajax("/photoalbum/load/getalbumphotos", {
            method: "POST",
            data: {aid: e, page: t, isView: !0},
            dataType: "json"
        }).then(function (e) {
            if (e.success) {
                var t = $(e.data).wrap("<div></div>").parent();
                return this.preparePhotosData(t.find(".photos a"), t.find("#photoview-tpl").data("base"))
            }
        }.bind(this))
    }, preparePhotosData: function (e, t) {
        return e.map(function () {
            var e = $(this).parent(), n = e.parents(".album-items-wrap"), i = n.hasClass("homepage"), o = e.data(),
                a = n.data();
            return o.fullSize_href = o.raw, o.id = e.attr("id"), o.src = o.view, o["photoId_data-pid"] = o.pid, o["desctext_data-pid"] = o.pid, i && (a = $.extend(a, e.find(".view-photo-href").data())), o = $.extend({}, o, a), o.albumname_href = t + "/" + o.albumid, o
        }).get()
    }, viewPhoto: function () {
        var e, t, n, i, o = this, a = $("#photoview-tpl"), r = $("#photoalbum-show .view-photo > a");
        return r.on("click", function () {
            return e = o.preparePhotosData(r, a.data("base")), t = !0, Nethouse.Modal.openListImages(e, a.html(), r.index(this), {
                open: function (e) {
                    n = function (t, n) {
                        var i = window._.find(e.items, function (e) {
                            return (e.data ? e.data.pid : e.pid) == n.pid
                        });
                        i.data.desc = n.desc, i.data.desctext = n.desctext, Nethouse.Modal.update()
                    }, i = function () {
                        Nethouse.Modal.close()
                    }, $(document).on("changePhotoDesc", n), $(document).on("deletePhoto", i)
                }, beforeNext: function () {
                    return t
                }, beforePrev: function () {
                    return t
                }, close: function () {
                    $(document).off("changePhotoDesc", n), $(document).off("deletePhoto", i)
                }, change: function (e, n) {
                    var i = e.data.page, a = Math.ceil(e.data.total / 40), r = null, s = e.data.albumid;
                    return t = !1, s ? (e.data.current == 40 * i || e.data.current == e.data.total ? r = a == i ? 1 : i + 1 : e.data.current == 40 * (i - 1) + 1 && (r = 1 == i ? a : i - 1), !r || _.findWhere(n.st.items, {page: r}) ? void(t = !0) : void o.getPhotos(e.data.albumid, r).then(function (e) {
                        r < i && (n.st.index = n.index + e.length, n.index = n.index + e.length), n.st.items = n.st.items.concat(e), n.st.items = _.sortBy(n.st.items, "current"), n.items = _.clone(n.st.items), n.updateItemHTML(), t = !0
                    })) : void(t = !0)
                }, imageLoaded: function (e) {
                    var t = $(".js-photo-window"), n = t.find("#view-photo-desc"), i = t.find("#photo-desc"),
                        a = "" != $.trim(n.find(".text").text()), r = e.data.id.split("-");
                    i.val(i.html()), n.find(".placeDesc").toggle(!a), r[1] && o.changeLocationHash("#img-" + r[1]), void 0 != o.getcomments && o.getcomments.abort(), o.getcomments = $.post("/get/commentswindow", {
                        object: e.data.pid,
                        type: Comments.types.images
                    }, function (e) {
                        if (e.success) {
                            var n, i = $(e.block);
                            t.find(".js-photo-window__comments").html(i), o.bindInputCharCounter(), n = t.find("#comment_form"), Comments.initFormImages(n), Comments.initImageUpload(n), Comments.validateWindowForm(n), "undefined" != typeof CommentsUser && CommentsUser.reloadEvents()
                        }
                    }.bind(this), "json")
                }.bind(this)
            }), !1
        }), !1
    }, viewCommentImageAttachment: function () {
        return $("body").on("click", ".js-comment-image-link", function () {
            var e = $(this).parents(".js-comment-images").find(".js-comment-image-link"), t = e.map(function () {
                var e = $(this), t = e.data();
                return t.src = t.view, t.fullSize_href = t.raw, t
            }).get();
            return Nethouse.Modal.openListImages(t, $(".js-imageAttachmentView-tpl").html(), e.index(this)), !1
        }), !1
    }, charCounter: function (e, t, n, i) {
        void 0 !== i && !1 === i && (e = e.replace(/(<\/?[^>]+>)|(&nbsp;)/gi, ""));
        var o = t - e.length;
        o < 0 && (o = 0), n.html(o)
    }, bindInputCharCounter: function () {
        var e = this,
            t = '<span class="infoDigits char_info">' + view.translate("Осталось символов") + ': <span class="char_limit"></span></span>';
        $("input, textarea:visible, #comment_form textarea").each(function () {
            var n, i = $(this), o = i.data("charcounter");
            if (n = i.attr("maxlength")) {
                var a, r;
                if (i.parents("dd").length && "no" != o) {
                    r = i.attr("id");
                    var s = i.parents("dl").find("dt#" + r + "-label");
                    s.find("span.char_info").length || s.prepend(t), a = $("#" + r + "-label .char_info .char_limit")
                } else "yes" == o && (r = i.attr("id"), i.parent().find("span.char_info").length || i.parent().prepend(t), a = i.parent().find("span.char_info .char_limit"));
                void 0 !== r && $("#" + r).unbind(".limit").bind("change.limit keyup.limit", function () {
                    e.charCounter($(this).val(), n, a)
                }).triggerHandler("change.limit")
            }
        })
    }, bindInputCharCounterByElement: function (e) {
        var t, n = this,
            i = '<span class="infoDigits char_info">' + view.translate("Осталось символов") + ': <span class="char_limit"></span></span>',
            o = e.data("charcounter");
        if (t = e.attr("maxlength")) {
            var a, r;
            if (e.parents("dd").length && "no" != o) {
                r = e.attr("id");
                var s = e.parents("dl").find("dt#" + r + "-label");
                s.find("span.char_info").length || s.prepend(i), a = $("#" + r + "-label .char_info .char_limit")
            } else "yes" == o && (r = e.attr("id"), e.parent().find("span.char_info").length || e.parent().prepend(i), a = e.parent().find("span.char_info .char_limit"));
            void 0 !== r && $("#" + r).unbind(".limit").bind("change.limit keyup.limit", function () {
                n.charCounter($(this).val(), t, a)
            }).triggerHandler("change.limit")
        }
    }, subscriberAddFormValidate: function () {
        $('form#subscriber-add-form input[type="text"]:visible:not([placeholder])').focus(function () {
            var e = $(this);
            e.val() == e.data("default") && e.val("")
        }).blur(function () {
            var e = $(this), t = e.val(), n = e.data("default");
            "" == t && e.val(n)
        }), $("form#subscriber-add-form").validate({
            submitHandler: function (e) {
                return Notifier.showIndicator("subscribe-left"), $(e).ajaxSubmit({
                    success: function (e) {
                        Notifier.hideIndicator("subscribe-left");
                        try {
                            if (void 0 != e.form) {
                                var t = $(e.form).find('input[id*="csrf"]');
                                t.length && $("#subscriber-add-form").find('input[id*="csrf"]').replaceWith(t)
                            }
                            void 0 != e.success && 1 == e.success ? Nethouse.Modal.openHtml(e.success_window, null, !1) : ntNotification.showError("Ошибка при добавлении подписчика")
                        } catch (e) {
                            ntNotification.showError(e.message)
                        }
                    }
                }), !1
            },
            focusInvalid: !0,
            focusCleanup: !1,
            errorClass: "error",
            rules: {name: {required: !0, minlength: 1}, email: {required: !0, email: !0}},
            messages: {
                name: {required: view.translate("Пожалуйста, укажите свое имя")},
                email: {
                    required: view.translate("Пожалуйста, укажите email адрес"),
                    email: view.translate("Введите корректный email")
                }
            }
        })
    }, formsHashHandler: function () {
        var e, t = location.hash;
        void 0 !== t && "" !== t && null !== t && (e = function () {
            switch (!0) {
                case/\#(\/)?feedback/.test(t):
                    return "a.feedback-btn[data-type=0]";
                case/\#(\/)?callback$/.test(t):
                    return "a.feedback-btn[data-type=1]";
                case/\#(\/)?order\-form/.test(t):
                    return "button.order, .buttons.order";
                case/\#(\/)?one\-click\-form/.test(t):
                    return "a.one-click-order-btn";
                default:
                    return ""
            }
        }.call(this), null !== $(e) && $(e).length > 0 && $(e).trigger("click"))
    }, initDropDown: function () {
        $(".ui.dropdown").on("click", function (e) {
            e.stopPropagation()
        }), $(".ui.dropdown:not(.with-inputs)").each(function (e, t) {
            t = $(t), t.find("label.item").removeClass("active");
            var n = t.children(".text").addClass("default");
            n.attr("data-text") || n.attr("data-text", n.text()), t.dropdown({
                useLabels: !1,
                message: {count: n.attr("data-text") + " ({count})"}
            })
        }), $(".ui.dropdown.with-inputs").dropdown({
            useLabels: !1,
            action: "nothing"
        }), $(".ui.dropdown.menu").dropdown({action: "nothing", transition: "fade", keepOnScreen: !0})
    }, initTab: function () {
        $("#product-full-desc .paths .menu .item").on("click", function (e) {
            e.stopPropagation()
        }), $("#product-full-desc .paths .menu .item").tab({context: "#product-full-desc .paths"})
    }
};
var d = document, ie = d.all && !window.opera, op = "", OneClickBuy = {
    selector: "a.one-click-order-btn",
    formSelector: "form.order-by-click",
    link: void 0,
    init: function () {
        $(this.selector).length > 0 && this.initEventListener()
    },
    initEventListener: function () {
        var e = this;
        $(document).on("click", this.selector, function (t) {
            setTimeout(function () {
                e.openModal($(e.selector), t)
            }, 200)
        })
    },
    handleFormSubmit: function () {
        var e = $(this.formSelector).parents(".window").find("button.send"), t = this;
        e.length > 0 && $(e).click(function (e) {
            e.preventDefault(), $(t.formSelector).submit()
        })
    },
    openModal: function (e, t) {
        var n = $(e).attr("data-product-id"), i = $(e).attr("data-href"), o = this, a = $("#product-params-view"),
            r = [];
        if (a.length > 0 && (r = window.Nethouse.cart.getParamsValues(a), !r.length)) return ntNotification.showWarning("Выберите все параметры", 4e3), void t.preventDefault();
        Nethouse.Modal.openHtmlAjax(i, {
            opts: {type: "POST", data: {productId: n, selectedParams: JSON.stringify(r)}},
            error: "Ошибка при загрузке формы",
            open: function () {
                o.addFieldsValidators(), o.handleFormSubmit()
            }
        })
    },
    addFieldsValidators: function () {
        $(this.formSelector).validate({
            focusInvalid: !1,
            focusCleanup: !0,
            rules: {clientName: {required: !0}, clientPhone: {required: !0, phone: !0}},
            messages: {
                clientName: {required: view.translate("Введите корректное имя")},
                clientPhone: {required: view.translate("Введите номер телефона")}
            }
        })
    }
};
Feedback = {
    init: function (e, t) {
        return this.type = e, this.params = t || {}, this.loadEvents(), this.showFeedback(), this.id = "feedback" == e ? "feedback-edit-window" : "services-edit-window", !1
    }, loadEvents: function () {
    }, showFeedback: function () {
        var e, t = this;
        if (this.params.order) e = "/" + this.type + "/load/makeorder", this.params.type = this.type, n = this.params; else {
            e = "/mailer/getform";
            var n = {type: this.type}
        }
        return Nethouse.Modal.openHtmlAjax(e, {
            opts: {type: "POST", data: n},
            error: "Ошибка при загрузке формы",
            open: function () {
                $(t.windowId).addClass(t.type), t.submitFeedback($("#" + t.type + "-order-form"))
            }
        }), !1
    }, submitFeedback: function (e) {
        var t = this, n = $(e);
        return e.validate({
            submitHandler: function (e) {
                var n = t.type + "-edit-window";
                Notifier.showIndicator(n, !0), $(e).ajaxSubmit({
                    dataType: "json", success: function (e) {
                        Notifier.hideIndicator(n, !0);
                        try {
                            if (void 0 != e && 1 == e.success) {
                                if (e.script_url) {
                                    var i = document.createElement("script");
                                    i.async = !0, i.src = e.script_url, document.body.appendChild(i)
                                }
                                Nethouse.Modal.close(), setTimeout(function () {
                                    ntNotification.showSuccess(view.translate("Форма успешно отправлена"));
                                    var e = Nethouse.DynamicForm.getSubmitHash(t.type);
                                    e && (window.location.hash = e)
                                }, 300)
                            } else {
                                var o = e.msg || view.translate("Ошибка при отправке письма!");
                                Notifier.showError(o, "#" + t.id + " #windowContent")
                            }
                        } catch (e) {
                            ntNotification.showError(e)
                        }
                    }
                })
            }, focusInvalid: !1, focusCleanup: !0, rules: t.feedbackRules(e), messages: t.feedbackErrors(e)
        }), (n.is("#products-order-form") || n.is("#services-order-form")) && t.initUploadFile(e), !0
    }, initUploadFile: function (e) {
        var t, n, i = this, o = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "jpeg", "gif", "png", "zip", "rar"],
            a = $(e), r = !1, s = $('<div id="progress"><div class="progressbar-value"></div></div>'),
            c = "fancybox-content", d = a.attr("data-file-upload") || "/putdocpub";
        a.is("#products-order-form") ? c = "products-edit-window" : a.is("#services-order-form") && (c = "services-edit-window"), t = a.find(".attach-btn a"), n = new Nethouse.Uploader(t[0], {path: d}), n.addExtensionFilter(o).addFileSizeFilter(20 * Nethouse.Uploader.MB).on("before", function (e) {
            e.length && (Notifier.showIndicator(c), s.hide(), r || (r = !0, t.after(s)), t.hide())
        }.bind(this)).on("progress", function (e) {
            s.show(), s.find(".progressbar-value").css({width: e.loaded / e.total * 100 + "%"})
        }).on("filecomplete", function (e, n, o) {
            if (Notifier.hideIndicator(c), s.hide(), t.show(), e) return void ntNotification.showError(sprintf(window.view.translate("js_uploader_upload_file_fail"), o.name), 6e3);
            var r, d, l, u, m, p, h, f = window.JSON.parse(n.response);
            f.success && f.url || ntNotification.showError(sprintf(window.view.translate("js_uploader_upload_file_fail"), o.name), 6e3), r = f.url, d = f.name, l = f.size, u = f.timestamp, a.find("#attach-url").val(r), a.find("#attach-name").val(d), a.find("#attach-size").val(l), a.find("#attach-timestamp").val(u), m = a.find(".attach-info .file-info"), m.find(".attach-file-name").html(d), p = i.getHumanReadableFileSize(l), m.find(".attach-file-size").html(p), m.parent().show(), a.find(".attach-btn").hide(), (h = i.getFileIcon(d)) && a.find(".file-icons").addClass(h)
        }).on("error", function (e, n) {
            s.hide(), t.show();
            var i = Nethouse.Uploader.Errors;
            switch (e) {
                case i.EXTENSION:
                    ntNotification.showError(sprintf(view.translate("js_uploader_extension_fail"), n.file.name, o.join(", ")), 6e3);
                    break;
                case i.MAX_SIZE:
                    ntNotification.showError(sprintf(view.translate("js_uploader_max_size_fail"), n.file.name, "20 MB"), 6e3)
            }
        }.bind(this))
    }, getHumanReadableFileSize: function (e) {
        e = parseInt(e);
        return e >= 1048576 ? Math.round(e / 1048576 * 10) / 10 + " Мб" : e >= 1024 ? Math.round(e / 1024 * 10) / 10 + " кб" : e + " б"
    }, getFileIcon: function (e) {
        e = e.toLowerCase();
        var t = {
            pdf: [/pdf$/],
            xls: [/xls$/, /xlsx$/],
            jpg: [/jpg$/, /jpeg$/],
            psd: [/psd$/],
            mp3: [/mp3$/],
            gif: [/gif$/],
            ai: [/ai$/],
            eps: [/eps$/],
            png: [/png$/],
            zip: [/zip$/],
            rar: [/rar$/],
            txt: [/txt$/],
            rtf: [/rtf$/],
            doc: [/doc$/, /docx$/],
            ppt: [/ppt$/, /pptx$/],
            djvu: [/djvu$/, /djvue$/],
            fb: [/fb$/],
            ps: [/ps$/]
        }, n = null;
        for (var i in t) {
            var o = t[i];
            for (var a in o) if (o[a].test(e)) {
                n = i;
                break
            }
        }
        return n && (n += "-icon"), n
    }, getUid: function (e) {
        e = e || 32;
        for (var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], n = "", i = 0; i < e; i++) {
            n += t[Math.floor(16 * Math.random()) + 0]
        }
        return n
    }, startProgressUpload: function (e, t) {
        var n = this, i = $('<div id="progress"><div class="progressbar-value"></div></div>');
        $(e).after(i).css("display", "none"), setTimeout(function () {
            n.updateProgress(t, i)
        }, 1e3)
    }, updateProgress: function (id, progressbar, success) {
        var _self = this;
        $.ajax({
            url: "/getprogress",
            timeout: 3e3,
            headers: {"X-Progress-ID": id},
            dataType: "script",
            complete: function (e, t) {
            },
            error: function (e, t, n) {
            },
            success: function (data) {
                var response = null;
                try {
                    response = eval(data)
                } catch (e) {
                    response = {}
                }
                var progress = 0;
                if (void 0 != response.state) if (void 0 != success && "function" == typeof success) success(response, id); else {
                    if ("uploading" == response.state) {
                        var size = response.size, received = response.received;
                        progress = Math.floor(received / size * 100), size != received && setTimeout(function () {
                            _self.updateProgress(id, progressbar)
                        }, 1e3)
                    } else {
                        if ("starting" == response.state) return void setTimeout(function () {
                            _self.updateProgress(id, progressbar)
                        }, 500);
                        "done" == response.state && (progress = 100)
                    }
                    progressbar.find(".progressbar-value").stop(!0).animate({width: parseInt(3 * progress) + "px"}, 2e3)
                }
            }
        })
    }, feedbackRules: function (e) {
        var t = $(e).data("type"), n = {FORM_TYPE_FEEDBACK: 0, FORM_TYPE_CALLBACK: 1, FORM_TYPE_ORDER: 2},
            i = {maxlength: 1e3};
        "call" != t && (i.required = !0);
        var o = {
            content: i,
            fio: {required: !0, maxlength: 100},
            email: {required: !0, maxlength: 50, email: !0},
            phone: {phone: !0, required: !0, maxlength: 26}
        };
        switch (t) {
            case"services":
                o.serviceName = {required: !0};
                break;
            case"products":
                o.productName = {required: !0}, o.phone = {phone: !0};
                break;
            case n.FORM_TYPE_FEEDBACK:
                o.phone = {required: !1}
        }
        return o
    }, feedbackErrors: function () {
        var e = {
            content: {
                maxlength: view.translate("Введено больше символов"),
                required: view.translate("Обязательное поле")
            },
            fio: {maxlength: view.translate("Введено больше символов"), required: view.translate("Обязательное поле")},
            email: {
                maxlength: view.translate("Введено больше символов"),
                required: view.translate("Обязательное поле"),
                email: view.translate("Неверный формат почты")
            },
            phone: {
                phone: view.translate("Только цифры и +. Пример: +79123456789"),
                maxlength: view.translate("Введено больше символов"),
                required: view.translate("Обязательное поле")
            }
        };
        switch (this.type) {
            case"services":
                e.serviceName = {required: view.translate("Выберите услугу")};
                break;
            case"products":
                e.productName = {required: view.translate("Выберите товар")}
        }
        return e
    }
}, $(document).ready(function () {
    Visitor.init()
});
var PromoCodeService = function () {
    function e() {
    }

    return e.getPromoCode = function (e) {
        return $.ajax({
            type: "POST",
            url: "/products/load/getdiscount",
            data: {code: e},
            dataType: "json"
        }).then(function (e) {
            return e && e.success ? e.promocode : null
        })
    }, e.calculateDiscount = function (t, n, i, o) {
        void 0 === i && (i = "");
        var a, r = t.conditions, s = 0;
        switch (Number(t.type)) {
            case e.PROMOCODE_FORALL:
                for (a in r) s = r[a].discount;
                return parseFloat(n - parseFloat(n * parseFloat(s) / 100)).toFixed(2);
            case e.PROMOCODE_PERCENT:
                for (a in r) n > parseFloat(r[a].condition) && (s = parseFloat(r[a].discount));
                return parseFloat(n - parseFloat(n * parseFloat(s) / 100)).toFixed(2);
            case e.PROMOCODE_CURRENCY:
                for (a in r) n > parseFloat(r[a].condition) && (s = parseFloat(r[a].discount));
                return parseFloat(n - parseFloat(s)).toFixed(2);
            case e.PROMOCODE_ARTICUL:
                for (a in r) if (r[a].discount == i && "" != i) return s = parseFloat(r[a].condition), parseFloat(s * o) < parseFloat(n) ? parseFloat(parseFloat(n) - parseFloat(s * o)).toFixed(2) : parseFloat(n).toFixed(2)
        }
        return n
    }, e
}();
PromoCodeService.PROMOCODE_FORALL = 0, PromoCodeService.PROMOCODE_PERCENT = 1, PromoCodeService.PROMOCODE_CURRENCY = 2, PromoCodeService.PROMOCODE_ARTICUL = 3;
var Cart = function () {
    this.blockId = "products", this.blockLeft = "products-cart-left", this.orderBtn = $("#products").find(".buttons.cart"), this.orderForm = "#product-order-form", this.pushUrl = "/" + this.blockId + "/load/pushtocart", this.updateUrl = "/" + this.blockId + "/load/updatecart", this.promocode = null, this.timeouts = {}, this.orderData = $("#view-cart-show"), this.clientData = $("#user-info"), this.initIncremental(), this.loadEvents(), this.addValidateMethods(), this.initShipping(), this.initPromoCode()
};
$.extend(Cart.prototype, {
    initIncremental: function () {
        $(".js-incremental-field").incrementalInput({
            min: 0, canChange: function (e) {
                return !Cart.countUpdated && !e.prop("disabled")
            }, onChange: function (e, t, n) {
                0 === t && 0 == n || this.restoreItem(e) || this.update(e, "update", !0)
            }.bind(this)
        })
    }, addValidateMethods: function () {
        $.validator.addMethod("payment_qiwi_phone", function (e, t) {
            return !$("#payments-14").attr("checked") || (e = e.replace(/[^\d]/g, ""), this.optional(t) || /^(7|8)\d{10}$/i.test(e))
        }, view.translate("Введите корректный номер QIWI кошелька")), $.validator.addMethod("phone", function (e, t) {
            var n = e.trim();
            return this.optional(t) || /^[+]?(\d)+$/i.test(n)
        }, view.translate("Только цифры и +. Пример: +79123456789")), $.validator.addMethod("payment_pscb_phone", function (e, t) {
            return !$("#payments-204").attr("checked") || (e = e.replace(/[^\d]/g, ""), this.optional(t) || /^(7|8)\d{10}$/i.test(e))
        }, view.translate("Введите корректный номер ПСКБ кошелька")), $.validator.addMethod("onecheck", function () {
            return $("#accept_agreement:checked").length >= 1
        }, "Принять условия публичной оферты")
    }, summDeliveryPrice: function (e) {
        var t = $("#delivery-choose");
        if (t.length > 0) {
            var n = t.find("input.delivery-choose:checked").val();
            if (void 0 != n && e > 0) {
                var i = parseFloat(n.replace("/[^d.]/", ""));
                t.find("#total-summ-order span").html((e + i).toFixed(2))
            } else t.find("#total-summ-order span").html(e.toFixed(2))
        }
    }, initPromoCode: function () {
        var e = this, t = $("#promocode-form");
        t.find("input").val() && this.checkPromoCode(), $(document).on("click", t.find(".buttons").selector, function () {
            return e.checkPromoCode(), !1
        }), $(document).on("change", t.find("input").selector, function () {
            return e.checkPromoCode(), !1
        })
    }, initShipping: function () {
        var e = $.fn.shipping.events, t = $(document), n = this.orderData.find(".btn-contact-step"),
            i = $(".js-shipping").shipping();
        i.length && (n.on("click", function () {
            return i.shipping("citySelected") && i.shipping("rateSelected")
        }), i.on(e.rateChanged, function (e, t) {
            var n = this.getTotal(), i = (n + t.price).toFixed(2), o = this.getTotalShippingElm();
            $(".js-shipping__shipment-id").val(t.shipment), $(".js-shipping__rate-id").val(t.id), $(".js-shipping__pickup-point-id").val(t.pickupPoint), o.html(i).data("shipping-price", t.price)
        }.bind(this)), t.on("cart-total-changed", function () {
            var e, t = this.getTotal(), n = this.getTotalShippingElm();
            if (this.summDeliveryPrice(t), !n.length) return !0;
            e = (t + n.data("shipping-price")).toFixed(2), n.html(e)
        }.bind(this)), t.on("cart.update", function () {
            i.trigger(e.updateRates)
        }))
    }, getTotalShippingElm: function () {
        return this.orderData.find(".js-cart__total_with-shipping")
    }, getTotalElm: function () {
        return this.orderData.find(".js-cart__total")
    }, getTotal: function () {
        return parseFloat(this.getTotalElm().text())
    }, setTotal: function (e) {
        this.getTotalElm().html(e)
    }, totalChanged: function () {
        $(document).trigger("cart-total-changed")
    }, loadEvents: function () {
        var e = this, t = $(".payments-step");
        e.paramsNotSelectedClass = "not-selected", e.hasStore = t.length > 0;
        var n = $("#top-body:not(.cabinet)"), i = function () {
            var t = $(".contacts-step"), n = $(".cart-step"), i = $(".pay-step");
            t.find(".separate").removeClass("arrow_step_fl").addClass("arrow_step_fr"), i.find(".separate").removeClass("arrow_step").addClass("arrow_step_fl"), n.removeClass("active"), t.addClass("active");
            var o = $("input.delivery-choose:checked");
            if (o.length) {
                var a = parseInt(o.data("dlvr"));
                $("#product-order-form").find("#dlvrId").val(a)
            }
            e.clientData.show(), $("html,body").animate({scrollTop: $(".order-steps").offset().top - 30}, 100), e.orderData.hide()
        };
        $(document).on("change", e.orderData.find(".num-items").selector, function () {
            return 0 == e.orderData.find("tr:not(.deleted-item) .num-items.error").length && e.orderData.find(".btn-contact-step").removeClass("disable"), e.restoreItem(this) || e.update(this, "update", !0), !1
        }), $(document).on("click", e.orderData.find(".btn-contact-step:not(.disable)").selector, function () {
            return Cart.countUpdated ? ($(document).off("toContactStep"), $(document).on("toContactStep", function () {
                i()
            })) : i(), !1
        }), $(".prev-step-contacts, .prev-step").keypress(function () {
            return !1
        }), e.hasStore && ($(document).on("click", e.clientData.find(".btn-payments-step").selector, function () {
            if ($(e.orderForm).valid()) {
                var n = $(".contacts-step"), i = ($(".cart-step"), $(".pay-step"));
                n.find(".separate").removeClass("arrow_step_fr").addClass("arrow_step"), i.find(".separate").removeClass("arrow_step_fl").addClass("arrow_step_fr"), n.removeClass("active"), i.addClass("active"), t.show(), $("html,body").animate({scrollTop: $(".order-steps").offset().top - 30}, 100), e.clientData.hide()
            }
            return !1
        }), $(document).on("click", t.find(".prev-step-contacts").selector, function () {
            var n = $(".contacts-step"), i = ($(".cart-step"), $(".pay-step"));
            return n.find(".separate").removeClass("arrow_step").addClass("arrow_step_fr"), i.find(".separate").removeClass("arrow_step_fr").addClass("arrow_step_fl"), n.addClass("active"), i.removeClass("active"), t.hide(), e.clientData.show(), !1
        })), $(document).on("click", e.clientData.find(".prev-step").selector, function (t) {
            return e.toCartStep(), !1
        }), $(document).on("click", this.orderBtn.selector, function () {
            return e.grabParamsAndAdd(this)
        }), $(document).on("click", "#products .product-item .cart-btn", function () {
            return e.addToCart(this, !0)
        }), $(document).on("click", n.find(".cart-item .delete").selector, function () {
            return e.update(this, "delete")
        }), $(document).on("click", n.find("#view-cart .delete-item").selector, function () {
            return e.update(this, "delete", !0)
        }), $(document).on("change", "#products-cart-left .num-items", function () {
            return e.update(this)
        }), $(document).on("click", n.find("#view-cart .restore-item").selector, function () {
            return e.restoreItem(this)
        }), $(document).on("click", e.clientData.find(".btn-send").selector, function () {
            return $("#product-order-form").submit(), !1
        }), $(document).on("change", '.payments-step input[data-name="paymethod_grid9"]', function () {
            return $("#product-order-form").submit(), !1
        }), e.submitOrderForm(), $("#delivery-choose").find(".delivery-choose").change(function () {
            var t = $("input.delivery-choose:checked");
            $(".without-delivery").toggle(t.hasClass("delivery-type-2")), $(".with-delivery").toggle(!t.hasClass("delivery-type-2"));
            var n = parseInt(t.data("dlvr"));
            return $("#product-order-form").find("#dlvrId").val(n), e.totalChanged(), !1
        }), $(document).on("change", "#product-params-view .ptype-view-select", function () {
            return e.updateProductCost(this)
        }), $("#product-order-form").find(".vertical-radio input:radio").prop("checked", !1), $(document).on("click", "#view-cart input[type=radio]", function () {
            var e = $(this);
            "payments-14" == e.attr("id") ? $("#qiwi_phone_container").show() : $("#qiwi_phone_container").hide(), "payments-204" == e.attr("id") ? $("#pscb_phone_container").show() : $("#pscb_phone_container").hide()
        }), $(document).on("change", '.payments-step input[data-name="paymethod"]', function () {
            var e = $('input[data-name="paymethod"]:checked');
            if (e.length > 0) {
                var t = $(".payments-step .btn-send"), n = e.val();
                0 == n || 2 == n || 1 == n ? t.html(view.translate("Отправить заказ")) : t.html(view.translate("Перейти к оплате")), t.removeClass("disable")
            }
        })
    }, toCartStep: function () {
        var e = $(".contacts-step"), t = $(".cart-step"), n = $(".pay-step");
        n.find(".separate").removeClass("arrow_step_fl").removeClass("arrow_step_fr").addClass("arrow_step"), e.find(".separate").removeClass("arrow_step_fr").addClass("arrow_step_fl"), t.addClass("active"), e.removeClass("active"), n.removeClass("active"), $(".payments-step").hide(), this.clientData.hide(), this.orderData.show()
    }, setPromoCode: function (e, t) {
        this.promocode = e, $("#promocode").val(t), $("#total-discount-element").css("display", "")
    }, hideDiscount: function () {
        this.promocode = null, $("#total-discount-element").css("display", "none")
    }, checkPromoCode: function () {
        var e = this, t = $("#promocode-form").find("input").val();
        return Cart.countUpdated = !0, PromoCodeService.getPromoCode(t).then(function (n) {
            n ? e.setPromoCode(n, t) : e.hideDiscount(), e.calculateSumm(), setTimeout(function () {
                Cart.countUpdated = !1, $(document).off("toContactStep")
            }, 10)
        }).fail(function () {
            ntNotification.showError("Произошла ошибка")
        }), !1
    }, getParamsValues: function (e) {
        var t = e.find(".ptype-view-wrapper select"), n = [], i = this;
        return t.each(function () {
            parseInt(this.value) && n.push(this.value), i.paramIsSelected($(this))
        }), t.length == n.length ? n : []
    }, grabParams: function (e) {
        var t = [], n = $("#product-params-view");
        if (n.length <= 0) return void e(t);
        t = this.getParamsValues(n), t.length ? e(t) : ntNotification.showWarning("Выберите все параметры", 4e3)
    }, grabParamsAndAdd: function (e) {
        var t = this;
        t.grabParams(function (n) {
            t.addToCart(e, !1, n)
        })
    }, addToCart: function (e, t, n) {
        var i = 1 == t ? $(e).parents(".product-item") : $(e).parents(".item-content"), o = n || [];
        if (i.length > 0) {
            var a = $(i).attr("id").replace("item", "") || 0, r = t && !$(e).hasClass("js-cart-btn") ? void 0 : e;
            this.push({itemId: a, num: 1, getcart: 1, button: r, productParams: o})
        }
        return !1
    }, push: function (e) {
        var t = this;
        return void 0 != e && $.post(t.pushUrl, {
            cid: e.itemId,
            num: e.num,
            getcart: e.getcart || 0,
            productParams: e.productParams
        }, function (n) {
            try {
                if (_.isUndefined(n) || 1 != n.success) {
                    var i = void 0 != n.msg ? n.msg : "Произошла ошибка, попробуйте  позже";
                    throw new Error(i)
                }
                if (!_.isUndefined(n)) {
                    var o = $("<div>" + n.cart + "</div>").find("#" + t.blockLeft), a = $("#" + t.blockLeft);
                    a.length > 0 ? a.replaceWith(o) : $(".cart-is-empty").replaceWith(o)
                }
                "restore" == e.action && t.markItem(e.elementId, !0), e.callback && e.callback(), void 0 != e.button && Notifier.showNotice($(e.button).parent(), view.translate("Товар добавлен"), !0), $(document).trigger("cart.update")
            } catch (e) {
                ntNotification.showError(e.message)
            }
        }, "json"), !1
    }, update: function (e, t, n) {
        e = $(e);
        var i, o = this, a = t || "update", r = n || !1,
            s = r ? e.parents("tr").eq(0).attr("id").replace("item", "") : e.parents(".cart-item").eq(0).data("cid");
        if (Cart.countUpdated = !0, void 0 == s) return !1;
        if (i = {cid: s, act: a}, "update" == a) {
            var c = e.val();
            if (!view.isInt(c) || c < 0) return e.val(e.data("value")), Cart.countUpdated = !1, !1;
            0 == c ? i.act = "delete" : $.extend(i, {num: c})
        }
        $.post(this.updateUrl, i, function (t) {
            try {
                if (void 0 == t || 1 != t.success) {
                    if (t.noProductInStock) return o.showNumErrors(t.noProductInStock), e.val(t.noProductInStock[s]), void o.update(e, "update", n);
                    void 0 != t.num && e.val(e.data("value"));
                    var d = t.msg || view.translate("Произошла ошибка, попробуйте  позже");
                    throw new Error(d)
                }
                var l = e.data("pid"), u = e.data("price"),
                    m = $("#cart-inner").find('.price-info[rel="product-' + l + '"]');
                switch (a) {
                    case"update":
                        0 == c && (r ? o.markItem(i.cid) : o.removeItem(i.cid));
                        var p = u * c;
                        p = parseFloat(p.toFixed(2)), m.html(p), o.calculateSumm(), e.data("value", e.val());
                        break;
                    case"delete":
                        r ? o.markItem(i.cid) : o.removeItem(i.cid)
                }
                $(document).trigger("cart.update")
            } catch (e) {
                ntNotification.showError(e.message)
            }
            setTimeout(function () {
                Cart.countUpdated = !1, $(document).off("toContactStep")
            }, 10)
        }, "json")
    }, removeItem: function (e) {
        $("#cid" + e).remove(), 0 == $("#" + this.blockLeft + " .cart-item").length && $("#" + this.blockLeft).replaceWith('<div class="cart-is-empty">')
    }, markItem: function (e, t) {
        var n, i;
        if (void 0 != e) {
            var o = t || !1, a = $("#item" + e);
            o ? (n = "delete-item", i = "", a.find(".num-items").prop("disabled", !1)) : (n = "restore-item", i = "deleted-item", a.find(".num-items").prop("disabled", !0)), a.find(".cart-manage span").attr("class", n), a.attr("class", i), this.calculateSumm()
        }
        return !1
    }, restoreItem: function (e) {
        var t = this, n = $(e).parents("tr.deleted-item").eq(0);
        if (n.length > 0) {
            var i = n.attr("id"), o = {itemId: n.data("pid"), elementId: i.replace("item", ""), action: "restore"},
                a = $("#" + i + " .num-items"), r = parseInt(a.val());
            0 == r && (r = 1, a.val(1), o.callback = function () {
                t.update(a[0], "update", !0)
            }), o.num = r;
            var s = $(n).find(".product-params li"), c = [];
            return s.length > 0 && s.each(function () {
                c.push($(this).data("param"))
            }), o.productParams = c, this.push(o), !0
        }
        return !1
    }, calculateSumm: function () {
        var e = !0, t = this, n = $("#cart-inner"), i = 0, o = 0;
        n.length > 0 && (n.find('tr:not(".deleted-item") .product-summ').length ? ($(".cart-empty").hide(), $("#view-cart").find(".has_products").show()) : ($("#view-cart").find(".has_products").hide(), $(".cart-empty").show(), e = !1), n.find('tr:not(".deleted-item") .product-summ').each(function () {
            var e = $(this).html().replace("/[^d.]/", ""), n = $(this).parent().parent().find("input");
            e = "" != e && e > 0 ? e : 0, t.promocode && Number(t.promocode.type) === PromoCodeService.PROMOCODE_ARTICUL ? (o += parseFloat(e), i += parseFloat(PromoCodeService.calculateDiscount(t.promocode, parseFloat(e), $(n).data("articul"), $(n).val()))) : i += parseFloat(e)
        })), t.promocode && Number(t.promocode.type) !== PromoCodeService.PROMOCODE_ARTICUL ? (o = parseFloat(i).toFixed(2), i = PromoCodeService.calculateDiscount(t.promocode, parseFloat(i.toFixed(2)))) : i = parseFloat(i).toFixed(2), $("#total-discount-element").find("#total-discount span").html(parseFloat(o - i).toFixed(2)), t.setTotal(i), t.totalChanged();
        var a, r = $(".min-order-sum"), s = $(".btn-contact-step"), c = $(".shop-continue");
        r.length && (a = r.data("min-sum"), i < a ? (r.show(), c.show(), s.hide(), e = !1) : (r.hide(), c.hide(), s.show())), e && $(document).trigger("toContactStep")
    }, getError: function (e, t) {
        for (var n in e) if (e.hasOwnProperty(n)) {
            if ("object" == $.type(e[n])) return this.getError(e[n], n);
            var i = {};
            return i.element = t, i.message = e[n], i
        }
    }, showError: function (e, t, n) {
        if (e.addClass("error"), !e.is('input[type="checkbox"]')) {
            var i = $('<div class="error -text-error -pull-right -mg-l-10 error-message">');
            i.text(t), n.find('label[for="' + e.attr("name") + '"]').append(i)
        }
    }, appendNumError: function (e, t, n, i) {
        var o, a = "js-num-products_error";
        n.addClass("error"), e.addClass(a), o = t.find("." + a), o.length ? o.replaceWith(e) : t.append(e), this.timeouts[i] && clearTimeout(this.timeouts[i]), this.timeouts[i] = setTimeout(function () {
            delete this.timeouts[i], n.removeClass("error"), t.find("." + a).remove()
        }.bind(this), 6e3)
    }, showNumErrors: function (e) {
        var t, n, i, o, a = $("#products-cart-left-show");
        for (var r in e) e.hasOwnProperty(r) && (a.length ? (i = a.find("#cid" + r), n = i.find("input"), n.val(e[r]), o = $('<div style="margin-top: 3px" class="-text-error"></div>')) : (n = $("#item" + r + " input.num-items"), i = n.parent(), o = $('<div class="-mg-t-10 -text-error"></div>')), t = 0 != e[r] ? view.translate("Осталось") + ": " + e[r] : view.translate("Нет в наличии"), o.html(t), this.appendNumError(o, i, n, r))
    }, submitOrderForm: function () {
        var t = this, n = $(".payments-step"), i = n.find('input[type="radio"][name="payment"]'), o = $(this.orderForm);
        t.hasStore && $(document).on("click", '.payments-step input[type="radio"]', function () {
            var e = parseInt(n.find('input[type="radio"]:checked').val()), t = n.find("label[for=accept_agreement]");
            0 == e || 2 == e ? t.hide() : t.show()
        }), o.validate({
            submitHandler: function (a) {
                if ($(".payments-step .btn-send.disable").length) return !1;
                Notifier.showIndicatorBtn($(".btn-send")), o.ajaxSubmit({
                    dataType: "json", success: function (r) {
                        if (r.success) {
                            var s = function () {
                                if (t.hasStore && 0 === i.filter("#payments-0:checked,#payments-2:checked, #payments-1:checked, #payments-MP:checked").length) {
                                    var e = $(r.gateway_form);
                                    e.hide(), $("#view-cart").append(e), e.submit()
                                } else window.location = "/cart/checkout"
                            }, c = r.script_url;
                            if (c) {
                                var d = document.createElement("script");
                                d.async = !0, d.src = c, document.body.appendChild(d), setTimeout(s, 2e3)
                            } else s()
                        } else {
                            if (Notifier.hideIndicatorBtn($(".btn-send")), r.noProductInStock) return t.toCartStep(), void t.showNumErrors(r.noProductInStock);
                            if (r.message && ntNotification.showError(r.message), r.errors) {
                                var l = t.getError(r.errors), u = $(a).find("#" + l.element);
                                u.length > 0 ? (t.hasStore && n.find(".prev-step-contacts").trigger("click"), t.showError(u, l.message, o)) : ntNotification.showError(e.message)
                            }
                        }
                    }
                })
            },
            showErrors: function (e, n) {
                o.find(".error-message").remove(), $("input.error").removeClass("error");
                for (var i = 0; i < n.length; i++) {
                    var a = n[i], r = $(a.element);
                    t.showError(r, a.message, o)
                }
            },
            focusInvalid: !1,
            focusCleanup: !1,
            rules: {
                qiwi_phone: {required: !0, payment_qiwi_phone: !0},
                nhpay_phone: {required: !0, payment_pscb_phone: !0},
                accept_agreement: {onecheck: !0},
                name: {required: !0},
                email: {identity: !0, required: !0},
                phone: {required: !0, phone: !0}
            },
            messages: {
                qiwi_phone: {required: view.translate("Обязательное поле")},
                nhpay_phone: {required: view.translate("Обязательное поле")},
                comment: {maxlength: view.translate("Введено больше символов")},
                adress: {maxlength: view.translate("Введено больше символов")},
                name: {
                    maxlength: view.translate("Введено больше символов"),
                    required: view.translate("Обязательное поле")
                },
                email: {
                    maxlength: view.translate("Введено больше символов"),
                    required: view.translate("Обязательное поле"),
                    email: view.translate("Неверный формат почты")
                },
                phone: {
                    maxlength: view.translate("Введено больше символов"),
                    required: view.translate("Обязательное поле")
                }
            }
        }), Visitor.bindInputCharCounter()
    }, paramIsSelected: function (e) {
        var t = e.parent();
        Number(e.val()) > 0 ? t.removeClass(this.paramsNotSelectedClass) : t.addClass(this.paramsNotSelectedClass)
    }, updateProductCost: function (e) {
        var t = this, n = $("#products-show"), i = {
            price: n.find(".product-content .old-price .product-price-data"),
            priceSale: n.find(".product-content #cost-by-impact .product-price-data")
        }, o = {price: Number(i.price.data("cost")), priceSale: Number(i.priceSale.data("cost"))};
        o.priceSale >= 0 && ($("#product-params-view").find(".ptype-view-wrapper select").each(function () {
            var e = $(this), n = e.find("option:selected"), i = parseFloat(n.data("impact"));
            t.paramIsSelected(e), o.price += i, o.priceSale += i
        }), o.price = o.price > 0 ? o.price : 0, o.priceSale = o.priceSale > 0 ? o.priceSale : 0, i.price.html(parseFloat(o.price.toFixed(2))), i.priceSale.html(parseFloat(o.priceSale.toFixed(2))))
    }
}), $("document").ready(function () {
    window.Nethouse = window.Nethouse || {}, window.Nethouse.cart = new Cart
});
var Comments;
$("document").ready(function () {
    Comments = function () {
        this.init()
    }, Comments.prototype = {
        maxImagesQuantity: 5,
        types: {video: 6, images: 7},
        init: function () {
            var e = this;
            this.commentsAccept = !0, this.initAnswerBtnAllowed = !0, this.id = "comment", this.block_id = $("#" + this.id).data("block-id"), this.widget_type = 7, this.countSubComments = 2, this.page = 2, this.showMessage = '<span class="comment-item__btn button button_for_comment-toggle-comments">' + view.translate("Показать все комментарии") + "</span>", this.hideMessage = '<span class="comment-item__btn button button_for_comment-toggle-comments">' + view.translate("Скрыть комментарии") + "</span>", $("#comment_wrap").length ? e.initComments() : $(document).on("widget_init", function () {
                e.initComments()
            }), this.loadEvents()
        },
        initComments: function () {
            var e = this, t = $("#comment_wrap"), n = t.attr("class");
            if (0 != $(".widget-comments .comment_wrap").length) {
                var i = $(".widget-comments > .comment_wrap");
                e.count_roots = i.length, e.prepareOutput(i, !0), t.find(".next_comments").click(function () {
                    e.getWidgetComments(this)
                })
            }
            $(document).on("changeBlock", "#comment", function () {
                var t = $("#comment_wrap");
                if (0 != t.length && t.is(":hidden")) {
                    var n = $(".widget-comments > .comment_wrap");
                    e.prepareOutput(n, !0), $(".all-comments .answer-btn").click(function () {
                        e.getAnswer(this)
                    }), "undefined" != typeof CommentsUser && CommentsUser.reloadEvents()
                }
            }), void 0 != n ? (this.type = n, this.object = t.find(".comment").attr("id")) : this.type = "site", 0 != t.length && 0 != t.find(".is_scroll").length && this.commentsAccept && (e.infiniteScroll(), this.commentsAccept = !1)
        },
        initScroll: function () {
            $("#comment_wrap")
        },
        loadEvents: function () {
            var e = this;
            $(document).on("click", "#comment_wrap .addcomment", function () {
                var t = $("#form_wrap");
                return e._getSmallForm($(this), t, !1), !1
            }), $(document).on("click", ".all-comments .answer-btn", function () {
                e.getAnswer(this)
            }), this.initAnswerBtnAllowed = !1, $(document).on("click", ".window #comment_form .cancel", function () {
                var t = this;
                return $(t).parents("#comment_form").slideToggle(function () {
                    e.hideFormAndRevalidate($(t))
                }), !1
            }), $(document).on("click", ".all-comments .cancel, #comment_wrap .cancel", function () {
                return $(this).parents("#comment_form").hide(), $(this).parents(".answer-form").hide(), $(this).parents(".comment_wrap ").find(".up-arrow").hide(), e.hideFormAndRevalidate($(this)), !1
            }), $(document).on("click", "#comment-edit .cancel, #comment-edit .close", function () {
                e.toggleBlock(e.id, "close")
            }), $(document).on("hideBlocks", function () {
                e.toggleBlock(e.id, "close")
            }), $(document).on("click", "#comment .add-btn", function () {
                e.toggleBlock(e.id, "add");
                var t = $("#" + e.id + "-edit"), n = $("#" + e.id + " i.up-arrow");
                return $("i.up-arrow").remove(), n.length > 0 && n.remove(), e._getSmallForm($(this), t, !1)
            }), $(document).on("click", "#comment_form #reload", function () {
                e.reloadCaptcha()
            })
        },
        infiniteScroll: function () {
            var e = this;
            $(".end_comments").endlessScroll({
                fireOnce: !0,
                fireDelay: 200,
                loader: "<img id='loader' src='//s.siteapi.org/frontend/static/grid_6/img/lazyload-da16aabf34.gif'>",
                url: "/comment/load/getcomments",
                toElement: !0,
                params: {type: e.type, object: e.object, page: e.page},
                success: function (e, t) {
                    return !!e.success && (t.params.page++, e.next_page ? $("#comment_wrap .is_scroll .per_page").html(e.count) : (t.disable = !0, $("#comment_wrap .is_scroll").removeClass("is_scroll")), void $("#comment_wrap .all-comments").append(e.output))
                },
                insertAfter: ".all-comments article.comment_wrap:last",
                callback: function () {
                    CommentsUser.reloadEvents()
                }
            })
        },
        prepareOutput: function (e, t) {
            var n = this, i = '<div class="button-show-' + n.id + ' blue">' + n.showMessage + "</div>";
            e.each(function () {
                var e = $(this), o = e.find(".button-show-" + n.id), a = e.find(".comment_wrap");
                a.length > n.countSubComments ? (0 == o.length && (e.children("div").after(i), e.find(".button-show-" + n.id).click(function () {
                    n.showSubComments(this)
                })), !t && o.hasClass("isshow") || (a.show(), e.find(".comment_wrap:lt(" + (a.length - n.countSubComments) + ")").hide())) : 0 != o.length && (a.show(), o.remove())
            }), t && ($("#ajax-loader").remove(), $("#" + n.id + "_wrap").show())
        },
        showSubComments: function (e) {
            $(".answer-form.comment_wrap").remove();
            var t = $("#comment-form");
            0 != t.length && (t.parent().find(".item").show(), t.remove());
            var n = this, i = $(e);
            if (i.hasClass("isshow")) {
                i.removeClass("isshow");
                var o = i.parent().find(".comment_wrap"), a = o.length;
                a > n.countSubComments && (i.html(n.showMessage), i.parent().find(".comment_wrap:lt(" + (a - n.countSubComments) + ")").hide())
            } else i.addClass("isshow"), i.html(n.hideMessage), i.parent().find(".comment_wrap").show()
        },
        getAnswer: function (e) {
            var t = this;
            $(e).parent().parent().find(".answer-form").remove();
            var n = $(e).parents(".item").attr("id").replace("item-", ""),
                i = $('<article id="parent-' + n + '" class="answer-form"><div><div></article>');
            return $(e).parent().after(i), $("i.up-arrow").remove(), 0 != $("#comment-edit:visible").length && ($("#comment_form").remove(), t.toggleBlock(t.id, "add")), t._getSmallForm($(e), i, !0), !1
        },
        hideFormAndRevalidate: function (e) {
            var t = this, n = $(e).parents("form"), i = 0 != $(e).parents(".fancybox-inner").length, o = n.parent(),
                a = n.clone();
            o.append(a), n.remove(), i ? t.validateWindowForm(a) : "site" == t.type ? t.validateWidgetForm(a) : t.validateForm(a), a.find(".js-comment-images__list").html(""), this.initImageUpload(a)
        },
        toggleBlock: function (e, t) {
            $(".on-edit:not(.static)").hide(), $(".content-block").show(), $(".content-block").parents("section").addClass("on-view"), $("header.infoPlate").each(function () {
                0 == $(this).parents("#" + e).length && ($(this).children(".edit-block").find("a").removeClass("active-btn"), $(this).find(".add-btn").removeClass("active-btn"))
            }), $("#header-wrapper .edit-block").find("a.active-btn").removeClass("active-btn"), $("#header-wrapper").attr("class", "");
            var n = $("#" + e).hasClass("overt");
            if ("edit" == t || "add" == t) {
                var i = "add" == t ? "edit" : "add";
                $("#" + e + " ." + t + "-btn").hasClass("active-btn") ? ($("#" + e + "-edit").hide(), $("#" + e + " .no-entry").show(), $("#" + e + "-show").show(), $("#" + e).addClass("on-view"), $("#" + e + " ." + t + "-btn").removeClass("active-btn")) : ($("#" + e + "-edit").show(), n || $("#" + e + "-show").hide(), $("#" + e + " .no-entry").hide(), $("#" + e).removeClass("on-view"), $("#" + e + " ." + t + "-btn").addClass("active-btn"), $("#" + e + " ." + i + "-btn").removeClass("active-btn"))
            } else $("#" + e + "-edit").hide(), $("#" + e + "-show").show(), $("#" + e + " .no-entry").show(), $("#" + e).addClass("on-view"), $("#" + e + " .edit-btn").removeClass("active-btn"), $("#" + e + " .add-btn").removeClass("active-btn");
            return void 0 != t || "contactsmain" != e && "contactssocnet" != e || $("#content #" + e + "-form").remove(), !1
        },
        getWidgetComments: function (e) {
            var t = this;
            $("#comment_wrap .next_comments span").hide(), $("#comment_wrap .next_comments").append("<img id='loader' src='//s.siteapi.org/frontend/static/grid_6/img/lazyload-da16aabf34.gif'>"), $.post("/comment/load/getsitecomments", {page: t.page}, function (e) {
                if ($("#comment_wrap #loader").remove(), e.success) {
                    t.page++;
                    var n = $(e.output);
                    t.prepareOutput(n), $(".all-comments.widget-comments").append(n), "undefined" != typeof CommentsUser && CommentsUser.reloadEvents(), this.initAnswerBtnAllowed && n.find(".answer-btn").click(function () {
                        t.getAnswer(this)
                    }), e.next_page ? $("#comment_wrap .next_comments span").show() : $("#comment_wrap .next_comments").remove()
                } else $("#comment_wrap .next_comments span").show(), ntNotification.showError("Произошла ошибка")
            }, "json")
        },
        initFormImages: function (e, t) {
            e.find(".js-comment-image").each(function () {
                var t = $(this);
                t.find(".js-comment-image__delete").on("click", function () {
                    t.remove(), e.find(".js-comment-images__upload").show()
                }.bind(this))
            })
        },
        getImagesQuatity: function (e) {
            return e.find(".js-comment-images__list .js-comment-image:not(.upload-image_fail)").length
        },
        initImageUpload: function (e) {
            e.find(".js-comment-images").show();
            var t, n = e.find(".js-comment-images__list"), i = e.find(".js-comment-images__upload"),
                o = i.data("file-upload"), a = ["jpeg", "png", "gif", "jpg"], r = $(".js-comment-image-tpl").html(),
                s = this.maxImagesQuantity - this.getImagesQuatity(e);
            0 != i.length && (s > 0 && i.show(), t = new Nethouse.ImageUploader(i[0], {
                multiple: !0,
                path: o
            }), t.preview(90, 60, function (t, o) {
                t = $(r).append(t), n.append(t), t.addClass("js-comment-image_" + o), t.find(".js-comment-image__delete").on("click", function () {
                    t.remove(), this.getImagesQuatity(e) < this.maxImagesQuantity && i.show()
                }.bind(this))
            }.bind(this)).addExtensionFilter(a).addFileSizeFilter(5 * Nethouse.Uploader.MB).on("before", function () {
                t.maxFiles = this.maxImagesQuantity - this.getImagesQuatity(e)
            }.bind(this)).on("filecomplete", function (t, o, a) {
                if (t) return void ntNotification.showError(sprintf(view.translate("js_uploader_upload_file_fail"), a.name), 6e3);
                var r = window.JSON.parse(o.response), s = new Nethouse.FileModel(r), c = this.getImagesQuatity(e);
                n.find(".js-comment-image_" + a.id).append(s.toInputFields(a.id, "attachments")), c >= this.maxImagesQuantity && i.hide()
            }.bind(this)).on("error", function (e, t) {
                var n = Nethouse.Uploader.Errors;
                switch (e) {
                    case n.EXTENSION:
                        ntNotification.showError(sprintf(view.translate("js_uploader_extension_fail"), t.file.name, a.join(", ")), 6e3);
                        break;
                    case n.MAX_SIZE:
                        ntNotification.showError(sprintf(view.translate("js_uploader_max_size_fail"), t.file.name, "5 MB"), 6e3);
                        break;
                    case n.MAX_FILES_COUNT:
                        ntNotification.showError(sprintf(view.translate("js_uploader_files_count_fail"), this.maxImagesQuantity), 6e3)
                }
            }.bind(this)))
        },
        _getSmallForm: function (e, t, n) {
            var i = this;
            if ($(".comment_wrap.answer-form").not(t).remove(), $("#comment_form").parents(".answer-form").remove(), $("section#comment #comment-edit #comment_form").remove(), $(".comment_wrap #comment_form").remove(), $(".comment_wrap .item").show(), n) var o = e.parents(".item").attr("id").replace("item-", "");
            if (e.hasClass("active-btn") || "site" != i.type || n) {
                "site" == i.type && e.append('<i class="up-arrow"></i>');
                var a = Notifier.getLoader();
                t.html('<div class="ajax-loader">' + a + "</div>");
                var r = "/" + i.id + "/load/getform";
                $.post(r, {type: i.type, object: i.object, parent: o}, function (n) {
                    var o, a;
                    n.success ? ($("." + i.id + "_wrap #" + i.id + "_form").remove(), a = t.html(n.form), i.initFormImages(a.find("form")), i.initImageUpload(a.find("form")), "site" == i.type ? (a.children("form").removeClass("fromTable").addClass("new-item"), i.validateWidgetForm(a.children("form"))) : (i.ReloadEvents(e), i.validateForm(a.children("form")))) : ($("#" + i.id + " .no-entry").show(), o = $(n.form).closest(".block-error").length > 0 ? n.form : "Ошибка", $("#comment-edit").empty(), Notifier.showError(o, "#comment-edit"))
                }, "json")
            }
            return !1
        },
        getCookie: function (e) {
            var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
            return t ? decodeURIComponent(t[1]) : void 0
        },
        ReloadEvents: function (e) {
            var t = this;
            e.unbind("click"), e.click(function () {
                $(".comment_wrap #comment_form").remove(), $(".comment_wrap .item").show();
                var e = $("#comment_form");
                e.is(":hidden") ? t.reloadCaptcha() : e.hide()
            })
        },
        highlight: function (e, t) {
            $(e).addClass(t)
        },
        unhighlight: function (e, t) {
            $(e).removeClass(t).next(".errors")
        },
        showErrors: function (e, t) {
            $("#comment_form .errors").remove(), $("#comment_form .error").removeClass("error");
            for (var n = 0; n < t.length; n++) {
                var i = t[n], o = $(i.element), a = $('<ul class="errors">');
                a.append($("<li>").text(i.message)), o.hasClass("cleditor") ? a.insertAfter(o.parents(".cleditorMain").find("iframe")) : a.insertAfter(o), this.settings.highlight.call(this, i.element, "error")
            }
        },
        validateWindowForm: function (e) {
            var t = this;
            e.validate({
                showErrors: t.showErrors,
                unhighlight: t.unhighlight,
                highlight: t.highlight,
                submitHandler: function (e) {
                    return Notifier.showIndicator("comment_form", !1), $(e).ajaxSubmit({
                        dataType: "json",
                        success: function (e) {
                            if (Notifier.hideIndicator("comment_form", !1), e.success) {
                                if ($(".window #comment_form").slideToggle(), !e.approved) return t.cleanForm(), void t.notApprovedNotification();
                                e.isNew ? ($(".window .all-comments").append(e.comment), 0 == $("#comment_wrap header .info h2").length && $("#comment_wrap header .info").append('<h2 class="not_scroll">Комментарии</h2><div class="bold_sep"><hr></div>'), t.cleanForm()) : $(".window .all-comments #item-" + e.item).parent().replaceWith(e.comment), "undefined" != typeof CommentsUser ? CommentsUser.reloadEvents() : t.reloadCaptcha()
                            } else e.captchaFaild ? (t.reloadCaptcha(), t.captchaError()) : ($(".comment_wrap .item").show(), ntNotification.showError("Произошла ошибка"))
                        },
                        beforeSubmit: function () {
                            Notifier.showIndicator("comment_wrap", !1)
                        }
                    }), !1
                },
                rules: t.rules,
                messages: t.messages,
                focusInvalid: !1,
                focusCleanup: !0
            })
        },
        validateForm: function (e) {
            var t = this;
            e.validate({
                showErrors: t.showErrors,
                unhighlight: t.unhighlight,
                highlight: t.highlight,
                submitHandler: function (e) {
                    return Notifier.showIndicator("comment_form", !1), $(e).ajaxSubmit({
                        dataType: "json",
                        success: function (e) {
                            if (Notifier.hideIndicator("comment_form", !1), e.success) {
                                if ($("#comment_form").hide(), $(".answer-form").remove(), !e.approved) return void t.notApprovedNotification();
                                if (e.isNew) {
                                    if (e.parent ? $("#comment_wrap .all-comments #item-" + e.parent).parent().append(e.comment) : $("#comment_wrap .all-comments").prepend(e.comment), t.cleanForm(), 0 != $("#comment_wrap .no-comments").length) $("#comment_wrap .no-comments").replaceWith('<h2 class="not_scroll">Комментарии</h2>'), $("#comment_wrap .bold_sep").html("<hr/>"); else if (0 != $("#comment_wrap .is_scroll").length) {
                                        var n = $("#comment_wrap .is_scroll .per_page"),
                                            i = $("#comment_wrap .is_scroll .total"), o = parseInt(n.text()) + 1,
                                            a = parseInt(i.text()) + 1;
                                        i.html(a), n.html(o)
                                    }
                                } else $(".all-comments #item-" + e.item).parent().replaceWith(e.comment);
                                "undefined" != typeof CommentsUser && CommentsUser.reloadEvents()
                            } else e.captchaFaild ? (t.reloadCaptcha(), t.captchaError()) : ($(".comment_wrap .item").show(), ntNotification.showError("Произошла ошибка"))
                        },
                        beforeSubmit: function () {
                            Notifier.showIndicator("comment_wrap", !1)
                        }
                    }), !1
                },
                rules: t.rules,
                messages: t.messages,
                focusInvalid: !1,
                focusCleanup: !0
            }), Visitor.bindInputCharCounter()
        },
        validateWidgetForm: function (e) {
            var t = this;
            e.validate({
                showErrors: t.showErrors,
                unhighlight: t.unhighlight,
                highlight: t.highlight,
                submitHandler: function (e) {
                    return Notifier.showIndicator("comment_form", !1), $(e).ajaxSubmit({
                        dataType: "json",
                        success: function (e, n, i) {
                            if (Notifier.hideIndicator("comment_form", !1), e.success) {
                                if (!e.approved) return t.cleanForm(), t.notApprovedNotification(), void(e.parent ? $("#comment_form").parent().hide() : t.toggleBlock(t.id, "add"));
                                if (e.isNew) {
                                    $("#comment_form").parent().hide(), $("i.up-arrow").remove(), $("#comment .no-entry").remove();
                                    var o = $(e.comment);
                                    if (e.parent) {
                                        var a = $("#comment .all-comments #item-" + e.parent).parent();
                                        a.append(o), t.prepareOutput(a, !1)
                                    } else t.toggleBlock(t.id, "add"), o.find(".answer-btn").click(function () {
                                        t.getAnswer(this)
                                    }), $("#comment .all-comments").prepend(o);
                                    t.cleanForm(), "undefined" == typeof CommentsUser && t.reloadCaptcha()
                                } else {
                                    var r = $("#comment .all-comments #item-" + e.item);
                                    r.parent().find("#comment_form").remove();
                                    var o = $(e.comment);
                                    o.find(".answer-btn").click(function () {
                                        t.getAnswer(this)
                                    }), r.replaceWith(o)
                                }
                                "undefined" != typeof CommentsUser && CommentsUser.reloadEvents()
                            } else e.captchaFaild ? (t.reloadCaptcha(), t.captchaError()) : ($(".comment_wrap .item").show(), ntNotification.showError("Произошла ошибка"))
                        },
                        beforeSubmit: function () {
                            Notifier.showIndicator("comment_wrap", !1)
                        }
                    }), !1
                },
                rules: t.rules,
                messages: t.messages,
                focusInvalid: !1,
                focusCleanup: !0
            }), Visitor.bindInputCharCounter()
        },
        captchaError: function () {
            $("#comment_form #captcha-input").val("").addClass("error"), $("#comment_form #captcha-element").append('<ul class="errors"><li>' + view.translate("Неверно введены символы, указанные на картинке.") + "</li></ul>")
        },
        cleanForm: function () {
            $('#comment_form input[type="text"], #comment_form textarea').val(""), $("#comment_form #captcha-input").val("")
        },
        rules: {
            name: {required: !0, maxlength: 40},
            commenttext: {required: !0, maxlength: 3e3},
            "captcha[input]": {required: !0, minlength: 6, maxlength: 6}
        },
        messages: {
            name: {
                required: view.translate("Обязательное поле"),
                maxlength: view.translate("Максимальная длина") + " 40 " + view.translate("символов")
            },
            commenttext: {
                required: view.translate("Обязательное поле"),
                maxlength: view.translate("Максимальная длина") + " 3000 " + view.translate("символов")
            },
            "captcha[input]": {
                required: view.translate("Обязательное поле"),
                maxlength: view.translate("Введено не") + " 6 " + view.translate("символов"),
                minlength: view.translate("Введено не") + " 6 " + view.translate("символов")
            }
        },
        reloadCaptcha: function () {
            "undefined" == typeof CommentsUser && $.post("/comment/load/captcha", function (e) {
                e.success ? ($("#comment_form #captcha-element img").attr("src", e.image), $("#comment_form #captcha-id").val(e.captcha)) : ntNotification.showError("Произошла ошибка")
            }, "json")
        },
        notApprovedNotification: function () {
            ntNotification.showSuccess(view.translate("comment_is_not_approved"), 6e3)
        }
    }, Comments = new Comments
}), function (e, t) {
    "use strict";
    e(document).on("click", ".js-cancel-window, .window .close", function () {
        return e.magnificPopup.close(), !1
    }), e(document).ready(function () {
        e.magnificPopup.defaults.gallery.tCounter = "%curr% " + t.view.translate("из") + " %total%"
    });
    var n = {
        loaded: function () {
        }, parseItem: function () {
        }, beforeOpen: function () {
        }, open: function () {
        }, close: function () {
        }, imageLoaded: function () {
        }, change: function () {
        }, type: "inline"
    }, i = {
        openHtmlAjax: function (i, o) {
            o = o || {}, o = e.extend({}, n, o), e.magnificPopup.open({
                tLoading: '<img src="//s.siteapi.org/frontend/static/grid_6/img/preloader-c6f1ad4957.gif">',
                items: {type: "ajax", src: i},
                ajax: {settings: o.opts, tError: o.error},
                removalDelay: 300,
                mainClass: "mfp-fade",
                showCloseBtn: !1,
                fixedContentPos: !0,
                callbacks: {
                    beforeOpen: function () {
                        e(document).trigger("modal:beforeOpen"), e("html").addClass("modal-open"), o.beforeOpen()
                    }, parseAjax: function (t) {
                        e(document).trigger("modal:open"), o.loaded(t, this)
                    }, ajaxContentAdded: function () {
                        e(".mfp-content").addClass("site-popup"), o.open()
                    }, close: function () {
                        e("html").removeClass("modal-open"), t.history.pushState("", document.title, t.location.pathname), e(document).trigger("modal:close")
                    }
                }
            })
        }, update: function () {
            e.magnificPopup.instance.updateItemHTML()
        }, imageGallery: function (i, o) {
            o = o || {}, o = e.extend({}, n, o), i.magnificPopup({
                type: "image",
                fixedContentPos: !0,
                callbacks: {
                    beforeOpen: function () {
                        e(document).trigger("modal:beforeOpen"), e("html").addClass("modal-open"), o.beforeOpen()
                    }, open: function () {
                        e(document).trigger("modal:open"), o.open(this.items)
                    }, close: function () {
                        e("html").removeClass("modal-open"), t.history.pushState("", document.title, t.location.pathname), o.close(), e(document).trigger("modal:close")
                    }
                },
                gallery: {enabled: !0, preload: [1, 4]}
            })
        }, item: function (t, i) {
            i = i || {}, i = e.extend({}, n, i), e.magnificPopup.open({
                type: i.type,
                fixedContentPos: !0,
                items: {src: t},
                callbacks: {
                    beforeOpen: function () {
                        e(document).trigger("modal:beforeOpen"), e("html").addClass("modal-open"), i.beforeOpen()
                    }, open: function () {
                        e(document).trigger("modal:open"), i.open(this.items)
                    }, close: function () {
                        e("html").removeClass("modal-open"), i.close(), e(document).trigger("modal:close")
                    }
                }
            })
        }, openListImages: function (i, o, a, r) {
            r = r || {}, r = e.extend({
                beforeNext: function () {
                    return !0
                }, beforePrev: function () {
                    return !0
                }
            }, n, r), e.magnificPopup.open({
                items: i,
                type: "image",
                fixedContentPos: !0,
                callbacks: {
                    beforeOpen: function () {
                        e(document).trigger("modal:beforeOpen"), e("html").addClass("modal-open"), r.beforeOpen()
                    }, open: function () {
                        this.next = function () {
                            r.beforeNext(this) && e.magnificPopup.proto.next.call(this)
                        }, this.prev = function () {
                            r.beforePrev(this) && e.magnificPopup.proto.prev.call(this)
                        }, e(document).trigger("modal:open"), r.open(this)
                    }, close: function () {
                        e("html").removeClass("modal-open"), t.history.pushState("", document.title, t.location.pathname), r.close(), e(document).trigger("modal:close")
                    }, imageLoadComplete: function () {
                        r.imageLoaded(this.currItem, this.items)
                    }, change: function () {
                        r.change(this.currItem, this, this.direction)
                    }
                },
                image: {verticalFit: !1, markup: o},
                gallery: {enabled: !0, preload: [1, 4]}
            }, a)
        }, openHtml: function (i, o, a) {
            var r;
            a = !!_.isUndefined(a) || a, r = a ? e(i).wrap('<div class="window"></div>').parent() : e(i), o = o || {}, o = e.extend({}, n, o), e.magnificPopup.open({
                tLoading: '<img src="//s.siteapi.org/frontend/static/grid_6/img/preloader-c6f1ad4957.gif">',
                items: {src: r, type: "inline"},
                removalDelay: 300,
                mainClass: "mfp-fade",
                fixedContentPos: !0,
                showCloseBtn: !1,
                callbacks: {
                    beforeOpen: function () {
                        e(document).trigger("modal:beforeOpen"), e("html").addClass("modal-open"), o.beforeOpen()
                    }, open: function () {
                        e(document).trigger("modal:open"), o.open()
                    }, close: function () {
                        e("html").removeClass("modal-open"), t.history.pushState("", document.title, t.location.pathname), o.close(), e(document).trigger("modal:close")
                    }
                }
            })
        }, showLoader: function () {
            e("body").prepend('<div class="-screen-loader"><div><div class="-screen-loader-img"><img src="//s.siteapi.org/frontend/static/grid_6/img/preloader-c6f1ad4957.gif"></div></div></div>')
        }, hideLoader: function () {
            e("body > .-screen-loader").remove()
        }, close: function () {
            e.magnificPopup.close()
        }
    };
    t.Nethouse = t.Nethouse || {}, t.Nethouse.Modal = i
}(window.$, window), $(document).ready(function () {
    var e, t = $(".notify-line");
    t.length && (e = $("<style> .goog-te-banner-frame { top: " + t.height() + "px; } </style>"), $("head").append(e), $(".notify-line__close").on("click", function () {
        var n = new Date;
        return n.setMinutes(n.getMinutes() + 5), document.cookie = "notify_line=1; path=/; expires=" + n.toUTCString(), t.remove(), $(".notify-line__height").remove(), e.remove(), !1
    }))
});
var ntNotification = {
    templates: {}, notifications: [], getTemplate: function (e, t) {
        var n = this;
        this.templates[e] ? t(n.templates[e]) : $.get("/html/ru_RU/utils/notification.html", function (i) {
            n.templates[e] = i, t(n.templates[e])
        })
    }, getTop: function (e) {
        return parseInt(e.css("top").replace("px", ""))
    }, moveAll: function (e, t) {
        var n = this;
        _.forEach(n.notifications, function (i, o) {
            if (o >= e) if (e != o) {
                var a = n.notifications[o - 1].elm;
                t = t + a.outerHeight() + 5, i.elm.animate({top: t + "px"}, 200)
            } else i.elm.animate({top: t + "px"}, 200)
        })
    }, deleteNotification: function (e, t) {
        var n = this, i = _.indexOf(n.notifications, e), o = n.getTop(e.elm);
        e.timeout && clearTimeout(e.timeout), n.notifications = _.without(n.notifications, e), e.elm.stop(!0, !0), t ? e.elm.animate({
            left: e.elm.width() + "px",
            opacity: 0
        }, 200, function () {
            e.elm.remove(), n.moveAll(i, o)
        }) : e.elm.animate({top: o - e.elm.outerHeight() + "px", opacity: 0}, 200, function () {
            e.elm.remove(), n.moveAll(i, o)
        })
    }, shake: function (e) {
        for (var t = 0; t < 6; t++) $(e).animate({"margin-left": t % 2 == 0 ? 5 : -5}, {duration: 70, queue: !0});
        $(e).animate({"margin-left": 0}, 70)
    }, getPageX: function (e) {
        var t = 0;
        if ("touchstart" == e.type || "touchmove" == e.type || "touchend" == e.type || "touchcancel" == e.type) {
            t = (e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]).pageX
        } else "mousedown" != e.type && "mouseup" != e.type && "mousemove" != e.type && "mouseover" != e.type && "mouseout" != e.type && "mouseenter" != e.type && "mouseleave" != e.type || (t = e.pageX);
        return t
    }, show: function (e, t, n) {
        var i = this, o = CryptoJS.SHA1(t).toString(), a = _.findWhere(i.notifications, {id: o}),
            r = !_.isUndefined(n) && n;
        if (a) {
            if (a.elm.stop(!0, !0), i.shake(a.elm), a.timeout) {
                clearTimeout(a.timeout);
                var s = a.elm.find(".-notification-timer");
                s.stop(!0, !0), s.css({width: ""}), s.animate({width: 0}, a.time), a.timeout = setTimeout(function () {
                    i.deleteNotification(a)
                }, a.time)
            }
        } else this.getTemplate(e, function (a) {
            window.view && window.view.translate && (t = window.view.translate(t));
            var s = {id: o, elm: $(_.template(a)({type: e, message: t, hasTimer: r}))};
            if (s.elm.data("id", o), i.notification_box || (i.notification_box = $('<div class="-notification-box"></div>'), $(document).on("click", ".-notification-close, .-notification-box .-notification-icon", function () {
                var e = _.findWhere(i.notifications, {id: $(this).parent().eq(0).data("id")});
                e && i.deleteNotification(e)
            }), $(document).on("touchstart", ".-notification", function (e) {
                var t = _.findWhere(i.notifications, {id: $(this).data("id")});
                t.elm.css("left", 0);
                var n = i.getPageX(e), o = t.elm.offset();
                $(document).on("touchmove.notification", function (e) {
                    var a = i.getPageX(e), r = a - n;
                    r > 0 ? t.elm.css({left: r + "px"}) : o.left < a ? n = a : $(document).off("touchmove.notification touchend.notification"), r > 100 && ($(document).off("touchmove.notification touchend.notification"), i.deleteNotification(t, !0))
                }),
                    $(document).on("touchend.notification", ".-notification", function () {
                        t.elm && t.elm.css({left: 0}), $(document).off("touchmove.notification touchend.notification")
                    })
            }), i.notification_box.css({top: 0}), $("body").append(i.notification_box)), s.elm.css({
                opacity: 0,
                top: 0
            }), i.notification_box.append(s.elm), 0 != i.notifications.length) {
                5 == i.notifications.length && i.deleteNotification(i.notifications[i.notifications.length - 1]);
                var c, d = function () {
                };
                _.forEach(i.notifications, function (e, t) {
                    if (t == i.notifications.length - 1 && (d = function () {
                        s.elm.animate({opacity: 1}, {duration: 100, queue: !0})
                    }), 0 != t) {
                        var n = i.notifications[t - 1].elm;
                        c = c + n.outerHeight() + 5, e.elm.animate({top: c + "px"}, 100, d)
                    } else c = s.elm.outerHeight() + 5, e.elm.animate({top: c + "px"}, 100, d)
                })
            } else s.elm.animate({opacity: 1}, 100);
            i.notifications.unshift(s), r && (s.time = n, s.elm.find(".-notification-timer").animate({width: 0}, n), s.timeout = setTimeout(function () {
                i.deleteNotification(s)
            }, s.time))
        })
    }, showError: function (e, t) {
        t = _.isUndefined(t) ? 5e3 : t, this.showMessage(e, "error", t)
    }, showWarning: function (e, t) {
        t = !0 === t && 5e3 || t, this.showMessage(e, "warning", t)
    }, showSuccess: function (e, t) {
        t = _.isUndefined(t) ? 5e3 : t, this.showMessage(e, "success", t)
    }, showMessage: function (e, t, n) {
        var i = this;
        if (t = t || "error", n = _.isUndefined(n) ? "warning" == t ? 0 : 5e3 : n, /^\/[a-z]+/.test(e)) {
            var o = $("body").data("lang");
            $.get("/html/" + o + e, function (e) {
                i.show(t, e, n)
            })
        } else i.show(t, e, n)
    }
};
!function (e, t, n, i, o) {
    "use strict";
    e.validator.addMethod("cMaxlength", e.validator.methods.maxlength, i.translate("Длина поля должна быть до {0} символов")), e.validator.addMethod("required", e.validator.methods.required, i.translate("Обязательное поле")), e.validator.addMethod("cRequired", e.validator.methods.required, i.translate("Обязательное поле")), e.validator.addMethod("identity", function (e, t) {
        var n = e.trim();
        return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(n)
    }, i.translate("Введите корректный email")), e.validator.addMethod("email", e.validator.methods.identity, i.translate("Пожалуйста, введите правильный эл. адрес")), e.validator.addMethod("cMinCurrency", e.validator.methods.min, e.validator.format(i.translate("Минимальная сумма платежа - {0}руб."))), e.validator.addMethod("phone", function (e, t) {
        var n = e.trim();
        return this.optional(t) || /^[+]?(\d)+$/i.test(n)
    }, i.translate("Только цифры и +. Пример: +79123456789")), e.validator.addClassRules({
        "dynamic-form-required": {cRequired: !0},
        "dynamic-form-text": {cMaxlength: 100},
        "dynamic-form-textarea": {cMaxlength: 1e3},
        "dynamic-form-phone": {phone: !0},
        "dynamic-form-email": {identity: !0},
        "dynamic-form-money": {cMinCurrency: 0}
    });
    var a = function (e, t) {
        this.type = e, this.options = t || {}, this.selector = ".dynamic-form-" + e, this.btnSelector = ".dynamic-form-button-" + e
    };
    a.getSubmitHash = function (e) {
        return {0: "thankyou-form-0", 1: "thankyou-form-1", 3: "thankyou-lead-form", 5: "thankyou-lead-form"}[e]
    }, t.extend(a, {
        formIsShow: function (t) {
            e(document).trigger("dynamic-form-show." + t)
        },
        types: {
            FORM_TYPE_FEEDBACK: 0,
            FORM_TYPE_CALLBACK: 1,
            FORM_TYPE_ORDER: 2,
            FORM_TYPE_LEAD: 3,
            FORM_TYPE_PAY: 4,
            FORM_TYPE_LEAD_MRB: 5
        },
        tooltipError: {
            trigger: "custom",
            theme: "tooltipster-error",
            speed: 0,
            positionTracker: !0,
            offsetY: -6,
            position: "top"
        }
    }), t.extend(a.prototype, {
        init: function () {
            var t = e(this.selector);
            e(document).on("dynamic-form-show." + this.type, function () {
                o.setTimeout(function () {
                    this.addButtonEvent(), this.validateForm()
                }.bind(this), 100)
            }.bind(this)), t.length && (this.addButtonEvent(), this.validateForm())
        }, destroy: function () {
            e(document).off("dynamic-form-show." + this.type), e(this.btnSelector).off("click")
        }, addButtonEvent: function () {
            var t = this;
            e(this.btnSelector).on("click", function () {
                e(this).parent().parent().find(t.selector).submit()
            })
        }, processErrors: function (e, n) {
            return t.reduce(e, function (e, i) {
                return e.concat(t.map(i, function (e, i) {
                    return {element: n.find("[name=" + i + "]"), message: t.values(e)[0]}
                }))
            }, [])
        }, validateForm: function () {
            var r = e(this.selector), s = this;
            r.each(function () {
                var r = e(this), c = r.validate({
                    submitHandler: function () {
                        if ("function" == typeof s.options.beforeSubmit && s.options.beforeSubmit(), r.locked) return !1;
                        r.locked = !0, r.ajaxSubmit({
                            dataType: s.options.dataType || "json",
                            success: function (e, t, d) {
                                var l, u;
                                if (r.locked = !1, "function" == typeof s.options.afterSubmit && s.options.afterSubmit(e), !1 === e.success) return void(e.errors ? (l = s.processErrors(e.errors, r), c.errorList = l, c.showErrors()) : (l = e.msg || i.translate("Ошибка при отправке формы"), n.showError(l)));
                                r[0].reset(), n.showSuccess(i.translate("Форма успешно отправлена")), o.history.pushState("", document.title, o.location.pathname), (u = a.getSubmitHash(s.type)) && (o.location.hash = u)
                            },
                            error: function (e, t, n) {
                                this.success({success: !1, msg: n}, t, e)
                            }
                        })
                    }, focusInvalid: !1, focusCleanup: !1, showErrors: function (n, i) {
                        var o = r.find("input, textarea"), s = r.hasClass("js-no-tooltip");
                        o.each(function () {
                            var t = e(this);
                            t.removeClass("error").addClass("valid"), t.siblings(".errors").remove(), t.hasClass("tooltipstered") && t.tooltipster("hide")
                        }), t.forEach(i, function (t) {
                            var n, i = e(t.element);
                            s ? (n = e('<ul class="errors">'), n.append(e("<li>").text(t.message)), i.is('[type="checkbox"]') ? i.next("label").after(n) : i.after(n)) : (i.hasClass("tooltipstered") || i.tooltipster(a.tooltipError), i.tooltipster("content", t.message), i.tooltipster("show")), i.removeClass("valid").addClass("error")
                        })
                    }
                })
            })
        }
    }), o.Nethouse = o.Nethouse || {}, o.Nethouse.DynamicForm = a
}(window.$, window._, window.ntNotification, window.view, window), function (e, t) {
    "use strict";
    setTimeout(function () {
        e(document).ready(function () {
            new t(t.types.FORM_TYPE_LEAD_MRB, {
                dataType: "text", afterSubmit: function () {
                    window.location.hash = "lead-form-send"
                }
            }).init()
        })
    }, 1e3)
}(window.$, window.Nethouse.DynamicForm), function (e) {
    var t;
    t = function (t) {
        var n = this;
        n.element = e(t), n.init()
    }, e.extend(t.prototype, {
        init: function () {
            var e = this;
            e.currentForm = e.element.find("form"), e.formId = e.currentForm.attr("id"), e.loadEvents(), e.addValidateMethods(), e.initFormValidate()
        }, loadEvents: function () {
            var t = this;
            e(document).on("click", "#" + t.formId + " .payments", t.submitHandler.bind(t))
        }, addValidateMethods: function () {
            e.validator.addMethod("required", e.validator.methods.required, view.translate("Обязательное поле")), e.validator.addMethod("email", e.validator.methods.email, view.translate("Пожалуйста, введите правильный эл. адрес")), e.validator.addMethod("maxlength", e.validator.methods.maxlength, e.validator.format(view.translate("Пожалуйста, не вводите более {0} символов"))), e.validator.addMethod("min", e.validator.methods.min, e.validator.format(view.translate("Минимальная сумма платежа - {0}руб.")))
        }, initFormValidate: function () {
            var t = this;
            e(document).ready(function () {
                t.validation = e("#" + t.formId).validate(t)
            })
        }, submitHandler: function () {
            var t, n = this, i = e("#" + n.formId), o = i.attr("action"), a = i.serialize();
            i.valid() && e.post(o, a, function (i) {
                if (!1 === i.success) throw i.errors ? (_.forEach(i.errors, function (e, t, n) {
                    n[t] = _.reduce(e, function (e, t) {
                        return [e, t].join("\n")
                    }, "")
                }), n.validation.showErrors(i.errors), _.uniq(_.values(i.errors)).join("")) : (t = "Ошибка при обработке формы оплаты", ntNotification.showError(t)), Error(t);
                i.paymentType = a.match(/payment=(.*)/)[1];
                var o = document.createElement("form");
                o.setAttribute("action", "https://money.yandex.ru/eshop.xml"), o.setAttribute("method", "POST"), _.forEach(i, function (e, t) {
                    var n = document.createElement("input");
                    n.type = "hidden", n.name = t, n.setAttribute("value", e), o.appendChild(n)
                }), e("body").append(o), o.submit()
            }, "json")
        }
    }), setTimeout(function () {
        e(document).ready(function () {
            _.map(e(".mrb-form_payment"), function (e) {
                new t(e)
            })
        })
    }, 1e3)
}(jQuery), function (e, t) {
    "use strict";
    e(document).ready(function () {
        new t(t.types.FORM_TYPE_LEAD).init()
    })
}(window.$, window.Nethouse.DynamicForm), function (e) {
    function t(n) {
        var i = {url: "", name: "", size: 0, timestamp: 0, type: t.TYPE_IMAGE};
        n = e.extend({}, i, n), this.url = n.url, this.name = n.name, this.size = n.size, this.timestamp = n.timestamp, this.type = n.type
    }

    window.Nethouse = window.Nethouse || {};
    var n = window.Nethouse;
    t.TYPE_IMAGE = 1, t.prototype.properties = ["url", "name", "size", "timestamp", "type"], t.prototype.toInputFields = function (e, t) {
        var n = document.createElement("input"), i = document.createElement("div");
        return i.className = "js-file-fields js-file-fields_" + e, n.className = "js-file-field", n.type = "hidden", this.properties.forEach(function (o) {
            n.name = t + "[" + e + "][" + o + "]", n.value = this[o], i.appendChild(n), n = n.cloneNode(!0)
        }.bind(this)), i
    }, n.FileModel = t
}(window._), function () {
    function e(e, t) {
        this.filters = [], this.path = t.path, this.maxFiles = t.maxFiles || 0, this.fieldName = t.fieldName || "file", this.beforeUpload = this.beforeUpload || function () {
        };
        var n = document.createElement("input");
        n.name = "files", n.type = "file", t.multiple && (n.multiple = "multiple"), e.appendChild(n), e.className += " fileapi", this.events = {}, window.FileAPI.event.on(n, "change", this.inputChanges.bind(this))
    }

    function t(t, n) {
        n = window.FileAPI.extend({path: "/putimg"}, n), e.call(this, t, n)
    }

    window.Nethouse = window.Nethouse || {};
    var n = 1e4, i = window.Nethouse;
    e.Errors = {
        MAX_SIZE: 1,
        MIN_SIZE: 2,
        EXTENSION: 3,
        MAX_WIDTH: 4,
        MAX_HEIGHT: 5,
        MIN_WIDTH: 6,
        MIN_HEIGHT: 7,
        MAX_FILES_COUNT: 8
    }, e.MB = FileAPI.MB, e.KB = FileAPI.KB, e.prototype.call = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        this.events[e] && this.events[e].forEach(function (e) {
            e.apply(this, t)
        }.bind(this))
    }, e.prototype.on = function (e, t) {
        return this.events[e] = this.events[e] || [], this.events[e].push(t), this
    }, e.prototype.inputChanges = function (t) {
        var n = window.FileAPI, i = n.getFiles(t);
        n.filterFiles(i, function (e, t) {
            for (var n = 0; n < this.filters.length; n++) if (!this.filters[n](e, t)) return !1;
            return !0
        }.bind(this), function (t, i) {
            if (this.call("before", t, i), t.length) {
                this.maxFiles && t.length > this.maxFiles && (this.call("error", e.Errors.MAX_FILES_COUNT, {
                    filesCount: t.length,
                    maxFilesCount: this.maxFiles
                }), t = t.slice(0, this.maxFiles)), this.beforeUpload(t, i);
                var o = {
                    url: this.path, upload: function (e, t) {
                        this.call("upload", e, t)
                    }.bind(this), progress: function (e, t, n, i) {
                        this.call("progress", e, t, n, i)
                    }.bind(this), filecomplete: function (e, t, n, i) {
                        this.call("filecomplete", e, t, n, i)
                    }.bind(this), complete: function (e, t) {
                        this.call("complete", e, t)
                    }.bind(this), cache: !0
                };
                o.files = {}, o.files[this.fieldName] = t, n.upload(o)
            }
        }.bind(this)), n.reset(t.currentTarget)
    }, e.prototype.addFileSizeFilter = function (t, n) {
        return n = n || 0, this.filters.push(function (i) {
            return i.size > t ? (this.call("error", e.Errors.MAX_SIZE, {
                file: i,
                maxSize: t
            }), !1) : !(i.size < n) || (this.call("error", e.Errors.MIN_SIZE, {file: i, minSize: n}), !1)
        }.bind(this)), this
    }, e.prototype.addExtensionFilter = function (t) {
        var n = new RegExp("^.+\\.(" + t.join("|") + ")$", "i");
        return this.filters.push(function (t) {
            return !!n.test(t.name) || (this.call("error", e.Errors.EXTENSION, {file: t}), !1)
        }.bind(this)), this
    }, i = i || {}, i.Uploader = e, t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.prototype.addMaxSizeFilter = function (t, n) {
        return this.filters.push(function (i, o) {
            return t && o.width > t ? (this.call("error", e.Errors.MAX_WIDTH, {
                file: i,
                width: o.width,
                maxWidth: t
            }), !1) : !(n && o.height > n) || (this.call("error", e.Errors.MAX_HEIGHT, {
                file: i,
                height: o.height,
                maxHeight: n
            }), !1)
        }.bind(this)), this
    }, t.prototype.addMinSizeFilter = function (t, n) {
        return this.filters.push(function (i, o) {
            return t && o.width < t ? (this.call("error", e.Errors.MIN_WIDTH, {
                file: i,
                width: o.width,
                minWidth: t
            }), !1) : !(n && o.height < n) || (this.call("error", e.Errors.MIN_HEIGHT, {
                file: i,
                height: o.height,
                minHeight: n
            }), !1)
        }.bind(this)), this
    }, t.prototype.preview = function (e, t, n) {
        return this.previewSize = {width: e, height: t}, this.events.progress = [function (e, t) {
            var n = document.querySelectorAll(".upload-image_" + t.id + " .upload-image__progress")[0],
                i = e.loaded / e.total * 100;
            n && i < 90 && (n.style.top = e.loaded / e.total * 100 + "%")
        }], this.events.filecomplete = [function (e, t, n) {
            var i = document.querySelectorAll(".upload-image_" + n.id)[0];
            if (i) {
                if (e) return void(i.className += " upload-image_fail");
                i.className += " upload-image_uploaded", i.querySelectorAll(".upload-image__progress")[0].style.top = "100%"
            }
        }], this.events.preview = n, this
    }, t.prototype.beforeUpload = function (e) {
        if (this.events.preview) {
            var t = window.FileAPI;
            t.each(e, function (e) {
                e.id = n++, t.Image(e).preview(this.previewSize.width, this.previewSize.height).get(function (t, n) {
                    var i = document.createElement("div");
                    i.className = "upload-image upload-image_" + e.id, i.innerHTML = '<div class="upload-image__progress"></div><div class="upload-image-file__status"></div>', i.appendChild(n), this.events.preview(i, e.id)
                }.bind(this))
            }.bind(this))
        }
    }, i.ImageUploader = t
}(), function (e) {
    "use strict";
    var t = {
        init: function () {
            this.addMobileSelector()
        }, addMobileSelector: function () {
            !0 === isMobile.any && e("body").addClass("mobile-device")
        }
    };
    e(document).ready(function () {
        t.init()
    })
}(jQuery);
!function (n) {
    "use strict";

    function i() {
        var i = n(".ui.accordion");
        i.accordion({exclusive: !1, animateChildren: !1}), i.on("click", function (n) {
            n.stopPropagation()
        })
    }

    n(document).ready(function () {
        i(), n(document).on("widget_set_content", function (n, o) {
            11 == o && i()
        }.bind(this))
    })
}(window.jQuery);
!function (e) {
    e.fn.agile_carousel = function (n) {
        return n = e.extend({
            timer: 0,
            continuous_scrolling: !1,
            transition_type: "slide",
            transition_time: 600,
            number_slides_visible: 1,
            change_on_hover: "",
            control_set_1: "",
            control_set_2: "",
            control_set_3: "",
            control_set_4: "",
            control_set_5: ""
        }, n), this.each(function () {
            function o(t) {
                if ("" !== Q) {
                    C = "ac_click";
                    var n = Q.split(",");
                    e.inArray(t, n) != -1 && (C = "ac_hover")
                }
                return C
            }

            function s(t) {
                T === !1 && R < 2 && (1 == t ? (lt > 0 && (_t.addClass("ac_disabled"), _t.data("options").disabled = !0), ut > 0 && (rt.addClass("ac_disabled"), rt.data("options").disabled = !0)) : (lt > 0 && (_t.removeClass("ac_disabled"), _t.data("options").disabled = !1), ut > 0 && (rt.removeClass("ac_disabled"), rt.data("options").disabled = !1)), t == l ? (bt > 0 && (ct.addClass("ac_disabled"), ct.data("options").disabled = !0), vt > 0 && (pt.addClass("ac_disabled"), pt.data("options").disabled = !0)) : (bt > 0 && (ct.removeClass("ac_disabled"), ct.data("options").disabled = !1), vt > 0 && (pt.removeClass("ac_disabled"), pt.data("options").disabled = !1))), T === !1 && R > 1 && (t <= R ? (lt > 0 && (_t.addClass("ac_disabled"), _t.data("options").disabled = !0), ut > 0 && (rt.addClass("ac_disabled"), rt.data("options").disabled = !0)) : (lt > 0 && (_t.removeClass("ac_disabled"), _t.data("options").disabled = !1), ut > 0 && (rt.removeClass("ac_disabled"), rt.data("options").disabled = !1)), t >= l - R + tt ? (bt > 0 && (ct.addClass("ac_disabled"), ct.data("options").disabled = !0), vt > 0 && (pt.addClass("ac_disabled"), pt.data("options").disabled = !0)) : (bt > 0 && (ct.removeClass("ac_disabled"), ct.data("options").disabled = !1), vt > 0 && (pt.removeClass("ac_disabled"), pt.data("options").disabled = !1)))
            }

            function i(t) {
                it.find(".ac_selected").removeClass("ac_selected"), it.find(".slide_number_" + t).addClass("ac_selected")
            }

            function a(t) {
                if (I = e(t)[0], I.disabled !== !0) {
                    if (w = I.button_action, t = I.go_to, q !== !1 && (k = q), z = k - 1, M = e(at).eq(z), R < 2 && ("next" == w && k < l ? q = k + 1 : "next" == w && k == l && (q = 1), "previous" == w && k > 1 ? q = k - 1 : "previous" == w && 1 == k && (q = l)), R > 1) if ("next" == w && k < l - R + tt ? q = et[Math.ceil(k / R)] : "next" == w && k >= l - R + tt && R > 1 && (q = 1), "previous" == w && k > R && R > 1) {
                        var n = Math.floor(k / R);
                        n -= 1, q = et[n]
                    } else "previous" == w && k <= R && R > 1 && (q = xt);
                    "direct" == w && (q = t), P = q - 1, N = e(at).eq(P), i(q), ft > 0 && ht.html(q), P != z && ("slide" == S && R > 1 && dt.stop().animate({left: (q * B - B) * -1 + "px"}, {duration: U}), "slide" == S && 1 == R && (t = "", ("next" == w || q > k && "direct" == w) && (N.css({
                        top: 0,
                        left: B
                    }), t = B * -1), ("previous" == w || q < k && "direct" == w) && (N.css({
                        top: 0,
                        left: B * -1
                    }), t = B), M.stop().animate({left: t + "px"}, {
                        duration: U,
                        complete: gt
                    }), N.stop().animate({left: "0px"}, {duration: U})), "fade" == S && 1 == R && (at.not(M, N).css({
                        top: "-5000px",
                        left: 0,
                        "z-index": 0,
                        opacity: 0
                    }), w && (N.css({top: 0, left: 0, "z-index": 20}), M.css({
                        "z-index": 10,
                        opacity: 1
                    })), N.stop().animate({opacity: 1}, {duration: U, complete: mt})))
                }
                s(q), i(q)
            }

            function d() {
                yt.length > 0 && (yt.html("play"), yt.data("options").paused = !0, yt.addClass("play_button")), clearInterval($)
            }

            function _() {
                a(Z)
            }

            var l = 0, r = "", u = "", c = "", b = "", p = "", v = "", h = "", f = "", m = "", g = "", x = "", y = "",
                C = "ac_click", I = "", w = "", k = "", q = !1, z = "", P = "", M = "", N = "",
                T = n.continuous_scrolling, j = n.carousel_outer_width, A = n.carousel_outer_height,
                O = n.carousel_data, Q = n.change_on_hover, B = n.slide_width, D = n.slide_height, E = n.control_set_1,
                F = n.control_set_2, G = n.control_set_3, H = n.control_set_4, J = n.control_set_5,
                K = n.no_control_set, L = n.persistent_content, R = n.number_slides_visible, S = n.transition_type,
                U = n.transition_time, V = n.timer, W = "", X = "", Y = X = "", Z = "", $ = "";
            e.each(O, function () {
                l++
            });
            for (var tt = l % R, et = [], W = "", nt = 0, ot = 0, ot = 0; ot < l; ot++) 0 === ot && (c += "<div class='group_numbered_buttons_container button_container'>"), X = Math.floor((ot + 1) / R) * R + 1, X !== W && X <= l && (et[nt] = X, c += "<div class='slide_number_" + X + " group_numbered_button slide_button " + o("group_numbered_buttons") + '\' data-options=\'{"button_type":"group_numbered_button","button_action":"direct","go_to":' + X + ', "trigger_type":"' + C + '","disabled": false}\'>' + (nt + 1) + "</div>", W = X, nt++), ot === l - 1 && (c += "</div>");
            v += '<span class=\'pause_button slide_button pause\' data-options=\'{"button_type":"pause_button","trigger_type": "none","disabled": false,"paused": false}\'>Pause</span>', h += "<span class='previous_next_button previous_button slide_button " + o("previous_button") + '\' data-options=\'{"button_type":"previous_button","button_action":"previous","trigger_type": "' + C + '","disabled": false}\'>Prev</span>', f += "<span class='previous_next_button next_button slide_button " + o("next_button") + '\' data-options=\'{"button_type":"next_button","button_action":"next","trigger_type": "' + C + '","disabled": false}\'>Next</span>', m += "<div class='hover_previous_next_button hover_previous_button slide_button " + o("hover_previous_button") + '\' data-options=\'{"button_type":"hover_previous_button","button_action":"previous","trigger_type": "' + C + "\",\"disabled\": false}'><span style='opacity: 0;' class='hover_previous_next_button_inner'>Prev</span></div>", g += "<div class='hover_previous_next_button hover_next_button slide_button " + o("hover_next_button") + '\' data-options=\'{"button_type":"hover_next_button","button_action":"next","trigger_type": "' + C + "\",\"disabled\": false}'><span style='opacity: 0;' class='hover_previous_next_button_inner'>Next</span></div>", x += "<span class='slide_count'>" + l + "</span>", y += "<span class='current_slide_number'>1</span>", r += "<div class='agile_carousel' style='overflow: hidden; position: relative; width: " + j + "px; height: " + A + "px;'>";
            var st, it = e(this), ot = 1;
            for (st in O) O.hasOwnProperty(st) && (X = O[st], W = X.content, j = X.thumbnail_button, X = X.content_button, 1 === ot && (r += "<div class='slides' style='width: " + B * l + "px; height: " + D + "px;'>"), W && (r += "<div class='slide_" + ot + " slide' style='border: none; margin: 0; padding: 0; height: " + D + "px; width: " + B + "px;'>" + W + "</div>"), ot === l && (r += "</div>"), 1 == ot && (u += "<div class='numbered_buttons_container  button_container'>"), u += "<div class='slide_number_" + ot + " numbered_button slide_button " + o("numbered_buttons") + '\' data-options=\'{"button_type":"numbered_button","button_action":"direct","go_to":' + ot + ', "trigger_type":"' + C + '","disabled": false}\'>' + ot + "</div>", ot == l && (u += "</div>"), j && (1 == ot && (b += "<div class='thumbnail_buttons_container  button_container'>"), b += "<div class='slide_number_" + ot + " thumbnail_button slide_button " + o("thumbnails") + '\'  data-options=\'{"button_type":"thumbnail_button","button_action":"direct","go_to":' + ot + ',"trigger_type": "' + C + '","disabled": false}\'>' + j + "</div>", ot == l && (b += "</div>")), X && (1 == ot && (p += "<div class='content_buttons_container  button_container'>"), p += "<div class='slide_number_" + ot + " content_button_" + ot + " content_button slide_button " + o("content_buttons") + '\' data-options=\'{"button_type":"content_button","button_action":"direct","go_to":' + ot + ',"trigger_type": "' + C + "\",\"disabled\": false}'><div class='content_button_inner'>" + X + "</div></div>", ot == l && (p += "</div>")), ot++);
            O = function (t, e) {
                var n = "";
                if ("" !== t) {
                    e && (n += "<div class='control_set_" + e + " control_set'><div class='control_set_" + e + "_inner control_set_inner'>");
                    var o = t.split(",");
                    for (nt = 0; nt < o.length; nt++) "numbered_buttons" == o[nt] && (n += u), "group_numbered_buttons" == o[nt] && (n += c), "thumbnails" == o[nt] && (n += b), "content_buttons" == o[nt] && (n += p), "pause_button" == o[nt] && (n += v), "previous_button" == o[nt] && (n += h), "next_button" == o[nt] && (n += f), "hover_previous_button" == o[nt] && (n += m), "hover_next_button" == o[nt] && (n += g), "slide_count" == o[nt] && (n += x), "current_slide_number" == o[nt] && (n += y);
                    e && (n += "</div></div>"), r += n
                }
            }, n.control_set_1 && O(E, 1), n.control_set_2 && O(F, 2), n.control_set_3 && O(G, 3), n.control_set_4 && O(H, 4), n.control_set_5 && O(J, 5), n.no_control_set && O(K), L && (r += L), r += "</div>", it.html(r);
            var at = it.find(".slide"), dt = it.find(".slides");
            it.find(".slide_button"), E = it.find(".agile_carousel"), it.find(".previous_button, .hover_previous_button"), it.find(".next_button, .hover_next_button");
            var _t = it.find(".previous_button"), lt = _t.length, rt = it.find(".hover_previous_button"),
                ut = rt.length, ct = it.find(".next_button"), bt = ct.length, pt = it.find(".hover_next_button"),
                vt = pt.length, ht = it.find(".current_slide_number"), ft = ht.length;
            if (1 == R && (at.eq(0).css({
                position: "absolute",
                top: 0,
                left: 0
            }), at.slice(1, l).css({
                position: "absolute",
                top: "-5000px",
                left: 0
            }), dt.css("width", B + "px")), R > 1) for (E.css("width", R * B + "px"), E = 0, E = 1; E <= l; E++) at.eq(E).css({
                position: "absolute",
                top: 0,
                left: B * E + "px"
            });
            var mt = function () {
                M.css({"z-index": 10, top: -5e3})
            }, gt = function () {
                M.css({position: "absolute", top: "-5000px", left: 0})
            };
            s(1), ft > 0 && ht.html(1), i(1);
            var k = 1, xt = et[et.length - 1], E = it.find(".ac_click"), F = it.find(".ac_hover");
            0 !== V && ($ = setInterval(_, V));
            var yt = it.find(".pause_button");
            e(E).click(function () {
                d(), it.find(":animated").length < 1 ? a(e(this).data().options) : (Y = e(this), "next" != Y.data("options").button_action && "previous" != Y.data("options").button_action && (t = setInterval(function () {
                    dt.find(":animated").length < 1 && (a(Y.data().options), clearInterval(Y.data("options").timeout))
                }, 30), Y.data("options").timeout = t))
            }), e(F).hover(function () {
                d(), dt.find(":animated").length < 1 ? a(e(this).data().options) : (Y = e(this), t = setInterval(function () {
                    dt.find(":animated").length < 1 && (a(Y.data().options), clearInterval(Y.data("options").timeout))
                }, 30), Y.data("options").timeout = t)
            }, function () {
                Y = e(this), clearInterval(Y.data("options").timeout)
            }), Z = {
                button_action: "next",
                button_type: "pause",
                disabled: !1,
                trigger_type: "ac_click"
            }, yt.click(function () {
                var t = e(this);
                t.data("options").paused === !0 ? (clearInterval($), yt.html("pause"), yt.data("options").paused = !1, yt.addClass("pause_button"), yt.removeClass("play_button"), a(Z), $ = setInterval(_, V)) : t.data("options").paused === !1 && (d(), clearInterval($))
            }), e(".hover_previous_next_button").hover(function () {
                e(this).find(".hover_previous_next_button_inner").stop().fadeTo("fast", .85)
            }, function () {
                e(this).find(".hover_previous_next_button_inner").stop().fadeTo("fast", 0)
            })
        })
    }
}(jQuery);
!function (t) {
    "use strict";
    var i = function (i, e, n) {
        n = n || [], this.options = t.extend({
            field: "name",
            input: ".js-filter__input",
            collection: ".js-filter__item"
        }, e), this.$element = i, this.data = n, this.$collectionItems = i.find(this.options.collection), this.initInput()
    }, e = i.prototype;
    e.initInput = function () {
        this.$input = this.$element.find(this.options.input), this.$input.on("keyup", function () {
            this.filter(this.$input.val())
        }.bind(this))
    }, e.filter = function (i) {
        if (this.$collectionItems.show(), i = String(i).trim(), !i) return void this.$element.trigger("collection-filtered", {filtered: this.data});
        var e = new RegExp(i, "i"), n = this.data.filter(function (t) {
            return e.test(t[this.options.field])
        }.bind(this));
        this.$element.trigger("collection-filtered", {filtered: n}), this.$collectionItems.filter(function (i, n) {
            return !e.test(t(n).data(this.options.field))
        }.bind(this)).hide()
    }, t.fn.collectionFilter = function (e, n) {
        return e = e || {}, this.each(function () {
            this.collectionFilter || (this.collectionFilter = new i(t(this), e, n))
        })
    }
}(window.jQuery);
+function (e) {
    "use strict";

    function n() {
        e(".nav-tabs > li > a").click(function (n) {
            n.preventDefault(), e(this).tab("show")
        })
    }

    function t() {
        e("select").dropdown({transition: "slide down"}), e(document).on("widget_set_content", function () {
            e("select").dropdown({transition: "slide down"})
        })
    }

    function i() {
        e(".posts-slider").ContentSlider({}, {slideDivider: 2}), e(".articles-slider").ContentSlider({}, {slideDivider: 2}), e(document).on("widget_set_content", function (n, t) {
            switch (t) {
                case Nethouse.WIDGETS.TYPE_POSTS:
                    e(".posts-slider").ContentSlider({}, {slideDivider: 2});
                    break;
                case Nethouse.WIDGETS.TYPE_ARTICLES:
                    e(".articles-slider").ContentSlider({}, {slideDivider: 2})
            }
        }), e(".comments-slider").ContentSlider(), e(document).on("comments_block_change", function (n) {
            var t = function () {
                e(".comments-slider").ContentSlider()
            };
            _.delay(t, 500)
        })
    }

    e(document).ready(function () {
        n(), t(), i()
    })
}(jQuery);
!function (t, i) {
    "use strict";
    var n = function (t, n) {
            i.each(n, function (n, s) {
                i.isFunction(t) ? t.prototype[s] = n : i.isObject(t) && (t[s] = n)
            })
        }, s = [].slice,
        e = {slides: "article", showBy: 1, slideDivider: 1, rewindOnEnd: !1, easing: "easeInOutCubic", duration: 500},
        o = function () {
            function t() {
                this.opts = 1 <= arguments.length ? s.call(arguments, 0) : [], this._apply(), this._init()
            }

            return t.prototype.controls = {
                prev: ".prev",
                next: ".next"
            }, t.prototype.options = i.clone(e), t.prototype.current = 0, t.prototype.slidesCount = 0, t.prototype.slideWidth = 0, t
        }();
    n(o, {
        _apply: function () {
            var n = this.opts[0], s = this.opts[1], o = this.opts[2];
            o = o || {}, i.isUndefined(n) || (this.container = t(n)), !i.isUndefined(s) && i.has(s, "prev") && i.has(s, "next") && (this.controls = i.extend(this.controls, {
                prev: t(s.prev),
                next: t(s.next)
            })), i.isObject(o) && !i.isEmpty(o) ? this.options = i.extend(this.options, o) : this.options = i.extend(this.options, e), delete this.opts
        }, _init: function () {
            this.slidesCount = Math.ceil(this.slides().length / this.options.slideDivider), this.slideWidth = this.container.parent().width() / this.options.showBy, this.listen()
        }, listen: function (t) {
            var n = this;
            i.isUndefined(t) && (t = !0), i.each(this.controls, function (s, e) {
                var o = i.isString(s) ? n.container.parent().find(s) : s;
                t ? o.on("click", n[e].bind(n)) : o.off()
            })
        }, slides: function () {
            return this.container.children(this.options.slides)
        }, offsetOptions: function (t, i) {
            return i = i || 1, function () {
                var n;
                switch (t) {
                    case"backward":
                        if (n = this.current - i, n < 0) return;
                        break;
                    case"forward":
                        if (n = this.current + i, n > this.slidesCount - 1) {
                            if (!this.options.rewindOnEnd) return;
                            n = 0
                        }
                        break;
                    case"rewind":
                        n = 0;
                        break;
                    case"fast-forward":
                        n = this.slidesCount - 1
                }
                return this.current = n, {left: "-" + this.slideWidth * n + "px"}
            }.call(this)
        }, move: function (t, n) {
            var s, e;
            t = t || "forward", n = n || 1, e = i.pick(this.options, "easing", "duration"), s = this.offsetOptions(t, n), this.slides().animate(s, e)
        }, rewind: function () {
            this.move("rewind")
        }, next: function () {
            this.move("forward")
        }, prev: function () {
            this.move("backward")
        }, reset: function (t) {
            this.options = i.extend(this.options, e, t), this.move("rewind"), this.listen(!1), this._init()
        }
    }), t.fn.ContentSlider = function (i, n) {
        return void 0 == i && (i = {}), void 0 == n && (n = {}), this.each(function () {
            var s = t(this), e = s.data("content.slider");
            void 0 == e && s.data("content.slider", e = new o(this, i, n))
        })
    }
}(jQuery, _);
+function (t) {
    "use strict";

    function n(n) {
        return this.each(function () {
            var e = t(this), i = e.data("bs.tab");
            i || e.data("bs.tab", i = new a(this)), "string" == typeof n && i[n]()
        })
    }

    var a = function (n) {
        this.element = t(n)
    };
    a.TRANSITION_DURATION = 150, a.prototype.show = function () {
        var n = this.element, a = n.closest("ul:not(.dropdown-menu)"), e = n.data("target");
        if (e || (e = n.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, "")), !n.parent("li").hasClass("active")) {
            var i = a.find(".active:last a"), r = t.Event("hide.bs.tab", {relatedTarget: n[0]}),
                s = t.Event("show.bs.tab", {relatedTarget: i[0]});
            if (i.trigger(r), n.trigger(s), !s.isDefaultPrevented() && !r.isDefaultPrevented()) {
                var o = t(e);
                this.activate(n.closest("li"), a), this.activate(o, o.parent(), function () {
                    i.trigger({type: "hidden.bs.tab", relatedTarget: n[0]}), n.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: i[0]
                    })
                })
            }
        }
    }, a.prototype.activate = function (n, e, i) {
        function r() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), n.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), o ? (n[0].offsetWidth, n.addClass("in")) : n.removeClass("fade"), n.parent(".dropdown-menu") && n.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), i && i()
        }

        var s = e.find("> .active"),
            o = i && t.support.transition && (s.length && s.hasClass("fade") || !!e.find("> .fade").length);
        s.length && o ? s.one("bsTransitionEnd", r).emulateTransitionEnd(a.TRANSITION_DURATION) : r(), s.removeClass("in")
    };
    var e = t.fn.tab;
    t.fn.tab = n, t.fn.tab.Constructor = a, t.fn.tab.noConflict = function () {
        return t.fn.tab = e, this
    };
    var i = function (a) {
        a.preventDefault(), n.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery), +function (t) {
    "use strict";

    function n() {
        var t = document.createElement("bootstrap"), n = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var a in n) if (void 0 !== t.style[a]) return {end: n[a]};
        return !1
    }

    t.fn.emulateTransitionEnd = function (n) {
        var a = !1, e = this;
        t(this).one("bsTransitionEnd", function () {
            a = !0
        });
        var i = function () {
            a || t(e).trigger(t.support.transition.end)
        };
        return setTimeout(i, n), this
    }, t(function () {
        t.support.transition = n(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (n) {
                if (t(n.target).is(this)) return n.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery);
+function (t) {
    "use strict";

    function n(n, i) {
        var o = n.find(".small-cart"), e = t(window).width() - (o.offset().left + o.outerWidth()), c = t(document);
        c.scrollTop() > i ? "fixed" != o.css("position") && o.is(":visible") && o.css({
            position: "fixed",
            top: 0,
            right: e
        }) : o.css({position: "", top: "", right: ""})
    }

    function i() {
        var i = t(".cart-widget");
        if (i.length) {
            var o = i.find(".quantity-items"), e = t(document), c = o.length ? parseInt(o.html()) : 0,
                r = t(".top-header").outerHeight() + t(".site-panel").outerHeight() + t(".info-panel").outerHeight();
            e.on("scroll", function () {
                n(i, r)
            }), e.on("click touchstart", function (n) {
                n && (i[0].contains(n.target) || t(".js-order-product").has(n.target).length) || i.find(".small-cart").hide()
            }), e.on("cart.update", function () {
                var e = i.find(".cart-is-empty"), a = i.find(".small-cart");
                e.html("Корзина пуста"), c = 0, a.is(":visible") || (a.stop(), a.fadeIn({
                    duration: 200,
                    start: function () {
                        n(i, r)
                    }
                })), t("#products-cart-left-show").find(".cart-item .num-items").each(function () {
                    var n = t(this);
                    c += parseInt(n.val())
                }), o.html(c)
            }), i.on("click", ".js-close-cart", function () {
                return i.find(".small-cart").toggle(), !1
            }), i.find(".cart-content").on("click", function () {
                i.find(".small-cart").toggle()
            })
        }
    }

    t(document).ready(function () {
        i()
    })
}(jQuery);
!function (t, n, i) {
    "use strict";

    function s() {
        if (n.ymaps) {
            var i = t.Deferred();
            return i.resolve(n.ymaps), i.promise()
        }
        return t.getScript("//api-maps.yandex.ru/2.1/?load=package.full&mode=release&lang=ru_RU").then(function () {
            return n.ymaps
        }.bind(this))
    }

    function e(t, n) {
        this.element = t, this.points = n, s().then(function (t) {
            this.ymaps = t, this.init(n)
        }.bind(this))
    }

    var o = e.prototype;
    o.init = function () {
        this.ymaps.ready(function () {
            this.ballonContentLayout(), this.cluster = this.initCluster(), this.map = this.initMap(), this.map.setBounds(this.getBounds()), this.map.geoObjects.add(this.cluster)
        }.bind(this))
    }, o.initCluster = function () {
        var t = new this.ymaps.Clusterer({
            groupByCoordinates: !1,
            zoomMargin: 40,
            clusterBalloonItemContentLayout: this.balloonLayout
        }), n = this.preparePoints();
        return t.add(n), t
    }, o.updateCluster = function (t) {
        this.points = t;
        var n = this.preparePoints();
        this.cluster.removeAll(), this.cluster.add(n), n.length && this.map.setBounds(this.getBounds())
    }, o.getBounds = function (t) {
        t = t || .003;
        var n = this.cluster.getBounds();
        return n[0] = n[0].map(function (n) {
            return Number(n) - t
        }), n[1] = n[1].map(function (n) {
            return Number(n) + t
        }), n
    }, o.preparePoints = function () {
        return this.points.map(function (t) {
            return t.balloonContentHeader = t.name, t.hintContent = t.name, new this.ymaps.Placemark([t.longitude, t.latitude], t, {balloonContentLayout: this.balloonLayout})
        }.bind(this))
    }, o.initMap = function () {
        var t = new this.ymaps.Map(this.element, {
            center: [0, 0],
            zoom: 9,
            controls: []
        }, {autoFitToViewport: "always"});
        return t.controls.add("zoomControl", {position: {top: 10, left: 10}}), t.behaviors.disable("scrollZoom"), t
    }, o.ballonContentLayout = function () {
        var i = this,
            s = this.ymaps.templateLayoutFactory.createClass('<div class="shipping-map__balloon"><b class="shipping-map__name">{{properties.name}}</b><br /><button class="js-shipping__map-button shipping-map__button">' + n.view.translate("shipping_select_outpost") + "</button></div>", {
                build: function () {
                    s.superclass.build.call(this), this.selectOutpost = this.selectOutpost.bind(this), t(".js-shipping__map-button").bind("click", this.selectOutpost)
                }, clear: function () {
                    t(".js-shipping__map-button").unbind("click", this.selectOutpost), s.superclass.clear.call(this)
                }, selectOutpost: function () {
                    t(i.element).trigger(t.fn.shippingMap.events.pointSelect, this._data.properties._data), i.map.destroy()
                }
            });
        this.balloonLayout = s
    }, t.fn.shippingMap = function (t) {
        return this.each(function () {
            this.shippingMap ? this.shippingMap.updateCluster(t) : this.shippingMap = new e(this, t)
        })
    }, t.fn.shippingMap.events = {pointSelect: "shipping-select-point"}
}(window.jQuery, window, document);
!function (t, e, s) {
    "use strict";
    var i = e.Nethouse.Modal, n = function (e, s) {
        this.options = t.extend({
            elms: {
                city: ".js-shipping__city",
                pickup: ".js-shipping__pickup",
                outpostSelect: ".js-shipping__outpost-select",
                outposts: ".js-outposts",
                outpostModal: ".js-outpost__modal",
                outpostsTemplate: ".js-outposts__template",
                outpostsItem: ".js-outposts__item",
                outpostsMap: ".js-outposts__map",
                rates: ".js-shipping__rates",
                rate: ".js-shipping__rate",
                rateElm: ".js-shipping__rate-elm",
                shipment: ".js-shipping__shipment"
            },
            activeRateCls: "shipping__rate_active",
            citiesUrl: "/shipping/city-autocomplete?name={query}",
            ratesUrl: "/shipping/rates"
        }, s), this.$element = e, this.ratesIsGet = !1, this.init()
    }, o = n.prototype;
    o.init = function () {
        this.$rates = this.$element.find(this.options.elms.rates), this.$city = this.$element.find(this.options.elms.city), this.$rates.length && (this.$city.length ? (this.initCity(), this.$element.on(n.events.updateRates, function () {
            this.city ? this.getRatesHtml() : this.$element.trigger(n.events.rateNotSelected)
        }.bind(this)), setTimeout(function () {
            this.$element.trigger(n.events.rateNotSelected)
        }.bind(this), 100)) : (this.getRatesHtml(), this.$element.on(n.events.updateRates, function () {
            this.getRatesHtml()
        }.bind(this))))
    }, o.collectPoints = function () {
        var e = [], s = this;
        return t(this.options.elms.outpostsItem).each(function () {
            var i = t(this), n = s.outpostItemData(i);
            e.push(n)
        }), e
    }, o.disableScroll = function (s) {
        t("html").hasClass("touch") && t(e).trigger("scroll:disable", s)
    }, o.initCity = function () {
        var i = this.$city.find(".search");
        setTimeout(function () {
            this.$city.dropdown({
                apiSettings: {
                    url: this.options.citiesUrl, cache: !1, beforeSend: function (t) {
                        return !!t.urlData.query.length
                    }, onResponse: function (t) {
                        return t.cities && t.cities.length ? (t.cities.forEach(function (t) {
                            t.value = t.city_id, t.name = t.full_name
                        }), {success: !0, results: t.cities}) : {success: !0, results: [{name: i.val(), value: 0}]}
                    }.bind(this)
                },
                message: {noResults: e.view.translate("shipping_city_not_found")},
                direction: t("html").hasClass("touch") ? "upward" : "auto",
                sortSelect: !0,
                allowReselection: !0,
                selectOnKeydown: !1,
                minCharacters: 1,
                context: s.body,
                forceSelection: !1,
                saveRemoteData: !1,
                duration: 0,
                onHide: function () {
                    var e = t(this);
                    i.val() && (i.val(""), e.find(".text").removeClass("filtered").html(e.dropdown("get text")), e.dropdown("refresh"))
                },
                onChange: function (t, e) {
                    this.city = {
                        id: t,
                        name: e
                    }, this.$city.removeClass("error"), this.$city.removeClass("focused"), i.blur(), this.getRatesHtml(), this.disableScroll(!1)
                }.bind(this)
            })
        }.bind(this)), this.$city.find(".js-dropdown__close").on("click", function () {
            this.$city.removeClass("focused"), i.blur(), this.disableScroll(!1)
        }.bind(this)), i.on("focus", function () {
            this.$city.removeClass("error"), this.$city.hasClass("focused") || (this.disableScroll(!0), this.$city.addClass("focused"))
        }.bind(this)), i.on("click", function () {
            return setTimeout(function () {
                this.$city.dropdown("show"), this.$city.dropdown("set visible", !0)
            }.bind(this), 100), !1
        }.bind(this))
    }, o.getRatesHtml = function (e) {
        return e = e || {}, this.city && (e.address_to = {
            carrier_address_id: this.city.id,
            global: {locality: this.city.name}
        }), e.promocode = t(".js-promocode-input").val(), t.ajax({
            type: "POST",
            url: this.options.ratesUrl,
            data: JSON.stringify(e),
            contentType: "application/json; charset=utf-8"
        }).then(function (t) {
            this.insertRatesHtml(t), this.rateChanged(), this.$element.trigger(n.events.rateSelected), this.ratesIsGet = !0
        }.bind(this))
    }, o.rateChanged = function () {
        var t = this.options.elms, e = this.$element.find(t.rate + ":checked"), s = this.$element.find(t.shipment);
        this.$element.find(t.rateElm).removeClass(this.options.activeRateCls), e.length && (e.parents(t.rateElm).addClass(this.options.activeRateCls), this.$element.trigger(n.events.rateChanged, {
            id: e.val(),
            shipment: s.val(),
            pickupPoint: this.$pickup.val(),
            price: Number(e.data("price"))
        }), this.$element.trigger(n.events.rateSelected))
    }, o.insertRatesHtml = function (t) {
        this.$rates.html(t), this.initOutpost(), this.$rates.find(this.options.elms.rate).on("change", function () {
            this.rateChanged()
        }.bind(this))
    }, o.initOutpost = function () {
        this.$pickup = this.$rates.find(this.options.elms.pickup), this.$outpostSelect = this.$rates.find(this.options.elms.outpostSelect), this.$outpostSelect.on("click", function () {
            this.showOutpostModal()
        }.bind(this))
    }, o.outpostItemData = function (t) {
        return t.data()
    }, o.setOutpostData = function (t) {
        var e = this.options.elms;
        this.$pickup.val(t.value), this.getRatesHtml({
            shipment_id: this.$element.find(e.shipment).val(),
            pickup_point_id: t.value
        })
    }, o.selectOutpostAddress = function () {
        var e = this;
        t(this.options.elms.outpostsItem).on("click", function () {
            var s = t(this), n = e.outpostItemData(s);
            e.setOutpostData(n), i.close()
        })
    }, o.showOutpostModal = function () {
        var e = this.$element.find(this.options.elms.outpostsTemplate).html();
        i.openHtml(e, {
            open: function () {
                this.selectOutpostAddress();
                var e, s = t(this.options.elms.outpostModal), o = this.collectPoints(),
                    h = s.find(this.options.elms.outpostsMap);
                s.find(this.options.elms.outposts).collectionFilter({}, o).on("collection-filtered", function (t, e) {
                    h.shippingMap(e.filtered)
                }), e = h.shippingMap(o), e.on(t.fn.shippingMap.events.pointSelect, function (t, e) {
                    this.setOutpostData(e), this.rateChanged(), i.close()
                }.bind(this)), this.$element.trigger(n.events.outpostsOpen)
            }.bind(this)
        }, !1)
    }, o.rateSelected = function () {
        if (!this.$rates.length) return !0;
        if (!this.ratesIsGet) return !1;
        var t = this.$element.find(this.options.elms.rate);
        return Boolean(!this.$city.length && !t.length || t.filter(":checked").length)
    }, o.citySelected = function () {
        return !this.$city.length || (this.$city.dropdown("get value") ? (this.$city.removeClass("error"), !0) : (this.$city.addClass("error"), !1))
    }, n.events = {
        rateNotSelected: "shipping-not-selected",
        rateSelected: "shipping-selected",
        rateChanged: "shipping-changed",
        updateRates: "shipping-update-rates",
        outpostsOpen: "shipping-open-outposts"
    }, t.fn.shipping = function () {
        var t = arguments, e = Array.prototype.slice.call(t, 1);
        return this.length ? this.shippingItem ? t.length ? this.shippingItem[t[0]].apply(this.shippingItem, e) : void 0 : (this.shippingItem = new n(this), this) : this
    }, t.fn.shipping.events = t.extend({}, n.events)
}(window.jQuery, window, document);