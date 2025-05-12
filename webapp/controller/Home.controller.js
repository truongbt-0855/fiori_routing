sap.ui.define(['fiori/routing/controller/BaseController'], function (BaseController) {
    'use strict';

    return BaseController.extend('fiori.routing.controller.Home', {
        onDisplayNotFound() {
            // display the "notFound" target without changing the hash
            this.getRouter().getTargets().display('notFound', {
                fromTarget: 'home',
            });
        },

        onNavToEmployees() {
            this.getRouter().navTo('employeeList');
        },
        onNavToEmployeeOverview() {
            this.getRouter().navTo('employeeOverview');
        },
    });
});
