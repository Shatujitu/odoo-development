{
    'name': 'Weldplanet Sale',
    'category': 'Website/Website',
    'sequence': 1,
    'website': '',
    'summary': 'Extended version of website_sale depends on weldplanet design',
    'version': '15.0.0',
    'author': 'Shehabul',
    'description': 'Weldplanet custom design powered by TVS',
    'depends': ['base', 'website', 'website_sale'],
    'data': [
        'data/presets.xml',
        'data/images.xml',
        'views/header_templates.xml',
        'views/footer_templates.xml',
        'views/product_templates.xml',
        'views/snippets/snippets.xml',
        'views/snippets/s_weldplanet_search.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'weldplanet_sale/static/src/scss/styles.scss',
        ],
        'web._assets_primary_variables': [
            'weldplanet_sale/static/src/scss/primary_variables.scss',
        ],
    },
}
