// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
          const mobileMenuToggle = document.getElementById("mobileMenuToggle")
          const navLinks = document.getElementById("navLinks")
        
          if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener("click", () => {
              navLinks.classList.toggle("active")
            })
          }
        
          // Welcome Name Functionality
          initializeWelcomeName()
        
          // Form Validation and Results Display
          initializeFormValidation()
        
          // Smooth scrolling for navigation
          initializeSmoothScrolling()
        
          initializeResultsPanel()
        })
        
        // Welcome Name Feature
        function initializeWelcomeName() {
          const welcomeNameElement = document.getElementById("welcomeName")
          if (!welcomeNameElement) return
        
          const storedName = localStorage.getItem("userName")
          if (storedName) {
            welcomeNameElement.textContent = storedName
          } else {
            const userName = prompt("Welcome! Please enter your name:")
            if (userName && userName.trim()) {
              const cleanName = userName.trim()
              welcomeNameElement.textContent = cleanName
              localStorage.setItem("userName", cleanName)
            }
          }
        }
        
        function initializeFormValidation() {
          const contactForm = document.getElementById("contactForm")
          if (!contactForm) return
        
          contactForm.addEventListener("submit", (e) => {
            e.preventDefault()
        
            const name = document.getElementById("name").value.trim()
            const birthDate = document.getElementById("birthDate").value
            const gender = document.querySelector('input[name="gender"]:checked')?.value
            const message = document.getElementById("message").value.trim()
        
            let isValid = true
        
            // Simple validation - just check if fields are filled
            if (!name || !birthDate || !gender || !message) {
              alert("Mohon lengkapi semua field!")
              isValid = false
            }
        
            if (isValid) {
              updateResultsPanel(name, birthDate, gender, message)
              alert("Pesan berhasil dikirim!")
            }
          })
        }
        
        function updateResultsPanel(name, birthDate, gender, message) {
          const currentTime = new Date()
            .toLocaleString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .replace(/\//g, "/")
            .replace(",", ",")
        
          document.getElementById("currentTime").textContent = currentTime
          document.getElementById("resultName").textContent = name
          document.getElementById("resultBirthDate").textContent = new Date(birthDate).toLocaleDateString("id-ID")
          document.getElementById("resultGender").textContent = gender
          document.getElementById("resultMessage").textContent = message
        
          console.log("Form Data Updated:", { name, birthDate, gender, message, currentTime })
        }
        
        function initializeSmoothScrolling() {
          const navLinks = document.querySelectorAll('.nav-links a[href^="#"]')
        
          navLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
              e.preventDefault()
              const targetId = link.getAttribute("href").substring(1)
              const targetElement = document.getElementById(targetId)
        
              if (targetElement) {
                // Update active navigation
                document.querySelectorAll(".nav-links a").forEach((navLink) => {
                  navLink.classList.remove("active")
                })
                link.classList.add("active")
        
                // Smooth scroll to target
                targetElement.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
        
                // Close mobile menu if open
                const navLinksContainer = document.getElementById("navLinks")
                if (navLinksContainer) {
                  navLinksContainer.classList.remove("active")
                }
              }
            })
          })
        }
        
        function initializeResultsPanel() {
          const currentTime = new Date()
            .toLocaleString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .replace(/\//g, "/")
            .replace(",", ",")
        
          document.getElementById("currentTime").textContent = currentTime
          document.getElementById("resultName").textContent = "Belum diisi"
          document.getElementById("resultBirthDate").textContent = "Belum diisi"
          document.getElementById("resultGender").textContent = "Belum dipilih"
          document.getElementById("resultMessage").textContent = "Belum ada pesan"
        }
        
        // Update current time display
        function updateCurrentTime() {}
        
        // Helper Functions
        function showError(groupId, errorId, message) {
          const group = document.getElementById(groupId)
          const error = document.getElementById(errorId)
        
          if (group && error) {
            group.classList.add("error")
            error.textContent = message
          }
        }
        
        function clearErrors() {
          const errorGroups = document.querySelectorAll(".form-group.error")
          errorGroups.forEach((group) => {
            group.classList.remove("error")
          })
        }
        
        function isValidEmail(email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(email)
        }
        
        function isValidPhone(phone) {
          // Remove all non-digit characters
          const cleanPhone = phone.replace(/\D/g, "")
          // Check if it's between 10-15 digits
          return cleanPhone.length >= 10 && cleanPhone.length <= 15
        }
        