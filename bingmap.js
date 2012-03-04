/******************************************
 * BingMap
 *
 * Bing Map for jQuery
 *
 * @author          Aurélien Garroux for Procheo
 * @docs            https://github.com/dhoko/bingmap
 * @version         Version 1.1
 *
 ******************************************/

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
    disable_zoom : true,
    disable_navigate : true,
    onFinish : function(obj){},

}
var typeMap = [{name: "road",def: Microsoft.Maps.MapTypeId.road},{name: "sky",def: Microsoft.Maps.MapTypeId.aerial},{name: "bird",def: Microsoft.Maps.MapTypeId.birdseye}]
var type_show = Microsoft.Maps.MapTypeId.road;
var pins = [];

    $.fn.bingmap = function(o){
        var o = $.extend({}, config, o || {});

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
                disableZooming: o.disable_zoom,
                disablePanning: o.disable_navigate
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
                if(e.title){

                    if(!e.html) e.html = "";
                    if(!e.width) e.width = 200;
                    if(!e.height) e.height = 50;
                    var visible = true;
                    if(e.onShow) visible = false;

                    var infoboxOptions = { 
                                title: e.title, 
                                description: e.html, 
                                width: e.width,
                                height : e.height,
                                visible : visible,
                                showPointer: false,  
                                offset: new Microsoft.Maps.Point(5,25)};

                    var infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(e.lat, e.lng),infoboxOptions);
                    if(e.onShow){
                        Microsoft.Maps.Events.addHandler(pin, 'mouseover', showInfobox);
                        Microsoft.Maps.Events.addHandler(pin, 'mouseout', hideInfobox);
                        function showInfobox(){infobox.setOptions({visible:true});}
                        function hideInfobox() {infobox.setOptions({visible:false});}
                    }
                    map.entities.push(infobox);
                }
            });
        }
            //Callback Function
        if(o.onFinish) o.onFinish.call(this, {pin: pins, map: map});  
       
        });
        
        delete o;
        delete map;
        delete this;
    }
    
})(jQuery)