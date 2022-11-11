const CustomAPIError=require('./custom-error')
const BadRequestError=require('./BadRequest')
const UnauthenticatedError=require('./unauthorised')
const NotFoundError=require('./not-found')


module.exports={
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFoundError
}