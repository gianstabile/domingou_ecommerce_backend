export const registrationSuccessfulTemplate = (username) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Registration Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      color: #333333;
      font-size: 24px;
      margin-bottom: 20px;
    }

    p {
      color: #555555;
      font-size: 16px;
      line-height: 1.5;
    }

    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
      margin-top: 20px;
    }

    .btn:hover {
      background-color: #0056b3;
    }

    .btn span {
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Registration Successful</h1>
    <p>Hello ${username},</p>
    <p>Your registration was successful. Welcome to our application!</p>
    <p>You can access your profile by following the link:</p>
    <div>
    <a href="http://localhost:8080/login" target="_blank">Go to site</a>
    </div>
    <p>If you have any questions or need further assistance, please contact us.</p>
    <p>Thank you,</p>
    <p>The team of your application.</p>
  </div>
</body>
</html>
`;
