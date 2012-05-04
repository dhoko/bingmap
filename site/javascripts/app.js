/* Foundation v2.2.1 http://foundation.zurb.com */
jQuery(document).ready(function ($) {

	/* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTab($tab) {
		var $activeTab = $tab.closest('dl').find('a.active'),
				contentLocation = $tab.attr("href") + 'Tab';
				
		// Strip off the current url that IE adds
		contentLocation = contentLocation.replace(/^.+#/, '#');

		//Make Tab Active
		$activeTab.removeClass('active');
		$tab.addClass('active');

    //Show Tab Content
		$(contentLocation).closest('.tabs-content').children('li').hide();
		$(contentLocation).css('display', 'block');
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
			activateTab($(this));
		});
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
		$.foundation.customForms.appendCustomMarkup();
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
	  $(this).closest(".alert-box").fadeOut(function(event){
	    $(this).remove();
	  });
	});


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */

	$('input, textarea').placeholder();

	/* TOOLTIPS ------------ */
	$(this).tooltips();



	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
//	$('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
//	$('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
//	$('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
//	$('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});



	/* DROPDOWN NAV ------------- */

	var lockNavBar = false;
	$('.nav-bar a.flyout-toggle').live('click', function(e) {
		e.preventDefault();
		var flyout = $(this).siblings('.flyout');
		if (lockNavBar === false) {
			$('.nav-bar .flyout').not(flyout).slideUp(500);
			flyout.slideToggle(500, function(){
				lockNavBar = false;
			});
		}
		lockNavBar = true;
	});
  if (Modernizr.touch) {
    $('.nav-bar>li.has-flyout>a.main').css({
      'padding-right' : '75px'
    });
    $('.nav-bar>li.has-flyout>a.flyout-toggle').css({
      'border-left' : '1px dashed #eee'
    });
  } else {
    $('.nav-bar>li.has-flyout').hover(function() {
      $(this).children('.flyout').show();
    }, function() {
      $(this).children('.flyout').hide();
    })
  }


	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */
  
	var credentials = 'AtZVaPeWtqEJ7xglZZZ6WZJkMihxHRlweOWszXf0Oh7kf7SEQz1qT-jCDlGw9UAW';
	$('#map1').bingmap({api: credentials});

	$('#map2').bingmap({
		api: credentials,
		type: "sky"
	});
	$('#map3').bingmap({
		api: credentials,
		zoom: 10,
		latitude: 48.53530208883657,
		longitude: 2.6383473134050517,
		control: true,
		disable_zoom: false,
		disable_navigate: false
	});
	$('#map4').bingmap({
		api: credentials,
		zoom: 15
	}).bingmap('newPin',{
			latitude : 48.833,
			longitude : 2.333,
			drag : true
		    });
	$('#map5').bingmap({
		api: credentials,
		latitude: 48.84402773346424,
		longitude: 2.2001610956930895,
		zoom: 10
	}).bingmap('newPin',[{
			latitude: 48.81961978106944,
			longitude: 2.2042809687399645,
			drag : true
		    },{
			latitude: 48.854871895710836,
			longitude: 2.1314965449118395,
			popup : {
				title : 'Un message',
                html : "",
                width: 130,
                height: 30,
                onShow: true
			}
		    },{
			latitude: 48.873843528626914,
			longitude: 2.2290002070212145
		    }]);
	$('#map6').bingmap({
		api: credentials,
		latitude: 48.873843528626914,
		longitude: 2.2290002070212145,
		disable_zoom: false,
		disable_navigate: false,
		zoom: 11
	}).bingmap('newPin',{
		latitude: 48.873843528626914,
		longitude: 2.2290002070212145,
		drag : true
	}).bingmap('onPin', function(o){
		Microsoft.Maps.Events.addHandler(o[0], "dragend", function(o){
		    $('#lat').html(o.entity._location.latitude);
		    $('#lng').html(o.entity._location.longitude);
		});
	});
	$('#map7').bingmap({
		api: credentials,
		latitude: 48.873843528626914,
		longitude: 2.2290002070212145,
		disable_zoom: false,
		disable_navigate: false,
		zoom: 12
	}).bingmap('newPin',{
		latitude: 48.873843528626914,
		longitude: 2.2290002070212145,
		drag : true
	}).bingmap('onPin', function(o){
		Microsoft.Maps.Events.addHandler(o[0], "dragend", function(o){
		    $(this).bingmap('getInfo',{
					latitude: o.entity._location.latitude,
					longitude: o.entity._location.longitude,
					callback: function(status,data){
						if(status == "success"){
							$('#adresse').html(data[0].resources[0].name);
						}
					}});
		});
	});

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
		    	$('#map8').bingmap({
						api: credentials,
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						zoom: 15
					}).bingmap('newPin',{
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					}).bingmap('getInfo',{
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						callback: function(status,data){
							if(status == "success"){
								$('#adresse_bing').html(data[0].resources[0].name);
							}
					}});
			$('#lat5').html(position.coords.latitude);
			$('#lng5').html(position.coords.longitude);

		});
		   
	}else{
		$('#map8').bingmap({api: credentials});
	}	


	$('#showModal2').click(function(){
		$('#myModal2').reveal();
	});
	$('#showModal3').click(function(){
		$('#myModal3').reveal();
	});
	$('#showModal4').click(function(){
		$('#myModal4').reveal();
	});
	$('#showModal5').click(function(){
		$('#myModal5').reveal();
	});
	$('#showModal6').click(function(){
		$('#myModal6').reveal();
	});
	$('#showModal7').click(function(){
		$('#myModal7').reveal();
	});
	$('#showModal8').click(function(){
		$('#myModal8').reveal();
	});
});
