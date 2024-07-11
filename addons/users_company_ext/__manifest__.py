{
    'name': 'Users & Company Extension',
    'version': '1.0',
    'depends': ['base'],
    'author': 'Shehabul',
    'category': 'Tools',
    'data': [
        'security/ir.model.access.csv',
        'views/company_ext_views.xml',
        'views/users_ext_views.xml',
        'views/signup_template_ext.xml',
    ],
    'installable': True,
}
