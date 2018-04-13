using System.Collections.Generic;
using System.Runtime.Serialization;

namespace MBran.Timings.Models.Source
{
    [DataContract]
    public class TimingSourceJson
    {
        [DataMember(Name ="timings")]
        public List<TimingSourceItemJson> Timings { get; set; }
    }
}
