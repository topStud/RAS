import smtplib
import ssl
import sys
import base64

from pyscopus import Scopus
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

key_1 = 'cb9ed59ab9261f2862d1dd86abd11df3'
key_2 = 'eff2bb99109d0d9f9af51c218b35e998'
scopus = Scopus(key_1)

from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '..')))
from app import mongo


def verification_email(user_email, uid):
    sender_email = "ras.email.noreply@gmail.com"
    receiver_email = user_email
    password_h = "UkFTcGFzc3dvcmQ="

    message = MIMEMultipart("alternative")
    message["Subject"] = "RAS - reset password"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message
    text = f"""\
    Hi,
    How are you?
    It seems like you forgot your password. Don't worry about it!
    Follow the link to reset your password:
    http://localhost:3000/resetPass?uid={uid}"""
    html = f"""\
    <html>
      <body>
        <p>Hi,<br>
           How are you?<br>
           It seems like you forgot your password. Don't worry about it!</br>
           Follow the <a href="http://localhost:3000/resetPass?uid={uid}">link</a> to reset your password.</br>
        </p>
        <p>
            See you soon!
        </p>
      </body>
    </html>
    """

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, base64.b64decode(password_h.encode("utf-8")).decode("utf-8"))
        server.sendmail(sender_email, receiver_email, message.as_string())


def email_in_DB(email):
    query = {"email": email}
    users_collection = mongo.db.users
    user = users_collection.find_one(query)
    print(user['_id'])
    if user is None:
        return -1
    else:
        return user['_id']


def get_publication_journals(first_name, last_name):
    author_result_df = scopus.search_author("AUTHLASTNAME(" + last_name + ") and AUTHFIRST(" + first_name + ")")
    author_pub_df = scopus.search_author_publication(author_result_df['author_id'][0])
    journal_list = list(set(author_pub_df['publication_name']))
    return journal_list
