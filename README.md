# sandbox

A project that helps you use your experiences and test them

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

> Feel free to use this repo for test your trainees or employees, you can change everything :+1:

### Prerequisites

What things you need to install the software and how to install them

- XAMPP
- Your experiences

### Installing

A step by step series of examples that tell you how to get a development env running

1. Download, install and run [XAMPP](https://www.apachefriends.org/download.html)

1. Fork repo and clone your forked repo into `htdocs` folder

   ```bash
   ~ cd htdocs
   ~ git clone https://github.com/[YOUR-GITHUB-USERNAME]/Design-sandbox.git
   ```

1. Import `DATABASE/db_tmp.sql` into your localhost phpMyAdmin (use [this](https://mediatemple.net/community/products/dv/204403864/export-and-import-mysql-databases#method1-import-dv) if you don't know how)

1. Change `config/database.php` values into your phpMyAdmin settings

   ```PHP
   <?php
      // Change these values with database login values in your localhost or host
      $databseConfig = array(
         'server' => 'YOUR-SERVER', // Normally localhost
         'database' => 'NAME-OF-DATABASE-IN-STEP-1',
         'username' => 'USERNAME-OF-DATABASE-USER-YOU-CREATE', // If use XAMPP the default is root
         'password' => 'PASSWORD-OF-DATABASE-USER-YOU-CREATE'  // If use XAMPP the default is empty
      );
   ```

1. Take a look at [wiki](https://github.com/androsein/sandbox/wiki) and use it to design the system

1. Start coding :smiley:

1. When finished, push your works and [tell me](#contact-me) to take a look at it

## Why

- With this repo you can use your experiences and test your expriences in web and mobile development
- This is a good practice to contribute in a project using git and github
- Get familiar with the development mechanism that i worked in my team
- And at the end i can see how you design and develop in action

## Built With

- [PHP](https://www.php.net/) - Server language
- [MySQL](https://www.mysql.com/) - Database engine

## Author

- **Hossein Tavangar** - _Initial work (server side)_ - [androsein](https://github.com/androsein)

## Contact me

- [Send me email](mailto:hi@androsein.ir)
- [Telegram](https://t.me/androsein)
- Or if you can see me, see me :neutral_face:

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
