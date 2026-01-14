import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Create transporter using ENV values
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      pool: true,
      maxConnections: 1,
      maxMessages: 10,
    });

    // Send email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_USER}>`, // YOUR email
      to: process.env.MAIL_TO, // YOUR inbox
      replyTo: email, // USER email
      subject: `New contact message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Send Email Error:", error);

    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
