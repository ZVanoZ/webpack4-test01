#------------------------------------------------------------------------------
#-- DEV-сервер.

# Устанавливаем модули для запуска DEV-сервера
$ npm install --save-dev webpack-cli
$ npm install --save-dev webpack-dev-server

# Правим конфиги, см. https://webpack.js.org/guides/development/#using-webpack-dev-server
# Запускаем DEV-сервер.
$ npm start
#------------------------------------------------------------------------------
# Шпаргалка по комадам Webpack
#--

# Вывод информации о времени, затраченном на каждый модуль сборки
$ webpack --profile --display-modules

# Дополнительно выводится информация о субзависимостях модулей
$ webpack --profile --display-modules --display-reasons
