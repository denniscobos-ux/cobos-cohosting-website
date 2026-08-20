document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  const toggle = document.querySelector('.nav__toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav__close');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () { mobileNav.classList.add('open'); });
    mobileClose.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    });
  }

  document.querySelectorAll('.contact-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (v, k) { data[k] = v; });

      var subject = encodeURIComponent('New Inquiry from ' + (data.firstName || '') + ' ' + (data.lastName || ''));
      var body = encodeURIComponent(
        'Name: ' + (data.firstName || '') + ' ' + (data.lastName || '') + '\n' +
        'Email: ' + (data.email || '') + '\n' +
        'Phone: ' + (data.phone || '') + '\n' +
        'Property Location: ' + (data.location || '') + '\n' +
        'Property Type: ' + (data.propertyType || '') + '\n\n' +
        'Message:\n' + (data.message || '')
      );

      window.location.href = 'mailto:info@coboscohosting.com?subject=' + subject + '&body=' + body;

      form.style.display = 'none';
      var success = form.parentElement.querySelector('.form__success');
      if (success) success.classList.add('show');
    });
  });

  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature, .service-item, .team-card, .testimonial, .process-step, .why-item, .market-card').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
