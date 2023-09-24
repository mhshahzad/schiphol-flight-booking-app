# API Documentation

Welcome to the API documentation for Schiphol Flight Booking App. This document provides comprehensive information about the available API endpoints and how to use them effectively.

## Table of Contents

- [Flights](#flights)
  - [List Flights](#list-flights)
  - [Reserve a Flight](#reserve-a-flight)
- [Reservations](#reservations)
  - [List Reservations](#list-reservations)
- [Users](#users)
  - [Get User Reservations](#get-user-reservations)
  - [Get Flight Details for a User](#get-flight-details-for-a-user)

---

## Flights

### List Flights

**Endpoint:** `/flights`

**Method:** `GET`

**Description:** Retrieve a list of all available flights. Optionally, you can filter the results by specifying the `date` and `direction` as query parameters.

**Query Parameters:**

- `direction` (optional): Filter flights by direction (e.g., `D` or `A`) where `D` corresponds to Departure and `A` corresponds to Arrival. Defaults to `D` if not specified.
- `date` (optional): Filter flights by departure/arrival date (e.g., `2023-10-01`) in format (YYYY-MM-DD). Defaults to today's date if not specified.

**Example Request:**

```http
GET /flights?date=2023-10-01&direction=D
```

**Example Response (200 OK):**

```json
{
  "flights": [
    {
      "lastUpdatedAt": "2023-09-24T03:29:47.539+02:00",
      "actualLandingTime": null,
      "actualOffBlockTime": "2023-09-24T03:14:53.000+02:00",
      "aircraftRegistration": "9VSFO",
      "aircraftType": {
        "iataMain": "74F",
        "iataSub": "74Y"
      },
      "baggageClaim": null,
      "checkinAllocations": null,
      "codeshares": null,
      "estimatedLandingTime": null,
      "expectedTimeBoarding": null,
      "expectedTimeGateClosing": null,
      "expectedTimeGateOpen": null,
      "expectedTimeOnBelt": null,
      "expectedSecurityFilter": null,
      "flightDirection": "D",
      "flightName": "SQ7393",
      "flightNumber": 7393,
      "gate": null,
      "pier": null,
      "id": "138138794666126197",
      "isOperationalFlight": true,
      "mainFlight": "SQ7393",
      "prefixIATA": "SQ",
      "prefixICAO": "SIA",
      "airlineCode": 152,
      "publicEstimatedOffBlockTime": "2023-09-24T03:10:00.000+02:00",
      "publicFlightState": {
        "flightStates": ["DEP"]
      },
      "route": {
        "destinations": ["SHJ", "SIN"],
        "eu": "N",
        "visa": false
      },
      "scheduleDateTime": "2023-09-24T03:25:00.000+02:00",
      "scheduleDate": "2023-09-24",
      "scheduleTime": "03:25:00",
      "serviceType": "F",
      "terminal": null,
      "transferPositions": {
        "transferPositions": [9]
      },
      "schemaVersion": "4"
    }
  ]
}
```

### Reserve a Flight

**Endpoint:** `/flights/reserve`

**Method:** `POST`

**Description:** Reserve a seat on a specific flight.

**Request Body:**

```json
{
  "flight_id": "138138793537281646",
  "seat": "B3",
  "user_id": "7"
}
```

**Responses:**

- `200 OK`: The reservation was successful.

```json
{
  "message": "Reservation successful"
}
```

- `400 Bad Request`: Missing required fields.

```json
{
  "error": "flight_id, seat, and user_id are marked as required fields"
}
```

- `404 Not Found`: The flight does not exist.

```json
{
  "error": "Flight not found"
}
```

- `409 Conflict`: The seat is already reserved.

```json
{
  "error": "Seat is already reserved"
}
```

- `400 Bad Request`: The flight direction is not correct.

```json
{
  "error": "Flight direction is not correct"
}
```

- `400 Bad Request`: A reservation already exists for the user on this flight.

```json
{
  "error": "Reservation already exists for the user on this flight"
}
```

## Reservations

### List Reservations

**Endpoint:** `/reservations`

**Method:** `GET`

**Description:** Retrieve a list of all reservations made.

**Example Request:**

```http
GET /reservations
```

**Example Response (200 OK):**

```json
[
  {
    "reservation_id": 3,
    "flight_id": 1,
    "user_id": 2,
    "seat": "B1",
    "status": "CONFIRMED",
    "reservation_date": "2023-09-23T21:00:00.000Z"
  }
]
```

## Users

### Get User Reservations

**Endpoint:** `/users/{user_id}/reservations`

**Method:** `GET`

**Description:** Retrieve a list of reservations for a specific user.

**Example Request:**

```http
GET /users/1/reservations
```

**Example Response (200 OK):**

```json
[
  {
    "reservation_id": 2,
    "flight_id": 1,
    "user_id": 7,
    "seat": "B6",
    "status": "CONFIRMED",
    "reservation_date": "2023-09-23T21:00:00.000Z"
  }
]
```

### Get Flight Details for a User

**Endpoint:** `/users/{user_id}/flight-details/{flight_id}`

**Method:** `GET`

**Description:** Retrieve flight details for a specific flight requested by a user.

**Query Parameters:**

- `user_id`: The unique identifier of the user requesting flight details.
- `flight_id`: The unique identifier of the flight for which the user is requesting details.

**Example Request:**

```http
GET /users/1/flight-details/123
```

**Example Response (200 OK):**

```json
{
  "id": 1,
  "flight_name": "SQ7393",
  "departure_date": "2023-09-23T21:00:00.000Z",
  "departure_time": "03:25:00",
  "destination_airport": "SHJ,SIN",
  "airline_prefix": "SIA",
  "schiphol_id": "138138794666126197"
}
```
