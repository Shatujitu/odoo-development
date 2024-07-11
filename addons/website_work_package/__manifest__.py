{
    'name': 'Work Package',
    'category': 'Website/Work',
    'sequence': 1,
    'website': '',
    'summary': 'Publish website work package',
    'version': '1.0',
    'author': 'Shehabul',
    'description': 'A project\'s activities are all covered by workpackages. This is already predefined by a particular project. A project will have several workpackages where each workpackage will have several tasks. A consortium member will be leading each workpackage and tasks. Other consortium members will be supporting tasks and the workpackage',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/website_work_package_views.xml',
        'views/snippets/snippets.xml',
        'views/snippets/s_work_package.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'website_work_package/static/src/scss/styles.scss',
            'website_work_package/static/src/snippets/s_work_package/000.js',
            'website_work_package/static/src/snippets/s_work_package/options.js',
        ],
        'web.assets_primary_variables': [
        ],
    },
}
