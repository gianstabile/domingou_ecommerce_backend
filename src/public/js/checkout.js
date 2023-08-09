document.addEventListener("DOMContentLoaded", async () => {
  const paymentForm = document.getElementById("payment-form");
  const orderId = paymentForm.dataset.order;
  const stripePublicKey = paymentForm.dataset.stripe;
  const stripe = Stripe(stripePublicKey);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
        border: "1px solid #ced4da",
        padding: "0.375rem 0.75rem",
        borderRadius: "0.25rem",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const elements = stripe.elements();
  const cardElement = elements.create("card", cardStyle);
  cardElement.mount("#card-element");

  const submitButton = document.getElementById("submit-button");
  const errorElement = document.getElementById("card-errors");

  cardElement.on("change", (event) => {
    if (event.error) {
      errorElement.textContent = event.error.message;
    } else {
      errorElement.textContent = "";
    }
  });

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      errorElement.textContent = error.message;
      submitButton.disabled = false;
    } else {
      const { name, email } = paymentForm.elements;
      const token = paymentMethod.id;

      const formData = {
        name: name.value,
        email: email.value,
        token: token,
      };

      try {
        const response = await fetch(`/api/orders/${orderId}/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.status === "success") {
          toastr.success("Payment made successfully!");
          console.log("Payment made successfully.");
          setTimeout(() => {
            location.href = "/profile";
          }, 2000);
        } else {
          toastr.error("Payment failed, please try again.");
          console.error("Payment failed:", data.error);
          submitButton.disabled = false;
        }
      } catch (error) {
        toastr.error("An error occurred, please try again.");
        console.error("An error occurred:", error);
        submitButton.disabled = false;
      }
    }
  });
});
