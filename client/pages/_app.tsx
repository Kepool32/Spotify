
import '../style/global.scss'

import {wrapper} from '../store';
import {AppProps} from 'next/app';
import React from "react";

class MyApp extends React.Component<AppProps> {
    props: { Component: any; pageProps: any; };
    render() {
        const {Component, pageProps} = this.props;
        return <Component {...pageProps} />;
    }
}

export default wrapper.withRedux(MyApp);