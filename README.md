# CleverFIT

## Приложение для полного ведения флоу тренировок различного вида пользователя с использованием библиотеки Ant Design v.4 (last major version).

### Одностраничное приложение с роутингом и навигацией по подстраницей в рамках Single Page Application.

### Использованный стек технологий: Typescript, React, Redux, RTK Query, AntDesign, CSS Modules, при разработке использовались запросы к серверу компании Clevertec - в рамках прохождения трехмесячного марафона данной компании. Верстка - согласно макету, адаптированному под Ант дизайн библиотеку.

### В приложении испольлзовалась множество компонентов Ant Design, адаптированных под дизайн-макет, кроме того использовались диаграммы из библиотеки Ant plots.

### 1. Main page

-   верстка страницы согласно макета со стилизацией, близкой к Pixel Perfect. Навигация по приложению осуществляется через боковую панель, а также кликабельные кнопки данной страницы.

### 2. Authorization and authentication

-   реализован функционал авторизации и логина пользователя по его уникальному емайлу (или через google почту). Реализована валидация ввода полей форм авторизации и входа, ошибки на запросы авторизации/аутентификации сопровождаются соответствующими страницами с отображением сообзений об ошибках.

### 3. Feddbacks

-   реализована логика просмотра и добавления отзывов в приложение с возможностью просмотра в отсортированном виде с изменением количества вотображаемых отзывов.

### 4. Calendar page

-   реализовано добавление и редактирование тренировок и упражнений в них. Работа с календарем ант дизайна, его локализацией для русского языка.

### 5. Workouts/Trainings page

-   реализован функционал отображения списка тренировок пользоваьеля, создания/редактирования персональных тренировок и их периодичности, отображение пользователей, готовых к проведению совместных тренировок, работа с приглашениями от других пользователей (принятие/отклоние приглашений других пользователей, отправка приглашений и отмена запланированных совместных тренировок).

### 6. Setting page

-   редактирование информации о пользователе, редактирование аватара пользователя, дизайн страницы различен в зависимости от выбранного тарифа пользователя.

### 7. Achievements page

-   достижения пользователяв виде отображения различного рода статистических данных по временным периодам: неделя и месяц.
