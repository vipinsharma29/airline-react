NOTE --
	- redux thunk is implemented in the code please ref ScreenShot-folder for refrence.
	- add passenger component is added in admin section.
	- pwa was not mentioned ion the problem statement, So not implemented.
	- eslint config is added in the project.
	- production code is attached in build/ folder.
	- these are all the routes created in the projectrouting - {
			<Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <SecuredRoute path="/staffPage" component={StaffPage}></SecuredRoute>
            <SecuredRoute path="/detail-seat-map" component={DetailedSeatMap}></SecuredRoute>
            <SecuredRoute path="/speacial-meals-seat-map" component={SpecialMealSeatMap}></SecuredRoute>
            <SecuredRoute path="/check-in-out-window" component={CheckInOutWindowPage}></SecuredRoute>
            <SecuredRoute path="/adminPage" component={AdminPage}></SecuredRoute>
            <SecuredRoute path="/admin/anchillary/:flightno" component={AnchillaryPage}></SecuredRoute>
            <SecuredRoute path="/admin/shopping-items/:flightno" component={ShoppingItems}></SecuredRoute>
            <SecuredRoute path="/admin/meals/:flightno" component={ManageMeals}></SecuredRoute>
	}
	- routhGuard is also added in the project.


to run appliation in developement mode
	- npm run serve

to run appliation in production mode
	- npm run deploy

to run json-server.
	- json-server --watch mock-data/db.json -p 3002

light house report in root folder
	react-airlines-lighthouse-report.html

for social login tried to modules react-social-login, reactjs-social-login but had problem with http, and install package not available.