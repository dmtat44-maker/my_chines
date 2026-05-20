# Китайский квест — MVP v4: 10 дней + AI-ready

## Что внутри

- `index.html` — браузерное MVP для GitHub Pages.
- 10 дней прохождения.
- Сохранение выбранной роли ребёнка и напарника.
- Каждый день связан с выбранной ролью.
- Памятки по тонам в словах.
- Родительский кабинет.
- Страница будущего развития: голос, 2D, 3D.
- `backend/` — заготовка FastAPI для подключения OpenAI.

## Как обновить GitHub Pages

Загрузи новый `index.html` в корень репозитория `my_chines` вместо старого файла.

После commit подожди 1–3 минуты и открой:

```text
https://dmtat44-maker.github.io/my_chines/
```

## Как пройти 10 дней

1. Открой сайт.
2. Введи имя ребёнка и родителя.
3. Выбери роль и напарника.
4. Пройди День 1.
5. После правильного языкового пароля откроется День 2.
6. Пройди так все 10 дней.

## Как подключить ИИ локально

Важно: нельзя вставлять OpenAI API key в `index.html`, потому что GitHub Pages открыт всем. Ключ должен жить на backend.

### 1. Установить backend

```bash
cd backend
pip install -r requirements.txt
```

### 2. Указать OpenAI API key

Windows PowerShell:

```powershell
$env:OPENAI_API_KEY="sk-..."
uvicorn main:app --reload --port 8000
```

Linux/macOS:

```bash
export OPENAI_API_KEY="sk-..."
uvicorn main:app --reload --port 8000
```

### 3. В MVP указать backend URL

В форме регистрации в поле `AI backend URL` впиши:

```text
http://127.0.0.1:8000
```

Потом на странице дня нажми:

```text
Сгенерировать этот день через ИИ
```

## Как сделать для публикации

Для публичного демо backend нужно разместить отдельно:
- VPS;
- Render;
- Railway;
- Vercel serverless;
- Yandex Cloud Functions;
- другой backend-хостинг.

GitHub Pages оставляем только для frontend.
