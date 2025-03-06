function signUp() {
  var email = document.getElementById("email-input").value;
  fetch(
    "https://script.google.com/macros/s/AKfycbwg25zZK9nvwsGX62iaVS2CW-GNFuRMJg52M0bvMWRbZVTViqMF0bJUa5kehesOVkgL/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      body: JSON.stringify({ email: email }),
    }
  )
    .then((response) => {
      if (response.ok) {
        alert(
          "Email saved successfully! (Note: Cannot confirm status due to no-cors mode)"
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error sending your request.");
    });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendEmail() {
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("status");

  if (!validateEmail(email)) {
    status.textContent = "Invalid email address";
    return;
  }
  if (!message) {
    status.textContent = "Message cannot be empty";
    return;
  }

  status.textContent = "Sending...";
  this.disabled = true;

  try {
    const form = new FormData();
    form.append(
      "from",
      "Mailgun Sandbox <postmaster@sandboxa5f727aeee9c416bb345687e33653b18.mailgun.org>"
    );
    form.append("to", "Chenlin Zhang <chenlinzhang@greenplatter.net>");
    form.append("subject", `Contact from ${email}`);
    form.append("text", message);

    const domainName = "sandboxa5f727aeee9c416bb345687e33653b18.mailgun.org";
    const apiKey = "af12c8b1dd47a41a61f9b5a045eb98e8-e298dd8e-145a90e2";
    const token = window.btoa(`api:${apiKey}`);
    const resp = await fetch(
      `https://api.mailgun.net/v3/${domainName}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + token,
        },
        body: form,
      }
    );

    const data = await resp.text();
    console.log(data);

    status.textContent = "Email sent successfully!";
    status.style.color = "green";
  } catch (error) {
    console.error("sendEmail: ", error);
    status.textContent = "Failed to send email";
    status.style.color = "red";
  }

  this.disabled = false;
}
