const bcrypt = require('bcrypt');
const UserModel = require('./../models/User');
const { signJWT } = require('./../utils/jwt');
const sendMail = require('./../utils/nodemailer');
const { resetPasswordMail } = require('./../utils/mailTemplates');
const otpGenerator = require('otp-generator');
const encrypter = require('./../utils/encrypter');


exports.getLogin = async (req, res, next) => {
    try {
        res.render('login', { form: {}, messages: { error: '' } });
    } catch (error) {
        console.log(error, '< error');
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const cred = req.body;
        const user = await UserModel.findOne({ email: cred.email });
        if (!user) {
            return res.render('login', { form: { email: user.email }, messages: { error: 'Invalid Email or Password' } });
        }

        user.comparePassword(cred.password, async (err, isMatched) => {
            if (err) {
                throw err;
            }
            if (!isMatched) {
                return res.render('login', { form: { email: user.email }, messages: { error: 'Invalid Email or Password' } });
            }
            let userRes = { ...user._doc };
            delete userRes.password;

            req.session.user = userRes;
            console.log(req.session)
            await req.session.save();

            res.redirect('/');

        });
    } catch (error) {
        console.log(error, '< error');
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        await req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        console.log(error, '< error');
        next(error);
    }
}

exports.createNewAccount = async (req, res, next) => {
    try {
        res.render('create-new-account', { form: {}, messages: {} });
    } catch (error) {
        console.log(error, '< error');
        next(error);
    }
}

exports.postCreateNewAccount = async (req, res, next) => {
    try {
        const user = req.body;

        const isExist = await UserModel.findOne({ email: user.email });

        if (!!isExist) {
            return res.render('create-new-account', { form: { email: user.email, name: user.name }, messages: { error: 'User Already Exists' } });
        }

        const newUser = new UserModel({ ...user });
        await newUser.save();
        let userRes = { ...newUser._doc };
        delete userRes.password;

        req.session.user = userRes;
        await req.session.save();

        res.redirect('/');

    } catch (error) {
        console.log(error, '< error');
        next(error);
    }
}

exports.getForgotPassword = async (req, res, next) => {
    try {
        res.render('forgot-password', { form: {}, messages: {} });
    } catch (error) {
        console.log(error, '< error');
        next(error);
    }
}

exports.postForgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.render('forgot-password', { form: { email: email }, messages: { error: 'Account does not exists' } });
        }

        let otp = otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets: false, digits: true });
        otp = otp.toString()
        //save otp 
        const saveStatus = await UserModel.updateOne({ email }, { $set: { resetPasswordOtp: otp } });

        const encString = await encrypter.encrypt(otp);

        // encrypt otp 
        const resetLink = `${process.env.DOMAIN}/reset-password/${Date.now()}}?token=${encString}`;
        const html = resetPasswordMail({ resetPasswordLink: resetLink })
        const status = await sendMail(email, 'Reset Password', html);
        console.log(status);
        //send email 
        //if user not exist then send error
        res.render('forgot-password', { form: {}, messages: { error: 'Mail Sent Successfully' } });
    } catch (error) {
        console.log(error, '< error');
        next(error);
    }
}


exports.getResetPassword = async (req, res, next) => {
    try {
        console.log(req.params.date);
        res.render('reset-password', { form: { token: req.query.token }, messages: {} });
    } catch (error) {
        console.log(error, '< error');
        next(error);
    }
}

exports.postResetPassword = async (req, res, next) => {
    try {
        const { email, token, password } = req.body;

        const otp = await encrypter.decrypt(token);
        console.log(password)
        const user = await UserModel.findOne({ email, resetPasswordOtp: otp });

        if (!user) {
            return res.render('reset-password', { form: { email: email }, messages: { error: 'Invalid Request' } });
        }
        //save otp 
        const saveStatus = await UserModel.updateOne({ email }, { $set: { resetPasswordOtp: null, password: password } });
        res.render('success', { form: {}, messages: { error: 'Password Reset Successfully' } });
   
} catch (error) {
    console.log(error, '< error');
    next(error);
}
}