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

---

## User Sign In

**POST** `/api/v1/user/signin`

Authenticates a user and returns a JWT token if credentials are valid.

### Request Body

```json
{
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

### Example Error Responses

- **401 Unauthorized**

  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```

- **400 Bad Request**

  ```json
  {
    "errors": [
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **404 Not Found**

  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

---

## User Profile

**GET** `/api/v1/user/profile`

Returns the authenticated user's profile information.  
**Requires Authorization header with Bearer token.**

### Example Request

```
GET /api/v1/user/profile
Authorization: Bearer <jwt_token>
```

### Example Success Response

```json
{
  "_id": "665f1e2b8c1a2e0012a34567",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
  // ...other user fields
}
```

### Example Error Response

```json
{
  "message": "Unauthorized access"
}
```

---

## User Logout

**GET** `/api/v1/user/logout`

Logs out the authenticated user by blacklisting the JWT token and clearing the cookie.  
**Requires Authorization header with Bearer token.**

### Example Request

```
GET /api/v1/user/logout
Authorization: Bearer <jwt_token>
```

### Example Success Response

```json
{
  "message": "Logged out Sucesssfully"
}
```

### Example Error Response

```json
{
  "message": "Unauthorized access"
}
```

---

## Captain API Endpoints

### Register Captain

**POST** `/api/v1/captain/register`

Registers a new captain (driver) with vehicle details.

#### Request Body

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Example Success Response

```json
{
  "captain": {
    "_id": "665f1e2b8c1a2e0012a34567",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null,
    "location": {
      "latitude": null,
      "longitude": null
    }
    // ...other captain fields
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Example Error Response

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

---

### Captain Sign In

**POST** `/api/v1/captain/signin`

Authenticates a captain and returns a JWT token if credentials are valid.

#### Request Body

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

#### Example Success Response

```json
{
  "captain": {
    "_id": "665f1e2b8c1a2e0012a34567",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain fields
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Example Error Responses

- **401 Unauthorized**

  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```

- **400 Bad Request**
  ```json
  {
    "errors": [
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

---

### Captain Profile

**GET** `/api/v1/captain/profile`

Returns the authenticated captain's profile information.  
**Requires Authorization header with Bearer token.**

#### Example Request

```
GET /api/v1/captain/profile
Authorization: Bearer <jwt_token>
```

#### Example Success Response

```json
{
  "_id": "665f1e2b8c1a2e0012a34567",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "status": "inactive",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "socketId": null,
  "location": {
    "latitude": null,
    "longitude": null
  }
  // ...other captain fields
}
```

#### Example Error Response

```json
{
  "message": "Unauthorized access"
}
```

---

### Captain Logout

**GET** `/api/v1/captain/logout`

Logs out the authenticated captain by blacklisting the JWT token and clearing the cookie.  
**Requires Authorization header with Bearer token.**

#### Example Request

```
GET /api/v1/captain/logout
Authorization: Bearer <jwt_token>
```

#### Example Success Response

```json
{
  "message": "Logged out Sucesssfully"
}
```

#### Example Error Response

```json
{
  "message": "Unauthorized access"
}
```
