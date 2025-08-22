# Email Backend Setup Instructions

## 📧 **Setting Up Gmail for Your Portfolio Contact Form**

### **Step 1: Install Dependencies**

```bash
npm install
```

This will install all the necessary packages for the email backend.

### **Step 2: Set Up Gmail App Password**

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Navigate to Security** in the left sidebar
3. **Enable 2-Factor Authentication** (if not already enabled)
4. **Generate App Password**:
   - Click "App passwords" under "Signing in to Google"
   - Select "Mail" as the app
   - Select your device
   - Click "Generate"
   - **Copy the 16-character password** (you'll need this!)

### **Step 3: Configure Environment Variables**

Edit the `.env` file and replace with your actual details:

```env
# Your Gmail address
EMAIL_USER=manasehnjoroge7@gmail.com

# Your Gmail App Password (16 characters, no spaces)
EMAIL_PASS=abcd efgh ijkl mnop

# Where emails should be sent (usually same as EMAIL_USER)
RECIPIENT_EMAIL=manasehnjoroge7@gmail.com

# Server port
PORT=3001
```

⚠️ **Important**: Use the **App Password**, not your regular Gmail password!

### **Step 4: Run the Email Server**

```bash
# Option 1: Run email server only
npm run server

# Option 2: Run both frontend and backend together
npm run full-dev
```

### **Step 5: Test the Setup**

1. Open your portfolio: http://localhost:3000
2. Fill out the contact form
3. Submit the form
4. Check your email - you should receive the message!
5. The sender should also receive an auto-reply confirmation

## 🔧 **Available Scripts**

```bash
npm start        # Frontend only (portfolio website)
npm run server   # Backend only (email server)
npm run full-dev # Both frontend and backend together
npm run dev      # Frontend with live reload
```

## 🌐 **How It Works**

1. **Frontend**: User fills contact form on your portfolio
2. **AJAX Request**: Form data sent to `http://localhost:3001/api/send-email`
3. **Backend**: Node.js server receives and validates the data
4. **Email Service**: Uses Gmail SMTP to send emails
5. **Response**: Frontend shows success/error message

## 📬 **Email Features**

### **Main Email (to you)**
- Professional HTML formatting
- Includes sender's details
- Reply-to set to sender's email
- Timestamp included

### **Auto-Reply (to sender)**
- Professional thank you message
- Includes your contact details
- Confirms message was received

## 🛡️ **Security Features**

- **Rate Limiting**: Max 5 emails per 15 minutes per IP
- **Input Sanitization**: Prevents code injection
- **Validation**: Checks email format and required fields
- **CORS Protection**: Only allows requests from your domain
- **Helmet**: Adds security headers

## 🚀 **For Production Deployment**

### **Environment Variables on Server**
Set these on your hosting platform:
- `EMAIL_USER`
- `EMAIL_PASS`
- `RECIPIENT_EMAIL`
- `PORT`
- `NODE_ENV=production`

### **Update Frontend API URL**
In `script.js`, change:
```javascript
// Development
const response = await fetch('http://localhost:3001/api/send-email', {

// Production (replace with your domain)
const response = await fetch('https://yourdomain.com/api/send-email', {
```

## 🐛 **Troubleshooting**

### **"Authentication failed"**
- Check your Gmail App Password is correct
- Make sure 2FA is enabled on your Google account
- Use App Password, not regular password

### **"Network error"**
- Make sure the email server is running (`npm run server`)
- Check the server is on port 3001
- Verify CORS settings

### **"Too many emails"**
- Rate limit hit (5 emails per 15 minutes per IP)
- Wait 15 minutes and try again

### **Emails not received**
- Check spam folder
- Verify `RECIPIENT_EMAIL` in `.env`
- Check server logs for errors

## 📞 **Support**

If you need help setting this up:
1. Check the console for error messages
2. Look at server logs when testing
3. Verify all environment variables are set correctly

Your contact form is now fully functional and will send real emails! 🎉
