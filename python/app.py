from flask import Flask, request, jsonify, send_file
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv
from sqlalchemy.sql import text
import csv
import io

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

# Configuration for SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Secret key for signing tokens
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mail = Mail(app)
db = SQLAlchemy(app)
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

# Log to ensure database connection
try:
    with app.app_context():
        db.session.execute(text('SELECT 1'))
    print("Database connection successful")
except Exception as e:
    print(f"Database connection failed: {e}")

class User(db.Model):
    __tablename__ = 'Usuario'
    userId = db.Column('userId', db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100))
    profileId = db.Column(db.Integer)

class Profile(db.Model):
    __tablename__ = 'Perfil'
    profileId = db.Column('profileId', db.Integer, primary_key=True)
    name = db.Column(db.String(100))

class Module(db.Model):
    __tablename__ = "Modulo"
    moduleId = db.Column('moduleId', db.Integer, primary_key=True)
    name = db.Column(db.String(100))

class Transaction(db.Model):
    __tablename__ = 'Transacao'
    transactionId = db.Column('transactionId', db.Integer, primary_key=True)
    name = db.Column(db.String(100))

class Function(db.Model):
    __tablename__ = 'Funcao'
    functionId = db.Column('functionId', db.Integer, primary_key=True)
    name = db.Column(db.String(100))

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

@app.route('/reports', methods=['GET'])
def get_reports():
    try:
        user_count = db.session.query(User).count()
        profile_count = db.session.query(Profile).count()
        module_count = db.session.query(Module).count()
        transaction_count = db.session.query(Transaction).count()
        function_count = db.session.query(Function).count()
        return jsonify({
            'user_count': user_count,
            'profile_count': profile_count,
            'module_count': module_count,
            'transaction_count': transaction_count,
            'function_count': function_count,
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/reports-data', methods=['GET'])
def reports_data():
    try:
        output = io.StringIO()
        writer = csv.writer(output, quoting=csv.QUOTE_NONNUMERIC)

        queries = {
            'Usuario': '''
                SELECT 
                    u.email,
                    u.name AS nome,
                    p.name AS perfil
                FROM 
                    "Usuario" u
                JOIN 
                    "Perfil" p ON u."profileId" = p."profileId";
            ''',
            'Perfil': '''
                SELECT 
                    name AS nome
                FROM 
                    "Perfil";
            ''',
            'Modulo': '''
                SELECT 
                    name AS nome
                FROM 
                    "Modulo";
            ''',
            'Transacao': '''
                SELECT 
                    name AS nome
                FROM 
                    "Transacao";
            ''',
            'Funcao': '''
                SELECT 
                    name AS nome
                FROM 
                    "Funcao";
            '''
        }

        sections = ['Usuario', 'Perfil', 'Modulo', 'Transacao', 'Funcao']

        for section in sections:
            query = queries[section]
            print(f"Executing query for table: {section}")
            writer.writerow([f'{section}'])
            try:
                result = db.session.execute(text(query))
                columns = result.keys()
                writer.writerow(columns)  # write headers

                rows = result.fetchall()
                if not rows:
                    print(f"No data found for table: {section}")
                else:
                    print(f"Found data for table: {section}, writing to CSV")
                    for row in rows:
                        writer.writerow([x if x is not None else '----------------' for x in row])
                writer.writerow([])  # empty line for separation
            except Exception as query_error:
                print(f"Error executing query for table {section}: {query_error}")

        output.seek(0)
        return send_file(
            io.BytesIO(output.getvalue().encode('utf-8')),
            mimetype='text/csv',
            download_name='database_contents.csv',
            as_attachment=True
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
