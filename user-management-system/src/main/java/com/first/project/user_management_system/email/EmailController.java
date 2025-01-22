//package com.first.project.user_management_system.email;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class EmailController {
//
//    @Autowired private SendMailService emailService;
//
//    private static final Logger LOGGER = LoggerFactory.getLogger(EmailController.class);
//
//
//    @PostMapping("/sendMail")
//    public void sendMail(@RequestBody EmailDetailsDto details) throws Exception {
//
//        LOGGER.info("send a simple mail");
//        emailService.sendSimpleMail(details);
//    }
//
//}
