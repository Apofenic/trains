
    var config = {
    apiKey: "AIzaSyCng7UAq0PyC7oAD6t4B1s-K3RnWYJ4d5U",
    authDomain: "train-schedule-bc454.firebaseapp.com",
    databaseURL: "https://train-schedule-bc454.firebaseio.com",
    storageBucket: "train-schedule-bc454.appspot.com",
    messagingSenderId: "228305324162"
  };
  firebase.initializeApp(config);

    var dataRef = firebase.database();

    
    var name = "";
    var Destination= "";
    var firstTrain = "00:00";
    var frequency = 0;

   
    $("#addTrain").on("click", function(event) {
      
        event.preventDefault();

      
        name = $("#nameInput").val().trim();
        destination = $("#destInput").val().trim();
        firstTrain= $("#timeInput").val().trim();
        frequency = $("#freqInput").val().trim();

       
        dataRef.ref().push({
          name: name,
          destination: destination,
          firstTrain,firstTrain,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
         $("#nameInput").val('');
         $("#destInput").val('');
         $("#timeInput").val('');
         $("#freqInput").val('');

    });

    
    dataRef.ref().on("child_added", function(childSnapshot) {

      var dbName = childSnapshot.val().name;
      var dbDest = childSnapshot.val().destination;
      var dbFirst = childSnapshot.val().firstTrain;
      var dbFreq = childSnapshot.val().frequency;
      var dbDate = childSnapshot.val().dateAdded;
      
      console.log(dbName);
      console.log(dbDest);
      console.log(dbFirst);
      console.log(dbFreq);
      console.log(dbDate);

      var firstTimeConverted = moment(dbFirst, "HH:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % dbFreq;
      var tMinutesTillTrain = dbFreq - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");



      console.log(firstTimeConverted);
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
      console.log("DIFFERENCE IN TIME: " + diffTime);
      console.log(tRemainder);
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      
      
     $("#trainTable").append("<tr><td>" + dbName + "</td><td>" + dbDest + "</td><td>" + dbFreq + "</td><td>"  + moment(nextTrain).format("hh:mm") + "</td><td>"  + tMinutesTillTrain + "</td></tr>");



     
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
