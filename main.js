document.addEventListener('DOMContentLoaded', () => {
    // ===============================
    // ASSIGNMENTS DATA (15 ITEMS)
    // ===============================
    const assignmentsData = [
        { title: "Scratch Project", cert: "c:\Users\karth\Documents\Scratch Simulation Project.docx", site: "assignments/afs.html" },
        { title: "TinkerCAD Simulation Project", cert: "https://1drv.ms/w/c/EAA27C1328AE0986/IQAKqbvkZ6ZrSa75iA1e5duTAQ4ZTSooHp0KmCUNXqgtbEI?e=AvoZxs", site: "assignments/yarn.html" },
        { title: "MIT App Inventor Project", cert: "https://1drv.ms/w/c/EAA27C1328AE0986/IQAKuZiqA0RhR4bDcCElW7e3AZGfN_bYi_4mVGLOKNNvEXA?e=2g2aLT", site: "assignments/fabric.html" },
        { title: "Fusion360 Autocad Project", cert: "https://1drv.ms/w/c/EAA27C1328AE0986/IQB_0Hl_8BnsR4BL9n5U2_oeAWgHE50YWR-LJPFoXUf8xP8?e=a730XE", site: "assignments/testing.html" },
    ];

    // ===============================
    // POPULATE ASSIGNMENTS
    // ===============================
    const assignmentsContainer = document.getElementById('assignments-container');

    assignmentsData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card assignment-card show-card';
        card.style.animation = `fadeUp 0.6s ease forwards`;
        card.style.animationDelay = `${index * 0.07}s`;

        card.innerHTML = `
        <div class="card-icon"><i class="fas fa-file-alt"></i></div>
        <h4>${item.title}</h4>
        <p style="font-size:0.85rem;color:var(--text-muted);">
            Assignment ${index + 1}
        </p>
        <div style="margin-top:1.2rem;display:flex;gap:0.5rem;">
            <button class="btn-sm btn-view" data-cert="${item.cert}">View Report</button>
            <button class="btn-sm btn-site" data-site="${item.site}">Website</button>
        </div>
    `;
        assignmentsContainer.appendChild(card);
    });

    // ===============================
    // BUTTON CLICK HANDLER
    // ===============================
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-view')) {
            window.open(e.target.dataset.cert, '_blank');
        }
        if (e.target.classList.contains('btn-site')) {
            window.open(e.target.dataset.site, '_blank');
        }
    });


    // 2. Intersection Observer for Scroll Animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-item a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 4. Modal Logic
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('close-modal');

    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemName = btn.getAttribute('data-item');
            modalBody.innerHTML = `
                <h2 class="section-title" style="font-size: 1.8rem;">${itemName}</h2>
                <div style="aspect-ratio: 16/9; background: #f3f4f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-top: 2rem; border: 2px dashed var(--border-color);">
                    <p style="color: var(--text-muted);"><i class="fas fa-image" style="font-size: 3rem; display: block; margin: 0 auto 1rem; text-align: center;"></i>Certificate/Document Placeholder for ${itemName}</p>
                </div>
                <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: flex-end;">
                     <a href="#" class="btn btn-primary">Download PDF</a>
                </div>
            `;
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
document.querySelectorAll('.assignment-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const rotateX = (y - 50) / 6;
        const rotateY = (50 - x) / 6;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.04)
        `;
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `
            perspective(900px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    });
});
// ================= ADVANCED CARD ANIMATION =================
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".assignment-card");

    cards.forEach((card, index) => {

        // Staggered entrance
        card.style.animation = `cardEnter 0.9s ease forwards`;
        card.style.animationDelay = `${index * 0.12}s`;

        // 3D tilt
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = -(y / rect.height - 0.5) * 14;
            const rotateY = (x / rect.width - 0.5) * 14;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.05)
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
            `;
        });
    });
});
// ================= MAGIC MOUSE MOVE EFFECT =================
const projectSection = document.getElementById("projects");
const magicCursor = document.querySelector(".magic-cursor");

projectSection.addEventListener("mousemove", (e) => {
    const rect = projectSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    magicCursor.style.left = `${x}px`;
    magicCursor.style.top = `${y}px`;
    magicCursor.style.opacity = "1";
});

projectSection.addEventListener("mouseleave", () => {
    magicCursor.style.opacity = "0";
});
// ================= EXPERIENCE CERTIFICATE MODAL =================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-exp-cert")) {
        const imgSrc = e.target.dataset.img;

        const modal = document.getElementById("modal");
        const modalBody = document.getElementById("modal-body");

        modalBody.innerHTML = `
            <h2 class="section-title">Internship Certificate</h2>
            <img src="${imgSrc}" 
                 style="width:100%; border-radius:16px; box-shadow: var(--shadow-lg);"
                 alt="Certificate">
        `;

        modal.style.display = "flex";
    }
});
