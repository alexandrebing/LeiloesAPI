exports.bigIntegerToPrice = value => parseInt(value) / 100;

exports.priceToBigInteger = value => value.toFixed(2).replace('.', '');
