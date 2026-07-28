import resend
from app.config import settings
import logging

logger = logging.getLogger(__name__)

resend.api_key = settings.RESEND_API_KEY

def send_verification_email(email: str, token: str, full_name: str) -> bool:
    verify_url = f"{settings.FRONTEND_URL}/verify-email?token={token}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background-color: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-size: 48px;">🎙️</span>
                <h2 style="color: #2563eb; margin-top: 10px;">AI Voice Platform</h2>
            </div>
            
            <h3 style="color: #1a1a1a;">Hello {full_name},</h3>
            
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Thank you for signing up! Please verify your email address to complete your registration.
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="{verify_url}" 
                   style="background-color: #2563eb; color: white; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                    Verify Email Address
                </a>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.5;">
                This link will expire in <strong>24 hours</strong>.
            </p>
            
            <p style="color: #888; font-size: 13px; margin-top: 20px;">
                If you didn't create an account, please ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
                AI Voice Platform &bull; 2025
            </p>
        </div>
    </body>
    </html>
    """
    
    try:
        params = {
            "from": settings.EMAIL_FROM,
            "to": [email],
            "subject": "Verify Your Email - AI Voice Platform",
            "html": html_content,
        }
        response = resend.Emails.send(params)
        logger.info(f"Verification email sent to {email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False