document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqContainer = document.querySelector('.faq-content');
  
    faqContainer?.addEventListener('click', (e) => {
      const groupHeader = e.target.closest('.faq-group-header');
  
      if (!groupHeader) return;
  
      const group = groupHeader.parentElement;
      const groupBody = group.querySelector('.faq-group-body');
      const icon = groupHeader.querySelector('i');
  
      // Toggle icon
      icon.classList.toggle('fa-plus');
      icon.classList.toggle('fa-minus');
  
      // Toggle visibility of body
      groupBody.classList.toggle('open');
  
      // Close other open FAQ bodies
      const otherGroups = faqContainer.querySelectorAll('.faq-group');
  
      otherGroups.forEach((otherGroup) => {
        if (otherGroup !== group) {
          const otherGroupBody = otherGroup.querySelector('.faq-group-body');
          const otherIcon = otherGroup.querySelector('.faq-group-header i');
  
          otherGroupBody.classList.remove('open');
          otherIcon.classList.remove('fa-minus');
          otherIcon.classList.add('fa-plus');
        }
      });
    });
  
    // Mobile Menu
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');
  
    hamburgerButton?.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  
    // Smooth Scroll for Dropdown Links
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a[href^="#"]');
  
    dropdownLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Evită redirecționarea instantanee
  
        const targetId = link.getAttribute('href').substring(1); // Elimină `#`
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          // Scroll lin către secțiune
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
          // Închide meniul mobil, dacă este deschis
          if (mobileMenu?.classList.contains('active')) {
            mobileMenu.classList.remove('active');
          }
        }
      });
    });
  
    // Dropdown Visibility
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = dropdown?.querySelector('.dropdown-menu');
  
    if (dropdown && dropdownMenu) {
      // Ascundem meniul inițial
      dropdownMenu.style.display = 'none';
  
      // Afișăm meniul când mouse-ul trece peste element
      dropdown.addEventListener('mouseenter', () => {
        dropdownMenu.style.display = 'block';
      });
  
      // Ascundem meniul când mouse-ul părăsește elementul
      dropdown.addEventListener('mouseleave', () => {
        dropdownMenu.style.display = 'none';
      });
    }
  });
  document.querySelectorAll('.articlepreview .overlay').forEach(overlay => {
    overlay.addEventListener('click', function(event) {
      event.preventDefault(); // Previne navigarea imediată
      this.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = this.parentElement.getAttribute('href');
      }, 500); // Întârziere pentru efectul de fade-out
    });
  });
  /*about*/
  let slideIndex = 0;
  showSlides(slideIndex);
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n - 1);
  }
  
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n >= slides.length) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length - 1}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
  
    // Add click event to flip the card
    const flipCardInner = slides[slideIndex].querySelector('.flip-card-inner');
    if (flipCardInner) {
      flipCardInner.onclick = function() {
        flipCardInner.classList.toggle('is-flipped');
      };
    }
  }
  
  // Obține elementele de filtrare
  const searchInput = document.getElementById("search");
  const levelSelect = document.getElementById("level");
  const categorySelect = document.getElementById("category");
  
  // Obține toate resursele
  const resourceItems = document.querySelectorAll(".resource-item");
  
  // Funcție pentru filtrare
  function filterResources() {
      const searchText = searchInput.value.toLowerCase();
      const selectedLevel = levelSelect.value;
      const selectedCategory = categorySelect.value;
  
      resourceItems.forEach((item) => {
          // Extrage informațiile despre resursă
          const title = item.querySelector(".previewtitle").textContent.toLowerCase();
          const description = item.querySelector("p").textContent.toLowerCase();
          const level = item.querySelector("p:nth-of-type(2)")?.textContent.toLowerCase() || ""; // Text cu nivelul (dacă există)
          const category = item.closest(".resources").querySelector("h2").textContent.toLowerCase(); // Categoria de resurse
  
          // Verifică dacă resursa îndeplinește toate criteriile
          const matchesSearch = title.includes(searchText) || description.includes(searchText);
          const matchesLevel = selectedLevel === "all" || level.includes(selectedLevel);
          const matchesCategory = selectedCategory === "all" || category.includes(selectedCategory);
  
          // Ascunde sau afișează resursa pe baza criteriilor
          if (matchesSearch && matchesLevel && matchesCategory) {
              item.style.display = "block";
          } else {
              item.style.display = "none";
          }
      });
  }
  
  // Adaugă evenimentele de ascultare
  searchInput.addEventListener("input", filterResources);
  levelSelect.addEventListener("change", filterResources);
  categorySelect.addEventListener("change", filterResources);
  
  // Apelare inițială pentru aplicarea filtrelor la încărcarea paginii
  filterResources();
  