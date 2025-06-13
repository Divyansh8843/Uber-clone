# Uber Clone Frontend

This is the frontend for the Uber Clone project, built with React and Vite.

---

## API Endpoints Reference

The frontend communicates with the backend via REST API endpoints. Below are all the main endpoints used, their request/response formats, and usage examples.

---

## User Endpoints

### Register User

**POST** `/users/register`

Registers a new user.

**Request Example:**

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

**Success Response:**

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

---

### User Login

**POST** `/users/signin`

**Request Example:**

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Success Response:**

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

---

### User Profile

**GET** `/users/profile`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response:**

```json
{
  "_id": "665f1e2b8c1a2e0012a34567",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "socketId": null
}
```

---

### User Logout

**GET** `/users/logout`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response:**

```json
{
  "message": "Logged out Sucesssfully"
}
```

---

## Captain Endpoints

### Register Captain

**POST** `/captains/register`

**Request Example:**

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

**Success Response:**

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

---

### Captain Login

**POST** `/captains/signin`

**Request Example:**

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

**Success Response:**

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

---

### Captain Profile

**GET** `/captains/profile`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response:**

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

---

### Captain Logout

**GET** `/captains/logout`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response:**

```json
{
  "message": "Logged out Sucesssfully"
}
```

---

## Maps Endpoints

### Get Coordinates

**GET** `/maps/get-coordinates?address=Some+Address`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response:**

```json
{
  "lat": 28.7041,
  "lng": 77.1025
}
```

---

### Get Distance and Time

**GET** `/maps/get-distance-time?origin=AddressA&destination=AddressB`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response:**

```json
{
  "distance": { "text": "12 km", "value": 12000 },
  "duration": { "text": "25 mins", "value": 1500 }
}
```

---

### Get Suggestions

**GET** `/maps/get-suggestions?input=delhi`

**Headers:**  
`Authorization: Bearer <token>`

**Success Response:**

```json
[
  { "description": "Delhi, India", "place_id": "ChIJL_P_CXMEDTkRw0ZdG-0GVvw" },
  {
    "description": "New Delhi, India",
    "place_id": "ChIJLbZ-NFv9DDkRzk0gTkm3wlI"
  }
]
```

---

## Ride Endpoints

### Create Ride

**POST** `/rides/create`

**Headers:**  
`Authorization: Bearer <token>`

**Request Example:**

```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

**Success Response:**

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

---

### Find Fare

**POST** `/rides/findfare`

**Headers:**  
`Authorization: Bearer <token>`

**Request Example:**

```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St"
}
```

**Success Response:**

```json
{
  "auto": 80.5,
  "moto": 60.0,
  "car": 120.5
}
```

---

### Confirm Ride

**POST** `/rides/confirm`

**Headers:**  
`Authorization: Bearer <captain_token>`

**Request Example:**

```json
{
  "rideId": "665f1e2b8c1a2e0012a34567"
}
```

**Success Response:**

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

---

### Start Ride

**GET** `/rides/start-ride?rideId=<rideId>&otp=<otp>`

**Headers:**  
`Authorization: Bearer <captain_token>`

**Success Response:**

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

---

### Finish Ride

**POST** `/rides/finish-ride`

**Headers:**  
`Authorization: Bearer <captain_token>`

**Request Example:**

```json
{
  "rideId": "665f1e2b8c1a2e0012a34567"
}
```

**Success Response:**

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

## Usage in Frontend

- All API requests are made using [axios](https://axios-http.com/).
- The base URL is set via `VITE_BASE_URL` in your `.env` file.
- JWT tokens are stored in `localStorage` after login/registration and sent in the `Authorization` header for protected routes.
- See `/src/pages` and `/src/components` for usage examples in React components.

---

## Project Structure

- `src/pages/` — Main pages (UserLogin, UserRegister, CaptainLogin, CaptainRegister, Home, Riding, etc.)
- `src/components/` — UI components (PanelComponent, VehiclePanelComponent, etc.)
- `src/context/` — React Context for user and captain data
- `src/App.jsx` — Main router and route protection

---

## Environment Variables

Create a `.env` file in the frontend root:

```
VITE_BASE_URL=http://localhost:8080
```

---

## License

MIT

---

For backend API details, see [../backend/README.md](../backend/README.md)
