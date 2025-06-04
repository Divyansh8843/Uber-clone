# Uber Clone Backend

This is the backend API for the Uber Clone project. It is built with Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the backend root with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   ```

3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Registration

**POST** `/api/v1/user/register`

Registers a new user.

#### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Responses

- **200 OK**  
  User registered successfully. Returns the user object and JWT token.

  ```json
  {
    "user": {
      /* user object */
    },
    "token": "jwt_token_here"
  }
  ```

- **400 Bad Request**  
  Validation failed (e.g., invalid email, short password, missing fields).

  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

- **404 Not Found**  
  Password hashing failed.

  ```json
  {
    "message": "hash password not found"
  }
  ```

- **500 Internal Server Error**  
  Unexpected server error.
  ```json
  {
    "message": "Internal server error"
  }
  ```

---

Add more endpoints and documentation as your backend grows.

## User Registration

**POST** `/api/v1/user/register`

Registers a new user.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Example Success Response

```json
{
  "user": {
    "_id": "665f1e2b8c1a2e0012a34567",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example Error Response

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```
