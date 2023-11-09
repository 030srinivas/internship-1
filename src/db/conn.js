const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/task1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(`No connection: ${e}`);
});

// const dbUrl="mongodb+srv://srinivas:6iCgyWs00wbWUTSQ@cluster0.d67heqg.mongodb.net/?retryWrites=true&w=majority"
// const connectionparams={
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }
// mongoose.connect(dbUrl,connectionparams).then(() => {
//     console.log(`Connection successful`);
// }).catch((e) => {
//     console.error(`Connection failed: ${e.message}`);
// });




