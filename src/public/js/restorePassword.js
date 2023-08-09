const form = document.getElementById("restorePasswordForm");
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPassword = document.getElementById("new-password").value;

  try {
    const response = await fetch(`http://localhost:8080/api/restore/password?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword }),
    });

    const result = await response.json();

    if (result.error) {
      toastr.error("An error occurred while resetting the password.");
      console.error(result.error);
    } else {
      toastr.success("Password reset successfully. You can now log in with your new password.");
      console.log("Password reset successfully.");
      setTimeout(() => {
        location.href = "/login";
      }, 2500);
    }
  } catch (error) {
    toastr.error("An error occurred while resetting the password.");
    console.error(error);
  }
});
