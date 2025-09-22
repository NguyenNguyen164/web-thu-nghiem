# Product Data Parser

This script parses product information from the Chocolate Wood website and converts it into a standardized JSON format for the Nguyen Furniture database.

## Features

- Parses product names, prices, dimensions, and materials
- Handles different measurement units (cm to mm conversion)
- Generates URL-friendly slugs
- Calculates length buckets automatically
- Supports customization options and surcharges
- Outputs data in the standardized format

## Requirements

- Python 3.7+
- No external dependencies required

## Usage

1. Prepare your input data as a Python dictionary with the following fields:
   - `name`: Product name
   - `price`: Current price (with currency symbol)
   - `compare_at_price`: Original price (optional)
   - `dimensions`: String with width and length
   - `materials`: Description of materials used
   - `customization`: Information about customization options
   - `source_url`: URL of the product page

2. Run the script:
   ```bash
   python parse_product.py
   ```

3. The script will output the standardized JSON to stdout.

## Example Input

```python
product_data = {
    "name": "FERGUSON SOLID VIC ASH KING SINGLE BACHELOR BED MADE TO ORDER",
    "price": "$1,349.00",
    "compare_at_price": "$1,899.00",
    "dimensions": "W 115.5cm × L 215cm",
    "materials": "Khung gỗ Solid Victorian Ash; slats: NZ Pine",
    "customization": "Australian Custom Made… custom make according to customer requirements",
    "source_url": "https://example.com/product-url"
}
```

## Output Format

The script outputs a JSON object with the following structure:

```json
{
  "id": 123456789,
  "name": "Ferguson Solid Vic Ash King Single Bachelor Bed",
  "slug": "ferguson-solid-vic-ash-king-single-bachelor-bed",
  "primary_category": "phong-ngu/giuong/king-single",
  "categories": ["phong-ngu", "phong-ngu/giuong", "phong-ngu/giuong/king-single"],
  "product_type": "bed",
  "price": 1349.0,
  "compare_at_price": 1899.0,
  "currency": "AUD",
  "attributes": {
    "room": "bedroom",
    "furniture_type": "bed",
    "material": "vic-ash",
    "slats_material": "pine",
    "finish": null,
    "color": null,
    "style": null,
    "brand": "chocolate-wood",
    "origin": "au",
    "customizable": true,
    "lead_time": "made-to-order",
    "width_mm": 1155,
    "length_mm": 2150,
    "height_mm": null,
    "length_bucket": "1901-2100"
  },
  "options": {
    "finish_notes": "See colour charts",
    "surcharge": [
      {"condition": "solid-black", "extra_pct": 10},
      {"condition": "solid-white", "extra_pct": 10}
    ]
  },
  "warranty_months": 24,
  "assembly_required": true,
  "origin_country_label": "Australia",
  "source_url": "https://example.com/product-url",
  "images": [],
  "tags": ["made-to-order", "solid-wood", "australian-made"]
}
```

## Extending the Parser

To handle additional fields or customize the parsing logic:

1. Add new methods to the `ProductParser` class
2. Update the `parse_product_info` function to handle new fields
3. Modify the `to_json` method to include any additional fields in the output

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
