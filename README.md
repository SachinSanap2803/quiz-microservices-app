# Microservices Quiz Application

A comprehensive microservices-based quiz application built with Spring Boot, Spring Cloud, and React. This project demonstrates modern distributed system architecture with service discovery, API gateway pattern, and a responsive frontend.

## 📋 Project Overview

This is a microservices architecture application that allows users to:
- Create and manage quizzes (Admin)
- Create and manage questions (Admin)
- Take quizzes (Users)
- View quiz scores and results (Users)
- Secure authentication and authorization

## 🏗️ Architecture

```
┌─────────────────┐
│  Quiz Frontend  │ (React 19)
│    (Port 3000)  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│      API Gateway                │ (Spring Cloud Gateway)
│      (Port 8080)                │ Eureka Client
└────────┬────────────────────────┘
         │
    ┌────┼────┬──────────┐
    │    │    │          │
    ▼    ▼    ▼          ▼
┌──────┐ ┌──────────┐ ┌───────────┐  ┌──────────────┐
│ Quiz │ │Question  │ │Service    │  │ Eureka       │
│Service│ │Service   │ │Registry   │  │Service       │
│      │ │          │ │(Discovery)│  │ (Port 8761)  │
└──────┘ └──────────┘ └───────────┘  └──────────────┘
```

## 📦 Services

### 1. **Service Registry** 
- **Type**: Eureka Discovery Server
- **Port**: 8761
- **Purpose**: Central service registry for all microservices
- **Registers**: API Gateway, Question Service, Quiz Service

### 2. **API Gateway**
- **Type**: Spring Cloud Gateway
- **Port**: 8080
- **Purpose**: Single entry point for all client requests
- **Features**:
  - Request routing to appropriate microservices
  - Load balancing
  - Security and authentication
- **Technology**: Spring Cloud Gateway, Eureka Client

### 3. **Question Service**
- **Type**: REST Microservice
- **Port**: 8082 (configurable)
- **Purpose**: Manage quiz questions
- **Features**:
  - CRUD operations for questions
  - Database persistence with JPA/Hibernate
  - Eureka service discovery
- **Technology**: Spring Boot 3.5.9, Spring Data JPA, Eureka Client, Java 21

### 4. **Quiz Service**
- **Type**: REST Microservice
- **Port**: 8083 (configurable)
- **Purpose**: Manage quizzes and quiz attempts
- **Features**:
  - CRUD operations for quizzes
  - Quiz submission and scoring
  - OpenFeign client for inter-service communication with Question Service
  - Database persistence with JPA/Hibernate
  - Eureka service discovery
- **Technology**: Spring Boot 3.5.9, Spring Data JPA, OpenFeign, Eureka Client, Java 21

### 5. **Quiz Frontend**
- **Type**: React Single Page Application
- **Port**: 3000
- **Purpose**: User interface for the quiz application
- **Features**:
  - Login and authentication
  - Admin dashboard (Create Quiz, Add Questions)
  - User quiz taking interface
  - Protected routes for authorized users
  - Real-time score display
- **Technology**: React 19, React Router 7, Axios, React Testing Library

## 🚀 Getting Started

### Prerequisites
- **Java**: JDK 21 or higher
- **Maven**: 3.8.9 or higher
- **Node.js**: 18 or higher
- **npm**: 9 or higher
- **Database**: MySQL/PostgreSQL (configure in application.properties)

### Installation & Setup

#### 1. Start Service Registry
```bash
cd service-registry/service-registry
mvn clean spring-boot:run
# Service Registry will be available at http://localhost:8761
```

#### 2. Start Question Service
```bash
cd question-service/question-service
mvn clean spring-boot:run
# Question Service will register with Eureka automatically
```

#### 3. Start Quiz Service
```bash
cd quiz-service/quiz-service
mvn clean spring-boot:run
# Quiz Service will register with Eureka automatically
```

#### 4. Start API Gateway
```bash
cd api-gateway/api-gateway
mvn clean spring-boot:run
# API Gateway will be available at http://localhost:8080
```

#### 5. Start Quiz Frontend
```bash
cd quiz-frontend
npm install
npm start
# Frontend will be available at http://localhost:3000
```

## 📁 Project Structure

```
Microserves/
├── service-registry/              # Eureka Service Discovery
│   └── service-registry/
│       ├── pom.xml
│       └── src/
├── api-gateway/                   # Spring Cloud Gateway
│   └── api-gateway/
│       ├── pom.xml
│       └── src/
├── question-service/              # Question Microservice
│   └── question-service/
│       ├── pom.xml
│       └── src/
├── quiz-service/                  # Quiz Microservice
│   └── quiz-service/
│       ├── pom.xml
│       └── src/
├── quiz-frontend/                 # React Frontend
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Navbar.js
│       │   ├── ProtectedRoute.js
│       │   ├── admin/
│       │   │   ├── AddQuestion.js
│       │   │   └── CreateQuiz.js
│       │   └── user/
│       │       ├── QuizList.js
│       │       ├── TakeQuiz.js
│       │       └── Score.js
│       ├── context/
│       │   └── AuthContext.js     # Auth state management
│       ├── services/
│       │   └── api.js             # Axios API configuration
│       └── App.js
└── README.md
```

## 🔌 API Endpoints

All endpoints are accessed through the API Gateway at `http://localhost:8080`

### Question Service Endpoints
- `GET /questions` - Get all questions
- `POST /questions` - Create a new question
- `GET /questions/{id}` - Get question by ID
- `PUT /questions/{id}` - Update a question
- `DELETE /questions/{id}` - Delete a question

### Quiz Service Endpoints
- `GET /quizzes` - Get all quizzes
- `POST /quizzes` - Create a new quiz
- `GET /quizzes/{id}` - Get quiz by ID
- `POST /quizzes/{id}/submit` - Submit quiz answers
- `GET /quizzes/{id}/score` - Get quiz score

## 🛡️ Security & Authentication

- Authentication managed through **AuthContext** in React
- Protected routes restrict access to authorized users
- Admin routes restricted to admin users only
- JWT/Session-based authentication (configurable)

## 🧪 Testing

### Backend Tests
```bash
# Run tests for individual services
cd <service-path>
mvn test
```

### Frontend Tests
```bash
cd quiz-frontend
npm test
```

## 🔧 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Backend Framework** | Spring Boot | 3.5.9 |
| **Cloud Framework** | Spring Cloud | 2025.0.1 |
| **Java Version** | Java | 21 |
| **Database ORM** | Spring Data JPA/Hibernate | 21.x |
| **Service Discovery** | Eureka | Spring Cloud Netflix |
| **API Gateway** | Spring Cloud Gateway | 2025.0.1 |
| **Frontend Framework** | React | 19.2.3 |
| **HTTP Client** | Axios | 1.13.2 |
| **Routing** | React Router | 7.11.0 |
| **Build Tool (Backend)** | Maven | 3.8.9+ |
| **Build Tool (Frontend)** | npm | 9.0+ |

## 📝 Configuration Files

### Backend Configuration
- `application.properties` in each service for:
  - Database connection
  - Server port
  - Eureka client settings
  - Service name

### Frontend Configuration
- `api.js` - Axios configuration for backend API calls
- `.env` (if used) - Environment variables

## 🚧 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes** in the respective service

3. **Test locally**
   - Ensure Service Registry is running
   - Start dependent services
   - Test through API Gateway

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add feature description"
   git push origin feature/your-feature
   ```

## 🐛 Troubleshooting

### Services not registering with Eureka
- Check if Eureka server is running on `http://localhost:8761`
- Verify `eureka.client.service-url.defaultZone` in `application.properties`

### Frontend cannot connect to API
- Ensure API Gateway is running on port 8080
- Check CORS configuration in API Gateway
- Verify backend services are registered in Eureka

### Database connection errors
- Verify database is running
- Check database credentials in `application.properties`
- Ensure database name matches configuration

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [React Documentation](https://react.dev)
- [Netflix Eureka](https://github.com/Netflix/eureka)

## 📄 License

This project is provided as-is for educational purposes.

## 👥 Contributors

- Telusko Team

---

**Last Updated**: April 2026
**Version**: 1.0.0
