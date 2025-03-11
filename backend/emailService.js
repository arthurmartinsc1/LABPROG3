import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); 

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "*****" : "NÃO DEFINIDO");

export const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Seu Código de Verificação - SelfOrder",
            text: `Seu código de verificação é: ${verificationCode}.\n\nEle expira em 10 minutos.`
        };

        await transporter.sendMail(mailOptions);
        console.log(`📩 Código enviado para ${email}`);
    } catch (error) {
        console.error("❌ Erro ao enviar e-mail:", error);
        throw new Error("Falha ao enviar e-mail de verificação");
    }
};
