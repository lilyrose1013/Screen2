let total = 0;
let currentTipPercent = 0;

const totalDisplay = document.querySelector('.total-amount');
const receiptList = document.querySelector('.receipt-list');
const tipDisplay = document.querySelector('.tip-amount');
const buttons = document.querySelectorAll('.menu-cell');
const payTotalDisplay = document.getElementById('totalPayment');

function updateTip() {
    tipButtons.forEach(btn => {
        const percentage = parseFloat(btn.getAttribute('data-tip'));
        const tipValue = total * percentage;
        btn.querySelector('.tip-value').textContent = '$' + tipValue.toFixed(2);
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const price = parseFloat(button.getAttribute('data-price'));
        const name = button.textContent.split('$')[0].trim();
        total += price;
        totalDisplay.textContent = '$' + total.toFixed(2);
        updateTip();

        const li = document.createElement('li');
        li.innerHTML = `<span>${name}</span><span class="receipt-right"><span>$${price.toFixed(2)}</span><button class="remove-btn" data-price="${price}">X</button></span>`;
        receiptList.appendChild(li);

        li.querySelector('.remove-btn').addEventListener('click', () => {
            const removePrice = parseFloat(li.querySelector('.remove-btn').getAttribute('data-price'));
            total -= removePrice;
            totalDisplay.textContent = '$' + total.toFixed(2);
            updateTip();
            li.remove();
        });
    });
});

const tipButtons = document.querySelectorAll('.tip-btn');
let tipApplied = false;

tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (tipApplied) return;
        tipApplied = true;

        const percentage = parseFloat(btn.getAttribute('data-tip'));
        const tipValue = total * percentage;

        total += tipValue;
        totalDisplay.textContent = '$' + total.toFixed(2);

        const li = document.createElement('li');
        li.innerHTML = `<span>Tip (${btn.textContent.split('$')[0].trim()})</span><span class="receipt-right"><span>$${tipValue.toFixed(2)}</span></span>`;
        receiptList.appendChild(li);

        tipButtons.forEach(b => {
            b.disabled = true;
            b.style.opacity = '0.5';
        });
        noTipBtn.disabled = true;
        noTipBtn.style.opacity = '0.5';
    });
});

const noTipBtn = document.querySelector('.no-tip-btn');
if (noTipBtn) {
    noTipBtn.addEventListener('click', () => {
        if (tipApplied) return;
        tipApplied = true;

        const li = document.createElement('li');
        li.innerHTML = `<span>No Tip</span><span class="receipt-right"><span>$0.00</span></span>`;
        receiptList.appendChild(li);

        tipButtons.forEach(b => {
            b.disabled = true;
            b.style.opacity = '0.5';
        });
        noTipBtn.disabled = true;
        noTipBtn.style.opacity = '0.5';
    });
}

// Handle navigation to payment page and persist total
const payBtn = document.querySelector('.pay-btn');
if (payBtn) {
    payBtn.addEventListener('click', () => {
        localStorage.setItem('totalAmount', total.toString());

        let history;
        try {
            history = JSON.parse(localStorage.getItem('paymentHistory')) || [];
        } catch {
            history = [];
        }

        history.push({
            totalAmount: Number(total.toFixed(2)),
            satisfaction: null,
            timestamp: new Date().toISOString()
        });

        localStorage.setItem('paymentHistory', JSON.stringify(history));
        window.location.href = 'rate.html';
    });
}

// On the payment page, show the stored total and wire up Reset
if (document.body.classList.contains('pay-page')) {
    const storedTotal = localStorage.getItem('totalAmount');
    if (storedTotal !== null && payTotalDisplay) {
        const numericTotal = parseFloat(storedTotal) || 0;
        payTotalDisplay.textContent = '$' + numericTotal.toFixed(2);
    }

    const payResetBtn = document.getElementById('payReset');
    if (payResetBtn) {
        payResetBtn.addEventListener('click', () => {
            localStorage.removeItem('totalAmount');
            window.location.href = 'menu.html';
        });
    }
}