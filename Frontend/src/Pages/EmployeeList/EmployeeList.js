import React, { useState, useEffect, useCallback } from 'react';
import './EmployeeList.css'; 
import Sidebar from '../../Components/Sidebar/Sidebar';
import axios from 'axios';
import {format} from 'date-fns'

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/employeelist');
                if (response.data.success) {
                    setEmployees(response.data.data);
                } else {
                    console.error('Failed to fetch employees');
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCreateEmployee = () => {
        window.location.replace('/createemployee');
    };

    const handleEditEmployee = (employeeId) => {
        window.location.replace(`/editEmployee/${employeeId}`);
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())

    );
    const handleDeleteEmployee = useCallback(async (employeeId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/delete/${employeeId}`);
            if (response.data.success) {
                setEmployees(employees.filter(employee => employee._id !== employeeId));
            } else {
                console.error('Failed to delete employee');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    }, [employees]);

    return (
        
        <>
        {console.log(employees)}
            <Sidebar Title='Employee List' />
            <div className="employee-list-container">
                <div className="employee-list-header">
                    <div className="header-left">
                        <span className="total-count">Total Count: {filteredEmployees.length}</span>
                    </div>
                    <div className="header-right">
                        <button
                            className="create-employee-button"
                            onClick={handleCreateEmployee}
                        >
                            Create Employee
                        </button>
                        <input
                            type="text"
                            placeholder="Enter Search Keyword"
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Unique ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        filteredEmployees.map((employee) => (
                          
                            <tr key={employee.sno}>
                                <td>{employee.sno}</td>
                                <td>
                                    <img
                                        src={employee.imageUrl}
                                        alt={employee.name}
                                        className="employee-image"
                                    />
                                </td>
                                <td>{employee.name}</td>
                                <td>
                                    <a href={`mailto:${employee.email}`}>
                                        {employee.email}
                                    </a>
                                </td>
                                <td>{employee.mobileNo}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.courses}</td>
                                <td>{format(new Date(employee.createDate),'d MMM yyyy')}</td>
                                <td>
                                    <div className="buttons">
                                        <span
                                            className="edit-button"
                                            onClick={() => handleEditEmployee(employee._id)}
                                        >
                                            Edit
                                        </span>
                                        {' - '}
                                        <span className="delete-button"
                                        onClick={()=>handleDeleteEmployee(employee._id)}>
                                            Delete
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EmployeeList;
