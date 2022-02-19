import { EntityRepository, Repository } from "typeorm";
import { PlainColor } from "./plain-color.entity";

@EntityRepository(PlainColor)
export class PlainColorRepository extends Repository<PlainColor> {}