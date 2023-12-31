const dbRefTemp = firebase.database().ref("TF228WNM");
const dbRefMonitor = firebase.database().ref("Monitor");
const dbRefCtrl = firebase.database().ref("Control");
const dbRefCtrlSen = firebase.database().ref("Control sensor");

function triggerColor(selector, val, mess) {
  if (val != document.querySelector(selector).innerHTML) {
    document.querySelector(selector).innerHTML = `${val}`;
    // document.querySelector(selector).parentNode.style.background = "blue";
  }
  setTimeout(() => {
    // document.querySelector(selector).parentNode.style.background = "#4CAF50";
  }, 2000);
}

dbRefTemp.child("Fan Control Type").on("value", (snap) => {
  const val = snap.node_.value_;
  triggerColor("#fanCtrlType", val, "Fan Control Type");
});

dbRefTemp.child("Fan status").on("value", (snap) => {
  const val = snap.node_.value_;
  triggerColor("#fanStt", val, "Fan Status");
});

dbRefTemp.child("Power Recovery").on("value", (snap) => {
  const val = snap.node_.value_;
  triggerColor("#powRecovery", val, "Power Recovery");
});

dbRefTemp.child("Power Switch").on("value", (snap) => {
  const val = snap.node_.value_;
  triggerColor("#powSwitch", val, "Power Switch");
});

dbRefTemp.child("Fan Control Type").on("value", (snap) => {
  const val = snap.node_.value_;
  triggerColor("#fanCtrlType", val, "Fan Control Type");
});

dbRefTemp.child("Temp Scale").on("value", (snap) => {
  const val = snap.node_.value_;
  triggerColor("#tempScale", val, "Temp Scale");
});

dbRefTemp.child("System Mode").on("value", (snap) => {
  const val = snap.node_.value_;
  triggerColor("#sysMode", val, "System Mode");
});

dbRefTemp.child("System Type").on("value", (snap) => {
  const val = snap.node_.value_;
  triggerColor("#sysType", val, "System Type");
});

// dbRefMonitor .child("UI08").on("value", (snap) => {
//   const val = snap.node_.children_.root_.left.value.value_;
//   document.querySelector(".circle3 h2").innerHTML = val + "°C";
// })

dbRefTemp.child("Setpoint").on("value", (snap) => {
  const SetpointVal = snap.node_.value_;

  document.querySelector("h2.set-point").innerHTML =
    "Set Point: " + SetpointVal + "°C";

  dbRefMonitor.child("UI03").on("value", (snap) => {
    const RoomTempVal = snap.node_.children_.root_.left.value.value_;
    document.querySelector("h2.room-temp").innerHTML =
      "Room Temp: " + RoomTempVal + "°C";
    if (Math.abs(SetpointVal - RoomTempVal) == 0) {
      triggerColor("#fanStt", 0, "Fan Status");
      dbRefCtrl.child("Fre ref").set(20);
    } else {
      if (Math.abs(SetpointVal - RoomTempVal) < 2) {
        triggerColor("#fanStt", 1, "Fan Status");
        dbRefCtrl.child("Fre ref").set(25);
      } else {
        triggerColor("#fanStt", 2, "Fan Status");
        dbRefCtrl.child("Fre ref").set(30);
      }
    }
    dbRefCtrl.child("Run com").on("value", (snap) => {
      const runComVal = snap.node_.value_;
      if (runComVal == 1) {
        document.querySelector(".temp-icon.heating").style.opacity = "0.6";
        document.querySelector(".temp-icon.cooling").style.opacity = "0.6";
         document.querySelector(".temp-icon.heating .mode").innerHTML = "";
         document.querySelector(".temp-icon.cooling .mode").innerHTML =
           "";
      } else {
        if (SetpointVal < RoomTempVal) {
          document.querySelector(".temp-icon.heating").style.opacity = "0.6";
          document.querySelector(".temp-icon.cooling").style.opacity = "1.3";

          document.querySelector(".temp-icon.heating .mode").innerHTML = "";
          document.querySelector(".temp-icon.cooling .mode").innerHTML =
            "Cooling";
        } else {
          document.querySelector(".temp-icon.heating").style.opacity = "1.3";
          document.querySelector(".temp-icon.cooling").style.opacity = "0.6";
          document.querySelector(".temp-icon.heating .mode").innerHTML =
            "Heating";
          document.querySelector(".temp-icon.cooling .mode").innerHTML = "";
        }
      }
    });
  });
  // if (val != )
});

document.querySelector(".set-point-button").addEventListener("click", () => {
  openSetPointAlert();
});

function openSetPointAlert() {
  let text;
  let point = prompt("Nhập set point cho hệ thống:");
  if (point == null || point == "") {
    text = "Không thể cập nhật giá trị không hợp lệ";
  } else {
    text = `Đã thay đổi set point thành "${point}"`;
    dbRefTemp.child("Setpoint").set(point);

    // Chạy run command thành 2
    dbRefCtrl.child("Run com").set(2);
    dbRefMonitor.child("Run com").set({
      data: 2,
      status: true,
    });

    //Set point cho biến AO2 và DO1
    dbRefCtrlSen.child("Setpoint AO2").set({
      data: point,
      status: true,
    });
    dbRefCtrlSen.child("Setpoint DO1").set({
      data: point,
      status: true,
    });
  }
  // window.location.href = "/Temp-demo.html";
}
