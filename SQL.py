from MySQLdb import connect, cursors
from MySQLdb.cursors import DictCursor


class SQL:
    def __init__(self, username: str,
                 passwd: str,
                 server: str,
                 port: int,
                 database: str) -> None:

        self.user = username
        self.passwd = passwd
        self.server = server
        self.port = port
        self.database = database
        self.connection = None

    def create_connection(self):
        self.connection = connect(
            host=self.server,
            port=self.port,
            user=self.user,
            passwd=self.passwd,
            database=self.database,
            charset='utf8',
            init_command='SET NAMES UTF8'
        )

    def close_connection(self):
        self.connection.close()

    def query(self, query: str, cursor: cursors = DictCursor, params: tuple = ()) -> cursors:
        try:
            with self.connection.cursor(cursor) as cursor:
                cursor.execute(query, params)
                return cursor.fetchall()
        except Exception as e:
            print(e)
            return False

    def insert_order(self, order_id: str, test: str):
        if self.query(query="INSERT orders (`id`, `text`) VALUES (%s, %s)",
                   params=(order_id, test)) is False:
            return False

        return True

    def select_order(self, order_id: str):
        return self.query(query="SELECT text FROM orders WHERE id=%s;",
                          params=(order_id,))
