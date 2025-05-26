from flask import Flask, render_template, request, redirect, url_for, flash, abort, send_from_directory, jsonify
import os

app = Flask(__name__)

all_recipes = [
        {"title": "Тыквенный суп", "description": "Варить тыкву и овощи, пюрировать, добавить сливки.", "ingredients": ["Тыква", "Овощи", "Сливки"], "category": "Супы"},
        {"title": "Куриный суп", "description": "Варить курицу, добавить овощи, варить до готовности.", "ingredients": ["Курица", "Овощи"]},
        {"title": "Томатный суп", "description": "Обжарить овощи, добавить бульон, варить до готовности.", "ingredients": ["Овощи", "Бульон"]},
        {"title": "Грибной суп", "description": "Варить грибы и овощи, добавить сливки.", "ingredients": ["Грибы", "Овощи", "Сливки"]},
        {"title": "Суп-пюре из тыквы", "description": "Варить тыкву и овощи, пюрировать, добавить сливки.", "ingredients": ["Тыква", "Овощи", "Сливки"]},
        {"title": "Глинтвейн", "description": "Нагреть вино с пряностями и фруктами.", "ingredients": ["Вино", "Пряности", "Фрукты"]},
        {"title": "Греческий салат", "description": "Нарезать овощи, смешать с фета и оливками, заправить маслом.", "ingredients": ["Овощи", "Фета", "Оливки", "Масло"]},
        {"title": "Овощной салат", "description": "Нарезать овощи, смешать, заправить маслом.", "ingredients": ["Овощи", "Масло"]},
        {"title": "Фруктовый салат", "description": "Нарезать фрукты, смешать с йогуртом.", "ingredients": ["Фрукты", "Йогурт"]},
        {"title": "Тирамису", "description": "Смочить печенье в кофе, чередовать слои с кремом.", "ingredients": ["Печенье", "Кофе", "Крем"]},
        {"title": "Чизкейк", "description": "Смешать ингредиенты, выпечь.", "ingredients": ["Сыр", "Яйца", "Сахар", "Печенье"]},
        {"title": "Мороженое", "description": "Смешать ингредиенты, заморозить.", "ingredients": ["Молоко", "Сахар", "Яйца"]},
        {"title": "Шоколадный мусс", "description": "Взбить ингредиенты, охладить.", "ingredients": ["Шоколад", "Яйца", "Сахар"]},
        {"title": "Салат с редисом и зеленью", "description": "Нарезать редис и зелень, заправить маслом.", "ingredients": ["Редис", "Зелень", "Масло"]},
        {"title": "Спаржевый крем-суп", "description": "Варить спаржу, пюрировать, добавить сливки.", "ingredients": ["Спаржа", "Сливки"]},
        {"title": "Омлет с зеленым луком и помидорами", "description": "Взбить яйца, добавить лук и помидоры, жарить.", "ingredients": ["Яйца", "Зеленый лук", "Помидоры"]},
        {"title": "Салат с клубникой и шпинатом", "description": "Смешать клубнику и шпинат, заправить маслом.", "ingredients": ["Клубника", "Шпинат", "Масло"]},
        {"title": "Запеченный лосось с лимоном и укропом", "description": "Запечь лосось с лимоном и укропом.", "ingredients": ["Лосось", "Лимон", "Укроп"]},
        {"title": "Летний салат с арбузом и фетой", "description": "Нарезать арбуз и фета, смешать.", "ingredients": ["Арбуз", "Фета"]},
        {"title": "Холодный суп гаспачо", "description": "Смешать овощи, добавить бульон, охладить.", "ingredients": ["Овощи", "Бульон"]},
        {"title": "Гриль из овощей", "description": "Запечь овощи на гриле.", "ingredients": ["Овощи"]},
        {"title": "Фруктовый сорбет", "description": "Смешать фрукты, заморозить.", "ingredients": ["Фрукты", "Сахар"]},
        {"title": "Летние роллы с лососем и авокадо", "description": "Свернуть лосось и авокадо в роллы.", "ingredients": ["Лосось", "Авокадо", "Рис"]},
        {"title": "Запеченная тыква с медом и орехами", "description": "Запечь тыкву с медом и орехами.", "ingredients": ["Тыква", "Мед", "Орехи"]},
        {"title": "Грибной ризотто", "description": "Варить рис с грибами.", "ingredients": ["Рис", "Грибы"]},
        {"title": "Яблочный пирог", "description": "Выпечь пирог с яблоками.", "ingredients": ["Яблоки", "Тесто", "Сахар"]},
        {"title": "Жаркое из овощей", "description": "Жарить овощи.", "ingredients": ["Овощи"]},
        {"title": "Запеченная индейка с овощами", "description": "Запечь индейку с овощами.", "ingredients": ["Индейка", "Овощи"]},
        {"title": "Суп-пюре из брокколи", "description": "Варить брокколи, пюрировать.", "ingredients": ["Брокколи", "Сливки"]},
        {"title": "Шоколадный фондю", "description": "Растопить шоколад, добавить сливки.", "ingredients": ["Шоколад", "Сливки"]},
        {"title": "Пирог с мясом и грибами", "description": "Выпечь пирог с мясом и грибами.", "ingredients": ["Мясо", "Грибы", "Тесто"]}
    ]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recipes')
def recipes():
    search_term = request.args.get('search', '').lower()
    filtered_recipes = filter_recipes(search_term)
    return render_template('recipes.html', recipes=filtered_recipes)

def filter_recipes(search_term):
    if not search_term:
        return recipes
    return [recipe for recipe in recipes if search_term in recipe['title'].lower()]

@app.route('/api/recipes/<int:recipe_id>')
def get_recipe(recipe_id):
    if recipe_id < 0 or recipe_id >= len(recipes):
        abort(404)
    recipe = recipes[recipe_id]
    return jsonify({
        'id': recipe_id,
        'title': recipe['title'],
        'image': url_for('static', filename=f'uploads/{recipe["title"].replace(" ", "_").lower()}.jpg'),
        'time': 30,  # Примерное значение
        'servings': 4,  # Примерное значение
        'ingredients': recipe['ingredients'],
        'instructions': recipe.get('instructions', ''),
        'category': recipe['category']
    })

@app.route('/about')
def about():
    return render_template('about.html')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get('PORT', 10000)), debug=False)

