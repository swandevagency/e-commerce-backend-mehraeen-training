const isAdmin = require('./adminsLogin/index')
const isUserAuthenticated = require('./usersLogin/index')
const isOwner = require('./ownerLogin/index')

module.exports = {
    isAdmin,
    isUserAuthenticated,
    isOwner
}

