document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  var toggle = document.querySelector('.nav__toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    var closeBtn = mobileNav.querySelector('.mobile-nav__close');
    toggle.addEventListener('click', function () { mobileNav.classList.add('open'); });
    if (closeBtn) closeBtn.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    });
  }

  document.querySelectorAll('.contact-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var fields = {};
      data.forEach(function (v, k) { fields[k] = v; });

      var subject = encodeURIComponent('Cobos Cohosting Inquiry from ' + (fields.name || 'Website'));
      var lines = [];
      if (fields.name) lines.push('Name: ' + fields.name);
      if (fields.email) lines.push('Email: ' + fields.email);
      if (fields.phone) lines.push('Phone: ' + fields.phone);
      if (fields.address) lines.push('Property Address: ' + fields.address);
      if (fields.message) lines.push('\nMessage:\n' + fields.message);
      var body = encodeURIComponent(lines.join('\n'));

      var mailto = 'mailto:dennis@coboscohosting.com,patricia@coboscohosting.com?subject=' + subject + '&body=' + body;
      window.location.href = mailto;

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

  document.querySelectorAll('.feature, .service-item, .team-card, .testimonial, .process-step, .why-item, .market-card, .property-card').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Denver metro median long-term rents by bedroom count (approximate 2025 data)
var DENVER_MEDIAN_RENTS = {
  '0': 1350,
  '1': 1550,
  '2': 1950,
  '3': 2400,
  '4': 2850,
  '5': 3300
};

function calculateEstimate() {
  var address = document.getElementById('calc-address').value.trim();
  var bedrooms = document.getElementById('calc-bedrooms').value;

  if (!address || !bedrooms) {
    alert('Please enter a property address and select the number of bedrooms.');
    return;
  }

  var baseRent = DENVER_MEDIAN_RENTS[bedrooms] || 2000;
  var low = Math.round(baseRent * 1.2 / 50) * 50;
  var mid = Math.round(baseRent * 1.3 / 50) * 50;
  var high = Math.round(baseRent * 1.35 / 50) * 50;

  document.getElementById('calc-low').textContent = '$' + low.toLocaleString();
  document.getElementById('calc-mid').textContent = '$' + mid.toLocaleString();
  document.getElementById('calc-high').textContent = '$' + high.toLocaleString();

  var result = document.getElementById('calc-result');
  result.classList.add('show');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
