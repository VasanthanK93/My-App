//<!-- For browser caching on style sheet requests -->
define([], function() {
    return function(environmentConfig) {
        function styleLoader(url, callback) {
            document.body.className="styles-loading";
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    appendStyle(xmlhttp.responseText);
                }
            };
            xmlhttp.open("GET", url + "?v=" + environmentConfig.VERSION, true);
            xmlhttp.send();
            var uSplit = url.split("/");

            function appendStyle(cssString) {
                var style = document.createElement("style");
                style.setAttribute("type", "text/css");
                style.setAttribute("id", uSplit[uSplit.length - 1]);
                cssString = cssString.split("url('../").join("url('content/");
                cssString = cssString.split("url(../").join("url(content/");
                cssString = cssString.split('url("../').join('url("content/');
                style.innerText = cssString;
                style.innerHTML = cssString;
                document.head.appendChild(style);
                callback();
            }
        }

        var ss = ["content/css/bootstrap.css",
            "content/fonts/font-awesome.min.css",
            "content/css/common-styles.css",
            "content/css/sales-styles.css",
            "content/css/vf-sales-styles.css",
            "content/css/collection-styles.css",
            "content/css/print.css",
            "content/css/fullcalendar.min.css",
            "content/css/angular-gridster.min.css"
        ];
        //Loading styles by sync to maintain priority
        var count = 0;
        var onloaded = function() {
            count++;
            if (count == ss.length) {
                //Style sheets Load Completed
                document.body.className="";
            } else {
                styleLoader(ss[count], onloaded);
            }
        };
        //Set loading css to body
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.setAttribute("id", "stylesloading");
        style.innerText = ".styles-loading { display: none;}";
        style.innerHTML = ".styles-loading { display: none;}";
        document.head.appendChild(style);
        //load css
        styleLoader(ss[count], onloaded);
    };
});
