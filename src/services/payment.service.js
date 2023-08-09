import Stripe from "stripe";
import config from "../config/config.js";
import { logger } from "../utils/logger.js";

const { stripe } = config;
const secret_key = stripe.secret_key;

export default class PaymentService {
  constructor() {
    this.stripe = new Stripe(secret_key);
  }

  createPaymentIntent = async (data) => {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create(data);
      const paymentMethod = await this.stripe.paymentMethods.retrieve(paymentIntent.payment_method);
      if (paymentMethod.status === "failed") {
        throw new Error(`Error processing payment: Payment method issue. Status: ${paymentMethod.status}`);
      }
      logger.info("Payment successful.");
      return { paymentIntent, secret_key };
    } catch (error) {
      logger.error("Payment could not be made:", error);
      const errorMessage = `Error processing payment: ${error.message}`;

      if (error.type === "StripeCardError") {
        // Aquí manejas específicamente el error de tarjeta inválida
        throw new Error(`${errorMessage} Por favor revisa los detalles de tu tarjeta.`);
      } else {
        throw new Error(errorMessage);
      }
    }
  };
}
