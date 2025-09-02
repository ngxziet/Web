const firebaseConfig = {
    apiKey: "AIzaSyABu3mFJK_PyPppTymzGoPdcRkor7INs0M",
    authDomain: "iot-web-bf6e9.firebaseapp.com",
    projectId: "iot-web-bf6e9",
    storageBucket: "iot-web-bf6e9.firebasestorage.app",
    messagingSenderId: "633701788549",
    appId: "1:633701788549:web:4a4ea9bda7fe94eaf6f2ec",
    measurementId: "G-8326W7L64W"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Lấy tham chiếu đến Firebase Realtime Database
const database = firebase.database();

document.addEventListener("DOMContentLoaded", function () {
    const tvSwitch = document.getElementById("tvSwitch");
    const tvText = document.getElementById("tvstatus");
    const tvImage = document.getElementById("tvImage");

    const ACSwitch = document.getElementById("ACSwitch");
    const ACText = document.getElementById("ACstatus");
    const ACImage = document.getElementById("ACImage");

    const maygiatSwitch = document.getElementById("maygiatSwitch");
    const maygiatText = document.getElementById("maygiatstatus");
    const maygiatImage = document.getElementById("maygiatImage");

    const tulanhSwitch = document.getElementById("tulanhSwitch");
    const tulanhText = document.getElementById("tulanhstatus");
    const tulanhImage = document.getElementById("tulanhImage");

    const lightSwitch = document.getElementById("lightSwitch");
    const lightText = document.getElementById("lightstatus");
    const lightImage = document.getElementById("lightImage");

    const bellSwitch = document.getElementById("bellSwitch");
    const bellText = document.getElementById("bellstatus");
    const bellImage = document.getElementById("bellImage");

    // Đồng bộ dữ liệu nhiệt độ và độ ẩm từ Firebase lên web
    const temp = document.getElementById("temp");
    database.ref("/SensorData/ttiot/temp").on("value", function (snapshot) {
        temp.innerHTML = snapshot.val();
    });

    const hum = document.getElementById("hum");
    database.ref("/SensorData/ttiot/hum").on("value", function (snapshot) {
        hum.innerHTML = snapshot.val();
    });

    // Đồng bộ trạng thái thiết bị từ Firebase lên giao diện
    database.ref("/ttiot/tivi").on("value", function (snapshot) {
        tvSwitch.checked = snapshot.val() === 1;
        tvStatus(tvSwitch.checked);
    });

    database.ref("/ttiot/AC").on("value", function (snapshot) {
        ACSwitch.checked = snapshot.val() === 1;
        ACStatus(ACSwitch.checked);
    });

    database.ref("/ttiot/maygiat").on("value", function (snapshot) {
        maygiatSwitch.checked = snapshot.val() === 1;
        maygiatStatus(maygiatSwitch.checked);
    });

    database.ref("/ttiot/tulanh").on("value", function (snapshot) {
        tulanhSwitch.checked = snapshot.val() === 1;
        tulanhStatus(tulanhSwitch.checked);
    });

    database.ref("/ttiot/light").on("value", function (snapshot) {
        lightSwitch.checked = snapshot.val() === 1;
        lightStatus(lightSwitch.checked);
    });

    database.ref("/ttiot/bell").on("value", function (snapshot) {
        bellSwitch.checked = snapshot.val() === 1;
        bellStatus(bellSwitch.checked);
    });

    // Thêm sự kiện thay đổi trạng thái thiết bị
    tvSwitch.addEventListener("change", function () {
        tvStatus(this.checked);
    });

    ACSwitch.addEventListener("change", function () {
        ACStatus(this.checked);
    });

    maygiatSwitch.addEventListener("change", function () {
        maygiatStatus(this.checked);
    });

    tulanhSwitch.addEventListener("change", function () {
        tulanhStatus(this.checked);
    });

    lightSwitch.addEventListener("change", function () {
        lightStatus(this.checked);
    });

    bellSwitch.addEventListener("change", function () {
        bellStatus(this.checked);
    });

    // Các hàm cập nhật trạng thái thiết bị lên Firebase
    function tvStatus(TVChecked) {
        tvText.textContent = TVChecked ? "Trạng thái: Bật" : "Trạng thái: Tắt";
        tvImage.src = TVChecked ? "tv_on.png" : "tv_off.png";
        tv.style.background = TVChecked ? "linear-gradient(135deg,rgb(196, 201, 216), #D88ADB, rgb(228, 13, 217))" : "white";
        database.ref("/ttiot").update({ "tivi": TVChecked ? 1 : 0 });
    }

    function ACStatus(ACChecked) {
        ACText.textContent = ACChecked ? "Trạng thái: Bật" : "Trạng thái: Tắt";
        ACImage.src = ACChecked ? "ac_on.png" : "ac_off.png";
        AC.style.background = ACChecked ? "linear-gradient(135deg,rgb(196, 201, 216), #D88ADB, rgb(228, 13, 217))" : "white";
        database.ref("/ttiot").update({ "AC": ACChecked ? 1 : 0 });
    }

    function maygiatStatus(maygiatChecked) {
        maygiatText.textContent = maygiatChecked ? "Trạng thái: Bật" : "Trạng thái: Tắt";
        maygiatImage.src = maygiatChecked ? "maygiat_on.png" : "maygiat_off.png";
        maygiat.style.background = maygiatChecked ? "linear-gradient(135deg,rgb(196, 201, 216), #D88ADB, rgb(228, 13, 217))" : "white";
        database.ref("/ttiot").update({ "maygiat": maygiatChecked ? 1 : 0 });
    }

    function tulanhStatus(tulanhChecked) {
        tulanhText.textContent = tulanhChecked ? "Trạng thái: Bật" : "Trạng thái: Tắt";
        tulanhImage.src = tulanhChecked ? "tulanh_on.png" : "tulanh_off.png";
        tulanh.style.background = tulanhChecked ? "linear-gradient(135deg, rgb(178, 184, 199), #D88ADB, rgb(228, 13, 217))" : "white";
        database.ref("/ttiot").update({ "tulanh": tulanhChecked ? 1 : 0 });
    }

    function lightStatus(lightChecked) {
        lightText.textContent = lightChecked ? "Trạng thái: Bật" : "Trạng thái: Tắt";
        lightImage.src = lightChecked ? "light_on.png" : "light_off.png";
        light.style.background = lightChecked ? "linear-gradient(135deg, rgb(177, 204, 200), #D88ADB, rgb(175, 109, 175))" : "white";
        database.ref("/ttiot").update({ "light": lightChecked ? 1 : 0 });
    }

    function bellStatus(bellChecked) {
        bellText.textContent = bellChecked ? "Trạng thái: Bật" : "Trạng thái: Tắt";
        bellImage.src = bellChecked ? "bell_on.png" : "bell_off.png";
        bell.style.background = bellChecked ? "linear-gradient(135deg,rgb(196, 201, 216), #D88ADB, rgb(228, 13, 217))" : "white";
        database.ref("/ttiot").update({ "bell": bellChecked ? 1 : 0 });
    }
});
