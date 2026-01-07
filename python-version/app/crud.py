from app.db import get_conn

def create_code(data):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO codes (title, category, explanation, code)
                VALUES (%s, %s, %s, %s)
                RETURNING id;
                """,
                (
                    data.title,
                    data.category,
                    data.explanation,
                    data.code,
                )
            )
            code_id = cur.fetchone()[0]
            conn.commit()
            return code_id

def get_code_by_id(code_id: int):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, title, category, explanation, code FROM codes WHERE id = %s;",
                (code_id,)
            )
            row = cur.fetchone()

            if row is None:
                return None

            return {
                "id": row[0],
                "title": row[1],
                "category": row[2],
                "explanation": row[3],
                 "code": row[4],
            }

def get_codes_grouped():
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, title, category, explanation, code
                FROM codes
                ORDER BY category, id;
                """
            )
            rows = cur.fetchall()

            grouped = {}

            for row in rows:
                category = row[2]

                if category not in grouped:
                    grouped[category] = []

                grouped[category].append({
                    "id": row[0],
                    "title": row[1],
                    "category": row[2],
                    "explanation": row[3],
                    "code": row[4],
                })

            return grouped

def update_code(code_id: int, data):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE codes
                SET title = %s,
                    category = %s,
                    explanation = %s,
                    code = %s
                WHERE id = %s;
                """,
                (
                    data.title,
                    data.category,
                    data.explanation,
                    data.code,
                    code_id,
                )
            )
            conn.commit()
            return cur.rowcount


def delete_code(code_id: int):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM codes WHERE id = %s;",
                (code_id,)
            )
            conn.commit()
            return cur.rowcount
