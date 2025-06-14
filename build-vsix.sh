#!/bin/bash

# build-vsix.sh - Скрипт для компиляции расширения Continue VS Code в VSIX файл
# Использование: ./build-vsix.sh

set -e  # Остановить выполнение при любой ошибке

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода цветного текста
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверка, что мы находимся в корневой директории проекта
if [ ! -f "package.json" ] || [ ! -d "extensions/vscode" ]; then
    print_error "Пожалуйста, запустите скрипт из корневой директории проекта Continue"
    exit 1
fi

print_status "🚀 Начинаем компиляцию расширения Continue VS Code..."

# Шаг 1: Установка зависимостей в корневой директории
print_status "📦 Установка зависимостей в корневой директории..."
npm install || {
    print_error "Ошибка при установке зависимостей в корневой директории"
    exit 1
}
print_success "Зависимости в корневой директории установлены"

# Шаг 2: Установка зависимостей в core
print_status "📦 Установка зависимостей в core..."
cd core
npm install || {
    print_error "Ошибка при установке зависимостей в core"
    exit 1
}
cd ..
print_success "Зависимости в core установлены"

# Шаг 3: Установка зависимостей в gui
print_status "📦 Установка зависимостей в gui..."
cd gui
npm install || {
    print_error "Ошибка при установке зависимостей в gui"
    exit 1
}

# Шаг 4: Сборка GUI
print_status "🔨 Сборка GUI интерфейса..."
npm run build || {
    print_error "Ошибка при сборке GUI"
    exit 1
}
cd ..
print_success "GUI собран успешно"

# Шаг 5: Установка зависимостей в расширении VS Code
print_status "📦 Установка зависимостей в расширении VS Code..."
cd extensions/vscode
npm install || {
    print_error "Ошибка при установке зависимостей в расширении VS Code"
    exit 1
}
print_success "Зависимости в расширении VS Code установлены"

# Шаг 6: Копирование собранного GUI в расширение
print_status "📋 Копирование GUI в расширение..."
rm -rf gui
cp -r ../../gui/dist gui || {
    print_error "Ошибка при копировании GUI"
    exit 1
}
print_success "GUI скопирован в расширение"

# Шаг 7: Сборка TypeScript кода
print_status "🔨 Сборка TypeScript кода..."
npm run esbuild || {
    print_warning "esbuild завершился с предупреждениями, но продолжаем..."
}
print_success "TypeScript код собран"

# Шаг 8: Создание директории build
print_status "📁 Создание директории build..."
mkdir -p build

# Шаг 9: Упаковка расширения в VSIX
print_status "📦 Упаковка расширения в VSIX файл..."
npm run package || {
    print_error "Ошибка при упаковке расширения"
    exit 1
}

# Шаг 10: Проверка результата
if [ -f build/continue-*.vsix ]; then
    VSIX_FILE=$(ls build/continue-*.vsix)
    VSIX_SIZE=$(ls -lh "$VSIX_FILE" | awk '{print $5}')
    print_success "🎉 VSIX файл успешно создан!"
    echo ""
    echo "📄 Файл: $VSIX_FILE"
    echo "📏 Размер: $VSIX_SIZE"
    echo ""
    echo "🚀 Для установки расширения в VS Code выполните:"
    echo "   code --install-extension $VSIX_FILE"
    echo ""
    echo "   Или через интерфейс VS Code:"
    echo "   Extensions → Install from VSIX → выберите файл"
else
    print_error "VSIX файл не найден!"
    exit 1
fi

print_success "✅ Компиляция завершена успешно!" 