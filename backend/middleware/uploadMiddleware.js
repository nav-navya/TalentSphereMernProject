import multer from 'multer';
import cloudinary from '../config/cloudinary.js'; 
// import CloudinaryStorage from '@cloudinary/multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary'; // ✅ Use named import



const storage = new CloudinaryStorage({
  cloudinary :cloudinary,
  params:{
    folder:'images',
    allowed_formats:['jpg','jpeg','png','gif','webp']
  }

})

const upload = multer({storage:storage})

export default upload




// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary'; // ✅ Use named import
// import cloudinary from '../config/cloudinary.js'; 

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'images',
//     format: async (req, file) => file.mimetype.split('/')[1], // ✅ Set format dynamically
//     public_id: (req, file) => file.originalname.split('.')[0] // ✅ Keep original filename (without extension)
//   }
// });

// const upload = multer({ storage });

// export default upload;
