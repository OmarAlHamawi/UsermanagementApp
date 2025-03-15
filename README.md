# User Management System

A **Spring Boot** application that provides user management functionality with **JWT authentication, role-based access control (RBAC), and PostgreSQL** as the database. The system allows **user registration, authentication, and CRUD operations** on user data.

## Features

* User Registration & Login (JWT Authentication)  
* Role-Based Access Control (Admin/User)  
* CRUD Operations on Users  
* Pagination Support  
* Secure API Endpoints with Spring Security  
* PostgreSQL for Production, H2 for Testing  
* Swagger API Documentation  
* Docker Support  
* React TypeScript Frontend  

## Tech Stack

- **Backend:** Java 17, Spring Boot 3, Spring Security, JWT, PostgreSQL, H2  
- **Frontend:** React + TypeScript, Vite  
- **Tools & Libraries:** Lombok, MapStruct, Swagger, Docker, and more  

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/OmarAlHamawi/user-management-system.git
cd user-management-system
```

### 2. Configure the Backend Database  
Edit the `application.properties` file:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/userdb
spring.datasource.username=your_user
spring.datasource.password=your_password
```

### 3. Build & Run the Backend
#### Using Maven
```sh
cd user-management-system
mvn clean install
mvn spring-boot:run
```
#### Using IntelliJ IDEA
1. Open **UserManagementSystemApplication** in IntelliJ.  
2. Select **Run** to start the backend application.

#### Using Docker
```sh
docker build -t user-management .
docker run -p 8090:8090 user-management
```

### 4. Setup & Run the Frontend
#### Install Dependencies
```sh
cd users-managment-app
npm install
```
#### Start the React App
```sh
npm run dev
```
The frontend will be available at **[http://localhost:5173](http://localhost:5173)**.

## Authentication & Roles

### 1. Default User Roles
- **ADMIN** → Can perform all operations  
- **USER** → Can view and update profiles  

### 2. Signup API (JWT)
- Endpoint: `POST /api/auth/signup`
- Request Body:
  ```json
  {
    "firstName": "Omar",
    "lastName": "Al-Hamawi",
    "birthDate": "2003-08-18",
    "mobile": "+962799875468",
    "email": "omar9hama9@gmail.com",
    "username": "Omar_Al_Hamawi",
    "password": "Password@123",
    "role": "admin",
    "country": "Jordan"
  }
  ```

### 3. Login API (JWT)
- Endpoint: `POST /api/auth/login`
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
  ```
Use this **token** in the Authorization header for authenticated requests:
```
Authorization: Bearer <TOKEN>
```

## API Documentation


### Swagger Screenshots  
_Add screenshots here to explain the API endpoints in detail._  
![image](https://github.com/user-attachments/assets/0f7658da-342a-4a2a-a606-d6c609a692a6)  

#### **API Endpoints Overview**
The system provides RESTful APIs for managing users, authentication, and role-based access control.

#### **1. Authentication APIs (JWT)**
- **`POST /api/auth/signup`** – Registers a new user.  
- **`POST /api/auth/login`** – Authenticates a user and returns a JWT token.

#### **2. User Management APIs**
- **`GET /users`** – Retrieves a paginated list of all users. (**Admin Only**)  
- **`GET /users/{id}`** – Retrieves user details by ID. (**Admin & User**)  
- **`PUT /users/{id}`** – Updates a user’s profile. (**Admin & User**)  
- **`DELETE /users/{id}`** – Deletes a user from the system. (**Admin Only**)  

#### **3. Search & Filtering APIs**
- **`GET /users/searchAndFilter`** – Search and filter users by criteria (e.g., name, role, country).  
- **`GET /users/countries`** – Retrieves a list of supported countries.  

#### **4. API Documentation**
- **Swagger UI:** [http://localhost:8090/swagger-ui/index.html](http://localhost:8090/swagger-ui/index.html)  
- **OpenAPI Docs:** [http://localhost:8090/v3/api-docs](http://localhost:8090/v3/api-docs)  

## Frontend Pages

### Login Page
Users can log in using their email and password. JWT is stored in local storage.

### Signup Page
New users can register, and the backend will assign them a USER role by default.

### Dashboard (Protected Route)
- **Admin:** Can manage users (create, update, delete).
- **User:** Can view and update their profile.

## Running Tests

```sh
mvn test
```

- Uses **JUnit** for unit testing  
- Uses **H2 in-memory database** for test cases  

## Contributing

1. Fork the repository  
2. Create a new branch (`feature-branch`)  
3. Commit your changes (`git commit -m "Add new feature"`)  
4. Push to the branch (`git push origin feature-branch`)  
5. Create a pull request  

## License

This project is licensed under the **MIT License**.
