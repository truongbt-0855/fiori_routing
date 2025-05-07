sap.ui.define([
    "sap/ui/core/UIComponent"
], (UIComponent) => {
    "use strict";

    return UIComponent.extend("fiori.routing.Component", {
        metadata: {
            manifest: "json"
        },
        init() {
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();
        }
    })
})