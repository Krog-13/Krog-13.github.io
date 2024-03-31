
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
    let address = document.getElementById("address")
    let data = {
        address: address
    }
    tg.sendData(JSON.stringify(data))
    tg.close()
})