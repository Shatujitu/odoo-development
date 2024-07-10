# Odoo Installation Guide for Local Development

### Requirements
* OS: Linux / Mac
* IDE: PyCharm Community
* Node: LTS 16 or LTS later
* Python: 3.7 or later
* PostgreSQL: 12 or later

### Setup
1. Clone the project repository 
   ```
   git clone git@github.com:tvsltd/odoo-development.git
   ```
2. Open project and Clone the official odoo and themes 
   ```
   git clone --branch 16.0 --depth 1 https://github.com/odoo/odoo.git odoo
   ```
   ```
   git clone --branch 16.0 --depth 1 https://github.com/odoo/design-themes.git themes
   ```
3. Add submodules
   ```
   git submodule add -b 16.0 https://github.com/odoo/odoo.git odoo

   ```
   ```
   git submodule add -b 16.0 https://github.com/odoo/design-themes.git themes
   ```
4. Initialize and update submodules
   ```
   git submodule update --init --recursive
   ```
5. Update and Upgrade machine
   ```
   sudo apt update && sudo apt upgrade
   ```
6. Essential packages for the Odoo setup on the Ubuntu system
   ```
   sudo apt install wget build-essential libzip-dev python3-dev libxslt1-dev python3-pip libldap2-dev python3-wheel libsasl2-dev python3-venv python3-setuptools libjpeg-dev xfonts-75dpi xfonts-base libpq-dev libffi-dev fontconfig 
   ```
7. Install rtlcss node module for RTL support
   ```
   sudo npm install -g rtlcss
   ```
8. Install wkhtmltopdf manually. It's not installed through pip as a debian package
   ###### For Ubuntu 22.04
   ```
   wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.jammy_amd64.deb
   sudo dpkg -i wkhtmltox_0.12.6.1-2.jammy_amd64.deb
   ```
   ###### For Ubuntu 20.04:
   ```
   wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.focal_amd64.deb
   sudo dpkg -i wkhtmltox_0.12.6-1.focal_amd64.deb
   ```
   ###### For Ubuntu 18.04:
   ```
   wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.bionic_amd64.deb
   sudo dpkg -i wkhtmltox_0.12.6-1.bionic_amd64.deb
   ```
   ###### For Ubuntu 16.04:
   ```
   wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.xenial_amd64.deb
   sudo apt install wkhtmltox_0.12.6-1.xenial_amd64.deb
   ```
   Check https://wkhtmltopdf.org/downloads.html for your operating system
9. Install Postgres and PgAdmin
   ###### Postgres
   Need to install postgres locally and create a user with name `odoo` and database with name `project-name`. Installation guide link https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-22-04-quickstart
   ###### PgAdmin
   Need to install for access postgres. Installation guide link: https://www.pgadmin.org/download/pgadmin-4-apt/
   
   Or you can use the following command to start the Postgres and PgAdmin container quickly if you have docker or docker compose installed. 
   If you use the containerised Postgres provided here, remember to change the postgres port to 5433 in odoo.conf
   
   ```
   docker compose -f docker-compose.postgres.yml up
   ```
10. Open terminal and create virtual environment
    ```
    python3 -m venv venv  
    ```
    ```
    source venv/bin/activate  
    ```
11. Install wheel and package requirements
    ```
    pip3 install wheel 
    ```
    ```
    pip3 install -r odoo/requirements.txt
    ```
12. Open project by PyCharm
13. Add new Python Interpreter in PyCharm using the created virtual environment
14. Create a Configuration by Python
   > Script: `~~/odoo/odoo-bin` (replace ~~ with absolute path)
   
   > Parameters: `-c ~~/conf/odoo.conf` (replace ~~ with absolute path)
   
   > Python Interpreter: Choose the interpreter that you created in step 11
   
   > Working Directory: (project root directory with absolute path)
15. Copy `conf/odoo.conf.example` as `conf/odoo.conf` and check all required variables.
16. Run the project. Output will be shown at http://localhost:8069
