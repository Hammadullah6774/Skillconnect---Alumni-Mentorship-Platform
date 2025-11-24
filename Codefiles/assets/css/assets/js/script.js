/**
 * SkillConnect - Alumni Mentorship Platform
 * Main JavaScript File (script.js)
 * Implements interactivity, validation, and core features.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if a specific form/element exists before running the script
    if (document.getElementById('loginForm')) {
        handleLoginForm();
    }
    if (document.getElementById('profileForm')) {
        handleProfileEdit();
    }
    if (document.getElementById('mentorSearch')) {
        handleMentorSearch();
        handleMentorBooking();
    }
    if (document.getElementById('chatForm')) {
        handleChatMessaging();
    }
    if (document.getElementById('feedbackForm')) {
        handleFeedbackForm();
    }
    if (document.querySelector('.action-card')) {
        handleDashboardCardHove();
    }

    // Export global validation function for index.html inline script
    window.validateLogin = validateLogin;
});


// ====================================================
// 1. Login Form Validation (index.html)
// ====================================================

/**
 * Validates the login form fields.
 * @returns {boolean} True if validation passes, false otherwise.
 */
function validateLogin() {
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    // Email validation (simple check for content)
    if (email.value.trim() === '' || !email.value.includes('@')) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
    }

    // Password validation (min 6 characters)
    if (password.value.length < 6) {
        password.classList.add('is-invalid');
        isValid = false;
    } else {
        password.classList.remove('is-invalid');
    }

    return isValid;
}

function handleLoginForm() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(e) {
        // Validation is handled by the inline script in index.html for redirection
        // This is here for completeness but the actual redirect logic is separate.
    });
}

// ====================================================
// 2. Profile Edit Toggle (profile.html)
// ====================================================

function handleProfileEdit() {
    const editBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    const formInputs = document.querySelectorAll('#profileForm input, #profileForm textarea');
    let isEditing = false;

    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;

        if (isEditing) {
            // Switch to Edit Mode
            editBtn.classList.add('d-none');
            saveBtn.classList.remove('d-none');
            formInputs.forEach(input => {
                input.removeAttribute('readonly');
                input.classList.remove('form-control-plaintext');
                input.classList.add('form-control');
            });
        }
    });

    saveBtn.addEventListener('click', () => {
        // Simulate saving data (in a real app, this would involve an API call)
        alert('Profile Updated Successfully!');
        
        // Switch back to Read-Only Mode
        isEditing = false;
        saveBtn.classList.add('d-none');
        editBtn.classList.remove('d-none');
        formInputs.forEach(input => {
            input.setAttribute('readonly', 'readonly');
            input.classList.remove('form-control');
            input.classList.add('form-control-plaintext');
        });
        
        // Update display name (example)
        document.getElementById('profileNameDisplay').textContent = document.getElementById('inputName').value;
    });
}

// ====================================================
// 3. Live Search for Mentors (sessions.html)
// ====================================================

function handleMentorSearch() {
    const searchInput = document.getElementById('mentorSearch');
    const mentorCards = document.querySelectorAll('.mentor-card');

    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.toLowerCase();

        mentorCards.forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            const skills = card.getAttribute('data-skills').toLowerCase();
            
            // Check if name or skills include the search term
            if (name.includes(searchTerm) || skills.includes(searchTerm)) {
                card.style.display = 'block'; // Show the card
                card.classList.add('animate__animated', 'animate__fadeInUp');
                // Remove animation classes after delay
                setTimeout(() => {
                    card.classList.remove('animate__animated', 'animate__fadeInUp');
                }, 500);
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });
}

// ====================================================
// 4. Modal Booking Confirmation (sessions.html)
// ====================================================

function handleMentorBooking() {
    const bookingModal = document.getElementById('bookingModal');
    const modalMentorName = document.getElementById('modalMentorName');
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');

    // Listener to update modal content when it's about to be shown
    bookingModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget; // Button that triggered the modal
        const mentorName = button.getAttribute('data-mentor-name');
        
        modalMentorName.textContent = mentorName;
    });

    // Listener for the final confirmation button inside the modal
    confirmBookingBtn.addEventListener('click', function() {
        const mentor = modalMentorName.textContent;
        
        // Logic to confirm and close modal
        alert(`Session with ${mentor} confirmed! You will receive an email shortly.`);
        
        // Hide the modal manually
        const modalInstance = bootstrap.Modal.getInstance(bookingModal) || new bootstrap.Modal(bookingModal);
        modalInstance.hide();
    });
}

// ====================================================
// 5. Chat Message Sending + Auto Scroll (chat.html)
// ====================================================

function scrollToBottom() {
    const messagesArea = document.getElementById('chatMessages');
    if (messagesArea) {
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }
}

function handleChatMessaging() {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const messageText = messageInput.value.trim();
        
        if (messageText !== '') {
            // Create the new message bubble (User's message)
            const msgContainer = document.createElement('div');
            msgContainer.className = 'd-flex justify-content-end mb-2';
            
            const msgBubble = document.createElement('div');
            msgBubble.className = 'msg-bubble user-bubble bg-primary text-white animate__animated animate__fadeInRight';
            msgBubble.innerHTML = `${messageText}<div class="msg-time text-end">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>`;
            
            msgContainer.appendChild(msgBubble);
            chatMessages.appendChild(msgContainer);

            // Clear input and scroll
            messageInput.value = '';
            scrollToBottom();
            
            // Optional: Simulate Mentor Reply (for demonstration)
            setTimeout(() => {
                const replyContainer = document.createElement('div');
                replyContainer.className = 'd-flex justify-content-start mb-2';
                
                const replyBubble = document.createElement('div');
                replyBubble.className = 'msg-bubble mentor-bubble animate__animated animate__fadeInLeft';
                replyBubble.innerHTML = `Got your message! I'll check on that for you.<div class="msg-time">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>`;
                
                replyContainer.appendChild(replyBubble);
                chatMessages.appendChild(replyContainer);
                scrollToBottom();
            }, 1500);
        }
    });
}


// ====================================================
// 6. Feedback Form Validation and Success Alert (feedback.html)
// ====================================================

function handleFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    const alertContainer = document.getElementById('feedbackAlertContainer');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Use Bootstrap's built-in validation (adds 'was-validated' class)
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Custom check for rating (since radio buttons are tricky)
        const rating = form.querySelector('input[name="rating"]:checked');
        if (!rating) {
            form.classList.add('was-validated');
            return;
        }

        // Validation passed, show success alert
        alertContainer.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i><strong>Thank you for your feedback!</strong> Your input is greatly appreciated.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Reset form and validation classes
        form.reset();
        form.classList.remove('was-validated');
    });
}

// ====================================================
// 7. Small Animations / Hovers (dashboard.html)
// ====================================================

function handleDashboardCardHove() {
    const cards = document.querySelectorAll('.action-card');
    cards.forEach(card => {
        // Optional: Add simple JS for click/tap to simulate navigation if stretched-link fails
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) { // Prevent double-clicking the link
                 window.location.href = this.getAttribute('data-target');
            }
        });
    });
}