import { EntityRepository, Repository } from "typeorm";
import { Gender } from "./gender.entity";

@EntityRepository(Gender)
export class GenderRepository extends Repository<Gender> {}