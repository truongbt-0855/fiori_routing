sap.ui.define([
    "fiori/routing/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("fiori.routing.controller.employee.EmployeeList", {
        onListItemPressed(oEvent) {
            let oItem, oCtx;
            oItem = oEvent.getSource();
            oCtx = oItem.getBindingContext();

            this.getRouter().navTo("employee", {
                employeeId: oCtx.getProperty("EmployeeID")
            })
        }
    })
})