const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your app-specific password
    },
    // Additional settings to avoid spam
    tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
    }
};

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
    console.log(emailConfig);
    return nodemailer.createTransport(emailConfig);
};

// Email template function
const createEmailTemplate = (name, email, message) => {
    return {
        from: {
            name: 'QuantumCusp Contact Form',
            address: process.env.EMAIL_FROM
        },
        to: process.env.EMAIL_TO,
        replyTo: email, // Allow direct reply to the sender
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f9f9f9;
                        border-radius: 8px;
                    }
                    .header {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 20px;
                        border-radius: 8px 8px 0 0;
                        text-align: center;
                    }
                    .content {
                        background: white;
                        padding: 30px;
                        border-radius: 0 0 8px 8px;
                    }
                    .field {
                        margin-bottom: 20px;
                    }
                    .label {
                        font-weight: bold;
                        color: #667eea;
                        margin-bottom: 5px;
                    }
                    .value {
                        padding: 10px;
                        background-color: #f5f5f5;
                        border-left: 4px solid #667eea;
                        border-radius: 4px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #666;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>New Contact Form Submission</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Name:</div>
                            <div class="value">${name}</div>
                        </div>
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value">${email}</div>
                        </div>
                        <div class="field">
                            <div class="label">Message:</div>
                            <div class="value">${message}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>This email was sent from the QuantumCusp contact form.</p>
                        <p>Received on: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

---
Received on: ${new Date().toLocaleString()}
        `
    };
};

// Thank you email template for the user
const createThankYouEmailTemplate = (name, email) => {
    return {
        from: {
            name: 'QuantumCusp Team',
            address: process.env.EMAIL_FROM
        },
        to: email,
        subject: 'Thank You for Contacting QuantumCusp!',
        html: `
            <!--
* This email was built using Tabular.
* For more information, visit https://tabular.email
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if !mso]>-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body {
min-width: 100%;
Margin: 0px;
padding: 0px;
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
u + #body a {
color: inherit;
text-decoration: none;
font-size: inherit;
font-family: inherit;
font-weight: inherit;
line-height: inherit;
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.t106{padding:0 0 22px!important}.t102,.t118,.t49,.t72,.t8,.t91{text-align:left!important}.t101,.t117,.t48,.t7,.t71,.t90{vertical-align:top!important;width:600px!important}.t5{border-top-left-radius:0!important;border-top-right-radius:0!important;padding:20px 30px!important}.t88{border-bottom-right-radius:0!important;border-bottom-left-radius:0!important;padding:30px!important}.t24,.t53,.t76,.t82{mso-line-height-alt:0!important;line-height:0!important;display:none!important}.t126{mso-line-height-alt:20px!important;line-height:20px!important}.t3{width:44px!important}.t30{mso-line-height-alt:13px!important;line-height:13px!important}.t37,.t60{display:revert!important}.t39,.t62{vertical-align:top!important;width:40px!important}
}
</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;800&amp;family=Roboto:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body id="body" class="t129" style="min-width:100%;Margin:0px;padding:0px;background-color:#E0E0E0;"><div class="t128" style="background-color:#E0E0E0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t127" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#E0E0E0;" valign="top" align="center">
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color="#E0E0E0"/>
</v:background>
<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td align="center">
<table class="t109" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="566" class="t108" style="width:566px;">
<table class="t107" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t106" style="padding:50px 10px 12px 10px;"><div class="t105" style="width:100%;text-align:left;"><div class="t104" style="display:inline-block;"><table class="t103" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
<tr class="t102"><td></td><td class="t101" width="546" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t100" style="width:100%;"><tr><td class="t99" style="background-color:transparent;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
<table class="t15" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="546" class="t14" style="width:600px;">
<table class="t13" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t12"><div class="t11" style="width:100%;text-align:left;"><div class="t10" style="display:inline-block;"><table class="t9" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
<tr class="t8"><td></td><td class="t7" width="546" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t6" style="width:100%;"><tr><td class="t5" style="overflow:hidden;background-color:#FF6333;padding:49px 50px 42px 50px;border-radius:18px 18px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
<table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;"><tr><td width="85" class="t3" style="width:85px;">
<table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t1"><div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="85" height="85" alt="" src="https://905bc445-305e-487a-9c7a-28ba247d6ca8.b-cdn.net/e/ca12d2ba-56f9-4b69-8cc0-7018f31492d9/9e8fe3f5-7463-43a4-8a58-100bb73d6fa4.png"/></div></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t98" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="546" class="t97" style="width:600px;">
<table class="t96" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t95"><div class="t94" style="width:100%;text-align:left;"><div class="t93" style="display:inline-block;"><table class="t92" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
<tr class="t91"><td></td><td class="t90" width="546" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t89" style="width:100%;"><tr><td class="t88" style="overflow:hidden;background-color:#F8F8F8;padding:40px 50px 40px 50px;border-radius:0 0 18px 18px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
<table class="t20" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="446" class="t19" style="width:467px;">
<table class="t18" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t17"><h1 class="t16" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:30px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Hi ${name}</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t21" style="mso-line-height-rule:exactly;mso-line-height-alt:16px;line-height:16px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td><div class="t24" style="mso-line-height-rule:exactly;mso-line-height-alt:7px;line-height:7px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t28" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="446" class="t27" style="width:600px;">
<table class="t26" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t25"><h2 class="t23" style="margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t22" style="margin:0;Margin:0;font-weight:700;mso-line-height-rule:exactly;">Thank you for reaching out to us! We&#39;ve received your message and we&#39;re excited to connect with you.</span></h2></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t30" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="left">
<table class="t34" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;"><tr><td width="446" class="t33" style="width:563px;">
<table class="t32" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t31"><p class="t29" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Your message has been successfully delivered to our team.<br/>We typically respond within 24 hours.<br/></p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t53" style="mso-line-height-rule:exactly;mso-line-height-alt:7px;line-height:7px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t57" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="446" class="t56" style="width:600px;">
<table class="t55" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t54"><div class="t52" style="width:100%;text-align:left;"><div class="t51" style="display:inline-block;"><table class="t50" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
<tr class="t49"><td></td><td class="t39" width="40" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t38" style="width:40px;"><tr><td class="t36"><p class="t35" style="margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:right;mso-line-height-rule:exactly;mso-text-raise:2px;">•</p></td><td class="t37" style="width:10px;" width="10"></td></tr></table>
</td><td class="t48" width="406" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t47" style="width:100%;"><tr><td class="t46"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
<table class="t45" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;"><tr><td width="406" class="t44" style="width:563px;">
<table class="t43" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t42"><p class="t41" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t40" style="margin:0;Margin:0;mso-line-height-rule:exactly;">Our team is reviewing your inquiry and will get back to you as soon as possible. </span><br/></p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t76" style="mso-line-height-rule:exactly;mso-line-height-alt:7px;line-height:7px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t80" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="446" class="t79" style="width:600px;">
<table class="t78" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t77"><div class="t75" style="width:100%;text-align:left;"><div class="t74" style="display:inline-block;"><table class="t73" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
<tr class="t72"><td></td><td class="t62" width="40" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t61" style="width:40px;"><tr><td class="t59"><p class="t58" style="margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:right;mso-line-height-rule:exactly;mso-text-raise:2px;">•</p></td><td class="t60" style="width:10px;" width="10"></td></tr></table>
</td><td class="t71" width="406" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t70" style="width:100%;"><tr><td class="t69"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
<table class="t67" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;"><tr><td width="406" class="t66" style="width:563px;">
<table class="t65" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t64"><p class="t63" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">In the meantime, feel free to explore our services and learn more about what we do.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t68" style="mso-line-height-rule:exactly;mso-line-height-alt:9px;line-height:9px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t82" style="mso-line-height-rule:exactly;mso-line-height-alt:7px;line-height:7px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="left">
<table class="t86" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;"><tr><td width="274" class="t85" style="width:274px;">
<table class="t84" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t83" style="overflow:hidden;background-color:#FF6333;text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;padding:10px 30px 10px 30px;border-radius:40px 40px 40px 40px;"><a class="t81" href="https://tabular.email" style="display:block;margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:44px;font-weight:800;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:2.4px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:10px;" target="_blank">Explore Our Services</a></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t87" style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t125" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="600" class="t124" style="width:600px;">
<table class="t123" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t122"><div class="t121" style="width:100%;text-align:left;"><div class="t120" style="display:inline-block;"><table class="t119" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
<tr class="t118"><td></td><td class="t117" width="600" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t116" style="width:100%;"><tr><td class="t115" style="padding:0 50px 0 50px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
<table class="t114" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t113" style="width:600px;">
<table class="t112" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t111"><p class="t110" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">© ${new Date().getFullYear()} QuantumCusp. All rights reserved.<br/></p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t126" style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
</html>
        `,
        text: `
Hi ${name},

Thank you for reaching out to us! We've received your message and we're excited to connect with you.

✓ Your message has been successfully delivered to our team.
✓ We typically respond within 24-48 hours.

Our team is reviewing your inquiry and will get back to you as soon as possible. We appreciate your interest in QuantumCusp and look forward to assisting you.

In the meantime, feel free to explore our services and learn more about what we do.

Best regards,
The QuantumCusp Team

---
This is an automated confirmation email.
If you didn't submit this form, please ignore this email.

© ${new Date().getFullYear()} QuantumCusp. All rights reserved.
        `
    };
};

module.exports = {
    createTransporter,
    createEmailTemplate,
    createThankYouEmailTemplate
};
