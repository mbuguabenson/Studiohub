import { TCoreStores } from '@deriv/stores/types';
import RootStore from '@/stores/root-store';

/**
 * Bridges the Profithub RootStore to the TCoreStores interface expected by DTrader.
 * This satisfies TypeScript and prevents runtime crashes for missing sub-stores.
 */
export const bridgeStore = (profithubStore: RootStore): TCoreStores => {
    return {
        ...profithubStore,
        portfolio: {
            ...profithubStore.client,
            positions: [],
            all_positions: [],
        },
        contract_trade: {},
        modules: {},
        notifications: {
            notifications: [],
        },
        gtm: {},
        chart_barrier_store: {},
        active_symbols: {},
        contract_replay: {},
        // Map our existing stores to the core names if they differ
        client: profithubStore.client,
        common: profithubStore.common,
        ui: profithubStore.ui,
    } as unknown as TCoreStores;
};

/**
 * Bridges the WebSocket interface.
 */
export const bridgeWS = (ws: any) => {
    return {
        ...ws,
        authorized: () => Promise.resolve(),
        storage: {
            get: () => null,
            set: () => null,
        },
        contractUpdate: () => {},
        subscribeTicksHistory: () => {},
    };
};
