require('dotenv').config();
const { createTransporter, createEmailTemplate, createThankYouEmailTemplate } = require('./emailConfig');

async function testEmailConfiguration() {
    console.log("🧪 Testing Email Configuration...\n");

    // Check environment variables
    console.log("📋 Environment Variables:");
    console.log("  EMAIL_HOST:", process.env.EMAIL_HOST || "❌ Not set");
    console.log("  EMAIL_PORT:", process.env.EMAIL_PORT || "❌ Not set");
    console.log("  EMAIL_USER:", process.env.EMAIL_USER || "❌ Not set");
    console.log("  EMAIL_PASS:", process.env.EMAIL_PASS ? "✓ Set" : "❌ Not set");
    console.log("  EMAIL_FROM:", process.env.EMAIL_FROM || "❌ Not set");
    console.log("  EMAIL_TO:", process.env.EMAIL_TO || "❌ Not set");
    console.log();

    // Check if required variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("❌ ERROR: EMAIL_USER and EMAIL_PASS must be set in .env file");
        console.log("\n📖 Please read EMAIL_SETUP.md for configuration instructions");
        process.exit(1);
    }

    try {
        // Create transporter
        console.log("🔌 Creating email transporter...");
        const transporter = createTransporter();

        // Verify connection
        console.log("🔍 Verifying SMTP connection...");
        await transporter.verify();
        console.log("✅ SMTP connection verified successfully!\n");

        // Test 1: Send notification email to admin
        console.log("📧 Test 1: Sending notification email to admin...");
        const notificationMailOptions = createEmailTemplate(
            "Test User",
            "test@example.com",
            "This is a test notification email from the QuantumCusp contact form. If you receive this, your email configuration is working correctly!"
        );

        const notificationInfo = await transporter.sendMail(notificationMailOptions);
        
        console.log("✅ Notification email sent successfully!");
        console.log("📬 Message ID:", notificationInfo.messageId);
        console.log("📨 Response:", notificationInfo.response);
        console.log(`📮 Check ${process.env.EMAIL_TO} for the notification email\n`);

        // Test 2: Send thank you email to user
        console.log("📧 Test 2: Sending thank you email to user...");
        const thankYouMailOptions = createThankYouEmailTemplate(
            "Test User",
            process.env.EMAIL_USER // Send to yourself for testing
        );

        const thankYouInfo = await transporter.sendMail(thankYouMailOptions);
        
        console.log("✅ Thank you email sent successfully!");
        console.log("📬 Message ID:", thankYouInfo.messageId);
        console.log("📨 Response:", thankYouInfo.response);
        console.log(`📮 Check ${process.env.EMAIL_USER} for the thank you email\n`);

        console.log("✨ All email tests passed successfully!");
        console.log("\n📊 Summary:");
        console.log("  ✓ Notification email to admin: SENT");
        console.log("  ✓ Thank you email to user: SENT");
        console.log("\n🎉 Your email system is fully configured and working!");

    } catch (error) {
        console.error("\n❌ Email Configuration Test Failed!");
        console.error("Error:", error.message);
        
        if (error.code === 'EAUTH') {
            console.error("\n💡 Authentication Error:");
            console.error("   - Check your EMAIL_USER and EMAIL_PASS in .env");
            console.error("   - For Gmail, use an app-specific password");
            console.error("   - Ensure 2FA is enabled on your account");
        } else if (error.code === 'ECONNECTION') {
            console.error("\n💡 Connection Error:");
            console.error("   - Check your EMAIL_HOST and EMAIL_PORT");
            console.error("   - Verify your firewall allows SMTP connections");
            console.error("   - Try using port 465 with EMAIL_SECURE=true");
        }
        
        console.log("\n📖 For detailed setup instructions, see EMAIL_SETUP.md");
        process.exit(1);
    }
}

// Run the test
testEmailConfiguration();
