const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Import Routes
const heartRateAggregationRoutes = require("./routes/heartRateAggregationRoutes");
const realtimeHeartRateRoutes = require("./routes/realtimeHeartRateRoutes");
const heartIssueRoutes = require("./routes/heartIssueRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const medicationScheduleRoutes = require("./routes/medicationScheduleRoutes");
const authRoutes = require("./routes/authRoutes"); // <-- 1. Import Auth Route
const periodicCheckRoutes = require("./routes/periodicCheckRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Konfigurasi Swagger Options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Health API",
      version: "1.0.0",
      description: "Dokumentasi API untuk Smart Health Database",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount Routes
app.use("/api/auth", authRoutes); // <-- 2. Mount Auth Route
app.use("/api/hr", realtimeHeartRateRoutes);
app.use("/api/hr-aggregation", heartRateAggregationRoutes);
app.use("/api/hr-issues", heartIssueRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/medication-schedules", medicationScheduleRoutes);
app.use("/api/periodic", periodicCheckRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
});