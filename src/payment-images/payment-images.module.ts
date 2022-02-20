import { Module } from '@nestjs/common';
import { PaymentImagesService } from './payment-images.service';
import { PaymentImagesController } from './payment-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentImagesRepository } from './payment-images.reposity';
import { PaymentsModule } from 'src/payments/payments.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Module({
  imports: [
    PaymentsModule,
    TypeOrmModule.forFeature([
      PaymentImagesRepository,
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
              cb(null, true);
            } else {
              cb(null, false);
            }
          },
          storage: diskStorage({
            destination: configService.get('IMAEGS_PATH'),
            filename: (req, file, cb) => {
              const filename: string = `${uuidv4()}`
              const extension: string = path.parse(file.originalname).ext

              cb(null, `${filename}${extension}`)
            }
          })
        }
      }
    })
  ],
  providers: [PaymentImagesService],
  controllers: [PaymentImagesController],
  exports: [PaymentImagesService]
})
export class PaymentImagesModule {}
