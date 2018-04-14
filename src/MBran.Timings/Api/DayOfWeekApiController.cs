using MBran.Timings.Service;
using System.Collections.Generic;
using Umbraco.Core;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;

namespace MBran.Timings.Api
{
    [PluginController("MBranTimings")]
    public class DaysApiController : UmbracoAuthorizedApiController
    {
        private readonly ISiteService _siteService;

        public DaysApiController()
        {
            _siteService = new SiteService();
        }
        public IEnumerable<string> GetDayNames()
        {
            
            var cacheName = string.Join("_", GetType().FullName, 
                nameof(GetDayNames),
                _siteService.GetDomainName().ToSafeAlias());

            return (IEnumerable<string>) ApplicationContext
                .ApplicationCache
                .RequestCache
                .GetCacheItem(cacheName, () => _siteService.GetCurrentCulture().DateTimeFormat.DayNames);
            
        }

        public IEnumerable<string> GetAbbreviatedDayNames()
        {
            var cacheName = string.Join("_", GetType().FullName,
                nameof(GetDayNames),
                _siteService.GetDomainName().ToSafeAlias());

            return (IEnumerable<string>)ApplicationContext
                .ApplicationCache
                .RequestCache
                .GetCacheItem(cacheName, () => _siteService.GetCurrentCulture().DateTimeFormat.AbbreviatedDayNames);
        }
        
    }
}
