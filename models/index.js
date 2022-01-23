const mongoose = require('mongoose');
const adminSchema = require('./admins/index');
const carouselSchema = require('./carousel/index');
const categorySchema = require('./categories/index');
const productSchema = require('./products/index');
const userSchema = require('./users/index');
const unUsedImageSchema = require('./unUsedimages/index')
const homepageSchema = require('./Homepage/index')
const subCategorySchema = require('./subCategories/index')
const filterSchema = require('./Filters/index')

mongoose.model('Admin', adminSchema);
mongoose.model('Carousel', carouselSchema);
mongoose.model('Category', categorySchema);
mongoose.model('Product', productSchema );
mongoose.model('User',userSchema)
mongoose.model('UnUsedImages',unUsedImageSchema)
mongoose.model('Homepage',homepageSchema)
mongoose.model('subCategory',subCategorySchema)
mongoose.model('Filter',filterSchema)