
var mongoose = require('mongoose');
var BDTienda = mongoose.connect('mongodb://localhost/BDTienda', {
	useMongoClient: true,
});
module.exports = BDTienda;
