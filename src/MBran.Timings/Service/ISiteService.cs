using System.Globalization;
using Umbraco.Core.Models;

namespace MBran.Timings.Service
{
    public interface ISiteService
    {
        int GetDomainRootId();
        IPublishedContent GetDomainRoot();
        IPublishedContent GetByNodeId(int nodeId);
        IDomain GetCurrentDomain();
        CultureInfo GetCurrentCulture();
        string GetDomainName();
    }
}
