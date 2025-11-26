$(document).ready(function(){


// GET CRYPTOS PRICE IN JSON FORMAT AND DECODE 
    // bitcoin price function
      function getBtcPriceInvestment(){
      $.getJSON("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", function(json) {
   var amount = $(".total_investment").val();
   var toBTC = amount/json.USD;
   str = toBTC.toString();
   re = Number(str.slice(0, 8));
   $(".bit").html("<img src='../assets/images/btc.png' width='13'> "+re+ ' BTC');
    //access your JSON file through the variable "json"
  });
  }

   function getBtcPriceEarning(){
      $.getJSON("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", function(json) {
   var amount = $(".total_earn").val();
   var toBTC = amount/json.USD;
   str = toBTC.toString();
   re = Number(str.slice(0, 8));
   $(".bit-earn").html("<img src='../assets/images/btc.png' width='13'> "+re+ ' BTC');
    //access your JSON file through the variable "json"
  });
  }

  function getBtcPriceReferral(){
      $.getJSON("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", function(json) {
   var amount = $(".total_ref").val();
   var toBTC = amount/json.USD;
   str = toBTC.toString();
   re = Number(str.slice(0, 8));
   $(".bit-ref").html("<img src='../assets/images/btc.png' width='13'> " +re+ ' BTC');
    //access your JSON file through the variable "json"
  });
  }

getBtcPriceInvestment();
getBtcPriceEarning();
getBtcPriceReferral();

// CREATE ACCOUNT AJAX FUNCTION 
 $("#create_account").submit(function(e){
                e.preventDefault();
                $(".btn-signup").val('Wait...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_signup.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-signup").val('Submit').css('opacity','0.9').css('cursor', 'pointer');
     $(".signup_msg-container").html(data).css('display','block');
        }
  });   
  });


 // LOGIN AJAX FUNCTION 
 $(".login_form").submit(function(e){
                e.preventDefault();
                $(".btn-login").val('Wait...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_login.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-login").val('Submit').css('opacity','0.9').css('cursor', 'pointer');
     $(".loginMsg").html(data).css('display','block');
        }
  });   
  });

// USER INVESTMENT  AJAX FUNCTION 
 $(".invest-form").submit(function(e){
                e.preventDefault();
        $.ajax({
url: "ajax_invest.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  

    if(data==='success'){
      window.history.pushState('page2', 'Title', 'invest');
      $(".proceed-to-pay").css('display','block');
      $(".loader").css('display', 'block');
      setInterval(function(){$(".proceed-to-pay").load('payment.php'),
        $(".loader").css('display', 'none')},2000);
    }else{
      $(".invest-plan2-msg").html(data);
    }
      
    }
  });   
  });


// DASHBOARD INVESTMENT PROFIT CALCULATOR
  $(".amount-1").keyup(function(){
    var amount = $(".amount-1").val();
    var plan = $(".plan-1").val();
      var pro = Math.floor((3.5/100)*amount);
      $(".pro-1").html('$'+pro);
  });

 $(".amount-2").keyup(function(){
    var amount = $(".amount-2").val();
    var plan = $(".plan-2").val();
      var pro = Math.floor((4.5/100)*amount);
      $(".pro-2").html('$'+pro);
  });

  $(".amount-3").keyup(function(){
    var amount = $(".amount-3").val();
    var plan = $(".plan-3").val();
      var pro = Math.floor((5.5/100)*amount);
      $(".pro-3").html('$'+pro);
  });

  //WITHDRAWAL FUNCTIONS
 $(".withdraw-form").submit(function(e){
                e.preventDefault();
                $(".btn-withdraw").val('Processing...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_withdraw.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    if(data == "successful"){
      $(".with-wraper").hide();
      $(".withdraw-success").show();
    }
    $(".btn-withdraw").val('Send').css('opacity','0.9').css('cursor', 'pointer');
     $(".withdraw_msg").html(data).css('display','block');
        }
  });   
  });

  $(".btn-withdraw1").click(function(){
      $(".withdrawalAll").fadeIn(600);
  });
   $(".btn-withdraw2").click(function(){
      $(".withdrawalProfit").fadeIn(600);
  });
    $(".btn-withdraw3").click(function(){
      $(".withdrawalRef").fadeIn(600);
  });
  $(".close").click(function(){
    window.location='withdraw';
  });


//EDITH PROFILE FUNCTIONS
 $("#profile_form").submit(function(e){
                e.preventDefault();
                $(".btn-invst3").val('Please Wait...').css('opacity','0.5').css('cursor', 'not-allowed');
               
        $.ajax({
url: "ajax_profile.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    
    $(".btn-withdraw").val('Submit').css('opacity','0.9').css('cursor', 'pointer');
     $(".profile_msg").html(data).css('display','block');
        }
  });  

  });
 
 $("#filephoto").change(function(){
  var res_field = this.value;   
   var extension = res_field.substr(res_field.lastIndexOf('.') + 1).toLowerCase();
  var allowedExtensions = ['jpg', 'png', 'jpeg', 'gif', 'bmp'];
  if (res_field.length > 0)
     {
         if (allowedExtensions.indexOf(extension) === -1) 
             {
              $(".invalid-img").show();
               $(".invalid-img").html('Invalid file Format. Only ' + allowedExtensions.join(', ') + ' are allowed.');
               return false;
             }else{
              $(".invalid-img").hide();
             }
           }
 });


// REVIWE FUNCTION
 $("#review-form").submit(function(e){
                e.preventDefault();
                $(".btn-review").val('Wait...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_testimonies.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-review").val('Submit').css('opacity','0.9').css('cursor', 'pointer');
     $(".reviwe-msg").html(data).css('display','block');
        }
  });   
  });


// dashboard navigation slide 
  
  $(".small-menu").click(function(){
    $(".left-nav-mobil").toggle( "slide", {direction: "left" }, 300 );
  });
  $(".left-nav-mobil").click(function(){
    $(".left-nav-mobil").hide( "slide", {direction: "left" }, 300 );
  });


// REVIWE FUNCTION
 $(".block-user").submit(function(e){
                e.preventDefault();
                var num = this.id.value;
                $(".btn-block-"+num).val('Blocking...').css('opacity','0.5').css('cursor', 'not-allowed');
                
                //alert(num);
        $.ajax({
url: "ajax_user_block.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    setInterval(function(){
    $(".btn-block-"+num).val('Blocked').css('opacity','0.9').css('cursor', 'pointer')},5000);
        }
  });   
  });

 // REVIWE FUNCTION
 $(".confirm_invst").submit(function(e){
                e.preventDefault();
                if(confirm(`Do you really want to ${this.type.value} ${this.username.value} investment`)){
                var num = this.id.value;
                $(".confirm-"+num).val('Processing...').css('opacity','0.5').css('cursor', 'not-allowed');
                //alert(num);
        $.ajax({ 
url: "ajax_confirm_invst.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    //$(".co-msg").html(data);
        $(".confirm-"+num).val('Confirmed').css('opacity','0.9').css('cursor', 'pointer');
         $(".confirmed-"+num).hide();
        }
  });  
  } 
  });

 // REVIWE FUNCTION
 $(".confirm_withdrawal").submit(function(e){
                e.preventDefault();
                if(confirm(`Do you really want to ${this.action.value} ${this.username.value} withdrawal request`)){
                var num = this.id.value;
                $(".confirm-"+num).val('Processing...').css('opacity','0.5').css('cursor', 'not-allowed');
                //alert(num);
        $.ajax({ 
url: "ajax_confirm_withdraw.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    //$(".widthi").html(data);
        $(".confirm-"+num).val('Confirmed').css('opacity','0.9').css('cursor', 'pointer');
        $(".confirmed-"+num).hide();
        }
  });  
  } 
  });


// TOP UP AN INVESTMENT
 $(".top-up-invest").submit(function(e){
            e.preventDefault();
        $(".btn-top").val('Processing...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_top_invest.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-top").val('Submit').css('opacity','0.9').css('cursor', 'pointer');
     $(".top-msg").html(data).css('display','block');
     $(".top-up-invest")[0].reset();
        }
  });   
  });


 // CLEAR  AN INVESTMENT
 $(".clear-invest").submit(function(e){
            e.preventDefault();
        $(".btn-top").val('Processing...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_debit.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-top").val('Submit').css('opacity','0.9').css('cursor', 'pointer');
     $(".clear-msg").html(data).css('display','block');
     $(".top-up-invest")[0].reset();
        }
  });   
  });

 // CHANGE PASSWORD ADMIN
 $(".admin-password-change").submit(function(e){
            e.preventDefault();
        $(".btn-pass").val('Wait...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_password_reset.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    if (data ==="Password changed successfuly") {
      $(".admin-password-change")[0].reset();
    }
    $(".btn-pass").val('Submit').css('opacity','0.9').css('cursor', 'pointer');
     $(".pass-msg").html(data).css('display','block');
     
        }
  });   
  });
 // CHANGE PASSWORD ADMIN
 $(".reset_mail_link").submit(function(e){
            e.preventDefault();
        $(".btn-reset").val('Sending...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "reset_link.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-reset").val('Change Password').css('opacity','0.9').css('cursor', 'pointer');
     $(".reset-msg").html(data).css('display','block');
     
        }
  });   
  });

// 2fa authentication form
 $(".2fa_form").submit(function(e){
            e.preventDefault();
        $(".btn-2fa").val('Checking...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_2fa.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-2fa").val('Login').css('opacity','0.9').css('cursor', 'pointer');
     $(".2fa-msg").html(data).css('display','block');
     
        }
  });   
  });

// change password
$(".change_password_form").submit(function(e){
            e.preventDefault();
        $(".btn-pass").val('Updating...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_change_password.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-pass").val('Change Password').css('opacity','0.9').css('cursor', 'pointer');
     $(".cpass_msg").html(data).css('display','block');
     
        }
  });   
  });

// change password
$(".withdrawal-access").submit(function(e){
            e.preventDefault();
        $(".btn-w").val('Processing...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_withdrawal_access.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-w").val('Submit').css('opacity','0.9').css('cursor', 'pointer');
     $(".access-msg").html(data).css('display','block');
     
        }
  });   
  });


$(".seach_user").submit(function(e){
            e.preventDefault();
        $(".btn-top").val('Finding...').css('opacity','0.5').css('cursor', 'not-allowed');
        $.ajax({
url: "ajax_search_user.php", 
type: "POST",            
data: new FormData(this), 
contentType: false,       
cache: false,             
processData:false,        
success: function(data)   
   {  
    $(".btn-top").val('Search').css('opacity','0.9').css('cursor', 'pointer');
     $(".search_msg").html(data).css('display','block');
     $(".seach_user")[0].reset();
     
        }
  });   
  });



// END OF JQUERY 
})


