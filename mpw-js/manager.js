/*! by Tom Thorogood <me@tomthorogood.co.uk> */
/*! This work is licensed under the Creative Commons Attribution 4.0
International License. To view a copy of this license, visit
http://creativecommons.org/licenses/by/4.0/ or see LICENSE. */

var mpw, fullname, masterpassword, sitename, counter, resulttype, password, error, id = 0;

function updateMPW() {
	error.textContent = password.value = "";
	
	if (!fullname.value ||
		!masterpassword.value ||
		!fullname.validity.valid ||
		!masterpassword.validity.valid) {
		return mpw = null;
	}
	
	mpw = new MPW(fullname.value, masterpassword.value, 3);
	
	updatePassword();
}

function updatePassword() {
	error.textContent = password.value = "";
	
	if (!mpw || !sitename.value ||
		!sitename.validity.valid ||
		!counter.validity.valid) {
		return;
	}
	
	var cid = ++id;
	
  var value = mpw["generatePassword"](sitename.value, counter.valueAsNumber);
	
	value.then(function (pass) {
		if (cid === id) {
			password.value = pass;
		}
	}, function (err) {
		if (cid === id) {
			error.textContent = err.message;
		}
		
		console.error(err);
	});
}

window.addEventListener("load", function () {
	fullname       = document.querySelector("[name=fullname]");
	masterpassword = document.querySelector("[name=masterpassword]");
	calculatekey   = document.querySelector("[name=calculatekey]");
	sitename       = document.querySelector("[name=site]");
	counter        = document.querySelector("[name=counter]");
	password       = document.querySelector(".password");
	error          = document.querySelector(".error");
	
	fullname.disabled = masterpassword.disabled = calculatekey.disabled = sitename.disabled = counter.disabled = password.disabled = false;
	
	updateMPW();
	calculatekey.addEventListener("click", updateMPW, false);
	
	sitename.addEventListener("input", updatePassword, false);
	counter.addEventListener("input", updatePassword, false);
}, false);
