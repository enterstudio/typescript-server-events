"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var servicestack_client_1 = require("servicestack-client");
var CHANNEL = "";
var BASEURL = "";
var MESSAGES = {};
var $ = function (sel) { return document.querySelector(sel); };
var $$ = function (sel) { return document.querySelectorAll(sel); };
var $msgs = $("#messages > div");
var $users = $("#users > div");
var sub = null;
var addMessage = function (x) {
    return addMessageHtml("<div><b>" + x.selector + "</b> <span>" + x.json + "</span></div>");
};
var addMessageHtml = function (html) {
    return (MESSAGES[CHANNEL] || (MESSAGES[CHANNEL] = [])).push(html);
};
var refreshMessages = function () {
    return $msgs.innerHTML = (MESSAGES[CHANNEL] || []).reverse().join('');
};
var refresh = function (e) {
    addMessage(e);
    refreshMessages();
    refreshUsers();
};
var client = null;
var refreshUsers = function () { return __awaiter(_this, void 0, void 0, function () {
    var users, usersMap, userIds, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.getChannelSubscribers()];
            case 1:
                users = _a.sent();
                users.sort(function (x, y) { return x.userId.localeCompare(y.userId); });
                usersMap = {};
                userIds = Object.keys(usersMap);
                html = users.map(function (x) {
                    return "<div class=\"" + (x.userId == sub.userId ? 'me' : '') + "\"><img src=\"" + x.profileUrl + "\" /><b>@" + x.displayName + "</b><i>#" + x.userId + "</i><br/></div>";
                });
                $users.innerHTML = html.join('');
                return [2 /*return*/];
        }
    });
}); };
var startListening = function () {
    BASEURL = $("#baseUrl").value;
    CHANNEL = $("#channel").value;
    if (client != null)
        client.stop();
    console.log("Connecting to " + BASEURL + " on channel " + CHANNEL);
    client = new servicestack_client_1.ServerEventsClient(BASEURL, [CHANNEL], {
        handlers: {
            onConnect: function (e) {
                sub = e;
                e.selector = "onConnect";
                e.json = JSON.stringify(e);
                refresh(e);
            },
            onJoin: refresh,
            onLeave: refresh,
            onUpdate: refresh,
            onMessage: function (e) {
                addMessage(e);
                refreshMessages();
            }
        },
        onException: function (e) {
            addMessageHtml("<div class=\"error\">" + (e.message || e) + "</div>");
        }
    }).start();
};
startListening();
$("#btnChange").onclick = startListening;
$$("input").forEach(function (x) { return x.onkeydown = function (e) { return e.keyCode == 13 ? startListening() : null; }; });
//# sourceMappingURL=app.js.map