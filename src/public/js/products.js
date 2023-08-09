// FORM
const form = document.getElementById("productForm");
const submitButton = document.getElementById("submitForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    let response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    let result = await response.json();
    console.log(result);

    if (response.ok) {
      toastr.success("Product added successfully!");

      setTimeout(() => {
        location.href = "/products";
      }, 2000);
    } else {
      response.json().then((data) => {
        toastr.error(data.error);
        console.error(data.error);
      });
    }
  } catch (error) {
    toastr.error("An error occurred while adding product.");
    console.error("Error adding the product:", error);
  }
});

//DELETE BUTTON
async function handleDeleteButtonClick(e) {
  const deleteButton = e.target;
  const productId = deleteButton.getAttribute("data-id");
  e.preventDefault();
  console.log(productId);

  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toastr.success("Product successfully removed.");
      console.log("Product successfully removed.");
      setTimeout(() => {
        location.href = "/products";
      }, 1000);
    } else {
      response.json().then((data) => {
        toastr.error(data.error);
        console.error(data.error);
      });
    }
  } catch (err) {
    toastr.error("An error occurred while deleting the product.");
    console.error("Error deleting the product:", err);
  }
}
