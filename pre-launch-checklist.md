# KSR Electrical Services — Pre-launch checklist

This website package has received static checks and a simulated Chromium interaction test. Complete the client-confirmation items below before publishing.

## Fixes included in this package

- Contact copy now clearly tells visitors to call, message on WhatsApp, or email the company. It does not imply that an enquiry form is available.
- The descriptions for the two images labeled as ongoing work no longer say that those installations were completed.
- The gallery viewer now moves through currently visible/filtered photos, updates its photo count, and keeps keyboard focus within the viewer while open.
- The gallery viewer disables previous/next when only one photo is visible and returns focus after closing.
- README guidance now records which details need confirmation before launch.

## Client confirmation required

- **Email:** The site currently uses `ksreletricalservice@gmail.com`. Confirm the exact spelling and that the mailbox works. This has deliberately not been changed because the correct address cannot be inferred safely.
- **Phone and WhatsApp:** Confirm `95732 26011` is the correct business number and that WhatsApp opens the account monitored by KSR.
- **Address:** Confirm `Anjaiah Nagar, Road No. 17, Jagathgirigutta, Hyderabad, Telangana, India` is accurate and appropriate to publish.
- **Portfolio:** Confirm each photo represents KSR work and that KSR has permission to publish it. Verify the completed/ongoing and residential/commercial categories.
- **Watermarked image:** `assets/projects/project-12.jpg` contains a visible camera/name watermark. Replace it with a client-approved clean version if available; do not remove attribution unless authorized.
- **External hero/about photos and fonts:** The hero and about photographs use Unsplash URLs, and typography loads from Google Fonts. The automated test environment could not reach Google Fonts. Check these assets with a normal internet connection after deployment; consider storing approved images locally for reliability.
- **Contact form:** The current version intentionally has no enquiry form. Keep phone/WhatsApp/email only if the client approves that scope. If the client expects quote requests to be submitted directly on the website, agree on form fields and a secure delivery method before building it.

## Test results

- JavaScript syntax check: passed (`node --check script.js`).
- Browser UI check in Chromium at desktop and 390px mobile width: passed for gallery filters, filtered photo navigation/counter, Escape-to-close, keyboard focus wrapping, mobile navigation, and horizontal overflow.
- JavaScript exceptions during the browser interaction test: none.
- Local gallery images: 17 files included; the five new photos are stored as `project-13.jpg` through `project-17.jpg`.
- External font request: failed in this restricted test environment because external network access was unavailable. This is not confirmation that the resource is broken on the live internet.

## Before delivery

1. Confirm all client details above, especially email, phone, address, and portfolio ownership.
2. Test the deployed website from a normal internet connection on a desktop and a real mobile phone.
3. Tap each phone, WhatsApp, and email link to verify the destination.
4. Ask the client to approve the final page and gallery before handing over the domain or hosting access.
