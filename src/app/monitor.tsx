'use client';
import React, { useEffect } from 'react';
import MonitorSdk from './../../fe-monitor-sdk/lib/index.esm';

const MonitorComponent = () => {
  useEffect(() => {
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
  }, []);

  return null;
};

export default MonitorComponent;




