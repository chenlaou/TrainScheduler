$(document).ready(function(){

// INITIALIZE FIREBASE
var config = {
	apiKey: "AIzaSyCbdXUPeZPQpmZ4TRCL6sWtgUo9ZSRfaDk",
	authDomain: "test-a0b77.firebaseapp.com",
	databaseURL: "https://test-a0b77.firebaseio.com",
	projectId: "test-a0b77",
	storageBucket: "test-a0b77.appspot.com",
	messagingSenderId: "862536868255"
};

	firebase.initializeApp(config);

	console.log("hello");

	// CREATE VARIABLE TO REFERENCE THE DATABASE
  var database = firebase.database();

  // INITIAL VALUES
  var trainName = "";
  var destination = "";
  var trainTimeInput = "";
  var frequencyInput =  "";
  
	// BUTTON TO ADD MORE TRAINS
	$("#addTrainBtn").on("click", function(event){
        event.preventDefault();

	// GRAB VALUES FROM TEXT BOXES AND ASSIGN TO VARIABLES
		trainName = $("#trainNameInput").val().trim();
		destination = $("#destinationInput").val().trim();
		trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		frequencyInput = $("#frequencyInput").val().trim();

	// SET THE VALUES TO THE DATABASE
		 database.ref().set({
			name:  trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		});

	// CONSOLE.LOG FIREBASE DATA
		console.log(trainName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

	// CREATE OBJECT TO HOLD THE TRAIN DATA (TO BE PUSHED TO FIREBASE)
		var newTrain = {
			name:  trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

	// PUSHING NEW INFORMATION
		database.ref().push(newTrain);

	// CLEAR THE TEXT FORM GROUP
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

	// PREVENT PAGE FROM REFRESHING
		return false;
	});


	database.ref().on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

	// ASSIGN FIREBASE DATA TO SNAPSHOT
		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
	// CONSOLE.LOG TIME AND INFO
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

	// APPEND TO HTML TABLE
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});

