
const createErrorMsg=(errorStatus,errMessage)=>{
    const err=new Error()
   err.message =errMessage
   err.status=errorStatus
    return err
}
module.exports=createErrorMsg