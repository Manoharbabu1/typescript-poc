// Simple data for demonstration
const assetCatalog = {
    hardware: [
        {id: "LAP-STD-01", name: "Dell Latitude 5420", specs: "Intel i5, 16GB RAM, 256GB SSD", roles: ["General Staff"]},
        {id: "LAP-STD-02", name: "Dell Latitude 7420", specs: "Intel i7, 16GB RAM, 512GB SSD", roles: ["Manager"]},
        {id: "LAP-DEV-01", name: "Dell XPS 15", specs: "Intel i9, 32GB RAM, 1TB SSD", roles: ["Developer"]}
    ],
    software: [
        {id: "SW-O365-01", name: "Microsoft 365", specs: "E3 License", roles: ["All"]},
        {id: "SW-ADOBE-01", name: "Adobe Creative Cloud", specs: "All Apps", roles: ["Designer"]}
    ]
};

// Current user (for demo)
const currentUser = {
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Developer",
    department: "Engineering"
};

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('form-container');
    let currentStep = 1;
    const totalSteps = 5;
    let requestData = {
        userId: "user123",
        userName: currentUser.name,
        userRole: currentUser.role
    };
    
    // Create the form steps
    createFormSteps();
    showStep(currentStep);
    
    function createFormSteps() {
        // Step 1: Request Type
        const step1 = createStep(1, "What type of asset do you need?");
        step1.innerHTML += `
            <div class="options">
                <div class="option" onclick="selectOption('assetType', 'Hardware')">
                    <img src="https://via.placeholder.com/100?text=Hardware" alt="Hardware">
                    <span>Hardware</span>
                </div>
                <div class="option" onclick="selectOption('assetType', 'Software')">
                    <img src="https://via.placeholder.com/100?text=Software" alt="Software">
                    <span>Software</span>
                </div>
                <div class="option" onclick="selectOption('assetType', 'Accessory')">
                    <img src="https://via.placeholder.com/100?text=Accessory" alt="Accessory">
                    <span>Accessory</span>
                </div>
            </div>
        `;
        formContainer.appendChild(step1);
        
        // More steps would be added here...
        
        // Add navigation buttons
        const navButtons = document.createElement('div');
        navButtons.className = 'nav-buttons';
        navButtons.innerHTML = `
            <button id="back-button" class="back-button" style="display:none">Back</button>
            <button id="next-button">Next</button>
        `;
        formContainer.appendChild(navButtons);
        
        // Set up button listeners
        document.getElementById('next-button').addEventListener('click', nextStep);
        document.getElementById('back-button').addEventListener('click', prevStep);
    }
    
    // Helper functions
    function createStep(number, title) {
        const step = document.createElement('div');
        step.className = 'step';
        step.id = `step-${number}`;
        step.innerHTML = `<h2>Step ${number}: ${title}</h2>`;
        return step;
    }
    
    function showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        document.getElementById(`step-${stepNumber}`).classList.add('active');
        
        // Update buttons
        document.getElementById('back-button').style.display = 
            stepNumber > 1 ? 'inline-block' : 'none';
        
        document.getElementById('next-button').textContent = 
            stepNumber === totalSteps ? 'Submit' : 'Next';
    }
    
    function nextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        } else {
            submitRequest();
        }
    }
    
    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    }
    
    function submitRequest() {
        formContainer.innerHTML = `
            <div class="success-message">
                <h2>Request Submitted Successfully!</h2>
                <p>Request ID: REQ-${Math.floor(Math.random() * 10000)}</p>
                <p>We'll notify you when your request is approved.</p>
                <button onclick="location.reload()">Start New Request</button>
            </div>
        `;
    }
    
    // Make the selectOption function globally available
    window.selectOption = function(field, value) {
        requestData[field] = value;
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        event.currentTarget.classList.add('selected');
    };
});
