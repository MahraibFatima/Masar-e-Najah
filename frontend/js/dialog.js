// Create and inject dialog styles
const style = document.createElement('style');
style.textContent = `
    .success-dialog {
        display: none;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        text-align: center;
        min-width: 300px;
        animation: slideDown 0.5s ease-out;
    }

    @keyframes slideDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }

    .success-dialog h2 {
        color: #4CAF50;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }

    .success-dialog p {
        margin-bottom: 0.5rem;
        color: #333;
        font-size: 1rem;
    }

    .success-dialog button {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.3s ease;
        margin: 0.5rem 0;
    }

    .success-dialog button:hover {
        background: #45a049;
    }

    .countdown {
        font-size: 0.8rem;
        color: #666;
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(style);

// Create dialog element
const dialog = document.createElement('div');
dialog.className = 'success-dialog';
dialog.innerHTML = `
    <h2>Success!</h2>
    <p id="dialog-message"></p>
    <button id="dialog-button">Continue</button>
    <div class="countdown" id="countdown"></div>
`;
document.body.appendChild(dialog);

// Function to show success dialog
function showSuccessDialog(message, redirectUrl = null) {
    const dialogMessage = document.getElementById('dialog-message');
    const dialogButton = document.getElementById('dialog-button');
    const countdownElement = document.getElementById('countdown');
    
    dialogMessage.textContent = message;
    dialog.style.display = 'block';

    // Dialog countdown
    let timeLeft = 5;
    countdownElement.textContent = `Redirecting in ${timeLeft} seconds...`;
    
    const countdownInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = `Redirecting in ${timeLeft} seconds...`;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }
    }, 1000);

    dialogButton.onclick = () => {
        clearInterval(countdownInterval);
        dialog.style.display = 'none';
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    };
}

// Export the function
window.showSuccessDialog = showSuccessDialog; 