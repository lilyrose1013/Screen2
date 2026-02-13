const totalPayment = document.getElementById("totalPayment");
const savedPayment = localStorage.getItem("totalAmount");

const ratingInputs = document.querySelectorAll(
  'input[type="radio"][name="satisfaction"]',
);

if (savedPayment !== null && totalPayment && !totalPayment.textContent.trim()) {
  const numericTotal = parseFloat(savedPayment) || 0;
  totalPayment.textContent = "$" + numericTotal.toFixed(2);
}

const payResetBtn = document.getElementById("payReset");
if (payResetBtn) {
  payResetBtn.addEventListener("click", () => {
    localStorage.removeItem("totalAmount");
    window.location.href = "menu.html";
  });
}

ratingInputs.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const selectedValue = e.target.value;

    // read history
    let history;
    try {
      history = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    } catch {
      history = [];
    }

    // add rating to json
    if (history.length > 0) {
      history[history.length - 1].satisfaction = selectedValue;
      localStorage.setItem("paymentHistory", JSON.stringify(history));
    }
  });
});

const downloadBtn = document.getElementById("downloadJson");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const raw = localStorage.getItem("paymentHistory") || "[]";
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "paymentHistory.json";
    a.click();

    URL.revokeObjectURL(url);
  });
}
