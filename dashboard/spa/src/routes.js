import React from "react";

const Main = React.lazy(() => import("./pages/LandingPage/index"));
const GetStarted = React.lazy(() => import("./pages/GetStarted/index"));
const PageError = React.lazy(() => import("./pages/Pages/Special/PageError"));
const Roadmap = React.lazy(() => import("./pages/Roadmap/Roadmap"));
const Contact = React.lazy(() => import("./pages/Pages/PageContactOne"));

const routes = [

    // Landings
    //Index Main
    {path: "/", component: Main},
    {path: "/get-started", component: GetStarted},
    {path: "/roadmap", component: Roadmap},
    {path: "/contact", component: Contact},

    //Index root

    // { path: "/", component: Root, isWithoutLayout: true, exact: true },
    {component: PageError, isWithoutLayout: true, exact: false},
];

export default routes;
