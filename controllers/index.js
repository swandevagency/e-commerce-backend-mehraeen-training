const addproduct = require('./createProduct/index')
const register = require('./register/index')
const login = require('./login/index')
const createAdmin = require('./createAdmin/index')
const getAdminsInfo = require('./getAdminsInfo/index.')
const editAdmin = require('./editAdmin/index')
const personalAdminInfo = require('./personalAdminInfo/index')
const deletingAdmin = require('./deletingAdmin/index')
const addProductImage = require('./addProductImage/index')
const deleteProductImg = require('./deleteProductImage/index')






module.exports = {
    addproduct,
    register,
    login,
    createAdmin,
    getAdminsInfo,
    editAdmin,
    personalAdminInfo,
    deletingAdmin,
    addProductImage,
    deleteProductImg
}