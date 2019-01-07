var express = require('express');
var router = express.Router();
const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

/* GET balance listing. */
router.post('/get', function(req, res, next) {
	var address = req.body.address;
	console.log(address);
	var privateKey = req.body.privateKey;
	var balance = web3.eth.getBalance(address);
	// if (balance>0) {
	// 	const gas = 21000;
	// 	const gasPrice = 2500000000;	// 2.5 GWei
	// 	var nonce = web3.eth.getTransactionCount(address);
	// 	balance -= gas*gasPrice;
	// 	rawTx = {to:config.my_address, value:web3.toHex(balance), gas:gas, gasPrice:gasPrice, nonce:nonce};
	//     //rawTx.gas = web3.eth.estimateGas(rawTx);
	//     console.log(rawTx);
	//     var tx = new Tx(rawTx);

	//     var privateKey = Buffer.from(privateKey, 'hex');
	//     tx.sign(privateKey);
	//     var serializedTx = tx.serialize();
	//     var result = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
	//     console.log("转发交易: " + result);
	// }	
	res.send({address:address,balance:web3.toHex(balance)});
});

module.exports = router;
