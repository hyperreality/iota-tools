var iota = new IOTA();

isTrytes = iota.valid.isTrytes;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isPositiveNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && parseFloat(n) >= 0;
}

function isTrits(val) {
  return /^\s*((-1|0|1),)*(-1|0|1)\s*$/.test(val);
}

function isEmpty(val) {
  return /^\s*$/.test(val);
}

function showError(field) {
  field.classList.add("red-border");
}

function showValid(prefix) {
  var validFields = document.querySelectorAll('[id^="' + prefix + '_"]')
  for (var i = 0; i < validFields.length; i++) 
    validFields[i].classList.remove("red-border");
}

function clearFields(prefix) {
  var toClear = document.querySelectorAll('[id^="' + prefix + '_"]')
  for (var i = 0; i < toClear.length; i++) 
    toClear[i].value = '';
}

function bitsToTrits(bits) {
  return bits * Math.log(2) / Math.log(3);
}

function tritsToBits(trits) {
  return trits * Math.log(3) / Math.log(2);
}

function bitsToTritsConv(field) {
  if (isEmpty(field.value)) {
    clearFields('bits');
    showValid('bits');
    return;
  } else if (!isPositiveNumeric(field.value)) {
    showError(field);
    return;
  }
  showValid('bits');


  function roundUp(val) {
    return document.getElementById('bits_round').checked ? Math.ceil(val) : val;
  }

  switch (field.id) {
    case 'bits_bytes':
      document.getElementById('bits_bits').value = roundUp(field.value * 8);
      document.getElementById('bits_bytes').value = roundUp(field.value);
      document.getElementById('bits_trits').value = roundUp(bitsToTrits(field.value * 8));
      document.getElementById('bits_trytes').value = roundUp(bitsToTrits(field.value * 8) / 3);
      break;

    case 'bits_bits':
      document.getElementById('bits_bits').value = roundUp(field.value);
      document.getElementById('bits_bytes').value = roundUp(field.value / 8);
      document.getElementById('bits_trits').value = roundUp(bitsToTrits(field.value));
      document.getElementById('bits_trytes').value = roundUp(bitsToTrits(field.value) / 3);
      break;

    case 'bits_trytes':
      document.getElementById('bits_bits').value = roundUp(tritsToBits(field.value * 3));
      document.getElementById('bits_bytes').value = roundUp(tritsToBits(field.value * 3) / 8);
      document.getElementById('bits_trits').value = roundUp(field.value * 3);
      document.getElementById('bits_trytes').value = roundUp(field.value);
      break;

    case 'bits_trits':
      document.getElementById('bits_bits').value = roundUp(tritsToBits(field.value));
      document.getElementById('bits_bytes').value = roundUp(tritsToBits(field.value) / 8);
      document.getElementById('bits_trits').value = roundUp(field.value);
      document.getElementById('bits_trytes').value = roundUp(field.value / 3);
      break;
  }
}

function base10Conv(field) {
  if (isEmpty(field.value)) {
    clearFields('base10');
    showValid('base10');
    return;
  }

  switch (field.id) {
    default:
    case 'base10_base10':
      if (!isNumeric(field.value)) {
        showError(field);
        return;
      }
      showValid('base10');

      var tritsArray = fromValue(field.value);
      if (document.getElementById('base10_pad').checked) {
        while (tritsArray.length % 3 != 0)
          tritsArray.push(0);                         
      }
      document.getElementById('base10_trits').value = tritsArray.toString();
      document.getElementById('base10_trytes').value = trytes(tritsArray);
      break;

    case 'base10_trits':
      if (!isTrits(field.value)) {
        showError(field);
        return;
      }
      showValid('base10');

      var arr = field.value.split(',').map(Number);
      document.getElementById('base10_base10').value = value(arr);
      document.getElementById('base10_trytes').value = trytes(arr);
      break;

    case 'base10_trytes':
      if (!isTrytes(field.value)) {
        showError(field);
        return;
      }
      showValid('base10');

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
      if (!isTrytes(field.value) || field.value.length % 2) {
        showError(field);
        showError(document.getElementById('ascii_ascii'));
        return;
      }
      showValid('ascii');

      document.getElementById('ascii_ascii').value = iota.utils.fromTrytes(field.value);
      break;
  }
}

