Stripe.setPublishableKey("pk_test_bkaxIFpyvmw7X5eUDVVwGDou");

var $form = $('#checkout');

function stripeResponseHandler(status, response){
	if (response.error){
		$('#card-errors').text(response.error.message);
		$('#card-errors').removeClass('hidden');
    	$('#checkout-button').prop('disabled', false); 
	} else {
		//If no errors, store token in hidden input and submit form
		var token = response.id;
		$form.append($('<input type="hidden" name="verifiedToken">').val(token));
		$form.get(0).submit();
	}

};

//Checks using Stripe CC verification before form is submitted
$form.submit(function(submission){
	//Disables submit button until verification success
	$("#checkout-button").prop('disabled', true);

	//Create token
	Stripe.card.createToken({
	  number: $('#card-number').val(),
	  cvc: $('#card-cvc').val(),
	  exp_month: $('#card-exp-month').val(),
	  exp_year: $('#card-exp-year').val(),
	  name: $('#full-name').val() 
	}, stripeResponseHandler);
	return false;
});