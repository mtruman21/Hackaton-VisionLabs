'use strict';

class MsgTgRu {
    static welcome() {
        return 'Привет, отправь мне изображение аудитории с людьми, '
        + "которые голосую руками.\nЯ посчитаю сколько человек 'За' и сколько 'Против'";
    }

    static noImg() {
        return 'Отправь мне изображение и я посчитаю голоса';
    }

    static nicePhoto() {
        return 'Классное фото 😍';
    }

    static failTgUrlPhoto() {
        return 'Извините, что-то пошло не так :( На этапе получения изображения от телеграма';
    }

    static result(total, handup, math) {
        const result = (math > 0.5) ? '✅' : '❌';

        return `Результат:
    Всего пользователей 👨‍👩‍👧‍👦 : ${total}
    Пользователей 'За'     🙋‍♂️ : ${handup}
    Доля За                                : ${math.toFixed(2)}
    Итог                                      : ${result}`;
    }
}

module.exports = MsgTgRu;
