//UPLOAD DOCUMENTS
const documentForm = document.getElementById("documentForm");
const uploadButton = document.getElementById("uploadButton");

documentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(documentForm);
  const userId = documentForm.dataset.userid;

  try {
    let response = await fetch(`/api/users/${userId}/documents`, {
      method: "POST",
      body: formData,
    });

    let result = await response.json();
    console.log(result);

    if (response.ok) {
      toastr.success("Document uploaded successfully!");

      setTimeout(() => {
        location.href = "/profile";
      }, 2000);
    } else {
      toastr.error(result.error);
      console.error(result.error);
    }
  } catch (error) {
    toastr.error("An error occurred while uploading the document.");
    console.error("Error uploading document:", error);
  }
});

//DELETE DOCUMENTS
async function deleteDocument(userId, documentId) {
  try {
    let response = await fetch(`/api/users/${userId}/documents/${documentId}`, {
      method: "DELETE",
    });

    let result = await response.json();

    if (response.ok) {
      toastr.success(result.message);
      setTimeout(() => {
        location.href = "/profile";
      }, 1000);
    } else {
      toastr.error(result.error);
      console.error(result.error);
    }
  } catch (error) {
    toastr.error("An error occurred while deleting the document.");
    console.error("Error deleting document:", error);
  }
}

// UPLOAD PROFILE IMAGE
const profilePictureContainer = document.getElementById("profilePictureContainer");
const userId = profilePictureContainer.getAttribute("data-userid");

profilePictureContainer.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.name = "profile";
  fileInput.accept = ".jpg, .jpeg, .png, .webp";
  fileInput.style.display = "none";

  fileInput.addEventListener("change", async (e) => {
    const formData = new FormData();
    formData.append("profile", e.target.files[0]);

    try {
      let response = await fetch(`/api/users/${userId}/update`, {
        method: "POST",
        body: formData,
      });

      let result = await response.json();
      console.log(result);

      if (response.ok) {
        toastr.success("Profile updated successfully!");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        toastr.error(result.error);
        console.error(result.error);
      }
    } catch (error) {
      toastr.error("An error occurred while updating the profile.");
      console.error("Error updating the profile:", error);
    }
  });

  fileInput.click();
});
