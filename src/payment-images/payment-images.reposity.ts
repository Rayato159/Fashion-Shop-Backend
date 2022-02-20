import { EntityRepository, Repository } from "typeorm";
import { PaymentImages } from "./payment-images.entity";

@EntityRepository(PaymentImages)
export class PaymentImagesRepository extends Repository<PaymentImages> {}