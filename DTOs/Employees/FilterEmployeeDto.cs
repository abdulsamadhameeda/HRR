﻿namespace HR.DTOs.Employees
{
    public class FilterEmployeeDto
    {
        public long? PositionId { get; set; }
        public string? EmployeeName { get; set; }
        public bool? IsActive { get; set; }
    }
}
