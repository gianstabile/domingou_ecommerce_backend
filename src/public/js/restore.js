const form = document.getElementById("restoreForm");
const emailInput = document.getElementById("email");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;

  const response = await fetch("http://localhost:8080/api/restore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (result.error) {
    toastr.error("An error occurred while resetting the password.");
    console.error(result.error);
    setTimeout(() => {
      location.href = "/restore-password";
    }, 2500);
  } else {
    toastr.success("A new reset email has been generated. Please check your inbox.");
    console.log("Reset email has been sent.");
    setTimeout(() => {
      location.href = "/restore-password";
    }, 2500);
  }
});
