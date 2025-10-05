import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendAirQualityAlert(
  userEmail: string,
  userName: string,
  alertData: {
    location: string
    aqi: number
    pollutant: string
    level: string
    message: string
  }
) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `🚨 Air Quality Alert - ${alertData.level} Level in ${alertData.location}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e74c3c;">🚨 Air Quality Alert</h2>
        
        <p>Hello ${userName},</p>
        
        <p>We've detected concerning air quality levels in your area:</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #2c3e50;">Alert Details</h3>
          <p><strong>Location:</strong> ${alertData.location}</p>
          <p><strong>Air Quality Index:</strong> ${alertData.aqi}</p>
          <p><strong>Primary Pollutant:</strong> ${alertData.pollutant}</p>
          <p><strong>Alert Level:</strong> <span style="color: #e74c3c; font-weight: bold;">${alertData.level}</span></p>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
          <p style="margin: 0;"><strong>Health Advisory:</strong></p>
          <p style="margin: 5px 0 0 0;">${alertData.message}</p>
        </div>
        
        <p style="margin-top: 20px;">
          <a href="http://localhost:3000" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View Full Dashboard
          </a>
        </p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #6c757d; font-size: 12px;">
          This alert was sent by AeroScope - See the air, shape the future.<br>
          You're receiving this because you have air quality alerts enabled for your location.
        </p>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Alert email sent successfully to:', userEmail)
    return true
  } catch (error) {
    console.error('Failed to send alert email:', error)
    return false
  }
}