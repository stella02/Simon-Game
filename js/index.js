var id, color;
var level=0;
var simonArr =[];
var userArr = [];

var strict = false;
var error = false;
var gameOn = false //switch to turn game on or off 

const NUM_OF_LEVELS = 20;
var boardSound = [
  "http://www.soundjay.com/button/sounds/button-11.mp3", //green
  "http://www.soundjay.com/button/sounds/button-15.mp3", //red
  "http://www.soundjay.com/button/sounds/button-20.mp3", //yellow 
  "http://www.soundjay.com/button/sounds/button-30.mp3" //blue   
];

$(document).ready(function(){
  
  $('.switch').click( function(){
    userArr=[];
    level = 0;
    simonArr =[];
    console.log('siwthc user simonarr'+ userArr+' '+simonArr);
    
    $('.inner-switch').toggleClass('sw-on');
   if($('.inner-switch').hasClass('sw-on')==true){
       gameOn = true;
      $('.display').text('00');
      }else{
        $('.display').text('');
        gameOn = false;
        //userArr=[];
        //level = 0;
       // simonArr ==[];
      }
        
    
   })
  
  $('.start').click(function(){
    if(gameOn==true){
    strict = false;
    error = false;
    //level = 0;
    level++;
    simonSeq();
    }
    
  })
  
  // create sequecy called by user or start button
  function simonSeq(){
    console.log('level:'+level );
   // console.log('simonArr.length '+simonArr.length);
    $('.display').text(level);
    randomNum();
    var i =0;
    var myInterval = setInterval(function(){
      id = simonArr[i];
      color = $('#'+id).attr('class').split(' ')[0];
      console.log(id+'  '+color);
      addSoundClass(id, color);
      i++;
      if(i == simonArr.length){
        clearInterval(myInterval);
      }
      
    },1000);
    
  }
    
  
    
  $('.pad').click(function(){
    
    if(gameOn== true){
      id = $(this).attr("id");
    color = $(this).attr("class").split(" ")[0];
   
    userArr.push(id);
    console.log('pad_userArr: '+ id+' '+color);
    //addSoundClass(id, color);
    if(!checkCorrect()){
      if(strict){
        console.log('strict mode');
        level =1;
        simonArr =[];       
      }
      
      displayErr();
      userArr = [];
      error = true;
      simonSeq();
    }else{
		console.log('ul:'+userArr.length);
      if(userArr.length == simonArr.length && userArr.length < NUM_OF_LEVELS){
       // console.log('pass length');
        level++;
        userArr =[];
        error = false;
        simonSeq();
      }
    if(userArr.length == NUM_OF_LEVELS){
      // $('.display').text('win');
      displayWinner();
      // reset();
      
      }
      
    }
    
	}
    //console.log('pad: userarr'+ userArr);
    
  })
  
  // check user sequence vs simon sequence
  function checkCorrect(){
    console.log('checkcorret: '+userArr);
    for(var i =0; i<userArr.length; i++){
      if(userArr[i] != simonArr[i]){ 
        console.log('checkerr: false');return false;}
    }
    
    console.log('checkcorret')
    return true;
    
  }
  
  function  displayErr(){
    console.log('display err');
    
    var cnt = 0;
    var myErr = setInterval(function(){
      $('.display').text('Err');
      cnt++;
      if(cnt == 3){
        $('.display').text(level);
        clearInterval(myErr);
        userArr =[];
        cnt = 0;
      }
    }, 500);
    
  }
  
  function randomNum(){
    var num = Math.floor(Math.random()*4);  
    simonArr.push(num);
     console.log('RN simonArr.length '+simonArr.length);
  }
  
  function addSoundClass(id, color){
    $('#'+id).addClass(color+'-active');
    soundPlay(id);
    setTimeout(function(){
      $('#'+id).removeClass(color+'-active');
    }, 600);
  }
  
  function soundPlay(id){
  var sound = new Audio(boardSound[id]);
  sound.play();
}

// to play in stric mode
$(".strict").click(function() {
  if(gameOn==true){
    console.log('strict mode');
    level = 0;
    level++;
    simonArr = []
    userArr = [];
    strict = true;    
    simonSeq();
  }
  
  })
  
  function displayWinner() {
  var count = 0;
  var winnerInterval = setInterval(function() { 
    count++;
    $(".display").text("Win");
    if(count == 3) {
      clearInterval(winnerInterval);
      $(".display").text("00");
      count = 0;
    }
  }, 600);
}
  
})// end of file