const config = {
    recipesPerPage: 6,
    apiUrl: 'https://api.example.com/recipes'
};

const elements = {
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    modal: document.getElementById('recipe-modal'),
    modalContent: document.getElementById('modal-recipe-content'),
    closeModalBtn: document.querySelector('.modal-close'),
    searchInDescription: document.getElementById('search-in-description'),
    categoryButtons: document.querySelectorAll('.category-btn'),
    ingredientButtons: document.querySelectorAll('.ingredient-btn'), // Добавьте это
    recipesContainer: document.querySelector('.recipes-container'),
    recipeButtons: document.querySelectorAll('.open-recipe'),
    collectionLinks: document.querySelectorAll('.collection-card__link'),
    searchForms: document.querySelectorAll('.search-form'),
    recipeCards: document.querySelectorAll('.recipe-card'),
};

const categoryButtons = document.querySelectorAll('.category-btn');
const ingredientButtons = document.querySelectorAll('.ingredient-btn'); // Добавьте это
const recipesContainer = document.querySelector('.recipes-grid');

const recipes = [
    { title: "Шоколадный кекс", category: "Выпечка", description: "Выпечь кекс с шоколадом.", ingredients: ["Шоколад", "Мука", "Яйца"] },
    { title: "Грибной суп", category: "Супы", description: "Варить грибы и овощи, добавить сливки.", ingredients: ["Грибы", "Овощи", "Сливки"] },
    { title: "Курица гриль", category: "Мясо", description: "Запечь курицу с специями.", ingredients: ["Курица", "Специи"] },
    { title: "Салат с клубникой и шпинатом", category: "Салаты", description: "Нарезать клубнику, добавить шпинат, заправить йогуртом.", ingredients: ["Клубника", "Шпинат", "Йогурт"] },
    { title: "Тыквенный суп", category: "Супы", description: "Варить тыкву и овощи, пюрировать, добавить сливки.", ingredients: ["Тыква", "Овощи", "Сливки"] },
    { title: "Роллы с лососем", category: "Закуски", description: "Свернуть лосось и рис в роллы.", ingredients: ["Лосось", "Рис"] },
    { title: "Картофельное пюре", category: "Гарниры", description: "Варить картофель, пюрировать, добавить масло и молоко.", ingredients: ["Картофель", "Масло", "Молоко"] },
    { title: "Чизкейк", category: "Десерты", description: "Смешать ингредиенты, выпечь.", ingredients: ["Сыр", "Яйца", "Сахар", "Печенье"] },
    { title: "Греческий салат", category: "Салаты", description: "Нарезать овощи, смешать с фета и оливками, заправить маслом.", ingredients: ["Овощи", "Фета", "Оливки", "Масло"] },
    { title: "Вегетарианский бургер", category: "Вегетарианские", description: "Смешать овощи и бобовые, сформировать котлеты, обжарить.", ingredients: ["Овощи", "Бобовые"] },
    { title: "Лимонад", category: "Напитки", description: "Смешать лимонный сок, воду и сахар.", ingredients: ["Лимонный сок", "Вода", "Сахар"] },
    { title: "Жареная картошка", category: "Гарниры", description: "Нарезать картофель, обжарить на сковороде.", ingredients: ["Картофель", "Масло"] },
    { title: "Свиные отбивные", category: "Мясо", description: "Обжарить свиные отбивные на сковороде.", ingredients: ["Свиные отбивные", "Масло"] },
    { title: "Пирог с вишней", category: "Выпечка", description: "Выпечь пирог с вишней.", ingredients: ["Вишня", "Тесто", "Сахар"] },
    { title: "Салат с авокадо и креветками", category: "Салаты", description: "Нарезать авокадо, добавить креветки, заправить лимонным соком.", ingredients: ["Авокадо", "Креветки", "Лимонный сок"] },
    { title: "Фалафель", category: "Вегетарианские", description: "Смешать нут, чеснок и специи, сформировать шарики, обжарить.", ingredients: ["Нут", "Чеснок", "Специи"] },
    { title: "Томатный суп", category: "Супы", description: "Обжарить овощи, добавить бульон, варить до готовности.", ingredients: ["Овощи", "Бульон"] },
    { title: "Цезарь с курицей", category: "Салаты", description: "Нарезать огурцы, помидоры, лук, добавить оливки и сыр фета, заправить оливковым маслом.", ingredients: ["Огурцы", "Помидоры", "Лук", "Оливки", "Сыр фета", "Оливковое масло"] },
    { title: "Овощное рагу", category: "Вегетарианские", description: "Тушить овощи с томатным соусом.", ingredients: ["Овощи", "Томатный соус"] },
    { title: "Мороженое", category: "Десерты", description: "Смешать ингредиенты, заморозить.", ingredients: ["Молоко", "Сахар", "Яйца"] },
    { title: "Чай с мятой", category: "Напитки", description: "Заварить чай, добавить мяту.", ingredients: ["Чай", "Мята"] },
    { title: "Брускетта с помидорами", category: "Закуски", description: "Нарезать хлеб, добавить помидоры и чеснок.", ingredients: ["Хлеб", "Помидоры", "Чеснок"] },
    { title: "Куриный суп", category: "Супы", description: "Варить курицу, добавить овощи, варить до готовности.", ingredients: ["Курица", "Овощи"] },
    { title: "Шоколадный мусс", category: "Десерты", description: "Взбить ингредиенты, охладить.", ingredients: ["Шоколад", "Яйца", "Сахар"] },
    { title: "Пюре из цветной капусты", category: "Гарниры", description: "Варить цветную капусту, пюрировать, добавить сливки.", ingredients: ["Цветная капуста", "Сливки"] },
    { title: "Котлеты из индейки", category: "Мясо", description: "Смешать фарш индейки с яйцом, обжарить.", ingredients: ["Фарш индейки", "Яйцо"] },
    { title: "Глинтвейн", category: "Напитки", description: "Нагреть вино с пряностями и фруктами.", ingredients: ["Вино", "Пряности", "Фрукты"] },
    { title: "Запеченные овощи", category: "Гарниры", description: "Запечь овощи с маслом и специями.", ingredients: ["Овощи", "Масло", "Специи"] },
    { title: "Канапе с сыром", category: "Закуски", description: "Нарезать хлеб, добавить сыр и оливки.", ingredients: ["Хлеб", "Сыр", "Оливки"] },
    { title: "Баранина с овощами", category: "Мясо", description: "Тушить баранину с овощами.", ingredients: ["Баранина", "Овощи"] },
    { title: "Смузи", category: "Напитки", description: "Смешать фрукты и йогурт, взбить.", ingredients: ["Фрукты", "Йогурт"] },
    { title: "Овощной салат", category: "Салаты", description: "Нарезать овощи, смешать, заправить маслом.", ingredients: ["Овощи", "Масло"] },
    { title: "Тирамису", category: "Десерты", description: "Смочить печенье в кофе, чередовать слои с кремом.", ingredients: ["Печенье", "Кофе", "Крем"] },
    { title: "Суп-пюре из брокколи", category: "Супы", description: "Варить брокколи, пюрировать, добавить сливки.", ingredients: ["Брокколи", "Сливки"] },
    { title: "Круассаны", category: "Выпечка", description: "Выпечь круассаны с начинкой.", ingredients: ["Тесто", "Начинка"] },
    { title: "Рис с овощами", category: "Гарниры", description: "Варить рис, добавить овощи, обжарить.", ingredients: ["Рис", "Овощи"] },
    { title: "Жаркое из говядины", category: "Мясо", description: "Обжарить говядину с овощами.", ingredients: ["Говядина", "Овощи"] },
    { title: "Кофе с молоком", category: "Напитки", description: "Смешать кофе и молоко.", ingredients: ["Кофе", "Молоко"] },
    { title: "Пирог с мясом", category: "Выпечка", description: "Выпечь пирог с мясом и овощами.", ingredients: ["Мясо", "Овощи", "Тесто"] },
    { title: "Чипсы с гуакамоле", category: "Закуски", description: "Нарезать авокадо, смешать с лимонным соком.", ingredients: ["Авокадо", "Лимонный сок"] },
    { title: "Яблочный пирог", category: "Выпечка", description: "Выпечь пирог с яблоками.", ingredients: ["Яблоки", "Тесто", "Сахар"] },
    { title: "Овощные палочки с соусом", category: "Закуски", description: "Нарезать овощи, подать с соусом.", ingredients: ["Овощи", "Соус"] },
    { title: "Вегетарианский суп", category: "Вегетарианские", description: "Варить овощи и бобовые.", ingredients: ["Овощи", "Бобовые"] },
    { title: "Ризотто с грибами", category: "Вегетарианские", description: "Варить рис с грибами и овощами.", ingredients: ["Рис", "Грибы", "Овощи"] },
];

document.addEventListener('DOMContentLoaded', function() {
    if (elements.recipesContainer) {
        setupEventListeners();
        setupModal();
        setupCategoryButtons();
        setupIngredientButtons(); // Добавьте эту строку
        displayRecipes(recipes);
    } else {
        console.error('Recipes container not found');
    }
});

function displayRecipes(recipesToDisplay) {
    if (!elements.recipesContainer) {
        console.error('Recipes container not found');
        return;
    }

    elements.recipesContainer.innerHTML = recipesToDisplay.map(recipe => `
        <div class="recipe-card" data-recipe='${JSON.stringify(recipe)}'>
            <div class="recipe-image">
                <img src="/static/images/recipes/${recipe.title.toLowerCase().replace(/\s+/g, '_')}.jpg"
                     alt="${recipe.title}"
                     onerror="this.src='/static/images/default-food.jpg'">
                <span class="recipe-category">${recipe.category}</span>
            </div>
            <div class="recipe-content">
                <h3>${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-ingredients">
                    <h4>Ингредиенты:</h4>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

function setupCategoryButtons() {
    elements.categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            elements.categoryButtons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');

            const category = this.getAttribute('data-category');
            if (category === 'Все') {
                displayRecipes(recipes);
            } else {
                const filteredRecipes = recipes.filter(recipe => recipe.category === category);
                displayRecipes(filteredRecipes);
            }
        });
    });

    const allButton = document.querySelector('.category-btn[data-category="Все"]');
    if (allButton) {
        allButton.classList.add('active');
    }
}

function setupIngredientButtons() {
    elements.ingredientButtons.forEach(button => {
        button.addEventListener('click', function() {
            elements.ingredientButtons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');

            const ingredient = this.getAttribute('data-ingredients');
            if (ingredient === 'Все') {
                displayRecipes(recipes);
            } else {
                const filteredRecipes = recipes.filter(recipe => recipe.ingredients.includes(ingredient));
                displayRecipes(filteredRecipes);
            }
        });
    });

    const allButton = document.querySelector('.ingredient-btn[data-ingredients="Все"]');
    if (allButton) {
        allButton.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
  const allButton = document.querySelector('.category-btn[data-category="Все"]');
  if (allButton) {
    allButton.classList.add('active');
  }
});

function handleSearch() {
    const searchTerm = elements.searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        displayRecipes(recipes);
        return;
    }

    const filteredRecipes = filterRecipes(searchTerm);
    displayRecipes(filteredRecipes);
}

function filterRecipes(searchTerm) {
    if (!searchTerm) return recipes;

    return recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm)
    );
}

function setupEventListeners() {
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', handleSearch);
    }
    if (elements.searchInput) {
        elements.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    elements.searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = form.querySelector('.search-form__input');
            const searchTerm = searchInput.value.trim().toLowerCase();

            const filteredRecipes = filterRecipes(searchTerm);
            displayRecipes(filteredRecipes);
        });
    });

    elements.collectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            const categoryRecipes = recipes.filter(recipe => recipe.category === category);

            if (elements.modalContent) {
                elements.modalContent.innerHTML = `
                    <h2>${this.parentElement.querySelector('.collection-card__title').textContent}</h2>
                    ${categoryRecipes.map(recipe => `
                        <div class="recipe">
                            <h3>${recipe.title}</h3>
                            <p>${recipe.description}</p>
                        </div>
                    `).join('')}
                `;

                if (elements.modal) {
                    elements.modal.classList.add('active');
                }
            } else {
                console.error('Modal content not found');
            }
        });
    });

    elements.recipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = this.getAttribute('data-recipe');
            console.log('Loading recipe:', recipeId);

            fetch(`/static/recipes/${recipeId}.json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Recipe data:', data);
                    if (elements.modalContent) {
                        elements.modalContent.innerHTML = `
                            <div class="recipe-modal">
                                <div class="recipe-modal__image">
                                    <img src="${data.image}" alt="${data.title}">
                                </div>
                                <div class="recipe-details">
                                    <h2>${data.title}</h2>
                                    <div class="recipe-meta">
                                        <span><i class="fas fa-clock"></i> ${data.time} мин</span>
                                        <span><i class="fas fa-utensils"></i> ${data.servings} порции</span>
                                    </div>
                                    <div class="recipe-section">
                                        <h3>Ингредиенты</h3>
                                        <ul>${data.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                                    </div>
                                    <div class="recipe-section">
                                        <h3>Инструкция</h3>
                                        <p>${data.instructions}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                        if (elements.modal) {
                            elements.modal.classList.add('active');
                            document.body.style.overflow = 'hidden';
                        }
                    } else {
                        console.error('Modal content not found');
                    }
                })
                .catch(error => {
                    console.error('Error loading recipe:', error);
                    if (elements.modalContent) {
                        elements.modalContent.innerHTML = `<p>Произошла ошибка при загрузке рецепта: ${error.message}</p>`;
                        if (elements.modal) {
                            elements.modal.classList.add('active');
                        }
                    } else {
                        console.error('Modal content not found');
                    }
                });
        });
    });
}

function setupModal() {
    if (elements.closeModalBtn) {
        elements.closeModalBtn.addEventListener('click', closeModal);
    }
    if (elements.modal) {
        elements.modal.addEventListener('click', function(e) {
            if (e.target === elements.modal) closeModal();
        });
    }
}

function closeModal() {
    if (elements.modal) {
        elements.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function openRecipeModal(recipeData) {
    const recipe = typeof recipeData === 'string' ? JSON.parse(recipeData) : recipeData;

    elements.modalContent.innerHTML = `
        <div class="modal-recipe">
            <div class="modal-recipe-image">
                <img src="${recipe.image}" alt="${recipe.title}"
                     onerror="this.src='/static/images/default-food.jpg'">
            </div>
            <div class="modal-recipe-content">
                <h2>${recipe.title}</h2>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time} мин</span>
                    <span><i class="fas fa-utensils"></i> ${recipe.servings} порции</span>
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-section">
                    <h3>Ингредиенты</h3>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
                <div class="recipe-section">
                    <h3>Инструкция</h3>
                    <p>${recipe.instructions.replace(/\n/g, '<br>')}</p>
                </div>
            </div>
        </div>
    `;

    elements.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function setupModal() {
    elements.recipeCards.forEach(card => {
        card.addEventListener('click', function() {
            openRecipeModal(this.getAttribute('data-recipe'));
        });
    });

    if (elements.closeModalBtn) {
        elements.closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(e) {
        if (e.target === elements.modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupModal();
    setupCategoryButtons();
    setupIngredientButtons();
    displayRecipes(recipes);
});
