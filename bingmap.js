/**
* BingMap - Bing Map for jQuery
* Release date : 21/02/2011
* v 0.1.5
* @author Aurélien Garroux for Procheo
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
        bing_logo : false,
        search_logo : false,
        scaleBar : false,
        control : false,
        copy : false,
        can_zoom : false,
        can_navigate : false,
        onFinish : function(obj){},
        init : function(options){
            
        }
    }

    var typeMap = [{name: "road",def: Microsoft.Maps.MapTypeId.road},{name: "sky",def: Microsoft.Maps.MapTypeId.aerial},{name: "bird",def: Microsoft.Maps.MapTypeId.birdseye}]
    var type_show = Microsoft.Maps.MapTypeId.road;
    var pins = [];
    var actZoom = true;
    var actPan = true;

    $.fn.bingmap = function(op){
        if(op) var o = $.extend(config,op); 
        
        
       

        if(o.can_zoom == true) actZoom = false;
        if(o.can_navigate == true) actPan = false;

        for(var i=0; i<=2; i++){
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
                showScalebar : o.scaleBar,
                showMapTypeSelector: false,
                showDashboard : o.control,
                showLogo : o.bing_logo,
                showCopyright : o.copy,
                enableSearchLogo : o.search_logo,
                enableClickableLogo: false,
                disableKeyboardInput: true,
                fixedMapPosition: true,
                disableZooming: actZoom,
                disablePanning: actPan
                });

        console.log(o);
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
        if(o.onFinish) o.onFinish.call(this, {pin: pins, map: map});     
        map = {};
        o = {};
        });
    }
    
    
})(jQuery)