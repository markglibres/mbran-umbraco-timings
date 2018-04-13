using System.Collections.Generic;

namespace MBran.Timings.Models.ValueType
{
    public class Timing
    {
        public TimingDayRange Days { get; set; }
        public IEnumerable<TimingHourRange> Hours { get; set; }
    }
}
