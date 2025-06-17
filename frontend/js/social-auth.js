// Handle social login buttons
document.addEventListener('DOMContentLoaded', () => {
    // Google login button
    const googleButton = document.querySelector('.social-login.google');
    if (googleButton) {
        googleButton.addEventListener('click', () => {
            window.location.href = `${API_URL}/auth/google`;
        });
    }

    // GitHub login button
    const githubButton = document.querySelector('.social-login.github');
    if (githubButton) {
        githubButton.addEventListener('click', () => {
            window.location.href = `${API_URL}/auth/github`;
        });
    }
}); 