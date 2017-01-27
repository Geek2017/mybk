function applyJayBar(a) {
    function t(a, i, n, e) {
        var r, s;
        i++, s = a.substring(0, i), r = s.substring(0, i - 1), o.innerHTML = r, i <= a.length ? setTimeout(function() {
            t(a, i, n, e)
        }, 30) : setTimeout(function() {
            n()
        }, e)
    }

    function i() {
        t("Available", 0, function() {
            t(".com", 0, function() {
                i()
            }, 8e3)
        }, 1e3)
    }
    // var n = '<style>.jaybar,.jaybar *{box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;vertical-align:baseline}.jaybar{position:absolute;top:2em;left:2em;min-width:350px;width:350px}@media (max-width: 768px){.jaybar{top:0;left:0;width:100%}}.jaybar-bar{text-align:left;background:black;color:#fff;box-shadow:0 0 20px rgba(0,0,0,0.3)}.jaybar-avatar{width:32px;height:32px;border-radius:32px;border:2px solid white;vertical-align:middle;margin-right:5px}.jaybar-name{text-decoration:none;color:inherit;text-transform:uppercase;font:bold 11px sans-serif;margin-right:5px}.jaybar-name strong{font-weight:normal}.jaybar-name span{color:#999;font-size:8px;width:45px;display:inline-block;font-weight:bold}.jaybar-availability{display:inline-block;text-decoration:none;text-indent:-9999px;border-radius:50%;width:5px;height:5px;vertical-align:middle;-webkit-animation:jaybar-pulse 4s infinite;animation:jaybar-pulse 4s infinite;margin-top:1px;margin-right:5px}.jaybar-buttons{position:absolute;top:0;right:0;bottom:0;text-align:right;background:#888;height:32px}.jaybar-icon{width:20px;fill:white;box-sizing:content-box;padding:2px}.jaybar-button-email,.jaybar-button-twitter,.jaybar-button-codepen,.jaybar-button-github{width:32px;height:32px;text-align:center;float:right;-webkit-transition:all .25s;transition:all .25s}.jaybar-button-email{background:rgba(0,0,0,0.6)}.jaybar-button-email:hover{background:#000}.jaybar-button-email .jaybar-icon{width:18px}.jaybar-button-codepen{background:rgba(0,0,0,0.4)}.jaybar-button-codepen:hover{background:#000}.jaybar-button-github{background:rgba(0,0,0,0.2)}.jaybar-button-github:hover{background:#000}.jaybar-button-twitter:hover{background:#000}.jaybar-button-twitter .jaybar-icon{margin-top:1px}.jaybar-menu-button{display:inline-block;width:18px;height:16px;margin:0 9px;vertical-align:middle}.jaybar-menu-button span{margin:0 auto;position:relative;top:6px;-webkit-transition-duration:0s;transition-duration:0s;-webkit-transition-delay:.2s;transition-delay:.2s}.jaybar-menu-button span:before,.jaybar-menu-button span:after{position:absolute;content:\'\'}.jaybar-menu-button span,.jaybar-menu-button span:before,.jaybar-menu-button span:after{width:20px;height:3px;background-color:#fff;display:block}.jaybar-menu-button span:before{margin-top:-6px;-webkit-transition-property:margin, -webkit-transform;transition-property:margin, transform;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-delay:.2s, 0;transition-delay:.2s, 0;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out}.jaybar-menu-button span:after{margin-top:6px;-webkit-transition-property:margin, -webkit-transform;transition-property:margin, transform;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-delay:.2s, 0;transition-delay:.2s, 0;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out}.jaybar-menu-button-active span{background-color:transparent;-webkit-transition-delay:.2s;transition-delay:.2s}.jaybar-menu-button-active span:before{margin-top:-2px;height:5px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-transition-delay:0, .2s;transition-delay:0, .2s}.jaybar-menu-button-active span:after{margin-top:-2px;height:5px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transition-delay:0, .2s;transition-delay:0, .2s}.jaybar-menu{padding:0;margin:0;list-style:none;width:100%;visibility:hidden;height:0}.jaybar-menu a{text-decoration:none;color:#fff}.jaybar-menu li{padding:15px 10px;border-bottom:1px solid #000;text-align:center;box-shadow:0 0 6px rgba(0,0,0,0.5);opacity:0;visibility:hidden;-webkit-transition:all 0.2s ease;transition:all 0.2s ease;-webkit-transform:translateY(100px) translateZ(0);transform:translateY(100px) translateZ(0)}.jaybar-menu li:last-child{border-bottom-left-radius:10px;border-bottom-right-radius:10px}.jaybar-menu li:nth-child(odd){background:#111}.jaybar-menu li:nth-child(even){background:#202020}.jaybar-menu li:hover{background:#2b2b2b;padding-left:20px}.jaybar-menu li:hover h3,.jaybar-menu li:hover p{color:#fff}.jaybar-menu li:nth-child(1),.jaybar-menu li:nth-child(6){-webkit-transition-delay:0s;transition-delay:0s}.jaybar-menu li:nth-child(2),.jaybar-menu li:nth-child(4){-webkit-transition-delay:0.05s;transition-delay:0.05s}.jaybar-menu li:nth-child(3),.jaybar-menu li:nth-child(6){-webkit-transition-delay:0.1s;transition-delay:0.1s}.jaybar-menu li.jaybar-active h3,.jaybar-menu li.jaybar-active p{color:#888}.jaybar-menu h3{font:bold 12px Arial, sans-serif;padding:0;margin:0;text-transform:uppercase;color:#fff;-webkit-transition:.2s;transition:.2s}.jaybar-menu p{font:11px Arial, sans-serif;margin-top:5px;color:#ddd;-webkit-transition:.2s;transition:.2s;margin-bottom:0 !important}.jaybar-menu.jaybar-menu-open{visibility:visible;height:auto}.jaybar-menu-open li{opacity:1;visibility:visible;-webkit-transform:translateX(0);transform:translateX(0)}@-webkit-keyframes jaybar-pulse{0%{background:black}50%{opacity:1;background:yellowgreen}100%{background:black}}@keyframes jaybar-pulse{0%{background:black}50%{opacity:1;background:yellowgreen}100%{background:black}}</style><div class="jaybar">',
    //     e = /\w*/.exec(window.location.host)[0] || "",
    //     r = document.querySelector(a);
    // if (r) {
    //     r.innerHTML = n, document.querySelector(".jaybar-" + e) && (document.querySelector(".jaybar-" + e).className = "jaybar-active"), document.querySelector(".jaybar-menu-button").onclick = function(a) {
    //         var t = "jaybar-menu-button-active",
    //             i = "jaybar-menu-open",
    //             n = document.querySelector(".jaybar-menu");
    //         new RegExp(t).test(this.className) ? this.className = this.className.replace(t, "") : this.className = this.className + " " + t, new RegExp(i).test(n.className) ? n.className = n.className.replace(i, "") : n.className = n.className + " " + i, a.preventDefault()
    //     }, document.querySelector(".jaybar-button-email").onclick = function(a) {
    //         var t = "[" + e + "] I would like to hire you.",
    //             i = "jay|salvat#gmail|com".replace(/\|/g, ".").replace(/#/g, "@"),
    //             n = "mailto:" + i + "?subject=" + t;
    //         document.location = n, a.preventDefault()
    //     };
    //     var o = document.querySelector(".jaybar-name span");
    //     o && i(), "function" == typeof callback && callback(n)
    // }
}