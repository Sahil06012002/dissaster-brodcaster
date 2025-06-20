import { Report } from "../../interfaces/reports.interface";

declare global {
  namespace Express {
    interface Request {
      report?: Report;
    }
  }
}
