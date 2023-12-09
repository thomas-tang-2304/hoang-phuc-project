// Khai báo các biến

// Hàm ghi dữ liệu lên Firebase

const dbRefTemp = firebase.database().ref("TF228WNM");
const dbRefMonitor = firebase.database().ref("Monitor");
const dbRefCtrl = firebase.database().ref("Control");

function WriteDataToFirebase(fre_ref, run_com, acc, dec, para_lock) {
  firebase.database().ref("Control").set({
    ACC: acc,
    DEC: dec,
    "Para lock": para_lock,
    "Fre ref": fre_ref,
    "Run com": run_com,
  });

  dbRefMonitor.child("Run com").set({
    data: run_com,
    status: true
  });
}

const updateControl = (element) => {
  element.addEventListener("click", () => {
    let fre_ref = parseFloat(
      document.querySelector("input#frequencyRef").value || 0
    );
    let run_com = parseFloat(
      document.querySelector("select#runCommand").value || 0
    );
    let acc = parseFloat(
      document.querySelector("input#accelebration").value || 0
    );
    let dec = parseFloat(
      document.querySelector("input#decelebration").value || 0
    );
    let para_lock = parseFloat(
      document.querySelector("select#paraLock").value || 0
    );

    WriteDataToFirebase(fre_ref, run_com, acc, dec, para_lock);
    window.alert("Update thành công");
    window.location.href = "/";
  });
};

dbRefCtrl.child("ACC").on("value", (snap) => {
  const val = snap.node_.value_;
  document.querySelector("input#accelebration").value = val;
});

dbRefCtrl.child("DEC").on("value", (snap) => {
  const val = snap.node_.value_;
  document.querySelector("input#decelebration").value = val;
});

dbRefCtrl.child("Fre ref").on("value", (snap) => {
  const val = snap.node_.value_;
  document.querySelector("input#frequencyRef").value = val;
});

dbRefCtrl.child("Para lock").on("value", (snap) => {
  const val = snap.node_.value_;
  document.querySelector("select#paraLock").value = val;
});

dbRefCtrl.child("Run com").on("value", (snap) => {
  const val = snap.node_.value_;
  document.querySelector("select#runCommand").value = val;
});

updateControl(document.querySelector(".btn.btn-primary"));

// function convertRgb(rgb) {
//   // This will choose the correct separator, if there is a "," in your value it will use a comma, otherwise, a separator will not be used.
//   var separator = rgb.indexOf(",") > -1 ? "," : " ";

//   // This will convert "rgb(r,g,b)" into [r,g,b] so we can use the "+" to convert them back to numbers before using toString
//   rgb = rgb.substr(4).split(")")[0].split(separator);

//   // Here we will convert the decimal values to hexadecimal using toString(16)
//   var r = (+rgb[0]).toString(16),
//     g = (+rgb[1]).toString(16),
//     b = (+rgb[2]).toString(16);

//   if (r.length == 1) r = "0" + r;
//   if (g.length == 1) g = "0" + g;
//   if (b.length == 1) b = "0" + b;

//   // The return value is a concatenation of "#" plus the rgb values which will give you your hex
//   return "#" + r + g + b;
// }

// let run_btn = false;
// let fw_btn = false;
// let rv_btn = false;

// const button_selector = [
//   document?.querySelector("button.action.run"),
//   document?.querySelector("button.action.fw"),
//   document?.querySelector("button.action.rv"),
// ];

// const actionButtonClick = (selector, color, btn_stat) => {
//   selector?.addEventListener("mouseover", () => {
//     // console.log("mouseover");
//      if (!btn_stat) {
//     selector.style.borderColor = "#007bff";
//     selector.style.color = "#007bff";
//      }
//   });

//   selector?.addEventListener("mouseleave", () => {
//     if (!btn_stat) {
//       selector.style.color = "rgb(214 214 214)";
//       selector.style.borderColor = "rgb(214 214 214)";
//     }
//   });

//   selector?.addEventListener("click", () => {
//     // console.log(convertRgb(selector.style.backgroundColor));
//     if (!btn_stat) {
//       selector.style.borderColor = "#007bff";
//       selector.style.backgroundColor = "#007bff";
//       selector.style.color = "#fff";
//       btn_stat = true;
//     } else {
//       selector.style.borderColor = "rgb(214 214 214)";
//       selector.style.backgroundColor = "transparent";
//       selector.style.color = "rgb(214 214 214)";
//       btn_stat = false;
//     }
//   });
// };
// // console.log(button_selector);

// actionButtonClick(button_selector[0], "#007bff", run_btn);
// actionButtonClick(button_selector[1], "#007bff", fw_btn);
// actionButtonClick(button_selector[2], "#007bff", rv_btn);
