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


user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="welcome "+user_name;

function addRoom(){
room_name=document.getElementById("room_name").value;

firebase.database().ref("/").child(room_name).update({
purpose:"adding room name"
});

localStorage.setItem("room_name",room_name);
window.location="page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
   Room_names = childKey;

  console.log("room_name : "+Room_names);
  row="<div class='room_name' id="+Room_names+"onclick='redirectToRoomName(this.id)' >#"+Room_names +"</div><hr>";
  document.getElementById("output").innerHTML += row;

  });});}
getData();

function redirectToRoomName(name)
{
console.log(name);
localStorage.setItem("room_name", name);
window.location ="page.html";
}

function logout (){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location= "index.html";
}