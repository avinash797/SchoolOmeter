using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FA20.P05.Web.Data;
using FA20.P05.Web.Features.Authentication;
using FA20.P05.Web.Features.Schools;
using FA20.P05.Web.Features.TemperatureRecords;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA20.P05.Web.Controllers
{
    [ApiController]
    [Route("api/temperature-records")]
    public class TemperatureRecordsController : ControllerBase
    {
        private readonly DataContext dataContext;

        public TemperatureRecordsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        private static Expression<Func<TemperatureRecord, TemperatureRecordDto>> MapToDto()
        {
            // we could do something like Set<School>().Select(...) where the dots would be the expression below,
            // but we can re-use this method in several places and reduce our duplication
            return x => new TemperatureRecordDto
            {
                Id=x.Id,
                StudentId = x.StudentId,
                TemperatureKelvin=x.TemperatureKelvin,
                SchoolId=x.SchoolId,
                MeasuredUtc = x.MeasuredUtc,
            };
        }


        [HttpGet]
        public IEnumerable<TemperatureRecordDto> GetAll()
        {
            return dataContext
                .Set<TemperatureRecord>()
                .Select(MapToDto()).ToList();
        }

        [HttpGet("temp/{id}")]
        public IEnumerable<TemperatureRecordDto> GetByStaff(int id)
        {
            return dataContext
                .Set<TemperatureRecord>()
                .Where(x=> x.StaffId ==  id)
                .Select(MapToDto()).ToList();
        }


        [HttpGet("{id}")]
        public ActionResult<TemperatureRecordDto> GetById(string id)
        {
            var data = dataContext
                .Set<TemperatureRecord>()
                .Where(x => x.StudentId == id)
                .Select(MapToDto())
                .FirstOrDefault();
            if (data == null)
            {
                return NotFound();
            }
            return data;
        }

        [HttpPost]
        [Authorize(Roles = Roles.PrincipalStaff)]
        public async Task<ActionResult<TemperatureRecordDto>> Create(TemperatureRecordDto targetValue)
        {
            var username = User.Identity.Name;

            // don't allow a staff to specify a school they are not a staff member at
            var schoolStaff = await dataContext.Set<User>()
                .Where(x => x.UserName == username)
                .SelectMany(x => x.Staff.Schools)
                .Where(x => x.SchoolId == targetValue.SchoolId)
                .FirstOrDefaultAsync();

            if (schoolStaff == null)
            {
                return NotFound();
            }

            // TODO: what validation rules might you want to add here?
            var result = dataContext.Set<TemperatureRecord>().Add(new TemperatureRecord
            {
                StudentId=targetValue.StudentId,
                SchoolId = schoolStaff.SchoolId,
                StaffId = schoolStaff.StaffId,
                TemperatureKelvin = targetValue.TemperatureKelvin,
                MeasuredUtc = DateTimeOffset.UtcNow
            });
            await dataContext.SaveChangesAsync();
            targetValue.Id = result.Entity.Id;

            //hmm, maybe we need more endpoints later?
            return Created($"/api/temperature-records/{targetValue.Id}", targetValue);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            var data = await dataContext.Set<TemperatureRecord>().FirstOrDefaultAsync(x => x.Id == id);
            if (data == null)
            {
                return NotFound();
            }

            dataContext.Set<TemperatureRecord>().Remove(data);
            await dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
