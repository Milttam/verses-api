import mysql.connector


def create_database(cursor, db_name):
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name};")


def create_tables(cursor):
    # Define your table creation queries here
    table_queries = [
        """
        CREATE TABLE IF NOT EXISTS Books (
            book_id INT AUTO_INCREMENT PRIMARY KEY,
            book_name VARCHAR(255) NOT NULL
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS Chapters (
            chapter_id INT AUTO_INCREMENT PRIMARY KEY,
            book_id INT,
            chapter_number INT,
            FOREIGN KEY (book_id) REFERENCES Books(book_id)
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS Verses (
            verse_id INT AUTO_INCREMENT PRIMARY KEY,
            chapter_id INT,
            verse_number INT,
            verse_text TEXT,
            FOREIGN KEY (chapter_id) REFERENCES Chapters(chapter_id)
        );
        """
    ]

    for query in table_queries:
        cursor.execute(query)


def insert_verse(cursor, book_name, chapter_number, verse_number, verse_text):
    # Assuming you have a Books table with book_name
    cursor.execute(
        "SELECT book_id FROM Books WHERE book_name = %s", (book_name,))
    book_id = cursor.fetchone()

    if book_id:
        # Assuming you have a Chapters table with book_id and chapter_number
        cursor.execute(
            "SELECT chapter_id FROM Chapters WHERE book_id = %s AND chapter_number = %s",
            (book_id[0], chapter_number)
        )
        chapter_id = cursor.fetchone()

        if chapter_id:
            # Insert the verse into the Verses table
            cursor.execute(
                "INSERT INTO Verses (chapter_id, verse_number, verse_text) VALUES (%s, %s, %s)",
                (chapter_id[0], verse_number, verse_text)
            )


def main():
    # Database connection parameters
    host = 'localhost'
    user = 'your_username'
    password = 'your_password'
    database = 'nasb_bible'

    # Connect to MySQL
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    cursor = connection.cursor()

    # Create the database and tables if they don't exist
    create_database(cursor, database)
    cursor.execute(f"USE {database};")
    create_tables(cursor)

    # Parse your text file and insert verses
    with open('bible_verses.txt', 'r') as file:
        for line in file:
            # Assuming your text file is formatted with book, chapter, verse, and text separated by commas
            book, chapter, verse, text = line.strip().split(',')
            insert_verse(cursor, book, int(chapter), int(verse), text)

    # Commit the changes and close the connection
    connection.commit()
    connection.close()


if __name__ == "__main__":
    main()
