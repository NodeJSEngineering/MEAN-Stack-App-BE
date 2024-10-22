// Database name: EmployeeDB

// Collection name: Employee

// Documents
// {
//             {Employeeid : 1, Employee Name : Guru99},
//             {Employeeid : 2, Employee Name : Joe},
//             {Employeeid : 3, Employee Name : Martin},
// }

const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log(err, 'error');
});

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  const db = client.db("angular"); //angular7crud
  const collName = "Employee";
  if (err) throw err;

  db.collections(collName, function (err, names) {
    const exist = names.length > 0;
    console.log("Exists: ", names.length > 0);
    if (!exist) {
      db.createCollection("Employee", function (err, res) {
        console.log(err, 'err');
        if (err) throw err;
        console.log("Collection created!");
        console.log(res.insertedCount, "works in insertmany");
      });
      console.log('test');
      const userSchema = mongoose.Schema(
        {
          email: String,
        },
        { timestamps: true }
      );
      const User = mongoose.model("User", userSchema);

    }
  });
  // db.stats().then((res)=>{
  //   console.log("stats", res);

  // })
  // db.dropDatabase().then((res)=>{
  //     console.log("dropDatabase", res);
  
  //   })

  //   db.collection("Employee").insert(
  //   {
  //     Employeeid: 5,
  //     EmployeeName: "NewE",
  //   },
  //   function (err, res) {
  //     console.log(err, 'insert');
  //     if (err) throw err;
  //   }
  // );

  //     db.collection("Employee").save(
  //   {
  //     Employeeid: 56,
  //     EmployeeName: "NewEbdf",
  //   },
  //   function (err, res) {
  //     console.log(err, 'save');
  //     if (err) throw err;
  //   }
  // );

  // db.collection("Employee").updateOne(
  //   {
  //     EmployeeName: "NewEmployee",
  //   },
  //   {
  //     $set: {
  //       EmployeeName: "Mohan",
  //     },
  //   }
  // );

  // db.collection("Employee").insertOne(
  //   {
  //     Employeeid: 4,
  //     EmployeeName: "NewEmployee",
  //   },
  //   function (err, res) {
  //     console.log(err, 'insertOne');
  //     if (err) throw err;
  //   }
  // );

  // db.collection("Employee").deleteOne({
  //   EmployeeName: "Mohan",
  // });

  // db.collection("Employee").findOne({}, function (err, result) {
  //   console.log(err, 'result');
  //   if (err) throw err;

  // });

  // db.collection("Employee")
  //   .find({})
  //   .toArray(function (err, result) {
  //           console.log(result, err, 'err');
  //     if (err) throw err;
  //   });


  //    db.collection("User").save(
  //   {
  //     email: "test@google.com"
  //   },
  //   function (err, res) {
  //     console.log(err, 'User save');
  //     if (err) throw err;
  //   }
  // );

  //  db.collection("User")
  //   .find({})
  //   .toArray(function (err, result) {
  //           console.log(result, err, 'User err');
  //     if (err) throw err;
  //   });


  
});
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app=express()

dotenv.config()

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_TOKEN);
      console.log("Connected to Database");
    } catch (e) {
      throw e;
    }
  };

  mongoose.connection.on("connected", () => {
    console.log("mongodb connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
  });

app.listen(5000, () => {
    connect();
    console.log("server listening on port number 5000");
  });