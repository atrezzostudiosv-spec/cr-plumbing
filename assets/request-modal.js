/* Atrezzo — accessible service request popup. Works without a backend. */
(() => {
  const rootPath = '/cr-plumbing/';
  const triggers = [
    'a.btn-orange[href$="/contact-us/"]',
    'a.btn-outline[href$="/contact-us/"]',
    '.final-cta a.btn-white[href$="/contact-us/"]',
    'a[href$="/book-online/"]'
  ].join(',');
  const modal = document.createElement('div');
  modal.id = 'cr-request-modal';
  modal.className = 'cr-modal';
  modal.hidden = true;
  modal.innerHTML = [
    '<div class="cr-modal__panel" role="dialog" aria-modal="true" aria-labelledby="cr-modal-title" aria-describedby="cr-modal-description">',
    '<div class="cr-modal__intro">',
      '<div class="cr-modal__small">CR PLUMBING, AIR &amp; ELECTRIC <span>01 / REQUEST</span></div>',
      '<div class="cr-modal__intro-center">',
        '<span class="cr-modal__eyebrow">HOW CAN WE HELP?</span>',
        '<h2 id="cr-modal-title">TELL US<br>WHAT YOU<br>NEED.</h2>',
        '<p>Plumbing, HVAC, electrical and gas services across DFW.</p>',
      '</div>',
      '<a class="cr-modal__phone" href="tel:+19403705663">PREFER TO CALL?<strong>(940) 370-5663 ↗</strong></a>',
    '</div>',
    '<div class="cr-modal__main">',
      '<button class="cr-modal__close" type="button" aria-label="Close request form">×</button>',
      '<div class="cr-modal__form-heading">',
        '<span class="cr-modal__eyebrow">SERVICE REQUEST</span>',
        '<p id="cr-modal-description">Enter your details to prepare a request to share with CR.</p>',
      '</div>',
      '<form class="cr-modal__form" id="cr-modal-form">',
        '<div class="cr-modal__field cr-modal__field--full"><label for="cr-request-service">Requested service *</label><input id="cr-request-service" name="service" maxlength="160" required></div>',
        '<div class="cr-modal__field"><label for="cr-request-name">Full name *</label><input id="cr-request-name" name="name" autocomplete="name" maxlength="100" required></div>',
        '<div class="cr-modal__field"><label for="cr-request-phone">Phone *</label><input id="cr-request-phone" name="phone" type="tel" autocomplete="tel" maxlength="35" required></div>',
        '<div class="cr-modal__field"><label for="cr-request-city">City *</label><input id="cr-request-city" name="city" autocomplete="address-level2" maxlength="90" required></div>',
        '<div class="cr-modal__field"><label for="cr-request-email">Email (optional)</label><input id="cr-request-email" name="email" type="email" autocomplete="email" maxlength="160"></div>',
        '<div class="cr-modal__field cr-modal__field--full"><label for="cr-request-message">Briefly describe the issue</label><textarea id="cr-request-message" name="message" rows="3" maxlength="1200" placeholder="Tell us about the issue…"></textarea></div>',
        '<div class="cr-modal__field cr-modal__field--full cr-modal__submit-area">',
          '<p class="cr-modal__disclosure">This form prepares a request on your device. It does not send information or book an appointment automatically.</p>',
          '<button class="cr-modal__submit" type="submit">COPY REQUEST DETAILS <span>↗</span></button>',
          '<div class="cr-modal__result" id="cr-modal-result" tabindex="-1" role="status" aria-live="polite" hidden></div>',
        '</div>',
      '</form>',
    '</div>',
    '</div>'
  ].join('');
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = rootPath + 'assets/request-modal.css';
  document.head.appendChild(stylesheet);
  document.body.appendChild(modal);

  const form = modal.querySelector('form');
  const panel = modal.querySelector('.cr-modal__panel');
  const close = modal.querySelector('.cr-modal__close');
  const service = modal.querySelector('#cr-request-service');
  const feedback = modal.querySelector('#cr-modal-result');
  let opener, priorOverflow = '';

  function detectService() {
    const heroTitle = document.querySelector('.inner-hero h1');
    return heroTitle ? heroTitle.textContent.replace(/\s+/g,' ').trim() : '';
  }
  function openDialog(trigger) {
    opener = trigger;
    priorOverflow = document.body.style.overflow;
    feedback.hidden = true;
    feedback.textContent = '';
    form.reset();
    service.value = detectService();
    service.placeholder = service.value ? '' : 'e.g. AC repair, plumbing, electrical';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    close.focus();
  }
  function closeDialog() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = priorOverflow;
    if (opener && opener.isConnected) opener.focus();
  }
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !link.matches(triggers) || event.defaultPrevented) return;
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openDialog(link);
  });
  close.addEventListener('click',closeDialog);
  modal.addEventListener('click', e => {if(e.target === modal) closeDialog();});
  document.addEventListener('keydown', event => {
    if(modal.hidden) return;
    if(event.key === 'Escape'){event.preventDefault();closeDialog();return;}
    if(event.key !== 'Tab')return;
    const focusable = Array.from(panel.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled])')).filter(el=>el.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length-1];
    if(!first)return;
    if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = Array.from(new FormData(form).entries()).filter(([,value])=>String(value).trim());
    const summary = ['CR Plumbing, Air & Electric — Service request',...data.map(([key,value])=>key.toUpperCase()+': '+value)].join('\n');
    feedback.hidden = false;
    try {
      if(!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(summary);
      feedback.textContent = 'Request details copied. Call (940) 370-5663 to share them with CR. No request was submitted online.';
    } catch {
      feedback.textContent = 'Copy these details, then call (940) 370-5663. Nothing was submitted online.';
      const text = document.createElement('pre');
      text.textContent = summary;
      feedback.appendChild(text);
    }
    feedback.focus();
  });
})();