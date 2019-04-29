import { Framework } from '../../models/framework';

export class LoopbackFramework extends Framework {

    constructor() {
        super('loopback', 'framework', 3000);
    }
}
