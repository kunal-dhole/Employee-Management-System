package com.employee.Employee.Management.System.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.Employee.Management.System.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long > {

	
}
