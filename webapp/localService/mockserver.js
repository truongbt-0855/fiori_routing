sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/Log"
], (MockServer, JSONModel, Log) => {
    "use strict";

    // Configuration constants
    const BASE_PATH = "fiori/routing/"
    const CONFIG = {
        appPath: `${BASE_PATH}`,
        jsonFilesPath: `${BASE_PATH}localService/mockdata`,
    }

    async function loadManifest(appPath) {
        const manifestUrl = sap.ui.require.toUrl(`${appPath}manifest.json`),
            manifestModel = new JSONModel(manifestUrl);

        return new Promise((resolve, reject) => {
            manifestModel.attachRequestCompleted(() => resolve(manifestModel.getData()));
            manifestModel.attachRequestFailed(() => reject(new Error("Failed to load application manifest")));
        })
    }

    async function setupMockServer(dataSource, appPath, jsonFilesPath) {
        const mockServer = new MockServer({ rootUri: dataSource.uri });

        // configure
        MockServer.config({
            autoRespond: true,
            autoRespondAfter: 500
        });

        const metadataUrl = sap.ui.require.toUrl(`${appPath}${dataSource.settings.localUri}`);
        const jsonFilesUrl = sap.ui.require.toUrl(jsonFilesPath);

        mockServer.simulate(metadataUrl, { sMockdataBaseUrl: jsonFilesUrl });
        mockServer.start();
    }

    return {
        async init() {
            try {
                const manifestData = await loadManifest(CONFIG.appPath);
                const dataSource = manifestData['sap.app'].dataSources?.employeeRemote;

                if (!dataSource) {
                    throw new Error("Employee remote data source not found in manifest");
                }

                await setupMockServer(dataSource, CONFIG.appPath, CONFIG.jsonFilesPath);
                Log.info("Running the app with mock data");
            } catch (error) {
                Log.error(`Mock server initialization failed: ${error.message}`);
                throw error;
            }
        }
    }
})