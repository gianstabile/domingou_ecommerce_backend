const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  if (!obj.email || !obj.password) {
    toastr.warning("Please enter a valid email and password.");
    return;
  }

  try {
    let response = await fetch("/api/sessions/register", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await response.json();
    console.log({ result });

    if (result.status == "error") {
      toastr.error("An error occurred. Please try again.");
    } else {
      toastr.success("Registered. Now login!");
      setTimeout(function () {
        location.href = "/login";
      }, 2000);
    }
  } catch (error) {
    console.error("Error:", error);
    toastr.error("An error occurred. Please try again.");
  }
});
