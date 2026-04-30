import { useStore } from '@/hooks/useStore';
import App from './app/index';
import { bridgeStore, bridgeWS } from './store-bridge';
import './dtrader.scss';

const DTrader = () => {
    const profithub_store = useStore();
    const bridged_store = bridgeStore(profithub_store);

    return (
        <div className='dtrader-container'>
            <App passthrough={{ root_store: bridged_store, WS: bridgeWS({}) }} />
        </div>
    );
};

export default DTrader;
