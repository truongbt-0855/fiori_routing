sap.ui.define(
    ['fiori/routing/controller/BaseController', 'sap/ui/model/json/JSONModel'],
    (BaseController, JSONModel) => {
        'use strict';

        let _aValidTabKeys = ['Info', 'Projects', 'Hobbies', 'Notes'];

        return BaseController.extend('fiori.routing.controller.employee.Resume', {
            onInit() {
                let oRouter = this.getRouter();
                this.getView().setModel(new JSONModel(), 'view');
                oRouter.getRoute('employeeResume').attachMatched(this._onRouteMatched, this);
            },

            onNavBack() {
                let oCtx = this.getView().getBindingContext();
                console.log(oCtx);

                this.getRouter().navTo('employee', {
                    employeeId: oCtx.getProperty('EmployeeID'),
                });
            },

            _onRouteMatched(oEvent) {
                let oArgs, oView, oQuery;

                oArgs = oEvent.getParameter('arguments');
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

                oQuery = oArgs['?query'];
                if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1) {
                    oView.getModel('view').setProperty('/selectedTabKey', oQuery.tab);
                    // support lazy loading for the hobbies and notes tab
                    if (oQuery.tab === 'Hobbies' || oQuery.tab === 'Notes') {
                        // the target is either "resumeTabHobbies" or "resumeTabNotes"
                        this.getRouter().getTargets().display(`resumeTab${oQuery.tab}`);
                    }
                } else {
                    // the default query param should be visible at all time
                    this.getRouter().navTo('employeeResume', {
                        employeeId: oArgs.employeeId,
                        '?query': {
                            tab: _aValidTabKeys[0],
                        },
                    });
                }
            },

            _onBindingChange(oEvent) {
                // No data for the binding
                if (!this.getView().getBindingContext()) {
                    this.getRouter().getTargets().display('notFound');
                }
            },

            onTabSelect(oEvent) {
                let oCtx = this.getView().getBindingContext();
                this.getRouter().navTo('employeeResume', {
                    employeeId: oCtx.getProperty('EmployeeID'),
                    '?query': {
                        tab: oEvent.getParameter('selectedKey'),
                    },
                });
            },
        });
    }
);
