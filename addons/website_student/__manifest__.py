{
    'name': 'Student',
    'category': 'Website/Student',
    'sequence': 1,
    'website': '',
    'summary': 'Publish website student',
    'version': '1.0',
    'author': 'Shehabul',
    'description': 'website student management',
    'depends': ['base', 'website'],
    'data': [
        'security/ir.model.access.csv',
        'data/student_profile_snippet_template_data.xml',
        'views/website_student_profile_views.xml',
        'views/website_college_info_views.xml',
        'views/snippets/snippets.xml',
        'views/snippets/s_student_profile.xml',
    ],
    'assets': {
        'website.assets_wysiwyg': [
            'website_student/static/src/snippets/s_student_profile/options.js',
        ],
        'website.assets_editor': [
        ],
        'web.assets_tests': [],
        'web.assets_frontend': [
            'website_student/static/src/scss/styles.scss',
        ],
        'web.assets_primary_variables': [
        ],
    },
}
