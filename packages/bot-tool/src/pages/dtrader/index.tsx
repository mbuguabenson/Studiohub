import { useStore } from '@/hooks/useStore';
import App from './app/index';
import { bridgeStore, bridgeWS } from './store-bridge';
import './dtrader.scss';

class DTraderErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', color: 'red', background: '#fff' }}>
                    <h2>DTrader Native Crash</h2>
                    <pre>{this.state.error?.toString()}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

const DTrader = () => {
    console.log('[DTrader] Native component mounting...');
    const profithub_store = useStore();
    console.log('[DTrader] RootStore acquired:', !!profithub_store);
    const bridged_store = bridgeStore(profithub_store);
    console.log('[DTrader] Store bridged successfully');

    return (
        <DTraderErrorBoundary>
            <div className='dtrader-container'>
                <App passthrough={{ root_store: bridged_store, WS: bridgeWS({}) }} />
            </div>
        </DTraderErrorBoundary>
    );
};

export default DTrader;
