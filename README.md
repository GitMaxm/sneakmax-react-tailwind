# SneakMax

Одностраничный интернет-магазин кроссовок. Каталог с фильтрами (цена, пол, размер), корзина на MobX, оформление заказа демонстрационное: данные берутся из `src/data/products.json`, без бэкенда.

Макет: [Figma](https://www.figma.com/design/q8XSTu9wrMlE245dFtcoxf/SneakMax-YouTube--Copy-?node-id=43-389&p=f&t=YqadjesQCBrVP9JS-0)

## Стек

React 19, TypeScript, Vite (SWC), Tailwind CSS 4, SCSS.

## Библиотеки

MobX, react-toastify

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
```

Команды: `npm run build` (проверка типов + сборка в `dist/`), `npm run lint`, `npm run preview`.

## Деплой

Пуш в `main` запускает GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)): сборка и публикация в GitHub Pages на <https://gitmaxm.github.io/sneakmax-react-tailwind/>. Артефакты сборки в git не хранятся.
