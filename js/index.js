var iota = new IOTA();

function bitsToTrits(bits) {
  return bits * Math.log(2) / Math.log(3);
}

function tritsToBits(trits) {
  return trits * Math.log(3) / Math.log(2);
}

function bitsToTritsConv(field) {
  switch (field.id) {
    case 'bits_bytes':
      var flag = true;
    case 'bits_bits':
      var bits = flag ? field.value * 8 : field.value;
      document.getElementById('bits_bits').value = bits;
      document.getElementById('bits_bytes').value = bits / 8;
      document.getElementById('bits_trits').value = bitsToTrits(bits);
      document.getElementById('bits_trytes').value = bitsToTrits(bits) / 3;
      flag = false;
      break;
    case 'bits_trytes':
      var flag = true;
    case 'bits_trits':
      var trits = flag ? field.value * 3 : field.value;
      document.getElementById('bits_bits').value = tritsToBits(trits);
      document.getElementById('bits_bytes').value = tritsToBits(trits) / 8;
      document.getElementById('bits_trits').value = trits;
      document.getElementById('bits_trytes').value = trits / 3;
      flag = false;
      break;
  }
}

function base10Conv(field) {
  switch (field.id) {
    default:
    case 'base10_base10':
      var tritsArray = fromValue(field.value);
      if (document.getElementById('base10_pad').checked) {
        while (tritsArray.length % 3 != 0)
          tritsArray.push(0);                         
      }
      document.getElementById('base10_trits').value = tritsArray.toString();
      document.getElementById('base10_trytes').value = trytes(tritsArray);
      break;
    case 'base10_trits':
      var arr = field.value.split(',').map(Number);
      document.getElementById('base10_base10').value = value(arr);
      document.getElementById('base10_trytes').value = trytes(arr);
      break;
    case 'base10_trytes':
      document.getElementById('base10_base10').value = value(trits(field.value));
      document.getElementById('base10_trits').value = trits(field.value).toString();
      break;
  }
}

function asciiConv(field) {
  switch (field.id) {
    case 'ascii_ascii':
      document.getElementById('ascii_trytes').value = iota.utils.toTrytes(field.value);
      break;
    case 'ascii_trytes':
      document.getElementById('ascii_ascii').value = iota.utils.fromTrytes(field.value);
      break;
  }
}

