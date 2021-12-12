var
GUID = "$$SessionItem(guid)$$",
USERNAME = "$$SessionItem(username)$$",
FIRSTNAME = "$$SessionItem(firstname)$$",
PENDINGBONUSAMOUNT1_RANDOM = "$$SessionItem(mkw)$$",
FIRSTNAMENATIVE = "$$SessionItem(firstnamenative)$$",
RANDOMCHOSENPACKAGE = "$$SessionItem(RandomChosenPackage)$$",
RANDOMCHOSENPACKAGENATIVE = "$$SessionItem(randomchosenpackagenative)$$",
PROMOCODE = "$$SessionItem(promocode)$$",
PROMOCODENATIVE = "$$SessionItem(promocodenative)$$",
CURRENCY = "$$SessionItem(currency)$$",
CURRENCYNATIVE = "$$SessionItem(currencynative)$$",
CAMPAIGNID = "$$SessionItem(campaignID)$$",
CAMPAIGNIDNATIVE = "$$SessionItem(campaignidnative)$$",
LINKSOURCE = "$$SessionItem(linksource)$$";

function Game() {
this.brand = casino.getBrand();
this.style = "$$BrandStyle$$";
this.url = window.location.origin,
    this.id = 0;
this.country = '';
this.lang = '';
this.guid = GUID;
this.PendingBonusAmount1_random = PENDINGBONUSAMOUNT1_RANDOM;
this.username = USERNAME;
this.firstname = FIRSTNAME;
this.randomChosenPackage = RANDOMCHOSENPACKAGE;
this.promocode = PROMOCODE;
this.currency = CURRENCY;
this.campaignID = CAMPAIGNID;
this.linkSource = LINKSOURCE;
this.isValidStatus = "";
this.claimStatus = "";
this.saveGuidStatus = "";
this.flow = "";
this.status = "";
this.device = "";
this.browser = "";
this.ready = false;
this.injectable = (document.getElementById("gamePage") && document.getElementById("gamePage").hasAttribute("injectable")) ? true : false;
this.consoleLog = false;
this.errors = 0;

var that = this;
var __constructor = function() {
    that.init();
};

this.write = function(msg) {
    if ((this.ieVersion() < 1 || this.ieVersion() > 9) && this.consoleLog) {
        console.log(msg);
    }
}

this.init = function() {
    this.flow = "init()";

    this.id = this.randomNumber(1, 1000000);
    this.isMobile();
    this.browserType();

    if (this.linkSource == "1") {
        this.linkSource = "omg";
        this.firstname = FIRSTNAMENATIVE;
        this.randomChosenPackage = RANDOMCHOSENPACKAGENATIVE;
        this.promocode = PROMOCODENATIVE;
        this.currency = CURRENCYNATIVE;
        this.campaignID = CAMPAIGNIDNATIVE;
    } else {
        this.linkSource = "email";
    }

    if (document.getElementsByTagName("orbit") && typeof(webData) != "undefined") {
        this.country = webData.country;
        this.lang = webData.language.iso2;
    } else {
        this.country = rlCountry;
        this.lang = rlLang;
    }

    this.status = this.id + ", " + this.country + ", " + this.lang + ", " + this.device + ", " + this.browser + ", " + this.linkSource;

    if (this.currency.toLowerCase() == "gbp" || this.currency == "£") {
        this.currency = "£";
    } else if (this.currency.toLowerCase() == "eur" || this.currency == "€") {
        this.currency = "€";
    } else if (this.currency.toLowerCase() == "usd" || this.currency == "$") {
        this.currency = "$";
    } else {
        this.currency = "$/€/£";
    }

    this.randomChosenPackage = parseInt(this.randomChosenPackage);

    if (this.randomChosenPackage == "") {
        this.randomChosenPackage = 0;
    }

    if (this.injectable) {
        this.injectContent();
    }

    if (this.brand == "777.com") {
        this.style777();
    } else {
        this.style888casino();
    }

    if (this.isInsideIframe()) {
        this.insideIframeStyle();
    }

    this.injectParameters();
};

this.injectContent = function() {
    $("[inject]").each(function() {
        if ($(this).attr("inject") != "") {
            $(this).appendTo($(this).attr("inject"));
        }
    });
};

this.style888casino = function() {
    this.flow += ", style888casino()";

    $("body").addClass("casinoBG");
    $("body").addClass(this.style);
};

this.style777 = function() {
    this.flow += ", style777()";

    $("body").addClass(this.style);
};

this.insideIframeStyle = function() {
    if (this.brand == "777") {
        $("#MainDiv").css("padding-bottom", "70px");
    }
    this.disableLinksAndButtons();
};

this.injectParameters = function() {
    this.flow += ", injectParameters()";
    $(".PendingBonusAmount1_random").text(this.PendingBonusAmount1_random);
    $(".firstname").text(this.firstname);
    $(".promocode").text(this.promocode);
    $(".currency").text(this.currency);
};

this.message = {
    show: function(messageValue) {
        that.flow += ", message.show(" + messageValue + ")";
        that.status += ", message.show(" + messageValue + ")";

        if (messageValue == undefined) {
            messageValue = "";
        }
        messageValue = messageValue.toLowerCase();

        switch (messageValue) {
            case "congrats":
            case "1":
            case 1:
                that.write("### SHOWING MESSAGE: Congrats ###");
                $(".congrats").css("display", "block");
                break;
            case "guid already in use":
            case "4":
            case 4:
                that.write("### SHOWING MESSAGE: GUID already in use ###");
                $(".usedSpin").css("display", "block");
                break;
            case "not found campaign":
                that.write("### SHOWING MESSAGE: Not Found campaign ###");
                $(".error").css("display", "block");
                break;
            case "campaign not active":
            case "2":
            case 2:
                that.write("### SHOWING MESSAGE: Campaign not active ###");
                $(".expired").css("display", "block");
                break;
            case "pass daily limit":
                that.write("### SHOWING MESSAGE: Pass daily limit ###");
                $(".usedSpin").css("display", "block");
                break;
            case "pass total limit":
                that.write("### SHOWING MESSAGE: Pass total limit ###");
                $(".error").css("display", "block");
                break;
            case "error":
            case "3":
            case 3:
                that.write("### SHOWING MESSAGE: Error ###");
                $(".error").css("display", "block");
                break;
            default:
                that.write("### SHOWING MESSAGE: Error (default error) ###");
                $(".error").css("display", "block");
        }
        $(".messages").css("display", "block");
        $(".message").addClass("opacity-1");
        that.loader.hide();
        that.cover.show();
        setTimeout(function() {
  $(".messages, .message-overlay").addClass("opacity-1");
  clicked = true;
  var emptySpinImg = $('.btn-spin img').attr('default-btn');
  $('.btn-spin img').attr('src', emptySpinImg);
  $('.btn-spin').addClass("disable-btn");
}, 200);
    },
    hide: function(messageValue) {
        that.flow += ", message.hide(" + messageValue + ")";
        that.status += ", message.hide(" + messageValue + ")";

        if (messageValue == undefined) {
            messageValue = "";
        }

        if (messageValue != "") {
            // Hide Specific
            messageValue = messageValue.toLowerCase();
            switch (messageValue) {
                case "congrats":
                case "1":
                case 1:
                    that.write("### HIDING MESSAGE: Congrats ###");
                    $(".congrats").css("display", "none");
                    break;
                case "guid already in use":
                case "4":
                case 4:
                    that.write("### HIDING MESSAGE: GUID already in use ###");
                    $(".usedSpin").css("display", "none");
                    break;
                case "not found campaign":
                    that.write("### HIDING MESSAGE: Not Found campaign ###");
                    $(".error").css("display", "none");
                    break;
                case "campaign not active":
                case "2":
                case 2:
                    that.write("### HIDING MESSAGE: Campaign not active ###");
                    $(".expired").css("display", "none");
                    break;
                case "pass daily limit":
                    that.write("### HIDING MESSAGE: Pass daily limit ###");
                    $(".usedSpin").css("display", "none");
                    break;
                case "pass total limit":
                    that.write("### HIDING MESSAGE: Pass total limit ###");
                    $(".error").css("display", "none");
                    break;
                case "error":
                case "3":
                case 3:
                    that.write("### HIDING MESSAGE: Error ###");
                    $(".error").css("display", "none");
                    break;
                default:
                    that.flow += " -> Unable to hide an unknown message type";
                    that.status += " -> Unable to hide an unknown message type";
            }
        } else if (messageValue == "all") {
            // Hide all
            that.flow += " -> Hiding All Messages";
            $(".messages").css("display", "none");
            $(".message").removeClass("opacity-1");
            setTimeout(function() {
                $(".messages").removeClass("opacity-1");
            }, 200);
        }
    }
};

this.isValid = function(conditionalValue) {
    console.log("isValid FUNCTION")
    var canPlayData = "username=" + this.username + "&campaign_id=" + this.campaignID + "&guid=" + this.guid;

    this.flow += ", isValid()";

    if (conditionalValue == "reset") {
        this.isValidStatus = "";
    } else {
        if (this.guid == "" || this.randomChosenPackage == 0) {
            this.isValidStatus = "error";
            this.status += ", isValid() - Error: Data is missing";
            this.errors++;
            this.log(this.status);
        } else {
            if (this.isValidStatus == "") {
                that.isValidStatus = "can play";
                that.status += ", isValid() - Result: " + "can play";

                //TO DO: SHOW ERROR MESSAGES BEFORE SPIN






                // $.ajax({
                //     type: "POST",
                //     jsonpCallback: "jsonpVal",
                //     url: "",
                //     data: canPlayData,
                //     dataType: "jsonp",
                //     success: function(data) {
                //         that.isValidStatus = "can play";
                //         that.status += ", isValid() - Result: " + "can play";
                //     },
                //     error: function(data) {
                //         that.isValidStatus = "can play";
                //         that.status += ", isValid() - Result: " + "can play";
                //     },
                //     complete: function() {

                //     }
                // });
            }
        }
    }
    return this.isValidStatus;
};

this.claim = function(conditionalValue) {
    console.log("CLAIM FUNCTION")
    var claimUrl = this.url + "/claim/random/?guid=" + this.guid,
        ajaxValue = "",
        isCasino = (typeof(casino) != 'undefined' && casino.isCasino()) ? true : false;

    this.write("### claimUrl: " + claimUrl);
    this.write("### isCasino: " + isCasino);

    this.flow += ", claim()";

    if (conditionalValue == "reset") {
        this.claimStatus = "";
    } else {
        if (this.claimStatus == "") {
            this.claimStatus = "waiting";
            this.write("### CLAIM REQUEST HAS BEEN SENT ###");

            $.ajax({
                type: "POST",
                url: claimUrl,
                success: function(result) {
                    ajaxValue = $(result).find("#fullContent > div").text();
                    ajaxValue = ajaxValue.replace(/\D/g, "");
                    that.claimStatus = ajaxValue;
                    that.write("### that.claimStatus: " + that.claimStatus);
                    if (parseInt(ajaxValue) != 1 && parseInt(ajaxValue) != 4) {
                        that.status += ", claim() - Error: " + ajaxValue;
                        that.errors++;
                        //that.log(that.status);
                    } else {
                        that.status += ", claim() - Result: " + ajaxValue;
                    }
                },
                error: function(result) {
                    that.claimStatus = "error";
                    that.status += ", claim() - API Error";
                    that.errors++;
                    //that.log(that.status);
                    that.write("### that.claimStatus error!");
                },
                complete: function() {

                }
            });
        }
    }

    return this.claimStatus;
};

this.saveGuid = function(conditionalValue) {
    // var data = "guid=" + this.guid + "&username=" + this.username + "&campaign_id=" + this.campaignID;

    // this.flow += ", saveGuid()";

    // if (this.saveGuidStatus == "") {
    //     this.saveGuidStatus = "waiting";
    //     this.write("### saveGuid REQUEST HAS BEEN SENT ###");
    //     $.ajax({
    //         type: "POST",
    //         url: "//apps.secureutils.com/campaigns/api/index/canPlay",
    //         data: data,
    //         dataType: "jsonp",
    //         jsonpCallback: "jsonpVal",
    //         success: function(result) {
    //             if (typeof(result.success) != "undefined" && result.success == "1") {
    //                 that.saveGuidStatus = "success";
    //                 that.status += ", saveGuid() - Result: Guid was saved successfully";
    //             } else {
    //                 that.saveGuidStatus = "success";
    //                 that.status += ", saveGuid() - Result: Guid was saved successfully";
    //             }
    //         },
    //         error: function(result) {
    //             that.saveGuidStatus = "success";
    //             that.status += ", saveGuid() - Result: Guid was saved successfully";
    //         },
    //         complete: function() {}
    //     });
    // }

    return this.saveGuidStatus;
};

this.execute = function(trigger, callbackConditions, fallback, maxSecondsForReponse) {
    var i = 0,
        triggerResponseValue = "",
        conditionFound = false,
        times = 0,
        executeTimerSpeed = 100,
        executeTimer;

    this.flow += ", execute()";

    if (maxSecondsForReponse == undefined) {
        maxSecondsForReponse = 6;
    }

    if (typeof(trigger) != "undefined" && typeof(callbackConditions) == "object" && callbackConditions.length > 0) {
        executeTimer = setInterval(function() {
            if (times < (maxSecondsForReponse * 1000)) {
                if (typeof(trigger) == "function") {
                    triggerResponseValue = trigger.call(that);
                } else {
                    triggerResponseValue = trigger;
                }
                for (i = 0; i < callbackConditions.length; i++) {
                    if (!conditionFound) {
                        if (typeof(callbackConditions[i]["when"]) != "undefined") {
                            that.write("--- CHECKING for when -> trigger: " + triggerResponseValue + " | condition: " + callbackConditions[i]["when"]);
                            if (triggerResponseValue == callbackConditions[i]["when"]) {
                                that.write("Condition of 'when' was found!!!");
                                conditionFound = true;
                                executeConditionResult(callbackConditions[i]["call"], callbackConditions[i]["values"]);
                            }
                        } else if (typeof(callbackConditions[i]["whenNot"]) != "undefined") {
                            that.write("--- CHECKING for whenNot -> trigger: " + triggerResponseValue + " | condition: " + callbackConditions[i]["whenNot"]);
                            if (triggerResponseValue != callbackConditions[i]["whenNot"]) {
                                that.write("Condition of 'whenNot' was found!!!");
                                conditionFound = true;
                                executeConditionResult(callbackConditions[i]["call"], callbackConditions[i]["values"]);
                            }
                        } else {
                            that.write("--- execute() -> Condition Error!");
                        }
                    }
                }
            } else {
                clearInterval(executeTimer);
                if (conditionFound == false && typeof(fallback) == "object" && typeof(fallback["call"]) != "undefined") {
                    fallback["call"].apply(that, fallback["values"]);
                }
            }
            times += executeTimerSpeed;
        }, executeTimerSpeed);
    } else {
        if (typeof(trigger) != "undefined") {
            trigger.call(that);
        }
    }

    function executeConditionResult(callbackFunction, callbackFunctionValues) {
        var i = 0;
        clearInterval(executeTimer);
        if (typeof(callbackFunctionValues) == "undefined") {
            callbackFunctionValues = [];
        } else {
            for (i = 0; i < callbackFunctionValues.length; i++) {
                if (typeof(callbackFunctionValues[i]) == "function") {
                    callbackFunctionValues[i] = callbackFunctionValues[i].call(that);
                }
            }
        }
        callbackFunction.apply(that, callbackFunctionValues);
    }
};

this.disableLinksAndButtons = function() {
    this.flow += ", disableLinksAndButtons()";

    $("div.disableOption").css("display", "none");
    $("h1.disableOption").css("display", "none");
    $("h2.disableOption").css("display", "none");
    $("h3.disableOption").css("display", "none");
    $("p.disableOption").css("display", "none");
    $("span.disableOption").css("display", "none");
    $("a.disableOption").attr("onclick", "");
    $("a.disableOption").attr("href", "javascript:void(0)");
    $("a.disableOption").css("text-decoration", "none");
    $("a.disableOption").css("cursor", "text");
    $(".button.disableOption").css("display", "none");
}

this.loader = {
    show: function() {
        this.flow += ", loader.show()";
        $(".loader").css("display", "block");
    },
    hide: function() {
        this.flow += ", loader.hide()";
        $(".loader").css("display", "none");
    }
};

this.cover = {
    show: function() {
        this.flow += ", cover.show()";
        $(".cover").css("display", "block");
    },
    hide: function() {
        this.flow += ", cover.hide()";
        $(".cover").css("display", "none");
    }
};

this.randomNumber = function(min, max) {
    if (min == null || max == null) {
        that.write("Error in randomNumber()");
        return -1;
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

this.playNow = function() {
    this.flow += ", PlayNow()";

    if (this.brand == "777") {
        _commonjs888.push({
            "function": "SmartButton.setButton",
            "values": ["Play Now", "777.com", "", "18036", "tab", "false", "false", ""]
        });
    } else {
        // TODO: temp solution - need to be changes in smartAction
        /*orbit.deepLink({
            action: "login",
            dl: "18036",
            action_next: "redirect",
            id_next: ""
        });*/
        smartAction("Play Now", "", "", "", "", "", " / ");
    }
};

this.depositNow = function(promocodeValue) {
    this.flow += ", DepositNow()";

    if (promocodeValue == undefined) {
        promocodeValue = this.promocode;
    }

    if (this.brand == "777") {
        _commonjs888.push({
            "function": "SmartButton.setButton",
            "values": ["Deposit Now", "777.com", "", "18037", "tab", "false", "true", promocodeValue]
        });
    } else {
        // TODO: temp solution - need to be changes in smartAction
        orbit.deepLink({
            action: "cashier",
            id: "8," + promocodeValue,
            dl: "18037",
            action_next: "redirect",
            id_next: ""
        });
    }
};

this.isInsideIframe = function() {
    this.flow += ", isInsideIframe()";

    return (window.top != window.self) ? true : false;
};

this.isMobile = function() {
    var isMobileDevice = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false;

    this.flow += ", isMobile()";

    if (isMobileDevice) {
        this.device = "mobile"
    } else {
        this.device = "pc"
    }

    return isMobileDevice;
};

this.ieVersion = function() {
    if (window.ActiveXObject === undefined) return 0;
    if (!document.querySelector) return 7;
    if (!document.addEventListener) return 8;
    if (!window.atob) return 9;
    if (!document.__proto__) return 10;
    return 11;
};

this.browserType = function() {
    var browser = "",
        isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        isFirefox = typeof InstallTrigger !== 'undefined',
        isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
        isChrome = !!window.chrome && !isOpera,
        isChromeIOS = navigator.userAgent.match('CriOS'),
        isIE = false || !!document.documentMode,
        isEdge = navigator.userAgent.indexOf('Edge');

    if (isIE) {
        browser += "ie " + this.ieVersion();
    }
    if (isFirefox) {
        browser += "firefox ";
    }
    if (isSafari) {
        browser += "safari ";
    }
    if (isOpera) {
        browser += "opera ";
    }
    if (isChrome) {
        browser += "chrome ";
    }
    if (isChromeIOS == "CriOS") {
        browser += "ios-chrome ";
    }
    if (isEdge >= 0) {
        browser += "edge ";
    }
    if (browser == "") {
        browser += "unknown browser";
    }

    this.browser = browser;
    return browser;
}

// this.log = function(msg) {
//     this.flow += ", log(" + msg + ")";

//     if (this.guid == "") {
//         this.guid = "empty";
//     }
//     if (this.username == "") {
//         this.username = "empty";
//     }
//     if (this.campaignID == "") {
//         this.campaignID = "0000";
//     }

//     var data = "username=" + this.username + "&campaign_id=" + this.campaignID + "&guid=" + this.guid + "&msg=" + msg;
//     $.ajax({
//         type: "POST",
//         url: "//apps.secureutils.com/campaigns/api/index/canPlay",
//         data: data,
//         dataType: "jsonp",
//         jsonpCallback: "jsonpVal",
//         success: function(data) {

//         },
//         error: function(data) {

//         },
//         complete: function() {}
//     });
// };

this.report = function() {
    this.consoleLog = true;
    this.write("Game ID: " + this.id);
    this.write("Country: " + this.country);
    this.write("Language: " + this.lang);
    this.write("Device: " + this.device);
    this.write("Browser: " + this.browser);
    this.write("Link Source: " + this.linkSource);
    this.write("Guid: " + this.guid);
    this.write("User Name: " + this.username);
    this.write("First Name: " + this.firstname);
    this.write("Random Chosen Package: " + this.randomChosenPackage);
    this.write("Promocode: " + this.promocode);
    this.write("Currency: " + this.currency);
    this.write("Campaign ID: " + this.campaignID);
    this.write("Status: " + this.status);
    this.write("Errors: " + this.errors);
};

return __constructor();
}

function jsonpVal() {

}

//var isOrbit = document.getElementsByTagName("orbit").length;

/*if (!isOrbit) {
$(document).ready(function() {
    createJackpots();
});
}*/