<!-- default badges list -->
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1134606)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# Blazor WASM Reporting (JavaScript-Based) - UI Customization

This example demonstrates how to customize the Document Viewer and End-User Report Designer components.

## Overview

To customize the behavior and appearance of a Javascript-based Blazor WASM component, handle the appropriate client-side event and use the client-side API to make changes.
 
The Document Viewer and Report Designer use the following objects to specify client-side event handlers:

- [DxDocumentViewerCallbacks](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxDocumentViewerCallbacks) 
- [DxReportDesignerCallbacks](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxReportDesignerCallbacks)

You can define a client-side handler - a global function - in a separate JavaScript file. For example, the following function handles the `BeforeRender` event to specify the Document Viewer zoom level: 

*reporting_ViewerCustomization.js* file

```javascript
window.ReportingViewerCustomization = {
	//Change default Zoom level
	onBeforeRender: function(s, e) {
	    //-1: Page Width
	    //0: Whole Page
	    //1: 100%
	    e.reportPreview.zoom(-1);
	}
}
```

Include script files in the index.html page: 

- *index.html* file

```html
<body>
 <!--  -->
<script src="~/js/reporting_ViewerCustomization.js"></script>
 <!--  -->
</body>
```    

To handle an event, assign the name of the JS function to the corresponding `DxDocumentViewerCallbacks` or `DxReportDesignerCallbacks` property. The following code specifies that the `ReportingViewerCustomization.onBeforeRender` function handles the `BeforeRender` event:

- *DocumentViewer.razor* file
```razor
<DxWasmDocumentViewer ReportName="TestReport" Height="calc(100vh - 130px)" Width="100%">
    <DxDocumentViewerTabPanelSettings Width="340" />
    <DxWasmDocumentViewerRequestOptions InvokeAction="DXXRDV"></DxWasmDocumentViewerRequestOptions>
    <DxDocumentViewerCallbacks BeforeRender="ReportingViewerCustomization.onBeforeRender"/>
</DxWasmDocumentViewer>
``` 
Do not use named constants in JavaScript functions. Specify strings instead.

## Example: Document Viewer UI Customization

The *reporting_ViewerCustomization.js* file contains JavaScript functions that customize the Document Viewer in the following manner:

| Event | Handler Implementation |
|-----------|----------------|
| **CustomizeParameterEditors** |	Removes the time portion in the DateTime parameter editor. |
| **BeforeRender** |	Sets the default zoom level to "Page Width". |


## Example: End-User Report Designer UI Customization

The *reporting_DesignerCustomization.js* file contains JavaScript functions that customize the Report Designer in the following manner:

| Event | Handler Implementation |
|-----------|----------------|
| **CustomizeElements** | Removes the Menu button |
| **CustomizeMenuActions** | Moves the Save and New buttons from the Menu to the Toolbar. |
| **ReportOpened** | Creates a custom report when the user clicks the New button. |
| **BeforeRender** | Runs the Wizard when the Report Designer starts. |
| **CustomizeWizard** | Removes the first and the last report types from the list that the Report Wizard displays. |

## Example: Localization

To localize Document Viewer and Report Designer UI, you need the following resources:

- [jQuery](https://jquery.com/) library. Include the library reference in the `index.html` page.
- Translations in JSON format. You can obtain the files from the DevExpress [Localization Service](https://localization.devexpress.com/). Review the [Localization](https://docs.devexpress.com/XtraReports/400932/web-reporting/asp-net-core-reporting/localization#obtain-json-files-from-the-localization-service) help topic for more information.

The *reporting_Localization.js* file contains the **onCustomizeLocalization** function that loads JSON localization files. The files are located in the *wwwroot/js/localization* folder. Razor page markup assigns the function name to the [DxDocumentViewerCallbacks.CustomizeLocalization](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxDocumentViewerCallbacks.CustomizeLocalization) or [xReportDesignerCallbacks.CustomizeLocalization](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxReportDesignerCallbacks.CustomizeLocalization) property. 

Note that the component UI is based on DevExtreme widgets, so to localize the editors you should also use one of the approaches described in the following topic: [DevExtreme - Localization](https://js.devexpress.com/Documentation/Guide/Common/Localization/). Specify web server's thread culture to apply culture-specific formats to numbers and dates.

## Files to Review

### Document Viewer UI Customization

- [DocumentViewer.razor](ReportingBlazorWasmCustomizationSample.Client/Pages/DocumentViewer.razor)
- [reporting_ViewerCustomization.js](ReportingBlazorWasmCustomizationSample.Client/wwwroot/js/reporting_ViewerCustomization.js)

### End-User Report Designer UI Customization

- [ReportDesigner.razor](ReportingBlazorWasmCustomizationSample.Client/Pages/ReportDesigner.razor)
- [reporting_DesignerCustomization.js](ReportingBlazorWasmCustomizationSample.Client/wwwroot/js/reporting_DesignerCustomization.js)

### Localization

- [DocumentViewerLocalization.razor](ReportingBlazorWasmCustomizationSample.Client/Pages/DocumentViewerLocalization.razor)
- [ReportDesignerLocalization.razor](ReportingBlazorWasmCustomizationSample.Client/Pages/ReportDesignerLocalization.razor)
- [reporting_Localization.js](ReportingBlazorWasmCustomizationSample.Client/wwwroot/js/reporting_Localization.js)
- [de.json](ReportingBlazorWasmCustomizationSample.Client/wwwroot/js/localization/de.json)
- [dx-analytics-core.de.json](ReportingBlazorWasmCustomizationSample.Client/wwwroot/js/localization/dx-analytics-core.de.json)
- [dx-reporting.de.json](ReportingBlazorWasmCustomizationSample.Client/wwwroot/js/localization/dx-reporting.de.json)




