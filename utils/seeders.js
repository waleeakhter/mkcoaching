const adminModal = require('./Models/admin')

exports.seedAdmin = () => {
    const admin = { firstName: 'Admin', lastName: 'Admin', email: "admin@gmail.com", password: "admin123" }

    adminModal.countDocuments({}, function (err, count) {
        console.log('Number of Admin:', count)
        if (count === 0) {
            console.log('Admin Created successfuly');
            adminModal.create(admin, function (error, docs) {
                console.log(error, docs)
            })
        }
    })
}
