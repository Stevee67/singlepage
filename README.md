# Feature Request
##Installation instruction:

**Install required package libs:**
- sudo apt-get install libpq-dev python-dev sudo apt-get install python3-venv python3-pip.
**Create new postgresql user 'webdev':**
- sudo -u postgres createuser -D -A -P webdev (here system asks a password for just created user.
- Password can be found in secret_data.py file as DB_PASS constant) ALTER USER webdev WITH PASSWORD ''.
**Create new db "singlepage":**
- createdb -u webdev singlepage.
- to recover db from dump: su postgres psql profireader < dump.sql.
**Install virtual environment and necessary packages: **
- pyvenv env && source env/bin/activate && pip3 install -r requirements.txt.
