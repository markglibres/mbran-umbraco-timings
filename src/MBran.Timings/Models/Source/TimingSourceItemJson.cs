using System.Runtime.Serialization;

namespace MBran.Timings.Models.Source
{
    [DataContract]
    public class TimingSourceItemJson
    {
        [DataMember(Name = "day")]
        public TimingSourceItemDays Days { get; set; }
        [DataMember(Name = "from")]
        public TimingSourceItemHour From { get; set; }
        [DataMember(Name = "to")]
        public TimingSourceItemHour To { get; set; }
    }
}
