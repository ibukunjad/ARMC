'use strict';
(() => {
  const config = window.ARMC_CONFIG || {};
  const email = typeof config.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email.trim()) ? config.email.trim() : '';
  const whatsapp = typeof config.whatsapp === 'string' && /^[1-9]\d{7,14}$/.test(config.whatsapp.trim()) ? config.whatsapp.trim() : '';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      menu.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      menu.focus();
    }
  });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    if (whatsapp) { el.href = `https://wa.me/${whatsapp}`; el.hidden = false; el.target = '_blank'; el.rel = 'noopener'; }
  });
  document.querySelectorAll('[data-email]').forEach(el => {
    if (email) { el.href = `mailto:${email}`; el.textContent = email; el.hidden = false; }
  });
  for (const key of ['phone', 'address']) {
    document.querySelectorAll(`[data-${key}]`).forEach(el => {
      if (typeof config[key] === 'string' && config[key].trim()) { el.textContent = config[key].trim(); el.hidden = false; }
    });
  }
  if (email || whatsapp) {
    const guidance = document.querySelector('#contact-guidance');
    if (guidance) guidance.textContent = 'Prepare your inquiry, review it, then open an available contact channel to send it. Nothing is sent automatically.';
  }
  const form = document.querySelector('#inquiry-form');
  if (!form) return;
  const result = document.querySelector('#form-result');
  const params = new URLSearchParams(location.search);
  const labels = {
    landlord: 'Landlord onboarding inquiry',
    tenant: 'Student room inquiry',
    complaint: 'Tenancy concern / request'
  };
  const fieldLabels = {
    name: 'Name', email: 'Email', phone: 'Phone / WhatsApp', property: 'Property and location',
    rooms: 'Number of rooms', plan: 'Preferred management plan', area: 'Preferred area / institution',
    budget: 'Annual rent budget (NGN)', roomtype: 'Room preference', movein: 'Preferred move-in date',
    reference: 'Lodge and room reference', category: 'Request category', message: 'Details'
  };
  function selectKind(kind) {
    if (!Object.hasOwn(labels, kind)) kind = 'tenant';
    form.elements.kind.value = kind;
    document.querySelectorAll('[data-kind]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.kind === kind)));
    document.querySelectorAll('[data-for]').forEach(group => {
      const visible = group.dataset.for === kind;
      group.hidden = !visible;
      group.querySelectorAll('input, select').forEach(input => {
        input.disabled = !visible;
        input.required = visible && ['property', 'rooms', 'area', 'reference'].includes(input.name);
      });
    });
    form.elements.message.required = kind === 'complaint';
    document.querySelector('#message-label').textContent = kind === 'complaint' ? 'Describe your concern or request *' : 'Anything else we should know?';
    result.hidden = true;
  }
  document.querySelectorAll('[data-kind]').forEach(el => el.addEventListener('click', () => selectKind(el.dataset.kind)));
  selectKind(params.get('type') || 'tenant');
  if (params.get('plan') === 'standard') form.elements.plan.value = 'Standard (10%)';
  if (params.get('plan') === 'premium') form.elements.plan.value = 'Premium (15%)';
  const now = new Date();
  form.elements.movein.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  document.querySelector('#prepare-button').disabled = false;
  // Prevent sending a previously generated message after editing its source fields.
  form.addEventListener('input', () => { result.hidden = true; });
  form.addEventListener('change', () => { result.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `ARMC — ${labels[data.get('kind')]}`;
    const lines = [subject, ''];
    for (const [key, label] of Object.entries(fieldLabels)) {
      const value = String(data.get(key) || '').trim();
      if (value) lines.push(`${label}: ${value}`);
    }
    const message = lines.join('\n');
    document.querySelector('#prepared-message').value = message;
    const emailLink = document.querySelector('#send-email');
    const whatsappLink = document.querySelector('#send-whatsapp');
    if (email) { emailLink.hidden = false; emailLink.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`; }
    if (whatsapp) { whatsappLink.hidden = false; whatsappLink.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`; }
    document.querySelector('#delivery-note').textContent = email || whatsapp
      ? 'Choose a channel below, then send the message in that app. ARMC has not received this inquiry yet.'
      : 'Official contact details are not yet available. Copy your message to keep it for later; it has not been sent to ARMC.';
    document.querySelector('#copy-status').textContent = '';
    result.hidden = false;
    document.querySelector('#result-title').focus();
  });
  document.querySelector('#copy-message').addEventListener('click', async () => {
    const message = document.querySelector('#prepared-message');
    const status = document.querySelector('#copy-status');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(message.value);
      status.textContent = 'Message copied. It has not been sent.';
    } catch {
      message.focus(); message.select();
      status.textContent = 'Message selected. Use your device’s Copy command to copy it.';
    }
  });
})();
