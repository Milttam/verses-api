import mysql.connector
import os
import re


def create_database(cursor, db_name):
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name};")


def create_tables(cursor):
    # Define your table creation queries here
    table_queries = [
        "DELETE FROM Verses;",
        """
        CREATE TABLE IF NOT EXISTS Verses (
            verse_id INT AUTO_INCREMENT PRIMARY KEY,
            book_name VARCHAR(255) NOT NULL,
            chapter_number INT,
            verse_number INT,
            verse_text TEXT
        );
        """
    ]

    for query in table_queries:
        cursor.execute(query)


def insert_verse(cursor, book_name, chapter_number, verse_number, verse_text):
    # insert verse into the verse table
    cursor.execute(
        "INSERT IGNORE INTO Verses (book_name, chapter_number, verse_number, verse_text) VALUES (%s, %s, %s, %s)",
        (book_name, chapter_number, verse_number, verse_text)
    )


def get_verse():
    # Parses the verses.txt file and returns a list of verses
    verses = []
    count = 0
    with open("verses.txt", 'r') as file:
        for line in file:
            if count % 2 == 0:
                # Refactor with regular expressions later
                text = line[:line.rfind('--')].strip()
                label = line[line.rfind('--')+2:].strip()
                *book, cv = label.split(" ")
                book = "-".join(book)
                chapter, verse = cv.split(":")

                # figure out solution to ensure book name consistency

                # Append the verse information to the list
                verses.append({
                    'book': book,
                    'chapter': int(chapter),
                    'verse': int(verse),
                    'text': text
                })
            count += 1

    return verses


def main():
    # Database connection parameters
    host = 'localhost'
    port = 3306
    user = 'root'
    password = os.getenv('PW')
    database = "bible"

    # connect to mySQL
    connection = mysql.connector.connect(
        host=host,
        user=user,
        database="bible",
        password='VerySecureSecret62'
    )

    cursor = connection.cursor()

    # Create the database and tables if they don't exist
    create_database(cursor, database)
    cursor.execute(f"USE {database};")
    create_tables(cursor)

    for entry in get_verse():
        insert_verse(
            cursor, entry["book"], entry["chapter"], entry["verse"], entry["text"])

    # # Commit the changes and close the connection
    connection.commit()
    connection.close()


if __name__ == "__main__":
    main()
