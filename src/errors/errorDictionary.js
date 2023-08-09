export const errorsName = {
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
  GENERAL_ERROR_NAME: "User error.",
  // PRODUCTS
  PRODUCT_NOT_FOUND: "product_not_found",
  PRODUCT_IN_CART: "product_in_cart",
  PRODUCT_FETCH_FAILED: "product_fetch_failed",
  PRODUCT_CREATION_FAILED: "product_creation_failed",
  PRODUCT_ALREADY_EXISTS: "product_already_exists",
  INSUFFICIENT_STOCK: "insufficient_stock",

  // CARTS
  CART_NOT_CREATED: "cart_not_created",
  CART_NOT_FOUND: "cart_not_found",
  INVALID_CART_ID: "invalid_cart_id",
  INVALID_CART_QTY: "invalid_cart_quantity",
  CART_OR_PRODUCT_NOT_FOUND: "cart_or_product_not_found",
  PRODUCT_CART_QTY: "product_cart_quantity",
  CART_UPDATE: "cart_update_failed",
  CART_EMPTY: "cart_empty_failed",
  DELETE_PRODUCT_CART: "delete_product_cart_failed",
  PURCHASE_CART: "purchase_cart_failed",

  // USERS
  AUTHENTICATION_ERROR: "authentication_error",
  USER_NOT_FOUND: "user_not_found",
  DUPLICATE_EMAIL: "duplicate_email",
  INVALID_USER_ID: "invalid_user_id",
  INVALID_CREDENTIALS: "invalid_credentials",
  PASSWORD_RESET_TOKEN_EXPIRED: "password_reset_token_expired",
  PASSWORD_RESET_TOKEN_INVALID: "invalid_password_reset_token",
  UNAUTHORIZED_ACCESS: "unauthorized_access",
  GENERAL_ERROR_NAME: "User error",

  // ORDERS
  ORDER_NOT_FOUND: "order_not_found",
  MISSING_FIELDS: "missing_fields",
  INVALID_ORDER_ID: "invalid_order_id",
  ORDER_CREATION_FAILED: "order_creation_failed",
  ORDER_RESOLUTION_FAILED: "order_resolution_failed",
  INVALID_SHIPPING_ADDRESS: "invalid_shipping_address",

  //RESTORE
  RESTORE_ERROR_NAME: "Restore error",
  CHANGE_PASSWORD_ERROR_NAME: "Change password error",
};

export const errorsMessage = {
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
  // PRODUCTS
  PRODUCT_NOT_FOUND: "Product not found. Please try again.",
  PRODUCT_IN_CART: "Problems with getting products in the cart.",
  PRODUCT_FETCH_FAILED: "Failed to fetch product. Please try again later.",
  PRODUCT_CREATION_FAILED: "Failed to create product. Please try again later.",
  PRODUCT_ALREADY_EXISTS: "The product already exists.",
  INSUFFICIENT_STOCK: "Insufficient stock. Unable to proceed with the purchase.",
  THUMBNAIL_NOT_UPLOADED_MESSAGE: "Thumbnail not uploaded.",
  NOT_FOUND_MESSAGE: "Product not found. The requested product does not exist.",

  // CARTS
  CART_NOT_CREATED: "Problems occurred while creating the cart.",
  CART_NOT_FOUND: "Cart not found.",
  INVALID_CART_ID: "Invalid cart ID.",
  INVALID_CART_QTY: "Invalid quantity. Quantity must be greater than zero.",
  CART_OR_PRODUCT_NOT_FOUND: "Cart or product not found.",
  PRODUCT_CART_QTY: "Error updating the product quantity in the cart.",
  CART_UPDATE: "Error updating the cart.",
  CART_EMPTY: "Error emptying the cart.",
  DELETE_PRODUCT_CART: "Error removing the product from the cart.",
  PURCHASE_CART: "Error processing the cart. Please try again.",

  // USERS
  AUTHENTICATION_ERROR: "Authentication error.",
  USER_NOT_FOUND: "User not found.",
  DUPLICATE_EMAIL: "Email already exists. Please choose a different email.",
  INVALID_USER_ID: "Invalid user ID.",
  INVALID_CREDENTIALS: "Invalid credentials. Please check your email and password.",
  PASSWORD_RESET_TOKEN_EXPIRED: "Password reset token has expired.",
  PASSWORD_RESET_TOKEN_INVALID: "Invalid password reset token.",
  UNAUTHORIZED_ACCESS: "Unauthorized access. Please log in.",
  USER_NOT_OWNER_MESSAGE: "User not have permissions to delete",
  NOT_GET_USER_ID_MESSAGE: "User id is not passed in the request",
  USER_NOT_FOUND_MESSAGE: "User not found for restore email.",

  // ORDERS
  ORDER_NOT_FOUND: "Order not found.",
  MISSING_FIELDS: "Missing required fields.",
  INVALID_ORDER_ID: "Invalid order ID.",
  ORDER_CREATION_FAILED: "Failed to create the order. Please try again.",
  ORDER_RESOLUTION_FAILED: "Failed to resolve the order. Please try again later.",
  INVALID_SHIPPING_ADDRESS: "Invalid shipping address. Please provide a valid address.",

  //RESTORE
  RESTORE_NOT_CREATED_MESSAGE: "Restore was not created",
  USER_NOT_FOUND_MESSAGE: "User not found",
  RESTORE_NOT_FOUND_MESSAGE: "Restore not found",
  TOKEN_EXPIRED_MESSAGE: "Token was expired",

  //OTHERS
  CHANGE_PASSWORD_ERROR_MESSAGE: "Failed to change password. An error occurred during password change.",
  CURRENT_PASSWORD_INCORRECT_MESSAGE: "Current password is incorrect.",
  TOKEN_RESTORE_NOT_FOUND_OR_EXPIRED_MESSAGE: "Token restore not found or expired.",
  INVALID_CURRENT_PASSWORD_MESSAGE: "Invalid current password. Try with other.",
};

export const errorsCause = {
  INTERNAL_SERVER_ERROR: "An unexpected error occurred on the server.",
  // PRODUCTS
  PRODUCT_NOT_FOUND: "The requested product could not be found in the database.",
  PRODUCT_IN_CART: "There was an issue with getting the products in the cart.",
  PRODUCT_FETCH_FAILED: "Failed to fetch the product from the database.",
  PRODUCT_CREATION_FAILED: "Failed to create the product.",
  PRODUCT_ALREADY_EXISTS: "The product already exists in the database.",
  INSUFFICIENT_STOCK: "There is insufficient stock to proceed with the purchase.",
  THUMBNAIL_NOT_UPLOADED_CAUSE: "Thumbnail could not be uploaded due to an internal error.",
  NOT_FOUND_CAUSE: "The product with the provided ID was not found in the database.",

  // CARTS
  CART_NOT_CREATED: "There was an issue while attempting to create the cart.",
  CART_NOT_FOUND: "The requested cart could not be found.",
  INVALID_CART_ID: "The provided cart ID is invalid.",
  INVALID_CART_QTY: "The provided quantity is invalid. Quantity must be greater than zero.",
  CART_OR_PRODUCT_NOT_FOUND: "The cart or the product could not be found.",
  PRODUCT_CART_QTY: "There was an error updating the product quantity in the cart.",
  CART_UPDATE: "There was an error updating the cart.",
  CART_EMPTY: "There was an error emptying the cart.",
  DELETE_PRODUCT_CART: "There was an error removing the product from the cart.",
  PURCHASE_CART: "There was an error processing the cart. Please try again.",

  // USERS
  AUTHENTICATION_ERROR: "Authentication error occurred.",
  USER_NOT_FOUND: "The requested user could not be found.",
  DUPLICATE_EMAIL: "The provided email already exists. Please choose a different email.",
  INVALID_USER_ID: "The provided user ID is invalid.",
  INVALID_CREDENTIALS: "Invalid credentials. Please check your email and password.",
  PASSWORD_RESET_TOKEN_EXPIRED: "The password reset token has expired.",
  PASSWORD_RESET_TOKEN_INVALID: "The provided password reset token is invalid.",
  UNAUTHORIZED_ACCESS: "Unauthorized access. Please log in.",
  USER_NOT_OWNER_CAUSE: "User are not the owner of these product to delete",
  NOT_GET_USER_ID_CAUSE: "User id is not passed in the request",

  // ORDERS
  ORDER_NOT_FOUND: "The requested order could not be found.",
  MISSING_FIELDS: "Some required fields are missing.",
  INVALID_ORDER_ID: "The provided order ID is invalid.",
  ORDER_CREATION_FAILED: "Failed to create the order.",
  ORDER_RESOLUTION_FAILED: "Failed to resolve the order.",
  INVALID_SHIPPING_ADDRESS: "The provided shipping address is invalid. Please provide a valid address.",

  //RESTORE
  RESTORE_NOT_CREATED_CAUSE: "Restore not created",
  USER_EMAIL_NOT_EXISTS_CAUSE: "User email not exists",
  RETORE_NOT_FOUND_CAUSE: "The restore token may was expired or not exists",
  TOKEN_EXPIRED_CAUSE: "The token already has expired, please try restore password again",
  INVALID_CURRENT_PASSWORD_CAUSE: "Password already used. Change it.",
};
