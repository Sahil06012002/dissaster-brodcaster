import { Disaster } from "../../interfaces/disaster.interface";

declare global {
  namespace Express {
    interface Request {
      disaster?: Disaster;
    }
  }
}
