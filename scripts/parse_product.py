import json
import re
from typing import Dict, Any, Optional
from dataclasses import dataclass
from urllib.parse import urlparse, parse_qs

@dataclass
class ProductData:
    name: str
    price: float
    compare_at_price: float
    width_mm: int
    length_mm: int
    height_mm: Optional[int] = None
    material: str = ""
    slats_material: str = ""
    finish: Optional[str] = None
    color: Optional[str] = None
    brand: str = "chocolate-wood"
    origin: str = "au"
    warranty_months: int = 24
    assembly_required: bool = True
    customizable: bool = True
    source_url: str = ""
    images: list = None

class ProductParser:
    def __init__(self):
        self.product = ProductData("", 0.0, 0.0, 0, 0)
        
    def parse_name(self, name: str) -> None:
        """Extract and clean product name"""
        self.product.name = name.split('MADE TO ORDER')[0].strip()
    
    def parse_price(self, price_str: str) -> None:
        """Parse price string (e.g., $1,349.00) to float"""
        price = float(re.sub(r'[^\d.]', '', price_str))
        self.product.price = price
    
    def parse_compare_at_price(self, compare_str: str) -> None:
        """Parse compare at price if available"""
        if compare_str:
            self.product.compare_at_price = float(re.sub(r'[^\d.]', '', compare_str))
    
    def parse_dimensions(self, dimensions_str: str) -> None:
        """Parse dimensions from string (e.g., 'W 115.5cm × L 215cm')"""
        # Extract numbers with optional decimal points
        dims = [float(x) for x in re.findall(r'\d+(?:\.\d+)?', dimensions_str)]
        if len(dims) >= 2:
            self.product.width_mm = int(dims[0] * 10)  # cm to mm
            self.product.length_mm = int(dims[1] * 10)  # cm to mm
    
    def parse_materials(self, materials_str: str) -> None:
        """Parse materials information"""
        materials = materials_str.lower()
        if 'victorian ash' in materials:
            self.product.material = 'vic-ash'
        if 'nz pine' in materials or 'new zealand pine' in materials:
            self.product.slats_material = 'pine'
    
    def parse_customization(self, custom_text: str) -> None:
        """Parse customization information"""
        self.product.customizable = 'custom' in custom_text.lower()
    
    def get_length_bucket(self) -> str:
        """Determine length bucket based on length in mm"""
        if self.product.length_mm <= 1900:
            return "short"
        elif 1901 <= self.product.length_mm <= 2100:
            return "1901-2100"
        else:
            return "long"
    
    def generate_slug(self) -> str:
        """Generate URL-friendly slug from product name"""
        slug = self.product.name.lower()
        slug = re.sub(r'[^\w\s-]', '', slug)  # Remove special chars
        slug = re.sub(r'\s+', '-', slug)  # Replace spaces with hyphens
        return re.sub(r'-+', '-', slug)  # Replace multiple hyphens with single
    
    def to_json(self) -> Dict[str, Any]:
        """Convert product data to standardized JSON format"""
        slug = self.generate_slug()
        
        return {
            "id": hash(self.product.name) % 10**12,  # Simple hash-based ID
            "name": self.product.name,
            "slug": slug,
            "primary_category": "phong-ngu/giuong/king-single",
            "categories": [
                "phong-ngu",
                "phong-ngu/giuong",
                "phong-ngu/giuong/king-single"
            ],
            "product_type": "bed",
            "price": self.product.price,
            "compare_at_price": self.product.compare_at_price,
            "currency": "AUD",
            "attributes": {
                "room": "bedroom",
                "furniture_type": "bed",
                "material": self.product.material,
                "slats_material": self.product.slats_material,
                "finish": self.product.finish,
                "color": self.product.color,
                "style": None,
                "brand": self.product.brand,
                "origin": self.product.origin,
                "customizable": self.product.customizable,
                "lead_time": "made-to-order",
                "width_mm": self.product.width_mm,
                "length_mm": self.product.length_mm,
                "height_mm": self.product.height_mm,
                "length_bucket": self.get_length_bucket()
            },
            "options": {
                "finish_notes": "See colour charts",
                "surcharge": [
                    {"condition": "solid-black", "extra_pct": 10},
                    {"condition": "solid-white", "extra_pct": 10}
                ]
            },
            "warranty_months": self.product.warranty_months,
            "assembly_required": self.product.assembly_required,
            "origin_country_label": "Australia",
            "source_url": self.product.source_url,
            "images": self.product.images or [],
            "tags": ["made-to-order", "solid-wood", "australian-made"]
        }

def parse_product_info(product_info: Dict[str, str]) -> Dict[str, Any]:
    """Main function to parse product information"""
    parser = ProductParser()
    
    # Parse each field if it exists in the input
    if 'name' in product_info:
        parser.parse_name(product_info['name'])
    if 'price' in product_info:
        parser.parse_price(product_info['price'])
    if 'compare_at_price' in product_info:
        parser.parse_compare_at_price(product_info['compare_at_price'])
    if 'dimensions' in product_info:
        parser.parse_dimensions(product_info['dimensions'])
    if 'materials' in product_info:
        parser.parse_materials(product_info['materials'])
    if 'customization' in product_info:
        parser.parse_customization(product_info['customization'])
    if 'source_url' in product_info:
        parser.product.source_url = product_info['source_url']
    
    return parser.to_json()

# Example usage
if __name__ == "__main__":
    # Example input data
    product_data = {
        "name": "FERGUSON SOLID VIC ASH KING SINGLE BACHELOR BED MADE TO ORDER",
        "price": "$1,349.00",
        "compare_at_price": "$1,899.00",
        "dimensions": "W 115.5cm × L 215cm",
        "materials": "Khung gỗ Solid Victorian Ash; slats: NZ Pine",
        "customization": "Australian Custom Made… custom make according to customer requirements",
        "source_url": "https://chocolatewood.com.au/products/ferguson-solid-vic-ash-king-single-bachelor-bed-made-to-order"
    }
    
    # Parse the product data
    result = parse_product_info(product_data)
    
    # Print the result as formatted JSON
    print(json.dumps(result, indent=2, ensure_ascii=False))
