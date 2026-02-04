/*  battery managements  */
async function updateBatteryStatus() {
    if (!navigator.getBattery) return;

    const battery = await navigator.getBattery();

    function update() {
        const level = Math.floor(battery.level * 100);
        const statusDiv = document.getElementById('batteryStatus');
        const levelDiv = document.getElementById('batteryLevel');

        statusDiv.textContent = battery.charging ? 'Charging' : 'Discharging';
        levelDiv.textContent = `battery level: ${level}%`;

        let color;
        if (battery.charging) {
            color = 'blue';
        } else if (level <= 10) {
            color = 'red';
        } else if (level <= 20) {
            color = 'orange';
        } else if (level <= 80) {
            color = 'black';
        } else {  // 81-100%
            color = 'green';
        }

        levelDiv.style.color = color;
        statusDiv.style.color = color;
    }

    // boot
    update();

    // realtime
    battery.addEventListener('levelchange', update);
    battery.addEventListener('chargingchange', update);
}

document.addEventListener('DOMContentLoaded', updateBatteryStatus);

/*  clock sync  */

function updateClock() {
    const now = new Date();
    
    //  day YYYY/MM/DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // week（Sun=0）
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekday = daysOfWeek[now.getDay()];

    // time: HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // print: 2026年4月1日(火) 10:50
    //const dateTimeString = `${year}年${month}月${day}日(${weekday}) ${hours}:${minutes}`;
    const dateTimeString = `${month}月${day}日(${weekday})  ${hours}:${minutes}`;
    document.getElementById('clock').textContent = dateTimeString;
}

// boot
updateClock();
// realtime
setInterval(updateClock, 1000);  // 1000ms=1s

