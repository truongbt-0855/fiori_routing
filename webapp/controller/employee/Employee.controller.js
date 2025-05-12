sap.ui.define(["fiori/routing/controller/BaseController"], (BaseController) => {
    "use strict";

    return BaseController.extend("fiori.routing.controller.employee.Employee", {
        onInit() {
            let oRouter = this.getRouter();
            oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);
            // Hint: we don't want to do it this way
            /*
            oRouter.attachRouteMatched(function (oEvent){
                var sRouteName, oArgs, oView;
                sRouteName = oEvent.getParameter("name");
                if (sRouteName === "employee"){
                    this._onRouteMatched(oEvent);
                }
            }, this);
            */
        },

        _onRouteMatched(oEvent) {
            let oArgs, oView;
            oArgs = oEvent.getParameter("arguments");
            oView = this.getView();

            oView.bindElement({
                path: `/Employees(${oArgs.employeeId})`,
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: (oEvent) => {
                        console.log("data request");

                        oView.setBusy(true);
                    },
                    dataReceived: (oEvent) => {
                        console.log("data receive");
                        oView.setBusy(false);
                    },
                },
            });
        },

        _onBindingChange(oEvent) {
            console.log(this.getView());

            // No data for the binding
            if (!this.getView().getBindingContext()) {
                this.getRouter().getTargets().display("notFound");
            }
        },

        onShowResume(oEvent) {
            let oCtx = this.getView().getElementBinding().getBoundContext();

            this.getRouter().navTo("employeeResume", {
                employeeId: oCtx.getProperty("EmployeeID"),
            });
        },
    });
});
