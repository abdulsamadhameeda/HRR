﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HR.Model;
using HR.DTOs.Employees;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace HR.Controllers
{
    [Authorize] // Authentication / Authorization
    [Route("api/Employees")]// --> Data Annotation
    [ApiController]// --> Data Annotation
    public class EmployeesController : ControllerBase
    {
        private HrDbContext _dbContext;

        public EmployeesController(HrDbContext dbContext) // Constructor
        {

            _dbContext = dbContext;
        }

        [Authorize(Roles = "HR,Admin")]
        [HttpGet("GetAll")]// --> Data Annotation
        public IActionResult GetAll([FromQuery] FilterEmployeeDto filterDto) // Postion Is Optional // Query Parameter
        {
            var data = from employee in _dbContext.Employees
                       from department in _dbContext.Departments.Where(x => x.Id == employee.DepartmentId).DefaultIfEmpty() // Left Join
                       from manager in _dbContext.Employees.Where(x => x.Id == employee.ManagerId).DefaultIfEmpty() // Left Join
                       from lookup in _dbContext.Lookups.Where(x => x.Id == employee.PositionId).DefaultIfEmpty() // Left Join
                       where 
                             (filterDto.PositionId == null || employee.PositionId == filterDto.PositionId) && // employee.Position == postion // Filtarion Optional
                             (filterDto.EmployeeName == null || employee.Name.ToUpper().Contains(filterDto.EmployeeName.ToUpper())) &&
                             (filterDto.IsActive == null || employee.IsActive == filterDto.IsActive)

                       orderby employee.Id
                            select new EmployeeDto 
                            {
                                Id = employee.Id,
                                Name = employee.Name,
                                PositionId = employee.PositionId,
                                PositionName = lookup.Name,
                                BirthDate = employee.BirthDate,
                                IsActive = employee.IsActive,
                                StartDate = employee.StartDate,
                                Phone = employee.Phone,
                                ManagerId = employee.ManagerId,
                                ManagerName = manager.Name,
                                DepartmentId = employee.DepartmentId,
                                DepartmentName = department.Name
                            };
            return Ok(data);
        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] long Id) // 1
        {
            var employee = _dbContext.Employees.Select(employee => new EmployeeDto
            {
                Id = employee.Id,
                Name = employee.Name,
                PositionId = employee.PositionId,
                PositionName = employee.Lookup.Name,
                BirthDate = employee.BirthDate,
                IsActive = employee.IsActive,
                StartDate = employee.StartDate,
                Phone = employee.Phone,
                ManagerId = employee.ManagerId,
                DepartmentId = employee.DepartmentId,
                DepartmentName = employee.DepartmentRow.Name,
                ManagerName = employee.Manager.Name
            }).FirstOrDefault(x => x.Id == Id);

            return Ok(employee);

        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody] SaveEmployeeDto employeeDto )
        {
            var user = new User() { 
                Id = 0,
                UserName = $"{employeeDto.Name}_HR",//Ahmad --> Ahmad_HR
                HashedPassword = BCrypt.Net.BCrypt.HashPassword($"{employeeDto.Name}@123"), // Ahmad --> Ahmad@123
                IsAdmin = false
            };
            _dbContext.Users.Add(user);

            var employee = new Employee()
            {
                Id = 0, // Ignored
                Name = employeeDto.Name,
                BirthDate = employeeDto.BirthDate,
                PositionId = employeeDto.PositionId,
                IsActive = employeeDto.IsActive,
                StartDate = employeeDto.StartDate,
                EndDate = employeeDto.EndDate,
                DepartmentId = employeeDto.DepartmentId,
                ManagerId = employeeDto.ManagerId,
                User = user
            };

            _dbContext.Employees.Add(employee);
            _dbContext.SaveChanges();
            return Ok();    
        }

        [HttpPut("Update")]
        public IActionResult Update([FromBody] SaveEmployeeDto employeeDto)
        {
            var employee = _dbContext.Employees.FirstOrDefault(x => x.Id == employeeDto.Id); // Employee to be updated

            if (employee == null)
            {
                return BadRequest("Employee Not Found"); //400 
            }

            employee.Name = employeeDto.Name;
            employee.BirthDate = employeeDto.BirthDate;
            employee.PositionId = employeeDto.PositionId;
            employee.IsActive = employeeDto.IsActive;
            employee.StartDate = employeeDto.StartDate;
            employee.EndDate = employeeDto.EndDate;
            employee.DepartmentId = employeeDto.DepartmentId;
            employee.ManagerId = employeeDto.ManagerId;


            _dbContext.SaveChanges();
            return Ok();
        }


        [HttpDelete("Delete")]
        public IActionResult Delete([FromQuery] long id)
        {
            var employee = _dbContext.Employees.FirstOrDefault(x => x.Id == id); // Employee to be deleted

            if (employee == null)
            {
                return BadRequest("Employee Not Found"); //400 
            }

            _dbContext.Employees.Remove(employee);
            _dbContext.SaveChanges();
            return Ok();

        }
    }
}


// Simple Data Type : long, int, string.... | Query Parameter (By Default)
// Complex Data Type : Model, Dto (object) | Request Body (By Default)

// Http Get : Can Not Use Body Request [FromBody], We Can Only Use Query Parameter [FromQuery]
// Http Put/Post : Can Use Both Body Request [FromBody] And Query Parameter [FromQuery], But We Will Only Use [FromBody]
// Http Delete : Can Use Both Body Request [FromBody] And Query Parameter [FromQuery], But We Will Only Use [FromQuery]

//Can't Use Multiple Paramters Of Type [FromBody]
//Can Use Multiple Parameters Of Type [FromQuery]

