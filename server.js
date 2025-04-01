require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
// const { User } = require('./models');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());


// Test Route
// app.get('/', (req, res) => {
//     res.send('Language Learning API');
// });

// Add test user route
// app.post('/api/test-user', async (req, res) => {
//     try {
//         const user = await User.create(req.body, {
//             validate: true,
//             returning: true,
//             individualHooks: true
//         }).catch(error => {
//             console.error('Validation errors:', JSON.stringify(error.errors, null, 2));
//             throw error;
//         });

//         res.status(201).json(user);
//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: error.message,
//             errors: error.errors?.map(e => ({
//                 path: e.path,
//                 message: e.message,
//                 value: e.value
//             }))
//         });
//     }
// });

app.use('/', routes);

// Add error handling middleware at the end:
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});