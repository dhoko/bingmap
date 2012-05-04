/**
 *
 * Bing Map for jQuery
 *
 * @author          Aurélien Garroux for Procheo
 * @link            https://github.com/dhoko/bingmap
 * @version         Version 2
 * @licence         BSD
 *
 */
 /*
    Merci à Mathieu Robin (http://www.mathieurobin.com/) 
    pour son aide et ses conseils.
    Un projet issu de mon travail pour Procheo (http://procheo.fr)
 */

(function($){
// Defaults option. lat,lng = Paris
var defaults = {
        api              : "Your API Key",
        type             : "road",
        zoom             : 5,
        width            : null,
        height           : null,
        latitude         : 48.833,
        longitude        : 2.333,
        bing_logo        : true,
        search_logo      : false,
        scaleBar         : false,
        control          : false,
        copy             : false,
        disable_zoom     : true,
        disable_navigate : true
    },
    // These are to stock, options, the map, a pin and all the pin/map (array)
    opt,  map, pin, pins = [],
    // Bing map can display 3 types of map
    typeMap = [{name: "road",def: Microsoft.Maps.MapTypeId.road},{name: "sky",def: Microsoft.Maps.MapTypeId.aerial},{name: "bird",def: Microsoft.Maps.MapTypeId.birdseye}],
    type_show = Microsoft.Maps.MapTypeId.road,
    methods = {
        /**
         * Initialize the map, it's the default called method if no-one is given
         *
         * @param o Array which can contains this options : api,type, zoom, width,copy, height,disable_zoom,disable_navigate bing_logo, search_logo,scaleBar,control latitude, longitude, zoom, markers, popup, cloudmadeAttribution, click event
         * @return jQuery Object containing the DOM element extended
         */
        init : function(o){
            var that = this;
            
            pins[that.attr('id')] = [];
            return this.each(function () {
                /*if(o) opt = $.extend(defaults, o);*/
                if(o) opt = $.extend(true, {}, defaults, o);
                for(var i=0; i<=2; i++){
                    if(opt.type == typeMap[i].name){
                        type_show = typeMap[i].def;
                    }
                }

                map = new Microsoft.Maps.Map(this, {
                    credentials          : opt.api,
                    mapTypeId            : type_show,
                    center               : new Microsoft.Maps.Location(opt.latitude, opt.longitude),
                    zoom                 : parseFloat(opt.zoom),
                    width                : that.innerWidth(),
                    height               : that.innerHeight(),
                    showScalebar         : opt.scaleBar,
                    showMapTypeSelector  : false,
                    showDashboard        : opt.control,
                    showLogo             : opt.bing_logo,
                    showCopyright        : opt.copy,
                    enableSearchLogo     : opt.search_logo,
                    enableClickableLogo  : false,
                    disableKeyboardInput : true,
                    fixedMapPosition     : true,
                    disableZooming       : opt.disable_zoom,
                    disablePanning       : opt.disable_navigate,
                 });

            });

        }, //end init

        /**
         * Put one or more pins on the map 
         *
         * @param o Array or Object which can contains this options : latitude, longitude, drag
         * @return jQuery Object containing the DOM element extended
         */
        newPin : function(o){
            var that = this;

            return that.each(function () {
                var pin = null;

                if("undefined" !== typeof o) {
                    if("undefined" === typeof o.length) {
                        var drag = (o.drag) ? true : false;
                            pin = new Microsoft.Maps.Pushpin({
                                "latitude" : o.latitude, 
                                "longitude": o.longitude},{                      
                                    draggable: drag
                                });
                        map.entities.push(pin);
                        pins[that.attr('id')].push(pin);
 
                    }else{
                        for(pin in o) {
                            that.bingmap('newPin', o[pin]);
                        }
                    }

                }

                if("undefined" !== typeof o.popup){
                    o.popup.geo = {"latitude" : o.latitude, "longitude": o.longitude};
                    o.popup.pin = pin;
                    that.bingmap('addPopup',o.popup);
                }//end popu
            });

            
        }, //end newPin

        /**
         * Put a popup on the map (DO NOT USE THIS METHOD)
         * It works, but it will be a private method (v2.1)
         *
         * @param o Object which can contains this options : title, description, width, height, visible, showPointer, offset
         * @return jQuery Object containing the DOM element extended
         * TODO sortir la methode et retoucher les XInfoBox()
         */
        addPopup : function(o){

            if("undefined" == typeof o.html) o.html = "";
            if("undefined" == typeof o.width) o.width = 200;
            if("undefined" == typeof o.height) o.height = 50;
            var visible = true;
            if("undefined" !== typeof o.onShow) visible = false;

            var infoboxOptions = { 
                    title       : o.title, 
                    description : o.html, 
                    width       : o.width,
                    height      : o.height,
                    visible     : visible,
                    showPointer : false,  
                    offset      : new Microsoft.Maps.Point(15,35)
                };

            var infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(o.geo.latitude, o.geo.longitude),infoboxOptions);

            if("undefined" !== typeof o.onShow){
                Microsoft.Maps.Events.addHandler(o.pin, 'mouseover', showInfobox);
                Microsoft.Maps.Events.addHandler(o.pin, 'mouseout', hideInfobox);
                function showInfobox(){infobox.setOptions({visible:true});}
                function hideInfobox() {infobox.setOptions({visible:false});}
            }
            map.entities.push(infobox);

        }, //end addPopup
        /**
         * Callback method to use API
         *
         * @param o function use lambda function
         * @return function width {pins[map]},{map}
         */
        onPin : function(o) {
            return this.each(function (n,m) {
               return o(pins[m.getAttribute('id')],map);
            });
        },
        /**
         * Callback method to use API
         *
         * @param o function use lambda function
         * @return function width {map}
         */
        onMap : function(o) {
            return o(map);
        },
        /**
         * Callback method to get all pins by selected map
         *
         * @return Array pins
         */
        getPin : function(){
            return pins[this.attr('id')];
        },
        /**
         * Callback method to get the map
         *
         * @return jQuery Object map
         */
        getMap : function(){
            return map;
        },
        /**
         * Callback method using the Rest API
         * Calls the API width longitude & latitude to get info about this point (Address)
         *
         * @param o Object  longitude,latitude,callback(function(status, data))
         * @return function width {status, data}
         */
        getInfo : function(o){
            var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations/"+o.latitude+","+o.longitude+"?o=json&jsonp=?&key=" + opt.api;
            return this.each(function (n,m) {
                $.getJSON(geocodeRequest,function(data){
                    var status = (data.authenticationResultCode == "ValidCredentials") ? "success" : "fail";
                    return o.callback(status,data.resourceSets);
                });
            });
        }
    };
    

    /**
     * Bootstrap method, must be not modified
     */
    $.fn.bingmap = function (method) {
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if(( typeof method === 'object') || (!method)) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.BingMap');
        }
    };
    
})(jQuery);