import { ArgumentsHost, Catch, ExceptionFilter, HttpException, MethodNotAllowedException, NotFoundException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const message = exception.message;

    // Agar xato "Cannot [METHOD] /path" ko'rinishida bo'lsa, demak noto'g'ri method
    if (message.startsWith("Cannot ")) {
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send({
        success: false,
        message: "Method Not Allowed",
      });
      return;
    }

    // Aks holda, 404 qaytarish
    response.status(HttpStatus.NOT_FOUND).send({
      success: false,
      message: "Route Not Found",
    });
  }
}
