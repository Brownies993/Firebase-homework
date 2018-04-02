$(document).ready(function () {
      // Initialize Firebase
      // COPY AND PASTE FROM FIREBASE
      var config = {
        apiKey: "AIzaSyDsWYeNqnPw6p-jAjgyjH-uDiFR9JkDgwo",
        authDomain: "train-time-ffc7a.firebaseapp.com",
        databaseURL: "https://train-time-ffc7a.firebaseio.com",
        projectId: "train-time-ffc7a",
        storageBucket: "train-time-ffc7a.appspot.com",
        messagingSenderId: "350963940300"
      };
      firebase.initializeApp(config);
    }
    // Create reference to our database
     var database = firebase.database

    // Submit our new employee info
    $('#submit-form').on('click', function (event) {
      event.preventDefault();

      // Grab values from form
      var name = $('#name-input')
        .val()
        .trim();
      var place = $('#destination-input')
        .val()
        .trim();
      var arrival = $('#next-input')
        .val()
        .trim();
      var rate = parseInt(
        $('#time-input')
        .val()
        .trim()
      );

      // PUSH a new entry into our database, not overwrite (SET)
      database.ref().push({
        name: name,
        place: place,
        arrival: arrival,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      // Clear out our form fields
      $('#name-input').val('');
      $('#place-input').val('');
      $('#arrival-input').val('');
      $('#rate-input').val('');
    });
    // End submit form event

    // Begin our child_added listener
    database.ref().on('child_added', function (childSnapshot) {
      console.log(childSnapshot.val());

      // Get data out of our child snapshot
      var childName = childSnapshot.val().name;
      var childPlace = childSnapshot.val().place;
      var childArrival = childSnapshot.val().arrival;
      var childRate = childSnapshot.val().rate;
      var totalMinutes = moment().diff(moment(childArrival, 'DD/MM/YY'), 'months');
      console.log(totalMinutes);
      var totalPay = parseInt(totalMinutes) * parseInt(childRate);

      // Create a row to hold information
      var tr = $('<tr>');

      // Create 6 table cells to go into our row
      var tdName = $('<td>').text(childName);
      var tdPlace = $('<td>').text(childRole);
      var tdArrival = $('<td>').text(childStart);
      var tdRate = $('<td>').text(childRate);
      var tdMinutes = $('<td>').text(childMinutes);
      var tdTotal = $('<td>').text(totalPay);

      // Add our table cells to row
      tr.append(tdName, tdPlace, tdArrival, tdRate, tdTotal);

      // Add row to our table
      $('#train-schedule').append(tr);
    });

    $(".btn btn-primary").on("click", function () {
      var text = "";
    })