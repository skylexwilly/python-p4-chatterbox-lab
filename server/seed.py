from app import app, db, Message

def seed():
    messages = [
        {'body': 'Hello, world!', 'username': 'Ian'},
        {'body': 'This is a seeded message.', 'username': 'SeedBot'},
        {'body': 'I love Chatterbox!', 'username': 'ChatterFan'},
    ]

    for m in messages:
        msg = Message(body=m['body'], username=m['username'])
        db.session.add(msg)

    db.session.commit()
    print('Database seeded with messages!')


if __name__ == '__main__':
    # make sure we are inside Flask application context
    with app.app_context():
        seed()
