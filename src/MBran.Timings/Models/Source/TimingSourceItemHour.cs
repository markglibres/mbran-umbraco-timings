using System.Runtime.Serialization;

namespace MBran.Timings.Models.Source
{
    [DataContract]
    public class TimingSourceItemHour
    {
        [DataMember(Name = "hour")]
        public int Hour { get; set; }
        [DataMember(Name = "minutes")]
        public int Minutes { get; set; }
        [DataMember(Name = "meridian")]
        public string Meridian { get; set; }
    }
}
