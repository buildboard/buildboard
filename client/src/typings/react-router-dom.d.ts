import {Redirect, withRouter} from 'react-router';
import * as React from 'react';

declare const Link: Link;
type Link = Link.Link;

declare namespace Link {
    interface LinkProps extends React.HTMLAttributes<Link> {
        activeStyle?: React.CSSProperties;
        activeClassName?: string;
        onlyActiveOnIndex?: boolean;
        to: {}; // Router.RoutePattern | Router.LocationDescriptor | ((...args: {}[]) => Router.LocationDescriptor);
    }

    interface Link extends React.ComponentClass<LinkProps> {}
    interface LinkElement extends React.ReactElement<LinkProps> {}
}
declare class BrowserRouter extends React.Component<{}, {}> {}
declare class Route extends React.Component<any, {}> {} // tslint:disable-line
export {
    Route,
    Redirect,
    withRouter,
    Link,
    BrowserRouter,
}
