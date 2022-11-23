import { Request, Response } from 'express';
import axios from 'axios';
import Emails from '../services/email';

class EmaillController {
  email(req: Request, res: Response) {
    return Emails.getData(req, res);
  }
}

export default new EmaillController();
