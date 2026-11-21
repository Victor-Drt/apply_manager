from fastapi import Request

def build_pagination_links(request: Request, total: int, limit: int, offset: int) -> tuple[str | None, str | None]:
    # 1. Link da próxima página (next)
    next_offset = offset + limit
    if next_offset < total:
        next_url = str(request.url.include_query_params(limit=limit, offset=next_offset))
    else:
        next_url = None

    # 2. Link da página anterior (previous)
    if offset > 0:
        prev_offset = max(0, offset - limit)
        prev_url = str(request.url.include_query_params(limit=limit, offset=prev_offset))
    else:
        prev_url = None

    return next_url, prev_url
