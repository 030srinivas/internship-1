
const express = require("express");
const path = require("path");
const app = express();
require("./db/conn.js");
const Register =require("./models/add_user.js")
const Ticket =require("./models/ticketgen.js")



const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
app.use(express.json());

app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}))

// Configure the "hbs" template engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs"); // Provide the correct file extension ".hbs" for the view template
   
});
app.get("/Add_User", (req, res) => {
    res.render("Add_User.ejs"); // Provide the correct file extension ".hbs" for the view template
   
});

//create a new user in database
// app.post("/add_user", async(req, res) => {
//     try{
//     //  console.log(req.body.name);  
//     //  res.send(req.body.name);
//     const registerEmployee = new Register({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password,
//         Mobile_Number:req.body.Mobile_Number,
//         city:req.body.city,
//         state:req.body.state,
//         pin:req.body.pin,

//     })  

//     const registered = await registerEmployee.save();
//     res.status(201).render("index");

//     }catch(error){
//         res.status(400).send(error);
//     }
   
// });
 

app.post("/add_user", async(req, res) => {
    try {
      const registerEmployee = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        Mobile_Number: req.body.Mobile_Number,
        city: req.body.city,
        state: req.body.state,
        pin: req.body.pin,
      });
  
      const registered = await registerEmployee.save();
      const updatedData1 = await Register.find({});
      res.status(201).render("List_USer", { data: updatedData1 });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
app.get("/Change-login", (req, res) => {
    res.render("Change-login.ejs"); 
   
});

app.get('/history', (req, res) => {
    res.render('history');
  });
  

app.get("/List_USer", (req, res) => {
    res.render("List_USer.ejs"); 
});

app.get('/List_USer', (req, res) => {
    YourModel.find({}, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        res.render('List_USer', { data: data });
      }
    });
  });







app.get("/login", (req, res) => {
    res.render("login.ejs"); 
   
});
// login check

app.post("/login", async(req, res) => {
    // res.render("login.hbs");
    try {
        const email = req.body.email;
        const password = req.body.password

        const useremail= await Register.findOne({ email:email});// check same email
    //    res.send(useremail.password); 
    //    console.log(useremail)

       if(useremail.password === password){
        res.status(201).render("ticket")
       }else{
        res.send("Invalid email")
       }

    } catch (error) {
        res.status(400).send("Internal Server Error: ${error.message}");
    }


});


app.get("/Management", (req, res) => {
    res.render("Management.ejs");
   
});
app.get("/listtickets", (req, res) => {
  Ticket.find({}, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.render('listtickets', { tickets: data });
    }
  });
   // res.render("listtickets.ejs");
   
});

app.post('/approve-ticket/:id', (req, res) => {
    const ticketId = req.params.id;
    Ticket.findByIdAndUpdate(
      ticketId,
      { isApproved: true, approvedBy: 'SomeUser' }, 
      (err, updatedTicket) => {
        if (err) {
          console.error(err);
          
        } else {
          
          res.redirect('/list_tickets');
        }
      }
    );
  });
  
  app.post('/disapprove-ticket/:id', (req, res) => {
    const ticketId = req.params.id;
  
   
    Ticket.findByIdAndUpdate(
      ticketId,
      { isApproved: false, approvedBy: null },
      (err, updatedTicket) => {
        if (err) {
          console.error(err);
         
        } else {
          
          res.redirect('/list_tickets'); 
        }
      }
    );
  });
  


app.get("/Remove_User", (req, res) => {
    res.render("Remove_User.ejs"); 
   
});
app.get("/ticket", (req, res) => {
    res.render("ticket.ejs");
   
});




// app.post("/ticket", async(req, res) => {
//     try{
//     //  console.log(req.body.name);  
//     //  res.send(req.body.name);
//     const ticketemp = new Ticket({
//         tic:req.body.tic,
//         naam:req.body.naam,
//         id:req.body.id,
//         raise:req.body.raise,
//         doc:req.body.doc,
//         date:req.body.date

//     })  

//     const ticketed = await ticketemp.save();
//     res.status(201).render("history");


//     }catch(error){
//         res.status(400).send(error);
//     }
   

// });

app.post("/ticket", async (req, res) => {
    try {
      const ticketemp = new Ticket({
        tic: req.body.tic,
        naam: req.body.naam,
        id: req.body.id,
        raise: req.body.raise,
        doc: req.body.doc,
        date: req.body.date,
      });
  
      const ticketed = await ticketemp.save();
      const updatedData = await Ticket.find({});
      res.status(201).render("history", { data: updatedData });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

// app.get('/ticket', async (req, res) => {
//     try {
//       const data = await Ticket.find({});
//       res.render('List_USer',{data});
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
