"use strict";

const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@24.2.1/build/js/utils.js",
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !phone || !email) {
      alert("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!iti.isValidNumber()) {
      alert("Please enter a valid phone number.");
      return;
    }

    const formData = {
      name: name,
      phone: iti.getNumber(),
      email: email,
    };

    const token = "YOUR_TELEGRAM_BOT_TOKEN"; // Change your bot token
    const chatId = "YOUR_CHAT_ID"; // Change your chat ID

    const message = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          alert("Data sent successfully!");
        } else {
          throw new Error(data.description);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while sending data.");
      });
  });
