const createProduct = require('./createProduct/index')
const register = require('./register/index')
const login = require('./login/index')
const createAdmin = require('./createAdmin/index')
const getAdminsInfo = require('./getAdminsInfo/index.')
const editAdmin = require('./editAdmin/index')
const personalAdminInfo = require('./personalAdminInfo/index')
const deletingAdmin = require('./deletingAdmin/index')
const addProductImage = require('./addProductImage/index')
const deleteProductImg = require('./deleteProductImage/index')
const createCategory = require('./createcategory/index')
const deleteCategory = require('./deleteCategory/index')
const editCategory = require('./editCategory/index')
const fetchCategories = require('./fetchCategories/index')
const productsInfo = require('./productsInfo/index')
const deleteProduct = require('./deleteProduct/index')
const editProduct = require('./editProduct/index')
const sendImage = require('./sendImage/index')
const addCarouselImage = require('./addCarouselImage/index')
const carouselInfo = require('./carouselInfo/index')
const deleteCarouselImage = require('./deleteCarouselImage/index')
const editCarousel = require('./editCarousel/index')
const singleProductInfo = require('./singleProductInfo/index')
const editTitle = require('./editTitle/index')
const editAdminPersonalInfo = require('./editAdminPersonalInfo/index')
const addUserFavoriteProduct = require('./addUserFavoriteProduct/index')
const getUsersInfo = require('./getUsersInfo/index')
const createSubCategory = require('./createSubCategory/index')
const addFilter = require('./addFilter/index')






module.exports = {
    createProduct,
    register,
    login,
    createAdmin,
    getAdminsInfo,
    editAdmin,
    personalAdminInfo,
    deletingAdmin,
    addProductImage,
    deleteProductImg,
    createCategory,
    deleteCategory,
    editCategory,
    fetchCategories,
    productsInfo,
    deleteProduct,
    editProduct,
    sendImage,
    addCarouselImage,
    carouselInfo,
    deleteCarouselImage,
    editCarousel,
    singleProductInfo,
    editTitle,
    editAdminPersonalInfo,
    addUserFavoriteProduct,
    getUsersInfo,
    createSubCategory,
    addFilter
}