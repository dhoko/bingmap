/**
* Bing Map v1 Display a map for jQuery 1.6
* Release date : 24/08/2011
* v 0.1.3
* Changelog : Bug with the zoom if you specify a string

* @author    aurelien[dot]garroux[at]gmail[dot]com
* @author AurÃ©lien Garroux for Procheo
*/

(function($){

    var config = {
        api : "Your API Key",
        type : "road",
        zoom : 5,
        width : 500,
        height : 400,
        latitude : 48.833,
        longitude : 2.333,
        pin : [],
        options : {
            bing_logo : false,
            search_logo : false,
            scaleBar : false,
            control : false,
            copy : false,
        },
        onFinish : function(obj){}
    }

    var typeMap = [{name : "road",def : Microsoft.Maps.MapTypeId.road},{name : "sky",def : Microsoft.Maps.MapTypeId.aerial}]
    var type_show = Microsoft.Maps.MapTypeId.road;
    var pins = [];

    $.fn.bingmap = function(o){
        if(o) var o = $.extend(config,o); 
        
        for(var i=0; i<=1; i++){
            if(o.type == typeMap[i].name)
                type_show = typeMap[i].def;
        } 

        return this.each(function(){

            var map = new Microsoft.Maps.Map(this, {
                credentials: o.api,
                mapTypeId : type_show,
                center:  new Microsoft.Maps.Location(o.latitude, o.longitude),
                zoom : parseFloat(o.zoom),
                width : o.width,
                height : o.height,
                showScalebar : o.options.scaleBar,
                showMapTypeSelector: false,
                showDashboard : o.options.control,
                showLogo : o.options.bing_logo,
                showCopyright : o.options.copy,
                enableSearchLogo : o.options.search_logo,
                enableClickableLogo: false,
                disableKeyboardInput: true,
                });


        if(o.up) o.up.apply( this );

        if(o.pin.length > 0){
            $(o.pin).each(function(n,e){
               if(!e.drag) e.drag = false;
                var pin = new Microsoft.Maps.Pushpin({
                            "latitude" : e.lat, 
                            "longitude": e.lng},{                      
                                draggable: e.drag
                            });
                map.entities.push(pin);
                pins[n] = pin;
            });
        }
            //Callback Function
        if(o.onFinish) o.onFinish.call(this, {pin : pins, map: map});     
        
        });
    }
    
    
})(jQuery)