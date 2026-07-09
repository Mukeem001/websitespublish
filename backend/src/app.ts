import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import env from "./config/env";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import templateRoutes from "./routes/template.routes";
import websiteRoutes from "./routes/website.routes";
import publishRoutes from "./routes/publish.routes";
import pageRoutes from "./routes/page.routes";
import websiteServerRoutes from "./website-server/website.routes";
import superAdminRoutes from "./super-admin/super-admin.routes";
import domainRoutes from "./domain/domain.routes";
import Domain from "./domain/domain.model";
import Website from "./models/Website";


const app = express();

app.set("trust proxy", true);

/* ===========================
   Security
=========================== */

app.use(helmet());

app.use(
  cors({
    origin: env.allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

/* ===========================
   Middlewares
=========================== */

app.use(compression());

app.use(cookieParser());

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));


app.use(
  "/api/super-admin",
  superAdminRoutes
);

/* ===========================
   Rate Limit
=========================== */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

/* ===========================
   Health Check
=========================== */

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "BuildHub Backend Running 🚀",
    version: "1.0.0",
  });
});

/* ===========================
   API Routes
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/websites", websiteRoutes);
app.use("/api/publish", publishRoutes);
app.use("/api/pages", pageRoutes);
app.use("/sites", websiteServerRoutes);
app.use("/api/domain", domainRoutes); 

/* ===========================
   Custom domain routing
=========================== */

app.use(async (req, res, next) => {
  const path = req.path;

  if (
    path.startsWith("/api") ||
    path.startsWith("/sites") ||
    path.startsWith("/favicon")
  ) {
    return next();
  }

  const hostname = req.hostname?.toLowerCase();

  if (!hostname) {
    return next();
  }

  const domainRecord = await Domain.findOne({
    domain: hostname,
    verificationStatus: "verified",
  });

  if (!domainRecord) {
    return next();
  }

  const website = await Website.findById(
    domainRecord.websiteId
  );

  if (!website || !website.isPublished) {
    return next();
  }

  req.url = `/sites/${website.slug}${req.url}`;
  next();
});

/* ===========================
   404
=========================== */

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ===========================
   Global Error Handler
=========================== */

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    res.status(err.status || 500).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error",
      stack:
        env.nodeEnv === "development"
          ? err.stack
          : undefined,
    });
  }
);

export default app;