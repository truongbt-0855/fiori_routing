sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], (Controller, History, UIComponent) => {
    "use strict";

    return Controller.extend("fiori.routing.controller.BaseController", {
        getRouter() {
            return UIComponent.getRouterFor(this);
        },

        onNavBack() {
            let oHistory, sPreviousHash;

            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("appHome", {}, true);
            }
        }
    })
})