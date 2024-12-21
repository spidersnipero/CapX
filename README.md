## Stock Portfolio Management Backend

This is a backend service for managing stock investments. The backend is built with Spring Boot and PostgreSQL, and it integrates with Finnhub API for real-time stock updates.

### Live Demo --

As the backend is deployed on AWS EC2 with self-signed SSL certificate.
first you need to copy paste the link in the browser and accept the risk and continue.

https://13.200.246.131:8443/ -> advanced -> proceed to

later you can access the frontend at

https://cap-x-theta.vercel.app/

### Features

1. CRUD operations for stock investments.
2. Real-time stock data updates.
3. Stocks in dashboard is sorted by profits.
4. Light and dark mode.
5. SSL configuration for secure communication.
6. Backend deployment on AWS EC2.

### Tech Stack

1. Frontend: React with vite,Tailwind CSS.
2. Backend: Spring Boot.
3. Database: PostgreSQL.
4. API Integration: Finnhub API for real-time stock data.
5. Deployment: AWS EC2,Vercel.
6. SSL: Keytool for SSL configuration.

### Prerequisites

1. Java 17 (or newer)
2. Maven (for building the Spring Boot project)
3. PostgreSQL (for database setup)
4. AWS EC2 (for deployment)

### Set up your development environment

### Database Setup

1. Database was free tier on render.com
2. Create project and database
3. Add the database url in the application.properties file in the backend project

#### Running the Backend ec2 instance

1. Launch an EC2 instance (Ubuntu) and SSH into it.
2. Install Java, Maven, and PostgreSQL.
3. Clone the repository:
   git clone https://github.com/spidersnipero/CapX.git
4. generate keytool :
   keytool -genkeypair -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore mykeystore.p12 -validity 3650
   and enter details
5. copy key to resources folder :
   cp mykeystore.p12 CapX/backend/src/main/resources
6. run the backend even after closing the terminal:
   1. sudo apt install tmux
   2. tmux new -s capx-session
   3. mvn spring-boot:run
   4. Detach from the `tmux` session by pressing `Ctrl + B`, then releasing both keys and pressing `D`.
   5. To reattach to the session later:tmux attach -t capx-session
   6. exit from the session: exit
7. Access the backend at https://ec2ipaddress:8433/api/investement.

#### Running the Frontend

1. update the DB_URL in the frontend/src/Components/Investment.js file with https://ec2publicIPV4:8433/api/investement
2. run the frontend:
   1. npm install
   2. npm run dev
3. Access the frontend at http://localhost:5173/

### Limitaion of the project

1. We are using free tier of finnhub api which has a limit of 60 requests per minute.So, if the limit is reached the stock data will not be updated.
2. We can only add stocks that are available in the finnhub api.

### API Endpoints

This service provides the following API endpoints:

#### Create a New Investment

- **URL:** `/api/investments`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
      "id": {
          "userId": Long,
          "stockSymbol": String
      },
      "boughtPrice": Double,
      "quantity": Integer
  }
  ```
- **Responses:**
  - `201 Created`: Returns the created investment.
  - `400 Bad Request`: If the investment already exists or there is an error creating the investment.

#### Get All Investments by a User

- **URL:** `/api/investments/user/{userId}`
- **Method:** `GET`
- **Responses:**
  - `200 OK`: Returns a list of investments for the specified user.

#### Get a Specific Investment by User ID and Stock Symbol

- **URL:** `/api/investments/{userId}/{stockSymbol}`
- **Method:** `GET`
- **Responses:**
  - `200 OK`: Returns the specified investment.
  - `404 Not Found`: If the investment is not found.

#### Update an Investment

- **URL:** `/api/investments/{userId}/{stockSymbol}`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
      "boughtPrice": Double,
      "quantity": Integer
  }
  ```
- **Responses:**
  - `200 OK`: Returns the updated investment.
  - `404 Not Found`: If the investment is not found.
  - `400 Bad Request`: If there is an error updating the investment.

#### Delete an Investment

- **URL:** `/api/investments/{userId}/{stockSymbol}`
- **Method:** `DELETE`
- **Responses:**
  - `204 No Content`: If the investment is successfully deleted.
  - `404 Not Found`: If the investment is not found.
  - `500 Internal Server Error`: If there is an error deleting the investment.
