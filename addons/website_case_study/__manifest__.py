{
    'name': 'Case Study',
    'category': 'Website/Case',
    'sequence': 1,
    'website': '',
    'summary': 'Publish website case study',
    'version': '1.0',
    'author': 'Shehabul',
    'description': 'Case studies are the pilot sites where the project\'s data is collected from and where the project\'s developed tools, methodologies, frameworks are tested and validated.',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/website_case_study_views.xml',
        'views/snippets/snippets.xml',
        'views/snippets/s_case_study.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'website_case_study/static/src/scss/styles.scss',
            'website_case_study/static/src/snippets/s_case_study/000.js',
            'website_case_study/static/src/snippets/s_case_study/options.js',
        ],
        'web.assets_primary_variables': [
        ],
    },
}
