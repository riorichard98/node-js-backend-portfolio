import * as express from 'express'; // Ensures the file is treated as a module

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Add your custom property here
    }
  }
}
