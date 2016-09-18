var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

//connection URL

var url = 'mongodb://localhost:27017/myproject';

//connect to server

MongoClient.connect(url, function(err, db) 
    {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      
      insertDocuments(db, function()
          {
            updateDocuments(db, function()
                {
                   db.close();
                });
          });
    });

var insertDocuments = function(db, callback)
  {
    //get documents collection
    var collection = db.collection('converted pdfs');
    //take the jsons
    collection.insertMany
      ([{a : 1}, {a : 2}, {a : 3}], 
       function(err, result)
        {
          assert.equal(err, null);
          assert.equal(3, result.result.n);
          assert.equal(3, result.ops.length);
          console.log("Inserted 3 pdfs into collection");
          callback(result);
        });
    //result contains result document from MongoDB
    //ops contains documents inserted with _id fields
    //cionnection is the connection used
  }
var findDocuments = function(db, callback)
  { //get the documents collection
    var collection = db.collection('converted pdfs');
    //find some documents
    collection.find({'a': 3}).toArray(function(err, docs)
        {
          assert.equal(err, null);
          console.log("Found the following files");
          console.log(docs);
          callback(docs);
        });
  }

var updateDocuments = function(db, callback)
  {//get the documents collection
    var collection = db.collection('converted pdfs');
    collection.updateOne({a : 2},
        { $set: {b : 1}}, function(err, result)
          {
            assert.equal(err,null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
          });
  }
          

  
