package com.employee.Employee.Management.System.entity;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Entity

public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long id;

	@NotBlank(message = "Name is required")
	@Size(min = 3, message = "Name must be at least 3 characters long")
	private String name;

	@NotBlank(message = "Email is required")
	@Email(message = "Email should be in a valid format")
	@Column(unique = true)
	private String email;


	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
	String phone;

	@NotBlank(message = "Department is required")
	private String department;
	
	  @Temporal(TemporalType.TIMESTAMP)
	    private Date createdAt = new Date();

	    @Temporal(TemporalType.TIMESTAMP)
	    private Date updatedAt = new Date();

	public Employee() {
		super();
		
	}

	public Employee(Long id,
			@NotBlank(message = "Name is required") @Size(min = 3, message = "Name must be at least 3 characters long") String name,
			@NotBlank(message = "Email is required") @Email(message = "Email should be in a valid format") String email,
			@NotBlank(message = "Phone number is required") @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits") String phone,
			@NotBlank(message = "Department is required") String department, Date createdAt, Date updatedAt) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.department = department;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", email=" + email + ", phone=" + phone + ", department="
				+ department + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}



}
