{
    'name': 'TVS Domains',
    'category': 'Website/Domains',
    'sequence': 2,
    'website': '',
    'summary': 'Publish website domains',
    'version': '1.0',
    'author': 'Shehabul',
    'description': 'website domain management',
    'depends': ['base', 'website'],
    'data': [
        'security/ir.model.access.csv',
        'data/tvs_domain_snippet_template_data.xml',
        'views/tvs_domain_templates.xml',
        'views/tvs_domain_views.xml',
        'views/tvs_project_views.xml',
        'views/tvs_partner_views.xml',
        'views/tvs_topic_views.xml',
        'views/snippets/snippets.xml',
        'views/snippets/s_domains.xml',
        'views/snippets/s_sub_domains.xml',
        'views/snippets/s_projects.xml',
        'views/snippets/s_topics.xml',
        'views/snippets/s_back_button.xml',
    ],
    'assets': {
        'website.assets_wysiwyg': [
            'website_tvs_domain/static/src/snippets/s_domains/options.js',
            'website_tvs_domain/static/src/snippets/s_sub_domains/options.js',
            'website_tvs_domain/static/src/snippets/s_projects/options.js',
            'website_tvs_domain/static/src/snippets/s_topics/options.js',
        ],
        'website.assets_editor': [
        ],
        'web.assets_tests': [],
        'web.assets_frontend': [
            'website_tvs_domain/static/src/scss/styles.scss',
        ],
        'web.assets_primary_variables': [
        ],
    },
}
