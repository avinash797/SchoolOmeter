using System;
using System.ComponentModel.DataAnnotations;
using FA20.P05.Web.Features.Schools;
using FA20.P05.Web.Features.StaffMembers;

namespace FA20.P05.Web.Features.TemperatureRecords
{
    public class TemperatureRecord
    {
        public int Id { get; set; }
        
        public string StudentId { get; set; }

        public double TemperatureKelvin { get; set; }

        public int StaffId { get; set; }
        public virtual Staff Staff { get; set; }

        public int SchoolId { get; set; }
        public virtual School School { get; set; }

        public DateTimeOffset MeasuredUtc { get; set; }
    }
}