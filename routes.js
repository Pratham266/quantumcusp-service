const express = require('express');
const router = express.Router();
const { createTransporter, createThankYouEmailTemplate } = require('./emailConfig');
const { appendToSheet } = require('./sheetsConfig');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/contact', async (req, res) => {
    console.log("=== Received Contact Form Submission ===");
    
    const { name, email, message } = req.body;
    
    // Log received data
    console.log({
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    });

    // Validation
    if (!name || !email || !message) {
        console.error("Validation Error: Missing required fields");
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide name, email, and message' 
        });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        console.error("Validation Error: Invalid email format");
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide a valid email address' 
        });
    }

    // Validate message length (prevent spam)
    if (message.length < 10) {
        console.error("Validation Error: Message too short");
        return res.status(400).json({ 
            success: false, 
            message: 'Message must be at least 10 characters long' 
        });
    }

    if (message.length > 5000) {
        console.error("Validation Error: Message too long");
        return res.status(400).json({ 
            success: false, 
            message: 'Message must be less than 5000 characters' 
        });
    }

    try {
        // Add entry to Google Sheet
        console.log("📊 Adding entry to Google Sheet...");
        const result = await appendToSheet(name, email, message);
        
        if (result.mode === 'console-only') {
            console.log("✓ Data logged to console (Google Sheets not configured)");
        } else {
            console.log("✓ Entry added to Google Sheet successfully!");
        }

        // Create transporter for thank you email
        const transporter = createTransporter();

        // Verify transporter configuration
        await transporter.verify();
        console.log("✓ Email server is ready to send messages");

        // Create thank you email content for user
        const thankYouMailOptions = createThankYouEmailTemplate(name, email);

        // Send thank you email to user
        console.log("📧 Sending thank you email to user...");
        const thankYouInfo = await transporter.sendMail(thankYouMailOptions);
        
        console.log("✓ Thank you email sent to user successfully!");
        console.log("Message ID:", thankYouInfo.messageId);
        console.log("Response:", thankYouInfo.response);

        // Success response
        res.status(200).json({ 
            success: true, 
            message: 'Your message has been sent successfully! We will get back to you soon.' 
        });

    } catch (error) {
        console.error("=== Email Sending Error ===");
        console.error("Error:", error.message);
        console.error("Stack:", error.stack);

        // Check for specific error types
        if (error.code === 'EAUTH') {
            console.error("Authentication failed. Please check your email credentials.");
            return res.status(500).json({ 
                success: false, 
                message: 'Email service configuration error. Please contact support.' 
            });
        }

        if (error.code === 'ECONNECTION') {
            console.error("Connection failed. Please check your network and SMTP settings.");
            return res.status(500).json({ 
                success: false, 
                message: 'Unable to connect to email service. Please try again later.' 
            });
        }

        // Generic error response
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again later or contact us directly.' 
        });
    }
});

module.exports = router;
