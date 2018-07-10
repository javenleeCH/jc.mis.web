import * as React from 'react';
export interface FunnelProps {
  height?:number; 
  padding?: [number, number, number, number];
  data?:Array<{
    step:number;
    subject:string|string;
    total:number;
    linkRate:number;
    integralRate:number;
  }>;
}

export default class Funnel extends React.Component<FunnelProps, any> {}
