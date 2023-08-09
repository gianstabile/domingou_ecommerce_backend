const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  for (let [key, value] of data.entries()) {
    obj[key] = value;
  }

  if (!obj.email || !obj.password) {
    toastr.warning("Please enter a valid email and password.");
    return;
  }

  try {
    let response = await fetch("/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    let result = await response.json();

    if (result.status === "success") {
      toastr.success("Login successful. Welcome!");
      setTimeout(function () {
        location.href = "/products";
      }, 1500);
    } else {
      toastr.error("An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    toastr.error("Invalid credentials. Try again.");
  }
});
