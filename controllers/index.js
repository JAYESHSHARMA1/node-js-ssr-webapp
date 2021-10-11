const UserModel = require('./../models/User');



exports.index = async (req, res, next) => {
    try {
        res.render('index', { title: 'Express', messages: { success: '' }, user: req.session.user });
    } catch (error) {
        console.log(error, '< error');
        next(error);

    }
}

exports.getStocks = async (req, res, next) => {
    try {
        const stocks = [];
        res.render('stocks', { stocks, messages: { success: '' }, user: req.session.user });
    } catch (error) {
        console.log(error, '< error');
        next(error);

    }
}

exports.getMyStocks = async (req, res, next) => {
    try {
        const stocks = [];
        res.render('mystocks', { stocks, messages: { success: '' }, user: req.session.user });
    } catch (error) {
        console.log(error, '< error');
        next(error);

    }
}

exports.getUploadStockFile = async (req, res, next) => {
    try {
        res.render('upload-stocks-file', { messages: { success: '' }, user: req.session.user });
    } catch (error) {
        console.log(error, '< error');
        next(error);

    }
}

exports.postUploadStockFile = async (req, res, next) => {
    try {
        res.render('upload-stocks-file', { messages: { success: '' }, user: req.session.user });
    } catch (error) {
        console.log(error, '< error');
        next(error);

    }
}


exports.getProfile =async (req, res, next) => {
    try {
        res.render('profile', { messages: { success: '' }, user: req.session.user });
    } catch (error) {
        console.log(error, '< error');
        next(error);

    }
}

exports.postProfile = async (req, res, next) => {
    try {
        const {type} = req.body;

        if(type === 'changePassword'){
            const {currentPassword,newPassword} = req.body;
            const existingUser = await UserModel.findOne({ _id:req.session.user._id });
            existingUser.comparePassword(currentPassword, async (err, isMatched) => {
                if (err) {
                    throw err;
                }
                if (!isMatched) {
                    return res.render('profile', { messages: { error: 'Invalid Current Password' }, user: req.session.user });
                }
                
                const updateStatus = await UserModel.updateOne({_id:req.session.user._id},{$set:{password:newPassword}});
                if(updateStatus.nModified)
                return res.render('profile', { messages: { success: 'Password Changed Successfully' }, user: req.session.user });
    
            });

        }
        res.render('profile', { messages: { success: '' }, user: req.session.user });
    } catch (error) {
        console.log(error, '< error');
        next(error);

    }
}
