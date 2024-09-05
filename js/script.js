function signUp() {
  var email = document.getElementById("email-input").value;
  fetch(
    "https://script.google.com/macros/s/AKfycbwg25zZK9nvwsGX62iaVS2CW-GNFuRMJg52M0bvMWRbZVTViqMF0bJUa5kehesOVkgL/exec",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
