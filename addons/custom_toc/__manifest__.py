{
    'name': 'Custom TOC',
    'version': '1.0',
    'category': 'Website',
    'summary': 'Override Table of Content snippet to include h3',
    'description': 'Overrides the Table of Content snippet to include h3 in targeted elements',
    'author': 'Shehabul',
    'depends': ['website'],
    'data': [],
    'qweb': [],
    'installable': True,
    'auto_install': False,
    'assets': {
        'website.assets_wysiwyg': [
            '/custom_toc/static/src/js/custom_toc.js',
        ],
        'website.assets_editor': [
        ],
        'web.assets_tests': [],
        'web.assets_frontend': [],
        'web.assets_primary_variables': [
        ],
    },
}
