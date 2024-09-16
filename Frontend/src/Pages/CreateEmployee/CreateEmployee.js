import React, { useState } from 'react';
import './CreateEmployee.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import axios from 'axios';

const CreateEmployee = () => {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        courses: [],
    });
    const [validationErrors, setValidationErrors] = useState([]); 

    const ImageHandler = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setImage(file);
        } else {
            setValidationErrors(prevErrors => [...prevErrors, 'Only JPEG and PNG files are allowed']);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setFormData((prevData) => {
                const updatedCourses = checked
                    ? [...prevData.courses, value]
                    : prevData.courses.filter((course) => course !== value);

                return {
                    ...prevData,
                    courses: updatedCourses
                };
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const errors = [];

        if (!formData.name.trim()) {
            errors.push('Name is required');
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email.trim()) {
            errors.push('Email is required');
        } else if (!emailPattern.test(formData.email)) {
            errors.push('Invalid email format');
        }

        const mobilePattern = /^\d{10}$/;
        if (!formData.mobileNo.trim()) {
            errors.push('Mobile number is required');
        } else if (!mobilePattern.test(formData.mobileNo)) {
            errors.push('Mobile number must be 10 digits');
        }

        if (!formData.designation) {
            errors.push('Designation is required');
        }

        if (!formData.gender) {
            errors.push('Gender is required');
        }

        if (formData.courses.length === 0) {
            errors.push('Please select at least one course');
        }

        if (!image) {
            errors.push('Image is required');
        }

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return; 
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('mobileNo', formData.mobileNo);
        data.append('designation', formData.designation);
        data.append('gender', formData.gender);
        formData.courses.forEach((course) => data.append('course', course));

        if (image) {
            data.append('image', image);
        }

        try {
            const imageResponse = await axios.post("http://localhost:8000/upload", data);
            if (imageResponse.data.success) {
                const response = await axios.post('http://localhost:8000/createemployee', {
                    ...formData,
                    imageUrl: imageResponse.data.image_url,
                });
                if (response.data.success) {
                    alert('Employee created successfully');
                    setFormData({
                        name: '',
                        email: '',
                        mobileNo: '',
                        designation: '',
                        gender: '',
                        courses: [],
                    });
                    setImage(null); // Clear the image
                    setValidationErrors([]);
                } else {
                    alert("User Already Exist");
                }
            } else {
                alert("Image upload failed");
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            alert('An error occurred while creating the employee');
        }
    };

    return (
        <>
            <Sidebar Title='Create Employee' />
            <form onSubmit={handleSubmit}>
                {validationErrors.length > 0 && (
                    <div className="error-messages">
                        <ul>
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mobile No:</label>
                    <input
                        type="text"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Designation:</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="radio"
                        name="gender"
                        value="M"
                        checked={formData.gender === 'M'}
                        onChange={handleChange}
                        required
                    />{' '}
                    Male
                    <input
                        type="radio"
                        name="gender"
                        value="F"
                        checked={formData.gender === 'F'}
                        onChange={handleChange}
                        required
                    />{' '}
                    Female
                </div>
                <div>
                    <label>Course:</label>
                    <input
                        type="checkbox"
                        name="course"
                        value="MCA"
                        checked={formData.courses.includes('MCA')}
                        onChange={handleChange}
                    />{' '}
                    MCA
                    <input
                        type="checkbox"
                        name="course"
                        value="BCA"
                        checked={formData.courses.includes('BCA')}
                        onChange={handleChange}
                    />{' '}
                    BCA
                    <input
                        type="checkbox"
                        name="course"
                        value="BSC"
                        checked={formData.courses.includes('BSC')}
                        onChange={handleChange}
                    />{' '}
                    BSC
                </div>
                <div>
                    <label>Image Upload:</label>
                    <input type="file" name="image" onChange={ImageHandler} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default CreateEmployee;
