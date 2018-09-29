let express = require("express");
let app = express();

app.use(express.static("./static"));

app.listen(8080, function(){
    console.log("Serving at 8080")
});
