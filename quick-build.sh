#!/bin/bash

# quick-build.sh - Быстрая пересборка VSIX (без установки зависимостей)
# Использование: ./quick-build.sh

set -e

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Проверка корневой директории
if [ ! -f "package.json" ] || [ ! -d "extensions/vscode" ]; then
    echo "❌ Запустите скрипт из корневой директории проекта Continue"
    exit 1
fi

print_status "⚡ Быстрая пересборка VSIX..."

# Сборка GUI
print_status "🔨 Сборка GUI..."
cd gui && npm run build && cd ..

# Копирование GUI в расширение
print_status "📋 Копирование GUI..."
cd extensions/vscode
rm -rf gui && cp -r ../../gui/dist gui

# Сборка и упаковка
print_status "📦 Сборка и упаковка..."
npm run esbuild 2>/dev/null || true
mkdir -p build
npm run package

# Результат
VSIX_FILE=$(ls build/continue-*.vsix)
VSIX_SIZE=$(ls -lh "$VSIX_FILE" | awk '{print $5}')
print_success "✅ VSIX готов: $VSIX_FILE ($VSIX_SIZE)" 