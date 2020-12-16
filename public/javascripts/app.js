$(function() {
	$( "#hp-join-form" ).on( "submit", function( event ) {
	  event.preventDefault();
		$.ajax({
			type: $( this ).attr('method'),
			url: $( this ).attr('action'),
			data: $( this ).serialize(),
			cache: false,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			error: function (err) { console.log(err); },
			success: function (data) {
				console.log(data);
				if (data.result === 'success') {
					$( "#hp-join-form" ).hide();
					$( '#hp-join-form-message').html("Thank you for signing up!");
				}
				else {
					if(!validateEmail($(' #hp-join-form #mce-EMAIL').val())) {
						$(' #hp-join-form #mce-EMAIL').addClass('error');
						$( '#hp-join-form-message').html("Please enter a valid email address.");
					}
				}
			},
		});
	});

	function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
	}
});