
let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy")
let order = document.getElementById("order")
tg.expand()

buy.addEventListener("click", () => {
    document.getElementById("main").style.display = "none"
    document.getElementById("form").style.display = "block"
    document.getElementById("address").value = "Petrick"
});

order.addEventListener("click", () => {
    console.log("testest")
    let address = document.getElementById("address").value
    console.log(address)
    let data = {
        address: address
    }
    tg.sendData(JSON.stringify(data))
    tg.close()
})