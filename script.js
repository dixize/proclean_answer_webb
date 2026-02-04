// Функция переключения страниц
function showPage(id) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    const target = document.getElementById('page-' + id);
    if(target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Инициализация отзывов о КЛИНИНГЕ
function initReviews() {
    const tracks = ['track-1', 'track-2'];
    const cleaningReviews = [
        "Квартира просто сияет! Огромное спасибо PRO CLEANING.",
        "Заказывал Zoo-cleaning после щенка, запаха как не бывало.",
        "Лучший Car-cleaning в городе, салон как новый.",
        "Очень профессионально. Убрали все пятна с ковролина.",
        "После ремонта спасли мой дом. PRO сервис!",
        "Вежливый персонал и идеальная чистота.",
        "Car-cleaning превзошел ожидания, рекомендую!",
        "Самая качественная уборка, которую я видел."
    ];

    tracks.forEach(trackId => {
        const track = document.getElementById(trackId);
        if(!track) return;
        for(let i=0; i<22; i++) {
            const card = document.createElement('div');
            card.className = 'rev-card';
            const randomText = cleaningReviews[Math.floor(Math.random() * cleaningReviews.length)];
            card.innerHTML = `
                <div style="color:var(--yellow); margin-bottom:10px;">★★★★★</div>
                <p style="font-size:14px; line-height:1.4;">"${randomText}"</p>
                <div style="color:var(--orange); font-size:12px; margin-top:10px; font-weight:900;">CLIENT // PRO CLEANING</div>
            `;
            track.appendChild(card);
        }
        track.innerHTML += track.innerHTML; 
    });
}

document.addEventListener('DOMContentLoaded', initReviews);

// Открытие модалки
function openOrderModal(service, placeholder) {
    document.getElementById('selected-service-name').innerText = service.toUpperCase();
    document.getElementById('dynamic-detail').placeholder = placeholder;
    document.getElementById('orderModal').style.display = 'flex';
}

// Закрытие модалки
function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('order-form-step').style.display = 'block';
    document.getElementById('order-success-step').style.display = 'none';
}

// ГЛАВНАЯ ФУНКЦИЯ: Отправка в Telegram
function submitFinalOrder() {
    // ВСТАВЛЕННЫЕ ДАННЫЕ:
    const botToken = "8306869922:AAE1ZHvM5rznCo8Wh3ESO5LUQLGPo8Ku7-M"; 
    const chatId = "5415190532";

    // Сбор данных из полей
    const service = document.getElementById('selected-service-name').innerText;
    const detail = document.getElementById('dynamic-detail').value;
    const area = document.getElementById('area').value;
    const time = document.getElementById('time').value;
    const phone = document.getElementById('phone').value;

    // Проверка телефона
    if(phone.length < 5) {
        alert("ОШИБКА: Пожалуйста, введите номер телефона");
        return;
    }

    // Текст сообщения для тебя в Telegram
    const message = `
🌟 НОВАЯ ЗАЯВКА (PRO CLEANING)
--------------------------
🛠 Услуга: ${service}
📝 Детали: ${detail}
📐 Площадь: ${area}
⏰ Желаемое время: ${time}
📞 Телефон: ${phone}
--------------------------
`;

    // Ссылка для API запроса
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    // Визуальный отклик на кнопке
    const btn = document.querySelector('.btn-confirm');
    const originalText = btn.innerText;
    btn.innerText = "ОТПРАВКА...";
    btn.disabled = true;

    fetch(url)
    .then(response => {
        if (response.ok) {
            // Успех
            document.getElementById('order-form-step').style.display = 'none';
            document.getElementById('order-success-step').style.display = 'block';
        } else {
            alert("Ошибка сети. Проверьте настройки бота.");
        }
    })
    .catch(error => {
        alert("Произошла ошибка при отправке заявки.");
        console.error(error);
    })
    .finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    });
}
