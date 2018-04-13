using MBran.Timings.Models.ValueType;

namespace MBran.Timings.Extensions
{
    public static class TimingExtensions
    {
        public static bool IsSingleDay(this Timing timing)
        {
            return timing?.Days?.From.Equals(timing.Days?.To) ?? false;
        }


    }
}
