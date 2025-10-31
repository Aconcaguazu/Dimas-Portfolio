document.addEventListener('DOMContentLoaded', () => {
      const navbar = document.querySelector('.navbar');
      const glider = document.querySelector('.glider');
      const navTabs = document.querySelectorAll('.nav-tab');
      const sections = document.querySelectorAll('section, header.hero');
      const themeToggleBtn = document.getElementById('theme-toggle');
      const body = document.body;
      
      // Data proyek terpusat
      const projectsData = [
        {
          id: 0,
          title: "Website Sistem Terminal Bus",
          description: "Website untuk sistem pendataan bus dan penumpang secara digital di terminal tipe A pondok cabe.",
          imgSrc: "img/projek1.png",
          liveUrl: "#",
          githubUrl: "#"
        },
        {
          id: 1,
          title: "Repository Book BGP PPG",
          description: "Sistem website repository untuk penyimpanan data buku dan online book untuk hasil karya pegawai",
          imgSrc: "img/projek2.png",
          liveUrl: "#",
          githubUrl: "#"
        },
        {
          id: 2,
          title: "Perpustakaan digital SMK Tunas Media",
          description: "Perpustakaan online untuk menyimpan koleksi buku buku digital karya anak SMK Tunas Media.",
          imgSrc: "img/projek3.png",
          liveUrl: "#",
          githubUrl: "#"
        },
        {
          id: 3,
          title: "Company Website Baxelindale",
          description: "Website company profile perusahaan finance dari Australia yang berjalan dengan bahasa php Laravel.",
          imgSrc: "img/projek4.png",
          liveUrl: "#",
          githubUrl: "#"
        }
      ];

      // Fungsi untuk menginisialisasi kartu proyek dari data
      function renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = ''; // Bersihkan grid
        projectsData.forEach(project => {
          const cardHtml = `
            <div class="card" data-project-id="${project.id}">
              <img src="${project.imgSrc}" alt="${project.title}" class="card-img">
              <div class="card-content">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
              </div>
            </div>
          `;
          projectsGrid.innerHTML += cardHtml;
        });
      }
      renderProjects(); // Panggil saat DOM dimuat

      // --- Glider and Navbar Functionality ---
      function updateGliderPosition() {
        const activeTab = document.querySelector('.nav-tab.active');
        if (activeTab) {
          const navbarComputedStyle = window.getComputedStyle(navbar);
          const navbarPaddingTop = parseFloat(navbarComputedStyle.paddingTop);
          const targetLeft = activeTab.offsetLeft;

          glider.style.width = activeTab.offsetWidth + 'px';
          glider.style.height = activeTab.offsetHeight + 'px';
          glider.style.transform = `translateX(${targetLeft}px)`;
          glider.style.top = navbarPaddingTop + 'px';
        }
      }

      function setActiveTab(targetId) {
        navTabs.forEach(tab => {
          tab.classList.remove('active');
        });
        const targetTab = document.querySelector(`.nav-tab[data-target="${targetId}"]`);
        if (targetTab) {
          targetTab.classList.add('active');
          updateGliderPosition();
        }
      }

      // Atur tab 'About' sebagai tab aktif default
      setActiveTab('about');
      updateGliderPosition();

      navTabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
          event.preventDefault();
          const targetId = event.target.dataset.target;
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
            setActiveTab(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveTab(sectionId);
          }
        });
      }, observerOptions);

      sections.forEach(section => {
        sectionObserver.observe(section);
      });

      window.addEventListener('resize', updateGliderPosition);

      // --- Dark/Light Mode Functionality ---
      function setTheme(theme) {
        if (theme === 'light') {
          body.classList.add('light-mode');
          themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
          body.classList.remove('light-mode');
          themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        localStorage.setItem('theme', theme);
      }

      themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      });

      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);


      // --- Typing Animation Functionality ---
      const typedTextElement = document.getElementById('typed-text');
      const phrases = [
        "A passionate Website Development",
        "A passionate Graphics Design",
        "A passionate Advertising Marketing",
        "A passionate Social Media Specialist"
      ];
      let phraseIndex = 0;
      let charIndex = 0;
      const typingSpeed = 70;
      const deletingSpeed = 40;
      const delayBeforeDelete = 1500;
      const delayBeforeType = 500;

      function typeWriter() {
        if (charIndex < phrases[phraseIndex].length) {
          typedTextElement.textContent += phrases[phraseIndex].charAt(charIndex);
          charIndex++;
          setTimeout(typeWriter, typingSpeed);
        } else {
          setTimeout(deleteWriter, delayBeforeDelete);
        }
      }

      function deleteWriter() {
        if (charIndex > 0) {
          typedTextElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(deleteWriter, deletingSpeed);
        } else {
          phraseIndex++;
          if (phraseIndex >= phrases.length) {
            phraseIndex = 0;
          }
          setTimeout(typeWriter, delayBeforeType);
        }
      }

      typeWriter();
      
      // --- Scroll Animation for Projects and Skills ---
      const projectCards = document.querySelectorAll('.card');
      const skillItems = document.querySelectorAll('.skill-item');
      const aboutElements = [document.querySelector('.profile-img'), document.querySelector('.about-text')];

      const createObserver = (elements, className) => {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(className);
              obs.unobserve(entry.target);
            }
          });
        }, {
          root: null,
          rootMargin: '0px',
          threshold: 0.2
        });

        elements.forEach(el => {
          if (el) observer.observe(el);
        });
      };

      createObserver(projectCards, 'is-visible');
      createObserver(skillItems, 'is-visible');
      createObserver(aboutElements, 'is-visible');
      
      // --- Project Modal Logic ---
      const projectModal = document.getElementById('project-modal');
      const modalCloseBtn = document.querySelector('.modal-close-btn');
      const modalTitle = document.getElementById('modal-project-title');
      const modalDescription = document.getElementById('modal-project-description');
      const modalImg = document.getElementById('modal-project-img');
      const modalLiveBtn = document.getElementById('modal-live-demo-btn');
      const modalGithubBtn = document.getElementById('modal-github-btn');
      const projectsGrid = document.querySelector('.projects-grid');

      function openProjectModal(project) {
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalImg.src = project.imgSrc;
        modalLiveBtn.href = project.liveUrl;
        modalGithubBtn.href = project.githubUrl;
        projectModal.classList.add('open');
      }

      function closeProjectModal() {
        projectModal.classList.remove('open');
      }

      projectsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card) {
          const projectId = card.dataset.projectId;
          const project = projectsData[projectId];
          openProjectModal(project);
        }
      });
      
      modalCloseBtn.addEventListener('click', closeProjectModal);
      projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
          closeProjectModal();
        }
      });

      // --- Scroll to Top Button Logic ---
      const scrollToTopBtn = document.getElementById('scroll-to-top');

      window.addEventListener('scroll', () => {
        // Tampilkan tombol setelah user scroll 300px
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.add('show');
        } else {
          scrollToTopBtn.classList.remove('show');
        }
      });

      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });