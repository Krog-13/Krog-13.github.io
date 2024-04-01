
let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy")
let order = document.getElementById("order")
tg.expand()

buy.addEventListener("click", () => {
    document.getElementById("main").style.display = "none"
    document.getElementById("form").style.display = "block"
    document.getElementById("address").value = "Leepstick"
    document.getElementById("myname").value = tg.initDataUnsafe.user.first_name
});

let initdata = tg.initData
let dataunsave = tg.initDataUnsafe

order.addEventListener("click", () => {

    console.log("Init data above")
    console.log(initdata)
    console.log(dataunsave)
    console.log(dataunsave.user)
    let address = document.getElementById("address").value
    console.log(address)
    let data = {
        address: address
    }
    tg.sendData(JSON.stringify(data))
    tg.close()
})
