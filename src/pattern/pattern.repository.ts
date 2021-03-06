import { EntityRepository, Repository } from "typeorm";
import { Pattern } from "./pattern.entity";

@EntityRepository(Pattern)
export class PatternRepository extends Repository<Pattern> {}