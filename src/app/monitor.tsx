'use client';
import { useEffect } from 'react';

const MonitorComponent = () => {
    useEffect(() => {
        import('./../../fe-monitor-sdk/lib/index.esm').then(({ default: MonitorSdk }) => {
            const monitorSdk = MonitorSdk({
                pid: '1000',
                reportUrl: 'http://127.0.0.1:9001/report',
                debug: false,
                jsErrorLog: true,
                promiseErrorLog: true,
                resourcesErrorLog: true,
                exposureLog: true,
                automaticBurialPointLog: true,
                pageDwellTimeLog: true,
                pvLog: true,
                xhrLog: true,
                resourcesPerfLog: true,
                perfLog: true,
            });

            monitorSdk.report({
                type: 'custom',
                userName: 'angus',
            });
        });
    }, []);

    return null;
};

export default MonitorComponent;




