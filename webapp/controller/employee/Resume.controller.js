sap.ui.define(["fiori/routing/controller/BaseController"], function (BaseController) {
    "use strict";

    return BaseController.extend("fiori.routing.controller.employee.Resume", {
        onInit() {
            let oRouter = this.getRouter();
            oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
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
                        oView.setBusy(true);
                    },
                    dataReceived: (oEvent) => {
                        oView.setBusy(false);
                    },
                },
            });
        },

        _onBindingChange(oEvent) {
            // No data for the binding
            if (!this.getView().getBindingContext()) {
                this.getRouter().getTargets().display("notFound");
            }
        },
    });
});
