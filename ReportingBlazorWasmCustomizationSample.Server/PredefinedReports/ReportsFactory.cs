using DevExpress.XtraReports.UI;
using ReportingBlazorWasmCustomizationSample.Server.PredefinedReports;

namespace ReportingBlazorWasmCustomizationSample.PredefinedReports
{
    public static class ReportsFactory
    {
        public static Dictionary<string, Func<XtraReport>> Reports = new Dictionary<string, Func<XtraReport>>()
        {
            ["TestReport"] = () => new TestReport(),
            ["SampleReport"] = () => new SampleReport()
        };
    }
}
