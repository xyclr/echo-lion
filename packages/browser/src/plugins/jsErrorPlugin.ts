import { ConsoleTypes, EventTypes } from '@echo-lion/types';

const jsErrorPlugin = {
    name: 'jsErrorPlugin',
    install(notify) {
        window.addEventListener(
            'error',
            (e: Event) => {
                e.preventDefault();
                this.log(e, ConsoleTypes.ERROR);
                notify({
                    category: EventTypes.ERROR,
                    data: e
                });
            },
            true
        );
    },
    transform(collectedData) {
        console.log('collectedData.transform')
        return collectedData;
    }
}

export default jsErrorPlugin;
