{
    'name': 'Resilience Website',
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
            '/resilience_website/static/src/js/override_s_table_of_content.js',
        ],
        'website.assets_editor': [],
        'web.assets_tests': [],
        'web.assets_primary_variables': [],
        'web.assets_frontend': [
            '/resilience_website/static/src/scss/styles.scss',
        ],
        'web.assets_backend': [],
    },
}
