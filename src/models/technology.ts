import { TechnologyName, TechnologyType } from '../definition';

export abstract class Technology {
    protected name: TechnologyName;
    protected type: TechnologyType;

    constructor(name: TechnologyName, type: TechnologyType) {
        this.name = name;
        this.type = type;
    }
}