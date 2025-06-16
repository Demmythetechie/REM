import transporter from "../emailServer.js";
import fs from "fs";
import path from "path";

async function verifyEmail(receiver, name, tk) {
    const templatePath = path.join(process.cwd(), "./emails/verifyHtml.html");
    let emailTemplate = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders
    emailTemplate = emailTemplate.replace("{{name}}", name).replace("{{verification_link}}", `http://localhost:3000/authentication/verify/${tk}`);

    const mailOptions = {
        from: "naim.okunade@gmail.com", // Sender's email
        to: receiver, // Multiple recipients
        subject: "REM Account verification",
        text: "Verification of your REM account is only valid for an hour",
        html: emailTemplate,
        attachments: [
            {
              filename: "logo.png",
              path: "logo.png", // Local path to the image
              cid: "uniqueimageid", // Must be unique and match the src in HTML
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error:", error);
    }
}

export default verifyEmail;