const express = require('express');
const cookie = require('cookie');
const multer = require('multer');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const dbconnect = require('./Config/databaseConfig');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from this origin
}));

app.use(morgan('dev'));

// Connecting to DataBase
dbconnect();

// Set up Multer storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'upload', 'images'),
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        console.log(__dirname)
    }
});
const upload = multer({ storage: storage });

// Serve static files
app.use('/images', express.static(path.join(__dirname ,'upload','images')));

// Image upload route
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.json({
        success: true,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
    console.log(`File uploaded:http://localhost:${PORT}/images/${req.file.filename}`);
});

// Routers
app.use('/user', require('./Routers/UserRouter'));
app.use('/', require('./Routers/EmployeeRouter'));

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is Running on port Number', PORT);
    }
});
