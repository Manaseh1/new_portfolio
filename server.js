const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'file://'],
    methods: ['POST'],
    credentials: true
}));

// Rate limiting - prevents spam
const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many emails sent from this IP, please try again later.'
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to email endpoint
app.use('/api/send-email', emailLimiter);

/**
 * Email configuration using Gmail SMTP
 * You'll need to set up App Password for Gmail
 */
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS  // Your Gmail App Password
        }
    });
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Sanitize input to prevent injection
 */
const sanitizeInput = (input) => {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/[<>]/g, '')
                .trim();
};

/**
 * Email sending endpoint
 */
app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                error: 'All fields are required',
                details: 'Please fill in all form fields'
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                error: 'Invalid email format',
                details: 'Please provide a valid email address'
            });
        }

        // Sanitize inputs
        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email),
            subject: sanitizeInput(subject),
            message: sanitizeInput(message)
        };

        // Length validation
        if (sanitizedData.name.length > 100 || 
            sanitizedData.subject.length > 200 || 
            sanitizedData.message.length > 2000) {
            return res.status(400).json({
                error: 'Input too long',
                details: 'Please keep your message within reasonable limits'
            });
        }

        // Create transporter
        const transporter = createTransporter();

        // Email options
        const mailOptions = {
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.RECIPIENT_EMAIL, // Your email address
            subject: `Portfolio Contact: ${sanitizedData.subject}`,
            replyTo: sanitizedData.email,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${sanitizedData.name}</p>
                        <p><strong>Email:</strong> ${sanitizedData.email}</p>
                        <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
                    </div>
                    
                    <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
                        <h3 style="color: #495057;">Message:</h3>
                        <p style="line-height: 1.6; color: #212529;">${sanitizedData.message.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 10px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
                        <p>This email was sent from your portfolio contact form.</p>
                        <p>Time: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `
        };

        // Auto-reply to sender
        const autoReplyOptions = {
            from: `"Manaseh Njoroge" <${process.env.EMAIL_USER}>`,
            to: sanitizedData.email,
            subject: 'Thank you for contacting me!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #007bff;">Thank You for Your Message!</h2>
                    
                    <p>Hi ${sanitizedData.name},</p>
                    
                    <p>Thank you for reaching out through my portfolio contact form. I have received your message and will get back to you as soon as possible.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h4>Your Message Summary:</h4>
                        <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    </div>
                    
                    <p>I typically respond within 24-48 hours. If your inquiry is urgent, please feel free to call me directly.</p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                        <p>Best regards,<br>
                        <strong>Manaseh Njoroge</strong><br>
                        Network Engineer & Web Developer<br>
                        📧 manasehnjoroge7@gmail.com<br>
                        📱 0726166461</p>
                    </div>
                </div>
            `
        };

        // Send both emails
        console.log('Sending emails...');
        
        const [mainEmail, autoReply] = await Promise.all([
            transporter.sendMail(mailOptions),
            transporter.sendMail(autoReplyOptions)
        ]);

        console.log('Main email sent:', mainEmail.messageId);
        console.log('Auto-reply sent:', autoReply.messageId);

        // Success response
        res.status(200).json({
            success: true,
            message: 'Email sent successfully!',
            details: 'Thank you for your message. I will get back to you soon.'
        });

    } catch (error) {
        console.error('Email sending error:', error);
        
        // Send user-friendly error message
        res.status(500).json({
            error: 'Failed to send email',
            details: 'Sorry, there was a problem sending your message. Please try again later or contact me directly.',
            timestamp: new Date().toISOString()
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Email service is running',
        timestamp: new Date().toISOString()
    });
});

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        available: ['/api/send-email', '/api/health']
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong on our end'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Email service running on port ${PORT}`);
    console.log(`📧 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📨 Email endpoint: http://localhost:${PORT}/api/send-email`);
});

module.exports = app;
