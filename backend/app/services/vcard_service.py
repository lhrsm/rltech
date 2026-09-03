import io
import qrcode
from typing import Optional

def generate_vcard_content(
    name: str,
    title: str,
    company: str,
    phone: str,
    email: str,
    website: str,
    bio: Optional[str] = None
) -> str:
    """Generates standard vCard 3.0 string formatted according to RFC 2426"""
    # Parse given and family name if possible
    name_parts = name.strip().split(" ", 1)
    given_name = name_parts[0]
    family_name = name_parts[1] if len(name_parts) > 1 else ""

    vcard_lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        f"N:{family_name};{given_name};;;",
        f"FN:{name}",
        f"ORG:{company};",
        f"TITLE:{title}",
        f"TEL;TYPE=CELL,VOICE:{phone}",
        f"EMAIL;TYPE=WORK,INTERNET:{email}",
        f"URL:{website}",
    ]
    
    if bio:
        cleaned_bio = bio.replace("\n", " ").replace("\r", "")
        vcard_lines.append(f"NOTE:{cleaned_bio}")
        
    vcard_lines.append("END:VCARD")
    return "\r\n".join(vcard_lines) + "\r\n"

def generate_qr_code_image(data: str) -> bytes:
    """Generates PNG QR code bytes for a given URL or data string"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#09090b", back_color="#ffffff")
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    return buffer.getvalue()
