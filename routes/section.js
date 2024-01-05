// routes/sectionRoutes.js
const express = require('express');
const Section = require('../models/Section');
const router = express.Router();

// Create a new section
router.post('/create', async (req, res) => {
    const { name } = req.body;

    try {
        const newSection = new Section({ name });
        const savedSection = await newSection.save();
        res.status(201).json(savedSection);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Edit an existing section
// router.patch('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, isDefault } = req.body;
  
//     try {
//       const sectionToUpdate = await Section.findById(id);
  
//       if (!sectionToUpdate) {
//         return res.status(404).json({ message: 'Section not found' });
//       }
  
//       // Update name and set isDefault to false
//       sectionToUpdate.name = name !== undefined ? name : sectionToUpdate.name;
//       sectionToUpdate.isDefault = false;
  
//       const updatedSection = await sectionToUpdate.save();
  
//       res.json(updatedSection);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, isDefault } = req.body;

  try {
      const sectionToUpdate = await Section.findById(id);

      if (!sectionToUpdate) {
          return res.status(404).json({ message: 'Section not found' });
      }

      // If isDefault is being set to true, update all other sections to false
      if (isDefault) {
          await Section.updateMany({ _id: { $ne: id } }, { $set: { isDefault: false } });
      }

      // Update name and isDefault
      sectionToUpdate.name = name !== undefined ? name : sectionToUpdate.name;
      sectionToUpdate.isDefault = isDefault !== undefined ? isDefault : sectionToUpdate.isDefault;

      const updatedSection = await sectionToUpdate.save();

      res.json(updatedSection);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

  
// Delete a section
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSection = await Section.findByIdAndDelete(id);
        res.json({ message: 'Section deleted successfully', deletedSection });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Get all sections API
router.get('/', async (req, res) => {
  try {
      const sections = await Section.find();
      res.json(sections);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



// Get single section by ID API
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const section = await Section.findById(id);

      if (!section) {
          return res.status(404).json({ message: 'Section not found' });
      }

      res.json(section);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});




module.exports = router;
