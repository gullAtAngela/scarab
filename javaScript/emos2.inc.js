(function() {
    var EMOS_VERSION = "cm48", URL_TRACKING_ALLOWED = false, SITE_ID = "0", MANDANT = false, LOG_URL = "www.econda-monitor.de", STORAGE_MAX = 10, COOKIES_MAX = 10, JUNK_SIZE = 1600, CLIENT_COOKIE_LIFETIME = 30, COOKIENAME_SESSION_ID = "emos_jcsid", COOKIENAME_VISITOR_ID = "emos_jcvid", COOKIENAME_CAMPAIGN = "emos_jckamp", COOKIENAME_CROSS = "emos_jccross", COOKIENAME_POSTVIEWCAMPAIGN = "emos_postview", COOKIENAME_POSTVIEW = null, COOKIE_DOMAIN = null, TRACK_FIRSTPARTY = true, TRACK_POSTCONVERSION = true, EVENT_MILLIS = 200, sendSecondary = false, carriesSecondaryCookie = false, FIRST_ACTIVE = true, SECOND_ACTIVE = false, SECOND_SUMA = false, TRACK_THIRD_PARTY = true, USE_SYSTEM_SID = false, SAMPLING_RATE = 1, BEST_PRODUCTS_COOKIE = false, PRODUCT_ID_IN_EC_EVENT = 1, COOKIENAME_BEST_PRODUCTS = "emos_best_products", BEST_PRODUCTS_COOKIE_LIFETIME = 2592000, API_CTX = window, TRACK_VERSION = (typeof(API_CTX.emosTrackVersion) == "number") ? API_CTX.emosTrackVersion: 1, MC_COOKIE = {
        kw: 30,
        cp: 30,
        nl: 30
    }, ADD_COOKIE_PARAMS = {
        all: ["empid", "empcode", "empcode2"]
    }, ADD_COOKIE_PROPS = {}, CLIENT_KEY = API_CTX.emosClientKey ? API_CTX.emosClientKey: "000016b9-6f4b9797-37e6-493b-b9dd-54da8f70e70d", SECOND_CLIENT_KEY = null, SAMPLING_MODE_CLICKONLY = true, CAPTURE_CLICKS = (API_CTX.emosTrackClicks) ? API_CTX.emosTrackClicks: true, COOKIENAME_CLICKMONITOR = "emos_clickmonitor", URL_CLICKMONITOR = "https://monitor.econda-monitor.de/click", F = null;
    function ak() {
        if (API_CTX.emosPageId) {
            F = API_CTX.emosPageId.substring(0, 254);
            return 
        }
        var aK = document.getElementsByTagName("meta");
        for (var e = 0; e < aK.length; e++) {
            if (aK[e].getAttribute("name") == "DC.identifier") {
                F = aK[e].getAttribute("content").substring(0, 254);
                return 
            }
        }
        if (URL_TRACKING_ALLOWED) {
            var aL = (window.clickmonitor) ? window.clickmonitor.location: window.location;
            F = aL.protocol + "//" + aL.host + aL.pathname;
            F = F.substring(0, 254)
        }
    }
    var ap = 0, x = null, am = 0, an = 0, B = 0, f = 0, I, g, ag = 0, p, M = null, ah = [], G = true, i = false;
    try {
        if (window.sessionStorage && window.sessionStorage.length >= 0) {
            i = true
        }
    } catch (R) {}
    var L = true, ar, D;
    function l() {
        if (API_CTX.emos_kdnr) {
            var aK = API_CTX.emos_kdnr-723;
            var e = (aK%673 == 0) ? (aK / 673-100): 912;
            var aL = e.toString(16);
            while (aL.length < 8) {
                aL = "0" + aL
            }
            CLIENT_KEY = aL + "-xtc~" + API_CTX.emos_kdnr
        }
    }
    var v = (window.encodeURIComponent) ? window.encodeURIComponent: window.escape;
    function ao(aK) {
        try {
            if (window.decodeURIComponent) {
                try {
                    return window.decodeURIComponent(aK.replace(/\+/g, "%20"))
                } catch (aM) {
                    return window.unescape(aK)
                }
            } else {
                return window.unescape(aK)
            }
        } catch (aL) {
            return aK
        }
    }
    function aF(aM, aL, aK) {
        if (aM.addEventListener) {
            aM.addEventListener(aL, aK, true)
        } else {
            if (aM.attachEvent) {
                aM.attachEvent("on" + aL, aK)
            } else {
                var e = aM["on" + aL];
                if (!e) {
                    aM["on" + aL] = aK
                } else {
                    aM["on" + aL] = function(aN) {
                        aK(aN);
                        e(aN)
                    }
                }
            }
        }
    }
    function ai(aQ, aL) {
        var aK = aQ.cookie;
        delete aQ.cookie;
        var e = null;
        var aR = null;
        if (aK) {
            if (aQ.emcl) {
                e = parseInt(aQ.emcl);
                delete aQ.emcl
            }
            if (!e) {
                e = CLIENT_COOKIE_LIFETIME
            }
            e = e * 86400;
            aR = W(aK)
        }
        var aO = k(aQ);
        var aP = Math.floor(aO.length / JUNK_SIZE) + 1;
        var aM = [];
        for (var aN = 0; aN < aP; aN++) {
            aM[aN] = {};
            aM[aN].v = "2";
            aM[aN].emrid = aL;
            if (TRACK_FIRSTPARTY == true) {
                aM[aN].emsid = am;
                aM[aN].emvid = B
            }
            if (aN == 0 && TRACK_THIRD_PARTY && TRACK_POSTCONVERSION) {
                if (aK) {
                    aM[aN].emcl = e;
                    aM[aN].emcc = aR
                }
                if (MANDANT) {
                    aM[aN].emcm = SITE_ID
                }
            }
            aM[aN].emnc = aP;
            aM[aN].emtn = aN + 1;
            aM[aN].emhost = location.hostname;
            if (FIRST_ACTIVE && SECOND_ACTIVE && sendSecondary) {
                aM[aN].skey = SECOND_CLIENT_KEY
            }
            if (TRACK_THIRD_PARTY) {
                aM[aN].tpct = 1
            }
            aM[aN].d = aO.substr(aN * JUNK_SIZE, JUNK_SIZE)
        }
        return aM
    }
    function C() {
        var e = {};
        m(e);
        S(e, 0)
    }
    function m(e) {
        n(e);
        if (API_CTX.emosBillingPageArray) {
            t(API_CTX.emosBillingPageArray, e)
        }
        if (API_CTX.emosECPageArray) {
            N(API_CTX.emosECPageArray, e)
        }
        P(e);
        if (API_CTX.emosBasketPageArray) {
            V(API_CTX.emosBasketPageArray, e)
        }
        A(e)
    }
    function c(aM) {
        if (!BEST_PRODUCTS_COOKIE) {
            return 
        }
        if (!aM.ec_Event) {
            return 
        }
        if (aM.ec_Event.length == 0) {
            return 
        }
        var aK = [];
        for (var aL = 0; aL < aM.ec_Event.length && aK.length < 5; aL++) {
            if (aM.ec_Event[aL].length > PRODUCT_ID_IN_EC_EVENT) {
                aK.push(v(aM.ec_Event[aL][PRODUCT_ID_IN_EC_EVENT]))
            }
        }
        if (aK.length == 0) {
            return 
        }
        if (aK.length < 5) {
            var e = ab();
            if (e) {
                for (var aL = 0; aL < e.length && aK.length < 5; aL++) {
                    aK.push(e[aL])
                }
            }
        }
        aw(COOKIENAME_BEST_PRODUCTS, aK.join(":"), BEST_PRODUCTS_COOKIE_LIFETIME)
    }
    function ab() {
        var e = Z(COOKIENAME_BEST_PRODUCTS);
        if (e && e.length > 0) {
            return e.split(":")
        }
        return null
    }
    function n(aK) {
        aK.siteid = SITE_ID;
        if (API_CTX.emosGlobalProperties) {
            U(aK, API_CTX.emosGlobalProperties)
        }
        al(aK);
        av(aK);
        var e = O();
        if (e) {
            aK.pvdata = e
        }
        at(aK);
        if (TRACK_VERSION == 1) {
            ax(aK)
        }
        if (!aK.content) {
            aK.content = "HTML-Title/" + document.title
        }
    }
    function aJ() {
        if (API_CTX.emosReferrer) {
            return API_CTX.emosReferrer
        }
        try {
            return top.document.referrer
        } catch (aK) {
            return document.referrer
        }
    }
    function al(e) {
        if (URL_TRACKING_ALLOWED) {
            e.url = location.pathname.substring(0, 254)
        }
        e.jv = navigator.javaEnabled() ? 1 : 0;
        e.swsh = screen.width + "x" + screen.height;
        e.emosV = EMOS_VERSION
    }
    function b(aP, aM) {
        try {
            if (aP == null || aP.length == 0) {
                return "http://unknown"
            }
            if (aP.substr(0, 4) != "http") {
                aP = "http://" + aP
            }
            if (aM >= 0) {
                var aL = aP.split("/");
                if (aL.length < aM) {
                    aM = aL.length
                }
                aP = "";
                for (var aK = 0; aK < aM; aK++) {
                    if (aK != 0) {
                        aP = aP + "/"
                    }
                    aP = aP + aL[aK]
                }
            }
            var aQ = aP.indexOf("?");
            if (aQ >= 0) {
                aP = aP.substring(0, aQ)
            }
            var aO = aP.indexOf("#");
            if (aO >= 0) {
                aP = aP.substring(0, aO)
            }
        } catch (aN) {}
        return aP.substring(0, 127)
    }
    function aI(aK) {
        var aL = (typeof(emos_secondary) != "undefined") ? true: false;
        var e = (aK.billing) ? true: false;
        if (aL) {
            aK.secLabel = emos_secondary
        }
        if (e) {
            aL = true
        }
        if (TRACK_FIRSTPARTY&&!TRACK_THIRD_PARTY&&!carriesSecondaryCookie) {
            aL = false
        }
        return aL
    }
    function aH(aM) {
        if (!F) {
            return 
        }
        if (!L) {
            return 
        }
        if (!x) {
            return 
        }
        if (!aM) {
            aM = window.event
        }
        var aN = {};
        if ((aM.which && aM.which != 1) || (!aM.which && aM.button != 1)) {
            return 
        }
        var aX = aM.pageX;
        var aO = aM.pageY;
        var aQ = document.documentElement && document.documentElement.clientHeight != 0 ? document.documentElement: document.body;
        if (isNaN(aX) || isNaN(aO)) {
            aX = aM.clientX + ((isNaN(window.pageXOffset) ? aQ.scrollLeft : window.pageXOffset));
            aO = aM.clientY + ((isNaN(window.pageYOffset) ? aQ.scrollTop : window.pageYOffset))
        }
        var aT = aM.target ? aM.target: aM.srcElement;
        if (!aT.nodeName) {
            return 
        }
        var aV = aT.nodeName.toLowerCase();
        if (aV == "base") {
            return 
        }
        while (aT != null && aT.nodeType != 1) {
            aT = aT.parentNode
        }
        if (aV == "map") {
            aT = h(aT, aX, aO)
        } else {
            if (aV == "area") {
                aT = h(aT.parentNode, aX, aO)
            }
        }
        if (aV == "option") {
            aT = aT.parentNode;
            if (aT.nodeName.toLowerCase() == "optgroup") {
                aT = aT.parentNode
            }
        }
        if (typeof aT.getBoundingClientRect == "function") {
            if (aT == document.body.parentNode) {
                aT = document.body
            }
        } else {
            if (aT == document.body) {
                aT = document.body.parentNode
            }
        }
        var aP = new Date().getTime();
        var aU = Math.floor((aP - D) / 1000);
        var aY = Math.floor((aP - p) / 1000);
        D = aP;
        if (document.body.parentNode == aT || document.body == aT) {
            var aL, e;
            if (window.innerHeight) {
                aL = window.innerWidth-17;
                e = window.innerHeight-17
            } else {
                aL = aQ.clientWidth;
                e = aQ.clientHeight
            }
            if (aL < aM.clientX || e < aM.clientY) {
                return 
            }
        }
        var aR = aA(aT);
        if (!aR) {
            return 
        }
        var aK = aX - aR[0];
        var aZ = aO - aR[1];
        var aW = ar++;
        var aS = T(aT).toLowerCase();
        aN.click = [[aX, aO, aY, aK, aZ, aW, aU, aS, SAMPLING_RATE]];
        aN.plReqId = x;
        aN.emosV = EMOS_VERSION;
        q(aN, j(), 0)
    }
    function T(aK) {
        var aL = aK.parentNode;
        if (!aL || aL == document) {
            return "/" + aK.nodeName
        }
        var e = T(aL);
        return e + "/" + aK.nodeName + "[" + z(aL, aK) + "]"
    }
    function z(aM, aL) {
        var e = aM.childNodes;
        var aN = 0;
        for (var aK = 0; aK < e.length; aK++) {
            if (e[aK] == aL) {
                return aN
            } else {
                if (e[aK].nodeName == aL.nodeName) {
                    aN++
                }
            }
        }
        return -1
    }
    function h(aN, e, aK) {
        var aP = "#" + aN.getAttribute("name");
        var aQ = document.getElementsByTagName("img");
        for (var aM = 0; aM < aQ.length; aM++) {
            var aL = aQ[aM];
            if (aL.getAttribute("usemap") == aP) {
                var aO = aA(aL);
                if (aO) {
                    if (e >= aO[0] && aK >= aO[1] && e <= aO[0] + aL.clientWidth && aK <= aO[1] + aL.clientHeight) {
                        return aL
                    }
                }
            }
        }
        return document.body.parentNode
    }
    function S(aU, aK) {
        if (aU.pageId) {
            F = aU.pageId
        } else {
            if (aU.pageid) {
                aU.pageId = aU.pageid;
                F = aU.pageid;
                delete aU.pageid
            } else {
                if (F) {
                    aU.pageId = F
                }
            }
        }
        try {
            if (F && top.ClickwatcherAccess) {
                top.ClickwatcherAccess.setPageId(F);
                G = false;
                L = false;
                return 
            }
        } catch (aS) {}
        var aP = location.search.indexOf("clickmonitor=econda") >= 0 || location.hash.indexOf("clickmonitor_econda") >= 0;
        if (aP) {
            aw(COOKIENAME_CLICKMONITOR, "true")
        }
        if ((aP || Z(COOKIENAME_CLICKMONITOR) == "true")&&!window.emosClickmonitor) {
            window.emosClickmonitor = {
                pageId: F,
                cookieName: COOKIENAME_CLICKMONITOR,
                cookieDomain: COOKIE_DOMAIN,
                urlClickmonitor: URL_CLICKMONITOR,
                ckey: CLIENT_KEY
            };
            var aX = document.documentElement;
            var aL = aX.namespaceURI;
            var aR = aX.prefix;
            var aO = aR ? aR + ":head": "head";
            var aT = aX.childNodes;
            var aW = null;
            for (var aQ = 0; aQ < aT.length; aQ++) {
                var aV = aT[aQ];
                if (aV.nodeType == 1 && aV.nodeName.toLowerCase() == aO) {
                    aW = aV;
                    break
                }
            }
            if (!aW) {
                aW = aL ? document.createElementNS(aL, aO) : document.createElement(aO);
                aX.insertBefore(aW, aX.firstChild)
            }
            var aN = aL ? document.createElementNS(aL, aR + ":script"): document.createElement("script");
            aN.setAttribute("type", "text/javascript");
            aN.setAttribute("src", URL_CLICKMONITOR + "/scripts/click.js");
            aW.appendChild(aN);
            G = false;
            L = false;
            return 
        }
        if (aU.cookie) {
            aB(ADD_COOKIE_PROPS, aU, aU.cookie.source, aU.cookie)
        }
        p = new Date().getTime();
        x = j();
        D = p;
        ar = 0;
        au(aU);
        if (!G) {
            return 
        }
        c(aU);
        if (SECOND_ACTIVE) {
            var aM = aI(aU);
            if (sendSecondary || aM) {
                sendSecondary = true
            }
        }
        q(aU, x, aK)
    }
    function q(aN, aO, e) {
        if (window.console && window.console.log && location.search.indexOf("emosdebug=yxcvbnm") >= 0) {
            window.console.log(aN)
        }
        if (FIRST_ACTIVE || (SECOND_ACTIVE && sendSecondary)) {
            var aM = ai(aN, aO);
            for (var aL = 0; aL < aM.length; aL++) {
                ap = ap + 1;
                a(aM[aL], ap)
            }
            var aK = new Date().getTime() + e;
            while (new Date().getTime() < aK) {}
        }
    }
    function aA(aL) {
        if (typeof aL.getBoundingClientRect == "function") {
            var aK;
            var aN;
            if (typeof window.pageXOffset == "number") {
                aK = window.pageXOffset;
                aN = window.pageYOffset
            } else {
                var e = document.compatMode != "BackCompat" ? document.documentElement: document.body;
                aK = e.scrollLeft;
                aN = e.scrollTop
            }
            var aM = aL.getBoundingClientRect();
            if (aM == null) {
                return null
            }
            if (aM.top == 0 && aM.right == 0 && aM.bottom == 0 && aM.left == 0) {
                return null
            }
            return [aK + parseInt(aM.left), aN + parseInt(aM.top)]
        }
        return E(aL)
    }
    function E(e) {
        if (e.offsetParent != null) {
            var aL = E(e.offsetParent);
            if (!aL) {
                return null
            }
            aL[0] += e.offsetLeft;
            aL[1] += e.offsetTop;
            return aL
        } else {
            var aK = e.nodeName.toLowerCase();
            if (aK == "html" || aK == "body") {
                return [0, 0]
            } else {
                return null
            }
        }
    }
    function u() {
        var aL = FIRST_ACTIVE ? CLIENT_KEY: SECOND_CLIENT_KEY;
        var aK = aL.indexOf("-");
        var e;
        var aM;
        if (aK == 8) {
            e = aL.substring(0, 8);
            aM = aL.substring(9)
        }
        return ((location.protocol == "https:") ? "https://" : "http://") + LOG_URL + "/l/" + e + "/t/" + aM + "?"
    }
    function a(aM, aO) {
        var aN = W(aM);
        var aL = new Image();
        ah[aO] = aL;
        if (i) {
            var aK = window.sessionStorage;
            if (aK.length < STORAGE_MAX) {
                try {
                    aK.setItem("emosTransmit" + aO, aN)
                } catch (aP) {}
                aL.onload = function() {
                    try {
                        aK.removeItem("emosTransmit" + aO)
                    } catch (aQ) {}
                    ah[aO] = null
                }
            } else {
                aL.onload = function() {
                    ah[aO] = null
                }
            }
        } else {
            if (document.cookie.split(";").length < COOKIES_MAX) {
                aw("emosTransmit" + aO, aN);
                aL.onload = function() {
                    J("emosTransmit" + aO);
                    ah[aO] = null
                }
            } else {
                aL.onload = function() {
                    ah[aO] = null
                }
            }
        }
        aL.src = u() + aN
    }
    function W(aK) {
        var aL = "";
        for (var aM in aK) {
            var e = typeof aK[aM];
            if (e == "string" || e == "boolean" || e == "number") {
                if (aL != "") {
                    aL += "&"
                }
                aL += aM + "=" + v(aK[aM])
            }
        }
        return aL
    }
    function aq(aM) {
        var aN = aM.split("&");
        var aK = {};
        for (var e = 0; e < aN.length; e++) {
            var aL = aN[e].split("=");
            aK[aL[0]] = ao(aL[1])
        }
        return aK
    }
    function k(e) {
        var aK = [];
        for (var aL in e) {
            if (aK.length != 0) {
                aK[aK.length] = 28
            }
            aK = aK.concat(y(aL), [31], ay(e[aL]))
        }
        return aa(aK)
    }
    function ay(aO) {
        if (aO == null) {
            return y("NULL")
        }
        if (typeof aO == "string") {
            return y(aO)
        }
        if (typeof aO == "number" || aO == "boolean") {
            return y("" + aO)
        }
        if (typeof aO == "object" && typeof aO.length != "undefined") {
            var aN = [];
            for (var e = 0; e < aO.length; e++) {
                var aM = aO[e];
                var aL = false;
                var aK = (typeof aM == "object" && aM != null && typeof aM.length != "undefined");
                if (e != 0) {
                    aN[aN.length] = (aK || aL) ? 29 : 30
                }
                aN = aN.concat(ay(aM));
                aL = aK
            }
            return aN
        }
        return []
    }
    function w() {
        var aM = "emosTransmit".length;
        if (i) {
            var aR = window.sessionStorage;
            for (var aN = 0; aN < aR.length; aN++) {
                var aP = aR.key(aN);
                if (aP.substr(0, aM) == "emosTransmit") {
                    var e = Number(aP.substr(aM));
                    ap = Math.max(ap, e);
                    var aK = aR.getItem(aP);
                    aE(e, u() + aK)
                }
            }
        } else {
            var aQ = document.cookie.split(";");
            for (var aN = 0; aN < aQ.length; aN++) {
                var aL = aQ[aN];
                if (aL.charAt(0) == " ") {
                    aL = aL.substr(1)
                }
                if (aL.substr(0, aM) == "emosTransmit") {
                    var aO = aL.indexOf("=");
                    if (aO < 0) {
                        continue
                    }
                    var e = Number(aL.substring(aM, aO));
                    var aK = aL.substring(aO + 1);
                    ap = Math.max(ap, e);
                    s(e, u() + aK)
                }
            }
        }
    }
    function s(e, aL) {
        var aK = new Image();
        aK.onload = function() {
            J("emosTransmit" + e);
            ah[e] = null
        };
        ah[e] = aK;
        aK.src = aL
    }
    function aE(e, aL) {
        var aK = new Image();
        aK.onload = function() {
            try {
                window.sessionStorage.removeItem("emosTransmit" + e)
            } catch (aM) {}
            ah[e] = null
        };
        ah[e] = aK;
        aK.src = aL
    }
    function au(aS) {
        if (!TRACK_FIRSTPARTY) {
            return 
        }
        var aY = 0;
        if (aS.billing && aS.billing.length > 0 && aS.billing[0].length > 3) {
            var aQ = Number(aS.billing[0][3]);
            if (!isNaN(aQ)) {
                aY = Math.round(aQ * 100)
            }
        }
        var aV = true;
        var aW = Z(COOKIENAME_SESSION_ID);
        if (aW && aW.length > 0) {
            var aT = aW.split(":");
            if (aT.length == 4) {
                am = aT[0];
                an = parseInt(aT[1]) + 1;
                if (!isNaN(an)) {
                    aV = false;
                    aw(COOKIENAME_SESSION_ID, am + ":" + an + ":" + x + ":" + p)
                }
            }
        }
        if (aV) {
            var aL = null;
            if (USE_SYSTEM_SID) {
                var aZ = document.getElementsByName("emos_sid");
                for (var aP = 0; aP < aZ.length; aP++) {
                    var aX = aZ[aP].getAttribute("rel", 2);
                    if (aX && aX.length > 0) {
                        aL = aX;
                        break
                    }
                    aX = aZ[aP].getAttribute("title", 2);
                    if (aX && aX.length > 0) {
                        aL = aX;
                        break
                    }
                }
                if (aL == null && typeof(API_CTX.emos_sid) == "string" && API_CTX.emos_sid.length > 0) {
                    aL = API_CTX.emos_sid
                }
            }
            if (aL == null) {
                aL = j()
            }
            var aK = aL + ":1:" + x + ":" + p;
            aw(COOKIENAME_SESSION_ID, aK);
            var aN = Z(COOKIENAME_SESSION_ID);
            if (aK == aN) {
                am = aL;
                an = 1;
                aV = true
            } else {
                am = "NULL";
                an =- 1;
                aV = false
            }
        }
        var aW = Z(COOKIENAME_VISITOR_ID);
        if (aW && aW.length > 0) {
            var aT = aW.split(":");
            if (aT.length == 5 || aT.length == 7) {
                B = aT[0];
                f = parseInt(aT[1]) + ((aV) ? 1 : 0);
                var e = aT[2];
                var aO = parseInt(aT[3]);
                if (aV) {
                    I = e;
                    g = p - aO;
                    aO = p
                } else {
                    I = null;
                    g = null
                }
                ag = aY;
                var aR = parseInt(aT[4]);
                if (aT.length == 7) {
                    L = ("true" == aT[5]);
                    var aM = parseInt(aT[6]);
                    if (aM != SAMPLING_RATE) {
                        L = Math.random() * SAMPLING_RATE <= 1
                    }
                } else {
                    L = Math.random() * SAMPLING_RATE <= 1
                }
                if (!SAMPLING_MODE_CLICKONLY) {
                    G = L
                }
                if (!isNaN(aR)) {
                    ag += aR
                }
                if (!isNaN(f)) {
                    aw(COOKIENAME_VISITOR_ID, B + ":" + f + ":" + am + ":" + aO + ":" + ag + ":" + L + ":" + SAMPLING_RATE, 94608000);
                    return 
                }
            }
        }
        var aU = am;
        ag = aY;
        L = Math.random() * SAMPLING_RATE <= 1;
        if (!SAMPLING_MODE_CLICKONLY) {
            G = L
        }
        var aK = aU + ":1:" + am + ":" + p + ":" + ag + ":" + L + ":" + SAMPLING_RATE;
        aw(COOKIENAME_VISITOR_ID, aK, 94608000);
        var aN = Z(COOKIENAME_VISITOR_ID);
        if (aK == aN) {
            B = aU;
            f = 1
        } else {
            B = "NULL";
            f =- 1
        }
    }
    function Z(aN) {
        if (!aN) {
            return null
        }
        var e = document.cookie.split(";");
        for (var aL = 0; aL < e.length; aL++) {
            var aK = e[aL];
            if (aK.charAt(0) == " ") {
                aK = aK.substr(1)
            }
            if (aK.substr(0, aN.length) == aN) {
                var aM = aK.indexOf("=");
                if (aM < 0) {
                    continue
                }
                return aK.substring(aM + 1)
            }
        }
        return null
    }
    function aw(aK, aM, e) {
        var aL = aK + "=" + aM + ";path=/;";
        if (COOKIE_DOMAIN) {
            aL = aL + "domain=" + COOKIE_DOMAIN + ";"
        }
        if (e) {
            aL = aL + "max-age=" + e + ";expires=" + new Date(new Date().getTime() + e * 1000).toGMTString() + ";"
        }
        document.cookie = aL
    }
    function J(e) {
        var aK = e + "=;path=/;max-age=0;";
        if (COOKIE_DOMAIN) {
            aK = aK + "domain=" + COOKIE_DOMAIN + ";"
        }
        document.cookie = aK
    }
    function j() {
        var aM = new Date().getTime();
        var aO = aM & 4294967295;
        var aN = (aM / 4294967296) & 4294967295;
        var e = [];
        e[e.length] = aN>>>24;
        e[e.length] = aN>>>16 & 255;
        e[e.length] = aN>>>8 & 255;
        e[e.length] = aN & 255;
        e[e.length] = aO>>>24;
        e[e.length] = aO>>>16 & 255;
        e[e.length] = aO>>>8 & 255;
        e[e.length] = aO & 255;
        for (var aK = 0; aK < 4; aK++) {
            var aL = (4294967296 * Math.random()) & 4294967295;
            e[e.length] = aL>>>24;
            e[e.length] = aL>>>16 & 255;
            e[e.length] = aL>>>8 & 255;
            e[e.length] = aL & 255
        }
        return aa(e)
    }
    function y(aK) {
        var aL = [];
        var e = String.fromCharCode(237);
        if (e.charCodeAt(0) < 0) {
            for (var aN = 0; aN < aK.length; aN++) {
                var aM = aK.charCodeAt(aN);
                if (aM > 0) {
                    if (aM >= 32 || aM == 9) {
                        aL[aL.length] = aM
                    }
                } else {
                    aL[aL.length] = (((256 + aM)>>6) | 192);
                    aL[aL.length] = (((256 + aM) & 63) | 128)
                }
            }
        } else {
            for (var aN = 0; aN < aK.length; aN++) {
                var aM = aK.charCodeAt(aN);
                if (aM < 128) {
                    if (aM >= 32 || aM == 9) {
                        aL[aL.length] = aM
                    }
                } else {
                    if ((aM > 127) && (aM < 2048)) {
                        aL[aL.length] = ((aM>>6) | 192);
                        aL[aL.length] = ((aM & 63) | 128)
                    } else {
                        aL[aL.length] = ((aM>>12) | 224);
                        aL[aL.length] = (((aM>>6) & 63) | 128);
                        aL[aL.length] = ((aM & 63) | 128)
                    }
                }
            }
        }
        return aL
    }
    var aD = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*_";
    function aa(aO) {
        var aM = aD;
        var aN = [];
        var aL = 0;
        var e = aO.length;
        if ((e%3) == 1) {
            aO[aO.length] = 0;
            aO[aO.length] = 0
        }
        if ((e%3) == 2) {
            aO[aO.length] = 0
        }
        while (aL < aO.length) {
            aN[aN.length] = aM.charAt(aO[aL]>>2);
            aN[aN.length] = aM.charAt(((aO[aL] & 3)<<4) | (aO[aL + 1]>>4));
            aN[aN.length] = aM.charAt(((aO[aL + 1] & 15)<<2) | (aO[aL + 2]>>6));
            aN[aN.length] = aM.charAt(aO[aL + 2] & 63);
            aL += 3
        }
        if ((e%3) == 1) {
            aN[aN.length-1] = aN[aN.length-2] = ""
        }
        if ((e%3) == 2) {
            aN[aN.length-1] = ""
        }
        var aK = aN.join("");
        return aK
    }
    function ac(aQ) {
        var aT = aJ();
        var aN = b(aT, 3);
        var aL = d(aT, false);
        var aS = aL.url ? ao(aL.url).substring(0, 127): null;
        aQ.ref = aN;
        if (aS) {
            aQ.refUrl = aS
        }
        var aO;
        try {
            aO = d(top.location.search, true)
        } catch (aP) {
            aO = d(location.search, true)
        }
        if (aO.emosmarker) {
            aQ.marker = aO.emosmarker
        }
        if (aO.ecmUid) {
            aQ.newsuid = aO.ecmUid
        }
        if (aO.incpc) {
            aQ.incpc = aO.incpc
        }
        if (aQ.cookie) {
            return 
        }
        if (aO.secondary && SECOND_ACTIVE) {
            sendSecondary = true;
            aQ.secLabel = "landingPage";
            aQ.cookie = {
                scnd: "1"
            }
        }
        var aU = API_CTX.emos_campaignName;
        var aR = API_CTX.emos_sourceId;
        if (aO.refID) {
            aU = aO.refID;
            if (aO.emsrc) {
                aR = aO.emsrc
            }
        }
        if (aU) {
            if (aR) {
                if (aR == "kw") {
                    aO.adword = aU
                } else {
                    if (aR == "nl") {
                        aO.newsletter = aU
                    } else {
                        aO.campaign = aU
                    }
                }
            } else {
                aR = "cp";
                aO.campaign = aU
            }
        }
        if (aO.adword || aO.amktid) {
            var aM = ad(aQ, aO, "kw");
            if (aO.adword) {
                aQ.adwordClick = aO.adword;
                aM.adword = aO.adword
            }
            if (aO.amktid) {
                aQ.amktidClick = aO.amktid;
                aM.amktid = aO.amktid
            }
            aM.ref = aN;
            if (aS) {
                aM.refUrl = aS
            }
            Q(aM, true, aN, aO, aL);
            return 
        }
        if (aO.campaign) {
            var aK = aR ? aR: "cp";
            if (aR&&!MC_COOKIE[aR]) {
                MC_COOKIE[aR] = MC_COOKIE.cp
            }
            var aM = ad(aQ, aO, aK);
            aQ.campClick = aO.campaign;
            aM.campaign = aO.campaign;
            if (aO.efp) {
                aM.efp = aO.efp
            }
            if (aO.efc) {
                aM.efc = aO.efc
            }
            if (aO.efpn) {
                aM.efpn = aO.efpn
            }
            if (aO.mktsp) {
                aM.mktsp = aO.mktsp
            }
            aM.ref = aN;
            if (aS) {
                aM.refUrl = aS
            }
            return 
        }
        if (aO.newsletter || aO.ecmId) {
            var aM = ad(aQ, aO, "nl");
            if (aO.newsletter) {
                aQ.newsClick = aO.newsletter;
                aM.news = aO.newsletter
            }
            if (aO.ecmId) {
                aM.newsmid = aO.ecmId
            }
            return 
        }
        if (aT == null || aT.length == 0) {
            aQ.source = "direct";
            az(aQ);
            return 
        }
        if (H(aN)) {
            aQ.ref = b(aT, -1);
            aQ.source = "intern";
            az(aQ);
            return 
        }
        if (Q(aQ, false, aN, aO, aL)) {
            return 
        }
        ad(aQ, aO, "ref").ref = aN
    }
    function ad(aK, aM, aL) {
        if (MC_COOKIE[aL]) {
            if (!aK.cookie) {
                aK.cookie = {}
            }
            aK.emcl = MC_COOKIE[aL];
            var e = aK.cookie;
            aB(ADD_COOKIE_PARAMS, aM, aL, e);
            e.source = aL;
            return e
        } else {
            aK.source = aL;
            return aK
        }
    }
    function aB(e, aL, aM, aK) {
        if (e.all) {
            K(e.all, aL, aK)
        }
        if (e[aM]) {
            K(e[aM], aL, aK)
        }
    }
    function K(aN, aM, aL) {
        for (var aK = 0; aK < aN.length; aK++) {
            var e = aM[aN[aK]];
            if (e) {
                aL[aN[aK]] = e
            }
        }
    }
    function az(aK) {
        var e = Z(COOKIENAME_POSTVIEWCAMPAIGN);
        if (e && e.length > 0) {
            aK.source = "cp";
            aK.campaign = ao(e)
        }
    }
    function av(aK) {
        ac(aK);
        if (aK.cookie&&!(TRACK_THIRD_PARTY && TRACK_POSTCONVERSION)) {
            U(aK, aK.cookie);
            aK.postconv = "0"
        }
        if (TRACK_FIRSTPARTY && TRACK_POSTCONVERSION) {
            if (aK.cookie) {
                var aM = null;
                if (aK.emcl) {
                    aM = parseInt(aK.emcl)
                }
                if (!aM) {
                    aM = CLIENT_COOKIE_LIFETIME
                }
                aM = aM * 86400;
                aw(COOKIENAME_CAMPAIGN, W(aK.cookie) + "&ccbt=" + Math.floor(new Date().getTime() / 1000), aM)
            } else {
                var aL = Z(COOKIENAME_CAMPAIGN);
                if (aL && aL.length > 0) {
                    var e = aq(aL);
                    if (e.scnd && e.scnd == "1") {
                        carriesSecondaryCookie = true
                    }
                    aK.postconv = "1";
                    e.ccbtd = Math.floor(new Date().getTime() / 1000) - parseInt(e.ccbt);
                    delete e.ccbt;
                    U(aK, e)
                }
            }
        }
    }
    function O() {
        var aP = Z(COOKIENAME_POSTVIEW);
        if (aP && aP.length > 0) {
            var aN = new Date().getTime();
            aP = ao(aP);
            var aK = [];
            var e = aP.split("@");
            for (var aL = 0; aL < e.length; aL++) {
                if (e[aL]) {
                    var aM = aq(e[aL]);
                    var aO = parseInt(aM.t);
                    if (isFinite(aO)) {
                        aM.td = aN - aO;
                        delete aM.t
                    }
                    aK.push(W(aM))
                }
            }
            return aK.join("@")
        }
        return null
    }
    function H(e) {
        return (e.split("/")[2] == location.host)
    }
    var Y = [["q", null, "ie", "start", 1], ["p", null, null, "b", 1], ["su", null, null, "pageIndex", 10], ["query", null, null], ["qry_str", null, null], ["begriff", null, null], ["words", null, null], ["encquery", null, null], ["qt", null, null], ["terms", null, null], ["text", /yandex\./g, null], ["wd", /\.baidu\./g, null], ["w", /\.soso\./g, null]];
    function Q(aQ, aO, aL, aU, e) {
        for (var aN = 0; aN < Y.length; aN++) {
            var aM = Y[aN];
            var aR = e[aM[0]];
            if (aR) {
                var aK = aM[1];
                if (aK == null || aL.search(aK) >= 0) {
                    var aP = aO ? aQ: ad(aQ, aU, "suma");
                    var aT = aM[2];
                    if (aT && e[aT]) {
                        aP.smqpe = e[aT];
                        aP.smqp = aR
                    } else {
                        aP.smqp = ao(aR)
                    }
                    if (aM.length == 5 && e[aM[3]]) {
                        var aS = parseInt(e[aM[3]]);
                        if (!isNaN(aS)) {
                            aP.smstart = aS * aM[4]
                        }
                    }
                    if (!aO) {
                        aP.ref = aL;
                        if (SECOND_ACTIVE && SECOND_SUMA) {
                            sendSecondary = true
                        }
                    }
                    return true
                }
            }
        }
        return false
    }
    function at(aR) {
        var aK;
        M = "";
        try {
            aK = d(top.location.search, false)
        } catch (aQ) {
            aK = d(location.search, false)
        }
        var aM = aK.emcs0 ? aK.emcs0: "na";
        var aO = aK.emcs1 ? aK.emcs1: "na";
        var aT = aK.emcs2 ? aK.emcs2: "na";
        var aL = aK.emcs3 ? aK.emcs3: "na";
        if (aM == "na") {
            aM = aK.celPHName ? aK.celPHName : "na";
            aO = aK.celRecommendationType ? aK.celRecommendationType : "na";
            aT = aK.celSourceId ? aK.celSourceId : "na";
            aL = aK.celTargetId ? aK.celTargetId : "na"
        }
        aM = (typeof(emcs0) != "undefined") ? emcs0 : aM;
        aO = (typeof(emcs1) != "undefined") ? emcs1 : aO;
        aT = (typeof(emcs2) != "undefined") ? emcs2 : aT;
        aL = (typeof(emcs3) != "undefined") ? emcs3 : aL;
        if (aM != "na" && aL == "na") {
            if (aR.ec_Event && aR.ec_Event[0] && aR.ec_Event[0][PRODUCT_ID_IN_EC_EVENT]) {
                aL = aR.ec_Event[0][PRODUCT_ID_IN_EC_EVENT]
            }
        }
        if (aM != "na") {
            aR.crossData = [[ao(aM), ao(aO), ao(aT), ao(aL)]];
            M = aR.crossData
        }
        var aP = af();
        if (aP && aM == "na") {
            var aS = aP.split(":");
            if (aS.length && aS.length > 0) {
                aR.crossData = [];
                for (var aN = 0; aN < aS.length; aN++) {
                    aR.crossData[aR.crossData.length] = aS[aN].split(",")
                }
            } else {
                aR.crossData = aS[0].split(",")
            }
        }
    }
    function ax(aO) {
        var aN = document.getElementsByName("emos_name");
        for (var aM = 0; aM < aN.length; aM++) {
            var e = aN[aM].title;
            var aL = aN[aM].rel;
            var aK = aN[aM].rev;
            if (e.length > 0) {
                if (aL.length > 0) {
                    if (aK.length > 0) {
                        aO[e] = [[ao(aL), ao(aK)]]
                    } else {
                        aO[e] = ao(aL)
                    }
                }
            }
        }
    }
    function af() {
        var aM = Z(COOKIENAME_CROSS);
        if (M != "") {
            var aL = String(M);
            aL = aL.split(",");
            aL[1] = "previous_visit";
            if (aM && aM.length > 0) {
                var aK = aM.split(":");
                var aN = [];
                if (aK.length > 0) {
                    for (var e = 0; e < aK.length; e++) {
                        if (aK[e] == aL) {
                            return aM
                        } else {
                            aN[e + 1] = aK[e]
                        }
                    }
                    aN[0] = aL;
                    if (aN.length > 5) {
                        aN.length = 5
                    }
                }
                aL = aN.join(":");
                aw(COOKIENAME_CROSS, aL, CLIENT_COOKIE_LIFETIME * 86400);
                return aL
            } else {
                aw(COOKIENAME_CROSS, aL, CLIENT_COOKIE_LIFETIME * 86400);
                return aL
            }
        } else {
            if (aM && aM.length > 0) {
                return aM
            }
        }
        return null
    }
    function N(aN, aL) {
        try {
            if (aN) {
                if (aN.length && aN.length > 0) {
                    aL.ec_Event = [];
                    for (var aK = 0; aK < aN.length; aK++) {
                        aL.ec_Event[aL.ec_Event.length] = aC(aN[aK])
                    }
                } else {
                    aL.ec_Event = [aC(aN)]
                }
            }
        } catch (aM) {}
    }
    function aC(aL) {
        var e = aG(aL, "event");
        var aK = aG(aL, "id");
        var aP = aG(aL, "name");
        var aS = aG(aL, "preis");
        var aR = aG(aL, "group");
        var aQ = aG(aL, "anzahl");
        var aO = aG(aL, "var1");
        var aN = aG(aL, "var2");
        var aM = aG(aL, "var3");
        return [e, aK, aP, aS, aR, aQ, aO, aN, aM]
    }
    function aG(aK, e) {
        return aK[e] ? ao(aK[e]) : "NULL"
    }
    function P(aK) {
        try {
            if (API_CTX.emosCustomPageArray) {
                aK[ao(API_CTX.emosCustomPageArray[0])] = [o(API_CTX.emosCustomPageArray.slice(1))]
            }
        } catch (aL) {}
    }
    function A(aM) {
        try {
            if (API_CTX.emosCustomMultiArray && API_CTX.emosMultiArrayID) {
                var aK = [];
                for (var aL = 0; aL < API_CTX.emosCustomMultiArray.length; aL++) {
                    aK[aL] = o(API_CTX.emosCustomMultiArray[aL])
                }
                aM[ao(API_CTX.emosMultiArrayID)] = aK
            }
        } catch (aN) {}
    }
    function t(aM, aK) {
        try {
            if (aM) {
                aK.billing = [o(aM)]
            }
        } catch (aL) {}
    }
    function V(aL, aN) {
        try {
            if (aL) {
                aN.ec_Event = [];
                for (var aK = 0; aK < aL.length; aK++) {
                    var aM = ["buy"];
                    for (var aP = 0; aP < aL[aK].length; aP++) {
                        aM[aP + 1] = ao(aL[aK][aP])
                    }
                    aN.ec_Event[aN.ec_Event.length] = aM
                }
            }
        } catch (aO) {}
    }
    function X(aM, aK, aO) {
        try {
            if (aK && aM) {
                var aL = [];
                for (var aN = 0; aN < aK.length; aN++) {
                    aL[aN] = o(aK[aN])
                }
                aO[ao(aM)] = aL
            }
        } catch (aP) {}
    }
    function aj() {
        if (COOKIE_DOMAIN == null) {
            var e = window.location.hostname.split(".");
            var aM = e[e.length-1];
            var aN = e[e.length-2];
            var aL = (aM == "uk" || aM == "tr" || aM == "br" || (aM == "at" && aN == "co") || (aM == "jp" && (aN == "co" || aN == "ac" || aN == "go" || aN == "ne" || aN == "or"))) ? 3: 2;
            if (isNaN(parseInt(aM)) && e.length >= aL) {
                COOKIE_DOMAIN = "";
                for (var aK = e.length - aL; aK < e.length; aK++) {
                    COOKIE_DOMAIN = COOKIE_DOMAIN + "." + e[aK]
                }
            } else {
                COOKIE_DOMAIN = window.location.hostname
            }
        }
    }
    function U(aL, aK) {
        for (var e in aK) {
            aL[e] = aK[e]
        }
    }
    function r(aK) {
        if (!x) {
            return 
        }
        var e = {};
        e.siteid = SITE_ID;
        if (API_CTX.emosGlobalProperties) {
            U(e, API_CTX.emosGlobalProperties)
        }
        U(e, aK);
        e.emosV = EMOS_VERSION;
        e.plReqId = x;
        q(e, j(), 0)
    }
    API_CTX.emos_ecEvent = function(aR, aL, aK, aT, aS, aP, aO, aN, aM) {
        var aQ = {};
        n(aQ);
        var e = [[ao(aR), ao(aL), ao(aK), ao(aT), ao(aS), ao(aP), ao(aO), ao(aN), ao(aM)]];
        aQ.ec_Event = e;
        S(aQ, EVENT_MILLIS);
        return true
    };
    API_CTX.emosPropertiesEvent = function(aK) {
        if (aK.type && aK.type == "event") {
            r(aK);
            return true
        }
        var e = {};
        if (aK.cookie) {
            e.cookie = aK.cookie
        }
        n(e);
        U(e, aK);
        S(e, 0);
        return true
    };
    API_CTX.emos_userEvent1 = function(e, aL) {
        var aK = {};
        n(aK);
        aK[e] = ao(aL);
        S(aK, EVENT_MILLIS);
        return true
    };
    API_CTX.emos_userEvent2 = function(e, aL, aK) {
        var aM = {};
        n(aM);
        aM[e] = [[ao(aL), ao(aK)]];
        S(aM, EVENT_MILLIS);
        return true
    };
    API_CTX.emosTargetEvent = function(aM, aO, aN, aL) {
        var e = {};
        n(e);
        var aK = 0;
        if (typeof aN == "boolean") {
            if (aN) {
                e.cGoal = "1";
                aK = 1
            }
        } else {
            if (typeof aN == "number") {
                if (aN != 0) {
                    e.cGoal = "1";
                    aK = aN
                }
            } else {
                if (typeof aN == "string") {
                    if (aN != "0") {
                        e.cGoal = "1";
                        aK = aN
                    }
                }
            }
        }
        if (typeof aL != "string") {
            aL = "d"
        }
        e.Target = [[ao(aM), ao(aO), aK, aL]];
        if (SECOND_ACTIVE) {
            e.secLabel = "Target"
        }
        e.content = "Target_" + ao(aM) + "_" + ao(aO);
        S(e, EVENT_MILLIS);
        return true
    };
    API_CTX.emosLeadEvent = function(aM, aP, aN, aL, aK, aO) {
        var e = {};
        n(e);
        e.LeadEvent = [[aM, ao(aP), ao(aN), ao(aL), ao(aK)]];
        if (aO) {
            e.cGoal = "1"
        }
        S(e, EVENT_MILLIS);
        return true
    };
    API_CTX.emosCustomEvent = function(aN, aM, e, aK, aO) {
        var aL = {};
        n(aL);
        aL[aN] = [[ao(aM), ao(e), ao(aK), ao(aO)]];
        S(aL, EVENT_MILLIS);
        return true
    };
    API_CTX.emosUserEvent = function(aK, aM, aL) {
        var e = {};
        n(e);
        e.uEvent = [[aK, ao(aM), ao(aL)]];
        S(e, EVENT_MILLIS);
        return true
    };
    function o(aL) {
        var aK = [];
        for (var e = 0; e < aL.length; e++) {
            aK[e] = ao(aL[e])
        }
        return aK
    }
    API_CTX.emosBuyEvent = function(aL, e) {
        var aK = {};
        n(aK);
        t(aL, aK);
        V(e, aK);
        if (SECOND_ACTIVE) {
            aK.secLabel = "ThankYou"
        }
        S(aK, EVENT_MILLIS);
        return true
    };
    API_CTX.emosFreeEvent = function(aK, e) {
        var aL = {};
        n(aL);
        X(aK, e, aL);
        S(aL, EVENT_MILLIS);
        return true
    };
    API_CTX.emos_submitFormData = function(aL) {
        if (!document.forms[aL]) {
            return true
        }
        var aK = {};
        n(aK);
        var e = [];
        for (var aM = 0; aM < (document.forms[aL].elements.length); aM++) {
            if (document.forms[aL].elements[aM].value != "") {
                e[aM] = [ao(document.forms[aL].elements[aM].name), ao(document.forms[aL].elements[aM].value)]
            }
        }
        aK.fName = aL;
        aK.fData = [e];
        S(aK, EVENT_MILLIS);
        return true
    };
    function d(aP, aK) {
        var aO = aP.indexOf("?");
        if (aO >= 0) {
            aP = aP.substr(aO + 1)
        }
        var aN = {};
        var aL = aP.split("&");
        for (var e = 0; e < aL.length; e++) {
            var aM = aL[e].split("=");
            if (aM[1]) {
                if (aK) {
                    aN[aM[0]] = ao(aM[1])
                } else {
                    aN[aM[0]] = aM[1]
                }
            } else {
                aN[aM[0]] = ""
            }
        }
        return aN
    }
    function ae() {
        ak();
        aj();
        l();
        w();
        if (TRACK_VERSION == 1) {
            C()
        }
        if (!G) {
            return 
        }
        if (TRACK_VERSION == 1 && window.addEventListener) {
            window.addEventListener("pageshow", function(e) {
                if (e.persisted) {
                    C()
                }
            }, false)
        }
        if (CAPTURE_CLICKS && L) {
            aF(document, "mousedown", aH)
        }
    }
    ae()
})();
