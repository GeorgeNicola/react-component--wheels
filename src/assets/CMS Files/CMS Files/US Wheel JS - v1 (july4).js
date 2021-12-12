Game.prototype.settings = {
    mechanism: "single",
    totalRounds: 2,
    child: {
        totalRounds: 3,
        packages: {
            degrees: []
        }
    },
    packages: {
        prizes: [],
        degrees: []
    },
    ticker: {
        visible: true,
        animate: false
    },
    nodes: {
        visible: false
    },
    disclaimer: {
        className: "disclaimer",
        exist: function () {
            return $("." + this.className).length;
        }
    }
};

Game.prototype.initiate = function () {
    // Remove ticker when not visible
    if (this.settings.ticker.visible) {
        $("#ticker-container").css("opacity", "1");
    } else {
        $("#ticker-container").remove();
    }

    if (
        this.settings.ticker.visible &&
        this.settings.ticker.animate &&
        this.settings.nodes.visible
    ) {
        this.animation.animateTickerAndNodes = true;
    }

    // Set prize
    if (this.settings.packages.prizes.length) {
        $(".percent").text(
            this.settings.packages.prizes[this.randomChosenPackage - 1]
        );
    }
};

Game.prototype.iframeStyle = function ($disclaimer) {
    $(".headerStrip").css("display", "none");
    $(".sentence").css("padding-top", "1%");

    // Moving the disclaimer to the top of the page
    if (
        this.isMobile() &&
        this.country == "gbr" &&
        this.lang == "en" &&
        $disclaimer.length
    ) {
        var disclaimerContent = $disclaimer.html();
        $disclaimer.remove();
        $("#main-content").before(
            "<div class='" +
            this.settings.disclaimer.className +
            " disclaimerIframePosition'>" +
            disclaimerContent +
            "</div>"
        );
    }
};

Game.prototype.welcome = {
    show: function () {
        this.flow += " | welcome.show()";
        $(".welcome").addClass("opacity-1");
        $(".headerBG").addClass("opacity-1");
        $(".welcome").removeClass("opacity-0");
        $(".headerBG").removeClass("opacity-0");
    },
    hide: function () {
        this.flow += " | welcome.hide()";
        $(".welcome").removeClass("opacity-1");
        $(".headerBG").removeClass("opacity-1");
        $(".welcome").addClass("opacity-0");
        $(".headerBG").addClass("opacity-0");
        $(".welcome").css("cursor", "default");
        $(".welcome h1").css("cursor", "default");
        $(".welcome .button").css("cursor", "default");
    },
    button: {
        show: function () {
            $(".welcome .button").animate({ opacity: "1" }, 200);
        },
        hide: function () {
            $(".welcome .button").animate({ opacity: "0" }, 200);
        }
    }
};

Game.prototype.enable = function () {
    this.flow += " | enable()";

    this.loader.hide();
    this.cover.hide();
    this.welcome.button.show();
};

Game.prototype.activate = function () {
    console.log("######### activate 1");
    console.log("######### ValidStatus => ", this.isValidStatus);
    if (this.isValidStatus == "can play") {

        //DISPLAY ERROR MESSAGES BEFORE SPIN (After clicking "spin")
        this.execute(
            this.claim,
            [
                {
                    when: "1",
                    call: function () {
                        console.log("######### activate 2");
                        if (!this.animation.started) {
                            this.flow += " | activateGame()";

                            this.animation.started = true;
                            this.animation.start();

                            this.welcome.button.hide();
                            this.claim();
                            console.log("CLAIM STATUS:", this.claimStatus)
                        }
                    }
                },
                {
                    when: "2",
                    call: function () {
                        this.message.show("campaign not active");
                    }
                },
                {
                    when: "3",
                    call: function () {
                        this.message.show("error");
                    }
                },
                {
                    when: "4",
                    call: function () {
                        this.message.show("guid already in use");
                    }
                },
                {
                    whenNot: "waiting",
                    call: function () {
                        //this.message.show("guid already in use");
                    }
                }
            ],
            {
                call: function () {
                    /*
                    wheel.message.show("error");
                    if (typeof error == "function") {
                      error();
                    }
                    */
                }
            }
        )
        
       
    } else {
       console.log("######### activate 3");
        this.log("### USER IS NOT VALID! UNABLE TO ACTIVATE THE GAME! ###");
    }
};

Game.prototype.animation = {
    global: Game.prototype,
    finalDegree: 0,
    increase: 0,
    rotation: 1,
    tickerRotation: 0,
    tickerAngle: 0,
    animateTickerAndNodes: false,
    started: false,
    active: false,
    lockResetTimer: false,
    testMode: false,
    wheelTimer: null,
    timerSpeed: 16,
    finalStop: 0,
    element: null,
    $element: null,
    totalRounds: Game.prototype.settings.totalRounds,
    child: {
        element: null,
        $element: null,
        increase: 0,
        rotation: 1,
        finalDegree: 0,
        finalStop: 0,
        totalRounds: Game.prototype.settings.child.totalRounds
    },
    container: {
        width: 0,
        height: 0,
        radius: 0,
        left: 0,
        top: 0,
        collisionArea: 0
    },
    node: {
        state: Game.prototype.settings.nodes,
        number: 0,
        width: 0,
        current: 0,
        circumference: 0
    },
    ticker: {
        state: Game.prototype.settings.ticker,
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        angle: 0,
        addDegrees: 0,
        container: {
            width: 0,
            height: 0,
            left: 0,
            top: 0
        }
    },
    collision: {
        point1: {
            left: 0,
            size: 0
        },
        point2: {
            left: 0,
            size: 0
        }
    },
    setFinalDegree: function (randomChosenPackage) {
        if (this.global.settings.packages.degrees.length) {
            this.finalDegree = parseInt(
                this.global.settings.packages.degrees[randomChosenPackage - 1]
            );
            if (this.global.settings.mechanism == "double") {
                this.child.finalDegree = parseInt(
                    this.global.settings.child.packages.degrees[randomChosenPackage - 1]
                );
            }
        } else {
            switch (randomChosenPackage) {
                case 1:
                    this.finalDegree = 335;
                    break;
                case 2:
                    this.finalDegree = 295;
                    break;
                case 3:
                    this.finalDegree = 265;
                    break;
                case 4:
                    this.finalDegree = 225;
                    break;
                case 5:
                    this.finalDegree = 190;
                    break;
            }
        }
    },
    createIndicationElements: function () {
        var i = 0,
            indicationElements = [
                "<div id='ticker' class='ticker indication'></div>",
                "<div id='oTicker' class='indication'></div>",
                "<div id='aTicker' class='indication'></div>",
                "<div id='pointer1' class='pointer indication'></div>",
                "<div id='pointer2' class='pointer indication'></div>",
                "<div id='collisionPoint1' class='collisionPoint indication'></div>",
                "<div id='collisionPoint2' class='collisionPoint indication'></div>",
                "<div id='absoluteCenter' class='indication'></div>"
            ];

        for (i = 0; i < indicationElements.length; i++) {
            $("#wheel-container").append(indicationElements[i]);
        }
    },
    getElementsData: function () {
        this.container.width = $("#wheel-container").width();
        this.container.height = $("#wheel-container").height();
        this.container.radius = this.container.width / 2;
        this.container.left = $("#wheel-container").offset().left;
        this.container.top = $("#wheel-container").offset().top;

        this.ticker.container.width = $("#ticker-container").width();
        this.ticker.container.height = $("#ticker-container").height();
        this.ticker.container.left =
            $("#ticker-container").offset().left - this.container.left;
        this.ticker.container.top =
            $("#ticker-container").offset().top - this.container.top;

        this.ticker.width = $("#ticker").width();
        this.ticker.height = $("#ticker").height();
        this.ticker.left = $("#ticker").position().left;
        this.ticker.top = $("#ticker").position().top;

        this.collision.point1.left =
            $("#collisionPoint1").offset().left - this.container.left;
        this.collision.point2.left =
            $("#collisionPoint2").offset().left - this.container.left;
    },
    drawNodes: function () {
        var i = 0,
            nodeX = 0,
            nodeY = 0,
            nodePositionStyle = 0,
            angle = 0,
            nodePositionDegree = 0;

        this.node.circumference = this.container.width / 2.1;
        this.node.width = (this.container.width * 0.06) / 5;

        for (i = 0; i < this.node.number; i++) {
            angle = (i / (this.node.number / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
            nodePositionDegree = angle * (180 / Math.PI);
            nodeX =
                this.node.circumference * Math.cos(angle) + this.container.radius; // Calculate the x position of the element.
            nodeY =
                this.node.circumference * Math.sin(angle) + this.container.radius; // Calculate the y position of the element.
            nodeX = ((nodeX - this.node.width / 2) / this.container.width) * 100;
            nodeY = ((nodeY - this.node.width / 2) / this.container.width) * 100;
            nodePositionStyle = "top: " + nodeY + "%; " + " left: " + nodeX + "%;";
            $("#wheel").append(
                "<div class='node node" +
                i +
                "' style='" +
                nodePositionStyle +
                "' value='" +
                i +
                "'></div>"
            );
            
            $("#wheel-overlay").append(
                "<div class='nodeDot nodeDot" +
                i +
                "' style='" +
                nodePositionStyle +
                "' value='" +
                i +
                "'></div>"
            );
        }

        $(".node").css("width", this.node.width);
        $(".node").css("height", this.node.width);
    },
    findFirstNode: function () {
        // finding the first node that will collide with the ticker
        this.node.current = this.node.number * 0.75;
        Math.floor(this.node.current) == this.node.current
            ? this.node.current--
            : (this.node.current -= 0.5);
    },
    initiateTicker: function () {
        $("#ticker-container").css("opacity", "1");

        $("#ticker").css(
            "left",
            this.ticker.container.left +
            this.ticker.container.width / 2 -
            this.ticker.width / 2
        );
        $("#ticker").css(
            "top",
            this.ticker.container.top +
            this.ticker.container.height / 2 -
            this.ticker.height / 2
        );

        this.ticker.left = $("#ticker").position().left;
        this.ticker.top = $("#ticker").position().top;
    },
    setCollisionIndicators: function () {
        this.collision.point1.left =
            $("#collisionPoint1").offset().left - this.container.left;
        this.collision.point2.left =
            $("#collisionPoint2").offset().left - this.container.left;

        this.container.collisionArea =
            this.ticker.container.left + this.ticker.container.width / 1.5;
    },
    setElementsPosition: function () {
        var tickerAngle = this.ticker.angle < 0 ? 0 : this.ticker.angle,
            tickerRadians = tickerAngle * (Math.PI / 180),
            oppositeSize = 0,
            adjacentSize = 0;

        this.collision.point1.size = this.ticker.container.width / 18;
        $("#collisionPoint1").css("width", this.collision.point1.size);
        $("#collisionPoint1").css("height", this.collision.point1.size);
        $("#collisionPoint1").css(
            "top",
            this.ticker.container.top +
            this.ticker.container.height / 2 +
            this.ticker.container.height / 7
        );
        $("#collisionPoint1").css(
            "left",
            this.ticker.container.left +
            this.ticker.container.width / 2 -
            this.collision.point1.size / 2
        );

        this.collision.point2.size = this.ticker.container.width / 22;
        $("#collisionPoint2").css("width", this.collision.point2.size);
        $("#collisionPoint2").css("height", this.collision.point2.size);
        $("#collisionPoint2").css(
            "top",
            this.ticker.container.top +
            this.ticker.container.height / 2 +
            this.ticker.container.height / 5
        );
        $("#collisionPoint2").css(
            "left",
            this.ticker.container.left +
            this.ticker.container.width / 2 -
            this.collision.point2.size / 2
        );

        oppositeSize = this.ticker.height * Math.cos(tickerRadians);

        $("#oTicker").css("height", oppositeSize);
        $("#oTicker").css("left", this.ticker.left);
        $("#oTicker").css("top", this.ticker.top);

        adjacentSize = this.ticker.height * Math.sin(tickerRadians);

        $("#aTicker").css("width", adjacentSize);
        $("#aTicker").css("left", this.ticker.left);
        $("#aTicker").css("top", this.ticker.top + oppositeSize);

        $(".pointer").css("left", this.ticker.left + adjacentSize);

        $("#pointer1").css("height", this.ticker.height * 0.5);
        $("#pointer2").css("height", this.ticker.height * 0.2);

        $("#pointer1").css(
            "top",
            this.ticker.top + oppositeSize - $("#pointer1").height() / 2
        );
        $("#pointer2").css(
            "top",
            this.ticker.top + oppositeSize - $("#pointer2").height() / 2
        );

        $(".pointer").css("transform", "rotate(-" + this.ticker.angle + "deg)");

        $("#collisionPoint1").css(
            "left",
            $("#pointer1").offset().left -
            this.container.left -
            $("#collisionPoint1").width()
        );
        $("#collisionPoint1").css(
            "top",
            $("#pointer1").offset().top -
            this.container.top -
            $("#collisionPoint1").height() / 2
        );

        $("#collisionPoint2").css(
            "left",
            $("#pointer2").offset().left -
            this.container.left -
            $("#collisionPoint2").width()
        );
        $("#collisionPoint2").css(
            "top",
            $("#pointer2").offset().top -
            this.container.top -
            $("#collisionPoint2").height() / 2
        );
    },
    testModeAdaptations: function () {
        if (this.testMode) {
            $(".pointer").css("opacity", "1");
            $(".collisionPoint").css("opacity", "1");
            $("#ticker").css("opacity", "1");
            $("#oTicker").css("opacity", "1");
            $("#aTicker").css("opacity", "1");
        }
    },
    resetNodes: function () {
        $(".node").remove();
        this.drawNodes();
    },
    resetIndicationElements: function () {
        $(".indication").remove();
        this.createIndicationElements();
    },
    reset: function () {
        if (this.animateTickerAndNodes) {
            this.resetIndicationElements();
            this.getElementsData();
            this.initiateTicker();
            this.resetNodes();
            this.findFirstNode();
            this.setCollisionIndicators();
            this.setElementsPosition();
            this.testModeAdaptations();
        } else if (this.global.settings.nodes.visible) {
            this.getElementsData();
            this.resetNodes();
        }
    },
    prepare: function (randomChosenPackage) {
        this.element = document.getElementById("wheel");
        this.$element = $("#wheel");

        if (this.global.settings.mechanism == "double") {
            this.child.element = document.getElementById("wheel-child");
            this.child.$element = $("#wheel-child");
        } else {
            if (document.getElementById("wheel-child")) {
                document.getElementById("wheel-child").remove();
            }
        }

        this.setFinalDegree(randomChosenPackage);
        (this.finalStop = 360 * this.totalRounds + (this.finalDegree % 360)),
            (this.child.finalStop =
                360 * this.child.totalRounds +
                (Math.abs(this.child.finalDegree) % 360));

        if (this.child.finalDegree < 0) {
            this.child.finalStop *= -1;
        }

        if (this.animateTickerAndNodes) {
            this.createIndicationElements();
            this.getElementsData();
            this.initiateTicker();
            this.drawNodes();
            this.findFirstNode();
            this.setCollisionIndicators();
            this.setElementsPosition();
            this.testModeAdaptations();

            if (this.testMode) {
                alert("You are in test mode!");
            }
        } else if (this.global.settings.nodes.visible) {
            this.createIndicationElements();
            this.getElementsData();
            this.drawNodes();
        }
    },
    increaseBy: function (increaseAmount, rotation, finalStop) {
        var increase = (1 - rotation / finalStop) * increaseAmount;

        return increase;
    },
    rotate: function (element, rotation) {
        element.style.transform = "rotate(" + rotation + "deg)";
        element.style.WebkitTransform = "rotate(" + rotation + "deg)";
        element.style.MozTransform = "rotate(" + rotation + "deg)";
        element.style.msTransform = "rotate(" + rotation + "deg)";
        element.style.OTransform = "rotate(" + rotation + "deg)";
    },
    isStopPoint: function (rotation, finalStop) {
        return rotation > finalStop - 1 && rotation < finalStop + 1;
    },
    rotationStatus: [],
    isRotationFinished: function (rotationUpdate) {
        var that = this;

        rotationUpdate = rotationUpdate || 0;
        this.rotationStatus.push(rotationUpdate);

        if (this.global.settings.mechanism == "double") {
            if (this.rotationStatus[0] == 1 && this.rotationStatus[1] == 1) {
                setTimeout(function () {
                    that.stop();
                    that.finished();
                }, 500);
            }
        } else {
            if (this.rotationStatus[0] == 1) {
                setTimeout(function () {
                    that.stop();
                    that.finished();
                }, 500);
            }
        }
    },
    rotateWheel: function () {
        var that = this;

        // TODO: OLD JS SPIN SCRIPT
        //this.increase = this.increaseBy(40, this.rotation, this.finalStop);
        //this.rotation += this.increase;
        //this.rotate(this.$element, this.rotation);
        this.rotate(this.element, this.finalStop);

        if (this.global.settings.mechanism == "double") {
            // OLD JS SPIN SCRIPT
            //this.child.increase = this.increaseBy(30, this.child.rotation, this.child.finalStop);
            //this.child.rotation -= this.child.increase;
            this.rotate(this.child.element, this.child.finalStop);
        }

        // TODO: OLD JS SPIN SCRIPT
        //$(".node").css("transform", "rotate(" + (this.rotation * -1) + "deg)");

        this.$element.one(
            "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
            function (event) {
                that.isRotationFinished(1);
            }
        );

        if (this.global.settings.mechanism == "double") {
            this.child.$element.one(
                "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                function (event) {
                    that.isRotationFinished(1);
                }
            );
        }

        /*
          // TODO: OLD JS SPIN SCRIPT
      if ( this.animateTickerAndNodes ) {
        this.isNodeTouchTheTicker();
      }
  
          if (this.global.settings.mechanism == "double") {
              isStopPoint = this.isStopPoint(this.rotation, this.finalStop) && this.isStopPoint(this.child.rotation, this.child.finalStop);
          } else {
              isStopPoint = this.isStopPoint(this.rotation, this.finalStop);
          }
  
          if ( isStopPoint ) {
        this.stop();
        this.finished();
          }
          */
    },
    isNodeTouchTheTicker: function () {
        var currenctNodeLeft =
            $(".node" + this.node.current + "").offset().left -
            this.container.left +
            this.node.width,
            currenctNodeTop =
                $(".node" + this.node.current + "").offset().top - this.container.top;

        this.ticker.addDegrees = this.increase * 6 + 1;

        if (currenctNodeTop < 15) {
            if (this.ticker.angle < 55) {
                if (
                    currenctNodeLeft >= this.collision.point1.left &&
                    currenctNodeLeft >= this.collision.point2.left
                ) {
                    this.lockResetTimer = true;
                    this.ticker.angle += this.ticker.addDegrees;
                    $(".ticker").css(
                        "transform",
                        "rotate(-" + this.ticker.angle + "deg)"
                    );
                }
            }

            if (currenctNodeLeft >= this.container.collisionArea) {
                this.lockResetTimer = false;
                this.node.current--;
                if (this.node.current < 0) {
                    this.node.current = this.node.number - 1;
                }
            }
        }
    },
    alignTicker: function () {
        var tickerSpeed = this.ticker.addDegrees / 8;
        if (this.ticker.angle > 0 && this.lockResetTimer == false) {
            if (this.increase < 1) {
                tickerSpeed = 1;
            }
            this.ticker.angle -= tickerSpeed;
            $(".ticker").css("transform", "rotate(-" + this.ticker.angle + "deg)");
        }
    },
    resetTickerAngle: function () {
        $(".ticker").css("transform", "rotate(0deg)");
    },

    getCurrentRotation: function (el) {
        var st = window.getComputedStyle(el, null);
        var tm = st.getPropertyValue("-webkit-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("transform") ||
            "none";
        if (tm != "none") {
            var values = tm.split('(')[1].split(')')[0].split(',');
            /*
            a = values[0];
            b = values[1];
            angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
            */
            //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
            var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
            return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
        }
        return 0;
    },

    isColliding: function (el1, el2) {
        if(el1 && el2){
          // Div 1 data
        var el1_offset = el1.getBoundingClientRect();
        var el1_height = el1_offset.height;
        var el1_width = el1_offset.width;
        var el1_distance_from_top = el1_offset.top + el1_height;
        var el1_distance_from_left = el1_offset.left + el1_width;

        // Div 2 data
        var el2_offset = el2.getBoundingClientRect();
        var el2_height = el2_offset.height;
        var el2_width = el2_offset.width;
        var el2_distance_from_top = el2_offset.top + el2_height;
        var el2_distance_from_left = el2_offset.left + el2_width;

        var not_colliding = (el1_distance_from_top < el2_offset.top || el1_offset.top > el2_distance_from_top || el1_distance_from_left < el2_offset.left || el1_offset.left > el2_distance_from_left);

      

        // Return whether it IS colliding
        return !not_colliding;
        }
    },

    /*tickerAnimation: function (el, timing) {
        el.animate([
            // keyframes
            {
                transform: 'rotate(0)'
            },
            {
                transform: 'rotate(-40deg)'
            }
        ], {
                // timing options
                duration: timing,
                iterations: 1
            });
    },*/

    tickerAnimation: function (el, timing) {
        anime({
            targets: el,
            rotate: [0, -40],
            direction: 'alternate',
            easing: 'linear',
            duration: timing
        })
    },

    animateTicker: function (tickerEl, nodeEL, timing) {
        let _this = this,
            tickerElement = document.querySelector(tickerEl),
            btnEl = document.querySelector('.btn-spin'),
            nodeElements = document.querySelectorAll(nodeEL),
            lastNode = nodeElements.length - 1;

        if(document.getElementById("wheel-overlay")) document.getElementById("wheel-overlay").remove();

        for (var i = 0; i < nodeElements.length; i++) {
            if (this.isColliding(document.getElementById("ticker"), nodeElements[i])) {
                this.tickerAnimation(tickerElement, timing);
                document.querySelector(".audio-trigger").click();
            }
           
        }

        if (this.isColliding(document.getElementById("ticker"), document.querySelector('.node' + lastNode))) {
            timing += 10;
        }

        if (this.active === true) {
            setTimeout(function () {
                document.getElementById("ticker").classList.add("active");
                _this.animateTicker(tickerEl, nodeEL, timing);
            }, 1)
        }
    },

    start: function () {
        var that = this;

        console.log("####### start function");

        this.active = true;
        this.rotateWheel();

        this.animateTicker("#ticker-container", ".node", 100);

        /*
          // TODO: OLD JS SPIN SCRIPT
          if ( this.global.settings.mechanism == 'double' ) {
              this.wheelTimer = setInterval(function() {
                  that.rotateWheel();
              }, this.timerSpeed);
          } else {
              if ( this.animateTickerAndNodes ) {
                  this.wheelTimer = setInterval(function() {
                      that.getElementsData();
                      that.setElementsPosition();
                      that.rotateWheel();
                      that.alignTicker();
                  }, this.timerSpeed);
              } else {
                  this.wheelTimer = setInterval(function() {
                      that.rotateWheel();
                  }, this.timerSpeed);
              }
          }
          */
    },
    stop: function () {
        this.active = false;
        clearInterval(this.wheelTimer);
    },
    finished: function () {
        this.global.claimAndSaveGuid();
    }
};

Game.prototype.image = {
    loaded: function () {
        if ($("#wheelImage").width() > 0 && $("#wheelImage").height() > 0) {
            return true;
        } else {
            return false;
        }
    }
};

Game.prototype.claimAndSaveGuid = function () {
    wheel.execute(
        wheel.claim,
        [
            {
                when: "1",
                call: function () {
                    wheel.message.show(wheel.claimStatus);
                    wheel.execute(wheel.saveGuid, [
                        {
                            when: "error",
                            call: wheel.log,
                            values: ["Unable to save Guid"]
                        }
                    ]);
                }
            },
            { whenNot: "waiting", call: wheel.message.show, values: [wheel.claim] }
        ],
        { call: wheel.message.show, values: ["error"] }
    );
};

Game.prototype.disclaimerStyle = function ($disclaimer) {
    var disclaimerHeight = parseInt($disclaimer.height()) * 2;

    if (this.brand == "888casino") {
        $(".page-wraper").css("padding-bottom", disclaimerHeight + "px");
    } else if (this.brand == "777") {
        $("#MainDiv").css("padding-bottom", disclaimerHeight + "px");
    }
};

Game.prototype.floatingTermsStyle = function () {
    var termsFloaterScrollHeight = 0;

    if (this.isInsideIframe() && this.isMobile()) {
        termsFloaterScrollHeight = $("#tncsContainer").height() * 0.85;
        $(".slidingDiv").css("height", termsFloaterScrollHeight);
    }
};

Game.prototype.toggleTerms = function ($disclaimer, parent) {
    var plusMinus = $(".showHideTerms .plusMinus").text(),
        getDisclaimerHeight = 0;

    function scrollToExpandableTnCs() {
        var getTermsTop =
            parseInt($("#tncsContainer .showHideTerms").offset().top) - 10,
            findHeader = $(".top-header").length;
        getTermsFloaterTop = 0;

        if (findHeader > 0) {
            getHeaderHeight = parseInt($(".top-header").height());
            finalPos = getTermsTop - getHeaderHeight - 10;
        } else {
            finalPos = getTermsTop - 10;
        }

        setTimeout(function () {
            $("html, body").animate({ scrollTop: finalPos + "px" }, 300);
        }, 200);
    }

    if (plusMinus == "[+]") {
        $(".plusMinus").text("[-]");
        if (this.isInsideIframe() && this.isMobile()) {
            $("#tncsContainer").addClass("termsFloater");
            $(".termsX").addClass("displayBlockImportant");
            $(".cover").css("display", "block");
            getTermsFloaterTop =
                parseInt($(".displayBlockImportant").offset().top) - 10;
            $("html, body").animate({ scrollTop: getTermsFloaterTop + "px" }, 300);
            this.floatingTermsStyle();
        } else {
            if ($disclaimer.length) {
                getDisclaimerHeight = parseInt($disclaimer.height()) + 10;
                $(".tnc .promotion_term_cond").css(
                    "padding-bottom",
                    getDisclaimerHeight + "px"
                );
            }
            scrollToExpandableTnCs();
        }
        $(".slidingDiv").toggle();
    } else {
        if (
            parent != undefined &&
            parent.hasClass(this.settings.disclaimer.className)
        ) {
            scrollToExpandableTnCs();
        } else {
            $(".plusMinus").text("[+]");
            if (this.isInsideIframe() && this.isMobile()) {
                $("#tncsContainer").removeClass("termsFloater");
                $(".termsX").removeClass("displayBlockImportant");
                $(".cover").css("display", "none");
            }
            $(".slidingDiv").toggle();
        }
    }
};

Game.prototype.elementsInjection = {
    map: [
        { inject: ".cms-route .message", to: ".cms-route .messages" },
        { inject: ".cms-route .welcome", to: ".cms-route .welcome-container" },
        { inject: ".cms-route .sentence", to: ".cms-route .sentence-bg" }
    ],
    init: function () {
        for (var i = 0; i < this.map.length; i++) {
            $(this.map[i].inject).appendTo(this.map[i].to);
        }
    }
};

var wheel;

function startWheelProcess() {
    console.log("START WHEEL PROCESS")
    var $disclaimer;
    var wheelContainer = document.getElementById("wheel-container");

    wheel = new Game();

    if (typeof ready == "function") {
        ready();
    }

    if (wheel.injectable) {
        wheel.elementsInjection.init();
    }

    wheel.initiate();
    $(".cover").css("background", "rgba(0, 0, 0, 0.75)");

    $disclaimer = $("." + wheel.settings.disclaimer.className);



    if (wheel.randomChosenPackage <= wheel.settings.packages.prizes.length) {
        // Preparing the wheel animation when the wheel image is fully loaded
        wheel.execute(wheel.image.loaded, [
            {
                when: true,
                call: function () {
                    wheel.animation.prepare(wheel.randomChosenPackage);
                }
            }
        ]);

        if (wheel.isInsideIframe()) {
            wheel.iframeStyle($disclaimer);
            if (typeof iframe == "function") {
                iframe();
            }
        }


        wheel.execute(
            wheel.isValid,
            [
                {
                    when: "can play",
                    call: function () {
                        wheel.ready = true;
                        wheel.enable();
                        if (typeof valid == "function") {
                            valid();
                            console.log("EXECUTE: VALID")
                        }
                    }
                },
                {
                    whenNot: "waiting",
                    call: function () {
                        wheel.message.show(wheel.isValidStatus);
                        if (typeof notValid == "function") {
                            notValid();
                            console.log("EXECUTE: NOT VALID")
                        }
                    }
                }
            ],
            {
                call: function () {
                    /*
                    wheel.message.show("error");
                    if (typeof error == "function") {
                      error();
                    }
                    */
                }
            }
        );
    } else {
        console.log("ERROR MESSAGE")
        wheel.message.show("error");
    }

    if (wheel.settings.disclaimer.exist) {
        wheel.disclaimerStyle($disclaimer);
    }

    console.log("STATUS: ", wheel.status)

    /*
      // TODO: OLD JS SPIN SCRIPT
      $(window).resize(function() {
          wheel.animation.stop();
          wheel.animation.resetTickerAngle();
          wheel.animation.reset();
          if ( wheel.animation.started ) {
              wheel.animation.start();
          }
          if ( wheel.settings.disclaimer.exist() ) {
              wheel.disclaimerStyle($disclaimer);
          }
          if ( wheel.isInsideIframe() && wheel.isMobile() ) {
              wheel.floatingTermsStyle();
          }
      });
      */

    $(".activateGame").click(function () {
        wheel.activate();
    });

    $(".playNowButton").click(function () {
        wheel.playNow();
    });

    $(".depositNowButton").click(function () {
        wheel.depositNow(wheel.promocode);
    });

    $(".termsX").click(function () {
        wheel.toggleTerms($disclaimer);
    });

    $(".showHideTerms").click(function () {
        var parent = $(this).parent();
        wheel.toggleTerms($disclaimer, parent);
    });
}


var wheelInitTimeout = wheelInitTimeout || null;

var initWheel = function () {
    if (typeof wheelInitTimeout != null) {
        clearTimeout(wheelInitTimeout);
    }
    wheelInitTimeout = setTimeout(function () {
        startWheelProcess();
    }, 3000);
};

window.onload = function () {
    if (typeof complete == "function") {
        complete();
    }
};

  // IMPORTANT: The initWheel() should be called from the "Promotion JS" component - the last component that is loaded on the wheel page