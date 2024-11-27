package com.employee.Employee.Management.System.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.employee.Employee.Management.System.entity.Employee;

@Repository
public class EmployeeDao {
@Autowired
SessionFactory factory;
	
 public void  addEmployee(Employee emp){
	
	Session session=factory.openSession();
	Transaction tx= session.beginTransaction();
	session.save(emp);
	tx.commit();

	
	
	
}
	
}
