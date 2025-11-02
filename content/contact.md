---
title: "Contact Tomás González – Get in Touch"
description: "Have a question about design, web development, or collaboration? Send a message to Tomás González, experience designer in Auckland."
slug: "contact"
layout: "page"
---

If you have a question please leave a message, I'm always happy to hear from interesting people doing interesting things.

{{< rawhtml >}}
<form name="contact" id="ContactForm" method="POST" netlify-honeypot="bot-field" action="/success/" netlify>
  <p style="display: none;"><label>Don't fill this out if you're human: <input name="bot-field"></label></p>
  <label for="full-name">Full Name</label>
  <input name="full-name" id="full-name" type="text" placeholder="Your full name" required autocomplete="off" spellcheck="false" data-form-type="other">
  <label for="email-address">Email Address</label>
  <input name="email-address" id="email-address" type="email" placeholder="Your email" required autocomplete="off" spellcheck="false" data-form-type="other">
  <label for="message">Message</label>
  <textarea name="message" id="message" type="text" placeholder="Your message..." required autocomplete="off" spellcheck="false" data-form-type="other"></textarea>
  <button class="w-full" type="submit" value="Submit" id="Form-submit">Submit</button>
</form>
{{< /rawhtml >}}
