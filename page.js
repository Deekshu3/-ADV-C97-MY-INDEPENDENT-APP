const firebaseConfig = {
  apiKey: "AIzaSyDDvRRWTljZGXfVFc8qELSzSFMWhaHUePI",
  authDomain: "kwitter-95a6c.firebaseapp.com",
  databaseURL: "https://kwitter-95a6c-default-rtdb.firebaseio.com",
  projectId: "kwitter-95a6c",
  storageBucket: "kwitter-95a6c.appspot.com",
  messagingSenderId: "837385113538",
  appId: "1:837385113538:web:ed77854206bd3a6f06d05b",
  measurementId: "G-10QS7MRDG4"
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name"); 
room_name = localStorage.getItem("room_name");
function Send() {
   msg = document.getElementById("msg").value;
   firebase.database().ref(room_name).push({ 
        name:user_name, 
        message:msg, 
        like:0 
  }); 
  document.getElementById("msg").value = ""; 
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;

console.log(firebase_message_id);
console.log(message_data);

var name=message_data['name'];
var msg=message_data['message'];
var like_num=message_data['like'];

var blue_tick_name="<h4>"+ name + "<img src='tick.png'class='user_tick'></h4>";
var message="<h4 class='message_h4'>"+ msg +"</h4>";
var like_btn="<button class= 'btn btn-warning' id="+ firebase_message_id+" value="+like_num+" onclick='update_like(this.id)'>";
  var thumb="<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like_num+"</span> </button><hr>";
var result=blue_tick_name+message+like_btn+thumb;
document.getElementById("output").innerHTML=result;


  } });  }); }
getData();

function update_like(message_id){
  console.log("clicked on like button" + message_id);
  var btn_id=message_id;
  var likes=document.getElementById(btn_id).value;
  var update_likes=Number(likes)+1;
  console.log(update_likes);

  firebase.database().ref(room_name).child(message_id).update({
        like:update_likes
        });          
}

function logout (){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location= "index.html";
}