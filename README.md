# AngularHomework

## Комментарии к домашнему заданию

- При удалении ввсех пользователей или всех книг они демо-данные будут сгенерены заново. Заказы автоматически не генерируются.
- Для доступ к админке требует залогиниться администратором. Клиентов туда не пустят.
- Для оформления заказа также необходимо залогиниться. Но тут уже подойдёт любой тип пользователей.

## Вопросы по домашнему заданию

### 1. Внутренний роутинг приложения работает нормально. Но если попытаться ввести URL вручную - начинаются проблемы.

URL-ы первого уровня (`books`, `cart`, `admin`, `login`, `about`) срабатывают нормально. При попытке ввода неправильго URL'а - попадаешь на Page Not Fund...

Но URL'ы второго и более уровня стабильно выдают ошибки: происходит попытка загрузить базовые файлы (`main.bundle.js`, `vendor.bundle.js`, `polyfills.bundle.js` и т.д.) начиная с URL'а первого уровня, а не из корня.
Судя по дебагу - даже в Guard'ы не попадают...

При попытке заменить `/` на `#` начинают задваиваться URL's: `localhost:4200/#/books/id => localhost:4200/#/books/#/books/id`.

Возможно, этот как-то связано с тем, что роутинг прописан в двух модулях: store и admin.
Но я так и не смог разобраться...

### 2. В ui-router'е для AngularJS можно было выстраивать зависящие друго от друга resolve'ы в цепочки.

```javascript
resolve1: ['SomeService', function(SomeService) {
    return SomeService.getAll();
}],
resolve2: ['SomeOtherService', 'resolve1', function(SomeOtherService, resolve1) {
    return SomeOtherService.get(resolve1.id);
}],
resolve3: ['resolve2', function(resolve2) {
    return resolve2.calculateSomething();
}]
```

А можно ли такое же сделать в Angular 2?
Я как-то не нашёл...
Пришлось всё делать одним resolve'ом и возвращать сборный объект вроде `OrdersData`, `OrderData`...

### 3.При первом запуске `ng serve` стабильно выдаётся ошибка про `UniqueId` factory.
Если пересохранить любой файл, чтобы CLI передилдил прогу, то ошибка пропадает.
Так и не понял, что он от меня хочет. :)

### 4. Ошибки далеко не всегда информативные.
В stacktrace только `main.bundle.js`, `vendor.bundle.js`, `polyfills.bundle.js` и т.д.

Можно ли как-то увеличить verbosity?
