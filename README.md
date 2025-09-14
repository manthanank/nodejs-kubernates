# Node.js Kubernetes Product API

A RESTful API for managing products built with Node.js, Express, MongoDB, and deployed on Kubernetes. This project demonstrates containerization, orchestration, and cloud deployment practices.

## 🚀 Features

- **Product Management**: Full CRUD operations for products
- **RESTful API**: Clean REST endpoints with proper HTTP methods
- **Data Validation**: Request validation using express-validator
- **Error Handling**: Centralized error handling middleware
- **Security**: Helmet for security headers, CORS enabled
- **Logging**: Morgan for HTTP request logging
- **Database**: MongoDB with Mongoose ODM
- **Containerization**: Docker support for easy deployment
- **Orchestration**: Kubernetes manifests for production deployment
- **Auto-scaling**: Horizontal Pod Autoscaler (HPA) configuration
- **Load Balancing**: Ingress controller for external access

## 📋 Prerequisites

- Node.js 18+
- MongoDB
- Docker
- Kubernetes cluster (for production deployment)
- kubectl (for Kubernetes management)

## 🛠️ Installation

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nodejs-kubernates
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/product-api
   ```

4. **Start MongoDB**

   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:6
   
   # Or using local MongoDB installation
   mongod
   ```

5. **Run the application**

   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

### Using Docker Compose

1. **Create environment file**

   ```bash
   cp .env.example .env
   ```

2. **Start services**

   ```bash
   docker-compose up -d
   ```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Products

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products (with pagination) | - |
| GET | `/api/products/:id` | Get product by ID | - |
| POST | `/api/products` | Create new product | `{ name, description?, price, inStock? }` |
| PUT | `/api/products/:id` | Update product | `{ name?, description?, price?, inStock? }` |
| DELETE | `/api/products/:id` | Delete product | - |

### Example Requests

#### Create Product

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "inStock": true
  }'
```

#### Get All Products

```bash
curl http://localhost:5000/api/products
```

#### Update Product

```bash
curl -X PUT http://localhost:5000/api/products/60f7b3b3b3b3b3b3b3b3b3b3 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 899.99,
    "inStock": false
  }'
```

## 🐳 Docker

### Build Image

```bash
docker build -t nodejs-kubernates .
```

### Run Container

```bash
docker run -p 5000:5000 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/product-api \
  nodejs-kubernates
```

## ☸️ Kubernetes Deployment

### Prerequisites

- Kubernetes cluster running
- kubectl configured
- Docker image pushed to container registry

### Deploy to Kubernetes

1. **Update deployment image**

   Edit `k8s/deployment.yaml` and replace the image URL with your container registry:

   ```yaml
   image: <YOUR_REGISTRY>/nodejs-kubernates:latest
   ```

2. **Create secrets**

   ```bash
   kubectl create secret generic app-secrets \
     --from-literal=MONGO_URI=mongodb://your-mongo-connection-string
   ```

3. **Deploy application**

   ```bash
   # Deploy all resources
   kubectl apply -f k8s/
   
   # Or deploy individually
   kubectl apply -f k8s/secret.yaml
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   kubectl apply -f k8s/ingress.yaml
   kubectl apply -f k8s/hpa.yaml
   ```

4. **Check deployment status**

   ```bash
   kubectl get pods
   kubectl get services
   kubectl get ingress
   ```

### Access the Application

After deployment, the application will be accessible through the ingress controller. Check the ingress configuration for the external URL.

## 📊 Monitoring and Scaling

### Horizontal Pod Autoscaler

The HPA configuration automatically scales the application based on CPU usage:

- Min replicas: 2
- Max replicas: 10
- Target CPU: 70%

### Health Checks

The application includes basic health monitoring through Kubernetes liveness and readiness probes.

## 🏗️ Project Structure

```tree
nodejs-kubernates/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/           # Route controllers
│   ├── middlewares/
│   │   ├── errorHandler.js    # Error handling middleware
│   │   └── validateRequest.js # Request validation
│   ├── models/
│   │   └── product.model.js   # Product data model
│   ├── routes/
│   │   └── product.routes.js  # Product routes
│   └── server.js              # Application entry point
├── k8s/                       # Kubernetes manifests
│   ├── deployment.yaml        # Application deployment
│   ├── service.yaml          # Service definition
│   ├── ingress.yaml          # Ingress configuration
│   ├── secret.yaml           # Secrets template
│   └── hpa.yaml              # Horizontal Pod Autoscaler
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Local development setup
└── package.json             # Node.js dependencies
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | Required |

### Kubernetes Configuration

- **Replicas**: 2 (configurable via HPA)
- **Resources**: CPU and memory limits defined
- **Health Checks**: Liveness and readiness probes
- **Security**: Non-root user, read-only filesystem

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Test API endpoints
curl http://localhost:5000/api/products
```

## 🚀 Production Considerations

1. **Database**: Use managed MongoDB service (MongoDB Atlas, AWS DocumentDB)
2. **Monitoring**: Implement proper logging and monitoring (Prometheus, Grafana)
3. **Security**: Use proper secrets management, network policies
4. **CI/CD**: Set up automated deployment pipeline
5. **Backup**: Implement database backup strategies

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.
