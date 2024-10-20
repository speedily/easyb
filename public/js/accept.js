// app.js
let web3;

/*
$(document).ready(function() {
    // Parse the current URL
    //var url = new URL(window.location.href);
    //const url = window.location.pathname
    //const userName = url.split("/")[2]
    

    if( window.location.hash.length ==0)
    {
      $("#accept").show();

    // Display a message if the URL format doesn't match
    //$("#username").text("This page doesn't match the format easybase.site/#username");

    }
  else {

    // Check if the URL matches the desired format
    //if (window.pathname.startsWith("/")) {
      // Extract the username from the pathname
      //var username = url.pathname.slice(2);
      //userName = url.split("/")[2]
      var username = window.location.hash.substring(1, window.location.hash.length);
      //console.log("username:"+username);
    
      $(".container").hide();

      $("#accept").show();

      // Update the UI with the extracted username
      //$("#username").text("Username: " + username);


    }  
    
  });
  */

async function connectWallet() {
    if (window.ethereum) {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //console.log("Connected account:", accounts[0]);
             //$("#connectButton").hide();
             $("#connectstatus").html('<img src="./images/check.png" style="width=32px; height: 32px; color:green;"> Done').show();
             //display: flex; align-items:center;
             $("#connectstatus").css({"display": "flex", "align-items": "center"});

             $("#step2").removeClass('step').addClass('step step-primary');

            web3 = new Web3(window.ethereum);
        } catch (error) {
            $("#connectstatus").html('<img src="./images/error.png" style="width=32px; height: 32px; color:green;"> User denied account access').show();
            //console.error("User denied account access");
            $("#connectstatus").css({"display": "flex", "align-items": "center"});

        }
    } else {
        $("#connectstatus").html('<img src="./images/error.png" style="width=32px; height: 32px; color:green;"> Please install MetaMask!').show();
        $("#connectstatus").css({"display": "flex", "align-items": "center"});

        // console.log("Please install MetaMask!");
    }
}

$("#amount").change(function() {
    if ($.trim ($("#amount")).length == 0)
    {

    }
    else  if ($("#amount").length > 0) {
        
         $("#amountstatus").html('<img src="./images/check.png" style="width=32px; height: 32px; color:green;"> Done').show();
         $("#amountstatus").css({"display": "flex", "align-items": "center"});
         $("#step3").removeClass('step').addClass('step step-primary');


    }

  });

async function sendPayment() {
    const recipientAddress = document.getElementById("recipientAddress").value;
    const amount = document.getElementById("amount").value;

    if (!web3) {
        alert("Please connect your wallet first.");
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const senderAddress = accounts[0];
    //const gasPrice1 = await web3.eth.getGasPrice();

    //const gas1 = await tx.estimateGas({from: address});

    //const usdPrice = 11502740 / 1000000000000000000 * exchangeRate;

    //const gasPrice0 = await web3.eth.getGasPrice();
   // const gasPrice1 = web3.utils.fromWei(gasPrice0, 'ether'); 

    //console.log("entered send txn");

    /*
    const gasAmount = await web3.eth.estimateGas({
        to: recipientAddress,
        from: senderAddress,
        value: web3.utils.toWei(amount, 'ether'),
    }).then((result) => {

        console.log(" gas amount result:"+result);

        const gasamt1 = web3.utils.fromWei(result.toString(), 'ether');

        console.log("gasamount1:"+gasamt1);

        //const hexString = gasprice1.toString(16);
        //console.log("hexstring:"+hexString);
        //const bis = BigInt(gasprice1);
        //console.log("bis:"+bis);


        const tx = {
        from: senderAddress,
        to: recipientAddress,
        value: web3.utils.toWei(amount, 'ether'),
        gas: gasamt1,
     };

     const outs = txnr(tx);

   })
     */


  
   const gasPrice0 =   await web3.eth.getGasPrice().then((result) => {

         // console.log("result:"+result);

            //const gasprice1 = web3.utils.fromWei(result, 'ether');
            //console.log("gasprice1:"+gasprice1);
        
            


            const tx = {
            from: senderAddress,
            to: recipientAddress,
            value: web3.utils.toWei(amount, 'ether'),
            gas: 21000,
            gasPrice : result,
         };

         const outs = txnr(tx);

       })


}
       

async function txnr (tx)
{

   
        try {
            //console.log("entered try");
            const txHash = await web3.eth.sendTransaction(tx);
            //console.log("Transaction successful:", txHash);
            //$("#txnid").html('<img src="./images/check.png" style="width=32px; height: 32px; color:green;">'+ `Payment sent! <br/> Your Transaction Hash On Base Newtwork: ${txHash.transactionHash} <br/> ` + '<a href="https://base.blockscout.com/tx/' + `${txHash.transactionHash}`+ '" > Click To Verify Transaction On Base Block Explorer </a>').show();
            //alert(`Payment sent! Transaction Hash: ${txHash.transactionHash}`);

            $("#txnid").html('<div role="alert" class="alert alert-success"> <svg xmlns="http://www.w3.org/2000/svg"  class="h-6 w-6 shrink-0 stroke-current"  fill="none"  viewBox="0 0 24 24">  <path  stroke-linecap="round" stroke-linejoin="round"  stroke-width="2"  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg><span>Payment sent! Your Transaction Hash On Base Newtwork: '+ ` ${txHash.transactionHash} ` +'</span></div>').show();
            $("#txnid2").html( '<a class="link link-primary" href="https://base.blockscout.com/tx/' + `${txHash.transactionHash}`+ '" target="_blank"> Click To Verify Transaction On Base Block Explorer </a>').show();

            $("#step4").removeClass('step').addClass('step step-primary');


        } catch (error) {

          txnf =  '<div role="alert" class="alert alert-error"><svg xmlns="http://www.w3.org/2000/svg"   class="h-6 w-6 shrink-0 stroke-current"  fill="none" viewBox="0 0 24 24"> <path   stroke-linecap="round" stroke-linejoin="round"   stroke-width="2"   d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> <span>Error! Transaction failed!</span></div>';
          $("#txnid").html(txnf).show();
            //console.error("Transaction failed:", error);
            //alert("Transaction failed!");
        }
      
}

document.getElementById("connectButton").onclick = connectWallet;
document.getElementById("sendButton").onclick = sendPayment;

