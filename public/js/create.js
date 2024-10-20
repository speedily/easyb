//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";

  
 // Firebase configuration
  
  //fill your own keys below
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    databaseURL: ""
  };


  // Initialize Firebase
  //const firebase = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(firebase);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Realtime Database
const database = firebase.database();

$(document).ready(function() {
   
  
    // URL shortener function
    function shortenURL(longURL, walletid) {
      // Generate a random short code (you can customize this)
      //var shortCode = Math.random().toString(36).substring(2, 8);
      var shortCode = longURL;

      //console.log('inside shortener');

      // Check if the short code already exists in the database
      database.ref('urls/' + shortCode).once('value', function(snapshot) {
        //console.log('inside db');

        if (snapshot.exists()) {
            //console.log('inside if');
            //console.log('Error: Url already exists');

            $("#urlstatus").html("<img src=\"./images/error.png\" style=\"height:24px;width:24px;\" /> Error: Try Another Name!").css("color","red");
          // If the short code exists, try generating a new one
          //shortenURL(longURL);
        } else {
            //console.log('inside else');
            $("#urlstatus").html("<img src=\"./images/check.png\" style=\"height:24px;width:24px;\" />  Yo! Name Available!").css("color","green");


          // If the short code is unique, store it in the database
          database.ref('urls/' + shortCode).set({
            walletid : walletid
          });
  
          var newurl = window.location.origin + '/#' + shortCode;
          //console.log("short url:"+newurl);


          var linkval = '<a href="'+newurl+'" target="_blank">'+newurl+'</a>';
          // Display the shortened URL to the user
          $('#shortenedURL').html(linkval).css("background-color","golden");
          

          var qrcode = new QRCode(document.querySelector("#qrCode"), {
            text: newurl,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        
        var buttonval ='<input type="button" value="Payme" onclick="location.href=\''+newurl+'\';" class="btn">';
        // Display the shortened URL to the user
        $('#shortenedURL2').html(buttonval);


        
         
        $('#result').css("display", "block");

        }
      });
    }
  
    // Handle form submission
    $('#shortenbtn').click(function(e) {
      e.preventDefault();
  
      // Get the long URL from the form input
      var longURL = $('#urlName').val().replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '');
      var walletid = $('#walletAddress').val().replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '');
      
      

      if ($('#urlName').val().replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '') =="")
      {
        
        $("#urlstatus").html("<img src=\"./images/error.png\" style=\"height:24px;width:24px;\" /> Error: Try Another Name!").css("color","red");

      }
      else if ($('#walletAddress').val().replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '') == "")
        {
            $("#urlstatus").html("<img src=\"./images/error.png\" style=\"height:24px;width:24px;\" /> Error: Try Another Wallet Address!").css("color","red");

        }  
        else{


      
            $('#urlName').val($('#urlName').val().replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ''));
      $('#walletAddress').val($('#walletAddress').val().replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ''));

      // Call the URL shortener function
      shortenURL(longURL, walletid);

        }
       

    });


   
    
  });


 // Function to retrieve the wallet ID from the username
 async function gwid(usern) {
    try {
       // /urls/ABHISHEKRECV/walletid
      // Get a reference to the user's node
      const userRef = database.ref('urls/'+usern);
  
      // Fetch the user's data
      const snapshot = await userRef.once('value');
  
      // Check if the user exists
      if (snapshot.exists()) {
        // Extract the wallet ID from the data
        const walletID = snapshot.val().walletid;
        return walletID;
      } else {
        // Handle the case where the user doesn't exist
        //console.error(`User ${username} not found.`);
        return null;
      }
    } catch (error) {
      // Handle errors that might occur during the process
      console.error('Error fetching wallet ID:', error);
      return null;
    }
  }

  const aviu = window.location.hash.substring(1, window.location.hash.length);
   //console.log("username:"+ aviu);

if (aviu.length == 0)
{
  
}   
else
{
    gwid(aviu).then(walletID => {
        if (walletID) {
          

          $("#recipientAddress").val(walletID);
    
        } else {
          
          $("#username").html("<img src=\"\./images/invalidlink.png\" /> <br/>ERROR: Wallet Address Not Found. Please Ask Seller To Enter Wallet Address.");

          $("#paymentoptions").hide();
        }
      });
}    

