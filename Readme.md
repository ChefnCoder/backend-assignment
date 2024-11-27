# URL Shortener API

This is a backend application for a **URL Shortener** API built with the **MERN stack (MongoDB, Express.js, Node.js)**. It allows users to:
- Shorten long URLs into compact short URLs.
- Redirect users to the original URL when accessing the short link.
- Track usage statistics, including the number of clicks and the last access time.
- Implements rate limiting to prevent excessive requests.

---

## **Features**
- **POST `/shorten`**: Accepts a URL and returns a shortened URL.
- **GET `/:shortId`**: Redirects the user to the original URL associated with the given `shortId`.
- **GET `/stats/:shortId`**: Retrieves statistics for the given short URL, including:
  - Total clicks.
  - Last accessed timestamp.
- **Rate Limiting**: Prevents more than 100 requests per minute per client.

---

## **Requirements**
This API fulfills the following requirements as per the assignment:
- MongoDB for storing original URLs, shortened IDs, and usage data.
- Proper input validation and error handling.
- Business logic to generate unique `shortId`, track clicks, and update access timestamps.
- Rate limiting (100 requests/min per client).
- Environment variable-based configuration.
- Hosted deployment with a URL for testing.
- Comprehensive documentation (this file).

---

## **Tech Stack**
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB (with Mongoose for schema and database operations)
- **Environment Variables**: `dotenv` for secure configuration
- **Rate Limiting**: `express-rate-limit` for request control

---

## **Setup Instructions**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ChefnCoder/backend-assignment.git
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   ```

4. **Start the Application**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`.

---

## **API Endpoints**

### **1. POST `/api/shorten`**
- **Description**: Accepts a long URL and returns a shortened URL.
- **Request Body**:
  ```json
  {
      "originalUrl": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
      "shortUrl": "http://localhost:5000/a3501505"
  }
  ```
- **Error Responses**:
  - `400`: Missing or invalid `originalUrl`.
  - `500`: Internal server error.

---

### **2. GET `/:shortId`**
- **Description**: Redirects to the original URL associated with the given `shortId`.
- **Example**:
  - **Request**: `GET http://localhost:5000/a3501505`
  - **Redirects to**: `https://example.com`
- **Error Responses**:
  - `404`: Short URL not found.
  - `500`: Internal server error.

---

### **3. GET `/api/stats/:shortId`**
- **Description**: Retrieves usage statistics for a given `shortId`.
- **Example**:
  - **Request**: `GET http://localhost:5000/api/stats/a3501505`
  - **Response**:
    ```json
    {
        "originalUrl": "https://example.com",
        "clicks": 5,
        "lastAccessed": "2024-11-26T15:34:56Z"
    }
    ```
- **Error Responses**:
  - `404`: Short URL not found.
  - `500`: Internal server error.

---

### **4. Rate Limiting**
- **Description**: Limits requests to 100 per minute per client.
- **Error Response**:
  - **Status**: `429 Too Many Requests`
  - **Response**:
    ```json
    {
        "error": "Too many requests, please try again after a minute."
    }
    ```

---

## **Business Logic**
1. **Generate a Unique `shortId`**:
   - Uses `crypto.randomBytes` to generate an 8-character unique ID.
2. **Track Clicks**:
   - Increments the `clicks` counter in the database whenever a short URL is accessed.
3. **Update Timestamp**:
   - Updates the `lastAccessed` timestamp whenever the short URL is visited.

---

## **Deployment**
The application is deployed at: http://backend-assignment-t61b.onrender.com/dffbda7c
- **Live Endpoints**:
  - Shorten a URL: `POST http://backend-assignment-t61b.onrender.com/api/shorten`
  - Redirect to Original URL: `GET  http://backend-assignment-t61b.onrender.com/<shortId>`
  - Fetch Stats: `GET  http://backend-assignment-t61b.onrender.com/api/stats/<shortId>`

---

## **Testing the API**
1. Import the following endpoints:
   - POST `/api/shorten`
   - GET `/:shortId`
   - GET `/api/stats/:shortId`
2. Use the sample requests provided in this documentation.

---

## **Optional Enhancements**
1. **Rate Limiting**:
   - Added using `express-rate-limit` to prevent abuse (100 requests/min per client).
2. **Scalability**:
   - MongoDB with efficient indexing on `shortId`.

