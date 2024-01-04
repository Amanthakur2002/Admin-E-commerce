const express = require('express');
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors({
   origin: ["http://localhost:5173","*", "http://localhost:3001", "http://localhost:3002", "http://localhost:3004", "http://localhost:3000", ["http://localhost:5174"]],
   methods: ["POST", "GET" , "PATCH" , "PUT"],
   credentials: true
    ,httpOnly: true
}));


const EcomRouter = require('./routes/users/users')
const roleRouter = require('./routes/role/role')
const roleAssignRouter = require('./routes/roleAssign/roleAssign')
const userProfileRouter = require('./routes/userprofile/userprofile');
const category = require('./routes/category/category');
const subcategory = require('./routes/subcategory/subcategory');

app.use('/api/admin', EcomRouter);
app.use('/api/admin', roleRouter);
app.use('/api/admin', roleAssignRouter);
app.use('/api/admin', userProfileRouter);
app.use('/api/admin', category);
app.use('/api/admin', subcategory);

const port = 3900;
 app.listen(port,() =>{
    console.log(`Server running on port ${port}`);

 });