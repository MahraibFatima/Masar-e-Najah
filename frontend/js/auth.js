// Backend API endpoint
const API_URL = 'http://localhost:3000';

// Handle signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Show success dialog
                showSuccessDialog('Account created successfully! Welcome to Masar-e-Najah.', 'index.html');
            } else {
                if (data.redirect) {
                    // Show message and redirect to login page
                    showSuccessDialog('Account already exists. Redirecting to login page...', data.redirect);
                } else {
                    alert(data.error || 'Error signing up');
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Error signing up. Please try again.');
        }
    });
}

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Show success dialog
                showSuccessDialog('Login successful! Welcome back.', 'index.html');
            } else {
                alert(data.error || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Error logging in. Please try again.');
        }
    });
} 