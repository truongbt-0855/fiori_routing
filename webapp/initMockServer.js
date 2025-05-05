sap.ui.define([
    "fiori/routing/localService/mockserver",
    "sap/m/MessageBox"
], (mockserver, MessageBox) => {
    "use strict";

    // initialize the mock server
    mockserver
        .init()
        .catch(oError => {
            MessageBox.error(oError.message);
        }).finally(() => {
            // initialize the embedded componenet on the HTML page
            sap.ui.require(["sap/ui/core/ComponentSupport"]);
        });
});