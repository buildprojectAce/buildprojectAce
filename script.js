function updatePayment() {
    const addressInput = document.getElementById('input-address').value.trim();
    const btcInput = document.getElementById('input-amount-btc').value.trim();
    const usdInput = document.getElementById('input-amount-usd').value.trim();
    const timestampInput = document.getElementById('input-timestamp').value.trim();
    const addressDisplay = document.getElementById('bitcoin-address');
    const btcDisplay = document.getElementById('bitcoin-amount');
    const usdDisplay = document.getElementById('usd-amount');
    const timestampDisplay = document.getElementById('timestamp');

    // Update Bitcoin address
    if (addressInput) {
        addressDisplay.textContent = addressInput;
    }

    // Update BTC amount (no conversion, just display the input)
    if (btcInput && btcInput >= 0) {
        const btcAmount = parseFloat(btcInput);
        btcDisplay.textContent = `${btcAmount.toFixed(8)} BTC`;
    }

    // Update USD amount (no conversion, just display the input)
    if (usdInput && usdInput >= 0) {
        const usdAmount = parseFloat(usdInput);
        usdDisplay.textContent = `$${usdAmount.toFixed(2)} USD`;
    }

    // Update timestamp
    if (timestampInput) {
        timestampDisplay.textContent = timestampInput;
    }
}

function updateStatus() {
    const statusSelect = document.getElementById('input-status').value;
    const statusSection = document.querySelector('.status-section');
    const statusIcon = document.getElementById('status-icon');
    const statusText = document.getElementById('status-text');

    // Remove previous status classes
    statusSection.classList.remove('completed', 'pending', 'failed');

    // Update based on selected status
    if (statusSelect === 'completed') {
        statusSection.classList.add('completed');
        statusIcon.textContent = '✓';
        statusText.textContent = 'Completed';
    } else if (statusSelect === 'pending') {
        statusSection.classList.add('pending');
        statusIcon.textContent = '⏳';
        statusText.textContent = 'Pending';
    } else if (statusSelect === 'failed') {
        statusSection.classList.add('failed');
        statusIcon.textContent = '✗';
        statusText.textContent = 'Failed';
    }
}

function downloadReceipt() {
    const receiptElement = document.getElementById('receipt');

    // Use html2canvas to capture the receipt section as an image
    html2canvas(receiptElement, {
        backgroundColor: '#1a1a1a', // Match the background color
        scale: 2 // Increase resolution for better quality
    }).then(canvas => {
        // Convert the canvas to a downloadable image
        const imgData = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'bitcoin_withdrawal_receipt.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }).catch(error => {
        console.error('Error generating receipt image:', error);
        alert('Failed to generate receipt image. Please try again.');
    });
}
