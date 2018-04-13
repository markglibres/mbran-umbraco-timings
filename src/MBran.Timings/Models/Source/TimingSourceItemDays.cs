using System;
using System.Runtime.Serialization;

namespace MBran.Timings.Models.Source
{
    [DataContract]
    public class TimingSourceItemDays
    {
        [DataMember(Name = "from")]
        public DayOfWeek From { get; set; }
        [DataMember(Name = "to")]
        public DayOfWeek To { get; set; }
    }
}
