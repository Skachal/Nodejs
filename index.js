const express = require("express");
const path = require("path");
const fs = require('fs');
const PORT = 5002;
const app = express();

// Установка EJS в качестве шаблонизатора
app.set("view engine", "ejs");

// Middleware для обработки данных из формы
app.use(express.urlencoded({ extended: false }));

// Middleware для статических файлов (стили, скрипты и т.д.)
app.use(express.static(path.join(__dirname, 'public')));

// Функция для создания пути до шаблонов EJS
const createPath = (page) =>
  path.resolve(__dirname, "views", `${page}.ejs`);

// Маршрут для главной страницы
app.get("/", (req, res) => {
  res.render(createPath("index"));
});

// Маршрут для страницы с постами
app.get("/posts", (req, res) => {
  // Здесь можете подставить логику для загрузки постов из posts.json
  const posts = [
    {
      id: "1",
      text: "СЕРИКБОЛСЫН ТИГР.",
      title: "Post title",
      date: "05.05.2024",
      author: "Цыпленок",
    },
    {
      id: "2",
      text: "МАКС ТОЖЕ ТИГР",
      title: "Post title",
      date: "05.05.2024",
      author: "Овца",
    },
    {
      id: "3",
      text: "БАТУХАН ЛЕВ",
      title: "Post title",
      date: "05.05.2024",
      author: "Конь",
    },
  ];
  res.render(createPath("posts"), { posts });
});

// Обработчик POST запроса для добавления поста
app.post('/add-post', (req, res) => {
  // Получаем данные из тела запроса
  const { id, title, text, date, author } = req.body;

  // Создаем новый объект поста
  const newPost = {
    id,
    title,
    text,
    date,
    author
  };

  // Добавляем новый пост в ваш массив или файл posts.json
  // В этом примере добавляем в массив posts, но лучше использовать файлы для постоянного хранения данных

  // Редирект на страницу с постами после добавления
  res.redirect('/posts');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
