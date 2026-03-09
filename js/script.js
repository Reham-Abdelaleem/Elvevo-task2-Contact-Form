// Get form elements
const form = document.getElementById('contactForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');
const successMessage = document.getElementById('successMessage');
// Character counter for message
messageInput.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = count;   
    const counter = charCount.parentElement;
    counter.classList.remove('warning', 'danger');
    if (count > 400) {
        counter.classList.add('danger');
    } else if (count > 300) {
        counter.classList.add('warning');
    }
});
// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Validation functions
function validateFullName() {
    const value = fullNameInput.value.trim();
    const formGroup = fullNameInput.closest('.form-group');    
    if (value === '') {
        setError(formGroup, 'Please enter your full name');
        return false;
    } else if (value.length < 3) {
        setError(formGroup, 'Name must be at least 3 characters');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}
function validateEmail() {
    const value = emailInput.value.trim();
    const formGroup = emailInput.closest('.form-group');    
    if (value === '') {
        setError(formGroup, 'Please enter your email address');
        return false;
    } else if (!emailRegex.test(value)) {
        setError(formGroup, 'Please enter a valid email address');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}
function validateSubject() {
    const value = subjectInput.value.trim();
    const formGroup = subjectInput.closest('.form-group');
    if (value === '') {
        setError(formGroup, 'Please enter a subject');
        return false;
    } else if (value.length < 3) {
        setError(formGroup, 'Subject must be at least 3 characters');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}
function validateMessage() {
    const value = messageInput.value.trim();
    const formGroup = messageInput.closest('.form-group');
    if (value === '') {
        setError(formGroup, 'Please enter your message');
        return false;
    } else if (value.length < 10) {
        setError(formGroup, 'Message must be at least 10 characters');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}
// Set error state
function setError(formGroup, message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    const errEl = formGroup.querySelector('.error-message');
    if (errEl) errEl.classList.remove('d-none');
    const errorMessage = formGroup.querySelector('.error-message span');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}
// Set success state
function setSuccess(formGroup) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    const errEl2 = formGroup.querySelector('.error-message');
    if (errEl2) errEl2.classList.add('d-none');
}
// Real-time validation
fullNameInput.addEventListener('blur', validateFullName);
emailInput.addEventListener('blur', validateEmail);
subjectInput.addEventListener('blur', validateSubject);
messageInput.addEventListener('blur', validateMessage);
// Remove error on input
[fullNameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', function() {
        const formGroup = this.closest('.form-group');
        if (formGroup.classList.contains('error')) {
            formGroup.classList.remove('error');
        }
    });
});
// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();   
    // Validate all fields
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    // If all fields are valid
    if (isFullNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Disable submit button
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        // Simulate form submission (replace with actual submission)
        setTimeout(() => {
            // Show success message
            successMessage.classList.add('show');
            // Reset form
            form.reset();
            charCount.textContent = '0';           
            // Remove success classes
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success', 'error');
            });           
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';           
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }, 1500);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
// Prevent form submission on Enter key (except in textarea)
form.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});