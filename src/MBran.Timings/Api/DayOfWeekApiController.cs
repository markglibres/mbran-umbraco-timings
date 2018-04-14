using MBran.Timings.Models.Response;
using MBran.Timings.Service;
using System;
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
        
        public IEnumerable<Meridian> GetMeridian()
        {
            var model = new List<Meridian>();
            var now = DateTime.Now;
            var am = new DateTime(now.Year, now.Month, now.Day, 1, 0, 0);
            var pm = new DateTime(now.Year, now.Month, now.Day, 23, 0, 0);

            model.Add(new Meridian { Key = "AM", Value = am.ToString("tt", _siteService.GetCurrentCulture()) });
            model.Add(new Meridian { Key = "PM", Value = pm.ToString("tt", _siteService.GetCurrentCulture()) });

            return model;
        }
    }
}
