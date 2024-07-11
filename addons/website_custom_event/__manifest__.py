{
    'name': 'Custom Event',
    'category': 'Website/Event',
    'sequence': 1,
    'website': '',
    'summary': 'Publish website custom events',
    'version': '1.0',
    'author': 'Shehabul',
    'description': 'website custom event management',
    'depends': ['base', 'website'],
    'data': [
        'security/ir.model.access.csv',
        'views/website_custom_event_views.xml',
        'views/website_custom_event_menu.xml',
        'views/website_custom_event_templates.xml',
        'views/snippets/snippets.xml',
        'views/snippets/s_custom_event.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'website_custom_event/static/src/scss/styles.scss',
            'website_custom_event/static/src/snippets/s_custom_event/000.js',
        ],
        'web.assets_primary_variables': [
        ],
    },
}
