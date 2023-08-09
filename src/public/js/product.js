//ADD BUTTON
async function addToCart(productId, cartId) {
  try {
    const addToCartProduct = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qty: 1 }),
    });

    if (addToCartProduct.ok) {
      toastr.success("Product added successfully!");
      console.log("Product successfully added.");
    } else {
      response.json().then((data) => {
        toastr.error(data.error);
        console.error(data.error);
      });
    }
  } catch (err) {
    toastr.error("An error occurred while adding product.");
    console.error("Error adding the product:", err);
  }
}
