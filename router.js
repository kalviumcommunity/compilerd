const express = require('express');
const app = express();  
const codeRouter = require('./routers/code.router');

app.use('/', codeRouter);  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

/*const express = require('express')
const router = express.Router()

const codeRouter = require('./routers/code.router')

router.use('/', codeRouter)

module.exports = router
*/
