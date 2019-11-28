
import React from 'react';
import NavBar from './navbar';
import WebpageTemplate from './WebpageTemplate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function Home() {
	return (
		<BrowserRouter>
			<div className="App">
				<Route path="/" component={NavBar} />
				<Switch>
                    <Route 
                        path="/" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"mainPage"}
                            />
                        )} 
                    />
                    <Route 
                        path="/automobilesGeneral" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"automobilesGeneral"}
                            />
                        )} 
                    />
                    <Route 
                        path="/historicalAutomobiles" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"historicalAutomobiles"}
                            />
                        )} 
                    />
                    <Route 
                        path="/electricAutomobiles" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"electricAutomobiles"}
                            />
                        )} 
                    />
                    <Route 
                        path="/internalCombustion" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"internalCombustion"}
                            />
                        )} 
                    />
                    <Route 
                        path="/firstAffordableCar" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"firstAffordableCar"}
                            />
                        )} 
                    />
                    <Route 
                        path="/bugattiType35" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"bugattiType35"}
                            />
                        )} 
                    />
                    <Route 
                        path="/volkswagenBeetle" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"volkswagenBeetle"}
                            />
                        )} 
                    />
                    <Route 
                        path="/mini" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"mini"}
                            />
                        )} 
                    />
                    <Route 
                        path="/bugattiChiron" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"bugattiChiron"}
                            />
                        )} 
                    />
                    <Route 
                        path="/teslaModel3" 
                        exact 
                        render={() => (
                            <WebpageTemplate name={"teslaModel3"}
                            />
                        )} 
                    />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default Home;