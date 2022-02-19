import { EntityRepository, Repository } from "typeorm";
import { Figure } from "./figure.entity";

@EntityRepository(Figure)
export class FigureRepository extends Repository<Figure> {}