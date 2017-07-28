function bitsToTrits(bits) {
  return bits * Math.log(2) / Math.log(3);
}

function tritsToBits(trits) {
  return trits * Math.log(3) / Math.log(2);
}

function bitsToTritsConv(field) {
  switch (field.id) {
    case 'bytes':
      var bytes = true;
    case 'bits':
      var bits = bytes ? field.value * 8 : field.value;
      document.getElementById('bits').value = bits;
      document.getElementById('bytes').value = bits / 8;
      document.getElementById('trits').value = bitsToTrits(bits);
      document.getElementById('trytes').value = bitsToTrits(bits) / 3;
      bytes = false;
      break;
    case 'trytes':
      var trytes = true;
    case 'trits':
      var trits = trytes ? field.value * 3 : field.value;
      document.getElementById('bits').value = tritsToBits(trits);
      document.getElementById('bytes').value = tritsToBits(trits) / 8;
      document.getElementById('trits').value = trits;
      document.getElementById('trytes').value = trits / 3;
      trytes = false;
      break;
  }
}

