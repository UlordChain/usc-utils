$(document).ready(function(){
	$( "#toUscBtn" ).click(function() {
		try {
			var privKey = $( "#toUscInput" ).val();
			var privKeyInUscFormat = USCUtils.privKeyToUscFormat(privKey);
			var uscAddress = USCUtils.getUscAddress(privKey);
			var uscPubKey = USCUtils.getUscPubKey(privKey);
			$("#toUscResult").html('<h3>USC Private Key: ' + privKeyInUscFormat + '</h3><h3>USC Public Key: ' + uscPubKey +'</h3><h3>USC Address: ' + uscAddress + '</h3>');
		} catch(err) {
			$("#toUscResult").html('<h3 class="has-error">' + err.message + '</h3>');
		}
	});

	$( "#toUscKeystore" ).click(function() {
		try {
			var privKey = $( "#toUscInput" ).val();
			var password = $( "#keystorePassword" ).val();
			var keystoreContent = USCUtils.getUscKeystore(privKey, password);
			$("#keystoreVal").val(keystoreContent);
		} catch(err) {
			$("#keystoreVal").val(err.message);
		}
	});

	$( "#toUldBtn" ).click(function() {
		try {
			var privKey = $( "#toUldInput" ).val();
			if(privKey === '') 
				throw new Error("Invalid USC private key value");

			var net = $( "#uldNet" ).val();
			var uldKey = USCUtils.getUldPrivateKey(net, privKey);
			$("#toUldResult").html('<h3>ULD Private Key: ' + uldKey + '</h3>');
		} catch(err) {
			$("#toUldResult").html('<h3 class="has-error">' + err.message + '</h3>');
		}
	});
});
