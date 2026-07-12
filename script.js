//contact
            // Click-to-copy for email and phone pills
            document.querySelectorAll('.contact-pill[data-copy]').forEach(function (pill) {
                pill.addEventListener('click', function (e) {
                    e.preventDefault();
                    const value = pill.dataset.copy;
                    const label = pill.querySelector('p');
                    const original = label.textContent;

                    navigator.clipboard.writeText(value).then(function () {
                        label.textContent = 'Copied!';
                        pill.classList.add('copied');
                        setTimeout(function () {
                            label.textContent = original;
                            pill.classList.remove('copied');
                        }, 1500);
                    });
                });
            });

//service
       (function () {
            const carousel = document.getElementById('service-carousel');
            const track = carousel.querySelector('.carousel-track');
            const slides = Array.from(track.children);
            const prevBtn = carousel.querySelector('.prev');
            const nextBtn = carousel.querySelector('.next');
            const dotsWrap = document.getElementById('service-dots');
            let index = 0;

            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'carousel-dot';
                dot.setAttribute('aria-label', 'Go to service ' + (i + 1));
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
            });
            const dots = Array.from(dotsWrap.children);

            function update() {
                track.style.transform = 'translateX(-' + (index * 100) + '%)';
                dots.forEach((d, i) => d.classList.toggle('active', i === index));
            }

            function goTo(i) {
                index = (i + slides.length) % slides.length;
                update();
            }

            prevBtn.addEventListener('click', () => goTo(index - 1));
            nextBtn.addEventListener('click', () => goTo(index + 1));

            // swipe support on touch devices
            let startX = 0;
            track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
            track.addEventListener('touchend', (e) => {
                const diff = e.changedTouches[0].clientX - startX;
                if (Math.abs(diff) > 40) diff < 0 ? goTo(index + 1) : goTo(index - 1);
            }, { passive: true });

            update();
        })();

emailjs.init({
    publicKey: "PEI4v6pvqBTjwq7pQ"
});

document
.getElementById("contact-form")
.addEventListener("submit", function(e){

    e.preventDefault();

    emailjs.sendForm(
        "service_gzk5xds",
        "template_144yl0p",
        this
    )
    .then(() => {
        alert("Message sent successfully!");
        this.reset();
    })
    .catch((err) => {
        console.log(err);
        alert("Something went wrong.");
    });

});