{
    'name': 'TVS Events',
    'category': 'Website/Events',
    'sequence': 3,
    'website': '',
    'summary': 'Publish tvs website events',
    'version': '1.0',
    'author': 'Shehabul',
    'description': 'tvs website event management',
    'depends': ['base', 'website'],
    'data': [
        'security/ir.model.access.csv',
        'views/tvs_event_views.xml',
        'views/tvs_event_menu.xml',
        'views/tvs_event_templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'website_tvs_event/static/src/scss/styles.scss',
        ],
        'web.assets_primary_variables': [
        ],
    },
}
