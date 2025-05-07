sap.ui.define([
    "fiori/routing/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("fiori.routing.controller.App", {
        onInit() {
            console.log('Oninit');
            
        }
    })
})