
    // Accept love function
    function acceptLove() {
      document.getElementById('buttonsContainer').style.display = 'none';
      document.getElementById('yesResponse').style.display = 'block';
      
      // Create celebration fireworks show - giảm số batch và tăng interval
      for (let batch = 0; batch < 5; batch++) { // Giảm từ 8 xuống 5 batch
        setTimeout(() => {
          createCelebrationFireworksBatch();
        }, batch * 1500); // Tăng từ 1000ms lên 1500ms
      }

      // Change main message
      document.getElementById('mainMessage').innerHTML = 
        "💖 Chúng ta đã là của nhau rồi! 💖<br>Tình yêu sẽ mãi mãi rực rỡ! ✨";
    }

    // Reject love function
    function rejectLove() {
      document.getElementById('buttonsContainer').style.display = 'none';
      document.getElementById('noResponse').style.display = 'block';
      document.body.classList.add('sad-mode');
      
      // Change main message
      document.getElementById('mainMessage').innerHTML = 
        "💔 Tình yêu vẫn còn đây... 💔<br>Anh sẽ chờ em mãi mãi... 😢";
    }

    // Firework functions from the new system
    function getRandomColor() {
      const colors = ['#ff0000', '#ff3333', '#ff6666', '#ffaa00', '#ffd700', '#ff69b4', '#ff1493', '#dc143c'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function createCelebrationFirework(x) {
      const color = getRandomColor();
      const firework = document.createElement('div');
      firework.classList.add('celebration-firework');

      // Random height from -400px to -600px
      const height = -1 * (Math.random() * 200 + 400);
      firework.style.setProperty('--height', `${height}px`);
      firework.style.left = `${x}px`;
      firework.style.backgroundColor = color;
      firework.style.boxShadow = `0 0 10px ${color}`;

      document.body.appendChild(firework);

      setTimeout(() => {
        const explosionX = firework.offsetLeft + 3;
        const explosionY = window.innerHeight + height;
        firework.remove();

        // Bright center
        const center = document.createElement('div');
        center.classList.add('celebration-center');
        center.style.left = `${explosionX}px`;
        center.style.top = `${explosionY}px`;
        center.style.backgroundColor = color;
        center.style.boxShadow = `0 0 20px ${color}`;
        document.body.appendChild(center);

        // Immediate explosion
        setTimeout(() => {
          center.remove();
          celebrationExplode(explosionX, explosionY, color);
        }, 100);
      }, 1200);
    }

    function celebrationExplode(x, y, color) {
      const totalRays = 40; // Giảm số tia để realistic hơn
      const length = 120; // Chiều dài vừa phải

      for (let i = 0; i < totalRays; i++) {
        const ray = document.createElement('div');
        ray.classList.add('celebration-ray');
        ray.style.left = `${x}px`;
        ray.style.top = `${y}px`;
        ray.style.color = color;
        ray.style.setProperty('--length', `${length + Math.random() * 60}px`);
        
        const angle = (i * 360 / totalRays) + (Math.random() * 10 - 5); // Thêm random cho tự nhiên
        ray.style.setProperty('--angle', `${angle}deg`);

        document.body.appendChild(ray);

        // Tạo particles rơi từ đầu mỗi tia
        setTimeout(() => {
          createSparkParticles(x, y, color, angle, length);
        }, 400);

        setTimeout(() => ray.remove(), 2500);
      }

      // Tạo thêm inner burst với tia ngắn hơn
      for (let i = 0; i < 20; i++) {
        const innerRay = document.createElement('div');
        innerRay.classList.add('celebration-ray');
        innerRay.style.left = `${x}px`;
        innerRay.style.top = `${y}px`;
        innerRay.style.color = color;
        innerRay.style.setProperty('--length', `${60 + Math.random() * 40}px`);
        innerRay.style.opacity = '0.8';
        
        const angle = (i * 360 / 20) + (Math.random() * 15 - 7.5);
        innerRay.style.setProperty('--angle', `${angle}deg`);

        document.body.appendChild(innerRay);
        setTimeout(() => innerRay.remove(), 2000);
      }
    }

    function createSparkParticles(centerX, centerY, color, rayAngle, rayLength) {
      const particleCount = 8;
      const rayRad = rayAngle * Math.PI / 180;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('spark-particle');
        
        // Vị trí particles dọc theo tia
        const distance = (rayLength * 0.6) + (i * 15);
        const startX = centerX + Math.cos(rayRad) * distance;
        const startY = centerY + Math.sin(rayRad) * distance;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.color = color;
        particle.style.animationDelay = `${i * 0.1}s`;
        
        // Random drift cho particles
        const driftX = (Math.random() - 0.5) * 30;
        const driftXEnd = driftX + (Math.random() - 0.5) * 40;
        particle.style.setProperty('--drift-x', `${driftX}px`);
        particle.style.setProperty('--drift-x-end', `${driftXEnd}px`);
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
      }
    }

    function createCelebrationFireworksBatch() {
      const count = Math.floor(Math.random() * 2) + 3; // Giảm từ 5-8 xuống 3-4 pháo hoa
      const positions = []; // Track vị trí để tránh đè lên nhau
      
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          let x;
          let attempts = 0;
          
          // Tìm vị trí không bị đè lên nhau
          do {
            x = Math.random() * (window.innerWidth - 200) + 100;
            attempts++;
          } while (positions.some(pos => Math.abs(pos - x) < 150) && attempts < 10);
          
          positions.push(x);
          createCelebrationFirework(x);
        }, i * 400); // Tăng delay từ 200ms lên 400ms
      }
    }

    // Original firework effect on click
    document.body.addEventListener('click', function (e) {
      for (let i = 0; i < 16; i++) {
        createFirework(e.clientX, e.clientY, i * (360 / 16));
      }
    });

    function createFirework(x, y, angle) {
      const fw = document.createElement('div');
      fw.className = 'firework';
      fw.style.left = x + 'px';
      fw.style.top = y + 'px';
      document.body.appendChild(fw);
      const dist = 80 + Math.random() * 40;
      const rad = angle * Math.PI / 180;
      fw.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(rad) * dist}px,${Math.sin(rad) * dist}px) scale(2)`, opacity: 0 }
      ], {
        duration: 800,
        easing: 'ease-out'
      });
      setTimeout(() => fw.remove(), 800);
    }

    // Hiệu ứng trái tim và ảnh chảy từ trên xuống toàn màn hình
    const imgSrcList = Array.from(document.querySelectorAll('#img-sources img')).map(img => img.src);

    function createFallingHeartOrImg() {
      // 60% là trái tim, 40% là ảnh - giảm tỷ lệ
      if (Math.random() < 0.6) {
        const heart = document.createElement('span');
        heart.className = 'flying-heart';
        heart.innerHTML = '💗';
        heart.style.left = Math.random() * 98 + 'vw';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem'; // Giảm size
        const duration = Math.random() * 2 + 4; // Tăng thời gian bay
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = (Math.random() * 2) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000 + 500);
      } else if (imgSrcList.length > 0) {
        const imgDiv = document.createElement('span');
        imgDiv.className = 'flying-img';
        imgDiv.style.left = Math.random() * 98 + 'vw';
        const size = Math.random() * 20 + 28; // Giảm size từ 32-60px xuống 28-48px
        imgDiv.style.width = size + 'px';
        imgDiv.style.height = size + 'px';
        const duration = Math.random() * 2 + 4;
        imgDiv.style.animationDuration = duration + 's';
        imgDiv.style.animationDelay = (Math.random() * 2) + 's';
        const img = document.createElement('img');
        img.src = imgSrcList[Math.floor(Math.random() * imgSrcList.length)];
        img.style.width = "100%";
        img.style.height = "100%";
        imgDiv.appendChild(img);
        document.body.appendChild(imgDiv);
        setTimeout(() => imgDiv.remove(), duration * 1000 + 500);
      }
    }
    setInterval(createFallingHeartOrImg, 200); // Tăng từ 180ms lên 800ms
    setInterval(() => {
  for (let i = 0; i < 3; i++) { // mỗi lần tạo 3 ảnh
    createFlyingHeart();
  }
}, 200);


    function spawnIcon() {
      const icon = document.createElement('div');
      icon.className = 'icon';

      // Tuỳ chọn icon bay
      const icons = ['♥️'];
      icon.innerHTML = icons[Math.floor(Math.random() * icons.length)];

      document.body.appendChild(icon);

      setTimeout(() => {
        icon.classList.add('fly');
      }, 10);

      setTimeout(() => {
        icon.remove();
      }, 2200);
    }