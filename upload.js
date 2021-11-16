// upload route

const { Timestamp } = require("bson");

// /upload
const uploadFunction = (req, res) => {
    // upload logic
    const imageURL = 'aslidkjf';
    // return a jwt to the user
    const jwt = 'aslfkdjhsad';
    // saving the images url in the database
    const unusedImages = mongoose.mongoose('IMG_TO_Delete')
    //Timestamp: true;
    const image = new unusedImages ({
        imageURL,
        user: req.user
    });

    //returning the jwt to the user

    res.status(200).send({
        jwt,
        url
    });

};

// upload middleware

const middleware = (req, res, next) => {

    //check if the image url doesn't exist
    const image = someLogic;
    if(!image) {
        return;
    }

    // making sure that the jwt is valid
    const jwtIsValid = someKososherLogic;
    if(!jwtIsValid) {
        return;
    };

    next();

}

const yo = {
    productImage: "slakjdflksadlkfjsadlkfj",
    title: "a;lskdjfas",


}