var EMAILJS_SERVICE_ID  = 'service_zwo9za8';
var EMAILJS_TEMPLATE_ID = 'template_dj65v6h';
var EMAILJS_PUBLIC_KEY  = 'YInKJUQPM6IOOpXF9';

emailjs.init(EMAILJS_PUBLIC_KEY);

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var btn        = document.getElementById('submit-btn');
  var successMsg = document.getElementById('form-success');
  var errorMsg   = document.getElementById('form-error');
  var email      = document.getElementById('email').value;
  var message    = document.getElementById('message').value;

  btn.disabled = true;
  btn.textContent = 'ENVIANDO...';
  successMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { email: email, message: message })
    .then(function () {
      successMsg.classList.remove('hidden');
      document.getElementById('contact-form').reset();
    })
    .catch(function () {
      errorMsg.classList.remove('hidden');
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = 'ENVIAR';
    });
});
