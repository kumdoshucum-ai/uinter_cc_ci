(() => {
  'use strict';

  const sharedFooter = `
    <footer class="site-footer">
      <div class="container px-4">
        <div class="site-footer-top">
          <div class="site-footer-brand">
            <a class="site-footer-logo" href="./index.html#Accueil" aria-label="Retour à l'accueil U Inter CC CI">U INTER <span>CC CI</span></a>
            <p>Une entreprise ivoirienne engagée dans la commercialisation et la préparation de produits issus du cacao.</p>
            <a class="site-footer-cta" href="./contact.html">Demander un devis <span aria-hidden="true">↗</span></a>
          </div>
          <div>
            <h5 class="site-footer-title">Navigation</h5>
            <ul class="site-footer-links">
              <li><a href="./index.html#Accueil">Accueil</a></li>
              <li><a href="./savoir-faire.html">Savoir-faire</a></li>
              <li><a href="./produits.html">Produits</a></li>
              <li><a href="./media.html">Média</a></li>
              <li><a href="./actualites.html">Actualités</a></li>
            </ul>
          </div>
          <div>
            <h5 class="site-footer-title">Contact</h5>
            <ul class="site-footer-contact">
              <li><span class="fas fa-map-marker-alt" aria-hidden="true"></span><span>Abidjan, Abobo PK18, Côte d'Ivoire</span></li>
              <li><span class="fas fa-phone" aria-hidden="true"></span><a href="tel:+2250748882787">+225 07 48 88 27 87</a></li>
              <li><span class="far fa-envelope" aria-hidden="true"></span><a href="mailto:info@uintercc.com">info@uintercc.com</a></li>
              <li><span class="fab fa-whatsapp" aria-hidden="true"></span><a href="https://wa.me/2250748882787" target="_blank" rel="noopener noreferrer">Écrire sur WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div class="site-footer-bottom">
          <span>&copy; 2026 U Inter CC CI. Tous droits réservés.</span>
          <span class="site-footer-status"><i></i> Un cacao choisi avec soin</span>
        </div>
      </div>
    </footer>`;

  document.querySelectorAll('.page-footer').forEach((footer) => {
    footer.outerHTML = sharedFooter;
  });

  const productCatalog = [
    {
      name: 'Fèves de cacao',
      category: 'beans',
      categoryLabel: 'Fèves',
      image: 'asset/img/cocoaproduct.jpeg',
      description: 'Des fèves de cacao sélectionnées et préparées avec soin pour répondre à votre cahier des charges.',
      availability: 'À confirmer selon la demande'
    },
    {
      name: 'Brisures de cacao',
      category: 'beans',
      categoryLabel: 'Fèves',
      image: 'asset/img/Nos produit1.jpg',
      description: 'Des fèves concassées adaptées aux besoins de transformation et aux commandes professionnelles.',
      availability: 'Sur demande'
    },
    {
      name: 'Beurre de cacao',
      category: 'transformed',
      categoryLabel: 'Produit transformé',
      image: 'asset/img/nos produit beure cc.jpg',
      description: 'Produit transformé à confirmer selon les disponibilités et les besoins de votre projet.',
      availability: 'À confirmer'
    },
    {
      name: 'Poudre de cacao',
      category: 'transformed',
      categoryLabel: 'Produit transformé',
      image: 'asset/img/labo1.jpg',
      description: 'Une possibilité de produit transformé à étudier avec vous selon le conditionnement recherché.',
      availability: 'Sur demande'
    },
    {
      name: 'Produits dérivés',
      category: 'transformed',
      categoryLabel: 'Produit transformé',
      image: 'asset/img/nos produit3.jpg',
      description: 'Parlons de votre besoin pour identifier le produit et le format les plus adaptés.',
      availability: 'Sur demande'
    },
    {
      name: 'Besoin spécifique',
      category: 'other',
      categoryLabel: 'Autre demande',
      image: 'asset/img/port(1).png',
      description: 'Vous recherchez un autre produit ou un conditionnement particulier ? Contactez-nous directement.',
      availability: 'À définir ensemble'
    }
  ];

  const productGrid = document.querySelector('[data-product-grid]');
  const productModal = document.querySelector('[data-product-modal]');
  let hasRenderedProducts = false;

  const renderProducts = (filter = 'all') => {
    if (!productGrid) return;
    const products = productCatalog.filter(({ category }) => filter === 'all' || category === filter);
    productGrid.innerHTML = products.map((product, index) => `
      <article class="product-card" data-reveal="up" data-product-index="${productCatalog.indexOf(product)}">
        <div class="product-card-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" class="product-card-image" />
          <span class="product-card-tag">${product.categoryLabel}</span>
        </div>
        <div class="product-card-content">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <button class="product-link" type="button" data-product-index="${productCatalog.indexOf(product)}">Découvrir <span aria-hidden="true">↗</span></button>
        </div>
      </article>
    `).join('');

    productGrid.querySelectorAll('.product-link').forEach((button) => {
      button.addEventListener('click', () => openProduct(Number(button.dataset.productIndex)));
    });

    if (hasRenderedProducts) {
      window.requestAnimationFrame(() => {
        productGrid.querySelectorAll('.product-card').forEach((card) => card.classList.add('is-visible'));
      });
    }
    hasRenderedProducts = true;
  };

  const openProduct = (index) => {
    const product = productCatalog[index];
    if (!productModal || !product) return;
    productModal.querySelector('[data-modal-image]').src = product.image;
    productModal.querySelector('[data-modal-image]').alt = product.name;
    productModal.querySelector('[data-modal-title]').textContent = product.name;
    productModal.querySelector('[data-modal-description]').textContent = product.description;
    productModal.querySelector('[data-modal-category]').textContent = product.categoryLabel;
    productModal.querySelector('[data-modal-availability]').textContent = product.availability;
    productModal.classList.add('is-open');
    productModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeProduct = () => {
    productModal?.classList.remove('is-open');
    productModal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  renderProducts();
  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('[data-filter].is-active')?.classList.remove('is-active');
      button.classList.add('is-active');
      renderProducts(button.dataset.filter);
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeProduct));
  document.addEventListener('keydown', (event) => event.key === 'Escape' && closeProduct());
  document.querySelector('[data-modal-quote]')?.addEventListener('click', closeProduct);

  const navbar = document.querySelector('.navbar-togglable');
  const sections = [...document.querySelectorAll('main section, body > section, header')];
  const revealTargets = [...new Set(sections.flatMap((section) => [
    section.querySelector(':scope > .container'),
    ...section.querySelectorAll(':scope > .min-vh-100, [data-isotope] > div, .card, .media-decoration, .product-card, .process-step, .page-card, .carousel-card, [data-reveal]')
  ]).filter(Boolean))];

  revealTargets.forEach((element, index) => {
    element.dataset.reveal = index % 3 === 1 ? 'right' : 'up';
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.classList.add('is-visible');
        observer.unobserve(target);
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }

  const updateNavbar = () => {
    navbar?.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  document.querySelectorAll('.navbar-collapse .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelector('.navbar-collapse')?.classList.remove('show');
    });
  });

  const contactForm = document.querySelector('#mc_embed_signup form');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const toast = document.querySelector('#notification');
    if (!toast) return;
    toast.querySelector('.toast-body').textContent = 'Merci, votre message a bien été envoyé.';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3500);
  });
})();