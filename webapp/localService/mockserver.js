sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/Log"
], (MockServer, JSONModel, Log) => {
    "use strict";

    let _sAppPath = "fiori/routing/",
        _sJsonFilesPath = _sAppPath + "localService/mockdata";

    return {
        init() {
            return new Promise((fnResolve, fnReject) => {
                let sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                    oManifestModel = new JSONModel(sManifestUrl);

                oManifestModel.attachRequestCompleted(() => {
                    let sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath),
                        oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/employeeRemote"),
                        sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUrl);

                    // create
                    let oMockServer = new MockServer({
                        rootUri: oMainDataSource.uri
                    });

                    // configure
                    MockServer.config({
                        autoRespond: true,
                        autoRespondAfter: 500
                    });

                    // // simulate
                    // oMockServer.simulate((sMetadataUrl, {
                    //     sMockdataBaseUrl: sJsonFilesUrl
                    // }));

                    // start
                    oMockServer.start();

                    Log.info("Running the app with mock data");
                    fnResolve();
                });

                oManifestModel.attachRequestFailed(() => {
                    let sError = "Failed to load application manifest";

                    Log.error(sError);
                    fnReject(new Error(sError));
                })
            })
        }
    }
})