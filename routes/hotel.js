const express = require('express');
const router = express.Router();
const { upload } = require('../multerConfig');
const Hotel = require('../models/Hotel');
const Section = require('../models/Section')
const Table = require('../models/Table')
const MainCategory = require('../models/MainCategory')
const Menu = require('../models/Menu')


// API for adding a new company
router.post('/create', upload.fields([{ name: 'hotelLogo', maxCount: 1 }, { name: 'qrCode', maxCount: 1 }]), async (req, res) => {
    try {
        const { hotelName, address, email, contactNo, gstNo, sacNo, fssaiNo } = req.body;

        // Extract the file paths from req.files
        // const hotelLogo = req.files['hotelLogo'][0].path;
        // const qrCode = req.files['qrCode'][0].path;

        const hotelLogo = req.files['hotelLogo'] ? req.files['hotelLogo'][0].path : undefined;
        const qrCode = req.files['qrCode'] ? req.files['qrCode'][0].path : undefined;

        // Create a new company
        const newHotel = new Hotel({
            hotelName,
            address,
            email,
            contactNo,
            gstNo,
            sacNo,
            fssaiNo,
            hotelLogo,
            qrCode,
        });
        // Save the new company to the database
        const savedCompany = await newHotel.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// API to Edit the Hotel
router.patch('/edit/:hotelId', upload.fields([{ name: 'hotelLogo', maxCount: 1 }, { name: 'qrCode', maxCount: 1 }]), async (req, res) => {
    try {
        const { hotelName, address, email, contactNo, gstNo, sacNo, fssaiNo } = req.body;
        const { hotelId } = req.params;

        // Extract the file paths from req.files if they are provided
        let hotelLogo;
        let qrCode;

        if (req.files) {
            hotelLogo = req.files['hotelLogo'] ? req.files['hotelLogo'][0].path : undefined;
            qrCode = req.files['qrCode'] ? req.files['qrCode'][0].path : undefined;
        }

        // Find the hotel by ID
        const hotelToUpdate = await Hotel.findById(hotelId);

        if (!hotelToUpdate) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Update the hotel properties
        hotelToUpdate.hotelName = hotelName;
        hotelToUpdate.address = address;
        hotelToUpdate.email = email;
        hotelToUpdate.contactNo = contactNo;
        hotelToUpdate.gstNo = gstNo;
        hotelToUpdate.sacNo = sacNo;
        hotelToUpdate.fssaiNo = fssaiNo;

        // Update the file paths if provided
        if (hotelLogo) {
            hotelToUpdate.hotelLogo = hotelLogo;
        }

        if (qrCode) {
            hotelToUpdate.qrCode = qrCode;
        }

        // Save the updated hotel to the database
        const updatedHotel = await hotelToUpdate.save();

        res.status(200).json(updatedHotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// API for deleting an existing hotel
router.delete('/delete/:hotelId', async (req, res) => {
    try {
        const { hotelId } = req.params;

        // Use findByIdAndDelete to find and delete the hotel by ID
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

        if (!deletedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// API for getting a single hotel by ID
router.get('/get/:hotelId', async (req, res) => {
    try {
        const { hotelId } = req.params;

        // Use findById to find the hotel by ID
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// API for getting all hotels
router.get('/get-all', async (req, res) => {
    try {
        // Use find to get all hotels
        const hotels = await Hotel.find();

        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


router.get('/counts', async (req, res) => {
    try {
        const sectionCount = await Section.countDocuments();
        const tableCount = await Table.countDocuments();
        const mainCategoryCount = await MainCategory.countDocuments();
        const menuCount = await Menu.countDocuments();

        res.json({
            sectionCount,
            tableCount,
            mainCategoryCount,
            menuCount,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const puppeteer = require('puppeteer');

router.post('/hotel/generate-pdf', async (req, res) => {
    try {
        const { currentOrder, hotelInfo, tableInfo, total } = req.body;

        // Create a browser instance
        const browser = await puppeteer.launch({
            headless: "new", // Opt in to the new Headless mode
        });
        const page = await browser.newPage();

        // Assuming you have some HTML template for your PDF
        const htmlContent = `
        <html>
          <head>
            <title>PDF Report</title>
          </head>
          <body>
            <!-- Your PDF content here, using the provided data -->
            <h1>Order Details</h1>
            <p>Hotel Name: ${hotelInfo.hotelName}</p>
            <p>Table Number: ${tableInfo.tableName}</p>
            <!-- ... Other details ... -->
            <p>Total: ${total.total}</p>
          </body>
        </html>
      `;

        // Generate PDF
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({ format: 'A4' });

        // Close the browser
        await browser.close();

        // Send the generated PDF as a response
        res.contentType('application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
