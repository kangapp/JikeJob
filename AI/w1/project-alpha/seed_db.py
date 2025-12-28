import os
import sys
from sqlalchemy import text

# Add backend to path to import database connection
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.append(backend_path)

from dotenv import load_dotenv
load_dotenv(os.path.join(backend_path, '.env'))

try:
    from database import engine
except ImportError:
    print("Could not import engine from backend.database.")
    sys.exit(1)

def run_seed():
    seed_file_path = os.path.join(os.path.dirname(__file__), 'seed.sql')
    if not os.path.exists(seed_file_path):
        print(f"Seed file not found at {seed_file_path}")
        sys.exit(1)

    print(f"Reading seed file: {seed_file_path}")
    with open(seed_file_path, 'r', encoding='utf-8') as f:
        sql_content = f.read()

    # Split by semicolon to get individual statements
    # This is a simple parser and might fail if semicolons are inside strings
    # But for our generated seed data it should be fine.
    statements = sql_content.split(';')

    print("Executing SQL statements...")
    with engine.connect() as connection:
        # Start transaction
        trans = connection.begin()
        try:
            for stmt in statements:
                stmt = stmt.strip()
                if not stmt:
                    continue
                
                # Skip pure comments
                if stmt.startswith('--'):
                    lines = stmt.split('\n')
                    # filter out comment lines
                    valid_lines = [l for l in lines if not l.strip().startswith('--')]
                    stmt = '\n'.join(valid_lines).strip()
                    if not stmt:
                        continue

                # Execute statement
                # We need to be careful with sqlalchemy text(), it might treat colons as parameters
                # Since our data might have colons (e.g. times, urls), we should escape them or use a raw connection if possible.
                # However, SQLAlchemy text() is usually fine unless we bind params.
                # To be safe against colon issues in text(), we can try to use the raw connection cursor if needed,
                # but engine.connect().execute(text(stmt)) is the standard way.
                
                # One edge case: "SET FOREIGN_KEY_CHECKS = 0" might need to be run.
                try:
                    connection.execute(text(stmt))
                except Exception as e:
                    print(f"Error executing statement: {stmt[:50]}...")
                    print(e)
                    raise e
            
            trans.commit()
            print("Seeding completed successfully.")
        except Exception as e:
            trans.rollback()
            print("Seeding failed, rolled back.")
            sys.exit(1)

if __name__ == '__main__':
    run_seed()
