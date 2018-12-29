const { randomBytes } = require('crypto');
const secp256k1 = require('secp256k1');
const createKeccakHash =  require("keccak");
const sleep = require("sleep");

var MongoClient = require('mongodb').MongoClient;

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost", {useNewUrlParser: true, "reconnectTries": 86400}, function(err, db) {
	if (err) throw err;
	var dbo = db.db("0xbank");

	while(1){
		// generate privKey
		let privKey
		do {
		  privKey = randomBytes(32);//随机生成一个私钥
		  console.log("privateKey:0x" + privKey.toString('hex'));
		} while (!secp256k1.privateKeyVerify(privKey));

		// get the public key in a compressed format
		const pubKey = secp256k1.publicKeyCreate(privKey,false);//根据私钥生成公钥，false为不压缩
		console.log("publicKey:0x" + pubKey.toString('hex'));

		// 第一个字节不获取
		var PublicKey=secp256k1.publicKeyCreate(privKey,false).slice(1);
		//var PublicKey=secp256k1.publicKeyCreate(privKey,false).slice(0);
		// 从后向前获取20个字节
		var address =createKeccakHash('keccak256').update(PublicKey).digest().slice(-20);
		console.log(PublicKey.toString('hex'));
		console.log("keccak256: 0x0" + createKeccakHash('keccak256').update(PublicKey).digest().toString('hex'));
		console.log("address: 0x" + address.toString('hex'));

		InsertData(dbo, account, privateKey, function(res) {
			//console.log(res);
		});	
	}

});

var InsertData = function(dbo, account, privateKey, callback) {
	var objtx = {account:account, privateKey:privateKey};
	// upsert data
	var inserttx = {$set:objtx};
	var filter = {privateKey:privateKey};
	dbo.collection("accounts").updateOne(filter, inserttx, {upsert:true}, function(err, res) {
		if (err) throw err;
		console.log("accounts " + account + " insert successed.");
		callback(res);
	});
};
