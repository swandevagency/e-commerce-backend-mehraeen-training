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
    editProduct
}