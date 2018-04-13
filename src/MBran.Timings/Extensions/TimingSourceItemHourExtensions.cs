using MBran.Timings.Models.Source;
using System;

namespace MBran.Timings.Extensions
{
    public static class TimingSourceItemHourExtensions
    {
        public static TimeSpan ToTimeSpan(this TimingSourceItemHour timingHour)
        {
            return new TimeSpan(timingHour.GetMilitaryHour(), timingHour.Minutes, 0);
        }

        public static int GetMilitaryHour(this TimingSourceItemHour timingHour)
        {
            if (string.IsNullOrWhiteSpace(timingHour?.Meridian))
            {
                return timingHour.Hour;
            }
                
            if(timingHour.Meridian.Equals("pm", StringComparison.InvariantCultureIgnoreCase))
            {
                if(timingHour.Hour != 12)
                {
                    return timingHour.Hour + 12;
                }
            }else if(timingHour.Hour == 12)
            {
                return 0;
            }

            return timingHour.Hour;
        }
    }
}
