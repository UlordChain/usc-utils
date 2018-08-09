var bs58 = require('bs58');
var wallet = require('ethereumjs-wallet');
var convertHex = require('convert-hex');
var sha256 = require('js-sha256');

function keyUldToUscInBytes(privKeyAsExportedByUlordDumpprivkey) {
    var decodedKey = bs58.decode(privKeyAsExportedByUlordDumpprivkey);
    var privKeyBytes = decodedKey.slice(1, decodedKey.length - 5);
    return privKeyBytes;
}

function privKeyToUscFormat(uldPrivateKey) {
	var privKeyBytes = keyUldToUscInBytes(uldPrivateKey);
	var privKeyInUscFormat = new Buffer(privKeyBytes).toString('hex');
	return privKeyInUscFormat;
}

function getUscAddress(uldPrivateKey) {
	var myWallet = wallet.fromPrivateKey(new Buffer(keyUldToUscInBytes(uldPrivateKey)));
	var addressInUscFormat = myWallet.getAddress();
	return addressInUscFormat.toString('hex');
}

function getUldPrivateKey(uldNet, uscAddress) {
	var addressArray = convertHex.hexToBytes(uscAddress);
	var partialResult = new Array();
	var result = new Array();

	if(uldNet === 'MAIN_NET') {
		partialResult.push(0x80);
	} else {
		partialResult.push(0xEF);
	}
	for (var i = 0;  i < addressArray.length; i++) {
		partialResult.push(addressArray[i]);
	}
	partialResult.push(0x01);
	var check = convertHex.hexToBytes(sha256(convertHex.hexToBytes(sha256(partialResult))));

	for (var i = 0;  i < partialResult.length; i++) {
		result.push(partialResult[i]);
	}
	for (var i = 0;  i < 4; i++) {
		result.push(check[i]);
	}
	
	return bs58.encode(result);
}

module.exports = {
	privKeyToUscFormat: function (uldPrivateKey) {
		return privKeyToUscFormat(uldPrivateKey);
	},
	getUscAddress: function (uldPrivateKey) {
		return getUscAddress(uldPrivateKey);
	},
	getUldPrivateKey: function (uldNet, uscAddress) {
		return getUldPrivateKey(uldNet, uscAddress);
	}
};

