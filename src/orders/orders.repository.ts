import { EntityRepository, Repository } from "typeorm";
import { Orders } from "./order.entity";

@EntityRepository(Orders)
export class OrdersRepsoitory extends Repository<Orders> {}