import cors from "cors";

const corsMiddleware = cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: false
});

export default corsMiddleware;

