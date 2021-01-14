using System;

namespace FA20.P05.Web.Features.TemperatureRecords
{
    public class TemperatureRecordDto
    {
        public int Id { get; set; }
        public string StudentId { get; set; }

        public int SchoolId { get; set; }

        public double TemperatureKelvin { get; set; }
        public DateTimeOffset MeasuredUtc { get; set; }
    }
}