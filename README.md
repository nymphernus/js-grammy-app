
<body>
    <p>Этот проект представляет собой простого Telegram бота, который предоставляет пользователям информацию о погоде. Бот использует библиотеку <code>grammy</code> для взаимодействия с Telegram API.</p>
    <h2>Установка</h2>
    <ol>
        <p>Склонируйте репозиторий на свой компьютер:
            <pre><code>git clone https://github.com/nymphernus/js-grammy-app.git</code></pre>
        </p>
        <li>Перейдите в директорию проекта:
            <pre><code>cd js-grammy-app</code></pre>
        </li>
        <li>Установите необходимые зависимости:
            <pre><code>npm install</code></pre>
        </li>
    </ol>
    <h2>Запуск проекта</h2>
    <p>Для запуска проекта выполните следующую команду:</p>
    <pre><code>node index.js</code></pre>
    <p>При первом запуске создастся файл <code>.env</code>, в который необходимо вписать токен вашего телеграмм бота и токен сервиса openweathermap</p>
    <p>Повторить запуск проекта</p>
    <h2 id="функции">Функции</h2>
    <ul>
        <li><strong>/start</strong> - Приветствует пользователя и проверяет, зарегистрирован ли он в системе.</li>
        <li><strong>/menu</strong> - Показывает меню с доступными действиями.</li>
        <li><strong>Узнать свой ID</strong> - Отправляет пользователю его ID.</li>
        <li><strong>Узнать температуру в своём городе</strong> - Запрашивает у пользователя его местоположение или название города для получения погоды.</li>
    </ul>
    <h2>Скриншоты</h2>
    <img src="https://github.com/user-attachments/assets/6c5e7b79-5bf1-4e1b-80fa-aa3abe1bdde6" alt="img_1">
    <img src="https://github.com/user-attachments/assets/59b7b054-d5e1-4ba4-b44e-a3b5a4b71895" alt="img_2">
</body>

