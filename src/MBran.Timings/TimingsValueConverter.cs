using MBran.Timings.Extensions;
using MBran.Timings.Models.Source;
using MBran.Timings.Models.ValueType;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace MBran.Timings
{
    [PropertyValueType(typeof(IEnumerable<Timing>))]
    [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.Content)]
    public class TimingsValueConverter : IPropertyValueConverter
    {
        public bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals(TimingConstants.PropertyAlias,
                StringComparison.InvariantCultureIgnoreCase);
        }

        public object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview)
        {
            return JsonConvert.DeserializeObject<List<TimingSourceItemJson>>(source as string);
        }

        public object ConvertSourceToObject(PublishedPropertyType propertyType, object source, bool preview)
        {
            var timingSource = source as List<TimingSourceItemJson>;

            var model = timingSource.GroupBy(timing => new {  timing.Days.From,  timing.Days.To } )
                .Select(group => new Timing
                {
                    Days = new TimingDayRange { From = group.Key.From, To = group.Key.To },
                    Hours = group.Select(hours => new TimingHourRange
                    {
                        From = DateTime.MinValue.Add(hours.From.ToTimeSpan()),
                        To = DateTime.MinValue.Add(hours.To.ToTimeSpan())
                    })
                });
           
            return model;
        }

        public object ConvertSourceToXPath(PublishedPropertyType propertyType, object source, bool preview)
        {
            throw new NotImplementedException();
        }

        
    }
}
