const services = [
  "FRP Unlock",
  "Demo Mode Unlock",
  "Country/Region Unlock",
  "Firmware Upgrade/Downgrade",
  "Carrier/Network Unlock",
  "Samsung FRP via SN/IMEI (Knox Supported Models)",
  "Samsung FRP via USB",
  "Xiaomi/MI FRP via Sideload Mode (MI Assistant)",
  "Nokia/HMD FRP via Fastboot Mode",
  "Moto FRP via Fastboot Mode",
  "Honor/Huawei FRP via Fastboot Mode"
];

const token = "PASTE_YOUR_TOKEN_HERE";
const chat_id = "PASTE_YOUR_CHAT_ID_HERE";

const serviceList = document.getElementById("service-list");
const modal = document.getElementById("orderModal");
const form = document.getElementById("orderForm");
const selectedServiceInput = document.getElementById("selectedService");

services.forEach(service => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<i class="fas fa-mobile-alt"></i>${service}`;
  card.onclick = () => {
    modal.style.display = "block";
    selectedServiceInput.value = service;
  };
  serviceList.appendChild(card);
});

document.querySelector(".close").onclick = () => {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const text = `
📱 *New Service Request* 📱
━━━━━━━━━━━━━━━
🔧 Service: ${selectedServiceInput.value}
🙍 Name: ${document.getElementById("name").value}
📞 Phone: ${document.getElementById("phone").value}
🔢 IMEI/SN: ${document.getElementById("imei").value}
📱 Device: ${document.getElementById("device").value}
🌐 Region: ${document.getElementById("region").value}
━━━━━━━━━━━━━━━`;

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id,
      text,
      parse_mode: "Markdown"
    })
  })
  .then(res => {
    alert("Order sent successfully!");
    modal.style.display = "none";
    form.reset();
  })
  .catch(err => alert("Failed to send order."));
});
