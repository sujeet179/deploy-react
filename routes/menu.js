// // routes/menuRoutes.js
// const express = require('express');
// const Menu = require('../models/Menu');
// const MainCategory = require('../models/MainCategory');
// const { upload } = require('../multerConfig');
// const router = express.Router();
// const xlsx = require('xlsx'); // Add this line



// router.post('/:mainCategoryId/assignmenus', async (req, res) => {
//     const { mainCategoryId } = req.params;
//     const { menuIds } = req.body;

//     try {
//         // Find the MainCategory by ID
//         const mainCategory = await MainCategory.findById(mainCategoryId);

//         if (!mainCategory) {
//             return res.status(404).json({ message: 'MainCategory not found' });
//         }

//         // Find the menus by their IDs
//         const menus = await Menu.find({ _id: { $in: menuIds } });

//         // Filter out existing menus
//         const newMenus = menus.filter(menu => !mainCategory.menus.some(existingMenu => existingMenu._id.equals(menu._id)));

//         // Concatenate the existing menus with the selected menus
//         mainCategory.menus = [...mainCategory.menus, ...newMenus.map(menu => ({
//             _id: menu._id,
//             name: menu.name,
//             price: menu.price,
//             imageUrl: menu.imageUrl,
//         }))];

//         // Save the updated MainCategory
//         const updatedMainCategory = await mainCategory.save();

//         res.status(200).json(updatedMainCategory);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.get('/:mainCategoryId', async (req, res) => {
//     const { mainCategoryId } = req.params;

//     try {
//         // Find the MainCategory by ID
//         const mainCategory = await MainCategory.findById(mainCategoryId);

//         if (!mainCategory) {
//             return res.status(404).json({ message: 'MainCategory not found' });
//         }

//         res.status(200).json(mainCategory);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


// router.post('/menu', upload.single('image'), async (req, res) => {
//     const { name, price, uniqueId } = req.body;

//     try {
//         const menu = await Menu.findOne({ name: name });

//         if (menu) {
//             return res.status(404).json({ message: 'Menu already exists' });
//         }

//         // Get the file path (if an image was uploaded)
//         const imageUrl = req.file ? req.file.path : undefined;

//         const newMenu = new Menu({
//             name,
//             price,
//             imageUrl,
//             uniqueId
//         });

//         const savedMenu = await newMenu.save();
//         res.status(201).json(savedMenu);
//     } catch (err) {
//         if (err.code === 11000 && err.keyPattern && err.keyPattern.name === 1) {
//             // Duplicate key error (name)
//             return res.status(400).json({ message: 'Menu with the same name already exists' });
//         }
//         res.status(400).json({ message: err.message });
//     }
// });



// // Add a new route for deleting menus from the selected category
// router.delete('/:mainCategoryId/removemenus', async (req, res) => {
//     const { mainCategoryId } = req.params;
//     const { menuIds } = req.body;

//     try {
//         // Find the MainCategory by ID
//         const mainCategory = await MainCategory.findById(mainCategoryId);

//         if (!mainCategory) {
//             return res.status(404).json({ message: 'MainCategory not found' });
//         }

//         // Filter out the menus with the specified IDs
//         mainCategory.menus = mainCategory.menus.filter(menu => !menuIds.includes(menu._id.toString()));

//         // Save the updated MainCategory
//         const updatedMainCategory = await mainCategory.save();

//         res.status(200).json(updatedMainCategory);
//     } catch (error) {
//         console.error('Error removing menus:', error);
//         res.status(500).json({ message: error.message });
//     }
// });



// router.patch('/menus/:menuId', upload.single('image'), async (req, res) => {
//     const { menuId } = req.params;
//     const { name, price } = req.body;

//     try {
//         const updatedMenu = await Menu.findByIdAndUpdate(menuId, {
//             name,
//             price,
//             ...(req.file && { imageUrl: req.file.path }), // Update image if provided
//         }, { new: true }); // Return the updated document

//         res.status(200).json(updatedMenu);
//     } catch (err) {
//         if (err.code === 11000 && err.keyPattern && err.keyPattern.name === 1) {
//             // Duplicate key error (name)
//             return res.status(400).json({ error: 'Menu with the same name already exists' });
//         }
//         res.status(400).json({ error: err.message });
//     }
// });


// // Delete menus API 
// router.delete('/menus/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const menuToDelete = await Menu.findByIdAndDelete(id);

//         if (!menuToDelete) {
//             return res.status(404).json({ message: 'Menu not found' });
//         }

//         const mainCategoryId = menuToDelete.mainCategory ? menuToDelete.mainCategory._id : null;

//         // If the menu was associated with a main category, remove menu reference from main category
//         if (mainCategoryId) {
//             const mainCategory = await MainCategory.findById(mainCategoryId);

//             if (mainCategory) {
//                 mainCategory.menus = mainCategory.menus.filter(
//                     (menu) => menu._id.toString() !== id.toString()
//                 );
//                 await mainCategory.save();
//             }
//         }

//         res.json({ message: 'Menu deleted successfully' });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });


// // Get ALl menus
// router.get('/menus/list', async (req, res) => {
//     try {
//         const menus = await Menu.find();
//         res.json(menus);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });



// // Get Single Menu API
// router.get('/menus/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const menu = await Menu.findById(id);

//         if (!menu) {
//             return res.status(404).json({ message: 'Menu not found' });
//         }

//         res.json(menu);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });




// router.get('/menulist/:id', async (req, res) => {
//     try {
//         const mainCategoryId = req.params.id;
//         const menus = await Menu.find({ 'mainCategory._id': mainCategoryId });
//         res.json(menus);
//     } catch (error) {
//         console.error('Error fetching menus:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



// router.post('/upload-excel', upload.single('file'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const filePath = req.file.path;
//         const workbook = xlsx.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         // Assuming your Excel sheet has columns named 'name' and 'price'
//         const jsonData = xlsx.utils.sheet_to_json(sheet);

//         // Save the data to MongoDB's menu collection
//         const savedMenus = await Menu.create(jsonData);

//         res.status(200).json({ message: 'Data uploaded successfully', savedMenus });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router;





const express = require('express');
const Menu = require('../models/Menu');
const MainCategory = require('../models/MainCategory');
const { upload } = require('../multerConfig');
const router = express.Router();
const xlsx = require('xlsx'); // Add this line


// router.post('/:mainCategoryId/menus', upload.single('image'), async (req, res) => {
//     const { mainCategoryId } = req.params;
//     const { name, price } = req.body;

//     try {
//         const mainCategory = await MainCategory.findById(mainCategoryId);

//         if (!mainCategory) {
//             return res.status(404).json({ message: 'Main category not found' });
//         }

//         // Get the file path (if an image was uploaded)
//         const imageUrl = req.file ? req.file.path : undefined;

//         const newMenu = new Menu({
//             name,
//             price,
//             mainCategory: {
//                 _id: mainCategory._id,
//                 name: mainCategory.name,
//             },
//             imageUrl,
//         });

//         const savedMenu = await newMenu.save();

//         // Update the main category's menus array with the new menu details
//         mainCategory.menus.push({
//             _id: savedMenu._id,
//             name,
//             price,
//             imageUrl
//         });
//         await mainCategory.save();

//         res.status(201).json(savedMenu);
//     } catch (err) {
//         if (err.code === 11000 && err.keyPattern && err.keyPattern.name === 1) {
//             // Duplicate key error (name)
//             return res.status(400).json({ message: 'Menu with the same name already exists' });
//         }
//         res.status(400).json({ message: err.message });
//     }
// });



router.post('/:mainCategoryId/assignmenus', async (req, res) => {
    const { mainCategoryId } = req.params;
    const { menuIds } = req.body;

    try {
        // Find the MainCategory by ID
        const mainCategory = await MainCategory.findById(mainCategoryId);

        if (!mainCategory) {
            return res.status(404).json({ message: 'MainCategory not found' });
        }

        // Find the menus by their IDs
        const menus = await Menu.find({ _id: { $in: menuIds } });

        // Filter out existing menus
        const newMenus = menus.filter(menu => !mainCategory.menus.some(existingMenu => existingMenu._id.equals(menu._id)));

        // Concatenate the existing menus with the selected menus
        mainCategory.menus = [...mainCategory.menus, ...newMenus.map(menu => ({
            _id: menu._id,
            name: menu.name,
            price: menu.price,
            imageUrl: menu.imageUrl,
        }))];

        // Save the updated MainCategory
        const updatedMainCategory = await mainCategory.save();

        res.status(200).json(updatedMainCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:mainCategoryId', async (req, res) => {
    const { mainCategoryId } = req.params;

    try {
        // Find the MainCategory by ID
        const mainCategory = await MainCategory.findById(mainCategoryId);

        if (!mainCategory) {
            return res.status(404).json({ message: 'MainCategory not found' });
        }

        res.status(200).json(mainCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.post('/menu', upload.single('image'), async (req, res) => {
//     const { name, price,uniqueId } = req.body;

//     try {
//         const menu = await Menu.findOne({ name: name });

//         if (menu) {
//             return res.status(404).json({ message: 'Menu already exists' });
//         }

//         // Get the file path (if an image was uploaded)
//         const imageUrl = req.file ? req.file.path : undefined;

//         const newMenu = new Menu({
//             name,
//             price,
//             imageUrl,
//             uniqueId,
//         });

//         const savedMenu = await newMenu.save();
//         res.status(201).json(savedMenu);
//     } catch (err) {
//         if (err.code === 11000 && err.keyPattern && err.keyPattern.name === 1) {
//             // Duplicate key error (name)
//             return res.status(400).json({ message: 'Menu with the same name already exists' });
//         }
//         res.status(400).json({ message: err.message });
//     }
// });

router.post('/menu', upload.single('image'), async (req, res) => {
    const { name, price, uniqueId } = req.body;

    try {
        // Check if a menu with the same name exists
        const existingMenuByName = await Menu.findOne({ name: name });

        if (existingMenuByName) {
            return res.status(400).json({ message: 'Menu with the same name already exists' });
        }

        // Check if a menu with the same uniqueId exists
        const existingMenuByUniqueId = await Menu.findOne({ uniqueId: uniqueId });

        if (existingMenuByUniqueId) {
            return res.status(400).json({ message: 'Menu with the same uniqueId already exists' });
        }

        // Get the file path (if an image was uploaded)
        const imageUrl = req.file ? req.file.path : undefined;

        const newMenu = new Menu({
            name,
            price,
            imageUrl,
            uniqueId,
        });

        const savedMenu = await newMenu.save();
        res.status(201).json(savedMenu);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.name === 1) {
            // Duplicate key error (name)
            return res.status(400).json({ message: 'Menu with the same name already exists' });
        }
        res.status(400).json({ message: err.message });
    }
});


// Add a new route for deleting menus from the selected category
router.delete('/:mainCategoryId/removemenus', async (req, res) => {
    const { mainCategoryId } = req.params;
    const { menuIds } = req.body;

    try {
        // Find the MainCategory by ID
        const mainCategory = await MainCategory.findById(mainCategoryId);

        if (!mainCategory) {
            return res.status(404).json({ message: 'MainCategory not found' });
        }

        // Filter out the menus with the specified IDs
        mainCategory.menus = mainCategory.menus.filter(menu => !menuIds.includes(menu._id.toString()));

        // Save the updated MainCategory
        const updatedMainCategory = await mainCategory.save();

        res.status(200).json(updatedMainCategory);
    } catch (error) {
        console.error('Error removing menus:', error);
        res.status(500).json({ message: error.message });
    }
});



// Edit Menu API
// router.patch('/menus/:menuId', upload.single('image'), async (req, res) => {
//     const { menuId } = req.params;
//     const { name, price, mainCategoryId } = req.body;

//     try {
//         const mainCategory = await MainCategory.findById(mainCategoryId);

//         if (!mainCategory) {
//             return res.status(404).json({ error: 'Main category not found' });
//         }

//         const updatedMenu = await Menu.findByIdAndUpdate(menuId, {
//             name,
//             price,
//             mainCategory: {
//                 _id: mainCategory._id,
//                 name: mainCategory.name,
//             },
//             ...(req.file && { imageUrl: req.file.path }), // Update image if provided
//         }, { new: true }); // Return the updated document

//         // Update the corresponding main category's menus array
//         if (mainCategoryId !== updatedMenu.mainCategory._id.toString()) {
//             await MainCategory.findByIdAndUpdate(updatedMenu.mainCategory._id, {
//                 $pull: { menus: { _id: updatedMenu._id } },
//             });

//             mainCategory.menus.push({
//                 _id: updatedMenu._id,
//                 name: updatedMenu.name,
//                 price: updatedMenu.price,
//                 imageUrl: updatedMenu.imageUrl,
//             });
//             await mainCategory.save();
//         }

//         res.status(200).json(updatedMenu);
//     } catch (err) {
//         if (err.code === 11000 && err.keyPattern && err.keyPattern.name === 1) {
//             // Duplicate key error (name)
//             return res.status(400).json({ error: 'Menu with the same name already exists' });
//         }
//         res.status(400).json({ error: err.message });
//     }
// });

// router.patch('/menus/:menuId', upload.single('image'), async (req, res) => {
//     const { menuId } = req.params;
//     const { name, price, uniqueId } = req.body;

//     try {
//         const updatedMenu = await Menu.findByIdAndUpdate(menuId, {
//             name,
//             price,
//             uniqueId,
//             ...(req.file && { imageUrl: req.file.path }), // Update image if provided
//         }, { new: true }); // Return the updated document

//         res.status(200).json(updatedMenu);
//     } catch (err) {
//         if (err.code === 11000 && err.keyPattern && err.keyPattern.name === 1) {
//             // Duplicate key error (name)
//             return res.status(400).json({ error: 'Menu with the same name already exists' });
//         }
//         res.status(400).json({ error: err.message });
//     }
// });

router.patch('/menus/:menuId', upload.single('image'), async (req, res) => {
    const { menuId } = req.params;
    const { name, price, uniqueId } = req.body;
  
    try {
      const existingMenu = await Menu.findOne({ uniqueId });
      if (existingMenu && existingMenu._id.toString() !== menuId) {
        // Duplicate uniqueId found
        return res.status(400).json({ error: 'Menu with the same uniqueId already exists' });
      }
  
      const updatedMenu = await Menu.findByIdAndUpdate(
        menuId,
        {
          name,
          price,
          uniqueId,
          ...(req.file && { imageUrl: req.file.path }), // Update image if provided
        },
        { new: true } // Return the updated document
      );
  
      res.status(200).json(updatedMenu);
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000 && err.keyPattern && err.keyPattern.uniqueId === 1) {
        // Duplicate key error (uniqueId)
        return res.status(400).json({ error: 'Menu with the same uniqueId already exists' });
      }
      res.status(400).json({ error: err.message });
    }
  });
  

// Delete menus API 
router.delete('/menus/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const menuToDelete = await Menu.findByIdAndDelete(id);

        if (!menuToDelete) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        const mainCategoryId = menuToDelete.mainCategory ? menuToDelete.mainCategory._id : null;

        // If the menu was associated with a main category, remove menu reference from main category
        if (mainCategoryId) {
            const mainCategory = await MainCategory.findById(mainCategoryId);

            if (mainCategory) {
                mainCategory.menus = mainCategory.menus.filter(
                    (menu) => menu._id.toString() !== id.toString()
                );
                await mainCategory.save();
            }
        }

        res.json({ message: 'Menu deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Get ALl menus
router.get('/menus/list', async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Get Single Menu API
router.get('/menus/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.get('/menulist/:id', async (req, res) => {
    try {
        const mainCategoryId = req.params.id;
        const menus = await Menu.find({ 'mainCategory._id': mainCategoryId });
        res.json(menus);
    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/upload-excel', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Assuming your Excel sheet has columns named 'name' and 'price'
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        // Save the data to MongoDB's menu collection
        const savedMenus = await Menu.create(jsonData);

        res.status(200).json({ message: 'Data uploaded successfully', savedMenus });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router