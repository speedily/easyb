


function copy(input)
  {
    console.log('inside copy');

    if (input=="link")
    {
        console.log('inside copy link');
        //shortenedURL
        var linkvar= $("#shortenedURL").val();
        console.log(linkvar);

        navigator.clipboard.writeText(linkvar).then(function () {
            alert('Copied Link! Do a CTRL + V to paste')
        }, function () {
            alert('Failure to copy. Check permissions for clipboard')
        });
    }
    else if (input="link2")
    {
        console.log('inside copy qr');
        //shortenedURL
        var qrvar= $("#qrCode").val();

        navigator.clipboard.writeText(qrvar).then(function () {
            alert('Copied QR! Do a CTRL + V to paste')
        }, function () {
            alert('Failure to copy. Check permissions for clipboard')
        });

    }
    else if (input="link3")
    {

        console.log('inside copy button');
        var buttonvar= $("#shortenedURL2").val();

        navigator.clipboard.writeText(buttonvar).then(function () {
            alert('Copied Button! Do a CTRL - V to paste')
        }, function () {
            alert('Failure to copy. Check permissions for clipboard')
        });
    }
  }

  $(document).ready(function(){
    $("#copylink").click(function () {
       
        console.log('inside copy link');
        //shortenedURL
        var linkvar= $("#shortenedURL").text();
        //alert("were copying link: "+ linkvar);
        //console.log();

        navigator.clipboard.writeText(linkvar).then(function () {
            alert('Copied Link! Do a CTRL + V to paste')
        }, function () {
            alert('Failure to copy. Check permissions for clipboard')
        });
    });

    $("#copylinkhtml").click(function () {
       
        console.log('inside copy link');
        //shortenedURL
        var linkvar= $("#shortenedURL").html();
        //alert("were copying link: "+ linkvar);
        //console.log();

        navigator.clipboard.writeText(linkvar).then(function () {
            alert('Copied Link! Do a CTRL + V to paste')
        }, function () {
            alert('Failure to copy. Check permissions for clipboard')
        });
    });
    
    $("#copyqrhtml").click(function () {
        //alert("were copying qr");
        console.log('inside copy qr');
        //shortenedURL
        var qrvar= $("#qrCode").html();
        //alert("were copying link: "+ qrvar);


        navigator.clipboard.writeText(qrvar).then(function () {
            alert('Copied QR! Do a CTRL + V to paste')
        }, function () {
            alert('Failure to copy. Check permissions for clipboard')
        });
    });
    
   
    $("#copyqr").click(function () {
        //alert("were copying qr");
        console.log('inside copy qr');
        //shortenedURL
        var qrvar= $('#qrCode > img')[0].getAttribute('src');


        //alert("were copying link: "+ qrvar);

        $("#dqr").attr("href", qrvar);


        //$("#dqr").href=qrvar;

        //$("#dqr").click();

        $('#dqr')[0].click();



    });

    $("#copybtnhtml").click(function () {
        alert("were copying button");
        console.log('inside copy button');
        var buttonvar= $("#shortenedURL2").html();
        //alert("were copying link: "+ buttonvar);

        navigator.clipboard.writeText(buttonvar).then(function () {
            alert('Copied Button! Do a CTRL - V to paste')
        }, function () {
            alert('Failure to copy. Check permissions for clipboard')
        });
    });

  });

  async function paste() {
    const text = await navigator.clipboard.readText();
    //document.getElementById("wa").value = text;
    document.getElementById('walletAddress').value = text;
  
  }



