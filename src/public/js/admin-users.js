//DELETE INACTIVE USERS
function deleteInactive() {
  fetch("/", {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      toastr.success("Users deleted successfuly!");

      setTimeout(() => {
        location.href = "/admin/users";
      }, 2000);
    } else {
      toastr.error("Could not delete users.");
      console.error("Could not delete users:", error);
    }
  });
}

//DELETE USERS
function deleteUser(userId) {
  fetch(`/api/users/${userId}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      toastr.success("User deleted successfuly!");

      setTimeout(() => {
        location.href = "/admin/users";
      }, 2000);
    } else {
      toastr.error("Failed to delete user.");
      console.error("Failed to delete user.", error);
    }
  });
}

//CHANGE ROLE
function changeRole(userId, newRole) {
  fetch(`/api/users/premium/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: newRole }),
  })
    .then((response) => {
      if (response.ok) {
        toastr.success("Role changed successfuly!");
        setTimeout(() => {
          location.href = "/admin/users";
        }, 2000);
      } else {
        toastr.error("Failed to change role.");
      }
    })
    .catch((error) => {
      toastr.error("Failed to change role.");
      console.error("Failed to change role:", error);
    });
}
