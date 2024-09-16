const Employee = require('../Models/EmployeeModel');
const express = require('express');
const router = express.Router();
const handler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const validateEmployee = [
    check('name').notEmpty().withMessage('Name is required.'),
    check('email').isEmail().withMessage('Valid email is required.'),
    check('mobileNo').isNumeric().isLength({ min: 10, max: 10 }).withMessage('Valid 10-digit mobile number is required.'),
    check('designation').notEmpty().withMessage('Designation is required.'),
    check('gender').isIn(['M', 'F']).withMessage('Gender is required.')
];
router.post(
    '/createemployee',validateEmployee,
    handler(async (req, res) => {
        const { name, email, mobileNo, designation, gender, courses,imageUrl } = req.body;
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        try {
            const existingEmployee = await Employee.findOne({ email });
            
            if (existingEmployee) {
                return res.json({
                    success: false,
                    message: 'Email already exists'
                });
            }

            // Create new employee
            const newEmployee = new Employee({
                name: name,
                email: email,
                mobileNo: mobileNo,
                designation: designation,
                gender: gender,
                courses: courses,
                imageUrl:imageUrl
            });

            await newEmployee.save();
            return res.json({
                success: true,
                message: 'Employee created successfully'
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Error in Employee API'
            });
        }
    })
);

router.get(
    '/employeelist',
    handler(async (req, res) => {
        const employees = await Employee.find({});
        if (employees) {
            return res.json({
                success: true,
                data: employees
            });
        }
        return res.json({
            success: false
        });
    })
);
router.get(
    '/employee/:id',
    handler(async (req, res) => {
        const id=req.params.id;
        console.log(id)
        const employee =await Employee.findById(id);
        if (employee) {
            return res.json({
                success: true,
                data: employee
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
    })
);

// Route to update employee by ID
router.put(
    '/updateemployee/:id',
    handler(async (req, res) => {
        const { name, email, mobileNo, designation, gender, courses } = req.body;
        try {
            const id=req.params.id;
            const employee =await Employee.findById(id);
            if (employee) {
                employee.name = name;
                employee.email = email;
                employee.mobileNo = mobileNo;
                employee.designation = designation;
                employee.gender = gender;
                employee.courses = courses;

                await employee.save();
                return res.json({
                    success: true,
                    message: 'Employee updated successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found'
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error updating employee'
            });
        }
    })
);
router.delete(
    '/delete/:id',
    handler(async(req,res)=>{
        
        try{const employee= await Employee.findByIdAndDelete(req.params.id);
        if(employee){
            return res.status(200).json({
                success:true,
                message:"Employee Deleted SuccessFully"
            })
        }}
        catch(err){
            return res.status(400).json({
                success:false,
                message:"Error in Employee Deleted ",
                error:err
            }) 
        }
    })
)


module.exports = router;
