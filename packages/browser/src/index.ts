import Core from "@echo-lion/core"
import jsErrorPlugin from "./plugins/jsErrorPlugin"

class BrowerClient extends Core {
    constructor(options) {
        super({});
    }


    transform(d) {
        console.log('BrowerClient.transform')
        return d;
    }
}

const init = (options) => {
    const client = new BrowerClient(options)
    const {plugins = []} = options
    client.use([jsErrorPlugin, ...plugins])
    console.log('init', options)
}

export default init
