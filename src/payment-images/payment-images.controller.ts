import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Param, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreatePaymentImageDto } from './dto/create-payment-image.dto';
import { PaymentImages } from './payment-images.entity';
import { PaymentImagesService } from './payment-images.service';

@Controller('payment-images')
export class PaymentImagesController {
    constructor(private paymentImagesService: PaymentImagesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('upload/:payment_id')
    @UseInterceptors(FileInterceptor('image'))
    uploadPaymentImage(
        @UploadedFile() file: Express.Multer.File,
        @Param('payment_id') payment_id: string
    ): Promise<PaymentImages> {
        return this.paymentImagesService.uploadPaymentImage(file, payment_id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('url/:payment_id')
    setUrlPaymentImage(
        @Param('payment_id') payment_id: string,
        @Body() createPaymentImageDto: CreatePaymentImageDto,
    ): Promise<PaymentImages> {
        return this.paymentImagesService.setUrlPaymentImage(createPaymentImageDto, payment_id)
    }
}
