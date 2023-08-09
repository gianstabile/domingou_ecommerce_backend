const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", async (e) => {
  e.preventDefault();

  logoutButton.disabled = true;

  try {
    toastr.info("Logging out...");

    const response = await fetch("/logout", {
      method: "GET",
    });

    if (response.ok) {
      toastr.success("Logout successful! Redirecting...");
      setTimeout(function () {
        location.href = "/login";
      }, 1500);
    } else {
      toastr.error("An error occurred while logging out. Please try again later.");
    }
  } catch (error) {
    toastr.error("An error occurred while logging out. Please check your network connection.");
    console.error("Error logging out:", error);
  } finally {
    logoutButton.disabled = false;
  }
});
