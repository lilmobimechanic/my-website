// TELEGRAM BOT DETAILS
const TELEGRAM_BOT_TOKEN = '8112618316:AAHEyXsz4-AveQeXinT9owFfEEckeM4rCfk';
const TELEGRAM_CHAT_ID = '@mobifixbot'; // This sends to your bot via @username

const modal = document.getElementById('orderModal');
const form = document.getElementById('orderForm');
const selectedServiceInput = document.getElementById('selectedService');

// Open modal and set service name
document.querySelectorAll('.cards button').forEach(button => {
  button.addEventListener('click', () => {
    selectedServiceInput.value = button.dataset.service;
    modal.style.display = 'block';
  });
});

function closeModal() {
  modal.style.display = 'none';
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Phone number validation
function isValidPhone(number) {
  return /^[0-9]{7,15}$/.test(number);
}

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const countryCode = document.getElementById('countryCode').value;
  const mobile = document.getElementById('mobile').value.trim();
  const fullPhone = countryCode + mobile;
  const imei = document.getElementById('imei').value.trim();
  const model = document.getElementById('deviceModel').value;
  const region = document.getElementById('region').value.trim();
  const service = selectedServiceInput.value;

  if (!isValidPhone(mobile)) {
    alert("Please enter a valid mobile number (7-15 digits).");
    return;
  }

  const message = `
📲 *New Service Order Received*:

🔧 *Service:* ${service}
👤 *Name:* ${name}
📞 *Phone:* ${fullPhone}
🔢 *IMEI/SN:* ${imei}
📱 *Device:* ${model}
🌍 *Region:* ${region}
  `;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });

    alert("Order sent successfully! Redirecting to Telegram...");
    window.location.href = "https://web.telegram.org/k/#@mobifixbot"; // Redirect to chat with bot
  } catch (error) {
    alert("Failed to send order. Please try again later.");
    console.error(error);
  }

  form.reset();
  closeModal();
});
