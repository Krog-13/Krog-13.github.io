
let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy")
let order = document.getElementById("order")
tg.expand()

buy.addEventListener("click", () => {
    document.getElementById("main").style.display = "none"
    document.getElementById("form").style.display = "block"
    document.getElementById("address").value = "Leepstick"
});

let initdata = tg.initData()
let dataunsave = tg.initDataUnsafe()

order.addEventListener("click", () => {

    console.log("Init data above")
    console.log(initdata)
    console.log(dataunsave)

    let address = document.getElementById("address").value
    console.log(address)
    let data = {
        address: address
    }
    tg.sendData(JSON.stringify(data))
    tg.close()
})
