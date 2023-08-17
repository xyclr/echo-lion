import Subscribe from './lib/subscribe';
import {EventTypes} from "@echo-lion/types";

export default abstract class BaseClient {

    protected readonly taskQueue: Array<any>;

    constructor(options) {
        this.taskQueue = []
    }

    log(message, level = 'info') {
        console[level](message, level)
    }

    report(data) {
        this.taskQueue.push(data)
    }

    use(plugins) {
        const sb = new Subscribe()
        plugins.forEach((plugin) => {
            plugin.install.call(this, sb.notify.bind(sb, plugin.name));
            const cb = ( ...args: any[]) => {
                const pluginDatas = plugin.transform.apply(this, args);
                const datas = this.transform(pluginDatas);
                this.log(datas)
            }
            sb.watch(plugin.name, cb)
        })
    }


    abstract transform(d) : (data:any) => any;
}
