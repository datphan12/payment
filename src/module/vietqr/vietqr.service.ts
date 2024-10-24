import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import TransactionCallback from './model/transaction-callback';
import SuccessResponse from './response/success.response';
import TransactionResponseObject from './response/transaction.response';
import ErrorResponse from './response/error.response';

@Injectable()
export default class VietQRService {
  private readonly VALID_USERNAME = 'customer-mina-user24157';
  private readonly VALID_PASSWORD = 'Y3VzdG9tZXItbWluYS11c2VyMjQxNTc=';
  private readonly SECRET_KEY = 'asnkjsnckjsnkcjnkanxkajnckjn';
  private readonly BEARER_PREFIX = 'Bearer ';

  generateToken(authorizationHeader: string): {
    access_token: string;
    token_type: string;
    expires_in: number;
  } {
    if (!authorizationHeader || !authorizationHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid',
      );
    }

    const base64Credentials = authorizationHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8',
    );
    const [username, password] = credentials.split(':');

    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      const token = jwt.sign({ username }, this.SECRET_KEY, {
        algorithm: 'HS512',
        expiresIn: '5m',
      });

      return {
        access_token: token,
        token_type: 'Bearer',
        expires_in: 300,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  transactionSync(authHeader: string, body) {
    if (!authHeader || !authHeader.startsWith(this.BEARER_PREFIX)) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid',
      );
    }

    const token = authHeader.substring(this.BEARER_PREFIX.length).trim();

    if (!this.validateToken(token)) {
      return new ErrorResponse(
        true,
        'INVALID_TOKEN',
        'Invalid or expired token',
        null,
      );
    }

    const transactionCallback = new TransactionCallback(
      body.transactionid,
      body.transactiontime,
      body.referencenumber,
      body.amount,
      body.content,
      body.bankaccount,
      body.orderId,
      body.sign,
      body.terminalCode,
      body.urlLink,
      body.serviceCode,
      body.subTerminalCode,
    );

    try {
      // Ví dụ xử lý nghiệp vụ và sinh mã reftransactionid
      const refTransactionId = 'myreftransactionid'; // Tạo ID của giao dịch

      // Trả về response 200 OK với thông tin giao dịch
      return new SuccessResponse(
        false,
        null,
        'Transaction processed successfully',
        new TransactionResponseObject(refTransactionId),
      );
    } catch (error) {
      // Trả về lỗi trong trường hợp có exception
      return new ErrorResponse(true, 'TRANSACTION_FAILED', error.message, null);
    }
  }

  // Phương thức để xác thực token JWT
  validateToken = (token) => {
    try {
      const decoded = jwt.verify(token, this.SECRET_KEY);
      return true;
    } catch (error) {
      return false;
    }
  };
}
