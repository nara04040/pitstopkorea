import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "your-mailtrap-user",
      pass: "your-mailtrap-pass"
    }
  });

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'PitStopKorea 이메일 인증',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #FF1801;">PitStopKorea 이메일 인증</h1>
          <p>아래 버튼을 클릭하여 이메일을 인증해주세요.</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 12px 24px; background: #FF1801; color: white; text-decoration: none; border-radius: 4px;">
            이메일 인증하기
          </a>
          <p style="margin-top: 20px; color: #666;">
            버튼이 작동하지 않는 경우 아래 링크를 복사하여 브라우저에 붙여넣어주세요:<br>
            ${verificationUrl}
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('이메일 발송에 실패했습니다.');
  }
} 