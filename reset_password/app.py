from flask import Flask, request, jsonify, redirect, url_for
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

app = Flask(__name__)
CORS(app)

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('MAIL_ADDRESS')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_ADDRESS')

# Secret key for signing tokens
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mail = Mail(app)
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

@app.route('/send-recovery-email', methods=['POST'])
def send_recovery_email():
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({'error': 'Email address is required'}), 400

    # Generate a unique token
    token = serializer.dumps(email, salt='password-recovery-salt')

    # Construct the password recovery URL
    recovery_url = f'http://localhost:3000/reset_password/{token}'

    # Create a password recovery email message
    msg = Message('Redefinição de senha', recipients=[email])
    msg.body = f'Clique no link ao lado para redefinir sua senha: {recovery_url}'

    try:
        mail.send(msg)
        return jsonify({'message': 'Password recovery email sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/recover-password/<token>', methods=['GET'])
def recover_password(token):
    try:
        email = serializer.loads(token, salt='password-recovery-salt', max_age=3600)
        return jsonify({'message': 'Token is valid', 'email': email}), 200
    except Exception as e:
        return jsonify({'error': 'The token is invalid or has expired'}), 400

if __name__ == '__main__':
    app.run(debug=True)
