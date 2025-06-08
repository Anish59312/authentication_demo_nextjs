import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

interface SendEmailParams {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "677422580bbdf2",
        pass: "9101aec7d408a1",
      },
    });

    const mailOptions = {
      from: "anish31442@gmail.com",
      to: email,
      subject:
        emailType == "VERIFY" ? "Verify your email" : " Reset your password",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/verify?token=${hashToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. 
            </br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
            </p>`,
    };

    //TODO: Reset Password Mail Remaining
    //TODO: Change verify email recivent to constant of personal email

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
