/**
* Bing Map v1 Display a map for jQuery 1.6
* Release date : 23/08/2011
* 
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    aurelien[dot]garroux[at]gmail[dot]com
* @author Aurelien Garroux for Procheo
*/

(function($){
    $.fn.mapbing = function(o){
        
          //Default Options  
            var options = {
                onFinish: function(obj) {},
                api : 'Your Api Key', 
                type : Microsoft.Maps.MapTypeId.road, // Raod Map
                zoom : 16, 
                height: 400,
                width : 500,
                bing_logo: true, // Display the Bing logo
                search_logo : false, // Display the Bing search (hover(bing_logo)
                scaleBar: false,
                control: false,
                copy : false,
                pin : {
                    draggable : false
                    }
                }
        
        if(o) $.extend(options,o);    
        
        return this.each(function(){
 
            //Bing Map Creation : God says to Microsoft to do it
            map = new Microsoft.Maps.Map(this, {
    			credentials: options.api,
        		mapTypeId : options.type,
    			center:  new Microsoft.Maps.Location(o.pin.lat, o.pin.lng),
    			zoom : options.zoom,
    			width : options.width,
    			height : options.height,
    			showScalebar : options.scaleBar,
    			showDashboard : options.control,
    			showLogo : options.bing_logo,
    			showCopyright : options.copy,
    			enableSearchLogo : options.search_logo,
                enableClickableLogo: false,
                disableKeyboardInput: true,
    			});

        if(o.up) o.up.apply( this );

        // Add a pin to the map
            var pin = new Microsoft.Maps.Pushpin(
                    {
                        "latitude" : o.pin.lat, 
                        "longitude": o.pin.lng
                    },
                    {                      
                        draggable: options.pin.draggable
                    }); 

        // Add a pin on your map
        map.entities.push(pin);
        
        //Object to allow interaction with map &pin    
        var obj = {pin: pin, map: map};

        //Set a custom ClassName to the pin
        pin.cm1001_er_etr.dom.className = "pinMap";

            //Callback Function
            if(o.onFinish) o.onFinish.call(this, obj);     
        
         });
    }
    
    
})(jQuery)