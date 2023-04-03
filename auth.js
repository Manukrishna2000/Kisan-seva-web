
    const ath = (req,res,next) =>{
        if(req.session.loginStatus){
        console.log(req.session.id);
          next()
        }else{
          res.redirect('/login')
        }
      }
module.exports={
    ath
}