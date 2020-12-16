$(function() {
	$( "form" ).on( "submit", function( event ) {
	  event.preventDefault();
	  var data = $( this ).serialize();
	  $.post( "https://holdenforcitycouncil.us7.list-manage.com/subscribe/post?u=7d00529cc08ebc48d83096c4f&amp;id=5e3c61dfbc", data)
		  .done(function( data ) {
		    alert( "Data Loaded: " + data );
		  });
	});
});