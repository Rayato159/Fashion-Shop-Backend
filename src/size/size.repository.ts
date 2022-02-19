import { EntityRepository, Repository } from "typeorm";
import { Size } from "./size.entity";

@EntityRepository(Size)
export class SizeRepository extends Repository<Size> {}