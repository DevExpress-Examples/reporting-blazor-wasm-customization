window.ReportingDesignerCustomization = {
    onCustomizeElements: function(s, e) {
        //Remove Menu button
        var menuButton = e.GetById(s.dx.Reporting.Designer.Utils.ReportDesignerElements.MenuButton)
        var menuButtonIndex = e.Elements.indexOf(menuButton);
        menuButtonIndex !== -1 && e.Elements.splice(menuButtonIndex, 1);
    },

    onCustomizeMenuActions: function(s, e) {
        var firstToolbarItem = e.Actions.filter(x => !x.container || x.container === "toolbar")[0];
        firstToolbarItem.hasSeparator = true;

        //Move New button to the toolbar
        var newReportAction = e.GetById(s.dx.Reporting.Designer.Actions.ActionId.NewReport);
        newReportAction.container = "toolbar";
        e.Actions.splice(e.Actions.indexOf(newReportAction), 1);
        e.Actions.splice(0, 0, newReportAction);

        //Move Save button to the toolbar
        var saveAction = e.GetById(s.dx.Reporting.Designer.Actions.ActionId.Save);
        saveAction.container = "toolbar";
        e.Actions.splice(e.Actions.indexOf(saveAction), 1);
        e.Actions.splice(0, 0, saveAction);
    },

    onBeforeRender: function(s, e) {
        s.RunWizard("NewViaReportWizard")
    },

    onCustomizeWizard: function(s, e) {
        if(e.Type === "ReportWizard") {
            e.Wizard.events.addHandler("beforePageInitialize", (args) => {
                if (args.pageId === s.dx.Reporting.Designer.Wizard.FullscreenReportWizardPageId.SelectReportTypePage) {
                    args.page.typeItems.splice(0, 1);
                    args.page.typeItems.pop();
                }
            })
        }
    }
}