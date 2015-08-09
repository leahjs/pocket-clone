function parseUri(e) {
    for (var t = parseUri.options, i = t.parser[t.strictMode ? "strict" : "loose"].exec(e), n = {}, a = 14; a--;) n[t.key[a]] = i[a] || "";
    return n[t.q.name] = {}, n[t.key[12]].replace(t.q.parser, function(e, i, a) {
        i && (n[t.q.name][i] = a)
    }), n
}

function dsi(e, t) {
    return {
        "value": e,
        "label": t
    }
}

function createTooltip(e, t, i, n, a, s, o) {
    if ("undefined" != typeof e) {
        "undefined" == typeof n && (n = ["bottom"]), "undefined" == typeof a && (a = 3);
        var r = '<div class="detail">';
        if ("string" == typeof t && (r += "<h5>" + t + "</h5>"), "string" == typeof i)
            for (var l = i.split("|"), c = 0; c < l.length; c++) r += "<p>" + l[c] + "</p>";
        r += "</div>";
        var u = new PopOver("alt-tooltip", r, $("#container"), {
            "positions": n,
            "disableHideOnScroll": !0,
            "smallArrow": !0,
            "xOffset": a,
            "noClickDismiss": !0,
            "confirmButton": s ? !0 : !1,
            "confirmCallback": o ? o : null
        });
        return u.object.addClass("alt-tooltip"), u.show(e), u
    }
}

function createGSFTooltip(e) {
    currentGSFTooltip.anchor = e.anchor, "undefined" == typeof e.position && (e.position = ["bottom"]), "undefined" == typeof e.offsetx && (e.offsetx = 0), "undefined" == typeof e.offsety && (e.offsety = 0), "bottomleft" == e.position[0] && (e.offsetx -= 14), "string" == typeof e.headline && (dictJSON.manual.gsfheadline = e.headline), "string" == typeof e.body && (dictJSON.manual.gsfbody = e.body), "undefined" == typeof e.progress && (e.progress = {
        "size": 3,
        "selected": 1
    }), "undefined" == typeof e.confirmdetail && (e.confirmdetail = {
        "button": !1,
        "text": "",
        "callback": null
    });
    var t = new Array(e.progress.size);
    t[e.progress.selected - 1] = {
        "selected": 1
    }, dictJSON.manual.gsfprogresscount = t, dictJSON.manual.gsftooltipconfirm = e.confirmdetail.button ? 1 : 0, dictJSON.manual.gsftooltipconfirmtext = e.confirmdetail.text, e.noisolate || IsolateScreen.show(e.isolateall ? null : e.anchor), currentGSFTooltip ? (currentGSFTooltip.object.removeClass("popover-active"), currentGSFTooltip.positions = e.position, currentGSFTooltip.xOffset = e.offsetx, currentGSFTooltip.object.find(".gsf-tooltip-detail").remove(), currentGSFTooltip.object.append(Handlebars.templates.gsf_newtooltipdetail(dictJSON)), currentGSFTooltip.object.addClass("popover-active")) : currentGSFTooltip = new PopOver("gsf-tooltip", Handlebars.templates.gsf_newtooltipdetail(dictJSON), $("body"), {
        "positions": e.position,
        "disableHideOnScroll": !0,
        "xOffset": e.offsetx,
        "noClickDismiss": !0,
        "sizingWithPadding": !0
    }), currentGSFTooltip.object.addClass("gsf-tooltip"), e.anchor ? (currentGSFTooltip.onlyCentered = !1, currentGSFTooltip.object.removeClass("gsf-tooltip-fluid"), currentGSFTooltip.show(e.anchor)) : (currentGSFTooltip.onlyCentered = !0, currentGSFTooltip.object.addClass("gsf-tooltip-fluid"), currentGSFTooltip.show($("body")), currentGSFTooltip.anchor = $("body")), e.fixed ? currentGSFTooltip.object.addClass("gsf-tooltip-fixed") : currentGSFTooltip.object.removeClass("gsf-tooltip-fixed"), e.noisolate ? currentGSFTooltip.object.addClass("gsf-tooltip-noisolate") : currentGSFTooltip.object.removeClass("gsf-tooltip-noisolate");
    var i = currentGSFTooltip.object.attr("class").match(/popover-new-(\w+)/i);
    return i && i.length > 1 && currentGSFTooltip.object.removeClass("gsf-tooltip-bottom gsf-tooltip-bottomleft gsf-tooltip-right gsf-tooltip-top gsf-tooltip-left").addClass("gsf-tooltip-" + i[1]), e.confirmdetail.button && "function" == typeof e.confirmdetail.callback && currentGSFTooltip.object.find(".gsf-tooltip-confirm").click(function(t) {
        t.preventDefault(), e.confirmdetail.callback()
    }), currentGSFTooltip
}

function closeGSFTooltip() {
    currentGSFTooltip && currentGSFTooltip.object.removeClass("popover-active"), IsolateScreen.showing && IsolateScreen.hide()
}

function createDialog(e) {
    var t = $('<div class="confirmation_dialog"></div>'),
        i = new PopOver("confirmation", t, null, {
            "onHide": e.cancel ? e.cancel.action : e.onHide ? e.onHide : null,
            "onShow": e.onShow,
            "xOffset": e.xOffset ? e.xOffset : 0
        });
    e.title && t.append("<h5>" + e.title + "</h5>"), e.message && t.append("<p>" + e.message + "</p>"), e.cancel || (e.cancel = {}), e.cancel && e.cancel.title || (e.cancel.title = Templating.callTrans("cta.cancel"));
    var n = $('<a class="button button-small button-secondary" href="#">' + e.cancel.title + "</a>");
    n.click(function(t) {
        t.stopPropagation(), t.preventDefault(), e.cancel.action && e.cancel.action(), i.show(!1)
    }), t.append(n);
    var a;
    e.confirm && (a = $('<a class="button button-small button-important" href="#">' + e.confirm.title + "</a>"), a.click(function(t) {
        t.stopPropagation(), t.preventDefault(), e.confirm.action && e.confirm.action(), i.show(!1)
    }), t.append(a)), t.append('<div class="clear"></div>'), i.show(e.anchor)
}

function createSimpleTooltip(e) {
    "object" == typeof e && (e.hover(function(t) {
        t.preventDefault();
        var i = $(".hint");
        i.length || (i = $('<div class="hint hint-bottom"></div>'), $("body").append(i));
        var n = e.data("title");
        n && "string" != typeof e.attr("title") || (n = e.attr("title"), e.removeAttr("title"), e.data("title", n)), i.text(n);
        var a = Math.floor(e.offset().left + e.width() / 2 - i.outerWidth() / 2),
            s = "hint-bottom";
        0 > a ? (s = "hint-bottomright", a = Math.floor(e.offset().left)) : a + i.outerWidth() > $(window).width() && (s = "hint-bottomleft", a = Math.floor(e.offset().left - i.outerWidth() / 2)), i.css({
            "left": a + "px",
            "top": Math.floor(e.offset().top + e.height()) + 8 + "px"
        }), i.removeClass("hint-bottom hint-bottomleft hint-bottomright").addClass(s + " " + s + "active")
    }, function(e) {
        e.preventDefault(), $(".hint").removeClass("hint-bottomactive hint-bottomleftactive hint-bottomrightactive")
    }), e.click(function(e) {
        e.preventDefault(), $(".hint").removeClass("hint-bottomactive hint-bottomleftactive hint-bottomrightactive")
    }))
}

function isChromePackagedApp() {
    return "object" == typeof chrome && chrome.storage ? !0 : !1
}

function scrollToTop() {
    $(window).scrollTop(0)
}

function setSetting(e, t) {
    if (isChromePackagedApp()) {
        var i = {};
        i[e] = t, chrome.storage.local.set(i)
    } else Modernizr.localstorage && localStorage.setItem(e, t)
}

function getSetting(e, t) {
    if (isChromePackagedApp()) chrome.storage.local.get(e, t);
    else if (Modernizr.localstorage) {
        var i = localStorage[e],
            n = {};
        n[e] = i, t(n)
    } else t({})
}

function removeSetting(e) {
    isChromePackagedApp() ? chrome.storage.local.remove(e) : Modernizr.localstorage && localStorage.removeItem(e)
}

function relativeDateString(e, t) {
    e.getTime || (e = new Date(e));
    var i = 1,
        n = 60 * i,
        a = 60 * n,
        s = 24 * a,
        o = new Date,
        r = (e.getTime() - o.getTime()) / 1e3 * -1,
        l = {};
    l.day = Math.floor(r / s), l.hour = Math.floor((r - l.day * s) / a), l.minute = Math.floor((r - l.day * s - l.hour * a) / n);
    var c;
    return c = 0 > r ? "" : 1 * n > r ? Templating.callTrans("queue.justnow") : 2 * n > r ? Templating.callTrans("queue.minago", null, null, "1") : 45 * n > r ? Templating.callTrans("queue.minsago", null, null, l.minute) : 120 * n > r ? Templating.callTrans("queue.hourago", null, null, "1") : 24 * a > r ? Templating.callTrans("queue.hoursago", null, null, l.hour) : 48 * a > r ? Templating.callTrans("queue.dayago", null, null, "1") : 7 * s > r ? Templating.callTrans("queue.daysago", null, null, l.day) : (t ? "on " : "") + moment(e).lang(ServerSettings.language).format("LL")
}

function createCookie(e, t, i) {
    if (i) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
        var a = "; expires=" + n.toGMTString()
    } else var a = "";
    document.cookie = e + "=" + t + a + "; path=/"
}

function readCookie(e) {
    for (var t = e + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
        for (var a = i[n];
            " " == a.charAt(0);) a = a.substring(1, a.length);
        if (0 == a.indexOf(t)) return a.substring(t.length, a.length)
    }
    return null
}

function tagEntities(e) {
    return String(e).replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function elementInViewport(e) {
    var t = e.getBoundingClientRect();
    return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth)
}

function elementCloseInViewport(e) {
    var t = e.getBoundingClientRect();
    return t.top >= 0 && t.left >= 0 && t.top - 300 <= (window.innerHeight || document.documentElement.clientHeight) && t.left <= (window.innerWidth || document.documentElement.clientWidth)
}

function isInternetExplorer() {
    var e = -1;
    if ("Microsoft Internet Explorer" == navigator.appName) {
        var t = navigator.userAgent,
            i = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        null != i.exec(t) && (e = parseFloat(RegExp.$1))
    }
    return e > -1
}

function htmlEntities(e) {
    return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

function sanitizeText(e) {
    var t = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };
    return "string" != typeof e ? "" : String(e).replace(/[&<>"']/g, function(e) {
        return t[e]
    })
}

function desanitizeText(e) {
    var t = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
    };
    return "string" != typeof e ? "" : String(e).replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, function(e) {
        return t[e]
    })
}

function domainForURL(e) {
    var t = /\/\/([^\/]*)/.exec(e);
    return t ? t[1].replace(/^www\./, "") : !1
}

function urlWithPocketRedirect(e) {
    return "http://getpocket.com/redirect?url=" + encodeURIComponent(e)
}

function getImageCacheUrl(e, t, i, n) {
    if (e && (vars = i ? "f=" + i : "", parts = parseUri(e), "http" == parts.protocol || "https" == parts.protocol)) {
        var a = /\.(jpg|gif|jpeg|png|ico)$/i.exec(parts.file),
            s = a ? a[1] : !1;
        s || (s = "jpg", vars += "&ne=1");
        var o = "";
        parts.query && (o = "/QS/" + encodeURIComponent(encodeURIComponent(parts.query)) + "/EQS");
        var r = "";
        return t && (r = "/RS/" + t), "https" == parts.protocol && (vars || (vars = ""), vars += "&ssl=1"), n && (vars += "&lq=1"), e = "https://img.readitlater.com/i/" + parts.host + parts.directory + parts.file.replace("." + s, "") + o + r + (o && !r ? "/image" : "") + "." + s + (vars ? "?" + vars : "")
    }
}

function listenForFirefoxButtonSave(e) {
    var t = "ffbs",
        i = prefs.readCookie(t);
    prefs.createCookie(listenerOnCookieName, 1, 1 / 24 / 60 * 10), ffbtnto = setInterval(function() {
        var n = prefs.readCookie(t);
        n != i && (e(), i = n)
    }, 500), setTimeout(function() {
        ffbtnto && cancelFirefoxButtonListener()
    }, 6e5)
}

function cancelFirefoxButtonListener() {
    prefs.eraseCookie(listenerOnCookieName), clearInterval(ffbtnto)
}

function PKTToast() {}

function Boot() {
    if (this.pages = {}, this.defaultPage = "queue", this.urlHead = "/a/", this.router = {
        "home": "queue",
        "queue": "queue",
        "favorites": "queue",
        "archive": "queue",
        "options": "options",
        "read": "reader"
    }, this.GSFStatus = {}, "object" == typeof ServerSettings && "string" == typeof ServerSettings.GSFStatus && ServerSettings.GSFStatus.length && (this.GSFStatus = JSON.parse(ServerSettings.GSFStatus)), this.ExternalUserSettings = {}, "object" == typeof ServerSettings && "string" == typeof ServerSettings.externalUserSettings && ServerSettings.externalUserSettings.length) try {
        this.ExternalUserSettings = JSON.parse(ServerSettings.externalUserSettings)
    } catch (e) {
        var t = ServerSettings.externalUserSettings.match(/"recentlyaccessedtags":(\[.*?"\])/);
        if (null !== t && t.length > 1) {
            var i = t[1];
            i = i.replace(/\"/g, '\\"').replace(/\[\\\"/g, '["').replace(/\\\"\]/g, '"]').replace(/,\\"/g, ',"').replace(/\\",/g, '",'), ServerSettings.externalUserSettings = ServerSettings.externalUserSettings.replace(/"recentlyaccessedtags":(\[.*?"\])/, '"recentlyaccessedtags":' + i)
        }
        this.ExternalUserSettings = JSON.parse(ServerSettings.externalUserSettings)
    }
    this.skin = "light", this.USERS_META_WEB_GSF_SETTINGS = 45, this.USERS_META_WEB_DISPLAY_SETTINGS = 46, this.USERS_META_WEB_BETA_STATUS = 61, this.USERS_META_MARKETING_OPTOUT = 22, this.data = new DataAdapter, this.loadedQueue = !1
}

function Reader() {
    this.topY = 120, this.nav = "reader", this.styleMenu = !1;
    var e = navigator.userAgent,
        t = e.match(/Firefox/) || e.match(/IE/);
    this.yHitMethod = t ? "screen" : "page", this.pendingPosition = void 0, this.ie9OrLower = $(".lt-ie10").length ? !0 : !1, this.scrollDelta = 10, this.lastScrollTop = 0, this.loading = !1, this.navHeight = 0, this.windowHeight = 0, this.headerBottom = null, this.toolbarShowingExtras = !1, this.BREAK_ITEM_SHOWTOOLBARTITLE = 928
}

function idToSelector(e) {
    return "#" + e
}

function classToSelector(e) {
    return "." + e
}

function TagSidebar() {
    this.created = !1, this.loadedTags = !1, this.selectedTag, this.rows = {}, this.tags = [], this.deleteClickedFlag = !1, this.scrollKit = {
        "pinnedDirection": 0,
        "lastScrollY": $(window).scrollTop()
    }, this.contentDiv, this.wrapper, this.layoutInfoCache = {
        "headersHeight": 0,
        "footersHeight": 0
    }, this.isHorizontallyOffset = !1
}

function Queue() {
    this.nav = "queue", this.defaultSection = "Queue", this.defaultView = "grid", this.css = [], this.scripts = [], this.location = 0, this.pageSize = 30, this.remaining = !0, this.offset = 0, this.data = new QueueData, this.lastScrollTop = 0, this.items = [], this.itemsByID = {}, this.sortingByNewestToOldest = !1, this.initialView = !0, this.itemHighlight = null, this.syncedSince = null, this.bulkEditMode = !1, this.topicDetail = {}, this.topicDetailActive = !1, this.recentSearches = [], this.gsfArticles = {}, this.tilesPerRow = 1, this.toolbarQueueExpanded = !1, this.THUMB_VARIANT_EMPTY = 0, this.THUMB_VARIANT_TITLEONLY = 1, this.THUMB_VARIANT_DEFAULT = 2, this.THUMB_VARIANT_LISTDEFAULT = 3, this.THUMB_VARIANT_LISTEMPTY = 4, this.ITEM_MARGIN = 10, this.ITEM_GRID_HEIGHT = 280, this.BREAK_ITEM_HEADER_WIDE = 608, this.BREAK_ITEM_LIST_WIDE = 640, this.BREAK_ITEM_LIST_WIDECOLUMNS = 800, this.BREAK_ITEM_POPUP_WIDE = 480, this.BREAK_ITEM_COLUMNS_TWO = 528, this.BREAK_ITEM_COLUMNS_THREE = 800, this.BREAK_ITEM_COLUMNS_FOUR = 1296, this.BREAK_ITEM_SIDENAV = 1040, this.BREAK_ITEM_MAXWIDTH = 1600
}

function listAuthors(e) {
    if (!e) return "";
    var t = "";
    for (authorId in e) t += '<span class="author">' + cleanAuthorName(e[authorId].name) + "</span>, ";
    return t.replace(/, $/, "")
}

function listTags(e, t, i, n) {
    if (!e) return "";
    var a = "",
        s = [];
    if (t)
        for (tagId in e) {
            var o = sanitizeText(e[tagId]),
                r = "tag";
            n && o == n && (r = "tag tag-search-match"), -1 == $.inArray(o, s) && (a += '<a class="' + r + '" href="' + queue.baseTagUrlPrefix + encodeURIComponent(o) + '">' + o + "</a>", i || (a += ", "), s.push(o))
        } else
            for (tagId in e) {
                var o = sanitizeText(e[tagId].tag);
                if ($.trim(o).length) {
                    var r = "tag";
                    n && o == n && (r = "tag tag-search-match"), -1 == $.inArray(o, s) && (n && o == n ? a = '<a class="' + r + '" href="' + queue.baseTagUrlPrefix + encodeURIComponent(o) + '">' + o + "</a>" + a : a += '<a class="' + r + '" href="' + queue.baseTagUrlPrefix + encodeURIComponent(o) + '">' + o + "</a>", i || (a += ", "), s.push(o))
                }
            }
    return a.replace(/, $/, "")
}

function cleanAuthorName(e) {
    return (e.match(/^[A-Z\s\'\-]{1,}/) || e.match(/^[a-z\s\'\-]{1,}$/)) && (e = ucwords(e.toLowerCase())), e
}

function ucwords(e) {
    return (e + "").replace(/^([a-z])|\s+([a-z])/g, function(e) {
        return e.toUpperCase()
    })
}

function faviconForUrl(e) {
    return getImageCacheUrl("http://" + e + "/favicon.ico", !1, "fi")
}

function imageWouldFitIn(e, t, i) {
    return e.width >= t && t * e.height / e.width >= i
}

function getSize(e, t) {
    return t ? {
        "width": e.outerWidth(),
        "height": e.outerHeight()
    } : {
        "width": e.width(),
        "height": e.height()
    }
}

function snapToLineAndMaxHeight(e, t, i) {
    var n = Math.floor(i / t);
    e.css("height", n * t + "px")
}

function sortBySortId(e, t) {
    return e.sort_id < t.sort_id ? -1 : e.sort_id > t.sort_id ? 1 : 0
}

function sortByTimeAddedNewest(e, t) {
    return parseInt(t.time_added) - parseInt(e.time_added)
}

function sortByTimeAddedOldest(e, t) {
    return parseInt(e.time_added) - parseInt(t.time_added)
}

function sortByTitle(e, t) {
    return e.resolved_title.localCompare(t.resolved_title)
}

function sortBySite(e, t) {
    return e.resolved_url.localCompare(t.resolved_url)
}

function tilesPerRow(e) {
    e || (e = $(window).width());
    var t = 1;
    return "grid" == queue.selectedView && e >= queue.BREAK_ITEM_COLUMNS_TWO && (e >= queue.BREAK_ITEM_COLUMNS_TWO && (t = 2), e >= queue.BREAK_ITEM_COLUMNS_THREE && (t = 3), e >= queue.BREAK_ITEM_COLUMNS_FOUR && (t = 4)), t
}! function(e, t) {
    function i(e) {
        var t = e.length,
            i = ue.type(e);
        return ue.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === i || "function" !== i && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function n(e) {
        var t = xe[e] = {};
        return ue.each(e.match(he) || [], function(e, i) {
            t[i] = !0
        }), t
    }

    function a(e, i, n, a) {
        if (ue.acceptData(e)) {
            var s, o, r = ue.expando,
                l = e.nodeType,
                c = l ? ue.cache : e,
                u = l ? e[r] : e[r] && r;
            if (u && c[u] && (a || c[u].data) || n !== t || "string" != typeof i) return u || (u = l ? e[r] = te.pop() || ue.guid++ : r), c[u] || (c[u] = l ? {} : {
                "toJSON": ue.noop
            }), ("object" == typeof i || "function" == typeof i) && (a ? c[u] = ue.extend(c[u], i) : c[u].data = ue.extend(c[u].data, i)), o = c[u], a || (o.data || (o.data = {}), o = o.data), n !== t && (o[ue.camelCase(i)] = n), "string" == typeof i ? (s = o[i], null == s && (s = o[ue.camelCase(i)])) : s = o, s
        }
    }

    function s(e, t, i) {
        if (ue.acceptData(e)) {
            var n, a, s = e.nodeType,
                o = s ? ue.cache : e,
                l = s ? e[ue.expando] : ue.expando;
            if (o[l]) {
                if (t && (n = i ? o[l] : o[l].data)) {
                    ue.isArray(t) ? t = t.concat(ue.map(t, ue.camelCase)) : t in n ? t = [t] : (t = ue.camelCase(t), t = t in n ? [t] : t.split(" ")), a = t.length;
                    for (; a--;) delete n[t[a]];
                    if (i ? !r(n) : !ue.isEmptyObject(n)) return
                }(i || (delete o[l].data, r(o[l]))) && (s ? ue.cleanData([e], !0) : ue.support.deleteExpando || o != o.window ? delete o[l] : o[l] = null)
            }
        }
    }

    function o(e, i, n) {
        if (n === t && 1 === e.nodeType) {
            var a = "data-" + i.replace($e, "-$1").toLowerCase();
            if (n = e.getAttribute(a), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Ce.test(n) ? ue.parseJSON(n) : n
                } catch (s) {}
                ue.data(e, i, n)
            } else n = t
        }
        return n
    }

    function r(e) {
        var t;
        for (t in e)
            if (("data" !== t || !ue.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function l() {
        return !0
    }

    function c() {
        return !1
    }

    function u() {
        try {
            return K.activeElement
        } catch (e) {}
    }

    function d(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function h(e, t, i) {
        if (ue.isFunction(t)) return ue.grep(e, function(e, n) {
            return !!t.call(e, n, e) !== i
        });
        if (t.nodeType) return ue.grep(e, function(e) {
            return e === t !== i
        });
        if ("string" == typeof t) {
            if (Ge.test(t)) return ue.filter(t, e, i);
            t = ue.filter(t, e)
        }
        return ue.grep(e, function(e) {
            return ue.inArray(e, t) >= 0 !== i
        })
    }

    function p(e) {
        var t = Be.split("|"),
            i = e.createDocumentFragment();
        if (i.createElement)
            for (; t.length;) i.createElement(t.pop());
        return i
    }

    function f(e, t) {
        return ue.nodeName(e, "table") && ue.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function g(e) {
        return e.type = (null !== ue.find.attr(e, "type")) + "/" + e.type, e
    }

    function m(e) {
        var t = at.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function v(e, t) {
        for (var i, n = 0; null != (i = e[n]); n++) ue._data(i, "globalEval", !t || ue._data(t[n], "globalEval"))
    }

    function _(e, t) {
        if (1 === t.nodeType && ue.hasData(e)) {
            var i, n, a, s = ue._data(e),
                o = ue._data(t, s),
                r = s.events;
            if (r) {
                delete o.handle, o.events = {};
                for (i in r)
                    for (n = 0, a = r[i].length; a > n; n++) ue.event.add(t, i, r[i][n])
            }
            o.data && (o.data = ue.extend({}, o.data))
        }
    }

    function b(e, t) {
        var i, n, a;
        if (1 === t.nodeType) {
            if (i = t.nodeName.toLowerCase(), !ue.support.noCloneEvent && t[ue.expando]) {
                a = ue._data(t);
                for (n in a.events) ue.removeEvent(t, n, a.handle);
                t.removeAttribute(ue.expando)
            }
            "script" === i && t.text !== e.text ? (g(t).text = e.text, m(t)) : "object" === i ? (t.parentNode && (t.outerHTML = e.outerHTML), ue.support.html5Clone && e.innerHTML && !ue.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === i && tt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === i ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === i || "textarea" === i) && (t.defaultValue = e.defaultValue)
        }
    }

    function y(e, i) {
        var n, a, s = 0,
            o = typeof e.getElementsByTagName !== J ? e.getElementsByTagName(i || "*") : typeof e.querySelectorAll !== J ? e.querySelectorAll(i || "*") : t;
        if (!o)
            for (o = [], n = e.childNodes || e; null != (a = n[s]); s++)!i || ue.nodeName(a, i) ? o.push(a) : ue.merge(o, y(a, i));
        return i === t || i && ue.nodeName(e, i) ? ue.merge([e], o) : o
    }

    function S(e) {
        tt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function w(e, t) {
        if (t in e) return t;
        for (var i = t.charAt(0).toUpperCase() + t.slice(1), n = t, a = kt.length; a--;)
            if (t = kt[a] + i, t in e) return t;
        return n
    }

    function T(e, t) {
        return e = t || e, "none" === ue.css(e, "display") || !ue.contains(e.ownerDocument, e)
    }

    function k(e, t) {
        for (var i, n, a, s = [], o = 0, r = e.length; r > o; o++) n = e[o], n.style && (s[o] = ue._data(n, "olddisplay"), i = n.style.display, t ? (s[o] || "none" !== i || (n.style.display = ""), "" === n.style.display && T(n) && (s[o] = ue._data(n, "olddisplay", E(n.nodeName)))) : s[o] || (a = T(n), (i && "none" !== i || !a) && ue._data(n, "olddisplay", a ? i : ue.css(n, "display"))));
        for (o = 0; r > o; o++) n = e[o], n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? s[o] || "" : "none"));
        return e
    }

    function x(e, t, i) {
        var n = vt.exec(t);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : t
    }

    function C(e, t, i, n, a) {
        for (var s = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > s; s += 2) "margin" === i && (o += ue.css(e, i + Tt[s], !0, a)), n ? ("content" === i && (o -= ue.css(e, "padding" + Tt[s], !0, a)), "margin" !== i && (o -= ue.css(e, "border" + Tt[s] + "Width", !0, a))) : (o += ue.css(e, "padding" + Tt[s], !0, a), "padding" !== i && (o += ue.css(e, "border" + Tt[s] + "Width", !0, a)));
        return o
    }

    function $(e, t, i) {
        var n = !0,
            a = "width" === t ? e.offsetWidth : e.offsetHeight,
            s = ut(e),
            o = ue.support.boxSizing && "border-box" === ue.css(e, "boxSizing", !1, s);
        if (0 >= a || null == a) {
            if (a = dt(e, t, s), (0 > a || null == a) && (a = e.style[t]), _t.test(a)) return a;
            n = o && (ue.support.boxSizingReliable || a === e.style[t]), a = parseFloat(a) || 0
        }
        return a + C(e, t, i || (o ? "border" : "content"), n, s) + "px"
    }

    function E(e) {
        var t = K,
            i = yt[e];
        return i || (i = M(e, t), "none" !== i && i || (ct = (ct || ue("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (ct[0].contentWindow || ct[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), i = M(e, t), ct.detach()), yt[e] = i), i
    }

    function M(e, t) {
        var i = ue(t.createElement(e)).appendTo(t.body),
            n = ue.css(i[0], "display");
        return i.remove(), n
    }

    function D(e, t, i, n) {
        var a;
        if (ue.isArray(t)) ue.each(t, function(t, a) {
            i || Ct.test(e) ? n(e, a) : D(e + "[" + ("object" == typeof a ? t : "") + "]", a, i, n)
        });
        else if (i || "object" !== ue.type(t)) n(e, t);
        else
            for (a in t) D(e + "[" + a + "]", t[a], i, n)
    }

    function I(e) {
        return function(t, i) {
            "string" != typeof t && (i = t, t = "*");
            var n, a = 0,
                s = t.toLowerCase().match(he) || [];
            if (ue.isFunction(i))
                for (; n = s[a++];) "+" === n[0] ? (n = n.slice(1) || "*", (e[n] = e[n] || []).unshift(i)) : (e[n] = e[n] || []).push(i)
        }
    }

    function L(e, t, i, n) {
        function a(r) {
            var l;
            return s[r] = !0, ue.each(e[r] || [], function(e, r) {
                var c = r(t, i, n);
                return "string" != typeof c || o || s[c] ? o ? !(l = c) : void 0 : (t.dataTypes.unshift(c), a(c), !1)
            }), l
        }
        var s = {}, o = e === zt;
        return a(t.dataTypes[0]) || !s["*"] && a("*")
    }

    function A(e, i) {
        var n, a, s = ue.ajaxSettings.flatOptions || {};
        for (a in i) i[a] !== t && ((s[a] ? e : n || (n = {}))[a] = i[a]);
        return n && ue.extend(!0, e, n), e
    }

    function q(e, i, n) {
        for (var a, s, o, r, l = e.contents, c = e.dataTypes;
            "*" === c[0];) c.shift(), s === t && (s = e.mimeType || i.getResponseHeader("Content-Type"));
        if (s)
            for (r in l)
                if (l[r] && l[r].test(s)) {
                    c.unshift(r);
                    break
                }
        if (c[0] in n) o = c[0];
        else {
            for (r in n) {
                if (!c[0] || e.converters[r + " " + c[0]]) {
                    o = r;
                    break
                }
                a || (a = r)
            }
            o = o || a
        }
        return o ? (o !== c[0] && c.unshift(o), n[o]) : void 0
    }

    function P(e, t, i, n) {
        var a, s, o, r, l, c = {}, u = e.dataTypes.slice();
        if (u[1])
            for (o in e.converters) c[o.toLowerCase()] = e.converters[o];
        for (s = u.shift(); s;)
            if (e.responseFields[s] && (i[e.responseFields[s]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = s, s = u.shift())
                if ("*" === s) s = l;
                else if ("*" !== l && l !== s) {
            if (o = c[l + " " + s] || c["* " + s], !o)
                for (a in c)
                    if (r = a.split(" "), r[1] === s && (o = c[l + " " + r[0]] || c["* " + r[0]])) {
                        o === !0 ? o = c[a] : c[a] !== !0 && (s = r[0], u.unshift(r[1]));
                        break
                    }
            if (o !== !0)
                if (o && e["throws"]) t = o(t);
                else try {
                    t = o(t)
                } catch (d) {
                    return {
                        "state": "parsererror",
                        "error": o ? d : "No conversion from " + l + " to " + s
                    }
                }
        }
        return {
            "state": "success",
            "data": t
        }
    }

    function F() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function O() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function N() {
        return setTimeout(function() {
            Qt = t
        }), Qt = ue.now()
    }

    function H(e, t, i) {
        for (var n, a = (ai[t] || []).concat(ai["*"]), s = 0, o = a.length; o > s; s++)
            if (n = a[s].call(i, t, e)) return n
    }

    function U(e, t, i) {
        var n, a, s = 0,
            o = ni.length,
            r = ue.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (a) return !1;
                for (var t = Qt || N(), i = Math.max(0, c.startTime + c.duration - t), n = i / c.duration || 0, s = 1 - n, o = 0, l = c.tweens.length; l > o; o++) c.tweens[o].run(s);
                return r.notifyWith(e, [c, s, i]), 1 > s && l ? i : (r.resolveWith(e, [c]), !1)
            }, c = r.promise({
                "elem": e,
                "props": ue.extend({}, t),
                "opts": ue.extend(!0, {
                    "specialEasing": {}
                }, i),
                "originalProperties": t,
                "originalOptions": i,
                "startTime": Qt || N(),
                "duration": i.duration,
                "tweens": [],
                "createTween": function(t, i) {
                    var n = ue.Tween(e, c.opts, t, i, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(n), n
                },
                "stop": function(t) {
                    var i = 0,
                        n = t ? c.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; n > i; i++) c.tweens[i].run(1);
                    return t ? r.resolveWith(e, [c, t]) : r.rejectWith(e, [c, t]), this
                }
            }),
            u = c.props;
        for (j(u, c.opts.specialEasing); o > s; s++)
            if (n = ni[s].call(c, e, u, c.opts)) return n;
        return ue.map(u, H, c), ue.isFunction(c.opts.start) && c.opts.start.call(e, c), ue.fx.timer(ue.extend(l, {
            "elem": e,
            "anim": c,
            "queue": c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function j(e, t) {
        var i, n, a, s, o;
        for (i in e)
            if (n = ue.camelCase(i), a = t[n], s = e[i], ue.isArray(s) && (a = s[1], s = e[i] = s[0]), i !== n && (e[n] = s, delete e[i]), o = ue.cssHooks[n], o && "expand" in o) {
                s = o.expand(s), delete e[n];
                for (i in s) i in e || (e[i] = s[i], t[i] = a)
            } else t[n] = a
    }

    function G(e, t, i) {
        var n, a, s, o, r, l, c = this,
            u = {}, d = e.style,
            h = e.nodeType && T(e),
            p = ue._data(e, "fxshow");
        i.queue || (r = ue._queueHooks(e, "fx"), null == r.unqueued && (r.unqueued = 0, l = r.empty.fire, r.empty.fire = function() {
            r.unqueued || l()
        }), r.unqueued++, c.always(function() {
            c.always(function() {
                r.unqueued--, ue.queue(e, "fx").length || r.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (i.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === ue.css(e, "display") && "none" === ue.css(e, "float") && (ue.support.inlineBlockNeedsLayout && "inline" !== E(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), i.overflow && (d.overflow = "hidden", ue.support.shrinkWrapBlocks || c.always(function() {
            d.overflow = i.overflow[0], d.overflowX = i.overflow[1], d.overflowY = i.overflow[2]
        }));
        for (n in t)
            if (a = t[n], ei.exec(a)) {
                if (delete t[n], s = s || "toggle" === a, a === (h ? "hide" : "show")) continue;
                u[n] = p && p[n] || ue.style(e, n)
            }
        if (!ue.isEmptyObject(u)) {
            p ? "hidden" in p && (h = p.hidden) : p = ue._data(e, "fxshow", {}), s && (p.hidden = !h), h ? ue(e).show() : c.done(function() {
                ue(e).hide()
            }), c.done(function() {
                var t;
                ue._removeData(e, "fxshow");
                for (t in u) ue.style(e, t, u[t])
            });
            for (n in u) o = H(h ? p[n] : 0, n, c), n in p || (p[n] = o.start, h && (o.end = o.start, o.start = "width" === n || "height" === n ? 1 : 0))
        }
    }

    function z(e, t, i, n, a) {
        return new z.prototype.init(e, t, i, n, a)
    }

    function Y(e, t) {
        var i, n = {
                "height": e
            }, a = 0;
        for (t = t ? 1 : 0; 4 > a; a += 2 - t) i = Tt[a], n["margin" + i] = n["padding" + i] = e;
        return t && (n.opacity = n.width = e), n
    }

    function R(e) {
        return ue.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var B, W, J = typeof t,
        V = e.location,
        K = e.document,
        X = K.documentElement,
        Q = e.jQuery,
        Z = e.$,
        ee = {}, te = [],
        ie = "1.10.2",
        ne = te.concat,
        ae = te.push,
        se = te.slice,
        oe = te.indexOf,
        re = ee.toString,
        le = ee.hasOwnProperty,
        ce = ie.trim,
        ue = function(e, t) {
            return new ue.fn.init(e, t, W)
        }, de = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        he = /\S+/g,
        pe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        fe = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ge = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        me = /^[\],:{}\s]*$/,
        ve = /(?:^|:|,)(?:\s*\[)+/g,
        _e = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        be = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        ye = /^-ms-/,
        Se = /-([\da-z])/gi,
        we = function(e, t) {
            return t.toUpperCase()
        }, Te = function(e) {
            (K.addEventListener || "load" === e.type || "complete" === K.readyState) && (ke(), ue.ready())
        }, ke = function() {
            K.addEventListener ? (K.removeEventListener("DOMContentLoaded", Te, !1), e.removeEventListener("load", Te, !1)) : (K.detachEvent("onreadystatechange", Te), e.detachEvent("onload", Te))
        };
    ue.fn = ue.prototype = {
        "jquery": ie,
        "constructor": ue,
        "init": function(e, i, n) {
            var a, s;
            if (!e) return this;
            if ("string" == typeof e) {
                if (a = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : fe.exec(e), !a || !a[1] && i) return !i || i.jquery ? (i || n).find(e) : this.constructor(i).find(e);
                if (a[1]) {
                    if (i = i instanceof ue ? i[0] : i, ue.merge(this, ue.parseHTML(a[1], i && i.nodeType ? i.ownerDocument || i : K, !0)), ge.test(a[1]) && ue.isPlainObject(i))
                        for (a in i) ue.isFunction(this[a]) ? this[a](i[a]) : this.attr(a, i[a]);
                    return this
                }
                if (s = K.getElementById(a[2]), s && s.parentNode) {
                    if (s.id !== a[2]) return n.find(e);
                    this.length = 1, this[0] = s
                }
                return this.context = K, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ue.isFunction(e) ? n.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ue.makeArray(e, this))
        },
        "selector": "",
        "length": 0,
        "toArray": function() {
            return se.call(this)
        },
        "get": function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        "pushStack": function(e) {
            var t = ue.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        "each": function(e, t) {
            return ue.each(this, e, t)
        },
        "ready": function(e) {
            return ue.ready.promise().done(e), this
        },
        "slice": function() {
            return this.pushStack(se.apply(this, arguments))
        },
        "first": function() {
            return this.eq(0)
        },
        "last": function() {
            return this.eq(-1)
        },
        "eq": function(e) {
            var t = this.length,
                i = +e + (0 > e ? t : 0);
            return this.pushStack(i >= 0 && t > i ? [this[i]] : [])
        },
        "map": function(e) {
            return this.pushStack(ue.map(this, function(t, i) {
                return e.call(t, i, t)
            }))
        },
        "end": function() {
            return this.prevObject || this.constructor(null)
        },
        "push": ae,
        "sort": [].sort,
        "splice": [].splice
    }, ue.fn.init.prototype = ue.fn, ue.extend = ue.fn.extend = function() {
        var e, i, n, a, s, o, r = arguments[0] || {}, l = 1,
            c = arguments.length,
            u = !1;
        for ("boolean" == typeof r && (u = r, r = arguments[1] || {}, l = 2), "object" == typeof r || ue.isFunction(r) || (r = {}), c === l && (r = this, --l); c > l; l++)
            if (null != (s = arguments[l]))
                for (a in s) e = r[a], n = s[a], r !== n && (u && n && (ue.isPlainObject(n) || (i = ue.isArray(n))) ? (i ? (i = !1, o = e && ue.isArray(e) ? e : []) : o = e && ue.isPlainObject(e) ? e : {}, r[a] = ue.extend(u, o, n)) : n !== t && (r[a] = n));
        return r
    }, ue.extend({
        "expando": "jQuery" + (ie + Math.random()).replace(/\D/g, ""),
        "noConflict": function(t) {
            return e.$ === ue && (e.$ = Z), t && e.jQuery === ue && (e.jQuery = Q), ue
        },
        "isReady": !1,
        "readyWait": 1,
        "holdReady": function(e) {
            e ? ue.readyWait++ : ue.ready(!0)
        },
        "ready": function(e) {
            if (e === !0 ? !--ue.readyWait : !ue.isReady) {
                if (!K.body) return setTimeout(ue.ready);
                ue.isReady = !0, e !== !0 && --ue.readyWait > 0 || (B.resolveWith(K, [ue]), ue.fn.trigger && ue(K).trigger("ready").off("ready"))
            }
        },
        "isFunction": function(e) {
            return "function" === ue.type(e)
        },
        "isArray": Array.isArray || function(e) {
            return "array" === ue.type(e)
        },
        "isWindow": function(e) {
            return null != e && e == e.window
        },
        "isNumeric": function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        "type": function(e) {
            return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? ee[re.call(e)] || "object" : typeof e
        },
        "isPlainObject": function(e) {
            var i;
            if (!e || "object" !== ue.type(e) || e.nodeType || ue.isWindow(e)) return !1;
            try {
                if (e.constructor && !le.call(e, "constructor") && !le.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            if (ue.support.ownLast)
                for (i in e) return le.call(e, i);
            for (i in e);
            return i === t || le.call(e, i)
        },
        "isEmptyObject": function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        "error": function(e) {
            throw new Error(e)
        },
        "parseHTML": function(e, t, i) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (i = t, t = !1), t = t || K;
            var n = ge.exec(e),
                a = !i && [];
            return n ? [t.createElement(n[1])] : (n = ue.buildFragment([e], t, a), a && ue(a).remove(), ue.merge([], n.childNodes))
        },
        "parseJSON": function(t) {
            return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ue.trim(t), t && me.test(t.replace(_e, "@").replace(be, "]").replace(ve, ""))) ? new Function("return " + t)() : void ue.error("Invalid JSON: " + t)
        },
        "parseXML": function(i) {
            var n, a;
            if (!i || "string" != typeof i) return null;
            try {
                e.DOMParser ? (a = new DOMParser, n = a.parseFromString(i, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(i))
            } catch (s) {
                n = t
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ue.error("Invalid XML: " + i), n
        },
        "noop": function() {},
        "globalEval": function(t) {
            t && ue.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        "camelCase": function(e) {
            return e.replace(ye, "ms-").replace(Se, we)
        },
        "nodeName": function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        "each": function(e, t, n) {
            var a, s = 0,
                o = e.length,
                r = i(e);
            if (n) {
                if (r)
                    for (; o > s && (a = t.apply(e[s], n), a !== !1); s++);
                else
                    for (s in e)
                        if (a = t.apply(e[s], n), a === !1) break
            } else if (r)
                for (; o > s && (a = t.call(e[s], s, e[s]), a !== !1); s++);
            else
                for (s in e)
                    if (a = t.call(e[s], s, e[s]), a === !1) break; return e
        },
        "trim": ce && !ce.call("\ufeff ") ? function(e) {
            return null == e ? "" : ce.call(e)
        } : function(e) {
            return null == e ? "" : (e + "").replace(pe, "")
        },
        "makeArray": function(e, t) {
            var n = t || [];
            return null != e && (i(Object(e)) ? ue.merge(n, "string" == typeof e ? [e] : e) : ae.call(n, e)), n
        },
        "inArray": function(e, t, i) {
            var n;
            if (t) {
                if (oe) return oe.call(t, e, i);
                for (n = t.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                    if (i in t && t[i] === e) return i
            }
            return -1
        },
        "merge": function(e, i) {
            var n = i.length,
                a = e.length,
                s = 0;
            if ("number" == typeof n)
                for (; n > s; s++) e[a++] = i[s];
            else
                for (; i[s] !== t;) e[a++] = i[s++];
            return e.length = a, e
        },
        "grep": function(e, t, i) {
            var n, a = [],
                s = 0,
                o = e.length;
            for (i = !! i; o > s; s++) n = !! t(e[s], s), i !== n && a.push(e[s]);
            return a
        },
        "map": function(e, t, n) {
            var a, s = 0,
                o = e.length,
                r = i(e),
                l = [];
            if (r)
                for (; o > s; s++) a = t(e[s], s, n), null != a && (l[l.length] = a);
            else
                for (s in e) a = t(e[s], s, n), null != a && (l[l.length] = a);
            return ne.apply([], l)
        },
        "guid": 1,
        "proxy": function(e, i) {
            var n, a, s;
            return "string" == typeof i && (s = e[i], i = e, e = s), ue.isFunction(e) ? (n = se.call(arguments, 2), a = function() {
                    return e.apply(i || this, n.concat(se.call(arguments)))
                }, a.guid = e.guid = e.guid || ue.guid++,
                a) : t
        },
        "access": function(e, i, n, a, s, o, r) {
            var l = 0,
                c = e.length,
                u = null == n;
            if ("object" === ue.type(n)) {
                s = !0;
                for (l in n) ue.access(e, i, l, n[l], !0, o, r)
            } else if (a !== t && (s = !0, ue.isFunction(a) || (r = !0), u && (r ? (i.call(e, a), i = null) : (u = i, i = function(e, t, i) {
                return u.call(ue(e), i)
            })), i))
                for (; c > l; l++) i(e[l], n, r ? a : a.call(e[l], l, i(e[l], n)));
            return s ? e : u ? i.call(e) : c ? i(e[0], n) : o
        },
        "now": function() {
            return (new Date).getTime()
        },
        "swap": function(e, t, i, n) {
            var a, s, o = {};
            for (s in t) o[s] = e.style[s], e.style[s] = t[s];
            a = i.apply(e, n || []);
            for (s in t) e.style[s] = o[s];
            return a
        }
    }), ue.ready.promise = function(t) {
        if (!B)
            if (B = ue.Deferred(), "complete" === K.readyState) setTimeout(ue.ready);
            else if (K.addEventListener) K.addEventListener("DOMContentLoaded", Te, !1), e.addEventListener("load", Te, !1);
        else {
            K.attachEvent("onreadystatechange", Te), e.attachEvent("onload", Te);
            var i = !1;
            try {
                i = null == e.frameElement && K.documentElement
            } catch (n) {}
            i && i.doScroll && ! function a() {
                if (!ue.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (e) {
                        return setTimeout(a, 50)
                    }
                    ke(), ue.ready()
                }
            }()
        }
        return B.promise(t)
    }, ue.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        ee["[object " + t + "]"] = t.toLowerCase()
    }), W = ue(K),
    function(e, t) {
        function i(e, t, i, n) {
            var a, s, o, r, l, c, u, d, f, g;
            if ((t ? t.ownerDocument || t : U) !== L && I(t), t = t || L, i = i || [], !e || "string" != typeof e) return i;
            if (1 !== (r = t.nodeType) && 9 !== r) return [];
            if (q && !n) {
                if (a = be.exec(e))
                    if (o = a[1]) {
                        if (9 === r) {
                            if (s = t.getElementById(o), !s || !s.parentNode) return i;
                            if (s.id === o) return i.push(s), i
                        } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(o)) && N(t, s) && s.id === o) return i.push(s), i
                    } else {
                        if (a[2]) return ee.apply(i, t.getElementsByTagName(e)), i;
                        if ((o = a[3]) && T.getElementsByClassName && t.getElementsByClassName) return ee.apply(i, t.getElementsByClassName(o)), i
                    }
                if (T.qsa && (!P || !P.test(e))) {
                    if (d = u = H, f = t, g = 9 === r && e, 1 === r && "object" !== t.nodeName.toLowerCase()) {
                        for (c = h(e), (u = t.getAttribute("id")) ? d = u.replace(we, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", l = c.length; l--;) c[l] = d + p(c[l]);
                        f = pe.test(e) && t.parentNode || t, g = c.join(",")
                    }
                    if (g) try {
                        return ee.apply(i, f.querySelectorAll(g)), i
                    } catch (m) {} finally {
                        u || t.removeAttribute("id")
                    }
                }
            }
            return S(e.replace(ce, "$1"), t, i, n)
        }

        function n() {
            function e(i, n) {
                return t.push(i += " ") > x.cacheLength && delete e[t.shift()], e[i] = n
            }
            var t = [];
            return e
        }

        function a(e) {
            return e[H] = !0, e
        }

        function s(e) {
            var t = L.createElement("div");
            try {
                return !!e(t)
            } catch (i) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var i = e.split("|"), n = e.length; n--;) x.attrHandle[i[n]] = t
        }

        function r(e, t) {
            var i = t && e,
                n = i && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (n) return n;
            if (i)
                for (; i = i.nextSibling;)
                    if (i === t) return -1;
            return e ? 1 : -1
        }

        function l(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return "input" === i && t.type === e
            }
        }

        function c(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === e
            }
        }

        function u(e) {
            return a(function(t) {
                return t = +t, a(function(i, n) {
                    for (var a, s = e([], i.length, t), o = s.length; o--;) i[a = s[o]] && (i[a] = !(n[a] = i[a]))
                })
            })
        }

        function d() {}

        function h(e, t) {
            var n, a, s, o, r, l, c, u = Y[e + " "];
            if (u) return t ? 0 : u.slice(0);
            for (r = e, l = [], c = x.preFilter; r;) {
                (!n || (a = de.exec(r))) && (a && (r = r.slice(a[0].length) || r), l.push(s = [])), n = !1, (a = he.exec(r)) && (n = a.shift(), s.push({
                    "value": n,
                    "type": a[0].replace(ce, " ")
                }), r = r.slice(n.length));
                for (o in x.filter)!(a = ve[o].exec(r)) || c[o] && !(a = c[o](a)) || (n = a.shift(), s.push({
                    "value": n,
                    "type": o,
                    "matches": a
                }), r = r.slice(n.length));
                if (!n) break
            }
            return t ? r.length : r ? i.error(e) : Y(e, l).slice(0)
        }

        function p(e) {
            for (var t = 0, i = e.length, n = ""; i > t; t++) n += e[t].value;
            return n
        }

        function f(e, t, i) {
            var n = t.dir,
                a = i && "parentNode" === n,
                s = G++;
            return t.first ? function(t, i, s) {
                for (; t = t[n];)
                    if (1 === t.nodeType || a) return e(t, i, s)
            } : function(t, i, o) {
                var r, l, c, u = j + " " + s;
                if (o) {
                    for (; t = t[n];)
                        if ((1 === t.nodeType || a) && e(t, i, o)) return !0
                } else
                    for (; t = t[n];)
                        if (1 === t.nodeType || a)
                            if (c = t[H] || (t[H] = {}), (l = c[n]) && l[0] === u) {
                                if ((r = l[1]) === !0 || r === k) return r === !0
                            } else if (l = c[n] = [u], l[1] = e(t, i, o) || k, l[1] === !0) return !0
            }
        }

        function g(e) {
            return e.length > 1 ? function(t, i, n) {
                for (var a = e.length; a--;)
                    if (!e[a](t, i, n)) return !1;
                return !0
            } : e[0]
        }

        function m(e, t, i, n, a) {
            for (var s, o = [], r = 0, l = e.length, c = null != t; l > r; r++)(s = e[r]) && (!i || i(s, n, a)) && (o.push(s), c && t.push(r));
            return o
        }

        function v(e, t, i, n, s, o) {
            return n && !n[H] && (n = v(n)), s && !s[H] && (s = v(s, o)), a(function(a, o, r, l) {
                var c, u, d, h = [],
                    p = [],
                    f = o.length,
                    g = a || y(t || "*", r.nodeType ? [r] : r, []),
                    v = !e || !a && t ? g : m(g, h, e, r, l),
                    _ = i ? s || (a ? e : f || n) ? [] : o : v;
                if (i && i(v, _, r, l), n)
                    for (c = m(_, p), n(c, [], r, l), u = c.length; u--;)(d = c[u]) && (_[p[u]] = !(v[p[u]] = d));
                if (a) {
                    if (s || e) {
                        if (s) {
                            for (c = [], u = _.length; u--;)(d = _[u]) && c.push(v[u] = d);
                            s(null, _ = [], c, l)
                        }
                        for (u = _.length; u--;)(d = _[u]) && (c = s ? ie.call(a, d) : h[u]) > -1 && (a[c] = !(o[c] = d))
                    }
                } else _ = m(_ === o ? _.splice(f, _.length) : _), s ? s(null, o, _, l) : ee.apply(o, _)
            })
        }

        function _(e) {
            for (var t, i, n, a = e.length, s = x.relative[e[0].type], o = s || x.relative[" "], r = s ? 1 : 0, l = f(function(e) {
                    return e === t
                }, o, !0), c = f(function(e) {
                    return ie.call(t, e) > -1
                }, o, !0), u = [
                    function(e, i, n) {
                        return !s && (n || i !== M) || ((t = i).nodeType ? l(e, i, n) : c(e, i, n))
                    }
                ]; a > r; r++)
                if (i = x.relative[e[r].type]) u = [f(g(u), i)];
                else {
                    if (i = x.filter[e[r].type].apply(null, e[r].matches), i[H]) {
                        for (n = ++r; a > n && !x.relative[e[n].type]; n++);
                        return v(r > 1 && g(u), r > 1 && p(e.slice(0, r - 1).concat({
                            "value": " " === e[r - 2].type ? "*" : ""
                        })).replace(ce, "$1"), i, n > r && _(e.slice(r, n)), a > n && _(e = e.slice(n)), a > n && p(e))
                    }
                    u.push(i)
                }
            return g(u)
        }

        function b(e, t) {
            var n = 0,
                s = t.length > 0,
                o = e.length > 0,
                r = function(a, r, l, c, u) {
                    var d, h, p, f = [],
                        g = 0,
                        v = "0",
                        _ = a && [],
                        b = null != u,
                        y = M,
                        S = a || o && x.find.TAG("*", u && r.parentNode || r),
                        w = j += null == y ? 1 : Math.random() || .1;
                    for (b && (M = r !== L && r, k = n); null != (d = S[v]); v++) {
                        if (o && d) {
                            for (h = 0; p = e[h++];)
                                if (p(d, r, l)) {
                                    c.push(d);
                                    break
                                }
                            b && (j = w, k = ++n)
                        }
                        s && ((d = !p && d) && g--, a && _.push(d))
                    }
                    if (g += v, s && v !== g) {
                        for (h = 0; p = t[h++];) p(_, f, r, l);
                        if (a) {
                            if (g > 0)
                                for (; v--;) _[v] || f[v] || (f[v] = Q.call(c));
                            f = m(f)
                        }
                        ee.apply(c, f), b && !a && f.length > 0 && g + t.length > 1 && i.uniqueSort(c)
                    }
                    return b && (j = w, M = y), _
                };
            return s ? a(r) : r
        }

        function y(e, t, n) {
            for (var a = 0, s = t.length; s > a; a++) i(e, t[a], n);
            return n
        }

        function S(e, t, i, n) {
            var a, s, o, r, l, c = h(e);
            if (!n && 1 === c.length) {
                if (s = c[0] = c[0].slice(0), s.length > 2 && "ID" === (o = s[0]).type && T.getById && 9 === t.nodeType && q && x.relative[s[1].type]) {
                    if (t = (x.find.ID(o.matches[0].replace(Te, ke), t) || [])[0], !t) return i;
                    e = e.slice(s.shift().value.length)
                }
                for (a = ve.needsContext.test(e) ? 0 : s.length; a-- && (o = s[a], !x.relative[r = o.type]);)
                    if ((l = x.find[r]) && (n = l(o.matches[0].replace(Te, ke), pe.test(s[0].type) && t.parentNode || t))) {
                        if (s.splice(a, 1), e = n.length && p(s), !e) return ee.apply(i, n), i;
                        break
                    }
            }
            return E(e, c)(n, t, !q, i, pe.test(e)), i
        }
        var w, T, k, x, C, $, E, M, D, I, L, A, q, P, F, O, N, H = "sizzle" + -new Date,
            U = e.document,
            j = 0,
            G = 0,
            z = n(),
            Y = n(),
            R = n(),
            B = !1,
            W = function(e, t) {
                return e === t ? (B = !0, 0) : 0
            }, J = typeof t,
            V = 1 << 31,
            K = {}.hasOwnProperty,
            X = [],
            Q = X.pop,
            Z = X.push,
            ee = X.push,
            te = X.slice,
            ie = X.indexOf || function(e) {
                for (var t = 0, i = this.length; i > t; t++)
                    if (this[t] === e) return t;
                return -1
            }, ne = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ae = "[\\x20\\t\\r\\n\\f]",
            se = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            oe = se.replace("w", "w#"),
            re = "\\[" + ae + "*(" + se + ")" + ae + "*(?:([*^$|!~]?=)" + ae + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + oe + ")|)|)" + ae + "*\\]",
            le = ":(" + se + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + re.replace(3, 8) + ")*)|.*)\\)|)",
            ce = new RegExp("^" + ae + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ae + "+$", "g"),
            de = new RegExp("^" + ae + "*," + ae + "*"),
            he = new RegExp("^" + ae + "*([>+~]|" + ae + ")" + ae + "*"),
            pe = new RegExp(ae + "*[+~]"),
            fe = new RegExp("=" + ae + "*([^\\]'\"]*)" + ae + "*\\]", "g"),
            ge = new RegExp(le),
            me = new RegExp("^" + oe + "$"),
            ve = {
                "ID": new RegExp("^#(" + se + ")"),
                "CLASS": new RegExp("^\\.(" + se + ")"),
                "TAG": new RegExp("^(" + se.replace("w", "w*") + ")"),
                "ATTR": new RegExp("^" + re),
                "PSEUDO": new RegExp("^" + le),
                "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ae + "*(even|odd|(([+-]|)(\\d*)n|)" + ae + "*(?:([+-]|)" + ae + "*(\\d+)|))" + ae + "*\\)|)", "i"),
                "bool": new RegExp("^(?:" + ne + ")$", "i"),
                "needsContext": new RegExp("^" + ae + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ae + "*((?:-\\d)?\\d*)" + ae + "*\\)|)(?=[^-]|$)", "i")
            }, _e = /^[^{]+\{\s*\[native \w/,
            be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ye = /^(?:input|select|textarea|button)$/i,
            Se = /^h\d$/i,
            we = /'|\\/g,
            Te = new RegExp("\\\\([\\da-f]{1,6}" + ae + "?|(" + ae + ")|.)", "ig"),
            ke = function(e, t, i) {
                var n = "0x" + t - 65536;
                return n !== n || i ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            };
        try {
            ee.apply(X = te.call(U.childNodes), U.childNodes), X[U.childNodes.length].nodeType
        } catch (xe) {
            ee = {
                "apply": X.length ? function(e, t) {
                    Z.apply(e, te.call(t))
                } : function(e, t) {
                    for (var i = e.length, n = 0; e[i++] = t[n++];);
                    e.length = i - 1
                }
            }
        }
        $ = i.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, T = i.support = {}, I = i.setDocument = function(e) {
            var t = e ? e.ownerDocument || e : U,
                i = t.defaultView;
            return t !== L && 9 === t.nodeType && t.documentElement ? (L = t, A = t.documentElement, q = !$(t), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function() {
                I()
            }), T.attributes = s(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), T.getElementsByTagName = s(function(e) {
                return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
            }), T.getElementsByClassName = s(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
            }), T.getById = s(function(e) {
                return A.appendChild(e).id = H, !t.getElementsByName || !t.getElementsByName(H).length
            }), T.getById ? (x.find.ID = function(e, t) {
                if (typeof t.getElementById !== J && q) {
                    var i = t.getElementById(e);
                    return i && i.parentNode ? [i] : []
                }
            }, x.filter.ID = function(e) {
                var t = e.replace(Te, ke);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete x.find.ID, x.filter.ID = function(e) {
                var t = e.replace(Te, ke);
                return function(e) {
                    var i = typeof e.getAttributeNode !== J && e.getAttributeNode("id");
                    return i && i.value === t
                }
            }), x.find.TAG = T.getElementsByTagName ? function(e, t) {
                return typeof t.getElementsByTagName !== J ? t.getElementsByTagName(e) : void 0
            } : function(e, t) {
                var i, n = [],
                    a = 0,
                    s = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; i = s[a++];) 1 === i.nodeType && n.push(i);
                    return n
                }
                return s
            }, x.find.CLASS = T.getElementsByClassName && function(e, t) {
                return typeof t.getElementsByClassName !== J && q ? t.getElementsByClassName(e) : void 0
            }, F = [], P = [], (T.qsa = _e.test(t.querySelectorAll)) && (s(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || P.push("\\[" + ae + "*(?:value|" + ne + ")"), e.querySelectorAll(":checked").length || P.push(":checked")
            }), s(function(e) {
                var i = t.createElement("input");
                i.setAttribute("type", "hidden"), e.appendChild(i).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && P.push("[*^$]=" + ae + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || P.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), P.push(",.*:")
            })), (T.matchesSelector = _e.test(O = A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && s(function(e) {
                T.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), F.push("!=", le)
            }), P = P.length && new RegExp(P.join("|")), F = F.length && new RegExp(F.join("|")), N = _e.test(A.contains) || A.compareDocumentPosition ? function(e, t) {
                var i = 9 === e.nodeType ? e.documentElement : e,
                    n = t && t.parentNode;
                return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, W = A.compareDocumentPosition ? function(e, i) {
                if (e === i) return B = !0, 0;
                var n = i.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(i);
                return n ? 1 & n || !T.sortDetached && i.compareDocumentPosition(e) === n ? e === t || N(U, e) ? -1 : i === t || N(U, i) ? 1 : D ? ie.call(D, e) - ie.call(D, i) : 0 : 4 & n ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
            } : function(e, i) {
                var n, a = 0,
                    s = e.parentNode,
                    o = i.parentNode,
                    l = [e],
                    c = [i];
                if (e === i) return B = !0, 0;
                if (!s || !o) return e === t ? -1 : i === t ? 1 : s ? -1 : o ? 1 : D ? ie.call(D, e) - ie.call(D, i) : 0;
                if (s === o) return r(e, i);
                for (n = e; n = n.parentNode;) l.unshift(n);
                for (n = i; n = n.parentNode;) c.unshift(n);
                for (; l[a] === c[a];) a++;
                return a ? r(l[a], c[a]) : l[a] === U ? -1 : c[a] === U ? 1 : 0
            }, t) : L
        }, i.matches = function(e, t) {
            return i(e, null, null, t)
        }, i.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== L && I(e), t = t.replace(fe, "='$1']"), !(!T.matchesSelector || !q || F && F.test(t) || P && P.test(t))) try {
                var n = O.call(e, t);
                if (n || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
            } catch (a) {}
            return i(t, L, null, [e]).length > 0
        }, i.contains = function(e, t) {
            return (e.ownerDocument || e) !== L && I(e), N(e, t)
        }, i.attr = function(e, i) {
            (e.ownerDocument || e) !== L && I(e);
            var n = x.attrHandle[i.toLowerCase()],
                a = n && K.call(x.attrHandle, i.toLowerCase()) ? n(e, i, !q) : t;
            return a === t ? T.attributes || !q ? e.getAttribute(i) : (a = e.getAttributeNode(i)) && a.specified ? a.value : null : a
        }, i.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, i.uniqueSort = function(e) {
            var t, i = [],
                n = 0,
                a = 0;
            if (B = !T.detectDuplicates, D = !T.sortStable && e.slice(0), e.sort(W), B) {
                for (; t = e[a++];) t === e[a] && (n = i.push(a));
                for (; n--;) e.splice(i[n], 1)
            }
            return e
        }, C = i.getText = function(e) {
            var t, i = "",
                n = 0,
                a = e.nodeType;
            if (a) {
                if (1 === a || 9 === a || 11 === a) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) i += C(e)
                } else if (3 === a || 4 === a) return e.nodeValue
            } else
                for (; t = e[n]; n++) i += C(t);
            return i
        }, x = i.selectors = {
            "cacheLength": 50,
            "createPseudo": a,
            "match": ve,
            "attrHandle": {},
            "find": {},
            "relative": {
                ">": {
                    "dir": "parentNode",
                    "first": !0
                },
                " ": {
                    "dir": "parentNode"
                },
                "+": {
                    "dir": "previousSibling",
                    "first": !0
                },
                "~": {
                    "dir": "previousSibling"
                }
            },
            "preFilter": {
                "ATTR": function(e) {
                    return e[1] = e[1].replace(Te, ke), e[3] = (e[4] || e[5] || "").replace(Te, ke), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                "CHILD": function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || i.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && i.error(e[0]), e
                },
                "PSEUDO": function(e) {
                    var i, n = !e[5] && e[2];
                    return ve.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : n && ge.test(n) && (i = h(n, !0)) && (i = n.indexOf(")", n.length - i) - n.length) && (e[0] = e[0].slice(0, i), e[2] = n.slice(0, i)), e.slice(0, 3))
                }
            },
            "filter": {
                "TAG": function(e) {
                    var t = e.replace(Te, ke).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                "CLASS": function(e) {
                    var t = z[e + " "];
                    return t || (t = new RegExp("(^|" + ae + ")" + e + "(" + ae + "|$)")) && z(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== J && e.getAttribute("class") || "")
                    })
                },
                "ATTR": function(e, t, n) {
                    return function(a) {
                        var s = i.attr(a, e);
                        return null == s ? "!=" === t : t ? (s += "", "=" === t ? s === n : "!=" === t ? s !== n : "^=" === t ? n && 0 === s.indexOf(n) : "*=" === t ? n && s.indexOf(n) > -1 : "$=" === t ? n && s.slice(-n.length) === n : "~=" === t ? (" " + s + " ").indexOf(n) > -1 : "|=" === t ? s === n || s.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                "CHILD": function(e, t, i, n, a) {
                    var s = "nth" !== e.slice(0, 3),
                        o = "last" !== e.slice(-4),
                        r = "of-type" === t;
                    return 1 === n && 0 === a ? function(e) {
                        return !!e.parentNode
                    } : function(t, i, l) {
                        var c, u, d, h, p, f, g = s !== o ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            v = r && t.nodeName.toLowerCase(),
                            _ = !l && !r;
                        if (m) {
                            if (s) {
                                for (; g;) {
                                    for (d = t; d = d[g];)
                                        if (r ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                    f = g = "only" === e && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [o ? m.firstChild : m.lastChild], o && _) {
                                for (u = m[H] || (m[H] = {}), c = u[e] || [], p = c[0] === j && c[1], h = c[0] === j && c[2], d = p && m.childNodes[p]; d = ++p && d && d[g] || (h = p = 0) || f.pop();)
                                    if (1 === d.nodeType && ++h && d === t) {
                                        u[e] = [j, p, h];
                                        break
                                    }
                            } else if (_ && (c = (t[H] || (t[H] = {}))[e]) && c[0] === j) h = c[1];
                            else
                                for (;
                                    (d = ++p && d && d[g] || (h = p = 0) || f.pop()) && ((r ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++h || (_ && ((d[H] || (d[H] = {}))[e] = [j, h]), d !== t)););
                            return h -= a, h === n || h % n === 0 && h / n >= 0
                        }
                    }
                },
                "PSEUDO": function(e, t) {
                    var n, s = x.pseudos[e] || x.setFilters[e.toLowerCase()] || i.error("unsupported pseudo: " + e);
                    return s[H] ? s(t) : s.length > 1 ? (n = [e, e, "", t], x.setFilters.hasOwnProperty(e.toLowerCase()) ? a(function(e, i) {
                        for (var n, a = s(e, t), o = a.length; o--;) n = ie.call(e, a[o]), e[n] = !(i[n] = a[o])
                    }) : function(e) {
                        return s(e, 0, n)
                    }) : s
                }
            },
            "pseudos": {
                "not": a(function(e) {
                    var t = [],
                        i = [],
                        n = E(e.replace(ce, "$1"));
                    return n[H] ? a(function(e, t, i, a) {
                        for (var s, o = n(e, null, a, []), r = e.length; r--;)(s = o[r]) && (e[r] = !(t[r] = s))
                    }) : function(e, a, s) {
                        return t[0] = e, n(t, null, s, i), !i.pop()
                    }
                }),
                "has": a(function(e) {
                    return function(t) {
                        return i(e, t).length > 0
                    }
                }),
                "contains": a(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                    }
                }),
                "lang": a(function(e) {
                    return me.test(e || "") || i.error("unsupported lang: " + e), e = e.replace(Te, ke).toLowerCase(),
                    function(t) {
                        var i;
                        do
                            if (i = q ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === e || 0 === i.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }),
                "target": function(t) {
                    var i = e.location && e.location.hash;
                    return i && i.slice(1) === t.id
                },
                "root": function(e) {
                    return e === A
                },
                "focus": function(e) {
                    return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
                },
                "enabled": function(e) {
                    return e.disabled === !1
                },
                "disabled": function(e) {
                    return e.disabled === !0
                },
                "checked": function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !! e.checked || "option" === t && !! e.selected
                },
                "selected": function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                "empty": function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                    return !0
                },
                "parent": function(e) {
                    return !x.pseudos.empty(e)
                },
                "header": function(e) {
                    return Se.test(e.nodeName)
                },
                "input": function(e) {
                    return ye.test(e.nodeName)
                },
                "button": function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                "text": function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                },
                "first": u(function() {
                    return [0]
                }),
                "last": u(function(e, t) {
                    return [t - 1]
                }),
                "eq": u(function(e, t, i) {
                    return [0 > i ? i + t : i]
                }),
                "even": u(function(e, t) {
                    for (var i = 0; t > i; i += 2) e.push(i);
                    return e
                }),
                "odd": u(function(e, t) {
                    for (var i = 1; t > i; i += 2) e.push(i);
                    return e
                }),
                "lt": u(function(e, t, i) {
                    for (var n = 0 > i ? i + t : i; --n >= 0;) e.push(n);
                    return e
                }),
                "gt": u(function(e, t, i) {
                    for (var n = 0 > i ? i + t : i; ++n < t;) e.push(n);
                    return e
                })
            }
        }, x.pseudos.nth = x.pseudos.eq;
        for (w in {
            "radio": !0,
            "checkbox": !0,
            "file": !0,
            "password": !0,
            "image": !0
        }) x.pseudos[w] = l(w);
        for (w in {
            "submit": !0,
            "reset": !0
        }) x.pseudos[w] = c(w);
        d.prototype = x.filters = x.pseudos, x.setFilters = new d, E = i.compile = function(e, t) {
            var i, n = [],
                a = [],
                s = R[e + " "];
            if (!s) {
                for (t || (t = h(e)), i = t.length; i--;) s = _(t[i]), s[H] ? n.push(s) : a.push(s);
                s = R(e, b(a, n))
            }
            return s
        }, T.sortStable = H.split("").sort(W).join("") === H, T.detectDuplicates = B, I(), T.sortDetached = s(function(e) {
            return 1 & e.compareDocumentPosition(L.createElement("div"))
        }), s(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(e, t, i) {
            return i ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), T.attributes && s(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function(e, t, i) {
            return i || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), s(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(ne, function(e, t, i) {
            var n;
            return i ? void 0 : (n = e.getAttributeNode(t)) && n.specified ? n.value : e[t] === !0 ? t.toLowerCase() : null
        }), ue.find = i, ue.expr = i.selectors, ue.expr[":"] = ue.expr.pseudos, ue.unique = i.uniqueSort, ue.text = i.getText, ue.isXMLDoc = i.isXML, ue.contains = i.contains
    }(e);
    var xe = {};
    ue.Callbacks = function(e) {
        e = "string" == typeof e ? xe[e] || n(e) : ue.extend({}, e);
        var i, a, s, o, r, l, c = [],
            u = !e.once && [],
            d = function(t) {
                for (a = e.memory && t, s = !0, r = l || 0, l = 0, o = c.length, i = !0; c && o > r; r++)
                    if (c[r].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        a = !1;
                        break
                    }
                i = !1, c && (u ? u.length && d(u.shift()) : a ? c = [] : h.disable())
            }, h = {
                "add": function() {
                    if (c) {
                        var t = c.length;
                        ! function n(t) {
                            ue.each(t, function(t, i) {
                                var a = ue.type(i);
                                "function" === a ? e.unique && h.has(i) || c.push(i) : i && i.length && "string" !== a && n(i)
                            })
                        }(arguments), i ? o = c.length : a && (l = t, d(a))
                    }
                    return this
                },
                "remove": function() {
                    return c && ue.each(arguments, function(e, t) {
                        for (var n;
                            (n = ue.inArray(t, c, n)) > -1;) c.splice(n, 1), i && (o >= n && o--, r >= n && r--)
                    }), this
                },
                "has": function(e) {
                    return e ? ue.inArray(e, c) > -1 : !(!c || !c.length)
                },
                "empty": function() {
                    return c = [], o = 0, this
                },
                "disable": function() {
                    return c = u = a = t, this
                },
                "disabled": function() {
                    return !c
                },
                "lock": function() {
                    return u = t, a || h.disable(), this
                },
                "locked": function() {
                    return !u
                },
                "fireWith": function(e, t) {
                    return !c || s && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], i ? u.push(t) : d(t)), this
                },
                "fire": function() {
                    return h.fireWith(this, arguments), this
                },
                "fired": function() {
                    return !!s
                }
            };
        return h
    }, ue.extend({
        "Deferred": function(e) {
            var t = [
                ["resolve", "done", ue.Callbacks("once memory"), "resolved"],
                ["reject", "fail", ue.Callbacks("once memory"), "rejected"],
                ["notify", "progress", ue.Callbacks("memory")]
            ],
                i = "pending",
                n = {
                    "state": function() {
                        return i
                    },
                    "always": function() {
                        return a.done(arguments).fail(arguments), this
                    },
                    "then": function() {
                        var e = arguments;
                        return ue.Deferred(function(i) {
                            ue.each(t, function(t, s) {
                                var o = s[0],
                                    r = ue.isFunction(e[t]) && e[t];
                                a[s[1]](function() {
                                    var e = r && r.apply(this, arguments);
                                    e && ue.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o + "With"](this === n ? i.promise() : this, r ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    "promise": function(e) {
                        return null != e ? ue.extend(e, n) : n
                    }
                }, a = {};
            return n.pipe = n.then, ue.each(t, function(e, s) {
                var o = s[2],
                    r = s[3];
                n[s[1]] = o.add, r && o.add(function() {
                    i = r
                }, t[1 ^ e][2].disable, t[2][2].lock), a[s[0]] = function() {
                    return a[s[0] + "With"](this === a ? n : this, arguments), this
                }, a[s[0] + "With"] = o.fireWith
            }), n.promise(a), e && e.call(a, a), a
        },
        "when": function(e) {
            var t, i, n, a = 0,
                s = se.call(arguments),
                o = s.length,
                r = 1 !== o || e && ue.isFunction(e.promise) ? o : 0,
                l = 1 === r ? e : ue.Deferred(),
                c = function(e, i, n) {
                    return function(a) {
                        i[e] = this, n[e] = arguments.length > 1 ? se.call(arguments) : a, n === t ? l.notifyWith(i, n) : --r || l.resolveWith(i, n)
                    }
                };
            if (o > 1)
                for (t = new Array(o), i = new Array(o), n = new Array(o); o > a; a++) s[a] && ue.isFunction(s[a].promise) ? s[a].promise().done(c(a, n, s)).fail(l.reject).progress(c(a, i, t)) : --r;
            return r || l.resolveWith(n, s), l.promise()
        }
    }), ue.support = function(t) {
        var i, n, a, s, o, r, l, c, u, d = K.createElement("div");
        if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = d.getElementsByTagName("*") || [], n = d.getElementsByTagName("a")[0], !n || !n.style || !i.length) return t;
        s = K.createElement("select"), r = s.appendChild(K.createElement("option")), a = d.getElementsByTagName("input")[0], n.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !! d.getElementsByTagName("link").length, t.style = /top/.test(n.getAttribute("style")), t.hrefNormalized = "/a" === n.getAttribute("href"), t.opacity = /^0.5/.test(n.style.opacity), t.cssFloat = !! n.style.cssFloat, t.checkOn = !! a.value, t.optSelected = r.selected, t.enctype = !! K.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== K.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !r.disabled;
        try {
            delete d.test
        } catch (h) {
            t.deleteExpando = !1
        }
        a = K.createElement("input"), a.setAttribute("value", ""), t.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "t"), a.setAttribute("name", "t"), o = K.createDocumentFragment(), o.appendChild(a), t.appendChecked = a.checked, t.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function() {
            t.noCloneEvent = !1
        }), d.cloneNode(!0).click());
        for (u in {
            "submit": !0,
            "change": !0,
            "focusin": !0
        }) d.setAttribute(l = "on" + u, "t"), t[u + "Bubbles"] = l in e || d.attributes[l].expando === !1;
        d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip;
        for (u in ue(t)) break;
        return t.ownLast = "0" !== u, ue(function() {
            var i, n, a, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                o = K.getElementsByTagName("body")[0];
            o && (i = K.createElement("div"), i.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", o.appendChild(i).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = d.getElementsByTagName("td"), a[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = c && 0 === a[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ue.swap(o, null != o.style.zoom ? {
                "zoom": 1
            } : {}, function() {
                t.boxSizing = 4 === d.offsetWidth
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
                "width": "4px"
            }).width, n = d.appendChild(K.createElement("div")), n.style.cssText = d.style.cssText = s, n.style.marginRight = n.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(n, null) || {}).marginRight)), typeof d.style.zoom !== J && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (o.style.zoom = 1)), o.removeChild(i), i = d = a = n = null)
        }), i = s = o = r = n = a = null, t
    }({});
    var Ce = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        $e = /([A-Z])/g;
    ue.extend({
        "cache": {},
        "noData": {
            "applet": !0,
            "embed": !0,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        "hasData": function(e) {
            return e = e.nodeType ? ue.cache[e[ue.expando]] : e[ue.expando], !! e && !r(e)
        },
        "data": function(e, t, i) {
            return a(e, t, i)
        },
        "removeData": function(e, t) {
            return s(e, t)
        },
        "_data": function(e, t, i) {
            return a(e, t, i, !0)
        },
        "_removeData": function(e, t) {
            return s(e, t, !0)
        },
        "acceptData": function(e) {
            if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
            var t = e.nodeName && ue.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }), ue.fn.extend({
        "data": function(e, i) {
            var n, a, s = null,
                r = 0,
                l = this[0];
            if (e === t) {
                if (this.length && (s = ue.data(l), 1 === l.nodeType && !ue._data(l, "parsedAttrs"))) {
                    for (n = l.attributes; r < n.length; r++) a = n[r].name, 0 === a.indexOf("data-") && (a = ue.camelCase(a.slice(5)), o(l, a, s[a]));
                    ue._data(l, "parsedAttrs", !0)
                }
                return s
            }
            return "object" == typeof e ? this.each(function() {
                ue.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                ue.data(this, e, i)
            }) : l ? o(l, e, ue.data(l, e)) : null
        },
        "removeData": function(e) {
            return this.each(function() {
                ue.removeData(this, e)
            })
        }
    }), ue.extend({
        "queue": function(e, t, i) {
            var n;
            return e ? (t = (t || "fx") + "queue", n = ue._data(e, t), i && (!n || ue.isArray(i) ? n = ue._data(e, t, ue.makeArray(i)) : n.push(i)), n || []) : void 0
        },
        "dequeue": function(e, t) {
            t = t || "fx";
            var i = ue.queue(e, t),
                n = i.length,
                a = i.shift(),
                s = ue._queueHooks(e, t),
                o = function() {
                    ue.dequeue(e, t)
                };
            "inprogress" === a && (a = i.shift(), n--), a && ("fx" === t && i.unshift("inprogress"), delete s.stop, a.call(e, o, s)), !n && s && s.empty.fire()
        },
        "_queueHooks": function(e, t) {
            var i = t + "queueHooks";
            return ue._data(e, i) || ue._data(e, i, {
                "empty": ue.Callbacks("once memory").add(function() {
                    ue._removeData(e, t + "queue"), ue._removeData(e, i)
                })
            })
        }
    }), ue.fn.extend({
        "queue": function(e, i) {
            var n = 2;
            return "string" != typeof e && (i = e, e = "fx", n--), arguments.length < n ? ue.queue(this[0], e) : i === t ? this : this.each(function() {
                var t = ue.queue(this, e, i);
                ue._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ue.dequeue(this, e)
            })
        },
        "dequeue": function(e) {
            return this.each(function() {
                ue.dequeue(this, e)
            })
        },
        "delay": function(e, t) {
            return e = ue.fx ? ue.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, i) {
                var n = setTimeout(t, e);
                i.stop = function() {
                    clearTimeout(n)
                }
            })
        },
        "clearQueue": function(e) {
            return this.queue(e || "fx", [])
        },
        "promise": function(e, i) {
            var n, a = 1,
                s = ue.Deferred(),
                o = this,
                r = this.length,
                l = function() {
                    --a || s.resolveWith(o, [o])
                };
            for ("string" != typeof e && (i = e, e = t), e = e || "fx"; r--;) n = ue._data(o[r], e + "queueHooks"), n && n.empty && (a++, n.empty.add(l));
            return l(), s.promise(i)
        }
    });
    var Ee, Me, De = /[\t\r\n\f]/g,
        Ie = /\r/g,
        Le = /^(?:input|select|textarea|button|object)$/i,
        Ae = /^(?:a|area)$/i,
        qe = /^(?:checked|selected)$/i,
        Pe = ue.support.getSetAttribute,
        Fe = ue.support.input;
    ue.fn.extend({
        "attr": function(e, t) {
            return ue.access(this, ue.attr, e, t, arguments.length > 1)
        },
        "removeAttr": function(e) {
            return this.each(function() {
                ue.removeAttr(this, e)
            })
        },
        "prop": function(e, t) {
            return ue.access(this, ue.prop, e, t, arguments.length > 1)
        },
        "removeProp": function(e) {
            return e = ue.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e]
                } catch (i) {}
            })
        },
        "addClass": function(e) {
            var t, i, n, a, s, o = 0,
                r = this.length,
                l = "string" == typeof e && e;
            if (ue.isFunction(e)) return this.each(function(t) {
                ue(this).addClass(e.call(this, t, this.className))
            });
            if (l)
                for (t = (e || "").match(he) || []; r > o; o++)
                    if (i = this[o], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(De, " ") : " ")) {
                        for (s = 0; a = t[s++];) n.indexOf(" " + a + " ") < 0 && (n += a + " ");
                        i.className = ue.trim(n)
                    }
            return this
        },
        "removeClass": function(e) {
            var t, i, n, a, s, o = 0,
                r = this.length,
                l = 0 === arguments.length || "string" == typeof e && e;
            if (ue.isFunction(e)) return this.each(function(t) {
                ue(this).removeClass(e.call(this, t, this.className))
            });
            if (l)
                for (t = (e || "").match(he) || []; r > o; o++)
                    if (i = this[o], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(De, " ") : "")) {
                        for (s = 0; a = t[s++];)
                            for (; n.indexOf(" " + a + " ") >= 0;) n = n.replace(" " + a + " ", " ");
                        i.className = e ? ue.trim(n) : ""
                    }
            return this
        },
        "toggleClass": function(e, t) {
            var i = typeof e;
            return "boolean" == typeof t && "string" === i ? t ? this.addClass(e) : this.removeClass(e) : this.each(ue.isFunction(e) ? function(i) {
                ue(this).toggleClass(e.call(this, i, this.className, t), t)
            } : function() {
                if ("string" === i)
                    for (var t, n = 0, a = ue(this), s = e.match(he) || []; t = s[n++];) a.hasClass(t) ? a.removeClass(t) : a.addClass(t);
                else(i === J || "boolean" === i) && (this.className && ue._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ue._data(this, "__className__") || "")
            })
        },
        "hasClass": function(e) {
            for (var t = " " + e + " ", i = 0, n = this.length; n > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(De, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        "val": function(e) {
            var i, n, a, s = this[0]; {
                if (arguments.length) return a = ue.isFunction(e), this.each(function(i) {
                    var s;
                    1 === this.nodeType && (s = a ? e.call(this, i, ue(this).val()) : e, null == s ? s = "" : "number" == typeof s ? s += "" : ue.isArray(s) && (s = ue.map(s, function(e) {
                        return null == e ? "" : e + ""
                    })), n = ue.valHooks[this.type] || ue.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, s, "value") !== t || (this.value = s))
                });
                if (s) return n = ue.valHooks[s.type] || ue.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (i = n.get(s, "value")) !== t ? i : (i = s.value, "string" == typeof i ? i.replace(Ie, "") : null == i ? "" : i)
            }
        }
    }), ue.extend({
        "valHooks": {
            "option": {
                "get": function(e) {
                    var t = ue.find.attr(e, "value");
                    return null != t ? t : e.text
                }
            },
            "select": {
                "get": function(e) {
                    for (var t, i, n = e.options, a = e.selectedIndex, s = "select-one" === e.type || 0 > a, o = s ? null : [], r = s ? a + 1 : n.length, l = 0 > a ? r : s ? a : 0; r > l; l++)
                        if (i = n[l], !(!i.selected && l !== a || (ue.support.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && ue.nodeName(i.parentNode, "optgroup"))) {
                            if (t = ue(i).val(), s) return t;
                            o.push(t)
                        }
                    return o
                },
                "set": function(e, t) {
                    for (var i, n, a = e.options, s = ue.makeArray(t), o = a.length; o--;) n = a[o], (n.selected = ue.inArray(ue(n).val(), s) >= 0) && (i = !0);
                    return i || (e.selectedIndex = -1), s
                }
            }
        },
        "attr": function(e, i, n) {
            var a, s, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === J ? ue.prop(e, i, n) : (1 === o && ue.isXMLDoc(e) || (i = i.toLowerCase(), a = ue.attrHooks[i] || (ue.expr.match.bool.test(i) ? Me : Ee)), n === t ? a && "get" in a && null !== (s = a.get(e, i)) ? s : (s = ue.find.attr(e, i), null == s ? t : s) : null !== n ? a && "set" in a && (s = a.set(e, n, i)) !== t ? s : (e.setAttribute(i, n + ""), n) : void ue.removeAttr(e, i))
        },
        "removeAttr": function(e, t) {
            var i, n, a = 0,
                s = t && t.match(he);
            if (s && 1 === e.nodeType)
                for (; i = s[a++];) n = ue.propFix[i] || i, ue.expr.match.bool.test(i) ? Fe && Pe || !qe.test(i) ? e[n] = !1 : e[ue.camelCase("default-" + i)] = e[n] = !1 : ue.attr(e, i, ""),
            e.removeAttribute(Pe ? i : n)
        },
        "attrHooks": {
            "type": {
                "set": function(e, t) {
                    if (!ue.support.radioValue && "radio" === t && ue.nodeName(e, "input")) {
                        var i = e.value;
                        return e.setAttribute("type", t), i && (e.value = i), t
                    }
                }
            }
        },
        "propFix": {
            "for": "htmlFor",
            "class": "className"
        },
        "prop": function(e, i, n) {
            var a, s, o, r = e.nodeType;
            if (e && 3 !== r && 8 !== r && 2 !== r) return o = 1 !== r || !ue.isXMLDoc(e), o && (i = ue.propFix[i] || i, s = ue.propHooks[i]), n !== t ? s && "set" in s && (a = s.set(e, n, i)) !== t ? a : e[i] = n : s && "get" in s && null !== (a = s.get(e, i)) ? a : e[i]
        },
        "propHooks": {
            "tabIndex": {
                "get": function(e) {
                    var t = ue.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Le.test(e.nodeName) || Ae.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), Me = {
        "set": function(e, t, i) {
            return t === !1 ? ue.removeAttr(e, i) : Fe && Pe || !qe.test(i) ? e.setAttribute(!Pe && ue.propFix[i] || i, i) : e[ue.camelCase("default-" + i)] = e[i] = !0, i
        }
    }, ue.each(ue.expr.match.bool.source.match(/\w+/g), function(e, i) {
        var n = ue.expr.attrHandle[i] || ue.find.attr;
        ue.expr.attrHandle[i] = Fe && Pe || !qe.test(i) ? function(e, i, a) {
            var s = ue.expr.attrHandle[i],
                o = a ? t : (ue.expr.attrHandle[i] = t) != n(e, i, a) ? i.toLowerCase() : null;
            return ue.expr.attrHandle[i] = s, o
        } : function(e, i, n) {
            return n ? t : e[ue.camelCase("default-" + i)] ? i.toLowerCase() : null
        }
    }), Fe && Pe || (ue.attrHooks.value = {
        "set": function(e, t, i) {
            return ue.nodeName(e, "input") ? void(e.defaultValue = t) : Ee && Ee.set(e, t, i)
        }
    }), Pe || (Ee = {
        "set": function(e, i, n) {
            var a = e.getAttributeNode(n);
            return a || e.setAttributeNode(a = e.ownerDocument.createAttribute(n)), a.value = i += "", "value" === n || i === e.getAttribute(n) ? i : t
        }
    }, ue.expr.attrHandle.id = ue.expr.attrHandle.name = ue.expr.attrHandle.coords = function(e, i, n) {
        var a;
        return n ? t : (a = e.getAttributeNode(i)) && "" !== a.value ? a.value : null
    }, ue.valHooks.button = {
        "get": function(e, i) {
            var n = e.getAttributeNode(i);
            return n && n.specified ? n.value : t
        },
        "set": Ee.set
    }, ue.attrHooks.contenteditable = {
        "set": function(e, t, i) {
            Ee.set(e, "" === t ? !1 : t, i)
        }
    }, ue.each(["width", "height"], function(e, t) {
        ue.attrHooks[t] = {
            "set": function(e, i) {
                return "" === i ? (e.setAttribute(t, "auto"), i) : void 0
            }
        }
    })), ue.support.hrefNormalized || ue.each(["href", "src"], function(e, t) {
        ue.propHooks[t] = {
            "get": function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }), ue.support.style || (ue.attrHooks.style = {
        "get": function(e) {
            return e.style.cssText || t
        },
        "set": function(e, t) {
            return e.style.cssText = t + ""
        }
    }), ue.support.optSelected || (ue.propHooks.selected = {
        "get": function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), ue.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ue.propFix[this.toLowerCase()] = this
    }), ue.support.enctype || (ue.propFix.enctype = "encoding"), ue.each(["radio", "checkbox"], function() {
        ue.valHooks[this] = {
            "set": function(e, t) {
                return ue.isArray(t) ? e.checked = ue.inArray(ue(e).val(), t) >= 0 : void 0
            }
        }, ue.support.checkOn || (ue.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Oe = /^(?:input|select|textarea)$/i,
        Ne = /^key/,
        He = /^(?:mouse|contextmenu)|click/,
        Ue = /^(?:focusinfocus|focusoutblur)$/,
        je = /^([^.]*)(?:\.(.+)|)$/;
    ue.event = {
        "global": {},
        "add": function(e, i, n, a, s) {
            var o, r, l, c, u, d, h, p, f, g, m, v = ue._data(e);
            if (v) {
                for (n.handler && (c = n, n = c.handler, s = c.selector), n.guid || (n.guid = ue.guid++), (r = v.events) || (r = v.events = {}), (d = v.handle) || (d = v.handle = function(e) {
                    return typeof ue === J || e && ue.event.triggered === e.type ? t : ue.event.dispatch.apply(d.elem, arguments)
                }, d.elem = e), i = (i || "").match(he) || [""], l = i.length; l--;) o = je.exec(i[l]) || [], f = m = o[1], g = (o[2] || "").split(".").sort(), f && (u = ue.event.special[f] || {}, f = (s ? u.delegateType : u.bindType) || f, u = ue.event.special[f] || {}, h = ue.extend({
                    "type": f,
                    "origType": m,
                    "data": a,
                    "handler": n,
                    "guid": n.guid,
                    "selector": s,
                    "needsContext": s && ue.expr.match.needsContext.test(s),
                    "namespace": g.join(".")
                }, c), (p = r[f]) || (p = r[f] = [], p.delegateCount = 0, u.setup && u.setup.call(e, a, g, d) !== !1 || (e.addEventListener ? e.addEventListener(f, d, !1) : e.attachEvent && e.attachEvent("on" + f, d))), u.add && (u.add.call(e, h), h.handler.guid || (h.handler.guid = n.guid)), s ? p.splice(p.delegateCount++, 0, h) : p.push(h), ue.event.global[f] = !0);
                e = null
            }
        },
        "remove": function(e, t, i, n, a) {
            var s, o, r, l, c, u, d, h, p, f, g, m = ue.hasData(e) && ue._data(e);
            if (m && (u = m.events)) {
                for (t = (t || "").match(he) || [""], c = t.length; c--;)
                    if (r = je.exec(t[c]) || [], p = g = r[1], f = (r[2] || "").split(".").sort(), p) {
                        for (d = ue.event.special[p] || {}, p = (n ? d.delegateType : d.bindType) || p, h = u[p] || [], r = r[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = s = h.length; s--;) o = h[s], !a && g !== o.origType || i && i.guid !== o.guid || r && !r.test(o.namespace) || n && n !== o.selector && ("**" !== n || !o.selector) || (h.splice(s, 1), o.selector && h.delegateCount--, d.remove && d.remove.call(e, o));
                        l && !h.length && (d.teardown && d.teardown.call(e, f, m.handle) !== !1 || ue.removeEvent(e, p, m.handle), delete u[p])
                    } else
                        for (p in u) ue.event.remove(e, p + t[c], i, n, !0);
                ue.isEmptyObject(u) && (delete m.handle, ue._removeData(e, "events"))
            }
        },
        "trigger": function(i, n, a, s) {
            var o, r, l, c, u, d, h, p = [a || K],
                f = le.call(i, "type") ? i.type : i,
                g = le.call(i, "namespace") ? i.namespace.split(".") : [];
            if (l = d = a = a || K, 3 !== a.nodeType && 8 !== a.nodeType && !Ue.test(f + ue.event.triggered) && (f.indexOf(".") >= 0 && (g = f.split("."), f = g.shift(), g.sort()), r = f.indexOf(":") < 0 && "on" + f, i = i[ue.expando] ? i : new ue.Event(f, "object" == typeof i && i), i.isTrigger = s ? 2 : 3, i.namespace = g.join("."), i.namespace_re = i.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, i.result = t, i.target || (i.target = a), n = null == n ? [i] : ue.makeArray(n, [i]), u = ue.event.special[f] || {}, s || !u.trigger || u.trigger.apply(a, n) !== !1)) {
                if (!s && !u.noBubble && !ue.isWindow(a)) {
                    for (c = u.delegateType || f, Ue.test(c + f) || (l = l.parentNode); l; l = l.parentNode) p.push(l), d = l;
                    d === (a.ownerDocument || K) && p.push(d.defaultView || d.parentWindow || e)
                }
                for (h = 0;
                    (l = p[h++]) && !i.isPropagationStopped();) i.type = h > 1 ? c : u.bindType || f, o = (ue._data(l, "events") || {})[i.type] && ue._data(l, "handle"), o && o.apply(l, n), o = r && l[r], o && ue.acceptData(l) && o.apply && o.apply(l, n) === !1 && i.preventDefault();
                if (i.type = f, !s && !i.isDefaultPrevented() && (!u._default || u._default.apply(p.pop(), n) === !1) && ue.acceptData(a) && r && a[f] && !ue.isWindow(a)) {
                    d = a[r], d && (a[r] = null), ue.event.triggered = f;
                    try {
                        a[f]()
                    } catch (m) {}
                    ue.event.triggered = t, d && (a[r] = d)
                }
                return i.result
            }
        },
        "dispatch": function(e) {
            e = ue.event.fix(e);
            var i, n, a, s, o, r = [],
                l = se.call(arguments),
                c = (ue._data(this, "events") || {})[e.type] || [],
                u = ue.event.special[e.type] || {};
            if (l[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (r = ue.event.handlers.call(this, e, c), i = 0;
                    (s = r[i++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = s.elem, o = 0;
                        (a = s.handlers[o++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, e.data = a.data, n = ((ue.event.special[a.origType] || {}).handle || a.handler).apply(s.elem, l), n !== t && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        "handlers": function(e, i) {
            var n, a, s, o, r = [],
                l = i.delegateCount,
                c = e.target;
            if (l && c.nodeType && (!e.button || "click" !== e.type))
                for (; c != this; c = c.parentNode || this)
                    if (1 === c.nodeType && (c.disabled !== !0 || "click" !== e.type)) {
                        for (s = [], o = 0; l > o; o++) a = i[o], n = a.selector + " ", s[n] === t && (s[n] = a.needsContext ? ue(n, this).index(c) >= 0 : ue.find(n, this, null, [c]).length), s[n] && s.push(a);
                        s.length && r.push({
                            "elem": c,
                            "handlers": s
                        })
                    }
            return l < i.length && r.push({
                "elem": this,
                "handlers": i.slice(l)
            }), r
        },
        "fix": function(e) {
            if (e[ue.expando]) return e;
            var t, i, n, a = e.type,
                s = e,
                o = this.fixHooks[a];
            for (o || (this.fixHooks[a] = o = He.test(a) ? this.mouseHooks : Ne.test(a) ? this.keyHooks : {}), n = o.props ? this.props.concat(o.props) : this.props, e = new ue.Event(s), t = n.length; t--;) i = n[t], e[i] = s[i];
            return e.target || (e.target = s.srcElement || K), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, o.filter ? o.filter(e, s) : e
        },
        "props": "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        "fixHooks": {},
        "keyHooks": {
            "props": "char charCode key keyCode".split(" "),
            "filter": function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        "mouseHooks": {
            "props": "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            "filter": function(e, i) {
                var n, a, s, o = i.button,
                    r = i.fromElement;
                return null == e.pageX && null != i.clientX && (a = e.target.ownerDocument || K, s = a.documentElement, n = a.body, e.pageX = i.clientX + (s && s.scrollLeft || n && n.scrollLeft || 0) - (s && s.clientLeft || n && n.clientLeft || 0), e.pageY = i.clientY + (s && s.scrollTop || n && n.scrollTop || 0) - (s && s.clientTop || n && n.clientTop || 0)), !e.relatedTarget && r && (e.relatedTarget = r === e.target ? i.toElement : r), e.which || o === t || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        "special": {
            "load": {
                "noBubble": !0
            },
            "focus": {
                "trigger": function() {
                    if (this !== u() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {}
                },
                "delegateType": "focusin"
            },
            "blur": {
                "trigger": function() {
                    return this === u() && this.blur ? (this.blur(), !1) : void 0
                },
                "delegateType": "focusout"
            },
            "click": {
                "trigger": function() {
                    return ue.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                "_default": function(e) {
                    return ue.nodeName(e.target, "a")
                }
            },
            "beforeunload": {
                "postDispatch": function(e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        "simulate": function(e, t, i, n) {
            var a = ue.extend(new ue.Event, i, {
                "type": e,
                "isSimulated": !0,
                "originalEvent": {}
            });
            n ? ue.event.trigger(a, null, t) : ue.event.dispatch.call(t, a), a.isDefaultPrevented() && i.preventDefault()
        }
    }, ue.removeEvent = K.removeEventListener ? function(e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i, !1)
    } : function(e, t, i) {
        var n = "on" + t;
        e.detachEvent && (typeof e[n] === J && (e[n] = null), e.detachEvent(n, i))
    }, ue.Event = function(e, t) {
        return this instanceof ue.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? l : c) : this.type = e, t && ue.extend(this, t), this.timeStamp = e && e.timeStamp || ue.now(), void(this[ue.expando] = !0)) : new ue.Event(e, t)
    }, ue.Event.prototype = {
        "isDefaultPrevented": c,
        "isPropagationStopped": c,
        "isImmediatePropagationStopped": c,
        "preventDefault": function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = l, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        "stopPropagation": function() {
            var e = this.originalEvent;
            this.isPropagationStopped = l, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        "stopImmediatePropagation": function() {
            this.isImmediatePropagationStopped = l, this.stopPropagation()
        }
    }, ue.each({
        "mouseenter": "mouseover",
        "mouseleave": "mouseout"
    }, function(e, t) {
        ue.event.special[e] = {
            "delegateType": t,
            "bindType": t,
            "handle": function(e) {
                var i, n = this,
                    a = e.relatedTarget,
                    s = e.handleObj;
                return (!a || a !== n && !ue.contains(n, a)) && (e.type = s.origType, i = s.handler.apply(this, arguments), e.type = t), i
            }
        }
    }), ue.support.submitBubbles || (ue.event.special.submit = {
        "setup": function() {
            return ue.nodeName(this, "form") ? !1 : void ue.event.add(this, "click._submit keypress._submit", function(e) {
                var i = e.target,
                    n = ue.nodeName(i, "input") || ue.nodeName(i, "button") ? i.form : t;
                n && !ue._data(n, "submitBubbles") && (ue.event.add(n, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }), ue._data(n, "submitBubbles", !0))
            })
        },
        "postDispatch": function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ue.event.simulate("submit", this.parentNode, e, !0))
        },
        "teardown": function() {
            return ue.nodeName(this, "form") ? !1 : void ue.event.remove(this, "._submit")
        }
    }), ue.support.changeBubbles || (ue.event.special.change = {
        "setup": function() {
            return Oe.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ue.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), ue.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), ue.event.simulate("change", this, e, !0)
            })), !1) : void ue.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Oe.test(t.nodeName) && !ue._data(t, "changeBubbles") && (ue.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ue.event.simulate("change", this.parentNode, e, !0)
                }), ue._data(t, "changeBubbles", !0))
            })
        },
        "handle": function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        "teardown": function() {
            return ue.event.remove(this, "._change"), !Oe.test(this.nodeName)
        }
    }), ue.support.focusinBubbles || ue.each({
        "focus": "focusin",
        "blur": "focusout"
    }, function(e, t) {
        var i = 0,
            n = function(e) {
                ue.event.simulate(t, e.target, ue.event.fix(e), !0)
            };
        ue.event.special[t] = {
            "setup": function() {
                0 === i++ && K.addEventListener(e, n, !0)
            },
            "teardown": function() {
                0 === --i && K.removeEventListener(e, n, !0)
            }
        }
    }), ue.fn.extend({
        "on": function(e, i, n, a, s) {
            var o, r;
            if ("object" == typeof e) {
                "string" != typeof i && (n = n || i, i = t);
                for (o in e) this.on(o, i, n, e[o], s);
                return this
            }
            if (null == n && null == a ? (a = i, n = i = t) : null == a && ("string" == typeof i ? (a = n, n = t) : (a = n, n = i, i = t)), a === !1) a = c;
            else if (!a) return this;
            return 1 === s && (r = a, a = function(e) {
                return ue().off(e), r.apply(this, arguments)
            }, a.guid = r.guid || (r.guid = ue.guid++)), this.each(function() {
                ue.event.add(this, e, a, n, i)
            })
        },
        "one": function(e, t, i, n) {
            return this.on(e, t, i, n, 1)
        },
        "off": function(e, i, n) {
            var a, s;
            if (e && e.preventDefault && e.handleObj) return a = e.handleObj, ue(e.delegateTarget).off(a.namespace ? a.origType + "." + a.namespace : a.origType, a.selector, a.handler), this;
            if ("object" == typeof e) {
                for (s in e) this.off(s, i, e[s]);
                return this
            }
            return (i === !1 || "function" == typeof i) && (n = i, i = t), n === !1 && (n = c), this.each(function() {
                ue.event.remove(this, e, n, i)
            })
        },
        "trigger": function(e, t) {
            return this.each(function() {
                ue.event.trigger(e, t, this)
            })
        },
        "triggerHandler": function(e, t) {
            var i = this[0];
            return i ? ue.event.trigger(e, t, i, !0) : void 0
        }
    });
    var Ge = /^.[^:#\[\.,]*$/,
        ze = /^(?:parents|prev(?:Until|All))/,
        Ye = ue.expr.match.needsContext,
        Re = {
            "children": !0,
            "contents": !0,
            "next": !0,
            "prev": !0
        };
    ue.fn.extend({
        "find": function(e) {
            var t, i = [],
                n = this,
                a = n.length;
            if ("string" != typeof e) return this.pushStack(ue(e).filter(function() {
                for (t = 0; a > t; t++)
                    if (ue.contains(n[t], this)) return !0
            }));
            for (t = 0; a > t; t++) ue.find(e, n[t], i);
            return i = this.pushStack(a > 1 ? ue.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
        },
        "has": function(e) {
            var t, i = ue(e, this),
                n = i.length;
            return this.filter(function() {
                for (t = 0; n > t; t++)
                    if (ue.contains(this, i[t])) return !0
            })
        },
        "not": function(e) {
            return this.pushStack(h(this, e || [], !0))
        },
        "filter": function(e) {
            return this.pushStack(h(this, e || [], !1))
        },
        "is": function(e) {
            return !!h(this, "string" == typeof e && Ye.test(e) ? ue(e) : e || [], !1).length
        },
        "closest": function(e, t) {
            for (var i, n = 0, a = this.length, s = [], o = Ye.test(e) || "string" != typeof e ? ue(e, t || this.context) : 0; a > n; n++)
                for (i = this[n]; i && i !== t; i = i.parentNode)
                    if (i.nodeType < 11 && (o ? o.index(i) > -1 : 1 === i.nodeType && ue.find.matchesSelector(i, e))) {
                        i = s.push(i);
                        break
                    }
            return this.pushStack(s.length > 1 ? ue.unique(s) : s)
        },
        "index": function(e) {
            return e ? "string" == typeof e ? ue.inArray(this[0], ue(e)) : ue.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        "add": function(e, t) {
            var i = "string" == typeof e ? ue(e, t) : ue.makeArray(e && e.nodeType ? [e] : e),
                n = ue.merge(this.get(), i);
            return this.pushStack(ue.unique(n))
        },
        "addBack": function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ue.each({
        "parent": function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        "parents": function(e) {
            return ue.dir(e, "parentNode")
        },
        "parentsUntil": function(e, t, i) {
            return ue.dir(e, "parentNode", i)
        },
        "next": function(e) {
            return d(e, "nextSibling")
        },
        "prev": function(e) {
            return d(e, "previousSibling")
        },
        "nextAll": function(e) {
            return ue.dir(e, "nextSibling")
        },
        "prevAll": function(e) {
            return ue.dir(e, "previousSibling")
        },
        "nextUntil": function(e, t, i) {
            return ue.dir(e, "nextSibling", i)
        },
        "prevUntil": function(e, t, i) {
            return ue.dir(e, "previousSibling", i)
        },
        "siblings": function(e) {
            return ue.sibling((e.parentNode || {}).firstChild, e)
        },
        "children": function(e) {
            return ue.sibling(e.firstChild)
        },
        "contents": function(e) {
            return ue.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ue.merge([], e.childNodes)
        }
    }, function(e, t) {
        ue.fn[e] = function(i, n) {
            var a = ue.map(this, t, i);
            return "Until" !== e.slice(-5) && (n = i), n && "string" == typeof n && (a = ue.filter(n, a)), this.length > 1 && (Re[e] || (a = ue.unique(a)), ze.test(e) && (a = a.reverse())), this.pushStack(a)
        }
    }), ue.extend({
        "filter": function(e, t, i) {
            var n = t[0];
            return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? ue.find.matchesSelector(n, e) ? [n] : [] : ue.find.matches(e, ue.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        },
        "dir": function(e, i, n) {
            for (var a = [], s = e[i]; s && 9 !== s.nodeType && (n === t || 1 !== s.nodeType || !ue(s).is(n));) 1 === s.nodeType && a.push(s), s = s[i];
            return a
        },
        "sibling": function(e, t) {
            for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
            return i
        }
    });
    var Be = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        We = / jQuery\d+="(?:null|\d+)"/g,
        Je = new RegExp("<(?:" + Be + ")[\\s/>]", "i"),
        Ve = /^\s+/,
        Ke = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Xe = /<([\w:]+)/,
        Qe = /<tbody/i,
        Ze = /<|&#?\w+;/,
        et = /<(?:script|style|link)/i,
        tt = /^(?:checkbox|radio)$/i,
        it = /checked\s*(?:[^=]|=\s*.checked.)/i,
        nt = /^$|\/(?:java|ecma)script/i,
        at = /^true\/(.*)/,
        st = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ot = {
            "option": [1, "<select multiple='multiple'>", "</select>"],
            "legend": [1, "<fieldset>", "</fieldset>"],
            "area": [1, "<map>", "</map>"],
            "param": [1, "<object>", "</object>"],
            "thead": [1, "<table>", "</table>"],
            "tr": [2, "<table><tbody>", "</tbody></table>"],
            "col": [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            "td": [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            "_default": ue.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, rt = p(K),
        lt = rt.appendChild(K.createElement("div"));
    ot.optgroup = ot.option, ot.tbody = ot.tfoot = ot.colgroup = ot.caption = ot.thead, ot.th = ot.td, ue.fn.extend({
        "text": function(e) {
            return ue.access(this, function(e) {
                return e === t ? ue.text(this) : this.empty().append((this[0] && this[0].ownerDocument || K).createTextNode(e))
            }, null, e, arguments.length)
        },
        "append": function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = f(this, e);
                    t.appendChild(e)
                }
            })
        },
        "prepend": function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = f(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        "before": function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        "after": function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        "remove": function(e, t) {
            for (var i, n = e ? ue.filter(e, this) : this, a = 0; null != (i = n[a]); a++) t || 1 !== i.nodeType || ue.cleanData(y(i)), i.parentNode && (t && ue.contains(i.ownerDocument, i) && v(y(i, "script")), i.parentNode.removeChild(i));
            return this
        },
        "empty": function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && ue.cleanData(y(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && ue.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        "clone": function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return ue.clone(this, e, t)
            })
        },
        "html": function(e) {
            return ue.access(this, function(e) {
                var i = this[0] || {}, n = 0,
                    a = this.length;
                if (e === t) return 1 === i.nodeType ? i.innerHTML.replace(We, "") : t;
                if (!("string" != typeof e || et.test(e) || !ue.support.htmlSerialize && Je.test(e) || !ue.support.leadingWhitespace && Ve.test(e) || ot[(Xe.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Ke, "<$1></$2>");
                    try {
                        for (; a > n; n++) i = this[n] || {}, 1 === i.nodeType && (ue.cleanData(y(i, !1)), i.innerHTML = e);
                        i = 0
                    } catch (s) {}
                }
                i && this.empty().append(e)
            }, null, e, arguments.length)
        },
        "replaceWith": function() {
            var e = ue.map(this, function(e) {
                return [e.nextSibling, e.parentNode]
            }),
                t = 0;
            return this.domManip(arguments, function(i) {
                var n = e[t++],
                    a = e[t++];
                a && (n && n.parentNode !== a && (n = this.nextSibling), ue(this).remove(), a.insertBefore(i, n))
            }, !0), t ? this : this.remove()
        },
        "detach": function(e) {
            return this.remove(e, !0)
        },
        "domManip": function(e, t, i) {
            e = ne.apply([], e);
            var n, a, s, o, r, l, c = 0,
                u = this.length,
                d = this,
                h = u - 1,
                p = e[0],
                f = ue.isFunction(p);
            if (f || !(1 >= u || "string" != typeof p || ue.support.checkClone) && it.test(p)) return this.each(function(n) {
                var a = d.eq(n);
                f && (e[0] = p.call(this, n, a.html())), a.domManip(e, t, i)
            });
            if (u && (l = ue.buildFragment(e, this[0].ownerDocument, !1, !i && this), n = l.firstChild, 1 === l.childNodes.length && (l = n), n)) {
                for (o = ue.map(y(l, "script"), g), s = o.length; u > c; c++) a = l, c !== h && (a = ue.clone(a, !0, !0), s && ue.merge(o, y(a, "script"))), t.call(this[c], a, c);
                if (s)
                    for (r = o[o.length - 1].ownerDocument, ue.map(o, m), c = 0; s > c; c++) a = o[c], nt.test(a.type || "") && !ue._data(a, "globalEval") && ue.contains(r, a) && (a.src ? ue._evalUrl(a.src) : ue.globalEval((a.text || a.textContent || a.innerHTML || "").replace(st, "")));
                l = n = null
            }
            return this
        }
    }), ue.each({
        "appendTo": "append",
        "prependTo": "prepend",
        "insertBefore": "before",
        "insertAfter": "after",
        "replaceAll": "replaceWith"
    }, function(e, t) {
        ue.fn[e] = function(e) {
            for (var i, n = 0, a = [], s = ue(e), o = s.length - 1; o >= n; n++) i = n === o ? this : this.clone(!0), ue(s[n])[t](i), ae.apply(a, i.get());
            return this.pushStack(a)
        }
    }), ue.extend({
        "clone": function(e, t, i) {
            var n, a, s, o, r, l = ue.contains(e.ownerDocument, e);
            if (ue.support.html5Clone || ue.isXMLDoc(e) || !Je.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (lt.innerHTML = e.outerHTML, lt.removeChild(s = lt.firstChild)), !(ue.support.noCloneEvent && ue.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ue.isXMLDoc(e)))
                for (n = y(s), r = y(e), o = 0; null != (a = r[o]); ++o) n[o] && b(a, n[o]);
            if (t)
                if (i)
                    for (r = r || y(e), n = n || y(s), o = 0; null != (a = r[o]); o++) _(a, n[o]);
                else _(e, s);
            return n = y(s, "script"), n.length > 0 && v(n, !l && y(e, "script")), n = r = a = null, s
        },
        "buildFragment": function(e, t, i, n) {
            for (var a, s, o, r, l, c, u, d = e.length, h = p(t), f = [], g = 0; d > g; g++)
                if (s = e[g], s || 0 === s)
                    if ("object" === ue.type(s)) ue.merge(f, s.nodeType ? [s] : s);
                    else if (Ze.test(s)) {
                for (r = r || h.appendChild(t.createElement("div")), l = (Xe.exec(s) || ["", ""])[1].toLowerCase(), u = ot[l] || ot._default, r.innerHTML = u[1] + s.replace(Ke, "<$1></$2>") + u[2], a = u[0]; a--;) r = r.lastChild;
                if (!ue.support.leadingWhitespace && Ve.test(s) && f.push(t.createTextNode(Ve.exec(s)[0])), !ue.support.tbody)
                    for (s = "table" !== l || Qe.test(s) ? "<table>" !== u[1] || Qe.test(s) ? 0 : r : r.firstChild, a = s && s.childNodes.length; a--;) ue.nodeName(c = s.childNodes[a], "tbody") && !c.childNodes.length && s.removeChild(c);
                for (ue.merge(f, r.childNodes), r.textContent = ""; r.firstChild;) r.removeChild(r.firstChild);
                r = h.lastChild
            } else f.push(t.createTextNode(s));
            for (r && h.removeChild(r), ue.support.appendChecked || ue.grep(y(f, "input"), S), g = 0; s = f[g++];)
                if ((!n || -1 === ue.inArray(s, n)) && (o = ue.contains(s.ownerDocument, s), r = y(h.appendChild(s), "script"), o && v(r), i))
                    for (a = 0; s = r[a++];) nt.test(s.type || "") && i.push(s);
            return r = null, h
        },
        "cleanData": function(e, t) {
            for (var i, n, a, s, o = 0, r = ue.expando, l = ue.cache, c = ue.support.deleteExpando, u = ue.event.special; null != (i = e[o]); o++)
                if ((t || ue.acceptData(i)) && (a = i[r], s = a && l[a])) {
                    if (s.events)
                        for (n in s.events) u[n] ? ue.event.remove(i, n) : ue.removeEvent(i, n, s.handle);
                    l[a] && (delete l[a], c ? delete i[r] : typeof i.removeAttribute !== J ? i.removeAttribute(r) : i[r] = null, te.push(a))
                }
        },
        "_evalUrl": function(e) {
            return ue.ajax({
                "url": e,
                "type": "GET",
                "dataType": "script",
                "async": !1,
                "global": !1,
                "throws": !0
            })
        }
    }), ue.fn.extend({
        "wrapAll": function(e) {
            if (ue.isFunction(e)) return this.each(function(t) {
                ue(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = ue(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        "wrapInner": function(e) {
            return this.each(ue.isFunction(e) ? function(t) {
                ue(this).wrapInner(e.call(this, t))
            } : function() {
                var t = ue(this),
                    i = t.contents();
                i.length ? i.wrapAll(e) : t.append(e)
            })
        },
        "wrap": function(e) {
            var t = ue.isFunction(e);
            return this.each(function(i) {
                ue(this).wrapAll(t ? e.call(this, i) : e)
            })
        },
        "unwrap": function() {
            return this.parent().each(function() {
                ue.nodeName(this, "body") || ue(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var ct, ut, dt, ht = /alpha\([^)]*\)/i,
        pt = /opacity\s*=\s*([^)]*)/,
        ft = /^(top|right|bottom|left)$/,
        gt = /^(none|table(?!-c[ea]).+)/,
        mt = /^margin/,
        vt = new RegExp("^(" + de + ")(.*)$", "i"),
        _t = new RegExp("^(" + de + ")(?!px)[a-z%]+$", "i"),
        bt = new RegExp("^([+-])=(" + de + ")", "i"),
        yt = {
            "BODY": "block"
        }, St = {
            "position": "absolute",
            "visibility": "hidden",
            "display": "block"
        }, wt = {
            "letterSpacing": 0,
            "fontWeight": 400
        }, Tt = ["Top", "Right", "Bottom", "Left"],
        kt = ["Webkit", "O", "Moz", "ms"];
    ue.fn.extend({
        "css": function(e, i) {
            return ue.access(this, function(e, i, n) {
                var a, s, o = {}, r = 0;
                if (ue.isArray(i)) {
                    for (s = ut(e), a = i.length; a > r; r++) o[i[r]] = ue.css(e, i[r], !1, s);
                    return o
                }
                return n !== t ? ue.style(e, i, n) : ue.css(e, i)
            }, e, i, arguments.length > 1)
        },
        "show": function() {
            return k(this, !0)
        },
        "hide": function() {
            return k(this)
        },
        "toggle": function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                T(this) ? ue(this).show() : ue(this).hide()
            })
        }
    }), ue.extend({
        "cssHooks": {
            "opacity": {
                "get": function(e, t) {
                    if (t) {
                        var i = dt(e, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        "cssNumber": {
            "columnCount": !0,
            "fillOpacity": !0,
            "fontWeight": !0,
            "lineHeight": !0,
            "opacity": !0,
            "order": !0,
            "orphans": !0,
            "widows": !0,
            "zIndex": !0,
            "zoom": !0
        },
        "cssProps": {
            "float": ue.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        "style": function(e, i, n, a) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var s, o, r, l = ue.camelCase(i),
                    c = e.style;
                if (i = ue.cssProps[l] || (ue.cssProps[l] = w(c, l)), r = ue.cssHooks[i] || ue.cssHooks[l], n === t) return r && "get" in r && (s = r.get(e, !1, a)) !== t ? s : c[i];
                if (o = typeof n, "string" === o && (s = bt.exec(n)) && (n = (s[1] + 1) * s[2] + parseFloat(ue.css(e, i)), o = "number"), !(null == n || "number" === o && isNaN(n) || ("number" !== o || ue.cssNumber[l] || (n += "px"), ue.support.clearCloneStyle || "" !== n || 0 !== i.indexOf("background") || (c[i] = "inherit"), r && "set" in r && (n = r.set(e, n, a)) === t))) try {
                    c[i] = n
                } catch (u) {}
            }
        },
        "css": function(e, i, n, a) {
            var s, o, r, l = ue.camelCase(i);
            return i = ue.cssProps[l] || (ue.cssProps[l] = w(e.style, l)), r = ue.cssHooks[i] || ue.cssHooks[l], r && "get" in r && (o = r.get(e, !0, n)), o === t && (o = dt(e, i, a)), "normal" === o && i in wt && (o = wt[i]), "" === n || n ? (s = parseFloat(o), n === !0 || ue.isNumeric(s) ? s || 0 : o) : o
        }
    }), e.getComputedStyle ? (ut = function(t) {
        return e.getComputedStyle(t, null)
    }, dt = function(e, i, n) {
        var a, s, o, r = n || ut(e),
            l = r ? r.getPropertyValue(i) || r[i] : t,
            c = e.style;
        return r && ("" !== l || ue.contains(e.ownerDocument, e) || (l = ue.style(e, i)), _t.test(l) && mt.test(i) && (a = c.width, s = c.minWidth, o = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, l = r.width, c.width = a, c.minWidth = s, c.maxWidth = o)), l
    }) : K.documentElement.currentStyle && (ut = function(e) {
        return e.currentStyle
    }, dt = function(e, i, n) {
        var a, s, o, r = n || ut(e),
            l = r ? r[i] : t,
            c = e.style;
        return null == l && c && c[i] && (l = c[i]), _t.test(l) && !ft.test(i) && (a = c.left, s = e.runtimeStyle, o = s && s.left, o && (s.left = e.currentStyle.left), c.left = "fontSize" === i ? "1em" : l, l = c.pixelLeft + "px", c.left = a, o && (s.left = o)), "" === l ? "auto" : l
    }), ue.each(["height", "width"], function(e, t) {
        ue.cssHooks[t] = {
            "get": function(e, i, n) {
                return i ? 0 === e.offsetWidth && gt.test(ue.css(e, "display")) ? ue.swap(e, St, function() {
                    return $(e, t, n)
                }) : $(e, t, n) : void 0
            },
            "set": function(e, i, n) {
                var a = n && ut(e);
                return x(e, i, n ? C(e, t, n, ue.support.boxSizing && "border-box" === ue.css(e, "boxSizing", !1, a), a) : 0)
            }
        }
    }), ue.support.opacity || (ue.cssHooks.opacity = {
        "get": function(e, t) {
            return pt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        "set": function(e, t) {
            var i = e.style,
                n = e.currentStyle,
                a = ue.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                s = n && n.filter || i.filter || "";
            i.zoom = 1, (t >= 1 || "" === t) && "" === ue.trim(s.replace(ht, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === t || n && !n.filter) || (i.filter = ht.test(s) ? s.replace(ht, a) : s + " " + a)
        }
    }), ue(function() {
        ue.support.reliableMarginRight || (ue.cssHooks.marginRight = {
            "get": function(e, t) {
                return t ? ue.swap(e, {
                    "display": "inline-block"
                }, dt, [e, "marginRight"]) : void 0
            }
        }), !ue.support.pixelPosition && ue.fn.position && ue.each(["top", "left"], function(e, t) {
            ue.cssHooks[t] = {
                "get": function(e, i) {
                    return i ? (i = dt(e, t), _t.test(i) ? ue(e).position()[t] + "px" : i) : void 0
                }
            }
        })
    }), ue.expr && ue.expr.filters && (ue.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ue.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ue.css(e, "display"))
    }, ue.expr.filters.visible = function(e) {
        return !ue.expr.filters.hidden(e)
    }), ue.each({
        "margin": "",
        "padding": "",
        "border": "Width"
    }, function(e, t) {
        ue.cssHooks[e + t] = {
            "expand": function(i) {
                for (var n = 0, a = {}, s = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) a[e + Tt[n] + t] = s[n] || s[n - 2] || s[0];
                return a
            }
        }, mt.test(e) || (ue.cssHooks[e + t].set = x)
    });
    var xt = /%20/g,
        Ct = /\[\]$/,
        $t = /\r?\n/g,
        Et = /^(?:submit|button|image|reset|file)$/i,
        Mt = /^(?:input|select|textarea|keygen)/i;
    ue.fn.extend({
        "serialize": function() {
            return ue.param(this.serializeArray())
        },
        "serializeArray": function() {
            return this.map(function() {
                var e = ue.prop(this, "elements");
                return e ? ue.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ue(this).is(":disabled") && Mt.test(this.nodeName) && !Et.test(e) && (this.checked || !tt.test(e))
            }).map(function(e, t) {
                var i = ue(this).val();
                return null == i ? null : ue.isArray(i) ? ue.map(i, function(e) {
                    return {
                        "name": t.name,
                        "value": e.replace($t, "\r\n")
                    }
                }) : {
                    "name": t.name,
                    "value": i.replace($t, "\r\n")
                }
            }).get()
        }
    }), ue.param = function(e, i) {
        var n, a = [],
            s = function(e, t) {
                t = ue.isFunction(t) ? t() : null == t ? "" : t, a[a.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (i === t && (i = ue.ajaxSettings && ue.ajaxSettings.traditional), ue.isArray(e) || e.jquery && !ue.isPlainObject(e)) ue.each(e, function() {
            s(this.name, this.value)
        });
        else
            for (n in e) D(n, e[n], i, s);
        return a.join("&").replace(xt, "+")
    }, ue.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        ue.fn[t] = function(e, i) {
            return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
        }
    }), ue.fn.extend({
        "hover": function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        "bind": function(e, t, i) {
            return this.on(e, null, t, i)
        },
        "unbind": function(e, t) {
            return this.off(e, null, t)
        },
        "delegate": function(e, t, i, n) {
            return this.on(t, e, i, n)
        },
        "undelegate": function(e, t, i) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
        }
    });
    var Dt, It, Lt = ue.now(),
        At = /\?/,
        qt = /#.*$/,
        Pt = /([?&])_=[^&]*/,
        Ft = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Ot = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Nt = /^(?:GET|HEAD)$/,
        Ht = /^\/\//,
        Ut = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        jt = ue.fn.load,
        Gt = {}, zt = {}, Yt = "*/".concat("*");
    try {
        It = V.href
    } catch (Rt) {
        It = K.createElement("a"), It.href = "", It = It.href
    }
    Dt = Ut.exec(It.toLowerCase()) || [], ue.fn.load = function(e, i, n) {
        if ("string" != typeof e && jt) return jt.apply(this, arguments);
        var a, s, o, r = this,
            l = e.indexOf(" ");
        return l >= 0 && (a = e.slice(l, e.length), e = e.slice(0, l)), ue.isFunction(i) ? (n = i, i = t) : i && "object" == typeof i && (o = "POST"), r.length > 0 && ue.ajax({
            "url": e,
            "type": o,
            "dataType": "html",
            "data": i
        }).done(function(e) {
            s = arguments, r.html(a ? ue("<div>").append(ue.parseHTML(e)).find(a) : e)
        }).complete(n && function(e, t) {
            r.each(n, s || [e.responseText, t, e])
        }), this
    }, ue.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ue.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), ue.extend({
        "active": 0,
        "lastModified": {},
        "etag": {},
        "ajaxSettings": {
            "url": It,
            "type": "GET",
            "isLocal": Ot.test(Dt[1]),
            "global": !0,
            "processData": !0,
            "async": !0,
            "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
            "accepts": {
                "*": Yt,
                "text": "text/plain",
                "html": "text/html",
                "xml": "application/xml, text/xml",
                "json": "application/json, text/javascript"
            },
            "contents": {
                "xml": /xml/,
                "html": /html/,
                "json": /json/
            },
            "responseFields": {
                "xml": "responseXML",
                "text": "responseText",
                "json": "responseJSON"
            },
            "converters": {
                "* text": String,
                "text html": !0,
                "text json": ue.parseJSON,
                "text xml": ue.parseXML
            },
            "flatOptions": {
                "url": !0,
                "context": !0
            }
        },
        "ajaxSetup": function(e, t) {
            return t ? A(A(e, ue.ajaxSettings), t) : A(ue.ajaxSettings, e)
        },
        "ajaxPrefilter": I(Gt),
        "ajaxTransport": I(zt),
        "ajax": function(e, i) {
            function n(e, i, n, a) {
                var s, d, _, b, S, T = i;
                2 !== y && (y = 2, l && clearTimeout(l), u = t, r = a || "", w.readyState = e > 0 ? 4 : 0, s = e >= 200 && 300 > e || 304 === e, n && (b = q(h, w, n)), b = P(h, b, w, s), s ? (h.ifModified && (S = w.getResponseHeader("Last-Modified"), S && (ue.lastModified[o] = S), S = w.getResponseHeader("etag"), S && (ue.etag[o] = S)),
                    204 === e || "HEAD" === h.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = b.state, d = b.data, _ = b.error, s = !_)) : (_ = T, (e || !T) && (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (i || T) + "", s ? g.resolveWith(p, [d, T, w]) : g.rejectWith(p, [w, T, _]), w.statusCode(v), v = t, c && f.trigger(s ? "ajaxSuccess" : "ajaxError", [w, h, s ? d : _]), m.fireWith(p, [w, T]), c && (f.trigger("ajaxComplete", [w, h]), --ue.active || ue.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (i = e, e = t), i = i || {};
            var a, s, o, r, l, c, u, d, h = ue.ajaxSetup({}, i),
                p = h.context || h,
                f = h.context && (p.nodeType || p.jquery) ? ue(p) : ue.event,
                g = ue.Deferred(),
                m = ue.Callbacks("once memory"),
                v = h.statusCode || {}, _ = {}, b = {}, y = 0,
                S = "canceled",
                w = {
                    "readyState": 0,
                    "getResponseHeader": function(e) {
                        var t;
                        if (2 === y) {
                            if (!d)
                                for (d = {}; t = Ft.exec(r);) d[t[1].toLowerCase()] = t[2];
                            t = d[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    "getAllResponseHeaders": function() {
                        return 2 === y ? r : null
                    },
                    "setRequestHeader": function(e, t) {
                        var i = e.toLowerCase();
                        return y || (e = b[i] = b[i] || e, _[e] = t), this
                    },
                    "overrideMimeType": function(e) {
                        return y || (h.mimeType = e), this
                    },
                    "statusCode": function(e) {
                        var t;
                        if (e)
                            if (2 > y)
                                for (t in e) v[t] = [v[t], e[t]];
                            else w.always(e[w.status]);
                        return this
                    },
                    "abort": function(e) {
                        var t = e || S;
                        return u && u.abort(t), n(0, t), this
                    }
                };
            if (g.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, h.url = ((e || h.url || It) + "").replace(qt, "").replace(Ht, Dt[1] + "//"), h.type = i.method || i.type || h.method || h.type, h.dataTypes = ue.trim(h.dataType || "*").toLowerCase().match(he) || [""], null == h.crossDomain && (a = Ut.exec(h.url.toLowerCase()), h.crossDomain = !(!a || a[1] === Dt[1] && a[2] === Dt[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (Dt[3] || ("http:" === Dt[1] ? "80" : "443")))), h.data && h.processData && "string" != typeof h.data && (h.data = ue.param(h.data, h.traditional)), L(Gt, h, i, w), 2 === y) return w;
            c = h.global, c && 0 === ue.active++ && ue.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Nt.test(h.type), o = h.url, h.hasContent || (h.data && (o = h.url += (At.test(o) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (h.url = Pt.test(o) ? o.replace(Pt, "$1_=" + Lt++) : o + (At.test(o) ? "&" : "?") + "_=" + Lt++)), h.ifModified && (ue.lastModified[o] && w.setRequestHeader("If-Modified-Since", ue.lastModified[o]), ue.etag[o] && w.setRequestHeader("If-None-Match", ue.etag[o])), (h.data && h.hasContent && h.contentType !== !1 || i.contentType) && w.setRequestHeader("Content-Type", h.contentType), w.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Yt + "; q=0.01" : "") : h.accepts["*"]);
            for (s in h.headers) w.setRequestHeader(s, h.headers[s]);
            if (h.beforeSend && (h.beforeSend.call(p, w, h) === !1 || 2 === y)) return w.abort();
            S = "abort";
            for (s in {
                "success": 1,
                "error": 1,
                "complete": 1
            }) w[s](h[s]);
            if (u = L(zt, h, i, w)) {
                w.readyState = 1, c && f.trigger("ajaxSend", [w, h]), h.async && h.timeout > 0 && (l = setTimeout(function() {
                    w.abort("timeout")
                }, h.timeout));
                try {
                    y = 1, u.send(_, n)
                } catch (T) {
                    if (!(2 > y)) throw T;
                    n(-1, T)
                }
            } else n(-1, "No Transport");
            return w
        },
        "getJSON": function(e, t, i) {
            return ue.get(e, t, i, "json")
        },
        "getScript": function(e, i) {
            return ue.get(e, t, i, "script")
        }
    }), ue.each(["get", "post"], function(e, i) {
        ue[i] = function(e, n, a, s) {
            return ue.isFunction(n) && (s = s || a, a = n, n = t), ue.ajax({
                "url": e,
                "type": i,
                "dataType": s,
                "data": n,
                "success": a
            })
        }
    }), ue.ajaxSetup({
        "accepts": {
            "script": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        "contents": {
            "script": /(?:java|ecma)script/
        },
        "converters": {
            "text script": function(e) {
                return ue.globalEval(e), e
            }
        }
    }), ue.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), ue.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var i, n = K.head || ue("head")[0] || K.documentElement;
            return {
                "send": function(t, a) {
                    i = K.createElement("script"), i.async = !0, e.scriptCharset && (i.charset = e.scriptCharset), i.src = e.url, i.onload = i.onreadystatechange = function(e, t) {
                        (t || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null, t || a(200, "success"))
                    }, n.insertBefore(i, n.firstChild)
                },
                "abort": function() {
                    i && i.onload(t, !0)
                }
            }
        }
    });
    var Bt = [],
        Wt = /(=)\?(?=&|$)|\?\?/;
    ue.ajaxSetup({
        "jsonp": "callback",
        "jsonpCallback": function() {
            var e = Bt.pop() || ue.expando + "_" + Lt++;
            return this[e] = !0, e
        }
    }), ue.ajaxPrefilter("json jsonp", function(i, n, a) {
        var s, o, r, l = i.jsonp !== !1 && (Wt.test(i.url) ? "url" : "string" == typeof i.data && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && Wt.test(i.data) && "data");
        return l || "jsonp" === i.dataTypes[0] ? (s = i.jsonpCallback = ue.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, l ? i[l] = i[l].replace(Wt, "$1" + s) : i.jsonp !== !1 && (i.url += (At.test(i.url) ? "&" : "?") + i.jsonp + "=" + s), i.converters["script json"] = function() {
            return r || ue.error(s + " was not called"), r[0]
        }, i.dataTypes[0] = "json", o = e[s], e[s] = function() {
            r = arguments
        }, a.always(function() {
            e[s] = o, i[s] && (i.jsonpCallback = n.jsonpCallback, Bt.push(s)), r && ue.isFunction(o) && o(r[0]), r = o = t
        }), "script") : void 0
    });
    var Jt, Vt, Kt = 0,
        Xt = e.ActiveXObject && function() {
            var e;
            for (e in Jt) Jt[e](t, !0)
        };
    ue.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && F() || O()
    } : F, Vt = ue.ajaxSettings.xhr(), ue.support.cors = !! Vt && "withCredentials" in Vt, Vt = ue.support.ajax = !! Vt, Vt && ue.ajaxTransport(function(i) {
        if (!i.crossDomain || ue.support.cors) {
            var n;
            return {
                "send": function(a, s) {
                    var o, r, l = i.xhr();
                    if (i.username ? l.open(i.type, i.url, i.async, i.username, i.password) : l.open(i.type, i.url, i.async), i.xhrFields)
                        for (r in i.xhrFields) l[r] = i.xhrFields[r];
                    i.mimeType && l.overrideMimeType && l.overrideMimeType(i.mimeType), i.crossDomain || a["X-Requested-With"] || (a["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (r in a) l.setRequestHeader(r, a[r])
                    } catch (c) {}
                    l.send(i.hasContent && i.data || null), n = function(e, a) {
                        var r, c, u, d;
                        try {
                            if (n && (a || 4 === l.readyState))
                                if (n = t, o && (l.onreadystatechange = ue.noop, Xt && delete Jt[o]), a) 4 !== l.readyState && l.abort();
                                else {
                                    d = {}, r = l.status, c = l.getAllResponseHeaders(), "string" == typeof l.responseText && (d.text = l.responseText);
                                    try {
                                        u = l.statusText
                                    } catch (h) {
                                        u = ""
                                    }
                                    r || !i.isLocal || i.crossDomain ? 1223 === r && (r = 204) : r = d.text ? 200 : 404
                                }
                        } catch (p) {
                            a || s(-1, p)
                        }
                        d && s(r, u, d, c)
                    }, i.async ? 4 === l.readyState ? setTimeout(n) : (o = ++Kt, Xt && (Jt || (Jt = {}, ue(e).unload(Xt)), Jt[o] = n), l.onreadystatechange = n) : n()
                },
                "abort": function() {
                    n && n(t, !0)
                }
            }
        }
    });
    var Qt, Zt, ei = /^(?:toggle|show|hide)$/,
        ti = new RegExp("^(?:([+-])=|)(" + de + ")([a-z%]*)$", "i"),
        ii = /queueHooks$/,
        ni = [G],
        ai = {
            "*": [
                function(e, t) {
                    var i = this.createTween(e, t),
                        n = i.cur(),
                        a = ti.exec(t),
                        s = a && a[3] || (ue.cssNumber[e] ? "" : "px"),
                        o = (ue.cssNumber[e] || "px" !== s && +n) && ti.exec(ue.css(i.elem, e)),
                        r = 1,
                        l = 20;
                    if (o && o[3] !== s) {
                        s = s || o[3], a = a || [], o = +n || 1;
                        do r = r || ".5", o /= r, ue.style(i.elem, e, o + s); while (r !== (r = i.cur() / n) && 1 !== r && --l)
                    }
                    return a && (o = i.start = +o || +n || 0, i.unit = s, i.end = a[1] ? o + (a[1] + 1) * a[2] : +a[2]), i
                }
            ]
        };
    ue.Animation = ue.extend(U, {
        "tweener": function(e, t) {
            ue.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var i, n = 0, a = e.length; a > n; n++) i = e[n], ai[i] = ai[i] || [], ai[i].unshift(t)
        },
        "prefilter": function(e, t) {
            t ? ni.unshift(e) : ni.push(e)
        }
    }), ue.Tween = z, z.prototype = {
        "constructor": z,
        "init": function(e, t, i, n, a, s) {
            this.elem = e, this.prop = i, this.easing = a || "swing", this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = s || (ue.cssNumber[i] ? "" : "px")
        },
        "cur": function() {
            var e = z.propHooks[this.prop];
            return e && e.get ? e.get(this) : z.propHooks._default.get(this)
        },
        "run": function(e) {
            var t, i = z.propHooks[this.prop];
            return this.pos = t = this.options.duration ? ue.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : z.propHooks._default.set(this), this
        }
    }, z.prototype.init.prototype = z.prototype, z.propHooks = {
        "_default": {
            "get": function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ue.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            "set": function(e) {
                ue.fx.step[e.prop] ? ue.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ue.cssProps[e.prop]] || ue.cssHooks[e.prop]) ? ue.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, z.propHooks.scrollTop = z.propHooks.scrollLeft = {
        "set": function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ue.each(["toggle", "show", "hide"], function(e, t) {
        var i = ue.fn[t];
        ue.fn[t] = function(e, n, a) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(Y(t, !0), e, n, a)
        }
    }), ue.fn.extend({
        "fadeTo": function(e, t, i, n) {
            return this.filter(T).css("opacity", 0).show().end().animate({
                "opacity": t
            }, e, i, n)
        },
        "animate": function(e, t, i, n) {
            var a = ue.isEmptyObject(e),
                s = ue.speed(t, i, n),
                o = function() {
                    var t = U(this, ue.extend({}, e), s);
                    (a || ue._data(this, "finish")) && t.stop(!0)
                };
            return o.finish = o, a || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
        },
        "stop": function(e, i, n) {
            var a = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = i, i = e, e = t), i && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    s = ue.timers,
                    o = ue._data(this);
                if (i) o[i] && o[i].stop && a(o[i]);
                else
                    for (i in o) o[i] && o[i].stop && ii.test(i) && a(o[i]);
                for (i = s.length; i--;) s[i].elem !== this || null != e && s[i].queue !== e || (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                (t || !n) && ue.dequeue(this, e)
            })
        },
        "finish": function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, i = ue._data(this),
                    n = i[e + "queue"],
                    a = i[e + "queueHooks"],
                    s = ue.timers,
                    o = n ? n.length : 0;
                for (i.finish = !0, ue.queue(this, e, []), a && a.stop && a.stop.call(this, !0), t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                for (t = 0; o > t; t++) n[t] && n[t].finish && n[t].finish.call(this);
                delete i.finish
            })
        }
    }), ue.each({
        "slideDown": Y("show"),
        "slideUp": Y("hide"),
        "slideToggle": Y("toggle"),
        "fadeIn": {
            "opacity": "show"
        },
        "fadeOut": {
            "opacity": "hide"
        },
        "fadeToggle": {
            "opacity": "toggle"
        }
    }, function(e, t) {
        ue.fn[e] = function(e, i, n) {
            return this.animate(t, e, i, n)
        }
    }), ue.speed = function(e, t, i) {
        var n = e && "object" == typeof e ? ue.extend({}, e) : {
            "complete": i || !i && t || ue.isFunction(e) && e,
            "duration": e,
            "easing": i && t || t && !ue.isFunction(t) && t
        };
        return n.duration = ue.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in ue.fx.speeds ? ue.fx.speeds[n.duration] : ue.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
            ue.isFunction(n.old) && n.old.call(this), n.queue && ue.dequeue(this, n.queue)
        }, n
    }, ue.easing = {
        "linear": function(e) {
            return e
        },
        "swing": function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, ue.timers = [], ue.fx = z.prototype.init, ue.fx.tick = function() {
        var e, i = ue.timers,
            n = 0;
        for (Qt = ue.now(); n < i.length; n++) e = i[n], e() || i[n] !== e || i.splice(n--, 1);
        i.length || ue.fx.stop(), Qt = t
    }, ue.fx.timer = function(e) {
        e() && ue.timers.push(e) && ue.fx.start()
    }, ue.fx.interval = 13, ue.fx.start = function() {
        Zt || (Zt = setInterval(ue.fx.tick, ue.fx.interval))
    }, ue.fx.stop = function() {
        clearInterval(Zt), Zt = null
    }, ue.fx.speeds = {
        "slow": 600,
        "fast": 200,
        "_default": 400
    }, ue.fx.step = {}, ue.expr && ue.expr.filters && (ue.expr.filters.animated = function(e) {
        return ue.grep(ue.timers, function(t) {
            return e === t.elem
        }).length
    }), ue.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            ue.offset.setOffset(this, e, t)
        });
        var i, n, a = {
                "top": 0,
                "left": 0
            }, s = this[0],
            o = s && s.ownerDocument;
        if (o) return i = o.documentElement, ue.contains(i, s) ? (typeof s.getBoundingClientRect !== J && (a = s.getBoundingClientRect()), n = R(o), {
            "top": a.top + (n.pageYOffset || i.scrollTop) - (i.clientTop || 0),
            "left": a.left + (n.pageXOffset || i.scrollLeft) - (i.clientLeft || 0)
        }) : a
    }, ue.offset = {
        "setOffset": function(e, t, i) {
            var n = ue.css(e, "position");
            "static" === n && (e.style.position = "relative");
            var a, s, o = ue(e),
                r = o.offset(),
                l = ue.css(e, "top"),
                c = ue.css(e, "left"),
                u = ("absolute" === n || "fixed" === n) && ue.inArray("auto", [l, c]) > -1,
                d = {}, h = {};
            u ? (h = o.position(), a = h.top, s = h.left) : (a = parseFloat(l) || 0, s = parseFloat(c) || 0), ue.isFunction(t) && (t = t.call(e, i, r)), null != t.top && (d.top = t.top - r.top + a), null != t.left && (d.left = t.left - r.left + s), "using" in t ? t.using.call(e, d) : o.css(d)
        }
    }, ue.fn.extend({
        "position": function() {
            if (this[0]) {
                var e, t, i = {
                        "top": 0,
                        "left": 0
                    }, n = this[0];
                return "fixed" === ue.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ue.nodeName(e[0], "html") || (i = e.offset()), i.top += ue.css(e[0], "borderTopWidth", !0), i.left += ue.css(e[0], "borderLeftWidth", !0)), {
                    "top": t.top - i.top - ue.css(n, "marginTop", !0),
                    "left": t.left - i.left - ue.css(n, "marginLeft", !0)
                }
            }
        },
        "offsetParent": function() {
            return this.map(function() {
                for (var e = this.offsetParent || X; e && !ue.nodeName(e, "html") && "static" === ue.css(e, "position");) e = e.offsetParent;
                return e || X
            })
        }
    }), ue.each({
        "scrollLeft": "pageXOffset",
        "scrollTop": "pageYOffset"
    }, function(e, i) {
        var n = /Y/.test(i);
        ue.fn[e] = function(a) {
            return ue.access(this, function(e, a, s) {
                var o = R(e);
                return s === t ? o ? i in o ? o[i] : o.document.documentElement[a] : e[a] : void(o ? o.scrollTo(n ? ue(o).scrollLeft() : s, n ? s : ue(o).scrollTop()) : e[a] = s)
            }, e, a, arguments.length, null)
        }
    }), ue.each({
        "Height": "height",
        "Width": "width"
    }, function(e, i) {
        ue.each({
            "padding": "inner" + e,
            "content": i,
            "": "outer" + e
        }, function(n, a) {
            ue.fn[a] = function(a, s) {
                var o = arguments.length && (n || "boolean" != typeof a),
                    r = n || (a === !0 || s === !0 ? "margin" : "border");
                return ue.access(this, function(i, n, a) {
                    var s;
                    return ue.isWindow(i) ? i.document.documentElement["client" + e] : 9 === i.nodeType ? (s = i.documentElement, Math.max(i.body["scroll" + e], s["scroll" + e], i.body["offset" + e], s["offset" + e], s["client" + e])) : a === t ? ue.css(i, n, r) : ue.style(i, n, a, r)
                }, i, o ? a : t, o, null)
            }
        })
    }), ue.fn.size = function() {
        return this.length
    }, ue.fn.andSelf = ue.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ue : (e.jQuery = e.$ = ue, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ue
    }))
}(window),
function() {
    var e = !1,
        t = /xyz/.test(function() {
            xyz
        }) ? /\b_super\b/ : /.*/;
    this.Class = function() {}, Class.extend = function(i) {
        function n() {
            !e && this.init && this.init.apply(this, arguments)
        }
        var a = this.prototype;
        e = !0;
        var s = new this;
        e = !1;
        for (var o in i) s[o] = "function" == typeof i[o] && "function" == typeof a[o] && t.test(i[o]) ? function(e, t) {
            return function() {
                var i = this._super;
                this._super = a[e];
                var n = t.apply(this, arguments);
                return this._super = i, n
            }
        }(o, i[o]) : i[o];
        return n.prototype = s, n.prototype.constructor = n, n.extend = arguments.callee, n
    }
}(),
function(e) {
    "$:nomunge";
    var t, i, n, a, s = 1,
        o = this,
        r = !1,
        l = "postMessage",
        c = "addEventListener",
        u = o[l];
    e[l] = function(t, i, n) {
        i && (t = "string" == typeof t ? t : e.param(t), n = n || parent, u ? n[l](t, i.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : i && (n.location = i.replace(/#.*$/, "") + "#" + +new Date + s+++"&" + t))
    }, e.receiveMessage = a = function(s, l, d) {
        u ? (s && (n && a(), n = function(t) {
            return "string" == typeof l && t.origin !== l || e.isFunction(l) && l(t.origin) === r ? r : void s(t)
        }), o[c] ? o[s ? c : "removeEventListener"]("message", n, r) : o[s ? "attachEvent" : "detachEvent"]("onmessage", n)) : (t && clearInterval(t), t = null, s && (d = "number" == typeof l ? l : "number" == typeof d ? d : 100, t = setInterval(function() {
            var e = document.location.hash,
                t = /^#?\d+&/;
            e !== i && t.test(e) && (i = e, s({
                "data": e.replace(t, "")
            }))
        }, d)))
    }
}(jQuery),
function(e, t, i) {
    var n, a = t.event;
    a.special.smartscroll = {
        "setup": function() {
            t(this).bind("scroll", t.event.special.smartscroll.handler)
        },
        "teardown": function() {
            t(this).unbind("scroll", t.event.special.smartscroll.handler)
        },
        "handler": function(e, i) {
            var a = this,
                s = arguments;
            e.type = "smartscroll", n && clearTimeout(n), n = setTimeout(function() {
                t(a).trigger(e.type, s)
            }, "execAsap" === i ? 0 : 100)
        }
    }, t.fn.smartscroll = function(e) {
        return e ? this.bind("smartscroll", e) : this.trigger("smartscroll", ["execAsap"])
    }
}(window, jQuery),
function(e) {
    var t = {
        "method": "GET",
        "contentType": "json",
        "queryParam": "q",
        "searchDelay": 300,
        "minChars": 1,
        "propertyToSearch": "name",
        "jsonContainer": null,
        "scrollKeyboard": !1,
        "hintText": null,
        "noResultsText": null,
        "noResultsHideDropdown": !1,
        "searchingText": null,
        "deleteText": "&times;",
        "animateDropdown": !0,
        "emptyInputLength": null,
        "tokenLimit": null,
        "tokenDelimiter": ",",
        "preventDuplicates": !1,
        "tokenValue": "id",
        "prePopulate": null,
        "processPrePopulate": !1,
        "idPrefix": "token-input-",
        "resultsFormatter": function(e) {
            return "<li>" + e[this.propertyToSearch] + "</li>"
        },
        "tokenFormatter": function(e) {
            return "<li><p>" + e[this.propertyToSearch] + "</p></li>"
        },
        "validateItem": null,
        "noHoverSelect": !1,
        "onResult": null,
        "onAdd": null,
        "onDelete": null,
        "onReady": null
    }, i = {
            "tokenList": "token-input-list",
            "token": "token-input-token",
            "tokenDelete": "token-input-delete-token",
            "selectedToken": "token-input-selected-token",
            "highlightedToken": "token-input-highlighted-token",
            "dropdown": "token-input-dropdown",
            "dropdownItem": "token-input-dropdown-item",
            "dropdownItem2": "token-input-dropdown-item2",
            "selectedDropdownItem": "token-input-selected-dropdown-item",
            "inputToken": "token-input-input-token"
        }, n = {
            "BEFORE": 0,
            "AFTER": 1,
            "END": 2
        }, a = {
            "BACKSPACE": 8,
            "TAB": 9,
            "ENTER": 13,
            "ESCAPE": 27,
            "SPACE": 32,
            "PAGE_UP": 33,
            "PAGE_DOWN": 34,
            "END": 35,
            "HOME": 36,
            "LEFT": 37,
            "UP": 38,
            "RIGHT": 39,
            "DOWN": 40,
            "NUMPAD_ENTER": 108,
            "COMMA": 188
        }, s = {
            "init": function(i, n) {
                var a = e.extend({}, t, n || {});
                return this.each(function() {
                    e(this).data("tokenInputObject", new e.TokenList(this, i, a))
                })
            },
            "clear": function() {
                return this.data("tokenInputObject").clear(), this
            },
            "add": function(e) {
                return this.data("tokenInputObject").add(e), this
            },
            "remove": function(e) {
                return this.data("tokenInputObject").remove(e), this
            },
            "get": function() {
                return this.data("tokenInputObject").getTokens()
            }
        };
    e.fn.tokenInput = function(e) {
        return s[e] ? s[e].apply(this, Array.prototype.slice.call(arguments, 1)) : s.init.apply(this, arguments)
    }, e.TokenList = function(t, s, o) {
        function r() {
            var t = e(O).data("tokeninput");
            return !t && o.textToData && (t = o.textToData(A.val())), t ? (d(t), q.change(), !1) : void 0
        }

        function l() {
            return null !== o.tokenLimit && I >= o.tokenLimit ? (A.hide(), void v()) : void 0
        }

        function c() {
            if (M !== (M = A.val())) {
                var e = M.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                j.html(e);
                var t = 30;
                o.emptyInputLength && N.children().length < 2 && (t = o.emptyInputLength), A.width(j.width() + t)
            }
        }

        function u(t) {
            var i = o.tokenFormatter(t);
            i = e(i).addClass(o.classes.token).insertBefore(H), e("<span>" + o.deleteText + "</span>").addClass(o.classes.tokenDelete).appendTo(i).click(function() {
                return g(e(this).parent()), q.change(), !1
            });
            var n = {
                "id": t.id
            };
            return n[o.propertyToSearch] = t[o.propertyToSearch], n.item = t, e.data(i.get(0), "tokeninput", t), D = D.slice(0, F).concat([n]).concat(D.slice(F)), F++, m(D, q), I += 1, null !== o.tokenLimit && I >= o.tokenLimit && (A.hide(), v()), i
        }

        function d(t) {
            if (t) {
                if (e.isFunction(o.validateItem) && !o.validateItem(t)) return !1;
                var i = o.onAdd;
                if (I > 0 && o.preventDuplicates) {
                    var n = null;
                    if (N.children().each(function() {
                        var i = e(this),
                            a = e.data(i.get(0), "tokeninput");
                        return a && a.id === t.id ? (n = i, !1) : void 0
                    }), n) return h(n), H.insertAfter(n), void A.focus()
                }(null == o.tokenLimit || I < o.tokenLimit) && (u(t), l()), A.val(""), v(), e.isFunction(i) && i.call(q, t)
            }
        }

        function h(e) {
            e.addClass(o.classes.selectedToken), P = e.get(0), A.val(""), v()
        }

        function p(e, t) {
            e.removeClass(o.classes.selectedToken), P = null, t === n.BEFORE ? (H.insertBefore(e), F--) : t === n.AFTER ? (H.insertAfter(e), F++) : (H.appendTo(N), F = I), A.focus()
        }

        function f(t) {
            var i = P;
            P && p(e(P), n.END), i === t.get(0) ? p(t, n.END) : h(t)
        }

        function g(t) {
            var i = e.data(t.get(0), "tokeninput"),
                n = o.onDelete,
                a = t.prevAll().length;
            a > F && a--, t.remove(), P = null, A.focus(), D = D.slice(0, a).concat(D.slice(a + 1)), F > a && F--, m(D, q), I -= 1, null !== o.tokenLimit && A.show().val("").focus(), e.isFunction(n) && n.call(q, i)
        }

        function m(t, i) {
            var n = e.map(t, function(e) {
                return e[o.tokenValue]
            });
            i.val(n.join(o.tokenDelimiter))
        }

        function v() {
            U.hide().empty(), O = null
        }

        function _() {
            U.css({
                "position": "absolute",
                "top": e(N).offset().top + e(N).outerHeight(),
                "left": e(N).offset().left,
                "zindex": 999
            }).show()
        }

        function b() {
            o.searchingText && (U.html("<p>" + o.searchingText + "</p>"), _())
        }

        function y() {
            o.hintText && (U.html("<p>" + o.hintText + "</p>"), _())
        }

        function S(t, i) {
            if (i && i.length) {
                U.empty();
                var n = e("<ul>").appendTo(U).mouseover(function(t) {
                    w(e(t.target).closest("li"))
                }).mousedown(function(t) {
                    return d(e(t.target).closest("li").data("tokeninput")), q.change(), !1
                }).hide();
                o.noHoverSelect && (n.off("mouseover"), n.on("mouseover", function(t) {
                    e(this).find("li").removeClass(o.classes.selectedDropdownItem), e(t.target).closest("li").addClass(o.classes.selectedDropdownItem)
                })), e.each(i, function(t, i) {
                    var a = o.resultsFormatter(i);
                    a = e(a).appendTo(n), a.addClass(t % 2 ? o.classes.dropdownItem : o.classes.dropdownItem2), e.data(a.get(0), "tokeninput", i)
                }), _(), o.animateDropdown ? n.slideDown("fast") : n.show()
            } else o.noResultsText && (U.html("<p>" + o.noResultsText + "</p>"), _()), o.noResultsHideDropdown && v()
        }

        function w(t, i) {
            if (t) {
                if (O && T(e(O)), o.scrollKeyboard && i) {
                    var n = e(".token-input-dropdown-fortag ul"),
                        a = n.height(),
                        s = t.outerHeight(),
                        r = t.position().top;
                    if (r > a) {
                        var l = n.scrollTop();
                        n.scrollTop(l + s)
                    } else if (0 > r) {
                        var l = n.scrollTop();
                        n.scrollTop(l - s)
                    }
                }
                t.addClass(o.classes.selectedDropdownItem), O = t.get(0)
            }
        }

        function T(e) {
            e.removeClass(o.classes.selectedDropdownItem), O = null
        }

        function k() {
            var t = A.val().toLowerCase();
            (t && t.length || 0 == o.minChars) && (P && p(e(P), n.AFTER), t.length >= o.minChars ? (b(), clearTimeout(E), E = setTimeout(function() {
                x(t)
            }, o.searchDelay)) : v())
        }

        function x(t) {
            var i = t + C(),
                n = L.get(i);
            if (n) S(t, n);
            else if (o.url) {
                var a = C(),
                    s = {};
                if (s.data = {}, a.indexOf("?") > -1) {
                    var r = a.split("?");
                    s.url = r[0];
                    var l = r[1].split("&");
                    e.each(l, function(e, t) {
                        var i = t.split("=");
                        s.data[i[0]] = i[1]
                    })
                } else s.url = a;
                s.data[o.queryParam] = t, s.type = o.method, s.dataType = o.contentType, o.crossDomain && (s.dataType = "jsonp"), s.success = function(n) {
                    e.isFunction(o.onResult) && (n = o.onResult.call(q, n)), L.add(i, o.jsonContainer ? n[o.jsonContainer] : n), A.val().toLowerCase() === t && S(t, o.jsonContainer ? n[o.jsonContainer] : n)
                }, e.ajax(s)
            } else if (o.search_function) o.search_function(t, function(e) {
                L.add(i, e), S(t, e)
            });
            else if (o.local_data) {
                var c = e.grep(o.local_data, function(e) {
                    return e[o.propertyToSearch].toLowerCase().indexOf(t.toLowerCase()) > -1
                });
                e.isFunction(o.onResult) && (c = o.onResult.call(q, c)), L.add(i, c), S(t, c)
            }
        }

        function C() {
            var e = o.url;
            return "function" == typeof o.url && (e = o.url.call()), e
        }
        if ("string" === e.type(s) || "function" === e.type(s)) {
            o.url = s;
            var $ = C();
            void 0 === o.crossDomain && (o.crossDomain = -1 === $.indexOf("://") ? !1 : location.href.split(/\/+/g)[1] !== $.split(/\/+/g)[1])
        } else "object" == typeof s && (o.local_data = s);
        o.classes ? o.classes = e.extend({}, i, o.classes) : o.theme ? (o.classes = {}, e.each(i, function(e, t) {
            o.classes[e] = t + "-" + o.theme
        })) : o.classes = i;
        var E, M, D = [],
            I = 0,
            L = new e.TokenList.Cache,
            A = e('<input type="text"  autocomplete="off">').css({
                "outline": "none"
            }).attr("id", o.idPrefix + t.id).focus(function() {
                0 == o.minChars && setTimeout(function() {
                    k()
                }, 5), (null === o.tokenLimit || o.tokenLimit !== I) && y()
            }).blur(function() {
                r(), v(), e(this).val("")
            }).bind("keyup keydown blur update", c).keydown(function(t) {
                var i, s;
                switch (t.keyCode) {
                    case a.LEFT:
                    case a.RIGHT:
                    case a.UP:
                    case a.DOWN:
                        if (e(this).val()) {
                            if (t.keyCode === a.UP || t.keyCode === a.DOWN) {
                                var o = null;
                                return o = O || t.keyCode !== a.DOWN ? t.keyCode === a.DOWN ? e(O).next() : e(O).prev() : e(".token-input-dropdown li").first(), o.length ? w(o, !0) : t.keyCode !== a.DOWN && e(O).length && T(e(O)), !1
                            }
                        } else i = H.prev(), s = H.next(), i.length && i.get(0) === P || s.length && s.get(0) === P ? t.keyCode === a.LEFT || t.keyCode === a.UP ? p(e(P), n.BEFORE) : p(e(P), n.AFTER) : t.keyCode !== a.LEFT && t.keyCode !== a.UP || !i.length ? t.keyCode !== a.RIGHT && t.keyCode !== a.DOWN || !s.length || h(e(s.get(0))) : h(e(i.get(0)));
                        break;
                    case a.BACKSPACE:
                        if (i = H.prev(), !e(this).val().length) return P ? (g(e(P)), q.change()) : i.length && h(e(i.get(0))), !1;
                        1 === e(this).val().length ? v() : setTimeout(function() {
                            k()
                        }, 5);
                        break;
                    case a.TAB:
                    case a.ENTER:
                    case a.NUMPAD_ENTER:
                    case a.COMMA:
                        t.keyCode != a.ENTER && t.keyCode != a.NUMPAD_ENTER && t.preventDefault(), r();
                        break;
                    case a.ESCAPE:
                        return v(), !0;
                    default:
                        String.fromCharCode(t.which) && setTimeout(function() {
                            k()
                        }, 5)
                }
            }),
            q = e(t).hide().val("").focus(function() {
                A.focus()
            }).blur(function() {
                A.blur()
            }),
            P = null,
            F = 0,
            O = null,
            N = e("<ul />").addClass(o.classes.tokenList).click(function(t) {
                var i = e(t.target).closest("li");
                i && i.get(0) && e.data(i.get(0), "tokeninput") ? f(i) : (P && p(e(P), n.END), A.focus())
            }).mouseover(function(t) {
                var i = e(t.target).closest("li");
                i && P !== this && i.addClass(o.classes.highlightedToken)
            }).mouseout(function(t) {
                var i = e(t.target).closest("li");
                i && P !== this && i.removeClass(o.classes.highlightedToken)
            }).insertBefore(q),
            H = e("<li />").addClass(o.classes.inputToken).appendTo(N).append(A),
            U = e("<div>").addClass(o.classes.dropdown).appendTo("body").hide(),
            j = e("<tester/>").insertAfter(A).css({
                "position": "absolute",
                "top": -9999,
                "left": -9999,
                "width": "auto",
                "fontSize": A.css("fontSize"),
                "fontFamily": A.css("fontFamily"),
                "fontWeight": A.css("fontWeight"),
                "letterSpacing": A.css("letterSpacing"),
                "whiteSpace": "nowrap"
            });
        q.val("");
        var G = o.prePopulate || q.data("pre");
        o.processPrePopulate && e.isFunction(o.onResult) && (G = o.onResult.call(q, G)), G && G.length && e.each(G, function(e, t) {
            u(t), l()
        }), e.isFunction(o.onReady) && (o.onReady.call(), 0 == o.minChars && setTimeout(function() {
            k()
        }, 5)), this.clear = function() {
            N.children("li").each(function() {
                0 === e(this).children("input").length && g(e(this))
            })
        }, this.add = function(e) {
            d(e)
        }, this.remove = function(t) {
            N.children("li").each(function() {
                if (0 === e(this).children("input").length) {
                    var i = e(this).data("tokeninput"),
                        n = !0;
                    for (var a in t)
                        if (t[a] !== i[a]) {
                            n = !1;
                            break
                        }
                    n && g(e(this))
                }
            })
        }, this.getTokens = function() {
            return D
        }
    }, e.TokenList.Cache = function(t) {
        var i = e.extend({
            "max_size": 500
        }, t),
            n = {}, a = 0,
            s = function() {
                n = {}, a = 0
            };
        this.add = function(e, t) {
            a > i.max_size && s(), n[e] || (a += 1), n[e] = t
        }, this.get = function(e) {
            return n[e]
        }
    }
}(jQuery),
function(e, t, i) {
    function n(e, t, i) {
        return e.addEventListener ? void e.addEventListener(t, i, !1) : void e.attachEvent("on" + t, i)
    }

    function a(e) {
        if ("keypress" == e.type) {
            var t = String.fromCharCode(e.which);
            return e.shiftKey || (t = t.toLowerCase()), t
        }
        return v[e.which] ? v[e.which] : _[e.which] ? _[e.which] : String.fromCharCode(e.which).toLowerCase()
    }

    function s(e, t) {
        return e.sort().join(",") === t.sort().join(",")
    }

    function o(e) {
        var t = [];
        return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), e.metaKey && t.push("meta"), t
    }

    function r(e) {
        return e.preventDefault ? void e.preventDefault() : void(e.returnValue = !1)
    }

    function l(e) {
        return e.stopPropagation ? void e.stopPropagation() : void(e.cancelBubble = !0)
    }

    function c(e) {
        return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e
    }

    function u() {
        if (!m) {
            m = {};
            for (var e in v) e > 95 && 112 > e || v.hasOwnProperty(e) && (m[v[e]] = e)
        }
        return m
    }

    function d(e, t, i) {
        return i || (i = u()[e] ? "keydown" : "keypress"), "keypress" == i && t.length && (i = "keydown"), i
    }

    function h(e) {
        return "+" === e ? ["+"] : (e = e.replace(/\+{2}/g, "+plus"), e.split("+"))
    }

    function p(e, t) {
        var i, n, a, s = [];
        for (i = h(e), a = 0; a < i.length; ++a) n = i[a], y[n] && (n = y[n]), t && "keypress" != t && b[n] && (n = b[n], s.push("shift")), c(n) && s.push(n);
        return t = d(n, s, t), {
            "key": n,
            "modifiers": s,
            "action": t
        }
    }

    function f(e, i) {
        return e === t ? !1 : e === i ? !0 : f(e.parentNode, i)
    }

    function g(e) {
        function i(e) {
            e = e || {};
            var t, i = !1;
            for (t in y) e[t] ? i = !0 : y[t] = 0;
            i || (T = !1)
        }

        function u(e, t, i, n, a, o) {
            var r, l, u = [],
                d = i.type;
            if (!_._callbacks[e]) return [];
            for ("keyup" == d && c(e) && (t = [e]), r = 0; r < _._callbacks[e].length; ++r)
                if (l = _._callbacks[e][r], (n || !l.seq || y[l.seq] == l.level) && d == l.action && ("keypress" == d && !i.metaKey && !i.ctrlKey || s(t, l.modifiers))) {
                    var h = !n && l.combo == a,
                        p = n && l.seq == n && l.level == o;
                    (h || p) && _._callbacks[e].splice(r, 1), u.push(l)
                }
            return u
        }

        function d(e, t, i, n) {
            _.stopCallback(t, t.target || t.srcElement, i, n) || e(t, i) === !1 && (r(t), l(t))
        }

        function h(e) {
            "number" != typeof e.which && (e.which = e.keyCode);
            var t = a(e);
            if (t) return "keyup" == e.type && S === t ? void(S = !1) : void _.handleKey(t, o(e), e)
        }

        function f() {
            clearTimeout(b), b = setTimeout(i, 1e3)
        }

        function m(e, t, n, s) {
            function o(t) {
                return function() {
                    T = t, ++y[e], f()
                }
            }

            function r(t) {
                d(n, t, e), "keyup" !== s && (S = a(t)), setTimeout(i, 10)
            }
            y[e] = 0;
            for (var l = 0; l < t.length; ++l) {
                var c = l + 1 === t.length,
                    u = c ? r : o(s || p(t[l + 1]).action);
                v(t[l], u, s, e, l)
            }
        }

        function v(e, t, i, n, a) {
            _._directMap[e + ":" + i] = t, e = e.replace(/\s+/g, " ");
            var s, o = e.split(" ");
            return o.length > 1 ? void m(e, o, t, i) : (s = p(e, i), _._callbacks[s.key] = _._callbacks[s.key] || [], u(s.key, s.modifiers, {
                "type": s.action
            }, n, e, a), void _._callbacks[s.key][n ? "unshift" : "push"]({
                "callback": t,
                "modifiers": s.modifiers,
                "action": s.action,
                "seq": n,
                "level": a,
                "combo": e
            }))
        }
        var _ = this;
        if (e = e || t, !(_ instanceof g)) return new g(e);
        _.target = e, _._callbacks = {}, _._directMap = {};
        var b, y = {}, S = !1,
            w = !1,
            T = !1;
        _._handleKey = function(e, t, n) {
            var a, s = u(e, t, n),
                o = {}, r = 0,
                l = !1;
            for (a = 0; a < s.length; ++a) s[a].seq && (r = Math.max(r, s[a].level));
            for (a = 0; a < s.length; ++a)
                if (s[a].seq) {
                    if (s[a].level != r) continue;
                    l = !0, o[s[a].seq] = 1, d(s[a].callback, n, s[a].combo, s[a].seq)
                } else l || d(s[a].callback, n, s[a].combo);
            var h = "keypress" == n.type && w;
            n.type != T || c(e) || h || i(o), w = l && "keydown" == n.type
        }, _._bindMultiple = function(e, t, i) {
            for (var n = 0; n < e.length; ++n) v(e[n], t, i)
        }, n(e, "keypress", h), n(e, "keydown", h), n(e, "keyup", h)
    }
    for (var m, v = {
            "8": "backspace",
            "9": "tab",
            "13": "enter",
            "16": "shift",
            "17": "ctrl",
            "18": "alt",
            "20": "capslock",
            "27": "esc",
            "32": "space",
            "33": "pageup",
            "34": "pagedown",
            "35": "end",
            "36": "home",
            "37": "left",
            "38": "up",
            "39": "right",
            "40": "down",
            "45": "ins",
            "46": "del",
            "91": "meta",
            "93": "meta",
            "224": "meta"
        }, _ = {
            "106": "*",
            "107": "+",
            "109": "-",
            "110": ".",
            "111": "/",
            "186": ";",
            "187": "=",
            "188": ",",
            "189": "-",
            "190": ".",
            "191": "/",
            "192": "`",
            "219": "[",
            "220": "\\",
            "221": "]",
            "222": "'"
        }, b = {
            "~": "`",
            "!": "1",
            "@": "2",
            "#": "3",
            "$": "4",
            "%": "5",
            "^": "6",
            "&": "7",
            "*": "8",
            "(": "9",
            ")": "0",
            "_": "-",
            "+": "=",
            ":": ";",
            '"': "'",
            "<": ",",
            ">": ".",
            "?": "/",
            "|": "\\"
        }, y = {
            "option": "alt",
            "command": "meta",
            "return": "enter",
            "escape": "esc",
            "plus": "+",
            "mod": /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
        }, S = 1; 20 > S; ++S) v[111 + S] = "f" + S;
    for (S = 0; 9 >= S; ++S) v[S + 96] = S;
    g.prototype.bind = function(e, t, i) {
        var n = this;
        return e = e instanceof Array ? e : [e], n._bindMultiple.call(n, e, t, i), n
    }, g.prototype.unbind = function(e, t) {
        var i = this;
        return i.bind.call(i, e, function() {}, t)
    }, g.prototype.trigger = function(e, t) {
        var i = this;
        return i._directMap[e + ":" + t] && i._directMap[e + ":" + t]({}, e), i
    }, g.prototype.reset = function() {
        var e = this;
        return e._callbacks = {}, e._directMap = {}, e
    }, g.prototype.stopCallback = function(e, t) {
        var i = this;
        return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : f(t, i.target) ? !1 : "INPUT" == t.tagName || "SELECT" == t.tagName || "TEXTAREA" == t.tagName || t.isContentEditable
    }, g.prototype.handleKey = function() {
        var e = this;
        return e._handleKey.apply(e, arguments)
    }, g.init = function() {
        var e = g(t);
        for (var i in e) "_" !== i.charAt(0) && (g[i] = function(t) {
            return function() {
                return e[t].apply(e, arguments)
            }
        }(i))
    }, g.init(), e.Mousetrap = g, "undefined" != typeof module && module.exports && (module.exports = g), "function" == typeof define && define.amd && define(function() {
        return g
    })
}(window, document),
function(e) {
    function t() {
        return {
            "empty": !1,
            "unusedTokens": [],
            "unusedInput": [],
            "overflow": -2,
            "charsLeftOver": 0,
            "nullInput": !1,
            "invalidMonth": null,
            "invalidFormat": !1,
            "userInvalidated": !1,
            "iso": !1
        }
    }

    function i(e, t) {
        return function(i) {
            return u(e.call(this, i), t)
        }
    }

    function n(e, t) {
        return function(i) {
            return this.lang().ordinal(e.call(this, i), t)
        }
    }

    function a() {}

    function s(e) {
        w(e), r(this, e)
    }

    function o(e) {
        var t = m(e),
            i = t.year || 0,
            n = t.month || 0,
            a = t.week || 0,
            s = t.day || 0,
            o = t.hour || 0,
            r = t.minute || 0,
            l = t.second || 0,
            c = t.millisecond || 0;
        this._milliseconds = +c + 1e3 * l + 6e4 * r + 36e5 * o, this._days = +s + 7 * a, this._months = +n + 12 * i, this._data = {}, this._bubble()
    }

    function r(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
        return t.hasOwnProperty("toString") && (e.toString = t.toString), t.hasOwnProperty("valueOf") && (e.valueOf = t.valueOf), e
    }

    function l(e) {
        var t, i = {};
        for (t in e) e.hasOwnProperty(t) && me.hasOwnProperty(t) && (i[t] = e[t]);
        return i
    }

    function c(e) {
        return 0 > e ? Math.ceil(e) : Math.floor(e)
    }

    function u(e, t, i) {
        for (var n = "" + Math.abs(e), a = e >= 0; n.length < t;) n = "0" + n;
        return (a ? i ? "+" : "" : "-") + n
    }

    function d(e, t, i, n) {
        var a, s, o = t._milliseconds,
            r = t._days,
            l = t._months;
        o && e._d.setTime(+e._d + o * i), (r || l) && (a = e.minute(), s = e.hour()), r && e.date(e.date() + r * i), l && e.month(e.month() + l * i), o && !n && ne.updateOffset(e), (r || l) && (e.minute(a), e.hour(s))
    }

    function h(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function p(e) {
        return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date
    }

    function f(e, t, i) {
        var n, a = Math.min(e.length, t.length),
            s = Math.abs(e.length - t.length),
            o = 0;
        for (n = 0; a > n; n++)(i && e[n] !== t[n] || !i && _(e[n]) !== _(t[n])) && o++;
        return o + s
    }

    function g(e) {
        if (e) {
            var t = e.toLowerCase().replace(/(.)s$/, "$1");
            e = Re[e] || Be[t] || t
        }
        return e
    }

    function m(e) {
        var t, i, n = {};
        for (i in e) e.hasOwnProperty(i) && (t = g(i), t && (n[t] = e[i]));
        return n
    }

    function v(t) {
        var i, n;
        if (0 === t.indexOf("week")) i = 7, n = "day";
        else {
            if (0 !== t.indexOf("month")) return;
            i = 12, n = "month"
        }
        ne[t] = function(a, s) {
            var o, r, l = ne.fn._lang[t],
                c = [];
            if ("number" == typeof a && (s = a, a = e), r = function(e) {
                var t = ne().utc().set(n, e);

                return l.call(ne.fn._lang, t, a || "")
            }, null != s) return r(s);
            for (o = 0; i > o; o++) c.push(r(o));
            return c
        }
    }

    function _(e) {
        var t = +e,
            i = 0;
        return 0 !== t && isFinite(t) && (i = t >= 0 ? Math.floor(t) : Math.ceil(t)), i
    }

    function b(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
    }

    function y(e) {
        return S(e) ? 366 : 365
    }

    function S(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
    }

    function w(e) {
        var t;
        e._a && -2 === e._pf.overflow && (t = e._a[ce] < 0 || e._a[ce] > 11 ? ce : e._a[ue] < 1 || e._a[ue] > b(e._a[le], e._a[ce]) ? ue : e._a[de] < 0 || e._a[de] > 23 ? de : e._a[he] < 0 || e._a[he] > 59 ? he : e._a[pe] < 0 || e._a[pe] > 59 ? pe : e._a[fe] < 0 || e._a[fe] > 999 ? fe : -1, e._pf._overflowDayOfYear && (le > t || t > ue) && (t = ue), e._pf.overflow = t)
    }

    function T(e) {
        return null == e._isValid && (e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated, e._strict && (e._isValid = e._isValid && 0 === e._pf.charsLeftOver && 0 === e._pf.unusedTokens.length)), e._isValid
    }

    function k(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }

    function x(e, t) {
        return t._isUTC ? ne(e).zone(t._offset || 0) : ne(e).local()
    }

    function C(e, t) {
        return t.abbr = e, ge[e] || (ge[e] = new a), ge[e].set(t), ge[e]
    }

    function $(e) {
        delete ge[e]
    }

    function E(e) {
        var t, i, n, a, s = 0,
            o = function(e) {
                if (!ge[e] && ve) try {
                    require("./lang/" + e)
                } catch (t) {}
                return ge[e]
            };
        if (!e) return ne.fn._lang;
        if (!h(e)) {
            if (i = o(e)) return i;
            e = [e]
        }
        for (; s < e.length;) {
            for (a = k(e[s]).split("-"), t = a.length, n = k(e[s + 1]), n = n ? n.split("-") : null; t > 0;) {
                if (i = o(a.slice(0, t).join("-"))) return i;
                if (n && n.length >= t && f(a, n, !0) >= t - 1) break;
                t--
            }
            s++
        }
        return ne.fn._lang
    }

    function M(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function D(e) {
        var t, i, n = e.match(Se);
        for (t = 0, i = n.length; i > t; t++) n[t] = Ke[n[t]] ? Ke[n[t]] : M(n[t]);
        return function(a) {
            var s = "";
            for (t = 0; i > t; t++) s += n[t] instanceof Function ? n[t].call(a, e) : n[t];
            return s
        }
    }

    function I(e, t) {
        return e.isValid() ? (t = L(t, e.lang()), We[t] || (We[t] = D(t)), We[t](e)) : e.lang().invalidDate()
    }

    function L(e, t) {
        function i(e) {
            return t.longDateFormat(e) || e
        }
        var n = 5;
        for (we.lastIndex = 0; n >= 0 && we.test(e);) e = e.replace(we, i), we.lastIndex = 0, n -= 1;
        return e
    }

    function A(e, t) {
        var i, n = t._strict;
        switch (e) {
            case "DDDD":
                return qe;
            case "YYYY":
            case "GGGG":
            case "gggg":
                return n ? Pe : xe;
            case "Y":
            case "G":
            case "g":
                return Oe;
            case "YYYYYY":
            case "YYYYY":
            case "GGGGG":
            case "ggggg":
                return n ? Fe : Ce;
            case "S":
                if (n) return Le;
            case "SS":
                if (n) return Ae;
            case "SSS":
                if (n) return qe;
            case "DDD":
                return ke;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return Ee;
            case "a":
            case "A":
                return E(t._l)._meridiemParse;
            case "X":
                return Ie;
            case "Z":
            case "ZZ":
                return Me;
            case "T":
                return De;
            case "SSSS":
                return $e;
            case "MM":
            case "DD":
            case "YY":
            case "GG":
            case "gg":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "ww":
            case "WW":
                return n ? Ae : Te;
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
            case "w":
            case "W":
            case "e":
            case "E":
                return Te;
            default:
                return i = new RegExp(j(U(e.replace("\\", "")), "i"))
        }
    }

    function q(e) {
        e = e || "";
        var t = e.match(Me) || [],
            i = t[t.length - 1] || [],
            n = (i + "").match(Ge) || ["-", 0, 0],
            a = +(60 * n[1]) + _(n[2]);
        return "+" === n[0] ? -a : a
    }

    function P(e, t, i) {
        var n, a = i._a;
        switch (e) {
            case "M":
            case "MM":
                null != t && (a[ce] = _(t) - 1);
                break;
            case "MMM":
            case "MMMM":
                n = E(i._l).monthsParse(t), null != n ? a[ce] = n : i._pf.invalidMonth = t;
                break;
            case "D":
            case "DD":
                null != t && (a[ue] = _(t));
                break;
            case "DDD":
            case "DDDD":
                null != t && (i._dayOfYear = _(t));
                break;
            case "YY":
                a[le] = _(t) + (_(t) > 68 ? 1900 : 2e3);
                break;
            case "YYYY":
            case "YYYYY":
            case "YYYYYY":
                a[le] = _(t);
                break;
            case "a":
            case "A":
                i._isPm = E(i._l).isPM(t);
                break;
            case "H":
            case "HH":
            case "h":
            case "hh":
                a[de] = _(t);
                break;
            case "m":
            case "mm":
                a[he] = _(t);
                break;
            case "s":
            case "ss":
                a[pe] = _(t);
                break;
            case "S":
            case "SS":
            case "SSS":
            case "SSSS":
                a[fe] = _(1e3 * ("0." + t));
                break;
            case "X":
                i._d = new Date(1e3 * parseFloat(t));
                break;
            case "Z":
            case "ZZ":
                i._useUTC = !0, i._tzm = q(t);
                break;
            case "w":
            case "ww":
            case "W":
            case "WW":
            case "d":
            case "dd":
            case "ddd":
            case "dddd":
            case "e":
            case "E":
                e = e.substr(0, 1);
            case "gg":
            case "gggg":
            case "GG":
            case "GGGG":
            case "GGGGG":
                e = e.substr(0, 2), t && (i._w = i._w || {}, i._w[e] = t)
        }
    }

    function F(e) {
        var t, i, n, a, s, o, r, l, c, u, d = [];
        if (!e._d) {
            for (n = N(e), e._w && null == e._a[ue] && null == e._a[ce] && (s = function(t) {
                var i = parseInt(t, 10);
                return t ? t.length < 3 ? i > 68 ? 1900 + i : 2e3 + i : i : null == e._a[le] ? ne().weekYear() : e._a[le]
            }, o = e._w, null != o.GG || null != o.W || null != o.E ? r = X(s(o.GG), o.W || 1, o.E, 4, 1) : (l = E(e._l), c = null != o.d ? W(o.d, l) : null != o.e ? parseInt(o.e, 10) + l._week.dow : 0, u = parseInt(o.w, 10) || 1, null != o.d && c < l._week.dow && u++, r = X(s(o.gg), u, c, l._week.doy, l._week.dow)), e._a[le] = r.year, e._dayOfYear = r.dayOfYear), e._dayOfYear && (a = null == e._a[le] ? n[le] : e._a[le], e._dayOfYear > y(a) && (e._pf._overflowDayOfYear = !0), i = B(a, 0, e._dayOfYear), e._a[ce] = i.getUTCMonth(), e._a[ue] = i.getUTCDate()), t = 0; 3 > t && null == e._a[t]; ++t) e._a[t] = d[t] = n[t];
            for (; 7 > t; t++) e._a[t] = d[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            d[de] += _((e._tzm || 0) / 60), d[he] += _((e._tzm || 0) % 60), e._d = (e._useUTC ? B : R).apply(null, d)
        }
    }

    function O(e) {
        var t;
        e._d || (t = m(e._i), e._a = [t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond], F(e))
    }

    function N(e) {
        var t = new Date;
        return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
    }

    function H(e) {
        e._a = [], e._pf.empty = !0;
        var t, i, n, a, s, o = E(e._l),
            r = "" + e._i,
            l = r.length,
            c = 0;
        for (n = L(e._f, o).match(Se) || [], t = 0; t < n.length; t++) a = n[t], i = (r.match(A(a, e)) || [])[0], i && (s = r.substr(0, r.indexOf(i)), s.length > 0 && e._pf.unusedInput.push(s), r = r.slice(r.indexOf(i) + i.length), c += i.length), Ke[a] ? (i ? e._pf.empty = !1 : e._pf.unusedTokens.push(a), P(a, i, e)) : e._strict && !i && e._pf.unusedTokens.push(a);
        e._pf.charsLeftOver = l - c, r.length > 0 && e._pf.unusedInput.push(r), e._isPm && e._a[de] < 12 && (e._a[de] += 12), e._isPm === !1 && 12 === e._a[de] && (e._a[de] = 0), F(e), w(e)
    }

    function U(e) {
        return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, i, n, a) {
            return t || i || n || a
        })
    }

    function j(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function G(e) {
        var i, n, a, s, o;
        if (0 === e._f.length) return e._pf.invalidFormat = !0, void(e._d = new Date(0 / 0));
        for (s = 0; s < e._f.length; s++) o = 0, i = r({}, e), i._pf = t(), i._f = e._f[s], H(i), T(i) && (o += i._pf.charsLeftOver, o += 10 * i._pf.unusedTokens.length, i._pf.score = o, (null == a || a > o) && (a = o, n = i));
        r(e, n || i)
    }

    function z(e) {
        var t, i, n = e._i,
            a = Ne.exec(n);
        if (a) {
            for (e._pf.iso = !0, t = 0, i = Ue.length; i > t; t++)
                if (Ue[t][1].exec(n)) {
                    e._f = Ue[t][0] + (a[6] || " ");
                    break
                }
            for (t = 0, i = je.length; i > t; t++)
                if (je[t][1].exec(n)) {
                    e._f += je[t][0];
                    break
                }
            n.match(Me) && (e._f += "Z"), H(e)
        } else e._d = new Date(n)
    }

    function Y(t) {
        var i = t._i,
            n = _e.exec(i);
        i === e ? t._d = new Date : n ? t._d = new Date(+n[1]) : "string" == typeof i ? z(t) : h(i) ? (t._a = i.slice(0), F(t)) : p(i) ? t._d = new Date(+i) : "object" == typeof i ? O(t) : t._d = new Date(i)
    }

    function R(e, t, i, n, a, s, o) {
        var r = new Date(e, t, i, n, a, s, o);
        return 1970 > e && r.setFullYear(e), r
    }

    function B(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        return 1970 > e && t.setUTCFullYear(e), t
    }

    function W(e, t) {
        if ("string" == typeof e)
            if (isNaN(e)) {
                if (e = t.weekdaysParse(e), "number" != typeof e) return null
            } else e = parseInt(e, 10);
        return e
    }

    function J(e, t, i, n, a) {
        return a.relativeTime(t || 1, !! i, e, n)
    }

    function V(e, t, i) {
        var n = re(Math.abs(e) / 1e3),
            a = re(n / 60),
            s = re(a / 60),
            o = re(s / 24),
            r = re(o / 365),
            l = 45 > n && ["s", n] || 1 === a && ["m"] || 45 > a && ["mm", a] || 1 === s && ["h"] || 22 > s && ["hh", s] || 1 === o && ["d"] || 25 >= o && ["dd", o] || 45 >= o && ["M"] || 345 > o && ["MM", re(o / 30)] || 1 === r && ["y"] || ["yy", r];
        return l[2] = t, l[3] = e > 0, l[4] = i, J.apply({}, l)
    }

    function K(e, t, i) {
        var n, a = i - t,
            s = i - e.day();
        return s > a && (s -= 7), a - 7 > s && (s += 7), n = ne(e).add("d", s), {
            "week": Math.ceil(n.dayOfYear() / 7),
            "year": n.year()
        }
    }

    function X(e, t, i, n, a) {
        var s, o, r = B(e, 0, 1).getUTCDay();
        return i = null != i ? i : a, s = a - r + (r > n ? 7 : 0) - (a > r ? 7 : 0), o = 7 * (t - 1) + (i - a) + s + 1, {
            "year": o > 0 ? e : e - 1,
            "dayOfYear": o > 0 ? o : y(e - 1) + o
        }
    }

    function Q(e) {
        var t = e._i,
            i = e._f;
        return null === t ? ne.invalid({
            "nullInput": !0
        }) : ("string" == typeof t && (e._i = t = E().preparse(t)), ne.isMoment(t) ? (e = l(t), e._d = new Date(+t._d)) : i ? h(i) ? G(e) : H(e) : Y(e), new s(e))
    }

    function Z(e, t) {
        ne.fn[e] = ne.fn[e + "s"] = function(e) {
            var i = this._isUTC ? "UTC" : "";
            return null != e ? (this._d["set" + i + t](e), ne.updateOffset(this), this) : this._d["get" + i + t]()
        }
    }

    function ee(e) {
        ne.duration.fn[e] = function() {
            return this._data[e]
        }
    }

    function te(e, t) {
        ne.duration.fn["as" + e] = function() {
            return +this / t
        }
    }

    function ie(e) {
        var t = !1,
            i = ne;
        "undefined" == typeof ender && (e ? (oe.moment = function() {
            return !t && console && console.warn && (t = !0, console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")), i.apply(null, arguments)
        }, r(oe.moment, i)) : oe.moment = ne)
    }
    for (var ne, ae, se = "2.5.1", oe = this, re = Math.round, le = 0, ce = 1, ue = 2, de = 3, he = 4, pe = 5, fe = 6, ge = {}, me = {
            "_isAMomentObject": null,
            "_i": null,
            "_f": null,
            "_l": null,
            "_strict": null,
            "_isUTC": null,
            "_offset": null,
            "_pf": null,
            "_lang": null
        }, ve = "undefined" != typeof module && module.exports && "undefined" != typeof require, _e = /^\/?Date\((\-?\d+)/i, be = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, ye = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Se = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, we = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Te = /\d\d?/, ke = /\d{1,3}/, xe = /\d{1,4}/, Ce = /[+\-]?\d{1,6}/, $e = /\d+/, Ee = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Me = /Z|[\+\-]\d\d:?\d\d/gi, De = /T/i, Ie = /[\+\-]?\d+(\.\d{1,3})?/, Le = /\d/, Ae = /\d\d/, qe = /\d{3}/, Pe = /\d{4}/, Fe = /[+-]?\d{6}/, Oe = /[+-]?\d+/, Ne = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, He = "YYYY-MM-DDTHH:mm:ssZ", Ue = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
            ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
            ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d{2}/],
            ["YYYY-DDD", /\d{4}-\d{3}/]
        ], je = [
            ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ], Ge = /([\+\-]|\d\d)/gi, ze = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), Ye = {
            "Milliseconds": 1,
            "Seconds": 1e3,
            "Minutes": 6e4,
            "Hours": 36e5,
            "Days": 864e5,
            "Months": 2592e6,
            "Years": 31536e6
        }, Re = {
            "ms": "millisecond",
            "s": "second",
            "m": "minute",
            "h": "hour",
            "d": "day",
            "D": "date",
            "w": "week",
            "W": "isoWeek",
            "M": "month",
            "y": "year",
            "DDD": "dayOfYear",
            "e": "weekday",
            "E": "isoWeekday",
            "gg": "weekYear",
            "GG": "isoWeekYear"
        }, Be = {
            "dayofyear": "dayOfYear",
            "isoweekday": "isoWeekday",
            "isoweek": "isoWeek",
            "weekyear": "weekYear",
            "isoweekyear": "isoWeekYear"
        }, We = {}, Je = "DDD w W M D d".split(" "), Ve = "M D H h m s w W".split(" "), Ke = {
            "M": function() {
                return this.month() + 1
            },
            "MMM": function(e) {
                return this.lang().monthsShort(this, e)
            },
            "MMMM": function(e) {
                return this.lang().months(this, e)
            },
            "D": function() {
                return this.date()
            },
            "DDD": function() {
                return this.dayOfYear()
            },
            "d": function() {
                return this.day()
            },
            "dd": function(e) {
                return this.lang().weekdaysMin(this, e)
            },
            "ddd": function(e) {
                return this.lang().weekdaysShort(this, e)
            },
            "dddd": function(e) {
                return this.lang().weekdays(this, e)
            },
            "w": function() {
                return this.week()
            },
            "W": function() {
                return this.isoWeek()
            },
            "YY": function() {
                return u(this.year() % 100, 2)
            },
            "YYYY": function() {
                return u(this.year(), 4)
            },
            "YYYYY": function() {
                return u(this.year(), 5)
            },
            "YYYYYY": function() {
                var e = this.year(),
                    t = e >= 0 ? "+" : "-";
                return t + u(Math.abs(e), 6)
            },
            "gg": function() {
                return u(this.weekYear() % 100, 2)
            },
            "gggg": function() {
                return u(this.weekYear(), 4)
            },
            "ggggg": function() {
                return u(this.weekYear(), 5)
            },
            "GG": function() {
                return u(this.isoWeekYear() % 100, 2)
            },
            "GGGG": function() {
                return u(this.isoWeekYear(), 4)
            },
            "GGGGG": function() {
                return u(this.isoWeekYear(), 5)
            },
            "e": function() {
                return this.weekday()
            },
            "E": function() {
                return this.isoWeekday()
            },
            "a": function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !0)
            },
            "A": function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !1)
            },
            "H": function() {
                return this.hours()
            },
            "h": function() {
                return this.hours() % 12 || 12
            },
            "m": function() {
                return this.minutes()
            },
            "s": function() {
                return this.seconds()
            },
            "S": function() {
                return _(this.milliseconds() / 100)
            },
            "SS": function() {
                return u(_(this.milliseconds() / 10), 2)
            },
            "SSS": function() {
                return u(this.milliseconds(), 3)
            },
            "SSSS": function() {
                return u(this.milliseconds(), 3)
            },
            "Z": function() {
                var e = -this.zone(),
                    t = "+";
                return 0 > e && (e = -e, t = "-"), t + u(_(e / 60), 2) + ":" + u(_(e) % 60, 2)
            },
            "ZZ": function() {
                var e = -this.zone(),
                    t = "+";
                return 0 > e && (e = -e, t = "-"), t + u(_(e / 60), 2) + u(_(e) % 60, 2)
            },
            "z": function() {
                return this.zoneAbbr()
            },
            "zz": function() {
                return this.zoneName()
            },
            "X": function() {
                return this.unix()
            },
            "Q": function() {
                return this.quarter()
            }
        }, Xe = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"]; Je.length;) ae = Je.pop(), Ke[ae + "o"] = n(Ke[ae], ae);
    for (; Ve.length;) ae = Ve.pop(), Ke[ae + ae] = i(Ke[ae], 2);
    for (Ke.DDDD = i(Ke.DDD, 3), r(a.prototype, {
        "set": function(e) {
            var t, i;
            for (i in e) t = e[i], "function" == typeof t ? this[i] = t : this["_" + i] = t
        },
        "_months": "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        "months": function(e) {
            return this._months[e.month()]
        },
        "_monthsShort": "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        "monthsShort": function(e) {
            return this._monthsShort[e.month()]
        },
        "monthsParse": function(e) {
            var t, i, n;
            for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++)
                if (this._monthsParse[t] || (i = ne.utc([2e3, t]), n = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[t] = new RegExp(n.replace(".", ""), "i")), this._monthsParse[t].test(e)) return t
        },
        "_weekdays": "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        "weekdays": function(e) {
            return this._weekdays[e.day()]
        },
        "_weekdaysShort": "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        "weekdaysShort": function(e) {
            return this._weekdaysShort[e.day()]
        },
        "_weekdaysMin": "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        "weekdaysMin": function(e) {
            return this._weekdaysMin[e.day()]
        },
        "weekdaysParse": function(e) {
            var t, i, n;
            for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)
                if (this._weekdaysParse[t] || (i = ne([2e3, 1]).day(t), n = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[t] = new RegExp(n.replace(".", ""), "i")), this._weekdaysParse[t].test(e)) return t
        },
        "_longDateFormat": {
            "LT": "h:mm A",
            "L": "MM/DD/YYYY",
            "LL": "MMMM D YYYY",
            "LLL": "MMMM D YYYY LT",
            "LLLL": "dddd, MMMM D YYYY LT"
        },
        "longDateFormat": function(e) {
            var t = this._longDateFormat[e];
            return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
                return e.slice(1)
            }), this._longDateFormat[e] = t), t
        },
        "isPM": function(e) {
            return "p" === (e + "").toLowerCase().charAt(0)
        },
        "_meridiemParse": /[ap]\.?m?\.?/i,
        "meridiem": function(e, t, i) {
            return e > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
        },
        "_calendar": {
            "sameDay": "[Today at] LT",
            "nextDay": "[Tomorrow at] LT",
            "nextWeek": "dddd [at] LT",
            "lastDay": "[Yesterday at] LT",
            "lastWeek": "[Last] dddd [at] LT",
            "sameElse": "L"
        },
        "calendar": function(e, t) {
            var i = this._calendar[e];
            return "function" == typeof i ? i.apply(t) : i
        },
        "_relativeTime": {
            "future": "in %s",
            "past": "%s ago",
            "s": "a few seconds",
            "m": "a minute",
            "mm": "%d minutes",
            "h": "an hour",
            "hh": "%d hours",
            "d": "a day",
            "dd": "%d days",
            "M": "a month",
            "MM": "%d months",
            "y": "a year",
            "yy": "%d years"
        },
        "relativeTime": function(e, t, i, n) {
            var a = this._relativeTime[i];
            return "function" == typeof a ? a(e, t, i, n) : a.replace(/%d/i, e)
        },
        "pastFuture": function(e, t) {
            var i = this._relativeTime[e > 0 ? "future" : "past"];
            return "function" == typeof i ? i(t) : i.replace(/%s/i, t)
        },
        "ordinal": function(e) {
            return this._ordinal.replace("%d", e)
        },
        "_ordinal": "%d",
        "preparse": function(e) {
            return e
        },
        "postformat": function(e) {
            return e
        },
        "week": function(e) {
            return K(e, this._week.dow, this._week.doy).week
        },
        "_week": {
            "dow": 0,
            "doy": 6
        },
        "_invalidDate": "Invalid date",
        "invalidDate": function() {
            return this._invalidDate
        }
    }), ne = function(i, n, a, s) {
        var o;
        return "boolean" == typeof a && (s = a, a = e), o = {}, o._isAMomentObject = !0, o._i = i, o._f = n, o._l = a, o._strict = s, o._isUTC = !1, o._pf = t(), Q(o)
    }, ne.utc = function(i, n, a, s) {
        var o;
        return "boolean" == typeof a && (s = a, a = e), o = {}, o._isAMomentObject = !0, o._useUTC = !0, o._isUTC = !0, o._l = a, o._i = i, o._f = n, o._strict = s, o._pf = t(), Q(o).utc()
    }, ne.unix = function(e) {
        return ne(1e3 * e)
    }, ne.duration = function(e, t) {
        var i, n, a, s = e,
            r = null;
        return ne.isDuration(e) ? s = {
            "ms": e._milliseconds,
            "d": e._days,
            "M": e._months
        } : "number" == typeof e ? (s = {}, t ? s[t] = e : s.milliseconds = e) : (r = be.exec(e)) ? (i = "-" === r[1] ? -1 : 1, s = {
            "y": 0,
            "d": _(r[ue]) * i,
            "h": _(r[de]) * i,
            "m": _(r[he]) * i,
            "s": _(r[pe]) * i,
            "ms": _(r[fe]) * i
        }) : (r = ye.exec(e)) && (i = "-" === r[1] ? -1 : 1, a = function(e) {
            var t = e && parseFloat(e.replace(",", "."));
            return (isNaN(t) ? 0 : t) * i
        }, s = {
            "y": a(r[2]),
            "M": a(r[3]),
            "d": a(r[4]),
            "h": a(r[5]),
            "m": a(r[6]),
            "s": a(r[7]),
            "w": a(r[8])
        }), n = new o(s), ne.isDuration(e) && e.hasOwnProperty("_lang") && (n._lang = e._lang), n
    }, ne.version = se, ne.defaultFormat = He, ne.updateOffset = function() {}, ne.lang = function(e, t) {
        var i;
        return e ? (t ? C(k(e), t) : null === t ? ($(e), e = "en") : ge[e] || E(e), i = ne.duration.fn._lang = ne.fn._lang = E(e), i._abbr) : ne.fn._lang._abbr
    }, ne.langData = function(e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), E(e)
    }, ne.isMoment = function(e) {
        return e instanceof s || null != e && e.hasOwnProperty("_isAMomentObject")
    }, ne.isDuration = function(e) {
        return e instanceof o
    }, ae = Xe.length - 1; ae >= 0; --ae) v(Xe[ae]);
    for (ne.normalizeUnits = function(e) {
        return g(e)
    }, ne.invalid = function(e) {
        var t = ne.utc(0 / 0);
        return null != e ? r(t._pf, e) : t._pf.userInvalidated = !0, t
    }, ne.parseZone = function(e) {
        return ne(e).parseZone()
    }, r(ne.fn = s.prototype, {
        "clone": function() {
            return ne(this)
        },
        "valueOf": function() {
            return +this._d + 6e4 * (this._offset || 0)
        },
        "unix": function() {
            return Math.floor(+this / 1e3)
        },
        "toString": function() {
            return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        "toDate": function() {
            return this._offset ? new Date(+this) : this._d
        },
        "toISOString": function() {
            var e = ne(this).utc();
            return 0 < e.year() && e.year() <= 9999 ? I(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : I(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },
        "toArray": function() {
            var e = this;
            return [e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
        },
        "isValid": function() {
            return T(this)
        },
        "isDSTShifted": function() {
            return this._a ? this.isValid() && f(this._a, (this._isUTC ? ne.utc(this._a) : ne(this._a)).toArray()) > 0 : !1
        },
        "parsingFlags": function() {
            return r({}, this._pf)
        },
        "invalidAt": function() {
            return this._pf.overflow
        },
        "utc": function() {
            return this.zone(0)
        },
        "local": function() {
            return this.zone(0), this._isUTC = !1, this
        },
        "format": function(e) {
            var t = I(this, e || ne.defaultFormat);
            return this.lang().postformat(t)
        },
        "add": function(e, t) {
            var i;
            return i = "string" == typeof e ? ne.duration(+t, e) : ne.duration(e, t), d(this, i, 1), this
        },
        "subtract": function(e, t) {
            var i;
            return i = "string" == typeof e ? ne.duration(+t, e) : ne.duration(e, t), d(this, i, -1), this
        },
        "diff": function(e, t, i) {
            var n, a, s = x(e, this),
                o = 6e4 * (this.zone() - s.zone());
            return t = g(t), "year" === t || "month" === t ? (n = 432e5 * (this.daysInMonth() + s.daysInMonth()), a = 12 * (this.year() - s.year()) + (this.month() - s.month()), a += (this - ne(this).startOf("month") - (s - ne(s).startOf("month"))) / n, a -= 6e4 * (this.zone() - ne(this).startOf("month").zone() - (s.zone() - ne(s).startOf("month").zone())) / n, "year" === t && (a /= 12)) : (n = this - s, a = "second" === t ? n / 1e3 : "minute" === t ? n / 6e4 : "hour" === t ? n / 36e5 : "day" === t ? (n - o) / 864e5 : "week" === t ? (n - o) / 6048e5 : n), i ? a : c(a)
        },
        "from": function(e, t) {
            return ne.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)
        },
        "fromNow": function(e) {
            return this.from(ne(), e)
        },
        "calendar": function() {
            var e = x(ne(), this).startOf("day"),
                t = this.diff(e, "days", !0),
                i = -6 > t ? "sameElse" : -1 > t ? "lastWeek" : 0 > t ? "lastDay" : 1 > t ? "sameDay" : 2 > t ? "nextDay" : 7 > t ? "nextWeek" : "sameElse";
            return this.format(this.lang().calendar(i, this))
        },
        "isLeapYear": function() {
            return S(this.year())
        },
        "isDST": function() {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
        },
        "day": function(e) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != e ? (e = W(e, this.lang()), this.add({
                "d": e - t
            })) : t
        },
        "month": function(e) {
            var t, i = this._isUTC ? "UTC" : "";
            return null != e ? "string" == typeof e && (e = this.lang().monthsParse(e), "number" != typeof e) ? this : (t = this.date(), this.date(1), this._d["set" + i + "Month"](e), this.date(Math.min(t, this.daysInMonth())), ne.updateOffset(this), this) : this._d["get" + i + "Month"]()
        },
        "startOf": function(e) {
            switch (e = g(e)) {
                case "year":
                    this.month(0);
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return "week" === e ? this.weekday(0) : "isoWeek" === e && this.isoWeekday(1), this
        },
        "endOf": function(e) {
            return e = g(e), this.startOf(e).add("isoWeek" === e ? "week" : e, 1).subtract("ms", 1)
        },
        "isAfter": function(e, t) {
            return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) > +ne(e).startOf(t)
        },
        "isBefore": function(e, t) {
            return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) < +ne(e).startOf(t)
        },
        "isSame": function(e, t) {
            return t = t || "ms", +this.clone().startOf(t) === +x(e, this).startOf(t)
        },
        "min": function(e) {
            return e = ne.apply(null, arguments), this > e ? this : e
        },
        "max": function(e) {
            return e = ne.apply(null, arguments), e > this ? this : e
        },
        "zone": function(e) {
            var t = this._offset || 0;
            return null == e ? this._isUTC ? t : this._d.getTimezoneOffset() : ("string" == typeof e && (e = q(e)), Math.abs(e) < 16 && (e = 60 * e), this._offset = e, this._isUTC = !0, t !== e && d(this, ne.duration(t - e, "m"), 1, !0), this)
        },
        "zoneAbbr": function() {
            return this._isUTC ? "UTC" : ""
        },
        "zoneName": function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },
        "parseZone": function() {
            return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), this
        },
        "hasAlignedHourOffset": function(e) {
            return e = e ? ne(e).zone() : 0, (this.zone() - e) % 60 === 0
        },
        "daysInMonth": function() {
            return b(this.year(), this.month())
        },
        "dayOfYear": function(e) {
            var t = re((ne(this).startOf("day") - ne(this).startOf("year")) / 864e5) + 1;
            return null == e ? t : this.add("d", e - t)
        },
        "quarter": function() {
            return Math.ceil((this.month() + 1) / 3)
        },
        "weekYear": function(e) {
            var t = K(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return null == e ? t : this.add("y", e - t)
        },
        "isoWeekYear": function(e) {
            var t = K(this, 1, 4).year;
            return null == e ? t : this.add("y", e - t)
        },
        "week": function(e) {
            var t = this.lang().week(this);
            return null == e ? t : this.add("d", 7 * (e - t))
        },
        "isoWeek": function(e) {
            var t = K(this, 1, 4).week;
            return null == e ? t : this.add("d", 7 * (e - t))
        },
        "weekday": function(e) {
            var t = (this.day() + 7 - this.lang()._week.dow) % 7;
            return null == e ? t : this.add("d", e - t)
        },
        "isoWeekday": function(e) {
            return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7)
        },
        "get": function(e) {
            return e = g(e), this[e]()
        },
        "set": function(e, t) {
            return e = g(e), "function" == typeof this[e] && this[e](t), this
        },
        "lang": function(t) {
            return t === e ? this._lang : (this._lang = E(t), this)
        }
    }), ae = 0; ae < ze.length; ae++) Z(ze[ae].toLowerCase().replace(/s$/, ""), ze[ae]);
    Z("year", "FullYear"), ne.fn.days = ne.fn.day, ne.fn.months = ne.fn.month, ne.fn.weeks = ne.fn.week, ne.fn.isoWeeks = ne.fn.isoWeek, ne.fn.toJSON = ne.fn.toISOString, r(ne.duration.fn = o.prototype, {
        "_bubble": function() {
            var e, t, i, n, a = this._milliseconds,
                s = this._days,
                o = this._months,
                r = this._data;
            r.milliseconds = a % 1e3, e = c(a / 1e3), r.seconds = e % 60, t = c(e / 60), r.minutes = t % 60, i = c(t / 60), r.hours = i % 24, s += c(i / 24), r.days = s % 30, o += c(s / 30), r.months = o % 12, n = c(o / 12), r.years = n
        },
        "weeks": function() {
            return c(this.days() / 7)
        },
        "valueOf": function() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * _(this._months / 12)
        },
        "humanize": function(e) {
            var t = +this,
                i = V(t, !e, this.lang());
            return e && (i = this.lang().pastFuture(t, i)), this.lang().postformat(i)
        },
        "add": function(e, t) {
            var i = ne.duration(e, t);
            return this._milliseconds += i._milliseconds, this._days += i._days, this._months += i._months, this._bubble(), this
        },
        "subtract": function(e, t) {
            var i = ne.duration(e, t);
            return this._milliseconds -= i._milliseconds, this._days -= i._days, this._months -= i._months, this._bubble(), this
        },
        "get": function(e) {
            return e = g(e), this[e.toLowerCase() + "s"]()
        },
        "as": function(e) {
            return e = g(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]()
        },
        "lang": ne.fn.lang,
        "toIsoString": function() {
            var e = Math.abs(this.years()),
                t = Math.abs(this.months()),
                i = Math.abs(this.days()),
                n = Math.abs(this.hours()),
                a = Math.abs(this.minutes()),
                s = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (e ? e + "Y" : "") + (t ? t + "M" : "") + (i ? i + "D" : "") + (n || a || s ? "T" : "") + (n ? n + "H" : "") + (a ? a + "M" : "") + (s ? s + "S" : "") : "P0D"
        }
    });
    for (ae in Ye) Ye.hasOwnProperty(ae) && (te(ae, Ye[ae]), ee(ae.toLowerCase()));
    te("Weeks", 6048e5), ne.duration.fn.asMonths = function() {
        return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, ne.lang("en", {
        "ordinal": function(e) {
            var t = e % 10,
                i = 1 === _(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
            return e + i
        }
    }), ve ? (module.exports = ne, ie(!0)) : "function" == typeof define && define.amd ? define("moment", function(t, i, n) {
        return n.config && n.config() && n.config().noGlobal !== !0 && ie(n.config().noGlobal === e), ne
    }) : ie()
}.call(this),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    function t(e, t, i, n) {
        var a = {
            "m": ["eine Minute", "einer Minute"],
            "h": ["eine Stunde", "einer Stunde"],
            "d": ["ein Tag", "einem Tag"],
            "dd": [e + " Tage", e + " Tagen"],
            "M": ["ein Monat", "einem Monat"],
            "MM": [e + " Monate", e + " Monaten"],
            "y": ["ein Jahr", "einem Jahr"],
            "yy": [e + " Jahre", e + " Jahren"]
        };
        return t ? a[i][0] : a[i][1]
    }
    return e.lang("de", {
        "months": "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        "monthsShort": "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        "weekdays": "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        "weekdaysShort": "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        "weekdaysMin": "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        "longDateFormat": {
            "LT": "H:mm [Uhr]",
            "L": "DD.MM.YYYY",
            "LL": "D. MMMM YYYY",
            "LLL": "D. MMMM YYYY LT",
            "LLLL": "dddd, D. MMMM YYYY LT"
        },
        "calendar": {
            "sameDay": "[Heute um] LT",
            "sameElse": "L",
            "nextDay": "[Morgen um] LT",
            "nextWeek": "dddd [um] LT",
            "lastDay": "[Gestern um] LT",
            "lastWeek": "[letzten] dddd [um] LT"
        },
        "relativeTime": {
            "future": "in %s",
            "past": "vor %s",
            "s": "ein paar Sekunden",
            "m": t,
            "mm": "%d Minuten",
            "h": t,
            "hh": "%d Stunden",
            "d": t,
            "dd": t,
            "M": t,
            "MM": t,
            "y": t,
            "yy": t
        },
        "ordinal": "%d.",
        "week": {
            "dow": 1,
            "doy": 4
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("es", {
        "months": "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        "monthsShort": "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        "weekdays": "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        "weekdaysShort": "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        "weekdaysMin": "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
        "longDateFormat": {
            "LT": "H:mm",
            "L": "DD/MM/YYYY",
            "LL": "D [de] MMMM [de] YYYY",
            "LLL": "D [de] MMMM [de] YYYY LT",
            "LLLL": "dddd, D [de] MMMM [de] YYYY LT"
        },
        "calendar": {
            "sameDay": function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            "nextDay": function() {
                return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            "nextWeek": function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            "lastDay": function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            "lastWeek": function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "en %s",
            "past": "hace %s",
            "s": "unos segundos",
            "m": "un minuto",
            "mm": "%d minutos",
            "h": "una hora",
            "hh": "%d horas",
            "d": "un día",
            "dd": "%d días",
            "M": "un mes",
            "MM": "%d meses",
            "y": "un año",
            "yy": "%d años"
        },
        "ordinal": "%dº",
        "week": {
            "dow": 1,
            "doy": 4
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("fr-ca", {
        "months": "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        "monthsShort": "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        "weekdays": "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        "weekdaysShort": "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        "weekdaysMin": "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        "longDateFormat": {
            "LT": "HH:mm",
            "L": "YYYY-MM-DD",
            "LL": "D MMMM YYYY",
            "LLL": "D MMMM YYYY LT",
            "LLLL": "dddd D MMMM YYYY LT"
        },
        "calendar": {
            "sameDay": "[Aujourd'hui à] LT",
            "nextDay": "[Demain à] LT",
            "nextWeek": "dddd [à] LT",
            "lastDay": "[Hier à] LT",
            "lastWeek": "dddd [dernier à] LT",
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "dans %s",
            "past": "il y a %s",
            "s": "quelques secondes",
            "m": "une minute",
            "mm": "%d minutes",
            "h": "une heure",
            "hh": "%d heures",
            "d": "un jour",
            "dd": "%d jours",
            "M": "un mois",
            "MM": "%d mois",
            "y": "un an",
            "yy": "%d ans"
        },
        "ordinal": function(e) {
            return e + (1 === e ? "er" : "")
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("fr", {
        "months": "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        "monthsShort": "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        "weekdays": "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        "weekdaysShort": "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        "weekdaysMin": "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        "longDateFormat": {
            "LT": "HH:mm",
            "L": "DD/MM/YYYY",
            "LL": "D MMMM YYYY",
            "LLL": "D MMMM YYYY LT",
            "LLLL": "dddd D MMMM YYYY LT"
        },
        "calendar": {
            "sameDay": "[Aujourd'hui à] LT",
            "nextDay": "[Demain à] LT",
            "nextWeek": "dddd [à] LT",
            "lastDay": "[Hier à] LT",
            "lastWeek": "dddd [dernier à] LT",
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "dans %s",
            "past": "il y a %s",
            "s": "quelques secondes",
            "m": "une minute",
            "mm": "%d minutes",
            "h": "une heure",
            "hh": "%d heures",
            "d": "un jour",
            "dd": "%d jours",
            "M": "un mois",
            "MM": "%d mois",
            "y": "un an",
            "yy": "%d ans"
        },
        "ordinal": function(e) {
            return e + (1 === e ? "er" : "")
        },
        "week": {
            "dow": 1,
            "doy": 4
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("it", {
        "months": "Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),
        "monthsShort": "Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
        "weekdays": "Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
        "weekdaysShort": "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
        "weekdaysMin": "D_L_Ma_Me_G_V_S".split("_"),
        "longDateFormat": {
            "LT": "HH:mm",
            "L": "DD/MM/YYYY",
            "LL": "D MMMM YYYY",
            "LLL": "D MMMM YYYY LT",
            "LLLL": "dddd, D MMMM YYYY LT"
        },
        "calendar": {
            "sameDay": "[Oggi alle] LT",
            "nextDay": "[Domani alle] LT",
            "nextWeek": "dddd [alle] LT",
            "lastDay": "[Ieri alle] LT",
            "lastWeek": "[lo scorso] dddd [alle] LT",
            "sameElse": "L"
        },
        "relativeTime": {
            "future": function(e) {
                return (/^[0-9].+$/.test(e) ? "tra" : "in") + " " + e
            },
            "past": "%s fa",
            "s": "alcuni secondi",
            "m": "un minuto",
            "mm": "%d minuti",
            "h": "un'ora",
            "hh": "%d ore",
            "d": "un giorno",
            "dd": "%d giorni",
            "M": "un mese",
            "MM": "%d mesi",
            "y": "un anno",
            "yy": "%d anni"
        },
        "ordinal": "%dº",
        "week": {
            "dow": 1,
            "doy": 4
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("ja", {
        "months": "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        "monthsShort": "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        "weekdays": "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
        "weekdaysShort": "日_月_火_水_木_金_土".split("_"),
        "weekdaysMin": "日_月_火_水_木_金_土".split("_"),
        "longDateFormat": {
            "LT": "Ah時m分",
            "L": "YYYY/MM/DD",
            "LL": "YYYY年M月D日",
            "LLL": "YYYY年M月D日LT",
            "LLLL": "YYYY年M月D日LT dddd"
        },
        "meridiem": function(e, t, i) {
            return 12 > e ? "午前" : "午後"
        },
        "calendar": {
            "sameDay": "[今日] LT",
            "nextDay": "[明日] LT",
            "nextWeek": "[来週]dddd LT",
            "lastDay": "[昨日] LT",
            "lastWeek": "[前週]dddd LT",
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "%s後",
            "past": "%s前",
            "s": "数秒",
            "m": "1分",
            "mm": "%d分",
            "h": "1時間",
            "hh": "%d時間",
            "d": "1日",
            "dd": "%d日",
            "M": "1ヶ月",
            "MM": "%dヶ月",
            "y": "1年",
            "yy": "%d年"
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("ko", {
        "months": "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        "monthsShort": "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        "weekdays": "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
        "weekdaysShort": "일_월_화_수_목_금_토".split("_"),
        "weekdaysMin": "일_월_화_수_목_금_토".split("_"),
        "longDateFormat": {
            "LT": "A h시 mm분",
            "L": "YYYY.MM.DD",
            "LL": "YYYY년 MMMM D일",
            "LLL": "YYYY년 MMMM D일 LT",
            "LLLL": "YYYY년 MMMM D일 dddd LT"
        },
        "meridiem": function(e, t, i) {
            return 12 > e ? "오전" : "오후"
        },
        "calendar": {
            "sameDay": "오늘 LT",
            "nextDay": "내일 LT",
            "nextWeek": "dddd LT",
            "lastDay": "어제 LT",
            "lastWeek": "지난주 dddd LT",
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "%s 후",
            "past": "%s 전",
            "s": "몇초",
            "ss": "%d초",
            "m": "일분",
            "mm": "%d분",
            "h": "한시간",
            "hh": "%d시간",
            "d": "하루",
            "dd": "%d일",
            "M": "한달",
            "MM": "%d달",
            "y": "일년",
            "yy": "%d년"
        },
        "ordinal": "%d일",
        "meridiemParse": /(오전|오후)/,
        "isPM": function(e) {
            return "오후" === e
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
        i = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
    return e.lang("nl", {
        "months": "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        "monthsShort": function(e, n) {
            return /-MMM-/.test(n) ? i[e.month()] : t[e.month()]
        },
        "weekdays": "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        "weekdaysShort": "zo._ma._di._wo._do._vr._za.".split("_"),
        "weekdaysMin": "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
        "longDateFormat": {
            "LT": "HH:mm",
            "L": "DD-MM-YYYY",
            "LL": "D MMMM YYYY",
            "LLL": "D MMMM YYYY LT",
            "LLLL": "dddd D MMMM YYYY LT"
        },
        "calendar": {
            "sameDay": "[vandaag om] LT",
            "nextDay": "[morgen om] LT",
            "nextWeek": "dddd [om] LT",
            "lastDay": "[gisteren om] LT",
            "lastWeek": "[afgelopen] dddd [om] LT",
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "over %s",
            "past": "%s geleden",
            "s": "een paar seconden",
            "m": "één minuut",
            "mm": "%d minuten",
            "h": "één uur",
            "hh": "%d uur",
            "d": "één dag",
            "dd": "%d dagen",
            "M": "één maand",
            "MM": "%d maanden",
            "y": "één jaar",
            "yy": "%d jaar"
        },
        "ordinal": function(e) {
            return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de")
        },
        "week": {
            "dow": 1,
            "doy": 4
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    function t(e) {
        return 5 > e % 10 && e % 10 > 1 && ~~(e / 10) % 10 !== 1
    }

    function i(e, i, n) {
        var a = e + " ";
        switch (n) {
            case "m":
                return i ? "minuta" : "minutę";
            case "mm":
                return a + (t(e) ? "minuty" : "minut");
            case "h":
                return i ? "godzina" : "godzinę";
            case "hh":
                return a + (t(e) ? "godziny" : "godzin");
            case "MM":
                return a + (t(e) ? "miesiące" : "miesięcy");
            case "yy":
                return a + (t(e) ? "lata" : "lat")
        }
    }
    var n = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
        a = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
    return e.lang("pl", {
        "months": function(e, t) {
            return /D MMMM/.test(t) ? a[e.month()] : n[e.month()]
        },
        "monthsShort": "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
        "weekdays": "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
        "weekdaysShort": "nie_pon_wt_śr_czw_pt_sb".split("_"),
        "weekdaysMin": "N_Pn_Wt_Śr_Cz_Pt_So".split("_"),
        "longDateFormat": {
            "LT": "HH:mm",
            "L": "DD.MM.YYYY",
            "LL": "D MMMM YYYY",
            "LLL": "D MMMM YYYY LT",
            "LLLL": "dddd, D MMMM YYYY LT"
        },
        "calendar": {
            "sameDay": "[Dziś o] LT",
            "nextDay": "[Jutro o] LT",
            "nextWeek": "[W] dddd [o] LT",
            "lastDay": "[Wczoraj o] LT",
            "lastWeek": function() {
                switch (this.day()) {
                    case 0:
                        return "[W zeszłą niedzielę o] LT";
                    case 3:
                        return "[W zeszłą środę o] LT";
                    case 6:
                        return "[W zeszłą sobotę o] LT";
                    default:
                        return "[W zeszły] dddd [o] LT"
                }
            },
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "za %s",
            "past": "%s temu",
            "s": "kilka sekund",
            "m": i,
            "mm": i,
            "h": i,
            "hh": i,
            "d": "1 dzień",
            "dd": "%d dni",
            "M": "miesiąc",
            "MM": i,
            "y": "rok",
            "yy": i
        },
        "ordinal": "%d.",
        "week": {
            "dow": 1,
            "doy": 4
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("pt-br", {
        "months": "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        "monthsShort": "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        "weekdays": "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
        "weekdaysShort": "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        "weekdaysMin": "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        "longDateFormat": {
            "LT": "HH:mm",
            "L": "DD/MM/YYYY",
            "LL": "D [de] MMMM [de] YYYY",
            "LLL": "D [de] MMMM [de] YYYY LT",
            "LLLL": "dddd, D [de] MMMM [de] YYYY LT"
        },
        "calendar": {
            "sameDay": "[Hoje às] LT",
            "nextDay": "[Amanhã às] LT",
            "nextWeek": "dddd [às] LT",
            "lastDay": "[Ontem às] LT",
            "lastWeek": function() {
                return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT"
            },
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "em %s",
            "past": "%s atrás",
            "s": "segundos",
            "m": "um minuto",
            "mm": "%d minutos",
            "h": "uma hora",
            "hh": "%d horas",
            "d": "um dia",
            "dd": "%d dias",
            "M": "um mês",
            "MM": "%d meses",
            "y": "um ano",
            "yy": "%d anos"
        },
        "ordinal": "%dº"
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("pt", {
        "months": "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        "monthsShort": "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        "weekdays": "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
        "weekdaysShort": "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        "weekdaysMin": "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        "longDateFormat": {
            "LT": "HH:mm",
            "L": "DD/MM/YYYY",
            "LL": "D [de] MMMM [de] YYYY",
            "LLL": "D [de] MMMM [de] YYYY LT",
            "LLLL": "dddd, D [de] MMMM [de] YYYY LT"
        },
        "calendar": {
            "sameDay": "[Hoje às] LT",
            "nextDay": "[Amanhã às] LT",
            "nextWeek": "dddd [às] LT",
            "lastDay": "[Ontem às] LT",
            "lastWeek": function() {
                return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT"
            },
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "em %s",
            "past": "%s atrás",
            "s": "segundos",
            "m": "um minuto",
            "mm": "%d minutos",
            "h": "uma hora",
            "hh": "%d horas",
            "d": "um dia",
            "dd": "%d dias",
            "M": "um mês",
            "MM": "%d meses",
            "y": "um ano",
            "yy": "%d anos"
        },
        "ordinal": "%dº",
        "week": {
            "dow": 1,
            "doy": 4
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    function t(e, t) {
        var i = e.split("_");
        return t % 10 === 1 && t % 100 !== 11 ? i[0] : t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? i[1] : i[2]
    }

    function i(e, i, n) {
        var a = {
            "mm": "минута_минуты_минут",
            "hh": "час_часа_часов",
            "dd": "день_дня_дней",
            "MM": "месяц_месяца_месяцев",
            "yy": "год_года_лет"
        };
        return "m" === n ? i ? "минута" : "минуту" : e + " " + t(a[n], +e)
    }

    function n(e, t) {
        var i = {
            "nominative": "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
            "accusative": "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
        }, n = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" : "nominative";
        return i[n][e.month()]
    }

    function a(e, t) {
        var i = {
            "nominative": "янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
            "accusative": "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")
        }, n = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" : "nominative";
        return i[n][e.month()]
    }

    function s(e, t) {
        var i = {
            "nominative": "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
            "accusative": "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
        }, n = /\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/.test(t) ? "accusative" : "nominative";
        return i[n][e.day()]
    }
    return e.lang("ru", {
        "months": n,
        "monthsShort": a,
        "weekdays": s,
        "weekdaysShort": "вс_пн_вт_ср_чт_пт_сб".split("_"),
        "weekdaysMin": "вс_пн_вт_ср_чт_пт_сб".split("_"),
        "monthsParse": [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i],
        "longDateFormat": {
            "LT": "HH:mm",
            "L": "DD.MM.YYYY",
            "LL": "D MMMM YYYY г.",
            "LLL": "D MMMM YYYY г., LT",
            "LLLL": "dddd, D MMMM YYYY г., LT"
        },
        "calendar": {
            "sameDay": "[Сегодня в] LT",
            "nextDay": "[Завтра в] LT",
            "lastDay": "[Вчера в] LT",
            "nextWeek": function() {
                return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT"
            },
            "lastWeek": function() {
                switch (this.day()) {
                    case 0:
                        return "[В прошлое] dddd [в] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[В прошлый] dddd [в] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[В прошлую] dddd [в] LT"
                }
            },
            "sameElse": "L"
        },
        "relativeTime": {
            "future": "через %s",
            "past": "%s назад",
            "s": "несколько секунд",
            "m": i,
            "mm": i,
            "h": "час",
            "hh": i,
            "d": "день",
            "dd": i,
            "M": "месяц",
            "MM": i,
            "y": "год",
            "yy": i
        },
        "meridiem": function(e, t, i) {
            return 4 > e ? "ночи" : 12 > e ? "утра" : 17 > e ? "дня" : "вечера"
        },
        "ordinal": function(e, t) {
            switch (t) {
                case "M":
                case "d":
                case "DDD":
                    return e + "-й";
                case "D":
                    return e + "-го";
                case "w":
                case "W":
                    return e + "-я";
                default:
                    return e
            }
        },
        "week": {
            "dow": 1,
            "doy": 7
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("zh-cn", {
        "months": "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        "monthsShort": "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        "weekdays": "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        "weekdaysShort": "周日_周一_周二_周三_周四_周五_周六".split("_"),
        "weekdaysMin": "日_一_二_三_四_五_六".split("_"),
        "longDateFormat": {
            "LT": "Ah点mm",
            "L": "YYYY-MM-DD",
            "LL": "YYYY年MMMD日",
            "LLL": "YYYY年MMMD日LT",
            "LLLL": "YYYY年MMMD日ddddLT",
            "l": "YYYY-MM-DD",
            "ll": "YYYY年MMMD日",
            "lll": "YYYY年MMMD日LT",
            "llll": "YYYY年MMMD日ddddLT"
        },
        "meridiem": function(e, t, i) {
            var n = 100 * e + t;
            return 600 > n ? "凌晨" : 900 > n ? "早上" : 1130 > n ? "上午" : 1230 > n ? "中午" : 1800 > n ? "下午" : "晚上"
        },
        "calendar": {
            "sameDay": function() {
                return 0 === this.minutes() ? "[今天]Ah[点整]" : "[今天]LT"
            },
            "nextDay": function() {
                return 0 === this.minutes() ? "[明天]Ah[点整]" : "[明天]LT"
            },
            "lastDay": function() {
                return 0 === this.minutes() ? "[昨天]Ah[点整]" : "[昨天]LT"
            },
            "nextWeek": function() {
                var t, i;
                return t = e().startOf("week"), i = this.unix() - t.unix() >= 604800 ? "[下]" : "[本]", 0 === this.minutes() ? i + "dddAh点整" : i + "dddAh点mm"
            },
            "lastWeek": function() {
                var t, i;
                return t = e().startOf("week"), i = this.unix() < t.unix() ? "[上]" : "[本]", 0 === this.minutes() ? i + "dddAh点整" : i + "dddAh点mm"
            },
            "sameElse": "LL"
        },
        "ordinal": function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + "日";
                case "M":
                    return e + "月";
                case "w":
                case "W":
                    return e + "周";
                default:
                    return e
            }
        },
        "relativeTime": {
            "future": "%s内",
            "past": "%s前",
            "s": "几秒",
            "m": "1分钟",
            "mm": "%d分钟",
            "h": "1小时",
            "hh": "%d小时",
            "d": "1天",
            "dd": "%d天",
            "M": "1个月",
            "MM": "%d个月",
            "y": "1年",
            "yy": "%d年"
        },
        "week": {
            "dow": 1,
            "doy": 4
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof exports ? module.exports = e(require("../moment")) : e(window.moment)
}(function(e) {
    return e.lang("zh-tw", {
        "months": "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        "monthsShort": "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        "weekdays": "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        "weekdaysShort": "週日_週一_週二_週三_週四_週五_週六".split("_"),
        "weekdaysMin": "日_一_二_三_四_五_六".split("_"),
        "longDateFormat": {
            "LT": "Ah點mm",
            "L": "YYYY年MMMD日",
            "LL": "YYYY年MMMD日",
            "LLL": "YYYY年MMMD日LT",
            "LLLL": "YYYY年MMMD日ddddLT",
            "l": "YYYY年MMMD日",
            "ll": "YYYY年MMMD日",
            "lll": "YYYY年MMMD日LT",
            "llll": "YYYY年MMMD日ddddLT"
        },
        "meridiem": function(e, t, i) {
            var n = 100 * e + t;
            return 900 > n ? "早上" : 1130 > n ? "上午" : 1230 > n ? "中午" : 1800 > n ? "下午" : "晚上"
        },
        "calendar": {
            "sameDay": "[今天]LT",
            "nextDay": "[明天]LT",
            "nextWeek": "[下]ddddLT",
            "lastDay": "[昨天]LT",
            "lastWeek": "[上]ddddLT",
            "sameElse": "L"
        },
        "ordinal": function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + "日";
                case "M":
                    return e + "月";
                case "w":
                case "W":
                    return e + "週";
                default:
                    return e
            }
        },
        "relativeTime": {
            "future": "%s內",
            "past": "%s前",
            "s": "幾秒",
            "m": "一分鐘",
            "mm": "%d分鐘",
            "h": "一小時",
            "hh": "%d小時",
            "d": "一天",
            "dd": "%d天",
            "M": "一個月",
            "MM": "%d個月",
            "y": "一年",
            "yy": "%d年"
        }
    })
}),
function(e, t) {
    "use strict";
    var i = e.History = e.History || {}, n = e.jQuery;
    if ("undefined" != typeof i.Adapter) throw new Error("History.js Adapter has already been loaded...");
    i.Adapter = {
        "bind": function(e, t, i) {
            n(e).bind(t, i)
        },
        "trigger": function(e, t, i) {
            n(e).trigger(t, i)
        },
        "extractEventData": function(e, i, n) {
            var a = i && i.originalEvent && i.originalEvent[e] || n && n[e] || t;
            return a
        },
        "onDomLoad": function(e) {
            n(e)
        }
    }, "undefined" != typeof i.init && i.init()
}(window),
function(e, t) {
    "use strict";
    var i = e.console || t,
        n = e.document,
        a = e.navigator,
        s = e.sessionStorage || !1,
        o = e.setTimeout,
        r = e.clearTimeout,
        l = e.setInterval,
        c = e.clearInterval,
        u = e.JSON,
        d = e.alert,
        h = e.History = e.History || {}, p = e.history;
    try {
        s.setItem("TEST", "1"), s.removeItem("TEST")
    } catch (f) {
        s = !1
    }
    if (u.stringify = u.stringify || u.encode, u.parse = u.parse || u.decode, "undefined" != typeof h.init) throw new Error("History.js Core has already been loaded...");
    h.init = function(e) {
        return "undefined" == typeof h.Adapter ? !1 : ("undefined" != typeof h.initCore && h.initCore(), "undefined" != typeof h.initHtml4 && h.initHtml4(), !0)
    }, h.initCore = function(f) {
        if ("undefined" != typeof h.initCore.initialized) return !1;
        if (h.initCore.initialized = !0, h.options = h.options || {}, h.options.hashChangeInterval = h.options.hashChangeInterval || 100, h.options.safariPollInterval = h.options.safariPollInterval || 500, h.options.doubleCheckInterval = h.options.doubleCheckInterval || 500, h.options.disableSuid = h.options.disableSuid || !1, h.options.storeInterval = h.options.storeInterval || 1e3, h.options.busyDelay = h.options.busyDelay || 250, h.options.debug = h.options.debug || !1, h.options.initialTitle = h.options.initialTitle || n.title, h.options.html4Mode = h.options.html4Mode || !1, h.options.delayInit = h.options.delayInit || !1, h.intervalList = [], h.clearAllIntervals = function() {
            var e, t = h.intervalList;
            if ("undefined" != typeof t && null !== t) {
                for (e = 0; e < t.length; e++) c(t[e]);
                h.intervalList = null
            }
        }, h.debug = function() {
            h.options.debug && h.log.apply(h, arguments)
        }, h.log = function() {
            var e, t, a, s, o, r = !("undefined" == typeof i || "undefined" == typeof i.log || "undefined" == typeof i.log.apply),
                l = n.getElementById("log");
            for (r ? (s = Array.prototype.slice.call(arguments), e = s.shift(), "undefined" != typeof i.debug ? i.debug.apply(i, [e, s]) : i.log.apply(i, [e, s])) : e = "\n" + arguments[0] + "\n", t = 1, a = arguments.length; a > t; ++t) {
                if (o = arguments[t], "object" == typeof o && "undefined" != typeof u) try {
                    o = u.stringify(o)
                } catch (c) {}
                e += "\n" + o + "\n"
            }
            return l ? (l.value += e + "\n-----\n", l.scrollTop = l.scrollHeight - l.clientHeight) : r || d(e), !0
        }, h.getInternetExplorerMajorVersion = function() {
            var e = h.getInternetExplorerMajorVersion.cached = "undefined" != typeof h.getInternetExplorerMajorVersion.cached ? h.getInternetExplorerMajorVersion.cached : function() {
                    for (var e = 3, t = n.createElement("div"), i = t.getElementsByTagName("i");
                        (t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && i[0];);
                    return e > 4 ? e : !1
                }();
            return e
        }, h.isInternetExplorer = function() {
            var e = h.isInternetExplorer.cached = "undefined" != typeof h.isInternetExplorer.cached ? h.isInternetExplorer.cached : Boolean(h.getInternetExplorerMajorVersion());
            return e
        }, h.emulated = h.options.html4Mode ? {
            "pushState": !0,
            "hashChange": !0
        } : {
            "pushState": !Boolean(e.history && e.history.pushState && e.history.replaceState && !(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(a.userAgent) || /AppleWebKit\/5([0-2]|3[0-2])/i.test(a.userAgent))),
            "hashChange": Boolean(!("onhashchange" in e || "onhashchange" in n) || h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8)
        }, h.enabled = !h.emulated.pushState, h.bugs = {
            "setHash": Boolean(!h.emulated.pushState && "Apple Computer, Inc." === a.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(a.userAgent)),
            "safariPoll": Boolean(!h.emulated.pushState && "Apple Computer, Inc." === a.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(a.userAgent)),
            "ieDoubleCheck": Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8),
            "hashEscape": Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 7)
        }, h.isEmptyObject = function(e) {
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }, h.cloneObject = function(e) {
            var t, i;
            return e ? (t = u.stringify(e), i = u.parse(t)) : i = {}, i
        }, h.getRootUrl = function() {
            var e = n.location.protocol + "//" + (n.location.hostname || n.location.host);
            return n.location.port && (e += ":" + n.location.port), e += "/"
        }, h.getBaseHref = function() {
            var e = n.getElementsByTagName("base"),
                t = null,
                i = "";
            return 1 === e.length && (t = e[0], i = t.href.replace(/[^\/]+$/, "")), i = i.replace(/\/+$/, ""), i && (i += "/"), i
        }, h.getBaseUrl = function() {
            var e = h.getBaseHref() || h.getBasePageUrl() || h.getRootUrl();
            return e
        }, h.getPageUrl = function() {
            var e, t = h.getState(!1, !1),
                i = (t || {}).url || h.getLocationHref();
            return e = i.replace(/\/+$/, "").replace(/[^\/]+$/, function(e, t, i) {
                return /\./.test(e) ? e : e + "/"
            })
        }, h.getBasePageUrl = function() {
            var e = h.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(e, t, i) {
                return /[^\/]$/.test(e) ? "" : e
            }).replace(/\/+$/, "") + "/";
            return e
        }, h.getFullUrl = function(e, t) {
            var i = e,
                n = e.substring(0, 1);
            return t = "undefined" == typeof t ? !0 : t, /[a-z]+\:\/\//.test(e) || (i = "/" === n ? h.getRootUrl() + e.replace(/^\/+/, "") : "#" === n ? h.getPageUrl().replace(/#.*/, "") + e : "?" === n ? h.getPageUrl().replace(/[\?#].*/, "") + e : t ? h.getBaseUrl() + e.replace(/^(\.\/)+/, "") : h.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), i.replace(/\#$/, "")
        }, h.getShortUrl = function(e) {
            var t = e,
                i = h.getBaseUrl(),
                n = h.getRootUrl();
            return h.emulated.pushState && (t = t.replace(i, "")), t = t.replace(n, "/"), h.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
        }, h.getLocationHref = function(e) {
            return e = e || n, e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : -1 == e.URL.indexOf("#") && -1 != e.location.href.indexOf("#") ? e.location.href : e.URL || e.location.href
        }, h.store = {}, h.idToState = h.idToState || {}, h.stateToId = h.stateToId || {}, h.urlToId = h.urlToId || {}, h.storedStates = h.storedStates || [], h.savedStates = h.savedStates || [], h.normalizeStore = function() {
            h.store.idToState = h.store.idToState || {}, h.store.urlToId = h.store.urlToId || {}, h.store.stateToId = h.store.stateToId || {}
        }, h.getState = function(e, t) {
            "undefined" == typeof e && (e = !0), "undefined" == typeof t && (t = !0);
            var i = h.getLastSavedState();
            return !i && t && (i = h.createStateObject()), e && (i = h.cloneObject(i), i.url = i.cleanUrl || i.url), i
        }, h.getIdByState = function(e) {
            var t, i = h.extractId(e.url);
            if (!i)
                if (t = h.getStateString(e), "undefined" != typeof h.stateToId[t]) i = h.stateToId[t];
                else if ("undefined" != typeof h.store.stateToId[t]) i = h.store.stateToId[t];
            else {
                for (;;)
                    if (i = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""), "undefined" == typeof h.idToState[i] && "undefined" == typeof h.store.idToState[i]) break;
                h.stateToId[t] = i, h.idToState[i] = e
            }
            return i
        }, h.normalizeState = function(e) {
            var t, i;
            return e && "object" == typeof e || (e = {}), "undefined" != typeof e.normalized ? e : (e.data && "object" == typeof e.data || (e.data = {}), t = {}, t.normalized = !0, t.title = e.title || "", t.url = h.getFullUrl(e.url ? e.url : h.getLocationHref()), t.hash = h.getShortUrl(t.url), t.data = h.cloneObject(e.data), t.id = h.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, i = !h.isEmptyObject(t.data), (t.title || i) && h.options.disableSuid !== !0 && (t.hash = h.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = h.getFullUrl(t.hash), (h.emulated.pushState || h.bugs.safariPoll) && h.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t)
        }, h.createStateObject = function(e, t, i) {
            var n = {
                "data": e,
                "title": t,
                "url": i
            };
            return n = h.normalizeState(n)
        }, h.getStateById = function(e) {
            e = String(e);
            var i = h.idToState[e] || h.store.idToState[e] || t;
            return i
        }, h.getStateString = function(e) {
            var t, i, n;
            return t = h.normalizeState(e), i = {
                "data": t.data,
                "title": e.title,
                "url": e.url
            }, n = u.stringify(i)
        }, h.getStateId = function(e) {
            var t, i;
            return t = h.normalizeState(e), i = t.id
        }, h.getHashByState = function(e) {
            var t, i;
            return t = h.normalizeState(e), i = t.hash
        }, h.extractId = function(e) {
            var t, i, n, a;
            return a = -1 != e.indexOf("#") ? e.split("#")[0] : e, i = /(.*)\&_suid=([0-9]+)$/.exec(a), n = i ? i[1] || e : e, t = i ? String(i[2] || "") : "", t || !1
        }, h.isTraditionalAnchor = function(e) {
            var t = !/[\/\?\.]/.test(e);
            return t
        }, h.extractState = function(e, t) {
            var i, n, a = null;
            return t = t || !1, i = h.extractId(e), i && (a = h.getStateById(i)), a || (n = h.getFullUrl(e), i = h.getIdByUrl(n) || !1, i && (a = h.getStateById(i)), a || !t || h.isTraditionalAnchor(e) || (a = h.createStateObject(null, null, n))), a
        }, h.getIdByUrl = function(e) {
            var i = h.urlToId[e] || h.store.urlToId[e] || t;
            return i
        }, h.getLastSavedState = function() {
            return h.savedStates[h.savedStates.length - 1] || t
        }, h.getLastStoredState = function() {
            return h.storedStates[h.storedStates.length - 1] || t
        }, h.hasUrlDuplicate = function(e) {
            var t, i = !1;
            return t = h.extractState(e.url), i = t && t.id !== e.id
        }, h.storeState = function(e) {
            return h.urlToId[e.url] = e.id, h.storedStates.push(h.cloneObject(e)), e
        }, h.isLastSavedState = function(e) {
            var t, i, n, a = !1;
            return h.savedStates.length && (t = e.id, i = h.getLastSavedState(), n = i.id, a = t === n), a
        }, h.saveState = function(e) {
            return h.isLastSavedState(e) ? !1 : (h.savedStates.push(h.cloneObject(e)), !0)
        }, h.getStateByIndex = function(e) {
            var t = null;
            return t = "undefined" == typeof e ? h.savedStates[h.savedStates.length - 1] : 0 > e ? h.savedStates[h.savedStates.length + e] : h.savedStates[e]
        }, h.getCurrentIndex = function() {
            var e = null;
            return e = h.savedStates.length < 1 ? 0 : h.savedStates.length - 1
        }, h.getHash = function(e) {
            var t, i = h.getLocationHref(e);
            return t = h.getHashByUrl(i)
        }, h.unescapeHash = function(e) {
            var t = h.normalizeHash(e);
            return t = decodeURIComponent(t)
        }, h.normalizeHash = function(e) {
            var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");
            return t
        }, h.setHash = function(e, t) {
            var i, a;
            return t !== !1 && h.busy() ? (h.pushQueue({
                "scope": h,
                "callback": h.setHash,
                "args": arguments,
                "queue": t
            }), !1) : (h.busy(!0), i = h.extractState(e, !0), i && !h.emulated.pushState ? h.pushState(i.data, i.title, i.url, !1) : h.getHash() !== e && (h.bugs.setHash ? (a = h.getPageUrl(), h.pushState(null, null, a + "#" + e, !1)) : n.location.hash = e), h)
        }, h.escapeHash = function(t) {
            var i = h.normalizeHash(t);
            return i = e.encodeURIComponent(i), h.bugs.hashEscape || (i = i.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), i
        }, h.getHashByUrl = function(e) {
            var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return t = h.unescapeHash(t)
        }, h.setTitle = function(e) {
            var t, i = e.title;
            i || (t = h.getStateByIndex(0), t && t.url === e.url && (i = t.title || h.options.initialTitle));
            try {
                n.getElementsByTagName("title")[0].innerHTML = i.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
            } catch (a) {}
            return n.title = i, h
        }, h.queues = [], h.busy = function(e) {
            if ("undefined" != typeof e ? h.busy.flag = e : "undefined" == typeof h.busy.flag && (h.busy.flag = !1), !h.busy.flag) {
                r(h.busy.timeout);
                var t = function() {
                    var e, i, n;
                    if (!h.busy.flag)
                        for (e = h.queues.length - 1; e >= 0; --e) i = h.queues[e], 0 !== i.length && (n = i.shift(), h.fireQueueItem(n), h.busy.timeout = o(t, h.options.busyDelay))
                };
                h.busy.timeout = o(t, h.options.busyDelay)
            }
            return h.busy.flag
        }, h.busy.flag = !1, h.fireQueueItem = function(e) {
            return e.callback.apply(e.scope || h, e.args || [])
        }, h.pushQueue = function(e) {
            return h.queues[e.queue || 0] = h.queues[e.queue || 0] || [], h.queues[e.queue || 0].push(e), h
        }, h.queue = function(e, t) {
            return "function" == typeof e && (e = {
                "callback": e
            }), "undefined" != typeof t && (e.queue = t), h.busy() ? h.pushQueue(e) : h.fireQueueItem(e), h
        }, h.clearQueue = function() {
            return h.busy.flag = !1, h.queues = [], h
        }, h.stateChanged = !1, h.doubleChecker = !1, h.doubleCheckComplete = function() {
            return h.stateChanged = !0, h.doubleCheckClear(), h
        }, h.doubleCheckClear = function() {
            return h.doubleChecker && (r(h.doubleChecker), h.doubleChecker = !1), h
        }, h.doubleCheck = function(e) {
            return h.stateChanged = !1, h.doubleCheckClear(), h.bugs.ieDoubleCheck && (h.doubleChecker = o(function() {
                return h.doubleCheckClear(), h.stateChanged || e(), !0
            }, h.options.doubleCheckInterval)), h
        }, h.safariStatePoll = function() {
            var t, i = h.extractState(h.getLocationHref());
            if (!h.isLastSavedState(i)) return t = i, t || (t = h.createStateObject()), h.Adapter.trigger(e, "popstate"), h
        }, h.back = function(e) {
            return e !== !1 && h.busy() ? (h.pushQueue({
                "scope": h,
                "callback": h.back,
                "args": arguments,
                "queue": e
            }), !1) : (h.busy(!0), h.doubleCheck(function() {
                h.back(!1)
            }), p.go(-1), !0)
        }, h.forward = function(e) {
            return e !== !1 && h.busy() ? (h.pushQueue({
                "scope": h,
                "callback": h.forward,
                "args": arguments,
                "queue": e
            }), !1) : (h.busy(!0), h.doubleCheck(function() {
                h.forward(!1)
            }), p.go(1), !0)
        }, h.go = function(e, t) {
            var i;
            if (e > 0)
                for (i = 1; e >= i; ++i) h.forward(t);
            else {
                if (!(0 > e)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
                for (i = -1; i >= e; --i) h.back(t)
            }
            return h
        }, h.emulated.pushState) {
            var g = function() {};
            h.pushState = h.pushState || g, h.replaceState = h.replaceState || g
        } else h.onPopState = function(t, i) {
            var n, a, s = !1,
                o = !1;
            return h.doubleCheckComplete(), (n = h.getHash()) ? (a = h.extractState(n || h.getLocationHref(), !0), a ? h.replaceState(a.data, a.title, a.url, !1) : (h.Adapter.trigger(e, "anchorchange"), h.busy(!1)), h.expectedStateId = !1, !1) : (s = h.Adapter.extractEventData("state", t, i) || !1, o = s ? h.getStateById(s) : h.expectedStateId ? h.getStateById(h.expectedStateId) : h.extractState(h.getLocationHref()), o || (o = h.createStateObject(null, null, h.getLocationHref())), h.expectedStateId = !1, h.isLastSavedState(o) ? (h.busy(!1), !1) : (h.storeState(o), h.saveState(o), h.setTitle(o), h.Adapter.trigger(e, "statechange"), h.busy(!1), !0))
        }, h.Adapter.bind(e, "popstate", h.onPopState), h.pushState = function(t, i, n, a) {
            if (h.getHashByUrl(n) && h.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if (a !== !1 && h.busy()) return h.pushQueue({
                "scope": h,
                "callback": h.pushState,
                "args": arguments,
                "queue": a
            }), !1;
            h.busy(!0);
            var s = h.createStateObject(t, i, n);
            return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.pushState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0
        }, h.replaceState = function(t, i, n, a) {
            if (h.getHashByUrl(n) && h.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if (a !== !1 && h.busy()) return h.pushQueue({
                "scope": h,
                "callback": h.replaceState,
                "args": arguments,
                "queue": a
            }), !1;
            h.busy(!0);
            var s = h.createStateObject(t, i, n);
            return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.replaceState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0
        }; if (s) {
            try {
                h.store = u.parse(s.getItem("History.store")) || {}
            } catch (m) {
                h.store = {}
            }
            h.normalizeStore()
        } else h.store = {}, h.normalizeStore();
        h.Adapter.bind(e, "unload", h.clearAllIntervals), h.saveState(h.storeState(h.extractState(h.getLocationHref(), !0))), s && (h.onUnload = function() {
            var e, t, i;
            try {
                e = u.parse(s.getItem("History.store")) || {}
            } catch (n) {
                e = {}
            }
            e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {};
            for (t in h.idToState) h.idToState.hasOwnProperty(t) && (e.idToState[t] = h.idToState[t]);
            for (t in h.urlToId) h.urlToId.hasOwnProperty(t) && (e.urlToId[t] = h.urlToId[t]);
            for (t in h.stateToId) h.stateToId.hasOwnProperty(t) && (e.stateToId[t] = h.stateToId[t]);
            h.store = e, h.normalizeStore(), i = u.stringify(e);
            try {
                s.setItem("History.store", i)
            } catch (a) {
                if (a.code !== DOMException.QUOTA_EXCEEDED_ERR) throw a;
                s.length && (s.removeItem("History.store"), s.setItem("History.store", i))
            }
        }, h.intervalList.push(l(h.onUnload, h.options.storeInterval)), h.Adapter.bind(e, "beforeunload", h.onUnload), h.Adapter.bind(e, "unload", h.onUnload)), h.emulated.pushState || (h.bugs.safariPoll && h.intervalList.push(l(h.safariStatePoll, h.options.safariPollInterval)), ("Apple Computer, Inc." === a.vendor || "Mozilla" === (a.appCodeName || "")) && (h.Adapter.bind(e, "hashchange", function() {
            h.Adapter.trigger(e, "popstate")
        }), h.getHash() && h.Adapter.onDomLoad(function() {
            h.Adapter.trigger(e, "hashchange")
        })))
    }, h.options && h.options.delayInit || h.init()
}(window),
function(e, t) {
    "use strict";
    var i = e.document,
        n = e.setTimeout || n,
        a = e.clearTimeout || a,
        s = e.setInterval || s,
        o = e.History = e.History || {};
    if ("undefined" != typeof o.initHtml4) throw new Error("History.js HTML4 Support has already been loaded...");
    o.initHtml4 = function() {
        return "undefined" != typeof o.initHtml4.initialized ? !1 : (o.initHtml4.initialized = !0, o.enabled = !0, o.savedHashes = [], o.isLastHash = function(e) {
            var t, i = o.getHashByIndex();
            return t = e === i
        }, o.isHashEqual = function(e, t) {
            return e = encodeURIComponent(e).replace(/%25/g, "%"), t = encodeURIComponent(t).replace(/%25/g, "%"), e === t
        }, o.saveHash = function(e) {
            return o.isLastHash(e) ? !1 : (o.savedHashes.push(e), !0)
        }, o.getHashByIndex = function(e) {
            var t = null;
            return t = "undefined" == typeof e ? o.savedHashes[o.savedHashes.length - 1] : 0 > e ? o.savedHashes[o.savedHashes.length + e] : o.savedHashes[e]
        }, o.discardedHashes = {}, o.discardedStates = {}, o.discardState = function(e, t, i) {
            var n, a = o.getHashByState(e);
            return n = {
                "discardedState": e,
                "backState": i,
                "forwardState": t
            }, o.discardedStates[a] = n, !0
        }, o.discardHash = function(e, t, i) {
            var n = {
                "discardedHash": e,
                "backState": i,
                "forwardState": t
            };
            return o.discardedHashes[e] = n, !0
        }, o.discardedState = function(e) {
            var t, i = o.getHashByState(e);
            return t = o.discardedStates[i] || !1
        }, o.discardedHash = function(e) {
            var t = o.discardedHashes[e] || !1;
            return t
        }, o.recycleState = function(e) {
            var t = o.getHashByState(e);
            return o.discardedState(e) && delete o.discardedStates[t], !0
        }, o.emulated.hashChange && (o.hashChangeInit = function() {
            o.checkerFunction = null;
            var t, n, a, r, l = "",
                c = Boolean(o.getHash());
            return o.isInternetExplorer() ? (t = "historyjs-iframe", n = i.createElement("iframe"), n.setAttribute("id", t), n.setAttribute("src", "#"), n.style.display = "none", i.body.appendChild(n), n.contentWindow.document.open(), n.contentWindow.document.close(), a = "", r = !1, o.checkerFunction = function() {
                if (r) return !1;
                r = !0;
                var t = o.getHash(),
                    i = o.getHash(n.contentWindow.document.location);
                return t !== l ? (l = t, i !== t && (a = i = t, n.contentWindow.document.open(), n.contentWindow.document.close(), n.contentWindow.document.location.hash = o.escapeHash(t)), o.Adapter.trigger(e, "hashchange")) : i !== a && (a = i, c && "" === i ? o.back() : o.setHash(i, !1)), r = !1, !0
            }) : o.checkerFunction = function() {
                var t = o.getHash() || "";
                return t !== l && (l = t, o.Adapter.trigger(e, "hashchange")), !0
            }, o.intervalList.push(s(o.checkerFunction, o.options.hashChangeInterval)), !0
        }, o.Adapter.onDomLoad(o.hashChangeInit)), o.emulated.pushState && (o.onHashChange = function(t) {
            var i, n = t && t.newURL || o.getLocationHref(),
                a = o.getHashByUrl(n),
                s = null,
                r = null;
            return o.isLastHash(a) ? (o.busy(!1), !1) : (o.doubleCheckComplete(), o.saveHash(a), a && o.isTraditionalAnchor(a) ? (o.Adapter.trigger(e, "anchorchange"), o.busy(!1), !1) : (s = o.extractState(o.getFullUrl(a || o.getLocationHref()), !0), o.isLastSavedState(s) ? (o.busy(!1), !1) : (r = o.getHashByState(s), (i = o.discardedState(s)) ? (o.getHashByIndex(-2) === o.getHashByState(i.forwardState) ? o.back(!1) : o.forward(!1), !1) : (o.pushState(s.data, s.title, encodeURI(s.url), !1), !0))))
        }, o.Adapter.bind(e, "hashchange", o.onHashChange), o.pushState = function(t, i, n, a) {
            if (n = encodeURI(n).replace(/%25/g, "%"), o.getHashByUrl(n)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
            if (a !== !1 && o.busy()) return o.pushQueue({
                "scope": o,
                "callback": o.pushState,
                "args": arguments,
                "queue": a
            }), !1;
            o.busy(!0);
            var s = o.createStateObject(t, i, n),
                r = o.getHashByState(s),
                l = o.getState(!1),
                c = o.getHashByState(l),
                u = o.getHash(),
                d = o.expectedStateId == s.id;
            return o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), r === c ? (o.busy(!1), !1) : (o.saveState(s), d || o.Adapter.trigger(e, "statechange"), o.isHashEqual(r, u) || o.isHashEqual(r, o.getShortUrl(o.getLocationHref())) || o.setHash(r, !1), o.busy(!1), !0)
        }, o.replaceState = function(t, i, n, a) {
            if (n = encodeURI(n).replace(/%25/g, "%"), o.getHashByUrl(n)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
            if (a !== !1 && o.busy()) return o.pushQueue({
                "scope": o,
                "callback": o.replaceState,
                "args": arguments,
                "queue": a
            }), !1;
            o.busy(!0);
            var s = o.createStateObject(t, i, n),
                r = o.getHashByState(s),
                l = o.getState(!1),
                c = o.getHashByState(l),
                u = o.getStateByIndex(-2);
            return o.discardState(l, s, u), r === c ? (o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), o.saveState(s), o.Adapter.trigger(e, "statechange"), o.busy(!1)) : o.pushState(s.data, s.title, s.url, !1), !0
        }), void(o.emulated.pushState && o.getHash() && !o.emulated.hashChange && o.Adapter.onDomLoad(function() {
            o.Adapter.trigger(e, "hashchange")
        })))
    }, "undefined" != typeof o.init && o.init()
}(window), parseUri.options = {
    "strictMode": !1,
    "key": ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    "q": {
        "name": "queryKey",
        "parser": /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    "parser": {
        "strict": /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        "loose": /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
},
function() {
    var e = [].slice;
    ! function(t, i) {
        var n;
        return n = function() {
            function e(e) {
                var n = this;
                this.$el = t(e), t(i).resize(function() {
                    return n.refresh()
                })
            }
            return e.prototype.start = function() {
                var e, t, i, n;
                if (this._overlay_visible()) return !1;
                for (this._add_overlay_layer(), n = this.$el.find("*[data-intro]").filter(":visible"), t = 0, i = n.length; i > t; t++) e = n[t], this._show_element(e);
                return this.$el.trigger("chardinJs:start")
            }, e.prototype.toggle = function() {
                return this._overlay_visible() ? this.stop() : this.start()
            }, e.prototype.refresh = function() {
                var e, t, i, n, a;
                if (this._overlay_visible()) {
                    for (n = this.$el.find("*[data-intro]"), a = [], t = 0, i = n.length; i > t; t++) e = n[t], a.push(this._position_helper_layer(e));
                    return a
                }
                return this
            }, e.prototype.stop = function() {
                return this.$el.find(".chardinjs-overlay").fadeOut(function() {
                    return t(this).remove()
                }), this.$el.find(".chardinjs-helper-layer").remove(), this.$el.find(".chardinjs-show-element").removeClass("chardinjs-show-element"), this.$el.find(".chardinjs-relative-position").removeClass("chardinjs-relative-position"), i.removeEventListener ? i.removeEventListener("keydown", this._onKeyDown, !0) : document.detachEvent && document.detachEvent("onkeydown", this._onKeyDown), this.$el.trigger("chardinJs:stop")
            }, e.prototype._overlay_visible = function() {
                return 0 !== this.$el.find(".chardinjs-overlay").length
            }, e.prototype._add_overlay_layer = function() {
                var e, t, i, n = this;
                return this._overlay_visible() ? !1 : (t = document.createElement("div"), i = "", t.className = "chardinjs-overlay", "BODY" === this.$el.prop("tagName") ? (i += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;", t.setAttribute("style", i)) : (e = this._get_offset(this.$el.get()[0]), e && (i += "width: " + e.width + "px; height:" + e.height + "px; top:" + e.top + "px;left: " + e.left + "px;", t.setAttribute("style", i))), this.$el.get()[0].appendChild(t), t.onclick = function() {
                    return n.stop()
                }, setTimeout(function() {
                    return i += "opacity: 1;", t.setAttribute("style", i)
                }, 10))
            }, e.prototype._get_position = function(e) {
                return e.getAttribute("data-position") || "bottom"
            }, e.prototype._place_tooltip = function(e) {
                var i, n, a, s, o, r, l;
                switch (r = t(e).data("tooltip_layer"), l = this._get_offset(r), r.style.top = null, r.style.right = null, r.style.bottom = null, r.style.bottomlower = null, r.style.left = null, this._get_position(e)) {
                    case "top":
                    case "bottom":
                    case "bottomlower":
                        a = this._get_offset(e), o = a.width, n = t(r).width(), r.style.left = "" + (o / 2 - l.width / 2) + "px";
                        break;
                    case "left":
                    case "right":
                        a = this._get_offset(e), s = a.height, i = t(r).height(), r.style.top = "" + (s / 2 - l.height / 2) + "px"
                }
                switch (this._get_position(e)) {
                    case "left":
                        return r.style.left = "-" + (l.width - 34) + "px";
                    case "right":
                        return r.style.right = "-" + (l.width - 34) + "px";
                    case "bottom":
                        return r.style.bottom = "-" + l.height + "px";
                    case "bottomlower":
                        return r.style.bottom = "-" + l.height + "px";
                    case "top":
                        return r.style.top = "-" + l.height + "px"
                }
            }, e.prototype._position_helper_layer = function(e) {
                var i, n;
                return n = t(e).data("helper_layer"), i = this._get_offset(e), n.setAttribute("style", "width: " + i.width + "px; height:" + i.height + "px; top:" + i.top + "px; left: " + i.left + "px;")
            }, e.prototype._show_element = function(e) {
                var i, n, a, s;
                return n = this._get_offset(e), a = document.createElement("div"), s = document.createElement("div"), t(e).data("helper_layer", a).data("tooltip_layer", s), e.id && a.setAttribute("data-id", e.id), a.className = "chardinjs-helper-layer chardinjs-" + this._get_position(e), this._position_helper_layer(e), this.$el.get()[0].appendChild(a), s.className = "chardinjs-tooltip chardinjs-" + this._get_position(e), s.innerHTML = "<div class='chardinjs-tooltiptext'>" + e.getAttribute("data-intro") + "</div>", a.appendChild(s), this._place_tooltip(e), e.className += " chardinjs-show-element", i = "", e.currentStyle ? i = e.currentStyle.position : document.defaultView && document.defaultView.getComputedStyle && (i = document.defaultView.getComputedStyle(e, null).getPropertyValue("position")), i = i.toLowerCase(), "absolute" !== i && "relative" !== i ? e.className += " chardinjs-relative-position" : void 0
            }, e.prototype._get_offset = function(e) {
                var t, i, n;
                for (t = {
                    "width": e.offsetWidth,
                    "height": e.offsetHeight
                }, i = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) i += e.offsetLeft, n += e.offsetTop, e = e.offsetParent;
                return t.top = n, t.left = i, t
            }, e
        }(), t.fn.extend({
            "chardinJs": function() {
                var i, a, s, o;
                return o = arguments[0], a = 2 <= arguments.length ? e.call(arguments, 1) : [], i = t(this[0]), s = i.data("chardinJs"), s || i.data("chardinJs", s = new n(this, o)), "string" == typeof o && s[o].apply(s, a), s
            }
        })
    }(window.jQuery, window)
}.call(this),
function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.Handlebars = e.Handlebars || t()
}(this, function() {
    var e = function() {
        "use strict";

        function e(e) {
            this.string = e
        }
        var t;
        return e.prototype.toString = function() {
            return "" + this.string
        }, t = e
    }(),
        t = function(e) {
            "use strict";

            function t(e) {
                return l[e]
            }

            function i(e) {
                for (var t = 1; t < arguments.length; t++)
                    for (var i in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], i) && (e[i] = arguments[t][i]);
                return e
            }

            function n(e) {
                return e instanceof r ? e.toString() : null == e ? "" : e ? (e = "" + e, u.test(e) ? e.replace(c, t) : e) : e + ""
            }

            function a(e) {
                return e || 0 === e ? p(e) && 0 === e.length ? !0 : !1 : !0
            }

            function s(e, t) {
                return (e ? e + "." : "") + t
            }
            var o = {}, r = e,
                l = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                }, c = /[&<>"'`]/g,
                u = /[&<>"'`]/;
            o.extend = i;
            var d = Object.prototype.toString;
            o.toString = d;
            var h = function(e) {
                return "function" == typeof e
            };
            h(/x/) && (h = function(e) {
                return "function" == typeof e && "[object Function]" === d.call(e)
            });
            var h;
            o.isFunction = h;
            var p = Array.isArray || function(e) {
                    return e && "object" == typeof e ? "[object Array]" === d.call(e) : !1
                };
            return o.isArray = p, o.escapeExpression = n, o.isEmpty = a, o.appendContextPath = s, o
        }(e),
        i = function() {
            "use strict";

            function e(e, t) {
                var n;
                t && t.firstLine && (n = t.firstLine, e += " - " + n + ":" + t.firstColumn);
                for (var a = Error.prototype.constructor.call(this, e), s = 0; s < i.length; s++) this[i[s]] = a[i[s]];
                n && (this.lineNumber = n, this.column = t.firstColumn)
            }
            var t, i = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
            return e.prototype = new Error, t = e
        }(),
        n = function(e, t) {
            "use strict";

            function i(e, t) {
                this.helpers = e || {}, this.partials = t || {}, n(this)
            }

            function n(e) {
                e.registerHelper("helperMissing", function() {
                    if (1 === arguments.length) return void 0;
                    throw new o("Missing helper: '" + arguments[arguments.length - 1].name + "'")
                }), e.registerHelper("blockHelperMissing", function(t, i) {
                    var n = i.inverse,
                        a = i.fn;
                    if (t === !0) return a(this);
                    if (t === !1 || null == t) return n(this);
                    if (u(t)) return t.length > 0 ? (i.ids && (i.ids = [i.name]), e.helpers.each(t, i)) : n(this);
                    if (i.data && i.ids) {
                        var o = m(i.data);
                        o.contextPath = s.appendContextPath(i.data.contextPath, i.name), i = {
                            "data": o
                        }
                    }
                    return a(t, i)
                }), e.registerHelper("each", function(e, t) {
                    if (!t) throw new o("Must pass iterator to #each");
                    var i, n, a = t.fn,
                        r = t.inverse,
                        l = 0,
                        c = "";
                    if (t.data && t.ids && (n = s.appendContextPath(t.data.contextPath, t.ids[0]) + "."), d(e) && (e = e.call(this)), t.data && (i = m(t.data)), e && "object" == typeof e)
                        if (u(e))
                            for (var h = e.length; h > l; l++) i && (i.index = l, i.first = 0 === l, i.last = l === e.length - 1, n && (i.contextPath = n + l)), c += a(e[l], {
                                "data": i
                            });
                        else
                            for (var p in e) e.hasOwnProperty(p) && (i && (i.key = p, i.index = l, i.first = 0 === l, n && (i.contextPath = n + p)), c += a(e[p], {
                                "data": i
                            }), l++);
                    return 0 === l && (c = r(this)), c
                }), e.registerHelper("if", function(e, t) {
                    return d(e) && (e = e.call(this)), !t.hash.includeZero && !e || s.isEmpty(e) ? t.inverse(this) : t.fn(this)
                }), e.registerHelper("unless", function(t, i) {
                    return e.helpers["if"].call(this, t, {
                        "fn": i.inverse,
                        "inverse": i.fn,
                        "hash": i.hash
                    })
                }), e.registerHelper("with", function(e, t) {
                    d(e) && (e = e.call(this));
                    var i = t.fn;
                    if (s.isEmpty(e)) return t.inverse(this);
                    if (t.data && t.ids) {
                        var n = m(t.data);
                        n.contextPath = s.appendContextPath(t.data.contextPath, t.ids[0]), t = {
                            "data": n
                        }
                    }
                    return i(e, t)
                }), e.registerHelper("log", function(t, i) {
                    var n = i.data && null != i.data.level ? parseInt(i.data.level, 10) : 1;
                    e.log(n, t)
                }), e.registerHelper("lookup", function(e, t) {
                    return e && e[t]
                })
            }
            var a = {}, s = e,
                o = t,
                r = "2.0.0";
            a.VERSION = r;
            var l = 6;
            a.COMPILER_REVISION = l;
            var c = {
                "1": "<= 1.0.rc.2",
                "2": "== 1.0.0-rc.3",
                "3": "== 1.0.0-rc.4",
                "4": "== 1.x.x",
                "5": "== 2.0.0-alpha.x",
                "6": ">= 2.0.0-beta.1"
            };
            a.REVISION_CHANGES = c;
            var u = s.isArray,
                d = s.isFunction,
                h = s.toString,
                p = "[object Object]";
            a.HandlebarsEnvironment = i, i.prototype = {
                "constructor": i,
                "logger": f,
                "log": g,
                "registerHelper": function(e, t) {
                    if (h.call(e) === p) {
                        if (t) throw new o("Arg not supported with multiple helpers");
                        s.extend(this.helpers, e)
                    } else this.helpers[e] = t
                },
                "unregisterHelper": function(e) {
                    delete this.helpers[e]
                },
                "registerPartial": function(e, t) {
                    h.call(e) === p ? s.extend(this.partials, e) : this.partials[e] = t
                },
                "unregisterPartial": function(e) {
                    delete this.partials[e]
                }
            };
            var f = {
                "methodMap": {
                    "0": "debug",
                    "1": "info",
                    "2": "warn",
                    "3": "error"
                },
                "DEBUG": 0,
                "INFO": 1,
                "WARN": 2,
                "ERROR": 3,
                "level": 3,
                "log": function(e, t) {
                    if (f.level <= e) {
                        var i = f.methodMap[e];
                        "undefined" != typeof console && console[i] && console[i].call(console, t)
                    }
                }
            };
            a.logger = f;
            var g = f.log;
            a.log = g;
            var m = function(e) {
                var t = s.extend({}, e);
                return t._parent = e, t
            };
            return a.createFrame = m, a
        }(t, i),
        a = function(e, t, i) {
            "use strict";

            function n(e) {
                var t = e && e[0] || 1,
                    i = h;
                if (t !== i) {
                    if (i > t) {
                        var n = p[i],
                            a = p[t];
                        throw new d("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + a + ").")
                    }
                    throw new d("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
                }
            }

            function a(e, t) {
                if (!t) throw new d("No environment passed to template");
                if (!e || !e.main) throw new d("Unknown template object: " + typeof e);
                t.VM.checkRevision(e.compiler);
                var i = function(i, n, a, s, o, r, l, c, h) {
                    o && (s = u.extend({}, s, o));
                    var p = t.VM.invokePartial.call(this, i, a, s, r, l, c, h);
                    if (null == p && t.compile) {
                        var f = {
                            "helpers": r,
                            "partials": l,
                            "data": c,
                            "depths": h
                        };
                        l[a] = t.compile(i, {
                            "data": void 0 !== c,
                            "compat": e.compat
                        }, t), p = l[a](s, f)
                    }
                    if (null != p) {
                        if (n) {
                            for (var g = p.split("\n"), m = 0, v = g.length; v > m && (g[m] || m + 1 !== v); m++) g[m] = n + g[m];
                            p = g.join("\n")
                        }
                        return p
                    }
                    throw new d("The partial " + a + " could not be compiled when running in runtime-only mode")
                }, n = {
                        "lookup": function(e, t) {
                            for (var i = e.length, n = 0; i > n; n++)
                                if (e[n] && null != e[n][t]) return e[n][t]
                        },
                        "lambda": function(e, t) {
                            return "function" == typeof e ? e.call(t) : e
                        },
                        "escapeExpression": u.escapeExpression,
                        "invokePartial": i,
                        "fn": function(t) {
                            return e[t]
                        },
                        "programs": [],
                        "program": function(e, t, i) {
                            var n = this.programs[e],
                                a = this.fn(e);
                            return t || i ? n = s(this, e, a, t, i) : n || (n = this.programs[e] = s(this, e, a)), n
                        },
                        "data": function(e, t) {
                            for (; e && t--;) e = e._parent;
                            return e
                        },
                        "merge": function(e, t) {
                            var i = e || t;
                            return e && t && e !== t && (i = u.extend({}, t, e)), i
                        },
                        "noop": t.VM.noop,
                        "compilerInfo": e.compiler
                    }, a = function(t, i) {
                        i = i || {};
                        var s = i.data;
                        a._setup(i), !i.partial && e.useData && (s = l(t, s));
                        var o;
                        return e.useDepths && (o = i.depths ? [t].concat(i.depths) : [t]), e.main.call(n, t, n.helpers, n.partials, s, o)
                    };
                return a.isTop = !0, a._setup = function(i) {
                    i.partial ? (n.helpers = i.helpers, n.partials = i.partials) : (n.helpers = n.merge(i.helpers, t.helpers), e.usePartial && (n.partials = n.merge(i.partials, t.partials)))
                }, a._child = function(t, i, a) {
                    if (e.useDepths && !a) throw new d("must pass parent depths");
                    return s(n, t, e[t], i, a)
                }, a
            }

            function s(e, t, i, n, a) {
                var s = function(t, s) {
                    return s = s || {}, i.call(e, t, e.helpers, e.partials, s.data || n, a && [t].concat(a))
                };
                return s.program = t, s.depth = a ? a.length : 0, s
            }

            function o(e, t, i, n, a, s, o) {
                var r = {
                    "partial": !0,
                    "helpers": n,
                    "partials": a,
                    "data": s,
                    "depths": o
                };
                if (void 0 === e) throw new d("The partial " + t + " could not be found");
                return e instanceof Function ? e(i, r) : void 0
            }

            function r() {
                return ""
            }

            function l(e, t) {
                return t && "root" in t || (t = t ? f(t) : {}, t.root = e), t
            }
            var c = {}, u = e,
                d = t,
                h = i.COMPILER_REVISION,
                p = i.REVISION_CHANGES,
                f = i.createFrame;
            return c.checkRevision = n, c.template = a, c.program = s, c.invokePartial = o, c.noop = r, c
        }(t, i, n),
        s = function(e, t, i, n, a) {
            "use strict";
            var s, o = e,
                r = t,
                l = i,
                c = n,
                u = a,
                d = function() {
                    var e = new o.HandlebarsEnvironment;
                    return c.extend(e, o), e.SafeString = r, e.Exception = l, e.Utils = c, e.escapeExpression = c.escapeExpression, e.VM = u, e.template = function(t) {
                        return u.template(t, e)
                    }, e
                }, h = d();
            return h.create = d, h["default"] = h, s = h
        }(n, e, i, t, a);
    return s
}), ! function(e, t, i, n) {
    "use strict";

    function a(e, t, i) {
        return setTimeout(u(e, i), t)
    }

    function s(e, t, i) {
        return Array.isArray(e) ? (o(e, i[t], i), !0) : !1
    }

    function o(e, t, i) {
        var a;
        if (e)
            if (e.forEach) e.forEach(t, i);
            else if (e.length !== n)
            for (a = 0; a < e.length;) t.call(i, e[a], a, e), a++;
        else
            for (a in e) e.hasOwnProperty(a) && t.call(i, e[a], a, e)
    }

    function r(e, t, i) {
        for (var a = Object.keys(t), s = 0; s < a.length;)(!i || i && e[a[s]] === n) && (e[a[s]] = t[a[s]]), s++;
        return e
    }

    function l(e, t) {
        return r(e, t, !0)
    }

    function c(e, t, i) {
        var n, a = t.prototype;
        n = e.prototype = Object.create(a), n.constructor = e, n._super = a, i && r(n, i)
    }

    function u(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }

    function d(e, t) {
        return typeof e == ue ? e.apply(t ? t[0] || n : n, t) : e
    }

    function h(e, t) {
        return e === n ? t : e
    }

    function p(e, t, i) {
        o(v(t), function(t) {
            e.addEventListener(t, i, !1)
        })
    }

    function f(e, t, i) {
        o(v(t), function(t) {
            e.removeEventListener(t, i, !1)
        })
    }

    function g(e, t) {
        for (; e;) {
            if (e == t) return !0;
            e = e.parentNode
        }
        return !1
    }

    function m(e, t) {
        return e.indexOf(t) > -1
    }

    function v(e) {
        return e.trim().split(/\s+/g)
    }

    function _(e, t, i) {
        if (e.indexOf && !i) return e.indexOf(t);
        for (var n = 0; n < e.length;) {
            if (i && e[n][i] == t || !i && e[n] === t) return n;
            n++
        }
        return -1
    }

    function b(e) {
        return Array.prototype.slice.call(e, 0)
    }

    function y(e, t, i) {
        for (var n = [], a = [], s = 0; s < e.length;) {
            var o = t ? e[s][t] : e[s];
            _(a, o) < 0 && n.push(e[s]), a[s] = o, s++
        }
        return i && (n = t ? n.sort(function(e, i) {
            return e[t] > i[t]
        }) : n.sort()), n
    }

    function S(e, t) {
        for (var i, a, s = t[0].toUpperCase() + t.slice(1), o = 0; o < le.length;) {
            if (i = le[o], a = i ? i + s : t, a in e) return a;
            o++
        }
        return n
    }

    function w() {
        return fe++
    }

    function T(e) {
        var t = e.ownerDocument;
        return t.defaultView || t.parentWindow
    }

    function k(e, t) {
        var i = this;
        this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function(t) {
            d(e.options.enable, [e]) && i.handler(t)
        }, this.init()
    }

    function x(e) {
        var t, i = e.options.inputClass;
        return new(t = i ? i : ve ? H : _e ? G : me ? Y : N)(e, C)
    }

    function C(e, t, i) {
        var n = i.pointers.length,
            a = i.changedPointers.length,
            s = t & ke && n - a === 0,
            o = t & (Ce | $e) && n - a === 0;
        i.isFirst = !! s, i.isFinal = !! o, s && (e.session = {}), i.eventType = t, $(e, i), e.emit("hammer.input", i), e.recognize(i), e.session.prevInput = i
    }

    function $(e, t) {
        var i = e.session,
            n = t.pointers,
            a = n.length;
        i.firstInput || (i.firstInput = D(t)), a > 1 && !i.firstMultiple ? i.firstMultiple = D(t) : 1 === a && (i.firstMultiple = !1);
        var s = i.firstInput,
            o = i.firstMultiple,
            r = o ? o.center : s.center,
            l = t.center = I(n);
        t.timeStamp = pe(), t.deltaTime = t.timeStamp - s.timeStamp, t.angle = P(r, l), t.distance = q(r, l), E(i, t), t.offsetDirection = A(t.deltaX, t.deltaY), t.scale = o ? O(o.pointers, n) : 1, t.rotation = o ? F(o.pointers, n) : 0, M(i, t);
        var c = e.element;
        g(t.srcEvent.target, c) && (c = t.srcEvent.target), t.target = c
    }

    function E(e, t) {
        var i = t.center,
            n = e.offsetDelta || {}, a = e.prevDelta || {}, s = e.prevInput || {};
        (t.eventType === ke || s.eventType === Ce) && (a = e.prevDelta = {
                "x": s.deltaX || 0,
                "y": s.deltaY || 0
            }, n = e.offsetDelta = {
                "x": i.x,
                "y": i.y
            }), t.deltaX = a.x + (i.x - n.x), t.deltaY = a.y + (i.y - n.y)
    }

    function M(e, t) {
        var i, a, s, o, r = e.lastInterval || t,
            l = t.timeStamp - r.timeStamp;
        if (t.eventType != $e && (l > Te || r.velocity === n)) {
            var c = r.deltaX - t.deltaX,
                u = r.deltaY - t.deltaY,
                d = L(l, c, u);
            a = d.x, s = d.y, i = he(d.x) > he(d.y) ? d.x : d.y, o = A(c, u), e.lastInterval = t
        } else i = r.velocity, a = r.velocityX, s = r.velocityY, o = r.direction;
        t.velocity = i, t.velocityX = a, t.velocityY = s, t.direction = o
    }

    function D(e) {
        for (var t = [], i = 0; i < e.pointers.length;) t[i] = {
            "clientX": de(e.pointers[i].clientX),
            "clientY": de(e.pointers[i].clientY)
        }, i++;
        return {
            "timeStamp": pe(),
            "pointers": t,
            "center": I(t),
            "deltaX": e.deltaX,
            "deltaY": e.deltaY
        }
    }

    function I(e) {
        var t = e.length;
        if (1 === t) return {
            "x": de(e[0].clientX),
            "y": de(e[0].clientY)
        };
        for (var i = 0, n = 0, a = 0; t > a;) i += e[a].clientX, n += e[a].clientY, a++;
        return {
            "x": de(i / t),
            "y": de(n / t)
        }
    }

    function L(e, t, i) {
        return {
            "x": t / e || 0,
            "y": i / e || 0
        }
    }

    function A(e, t) {
        return e === t ? Ee : he(e) >= he(t) ? e > 0 ? Me : De : t > 0 ? Ie : Le
    }

    function q(e, t, i) {
        i || (i = Fe);
        var n = t[i[0]] - e[i[0]],
            a = t[i[1]] - e[i[1]];
        return Math.sqrt(n * n + a * a)
    }

    function P(e, t, i) {
        i || (i = Fe);
        var n = t[i[0]] - e[i[0]],
            a = t[i[1]] - e[i[1]];
        return 180 * Math.atan2(a, n) / Math.PI
    }

    function F(e, t) {
        return P(t[1], t[0], Oe) - P(e[1], e[0], Oe)
    }

    function O(e, t) {
        return q(t[0], t[1], Oe) / q(e[0], e[1], Oe)
    }

    function N() {
        this.evEl = He, this.evWin = Ue, this.allow = !0, this.pressed = !1, k.apply(this, arguments)
    }

    function H() {
        this.evEl = ze, this.evWin = Ye, k.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }

    function U() {
        this.evTarget = Be, this.evWin = We, this.started = !1, k.apply(this, arguments)
    }

    function j(e, t) {
        var i = b(e.touches),
            n = b(e.changedTouches);
        return t & (Ce | $e) && (i = y(i.concat(n), "identifier", !0)), [i, n]
    }

    function G() {
        this.evTarget = Ve, this.targetIds = {}, k.apply(this, arguments)
    }

    function z(e, t) {
        var i = b(e.touches),
            n = this.targetIds;
        if (t & (ke | xe) && 1 === i.length) return n[i[0].identifier] = !0, [i, i];
        var a, s, o = b(e.changedTouches),
            r = [],
            l = this.target;
        if (s = i.filter(function(e) {
            return g(e.target, l)
        }), t === ke)
            for (a = 0; a < s.length;) n[s[a].identifier] = !0, a++;
        for (a = 0; a < o.length;) n[o[a].identifier] && r.push(o[a]), t & (Ce | $e) && delete n[o[a].identifier], a++;
        return r.length ? [y(s.concat(r), "identifier", !0), r] : void 0
    }

    function Y() {
        k.apply(this, arguments);
        var e = u(this.handler, this);
        this.touch = new G(this.manager, e), this.mouse = new N(this.manager, e)
    }

    function R(e, t) {
        this.manager = e, this.set(t)
    }

    function B(e) {
        if (m(e, tt)) return tt;
        var t = m(e, it),
            i = m(e, nt);
        return t && i ? it + " " + nt : t || i ? t ? it : nt : m(e, et) ? et : Ze
    }

    function W(e) {
        this.id = w(), this.manager = null, this.options = l(e || {}, this.defaults), this.options.enable = h(this.options.enable, !0), this.state = at, this.simultaneous = {}, this.requireFail = []
    }

    function J(e) {
        return e & ct ? "cancel" : e & rt ? "end" : e & ot ? "move" : e & st ? "start" : ""
    }

    function V(e) {
        return e == Le ? "down" : e == Ie ? "up" : e == Me ? "left" : e == De ? "right" : ""
    }

    function K(e, t) {
        var i = t.manager;
        return i ? i.get(e) : e
    }

    function X() {
        W.apply(this, arguments)
    }

    function Q() {
        X.apply(this, arguments), this.pX = null, this.pY = null
    }

    function Z() {
        X.apply(this, arguments)
    }

    function ee() {
        W.apply(this, arguments), this._timer = null, this._input = null
    }

    function te() {
        X.apply(this, arguments)
    }

    function ie() {
        X.apply(this, arguments)
    }

    function ne() {
        W.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }

    function ae(e, t) {
        return t = t || {}, t.recognizers = h(t.recognizers, ae.defaults.preset), new se(e, t)
    }

    function se(e, t) {
        t = t || {}, this.options = l(t, ae.defaults), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = e, this.input = x(this), this.touchAction = new R(this, this.options.touchAction), oe(this, !0), o(t.recognizers, function(e) {
            var t = this.add(new e[0](e[1]));
            e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3])
        }, this)
    }

    function oe(e, t) {
        var i = e.element;
        o(e.options.cssProps, function(e, n) {
            i.style[S(i.style, n)] = t ? e : ""
        })
    }

    function re(e, i) {
        var n = t.createEvent("Event");
        n.initEvent(e, !0, !0), n.gesture = i, i.target.dispatchEvent(n)
    }
    var le = ["", "webkit", "moz", "MS", "ms", "o"],
        ce = t.createElement("div"),
        ue = "function",
        de = Math.round,
        he = Math.abs,
        pe = Date.now,
        fe = 1,
        ge = /mobile|tablet|ip(ad|hone|od)|android/i,
        me = "ontouchstart" in e,
        ve = S(e, "PointerEvent") !== n,
        _e = me && ge.test(navigator.userAgent),
        be = "touch",
        ye = "pen",
        Se = "mouse",
        we = "kinect",
        Te = 25,
        ke = 1,
        xe = 2,
        Ce = 4,
        $e = 8,
        Ee = 1,
        Me = 2,
        De = 4,
        Ie = 8,
        Le = 16,
        Ae = Me | De,
        qe = Ie | Le,
        Pe = Ae | qe,
        Fe = ["x", "y"],
        Oe = ["clientX", "clientY"];
    k.prototype = {
        "handler": function() {},
        "init": function() {
            this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(T(this.element), this.evWin, this.domHandler)
        },
        "destroy": function() {
            this.evEl && f(this.element, this.evEl, this.domHandler), this.evTarget && f(this.target, this.evTarget, this.domHandler), this.evWin && f(T(this.element), this.evWin, this.domHandler)
        }
    };
    var Ne = {
        "mousedown": ke,
        "mousemove": xe,
        "mouseup": Ce
    }, He = "mousedown",
        Ue = "mousemove mouseup";
    c(N, k, {
        "handler": function(e) {
            var t = Ne[e.type];
            t & ke && 0 === e.button && (this.pressed = !0), t & xe && 1 !== e.which && (t = Ce), this.pressed && this.allow && (t & Ce && (this.pressed = !1), this.callback(this.manager, t, {
                "pointers": [e],
                "changedPointers": [e],
                "pointerType": Se,
                "srcEvent": e
            }))
        }
    });
    var je = {
        "pointerdown": ke,
        "pointermove": xe,
        "pointerup": Ce,
        "pointercancel": $e,
        "pointerout": $e
    }, Ge = {
            "2": be,
            "3": ye,
            "4": Se,
            "5": we
        }, ze = "pointerdown",
        Ye = "pointermove pointerup pointercancel";
    e.MSPointerEvent && (ze = "MSPointerDown", Ye = "MSPointerMove MSPointerUp MSPointerCancel"), c(H, k, {
        "handler": function(e) {
            var t = this.store,
                i = !1,
                n = e.type.toLowerCase().replace("ms", ""),
                a = je[n],
                s = Ge[e.pointerType] || e.pointerType,
                o = s == be,
                r = _(t, e.pointerId, "pointerId");
            a & ke && (0 === e.button || o) ? 0 > r && (t.push(e), r = t.length - 1) : a & (Ce | $e) && (i = !0), 0 > r || (t[r] = e, this.callback(this.manager, a, {
                "pointers": t,
                "changedPointers": [e],
                "pointerType": s,
                "srcEvent": e
            }), i && t.splice(r, 1))
        }
    });
    var Re = {
        "touchstart": ke,
        "touchmove": xe,
        "touchend": Ce,
        "touchcancel": $e
    }, Be = "touchstart",
        We = "touchstart touchmove touchend touchcancel";
    c(U, k, {
        "handler": function(e) {
            var t = Re[e.type];
            if (t === ke && (this.started = !0), this.started) {
                var i = j.call(this, e, t);
                t & (Ce | $e) && i[0].length - i[1].length === 0 && (this.started = !1), this.callback(this.manager, t, {
                    "pointers": i[0],
                    "changedPointers": i[1],
                    "pointerType": be,
                    "srcEvent": e
                })
            }
        }
    });
    var Je = {
        "touchstart": ke,
        "touchmove": xe,
        "touchend": Ce,
        "touchcancel": $e
    }, Ve = "touchstart touchmove touchend touchcancel";
    c(G, k, {
        "handler": function(e) {
            var t = Je[e.type],
                i = z.call(this, e, t);
            i && this.callback(this.manager, t, {
                "pointers": i[0],
                "changedPointers": i[1],
                "pointerType": be,
                "srcEvent": e
            })
        }
    }), c(Y, k, {
        "handler": function(e, t, i) {
            var n = i.pointerType == be,
                a = i.pointerType == Se;
            if (n) this.mouse.allow = !1;
            else if (a && !this.mouse.allow) return;
            t & (Ce | $e) && (this.mouse.allow = !0), this.callback(e, t, i)
        },
        "destroy": function() {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var Ke = S(ce.style, "touchAction"),
        Xe = Ke !== n,
        Qe = "compute",
        Ze = "auto",
        et = "manipulation",
        tt = "none",
        it = "pan-x",
        nt = "pan-y";
    R.prototype = {
        "set": function(e) {
            e == Qe && (e = this.compute()), Xe && (this.manager.element.style[Ke] = e), this.actions = e.toLowerCase().trim()
        },
        "update": function() {
            this.set(this.manager.options.touchAction)
        },
        "compute": function() {
            var e = [];
            return o(this.manager.recognizers, function(t) {
                d(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
            }), B(e.join(" "))
        },
        "preventDefaults": function(e) {
            if (!Xe) {
                var t = e.srcEvent,
                    i = e.offsetDirection;
                if (this.manager.session.prevented) return void t.preventDefault();
                var n = this.actions,
                    a = m(n, tt),
                    s = m(n, nt),
                    o = m(n, it);
                return a || s && i & Ae || o && i & qe ? this.preventSrc(t) : void 0
            }
        },
        "preventSrc": function(e) {
            this.manager.session.prevented = !0, e.preventDefault()
        }
    };
    var at = 1,
        st = 2,
        ot = 4,
        rt = 8,
        lt = rt,
        ct = 16,
        ut = 32;
    W.prototype = {
        "defaults": {},
        "set": function(e) {
            return r(this.options, e), this.manager && this.manager.touchAction.update(), this
        },
        "recognizeWith": function(e) {
            if (s(e, "recognizeWith", this)) return this;
            var t = this.simultaneous;
            return e = K(e, this), t[e.id] || (t[e.id] = e, e.recognizeWith(this)), this
        },
        "dropRecognizeWith": function(e) {
            return s(e, "dropRecognizeWith", this) ? this : (e = K(e, this), delete this.simultaneous[e.id], this)
        },
        "requireFailure": function(e) {
            if (s(e, "requireFailure", this)) return this;
            var t = this.requireFail;
            return e = K(e, this), -1 === _(t, e) && (t.push(e), e.requireFailure(this)), this
        },
        "dropRequireFailure": function(e) {
            if (s(e, "dropRequireFailure", this)) return this;
            e = K(e, this);
            var t = _(this.requireFail, e);
            return t > -1 && this.requireFail.splice(t, 1), this
        },
        "hasRequireFailures": function() {
            return this.requireFail.length > 0
        },
        "canRecognizeWith": function(e) {
            return !!this.simultaneous[e.id]
        },
        "emit": function(e) {
            function t(t) {
                i.manager.emit(i.options.event + (t ? J(n) : ""), e)
            }
            var i = this,
                n = this.state;
            rt > n && t(!0), t(), n >= rt && t(!0)
        },
        "tryEmit": function(e) {
            return this.canEmit() ? this.emit(e) : void(this.state = ut)
        },
        "canEmit": function() {
            for (var e = 0; e < this.requireFail.length;) {
                if (!(this.requireFail[e].state & (ut | at))) return !1;
                e++
            }
            return !0
        },
        "recognize": function(e) {
            var t = r({}, e);
            return d(this.options.enable, [this, t]) ? (this.state & (lt | ct | ut) && (this.state = at), this.state = this.process(t), void(this.state & (st | ot | rt | ct) && this.tryEmit(t))) : (this.reset(), void(this.state = ut))
        },
        "process": function() {},
        "getTouchAction": function() {},
        "reset": function() {}
    }, c(X, W, {
        "defaults": {
            "pointers": 1
        },
        "attrTest": function(e) {
            var t = this.options.pointers;
            return 0 === t || e.pointers.length === t
        },
        "process": function(e) {
            var t = this.state,
                i = e.eventType,
                n = t & (st | ot),
                a = this.attrTest(e);
            return n && (i & $e || !a) ? t | ct : n || a ? i & Ce ? t | rt : t & st ? t | ot : st : ut
        }
    }), c(Q, X, {
        "defaults": {
            "event": "pan",
            "threshold": 10,
            "pointers": 1,
            "direction": Pe
        },
        "getTouchAction": function() {
            var e = this.options.direction,
                t = [];
            return e & Ae && t.push(nt), e & qe && t.push(it), t
        },
        "directionTest": function(e) {
            var t = this.options,
                i = !0,
                n = e.distance,
                a = e.direction,
                s = e.deltaX,
                o = e.deltaY;
            return a & t.direction || (t.direction & Ae ? (a = 0 === s ? Ee : 0 > s ? Me : De, i = s != this.pX, n = Math.abs(e.deltaX)) : (a = 0 === o ? Ee : 0 > o ? Ie : Le, i = o != this.pY, n = Math.abs(e.deltaY))), e.direction = a, i && n > t.threshold && a & t.direction
        },
        "attrTest": function(e) {
            return X.prototype.attrTest.call(this, e) && (this.state & st || !(this.state & st) && this.directionTest(e))
        },
        "emit": function(e) {
            this.pX = e.deltaX, this.pY = e.deltaY;
            var t = V(e.direction);
            t && this.manager.emit(this.options.event + t, e), this._super.emit.call(this, e)
        }
    }), c(Z, X, {
        "defaults": {
            "event": "pinch",
            "threshold": 0,
            "pointers": 2
        },
        "getTouchAction": function() {
            return [tt]
        },
        "attrTest": function(e) {
            return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & st)
        },
        "emit": function(e) {
            if (this._super.emit.call(this, e), 1 !== e.scale) {
                var t = e.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + t, e)
            }
        }
    }), c(ee, W, {
        "defaults": {
            "event": "press",
            "pointers": 1,
            "time": 500,
            "threshold": 5
        },
        "getTouchAction": function() {
            return [Ze]
        },
        "process": function(e) {
            var t = this.options,
                i = e.pointers.length === t.pointers,
                n = e.distance < t.threshold,
                s = e.deltaTime > t.time;
            if (this._input = e, !n || !i || e.eventType & (Ce | $e) && !s) this.reset();
            else if (e.eventType & ke) this.reset(), this._timer = a(function() {
                this.state = lt, this.tryEmit()
            }, t.time, this);
            else if (e.eventType & Ce) return lt;
            return ut
        },
        "reset": function() {
            clearTimeout(this._timer)
        },
        "emit": function(e) {
            this.state === lt && (e && e.eventType & Ce ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = pe(), this.manager.emit(this.options.event, this._input)))
        }
    }), c(te, X, {
        "defaults": {
            "event": "rotate",
            "threshold": 0,
            "pointers": 2
        },
        "getTouchAction": function() {
            return [tt]
        },
        "attrTest": function(e) {
            return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & st)
        }
    }), c(ie, X, {
        "defaults": {
            "event": "swipe",
            "threshold": 10,
            "velocity": .65,
            "direction": Ae | qe,
            "pointers": 1
        },
        "getTouchAction": function() {
            return Q.prototype.getTouchAction.call(this)
        },
        "attrTest": function(e) {
            var t, i = this.options.direction;
            return i & (Ae | qe) ? t = e.velocity : i & Ae ? t = e.velocityX : i & qe && (t = e.velocityY), this._super.attrTest.call(this, e) && i & e.direction && e.distance > this.options.threshold && he(t) > this.options.velocity && e.eventType & Ce
        },
        "emit": function(e) {
            var t = V(e.direction);
            t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e)
        }
    }), c(ne, W, {
        "defaults": {
            "event": "tap",
            "pointers": 1,
            "taps": 1,
            "interval": 300,
            "time": 250,
            "threshold": 2,
            "posThreshold": 10
        },
        "getTouchAction": function() {
            return [et]
        },
        "process": function(e) {
            var t = this.options,
                i = e.pointers.length === t.pointers,
                n = e.distance < t.threshold,
                s = e.deltaTime < t.time;
            if (this.reset(), e.eventType & ke && 0 === this.count) return this.failTimeout();
            if (n && s && i) {
                if (e.eventType != Ce) return this.failTimeout();
                var o = this.pTime ? e.timeStamp - this.pTime < t.interval : !0,
                    r = !this.pCenter || q(this.pCenter, e.center) < t.posThreshold;
                this.pTime = e.timeStamp, this.pCenter = e.center, r && o ? this.count += 1 : this.count = 1, this._input = e;
                var l = this.count % t.taps;
                if (0 === l) return this.hasRequireFailures() ? (this._timer = a(function() {
                    this.state = lt, this.tryEmit()
                }, t.interval, this), st) : lt
            }
            return ut
        },
        "failTimeout": function() {
            return this._timer = a(function() {
                this.state = ut
            }, this.options.interval, this), ut
        },
        "reset": function() {
            clearTimeout(this._timer)
        },
        "emit": function() {
            this.state == lt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), ae.VERSION = "2.0.4", ae.defaults = {
        "domEvents": !1,
        "touchAction": Qe,
        "enable": !0,
        "inputTarget": null,
        "inputClass": null,
        "preset": [
            [te, {
                "enable": !1
            }],
            [Z, {
                    "enable": !1
                },
                ["rotate"]
            ],
            [ie, {
                "direction": Ae
            }],
            [Q, {
                    "direction": Ae
                },
                ["swipe"]
            ],
            [ne],
            [ne, {
                    "event": "doubletap",
                    "taps": 2
                },
                ["tap"]
            ],
            [ee]
        ],
        "cssProps": {
            "userSelect": "none",
            "touchSelect": "none",
            "touchCallout": "none",
            "contentZooming": "none",
            "userDrag": "none",
            "tapHighlightColor": "rgba(0,0,0,0)"
        }
    };
    var dt = 1,
        ht = 2;
    se.prototype = {
        "set": function(e) {
            return r(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), this.input.target = e.inputTarget, this.input.init()), this
        },
        "stop": function(e) {
            this.session.stopped = e ? ht : dt
        },
        "recognize": function(e) {
            var t = this.session;
            if (!t.stopped) {
                this.touchAction.preventDefaults(e);
                var i, n = this.recognizers,
                    a = t.curRecognizer;
                (!a || a && a.state & lt) && (a = t.curRecognizer = null);
                for (var s = 0; s < n.length;) i = n[s], t.stopped === ht || a && i != a && !i.canRecognizeWith(a) ? i.reset() : i.recognize(e), !a && i.state & (st | ot | rt) && (a = t.curRecognizer = i), s++
            }
        },
        "get": function(e) {
            if (e instanceof W) return e;
            for (var t = this.recognizers, i = 0; i < t.length; i++)
                if (t[i].options.event == e) return t[i];
            return null
        },
        "add": function(e) {
            if (s(e, "add", this)) return this;
            var t = this.get(e.options.event);
            return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e
        },
        "remove": function(e) {
            if (s(e, "remove", this)) return this;
            var t = this.recognizers;
            return e = this.get(e), t.splice(_(t, e), 1), this.touchAction.update(), this
        },
        "on": function(e, t) {
            var i = this.handlers;
            return o(v(e), function(e) {
                i[e] = i[e] || [], i[e].push(t)
            }), this
        },
        "off": function(e, t) {
            var i = this.handlers;
            return o(v(e), function(e) {
                t ? i[e].splice(_(i[e], t), 1) : delete i[e]
            }), this
        },
        "emit": function(e, t) {
            this.options.domEvents && re(e, t);
            var i = this.handlers[e] && this.handlers[e].slice();
            if (i && i.length) {
                t.type = e, t.preventDefault = function() {
                    t.srcEvent.preventDefault()
                };
                for (var n = 0; n < i.length;) i[n](t), n++
            }
        },
        "destroy": function() {
            this.element && oe(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, r(ae, {
        "INPUT_START": ke,
        "INPUT_MOVE": xe,
        "INPUT_END": Ce,
        "INPUT_CANCEL": $e,
        "STATE_POSSIBLE": at,
        "STATE_BEGAN": st,
        "STATE_CHANGED": ot,
        "STATE_ENDED": rt,
        "STATE_RECOGNIZED": lt,
        "STATE_CANCELLED": ct,
        "STATE_FAILED": ut,
        "DIRECTION_NONE": Ee,
        "DIRECTION_LEFT": Me,
        "DIRECTION_RIGHT": De,
        "DIRECTION_UP": Ie,
        "DIRECTION_DOWN": Le,
        "DIRECTION_HORIZONTAL": Ae,
        "DIRECTION_VERTICAL": qe,
        "DIRECTION_ALL": Pe,
        "Manager": se,
        "Input": k,
        "TouchAction": R,
        "TouchInput": G,
        "MouseInput": N,
        "PointerEventInput": H,
        "TouchMouseInput": Y,
        "SingleTouchInput": U,
        "Recognizer": W,
        "AttrRecognizer": X,
        "Tap": ne,
        "Pan": Q,
        "Swipe": ie,
        "Pinch": Z,
        "Rotate": te,
        "Press": ee,
        "on": p,
        "off": f,
        "each": o,
        "merge": l,
        "extend": r,
        "inherit": c,
        "bindFn": u,
        "prefixed": S
    }), typeof define == ue && define.amd ? define(function() {
        return ae
    }) : "undefined" != typeof module && module.exports ? module.exports = ae : e[i] = ae
}(window, document, "Hammer"),
function() {
    var e = Handlebars.template,
        t = Handlebars.templates = Handlebars.templates || {};
    t.betawelcome = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="overlay_detail overlay_detail_gsf overlay_detail_betawelcome">\n  <div class="gsf_one gsf_active clearfix">\n   <a class="close" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.close : a, e)) + "</a>\n    <h3>" + o(s(null != (a = null != e ? e.queue : e) ? a.welcome_title : a, e)) + '</h3>\n   <div class="gsf_bg"></div>\n    <div class="gsf_content">\n     <p class="betawelcome_partone">' + o(s(null != (a = null != e ? e.queue : e) ? a.welcome_body1 : a, e)) + '</p>\n     <p class="betawelcome_parttwo">' + o(s(null != (a = null != e ? e.queue : e) ? a.welcome_body2 : a, e)) + '</p>\n     <p class="gsf_buttoncontainer"><a class="button" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.welcome_cta : a, e)) + "</a></p>\n    </div>\n  </div>\n</div>"
        },
        "useData": !0
    }), t.gsf_allsetup = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="gsf-tooltip-detail-setup">\n  <div class="gsf-tooltip-logo"></div>\n  <div class="gsf-tooltip-extracontent">\n    <h5 class="gsf-tooltip-headline">' + o(s(null != (a = null != e ? e.gsf : e) ? a.youareallsetup : a, e)) + "</h5>\n   <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.thenexttime : a, e)) + "</p>\n </div>\n</div>"
        },
        "useData": !0
    }), t.gsf_chromeinlineinstall = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="overlay_screen overlay_screen_alt">\n <div class="overlay_note_container">\n    <div class="overlay_arrow"></div>\n   <p>' + o(s(null != (a = null != e ? e.gsf : e) ? a.doesnotviewtransmit : a, e)) + "<br>" + o(s(null != (a = null != e ? e.gsf : e) ? a.orstorebrowsinghistory : a, e)) + '</p>\n    <p class="learn">' + o(s(null != (a = null != e ? e.gsf : e) ? a.morequestions : a, e)) + "<br>" + o(s(null != (a = null != e ? e.gsf : e) ? a["goto"] : a, e)) + ": GetPocket.com/ChromePrivacy</p>\n  </div>\n</div>";

        },
        "useData": !0
    }), t.gsf_comingback = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="gsf-tooltip-detail-comingback">\n <div class="gsf-tooltip-readinglist"></div>\n <div class="gsf-tooltip-extracontent">\n    <h5 class="gsf-tooltip-headline">' + o(s(null != (a = null != e ? e.gsf : e) ? a.comingbackpocket : a, e)) + "</h5>\n   <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.whenviewlist : a, e)) + "</p>\n  </div>\n</div>"
        },
        "useData": !0
    }), t.gsf_inceptionpopup = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="gsf-tooltip-detail-inception">\n  <div class="gsf-tooltip-inception-content">\n   <h5 class="gsf-tooltip-headline">' + o(s(null != (a = null != e ? e.gsf : e) ? a.clickpocketbuttonsaving : a, e)) + '</h5>\n    <p class="gsf-tooltip-inception-arrow-detail">Try clicking this button now</p>\n    <div class="gsf-tooltip-inception-browser">\n     <div class="gsf-tooltip-inception-arrow"></div>\n     <a href="#" class="gsf-tooltip-inception-link"></a>\n   </div>\n  </div>\n</div>'
        },
        "useData": !0
    }), t.gsf_mobilepopup = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="gsf-tooltip-detail-mobile">\n <div class="gsf-tooltip-mobile-images"></div>\n <div class="gsf-tooltip-mobile-content">\n    <h5 class="gsf-tooltip-headline">' + o(s(null != (a = null != e ? e.gsf : e) ? a.viewonthego : a, e)) + "</h5>\n    <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.getpocketphonetablet : a, e)) + '</p>\n    <p class="button-container">\n      <a href="#" class="button"><span class="gsf-tooltip-spinner"></span>' + o(s(null != (a = null != e ? e.gsf : e) ? a.emaillink : a, e)) + '</a>\n      <a href="#" class="button button-inactive button-sent"><span class="gsf-tooltip-checkmark"></span>' + o(s(null != (a = null != e ? e.gsf : e) ? a.emailsent : a, e)) + '</a>\n    </p>\n    <p><a href="#" class="gsf-tooltip-dismiss">' + o(s(null != (a = null != e ? e.gsf : e) ? a.notnow : a, e)) + '</a></p>\n    <p class="gsf-tooltip-appstorebuttons">\n     <a href="/apps/link/pocket-android?s=gsf" target="_blank" class="gsf-tooltip-mobile-gplay">Google Play</a>\n      <a href="/apps/link/pocket-iphone?s=gsf" target="_blank" class="gsf-tooltip-mobile-ios">App Store</a>\n   </p>\n  </div>\n</div>'
        },
        "useData": !0
    }), t.gsf_needhelpsaving = e({
        "1": function(e, t, i, n) {
            return '    <div class="close"></div>\n'
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "      <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.savenewsarticles : a, e)) + "</p>\n      <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.trybuttonlinks : a, e)) + '</p>\n      <p><a class="button button-gotit" href="#">' + o(s(null != (a = null != e ? e.gsf : e) ? a.gotit : a, e)) + "</a></p>\n"
        },
        "5": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "      <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.connectpocketforeasywaysave : a, e)) + "</p>\n     <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.trybuttonlinks : a, e)) + '</p>\n      <p><a class="button button-connect" href="#">' + o(s(null != (a = null != e ? e.gsf : e) ? a.connectbutton : a, e)) + "</a></p>\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<div class="overlay_detail overlay_detail_gsf">\n  <div class="gsf_four clearfix">\n';
            return a = t.unless.call(e, null != (a = null != e ? e.manual : e) ? a.wextension : a, {
                "name": "unless",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.noop,
                "data": n
            }), null != a && (r += a), r += "   <h3>" + o(s(null != (a = null != e ? e.gsf : e) ? a.needhelpsaving : a, e)) + '</h3>\n    <div class="gsf_bg"></div>\n    <div class="gsf_content">\n', a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.wextension : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(3, n),
                "inverse": this.program(5, n),
                "data": n
            }), null != a && (r += a), r + "    </div>\n  </div>\n</div>"
        },
        "useData": !0
    }), t.gsf_newtooltipdetail = e({
        "1": function(e, t, i, n) {
            var a, s = "";
            return a = t["if"].call(e, null != e ? e.selected : e, {
                "name": "if",
                "hash": {},
                "fn": this.program(2, n),
                "inverse": this.program(4, n),
                "data": n
            }), null != a && (s += a), s
        },
        "2": function(e, t, i, n) {
            return '      <li class="gsf-tooltip-progressitem gsf-tooltip-progressselected"></li>\n'
        },
        "4": function(e, t, i, n) {
            return '      <li class="gsf-tooltip-progressitem"></li>\n'
        },
        "6": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '    <a href="#" class="gsf-tooltip-confirm">' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltipconfirmtext : a, e)) + "</a>\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<div class="gsf-tooltip-detail">\n <div class="gsf-tooltip-header">\n    <h5 class="gsf-tooltip-headline">' + o(s(null != (a = null != e ? e.manual : e) ? a.gsfheadline : a, e)) + '</h5>\n   <div class="gsf-tooltip-content clearfix">\n      ';
            return a = s(null != (a = null != e ? e.manual : e) ? a.gsfbody : a, e), null != a && (r += a), r += '\n    </div>\n  </div>\n  <div class="gsf-tooltip-footer clearfix">\n   <ul class="gsf-tooltip-progress">\n', a = t.each.call(e, null != (a = null != e ? e.manual : e) ? a.gsfprogresscount : a, {
                "name": "each",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.noop,
                "data": n
            }), null != a && (r += a), r += "   </ul>\n", a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.gsftooltipconfirm : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(6, n),
                "inverse": this.noop,
                "data": n
            }), null != a && (r += a), r + "  </div>\n</div>"
        },
        "useData": !0
    }), t.gsf_overlayalt = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<div class="overlay_detail overlay_detail_gsf">\n  <div class="gsf_twopointfive gsf_active clearfix">\n    <h3 class="gsf_pocketlogo">Pocket</h3>\n    <p class="gsf_tagline">' + o(s(null != (a = null != e ? e.gsf : e) ? a.welcometopocket : a, e)) + '</p>\n   <div class="gsf_bg"></div>\n    <div class="gsf_content">\n     <p class="gsf_disclaimer"><input type="checkbox" class="gsf_sendtips" name="sendtips" checked="true">' + o(s(null != (a = null != e ? e.gsf : e) ? a.sendmetips : a, e)) + '</p>\n      <p class="button_container"><a class="button" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.getstarted : a, e)) + '</a></p>\n      <p class="gsf_disclaimer">';
            return a = s(null != (a = null != e ? e.manual : e) ? a.termsconditions : a, e), null != a && (r += a), r + "</p>\n   </div>\n  </div>\n</div>"
        },
        "useData": !0
    }), t.gsf_overlayone = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = ' <div class="gsf_zero gsf_active clearfix">\n    <h3>' + o(s(null != (a = null != e ? e.gsf : e) ? a.congrats : a, e)) + '</h3>\n    <div class="gsf_bg"></div>\n    <div class="gsf_content">\n';
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.simplesignupnoemail : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(2, n),
                "inverse": this.program(4, n),
                "data": n
            }), null != a && (r += a), r + '      <p><a class="button" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.ok : a, e)) + '</a></p>\n   </div>\n  </div>\n  <div class="gsf_one clearfix">\n'
        },
        "2": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "      <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.assignedaemailpassword : a, e)) + '</p>\n      <p class="tempemail">' + o(s(null != (a = null != e ? e.manual : e) ? a.tempemail : a, e)) + '</p>\n      <p class="temppass">' + o(s(null != (a = null != e ? e.manual : e) ? a.temppass : a, e)) + '</p>\n      <p class="reduced">' + o(s(null != (a = null != e ? e.gsf : e) ? a.temppassintroone : a, e)) + "</p>\n      <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.temppassintrotwoalt : a, e)) + "</p>\n"
        },
        "4": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "      <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.assignedapassword : a, e)) + '</p>\n     <p class="temppass">' + o(s(null != (a = null != e ? e.manual : e) ? a.temppass : a, e)) + "</p>\n      <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.temppassintroone : a, e)) + "</p>\n      <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.temppassintrotwo : a, e)) + "</p>\n"
        },
        "6": function(e, t, i, n) {
            return '  <div class="gsf_one gsf_active clearfix">\n'
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<div class="overlay_detail overlay_detail_gsf">\n';
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.simplesignup : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(6, n),
                "data": n
            }), null != a && (r += a), r += "   <h3>" + o(s(null != (a = null != e ? e.gsf : e) ? a.congrats : a, e)) + '</h3>\n    <div class="gsf_bg"></div>\n    <div class="gsf_content">\n     <p>' + o(s(null != (a = null != e ? e.gsf : e) ? a.youvesignedupforpocket : a, e)) + '</p>\n      <p class="gsf_accesspocket">' + o(s(null != (a = null != e ? e.gsf : e) ? a.accesspocketondevices : a, e)) + '</p>\n      <p class="gsf_buttoncontainer"><a class="button" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.getstarted : a, e)) + '</a></p>\n   </div>\n  </div>\n  <div class="gsf_two clearfix">\n    <a class="skip_link" href="#">' + o(s(null != (a = null != e ? e.gsf : e) ? a.skipthisstep : a, e)) + "</a>\n   <h3>" + o(s(null != (a = null != e ? e.gsf : e) ? a.savethingsviewlater : a, e)) + '</h3>\n   <div class="gsf_bg"></div>\n    <div class="gsf_content">\n     <p>' + o(s(null != (a = null != e ? e.gsf : e) ? a.connectingpocketbuttonprovides : a, e)) + "</p>\n      <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.buttonsitsintoolbar : a, e)) + '</p>\n     <p><a class="button" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.connectnow : a, e)) + '</a></p>\n   </div>\n  </div>\n  <div class="gsf_twopointfive clearfix">\n   <h3 class="gsf_pocketlogo">Pocket</h3>\n    <p class="gsf_tagline">' + o(s(null != (a = null != e ? e.gsf : e) ? a.welcometopocket : a, e)) + '</p>\n   <div class="gsf_bg"></div>\n    <div class="gsf_content">\n     <p class="gsf_disclaimer"><input type="checkbox" class="gsf_sendtips" name="sendtips" checked="true">' + o(s(null != (a = null != e ? e.gsf : e) ? a.sendmetips : a, e)) + '</p>\n      <p class="button_container"><a class="button" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.getstarted : a, e)) + '</a></p>\n      <p class="gsf_disclaimer">', a = s(null != (a = null != e ? e.manual : e) ? a.termsconditions : a, e), null != a && (r += a), r + '</p>\n   </div>\n  </div>\n  <div class="gsf_three clearfix">\n    <h3>' + o(s(null != (a = null != e ? e.gsf : e) ? a.yourereadytosavealt : a, e)) + "</h3>\n   <h5>" + o(s(null != (a = null != e ? e.gsf : e) ? a.clickthepocketbutton : a, e)) + '</h5>\n    <div class="gsf_bg"></div>\n    <div class="gsf_content">\n     <div class="step">1</div>\n     <p>' + o(s(null != (a = null != e ? e.gsf : e) ? a.clicktosaveapage : a, e)) + '</p>\n      <div class="step">2</div>\n     <p>' + o(s(null != (a = null != e ? e.gsf : e) ? a.returntogetpocket : a, e)) + '</p>\n     <p class="button_container"><a class="button" href="#">' + o(s(null != (a = null != e ? e.gsf : e) ? a.savesomething : a, e)) + '</a></p>\n   </div>\n  </div>\n  <ul class="gsf_progress">\n   <li class="selected">1</li>\n   <li>2</li>\n  </ul>\n</div>'
        },
        "useData": !0
    }), t.gsf_savefirstitem = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "<p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.clickpocketbuttontoolbar : a, e)) + '</p>\n<div class="gsf-tooltip-article clearfix">\n  <p>' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltiptitle : a, e)) + '</p>\n  <div class="gsf-tooltip-articleimg" style="background-image: url(' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltipimgsrc : a, e)) + ');"></div>\n <a class="gsf-tooltip-articlelink" href="' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltiplink : a, e)) + '" target="_blank"></a>\n</div>'
        },
        "useData": !0
    }), t.gsf_saveinwebappwarning = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="gsf-tooltip-detail-webviewonly">\n  <h3 class="gsf-tooltip-bigheadline">' + o(s(null != (a = null != e ? e.gsf : e) ? a.greatpocketbutton : a, e)) + "</h3>\n <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.nextleavesave : a, e)) + '</p>\n <div class="gsf-tooltip-article clearfix">\n    <p>' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltiptitle : a, e)) + '</p>\n    <div class="gsf-tooltip-articleimg" style="background-image: url(' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltipimgsrc : a, e)) + ');"></div>\n   <a class="gsf-tooltip-articlelink" href="' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltiplink : a, e)) + '" target="_blank"></a>\n </div>\n</div>'
        },
        "useData": !0
    }), t.gsf_simpletooltip = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "<p>" + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltipcontent : a, e)) + "</p>"
        },
        "useData": !0
    }), t.gsf_webviewclickwarning = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<h5 class="gsf-tooltip-headline">' + o(s(null != (a = null != e ? e.queue : e) ? a.webviewwarn_webonlyview : a, e)) + "</h5>\n<p>" + o(s(null != (a = null != e ? e.queue : e) ? a.webviewwarn_webonlydetail : a, e)) + "</p>"
        },
        "useData": !0
    }), t.gsf_webviewonlywarning = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="gsf-tooltip-detail-webviewonly">\n  <h3 class="gsf-tooltip-bigheadline">' + o(s(null != (a = null != e ? e.gsf : e) ? a.yousavedpagebut : a, e)) + "</h3>\n <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.letstrysavinganarticle : a, e)) + "</p>\n  <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.heresasuggestion : a, e)) + '</p>\n  <div class="gsf-tooltip-article clearfix">\n    <p>' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltiptitle : a, e)) + '</p>\n    <div class="gsf-tooltip-articleimg" style="background-image: url(' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltipimgsrc : a, e)) + ');"></div>\n   <a class="gsf-tooltip-articlelink" href="' + o(s(null != (a = null != e ? e.manual : e) ? a.gsftooltiplink : a, e)) + '" target="_blank"></a>\n </div>\n</div>'
        },
        "useData": !0
    }), t.init_requirepassword = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="overlay_createpasswordcontainer">\n <h2>' + o(s(null != (a = null != e ? e.gsf : e) ? a.createpassword : a, e)) + '</h2>\n  <div class="form-msg">' + o(s(null != (a = null != e ? e.gsf : e) ? a.passwordsaved : a, e)) + '</div>\n  <div class="avatar"></div>\n  <h3 class="hi">' + o(s(null != (a = null != e ? e.gsf : e) ? a.hi : a, e)) + ' <span class="name"></span>!</h3>\n <p class="email"></p>\n\n <p>' + o(s(null != (a = null != e ? e.gsf : e) ? a.thispasswordwill : a, e)) + '</p>\n  <form class="form-changepassword">\n  <input type="text" class="extrausername" id="extrausername" name="username" autocomplete="off">\n   <div class="form-field">\n          <span class="error-bubble"><span class="error-msg">' + o(s(null != (a = null != e ? e.gsf : e) ? a.invalidpassword : a, e)) + '</span><span class="error-arrow"></span></span>\n          <label for="password">' + o(s(null != (a = null != e ? e.gsf : e) ? a.enterpassword : a, e)) + '</label>\n          <input type="password" id="password" name="password" autofocus autocomplete="off" tabindex="1" placeholder="' + o(s(null != (a = null != e ? e.gsf : e) ? a.enterpassword : a, e)) + '">\n      </div><br>\n      <div class="form-processing"></div>\n     <input tabindex="2" type="submit" value="' + o(s(null != (a = null != e ? e.gsf : e) ? a.finish : a, e)) + '" class="button password-btn-add">\n  </form>\n</div>'
        },
        "useData": !0
    }), t.isolate_screen = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            return '<div class="isolate_screen_detail isolate_screen_top"></div>\n<div class="isolate_screen_detail isolate_screen_left"></div>\n<div class="isolate_screen_detail isolate_screen_right"></div>\n<div class="isolate_screen_detail isolate_screen_bottom"></div>'
        },
        "useData": !0
    }), t.notification_persistent = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class=\'notifications-persistent\'>\n  <p class="content"></p>\n <a href="#" class="close">' + o(s(null != (a = null != e ? e.cta : e) ? a.close : a, e)) + "</a>\n</div>"
        },
        "useData": !0
    }), t.notification_pocketpremupsell = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="overlay_detail overlay_detail_premupsell">\n    <a class="close" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.close : a, e)) + '</a>\n    <div class="premupsell_divider"><h5>' + o(s(null != (a = null != e ? e.queue : e) ? a.introducing : a, e)) + "</h5></div>\n\n   <h2>" + o(s(null != (a = null != e ? e.queue : e) ? a.pocketpremium : a, e)) + "</h2>\n\n   <p>" + o(s(null != (a = null != e ? e.queue : e) ? a.mostpowerful : a, e)) + '</p>\n    <a class="button" href="/premium?ep=4" target="_blank">' + o(s(null != (a = null != e ? e.cta : e) ? a.learnmore : a, e)) + "</a>\n</div>"
        },
        "useData": !0
    }), t.notification_sync_added = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<span class="count count_solo">' + o(s(null != (a = null != e ? e.manual : e) ? a.sync_count : a, e)) + "</span> " + o(s(null != (a = null != e ? e.notification : e) ? a.itemadded : a, e)) + "\n"
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<span class="count">' + o(s(null != (a = null != e ? e.manual : e) ? a.sync_count : a, e)) + "</span> " + o(s(null != (a = null != e ? e.notification : e) ? a.itemsadded : a, e)) + "\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a;
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.sync_singular : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(3, n),
                "data": n
            }), null != a ? a : ""
        },
        "useData": !0
    }), t.notification_sync_archived = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<span class="count count_solo">' + o(s(null != (a = null != e ? e.manual : e) ? a.sync_count : a, e)) + "</span> " + o(s(null != (a = null != e ? e.notification : e) ? a.itemarchived : a, e)) + "\n"
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<span class="count">' + o(s(null != (a = null != e ? e.manual : e) ? a.sync_count : a, e)) + "</span> " + o(s(null != (a = null != e ? e.notification : e) ? a.itemsarchived : a, e)) + "\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a;
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.sync_singular : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(3, n),
                "data": n
            }), null != a ? a : ""
        },
        "useData": !0
    }), t.notification_sync_deleted = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<span class="count count_solo">' + o(s(null != (a = null != e ? e.manual : e) ? a.sync_count : a, e)) + "</span> " + o(s(null != (a = null != e ? e.notification : e) ? a.itemdeleted : a, e)) + "\n"
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<span class="count">' + o(s(null != (a = null != e ? e.manual : e) ? a.sync_count : a, e)) + "</span> " + o(s(null != (a = null != e ? e.notification : e) ? a.itemsdeleted : a, e)) + "\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a;
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.sync_singular : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(3, n),
                "data": n
            }), null != a ? a : ""
        },
        "useData": !0
    }), t.notification_sync_updated = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<span class="count count_solo">' + o(s(null != (a = null != e ? e.manual : e) ? a.sync_count : a, e)) + "</span> " + o(s(null != (a = null != e ? e.notification : e) ? a.itemupdated : a, e)) + "\n"
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<span class="count">' + o(s(null != (a = null != e ? e.manual : e) ? a.sync_count : a, e)) + "</span> " + o(s(null != (a = null != e ? e.notification : e) ? a.itemsupdated : a, e)) + "\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a;
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.sync_singular : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(3, n),
                "data": n
            }), null != a ? a : ""
        },
        "useData": !0
    }), t.queue_additemdialog = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="container">\n <a class="saveurl-close" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.close : a, e)) + "</a>\n  <h5>" + o(s(null != (a = null != e ? e.queue : e) ? a.saveanitemtopocket : a, e)) + "</h5>\n  <p>" + o(s(null != (a = null != e ? e.queue : e) ? a.foreasiersavingexpanded : a, e)) + '</p>\n <input type="text" placeholder="http://..."><a href="#" class="button button-disabled">' + o(s(null != (a = null != e ? e.cta : e) ? a.save : a, e)) + "</a>\n</div>\n\n"
        },
        "useData": !0
    }), t.queue_bulkedit = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="container-bulkedit">\n    <div class="bulkedit-content">\n        <div class="bulkedit-status"><p></p></div>\n        <div class="bulkedit-actions">\n            <ul>\n                <li class="bulkedit-archive">\n                    <a href="#">\n                        <span class="bulkedit-icon"></span> \n                        <span class="bulkedit-desc">' + o(s(null != (a = null != e ? e.queue : e) ? a.archive : a, e)) + '</span>\n                    </a>\n                </li>\n                <li class="bulkedit-favorite">\n                    <a href="#">\n                        <span class="bulkedit-icon"></span> \n                        <span class="bulkedit-desc">' + o(s(null != (a = null != e ? e.queue : e) ? a.favorite : a, e)) + '</span>\n                    </a>\n                </li>\n                <li class="bulkedit-delete">\n                    <a href="#">\n                        <span class="bulkedit-icon"></span> \n                        <span class="bulkedit-desc">' + o(s(null != (a = null != e ? e.queue : e) ? a["delete"] : a, e)) + '</span>\n                    </a>\n                </li>\n                <li class="bulkedit-addtag">\n                    <a href="#">\n                        <span class="bulkedit-icon"></span> \n                        <span class="bulkedit-desc">' + o(s(null != (a = null != e ? e.queue : e) ? a.addtag : a, e)) + '</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        <a class="bulkedit-cancel" href="#"></a>\n    </div>\n</div>'
        },
        "useData": !0
    }), t.queue_bulkeditactions = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<ul>\n    <li class="bulkedit-archive"><a title="' + o(s(null != (a = null != e ? e.queue : e) ? a.archive : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.archive : a, e)) + '</a></li>\n    <li class="bulkedit-favorite"><a title="' + o(s(null != (a = null != e ? e.queue : e) ? a.favorite : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.favorite : a, e)) + '</a></li>\n    <li class="bulkedit-delete"><a title="' + o(s(null != (a = null != e ? e.queue : e) ? a["delete"] : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a["delete"] : a, e)) + '</a></li>\n    <li class="bulkedit-addtag"><a title="' + o(s(null != (a = null != e ? e.queue : e) ? a.addtag : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.addtag : a, e)) + "</a></li>\n</ul>"
        },
        "useData": !0
    }), t.queue_bulktagdialog = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "  <h3>" + o(s(null != (a = null != e ? e.tag : e) ? a.addtags : a, e)) + " <span>(" + o(s(null != (a = null != e ? e.manual : e) ? a.tags_count : a, e)) + " " + o(s(null != (a = null != e ? e.search : e) ? a.item : a, e)) + ")</span></h3>\n"
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "  <h3>" + o(s(null != (a = null != e ? e.tag : e) ? a.addtags : a, e)) + " <span>(" + o(s(null != (a = null != e ? e.manual : e) ? a.tags_count : a, e)) + " " + o(s(null != (a = null != e ? e.search : e) ? a.items : a, e)) + ")</span></h3>\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<div class="overlay_detail overlay_detail_confirm overlay_detail_confirmtag">\n';
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.tag_singular : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(3, n),
                "data": n
            }), null != a && (r += a), r + '  <a class="close">' + o(s(null != (a = null != e ? e.cta : e) ? a.close : a, e)) + '</a>\n <div class="clearfix">\n    <input id="edit-tags-input" type="text">\n    <a href="#" class="button button-small button-disabled">' + o(s(null != (a = null != e ? e.cta : e) ? a.save : a, e)) + "</a>\n </div>\n</div>"
        },
        "useData": !0
    }), t.queue_confirmdialog_cancel = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '  <p class="button_container">\n    <a href="#" class="button button-secondary button-small button-cancel">' + o(s(null != (a = null != e ? e.cta : e) ? a.cancel : a, e)) + '</a> \n   <a href="#" class="button button-important button-small button-confirm">' + o(s(null != (a = null != e ? e.manual : e) ? a.confirmbuttontext : a, e)) + "</a>\n </p>\n</div>"
        },
        "useData": !0
    }), t.queue_confirmdialog_nocancel = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '  <p class="button_container">\n    <a href="#" class="button button button-small button-confirm">' + o(s(null != (a = null != e ? e.cta : e) ? a.ok : a, e)) + "</a>\n </p>\n</div>"
        },
        "useData": !0
    }), t.queue_gsfdevicereminder = e({
        "1": function(e, t, i, n) {
            return '<div class="gsf_device_reminder_container gsf_device_reminder_native gsf_device_reminder_active">\n'
        },
        "3": function(e, t, i, n) {
            return '<div class="gsf_device_reminder_container gsf_device_reminder_active">\n'
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = "";
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.nativeappsupport : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(3, n),
                "data": n
            }), null != a && (r += a), r + '  <div class="gsf_device_reminder">\n   <a class="close" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.close : a, e)) + '</a>\n    <div class="gsf_device_reminder_content_native">\n      <a class="gsf_device_reminder_native_link" href="http://getpocket.com/welcome" target="_blank"></a>\n     <p>' + o(s(null != (a = null != e ? e.gsf : e) ? a.optimizedapp : a, e)) + '</p>\n    </div>\n    <div class="gsf_device_reminder_content">\n     <h5>' + o(s(null != (a = null != e ? e.gsf : e) ? a.takepocketwithyou : a, e)) + "</h5>\n     <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.availableon : a, e)) + ' <a href="http://getpocket.com/apps/link/pocket-iphone/" target="_blank">iPhone</a>,\n       <a href="http://getpocket.com/apps/link/pocket-iphone/" target="_blank">iPad</a>,\n       <a href="http://getpocket.com/apps/link/pocket-android/" target="_blank">Android</a>, ' + o(s(null != (a = null != e ? e.gsf : e) ? a.and : a, e)) + '\n        <a href="http://getpocket.com/apps/link/pocket-amazon/" target="_blank">Kindle Fire</a>.\n      </p>\n    </div>\n  </div>\n</div>'
        },
        "useData": !0
    }), t.queue_gsfpremreminder = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="gsf_device_reminder_container gsf_device_reminder_active">\n  <div class="gsf_device_reminder">\n   <a class="close" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.close : a, e)) + "</a>\n    <h5>" + o(s(null != (a = null != e ? e.gsf : e) ? a.enjoypremiummonth : a, e)) + "</h5>\n   <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.enjoypremiummonthtwo : a, e)) + "</p>\n  </div>\n</div>"
        },
        "useData": !0
    }), t.queue_helpoverlay = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="chardinjs-keyboard">\n    <ul>\n        <li class="header">' + o(s(null != (a = null != e ? e.help : e) ? a.keyboardqueueview : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_lfa : a, e)) + "</span>" + o(s(null != (a = null != e ? e.help : e) ? a.switchhomefavarchive : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_rvi : a, e)) + "</span>" + o(s(null != (a = null != e ? e.help : e) ? a.filterarticlesvidsimages : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_s : a, e)) + "</span>" + o(s(null != (a = null != e ? e.help : e) ? a.focussearch : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_u : a, e)) + "</span>" + o(s(null != (a = null != e ? e.queue : e) ? a.saveurl : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_b : a, e)) + "</span>" + o(s(null != (a = null != e ? e.queue : e) ? a.bulkedit : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_n : a, e)) + "</span>" + o(s(null != (a = null != e ? e.help : e) ? a.sortbynewest : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_o : a, e)) + "</span>" + o(s(null != (a = null != e ? e.help : e) ? a.sortbyoldest : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_l : a, e)) + "</span>" + o(s(null != (a = null != e ? e.queue : e) ? a.switchtolistview : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_t : a, e)) + "</span>" + o(s(null != (a = null != e ? e.queue : e) ? a.switchtotileview : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_vw : a, e)) + "</span>" + o(s(null != (a = null != e ? e.reader : e) ? a.changelight : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_vd : a, e)) + "</span>" + o(s(null != (a = null != e ? e.reader : e) ? a.changedark : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_vs : a, e)) + "</span>" + o(s(null != (a = null != e ? e.reader : e) ? a.changesepia : a, e)) + " (" + o(s(null != (a = null != e ? e.reader : e) ? a.articleview : a, e)) + ")</li>\n        <li><span>a</span>" + o(s(null != (a = null != e ? e.help : e) ? a.archiveselected : a, e)) + "</li>\n        <li><span>f</span>" + o(s(null != (a = null != e ? e.help : e) ? a.favoriteselected : a, e)) + "</li>\n        <li><span>j/k</span>" + o(s(null != (a = null != e ? e.help : e) ? a.selectnextprev : a, e)) + "</li>\n        <li><span>o</span>" + o(s(null != (a = null != e ? e.help : e) ? a.vieworigselected : a, e)) + "</li>\n        <li><span>t</span>" + o(s(null != (a = null != e ? e.help : e) ? a.tagselected : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.help : e) ? a.enterreturn : a, e)) + "</span>" + o(s(null != (a = null != e ? e.help : e) ? a.openselected : a, e)) + "</li>\n        <li><span>?</span>" + o(s(null != (a = null != e ? e.help : e) ? a.viewhelp : a, e)) + "</li>\n    </ul>\n</div>"
        },
        "useData": !0
    }), t.queue_itembuttons = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '  <li class="action_mark action_mark_archived selected" title="' + o(s(null != (a = null != e ? e.cta : e) ? a.addtolist : a, e)) + '"><a href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.addtolist : a, e)) + "</a></li>\n"
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '  <li class="action_mark" title="' + o(s(null != (a = null != e ? e.cta : e) ? a.archive : a, e)) + '"><a href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.archive : a, e)) + "</a></li>\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<ul class="buttons">\n <li class="action_share" title="' + o(s(null != (a = null != e ? e.cta : e) ? a.share : a, e)) + '"><a href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.share : a, e)) + "</a></li>\n";
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_buttonarchived : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(3, n),
                "data": n
            }), null != a && (r += a), r + '  <li class="action_delete" title="' + o(s(null != (a = null != e ? e.cta : e) ? a["delete"] : a, e)) + '"><a href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a["delete"] : a, e)) + '</a></li>\n  <li class="action_tag" title="' + o(s(null != (a = null != e ? e.tag : e) ? a.edittags : a, e)) + '"><a href="#">' + o(s(null != (a = null != e ? e.tag : e) ? a.edittags : a, e)) + '</a></li>\n <li class="action_favorite ' + o(s(null != (a = null != e ? e.manual : e) ? a.item_buttonfavorited : a, e)) + '" title="' + o(s(null != (a = null != e ? e.cta : e) ? a.favorite : a, e)) + '"><a href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.favorite : a, e)) + "</a></li>\n</ul>"
        },
        "useData": !0
    }), t.queue_itemfriendsdetail = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "<span class='row_friends'>\n  <span class='collapsed'>\n    <span class='avatar' style='background-image: url(" + o(s(null != (a = null != e ? e.manual : e) ? a.item_friendsbgimg : a, e)) + ");'></span>\n    " + o(s(null != (a = null != e ? e.manual : e) ? a.item_friendslist : a, e)) + "\n  </span>\n <span class='caret'></span>\n</span>"
        },
        "useData": !0
    }), t.queue_itemshell = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<li class="item item_withtopic item_type_' + o(s(null != (a = null != e ? e.manual : e) ? a.tile_class : a, e)) + '" id="i' + o(s(null != (a = null != e ? e.manual : e) ? a.item_id : a, e)) + '" ';
            return a = s(null != (a = null != e ? e.manual : e) ? a.item_extraattributes : a, e), null != a && (r += a), r + ">\n"
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<li class="item item_type_' + o(s(null != (a = null != e ? e.manual : e) ? a.tile_class : a, e)) + '" id="i' + o(s(null != (a = null != e ? e.manual : e) ? a.item_id : a, e)) + '" ';
            return a = s(null != (a = null != e ? e.manual : e) ? a.item_extraattributes : a, e), null != a && (r += a), r + ">\n"
        },
        "5": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '    <a class="topic_detail topic_' + o(s(null != (a = null != e ? e.manual : e) ? a.item_topic_id : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.manual : e) ? a.item_topic_desc : a, e)) + "</a>\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = "";
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_topic_desc : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(3, n),
                "data": n
            }), null != a && (r += a), r += ' <div class="item_content">\n    <a class="' + o(s(null != (a = null != e ? e.manual : e) ? a.item_linkclasses : a, e)) + '" href="' + o(s(null != (a = null != e ? e.manual : e) ? a.item_openurl : a, e)) + '" target="_blank"></a>\n    <a class="title" href="' + o(s(null != (a = null != e ? e.manual : e) ? a.item_openurl : a, e)) + '">' + o(s(null != (a = null != e ? e.manual : e) ? a.item_title : a, e)) + '</a>\n   <span class="thumb" variant="' + o(s(null != (a = null != e ? e.manual : e) ? a.item_thumbvariant : a, e)) + '"></span>\n   <img class="favicon" data-originalurl="' + o(s(null != (a = null != e ? e.manual : e) ? a.item_originalurl : a, e)) + '">\n   <div class="favstate"></div>\n',
            a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_topic_desc : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(5, n),
                "inverse": this.noop,
                "data": n
            }), null != a && (r += a), r + "  </div>\n</li>"
        },
        "useData": !0
    }), t.queue_itemsubdetail_grid = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = "";
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_topic_desc : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(2, n),
                "inverse": this.program(4, n),
                "data": n
            }), null != a && (r += a), r += '   <span class="tag_container">', a = s(null != (a = null != e ? e.manual : e) ? a.item_tags : a, e), null != a && (r += a), r + '</span>\n    <a class="edit"><span>' + o(s(null != (a = null != e ? e.queue : e) ? a.addtag : a, e)) + "</span></a>\n  </li>\n"
        },
        "2": function(e, t, i, n) {
            return '  <li class="tags tags-withtopic hasTags">\n'
        },
        "4": function(e, t, i, n) {
            return '  <li class="tags hasTags">\n'
        },
        "6": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = "";
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_topic_desc : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(7, n),
                "inverse": this.program(9, n),
                "data": n
            }), null != a && (r += a), r += '   <span class="tag_container">', a = s(null != (a = null != e ? e.manual : e) ? a.item_tags : a, e), null != a && (r += a), r + '</span>\n    <a class="edit"><span>' + o(s(null != (a = null != e ? e.queue : e) ? a.addtag : a, e)) + "</span></a>\n  </li>\n"
        },
        "7": function(e, t, i, n) {
            return '  <li class="tags tags-withtopic">\n'
        },
        "9": function(e, t, i, n) {
            return '  <li class="tags">\n'
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<ul class="sub clearfix">\n  <li><a class="original_url" href="' + o(s(null != (a = null != e ? e.manual : e) ? a.item_targeturl : a, e)) + '" target="_blank" title="' + o(s(null != (a = null != e ? e.cta : e) ? a.vieworiginal : a, e)) + '">' + o(s(null != (a = null != e ? e.manual : e) ? a.item_domain : a, e)) + '</a></li>\n</ul>\n<ul class="sub-tags">\n';
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_tags : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(6, n),
                "data": n
            }), null != a && (r += a), r + "</ul>"
        },
        "useData": !0
    }), t.queue_itemsubdetail_list = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '  <li class="topic">\n    <a class="topic_detail topic_' + o(s(null != (a = null != e ? e.manual : e) ? a.item_topic_id : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.manual : e) ? a.item_topic_desc : a, e)) + "</a>\n  </li>\n"
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = "";
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_topic_desc : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(4, n),
                "inverse": this.program(6, n),
                "data": n
            }), null != a && (r += a), r += '   <span class="tag_container">', a = s(null != (a = null != e ? e.manual : e) ? a.item_tags : a, e), null != a && (r += a), r + '</span>\n    <a class="edit"><span>' + o(s(null != (a = null != e ? e.queue : e) ? a.addtag : a, e)) + "</span></a>\n  </li>\n"
        },
        "4": function(e, t, i, n) {
            return '  <li class="tags tags-withtopic hasTags">\n'
        },
        "6": function(e, t, i, n) {
            return '  <li class="tags hasTags">\n'
        },
        "8": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = "";
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_topic_desc : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(9, n),
                "inverse": this.program(11, n),
                "data": n
            }), null != a && (r += a), r + '    <span class="tag_container"></span>\n   <a class="edit"><span>' + o(s(null != (a = null != e ? e.queue : e) ? a.addtag : a, e)) + "</span></a>\n  </li>\n"
        },
        "9": function(e, t, i, n) {
            return '  <li class="tags tags-withtopic">\n'
        },
        "11": function(e, t, i, n) {
            return '  <li class="tags">\n'
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<ul class="sub clearfix">\n  <li class="original_url_container"><a class="original_url" href="' + o(s(null != (a = null != e ? e.manual : e) ? a.item_targeturl : a, e)) + '" target="_blank" title="' + o(s(null != (a = null != e ? e.cta : e) ? a.vieworiginal : a, e)) + '">' + o(s(null != (a = null != e ? e.manual : e) ? a.item_domain : a, e)) + "</a></li>\n";
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_topic_desc : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.noop,
                "data": n
            }), null != a && (r += a), a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.item_tags : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(3, n),
                "inverse": this.program(8, n),
                "data": n
            }), null != a && (r += a), r + '</ul>\n<div class="clear"></div>'
        },
        "useData": !0
    }), t.queue_itemtitle = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            return "<span class=\"title\"><span>'+tagEntities(title)+'</span></span>"
        },
        "useData": !0
    }), t.queue_navitem = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s, o = this.lambda,
                r = this.escapeExpression,
                l = "function",
                c = t.helperMissing;
            return '<div class="toolbar_queue toolbar navigationItem wrapper wrapper_full">\n    <div class="toolbar_queue_divider"></div>\n    <h1 class="pocket_logo">Pocket</h1>\n    <ul class="icons leftItem">\n        <li id="pagenav_sidenav" class="pagenav_sidenav">\n            <a href="#" class="header-nav-toggle"><span></span></a>\n            <span class="inbox_badge"></span>\n        </li>\n        <li class="pagenav_queuedetail">\n            <h2 class="queue_title">' + r(o(null != (a = null != e ? e.queue : e) ? a.mainmenu_home : a, e)) + '</h2>\n            <a class="queue_toggle_listqueue queue_toggle_listqueueprimary" href="#">\n                <span class="nav-toggledetail"></span>\n                <span class="nav-togglenotch"></span>\n            </a>\n        </li>\n    </ul>\n    <ul class="icons rightItem">\n        <li class="pagenav_gridlist pagenav_gridlistalt pagenav_gridview">\n            <a class="hint-item" title="' + r(o(null != (a = null != e ? e.queue : e) ? a.tilelistviewtoggle : a, e)) + '" href="#">' + r(o(null != (a = null != e ? e.queue : e) ? a.tileview : a, e)) + '</a>\n        </li>\n        <li class="pagenav_bulkedit pagenav_bulkeditalt">\n            <a class="hint-item" title="' + r(o(null != (a = null != e ? e.queue : e) ? a.bulkedit : a, e)) + '" href="#">' + r(o(null != (a = null != e ? e.queue : e) ? a.bulkedit : a, e)) + '</a> \n        </li>\n        <li class="pagenav_extrasdivider">\n        </li>\n        <li id="pagenav_searchicon" class="pagenav_searchicon">\n            <a class="hint-item" title="' + r(o(null != (a = null != e ? e.queue : e) ? a.search : a, e)) + '" data-intro="' + r(o(null != (a = null != e ? e.queue : e) ? a.search : a, e)) + '" data-position="bottom" href="#">' + r(o(null != (a = null != e ? e.queue : e) ? a.search : a, e)) + '</a>\n        </li>\n        <li id="pagenav_addarticle">\n            <a class="hint-item" data-intro="' + r(o(null != (a = null != e ? e.queue : e) ? a.saveurl : a, e)) + '" data-position="bottomlower" title="' + r(o(null != (a = null != e ? e.queue : e) ? a.saveurl : a, e)) + '" href="#">' + r(o(null != (a = null != e ? e.queue : e) ? a.saveurl : a, e)) + '</a>\n        </li>\n        <li id="pagenav_inbox">\n            <span class="inbox_badge"></span>\n            <a class="hint-item pagenav_inbox_link" data-intro="' + r(o(null != (a = null != e ? e.notification : e) ? a.viewinbox : a, e)) + '" data-position="bottom" title="' + r(o(null != (a = null != e ? e.notification : e) ? a.viewinbox : a, e)) + '" href="#">' + r(o(null != (a = null != e ? e.notification : e) ? a.viewinbox : a, e)) + '</a>\n        </li>\n        <li id="pagenav_options">\n            <a title="' + r((s = null != (s = t.mainmenu_options || (null != e ? e.mainmenu_options : e)) ? s : c, typeof s === l ? s.call(e, {
                "name": "mainmenu_options",
                "hash": {},
                "data": n
            }) : s)) + '" href="#"><span class="nav-username"></span><span class="nav-downnotch"></span></a>\n        </li>\n        <li id="pagenav_upgradedivider" class="pagenav_extrasdivider">\n            <a href="#"></a>\n        </li>\n        <li id="pagenav_upgrade">\n            <a title="Upgrade" href="/premium?e=2&s=topnavd" target="_blank"><span class="nav-icon"></span>Upgrade</a>\n        </li>\n    </ul>\n    <nav class="expanded_toggle expanded_toggle_filter">\n        <ul>\n            <li><a class="expanded_toggle_mylist expanded_toggle_selected" href="#">' + r(o(null != (a = null != e ? e.queue : e) ? a.search_mylist : a, e)) + '</a></li>\n            <li><a class="expanded_toggle_archive" href="#">' + r(o(null != (a = null != e ? e.queue : e) ? a.search_archive : a, e)) + "</a></li>\n        </ul>\n    </nav>\n</div>"
        },
        "useData": !0
    }), t.queue_noticecontainer = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="notice_container chromeex_warning clearfix">\n  <div class="pocket_button_img"></div>\n <div class="pocket_button_detail">\n    <h4>' + o(s(null != (a = null != e ? e.gsf : e) ? a.haveyouinstalledpocketbutton : a, e)) + "</h4>\n    <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.installingthepocketbuttonclick : a, e)) + '</p>\n    <a class="button" href="http://getpocket.com/welcome/" target="_blank">' + o(s(null != (a = null != e ? e.cta : e) ? a.connectnow : a, e)) + '</a>\n    <p class="more">' + o(s(null != (a = null != e ? e.gsf : e) ? a.learnmoreways : a, e)) + "</p>\n  </div>\n</div>"
        },
        "useData": !0
    }), t.queue_noticepockethits = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            return '<li class="queue_msg queue_msg_pockethits">\n    <a class="close" href="#">Close</a>\n    <p><a class="target" href="/hits/" target="_blank">Don\'t miss the best stories of the year.<br><span class="emphasis">Explore Pocket\'s Top Hits of 2013</span></a></p>\n</li>'
        },
        "useData": !0
    }), t.queue_pageshell = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div id="page_queue" class="wrapper wrapper_full">\n  <div class="queue_secondarynav">\n    <h2 class="queue_title">' + o(s(null != (a = null != e ? e.queue : e) ? a.mainmenu_home : a, e)) + '</h2>\n   <a class="queue_toggle_listqueue queue_toggle_listqueuesecondary" href="#">\n            <span class="nav-toggledetail"></span>\n            <span class="nav-togglenotch"></span>\n        </a>\n    <nav class="queue_secondarynav_actions">\n      <ul>\n            <li class="pagenav_gridlist pagenav_gridview">\n                <a class="hint-item" data-intro="' + o(s(null != (a = null != e ? e.queue : e) ? a.tilelistviewtoggle : a, e)) + '" data-position="bottom" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.tileview : a, e)) + '</a>\n           </li>\n           <li class="pagenav_bulkedit">\n               <a class="hint-item" title="' + o(s(null != (a = null != e ? e.queue : e) ? a.bulkedit : a, e)) + '" data-intro="' + o(s(null != (a = null != e ? e.queue : e) ? a.bulkedit : a, e)) + '" data-position="bottomlower" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.bulkedit : a, e)) + '</a> \n           </li>\n       </ul>\n   </nav>\n  </div>\n    <ul id="queue" class="queue_list"></ul>\n</div>'
        },
        "useData": !0
    }), t.queue_placeholder = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = "   <h3>" + o(s(null != (a = null != e ? e.gsf : e) ? a.saveditemsappear : a, e)) + "</h3>\n";
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.placeholderwextension : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(2, n),
                "inverse": this.program(4, n),
                "data": n
            }), null != a && (r += a), r
        },
        "2": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "    <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.savecontentfrom : a, e)) + "</p>\n"
        },
        "4": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "    <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.foreasiersaving : a, e)) + '</p>\n   <p><a href="#" class="button button-connect">' + o(s(null != (a = null != e ? e.cta : e) ? a.connect : a, e)) + "</a></p>\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = '<li class="item item_placeholder">\n  <div class="item_content">\n';
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.placeholderdesc : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.noop,
                "data": n
            }), null != a && (s += a), s + "  </div>\n</li>"
        },
        "useData": !0
    }), t.queue_placeholder_gsf = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<li class="item item_placeholder_gsf">\n  <div class="item_content">\n    <h5 class="item_placeholder_title">' + o(s(null != (a = null != e ? e.gsf : e) ? a.youreonaroll : a, e)) + "</h5>\n   <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.keepgoing : a, e)) + "</p>\n   <p>" + o(s(null != (a = null != e ? e.gsf : e) ? a.noopentabssuggestion : a, e)) + '</p>\n    <div class="item_placeholder_article clearfix">\n     <p>' + o(s(null != (a = null != e ? e.manual : e) ? a.itemplaceholdertitle : a, e)) + '</p>\n     <div class="item_placeholder_articleimg" style="background-image: url(' + o(s(null != (a = null != e ? e.manual : e) ? a.itemplaceholderimgsrc : a, e)) + ');"></div>\n     <a class="item_placeholder_articlelink" href="' + o(s(null != (a = null != e ? e.manual : e) ? a.itemplaceholderlink : a, e)) + '" target="_blank"></a>\n   </div>\n  </div>\n</li>'
        },
        "useData": !0
    }), t.queue_searchchip = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            return '<li class="search-chip">\n  <span class="search-chip-icon"></span>\n    <p></p>\n    <span class="search-chip-delete">x</span>\n</li>'
        },
        "useData": !0
    }), t.queue_searchitem = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '                <li><a class="allitems" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_allitems : a, e)) + "</a></li>\n"
        },
        "3": function(e, t, i, n) {
            return '            <ul class="search-instr-recent search-instr-premium">\n'
        },
        "5": function(e, t, i, n) {
            return '            <ul class="search-instr-recent">\n'
        },
        "7": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '                <li class="instructions instructions-basic">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_trysearching : a, e)) + '</li>\n                <li class="recentsearch recentsearch-header"><h3>' + o(s(null != (a = null != e ? e.queue : e) ? a.search_recentlysearched : a, e)) + '</h3></li>\n                <li class="recentsearch recentsearch-1"><a href="#"></a></li>\n                <li class="recentsearch recentsearch-2"><a href="#"></a></li>\n                <li class="recentsearch recentsearch-3"><a href="#"></a></li>\n                <li class="recentsearch recentsearch-4"><a href="#"></a></li>\n                <li class="recentsearch recentsearch-5"><a href="#"></a></li>\n'
        },
        "9": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '                <li class="instructions instructions-basic">' + o(s(null != (a = null != e ? e.queue : e) ? a.searchbytitleurl : a, e)) + "</li>\n"
        },
        "11": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '    <nav class="expanded_toggle expanded_toggle_search expanded_toggle_search_premium">\n        <ul>\n            <li class="expanded_allitems"><a class="expanded_toggle_allitems expanded_toggle_selected" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_allitems : a, e)) + '</a></li>\n            <li><a class="expanded_toggle_mylist" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_mylist : a, e)) + '</a></li>\n            <li><a class="expanded_toggle_archive" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_archive : a, e)) + "</a></li>\n        </ul>\n    </nav>\n"
        },
        "13": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '    <nav class="expanded_toggle expanded_toggle_search">\n        <ul>\n            <li><a class="expanded_toggle_mylist expanded_toggle_selected" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_mylist : a, e)) + '</a></li>\n            <li><a class="expanded_toggle_archive" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_archive : a, e)) + "</a></li>\n        </ul>\n    </nav>\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<div class="searchtoolbar_screenbar"></div>\n<div class="searchtoolbar_queue toolbar navigationItem wrapper wrapper_full">\n    <h1 class="pocket_logo">Pocket</h1>\n    <ul class="icons leftItem">\n        <li><h2></h2></li>\n    </ul>\n    <ul class="icons rightItem">\n        <li class="pagenav_bulkedit pagenav_bulkeditalt">\n            <a class="hint-item" title="' + o(s(null != (a = null != e ? e.queue : e) ? a.bulkedit : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.bulkedit : a, e)) + '</a> \n        </li>\n        <li class="pagenav_extrasdivider">\n        </li>\n        <li id="searchnav_sortby" class="searchnav-sortby-relevancy">\n            <a class="hint-item" title="' + o(s(null != (a = null != e ? e.queue : e) ? a.search_sortbytooltip : a, e)) + '" class="searchnav-sortby-disabled" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_sortbytooltip : a, e)) + '</a>\n        </li>\n        <li class="section-filter section-filter-disabled">\n            <div class="section-filter-value hint-item" title="' + o(s(null != (a = null != e ? e.queue : e) ? a.search_options : a, e)) + '">\n                <span class="section-filter-value-text">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_allitems : a, e)) + '</span>\n                <span class="section-filter-downnotch"></span>\n            </div>\n            <ul class="section-filter-options">\n';
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.premium : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.noop,
                "data": n
            }), null != a && (r += a), r += '                <li><a class="mylist" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_mylist : a, e)) + '</a></li>\n                <li><a class="archive" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_archive : a, e)) + '</a></li>\n            </ul>\n        </li>\n        <li class="wrapper_search clearfix">\n            <div class="search-input-wrapper">\n                <ul class="search-input-list">\n                    <li class="search-input">\n                        <input id="page_search" type="text" placeholder="' + o(s(null != (a = null != e ? e.queue : e) ? a.search : a, e)) + '" maxlength="100">\n                    </li>\n                </ul>\n            </div>\n', a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.premium : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(3, n),
                "inverse": this.program(5, n),
                "data": n
            }), null != a && (r += a), a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.premium : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(7, n),
                "inverse": this.program(9, n),
                "data": n
            }), null != a && (r += a), r += '            </ul>\n        </li>\n        <li id="search_close">\n            <a href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.close : a, e)) + "</a>\n        </li>\n    </ul>\n", a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.premium : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(11, n),
                "inverse": this.program(13, n),
                "data": n
            }), null != a && (r += a), r + "</div>"
        },
        "useData": !0
    }), t.queue_sidenav = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="side-screen"></div>\n<div class="side-nav">\n    <div class="nav-content nav-content-header">\n        <a href="#" class="header-nav-toggle header-nav-toggle-close"><span></span></a>\n        <h2>Pocket</h2>\n    </div>\n    <div class="nav-content nav-content-main">\n        <nav class="nav-default">\n            <ul>\n                <li><a class="section-mylist" href="#"><span class="nav-icon"></span>' + o(s(null != (a = null != e ? e.queue : e) ? a.mainmenu_home : a, e)) + '</a></li>\n                <li><a class="section-favorites" href="#"><span class="nav-icon"></span>' + o(s(null != (a = null != e ? e.queue : e) ? a.mainmenu_favorites : a, e)) + '</a></li>\n                <li><a class="section-archive" href="#"><span class="nav-icon"></span>' + o(s(null != (a = null != e ? e.queue : e) ? a.mainmenu_archive : a, e)) + '</a></li>\n                <li class="nav-default-divider"></li>\n                <li><a class="nav-sublist filter-articles" href="#"><span>' + o(s(null != (a = null != e ? e.queue : e) ? a.filter_articles : a, e)) + '</span></a></li>\n                <li><a class="nav-sublist filter-videos" href="#"><span>' + o(s(null != (a = null != e ? e.queue : e) ? a.filter_videos : a, e)) + '</span></a></li>\n                <li><a class="nav-sublist filter-images" href="#"><span>' + o(s(null != (a = null != e ? e.queue : e) ? a.filter_images : a, e)) + '</span></a></li>\n                <li>\n                    <a class="filter-tags" href="#"><span class="nav-icon"></span>' + o(s(null != (a = null != e ? e.tag : e) ? a.tags : a, e)) + ' <span class="nav-rarrow">&rsaquo;</span></a>\n                </li>\n                <li><a class="section-inbox" href="#"><span class="nav-icon"></span> <span class="inbox_badge"></span> ' + o(s(null != (a = null != e ? e.notification : e) ? a.inbox : a, e)) + '</a></li>\n            </ul>\n        </nav>\n        <nav class="nav-default nav-secondary">     \n            <ul>\n                <li><a class="nav-minorlist section-premium" href="#"><span class="nav-icon"></span>' + o(s(null != (a = null != e ? e.queue : e) ? a.mainmenu_premium : a, e)) + '</a></li>\n                <li><a class="nav-minorlist section-options" href="#"><span class="nav-icon"></span>' + o(s(null != (a = null != e ? e.queue : e) ? a.mainmenu_options : a, e)) + '</a></li>\n                <li><a class="nav-minorlist section-help" href="#"><span class="nav-icon"></span>' + o(s(null != (a = null != e ? e.queue : e) ? a.mainmenu_help : a, e)) + '</a></li>\n                <li><a class="nav-minorlist section-logout" href="#"><span class="nav-icon"></span>' + o(s(null != (a = null != e ? e.login : e) ? a.logout : a, e)) + '</a></li>\n            </ul>\n        </nav>\n    </div>\n    <div class="wrapper_tag">\n        <div class="tag_name"></div>\n        <a class="tag_clear" href="" title="' + o(s(null != (a = null != e ? e.queue : e) ? a.cleartagselection : a, e)) + '">' + o(s(null != (a = null != e ? e.queue : e) ? a.cleartagselection : a, e)) + '</a>\n    </div>\n    <div class="nav-mobileupsell nav-mobileupsell-inactive">\n        <nav>\n            <ul>\n                <li class="nav-mobileupsell-getapp">Get the app:</li>\n                <li><a class="nav-mobileupsell-android" href="/apps/link/pocket-android?s=mobileupsell" target="_blank">Google Play</a></li>\n                <li><a class="nav-mobileupsell-ios" href="/apps/link/pocket-iphone?s=mobileupsell" target="_blank">App Store</a></li>\n            </ul>\n        </nav>\n    </div>\n</div>'
        },
        "useData": !0
    }), t.queue_sortsearchdialog = e({
        "1": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '    <li class="popover-new-listitem"><a class="relevance search-sortby-selected" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_relevance : a, e)) + '</a></li>\n    <li class="popover-new-listitem"><a class="newest" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_newest : a, e)) + "</a></li>\n"
        },
        "3": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '    <li class="popover-new-listitem"><a class="newest search-sortby-selected" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_newest : a, e)) + "</a></li>\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression,
                r = '<div class="container">\n  <h5>' + o(s(null != (a = null != e ? e.queue : e) ? a.search_sortby : a, e)) + '</h5>\n <ul class="search-sortby-options">\n';
            return a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.premium : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(1, n),
                "inverse": this.program(3, n),
                "data": n
            }), null != a && (r += a), r + '    <li class="popover-new-listitem"><a class="oldest" href="#">' + o(s(null != (a = null != e ? e.queue : e) ? a.search_oldest : a, e)) + "</a></li>\n </ul>\n</div>"
        },
        "useData": !0
    }), t.reader_headarticleshell = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="reader_head clearfix">\n  <h1></h1>\n <ul class="sub">\n    <li class="authorsdomain"><span class="authors"></span><span class="domain"><img class="favicon"><a target="_blank"></a></span></li>\n    <li class="original"><a target="_blank">' + o(s(null != (a = null != e ? e.cta : e) ? a.vieworiginal : a, e)) + '</a></li>\n    <li class="date"></li>\n    <li class="tags"><span class="tag_container"></span></li>\n   <li class="original_narrow"><a target="_blank">' + o(s(null != (a = null != e ? e.cta : e) ? a.vieworiginal : a, e)) + '</a></li>\n </ul>\n</div>\n<div class="text_body">\n</div>'
        },
        "useData": !0
    }), t.reader_helpoverlay = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="chardinjs-keyboard">\n    <ul>\n        <li class="header">' + o(s(null != (a = null != e ? e.help : e) ? a.keyboardreaderview : a, e)) + "</li>\n        <li><span>cmd/ctrl + -/+</span>" + o(s(null != (a = null != e ? e.help : e) ? a.decreaseincreasefont : a, e)) + "</li>\n        <li><span>a</span>" + o(s(null != (a = null != e ? e.help : e) ? a.archiveitemorsave : a, e)) + "</li>\n        <li><span>b</span>" + o(s(null != (a = null != e ? e.reader : e) ? a.goback : a, e)) + "</li>\n        <li><span>d</span>" + o(s(null != (a = null != e ? e.help : e) ? a.fullscreenmode : a, e)) + "</li>\n        <li><span>f</span>" + o(s(null != (a = null != e ? e.help : e) ? a.favitem : a, e)) + "</li>\n        <li><span>o</span>" + o(s(null != (a = null != e ? e.help : e) ? a.vieworiginal : a, e)) + "</li>\n        <li><span>t</span>" + o(s(null != (a = null != e ? e.help : e) ? a.tagitem : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_vw : a, e)) + "</span>" + o(s(null != (a = null != e ? e.reader : e) ? a.changelight : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_vd : a, e)) + "</span>" + o(s(null != (a = null != e ? e.reader : e) ? a.changedark : a, e)) + "</li>\n        <li><span>" + o(s(null != (a = null != e ? e.manual : e) ? a.help_vs : a, e)) + "</span>" + o(s(null != (a = null != e ? e.reader : e) ? a.changesepia : a, e)) + " (" + o(s(null != (a = null != e ? e.reader : e) ? a.articleview : a, e)) + ")</li>\n        <li><span>?</span>" + o(s(null != (a = null != e ? e.help : e) ? a.viewhelp : a, e)) + "</li>\n    </ul>\n</div>"
        },
        "useData": !0
    }), t.reader_imageshell = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            return '<div id="RIL_IMG_1" class="RIL_IMG"></div>'
        },
        "useData": !0
    }), t.reader_moreactions = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<nav>\n      <ul>\n            <li class="popover-new-listitem"><a class="moreactions_edittags" href="#">' + o(s(null != (a = null != e ? e.tag : e) ? a.edittags : a, e)) + ' <span class="nav-icon"></span></a></li>\n            <li class="popover-new-listitem"><a class="moreactions_textoptions" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.textoptions : a, e)) + ' <span class="nav-icon"></span></a></li>\n            <li class="popover-new-listitem"><a class="moreactions_delete" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a["delete"] : a, e)) + ' <span class="nav-icon"></span></a></li>\n      </ul>\n</nav>'
        },
        "useData": !0
    }), t.reader_navitem = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div class="toolbar_reader toolbar navigationItem wrapper wrapper_full">\n    <div class="toolbar_reader_divider"></div>\n    <h2 class="toolbar_reader_title"></h2>\n    <ul class="icons leftItem">\n        <li id="pagenav_back" class="simple"><a class="hint-item" title="' + o(s(null != (a = null != e ? e.reader : e) ? a.goback : a, e)) + '" data-intro="' + o(s(null != (a = null != e ? e.reader : e) ? a.goback : a, e)) + '" data-position="bottom" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.goback : a, e)) + '</a></li>\n        <li id="pagenav_mark" class="simple" ><a class="hint-item" title="' + o(s(null != (a = null != e ? e.cta : e) ? a.archive : a, e)) + '" data-intro="' + o(s(null != (a = null != e ? e.cta : e) ? a.archive : a, e)) + '" data-position="bottomlower" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.archive : a, e)) + '</a></li>\n        <li id="pagenav_delete" class="simple"><a class="hint-item" title="' + o(s(null != (a = null != e ? e.cta : e) ? a["delete"] : a, e)) + '" data-intro="' + o(s(null != (a = null != e ? e.cta : e) ? a["delete"] : a, e)) + '" data-position="bottom" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a["delete"] : a, e)) + '</a></li>\n        <li id="pagenav_tag" class="simple"><a class="hint-item" title="' + o(s(null != (a = null != e ? e.tag : e) ? a.edittags : a, e)) + '" data-intro="' + o(s(null != (a = null != e ? e.tag : e) ? a.edittags : a, e)) + '" data-position="bottomlower" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.edittags : a, e)) + '</a></li>\n        <li id="pagenav_favorite" class="simple"><a class="hint-item" title="' + o(s(null != (a = null != e ? e.cta : e) ? a.favorite : a, e)) + '" data-intro="' + o(s(null != (a = null != e ? e.cta : e) ? a.favorite : a, e)) + '" data-position="bottom" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.favorite : a, e)) + '</a></li>\n    </ul>\n    <ul class="icons rightItem">\n        <li id="pagenav_share"><a class="hint-item" title="' + o(s(null != (a = null != e ? e.cta : e) ? a.share : a, e)) + '" data-intro="' + o(s(null != (a = null != e ? e.cta : e) ? a.share : a, e)) + '" data-position="bottom" href="#">' + o(s(null != (a = null != e ? e.cta : e) ? a.share : a, e)) + '</a></li>\n        <li id="pagenav_style"><a class="hint-item" title="' + o(s(null != (a = null != e ? e.reader : e) ? a.textoptions : a, e)) + '" data-intro="' + o(s(null != (a = null != e ? e.reader : e) ? a.textoptions : a, e)) + '" data-position="bottom" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.textoptions : a, e)) + '</a></li>\n        <li id="pagenav_more"><a class="hint-item" title="' + o(s(null != (a = null != e ? e.reader : e) ? a.moreactions : a, e)) + '" data-intro="' + o(s(null != (a = null != e ? e.reader : e) ? a.moreactions : a, e)) + '" data-position="bottom" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.moreactions : a, e)) + "</a></li>\n    </ul>\n</div>"
        },
        "useData": !0
    }), t.reader_noarticlewarning = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return "<div class='noarticle_warning'>\n      <p>" + o(s(null != (a = null != e ? e.reader : e) ? a.notarticlenotdisplaywell : a, e)) + ". " + o(s(null != (a = null != e ? e.reader : e) ? a.maywanttoswitch : a, e)) + ".</p>\n      <p>" + o(s(null != (a = null != e ? e.reader : e) ? a.ifshouldbearticle : a, e)) + ".</p>\n</div>"
        },
        "useData": !0
    }), t.reader_pageshell = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            return '<div id="page_reader" class="wrapper wrapper_full articleview"> \n  <div class="reader_content_wrapper">\n      <div class="reader_content"></div>\n  </div>\n</div>'
        },
        "useData": !0
    }), t.reader_stylemenu = e({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '<div id="subnav" class="pkt-nav clearfix">\n      <div class="icons_row">\n            <ul class="icons clearfix textoptions_font">\n                  <li id="submenu_font_serif"><a title="' + o(s(null != (a = null != e ? e.reader : e) ? a.serif : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.serif : a, e)) + '</a></li>\n                  <li id="submenu_font_sans"><a title="' + o(s(null != (a = null != e ? e.reader : e) ? a.sansserif : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.sansserif : a, e)) + '</a></li>\n            </ul>\n            <ul class="icons clearfix textoptions_fontsize">\n                  <li id="submenu_font_down"><a title="' + o(s(null != (a = null != e ? e.reader : e) ? a.decreasefontsize : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.decreasefontsize : a, e)) + '</a></li>\n                  <li id="submenu_font_placeholder">A</li> \n                  <li id="submenu_font_up"><a title="' + o(s(null != (a = null != e ? e.reader : e) ? a.increasefontsize : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.increasefontsize : a, e)) + '</a></li>\n            </ul>\n      </div>\n      <div class="icons_row">\n            <ul class="icons clearfix textoptions_theme">\n                  <li id="submenu_theme_light"><a title="' + o(s(null != (a = null != e ? e.reader : e) ? a.changelight : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.light : a, e)) + '</a></li>\n                  <li id="submenu_theme_dark"><a title="' + o(s(null != (a = null != e ? e.reader : e) ? a.changedark : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.dark : a, e)) + '</a></li>\n                  <li id="submenu_theme_sepia"><a title="' + o(s(null != (a = null != e ? e.reader : e) ? a.changesepia : a, e)) + '" href="#">' + o(s(null != (a = null != e ? e.reader : e) ? a.sepia : a, e)) + "</a></li>\n            </ul>\n      </div>\n</div>"
        },
        "useData": !0
    }), t.tag_edittagdialog = e({
        "1": function(e, t, i, n) {
            return '<div class="overlay_detail overlay_detail_confirm overlay_detail_confirmtag">\n'
        },
        "3": function(e, t, i, n) {
            return '<div class="overlay_detail overlay_detail_confirm overlay_detail_confirmtag overlay_detail_wsuggestedtags">\n <div class="edittag_detail">\n'
        },
        "5": function(e, t, i, n) {
            var a, s = this.lambda,
                o = this.escapeExpression;
            return '  </div>\n  <div class="suggestedtag_detail">\n   <h4>' + o(s(null != (a = null != e ? e.tag : e) ? a.suggestedtags : a, e)) + "</h4>\n </div>\n"
        },
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(e, t, i, n) {
            var a, s = this.lambda,
                o = t.blockHelperMissing,
                r = this.escapeExpression,
                l = "";
            return a = o.call(e, s(null != (a = null != e ? e.manual : e) ? a.suggestedtags : a, e), {
                "name": "manual.suggestedtags",
                "hash": {},
                "fn": this.noop,
                "inverse": this.program(1, n),
                "data": n
            }), null != a && (l += a), a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.suggestedtags : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(3, n),
                "inverse": this.noop,
                "data": n
            }), null != a && (l += a), l += " <h3>" + r(s(null != (a = null != e ? e.tag : e) ? a.edittags : a, e)) + '</h3>\n  <a class="close">' + r(s(null != (a = null != e ? e.cta : e) ? a.close : a, e)) + '</a>\n <div class="clearfix token-input-container">\n    <input id="edit-tags-input" type="text">\n    <a href="#" class="button button-small">' + r(s(null != (a = null != e ? e.cta : e) ? a.save : a, e)) + "</a>\n </div>\n",
            a = t["if"].call(e, null != (a = null != e ? e.manual : e) ? a.suggestedtags : a, {
                "name": "if",
                "hash": {},
                "fn": this.program(5, n),
                "inverse": this.noop,
                "data": n
            }), null != a && (l += a), l + "</div>"
        },
        "useData": !0
    })
}();
var Prefs = Class.extend({
    "init": function() {
        this.prefix = "wa_"
    },
    "get": function(e) {
        return this.readCookie(this.prefix + e)
    },
    "set": function(e, t) {
        this.createCookie(this.prefix + e, t)
    },
    "createCookie": function(e, t, i) {
        if (i) {
            var n = new Date;
            n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
            var a = "; expires=" + n.toGMTString()
        } else var a = "";
        document.cookie = e + "=" + t + a + "; domain=." + window.location.host + "; path=/"
    },
    "readCookie": function(e) {
        for (var t = e + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
            for (var a = i[n];
                " " == a.charAt(0);) a = a.substring(1, a.length);
            if (0 == a.indexOf(t)) return a.substring(t.length, a.length)
        }
        return null
    },
    "eraseCookie": function(e) {
        createCookie(e, "", -1)
    }
}),
    prefs = new Prefs,
    currentDropSelector = !1,
    DropSelector = Class.extend({
        "init": function(e) {
            this.lis = {};
            var t = this;
            if (this.callback = e.callback, this.selectCallback = e.selectCallback, this.hideUntilSet = e.hideUntilSet, this.showClass = e.showClass, this.headerTitle = e.headerTitle, this.xOffset = e.xOffset ? e.xOffset : 0, this.onShow = e.onShow, e.nodeName = e.nodeName ? e.nodeName : "div", e.useSelectOnIE && isInternetExplorer()) {
                this.ie9Mode = !0;
                var i = $("<span class='select ie9'><span class='selectLabel'>Newest</span><select style='border: 0px; filter: alpha(opacity=0); width: 140px; height: 26px; position: relative; left: 0px; top: -26px;'></select></span>"),
                    n = i.find("select");
                for (var a in e.list) {
                    var s = $('<option value="' + e.list[a].value + '">' + e.list[a].label + "</option>");
                    this.lis[e.list[a].value] = s.get(0), n.append(s)
                }
                i.bind("change", function(e, n) {
                    var a = $(this).find("select").val(),
                        s = $(this).find("option[value=" + a + "]").text();
                    i.find(".selectLabel").text(s), t.value = a, t.label = s, n !== !1 && t.callback(t)
                }), this.selector = i, this.selector.addClass("dropSelector"), this.displayer = e.displayer ? e.displayer : this.selector, this.displayer.append(this.selector), i.trigger("change", [!1])
            } else e.object ? (this.object = e.object, this.object.addClass("dropSelector"), this.displayer = e.displayer ? e.displayer : this.object) : (this.object = $("<" + e.nodeName + ' id="' + (e.id ? e.id : "") + '" class="dropSelector' + (e["class"] ? " " + e["class"] : "") + '"></' + e.nodeName + ">"), this.displayer = $("<a></a>"), this.object.append(this.displayer)); if (this.anchor = e.anchor ? e.anchor : this.object, !e.useSelectOnIE || !isInternetExplorer()) {
                var o, r = $('<div class="popover-new">'),
                    l = $('<ul class="popover-new-list">');
                for (var a in e.list) o = $('<li class="popover-new-listitem ' + e.list[a].value + '" val="' + e.list[a].value + '"><a href="#">' + e.list[a].label + "</a></li>"), this.lis[e.list[a].value] = o.get(0), l.append(o);
                l.children("li").click(function(e) {
                    return e.stopPropagation(), t.select(this)
                }), this.ul = l, this.popover = r, r.append('<div class="arrow">', l), this.closeCta = $('<a class="popover-new-close" href="#"></a>'), this.smallHeader = $('<div class="popover-new-header"></div>'), this.smallHeader.append(this.closeCta), r.prepend(this.smallHeader), this.anchor.append(r), e.alignment && (this.alignment = e.alignment, r.addClass("popover-new-" + e.alignment)), "string" == typeof this.headerTitle && this.smallHeader.append("<h2>" + this.headerTitle + "</h2>"), o.addClass("last"), o.hover(function() {
                    t.object.addClass("lastHovered")
                }, function() {
                    t.object.removeClass("lastHovered")
                }), this.object.click(function() {
                    t.toggle()
                }), this.hideUntilSet ? this.object.hide() : this.set(e.list[0].value, !0)
            }
            e.append ? e.append.append(this.object) : e.insertBefore && this.object.insertBefore(e.insertBefore)
        },
        "select": function(e, t) {
            if (this.object.show(), !this.selectCallback || this.selectCallback(this, e)) {
                this.selected && this.selected.removeClass("selected"), this.selected = $(e), this.selected.addClass("selected"), this.value = this.selected.attr("val");
                var i = this.selected.children("a").text();
                this.label = this.value, this.object.toggleClass("lastSelected", this.selected.hasClass("last")), this.displayer.html("<span>" + i + "</span>"), this.displayer[0].className = this.value, t || this.callback(this)
            }
            return this.close(), !1
        },
        "set": function(e, t) {
            this.ie9Mode ? (this.selector.find("select").attr("value", e), this.selector.trigger("change")) : this.select(this.lis[e], t)
        },
        "toggle": function() {
            this.popover.hasClass("active") ? this.close() : this.show()
        },
        "show": function() {
            if ("function" == typeof this.onShow && this.onShow(this), this.alignment && ("bottom" == this.alignment && this.popover.css({
                "top": this.displayer.height() + parseInt(this.displayer.css("marginBottom")) + Math.abs(parseInt(this.popover.find(".arrow").css("top"))) - 5 + "px",
                "left": -1 * (Math.floor(this.popover.outerWidth() / 2) - Math.floor(this.displayer.outerWidth() / 2) - this.xOffset) + "px"
            }), "bottomright" == this.alignment && this.popover.css({
                "top": this.displayer.height() + parseInt(this.displayer.css("marginBottom")) + Math.abs(parseInt(this.popover.find(".arrow").css("top"))) - 5 + "px",
                "left": -1 * Math.abs(parseInt(this.popover.find(".arrow").css("left")) - this.xOffset) + "px"
            }), "bottomleft" == this.alignment && this.popover.css({
                "top": this.displayer.height() + parseInt(this.displayer.css("marginBottom")) + Math.abs(parseInt(this.popover.find(".arrow").css("top"))) - 5 + "px",
                "left": -1 * (this.popover.outerWidth() - Math.abs(2 * parseInt(this.popover.find(".arrow").css("marginLeft"))) - this.xOffset) + "px"
            })), currentDropSelector) {
                if (currentDropSelector == this) return;
                currentDropSelector.close()
            }
            this.popover.addClass("popover-active"), this.showClass && this.object.addClass(this.showClass), document.getElementById("clickguard") || $("body").prepend('<div id="clickguard" class="clickguard"></div>'), $("#clickguard").show(), setTimeout(function() {
                $(document).bind("click", currentDropSelector.close)
            }, 10), currentDropSelector = this
        },
        "close": function() {
            currentDropSelector && (currentDropSelector.popover.removeClass("popover-active"), currentDropSelector.showClass && currentDropSelector.object.removeClass(currentDropSelector.showClass), $("#clickguard").hide(), $(document).unbind("click", currentDropSelector.close), currentDropSelector = !1)
        }
    }),
    Toolbar = Class.extend({
        "init": function(e) {
            this.items = [];
            this.object = $('<div id="' + (e.id ? e.id : "") + '" class="toolbar' + (e["class"] ? " " + e["class"] : "") + '"></div>'), this.inner = $('<div class="row"></div>'), this.object.append(this.inner);
            for (var t, i, n = 0; n < e.items.length; n++) i = e.items[n], "custom" == i.type ? t = i.item : "spacer" == i.type ? t = new Spacer(i) : "element" == i.type ? t = new ToolbarItem(i) : "button" == i.type && (t = new ToolbarButton(i)), t.object.addClass("item"), this.inner.append(t.object), this.items.push(t);
            e.append ? e.append.append(this.object) : e.insertBefore && this.object.insertBefore(e.insertBefore)
        }
    }),
    toolbarButtons = {}, ToolbarItem = Class.extend({
        "init": function(e) {
            e.object && (this.object = e.object), e.label && this.setLabel(e.label)
        },
        "setLabel": function(e) {
            if (!this.label) {
                var t = $('<div style="position:relative"></div>');
                t.append(this.object.children()), this.object.append(t), this.label = $('<span class="label"></span>'), t.append(this.label)
            }
            this.label.text(e)
        }
    }),
    ToolbarButton = ToolbarItem.extend({
        "init": function(e) {
            var t = this;
            this.callback = e.callback, this.object = $('<div id="' + (e.id ? e.id : "") + '" class="buttonItem ' + (e["class"] ? " " + e["class"] : "") + '"><a ' + (e.title ? 'title="' + e.title + '"' : "") + ' class="button">' + e.text + "</a></div>"), this.object.find(".button").click(function() {
                t.clicked()
            }), this._super(e)
        },
        "clicked": function() {
            this.callback && this.callback()
        }
    }),
    ToolbarEdgeButton = ToolbarItem.extend({
        "init": function(e) {
            var t = this;
            this.callback = e.callback, e.id && (toolbarButtons[e.id] = t), this.object = $('<a id="' + (e.id ? e.id : "") + '" ' + (e.title ? 'title="' + e.title + '"' : "") + ' class="toolbarButton edge ' + (e["class"] ? " " + e["class"] : "") + '"></a>');
            var i = $('<div class="cell"></div>'),
                n = $('<span class="section edge"><span class="img"></span></span>'),
                a = $('<span class="section inner"></span');
            e.left ? (i.append(n), i.append(a), this.object.addClass("left")) : (i.append(a), i.append(n)), this.object.append(i), this.inner = a, e.img && this.inner.append('<img src="/a/i/' + e.img + '" align="middle" />'), e.text && this.inner.append(e.text), this.object.click(function() {
                t.clicked()
            }), this._super(e)
        },
        "clicked": function() {
            this.callback && this.callback(this)
        }
    }),
    Toggle = ToolbarEdgeButton.extend({
        "init": function(e) {
            this._super(e), this.on = e.on, this.on && this.object.addClass("on")
        },
        "clicked": function() {
            this.set(!this.on)
        },
        "set": function(e, t) {
            this.on = e, this.object.toggleClass("on", e), !t && this.callback && this.callback(this)
        }
    }),
    ToolbarSegmentControl = ToolbarItem.extend({
        "init": function(e) {
            this.value = -1;
            var t = this;
            this.callback = e.callback, this.object = $('<div id="' + (e.id ? e.id : "") + '" class="toolbarButton segmentControl' + (e["class"] ? " " + e["class"] : "") + '" style="width:' + (45 * e.items.length - 2) + 'px"></div>');
            var i;
            this.segments = {}, this.keys = [];
            for (var n = 0; n < e.items.length; n++) i = $("<a " + (e.items[n].title ? 'title="' + e.items[n].title + '"' : "") + ' class="section segment ' + e.items[n]["class"] + '" i="' + n + '"><span class="inner"></span></a>'), i.click(function() {
                t.set($(this).attr("i"))
            }), this.object.append(i), this.segments[n] = i, e.items[n]["class"] && (this.keys[n] = e.items[n]["class"]);
            e.label && this.setLabel(e.label)
        },
        "set": function(e, t) {
            e = 1 * e, this.selected && this.selected.removeClass("on"), this.value != e && e >= 0 ? (this.selected = this.segments[e], this.selected.addClass("on"), this.value = e) : this.value = -1, this.callback && !t && this.callback(this)
        },
        "key": function() {
            return -1 != this.value ? this.keys.length ? this.keys[this.value] : this.value : void 0
        }
    }),
    Spacer = Class.extend({
        "init": function(e) {
            e || (e = {}), this.object = $('<div  class="spacer' + (e["class"] ? " " + e["class"] : "") + '" ' + (e.width ? ' style="width:' + e.width + 'px"' : "") + ">&nbsp;</div>")
        },
        "setWidth": function(e) {
            e ? this.object.css("width", e + "px") : this.object.css("width", "auto")
        }
    }),
    openPopover, PopOver = Class.extend({
        "init": function(e, t, i, n) {
            if (this.container = i ? i : $("#container"), this.object = $('<div id="' + e + '" class="popover-new">'), this.sizeObject = this.object, this.container.append(this.object), this.arrow = $('<div class="arrow">'), this.closeCta = $('<a class="popover-new-close" href="#"></a>'), this.smallHeader = $('<div class="popover-new-header"></div>'), this.smallHeader.append(this.closeCta), this.object.append(this.arrow, t), this.object.prepend(this.smallHeader), this.closeCta.on("click", function(e) {
                e.preventDefault()
            }), n || (n = {}), this.positions = n.positions ? n.positions : ["bottom", "bottomright", "bottomleft", "topleft", "topright"], this.onHide = n.onHide, this.onShow = n.onShow, this.headerTitle = n.headerTitle, "string" == typeof this.headerTitle && this.smallHeader.append("<h2>" + this.headerTitle + "</h2>"), this.hideOnClickInPopover = "undefined" == typeof n.hideOnClickInPopover ? !0 : n.hideOnClickInPopover, this.disableHideOnScroll = n.disableHideOnScroll || !1, this.onlyCentered = n.onlyCentered || !1, this.fixedPosition = n.fixedPosition || !1, this.inToolbar = n.inToolbar || !1, this.sizingWithPadding = n.sizingWithPadding || !1, this.scrollingIntoView = !1, this.xOffset = n.xOffset ? n.xOffset : 0, n.smallArrow && (this.smallArrow = n.smallArrow), n.noClickDismiss && (this.noClickDismiss = n.noClickDismiss), n.confirmCallback && (this.confirmCallback = n.confirmCallback), n.confirmButton) {
                this.confirmButton = n.confirmButton, this.object.append('<div class="button_container"><a class="button button-secondary button-small" href="#">Ok</a></div>');
                var a = this;
                this.object.find(".button").click(function(e) {
                    e.preventDefault(), "object" == typeof openPopover && openPopover.hideOpenPopover(), a.confirmCallback && a.confirmCallback()
                })
            }
        },
        "show": function(e) {
            if (this.anchor = e, e) {
                this.object.removeClass("popover-new-topleft popover-new-topright popover-new-bottomleft popover-new-bottomright popover-new-bottom popover-new-left popover-new-top popover-new-right popover-new-centered popover-new-centeredleft");
                var t = this.object.css("display");
                this.object.css("display", "block"), this.popupSize = getSize(this.sizeObject, this.sizingWithPadding), this.object.css("display", t), this.viewPort = getSize($(window)), this.viewPort.headersHeight = $("header").height(), this.viewPort.footersHeight = $("footer").height(), this.viewPort.height = this.viewPort.height - this.viewPort.headersHeight - this.viewPort.footersHeight, this.viewPort.top = $(window).scrollTop() + this.viewPort.headersHeight, this.inToolbar && (this.viewPort.top = 0), this.viewPort.bottom = this.viewPort.top + this.viewPort.height, this.viewPort.left = 0, this.viewPort.right = this.viewPort.width, this.documentSize = getSize($(document)), this.anchorPosition = e.offset(), this.anchorSize = {
                    "width": e.width(),
                    "height": e.height()
                }, this.arrowSize = {
                    "width": 14,
                    "height": 10
                }, this.smallArrow && (this.arrowSize = {
                    "width": 14,
                    "height": 10
                }), this.fixedPosition ? this.object.addClass("popover-new-fixed") : this.object.removeClass("popover-new-fixed"), this.position = !1, this.offset = !1, this.fallbackScrollInto = !1;
                var i = this.viewPort.width >= queue.BREAK_ITEM_POPUP_WIDE || this.object.hasClass("alt-tooltip");
                if (!this.onlyCentered && i)
                    for (var n in this.positions)
                        if (this.tryPosition(this.positions[n])) break;
                        !this.onlyCentered && i && (this.position || this.fallbackScrollInto) ? (this.fixedPosition && (this.offset.top -= $(window).scrollTop()), this.object.css("left", this.offset.left + "px").css("top", this.offset.top + 1 + "px"), this.object.addClass(this.position ? this.position : this.fallbackScrollInto), this.object.removeClass("popover-new-centered"), this.fixedPosition || !this.position && this.fallbackScrollInto && this.scrollToPopup()) : (this.object.css(i ? {
                    "left": "50%",
                    "top": "50%"
                } : {
                    "left": "0",
                    "top": "0"
                }), this.object.addClass("popover-new-centered")), this.showAll()
            } else this.hideAll()
        },
        "scrollToPopup": function() {
            var e = 0,
                t = this.offset.bottom - this.viewPort.bottom,
                i = this.offset.top - this.viewPort.top;
            e = this.offset.top > this.viewPort.top && this.offset.top < this.viewPort.bottom ? t : this.offset.bottom > this.viewPort.top && this.offset.bottom < this.viewPort.bottom ? i : Math.abs(t) < Math.abs(i) ? t : i;
            var n = this;
            this.scrollingIntoView = !0, $("html, body").animate({
                "scrollTop": this.viewPort.top - this.viewPort.headersHeight + e
            }, 500, function() {
                setTimeout(function() {
                    n.scrollingIntoView = !1
                }, 50)
            })
        },
        "showAll": function() {
            openPopover && this !== openPopover && openPopover.hideAll(), openPopover = this, this.clickGuard || (this.clickGuard = $('<div class="clickguard"></div>'), this.container.append(this.clickGuard), openPopover.noClickDismiss || this.clickGuard.click(openPopover.hideOpenPopover)), setTimeout(function() {
                openPopover.noClickDismiss || $(document).bind("click", openPopover.hideOpenPopover)
            }, 10), $(window).bind("scroll", openPopover.onScroll), this.object.addClass("popover-active"), this.clickGuard.show(), this.object.addClass("shown"), this.onShow && this.onShow()
        },
        "hideAll": function() {
            this.object.removeClass("popover-active"), this.clickGuard && this.clickGuard.hide(), $(document).unbind("click", openPopover.hideOpenPopover), $(window).unbind("scroll", openPopover.onScroll), openPopover = !1, this.onHide && this.onHide()
        },
        "hideOpenPopover": function(e) {
            if (openPopover) {
                if (openPopover.viewPort.width < queue.BREAK_ITEM_POPUP_WIDE && "undefined" != typeof e && !$(e.target).hasClass("popover-new-close") && !$(e.target).parents(".popover-new-listitem").length || !openPopover.hideOnClickInPopover && "undefined" != typeof e && 0 !== $(openPopover.object).find(e.target).length) return;
                openPopover.hideAll()
            }
        },
        "onScroll": function() {
            openPopover.scrollingIntoView || openPopover.disableHideOnScroll || openPopover.hideOpenPopover()
        },
        "tryPosition": function(e) {
            return this["try_" + e]()
        },
        "fits": function(e) {
            return e.top > this.viewPort.top && e.bottom < this.viewPort.bottom && e.left > 0 && e.right < this.viewPort.right
        },
        "canScrollIntoView": function(e) {
            return this.fallbackScrollInto ? void 0 : e.top > this.viewPort.headersHeight && e.bottom < this.documentSize.height - this.viewPort.footersHeight && e.left > 0 && e.right < this.documentSize.width
        },
        "try_bottom": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left + this.anchorSize.width / 2 - this.arrowSize.width / 6) + this.xOffset, t = Math.round(this.anchorPosition.top + 1.3 * this.arrowSize.height + this.anchorSize.height);
            var i = {
                "left": e - Math.floor(this.popupSize.width / 2),
                "right": e + Math.ceil(this.popupSize.width / 2),
                "top": t,
                "bottom": t + this.popupSize.height + this.arrowSize.height
            };
            return this.fits(i) ? (this.position = "popover-new-bottom", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "popover-new-bottom", this.offset = i))
        },
        "try_bottomright": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left - this.arrowSize.width / 2 - this.arrowSize.width / 6) + this.xOffset, t = Math.round(this.anchorPosition.top + this.arrowSize.height + this.anchorSize.height);
            var i = {
                "left": e,
                "right": e + this.popupSize.width,
                "top": t,
                "bottom": t + this.popupSize.height + this.arrowSize.height
            };
            return this.fits(i) ? (this.position = "popover-new-bottomright", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "popover-new-bottomright", this.offset = i))
        },
        "try_bottomleft": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left + this.anchorSize.width) + this.xOffset, t = Math.round(this.anchorPosition.top + 1.3 * this.arrowSize.height + this.anchorSize.height);
            var i = {
                "left": e - this.popupSize.width,
                "right": e,
                "top": t,
                "bottom": t + this.popupSize.height + this.arrowSize.height
            };
            return this.fits(i) ? (this.position = "popover-new-bottomleft", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "popover-new-bottomleft", this.offset = i))
        },
        "try_top": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left + this.anchorSize.width / 2 - this.arrowSize.width / 6) + this.xOffset, t = Math.round(this.anchorPosition.top - this.arrowSize.height);
            var i = {
                "left": e - Math.floor(this.popupSize.width / 2),
                "right": e + Math.ceil(this.popupSize.width / 2),
                "top": t - this.popupSize.height - this.arrowSize.height,
                "bottom": t
            };
            return this.fits(i) ? (this.position = "popover-new-top", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "popover-new-top", this.offset = i))
        },
        "try_topleft": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left + this.anchorSize.width) + this.xOffset, t = Math.round(this.anchorPosition.top - this.arrowSize.height);
            var i = {
                "left": e - this.popupSize.width,
                "right": e,
                "top": t - this.popupSize.height - this.arrowSize.height,
                "bottom": t
            };
            return this.fits(i) ? (this.position = "popover-new-topleft", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "popover-new-topleft", this.offset = i))
        },
        "try_topright": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left - this.arrowSize.width / 2 - this.arrowSize.width / 6) + this.xOffset, t = Math.round(this.anchorPosition.top - this.arrowSize.height);
            var i = {
                "left": e,
                "right": e + this.popupSize.width,
                "top": t - this.popupSize.height,
                "bottom": t
            };
            return this.fits(i) ? (this.position = "popover-new-topright", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "popover-new-topright", this.offset = i))
        },
        "try_below": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left + this.anchorSize.width / 2 - this.arrowSize.width / 6) + this.xOffset, t = Math.round(this.anchorPosition.top + this.anchorSize.height);
            var i = {
                "left": e - Math.round(this.popupSize.width / 2),
                "right": e + Math.round(this.popupSize.width / 2),
                "top": t,
                "bottom": t + this.popupSize.height
            };
            return this.fits(i) ? (this.position = "below", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "below", this.offset = i))
        },
        "try_above": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left + this.anchorSize.width / 2 - this.arrowSize.width / 6) + this.xOffset, t = Math.round(this.anchorPosition.top);
            var i = {
                "left": e - Math.round(this.popupSize.width / 2),
                "right": e + Math.round(this.popupSize.width / 2),
                "top": t - this.popupSize.height,
                "bottom": t
            };
            return this.fits(i) ? (this.position = "above", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "above", this.offset = i))
        },
        "try_left": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left - this.arrowSize.width / 4) + this.xOffset, t = Math.round(this.anchorPosition.top + this.anchorSize.height / 2);
            var i = {
                "left": e - this.popupSize.width,
                "right": e,
                "top": t - Math.round(this.popupSize.height / 2),
                "bottom": t + Math.round(this.popupSize.height / 2)
            };
            return this.fits(i) ? (this.position = "popover-new-left", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "popover-new-left", this.offset = i))
        },
        "try_right": function() {
            var e, t;
            e = Math.round(this.anchorPosition.left + this.anchorSize.width + 1.2 * this.arrowSize.width) + this.xOffset, t = Math.round(this.anchorPosition.top + this.anchorSize.height / 2);
            var i = {
                "left": e,
                "right": e + this.popupSize.width,
                "top": t - Math.round(this.popupSize.height / 2),
                "bottom": t + Math.round(this.popupSize.height / 2)
            };
            return this.fits(i) ? (this.position = "popover-new-right", this.offset = i, !0) : void(this.canScrollIntoView(i) && (this.fallbackScrollInto = "popover-new-right", this.offset = i))
        }
    }),
    currentGSFTooltip = !1,
    IsolateScreen = {
        "screen": null,
        "anchor": null,
        "showing": !1,
        "show": function(e) {
            this.screen || (this.screen = $(Handlebars.templates.isolate_screen(dictJSON)), $("body").append(this.screen)), this.anchor = e, this.calcPosition(), this.showing = !0
        },
        "hide": function() {
            this.screen && (this.screen.removeClass("isolate_screen_active isolate_screen_simple isolate_screen_immediate"), this.showing = !1, this.anchor = !1)
        },
        "calcPosition": function() {
            if ("object" == typeof this.anchor && null !== this.anchor) {
                var e = {
                    "x": this.anchor.offset().left,
                    "y": this.anchor.offset().top
                }, t = {
                        "x": e.x + this.anchor.outerWidth(),
                        "y": e.y
                    }, i = {
                        "x": e.x,
                        "y": e.y + this.anchor.outerHeight()
                    }, n = ({
                        "x": t.x,
                        "y": i.y
                    }, $(window).width()),
                    a = $(window).height(),
                    s = $(document).height();
                s > a && (a = s), $(".isolate_screen_top").css("height", e.y + "px"), $(".isolate_screen_left").css({
                    "width": e.x + "px",
                    "height": i.y - e.y + "px",
                    "top": e.y + "px"
                }), $(".isolate_screen_right").css({
                    "width": n - t.x + "px",
                    "height": i.y - e.y + "px",
                    "top": e.y + "px"
                }), $(".isolate_screen_bottom").css({
                    "top": i.y + "px",
                    "height": a - i.y + "px"
                }), this.showing && $(".isolate_screen_detail").addClass("isolate_screen_immediate"), $(".isolate_screen_top").removeClass("isolate_screen_simple"), $(".isolate_screen_detail").addClass("isolate_screen_active")
            } else $(".isolate_screen_top").css("height", "100%"), $(".isolate_screen_left").css({
                "width": "100%",
                "height": "100%",
                "top": 0
            }), $(".isolate_screen_right").css({
                "width": "100%",
                "height": "100%",
                "top": 0
            }), $(".isolate_screen_bottom").css({
                "top": 0,
                "height": "100%"
            }), this.showing && $(".isolate_screen_detail").addClass("isolate_screen_immediate"), $(".isolate_screen_top").addClass("isolate_screen_simple"), $(".isolate_screen_detail").removeClass("isolate_screen_active"), this.showing ? $(".isolate_screen_top").addClass("isolate_screen_active") : setTimeout(function() {
                $(".isolate_screen_top").addClass("isolate_screen_active")
            }, 1)
        }
    }, OverlayScreen = {
        "overlayDetail": "<p></p>",
        "showing": !1,
        "hide": function() {
            var e = this;
            Modernizr.csstransitions ? this.overlayScreen.on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function(t) {
                $(t.target).hasClass("overlay_screen") && (e.overlayScreen.find(".content_detail_loading").remove(), e.overlayScreen.off("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd"), e.overlayScreen.hide(), e.showing = !1)
            }) : (e.overlayScreen.find(".content_detail_loading").remove(), e.overlayScreen.hide(), e.showing = !1), this.overlayScreen.removeClass("overlay_screen_active overlay_screen_dark")
        },
        "setDetail": function(e) {
            this.overlayDetail = e
        },
        "show": function() {
            this.overlayScreen ? this.overlayScreen.show() : (this.overlayScreen = $('<div class="overlay_screen"><div class="content_container"><div class="content_detail"></div></div></div>'), $("body").append(this.overlayScreen)), this.overlayScreen.find(".content_container").css("height", $(window).height() + "px"), this.overlayScreen.find(".content_detail").html("").append(this.overlayDetail), this.overlayScreen.addClass("overlay_screen_active"), this.showing = !0
        }
    }, Templating = {
        "callTrans": function(e, t, i, n) {
            if ("object" != typeof dictJSON) return "";
            for (var a = e.split("."), s = dictJSON, o = 0; o < a.length; o++) {
                if ("undefined" == typeof s[a[o]]) return "";
                s = s[a[o]]
            }
            if ("string" != typeof s) return "";
            if ("undefined" == typeof t || "undefined" == typeof i || !t || !i) return "undefined" != typeof n && n ? s.replace(/{(.*)}/i, n) : s;
            if ("string" == typeof t) return s.replace(/(\*)(.*)(\*)/i, t + "$2" + i);
            if ("object" == typeof t) {
                for (var o = 0; o < t.length; o++) s = s.replace(/(\*)([^\*]*)(\*)/i, t[o] + "$2" + i[o]);
                return s
            }
        }
    }, custom_decode_entities = function() {
        function e(e) {
            return e && "string" == typeof e && (e = escape(e).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), t.innerHTML = e, t.innerText ? (e = t.innerText, t.innerText = "") : (e = t.textContent, t.textContent = "")), unescape(e)
        }
        var t = document.createElement("div");
        return e
    }(),
    ffbtnto = !1,
    listenerOnCookieName = "ffbso",
    DataAdapter = Class.extend({
        "init": function() {
            this.sendingCount = 0, this.pendingGets = [], this.requests = {}
        },
        "send": function(e, t) {
            var i = this.rId(e, !0);
            this.sendingCount++, this.requests[i] = this.makeRequest(i, e, t, !1)
        },
        "get": function(e, t) {
            var i = this.rId(e);
            this.requests[i] && (this.requests[i].abort(), this.requests[i] = !1), this.sendingCount > 0 ? this.pendingGets.push({
                "action": e,
                "o": t
            }) : this.requests[i] = this.makeRequest(i, e, t, !0)
        },
        "makeRequest": function(e, t, i, n) {
            return new Request({
                "rId": e,
                "isGet": !! n,
                "action": t,
                "o": i,
                "delegate": this
            })
        },
        "success": function(e, t) {
            if (this.requests[t.rId]) {
                if (e.error && 1 == e.error) return void boot.logout();
                t.o.delegate && t.o.delegate[t.o.doneSelector].call(t.o.delegate, e, t.o)
            }
        },
        "error": function(e) {
            this.requests[e.rId] && (e.o.delegate && e.o.errorSelector ? e.o.delegate[e.o.errorSelector].call(e.o.delegate, e.o) : boot.showErrorNotification(Templating.callTrans("notification.unexpectederror")))
        },
        "always": function(e) {
            if (this.requests[e.rId] = !1, !e.isGet && (this.sendingCount--, 0 === this.sendingCount)) {
                var t = $.extend(!0, [], this.pendingGets);
                if (this.pendingGets = [], t.length)
                    for (var i = 0; i < t.length; i++) this.get(t[i].action, t[i].o)
            }
        },
        "rId": function(e, t) {
            return e + (t ? "|" + Math.random() : "")
        }
    }),
    RequestCore = Class.extend({
        "init": function(e) {
            this.rId = e.rId, this.isGet = e.isGet, this.delegate = e.delegate, this.action = e.action, this.data = e.o.data, this.dataType = e.o.dataType || "json", this.o = e.o, this.send()
        },
        "abort": function() {},
        "success": function(e) {
            this.delegate && this.delegate.success(e, this)
        },
        "error": function(e) {
            "abort" != e && this.delegate && this.delegate.error(this)
        },
        "always": function() {
            this.delegate && this.delegate.always(this)
        }
    }),
    Request = RequestCore.extend({
        "send": function() {
            var e = this;
            this.data || (this.data = {}), this.data.formCheck = formCheck, this.ajaxRequest = $.ajax({
                "type": "POST",
                "url": "/a/x/" + this.action + ".php",
                "data": this.data,
                "dataType": this.dataType,
                "success": function(t, i, n) {
                    e.success(t), e.data.successResponse && e.data.successResponse(t)
                },
                "error": function(t, i, n) {
                    "abort" != i && e.error(i)
                },
                "complete": function(t, i) {
                    e.always()
                }
            })
        },
        "abort": function() {
            this.ajaxRequest.abort()
        }
    });
PKTToast.prototype = {
    "nonanimationtimer": null,
    "show": function(e) {
        var t = this;
        this.obj || (this.obj = $('<div class="pkt_toast_wrapper"><div class="pkt_toast"></div></div>'), $(document.body).append(this.obj)), this.obj.show(), this.toastdetail = this.obj.find(".pkt_toast"), window.getComputedStyle(this.toastdetail[0]).opacity;
        var i = !1;
        this.toastdetail.hasClass("pkt_toast_active") ? (i = !0, this.toastdetail.text(e)) : this.toastdetail.text(e).addClass("pkt_toast_active"), i ? Modernizr.cssanimations ? (this.toastdetail.removeClass("pkt_toast_active"), this.toastdetail[0].offsetWidth = this.toastdetail[0].offsetWidth, this.toastdetail.addClass("pkt_toast_active_alt")) : "number" == typeof this.nonanimationtimer && (clearTimeout(this.nonanimationtimer), this.nonanimationtimer = setTimeout(function() {
            t.hide()
        }, 3e3)) : Modernizr.cssanimations ? this.toastdetail.one("webkitAnimationEnd animationend msAnimationEnd oAnimationEnd", function(e) {
            t.hide()
        }) : this.nonanimationtimer = setTimeout(function() {
            t.hide()
        }, 3e3)
    },
    "hide": function() {
        var e = this;
        this.obj && (Modernizr.cssanimations ? (e.toastdetail.addClass("pkt_toast_inactive"), e.toastdetail.one("webkitAnimationEnd animationend msAnimationEnd oAnimationEnd", function(t) {
            e.toastdetail.removeClass("pkt_toast_active pkt_toast_inactive"), e.obj.hide()
        })) : (e.toastdetail.removeClass("pkt_toast_active"), e.obj.hide()))
    }
};
var sharedToast = new PKTToast;
Boot.prototype = {
    "init": function() {
        if (this.addLinkListener(), this.addKeyboardShortcuts(), this.loadStateFromUrl(), this.addSyncingTrigger(), this.runMouseDetection(), "object" == typeof this.ExternalUserSettings.styles) {
            this.skin = this.ExternalUserSettings.styles.skin;
            var e = $("body").attr("class");
            $("body").attr("class", e.replace(/page-queue(\w+)/, "page-queue" + this.skin).replace(/page-reader(\w+)/, "page-reader" + this.skin).replace(/page-skin(\w+)/, "page-skin" + this.skin))
        }
        "object" == typeof window.optimizely && window.optimizely.push(ServerSettings.fromSignup ? ["trackEvent", "user_signup"] : ["trackEvent", "user_login"])
    },
    "addLinkListener": function() {
        $("#page").on("click", "a[href]", function(e) {
            if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return !0;
            var t = this.getAttribute("href");
            return t.match(/^\/a\//) ? ($(".popover-new").removeClass("popover-active"), $(".section-filter-options").hasClass("section-filter-options-active") && $(".searchtoolbar_queue").find(".section-filter").trigger("click"), boot.loadStateFromUrl(t), !1) : void 0
        })
    },
    "addKeyboardShortcuts": function() {
        var e = this;
        Mousetrap.bind("g l", function() {
            boot.pages.queue.isOpen && !OverlayScreen.showing && $(".section-mylist").trigger("click")
        }), Mousetrap.bind("g f", function() {
            boot.pages.queue.isOpen && !OverlayScreen.showing && $(".section-favorites").trigger("click")
        }), Mousetrap.bind("g a", function() {
            boot.pages.queue.isOpen && !OverlayScreen.showing && $(".section-archive").trigger("click")
        }), Mousetrap.bind("g r", function() {
            boot.pages.queue.isOpen && !OverlayScreen.showing && $(".filter-articles").trigger("click")
        }), Mousetrap.bind("g v", function() {
            boot.pages.queue.isOpen && !OverlayScreen.showing && $(".filter-videos").trigger("click")
        }), Mousetrap.bind("g i", function() {
            boot.pages.queue.isOpen && !OverlayScreen.showing && $(".filter-images").trigger("click")
        }), Mousetrap.bind("g s", function(e) {
            boot.pages.queue.isOpen && !OverlayScreen.showing && (e.preventDefault(), e.stopImmediatePropagation(), boot.pages.queue.showSearchState(!0), PocketAnalytics.action("search_focus", "interact", "webapp", 1))
        }), Mousetrap.bind("g u", function(e) {
            boot.pages.queue.isOpen && !OverlayScreen.showing && $("#pagenav_addarticle > a").trigger("click")
        }), Mousetrap.bind("g b", function(e) {
            boot.pages.queue.isOpen && !OverlayScreen.showing && $(".pagenav_bulkedit > a").trigger("click")
        }), Mousetrap.bind("s n", function() {
            if (boot.pages.queue.isOpen && !OverlayScreen.showing) {
                if ("object" != typeof boot.ExternalUserSettings || "newest" == boot.ExternalUserSettings.sortlist) return void sharedToast.show(Templating.callTrans("queue.sortingbynewest"));
                boot.ExternalUserSettings.sortlist = "newest", boot.saveExternalUserSettings(), queue.reloadList(), sharedToast.show(Templating.callTrans("queue.sortingbynewest")), PocketAnalytics.action("sort_queue_newest", "interact", "webapp", 1)
            }
        }), Mousetrap.bind("s o", function() {
            if (boot.pages.queue.isOpen && !OverlayScreen.showing) {
                if ("object" != typeof boot.ExternalUserSettings || "oldest" == boot.ExternalUserSettings.sortlist) return void sharedToast.show(Templating.callTrans("queue.sortingbyoldest"));
                boot.ExternalUserSettings.sortlist = "oldest", boot.saveExternalUserSettings(), queue.reloadList(), sharedToast.show(Templating.callTrans("queue.sortingbyoldest")), PocketAnalytics.action("sort_queue_oldest", "interact", "webapp", 1)
            }
        }), Mousetrap.bind("v l", function() {
            if (boot.pages.queue.isOpen && !OverlayScreen.showing) {
                if ($(".pagenav_listview").length) return;
                PocketAnalytics.action("toggle_view_list", "interact", "webapp", 1), e.loadStateFromUrl($(".pagenav_gridlist").children("a").attr("href"))
            }
        }), Mousetrap.bind("v t", function() {
            if (boot.pages.queue.isOpen && !OverlayScreen.showing) {
                if ($(".pagenav_gridview").length) return;
                PocketAnalytics.action("toggle_view_grid", "interact", "webapp", 1), e.loadStateFromUrl($(".pagenav_gridlist").children("a").attr("href"))
            }
        }), Mousetrap.bind("v w", function() {
            OverlayScreen.showing || boot.pages.reader.setSkin("light")
        }), Mousetrap.bind("v d", function() {
            OverlayScreen.showing || boot.pages.reader.setSkin("dark")
        }), Mousetrap.bind("v s", function() {
            OverlayScreen.showing || boot.pages.reader.setSkin("sepia")
        }), Mousetrap.bind(["shift+/", "/"], function() {
            PocketAnalytics.action("view_shortcuts", "interact", "webapp", 1), "function" == typeof $.fn.chardinJs && ($("body").one("chardinJs:start", function() {
                if (!$(".chardinjs-keyboard").length) {
                    var e;
                    boot.pages.queue.isOpen ? (dictJSON.manual.help_lfa = Templating.callTrans("help.xtheny").replace("xxxxx", "g").replace("yyyyy", "l/f/a"), dictJSON.manual.help_rvi = Templating.callTrans("help.xtheny").replace("xxxxx", "g").replace("yyyyy", "r/v/i"),
                        dictJSON.manual.help_s = Templating.callTrans("help.xtheny").replace("xxxxx", "g").replace("yyyyy", "s"), dictJSON.manual.help_u = Templating.callTrans("help.xtheny").replace("xxxxx", "g").replace("yyyyy", "u"), dictJSON.manual.help_b = Templating.callTrans("help.xtheny").replace("xxxxx", "g").replace("yyyyy", "b"), dictJSON.manual.help_n = Templating.callTrans("help.xtheny").replace("xxxxx", "s").replace("yyyyy", "n"), dictJSON.manual.help_o = Templating.callTrans("help.xtheny").replace("xxxxx", "s").replace("yyyyy", "o"), dictJSON.manual.help_l = Templating.callTrans("help.xtheny").replace("xxxxx", "v").replace("yyyyy", "l"), dictJSON.manual.help_t = Templating.callTrans("help.xtheny").replace("xxxxx", "v").replace("yyyyy", "t"), dictJSON.manual.help_vw = Templating.callTrans("help.xtheny").replace("xxxxx", "v").replace("yyyyy", "w"), dictJSON.manual.help_vd = Templating.callTrans("help.xtheny").replace("xxxxx", "v").replace("yyyyy", "d"), dictJSON.manual.help_vs = Templating.callTrans("help.xtheny").replace("xxxxx", "v").replace("yyyyy", "s"), e = Handlebars.templates.queue_helpoverlay) : (dictJSON.manual.help_vw = Templating.callTrans("help.xtheny").replace("xxxxx", "v").replace("yyyyy", "w"), dictJSON.manual.help_vd = Templating.callTrans("help.xtheny").replace("xxxxx", "v").replace("yyyyy", "d"), dictJSON.manual.help_vs = Templating.callTrans("help.xtheny").replace("xxxxx", "v").replace("yyyyy", "s"), e = Handlebars.templates.reader_helpoverlay), header = $(e(dictJSON)), $(".chardinjs-overlay").append(header)
                }
            }), $("body").chardinJs("toggle"))
        }), Mousetrap.bind("j", function(t) {
            boot.pages.queue.isOpen && !OverlayScreen.showing && (e.pages.queue.highlightItemMove(!0), PocketAnalytics.action("item_next", "interact", "webapp", 1))
        }), Mousetrap.bind("k", function(t) {
            boot.pages.queue.isOpen && !OverlayScreen.showing && (e.pages.queue.highlightItemMove(!1), PocketAnalytics.action("item_previous", "interact", "webapp", 1))
        }), Mousetrap.bind(["return", "enter"], function(t) {
            boot.pages.queue.isOpen && !OverlayScreen.showing && (t.preventDefault(), e.pages.queue.highlightItemAction("open"))
        }), Mousetrap.bind("a", function(t) {
            boot.pages.queue.isOpen && !OverlayScreen.showing ? e.pages.queue.highlightItemAction("mark") : boot.pages.reader.isOpen && !OverlayScreen.showing && (e.pages.reader.actionToggle("mark"), PocketAnalytics.action("archive", "interact", "webapp", 1))
        }), Mousetrap.bind("b", function(e) {
            boot.pages.reader.isOpen && !OverlayScreen.showing && $("#pagenav_back a").trigger("click")
        }), Mousetrap.bind("d", function(t) {
            boot.pages.reader.isOpen && !OverlayScreen.showing && e.pages.reader.toggleFullScreenMode()
        }), Mousetrap.bind("f", function(t) {
            boot.pages.queue.isOpen && !OverlayScreen.showing ? e.pages.queue.highlightItemAction("favorite") : boot.pages.reader.isOpen && !OverlayScreen.showing && (e.pages.reader.actionToggle("favorite"), PocketAnalytics.action("favorite", "interact", "webapp", 1))
        }), Mousetrap.bind("o", function(t) {
            if (boot.pages.queue.isOpen && !OverlayScreen.showing) e.pages.queue.highlightItemAction("browseropen");
            else if (boot.pages.reader.isOpen && "string" == typeof boot.pages.reader.item.given_url && !OverlayScreen.showing) {
                var i = boot.pages.reader.item,
                    n = i.resolved_url ? i.resolved_url : i.given_url;
                PocketAnalytics.action("open_original", "interact", "webapp", 1), window.open(urlWithPocketRedirect(n))
            }
        }), Mousetrap.bind("t", function(t) {
            boot.pages.queue.isOpen && !OverlayScreen.showing ? e.pages.queue.highlightItemAction("tag") : boot.pages.reader.isOpen && !OverlayScreen.showing && $("#pagenav_tag").find("a").trigger("click")
        }), Mousetrap.bind(["command+-", "control+-"], function(t) {
            t.preventDefault(), boot.pages.reader.isOpen && !OverlayScreen.showing && (e.pages.reader.fontInc(-1), PocketAnalytics.action("font_decrease", "interact", "webapp", 1))
        }), Mousetrap.bind(["command+=", "control+="], function(t) {
            t.preventDefault(), boot.pages.reader.isOpen && !OverlayScreen.showing && (e.pages.reader.fontInc(1), PocketAnalytics.action("font_increase", "interact", "webapp", 1))
        }), Mousetrap.bind("esc", function(e) {
            boot.pages.queue.isOpen && OverlayScreen.showing ? (e.preventDefault(), "object" == typeof OverlayScreen && OverlayScreen.hide()) : boot.pages.queue.isOpen && $(".container-bulkedit-active").length && (e.preventDefault(), boot.pages.queue.showBulkEdit(!1))
        })
    },
    "loadStateFromUrl": function(e) {
        var t = {}, i = parseUri(e ? e : window.location);
        t.sections = i.path.replace(new RegExp("^" + this.urlHead), "").split("/");
        for (var n = 0; n < t.sections.length; n++) t.sections[n] = decodeURIComponent(t.sections[n]);
        t.page = t.sections[0], t.page || (t.page = this.defaultPage), this.router[t.page] ? (t.controller = this.pages[this.router[t.page]], t.controller.loadState(t)) : this.loadStateFromUrl("/a/")
    },
    "addSyncingTrigger": function() {
        this.addSyncByWindowFocus()
    },
    "addSyncByWindowFocus": function() {
        $(window).on("focus", function() {
            queue.sync()
        })
    },
    "runMouseDetection": function() {
        if (Modernizr.touch && !/iPhone/.test(navigator.userAgent) && !/iPad/.test(navigator.userAgent) && !/Android/.test(navigator.userAgent)) {
            var e = !1;
            $(document).on("mousedown.detectMouse", function(t) {
                e = !1
            }), $(document).on("mousemove.detectMouse", function(t) {
                e && (Modernizr.touch = !1, $("html").removeClass("touch").addClass("no-touch"), $(document).off("mousedown.detectMouse"), $(document).off("mousemove.detectMouse")), e = !0
            })
        }
    },
    "saveGSFStatus": function() {
        var e = this;
        "object" == typeof this.GSFStatus && ("object" == typeof ServerSettings && (ServerSettings.GSFStatus = JSON.stringify(this.GSFStatus)), this.data.send("saveUserMeta", {
            "data": {
                "property": e.USERS_META_WEB_GSF_SETTINGS,
                "value": JSON.stringify(e.GSFStatus),
                "unique": !0
            }
        }, !0))
    },
    "saveExternalUserSettings": function() {
        var e = this;
        "object" == typeof this.ExternalUserSettings && ("object" == typeof ServerSettings && (ServerSettings.externalUserSettings = JSON.stringify(this.ExternalUserSettings)), this.data.send("saveUserMeta", {
            "data": {
                "property": e.USERS_META_WEB_DISPLAY_SETTINGS,
                "value": JSON.stringify(e.ExternalUserSettings),
                "unique": !0
            }
        }, !0))
    },
    "saveMarketingOptOutStatus": function(e) {
        var t = this;
        this.data.send("saveUserMeta", {
            "data": {
                "property": t.USERS_META_MARKETING_OPTOUT,
                "value": e ? "opt_out" : "opt_in",
                "unique": !0
            }
        }, !0)
    },
    "leaveBetaStatus": function() {
        var e = this;
        this.data.send("saveUserMeta", {
            "data": {
                "property": e.USERS_META_WEB_BETA_STATUS,
                "value": {
                    "active": !1
                },
                "unique": !0,
                "successResponse": function(e) {
                    "object" == typeof e && "number" == typeof e.status && 1 == e.status && (document.location.href = "/a?from=beta")
                }
            }
        }, !0)
    },
    "pushState": function(e, t) {
        this.pushing = !0, History.pushState(!1, e, t), this.pushing = !1, "undefined" != typeof pageTracker && pageTracker && pageTracker._trackPageview(t), "function" == typeof ga && ga("send", "pageview", t)
    },
    "showPage": function(e) {
        if (!e.page.hasClass("active")) {
            this.activeController && "reader" == this.activeController.nav && "string" == typeof boot.pages.reader.itemId && this.data.send("leftItem", {
                "data": {
                    "itemId": boot.pages.reader.itemId
                }
            }, !0);
            var t = !0;
            this.activeController ? (this.activeController.willHide(), "queue" == this.activeController.nav && $(".side-nav").addClass("side-nav-forcehidden"), this.activeController.page.removeClass("active"), this.activeController.navigationItem.removeClass("active"), this.activeController.footerItem && this.activeController.footerItem.object.removeClass("active"), this.activeController.didHide()) : t = !1;
            var i = this.skin ? "page-" + e.nav + this.skin + " page-skin" + this.skin : "page-" + e.nav + "light page-skinlight",
                n = $("body").attr("class").match(/(page-app-([\w|-]+))/i),
                a = $("body").hasClass("page-notificationpersistent");
            "object" == typeof n && n.length > 1 && (n = n[1]), $("body").attr("class", "").addClass("page-" + e.nav + " " + i), "string" == typeof n && $("body").addClass(n), a && $("body").addClass("page-notificationpersistent"), "object" == typeof openPopover && openPopover.hideOpenPopover(), IsolateScreen.showing && IsolateScreen.hide();
            var s = $("#livechat-compact-container");
            "queue" == e.nav && ($(".side-nav").removeClass("side-nav-forcehidden"), boot.GSFStatus.waitplaceholderanalytics && (PocketAnalytics.action("gsf_oneitemplaceholder", "view", "webapp"), boot.GSFStatus.waitplaceholderanalytics = !1), s.length && s.css("display", "block")), "reader" == e.nav && s.length && s.css("display", "none"), e.page.addClass("active"), e.navigationItem.addClass("active"), e.footerItem && e.footerItem.object.addClass("active"), $("#page").toggleClass("show_footer", !! e.footerItem), $("header nav li").removeClass("selected"), $("#nav_" + e.nav).addClass("selected"), this.activeController = e, this.activeController.didShow(), "queue" == e.nav && (this.loadedQueue ? boot.pages.queue.expandedToolbarLogic($(window).width(), $(window).scrollTop()) : this.loadedQueue = !0), "queue" == e.nav && $.trim(boot.pages.queue.searchField.val()).length ? boot.pages.queue.showSearchState(!0, !0) : boot.pages.queue.searchStateMode && (boot.pages.queue.showSearchState(!1, !0), boot.pages.queue.saveSearchStateToPrevSearches())
        }
    },
    "showInterstitial": function(e) {
        function t(e) {
            return e.preventDefault(), !1
        }

        function i(e) {
            n.removeClass("open"), $(window).unbind("scroll", t), setTimeout(function() {
                n.remove()
            }, 300)
        }
        var n = $("<div class='interstitial'></div>"),
            a = $("<div class='close'></div>"),
            s = $("<iframe allowtransparency=true></iframe>");
        s.attr("id", "name"), s.bind("load", function(e) {
            s.unbind("load"), setTimeout(function() {
                n.addClass("open"), n.click(i), a.click(i), $(window).bind("scroll", t)
            }, 10)
        }), n.append(s), n.append(a), $(document.body).append(n), s.attr("src", "/interstitial/" + e + ".html?d=" + (new Date).getTime())
    },
    "showNotification": function(e, t, i, n) {
        var a = $(".notifications-sync"),
            s = a.find(".progress-bar-content");
        s.removeClass("progress-bar-zeroed"), "undefined" != typeof e && a.find(".message").html(e), "undefined" != typeof n && n ? a.addClass("notifications-synconlymode") : "undefined" != typeof t && t ? "number" == typeof i ? (i > 1 && (i = 1), s.css("width", 100 * i + "%"), 0 === i && s.addClass("progress-bar-zeroed")) : s.css("width", "1%") : s.css("width", "100%"), a.addClass("notifications-active")
    },
    "hideNotification": function() {
        var e = $(".notifications-sync");
        e.removeClass("notifications-active"), Modernizr.csstransitions ? e.on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function(e) {
            $(e.target).hasClass("notifications-sync") && ($(this).find(".progress-bar-content").addClass("progress-bar-zeroed").removeClass("notifications-synconlymode"), $(this).off("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd"))
        }) : e.find(".progress-bar-content").addClass("progress-bar-zeroed").removeClass("notifications-noprogress")
    },
    "updateNotification": function(e, t) {
        var i = $(".notifications-sync"),
            n = i.find(".progress-bar-content");
        "string" == typeof e && i.find(".message").text(e), "number" == typeof t && (t > 1 && (t = 1), n.css("width", 100 * t + "%"), 0 === t ? n.addClass("progress-bar-zeroed") : n.removeClass("progress-bar-zeroed"))
    },
    "showErrorNotification": function(e, t, i) {
        var n = $(".notifications-error");
        if (!t)
            if (Modernizr.csstransitions) n.one("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function(e) {
                i ? setTimeout(function() {
                    n.removeClass("notifications-active")
                }, 5e3) : n.removeClass("notifications-active")
            });
            else {
                var a = i ? 8e3 : 3e3;
                setTimeout(function() {
                    n.removeClass("notifications-active")
                }, a)
            }
            "string" == typeof e && n.find(".message").text(e), n.addClass("notifications-active")
    },
    "logout": function() {
        removeSetting("GSFStatus"), window.location = "/lo/"
    },
    "goBack": function() {
        History.back()
    },
    "expandToFullFontBundle": function() {
        ! function(e) {
            var t, i = {
                    "kitId": "blp0sen",
                    "scriptTimeout": 3e3
                }, n = e.documentElement,
                a = setTimeout(function() {
                    n.className = n.className.replace(/\bwf-loading\b/g, "") + " wf-inactive"
                }, i.scriptTimeout),
                s = e.createElement("script"),
                o = !1,
                r = e.getElementsByTagName("script")[0];
            n.className += " wf-loading", s.src = "//use.typekit.net/" + i.kitId + ".js", s.async = !0, s.onload = s.onreadystatechange = function() {
                if (t = this.readyState, !(o || t && "complete" != t && "loaded" != t)) {
                    o = !0, clearTimeout(a);
                    try {
                        Typekit.load(i)
                    } catch (e) {}
                }
            }, r.parentNode.insertBefore(s, r)
        }(document)
    }
};
var boot = new Boot;
$(document).ready(function() {
    boot.init()
}), History.Adapter.bind(window, "statechange", function(e) {
    var t = History.getState();
    return boot.pushing || boot.loadStateFromUrl(t.url), !0
}), Reader.prototype = {
    "init": function() {
        var e = this;
        this.data = queue.data, ServerSettings.PremiumStatus && (queue.premiumMode = !0);
        var t = Handlebars.templates.reader_navitem;
        this.navigationItem = $(t(dictJSON)), $("#page .pkt-nav").append(this.navigationItem), this.styleMenuContent = $(Handlebars.templates.reader_stylemenu(dictJSON)), this.styleMenuContent.find("#submenu_font_serif a").click(function(t) {
            t.preventDefault(), (!$("#subnav").hasClass("inactive") || $(t.target).hasClass("selected")) && e.setFont("serif")
        }), this.styleMenuContent.find("#submenu_font_sans a").click(function(t) {
            t.preventDefault(), (!$("#subnav").hasClass("inactive") || $(t.target).hasClass("selected")) && e.setFont("sans")
        }), this.styleMenuContent.find("#submenu_font_down a").click(function(t) {
            t.preventDefault(), $("#subnav").hasClass("inactive") || (PocketAnalytics.action("font_decrease", "interact", "webapp"), e.fontInc(-1))
        }), this.styleMenuContent.find("#submenu_font_up a").click(function(t) {
            t.preventDefault(), $("#subnav").hasClass("inactive") || (PocketAnalytics.action("font_increase", "interact", "webapp"), e.fontInc(1))
        }), this.styleMenuContent.find("#submenu_theme_light a").click(function(t) {
            t.preventDefault(), (!$("#subnav").hasClass("inactive") || $(t.target).hasClass("selected")) && e.setSkin("light")
        }), this.styleMenuContent.find("#submenu_theme_dark a").click(function(t) {
            t.preventDefault(), (!$("#subnav").hasClass("inactive") || $(t.target).hasClass("selected")) && e.setSkin("dark")
        }), this.styleMenuContent.find("#submenu_theme_sepia a").click(function(t) {
            t.preventDefault(), (!$("#subnav").hasClass("inactive") || $(t.target).hasClass("selected")) && e.setSkin("sepia")
        }), this.page = $(Handlebars.templates.reader_pageshell(dictJSON)), $("#content").append(this.page), /MSIE/.test(navigator.userAgent) && this.page.addClass("articleview_nofavicon"), this.articleview = this.page.find(".reader_content_wrapper"), this.page.append(this.articleview), this.content = this.page.find(".reader_content"), $("#pagenav_home a").click(function(e) {
            e.preventDefault(), document.location.href = "/a"
        }), $("#pagenav_back a").click(function(t) {
            boot.GSFStatus.active && $(".tooltip-reader").is(":visible") && "object" == typeof openPopover && openPopover.hideOpenPopover(), e.goBackToQueue(), t.preventDefault()
        }), $("#pagenav_mark a").click(function(t) {
            e.actionToggle("mark"), t.preventDefault()
        }), $("#pagenav_delete a").click(function(t) {
            e.confirmDelete(), t.preventDefault()
        }), $("#pagenav_tag a").click(function(t) {
            e.editItemTags(), t.preventDefault()
        }), $("#pagenav_favorite a").click(function(t) {
            e.actionToggle("favorite"), t.preventDefault()
        }), $("#pagenav_share a").click(function(t) {
            e.showShareMenu(this), t.preventDefault()
        }), $("#pagenav_style a").click(function(t) {
            e.showStyleMenu(this), t.preventDefault()
        }), $("#pagenav_more a").click(function(t) {
            e.showMoreActionsMenu(this), t.preventDefault()
        }), Modernizr.touch || $(".hint-item").each(function(e, t) {
            createSimpleTooltip($(t))
        }), this.inited = !0
    },
    "goBackToQueue": function() {
        queue.inited && !boot.pages.reader.openedIFrame ? boot.goBack() : (boot.pages.reader.openedIFrame = !1, boot.loadStateFromUrl($(window).width() < boot.pages.queue.BREAK_ITEM_COLUMNS_TWO && "object" == typeof boot.pages.queue.state ? "/a/" + boot.pages.queue.state.section + "/list" : "/a/"))
    },
    "currentLoadedURL": function() {
        return "undefined" != typeof this.item ? this.item.given_url || this.item.original_url || this.item.url : ""
    },
    "loadState": function(e) {
        this.inited || this.init(), this.itemId = e.sections[1], this.item = queue.itemForItemID(this.itemId);
        var t = "/a/read/" + this.itemId;
        window.location != t && boot.pushState("Pocket", t);
        var i = $("#i" + this.itemId);
        1 == i.size() && ($("#pagenav_mark").toggleClass("archived selected", "1" == i.attr("status")), "1" == i.attr("status") ? $("#pagenav_mark a").attr("title", Templating.callTrans("cta.addtolist")).text(Templating.callTrans("cta.addtolist")) : $("#pagenav_mark a").attr("title", Templating.callTrans("cta.archive")).text(Templating.callTrans("cta.archive")), $("#pagenav_favorite").toggleClass("selected", "1" == i.attr("favorite"))), this.stateChanged()
    },
    "stateChanged": function() {
        this.addScrollEventHandler(), $(".reading_progress_bar").css("width", "0"), this.headerBottom = null, $(".toolbar_reader").removeClass("toolbar_reader_showextras"), $(".toolbar_reader_title").text(""), this.toolbarShowingExtras = !1, this.loadItem(), boot.showPage(this)
    },
    "willHide": function() {
        this.saveScroll(!0), this.showStyleMenu(!1), 2 == this.item.has_video ? this.content.find("iframe").remove() : this.content.find(".RIL_VIDEO").remove(), this.item = void 0, this.itemId = void 0, this.removeScrollEventHandler()
    },
    "didHide": function() {
        this.navigationItem.find(".leftItem li").removeClass("selected"), this.isOpen = !1
    },
    "didShow": function() {
        this.isOpen = !0, scrollToTop()
    },
    "loadItem": function() {
        this.page.addClass("loading"), this.loading = !0, this.loadLayout(), 2 == this.item.has_video ? this.loadVideoItem() : 2 == this.item.has_image ? this.loadImageItem() : this.loadArticleItem()
    },
    "loadArticle": function() {
        return "undefined" == typeof this.item || "undefined" == typeof this.item.status ? void this.loadArticleItemByUrl(this.currentLoadedURL()) : void this.loadArticleItem()
    },
    "loadArticleItem": function() {
        this.item && (this.noarticlewarning = 0 == this.item.is_article && 2 != this.item.has_image && 2 != this.item.has_video, this.data.getArticle({
            "data": {
                "itemId": this.itemId
            },
            "delegate": this,
            "doneSelector": "articleLoaded"
        }))
    },
    "loadArticleItemByUrl": function(e) {
        this.data.getArticle({
            "data": {
                "url": e
            },
            "delegate": this,
            "doneSelector": "articleLoadedUrl"
        })
    },
    "articleLoadedUrl": function(e, t) {
        this.item = e.item, this.itemId = e.item.item_id, this.item.time_added = e.timePublished, $("body").scrollTop(0), this.articleLoaded(e, t)
    },
    "articleLoaded": function(e, t) {
        var i = this;
        if ("-1" == status || !e || !e.status) return boot.showErrorNotification(Templating.callTrans("notification.itemnotfound")), void setTimeout(function() {
            boot.loadStateFromUrl("/a/")
        }, 3e3);
        var n = e.article,
            a = this.item = e.item;
        "undefined" != typeof n.lang && n.lang && "undefined" != typeof boot.ExternalUserSettings.fontbundle && "standard" == boot.ExternalUserSettings.fontbundle && "en" != n.lang && "eng" != n.lang && "fr" != n.lang && "fra" != n.lang && "de" != n.lang && "deu" != n.lang && "es" != n.lang && "spa" != n.lang && "pt" != n.lang && "por" != n.lang && "it" != n.lang && "ita" != n.lang && (boot.ExternalUserSettings.fontbundle = "full", boot.saveExternalUserSettings(), boot.expandToFullFontBundle()), a.title = n.title, a.resolved_url = n.resolvedUrl, a.item_id = this.itemId, a.tags = e.tags;
        var s = parseUri(a.resolved_url),
            o = s.host,
            r = n.datePublished ? n.datePublished.split(/[- :]/) : !1,
            l = r[0] && "0000" != r[0] ? new Date(r[0], r[1] - 1, r[2], r[3], r[4], r[5]) : !1,
            c = l ? moment(l).lang(ServerSettings.language).format("MMMM Do, YYYY") : "";
        if (n.isVideo) return "object" == typeof n.videos && (a.videos = n.videos), a.time_published_formatted = c, a.resolved_title = a.title, a.authors = n.authors, $("#pagenav_mark").toggleClass("archived selected", 1 == a.status), 1 == a.status ? $("#pagenav_mark a").attr("title", Templating.callTrans("cta.addtolist")).text(Templating.callTrans("cta.addtolist")) : $("#pagenav_mark a").attr("title", Templating.callTrans("cta.archive")).text(Templating.callTrans("cta.archive")), $("#pagenav_favorite").toggleClass("selected", 1 == a.favorite), void this.loadVideoItem();
        var u = this.replaceVideos(n.article, n.videos);
        if (this.fillLayout(a.title, o, n.authors, c, a.given_url, a.tags, u), this.noarticlewarning) {
            var d = Handlebars.templates.reader_noarticlewarning(dictJSON);
            d = d.replace(/\*(.*)\*(.*)\n(.*)\*(.*)\*/, '<a class="fullwebswitch" href="#">$1</a>$2\n$3<a href="' + sanitizeText(a.given_url) + '" target="_blank">$4</a>'), $(".text_body").prepend(d);
            var i = this
        }
        if ($("#pagenav_mark").toggleClass("archived selected", 1 == a.status), 1 == a.status ? $("#pagenav_mark a").attr("title", Templating.callTrans("cta.addtolist")).text(Templating.callTrans("cta.addtolist")) : $("#pagenav_mark a").attr("title", Templating.callTrans("cta.archive")).text(Templating.callTrans("cta.archive")), $("#pagenav_favorite").toggleClass("selected", 1 == a.favorite), this.loadImages(n.images), a.nodeIndex) {
            var h = a.nodeIndex;
            setTimeout(function() {
                reader.ignoreScroll = !0, i.scrollToNodeIndex(h), setTimeout(function() {
                    reader.ignoreScroll = !1
                }, 250)
            }, 100)
        }
        this.page.removeClass("content-article content-video content-image").addClass("content-article"), this.page.removeClass("loading"), this.loading = !1, $(window).width() >= this.BREAK_ITEM_SHOWTOOLBARTITLE && (this.headerBottom = $(".reader_head h1").offset().top + $(".reader_head h1").height() - $(".pkt-nav").height()), this.layout.tags.hasClass("hasTags") && queue.checkTileTagOverflow(this.layout.tags, parseInt(this.layout.tags.find(".tag_container").css("maxWidth"))), setTimeout(function() {
            reader.tryTocheckForMessageView()
        }, 750), this.hasSeenMessage = !1, this._messageWrapper = void 0, $(this.getMessageWrapper()).find("a").mousedown(function() {
            queue.data.itemAction({
                "data": {
                    "itemId": reader.itemId,
                    "action": "pmc",
                    "click_url": this.href,
                    "pkta": reader.getMessageWrapper().getAttribute("pkta")
                }
            })
        }), this.gsfInitialize(), queue.gsfCheckLogicAlt()
    },
    "loadVideoItem": function() {
        var e, t = this.item,
            i = t.resolved_title || t.given_title || t.title,
            n = parseUri(t.resolved_url),
            a = n.host;
        if ("string" == typeof t.time_published_formatted) e = t.time_published_formatted;
        else {
            var s = new Date(1e3 * t.time_added);
            e = s ? moment(s).lang(ServerSettings.language).format("MMMM Do, YYYY") : ""
        }
        var o = this.replaceVideos("<!--VIDEO_1-->", t.videos);
        this.fillLayout(i, a, t.authors, e, t.given_url, t.tags, o), this.loadVideos(t.videos), $("#pagenav_mark").toggleClass("archived selected", 1 == t.status), 1 == t.status ? $("#pagenav_mark a").attr("title", Templating.callTrans("cta.addtolist")).text(Templating.callTrans("cta.addtolist")) : $("#pagenav_mark a").attr("title", Templating.callTrans("cta.archive")).text(Templating.callTrans("cta.archive")), $("#pagenav_favorite").toggleClass("selected", 1 == t.favorite), this.page.removeClass("content-article content-video content-image").addClass("content-video"), this.page.removeClass("loading"), this.loading = !1, this.gsfInitialize()
    },
    "loadImageItem": function() {
        var e, t = this.item,
            i = t.resolved_title || t.given_title || t.title,
            n = parseUri(t.resolved_url),
            a = n.host;
        if ("string" == typeof t.time_published_formatted) e = t.time_added_formatted;
        else {
            var s = new Date(1e3 * t.time_added);
            e = s ? moment(s).lang(ServerSettings.language).format("MMMM Do, YYYY") : ""
        }
        var o = Handlebars.templates.reader_imageshell(dictJSON);
        this.fillLayout(i, a, t.authors, e, t.given_url, t.tags, o), this.loadImages(t.images), $("#pagenav_mark").toggleClass("archived selected", 1 == t.status), 1 == t.status ? $("#pagenav_mark a").attr("title", Templating.callTrans("cta.addtolist")).text(Templating.callTrans("cta.addtolist")) : $("#pagenav_mark a").attr("title", Templating.callTrans("cta.archive")).text(Templating.callTrans("cta.archive")), $("#pagenav_favorite").toggleClass("selected", 1 == t.favorite), this.page.removeClass("content-article content-video content-image").addClass("content-image"), this.page.removeClass("loading"), this.loading = !1, this.gsfInitialize()
    },
    "loadLayout": function() {
        if (!this.layout) {
            var e = {}, t = $(Handlebars.templates.reader_headarticleshell(dictJSON));
            e.head = t.filter(".reader_head"), e.title = e.head.find("h1"), e.subline = e.head.find(".sub"), e.domain = e.subline.find(".domain"), e.authors = e.subline.find(".authors"), e.date = e.subline.children(".date"), e.original = e.subline.children(".original"), e.tags = e.subline.children(".tags"), e.article = t.filter(".text_body"), this.content.append(t), this.layout = e, this.loadStyles()
        }
    },
    "fillLayout": function(e, t, i, n, a, s, o) {
        this.offlinePageWarning && this.offlinePageWarning.hide(), this.articleview.css("display", "block"), $("#pagenav_style").removeClass("inactive"), this.layout.title.text(e ? e : Templating.callTrans("reader.untitledfrom") + " " + t), $(".toolbar_reader_title").text(this.layout.title.text()), document.title = "Pocket: " + this.layout.title.text(), this.layout.domain.children("a").attr("href", sanitizeText(urlWithPocketRedirect(a))).text(t), this.layout.domain.children(".favicon").attr("src", faviconForUrl(t));
        var i = listAuthors(i),
            r = "By ",
            l = ", ";
        i.length || (r = "", l = ""), this.layout.authors.html(r + i + l), this.layout.authors.toggle(this.layout.authors.text().length > 0), this.layout.date.html(n), this.layout.date.toggleClass("date_empty", 0 == this.layout.date.text().length), this.layout.original.children("a").attr("href", sanitizeText(urlWithPocketRedirect(a))), s ? (Array.isArray(s) ? this.layout.tags.find(".tag_container").html(listTags(s, !0, !0)).on("click", ".tag", function(e) {
            $.trim(queue.searchField.val()).length && queue.searchField.val("")
        }) : this.layout.tags.find(".tag_container").html(listTags(s, !1, !0)), this.layout.tags.addClass("hasTags")) : this.layout.tags.removeClass("hasTags"), this.layout.article.html(o);
        this.layout.article.find("a").click(function(e) {
            !$(this).attr("target") && $(this).attr("href") && (e.preventDefault(), window.open($(this).attr("href")))
        })
    },
    "loadImages": function(e) {
        if (e) {
            var t = this;
            $.each(e, function(e, i) {
                t.loadImage(i.image_id, i.src, i.caption, i.credit, window.devicePixelRatio || 1)
            })
        }
    },
    "loadImage": function(e, t, i, n, a) {
        a = 1 * a;
        var s = $("#RIL_IMG_" + e);
        s.html("<caption>" + i + " <cite>" + (n ? Templating.callTrans("reader.photoby") + ": " : "") + n + "</cite></caption>");
        var o = s;
        if (i && (i.length || n.length)) {
            s.addClass("hasCaption");
            var r = s.parent("a");
            1 == r.size() && (s.prepend('<a href="' + r.attr("href") + '"></a>'), s.parent("a").replaceWith(s), o = s.children("a"))
        }
        var l = new Image;
        l.onload = function() {
            var e = $(this),
                t = e.parents(".RIL_IMG");
            if (i) {
                var n = reader.content.width();
                this.width > n ? t.css("maxWidth", n - 2 + "px") : t.css("maxWidth", (this.width > 175 ? this.width : 175) + "px"), reader.ie9OrLower && t.find("caption").css("maxWidth", (this.width > 175 ? this.width : 175) - 20 + "px")
            }
            t.addClass("loaded")
        }, l.src = getImageCacheUrl(t, "w" + Math.floor(parseInt(this.articleview.children(".reader_content").css("maxWidth")) * a)), o.prepend($(l))
    },
    "replaceVideos": function(e, t) {
        return t ? ($.each(t, function(t, i) {
            var n = "<!--VIDEO_" + i.video_id + "-->",
                a = new RegExp(n, "gi"),
                s = '<div id="RIL_VIDEO_' + i.video_id + '" class="RIL_VIDEO"></div>';
            e = e.replace(a, s)
        }), e) : e
    },
    "loadVideos": function(e) {
        if (e) {
            var t = this;
            $.each(e, function(e, i) {
                t.loadVideo(i.video_id, i.src, i.height, i.width, i.type, i.vid)
            })
        }
    },
    "loadVideo": function(e, t, i, n, a, s) {
        if (0 == n || "0" == n) {
            var o = parseInt(reader.content.css("maxWidth"));
            n = Math.min(o, $(window).width() - parseInt(reader.content.css("paddingLeft")) - parseInt(reader.content.css("paddingRight")))
        }(0 == i || "0" == i) && (i = Math.floor(.609375 * n));
        var r = sanitizeText(t);
        "1" == a ? r = "https://www.youtube.com/embed/" + s : ("2" == a || "3" == a || "4" == a) && (r = "https://player.vimeo.com/video/" + s + "?title=0&amp;byline=0&amp;portrait=0");
        var l = $("#RIL_VIDEO_" + e),
            c = this.articleview.children().width();
        c > 0 && n > c && (i = c / n * i, n = c);
        var u = '<iframe src="' + r + '"style="width:' + n + "px;height:" + i + 'px" allowfullscreen></iframe>';
        setTimeout(function() {
            l.append($(u))
        }, 100)
    },
    "gsfInitialize": function() {
        var e = this;
        if (boot.GSFStatus.active && "object" == typeof boot.GSFStatus.saveditems)
            if (boot.GSFStatus.active && !this.viewcheck && (this.viewcheck = setInterval(function() {
                boot.pages.queue.isOpen && !queue.loading && (clearTimeout(e.viewcheck), e.viewcheck = null, $(".tooltip-reader").is(":visible") && "object" == typeof openPopover && openPopover.hideOpenPopover(), queue.inited && queue.gsfCheckLogic())
            }, 1e3)), boot.GSFStatus.active && !boot.GSFStatus.articleviewconfirm) {
                var t = createTooltip($(".pkt-nav"), Templating.callTrans("gsf.thisisarticleview"), Templating.callTrans("gsf.pocketdisplaysoptimized") + "|" + Templating.callTrans("gsf.toseeoriginal"), ["bottom"], 3, !0, function() {
                    boot.GSFStatus.articleviewconfirm = !0, boot.saveGSFStatus(), reader.gsfInitialize(), PocketAnalytics.action("gsf_tooltip_articleview_ok", "click", "webapp")
                });
                t.object.addClass("tooltip-reader"), PocketAnalytics.action("gsf_tooltip_articleview", "view", "webapp"), boot.GSFStatus.articleview = !0, boot.saveGSFStatus()
            } else if (boot.GSFStatus.active && !boot.GSFStatus.articleviewitemactions) {
            var i = $(".active .leftItem");
            $(window).width() < 544 && (i = $(".pkt-nav")), $("#alt-tooltip").remove();
            var t = createTooltip(i, Templating.callTrans("gsf.itemactions"), Templating.callTrans("gsf.youarchivefavshare") + "|" + Templating.callTrans("gsf.readingpositionsaved"), ["bottom", "right", "bottomleft", "bottomright"], 3, !0, function() {
                boot.GSFStatus.articleviewitemactions = !0, boot.saveGSFStatus(), PocketAnalytics.action("gsf_tooltip_itemactions_ok", "click", "webapp"), $("#alt-tooltip").remove()
            });
            t.object.addClass("tooltip-reader"), PocketAnalytics.action("gsf_tooltip_itemactions", "view", "webapp")
        }
    },
    "confirmDelete": function(e) {
        var t = this;
        createDialog({
            "anchor": $("#pagenav_delete"),
            "title": Templating.callTrans("confirm.areyousure"),
            "message": !1,
            "confirm": {
                "title": Templating.callTrans("cta.delete"),
                "action": function() {
                    t.actionToggle("delete")
                }
            }
        })
    },
    "addURLToPocket": function() {
        var e = $("#pagenav_add");
        if (!e.hasClass("selected")) {
            e.addClass("selected");
            var t = this.item.resolved_url || this.item.given_url;
            queue.addURL(t)
        }
    },
    "editItemTags": function() {
        var e = [];
        this.item.tags && (e = Array.isArray(this.item.tags) ? this.item.tags : Object.keys(this.item.tags)), queue.showBulkTagsDialog(!1, !0, e, queue.premiumMode ? [] : null, this.item)
    },
    "actionToggle": function(e) {
        var t = this,
            i = $("#pagenav_" + e);
        if ("mark" == e) {
            if (t.markActionActive) return;
            t.markActionActive = !0
        }
        i.toggleClass("selected");
        var n = i.hasClass("selected"),
            a = {
                "action": e,
                "on": n,
                "itemId": this.itemId
            }, s = 333;
        setTimeout(function() {
            queue.takeActionOnItem(a.action, a.on, a.itemId, s + 100, !0)
        }, s), ("mark" == e || "delete" == e) && (s += 333, setTimeout(function() {
            t.goBackToQueue(), "mark" == e && (t.markActionActive = !1, a.on ? (sharedToast.show(Templating.callTrans("notification.itemarchived")), boot.GSFStatus.active && getSetting("sawarchivetooltip", function(e) {
                "string" != typeof e.sawarchivetooltip && queue.gsfCheckArchiveTooltip(4e3)
            })) : sharedToast.show(Templating.callTrans("notification.addedtolist"))), "delete" == e && sharedToast.show(Templating.callTrans("notification.itemdeleted")), queue.highlightItemCheckDeletedMarked()
        }, s))
    },
    "showShareMenu": function(e) {
        var t = this;
        if (e) {
            e = $(e);
            var i = e.parents(".item");
            if (this.shareAnchor = e, this.shareMenu) {
                if ("object" == typeof this.shareMenu.object) {
                    var n = this.shareMenu.object.find(".share-permanent").parent("li");
                    if (n.length) {
                        var a = Sharer.sharers[n.attr("val")];
                        a && a.setPermanentLink("http://" + (document.location.hostname || document.location.host) + "/library/?pl_i=" + t.item.item_id, n)
                    }
                    var s = this.shareMenu.object.find(".share-original").parent("li");
                    if (s.length) {
                        var a = Sharer.sharers[s.attr("val")];
                        a && a.setExternalLink(t.currentLoadedURL(), s)
                    }
                }
            } else {
                for (var o = [], r = 0; r < Sharer.sharers.length; r++) {
                    var a = Sharer.sharers[r];
                    o.push(dsi(r, a.name))
                }
                var l = new DropSelector({
                    "id": "shareMenuContents",
                    "class": "titleItem shareMenuSelector",
                    "nodeName": "h2",
                    "append": $("#container"),
                    "list": o,
                    "selectCallback": function(e, i) {
                        if ($("#pagenav_share").hasClass("inactive")) return !1;
                        var n = $(i).attr("val"),
                            a = Sharer.sharers[n];
                        return a ? (t.shareMenu.show(!1), "undefined" != typeof t.item && a.share(t.item, t.shareAnchor), !0) : !1
                    },
                    "callback": function() {},
                    "hideUntilSet": !0
                });
                this.shareMenu = new PopOver("shareMenu", l.ul, $("#container"), {
                    "onHide": function() {
                        $(".pendingDialog").removeClass("pendingDialog")
                    },
                    "positions": ["bottomleft", "bottomright", "topleft", "topright"],
                    "xOffset": 8,
                    "disableHideOnScroll": !0,
                    "inToolbar": !0,
                    "headerTitle": "Share",
                    "fixedPosition": !0
                });
                for (var c = this.shareMenu.object.find("li"), r = 0; r < c.length; r++) {
                    var u = $(c[r]),
                        d = u.find("a"),
                        h = Sharer.sharers[parseInt(u.attr("val"), 10)],
                        p = h.iconname;
                    d.addClass("share-" + p).append('<span class="share-icon share-' + p + '-icon">')
                }
                l.object.remove(), this.shareMenu.object.addClass("titleSelector");
                var n = $(l.ul).find(".share-permanent").parent("li");
                if (n.length) {
                    var a = Sharer.sharers[n.attr("val")];
                    a && a.setPermanentLink("http://" + (document.location.hostname || document.location.host) + "/library/?pl_i=" + t.item.item_id, n)
                }
                var s = $(l.ul).find(".share-original").parent("li");
                if (s.length) {
                    var a = Sharer.sharers[s.attr("val")];
                    a && a.setExternalLink(t.currentLoadedURL(), s)
                }
            }
            $("#pagenav_share").hasClass("inactive") ? this.shareMenu.object.addClass("inactive") : this.shareMenu.object.removeClass("inactive")
        }
        i.toggleClass("pendingDialog", void 0 !== e), this.shareMenu.show(e)
    },
    "showStyleMenu": function(e) {
        var t = this;
        if (e) {
            e = $(e); {
                e.parents(".item")
            }
            this.shareAnchor = e, this.styleMenu || (this.styleMenu = new PopOver("styleMenu", this.styleMenuContent, $("#container"), {
                "positions": ["bottomleft", "bottomright", "topleft", "topright"],
                "hideOnClickInPopover": !1,
                "xOffset": 5,
                "disableHideOnScroll": !0,
                "inToolbar": !0,
                "headerTitle": Templating.callTrans("reader.textoptions"),
                "fixedPosition": !0
            })), e.parents(".inactive").length ? this.styleMenuContent.addClass("inactive") : this.styleMenuContent.removeClass("inactive"), this.styleMenu.show(e), this.styleMenu.object.find(".popover-new-close").click(function(e) {
                e.preventDefault(), t.styleMenu.hideAll()
            })
        }
    },
    "showMoreActionsMenu": function(e) {
        e = $(e);
        var t = (e.parents(".item"), $(Handlebars.templates.reader_moreactions(dictJSON)));
        this.shareAnchor = e, this.moreActionsMenu || (this.moreActionsMenu = new PopOver("moreActionsMenu", t, $("#container"), {
            "positions": ["bottomleft", "bottomright", "topleft", "topright", "bottom"],
            "xOffset": 0,
            "inToolbar": !0,
            "disableHideOnScroll": !0,
            "headerTitle": "More Actions"
        }), this.moreActionsMenu.object.find(".moreactions_edittags").click(function(e) {
            e.preventDefault(), $("#pagenav_tag a").trigger("click")
        }), this.moreActionsMenu.object.find(".moreactions_textoptions").click(function(e) {
            e.preventDefault(), $("#pagenav_style a").trigger("click")
        }), this.moreActionsMenu.object.find(".moreactions_delete").click(function(e) {
            e.preventDefault(), $("#pagenav_delete a").trigger("click")
        })), this.moreActionsMenu.show(e), PocketAnalytics.action("show_moreactions", "interact", "webapp")
    },
    "loadStyles": function() {
        var e = this,
            t = boot.ExternalUserSettings.styles;
        t || (t = {
            "font": "serif",
            "fontSize": "3",
            "skin": "light"
        }), "night" == t.skin && (t.skin = "dark"), e.setFont(t.font, !0), e.setFontSize(t.fontSize, !0), e.setSkin(t.skin, !0)
    },
    "saveStyles": function(e) {
        if (!e) {
            var t;
            if ("undefined" == typeof this.page) {
                var t = boot.ExternalUserSettings.styles;
                t || (t = {
                    "font": "serif",
                    "fontSize": "3",
                    "skin": "light"
                }), "night" == t.skin && (t.skin = "dark"), t.skin = boot.skin
            } else t = {
                "font": this.page.data("font"),
                "fontSize": this.page.data("fontSize"),
                "skin": boot.skin
            };
            boot.ExternalUserSettings.styles = t, boot.saveExternalUserSettings(), "undefined" != typeof this.page && this.page.toggleClass("toggleStyles")
        }
    },
    "toggleFont": function() {
        this.setFont("serif" == this.page.data("font") ? "sans" : "serif")
    },
    "setFont": function(e, t) {
        this.page.data("font", e), this.page.removeClass("font-serif font-sans").addClass("font-" + e);
        var i = this.page.attr("class").match(/fontserifsize-\d+/);
        "object" == typeof i && i && this.page.removeClass(i[0]), "serif" == e && "undefined" != typeof this.page.data("fontSize") && this.page.addClass("fontserifsize-" + this.page.data("fontSize")), this.styleMenuContent.find(".textoptions_font a").removeClass("selected"), "serif" == e ? this.styleMenuContent.find("#submenu_font_serif").children("a").addClass("selected") : this.styleMenuContent.find("#submenu_font_sans").children("a").addClass("selected"), this.saveStyles(t)
    },
    "fontInc": function(e) {
        this.setFontSize(1 * this.page.data("fontSize") + e)
    },
    "setFontSize": function(e, t) {
        if (isNaN(e) && (e = 1), !(0 > e || e > 9)) {
            this.styleMenuContent.find("#submenu_font_down").toggleClass("inactive", 0 === e), this.styleMenuContent.find("#submenu_font_up").toggleClass("inactive", 9 == e), this.styleMenuContent.find("#submenu_font_down").children("a").toggleClass("inactive", 0 === e), this.styleMenuContent.find("#submenu_font_up").children("a").toggleClass("inactive", 9 == e), this.page.data("fontSize", e), this.page.removeClass("fontsize-0 fontsize-1 fontsize-2 fontsize-3 fontsize-4 fontsize-5 fontsize-6 fontsize-7 fontsize-8 fontsize-9").addClass("fontsize-" + e);
            var i = this.page.attr("class").match(/fontserifsize-\d+/);
            "object" == typeof i && i && this.page.removeClass(i[0]), /font-serif/.test(this.page.attr("class")) && this.page.addClass("fontserifsize-" + e), this.saveStyles(t)
        }
    },
    "toggleSkin": function() {
        var e = "light",
            t = boot.skin;
        "night" == t && (e = "sepia"), "light" == t && (e = "night"), "sepia" == t && (e = "light"), this.setSkin(e)
    },
    "setSkin": function(e, t) {
        boot.skin = e, $(".page-reader").length ? $("body").removeClass("page-skinlight page-skindark page-skinsepia page-skinfullscreen page-readerlight page-readerdark page-readersepia page-readerfullscreen").addClass("page-reader" + e + " page-skin" + e) : $("body").removeClass("page-skinlight page-skindark page-skinsepia page-skinfullscreen page-queuelight page-queuedark page-queuesepia page-queuefullscreen").addClass("page-queue" + e + " page-skin" + e), this.styleMenuContent && (this.styleMenuContent.find(".textoptions_theme a").removeClass("selected"), this.styleMenuContent.find("#submenu_theme_" + e).children("a").addClass("selected")), this.saveStyles(t)
    },
    "toggleFullScreenMode": function() {
        var e = $("body");
        if (e.toggleClass("page-readerfullscreen"), e.hasClass("page-readerfullscreen")) {
            if (PocketAnalytics.action("distractionfree_mode", "interact", "webapp"), !boot.ExternalUserSettings.runfullscreenmode) {
                var t = createTooltip($(".pkt-nav"), Templating.callTrans("gsf.fullscreenmode"), Templating.callTrans("gsf.thismodehidestoolbar") + "|" + Templating.callTrans("gsf.leavefullscreenmode") + "|" + Templating.callTrans("gsf.activatefullscreenmodeagain"), ["left"], 3, !0, function() {
                    boot.ExternalUserSettings.runfullscreenmode = !0, boot.saveExternalUserSettings()
                });
                t.object.addClass("tooltip-reader").css("top", "150px")
            }
            e.on("mouseover.fullscreenmode", function(t) {
                t.clientY < 100 && (e.removeClass("page-readerfullscreen"), e.off("mouseover.fullscreenmode"))
            })
        } else e.off("mouseover.fullscreenmode")
    },
    "addScrollEventHandler": function() {
        $(window).bind("scroll", this.scrollEventHandler), this.navHeight = $(".pkt-nav").outerHeight() + $("#PKT_header").outerHeight(), this.windowHeight = $(window).height()
    },
    "removeScrollEventHandler": function() {
        $(window).unbind("scroll", this.scrollEventHandler)
    },
    "scrollEventHandler": function() {
        clearTimeout(reader.scrollTO), reader.scrollTO = setTimeout(function() {
            reader.scrolled()
        }, 150), reader.scrollNavChange()
    },
    "scrollNavChange": function() {
        var e = $("html").scrollTop() + $("body").scrollTop(),
            t = $(document).height();
        Math.abs(this.lastScrollTop - e) <= this.scrollDelta || !boot.pages.reader.isOpen || OverlayScreen.showing || this.loading || (this.headerBottom && (e > this.headerBottom && !this.toolbarShowingExtras ? ($(".toolbar_reader").addClass("toolbar_reader_showextras"), this.toolbarShowingExtras = !0, PocketAnalytics.action("show_readernavextras", "interact", "webapp")) : e <= this.headerBottom && this.toolbarShowingExtras && ($(".toolbar_reader").removeClass("toolbar_reader_showextras"), this.toolbarShowingExtras = !1)), $(".reading_progress_bar").css("width", (e + this.windowHeight) / t * 100 + "%"), this.lastScrollTop = e)
    },
    "scrolled": function(e) {
        if (!this.ignoreScroll) {
            this.saveScroll(), this.tryTocheckForMessageView()
        }
    },
    "tryTocheckForMessageView": function() {
        this.hasSeenMessage || (this.checkMessageViewTO && clearTimeout(this.checkMessageViewTO), this.checkMessageViewTO = setTimeout(function() {
            this.checkForMessageView()
        }.bind(this), 33))
    },
    "checkForMessageView": function() {
        if (!this.hasSeenMessage) {
            var e = this.getMessageWrapper();
            e && elementInViewport(e) && (this.hasSeenMessage = !0, queue.data.itemAction({
                "data": {
                    "itemId": reader.itemId,
                    "action": "pmv",
                    "pkta": e.getAttribute("pkta")
                }
            }))
        }
    },
    "getMessageWrapper": function() {
        if (this._messageWrapper) return this._messageWrapper;
        var e = $("#PKT_footer_message");
        return e && e.length && (this._messageWrapper = e[0]), this._messageWrapper
    },
    "saveScroll": function(e) {
        {
            var t, i, n = getSize($(window)),
                a = $(window).scrollTop();
            "screen" == this.yHitMethod ? this.topY + 20 : a
        }
        if (150 > a) a = 0, i = 0;
        else {
            var s, o;
            $("[nodeindex]").each(function(e, t) {
                var i = $(this);
                return i.offset().top > a ? (s = this, o = this, !1) : void 0
            });
            var r = s ? s.getAttribute("nodeindex") : null,
                l = o ? o.getAttribute("nodeindex") : null;
            r && 1 * r > 1 * l ? (t = s, i = r) : l && (t = o, i = l)
        } if (a == this.lastY) return void(this.pendingPosition && e && this.commitPosition());
        var c = $("#container")[0].scrollHeight,
            u = n.height,
            d = Math.ceil((parseInt(a, 10) + parseInt(u, 10)) / parseInt(c, 10) * 100);
        0 > d ? d = 0 : d > 100 && (d = 100);
        var h = document.body.scrollHeight,
            p = n.height;
        this.pendingPosition = {
            "itemId": this.itemId,
            "y": a,
            "m": h,
            "h": p,
            "i": i
        }, clearTimeout(this.scrollTO), e ? this.commitPosition() : this.scrollTO = setTimeout(function() {
            this.commitPosition()
        }.bind(this), 2e3), this.lastY = a
    },
    "commitPosition": function() {
        this.pendingPosition && (this.data.savePosition({
            "data": this.pendingPosition
        }), this.pendingPosition = void 0)
    },
    "scrollToNodeIndex": function(e) {
        $("[nodeindex]").each(function(t, i) {
            return i.getAttribute("nodeindex") == e ? (i.scrollIntoView(!0), !1) : void 0
        })
    }
};
var reader = new Reader;
boot.pages.reader = reader;
var Sharer = Class.extend({
    "share": function(e, t) {
        var i = this.messageForItem(e),
            n = this.URLForItem(e);
        this.handleShare(i, n, t, e)
    },
    "handleShare": function(e, t, i, n) {
        var a = this.URLForShare(e, t, n),
            s = "/a/x/shorten?url=" + encodeURIComponent(t) + "&redirect_url=" + encodeURIComponent(a) + "&service=" + encodeURIComponent(this.name) + "&formCheck=" + encodeURIComponent(formCheck);
        window.open(s, "_blank", "width=" + this.viewWidth + ",height=" + this.viewHeight + ",location=no,toolbar=no,status=no")
    },
    "messageForItem": function(e) {
        return e.resolved_title || e.title
    },
    "URLForItem": function(e) {
        return e.resolved_url ? e.resolved_url : e.given_url
    }
});
Sharer.sharers = [], Sharer.registerSharer = function(e) {
    Sharer.sharers.push(new e)
}, Sharer.registerSharer(Sharer.extend({
    "name": Templating.callTrans("sharing.sendtofriend"),
    "iconname": "sendtofriend",
    "handleShare": function(e, t, i, n) {
        if (i) {
            var a = this,
                s = $(i),
                o = s.parents(".item");
            this.sendToFriendPopup || (this.sendToFriendPopup = new PopOver("sendToFriend", $('<iframe frameBorder="0" scrolling="NO" src="about:blank"></iframe>'), $("#container"), {
                "onHide": function() {
                    $(".pendingDialog").removeClass("pendingDialog"), $.receiveMessage(), a.sendToFriendPopup.object.find("iframe").attr("src", "about:blank"), OverlayScreen.hide()
                },
                "onShow": function() {
                    boot.pages.reader.openedIFrame = !0, $(window).width() >= queue.BREAK_ITEM_POPUP_WIDE && (OverlayScreen.setDetail(""), OverlayScreen.show())
                },
                "headerTitle": Templating.callTrans("sharing.sendtofriend"),
                "disableHideOnScroll": !0,
                "onlyCentered": !0
            })), this.sendToFriendPopup.object.find("iframe").addClass("loading"), this.sendToFriendPopup.show(s), o.addClass("pendingDialog");
            var r = "";
            $(window).width() < queue.BREAK_ITEM_POPUP_WIDE && (r = "&window_size=narrow");
            var l = "/a/share?parent_url=" + encodeURIComponent(window.location.href) + "&item_id=" + n.item_id + r;
            this.sendToFriendPopup.object.find("iframe").attr("src", l), $(window).width() < queue.BREAK_ITEM_POPUP_WIDE && this.sendToFriendPopup.object.find("iframe").css({
                "width": "100%"
            }), $.receiveMessage(function(e) {
                var t = JSON.parse(e.data);
                if (a.sendToFriendPopup.object.find("iframe").removeClass("loading"), t.height) {
                    var i = a.sendToFriendPopup.object.find("iframe");
                    i.css({
                        "height": t.height
                    }), a.sendToFriendPopup.show(s)
                }
                t.closed && a.sendToFriendPopup.show(!1), t.shared && sharedToast.show(Templating.callTrans("notification.sent"))
            }), "undefined" != typeof pageTracker && pageTracker && pageTracker._trackPageview("/a/event/sendToFriend/" + t), "function" == typeof ga && ga("send", "pageview", "/a/event/sendToFriend/" + t)
        } else this.sendToFriendPopup && ($.receiveMessage(), this.sendToFriendPopup.show(!1))
    },
    "shortenURL": function(e, t) {
        t(null, e)
    }
})), Sharer.registerSharer(Sharer.extend({
    "name": "Twitter",
    "iconname": "twitter",
    "viewWidth": 550,
    "viewHeight": 420,
    "messageForItem": function(e) {
        return this._super(e) + " (via @Pocket)"
    },
    "URLForShare": function(e, t) {
        return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(e) + "&url=" + encodeURIComponent(t) + "&related=pocket,pockethits,pocketsupport"
    }
})), Sharer.registerSharer(Sharer.extend({
    "name": "Facebook",
    "iconname": "facebook",
    "viewWidth": 550,
    "viewHeight": 420,
    "URLForShare": function(e, t) {
        return "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(t) + "&t=" + encodeURIComponent(e)
    }
})), Sharer.registerSharer(Sharer.extend({
    "name": "Buffer",
    "iconname": "buffer",
    "viewWidth": 880,
    "viewHeight": 550,
    "URLForShare": function(e, t) {
        return "https://bufferapp.com/add?url=" + encodeURIComponent(t) + "&text=" + encodeURIComponent(e)
    }
})), ServerSettings.PremiumStatus && Sharer.registerSharer(Sharer.extend({
    "name": Templating.callTrans("cta.viewpermanent"),
    "iconname": "permanent",
    "setPermanentLink": function(e, t) {
        if (!$("#pagenav_share").hasClass("inactive")) {
            var i = t.clone();
            t.after(i), i.children("a").attr("href", sanitizeText(e)).attr("target", "_blank"), i.click(function(e) {
                PocketAnalytics.action("open_permanent", "interact", "webapp")
            }), t.remove()
        }
    }
})), Sharer.registerSharer(Sharer.extend({
    "name": Templating.callTrans("cta.vieworiginal"),
    "iconname": "original",
    "setExternalLink": function(e, t) {
        if (!$("#pagenav_share").hasClass("inactive")) {
            var i = t.clone();
            t.after(i), i.children("a").attr("href", sanitizeText(urlWithPocketRedirect(e))).attr("target", "_blank"), i.click(function(e) {
                PocketAnalytics.action("open_original", "interact", "webapp")
            }), t.remove()
        }
    }
})), TagSidebar.UNTAGGED = "_untagged_", TagSidebar.KEY_ORIGINAL_TAG = "key_original_tag", TagSidebar.ID_CONTAINER = "tag_sidebar_content_container", TagSidebar.sID_CONTAINER = idToSelector(TagSidebar.ID_CONTAINER), TagSidebar.CLASS_PINNED = "pinned", TagSidebar.sCLASS_PINNED = idToSelector(TagSidebar.CLASS_PINNED), TagSidebar.CLASS_UNPINNED = "unpinned", TagSidebar.sCLASS_UNPINNED = idToSelector(TagSidebar.CLASS_UNPINNED), TagSidebar.ID_WRAPPER = "sidebar_wrapper", TagSidebar.sID_WRAPPER = idToSelector(TagSidebar.ID_WRAPPER), TagSidebar.ID = "tag_sidebar_content", TagSidebar.sID = idToSelector(TagSidebar.ID), TagSidebar.CLASS_SLIDER = "sidebar_slider", TagSidebar.sCLASS_SLIDER = classToSelector(TagSidebar.CLASS_SLIDER), TagSidebar.ID_LIST = "tag_sidebar_list", TagSidebar.sID_LIST = idToSelector(TagSidebar.ID_LIST), TagSidebar.ID_FILTERS = "tag_sidebar_filters", TagSidebar.sID_FILTERS = idToSelector(TagSidebar.ID_FILTERS), TagSidebar.ID_VIEW_ALL = "tag_sidebar_filter_all", TagSidebar.sID_VIEW_ALL = idToSelector(TagSidebar.ID_VIEW_ALL), TagSidebar.ID_VIEW_UNTAGGED = "tag_sidebar_filter_untagged", TagSidebar.sID_VIEW_UNTAGGED = idToSelector(TagSidebar.ID_VIEW_UNTAGGED), TagSidebar.ID_EDITTING = "inline_tag_edit", TagSidebar.sID_EDITTING = idToSelector(TagSidebar.ID_EDITTING), TagSidebar.CLASS_EDIT = "edit", TagSidebar.sCLASS_EDIT = classToSelector(TagSidebar.CLASS_EDIT), TagSidebar.CLASS_EDIT_CLOSE = "edit_close", TagSidebar.sCLASS_EDIT_CLOSE = classToSelector(TagSidebar.CLASS_EDIT_CLOSE), TagSidebar.CLASS_SELECT = "select", TagSidebar.sCLASS_SELECT = classToSelector(TagSidebar.CLASS_SELECT), TagSidebar.CLASS_DELETE = "delete", TagSidebar.sCLASS_DELETE = classToSelector(TagSidebar.CLASS_DELETE), TagSidebar.CLASS_SELECTED = "selected", TagSidebar.sCLASS_SELECTED = classToSelector(TagSidebar.CLASS_SELECTED), TagSidebar.CLASS_VISIBLE = "tag_sidebar_visible", TagSidebar.sCLASS_VISIBLE = classToSelector(TagSidebar.CLASS_VISIBLE), TagSidebar.CLASS_INVISIBLE = "tag_sidebar_invisible", TagSidebar.sCLASS_INVISIBLE = classToSelector(TagSidebar.CLASS_INVISIBLE), TagSidebar.prototype = {
    "setTag": function(e, t, i) {
        if (this.created) {
            var n = !1;
            if (e == this.selectedTag && !i) return;
            this.selectedTag = e, $(TagSidebar.sID + " " + TagSidebar.sCLASS_SELECTED).removeClass(TagSidebar.CLASS_SELECTED), e ? e == TagSidebar.UNTAGGED ? ($(TagSidebar.sID_VIEW_UNTAGGED).addClass(TagSidebar.CLASS_SELECTED), n = "Untagged") : this.rows[e] && (this.rows[e].addClass(TagSidebar.CLASS_SELECTED), n = e) : $(TagSidebar.sID_VIEW_ALL).addClass(TagSidebar.CLASS_SELECTED)
        } else this.selectedTag = e, e && (n = e == TagSidebar.UNTAGGED ? Templating.callTrans("queue.tag_untaggeditems") : e);
        this.setBreadcrumb(n), t || queue.stateChanged()
    },
    "isOpen": function() {
        return this.contentDiv && this.contentDiv.hasClass(TagSidebar.CLASS_VISIBLE)
    },
    "show": function(e, t) {
        var i = $(TagSidebar.sCLASS_SLIDER);
        i.size() || (i = this.create(t));
        var n = e ? TagSidebar.CLASS_INVISIBLE : TagSidebar.CLASS_VISIBLE,
            a = e ? TagSidebar.CLASS_VISIBLE : TagSidebar.CLASS_INVISIBLE;
        if (!i.hasClass(a)) {
            e && this.pin();
            var s = this;
            setTimeout(function() {
                i.each(function() {
                    var e = $(this);
                    t ? e.addClass("noAnimation") : e.removeClass("noAnimation"), e.removeClass(n), e.addClass(a)
                }), e ? (s.pin(), $("#page_queue").addClass("tag_sidebar_open")) : $("#page_queue").removeClass("tag_sidebar_open"), s.heightUpdated()
            }, 30)
        }
    },
    "pin": function(e, t, i) {
        if (this.resetHorizontalOffset(), !e) {
            e = this.contentDiv;
            var i = $(window).scrollTop(),
                n = $("#page_queue");
            if (!(e && i < n.height() - e.height())) return this.scrollKit.lastScrollY = i, void this.checkPinning();
            t = 0
        }
        t ? $(TagSidebar.sID_CONTAINER).hasClass(TagSidebar.CLASS_PINNED) || ($(TagSidebar.sID_CONTAINER).removeClass(TagSidebar.CLASS_UNPINNED), $(TagSidebar.sID_CONTAINER).addClass(TagSidebar.CLASS_PINNED)) : $(TagSidebar.sID_CONTAINER).hasClass(TagSidebar.CLASS_UNPINNED) || ($(TagSidebar.sID_CONTAINER).removeClass(TagSidebar.CLASS_PINNED), $(TagSidebar.sID_CONTAINER).addClass(TagSidebar.CLASS_UNPINNED)), 0 == t && 0 > i && (i = 0), e.css("top", i), this.scrollKit.pinnedDirection = t
    },
    "checkPinning": function() {
        var e = $(window).scrollTop();
        if (this.contentDiv) {
            var t = this.contentDiv.outerHeight(),
                i = $(window).height();
            if (this.contentDiv.outerHeight() < i - this.layoutInfoCache.footersHeight - this.layoutInfoCache.headersHeight) this.loadedTags ? 0 == this.scrollKit.pinnedDirection && this.pin(this.contentDiv, 1, this.layoutInfoCache.headersHeight) : 0 == this.scrollKit.pinnedDirection && this.pin(this.contentDiv, 0, 0);
            else {
                var n, a = e - this.scrollKit.lastScrollY;
                if (n = a > 0 ? 1 : 0 > a ? -1 : 0, 0 == this.scrollKit.pinnedDirection) {
                    var s = this.contentDiv.offset().top,
                        o = i - this.layoutInfoCache.footersHeight;
                    1 == n && e >= s + t - o ? this.pin(this.contentDiv, 1, o - t - this.layoutInfoCache.headersHeight) : -1 == n && e <= s - this.layoutInfoCache.headersHeight && this.pin(this.contentDiv, -1, 0)
                } else 0 != n && n != this.scrollKit.pinnedDirection && this.pin(this.contentDiv, 0, e + parseInt(this.contentDiv.css("top").replace("px", "")))
            }
        }
        this.fixHorizontalPin(), this.scrollKit.lastScrollY = e
    },
    "fixHorizontalPin": function() {
        this.isPinned() && ($(document).width() > $(window).width() ? (this.wrapper.css("left", 0 - $(window).scrollLeft() + "px"), this.isHorizontallyOffset = !0) : this.isHorizontallyOffset && this.resetHorizontalOffset())
    },
    "resetHorizontalOffset": function() {
        this.wrapper.css("left", 0 - $(window).scrollLeft() + "px"), this.isHorizontallyOffset = !1
    },
    "isPinned": function() {
        return $(TagSidebar.sID_CONTAINER).hasClass(TagSidebar.CLASS_PINNED)
    },
    "create": function(e) {
        var t = e ? TagSidebar.CLASS_VISIBLE : TagSidebar.CLASS_INVISIBLE;
        return $("#page_queue").prepend('<div id="tag_sidebar_content_container" >  <div class="sidebar_wrapper">   <div id="' + TagSidebar.ID + '" class="sidebar_content ' + TagSidebar.CLASS_SLIDER + " " + t + '">      <h3>Tags:</h3>      <div class="divider"></div>     <div class="loading"></div>   </div>  </div></div>'), queue.data.getTags({
            "delegate": this,
            "doneSelector": "getTagsCallback"
        }), this.layoutInfoCache.headersHeight = $("header").height() + $("#page nav").height(), this.layoutInfoCache.footersHeight = $("footer").height(), this.contentDiv = $(TagSidebar.sID), this.wrapper = $("#tag_sidebar_content_container .sidebar_wrapper"), this.setupListeners(), this.created = !0, $(TagSidebar.sCLASS_SLIDER)
    },
    "setupListeners": function() {
        var e = this;
        $(window).scroll(function() {
            queue.isOpen && e.checkPinning()
        }), $(document).on("click", TagSidebar.sID_VIEW_ALL, function() {
            tagSidebar.pin()
        }), $(document).on("click", TagSidebar.sID_VIEW_UNTAGGED, function() {
            tagSidebar.pin()
        })
    },
    "getTagsCallback": function(e, t) {
        this.buildTagList(e)
    },
    "buildTagList": function(e) {
        $(TagSidebar.sID + " .loading").remove(), this.tags = e;
        var t = '<ul id="' + TagSidebar.ID_FILTERS + '">  <li>    <a id="' + TagSidebar.ID_VIEW_ALL + '" title="View all items" class="' + TagSidebar.CLASS_SELECT + '" href="' + queue.tagUrlPrefix + '">view all items</a>  </li> <li>    <a id="' + TagSidebar.ID_VIEW_UNTAGGED + '" title="View all untagged items" class="' + TagSidebar.CLASS_SELECT + '" href="' + queue.tagUrlPrefix + TagSidebar.UNTAGGED + '">view untagged items</a> </li></ul><div class="divider"></div><ul id="' + TagSidebar.ID_LIST + '"></ul></div>';
        $(TagSidebar.sID).append(t);
        for (var i, n = $(TagSidebar.sID_LIST), a = 0; a < e.length; a++) i = this.getNewRow(e[a]), this.rows[e[a]] = i, n.append(i);
        this.setTag(this.selectedTag, !0, !0), this.heightUpdated()
    },
    "getNewRow": function(e) {
        var t = $("<li></li>");
        return this.setRowsTag(t, e), t
    },
    "setRowsTag": function(e, t) {
        e.data("tag", t), e.empty();
        var i = $('<a class="' + TagSidebar.CLASS_SELECT + '"></a>');
        i.attr("href", queue.tagUrlPrefix + encodeURIComponent(sanitizeText(t))), i.html(sanitizeText(t)), e.append(i)
    },
    "getRowsTag": function(e) {
        return e.data("tag")
    },
    "listUpdated": function() {},
    "refreshTagLinks": function() {
        $("#" + TagSidebar.ID_VIEW_ALL).attr("href", queue.tagUrlPrefix), $("#" + TagSidebar.ID_VIEW_UNTAGGED).attr("href", queue.tagUrlPrefix + TagSidebar.UNTAGGED), $(TagSidebar.sID_LIST + " " + TagSidebar.sCLASS_SELECT).each(function() {
            this.setAttribute("href", queue.tagUrlPrefix + encodeURIComponent(this.innerHTML))
        })
    },
    "editStart": function(e) {
        var t = this,
            i = {
                "tag": e,
                "row": $(this.rows[e]),
                "isFinishing": !1
            }, n = $(TagSidebar.sID_EDITTING);
        if (!n.size() || (this.editFinish(n.data("editingData")), n = $(TagSidebar.sID_EDITTING), !n.size())) {
            i.row.empty(), i.row.addClass("inline_edit"), i.fieldset = $('<fieldset id="' + TagSidebar.ID_EDITTING + '"></fieldset>'), i.row.append(i.fieldset), i.input = $('<input type="text" maxlength="25" />'), i.input.val(e), i.fieldset.append(i.input), i.deleteButton = $('<a class="' + TagSidebar.CLASS_DELETE + '" title="Delete">delete</a>'), i.fieldset.append(i.deleteButton), i.fieldset.append('<a class="' + TagSidebar.CLASS_EDIT_CLOSE + '" title="Edit">edit</a> <div class="clear"></div>'), i.fieldset.data("editingData", i), i.input.bind("keypress", function(e) {
                var n = e.keyCode ? e.keyCode : e.which;
                13 == n && t.editFinish(i)
            });
            var a;
            $(i.input).blur(function() {
                a = setTimeout(function() {
                    t.editFinish(i)
                }, 200)
            }), $(i.input).focus(function() {
                a && (clearTimeout(a), a = null)
            }), i.fieldset.find(TagSidebar.sCLASS_DELETE).click(function() {
                a && (clearTimeout(a), a = null), t.deleteTag(i)
            }), i.input.focus(), i.input.select()
        }
    },
    "editFinish": function(e) {
        e.isFinishing || (e.isFinishing = !0, e.newTag = $.trim(e.input.val()).toLowerCase(), this.editVerify(e))
    },
    "editVerify": function(e) {
        var t = this;
        if (e.tag == e.newTag) this.editCommit(e, !0);
        else if (e.newTag.length > 0) {
            if (e.newTag == TagSidebar.UNTAGGED) return void createDialog({
                "anchor": e.input,
                "title": "Tag not allowed",
                "message": 'The tag <span class="tag">"' + TagSidebar.UNTAGGED + '"</span> is not allowed, please choose a different one.',
                "confirm": {
                    "title": "Ok",
                    "action": function() {
                        e.isFinishing = !1, e.input.focus()
                    }
                }
            });
            for (var i = !1, n = 0; n < this.tags.length; n++)
                if (this.tags[n] == e.newTag) {
                    i = !0;
                    break
                }
            i ? createDialog({
                "anchor": e.input,
                "title": "Tag already exists",
                "message": '<span class="tag">"' + e.newTag + '"</span class="tag"> already exists, would you like to merge <span class="tag">"' + e.tag + '"</span class="tag"> into <span class="tag">"' + e.newTag + '"</span class="tag">?',
                "confirm": {
                    "title": "Yes",
                    "action": function() {
                        t.mergeTags(e)
                    }
                },
                "cancel": {
                    "action": function() {
                        t.editCommit(e, !0)
                    }
                }
            }) : this.editCommit(e)
        } else this.editCommit(e, !0)
    },
    "editCommit": function(e, t) {
        t && (e.newTag = e.tag), this.setRowsTag(e.row, e.newTag), $(e.row).removeClass("inline_edit"), t || (this.updateArrays(e.tag, e.newTag), this.renameTag(e))
    },
    "renameTag": function(e) {
        queue.data.renameTag({
            "data": {
                "oldTag": e.tag,
                "newTag": e.newTag
            }
        }), queue.tagRenamed(e.tag, e.newTag), e.tag == this.selectedTag && setTimeout(function() {
            tagSidebar.setTag(e.newTag)
        }, 100)
    },
    "deleteTag": function(e) {
        var t = this;
        createDialog({
            "anchor": e.deleteButton,
            "title": "Are you sure?",
            "message": 'This will untag the tag <span class="tag">"' + e.tag + '"</span> from any items that have been tagged with it.',
            "confirm": {
                "title": "Delete",
                "action": function() {
                    e.row.remove(), queue.data.deleteTag({
                        "data": {
                            "tag": e.tag
                        }
                    }), queue.tagDeleted(e.tag), t.selectedTag == e.tag && t.setTag(null), t.updateArrays(e.tag), t.heightUpdated()
                }
            },
            "cancel": {
                "action": function() {
                    e.isFinishing = !1, e.input.focus()
                }
            }
        })
    },
    "mergeTags": function(e) {
        e.row.remove(), this.updateArrays(e.tag), this.renameTag(e), this.heightUpdated()
    },
    "updateArrays": function(e, t) {
        if (t) {
            this.rows[t] = this.rows[e], delete this.rows[e];
            for (var i, n = !1, a = !1, s = 0; s < this.tags.length && (n || this.tags[s] != e || (this.tags.splice(s, 1), n = !0), a || (this.tags[s] > t ? (i = this.rows[this.tags[s]], this.tags.splice(s > 0 ? s - 1 : 0, 0, t), a = !0) : s == this.tags.length - 1 && (i = null, this.tags.push(t), a = !0)), !a || !n); s++);
            i ? this.rows[t].insertBefore(i) : $("#tag_sidebar_list").append(this.rows[t]), this.scrollToTag(t)
        } else {
            delete this.rows[e];
            for (var s = 0; s < this.tags.length; s++)
                if (this.tags[s] == e) {
                    this.tags.splice(s, 1);
                    break
                }
        }
    },
    "scrollToTag": function(e) {
        var t = this.rows[e],
            i = $("#page_queue"),
            n = $(window).scrollTop(),
            a = $(window).height(),
            s = $("header").height() + $("#page nav").height(),
            o = {
                "top": n + s,
                "bottom": n + a - $("footer").height()
            }, r = this.contentDiv.offset();
        r.height = this.contentDiv.height(), r.bottom = r.top + r.height;
        var e = t.offset();
        e.height = t.outerHeight(), e.bottom = e.top + e.height;
        var l = s - r.top,
            c = i.offset().top + i.height() - r.bottom,
            u = o.bottom - r.bottom,
            d = o.top - r.top;
        r.ranges = {
            "min": l > u ? l : u,
            "max": c > d ? d : c
        };
        var h, p = !0,
            f = o.top - e.top;
        if (e.top < o.top ? h = f : e.top > o.bottom ? h = o.bottom - e.top - e.height : p = !1, p) {
            var g, m = !0;
            f >= r.ranges.min && f <= r.ranges.max ? g = f : h >= r.ranges.min && h <= r.ranges.max ? g = h : m = !1;
            var v = parseInt(this.contentDiv.css("top").replace("px", ""));
            if (m) this.contentDiv.css("top", v + g + "px"), this.checkPinning();
            else {
                f = -1 * f, h = -1 * h;
                var _ = $(document).height();
                g = f + n > 0 && _ > f + n ? f : h + n > 0 && _ > h + n ? h : 0, this.pin(this.contentDiv, 0, r.top), window.scrollBy(0, g)
            }
        }
        setTimeout(function() {
            t.addClass("highlighted"), setTimeout(function() {
                t.addClass("highlight_fade"), setTimeout(function() {
                    t.removeClass("highlighted"), t.removeClass("highlight_fade")
                }, 1e3)
            }, 100)
        }, 30)
    },
    "lookForNewtags": function(e) {
        if (this.created)
            for (var t = 0; t < e.length; t++) - 1 == $.inArray(e[t], this.tags) && this.addTag(e[t])
    },
    "addTag": function(e) {
        for (var t, i = this.getNewRow(e), n = this.tags.length, a = 0; a < this.tags.length; a++)
            if (this.tags[a] > e) {
                t = this.rows[this.tags[a]], n = a - 1;
                break
            }
        this.tags.splice(n > 0 ? n : 0, 0, e), this.rows[e] = i, t ? i.insertBefore(t) : $("#tag_sidebar_list").append(i), this.heightUpdated()
    },
    "setBreadcrumb": function(e) {
        e && ($(".queue_title").html(sanitizeText(e)), $(".nav-toggledetail").text("archive" == queue.stateSelector.value ? Templating.callTrans("queue.inarchive") : "favorites" == queue.stateSelector.value ? Templating.callTrans("queue.infavorites") : Templating.callTrans("queue.inmylist")), $(".queue_toggle_listqueue").addClass("queue_toggle_active"), $(".toolbar_queue").addClass("toolbar_queue_narrowtoggle"), $(".notifications-error").addClass("notifications-error-narrowtoggle"), queue.queueList.addClass("queue_list_mode_narrowtoggle"))
    },
    "getHeight": function() {
        return this.isOpen() ? this.contentDiv.outerHeight() : void 0
    },
    "heightUpdated": function() {
        var e = $(window).height() - this.layoutInfoCache.footersHeight - this.layoutInfoCache.headersHeight,
            t = this.isOpen() ? this.contentDiv.outerHeight() : 0;
        queue.page.css("min-height", (e > t ? e : t) + "px"), this.checkPinning()
    }
};
var tagSidebar = new TagSidebar,
    QueueData = DataAdapter.extend({
        "getList": function(e) {
            this.get("get", e)
        },
        "getShares": function(e) {
            this.get("getShares", e)
        },
        "itemAction": function(e) {
            this.send("itemAction", e, !0)
        },
        "bulkEdit": function(e) {
            this.send("bulkEdit", e, !0)
        },
        "opened": function(e, t) {
            2 != t && this.send("open", {
                "data": {
                    "item_id": e,
                    "open_type": t
                }
            }, !0)
        },
        "getTags": function(e) {
            this.get("getTags", e)
        },
        "renameTag": function(e) {
            this.send("renameTag", e, !0)
        },
        "deleteTag": function(e) {
            this.send("deleteTag", e, !0)
        },
        "updateItemTags": function(e, t) {
            this.bulkEdit({
                "data": {
                    "items": [e],
                    "tagType": t.length ? "tags_replace" : "tags_clear",
                    "tags": t.join(",")
                }
            })
        },
        "getArticle": function(e) {
            this.get("getArticle", e)
        },
        "savePosition": function(e) {
            this.send("savePosition", e)
        }
    });
Queue.prototype = {
    "init": function() {
        function e(e) {
            e.preventDefault(), ($(e.target).hasClass("header-nav-toggle-close") || $(e.target).parent().hasClass("header-nav-toggle-close")) && $(".side-nav").hasClass("side-nav-help") ? Modernizr.cssanimations ? $(".side-nav").one("webkitAnimationEnd animationend msAnimiationEnd oAnimationEnd", function() {
                $(".side-nav").removeClass("side-nav-interim side-nav-help").addClass("side-nav-final")
            }).removeClass("side-nav-final").addClass("side-nav-interim") : $(".side-nav").removeClass("side-nav-help") : ($(".side-nav").hasClass("side-nav-active") ? (PocketAnalytics.action("sidenav_hide", "interact", "webapp"), Modernizr.touch && $(".side-nav").hasClass("sidenav-tagbreakout") && $(".side-nav").removeClass("sidenav-tagbreakout")) : PocketAnalytics.action("sidenav_show", "interact", "webapp"), $(".side-screen").toggleClass("side-screen-active"), $(".side-nav").toggleClass("side-nav-active"), Modernizr.csstransitions && !$(".side-nav").hasClass("side-nav-active") && $(".side-nav").one("webkitTransitionEnd transitionend msAnimiationEnd oTransitionEnd", function() {
                $(this).removeClass("side-nav-help")
            }))
        }

        function t() {
            $(".side-screen").removeClass("side-screen-active"), $(".side-nav").removeClass("side-nav-active sidenav-tagbreakout")
        }

        function i() {
            n.searchField.hasClass("page_search") || ($.trim(n.searchField.val()).length > 0 ? ($(".searchtoolbar_screen").removeClass("searchtoolbar_screen_active"), n.hideRecentSearchesList(), $(".searchnav-sortby-disabled").removeClass("searchnav-sortby-disabled"), $(".section-filter-disabled").removeClass("section-filter-disabled"), n.searchChipLength ? n.searchField.css("width", 24 * $.trim(n.searchField.val()).length + "px") : n.searchField.css("width", "100%")) : ($(".searchtoolbar_screen").addClass("searchtoolbar_screen_active"), $("#searchnav_sortby > a").addClass("searchnav-sortby-disabled"), $(".section-filter").addClass("section-filter-disabled"), n.showRecentSearchesList(), n.searchField.css("width", "100%"), $("#page_queue").removeClass("page_queue_search"), $(".side-nav").removeClass("side-nav-search")))
        }
        var n = this,
            a = Handlebars.templates.queue_navitem;
        this.navigationItem = $(a(dictJSON)), $("#page .pkt-nav").append(this.navigationItem), Modernizr.input.placeholder || "function" != typeof $.fn.placeholder || $("input").placeholder(), $(".pkt-nav").after(Handlebars.templates.queue_sidenav(dictJSON)), $(".header-nav-toggle,.side-screen,#pagenav_sidenav > .inbox_badge").click(e), $(".nav-default,.nav-secondary").on("click", "a", function(e) {
            var i = $(this);
            if (i.hasClass("nav-selected")) return void e.preventDefault();
            i.hasClass("toggle-gridlistview") || e.preventDefault();
            var a = n.stateSelector.value;
            if (i.hasClass("section-mylist") && n.stateSelector.set("queue"), i.hasClass("section-favorites") && n.stateSelector.set("favorites"), i.hasClass("section-archive") && n.stateSelector.set("archive"), i.hasClass("section-mylist") || i.hasClass("section-favorites") || i.hasClass("section-archive")) {
                var s = $(".queue_toggle_listqueue").hasClass("queue_toggle_active");
                $(".queue_toggle_listqueue").removeClass("queue_toggle_active"), $(".toolbar_queue").removeClass("toolbar_queue_narrowtoggle"), $(".notifications-error").removeClass("notifications-error-narrowtoggle"), n.queueList.removeClass("queue_list_mode_narrowtoggle"), -1 != n.contentTypeControl.value ? (n.contentTypeControl.set(-1), n.stateChanged(0 != tagSidebar.selectedtag), (a == n.stateSelector.value || s) && n.reloadList()) : n.stateChanged(0 != tagSidebar.selectedtag), n.showBulkEdit(!1)
            }
            if (i.hasClass("section-inbox") && n.showInbox($("#container")), i.hasClass("section-premium") && window.open(n.premiumMode ? "/premium_settings" : "/premium?ep=2", "_blank"), i.hasClass("section-options") && window.open("/options", "_blank"), i.hasClass("section-help") && window.open("http://help.getpocket.com/customer/portal/topics/209720-pocket-for-web/articles?src=webapp", "_blank"), i.hasClass("section-logout") && boot.logout(), i.attr("class").indexOf("filter-") > -1 && !i.hasClass("filter-tags")) {
                $(".nav-selected").removeClass("nav-selected"), i.addClass("nav-selected");
                var s = $(".queue_toggle_listqueue").hasClass("queue_toggle_active");
                n.stateSelector.set("queue");
                var o = i.attr("class").match(/filter-(\w+)/)[1],
                    r = {
                        "articles": 0,
                        "videos": 1,
                        "images": 2
                    };
                "object" == typeof n.contentTypeControl && (n.contentTypeControl.set(r[o]), tagSidebar.setTag(!1, !0), $(".queue_toggle_listqueue").addClass("queue_toggle_active"), $(".toolbar_queue").addClass("toolbar_queue_narrowtoggle"), $(".notifications-error").addClass("notifications-error-narrowtoggle"), n.queueList.addClass("queue_list_mode_narrowtoggle"), $(".expanded_toggle_filter .expanded_toggle_selected").removeClass("expanded_toggle_selected"), $(".expanded_toggle_filter .expanded_toggle_mylist").addClass("expanded_toggle_selected"), queue.page.addClass("page_queue_filter"), $(".nav-toggledetail").text(Templating.callTrans("queue.inmylist")), $(".queue_title").text(Templating.callTrans("queue.filter_" + o)), PocketAnalytics.action("switch_" + o, "interact", "webapp")), a == n.stateSelector.value || s ? (n.stateChanged(), n.reloadList()) : n.stateChanged(), n.showBulkEdit(!1)
            }
            if (i.attr("class").indexOf("section-") > -1) {
                var l = i.attr("class").match(/section-(\w+)/)[1];
                "mylist" == l && (l = "queue"), PocketAnalytics.action("switch_" + l, "interact", "webapp");

            }
            if (i.hasClass("nav-addarticle") && $("#pagenav_addarticle > a").trigger("click"), i.hasClass("filter-tags")) {
                $("#pagenav_tagfilter").trigger("click"), $("#pagenav_tagfilter").hasClass("innerpopover-active") && PocketAnalytics.action("show_tags", "interact", "webapp");
                var i = $("#pagenav_tagfilter > a");
                return i.hasClass("all") && queue.data.getTags({
                    "delegate": queue,
                    "doneSelector": "tagsReady"
                }), void($(window).width() < n.BREAK_ITEM_POPUP_WIDE && t())
            }
            i.hasClass("filter-tags") || t()
        }), this.stateSelector = {
            "value": "queue",
            "set": function(e) {
                this.value = e, queue.page.removeClass("page_queue_filter"), queue.searchStateMode || $.trim(queue.searchField.val()).length || ($(".queue_title").attr("class", "queue_title queue_title_" + e), $(".queue_title").text("queue" == e ? Templating.callTrans("queue.mainmenu_home") : Templating.callTrans("queue.mainmenu_" + e)))
            }
        };
        var a = Handlebars.templates.queue_searchitem;
        ServerSettings.PremiumStatus && (this.premiumMode = !0), ServerSettings.PremiumOnTrial && (this.premiumOnTrial = !0), dictJSON.manual.premium = this.premiumMode ? 1 : 0, this.searchItem = $(a(dictJSON)), $("#page .pkt-nav").append(this.searchItem), $("#page").append('<div class="searchtoolbar_screen"></div>'), $(".pagenav_searchicon a,.launch-search").click(function(e) {
            e.preventDefault(), n.showSearchState(!0)
        }), this.searchField = $("#page_search"), this.searchChipLength = 0, this.searchFieldEmptyState = !0, this.searchField.keyup(function(e) {
            var t = e.keyCode || e.which;
            if (27 == t) return void n.showSearchState(!1);
            if (this.searchKeyValid || 8 == t) {
                if (this.searchKeyValid = !1, 13 == t) return n.reloadTO && clearTimeout(n.reloadTO), void n.reloadList();
                n.searchRecentSearch = !1, n.reloadTO && clearTimeout(n.reloadTO), n.saveSearchTO && clearTimeout(n.saveSearchTO), n.reloadTO = setTimeout(function() {
                    if ($.trim(n.searchField.val()).length) n.searchFieldEmptyState = !1;
                    else {
                        if (n.searchFieldEmptyState) return;
                        n.searchFieldEmptyState = !0
                    }
                    n.reloadList()
                }, 400), n.saveSearchTO = setTimeout(function() {
                    n.saveSearchStateToPrevSearches()
                }, 2e4), i()
            }
        }).keypress(function(e) {
            this.searchKeyValid = !0
        }).keydown(function(e) {
            var t = e.keyCode || e.which;
            if (8 == t && !$(this).val().length && n.searchChipLength) {
                var i = $(".search-input-list .search-chip").last();
                i.hasClass("search-chip-selected") ? (i.remove(), n.searchChipLength--, n.adjustInputAreaForChips(), n.reloadList()) : i.addClass("search-chip-selected")
            }
        }).focus(function(e) {
            PocketAnalytics.actionWithExtraString("search_focus", "interact", "webapp", $(this).val())
        }).blur(function(e) {
            PocketAnalytics.actionWithExtraString("search_blur", "interact", "webapp", $(this).val())
        }).on("paste", function(e) {
            setTimeout(function() {
                i(), n.reloadList()
            }, 50)
        }).on("input", function(e) {
            i()
        }), /Trident/.test(navigator.userAgent) && (this.searchFieldPrevLength = 0), this.searchField.on("input", function(e) {
            !$.trim($(this).val()).length && this.searchFieldPrevLength > 0 && (n.searchFieldEmptyState = !0, i(), n.reloadList()), this.searchFieldPrevLength = $.trim($(this).val()).length
        }), (/iPhone/.test(navigator.userAgent) || /iPad/.test(navigator.userAgent)) && this.searchField.addClass("search_mobile_mode"), $(".pocket_logo").click(function(e) {
            e.preventDefault(), n.searchStateMode && n.showSearchState(!1), PocketAnalytics.action("logo_reset", "interact", "webapp"), $(".section-mylist").hasClass("nav-selected") ? n.reloadList() : $(".section-mylist").trigger("click")
        }), this.tagSelector = new DropSelector({
            "id": "pagenav_tagfilter",
            "class": "titleItem titleSelector",
            "nodeName": "div",
            "alignment": "centeredleft",
            "append": $(".wrapper_tag"),
            "showClass": "innerpopover-active",
            "list": [dsi("all", Templating.callTrans("queue.allitems")), dsi("untagged", Templating.callTrans("queue.tag_untaggeditems"))],
            "selectCallback": function(e, t) {
                $(t).attr("val");
                return !0
            },
            "callback": function() {},
            "hideUntilSet": !1
        }), $(window).width() < n.BREAK_ITEM_POPUP_WIDE && $("#container").append($(".wrapper_tag")), $("#pagenav_tagfilter > a").attr("title", Templating.callTrans("queue.tagfilter")).addClass("hint-item"), $("#pagenav_tagfilter").click(function(e) {
            var t = $("#pagenav_tagfilter").find(".popover-new"),
                i = $(window).width();
            i >= queue.BREAK_ITEM_SIDENAV || "border-box" == $(".side-nav").css("box-sizing") ? t.css({
                "left": "0",
                "top": t.height() * -.55 + "px"
            }) : i >= queue.BREAK_ITEM_POPUP_WIDE && t.css({
                "left": "-3em",
                "top": "10.2em"
            }), Modernizr.touch && i >= queue.BREAK_ITEM_POPUP_WIDE && $(window).height() < 416 && $(".side-nav").addClass("sidenav-tagbreakout"), i < queue.BREAK_ITEM_POPUP_WIDE && !$(".popover-tagfilter-header").length && $(".popover-new-list").before('<div class="popover-tagfilter-header"><a class="popover-tagfilter-close">Close</a><h3>Tags</h3></div>');
            var n = $("#pagenav_tagfilter").find(".popover-new-list");
            n.parent().append('<div class="tagfilter_loading"><div class="loading_display"></div></div>');
            var a = n.children("li");
            n.height() < a.height() * a.length ? n.addClass("scroll_mode") : n.removeClass("scroll_mode"), $(e.target).hasClass("all") && queue.data.getTags({
                "delegate": queue,
                "doneSelector": "tagsReady"
            })
        }), $("#pagenav_tagfilter").on("click", "a", function(e) {
            var i = n.stateSelector.value;
            n.stateSelector.set("queue"), n.contentTypeControl.set(-1), n.stateChanged(0 != tagSidebar.selectedtag), i == n.stateSelector.value && n.reloadList(), t(), setTimeout(function() {
                n.tagSelector.close()
            }, 20)
        }), Modernizr.touch || $("#pagenav_tagfilter").on("mouseover", "a", function(e) {
            if (!$(this).hasClass("editmode") && "all" != $(this).parent().attr("val") && "untagged" != $(this).parent().attr("val")) {
                if (!$(this).children(".edittag").length) {
                    var i = $(this).text();
                    $(this).text("").append('<span class="itemtext">' + sanitizeText(i) + "</span>");
                    var a = $('<span class="edittag"></span>');
                    $(this).append(a), a.click(function(e) {
                        e.preventDefault(), e.stopImmediatePropagation();
                        var a = $(this).parent("a");
                        if (!a.hasClass("editmode")) {
                            a.addClass("editmode").find(".itemtext").hide();
                            var s = $('<input class="edittaginput" type="text"></input>');
                            a.children(".edittaginput").length && a.children(".edittaginput").remove(), a.parent().append(s), s.focus(), s.val(i), a.find(".deletetag").addClass("deletetag_active"), s.blur(function(e) {
                                e.preventDefault();
                                var t = $(this).val();
                                setTimeout(function() {
                                    n.massTagChanging || n.massEditSelfClick || n.commitMassTagChange(a, i, t.toLowerCase()), n.massEditSelfClick = !1
                                }, 100)
                            }), s.keypress(function(e) {
                                13 == e.which && (e.preventDefault(), n.commitMassTagChange(a, i, $(this).val().toLowerCase()), t())
                            }), s.click(function(e) {
                                n.massEditSelfClick = !0, e.preventDefault(), e.stopImmediatePropagation()
                            })
                        }
                    })
                }
                if (!$(this).children(".deletetag").length) {
                    var s = $('<span class="deletetag"></span>');
                    $(this).append(s), s.on("mousedown", function(e) {
                        var i = $(this).parent("a");
                        if ($(this).hasClass("deletetag_active")) {
                            $(this).removeClass("deletetag_active"), e.preventDefault(), e.stopImmediatePropagation();
                            var a = i.text();
                            n.commitMassTagDelete(i, a), t()
                        }
                    })
                }
            }
        }), $("#pagenav_addarticle > a").click(function(e) {
            function t(e) {
                var t = $("#addMenu input");
                return t.val().trim().length && -1 == t.val().trim().indexOf("getpocket.com/a") ? t.siblings(".button").removeClass("button-disabled") : t.siblings(".button").addClass("button-disabled"), e && 13 == e.keyCode && (e.preventDefault(), t.siblings(".button").trigger("click")), e && 27 == e.keyCode ? (e.preventDefault(), void n.addMenu.show(!1)) : void 0
            }
            if (e.preventDefault(), PocketAnalytics.action("show_addurl", "interact", "webapp"), !n.addMenu) {
                var i = Handlebars.templates.queue_additemdialog(dictJSON).replace(/(\*)([\w|\d|\s|\.||\,|\'|\@|\wа-я]*)(\*)/i, '<a href="#" class="install_ext">$2</a>');
                n.addMenu = new PopOver("addMenu", i, $(".toolbar_queue"), {
                    "onHide": function() {
                        $("#addMenu").find("input").hide()
                    },
                    "onShow": function() {
                        $("#addMenu").find("input").show(), $(window).width() > queue.BREAK_ITEM_POPUP_WIDE && $("#addMenu").css({
                            "top": $(".pkt-nav").height() * (5 / 6) + "px",
                            "left": $("#pagenav_addarticle > a").offset().left - $("#addMenu").width() - parseInt($(".toolbar_queue").offset().left) + 24 + "px"
                        })
                    },
                    "positions": ["bottomleft", "bottom"],
                    "disableHideOnScroll": !0,
                    "hideOnClickInPopover": !1,
                    "headerTitle": Templating.callTrans("queue.saveanitemtopocket"),
                    "xOffset": 10
                }), (/iPhone/.test(navigator.userAgent) || /iPad/.test(navigator.userAgent)) && $("#addMenu .container").addClass("addurl_mobile_mode"), $("#addMenu input").keyup(t), $("#addMenu input").on("paste", function(e) {
                    setTimeout(t, 50)
                }), $("#addMenu .button").click(function(e) {
                    if (e.preventDefault(), !$(this).hasClass("button-disabled")) {
                        var t = $(this).siblings("input").val().trim(); - 1 == t.indexOf("http") && /\.\w\w/.test(t) && (t = "http://" + t), n.addURL(t), n.addMenu.show(!1), $(this).addClass("button-disabled"), $(this).siblings("input").val("")
                    }
                }), $("#addMenu .install_ext").click(function(e) {
                    e.preventDefault(), boot.ExternalUserSettings.extinstalled = !0, boot.saveExternalUserSettings(), n.addMenu.show(!1), "object" == typeof chrome && chrome.webstore ? n.gsfOpenInitOverlay(!0) : window.open("http://getpocket.com/welcome")
                }), $("#addMenu .saveurl-close").click(function(e) {
                    e.preventDefault(), n.addMenu.show(!1)
                })
            }(boot.GSFStatus.extinstalled || boot.ExternalUserSettings.extinstalled || PocketUserApps.ready && PocketUserApps.installedExtension()) && n.addMenu.object.addClass("addmenu-hideconnect"), n.addMenu.show($("#pagenav_addarticle > a")), setTimeout(function() {
                $("#addMenu input").focus()
            }, 50)
        }), $("#pagenav_inbox > a, #pagenav_inbox > .inbox_badge").click(function(e) {
            e.preventDefault(), PocketAnalytics.action("switch_inbox", "interact", "webapp"), n.showInbox($(this))
        });
        var s = "User";
        "string" == typeof PocketUserApps.firstName && $.trim(PocketUserApps.firstName).length ? s = PocketUserApps.firstName : "string" == typeof PocketUserApps.userName && $.trim(PocketUserApps.userName).length && (s = PocketUserApps.userName), $("#pagenav_options").find(".nav-username").html(s);
        var o = [dsi("premium", Templating.callTrans("queue.mainmenu_premium")), dsi("help", Templating.callTrans("queue.mainmenu_help")), dsi("options", Templating.callTrans("queue.mainmenu_options")), dsi("logout", Templating.callTrans("login.logout"))],
            r = "bottomleft",
            l = -30;
        $(window).width() > queue.BREAK_ITEM_MAXWIDTH && (r = "bottom", l = 0), this.optionsSelector = new DropSelector({
            "id": "pagenav_options_container",
            "class": "",
            "nodeName": "div",
            "alignment": r,
            "append": $("#pagenav_options"),
            "showClass": "innerpopover-active",
            "list": o,
            "selectCallback": function(e, t) {
                var i = $(t).attr("val");
                return PocketAnalytics.action("switch_" + i, "interact", "webapp"), "premium" == i ? (window.open(n.premiumMode ? "/premium_settings" : "/premium?ep=2", "_blank"), !1) : "options" == i ? (window.open("/options", "_blank"), !1) : "help" == i ? (window.open("http://help.getpocket.com/customer/portal/topics/209720-pocket-for-web/articles?src=webapp", "_blank"), !1) : "logout" == i ? (boot.logout(), !1) : !0
            },
            "hideUntilSet": !0,
            "xOffset": l,
            "onShow": function(e) {
                if (!n.optionsSelectorWidthSet) {
                    n.optionsSelectorWidthSet = !0;
                    var t = $(".nav-username").width();
                    e.xOffset = "bottomleft" == e.alignment ? -60 + t : -30 + t
                }
            }
        }), $("#pagenav_options_container").show().children("a").hover(function() {
            $("#pagenav_options .nav-username").addClass("nav-username-active"), $("#pagenav_options .nav-downnotch").addClass("nav-downnotch-active")
        }, function() {
            $("#pagenav_options .nav-username").removeClass("nav-username-active"), $("#pagenav_options .nav-downnotch").removeClass("nav-downnotch-active")
        }), $("#pagenav_options_container").children("a").click(function(e) {
            PocketAnalytics.action("show_options", "interact", "webapp")
        }), $("#pagenav_options_container .popover-new-list").find("a").append('<span class="nav-icon"></span>'), $("#pagenav_options_container .betafeedback").find("a").attr("href", "mailto:web-beta@getpocket.com"), $(".page-app-premiumtop_shield_upgrade").length && $("#pagenav_upgrade").find("a").attr("href", "/premium?e=2&s=topnavs");
        var c = Handlebars.templates.queue_bulkedit;
        this.bulkEditContainer = $(c(dictJSON)), this.navigationItem.append(this.bulkEditContainer), this.bulkEditActions = this.bulkEditContainer.find(".bulkedit-actions"), this.bulkEditActions.find(".bulkedit-archive a").click(function(e) {
            e.preventDefault(), $(this).parents(".bulkedit-actions").hasClass("bulkedit-actions-inactive") || n.commitBulkEdit("mark")
        }), this.bulkEditActions.find(".bulkedit-favorite a").click(function(e) {
            e.preventDefault(), $(this).parents(".bulkedit-actions").hasClass("bulkedit-actions-inactive") || n.commitBulkEdit("favorite")
        }), this.bulkEditActions.find(".bulkedit-delete a").click(function(e) {
            if (e.preventDefault(), !$(this).parents(".bulkedit-actions").hasClass("bulkedit-actions-inactive")) {
                var t = n.queueList.children(".item").filter(".item_bulkeditselected"),
                    i = Templating.callTrans("confirm.deleting") + " " + t.length + (1 == t.length ? " item" : " items");
                n.showConfirmDialog(i, Templating.callTrans("confirm.areyousure"), Templating.callTrans("cta.delete"), function() {
                    n.commitBulkEdit("delete")
                })
            }
        }), this.bulkEditActions.find(".bulkedit-addtag a").click(function(e) {
            if (e.preventDefault(), !$(this).parents(".bulkedit-actions").hasClass("bulkedit-actions-inactive")) {
                var t = n.queueList.children(".item").filter(".item_bulkeditselected").not(".removed");
                PocketAnalytics.action("bulk_edit_tag", "interact", "webapp"), n.showBulkTagsDialog(!0, !1, null, null, null, t.length)
            }
        }), this.bulkEditContainer.find(".bulkedit-cancel").click(function(e) {
            e.preventDefault(), $(this).parents(".bulkedit-actions").hasClass("bulkedit-actions-inactive") || (n.showBulkEdit(!1), PocketAnalytics.action("bulk_edit_close", "interact", "webapp"))
        }), this.page = $(Handlebars.templates.queue_pageshell(dictJSON)), $("#content").append(this.page), Modernizr.touch || $(".hint-item").each(function(e, t) {
            createSimpleTooltip($(t))
        }), $(".pagenav_bulkedit > a").click(function(e) {
            e.preventDefault(), $(this).parent().hasClass("pagenav_bulkeditalt") ? PocketAnalytics.action("interact_bulkediticon_top", "interact", "webapp") : PocketAnalytics.action("interact_bulkediticon_secondary", "interact", "webapp"), n.bulkEditMode ? n.showBulkEdit(!1) : (n.showBulkEdit(!0), n.updateBulkEditWording())
        });
        var u = [dsi("mylist", Templating.callTrans("queue.mainmenu_home")), dsi("favorites", Templating.callTrans("queue.mainmenu_favorites")), dsi("archive", Templating.callTrans("queue.mainmenu_archive"))];
        $(".nav-toggledetail").text(Templating.callTrans("queue.inmylist")), this.optionsSelector = new DropSelector({
            "class": "toggle_listqueue_container",
            "nodeName": "div",
            "alignment": "bottom",
            "append": $(".queue_toggle_listqueueprimary"),
            "showClass": "innerpopover-active",
            "list": u,
            "selectCallback": function(e, t) {
                var i = $(t).attr("val");
                return "archive" == i && ($(".nav-toggledetail").text(Templating.callTrans("queue.inarchive")), n.stateSelector.value = "archive", n.stateChanged(), n.reloadList()), "favorites" == i && ($(".nav-toggledetail").text(Templating.callTrans("queue.infavorites")), n.stateSelector.value = "favorites", n.stateChanged(), n.reloadList()), "mylist" == i && ($(".nav-toggledetail").text(Templating.callTrans("queue.inmylist")), n.stateSelector.value = "queue", n.stateChanged(), n.reloadList()), PocketAnalytics.action("switch_listtoggle_top_" + i, "interact", "webapp"), !1
            },
            "callback": function() {},
            "hideUntilSet": !0
        }), this.optionsSelector = new DropSelector({
            "class": "toggle_listqueue_container",
            "nodeName": "div",
            "alignment": "bottom",
            "append": $(".queue_toggle_listqueuesecondary"),
            "showClass": "innerpopover-active",
            "list": u,
            "selectCallback": function(e, t) {
                var i = $(t).attr("val");
                return $(".expanded_toggle_filter .expanded_toggle_selected").removeClass("expanded_toggle_selected"), "archive" == i && ($(".nav-toggledetail").text(Templating.callTrans("queue.inarchive")), $(".expanded_toggle_filter .expanded_toggle_archive").addClass("expanded_toggle_selected"), n.stateSelector.value = "archive", n.stateChanged(), n.reloadList()), "favorites" == i && ($(".nav-toggledetail").text(Templating.callTrans("queue.infavorites")), $(".expanded_toggle_filter .expanded_toggle_mylist").addClass("expanded_toggle_selected"), n.stateSelector.value = "favorites", n.stateChanged(), n.reloadList()), "mylist" == i && ($(".nav-toggledetail").text(Templating.callTrans("queue.inmylist")), $(".expanded_toggle_filter .expanded_toggle_mylist").addClass("expanded_toggle_selected"), n.stateSelector.value = "queue", n.stateChanged(), n.reloadList()), PocketAnalytics.action("switch_listtoggle_secondary_" + i, "interact", "webapp"), !1
            },
            "callback": function() {},
            "hideUntilSet": !0
        }), $(".toggle_listqueue_container").show(), $(".queue_toggle_listqueue").click(function(e) {
            e.preventDefault(), $(this).hasClass("queue_toggle_listqueueprimary") ? PocketAnalytics.action("show_listtoggle_top", "interact", "webapp") : PocketAnalytics.action("show_listtoggle_secondary", "interact", "webapp")
        }), $(".expanded_toggle_filter").find("a").click(function(e) {
            e.preventDefault(), $(this).hasClass("expanded_toggle_selected") || ($(".expanded_toggle_filter .expanded_toggle_selected").removeClass("expanded_toggle_selected"), $(this).addClass("expanded_toggle_selected"), $(this).hasClass("expanded_toggle_mylist") && ($(".nav-toggledetail").text(Templating.callTrans("queue.inmylist")), n.stateSelector.value = "queue", n.reloadList()), $(this).hasClass("expanded_toggle_archive") && ($(".nav-toggledetail").text(Templating.callTrans("queue.inarchive")), n.stateSelector.value = "archive", n.reloadList()))
        }), $(".expanded_toggle_search").find("a").click(function(e) {
            e.preventDefault(), $(this).hasClass("expanded_toggle_selected") || ($(".expanded_toggle_search .expanded_toggle_selected").removeClass("expanded_toggle_selected"), $(this).addClass("expanded_toggle_selected"), $(this).hasClass("expanded_toggle_mylist") && (n.searchSectionFilter = "mylist"), $(this).hasClass("expanded_toggle_archive") && (n.searchSectionFilter = "archive"), $(this).hasClass("expanded_toggle_allitems") && (n.searchSectionFilter = "allitems"), $.trim(n.searchField.val()).length && n.reloadList())
        }), this.contentTypeControl = new ToolbarSegmentControl({
            "callback": function() {},
            "items": [{
                "class": "article",
                "title": ""
            }, {
                "class": "video",
                "title": ""
            }, {
                "class": "image",
                "title": ""
            }]
        }), this.breadCrumbSpacer = new Spacer, this.queueList = $("#queue"), /Trident/.test(navigator.userAgent) && this.queueList.addClass("queue_listnofavicon");
        var d = Modernizr.localstorage && (ServerSettings.fromSignup || ServerSettings.fromLoginGsf) && !this.items.length;
        if (boot.ExternalUserSettings.hits2013notifypre || boot.GSFStatus.active || d ? boot.ExternalUserSettings.hits2013notify || boot.GSFStatus.active || d || (boot.ExternalUserSettings.hits2013notify = !0, boot.saveExternalUserSettings()) : (boot.ExternalUserSettings.hits2013notifypre = !0, boot.saveExternalUserSettings()), ServerSettings.persistentNotification) {
            $("body").addClass("page-notificationpersistent");
            var h = $(Handlebars.templates.notification_persistent(dictJSON));
            h.find(".content").html(ServerSettings.persistentNotificationMsg), $("#container").prepend(h), h.find(".close").click(function(e) {
                e.preventDefault(), $(this).parents("notifications-persistent").remove(), $("body").removeClass("page-notificationpersistent")
            })
        }
        if ("undefined" != typeof boot.GSFStatus.active && !boot.GSFStatus.active && "object" == typeof PocketUserApps && PocketUserApps.email.indexOf("temp.getpocket.com") > -1) {
            $("body").addClass("page-notificationpersistent");
            var h = $(Handlebars.templates.notification_persistent(dictJSON));
            h.find(".content").html('It looks like you\'re still using a temporary email. Please <a href="/account" target="_blank">change this in options</a> now.'), $("#container").prepend(h), h.find(".close").click(function(e) {
                e.preventDefault(), $(this).parents("notifications-persistent").remove(), $("body").removeClass("page-notificationpersistent")
            })
        }
        $(document).smartscroll(function() {
            this.scrolled()
        }.bind(this));
        var p;
        $(window).resize(function() {
            clearTimeout(p), p = setTimeout(function() {
                var e = n.tilesPerRow;
                if (n.tilesPerRow = tilesPerRow(), e != n.tilesPerRow && (e >= 2 && 1 == n.tilesPerRow && "grid" == boot.ExternalUserSettings.lastQueueView ? ($("#page_queue").removeClass("page_queue_grid").addClass("page_queue_list"), $(".pagenav_gridlist").removeClass("pagenav_gridview pagenav_listview").addClass("pagenav_listview"), n.reloadList()) : 1 == e && n.tilesPerRow >= 2 && "grid" == boot.ExternalUserSettings.lastQueueView ? ($("#page_queue").removeClass("page_queue_list").addClass("page_queue_grid"), $(".pagenav_gridlist").removeClass("pagenav_gridview pagenav_listview").addClass("pagenav_gridview"), n.reloadList()) : n.reflowTiles()), "object" == typeof n.gsftooltip && n.gsfRecenterTooltip(200), $(".gsf-tooltip").hasClass("popover-active")) {
                    currentGSFTooltip.show(currentGSFTooltip.anchor);
                    var t = currentGSFTooltip.object.attr("class").match(/popover-new-(\w+)/i);
                    t && t.length > 1 && currentGSFTooltip.object.removeClass("gsf-tooltip-bottom gsf-tooltip-bottomleft gsf-tooltip-right gsf-tooltip-top gsf-tooltip-left").addClass("gsf-tooltip-" + t[1])
                }
                IsolateScreen.showing && IsolateScreen.calcPosition()
            }, 250)
        }), this.startLazyLoadImages(), this.inited = !0
    },
    "loadState": function(e) {
        if (this.inited || this.init(), e.sections[1] && (e.sections[1] = "list" == e.sections[1] ? "list" : "grid"), this.stateSelector.set(e.page, !0), this.initialView) {
            var t = this;
            "string" == typeof boot.ExternalUserSettings.lastQueueView ? (t.setView(boot.ExternalUserSettings.lastQueueView), t.stateChanged()) : (t.setView(e.sections[1] ? e.sections[1] : t.defaultView), boot.ExternalUserSettings.lastQueueView = e.sections[1] ? e.sections[1] : t.defaultView, boot.saveExternalUserSettings()), this.initialView = !1
        } else this.setView(e.sections[1] ? e.sections[1] : this.defaultView), boot.ExternalUserSettings.lastQueueView = e.sections[1] ? e.sections[1] : this.defaultView, boot.saveExternalUserSettings(); if (e.sections[2]) tagSidebar.setTag(decodeURIComponent(desanitizeText(e.sections[2]).replace("%", "%25")), !0), PocketAnalytics.actionWithExtraString("tag_filter", "view", "webapp", decodeURIComponent(desanitizeText(e.sections[2]).replace("%", "%25")));
        else if (tagSidebar.setTag(!1), -1 !== queue.contentTypeControl.value) {
            var i = {
                "0": Templating.callTrans("queue.filter_articles"),
                "1": Templating.callTrans("queue.filter_videos"),
                "2": Templating.callTrans("queue.filter_images")
            };
            $(".queue_title").text(i[queue.contentTypeControl.value])
        }
        this.stateChanged()
    },
    "stateChanged": function(e) {
        var t = this.getCurrentLocation();
        this.state = t.state;
        var i = this.getTagUrl("___TAG___").url.replace("/___TAG___", "");
        i != this.tagUrlPrefix && (this.tagUrlPrefix = i), this.baseTagUrlPrefix = "/a/queue/grid/", "grid" != this.selectedView && (this.baseTagUrlPrefix = "/a/queue/list/"), e && (t.url = this.tagUrlPrefix, this.state.tag = !1, tagSidebar.selectedTag = !1), $(".pagenav_gridview a").attr("href", this.getInfoForState({
            "section": this.stateSelector.value,
            "view": "list",
            "tag": this.state.tag
        }).url).attr("title", Templating.callTrans("queue.switchtolistview")).off("click").one("click", function(e) {
            e.preventDefault(), $(this).parent().hasClass("pagenav_gridlistalt") ? PocketAnalytics.action("toggle_view_list_top", "interact", "webapp") : PocketAnalytics.action("toggle_view_list", "interact", "webapp")
        }), $(".pagenav_listview a").attr("href", this.getInfoForState({
            "section": this.stateSelector.value,
            "view": "grid",
            "tag": this.state.tag
        }).url).attr("title", Templating.callTrans("queue.switchtotileview")).off("click").one("click", function(e) {
            e.preventDefault(), $(this).parent().hasClass("pagenav_gridlistalt") ? PocketAnalytics.action("toggle_view_tile_top", "interact", "webapp") : PocketAnalytics.action("toggle_view_tile", "interact", "webapp")
        }), $("#nav_" + this.nav + " a").attr("href", t.url), $(".side-nav").find(".nav-selected").removeClass("nav-selected"), this.state.tag || "queue" != this.state.section && "favorites" != this.state.section && "archive" != this.state.section || ("queue" == this.state.section ? -1 !== this.contentTypeControl.value ? $(".filter-" + this.contentTypeControl.key() + "s").addClass("nav-selected") : $(".section-mylist").addClass("nav-selected") : -1 !== this.contentTypeControl.value ? $(".filter-" + this.contentTypeControl.key() + "s").addClass("nav-selected") : $(".section-" + this.state.section).addClass("nav-selected")), window.location != t.url && (t.title != document.title && (document.title = t.title), boot.pushState(t.title, t.url)), this.lastUrl != t.url && this.reloadList(), this.lastUrl = t.url, boot.showPage(this)
    },
    "getCurrentLocation": function() {
        return this.getInfoForState({
            "tag": tagSidebar.selectedTag,
            "view": this.selectedView,
            "section": this.stateSelector.value
        })
    },
    "getTagUrl": function(e) {
        return this.getInfoForState({
            "tag": e,
            "view": this.selectedView,
            "section": this.stateSelector.value
        })
    },
    "getInfoForState": function(e) {
        var t = "",
            i = "",
            n = ": ",
            a = e.section.toLowerCase();
        return e.tag && (t = encodeURIComponent(e.tag) + "/" + t, i = n + e.tag), e.view && (t.length || e.view != this.defaultView) && (t = e.view + "/" + t), i = n + Templating.callTrans("queue.section_" + e.section.toLowerCase()) + i, (t.length || a != this.defaultSection) && (t = a + "/" + t), t = "/a/" + t, i = "Pocket" + i, {
            "url": t,
            "title": i,
            "state": e
        }
    },
    "setQueueNameAndToggle": function() {
        if ($(".queue_title").attr("class", "queue_title queue_title_" + this.stateSelector.value), $(".nav-default .nav-selected").removeClass("nav-selected"), this.searchStateMode && $.trim(this.searchField.val()).length) $(".queue_title").html(Templating.callTrans("queue.searching"));
        else if (tagSidebar.selectedTag) $(".queue_title").html(sanitizeText(tagSidebar.selectedTag));
        else if (-1 == this.contentTypeControl.value) "queue" == this.stateSelector.value ? ($(".queue_title").text(Templating.callTrans("queue.mainmenu_home")), $(".nav-default .section-mylist").addClass("nav-selected")) : ("archive" == this.stateSelector.value ? $(".nav-default .section-archive").addClass("nav-selected") : "favorites" == this.stateSelector.value && $(".nav-default .section-favorites").addClass("nav-selected"), $(".queue_title").text(Templating.callTrans("queue.mainmenu_" + this.stateSelector.value))), $(".queue_toggle_listqueue").removeClass("queue_toggle_active");
        else {
            var e = ["articles", "videos", "images"];
            $(".queue_title").text(Templating.callTrans("queue.filter_" + e[this.contentTypeControl.value])), $(".queue_toggle_listqueue").addClass("queue_toggle_active"), $(".nav-default .filter-" + e[this.contentTypeControl.value]).addClass("nav-selected")
        }
        "archive" == this.stateSelector.value ? $(".nav-toggledetail").text(Templating.callTrans("queue.inarchive")) : "favorites" == this.stateSelector.value ? $(".nav-toggledetail").text(Templating.callTrans("queue.infavorites")) : "mylist" == this.stateSelector.value && $(".nav-toggledetail").text(Templating.callTrans("queue.inmylist")), tagSidebar.selectedTag ? $(".pagenav_contenttype").hide() : $(".pagenav_contenttype").show()
    },
    "willHide": function() {
        this.lastScrollTop = $(window).scrollTop()
    },
    "didHide": function() {
        this.showBulkEdit(!1), this.isOpen = !1
    },
    "didShow": function() {
        var e = this;
        "undefined" != typeof this.lastScrollTop && $(window).scrollTop(e.lastScrollTop), this.isOpen = !0
    },
    "itemForItemID": function(e) {
        var t = this.itemsByID[e];
        return t ? t : {}
    },
    "reloadList": function(e) {
        if (e || (e = {}), !e.append || !this.loading) {
            this.loading = !0, this.reloadTO && clearTimeout(this.reloadTO), e.append ? (this.loadingRow || (this.loadingRow = $('<li class="loading loadingRow">&nbsp;</li>')), this.queueList.append(this.loadingRow), this.loadingRow.show(), this.loadMoreRow.hide()) : (this.setQueueNameAndToggle(), this.location = 0, this.offset = 0, (!this.searchStateMode || this.searchStateFirstSearch) && (this.queueList.parent().addClass("loading"), this.searchStateFirstSearch && $(".side-nav").addClass("side-nav-search"), this.searchStateFirstSearch = !1), scrollToTop());
            var t = this.stateSelector.value,
                i = null;
            "favorites" == t && (t = null, i = 1);
            var n = this,
                a = tagSidebar.selectedTag ? tagSidebar.selectedTag : "",
                s = this.contentTypeControl.key();
            this.sortingByNewestToOldest = "oldest" != boot.ExternalUserSettings.sortlist;
            var o = this.sortingByNewestToOldest ? "newest" : "oldest";
            this.searchStateMode && $.trim(this.searchField.val()).length ? (e.append || ($(".searchtoolbar_queue").find("h2").text(Templating.callTrans("queue.searching")), $(".wrapper_search").addClass("wrapper_search_loading"), $("#page_queue").addClass("page_queue_search"), $(".side-nav").addClass("side-nav-search")), i = null, t = "mylist" == this.searchSectionFilter ? "queue" : "archive" == this.searchSectionFilter ? "archive" : null, s = null, a = "", this.searchChipLength && $(".search-input-list .search-chip").each(function(e) {
                var o = $(this).find(".search-chip-icon");
                o.length && o.hasClass("search-chip-contenttype") && (s = n.deriveContentTypeFilterFromTagName($(this).find("p").text())), o.length && o.hasClass("search-chip-tag") && (a = $(this).find("p").text()), o.length && o.hasClass("search-chip-favorite") && (t = null, i = 1)
            }), o = this.searchSortBy) : this.searchStateMode && ($(".wrapper_search").addClass("wrapper_search_loading"), $(".searchtoolbar_queue").find("h2").text(""));
            var r;
            r = this.location - this.offset, this.offset = 0;
            var l = {
                "offset": r,
                "count": this.pageSize,
                "state": t,
                "favorite": i,
                "sort": o,
                "search": this.searchField.val().trim(),
                "tag": a,
                "view": this.selectedView,
                "contentType": s
            };
            e.append || (l.appsInfo = "summary", l.forcegroups = 1, l.forceshares = 1), this.searchStateMode && (l.cxt_search_type = this.searchRecentSearch ? "recent" : "new"), this.data.getList({
                "o": e,
                "data": l,
                "delegate": this,
                "doneSelector": "reloadListCallback",
                "errorSelector": "reloadListError"
            }), "object" == typeof this.gsftooltip && this.gsftooltip.show(!1), this.location = r + this.pageSize
        }
    },
    "reloadListCallback": function(e, t) {
        if (this.syncedSince = e.since, this.searchHasMore = this.searchStateMode && "object" == typeof e.search_meta && e.search_meta.has_more, "object" == typeof PocketUserApps && "object" == typeof e.app_types && (PocketUserApps.appTypes = e.app_types, PocketUserApps.ready = !0, PocketUserApps.installedMobile() || !ServerSettings.mobileUpsell && !boot.ExternalUserSettings.showmobileupsell || (boot.ExternalUserSettings.showmobileupsell || (boot.ExternalUserSettings.showmobileupsell = !0, boot.saveExternalUserSettings()), $(".nav-mobileupsell").removeClass("nav-mobileupsell-inactive"))), "object" == typeof e.recent_searches && (this.recentSearches = e.recent_searches), "object" == typeof e.notifications && "object" == typeof e.unconfirmed_shares && this.receivedNotifications(e.notifications, e.unconfirmed_shares), this.searchStateMode && this.premiumMode && "object" == typeof e.search_meta && "normal" == e.search_meta.search_type && e.search_meta.error_msg && boot.showErrorNotification(e.search_meta.error_msg, !1, !0), this.searchStateMode && $.trim(this.searchField.val()).length > 0 ? ($("#page_queue").addClass("page_queue_search"), $(".side-nav").addClass("side-nav-search")) : ($("#page_queue").removeClass("page_queue_search"), $(".side-nav").removeClass("side-nav-search")), "object" == typeof e.groups && !this.topicDetailActive) {
            this.topicDetail = e.groups;
            var i = "";
            for (var n in this.topicDetail) {
                this.topicDetailActive = !0;
                var a = this.topicDetail[n];
                i += ".topic_" + a.group_id + "{background-color:rgb(" + a.color.r + "," + a.color.g + "," + a.color.b + "); background-color:rgba(" + a.color.r + "," + a.color.g + "," + a.color.b + ",0.9);} "
            }
            $("head").append('<style type="text/css">' + i + "</style>")
        }
        var s = e.list;
        this.friends = e.friends || {}, t.o.append || (this.items = [], this.itemsByID = {}), this.items || (this.items = [], this.itemsByID = {});
        var o = [];
        if (s && ($.each(s, function(e, t) {
            o.push(t), this.items.push(t), this.itemsByID[t.item_id] = t
        }.bind(this)), o.sort(sortBySortId)), $(".wrapper_search").removeClass("wrapper_search_loading"), this.searchStateMode && $.trim(this.searchField.val()).length && "undefined" != typeof e.search_meta) {
            var r;
            r = 1 == e.search_meta.total_result_count ? Templating.callTrans("queue.searchresult", null, null, e.search_meta.total_result_count) : Templating.callTrans("queue.searchresults", null, null, e.search_meta.total_result_count), $(".searchtoolbar_queue,.queue_secondarynav").find("h2").text(r)
        } else $(".searchtoolbar_queue").find("h2").text("");
        this.rebuildList(o, t)
    },
    "rebuildList": function(e, t) {
        function i(e, t) {
            var i = e;
            return 1 == t ? (e >= queue.BREAK_ITEM_COLUMNS_TWO && (i = Math.ceil(e / 2) - 3 * queue.ITEM_MARGIN), e >= queue.BREAK_ITEM_COLUMNS_THREE && (i = Math.ceil(e / 3) - Math.ceil(8 / 3 * queue.ITEM_MARGIN)), e >= queue.BREAK_ITEM_COLUMNS_FOUR && (i = Math.ceil(e / 4) - Math.ceil(2.5 * queue.ITEM_MARGIN))) : 2 == t && (e >= queue.BREAK_ITEM_COLUMNS_TWO && (i = e - 2 * queue.ITEM_MARGIN), e >= queue.BREAK_ITEM_COLUMNS_THREE && (i = Math.ceil(e / 1.5) - Math.ceil(4 * queue.ITEM_MARGIN)), e >= queue.BREAK_ITEM_COLUMNS_FOUR && (i = Math.ceil(e / 2) - Math.ceil(4 * queue.ITEM_MARGIN))), i
        }

        function n(e) {
            e.preventDefault();
            var t = $(this).parents(".item"),
                i = t.find(".shares"),
                n = i.height();
            return k ? (t.addClass("share_expanded"), t.find(".row_friends").css("height", n)) : (t.find(".sharesContainer").css("height", n), t.addClass("share_expanded")), e.preventDefault(), !1
        }

        function s(e) {
            e.preventDefault();
            var t = $(this).parents(".item");
            return t.removeClass("share_expanded"), k ? (t.find(".row_friends").css("height", ""), "wide_split" == t.data("tiletype") && t.find(".thumb").css("top", "")) : t.find(".sharesContainer").css("height", ""), !1
        }

        function o(e) {
            if (0 != e.button || !(e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)) {
                var t = $(this).parents(".item");
                return t.hasClass("share_expanded") ? s.call(this, e) : n.call(this, e)
            }
        }
        e = e || this.items, t = t || {}, t.o.append || (this.queueList.empty(), this.loadMoreRow = !1, this.c = {
            "tiles": 0,
            "leftInRow": 0,
            "last": {}
        }, this.showBulkEdit(!1));
        var r, l, c, u, d, h, p, f, g, m, v, _, b, y, S, w, T = this,
            k = "grid" == this.selectedView && $(window).width() >= this.BREAK_ITEM_COLUMNS_TWO,
            x = "archive" == this.stateSelector.value ? !0 : !1,
            C = "favorites" == this.stateSelector.value ? !0 : !1,
            E = 0,
            M = "",
            D = [],
            I = $(window).width();
        this.tilesPerRow = tilesPerRow(I);
        for (w in e) {
            var L, A, q = this.THUMB_VARIANT_EMPTY;
            if (this.c.leftInRow <= 0 && (this.c.leftInRow = tilesPerRow(I)), l = e[w], l.highlights) {
                var P = !1;
                for (prop in l.highlights) l.highlights[prop] = custom_decode_entities(l.highlights[prop]), "title" == prop ? (l.highlights[prop] = l.highlights[prop].replace(/<em>/gi, '<div class="search-match">').replace(/<\/em>/gi, "</div>"), P = !0) : "tags" == prop ? (l.highlights[prop] = l.highlights[prop].replace(/<em>/gi, "").replace(/<\/em>/gi, ""), P = !0) : ("url" == prop && (P = !0), l.highlights[prop] = l.highlights[prop].replace(/<em>/gi, '<span class="search-match">').replace(/<\/em>/gi, "</span>"));
                P && l.highlights.full_text && delete l.highlights.full_text
            }
            "undefined" != typeof l.shares && (A = [], $.each(l.shares, function(e, t) {
                if ("string" == typeof t.time_shared && (t.time_shared = new Date(1e3 * parseInt(t.time_shared, 10))), 1 === parseInt(t.status, 10)) {
                    A.push(t);
                    var i = t.from_friend_id;
                    if (i) {
                        var n = T.friends[i];
                        n && (t.friend = n, l.friends = l.friends || [], l.friends.push(n))
                    }
                }
            })), c = l.resolved_url ? l.resolved_url : l.given_url, u = "1" == l.is_article || "2" == l.has_video || "2" == l.has_image ? "/a/read/" + l.item_id : c;
            var F = "item_link";
            F += "1" == l.is_article || "2" == l.has_video || "2" == l.has_image ? " start_articleview" : " start_webview", f = "1" == l.is_article ? 2 : "2" == l.has_video ? 17 : "2" == l.has_image ? 43 : 13, p = sanitizeText(domainForURL(c)) || "", l.title && (d = l.title), d = l.resolved_title ? l.resolved_title : l.given_title ? l.given_title : l.resolved_url ? l.resolved_url : l.given_url, y = 1, g = "", m = 0, v = 0, _ = !1, b = !0;
            var O = l.highlights && l.highlights.full_text && "grid" == queue.selectedView;
            if (k) {
                if ("1" == l.is_article) {
                    if (l.image && l.image.src) {
                        var N = boot.GSFStatus.active && parseInt(w, 10) < 3;
                        this.c.leftInRow >= 2 && !N && !O && (!A && (!this.c.last.wide_image || this.c.tiles - this.c.last.wide_image >= 2) && l.image.width >= i(I, 2) ? (y = 2, g = "wide_image", m = i(I, 2)) : (!this.c.last.wide_split || this.c.tiles - this.c.last.wide_split >= 4) && imageWouldFitIn(l.image, i(I, 1), 281) && l.excerpt && l.excerpt.length > 30 && (y = 2, g = "wide_split", m = i(I, 1), _ = !0)), g.length || (O ? (g = "normal_excerpt", _ = !0) : (g = "normal", m = i(I, 1), b = !1))
                    }
                } else "2" != l.has_video || "1" != l.has_image || O || (g = "normal_video", m = i(I, 1), b = !1), "2" != l.has_image || O || (g = "normal_image", m = i(I, 1), v = 255, b = !1);
                g.length || (l.excerpt && l.excerpt.length > 25 ? (g = "normal_excerpt", _ = !0) : (m = !1, g = "normal_only_title", q = this.THUMB_VARIANT_TITLEONLY)), m && (q = this.THUMB_VARIANT_DEFAULT), M = 'data-tiletype="' + g + '" data-ts="' + y + '"'
            } else g = "normal", m = 80, v = 100, I >= this.BREAK_ITEM_LIST_WIDE && (m = 100, v = 100), I >= this.BREAK_ITEM_LIST_WIDECOLUMNS && (m = 100, v = 80), q = l.image && l.image.src ? this.THUMB_VARIANT_LISTDEFAULT : this.THUMB_VARIANT_LISTEMPTY, M = ""; if (dictJSON.manual.item_id = l.item_id, dictJSON.manual.tile_class = g, dictJSON.manual.item_linkclasses = F, dictJSON.manual.item_openurl = u, l.badge_group_id && T.topicDetailActive && "object" == typeof T.topicDetail[l.badge_group_id]) {
                var H = T.topicDetail[l.badge_group_id];
                "object" == typeof H.name && "string" == typeof H.name[ServerSettings.language] && "number" == typeof H.group_id ? (dictJSON.manual.item_topic_desc = H.name[ServerSettings.language], dictJSON.manual.item_topic_id = H.group_id) : (dictJSON.manual.item_topic_desc = null, dictJSON.manual.item_topic_id = null)
            } else dictJSON.manual.item_topic_desc = null, dictJSON.manual.item_topic_id = null;
            var r = $(Handlebars.templates.queue_itemshell(dictJSON));
            if (k && (r.data("tiletype", g), r.data("ts", y)), "1" == l.favorite && r.data("favorite", 1), "1" == l.status && r.data("status", 1), a = r.find(".item_link"), dictJSON.manual.item_topic_desc && r.find(".title").after(r.find(".topic_detail")), a.click(function(e, t) {
                return function() {
                    queue.data.opened(e, t)
                }
            }(l.item_id, f)), boot.ExternalUserSettings.sawwebviewoverlay || a.hasClass("start_webview") && (a.off("click.webview"), a.on("click.webview", function(e) {
                if (!(e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || boot.ExternalUserSettings.sawwebviewoverlay || T.bulkEditMode || boot.GSFStatus.active && "object" != typeof boot.GSFStatus.saveditems)) {
                    e.preventDefault(), e.stopImmediatePropagation(), boot.ExternalUserSettings.sawwebviewoverlay = !0, boot.saveExternalUserSettings(), boot.GSFStatus.articleview = !0, boot.saveGSFStatus();
                    var t = $(this);
                    t.off("click.webview"), T.showConfirmDialog(Templating.callTrans("queue.webviewwarn_webonlyview"), Templating.callTrans("queue.webviewwarn_webonlydetail"), null, function() {
                        T.gsfCheckLogic(), T.gsfCheckLogicAlt(), window.open(t.attr("href"))
                    }), boot.GSFStatus.savedfirstitem && !boot.GSFStatus.confirmedfirstsavedetail && (boot.GSFStatus.confirmedfirstsavedetail = !0, boot.saveGSFStatus(), PocketAnalytics.action("gsf_savedtolistconfirm_article", "click", "webapp"))
                }
            })), r.find(".item_content").click(function(e) {
                if (0 == e.button && (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) && (T.bulkEditMode || !$(e.target).hasClass("original_url") && !$(e.target).parent().hasClass("title"))) {
                    if (!T.bulkEditMode && (e.metaKey || e.ctrlKey || e.altKey)) return; {
                        $(e.target)
                    }
                    e.preventDefault();
                    var t = $(this).parents(".item");
                    if (e.metaKey || e.ctrlKey || e.altKey) t.toggleClass("item_bulkeditselected");
                    else {
                        if (t.nextAll(".item_bulkeditselected").length) t.nextUntil(".item_bulkeditselected").addClass("item_bulkeditselected");
                        else if (t.prevAll(".item_bulkeditselected").length) t.prevUntil(".item_bulkeditselected").addClass("item_bulkeditselected");
                        else {
                            var i = $(".item").not(".removed").first();
                            i.addClass("item_bulkeditselected"), i.attr("id") != t.attr("id") && i.nextUntil(t).addClass("item_bulkeditselected")
                        }
                        t.addClass("item_bulkeditselected")
                    }
                    T.checkBulkEditLogic()
                } else {
                    if (T.bulkEditMode) {
                        e.preventDefault(), e.stopImmediatePropagation();
                        var t = $(this).parents(".item");
                        return t.toggleClass("item_bulkeditselected"), void T.checkBulkEditLogic()
                    }
                    if (0 != e.button || $(e.target).parents(".buttons").length || $(e.target).parents(".tags").length || $(e.target).hasClass("tags") || $(e.target).parent().hasClass("title")) return;
                    if (0 == e.button && $(e.target).hasClass("original_url")) return e.preventDefault(), e.stopImmediatePropagation(), void window.open($(e.target).attr("href"));
                    if ($(e.target).hasClass("favicon")) return window.open($(e.target).data("originalurl")), e.preventDefault(), void e.stopImmediatePropagation();
                    if (e.preventDefault(), e.stopImmediatePropagation(), $(this).find(".start_webview").length && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey && boot.ExternalUserSettings.sawwebviewoverlay && !T.bulkEditMode) return void window.open($(this).find(".item_link").attr("href"));
                    var n = $(this).find(".item_link").attr("href");
                    $(".popover-new").removeClass("popover-active"), boot.loadStateFromUrl(n)
                }
            }), Modernizr.touch && "function" == typeof Hammer) {
                var U = new Hammer.Manager(r.find(".item_content")[0]);
                U.add(new Hammer.Pan({
                    "direction": Hammer.DIRECTION_HORIZONTAL,
                    "threshold": 150
                })), U.on("pan", function(e) {
                    if (e.isFinal) {
                        var t = $(e.target).parents(".item");
                        e.deltaX > 0 ? t.hasClass("item_controls") ? t.hasClass("item_controls_left") || t.removeClass("item_controls") : t.addClass("item_controls item_controls_left") : t.hasClass("item_controls") ? t.hasClass("item_controls_left") && t.removeClass("item_controls item_controls_left") : t.addClass("item_controls")
                    }
                })
            }
            if (inner = r.find(".item_content"), caret = $([]), l.friends && l.friends.length) {
                var j = l.friends[0].name;
                l.friends.length > 1 && (dictJSON.manual.item_friendslist += " and " + (l.friends.length - 1) + " other" + (l.friends.length > 2 ? "s" : "")), k || (dictJSON.manual.item_friendslist = Templating.callTrans("queue.sharedby") + " " + j), dictJSON.manual.item_friendsbgimg = getImageCacheUrl(l.friends[0].avatar_url, "w90-h90-nc"), dictJSON.manual.item_friendslist = j, h = $(Handlebars.templates.queue_itemfriendsdetail(dictJSON)), r.addClass("shared_to")
            } else h = $([]);
            r.find(".title").text(tagEntities(d)), d = r.find(".title"), excerpt = _ && l.excerpt ? $('<p class="excerpt">' + tagEntities(l.excerpt) + "</p>") : null, thumb = r.find(".thumb"), thumb.data("variant", q);
            var G;
            if (dictJSON.manual.item_targeturl = sanitizeText(urlWithPocketRedirect(c)), dictJSON.manual.item_domain = p, dictJSON.manual.item_tags = listTags(l.tags, !1, !0), l.highlights && (l.highlights.title && (d = l.highlights.title, r.find(".title").addClass("title-searchmatch").html(d)), l.highlights.full_text && excerpt && excerpt.html(l.highlights.full_text), l.highlights.tags && l.tags && (dictJSON.manual.item_tags = listTags(l.tags, !1, !0, l.highlights.tags))), G = $(Handlebars.templates.queue_itemsubdetail_list(dictJSON)), k ? (L = r.find(".favicon"), L.attr("data-originalurl", sanitizeText(urlWithPocketRedirect(c))), inner.prepend(h), inner.find(".title").after(excerpt), inner.append(G)) : (l.friends && l.friends.length && $("<li></li>").append(h).insertBefore(G.children().get(0)), a.after(excerpt), inner.append(G)), l.highlights && l.highlights.url && p) {
                var z = "",
                    Y = /\/\/([^(<|\/)]*<span class="search-match">[^<|\/]*<\/span>[^<|\/]*)/.exec(l.highlights.url);
                z = Y ? Y[0].replace(/(\/\/)?(www\.)?/, "") : '<span class="search-match">' + p + "</span>", inner.find(".original_url").html(z)
            }
            var R = window.devicePixelRatio || 1,
                B = R > 1,
                W = l.image ? getImageCacheUrl(l.image.src, "w" + Math.round(m * R) + (Math.round(v * R) ? "-h" + Math.round(v * R) : "") + (b ? "" : "-nc"), "t", B) : void 0;
            if (q !== this.THUMB_VARIANT_EMPTY)
                if (q === this.THUMB_VARIANT_LISTEMPTY) {
                    var J = "/a/i/tile_fallback@1x.jpg";
                    thumb.css("background-image", "url('" + J + "')"), thumb.css("background-repeat", "repeat"), thumb.css("background-size", "auto"), thumb.addClass("lazy-active"), R > 1 && (J = J.replace("1x.jpg", "2x.jpg").replace("1x.png", "2x.png"), thumb.css("background-size", "844px 591px"))
                } else if (thumb.addClass("lazy-load"), thumb.attr("data-lazy-type", "thumbnail"), thumb.attr("data-lazy-key", l.item_id), q === this.THUMB_VARIANT_TITLEONLY) {
                var V = getImageCacheUrl("http://" + p + "/apple-touch-icon.png", "w80-h80-nc");
                thumb.attr("data-thumburl", V), thumb.attr("data-thumbvariant", q), thumb.attr("data-shouldcache", "0" == l.status)
            } else q === this.THUMB_VARIANT_DEFAULT ? m && (thumb.attr("data-thumburl", W), thumb.attr("data-thumbvariant", q), thumb.attr("data-tileclass", g), thumb.attr("data-shouldcache", "0" == l.status)) : q === this.THUMB_VARIANT_LISTDEFAULT && (thumb.attr("data-thumburl", W), thumb.attr("data-thumbvariant", q), thumb.attr("data-hasplaybutton", "2" == l.has_video), thumb.attr("data-shouldcache", "0" == l.status)); if (L && (L.addClass("lazy-load"), L.attr("data-lazy-type", "favicon"), L.attr("data-lazy-key", l.item_id), L.attr("data-favicon-url", faviconForUrl(p))), "undefined" != typeof A) {
                var K = $("<div class='shares'></div>");
                if (A.sort(function(e, t) {
                    var i = e.time_shared,
                        n = t.time_shared;
                    return i instanceof Date ? i = i.getTime() : "string" == typeof i && (i = parseInt(i, 10)), n instanceof Date ? n = n.getTime() : "string" == typeof n && (n = parseInt(n, 10)), n - i
                }), k || 1 != A.length || void 0 != A[0].comment && 0 != A[0].comment.length || void 0 != A[0].quote && 0 != A[0].quote.length)
                    for (var X = 0; X < A.length; X++) {
                        var Q = attributionForShare(A[X], l, !k, !0);
                        K.append(Q)
                    } else {
                        var Z = $("<div class='notification'><div><div class='attribution'><div class='one_liner'></div></div></div></div>"),
                            ee = A[0],
                            te = ee.fromFriend || this.friends[ee.from_friend_id],
                            ie = te && te.name && te.name.length ? te.name : "A friend";
                        Z.find(".one_liner").text("" + ie + " " + Templating.callTrans("queue.sharedthiswithyou") + " " + relativeDateString(ee.time_shared, !0) + "."), K.append(Z)
                    } if (k) h.append(K);
                    else {
                        var ne = $("<div class='sharesContainer'></div>");
                        ne.append(K), r.append(ne)
                    }
            }
            D.push(r), S = {}, "1" == l.favorite && (S.favorite = !0), (x || C || T.searchStateMode) && 1 == l.status && (S.archived = !0), (S.favorite || S.archived || Modernizr.touch) && this.addButtonsToRow(!1, r, S), r.find(".tag_container").on("click", ".tag", function(e) {
                T.searchStateMode && T.showSearchState(!1)
            }), E++, this.c.tiles += y, this.c.leftInRow -= y, this.c.last[g] = this.c.tiles
        }
        if (this.loadMoreRow || (this.loadMoreRow = $('<li class="info-loading"></li>'), this.loadMoreRow.click(function() {
            this.reloadList({
                "append": !0
            })
        }.bind(this))), t.data && (E < t.data.count ? (this.remaining = !1, this.loadMoreRow.hide()) : (this.remaining = !0, this.loadMoreRow.show())), t.o.postSync && (this.remaining = !0, this.loadMoreRow.hide()), $.each(D, function(e, t) {
            t.mouseover(function() {
                T.addButtonsToRow(this)
            }), t.find("a.add_tag").click(function() {
                T.editItemTags(this)
            }), t.find("a.edit").click(function() {
                T.editItemTags(this)
            }), k ? t.find(".row_friends").mouseenter(n).mouseleave(s).unbind("click").click(function(e) {
                0 == e.button && (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) || (e.preventDefault(), $(this).siblings(".item_link").trigger("click"))
            }) : t.find(".row_friends").unbind("click").click(o)
        }), t.o.append && !this.listIsEmpty() || t.o.postSync || "queue" != this.state.section && "home" != this.state.section || this.searchField.val().length || tagSidebar.selectedTag || this.checkForMessages(), this.queueList.append(D), this.queueList.append(this.loadMoreRow), $(document.body).hasClass("editing") && this.applyEditToRows(), this.showEmpty(0 == E && (!t.o.append || this.listIsEmpty())), t.o.append && !this.listIsEmpty() || t.o.postSync || this.resetHighlight(), this.listIsDoneLoading(), "undefined" == typeof boot.ExternalUserSettings.haspassword && "object" == typeof PromptPassword) return void this.checkUserValidPassword();
        if ("undefined" == typeof boot.ExternalUserSettings.fontbundle && (boot.ExternalUserSettings.fontbundle = "en-US" == ServerSettings.language || "fr-FR" == ServerSettings.language || "fr-CA" == ServerSettings.language || "de-DE" == ServerSettings.language || "it-IT" == ServerSettings.language || "es-ES" == ServerSettings.language || "es-LA" == ServerSettings.language || "pt-PT" == ServerSettings.language || "pt-BR" == ServerSettings.language ? "standard" : "full", boot.saveExternalUserSettings()), this.gsfInitialize(), !ServerSettings.fromFFViewList || boot.GSFStatus.active || boot.ExternalUserSettings.readinglistnotice || ($(".isolate_screen_buttontargetsecond").length || $("body").append('<div class="isolate_screen_buttontargetsecond"></div>'), createGSFTooltip({
            "anchor": $(".isolate_screen_buttontargetsecond"),
            "body": Handlebars.templates.gsf_comingback(dictJSON),
            "position": ["bottomleft"],
            "progress": {
                "size": boot.GSFStatus.gsfProgressMax,
                "selected": 5
            },
            "confirmdetail": {
                "button": !0,
                "text": Templating.callTrans("gsf.gotit"),
                "callback": function() {
                    closeGSFTooltip(), PocketAnalytics.action("gsf_readinglistnext_dismiss", "click", "webapp")
                }
            },
            "isolateall": !0,
            "fixed": !0
        }), $(".gsf-tooltip-progress").css("visibility", "hidden"), PocketAnalytics.action("gsf_readinglistnext", "view", "webapp"), currentGSFTooltip.object.addClass("gsf-tooltip-fluid").css("left", parseInt(currentGSFTooltip.object.css("left")) - 100 + "px"), boot.ExternalUserSettings.readinglistnotice = !0, boot.saveExternalUserSettings()), 1 == ServerSettings.premUpsell && Modernizr.localstorage) {
            var ae = localStorage.getItem("lastbanner"),
                se = boot.ExternalUserSettings.dismissedpremupsell;
            if (("queue" == this.state.section || "home" == this.state.section) && !this.searchField.val().length && !tagSidebar.selectedTag && 0 == ServerSettings.PremiumStatus && ("undefined" == typeof se || parseInt(se) < 2) && (boot.GSFStatus.active || 1 == Math.floor(7 * Math.random() + 1) && (null == ae || Date.now() - parseInt(ae) > 2592e5)))
                if (localStorage.setItem("lastbanner", Date.now()), boot.GSFStatus.active) {
                    if ($(".gsf_device_premupsell").length) return;
                    $("#page_queue").outerHeight() < $(window).height() - 5 && $("#page_queue").css("minHeight", $(window).height() - 40 + "px"), $("#page_queue").append(Handlebars.templates.queue_gsfpremreminder(dictJSON)), $(".gsf_device_reminder").css("cursor", "pointer").click(function(e) {
                        e.preventDefault(), PocketAnalytics.action("click_premiumbanner", "interact", "webapp"), window.open("https://getpocket.com/premium/?prt=ifT0Oyt6myb0Da&s=banner&t=gsfn"), $(".gsf_device_reminder_container").remove()
                    }), $(".gsf_device_reminder_container").addClass("gsf_device_premupsell"), $(".gsf_device_reminder .close").click(function(e) {
                        e.preventDefault(), e.stopImmediatePropagation(), boot.ExternalUserSettings.dismissedpremupsell = "undefined" == typeof se ? 1 : parseInt(boot.ExternalUserSettings.dismissedpremupsell) + 1, boot.saveExternalUserSettings(), $(".gsf_device_reminder_container").remove()
                    })
                } else {
                    if ($(".gsf_device_premupsell").length) return;
                    $("body").addClass("page-notificationpersistent");
                    var Z = $(Handlebars.templates.notification_persistent(dictJSON));
                    Z.find(".content").html("<p>" + Templating.callTrans("gsf.enjoypremiummonthalt", '<a href="https://getpocket.com/premium/?prt=ifT0Oyt6myb0Da&s=banner&t=gsfe" target="_blank">', "</a>") + "</p>"), $("#container").prepend(Z), Z.find("a").click(function(e) {
                        PocketAnalytics.action("click_premiumbanner", "interact", "webapp"), $(this).parents("notifications-persistent").remove(), $("body").removeClass("page-notificationpersistent")
                    }), Z.find(".close").click(function(e) {
                        e.preventDefault(), e.stopImmediatePropagation(), $(this).parents("notifications-persistent").remove(), boot.ExternalUserSettings.dismissedpremupsell = "undefined" == typeof se ? 1 : parseInt(boot.ExternalUserSettings.dismissedpremupsell) + 1, boot.saveExternalUserSettings(), $("body").removeClass("page-notificationpersistent")
                    })
                }
        } else boot.ExternalUserSettings.dismisseddevicereminder || PocketUserApps.ready && PocketUserApps.installedMobile() || "queue" != this.state.section && "home" != this.state.section || this.searchField.val().length || tagSidebar.selectedTag ? $(".gsf_device_reminder_container").length && $(".gsf_device_reminder_container").remove() : ($("#page_queue").outerHeight() < $(window).height() - 5 && $("#page_queue").css("minHeight", $(window).height() - 40 + "px"), dictJSON.manual.nativeappsupport = ServerSettings.nativeAppSupport, $("#page_queue").append(Handlebars.templates.queue_gsfdevicereminder(dictJSON)), $(".gsf_device_reminder .close,.gsf_device_reminder_native_link").click(function(e) {
            boot.ExternalUserSettings.dismisseddevicereminder = !0, boot.saveExternalUserSettings(), $(".gsf_device_reminder_container").remove()
        }));
        t.o && t.o.append && (setTimeout(function() {
            $(".removed").remove()
        }, 1e3), $(document.body).hasClass("editing") && this.updateCheckAllBox()), setTimeout(function() {
            if ("grid" == this.selectedView && this.adjustTiles(), "list" == this.selectedView && this.checkTilesTagOverflow(), t.o.postSync && boot.pages.queue.isOpen && this.preSyncTopItem) {
                var e = $("#" + this.preSyncTopItem);
                if (e.length) {
                    var i = e.position().top;
                    if (i) {
                        var n = $("body").scrollTop() ? $("body").scrollTop() : $("html").scrollTop();
                        $("body,html").scrollTop(i - this.preSyncTopPosition + n)
                    }
                }
            }
            this.processLazyLoadScroll()
        }.bind(this), 50)
    },
    "sync": function() {
        if (this.syncedSince) {
            var e = this.stateSelector.value,
                t = null;
            "favorites" == e && (e = null, t = 1), this.data.getList({
                "o": {},
                "data": {
                    "since": this.syncedSince,
                    "appsInfo": "summary"
                },
                "delegate": this,
                "doneSelector": "syncCallback",
                "errorSelector": "syncError"
            })
        }
    },
    "syncCallback": function(e, t) {
        function i(e) {
            for (var t = -1, i = 0; i < queue.items.length; i++) queue.items[i].item_id == e && (t = i);
            t > -1 && queue.items.splice(t, 1)
        }
        this.syncedSincePrev = this.syncedSince, this.syncedSince = e.since;
        var n = e.list;
        "object" == typeof PocketUserApps && (PocketUserApps.appTypes = e.app_types, PocketUserApps.ready = !0, PocketUserApps.installedMobile() || !ServerSettings.mobileUpsell && !boot.ExternalUserSettings.showmobileupsell || (boot.ExternalUserSettings.showmobileupsell || (boot.ExternalUserSettings.showmobileupsell = !0, boot.saveExternalUserSettings()), $(".nav-mobileupsell").removeClass("nav-mobileupsell-inactive"))), "object" == typeof e.recent_searches && (this.recentSearches = e.recent_searches);
        var a = [],
            s = [],
            o = [],
            r = 0,
            l = 0,
            c = 0,
            u = 0;
        if (n) {
            if ($.each(n, function(e, t) {
                a.push(t);
                var i = this.itemsByID[t.item_id],
                    n = parseInt(t.status, 10),
                    d = parseInt(t.favorite, 10),
                    h = !1;
                if (!this.searchStateMode && "queue" == this.stateSelector.value && 0 == n || !this.searchStateMode && "favorites" == this.stateSelector.value && 2 != n && d || !this.searchStateMode && "archive" == this.stateSelector.value && 1 == n || this.searchStateMode && "allitems" == this.searchSectionFilter || this.searchStateMode && "mylist" == this.searchSectionFilter && 0 == n || this.searchStateMode && "archive" == this.searchSectionFilter && 1 == n || this.searchStateMode && $(".search-chip-favorite").length && 2 != n && d) {
                    var p = this.searchField.val().trim();
                    (!p.length || t.resolved_title.toLowerCase().indexOf(p) > -1 || t.given_title.toLowerCase().indexOf(p) > -1 || t.resolved_url.toLowerCase().indexOf(p) > -1 || t.given_url.toLowerCase().toLowerCase().indexOf(p) > -1) && (tagSidebar.selectedTag && t.tags ? JSON.stringify(t.tags).indexOf(tagSidebar.selectedTag) > -1 && (h = !0) : tagSidebar.selectedTag || (h = !0))
                }
                if ("object" != typeof i || h) {
                    if ("object" == typeof i) {
                        this.itemsByID[t.item_id] = t;
                        var f = this.inited ? $("#i" + t.item_id) : !1,
                            g = f.find(".action_favorite");
                        d != g.hasClass("selected") && (l++, d ? (g.addClass("selected"), f.addClass("item_state_favorited")) : (g.removeClass("selected"), f.removeClass("item_state_favorited")))
                    } else if ("object" != typeof i && h) {
                        if (t.time_added < this.syncedSincePrev) return !0;
                        s.push(t), "favorite" == this.stateSelector.value ? l++ : 1 == n ? c++ : 2 == n ? u++ : r++
                    }
                } else o.push(t), "favorite" == this.stateSelector.value ? l++ : 1 == n ? c++ : 2 == n ? u++ : r++
            }.bind(this)), a.sort(sortBySortId), s.length || o.length) {
                $.each(s, function(e, t) {
                    (this.sortingByNewestToOldest || !this.remaining) && (queue.items.splice(0, 0, t), queue.itemsByID[t.item_id] = t, queue.offset--)
                }), $.each(o, function(e, t) {
                    var n = queue.itemsByID[t.item_id];
                    "object" == typeof n && (i(t.item_id), delete queue.itemsByID[t.item_id], queue.offset++)
                });
                var d = $(".item").not(".removed");
                this.preSyncTopItem = d.length ? d.first().attr("id") : null, this.preSyncTopPosition = d.length ? d.first().position().top : 0, this.sortingByNewestToOldest ? this.rebuildList(queue.items.sort(sortByTimeAddedNewest), {
                    "o": {
                        "append": !1,
                        "postSync": !0
                    }
                }) : this.rebuildList(queue.items.sort(sortByTimeAddedOldest), {
                    "o": {
                        "append": !1,
                        "postSync": !0
                    }
                })
            }
            if (r || l || c || u) {
                var h = "";
                if (!r || l || c || u)
                    if (!l || r || c || u)
                        if (!c || r || l || u)
                            if (!u || r || c || l) {
                                var p = u + r + c + l;
                                dictJSON.manual.sync_count = p, dictJSON.manual.sync_singular = 1 == p, h = Handlebars.templates.notification_sync_updated(dictJSON)
                            } else dictJSON.manual.sync_count = u, dictJSON.manual.sync_singular = 1 == u, h = Handlebars.templates.notification_sync_deleted(dictJSON);
                            else dictJSON.manual.sync_count = c, dictJSON.manual.sync_singular = 1 == c, h = Handlebars.templates.notification_sync_archived(dictJSON);
                            else dictJSON.manual.sync_count = l, dictJSON.manual.sync_singular = 1 == l, h = Handlebars.templates.notification_sync_updated(dictJSON);
                            else dictJSON.manual.sync_count = r, dictJSON.manual.sync_singular = 1 == r, h = Handlebars.templates.notification_sync_added(dictJSON);
                boot.showNotification(h, !1, 0, !0), setTimeout(function() {
                    boot.hideNotification()
                }, 3e3)
            }
        }
    },
    "syncError": function() {
        boot.showErrorNotification(Templating.callTrans("notification.unexpectederror"))
    },
    "checkSortingChange": function() {
        var e = this;
        if ("object" == typeof boot.ExternalUserSettings && "object" == typeof PocketUserApps && "number" == typeof PocketUserApps.userId) {
            {
                boot.ExternalUserSettings
            }
            boot.data.get("getUserMeta", {
                "data": {
                    "userId": PocketUserApps.userId,
                    "property": boot.USERS_META_WEB_DISPLAY_SETTINGS
                },
                "delegate": e,
                "doneSelector": "checkSortingChangeCallback"
            }, !0)
        }
    },
    "checkSortingChangeCallback": function(e) {
        "object" == typeof e && "string" == typeof e.value && (pollsettings = JSON.parse(e.value.replace(/\\\"/g, '"')), pollsettings.sortlist != boot.ExternalUserSettings.sortlist && (boot.ExternalUserSettings.sortlist = pollsettings.sortlist, this.reloadList(), sharedToast.show(Templating.callTrans("oldest" != boot.ExternalUserSettings.sortlist ? "queue.sortingbynewest" : "queue.sortingbyoldest"))))
    },
    "checkLanguageChange": function() {
        var e = this;
        if ("object" == typeof boot.ExternalUserSettings && "object" == typeof PocketUserApps && "number" == typeof PocketUserApps.userId) {
            {
                boot.ExternalUserSettings
            }
            boot.data.get("getUserMeta", {
                "data": {
                    "userId": PocketUserApps.userId,
                    "property": boot.USERS_META_WEB_DISPLAY_SETTINGS
                },
                "delegate": e,
                "doneSelector": "checkLanguageChangeCallback"
            }, !0)
        }
    },
    "checkLanguageChangeCallback": function(e) {
        "object" == typeof e && "string" == typeof e.value && (pollsettings = JSON.parse(e.value.replace(/\\\"/g, '"')), pollsettings.forcelanguage != boot.ExternalUserSettings.forcelanguage && (boot.ExternalUserSettings.forcelanguage = pollsettings.forcelanguage, boot.showErrorNotification("", !0), $(".notifications-error .message").html(Templating.callTrans("notification.langchange", ['<a class="link-force-reload" href="#">'], ["</a>"])), $(".link-force-reload").css("color", "#FBB64A").click(function() {
            document.location.href = "/web"
        })))
    },
    "checkFontBundleChange": function() {
        var e = this;
        if ("object" == typeof boot.ExternalUserSettings && "object" == typeof PocketUserApps && "number" == typeof PocketUserApps.userId && ("standard" == boot.ExternalUserSettings.fontbundle || "full" == boot.ExternalUserSettings.fontbundle)) {
            {
                boot.ExternalUserSettings
            }
            boot.data.get("getUserMeta", {
                "data": {
                    "userId": PocketUserApps.userId,
                    "property": boot.USERS_META_WEB_DISPLAY_SETTINGS
                },
                "delegate": e,
                "doneSelector": "checkFontBundleChangeCallback"
            }, !0)
        }
    },
    "checkFontBundleChangeCallback": function(e) {
        "object" == typeof e && "string" == typeof e.value && (pollsettings = JSON.parse(e.value.replace(/\\\"/g, '"')), "standard" != boot.ExternalUserSettings.fontbundle && "full" != boot.ExternalUserSettings.fontbundle || pollsettings.fontbundle == boot.ExternalUserSettings.fontbundle || (boot.ExternalUserSettings.fontbundle = pollsettings.fontbundle, "full" == boot.ExternalUserSettings.fontbundle && boot.expandToFullFontBundle()))
    },
    "receivedNotifications": function(e, t) {
        e = e || [];
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.time_shared && "string" == typeof n.time_shared && (n.time_shared = new Date(1e3 * parseInt(n.time_shared, 10)))
        }
        this.notifications = e, this.unconfirmedNotifications = t;
        var a = 0;
        for (var s in this.unconfirmedNotifications || {})++a;
        var o = e.length + a;
        this.setInboxNotification(o)
    },
    "addURL": function(e) {
        var t = this;
        queue.lastSaveUrl = e, e = (e + "").toString(), e = e.replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+"), e.indexOf("\\") > -1 ? (boot.showErrorNotification(Templating.callTrans("notification.invalidaddurl")), PocketAnalytics.actionWithExtraString("web_save_fail", "interact", "webapp", queue.lastSaveUrl)) : queue.data.itemAction({
            "data": {
                "action": "add",
                "url": e
            },
            "delegate": t,
            "doneSelector": "addURLCallback",
            "errorSelector": "addURLError"
        })
    },
    "addURLCallback": function(e) {
        "object" == typeof e && "number" == typeof e.status && e.status ? (sharedToast.show(Templating.callTrans("notification.addedtolist")), PocketAnalytics.actionWithExtraString("web_save_success", "interact", "webapp", queue.lastSaveUrl), this.sync()) : (boot.showErrorNotification(Templating.callTrans("notification.invalidaddurl")), PocketAnalytics.actionWithExtraString("web_save_fail", "interact", "webapp", queue.lastSaveUrl))
    },
    "addURLError": function(e) {
        PocketAnalytics.actionWithExtraString("web_save_fail", "interact", "webapp", queue.lastSaveUrl), boot.showErrorNotification(e.message)
    },
    "adjustTiles": function() {
        var e = "grid" == this.selectedView && $(window).width() >= this.BREAK_ITEM_COLUMNS_TWO;
        if (e) {
            var t = this,
                i = this.queueList.children(".item:not(.adjusted)"),
                n = {}, a = {}, s = {};
            $.each(i, function(e, i) {
                var o = $(i),
                    r = o.attr("id"),
                    l = o.data("tiletype"),
                    c = o.find(".title").outerHeight(),
                    u = o.find(".excerpt");
                n[r] = t.thumbnailHeightforTile(o, l, c), a[r] = t.excerptHeightForTile(u, o, l, c), s[r] = t.offsetForTopicBadge(o, l, c)
            }), $.each(i, function(e, i) {
                var o = $(i);
                o.addClass("adjusted");
                var r = o.attr("id"),
                    l = o.data("tiletype");
                t.executeThumbnailHeightForTile(o, n[r]), t.executeExcerptHeight(o, a[r], l), t.executeTopicBadgeOffset(o, s[r], l)
            })
        }
    },
    "adjustTile": function(e) {
        e.addClass("adjusted");
        var t = e.data("tiletype");
        if (t) {
            var i = e.find(".title").height(),
                n = e.find(".excerpt"),
                a = (n.size(), this.thumbnailHeightforTile(e, t, i)),
                s = this.excerptHeightForTile(n, e, t, i);
            this.executeThumbnailHeightForTile(e, a), this.executeExcerptHeight(e, s, t)
        }
    },
    "thumbnailHeightforTile": function(e, t, i) {
        var n;
        if ("wide_split" != t && "normal_image" != t) {
            var a = e.find(".row_friends");
            n = e.height() - i - 33 - a.height()
        }
        return n
    },
    "executeThumbnailHeightForTile": function(e, t) {
        "undefined" != typeof t && e.find(".thumb").css("height", t)
    },
    "excerptHeightForTile": function(e, t, i, n) {
        var a, s = e.size();
        if (e && 1 == s) {
            var o = t.find(".row_friends");
            a = t.height() - n - 33 - 1 * e.css("padding-top").replace("px", "") - 1 * e.css("padding-bottom").replace("px", ""), t.hasClass("shared_to") && (a -= o.height())
        }
        return a
    },
    "executeExcerptHeight": function(e, t, i) {
        if ("undefined" != typeof t) {
            var n = e.find(".excerpt");
            "normal_excerpt" == i ? snapToLineAndMaxHeight(n, 18, t) : "wide_split" == i && snapToLineAndMaxHeight(n, 18, t)
        }
    },
    "offsetForTopicBadge": function(e, t, i) {
        var n;
        return e.hasClass("item_withtopic") && (n = i, e.hasClass("item_type_normal_excerpt") && (n += 12), e.hasClass("shared_to") && (n += 35)), n
    },
    "executeTopicBadgeOffset": function(e, t, i) {
        "undefined" != typeof t && "wide_split" != i && "normal_image" != i && e.find(".topic_detail").css("top", t + "px")
    },
    "reflowTiles": function() {
        if (this.c) {
            var e = tilesPerRow();
            this.c.tiles = 0, this.c.leftInRow = e, this.c.last = [];
            for (var t, i, n = this.queueList.children(".item:not(.marked)"), a = 0; a < n.length; a++) t = $(n[a]), t.removeClass("adjusted"), i = 1 * t.data("ts"), i > this.c.leftInRow && (t.removeClass("item_type_" + t.data("tiletype")), t.addClass("item_type_normal"), t.data("tiletype", "normal"), t.data("ts", 1), i = 1), this.c.tiles += i, this.c.leftInRow -= i, this.c.last[t.data("tiletype")] = this.c.tiles, this.c.leftInRow <= 0 && (this.c.leftInRow = e);
            this.adjustTiles()
        }
    },
    "checkTilesTagOverflow": function() {
        var e = this,
            t = this.queueList.children(".item:not(.adjusted)");
        $.each(t, function(t, i) {
            e.checkTileTagOverflow(i)
        })
    },
    "checkTileTagOverflow": function(e, t) {
        var i = $(e),
            n = i.find(".tag_container"),
            a = i.hasClass("item_withoverflowtags"),
            s = t ? t : 500;
        if (n.width() >= s) {
            i.addClass("item_withoverflowtags");
            for (var o = n.find(".tag"), r = '<div class="tag-overflow-container clearfix">', l = 0, c = o.length - 1; c > 0; c--) o.eq(c).position().left <= 0 && c > 0 && (l = c);
            for (var c = l; c < o.length; c++) o.eq(c).addClass("tag-overflow"), r += o[c].outerHTML;
            r += "</div>";
            var u = i.find(".tag-overflow-link");
            u.length && u.remove();
            var d = $('<a class="tag-overflow-link" href="#">' + Templating.callTrans("queue.moretags").replace(/{(.*)}/i, o.length - l) + "</a>");
            d.click(function(e) {
                e.preventDefault();
                var t = $(this).data("content"),
                    i = new PopOver("tagMenu", t, $("#container"), {
                        "positions": ["bottom", "top"],
                        "hideOnClickInPopover": !1,
                        "xOffset": 0,
                        "disableHideOnScroll": !0
                    });
                i.show($(this))
            }), d.data("content", r), n.after(d)
        } else a && (i.removeClass("item_withoverflowtags"), i.find(".tag-overflow-link").remove())
    },
    "listIsDoneLoading": function() {
        this.queueList.parent().removeClass("loading"), this.loading = !1, this.loadingRow && this.loadingRow.hide()
    },
    "reloadListError": function() {
        this.showEmpty(!0, {
            "img": !1,
            "title": Templating.callTrans("notification.uhoh"),
            "message": Templating.callTrans("notification.unexpectederror")
        }), this.listIsDoneLoading(!1)
    },
    "listIsEmpty": function() {
        var e = this.queueList.children(".item").size(),
            t = this.queueList.children(".item.removed").size();
        return 0 >= e - t
    },
    "checkIfRunningLow": function() {
        this.listIsEmpty() && (this.remaining ? this.reloadList({
            "append": !0
        }) : this.showEmpty(!0))
    },
    "startLazyLoadImages": function() {
        this.processLazyLoadScroll(), $(document).smartscroll(function() {
            this.processLazyLoadScroll()
        }.bind(this))
    },
    "processLazyLoadScroll": function() {
        this.imagesLoading = this.imagesLoading || {};
        var e = $(".lazy-load");
        $.each(e, function(e, t) {
            var i = $(t),
                n = i.attr("data-lazy-type"),
                a = n + ":" + i.attr("data-lazy-key"),
                s = "undefined" != typeof this.imagesLoading[a];
            if (!s && elementCloseInViewport(t)) {
                this.imagesLoading[a] = !0;
                var o = function() {
                    i.removeClass("lazy-load").addClass("lazy-active"), delete this.imagesLoading[a]
                }.bind(this);
                "thumbnail" === n ? this.loadThumbnailImageLazy(i, o) : "favicon" === n && this.loadFaviconLazy(i, o)
            }
        }.bind(this))
    },
    "loadFaviconLazy": function(e, t) {
        e.attr("src", e.attr("data-favicon-url")), t()
    },
    "loadThumbnailImageLazy": function(e, t) {
        var i, n, a = e.attr("data-thumburl"),
            s = parseInt(e.data("variant"), 10),
            o = ("true" === e.attr("data-shouldcache"), window.devicePixelRatio || 1);
        if (1 === s) {
            i = "url(/a/i/tile_graphic_site@1x.png)", n = "url(/a/i/tile_fallback@1x.jpg)";
            var r = "";
            r += "url('" + a + "'),", r += i + "," + n, o > 1 && (r = r.replace("1x.jpg", "2x.jpg").replace("1x.png", "2x.png")), e.addClass("thumb-wimage"), e.css("background-image", r), t()
        } else if (2 === s) {
            var l = e.attr("data-tileclass"),
                r = "",
                c = "url(/a/i/play@1x.png),",
                u = "normal_video" == l ? c : "",
                d = "url('" + a + "')";

            r += u + d, o > 1 && (r = r.replace("1x.png", "2x.png")), e.css("background-image", r), t()
        } else if (3 === s) {
            n = "url(/a/i/tile_fallback@1x.jpg)", o > 1 && (n = n.replace("1x.jpg", "2x.jpg").replace("1x.png", "2x.png"));
            var h = "true" === e.attr("data-hasplaybutton"),
                c = "url(/a/i/play@1x.png),",
                u = h ? c : "",
                d = "url('" + a + "')",
                r = u + d;
            o > 1 && (r = r.replace("1x.png", "2x.png")), e.css("background-image", r);
            var p = (h ? "50px 50px, " : "") + "cover, auto";
            o > 1 && (p = (h ? "50px 50px, " : "") + "cover, 844px 591px");
            var f = (h ? "center, " : "") + "center, center";
            e.css("background-size", p), e.css("background-position", f), t()
        } else if (4 === s) {
            var g = "/a/i/tile_fallback@1x.jpg";
            o > 1 && (g = g.replace("1x.jpg", "2x.jpg").replace("1x.png", "2x.png")), e.css("background-image", "url('" + g + "')"), e.css("background-repeat", "repeat"), e.css("background-size", "auto"), t()
        }
    },
    "getTaggedWithMessage": function(e) {
        return e ? e == TagSidebar.UNTAGGED ? " " + Templating.callTrans("tag.areuntagged") : " " + Templating.callTrans("tag.havebeentaggedwith") + " <em>" + sanitizeText(e) + "</em>" : ""
    },
    "showEmpty": function(e, t) {
        if (e) {
            var i, n, a, s = this.contentTypeControl.key();
            if (s = Templating.callTrans(s ? "search." + s + "s" : "search.items"), t) a = t.img, i = t.title, n = t.message;
            else {
                var o = this.getCurrentLocation().state;
                this.searchField.val().length ? (a = "search", i = Templating.callTrans("search.noresultsfound"), n = "allitems" == this.searchSectionFilter ? Templating.callTrans("search.nomatchesforsearch") : tagSidebar.selectedTag ? Templating.callTrans("search.matchedyoursearchforwtags").replace("xxxxx", s).replace("yyyyy", Templating.callTrans("queue.search_" + this.searchSectionFilter)).replace("zzzzz", this.getTaggedWithMessage(tagSidebar.selectedTag)).replace("aaaaa", sanitizeText(this.searchField.val().trim())) : Templating.callTrans("search.matchedyoursearchfor").replace("xxxxx", s).replace("yyyyy", Templating.callTrans("queue.search_" + this.searchSectionFilter)).replace("aaaaa", sanitizeText(this.searchField.val().trim()))) : tagSidebar.selectedTag ? (a = "tag", i = Templating.callTrans(tagSidebar.selectedTag == TagSidebar.UNTAGGED ? "tag.nountaggeditems" : "tag.nottagged"), n = Templating.callTrans("search.nobeentagged").replace("xxxxx", s).replace("yyyyy", Templating.callTrans("queue.section_" + o.section.toLowerCase())).replace("zzzzz", this.getTaggedWithMessage(tagSidebar.selectedTag))) : s != Templating.callTrans("search.items") ? (a = o.section, i = Templating.callTrans("search.nofound", null, null, s), n = Templating.callTrans("search.thereareno") + " " + s + " " + Templating.callTrans("search.inyour") + " " + Templating.callTrans("queue.section_" + o.section.toLowerCase()) + ".") : "queue" == o.section || "home" == o.section ? (a = "queue", i = Templating.callTrans("search.yourqueueisempty"), n = Templating.callTrans("search.learnhowexpanded", "<a href='http://getpocket.com/welcome' target='_blank'>", "</a>")) : "favorites" == o.section ? (a = "favorites", i = Templating.callTrans("search.youhavenofavorites"), n = Templating.callTrans("search.favoritesemptymsg")) : "archive" == o.section && (a = "archive", i = "Your Archive is Empty", n = Templating.callTrans("search.archiveemptymsg").replace("*", "")), "queue" != o.section && "home" != o.section || !boot.GSFStatus.active || "object" != typeof boot.GSFStatus.saveditems || this.searchField.val().length || $(".item_placeholder").length || (dictJSON.manual.placeholderdesc = 1, dictJSON.manual.placeholderwextension = boot.GSFStatus.extinstalled || PocketUserApps.ready && PocketUserApps.installedExtension(), $("#queue").prepend(Handlebars.templates.queue_placeholder(dictJSON)), this.gsfAddPlaceholderEvents()), "queue" != o.section && "home" != o.section || boot.ExternalUserSettings.sawemptynotice || this.searchField.val().length || tagSidebar.selectedTag || /YaBrowser/.test(navigator.userAgent) || boot.GSFStatus.extinstalled || boot.ExternalUserSettings.extinstalled || PocketUserApps.ready && PocketUserApps.installedExtension() || ServerSettings.fromSignupInstalled || (n = Handlebars.templates.queue_noticecontainer(dictJSON), n = n.replace(/\*(.*)\*/i, "<strong>$1</strong>").replace(/\*(.*)\*/i, '<a href="http://getpocket.com/add?sb=1" target="_blank">$1</a>'), boot.ExternalUserSettings.sawemptynotice = !0, boot.saveExternalUserSettings())
            }
            $("#queue_empty").length || (this.emptyCell = $('<div id="queue_empty"></div>'), this.emptyCell.html("<h3></h3><p></p>"), $("#queue").append(this.emptyCell));
            var r = this.emptyCell.children("h3");
            r.html((a ? '<img src="/a/i/icon_m_' + a.toLowerCase() + '.png" />' : "") + i), a && this.emptyCell.find("img").addClass("img-" + a), this.emptyCell.children("p").html(n), n.indexOf("notice_container") > -1 && setTimeout(function() {
                $(".notice_container").addClass("notice_container_active")
            }, 50)
        }(!boot.GSFStatus.active || "queue" != this.state.section && "home" != this.state.section || this.searchField.val().length || tagSidebar.selectedTag) && $("#queue").toggleClass("queue_empty", e)
    },
    "setView": function(e) {
        this.selectedView != e && (this.queueList.parent().addClass("loading"), this.selectedView && ($("#page_queue").removeClass("page_queue_" + this.selectedView), $("#page .pkt-nav .leftItem .selected").removeClass("selected")), $(window).width() < this.BREAK_ITEM_COLUMNS_TWO && (e = "list"), $("#page_queue").addClass("page_queue_" + e), $(".pagenav_gridlist").removeClass("pagenav_gridview pagenav_listview").addClass("pagenav_" + e + "view"), this.showBulkEdit(!1), this.selectedView = e)
    },
    "showArticleFilterMenu": function(e) {
        !this.articleFilterMenu, this.articleFilterMenu.show(e), this.articleFilterMenu.object.css("display", "block")
    },
    "showShareMenu": function(e) {
        var t = this;
        if (e) {
            e = $(e);
            var i = e.parents(".item");
            if (this.sharedItem = t.itemsByID[e.parents(".item").attr("id").replace(/i([0-9]+)/, "$1")], this.shareAnchor = e, !this.shareMenu) {
                for (var n = [], a = 0; a < Sharer.sharers.length; a++) {
                    var s = Sharer.sharers[a];
                    n.push(dsi(a, s.name))
                }
                var o = new DropSelector({
                    "id": "shareMenuContents",
                    "class": "titleItem shareMenuSelector",
                    "nodeName": "h2",
                    "append": $("#container"),
                    "list": n,
                    "selectCallback": function(e, i) {
                        var n = $(i).attr("val"),
                            a = Sharer.sharers[n];
                        return a ? (t.shareMenu.show(!1), a.share(t.sharedItem, t.shareAnchor), !0) : !1
                    },
                    "callback": function() {},
                    "hideUntilSet": !0
                });
                this.shareMenu = new PopOver("shareMenu", o.ul, $("#container"), {
                    "onHide": function() {
                        $(".pendingDialog").removeClass("pendingDialog")
                    },
                    "positions": ["bottom", "bottomright", "bottomleft", "top", "topleft", "topright"],
                    "headerTitle": "Share",
                    "xOffset": 0
                }), this.shareMenu.sizeObject = o.ul;
                for (var r = this.shareMenu.object.find("li"), a = 0; a < r.length; a++) {
                    var l = $(r[a]),
                        c = l.find("a"),
                        u = Sharer.sharers[parseInt(l.attr("val"), 10)],
                        d = u.iconname;
                    c.addClass("share-" + d).append('<span class="share-icon share-' + d + '-icon">')
                }
                o.object.remove(), this.shareMenu.object.addClass("titleSelector")
            }
            var h = $(this.shareMenu.sizeObject).find(".share-permanent").parent("li");
            if (h.length) {
                var s = Sharer.sharers[h.attr("val")];
                s && s.setPermanentLink("http://" + (document.location.hostname || document.location.host) + "/library/?pl_i=" + t.sharedItem.item_id, h)
            }
            var p = $(this.shareMenu.sizeObject).find(".share-original").parent("li");
            if (p.length) {
                var s = Sharer.sharers[p.attr("val")];
                if (s) {
                    var f = t.sharedItem.resolved_url || t.sharedItem.given_url || t.sharedItem.original_url || t.sharedItem.url;
                    s.setExternalLink(f, p)
                }
            }
        }
        i.toggleClass("pendingDialog", void 0 != e), this.shareMenu.show(e)
    },
    "confirmDelete": function(e) {
        var t = $(e).closest(".item"),
            i = t.attr("id").replace(/^i/, ""),
            n = this;
        createDialog({
            "anchor": $(e),
            "title": Templating.callTrans("confirm.areyousure"),
            "message": !1,
            "xOffset": 4,
            "confirm": {
                "title": Templating.callTrans("cta.delete"),
                "action": function() {
                    n.takeActionOnItem("delete", !0, i, void 0, !0)
                }
            },
            "onShow": function() {
                t.addClass("pendingDialog")
            },
            "onHide": function() {
                t.removeClass("pendingDialog")
            }
        })
    },
    "showConfirmDialog": function(e, t, i, n, a) {
        if ("string" == typeof e || "string" == typeof t) {
            var s = '<div class="overlay_detail ';
            if (s += "string" == typeof i ? 'overlay_detail_confirm">' : 'webview_warning">', "string" == typeof e && (s += "<h3>" + e + "</h3>"), "string" == typeof t)
                for (var o = t.split("|"), r = 0; r < o.length; r++) s += "<p>" + o[r] + "</p>";
            "string" == typeof i ? (dictJSON.manual.confirmbuttontext = i, s += Handlebars.templates.queue_confirmdialog_cancel(dictJSON)) : s += Handlebars.templates.queue_confirmdialog_nocancel(dictJSON), OverlayScreen.setDetail(s), OverlayScreen.show();
            var l = $(".overlay_detail");
            "string" == typeof i && l.find(".button-cancel").click(function(e) {
                e.preventDefault(), OverlayScreen.hide(), "function" == typeof a && a()
            }), l.find(".button-confirm").click(function(e) {
                e.preventDefault(), OverlayScreen.hide(), "function" == typeof n && n()
            })
        }
    },
    "tagsReady": function(e, t) {
        this.buildPopoverTagList(e)
    },
    "buildPopoverTagList": function(e) {
        "/a/queue/" == queue.tagUrlPrefix && (queue.tagUrlPrefix = "/a/queue/grid/"), this.tagList = [];
        var t = $("#pagenav_tagfilter ul");
        t.parent().find(".tagfilter_loading").remove(), t.children().remove(), t.append('<li val="all"><a href="' + queue.baseTagUrlPrefix + '">' + Templating.callTrans("queue.allitems") + "</a></li>"), t.append('<li val="untagged"><a href="' + queue.baseTagUrlPrefix + '_untagged_">' + Templating.callTrans("queue.tag_untaggeditems") + "</a></li>");
        for (var i = 0; i < e.length; i++) $.trim(sanitizeText(e[i])).length && (this.tagList.push(sanitizeText(e[i])), t.append('<li val="' + encodeURIComponent(sanitizeText(e[i])) + '"><a href="' + queue.baseTagUrlPrefix + encodeURIComponent(sanitizeText(e[i])) + '">' + sanitizeText(e[i]) + "</a></li>"));
        this.tagListBuilt = !0, $(".tag_clear").attr("href", queue.baseTagUrlPrefix)
    },
    "actionToggle": function(e, t) {
        var i = $(t).closest(".item"),
            n = i.attr("id").replace(/^i/, "");
        this.takeActionOnItem(e, !$(t).parent().hasClass("selected"), n, void 0, !0)
    },
    "takeActionOnItem": function(e, t, i, n, a) {
        if (i) {
            var n = n ? n : 0,
                s = this,
                o = this.inited ? $("#i" + i) : !1,
                r = !1,
                l = this.itemsByID[i],
                c = {
                    "itemId": i,
                    "itemUrl": l.resolved_url ? l.resolved_url : l.given_url,
                    "itemTitle": l.resolved_title ? l.resolved_title : l.given_title
                };
            if ("mark" == e ? (c.action = "mark", c.on = t ? 1 : 0, o && (o.addClass("marked"), (!this.searchStateMode && ("queue" == this.stateSelector.value && t || "archive" == this.stateSelector.value && !t) || this.searchStateMode && ("allitems" !== s.searchSectionFilter || "mylist" == s.searchSectionFilter && t || "archive" == s.searchSectionFilter && !t)) && (r = !0, this.items.splice($.inArray(l, this.items), 1), delete this.itemsByID[l.item_id]), o.find(".action_mark").toggleClass("selected", t).toggleClass("action_mark_archived", t), this.batch || (c.on ? (sharedToast.show(Templating.callTrans("notification.itemarchived")), boot.GSFStatus.active && (boot.ExternalUserSettings.sawarchivetooltip ? s.gsfRecenterTooltip(2e3) : s.gsfCheckArchiveTooltip(2e3))) : sharedToast.show(Templating.callTrans("notification.addedtolist")), setTimeout(function() {
                s.checkBulkEditLogic()
            }, 300)))) : "favorite" == e ? (c.action = "favorite", c.on = t ? 1 : 0, o && (l.favorite = c.on, o.addClass("marked"), "favorites" != this.stateSelector.value || t || (r = !0), o.find(".action_favorite").toggleClass("selected", t), o.toggleClass("item_state_favorited", t), this.batch || this.checkBulkEditLogic())) : "delete" == e && t && (c.action = "delete", c.on = 1, o && (this.items.splice($.inArray(l, this.items), 1), delete this.itemsByID[l.item_id], o.addClass("marked"), r = !0, o.find(".action_delete").toggleClass("selected", t), this.batch || (sharedToast.show(Templating.callTrans("notification.itemdeleted")), boot.GSFStatus.active && s.gsfRecenterTooltip(2e3), setTimeout(function() {
                s.checkBulkEditLogic()
            }, 300)))), !this.batch && a && queue.data.itemAction({
                "data": c
            }), o) {
                if (r) {
                    var u = !1,
                        d = !1;
                    this.batch && ("list" == queue.selectedView || $(window).width() < queue.BREAK_ITEM_COLUMNS_TWO ? (u = !0, $(".item_bulkeditselected").each(function(e, t) {
                        var i = $(t).outerHeight();
                        $(t).nextUntil(".item_bulkeditselected").each(function(e, t) {
                            var n = $(t).data("moveheight");
                            "undefined" == typeof n ? $(t).data("moveheight", i) : $(t).data("moveheight", parseInt(i) + parseInt(n))
                        })
                    })) : d = !0), setTimeout(function() {
                        o.addClass("removed");
                        var e;
                        if (!Modernizr.csstransitions) {
                            e = {
                                "opacity": "hide"
                            }, "grid" == s.selectedView ? e.width = "hide" : e.height = "hide";
                            var t = o.find(".thumb");
                            if (t.size()) {
                                var i = t.css("background-size");
                                if (i) {
                                    var a, r, l = i.indexOf(" ");
                                    if (~l ? (a = i.substr(0, l), r = l + 1 < i.length ? i.substr(l + 1) : a) : (r = i, a = i), ~a.indexOf("auto") && (a = "100%"), ~a.indexOf("%")) {
                                        var c = Math.round(parseInt(a.replace("%", "")) / 100 * t.width());
                                        t.css("background-size", c + "px " + r)
                                    }
                                }
                            }
                        }
                        if (Modernizr.csstransitions) {
                            if (!d)
                                if ("grid" == queue.selectedView && $(window).width() >= queue.BREAK_ITEM_COLUMNS_TWO) {
                                    for (var h = o.outerWidth(), p = o.offset().top, f = o.next(".item"); f.length && (f.hasClass("removed") || f.offset().top == p);) f.addClass("item-column-shift"), f = f.next(".item");
                                    $(".item-column-shift").css("transform", "translate3d(-" + h + "px,0,0)")
                                } else {
                                    var g = o.outerHeight();
                                    o.nextAll(".item").addClass("item-column-shift"), u ? $(".item-column-shift").each(function(e, t) {
                                        var i = $(t).data("moveheight");
                                        ("undefined" == typeof i || "0" == i) && (i = g), $(t).css("transform", "translate3d(0,-" + i + "px,0)")
                                    }) : $(".item-column-shift").css("transform", "translate3d(0,-" + g + "px,0)")
                                }
                            o.on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function(e) {
                                $(e.target).hasClass("item") && ($(e.target).off("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd").hide(), $(".item-column-shift").removeClass("item-column-shift").css("transform", "translate3d(0,0,0)"), s.reflowTiles(), s.highlightItemCheckDeletedMarked(), s.processLazyLoadScroll(), u && $(".item").data("moveheight", 0))
                            }), o.addClass("item-column-hidden")
                        } else setTimeout(function() {
                            o.animate(e, 333), s.reflowTiles(), s.highlightItemCheckDeletedMarked()
                        }, n)
                    }, n), clearTimeout(this.checkIfNeedsMoreTO), this.checkIfNeedsMoreTO = setTimeout(function() {
                        s.checkIfRunningLow()
                    }, n + 100)
                } else this.addButtonsToRow(!1, o);
                this.batch || this.checkIfRunningLow()
            }
        }
    },
    "addButtonsToRow": function(e, t, i) {
        function n(e) {
            return a.bulkEditMode || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey
        }
        var a = this,
            t = t || $(e),
            i = i || {};
        IsolateScreen.showing && IsolateScreen.anchor.parent(".item").attr("id") == t.attr("id") || 0 === t.find(".buttons").size() && (dictJSON.manual.item_buttonarchived = i.archived ? "selected" : "", dictJSON.manual.item_buttonfavorited = i.favorite ? "selected" : "", t.find(".item_content").append(Handlebars.templates.queue_itembuttons(dictJSON)), dictJSON.manual.item_buttonfavorited && t.addClass("item_state_favorited"), t.find(".action_mark a").click(function(e) {
            e.preventDefault(), n(e) || (a.actionToggle("mark", this), PocketAnalytics.action("itemaction_mark", "interact", "webapp"))
        }), t.find(".action_delete a").click(function(e) {
            e.preventDefault(), n(e) || (a.confirmDelete(this), PocketAnalytics.action("itemaction_delete", "interact", "webapp"))
        }), t.find(".action_tag a").click(function(e) {
            e.preventDefault(), n(e) || (a.editItemTags(this), PocketAnalytics.action("itemaction_edittags", "interact", "webapp"))
        }), t.find(".action_favorite a").click(function(e) {
            e.preventDefault(), n(e) || (a.actionToggle("favorite", this), PocketAnalytics.action("itemaction_favorite", "interact", "webapp"))
        }), t.find(".action_share a").click(function(e) {
            e.preventDefault(), n(e) || (a.showShareMenu(this), PocketAnalytics.action("itemaction_share", "interact", "webapp"))
        }), t.find(".buttons a").click(function(e) {
            !n(e) && a.searchStateMode && a.saveSearchStateToPrevSearches()
        }))
    },
    "checkUserValidPassword": function() {
        function e(e, t) {
            var i = $("#" + e).parents(".form-field"),
                n = i.find(".error-bubble");
            if (t) {
                var a = n.height();
                a > 16 ? n.addClass("error-bubble-twoliner") : n.removeClass("error-bubble-twoliner"), i.hasClass("form-field-error") || i.removeClass("form-field-verified"), i.addClass("form-field-error")
            } else i.hasClass("form-field-verified") || (i.addClass("form-field-verified"), PocketAnalytics.action("verified_" + $("#" + e).attr("id"), "interact", "webapp")), i.removeClass("form-field-error")
        }

        function t(t) {
            if ("undefined" == typeof t || "blur" == t.type && $(this).val().length || $(t.target).parent().hasClass("form-field-error")) {
                var i = this;
                return "undefined" == typeof t && (i = $("#password")), $.trim($(i).val()).length < 6 ? (e("password", !0), !1) : (e("password", !1), !0)
            }
        }
        var i = this;
        PocketAnalytics.action("addpassword", "view", "webapp"), ServerSettings.fromSignupInstalledFF && (ServerSettings.altGSF ? (boot.GSFStatus = {
            "active": !0,
            "sawinitoverlay": !1,
            "savedfirstitem": !1,
            "confirmedfirstsavedetail": !1,
            "firstsavewebviewonly": !1,
            "confirmedreaderviewdetail": !1,
            "confirmedmobilepopup": !1,
            "confirmedreadinglistdetail": !1,
            "needsoneitemplaceholder": !0,
            "extinstalledFFemail": !1,
            "extinstalledFFfxa": !1,
            "gsfProgressMax": 6,
            "gsfMode": "buttonlong"
        }, "string" == typeof ServerSettings.altGSFMode && ServerSettings.altGSFMode && (boot.GSFStatus.gsfMode = ServerSettings.altGSFMode), ("buttonshort" == boot.GSFStatus.gsfMode || "inceptionshort" == boot.GSFStatus.gsfMode) && (boot.GSFStatus.gsfProgressMax = 3), "buttonshortreturnpocket" == boot.GSFStatus.gsfMode && (boot.GSFStatus.gsfProgressMax = 4)) : (boot.GSFStatus = {
            "active": !0,
            "sawinitoverlay": !1,
            "postextensioninitoverlay": !0,
            "extinstalled": !0,
            "extinstalledFFemail": !1,
            "extinstalledFFfxa": !1,
            "articleview": !1,
            "articleviewconfirm": !1,
            "articleviewitemactions": !1,
            "saveditems": []
        }, boot.GSFStatus.extinstalled = !0), "ff_email" == ServerSettings.fromSignupInstalledFF && (boot.GSFStatus.extinstalledFFemail = !0), "ff_fxa" == ServerSettings.fromSignupInstalledFF && (boot.GSFStatus.extinstalledFFfxa = !0), boot.saveGSFStatus());
        var n = $(Handlebars.templates.init_requirepassword(dictJSON));
        n.find(".email").html(PromptPassword.email), n.find(".name").html(PromptPassword.name), "object" == typeof PocketUserApps && "string" == typeof PocketUserApps.userName && n.find(".extrausername").val(PocketUserApps.userName);
        var a = PromptPassword.avatar;
        (boot.GSFStatus.extinstalledFFemail || boot.GSFStatus.extinstalledFFfxa) && (a = "/a/i/gsf/gsf_ffemptyavatar@2x.png"), "" != a && "string" == typeof a && (a = a.split("?")[0] + "?sz=160", n.find(".avatar").css({
            "backgroundColor": "transparent",
            "backgroundImage": "url(" + a + ")"
        })), OverlayScreen.setDetail(n), OverlayScreen.show(), n.find(".form-changepassword").append($('input[name="ct"]'), $(".onetimetoken")), OverlayScreen.overlayScreen.addClass("overlay_screen_light"), setTimeout(function() {
            $(".overlay_createpasswordcontainer").find("#password").focus()
        }, 50), $("#password").on("keyup blur", t).on("focus", function(e) {
            PocketAnalytics.action("addpassword_focus", "interact", "webapp")
        }).on("blur", function(e) {
            PocketAnalytics.action("addpassword_blur", "interact", "webapp")
        }), $(".password-btn-add").click(function(e) {
            function n(e) {
                var t = {}, i = e.serializeArray();
                return $.each(i, function() {
                    t[this.name] ? (t[this.name].push || (t[this.name] = [t[this.name]]), t[this.name].push(this.value || "")) : t[this.name] = this.value || ""
                }), t
            }
            if (e.preventDefault(), !$(this).hasClass("button-disabled")) {
                var a = this;
                if ($(this).addClass("button-disabled"), $(".form-changepassword").addClass("password-processing"), t()) {
                    var s = n($(".form-changepassword"));
                    s.source = "google", s.is_ajax = 1, $.ajax({
                        "url": "/changepass_process.php",
                        "data": s,
                        "dataType": "json",
                        "type": "POST",
                        "success": function(e) {
                            if ("number" == typeof e.status) {
                                if (!e.status) return PocketAnalytics.action("addpassword_form_error", "interact", "webapp"), $(".overlay_createpasswordcontainer .form-error").remove(), $(".overlay_createpasswordcontainer h2").after('<div class="form-error">' + e.error_msg + "</div>"), $(".form-changepassword").removeClass("password-processing"), void $(a).removeClass("button-disabled");
                                boot.ExternalUserSettings.haspassword = !0, boot.saveExternalUserSettings(), $(".overlay_createpasswordcontainer .form-error").remove(), $(".overlay_createpasswordcontainer .form-msg").addClass("form-msg-active"), PocketAnalytics.action("addpassword_form_success", "interact", "webapp"), setTimeout(function() {
                                    i.showEmpty(!1), OverlayScreen.overlayScreen.find(".content_detail").html(""), OverlayScreen.overlayScreen.removeClass("overlay_screen_light"), OverlayScreen.hide(), setTimeout(function() {
                                        i.reloadList()
                                    }, 500)
                                }, 2e3)
                            }
                        },
                        "error": function(e, t) {
                            return "abort" == t ? (PocketAnalytics.action("addpassword_error", "interact", "webapp"), $(".form-changepassword").removeClass("password-processing"), void $(a).removeClass("button-disabled")) : void 0
                        },
                        "complete": function(e, t) {
                            return "abort" == t ? (PocketAnalytics.action("addpassword_error", "interact", "webapp"), $(".form-changepassword").removeClass("password-processing"), void $(a).removeClass("button-disabled")) : void 0
                        }
                    })
                } else PocketAnalytics.action("addpassword_error", "interact", "webapp"), $(".form-changepassword").removeClass("password-processing"), $(a).removeClass("button-disabled"), $("#password").focus()
            }
        })
    },
    "gsfInitialize": function() {
        if (!ServerSettings.altGSF && "boolean" != typeof boot.GSFStatus.savedfirstitem || "object" == typeof boot.GSFStatus.saveditems) {
            if ("undefined" == typeof boot.GSFStatus.active && (boot.GSFStatus = {
                "active": !1,
                "sawinitoverlay": !1,
                "postextensioninitoverlay": !1,
                "extinstalled": !1,
                "extinstalledFFemail": !1,
                "extinstalledFFfxa": !1,
                "articleview": !1,
                "articleviewconfirm": !1,
                "articleviewitemactions": !1,
                "saveditems": []
            }, ServerSettings.fromSignup && "function" == typeof ga && ga("send", "pageview", {
                "page": "/a/queue_conversion",
                "title": "New User Conversion"
            }), Modernizr.localstorage && (ServerSettings.fromSignup || ServerSettings.fromLoginGsf) && !this.items.length ? (boot.GSFStatus.active = !0, boot.ExternalUserSettings.sawbundleupsell = !0, boot.ExternalUserSettings.sawarchivetooltip = !1, boot.ExternalUserSettings.sawbetawelcome = !0, boot.saveExternalUserSettings()) : boot.ExternalUserSettings.sawbundleupsell = !0), boot.saveGSFStatus(), !boot.GSFStatus.active || !boot.pages.queue.isOpen || "queue" != this.state.section && "home" != this.state.section || this.searchField.val().length) return;
            $("#queue").hasClass("queue_empty") && ($("#queue").removeClass("queue_empty"), ".item_placeholder".length || "object" != typeof boot.GSFStatus.saveditems || (dictJSON.manual.placeholderdesc = 1, dictJSON.manual.placeholderwextension = boot.GSFStatus.extinstalled || PocketUserApps.ready && PocketUserApps.installedExtension(), $("#queue").prepend(Handlebars.templates.queue_placeholder(dictJSON)), this.gsfAddPlaceholderEvents())), boot.GSFStatus.sawinitoverlay || $(".overlay_detail").is(":visible") ? this.gsfCheckLogic() : this.gsfOpenInitOverlay()
        } else {
            if ("undefined" == typeof boot.GSFStatus.active && (boot.GSFStatus = {
                "active": !1,
                "sawinitoverlay": !1,
                "savedfirstitem": !1,
                "confirmedfirstsavedetail": !1,
                "firstsavewebviewonly": !1,
                "confirmedreaderviewdetail": !1,
                "confirmedmobilepopup": !1,
                "confirmedreadinglistdetail": !1,
                "needsoneitemplaceholder": !1,
                "extinstalledFFemail": !1,
                "extinstalledFFfxa": !1,
                "gsfProgressMax": 6,
                "gsfMode": "buttonlong"
            }, ServerSettings.fromSignup && "function" == typeof ga && ga("send", "pageview", {
                "page": "/a/queue_conversion",
                "title": "New User Conversion"
            }), ServerSettings.fromSignup && !this.items.length && (boot.GSFStatus.active = !0, boot.GSFStatus.needsoneitemplaceholder = !0, boot.ExternalUserSettings.sawbundleupsell = !0, boot.ExternalUserSettings.sawarchivetooltip = !1, boot.ExternalUserSettings.sawbetawelcome = !0, "string" == typeof ServerSettings.altGSFMode && ServerSettings.altGSFMode && (boot.GSFStatus.gsfMode = ServerSettings.altGSFMode), ("buttonshort" == boot.GSFStatus.gsfMode || "inceptionshort" == boot.GSFStatus.gsfMode) && (boot.GSFStatus.gsfProgressMax = 3), "buttonshortreturnpocket" == boot.GSFStatus.gsfMode && (boot.GSFStatus.gsfProgressMax = 4), boot.saveExternalUserSettings()), boot.saveGSFStatus()), this.gsfCheckOneItemPlaceholder(), !boot.GSFStatus.active || !boot.pages.queue.isOpen || "queue" != this.state.section && "home" != this.state.section || this.searchField.val().length) return;
            $("#queue").hasClass("queue_empty") && ($("#queue").removeClass("queue_empty"), ".item_placeholder".length || "object" != typeof boot.GSFStatus.saveditems || (dictJSON.manual.placeholderdesc = 1, dictJSON.manual.placeholderwextension = boot.GSFStatus.extinstalled || PocketUserApps.ready && PocketUserApps.installedExtension(), $("#queue").prepend(Handlebars.templates.queue_placeholder(dictJSON)), this.gsfAddPlaceholderEvents())), boot.GSFStatus.sawinitoverlay || $(".overlay_detail").is(":visible") ? this.gsfCheckLogicAlt() : this.gsfOpenInitOverlayAlt(), boot.saveGSFStatus()
        }
    },
    "gsfOpenInitOverlay": function(e) {
        function t() {
            if (boot.GSFStatus.extinstalled = !0, boot.saveGSFStatus(), boot.ExternalUserSettings.extinstalled = !0, boot.saveExternalUserSettings(), !/Chrome/.test(navigator.userAgent)) return void window.open("http://getpocket.com/welcome");
            var t = $(Handlebars.templates.gsf_chromeinlineinstall(dictJSON));
            $("body").append(t), setTimeout(function() {
                t.css("backgroundColor", "rgba(0,0,0,0.8)"), t.addClass("overlay_screen_active"), -1 == navigator.userAgent.indexOf("Mac OS X") && ($(".overlay_note_container").css("marginTop", $(window).height() / 2 + 120 + "px").css({
                    "left": "-20px",
                    "backgroundPosition": "left top"
                }), $(".overlay_arrow").css("left", "200px"), $(".overlay_note_container p").css("marginLeft", "0"))
            }, 10), chrome.webstore.install("https://chrome.google.com/webstore/detail/niloccemoadcdkdjlinkgdfekeahmflj", function() {
                $(".overlay_screen_alt").removeClass("overlay_screen_active"), PocketAnalytics.action("gsf_addext_success", "view", "webapp"), setTimeout(function() {
                    $("overlay_screen_alt").remove()
                }, 1e3), e && (OverlayScreen.show(), $(".gsf_three .button").click(function(e) {
                    PocketAnalytics.action("gsf_buttonconnected_save", "click", "webapp"), OverlayScreen.hide(), i.gsfCheckLogic()
                })), $(".gsf_two,.gsf_one").removeClass("gsf_active"), $(".gsf_three").addClass("gsf_active"), PocketAnalytics.action("gsf_buttonconnected", "view", "webapp"), $(".gsf_progress").hide(), $(".overlay_detail").css("paddingBottom", "100px")
            }, function(e) {
                $(".overlay_screen_alt").removeClass("overlay_screen_active"), PocketAnalytics.action("gsf_addext_failure", "view", "webapp"), setTimeout(function() {
                    $("overlay_screen_alt").remove()
                }, 1e3), $(".overlay_screen_alt").removeClass("overlay_screen_active"), OverlayScreen.hide(), i.gsfCheckLogic()
            })
        }
        var i = this;
        "string" == typeof ServerSettings.tempP && ServerSettings.tempP.length && !boot.GSFStatus.sawinitoverlay && (dictJSON.manual.simplesignup = 1, dictJSON.manual.temppass = ServerSettings.tempP, "string" == typeof ServerSettings.tempE && ServerSettings.tempE.length && (dictJSON.manual.simplesignupnoemail = 1, dictJSON.manual.tempemail = ServerSettings.tempE)), (ServerSettings.fromSignupInstalled || boot.GSFStatus.postextensioninitoverlay) && (dictJSON.manual.termsconditions = Templating.callTrans("gsf.termsconditions", ['<a href="/tos" target="_blank">', '<a href="/privacy" target="_blank">'], ["</a>", "</a>"])), OverlayScreen.setDetail(Handlebars.templates.gsf_overlayone(dictJSON)), e ? ($(".gsf_one").removeClass("gsf_active"), t()) : (OverlayScreen.show(), OverlayScreen.overlayScreen.addClass("overlay_screen_dark"), !ServerSettings.fromSignupInstalled && !boot.GSFStatus.postextensioninitoverlay || "string" == typeof ServerSettings.tempP || "boolean" == typeof IgnoreFromInstalled && IgnoreFromInstalled || (boot.GSFStatus.postextensioninitoverlay = !0, boot.GSFStatus.extinstalled = !0, "ff_email" == ServerSettings.fromSignupInstalledFF && (boot.GSFStatus.extinstalledFFemail = !0), "ff_fxa" == ServerSettings.fromSignupInstalledFF && (boot.GSFStatus.extinstalledFFfxa = !0), boot.saveGSFStatus(), $(".gsf_two,.gsf_one").removeClass("gsf_active"), boot.GSFStatus.extinstalledFFemail || boot.GSFStatus.extinstalledFFfxa ? (boot.GSFStatus.extinstalledFFemail && $(".gsf_twopointfive").addClass("gsf_twopointfive_notos"), $(".gsf_twopointfive").addClass("gsf_active"), PocketAnalytics.action("gsf_buttonconnectedwelcome", "view", "webapp")) : ($(".gsf_three").addClass("gsf_active"), PocketAnalytics.action("gsf_buttonconnectedauto", "view", "webapp")), $(".gsf_progress").hide(), $(".overlay_detail").css("paddingBottom", "118px")), PocketAnalytics.action("gsf_congrats", "view", "webapp"), "string" == typeof ServerSettings.tempP && ($(".gsf_progress").hide(), $(".gsf_zero .button").click(function(e) {
            e.preventDefault(), !ServerSettings.fromSignupInstalled || "boolean" == typeof IgnoreFromInstalled && IgnoreFromInstalled || (boot.GSFStatus.postextensioninitoverlay = !0, boot.GSFStatus.extinstalled = !0, boot.saveGSFStatus()), PocketAnalytics.action("gsf_temppassword_getstarted", "click", "webapp"), boot.GSFStatus.sawinitoverlay = !0, boot.saveGSFStatus(), $(".gsf_zero").removeClass("gsf_active"), boot.GSFStatus.postextensioninitoverlay ? ($(".gsf_two,.gsf_one").removeClass("gsf_active"), $(".gsf_three").addClass("gsf_active"), PocketAnalytics.action("gsf_buttonconnectedauto", "view", "webapp"), $(".gsf_progress").hide(), $(".overlay_detail").css("paddingBottom", "100px")) : ($(".gsf_one").addClass("gsf_active"), $(".gsf_progress").show())
        })), $(".gsf_one .button").click(function(e) {
            if (e.preventDefault(), PocketAnalytics.action("gsf_congrats_getstarted", "click", "webapp"), boot.GSFStatus.sawinitoverlay = !0, boot.saveGSFStatus(), $(window).width() < i.BREAK_ITEM_COLUMNS_TWO || $(window).height() < 448) return OverlayScreen.hide(), void i.gsfCheckLogic();
            PocketUserApps.ready && PocketUserApps.installedExtension() && (boot.GSFStatus.extinstalled = !0, boot.saveGSFStatus(), boot.ExternalUserSettings.extinstalled = !0, boot.saveExternalUserSettings(), OverlayScreen.hide(), i.gsfCheckLogic()), $(".gsf_one").removeClass("gsf_active"), $(".gsf_two").addClass("gsf_active"), PocketAnalytics.action("gsf_savethings", "view", "webapp");
            var t = $(".gsf_progress").find("li");
            t.first().removeClass("selected"), t.last().addClass("selected")
        }), $(".gsf_two .button").click(function(e) {
            t(), PocketAnalytics.action("gsf_savethings_connectnow", "click", "webapp"), /Chrome/.test(navigator.userAgent) || (OverlayScreen.hide(), i.gsfCheckLogic())
        }), $(".gsf_twopointfive .button").click(function(e) {
            e.preventDefault(), boot.GSFStatus.sawinitoverlay = !0, boot.saveGSFStatus(), $(".gsf_sendtips").is(":visible") && boot.saveMarketingOptOutStatus("undefined" == typeof $(".gsf_sendtips:checked").val()), $(".gsf_twopointfive").removeClass("gsf_active"), $(".gsf_three").addClass("gsf_active"), PocketAnalytics.action("gsf_getstartedwelcome", "click", "webapp")
        }), $(".gsf_two .skip_link, .gsf_three .button").click(function(e) {
            e.preventDefault(), boot.GSFStatus.sawinitoverlay = !0, boot.saveGSFStatus(), OverlayScreen.hide(), i.gsfCheckLogic(), PocketAnalytics.action("gsf_savethings_exit", "click", "webapp")
        }))
    },
    "gsfOpenInitOverlayAlt": function() {
        var e = this;
        ServerSettings.fromSignupInstalled && (dictJSON.manual.termsconditions = Templating.callTrans("gsf.termsconditions", ['<a href="/tos" target="_blank">', '<a href="/privacy" target="_blank">'], ["</a>", "</a>"])), OverlayScreen.setDetail(Handlebars.templates.gsf_overlayalt(dictJSON)), OverlayScreen.show(), $(".overlay_detail").addClass("overlay_detail_gsfwelcome"), OverlayScreen.overlayScreen.addClass("overlay_screen_dark"), ServerSettings.fromSignupInstalled && ("ff_email" == ServerSettings.fromSignupInstalledFF && (boot.GSFStatus.extinstalledFFemail = !0, boot.saveGSFStatus()), "ff_fxa" == ServerSettings.fromSignupInstalledFF && (boot.GSFStatus.extinstalledFFfxa = !0, boot.saveGSFStatus()), PocketAnalytics.action("gsf_buttonconnectedwelcome", "view", "webapp")), boot.GSFStatus.extinstalledFFemail && $(".gsf_twopointfive").addClass("gsf_twopointfive_notos"), PocketAnalytics.action("gsf_buttonconnectedwelcomealt", "view", "webapp"), $(".gsf_twopointfive .button").click(function(t) {
            t.preventDefault(), boot.GSFStatus.sawinitoverlay = !0, boot.saveGSFStatus(), $(".gsf_sendtips").is(":visible") && boot.saveMarketingOptOutStatus("undefined" == typeof $(".gsf_sendtips:checked").val()), PocketAnalytics.action("gsf_getstartedwelcomealt", "click", "webapp"), OverlayScreen.hide(), e.gsfCheckLogicAlt()
        })
    },
    "gsfCheckLogic": function() {
        function e(e) {
            var t = e.attr("id").substring(1),
                i = s.itemsByID[t],
                n = /youtube.com\/watch|vimeo.com\/\d/;
            return "object" == typeof i && 2 == i.has_video || n.test(i.given_url) ? "video" : "article"
        }

        function t(e) {
            var t = !1;
            for (i = 0; i < boot.GSFStatus.saveditems.length; i++) boot.GSFStatus.saveditems[i].id == e && (t = !0);
            return t
        }

        function n() {
            var e = !1;
            for (i = 0; i < boot.GSFStatus.saveditems.length; i++) "article" == boot.GSFStatus.saveditems[i].type && (e = !0);
            return e
        }

        function a() {
            var e = !1;
            for (i = 0; i < boot.GSFStatus.saveditems.length; i++) "video" == boot.GSFStatus.saveditems[i].type && (e = !0);
            return e
        }
        var s = this;
        if (boot.GSFStatus.active && "object" == typeof boot.GSFStatus.saveditems) {
            "object" == typeof this.gsftooltip && this.gsftooltip.show(!1);
            var o = this.queueList.children(".item"),
                r = o.not(".removed,.item_placeholder"),
                l = r.length,
                c = boot.GSFStatus.saveditems.length;
            if (c >= 0 && l > 0 && !t(r.first().attr("id").substring(1)) && (boot.GSFStatus.saveditems.push({
                "id": r.first().attr("id").substring(1),
                "type": e(r.first())
            }), c++, boot.saveGSFStatus()), 3 > c && 3 > l ? $(".item_placeholder").length || ($(".item").length ? (dictJSON.manual.placeholderdesc = 0, $(".item").last().after(Handlebars.templates.queue_placeholder(dictJSON))) : (dictJSON.manual.placeholderdesc = 1, dictJSON.manual.placeholderwextension = boot.GSFStatus.extinstalled || PocketUserApps.ready && PocketUserApps.installedExtension(),
                $("#queue").prepend(Handlebars.templates.queue_placeholder(dictJSON))), this.gsfAddPlaceholderEvents()) : $(".item_placeholder").length && $(".item_placeholder").remove(), c > 2 || l > 2) {
                if ($(".gsf_device_reminder_container").length) {
                    var s = this;
                    setTimeout(function() {
                        s.gsftooltip, s.gsftooltip = 1 == ServerSettings.premUpsell ? createTooltip($(".gsf_device_reminder_container"), Templating.callTrans("gsf.explorepremium"), "", ["top"]) : createTooltip($(".gsf_device_reminder_container"), Templating.callTrans("gsf.pockettogo"), Templating.callTrans("gsf.connectmobile"), ["top"]), "gsf_tooltip_taketogo" != PocketAnalytics.prevAction && PocketAnalytics.action("gsf_tooltip_taketogo", "view", "webapp"), $("body").one("click", function() {
                            "object" == typeof s.gsftooltip && s.gsftooltip.show(!1)
                        })
                    }, 3e3)
                }
                boot.GSFStatus.active = !1, boot.saveGSFStatus(), boot.ExternalUserSettings.newreleasewelcome = !0, boot.saveExternalUserSettings()
            } else if (0 == c) ServerSettings.firstUrl && queue.addURL(ServerSettings.firstUrl), $(window).width() < s.BREAK_ITEM_COLUMNS_TWO || $(window).height() < 448 ? (this.gsftooltip = createTooltip($("#pagenav_addarticle > a"), Templating.callTrans("gsf.savefirstitem"), Templating.callTrans("gsf.addtopockethere"), ["bottomleft", "bottom"], 10), $(".pkt-nav").one("click", function(e) {
                s.gsftooltip.object.hide()
            })) : boot.GSFStatus.extinstalled || PocketUserApps.ready && PocketUserApps.installedExtension() ? (this.gsftooltip = createTooltip($(".item_placeholder"), Templating.callTrans("gsf.savefirstitem"), Templating.callTrans("gsf.ventureoutandsave", '<a href="http://getpocket.com/welcome" target="_blank">', "</a>"), null, 10), (boot.GSFStatus.extinstalledFFemail || boot.GSFStatus.extinstalledFFfxa) && $(".alt-tooltip").filter(".popover-active").find("p").last().remove()) : this.gsftooltip = createTooltip($("#pagenav_addarticle > a"), Templating.callTrans("gsf.savefirstitem"), Templating.callTrans("gsf.addtopockethere"), ["bottomleft", "bottom"], 10), "gsf_tooltip_savefirst" != PocketAnalytics.prevAction && PocketAnalytics.action("gsf_tooltip_savefirst", "view", "webapp");
            else if (c > 0 && 3 > c && !boot.GSFStatus.articleview && $(".item").not(".removed,.item_placeholder").length) {
                var u = Templating.callTrans("gsf.savedfirstitemclick");
                c > 1 && (u = Templating.callTrans("gsf.savedfirstitemclickalt")), this.gsftooltip = createTooltip($(".item").not(".removed,.item_placeholder").first(), Templating.callTrans("gsf.success") + "!", u), "gsf_tooltip_success" != PocketAnalytics.prevAction && PocketAnalytics.action("gsf_tooltip_success", "view", "webapp")
            } else if ($(window).width() < s.BREAK_ITEM_COLUMNS_TWO || $(window).height() < 448) boot.GSFStatus.active = !1, boot.saveGSFStatus(), boot.ExternalUserSettings.newreleasewelcome = !0, boot.saveExternalUserSettings();
            else if (1 == c) this.gsftooltip = createTooltip($(".item_placeholder"), Templating.callTrans("gsf.savemore"), Templating.callTrans("gsf.findarticlevideo")), "gsf_tooltip_savemore" != PocketAnalytics.prevAction && PocketAnalytics.action("gsf_tooltip_savemore", "view", "webapp");
            else if (2 == c) {
                var d = "";
                c > 2 && (d = "_" + (c - 1)), a() ? n() ? (this.gsftooltip = createTooltip($(".item_placeholder"), Templating.callTrans("gsf.savemore"), Templating.callTrans("gsf.findarticlevideo")), "gsf_tooltip_savemoreagain" != PocketAnalytics.prevAction && PocketAnalytics.action("gsf_tooltip_savemoreagain", "view", "webapp")) : (this.gsftooltip = createTooltip($(".item_placeholder"), Templating.callTrans("gsf.savedfewnice"), Templating.callTrans("gsf.perfectarticles")), PocketAnalytics.prevAction != "gsf_tooltip_savearticles" + d && PocketAnalytics.action("gsf_tooltip_savearticles" + d, "view", "webapp")) : (this.gsftooltip = createTooltip($(".item_placeholder"), Templating.callTrans("gsf.greatplacesavevideos"), Templating.callTrans("gsf.savefromyoutube")), PocketAnalytics.prevAction != "gsf_tooltip_savevideos" + d && PocketAnalytics.action("gsf_tooltip_savevideos" + d, "view", "webapp"))
            }
        }
    },
    "gsfCheckLogicAlt": function() {
        var e = this;
        if (boot.GSFStatus.active && "object" != typeof boot.GSFStatus.saveditems) {
            if (boot.GSFStatus.confirmedfirstsavedetail) {
                if (("buttonshort" == boot.GSFStatus.gsfMode || "inceptionshort" == boot.GSFStatus.gsfMode || "buttonshortreturnpocket" == boot.GSFStatus.gsfMode && boot.GSFStatus.confirmedreadinglistdetail) && !boot.GSFStatus.firstsavewebviewonly || boot.GSFStatus.confirmedreadinglistdetail) return createGSFTooltip({
                    "anchor": !1,
                    "body": Handlebars.templates.gsf_allsetup(dictJSON),
                    "position": ["centered"],
                    "progress": {
                        "size": boot.GSFStatus.gsfProgressMax,
                        "selected": boot.GSFStatus.gsfProgressMax
                    },
                    "confirmdetail": {
                        "button": !0,
                        "text": Templating.callTrans("gsf.coolgotthis"),
                        "callback": function() {
                            closeGSFTooltip(), PocketAnalytics.action("gsf_allsetup_dismiss", "click", "webapp"), e.gsfCheckOneItemPlaceholder()
                        }
                    }
                }), boot.GSFStatus.active = !1, boot.saveGSFStatus(), void PocketAnalytics.action("gsf_allsetup", "view", "webapp");
                if (boot.GSFStatus.confirmedreaderviewdetail && !boot.GSFStatus.confirmedmobilepopup) return createGSFTooltip({
                    "anchor": !1,
                    "body": Handlebars.templates.gsf_mobilepopup(dictJSON),
                    "position": ["centered"],
                    "progress": {
                        "size": boot.GSFStatus.gsfProgressMax,
                        "selected": 4
                    },
                    "confirmdetail": {
                        "button": !0,
                        "text": Templating.callTrans("cta.continue"),
                        "callback": function() {
                            closeGSFTooltip(), boot.GSFStatus.confirmedmobilepopup = !0, boot.saveGSFStatus(), e.gsfCheckLogicAlt()
                        }
                    }
                }), $(".gsf-tooltip-confirm").addClass("gsf-tooltip-confirm-inactive"), $(".gsf-tooltip-dismiss").click(function() {
                    $(".gsf-tooltip-confirm").trigger("click"), PocketAnalytics.action("gsf_mobilepopup_notnow", "click", "webapp")
                }), $(".gsf-tooltip-detail-mobile .button").click(function(e) {
                    if (e.preventDefault(), !$(this).hasClass("button-processing") && !$(this).hasClass("button-sent")) {
                        $(".gsf-tooltip-dismiss").hide(), $(this).addClass("button-processing");
                        var t = {
                            "formCheck": formCheck,
                            "infoType": "mobile_install"
                        };
                        $.ajax({
                            "url": "/web/x/requestInfo.php",
                            "type": "POST",
                            "dataType": "json",
                            "data": t,
                            "success": function(e) {
                                "number" == typeof e.status && (e.status ? ($(".button-inactive").removeClass("button-inactive"), $(".button-processing").addClass("button-inactive"), setTimeout(function() {
                                    $(".gsf-tooltip-confirm").trigger("click")
                                }, 1750)) : ($(".gsf-tooltip-dismiss").show().parent().html(Templating.callTrans("gsf.unabletosendemail")), $(".button-processing").removeClass("button-processing"), $(".gsf-tooltip-confirm").removeClass("gsf-tooltip-confirm-inactive")))
                            }
                        }), PocketAnalytics.action("gsf_mobilepopup_requestemail", "click", "webapp")
                    }
                }), void PocketAnalytics.action("gsf_mobilepopup", "view", "webapp");
                if ("buttonshortreturnpocket" == boot.GSFStatus.gsfMode || boot.GSFStatus.confirmedmobilepopup && !boot.GSFStatus.confirmedreadinglistdetail) return $(".isolate_screen_buttontargetsecond").length || $("body").append('<div class="isolate_screen_buttontargetsecond"></div>'), createGSFTooltip({
                    "anchor": $(".isolate_screen_buttontargetsecond"),
                    "body": Handlebars.templates.gsf_comingback(dictJSON),
                    "position": ["bottomleft"],
                    "progress": {
                        "size": boot.GSFStatus.gsfProgressMax,
                        "selected": "buttonshortreturnpocket" == boot.GSFStatus.gsfMode ? 3 : 5
                    },
                    "confirmdetail": {
                        "button": !0,
                        "text": Templating.callTrans("buttonshortreturnpocket" == boot.GSFStatus.gsfMode ? "gsf.gotit" : "gsf.viewmylist"),
                        "callback": function() {
                            closeGSFTooltip(), PocketAnalytics.action("gsf_readinglist_dismiss", "click", "webapp"), boot.pages.reader.isOpen && !OverlayScreen.showing ? (boot.loadStateFromUrl("/a/"), e.gsfCheckLogicAlt()) : e.gsfCheckLogicAlt()
                        }
                    },
                    "isolateall": !0,
                    "fixed": !0
                }), PocketAnalytics.action("gsf_readinglist", "view", "webapp"), currentGSFTooltip.object.addClass("gsf-tooltip-fluid").css("left", parseInt(currentGSFTooltip.object.css("left")) - 100 + "px"), void(boot.GSFStatus.confirmedreadinglistdetail = !0)
            }
            if (boot.pages.queue.isOpen) {
                var t = this.queueList.children(".item"),
                    i = t.not(".item_placeholder_gsf"),
                    n = i.length;
                if (1 > n && !boot.GSFStatus.savedfirstitem) "inceptionshort" == boot.GSFStatus.gsfMode ? e.gsfGetArticles(function() {
                    cancelFirefoxButtonListener(), listenForFirefoxButtonSave(function() {
                        queue.addURL(queue.gsfArticles.inception.link), PocketAnalytics.action("gsf_inceptionpopup_toolbar", "click", "webapp"), closeGSFTooltip()
                    }), createGSFTooltip({
                        "anchor": !1,
                        "body": Handlebars.templates.gsf_inceptionpopup(dictJSON),
                        "position": ["centered"],
                        "progress": {
                            "size": boot.GSFStatus.gsfProgressMax,
                            "selected": 1
                        },
                        "confirmdetail": {
                            "button": !0,
                            "text": Templating.callTrans("cta.continue")
                        }
                    }), $(".gsf-tooltip-confirm").addClass("gsf-tooltip-confirm-inactive"), $(".gsf-tooltip-inception-link").click(function(e) {
                        e.preventDefault(), queue.addURL(queue.gsfArticles.inception.link), PocketAnalytics.action("gsf_inceptionpopup_direct", "click", "webapp"), closeGSFTooltip()
                    }), PocketAnalytics.action("gsf_inceptionpopup", "view", "webapp")
                }) : ($(".isolate_screen_buttontarget").length || $("body").append('<div class="isolate_screen_buttontarget"></div>'), e.gsfGetArticles(function() {
                    cancelFirefoxButtonListener(), listenForFirefoxButtonSave(function() {
                        e.gsfShowSaveInWebAppWarning()
                    }), dictJSON.manual.gsftooltiptitle = queue.gsfArticles.firstitem.title, dictJSON.manual.gsftooltiplink = queue.gsfArticles.firstitem.link, dictJSON.manual.gsftooltipimgsrc = queue.gsfArticles.firstitem.imgsrc, createGSFTooltip({
                        "anchor": $(".isolate_screen_buttontarget"),
                        "headline": Templating.callTrans("gsf.savefirstitem"),
                        "body": Handlebars.templates.gsf_savefirstitem(dictJSON),
                        "position": ["bottomleft"],
                        "progress": {
                            "size": boot.GSFStatus.gsfProgressMax,
                            "selected": 1
                        },
                        "confirmdetail": {
                            "button": !0,
                            "text": Templating.callTrans("gsf.tryit"),
                            "callback": function() {
                                var e = currentGSFTooltip.object.find(".gsf-tooltip-articlelink");
                                e.length && (window.open(e.attr("href")), PocketAnalytics.action("gsf_firstitemarticle_tryit", "click", "webapp"))
                            }
                        },
                        "isolateall": !0,
                        "fixed": !0
                    }), $(".gsf-tooltip-articlelink").click(function(e) {
                        PocketAnalytics.action("gsf_firstitemarticle_direct", "click", "webapp")
                    }), PocketAnalytics.action("gsf_savefirstitem", "view", "webapp")
                }));
                else if (n > 0 && !boot.GSFStatus.confirmedfirstsavedetail) {
                    var a = i.find(".item_content").eq(0);
                    if (!a.length) return;
                    boot.GSFStatus.savedfirstitem || (boot.GSFStatus.savedfirstitem = !0, boot.saveGSFStatus());
                    var s = a.find(".item_link");
                    dictJSON.manual.gsftooltipcontent = Templating.callTrans("buttonshort" == boot.GSFStatus.gsfMode || "inceptionshort" == boot.GSFStatus.gsfMode || "buttonshortreturnpocket" == boot.GSFStatus.gsfMode || s.hasClass("start_webview") ? "gsf.itsthateasy" : "gsf.clickthearticle"), s.hasClass("start_webview") && (s.off("click.altgsfwarning"), s.on("click.altgsfwarning", function(t) {
                        t.preventDefault(), t.stopImmediatePropagation(), s.off("click.altgsfwarning"), createGSFTooltip({
                            "anchor": !1,
                            "body": Handlebars.templates.gsf_webviewclickwarning(dictJSON),
                            "position": ["centered"],
                            "progress": {
                                "size": boot.GSFStatus.gsfProgressMax,
                                "selected": 2
                            },
                            "confirmdetail": {
                                "button": !0,
                                "text": Templating.callTrans("gsf.gotit"),
                                "callback": function() {
                                    window.open(s.attr("href")), boot.GSFStatus.confirmedfirstsavedetail = !0, boot.GSFStatus.firstsavewebviewonly = !0, PocketAnalytics.action("gsf_webviewclickwarning_dismiss", "click", "webapp"), e.gsfShowWebViewOnlyWarning(), boot.saveGSFStatus()
                                }
                            }
                        }), $(".gsf-tooltip-detail").addClass("gsf-tooltip-detail-webwarning"), PocketAnalytics.action("gsf_webviewclickwarning", "view", "webapp")
                    })), cancelFirefoxButtonListener(), createGSFTooltip({
                        "anchor": a,
                        "headline": Templating.callTrans("buttonshort" == boot.GSFStatus.gsfMode || "inceptionshort" == boot.GSFStatus.gsfMode || "buttonshortreturnpocket" == boot.GSFStatus.gsfMode ? "gsf.savedtopocket" : "gsf.savedtoyourlist"),
                        "body": Handlebars.templates.gsf_simpletooltip(dictJSON),
                        "position": ["right"],
                        "progress": {
                            "size": boot.GSFStatus.gsfProgressMax,
                            "selected": 2
                        },
                        "offsetx": 10,
                        "confirmdetail": {
                            "button": !0,
                            "text": Templating.callTrans("buttonshort" == boot.GSFStatus.gsfMode || "inceptionshort" == boot.GSFStatus.gsfMode || "buttonshortreturnpocket" == boot.GSFStatus.gsfMode || s.hasClass("start_webview") ? "gsf.gotit" : "gsf.viewarticle"),
                            "callback": function() {
                                closeGSFTooltip(), boot.GSFStatus.confirmedfirstsavedetail = !0, PocketAnalytics.action("gsf_savedtolistconfirm_tooltip", "click", "webapp"), "buttonshort" !== boot.GSFStatus.gsfMode && "inceptionshort" !== boot.GSFStatus.gsfMode && "buttonshortreturnpocket" !== boot.GSFStatus.gsfMode ? s.hasClass("start_webview") ? (boot.GSFStatus.firstsavewebviewonly = !0, e.gsfShowWebViewOnlyWarning()) : s.trigger("click") : s.hasClass("start_webview") ? (boot.GSFStatus.firstsavewebviewonly = !0, e.gsfShowWebViewOnlyWarning()) : e.gsfCheckLogicAlt(), boot.saveGSFStatus()
                            }
                        }
                    }), PocketAnalytics.action("gsf_savedtolist", "view", "webapp")
                } else if (n > 0 && boot.GSFStatus.firstsavewebviewonly)
                    if (n > 1) {
                        var a = i.find(".item_content").eq(0);
                        if (!a.length) return;
                        if (a.find(".item_link").hasClass("start_articleview")) {
                            if ("buttonshort" == boot.GSFStatus.gsfMode || "inceptionshort" == boot.GSFStatus.gsfMode || "buttonshortreturnpocket" == boot.GSFStatus.gsfMode) return createGSFTooltip({
                                "anchor": !1,
                                "body": Handlebars.templates.gsf_allsetup(dictJSON),
                                "position": ["centered"],
                                "progress": {
                                    "size": boot.GSFStatus.gsfProgressMax,
                                    "selected": boot.GSFStatus.gsfProgressMax
                                },
                                "confirmdetail": {
                                    "button": !0,
                                    "text": Templating.callTrans("gsf.coolgotthis"),
                                    "callback": function() {
                                        closeGSFTooltip(), PocketAnalytics.action("gsf_allsetup_dismiss", "click", "webapp"), e.gsfCheckOneItemPlaceholder()
                                    }
                                }
                            }), boot.GSFStatus.active = !1, boot.saveGSFStatus(), void PocketAnalytics.action("gsf_allsetup", "view", "webapp");
                            boot.GSFStatus.confirmedfirstsavedetail = !1, boot.saveGSFStatus(), e.gsfCheckLogicAlt()
                        } else boot.GSFStatus.active = !1, boot.saveGSFStatus(), closeGSFTooltip(), PocketAnalytics.action("gsf_savedtwowebarticles", "interact", "webapp")
                    } else e.gsfShowWebViewOnlyWarning()
            } else if (boot.pages.reader.isOpen) {
                if (boot.GSFStatus.savedfirstitem && !boot.GSFStatus.confirmedfirstsavedetail) return boot.GSFStatus.confirmedfirstsavedetail = !0, boot.saveGSFStatus(), e.gsfCheckLogicAlt(), void PocketAnalytics.action("gsf_savedtolistconfirm_article", "click", "webapp");
                "buttonshort" !== boot.GSFStatus.gsfMode && "inceptionshort" !== boot.GSFStatus.gsfMode && "buttonshortreturnpocket" !== boot.GSFStatus.gsfMode && boot.GSFStatus.confirmedfirstsavedetail && !boot.GSFStatus.confirmedreaderviewdetail && (dictJSON.manual.gsftooltipcontent = Templating.callTrans("gsf.whatyousaveoptimized"), createGSFTooltip({
                    "anchor": $(".reader_head h1"),
                    "headline": Templating.callTrans("gsf.beautifullyformatted"),
                    "body": Handlebars.templates.gsf_simpletooltip(dictJSON),
                    "position": ["left", "bottom"],
                    "progress": {
                        "size": boot.GSFStatus.gsfProgressMax,
                        "selected": 3
                    },
                    "offsetx": -10,
                    "noisolate": !0,
                    "confirmdetail": {
                        "button": !0,
                        "text": Templating.callTrans("cta.learnmore"),
                        "callback": function() {
                            closeGSFTooltip(), boot.GSFStatus.confirmedreaderviewdetail = !0, boot.saveGSFStatus(), e.gsfCheckLogicAlt(), PocketAnalytics.action("gsf_articledetailtooltip_dismiss", "click", "webapp")
                        }
                    }
                }), PocketAnalytics.action("gsf_articledetailtooltip", "view", "webapp"))
            }
        }
    },
    "gsfGetArticles": function(e) {
        var t = this;
        if (!$.isEmptyObject(queue.gsfArticles)) return void("function" == typeof e && e());
        var i = new XMLHttpRequest,
            n = !1;
        i.onload = function() {
            var i = JSON.parse(this.responseText);
            "string" == typeof ServerSettings.altGSFArticle ? (t.gsfArticles = i[ServerSettings.altGSFArticle], "undefined" == typeof t.gsfArticles && (t.gsfArticles = i.control)) : t.gsfArticles = i.control, "function" != typeof e || n || (n = !0, e())
        }, i.onreadystatechange = function() {
            404 == i.status && ("function" != typeof e || n || (n = !0, e()))
        };
        var a = ServerSettings.language;
        "de-DE" !== a && "en-US" !== a && "es-ES" !== a && "es-LA" !== a && "ja-JP" !== a && "ru-RU" !== a && (a = "en-US"), i.open("GET", "/localization/gsfarticles-" + a + ".min.json?v=101", !0), i.send()
    },
    "gsfCheckOneItemPlaceholder": function() {
        if (!("boolean" != typeof boot.GSFStatus.needsoneitemplaceholder || !boot.GSFStatus.needsoneitemplaceholder || boot.GSFStatus.active || "queue" != this.state.section && "home" != this.state.section || this.searchField.val().length || tagSidebar.selectedTag)) {
            var e = this.queueList.children(".item"),
                t = e.not(".item_placeholder_gsf"),
                i = t.length;
            if (i > 1) return boot.GSFStatus.needsoneitemplaceholder = !1, boot.saveGSFStatus(), $(".item_placeholder_gsf").remove(), void PocketAnalytics.action("gsf_savedsecondarticle", "view", "webapp");
            if ($(".item_placeholder_gsf").length || "grid" !== queue.selectedView) return;
            this.gsfGetArticles(function() {
                "inceptionshort" == boot.GSFStatus.gsfMode ? (dictJSON.manual.itemplaceholdertitle = queue.gsfArticles.postgsfplaceholderinception.title, dictJSON.manual.itemplaceholderimgsrc = queue.gsfArticles.postgsfplaceholderinception.imgsrc, dictJSON.manual.itemplaceholderlink = queue.gsfArticles.postgsfplaceholderinception.link) : (dictJSON.manual.itemplaceholdertitle = queue.gsfArticles.postgsfplaceholder.title, dictJSON.manual.itemplaceholderimgsrc = queue.gsfArticles.postgsfplaceholder.imgsrc, dictJSON.manual.itemplaceholderlink = queue.gsfArticles.postgsfplaceholder.link), $("#queue").prepend(Handlebars.templates.queue_placeholder_gsf(dictJSON)), boot.pages.queue.isOpen ? PocketAnalytics.action("gsf_oneitemplaceholder", "view", "webapp") : boot.GSFStatus.waitplaceholderanalytics = !0, $(".item_placeholder_articlelink").click(function(e) {
                    PocketAnalytics.action("gsf_oneitemplaceholder_article", "click", "webapp")
                })
            })
        }
    },
    "gsfShowWebViewOnlyWarning": function() {
        this.gsfGetArticles(function() {
            dictJSON.manual.gsftooltiptitle = queue.gsfArticles.firstitem.title, dictJSON.manual.gsftooltiplink = queue.gsfArticles.firstitem.link, dictJSON.manual.gsftooltipimgsrc = queue.gsfArticles.firstitem.imgsrc, createGSFTooltip({
                "anchor": !1,
                "body": Handlebars.templates.gsf_webviewonlywarning(dictJSON),
                "position": ["centered"],
                "progress": {
                    "size": boot.GSFStatus.gsfProgressMax,
                    "selected": 2
                },
                "confirmdetail": {
                    "button": !0,
                    "text": Templating.callTrans("gsf.openarticletosave"),
                    "callback": function() {
                        var e = currentGSFTooltip.object.find(".gsf-tooltip-articlelink");
                        e.length && (window.open(e.attr("href")), PocketAnalytics.action("gsf_webviewonlyarticle_tryit", "click", "webapp"))
                    }
                }
            }), $(".gsf-tooltip-articlelink").click(function(e) {
                PocketAnalytics.action("gsf_webviewonlyarticle_direct", "click", "webapp")
            }), PocketAnalytics.action("gsf_webviewonlyarticlerecommend", "view", "webapp")
        })
    },
    "gsfShowSaveInWebAppWarning": function() {
        this.gsfGetArticles(function() {
            dictJSON.manual.gsftooltiptitle = queue.gsfArticles.firstitem.title, dictJSON.manual.gsftooltiplink = queue.gsfArticles.firstitem.link, dictJSON.manual.gsftooltipimgsrc = queue.gsfArticles.firstitem.imgsrc, createGSFTooltip({
                "anchor": !1,
                "body": Handlebars.templates.gsf_saveinwebappwarning(dictJSON),
                "position": ["centered"],
                "progress": {
                    "size": boot.GSFStatus.gsfProgressMax,
                    "selected": 2
                },
                "confirmdetail": {
                    "button": !0,
                    "text": Templating.callTrans("gsf.openarticletosave"),
                    "callback": function() {
                        var e = currentGSFTooltip.object.find(".gsf-tooltip-articlelink");
                        e.length && (window.open(e.attr("href")), PocketAnalytics.action("gsf_saveinwebapparticle_tryit", "click", "webapp"))
                    }
                }
            }), $(".gsf-tooltip-articlelink").click(function(e) {
                PocketAnalytics.action("gsf_saveinwebapparticle_direct", "click", "webapp")
            }), PocketAnalytics.action("gsf_saveinwebapparticlerecommend", "view", "webapp")
        })
    },
    "gsfAddPlaceholderEvents": function() {
        var e = this;
        $(".item_placeholder").click(function(t) {
            t.preventDefault(), dictJSON.manual.wextension = boot.GSFStatus.extinstalled || PocketUserApps.ready && PocketUserApps.installedExtension(), OverlayScreen.setDetail(Handlebars.templates.gsf_needhelpsaving(dictJSON)), OverlayScreen.show(), $(".gsf_four").find("p").eq(1).html(Templating.callTrans("gsf.trybuttonlinks", ['<a target="_blank" href="http://medium.com">', '<a target="_blank" href="http://nytimes.com">', '<a target="_blank" href="http://youtube.com">'], ["</a>", "</a>", "</a>"])), $(".gsf_four .button-gotit, .gsf_four .button-connect, .gsf_four .close").click(function(e) {
                e.preventDefault(), OverlayScreen.hide(), PocketAnalytics.action("gsf_close_needhelpsaving", "interact", "webapp"), boot.saveExternalUserSettings()
            }), $(".gsf_four .button-connect").click(function(t) {
                t.preventDefault(), boot.GSFStatus.extinstalled = !0, boot.saveGSFStatus(), boot.ExternalUserSettings.extinstalled = !0, boot.saveExternalUserSettings(), "object" == typeof chrome && chrome.webstore ? e.gsfOpenInitOverlay(!0) : window.open("http://getpocket.com/welcome"), PocketAnalytics.action("gsf_needhelpsaving_connect", "interact", "webapp"), $(".item_placeholder .button-connect").remove(), $(".item_placeholder p").first().text(Templating.callTrans("gsf.savecontentfrom")), e.gsfCheckLogic()
            }), PocketAnalytics.action("gsf_view_needhelpsaving", "view", "webapp"), boot.saveExternalUserSettings()
        }), $(".item_placeholder .button-connect").click(function(t) {
            t.preventDefault(), t.stopImmediatePropagation(), boot.GSFStatus.extinstalled = !0, boot.saveGSFStatus(), boot.ExternalUserSettings.extinstalled = !0, boot.saveExternalUserSettings(), "object" == typeof chrome && chrome.webstore ? e.gsfOpenInitOverlay(!0) : window.open("http://getpocket.com/welcome"), $(".item_placeholder .button-connect").remove(), $(".item_placeholder p").first().text(Templating.callTrans("gsf.savecontentfrom")), e.gsfCheckLogic()
        })
    },
    "gsfRecenterTooltip": function(e) {
        this.gsftooltip.show(!1);
        var t = this;
        setTimeout(function() {
            t.gsfCheckLogic()
        }, e)
    },
    "gsfCheckArchiveTooltip": function(e) {
        var t = this;
        t.archiveTooltipPending || (boot.ExternalUserSettings.sawarchivetooltip = !0, boot.saveExternalUserSettings(), t.archiveTooltipPending = !0, setTimeout(function() {
            var e = createTooltip($("#queue_title > a"), Templating.callTrans("notification.itemarchived"), Templating.callTrans("gsf.toviewarchived"));
            e.object.css("marginTop", "10px"), $("#queue_title > a").one("click", function() {
                t.archiveTooltipPending = !1, e.show(!1), t.gsfCheckLogic()
            }), PocketAnalytics.action("gsf_tooltip_itemarchived", "view", "webapp")
        }, e))
    },
    "showSearchState": function(e, t) {
        var i = this;
        if (e) {
            $.trim(i.searchField.val()).length ? $(".side-nav").addClass("side-nav-search") : ($(".searchtoolbar_screen").addClass("searchtoolbar_screen_active"), i.showRecentSearchesList(), $("#searchnav_sortby > a").addClass("searchnav-sortby-disabled"), $(".section-filter").addClass("section-filter-disabled")), $(".searchtoolbar_screenbar").addClass("searchtoolbar_screen_active"), $(".pkt-nav").addClass("pkt-nav-searchmode"), $("#page_queue").hasClass("list") ? $(".searchtoolbar_queue").addClass("searchtoolbar-listmode") : $(".searchtoolbar_queue").removeClass("searchtoolbar-listmode"), $(".searchtoolbar_queue").addClass("active"), boot.pages.queue.isOpen && $("#queue_title").hide();
            var n = i.contentTypeControl.key() ? i.contentTypeControl.key() : "",
                a = tagSidebar.selectedTag ? tagSidebar.selectedTag : "";
            if (i.queueList.addClass("queue_list_mode_narrowtoggle"), !t) {
                var s = boot.ExternalUserSettings.prevnewsearchstates;
                s ? s++ : s = 1, 4 > s && (boot.ExternalUserSettings.prevnewsearchstates = s, boot.saveExternalUserSettings()), i.clearSearchChips(), n.length && i.insertSearchChip(i.deriveTagNameFromContentTypeFilter(n), "contenttype"), a.length && i.insertSearchChip(a, "tag"), "favorites" == i.state.section && i.insertSearchChip(Templating.callTrans("queue.mainmenu_favorites"), "favorite"), i.searchChipLength > 1 ? ($(".wrapper_search").addClass("wrapper_search_expanded"), $(".search-instr-recent").addClass("search-instr-recent-expanded")) : ($(".wrapper_search").removeClass("wrapper_search_expanded"), $(".search-instr-recent").removeClass("search-instr-recent-expanded")), $(".expanded_toggle_search .expanded_toggle_selected").removeClass("expanded_toggle_selected"), "archive" == i.state.section ? (i.searchSectionFilter = "archive", $(".section-filter-value-text").text(Templating.callTrans("queue.search_archive")), $(".expanded_toggle_search .expanded_toggle_archive").addClass("expanded_toggle_selected")) : i.premiumMode ? (i.searchSectionFilter = "allitems", $(".section-filter-value-text").text(Templating.callTrans("queue.search_allitems")), $(".expanded_toggle_search .expanded_toggle_allitems").addClass("expanded_toggle_selected")) : (i.searchSectionFilter = "mylist", $(".section-filter-value-text").text(Templating.callTrans("queue.search_mylist")), $(".expanded_toggle_search .expanded_toggle_mylist").addClass("expanded_toggle_selected")), i.searchRecentSearch = !1
            }
            setTimeout(function() {
                if (i.searchField.focus(), !$(".searchtoolbar_queue").data("init")) {
                    $("#search_close").on("click", "a", function(e) {
                        e.preventDefault(), PocketAnalytics.action("search_close", "interact", "webapp"), i.showSearchState(!1)
                    }), $(".searchtoolbar_screen").click(function(e) {
                        e.preventDefault(), i.showSearchState(!1)
                    }), i.searchField.focus(function(e) {
                        $(".search-chip-selected").removeClass("search-chip-selected"), $(window).off("keydown.removechip")
                    }), $(".searchtoolbar_queue").find(".section-filter").click(function(e) {
                        if (e.preventDefault(), !$(this).hasClass("section-filter-disabled")) {
                            var t = $(this).find(".section-filter-options");
                            t.hasClass("section-filter-options-active") ? $(".searchtoolbar_screen,.searchtoolbar_screenbar").off("click.closeSectionFilter") : $(".searchtoolbar_screen,.searchtoolbar_screenbar").off("click.closeSectionFilter").one("click.closeSectionFilter", function(e) {
                                $(".searchtoolbar_queue").find(".section-filter").trigger("click")
                            }), $(this).toggleClass("section-filter-active"), t.toggleClass("section-filter-options-active")
                        }
                    }), i.searchSectionFilter = i.premiumMode ? "archive" == i.state.section ? "archive" : "allitems" : "archive" == i.state.section ? "archive" : "mylist", $(".section-filter-options").find("a").click(function(e) {
                        e.preventDefault(), e.stopImmediatePropagation();
                        var t = $(".section-filter-value-text"),
                            n = $(this).attr("class");
                        i.searchSectionFilter != n && (t.text($(this).text()), i.searchSectionFilter = n, $(".section-filter-options").hasClass("section-filter-options-active") && ($(".searchtoolbar_queue").find(".section-filter").trigger("click"), $.trim(i.searchField.val()).length && i.reloadList()))
                    }), i.searchSortBy = i.premiumMode ? "relevance" : "newest", dictJSON.manual.premium = i.premiumMode ? 1 : 0;
                    var e = Handlebars.templates.queue_sortsearchdialog(dictJSON);
                    i.sortSearchMenu = new PopOver("searchSortMenu", e, $(".searchtoolbar_queue"), {
                        "positions": ["bottom"],
                        "hideOnClickInPopover": !0,
                        "xOffset": 0,
                        "disableHideOnScroll": !0,
                        "fixedPosition": !0,
                        "onShow": function() {
                            $(".section-filter-options").hasClass("section-filter-options-active") && $(".searchtoolbar_queue").find(".section-filter").trigger("click"), $("#searchSortMenu").data("init") || ($("#searchSortMenu").find("a").click(function(e) {
                                e.preventDefault(), $(this).hasClass("search-sortby-selected") || ($(".search-sortby-options").find("a").removeClass("search-sortby-selected"), i.searchSortBy = $(this).attr("class"), $(this).addClass("search-sortby-selected"), $.trim(i.searchField.val()).length && i.reloadList())
                            }), $("#searchSortMenu").data("init", !0)), $("#searchnav_sortby > a").addClass("searchnav-sortby-active")
                        },
                        "onHide": function() {
                            $("#searchnav_sortby > a").removeClass("searchnav-sortby-active")
                        }
                    }), $("#searchnav_sortby > a").click(function(e) {
                        e.preventDefault(), $(this).hasClass("searchnav-sortby-disabled") || i.sortSearchMenu.show($("#searchnav_sortby > a"))
                    })
                }
                $(".searchtoolbar_queue").data("init", !0)
            }, 100), this.searchStateMode = !0, this.searchStateFirstSearch = !0, PocketAnalytics.action("search_show", "interact", "webapp")
        } else if ($(".searchtoolbar_screen,.searchtoolbar_screenbar").removeClass("searchtoolbar_screen_active"), $(".pkt-nav").removeClass("pkt-nav-searchmode"), i.hideRecentSearchesList(), $(".searchtoolbar_queue").removeClass("active"), $(".search-chip-selected").removeClass("search-chip-selected"), $(".section-filter-options").removeClass("section-filter-options-active"), i.queueList.removeClass("queue_list_mode_narrowtoggle"), $("#page_queue").removeClass("page_queue_search"), $(".side-nav").removeClass("side-nav-search"), $(window).off("keydown.removechip"), boot.pages.queue.isOpen && $("#queue_title").show(), this.searchStateMode = !1, PocketAnalytics.action("search_hide", "interact", "webapp"), !t) {
            i.saveSearchStateToPrevSearches(), $("#searchnav_sortby > a").addClass("searchnav-sortby-disabled"), $(".section-filter").addClass("section-filter-disabled");
            var o = i.searchSectionFilter,
                r = $.trim(i.searchField.val());
            "archive" == i.state.section ? $(".section-filter-options").find(".archive").trigger("click") : $(".section-filter-options").find(".all").trigger("click"), $(".searchtoolbar_queue").find("h2").text(""), i.searchField.val(""), i.searchFieldEmptyState = !0, $(".wrapper_search").removeClass("wrapper_search_loading"), ("allitems" !== o && "mylist" !== o && "archive" !== i.state.section || "archive" !== o && "archive" == i.state.section || r.length) && i.reloadList()
        }
    },
    "insertSearchChip": function(e, t) {
        var i = this,
            n = $(Handlebars.templates.queue_searchchip(dictJSON));
        n.find("p").text(e), n.find(".search-chip-icon").addClass("search-chip-" + t), n.find(".search-chip-delete").click(function(e) {
            e.preventDefault(), e.stopImmediatePropagation(), $(this).parents(".search-chip").remove(), i.searchRecentSearch = !1, i.searchChipLength--, i.adjustInputAreaForChips(), i.reloadList()
        }), n.click(function(e) {
            $(".search-chip-selected").removeClass("search-chip-selected"), $(this).addClass("search-chip-selected"), $(window).off("keydown.removechip").on("keydown.removechip", function(e) {
                var t = e.keyCode || e.which,
                    n = $(".search-chip-selected");
                n.length ? 8 == t && (e.preventDefault(), e.stopImmediatePropagation(), n.remove(), i.searchField.focus(), $(window).off("keydown.removechip")) : $(window).off("keydown.removechip")
            })
        }), $(".search-input").before(n), this.searchChipLength++, i.adjustInputAreaForChips(), this.searchField.attr("placeholder", "")
    },
    "adjustInputAreaForChips": function() {
        if (!Modernizr.flexbox) {
            var e = $(".search-input-list").width();
            $(".search-input-list .search-chip").each(function(t) {
                e -= $(this).outerWidth() + parseInt($(this).css("marginRight"))
            }), $(".search-input-list .search-input").css("width", e - 1 + "px")
        }
    },
    "clearSearchChips": function() {
        $(".search-input").siblings().remove(), this.searchChipLength = 0, Modernizr.flexbox || $(".search-input-list .search-input").css("width", "100%"), this.searchField.attr("placeholder", Templating.callTrans("queue.search"))
    },
    "deriveTagNameFromContentTypeFilter": function(e) {
        var t = "";
        return "video" == e && (t = Templating.callTrans("queue.filter_videos")), "image" == e && (t = Templating.callTrans("queue.filter_images")), "article" == e && (t = Templating.callTrans("queue.filter_articles")), t
    },
    "deriveContentTypeFilterFromTagName": function(e) {
        var t = "";
        return e == Templating.callTrans("queue.filter_videos") && (t = "video"), e == Templating.callTrans("queue.filter_images") && (t = "image"), e == Templating.callTrans("queue.filter_articles") && (t = "article"), t
    },
    "deriveTagNameFromContentTypeFilter": function(e) {
        var t = "";
        return "video" == e && (t = Templating.callTrans("queue.filter_videos")), "image" == e && (t = Templating.callTrans("queue.filter_images")), "article" == e && (t = Templating.callTrans("queue.filter_articles")), t
    },
    "saveSearchStateToPrevSearches": function() {
        this.saveSearchTO && clearTimeout(this.saveSearchTO);
        var e = {
            "search": $.trim(this.searchField.val())
        };
        if (e.search.length) {
            if (this.searchChipLength) {
                var t = {};
                if ($(".search-input-list .search-chip").each(function(e) {
                    var i = $(this).find(".search-chip-icon");
                    if (i.length) {
                        var n = i.attr("class").match(/icon\s*search-chip-(.*)/);
                        n && n.length > 1 && (t["chip-" + n[1]] = $.trim($(this).find("p").text()))
                    }
                }), t["chip-favorite"] ? (e.scxt_key = "in", e.scxt_val = "favorites") : t["chip-tag"] ? (e.scxt_key = "tag", e.scxt_val = t["chip-tag"]) : t["chip-contenttype"] && (e.scxt_key = "in", e.scxt_val = this.deriveContentTypeFilterFromTagName(t["chip-contenttype"])), this.searchChipLength > 1) {
                    var i = t["chip-tag"] ? t["chip-tag"] : "",
                        n = t["chip-contenttype"] ? this.deriveContentTypeFilterFromTagName(t["chip-contenttype"]) : "";
                    t["chip-favorite"] ? e.search += " " + $.trim(i + " " + n) : t["chip-tag"] && (e.search += " " + $.trim(n))
                }
            } else e.scxt_key = "", e.scxt_val = "";
            boot.data.send("saveRecentSearch", {
                "data": e
            }, !0)
        }
    },
    "showRecentSearchesList": function() {
        var e = this,
            t = $(".search-instr-recent");
        if (this.premiumMode && (t.find(".recentsearch").find("a").text(""), this.recentSearches)) {
            this.recentSearches = this.recentSearches.sort(function(e, t) {
                return parseInt(t.sort_id) - parseInt(e.sort_id)
            }), t.find(".recentsearch").removeClass("recentsearch-active");
            for (var i = 0; i < this.recentSearches.length; i++) {
                var n = this.recentSearches[i],
                    a = "",
                    s = 0,
                    o = t.find(".recentsearch-" + (i + 1)),
                    r = {};
                for (var l in n) "context_key" != l && "context_value" != l || !n[l] ? "search" == l && (a += '<span class="search-fieldcontent">' + sanitizeText(n[l]) + "</span>") : r[l] = n[l];
                if (r.context_key && r.context_value) {
                    var c = Handlebars.templates.queue_searchchip(dictJSON);
                    "tag" == r.context_key ? c = c.replace(/(-icon)(.*)("><\/span>.*\n.*<p>)(.*)(<\/p>)/, "$1 search-chip-tag$3" + sanitizeText(r.context_value) + "$5") : "in" == r.context_key && ("favorites" == r.context_value ? c = c.replace(/(-icon)(.*)("><\/span>.*\n.*<p>)(.*)(<\/p>)/, "$1 search-chip-favorite$3" + Templating.callTrans("queue.mainmenu_favorites") + "$5") : "shared" != r.context_value && (c = c.replace(/(-icon)(.*)("><\/span>.*\n.*<p>)(.*)(<\/p>)/, "$1 search-chip-contenttype$3" + e.deriveTagNameFromContentTypeFilter(r.context_value) + "$5"))),
                    a = c + a
                }
                o.addClass("recentsearch-active").find("a").html(a).off("click").on("click", function(t) {
                    t.preventDefault(), e.clearSearchChips(), $(this).find(".search-chip").each(function(t) {
                        var i = $(this).find(".search-chip-icon").attr("class").match(/icon\s*search-chip-(.*)/);
                        i && i.length > 1 && e.insertSearchChip($(this).find("p").text(), i[1])
                    }), e.searchField.val($(this).find(".search-fieldcontent").text()), e.searchFieldEmptyState = !1, /Trident/.test(navigator.userAgent) && (e.searchFieldPrevLength = $.trim(e.searchField.val()).length), $(".searchtoolbar_screen").removeClass("searchtoolbar_screen_active"), e.hideRecentSearchesList(), $(".searchnav-sortby-disabled").removeClass("searchnav-sortby-disabled"), $(".section-filter-disabled").removeClass("section-filter-disabled"), e.searchChipLength && e.searchField.css("width", 12 * $.trim(e.searchField.val()).length + "px"), e.searchField.focus(), e.searchRecentSearch = !0, e.reloadList()
                }), 0 == s ? (o.addClass("recentsearch-nochips").removeClass("recentsearch-wchips"), o.find(".search-fieldcontent").removeClass("search-fieldcontentlimited")) : (o.removeClass("recentsearch-nochips").addClass("recentsearch-wchips"), o.find(".search-fieldcontent").addClass("search-fieldcontentlimited"))
            }
        }
        var u = "nonpremium";
        this.premiumMode ? (t.attr("class", "search-instr-recent search-instr-premium"), u = "premium") : t.attr("class", "search-instr-recent"), t.addClass(boot.ExternalUserSettings.prevnewsearchstates ? "search-" + u + "-prevsearches-" + boot.ExternalUserSettings.prevnewsearchstates : "search-" + u + "-prevsearches-0"), t.addClass("search-instr-recent-active")
    },
    "hideRecentSearchesList": function() {
        $(".search-instr-recent").removeClass("search-instr-recent-active")
    },
    "highlightItemMove": function(e) {
        var t = $("#queue").find(".item").not(".removed");
        if (t.length) {
            if (this.itemHighlight) {
                this.itemHighlight.removeClass("item-highlight");
                var i = null;
                do this.itemHighlight && this.itemHighlight.length && !this.itemHighlight.hasClass("removed") && (i = this.itemHighlight), this.itemHighlight = e ? this.itemHighlight.next() : this.itemHighlight.prev(), this.itemHighlight.length && this.itemHighlight.hasClass("loadingRow") && (this.itemHighlight = e ? this.itemHighlight.next() : this.itemHighlight.prev()), this.itemHighlight.length && !this.itemHighlight.hasClass("item") && (this.itemHighlight = []); while (this.itemHighlight.length && this.itemHighlight.hasClass("removed"));
                if (!this.itemHighlight.length || this.itemHighlight.hasClass("removed")) {
                    if (!i) return void this.resetHighlight();
                    this.itemHighlight = i
                }
            } else this.itemHighlight = t.first(); if (this.itemHighlight.addClass("item-highlight"), this.itemHighlight.find(".buttons").length || this.addButtonsToRow(this.itemHighlight), !this.preferredscrollcontainer) {
                var n = $("body"),
                    a = $("html"),
                    s = n.scrollTop(),
                    o = a.scrollTop();
                s ? this.preferredscrollcontainer = n : o && (this.preferredscrollcontainer = a)
            }
            var r = this.preferredscrollcontainer ? this.preferredscrollcontainer : $("body,html"),
                l = r.scrollTop(),
                c = l,
                u = $(window).height() + l,
                d = this.itemHighlight.offset().top,
                h = this.itemHighlight.height(),
                p = 20;
            d + p > u ? r.animate({
                "scrollTop": l + (d - u + p + h)
            }, 300) : c > d - p && r.animate({
                "scrollTop": l - (c - d + p + h)
            }, 300)
        }
    },
    "highlightItemCheckDeletedMarked": function() {
        this.itemHighlight && this.itemHighlight.length && this.itemHighlight.hasClass("removed") && this.highlightItemMove(this.itemHighlight.next(".item").not(".removed").length ? !0 : !1)
    },
    "resetHighlight": function() {
        this.itemHighlight && this.itemHighlight.removeClass("item-highlight"), this.itemHighlight = null
    },
    "highlightItemAction": function(e) {
        if (this.itemHighlight) {
            if ("open" == e) {
                PocketAnalytics.action("open_original", "interact", "webapp", 1);
                var t = this.itemHighlight.find(".item_link");
                t.hasClass("start_webview") ? window.open(t.attr("href")) : t.trigger("click")
            }
            if ("mark" == e && (this.itemHighlight.find(".action_mark a").trigger("click"), PocketAnalytics.action("archive", "interact", "webapp", 1)), "favorite" == e && (this.itemHighlight.find(".action_favorite a").trigger("click"), PocketAnalytics.action("favorite", "interact", "webapp", 1)), "delete" == e && this.itemHighlight.find(".action_delete a").trigger("click"), "browseropen" == e) {
                var i = this.itemForItemID(queue.itemHighlight.attr("id").replace("i", ""));
                if ("string" == typeof i.item_id) {
                    var n = i.resolved_url ? i.resolved_url : i.given_url;
                    window.open(urlWithPocketRedirect(n))
                }
                PocketAnalytics.action("item_open", "interact", "webapp", 1)
            }
            "tag" == e && this.itemHighlight.find(".action_tag a").trigger("click")
        }
    },
    "editItemTags": function(e) {
        var t = $(e).parents(".item").get(),
            i = $(t),
            n = i.find(".tags"),
            a = $(n).find(".tag"),
            s = [];
        if (a.length)
            for (var o = 0; o < a.length; o++) s.push($.trim($(a.get(o)).text()));
        this.showBulkTagsDialog(!1, !1, s, this.premiumMode ? [] : null, i)
    },
    "validateTags": function(e) {
        if (e.length)
            for (var t = 0; t < e.length; t++)
                if (e[t].length > 25) return boot.showErrorNotification(Templating.callTrans("notification.tagsarelimited") + " " + e[t] + '"'), !1;
        return !0
    },
    "updateItemTags": function(e, t, i) {
        if (e && t) {
            var n = e.find(".tags").children(".tag_container"),
                a = !1;
            if ("tags_replace" == i) a = t;
            else {
                for (var s = t, o = n.find("a"), r = [], l = 0; l < o.length; l++) r.push($(o.get(l)).text());
                if ("tags_add" == i && t.length) {
                    a = r;
                    for (var l = 0; l < t.length; l++) - 1 == $.inArray(t[l], r) && a.push(t[l])
                } else "tags_remove" == i && r.length && (a = $.grep(r, function(e) {
                    return -1 == $.inArray(e, s)
                }))
            }
            a && (a.sort(), n.html(listTags(a, !0, !0)), this.checkTileTagOverflow(e)), e.find(".tags").toggleClass("hasTags", 0 != a);
            for (var c = this.itemsByID[e.attr("id").replace(/^i/, "")], u = {}, l = 0; l < a.length; l++) {
                var d = a[l];
                u[d] = {
                    "item_id": c.item_id,
                    "tag": d
                }
            }
            c.tags = u
        }
    },
    "tagRenamed": function(e, t) {
        var e = e,
            t = t;
        this.queueList.find(".tags .tag_container a").each(function() {
            var i = $(this);
            i.text() == e && (i.text(t), i.attr("href", queue.baseTagUrlPrefix + encodeURIComponent(t)))
        })
    },
    "tagDeleted": function(e) {
        this.queueList.find(".tags .tag_container").each(function() {
            if (-1 != this.innerHTML.indexOf(e, 0)) {
                for (var t = $(this), i = [], n = t.find("a"), a = 0; a < n.length; a++) {
                    var s = $(n.get(a)).text();
                    s != e && i.push($(n.get(a)).text())
                }
                t.html(listTags(i, !0, !0))
            }
        })
    },
    "scrolled": function() {
        if (this.isOpen && !$(document.body).hasClass("editing")) {
            this.contentEl = this.contentEl || document.getElementById("content");
            var e = $(window).scrollTop(),
                t = $(window).width(),
                i = this.contentEl.scrollHeight;
            i && (e + t >= .8 * i && !this.loading && (!this.searchStateMode && this.remaining || this.searchStateMode && this.searchHasMore) && this.reloadList({
                "append": !0
            }), this.expandedToolbarLogic(t, e))
        }
    },
    "expandedToolbarLogic": function(e, t) {
        !this.secondaryNavHiddenMode && e >= this.BREAK_ITEM_HEADER_WIDE && (this.secondaryNavTop || (this.secondaryNavTop = $(".queue_secondarynav").position().top, this.secondaryNavTop < 0 && (this.secondaryNavTop = 58)), t > this.secondaryNavTop && !this.toolbarQueueExpanded ? ($(".toolbar_queue").addClass("toolbar_queue_expanded"), $(".searchtoolbar_queue").addClass("searchtoolbar_queue_expanded"), this.toolbarQueueExpanded = !0) : t <= this.secondaryNavTop && this.toolbarQueueExpanded && ($(".toolbar_queue").removeClass("toolbar_queue_expanded"), $(".searchtoolbar_queue").removeClass("searchtoolbar_queue_expanded"), this.toolbarQueueExpanded = !1))
    },
    "actionForName": function(e) {
        var t, i;
        switch (e) {
            case "mark":
                t = "mark", i = !0;
                break;
            case "unmark":
                t = "mark", i = !1;
                break;
            case "delete":
                t = "delete", i = !0;
                break;
            case "favorite":
                t = "favorite", i = !0;
                break;
            case "unfavorite":
                t = "favorite", i = !1
        }
        return t ? {
            "action": t,
            "on": i
        } : !1
    },
    "showBulkEdit": function(e) {
        var t = this;
        if (e) this.bulkEditMode = !0, PocketAnalytics.action("bulk_edit_open", "interact", "webapp"), $("#page_queue").hasClass("page_queue_list") && this.bulkEditContainer.addClass("container-bulkedit-listmode"), $(".notifications-shares").is(":visible") || this.queueList.addClass("queue_list_mode_bulkedit"), this.bulkEditContainer.addClass("container-bulkedit-active"), $(".pkt-nav").addClass("pkt-nav-bulkeditmode");
        else {
            if (this.bulkEditMode = !1, !this.bulkEditContainer.hasClass("container-bulkedit-active")) return;
            t.bulkEditContainer.removeClass("container-bulkedit-listmode"), t.bulkEditContainer.find(".bulkedit-status").children("p").text(""), this.queueList.removeClass("queue_list_mode_bulkedit"), this.bulkEditContainer.removeClass("container-bulkedit-active"), $(".pkt-nav").removeClass("pkt-nav-bulkeditmode"), this.queueList.children(".item").filter(".item_bulkeditselected").removeClass("item_bulkeditselected")
        }
    },
    "updateBulkEditWording": function(e) {
        "object" != typeof e && (e = []);
        var t = e.length,
            i = Templating.callTrans("queue.itemsselected");
        1 == t && (i = Templating.callTrans("queue.itemselected")), this.bulkEditContainer.find(".bulkedit-status").children("p").text(t + " " + i), 0 == t ? $(".bulkedit-actions").addClass("bulkedit-actions-inactive") : $(".bulkedit-actions").removeClass("bulkedit-actions-inactive");
        var n = !0;
        e.length ? e.each(function(e, t) {
            $(t).find(".action_favorite").hasClass("selected") || (n = !1)
        }) : n = !1, this.bulkEditUnfavoriteMode = n, this.bulkEditContainer.find(".bulkedit-favorite").find(".bulkedit-desc").text(Templating.callTrans(n ? "queue.unfavorite" : "queue.favorite")), this.bulkEditContainer.find(".bulkedit-archive").find(".bulkedit-desc").text(Templating.callTrans("archive" == this.state.section ? "queue.readd" : "queue.archive"));
        var a = this.bulkEditContainer.find(".bulkedit-archive");
        "archive" == this.state.section ? a.addClass("bulkedit-archive-readd").find(".bulkedit-desc").attr("title", Templating.callTrans("queue.readd")).text(Templating.callTrans("queue.readd")) : a.removeClass("bulkedit-archive-readd").find(".bulkedit-desc").attr("title", Templating.callTrans("queue.archive")).text(Templating.callTrans("queue.archive"))
    },
    "showBulkTagsDialog": function(e, t, i, n, a, s) {
        function o() {
            e && (h.find(".token-input-token").length ? h.find(".button").removeClass("button-disabled") : h.find(".button").addClass("button-disabled"))
        }

        function r() {
            var e = "|";
            $(".token-input-token").each(function(t, i) {
                e += $(i).find("p").text() + "|"
            });
            var t = $(".suggestedtag_detail").find(".token-suggestedtag-inactive");
            t.each(function(t, i) {
                -1 == e.indexOf("|" + $(i).text() + "|") && $(i).removeClass("token-suggestedtag-inactive")
            })
        }

        function l() {
            var e = "|";
            $(".token-input-token").each(function(t, i) {
                e += $(i).find("p").text() + "|"
            });
            var t = $(".token-suggestedtag").not(".token-suggestedtag-inactive");
            t.each(function(t, i) {
                e.indexOf("|" + $(i).text() + "|") > -1 && $(i).addClass("token-suggestedtag-inactive")
            })
        }
        var c, u = this;
        if (e ? (c += "Add tags <span>(" + s + (1 == s ? " item" : " items") + ")</span>", dictJSON.manual.tags_count = s, dictJSON.manual.items_singular = 1 == s, c = Handlebars.templates.queue_bulktagdialog(dictJSON)) : (dictJSON.manual.suggestedtags = n ? 1 : null, c = Handlebars.templates.tag_edittagdialog(dictJSON)), OverlayScreen.setDetail(c), OverlayScreen.show(), this.tagListBuilt || queue.data.getTags({
            "delegate": queue,
            "doneSelector": "tagsReady"
        }), n)
            if ($(".suggestedtag_detail").on("click", ".token-suggestedtag", function(e) {
                e.preventDefault();
                var t = $(e.target);
                $("#edit-tags-input").tokenInput("add", {
                    "id": h.find(".token-input-token").length,
                    "name": t.text()
                }), t.addClass("token-suggestedtag-inactive"), $(".token-input-input-token input").focus()
            }), n.length) u.fillSuggestedTags(n);
            else {
                $(".suggestedtag_detail").addClass("suggestedtag_detail_loading");
                var d = a;
                t || (d = u.itemsByID[a.attr("id").replace(/^i/, "")]), boot.data.get("getSuggestedTags", {
                    "data": {
                        "url": d.given_url
                    },
                    "delegate": u,
                    "doneSelector": "suggestedTagsCallback",
                    "errorSelector": "suggestedTagsError"
                })
            }
        var h = $(".overlay_detail");
        h.find(".close").click(function(e) {
            e.preventDefault(), OverlayScreen.hide(), $("body").off("keydown.tags"), PocketAnalytics.action("bulk_edit_tag_exit", "interact", "webapp")
        }), h.find(".button").click(function(i) {
            if (i.preventDefault(), !($(this).hasClass("button-disabled") || f && Date.now() - f < 250)) {
                if (e) u.commitBulkEdit("tags");
                else {
                    for (var n = $(".overlay_detail .token-input-token"), s = [], o = 0; o < n.length; o++) {
                        var r = n.eq(o).text();
                        r.length > 1 && s.push(r.substring(0, r.length - 1))
                    }
                    if (u.validateTags(s)) {
                        if (t) {
                            s ? (reader.layout.tags.find(".tag_container").html(listTags(s.sort(), !0, !0)), reader.layout.tags.addClass("hasTags")) : reader.layout.tags.removeClass("hasTags"), reader.item.tags = s;
                            var l = $("#i" + a.item_id);
                            l.length && u.updateItemTags(l, s, "tags_replace"), u.data.updateItemTags(a.item_id, s)
                        } else {
                            u.updateItemTags(a, s, "tags_replace");
                            var c = u.itemsByID[a.attr("id").replace(/^i/, "")];
                            u.data.updateItemTags(c.item_id, s)
                        }
                        $(".token-input-dropdown").data("modified") && sharedToast.show($(".token-input-dropdown").data("manualadd") ? Templating.callTrans("tag.itemtagged") : Templating.callTrans("tag.itemtagsremoved"))
                    }
                }
                OverlayScreen.hide(), $("body").off("keydown.tags")
            }
        });
        var p = 0,
            f = 0;
        $("#edit-tags-input").tokenInput([], {
            "searchDelay": 200,
            "minChars": 1,
            "animateDropdown": !1,
            "noResultsHideDropdown": !0,
            "search_function": function(e, t) {
                searching = !0, u.tagSearch(e, t), $(".token-input-dropdown-fortag").data("init") || $(".token-input-dropdown-fortag").css("width", $(".token-input-list").outerWidth() - 2 + "px").data("init")
            },
            "textToData": function(e) {
                return $.trim(e).length > 25 || !$.trim(e).length ? ($.trim(e).length > 25 && (sharedToast.show(Templating.callTrans("notification.tagsarelimited")), p = Date.now(), f = Date.now()), null) : {
                    "name": sanitizeText(e.toLowerCase())
                }
            },
            "onReady": function() {
                $(".token-input-dropdown").addClass("token-input-dropdown-fortag"), $(".token-input-list").addClass("token-input-list-webapp"), setTimeout(function() {
                    if (!e && "object" == typeof i) {
                        var t = boot.ExternalUserSettings.recentlyaccessedtags;
                        "object" != typeof t && (t = []);
                        for (var n = 0; n < i.length; n++) $("#edit-tags-input").tokenInput("add", {
                            "id": n,
                            "name": htmlEntities(i[n])
                        }), -1 == $.inArray(i[n], t) && t.push(i[n]);
                        t.sort(), boot.ExternalUserSettings.recentlyaccessedtags = t, boot.saveExternalUserSettings()
                    }
                    $(".token-input-dropdown").data("modified", !1), $(".token-input-dropdown").data("manualadd", !1)
                }, 10), $("body").on("keydown.tags", function(e) {
                    if ($(e.target).hasClass("page-queue")) {
                        var t = e.keyCode || e.which;
                        if (8 == t) {
                            e.preventDefault(), e.stopImmediatePropagation();
                            var i = $(".token-input-selected-token");
                            i.length && $("#edit-tags-input").tokenInput("remove", {
                                "name": i.find("p").text()
                            })
                        }
                    }
                })
            },
            "onAdd": function() {
                o(), p = Date.now(), $(".token-input-dropdown").data("modified", !0), $(".token-input-dropdown").data("manualadd", !0), n && l()
            },
            "onDelete": function() {
                o(), p = Date.now(), $(".token-input-dropdown").data("modified", !0), n && r()
            }
        }), setTimeout(function() {
            h.find(".token-input-input-token").children("input").focus()
        }, 500), $(".token-input-list").keypress(function(e) {
            13 == e.which && Date.now() - p > 250 && (e.preventDefault(), h.find(".button").trigger("click"))
        })
    },
    "tagSearch": function(e, t) {
        var i = [];
        if (e.length) {
            if (!this.tagList) return;
            this.tagList.sort();
            for (var n = 15, a = new RegExp("^" + e), s = 0; s < this.tagList.length; s++) a.test(this.tagList[s]) && n > 0 && (i.push({
                "name": this.tagList[s]
            }), n--)
        } else {
            var o = boot.ExternalUserSettings.recentlyaccessedtags;
            if ("object" == typeof o)
                for (var s = 0; s < o.lenght; s++) i.push({
                    "name": o[s]
                })
        }
        i.length || (i = null), t(i)
    },
    "fillSuggestedTags": function(e) {
        for (var t = '<ul class="clearfix">', i = 0; i < e.length; i++) t += '<li><a href="#" class="token-suggestedtag">' + e[i] + "</a></li>";
        t += "</ul>", $(".suggestedtag_detail").append(t), $(".suggestedtag_detail").removeClass("suggestedtag_detail_loading").height($(".suggestedtag_detail").height())
    },
    "suggestedTagsCallback": function(e) {
        if (e.status)
            if (e.suggested_tags.length) {
                for (var t = [], i = 0; i < e.suggested_tags.length; i++) t.push(e.suggested_tags[i].tag);
                this.fillSuggestedTags(t)
            } else $(".suggestedtag_detail").removeClass("suggestedtag_detail_loading").append('<p class="suggestedtag_msg">' + Templating.callTrans("tag.suggestedtagserror") + "</p>");
            else this.suggestedTagsError(e)
    },
    "suggestedTagsError": function(e) {
        var t = Templating.callTrans("tag.suggestedtagserror");
        e && e.error_msg && (t = e.error_msg), $(".suggestedtag_detail").removeClass("suggestedtag_detail_loading").append('<p class="suggestedtag_msg">' + t + "</p>")
    },
    "checkBulkEditLogic": function() {
        var e = this.queueList.children(".item").filter(".item_bulkeditselected").not(".removed");
        e.length && this.showBulkEdit(!0), this.updateBulkEditWording(e)
    },
    "commitBulkEdit": function(e) {
        var t = "tags_add",
            i = [],
            n = null;
        if ("tags" == e) {
            n = [];
            for (var a = $(".overlay_detail .token-input-token"), s = 0; s < a.length; s++) {
                var o = a.eq(s).text();
                o.length > 1 && n.push(o.substring(0, o.length - 1))
            }
            if (!this.validateTags(n)) return;
            i = n.join(",")
        }
        var r = {
            "action": e,
            "on": !0
        };
        ("mark" == e && "archive" == this.state.section || "favorite" == e && this.bulkEditUnfavoriteMode) && (r.on = !1), "tags" == e && (r = !1), this.batch = !0;
        var l = [],
            c = this.queueList.children(".item").filter(".item_bulkeditselected").not(".removed");
        if (c.length) {
            for (var s = 0; s < c.length; s++) l.push(c[s].id.replace(/^i/, "")), 1 != r && this.takeActionOnItem(r.action, r.on, $(c[s]).attr("id").replace(/^i/, ""), void 0, !0), n && this.updateItemTags($(c[s]), n, t);
            this.batch = !1, this.reflowTiles(), this.data.bulkEdit({
                "data": {
                    "items": l,
                    "status": r.action,
                    "on": r.on,
                    "tagType": t,
                    "tags": i
                }
            });
            var u = c.length;
            u += c.length > 1 ? " Items " : " Item ", "favorite" == e && this.bulkEditUnfavoriteMode ? (u += " " + Templating.callTrans("notification.unfavorited"), PocketAnalytics.action("bulk_edit_favorite", "interact", "webapp")) : "favorite" == e ? (u += " " + Templating.callTrans("notification.favorited"), PocketAnalytics.action("bulk_edit_favorite", "interact", "webapp")) : "mark" == e && "archive" == this.state.section ? u += " " + Templating.callTrans("notification.savedtolist") : "mark" == e ? (u += " " + Templating.callTrans("notification.archived"), PocketAnalytics.action("bulk_edit_archive", "interact", "webapp")) : "delete" == e ? (u += " " + Templating.callTrans("notification.deleted"), PocketAnalytics.action("bulk_edit_delete", "interact", "webapp")) : (u += " " + Templating.callTrans("notification.tagged"), PocketAnalytics.action("bulk_edit_tag_save", "interact", "webapp")), sharedToast.show(u), this.showBulkEdit(!1), this.checkIfRunningLow()
        }
    },
    "commitMassTagChange": function(e, t, i) {
        function n(t, i) {
            e.find(".itemtext").text(sanitizeText(i)), e.attr("href", e.attr("href").replace(encodeURIComponent(sanitizeText(t)), encodeURIComponent(sanitizeText(i)))), e.attr("val", encodeURIComponent(sanitizeText(i))), queue.data.renameTag({
                "data": {
                    "oldTag": t,
                    "newTag": i
                }
            });
            for (var n = !1, s = 0; s < a.tagList.length; s++) a.tagList[s] == t && (a.tagList.splice(s, 1), s--), a.tagList[s] == i && (n = !0);
            n || (a.tagList.push(i), a.tagList.sort()), a.buildPopoverTagList(a.tagList), queue.tagRenamed(t, i), a.massTagChanging = !1, sharedToast.show(Templating.callTrans("tag.tagrenamedfrom").replace("xxxxx", t).replace("yyyyy", i)), t == tagSidebar.selectedTag && setTimeout(function() {
                var e = $("#pagenav_tagfilter li").filter("[val='" + encodeURIComponent(sanitizeText(i)) + "']");
                e.length && boot.loadStateFromUrl(e.children("a").attr("href"))
            }, 1e3)
        }
        var a = this;
        this.massTagChanging = !0;
        var s = t;
        if (t = $.trim(t), i = $.trim(i), i.length && t != i && a.validateTags([i])) {
            for (var o = $("#pagenav_tagfilter ul"), r = o.children(), l = !1, c = 0; c < r.length; c++)
                if (r.eq(c).text() == i) {
                    l = !0;
                    break
                }
            l ? a.showConfirmDialog(Templating.callTrans("tag.tagalreadyexists"), Templating.callTrans("tag.tagexistswouldyoulikemerge", ["<strong>", "<strong>", "<strong>"], ["</strong>", "</strong>", "</strong>"]).replace("xxxxx", sanitizeText(i)).replace("yyyyy", t).replace("zzzzz", sanitizeText(i)), Templating.callTrans("cta.merge"), function() {
                n(s, i)
            }, function() {
                a.massTagChanging = !1
            }) : n(s, i)
        } else e.find(".itemtext").text(s), a.massTagChanging = !1;
        e.find(".deletetag").removeClass("deletetag_active"), e.parent().find(".edittaginput").remove(), e.removeClass("editmode"), e.find(".itemtext").show()
    },
    "commitMassTagDelete": function(e, t) {
        var i = this;
        this.massTagChanging = !0, this.showConfirmDialog(Templating.callTrans("tag.deletetag"), Templating.callTrans("tag.thiswillremove", null, null, "<strong>" + sanitizeText(t) + "</strong>"), Templating.callTrans("cta.delete"), function() {
            e.remove(), queue.data.deleteTag({
                "data": {
                    "tag": t
                }
            }), queue.tagDeleted(t), i.massTagChanging = !1, sharedToast.show("Tag '" + t + "' deleted"), t == tagSidebar.selectedTag && setTimeout(function() {
                boot.loadStateFromUrl(queue.tagUrlPrefix)
            }, 500)
        }, function() {
            i.massTagChanging = !1
        })
    },
    "checkForMessages": function() {},
    "showInbox": function(e) {
        if ("undefined" != typeof e) {
            if ("undefined" == typeof this.inboxPopover) {
                var e = $("#pagenav_inbox");
                $(window).width() < queue.BREAK_ITEM_HEADER_WIDE && (e = $("#page")), this.inboxView = new InboxView($("<div class='inbox'></div>"), this.notifications, this.unconfirmedNotifications), this.inboxPopover = new PopOver("notifications_list", this.inboxView.view, e, {
                    "disableHideOnScroll": !0,
                    "xOffset": -44,
                    "onShow": function() {
                        var e = $("#notifications_list");
                        e.hasClass("popover-new-bottom") ? $("#notifications_list").css(Modernizr.flexbox ? {
                            "left": "-142px",
                            "top": "23px"
                        } : {
                            "left": "-142px",
                            "top": "53px"
                        }) : e.hasClass("popover-new-centered") || $("#notifications_list").css(Modernizr.flexbox ? {
                            "left": "-292px",
                            "top": "23px"
                        } : {
                            "left": "-292px",
                            "top": "53px"
                        })
                    },
                    "positions": ["bottomleft"],
                    "headerTitle": Templating.callTrans("notification.inbox")
                })
            }
            return this.inboxView.reloadData(this.notifications, this.unconfirmedNotifications), void this.inboxPopover.show(e)
        }
        this.inboxPopover.show(!1)
    },
    "setInboxNotification": function(e) {
        e && 0 != e ? (e > 9 && $(".inbox_badge").addClass("inbox_badge_wide"), e > 99 ? $(".inbox_badge").removeClass("inbox_badge_wide").addClass("inbox_badge_superwide").text("99+") : $(".inbox_badge").text(e), $(".inbox_badge").addClass("inbox_badge_active")) : $(".inbox_badge").removeClass("inbox_badge_active inbox_badge_wide inbox_badge_superwide")
    }
};
var InboxView = function(e, t, i) {
    this.view = e, this.notifications = t, this.unconfirmedNotifications = i
};
InboxView.prototype.reloadData = function(e, t) {
    this.unconfirmedNotifications = t, this.notifications = e, this.view.find(".notification").remove();
    var i = 0;
    for (var n in this.unconfirmedNotifications) {
        var a = this.unconfirmedNotifications[n],
            s = this.cellForUnconfirmedNotification(a);
        this.view.append(s), s.css("height", s.height() + 50), i += s.height() + 50
    }
    for (var o = 0; o < this.notifications.length; o++) {
        var a = this.notifications[o],
            s = this.cellForNotification(a);
        this.view.append(s), s.css("height", s.height() + 50), i += s.height() + 50
    }
    if (0 == this.notifications.length && 0 == this.unconfirmedNotifications) {
        var s = this.cellForEmptyState();
        this.view.append(s)
    }
    setTimeout(function() {
        this.view.find(".notification").addClass("canAnimate"), i > parseInt(this.view.css("maxHeight")) ? (this.view.addClass("inbox_scroll_mode"), $("#notifications_list").addClass("notifications_list_scrollmode")) : (this.view.removeClass("inbox_scroll_mode"), $("#notifications_list").removeClass("notifications_list_scrollmode"))
    }.bind(this), 1)
}, InboxView.prototype.cellForUnconfirmedNotification = function(e) {
    var t = $("<div class='unconfirmed notification'></div>"),
        i = $("<div class='item'></div>"),
        n = $("<div class='title'></div>");
    n.text(Templating.callTrans("queue.confirmyouremail"));
    var a = $("<div class='description'></div>");
    a.text("" + (e.name || Templating.callTrans("queue.afriend")) + " " + Templating.callTrans("queue.hassharedconfirm") + " " + e.email);
    var s = $("<div class='buttons'></div>"),
        o = $("<a class='resend button'>" + Templating.callTrans("queue.resendconfirmation") + "</a>");
    return o.click(function(i) {
        return boot.helper.sync.makeAPIRequest("resendEmailConfirmation", {
            "email": e.email
        }).done(function(i) {
            delete queue.unconfirmedNotifications[e.email], queue.receivedNotifications(queue.notifications, queue.unconfirmedNotifications), t.addClass("hidden");
            var n = !1;
            for (var a in queue.unconfirmedNotifications) {
                n = !0;
                break
            }
            0 !== queue.notifications.length || n || queue.inboxPopover.show(!1), sharedToast.show(Templating.callTrans("notification.sent"))
        }).fail(function(e) {
            200 != e.status ? alert(Templating.callTrans("queue.couldntresend")) : e.success()
        }), i.preventDefault(), !1
    }), i.append(n).append(a), s.append(o), t.append(i).append(s), t
}, InboxView.prototype.cellForEmptyState = function() {
    var e = $('<div class="notification notification_empty"><h3>' + Templating.callTrans("notification.inboxempty") + "</h3><p>" + Templating.callTrans("notification.inboxempty_intro") + "</p><p>" + Templating.callTrans("notification.inboxempty_introtwo") + "</p></div>");
    return e
};
var attributionForShare = InboxView.prototype.cellForNotification = function(e, t, i, n) {
    t = t || e.item, i = i || !1;
    var a = t.resolved_url ? t.resolved_url : t.given_url,
        s = e.from_friend;
    s || (s = queue.friends[e.from_friend_id]);
    var o = a,
        r = $("<div class='notification'></div>"),
        l = $("<div class='attribution'></div>"),
        c = $("<div class='avatar'></div>"),
        u = (window.devicePixelRatio || 1) > 1 ? "-2x" : "-1x",
        d = s && s.avatar_url ? getImageCacheUrl(s.avatar_url, "w90-h90-nc") : "/a/i/empty_avatar" + u + ".png";
    c.css("backgroundImage", "url(" + d + ")");
    var h = $("<div class='full_name'></div>");
    h.text(s && s.name ? s.name : "A friend");
    var p = $("<div class='time_since'></div>");
    "string" == typeof e.time_shared && (e.time_shared = new Date(1e3 * parseInt(e.time_shared, 10)));
    var f = e.time_shared;
    p.text("" + relativeDateString(f));
    var g = $();
    e.comment && e.comment.length && (g = $("<div class='comment'></div>"), g.text(e.comment));
    var m = $();
    if (e.quote && e.quote.length > 0 && (m = $("<div class='quote'></div>"), m.text(e.quote)), !n) {
        var v = $("<div class='caret'></div>"),
            _ = $("<div class='item'></div>"),
            b = $("<div class='title'></div>"),
            y = $('<a class="title_link" target="_blank">');
        y.attr("href", o), y.text(t.resolved_title), b.append(y);
        var S = $("<div class='domain'></div>");
        S.text(domainForURL(a));
        var w = $("<div class='buttons'></div>"),
            T = $("<div class='ignore button button-secondary button-mini'>" + Templating.callTrans("cta.ignore") + "</div>"),
            k = $("<div class='addToList button button-important button-mini'>" + Templating.callTrans("cta.addtolist") + "</div>");
        k.text().length > 13 && k.text(Templating.callTrans("cta.add"));
        var x = function() {
            queue.notifications.splice(queue.notifications.indexOf(e), 1), queue.receivedNotifications(queue.notifications, queue.unconfirmedNotifications), r.addClass("hidden"), 0 === queue.notifications.length && queue.inboxPopover.show(!1)
        };
        T.click(function(i) {
            return i.preventDefault(), t = queue.itemsByID[e.item_id] || e.item, t.shares = t.shares || {}, e.item = void 0, "string" == typeof e.time_shared && (e.time_shared = new Date(1e3 * parseInt(e.time_shared, 10))), e.status = "2", t.shares[e.share_id] = e, queue.data.itemAction({
                "data": {
                    "action": "share_ignored",
                    "share_id": e.share_id,
                    "itemId": e.item_id,
                    "item": t
                }
            }), x(), !1
        }), k.click(function(i) {
            i.preventDefault(), t = queue.itemsByID[e.item_id] || e.item, t.shares = t.shares || {}, e.item = void 0, "string" == typeof e.time_shared && (e.time_shared = new Date(1e3 * parseInt(e.time_shared, 10))), e.status = "1", t.shares[e.share_id] = e;
            var n = queue.items.indexOf(t);
            return n >= 0 && queue.items.splice(n, 1), queue.data.itemAction({
                "data": {
                    "action": "share_added",
                    "share_id": e.share_id,
                    "itemId": e.item_id,
                    "item": t
                }
            }), queue.items.splice(0, 0, t), queue.itemsByID[t.item_id] = t, queue.rebuildList(void 0, {
                "o": {
                    "append": !1
                }
            }), x(), !1
        })
    }
    return l.append(c).append(h).append(p).append(g), r.append(l), n ? l.append(m) : (l.append(v), _.append(b).append(S).append(m), w.append(T).append(k), r.append(_).append(w)), r
};
imgScale = 1;
try {
    imgScale = window.devicePixelRatio ? window.devicePixelRatio : 1
} catch (e) {}
var queue = new Queue;
boot.pages.queue = queue, PocketAnalytics = {
    "sourceCheck": null,
    "sourceTime": null,
    "prevAction": null,
    "openContext": {},
    "impressionIds": {},
    "init": function(e, t) {
        "number" == typeof e && (this.sourceTime = e), "string" == typeof t && (this.sourceCheck = t)
    },
    "action": function(e, t, i, n, a, s) {
        if (this.sourceCheck && this.sourceTime) {
            this.prevAction = e;
            var o = {
                "view": "web",
                "type_id": t,
                "section": i,
                "page": this.getPage(),
                "identifier": e,
                "extra_int_data": n
            };
            "string" == typeof s && (o.page = s), this.actionSend(o, a)
        }
    },
    "actionWithExtraString": function(e, t, i, n, a) {
        if (this.sourceCheck && this.sourceTime) {
            this.prevAction = e;
            var s = {
                "view": "web",
                "type_id": t,
                "section": i,
                "page": this.getPage(),
                "identifier": e,
                "extra_content": n
            };
            this.actionSend(s, a)
        }
    },
    "actionSend": function(e, t) {
        var i = {
            "sourceCheck": this.sourceCheck.toString(),
            "sourceTime": this.sourceTime,
            "actions": JSON.stringify([e])
        };
        $.ajax({
            "url": "/web/x/pv.php",
            "type": "POST",
            "dataType": "json",
            "data": i,
            "complete": function(e, i) {
                "function" == typeof t && t()
            }
        })
    },
    "convertContextView": function(e) {
        return "string" != typeof e ? "" : "recommended" == e ? "feed" : "queue" == e || "archive" == e || "favorites" == e ? "list" : e
    },
    "setOpenContext": function(e, t, i) {
        this.openContext = {
            "cxt_view": this.convertContextView(e),
            "cxt_feed_item": t,
            "cxt_index": i
        }
    },
    "feedItemImpression": function(e) {
        if ($.isArray(e) && e.length) {
            var t = {
                "sourceCheck": this.sourceCheck.toString(),
                "sourceTime": this.sourceTime,
                "contexts": []
            };
            for (var i in e) {
                var n = e[i];
                "string" == typeof n.cxt_view && (n.cxt_view = this.convertContextView(n.cxt_view)), this.impressionIds[n.cxt_feed_item] || (this.impressionIds[n.cxt_feed_item] = !0, t.contexts.push(n))
            }
            $.ajax({
                "url": "/a/x/feedItemImpression.php",
                "type": "POST",
                "dataType": "json",
                "data": t
            })
        }
    },
    "logAction": function(e, t, i) {
        var n = {
            "sourceCheck": this.sourceCheck.toString(),
            "sourceTime": this.sourceTime,
            "actions": [{
                "action": "opened_web",
                "context": {
                    "cxt_view": this.convertContextView(e),
                    "cxt_feed_item": t,
                    "cxt_index": i
                }
            }]
        };
        $.ajax({
            "url": "/web/x/la.php",
            "type": "POST",
            "dataType": "json",
            "data": n
        })
    },
    "bindActions": function() {
        var e = $("body").attr("class");
        if ("string" == typeof e) {
            var t = this;
            if (e.indexOf("page-home") > -1 && $("#video_prompt").click(function(e) {
                t.action("cta_video", "click", "core")
            }), e.indexOf("page-login") > -1) {
                var i = $(".textbox"),
                    n = i.filter('[name="feed_id"]'),
                    a = i.filter("#password_input"),
                    s = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
                n.blur(function() {
                    t.action("blur_username", "interact", "core")
                }), a.blur(function() {
                    t.action("blur_password", "interact", "core")
                });
                var o = !1,
                    r = !1,
                    l = !1;
                n.keypress(function() {
                    o || (o = !0, t.action("modify_username", "interact", "core")), !r && s.test($(this).val()) && (r = !0, t.action("modify_usernamewemail", "interact", "core"))
                }), a.keypress(function() {
                    l || (l = !0, t.action("modify_password", "interact", "core"))
                })
            }
            e.indexOf("page-app") > -1 && ($("#container").delegate("#bulk_edit_toggle_button", "click", function() {
                t.action("cta_bulkedittoggle", "click", "webapp")
            }), $("#container").delegate("#sort_selector", "click", function() {
                t.action("cta_sortselector", "click", "webapp")
            }), $("#container").delegate(".segmentControl .article", "click", function() {
                t.action("cta_segmentarticle", "click", "webapp")
            }), $("#container").delegate(".segmentControl .video", "click", function() {
                t.action("cta_segmentvideo", "click", "webapp")
            }), $("#container").delegate(".segmentControl .image", "click", function() {
                t.action("cta_segmentimage", "click", "webapp")
            }), $("#container").delegate(".tag", "click", function() {
                $(this).hasClass("toolbarButton") && t.action("cta_tagsidebartoggle", "click", "webapp")
            }), $("#container").delegate(".buttonItem", "click", function() {
                "bedit_save_button" == $(this).attr("id") ? $(this).find(".highlight").length ? t.action("cta_bulkeditcommitsuccess", "click", "webapp") : t.action("cta_bulkeditcommitfail", "click", "webapp") : t.action("cta_bulkeditcancel", "click", "webapp")
            })), e.indexOf("page-welcome") > -1 && $(".btn,.button").click(function() {
                t.action("cta_installbutton", "click", "core")
            })
        }
    },
    "formattedHrefParams": function(e) {
        return "string" == typeof e ? -1 == e.indexOf("?") ? "" : e.slice(e.indexOf("?") + 1) : void 0
    },
    "getQueryVariable": function(e) {
        for (var t = window.location.search.substring(1), i = t.split("&"), n = 0; n < i.length; n++) {
            var a = i[n].split("=");
            if (decodeURIComponent(a[0]) == e) return decodeURIComponent(a[1])
        }
        return !1
    },
    "getPage": function() {
        var e = document.location.pathname;
        return e.length > 1 && "/" == e.charAt(e.length - 1) ? e.slice(0, -1) : e
    }
}, $(function() {
    PocketAnalytics.bindActions()
}), PocketUserApps = {
    "sourceCheck": null,
    "sourceTime": null,
    "ready": !1,
    "appTypes": null,
    "userId": null,
    "init": function(e, t) {
        "number" == typeof e && (this.sourceTime = e), "string" == typeof t && (this.sourceCheck = t), this.poll()
    },
    "poll": function() {
        var e = this,
            t = {
                "sourceTime": this.sourceTime,
                "sourceCheck": this.sourceCheck,
                "type": "summary"
            };
        $.ajax({
            "url": "/web/x/getuserapps.php",
            "type": "POST",
            "dataType": "json",
            "data": t,
            "complete": function() {
                e.ready = !0
            },
            "success": function(t) {
                "object" == typeof t.app_types && (e.appTypes = t.app_types)
            }
        })
    },
    "installedExtension": function() {
        return this.appTypes && "number" == typeof this.appTypes.pocket_extension
    },
    "installedMobile": function() {
        return this.appTypes && "number" == typeof this.appTypes.pocket_mobile
    }
};
