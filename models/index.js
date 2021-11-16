const mongoose = require('mongoose');
const adminSchema = require('./admins/index');
const carouselSchema = require('./carousel/index');
const categorySchema = require('./Categorys/index');
const productSchema = require('./products/index');
const userSchema = require('./users/index');
const unUsedImageSchema = require('./unUsedimages/index')

mongoose.model('Admin', adminSchema);
mongoose.model('Carousel', carouselSchema);
mongoose.model('Category', categorySchema);
mongoose.model('Product', productSchema );
mongoose.model('User',userSchema)
mongoose.model('UnUsedImages',unUsedImageSchema)
