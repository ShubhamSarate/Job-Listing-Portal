import nodemailer from "nodemailer";

// ===============================
// Create Transporter
// ===============================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ===============================
// Verify Mail Connection
// ===============================
transporter.verify((error, success) => {
  if (error) {
    console.log("MAIL SERVER ERROR:", error);
  } else {
    console.log("MAIL SERVER READY");
  }
});

// ===============================
// Send Verification Email
// ===============================
const sendVerificationEmail = async (
  email,
  token
) => {
  try {

    // Safety Check
    if (!email || !token) {
      throw new Error("Email or token missing");
    }

    // Create Verification URL
    const verificationUrl =
      `${process.env.CLIENT_URL}/verify-email/${token}`;

    // Debug URL
    console.log(
      "VERIFICATION URL:",
      verificationUrl
    );

    // Send Mail
    await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email ✅",

      html: `
        <div style="
          max-width:600px;
          margin:auto;
          font-family:Arial,sans-serif;
          background:#f4f4f4;
          padding:40px 20px;
        ">

          <div style="
            background:white;
            border-radius:10px;
            padding:40px;
            text-align:center;
            box-shadow:0 2px 10px rgba(0,0,0,0.1);
          ">

            <h1 style="
              color:#2563eb;
              margin-bottom:20px;
            ">
              Verify Your Email
            </h1>

            <p style="
              color:#555;
              font-size:16px;
              line-height:1.8;
            ">
              Thanks for registering on Job Portal.
              <br/><br/>
              Please click the button below
              to verify your email address.
            </p>

            <a
              href="${verificationUrl}"
              style="
                display:inline-block;
                margin-top:25px;
                background:#2563eb;
                color:white;
                padding:14px 28px;
                text-decoration:none;
                border-radius:6px;
                font-size:16px;
                font-weight:bold;
              "
            >
              Verify Email
            </a>

            <p style="
              margin-top:30px;
              font-size:13px;
              color:#999;
            ">
              If you did not create this account,
              you can safely ignore this email.
            </p>

          </div>
        </div>
      `,
    });

    console.log(
      "Verification email sent to:",
      email
    );

  } catch (error) {

    console.log(
      "Verification email error:",
      error.message
    );

  }
};

export default sendVerificationEmail;