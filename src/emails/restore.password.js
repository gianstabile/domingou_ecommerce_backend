export const restorePasswordTemplate = (token) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password reset</title>
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
    <h1>Password reset</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:8080/restore-password?token=${token}" class="btn"><span>Restore password</span></a>
  </div>
</body>
</html>
`;
