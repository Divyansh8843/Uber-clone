---

# API Reference

## Users

### Register User

**POST** `/users/register`

Registers a new user.

**Request Body:**
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

**Success Response (201):**
```json
{
  "user": {
    "_id": "665f1e2b8c1a2e0012a34567",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
  },
  "token": "jwt_token_here"
}
```

**Error Responses:**
- 400: Validation error
- 404: Password hashing failed
- 500: Internal server error

---

### User Sign In

**POST** `/users/signin`

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Success Response (201):**

```json
{
  "user": {
    "_id": "665f1e2b8c1a2e0012a34567",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
  },
  "token": "jwt_token_here"
}
```

**Error Responses:**

- 400: Validation error
- 401: Invalid Email or Password
- 404: Invalid Email or Password
- 500: Internal server error

---

### User Profile

**GET** `/users/profile`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response (201):**

```json
{
  "_id": "665f1e2b8c1a2e0012a34567",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "socketId": null
}
```

**Error Response:**

- 401: Unauthorized

---

### User Logout

**GET** `/users/logout`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response (201):**

```json
{
  "message": "Logged out Sucesssfully"
}
```

**Error Response:**

- 401: Unauthorized

---

## Captains

### Register Captain

**POST** `/captains/register`

**Request Body:**

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

**Success Response (200):**

```json
{
  "captain": {
    "_id": "665f1e2b8c1a2e0012a34567",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null,
    "location": { "ltd": null, "lng": null }
  },
  "token": "jwt_token_here"
}
```

**Error Responses:**

- 400: Validation error
- 404: Password hashing failed
- 500: Internal server error

---

### Captain Sign In

**POST** `/captains/signin`

**Request Body:**

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

**Success Response (200):**

```json
{
  "captain": {
    "_id": "665f1e2b8c1a2e0012a34567",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "jwt_token_here"
}
```

**Error Responses:**

- 400: Validation error
- 401: Invalid Email or Password
- 404: Invalid Email or Password
- 500: Internal server error

---

### Captain Profile

**GET** `/captains/profile`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response (200):**

```json
{
  "_id": "665f1e2b8c1a2e0012a34567",
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
  "email": "jane.smith@example.com",
  "status": "inactive",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "socketId": null,
  "location": { "ltd": null, "lng": null }
}
```

**Error Response:**

- 401: Unauthorized

---

### Captain Logout

**GET** `/captains/logout`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response (200):**

```json
{
  "message": "Logged out Sucesssfully"
}
```

**Error Response:**

- 401: Unauthorized

---

## Maps

### Get Coordinates

**GET** `/maps/get-coordinates?address=Some+Address`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response (200):**

```json
{
  "lat": 28.7041,
  "lng": 77.1025
}
```

**Error Responses:**

- 400: Validation error
- 404: Address Not found / Coordinates Not Found

---

### Get Distance and Time

**GET** `/maps/get-distance-time?origin=AddressA&destination=AddressB`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response (200):**

```json
{
  "distance": { "text": "12 km", "value": 12000 },
  "duration": { "text": "25 mins", "value": 1500 }
}
```

**Error Responses:**

- 400: Validation error
- 404: Details Not Found / Distance Not Found

---

### Get Suggestions

**GET** `/maps/get-suggestions?input=delhi`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response (200):**

```json
[
  { "description": "Delhi, India", "place_id": "ChIJL_P_CXMEDTkRw0ZdG-0GVvw" },
  {
    "description": "New Delhi, India",
    "place_id": "ChIJLbZ-NFv9DDkRzk0gTkm3wlI"
  }
]
```

**Error Responses:**

- 400: Validation error
- 404: query not Found / Distance Not Found

---

## Rides

### Create Ride

**POST** `/rides/create`

**Headers:**  
`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

**Success Response (200):**

```json
{
  "_id": "665f1e2b8c1a2e0012a34567",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "user": "665f1e2b8c1a2e0012a34567",
  "fare": 120.5,
  "status": "pending",
  "otp": "123456"
}
```

**Error Responses:**

- 400: Validation error
- 404: Details Not Found
- 500: Error occurred

---

### Find Fare

**POST** `/rides/findfare`

**Headers:**  
`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St"
}
```

**Success Response (200):**

```json
{
  "auto": 80.5,
  "moto": 60.0,
  "car": 120.5
}
```

**Error Responses:**

- 400: Validation error
- 404: Details Not Found
- 500: Error occurred

---

### Confirm Ride

**POST** `/rides/confirm`

**Headers:**  
`Authorization: Bearer <captain_token>`

**Request Body:**

```json
{
  "rideId": "665f1e2b8c1a2e0012a34567"
}
```

**Success Response (200):**

```json
{
  "_id": "665f1e2b8c1a2e0012a34567",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "user": {
    /* user object */
  },
  "captain": {
    /* captain object */
  },
  "fare": 120.5,
  "status": "accepted",
  "otp": "123456"
}
```

**Error Responses:**

- 400: Validation error
- 404: Details Not Found
- 500: Error occurred

---

### Start Ride

**GET** `/rides/start-ride?rideId=<rideId>&otp=<otp>`

**Headers:**  
`Authorization: Bearer <captain_token>`

**Success Response (200):**

```json
{
  "_id": "665f1e2b8c1a2e0012a34567",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "user": {
    /* user object */
  },
  "captain": {
    /* captain object */
  },
  "fare": 120.5,
  "status": "ongoing",
  "otp": "123456"
}
```

**Error Responses:**

- 400: Validation error
- 404: Details Not Found / Invalid Otp
- 500: Error occurred

---

### Finish Ride

**POST** `/rides/finish-ride`

**Headers:**  
`Authorization: Bearer <captain_token>`

**Request Body:**

```json
{
  "rideId": "665f1e2b8c1a2e0012a34567"
}
```

**Success Response (200):**

```json
{
  "_id": "665f1e2b8c1a2e0012a34567",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "user": {
    /* user object */
  },
  "captain": {
    /* captain object */
  },
  "fare": 120.5,
  "status": "completed",
  "otp": "123456"
}
```

**Error Responses:**

- 400: Validation error
- 404: Details Not Found
- 500: Error occurred

---

## Error Response Example

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

**Note:**  
All endpoints that require authentication expect the JWT token in the `Authorization` header as `Bearer <token>`.  
All endpoints return appropriate HTTP status codes and error messages as shown above.

---

For more details, refer to the controller and route files in the [backend/routes](routes/) and [backend/controllers](controllers/)
