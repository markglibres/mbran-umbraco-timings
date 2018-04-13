using MBran.Timings.Models.ValueType;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MBran.Timings.Extensions
{
    public static class TimingExtensions
    {
        public static bool IsSingleDay(this Timing timing)
        {
            return timing?.Days?.From.Equals(timing.Days?.To) ?? false;
        }

        public static Dictionary<DayOfWeek,IEnumerable<TimingHourRange>> ToDailyHours(this IEnumerable<Timing> timings)
        {
            var model = new Dictionary<DayOfWeek, IEnumerable<TimingHourRange>>();

            for (int dayCount = 0; dayCount < 7; dayCount++)
            {
                var dayOfWeek = (DayOfWeek)Enum.ToObject(typeof(DayOfWeek), dayCount);
                model.Add(dayOfWeek,
                    timings.Where(timing => dayOfWeek >= timing.Days.From && dayOfWeek <= timing.Days.To)
                    .SelectMany(timing => timing.Hours)
                    );
            }

            return model;
        }
    }
}
