package com.first.project.user_management_system.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendMailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SendMailService.class);

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Autowired
    public SendMailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendSimpleMail(EmailDetailsDto details) throws Exception {
        try {
            LOGGER.info("Sending a simple mail without attachment");
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getEmailBody());
            mailMessage.setSubject(details.getEmailSubject());

            javaMailSender.send(mailMessage);
        } catch (Exception exception) {
            LOGGER.error("Error while sending the mail", exception);
            throw new Exception("Error while sending the mail: " + exception.getMessage(), exception);
        }
    }
}
