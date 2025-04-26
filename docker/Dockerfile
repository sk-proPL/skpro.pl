FROM php:8.3-apache

RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash

RUN apt-get update && apt-get install -y \
  git \
  zip \
  libpng-dev \
  symfony-cli \
  libicu-dev && \
  docker-php-ext-install intl \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

RUN npm install -g yarn \
    npm install -g sass

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions gd soap calendar pdo_mysql pdo_pgsql
RUN a2enmod rewrite

RUN curl --insecure https://getcomposer.org/composer.phar -o /usr/bin/composer && chmod +x /usr/bin/composer
ENV APACHE_DOCUMENT_ROOT /app/public/
COPY apache.conf /etc/apache2/sites-enabled/000-default.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN service apache2 restart
EXPOSE 80