﻿using System.ComponentModel.DataAnnotations.Schema;

namespace HR.Model
{
    public class Vacation
    {
        public long Id { get; set; }
        [ForeignKey("Employee")]
        public long EmployeeId { get; set; }
        public Employee Employee { get; set; } //Navigation Proprety

        public DateTime CreationDate { get; set; } = DateTime.Now;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [ForeignKey("Type")]
        public long TypeId { get; set; }
        public Lookup Type { get; set; } //Navigation Proprety
        public string? Notes { get; set; }
    }
}
