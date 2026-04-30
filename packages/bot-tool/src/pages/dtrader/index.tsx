import React from 'react';
import './dtrader.scss';

const DTrader = () => {
    return (
        <div className='dtrader-container'>
            <iframe
                src="/dtrader"
                title="DTrader"
                className='dtrader-iframe'
                allow="camera;microphone;clipboard-read;clipboard-write;display-capture;fullscreen"
            />
        </div>
    );
};

export default DTrader;
