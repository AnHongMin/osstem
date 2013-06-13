jQuery.jFastMenu = function(id){

	$(id).find('ul').find('li').hover(function(){

		clearTimeout($(this).data('jQueryMenu'));
		$(this).find('ul:first').animate({height:'show'}, 'fast');

	},

	function(){

		var mm = $(this);
		var timer = setTimeout(function(){
			mm.find('ul:first').animate({height:'hide', opacity:'hide'}, 'slow');
		}, 500);
		$(this).data('jQueryMenu', timer);

	});

}