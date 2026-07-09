import transporter from "../config/mail";
import env from "../config/env";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({
  to,
  subject,
  html,
}: SendMailOptions) => {
  await transporter.sendMail({
    from: env.mail.from,
    to,
    subject,
    html,
  });
};

export const sendOtpMail = async (
  email: string,
  otp: string
) => {
  const html = `
  <div style="font-family:Arial,sans-serif;padding:30px;">
      <h2>BuildHub Verification</h2>

      <p>Your verification code is</p>

      <h1 style="letter-spacing:6px;">
        ${otp}
      </h1>

      <p>
        This OTP will expire in
        <strong>5 minutes</strong>.
      </p>

      <hr>

      <small>
        If you didn't request this,
        please ignore this email.
      </small>
  </div>
  `;

  await sendMail({
    to: email,
    subject: "BuildHub OTP Verification",
    html,
  });
};