---
title: "Ask me anything"
description: "Ask me a question about coding website, static sites, building design systems or pretty much anything you think I might be able to help with."
slug: "contact"
layout: "page"
---

If you have a question please leave a message, I'm always happy to hear from interesting people doing interesting things.

{{< rawhtml >}}
<form name="contact" id="ContactForm" method="POST" action="/success/" netlify>
  <p style="display: none;"><label>Don't fill this out if you're human: <input name="bot-field"></label></p>
  <label for="full-name">Full Name</label>
  <input name="full-name" id="full-name" type="text" placeholder="Your full name" required>
  <label for="email-address">Email Address</label>
  <input name="email-address" id="email-address" type="email" placeholder="Your email" required>
  <label for="message">Message</label>
  <textarea name="message" id="message" type="text" placeholder="Your message..." required></textarea>
  <button class="w-full" type="submit" value="Submit" id="Form-submit">Submit</button>
</form>
{{< /rawhtml >}}
