const passport = require('passport');
const info = require('../service/info')
const logger = require('../utils/loggers/loggers')
const { Strategy: LocalStrategy } = require('passport-local');
const {passportRegisterConfig,
    passportLoginConfig,
    passportSerializerConfig,
    passportDesserializerConfig}=require('../service/passportConfig')
const UserFactory = require('../db/daos/UserFactoryDao')
const mimeType = require('mime-types')
const multer = require('multer')
const storage = multer.diskStorage({    
    destination:'./public/images',
    filename:function (req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}.${mimeType.extension(file.mimetype)}`)
    }
})
const upload = multer({
    storage:storage,
    limits:10000000,
    fileFilter:(req,file,cb)=>{
        console.log(file)
        const fileTypes = ['image/jpeg','image/png']
        if(fileTypes.includes(file.mimetype)){
            cb(null,true)}
        else{
            cb(new Error('solo archivos .jpeg o .png estan permitidos'))}
    }
})
const userDao = UserFactory.getDao()

// -------------------------PASSPORT---------------------------
passport.use('register', new LocalStrategy({passReqToCallback: true}, passportRegisterConfig));

passport.use('login', new LocalStrategy(passportLoginConfig));

passport.serializeUser(passportSerializerConfig);

passport.deserializeUser(passportDesserializerConfig);
// -------------------------/PASSPORT---------------------------

const getLoginOrHome = async (req,res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/user/home')
    } else {
        res.redirect("/user/login");
    }
}

const getRegister = async (req,res)=>{
    res.render('register')
}
const multerAvatar = upload.single('image')

const postPassportRegister =passport.authenticate('register', { failureRedirect: '/user/registerError', successRedirect: '/user/login' })

const postPassportLogin = passport.authenticate('login', { failureRedirect: '/user/loginError', successRedirect: '/user/home' })

const getRegisterError = async (req,res)=>{0
    logger.error('error de registro')
    res.render('registerError')
}

const getUserHome =async (req,res)=>{
    const user = userDao.getUser()
    // let user = await usuarios.find(usuario => usuario.username == req.user.username)
    // const user =await mongoDbUserContainer.getUser(req.uer.username)
    res.render('userHome',{user})
}

const getUserInfo = async (req,res)=>{
    const user = userDao.getUser()
    // let user = await usuarios.find(usuario => usuario.username == req.user.username)
    // const user =mongoDbUserContainer.getUser(req.user.username)
    res.render('userInfo',{user})
}

const getIndex = async (req,res)=>{
    res.render('index')
}

const getLoginError = async (req,res)=>{
    logger.error('error de logeo')
    res.render('loginError')
}

const getLogout = async (req, res,next) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/user/login");
    });
}

const getSystemInfo = async (req,res)=>{
    let inf = info
    res.render('info',inf)
}

module.exports={getSystemInfo,
    getLogout,
    getLoginError,
    getIndex,
    getUserInfo,
    getUserHome,
    getRegisterError,
    postPassportLogin,
    postPassportRegister,
    multerAvatar,
    getRegister,
    getLoginOrHome}