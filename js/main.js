function getLogin(username) {
  console.log("login");
  if (username != "ChauHoangPhuc19142080") {
    window.location.href = "/login.html";
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
getLogin(getCookie("login_token"));


document.querySelector(".stop")?.addEventListener("click", () => {
  window.alert("Lệnh dừng khẩn cấp đã được thực thi");
  dbRefCtrl.child("Run com").set(1);
  dbRefMonitor.child("Run com").set({
    data: 1,
    status: true,
  });
});

document.querySelector(".logout")?.addEventListener("click", () => {
  setCookie("login_token", undefined);
  window.location.href = "/login.html";
});


const firebaseConfig = {
  apiKey: "AIzaSyCHy5OBg92DQry1jEOhoefpIQQXsvQwVm8",
  authDomain: "bms-fcu-final.firebaseapp.com",
  databaseURL: "https://bms-fcu-final-default-rtdb.firebaseio.com",
  projectId: "bms-fcu-final",
  storageBucket: "bms-fcu-final.appspot.com",
  messagingSenderId: "984749584972",
  appId: "1:984749584972:web:54c8986056c52289ca3ae9",
  measurementId: "G-CM4XVQ42XL",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const dbRefTemp = firebase.database().ref("TF228WNM");
const dbRefMonitor = firebase.database().ref("Monitor");
const dbRefCtrl = firebase.database().ref("Control");
