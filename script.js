document.addEventListener('DOMContentLoaded', () => {
  const PHONE = '5511945062142';

  // Ano atual no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Links de WhatsApp
  document.querySelectorAll('[data-wa]').forEach((el) => {
    const num = el.getAttribute('data-phone') || PHONE;
    const msg = el.getAttribute('data-msg') || 'Olá! Gostaria de falar com a STUDIO OY.';
    el.setAttribute('href', `https://wa.me/${num}?text=${encodeURIComponent(msg)}`);
  });

  // FAQ Accordion
  document.querySelectorAll('.acc__item').forEach((item) => {
    const btn = item.querySelector('.acc__btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Lightbox do Portfólio
  const lb = document.getElementById('lb');
  const lbPh = document.getElementById('lbPh');
  const lbTitle = document.getElementById('lbTitle');
  const lbType = document.getElementById('lbType');
  const lbDesc = document.getElementById('lbDesc');
  const lbClose = document.getElementById('lbClose');

  const closeLb = () => {
    if (lb) lb.hidden = true;
  };

  document.querySelectorAll('.proj').forEach((btn) => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title') || '';
      if (lbPh && imgSrc) {
        lbPh.innerHTML = `<img src="${imgSrc}" alt="${title}">`;
      }
      if (lbTitle) lbTitle.textContent = title;
      if (lbType) lbType.textContent = btn.getAttribute('data-type') || '';
      if (lbDesc) lbDesc.textContent = btn.getAttribute('data-desc') || '';
      if (lb) lb.hidden = false;
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLb();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLb();
  });

  // Formulário -> WhatsApp
  const form = document.getElementById('form');
  const formErr = document.getElementById('formErr');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = (form.nome?.value || '').trim();
      const tel = (form.tel?.value || '').trim();
      const msg = (form.msg?.value || '').trim();
      if (!nome || !tel) {
        if (formErr) formErr.hidden = false;
        return;
      }
      if (formErr) formErr.hidden = true;
      const num = form.getAttribute('data-phone') || PHONE;
      const text = `Olá! Meu nome é ${nome} (${tel}). Gostaria de falar com a STUDIO OY.\n\nSobre o projeto: ${msg || 'Não informado'}`;
      window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  }
});
